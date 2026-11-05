import { CharacterPortrait } from './CharacterPortrait';
import { LanguageTags } from './LanguageTags';
import { ALIGNMENT_DESCRIPTIONS } from '../../src/character/alignmentReference';
import type { Alignment, CharacterData } from '../../types';
import { CharacterResourcePicker } from './CharacterResourcePicker';
const alignments: Alignment[] = ['', '守序善良', '中立善良', '混乱善良', '守序中立', '绝对中立', '混乱中立', '守序邪恶', '中立邪恶', '混乱邪恶'];
export function CharacterOrigin({ character: c, updateCharacter: update, onSources }: {
    character: CharacterData;
    updateCharacter: (updates: Partial<CharacterData>) => boolean;
    onSources: () => void;
}) {
    const picker = (kind: string, heading?: string) => <CharacterResourcePicker character={c} updateCharacter={update} kinds={[kind]} heading={heading} onManageSources={onSources}/>;
    return <div className="character-origin"><label className="origin-name">角色名称<input value={c.name} onChange={e => update({ name: e.target.value })}/></label><CharacterPortrait character={c} updateCharacter={update}/>
  <div className="origin-resource-grid"><section className="folio-section">{picker('species')}{!(c.resourceCards || []).some(card => card.kind === 'species') && c.race && <p>保留的手填种族：{c.race}</p>}</section><section className="folio-section">{picker('backgrounds')}{!(c.resourceCards || []).some(card => card.kind === 'backgrounds') && c.background && <p>保留的手填背景：{c.background}</p>}</section></div>
  <section className="folio-section"><h2>参考阵营</h2><div className="alignment-grid" role="group" aria-label="参考阵营">{alignments.filter(Boolean).map(value => <button key={value} type="button" aria-pressed={c.alignment === value} onClick={() => update({ alignment: c.alignment === value ? '' : value })}>{value}</button>)}</div>{c.alignment && ALIGNMENT_DESCRIPTIONS[c.alignment] && <div className="alignment-reference" aria-live="polite"><h3>{ALIGNMENT_DESCRIPTIONS[c.alignment].title}</h3><p>{ALIGNMENT_DESCRIPTIONS[c.alignment].quote}</p><p>{ALIGNMENT_DESCRIPTIONS[c.alignment].desc}</p><p>{ALIGNMENT_DESCRIPTIONS[c.alignment].advantage}</p></div>}</section>
  <section className="folio-section">{picker('languages', '语言熟练')}<LanguageTags value={c.languages} onChange={languages => update({ languages })}/></section>
 </div>;
}
