import { slotUsage, toggleSlot, setSlotUsage } from '../../src/character/slotTracking';
import { QuickRecordDialog } from './QuickRecordDialog';
import { useEffect, useState } from 'react';
import type { CharacterData, CharacterQuickRecord, ResourceSnapshot } from '../../types';
import { useResourceCatalog } from '../../hooks/useResourceCatalog';
import { abilities, skills, skillLabel, abilityScores, abilitySources, skillGrants, grantedSkills, proficiencyBonus, buildData, levels, slotTable } from '../../src/character/quickRecord';
import { initialClass } from '../../src/character/inventory';
import { resourceKey } from '../../src/content/resourceIdentity';
import { CharacterBuildSummary } from './CharacterBuildSummary';

type QuickEditor = { type: 'ability'; id: string } | { type: 'skill'; id: string; ability: string; name: string; save: boolean } | { type: 'sources' | 'skills' | 'slots' };
const signed = (n: number) => (n >= 0 ? '+' : '') + n;
function NumberField({ label, value, onChange, min, placeholder }: { label: string; value?: number; onChange: (v: number | undefined) => void; min?: number; placeholder?: string }) {
    const [draft, setDraft] = useState(value === undefined ? '' : String(value));
    const [editing, setEditing] = useState(false);
    useEffect(() => { if (!editing) setDraft(value === undefined ? '' : String(value)); }, [value, editing]);
    return <label className="quick-number"><span>{label}</span><input type="number" step="1" min={min} value={draft} placeholder={placeholder} onFocus={() => setEditing(true)} onBlur={() => setEditing(false)} onChange={event => {
        const raw = event.target.value; setDraft(raw);
        if (event.target.validity.badInput) return;
        if (raw === '') onChange(undefined);
        else if (Number.isSafeInteger(Math.trunc(Number(raw)))) onChange(min === undefined ? Math.trunc(Number(raw)) : Math.max(min, Math.trunc(Number(raw))));
    }}/></label>;

}
export function CharacterQuickView({ character: c, updateCharacter: update, onView }: { character: CharacterData; updateCharacter: (v: Partial<CharacterData>) => boolean; onView: (v: ResourceSnapshot) => void }) {
    const catalog = useResourceCatalog(), q = c.quickRecord || {};
    const [editor, setEditor] = useState<QuickEditor | null>(null);
    const write = (patch: Partial<CharacterQuickRecord>) => update({ quickRecord: { ...q, ...patch } });
    const map = (field: keyof CharacterQuickRecord, key: string, value: unknown) => write({ [field]: { ...(q[field] as object || {}), [key]: value } });
    const scores = abilityScores(c, catalog), prof = proficiencyBonus(c), bonus = q.proficiencyOverride ?? prof.calculated ?? 0;
    const sources = abilitySources(c, catalog), grants = skillGrants(c, catalog), fixedSkills = grantedSkills(c, catalog);
    const main = initialClass(c), careers = levels(c), mainLevel = careers.find(row => row.item === main)?.level || 1;
    const mainData = main ? buildData(main, catalog) : {};
    const slots = slotTable(mainData, mainLevel), recommended = mainData.recommendedArray;
    const slotPrefix = main ? resourceKey(main) : 'manual';
    const saveKeys: string[] = Array.isArray(mainData.proficiency) ? mainData.proficiency : [];
    const editingScore = editor?.type === 'ability' ? scores.find(row => row.key === editor.id) : undefined;
    const editingSkill = editor?.type === 'skill' ? (() => {
        const rankField: 'saveRanks' | 'skillRanks' = editor.save ? 'saveRanks' : 'skillRanks';
        const overrideField: 'saveOverrides' | 'skillOverrides' = editor.save ? 'saveOverrides' : 'skillOverrides';
        const source = editor.save ? saveKeys.includes(editor.id) ? [main?.name || '初始职业'] : [] : fixedSkills[editor.id] || [];
        const rank = q[rankField]?.[editor.id] ?? (source.length ? 1 : editor.save ? 0 : c.skillMastery?.[editor.id] || 0);
        const modifier = scores.find(row => row.key === editor.ability)!.modifier;
        return { ...editor, source, rankField, overrideField, rank, modifier, calculated: modifier + bonus * rank };
    })() : undefined;
    return <div className="character-quick-view">
        <section className="folio-section quick-vitals"><header><h2>{c.name || '角色速览'}</h2><span>{prof.total}级 · {prof.calculated === undefined && q.proficiencyOverride === undefined ? '熟练待填' : '熟练 ' + signed(bonus)}</span></header>
            <div className="quick-vital-fields">{([['currentHp', '生命'], ['hpMax', '生命上限'], ['tempHp', '临时生命']] as const).map(([field, label]) => <NumberField key={field} label={label} min={0} value={c[field]} onChange={value => update({ [field]: value ?? 0 })}/>)}</div>
        <div className="quick-hit-dice"><h3>生命骰</h3>{careers.map(({ item, level }) => { const hd = buildData(item, catalog).hd, id = resourceKey(item); return <div className="quick-dice-row" key={id}><span>{item.name} · {level}级{hd?.faces && hd.number === 1 ? ' · ' + level + 'd' + hd.faces : ' · 请查阅生命骰原文'}</span><NumberField label="已用" min={0} value={q.diceUsed?.[id] ?? 0} onChange={v => map('diceUsed', id, v ?? 0)}/>{(q.diceUsed?.[id] || 0) > level && <small>已用超过总数，请核对</small>}</div>; })}</div>
        </section>
        <section className="folio-section"><header><h2>属性与技能</h2><div className="quick-inline-actions"><button type="button" onClick={() => setEditor({ type: 'sources' })}>加值来源</button><button type="button" onClick={() => setEditor({ type: 'skills' })}>熟练选择</button></div></header><small className="quick-rank-legend">○ 未熟练 · ● 熟练 · ◆ 专精</small>

            <div className="quick-attribute-grid">
            {abilities.map(([key, , label]) => <article className="quick-attribute-group" key={key}><header><h3>{label}</h3><button type="button" className="quick-ability-value" aria-label={'编辑' + label + '属性'} onClick={() => setEditor({ type: 'ability', id: key })}><strong>{scores.find(row => row.key === key)!.total}</strong><b>{signed(scores.find(row => row.key === key)!.modifier)}</b></button></header>
                {[[key, '豁免', true], ...skills.filter(row => row[2] === key).map(row => [row[0], row[1], false])] .map(([idValue, name, save]) => {
                    const id = String(idValue), rankField = save ? 'saveRanks' : 'skillRanks', overrideField = save ? 'saveOverrides' : 'skillOverrides';
                    const source = save ? saveKeys.includes(id) ? [main?.name || '初始职业'] : [] : fixedSkills[id] || [];
                    const rank = q[rankField]?.[id] ?? (source.length ? 1 : save ? 0 : c.skillMastery?.[id] || 0);
                    const calculated = scores.find(row => row.key === key)!.modifier + bonus * rank;
                    return <div className="quick-skill-row" key={id}><button type="button" className="quick-skill-name" onClick={() => setEditor({ type: 'skill', id, ability: key, name: label + String(name), save: !!save })}>{name}</button><button type="button" className="quick-rank-toggle" data-manual={q[rankField]?.[id] !== undefined || undefined} aria-label={label + name + '：' + (rank === 2 ? '专精' : rank === 1 ? '熟练' : '未熟练') + '，点击切换'} title={rank === 2 ? '专精' : rank === 1 ? '熟练' : '未熟练'} onClick={() => map(rankField, id, (rank + 1) % (save ? 2 : 3))}>{rank === 2 ? '◆' : rank === 1 ? '●' : '○'}</button><button type="button" className="quick-skill-value" data-manual={q[overrideField]?.[id] !== undefined || undefined} aria-label={'编辑' + label + name + '加值'} onClick={() => setEditor({ type: 'skill', id, ability: key, name: label + String(name), save: !!save })}>{signed(q[overrideField]?.[id] ?? calculated)}</button></div>;

                })}
            </article>)}
            </div>


        </section>
        <section className="folio-section"><header><h2>法术位</h2><button type="button" onClick={() => setEditor({ type: 'slots' })}>配置</button></header><small className="quick-slot-legend">亮圆可用 · 暗圆已消耗，点击切换</small><p>{main ? main.name + ' · ' + mainLevel + '级' : '尚未选择主职业'}</p>
            {careers.length > 1 && <p className="quick-warning">当前仅读取初始职业表格，不计算兼职施法等级或合并法术位；请核对各职业规则后手动修改。</p>}
            {!slots && <p>未找到主职业的普通法术位矩阵。契约魔法、子职业及其他来源请核对原文并手动记录。</p>}
            <div className="quick-slot-rows">{Array.from({ length: 9 }, (_, index) => {
                const id = slotPrefix + ':' + (index + 1), total = q.slotTotals?.[id] ?? slots?.[index] ?? 0, usage = slotUsage(q, id, total);
                if (!total && !usage.used) return null;
                return <div className="quick-slot-row" key={id}><strong>{index + 1}环</strong><div className="slot-pips" role="group" aria-label={index + 1 + '环法术位'}>{usage.marks.slice(0, Math.min(usage.total, 20)).map((spent, position) => <button type="button" className="slot-pip" key={position} aria-pressed={spent} aria-label={index + 1 + '环，第' + (position + 1) + '个法术位，' + (spent ? '已消耗，点击恢复' : '可用，点击消耗')} onClick={() => write(toggleSlot(q, id, total, position))}/>)}</div><small>{usage.used} / {total}</small>{(total > 20 || usage.used > total) && <button type="button" className="quick-slot-warning" onClick={() => setEditor({ type: 'slots' })}>{usage.used > total ? '消耗超过总数，点此核对' : '其余法术位在配置中记录'}</button>}</div>;
            })}</div>

        </section>


        <CharacterBuildSummary character={c} updateCharacter={update} onView={onView}/>
        <label className="folio-section quick-notes"><span>本场笔记</span><textarea rows={3} value={q.notes || ''} onChange={event => write({ notes: event.target.value })}/></label>
        {editor && <QuickRecordDialog title={editingScore ? editingScore.label : editingSkill ? editingSkill.name : editor.type === 'sources' ? '属性加值来源' : editor.type === 'skills' ? '技能熟练选择' : '法术位配置'} onClose={() => setEditor(null)}>
            {editingScore && <><div className="quick-dialog-fields"><NumberField label="基础值" min={1} value={editingScore.base} onChange={value => update({ abilities: { ...c.abilities, [editingScore.field]: value ?? 10 } })}/><NumberField label="手动修正" value={q.abilityAdjustments?.[editingScore.key]} placeholder="0" onChange={value => map('abilityAdjustments', editingScore.key, value)}/></div><p className="quick-calculation">{editingScore.base} ＋ 来源 {signed(editingScore.granted)} ＋ 手动 {signed(editingScore.adjustment)} ＝ {editingScore.total} · 调整值 {signed(editingScore.modifier)}</p><details><summary>调整值覆盖</summary><NumberField label="手填调整值，留空恢复计算" value={q.modifierOverrides?.[editingScore.key]} placeholder={signed(editingScore.calculated)} onChange={value => map('modifierOverrides', editingScore.key, value)}/></details></>}
            {editingSkill && <><div className="choice-chips">{Array.from({ length: editingSkill.save ? 2 : 3 }, (_, rank) => <button type="button" key={rank} aria-pressed={editingSkill.rank === rank} onClick={() => map(editingSkill.rankField, editingSkill.id, rank)}>{rank === 0 ? '未熟练' : rank === 1 ? '熟练' : '专精'}</button>)}</div><p className="quick-calculation">属性 {signed(editingSkill.modifier)} ＋ 熟练 {signed(bonus)} × {editingSkill.rank} ＝ {signed(editingSkill.calculated)}</p><NumberField label="加值覆盖，留空使用计算结果" value={q[editingSkill.overrideField]?.[editingSkill.id]} placeholder={signed(editingSkill.calculated)} onChange={value => map(editingSkill.overrideField, editingSkill.id, value)}/><button type="button" onClick={() => write({ [editingSkill.rankField]: { ...q[editingSkill.rankField], [editingSkill.id]: undefined }, [editingSkill.overrideField]: { ...q[editingSkill.overrideField], [editingSkill.id]: undefined } })}>恢复来源与计算</button>{editingSkill.source.length > 0 && <p>来源：{editingSkill.source.join(' / ')}{editingSkill.source.length > 1 ? '；重复熟练不叠加，请核对原文。' : ''}</p>}</>}
            {editor.type === 'sources' && <div className="quick-dialog-sources">
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
                <NumberField label="熟练加值覆盖" value={q.proficiencyOverride} min={0} placeholder={prof.calculated === undefined ? '需手填' : signed(prof.calculated)} onChange={v => write({ proficiencyOverride: v })}/>
                <small>最终属性＝基础值＋启用的来源加值＋手动修正。调整值向下取整；覆盖项留空即恢复计算。专长、装备和特性中的特殊加值需手动记录。</small>
            </div>}
            {editor.type === 'skills' && <div className="quick-dialog-sources">{grants.map(grant => <div className="quick-source" key={grant.id}><button type="button" onClick={() => onView(grant.item)}>{grant.label}</button>
                {grant.options.length > 1 && <div className="choice-chips">{grant.options.map((_, index) => <button type="button" key={index} aria-pressed={grant.option === index} onClick={() => map('skillOptions', grant.id, index)}>方案 {index + 1}</button>)}</div>}
                {!grant.supported ? <p>此熟练结构未支持，请查阅原文并手动设置。</p> : <>{grant.fixed.length > 0 && <p>{grant.fixed.map(skillLabel).join('、')}</p>}{grant.choices.map(choice => <div key={choice.id}><span>选择 {choice.count} 项 · 已选 {choice.selected.length}</span><div className="choice-chips">{choice.from.map(key => <button type="button" key={key} disabled={!choice.selected.includes(key) && choice.selected.length >= choice.count} aria-pressed={choice.selected.includes(key)} onClick={() => map('skillSelections', choice.id, choice.selected.includes(key) ? choice.selected.filter(value => value !== key) : [...choice.selected, key])}>{skillLabel(key)}</button>)}</div></div>)}</>}
            </div>)}{!grants.length && <p>没有可读取的技能熟练，仍可手动设置。</p>}</div>}
            {editor.type === 'slots' && <div className="quick-slot-settings">{Array.from({ length: 9 }, (_, index) => { const id = slotPrefix + ':' + (index + 1), total = q.slotTotals?.[id] ?? slots?.[index] ?? 0, usage = slotUsage(q, id, total); return <fieldset key={id}><legend>{index + 1}环</legend><div className="quick-dialog-fields"><NumberField label="总数" min={0} value={q.slotTotals?.[id]} placeholder={String(slots?.[index] ?? 0)} onChange={value => map('slotTotals', id, value === undefined ? undefined : Math.min(10000, value))}/><NumberField label="已用" min={0} value={usage.used} onChange={value => write(setSlotUsage(q, id, value ?? 0))}/></div>{usage.used > total && <small>已用超过总数；原记录保留，请手动核对。</small>}</fieldset>; })}</div>}
        </QuickRecordDialog>}
    </div>;
}
