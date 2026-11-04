import type { CharacterData } from '../../types';
import { RichText } from '../RichText';
/** Read-only compatibility view; unknown saved fields remain in storage/export. */
export function LegacyCharacterRecords({ character }: {
    character: CharacterData;
}) {
    const inventories = [['武器', character.inventoryWeapons], ['护甲', character.inventoryArmor], ['物品', character.inventoryGear], ['工具', character.tools]] as const;
    return <details className="folio-legacy"><summary>旧存档补充记录</summary><p>旧记录按原内容保留，与已选资源卡分别查看。</p>
 <dl>{[['职业', character.className], ['子职业', character.subclass], ['种族', character.race], ['背景', character.background], ['语言', character.languages]].filter(([, value]) => value).map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
 {inventories.map(([label, items]) => Array.isArray(items) && items.length > 0 ? <section key={label}><h3>{label}</h3>{items.map((item: any, index: number) => <article key={index}><strong>{item.name || '未命名条目'}</strong>{item.quantity !== undefined && <span> × {item.quantity}</span>}{typeof item.description === 'string' && <RichText text={item.description}/>}</article>)}</section> : null)}
 {Object.entries(character.spells || {}).filter(([, text]) => text).map(([key, text]) => <section key={key}><h3>{key === 'cantrips' ? '戏法' : key.replace('level', '') + '环法术'}</h3><RichText text={text}/></section>)}
 </details>;
}
