import { useEffect, useMemo, useRef, useState } from 'react';
import { loadCatalogSnapshot, CatalogSnapshot } from '../src/content/fiveetools/catalogClient';
import { loadCore, loadHomebrew, discoverHomebrew, PackageReadRecord } from '../src/content/fiveetools/source';
import { SourceDocument, ParsedCatalog } from '../src/content/fiveetools/model';
const readEnabled = () => {
    try {
        const saved = localStorage.getItem('easy_cc_external_enabled_v1');
        const value = saved === null ? ['5etools-cn'] : JSON.parse(saved);
        return Array.isArray(value) ? value.filter(x => ['5etools-cn', 'homebrew'].includes(x)) : ['5etools-cn'];
    }
    catch {
        return ['5etools-cn'];
    }
};
interface SourceSyncRecord {
    state: 'syncing' | 'success' | 'partial' | 'failed' | 'cancelled';
    at: string;
    scope: string;
    revision?: string;
    added?: number;
    updated?: number;
    unchanged?: number;
    retired?: number;
    catalogReady?: boolean;
    error?: string;
}
export function useExternalResources() {
    const [documents, setDocuments] = useState<Omit<SourceDocument, 'body'>[]>([]), [status, setStatus] = useState(''), [busy, setBusy] = useState(false), [errors, setErrors] = useState<string[]>([]), [packages, setPackages] = useState<string[]>([]), [ready, setReady] = useState(false);
    const [activity, setActivity] = useState<{ stage: 'idle' | 'reading' | 'saving' | 'parsing' | 'complete' | 'failed' | 'cancelled'; detail: string; done?: number; total?: number }>({ stage: 'idle', detail: '' });
    const [catalogAvailable, setCatalogAvailable] = useState(false);
    const [operation, setOperation] = useState<'core' | 'brew' | 'discover' | 'import' | 'rebuild' | null>(null);
    const controller = useRef<AbortController | null>(null), mounted = useRef(true), running = useRef(false), snapshotRead = useRef(false);
    const [packageReads, setPackageReads] = useState<Record<string, PackageReadRecord>>(() => {
        try {
            const value = JSON.parse(localStorage.getItem('easy_cc_homebrew_reads_v1') || '{}');
            return value && typeof value === 'object' && !Array.isArray(value) ? Object.fromEntries(Object.entries(value).filter(([, r]: any) => r && typeof r === 'object' && typeof r.state === 'string').map(([path, r]: any) => [path, ['queued', 'reading', 'downloaded'].includes(r.state) ? { ...r, state: 'cancelled', error: '上次读取中断，可重试。' } : r])) : {};
        }
        catch {
            return {};
        }
    });
    useEffect(() => {
        const timer = setTimeout(() => {
            try {
                localStorage.setItem('easy_cc_homebrew_reads_v1', JSON.stringify(packageReads));
            }
            catch { }
        }, 300);
        return () => clearTimeout(timer);
    }, [packageReads]);
    const [sourceSyncs, setSourceSyncs] = useState<Record<string, SourceSyncRecord>>(() => {
        try {
            const value = JSON.parse(localStorage.getItem('easy_cc_source_sync_v1') || '{}');
            return value && typeof value === 'object' && !Array.isArray(value) ? Object.fromEntries(Object.entries(value).filter(([, record]: any) => record && typeof record === 'object').map(([repository, record]: any) => [repository, record.state === 'syncing' ? { ...record, state: 'cancelled', error: '上次同步中断，可重试。' } : record])) : {};
        }
        catch {
            return {};
        }
    });
    useEffect(() => {
        const timer = setTimeout(() => {
            try {
                localStorage.setItem('easy_cc_source_sync_v1', JSON.stringify(sourceSyncs));
            }
            catch { }
        }, 300);
        return () => clearTimeout(timer);
    }, [sourceSyncs]);
    const [enabled, setEnabled] = useState<string[]>(readEnabled);
    const [catalog, setCatalog] = useState<ParsedCatalog>({ entries: [], diagnostics: [], documents: 0 });
    const applySnapshot = (snapshot: CatalogSnapshot) => {
        snapshotRead.current = true;
        setCatalogAvailable(true);
        setCatalog(snapshot.catalog);
        setDocuments(snapshot.documents);
        setPackages(snapshot.packages);
        if (snapshot.cacheWarning)
            setStatus(snapshot.cacheWarning);
    };
    useEffect(() => {
        mounted.current = true;
        let active = true;
        setStatus('正在读取资料目录…');
        loadCatalogSnapshot(false, message => {
            if (active)
                setStatus(message);
        }).then(snapshot => {
            if (!active)
                return;
            applySnapshot(snapshot);
            setSourceSyncs(old => Object.fromEntries(Object.entries(old).map(([key, record]) => [key, record.state === 'success' ? { ...record, catalogReady: true } : record])));
            setStatus(snapshot.cacheWarning || (snapshot.fromCache ? '已读取资料目录，无需重新解析。' : '资料整理完成。'));
            try {
                const result = JSON.parse(localStorage.getItem('easy_cc_external_fetch_result_v1') || 'null');
                if (Array.isArray(result?.errors) && result.errors.length) {
                    setErrors(result.errors);
                    setStatus('上次读取有未完成文件，可重新加载。');
                }
            }
            catch { }
        }).catch(e => {
            if (active)
                setErrors(['资源缓存读取失败：' + String(e)]);
        }).finally(() => {
            if (active)
                setReady(true);
        });
        return () => { active = false; mounted.current = false; controller.current?.abort(); };
    }, []);
    const toggle = (repository: string) => setEnabled(previous => {
        const next = previous.includes(repository) ? previous.filter(x => x !== repository) : [...previous, repository];
        try {
            localStorage.setItem('easy_cc_external_enabled_v1', JSON.stringify(next));
        }
        catch { }
        return next;
    });
    const run = async (kind: 'core' | 'discover' | 'brew', paths: string[] = []) => {
        if (running.current)
            return;
        running.current = true;
        const abort = new AbortController();
        controller.current = abort;
        setBusy(true);
        setErrors([]);
        setOperation(kind);
        setActivity({ stage: 'reading', detail: '正在检查资料来源…' });
        const reportDownload = (detail: string) => { const match = detail.match(/读取 (\d+) \/ (\d+)/); setStatus(detail); setActivity({ stage: detail.startsWith('保存') ? 'saving' : 'reading', detail, ...(match ? { done: Number(match[1]), total: Number(match[2]) } : {}) }); };
        const repository = kind === 'core' ? '5etools-cn' : 'homebrew', scope = kind === 'core' ? '中文主库' : '所选 ' + paths.length + ' 包';
        let syncRecorded = false, syncWarning = '';
        let syncErrors: string[] = [];
        if (kind !== 'discover')
            setSourceSyncs(old => ({ ...old, [repository]: { state: 'syncing', scope, at: new Date().toISOString() } }));
        if (kind === 'brew')
            setPackageReads(old => ({ ...old, ...Object.fromEntries(paths.map(path => [path, { state: 'queued', at: new Date().toISOString() }])) }));
        try {
            if (kind === 'discover') {
                const result = await discoverHomebrew(abort.signal);
                if (!mounted.current)
                    return;
                setPackages(result.paths);
                setStatus('发现 ' + result.paths.length + ' 个含玩家资源的资料包，请选择加载。');
                setActivity({ stage: 'complete', detail: '可选资料包清单已刷新。' });
            }
            else {
                const result = kind === 'core' ? await loadCore(abort.signal, reportDownload) : await loadHomebrew(paths, abort.signal, reportDownload, (path, state, error) => {
                    if (mounted.current)
                        setPackageReads(old => ({ ...old, [path]: { state, at: new Date().toISOString(), error } }));
                });
                if (!mounted.current)
                    return;
                setErrors(result.errors);
                syncErrors = result.errors;
                syncWarning = result.errors.length ? (kind === 'core' ? '本轮主库未写入，原有资料保留。' : '部分Homebrew文件未同步成功，已保存的原文保留。') : '';
                const syncState: SourceSyncRecord['state'] = result.errors.length ? (kind === 'core' ? 'failed' : 'partial') : 'success';
                setSourceSyncs(old => ({ ...old, [repository]: { state: syncState, catalogReady: false, scope, at: new Date().toISOString(), revision: result.revision, ...result.counts, error: result.errors.length ? result.errors.length + ' 个文件未同步成功' + (kind === 'core' ? '，本轮主库未写入' : '') : undefined } }));
                syncRecorded = true;
                if (result.documents.length)
                    setEnabled(previous => {
                        const next = [...new Set([...previous, repository])];
                        try {
                            localStorage.setItem('easy_cc_external_enabled_v1', JSON.stringify(next));
                        }
                        catch { }
                        return next;
                    });
                setStatus('本次读取 ' + result.documents.length + ' 个文件' + (result.errors.length ? '；部分文件失败，可重试。' : '；已保存资料。'));
                try {
                    localStorage.setItem('easy_cc_external_fetch_result_v1', JSON.stringify({ kind, errors: result.errors, at: new Date().toISOString() }));
                }
                catch { }
            }
            if (kind !== 'discover') {
                setStatus('正在更新资料目录，页面仍可使用…');
                setActivity({ stage: 'parsing', detail: '原文处理结束，正在生成可查阅目录…' });
                const snapshot = await loadCatalogSnapshot(true, message => {
                    if (mounted.current)
                        setStatus(message);
                });
                if (mounted.current) {
                    applySnapshot(snapshot);
                    setSourceSyncs(old => ({ ...old, [repository]: { ...old[repository], catalogReady: true } }));
                    setActivity({ stage: syncErrors.length ? 'failed' : 'complete', detail: syncErrors.length ? syncWarning : '同步完成，资料已保存到本机，可离线查阅。' });
                    setStatus([syncWarning, snapshot.cacheWarning || (snapshot.fromCache ? '已读取资料目录，无需重新解析。' : '资料目录已更新。')].filter(Boolean).join(' '));
                }
            }
        }
        catch (e) {
            if (mounted.current) {
                if (kind !== 'discover' && !syncRecorded)
                    setSourceSyncs(old => ({ ...old, [repository]: { state: abort.signal.aborted ? 'cancelled' : 'failed', scope, at: new Date().toISOString(), error: abort.signal.aborted ? undefined : String(e) } }));
                setActivity({ stage: abort.signal.aborted ? 'cancelled' : 'failed', detail: abort.signal.aborted ? '本次操作已取消，原有资料保留。' : syncRecorded ? '原文处理已结束，但目录尚未就绪。请重试。' : String(e) });
                const errors = [...syncErrors, String(e)];
                setStatus(abort.signal.aborted ? '已取消，保留此前已缓存资料。' : syncRecorded ? '原文同步结果已记录，但目录刷新未完成；原文保留，请重试或刷新页面。' : '加载未完成，可重试。');
                if (!abort.signal.aborted) {
                    setErrors(errors);
                    try {
                        localStorage.setItem('easy_cc_external_fetch_result_v1', JSON.stringify({ kind, errors }));
                    }
                    catch { }
                }
            }
        }
        finally {
            running.current = false;
            if (mounted.current) {
                setBusy(false);
                if (kind === 'brew')
                    setPackageReads(old => Object.fromEntries(Object.entries(old).map(([path, record]) => ['queued', 'reading', 'downloaded'].includes(record.state) ? [path, { ...record, state: abort.signal.aborted ? 'cancelled' : 'failed', error: abort.signal.aborted ? undefined : '本次读取未完成，请重试。' }] : [path, record])));
            }
        }
    };
    const installLocalDocuments = async (docs: SourceDocument[]) => {
        if (running.current)
            throw Error('请等待当前资料操作结束。');
        running.current = true;
        setBusy(true);
        setErrors([]);
        setOperation('import');
        setActivity({ stage: 'saving', detail: '正在保存导入资料…' });
        let stored = false;
        try {
            const { saveDocuments } = await import('../src/content/fiveetools/platformDocuments');
            const counts = await saveDocuments(docs);
            stored = true;
            setStatus('原文已保存，正在重建本地目录…');
            setActivity({ stage: 'parsing', detail: '正在生成导入资料目录…' });
            const snapshot = await loadCatalogSnapshot(true, setStatus);
            if (mounted.current) {
                applySnapshot(snapshot);
                setActivity({ stage: 'complete', detail: '资料导入完成，可离线查阅。' });
                setStatus(`本地导入完成：新增 ${counts.added}，更新 ${counts.updated}，未变化 ${counts.unchanged}。`);
            }
        }
        catch (error) {
            setActivity({ stage: 'failed', detail: stored ? '原文已保存，目录刷新未完成。' : String(error) });
            throw Error((stored ? '原文已保存，但目录刷新未完成，请刷新重试：' : '导入未完成：') + String(error));
        }
        finally {
            running.current = false;
            if (mounted.current)
                setBusy(false);
        }
    };
    const rebuildCatalog = async () => {
        if (running.current) return;
        running.current = true; setBusy(true); setOperation('rebuild');
        setActivity({ stage:'parsing', detail:'正在整理本机资料…' });
        try {
            const snapshot = await loadCatalogSnapshot(true, setStatus);
            if (!mounted.current) return;
            applySnapshot(snapshot);
            setSourceSyncs(old => Object.fromEntries(Object.entries(old).map(([key, record]) => [key, { ...record, catalogReady:true }])));
            setActivity({ stage:'complete', detail:'本机目录已整理。' });
        } catch (error) {
            if (mounted.current) { setActivity({ stage:'failed', detail:'目录整理未完成，原文保留。' }); setErrors(old => [...old, String(error)]); }
        } finally { running.current = false; if (mounted.current) setBusy(false); }
    };
    const packageStats = useMemo(() => {
        const stats: Record<string, {
            cards: number;
            diagnostics: ParsedCatalog['diagnostics'];
        }> = {};
        const ensure = (path: string) => stats[path] ||= ({ cards: 0, diagnostics: [] });
        for (const entry of catalog.entries)
            if (entry.sourceProvider === 'homebrew' && entry.provenance?.path)
                ensure(entry.provenance.path).cards++;
        const homebrewPaths = new Set(documents.filter(doc => doc.repository === 'homebrew').map(doc => doc.path));
        for (const diagnostic of catalog.diagnostics)
            if (diagnostic.path && (diagnostic.identity.startsWith('homebrew|') || homebrewPaths.has(diagnostic.path)))
                ensure(diagnostic.path).diagnostics.push(diagnostic);
        return stats;
    }, [catalog.entries, catalog.diagnostics, documents]);
    const sourceStats = useMemo(() => ['5etools-cn', 'homebrew'].map(repository => {
        const docs = documents.filter(doc => doc.repository === repository && !doc.path.startsWith('_generated/') && !/(?:^|\/)(?:fluff-)?index\.json$/.test(doc.path)), entries = catalog.entries.filter(entry => entry.sourceProvider === repository);
        const paths = new Set(docs.map(doc => doc.path));
        return { repository, files: docs.length, cards: entries.length, sources: new Set(entries.map(entry => entry.source)).size, revisions: [...new Set(docs.map(doc => doc.revision))], lastFetched: docs.map(doc => doc.fetchedAt).sort().slice(-1)[0], diagnostics: catalog.diagnostics.filter(d => d.identity.startsWith(repository + '|') || !!d.path && paths.has(d.path)).length };
    }), [documents, catalog.entries, catalog.diagnostics]);
    const visibleEntries = useMemo(() => catalog.entries.filter(e => enabled.includes(e.sourceProvider)), [catalog.entries, enabled]);
    return { operation, catalogAvailable, rebuildCatalog, allEntries: catalog.entries, activity, installLocalDocuments, ...catalog, entries: visibleEntries, total: catalog.entries.length, documents, packageReads, packageStats, sourceSyncs, sourceStats, enabled, toggle, run, cancel: () => controller.current?.abort(), busy, status, errors, packages, ready };
}
