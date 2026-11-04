import { resourceLabels } from '../../src/content/resourceRegistry';
export function ResourceCardTopline({ kind, corner }: {
    kind: string;
    corner?: string;
}) {
    return <div className="resource-card-topline shared-card-topline"><span className="resource-category-tab">{resourceLabels[kind] || '资源'}</span>{corner && <span className="resource-corner-mark" aria-label={'法术环阶：' + corner}>{corner}</span>}</div>;
}
