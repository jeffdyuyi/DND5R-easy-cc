import { DialogDismissButton, useDialogBackdrop } from './common/DialogControls';
import { AssetIcon } from './common/AssetIcon';
import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';
export function LibraryOverlay({ title, drawer = false, side = 'left', onClose, children }: {
    title: string;
    drawer?: boolean;
    side?: 'left' | 'right';
    onClose: () => void;
    children: ReactNode;
}) {
    const ref = useRef<HTMLDialogElement>(null);
    const backdrop = useDialogBackdrop(onClose);
    useEffect(() => { const dialog = ref.current; const roots = Array.from(document.querySelectorAll<HTMLElement>('.resource-catalog,.favorites-workspace,.rules-catalog')); const previous = roots.map(root => root.style.overflow); roots.forEach(root => root.style.overflow = 'hidden'); if (!dialog?.open) dialog?.showModal(); return () => { dialog?.close(); roots.forEach((root, i) => root.style.overflow = previous[i]); }; }, []);
    return createPortal(<dialog ref={ref} className={'library-overlay' + (drawer ? ' is-drawer' : '') + (side === 'right' ? ' is-outline' : '')} aria-label={title} onCancel={event => { event.preventDefault(); onClose(); }} {...backdrop}><header><h2>{title}</h2><DialogDismissButton onClick={onClose}/></header>{children}</dialog>, document.body);
}
interface Choice {
    id: string;
    label: string;
    count: number;
    group?: string;
}
export function LibraryNavigation({ categories, current, onCategory, sources, selectedSources = [], onSources, filters }: {
    categories: Choice[];
    current: string;
    onCategory: (id: string) => void;
    sources?: Choice[];
    selectedSources?: string[];
    onSources?: (ids: string[]) => void;
    filters?: ReactNode;
}) {
    const [panel, setPanel] = useState<'categories' | 'sources' | 'filters' | null>(null), [query, setQuery] = useState(''), [draft, setDraft] = useState<string[]>([]);
    const open = (panel: 'categories' | 'sources' | 'filters') => { setQuery(''); setDraft([...selectedSources]); setPanel(panel); };
    const matches = (choices: Choice[]) => choices.filter(choice => choice.label.toLowerCase().includes(query.toLowerCase()));
    const visible = matches(sources || []);
    return <><nav className="library-compact-nav" aria-label="资源筛选"><button type="button" aria-haspopup="dialog" aria-expanded={panel === 'categories'} onClick={() => open('categories')}><AssetIcon name="pixel/menu" size={18}/> {categories.find(item => item.id === current)?.label || '分类'}<span aria-hidden="true">⌄</span></button>{sources && <button type="button" aria-haspopup="dialog" aria-expanded={panel === 'sources'} onClick={() => open('sources')}><AssetIcon name="pixel/book" size={18}/>来源 {selectedSources.length}<span aria-hidden="true">⌄</span></button>}{filters && <button type="button" aria-haspopup="dialog" aria-expanded={panel === 'filters'} onClick={() => open('filters')}><AssetIcon name="pixel/filter" size={18}/>细筛<span aria-hidden="true">⌄</span></button>}</nav>{panel && <LibraryOverlay title={panel === 'categories' ? '内容分类' : panel === 'sources' ? '选择来源' : '细分筛选'} drawer={panel === 'categories'} onClose={() => setPanel(null)}>{panel !== 'filters' && <div className="library-overlay-search"><input aria-label="搜索筛选项" placeholder={panel === 'categories' ? '查找分类' : '搜索中文书名或来源代码'} value={query} onChange={e => setQuery(e.target.value)}/></div>}{panel === 'categories' ? <div className="library-overlay-scroll library-category-list">{matches(categories).map(item => <button type="button" key={item.id} aria-current={item.id === current ? 'page' : undefined} onClick={() => { onCategory(item.id); setPanel(null); }}><span>{item.label}</span><small>{item.count}</small></button>)}</div> : panel === 'sources' ? <><div className="library-source-actions"><button type="button" onClick={() => setDraft(old => [...new Set([...old, ...visible.map(item => item.id)])])}>全选当前结果</button><button type="button" onClick={() => setDraft([])}>清空选择</button></div><div className="library-overlay-scroll">{[...new Set(visible.map(item => item.group || '其他资料'))].map(group => <section key={group}><h3>{group}</h3>{visible.filter(item => (item.group || '其他资料') === group).map(item => <label className="library-source-row" key={item.id}><input type="checkbox" checked={draft.includes(item.id)} onChange={() => setDraft(old => old.includes(item.id) ? old.filter(id => id !== item.id) : [...old, item.id])}/><span>{item.label}</span><small>{item.count}</small></label>)}</section>)}{!visible.length && <p>没有匹配来源。</p>}</div><footer><span>已选 {draft.length} 项</span><button type="button" onClick={() => { onSources?.(draft); setPanel(null); }}>应用来源</button></footer></> : <div className="library-overlay-scroll">{filters}</div>}</LibraryOverlay>}</>;
}

