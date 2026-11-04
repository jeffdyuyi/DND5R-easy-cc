// Index existing native SRD content without replacing or changing its source prose.
const groups: Record<string, string> = { '战斗风格': '战斗风格', '超魔': '超魔法', '玄秘祈请': '魔能祈唤', '魔能祈唤': '魔能祈唤', '契约恩赐': '魔契恩泽', 'Metamagic Options': '超魔法', 'Eldritch Invocation Options': '魔能祈唤' };
export function srdOptionalFeatures(classes: any[]) {
    const entries: any[] = [], sameContent = new Map<string, any>();
    const add = (parent: any, name: string, body: string, category: string, englishName = '', provenance = parent.provenance) => {
        if (!body.trim())
            return;
        const key = [parent.source, category, name, body.trim()].join('\u0000'), owner = { id: parent.id, name: parent.name, source: parent.source };
        const existing = sameContent.get(key);
        if (existing) {
            existing.optionOwners.push(owner);
            existing.associatedClasses = [...new Set([...existing.associatedClasses, parent.name])];
            existing.fields.associatedClasses = existing.associatedClasses;
            return;
        }
        const record = { id: parent.id + ':optional:' + encodeURIComponent(category + ':' + name), kind: 'optionalFeatures', name, englishName, source: parent.source, version: parent.version, contentOrigin: 'builtin-srd', bodyFormat: 'markdown', description: body.trim(), fullDescription: body.trim(), fields: { optionCategory: category, associatedClasses: [parent.name] }, optionCategory: category, associatedClasses: [parent.name], optionOwners: [owner], provenance: { ...provenance, anchor: [provenance?.anchor, category, name].filter(Boolean).join(' / ') }, parentResourceId: parent.id, tags: [parent.source, category] };
        entries.push(record);
        sameContent.set(key, record);
    };
    for (const parent of classes) {
        for (const section of parent.relatedSections || []) {
            const category = groups[section.group];
            if (category)
                add(parent, section.title, section.body, category, section.englishName || '', section.provenance || parent.provenance);
        }
        const lines = String(parent.fullDescription || parent.description || '').split('\n');
        let group = '', depth = 0, title = '', start = -1;
        const flush = (end: number) => {
            if (start >= 0)
                add(parent, title, lines.slice(start, end).join('\n'), group);
            start = -1;
            title = '';
        };
        for (let i = 0; i < lines.length; i++) {
            const heading = lines[i].match(/^(#{1,6})\s+(.+?)\s*$/);
            if (!heading)
                continue;
            const level = heading[1].length, name = heading[2];
            if (group && level <= depth) {
                flush(i);
                group = '';
            }
            if (groups[name]) {
                group = groups[name];
                depth = level;
                continue;
            }
            if (group && level === depth + 1) {
                flush(i);
                title = name;
                start = i + 1;
            }
        }
        flush(lines.length);
    }
    return entries;
}
