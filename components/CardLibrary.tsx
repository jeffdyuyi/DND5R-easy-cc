
import React, { useState } from 'react';
import { BaseLibraryItem } from '../types';
import { Plus, Search, PenTool, CheckCircle, Trash2, Edit2, Zap, Scale, Star } from 'lucide-react';

interface Props<T extends BaseLibraryItem> {
   title: string;
   items: T[];
   selectedId?: string;
   onSelect: (item: T) => void;
   onCreate?: (item: T) => void;
   onCreateAction?: () => void;
   onDelete?: (id: string) => void;
   onEdit?: (item: T) => void;
   itemTypeLabel: string;
   emptyTemplate?: T;
   allowEdit?: boolean;
   renderEditFields?: (item: T, setItem: React.Dispatch<React.SetStateAction<T | null>>) => React.ReactNode;
   renderItem?: (item: T, isSelected: boolean, onClick: () => void, actions: React.ReactNode) => React.ReactNode;
   cardColorTheme?: string;
   layout?: 'grid' | 'list'; // Added layout prop
}

const getColorClasses = (theme: string = 'stone') => {
   const map: any = {
      red: { border: 'border-red-900/50', header: 'bg-red-950/80', ring: 'ring-red-500/50', tag: 'bg-red-900/30 text-red-100', hover: 'hover:border-red-500', text: 'text-red-100' },
      blue: { border: 'border-blue-900/50', header: 'bg-blue-950/80', ring: 'ring-blue-500/50', tag: 'bg-blue-900/30 text-blue-100', hover: 'hover:border-blue-500', text: 'text-blue-100' },
      green: { border: 'border-green-900/50', header: 'bg-green-950/80', ring: 'ring-green-500/50', tag: 'bg-green-900/30 text-green-100', hover: 'hover:border-green-500', text: 'text-green-100' },
      yellow: { border: 'border-yellow-900/50', header: 'bg-yellow-950/80', ring: 'ring-yellow-500/50', tag: 'bg-yellow-900/30 text-yellow-100', hover: 'hover:border-yellow-500', text: 'text-yellow-100' },
      purple: { border: 'border-purple-900/50', header: 'bg-purple-950/80', ring: 'ring-purple-500/50', tag: 'bg-purple-900/30 text-purple-100', hover: 'hover:border-purple-500', text: 'text-purple-100' },
      stone: { border: 'border-[#bf953f]/20', header: 'bg-[#1e1e30]', ring: 'ring-[#bf953f]/30', tag: 'bg-stone-800 text-stone-100', hover: 'hover:border-[#bf953f]/50', text: 'text-[#f0ead8]' },
   };
   return map[theme] || map.stone;
};

