import { useDialogBackdrop } from '../common/DialogControls';
import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import type { ResourceSnapshot } from '../../types';
import { canOccupySlot, isManualPlacement } from '../../src/character/equipmentSelection';

export interface EquipmentGesture { x: number; y: number; id: number }
export function LongPressEquipment({ onHold, children }: { onHold: (gesture?: EquipmentGesture) => void; children: ReactNode }) {
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const start = useRef<{ x: number; y: number; id: number } | null>(null);
    const suppressed = useRef(false);
    const cancel = () => { if (timer.current) clearTimeout(timer.current); timer.current = null; start.current = null; };
    useEffect(() => cancel, []);
    return <div className="equipment-longpress" onPointerDown={event => {
        cancel(); suppressed.current = false;
        if (!event.isPrimary || event.button !== 0) return;
        start.current = { x: event.clientX, y: event.clientY, id: event.pointerId };
        timer.current = setTimeout(() => { const gesture = start.current || undefined; suppressed.current = true; cancel(); onHold(gesture); }, 500);
    }} onPointerMove={event => {
        if (start.current && (event.pointerId !== start.current.id || Math.hypot(event.clientX - start.current.x, event.clientY - start.current.y) > 10)) cancel();
    }} onPointerUp={cancel} onPointerCancel={cancel} onPointerLeave={cancel}
        onClickCapture={event => { if (suppressed.current) { suppressed.current = false; event.preventDefault(); event.stopPropagation(); } }}
        onContextMenu={event => { event.preventDefault(); cancel(); if (!suppressed.current) { suppressed.current = true; onHold(); } }}
        onKeyDown={event => { if (event.key === 'ContextMenu' || event.key === 'F10' && event.shiftKey) { event.preventDefault(); onHold(); } }}>
        {children}
    </div>;
}

const positions = [['head', '头部'], ['cloak', '斗篷'], ['armor', '护甲'], ['gloves', '手套'], ['boots', '鞋子'], ['main', '主手'], ['off', '副手'], ['ring', '戒指'], ['necklace', '项链'], ['amulet', '护符']] as const;

