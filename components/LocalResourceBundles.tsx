import { useRef, useState } from 'react';
import { readDocuments } from '../src/content/fiveetools/platformDocuments';
import { createResourceBundle, readResourceBundle, ResourceBundle } from '../src/content/fiveetools/resourceBundle';
import { downloadJson } from '../utils/files';
import type { useExternalResources } from '../hooks/useExternalResources';
export function LocalResourceBundles({ resources: r }: {
    resources: ReturnType<typeof useExternalResources>;
}) {
    const input = useRef<HTMLInputElement>(null);
    const [pending, setPending] = useState<ResourceBundle | null>(null), [busy, setBusy] = useState(false), [message, setMessage] = useState('');
    const exportBundle = async () => {
        setBusy(true);
        setMessage('正在整理本地原文…');
        try {
            const documents = await readDocuments();
            if (!documents.length)
                throw Error('尚无可导出的外部资料。');
            downloadJson(await createResourceBundle(documents), 'easy-cc-sources-' + new Date().toISOString().slice(0, 10) + '.json');
            setMessage(`已生成 ${documents.length} 个原文文件的资料包，请保存下载文件。`);
        }
        catch (error) {
            setMessage(String(error));
        }
        finally {
            setBusy(false);
        }
    };
    const choose = async (file?: File) => {
        setPending(null);
        if (!file)
            return;
        setBusy(true);
        setMessage('正在核对资料包…');
        try {
            const bundle = await readResourceBundle(await file.text());
            setPending(bundle);
            setMessage('清单与文件校验通过，请核对后导入。');
        }
        catch (error) {
            setMessage(String(error));
        }
        finally {
            setBusy(false);
            if (input.current)
                input.current.value = '';
        }
    };
    const install = async () => {
        if (!pending)
            return;
        setBusy(true);
        setMessage('正在保存原文…');
        try {
            await r.installLocalDocuments(pending.files.map(file => file.document));
            setPending(null);
            setMessage('原文资料已导入本机。停用的资料来源仍需手动启用。');
        }
        catch (error) {
            setMessage(String(error));
        }
        finally {
            setBusy(false);
        }
    };
    const replacements = pending?.files.filter(file => r.documents.some(doc => doc.repository === file.document.repository && doc.path === file.document.path)).length || 0;
    return <section className="local-resource-bundles" aria-label="本地原文资料包"><h3>本地资料</h3><p>原文保存在本机。下载与更新由你手动发起；资料包可备份或导入另一台设备。</p><div className="external-source-actions"><button type="button" disabled={busy || r.busy || !r.ready} onClick={exportBundle}>导出原文资料包</button><button type="button" disabled={busy || r.busy || !r.ready} onClick={() => input.current?.click()}>导入资料包</button></div><input ref={input} type="file" accept=".json,application/json" hidden onChange={event => void choose(event.target.files?.[0])}/>{pending && <div className="local-bundle-preview"><p>共 {pending.files.length} 个文件，其中 {replacements} 个路径已存在，导入将按包内内容更新；其他文件保留。</p><details><summary>文件清单与修订</summary><ul>{pending.files.map(file => <li key={file.document.repository + ':' + file.document.path}>{file.document.repository} / {file.document.path} · {file.document.revision.slice(0, 12)} · {file.bytes.toLocaleString()} B</li>)}</ul></details><button type="button" disabled={busy || r.busy} onClick={install}>确认导入这些文件</button><button type="button" disabled={busy} onClick={() => setPending(null)}>取消</button></div>}{message && <p role="status">{message}</p>}<details><summary>保存范围</summary><p>资料包包含本机缓存记录的原始JSON、来源、修订及SHA-256校验；不包含角色、收藏、自订覆盖、图片和应用本体。校验用于发现文件损坏，不是作者身份认证。清理浏览器站点数据或应用数据会删除内部资料，请自行保留导出文件。</p><p>原文资料与应用离线包分别保存；应用离线就绪状态见信息页“应用与离线”。当前未接入自选文件夹或Android原生文件存储。</p></details></section>;
}
