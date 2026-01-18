
import React, { useState } from 'react';
import { CharacterData } from '../types';
import WizardLayout from './wizard/WizardLayout';
import { User, FileText, Heart, Palette, Users, Swords, Building2, Plus, Trash2 } from 'lucide-react';

interface Props {
  character: CharacterData;
  updateCharacter: (updates: Partial<CharacterData>) => void;
}

type NotesTab = 'organizations' | 'allies' | 'enemies' | 'backstory' | 'other';

const StepDetails: React.FC<Props> = ({ character, updateCharacter }) => {
  const [activeTab, setActiveTab] = useState<NotesTab>('backstory');

  // Notes helpers
  const notesStructured = character.notesStructured || {
    organizations: [],
    allies: [],
    enemies: [],
    other: [],
  };

  const addNoteEntry = (type: 'organizations' | 'allies' | 'enemies' | 'other') => {
    const newEntry = { name: '', description: '' };
    updateCharacter({
      notesStructured: {
        ...notesStructured,
        [type]: [...notesStructured[type], newEntry],
      },
    });
  };

  const updateNoteEntry = (type: 'organizations' | 'allies' | 'enemies' | 'other', index: number, field: 'name' | 'description', value: string) => {
    const updated = [...notesStructured[type]];
    updated[index] = { ...updated[index], [field]: value };
    updateCharacter({
      notesStructured: {
        ...notesStructured,
        [type]: updated,
      },
    });
  };

  const removeNoteEntry = (type: 'organizations' | 'allies' | 'enemies' | 'other', index: number) => {
    const updated = notesStructured[type].filter((_, i) => i !== index);
    updateCharacter({
      notesStructured: {
        ...notesStructured,
        [type]: updated,
      },
    });
  };

  // === LEFT PANEL: You & Notes ===
  const leftPanel = (
    <div className="p-4 space-y-4">
      {/* You Section */}
      <div className="space-y-3">
        <h3 className="font-bold text-stone-700 text-sm flex items-center gap-2">
          <User className="w-4 h-4" /> 基本信息
        </h3>

        <div className="space-y-3 bg-white p-4 rounded-lg border border-stone-200">
          <div>
            <label className="block text-xs font-bold text-stone-500 mb-1">角色姓名 *</label>
            <input
              type="text"
              value={character.name}
              onChange={(e) => updateCharacter({ name: e.target.value })}
              placeholder="例如：加里安·影行者"
              className="w-full p-2 bg-stone-50 border border-stone-300 rounded focus:ring-2 focus:ring-dndRed focus:outline-none text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-500 mb-1">玩家姓名</label>
            <input
              type="text"
              value={character.playerName}
              onChange={(e) => updateCharacter({ playerName: e.target.value })}
              placeholder="你的名字"
              className="w-full p-2 bg-stone-50 border border-stone-300 rounded focus:ring-2 focus:ring-dndRed focus:outline-none text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-500 mb-1">代词</label>
            <input
              type="text"
              value={character.pronouns || ''}
              onChange={(e) => updateCharacter({ pronouns: e.target.value })}
              placeholder="他/他的、她/她的..."
              className="w-full p-2 bg-stone-50 border border-stone-300 rounded focus:ring-2 focus:ring-dndRed focus:outline-none text-sm"
            />
          </div>
        </div>
      </div>

      {/* Notes Section with Tabs */}
      <div className="space-y-3">
        <h3 className="font-bold text-stone-700 text-sm flex items-center gap-2">
          <FileText className="w-4 h-4" /> 笔记
        </h3>

        {/* Tab Buttons */}
        <div className="flex flex-wrap gap-1">
          {[
            { key: 'backstory', label: '背景故事', icon: FileText },
            { key: 'organizations', label: '组织', icon: Building2 },
            { key: 'allies', label: '盟友', icon: Users },
            { key: 'enemies', label: '敌人', icon: Swords },
            { key: 'other', label: '其他', icon: FileText },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as NotesTab)}
              className={`px-3 py-1.5 rounded text-xs font-bold transition-all flex items-center gap-1 ${activeTab === tab.key
                  ? 'bg-dndRed text-white'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
            >
              <tab.icon className="w-3 h-3" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white p-4 rounded-lg border border-stone-200 min-h-[200px]">
          {activeTab === 'backstory' ? (
            <textarea
              value={character.backstory || ''}
              onChange={e => updateCharacter({ backstory: e.target.value })}
              placeholder="你的角色来自何方？经历过什么？为何踏上冒险之路？"
              rows={8}
              className="w-full p-2 bg-stone-50 border border-stone-200 rounded text-sm focus:ring-2 focus:ring-dndRed focus:outline-none"
            />
          ) : (
            <div className="space-y-3">
              {notesStructured[activeTab]?.map((entry, idx) => (
                <div key={idx} className="bg-stone-50 p-3 rounded border border-stone-200 space-y-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={entry.name}
                      onChange={e => updateNoteEntry(activeTab, idx, 'name', e.target.value)}
                      placeholder="名称..."
                      className="flex-1 p-2 border border-stone-300 rounded text-sm font-bold"
                    />
                    <button
                      onClick={() => removeNoteEntry(activeTab, idx)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <textarea
                    value={entry.description}
                    onChange={e => updateNoteEntry(activeTab, idx, 'description', e.target.value)}
                    placeholder="描述..."
                    rows={2}
                    className="w-full p-2 border border-stone-300 rounded text-sm"
                  />
                </div>
              ))}
              <button
                onClick={() => addNoteEntry(activeTab)}
                className="w-full p-3 border-2 border-dashed border-stone-300 rounded text-stone-500 hover:bg-stone-50 flex items-center justify-center gap-2 text-sm"
              >
                <Plus className="w-4 h-4" /> 添加条目
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // === RIGHT PANEL: Physical & Personal Characteristics ===
  const rightPanel = (
    <div className="p-6 space-y-6">
      {/* Physical Characteristics */}
      <div className="space-y-4">
        <h3 className="font-bold text-stone-700 flex items-center gap-2">
          <Palette className="w-4 h-4" /> 外貌特征
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { key: 'gender', label: '性别' },
            { key: 'age', label: '年龄' },
            { key: 'height', label: '身高' },
            { key: 'weight', label: '体重' },
            { key: 'hair', label: '发色' },
            { key: 'skin', label: '肤色' },
            { key: 'eyes', label: '眼睛' },
          ].map(field => (
            <div key={field.key}>
              <label className="block text-xs font-bold text-stone-500 mb-1">{field.label}</label>
              <input
                type="text"
                value={(character as any)[field.key] || ''}
                onChange={(e) => updateCharacter({ [field.key]: e.target.value })}
                className="w-full p-2 bg-stone-50 border border-stone-300 rounded text-sm focus:ring-2 focus:ring-dndRed focus:outline-none"
              />
            </div>
          ))}
        </div>
        <div>
          <label className="block text-xs font-bold text-stone-500 mb-1">外貌描述</label>
          <textarea
            value={character.appearance || ''}
            onChange={(e) => updateCharacter({ appearance: e.target.value })}
            placeholder="描述你角色的外表特征、穿着风格等..."
            rows={2}
            className="w-full p-2 bg-stone-50 border border-stone-300 rounded text-sm focus:ring-2 focus:ring-dndRed focus:outline-none"
          />
        </div>
      </div>

      {/* Personal Characteristics */}
      <div className="space-y-4">
        <h3 className="font-bold text-stone-700 flex items-center gap-2">
          <Heart className="w-4 h-4" /> 性格特征
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { key: 'personalityTraits', label: '人格特质', placeholder: '两到三个特点...' },
            { key: 'ideals', label: '理念', placeholder: '驱动你行动的信念...' },
            { key: 'bonds', label: '羁绊', placeholder: '与人或地方的联系...' },
            { key: 'flaws', label: '缺点', placeholder: '弱点或恶习...' },
          ].map(field => (
            <div key={field.key}>
              <label className="block text-xs font-bold text-stone-500 mb-1">{field.label}</label>
              <textarea
                value={(character as any)[field.key] || ''}
                onChange={(e) => updateCharacter({ [field.key]: e.target.value })}
                placeholder={field.placeholder}
                rows={2}
                className="w-full p-2 bg-stone-50 border border-stone-300 rounded text-sm focus:ring-2 focus:ring-dndRed focus:outline-none"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Character Summary */}
      <div className="bg-stone-100 p-4 rounded-lg border border-stone-200">
        <h4 className="text-xs font-bold text-stone-500 uppercase mb-3">角色概览</h4>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex justify-between">
            <span className="text-stone-500">职业</span>
            <span className="font-medium text-stone-800">{character.className || '未选择'} Lv.{character.level}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">种族</span>
            <span className="font-medium text-stone-800">{character.race || '未选择'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">背景</span>
            <span className="font-medium text-stone-800">{character.background || '未选择'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">阵营</span>
            <span className="font-medium text-stone-800">{character.alignment || '未选择'}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <WizardLayout
      title="角色细节"
      stepId={7}
      totalSteps={8}
      leftPanel={leftPanel}
      rightPanel={rightPanel}
    />
  );
};

export default StepDetails;