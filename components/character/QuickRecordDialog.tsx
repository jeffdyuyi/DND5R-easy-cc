import { useModalDialog } from '../common/useModalDialog';
import { useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { DialogDismissButton, useDialogBackdrop } from '../common/DialogControls';

export function QuickRecordDialog({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
    const dialog = useRef<HTMLDialogElement>(null);
    const backdrop = useDialogBackdrop(onClose);
    useModalDialog(dialog);
    return createPortal(<dialog ref={dialog} className="quick-record-dialog managed-dialog" aria-label={title} {...backdrop} onCancel={event => { event.preventDefault(); onClose(); }}>
        <header><h2>{title}</h2><DialogDismissButton onClick={onClose}/></header><div className="managed-dialog-content">{children}</div>
    </dialog>, document.body);
}
