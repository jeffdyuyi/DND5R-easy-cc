import { type ReactNode, useEffect, useRef, useState } from 'react';
import { checkCoreRevision } from '../src/content/fiveetools/source';
import { coreManagementState } from '../src/content/resourceManagement';
import { downloadJson } from '../utils/files';
import { LibraryOverlay } from './LibraryNavigation';
import { LocalResourceBundles } from './LocalResourceBundles';
import { BrewPackageManager } from './BrewPackageManager';
import { ResourceTaskStatus, type ResourceManagerState } from './ResourceTaskStatus';
export function ExternalResourceSources({ resources: r, applicationAction }: {
    resources: ResourceManagerState;
    applicationAction?: ReactNode;
}) {
    const [panel, setPanel] = useState<'core' | 'records' | null>(null), [packagesOpen, setPackagesOpen] = useState(false);
    const [upstream, setUpstream] = useState<{
        revision?: string;
        at?: string;
        error?: string;
        checking?: boolean;
    }>({});
    const checkAbort = useRef<AbortController | null>(null);
    useEffect(() => () => checkAbort.current?.abort(), []);
    const checkUpdate = async () => {
        checkAbort.current?.abort();
        const controller = new AbortController();
        checkAbort.current = controller;
        setUpstream({ checking: true });
        try {
            const revision = await checkCoreRevision(controller.signal);
            if (!controller.signal.aborted)
                setUpstream({ revision, at: new Date().toLocaleString() });
        }
        catch (error) {
            if (!controller.signal.aborted)
                setUpstream({ error: String(error) });
        }
    };
    const core = r.sourceStats.find(row => row.repository === '5etools-cn');
    const brew = r.sourceStats.find(row => row.repository === 'homebrew');
    const sync = r.sourceSyncs['5etools-cn'];
    const state = coreManagementState({ ready: r.ready, catalogAvailable: r.catalogAvailable, files: core?.files || 0, revisions: core?.revisions || [], sync, upstream });
    const coreBusy = r.busy && r.operation === 'core';
    const actionLabels = { download: '下载主库', check: '检查更新', update: '下载更新', retry: '重新下载', rebuild: '整理本机目录', none: '已是最新' };
    const act = () => state.action === 'check' ? void checkUpdate() : state.action === 'rebuild' ? void r.rebuildCatalog() : void r.run('core');
    const exportRecords = async () => { try { await downloadJson({ errors: r.errors, diagnostics: r.diagnostics, packages: r.packageReads, sources: r.sourceSyncs }, 'easy-cc-resource-records.json'); } catch(error) { window.alert('导出未完成：'+String(error)); } };
    const visibility = (repository: string) => <label className="resource-visibility"><input type="checkbox" checked={r.enabled.includes(repository)} onChange={() => r.toggle(repository)}/>在资料库显示</label>;
    return <section className="resource-management" aria-label="资料管理">
        <article className={'resource-manager-card tone-' + state.tone}>
            <header><h2>中文主库</h2><button type="button" onClick={() => setPanel('core')}>详情</button></header>
            <p className="resource-manager-status" role="status">{coreBusy ? r.activity.stage === 'reading' ? '正在下载' : r.activity.stage === 'saving' ? '正在保存' : '正在整理目录' : state.label}</p>
            <div className="resource-manager-line"><small>{core?.cards || 0} 项资源{!r.enabled.includes('5etools-cn') ? ' · 已隐藏' : ''}</small>{coreBusy ? <button type="button" disabled={r.activity.stage !== 'reading'} onClick={r.cancel}>{r.activity.stage === 'reading' ? '取消下载' : '处理中'}</button> : <button type="button" disabled={r.busy || !r.ready || state.action === 'none' || upstream.checking} onClick={act}>{state.action === 'none' ? !r.ready ? '载入中' : upstream.checking ? '检查中' : '已是最新' : actionLabels[state.action]}</button>}</div>
            {coreBusy && <ResourceTaskStatus resources={r} compact/>}
        </article>
        <article className="resource-manager-card"><header><h2>扩展资料包</h2><button type="button" onClick={() => setPackagesOpen(true)}>管理</button></header><div className="resource-manager-line"><small>{brew?.files || 0} 包已保存 · {brew?.cards || 0} 项资源{!r.enabled.includes('homebrew') ? ' · 已隐藏' : ''}</small>{visibility('homebrew')}</div></article>
        <LocalResourceBundles resources={r}/>
        <div className="resource-management-utilities"><button type="button" onClick={() => setPanel('records')}>问题记录{r.errors.length + r.diagnostics.length > 0 ? ' · ' + (r.errors.length + r.diagnostics.length) : ''}</button>{applicationAction}</div>
        {!packagesOpen && r.operation && !['core', 'import'].includes(r.operation) && <ResourceTaskStatus resources={r}/>}
        {panel && <LibraryOverlay title={panel === 'core' ? '中文主库详情' : '问题记录'} onClose={() => setPanel(null)} className="resource-detail-dialog"><div className="resource-management-scroll">
            {panel === 'core' ? <><p>{coreBusy ? r.activity.detail : state.label}</p>{visibility('5etools-cn')}<dl className="resource-manager-facts"><div><dt>原文文件</dt><dd>{core?.files || 0}</dd></div><div><dt>出版来源</dt><dd>{core?.sources || 0}</dd></div><div><dt>目录资源</dt><dd>{core?.cards || 0}</dd></div><div><dt>保存时间</dt><dd>{core?.lastFetched ? new Date(core.lastFetched).toLocaleString() : '尚未保存'}</dd></div></dl><p>下载资料与角色可用来源分别设置。</p><details><summary>修订与下载记录</summary><p>本机修订：{core?.revisions.join('、') || '无'}</p>{upstream.at && <p>检查时间：{upstream.at}<br />上游修订：{upstream.revision}</p>}{upstream.error && <p role="alert">{upstream.error}</p>}{sync && <><p>最近下载：{new Date(sync.at).toLocaleString()} · {sync.scope}</p>{sync.error && <p>{sync.error}</p>}</>}<p>修订一致不代表文件完整；下载未完成可重新下载，原有资料保留。</p></details><details><summary>本机来源目录</summary><ul>{[...new Map(r.allEntries.filter(row => row.sourceProvider === '5etools-cn').map(row => [row.source, row.sourceName || row.source])).entries()].sort(([a], [b]) => a.localeCompare(b)).map(([code, name]) => <li key={code}>{name} · {code}</li>)}</ul></details></>
                : <><p>下载错误 {r.errors.length} · 解析记录 {r.diagnostics.length}</p><p>解析记录不等于失败文件，原文保留。</p>{r.errors.map((row, index) => <p key={'e' + index}>{row}</p>)}{r.diagnostics.slice(0, 100).map((row, index) => <p key={index}><strong>{row.code}</strong> · {row.identity}：{row.message}</p>)}{r.diagnostics.length > 100 && <p>显示前100条，完整记录可导出。</p>}</>}
        </div>{r.busy && (r.operation === 'rebuild' || coreBusy) && <ResourceTaskStatus resources={r}/>}<footer className="resource-package-footer">{panel === 'records' ? <><button type="button" disabled={r.busy || !r.ready} onClick={() => void r.rebuildCatalog()}>整理本机目录</button><button type="button" onClick={exportRecords}>导出完整记录</button></> : <><button type="button" disabled={r.busy || upstream.checking || !r.ready} onClick={() => void checkUpdate()}>检查更新</button><button type="button" disabled={r.busy || !r.ready} onClick={() => void r.run('core')}>重新下载主库</button></>}</footer></LibraryOverlay>}
        <BrewPackageManager resources={r} open={packagesOpen} onClose={() => setPackagesOpen(false)}/>
    </section>;
}
