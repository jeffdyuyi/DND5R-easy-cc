import { InventoryPanel } from './InventoryPanel';
import { EquipmentWheel, LongPressEquipment, EquipmentGesture } from './EquipmentWheel';
import { useState } from 'react';
import type { CharacterData, InventoryEntry, ResourceSnapshot } from '../../types';
import { inventoryLots, inventoryCategory, isConsumable, changeCopper, deleteInventoryItem, setInventoryQuantity, equipInventoryItem, isCurrencyItem } from '../../src/character/inventory';
import { resourceKey } from '../../src/content/resourceIdentity';
import { EQUIPMENT_KINDS } from '../../src/content/resourceRegistry';
import { resolveAtom } from '../../src/character/startingEquipment';
import { useResourceCatalog } from '../../hooks/useResourceCatalog';
import { CharacterResourcePicker } from './CharacterResourcePicker';
import { ResourcePreview } from '../ResourcePreview';
import { ItemAttunementToggle } from './ItemAttunementToggle';

const categories = [['weapons', '武器'], ['armors', '护甲'], ['tools', '工具'], ['gears', '冒险物品'], ['consumables', '消耗品'], ['magicItems', '其他魔法物品']] as const;
export function CharacterInventory({ character: c, updateCharacter: update, onSources, onView }: { character: CharacterData; updateCharacter: (v: Partial<CharacterData>) => void; onSources: () => void; onView: (item: ResourceSnapshot) => void }) {
    const [detailKey, setDetailKey] = useState<string | null>(null);
    const [picker, setPicker] = useState<string | null>(null), [message, setMessage] = useState('');
    const catalog = useResourceCatalog();
    const [wheelGesture, setWheelGesture] = useState<EquipmentGesture | undefined>();
    const [wheelKey, setWheelKey] = useState<string | null>(null);
    const sectionOf = (item: ResourceSnapshot) => isConsumable(item, c) ? 'consumables' : inventoryCategory(item);
    const accepts = (item: ResourceSnapshot) => !isCurrencyItem(item) && sectionOf(item) === picker;
    const groups = new Map<string, InventoryEntry[]>();
    for (const lot of inventoryLots(c).filter(lot => lot.quantity > 0 && !isCurrencyItem(lot.item))) {
        const key = resourceKey(lot.item); groups.set(key, [...(groups.get(key) || []), lot]);
    }
    const quantityUpdate = (lot: InventoryEntry, value: number) => setInventoryQuantity(c, lot, value);
    const expand = (lot: InventoryEntry) => {
        const contents = lot.item.inventoryMeta?.packContents;
        if (!Array.isArray(contents) || !lot.quantity) return;
        const rows = contents.map(atom => resolveAtom(atom, lot.item, catalog));
        const errors = rows.filter(row => row.error).map(row => row.error);
        if (errors.length) { setMessage(errors.join('；') + '。整包保留。'); return; }
        if (!window.confirm('将1份“' + lot.item.name + '”展开为包内物品？整包数量减1，内容按原文数量入库。')) return;
        const updates = quantityUpdate(lot, lot.quantity - 1);
        const children: InventoryEntry[] = rows.filter(row => row.item).map(row => ({ id: crypto.randomUUID(), item: structuredClone(row.item!), quantity: row.quantity!, originKey: lot.originKey, originName: lot.originName, containedCopper: row.containedCopper }));
        const expandedCopper = rows.reduce((sum, row) => sum + (row.copper || 0), 0) + (lot.containedCopper || 0);
        const oldGrant = lot.originKey ? c.startingGrants?.[lot.originKey] : undefined;
        update({ ...updates, ...(oldGrant && lot.originKey && expandedCopper ? { startingGrants: { ...c.startingGrants, [lot.originKey]: { ...oldGrant, copper: oldGrant.copper + expandedCopper } } } : {}), ...(expandedCopper ? { pocketCurrency: changeCopper(c, expandedCopper) } : {}), inventoryEntries: [...(updates.inventoryEntries || c.inventoryEntries || []), ...children] });
        setMessage('已展开1份，包内物品沿用原领取来源。');
    };
    const isEquipped = (item: ResourceSnapshot, slot: string) => slot === 'extra'
        ? Object.entries(c.equippedResourceSlots || {}).some(([id, value]) => id.startsWith('extra-') && resourceKey(value) === resourceKey(item))
        : !!c.equippedResourceSlots?.[slot] && resourceKey(c.equippedResourceSlots[slot]) === resourceKey(item);
    const equip = (item: ResourceSnapshot, _lots: InventoryEntry[], slot: string) => {
        const current = c.equippedResourceSlots?.[slot];
        if (current && resourceKey(current) === resourceKey(item) && slot !== 'ring') { const next = { ...c.equippedResourceSlots }; delete next[slot]; update({ equippedResourceSlots: next }); return; }
        if (slot !== 'ring' && current && !window.confirm('替换“' + current.name + '”？原物品仍在库存。')) return;
        const result = equipInventoryItem(c, item, slot); if (result) update(result);
    };
    const wheelLots = wheelKey ? groups.get(wheelKey) : undefined;
    return <div className="character-inventory"><p className="inventory-gesture-hint">长按卡面，滑向部位后松手装备</p>
        {categories.map(([category, title]) => {
            const visible = [...groups.entries()].filter(([, lots]) => sectionOf(lots[0].item) === category);
            return <details className="folio-section inventory-type-section" key={category} open><summary><strong>{title}</strong><small>{visible.length} 项</small><button type="button" aria-label={'添加' + title} onClick={event => { event.preventDefault(); event.stopPropagation(); setPicker(category); }}>＋ 添加</button></summary>
        <div className="inventory-grid">{visible.map(([key, lots]) => {
            const item = lots[0].item, count = lots.reduce((sum, lot) => sum + lot.quantity, 0);
            return <article className="inventory-card" key={key}><LongPressEquipment onHold={gesture => { setWheelGesture(gesture); setWheelKey(key); }}><ResourcePreview item={item} onSelect={() => onView(item)}/></LongPressEquipment><button type="button" className="inventory-remove selected-card-remove" aria-label={'删除库存物品' + item.name} title="从库存删除此物品" onClick={() => { if (window.confirm('从库存删除“' + item.name + '”全部 ' + count + ' 件？此物品的装备与同调标记也会移除。')) update(deleteInventoryItem(c, item)); }}>×</button><div className="inventory-item-controls"><button type="button" onClick={() => setDetailKey(key)}>×{count} · 管理</button></div>
                {detailKey === key && <InventoryPanel title={item.name} onClose={() => setDetailKey(null)}><ItemAttunementToggle character={c} item={item} updateCharacter={update}/>

                <details><summary>数量与来源</summary>{lots.map(lot => <label key={lot.id}><span>{lot.originName || '手动添加'}{lot.item.name !== item.name ? ' · ' + lot.item.name : ''}{lot.containedCopper !== undefined ? ' · 内含' + lot.containedCopper / 100 + ' GP' : ''}</span><input type="number" min="0" aria-label={item.name + '数量'} value={lot.quantity} onChange={event => update(quantityUpdate(lot, Math.max(0, Math.trunc(Number(event.target.value) || 0))))}/></label>)}
                    <label><input type="checkbox" checked={isConsumable(item, c)} onChange={event => update({ manualConsumables: { ...c.manualConsumables, [key]: event.target.checked } })}/>消耗品标记</label>
                </details>
                {Array.isArray(item.inventoryMeta?.packContents) && <details><summary>包内物品</summary><ul>{item.inventoryMeta.packContents.map((atom: any, index: number) => { const row = resolveAtom(atom, item, catalog); return <li key={index}>{row.item ? row.item.name + ' ×' + row.quantity : row.copper !== undefined ? row.copper / 100 + ' GP' : row.error}</li>; })}</ul>{lots.map(lot => <button type="button" key={lot.id} onClick={() => expand(lot)}>展开1份 · {lot.originName || '手动添加'}</button>)}</details>}
                </InventoryPanel>}
            </article>;
        })}</div>
        {!visible.length && <p className="inventory-empty">尚无{title}</p>}</details>;
        })}{message && <p role="status">{message}</p>}
        {wheelLots?.length ? <EquipmentWheel gesture={wheelGesture} onInvalid={setMessage} item={wheelLots[0].item} isEquipped={slot => isEquipped(wheelLots[0].item, slot)} onSelect={slot => equip(wheelLots[0].item, wheelLots, slot)} onClose={() => setWheelKey(null)}/> : null}
        {picker && <CharacterResourcePicker initialOpen hideSelected fixedCategory allowRepeat selectionTitle={categories.find(([id]) => id === picker)?.[1]} character={c} updateCharacter={update} kinds={EQUIPMENT_KINDS} filterCandidate={accepts} onDismiss={() => setPicker(null)} onManageSources={onSources} onChoose={(item, updates = {}) => {
            const key = resourceKey(item), old = (c.resourceCards || []).some(card => resourceKey(card) === key);
            update({ ...updates, resourceCardSettings: { ...c.resourceCardSettings, [key]: { ...c.resourceCardSettings?.[key], quantity: (old ? c.resourceCardSettings?.[key]?.quantity ?? 1 : 0) + 1 } } });
        }}/>}
    </div>;
}
