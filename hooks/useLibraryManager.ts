import { useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { BaseLibraryItem } from '../types';

export interface LibraryHandler<T extends BaseLibraryItem> {
    items: T[];
    onAdd: (item: T) => void;
    onUpdate: (item: T) => void;
    onDelete: (id: string) => void;
    onImport: (newItems: T[]) => void;
    onDeduplicate: () => void;
    setItems: (value: T[] | ((val: T[]) => T[])) => void;
}

export function useLibraryManager<T extends BaseLibraryItem>(key: string, initialItems: T[]): LibraryHandler<T> {
    const [storedItems, setStoredItems] = useLocalStorage<T[]>(key, initialItems);

    // Merge strategy: Always use official data from initialItems (the .ts files) and add custom items from storedItems.
    // This ensures that updates in the data folder are instantly reflected, fulfilling the "Core Source" requirement.
    const mergedItems = useMemo(() => {
        const officialIds = new Set(initialItems.map(i => i.id));
        const customItems = (storedItems || []).filter(i => !officialIds.has(i.id));
        return [...initialItems, ...customItems];
    }, [initialItems, storedItems]);

    const onAdd = (item: T) => setStoredItems(prev => [...(prev || []), item]);

    const onUpdate = (item: T) => setStoredItems(prev => (prev || []).map(i => i.id === item.id ? item : i));

    const onDelete = (id: string) => setStoredItems(prev => (prev || []).filter(i => i.id !== id));

    const onImport = (newItems: T[]) => setStoredItems(prev => {
        const existingIds = new Set((prev || []).map(i => i.id));
        const officialIds = new Set(initialItems.map(i => i.id));
        const toAdd = newItems.filter(i => !existingIds.has(i.id) && !officialIds.has(i.id));
        return [...(prev || []), ...toAdd];
    });

    const onDeduplicate = () => setStoredItems(prev => {
        const seen = new Map<string, T>();
        (prev || []).forEach(item => {
            const existing = seen.get(item.name);
            // Prioritize official versions if names collide
            if (!existing || (item.source === '官方规则' && existing.source !== '官方规则')) {
                seen.set(item.name, item);
            }
        });

        // After cleaning up, we only want to keep the custom items that still don't conflict with current official IDs
        const officialIds = new Set(initialItems.map(i => i.id));
        return Array.from(seen.values()).filter(i => !officialIds.has(i.id));
    });

    return { items: mergedItems, onAdd, onUpdate, onDelete, onImport, onDeduplicate, setItems: setStoredItems };
}
