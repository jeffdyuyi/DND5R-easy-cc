import React from 'react';
import { cardPresentation } from './common/cardPresentation';
import { resourceFacts } from './common/ResourceFacts';
import { resourceLabels, resourceColors } from '../src/content/resourceRegistry';
export function ResourcePreview({ item: input, onSelect, variant = 'catalog', showCategory = false }: {
    item: any;
    onSelect: () => void;
    variant?: 'catalog' | 'selected';
    showCategory?: boolean;
}) {
    const item = cardPresentation(input);
    const type = resourceLabels[item.kind] || item.type || '资源';
    const english = item.srdEnglishName || item.englishName;
    const facts = resourceFacts(item).filter(([label, value]) => value.length <= 32 && label !== '职业法术列表').slice(0, 2);
    return <button type="button" className={'resource-cover resource-cover-editorial preview-' + variant + ' kind-' + item.kind + (facts.length ? ' has-cover-facts' : '')} style={{ '--resource-accent': resourceColors[item.kind] || '#9a7439' } as React.CSSProperties} onClick={onSelect} aria-label={item.name + '，' + item.source + '，' + type + '，查看完整内容'}>
      <span className="resource-cover-kicker">{showCategory && <span>{type}</span>}<span>{item.source}</span></span>
      <span className="resource-cover-title"><strong>{item.name}</strong>{english && english !== item.name && <small>{english}</small>}</span>
      {facts.length > 0 && <span className="resource-cover-facts">{facts.map(([label, value]) => <span className="resource-cover-fact" key={label} title={label + '：' + value}><span>{label}</span><strong>{value}</strong></span>)}</span>}

    </button>;
}
