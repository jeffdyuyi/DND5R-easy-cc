
import React from 'react';

export const RichText = ({ text }: { text?: string }) => {
  if (!text) return null;

  // Split text into lines to process tables and paragraphs
  const lines = text.split('\n');
  const renderedLines: React.ReactNode[] = [];

  let tableBuffer: string[] = [];
  let inTable = false;

  const processInline = (str: string) => {
    // Regex to match **bold** or *italic*
    // We utilize a capturing group to split the string while keeping the delimiters to identify them
    const parts = str.split(/(\*\*.*?\*\*|\*.*?\*)/g);
    return parts.map((part, idx) => {
      if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
        return <strong key={idx} className="font-black text-[#bf953f] drop-shadow-[0_0_2px_rgba(191,149,63,0.3)]">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('*') && part.endsWith('*') && part.length >= 2) {
        return <em key={idx} className="italic text-[#a89b7a]">{part.slice(1, -1)}</em>;
      }
      return part;
    });
  };

  const renderTable = (rows: string[], key: number) => {
    if (rows.length < 2) return null;
    // Assume row 0 is header, row 1 is separator (ignore), rest are body
    const headerCells = rows[0].split('|').filter(c => c.trim() !== '').map(c => c.trim());
    const bodyRows = rows.slice(2).map(r => r.split('|').filter(c => c.trim() !== '').map(c => c.trim()));

    return (
      <div key={`table-${key}`} className="overflow-x-auto my-4 border border-stone-300 rounded shadow-sm">
        <table className="min-w-full divide-y divide-stone-200 text-sm">
          <thead className="bg-stone-100">
            <tr>
              {headerCells.map((h, i) => (
                <th key={i} className="px-3 py-2 text-left font-bold text-stone-800 border-r border-stone-200 last:border-0">{processInline(h)}</th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-stone-100">
            {bodyRows.map((row, ri) => (
              <tr key={ri} className={ri % 2 === 0 ? 'bg-white' : 'bg-stone-50'}>
                {row.map((cell, ci) => (
                  <td key={ci} className="px-3 py-2 text-stone-700 border-r border-stone-200 last:border-0">{processInline(cell)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      inTable = true;
      tableBuffer.push(trimmed);
    } else {
      if (inTable) {
        renderedLines.push(renderTable(tableBuffer, index));
        tableBuffer = [];
        inTable = false;
      }
      if (trimmed === '') {
        renderedLines.push(<div key={index} className="h-2" />);
      } else if (trimmed.startsWith('- ')) {
        renderedLines.push(
          <div key={index} className="flex gap-3 pl-2 min-h-[1.5em] items-start my-1 text-[#f0ead8]/80">
            <span className="text-[#bf953f] mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-[#bf953f] to-[#aa771c] flex-shrink-0 shadow-[0_0_5px_rgba(191,149,63,0.5)]"></span>
            <div className="flex-1 leading-relaxed">{processInline(line.substring(2))}</div>
          </div>
        );
      } else {
        renderedLines.push(
          <div key={index} className="min-h-[1.2em] my-1">
            {processInline(line)}
          </div>
        );
      }
    }
  });

  // Flush remaining table
  if (inTable) {
    renderedLines.push(renderTable(tableBuffer, lines.length));
  }

  return <div className="space-y-1 text-stone-800 leading-relaxed">{renderedLines}</div>;
};
