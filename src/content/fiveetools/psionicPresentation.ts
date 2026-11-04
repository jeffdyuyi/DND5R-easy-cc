import { Raw } from './model';
// Mirrors source mode/submode structure; no point spending or concentration automation.
export function psionicSections(raw: Raw, render: (value: any) => string, text: (value: any) => string, warn: (code: string, message: string) => void): string {
    const list = (value: any): any[] => Array.isArray(value) ? value : value == null ? [] : [value];
    const parts: string[] = [];
    if (raw.focus)
        parts.push('### 灵能专注\n\n' + render(raw.focus));
    const units: Raw = { rnd: '轮', round: '轮', min: '分钟', minute: '分钟', hr: '小时', hour: '小时', day: '天' };
    const modeText = (mode: any, depth = 0): string => {
        if (!mode || typeof mode !== 'object')
            return render(mode);
        if (depth > 12) {
            warn('PSIONIC_MODE_DEPTH', '模式层级超过展示限制，原始资料保留。');
            return '';
        }
        const name = [mode.name, mode.ENG_name].filter(Boolean).map(text).join(' · '), parameters: string[] = [];
        if (mode.cost != null) {
            const cost = mode.cost;
            if (typeof cost === 'number' || typeof cost === 'string')
                parameters.push('**消耗** ' + text(cost) + '灵能点');
            else if (cost.min !== undefined) {
                parameters.push('**消耗** ' + cost.min + (cost.max !== undefined && cost.max !== cost.min ? '–' + cost.max : '') + '灵能点');
                for (const key of Object.keys(cost))
                    if (!['min', 'max'].includes(key))
                        warn('PSIONIC_COST_FIELD', '未支持的消耗字段：' + key);
            }
            else
                warn('PSIONIC_COST_FIELD', '消耗结构缺少min，未猜测数值。');
        }
        if (mode.concentration) {
            const concentration = mode.concentration;
            if (concentration.duration !== undefined)
                parameters.push('**专注** ' + concentration.duration + (units[concentration.unit] || text(concentration.unit || '')));
            else
                warn('PSIONIC_CONCENTRATION_FIELD', '专注结构缺少duration，未猜测持续时间。');
        }
        for (const key of Object.keys(mode))
            if (!['name', 'ENG_name', 'entries', 'entry', 'cost', 'concentration', 'submodes', 'source', 'page'].includes(key))
                warn('PSIONIC_MODE_FIELD', '未支持的模式字段：' + key);
        return [name ? (depth ? '**' + name + '**' : '### ' + name) : '', parameters.join(' · '), render(mode.entries ?? mode.entry), ...list(mode.submodes).map(submode => modeText(submode, depth + 1))].filter(Boolean).join('\n\n');
    };
    for (const mode of list(raw.modes))
        parts.push(modeText(mode));
    return parts.filter(Boolean).join('\n\n');
}
