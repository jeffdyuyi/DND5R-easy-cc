
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
  headerColor = "bg-stone-800",
  stats = [],
  bodyContent,
  footer,
  accentColor = "border-stone-800"
}) => {
  return (
    <div className={`w-full max-w-lg md:max-w-xl lg:max-w-2xl mx-auto bg-white border-4 md:border-[6px] ${accentColor} rounded-xl overflow-hidden shadow-2xl my-4 font-serif flex flex-col h-auto min-h-[300px] md:min-h-[400px]`}>
      {/* Header */}
      <div className={`${headerColor} p-3 md:p-4 text-white border-b-4 ${accentColor} relative z-10`}>
        {/* Decorative Corner */}
        <div className="absolute top-0 right-0 p-1">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-white/10 rounded-bl-full absolute top-0 right-0"></div>
        </div>

        <div className="flex justify-between items-start relative z-10">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="p-1.5 md:p-2 bg-black/30 rounded-lg shadow-inner border border-white/20">
              {icon}
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-black tracking-wide leading-none uppercase drop-shadow-md">{title}</h2>
              {subtitle && <div className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] opacity-90 mt-1">{subtitle}</div>}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar - Responsive Grid */}
      {stats.length > 0 && (
        <div className="bg-stone-100 border-b-4 border-stone-200 grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-stone-200">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`p-2 md:p-3 flex flex-col justify-center items-center text-center ${stat.fullWidth ? 'col-span-1 sm:col-span-2 border-t border-stone-200' : ''}`}
            >
              <span className="text-[9px] md:text-[10px] text-stone-500 font-black uppercase tracking-widest">{stat.label}</span>
              <span className="font-bold text-stone-800 text-sm md:text-base leading-tight mt-0.5">{stat.value}</span>
            </div>
          ))}
        </div>
      )}

      {/* Body Content */}
      <div className="p-4 md:p-5 bg-[url('https://www.transparenttextures.com/patterns/paper.png')] bg-stone-50 text-stone-900 leading-relaxed text-sm flex-grow space-y-3 md:space-y-4">
        {bodyContent}
      </div>

      {/* Footer */}
      {footer && (
        <div className="bg-stone-900 text-stone-400 text-[9px] md:text-[10px] p-2 border-t-4 border-stone-800 flex flex-col items-center uppercase tracking-widest">
          {footer}
        </div>
      )}
    </div>
  );
};


// --- Helper: Mini Stat Card ---
const MiniStatCard: React.FC<{ label: string; value: string | React.ReactNode; icon?: React.ReactNode }> = ({ label, value, icon }) => (
  <div className="bg-white/80 border border-stone-200 rounded-lg p-2 md:p-3 shadow-sm flex flex-col items-center text-center group hover:border-stone-400 transition-all hover:shadow-md">
    {icon && <div className="text-stone-400 mb-1 group-hover:scale-110 transition-transform">{icon}</div>}
    <span className="text-[10px] text-stone-500 font-black uppercase tracking-widest">{label}</span>
    <span className="font-bold text-stone-800 text-sm md:text-base leading-tight mt-0.5">{value}</span>
  </div>
);

