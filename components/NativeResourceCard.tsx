import { resourceKey } from '../src/content/resourceIdentity';
import { FavoriteButton } from './FavoriteButton';
import { sourceLabel } from '../src/content/sourceNames';
import React, { useState, useRef, useLayoutEffect } from 'react';
import { ResourceReferenceContext } from './ResourceReference';
import { useResourceCatalog } from '../hooks/useResourceCatalog';
import { ResourceCardTopline } from './common/ResourceCardTopline';
import { ResourceSubtypeBadge } from './common/ResourceSubtypeBadge';
import { RichText } from './RichText';
import { resourceColors } from '../src/content/resourceRegistry';
import { ResourceFacts } from './common/ResourceFacts';
import { resourceLayout } from './common/resourceLayout';
interface ResourceCardProps {
    item: any;
    children?: React.ReactNode;
}
// The reader presents complete content; directory rows present identity metadata.
export function NativeResourceCard({ item, children }: ResourceCardProps) {
    const catalog = useResourceCatalog();
    const [history, setHistory] = useState<{
        item: any;
        top: number;
    }[]>([]);
    const [notice, setNotice] = useState('');
    const root = useRef<HTMLDivElement>(null);
    const restore = useRef<number | null>(null);
    const current = history.length ? history[history.length - 1].item : item;
    const scrollRoot = () => {
        let node = root.current?.parentElement;
        while (node) {
            if (node.scrollHeight > node.clientHeight && /auto|scroll/.test(getComputedStyle(node).overflowY))
                return node;
            node = node.parentElement;
        }
        return null;
    };
    useLayoutEffect(() => {
        root.current?.dispatchEvent(new CustomEvent('easy-cc-reference', { bubbles: true, detail: { depth: history.length, back: () => {
                    if (!history.length)
                        return;
                    restore.current = history[history.length - 1].top;
                    setHistory(previous => previous.slice(0, -1));
                } } }));
    }, [history]);
    useLayoutEffect(() => {
        if (restore.current !== null) {
            scrollRoot()?.scrollTo({ top: restore.current });
            restore.current = null;
        }
    }, [history]);
    // A changed parent selection starts a new reading session without altering saved snapshots.
    const session = useRef(resourceKey(item));
    if (session.current !== resourceKey(item)) {
        session.current = resourceKey(item);
        if (history.length)
            setHistory([]);
        if (notice)
            setNotice('');
    }
    const open = (reference: {
        tag: string;
        name: string;
        source: string;
        parts?: string[];
        uid?: string;
    }) => {
        const kinds: Record<string, string[]> = { recipe: ['recipes'], language: ['languages'], condition: ['conditions'], disease: ['diseases'], status: ['statuses'], variantrule: ['variantRules'], action: ['actions'], spell: ['spells'], item: ['weapons', 'armors', 'tools', 'gears', 'magicItems'], race: ['species'], background: ['backgrounds'], feat: ['feats'], class: ['classes'], subclass: ['subclasses'], optfeature: ['optionalFeatures'] };
        if (['classFeature', 'subclassFeature'].includes(reference.tag) && reference.uid) {
            const matches = catalog.flatMap(parent => (parent.levelFeatures || []).filter((feature: any) => typeof feature.uid === 'string' && feature.uid.toLowerCase() === reference.uid!.toLowerCase()).map((feature: any) => ({ ...parent, id: parent.id + ':' + feature.uid, name: feature.name, englishName: '', fullDescription: feature.description || feature.fullDescription, description: feature.description || feature.fullDescription, relatedSections: [], fields: {}, structuredSupplement: undefined, fluffDescription: '' })));
            const unique = new Map(matches.map(value => [resourceKey(value), value]));
            if (unique.size === 1) { const target = [...unique.values()][0]; restore.current = 0; const top = scrollRoot()?.scrollTop || 0; setNotice(''); setHistory(previous => [...previous, { item: target, top }]); return; }
        }
        const allowed = kinds[reference.tag];
        if (!allowed) { setNotice('暂未接入此类引用：' + reference.name); return; }
        const candidates = allowed ? catalog.filter(value => allowed.includes(value.kind) && (value.source === reference.source || value.inventoryMeta?.otherSources?.includes(reference.source)) && (reference.tag !== 'subclass' || !reference.parts?.[1] || [value.parentClass, value.fields?.parentClass, value.className, value.parentResource?.name].includes(reference.parts[1])) && [value.name, value.englishName].some(name => typeof name === 'string' && name.toLowerCase() === reference.name.toLowerCase())) : [];
        const own = candidates.filter(value => value.sourceProvider === current.sourceProvider);
        if (own.length === 1) candidates.splice(0, candidates.length, own[0]);
        if (candidates.length !== 1) {
            setNotice(candidates.length > 1 ? '此引用有多个对应条目，请在速查中按来源查找：' + reference.name : '当前资料中无法定位此引用：' + reference.name + ' · ' + reference.source);
            return;
        }
        const top = scrollRoot()?.scrollTop || 0;
        setNotice('');
        restore.current = 0;
        setHistory(previous => [...previous, { item: candidates[0], top }]);
    };
    const back = () => { restore.current = history[history.length - 1].top; setNotice(''); setHistory(previous => previous.slice(0, -1)); };
    return <div ref={root} className="resource-reading-session" data-reference-depth={history.length > 0 ? history.length : undefined}><ResourceReferenceContext.Provider value={open}>{history.length > 0 && <button type="button" className="resource-reference-back" onClick={back}>← 返回上篇</button>}{notice && <p role="status" className="resource-reference-notice">{notice}<button type="button" onClick={() => setNotice('')} aria-label="关闭引用提示">×</button></p>}{history.length === 0 && children ? children : <NativeResourceBody item={current}/>}</ResourceReferenceContext.Provider></div>;
}
function NativeResourceBody({ item: input }: ResourceCardProps) {
    const { item, appearance, body, descriptor, headerFacts, bodyFacts, displayEnglish, featPrerequisite, detailSubtype } = resourceLayout(input);
    const english = displayEnglish;
    return <article className={'native-resource-card resource-card-unified kind-' + item.kind + ' is-reader-card' + (appearance.multiple ? ' has-multiple-rarities' : '')} style={{ '--resource-accent': resourceColors[item.kind] || '#9a7439', '--resource-detail-accent': appearance.subtypeColor || resourceColors[item.kind] || '#9a7439' } as React.CSSProperties}>
  <div className="resource-bookmark-action"><FavoriteButton item={item}/></div>
  <header className="resource-card-header">
   <ResourceCardTopline kind={item.kind} corner={item.kind === 'spells' && descriptor ? '' : appearance.cornerLabel}/>
   <div className="resource-card-identity"><div className="resource-card-titles"><h2>{item.name}</h2>{english && <p className="resource-card-english">{english}</p>}</div>{headerFacts.filter(([label]) => !appearance.cornerLabel || label !== '环阶').length > 0 && <dl className="resource-header-facts">{headerFacts.filter(([label]) => !appearance.cornerLabel || label !== '环阶').map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>}</div>
   {(detailSubtype || descriptor || featPrerequisite) && <div className="resource-card-classification">
    {detailSubtype && <ResourceSubtypeBadge label={detailSubtype} featCategory={item.kind === 'feats' ? item.featCategory : undefined}/>}
    {descriptor && <div className="resource-complete-descriptor"><RichText text={descriptor}/></div>}
    {featPrerequisite && <p className="resource-prerequisite">{featPrerequisite}</p>}
   </div>}
   {item.kind === 'species' && item.fluffDescription && <details className="resource-fluff"><summary>上游风味资料</summary><div className="resource-fluff-content"><RichText text={item.fluffDescription}/></div></details>}
  </header>
  <div className="native-resource-body resource-card-content">

   <ResourceFacts item={item} rows={bodyFacts}/>
   {body && <div className="resource-card-prose"><RichText text={body}/></div>}
   {item.kind !== 'species' && item.fluffDescription && <details className="resource-fluff"><summary>上游风味资料</summary><div className="resource-fluff-content"><RichText text={item.fluffDescription}/></div></details>}
   {item.relatedSections?.map((section: any, index: number) => <section className="resource-card-reference" key={index} aria-label={section.title}>{!String(section.body || '').trimStart().split('\n')[0].replace(/[#*_]/g, '').trim().startsWith(section.title) && <h3 className="resource-association-title">{section.title}{section.englishName ? ' · ' + section.englishName : ''}</h3>}<RichText text={section.body}/></section>)}
  </div>
  {item.structuredSupplement && Object.keys(item.structuredSupplement).length > 0 && <details className="resource-data-supplement"><summary>数据补充</summary><p>上游结构化字段，可能与正文重合。条件与限制请结合正文查看。</p><pre>{JSON.stringify(item.structuredSupplement, null, 2)}</pre></details>}
  <footer className="resource-card-provenance"><div className="resource-card-source-line"><span>来源</span><span>{sourceLabel(item)}</span></div><details><summary>来源与解析记录{item.parseDiagnostics?.length ? ` · ${item.parseDiagnostics.length}` : ''}</summary><p>{item.provenance?.provider}{item.sourceName ? ' · ' + item.sourceName : ''}</p>{item.provenance?.url && <p><a href={item.provenance.url} target="_blank" rel="noreferrer">上游原始资料</a></p>}{item.parseDiagnostics?.map((d: any, i: number) => <p key={'diagnostic' + i}>{d.code}：{d.message}</p>)}<p>{item.provenance?.path} · {item.provenance?.anchor}</p><p>修订：{item.provenance?.revision} · {item.provenance?.license}</p>{item.relatedSections?.map((s: any, i: number) => <p key={'ref-' + i}>{s.title}：{s.provenance?.provider} · {s.provenance?.path} · {s.provenance?.anchor}</p>)}{item.supplementProvenance?.map((p: any, i: number) => <p key={'supp-' + i}>补充：{p.englishName} · {p.provider} · {p.anchor}</p>)}</details></footer>
 </article>;
}

