import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useExternalLibrary } from '../contexts/ExternalResourceContext';
import { DialogDismissButton, useDialogBackdrop } from './common/DialogControls';

const seenKey = 'easy_cc_startup_notice_seen_v1';
function firstVisit() {
    try { return localStorage.getItem(seenKey) !== '1'; }
    catch { return true; }
}

export function StartupResourceNotice({ onManage }: { onManage: () => void }) {
    const library = useExternalLibrary();
    const [first] = useState(firstVisit);
    const [open, setOpen] = useState(first);
    const [delayPassed, setDelayPassed] = useState(false);
    const dismissed = useRef(false);
    const dialog = useRef<HTMLDialogElement>(null);
    const hasCore = library.documents.some(item => item.repository === '5etools-cn');
    const dismiss = () => {
        dismissed.current = true;
        try { localStorage.setItem(seenKey, '1'); } catch { /* A storage restriction must not prevent closing. */ }
        setOpen(false);
    };
    const backdrop = useDialogBackdrop(dismiss);
    useEffect(() => {
        const timer = window.setTimeout(() => setDelayPassed(true), 1500);
        return () => window.clearTimeout(timer);
    }, []);
    useEffect(() => {
        if (!dismissed.current && delayPassed && (!library.ready || !hasCore || library.errors.length > 0)) setOpen(true);
    }, [delayPassed, library.ready, hasCore, library.errors.length]);
    useEffect(() => { if (open && !dialog.current?.open) dialog.current?.showModal(); }, [open]);
    if (!open) return null;
    const preparing = !library.ready;
    const title = preparing ? '正在准备资料' : library.errors.length ? '资料尚有未完成项' : hasCore ? '资料已就绪' : '尚未载入中文主库';
    return createPortal(<dialog ref={dialog} className="startup-resource-notice" aria-labelledby="startup-resource-title"
        {...backdrop} onCancel={event => { event.preventDefault(); dismiss(); }} onClose={dismiss}>
        <header><h2 id="startup-resource-title">{title}</h2><DialogDismissButton onClick={dismiss}/></header>
        <div role="status" aria-live="polite">
            {preparing ? <><p>{library.status || '正在读取本机资料…'}</p><progress aria-label="准备资料"/></>
                : <p>{library.errors.length ? library.errors[0] : hasCore ? '本机中文主库可供查阅，角色可用来源需在角色中设置。' : '可前往信息页面同步中文主库；目前仍可使用已有资料。'}</p>}
        </div>
        <p>可先关闭提示，资料准备会继续。</p>
        <footer><button type="button" onClick={() => { dismiss(); onManage(); }}>资料管理</button><button type="button" autoFocus onClick={dismiss}>知道了</button></footer>
    </dialog>, document.body);
}
