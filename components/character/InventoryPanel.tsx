import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { DialogDismissButton, useDialogBackdrop } from '../common/DialogControls';
export function InventoryPanel({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
    const dialog = useRef<HTMLDialogElement>(null), backdrop = useDialogBackdrop(onClose);
    useEffect(() => { dialog.current?.showModal(); return () => dialog.current?.close(); }, []);
    return createPortal(<dialog ref={dialog} className="inventory-panel" aria-label={title + '库存管理'} {...backdrop} onCancel={event => { event.preventDefault(); onClose(); }}><header><h2>{title}</h2><DialogDismissButton onClick={onClose}/></header>{children}</dialog>, document.body);
}
