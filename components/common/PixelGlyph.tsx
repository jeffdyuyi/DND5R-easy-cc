import { AssetIcon } from './AssetIcon';
const profession: Record<string, string> = { barbarian: 'barbarian', 野蛮人: 'barbarian', bard: 'bard', 吟游诗人: 'bard', cleric: 'cleric', 牧师: 'cleric', druid: 'druid', 德鲁伊: 'druid', fighter: 'fighter', 战士: 'fighter', monk: 'monk', 武僧: 'monk', paladin: 'paladin', 圣武士: 'paladin', ranger: 'ranger', 游侠: 'ranger', rogue: 'rogue', 游荡者: 'rogue', 盗贼: 'rogue', sorcerer: 'sorcerer', 术士: 'sorcerer', warlock: 'warlock', 邪术师: 'warlock', 魔契师: 'warlock', wizard: 'wizard', 法师: 'wizard' };
const classKey = (value: unknown) => typeof value === 'string' ? profession[value.trim().toLowerCase()] : undefined;
export function resourceIconKind(item: any): string {
    if (item.kind === 'languages')
        return 'book';
    if (item.kind === 'charOptions')
        return 'backgrounds';
    if (item.kind === 'rewards')
        return 'feats';
    if (item.kind === 'psionics')
        return 'spells';
    if (item.kind === 'optionalFeatures')
        return 'book';
    if (item.kind === 'classes')
        return classKey(item.srdEnglishName) || classKey(item.englishName) || classKey(item.name) || 'classes';
    if (item.kind === 'subclasses')
        return classKey(item.parentClass) || classKey(item.className) || 'subclasses';
    const name = String(item.srdEnglishName || item.englishName || '').toLowerCase();
    if (/\bacolyte\b/.test(name))
        return 'candle';
    if (/\b(book|spellbook|tome|manual)\b/.test(name))
        return 'book';
    if (/\b(shortbow|longbow|crossbow|bow)\b/.test(name))
        return 'bow';
    if (/\bshield\b/.test(name))
        return 'shield';
    if (/\b(potion|elixir|oil)\b/.test(name))
        return 'potion';
    return item.kind || 'feats';
}
// Compatibility name retained for existing call sites; resource art now comes from Game-icons.
export function PixelGlyph({ kind, className = '' }: {
    kind: string;
    className?: string;
}) { return <AssetIcon name={'game/' + (({ languages: 'book', optionalFeatures: 'book', charOptions: 'backgrounds', rewards: 'feats', psionics: 'spells' } as Record<string, string>)[kind] || kind)} className={'pixel-glyph resource-glyph ' + className}/>; }
