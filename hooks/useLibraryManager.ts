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
    const [items, setItems] = useLocalStorage<T[]>(key, initialItems);

    const onAdd = (item: T) => setItems(prev => [...prev, item]);

    const onUpdate = (item: T) => setItems(prev => prev.map(i => i.id === item.id ? item : i));

    const onDelete = (id: string) => setItems(prev => prev.filter(i => i.id !== id));

    const onImport = (newItems: T[]) => setItems(prev => {
        const existingIds = new Set(prev.map(i => i.id));
        const toAdd = newItems.filter(i => !existingIds.has(i.id));
        return [...prev, ...toAdd];
    });

    const onDeduplicate = () => setItems(prev => {
        const seen = new Map<string, T>();
        prev.forEach(item => {
            const existing = seen.get(item.name);
            // Prioritize official versions if names collide
            if (!existing || (item.source === '官方规则' && existing.source !== '官方规则')) {
                seen.set(item.name, item);
            }
        });
        return Array.from(seen.values());
    });

    return { items, onAdd, onUpdate, onDelete, onImport, onDeduplicate, setItems };
}
