import { useRef, useState } from 'react';
import { ResourceTaskStatus } from './ResourceTaskStatus';
import { LibraryOverlay } from './LibraryNavigation';
import { IS_ANDROID_BUILD } from '../src/platform/build';
import { readDocuments } from '../src/content/fiveetools/platformDocuments';
import { createResourceBundle, readResourceBundle, ResourceBundle } from '../src/content/fiveetools/resourceBundle';
import { downloadJson, exportMessage } from '../utils/files';
import type { useExternalResources } from '../hooks/useExternalResources';
export function LocalResourceBundles({ resources: r }: {
    resources: ReturnType<typeof useExternalResources>;
}) {
    const [open, setOpen] = useState(false);
    const input = useRef<HTMLInputElement>(null);
    const [pending, setPending] = useState<ResourceBundle | null>(null), [busy, setBusy] = useState(false), [message, setMessage] = useState('');
    const exportBundle = async () => {
        setBusy(true);
        setMessage('正在整理本地原文…');
        try {
            const documents = await readDocuments();
            if (!documents.length)
                throw Error('尚无可导出的外部资料。');
            const result = await downloadJson(await createResourceBundle(documents), 'easy-cc-sources-' + new Date().toISOString().slice(0, 10) + '.json');
            setMessage(exportMessage(result));
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
            setOpen(true);
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
    return <article className="resource-manager-card local-resource-bundles" aria-label="本地资料"><header><h2>本地资料</h2><button type="button" onClick={() => setOpen(true)}>详情</button></header><div className="resource-manager-line"><button type="button" disabled={busy || r.busy || !r.ready} onClick={() => input.current?.click()}>导入资料包</button><button type="button" disabled={busy || r.busy || !r.ready || !r.documents.length} onClick={() => void exportBundle()}>导出资料包</button>{pending && <button type="button" onClick={() => setOpen(true)}>核对导入</button>}</div><input ref={input} type="file" accept=".json,application/json" hidden onChange={event => void choose(event.target.files?.[0])}/>{r.busy && r.operation === 'import' && <ResourceTaskStatus resources={r}/>}
        {message && !(r.busy && r.operation === 'import') && <p className="resource-local-message" role="status">{message}</p>}
        {open && <LibraryOverlay title={pending ? '核对导入' : '本地资料'} onClose={() => setOpen(false)} className="resource-detail-dialog"><div className="resource-management-scroll">{pending ? <><p>共 {pending.files.length} 个文件，{replacements} 个已存在。确认后按包内内容更新，其他文件保留。</p><details><summary>文件清单</summary><ul>{pending.files.map(file => <li key={file.document.repository + ':' + file.document.path}>{file.document.repository} / {file.document.path} · {file.document.revision.slice(0, 12)} · {file.bytes.toLocaleString()} B</li>)}</ul></details></> : <><p>{IS_ANDROID_BUILD ? '原文保存于应用私有文件目录。' : '原文保存于当前浏览器的 IndexedDB。'}暂不支持自选保存目录。</p><p>资料包包含原始 JSON、来源、修订和 SHA-256 校验，不包含角色、收藏、图片或应用本体。校验用于发现损坏，不认证作者身份。</p><p>清理站点或应用数据会删除内部资料，请保留导出文件。角色与收藏的备份在“本地备份”页。</p></>}{r.busy && r.operation === 'import' ? <ResourceTaskStatus resources={r}/> : message && <p role="status">{message}</p>}</div>{pending && <footer className="resource-package-footer"><button type="button" disabled={busy || r.busy} onClick={() => { setPending(null); setMessage('已取消导入。'); }}>取消导入</button><button type="button" disabled={busy || r.busy} onClick={() => void install()}>确认导入</button></footer>}</LibraryOverlay>}
    </article>;
}
