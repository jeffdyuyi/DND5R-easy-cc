import { useCallback, useEffect, useRef, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
/** Synchronous ref serializes consecutive functional updates before React renders again. */
export function useLocalStorage<T>(key: string, initialValue: T): [
    T,
    Dispatch<SetStateAction<T>>
] {
    const unreadable = useRef(false);
    const [stored, setStored] = useState<T>(() => {
        try {
            const raw = localStorage.getItem(key);
            return raw === null ? initialValue : JSON.parse(raw);
        }
        catch (error) {
            unreadable.current = true;
            console.warn('无法读取本地记录：' + key, error);
            return initialValue;
        }
    });
    const current = useRef(stored);
    const readRaw = () => { try { return localStorage.getItem(key); } catch { return null; } };
    const persisted = useRef<string | null>(readRaw());
    const conflict = useRef(false);
    useEffect(() => {
        const changed = (event: StorageEvent) => { if (event.key === key && event.newValue !== persisted.current) conflict.current = true; };
        window.addEventListener('storage', changed);
        return () => window.removeEventListener('storage', changed);
    }, [key]);
    const setValue = useCallback<Dispatch<SetStateAction<T>>>((value) => {
        if (unreadable.current) { window.alert('原始记录无法解析，本次操作未保存。请先在信息页导出原始存档后恢复：' + key); return; }
        if (conflict.current || readRaw() !== persisted.current) {
            window.alert('另一个页面已修改此记录，本次操作未保存。请先导出本页备份，再刷新读取最新记录：' + key);
            return;
        }
        const next = typeof value === 'function' ? (value as (previous: T) => T)(current.current) : value;
        current.current = next;
        setStored(next);
        try {
            const serialized = JSON.stringify(next);
            localStorage.setItem(key, serialized);
            persisted.current = serialized;
        }
        catch (error) {
            console.warn('无法保存本地记录：' + key, error);
            window.alert('本地保存失败，当前修改仅保留在本次页面中。请立即导出备份，不要刷新或关闭页面。记录：' + key);
        }
    }, [key]);
    return [stored, setValue];
}
