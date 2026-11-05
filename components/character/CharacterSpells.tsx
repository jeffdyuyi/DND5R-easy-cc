import { useState } from 'react';
import type { CharacterData } from '../../types';
import { resourceKey } from '../../src/content/resourceIdentity';
import { SpellFilters, spellClasses } from './SpellFilters';
import { useResourceCatalog } from '../../hooks/useResourceCatalog';
import { characterAllows } from '../../src/content/resourceIdentity';
import { CharacterResourcePicker } from './CharacterResourcePicker';
const origins = ['种族给予', '专长给予', '背景给予', '职业固定准备', '其他'];
export function CharacterSpells({ character: c, updateCharacter: update, onSources }: { character: CharacterData; updateCharacter: (v: Partial<CharacterData>) => boolean; onSources: () => void }) {
    const [filters, setFilters] = useState({ level: '全部', school: '全部', career: '全部' });
    const available = useResourceCatalog().filter(item => item.kind === 'spells' && characterAllows(c, item));
    const spells = (c.resourceCards || []).filter(item => item.kind === 'spells');
    const tier = (item: any) => { const value = item.level ?? item.fields?.level; return value === undefined ? 'unknown' : String(value); };
    const accepts = (item: any) => (filters.level === '全部' || tier(item) === filters.level) && (filters.school === '全部' || String(item.fields?.school || item.school || '未注明') === filters.school) && (filters.career === '全部' || spellClasses(item).includes(filters.career));
    return <div className="character-spells-compact"><div className="spell-guidance"><p>角色职业会给予你规范化的施法能力，具体施法规则请查阅职业。</p><p>种族、背景、专长以及部分特殊奖励都可能给与角色额外的法术，请参看具体条目获取对应内容。</p></div><CharacterResourcePicker character={c} updateCharacter={update} kinds={['spells']} heading="法术" spellFilterControls={<SpellFilters items={[...available, ...spells]} {...filters} onChange={(field, value) => setFilters(old => ({ ...old, [field]: value }))}/>} filterCandidate={accepts} onManageSources={onSources}/><label className="spell-origin-switch"><input type="checkbox" checked={!!c.spellSourceTracking} onChange={e => update({ spellSourceTracking: e.target.checked })}/>多来源记录</label>{c.spellSourceTracking && spells.map(item => {
        const key = resourceKey(item), record = c.spellSourceNotes?.[key] || { source: '', note: '' };
        const tags = record.source.split('、').filter(Boolean);
        const save = (value: Partial<typeof record>) => update({ spellSourceNotes: { ...c.spellSourceNotes, [key]: { ...record, ...value } } });
        return <section className="spell-source-record" key={key}><h4>{item.name}</h4><div className="spell-source-options">{origins.map(source => <label key={source}><input type="checkbox" checked={tags.includes(source)} onChange={e => save({ source: (e.target.checked ? [...tags, source] : tags.filter(x => x !== source)).join('、') })}/>{source}</label>)}</div><label>备注<input value={record.note} onChange={e => save({ note: e.target.value })}/></label></section>;
    })}{c.spells && Object.values(c.spells).some(Boolean) && <details><summary>旧手填法术</summary>{Object.entries(c.spells).filter(([, value]) => value).map(([key, value]) => <p key={key}>{key}：{value}</p>)}</details>}</div>;
}
