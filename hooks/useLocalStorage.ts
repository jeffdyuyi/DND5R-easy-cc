import { useCallback, useEffect, useRef, useState } from 'react';
import type { SetStateAction } from 'react';
type StorageSetter<T> = (value: SetStateAction<T>) => boolean;
interface StorageRecovery<T> {
    unreadable: boolean;
    restore: StorageSetter<T>;
}
/** Synchronous ref serializes consecutive functional updates before React renders again. */
export function useLocalStorage<T>(key: string, initialValue: T): [
    T,
    StorageSetter<T>,
    StorageRecovery<T>
] {
    const [loaded] = useState(() => {
        let raw: string | null | undefined;
        try {
            raw = localStorage.getItem(key);
            return { value: raw === null ? initialValue : JSON.parse(raw) as T, raw, unreadable: false };
        }
        catch (error) {
            console.warn('无法读取本地记录：' + key, error);
            return { value: initialValue, raw, unreadable: true };
        }
    });
    const unreadable = useRef(loaded.unreadable);
    const [stored, setStored] = useState<T>(loaded.value);
    const current = useRef(stored);
    const persisted = useRef(loaded.raw);
    const conflict = useRef(false);
    useEffect(() => {
        const changed = (event: StorageEvent) => {
            if (event.storageArea === localStorage && (event.key === key || event.key === null))
                conflict.current = true;
        };
        window.addEventListener('storage', changed);
        return () => window.removeEventListener('storage', changed);
    }, [key]);
    const commit = useCallback((value: SetStateAction<T>, recovering: boolean): boolean => {
        if (unreadable.current && !recovering) { window.alert('原始记录无法解析，本次操作未保存。请先在信息页导出原始存档后恢复：' + key); return false; }
        let raw: string | null;
        try { raw = localStorage.getItem(key); }
        catch (error) { console.warn('无法读取本地记录：' + key, error); window.alert('无法读取本地记录，本次操作未保存：' + key); return false; }
        if (persisted.current === undefined || conflict.current || raw !== persisted.current) {
            window.alert('另一个页面已修改此记录，本次操作未保存。请先导出本页备份，再刷新读取最新记录：' + key);
            return false;
        }
        const next = typeof value === 'function' ? (value as (previous: T) => T)(current.current) : value;
        try {
            const serialized = JSON.stringify(next);
            if (serialized === undefined) throw Error('记录不能序列化为JSON。');
            localStorage.setItem(key, serialized);
            persisted.current = serialized;
            unreadable.current = false;
            current.current = next;
            setStored(next);
            return true;
        }
        catch (error) {
            console.warn('无法保存本地记录：' + key, error);
            window.alert('本地保存失败，本次操作未应用，原记录保留。请检查可用空间并导出备份。记录：' + key);
            return false;
        }
    }, [key]);
    const setValue = useCallback<StorageSetter<T>>(value => commit(value, false), [commit]);
    const restore = useCallback<StorageSetter<T>>(value => commit(value, true), [commit]);
    return [stored, setValue, { unreadable: unreadable.current, restore }];
}
