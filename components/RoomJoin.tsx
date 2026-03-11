import React, { useState, useEffect } from 'react';
import { useRoom } from '../contexts/RoomContext';
import { useCharacters } from '../contexts/CharacterContext';
import { ImageViewer } from './ImageViewer';
import { DicePanel } from './DicePanel';

export const RoomJoin: React.FC = () => {
    const {
        clientState, clientIsConnected, connectToRoom, disconnectFromRoom,
        roomId, error, clientRemoteCharacter, clientSharedImages
    } = useRoom();
    const { characters, updateCharacter, importCharacters } = useCharacters();

    const [inputRoomId, setInputRoomId] = useState('');
    const [selectedCharId, setSelectedCharId] = useState('');

    const [showImageViewer, setShowImageViewer] = useState(false);
    const [showSaveConfirm, setShowSaveConfirm] = useState(false);

    // Auto open image viewer when a new image arrives
    useEffect(() => {
        if (clientSharedImages.length > 0) {
            setShowImageViewer(true);
        }
    }, [clientSharedImages]);

    useEffect(() => {
        if (characters.length > 0 && !selectedCharId) {
            setSelectedCharId(characters[0].id);
        }
    }, [characters]);

    const handleJoin = () => {
        const char = characters.find(c => c.id === selectedCharId);
        if (!char) {
            alert('请先选择一张角色卡');
            return;
        }
        if (!inputRoomId.trim()) {
            alert('请输入房间 ID');
            return;
        }
        connectToRoom(inputRoomId.trim(), char);
    };

    const handleLeaveRoom = () => {
        setShowSaveConfirm(true);
    };

    const finalizeLeave = (saveMode: 'update' | 'new' | 'none') => {
        if (clientRemoteCharacter) {
            if (saveMode === 'update') {
                updateCharacter(selectedCharId, clientRemoteCharacter);
            } else if (saveMode === 'new') {
                importCharacters(clientRemoteCharacter);
            }
        }
        disconnectFromRoom();
        setShowSaveConfirm(false);
    };

    if (clientState.status === 'WAITING_APPROVAL') {
        return (
            <div className="p-8 max-w-lg mx-auto mt-20 bg-white rounded-xl shadow-md border border-orange-200">
                <div className="flex items-center gap-3 mb-6 border-b border-stone-200 pb-4">
                    <div className="w-4 h-4 rounded-full bg-orange-400 animate-bounce"></div>
                    <h2 className="text-2xl font-bold text-stone-800">
                        等待主持人审核...
                    </h2>
                </div>
                <button
                    onClick={disconnectFromRoom}
                    className="w-full bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold py-3 mt-4 rounded-lg transition-colors border border-stone-300"
                >
                    ❌ 取消请求
                </button>
            </div>
        );
    }

    if (clientIsConnected) {
        return (
            <div className="p-4 md:p-8 flex flex-col max-w-7xl mx-auto h-[calc(100vh-4rem)] bg-stone-100">
                {showImageViewer && <ImageViewer onClose={() => setShowImageViewer(false)} />}

                {/* Save Confirmation Modal */}
                {showSaveConfirm && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                        <div className="bg-white rounded-xl max-w-sm w-full p-6 shadow-2xl border border-stone-200 animate-in fade-in zoom-in duration-200">
                            <h3 className="text-xl font-bold text-stone-800 mb-2 flex items-center gap-2">
                                🚪 离开房间
                            </h3>
                            <p className="text-stone-600 mb-6">
                                主持人可能已经修改了你的角色卡。离开前是否要保存最新的角色状态？
                            </p>
                            <div className="space-y-3">
                                <button
                                    onClick={() => finalizeLeave('update')}
                                    className="w-full bg-dndRed hover:bg-red-800 text-white font-bold py-3 rounded-lg transition-colors shadow-sm"
                                >
                                    💾 更新现有角色卡
                                </button>
                                <button
                                    onClick={() => finalizeLeave('new')}
                                    className="w-full bg-stone-800 hover:bg-stone-900 text-white font-bold py-3 rounded-lg transition-colors shadow-sm"
                                >
                                    ✨ 另存为新角色卡
                                </button>
                                <button
                                    onClick={() => finalizeLeave('none')}
                                    className="w-full bg-stone-100 hover:bg-stone-200 text-stone-600 font-bold py-3 rounded-lg transition-colors"
                                >
                                    ❌ 不保存并离开
                                </button>
                                <button
                                    onClick={() => setShowSaveConfirm(false)}
                                    className="w-full text-stone-400 text-sm hover:underline py-2"
                                >
                                    返回房间
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="bg-white p-6 rounded-xl shadow-sm border border-green-200 mb-6 flex-shrink-0">
                    <div className="flex items-center gap-3 border-b border-stone-100 pb-3 mb-3">
                        <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                        <h2 className="text-xl font-bold text-stone-800">已连接: {roomId}</h2>
                        <button
                            onClick={handleLeaveRoom}
                            className="ml-auto bg-stone-100 hover:bg-stone-200 text-stone-600 font-bold px-4 py-1.5 rounded transition-colors text-sm flex items-center gap-1 border border-stone-200"
                        >
                            🚪 离开房间
                        </button>
                    </div>
                    <div className="flex gap-4 items-center flex-wrap">
                        <div className="text-sm">
                            <span className="text-stone-500 mr-2">出场角色:</span>
                            <span className="font-bold">{clientRemoteCharacter?.name || '未知'} (Lv.{clientRemoteCharacter?.level})</span>
                        </div>
                        <div className="text-sm">
                            <span className="text-stone-500 mr-2">当前生命:</span>
                            <span className="font-bold text-dndRed">{clientRemoteCharacter?.currentHp ?? clientRemoteCharacter?.hpMax} / {clientRemoteCharacter?.hpMax}</span>
                        </div>
                        <button
                            onClick={() => setShowImageViewer(true)}
                            className="bg-stone-800 hover:bg-stone-900 text-white font-bold py-1 px-3 rounded text-sm relative transition-colors shadow-sm ml-auto"
                        >
                            🖼️ 共享图片
                            {clientSharedImages.length > 0 && (
                                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                                </span>
                            )}
                        </button>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col md:flex-row gap-6 min-h-0">

                    {/* Character Readonly View Placeholder */}
                    <div className="flex-[3] bg-white rounded-xl shadow-sm border border-stone-200 overflow-y-auto p-6 custom-scrollbar">
                        <h3 className="text-lg font-bold text-stone-800 mb-4 pb-2 border-b border-stone-100">🔒 角色状态 (由 GM 实时同步)</h3>
                        <p className="text-sm text-stone-500 mb-6">您的状态会由主持人进行修改并实时反映在此处。暂不支持在此页面直接编辑角色的深度信息。</p>

                        {clientRemoteCharacter && (
                            <div className="space-y-4">
                                <div className="p-4 bg-stone-50 rounded border border-stone-200 flex justify-between">
                                    <span className="font-bold text-stone-600">生命值记录</span>
                                    <span className="font-mono text-lg text-dndRed">{clientRemoteCharacter.currentHp ?? clientRemoteCharacter.hpMax} / {clientRemoteCharacter.hpMax}</span>
                                </div>
                                <div className="p-4 bg-stone-50 rounded border border-stone-200 flex justify-between">
                                    <span className="font-bold text-stone-600">临时生命值</span>
                                    <span className="font-mono text-lg text-blue-600">{clientRemoteCharacter.tempHp || 0}</span>
                                </div>
                                <div className="p-4 bg-stone-50 rounded border border-stone-200 flex justify-between">
                                    <span className="font-bold text-stone-600">携带资金</span>
                                    <span className="font-mono text-sm text-stone-800">{clientRemoteCharacter.gold || 0} GP / {clientRemoteCharacter.silver || 0} SP / {clientRemoteCharacter.copper || 0} CP</span>
                                </div>
                                <div className="p-4 bg-stone-50 rounded border border-stone-200">
                                    <span className="font-bold text-stone-600 block mb-2">最近物品获取</span>
                                    <div className="text-sm text-stone-700">
                                        {clientRemoteCharacter.inventoryGear?.slice(-3).map(g => g.name).join(', ') || '暂无新物品'}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Sidebar: Dice Panel */}
                    <div className="flex-[2] bg-white rounded-xl shadow-sm border border-stone-200 flex flex-col min-h-[400px]">
                        <DicePanel />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-8 max-w-lg mx-auto mt-20 bg-white rounded-xl shadow-md border border-stone-200">
            <h2 className="text-2xl font-bold text-stone-800 mb-6 flex items-center gap-2 border-b border-stone-200 pb-4">
                <span className="text-3xl">🚪</span>
                加入战役房间
            </h2>

            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                    {error}
                </div>
            )}

            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-bold text-stone-600 mb-2">房间 ID</label>
                    <input
                        type="text"
                        value={inputRoomId}
                        onChange={(e) => setInputRoomId(e.target.value)}
                        className="w-full p-3 border border-stone-300 rounded-lg font-mono focus:outline-none focus:border-dndRed focus:ring-1 focus:ring-dndRed hover:border-dndRed/50 transition-colors"
                        placeholder="例如: dnd5r-a1b2c3"
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold text-stone-600 mb-2">选择出场角色</label>
                    <select
                        value={selectedCharId}
                        onChange={(e) => setSelectedCharId(e.target.value)}
                        className="w-full p-3 border border-stone-300 rounded-lg focus:outline-none focus:border-dndRed focus:ring-1 focus:ring-dndRed bg-stone-50 cursor-pointer"
                    >
                        {characters.length === 0 && <option value="">没有可用的本地角色卡...</option>}
                        {characters.map(c => (
                            <option key={c.id} value={c.id}>{c.name || '未命名'} (Lv. {c.level} {c.className})</option>
                        ))}
                    </select>
                </div>
                <button
                    onClick={handleJoin}
                    disabled={clientState.status === 'CONNECTING' || characters.length === 0}
                    className={`w-full text-white font-bold py-3 pt-4 rounded-lg flex items-center justify-center gap-2 transition-all mt-6 shadow-md text-lg
                        ${clientState.status === 'CONNECTING' || characters.length === 0 ? 'bg-stone-400 cursor-not-allowed' : 'bg-dndRed hover:bg-red-800'}`}
                >
                    {clientState.status === 'CONNECTING' ? '⏳ 正在连接...' : '✅ 申请加入'}
                </button>
            </div>
        </div>
    );
};
