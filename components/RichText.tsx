
import React from 'react';

export const RichText = ({ text }: { text?: string }) => {
  if (!text) return null;

  // Split text into lines to process tables and paragraphs
  const lines = text.split('\n');
  const renderedLines: React.ReactNode[] = [];
  
  let tableBuffer: string[] = [];
  let inTable = false;

  const processInline = (str: string) => {
    // Basic regex for bold and italic
    const parts = str.split(/(\*\*.*?\*\*|\*.*?\*)/g);
    return parts.map((part, idx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={idx} className="font-bold text-stone-900">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('*') && part.endsWith('*')) {
        return <em key={idx} className="italic text-stone-800">{part.slice(1, -1)}</em>;
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
        renderedLines.push(<br key={index} />);
      } else {
        renderedLines.push(
          <div key={index} className="min-h-[1.2em]">
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
