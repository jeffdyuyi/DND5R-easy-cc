import { useEffect } from 'react';
import type { RefObject } from 'react';

/** Shared full-screen reading gestures; vertical movement and table controls stay native. */
export function useFullscreenReader(dialog: RefObject<HTMLDialogElement>, _close: () => void, active = true) {
    useEffect(() => {
        const node = dialog.current;
        if (!active || !node) return;
        let start: { x: number; y: number; id: number } | null = null;
        const down = (event: PointerEvent) => {
            const target = event.target as Element;
            if (!event.isPrimary || event.button !== 0 || !target.closest('.reader-scroll,.picker-detail-scroll') || target.closest('table,input,textarea,select,button,a,summary,pre')) { start = null; return; }
            start = { x: event.clientX, y: event.clientY, id: event.pointerId };
        };
        const up = (event: PointerEvent) => {
            const from = start; start = null;
            if (!from || from.id !== event.pointerId || Number(node.dataset.referenceDepth || 0) > 0 || window.getSelection()?.toString()) return;
            const dx = event.clientX - from.x, dy = event.clientY - from.y;
            if (Math.abs(dx) < 70 || Math.abs(dx) < Math.abs(dy) * 2) return;
            node.querySelector<HTMLButtonElement>(dx < 0 ? '[data-reader-next]' : '[data-reader-previous]')?.click();
        };
        const blank = (event: MouseEvent) => {
            if (event.target instanceof Element && event.target.matches('.shared-reader-navigation')) {
                if (Number(node.dataset.referenceDepth || 0) > 0) node.dispatchEvent(new Event('cancel', { cancelable: true }));
                else _close();
            }
        };
        const cancel = () => { start = null; };
        node.addEventListener('click', blank); node.addEventListener('pointerdown', down); node.addEventListener('pointerup', up); node.addEventListener('pointercancel', cancel);
        return () => { node.removeEventListener('click', blank); node.removeEventListener('pointerdown', down); node.removeEventListener('pointerup', up); node.removeEventListener('pointercancel', cancel); };
    }, [dialog, active, _close]);
}
