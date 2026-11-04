import { useRef, useState } from 'react';

/** Keep the existing string storage format; one explicit line is one label. */
export function LanguageTags({ value, onChange }: { value: string; onChange: (value: string) => void }) {
    const [draft, setDraft] = useState('');
    const composing = useRef(false);
    const tags = (value || '').split(/\r?\n/).map(text => text.trim()).filter(Boolean);
    const commit = () => {
        const additions = draft.split(/\r?\n/).map(text => text.trim()).filter(Boolean);
        if (!additions.length) return;
        onChange([...new Set([...tags, ...additions])].join('\n'));
        setDraft('');
    };
    return <div className="language-note language-tags">
        <label htmlFor="supplement-language-input">补充语言</label>
        {tags.length > 0 && <ul className="language-tag-list" aria-label="补充语言列表">{tags.map((tag, index) => <li key={index}><span>{tag}</span><button type="button" aria-label={'移除补充语言：' + tag} onClick={() => onChange(tags.filter((_, position) => position !== index).join('\n'))}>×</button></li>)}</ul>}
        <input id="supplement-language-input" aria-label="输入补充语言，回车添加" placeholder="输入语言，回车添加" value={draft}
            onChange={event => setDraft(event.target.value)}
            onCompositionStart={() => { composing.current = true; }}
            onCompositionEnd={() => { composing.current = false; }}
            onKeyDown={event => {
                if (event.key === 'Enter' && !composing.current && !event.nativeEvent.isComposing && event.keyCode !== 229) {
                    event.preventDefault();
                    commit();
                }
            }}
            onBlur={() => { if (!composing.current) commit(); }}
            onPaste={event => {
                const text = event.clipboardData.getData('text');
                if (!/[\r\n]/.test(text)) return;
                event.preventDefault();
                const additions = (draft + text).split(/\r?\n/).map(line => line.trim()).filter(Boolean);
                onChange([...new Set([...tags, ...additions])].join('\n'));
                setDraft('');
            }}/>
    </div>;
}
