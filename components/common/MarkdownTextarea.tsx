import React, { useRef } from 'react';
type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement>;
// Shared source editor: formatting is explicit and never rewrites existing prose.
export function MarkdownTextarea({ value = '', onChange, className = '', onKeyDown, ...props }: Props) {
    const ref = useRef<HTMLTextAreaElement>(null);
    const history = useRef<{
        text: string;
        start: number;
        end: number;
    }[]>([]), future = useRef<{
        text: string;
        start: number;
        end: number;
    }[]>([]);
    const text = String(value ?? '');
    const remember = (entry: {
        text: string;
        start: number;
        end: number;
    }) => {
        history.current.push(entry);
        if (history.current.length > 100)
            history.current.shift();
        future.current = [];
    };
    const commit = (next: string, start: number, end = start, recordHistory = true) => {
        const area = ref.current;
        if (!area)
            return;
        if (recordHistory) {
            remember({ text, start: area.selectionStart, end: area.selectionEnd });
        }
        onChange?.({ target: { value: next }, currentTarget: { value: next } } as React.ChangeEvent<HTMLTextAreaElement>);
        requestAnimationFrame(() => { area.focus(); area.setSelectionRange(start, end); });
    };
    const wrap = (mark: string) => {
        const a = ref.current;
        if (!a)
            return;
        const s = a.selectionStart, e = a.selectionEnd;
        commit(text.slice(0, s) + mark + text.slice(s, e) + mark + text.slice(e), s + mark.length, e + mark.length);
    };
    const block = (prefix: string) => {
        const a = ref.current;
        if (!a)
            return;
        const s = text.lastIndexOf('\n', a.selectionStart - 1) + 1, e = a.selectionEnd;
        const selected = text.slice(s, e);
        const output = selected.split('\n').map((line, index) => prefix === '1. ' ? String(index + 1) + '. ' + line : prefix + line).join('\n');
        commit(text.slice(0, s) + output + text.slice(e), s, s + output.length);
    };
    const insert = (content: string) => {
        const a = ref.current;
        if (!a)
            return;
        const s = a.selectionStart, e = a.selectionEnd;
        const before = s && text[s - 1] !== '\n' ? '\n' : '';
        commit(text.slice(0, s) + before + content + text.slice(e), s + before.length + content.length);
    };
    const travel = (redo = false) => {
        const a = ref.current;
        if (!a)
            return;
        const from = redo ? future.current : history.current, to = redo ? history.current : future.current;
        const entry = from.pop();
        if (!entry)
            return;
        to.push({ text, start: a.selectionStart, end: a.selectionEnd });
        commit(entry.text, entry.start, entry.end, false);
    };
    const actions: [
        string,
        string,
        () => void
    ][] = [['加粗', 'Ctrl/⌘ B', () => wrap('**')], ['斜体', 'Ctrl/⌘ I', () => wrap('*')], ['小标题', '行首插入 ###', () => block('### ')], ['项目列表', '逐行插入 -', () => block('- ')], ['编号列表', '逐行编号', () => block('1. ')], ['引用', '逐行插入 >', () => block('> ')], ['表格', '插入两列表格', () => insert('| 列名 | 列名 |\n| --- | --- |\n| 内容 | 内容 |\n')], ['分隔线', '插入分隔线', () => insert('\n---\n\n')], ['撤销', 'Ctrl/⌘ Z', () => travel()], ['重做', 'Ctrl/⌘ Shift Z', () => travel(true)]];
    return <div className="markdown-editor"><div className="markdown-editor-toolbar" role="toolbar" aria-label="Markdown快捷排版">{actions.map(([label, hint, action]) => <button key={label} type="button" title={hint} onMouseDown={e => e.preventDefault()} onClick={action}>{label}</button>)}</div><textarea {...props} aria-label={props['aria-label'] || 'Markdown正文'} ref={ref} value={text} className={className} onChange={e => { remember({ text, start: ref.current?.selectionStart || 0, end: ref.current?.selectionEnd || 0 }); onChange?.(e); }} onKeyDown={e => {
            if (!e.nativeEvent.isComposing && (e.ctrlKey || e.metaKey) && !e.altKey) {
                const k = e.key.toLowerCase();
                if (['b', 'i', 'z', 'y'].includes(k)) {
                    e.preventDefault();
                    if (k === 'b')
                        wrap('**');
                    else if (k === 'i')
                        wrap('*');
                    else
                        travel(k === 'y' || e.shiftKey);
                    return;
                }
            }
            onKeyDown?.(e);
        }}/><p className="markdown-editor-hint">支持 Markdown；可选中文字后加粗或斜体。小标题、列表、引用作用于选中行。卡片预览显示排版效果。</p></div>;
}
