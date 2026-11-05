import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { resourceKey } from '../src/content/resourceIdentity';
import type { ResourceSnapshot } from '../types';
interface Bookmark {
    item: ResourceSnapshot;
    savedAt: string;
}
const isBookmark = (record: unknown): record is Bookmark => {
    if (!record || typeof record !== 'object') return false;
    const item = (record as Bookmark).item;
    return !!item && typeof item === 'object' && ['id', 'kind', 'source', 'name'].every(key => typeof (item as any)[key] === 'string');
};
const FavoritesContext = createContext<{
    favorites: Bookmark[];
    toggle: (item: ResourceSnapshot) => void;
    refresh: (item: ResourceSnapshot) => boolean;
    has: (item: ResourceSnapshot) => boolean;
} | null>(null);
export function FavoritesProvider({ children }: {
    children: ReactNode;
}) {
    const [stored, setStored] = useLocalStorage<Bookmark[]>('easy_cc_favorites_v1', []);
    const favorites = Array.isArray(stored) ? stored.filter(isBookmark) : [];
    const canChange = () => {
        if (Array.isArray(stored) && stored.every(isBookmark)) return true;
        window.alert('收藏记录含无效结构，本次操作未保存。请先在信息页导出原始记录后恢复。');
        return false;
    };
    const toggle = (item: ResourceSnapshot) => {
        if (!canChange()) return;
        setStored(previous => {
            const key = resourceKey(item);
            return previous.some(record => resourceKey(record.item) === key)
                ? previous.filter(record => resourceKey(record.item) !== key)
                : [{ item: structuredClone(item), savedAt: new Date().toISOString() }, ...previous];
        });
    };
    const refresh = (item: ResourceSnapshot) => {
        return canChange() && setStored(previous => previous.map(record => resourceKey(record.item) === resourceKey(item) ? { ...record, item: { ...record.item, ...structuredClone(item) } } : record));
    };
    return <FavoritesContext.Provider value={{ favorites, toggle, refresh, has: item => favorites.some(record => resourceKey(record.item) === resourceKey(item)) }}>{children}</FavoritesContext.Provider>;
}
export function useFavorites() {
    const value = useContext(FavoritesContext);
    if (!value)
        throw new Error('FavoritesProvider missing');
    return value;
}
