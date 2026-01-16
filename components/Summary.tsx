
import React from 'react';
import { CharacterData } from '../types';
import { CLASSES as CLASSES_DATA } from '../data';
import { FileCode } from 'lucide-react';
import { getProficiencyBonus, formatModifier } from '../utils/rules';

interface Props {
  character: CharacterData;
}

const Summary: React.FC<Props> = ({ character }) => {
  const proficiencyBonus = getProficiencyBonus(character.level);
  const classData = CLASSES_DATA[character.className];

  // Format Class String (e.g. "Fighter 5 (Champion)")
  const classString = `${character.className} Lv.${character.level}${character.subclass ? ` (${character.subclass})` : ''}`;

  const generateHTML = () => {
    const proficiencyBonus = getProficiencyBonus(character.level);
    
    const classData = CLASSES_DATA[character.className];
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
      const modStr = formatModifier(val as number, true);
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
      <div class="label-val"><span class="lbl">先攻</span><span class="val">${formatModifier(character.abilities.dexterity, true)}</span></div>
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

  return (
    <div className="bg-white p-8 rounded-lg shadow-2xl border-4 border-stone-600 max-w-2xl mx-auto mt-8 relative overflow-hidden">
      {/* Decorative Border Corners */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-dndRed rounded-tl-lg"></div>
      <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-dndRed rounded-tr-lg"></div>
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-dndRed rounded-bl-lg"></div>
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-dndRed rounded-br-lg"></div>

      {/* Header */}
      <div className="flex justify-between items-end border-b-2 border-stone-300 pb-4 mb-6">
        <div>
          <h1 className="text-4xl font-bold text-dndRed">{character.name || "无名氏"}</h1>
          <div className="text-stone-600 mt-1 flex flex-col gap-1">
            <span className="font-bold text-lg">{character.race || "种族"}</span>
            <span className="text-stone-800">{classString}</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-stone-500">等级: {character.level}</div>
          <div className="text-sm text-stone-500">背景: {character.background || "无"}</div>
          <div className="text-sm text-stone-500">阵营: {character.alignment || "无"}</div>
          <div className="text-sm text-stone-500">玩家: {character.playerName || "无"}</div>
        </div>
      </div>

      {/* Core Stats */}
      <div className="grid grid-cols-6 gap-2 mb-6 text-center">
        {[
          { k: 'strength', l: '力量' }, { k: 'dexterity', l: '敏捷' }, { k: 'constitution', l: '体质' },
          { k: 'intelligence', l: '智力' }, { k: 'wisdom', l: '感知' }, { k: 'charisma', l: '魅力' }
        ].map((stat: any) => (
          <div key={stat.k} className="flex flex-col items-center">
             <div className="text-xs font-bold text-stone-500 mb-1">{stat.l}</div>
             <div className="text-xl font-bold text-stone-800">{character.abilities[stat.k as keyof typeof character.abilities]}</div>
             <div className="text-sm font-bold text-white bg-stone-700 rounded-full w-8 h-8 flex items-center justify-center mt-1">
               {formatModifier(character.abilities[stat.k as keyof typeof character.abilities], true)}
             </div>
          </div>
        ))}
      </div>

      {/* Prof & HP */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-stone-100 p-4 rounded border border-stone-200">
           <div className="flex justify-between items-center mb-2">
             <span className="font-bold text-stone-700">熟练加值</span>
             <span className="font-bold text-xl">+{proficiencyBonus}</span>
           </div>
           {classData && (
             <div className="text-sm text-stone-600">
               <span className="font-bold block mb-1">豁免熟练:</span>
               {classData.saves.join('、')}
             </div>
           )}
        </div>
        <div className="bg-stone-100 p-4 rounded border border-stone-200">
           <div className="flex justify-between items-center">
             <span className="font-bold text-stone-700">生命值上限</span>
             <span className="font-bold text-xl">{character.hpMax}</span>
           </div>
           <div className="text-xs text-stone-500 mt-2">
             生命骰: {character.level}{classData?.hitDie || "d8"}
           </div>
        </div>
      </div>

      {/* Features - Simplified preview */}
      <div>
        <h3 className="text-lg font-bold text-dndRed border-b border-stone-300 mb-3 pb-1">特性概览</h3>
        <p className="text-sm text-stone-500 italic">请前往“职业详情”页面查看完整特性列表。</p>
      </div>

      {/* Export Action */}
      <div className="mt-8 flex justify-center border-t border-stone-200 pt-6">
        <button 
          onClick={generateHTML}
          className="flex items-center gap-2 bg-stone-800 text-white px-6 py-2 rounded font-bold hover:bg-stone-700 transition-colors shadow-lg"
        >
          <FileCode className="w-5 h-5" /> 导出精美 HTML 角色卡
        </button>
      </div>

    </div>
  );
};

export default Summary;
