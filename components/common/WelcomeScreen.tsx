import React from 'react';
import { Shield, Users, Feather } from 'lucide-react';

interface WelcomeScreenProps {
    onEnter: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onEnter }) => {
    return (
        <div className="min-h-screen bg-stone-900 flex items-center justify-center p-4 font-serif">
            <div className="bg-white max-w-md w-full rounded-xl shadow-2xl overflow-hidden border-4 border-stone-600 relative transform transition-all -translate-y-4">
                {/* Decorative Header */}
                <div className="bg-dndRed p-5 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')]"></div>
                    <div className="relative z-10 flex flex-col items-center">
                        <div className="bg-white/20 p-2 rounded-full mb-2 backdrop-blur-sm">
                            <Feather className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-2xl font-black text-white tracking-wide">不咕鸟 DND5R</h1>
                        <p className="text-red-100 text-xs font-bold uppercase tracking-widest mt-1">角色构建工具</p>
                    </div>
                </div>

                {/* Content Body */}
                <div className="p-6 space-y-5">
                    <div className="space-y-4 text-stone-700">
                        <div className="flex items-start gap-3">
                            <Shield className="w-5 h-5 text-dndRed flex-shrink-0 mt-0.5" />
                            <div>
                                <h3 className="font-bold text-stone-900 mb-1">免责声明</h3>
                                <p className="text-sm leading-relaxed text-stone-600 text-justify">
                                    本工具由 <strong>不咕鸟（基德）</strong> 开发。内容基于 <strong>DND不全书 (5echm)</strong> 及 D&D 5E (2024) 规则，辅以 AI 技术制作。
                                    <br /><br />
                                    本工具仅供 <strong>个人及亲友团</strong> 快速建卡与跑团交流使用，<span className="text-dndRed font-bold">严禁用于商业用途</span>。所有官方规则版权归原作者(WotC)所有。
                                    <br /><br />
                                    <a href="https://ifdian.net/a/nogubird" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-yellow-600 hover:text-yellow-700 font-bold bg-yellow-50 hover:bg-yellow-100 px-3 py-1.5 rounded-full transition-colors border border-yellow-200">
                                        ⭐ 帮助作者更好创作 (感谢发电)
                                    </a>
                                </p>
                            </div>
                        </div>

                        <div className="h-px bg-stone-200 w-full"></div>

                        <div className="flex items-start gap-3">
                            <Users className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                            <div>
                                <h3 className="font-bold text-stone-900 mb-1">寻找组织</h3>
                                <p className="text-sm text-stone-600">
                                    欢迎加入<a href="http://118.89.179.143/schedule" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline font-bold px-1">成都本地线下面团秘密基地TRPG俱乐部</a>，寻找你的冒险伙伴！
                                </p>
                                <div className="mt-2 bg-stone-100 p-2 rounded text-center border border-stone-200 font-mono font-bold text-stone-800 select-all w-full max-w-[200px]">
                                    QQ群: 691707475
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-2">
                        <button
                            onClick={onEnter}
                            className="w-full bg-stone-800 hover:bg-stone-700 text-white font-bold py-4 rounded-lg shadow-lg transform transition-all active:scale-95 flex items-center justify-center gap-2"
                        >
                            <span>我已了解，开始建卡</span>
                        </button>
                        <p className="text-center text-[10px] text-stone-400 mt-3">
                            点击上方按钮即代表您同意本工具仅用于非商业学习用途。
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
