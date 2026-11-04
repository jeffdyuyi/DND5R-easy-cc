import React from 'react';
import { ResourceReference } from './ResourceReference';
import { detailLead, detailHeading } from './common/detailTextStructure';
export const RichText = ({ text }: {
    text?: string;
}) => {
    if (!text)
        return null;
    // Split text into lines to process tables and paragraphs
    const originalLines = text.split('\n');
    const lines: string[] = [];
    for (let index = 0; index < originalLines.length; index++) {
        let line = originalLines[index];
        if (/^\s*[•-]\s*$/.test(line)) {
            let next = index + 1;
            while (next < originalLines.length && !originalLines[next].trim())
                next++;
            if (next < originalLines.length && !/^\s*(?:[|#]|[•-]\s*$)/.test(originalLines[next])) {
                line += ' ' + originalLines[next];
                index = next;
            }
        }
        if (/^[\s•-]*[\u3400-\u9fff]{2,24}\s*[A-Z][A-Za-z ’'(),/\- ]+$/.test(line.trim())) {
            while (index + 1 < originalLines.length && /^[A-Za-z][A-Za-z ’'(),/\- ]+[。．]/.test(originalLines[index + 1].trim())) {
                line += ' ' + originalLines[++index].trim();
            }
        }
        lines.push(line);
    }
    const renderedLines: React.ReactNode[] = [];
    let tableBuffer: string[] = [];
    const processInline = (str: string): React.ReactNode[] => {
        // Regex to match **bold** or *italic*
        // We utilize a capturing group to split the string while keeping the delimiters to identify them

        const parts = str.split(/(\[[^\]]+\]\(https?:\/\/[^)]+\)|\[\[[^\]]+\]\]|\*\*\*.*?\*\*\*|\*\*.*?\*\*|\*.*?\*)/g);
        return parts.map((part, idx) => {
            const link = part.match(/^\[([^\]]+)\]\((https?:\/\/[^)]+)\)$/);
            if (link) return <a key={idx} href={link[2]} target="_blank" rel="noreferrer">{link[1]} ↗</a>;
            const reference = part.match(/^\[\[([^|]+)\|([^\]]+)\]\]$/);
            if (reference)
                return <ResourceReference key={idx} target={reference[1]} label={reference[2]}/>;
            if (part.startsWith('***') && part.endsWith('***') && part.length >= 6)
                return <strong key={idx} className="font-bold text-stone-900"><em>{processInline(part.slice(3, -3))}</em></strong>;
            if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
                return <strong key={idx} className="font-bold text-stone-900">{processInline(part.slice(2, -2))}</strong>;
            }
            if (part.startsWith('*') && part.endsWith('*') && part.length >= 2) {
                return <em key={idx} className="italic text-stone-800">{processInline(part.slice(1, -1))}</em>;
            }
            return part;
        });
    };
    const headingText = (value: string) => { const match = value.match(/^(.*?[\u3400-\u9fff].*?)(?:\s*[·•]\s*|\s+)([A-Za-z][A-Za-z0-9 ’'(),/\- ]*)$/); return match ? <><span className="detail-title-cn">{processInline(match[1])}</span><span className="detail-title-en">{match[2]}</span></> : processInline(value); };
    // Keep empty table cells: dropping them shifts subsequent columns.
    const cells = (row: string) => row.trim().replace(/^\|/, '').replace(/\|$/, '').split(/(?<!\\)\|/).map(cell => cell.trim().replace(/\\\|/g, '|'));
    const renderTable = (rows: string[], key: number) => {
        if (!rows.length)
            return null;
        const headerCells = cells(rows[0]);
        const hasSeparator = rows.length > 1 && cells(rows[1]).every(cell => /^:?-{3,}:?$/.test(cell));
        const bodyRows = rows.slice(hasSeparator ? 2 : 1).map(cells);
        const columnCount = Math.max(headerCells.length, ...bodyRows.map(row => row.length));
        if (headerCells[0]?.trim() === '等级' && headerCells.some(label => /特性/.test(label))) {
            const featureColumn = headerCells.findIndex(label => /特性/.test(label));
            return <div className="class-level-cards" key={'levels-' + key}>{bodyRows.map((row, index) => <details key={index} open={index === 0}><summary>等级 {processInline(row[0] || '')} · {processInline(row[featureColumn] || '')}</summary><dl>{headerCells.map((label, column) => column > 0 && column !== featureColumn ? <div key={column}><dt>{processInline(label)}</dt><dd>{processInline(row[column] ?? '—')}</dd></div> : null)}</dl></details>)}</div>;
        }
        return <div key={'table-' + key} className="rich-table-scroll" role="region" aria-label="资源数据表" tabIndex={0}><table className="rich-table"><thead><tr>{Array.from({ length: columnCount }, (_, i) => <th scope="col" key={i}>{processInline(headerCells[i] || '')}</th>)}</tr></thead><tbody>{bodyRows.map((row, ri) => <tr key={ri}>{Array.from({ length: columnCount }, (_, ci) => <td key={ci}>{processInline(row[ci] || '')}</td>)}</tr>)}</tbody></table></div>;
    };
    let paragraph: string[] = [];
    const flushParagraph = (key: number) => {
        if (paragraph.length) {
            renderedLines.push(<p className="rich-paragraph" key={'p-' + key}>{paragraph.map((line, i) => { const end = detailLead(line); return <React.Fragment key={i}>{i > 0 ? ' ' : null}{end ? <><strong className="rich-detail-name">{processInline(line.slice(0, end))}</strong>{processInline(line.slice(end))}</> : processInline(line)}</React.Fragment>; })}</p>);
            paragraph = [];
        }
    };
    const flushTable = (key: number) => {
        if (tableBuffer.length) {
            renderedLines.push(renderTable(tableBuffer, key));
            tableBuffer = [];
        }
    };
    const consumed = new Set<number>();
    lines.forEach((line, index) => {
        if (consumed.has(index))
            return;
        const trimmed = line.trim();
        if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
            flushParagraph(index);
            tableBuffer.push(trimmed);
            return;
        }
        flushTable(index);
        if (!trimmed) {
            flushParagraph(index);
            return;
        }
        if (/^(?:-{3,}|\*{3,}|_{3,})$/.test(trimmed)) {
            flushParagraph(index);
            renderedLines.push(<hr className="rich-rule" key={'rule-' + index}/>);
            return;
        }
        if (/^>\s?/.test(trimmed)) {
            flushParagraph(index);
            const quote: string[] = [];
            for (let next = index; next < lines.length && /^>\s?/.test(lines[next].trim()); next++) {
                quote.push(lines[next].trim().replace(/^>\s?/, ''));
                consumed.add(next);
            }
            if (quote.some(line => line.trim())) renderedLines.push(<blockquote className="rich-quote" key={'quote-' + index}><RichText text={quote.join('\n')}/></blockquote>);
            return;
        }
        const bullet = trimmed.match(/^(?:[-+*•]\s+)(.+)$/);
        const numbered = trimmed.match(/^(\d+)[.)]\s+(.+)$/);
        if (bullet || numbered) {
            flushParagraph(index);
            const chunk: string[] = [];
            for (let next = index; next < lines.length; next++) {
                if (!lines[next].trim()) continue;
                if (next !== index && !/^\s+(?:\S|$)|^\s*(?:[-+*•]\s+|\d+[.)]\s+)/.test(lines[next])) break;
                chunk.push(lines[next]); consumed.add(next);
            }
            const list = (input: string[], depth = 0): React.ReactNode => {
                const groups: { text: string; children: string[]; number?: number }[] = [];
                let base = Infinity;
                for (const row of input) if (/^\s*(?:[-+*•]\s+|\d+[.)]\s+)/.test(row)) base = Math.min(base, row.match(/^\s*/)![0].length);
                for (const row of input) {
                    const match = row.match(/^(\s*)(?:[-+*•]\s+|(\d+)[.)]\s+)(.*)$/);
                    if (match && match[1].length === base) groups.push({ text: match[3], children: [], number: match[2] ? Number(match[2]) : undefined });
                    else if (groups.length) groups[groups.length - 1].children.push(row);
                }
                const ordered = groups[0]?.number !== undefined;
                return React.createElement(ordered ? 'ol' : 'ul', { className: 'rich-list', start: ordered ? groups[0].number : undefined }, groups.map((group, i) => <li key={i}>{processInline(group.text)}{group.children.length > 0 && (group.children.some(row => /^\s*(?:[-+*•]\s+|\d+[.)]\s+)/.test(row)) && depth < 10 ? list(group.children, depth + 1) : <RichText text={group.children.join('\n')}/>)}</li>));
            };
            renderedLines.push(<React.Fragment key={'list-' + index}>{list(chunk)}</React.Fragment>);
            return;
        }
        if (/^#{1,6}\s/.test(trimmed)) {
            flushParagraph(index);
            const level = Math.min(6, trimmed.match(/^#+/)![0].length);
            renderedLines.push(React.createElement('h' + level, { key: 'h-' + index, className: 'rich-section-heading' }, headingText(trimmed.replace(/^#{1,6}\s+/, ''))));
            return;
        }
        if (detailHeading(line)) {
            flushParagraph(index);
            let title = line;
            for (let next = index + 1; next < lines.length && /^[A-Za-z][A-Za-z ’'(),/\-]*$/.test(lines[next].trim()); next++) {
                title += ' ' + lines[next].trim();
                consumed.add(next);
            }
            renderedLines.push(<h3 className="rich-detail-heading" key={'detail-' + index}>{headingText(title)}</h3>);
            return;
        }
        // A source line beginning with a labeled feature starts a separate readable block.
        if (detailLead(line) || /^\s*(?:[-•]\s|\d+[.)、]\s)/.test(line))
            flushParagraph(index);
        paragraph.push(line);
    });
    flushParagraph(lines.length);
    flushTable(lines.length);
    // Fold the explicitly recognized progression table together with its preceding heading.
    const blocks: React.ReactNode[] = [];
    for (const node of renderedLines) {
        if (React.isValidElement<{ className?: string }>(node) && node.props.className === 'class-level-cards') {
            const previous = blocks[blocks.length - 1];
            const heading = React.isValidElement<{ children?: React.ReactNode }>(previous) && typeof previous.type === 'string' && /^h[1-6]$/.test(previous.type) ? blocks.pop() : null;
            blocks.push(<details className="class-progression-section" key={'section-' + node.key}><summary>{heading || '职业特性'}</summary>{node}</details>);
        } else blocks.push(node);
    }
    return <div className="rich-text text-stone-800">{blocks}</div>;
};
