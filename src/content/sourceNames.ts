const known: Record<string, string> = { PHB: '玩家手册（2014）', XPHB: '玩家手册（2024）', 'SRD 5.1': '系统参考文档 5.1', 'SRD 5.2.1': '系统参考文档 5.2.1' };
export function sourceLabel(item: {
    source?: string;
    sourceName?: string;
    sourceProvider?: string;
}) {
    const code = item.source || '未知来源', name = item.sourceProvider === 'homebrew' ? item.sourceName : known[code] || item.sourceName;
    return name && name !== code ? `${name} · ${code}${/[\u3400-\u9fff]/.test(name) ? '' : '（未核实中文名）'}` : `${code}（未核实中文名）`;
}
