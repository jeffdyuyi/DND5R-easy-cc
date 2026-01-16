
import React, { useState } from 'react';
import { CardLibrary } from './CardLibrary';
import { BaseLibraryItem } from '../types';
import { ArrowLeft, FileUp, FileDown } from 'lucide-react';

interface Props<T extends BaseLibraryItem> {
  title: string;
  itemLabel: string;
  items: T[];
  onAdd: (item: T) => void;
  onUpdate: (item: T) => void;
  onDelete: (id: string) => void;
  onImport?: (items: T[]) => void;
  emptyTemplate: T;
  renderEditFields?: (item: T, setItem: React.Dispatch<React.SetStateAction<T | null>>) => React.ReactNode;
  renderDetail?: (item: T) => React.ReactNode;
  renderItem?: (item: T, isSelected: boolean, onClick: () => void, actions: React.ReactNode) => React.ReactNode;
  extraTools?: React.ReactNode;
  cardColorTheme?: string;
  layout?: 'grid' | 'list';
  key?: React.Key;
}

export function LibraryManager<T extends BaseLibraryItem>({
  title,
  itemLabel,
  items,
  onAdd,
  onUpdate,
  onDelete,
  onImport,
  emptyTemplate,
  renderEditFields,
  renderDetail,
  renderItem,
  extraTools,
  cardColorTheme,
  layout
}: Props<T>) {
  
  const [viewItem, setViewItem] = useState<T | null>(null);

  const handleSelect = (item: T) => {
    setViewItem(item);
  };

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(items, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `${title || "library"}_${new Date().toISOString().slice(0,10)}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (onImport) {
           let importData: T[] = [];
           
           if (Array.isArray(json)) {
             importData = json;
           } else if (typeof json === 'object' && json !== null) {
             importData = [json as T];
           }

           if (importData.length > 0) {
             const validItems = importData.filter(i => i && (i.id || i.name));
             if (validItems.length > 0) {
               onImport(validItems);
               alert(`成功读取 ${validItems.length} 个条目。\n(系统已自动跳过 ID 重复的条目)`);
             } else {
               alert("导入失败：数据格式不正确（缺少关键字段）");
             }
           } else {
             alert("导入失败：文件为空或格式错误");
           }
        } else {
           alert("该库不支持导入功能");
        }
      } catch (err) {
        alert("导入失败：文件格式错误 (非 JSON)");
      }
    };
    reader.readAsText(file);
    e.target.value = ''; 
  };

  if (viewItem && renderDetail) {
     return (
        <div className="p-8 pb-20 max-w-7xl mx-auto animate-fade-in">
           <button 
              onClick={() => setViewItem(null)}
              className="mb-6 flex items-center gap-2 text-stone-500 hover:text-dndRed font-bold transition-colors"
           >
              <ArrowLeft className="w-5 h-5"/> 返回列表
           </button>
           {renderDetail(viewItem)}
        </div>
     );
  }

  return (
    <div className="p-8 pb-20 max-w-7xl mx-auto">
      <div className="mb-8 border-b-2 border-stone-300 pb-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h2 className="text-4xl font-bold text-stone-800 mb-2">{title}</h2>
            <p className="text-stone-500">
              管理您的{itemLabel}数据。您可以查看官方内容，或创建、编辑属于您的自定义{itemLabel}。
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex gap-2">
               <button 
                  onClick={handleExport}
                  className="bg-white border border-stone-300 text-stone-600 px-3 py-2 rounded-lg font-bold shadow-sm hover:bg-stone-50 transition-colors flex items-center gap-2 text-xs"
                  title="导出当前列表"
               >
                  <FileDown className="w-4 h-4"/> 导出
               </button>
               {onImport && (
                 <label className="bg-white border border-stone-300 text-stone-600 px-3 py-2 rounded-lg font-bold shadow-sm hover:bg-stone-50 transition-colors cursor-pointer flex items-center gap-2 text-xs">
                    <FileUp className="w-4 h-4"/> 导入
                    <input type="file" accept=".json" onChange={handleImport} className="hidden" />
                 </label>
               )}
            </div>

            {extraTools && (
              <div className="w-full md:w-auto">
                {extraTools}
              </div>
            )}
          </div>
        </div>
      </div>

      <CardLibrary
        title={title}
        items={items}
        itemTypeLabel={itemLabel}
        onSelect={handleSelect}
        onCreate={onAdd}
        onEdit={onUpdate}
        onDelete={onDelete}
        emptyTemplate={emptyTemplate}
        allowEdit={true}
        renderEditFields={renderEditFields}
        renderItem={renderItem}
        cardColorTheme={cardColorTheme}
        layout={layout}
      />
    </div>
  );
}
