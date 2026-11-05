import { CHARACTER_RESOURCE_KINDS } from '../../src/content/resourceRegistry';
import { useMemo, useState } from 'react';
import { CharacterData } from '../../types';
import { useResourceCatalog } from '../../hooks/useResourceCatalog';
import { sourceLabel } from '../../src/content/sourceNames';
import { characterSourceKey } from '../../src/content/resourceIdentity';
export function CharacterSources({ character, updateCharacter, onDone, onCancel }: {
    character: CharacterData;
    updateCharacter: (value: Partial<CharacterData>) => boolean;
    onDone: () => void;
    onCancel?: () => void;
}) {
    const all = useResourceCatalog().filter(item => (CHARACTER_RESOURCE_KINDS as readonly string[]).includes(item.kind)), [query, setQuery] = useState(''), [tab, setTab] = useState('出版物'), [page, setPage] = useState(1);
    const [draft, setDraft] = useState<string[]>(() => character.allowedResourceSources ?? ['5etools-cn|XPHB', '5etools-cn|PHB']);
    const catalog = useMemo(() => {
        const map = new Map<string, {
            item: any;
            count: number;
        }>(['XPHB', 'PHB'].map(source => ['5etools-cn|' + source, { item: { source, sourceProvider: '5etools-cn', contentOrigin: 'external-5etools' }, count: 0 }]));
        for (const item of [...all, ...(character.resourceCards || [])]) {
            const key = characterSourceKey(item);
            if (!map.has(key))
                map.set(key, { item, count: 0 });
        }
        for (const item of all)
            map.get(characterSourceKey(item))!.count++;
        return [...map.entries()].sort((a, b) => { const rank = (v: any) => v.source === 'XPHB' ? 0 : v.source === 'PHB' ? 1 : 2; return rank(a[1].item) - rank(b[1].item) || sourceLabel(a[1].item).localeCompare(sourceLabel(b[1].item)); });
    }, [all, character.resourceCards]);
    const group = (item: any) => item.sourceProvider === 'homebrew' ? 'Homebrew' : item.contentOrigin === 'external-5etools' ? '出版物' : String(item.source).startsWith('SRD') ? '内置 SRD' : 'DIY';
    const visible = catalog.filter(([key, row]) => (tab === '已选' ? draft.includes(key) : tab === '全部' || group(row.item) === tab) && sourceLabel(row.item).toLowerCase().includes(query.toLowerCase()));
    const pages = Math.max(1, Math.ceil(visible.length / 12)), current = Math.min(page, pages);
    const pagination = <nav className="builder-resource-pagination"><button type="button" disabled={current === 1} onClick={() => setPage(current - 1)}>上一页</button><span>{current} / {pages} · {visible.length} 个来源</span><button type="button" disabled={current === pages} onClick={() => setPage(current + 1)}>下一页</button></nav>;
    const outside = (character.resourceCards || []).filter(item => !draft.includes(characterSourceKey(item)));
    const save = () => {
        if (outside.length && !window.confirm(`有 ${outside.length} 张已选卡片来自未启用来源。保存后保留这些卡片并标记；需要移除时请在对应区块手动操作。是否保存？`))
            return;
        if (!updateCharacter({ allowedResourceSources: draft })) return;
        onDone();
    };
    return <section className="character-source-settings"><h2>本角色可用资料</h2>{onCancel && <button type="button" onClick={onCancel}>返回</button>}
 <div className="picker-tabs">{['出版物', '内置 SRD', 'Homebrew', 'DIY', '已选', '全部'].map(name => <button type="button" key={name} aria-pressed={tab === name} onClick={() => { setTab(name); setPage(1); }}>{name}</button>)}</div>
 <label>搜索来源<input value={query} onChange={e => { setQuery(e.target.value); setPage(1); }} placeholder="中文书名、原名或缩写"/></label>
 <div className="source-actions"><button type="button" onClick={() => setDraft([...new Set([...draft, ...visible.map(([key]) => key)])])}>全选当前结果（{visible.length}）</button><button type="button" onClick={() => setDraft([])}>清空全部选择</button></div>
 <div className="source-card-grid">{visible.slice((current - 1) * 12, current * 12).map(([key, row]) => <label className={'source-choice' + (draft.includes(key) ? ' is-selected' : '')} key={key}><input type="checkbox" checked={draft.includes(key)} onChange={() => setDraft(old => old.includes(key) ? old.filter(v => v !== key) : [...old, key])}/><span><strong>{sourceLabel(row.item)}</strong><small>{row.item.sourceProvider === 'homebrew' ? 'Homebrew · ' : ''}{row.count} 项玩家资源{row.count === 0 ? ' · 当前无可用卡片' : ''}</small></span></label>)}</div>{pages > 1 && pagination}
 {!visible.length && <p>暂无匹配来源，可调整分组或搜索；外部资料需先完成读取。</p>}
 {outside.length > 0 && <details><summary>{outside.length} 张已有卡片来自未启用来源，仍会保留</summary><p>{outside.map(item => item.name).join('、')}</p></details>}
 <footer className="source-save"><span>已选 {draft.length} 个来源</span><button type="button" onClick={save}>保存</button></footer></section>;
}
