import { useModalDialog } from './common/useModalDialog';
import { ReaderOutline } from './common/ReaderOutline';
import { FavoriteButton } from './FavoriteButton';
import { useFullscreenReader } from './common/useFullscreenReader';
import { DialogDismissButton, useDialogBackdrop } from './common/DialogControls';
import { ReaderNavigation } from './common/ReaderNavigation';
import { resourceKey } from '../src/content/resourceIdentity';
import React, { useEffect, useRef, useState } from 'react';
export function ResourceReader({ item, items, onChange, onClose, children }: {
    item: any;
    items: any[];
    onChange: (item: any) => void;
    onClose: () => void;
    children: React.ReactNode;
}) {
    const dialog = useRef<HTMLDialogElement>(null), scroll = useRef<HTMLDivElement>(null);
    const [referenceDepth, setReferenceDepth] = useState(0);
    const referenceBack = useRef<(() => void) | null>(null);
    useEffect(() => {
        const node = scroll.current;
        if (!node)
            return;
        const update = (event: Event) => {
            const detail = (event as CustomEvent<{
                depth: number;
                back: () => void;
            }>).detail;
            setReferenceDepth(detail.depth);
            referenceBack.current = detail.back;
        };
        node.addEventListener('easy-cc-reference', update);
        return () => node.removeEventListener('easy-cc-reference', update);
    }, []);
    const dismiss = () => { if (referenceDepth > 0) referenceBack.current?.(); else onClose(); };
    const backdrop = useDialogBackdrop(dismiss);
    useFullscreenReader(dialog, onClose);
    const index = items.findIndex(i => resourceKey(i) === resourceKey(item));
    useModalDialog(dialog);
    const readingPositions = useRef(new Map<string, number>());
    useEffect(() => {
        const node = scroll.current, key = resourceKey(item);
        if (node) node.scrollTop = readingPositions.current.get(key) || 0;
        setReferenceDepth(0); referenceBack.current = null;
        const remember = () => { if (node) readingPositions.current.set(key, node.scrollTop); };
        node?.addEventListener('scroll', remember, { passive: true });
        return () => node?.removeEventListener('scroll', remember);
    }, [resourceKey(item)]);
    return <dialog ref={dialog} className="resource-reader" data-reference-depth={referenceDepth || undefined} onCancel={e => {
            e.preventDefault();
            if (referenceDepth > 0)
                referenceBack.current?.();
            else
                onClose();
        }} {...backdrop} aria-label={item.name + '资源详情'}><div className="reader-shell"><header className="reader-toolbar"><DialogDismissButton back={referenceDepth > 0} label={referenceDepth > 0 ? '返回原文' : '关闭详情'} onClick={() => referenceDepth > 0 ? referenceBack.current?.() : onClose()}/><ReaderOutline identity={resourceKey(item)}/></header><div className="reader-body"><div ref={scroll} className="reader-scroll">{children}</div></div><footer className="reader-navigation" onClick={event => { if (event.target === event.currentTarget) dismiss(); }}>{referenceDepth > 0 ? <button type="button" onClick={() => referenceBack.current?.()}>返回原文</button> : <ReaderNavigation index={index} count={items.length} onPrevious={() => onChange(items[index - 1])} onNext={() => onChange(items[index + 1])}><FavoriteButton item={item}/></ReaderNavigation>}</footer></div></dialog>;
}
