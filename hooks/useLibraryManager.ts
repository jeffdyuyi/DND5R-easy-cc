import { useLocalStorage } from './useLocalStorage';

export interface LibraryHandler<T extends { id: string }> {
    items: T[];
    onAdd: (item: T) => void;
    onUpdate: (item: T) => void;
    onDelete: (id: string) => void;
    onImport: (newItems: T[]) => void;
    setItems: (value: T[] | ((val: T[]) => T[])) => void;
}

export function useLibraryManager<T extends { id: string }>(key: string, initialItems: T[]): LibraryHandler<T> {
    const [items, setItems] = useLocalStorage<T[]>(key, initialItems);

    const onAdd = (item: T) => setItems(prev => [...prev, item]);

    const onUpdate = (item: T) => setItems(prev => prev.map(i => i.id === item.id ? item : i));

    const onDelete = (id: string) => setItems(prev => prev.filter(i => i.id !== id));

    const onImport = (newItems: T[]) => setItems(prev => {
        const existingIds = new Set(prev.map(i => i.id));
        const toAdd = newItems.filter(i => !existingIds.has(i.id));
        return [...prev, ...toAdd];
    });

    return { items, onAdd, onUpdate, onDelete, onImport, setItems };
}
