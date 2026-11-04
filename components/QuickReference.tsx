import { useState } from 'react';
import { ResourceManagement } from './ResourceManagement';
import { FavoritesWorkspace } from './FavoritesWorkspace';

export function QuickReference() {
    const [tab, setTab] = useState<'catalog' | 'favorites'>('catalog');
    return <section className="quick-reference">
        <nav className="quick-reference-tabs" aria-label="速查页签">
            <button type="button" aria-current={tab === 'catalog' ? 'page' : undefined} onClick={() => setTab('catalog')}>资料库</button>
            <button type="button" aria-current={tab === 'favorites' ? 'page' : undefined} onClick={() => setTab('favorites')}>♥ 收藏</button>
        </nav>
        <div className="quick-reference-page" hidden={tab !== 'catalog'}><ResourceManagement/></div>
        <div className="quick-reference-page" hidden={tab !== 'favorites'}><FavoritesWorkspace onBrowse={() => setTab('catalog')}/></div>
    </section>;
}
