import { Raw, SourceDocument } from './model';

// Explicit upstream chapter identities, rather than classifying prose by keywords.
const chapters = new Map([
    ['Chapter 1: Playing the Game', 'gameplayRules'],
    ['Chapter 2: Creating a Character', 'creationRules'],
]);

export function bookRuleSections(document: SourceDocument): Raw[] {
    if (document.path !== 'data/book/book-xphb.json' || !Array.isArray(document.body.data)) return [];
    return document.body.data.flatMap((chapter: Raw) => {
        const kind = chapters.get(chapter.ENG_name);
        if (!kind || !Array.isArray(chapter.entries)) return [];
        // Each immediate section retains its entire nested body. Unnamed opening
        // paragraphs remain together under their original chapter title.
        const opening = chapter.entries.filter((entry: any) => !entry || typeof entry !== 'object' || !entry.name);
        const sections = chapter.entries.flatMap((entry: any, index: number) => entry && typeof entry === 'object' && entry.name ? [{ entry, index }] : []);
        if (opening.length) sections.unshift({ entry: { name: chapter.name, ENG_name: chapter.ENG_name, entries: opening }, index: -1 });
        return sections.map(({ entry, index }: { entry: Raw; index: number }) => ({
            ...entry,
            bookSection: entry,
            source: 'XPHB',
            page: entry.page ?? chapter.page,
            edition: 'one',
            bookChapter: chapter.name,
            bookChapterId: chapter.id,
            bookSectionIndex: index,
            _bookRuleKind: kind,
            _variantIdentity: String(chapter.id || chapter.ENG_name) + ':' + index,
        }));
    });
}
