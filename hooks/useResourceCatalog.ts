import { resourceKey } from '../src/content/resourceIdentity';
import { useMemo } from 'react';
import { useLibrary } from '../contexts/LibraryContext';
import { useExternalLibrary } from '../contexts/ExternalResourceContext';
import { getOfflineLibraries } from '../src/content/offline';
import { CHARACTER_RESOURCE_KINDS, RULE_TYPES } from '../src/content/resourceRegistry';
import { userResourceView } from '../src/content/userResources';
const cache = new WeakMap<object, {
    entries: any[];
    resources: any[];
}>();
export function useResourceCatalog() {
    const library = useLibrary(), external = useExternalLibrary();
    return useMemo(() => {
        const cached = cache.get(library);
        if (cached?.entries === external.entries)
            return cached.resources;
        const old = getOfflineLibraries('5.1'), modern = getOfflineLibraries('5.2.1'), records = new Map<string, any>();
        for (const kind of new Set<string>([...CHARACTER_RESOURCE_KINDS, ...RULE_TYPES.map(type => type.kind)])) {
            const handler = (library as any)[kind];
            for (const raw of [...(old[kind] || []), ...(modern[kind] || []), ...external.entries.filter(item => item.kind === kind), ...(handler?.items || []), ...(handler?.userItems || [])]) {
                const item = userResourceView(raw, kind);
                records.set(resourceKey(item), item);
            }
        }
        const resources = [...records.values()];
        cache.set(library, { entries: external.entries, resources });
        return resources;
    }, [library, external.entries]);
}
