import { useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';
import signatures from '../src/content/legacy-signatures.json';
import { OFFLINE_VERSION } from '../src/content/offline';
export interface LibraryHandler<T extends {
    id: string;
}> {
    items: T[];
    userItems: (T & {
        userResourceKind: string;
    })[];
    removeUserRecord: (id: string) => void;
    onAdd: (item: T) => void;
    onUpdate: (item: T) => void;
    onDelete: (id: string) => void;
    onImport: (newItems: T[]) => void;
    setItems: (value: T[] | ((val: T[]) => T[])) => void;
}
export function fingerprint(x: unknown) {
    const s = JSON.stringify(x, (_k, v) => v && typeof v === 'object' && !Array.isArray(v) ? Object.fromEntries(Object.keys(v).sort().map(k => [k, v[k]])) : v) ?? 'undefined';
    let a = 2166136261, b = 5381;
    for (let i = 0; i < s.length; i++) {
        a = Math.imul(a ^ s.charCodeAt(i), 16777619);
        b = Math.imul(b, 33) ^ s.charCodeAt(i);
    }
    return `${a >>> 0}:${b >>> 0}:${s.length}`;
}
interface Overrides<T> {
    added: T[];
    updated: Record<string, T>;
    deleted: string[];
}
export function legacyCustomItems<T extends {
    id: string;
}>(key: string, value: unknown): T[] {
    if (!Array.isArray(value))
        return [];
    const baseline = (signatures as Record<string, Record<string, string>>)[key] || {};
    return value.filter(x => x && typeof x.id === 'string' && baseline[x.id] !== fingerprint(x));
}
export function useLibraryManager<T extends {
    id: string;
}>(key: string, initialItems: T[]): LibraryHandler<T> {
    const initial = useMemo<Overrides<T>>(() => {
        try {
            return { added: legacyCustomItems<T>(key, JSON.parse(localStorage.getItem(key) || 'null')), updated: {}, deleted: [] };
        }
        catch {
            return { added: [], updated: {}, deleted: [] };
        }
    }, [key]);
    const [overrides, setOverrides] = useLocalStorage<Overrides<T>>(`easy_cc_custom_v1_${OFFLINE_VERSION}_${key}`, initial);
    const peerVersion = OFFLINE_VERSION === '5.1' ? '5.2.1' : '5.1';
    const [peerOverrides, setPeerOverrides] = useLocalStorage<Overrides<T>>('easy_cc_custom_v1_' + peerVersion + '_' + key, { added: [], updated: {}, deleted: [] });
    const userItems = useMemo(() => {
        const collect = (value: Overrides<T>) => [...value.added.map(item => ({ ...item, userResourceKind: (item as any).userResourceKind || 'added' })), ...Object.values(value.updated).filter(item => !value.deleted.includes(item.id)).map(item => ({ ...item, userResourceKind: 'modified' }))];
        return [...new Map([...collect(peerOverrides), ...collect(overrides)].map(item => [item.id, item])).values()];
    }, [overrides, peerOverrides]);
    const materialize = (value: Overrides<T>) => {
        const removed = new Set(value.deleted), base = initialItems.filter(item => !removed.has(item.id)).map(item => value.updated[item.id] || item);
        const ids = new Set(base.map(item => item.id));
        return [...base, ...value.added.filter(item => !ids.has(item.id))];
    };
    const items = useMemo(() => materialize(overrides), [initialItems, overrides]);
    const setItems = (value: T[] | ((previous: T[]) => T[])) => {
        setOverrides(previous => {
            const next = typeof value === 'function' ? value(materialize(previous)) : value;
            const base = new Map(initialItems.map(item => [item.id, item])), ids = new Set(next.map(item => item.id));
            return { added: next.filter(item => !base.has(item.id)), updated: Object.fromEntries(next.filter(item => base.has(item.id) && fingerprint(base.get(item.id)) !== fingerprint(item)).map(item => [item.id, item])), deleted: initialItems.filter(item => !ids.has(item.id)).map(item => item.id) };
        });
    };
    const update = (item: T) => {
        if (!items.some(existing => existing.id === item.id) && (peerOverrides.updated[item.id] || peerOverrides.added.some(existing => existing.id === item.id))) {
            setPeerOverrides(previous => ({ ...previous, added: previous.added.map(existing => existing.id === item.id ? item : existing), updated: previous.updated[item.id] ? { ...previous.updated, [item.id]: item } : previous.updated }));
            return;
        }
        setItems(previous => previous.map(existing => existing.id === item.id ? item : existing));
    };
    const remove = (id: string) => {
        if (peerOverrides.updated[id] || peerOverrides.added.some(existing => existing.id === id))
            setPeerOverrides(previous => ({ ...previous, added: previous.added.filter(item => item.id !== id), updated: Object.fromEntries(Object.entries(previous.updated).filter(([key]) => key !== id)), deleted: [...new Set([...previous.deleted, id])] }));
        setItems(previous => previous.filter(item => item.id !== id));
    };
    const removeUserRecord = (id: string) => {
        const clear = (previous: Overrides<T>) => ({ ...previous, added: previous.added.filter(item => item.id !== id), updated: Object.fromEntries(Object.entries(previous.updated).filter(([key]) => key !== id)), deleted: previous.deleted.filter(key => key !== id) });
        setOverrides(clear);
        if (peerOverrides.updated[id] || peerOverrides.added.some(item => item.id === id))
            setPeerOverrides(clear);
    };
    return { items, userItems, removeUserRecord, setItems, onAdd: item => setItems(previous => [...previous.filter(existing => existing.id !== item.id), item]), onUpdate: update, onDelete: remove, onImport: incoming => setItems(previous => { const ids = new Set(previous.map(x => x.id)); return [...previous, ...incoming.filter(x => !ids.has(x.id))]; }) };
}
