
import React from 'react';
import { ClassItem, SpeciesItem, BackgroundItem, SubclassItem, SpellItem, FeatItem, ItemItem } from '../types';
import {
  Scroll, Dna, Star,
  Shield, Swords, Hammer, Backpack, Award, Gem,
  Box, Crown, Link
} from 'lucide-react';
import { RichText } from './RichText';
import SpellCard from './SpellCard';

// --- Universal Card Component ---

interface CardProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  headerColor?: string;
  stats?: { label: string; value: string | React.ReactNode; fullWidth?: boolean }[];
  bodyContent: React.ReactNode;
  footer?: React.ReactNode;
  accentColor?: string;
}

const VerticalCard: React.FC<CardProps> = ({
  title,
  subtitle,
  icon,
  headerColor = "bg-[#18182a]",
  bodyContent,
  footer,
  accentColor = "border-[#bf953f]/30"
}) => {
  return (
    <div className={`w-full max-w-lg md:max-w-xl lg:max-w-2xl mx-auto bg-[#141420] border-2 md:border-[3px] ${accentColor} rounded-xl overflow-hidden shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)] my-4 font-serif flex flex-col h-auto min-h-[300px] md:min-h-[400px] noise-bg gold-border-glow`}>
      {/* Header */}
      <div className={`${headerColor} p-4 md:p-6 text-[#f0ead8] border-b border-[#bf953f]/20 relative z-10 bg-gradient-to-b from-white/5 to-transparent`}>
        {/* Decorative Corner Shimmer */}
        <div className="absolute top-0 right-0 p-1 opacity-20 pointer-events-none">
          <div className="w-16 h-16 md:w-24 md:h-24 bg-gradient-to-bl from-[#fcf6ba] to-transparent rounded-bl-full absolute top-0 right-0"></div>
        </div>

        <div className="flex justify-between items-start relative z-10">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="p-2 md:p-3 bg-black/40 rounded-xl shadow-[inset_0_2px_10px_rgba(0,0,0,0.6)] border border-[#bf953f]/20 group-hover:border-[#bf953f]/50 transition-colors">
              <div className="text-[#bf953f] drop-shadow-[0_0_8px_rgba(191,149,63,0.5)]">
                {icon}
              </div>
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-black tracking-tight leading-tight golden-shimmer-text drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] pb-1">
                {title}
              </h2>
              {subtitle && (
                <div className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] text-[#a89b7a] mt-1 flex items-center gap-2">
                  <div className="h-px w-4 bg-[#bf953f]/30"></div>
                  {subtitle}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-4 md:p-6 text-[#f0ead8] leading-relaxed text-sm flex-grow space-y-4 md:space-y-6 relative z-10 bg-gradient-to-b from-black/20 to-transparent">
        {bodyContent}
      </div>

      {/* Footer */}
      {footer && (
        <div className="bg-[#0c0c10] text-[#6b6250] text-[9px] md:text-[10px] p-3 border-t border-[#bf953f]/10 flex flex-col items-center uppercase tracking-widest font-bold">
          {footer}
        </div>
      )}
    </div>
  );
};


// --- Helper: Mini Stat Card ---
const MiniStatCard: React.FC<{ label: string; value: string | React.ReactNode; icon?: React.ReactNode }> = ({ label, value, icon }) => (
  <div className="bg-[#1e1e30]/80 border border-[#bf953f]/20 rounded-xl p-2 md:p-3 flex flex-col items-center text-center group hover:bg-[#1e1e30] hover:border-[#bf953f]/50 transition-all shadow-lg hover:shadow-[#bf953f]/10 translate-y-0 hover:-translate-y-1">
    {icon && <div className="text-[#a89b7a] mb-1 group-hover:scale-110 group-hover:text-[#bf953f] transition-all">{icon}</div>}
    <span className="text-[10px] text-[#a89b7a] font-black uppercase tracking-widest">{label}</span>
    <span className="font-black text-[#f0ead8] text-sm md:text-base leading-tight mt-1">{value}</span>
  </div>
);

// --- Helper: Feature Card ---
const FeatureCard: React.FC<{ title: string, level?: number, description: string, themeColor?: string }> = ({ title, level, description, themeColor = "stone" }) => {
  const colorMap: any = {
    red: "border-red-900/40 bg-red-950/20 shadow-red-950/20",
    blue: "border-blue-900/40 bg-blue-950/20 shadow-blue-950/20",
    green: "border-green-900/40 bg-green-950/20 shadow-green-950/20",
    yellow: "border-yellow-900/40 bg-yellow-950/20 shadow-yellow-950/20",
    purple: "border-purple-900/40 bg-purple-950/20 shadow-purple-950/20",
    stone: "border-stone-800/40 bg-stone-900/20 shadow-stone-900/20"
  };

  const tagColorMap: any = {
    red: "bg-red-900/40 text-red-200 border-red-800/50",
    blue: "bg-blue-900/40 text-blue-200 border-blue-800/50",
    green: "bg-green-900/40 text-green-200 border-green-800/50",
    yellow: "bg-yellow-900/40 text-yellow-200 border-yellow-800/50",
    purple: "bg-purple-900/40 text-purple-200 border-purple-800/50",
    stone: "bg-stone-800/40 text-stone-200 border-stone-700/50"
  };

  return (
    <div className={`border ${colorMap[themeColor]} rounded-xl p-4 md:p-5 my-4 shadow-xl backdrop-blur-md relative overflow-hidden group hover:border-[#bf953f]/40 transition-all duration-300`}>
      {/* Dynamic glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#bf953f]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex items-center gap-3">
          {level !== undefined && (
            <span className={`text-[10px] font-black px-2 py-1 rounded border shadow-inner uppercase tracking-widest ${tagColorMap[themeColor]}`}>
              等级 {level}
            </span>
          )}
          <h4 className="font-black text-[#f0ead8] text-lg tracking-tight group-hover:text-white transition-colors">{title}</h4>
        </div>
        <div className="w-10 h-0.5 bg-gradient-to-r from-transparent via-[#bf953f]/40 to-transparent rounded-full group-hover:w-16 transition-all duration-500"></div>
      </div>
      <div className="text-[#a89b7a] text-sm leading-relaxed relative z-10 font-medium group-hover:text-[#f0ead8]/90 transition-colors">
        <RichText text={description} />
      </div>
    </div>
  );
};

// --- Class Feature Table Component ---

import { ClassFeatureTable } from './ClassFeatureTable';

// --- View Components ---

const DetailFooter = ({ source }: { source: string }) => (
  <div className="w-full">
    <div className="flex justify-between w-full font-bold">
      <span>{source}</span>
      <span>不咕鸟制卡</span>
    </div>
    <div className="text-[8px] opacity-50 mt-1 text-center font-normal lowercase tracking-normal">
      数据来源: 5echm.kagangtuya.top
    </div>
  </div>
);

export const ClassDetailView = ({ item, level }: { item: ClassItem, level?: number }) => {
  const visibleFeatures = level
    ? item.features.filter(f => f.level <= level).sort((a, b) => a.level - b.level)
    : item.features.sort((a, b) => a.level - b.level);

  return (
    <VerticalCard
      title={item.name}
      subtitle="职业"
      icon={<Shield className="w-6 h-6" />}
      headerColor="bg-red-900"
      accentColor="border-red-950"
      bodyContent={
        <>
          {/* Stats Cards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8">
            <MiniStatCard label="生命骰" value={item.hitDie} />
            <MiniStatCard label="首级生命" value={`${parseInt(item.hitDie.substring(1))} + 体质`} />
            <MiniStatCard label="主要属性" value={item.primaryAbility} />
            <MiniStatCard label="豁免熟练" value={item.saves.join(' & ')} />
          </div>

          <div className="italic text-[#a89b7a] mb-8 bg-black/30 p-5 rounded-xl border border-[#bf953f]/10 shadow-inner leading-relaxed">
            <RichText text={item.fullDescription || item.description} />
          </div>

          {/* Core Traits Card */}
          <div className="bg-gradient-to-br from-[#1e1e30] to-[#141420] border border-red-900/30 p-5 rounded-2xl shadow-2xl mb-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Star className="w-16 h-16 text-red-500" />
            </div>
            <h4 className="font-black text-red-400 border-b border-red-900/40 mb-4 pb-2 text-xs uppercase flex items-center gap-2 tracking-widest">
              <Star className="w-4 h-4 fill-red-500/20" /> 核心特质
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <span className="text-[10px] font-black text-[#6b6250] uppercase tracking-widest block">护甲受训</span>
                <p className="text-xs font-bold text-[#f0ead8]">{item.coreTraits.armorTraining}</p>
              </div>
              <div className="space-y-2">
                <span className="text-[10px] font-black text-[#6b6250] uppercase tracking-widest block">武器熟练</span>
                <p className="text-xs font-bold text-[#f0ead8]">{item.coreTraits.weaponProficiencies}</p>
              </div>
              <div className="space-y-2">
                <span className="text-[10px] font-black text-[#6b6250] uppercase tracking-widest block">技能熟练</span>
                <p className="text-xs font-bold text-[#f0ead8]">{item.coreTraits.skillProficiencies}</p>
              </div>
            </div>
          </div>

          {item.classTable && (
            <div className="my-8">
              <h3 className="font-black text-xs text-[#a89b7a] uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                <div className="w-8 h-px bg-gradient-to-r from-[#bf953f]/40 to-transparent"></div>
                职业进度表
              </h3>
              <div className="glass-panel p-2 rounded-xl border border-[#bf953f]/10 overflow-hidden">
                <ClassFeatureTable data={item.classTable} />
              </div>
            </div>
          )}

          <div className="relative pt-8 mt-12">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#bf953f]/30 to-transparent"></div>
            <h3 className="font-black text-2xl text-[#f0ead8] uppercase tracking-tight mb-8 flex items-center gap-3">
              <div className="w-2 h-10 bg-gradient-to-b from-red-700 to-red-900 rounded-full shadow-[0_0_10px_rgba(185,28,28,0.5)]"></div>
              职业特性
            </h3>
            <div className="space-y-1">
              {visibleFeatures.map((f, i) => (
                <FeatureCard key={i} title={f.name} level={f.level} description={f.description} themeColor="red" />
              ))}
            </div>
          </div>
        </>
      }
      footer={<DetailFooter source={item.source} />}
    />
  );
};

export const SubclassDetailView = ({ item }: { item: SubclassItem }) => (
  <VerticalCard
    title={item.name}
    subtitle={`${item.parentClass} 子职业`}
    icon={<Crown className="w-6 h-6" />}
    headerColor="bg-blue-900"
    accentColor="border-blue-950"
    bodyContent={
      <>
        <div className="flex flex-col items-center mb-10">
          <span className="text-[10px] font-black text-[#6b6250] uppercase tracking-[0.4em] block mb-3">主职业</span>
          <div className="text-3xl font-black golden-shimmer-text drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] flex items-center gap-3">
            {item.parentClass}
          </div>
        </div>

        <div className="italic text-[#a89b7a] mb-10 p-6 bg-black/40 rounded-2xl border border-blue-900/20 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-[0.05] rotate-12 group-hover:rotate-0 transition-transform text-blue-400">
            <Scroll className="w-32 h-32" />
          </div>
          <RichText text={item.fullDescription || item.description} />
        </div>

        <div className="relative pt-8 mt-6">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-900/50 to-transparent"></div>
          <h3 className="font-black text-2xl text-[#f0ead8] uppercase tracking-tight mb-8 flex items-center gap-3">
            <div className="w-2 h-10 bg-gradient-to-b from-blue-700 to-blue-900 rounded-full shadow-[0_0_10px_rgba(29,78,216,0.5)]"></div>
            子职特性
          </h3>
          <div className="space-y-1">
            {item.features.sort((a, b) => a.level - b.level).map((f, i) => (
              <FeatureCard key={i} title={f.name} level={f.level} description={f.description} themeColor="blue" />
            ))}
          </div>
        </div>
      </>
    }
    footer={<DetailFooter source={item.source} />}
  />
);

export const SpeciesDetailView = ({ item }: { item: SpeciesItem }) => (
  <VerticalCard
    title={item.name}
    subtitle="种族"
    icon={<Dna className="w-6 h-6" />}
    headerColor="bg-green-800"
    accentColor="border-green-900"
    bodyContent={
      <>
        {/* Stats Cards Grid */}
        <div className="grid grid-cols-3 gap-3 md:gap-4 mb-8">
          <MiniStatCard label="体型" value={item.size} />
          <MiniStatCard label="速度" value={`${item.speed} 尺`} />
          <MiniStatCard label="黑暗视觉" value={item.darkvision ? "有" : "无"} />
        </div>

        <div className="italic text-[#a89b7a] mb-10 p-6 bg-black/40 rounded-2xl border border-green-900/20 shadow-2xl overflow-hidden glass-panel">
          <RichText text={item.fullDescription || item.description} />
        </div>

        <div className="relative pt-8 mt-6">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-900/50 to-transparent"></div>
          <h3 className="font-black text-2xl text-[#f0ead8] uppercase tracking-tight mb-8 flex items-center gap-3">
            <div className="w-2 h-10 bg-gradient-to-b from-green-700 to-green-900 rounded-full shadow-[0_0_10px_rgba(21,128,61,0.5)]"></div>
            种族特性
          </h3>
          <div className="space-y-1">
            {item.traits.map((t, i) => (
              <FeatureCard key={i} title={t.name} description={t.description} themeColor="green" />
            ))}
          </div>
        </div>
      </>
    }
    footer={<DetailFooter source={item.source} />}
  />
);

export const BackgroundDetailView = ({ item, libraryFeats }: { item: BackgroundItem, libraryFeats?: FeatItem[] }) => {
  const featInfo = libraryFeats?.find(f => item.feat.includes(f.name));
  return (
    <VerticalCard
      title={item.name}
      subtitle="背景"
      icon={<Scroll className="w-6 h-6" />}
      headerColor="bg-yellow-700"
      accentColor="border-yellow-900"
      bodyContent={
        <>
          {/* Stats Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-8">
            <MiniStatCard label="属性加值" value={item.abilityScores.join('/')} />
            <MiniStatCard label="起源专长" value={item.feat} icon={<Star className="w-3 h-3 text-[#bf953f]" />} />
          </div>

          <div className="italic text-[#a89b7a] mb-8 p-6 bg-black/40 rounded-2xl border border-yellow-900/20 shadow-2xl">
            <RichText text={item.description} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-[#1e1e30] border border-[#bf953f]/20 p-5 rounded-2xl shadow-xl hover:border-[#bf953f]/50 transition-all group">
              <h4 className="font-black text-[#bf953f] text-xs uppercase mb-4 flex items-center gap-2 border-b border-[#bf953f]/10 pb-2 tracking-widest">
                熟练项
              </h4>
              <div className="space-y-4">
                <p className="text-sm"><strong className="text-[#6b6250] text-[10px] uppercase block tracking-widest mb-1">技能</strong> <span className="text-[#f0ead8]">{item.skills.join('、')}</span></p>
                <p className="text-sm"><strong className="text-[#6b6250] text-[10px] uppercase block tracking-widest mb-1">工具</strong> <span className="text-[#f0ead8]">{item.tool}</span></p>
              </div>
            </div>

            <div className="bg-[#1e1e30] border border-[#bf953f]/20 p-5 rounded-2xl shadow-xl hover:border-[#bf953f]/50 transition-all group">
              <h4 className="font-black text-[#bf953f] text-xs uppercase mb-4 flex items-center gap-2 border-b border-[#bf953f]/10 pb-2 tracking-widest">
                起始装备
              </h4>
              <ul className="pl-4 text-xs space-y-3 text-[#a89b7a] font-medium list-none">
                {item.equipment.map((e, i) => (
                  <li key={i} className="flex gap-2 items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#bf953f]/40 mt-1.5 flex-shrink-0"></span>
                    {e}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {featInfo && (
            <div className="mt-12 relative pt-8">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#bf953f]/30 to-transparent"></div>
              <h4 className="font-black text-[#f0ead8] flex items-center gap-3 mb-6 text-xl tracking-tight">
                <Star className="w-6 h-6 text-[#bf953f] drop-shadow-[0_0_5px_rgba(191,149,63,0.5)]" /> 起源专长详情
              </h4>
              <FeatureCard title={item.feat} description={featInfo?.benefits?.join('\n') || ""} themeColor="yellow" />
            </div>
          )}
        </>
      }
      footer={<DetailFooter source={item.source} />}
    />
  );
};

export const FeatDetailView = ({ item }: { item: FeatItem }) => (
  <VerticalCard
    title={item.name}
    subtitle="专长"
    icon={<Award className="w-6 h-6" />}
    headerColor="bg-purple-900"
    accentColor="border-purple-950"
    bodyContent={
      <>
        {/* Stats Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-8">
          <MiniStatCard label="类别" value={item.category} />
          <MiniStatCard label="先决条件" value={item.prerequisite || "无"} />
          <MiniStatCard label="可复选" value={item.repeatable ? "是" : "否"} />
        </div>

        <div className="italic text-[#a89b7a] mb-10 p-6 bg-purple-950/10 rounded-2xl border border-purple-900/20 shadow-2xl glass-panel">
          <RichText text={item.description} />
        </div>

        <div className="relative pt-8 mt-6">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-900/50 to-transparent"></div>
          <h3 className="font-black text-2xl text-[#f0ead8] uppercase tracking-tight mb-8 flex items-center gap-3">
            <div className="w-2 h-10 bg-gradient-to-b from-purple-700 to-purple-900 rounded-full shadow-[0_0_10px_rgba(126,34,206,0.5)]"></div>
            专长增益
          </h3>
          <div className="space-y-5">
            {item.benefits.map((b, i) => (
              <div key={i} className="flex gap-5 items-start bg-[#1e1e30] p-5 rounded-2xl border border-[#bf953f]/10 shadow-xl hover:border-[#bf953f]/40 transition-all group">
                <div className="mt-1 w-8 h-8 rounded-xl bg-gradient-to-br from-purple-800 to-purple-950 text-purple-200 flex items-center justify-center font-black text-sm flex-shrink-0 border border-purple-700/50 shadow-lg group-hover:scale-110 transition-transform">
                  {i + 1}
                </div>
                <div className="text-sm text-[#a89b7a] leading-relaxed font-medium group-hover:text-[#f0ead8] transition-colors">
                  <RichText text={b} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    }
    footer={<DetailFooter source={item.source} />}
  />
);


export const SpellDetailView = ({ item }: { item: SpellItem }) => {
  return (
    <div className="w-full max-w-lg md:max-w-xl lg:max-w-2xl mx-auto my-4">
      <SpellCard item={item} />
    </div>
  );
};


export const ItemDetailView = ({ item }: { item: ItemItem }) => {
  let color = "bg-stone-700";
  let icon = <Backpack className="w-6 h-6" />;
  let subtitle: string = item.type;

  if (item.type === '武器') { color = "bg-red-800"; icon = <Swords className="w-6 h-6" />; }
  if (item.type === '护甲') { color = "bg-blue-800"; icon = <Shield className="w-6 h-6" />; }
  if (item.type === '工具') { color = "bg-amber-700"; icon = <Hammer className="w-6 h-6" />; }
  if (item.type === '药水') { color = "bg-green-700"; icon = <Box className="w-6 h-6" />; }

  if (item.rarity) {
    const rarityColors: any = {
      '普通': 'bg-stone-500', '非普通': 'bg-green-600', '珍稀': 'bg-blue-600',
      '极珍稀': 'bg-purple-600', '传说': 'bg-orange-500', '神器': 'bg-yellow-600'
    };
    color = rarityColors[item.rarity] || color;
    subtitle = `${item.rarity} ${item.type}`;
    icon = <Gem className="w-6 h-6" />;
  }

  // --- Parsing Description for Metadata ---
  let descText = item.description;
  let isAttuned = item.attuned || false;
  let specificType = "";

  // Heuristic parsing for Magic Items/Armor descriptions that contain metadata lines
  if (item.type === '护甲' || item.type === '魔法物品' || item.type === '奇物' || item.type === '武器') {
    const lines = descText.split('\n');
    if (lines.length > 0) {
      const firstLine = lines[0];

      // Check for Attunement in first line or anywhere in description
      if (descText.includes('需同调')) {
        isAttuned = true;
      }

      // Check for specific type definition "护甲类型：xxx" or English "Weapon (xxx)"
      const typeMatch = firstLine.match(/护甲类型[：:]\s*([^（(，,。]+)/) || firstLine.match(/^(?:Weapon|Armor|Wondrous Item)\s*[\(（]([^）)]+)[\)）]/);
      if (typeMatch) {
        specificType = typeMatch[1].trim();
      }

      // Clean up description: Remove the first line if it looks like a metadata header
      // Examples: "护甲类型：板甲（需同调）。" or "Weapon (longsword), very rare"
      const looksLikeHeader =
        firstLine.includes('护甲类型') ||
        firstLine.includes('需同调') ||
        firstLine.includes('珍稀') ||
        firstLine.includes('非普通') ||
        firstLine.includes('传说');

      if (looksLikeHeader && lines.length > 1) {
        descText = lines.slice(1).join('\n').trim();
      }
    }
  }

  // Construct Stats
  const stats: { label: string; value: string | React.ReactNode; fullWidth?: boolean }[] = [
    { label: "价值", value: item.cost },
    { label: "重量", value: item.weight }
  ];
  if (item.damage) stats.push({ label: "伤害", value: `${item.damage} ${item.damageType}` });
  if (item.ac) stats.push({ label: "AC", value: item.ac });
  if (specificType) stats.push({ label: "类型详述", value: specificType, fullWidth: true });
  if (item.properties) stats.push({ label: "特性", value: item.properties.join(', '), fullWidth: true });
  if (item.toolAbility) stats.push({ label: "关键属性", value: item.toolAbility, fullWidth: true });

  return (
    <VerticalCard
      title={item.name}
      subtitle={subtitle}
      icon={icon}
      headerColor={color}
      accentColor={item.rarity ? `border-${color.replace('bg-', '')}` : 'border-stone-800'}
      stats={stats}
      bodyContent={
        <>
          {/* Prominent Attunement Banner */}
          {isAttuned && (
            <div className="bg-pink-100 border border-pink-300 text-pink-900 px-4 py-2 rounded-lg font-bold flex items-center justify-center gap-2 mb-4 animate-pulse-slow">
              <Link className="w-4 h-4" /> 需同调 (Requires Attunement)
            </div>
          )}

          <div className="italic text-stone-600 mb-4">
            <RichText text={descText} />
          </div>
          {item.mastery && (
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-3 text-sm my-2">
              <strong className="block text-yellow-800 text-xs uppercase mb-1">武器精通</strong>
              <RichText text={item.mastery} />
            </div>
          )}
          {item.toolUtilize && (
            <div className="space-y-2 mt-4">
              <h4 className="font-bold border-b border-stone-300 pb-1">工具操作</h4>
              {item.toolUtilize.map((u, i) => (
                <div key={i} className="text-xs">
                  <strong>{u.action} (DC {u.dc}):</strong> {u.description}
                </div>
              ))}
            </div>
          )}
        </>
      }
      footer={
        <div className="w-full">
          <div className="flex justify-between w-full font-bold">
            <span>{item.source}</span>
            <span>不咕鸟制卡</span>
          </div>
          <div className="text-[8px] opacity-50 mt-1 text-center font-normal lowercase tracking-normal">
            数据来源: 5echm.kagangtuya.top
          </div>
        </div>
      }
    />
  );
};
