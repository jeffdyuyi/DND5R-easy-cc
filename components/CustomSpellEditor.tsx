
import React, { useState, useRef, useCallback } from 'react';
import { SpellItem } from '../types';
import { Bold, Italic, Table, Type, Wand2, X, Check } from 'lucide-react';
import { RichText } from './RichText';
import SpellCard from './SpellCard';

interface MarkdownToolbarProps {
    textareaRef: React.RefObject<HTMLTextAreaElement>;
    onInsert: (text: string) => void;
}

const MarkdownToolbar: React.FC<MarkdownToolbarProps> = ({ textareaRef, onInsert }) => {
    const wrapSelection = useCallback((prefix: string, suffix: string) => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = textarea.value;
        const selectedText = text.substring(start, end);

        const newText = text.substring(0, start) + prefix + selectedText + suffix + text.substring(end);
        onInsert(newText);

        // Restore cursor position after the inserted text
        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(start + prefix.length, end + prefix.length);
        }, 0);
    }, [textareaRef, onInsert]);

    const insertTable = useCallback(() => {
        const tableTemplate = `
| 标题1 | 标题2 | 标题3 |
| --- | --- | --- |
| 数据1 | 数据2 | 数据3 |
| 数据4 | 数据5 | 数据6 |
`;
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const text = textarea.value;
        const newText = text.substring(0, start) + tableTemplate + text.substring(start);
        onInsert(newText);
    }, [textareaRef, onInsert]);

    return (
        <div className="flex items-center gap-1 p-2 bg-stone-100 border-b border-stone-300 rounded-t">
            <span className="text-xs text-stone-500 mr-2 font-bold">格式化:</span>
            <button
                type="button"
                onClick={() => wrapSelection('**', '**')}
                className="p-2 hover:bg-stone-200 rounded text-stone-600 hover:text-stone-900 transition-colors"
                title="加粗 (效应名称)"
            >
                <Bold className="w-4 h-4" />
            </button>
            <button
                type="button"
                onClick={() => wrapSelection('*', '*')}
                className="p-2 hover:bg-stone-200 rounded text-stone-600 hover:text-stone-900 transition-colors"
                title="斜体 (引用法术/状态)"
            >
                <Italic className="w-4 h-4" />
            </button>
            <div className="w-px h-6 bg-stone-300 mx-1"></div>
            <button
                type="button"
                onClick={insertTable}
                className="p-2 hover:bg-stone-200 rounded text-stone-600 hover:text-stone-900 transition-colors"
                title="插入表格"
            >
                <Table className="w-4 h-4" />
            </button>
            <div className="flex-grow"></div>
            <span className="text-[10px] text-stone-400">
                **加粗** | *斜体* | |表格|
            </span>
        </div>
    );
};

interface CustomSpellEditorProps {
    initialSpell?: Partial<SpellItem>;
    onSave: (spell: SpellItem) => void;
    onCancel: () => void;
}

