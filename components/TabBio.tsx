
import React, { useState } from 'react';
import { CharacterData } from '../types';
import { User, Heart, Briefcase, Ruler, Users, Building, AlertCircle, Link, Lightbulb, ChevronDown, ChevronUp, Scale } from 'lucide-react';

interface Props {
  character: CharacterData;
  updateCharacter: (updates: Partial<CharacterData>) => void;
}

export const ALIGNMENT_DETAILS: Record<string, { desc: string, quote: string }> = {
  '守序善良': { 
     desc: '守序善良（Lawful Good）的角色就像一个好人应该或必须的方式行事。他结合了对抗邪恶的信念和严酷的战斗训练。他诚实守信，帮助需要的人，指出不公之事。一个守序善良的角色不愿看到不受惩罚的罪行。',
     quote: '“十字军”：荣誉与同情心的结合。'
  },
  '中立善良': { 
     desc: '中立善良（Neutral Good）的人会尽可能做一个好人。他乐意帮助别人。他可能与国王和官员合作，但不会对他们感到感激。行善不会有偏颇或与命令抵触。',
     quote: '“施恩者”：行善无界。'
  },
  '混乱善良': { 
     desc: '混乱善良（Chaotic Good）的人会根据他自己的内心行事，而不管他人的期望。他有自己的方式，但是善良而仁慈。他相信善良和正义，但不会服从法律和规矩。他讨厌人们强迫别人或指示他怎么做。',
     quote: '“反抗者”：善良的心与自由的灵魂。'
  },
  '守序中立': { 
     desc: '守序中立（Lawful Neutral）的人以法律，传统或个人信条来引导他的行动。秩序和组织对他来说极为重要。他可能有个人信条，生活则遵循某个规则或标准，他也可能希望一切都按部就班，并且支持一个强大而有组织的政府领导。',
     quote: '“审判者”：值得信赖，荣誉至上。'
  },
  '绝对中立': { 
     desc: '绝对中立（True Neutral）的人并没有什么主意。他对善良和邪恶，秩序和混乱没有特别的倾向。大部分绝对中立的角色缺乏信念，而不是信仰中立。这样的人认为善良要比邪恶好，毕竟他宁愿有善良的邻居和统治者而不是邪恶的。',
     quote: '“无立场者”：自然处事，无偏无迫。'
  },
  '混乱中立': { 
     desc: '混乱中立（Chaotic Neutral）的人冲动行事。他自始自终都是个人主义者。他重视自己的自由，但不愿意保护别人的自由。他躲避权威，怨恨约束，以及挑战传统。一个混乱中立的人不会像无政府主义者一样有意去破坏组织。',
     quote: '“自由灵”：真正的自由，不受道德劝说限制。'
  },
  '守序邪恶': { 
     desc: '守序邪恶（Lawful Evil）的人会依照自己的行为规则来得到他想要的东西，而不管这是否会伤害其他人。他重视传统，忠诚和秩序，但不关心自由，尊严或生命。他依规则行事，但是却没有怜悯和同情。',
     quote: '“支配者”：系统化、有计划的邪恶。'
  },
  '中立邪恶': { 
     desc: '中立邪恶（Neutral Evil）的人会为了自己做任何事。他只为了自己，单纯而简单。他不会为他杀死的人流泪，不论是为了利益，高兴还是方便。他不喜欢法律，而且也不会幻想追随法律、传统或任何规范会让自己高贵。',
     quote: '“犯罪者”：纯粹的邪恶，无荣誉亦无变通。'
  },
  '混乱邪恶': { 
     desc: '混乱邪恶（Chaotic Evil）的角色会因他的贪婪，憎恨而做任何事，破坏欲驱使他如此行为。他暴躁，充满恶意，专横暴力而且不可预测。如果只是为了得到他想要的东西，他显得无情而残忍。如果为了散播邪恶和混乱，情况可能更糟糕。',
     quote: '“毁灭者”：破坏美与生命所依赖的秩序。'
  }
};

