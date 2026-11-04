import { resourceKey } from '../src/content/resourceIdentity';
import { LibraryOverlay } from './LibraryNavigation';
import { downloadJson } from '../utils/files';
import { NativeResourceCard } from './NativeResourceCard';
import { userResourceView, prepareResourceImport } from '../src/content/userResources';
import React, { useState } from 'react';
import { ResourceReader } from './ResourceReader';
import { CardLibrary } from './CardLibrary';
import { BaseLibraryItem } from '../types';
import { FileUp, FileDown } from './common/UiIcons';
interface Props<T extends BaseLibraryItem> {
    toolbar?: React.ReactNode;
    title: string;
    itemLabel: string;
    kind: string;
    items: T[];
    onUpdate: (item: T) => void;
    onImport?: (items: T[]) => void;
    extraTools?: React.ReactNode;
}
export function LibraryManager<T extends BaseLibraryItem>({ title, itemLabel, kind, items, onUpdate, onImport, extraTools, toolbar }: Props<T>) {
    const [actionsOpen, setActionsOpen] = useState(false);
    const [viewItem, setViewItem] = useState<T | null>(null);
    const currentViewItem = viewItem ? items.find(item => resourceKey(item) === resourceKey(viewItem)) || viewItem : null;
    const [viewScope, setViewScope] = useState<string[] | null>(null);
    const readerItems = viewScope ? items.filter(item => viewScope.includes(resourceKey(item))) : items;
    const handleSelect = (item: T, visibleItems?: T[]) => {
        setViewScope(visibleItems?.map(resourceKey) || null);
        setViewItem(item);
    };
    const handleExport = () => downloadJson(items, `${title}_${new Date().toISOString().slice(0, 10)}.json`);
    const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        event.target.value = '';
        if (!file || !onImport)
            return;
        try {
            const records = prepareResourceImport(JSON.parse(await file.text()), kind);
            onImport(records);
            alert('已导入 ' + records.length + ' 项独立用户记录。');
        }
        catch (error) {
            alert('导入未执行：' + (error instanceof Error ? error.message : '无法读取JSON资源。'));
        }
    };
    return (<div className="library-results p-4 sm:p-8 pb-20 max-w-7xl mx-auto">
      {currentViewItem && <ResourceReader item={currentViewItem} items={readerItems} onChange={setViewItem} onClose={() => setViewItem(null)}><NativeResourceCard item={userResourceView(currentViewItem, (currentViewItem as any).kind || kind)}/></ResourceReader>}
      {actionsOpen && <LibraryOverlay title="导入与导出" onClose={() => setActionsOpen(false)}><div className="library-overlay-scroll library-transfer-actions"><button onClick={handleExport} className="bg-white border border-stone-300 text-stone-600 px-3 py-2 rounded-lg font-bold shadow-sm hover:bg-stone-50 transition-colors flex items-center gap-2 text-xs" title="导出当前列表">
                  <FileDown className="w-4 h-4"/> 导出
               </button>
               {onImport && (<label className="bg-white border border-stone-300 text-stone-600 px-3 py-2 rounded-lg font-bold shadow-sm hover:bg-stone-50 transition-colors cursor-pointer flex items-center gap-2 text-xs">
                    <FileUp className="w-4 h-4"/> 导入
                    <input type="file" accept=".json" onChange={handleImport} className="hidden"/>
                 </label>)}</div></LibraryOverlay>}
      {extraTools && <div className="library-facets-area">{extraTools}</div>}

      <CardLibrary toolbar={toolbar} toolbarActions={<button type="button" className="catalog-transfer-button" aria-haspopup="dialog" aria-expanded={actionsOpen} onClick={() => setActionsOpen(true)}><FileDown size={18}/><span>导入导出</span><span aria-hidden="true">⌄</span></button>} title={title} items={items} itemTypeLabel={itemLabel} onSelect={handleSelect} itemKind={kind} allowEdit={false}/>
    </div>);
}
