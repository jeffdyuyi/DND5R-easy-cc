import sourceLabels from './detail-labels.json';
const knownLabels = new Set<string>(sourceLabels);
// Formatting recognition only. No content replacement, feature IDs or rule lookup.
export function detailLead(line: string): number {
    if (/^\s*[*#|]/.test(line))
        return 0; // Existing Markdown carries its own emphasis.
    const bilingual = line.match(/^\s*(?:[-•]\s*)?([\u3400-\u9fff]{2,24}\s*[A-Z][A-Za-z0-9 ’'(),/\-]+[。．:：])/);
    if (bilingual && !/^[你我他它当若每这该]/.test(bilingual[1]))
        return bilingual[0].length;
    const short = line.match(/^\s*(?:[-•]\s*)?([\u3400-\u9fff]{2,12})[。．]/);
    if (short && knownLabels.has(short[1]))
        return short[0].length;
    const field = line.match(/^\s*(?:[-•]\s*)?([\u3400-\u9fff]{2,12}[：:])/);
    if (field && !/^[你我他它当若每这该]/.test(field[1]))
        return field[0].length;
    return 0;
}
export function detailHeading(line: string): boolean {
    const s = line.trim();
    if (!s || /[。！？；;|*#]/.test(s) || s.length > 110)
        return false;
    if (/^(?:第)?\d+\s*级[：:]/.test(s) && !/[，,]/.test(s))
        return true;
    return /^[\u3400-\u9fff]{2,24}\s*[A-Z][A-Za-z0-9 ’'(),/\- ]+$/.test(s) && !/^[你我他它当若每这该]/.test(s);
}
