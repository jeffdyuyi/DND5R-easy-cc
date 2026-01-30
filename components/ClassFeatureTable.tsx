import React from 'react';
import { Swords } from 'lucide-react';
import { ClassTableData } from '../types';

// --- Class Feature Table Component ---

export const ClassFeatureTable = ({ data }: { data: ClassTableData }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <div className="my-6 border border-stone-300 rounded overflow-hidden shadow-sm">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full bg-stone-100 p-3 text-left font-bold text-stone-800 flex justify-between items-center hover:bg-stone-200 transition-colors"
            >
                <span className="flex items-center gap-2">
                    <Swords className="w-4 h-4 text-stone-500" />
                    {data.title}
                </span>
                <span className="text-xs bg-stone-200 px-2 py-1 rounded text-stone-600">
                    {isOpen ? "收起表格" : "展开表格"}
                </span>
            </button>

            {isOpen && (
                <div className="overflow-x-auto bg-white">
                    <table className="w-full text-sm text-left border-collapse">
                        <thead className="bg-stone-50 text-stone-700 font-bold border-b-2 border-stone-300">
                            <tr>
                                {data.columns.map(col => (
                                    <th key={col.key} className="p-2 whitespace-nowrap border-r border-stone-200 last:border-0">{col.header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-200">
                            {data.rows.map((row, idx) => (
                                <tr key={idx} className={`hover:bg-blue-50 ${idx % 2 === 0 ? "bg-white" : "bg-stone-50"}`}>
                                    {data.columns.map(col => (
                                        <td key={col.key} className="p-2 border-r border-stone-100 last:border-0 align-top">
                                            {col.key === 'features' && Array.isArray(row[col.key])
                                                ? (row[col.key] as string[]).map((f, i) => (
                                                    <span key={i} className="inline-block bg-stone-100 border border-stone-300 rounded px-1 text-xs mr-1 mb-1">{f}</span>
                                                ))
                                                : <span className="font-medium text-stone-700">{row[col.key]}</span>
                                            }
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};
