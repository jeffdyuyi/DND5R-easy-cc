
import React, { useMemo, useRef, useEffect, useState } from 'react';
import { CharacterData } from '../types';
import { useLibrary } from '../contexts/LibraryContext';
import { FileCode, FileText, Printer } from 'lucide-react';
import { getModifier, getProficiencyBonus, formatModifier } from '../utils/rules';

interface Props {
  character: CharacterData;
}

// === Skill mapping (same as TabStats) ===
const SKILLS_BY_ABILITY: Record<string, string[]> = {
  strength: ["运动"],
  dexterity: ["杂技", "巧手", "隐匿"],
  constitution: [],
  intelligence: ["奥秘", "历史", "调查", "自然", "宗教"],
  wisdom: ["驯兽", "洞悉", "医药", "察觉", "求生"],
  charisma: ["欺瞒", "威吓", "表演", "游说"]
};

const ABILITY_LABELS: Record<string, string> = {
  strength: '力量 STR', dexterity: '敏捷 DEX', constitution: '体质 CON',
  intelligence: '智力 INT', wisdom: '感知 WIS', charisma: '魅力 CHA'
};
const ABILITY_LABELS_CN: Record<string, string> = {
  strength: '力量', dexterity: '敏捷', constitution: '体质',
  intelligence: '智力', wisdom: '感知', charisma: '魅力'
};

const ORDERED_ABILITIES = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'] as const;

// === AC Calculation Helper ===
function calcAC(character: CharacterData): number {
  const dexMod = getModifier(character.abilities.dexterity + (character.abilityBonuses?.dexterity || 0) + (character.backgroundBonuses?.dexterity || 0));
  const equippedArmor = character.inventoryArmor?.find(a => a.isEquipped);

  if (!equippedArmor || !equippedArmor.ac) {
    return 10 + dexMod; // No armor
  }

  const acStr = equippedArmor.ac;
  // Parse AC strings like "11 + 敏捷修正", "14 + 敏捷修正（至多+2）", "18"
  const baseMatch = acStr.match(/^(\d+)/);
  const baseAC = baseMatch ? parseInt(baseMatch[1]) : 10;
  const hasDex = acStr.includes('敏捷');
  const capMatch = acStr.match(/至多\+?(\d+)/);
  const cap = capMatch ? parseInt(capMatch[1]) : undefined;

  if (!hasDex) return baseAC;
  if (cap !== undefined) return baseAC + Math.min(dexMod, cap);
  return baseAC + dexMod;
}

