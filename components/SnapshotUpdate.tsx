import type { ResourceSnapshot } from '../types';
import { useResourceCatalog } from '../hooks/useResourceCatalog';
import { resourceKey } from '../src/content/resourceIdentity';

/** Explicit refresh only; never match by name or update on render. */
export function SnapshotUpdate({ item, onUpdate }: {
    item: ResourceSnapshot;
    onUpdate: (item: ResourceSnapshot) => void;
}) {
    const matches = useResourceCatalog().filter(entry => resourceKey(entry) === resourceKey(item));
    if (matches.length !== 1) return null;
    const current = matches[0];
    const ignored = new Set(['characterSelectionGroup', 'inventoryEntryId', 'bookmarkedAt']);
    const changed = Object.keys(current).some(key => !ignored.has(key) && JSON.stringify(current[key]) !== JSON.stringify(item[key]));
    if (!changed) return null;
    return <button type="button" className="snapshot-update" title="此角色或收藏保存的是旧副本。用当前本地资料库刷新内容，保留手动等级、数量及状态。" onClick={() => onUpdate({ ...item, ...structuredClone(current), characterSelectionGroup: item.characterSelectionGroup })}>本地资料已变化 · 刷新此卡</button>;
}
