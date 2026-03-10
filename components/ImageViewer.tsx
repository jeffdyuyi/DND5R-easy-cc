import React, { useRef, useState } from 'react';
import { useRoom } from '../contexts/RoomContext';
import { Image as ImageIcon, Upload, X, Send } from 'lucide-react';

export const ImageViewer: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const { role, hostBroadcast, clientSharedImages } = useRoom();

    // For Host:
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [caption, setCaption] = useState('');
    const [isSending, setIsSending] = useState(false);

    // For Client:
    const [viewIndex, setViewIndex] = useState(0);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 2 * 1024 * 1024) {
            alert('图片不能大于 2MB');
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            const dataUrl = event.target?.result as string;
            // Basic resize
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;
                const maxSize = 1200;

                if (width > height) {
                    if (width > maxSize) {
                        height *= maxSize / width;
                        width = maxSize;
                    }
                } else {
                    if (height > maxSize) {
                        width *= maxSize / height;
                        height = maxSize;
                    }
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx?.drawImage(img, 0, 0, width, height);
                const compressedUrl = canvas.toDataURL('image/jpeg', 0.8);
                setPreviewUrl(compressedUrl);
            };
            img.src = dataUrl;
        };
        reader.readAsDataURL(file);
    };

    const handleSend = () => {
        if (!previewUrl) return;
        setIsSending(true);
        setTimeout(() => {
            hostBroadcast('IMAGE_SHARE', {
                imageDataUrl: previewUrl,
                caption
            });
            setIsSending(false);
            setPreviewUrl(null);
            setCaption('');
            alert('图片已同步给所有玩家');
            onClose();
        }, 500);
    };

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm transition-all duration-300">
            <div className="bg-stone-900 rounded-xl shadow-2xl w-full max-w-4xl flex flex-col max-h-[90vh] border border-stone-700 relative overflow-hidden">
                <div className="absolute top-4 right-4 z-10">
                    <button
                        onClick={onClose}
                        className="p-2 bg-black/50 hover:bg-black text-white rounded-full transition-colors backdrop-blur-md"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {role === 'host' ? (
                    <div className="flex flex-col h-full bg-stone-100 p-8 pt-12 items-center justify-center text-center">
                        <div className="max-w-md w-full">
                            <h3 className="text-2xl font-bold font-serif mb-2 text-stone-800 flex items-center justify-center gap-3">
                                <ImageIcon className="w-8 h-8 text-stone-600" />
                                共享游戏画面
                            </h3>
                            <p className="text-stone-500 mb-8 font-bold">在此向房间内所有玩家发送图片资料、地图或场景概念图。</p>

                            {!previewUrl ? (
                                <div
                                    className="border-2 border-dashed border-stone-400 rounded-xl p-12 bg-stone-50 hover:bg-stone-200 transition-colors cursor-pointer group"
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    <div className="flex flex-col items-center justify-center text-stone-500 group-hover:text-stone-700">
                                        <Upload className="w-12 h-12 mb-4" />
                                        <span className="font-bold text-lg">点击选择本地图片</span>
                                        <span className="text-xs mt-2 font-normal">支持 JPEG, PNG, WEBP (最大 2MB)</span>
                                    </div>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleFileSelect}
                                    />
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="relative rounded-xl overflow-hidden border border-stone-300 shadow bg-black aspect-video flex items-center justify-center">
                                        <img src={previewUrl} alt="Preview" className="max-w-full max-h-full object-contain" />
                                        <button
                                            onClick={() => setPreviewUrl(null)}
                                            className="absolute top-2 right-2 p-1.5 bg-black/60 text-white rounded hover:bg-red-600 transition-colors"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <input
                                        type="text"
                                        value={caption}
                                        onChange={e => setCaption(e.target.value)}
                                        placeholder="添加图说或场景描述..."
                                        className="w-full p-4 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent font-bold"
                                        maxLength={100}
                                    />
                                    <button
                                        onClick={handleSend}
                                        disabled={isSending}
                                        className={`w-full py-4 rounded-lg font-bold text-white shadow flex justify-center items-center gap-2 transition-all text-lg
                                            ${isSending ? 'bg-stone-500 cursor-not-allowed scale-95' : 'bg-green-600 hover:bg-green-700 active:scale-95'}`}
                                    >
                                        <Send className="w-5 h-5" />
                                        {isSending ? '发送中...' : '同步给所有玩家'}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col h-full relative">
                        {clientSharedImages.length === 0 ? (
                            <div className="flex-1 flex flex-col items-center justify-center text-stone-400 p-12">
                                <ImageIcon className="w-24 h-24 mb-6 opacity-20" />
                                <h3 className="text-xl font-bold mb-2">等待主持人共享画面...</h3>
                                <p className="text-sm">当 GM 发送图片时，将自动在此显示</p>
                            </div>
                        ) : (
                            <>
                                <div className="flex-1 bg-black flex items-center justify-center p-4 min-h-[50vh]">
                                    <img
                                        src={clientSharedImages[viewIndex].imageDataUrl}
                                        alt="Shared Content"
                                        className="max-w-full max-h-[75vh] object-contain shadow-2xl rounded"
                                    />
                                </div>
                                {clientSharedImages[viewIndex].caption && (
                                    <div className="absolute bottom-16 left-0 right-0 p-6 flex justify-center pointer-events-none">
                                        <div className="bg-black/70 backdrop-blur text-white px-8 py-3 rounded-full text-lg shadow-xl border border-white/10 pointer-events-auto">
                                            {clientSharedImages[viewIndex].caption}
                                        </div>
                                    </div>
                                )}

                                {clientSharedImages.length > 1 && (
                                    <div className="bg-stone-900 border-t border-stone-800 p-4 overflow-x-auto flex gap-3 pb-4 custom-scrollbar">
                                        {clientSharedImages.map((img, idx) => (
                                            <div
                                                key={idx}
                                                onClick={() => setViewIndex(idx)}
                                                className={`flex-shrink-0 w-24 h-16 rounded overflow-hidden cursor-pointer border-2 transition-all 
                                                    ${viewIndex === idx ? 'border-dndRed scale-105' : 'border-transparent opacity-50 hover:opacity-100'}`}
                                            >
                                                <img src={img.imageDataUrl} className="w-full h-full object-cover" />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
