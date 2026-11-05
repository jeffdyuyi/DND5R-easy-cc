import { itemIsAttuned } from '../../src/character/resources';
import { CharacterData } from '../../types';
import { itemInstances, pruneItemState } from '../../src/character/inventory';
import { resourceKey } from '../../src/content/resourceIdentity';
export function ItemAttunementToggle({ character, item, updateCharacter }: {
    character: CharacterData;
    item: any;
    updateCharacter: (v: Partial<CharacterData>) => boolean;
}) {
    const instances = item.inventoryInstanceId ? [item] : itemInstances(character, item);
    const active = itemIsAttuned(character, item);

    const meta = item.inventoryMeta?.attunement;
    const requirement = meta?.requirement || item.attunementRequirement || item.fields?.attunementRequirement || '';
    const knownRequired = meta ? ['required', 'optional'].includes(meta.mode) : !!requirement && !/^(无需|不需|无$|否$)/.test(requirement);
    // Preserve an old manual flag as a removable record; never silently erase it.
    if (!knownRequired && !active) return null;
    if (!item.inventoryInstanceId && instances.length > 1) return <details className="item-instance-attunement"><summary>同调 {instances.filter(instance => itemIsAttuned(character, instance)).length}/{instances.length}</summary>{instances.map((instance, index) => <div key={instance.inventoryInstanceId}><small>第{index + 1}件</small><ItemAttunementToggle character={character} item={instance} updateCharacter={updateCharacter}/></div>)}</details>;
    const legacy = !knownRequired;
    const label = legacy ? '清除旧同调标记' : active ? '已同调' : '未同调';
    return <button type="button" className="item-attunement-toggle" aria-pressed={active}
        aria-label={item.name + '：' + label + (legacy ? '' : active ? '，点击取消' : '，点击标记已同调')}
        title={legacy ? '此快照无明确同调要求，保留的旧标记可手动清除' : (requirement || '需同调') + '；仅记录状态，不判断是否满足条件'}
        onClick={() => { const id = item.inventoryInstanceId || instances[0]?.inventoryInstanceId; updateCharacter(id ? { itemAttunement: { ...pruneItemState(character).itemAttunement, [id]: !active }, resourceAttunement: { ...character.resourceAttunement, [resourceKey(item)]: false } } : { resourceAttunement: { ...character.resourceAttunement, [resourceKey(item)]: false } }); }}><span aria-hidden="true">{active ? '✓' : '○'}</span><span>{label}</span></button>;
}
