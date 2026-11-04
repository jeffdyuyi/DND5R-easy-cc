import { useRef } from 'react';
import type { PointerEvent } from 'react';
import { ChevronLeft, X } from './UiIcons';

// Both ends of a pointer gesture must be outside the panel. Dragging a crop,
// selecting text, or pressing within dialog padding must not dismiss a dialog.
export function useDialogBackdrop(onDismiss: () => void, panelSelector?: string) {
    const startedOutside = useRef(false);
    const outside = (event: PointerEvent<HTMLDialogElement>) => {
        const dialog = event.currentTarget;
        const panel = panelSelector ? dialog.querySelector(panelSelector) : dialog;
        if (!panel || (event.target !== dialog && !panelSelector)) return false;
        const box = panel.getBoundingClientRect();
        return event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom;
    };
    return {
        onPointerDown: (event: PointerEvent<HTMLDialogElement>) => { startedOutside.current = event.isPrimary && event.button === 0 && outside(event); },
        onPointerUp: (event: PointerEvent<HTMLDialogElement>) => {
            const dismiss = startedOutside.current && outside(event);
            startedOutside.current = false;
            if (dismiss) onDismiss();
        },
        onPointerCancel: () => { startedOutside.current = false; },
    };
}

export function DialogDismissButton({ onClick, back = false, label }: { onClick: () => void; back?: boolean; label?: string }) {
    const text = label || (back ? '返回' : '关闭');
    return <button type="button" className="dialog-dismiss" title={text} aria-label={text} onClick={onClick}>{back ? <ChevronLeft size={18}/> : <X size={18}/>}</button>;
}
