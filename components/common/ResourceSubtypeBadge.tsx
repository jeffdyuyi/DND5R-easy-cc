import { PixelGlyph } from './PixelGlyph';
const featIcons: Record<string, string> = { '起源': 'species', '通用': 'book', '战斗风格': 'weapons', '传奇恩惠': 'feats' };
export function ResourceSubtypeBadge({ label, featCategory }: {
    label: string;
    featCategory?: string;
}) {
    if (!label)
        return null;
    return <span className="resource-subtype-badge">{featCategory && featIcons[featCategory] && <PixelGlyph kind={featIcons[featCategory]}/>}<span>{label}</span></span>;
}
