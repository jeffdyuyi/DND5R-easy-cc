import { Raw } from './model';
const equal = (a: any, b: any) => String(a ?? '').toLowerCase() === String(b ?? '').toLowerCase();
// Compatibility copies retain the same publication/name and only change the parent-class association.
// Other copies (new source, renamed variant, or content modifications) remain independent cards.
export function compatibilityParent(record: Raw, candidates: Raw[] = []): Raw | null {
    const original = record.__original || record.raw || record;
    const copy = original._copy;
    if (!copy || copy._mod || original._mod || copy._templates?.length)
        return null;
    if (!equal(original.source, copy.source))
        return null;
    if (![original.name, original.ENG_name].filter(Boolean).some(name => [copy.name, copy.ENG_name].filter(Boolean).some(parent => equal(name, parent))))
        return null;
    if (!equal(original.className, copy.className || original.className))
        return null;
    if (equal(original.classSource || 'PHB', copy.classSource || 'PHB'))
        return null;
    const associationFields = new Set(['name', 'ENG_name', 'shortName', 'source', 'className', 'classSource', '_copy', 'subclassFeatures', 'page', 'edition', 'reprintedAs', 'otherSources', 'additionalSources', 'referenceSources', 'srd', 'srd52', 'basicRules', 'basicRules2024', 'hasFluff', 'hasFluffImages']);
    if (Object.keys(original).some(key => !associationFields.has(key)))
        return null;
    if (original.subclassFeatures) {
        const parents = candidates.filter(parent => parent !== record && equal(parent.source, copy.source) && equal(parent.className, copy.className || original.className) && equal(parent.classSource || 'PHB', copy.classSource || 'PHB') && [parent.name, parent.ENG_name].filter(Boolean).some(name => [copy.name, copy.ENG_name].filter(Boolean).some(alias => equal(name, alias))));
        if (parents.length !== 1)
            return null;
        const signatures = (refs: any[]) => refs.map(ref => {
            const uid = typeof ref === 'string' ? ref : ref?.subclassFeature;
            if (typeof uid !== 'string')
                return '';
            const parts = uid.split('|');
            return [parts[0], parts[3], parts[6] || parts[4] || 'PHB'].join('|').toLowerCase();
        });
        if (!Array.isArray(original.subclassFeatures) || JSON.stringify(signatures(original.subclassFeatures)) !== JSON.stringify(signatures(parents[0].subclassFeatures || [])))
            return null;
    }
    return { name: copy.name || copy.ENG_name, englishName: copy.ENG_name, source: copy.source, className: copy.className || original.className, classSource: copy.classSource || 'PHB' };
}
