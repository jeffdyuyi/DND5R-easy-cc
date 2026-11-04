import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { resourceKey } from '../src/content/resourceIdentity';
import type { ResourceSnapshot } from '../types';
interface Bookmark {
    item: ResourceSnapshot;
    savedAt: string;
}
const FavoritesContext = createContext<{
    favorites: Bookmark[];
    toggle: (item: ResourceSnapshot) => void;
    refresh: (item: ResourceSnapshot) => void;
    has: (item: ResourceSnapshot) => boolean;
} | null>(null);
export function FavoritesProvider({ children }: {
    children: ReactNode;
}) {
    const [stored, setStored] = useLocalStorage<Bookmark[]>('easy_cc_favorites_v1', []);
    const favorites = Array.isArray(stored) ? stored.filter(record => record?.item?.id && record.item.kind && record.item.source) : [];
    const toggle = (item: ResourceSnapshot) => setStored(previous => { const records = Array.isArray(previous) ? previous : [], key = resourceKey(item); return records.some(record => record?.item && resourceKey(record.item) === key) ? records.filter(record => record?.item && resourceKey(record.item) !== key) : [{ item: structuredClone(item), savedAt: new Date().toISOString() }, ...records]; });
    return <FavoritesContext.Provider value={{ favorites, toggle, refresh: item => setStored(previous => previous.map(record => resourceKey(record.item) === resourceKey(item) ? { ...record, item: { ...record.item, ...structuredClone(item) } } : record)), has: item => favorites.some(record => resourceKey(record.item) === resourceKey(item)) }}>{children}</FavoritesContext.Provider>;
}
export function useFavorites() {
    const value = useContext(FavoritesContext);
    if (!value)
        throw new Error('FavoritesProvider missing');
    return value;
}
