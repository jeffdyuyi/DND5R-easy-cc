import { DialogDismissButton, useDialogBackdrop } from '../common/DialogControls';
import { useEffect, useRef, useState } from 'react';
import type { CharacterData } from '../../types';
import { User } from '../common/UiIcons';

export function PortraitPlaceholder() { return <User className="portrait-neutral" aria-hidden="true"/>; }

export function CharacterPortrait({ character: c, updateCharacter: update }: { character: CharacterData; updateCharacter: (v: Partial<CharacterData>) => void }) {
    const [draft, setDraft] = useState(''), [zoom, setZoom] = useState(1), [offset, setOffset] = useState({ x: 0, y: 0 }), [error, setError] = useState('');
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const upload = useRef<HTMLInputElement>(null);
    const dialog = useRef<HTMLDialogElement>(null);
    const image = useRef<HTMLImageElement>(null), frame = useRef<HTMLDivElement>(null);
    const drag = useRef<{ x: number; y: number; ox: number; oy: number } | null>(null);
    useEffect(() => {
        if (!draft) return;
        if (!dialog.current?.open) dialog.current?.showModal();
        const box = frame.current;
        if (!box) return;
        const observer = new ResizeObserver(() => { const img = image.current; if (!img?.naturalWidth) return; const scale = Math.max(box.clientWidth / img.naturalWidth, box.clientHeight / img.naturalHeight); setDimensions({ width: img.naturalWidth * scale, height: img.naturalHeight * scale }); setOffset({ x: 0, y: 0 }); });
        observer.observe(box);
        return () => observer.disconnect();
    }, [draft]);
    const backdrop = useDialogBackdrop(() => setDraft(''), '.portrait-modal-panel');
    const start = (url: string) => { setDraft(url); setZoom(1); setOffset({ x: 0, y: 0 }); setError(''); };
    const bounds = (x: number, y: number, scale = zoom) => {
        const img = image.current, box = frame.current;
        if (!img || !box || !img.naturalWidth) return { x: 0, y: 0 };
        const base = Math.max(box.clientWidth / img.naturalWidth, box.clientHeight / img.naturalHeight);
        const mx = (img.naturalWidth * base * scale - box.clientWidth) / 2, my = (img.naturalHeight * base * scale - box.clientHeight) / 2;
        return { x: Math.max(-mx, Math.min(mx, x)), y: Math.max(-my, Math.min(my, y)) };
    };
    const save = () => {
        const img = image.current, box = frame.current;
        if (!img?.naturalWidth || !box) return;
        const canvas = document.createElement('canvas'); canvas.width = 600; canvas.height = 800;
        const ctx = canvas.getContext('2d'); if (!ctx) return;
        const ratio = canvas.width / box.clientWidth, scale = Math.max(box.clientWidth / img.naturalWidth, box.clientHeight / img.naturalHeight) * zoom;
        const pos = bounds(offset.x, offset.y);
        ctx.drawImage(img, (box.clientWidth / 2 + pos.x - img.naturalWidth * scale / 2) * ratio, (box.clientHeight / 2 + pos.y - img.naturalHeight * scale / 2) * ratio, img.naturalWidth * scale * ratio, img.naturalHeight * scale * ratio);
        update({ characterPortraitDataUrl: canvas.toDataURL('image/webp', .88), portraitOriginalDataUrl: draft }); setDraft('');
    };
    return <section className="portrait-editor"><div className="origin-portrait" role="button" tabIndex={0} aria-label="上传或调整角色形象" onClick={() => { const url = c.portraitOriginalDataUrl || c.characterPortraitDataUrl || c.avatarDataUrl; if (url) start(url); else upload.current?.click(); }} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.currentTarget.click(); } }}>{c.characterPortraitDataUrl || c.avatarDataUrl ? <img src={c.characterPortraitDataUrl || c.avatarDataUrl} alt={c.name || '角色形象'}/> : <PortraitPlaceholder/>}</div><div className="portrait-actions"><label className="portrait-upload">更换图片<input ref={upload} type="file" accept="image/png,image/jpeg,image/webp" onChange={e => { const file = e.target.files?.[0]; e.target.value = ''; if (!file) return; if (file.size > 12 * 1024 * 1024) { setError('请选择小于12MB的图片'); return; } const reader = new FileReader(); reader.onload = () => { const source = new Image(); source.onload = () => { const scale = Math.min(1, 1600 / Math.max(source.naturalWidth, source.naturalHeight)); const canvas = document.createElement('canvas'); canvas.width = Math.max(1, Math.round(source.naturalWidth * scale)); canvas.height = Math.max(1, Math.round(source.naturalHeight * scale)); const ctx = canvas.getContext('2d'); if (!ctx) { setError('当前环境无法处理图片'); return; } ctx.drawImage(source, 0, 0, canvas.width, canvas.height); start(canvas.toDataURL('image/webp', .85)); }; source.onerror = () => setError('无法读取这张图片'); source.src = String(reader.result); }; reader.onerror = () => setError('图片读取失败'); reader.readAsDataURL(file); }}/></label>{(c.portraitOriginalDataUrl || c.characterPortraitDataUrl || c.avatarDataUrl) && <button onClick={() => start(c.portraitOriginalDataUrl || c.characterPortraitDataUrl || c.avatarDataUrl)}>调整剪裁</button>}</div>{error && <p role="alert">{error}</p>}
    {draft && <dialog ref={dialog} className="portrait-modal" aria-label="剪裁角色形象" onCancel={() => setDraft('')} {...backdrop}><div className="portrait-modal-panel"><header className="portrait-modal-heading"><DialogDismissButton label="取消剪裁" onClick={() => setDraft('')}/></header><div ref={frame} className="portrait-crop" onPointerDown={e => { e.currentTarget.setPointerCapture(e.pointerId); drag.current = { x: e.clientX, y: e.clientY, ox: offset.x, oy: offset.y }; }} onPointerMove={e => { const d = drag.current; if (d) setOffset(bounds(d.ox + e.clientX - d.x, d.oy + e.clientY - d.y)); }} onPointerUp={() => { drag.current = null; }} onPointerCancel={() => { drag.current = null; }}><img ref={image} src={draft} draggable={false} alt="拖动调整位置" onLoad={e => { const img = e.currentTarget, box = frame.current; if (!box) return; const scale = Math.max(box.clientWidth / img.naturalWidth, box.clientHeight / img.naturalHeight); setDimensions({ width: img.naturalWidth * scale, height: img.naturalHeight * scale }); setOffset({ x: 0, y: 0 }); }} onError={() => { setError('无法读取这张图片'); setDraft(''); }} style={{ width: dimensions.width || undefined, height: dimensions.height || undefined, transform: `translate(calc(-50% + ${offset.x}px), calc(-50% + ${offset.y}px)) scale(${zoom})` }}/></div><label>缩放<input type="range" min="1" max="3" step="0.01" value={zoom} onChange={e => { const value = Number(e.target.value); setZoom(value); setOffset(bounds(offset.x, offset.y, value)); }}/></label><div className="portrait-actions"><button onClick={() => upload.current?.click()}>更换图片</button><button onClick={save}>保存剪裁</button></div></div></dialog>}
    </section>;
}
