// Display order only. Move the level progression table, never a feature-specific table.
const plain = (s: string) => s.replace(/[#*_]/g, '').trim();
export function classFeatureTableFirst(body: string): string {
    const lines = body.split('\n');
    const table = lines.findIndex(line => line.trim().startsWith('|') && /等级/.test(line) && /熟练/.test(line) && /特性/.test(line));
    const heading = lines.findIndex(line => { const s = plain(line); return /^职业特性$/.test(s) || /^[\u3400-\u9fff]+职业特性\s*(?:[A-Za-z ]+)?$/.test(s); });
    if (table < 0 || heading < 0 || heading >= table)
        return body;
    let insert = heading + 1;
    while (insert < table && /^[A-Za-z][A-Za-z ]+$/.test(lines[insert].trim()))
        insert++;
    while (insert < table && !lines[insert].trim())
        insert++;
    // Keep the source introductory paragraph immediately below its section title.
    if (insert < table && !/^\s*(?:#|\|)/.test(lines[insert]) && /作为|获得|下述|下列/.test(lines[insert])) {
        while (insert < table && lines[insert].trim())
            insert++;
    }
    let start = table, end = table + 1;
    while (end < lines.length && lines[end].trim().startsWith('|'))
        end++;
    let caption = table - 1;
    while (caption > heading && !lines[caption].trim())
        caption--;
    const hasCaption = caption > heading && /^(?:表格\s*[-－—：:]|.*\bFeatures\s*$)/.test(plain(lines[caption]));
    if (hasCaption)
        start = caption;
    if (insert >= start)
        return body;
    const block = lines.slice(start, end);
    const remaining = [...lines.slice(0, start), ...lines.slice(end)];
    remaining.splice(insert, 0, '', ...block, '');
    return remaining.join('\n');
}
