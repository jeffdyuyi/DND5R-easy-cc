export interface CoreManagementInput {
    ready: boolean;
    catalogAvailable: boolean;
    files: number;
    revisions: string[];
    sync?: {
        state: string;
        catalogReady?: boolean;
        revision?: string;
    };
    upstream?: {
        revision?: string;
        checking?: boolean;
        error?: string;
    };
}
export function coreManagementState(input: CoreManagementInput): {
    label: string;
    action: 'download' | 'check' | 'update' | 'retry' | 'rebuild' | 'none';
    tone: string;
} {
    const { ready, catalogAvailable, files, revisions, sync, upstream } = input;
    if (!ready)
        return { label: '正在载入本机资料', action: 'none', tone: 'working' };
    if (!catalogAvailable || sync?.state === 'success' && sync.catalogReady === false)
        return { label: '目录未就绪', action: 'rebuild', tone: 'warning' };
    if (sync && ['failed', 'partial', 'cancelled'].includes(sync.state))
        return { label: files ? '上次更新未完成，原资料保留' : '上次下载未完成', action: 'retry', tone: 'warning' };
    if (!files)
        return { label: '尚未下载', action: 'download', tone: 'empty' };
    if (upstream?.checking)
        return { label: '正在检查更新', action: 'none', tone: 'working' };
    if (upstream?.error)
        return { label: '检查未完成，本机资料保留', action: 'check', tone: 'warning' };
    if (!upstream?.revision)
        return { label: '已保存，尚未检查更新', action: 'check', tone: 'ready' };
    const matches = revisions.length === 1 && revisions[0] === upstream.revision;
    if (!matches)
        return { label: '上游修订与本机不同', action: 'update', tone: 'update' };
    if (sync?.state !== 'success' || sync.revision !== upstream.revision)
        return { label: '修订一致，完整性待核对', action: 'retry', tone: 'warning' };
    return { label: '已是最新', action: 'none', tone: 'ready' };
}
export function packageManagementState(record: {
    state: string;
} | undefined, cached: boolean, directoryReady = true) {
    if (record?.state === 'failed')
        return 'failed';
    if (record?.state === 'cancelled')
        return 'cancelled';
    if (record?.state === 'queued' || record?.state === 'reading')
        return record.state;
    if (record?.state === 'downloaded' || record?.state === 'cached')
        return directoryReady && cached ? 'cached' : 'saved';
    return cached ? 'cached' : 'unread';
}
export const packageStateNames: Record<string, string> = { unread: '未下载', cached: '已下载', saved: '待整理', queued: '排队中', reading: '下载中', failed: '未完成', cancelled: '已取消' };
export function packageTitle(path: string) {
    const value = path.replace(/^[^/]+\//, '').replace(/\.json$/, '');
    const split = value.indexOf(';');
    return { title: split >= 0 ? value.slice(split + 1).trim() : value, author: split >= 0 ? value.slice(0, split).trim() : '' };
}
