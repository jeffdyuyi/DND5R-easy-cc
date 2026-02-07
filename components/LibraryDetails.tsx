
import React from 'react';
import { ClassItem, SpeciesItem, BackgroundItem, SubclassItem, SpellItem, FeatItem, ItemItem, ClassTableData } from '../types';
import {
  Scroll, Dna, Star,
  Shield, Swords, Hammer, Backpack, Award, Gem,
  Box, Crown, Link
} from 'lucide-react';
import { RichText } from './RichText';

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


// --- Helper: Inner Feature Block ---
const InnerFeatureBlock: React.FC<{ title: string, level?: number, description: string }> = ({ title, level, description }) => (
  <div className="border-l-4 border-stone-400 pl-3 py-1 my-4">
    <div className="flex items-baseline gap-2 mb-1">
      {level !== undefined && <span className="text-xs font-bold bg-stone-200 px-1.5 rounded text-stone-600">Lv.{level}</span>}
      <h4 className="font-bold text-stone-800 text-base">{title}</h4>
    </div>
    <div className="text-sm text-stone-700">
      <RichText text={description} />
    </div>
  </div>
);

// --- Class Feature Table Component ---

const ClassFeatureTable = ({ data }: { data: ClassTableData }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="my-6 border border-stone-300 rounded overflow-hidden shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-stone-100 p-3 text-left font-bold text-stone-800 flex justify-between items-center hover:bg-stone-200 transition-colors"
      >
        <span className="flex items-center gap-2">
          <Swords className="w-4 h-4 text-stone-500" />
          {data.title}
        </span>
        <span className="text-xs bg-stone-200 px-2 py-1 rounded text-stone-600">
          {isOpen ? "收起表格" : "展开表格"}
        </span>
      </button>

      {isOpen && (
        <div className="overflow-x-auto bg-white">
          <table className="w-full text-sm text-left border-collapse">
            <thead className="bg-stone-50 text-stone-700 font-bold border-b-2 border-stone-300">
              <tr>
                {data.columns.map(col => (
                  <th key={col.key} className="p-2 whitespace-nowrap border-r border-stone-200 last:border-0">{col.header}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {data.rows.map((row, idx) => (
                <tr key={idx} className={`hover:bg-blue-50 ${idx % 2 === 0 ? "bg-white" : "bg-stone-50"}`}>
                  {data.columns.map(col => (
                    <td key={col.key} className="p-2 border-r border-stone-100 last:border-0 align-top">
                      {col.key === 'features' && Array.isArray(row[col.key])
                        ? (row[col.key] as string[]).map((f, i) => (
                          <span key={i} className="inline-block bg-stone-100 border border-stone-300 rounded px-1 text-xs mr-1 mb-1">{f}</span>
                        ))
                        : <span className="font-medium text-stone-700">{row[col.key]}</span>
                      }
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

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
      subtitle="职业 Class"
      icon={<Shield className="w-6 h-6" />}
      headerColor="bg-red-900"
      accentColor="border-red-950"
      stats={[
        { label: "生命骰", value: item.hitDie },
        { label: "首级生命值", value: `${parseInt(item.hitDie.substring(1))} + 体质` },
        { label: "主要属性", value: item.primaryAbility },
        { label: "豁免熟练", value: item.saves.join(' & ') },
        { label: "武器与护甲", value: "详见特性", fullWidth: true },
      ]}
      bodyContent={
        <>
          <div className="italic text-stone-600 mb-4 border-b border-stone-300 pb-4">
            <RichText text={item.fullDescription || item.description} />
          </div>

          <div className="bg-white border border-stone-300 p-3 rounded shadow-sm mb-4">
            <h4 className="font-bold text-red-900 border-b border-red-100 mb-2 pb-1 text-xs uppercase flex items-center gap-1">
              <Star className="w-3 h-3" /> 核心特质
            </h4>
            <div className="space-y-2 text-xs">
              <p><strong>护甲受训:</strong> {item.coreTraits.armorTraining}</p>
              <p><strong>武器熟练:</strong> {item.coreTraits.weaponProficiencies}</p>
              <p><strong>技能熟练:</strong> {item.coreTraits.skillProficiencies}</p>
            </div>
          </div>


          {item.classTable && <ClassFeatureTable data={item.classTable} />}

          <h3 className="font-black text-lg text-stone-800 uppercase tracking-wide border-b-2 border-stone-800 pb-1 mb-4">职业特性</h3>
          {visibleFeatures.map((f, i) => (
            <InnerFeatureBlock key={i} title={f.name} level={f.level} description={f.description} />
          ))}
        </>
      }
      footer={<DetailFooter source={item.source} />}
    />
  );
};

export const SubclassDetailView = ({ item }: { item: SubclassItem }) => (
  <VerticalCard
    title={item.name}
    subtitle={`${item.parentClass}子职`}
    icon={<Crown className="w-6 h-6" />}
    headerColor="bg-blue-900"
    accentColor="border-blue-950"
    stats={[
      { label: "主职业", value: item.parentClass, fullWidth: true }
    ]}
    bodyContent={
      <>
        <div className="italic text-stone-600 mb-4">
          <RichText text={item.fullDescription || item.description} />
        </div>
        <h3 className="font-black text-lg text-stone-800 uppercase tracking-wide border-b-2 border-stone-800 pb-1 mb-4">子职特性</h3>
        {item.features.sort((a, b) => a.level - b.level).map((f, i) => (
          <InnerFeatureBlock key={i} title={f.name} level={f.level} description={f.description} />
        ))}
      </>
    }
    footer={<DetailFooter source={item.source} />}
  />
);

export const SpeciesDetailView = ({ item }: { item: SpeciesItem }) => (
  <VerticalCard
    title={item.name}
    subtitle="种族 Species"
    icon={<Dna className="w-6 h-6" />}
    headerColor="bg-green-800"
    accentColor="border-green-900"
    stats={[
      { label: "体型", value: item.size },
      { label: "速度", value: `${item.speed} 尺` },
      { label: "黑暗视觉", value: item.darkvision ? "有" : "无", fullWidth: true },
    ]}
    bodyContent={
      <>
        <div className="italic text-stone-600 mb-6">
          <RichText text={item.description} />
        </div>
        <h3 className="font-black text-lg text-stone-800 uppercase tracking-wide border-b-2 border-stone-800 pb-1 mb-4">种族特性</h3>
        {item.traits.map((t, i) => (
          <InnerFeatureBlock key={i} title={t.name} description={t.description} />
        ))}
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
      subtitle="背景 Background"
      icon={<Scroll className="w-6 h-6" />}
      headerColor="bg-yellow-700"
      accentColor="border-yellow-900"
      stats={[
        { label: "属性加值", value: item.abilityScores.join('/') },
        { label: "起源专长", value: item.feat },
      ]}
      bodyContent={
        <>
          <div className="italic text-stone-600 mb-6">
            <RichText text={item.description} />
          </div>

          <div className="space-y-4">
            <div className="bg-stone-100 p-3 rounded border border-stone-300">
              <h4 className="font-bold text-stone-800 text-xs uppercase mb-1">熟练项</h4>
              <p><strong>技能:</strong> {item.skills.join('、')}</p>
              <p><strong>工具:</strong> {item.tool}</p>
            </div>

            <div className="bg-stone-100 p-3 rounded border border-stone-300">
              <h4 className="font-bold text-stone-800 text-xs uppercase mb-1">起始装备</h4>
              <ul className="list-disc pl-4 text-xs space-y-1">
                {item.equipment.map((e, i) => <li key={i}>{e}</li>)}
              </ul>
            </div>

            {featInfo && (
              <div className="border-t-2 border-stone-300 pt-4">
                <h4 className="font-bold text-stone-800 flex items-center gap-2 mb-2">
                  <Star className="w-4 h-4 text-yellow-600" /> 赠送专长详情
                </h4>
                <div className="text-sm bg-white p-3 rounded border border-stone-200">
                  <p className="font-bold mb-1">{featInfo.name}</p>
                  <ul className="list-disc pl-4 text-xs text-stone-600 space-y-1">
                    {featInfo.benefits.map((b, i) => <li key={i}><RichText text={b} /></li>)}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </>
      }
      footer={<DetailFooter source={item.source} />}
    />
  );
};

export const FeatDetailView = ({ item }: { item: FeatItem }) => (
  <VerticalCard
    title={item.name}
    subtitle="专长 Feat"
    icon={<Award className="w-6 h-6" />}
    headerColor="bg-purple-900"
    accentColor="border-purple-950"
    stats={[
      { label: "类别", value: item.category },
      { label: "先决条件", value: item.prerequisite || "无" },
      { label: "可复选", value: item.repeatable ? "是" : "否", fullWidth: true },
    ]}
    bodyContent={
      <>
        <div className="italic text-stone-600 mb-6 bg-purple-50 p-3 rounded border border-purple-100">
          <RichText text={item.description} />
        </div>
        <h3 className="font-black text-lg text-stone-800 uppercase tracking-wide border-b-2 border-stone-800 pb-1 mb-4">专长增益</h3>
        <ul className="space-y-4">
          {item.benefits.map((b, i) => (
            <li key={i} className="flex gap-2 items-start">
              <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-700 flex-shrink-0"></div>
              <div><RichText text={b} /></div>
            </li>
          ))}
        </ul>
      </>
    }
    footer={<DetailFooter source={item.source} />}
  />
);

export const SpellDetailView = ({ item }: { item: SpellItem }) => {
  // 使用新的SpellCard组件
  const SpellCard = React.lazy(() => import('./SpellCard'));

  return (
    <React.Suspense fallback={<div className="p-4 text-center">加载中...</div>}>
      <div className="w-full max-w-lg md:max-w-xl lg:max-w-2xl mx-auto my-4">
        <SpellCard item={item} />
      </div>
    </React.Suspense>
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
