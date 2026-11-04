export type Raw = Record<string, any>;
export interface SourceDocument {
    repository: '5etools-cn' | 'homebrew';
    revision: string;
    path: string;
    url: string;
    fetchedAt: string;
    active?: boolean;
    body: Raw;
}
export interface Diagnostic {
    code: string;
    identity: string;
    message: string;
    path?: string;
}
export interface ParsedCatalog {
    entries: Raw[];
    diagnostics: Diagnostic[];
    documents: number;
    compatibilityLinks?: Raw[];
}
export const RESOURCE_PROPS = ['class', 'subclass', 'race', 'subrace', 'background', 'feat', 'spell', 'baseitem', 'item', 'itemGroup', 'magicvariant', 'classFeature', 'subclassFeature', 'optionalfeature', 'raceFeature', 'vehicle', 'charoption', 'reward', 'psionic', 'language', 'recipe', 'condition', 'disease', 'status', 'variantrule', 'action'];
export const SOURCE_CONFIG = { core: { repository: '5etools-cn' as const, repo: 'tjliqy/5etools-cn', branch: 'cn2.0', revision: '5cc0bbe2c2b241a334e731af4448bdba2168e8bd' }, brew: { repository: 'homebrew' as const, repo: 'tjliqy/homebrew', branch: 'cn', revision: '8292dbe4db3b09337e123d269e5beb1d5c3416e9' } };
