import type { CharacterQuickRecord } from '../../types';

const limit = (value: number) => Math.max(0, Math.min(10000, Math.trunc(Number.isFinite(value) ? value : 0)));
/** Preserve marks beyond a reduced total. A level/total edit must not silently restore usage. */
export function slotUsage(record: CharacterQuickRecord, id: string, total: number) {
    const stored = record.slotMarks?.[id];
    const used = limit(record.slotUsed?.[id] || 0);
    const count = limit(total);
    const marks = stored ? [...stored] : Array.from({ length: Math.max(count, used) }, (_, index) => index < used);
    while (marks.length < count) marks.push(false);
    return { marks, used: marks.filter(Boolean).length, total: count };
}
export function toggleSlot(record: CharacterQuickRecord, id: string, total: number, index: number): Partial<CharacterQuickRecord> {
    const state = slotUsage(record, id, total);
    if (!Number.isInteger(index) || index < 0 || index >= state.total) return {};
    state.marks[index] = !state.marks[index];
    return { slotMarks: { ...record.slotMarks, [id]: state.marks }, slotUsed: { ...record.slotUsed, [id]: state.marks.filter(Boolean).length } };
}
/** An explicit count edit replaces per-position marks; old saves need no migration. */
export function setSlotUsage(record: CharacterQuickRecord, id: string, used: number): Partial<CharacterQuickRecord> {
    const marks = { ...record.slotMarks }; delete marks[id];
    return { slotMarks: marks, slotUsed: { ...record.slotUsed, [id]: limit(used) } };
}
