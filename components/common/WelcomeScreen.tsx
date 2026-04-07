import React from 'react';
import { Shield, Users, Feather, User, Database } from 'lucide-react';

interface WelcomeScreenProps {
    onEnter: (role: 'player' | 'gm') => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onEnter }) => {
    return (
        <div className="min-h-screen bg-stone-900 flex font-serif">
            {/* 左侧 - 玩家端 */}
            <div 
                className="w-1/2 min-h-screen bg-gradient-to-br from-indigo-900 to-indigo-950 flex flex-col items-center justify-center p-8 cursor-pointer group relative overflow-hidden"
                onClick={() => onEnter('player')}
            >
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] opacity-5"></div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
                
                <div className="relative z-10 flex flex-col items-center text-center space-y-6">
                    <div className="bg-indigo-500/20 p-6 rounded-full border-2 border-indigo-400/30 group-hover:border-indigo-400/60 transition-all group-hover:scale-110">
                        <User className="w-16 h-16 text-indigo-300" />
                    </div>
                    <div>
                        <h2 className="text-4xl font-pixel text-white tracking-wide group-hover:text-indigo-200 transition-colors">我的角色</h2>
                        <p className="text-indigo-300/60 text-sm font-bold uppercase tracking-widest mt-2">角色创建与管理</p>
                    </div>
                    <div className="bg-indigo-500/20 backdrop-blur-sm px-6 py-3 rounded-lg border border-indigo-400/20 group-hover:border-indigo-400/40 transition-all">
                        <span className="text-indigo-200 font-bold">🎭 点击进入</span>
                    </div>
                </div>
            </div>

            {/* 右侧 - 主持人端 */}
            <div 
                className="w-1/2 min-h-screen bg-gradient-to-br from-red-900 to-stone-950 flex flex-col items-center justify-center p-8 cursor-pointer group relative overflow-hidden"
                onClick={() => onEnter('gm')}
            >
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] opacity-5"></div>
                <div className="absolute top-0 left-0 w-64 h-64 bg-red-500/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
                
                <div className="relative z-10 flex flex-col items-center text-center space-y-6">
                    <div className="bg-red-500/20 p-6 rounded-full border-2 border-red-400/30 group-hover:border-red-400/60 transition-all group-hover:scale-110">
                        <Database className="w-16 h-16 text-red-300" />
                    </div>
                    <div>
                        <h2 className="text-4xl font-pixel text-white tracking-wide group-hover:text-red-200 transition-colors">资源管理</h2>
                        <p className="text-red-300/60 text-sm font-bold uppercase tracking-widest mt-2">GM 工具与数据管理</p>
                    </div>
                    <div className="bg-red-500/20 backdrop-blur-sm px-6 py-3 rounded-lg border border-red-400/20 group-hover:border-red-400/40 transition-all">
                        <span className="text-red-200 font-bold">🛡️ 点击进入</span>
                    </div>
                </div>
            </div>

            {/* 底部固定信息栏 */}
            <div className="fixed bottom-0 left-0 right-0 bg-stone-950/90 backdrop-blur-sm border-t border-stone-800 p-4">
                <div className="max-w-6xl mx-auto flex items-start gap-6">
                    <div className="flex items-start gap-3 flex-1">
                        <Shield className="w-5 h-5 text-dndRed flex-shrink-0 mt-0.5" />
                        <div className="text-xs">
                            <p className="text-stone-400">
                                本工具由 <strong className="text-stone-300">不咕鸟（基德）</strong> 开发 | 基于 <strong className="text-stone-300">DND不全书 (5echm)</strong> 及 D&D 5E (2024) 规则
                            </p>
                            <p className="text-stone-500 mt-1">
                                <span className="text-dndRed font-bold">严禁商业用途</span> | 规则版权归 WotC 所有
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 flex-1">
                        <Users className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                        <div className="text-xs">
                            <p className="text-stone-400">
                                欢迎加入 <a href="https://nogubird.top/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline font-bold">成都本地线下面团秘密基地TRPG俱乐部</a>
                            </p>
                            <p className="text-stone-500 mt-1 font-mono">
                                QQ群: 691707475
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <a 
                            href="https://ifdian.net/a/nogubird" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="inline-flex items-center gap-1 text-xs text-yellow-500 hover:text-yellow-400 font-bold bg-yellow-500/10 hover:bg-yellow-500/20 px-3 py-1.5 rounded-full transition-colors border border-yellow-500/30"
                        >
                            ⭐ 感谢发电
                        </a>
                    </div>
                </div>
            </div>

            {/* 顶部标题 */}
            <div className="fixed top-0 left-0 right-0 bg-stone-900/90 backdrop-blur-sm border-b border-stone-800 p-4 flex justify-center">
                <div className="flex items-center gap-3">
                    <Feather className="w-6 h-6 text-dndRed" />
                    <h1 className="text-2xl font-pixel text-white tracking-wide">不咕鸟 DND5R</h1>
                    <span className="text-xs text-stone-500 font-bold uppercase tracking-widest ml-2">角色构建工具</span>
                </div>
            </div>
        </div>
    );
};
