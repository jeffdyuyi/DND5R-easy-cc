import React, { useState } from 'react';
import { RoomHost } from './RoomHost';
import { RoomJoin } from './RoomJoin';
import { useRoom } from '../contexts/RoomContext';
import { TowerControl, DoorOpen, Menu, Feather, X } from 'lucide-react';

type RoomMode = 'select' | 'host' | 'join';

export const RoomView: React.FC = () => {
    const { role, setRole, roomId, clientIsConnected } = useRoom();
    const [mode, setMode] = useState<RoomMode>('select');

    // If already in a room, show the appropriate view directly
    const isHostActive = role === 'host' && roomId;
    const isClientActive = role === 'client' && (clientIsConnected || roomId);

    if (isHostActive || mode === 'host') {
        if (role !== 'host') setRole('host');
        return (
            <div className="flex w-full bg-stone-100 text-stone-900 font-serif h-full">
                <RoomSidebar mode="host" onBack={() => { setMode('select'); setRole(null); }} />
                <div className="flex-grow md:ml-64 relative overflow-y-auto">
                    <RoomHost />
                </div>
            </div>
        );
    }

    if (isClientActive || mode === 'join') {
        if (role !== 'client') setRole('client');
        return (
            <div className="flex w-full bg-stone-100 text-stone-900 font-serif h-full">
                <RoomSidebar mode="join" onBack={() => { setMode('select'); setRole(null); }} />
                <div className="flex-grow md:ml-64 relative overflow-y-auto">
                    <div className="animate-fade-in p-8">
                        <RoomJoin />
                    </div>
                </div>
            </div>
        );
    }

    // Mode selection screen
    return (
        <div className="h-full w-full flex items-center justify-center bg-stone-100 p-4">
            <div className="max-w-2xl w-full space-y-6 animate-fade-in">
                <div className="text-center mb-8">
                    <h2 className="text-4xl font-bold text-stone-800 font-serif mb-2">🏰 联机房间</h2>
                    <p className="text-stone-500">选择你的角色：创建房间作为主持人，或加入已有房间作为玩家</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Host Option */}
                    <button
                        onClick={() => { setMode('host'); setRole('host'); }}
                        className="group bg-white rounded-2xl shadow-lg border-2 border-stone-200 hover:border-stone-400 p-8 text-left transition-all hover:-translate-y-1 hover:shadow-xl"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="bg-stone-900 p-3 rounded-xl text-white group-hover:bg-stone-800 transition-colors">
                                <TowerControl className="w-8 h-8" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-stone-800">创建房间</h3>
                                <span className="text-xs text-stone-400 uppercase tracking-wider font-bold">Game Master</span>
                            </div>
                        </div>
                        <p className="text-stone-500 text-sm leading-relaxed">
                            作为主持人 (GM) 创建新的战役房间。你可以管理玩家加入、修改角色数据、共享图片和发起投骰。
                        </p>
                        <div className="mt-4 text-stone-800 font-bold text-sm flex items-center gap-1 group-hover:text-dndRed transition-colors">
                            开始建房 →
                        </div>
                    </button>

                    {/* Join Option */}
                    <button
                        onClick={() => { setMode('join'); setRole('client'); }}
                        className="group bg-white rounded-2xl shadow-lg border-2 border-stone-200 hover:border-dndRed/30 p-8 text-left transition-all hover:-translate-y-1 hover:shadow-xl"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="bg-dndRed p-3 rounded-xl text-white group-hover:bg-red-700 transition-colors">
                                <DoorOpen className="w-8 h-8" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-stone-800">加入房间</h3>
                                <span className="text-xs text-stone-400 uppercase tracking-wider font-bold">Player</span>
                            </div>
                        </div>
                        <p className="text-stone-500 text-sm leading-relaxed">
                            输入主持人分享的房间 ID，选择你的角色卡加入战役。加入后可以实时投骰、查看共享内容。
                        </p>
                        <div className="mt-4 text-stone-800 font-bold text-sm flex items-center gap-1 group-hover:text-dndRed transition-colors">
                            输入房间号 →
                        </div>
                    </button>
                </div>

                <div className="text-center text-xs text-stone-400 mt-8">
                    基于 MQTT 协议实时通信 · 无需注册 · 零后端
                </div>
            </div>
        </div>
    );
};

/** Minimal sidebar for Room view */
const RoomSidebar: React.FC<{ mode: 'host' | 'join'; onBack: () => void }> = ({ mode, onBack }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Mobile toggle */}
            <div className="md:hidden flex-none absolute top-0 left-0 w-full bg-stone-900 text-white z-40 p-4 flex justify-between items-center shadow-md">
                <div className="flex items-center gap-2 font-bold">
                    <Feather className="w-5 h-5 text-yellow-400" />
                    <span>房间管理</span>
                </div>
                <button onClick={() => setIsOpen(!isOpen)}>
                    <Menu className="w-6 h-6" />
                </button>
            </div>

            {/* Overlay */}
            <div
                className={`md:hidden fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsOpen(false)}
            />

            {/* Sidebar */}
            <div className={`
                w-64 bg-stone-900 text-stone-300 flex flex-col h-screen fixed left-0 top-0 z-50 border-r border-stone-700 shadow-2xl transition-transform duration-300
                ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
            `}>
                <div className="p-6 border-b border-stone-700 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-yellow-600 p-2 rounded-lg text-white">
                            {mode === 'host' ? <TowerControl className="w-6 h-6" /> : <DoorOpen className="w-6 h-6" />}
                        </div>
                        <div>
                            <h1 className="font-bold text-white text-lg tracking-wider leading-tight">
                                {mode === 'host' ? '主持房间' : '加入房间'}
                            </h1>
                            <div className="text-[10px] text-stone-500 uppercase tracking-widest font-bold">
                                {mode === 'host' ? 'GM · HOST' : 'PLAYER · CLIENT'}
                            </div>
                        </div>
                    </div>
                    <button className="md:hidden text-stone-400 hover:text-white" onClick={() => setIsOpen(false)}>
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <nav className="flex-grow p-4 space-y-2">
                    <div className="text-xs text-stone-500 font-bold uppercase tracking-wider px-4 mb-2">当前模式</div>
                    <div className="bg-stone-800 text-white px-4 py-3 rounded-lg font-bold flex items-center gap-3">
                        {mode === 'host' ? <TowerControl className="w-5 h-5" /> : <DoorOpen className="w-5 h-5" />}
                        {mode === 'host' ? '🏰 房间管理' : '🚪 玩家连接'}
                    </div>
                </nav>

                <div className="p-4 border-t border-stone-700">
                    <button
                        onClick={onBack}
                        className="w-full bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white font-bold py-3 rounded-lg transition-colors text-sm"
                    >
                        ← 返回选择
                    </button>
                </div>
            </div>
        </>
    );
};
