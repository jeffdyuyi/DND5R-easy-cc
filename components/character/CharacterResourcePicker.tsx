import { useModalDialog } from '../common/useModalDialog';
import { ReaderOutline } from '../common/ReaderOutline';
import { inventoryLots, setInventoryQuantity, grantRemovalMessage } from '../../src/character/inventory';
import { useFullscreenReader } from '../common/useFullscreenReader';
import { SnapshotUpdate } from '../SnapshotUpdate';
import { refreshCharacterSnapshot } from '../../src/character/resources';
import { DialogDismissButton, useDialogBackdrop } from '../common/DialogControls';
import { ReaderNavigation } from '../common/ReaderNavigation';
import { SpellFilters, spellClasses } from './SpellFilters';
import { groupSpecies } from '../../src/content/speciesGroups';
import { isEquipmentKind } from '../../src/content/resourceRegistry';
import { selectResource, removeResource } from '../../src/character/resources';
import { resourceKey, characterAllows } from '../../src/content/resourceIdentity';
import React, { useMemo, useState, useEffect, useRef } from 'react';
import { ItemAttunementToggle } from './ItemAttunementToggle';
import { createPortal } from 'react-dom';
import { resourceLabels } from '../../src/content/resourceRegistry';
import { ResourcePreview } from '../ResourcePreview';
import { NativeResourceCard } from '../NativeResourceCard';
import { CharacterData } from '../../types';
import { useResourceCatalog } from '../../hooks/useResourceCatalog';
export function CharacterResourcePicker({ character, updateCharacter, kinds, readOnly = false, filterCandidate, onChoose, selectionGroup, onManageSources, initialOpen = false, selectionTitle, hideSelected = false, onDismiss, filterTools, heading, selectedFilter, selectedPresentation = 'card', spellFilterControls, fixedCategory = false, allowRepeat = false }: {
    fixedCategory?: boolean;
    allowRepeat?: boolean;
    character: CharacterData;
    updateCharacter: (updates: Partial<CharacterData>) => boolean;
    kinds: readonly string[];
    readOnly?: boolean;
    filterCandidate?: (item: any) => boolean;
    onChoose?: (item: any, updates: Partial<CharacterData>) => boolean;
    selectionGroup?: string;
    onManageSources?: () => void;
    initialOpen?: boolean;
    selectionTitle?: string;
    hideSelected?: boolean;
    onDismiss?: () => void;
    filterTools?: React.ReactNode;
    heading?: string;
    spellFilterControls?: React.ReactNode;
    selectedPresentation?: 'card' | 'row' | 'none';
    selectedFilter?: (item: any) => boolean;
}) {
    const catalog = useResourceCatalog();
    const [referenceDepth, setReferenceDepth] = useState(0);
    const referenceBack = useRef<(() => void) | null>(null);
    const dialog = useRef<HTMLDialogElement>(null), listScroll = useRef<HTMLDivElement>(null);
    const [selectedTier, setSelectedTier] = useState('全部');
    const listGesture = useRef<{ x: number; y: number } | null>(null);
    const swiped = useRef(false);
    const [notice, setNotice] = useState(''), [level, setLevel] = useState('全部'), [spellCareer, setSpellCareer] = useState('全部');
    const [kind, setKind] = useState(kinds[0]), [page, setPage] = useState(1), [view, setView] = useState<any>(null), [panel, setPanel] = useState(initialOpen), [facet, setFacet] = useState('全部');
    useEffect(() => { setReferenceDepth(0); referenceBack.current = null; }, [view]);
    useEffect(() => {
        const node = dialog.current;
        if (!node)
            return;
        const update = (event: Event) => {
            const detail = (event as CustomEvent<{
                depth: number;
                back: () => void;
            }>).detail;
            setReferenceDepth(detail.depth);
            referenceBack.current = detail.back;
        };
        node.addEventListener('easy-cc-reference', update);
        return () => node.removeEventListener('easy-cc-reference', update);
    }, [panel, view]);
    useModalDialog(dialog, panel || !!view);
    const close = () => { setReferenceDepth(0); referenceBack.current = null; dialog.current?.close(); setView(null); setPanel(false); onDismiss?.(); };
    useFullscreenReader(dialog, close, panel || !!view);
    const dismiss = () => { if (referenceDepth > 0) referenceBack.current?.(); else close(); };
    const backdrop = useDialogBackdrop(dismiss);
    const all = useMemo(() => catalog.filter(item => (fixedCategory ? kinds.includes(item.kind) : item.kind === kind) && (!filterCandidate || filterCandidate(item))), [catalog, kind, filterCandidate, fixedCategory, kinds]);
    const selected = (character.resourceCards || []).filter(item => kinds.includes(item.kind) && (!selectionGroup || item.characterSelectionGroup === selectionGroup) && (!selectedFilter || selectedFilter(item)));
    const category = (item: any) => { const fields = { ...item, ...item.fields }; return String(item.kind === 'spells' ? fields.school || '未注明' : fields.languageType || fields.featCategory || fields.optionCategory || fields.charOptionCategory || fields.rewardType || fields.psionicType || fields.weaponCategory || fields.armorCategory || fields.toolCategory || fields.type || '未注明'); };
    const facets = [...new Set(all.filter(item => characterAllows(character, item)).map(category))];
    const visible = all.filter(item => characterAllows(character, item) && (level === '全部' || String(item.level ?? item.fields?.level) === level) && (facet === '全部' || category(item) === facet) && (kind !== 'spells' || spellCareer === '全部' || spellClasses(item).includes(spellCareer)));
    const displayGroups = kind === 'species' ? groupSpecies(visible) : visible.map(primary => ({ primary, variants: [] as any[] }));
    const pages = Math.max(1, Math.ceil(displayGroups.length / 12)), current = Math.min(page, pages);
    const changePage = (next: number) => {
        setPage(Math.min(pages, Math.max(1, next)));
        listScroll.current?.scrollTo(0, 0);
    };
    const pageSwipeStart = (event: React.TouchEvent) => {
        swiped.current = false;
        const touch = event.touches[0];
        listGesture.current = event.touches.length === 1 ? { x: touch.clientX, y: touch.clientY } : null;
    };
    const pageSwipeEnd = (event: React.TouchEvent) => {
        const start = listGesture.current; listGesture.current = null;
        const touch = event.changedTouches[0];
        if (!start || !touch || event.touches.length || window.getSelection()?.toString()) return;
        const dx = touch.clientX - start.x, dy = touch.clientY - start.y;
        if (Math.abs(dx) < 70 || Math.abs(dx) < Math.abs(dy) * 2) return;
        swiped.current = true;
        changePage(current + (dx < 0 ? 1 : -1));
    };
    const choose = (item: any) => {
        const updates = selectResource(character, item, selectionGroup);
        if (!updates)
            return;
        const removed = (character.resourceCards || []).filter(old => !updates.resourceCards!.some(next => resourceKey(next) === resourceKey(old))).map(resourceKey);
        const warning = grantRemovalMessage(character, removed);
        if (warning && !window.confirm(warning)) return;
        const snapshot = updates.resourceCards!.find(card => resourceKey(card) === resourceKey(item))!;
        if (onChoose) {
            if (!onChoose(snapshot, updates)) return;
        }
        else if (updateCharacter(updates) === false)
            return;
        setNotice('');
        if (item.kind !== 'spells' || onChoose) close();
    };
    const setCardSetting = (item: any, field: 'quantity' | 'totalUses' | 'usedUses', value: number | undefined) => { const key = resourceKey(item); if (field === 'quantity') { const lot = inventoryLots(character).find(lot => lot.id === 'manual:' + key); if (lot) updateCharacter(setInventoryQuantity(character, lot, value ?? 1)); return; } updateCharacter({ resourceCardSettings: { ...character.resourceCardSettings, [key]: { ...character.resourceCardSettings?.[key], [field]: value } } }); };
    const readingItems = panel ? visible : selected;
    const readingIndex = view ? readingItems.findIndex(item => resourceKey(item) === resourceKey(view)) : -1;
    const savedReadingPositions = useRef(new Map<string, number>());
    const moveSpell = (step: number) => {
        const next = readingItems[readingIndex + step];
        if (!next) return;
        if (view) savedReadingPositions.current.set(resourceKey(view), dialog.current?.querySelector('.picker-detail-scroll')?.scrollTop || 0);
        setView(next);
    };
    useEffect(() => {
        const node = dialog.current?.querySelector('.picker-detail-scroll');
        if (node && view) node.scrollTop = savedReadingPositions.current.get(resourceKey(view)) || 0;
    }, [view]);
    const remove = (item: any) => { const warning = grantRemovalMessage(character, [resourceKey(item)]); if (!warning || window.confirm(warning)) updateCharacter(removeResource(character, item)); };
    return <div className="builder-resource-picker">
  {readOnly && !selected.length && <p>尚未收录资源。</p>}
  {!hideSelected && selectedPresentation !== 'none' && (
    <div className={selectedPresentation === 'row' ? 'selected-resource-rows' : 'builder-selected-resources'}>
      {kinds.length === 1 && kinds[0] === 'spells' && <nav className="spell-tier-tabs" style={{ gridColumn: '1 / -1' }} aria-label="已收录法术环位">{['全部', ...new Set(selected.map(item => String(item.level ?? item.fields?.level ?? '未注明')).sort((a, b) => Number(a) - Number(b)))].map(tier => <button type="button" key={tier} aria-pressed={selectedTier === tier} onClick={() => setSelectedTier(tier)}>{tier === '全部' || tier === '未注明' ? tier : tier === '0' ? '戏法' : tier + '环'}</button>)}</nav>}
      {selected.filter(item => kinds[0] !== 'spells' || selectedTier === '全部' || String(item.level ?? item.fields?.level ?? '未注明') === selectedTier).map(item => {
        const key = resourceKey(item);
        return (
          <div className="selected-card-frame" key={key}>
            {selectedPresentation === 'row' ? <button type="button" className="selected-resource-name" onClick={() => { setPanel(false); setView(item); }}>{item.name}</button> : <ResourcePreview variant="selected" item={item} onSelect={() => { setPanel(false); setView(item); }}/>}
            {isEquipmentKind(item.kind) && (
              <ItemAttunementToggle character={character} item={item} updateCharacter={updateCharacter}/>
            )}
            {!readOnly && (
              <button type="button" className="selected-card-remove" onClick={() => remove(item)} aria-label={'移除' + item.name}>×</button>
            )}
          </div>
        );
      })}
    </div>
  )}

  {!hideSelected && !readOnly && !(kinds.length === 1 && (['species', 'backgrounds', 'subclasses'].includes(kinds[0]) || kinds[0] === 'classes' && !character.multiclassEnabled) && selected.length > 0) && <button type="button" className="resource-selection-slot" onClick={() => setPanel(true)}><strong>＋ {selected.length ? '添加' : '选择'}{heading || (kinds.length === 1 ? resourceLabels[kinds[0]] : '资源卡')}</strong></button>}
  {(panel || view) && createPortal(<dialog ref={dialog} className={'character-picker-dialog' + (view ? ' is-reading' : '')} {...backdrop} data-reference-depth={referenceDepth > 0 ? referenceDepth : undefined} aria-label="角色资源选择与阅读" onCancel={e => { e.preventDefault(); dismiss(); }}>
   <header className="picker-toolbar">{view && <ReaderOutline identity={view.id}/>}<DialogDismissButton back={referenceDepth > 0 || !!(view && panel)} label={referenceDepth > 0 ? '返回原文' : view && panel ? '返回列表' : '关闭选卡'} onClick={() => referenceDepth > 0 ? referenceBack.current?.() : view && panel ? setView(null) : close()}/><strong>{view ? view.name : selectionTitle || '选择' + resourceLabels[kind]}</strong></header>
   <div className={'picker-workspace' + (view ? ' has-detail' : '') + (panel ? '' : ' detail-only')}>
    {panel && !view && referenceDepth === 0 && <div className="picker-list-shell"><div className="picker-list" ref={listScroll}>
     <div className="picker-filters">{filterTools}
      {!fixedCategory && kinds.length > 1 && <div className="picker-tabs">{kinds.map(value => <button type="button" key={value} aria-pressed={kind === value} onClick={() => { setKind(value); setFacet('全部'); setLevel('全部'); setPage(1); setView(null); }}>{resourceLabels[value]}</button>)}</div>}
      
      {kind === 'spells' ? <details className="picker-spell-filters" onClickCapture={event => { if ((event.target as Element).closest('button')) setPage(1); }}><summary>筛选法术{[level !== '全部' && (level === '0' ? '戏法' : level + '环'), facet !== '全部' && facet, spellCareer !== '全部' && spellCareer].filter(Boolean).length > 0 && <small> · {[level !== '全部' && (level === '0' ? '戏法' : level + '环'), facet !== '全部' && facet, spellCareer !== '全部' && spellCareer].filter(Boolean).join(' / ')}</small>}</summary>{spellFilterControls || <SpellFilters items={all.filter(item => characterAllows(character, item))} level={level} school={facet} career={spellCareer} onChange={(field, value) => { if (field === 'level') setLevel(value); else if (field === 'school') setFacet(value); else setSpellCareer(value); setPage(1); }}/>}</details> : facets.length > 1 && <div className="choice-chips" role="group" aria-label="分类">{['全部', ...facets].map(value => <button type="button" key={value} aria-pressed={facet === value} onClick={() => { setFacet(value); setPage(1); }}>{value}</button>)}</div>}

     </div>
     <div className="builder-resource-grid picker-page-grid" onTouchStart={pageSwipeStart} onTouchEnd={pageSwipeEnd} onTouchCancel={() => { listGesture.current = null; }} onTouchMove={event => { if (event.touches.length !== 1) listGesture.current = null; }} onClickCapture={event => { if (swiped.current) { event.preventDefault(); event.stopPropagation(); swiped.current = false; } }}>{displayGroups.slice((current - 1) * 12, current * 12).map(({ primary: item, variants }) => <div key={resourceKey(item)}><ResourcePreview item={item} onSelect={() => setView(item)}/>{!allowRepeat && selected.some(card => resourceKey(card) === resourceKey(item)) && <span className="picker-added">✓ 已添加</span>}{variants.length > 0 && <details className="species-variant-options"><summary>同源选项 · {variants.length} 项</summary>{variants.map(variant => <button type="button" key={resourceKey(variant)} onClick={() => setView(variant)}>{variant.name}<small>{variant.source}</small></button>)}</details>}</div>)}</div>
     {!visible.length && <div><p>没有匹配资源，请调整分类或本角色可用资料。</p>{onManageSources && <button type="button" onClick={() => { close(); onManageSources(); }}>修改本角色可用资料</button>}</div>}
    </div>{pages > 1 && <nav className="builder-resource-pagination picker-bottom-pagination" aria-label="底部分页"><button type="button" disabled={current === 1} onClick={() => changePage(current - 1)}>上一页</button><span aria-live="polite">{current} / {pages}</span><button type="button" disabled={current === pages} onClick={() => changePage(current + 1)}>下一页</button></nav>}</div>}
    {view && <div className="picker-detail" key={resourceKey(view)}><div className="picker-detail-scroll" key={resourceKey(view)}><NativeResourceCard item={view}/></div><footer className="picker-detail-footer" onClick={event => { if (event.target === event.currentTarget) dismiss(); }}>{referenceDepth === 0 && !panel && !readOnly && <SnapshotUpdate item={view} onUpdate={next => { if (updateCharacter(refreshCharacterSnapshot(character, next)) !== false) setView(next); }}/>}{referenceDepth === 0 && !panel && !readOnly && selected.some(item => resourceKey(item) === resourceKey(view)) && (isEquipmentKind(view.kind) || ['feats', 'optionalFeatures', 'charOptions', 'rewards', 'psionics'].includes(view.kind)) && <div className="builder-manual-fields">{(['quantity', 'totalUses', 'usedUses'] as const).filter(field => field !== 'quantity' || isEquipmentKind(view.kind)).map(field => <label key={field}>{({ quantity: '数量', totalUses: '总次数', usedUses: '已用次数' })[field]}<input type="number" min="0" value={character.resourceCardSettings?.[resourceKey(view)]?.[field] ?? ''} onChange={e => setCardSetting(view, field, e.target.value === '' ? undefined : Math.max(0, Number(e.target.value)))}/></label>)}</div>}{referenceDepth === 0 && isEquipmentKind(view.kind) && selected.some(item => resourceKey(item) === resourceKey(view)) && <ItemAttunementToggle character={character} item={view} updateCharacter={updateCharacter}/>}{referenceDepth === 0 ? <ReaderNavigation index={readingIndex} count={readingItems.length} onPrevious={() => moveSpell(-1)} onNext={() => moveSpell(1)}><button type="button" disabled={readOnly || !panel || !characterAllows(character, view) || !allowRepeat && selected.some(item => resourceKey(item) === resourceKey(view))} onClick={() => choose(view)}>{!allowRepeat && selected.some(item => resourceKey(item) === resourceKey(view)) ? '已添加' : '添加到角色'}</button></ReaderNavigation> : <button type="button" onClick={() => referenceBack.current?.()}>返回原文</button>}</footer></div>}
   </div><div className="picker-notice" role="status">{notice}</div>
  </dialog>, document.body)}
 </div>;
}
