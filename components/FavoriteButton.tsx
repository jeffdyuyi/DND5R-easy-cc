import { useFavorites } from '../contexts/FavoritesContext';
import type { ResourceSnapshot } from '../types';
import { useState } from 'react';
export function FavoriteButton({ item, compact = false }: {
    item: ResourceSnapshot;
    compact?: boolean;
}) {
    const { has, toggle } = useFavorites(), saved = has(item);
    const [feedback, setFeedback] = useState(0);
    if (!item.id || !item.kind || !item.name || !item.source)
        return null;
    return <button type="button" className={'favorite-toggle' + (compact ? ' is-compact' : '')} title={saved ? '取消收藏' : '收藏'} aria-pressed={saved} aria-label={(saved ? '取消收藏' : '收藏') + '：' + item.name} onClick={event => { event.stopPropagation(); toggle(item); setFeedback(value => value + 1); }}>
        <span key={feedback} className={'favorite-symbol' + (feedback ? ' is-tapped' : '')} aria-hidden="true"><svg viewBox="0 0 24 24" width="18" height="18" fill={saved ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.8 4.8a5.5 5.5 0 0 0-7.8 0L12 5.9l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.4a5.5 5.5 0 0 0 0-7.8Z"/></svg></span>
        {!compact && <span>{saved ? '已收藏' : '收藏'}</span>}
    </button>;
}
