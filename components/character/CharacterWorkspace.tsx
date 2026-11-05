import { CharacterQuickView } from './CharacterQuickView';
import { ReaderOutline } from '../common/ReaderOutline';
import { CharacterBuildSummary } from './CharacterBuildSummary';
import { StartingEquipment } from './StartingEquipment';
import { CharacterInventory } from './CharacterInventory';
import { initialClass } from '../../src/character/inventory';
import { useFullscreenReader } from '../common/useFullscreenReader';
import { SnapshotUpdate } from '../SnapshotUpdate';
import { refreshCharacterSnapshot } from '../../src/character/resources';
import { DialogDismissButton, useDialogBackdrop } from '../common/DialogControls';
import { CharacterOrigin } from './CharacterOrigin';
import { CharacterClasses } from './CharacterClasses';
import { CharacterSpells } from './CharacterSpells';
import { CharacterSupplies } from './CharacterSupplies';
import { LegacyCharacterRecords } from './LegacyCharacterRecords';
import { EQUIPMENT_KINDS as gearKinds } from '../../src/content/resourceRegistry';
import { useState, useRef, useEffect } from 'react';
import { CharacterData } from '../../types';
import { ItemAttunementToggle } from './ItemAttunementToggle';
import { CharacterSources } from './CharacterSources';
import { CharacterResourcePicker } from './CharacterResourcePicker';
import { NativeResourceCard } from '../NativeResourceCard';
interface Props {
    character: CharacterData;
    updateCharacter: (updates: Partial<CharacterData>) => boolean;
    onComplete: () => void;
    mode: 'overview' | 'edit';
    onMode: (mode: 'overview' | 'edit') => void;
    initialTab?: string;
}
const tabs = [['origin', '起源'], ['classes', '职业'], ['features', '特性'], ['spells', '法术'], ['gear', '背包']] as const;
export default function CharacterWorkspace({ character: c, updateCharacter: update, onComplete, mode, onMode, initialTab }: Props) {
    const [tab, setTab] = useState(initialTab || 'origin'), [sources, setSources] = useState(mode === 'edit' && !c.allowedResourceSources), [view, setView] = useState<any>(null);
    const [referenceDepth, setReferenceDepth] = useState(0);
    const referenceBack = useRef<(() => void) | null>(null);
    const reader = useRef<HTMLDialogElement>(null), pageScroll = useRef<HTMLElement>(null), positions = useRef<Record<string, number>>({});
    useEffect(() => { setReferenceDepth(0); referenceBack.current = null; }, [view]);
    useEffect(() => {
        const node = reader.current;
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
    }, [view]);
    useEffect(() => { pageScroll.current?.scrollTo(0, positions.current[tab] || 0); }, [tab]);
    useEffect(() => { setView(null); reader.current?.close(); pageScroll.current?.scrollTo(0, 0); if (mode === 'edit' && !c.allowedResourceSources) setSources(true); }, [mode]);
    const switchTab = (next: string) => { positions.current[tab] = pageScroll.current?.scrollTop || 0; setView(null); reader.current?.close(); setTab(next); };
    useEffect(() => {
        if (view && !reader.current?.open)
            reader.current?.showModal();
    }, [view]);
    const picker = (kinds: readonly string[], extra: any = {}) => <CharacterResourcePicker character={c} updateCharacter={update} kinds={kinds} onManageSources={() => setSources(true)} {...extra}/>;
    const selected = (kind: string) => (c.resourceCards || []).filter(item => item.kind === kind);
    const classes = selected('classes');
    const legacy = <LegacyCharacterRecords character={c}/>;
    const dismissReader = () => { if (referenceDepth > 0) referenceBack.current?.(); else { reader.current?.close(); setView(null); } };
    useFullscreenReader(reader, () => { reader.current?.close(); setView(null); }, !!view);
    const readerBackdrop = useDialogBackdrop(dismissReader);
    if (sources)
        return <div className="character-builder-scroll"><main className="character-builder"><CharacterSources character={c} updateCharacter={update} onDone={() => setSources(false)} onCancel={c.allowedResourceSources ? () => setSources(false) : onComplete}/></main></div>;
    return <div className="character-folio"><header className="folio-heading"><button type="button" onClick={onComplete}>← 我的角色</button><div><h1>{c.name || '未命名角色'}</h1><p>{c.level}级 · {selected('species')[0]?.name || c.race || '未选种族'} · {(c.multiclassEnabled ? classes : classes.filter(item => item === initialClass(c))).map(x => x.name).join(' / ') || c.className || '未选职业'}</p></div><div className="quick-mode-actions"><button type="button" onClick={() => onMode(mode === 'overview' ? 'edit' : 'overview')}>{mode === 'overview' ? '编辑角色' : '角色速览'}</button>{mode === 'edit' && <button type="button" onClick={() => setSources(true)}>可用资料</button>}</div></header>


 {mode === 'edit' && <nav className="folio-tabs folio-top-tabs" aria-label="角色内容页签">{tabs.map(([id, label]) => <button type="button" key={id} aria-current={tab === id ? 'page' : undefined} aria-controls={'folio-page-' + id} onClick={() => switchTab(id)}><span>{label}</span></button>)}</nav>}
 <main ref={pageScroll} className="folio-pages">{mode === 'overview' ? <CharacterQuickView character={c} updateCharacter={update} onView={setView} onEdit={() => onMode('edit')} onBackpack={() => { switchTab('gear'); onMode('edit'); }}/> : tabs.map(([id, label]) => <section className="folio-page" key={id} hidden={tab !== id} id={'folio-page-' + id} aria-label={label}>
 {id === 'origin' && <><CharacterOrigin character={c} updateCharacter={update} onSources={() => setSources(true)}/><CharacterBuildSummary character={c} updateCharacter={update} onView={setView}/></>}
 {id === 'classes' && <CharacterClasses character={c} updateCharacter={update} onSources={() => setSources(true)} onView={setView}/>}
 {id === 'gear' && <><CharacterSupplies character={c} updateCharacter={update} section="currency"/><StartingEquipment character={c} updateCharacter={update} onView={setView}/><CharacterInventory character={c} updateCharacter={update} onView={setView} onSources={() => setSources(true)}/><details className="backpack-manual-records"><summary>手填消耗品记录</summary><CharacterSupplies character={c} updateCharacter={update} section="consumables"/></details>{legacy}</>}
 {id === 'spells' && <CharacterSpells character={c} updateCharacter={update} onSources={() => setSources(true)}/>}
 {id === 'features' && ([['feats', '专长'], ['optionalFeatures', '可选特性'], ['charOptions', '角色选项'], ['rewards', '恩赐与奖励'], ['psionics', '灵能']] as const).map(([kind, label]) => <section className="folio-section feature-type-section" key={kind}><h2>{label}</h2>{picker([kind], { heading: label })}</section>)}

 </section>)}</main>

 <dialog {...readerBackdrop} ref={reader} className="folio-reader" onCancel={event => {
            if (referenceDepth > 0) {
                event.preventDefault();
                referenceBack.current?.();
            }
            else
                setView(null);
        }}><header><ReaderOutline identity={view?.id || ""}/><DialogDismissButton back={referenceDepth > 0} label={referenceDepth > 0 ? '返回原文' : '关闭全文'} onClick={dismissReader}/>{referenceDepth === 0 && view && gearKinds.includes(view.kind) && <ItemAttunementToggle character={c} item={view} updateCharacter={update}/>}</header>{referenceDepth === 0 && view && <SnapshotUpdate item={view} onUpdate={next => { if (update(refreshCharacterSnapshot(c, next))) setView(next); }}/>}{view && <div className="reader-scroll folio-reader-content"><NativeResourceCard item={view}/></div>}<footer className="reader-navigation" onClick={event => { if (event.target === event.currentTarget) dismissReader(); }}>{referenceDepth > 0 && <button type="button" onClick={() => referenceBack.current?.()}>返回原文</button>}</footer></dialog>
 </div>;
}
