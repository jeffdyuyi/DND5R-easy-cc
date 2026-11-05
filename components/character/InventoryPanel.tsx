import { useModalDialog } from '../common/useModalDialog';
import { useRef } from 'react';
import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { DialogDismissButton, useDialogBackdrop } from '../common/DialogControls';
export function InventoryPanel({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
    const dialog = useRef<HTMLDialogElement>(null), backdrop = useDialogBackdrop(onClose);
    useModalDialog(dialog);
    return createPortal(<dialog ref={dialog} className="inventory-panel managed-dialog" aria-label={title + '库存管理'} {...backdrop} onCancel={event => { event.preventDefault(); onClose(); }}><header><h2>{title}</h2><DialogDismissButton onClick={onClose}/></header><div className="managed-dialog-content">{children}</div></dialog>, document.body);
}
