import { initialClass, clearStartingGrants, grantRemovalMessage } from '../../src/character/inventory';
import { LibraryOverlay } from '../LibraryNavigation';
import { NativeResourceCard } from '../NativeResourceCard';
import { useEffect, useRef, useState } from 'react';
import type { CharacterData, ResourceSnapshot } from '../../types';
import { removeResource } from '../../src/character/resources';
import { resourceKey } from '../../src/content/resourceIdentity';
import { CharacterResourcePicker } from './CharacterResourcePicker';
import { RichText } from '../RichText';
import { useResourceCatalog } from '../../hooks/useResourceCatalog';

export function classLevel(c: CharacterData, item: ResourceSnapshot, index: number) { return c.resourceClassLevels?.[resourceKey(item)] ?? (index === 0 ? Math.max(1, c.level - (c.resourceCards || []).filter(x => x.kind === 'classes' && resourceKey(x) !== resourceKey(item)).reduce((n, x) => n + (c.resourceClassLevels?.[resourceKey(x)] || 0), 0)) : 1); }
export function CharacterClasses({ character: c, updateCharacter: update, onSources, onView }: { character: CharacterData; updateCharacter: (v: Partial<CharacterData>) => void; onSources: () => void; onView: (item: ResourceSnapshot) => void }) {
    const catalog = useResourceCatalog();
    const [directoryOpen, setDirectoryOpen] = useState(false);
    const targets = useRef(new Map<string, HTMLElement>());
    useEffect(() => {
        if (!directoryOpen) return;
        const close = (event: KeyboardEvent) => { if (event.key === 'Escape') setDirectoryOpen(false); };
        document.addEventListener('keydown', close);
        return () => document.removeEventListener('keydown', close);
    }, [directoryOpen]);
    const featuresOf = (card: ResourceSnapshot): any[] => { const value = card.levelFeatures || card.fields?.levelFeatures || card.features; return Array.isArray(value) ? value : []; };
    const progression = (parent: ResourceSnapshot) => [parent, ...(c.resourceCards || []).filter(item => item.kind === 'subclasses' && item.characterSelectionGroup === resourceKey(parent))]
        .flatMap(card => featuresOf(card).map((feature, index) => ({ card, feature, id: resourceKey(card) + ':' + index })))
        .sort((a, b) => (Number.isFinite(Number(a.feature.level)) ? Number(a.feature.level) : Infinity) - (Number.isFinite(Number(b.feature.level)) ? Number(b.feature.level) : Infinity));
    const jump = (id: string) => {
        const node = targets.current.get(id); if (!node) return;
        let parent: HTMLElement | null = node;
        while (parent) { if (parent instanceof HTMLDetailsElement) parent.open = true; parent = parent.parentElement; }
        node.scrollIntoView({ block: 'start', behavior: 'smooth' }); setDirectoryOpen(false);
    };
    const classes = (c.resourceCards || []).filter(x => x.kind === 'classes');
    const orphans = (c.resourceCards || []).filter(item => item.kind === 'subclasses' && !classes.some(parent => resourceKey(parent) === item.characterSelectionGroup));
    const main = initialClass(c);
    const active = c.multiclassEnabled ? classes : classes.filter(item => item === main);
    const levels = Object.fromEntries(classes.map((item, i) => [resourceKey(item), classLevel(c, item, i)]));
    const removeClass = (item: ResourceSnapshot) => { const warning = grantRemovalMessage(c, [resourceKey(item)]); if (!warning || window.confirm(warning)) update(removeResource(c, item)); };
    const makeInitial = (item: ResourceSnapshot) => {
        if (item === main) return;
        const keys = main ? [resourceKey(main)] : [];
        const warning = grantRemovalMessage(c, keys);
        if (warning && !window.confirm(warning)) return;
        update({ ...clearStartingGrants(c, keys), initialClassKey: resourceKey(item) });
    };
    const total = active.reduce((n, item) => n + levels[resourceKey(item)], 0);
    useEffect(() => { if (classes.length && (total !== c.level || classes.some(item => c.resourceClassLevels?.[resourceKey(item)] === undefined))) update({ level: total, resourceClassLevels: { ...c.resourceClassLevels, ...levels } }); }, [c.resourceCards, c.multiclassEnabled, c.resourceClassLevels, total, c.level]);
    const match = (item: any, parent: any) => (item.parentClassId === parent.id || [parent.name, parent.englishName, parent.srdEnglishName].filter(Boolean).some(name => String(name).toLowerCase() === String(item.parentClass || item.fields?.parentClass || item.className || '').toLowerCase())) && (!item.parentClassSource || item.parentClassSource === parent.source) && (!item.sourceProvider || item.sourceProvider === parent.sourceProvider);
    return <div className="career-workspace">
      {directoryOpen && <LibraryOverlay title="职业目录" drawer side="right" onClose={() => setDirectoryOpen(false)}><nav className="outline-list library-overlay-scroll" aria-label="职业目录">
        {active.map(parent => { const key = resourceKey(parent); return <section key={key}><button type="button" onClick={() => jump(key)}>{parent.name}</button>{progression(parent).map(({ card, feature, id }) => <button type="button" className="outline-child" key={id} onClick={() => jump(id)}>{feature.level !== undefined ? feature.level + '级 · ' : ''}{feature.name}{card !== parent ? ' · ' + card.name : ''}</button>)}</section>; })}
      </nav></LibraryOverlay>}
      <div className="career-content">
        <div className="career-controls"><label><input type="checkbox" checked={!!c.multiclassEnabled} onChange={e => update({ multiclassEnabled: e.target.checked })}/>兼职</label><strong>总等级 {total}</strong></div>
        <CharacterResourcePicker character={c} updateCharacter={update} kinds={['classes']} selectedPresentation="none" heading={c.multiclassEnabled ? '职业' : '主职业'} selectedFilter={item => active.some(x => resourceKey(x) === resourceKey(item))} onManageSources={onSources}/>
        {active.map(parent => {
            const key = resourceKey(parent), level = levels[key];
            const children = (c.resourceCards || []).filter(item => item.kind === 'subclasses' && item.characterSelectionGroup === key);
            return <details className="career-section career-class-group" key={key} ref={node => { if (node) targets.current.set(key, node); else targets.current.delete(key); }}>
              <summary><strong>{parent.name}</strong><span>{level}级{children.length ? ' · ' + children.map(item => item.name).join(' / ') : ''}</span><button type="button" className="career-directory-toggle" aria-label="职业目录" aria-expanded={directoryOpen} onClick={event => { event.preventDefault(); event.stopPropagation(); setDirectoryOpen(value => !value); }}>☷</button></summary>
              <div className="career-class-body"><header className="career-class-actions"><label>等级<input type="number" min="1" max="20" value={level} onChange={e => { const value = Number(e.target.value); if (Number.isFinite(value)) update({ resourceClassLevels: { ...c.resourceClassLevels, ...levels, [key]: Math.max(1, Math.min(20, Math.trunc(value))) } }); }}/></label><button type="button" aria-pressed={parent === main} onClick={() => makeInitial(parent)}>{parent === main ? '初始职业' : '设为初始职业'}</button><button onClick={() => onView(parent)}>全文</button><button aria-label={'移除' + parent.name} onClick={() => removeClass(parent)}>×</button></header>
              <CharacterResourcePicker character={c} updateCharacter={update} kinds={['subclasses']} selectedPresentation="row" selectionGroup={key} filterCandidate={item => match(item, parent)} onManageSources={onSources}/>
              <div className="career-features">
                {progression(parent).map(({ card, feature, id }) => <details key={id} ref={node => { if (node) targets.current.set(id, node); else targets.current.delete(id); }} className={'career-feature' + (Number.isFinite(Number(feature.level)) && Number(feature.level) <= level ? ' is-active' : '')}><summary><span>{feature.level !== undefined ? feature.level + '级' : '—'}</span><strong>{feature.name}</strong>{card !== parent && <small>{card.name}</small>}</summary><NativeResourceCard item={card}><RichText text={feature.description || feature.fullDescription}/></NativeResourceCard></details>)}
                {[parent, ...children].filter(card => !featuresOf(card).length).map(card => { const current = catalog.find(item => resourceKey(item) === resourceKey(card)); return current?.levelFeatures?.length > 0 ? <button key={resourceKey(card)} onClick={() => update({ resourceCards: (c.resourceCards || []).map(item => resourceKey(item) === resourceKey(card) ? { ...item, ...structuredClone(current), characterSelectionGroup: item.characterSelectionGroup } : item) })}>更新{card.name}分级特性</button> : null; })}
              </div></div>
            </details>;
        })}
        {orphans.length > 0 && <details><summary>未关联职业的子职业 · {orphans.length}</summary>{orphans.map(item => <div className="selected-resource-rows" key={resourceKey(item)}><button onClick={() => onView(item)}>{item.name}</button><button aria-label={'移除' + item.name} onClick={() => removeClass(item)}>×</button></div>)}</details>}
        {!c.multiclassEnabled && classes.length > 1 && <p>已保留 {classes.length - 1} 个副职业</p>}
      </div>
    </div>;
}
