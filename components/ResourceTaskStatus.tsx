import type { useExternalResources } from '../hooks/useExternalResources';
export type ResourceManagerState = ReturnType<typeof useExternalResources>;
const operations = { core: '中文主库', brew: '扩展资料包', discover: '资料包目录', import: '本地导入', rebuild: '本机目录' };
const stages = { idle: '', reading: '下载中', saving: '保存中', parsing: '整理中', complete: '已完成', failed: '未完成', cancelled: '已取消' };
export function ResourceTaskStatus({ resources: r, compact = false }: {
    resources: ResourceManagerState;
    compact?: boolean;
}) {
    const stage = r.activity.stage;
    if (stage === 'idle')
        return null;
    return <div className={'resource-task state-' + stage} role="status" aria-live="polite">
        {!compact && <strong>{r.operation ? operations[r.operation] : '资料'} · {stages[stage]}</strong>}
        {r.busy ? <><progress aria-label="资料处理进度" {...(stage === 'reading' && r.activity.total ? { value: r.activity.done, max: r.activity.total } : {})}/>{stage === 'reading' && r.activity.total && <small>{r.activity.done || 0} / {r.activity.total}</small>}{!compact && stage === 'reading' && r.operation !== 'rebuild' && <button type="button" onClick={r.cancel}>取消</button>}</>
            : <small>{r.activity.detail}</small>}
    </div>;
}
