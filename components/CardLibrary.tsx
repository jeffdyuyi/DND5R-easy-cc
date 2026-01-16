
import React, { useState } from 'react';
import { BaseLibraryItem } from '../types';
import { Plus, Search, PenTool, CheckCircle, Trash2, Edit2 } from 'lucide-react';

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
    red: { border: 'border-red-900', header: 'bg-red-900', ring: 'ring-red-400', tag: 'bg-red-50 text-red-900', hover: 'hover:border-red-700', text: 'text-red-900' },
    orange: { border: 'border-orange-800', header: 'bg-orange-800', ring: 'ring-orange-400', tag: 'bg-orange-50 text-orange-900', hover: 'hover:border-orange-600', text: 'text-orange-900' },
    amber: { border: 'border-amber-700', header: 'bg-amber-700', ring: 'ring-amber-400', tag: 'bg-amber-50 text-amber-900', hover: 'hover:border-amber-600', text: 'text-amber-900' },
    yellow: { border: 'border-yellow-700', header: 'bg-yellow-700', ring: 'ring-yellow-400', tag: 'bg-yellow-50 text-yellow-900', hover: 'hover:border-yellow-600', text: 'text-yellow-900' },
    green: { border: 'border-green-800', header: 'bg-green-800', ring: 'ring-green-400', tag: 'bg-green-50 text-green-900', hover: 'hover:border-green-600', text: 'text-green-900' },
    teal: { border: 'border-teal-800', header: 'bg-teal-800', ring: 'ring-teal-400', tag: 'bg-teal-50 text-teal-900', hover: 'hover:border-teal-600', text: 'text-teal-900' },
    blue: { border: 'border-blue-900', header: 'bg-blue-900', ring: 'ring-blue-400', tag: 'bg-blue-50 text-blue-900', hover: 'hover:border-blue-700', text: 'text-blue-900' },
    indigo: { border: 'border-indigo-900', header: 'bg-indigo-900', ring: 'ring-indigo-400', tag: 'bg-indigo-50 text-indigo-900', hover: 'hover:border-indigo-700', text: 'text-indigo-900' },
    violet: { border: 'border-violet-900', header: 'bg-violet-900', ring: 'ring-violet-400', tag: 'bg-violet-50 text-violet-900', hover: 'hover:border-violet-700', text: 'text-violet-900' },
    purple: { border: 'border-purple-900', header: 'bg-purple-900', ring: 'ring-purple-400', tag: 'bg-purple-50 text-purple-900', hover: 'hover:border-purple-700', text: 'text-purple-900' },
    pink: { border: 'border-pink-900', header: 'bg-pink-900', ring: 'ring-pink-400', tag: 'bg-pink-50 text-pink-900', hover: 'hover:border-pink-700', text: 'text-pink-900' },
    slate: { border: 'border-slate-700', header: 'bg-slate-700', ring: 'ring-slate-400', tag: 'bg-slate-50 text-slate-900', hover: 'hover:border-slate-500', text: 'text-slate-900' },
    zinc: { border: 'border-zinc-700', header: 'bg-zinc-700', ring: 'ring-zinc-400', tag: 'bg-zinc-50 text-zinc-900', hover: 'hover:border-zinc-500', text: 'text-zinc-900' },
    stone: { border: 'border-stone-600', header: 'bg-stone-600', ring: 'ring-stone-400', tag: 'bg-stone-100 text-stone-900', hover: 'hover:border-stone-500', text: 'text-stone-900' },
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
     if(window.confirm(`确定要删除"${id}"吗？此操作不可恢复。`)) {
        if(onDelete) onDelete(id);
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
      <div className={`bg-white p-6 rounded-lg border-2 border-dashed ${themeClasses.border} animate-fade-in max-w-4xl mx-auto`}>
        <h3 className={`font-bold text-xl ${themeClasses.text} mb-4 flex items-center gap-2`}>
           <PenTool className="w-5 h-5"/> {items.some(i => i.id === editingItem.id) ? "编辑" : "创建自定义"}{itemTypeLabel}
        </h3>
        
        <div className="space-y-4">
           <div>
              <label className="block text-sm font-bold text-stone-700 mb-1">名称</label>
              <input 
                type="text" 
                value={editingItem.name} 
                onChange={e => setEditingItem({...editingItem, name: e.target.value})}
                className="w-full p-2 border border-stone-300 rounded focus:ring-2 focus:ring-stone-400 focus:outline-none"
                placeholder={`例如：新${itemTypeLabel}`}
              />
           </div>
           <div>
              <label className="block text-sm font-bold text-stone-700 mb-1">封面简述</label>
              <input 
                type="text" 
                value={editingItem.description} 
                onChange={e => setEditingItem({...editingItem, description: e.target.value})}
                className="w-full p-2 border border-stone-300 rounded focus:ring-2 focus:ring-stone-400 focus:outline-none"
                placeholder="一句话描述核心特色，用于卡牌封面显示..."
              />
           </div>
           
           {renderEditFields && renderEditFields(editingItem, setEditingItem)}

           <div className="bg-stone-50 p-4 rounded text-sm text-stone-500 italic border border-stone-200">
              * 编辑功能当前仅开放基础信息及部分关联信息修改。
           </div>

           <div className="flex justify-end gap-3 mt-4">
              <button 
                onClick={() => { setIsEditing(false); setEditingItem(null); }} 
                className="px-4 py-2 text-stone-600 hover:bg-stone-100 rounded border border-stone-300 font-bold"
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
       <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-3 rounded-lg border border-stone-200 shadow-sm">
          <div className="relative w-full md:w-72">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
             <input 
               type="text" 
               placeholder={`搜索${itemTypeLabel} (名称/标签/描述)...`}
               value={searchTerm}
               onChange={e => setSearchTerm(e.target.value)}
               className="w-full pl-9 pr-3 py-2 rounded border border-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-400 text-sm"
             />
          </div>
          <div className="flex gap-2 w-full md:w-auto overflow-x-auto">
             <button onClick={() => setFilterSource('all')} className={`px-3 py-1 text-xs font-bold rounded whitespace-nowrap transition-colors ${filterSource === 'all' ? 'bg-stone-800 text-white' : 'bg-stone-100 border border-stone-200 text-stone-600 hover:bg-stone-200'}`}>全部</button>
             <button onClick={() => setFilterSource('official')} className={`px-3 py-1 text-xs font-bold rounded whitespace-nowrap transition-colors ${filterSource === 'official' ? 'bg-blue-800 text-white' : 'bg-stone-100 border border-stone-200 text-stone-600 hover:bg-stone-200'}`}>官方规则</button>
             <button onClick={() => setFilterSource('homebrew')} className={`px-3 py-1 text-xs font-bold rounded whitespace-nowrap transition-colors ${filterSource === 'homebrew' ? 'bg-purple-800 text-white' : 'bg-stone-100 border border-stone-200 text-stone-600 hover:bg-stone-200'}`}>原创/第三方</button>
          </div>
       </div>

       {/* Grid */}
       <div className={`grid gap-6 ${effectiveLayout === 'list' ? 'grid-cols-1' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'}`}>
          {/* Create New Card */}
          {(onCreate || onCreateAction) && allowEdit && (
            <div 
              onClick={handleCreateStart}
              className={`
                group cursor-pointer border-4 border-dashed border-stone-300 rounded-xl flex flex-col items-center justify-center 
                bg-stone-50 hover:bg-stone-100 transition-colors shadow-inner
                ${renderItem && effectiveLayout === 'list' ? 'h-24 flex-row gap-4' : effectiveLayout === 'grid' && renderItem ? 'h-40' : 'aspect-[3/4]'}
              `}
            >
               <div className={`rounded-full bg-white border-2 border-stone-300 flex items-center justify-center group-hover:scale-110 transition-transform ${renderItem && effectiveLayout === 'list' ? 'w-10 h-10' : 'w-16 h-16 mb-3'}`}>
                  <Plus className={`${renderItem && effectiveLayout === 'list' ? 'w-5 h-5' : 'w-8 h-8'} text-stone-400 group-hover:text-stone-600`} />
               </div>
               <span className="font-bold text-stone-400 group-hover:text-stone-600 uppercase tracking-widest text-xs">新建{itemTypeLabel}</span>
            </div>
          )}

          {filteredItems.map(item => {
             const isSelected = item.name === selectedId || item.id === selectedId;
             
             // Define Actions block
             const actions = allowEdit && (item.source === '第三方/原创' || onEdit) && (
                <div className="flex gap-2 bg-white rounded-full shadow-lg p-1 border border-stone-200">
                   {onEdit && (
                      <button onClick={(e) => handleEditStart(e, item)} className="p-1.5 hover:bg-blue-100 rounded-full text-blue-600 transition-colors" title="编辑">
                         <Edit2 className="w-4 h-4" />
                      </button>
                   )}
                   {onDelete && item.source === '第三方/原创' && (
                      <button onClick={(e) => handleDelete(e, item.id)} className="p-1.5 hover:bg-red-100 rounded-full text-red-600 transition-colors" title="删除">
                         <Trash2 className="w-4 h-4" />
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
                    group relative cursor-pointer rounded-xl border-4 transition-all duration-200 flex flex-col aspect-[3/4] shadow-md hover:shadow-xl hover:-translate-y-1 bg-white overflow-hidden
                    ${isSelected 
                       ? `${themeClasses.border} ${themeClasses.ring} ring-2 ring-offset-2 scale-[1.02] z-10` 
                       : 'border-stone-300 hover:border-stone-400'}
                  `}
               >
                  {/* Card Header */}
                  <div className={`h-14 px-3 flex items-center justify-between text-white ${themeClasses.header} transition-colors border-b-4 border-black/10`}>
                     <div className="flex items-center gap-2 overflow-hidden w-full">
                        <span className="font-black text-sm uppercase tracking-wide truncate w-full drop-shadow-md">{item.name}</span>
                     </div>
                  </div>

                  {/* Ribbon/Badge */}
                  <div className="absolute top-10 right-0 z-20">
                     <span className={`text-[9px] font-black px-2 py-0.5 rounded-l shadow-sm uppercase tracking-wider text-white ${item.source === '官方规则' ? 'bg-black/40' : 'bg-purple-600'}`}>
                        {item.source === '官方规则' ? '官方' : '自制'}
                     </span>
                  </div>

                  {/* Card Body */}
                  <div className="flex-grow p-4 bg-stone-50 relative overflow-hidden flex flex-col items-center justify-center">
                     {/* Background Watermark - Updated to Author Brand */}
                     <div className={`absolute -bottom-6 -right-6 text-6xl opacity-[0.07] pointer-events-none select-none font-serif font-black rotate-12 whitespace-nowrap ${themeClasses.text}`}>
                        不咕鸟
                     </div>
                     
                     {/* Content */}
                     <div className="relative z-10 flex-grow w-full flex items-center justify-center">
                        <p className="text-sm font-black text-stone-600 leading-loose text-center whitespace-pre-line tracking-wide drop-shadow-sm font-serif">
                           {item.description || "暂无描述。"}
                        </p>
                     </div>
                  </div>

                  {/* Card Footer */}
                  <div className="px-3 py-2 bg-white border-t border-stone-200 h-10 flex justify-between items-center relative">
                     <div className="flex gap-1 overflow-hidden mask-linear-fade">
                        {(item.tags || []).slice(0, 2).map(tag => (
                           <span key={tag} className={`text-[8px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider ${themeClasses.tag}`}>
                              {tag}
                           </span>
                        ))}
                        {/* Fallback tags if none */}
                        {(!item.tags || item.tags.length === 0) && (
                           <span className="text-[8px] text-stone-300 uppercase tracking-wider font-bold">---</span>
                        )}
                     </div>
                     
                     {/* Actions - visible on hover */}
                     <div className="absolute right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        {actions}
                     </div>
                     
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