export function CardLibrary<T extends BaseLibraryItem>({
   items,
   selectedId,
   onSelect,
   onCreate,
   onCreateAction,
   onDelete,
   onEdit,
   itemTypeLabel,
   emptyTemplate,
   allowEdit = true,
   renderEditFields,
   renderItem,
   cardColorTheme = 'stone',
   layout
}: Props<T>) {
   const [searchTerm, setSearchTerm] = useState('');
   const [filterSource, setFilterSource] = useState<'all' | 'official' | 'homebrew'>('all');
   const [isEditing, setIsEditing] = useState(false);
   const [editingItem, setEditingItem] = useState<T | null>(null);

   const themeClasses = getColorClasses(cardColorTheme);

   // Determine layout: defaults to 'grid' unless renderItem is present (legacy list behavior), but can be overridden by layout prop
   const effectiveLayout = layout || (renderItem ? 'list' : 'grid');

   const filteredItems = items.filter(item => {
      const matchesSearch = item.name.includes(searchTerm) || item.description.includes(searchTerm) || (item.tags && item.tags.some(t => t.includes(searchTerm)));
      const matchesSource = filterSource === 'all'
         ? true
         : filterSource === 'official'
            ? item.source === '官方规则'
            : item.source === '第三方/原创';
      return matchesSearch && matchesSource;
   });

   const handleCreateStart = () => {
      if (onCreateAction) {
         onCreateAction();
         return;
      }
      if (emptyTemplate) {
         setEditingItem({ ...emptyTemplate, id: `custom-${Date.now()}`, source: '第三方/原创' });
         setIsEditing(true);
      }
   };

   const handleEditStart = (e: React.MouseEvent, item: T) => {
      e.stopPropagation();
      setEditingItem(item);
      setIsEditing(true);
   };

   const handleDelete = (e: React.MouseEvent, id: string) => {
      e.stopPropagation();
      if (window.confirm(`确定要删除"${id}"吗？此操作不可恢复。`)) {
         if (onDelete) onDelete(id);
      }
   };

   const handleSave = () => {
      if (editingItem) {
         if (items.some(i => i.id === editingItem.id)) {
            if (onEdit) onEdit(editingItem);
         } else {
            if (onCreate) onCreate(editingItem);
         }
         onSelect(editingItem);
         setIsEditing(false);
         setEditingItem(null);
      }
   };

   if (isEditing && editingItem) {
      return (
         <div className={`bg-[#141420] p-6 rounded-xl border-2 border-dashed ${themeClasses.border} animate-fade-in max-w-4xl mx-auto glass-panel noise-bg shadow-2xl`}>
            <div className="flex items-center justify-between mb-4">
               <h3 className={`font-bold text-xl ${themeClasses.text} flex items-center gap-2`}>
                  <PenTool className="w-5 h-5" /> {items.some(i => i.id === editingItem.id) ? "编辑" : "创建自定义"}{itemTypeLabel}
               </h3>
               <button
                  onClick={() => { setIsEditing(false); setEditingItem(null); }}
                  className="flex items-center gap-1 text-sm text-[#a89b7a] hover:text-[#f0ead8] font-black transition-colors bg-[#1e1e30] hover:bg-[#18182a] px-4 py-2 rounded-full border border-[#bf953f]/20 uppercase tracking-widest"
               >
                  返回列表
               </button>
            </div>

            <div className="space-y-4">
               <div>
                  <label className="block text-xs font-black text-[#a89b7a] mb-2 uppercase tracking-[0.2em]">名称</label>
                  <input
                     type="text"
                     value={editingItem.name}
                     onChange={e => setEditingItem({ ...editingItem, name: e.target.value })}
                     className="w-full p-3 bg-[#1e1e30] border border-[#bf953f]/20 rounded-lg text-[#f0ead8] focus:ring-2 focus:ring-[#bf953f]/40 focus:outline-none focus:border-[#bf953f]/50 transition-all shadow-inner"
                     placeholder={`例如：新${itemTypeLabel}`}
                  />
               </div>
               <div>
                  <label className="block text-xs font-black text-[#a89b7a] mb-2 uppercase tracking-[0.2em]">封面简述</label>
                  <input
                     type="text"
                     value={editingItem.description}
                     onChange={e => setEditingItem({ ...editingItem, description: e.target.value })}
                     className="w-full p-3 bg-[#1e1e30] border border-[#bf953f]/20 rounded-lg text-[#f0ead8] focus:ring-2 focus:ring-[#bf953f]/40 focus:outline-none focus:border-[#bf953f]/50 transition-all shadow-inner"
                     placeholder="一句话描述核心特色，用于卡牌封面显示..."
                  />
               </div>

               {renderEditFields && renderEditFields(editingItem, setEditingItem)}

               <div className="bg-[#0c0c10] p-4 rounded-xl text-xs text-[#6b6250] italic border border-[#bf953f]/10 shadow-inner">
                  * 编辑功能当前仅开放基础信息及部分关联信息修改。
               </div>

               <div className="flex justify-end gap-3 mt-4">
                  <button
                     onClick={() => { setIsEditing(false); setEditingItem(null); }}
                     className="px-5 py-2.5 text-[#a89b7a] hover:bg-white/5 rounded-xl border border-[#bf953f]/20 font-black uppercase tracking-widest text-xs transition-colors"
                  >
                     取消
                  </button>
                  <button
                     onClick={handleSave}
                     disabled={!editingItem.name}
                     className={`px-4 py-2 text-white rounded font-bold transition-opacity disabled:opacity-50 ${themeClasses.header} hover:opacity-90`}
                  >
                     保存
                  </button>
               </div>
            </div>
         </div>
      );
   }

   return (
      <div className="space-y-6">
         {/* Filters */}
         <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-[#18182a] p-4 rounded-2xl border border-[#bf953f]/10 shadow-2xl glass-panel relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#bf953f]/5 to-transparent rounded-full -translate-y-12 translate-x-12 blur-2xl"></div>
            <div className="relative w-full md:w-80 z-10">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#bf953f]/50" />
               <input
                  type="text"
                  placeholder={`搜索${itemTypeLabel}...`}
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 bg-[#141420] rounded-xl border border-[#bf953f]/20 text-[#f0ead8] placeholder-[#6b6250] focus:outline-none focus:ring-2 focus:ring-[#bf953f]/30 transition-all font-medium"
               />
            </div>
            <div className="flex gap-2 w-full md:w-auto overflow-x-auto z-10 pb-1 md:pb-0">
               <button onClick={() => setFilterSource('all')} className={`px-4 py-2 text-xs font-black rounded-lg whitespace-nowrap transition-all uppercase tracking-widest ${filterSource === 'all' ? 'bg-[#bf953f] text-white shadow-[0_0_15px_rgba(191,149,63,0.4)]' : 'bg-[#141420] border border-[#bf953f]/20 text-[#a89b7a] hover:border-[#bf953f]/50'}`}>全部</button>
               <button onClick={() => setFilterSource('official')} className={`px-4 py-2 text-xs font-black rounded-lg whitespace-nowrap transition-all uppercase tracking-widest ${filterSource === 'official' ? 'bg-blue-800 text-white shadow-[0_0_15px_rgba(29,78,216,0.4)]' : 'bg-[#141420] border border-[#bf953f]/20 text-[#a89b7a] hover:border-[#bf953f]/50'}`}>官方规则</button>
               <button onClick={() => setFilterSource('homebrew')} className={`px-4 py-2 text-xs font-black rounded-lg whitespace-nowrap transition-all uppercase tracking-widest ${filterSource === 'homebrew' ? 'bg-purple-800 text-white shadow-[0_0_15px_rgba(126,34,206,0.4)]' : 'bg-[#141420] border border-[#bf953f]/20 text-[#a89b7a] hover:border-[#bf953f]/50'}`}>原创/第三方</button>
            </div>
         </div>

         {/* Grid */}
         <div className={`grid ${effectiveLayout === 'list' ? 'grid-cols-1 gap-3' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6'}`}>
            {/* Create New Card */}
            {(onCreate || onCreateAction) && allowEdit && (
               <div
                  onClick={handleCreateStart}
                  className={`
                 group cursor-pointer border-2 border-dashed border-[#bf953f]/30 rounded-2xl flex flex-col items-center justify-center 
                 bg-[#141420] hover:bg-[#18182a] transition-all shadow-inner hover:border-[#bf953f]/60
                 ${effectiveLayout === 'list' ? 'h-16 flex-row gap-4' : 'aspect-square xl:aspect-video'}
               `}
               >
                  <div className={`rounded-full bg-[#1e1e30] border border-[#bf953f]/30 flex items-center justify-center group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(191,149,63,0.3)] transition-all ${effectiveLayout === 'list' ? 'w-8 h-8' : 'w-14 h-14 mb-3'}`}>
                     <Plus className={`${effectiveLayout === 'list' ? 'w-4 h-4' : 'w-7 h-7'} text-[#bf953f]`} />
                  </div>
                  <span className="font-black text-[#6b6250] group-hover:text-[#a89b7a] uppercase tracking-[0.2em] text-[10px] transition-colors">新建{itemTypeLabel}</span>
               </div>
            )}

            {filteredItems.map(item => {
               const isSelected = item.name === selectedId || item.id === selectedId;

               // Define Actions block
               const actions = allowEdit && (item.source === '第三方/原创' || onEdit) && (
                  <div className="flex gap-2 bg-[#1e1e30] rounded-full shadow-2xl p-1.5 border border-[#bf953f]/30 ring-1 ring-[#bf953f]/10 translate-y-2 group-hover:translate-y-0 transition-all">
                     {onEdit && (
                        <button onClick={(e) => handleEditStart(e, item)} className="p-2 hover:bg-white/5 rounded-full text-blue-400 transition-colors" title="编辑">
                           <Edit2 className="w-4.5 h-4.5" />
                        </button>
                     )}
                     {onDelete && item.source === '第三方/原创' && (
                        <button onClick={(e) => handleDelete(e, item.id)} className="p-2 hover:bg-white/5 rounded-full text-red-400 transition-colors" title="删除">
                           <Trash2 className="w-4.5 h-4.5" />
                        </button>
                     )}
                  </div>
               );

               // Use custom renderer if provided
               if (renderItem) {
                  return (
                     <div key={item.id} className={effectiveLayout === 'grid' ? 'h-full' : ''}>
                        {renderItem(item, isSelected, () => onSelect(item), actions)}
                     </div>
                  );
               }

               // Standard Vertical Card Renderer
               return (
                  <div
                     key={item.id}
                     onClick={() => onSelect(item)}
                     className={`
                     group relative cursor-pointer rounded-2xl border transition-all duration-300 flex flex-col aspect-square xl:aspect-video shadow-2xl hover:shadow-[#bf953f]/10 hover:-translate-y-1 bg-[#141420] overflow-hidden noise-bg
                     ${isSelected
                           ? `${themeClasses.border} shadow-[0_0_30px_rgba(191,149,63,0.15)] ring-2 ring-[#bf953f]/40 scale-[1.03] z-10 border-[#bf953f]/60`
                           : 'border-[#bf953f]/20 hover:border-[#bf953f]/50'}
                   `}
                  >
                     {/* Card Header */}
                     <div className={`h-14 px-4 flex items-center justify-between text-[#f0ead8] ${themeClasses.header} transition-colors border-b border-[#bf953f]/20 bg-gradient-to-b from-white/5 to-transparent relative z-10`}>
                        <div className="flex items-center gap-2 overflow-hidden w-full">
                           <span className="font-black text-base uppercase tracking-widest truncate w-full drop-shadow-lg">{item.name}</span>
                        </div>
                     </div>

                     {/* Ribbon/Badge */}
                     {(!isSelected && actions) && (
                        <div className="absolute top-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                           {actions}
                        </div>
                     )}

                     <div className="absolute top-14 right-0 z-20">
                        <span className={`text-[9px] font-black px-3 py-1 rounded-l-lg shadow-2xl uppercase tracking-[0.2em] text-white ${item.source === '官方规则' ? 'bg-black/60 border-l border-b border-t border-[#bf953f]/20' : 'bg-purple-900 border-l border-b border-t border-purple-400/30'}`}>
                           {item.source === '官方规则' ? '官方库' : '原创'}
                        </span>
                     </div>

                     {/* Card Body - Enriched with metadata */}
                     <div className="flex-grow p-4 bg-gradient-to-b from-[#18182a] to-[#141420] relative overflow-hidden flex flex-col justify-start group-hover:from-[#1c1c33] transition-colors">
                        {/* Background Watermark */}
                        <div className={`absolute -bottom-6 -right-6 text-6xl opacity-[0.03] pointer-events-none select-none font-serif font-black rotate-12 whitespace-nowrap ${themeClasses.text}`}>
                           不咕鸟
                        </div>

                        <div className="relative z-10 space-y-2">
                           {/* Species Specific */}
                           {itemTypeLabel === '种族' && (item as any).speed && (
                              <div className="flex flex-wrap gap-3">
                                 <div className="flex items-center gap-1.5 text-[#a89b7a] bg-black/40 px-3 py-1.5 rounded-lg border border-[#bf953f]/10 shadow-inner">
                                    <Zap className="w-3.5 h-3.5 text-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.4)]" />
                                    <span className="text-[10px] font-black tracking-widest">{(item as any).speed} 尺</span>
                                 </div>
                                 <div className="flex items-center gap-1.5 text-[#a89b7a] bg-black/40 px-3 py-1.5 rounded-lg border border-[#bf953f]/10 shadow-inner">
                                    <Scale className="w-3.5 h-3.5 text-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.4)]" />
                                    <span className="text-[10px] font-black tracking-widest">{(item as any).size}体型</span>
                                 </div>
                              </div>
                           )}

                           {/* Background Specific */}
                           {itemTypeLabel === '背景' && (item as any).abilityScores && (
                              <div className="flex flex-wrap gap-2">
                                 {((item as any).abilityScores || []).map((score: string) => (
                                    <div key={score} className="px-2.5 py-1 bg-red-950/40 border border-red-900/40 text-red-300 rounded-lg text-[9px] font-black uppercase tracking-widest shadow-lg">
                                       {score}
                                    </div>
                                 ))}
                              </div>
                           )}

                           {/* Feat Specific */}
                           {itemTypeLabel === '专长' && (item as any).category && (
                              <div className="flex items-center gap-1.5 text-stone-600">
                                 <Star className="w-3.5 h-3.5 text-purple-500" />
                                 <span className="text-[11px] font-black text-purple-700 uppercase tracking-wide">
                                    {(item as any).category}
                                 </span>
                              </div>
                           )}

                           {/* Short description - hidden for species */}
                           {itemTypeLabel !== '种族' && item.description && (
                              <p className="text-[10px] text-[#6b6250] line-clamp-2 leading-relaxed italic group-hover:text-[#a89b7a] transition-colors font-medium">
                                 {item.description}
                              </p>
                           )}
                        </div>
                     </div>

                     {/* Card Footer */}
                     <div className="px-4 py-2 bg-[#0c0c10] border-t border-[#bf953f]/10 h-12 flex justify-between items-center relative z-10 transition-colors group-hover:bg-black">
                        <div className="flex gap-2 overflow-hidden">
                           {(item.tags || []).slice(0, 2).map(tag => (
                              <span key={tag} className={`text-[8px] px-2 py-1 rounded-md font-black uppercase tracking-[0.2em] shadow-lg ${themeClasses.tag} border border-white/5`}>
                                 {tag}
                              </span>
                           ))}
                           {/* Fallback tags if none */}
                           {(!item.tags || item.tags.length === 0) && (
                              <span className="text-[8px] text-[#6b6250]/40 uppercase tracking-[0.3em] font-black">UNTAGGED</span>
                           )}
                        </div>

                        {/* Spacer so the right end isn't completely empty but actions moved to top-right */}
                        <div className="w-2" />

                        {/* Selected Indicator */}
                        {isSelected && (
                           <div className="absolute right-2 top-1/2 -translate-y-1/2 group-hover:opacity-0 transition-opacity">
                              <CheckCircle className={`w-5 h-5 ${themeClasses.text}`} />
                           </div>
                        )}
                     </div>
                  </div>
               );
            })}
         </div>
      </div>
   );
}
