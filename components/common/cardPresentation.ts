// Presentation adapter: source formatting never chooses a visual template.
// Source text is retained on the record; only faithfully represented rows are omitted in the view.
const equipmentLabels: Record<string, string> = { 名称: 'name', 护甲: 'name', 物品: 'name', 种类: 'type', 价格: 'cost', 重量: 'weight', '护甲等级（AC）': 'armorClass', '护甲等级(AC)': 'armorClass', 护甲等级: 'armorClass', 力量: 'strengthRequirement', 力量要求: 'strengthRequirement', 隐匿: 'stealth', 伤害: 'damage', 属性: 'weaponProperties', 武器词条: 'weaponProperties', 武器精通: 'mastery' };
export function cardPresentation(input: any) {
    const item = { ...input, ...input.fields };
    const raw = String(input.fullDescription || '');
    if (!['armors', 'weapons', 'gears', 'tools'].includes(item.kind))
        return { ...item, displayBody: raw };
    const lines = raw.split(/\r?\n/), omit = new Set<number>();
    // A single-record table has headers, separator and exactly one value row.
    const extraFacts: [
        string,
        string
    ][] = [];
    const tableLines = lines.map((line, index) => ({ line, index })).filter(x => x.line.trim().startsWith('|'));
    const cells = (line: string) => line.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map(s => s.trim());
    if (tableLines.length === 3) {
        const headers = cells(tableLines[0].line), values = cells(tableLines[2].line);
        if (headers.length === values.length && cells(tableLines[1].line).every(s => /^:?-{3,}:?$/.test(s)) && headers.every(h => equipmentLabels[h])) {
            headers.forEach((h, i) => {
                const key = equipmentLabels[h];
                if (key !== 'name') {
                    const value = input.userCustomization && Object.hasOwn(input.fields || {}, key) ? input.fields[key] : values[i];
                    item[key] = value;
                    if (['gears', 'tools'].includes(item.kind))
                        extraFacts.push([h, String(value ?? '')]);
                }
            });
            tableLines.forEach(x => omit.add(x.index));
        }
    }
    // Tool tables are label/value cells, not a comparison of several records.
    if (item.kind === 'tools' && tableLines.length >= 3) {
        const data = tableLines.filter((_, i) => i !== 1).flatMap(x => cells(x.line)).filter(Boolean);
        const pairs = data.map(cell => cell.match(/^([^：:]+)[：:]\s*(.*)$/));
        if (pairs.length && pairs.every(Boolean)) {
            for (const match of pairs) {
                const keys: Record<string, string> = { '属性': 'toolAbility', '重量': 'weight', '操作': 'toolUtilize', '制造': 'toolCraft', '变体': 'toolVariants' };
                const key = keys[match![1]];
                const value = input.userCustomization && key && Object.hasOwn(input.fields || {}, key) ? input.fields[key] : match![2];
                extraFacts.push([match![1], Array.isArray(value) ? value.join('、') : String(value ?? '')]);
            }
            tableLines.forEach(x => omit.add(x.index));
        }
    }
    lines.forEach((line, index) => {
        const match = line.trim().match(/^([^：:]+)[：:]\s*(.*)$/);
        if (!match)
            return;
        const key = equipmentLabels[match[1]];
        if (!key)
            return;
        if (key !== 'name' && !(input.userCustomization && Object.hasOwn(input.fields || {}, key)))
            item[key] = match[2];
        omit.add(index);
    });
    return { ...item, extraFacts, displayBody: lines.filter((_, index) => !omit.has(index)).join('\n').trim() };
}
