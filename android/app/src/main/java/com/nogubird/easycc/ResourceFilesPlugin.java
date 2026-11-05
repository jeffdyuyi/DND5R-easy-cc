package com.nogubird.easycc;

import android.util.AtomicFile;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import java.io.File;
import java.io.FileOutputStream;
import java.nio.charset.StandardCharsets;

/** Only app-private resource files are exposed; no arbitrary filesystem access. */
@CapacitorPlugin(name = "ResourceFiles")
public class ResourceFilesPlugin extends Plugin {
    private static final Object LOCK = new Object();
    private static final String VERSION = "[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}";

    private File root() throws Exception {
        File root = new File(getContext().getFilesDir(), "resource-versions");
        if (!root.isDirectory() && !root.mkdirs()) throw new java.io.IOException("无法创建资料目录");
        return root;
    }

    private AtomicFile file(PluginCall call) throws Exception {
        String name = call.getString("name");
        if (name == null || !name.matches(VERSION + "\\.json"))
            throw new IllegalArgumentException("无效资料文件名");
        return new AtomicFile(new File(root(), name));
    }

    @PluginMethod
    public void read(PluginCall call) {
        synchronized (LOCK) {
            try {
                AtomicFile file = file(call);
                JSObject result = new JSObject();
                // openRead also recovers an interrupted AtomicFile write.
                try { result.put("text", new String(file.readFully(), StandardCharsets.UTF_8)); }
                catch (java.io.FileNotFoundException error) {
                    if (file.getBaseFile().exists()) throw error;
                    result.put("text", org.json.JSONObject.NULL);
                }
                call.resolve(result);
            } catch (Exception error) { call.reject("原生资料读取失败", error); }
        }
    }

    @PluginMethod
    public void write(PluginCall call) {
        synchronized (LOCK) {
            AtomicFile target = null;
            FileOutputStream stream = null;
            try {
                target = file(call);
                String text = call.getString("text");
                if (text == null) throw new IllegalArgumentException("缺少资料内容");
                // Reject malformed JSON before touching the previous file.
                new org.json.JSONObject(text);
                stream = target.startWrite();
                stream.write(text.getBytes(StandardCharsets.UTF_8));
                stream.getFD().sync();
                target.finishWrite(stream);
                stream = null;
                if (!text.equals(new String(target.readFully(), StandardCharsets.UTF_8)))
                    throw new java.io.IOException("资料写入后核对失败");
                call.resolve();
            } catch (Exception error) {
                if (target != null && stream != null) target.failWrite(stream);
                call.reject("原生资料写入失败", error);
            }
        }
    }

    @PluginMethod
    public void active(PluginCall call) {
        synchronized (LOCK) {
            try {
                AtomicFile pointer = new AtomicFile(new File(root(), "active.json"));
                String version = null;
                try { version = new org.json.JSONObject(new String(pointer.readFully(), StandardCharsets.UTF_8)).getString("version"); }
                catch (java.io.FileNotFoundException missing) {
                    if (pointer.getBaseFile().exists()) throw missing;
                }
                if (version != null && !version.matches(VERSION)) throw new java.io.IOException("活动版本无效");
                JSObject result = new JSObject();
                result.put("version", version == null ? org.json.JSONObject.NULL : version);
                call.resolve(result);
            } catch (Exception error) { call.reject("活动版本读取失败", error); }
        }
    }

    @PluginMethod
    public void activate(PluginCall call) {
        synchronized (LOCK) {
            FileOutputStream stream = null;
            AtomicFile pointer = null;
            try {
                String version = call.getString("version");
                String expected = call.getString("expected");
                if (version == null || !version.matches(VERSION) || (expected != null && !expected.matches(VERSION)))
                    throw new IllegalArgumentException("无效版本号");
                File target = new File(root(), version + ".json");
                if (!target.isFile()) throw new java.io.FileNotFoundException("待激活版本不存在");
                pointer = new AtomicFile(new File(root(), "active.json"));
                String current = null;
                try { current = new org.json.JSONObject(new String(pointer.readFully(), StandardCharsets.UTF_8)).getString("version"); }
                catch (java.io.FileNotFoundException missing) {
                    if (pointer.getBaseFile().exists()) throw missing;
                }
                if (!java.util.Objects.equals(expected, current)) throw new IllegalStateException("活动版本已变化");
                stream = pointer.startWrite();
                stream.write(new org.json.JSONObject().put("version", version).toString().getBytes(StandardCharsets.UTF_8));
                pointer.finishWrite(stream);
                stream = null;
                call.resolve();
            } catch (Exception error) {
                if (pointer != null && stream != null) pointer.failWrite(stream);
                call.reject("资料版本激活失败", error);
            }
        }
    }

    @PluginMethod
    public void discard(PluginCall call) {
        synchronized (LOCK) {
            try {
                AtomicFile candidate = file(call);
                String active = null;
                AtomicFile pointer = new AtomicFile(new File(root(), "active.json"));
                try { active = new org.json.JSONObject(new String(pointer.readFully(), StandardCharsets.UTF_8)).getString("version"); }
                catch (java.io.FileNotFoundException missing) {
                    if (pointer.getBaseFile().exists()) throw missing;
                }
                if ((active + ".json").equals(call.getString("name"))) throw new IllegalStateException("不能删除活动版本");
                candidate.delete();
                call.resolve();
            } catch (Exception error) { call.reject("暂存版本清理失败", error); }
        }
    }
}
