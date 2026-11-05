import { EquipmentWheel, LongPressEquipment, EquipmentGesture } from './EquipmentWheel';
import { ResourcePreview } from '../ResourcePreview';
import { itemIsAttuned } from '../../src/character/resources';
import { resourceKey } from '../../src/content/resourceIdentity';
import { inventoryLots, itemInstances, equipInventoryItem } from '../../src/character/inventory';
import { PortraitPlaceholder } from './CharacterPortrait';
import { canOccupySlot, equipmentCandidate, placementHint } from '../../src/character/equipmentSelection';
import { useState } from 'react';
import { ItemAttunementToggle } from './ItemAttunementToggle';
import { CharacterData } from '../../types';
import { InventoryPanel } from './InventoryPanel';
import { PixelGlyph } from '../common/PixelGlyph';
const base = [['head', '头部', 'magicItems'], ['cloak', '披风 / 斗篷', 'magicItems'], ['armor', '护甲', 'armors'], ['gloves', '手套', 'gears'], ['boots', '鞋子', 'gears'], ['main', '主手', 'weapons'], ['off', '副手', 'armors'], ['ring', '戒指', 'magicItems'], ['necklace', '项链', 'magicItems'], ['amulet', '护符', 'magicItems']] as const;
export function CharacterEquipment({ character: c, updateCharacter: update, onView, onBackpack }: {
    character: CharacterData;
    updateCharacter: (v: Partial<CharacterData>) => boolean | void;
    onView: (item: any) => void;
    onBackpack: () => void;
}) {
    const [target, setTarget] = useState<{
        id: string;
        newSlot?: boolean;
    } | null>(null);
    const [wheel, setWheel] = useState<{ id: string; item: any; gesture?: EquipmentGesture } | null>(null);
    const [message, setMessage] = useState(''), [manual, setManual] = useState(false);
    const definitions = c.extraEquipmentSlots || [];
    const equipped = c.equippedResourceSlots || {};
    const extras = [...definitions, ...Object.entries(equipped).filter(([id]) => !base.some(row => row[0] === id) && !definitions.some(row => row.id === id)).map(([id, item]) => ({ id, label: item.name }))];
    const attunedCount = itemInstances(c).filter(item => itemIsAttuned(c, item)).length;
    const openSlot = (id: string, newSlot = false) => { setManual(false); setTarget({ id, newSlot }); };
    const choose = (item: any) => {
        if (!target || !canOccupySlot(item, target.id) || !inventoryLots(c).some(lot => lot.id === item.inventoryEntryId && lot.quantity > 0 && resourceKey(lot.item) === resourceKey(item))) return;
        const result = equipInventoryItem(c, item, target.id);
        if (!result) return;
        if (update({ ...result, ...(target.newSlot ? { extraEquipmentSlots: [...definitions, { id: target.id, label: item.name }] } : {}) }) === false) return;
        setTarget(null);
    };
    const clearSlot = (id: string) => { const next = { ...equipped }; delete next[id]; update({ equippedResourceSlots: next }); };
    const moveEquipped = (slot: string) => {
        if (!wheel || !canOccupySlot(wheel.item, slot)) return;
        if (slot === wheel.id) { clearSlot(wheel.id); return; }
        if (slot !== 'ring' && equipped[slot] && !window.confirm('替换“' + equipped[slot].name + '”？原物品仍在库存。')) return;
        const result = equipInventoryItem(c, wheel.item, slot); if (result) update(result);
    };
    const button = (id: string, label: string, icon: string, index?: number) => {
        const item = id === 'ring' ? undefined : equipped[id];
        const face = <button type="button" className="equipment-slot" onClick={() => item ? onView(item) : openSlot(id)}>{item ? <><strong className="equipment-item-name">{item.name}</strong><span className="equipment-position-label">{label}{!canOccupySlot(item, id) ? ' · 历史位置，请核对' : item.equipmentPlacement === 'name-suggestion' ? ' · 名称建议' : item.equipmentPlacement === 'manual' ? ' · 手动选择' : ''}</span></> : <><PixelGlyph kind={icon}/><strong>{label}</strong><span>{id === 'ring' && rings.length ? rings.length + ' 件 · ＋' : '＋'}</span></>}</button>;
        return <div className={'equipment-slot-frame' + (item ? ' has-item' : '') + (index !== undefined ? ' slot-' + index : '')} key={id}>
            {item ? <LongPressEquipment onHold={gesture => setWheel({ id, item, gesture })}>{face}</LongPressEquipment> : face}
            {item && <button type="button" className="equipment-remove" aria-label={'卸下' + item.name} onClick={() => clearSlot(id)}>×</button>}
            {item && <ItemAttunementToggle character={c} item={item} updateCharacter={update}/>}
        </div>;
    };
    const shownExtras = extras.filter(entry => equipped[entry.id] && !entry.id.startsWith('ring-'));
    const rings = Object.entries(equipped).filter(([id]) => id === 'ring' || id.startsWith('ring-')); 
    return <><section className="folio-section"><div className="attunement-count" aria-live="polite">已同调 <strong>{attunedCount}</strong> 件</div><div className="paperdoll"><div className="paperdoll-portrait">{c.characterPortraitDataUrl || c.avatarDataUrl ? <img src={c.characterPortraitDataUrl || c.avatarDataUrl} alt={c.name + '的角色形象'}/> : <div className="portrait-placeholder"><PortraitPlaceholder/></div>}</div>{base.map(([id, label, icon], i) => button(id, label, icon, i))}</div></section>
 {rings.length > 0 && <section className="folio-section"><header><h2>戒指</h2><span>{rings.length} 件</span></header><div className="extra-item-cards">{rings.map(([id, item]) => <article className="extra-item-card" key={id}><LongPressEquipment onHold={gesture => setWheel({ id, item, gesture })}><ResourcePreview item={item} onSelect={() => onView(item)}/></LongPressEquipment><button type="button" className="selected-card-remove" aria-label={'卸下' + item.name} onClick={() => clearSlot(id)}>×</button><ItemAttunementToggle character={c} item={item} updateCharacter={update}/></article>)}</div></section>}
 <section className="folio-section"><header><h2>额外物品</h2><span>{shownExtras.length} 件</span></header>
    <div className="extra-item-cards">{shownExtras.map(entry => { const item = equipped[entry.id]; return <article className="extra-item-card" key={entry.id}>
        <LongPressEquipment onHold={gesture => setWheel({ id: entry.id, item, gesture })}><ResourcePreview item={item} onSelect={() => onView(item)}/></LongPressEquipment>
        <button type="button" className="selected-card-remove" aria-label={'卸下' + item.name} onClick={() => clearSlot(entry.id)}>×</button>
        <ItemAttunementToggle character={c} item={item} updateCharacter={update}/>
    </article>; })}<button type="button" className="extra-item-add" onClick={() => openSlot('extra-' + crypto.randomUUID(), true)}><span>＋</span>添加物品</button></div>
 </section>
 {message && <p role="status">{message}</p>}
 {wheel && <EquipmentWheel item={wheel.item} gesture={wheel.gesture} isEquipped={slot => slot === wheel.id} onSelect={moveEquipped} onClose={() => setWheel(null)} onInvalid={setMessage}/>}
 {target && <InventoryPanel title={'从背包装备 · ' + (base.find(row => row[0] === target.id)?.[1] || '额外物品')} onClose={() => setTarget(null)}>
    {['head','cloak','gloves','boots','necklace','amulet'].includes(target.id) && <label className="equipment-manual-choice"><input type="checkbox" checked={manual} onChange={event => setManual(event.target.checked)}/>手动挑选其他奇物（不放宽专用部位）</label>}
    <div className="builder-resource-grid">{inventoryLots(c).filter(lot => lot.quantity > 0 && equipmentCandidate(lot.item, target.id, manual)).map(lot => <div key={lot.id}><ResourcePreview item={lot.item} onSelect={() => choose({ ...lot.item, inventoryEntryId: lot.id })}/><small>×{lot.quantity}{placementHint(lot.item, target.id) ? ' · ' + placementHint(lot.item, target.id) : ''}</small></div>)}</div>
    {!inventoryLots(c).some(lot => lot.quantity > 0 && equipmentCandidate(lot.item, target.id, manual)) && <p>背包中没有适合此部位的物品。</p>}
    <button type="button" onClick={() => { setTarget(null); onBackpack(); }}>前往背包</button>
 </InventoryPanel>}

 </>;
}
