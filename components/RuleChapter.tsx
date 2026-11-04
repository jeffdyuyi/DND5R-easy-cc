import { LibraryOverlay } from './LibraryNavigation';
import { useEffect, useRef, useState } from 'react';
import { NativeResourceCard } from './NativeResourceCard';
export function RuleChapter({ items }: { items: any[] }) {
    const [directoryOpen, setDirectoryOpen] = useState(false);
    const root = useRef<HTMLDivElement>(null);
    const [headings, setHeadings] = useState<HTMLElement[]>([]);
    useEffect(() => {
        const collect = () => { const next = Array.from(root.current?.querySelectorAll<HTMLElement>('h2,h3,h4,h5,h6') || []).filter(node => !node.closest('details:not([open])')).filter((node, index, nodes) => { const before = nodes[index - 1]?.textContent?.replace(/\s/g, ''); const value = node.textContent?.replace(/\s/g, ''); return !before || !value || !(value.startsWith(before) || before.startsWith(value)); }); setHeadings(previous => previous.length === next.length && previous.every((node, index) => node === next[index]) ? previous : next); };
        collect();
        const observer = new MutationObserver(collect);
        if (root.current) observer.observe(root.current, { childList: true, subtree: true });
        return () => observer.disconnect();
    }, [items]);
    return <div className="rule-chapter"><button type="button" className="rule-directory-toggle" aria-label="章节目录" aria-expanded={directoryOpen} onClick={() => setDirectoryOpen(true)}>☷</button>
        {directoryOpen && <LibraryOverlay title="章节目录" drawer side="right" onClose={() => setDirectoryOpen(false)}><nav className="outline-list library-overlay-scroll" aria-label="章节目录">{headings.map((node, index) => <button key={index} type="button" style={{ paddingLeft: 12 + Math.max(0, Number(node.tagName.slice(1)) - 2) * 8 }} onClick={() => { node.scrollIntoView({ block: 'start', behavior: 'smooth' }); setDirectoryOpen(false); }}>{node.textContent}</button>)}</nav></LibraryOverlay>}
        <div className="rule-chapter-body reader-scroll" ref={root}>{items.map(item => <NativeResourceCard key={item.id} item={item} />)}</div></div>;
}
