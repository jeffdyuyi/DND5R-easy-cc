import type { CharacterData, ResourceSnapshot } from '../../types';
import { initialClass } from '../../src/character/inventory';
import { resourceKey } from '../../src/content/resourceIdentity';
import { RichText } from '../RichText';
import { SnapshotUpdate } from '../SnapshotUpdate';
import { refreshCharacterSnapshot } from '../../src/character/resources';

const proficiencyKinds = [['skills', '技能'], ['saves', '豁免'], ['weapons', '武器'], ['armor', '护甲 / 受训'], ['tools', '工具']] as const;
export function CharacterBuildSummary({ character: c, updateCharacter: update, onView }: { character: CharacterData; updateCharacter: (v: Partial<CharacterData>) => void; onView: (item: ResourceSnapshot) => void }) {
    const main = initialClass(c);
    const cards = (c.resourceCards || []).filter(item => ['species', 'backgrounds'].includes(item.kind) || item.kind === 'classes' && (c.multiclassEnabled || item === main));
    const sections = new Map<string, Map<string, string[]>>();
    const add = (group: string, value: string | undefined, source: string) => {
        if (!value?.trim()) return;
        if (!sections.has(group)) sections.set(group, new Map());
        const rows = sections.get(group)!;
        rows.set(value, [...new Set([...(rows.get(value) || []), source])]);
    };
    for (const card of cards) {
        const data = card.buildData;
        if (!data) continue;
        const label = card.name + ' · ' + card.source;
        if (card.kind === 'species') {
            if (card.size || card.fields?.size) add('体型、速度与感官', '体型 ' + (card.size || card.fields?.size), label);
            add('体型、速度与感官', card.speedText || card.fields?.speedText || (typeof data.speed === 'number' ? '速度 ' + data.speed + '尺' : ''), label);
            if (data.darkvision !== undefined) add('体型、速度与感官', '黑暗视觉 ' + data.darkvision + '尺', label);
        }
        add('语言与额外语言', data.summary?.languageProficiencies, label);
        if (card.kind === 'classes') {
            const initial = card === main;
            const p = initial ? data.mainSummary : data.multiclassSummary;
            for (const [key, title] of proficiencyKinds) add('熟练 · ' + title, p?.[key] || (!initial ? p?.[({ skills: 'skillProficiencies', saves: 'savingThrows', weapons: 'weaponProficiencies', armor: 'armorProficiencies', tools: 'toolProficiencies' })[key]] : ''), label + (initial ? '（初始职业）' : '（兼职）'));
        } else {
            for (const [field, title] of [['skillProficiencies', '技能'], ['weaponProficiencies', '武器'], ['armorProficiencies', '护甲 / 受训'], ['toolProficiencies', '工具']]) add('熟练 · ' + title, data.summary?.[field], label);
        }
        for (const [field, text] of Object.entries(data.inheritedSummary || {})) add(field === 'languageProficiencies' ? '语言与额外语言' : '其他明确继承项', String(text), label + '（继承）');
    }
    if (c.languages) add('玩家记录的语言', c.languages, '手动记录');
    for (const language of (c.resourceCards || []).filter(item => item.kind === 'languages')) add('玩家记录的语言', language.name, language.source);
    return <details className="folio-section build-summary"><summary>建卡核对清单</summary><p>固定项与待选范围按来源列出，请对照填写纸卡。未从特性正文推断的额外获得项，仍需阅读原条目。</p>
        {[...sections].map(([title, rows]) => <section key={title}><h3>{title}</h3>{[...rows].map(([value, labels]) => <div className="build-summary-row" key={value}><RichText text={value}/><small>{labels.join('；')}</small></div>)}</section>)}
        {cards.map(card => <div className="build-summary-source" key={resourceKey(card)}><button type="button" onClick={() => onView(card)}>{card.name} · 查看原文</button>{!card.buildData && <><small>此条目没有可用的汇总结构，请查阅原文；如本地有新版，可手动刷新。</small><SnapshotUpdate item={card} onUpdate={next => update(refreshCharacterSnapshot(c, next))}/></>}</div>)}
        {!cards.length && <p>先选择种族、初始职业与背景。</p>}
    </details>;
}
