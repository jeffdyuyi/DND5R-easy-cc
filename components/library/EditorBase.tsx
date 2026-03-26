import React, { useRef } from 'react';
import { Plus, Trash2, BookOpen, AlertTriangle } from 'lucide-react';
import { ClassFeature } from '../../types';

export { Plus, Trash2, BookOpen, AlertTriangle };

// --- Markdown Textarea ---
export const MarkdownTextarea: React.FC<{
    value: string;
    onChange: (e: any) => void;
    className?: string;
    placeholder?: string;
}> = ({ value, onChange, className, placeholder }) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleInsert = (e: React.MouseEvent, prefix: string, suffix: string = '') => {
        e.preventDefault();
        const textarea = textareaRef.current;
        if (!textarea) return;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selected = value.substring(start, end);
        const output = value.substring(0, start) + prefix + selected + suffix + value.substring(end);

        onChange({ target: { value: output } });
        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(start + prefix.length, end + prefix.length);
        }, 0);
    };

    return (
        <div className="flex flex-col border border-stone-300 rounded focus-within:border-red-600 overflow-hidden bg-white shadow-sm transition-all focus-within:ring-2 focus-within:ring-red-100">
            <div className="flex gap-1 bg-stone-50 p-1.5 border-b border-stone-200">
                <button type="button" onMouseDown={(e) => handleInsert(e, '**', '**')} className="px-2.5 py-1 hover:bg-stone-200 rounded font-bold text-xs text-stone-700 transition-colors" title="加粗">B</button>
                <button type="button" onMouseDown={(e) => handleInsert(e, '*', '*')} className="px-2.5 py-1 hover:bg-stone-200 rounded italic text-xs text-stone-700 transition-colors" title="斜体">I</button>
                <button type="button" onMouseDown={(e) => handleInsert(e, '\n| 列头 | 列头 |\n| :--- | :--- |\n| 内容 | 内容 |\n')} className="px-2.5 py-1 hover:bg-stone-200 rounded font-mono text-xs text-stone-700 transition-colors" title="插入表格">表格</button>
                <button type="button" onMouseDown={(e) => handleInsert(e, '### ')} className="px-2.5 py-1 hover:bg-stone-200 rounded font-bold text-xs text-stone-700 transition-colors" title="小标题">H3</button>
                <button type="button" onMouseDown={(e) => handleInsert(e, '> ')} className="px-2.5 py-1 hover:bg-stone-200 rounded font-serif text-xs text-stone-700 transition-colors" title="引用">❞</button>
            </div>
            <textarea
                ref={textareaRef}
                value={value}
                onChange={onChange}
                className={`${className} border-0 rounded-none focus:ring-0 p-3 outline-none min-h-[120px] transition-all`}
                placeholder={placeholder}
            />
        </div>
    );
};

// --- Feature List Editor ---
export const FeatureListEditor: React.FC<{
    features: ClassFeature[];
    onChange: (features: ClassFeature[]) => void;
    title?: string;
}> = ({ features, onChange, title = "特性列表" }) => {
    const handleUpdate = (index: number, field: keyof ClassFeature, value: any) => {
        const newFeatures = [...features];
        newFeatures[index] = { ...newFeatures[index], [field]: value };
        onChange(newFeatures);
    };

    const handleDelete = (index: number) => {
        onChange(features.filter((_, i) => i !== index));
    };

    const handleAdd = () => {
        onChange([...features, { name: '新特性', level: 1, description: '' }]);
    };

    return (
        <div className="space-y-4 border-t-2 border-stone-200 pt-6 mt-8">
            <div className="flex justify-between items-center">
                <h4 className="font-black text-stone-800 uppercase tracking-tighter text-lg">{title}</h4>
                <button onClick={handleAdd} className="text-xs bg-stone-800 text-white px-4 py-2 rounded-lg hover:bg-stone-700 flex items-center gap-2 font-bold shadow-sm transition-all active:scale-95">
                    <Plus className="w-4 h-4 text-green-400" /> 添加新特性
                </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {features.sort((a, b) => a.level - b.level).map((feature, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-2xl border-2 border-stone-100 shadow-sm space-y-4 group hover:border-red-100 transition-all">
                        <div className="flex gap-4">
                            <div className="w-24">
                                <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest block mb-1">等级</label>
                                <input
                                    type="number"
                                    min="1" max="20"
                                    value={feature.level}
                                    onChange={(e) => handleUpdate(idx, 'level', parseInt(e.target.value) || 1)}
                                    className="w-full p-2.5 border-2 border-stone-100 rounded-xl focus:border-red-600 outline-none font-black text-center text-lg"
                                />
                            </div>
                            <div className="flex-grow">
                                <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest block mb-1">特性名称</label>
                                <input
                                    type="text"
                                    value={feature.name}
                                    onChange={(e) => handleUpdate(idx, 'name', e.target.value)}
                                    className="w-full p-2.5 border-2 border-stone-100 rounded-xl focus:border-red-600 outline-none font-bold text-lg"
                                    placeholder="输入特性名称..."
                                />
                            </div>
                            <div className="flex items-end pb-1">
                                <button onClick={() => handleDelete(idx)} className="text-stone-300 hover:text-red-600 p-2.5 transition-colors">
                                    <Trash2 className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                        <div>
                            <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest block mb-1">详情描述</label>
                            <MarkdownTextarea
                                value={feature.description}
                                onChange={(e: any) => handleUpdate(idx, 'description', e.target.value)}
                                className="min-h-[100px] text-sm"
                                placeholder="输入特性详细描述..."
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- Common UI Props ---
export const ATTR_OPTIONS = ['力量', '敏捷', '体质', '智力', '感知', '魅力'];
export const HIT_DICE_OPTIONS = ['d4', 'd6', 'd8', 'd10', 'd12', 'd20'];
export const ALL_SKILLS = [
    '杂技', '驯兽', '奥秘', '运动', '欺瞒', '历史', '洞悉', '威吓', '调查',
    '医药', '自然', '察觉', '表演', '游说', '宗教', '巧手', '隐匿', '求生'
];

// --- Generic Rich Description Editor ---
export const RichDescriptionEditor: React.FC<{
    item: any;
    setItem: (value: any) => void;
}> = ({ item, setItem }) => {
    return (
        <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-[10px] font-black text-stone-400 uppercase tracking-widest mb-1">名称</label>
                    <input
                        type="text"
                        value={item.name}
                        onChange={e => setItem((p: any) => p ? { ...p, name: e.target.value } : null)}
                        className="w-full p-3 border-2 border-stone-100 rounded-xl focus:border-stone-600 font-bold"
                    />
                </div>
                <div>
                    <label className="block text-[10px] font-black text-stone-400 uppercase tracking-widest mb-1">数据源</label>
                    <input
                        type="text"
                        value={item.source}
                        onChange={e => setItem((p: any) => p ? { ...p, source: e.target.value } : null)}
                        className="w-full p-3 border-2 border-stone-100 rounded-xl focus:border-stone-600 font-bold"
                    />
                </div>
            </div>
            <div>
                <label className="block text-xs font-black text-stone-400 uppercase tracking-widest mb-2 px-1">详情描述 (Markdown)</label>
                <MarkdownTextarea
                    value={item.description}
                    onChange={e => setItem((p: any) => p ? { ...p, description: e.target.value } : null)}
                    className="min-h-[300px]"
                />
            </div>
        </div>
    );
};

// --- Tool Editor Alias (Legacy support for GMView/MainLayout) ---
import { ItemEditor } from './ItemEditor';
export const ToolEditor = ItemEditor;
