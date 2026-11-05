import { useEffect, useState } from 'react';
import type { CharacterData, CharacterQuickRecord, ResourceSnapshot } from '../../types';
import { useResourceCatalog } from '../../hooks/useResourceCatalog';
import { abilities, skills, skillLabel, abilityScores, abilitySources, skillGrants, grantedSkills, proficiencyBonus, buildData, levels, slotTable } from '../../src/character/quickRecord';
import { initialClass } from '../../src/character/inventory';
import { resourceKey } from '../../src/content/resourceIdentity';
import { CharacterEquipment } from './CharacterEquipment';
import { CharacterBuildSummary } from './CharacterBuildSummary';

const signed = (n: number) => (n >= 0 ? '+' : '') + n;
function NumberField({ label, value, onChange, min, placeholder }: { label: string; value?: number; onChange: (v: number | undefined) => void; min?: number; placeholder?: string }) {
    const [draft, setDraft] = useState(value === undefined ? '' : String(value));
    const [editing, setEditing] = useState(false);
    useEffect(() => { if (!editing) setDraft(value === undefined ? '' : String(value)); }, [value, editing]);
    return <label className="quick-number"><span>{label}</span><input type="number" step="1" min={min} value={draft} placeholder={placeholder} onFocus={() => setEditing(true)} onBlur={() => setEditing(false)} onChange={event => {
        const raw = event.target.value; setDraft(raw);
        if (event.target.validity.badInput) return;
        if (raw === '') onChange(undefined);
        else if (Number.isFinite(Number(raw))) onChange(min === undefined ? Math.trunc(Number(raw)) : Math.max(min, Math.trunc(Number(raw))));
    }}/></label>;

}
export function CharacterQuickView({ character: c, updateCharacter: update, onView, onEdit, onBackpack }: { character: CharacterData; updateCharacter: (v: Partial<CharacterData>) => boolean; onView: (v: ResourceSnapshot) => void; onEdit: () => void; onBackpack: () => void }) {
    const catalog = useResourceCatalog(), q = c.quickRecord || {};
    const [allSlotLevels, setAllSlotLevels] = useState(false);
    const write = (patch: Partial<CharacterQuickRecord>) => update({ quickRecord: { ...q, ...patch } });
    const map = (field: keyof CharacterQuickRecord, key: string, value: unknown) => write({ [field]: { ...(q[field] as object || {}), [key]: value } });
    const scores = abilityScores(c, catalog), prof = proficiencyBonus(c), bonus = q.proficiencyOverride ?? prof.calculated ?? 0;
    const sources = abilitySources(c, catalog), grants = skillGrants(c, catalog), fixedSkills = grantedSkills(c, catalog);
    const main = initialClass(c), careers = levels(c), mainLevel = careers.find(row => row.item === main)?.level || 1;
    const mainData = main ? buildData(main, catalog) : {};
    const slots = slotTable(mainData, mainLevel), recommended = mainData.recommendedArray;
    const slotPrefix = main ? resourceKey(main) : 'manual';
    const saveKeys: string[] = Array.isArray(mainData.proficiency) ? mainData.proficiency : [];
    return <div className="character-quick-view">
        <section className="folio-section quick-vitals"><header><h2>{c.name || '角色速览'}</h2><span>{prof.total}级 · {prof.calculated === undefined && q.proficiencyOverride === undefined ? '熟练待填' : '熟练 ' + signed(bonus)}</span></header>
            <div className="quick-vital-fields">{([['currentHp', '生命'], ['hpMax', '生命上限'], ['tempHp', '临时生命']] as const).map(([field, label]) => <NumberField key={field} label={label} min={0} value={c[field]} onChange={value => update({ [field]: value ?? 0 })}/>)}</div>
        </section>
        <section className="folio-section"><header><h2>属性</h2><button type="button" onClick={onEdit}>配置角色</button></header>
            <div className="quick-ability-grid">{scores.map(row => <div className="quick-ability" key={row.key}><span>{row.label}</span><strong>{row.total}</strong><b>{signed(row.modifier)}</b></div>)}</div>
            <details className="quick-settings"><summary>属性填写与来源</summary>
                {recommended?.scores?.length === 6 && <div className="quick-recommendation"><button type="button" onClick={() => { if (window.confirm('用“' + main?.name + '”的推荐标准数列替换六项基础属性？来源加值和手动修正保留。')) update({ abilities: Object.fromEntries(abilities.map(([, field], index) => [field, recommended.scores[index]])) as CharacterData['abilities'] }); }}>采用{main?.name}推荐数列</button><small>{recommended.caption} · {recommended.path}</small></div>}
                <div className="quick-source-switches"><label><input type="checkbox" checked={q.raceAbilityEnabled !== false} onChange={event => write({ raceAbilityEnabled: event.target.checked })}/>种族属性加值</label><label><input type="checkbox" checked={q.backgroundAbilityEnabled !== false} onChange={event => write({ backgroundAbilityEnabled: event.target.checked })}/>背景属性加值</label></div>
                {sources.map(source => <div className="quick-source" key={source.id}><button type="button" className="quick-source-name" onClick={() => onView(source.item)}>{source.item.name} · {source.item.source}</button>
                    {source.options.length > 1 && <div className="choice-chips">{source.options.map((option, index) => { const choice = option.choose; const weights = choice?.weighted?.weights; return <button type="button" key={index} aria-pressed={source.option === index} onClick={() => map('abilityOptions', source.id, index)}>{weights ? weights.map((n: number) => signed(n)).join(' / ') : '方案 ' + (index + 1)}</button>; })}</div>}
                    {!source.plan.supported ? <p>此加值结构未支持，请查阅原文并填写手动修正。</p> : <>
                        {Object.entries(source.plan.fixed).length > 0 && <p>{Object.entries(source.plan.fixed).map(([key, value]) => abilities.find(row => row[0] === key)?.[2] + signed(value)).join('、')}</p>}
                        {source.plan.choices.map(choice => <div className="quick-choice" key={choice.id}><span>选择 {signed(choice.amount)}</span><div className="choice-chips">{choice.from.map(key => <button type="button" key={key} aria-pressed={q.abilitySelections?.[choice.id] === key} onClick={() => { const wasSelected = q.abilitySelections?.[choice.id] === key; const next = { ...q.abilitySelections }; for (const other of source.plan.choices) if (next[other.id] === key) delete next[other.id]; next[choice.id] = wasSelected ? '' : key; write({ abilitySelections: next }); }}>{abilities.find(row => row[0] === key)?.[2]}</button>)}</div></div>)}
                        {source.enabled && source.pending > 0 && <small>尚有 {source.pending} 项待选</small>}
                    </>}
                </div>)}
                {!sources.length && <p>当前条目没有可读取的属性加值；请查阅原文后手动填写。</p>}
                <div className="quick-edit-abilities">{scores.map(row => <fieldset key={row.key}><legend>{row.label}</legend><NumberField label="基础值" value={row.base} min={1} onChange={value => update({ abilities: { ...c.abilities, [row.field]: value ?? 10 } })}/><span>来源加值 {signed(row.granted)}</span><NumberField label="手动修正" value={q.abilityAdjustments?.[row.key]} placeholder="0" onChange={v => map('abilityAdjustments', row.key, v)}/><NumberField label="调整值覆盖" value={q.modifierOverrides?.[row.key]} placeholder={signed(row.calculated)} onChange={v => map('modifierOverrides', row.key, v)}/></fieldset>)}</div>
                <NumberField label="熟练加值覆盖" value={q.proficiencyOverride} min={0} placeholder={prof.calculated === undefined ? '需手填' : signed(prof.calculated)} onChange={v => write({ proficiencyOverride: v })}/>
                <small>最终属性＝基础值＋启用的来源加值＋手动修正。调整值向下取整；覆盖项留空即恢复计算。专长、装备和特性中的特殊加值需手动记录。</small>
            </details>
        </section>
        <section className="folio-section"><h2>技能与豁免</h2>
            <details className="quick-settings"><summary>来源与待选熟练</summary>{grants.map(grant => <div className="quick-source" key={grant.id}><button type="button" onClick={() => onView(grant.item)}>{grant.label}</button>
                {grant.options.length > 1 && <div className="choice-chips">{grant.options.map((_, index) => <button type="button" key={index} aria-pressed={grant.option === index} onClick={() => map('skillOptions', grant.id, index)}>方案 {index + 1}</button>)}</div>}
                {!grant.supported ? <p>此熟练结构未支持，请查阅原文并手动设置。</p> : <>{grant.fixed.length > 0 && <p>{grant.fixed.map(skillLabel).join('、')}</p>}{grant.choices.map(choice => <div key={choice.id}><span>选择 {choice.count} 项 · 已选 {choice.selected.length}</span><div className="choice-chips">{choice.from.map(key => <button type="button" key={key} disabled={!choice.selected.includes(key) && choice.selected.length >= choice.count} aria-pressed={choice.selected.includes(key)} onClick={() => map('skillSelections', choice.id, choice.selected.includes(key) ? choice.selected.filter(value => value !== key) : [...choice.selected, key])}>{skillLabel(key)}</button>)}</div></div>)}</>}
            </div>)}{!grants.length && <p>没有可读取的技能熟练，仍可手动设置。</p>}</details>
            {abilities.map(([key, , label]) => <details className="quick-skill-group" key={key}><summary>{label} · {signed(scores.find(row => row.key === key)!.modifier)}</summary>
                {[[key, label + '豁免', true], ...skills.filter(row => row[2] === key).map(row => [row[0], row[1], false])] .map(([idValue, name, save]) => {
                    const id = String(idValue), rankField = save ? 'saveRanks' : 'skillRanks', overrideField = save ? 'saveOverrides' : 'skillOverrides';
                    const source = save ? saveKeys.includes(id) ? [main?.name || '初始职业'] : [] : fixedSkills[id] || [];
                    const rank = q[rankField]?.[id] ?? (source.length ? 1 : save ? 0 : c.skillMastery?.[id] || 0);
                    const calculated = scores.find(row => row.key === key)!.modifier + bonus * rank;
                    return <div className="quick-skill-row" key={id}><div><strong>{name}</strong>{source.length > 0 && <small>{source.join(' / ')}{source.length > 1 ? ' · 重复熟练不叠加，请核对原文' : ''}</small>}</div><button type="button" aria-label={name + '熟练程度'} onClick={() => map(rankField, id, (rank + 1) % (save ? 2 : 3))}>{rank === 2 ? '专精' : rank === 1 ? '熟练' : '未熟练'}{q[rankField]?.[id] !== undefined ? ' · 手动' : ''}</button><NumberField label="加值" value={q[overrideField]?.[id]} placeholder={signed(calculated)} onChange={v => map(overrideField, id, v)}/>{q[rankField]?.[id] !== undefined && <button type="button" aria-label={name + '恢复来源熟练'} onClick={() => map(rankField, id, undefined)}>↺</button>}</div>;
                })}
            </details>)}
        </section>
        <section className="folio-section"><h2>法术位</h2><p>{main ? main.name + ' · ' + mainLevel + '级' : '尚未选择主职业'}</p>
            {careers.length > 1 && <p className="quick-warning">当前仅读取初始职业表格，不计算兼职施法等级或合并法术位；请核对各职业规则后手动修改。</p>}
            {!slots && <p>未找到主职业的普通法术位矩阵。契约魔法、子职业及其他来源请核对原文并手动记录。</p>}
            <button type="button" aria-pressed={allSlotLevels} onClick={() => setAllSlotLevels(value => !value)}>{allSlotLevels ? '收起空环位' : '编辑全部环位'}</button><div className="quick-slot-grid">{Array.from({ length: 9 }, (_, index) => { const id = slotPrefix + ':' + (index + 1), total = q.slotTotals?.[id] ?? slots?.[index] ?? 0; if (!allSlotLevels && !total && !q.slotUsed?.[id]) return null; return <div className="quick-slot" key={id}><strong>{index + 1}环</strong><NumberField label="总数" min={0} value={q.slotTotals?.[id]} placeholder={String(slots?.[index] ?? 0)} onChange={v => map('slotTotals', id, v)}/><NumberField label="已用" min={0} value={q.slotUsed?.[id] ?? 0} onChange={v => map('slotUsed', id, v ?? 0)}/>{(q.slotUsed?.[id] || 0) > total && <small>已用超过总数，请核对</small>}{q.slotTotals?.[id] !== undefined && <small>手动总数</small>}</div>; })}</div>
        </section>
        <details className="folio-section"><summary>生命骰</summary>{careers.map(({ item, level }) => { const hd = buildData(item, catalog).hd, id = resourceKey(item); return <div className="quick-dice-row" key={id}><span>{item.name} · {level}级{hd?.faces && hd.number === 1 ? ' · ' + level + 'd' + hd.faces : ' · 请查阅生命骰原文'}</span><NumberField label="已用" min={0} value={q.diceUsed?.[id] ?? 0} onChange={v => map('diceUsed', id, v ?? 0)}/>{(q.diceUsed?.[id] || 0) > level && <small>已用超过总数，请核对</small>}</div>; })}</details>
        <section className="quick-equipment"><header><h2>随身装备</h2><button type="button" onClick={onBackpack}>背包</button></header><CharacterEquipment character={c} updateCharacter={update} onView={onView} onBackpack={onBackpack}/></section>
        <CharacterBuildSummary character={c} updateCharacter={update} onView={onView}/>
        <label className="folio-section quick-notes"><span>本场笔记</span><textarea rows={3} value={q.notes || ''} onChange={event => write({ notes: event.target.value })}/></label>
    </div>;
}
