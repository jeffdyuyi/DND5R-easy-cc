import { Raw } from './model';

/** Use labels stored in the requested metadata namespace, never global name aliases. */
export function itemMetadataName(record: Raw | undefined, namespace: 'property' | 'type' = 'property'): string | undefined {
    const entry = Array.isArray(record?.entries)
        ? record.entries.find((value: unknown) => value && typeof value === 'object' && typeof (value as Raw).name === 'string')
        : undefined;
    return namespace === 'type' ? record?.name || entry?.name : entry?.name || record?.name;
}

/** Exact forms explicitly described by the 2024 core item records; not a general name heuristic. */
export function coreFocusForm(record: Raw, provider: string) {
    if (provider !== '5etools-cn' || record.source !== 'XPHB' || record.scfType !== 'holy') return undefined;
    const forms: Record<string, 'worn-or-held' | 'attached' | 'held'> = { Amulet:'worn-or-held', Emblem:'attached', Reliquary:'held', 护符:'worn-or-held', 纹章:'attached', 圣物匣:'held' };
    return forms[record.ENG_name || record.name];
}

/** Unqualified codes may reuse a label only when all same-provider definitions agree. */
export function itemTypeLabel(records: Raw[], code: string, source: string, provider: string, explicitSource = false) {
    const candidates = records.filter(row => row.abbreviation === code && (row.__origin?.repository || '5etools-cn') === provider);
    const exact = candidates.filter(row => String(row.source || 'PHB').toLowerCase() === source.toLowerCase());
    const labels = (rows: Raw[]) => [...new Set(rows.map(row => itemMetadataName(row, 'type')).filter((name): name is string => !!name))];
    const names = labels(exact);
    if (names.length === 1) return names[0];
    if (names.length || explicitSource) return undefined;
    const fallback = labels(candidates);
    return fallback.length === 1 ? fallback[0] : undefined;
}