// === Unified HTML Card Generator ===
function generateCardHTML(character: CharacterData, libraryClasses: any[], librarySpecies: any[]): string {
  const profBonus = getProficiencyBonus(character.level);
  const classData = libraryClasses.find(c => c.name === character.className);
  const speciesData = librarySpecies.find(sp => sp.name === character.race);
  const ac = calcAC(character);
  const speed = speciesData?.speed || 30;

  const classString = `${character.className} Lv.${character.level}${character.subclass ? ` · ${character.subclass}` : ''}`;

  // Total ability scores
  const totalScore = (key: string) => {
    const base = (character.abilities as any)[key] || 10;
    const bonus = (character.abilityBonuses as any)?.[key] || 0;
    const bgBonus = (character.backgroundBonuses as any)?.[key] || 0;
    return base + bonus + bgBonus;
  };

  // Saving throw check
  const isSaveProf = (key: string) => {
    return classData?.saves.includes(ABILITY_LABELS_CN[key]) || false;
  };

  // Build skill rows
  const allSkills: { name: string; abilityKey: string; mod: number; profLevel: number }[] = [];
  for (const [abilityKey, skills] of Object.entries(SKILLS_BY_ABILITY)) {
    const abilityMod = getModifier(totalScore(abilityKey));
    for (const skill of skills) {
      const level = character.skillMastery?.[skill] || 0;
      let bonus = 0;
      if (level === 1) bonus = profBonus;
      else if (level === 2) bonus = profBonus * 2;
      allSkills.push({ name: skill, abilityKey, mod: abilityMod + bonus, profLevel: level });
    }
  }

  // Build spells info
  const hasSpellcasting = character.spellcastingAbility && character.spellcastingAbility !== '';
  const spellsByLevel: Record<string, string[]> = {};
  if (hasSpellcasting) {
    const spellKeys = ['cantrips', 'level1', 'level2', 'level3', 'level4', 'level5', 'level6', 'level7', 'level8', 'level9'] as const;
    const levelLabels = ['戏法', '1环', '2环', '3环', '4环', '5环', '6环', '7环', '8环', '9环'];
    spellKeys.forEach((key, idx) => {
      const val = (character.spells as any)?.[key];
      if (val && typeof val === 'string' && val.trim()) {
        spellsByLevel[levelLabels[idx]] = val.split(/[,，、]/).map((s: string) => s.trim()).filter(Boolean);
      }
    });
  }

  // Personality fields
  const personalityTraits = character.personalityTraits || '';
  const ideals = character.ideals || '';
  const bonds = character.bonds || '';
  const flaws = character.flaws || '';

  // Equipment
  const weapons = character.inventoryWeapons || [];
  const armor = character.inventoryArmor || [];
  const gear = character.inventoryGear || [];

  // Class features for current level
  const features = (classData?.features || []).filter((f: any) => f.level <= character.level).sort((a: any, b: any) => a.level - b.level);

  // Subclass features
  const subclassData = classData?.subclasses?.find((sc: any) => sc.name === character.subclass);
  const subFeatures = (subclassData?.features || []).filter((f: any) => f.level <= character.level).sort((a: any, b: any) => a.level - b.level);

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${character.name || '无名氏'} — 角色卡</title>
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Noto+Serif+SC:wght@400;700;900&display=swap" rel="stylesheet">
<style>
  :root {
    --dnd-red: #7f1d1d;
    --dnd-gold: #b8860b;
    --parchment: #faf6ed;
    --ink: #1c1917;
    --muted: #78716c;
    --border: #c8bfa9;
    --section-bg: #f5f0e6;
  }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: 'Noto Serif SC', 'Georgia', serif;
    background: #e8e0d0;
    color: var(--ink);
    padding: 20px;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .sheet {
    max-width: 900px;
    margin: 0 auto;
    background: var(--parchment);
    border: 3px solid var(--dnd-red);
    border-radius: 4px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.18), inset 0 0 80px rgba(200,191,169,0.3);
    position: relative;
    overflow: hidden;
  }
  .sheet::before {
    content: '';
    position: absolute;
    inset: 6px;
    border: 1px solid var(--border);
    border-radius: 2px;
    pointer-events: none;
    z-index: 1;
  }

  /* === HEADER === */
  .header {
    background: linear-gradient(135deg, var(--dnd-red) 0%, #991b1b 50%, #7f1d1d 100%);
    color: white;
    padding: 24px 28px;
    position: relative;
    z-index: 2;
  }
  .header::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--dnd-gold), #d4a843, var(--dnd-gold));
  }
  .header-main { display: flex; justify-content: space-between; align-items: flex-start; }
  .char-name {
    font-family: 'Cinzel', 'Noto Serif SC', serif;
    font-size: 36px;
    font-weight: 900;
    letter-spacing: 2px;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.4);
    line-height: 1.1;
  }
  .char-subtitle {
    font-size: 15px;
    opacity: 0.9;
    margin-top: 6px;
    font-weight: 400;
    letter-spacing: 1px;
  }
  .header-meta {
    text-align: right;
    font-size: 12px;
    opacity: 0.85;
    line-height: 1.8;
  }
  .header-meta strong { opacity: 1; }

  /* === CONTENT BODY === */
  .content { padding: 20px 24px; position: relative; z-index: 2; }

  /* === STATS ROW === */
  .stats-row {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 8px;
    margin-bottom: 16px;
  }
  .stat-cell {
    text-align: center;
    border: 2px solid var(--border);
    border-radius: 4px;
    padding: 8px 4px;
    background: white;
    position: relative;
  }
  .stat-label {
    font-size: 9px;
    font-weight: 900;
    text-transform: uppercase;
    color: var(--muted);
    letter-spacing: 1px;
    margin-bottom: 4px;
  }
  .stat-score {
    font-family: 'Cinzel', serif;
    font-size: 28px;
    font-weight: 900;
    color: var(--ink);
    line-height: 1;
  }
  .stat-mod {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background: var(--dnd-red);
    color: white;
    border-radius: 50%;
    font-size: 14px;
    font-weight: 700;
    margin-top: 6px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  }

  /* === COMBAT BAR === */
  .combat-bar {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 8px;
    margin-bottom: 16px;
    background: var(--section-bg);
    padding: 12px;
    border-radius: 4px;
    border: 1px solid var(--border);
  }
  .combat-cell {
    text-align: center;
    background: white;
    padding: 10px 6px;
    border-radius: 4px;
    border: 1px solid var(--border);
  }
  .combat-label {
    font-size: 9px;
    font-weight: 900;
    color: var(--muted);
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 4px;
  }
  .combat-val {
    font-family: 'Cinzel', serif;
    font-size: 22px;
    font-weight: 900;
    color: var(--ink);
  }
  .combat-note {
    font-size: 10px;
    color: var(--muted);
    margin-top: 2px;
  }

  /* === TWO COLUMN LAYOUT === */
  .two-col {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 16px;
  }

  /* === SECTION === */
  .section {
    margin-bottom: 14px;
    break-inside: avoid;
  }
  .section-title {
    font-family: 'Cinzel', 'Noto Serif SC', serif;
    font-size: 13px;
    font-weight: 900;
    color: var(--dnd-red);
    text-transform: uppercase;
    letter-spacing: 2px;
    border-bottom: 2px solid var(--dnd-red);
    padding-bottom: 4px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .section-title::before {
    content: '◆';
    font-size: 10px;
  }

  /* === SAVING THROWS === */
  .saves-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 4px;
  }
  .save-row {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 4px 8px;
    font-size: 12px;
    background: white;
    border: 1px solid #e5e2db;
    border-radius: 3px;
  }
  .save-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: 1.5px solid var(--muted);
    flex-shrink: 0;
  }
  .save-dot.filled { background: var(--dnd-red); border-color: var(--dnd-red); }
  .save-name { flex: 1; font-weight: 700; color: var(--ink); }
  .save-val { font-weight: 700; font-family: 'Cinzel', monospace; }

  /* === SKILLS === */
  .skills-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2px;
  }
  .skill-row {
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 3px 6px;
    font-size: 11px;
    border-bottom: 1px solid #ebe8e2;
  }
  .skill-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    border: 1.5px solid #bbb;
    flex-shrink: 0;
  }
  .skill-dot.prof { background: var(--dnd-red); border-color: var(--dnd-red); }
  .skill-dot.expert { background: var(--dnd-gold); border-color: var(--dnd-gold); }
  .skill-name { flex: 1; }
  .skill-name.active { font-weight: 700; color: var(--ink); }
  .skill-name.inactive { color: var(--muted); }
  .skill-val { font-weight: 700; font-family: 'Cinzel', monospace; min-width: 24px; text-align: right; }

  /* === PROFICIENCIES / GENERIC BOX === */
  .info-box {
    background: var(--section-bg);
    border: 1px solid var(--border);
    border-radius: 4px;
    padding: 10px 12px;
    font-size: 12px;
    line-height: 1.6;
    margin-bottom: 10px;
    break-inside: avoid;
  }
  .info-box strong { color: var(--dnd-red); }
  .info-box p { margin-bottom: 4px; }

  /* === PERSONALITY 4 GRID === */
  .personality-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }
  .personality-cell {
    background: white;
    border: 1px solid var(--border);
    border-radius: 4px;
    padding: 10px;
    min-height: 60px;
  }
  .personality-label {
    font-size: 10px;
    font-weight: 900;
    color: var(--dnd-red);
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 4px;
    border-bottom: 1px solid #ebe8e2;
    padding-bottom: 3px;
  }
  .personality-text {
    font-size: 12px;
    color: var(--ink);
    line-height: 1.5;
    white-space: pre-line;
  }

  /* === FEATURES === */
  .feature-item {
    margin-bottom: 8px;
    padding-left: 10px;
    border-left: 3px solid var(--border);
  }
  .feature-name {
    font-weight: 900;
    font-size: 12px;
    color: var(--ink);
  }
  .feature-level {
    display: inline-block;
    background: var(--dnd-red);
    color: white;
    font-size: 9px;
    font-weight: 700;
    padding: 1px 5px;
    border-radius: 3px;
    margin-right: 4px;
    vertical-align: middle;
  }

  /* === EQUIPMENT TABLE === */
  .equip-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 11px;
  }
  .equip-table th {
    background: var(--dnd-red);
    color: white;
    font-size: 9px;
    text-transform: uppercase;
    letter-spacing: 1px;
    padding: 5px 8px;
    text-align: left;
  }
  .equip-table td {
    padding: 4px 8px;
    border-bottom: 1px solid #ebe8e2;
  }
  .equip-table tr:nth-child(even) td { background: #faf8f4; }

  /* === SPELLS === */
  .spell-level-group { margin-bottom: 8px; }
  .spell-level-tag {
    display: inline-block;
    background: var(--dnd-red);
    color: white;
    font-size: 10px;
    font-weight: 700;
    padding: 2px 8px;
    border-radius: 3px;
    margin-bottom: 4px;
  }
  .spell-list {
    font-size: 12px;
    color: var(--ink);
    line-height: 1.5;
    padding-left: 4px;
  }

  /* === FOOTER === */
  .footer {
    background: var(--dnd-red);
    color: rgba(255,255,255,0.7);
    text-align: center;
    padding: 8px;
    font-size: 9px;
    letter-spacing: 2px;
    text-transform: uppercase;
    position: relative;
    z-index: 2;
  }
  .footer::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--dnd-gold), #d4a843, var(--dnd-gold));
  }
  .footer strong { color: white; }

  /* === BACKSTORY === */
  .backstory-text {
    font-size: 12px;
    line-height: 1.7;
    color: #444;
    font-style: italic;
    white-space: pre-line;
    padding: 10px 12px;
    background: white;
    border: 1px solid var(--border);
    border-radius: 4px;
    min-height: 40px;
  }

  /* === WEALTH === */
  .wealth-row {
    display: flex;
    gap: 12px;
    font-size: 12px;
    font-weight: 700;
    padding: 6px 0;
  }
  .wealth-item { display: flex; align-items: center; gap: 4px; }
  .coin {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    font-size: 9px;
    font-weight: 900;
    color: white;
  }
  .coin-gp { background: #b8860b; }
  .coin-sp { background: #9ca3af; }
  .coin-cp { background: #b45309; }
  .coin-pp { background: #6366f1; }

  /* === PRINT === */
  @media print {
    body { background: white !important; padding: 0 !important; }
    .sheet { box-shadow: none !important; border-width: 2px !important; max-width: 100% !important; }
    .no-print { display: none !important; }
  }
</style>
</head>
<body>
<div class="sheet">

  <!-- HEADER -->
  <div class="header">
    <div class="header-main">
      <div>
        <div class="char-name">${character.name || '无名氏'}</div>
        <div class="char-subtitle">${character.race || '种族'}${character.subRace ? ` · ${character.subRace}` : ''} — ${classString}</div>
      </div>
      <div class="header-meta">
        <div><strong>背景</strong> ${character.background || '—'}</div>
        <div><strong>阵营</strong> ${character.alignment || '—'}</div>
        <div><strong>玩家</strong> ${character.playerName || '—'}</div>
        ${character.faith ? `<div><strong>信仰</strong> ${character.faith}</div>` : ''}
      </div>
    </div>
  </div>

  <div class="content">

    <!-- ABILITY SCORES -->
    <div class="stats-row">
      ${ORDERED_ABILITIES.map(key => {
    const total = totalScore(key);
    const mod = getModifier(total);
    return `
        <div class="stat-cell">
          <div class="stat-label">${ABILITY_LABELS[key]}</div>
          <div class="stat-score">${total}</div>
          <div class="stat-mod">${formatModifier(mod)}</div>
        </div>`;
  }).join('')}
    </div>

    <!-- COMBAT BAR -->
    <div class="combat-bar">
      <div class="combat-cell">
        <div class="combat-label">护甲等级</div>
        <div class="combat-val">${ac}</div>
        <div class="combat-note">${character.inventoryArmor?.find(a => a.isEquipped)?.name || '无甲'}</div>
      </div>
      <div class="combat-cell">
        <div class="combat-label">先攻加值</div>
        <div class="combat-val">${formatModifier(getModifier(totalScore('dexterity')))}</div>
      </div>
      <div class="combat-cell">
        <div class="combat-label">速度</div>
        <div class="combat-val">${speed}</div>
        <div class="combat-note">尺</div>
      </div>
      <div class="combat-cell">
        <div class="combat-label">生命值上限</div>
        <div class="combat-val">${character.hpMax}</div>
        <div class="combat-note">生命骰 ${character.level}${classData?.hitDie || 'd8'}</div>
      </div>
      <div class="combat-cell">
        <div class="combat-label">熟练加值</div>
        <div class="combat-val">+${profBonus}</div>
      </div>
    </div>

    <!-- TWO COLUMN: SAVES + SKILLS -->
    <div class="two-col">
      <div>
        <!-- SAVING THROWS -->
        <div class="section">
          <div class="section-title">豁免检定 Saving Throws</div>
          <div class="saves-grid">
            ${ORDERED_ABILITIES.map(key => {
    const mod = getModifier(totalScore(key));
    const prof = isSaveProf(key);
    const saveVal = mod + (prof ? profBonus : 0);
    return `
              <div class="save-row">
                <div class="save-dot ${prof ? 'filled' : ''}"></div>
                <span class="save-name">${ABILITY_LABELS_CN[key]}</span>
                <span class="save-val">${formatModifier(saveVal)}</span>
              </div>`;
  }).join('')}
          </div>
        </div>

        <!-- PROFICIENCIES INFO -->
        <div class="section">
          <div class="section-title">熟练与语言</div>
          <div class="info-box">
            <p><strong>武器 & 护甲：</strong>${classData?.coreTraits?.weaponProficiencies || '—'}${classData?.coreTraits?.armorTraining ? ` / ${classData.coreTraits.armorTraining}` : ''}</p>
            <p><strong>工具：</strong>${character.tools?.map(t => t.name).join('、') || character.toolProficiencies || '—'}</p>
            <p><strong>语言：</strong>${character.languages || '通用语'}</p>
            ${character.originFeat ? `<p><strong>起源专长：</strong>${character.originFeat}</p>` : ''}
          </div>
        </div>
      </div>
      <div>
        <!-- SKILLS -->
        <div class="section">
          <div class="section-title">技能检定 Skills</div>
          <div class="skills-grid">
            ${allSkills.map(s => {
    const dotClass = s.profLevel === 2 ? 'expert' : s.profLevel === 1 ? 'prof' : '';
    const nameClass = s.profLevel > 0 ? 'active' : 'inactive';
    const abbrMap: Record<string, string> = { strength: '力', dexterity: '敏', constitution: '体', intelligence: '智', wisdom: '感', charisma: '魅' };
    return `
              <div class="skill-row">
                <div class="skill-dot ${dotClass}"></div>
                <span class="skill-name ${nameClass}">${s.name}</span>
                <span style="font-size:9px;color:#999;margin-right:2px">${abbrMap[s.abilityKey]}</span>
                <span class="skill-val">${formatModifier(s.mod)}</span>
              </div>`;
  }).join('')}
          </div>
        </div>
      </div>
    </div>

    <!-- PERSONALITY -->
    ${(personalityTraits || ideals || bonds || flaws) ? `
    <div class="section">
      <div class="section-title">角色性格 Personality</div>
      <div class="personality-grid">
        <div class="personality-cell">
          <div class="personality-label">性格特点</div>
          <div class="personality-text">${personalityTraits || '—'}</div>
        </div>
        <div class="personality-cell">
          <div class="personality-label">理想信念</div>
          <div class="personality-text">${ideals || '—'}</div>
        </div>
        <div class="personality-cell">
          <div class="personality-label">牵绊羁绊</div>
          <div class="personality-text">${bonds || '—'}</div>
        </div>
        <div class="personality-cell">
          <div class="personality-label">缺点弱点</div>
          <div class="personality-text">${flaws || '—'}</div>
        </div>
      </div>
    </div>
    ` : ''}

    <!-- TWO COL: FEATURES + EQUIPMENT -->
    <div class="two-col">
      <div>
        <!-- CLASS FEATURES -->
        <div class="section">
          <div class="section-title">职业特性 Features</div>
          ${features.length > 0 ? features.slice(0, 12).map((f: any) => `
            <div class="feature-item">
              <span class="feature-level">Lv.${f.level}</span>
              <span class="feature-name">${f.name}</span>
            </div>
          `).join('') : '<div style="font-size:12px;color:#999;font-style:italic">暂无职业特性</div>'}

          ${subFeatures.length > 0 ? `
            <div style="margin-top:10px;padding-top:8px;border-top:1px dashed #ccc">
              <div style="font-size:11px;font-weight:900;color:var(--dnd-gold);margin-bottom:6px;letter-spacing:1px">${character.subclass || '子职业'} 特性</div>
              ${subFeatures.slice(0, 8).map((f: any) => `
                <div class="feature-item">
                  <span class="feature-level">Lv.${f.level}</span>
                  <span class="feature-name">${f.name}</span>
                </div>
              `).join('')}
            </div>
          ` : ''}
        </div>
      </div>

      <div>
        <!-- EQUIPMENT -->
        <div class="section">
          <div class="section-title">装备清单 Equipment</div>
          ${(weapons.length > 0 || armor.length > 0 || gear.length > 0) ? `
          <table class="equip-table">
            <thead><tr><th>物品名称</th><th>详情</th></tr></thead>
            <tbody>
              ${weapons.map(w => `<tr><td>⚔ ${w.name}</td><td>${w.damage || ''} ${w.damageType || ''}</td></tr>`).join('')}
              ${armor.map(a => `<tr><td>🛡 ${a.name}${a.isEquipped ? ' ✦' : ''}</td><td>AC ${a.ac || '—'}</td></tr>`).join('')}
              ${gear.slice(0, 10).map(g => `<tr><td>📦 ${g.name}${(g.quantity || 1) > 1 ? ` ×${g.quantity}` : ''}</td><td>${g.cost || ''}</td></tr>`).join('')}
            </tbody>
          </table>
          ` : '<div style="font-size:12px;color:#999;font-style:italic">尚未选择装备</div>'}

          <!-- WEALTH -->
          <div style="margin-top:10px">
            <div class="wealth-row">
              ${character.platinum ? `<div class="wealth-item"><span class="coin coin-pp">铂</span>${character.platinum}</div>` : ''}
              <div class="wealth-item"><span class="coin coin-gp">金</span>${character.gold || 0}</div>
              <div class="wealth-item"><span class="coin coin-sp">银</span>${character.silver || 0}</div>
              <div class="wealth-item"><span class="coin coin-cp">铜</span>${character.copper || 0}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- SPELLS (conditional) -->
    ${hasSpellcasting && Object.keys(spellsByLevel).length > 0 ? `
    <div class="section">
      <div class="section-title">法术列表 Spells</div>
      <div class="info-box" style="margin-bottom:8px">
        <strong>施法属性：</strong>${character.spellcastingAbility || '—'} &nbsp;|&nbsp;
        <strong>法术豁免DC：</strong>${character.spellSaveDC || '—'} &nbsp;|&nbsp;
        <strong>法术攻击加值：</strong>${character.spellAttackBonus ? formatModifier(character.spellAttackBonus) : '—'}
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px">
        ${Object.entries(spellsByLevel).map(([level, spells]) => `
          <div class="spell-level-group">
            <span class="spell-level-tag">${level}</span>
            <div class="spell-list">${spells.join('、')}</div>
          </div>
        `).join('')}
      </div>
    </div>
    ` : ''}

    <!-- BACKSTORY -->
    ${character.backstory ? `
    <div class="section">
      <div class="section-title">背景故事 Backstory</div>
      <div class="backstory-text">${character.backstory}</div>
    </div>
    ` : ''}

    <!-- APPEARANCE (if filled) -->
    ${(character.hair || character.skin || character.eyes || character.height || character.age) ? `
    <div class="section">
      <div class="section-title">外貌特征 Appearance</div>
      <div class="info-box">
        ${character.gender ? `<strong>性别：</strong>${character.gender} &nbsp;` : ''}
        ${character.age ? `<strong>年龄：</strong>${character.age} &nbsp;` : ''}
        ${character.height ? `<strong>身高：</strong>${character.height} &nbsp;` : ''}
        ${character.weight ? `<strong>体重：</strong>${character.weight}<br/>` : ''}
        ${character.hair ? `<strong>发色：</strong>${character.hair} &nbsp;` : ''}
        ${character.skin ? `<strong>肤色：</strong>${character.skin} &nbsp;` : ''}
        ${character.eyes ? `<strong>瞳色：</strong>${character.eyes}` : ''}
        ${character.appearance ? `<br/><strong>描述：</strong>${character.appearance}` : ''}
      </div>
    </div>
    ` : ''}

  </div>

  <!-- FOOTER -->
  <div class="footer">
    <strong>不咕鸟</strong> · DND 5R CHARACTER SHEET · ${character.name || '无名氏'}
  </div>

</div>
</body>
</html>`;
}

// === Unified Markdown Card Generator ===
function generateCardMarkdown(character: CharacterData, libraryClasses: any[], librarySpecies: any[]): string {
  const profBonus = getProficiencyBonus(character.level);
  const classData = libraryClasses.find(c => c.name === character.className);
  const speciesData = librarySpecies.find(sp => sp.name === character.race);
  const ac = calcAC(character);
  const speed = speciesData?.speed || 30;

  const classString = `${character.className} Lv.${character.level}${character.subclass ? ` · ${character.subclass}` : ''}`;

  // Total ability scores
  const totalScore = (key: string) => {
    const base = (character.abilities as any)[key] || 10;
    const bonus = (character.abilityBonuses as any)?.[key] || 0;
    const bgBonus = (character.backgroundBonuses as any)?.[key] || 0;
    return base + bonus + bgBonus;
  };

  // Saving throw check
  const isSaveProf = (key: string) => {
    return classData?.saves.includes(ABILITY_LABELS_CN[key]) || false;
  };

  // Build skill rows
  const allSkills: { name: string; abilityKey: string; mod: number; profLevel: number }[] = [];
  for (const [abilityKey, skills] of Object.entries(SKILLS_BY_ABILITY)) {
    const abilityMod = getModifier(totalScore(abilityKey));
    for (const skill of skills) {
      const level = character.skillMastery?.[skill] || 0;
      let bonus = 0;
      if (level === 1) bonus = profBonus;
      else if (level === 2) bonus = profBonus * 2;
      allSkills.push({ name: skill, abilityKey, mod: abilityMod + bonus, profLevel: level });
    }
  }

  // Build spells info
  const hasSpellcasting = character.spellcastingAbility && character.spellcastingAbility !== '';
  const spellsByLevel: Record<string, string[]> = {};
  if (hasSpellcasting) {
    const spellKeys = ['cantrips', 'level1', 'level2', 'level3', 'level4', 'level5', 'level6', 'level7', 'level8', 'level9'] as const;
    const levelLabels = ['戏法', '1环', '2环', '3环', '4环', '5环', '6环', '7环', '8环', '9环'];
    spellKeys.forEach((key, idx) => {
      const val = (character.spells as any)?.[key];
      if (val && typeof val === 'string' && val.trim()) {
        spellsByLevel[levelLabels[idx]] = val.split(/[,，、]/).map((s: string) => s.trim()).filter(Boolean);
      }
    });
  }

  // Personality fields
  const personalityTraits = character.personalityTraits || '';
  const ideals = character.ideals || '';
  const bonds = character.bonds || '';
  const flaws = character.flaws || '';

  // Equipment
  const weapons = character.inventoryWeapons || [];
  const armor = character.inventoryArmor || [];
  const gear = character.inventoryGear || [];

  // Class features for current level
  const features = (classData?.features || []).filter((f: any) => f.level <= character.level).sort((a: any, b: any) => a.level - b.level);

  // Subclass features
  const subclassData = classData?.subclasses?.find((sc: any) => sc.name === character.subclass);
  const subFeatures = (subclassData?.features || []).filter((f: any) => f.level <= character.level).sort((a: any, b: any) => a.level - b.level);

  const lines: string[] = [];

  // ====== HEADER ======
  lines.push(`# ${character.name || '无名氏'}`);
  lines.push('');
  lines.push(`> **${character.race || '种族'}${character.subRace ? ` · ${character.subRace}` : ''} — ${classString}**`);
  lines.push('>');
  lines.push(`> **背景** ${character.background || '—'} ｜ **阵营** ${character.alignment || '—'} ｜ **玩家** ${character.playerName || '—'}${character.faith ? ` ｜ **信仰** ${character.faith}` : ''}`);
  lines.push('');
  lines.push('---');
  lines.push('');

  // ====== ABILITY SCORES ======
  lines.push('## ◆ 属性值 Ability Scores');
  lines.push('');
  lines.push('| 属性 | 总值 | 调整值 |');
  lines.push('| :---: | :---: | :---: |');
  ORDERED_ABILITIES.forEach(key => {
    const total = totalScore(key);
    const mod = getModifier(total);
    lines.push(`| ${ABILITY_LABELS[key]} | ${total} | ${formatModifier(mod)} |`);
  });
  lines.push('');

  // ====== COMBAT BAR ======
  lines.push('## ◆ 战斗数据 Combat');
  lines.push('');
  const equippedArmorName = character.inventoryArmor?.find(a => a.isEquipped)?.name || '无甲';
  lines.push(`| 护甲等级 | 先攻加值 | 速度 | 生命值上限 | 熟练加值 |`);
  lines.push(`| :---: | :---: | :---: | :---: | :---: |`);
  lines.push(`| ${ac}（${equippedArmorName}） | ${formatModifier(getModifier(totalScore('dexterity')))} | ${speed}尺 | ${character.hpMax}（生命骰 ${character.level}${classData?.hitDie || 'd8'}） | +${profBonus} |`);
  lines.push('');

  // ====== SAVING THROWS ======
  lines.push('## ◆ 豁免检定 Saving Throws');
  lines.push('');
  lines.push('| 属性 | 熟练 | 加值 |');
  lines.push('| :--- | :---: | :---: |');
  ORDERED_ABILITIES.forEach(key => {
    const mod = getModifier(totalScore(key));
    const prof = isSaveProf(key);
    const saveVal = mod + (prof ? profBonus : 0);
    lines.push(`| ${ABILITY_LABELS_CN[key]} | ${prof ? '●' : '○'} | ${formatModifier(saveVal)} |`);
  });
  lines.push('');

  // ====== SKILLS ======
  lines.push('## ◆ 技能检定 Skills');
  lines.push('');
  lines.push('| 熟练 | 技能 | 关联属性 | 加值 |');
  lines.push('| :---: | :--- | :---: | :---: |');
  const abbrMap: Record<string, string> = { strength: '力', dexterity: '敏', constitution: '体', intelligence: '智', wisdom: '感', charisma: '魅' };
  allSkills.forEach(s => {
    const dot = s.profLevel === 2 ? '◆' : s.profLevel === 1 ? '●' : '○';
    lines.push(`| ${dot} | ${s.name} | ${abbrMap[s.abilityKey]} | ${formatModifier(s.mod)} |`);
  });
  lines.push('');

  // ====== PROFICIENCIES & LANGUAGES ======
  lines.push('## ◆ 熟练与语言');
  lines.push('');
  lines.push(`- **武器 & 护甲：** ${classData?.coreTraits?.weaponProficiencies || '—'}${classData?.coreTraits?.armorTraining ? ` / ${classData.coreTraits.armorTraining}` : ''}`);
  lines.push(`- **工具：** ${character.tools?.map(t => t.name).join('、') || character.toolProficiencies || '—'}`);
  lines.push(`- **语言：** ${character.languages || '通用语'}`);
  if (character.originFeat) {
    lines.push(`- **起源专长：** ${character.originFeat}`);
  }
  lines.push('');

  // ====== PERSONALITY ======
  if (personalityTraits || ideals || bonds || flaws) {
    lines.push('## ◆ 角色性格 Personality');
    lines.push('');
    if (personalityTraits) {
      lines.push(`**性格特点：** ${personalityTraits}`);
      lines.push('');
    }
    if (ideals) {
      lines.push(`**理想信念：** ${ideals}`);
      lines.push('');
    }
    if (bonds) {
      lines.push(`**牵绊羁绊：** ${bonds}`);
      lines.push('');
    }
    if (flaws) {
      lines.push(`**缺点弱点：** ${flaws}`);
      lines.push('');
    }
  }

  // ====== CLASS FEATURES ======
  lines.push('## ◆ 职业特性 Features');
  lines.push('');
  if (features.length > 0) {
    features.forEach((f: any) => {
      lines.push(`- **[Lv.${f.level}]** ${f.name}`);
    });
  } else {
    lines.push('*暂无职业特性*');
  }
  lines.push('');

  if (subFeatures.length > 0) {
    lines.push(`### ${character.subclass || '子职业'} 特性`);
    lines.push('');
    subFeatures.forEach((f: any) => {
      lines.push(`- **[Lv.${f.level}]** ${f.name}`);
    });
    lines.push('');
  }

  // ====== EQUIPMENT ======
  lines.push('## ◆ 装备清单 Equipment');
  lines.push('');
  if (weapons.length > 0 || armor.length > 0 || gear.length > 0) {
    lines.push('| 物品名称 | 详情 |');
    lines.push('| :--- | :--- |');
    weapons.forEach((w: any) => {
      lines.push(`| ⚔ ${w.name} | ${w.damage || ''} ${w.damageType || ''} |`);
    });
    armor.forEach(a => {
      lines.push(`| 🛡 ${a.name}${a.isEquipped ? ' ✦' : ''} | AC ${a.ac || '—'} |`);
    });
    gear.forEach(g => {
      lines.push(`| 📦 ${g.name}${(g.quantity || 1) > 1 ? ` ×${g.quantity}` : ''} | ${g.cost || ''} |`);
    });
  } else {
    lines.push('*尚未选择装备*');
  }
  lines.push('');

  // ====== WEALTH ======
  const coins: string[] = [];
  if (character.platinum) coins.push(`铂金 ${character.platinum}`);
  coins.push(`金币 ${character.gold || 0}`);
  coins.push(`银币 ${character.silver || 0}`);
  coins.push(`铜币 ${character.copper || 0}`);
  lines.push(`**财富：** ${coins.join(' ｜ ')}`);
  lines.push('');

  // ====== SPELLS ======
  if (hasSpellcasting && Object.keys(spellsByLevel).length > 0) {
    lines.push('## ◆ 法术列表 Spells');
    lines.push('');
    lines.push(`**施法属性：** ${character.spellcastingAbility || '—'} ｜ **法术豁免DC：** ${character.spellSaveDC || '—'} ｜ **法术攻击加值：** ${character.spellAttackBonus ? formatModifier(character.spellAttackBonus) : '—'}`);
    lines.push('');
    Object.entries(spellsByLevel).forEach(([level, spells]) => {
      lines.push(`- **${level}：** ${spells.join('、')}`);
    });
    lines.push('');
  }

  // ====== BACKSTORY ======
  if (character.backstory) {
    lines.push('## ◆ 背景故事 Backstory');
    lines.push('');
    lines.push(`*${character.backstory}*`);
    lines.push('');
  }

  // ====== APPEARANCE ======
  if (character.hair || character.skin || character.eyes || character.height || character.age) {
    lines.push('## ◆ 外貌特征 Appearance');
    lines.push('');
    const appearanceParts: string[] = [];
    if (character.gender) appearanceParts.push(`**性别：** ${character.gender}`);
    if (character.age) appearanceParts.push(`**年龄：** ${character.age}`);
    if (character.height) appearanceParts.push(`**身高：** ${character.height}`);
    if (character.weight) appearanceParts.push(`**体重：** ${character.weight}`);
    if (character.hair) appearanceParts.push(`**发色：** ${character.hair}`);
    if (character.skin) appearanceParts.push(`**肤色：** ${character.skin}`);
    if (character.eyes) appearanceParts.push(`**瞳色：** ${character.eyes}`);
    if (appearanceParts.length > 0) {
      lines.push(appearanceParts.join(' ｜ '));
      lines.push('');
    }
    if (character.appearance) {
      lines.push(`**描述：** ${character.appearance}`);
      lines.push('');
    }
  }

  // ====== FOOTER ======
  lines.push('---');
  lines.push('');
  lines.push(`> **不咕鸟** · DND 5R CHARACTER SHEET · ${character.name || '无名氏'}`);
  lines.push('');

  return lines.join('\n');
}

// === React Component ===
const Summary: React.FC<Props> = ({ character }) => {
  const { classes, species } = useLibrary();
  const cardHTML = useMemo(() => generateCardHTML(character, classes.items, species.items), [character, classes.items, species.items]);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeHeight, setIframeHeight] = useState(1200);

  // Auto-resize iframe to content height
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const handleLoad = () => {
      try {
        const doc = iframe.contentDocument;
        if (doc?.body) {
          // Get the full height of the rendered content
          const height = doc.documentElement.scrollHeight || doc.body.scrollHeight;
          setIframeHeight(height + 20);
        }
      } catch (_) { /* cross-origin guard */ }
    };

    iframe.addEventListener('load', handleLoad);
    return () => iframe.removeEventListener('load', handleLoad);
  }, [cardHTML]);

  const handleExportHTML = () => {
    const blob = new Blob([cardHTML], { type: 'text/html; charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${character.name || '角色卡'}_character_sheet.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExportMarkdown = () => {
    const md = generateCardMarkdown(character, classes.items, species.items);
    const blob = new Blob([md], { type: 'text/markdown; charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${character.name || '角色卡'}_character_sheet.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(cardHTML);
      printWindow.document.close();
      setTimeout(() => printWindow.print(), 600);
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* Action Bar */}
      <div className="flex justify-center items-center gap-4 py-4 bg-stone-100 border-b border-stone-300 sticky top-0 z-50 shrink-0">
        <button
          onClick={handleExportHTML}
          className="flex items-center gap-2 bg-stone-800 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-stone-700 transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
        >
          <FileCode className="w-5 h-5" /> 导出 HTML 角色卡
        </button>
        <button
          onClick={handleExportMarkdown}
          className="flex items-center gap-2 bg-emerald-800 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-emerald-700 transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
        >
          <FileText className="w-5 h-5" /> 导出 Markdown 文本
        </button>
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 bg-red-800 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-red-700 transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
        >
          <Printer className="w-5 h-5" /> 打印角色卡
        </button>
      </div>

      {/* Preview: iframe renders the exact same HTML as the export */}
      <div className="flex-1 overflow-auto bg-stone-200">
        <iframe
          ref={iframeRef}
          srcDoc={cardHTML}
          title="角色卡预览"
          style={{
            width: '100%',
            height: `${iframeHeight}px`,
            border: 'none',
            display: 'block',
          }}
          sandbox="allow-same-origin"
        />
      </div>
    </div>
  );
};

export default Summary;
