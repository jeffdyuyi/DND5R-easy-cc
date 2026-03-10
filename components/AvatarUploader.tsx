import React, { useRef, useState } from 'react';
import { Camera, Trash2, User } from 'lucide-react';

interface Props {
    avatarDataUrl?: string;
    onChange: (dataUrl: string) => void;
    size?: number;
}

export const AvatarUploader: React.FC<Props> = ({ avatarDataUrl, onChange, size = 120 }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isHovering, setIsHovering] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 2 * 1024 * 1024) {
            alert("图片不能超过 2MB");
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const maxSize = 200;

                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > maxSize) {
                        height *= (maxSize / width);
                        width = maxSize;
                    }
                } else {
                    if (height > maxSize) {
                        width *= (maxSize / height);
                        height = maxSize;
                    }
                }

                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                if (ctx) {
                    ctx.drawImage(img, 0, 0, width, height);
                    const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
                    onChange(dataUrl);
                }
            };
            if (typeof event.target?.result === 'string') {
                img.src = event.target.result;
            }
        };
        reader.readAsDataURL(file);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="flex flex-col items-center gap-2">
            <div
                className="relative rounded-full overflow-hidden border-4 border-stone-200 bg-stone-100 flex items-center justify-center cursor-pointer hover:border-dndRed transition-colors group shadow-sm bg-white"
                style={{ width: size, height: size }}
                onClick={() => fileInputRef.current?.click()}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
            >
                {avatarDataUrl ? (
                    <img src={avatarDataUrl} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                    <User className="w-1/2 h-1/2 text-stone-300" />
                )}

                <div className={`absolute inset-0 bg-black/50 flex flex-col items-center justify-center transition-opacity ${isHovering ? 'opacity-100' : 'opacity-0'}`}>
                    <Camera className="text-white w-6 h-6 mb-1" />
                    <span className="text-white text-xs font-bold">点击上传</span>
                </div>
            </div>

            <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
            />

            {avatarDataUrl ? (
                <button
                    onClick={() => onChange('')}
                    className="text-xs text-stone-500 hover:text-red-500 flex items-center gap-1 font-bold transition-colors"
                >
                    <Trash2 className="w-3 h-3" /> 移除头像
                </button>
            ) : (
                <div className="text-[10px] text-stone-400">小于 2MB</div>
            )}
        </div>
    );
};
