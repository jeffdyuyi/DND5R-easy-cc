import React from 'react';
import {
    User, Flame, X, Feather
} from 'lucide-react';

interface Props {
    activeModule: string;
    setActiveModule: (module: string) => void;
    isOpen?: boolean;
    onClose?: () => void;
}

const MENU_ITEMS = [
    { id: 'sheet', label: '角色卡', icon: <User className="w-5 h-5" /> },
    { id: 'spellbook', label: '法术书', icon: <Flame className="w-5 h-5" /> },
];

export const PlayerSidebar: React.FC<Props> = ({ activeModule, setActiveModule, isOpen = false, onClose }) => {
    return (
        <>
            <div
                className={`md:hidden fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            />
            <div className={`
         w-64 bg-stone-900 text-stone-300 flex flex-col h-screen fixed left-0 top-0 z-50 border-r border-stone-700 shadow-2xl transition-transform duration-300
         ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
      `}>
                <div className="p-6 border-b border-stone-700 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-dndRed p-2 rounded-lg text-white">
                            <Feather className="w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="font-bold text-white text-lg tracking-wider leading-tight">玩家端</h1>
                            <div className="text-[10px] text-stone-500 uppercase tracking-widest font-bold">制卡器 / 联机</div>
                        </div>
                    </div>
                    <button className="md:hidden text-stone-400 hover:text-white" onClick={onClose}>
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <nav className="flex-grow p-4 space-y-1 overflow-y-auto custom-scrollbar">
                    {MENU_ITEMS.map((item) => {
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
            </div>
        </>
    );
};
