import { checkCoreRevision } from '../src/content/fiveetools/source';
import { useEffect, useRef, useMemo, useState } from 'react';
import { useExternalResources } from '../hooks/useExternalResources';
const syncNames: Record<string, string> = { syncing: '同步中', success: '同步完成', partial: '部分未完成', failed: '同步失败', cancelled: '已取消' };
const stateNames: Record<string, string> = { queued: '排队中', reading: '读取中', downloaded: '保存中', cached: '已缓存', failed: '读取失败', cancelled: '已取消' };
export function ExternalResourceSources({ resources: r }: {
    resources: ReturnType<typeof useExternalResources>;
}) {
    const [upstream, setUpstream] = useState<{ revision?: string; at?: string; error?: string; checking?: boolean }>({});
    const checkAbort = useRef<AbortController | null>(null);
    useEffect(() => () => checkAbort.current?.abort(), []);
    const checkUpdate = async () => {
        checkAbort.current?.abort();
        const controller = new AbortController(); checkAbort.current = controller;
        setUpstream({ checking: true });
        try { const revision = await checkCoreRevision(controller.signal); if (!controller.signal.aborted) setUpstream({ revision, at: new Date().toLocaleString() }); }
        catch (error) { if (!controller.signal.aborted) setUpstream({ error: String(error) }); }
    };
    const core = r.sourceStats.find(item => item.repository === '5etools-cn');
    const revisionMatches = !!upstream.revision && core?.revisions.length === 1 && core.revisions[0] === upstream.revision;
    const coreMessage = upstream.checking ? '正在检查上游修订…' : upstream.error ? '检查失败：' + upstream.error : !core?.files ? '尚未下载中文主库' : !upstream.revision ? '已有本地缓存，尚未检查上游更新' : revisionMatches ? '本地文件修订与上游一致' : '上游修订与本地不同，可下载更新';
    const [page, setPage] = useState(0);
    const [query, setQuery] = useState(''), [selected, setSelected] = useState<string[]>([]), [filter, setFilter] = useState('all'), [expanded, setExpanded] = useState<string | null>(null);
    const cached = useMemo(() => new Map(r.documents.filter(doc => doc.repository === 'homebrew').map(doc => [doc.path, doc])), [r.documents]);
    const stateOf = (path: string) => (r.packageReads[path]?.state === 'downloaded' && cached.has(path) ? 'cached' : r.packageReads[path]?.state) || (cached.has(path) ? 'cached' : 'unread');
    const shown = r.packages.filter(path => path.toLowerCase().includes(query.trim().toLowerCase()) && (filter === 'all' || (filter === 'issues' ? (r.packageStats[path]?.diagnostics.length || 0) > 0 : filter === 'active' ? ['queued', 'reading', 'downloaded'].includes(stateOf(path)) : stateOf(path) === filter)));
    const pageCount = Math.max(1, Math.ceil(shown.length / 24));
    const currentPage = Math.min(page, pageCount - 1);
    const visiblePackages = shown.slice(currentPage * 24, (currentPage + 1) * 24);
    const downloadRecords = () => { const url = URL.createObjectURL(new Blob([JSON.stringify({ errors: r.errors, diagnostics: r.diagnostics, packages: r.packageReads, sources: r.sourceSyncs }, null, 2)], { type: 'application/json' })); const a = document.createElement('a'); a.href = url; a.download = 'easy-cc-external-diagnostics.json'; a.click(); URL.revokeObjectURL(url); };
    return <section className="external-resource-sources" aria-label="外部数据源配置">
  <header className="external-source-panel-header"><h2>5etools / Homebrew</h2><span>已生成 {r.total} 张资源卡</span></header>
  <p>下载后仍需为角色选择允许使用的出版物。</p>
  <section className="source-update-controls" aria-label="资料更新">
    <div className="core-update-line"><strong>中文主库</strong><span role="status">{coreMessage}</span></div>
    {upstream.at && <small>检查时间 {upstream.at} · 上游 {upstream.revision?.slice(0, 8)}</small>}
    {revisionMatches && r.sourceSyncs['5etools-cn']?.state !== 'success' && <small>修订一致不代表全部文件完整；上次同步未完成时可重新下载补齐。</small>}
    <div className="external-source-actions">
      <button disabled={r.busy || upstream.checking} onClick={() => void checkUpdate()}>检查更新</button>
      <button disabled={r.busy || !r.ready} onClick={() => r.run('core')}>{core?.files ? '下载更新 / 补齐' : '下载中文主库'}</button>
      {r.busy && <button onClick={r.cancel}>取消读取</button>}
    </div>
    <details className="homebrew-update-tools"><summary>Homebrew资料包管理</summary><p>刷新目录仅获取可选包清单；更新已存包会重新读取其原文。</p><div className="external-source-actions">
      <button disabled={r.busy} onClick={() => r.run('discover')}>刷新可选包清单</button>
      <button disabled={r.busy || !Array.from(cached.keys()).some(path => !path.startsWith('_generated/'))} onClick={() => r.run('brew', Array.from(cached.keys()).filter(path => !path.startsWith('_generated/')))}>更新已存包</button>
    </div></details>
  </section>
  <p className="external-progress" role="status">{r.status}</p>
  <section className="source-cache-overview" aria-label="外部资料缓存概览"><header><h3>缓存概况</h3><span>重复同步会更新原记录，不重复添加。</span></header><div className="source-cache-grid">{r.sourceStats.map(stats => {
            const sync = r.sourceSyncs[stats.repository], name = stats.repository === '5etools-cn' ? '5etools中文主库' : 'Homebrew', enabled = r.enabled.includes(stats.repository);
            return <article className="source-cache-card" key={stats.repository}><div className="source-cache-heading"><h4>{name}</h4><button aria-pressed={enabled} onClick={() => r.toggle(stats.repository)}>{enabled ? '已启用' : '已停用'}</button></div><dl><div><dt>资料文件</dt><dd>{stats.files}</dd></div><div><dt>出版来源</dt><dd>{stats.sources}</dd></div><div><dt>资源卡</dt><dd>{stats.cards}</dd></div><div><dt>解析记录</dt><dd>{stats.diagnostics}</dd></div></dl><p>缓存修订：{stats.revisions.length === 1 ? <span title={stats.revisions[0]}>{stats.revisions[0].slice(0, 8)}</span> : stats.revisions.length ? stats.revisions.length + ' 个修订' : '未缓存'}</p><p>资料读取时间：{stats.lastFetched ? new Date(stats.lastFetched).toLocaleString() : '暂无'}</p><div className={'source-sync-result sync-' + (sync?.state || 'none')}><strong>{sync ? syncNames[sync.state] : stats.files ? '已有缓存' : '尚未同步'}</strong>{sync && <><span>{sync.scope} · {new Date(sync.at).toLocaleString()}</span>{sync.revision && <span title={sync.revision}>本次检查修订 {sync.revision.slice(0, 8)}</span>}{sync.added !== undefined && <span>新增 {sync.added} · 更新 {sync.updated || 0} · 未变化 {sync.unchanged || 0}{sync.retired ? ' · 退役 ' + sync.retired : ''}</span>}{sync.error && <span>{sync.error}；原有缓存保留。</span>}</>}</div></article>;
        })}</div></section>
  {r.packages.length > 0 && <section className="brew-picker" aria-label="Homebrew资料包管理">
   <header className="brew-picker-header"><h3>Homebrew资料包</h3><span>{r.packages.length} 包 · 已选 {selected.length}</span></header>
   <div className="brew-search"><input aria-label="查找资料包" value={query} onChange={e => { setQuery(e.target.value); setPage(0); }} placeholder="作者或资料名称"/><select aria-label="筛选读取状态" value={filter} onChange={e => { setFilter(e.target.value); setPage(0); }}><option value="all">全部状态</option><option value="unread">未读取</option><option value="active">正在读取</option><option value="cached">已缓存</option><option value="failed">读取失败</option><option value="cancelled">已取消</option><option value="issues">有解析记录</option></select></div>
   <div className="brew-batch"><button onClick={() => setSelected([...r.packages])}>全选 {r.packages.length}</button><button disabled={!shown.length} onClick={() => setSelected(old => [...new Set([...old, ...shown])])}>全选当前结果 {shown.length}</button><button disabled={!selected.length} onClick={() => setSelected([])}>清空选择</button></div>
   <div className="brew-package-list">
    {visiblePackages.map(path => {
                const display = path.replace(/^[^/]+\//, '').replace(/\.json$/, ''), split = display.indexOf(';'), author = split >= 0 ? display.slice(0, split).trim() : '', title = split >= 0 ? display.slice(split + 1).trim() : display;
                const state = stateOf(path), record = r.packageReads[path], document = cached.get(path), stats = r.packageStats[path], isOpen = expanded === path;
                return <article className={'brew-package-row state-' + state + (isOpen ? ' is-expanded' : '')} key={path}>
      <div className="brew-package-main"><label className="brew-package-choice"><input type="checkbox" checked={selected.includes(path)} onChange={() => setSelected(old => old.includes(path) ? old.filter(p => p !== path) : [...old, path])}/><span><strong>{title}</strong>{author && <small>{author}</small>}</span></label><div className="brew-package-state"><span className={'brew-state state-' + state}>{stateNames[state] || '未读取'}</span>{stats && <small>{stats.cards} 张卡{stats.diagnostics.length ? ' · ' + stats.diagnostics.length + ' 条记录' : ''}</small>}</div><button className="brew-details-button" aria-expanded={isOpen} onClick={() => setExpanded(isOpen ? null : path)}>详情</button></div>
      {isOpen && <div className="brew-package-detail"><p className="brew-path">{path}</p>{document && <p>缓存时间：{new Date(document.fetchedAt).toLocaleString()} · 修订 {document.revision.slice(0, 8)}</p>}{record && <p>最近读取：{new Date(record.at).toLocaleString()} · {stateNames[state]}</p>}{record?.error && <p className="brew-package-error">{record.error}{document ? '；原有缓存仍保留。' : ''}</p>}{stats ? <p>已生成 {stats.cards} 张卡，关联解析记录 {stats.diagnostics.length} 条。{stats.cards === 0 ? '仅供引用的特性不单独计为卡片。' : ''}</p> : <p>{state === 'cached' ? '文件已缓存，卡片数量在资料整理完成后显示。' : '尚无此资料包的卡片统计。'}</p>}{stats?.diagnostics.slice(0, 20).map((d, i) => <p key={i}><strong>{d.code}</strong>：{d.message}</p>)}{(stats?.diagnostics.length || 0) > 20 && <p>这里只列前20条，完整记录可从下方下载。</p>}<button disabled={r.busy} onClick={() => r.run('brew', [path])}>{state === 'failed' ? '重试此包' : '同步此包'}</button></div>}
     </article>;
            })}
    {!shown.length && <p className="brew-empty">没有符合条件的资料包。</p>}
   </div>
   {pageCount > 1 && <nav className="information-pagination" aria-label="资料包分页"><button type="button" disabled={currentPage === 0} onClick={() => setPage(currentPage - 1)}>上一页</button><span>{currentPage + 1} / {pageCount}</span><button type="button" disabled={currentPage + 1 === pageCount} onClick={() => setPage(currentPage + 1)}>下一页</button></nav>}
   <footer className="brew-picker-footer"><span>显示 {shown.length} 包；依赖资料随所选包读取。</span><button disabled={r.busy || !selected.length} onClick={() => r.run('brew', selected)}>同步所选 {selected.length} 包</button></footer>
  </section>}
  {(r.errors.length > 0 || r.diagnostics.length > 0) && <details className="external-diagnostics"><summary>读取失败 {r.errors.length} · 解析待处理 {r.diagnostics.length}</summary><p>读取失败是文件下载或保存问题；解析记录按结构计数，不等于失败文件数量。原始资料保留。</p>{r.errors.map((error, i) => <p key={'error' + i}>{error}</p>)}{r.diagnostics.slice(0, 200).map((d, i) => <p key={i}><strong>{d.code}</strong> · {d.identity}：{d.message}</p>)}{r.diagnostics.length > 200 && <p>页面显示前200条。</p>}<button onClick={downloadRecords}>下载完整记录</button></details>}
 </section>;
}