const CHARACTER_QUESTIONS = [
  "你为何离开家乡踏上冒险？是为了财富、名声、复仇还是真理？",
  "你的核心信念是什么？在面对生死抉择时，你会坚持什么原则？",
  "谁是你生命中最重要的人？你为了保护谁而战？或者你辜负了谁？",
  "你最大的弱点或诱惑是什么？金钱、权力、美色还是知识？",
  "你有什么不可告人的秘密或遗憾？",
  "当队伍遇到分歧时，你通常是领导者、调停者还是独行侠？"
];

const TabBio: React.FC<Props> = ({ character, updateCharacter }) => {
  const [showGuide, setShowGuide] = useState(true);
  const alignInfo = character.alignment ? ALIGNMENT_DETAILS[character.alignment] : null;

  return (
    <div className="p-6 pb-20 bg-stone-50 min-h-full font-serif">
      <h2 className="text-3xl font-bold text-dndRed mb-6 border-b-2 border-dndRed pb-2">个性与画风设定</h2>
      
      {/* 1. Core Identity & Physical */}
      <div className="bg-white border border-stone-300 p-6 rounded-lg shadow-sm mb-8">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Identity Column */}
            <div className="space-y-4">
               <h3 className="font-bold text-stone-800 flex items-center gap-2 uppercase text-sm tracking-wider border-b border-stone-200 pb-1">
                  <User className="w-4 h-4"/> 核心身份
               </h3>
               <div>
                  <label className="text-xs font-bold text-stone-500 block mb-1">姓名</label>
                  <input type="text" value={character.name} onChange={e=>updateCharacter({name: e.target.value})} className="w-full p-2 border rounded font-bold focus:border-dndRed outline-none" />
               </div>
               <div>
                  <label className="text-xs font-bold text-stone-500 block mb-1">代词 (Pronouns)</label>
                  <input type="text" value={character.pronouns} onChange={e=>updateCharacter({pronouns: e.target.value})} className="w-full p-2 border rounded focus:border-dndRed outline-none" placeholder="他/她/它" />
               </div>
               <div>
                  <label className="text-xs font-bold text-stone-500 block mb-1">信仰 (Faith)</label>
                  <input type="text" value={character.faith} onChange={e=>updateCharacter({faith: e.target.value})} className="w-full p-2 border rounded focus:border-dndRed outline-none" placeholder="信仰的神祗或哲学" />
               </div>
               <div>
                  <label className="text-xs font-bold text-stone-500 block mb-1">生活方式 (Lifestyle)</label>
                  <input type="text" value={character.lifestyle} onChange={e=>updateCharacter({lifestyle: e.target.value})} className="w-full p-2 border rounded focus:border-dndRed outline-none" placeholder="例如：舒适 (2gp/天)" />
               </div>
            </div>

            {/* Physical Column */}
            <div className="md:col-span-2 space-y-4">
               <h3 className="font-bold text-stone-800 flex items-center gap-2 uppercase text-sm tracking-wider border-b border-stone-200 pb-1">
                  <Ruler className="w-4 h-4"/> 物理特征
               </h3>
               <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div><label className="text-xs text-stone-500 block">性别</label><input type="text" value={character.gender} onChange={e=>updateCharacter({gender: e.target.value})} className="w-full p-1 border-b bg-transparent focus:outline-none focus:border-dndRed"/></div>
                  <div><label className="text-xs text-stone-500 block">年龄</label><input type="text" value={character.age} onChange={e=>updateCharacter({age: e.target.value})} className="w-full p-1 border-b bg-transparent focus:outline-none focus:border-dndRed"/></div>
                  <div><label className="text-xs text-stone-500 block">身高</label><input type="text" value={character.height} onChange={e=>updateCharacter({height: e.target.value})} className="w-full p-1 border-b bg-transparent focus:outline-none focus:border-dndRed"/></div>
                  <div><label className="text-xs text-stone-500 block">体重</label><input type="text" value={character.weight} onChange={e=>updateCharacter({weight: e.target.value})} className="w-full p-1 border-b bg-transparent focus:outline-none focus:border-dndRed"/></div>
                  <div className="col-span-2"><label className="text-xs text-stone-500 block">发色/发型</label><input type="text" value={character.hair} onChange={e=>updateCharacter({hair: e.target.value})} className="w-full p-1 border-b bg-transparent focus:outline-none focus:border-dndRed"/></div>
                  <div><label className="text-xs text-stone-500 block">肤色</label><input type="text" value={character.skin} onChange={e=>updateCharacter({skin: e.target.value})} className="w-full p-1 border-b bg-transparent focus:outline-none focus:border-dndRed"/></div>
                  <div><label className="text-xs text-stone-500 block">瞳色</label><input type="text" value={character.eyes} onChange={e=>updateCharacter({eyes: e.target.value})} className="w-full p-1 border-b bg-transparent focus:outline-none focus:border-dndRed"/></div>
               </div>
               <div>
                  <label className="text-xs font-bold text-stone-500 block mb-1">外貌描述 (Appearance)</label>
                  <textarea value={character.appearance} onChange={e=>updateCharacter({appearance: e.target.value})} className="w-full p-2 border rounded text-sm h-20 resize-none focus:border-dndRed outline-none" placeholder="描述你的显著特征、穿衣风格、伤疤或纹身..." />
               </div>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Left Column: Personality & Alignment */}
         <div className="lg:col-span-1 space-y-6">
            {/* Alignment Card */}
            <VerticalCard 
               title={character.alignment || "未选择阵营"}
               subtitle={alignInfo ? alignInfo.quote : ""}
               icon={<Scale className="w-6 h-6"/>}
               headerColor="bg-stone-900"
               bodyContent={
                  alignInfo ? (
                     <div className="text-sm text-stone-700 leading-relaxed text-justify">{alignInfo.desc}</div>
                  ) : <div className="text-center text-stone-400 italic">请在下方选择阵营</div>
               }
               footer={
                  <select 
                     value={character.alignment} 
                     onChange={(e) => updateCharacter({ alignment: e.target.value as any })}
                     className="bg-stone-800 text-stone-300 text-xs p-1 rounded border border-stone-700 focus:outline-none w-full"
                  >
                     <option value="">-- 选择阵营 --</option>
                     {['守序善良', '中立善良', '混乱善良','守序中立', '绝对中立', '混乱中立','守序邪恶', '中立邪恶', '混乱邪恶'].map(a => 
                        <option key={a} value={a}>{a}</option>
                     )}
                  </select>
               }
            />

            {/* Personality Grids */}
            <div className="space-y-4">
               {[
                  { label: "个性特征", field: "personalityTraits", icon: <User className="w-3 h-3"/>, ph: "我总是..." },
                  { label: "理想", field: "ideals", icon: <Heart className="w-3 h-3"/>, ph: "我相信..." },
                  { label: "牵绊", field: "bonds", icon: <Link className="w-3 h-3"/>, ph: "我会为了..." },
                  { label: "缺点", field: "flaws", icon: <AlertCircle className="w-3 h-3"/>, ph: "我无法抗拒..." }
               ].map((item) => (
                  <div key={item.field} className="bg-white p-3 rounded shadow-sm border border-stone-200">
                     <label className="block font-bold text-stone-800 text-sm mb-1 flex items-center gap-2">
                        {item.icon} {item.label}
                     </label>
                     <textarea 
                        // @ts-ignore
                        value={character[item.field]}
                        // @ts-ignore
                        onChange={(e) => updateCharacter({ [item.field]: e.target.value })}
                        className="w-full min-h-[4rem] p-2 text-sm bg-stone-50 border border-stone-200 rounded focus:outline-none focus:border-dndRed resize-y placeholder:text-stone-300"
                        placeholder={item.ph}
                     />
                  </div>
               ))}
            </div>
         </div>

         {/* Right Column: Lore & Relations */}
         <div className="lg:col-span-2 space-y-6">
            
            {/* Guide Toggle */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg overflow-hidden shadow-sm">
               <button 
                  onClick={() => setShowGuide(!showGuide)}
                  className="w-full px-4 py-3 flex justify-between items-center text-yellow-900 bg-yellow-100/50 hover:bg-yellow-100 transition-colors"
               >
                  <div className="flex items-center gap-2 font-bold text-sm">
                     <Lightbulb className="w-4 h-4"/> 角色灵魂构建指南
                  </div>
                  {showGuide ? <ChevronUp className="w-4 h-4"/> : <ChevronDown className="w-4 h-4"/>}
               </button>
               {showGuide && (
                  <div className="p-4 text-stone-700 animate-fade-in grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                     {CHARACTER_QUESTIONS.map((q, i) => (
                        <div key={i} className="flex gap-2 items-start">
                           <span className="font-bold text-yellow-600">{i+1}.</span>
                           <span>{q}</span>
                        </div>
                     ))}
                  </div>
               )}
            </div>

            <div className="bg-white p-6 rounded shadow-sm border border-stone-200">
               <div className="flex justify-between items-center mb-4 border-b pb-2">
                  <h3 className="font-bold text-lg text-dndRed">背景故事 (Backstory)</h3>
               </div>
               <textarea 
                  value={character.backstory}
                  onChange={(e) => updateCharacter({ backstory: e.target.value })}
                  className="w-full min-h-[500px] p-4 bg-stone-50 border-2 border-stone-100 rounded focus:outline-none focus:ring-2 focus:ring-dndRed leading-relaxed resize-y placeholder:text-stone-300 font-serif text-lg"
                  placeholder="在此书写你的传奇..."
               />
               <div className="mt-4 pt-4 border-t border-stone-200">
                  <h3 className="font-bold text-lg text-stone-800 mb-4 flex items-center gap-2">
                     <Briefcase className="w-5 h-5 text-dndRed"/> 社交与组织
                  </h3>
                  <div className="space-y-4">
                     <div>
                        <label className="block text-sm font-bold text-stone-600 mb-1 flex items-center gap-1"><Building className="w-3 h-3"/> 所属组织 (Organizations)</label>
                        <input type="text" value={character.organizations} onChange={e=>updateCharacter({organizations: e.target.value})} className="w-full p-2 border rounded focus:border-dndRed outline-none" placeholder="例如：竖琴手同盟、散塔林会..." />
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                           <label className="block text-sm font-bold text-green-700 mb-1 flex items-center gap-1"><Users className="w-3 h-3"/> 盟友 (Allies)</label>
                           <textarea value={character.allies} onChange={e=>updateCharacter({allies: e.target.value})} className="w-full p-2 border rounded h-24 text-sm focus:border-dndRed outline-none" placeholder="值得信赖的伙伴..." />
                        </div>
                        <div>
                           <label className="block text-sm font-bold text-red-700 mb-1 flex items-center gap-1"><Users className="w-3 h-3"/> 敌人 (Enemies)</label>
                           <textarea value={character.enemies} onChange={e=>updateCharacter({enemies: e.target.value})} className="w-full p-2 border rounded h-24 text-sm focus:border-dndRed outline-none" placeholder="死敌、竞争对手..." />
                        </div>
                     </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-stone-200">
                     <label className="block text-sm font-bold text-stone-500 mb-2">其他笔记</label>
                     <textarea 
                        value={character.otherNotes}
                        onChange={(e) => updateCharacter({ otherNotes: e.target.value })}
                        className="w-full h-24 p-2 text-sm border rounded focus:border-dndRed outline-none"
                        placeholder="任何其他重要信息..."
                     />
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

const VerticalCard: React.FC<any> = ({ title, subtitle, icon, headerColor, bodyContent, footer }) => (
   <div className="bg-white border-4 border-stone-800 rounded-lg shadow-md overflow-hidden flex flex-col">
      <div className={`${headerColor || 'bg-stone-800'} text-white p-3 flex justify-between items-center relative overflow-hidden`}>
         <div className="relative z-10 flex items-center gap-3">
            <div className="p-1.5 bg-black/30 rounded border border-white/20">{icon}</div>
            <div>
               <h3 className="font-bold text-xl leading-none">{title}</h3>
               {subtitle && <div className="text-[10px] opacity-80 mt-0.5">{subtitle}</div>}
            </div>
         </div>
      </div>
      <div className="p-4 flex-grow bg-stone-50">
         {bodyContent}
      </div>
      {footer && <div className="bg-stone-900 p-2">{footer}</div>}
   </div>
);

export default TabBio;
