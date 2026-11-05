import { SnapshotUpdate } from './SnapshotUpdate';
import { LibraryNavigation } from './LibraryNavigation';
import { sourceLabel } from '../src/content/sourceNames';
import { characterSourceKey, resourceKey } from '../src/content/resourceIdentity';
import { useState } from 'react';
import { useFavorites } from '../contexts/FavoritesContext';
import { resourceLabels } from '../src/content/resourceRegistry';
import { CardLibrary } from './CardLibrary';
import { ResourceReader } from './ResourceReader';
import { NativeResourceCard } from './NativeResourceCard';
export function FavoritesWorkspace({ onBrowse }: {
    onBrowse: () => void;
}) {
    const { favorites, refresh } = useFavorites(), [kind, setKind] = useState('all'), [view, setView] = useState<any>(null);
    const kinds = [...new Set(favorites.map(record => record.item.kind))];
    const activeKind = kinds.includes(kind) ? kind : 'all';
    const [readingItems, setReadingItems] = useState<any[]>([]);
    const [sources, setSources] = useState<string[] | null>(null);
    const all = favorites.map(record => record.item);
    const sourceChoices = [...new Set(all.map(characterSourceKey))];
    const items = favorites.map(record => record.item).filter(item => activeKind === 'all' || item.kind === activeKind).filter(item => sources === null || sources.includes(characterSourceKey(item)));
    return <section className="app-workspace favorites-workspace">{!favorites.length ? <div className="workspace-empty"><LibraryNavigation categories={[{ id: 'all', label: '全部收藏', count: favorites.length }, ...kinds.map(value => ({ id: value, label: resourceLabels[value] || value, count: all.filter(item => item.kind === value).length }))]} current={activeKind} onCategory={setKind} sources={sourceChoices.map(source => ({ id: source, label: sourceLabel(all.find(item => characterSourceKey(item) === source) || { source }), count: all.filter(item => characterSourceKey(item) === source).length }))} selectedSources={sources ?? sourceChoices} onSources={setSources}/><h2>还没有收藏</h2><p>在速查资源卡上点击心形收藏按钮，即可在这里阅读。</p><button type="button" onClick={onBrowse}>前往速查</button></div> : <CardLibrary groupByKind toolbar={<LibraryNavigation categories={[{ id: 'all', label: '全部收藏', count: favorites.length }, ...kinds.map(value => ({ id: value, label: resourceLabels[value] || value, count: all.filter(item => item.kind === value).length }))]} current={activeKind} onCategory={setKind} sources={sourceChoices.map(source => ({ id: source, label: sourceLabel(all.find(item => characterSourceKey(item) === source) || { source }), count: all.filter(item => characterSourceKey(item) === source).length }))} selectedSources={sources ?? sourceChoices} onSources={setSources}/>} title="收藏" items={items} itemKind="favorites" itemTypeLabel="收藏" onSelect={(item, visible) => { setReadingItems(visible || items); setView(item); }}/>}{view && <ResourceReader item={view} items={readingItems} onChange={setView} onClose={() => setView(null)}><div className="user-resource-detail-actions"><SnapshotUpdate item={view} onUpdate={next => { if (!refresh(next)) return; setView(next); setReadingItems(old => old.map(item => resourceKey(item) === resourceKey(next) ? next : item)); }}/></div><NativeResourceCard item={view}/></ResourceReader>}</section>;
}
