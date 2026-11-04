// The parser keeps complete subrace cards for selection; the list groups them under their source parent.
export function groupSpecies<T extends {
    id: string;
    kind?: string;
    name: string;
    source?: string;
    sourceProvider?: string;
    parentResource?: {
        name: string;
        source: string;
    };
}>(items: T[]): {
    primary: T;
    variants: T[];
}[] {
    const groups: {
        primary: T;
        variants: T[];
    }[] = [];
    const parentKey = (item: T) => `${item.sourceProvider || ''}|${item.source || ''}|${item.name}`;
    const roots = new Map(items.filter(item => !item.parentResource).map(item => [parentKey(item), item]));
    const variants = new Map<string, T[]>();
    for (const item of items) {
        const parent = item.parentResource;
        if (!parent)
            continue;
        const key = `${item.sourceProvider || ''}|${parent.source || ''}|${parent.name}`;
        const siblings = variants.get(key) || [];
        siblings.push(item);
        variants.set(key, siblings);
    }
    const added = new Set<string>();
    for (const item of items) {
        const key = item.parentResource ? `${item.sourceProvider || ''}|${item.parentResource.source || ''}|${item.parentResource.name}` : parentKey(item);
        if (added.has(key))
            continue;
        added.add(key);
        const root = roots.get(key);
        const children = variants.get(key) || [];
        groups.push(root ? { primary: root, variants: children } : { primary: item, variants: children.filter(child => child.id !== item.id) });
    }
    return groups;
}
