
import React from 'react';
import { ClassItem, SpeciesItem, BackgroundItem, SubclassItem, SpellItem, FeatItem, ItemItem } from '../types';
import {
  Scroll, Dna, Star,
  Shield, Swords, Hammer, Backpack, Award, Gem,
  Box, Crown, Link
} from 'lucide-react';
import { RichText } from './RichText';
import SpellCard from './SpellCard';

// --- Helper: Detail Container (Fluid or Card) ---

interface ContainerProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  headerColor?: string;
  bodyContent: React.ReactNode;
  footer?: React.ReactNode;
  accentColor?: string;
  fluid?: boolean;
}

const DetailContainer: React.FC<ContainerProps> = ({
  title,
  subtitle,
  icon,
  headerColor = "bg-stone-800",
  bodyContent,
  footer,
  accentColor = "border-stone-800",
  fluid = false
}) => {
  if (fluid) {
    return (
      <div className={`w-full max-w-6xl mx-auto bg-white border-b border-stone-200 shadow-sm font-sans flex flex-col min-h-screen animate-fade-in`}>
        {/* Fluid Header */}
        <div className={`${headerColor} text-white relative py-8 px-6 md:px-12 overflow-hidden shadow-lg border-b-2 ${accentColor}`}>
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <div className="w-32 h-32 bg-white rounded-full -mr-16 -mt-16"></div>
          </div>
          <div className="flex items-center gap-6 relative z-10 max-w-4xl mx-auto">
            <div className="p-4 bg-black/30 rounded-2xl shadow-xl backdrop-blur-md border border-white/20 scale-110">
              {icon}
            </div>
            <div className="space-y-1">
              <h1 className="text-3xl md:text-5xl font-black tracking-tighter drop-shadow-md uppercase leading-tight">{title}</h1>
              {subtitle && <div className="text-xs md:text-sm font-black uppercase tracking-[0.3em] opacity-80 pl-1">{subtitle}</div>}
            </div>
          </div>
        </div>

        {/* Fluid Body */}
        <div className="flex-grow bg-white p-6 md:p-12">
          <div className="max-w-4xl mx-auto">
            {bodyContent}
          </div>
        </div>

        {/* Fluid Footer */}
        {footer && (
          <div className="bg-stone-50 border-t border-stone-200 p-6">
            <div className="max-w-4xl mx-auto text-stone-400 font-bold uppercase tracking-widest text-xs">
              {footer}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Fallback to Card-like visual for smaller items (Spells, Items)
  return (
    <div className={`w-full max-w-lg md:max-w-xl lg:max-w-2xl mx-auto bg-white border-4 md:border-[6px] ${accentColor} rounded-xl overflow-hidden shadow-2xl my-4 font-serif flex flex-col h-auto min-h-[300px] md:min-h-[400px]`}>
      <div className={`${headerColor} p-3 md:p-4 text-white border-b-4 ${accentColor} relative z-10`}>
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
      <div className="p-4 md:p-5 bg-stone-50 text-stone-900 leading-relaxed text-sm flex-grow space-y-3 md:space-y-4">
        {bodyContent}
      </div>
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
    <DetailContainer
      fluid
      title={item.name}
      subtitle="职业"
      icon={<Shield className="w-10 h-10" />}
      headerColor="bg-red-950"
      accentColor="border-red-600"
      bodyContent={
        <>
          {/* Stats Cards Grid - Fluid Multi-column */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
            <MiniStatCard label="生命骰" value={item.hitDie} />
            <MiniStatCard label="首级生命" value={`${parseInt(item.hitDie.substring(1))} + 体质`} />
            <MiniStatCard label="主要属性" value={item.primaryAbility} />
            <MiniStatCard label="豁免熟练" value={item.saves.join(' & ')} />
            <MiniStatCard label="受众" value="玩家手册 2024" icon={<Star className="w-3 h-3 text-red-500" />} />
          </div>

          <div className="italic text-stone-500 mb-12 text-lg leading-loose border-l-4 border-stone-100 pl-6 py-2">
            <RichText text={item.fullDescription || item.description} />
          </div>

          {/* Core Traits Section - Wide Display */}
          <div className="mb-12">
            <h3 className="font-black text-xs text-red-900 border-b border-red-100 pb-2 mb-6 uppercase tracking-widest flex items-center gap-2">
              <Star className="w-4 h-4 fill-red-900" /> 核心特质熟练度
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest block">护甲受训</span>
                <p className="text-sm font-bold text-stone-800 bg-stone-50 p-4 rounded-xl border border-stone-100">{item.coreTraits.armorTraining}</p>
              </div>
              <div className="space-y-2">
                <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest block">武器熟练</span>
                <p className="text-sm font-bold text-stone-800 bg-stone-50 p-4 rounded-xl border border-stone-100">{item.coreTraits.weaponProficiencies}</p>
              </div>
              <div className="space-y-2">
                <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest block">技能熟练</span>
                <p className="text-sm font-bold text-stone-800 bg-stone-50 p-4 rounded-xl border border-stone-100">{item.coreTraits.skillProficiencies}</p>
              </div>
            </div>
          </div>

          {item.classTable && (
            <div className="my-12">
              <h3 className="font-black text-xs text-stone-400 uppercase tracking-[0.2em] mb-4">职业进度表</h3>
              <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden p-1">
                <ClassFeatureTable data={item.classTable} />
              </div>
            </div>
          )}

          <div className="relative pt-10 mt-16 border-t border-stone-200">
            <h3 className="font-black text-3xl text-stone-800 uppercase tracking-tighter mb-10 flex items-center gap-3">
              <div className="w-3 h-10 bg-red-600 rounded-full"></div>
              职业特性列表
            </h3>
            <div className="space-y-6">
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
  <DetailContainer
    fluid
    title={item.name}
    subtitle={`${item.parentClass} 子职业`}
    icon={<Crown className="w-10 h-10" />}
    headerColor="bg-blue-950"
    accentColor="border-blue-600"
    bodyContent={
      <>
        <div className="flex flex-col items-center mb-12 border-b border-stone-100 pb-10">
          <span className="text-xs font-black text-stone-400 uppercase tracking-widest block mb-3">所属主职业</span>
          <div className="text-4xl font-black text-blue-900 drop-shadow-sm flex items-center gap-3">
            <Shield className="w-8 h-8 text-blue-300" /> {item.parentClass}
          </div>
        </div>

        <div className="italic text-stone-500 mb-12 text-lg leading-loose p-8 bg-blue-50/20 rounded-3xl border border-blue-50 shadow-inner relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-[0.03] rotate-12 group-hover:rotate-0 transition-transform">
            <Scroll className="w-48 h-48" />
          </div>
          <RichText text={item.fullDescription || item.description} />
        </div>

        <div className="relative pt-10 mt-16 border-t border-stone-200">
          <h3 className="font-black text-3xl text-stone-800 uppercase tracking-tighter mb-10 flex items-center gap-3">
            <div className="w-3 h-10 bg-blue-800 rounded-full"></div>
            子职特性列表
          </h3>
          <div className="space-y-6">
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
  <DetailContainer
    fluid
    title={item.name}
    subtitle="种族"
    icon={<Dna className="w-10 h-10" />}
    headerColor="bg-green-950"
    accentColor="border-green-600"
    bodyContent={
      <>
        {/* Stats Cards Grid - Expanded */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <MiniStatCard label="体型" value={item.size} />
          <MiniStatCard label="步行速度" value={`${item.speed} 尺`} />
          <MiniStatCard label="黑暗视觉" value={item.darkvision ? "具备" : "无"} />
          <MiniStatCard label="生物类别" value="类人生物" icon={<Link className="w-3 h-3 text-green-500" />} />
        </div>

        <div className="italic text-stone-500 mb-12 text-lg leading-loose border-l-4 border-stone-100 pl-6 py-2">
          <RichText text={item.fullDescription || item.description} />
        </div>

        <div className="relative pt-10 mt-16 border-t border-stone-200">
          <h3 className="font-black text-3xl text-stone-800 uppercase tracking-tighter mb-10 flex items-center gap-3">
            <div className="w-3 h-10 bg-green-700 rounded-full"></div>
            种族性状
          </h3>
          <div className="space-y-6">
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
    <DetailContainer
      fluid
      title={item.name}
      subtitle="背景"
      icon={<Scroll className="w-10 h-10" />}
      headerColor="bg-yellow-950"
      accentColor="border-yellow-600"
      bodyContent={
        <>
          {/* Stats Cards Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            <MiniStatCard label="主要属性加值" value={item.abilityScores.join('/')} />
            <MiniStatCard label="起源专长" value={item.feat} icon={<Star className="w-3 h-3 text-yellow-600" />} />
            <MiniStatCard label="起始资金" value="50 GP" />
            <MiniStatCard label="技能数量" value={item.skills.length} />
          </div>

          <div className="italic text-stone-500 mb-12 text-lg leading-loose border-l-4 border-stone-100 pl-6 py-2">
            <RichText text={item.description} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white border-2 border-yellow-50 p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
              <h4 className="font-black text-yellow-900 border-b border-yellow-100 mb-6 pb-2 text-xs uppercase tracking-widest flex items-center gap-2">
                <Shield className="w-4 h-4" /> 背景熟练项
              </h4>
              <div className="space-y-6">
                <div>
                  <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest block mb-1">技能</span>
                  <p className="text-sm font-bold text-stone-800 leading-relaxed">{item.skills.join('、')}</p>
                </div>
                <div>
                  <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest block mb-1">工具</span>
                  <p className="text-sm font-bold text-stone-800 leading-relaxed">{item.tool}</p>
                </div>
              </div>
            </div>

            <div className="bg-white border-2 border-yellow-50 p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
              <h4 className="font-black text-yellow-900 border-b border-yellow-100 mb-6 pb-2 text-xs uppercase tracking-widest flex items-center gap-2">
                <Backpack className="w-4 h-4" /> 起始装备组
              </h4>
              <ul className="space-y-3">
                {item.equipment.map((e, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-stone-700 font-medium">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-yellow-400 flex-shrink-0"></div>
                    {e}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {featInfo && (
            <div className="mt-16 pt-10 border-t border-stone-200 relative">
              <h4 className="font-black text-3xl text-stone-800 flex items-center gap-3 mb-10 tracking-tighter">
                <Star className="w-10 h-10 text-yellow-600 fill-yellow-100" /> 赠送起源专长详情
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
  <DetailContainer
    fluid
    title={item.name}
    subtitle="专长"
    icon={<Award className="w-10 h-10" />}
    headerColor="bg-purple-950"
    accentColor="border-purple-600"
    bodyContent={
      <>
        {/* Stats Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <MiniStatCard label="类别" value={item.category} />
          <MiniStatCard label="先决条件" value={item.prerequisite || "无"} />
          <MiniStatCard label="可复选" value={item.repeatable ? "有" : "无"} />
          <MiniStatCard label="等级限制" value="1 级" icon={<Star className="w-3 h-3 text-purple-500" />} />
        </div>

        <div className="italic text-stone-500 mb-12 text-lg leading-loose border-l-4 border-stone-100 pl-6 py-2">
          <RichText text={item.description} />
        </div>

        <div className="relative pt-10 mt-16 border-t border-stone-200">
          <h3 className="font-black text-3xl text-stone-800 uppercase tracking-tighter mb-10 flex items-center gap-3">
            <div className="w-3 h-10 bg-purple-700 rounded-full"></div>
            专长增益详情
          </h3>
          <div className="space-y-6">
            {item.benefits.map((b, i) => (
              <div key={i} className="flex gap-6 items-start bg-white p-8 rounded-3xl border border-stone-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="mt-1 w-10 h-10 rounded-2xl bg-purple-900 text-white flex items-center justify-center font-black text-lg flex-shrink-0 shadow-lg rotate-3">
                  {i + 1}
                </div>
                <div className="text-base text-stone-700 leading-relaxed font-medium pt-1">
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
    <div className="w-full h-full flex items-center justify-center py-10 px-4">
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
    <DetailContainer
      title={item.name}
      subtitle={subtitle}
      icon={icon}
      headerColor={color}
      accentColor={item.rarity ? `border-${color.replace('bg-', '')}` : 'border-stone-800'}
      bodyContent={
        <>
          {/* Stats Grid for Item */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
            {stats.map((s, idx) => (
              <div key={idx} className={`bg-stone-100/50 p-2 rounded-lg text-center ${s.fullWidth ? 'col-span-2 md:col-span-4' : ''}`}>
                <div className="text-[8px] font-black text-stone-400 uppercase tracking-widest">{s.label}</div>
                <div className="text-xs font-bold text-stone-800">{s.value}</div>
              </div>
            ))}
          </div>

          {/* Prominent Attunement Banner */}
          {isAttuned && (
            <div className="bg-pink-100 border border-pink-300 text-pink-900 px-4 py-2 rounded-lg font-bold flex items-center justify-center gap-2 mb-4 animate-pulse-slow">
              <Link className="w-4 h-4" /> 需同调
            </div>
          )}

          <div className="italic text-stone-600 mb-6 border-b border-stone-200 pb-4">
            <RichText text={descText} />
          </div>

          {item.mastery && (
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-xl text-sm mb-6 shadow-inner">
              <strong className="block text-yellow-900 font-black text-xs uppercase mb-1 flex items-center gap-1.5">
                <Star className="w-4 h-4 fill-yellow-500" /> 武器精通专精
              </strong>
              <RichText text={item.mastery} />
            </div>
          )}

          {item.toolUtilize && (
            <div className="space-y-4 mt-6">
              <h4 className="font-black text-xs uppercase tracking-widest border-b border-stone-200 pb-2 mb-4 flex items-center gap-2">
                <Hammer className="w-4 h-4" /> 工具相关操作
              </h4>
              <div className="grid grid-cols-1 gap-3">
                {item.toolUtilize.map((u, i) => (
                  <div key={i} className="text-xs p-4 bg-white border border-stone-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                    <strong className="text-stone-900 block mb-1">{u.action} (DC {u.dc})</strong>
                    <div className="text-stone-600">{u.description}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      }
      footer={<DetailFooter source={item.source} />}
    />
  );
};