// --- Helper: Feature Card ---
const FeatureCard: React.FC<{ title: string, level?: number, description: string, themeColor?: string }> = ({ title, level, description, themeColor = "stone" }) => {
  const colorMap: any = {
    red: "border-red-200 bg-red-50/30",
    blue: "border-blue-200 bg-blue-50/30",
    green: "border-green-200 bg-green-50/30",
    yellow: "border-yellow-200 bg-yellow-50/30",
    purple: "border-purple-200 bg-purple-50/30",
    stone: "border-stone-200 bg-stone-50/50"
  };

  const tagColorMap: any = {
    red: "bg-red-100 text-red-700",
    blue: "bg-blue-100 text-blue-700",
    green: "bg-green-100 text-green-700",
    yellow: "bg-yellow-100 text-yellow-700",
    purple: "bg-purple-100 text-purple-700",
    stone: "bg-stone-200 text-stone-600"
  };

  return (
    <div className={`border-2 ${colorMap[themeColor]} rounded-xl p-4 my-4 shadow-sm backdrop-blur-sm relative overflow-hidden group hover:shadow-md transition-shadow`}>
      {/* Subtle background circle */}
      <div className={`absolute -right-4 -bottom-4 w-24 h-24 rounded-full opacity-5 pointer-events-none group-hover:scale-110 transition-transform ${tagColorMap[themeColor].split(' ')[0]}`}></div>

      <div className="flex items-center justify-between mb-3 relative z-10">
        <div className="flex items-center gap-2">
          {level !== undefined && (
            <span className={`text-[10px] font-black px-2 py-0.5 rounded shadow-sm uppercase tracking-wider ${tagColorMap[themeColor]}`}>
              等级 {level}
            </span>
          )}
          <h4 className="font-black text-stone-800 text-lg tracking-tight">{title}</h4>
        </div>
        <div className="w-8 h-1 bg-stone-200 rounded-full group-hover:w-12 transition-all"></div>
      </div>
      <div className="text-sm text-stone-700 leading-relaxed relative z-10">
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 mb-6">
            <MiniStatCard label="生命骰" value={item.hitDie} />
            <MiniStatCard label="首级生命" value={`${parseInt(item.hitDie.substring(1))} + 体质`} />
            <MiniStatCard label="主要属性" value={item.primaryAbility} />
            <MiniStatCard label="豁免熟练" value={item.saves.join(' & ')} />
          </div>

          <div className="italic text-stone-600 mb-6 bg-white/40 p-4 rounded-xl border border-stone-200 shadow-inner">
            <RichText text={item.fullDescription || item.description} />
          </div>

          {/* Core Traits Card */}
          <div className="bg-white border-2 border-red-100 p-4 rounded-xl shadow-sm mb-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 opacity-10">
              <Star className="w-12 h-12 text-red-900" />
            </div>
            <h4 className="font-black text-red-900 border-b-2 border-red-50 mb-3 pb-1 text-xs uppercase flex items-center gap-1.5">
              <Star className="w-4 h-4 fill-red-900/10" /> 核心特质
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block">护甲受训</span>
                <p className="text-xs font-bold text-stone-800">{item.coreTraits.armorTraining}</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block">武器熟练</span>
                <p className="text-xs font-bold text-stone-800">{item.coreTraits.weaponProficiencies}</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block">技能熟练</span>
                <p className="text-xs font-bold text-stone-800">{item.coreTraits.skillProficiencies}</p>
              </div>
            </div>
          </div>

          {item.classTable && (
            <div className="my-6">
              <h3 className="font-black text-xs text-stone-400 uppercase tracking-[0.2em] mb-3">职业进度表</h3>
              <ClassFeatureTable data={item.classTable} />
            </div>
          )}

          <div className="relative pt-4 mt-8">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent"></div>
            <h3 className="font-black text-xl text-stone-800 uppercase tracking-tight mb-6 flex items-center gap-2">
              <div className="w-2 h-8 bg-red-900 rounded-full"></div>
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
        <div className="flex flex-col items-center mb-8">
          <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest block mb-2">主职业</span>
          <div className="text-2xl font-black text-stone-900 drop-shadow-sm flex items-center gap-2">
            {item.parentClass}
          </div>
        </div>

        <div className="italic text-stone-600 mb-8 p-6 bg-white/40 rounded-xl border border-stone-200 shadow-inner relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-[0.03] rotate-12 group-hover:rotate-0 transition-transform">
            <Scroll className="w-24 h-24" />
          </div>
          <RichText text={item.fullDescription || item.description} />
        </div>

        <div className="relative pt-4 mt-4">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent"></div>
          <h3 className="font-black text-xl text-stone-800 uppercase tracking-tight mb-6 flex items-center gap-2">
            <div className="w-2 h-8 bg-blue-900 rounded-full"></div>
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
        <div className="grid grid-cols-3 gap-2 md:gap-3 mb-6">
          <MiniStatCard label="体型" value={item.size} />
          <MiniStatCard label="速度" value={`${item.speed} 尺`} />
          <MiniStatCard label="黑暗视觉" value={item.darkvision ? "有" : "无"} />
        </div>

        <div className="italic text-stone-600 mb-8 p-4 bg-white/40 rounded-xl border border-stone-200 shadow-inner">
          <RichText text={item.fullDescription || item.description} />
        </div>

        <div className="relative pt-4 mt-4">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent"></div>
          <h3 className="font-black text-xl text-stone-800 uppercase tracking-tight mb-6 flex items-center gap-2">
            <div className="w-2 h-8 bg-green-800 rounded-full"></div>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3 mb-6">
            <MiniStatCard label="属性加值" value={item.abilityScores.join('/')} />
            <MiniStatCard label="起源专长" value={item.feat} icon={<Star className="w-3 h-3 text-yellow-600" />} />
          </div>

          <div className="italic text-stone-600 mb-6 p-4 bg-white/40 rounded-xl border border-stone-200 shadow-inner">
            <RichText text={item.description} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-white border-2 border-yellow-100 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <h4 className="font-black text-yellow-800 text-xs uppercase mb-3 flex items-center gap-1.5 border-b border-yellow-50 pb-1">
                熟练项
              </h4>
              <div className="space-y-2">
                <p className="text-sm"><strong className="text-stone-500 text-[10px] uppercase block">技能</strong> {item.skills.join('、')}</p>
                <p className="text-sm"><strong className="text-stone-500 text-[10px] uppercase block">工具</strong> {item.tool}</p>
              </div>
            </div>

            <div className="bg-white border-2 border-yellow-100 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <h4 className="font-black text-yellow-800 text-xs uppercase mb-3 flex items-center gap-1.5 border-b border-yellow-50 pb-1">
                起始装备
              </h4>
              <ul className="list-disc pl-4 text-xs space-y-2 text-stone-700 font-medium">
                {item.equipment.map((e, i) => <li key={i}>{e}</li>)}
              </ul>
            </div>
          </div>

          {featInfo && (
            <div className="mt-8 relative pt-4">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent"></div>
              <h4 className="font-black text-stone-800 flex items-center gap-2 mb-4 text-lg">
                <Star className="w-5 h-5 text-yellow-600" /> 起源专长详情
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
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3 mb-6">
          <MiniStatCard label="类别" value={item.category} />
          <MiniStatCard label="先决条件" value={item.prerequisite || "无"} />
          <MiniStatCard label="可复选" value={item.repeatable ? "是" : "否"} />
        </div>

        <div className="italic text-stone-600 mb-8 p-4 bg-purple-50/50 rounded-xl border border-purple-100 shadow-inner">
          <RichText text={item.description} />
        </div>

        <div className="relative pt-4 mt-4">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent"></div>
          <h3 className="font-black text-xl text-stone-800 uppercase tracking-tight mb-6 flex items-center gap-2">
            <div className="w-2 h-8 bg-purple-900 rounded-full"></div>
            专长增益
          </h3>
          <div className="space-y-4">
            {item.benefits.map((b, i) => (
              <div key={i} className="flex gap-4 items-start bg-white p-4 rounded-xl border border-stone-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="mt-1 w-6 h-6 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xs flex-shrink-0 border border-purple-200">
                  {i + 1}
                </div>
                <div className="text-sm text-stone-700 leading-relaxed font-medium">
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