const point = (radius: number, angle: number) => [160 + Math.cos(angle) * radius, 160 + Math.sin(angle) * radius];
function sector(index: number) {
    const step = Math.PI * 2 / positions.length, middle = index * step - Math.PI / 2;
    const a = middle - step / 2 + .012, b = middle + step / 2 - .012;
    const [x1, y1] = point(150, a), [x2, y2] = point(150, b), [x3, y3] = point(72, b), [x4, y4] = point(72, a);
    return `M${x1},${y1} A150,150 0 0 1 ${x2},${y2} L${x3},${y3} A72,72 0 0 0 ${x4},${y4} Z`;
}
export function EquipmentWheel({ item, gesture, isEquipped, onSelect, onClose, onInvalid }: { item: ResourceSnapshot; gesture?: EquipmentGesture; isEquipped: (slot: string) => boolean; onSelect: (slot: string) => void; onClose: () => void; onInvalid: (message: string) => void }) {
    const backdrop = useDialogBackdrop(onClose);
    const dialog = useRef<HTMLDialogElement>(null), ring = useRef<HTMLDivElement>(null);
    const [hovered, setHovered] = useState<number | null>(null);
    const callbacks = useRef({ onSelect, onClose, onInvalid }); callbacks.current = { onSelect, onClose, onInvalid };
    const finished = useRef(false);
    const choose = (index: number | null) => {
        if (finished.current) return; finished.current = true;
        if (index !== null) {
            const [slot, label] = positions[index];
            if (canOccupySlot(item, slot)) callbacks.current.onSelect(slot);
            else callbacks.current.onInvalid('“' + item.name + '”不能装备到' + label + '，装备未改变。');
        }
        callbacks.current.onClose();
    };
    useEffect(() => {
        const node = dialog.current;
        if (!node?.open) node?.showModal();
        if (node && gesture) {
            const box = node.getBoundingClientRect();
            node.style.margin = '0';
            node.style.left = Math.max(8, Math.min(window.innerWidth - box.width - 8, gesture.x - box.width / 2)) + 'px';
            node.style.top = Math.max(8, Math.min(window.innerHeight - box.height - 8, gesture.y - box.height / 2)) + 'px';
            node.style.right = 'auto'; node.style.bottom = 'auto';
        }
        let moved = false;
        const locate = (x: number, y: number): number | null => {
            const box = ring.current?.getBoundingClientRect(); if (!box) return null;
            const dx = (x - box.left - box.width / 2) * 320 / box.width, dy = (y - box.top - box.height / 2) * 320 / box.height;
            const radius = Math.hypot(dx, dy);
            if (radius < 72 || radius > 166) return null;
            const angle = (Math.atan2(dy, dx) + Math.PI / 2 + Math.PI * 2) % (Math.PI * 2);
            return Math.round(angle / (Math.PI * 2 / positions.length)) % positions.length;
        };
        const move = (x: number, y: number) => {
            if (!gesture || Math.hypot(x - gesture.x, y - gesture.y) > 12) moved = true;
            setHovered(locate(x, y));
        };
        const pointerMove = (event: PointerEvent) => { if (gesture && event.pointerId !== gesture.id) return; move(event.clientX, event.clientY); };
        const pointerUp = (event: PointerEvent) => { if (gesture && event.pointerId === gesture.id && moved) choose(locate(event.clientX, event.clientY)); };
        const touchMove = (event: TouchEvent) => { if (event.touches.length === 1) { event.preventDefault(); move(event.touches[0].clientX, event.touches[0].clientY); } };
        const touchEnd = (event: TouchEvent) => { const touch = event.changedTouches[0]; if (gesture && moved && touch) choose(locate(touch.clientX, touch.clientY)); };
        const touchCancel = () => choose(null);
        document.addEventListener('touchcancel', touchCancel, true);
        document.addEventListener('pointermove', pointerMove, true); document.addEventListener('pointerup', pointerUp, true);
        document.addEventListener('touchmove', touchMove, { capture: true, passive: false }); document.addEventListener('touchend', touchEnd, true);
        return () => { node?.close(); document.removeEventListener('touchcancel', touchCancel, true); document.removeEventListener('pointermove', pointerMove, true); document.removeEventListener('pointerup', pointerUp, true); document.removeEventListener('touchmove', touchMove, true); document.removeEventListener('touchend', touchEnd, true); };
    }, []);
    return createPortal(<dialog ref={dialog} className="equipment-wheel radial-wheel" aria-label={item.name + '装备部位'} onCancel={event => { event.preventDefault(); onClose(); }} {...backdrop}>
        <h2>{item.name}{isManualPlacement(item) && <small className="wheel-manual-note">手动选择部位</small>}</h2><div ref={ring} className="equipment-wheel-ring">
            <svg viewBox="0 0 320 320" aria-label="十个装备部位">{positions.map(([slot, label], index) => <path key={slot} d={sector(index)} className={'wheel-sector' + (canOccupySlot(item, slot) ? ' is-allowed' : '') + (hovered === index ? ' is-hovered' : '') + (isEquipped(slot) ? ' is-equipped' : '')} role="button" tabIndex={0} aria-label={label + (canOccupySlot(item, slot) ? isEquipped(slot) ? '，卸下' : '，装备' : '，不适用')} onClick={() => choose(index)} onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); choose(index); } }}/>)}</svg>
            {positions.map(([slot, label], index) => { const [x, y] = point(113, index * Math.PI * 2 / positions.length - Math.PI / 2); return <span key={slot} className={'wheel-label' + (canOccupySlot(item, slot) ? ' is-allowed' : '')} style={{ left: x / 320 * 100 + '%', top: y / 320 * 100 + '%' }}>{label}{isEquipped(slot) && <small>已装备</small>}</span>; })}
            <button type="button" className="equipment-wheel-cancel" onClick={() => choose(null)} autoFocus>取消</button>
        </div><p>{hovered === null ? '按住滑向部位，松手选择' : positions[hovered][1] + (canOccupySlot(item, positions[hovered][0]) ? isEquipped(positions[hovered][0]) ? ' · 卸下' : ' · 装备' : ' · 不适用')}</p>
    </dialog>, document.body);
}
