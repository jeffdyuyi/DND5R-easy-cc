import { resourceLabels } from '../src/content/resourceRegistry';
import { groupSpecies } from '../src/content/speciesGroups';
import { resourceKey } from '../src/content/resourceIdentity';
import { FavoriteButton } from './FavoriteButton';
import React, { useEffect, useMemo, useState } from 'react';
import { BaseLibraryItem } from '../types';
import { ResourcePreview } from './ResourcePreview';
import { Plus, Search, Trash2, Edit2 } from './common/UiIcons';
interface Props<T extends BaseLibraryItem> {
    groupByKind?: boolean;
    toolbar?: React.ReactNode;
    toolbarActions?: React.ReactNode;
    title: string;
    items: T[];
    itemTypeLabel: string;
    itemKind?: string;
    onSelect: (item: T, visibleItems?: T[]) => void;
    onCreateAction?: () => void;
    onEdit?: (item: T) => void;
    onDelete?: (id: string) => void;
    allowEdit?: boolean;
    renderItem?: (item: T, selected: boolean, onClick: () => void, actions: React.ReactNode) => React.ReactNode;
}
export function CardLibrary<T extends BaseLibraryItem>({ items, itemTypeLabel, itemKind, onSelect, onCreateAction, onEdit, onDelete, allowEdit = false, renderItem, toolbar, toolbarActions, groupByKind = false }: Props<T>) {
    const [search, setSearch] = useState(''), [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(() => {
        try {
            const size = Number(localStorage.getItem('easy_cc_catalog_page_size'));
            return [24, 48, 96].includes(size) ? size : 48;
        }
        catch {
            return 48;
        }
    });
    const scope = useMemo(() => items.map(item => item.id).join('|'), [items]);
    useEffect(() => setPage(1), [scope]);
    const query = search.trim().toLowerCase();
    const visible = items.filter(item => [item.name, item.englishName, item.source, item.fullDescription || item.description, item.fluffDescription, ...(item.tags || [])].some(value => String(value || '').toLowerCase().includes(query)));
    const displayGroups = itemKind === 'species' ? groupSpecies(visible) : visible.map(primary => ({ primary, variants: [] as T[] }));
    const pages = Math.max(1, Math.ceil(displayGroups.length / pageSize)), current = Math.min(page, pages);
    const remove = (item: T) => {
        if (window.confirm('确定删除“' + item.name + '”？此操作不可恢复。'))
            onDelete?.(item.id);
    };
    const pagination = !groupByKind && pages > 1 ? <nav className="catalog-pagination"><button type="button" disabled={current === 1} onClick={() => setPage(current - 1)}>上一页</button><span>{current} / {pages}</span><button type="button" disabled={current === pages} onClick={() => setPage(current + 1)}>下一页</button></nav> : null;
    const renderCards = (groups: typeof displayGroups) => groups.map(({ primary: item, variants }) => { const actions = allowEdit ? <div>{onEdit && <button type="button" title="编辑" aria-label={'编辑' + item.name} onClick={() => onEdit(item)}><Edit2 size={18}/></button>}{onDelete && <button type="button" title="删除" aria-label={'删除' + item.name} onClick={() => remove(item)}><Trash2 size={18}/></button>}</div> : null; const select = () => onSelect(item, visible); return <React.Fragment key={itemKind ? resourceKey({ ...item, kind: item.kind || itemKind }) : item.id}>{renderItem ? renderItem(item, false, select, actions) : <div className="bookmark-card"><ResourcePreview showCategory={itemKind === 'favorites' && !groupByKind} item={{ ...item, kind: item.kind || itemKind }} onSelect={select}/>{itemKind && <FavoriteButton compact item={{ ...item, kind: item.kind || itemKind! }}/>}{variants.length > 0 && <details className="species-variant-options"><summary>同源选项 · {variants.length} 项</summary>{variants.map(variant => <button type="button" key={resourceKey(variant)} onClick={() => onSelect(variant, visible)}>{variant.name}<small>{variant.source}</small></button>)}</details>}</div>}</React.Fragment>; });
    const pageGroups = groupByKind ? displayGroups : displayGroups.slice((current - 1) * pageSize, current * pageSize);
    return <div className="catalog-browser complete-cards space-y-6"><div className="catalog-unified-toolbar">{toolbar}<div className="catalog-search-bar"><label><Search size={18}/><input aria-label={'搜索' + itemTypeLabel} placeholder="搜索名称、来源或正文" value={search} onChange={event => { setSearch(event.target.value); setPage(1); }}/></label></div>{toolbarActions}</div><div className="catalog-results-bar"><span>找到 <strong>{displayGroups.length}</strong> 组{itemTypeLabel}{itemKind === 'species' && <small> · 含 {visible.length} 条种族/亚种记录</small>}</span><label>每页<select value={pageSize} onChange={event => {
            const value = Number(event.target.value);
            setPageSize(value);
            setPage(1);
            try {
                localStorage.setItem('easy_cc_catalog_page_size', String(value));
            }
            catch { }
        }}>{[24, 48, 96].map(size => <option key={size} value={size}>{size} 张</option>)}</select></label></div>
 {!visible.length && <div className="catalog-empty"><h3>{query ? '没有找到匹配资源' : '暂无显示内容'}</h3><p>{query ? '请调整搜索条件。' : '请调整来源筛选或在信息页读取资料。'}</p>{query && <button type="button" onClick={() => setSearch('')}>清除搜索</button>}</div>}
 {pagination}<div className={'resource-grid grid ' + (groupByKind ? 'grouped-favorite-grid' : itemKind ? 'resource-cover-grid' : '')}>
 {onCreateAction && <button type="button" className="catalog-create" onClick={onCreateAction}><Plus size={28}/>新建{itemTypeLabel}</button>}
 {groupByKind ? [...new Set(pageGroups.map(group => group.primary.kind))].map(kind => <details className="favorite-type-group" key={kind} open><summary>{resourceLabels[kind || ''] || kind || '其他'}<small>{visible.filter(item => item.kind === kind).length}</small></summary><div className="resource-grid resource-cover-grid">{renderCards(pageGroups.filter(group => group.primary.kind === kind))}</div></details>) : renderCards(pageGroups)}
 </div>{pagination}</div>;
}
