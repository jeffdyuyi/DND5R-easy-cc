
import React, { useState } from 'react';
import { CharacterData, ClassItem, SpeciesItem, BackgroundItem, SubclassItem, FeatItem, ItemItem } from '../types';
import TabStats from './TabStats';
import TabCombat from './TabCombat';
import TabClass from './TabClass';
import TabOrigin from './TabOrigin';
import TabBio from './TabBio';
import TabInventory from './TabInventory';
import TabAdventure from './TabAdventure';
import {
  Shield, Activity, Scroll, Crown,
  Backpack, Sword, BookOpen, Skull, ArrowLeft, FileCode
} from 'lucide-react';
import { getModifier, getProficiencyBonus, formatModifier } from '../utils/rules';

interface Props {
  character: CharacterData;
  updateCharacter: (updates: Partial<CharacterData>) => void;
  onBack?: () => void;
  // Libraries injected from Parent
  libraryClasses: ClassItem[];
  librarySubclasses: SubclassItem[];
  librarySpecies: SpeciesItem[];
  libraryBackgrounds: BackgroundItem[];
  libraryFeats: FeatItem[];
  libraryTools: ItemItem[];
}

const TABS = [
  { id: 'stats', label: '属性与技能', icon: <Activity className="w-4 h-4" /> },
  { id: 'combat', label: '战斗参数', icon: <Skull className="w-4 h-4" /> },
  { id: 'class', label: '职业详情', icon: <Shield className="w-4 h-4" /> },
  { id: 'origin', label: '角色起源', icon: <Crown className="w-4 h-4" /> },
  { id: 'inventory', label: '行囊背包', icon: <Backpack className="w-4 h-4" /> },
  { id: 'bio', label: '角色故事', icon: <BookOpen className="w-4 h-4" /> },
  { id: 'adventure', label: '冒险日志', icon: <Sword className="w-4 h-4" /> },
];

