
import React from 'react';
import { 
  Shield, Book, Backpack, Zap, Crown, User, 
  Sword, FlaskConical, Scroll, Star, Hammer, Flame,
  Feather, MessageCircle, Link as LinkIcon, Users, X
} from 'lucide-react';

interface Props {
  activeModule: string;
  setActiveModule: (module: string) => void;
  isOpen?: boolean; // New prop for mobile
  onClose?: () => void; // New prop for mobile
}

const MENU_ITEMS = [
  { id: 'sheet', label: '角色卡', icon: <User className="w-5 h-5" /> },
  { id: 'spellbook', label: '法术书', icon: <Flame className="w-5 h-5" /> },
  { type: 'divider' },
  { id: 'lib-class', label: '职业库', icon: <Shield className="w-5 h-5" /> },
  { id: 'lib-subclass', label: '子职业库', icon: <Star className="w-5 h-5" /> },
  { id: 'lib-species', label: '种族库', icon: <Crown className="w-5 h-5" /> },
  { id: 'lib-bg', label: '背景库', icon: <Scroll className="w-5 h-5" /> },
  { id: 'lib-feat', label: '专长库', icon: <Book className="w-5 h-5" /> },
  { id: 'lib-spell', label: '法术库', icon: <Zap className="w-5 h-5" /> },
  { type: 'divider' },
  { id: 'lib-weapon', label: '武器库', icon: <Sword className="w-5 h-5" /> },
  { id: 'lib-armor', label: '护甲库', icon: <Shield className="w-5 h-5" /> },
  { id: 'lib-tool', label: '工具库', icon: <Hammer className="w-5 h-5" /> },
  { id: 'lib-gear', label: '冒险物品', icon: <Backpack className="w-5 h-5" /> },
  { id: 'lib-magic', label: '魔法物品', icon: <FlaskConical className="w-5 h-5" /> },
];

export const Sidebar: React.FC<Props> = ({ activeModule, setActiveModule, isOpen = false, onClose }) => {
  return (
    <>
      {/* Mobile Overlay */}
      <div 
         className={`md:hidden fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
         onClick={onClose}
      />

      {/* Sidebar Container */}
      <div className={`
         w-64 bg-stone-900 text-stone-300 flex flex-col h-screen fixed left-0 top-0 z-50 border-r border-stone-700 shadow-2xl transition-transform duration-300
         ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
      `}>
         {/* Header Logo */}
         <div className="p-6 border-b border-stone-700 flex items-center justify-between">
            <div className="flex items-center gap-3">
               <div className="bg-dndRed p-2 rounded-lg text-white">
                  <Feather className="w-6 h-6" />
               </div>
               <div>
                  <h1 className="font-bold text-white text-lg tracking-wider leading-tight">不咕鸟DND5R</h1>
                  <div className="text-[10px] text-stone-500 uppercase tracking-widest font-bold">制卡器</div>
               </div>
            </div>
            {/* Mobile Close Button */}
            <button className="md:hidden text-stone-400 hover:text-white" onClick={onClose}>
               <X className="w-6 h-6" />
            </button>
         </div>

         {/* Navigation */}
         <nav className="flex-grow p-4 space-y-1 overflow-y-auto custom-scrollbar">
            {MENU_ITEMS.map((item, idx) => {
               if (item.type === 'divider') {
                  return <div key={idx} className="h-px bg-stone-700 my-3 mx-2" />;
               }
               return (
               <button
                  key={item.id}
                  onClick={() => item.id && setActiveModule(item.id)}
                  className={`
                     w-full flex items-center gap-3 px-4 py-2.5 rounded-lg font-bold transition-all duration-200 text-sm
                     ${activeModule === item.id 
                     ? 'bg-dndRed text-white shadow-lg' 
                     : 'hover:bg-stone-800 text-stone-400 hover:text-white'}
                  `}
               >
                  {item.icon}
                  {item.label}
               </button>
               );
            })}
         </nav>

         {/* Author & Info Footer */}
         <div className="p-4 border-t border-stone-800 bg-black/20">
            <div className="space-y-3">
               <div className="flex items-center gap-2 text-stone-200 font-bold text-xs">
                  <User className="w-3 h-3 text-dndRed" />
                  <span>作者：不咕鸟（基德）</span>
               </div>
               
               <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-[10px] text-stone-500 hover:text-stone-300 transition-colors">
                     <MessageCircle className="w-3 h-3" />
                     <span>微信: jeffyuyi</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-stone-500 hover:text-stone-300 transition-colors">
                     <Users className="w-3 h-3" />
                     <span>企鹅群: 261751459</span>
                  </div>
                  <a href="https://5echm.kagangtuya.top/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[10px] text-blue-400 hover:text-blue-300 transition-colors truncate">
                     <LinkIcon className="w-3 h-3 flex-shrink-0" />
                     <span className="truncate">5echm.kagangtuya.top</span>
                  </a>
               </div>
            </div>
         </div>
      </div>
    </>
  );
};
