/** Keep this encoding stable: existing character snapshots and settings use these keys. */
export interface ResourceIdentity {
    kind?: string;
    sourceProvider?: string;
    contentOrigin?: string;
    source?: string;
    id?: string;
}
export const resourceKey = (item: ResourceIdentity) => [item.kind, item.sourceProvider || item.contentOrigin || '', item.source, item.id].join('|');
export const characterSourceKey = (item: ResourceIdentity) => [item.sourceProvider || item.contentOrigin || '', item.source].join('|');
export const characterAllows = (character: {
    allowedResourceSources?: string[];
}, item: ResourceIdentity) => character.allowedResourceSources?.includes(characterSourceKey(item)) ?? false;