export const CharacterSheet: React.FC<Props> = ({
  character,
  updateCharacter,
  onBack,
  libraryClasses,
  librarySubclasses,
  librarySpecies,
  libraryBackgrounds,
  libraryFeats,
  libraryTools
}) => {
  const [activeTab, setActiveTab] = useState('stats');

  const generateHTML = () => {
    const proficiencyBonus = getProficiencyBonus(character.level);

    const classData = libraryClasses.find(c => c.name === character.className);
    const classString = `${character.className} Lv.${character.level}${character.subclass ? ` (${character.subclass})` : ''}`;

    const htmlContent = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<title>${character.name} - 角色卡</title>
<style>
  body { font-family: 'Georgia', serif; background-color: #f3f4f6; color: #1c1917; padding: 40px; }
  .card { max-width: 800px; margin: 0 auto; background: white; padding: 40px; border-radius: 8px; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); border: 1px solid #d6d3d1; position: relative; overflow: hidden; }
  .header { display: flex; justify-content: space-between; border-bottom: 2px solid #b91c1c; padding-bottom: 20px; margin-bottom: 30px; }
  .title h1 { margin: 0; font-size: 32px; color: #b91c1c; }
  .sub-title { font-size: 18px; color: #44403c; margin-top: 5px; font-weight: bold; }
  .meta { text-align: right; font-size: 14px; color: #78716c; line-height: 1.6; }
  .stats-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 10px; margin-bottom: 30px; text-align: center; }
  .stat-box { border: 1px solid #e7e5e4; padding: 10px; border-radius: 6px; background: #fafaf9; }
  .stat-label { font-size: 10px; text-transform: uppercase; font-weight: bold; color: #78716c; margin-bottom: 5px; }
  .stat-val { font-size: 24px; font-weight: bold; color: #1c1917; }
  .stat-mod { display: inline-block; background: #292524; color: white; border-radius: 50%; width: 28px; height: 28px; line-height: 28px; font-size: 14px; font-weight: bold; margin-top: 5px; }
  .section-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px; }
  .info-box { background: #f5f5f4; padding: 15px; border-radius: 6px; border: 1px solid #e7e5e4; }
  .label-val { display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px; }
  .lbl { font-weight: bold; color: #44403c; font-size: 14px; }
  .val { font-weight: bold; font-size: 18px; color: #1c1917; }
  .detail-text { font-size: 12px; color: #57534e; line-height: 1.5; }
  .section-title { font-size: 16px; font-weight: bold; color: #b91c1c; border-bottom: 1px solid #e7e5e4; padding-bottom: 5px; margin-bottom: 15px; }
  .tag { display: inline-block; padding: 2px 6px; background: #e5e7eb; border-radius: 4px; font-size: 10px; margin-right: 5px; font-weight: bold; }
  ul { margin: 5px 0; padding-left: 20px; }
  li { margin-bottom: 3px; font-size: 13px; }
  .corner { position: absolute; width: 30px; height: 30px; border: 4px solid #b91c1c; }
  .tl { top: 0; left: 0; border-right: none; border-bottom: none; border-radius: 8px 0 0 0; }
  .tr { top: 0; right: 0; border-left: none; border-bottom: none; border-radius: 0 8px 0 0; }
  .bl { bottom: 0; left: 0; border-right: none; border-top: none; border-radius: 0 0 0 8px; }
  .br { bottom: 0; right: 0; border-left: none; border-top: none; border-radius: 0 0 8px 0; }
  @media print { body { background: white; padding: 0; } .card { box-shadow: none; border: none; } button { display: none; } }
</style>
</head>
<body>
<div class="card">
  <div class="corner tl"></div><div class="corner tr"></div><div class="corner bl"></div><div class="corner br"></div>
  <div class="header">
    <div class="title">
      <h1>${character.name || "无名氏"}</h1>
      <div class="sub-title">${character.race || "种族"} | ${classString}</div>
    </div>
    <div class="meta">
      <div>背景: ${character.background || "-"}</div>
      <div>阵营: ${character.alignment || "-"}</div>
      <div>玩家: ${character.playerName || "-"}</div>
    </div>
  </div>

  <div class="stats-grid">
    ${Object.entries(character.abilities).map(([key, val]) => {
      const labelMap: any = { strength: '力量', dexterity: '敏捷', constitution: '体质', intelligence: '智力', wisdom: '感知', charisma: '魅力' };
      const mod = getModifier(val as number);
      const modStr = formatModifier(mod);
      return `
      <div class="stat-box">
        <div class="stat-label">${labelMap[key]}</div>
        <div class="stat-val">${val}</div>
        <div class="stat-mod">${modStr}</div>
      </div>`;
    }).join('')}
  </div>

  <div class="section-row">
    <div class="info-box">
      <div class="label-val"><span class="lbl">熟练加值</span><span class="val">+${proficiencyBonus}</span></div>
      <div class="label-val"><span class="lbl">护甲等级 (AC)</span><span class="val">?</span></div>
      <div class="label-val"><span class="lbl">先攻</span><span class="val">${formatModifier(getModifier(character.abilities.dexterity))}</span></div>
      <div class="label-val"><span class="lbl">速度</span><span class="val">30 尺</span></div>
      <div class="detail-text" style="margin-top: 10px;">
        <strong>豁免熟练:</strong> ${classData?.saves.join('、') || '-'}
      </div>
    </div>
    <div class="info-box">
      <div class="label-val"><span class="lbl">生命值上限</span><span class="val">${character.hpMax}</span></div>
      <div class="label-val"><span class="lbl">当前生命</span><span class="val">________</span></div>
      <div class="label-val"><span class="lbl">临时生命</span><span class="val">________</span></div>
      <div class="detail-text" style="margin-top: 10px;">
        <strong>生命骰:</strong> ${character.level}${classData?.hitDie || "d8"}
      </div>
    </div>
  </div>

  <div class="section-title">技能与特性</div>
  <div style="font-size: 13px; line-height: 1.6; margin-bottom: 20px;">
    <p><strong>熟练技能:</strong> ${Object.keys(character.skillMastery).filter(k => character.skillMastery[k] > 0).join('、') || "无"}</p>
    <p><strong>语言:</strong> ${character.languages || "无"}</p>
    <p><strong>起源专长:</strong> ${character.originFeat || "无"}</p>
  </div>

  <div class="section-title">装备与财富</div>
  <div style="font-size: 13px; margin-bottom: 20px;">
    <p><strong>财富:</strong> ${character.gold} GP, ${character.silver} SP, ${character.copper} CP</p>
    <p><strong>武器:</strong> ${character.inventoryWeapons.map(i => i.name).join(', ') || "无"}</p>
    <p><strong>护甲:</strong> ${character.inventoryArmor.map(i => i.name).join(', ') || "无"}</p>
    <p><strong>其他:</strong> ${character.inventoryGear.map(i => i.name).join(', ') || "无"}</p>
  </div>

  <div class="section-title">背景故事</div>
  <div style="font-size: 13px; line-height: 1.6; color: #444;">
    ${character.backstory ? character.backstory.replace(/\n/g, '<br/>') : "暂无背景故事..."}
  </div>
  
  <div style="text-align: center; margin-top: 40px; font-size: 10px; color: #a8a29e;">
    Generated by 不咕鸟 DND5R Builder
  </div>
</div>
<script>window.print()</script>
</body>
</html>
    `;
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${character.name}_character_sheet.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'stats': return <TabStats character={character} updateCharacter={updateCharacter} setActiveTab={setActiveTab} libraryClasses={libraryClasses} />;
      case 'combat': return <TabCombat character={character} updateCharacter={updateCharacter} libraryClasses={libraryClasses} librarySpecies={librarySpecies} />;
      case 'class': return <TabClass character={character} updateCharacter={updateCharacter} libraryClasses={libraryClasses} librarySubclasses={librarySubclasses} libraryFeats={libraryFeats} />;
      case 'origin': return <TabOrigin character={character} updateCharacter={updateCharacter} librarySpecies={librarySpecies} libraryBackgrounds={libraryBackgrounds} libraryFeats={libraryFeats} />;
      case 'inventory': return <TabInventory character={character} updateCharacter={updateCharacter} libraryTools={libraryTools} />;
      case 'bio': return <TabBio character={character} updateCharacter={updateCharacter} />;
      case 'adventure': return <TabAdventure character={character} updateCharacter={updateCharacter} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-stone-900 pb-12">
      {/* Internal Navigation Bar for Character Sheet */}
      <div className="bg-white sticky top-0 z-40 border-b border-stone-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center py-3">
            <div className="flex items-center gap-4">
              {onBack && (
                <button onClick={onBack} className="text-stone-500 hover:text-dndRed flex items-center gap-1 text-sm font-bold">
                  <ArrowLeft className="w-4 h-4" /> 角色库
                </button>
              )}
              <div className="h-6 w-px bg-stone-300"></div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-xl text-stone-800">{character.name || "未命名角色"}</span>
                <span className="text-sm bg-stone-100 px-2 py-0.5 rounded text-stone-500">Lv {character.level}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={generateHTML}
                className="text-xs bg-stone-800 hover:bg-stone-700 text-white px-3 py-1.5 rounded font-bold shadow transition-colors border border-stone-900 flex items-center gap-2"
              >
                <FileCode className="w-4 h-4" /> 导出 HTML
              </button>
              <button
                onClick={() => {
                  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(character, null, 2));
                  const downloadAnchorNode = document.createElement('a');
                  downloadAnchorNode.setAttribute("href", dataStr);
                  downloadAnchorNode.setAttribute("download", character.name + ".json");
                  document.body.appendChild(downloadAnchorNode);
                  downloadAnchorNode.click();
                  downloadAnchorNode.remove();
                }}
                className="text-xs bg-yellow-600 hover:bg-yellow-500 text-white px-3 py-1.5 rounded font-bold shadow transition-colors border border-yellow-700 flex items-center gap-2"
              >
                <Scroll className="w-4 h-4" /> 导出 JSON
              </button>
            </div>
          </div>

          <div className="flex space-x-1 overflow-x-auto scrollbar-hide">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center gap-2 px-4 py-3 text-sm font-bold whitespace-nowrap border-b-4 transition-all
                  ${activeTab === tab.id
                    ? 'border-dndRed text-dndRed bg-stone-50'
                    : 'border-transparent hover:bg-stone-50 hover:text-stone-900'}
                `}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white min-h-[calc(100vh-12rem)] relative animate-fade-in">
          {renderTabContent()}
        </div>
      </main>
    </div>
  );
};
