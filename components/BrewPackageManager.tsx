import { useEffect, useMemo, useRef, useState } from 'react';
import { LibraryOverlay } from './LibraryNavigation';
import { ResourceTaskStatus, type ResourceManagerState } from './ResourceTaskStatus';
import { packageManagementState, packageStateNames, packageTitle } from '../src/content/resourceManagement';
const folderNames: Record<string, string> = { class: '职业', subclass: '子职业', race: '种族', background: '背景', spell: '法术', feat: '专长', optionalfeature: '可选特性', charoption: '角色选项', reward: '恩赐与奖励', psionic: '灵能', item: '物品', collection: '合集', 其他: '其他' };
const states = [['all', '全部'], ['unread', '未下载'], ['cached', '已下载'], ['active', '处理中'], ['failed', '未完成'], ['cancelled', '已取消'], ['issues', '有解析记录']] as const;
const folderOf = (path: string) => path.includes('/') ? path.split('/')[0] : '其他';
export function BrewPackageManager({ resources: r, open, onClose }: {
    resources: ResourceManagerState;
    open: boolean;
    onClose: () => void;
}) {
    const [query, setQuery] = useState(''), [folder, setFolder] = useState('all'), [filter, setFilter] = useState('all');
    const [selected, setSelected] = useState<string[]>([]), [page, setPage] = useState(0), [filtersOpen, setFiltersOpen] = useState(false), [detail, setDetail] = useState<string | null>(null);
    const pane = useRef<HTMLDivElement>(null), savedScroll = useRef(0);
    const cached = useMemo(() => new Map(r.documents.filter(doc => doc.repository === 'homebrew' && !doc.path.startsWith('_generated/')).map(doc => [doc.path, doc])), [r.documents]);
    const paths = useMemo(() => [...new Set([...r.packages, ...cached.keys()])].sort(), [r.packages, cached]);
    const directoryReady = r.catalogAvailable && r.sourceSyncs.homebrew?.catalogReady !== false && !(r.operation === 'brew' && r.busy);
    const stateOf = (path: string) => packageManagementState(r.packageReads[path], cached.has(path), directoryReady);
    const shown = paths.filter(path => {
        const state = stateOf(path);
        const matchesState = filter === 'all' || (filter === 'issues' ? !!r.packageStats[path]?.diagnostics.length : filter === 'active' ? ['queued', 'reading', 'saved'].includes(state) : state === filter);
        return (folder === 'all' || folderOf(path) === folder) && path.toLowerCase().includes(query.trim().toLowerCase()) && matchesState;
    });
    const pages = Math.max(1, Math.ceil(shown.length / 24)), current = Math.min(page, pages - 1);
    useEffect(() => { if (pane.current)
        pane.current.scrollTop = detail ? 0 : savedScroll.current; }, [detail]);
    useEffect(() => { pane.current?.scrollTo(0, 0); }, [page, query, folder, filter]);
    const openDetail = (path: string) => { savedScroll.current = pane.current?.scrollTop || 0; setDetail(path); };
    if (!open)
        return null;
    const info = detail ? packageTitle(detail) : null, record = detail ? r.packageReads[detail] : undefined, document = detail ? cached.get(detail) : undefined, stats = detail ? r.packageStats[detail] : undefined;
    return <LibraryOverlay title={info?.title || '扩展资料包'} back={!!detail} onClose={detail ? () => setDetail(null) : onClose} className="resource-package-dialog">
        {!detail && <div className="resource-package-tools"><div className="resource-package-search"><button type="button" onClick={() => setFiltersOpen(true)}>筛选{folder !== 'all' || filter !== 'all' ? ' · 已选' : ''}</button><input type="search" aria-label="搜索扩展包" placeholder="名称或作者" value={query} onChange={event => { setQuery(event.target.value); setPage(0); }}/></div><div className="resource-package-batch"><small>{shown.length} 包 · {folder === 'all' ? '全部分类' : folderNames[folder] || folder} · {states.find(row => row[0] === filter)?.[1]}</small><button type="button" disabled={!shown.length} onClick={() => setSelected(old => [...new Set([...old, ...shown])])}>全选当前结果</button>{selected.length > 0 && <button type="button" onClick={() => setSelected([])}>清空</button>}</div></div>}
        <div ref={pane} className="resource-management-scroll">
            {detail ? <div className="resource-package-detail"><p>{info?.author || '作者未在文件名注明'} · {packageStateNames[stateOf(detail)]}</p>{(stateOf(detail) === 'failed' || stateOf(detail) === 'cancelled') && document && <p>原有下载文件保留。</p>}{record?.error && <p role="alert">{record.error}</p>}<p>{stats ? stats.cards + ' 项资源 · ' + stats.diagnostics.length + ' 条解析记录' : '目录统计尚未生成。'}</p><details><summary>文件与解析记录</summary><p>{detail}</p>{document && <p>保存时间 {new Date(document.fetchedAt).toLocaleString()}<br />修订 {document.revision}</p>}{stats?.diagnostics.slice(0, 50).map((row, index) => <p key={index}>{row.code}：{row.message}</p>)}{(stats?.diagnostics.length || 0) > 50 && <p>此处显示前50条，完整记录可在资料管理页导出。</p>}</details></div>
            : <><div className="resource-package-grid">{shown.slice(current * 24, (current + 1) * 24).map(path => { const item = packageTitle(path), state = stateOf(path); return <article className={'resource-pack-card state-' + state} key={path}><label><input type="checkbox" aria-label={'选择' + item.title} checked={selected.includes(path)} onChange={() => setSelected(old => old.includes(path) ? old.filter(value => value !== path) : [...old, path])}/><strong title={item.title}>{item.title}</strong>{item.author && <small>{item.author}</small>}</label><footer><span>{packageStateNames[state]}</span><button type="button" aria-label={'查看' + item.title + '详情'} onClick={() => openDetail(path)}>详情</button></footer></article>; })}</div>{!shown.length && <p>{paths.length ? '没有匹配资料包。' : '尚无目录，点击下方“刷新目录”。'}</p>}</>}
        </div>
        {r.operation !== 'import' && (r.busy || ['failed', 'cancelled'].includes(r.activity.stage)) && <ResourceTaskStatus resources={r}/>}
        <footer className="resource-package-footer">{detail ? <button type="button" disabled={r.busy || !r.ready} onClick={() => void r.run('brew', [detail])}>{cached.has(detail) ? '更新此包' : '下载此包'}</button> : <>
            {pages > 1 && <nav aria-label="资料包分页"><button type="button" disabled={current === 0} onClick={() => setPage(current - 1)}>上一页</button><span>{current + 1} / {pages}</span><button type="button" disabled={current + 1 === pages} onClick={() => setPage(current + 1)}>下一页</button></nav>}
            <div className="resource-package-actions"><button type="button" disabled={r.busy || !r.ready} onClick={() => void r.run('discover')}>刷新目录</button>{cached.size > 0 && <button type="button" disabled={r.busy || !r.ready} onClick={() => void r.run('brew', [...cached.keys()])}>更新已下载</button>}{selected.length > 0 && <button type="button" disabled={r.busy || !r.ready} onClick={() => void r.run('brew', selected)}>下载所选 {selected.length}</button>}</div>
        </>}</footer>
        {filtersOpen && <LibraryOverlay title="筛选资料包" drawer onClose={() => setFiltersOpen(false)} className="resource-filter-drawer"><div className="resource-management-scroll"><h3>分类</h3>{['all', ...new Set(paths.map(folderOf))].map(value => <button className="resource-filter-row" type="button" aria-pressed={folder === value} key={value} onClick={() => { setFolder(value); setPage(0); setFiltersOpen(false); }}>{value === 'all' ? '全部分类' : folderNames[value] || value}<small>{value === 'all' ? paths.length : paths.filter(path => folderOf(path) === value).length}</small></button>)}<h3>下载状态</h3>{states.map(([value, label]) => <button className="resource-filter-row" type="button" aria-pressed={filter === value} key={value} onClick={() => { setFilter(value); setPage(0); setFiltersOpen(false); }}>{label}</button>)}</div></LibraryOverlay>}
    </LibraryOverlay>;
}
