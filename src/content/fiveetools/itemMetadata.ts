import { Raw } from './model';

/** Use labels stored in the requested metadata namespace, never global name aliases. */
export function itemMetadataName(record: Raw | undefined): string | undefined {
    const entry = Array.isArray(record?.entries)
        ? record.entries.find((value: unknown) => value && typeof value === 'object' && typeof (value as Raw).name === 'string')
        : undefined;
    return entry?.name || record?.name;
}
