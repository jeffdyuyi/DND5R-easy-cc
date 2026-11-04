import { useEffect, useRef, useState } from 'react';
import { LibraryOverlay } from '../LibraryNavigation';
/** A shared temporary outline for the nearest reading dialog. */
export function ReaderOutline({ identity }: { identity: string }) {
    const anchor = useRef<HTMLSpanElement>(null);
    const [open, setOpen] = useState(false);
    const [headings, setHeadings] = useState<HTMLElement[]>([]);
    useEffect(() => {
        const root = anchor.current?.closest('dialog'); if (!root) return;
        const collect = () => setHeadings(Array.from(root.querySelectorAll<HTMLElement>('.reader-scroll h1,.reader-scroll h2,.reader-scroll h3,.reader-scroll h4,.reader-scroll h5,.reader-scroll h6,.picker-detail-scroll h1,.picker-detail-scroll h2,.picker-detail-scroll h3,.picker-detail-scroll h4,.picker-detail-scroll h5,.picker-detail-scroll h6')).filter(node => !node.closest('.resource-fluff')));
        collect(); const observer = new MutationObserver(collect); observer.observe(root, { childList: true, subtree: true });
        return () => observer.disconnect();
    }, [identity]);
    return <span ref={anchor} className="shared-outline-anchor">{headings.length > 1 && <button type="button" className="reader-outline-toggle" aria-label="正文目录" onClick={() => setOpen(true)}>☷</button>}{open && <LibraryOverlay title="正文目录" drawer side="right" onClose={() => setOpen(false)}><nav className="outline-list library-overlay-scroll">{headings.map((node, i) => <button type="button" key={i} onClick={() => { let parent = node.parentElement; while (parent) { if (parent instanceof HTMLDetailsElement) parent.open = true; parent = parent.parentElement; } node.scrollIntoView({ block: 'start' }); setOpen(false); }}>{node.querySelector('.detail-title-cn')?.textContent || node.textContent}</button>)}</nav></LibraryOverlay>}</span>;
}
