import { useState } from 'react';
import type { CharacterData, ResourceSnapshot } from '../../types';
import { useResourceCatalog } from '../../hooks/useResourceCatalog';
import { sourceLabel } from '../../src/content/sourceNames';
import { resourceKey } from '../../src/content/resourceIdentity';
import { buildSources, clearStartingGrants, grantRemovalMessage } from '../../src/character/inventory';
import { equipmentGroups, equipmentCandidates, resolveAtom, receiveEquipment, EquipmentAtom, equipmentTypeNames } from '../../src/character/startingEquipment';
import { RichText } from '../RichText';
import { SnapshotUpdate } from '../SnapshotUpdate';
import { refreshCharacterSnapshot } from '../../src/character/resources';

function EquipmentSource({ c, source, update, onView }: { c: CharacterData; source: ResourceSnapshot; update: (v: Partial<CharacterData>) => boolean; onView: (item: ResourceSnapshot) => void }) {
    const catalog = useResourceCatalog();
    const [choices, setChoices] = useState<Record<string, string>>({});
    const [message, setMessage] = useState('');
    const [goldMode, setGoldMode] = useState(false), [goldAmount, setGoldAmount] = useState('');
    const groups = equipmentGroups(source), key = resourceKey(source), receipt = c.startingGrants?.[key];
    const rows = groups.flatMap((group, groupIndex) => {
        const selected = choices[String(groupIndex)];
        return [...(group._ || []), ...(selected && selected !== '_' ? group[selected] || [] : [])].flatMap((atom, atomIndex) => {
            if (atom && typeof atom === 'object' && (atom.equipmentType || atom.equipmentTypes) && Number.isInteger(atom.quantity) && atom.quantity > 1 && atom.quantity <= 100) return Array.from({ length: atom.quantity }, (_, unit) => ({ atom: { ...atom, quantity: 1 }, id: groupIndex + ':' + atomIndex + ':' + unit }));
            return [{ atom, id: groupIndex + ':' + atomIndex }];
        });
    });
    const goldAlternative = source.buildData?.goldAlternativeText || source.buildData?.startingEquipment?.goldAlternative;
    const activeRows = goldMode ? [{ atom: { value: Math.round(Number(goldAmount) * 100) } as EquipmentAtom, id: 'gold' }] : rows;
    const resolved = activeRows.map(row => resolveAtom(row.atom, source, catalog, choices[row.id]));
    const complete = groups.length > 0 && groups.every((group, index) => Object.keys(group).filter(k => k !== '_').length === 0 || !!choices[String(index)]) && resolved.every(row => !row.error);
    const select = (id: string, value: string) => setChoices(old => ({ ...old, [id]: value }));
    const describe = (atom: EquipmentAtom) => {
        const result = resolveAtom(atom, source, catalog);
        if (result.item) return result.item.name + ' ×' + result.quantity + ' · ' + sourceLabel(result.item);
        if (result.copper !== undefined) return result.copper / 100 + ' GP';
        const raw = typeof atom === 'string' ? { item: atom } : atom;
        return raw.equipmentType ? (equipmentTypeNames[raw.equipmentType] || raw.equipmentType) + ' ×' + (raw.quantity || 1) : result.error;
    };
    return <details className="starting-source" open={!receipt}><summary>{source.name}<small>{receipt ? '已领取' : '待选择'}</small></summary>
        {receipt ? <><p>已加入背包。物品数量可在库存调整；更换或移除此来源时会提示清除物品，钱币由你手动核对。</p><button type="button" onClick={() => { if (window.confirm(grantRemovalMessage(c, [key]))) { if (update(clearStartingGrants(c, [key]))) setChoices({}); } }}>清除并重新选择</button></> : <>
            {!source.buildData && <><p>此快照缺少建卡结构，请更新卡片后再选择装备。</p><SnapshotUpdate item={source} onUpdate={next => update(refreshCharacterSnapshot(c, next))}/></>}
            {source.buildData?.equipmentDescription && <details><summary>原始装备说明</summary><RichText text={source.buildData.equipmentDescription}/></details>}
            {!groups.length && <p>当前资料没有可解析的起始装备方案；请查阅条目并手动添加，不从文字猜测物品。</p>}
            {goldAlternative && <><div className="inventory-tabs"><button type="button" aria-pressed={!goldMode} onClick={() => setGoldMode(false)}>装备方案</button><button type="button" aria-pressed={goldMode} onClick={() => setGoldMode(true)}>原文金币替代</button></div>{goldMode && <div><RichText text={String(goldAlternative)}/><label>按原文确定金额后填写 GP<input type="number" min="0" step="0.01" value={goldAmount} onChange={event => setGoldAmount(event.target.value)}/></label></div>}</>}
            {!goldMode && groups.map((group, index) => <fieldset key={index}><legend>装备组 {index + 1}</legend>
                {group._?.length > 0 && <p>{group._.map(describe).join('；')}</p>}
                <div className="starting-options">{Object.entries(group).filter(([id]) => id !== '_').map(([id, atoms]) => <button type="button" aria-pressed={choices[String(index)] === id} key={id} onClick={() => { setChoices(old => ({ ...Object.fromEntries(Object.entries(old).filter(([k]) => !k.startsWith(index + ':'))), [String(index)]: id })); }}><strong>方案 {id}</strong><span>{Array.isArray(atoms) ? atoms.map(describe).join('；') : '未支持的选项结构'}</span></button>)}</div>
            </fieldset>)}
            {!goldMode && rows.map(({ atom, id }, index) => {
                const raw = typeof atom === 'string' ? { item: atom } : atom;
                const candidates = raw.equipmentType || raw.equipmentTypes ? equipmentCandidates(raw, source, c, catalog) : [];
                const result = resolved[index];
                return <div className="starting-preview" key={id}>{raw.equipmentType || raw.equipmentTypes ? <details><summary>{result.item?.name || '选择' + (equipmentTypeNames[raw.equipmentType] || '物品')} ×{raw.quantity || 1}</summary><div className="starting-options">{candidates.map(item => <button key={resourceKey(item)} type="button" aria-pressed={choices[id] === resourceKey(item)} onClick={() => select(id, resourceKey(item))}>{item.name} · {item.source}</button>)}</div>{!candidates.length && <p>当前允许来源中没有符合此明确类型的物品。</p>}</details> : result.item ? <button className="starting-item-link" type="button" onClick={() => onView(result.item!)}>{describe(atom)}</button> : <span>{describe(atom)}</span>}{result.error && <small role="status">{result.error}</small>}{result.containedCopper !== undefined && <small>物品内含 {result.containedCopper / 100} GP（随物品记录）</small>}</div>;
            })}
            <button type="button" disabled={goldMode ? !goldAmount.trim() || !Number.isFinite(Number(goldAmount)) || Number(goldAmount) < 0 : !complete} onClick={() => {
                const result = receiveEquipment(c, source, activeRows.map(row => ({ atom: row.atom, choice: choices[row.id] })), { ...choices, ...(goldMode ? { mode: 'gold', goldAmount } : {}) }, catalog);
                if (result) { if (update(result)) setMessage('已加入背包。'); }
                else setMessage('尚未完成选择，或此来源已经领取。');
            }}>确认加入背包</button>
            {message && <p role="status">{message}</p>}
        </>}
    </details>;
}

export function StartingEquipment({ character, updateCharacter, onView }: { character: CharacterData; updateCharacter: (v: Partial<CharacterData>) => boolean; onView: (item: ResourceSnapshot) => void }) {
    return <section className="folio-section starting-equipment"><h2>起始装备</h2>{buildSources(character).map(source => <EquipmentSource key={resourceKey(source)} c={character} source={source} update={updateCharacter} onView={onView}/>)}{!buildSources(character).length && <p>先选择初始职业和背景。</p>}</section>;
}
