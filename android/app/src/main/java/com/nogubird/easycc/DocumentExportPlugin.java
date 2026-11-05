package com.nogubird.easycc;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import androidx.activity.result.ActivityResult;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.ActivityCallback;
import com.getcapacitor.annotation.CapacitorPlugin;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;

/** A user-selected document only; no broad storage permission or fixed public path. */
@CapacitorPlugin(name = "DocumentExport")
public class DocumentExportPlugin extends Plugin {
    private volatile boolean pending = false;
    @PluginMethod
    public void save(PluginCall call) {
        if (pending) { call.reject("请先完成当前文件保存"); return; }
        String filename = call.getString("filename");
        if (filename == null || filename.isEmpty() || filename.contains("/") || filename.contains("\\") || call.getString("text") == null) {
            call.reject("缺少有效文件名或导出内容"); return;
        }
        Intent intent = new Intent(Intent.ACTION_CREATE_DOCUMENT);
        intent.addCategory(Intent.CATEGORY_OPENABLE);
        intent.setType("application/json");
        intent.putExtra(Intent.EXTRA_TITLE, filename);
        pending = true;
        try { startActivityForResult(call, intent, "savedDocument"); }
        catch (Exception error) { pending = false; call.reject("无法打开系统保存窗口", error); }
    }
    @ActivityCallback
    private void savedDocument(PluginCall call, ActivityResult result) {
        if (call == null) { pending = false; return; }
        if (result.getResultCode() != Activity.RESULT_OK) {
            pending = false;
            JSObject response = new JSObject(); response.put("status", "cancelled"); call.resolve(response); return;
        }
        Uri uri = result.getData() == null ? null : result.getData().getData();
        if (uri == null) { pending = false; call.reject("系统未返回保存位置"); return; }
        getBridge().execute(() -> {
            try (OutputStream stream = getContext().getContentResolver().openOutputStream(uri, "wt")) {
                if (stream == null) throw new java.io.IOException("无法写入所选位置");
                String text = call.getString("text");
                if (text == null) throw new java.io.IOException("导出内容已不可用，请重新导出");
                stream.write(text.getBytes(StandardCharsets.UTF_8));
                stream.flush();
            } catch (Exception error) { pending = false; call.reject("文件保存未完成，请重试", error); return; }
            pending = false;
            JSObject response = new JSObject(); response.put("status", "saved"); call.resolve(response);
        });
    }
}
