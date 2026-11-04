import { characterSourceKey } from '../src/content/resourceIdentity';
import { RuleChapter } from './RuleChapter';
import { useState } from 'react';
import { useExternalLibrary } from '../contexts/ExternalResourceContext';
import { LibraryNavigation } from './LibraryNavigation';
import { CardLibrary } from './CardLibrary';
import { ResourceReader } from './ResourceReader';
import { NativeResourceCard } from './NativeResourceCard';
import { sourceLabel } from '../src/content/sourceNames';

const categories = [
    { id: 'gameplayRules', label: '游戏玩法', kinds: ['gameplayRules'] },
    { id: 'creationRules', label: '创建角色', kinds: ['creationRules'] },
    { id: 'languages', label: '语言', kinds: ['languages'] },
    { id: 'conditions', label: '状态与疾病', kinds: ['conditions', 'diseases', 'statuses'] },
    { id: 'actions', label: '动作', kinds: ['actions'] },
];

export function RulesWorkspace() {
    const external = useExternalLibrary();
    const [category, setCategory] = useState('gameplayRules');
    const [readingItems, setReadingItems] = useState<any[]>([]);
    const [sources, setSources] = useState<string[] | null>(null);
    const [view, setView] = useState<any>(null);
    const current = categories.find(item => item.id === category) || categories[0];
    const all: any[] = external.entries.filter(item => current.kinds.includes(item.kind));
    const sourceChoices = [...new Set<string>(all.map(characterSourceKey))];
    const chapter = category === 'gameplayRules' || category === 'creationRules';
    const items = all.filter(item => sources === null || sources.includes(characterSourceKey(item)));
    const orderedSections = [...items].sort((a, b) => (a.structuredSupplement?.sectionIndex ?? 0) - (b.structuredSupplement?.sectionIndex ?? 0));
    const diceIndex = category === 'gameplayRules' ? orderedSections.findIndex(item => item.englishName === 'Dice' || item.raw?.ENG_name === 'Dice') : -1;
    const visibleSections = diceIndex >= 0 ? orderedSections.slice(diceIndex) : orderedSections;
    return <section className="rules-workspace app-workspace rules-catalog" aria-label="规则">
        <nav className="rules-top-tabs" aria-label="规则页签">{categories.map(tab => <button key={tab.id} type="button" aria-current={category === tab.id ? 'page' : undefined} onClick={() => { setCategory(tab.id); setSources(null); setView(null); }}>{tab.label}</button>)}</nav>
        {chapter ? <RuleChapter key={category} items={visibleSections} /> : <CardLibrary toolbar={<LibraryNavigation categories={categories.map(item => ({ id: item.id, label: item.label, count: external.entries.filter(record => item.kinds.includes(record.kind)).length }))} current={current.id} onCategory={id => { setCategory(id); setSources(null); }} sources={sourceChoices.map(source => ({ id: source, label: sourceLabel(all.find(item => characterSourceKey(item) === source) || { source }), count: all.filter(item => characterSourceKey(item) === source).length }))} selectedSources={sources ?? sourceChoices} onSources={setSources} />} title={current.label} items={items} itemTypeLabel={current.label} itemKind={current.id} onSelect={(item, visible) => { setReadingItems(visible || items); setView(item); }} />}
        {!all.length && <p>当前没有已启用的此类资料。请在信息页下载、导入或启用资料。</p>}
        {view && <ResourceReader item={view} items={readingItems} onChange={setView} onClose={() => setView(null)}><NativeResourceCard item={view} /></ResourceReader>}
    </section>;
}



