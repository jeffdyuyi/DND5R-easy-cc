import React, { useState } from 'react';
import { Copy, Users, Check, X, Shield, RefreshCw } from 'lucide-react';
import { useRoom } from '../contexts/RoomContext';
import { DiceRoller } from './DiceRoller';
import { ImageViewer } from './ImageViewer';
import CharacterWizard from './CharacterWizard';

export const RoomHost: React.FC = () => {
    const {
        roomId, createRoom, error, closeRoom,
        hostPendingPlayers, hostConnectedPlayers,
        acceptPlayer, rejectPlayer, kickPlayer,
        hostUpdateCharacter
    } = useRoom();

    const [editingPlayerId, setEditingPlayerId] = useState<string | null>(null);

    // Fallback UI states
    const [isCreating, setIsCreating] = useState(false);
    const [inputRoomId, setInputRoomId] = useState('');

    // Tools states
    const [showDiceRoller, setShowDiceRoller] = useState(false);
    const [showImageViewer, setShowImageViewer] = useState(false);

    const handleCreateRoom = () => {
        if (!inputRoomId.trim()) {
            alert("请输入有效的房间 ID");
            return;
        }
        setIsCreating(true);
        // Add a slight delay just so React can render the loading state before blocking the thread with Peer creation
        setTimeout(() => {
            createRoom(inputRoomId.trim());
        }, 10);
    };

    // Auto reset isCreating if error occurs
    React.useEffect(() => {
        if (error) setIsCreating(false);
    }, [error]);

    if (!roomId) {
        return (
            <div className="h-full w-full flex items-center justify-center p-4">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-stone-200 overflow-hidden relative z-10 animate-fade-in">
                    <div className="bg-stone-900 text-stone-100 p-6 text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                            <TowerControlIcon className="w-32 h-32" />
                        </div>
                        <h2 className="text-2xl font-bold font-serif flex justify-center items-center gap-2">
                            <span className="text-3xl">🏰</span>
                            建立战役
                        </h2>
                        <p className="text-stone-400 mt-2 text-sm font-sans">开启联机房间，全域数据实时同步</p>
                    </div>
                    <div className="p-8">
                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm text-center">
                                {error}
                            </div>
                        )}
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-stone-600 mb-2">房间 ID (建议全英文/数字)</label>
                                <input
                                    type="text"
                                    value={inputRoomId}
                                    onChange={(e) => setInputRoomId(e.target.value.replace(/[^a-zA-Z0-9_-]/g, ''))}
                                    className="w-full p-4 bg-stone-50 text-stone-900 border border-stone-300 rounded-xl focus:outline-none focus:border-stone-500 focus:ring-1 focus:ring-stone-500 hover:border-stone-400 transition-colors font-bold text-lg text-center shadow-inner font-mono"
                                    placeholder="例如: dnd-room-123"
                                />
                            </div>
                            <button
                                onClick={handleCreateRoom}
                                disabled={isCreating}
                                className={`w-full text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all mt-6 shadow-md text-lg
                                    ${isCreating ? 'bg-stone-500 cursor-wait' : 'bg-stone-800 hover:bg-stone-900 hover:-translate-y-0.5'}`}
                            >
                                {isCreating ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        正在初始化服务端点...
                                    </>
                                ) : (
                                    <>🚀 开始担任主持人</>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-8 pb-20 max-w-5xl mx-auto h-full animate-fade-in relative z-10 w-full pt-20 bg-stone-100">
            {showDiceRoller && <DiceRoller onClose={() => setShowDiceRoller(false)} />}
            {showImageViewer && <ImageViewer onClose={() => setShowImageViewer(false)} />}

            {/* Header Status */}
            <div className="bg-stone-900 text-stone-100 p-6 rounded-xl shadow-lg border border-stone-700 mb-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <TowerControlIcon className="w-32 h-32" />
                </div>

                <h2 className="text-3xl font-bold font-serif mb-2 flex items-center gap-3">
                    🏰 战役房间
                    <span className="text-xs font-sans bg-green-500/20 text-green-400 px-2 py-1 rounded-full flex items-center gap-1 border border-green-500/30">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        运行中
                    </span>
                </h2>

                <div className="flex flex-wrap gap-6 items-center text-sm mt-4">
                    <div className="flex items-center gap-3 bg-stone-800 py-2 px-4 rounded-lg border border-stone-600">
                        <span className="text-stone-400">房间 ID</span>
                        <code className="font-mono text-lg font-bold text-stone-200 select-all">{roomId}</code>
                        <button
                            className="text-stone-400 hover:text-white transition-colors"
                            title="复制"
                            onClick={() => navigator.clipboard.writeText(roomId)}
                        >
                            <Copy className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="flex items-center gap-2 text-stone-300 bg-stone-800 py-2 px-4 rounded-lg border border-stone-600">
                        <Users className="w-4 h-4" />
                        <span>在线玩家: {hostConnectedPlayers.length}/8</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content: Player List */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Pending Requests */}
                    {hostPendingPlayers.length > 0 && (
                        <div className="bg-orange-50 p-4 rounded-xl border border-orange-200 shadow-sm animate-fade-in">
                            <h3 className="text-sm font-bold text-orange-800 uppercase mb-3 flex items-center gap-2">
                                <Shield className="w-4 h-4" /> 待审核请求 ({hostPendingPlayers.length})
                            </h3>
                            <div className="space-y-3">
                                {hostPendingPlayers.map(p => (
                                    <div key={p.peerId} className="flex items-center justify-between bg-white p-3 rounded-lg border border-orange-100 shadow-sm">
                                        <div>
                                            <div className="font-bold flex items-center gap-2">
                                                <span className="text-green-600">🆕</span> {p.playerName}
                                                <span className="text-xs text-stone-500 font-normal">(Lv{p.character.level} {p.character.className})</span>
                                            </div>
                                            <div className="text-xs text-stone-400 font-mono mt-1">Peer: {p.peerId.split('-').pop()}</div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => acceptPlayer(p.peerId)}
                                                className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg shadow-sm transition-colors text-sm font-bold flex items-center gap-1"
                                            >
                                                <Check className="w-4 h-4" /> 接受
                                            </button>
                                            <button
                                                onClick={() => rejectPlayer(p.peerId)}
                                                className="bg-stone-200 hover:bg-stone-300 text-stone-700 p-2 rounded-lg transition-colors text-sm font-bold flex items-center gap-1"
                                            >
                                                <X className="w-4 h-4" /> 拒绝
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
                        <div className="bg-stone-100 p-4 border-b border-stone-200 flex justify-between items-center">
                            <h3 className="font-bold text-stone-800 flex items-center gap-2">
                                ⚔️ 在线玩家角色卡
                            </h3>
                            <button className="text-xs text-stone-500 hover:text-stone-800 flex items-center gap-1">
                                <RefreshCw className="w-3 h-3" /> 手动刷新
                            </button>
                        </div>
                        <div className="divide-y divide-stone-100">
                            {hostConnectedPlayers.length === 0 && (
                                <div className="p-8 text-center text-stone-400">目前没有连接的玩家</div>
                            )}

                            {hostConnectedPlayers.map(p => (
                                <div key={p.peerId} className="p-4 hover:bg-stone-50 transition-colors flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-stone-200 rounded-full border border-stone-300 flex items-center justify-center overflow-hidden">
                                            {p.character.avatarDataUrl ? (
                                                <img src={p.character.avatarDataUrl} className="w-full h-full object-cover" />
                                            ) : (
                                                <UserIcon className="w-6 h-6 text-stone-400" />
                                            )}
                                        </div>
                                        <div>
                                            <div className="font-bold text-stone-800 flex items-center gap-2">
                                                {p.character.name || p.playerName}
                                            </div>
                                            <div className="text-xs text-stone-500">Lv {p.character.level} {p.character.className}</div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setEditingPlayerId(p.peerId)}
                                            className="px-3 py-1 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded font-bold text-sm text-stone-700 transition-colors flex items-center gap-1"
                                        >
                                            <Shield className="w-3 h-3" /> 修改数值/发放道具
                                        </button>
                                        <button
                                            onClick={() => kickPlayer(p.peerId)}
                                            className="px-3 py-1 bg-red-50 hover:bg-red-100 border border-red-200 rounded font-bold text-sm text-red-600 transition-colors"
                                        >
                                            踢出
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Character Edit Modal */}
                {editingPlayerId && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                        <div className="bg-white rounded-2xl w-full max-w-5xl h-[90vh] flex flex-col shadow-2xl border border-stone-300 relative overflow-hidden">
                            <div className="p-4 border-b border-stone-200 flex justify-between items-center bg-stone-50">
                                <h3 className="text-xl font-bold text-stone-800">
                                    正在修改玩家角色卡: <span className="text-dndRed">{hostConnectedPlayers.find(p => p.peerId === editingPlayerId)?.character.name || '未知'}</span>
                                </h3>
                                <button
                                    onClick={() => setEditingPlayerId(null)}
                                    className="p-2 hover:bg-stone-200 rounded-full transition-colors"
                                >
                                    <X className="w-6 h-6 text-stone-500" />
                                </button>
                            </div>
                            <div className="flex-1 overflow-auto">
                                {(() => {
                                    const p = hostConnectedPlayers.find(cp => cp.peerId === editingPlayerId);
                                    if (!p) return null;
                                    return (
                                        <CharacterWizard
                                            character={p.character}
                                            updateCharacter={(updates) => hostUpdateCharacter(p.peerId, { ...p.character, ...updates })}
                                            onComplete={() => setEditingPlayerId(null)}
                                        />
                                    );
                                })()}
                            </div>
                            <div className="p-3 bg-red-50 border-t border-red-100 text-center text-xs text-red-700 font-bold">
                                ⚠️ 警告: GM 的所有改动将实时同步至玩家端，请谨慎操作。
                            </div>
                        </div>
                    </div>
                )}

                {/* Sidebar: GM Tools */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
                        <h3 className="font-bold text-stone-800 border-b border-stone-100 pb-2 mb-4">
                            🛠️ GM 工具栏
                        </h3>
                        <div className="space-y-3">
                            <button
                                onClick={() => setShowDiceRoller(true)}
                                className="w-full bg-stone-800 hover:bg-stone-900 text-white py-3 rounded-lg font-bold shadow-sm flex justify-center items-center gap-2 transition-colors"
                            >
                                🎲 全体掷骰
                            </button>
                            <button
                                onClick={() => setShowImageViewer(true)}
                                className="w-full bg-stone-800 hover:bg-stone-900 text-white py-3 rounded-lg font-bold shadow-sm flex justify-center items-center gap-2 transition-colors"
                            >
                                🖼️ 发送共享图片
                            </button>
                            <div className="p-3 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-500 text-center">
                                角色的改动将会自动通过 PeerJS 推送同步，无需手动分发。
                            </div>
                        </div>
                    </div>

                    <div className="bg-red-50 p-6 rounded-xl border border-red-200 text-center">
                        <button
                            onClick={closeRoom}
                            className="bg-red-600 hover:bg-red-700 text-white w-full py-3 rounded-lg font-bold shadow-sm transition-colors flex items-center justify-center gap-2"
                        >
                            <X className="w-5 h-5" />
                            关闭并解散房间
                        </button>
                        <p className="mt-3 text-xs text-red-600 font-bold">解散后所有玩家将断开连接</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Lucide Icon Replacements/Helpers
const TowerControlIcon = (props: any) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18.2 12.27 20 6H4l1.8 6.27a1 1 0 0 0 .95.73h10.5a1 1 0 0 0 .96-.73Z" /><path d="M8 13v9" /><path d="M16 22v-9" /><path d="m9 6 1 7" /><path d="m15 6-1 7" /><path d="M12 6V2" /><path d="M13 2h-2" /></svg>
);

const UserIcon = (props: any) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
);
