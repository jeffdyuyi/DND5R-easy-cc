
import React, { useState } from 'react';
import { CharacterData, ItemItem } from '../types';
import { Plus, Trash2, Shield, Sword, Box, Zap, Hammer, Eye, X, Weight, Backpack, Package } from 'lucide-react';
import { WEAPON_DB, ARMOR_DB, GEAR_DB, TOOL_DB, MAGIC_ITEM_DB } from '../data';
import { ItemDetailView } from './LibraryDetails';
import { RichText } from './RichText';

interface Props {
   character: CharacterData;
   updateCharacter: (updates: Partial<CharacterData>) => void;
   libraryTools: ItemItem[];
}

const TabInventory: React.FC<Props> = ({ character, updateCharacter, libraryTools }) => {
   // Modal State
   const [pickerType, setPickerType] = useState<'weapon' | 'armor' | 'gear' | 'ammo' | 'tool' | 'misc' | null>(null);
   const [viewingItem, setViewingItem] = useState<ItemItem | null>(null);
   const [customItemName, setCustomItemName] = useState('');

   // --- Handlers ---

   const addItem = (listKey: 'inventoryWeapons' | 'inventoryArmor' | 'inventoryGear' | 'tools', item: any) => {
      if (listKey === 'tools') {
         const newItem = { id: item.id, name: item.name, note: '' };
         updateCharacter({ tools: [...character.tools, newItem] });
      } else {
         // @ts-ignore
         const list = character[listKey] || [];
         updateCharacter({ [listKey]: [...list, item] });
      }
      setPickerType(null);
   };

   const removeItem = (listKey: 'inventoryWeapons' | 'inventoryArmor' | 'inventoryGear' | 'tools', index: number) => {
      // @ts-ignore
      const list = [...(character[listKey] || [])];
      list.splice(index, 1);
      updateCharacter({ [listKey]: list });
   };

   const handleViewItem = (item: ItemItem) => {
      setViewingItem(item);
   };

   return (
      <div className="p-6 bg-white min-h-full font-sans text-stone-900">
         {/* Enhanced Header: Load & Money */}
         <div className="mb-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-4 border-b-2 border-stone-800 pb-2">
               <div>
                  <h2 className="text-3xl font-black text-stone-800 flex items-center gap-2">
                     <Backpack className="w-8 h-8" /> 行囊与财富
                  </h2>
                  <p className="text-stone-500 text-sm mt-1">管理你的装备、宝藏与货币。</p>
               </div>
               <div className="flex items-center gap-4 bg-stone-100 px-4 py-2 rounded-lg border border-stone-200">
                  <div className="flex items-center gap-2">
                     <Weight className="w-5 h-5 text-stone-500" />
                     <div>
                        <span className="text-xs font-bold text-stone-400 block uppercase">当前负重 (估算)</span>
                        <span className="text-lg font-bold text-stone-800">
                           {Math.ceil((character.platinum + character.gold + character.silver + character.copper) / 50)}
                           <span className="text-sm font-normal text-stone-500 ml-1">磅 (仅货币)</span>
                        </span>
                     </div>
                  </div>
                  <div className="w-px h-8 bg-stone-300"></div>
                  <div>
                     <span className="text-xs font-bold text-stone-400 block uppercase">负重上限 (15 x 力量)</span>
                     <span className="text-lg font-bold text-stone-800">{character.abilities.strength * 15} <span className="text-sm font-normal text-stone-500">磅</span></span>
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-stone-50 p-4 rounded-xl border border-stone-200 shadow-inner">
               <MoneyInput
                  label="铂金币 (PP)"
                  value={character.platinum}
                  onChange={v => updateCharacter({ platinum: v })}
                  colorClass="border-slate-300 text-slate-700"
               />
               <MoneyInput
                  label="金币 (GP)"
                  value={character.gold}
                  onChange={v => updateCharacter({ gold: v })}
                  colorClass="border-yellow-400 text-yellow-700"
               />
               <MoneyInput
                  label="银币 (SP)"
                  value={character.silver}
                  onChange={v => updateCharacter({ silver: v })}
                  colorClass="border-stone-300 text-stone-600"
               />
               <MoneyInput
                  label="铜币 (CP)"
                  value={character.copper}
                  onChange={v => updateCharacter({ copper: v })}
                  colorClass="border-orange-300 text-orange-700"
               />
            </div>
         </div>

         {/* Weapons Section (Grid Cards) */}
         <div className="mb-10">
            <div className="flex justify-between items-center mb-4 bg-stone-800 text-white px-4 py-2 rounded-t-lg shadow-sm">
               <h3 className="font-bold flex items-center gap-2 text-lg"><Sword className="w-5 h-5" /> 武器 (Weapons)</h3>
               <button onClick={() => setPickerType('weapon')} className="text-xs bg-stone-600 px-3 py-1 rounded hover:bg-stone-500 border border-stone-500 font-bold flex items-center gap-1">
                  <Plus className="w-3 h-3" /> 添加武器
               </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
               {character.inventoryWeapons.map((item, i) => (
                  <div key={i} className="bg-white border border-stone-300 rounded-lg shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                     <div className="bg-stone-50 p-3 border-b border-stone-200 flex justify-between items-start">
                        <div>
                           <div className="font-bold text-stone-900 truncate pr-6">{item.name}</div>
                           <div className="text-[10px] text-stone-500">{item.damage || '-'} {item.damageType}</div>
                        </div>
                        <div className="text-xs font-bold bg-white border px-1.5 py-0.5 rounded text-stone-600">{item.weight}</div>
                     </div>
                     <div className="p-3 text-xs text-stone-600 space-y-1">
                        <div className="flex flex-wrap gap-1">
                           {item.properties?.map(p => <span key={p} className="bg-stone-100 px-1.5 rounded border">{p}</span>)}
                        </div>
                        {item.mastery && (
                           <div className="text-yellow-700 mt-2 pt-2 border-t border-stone-100 truncate">
                              <RichText text={item.mastery} />
                           </div>
                        )}
                     </div>

                     {/* Actions Footer */}
                     <div className="bg-stone-50 border-t border-stone-200 p-2 flex justify-end gap-2">
                        <button onClick={() => handleViewItem(item)} className="px-2 py-1 text-xs text-stone-600 hover:text-blue-600 hover:bg-stone-200 rounded border border-stone-300 bg-white shadow-sm flex items-center gap-1">
                           <Eye className="w-3 h-3" /> 查看
                        </button>
                        <button onClick={() => removeItem('inventoryWeapons', i)} className="px-2 py-1 text-xs text-stone-600 hover:text-red-600 hover:bg-red-50 rounded border border-stone-300 bg-white shadow-sm flex items-center gap-1">
                           <Trash2 className="w-3 h-3" /> 移除
                        </button>
                     </div>
                  </div>
               ))}
               {character.inventoryWeapons.length === 0 && (
                  <div className="col-span-full p-8 text-center text-stone-400 italic border-2 border-dashed border-stone-200 rounded-lg bg-stone-50">
                     暂无武器，请点击右上角添加。
                  </div>
               )}
            </div>
         </div>

         {/* Armor Section (Table) */}
         <div className="mb-10">
            <div className="flex justify-between items-center mb-2 bg-stone-800 text-white px-3 py-1 rounded-t">
               <h3 className="font-bold flex items-center gap-2"><Shield className="w-4 h-4" /> 护甲 (Armor)</h3>
               <button onClick={() => setPickerType('armor')} className="text-xs bg-stone-600 px-2 py-0.5 rounded hover:bg-stone-500 flex items-center gap-1">
                  <Plus className="w-3 h-3" /> 添加
               </button>
            </div>
            <table className="w-full text-sm border-collapse border border-stone-300 shadow-sm">
               <thead className="bg-stone-100 font-bold text-stone-700">
                  <tr>
                     <th className="border p-2 text-left">名称</th>
                     <th className="border p-2 w-24 text-center">AC</th>
                     <th className="border p-2 w-24 text-center">力量需求</th>
                     <th className="border p-2 w-24 text-center">隐匿劣势</th>
                     <th className="border p-2 w-20 text-center">重量</th>
                     <th className="border p-2 w-16"></th>
                  </tr>
               </thead>
               <tbody>
                  {character.inventoryArmor.map((item, i) => (
                     <tr key={i} className="border-b hover:bg-stone-50">
                        <td className="border p-2 font-bold cursor-pointer hover:text-dndRed" onClick={() => handleViewItem(item)}>{item.name}</td>
                        <td className="border p-2 text-center text-dndRed font-bold">{item.ac}</td>
                        <td className="border p-2 text-center">{item.strengthRequirement || "-"}</td>
                        <td className="border p-2 text-center">{item.stealthDisadvantage ? "是" : "-"}</td>
                        <td className="border p-2 text-center">{item.weight}</td>
                        <td className="border p-2 text-center">
                           <button onClick={() => removeItem('inventoryArmor', i)} className="text-red-500 hover:bg-red-50 p-1 rounded"><Trash2 className="w-4 h-4" /></button>
                        </td>
                     </tr>
                  ))}
                  {character.inventoryArmor.length === 0 && <tr><td colSpan={6} className="p-4 text-center text-stone-400 italic">暂无护甲</td></tr>}
               </tbody>
            </table>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            {/* Misc Items / Consumables */}
            <div>
               <div className="flex justify-between items-center mb-2 bg-stone-800 text-white px-3 py-1 rounded-t">
                  <h3 className="font-bold flex items-center gap-2"><Package className="w-4 h-4" /> 杂物 (Misc)</h3>
                  <div className="flex gap-2">
                     <button onClick={() => setPickerType('misc')} className="text-xs bg-stone-600 px-2 py-0.5 rounded hover:bg-stone-500 flex items-center gap-1">
                        <Plus className="w-3 h-3" /> 添加
                     </button>
                  </div>
               </div>
               <div className="border border-stone-300 rounded overflow-hidden max-h-[400px] overflow-y-auto shadow-sm">
                  <table className="w-full text-sm">
                     <thead className="bg-stone-100 font-bold text-stone-700 sticky top-0">
                        <tr>
                           <th className="p-2 text-left border-b">名称</th>
                           <th className="p-2 w-20 text-center border-b">数量</th>
                           <th className="p-2 w-16 text-center border-b">重量</th>
                           <th className="p-2 w-10 border-b"></th>
                        </tr>
                     </thead>
                     <tbody>
                        {character.inventoryGear.filter(i => !i.type || (i.type !== '弹药' && i.type !== '魔法物品' && i.type !== '法器')).map((item, i) => (
                           <tr key={i} className="border-b hover:bg-stone-50">
                              <td className="p-2">
                                 <span className="font-bold block cursor-pointer hover:text-dndRed" onClick={() => handleViewItem(item)}>{item.name}</span>
                                 <span className="text-[10px] text-stone-500">{item.type || '杂物'}</span>
                              </td>
                              <td className="p-2 text-center">
                                 <div className="flex items-center justify-center gap-1">
                                    <button
                                       onClick={() => {
                                          const list = [...character.inventoryGear];
                                          const realIndex = list.indexOf(item);
                                          list[realIndex] = { ...list[realIndex], quantity: Math.max(1, (list[realIndex].quantity || 1) - 1) };
                                          updateCharacter({ inventoryGear: list });
                                       }}
                                       className="w-5 h-5 rounded bg-stone-200 hover:bg-stone-300 text-stone-600 text-xs font-bold"
                                    >-</button>
                                    <span className="w-6 text-center font-medium">{item.quantity || 1}</span>
                                    <button
                                       onClick={() => {
                                          const list = [...character.inventoryGear];
                                          const realIndex = list.indexOf(item);
                                          list[realIndex] = { ...list[realIndex], quantity: (list[realIndex].quantity || 1) + 1 };
                                          updateCharacter({ inventoryGear: list });
                                       }}
                                       className="w-5 h-5 rounded bg-stone-200 hover:bg-stone-300 text-stone-600 text-xs font-bold"
                                    >+</button>
                                 </div>
                              </td>
                              <td className="p-2 text-center">{item.weight}</td>
                              <td className="p-2 text-center">
                                 <button onClick={() => {
                                    const list = [...character.inventoryGear];
                                    const realIndex = list.indexOf(item);
                                    list.splice(realIndex, 1);
                                    updateCharacter({ inventoryGear: list });
                                 }} className="text-stone-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                              </td>
                           </tr>
                        ))}
                        {character.inventoryGear.filter(i => !i.type || (i.type !== '弹药' && i.type !== '魔法物品' && i.type !== '法器')).length === 0 && (
                           <tr><td colSpan={4} className="p-4 text-center text-stone-400 italic">暂无杂物</td></tr>
                        )}
                     </tbody>
                  </table>
               </div>
               {/* Custom item input */}
               <div className="mt-2 flex gap-2">
                  <input
                     type="text"
                     value={customItemName}
                     onChange={(e) => setCustomItemName(e.target.value)}
                     placeholder="自定义物品名称..."
                     className="flex-1 px-2 py-1 border border-stone-300 rounded text-sm"
                  />
                  <button
                     onClick={() => {
                        if (customItemName.trim()) {
                           const newItem: ItemItem = {
                              id: `custom-${Date.now()}`,
                              name: customItemName.trim(),
                              description: '自定义物品',
                              source: '自定义',
                              type: '杂物',
                              cost: '-',
                              weight: '-',
                              quantity: 1
                           };
                           updateCharacter({ inventoryGear: [...character.inventoryGear, newItem] });
                           setCustomItemName('');
                        }
                     }}
                     disabled={!customItemName.trim()}
                     className="px-3 py-1 bg-stone-700 text-white rounded text-sm hover:bg-stone-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                     添加
                  </button>
               </div>
            </div>

            {/* Magic Items / Focuses */}
            <div>
               <div className="flex justify-between items-center mb-2 bg-stone-800 text-white px-3 py-1 rounded-t">
                  <h3 className="font-bold flex items-center gap-2"><Box className="w-4 h-4" /> 法器与魔法物品</h3>
                  <button onClick={() => setPickerType('gear')} className="text-xs bg-stone-600 px-2 py-0.5 rounded hover:bg-stone-500 flex items-center gap-1">
                     <Plus className="w-3 h-3" /> 添加
                  </button>
               </div>
               <div className="border border-stone-300 rounded overflow-hidden max-h-[300px] overflow-y-auto shadow-sm">
                  <table className="w-full text-sm">
                     <thead className="bg-stone-100 font-bold text-stone-700 sticky top-0">
                        <tr>
                           <th className="p-2 text-left border-b">名称</th>
                           <th className="p-2 w-12 text-center border-b">同调</th>
                           <th className="p-2 w-16 text-center border-b">重量</th>
                           <th className="p-2 w-10 border-b"></th>
                        </tr>
                     </thead>
                     <tbody>
                        {character.inventoryGear.filter(i => i.type === '魔法物品' || i.type === '法器').map((item, i) => (
                           <tr key={i} className="border-b hover:bg-stone-50">
                              <td className="p-2">
                                 <span className="font-bold block cursor-pointer hover:text-dndRed" onClick={() => handleViewItem(item)}>{item.name}</span>
                                 <span className="text-[10px] text-stone-500">{item.rarity || item.type}</span>
                              </td>
                              <td className="p-2 text-center">
                                 <input type="checkbox" checked={item.attuned} onChange={(e) => {
                                    const list = [...character.inventoryGear];
                                    const realIndex = list.indexOf(item);
                                    list[realIndex] = { ...list[realIndex], attuned: e.target.checked };
                                    updateCharacter({ inventoryGear: list });
                                 }} />
                              </td>
                              <td className="p-2 text-center">{item.weight}</td>
                              <td className="p-2 text-center">
                                 <button onClick={() => {
                                    const list = [...character.inventoryGear];
                                    const realIndex = list.indexOf(item);
                                    list.splice(realIndex, 1);
                                    updateCharacter({ inventoryGear: list });
                                 }} className="text-stone-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                              </td>
                           </tr>
                        ))}
                        {character.inventoryGear.filter(i => i.type === '魔法物品' || i.type === '法器').length === 0 && (
                           <tr><td colSpan={4} className="p-4 text-center text-stone-400 italic">暂无法器或魔法物品</td></tr>
                        )}
                     </tbody>
                  </table>
               </div>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">

            {/* Ammo & Tools */}
            <div className="space-y-8">
               {/* Ammo */}
               <div>
                  <div className="flex justify-between items-center mb-2 bg-stone-800 text-white px-3 py-1 rounded-t">
                     <h3 className="font-bold flex items-center gap-2"><Zap className="w-4 h-4" /> 弹药 (Ammunition)</h3>
                     <button onClick={() => setPickerType('ammo')} className="text-xs bg-stone-600 px-2 py-0.5 rounded hover:bg-stone-500 flex items-center gap-1">
                        <Plus className="w-3 h-3" /> 添加
                     </button>
                  </div>
                  <table className="w-full text-sm border border-stone-300 shadow-sm">
                     <thead className="bg-stone-100 font-bold text-stone-700">
                        <tr>
                           <th className="p-2 text-left border-b">名称</th>
                           <th className="p-2 w-20 text-center border-b">数量</th>
                           <th className="p-2 w-10 border-b"></th>
                        </tr>
                     </thead>
                     <tbody>
                        {character.inventoryGear.filter(i => i.type === '弹药').map((item, i) => (
                           <tr key={i} className="border-b hover:bg-stone-50">
                              <td className="p-2 font-bold cursor-pointer hover:text-dndRed" onClick={() => handleViewItem(item)}>{item.name}</td>
                              <td className="p-2 text-center">
                                 <input
                                    type="number"
                                    className="w-16 text-center border rounded bg-white"
                                    value={item.quantity || 1}
                                    onChange={(e) => {
                                       const list = [...character.inventoryGear];
                                       const realIndex = list.indexOf(item);
                                       list[realIndex] = { ...list[realIndex], quantity: parseInt(e.target.value) };
                                       updateCharacter({ inventoryGear: list });
                                    }}
                                 />
                              </td>
                              <td className="p-2 text-center">
                                 <button onClick={() => {
                                    const list = [...character.inventoryGear];
                                    const realIndex = list.indexOf(item);
                                    list.splice(realIndex, 1);
                                    updateCharacter({ inventoryGear: list });
                                 }} className="text-stone-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>

               {/* Tools */}
               <div>
                  <div className="flex justify-between items-center mb-2 bg-stone-800 text-white px-3 py-1 rounded-t">
                     <h3 className="font-bold flex items-center gap-2"><Hammer className="w-4 h-4" /> 工具 (Tools)</h3>
                     <button onClick={() => setPickerType('tool')} className="text-xs bg-stone-600 px-2 py-0.5 rounded hover:bg-stone-500 flex items-center gap-1">
                        <Plus className="w-3 h-3" /> 添加
                     </button>
                  </div>
                  <div className="border border-stone-300 rounded overflow-hidden shadow-sm">
                     {character.tools.map((tool, i) => {
                        // Try to match with full data for modal viewing
                        const toolData = libraryTools.find(t => t.name === tool.name);

                        return (
                           <div key={i} className="border-b last:border-0 p-2 bg-white flex justify-between items-center hover:bg-stone-50">
                              <div className="flex-grow cursor-pointer" onClick={() => toolData && handleViewItem(toolData)}>
                                 <div className="font-bold text-stone-900 hover:text-dndRed">{tool.name}</div>
                                 <div className="text-xs text-stone-500">{toolData?.toolAbility ? `属性: ${toolData.toolAbility}` : ''}</div>
                              </div>
                              <button onClick={() => {
                                 const newTools = [...character.tools];
                                 newTools.splice(i, 1);
                                 updateCharacter({ tools: newTools });
                              }} className="text-stone-400 hover:text-red-500 p-1"><Trash2 className="w-4 h-4" /></button>
                           </div>
                        );
                     })}
                     {character.tools.length === 0 && <div className="p-4 text-center text-stone-400 italic">暂无工具熟练</div>}
                  </div>
               </div>
            </div>
         </div>

         <div className="mb-8">
            <div className="flex justify-between items-center mb-2 bg-stone-800 text-white px-3 py-1 rounded-t">
               <h3 className="font-bold flex items-center gap-2">其他财宝与笔记</h3>
            </div>
            <textarea
               className="w-full h-32 border border-stone-300 p-2 rounded focus:ring-1 focus:ring-dndRed outline-none"
               value={character.treasure}
               onChange={(e) => updateCharacter({ treasure: e.target.value })}
               placeholder="记录其他贵重物品、宝石、艺术品..."
            />
         </div>

         {/* Pickers */}
         {pickerType === 'weapon' && <PickerModal setPickerType={setPickerType} title="选择武器" items={WEAPON_DB} onSelect={(i) => addItem('inventoryWeapons', i)} />}
         {pickerType === 'armor' && <PickerModal setPickerType={setPickerType} title="选择护甲/盾牌" items={ARMOR_DB} onSelect={(i) => addItem('inventoryArmor', i)} />}
         {pickerType === 'gear' && <PickerModal setPickerType={setPickerType} title="选择法器/魔法物品" items={[...GEAR_DB.filter(i => i.type === '法器'), ...MAGIC_ITEM_DB]} onSelect={(i) => addItem('inventoryGear', i)} />}
         {pickerType === 'misc' && <PickerModal setPickerType={setPickerType} title="选择杂物" items={GEAR_DB.filter(i => i.type !== '弹药' && i.type !== '法器')} onSelect={(i) => addItem('inventoryGear', { ...i, quantity: 1 })} />}
         {pickerType === 'ammo' && <PickerModal setPickerType={setPickerType} title="选择弹药" items={GEAR_DB.filter(i => i.type === '弹药')} onSelect={(i) => addItem('inventoryGear', { ...i, quantity: 20 })} />}
         {pickerType === 'tool' && <PickerModal setPickerType={setPickerType} title="选择工具" items={TOOL_DB} onSelect={(i) => addItem('tools', i)} />}

         {/* Detail Viewer */}
         {viewingItem && <ItemDetailModal item={viewingItem} onClose={() => setViewingItem(null)} />}

      </div>
   );
};

// --- Render Helpers (Extracted) ---

const PickerModal = ({ title, items, onSelect, setPickerType }: { title: string, items: ItemItem[], onSelect: (i: ItemItem) => void, setPickerType: (t: any) => void }) => (
   <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-fade-in">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[80vh] flex flex-col overflow-hidden">
         <div className="p-4 border-b bg-stone-100 flex justify-between items-center">
            <h3 className="font-bold text-lg">{title}</h3>
            <button onClick={() => setPickerType(null)} className="p-1 hover:bg-stone-200 rounded"><X className="w-5 h-5" /></button>
         </div>
         <div className="flex-grow overflow-y-auto p-2">
            {items.map(item => (
               <div key={item.id} onClick={() => onSelect(item)}
                  className="p-3 border-b hover:bg-stone-50 cursor-pointer flex justify-between items-center group">
                  <div>
                     <div className="font-bold text-stone-800 group-hover:text-dndRed">{item.name}</div>
                     <div className="text-xs text-stone-500">{item.description}</div>
                  </div>
                  <Plus className="w-5 h-5 text-stone-300 group-hover:text-dndRed" />
               </div>
            ))}
         </div>
      </div>
   </div>
);

const ItemDetailModal = ({ item, onClose }: { item: ItemItem, onClose: () => void }) => (
   <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-fade-in backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
         <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-stone-100 rounded-full hover:bg-stone-200 z-10">
            <X className="w-5 h-5 text-stone-600" />
         </button>
         <div className="p-6">
            <ItemDetailView item={item} />
         </div>
      </div>
   </div>
);

const MoneyInput = ({ label, value, onChange, colorClass }: { label: string, value: number, onChange: (v: number) => void, colorClass: string }) => (
   <div className={`flex flex-col items-center bg-white p-3 rounded-lg border-2 shadow-sm ${colorClass}`}>
      <span className="text-[10px] font-black uppercase tracking-wider mb-1 opacity-70">{label}</span>
      <input
         type="number"
         min="0"
         value={value}
         onChange={(e) => onChange(parseInt(e.target.value) || 0)}
         className="w-full text-center text-xl font-bold bg-transparent outline-none"
      />
   </div>
);

export default TabInventory;