export const CustomSpellEditor: React.FC<CustomSpellEditorProps> = ({
    initialSpell,
    onSave,
    onCancel
}) => {
    const [spell, setSpell] = useState<Partial<SpellItem>>({
        id: initialSpell?.id || `custom-${Date.now()}`,
        name: initialSpell?.name || '',
        level: initialSpell?.level ?? 0,
        school: initialSpell?.school || '塑能',
        castingTime: initialSpell?.castingTime || '动作',
        range: initialSpell?.range || '自身',
        components: initialSpell?.components || '言语, 姿势',
        duration: initialSpell?.duration || '立即',
        classes: initialSpell?.classes || [],
        description: initialSpell?.description || '',
        higherLevel: initialSpell?.higherLevel || '',
        source: initialSpell?.source || '第三方/原创'
    });

    const [showPreview, setShowPreview] = useState(false);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    const higherLevelRef = useRef<HTMLTextAreaElement>(null);

    const SCHOOLS = ['防护', '咒法', '预言', '附魔', '塑能', '幻术', '死灵', '变化'];
    const CLASSES = ['法师', '吟游诗人', '牧师', '德鲁伊', '术士', '邪术师', '游侠', '圣武士'];

    const updateField = (field: keyof SpellItem, value: any) => {
        setSpell(prev => ({ ...prev, [field]: value }));
    };

    const toggleClass = (cls: string) => {
        const currentClasses = spell.classes || [];
        if (currentClasses.includes(cls)) {
            updateField('classes', currentClasses.filter(c => c !== cls));
        } else {
            updateField('classes', [...currentClasses, cls]);
        }
    };

    const handleSave = () => {
        if (!spell.name?.trim()) {
            alert('请输入法术名称');
            return;
        }
        onSave(spell as SpellItem);
    };

    const previewSpell: SpellItem = {
        id: spell.id || 'preview',
        name: spell.name || '未命名法术',
        level: spell.level ?? 0,
        school: spell.school || '塑能',
        castingTime: spell.castingTime || '-',
        range: spell.range || '-',
        components: spell.components || '-',
        duration: spell.duration || '-',
        classes: spell.classes || [],
        description: spell.description || '',
        higherLevel: spell.higherLevel || '',
        source: spell.source || '自定义'
    };

    return (
        <div className="flex flex-col h-full max-h-[85vh] overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b-2 border-stone-200 flex justify-between items-center bg-gradient-to-r from-dndRed to-red-700">
                <h3 className="font-black text-2xl text-white flex items-center gap-2">
                    <Wand2 className="w-6 h-6" />
                    {initialSpell?.id ? '编辑法术' : '创建自定义法术'}
                </h3>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setShowPreview(!showPreview)}
                        className={`px-4 py-2 rounded font-bold text-sm transition-colors ${showPreview
                            ? 'bg-white text-dndRed'
                            : 'bg-white/20 text-white hover:bg-white/30'
                            }`}
                    >
                        {showPreview ? '编辑' : '预览'}
                    </button>
                    <button onClick={onCancel} className="p-2 hover:bg-white/20 rounded-full text-white transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="flex-grow overflow-y-auto p-6 bg-stone-50">
                {showPreview ? (
                    <div className="max-w-md mx-auto">
                        <SpellCard item={previewSpell} />
                    </div>
                ) : (
                    <div className="max-w-3xl mx-auto space-y-6">
                        {/* Basic Info */}
                        <div className="bg-white p-6 rounded-lg border border-stone-300 shadow-sm">
                            <h4 className="font-bold text-stone-800 mb-4 text-lg border-b border-stone-200 pb-2">
                                <Type className="w-5 h-5 inline mr-2" />基本信息
                            </h4>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="col-span-2">
                                    <label className="block text-xs font-bold text-stone-500 mb-1">法术名称 *</label>
                                    <input
                                        type="text"
                                        value={spell.name || ''}
                                        onChange={e => updateField('name', e.target.value)}
                                        className="w-full p-2 border border-stone-300 rounded focus:border-dndRed focus:outline-none font-bold"
                                        placeholder="例：火球术"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-stone-500 mb-1">环阶</label>
                                    <select
                                        value={spell.level ?? 0}
                                        onChange={e => updateField('level', parseInt(e.target.value))}
                                        className="w-full p-2 border border-stone-300 rounded focus:border-dndRed focus:outline-none"
                                    >
                                        <option value={0}>戏法</option>
                                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(l => (
                                            <option key={l} value={l}>{l}环</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-stone-500 mb-1">学派</label>
                                    <select
                                        value={spell.school || '塑能'}
                                        onChange={e => updateField('school', e.target.value)}
                                        className="w-full p-2 border border-stone-300 rounded focus:border-dndRed focus:outline-none"
                                    >
                                        {SCHOOLS.map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Casting Details */}
                        <div className="bg-white p-6 rounded-lg border border-stone-300 shadow-sm">
                            <h4 className="font-bold text-stone-800 mb-4 text-lg border-b border-stone-200 pb-2">施法参数</h4>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-stone-500 mb-1">施法时间</label>
                                    <input
                                        type="text"
                                        value={spell.castingTime || ''}
                                        onChange={e => updateField('castingTime', e.target.value)}
                                        className="w-full p-2 border border-stone-300 rounded focus:border-dndRed focus:outline-none"
                                        placeholder="动作"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-stone-500 mb-1">射程</label>
                                    <input
                                        type="text"
                                        value={spell.range || ''}
                                        onChange={e => updateField('range', e.target.value)}
                                        className="w-full p-2 border border-stone-300 rounded focus:border-dndRed focus:outline-none"
                                        placeholder="60 尺"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-stone-500 mb-1">成分</label>
                                    <input
                                        type="text"
                                        value={spell.components || ''}
                                        onChange={e => updateField('components', e.target.value)}
                                        className="w-full p-2 border border-stone-300 rounded focus:border-dndRed focus:outline-none"
                                        placeholder="言语, 姿势, 材料"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-stone-500 mb-1">持续时间</label>
                                    <input
                                        type="text"
                                        value={spell.duration || ''}
                                        onChange={e => updateField('duration', e.target.value)}
                                        className="w-full p-2 border border-stone-300 rounded focus:border-dndRed focus:outline-none"
                                        placeholder="立即"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Classes */}
                        <div className="bg-white p-6 rounded-lg border border-stone-300 shadow-sm">
                            <h4 className="font-bold text-stone-800 mb-4 text-lg border-b border-stone-200 pb-2">可用职业</h4>
                            <div className="flex flex-wrap gap-2">
                                {CLASSES.map(cls => (
                                    <button
                                        key={cls}
                                        type="button"
                                        onClick={() => toggleClass(cls)}
                                        className={`px-3 py-1.5 rounded font-bold text-sm border-2 transition-colors ${spell.classes?.includes(cls)
                                            ? 'bg-dndRed text-white border-dndRed'
                                            : 'bg-white text-stone-600 border-stone-300 hover:border-stone-400'
                                            }`}
                                    >
                                        {cls}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Description with Markdown Toolbar */}
                        <div className="bg-white rounded-lg border border-stone-300 shadow-sm overflow-hidden">
                            <h4 className="font-bold text-stone-800 p-4 text-lg border-b border-stone-200">法术描述</h4>
                            <MarkdownToolbar
                                textareaRef={descriptionRef}
                                onInsert={(text) => updateField('description', text)}
                            />
                            <textarea
                                ref={descriptionRef}
                                value={spell.description || ''}
                                onChange={e => updateField('description', e.target.value)}
                                className="w-full p-4 min-h-[200px] resize-y focus:outline-none font-mono text-sm"
                                placeholder="在此输入法术描述...&#10;&#10;支持 Markdown 格式：&#10;**加粗** 用于效应名称&#10;*斜体* 用于引用法术或状态&#10;|表格| 用于数据展示"
                            />
                            <div className="p-4 bg-stone-50 border-t border-stone-200">
                                <h5 className="text-xs font-bold text-stone-500 mb-2">描述预览：</h5>
                                <div className="bg-white p-3 rounded border border-stone-200 text-sm">
                                    <RichText text={spell.description || '*暂无描述*'} />
                                </div>
                            </div>
                        </div>

                        {/* Higher Level */}
                        <div className="bg-white rounded-lg border border-stone-300 shadow-sm overflow-hidden">
                            <h4 className="font-bold text-stone-800 p-4 text-lg border-b border-stone-200">
                                升环施法效果
                                <span className="text-xs font-normal text-stone-400 ml-2">(可选，留空则不显示)</span>
                            </h4>
                            <MarkdownToolbar
                                textareaRef={higherLevelRef}
                                onInsert={(text) => updateField('higherLevel', text)}
                            />
                            <textarea
                                ref={higherLevelRef}
                                value={spell.higherLevel || ''}
                                onChange={e => updateField('higherLevel', e.target.value)}
                                className="w-full p-4 min-h-[80px] resize-y focus:outline-none font-mono text-sm"
                                placeholder="当你使用更高环阶的法术位施展此法术时..."
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t-2 border-stone-200 bg-white flex justify-end gap-3">
                <button
                    onClick={onCancel}
                    className="px-6 py-2 border-2 border-stone-300 rounded-lg font-bold text-stone-600 hover:bg-stone-100 transition-colors"
                >
                    取消
                </button>
                <button
                    onClick={handleSave}
                    className="px-6 py-2 bg-dndRed border-2 border-dndRed rounded-lg font-bold text-white hover:bg-red-700 transition-colors flex items-center gap-2"
                >
                    <Check className="w-5 h-5" />
                    保存法术
                </button>
            </div>
        </div>
    );
};

export default CustomSpellEditor;
