import { useEffect, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { DialogDismissButton, useDialogBackdrop } from '../common/DialogControls';

export function QuickRecordDialog({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
    const dialog = useRef<HTMLDialogElement>(null);
    const backdrop = useDialogBackdrop(onClose);
    useEffect(() => { const node = dialog.current; node?.showModal(); return () => node?.close(); }, []);
    return createPortal(<dialog ref={dialog} className="quick-record-dialog" aria-label={title} {...backdrop} onCancel={event => { event.preventDefault(); onClose(); }}>
        <header><h2>{title}</h2><DialogDismissButton onClick={onClose}/></header>{children}
    </dialog>, document.body);
}
