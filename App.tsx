import { PwaUpdateNotice } from './components/PwaUpdateNotice';
import { lazy, Suspense, useState } from 'react';
import { AppProviders } from './contexts/AppProviders';
import { CharacterManagement } from './components/character/CharacterManagement';
import { QuickReference } from './components/QuickReference';
import { AssetIcon } from './components/common/AssetIcon';
import { RulesWorkspace } from './components/RulesWorkspace';
import { InformationWorkspace } from './components/InformationWorkspace';
function CharacterDockIcon() { return <svg viewBox="0 0 32 32" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 5h17a2 2 0 0 1 2 2v21H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"/><path d="M26 25H8a2 2 0 0 0 0 3M10 9h11"/><circle cx="16" cy="15" r="3"/><path d="M10 23c.7-3 2.8-5 6-5s5.3 2 6 5"/></svg>; }
const DiceWorkspace = lazy(() => import('./components/DiceWorkspace'));
type Destination = 'dice' | 'lookup' | 'characters' | 'rules' | 'information';
const destinations: {
    id: Destination;
    label: string;
    icon: string;
}[] = [{ id: 'dice', label: '骰子', icon: '' }, { id: 'lookup', label: '速查', icon: 'pixel/search' }, { id: 'characters', label: '角色', icon: '' }, { id: 'rules', label: '规则', icon: 'pixel/book' }, { id: 'information', label: '信息', icon: '' }];
export default function App() {
    const [active, setActive] = useState<Destination>('characters');
    const [visited, setVisited] = useState<Set<Destination>>(() => new Set(['characters']));
    const navigate = (id: Destination) => { setVisited(previous => new Set([...previous, id])); setActive(id); };
    return <AppProviders><div className="pixel-app app-shell"><main className="app-main">{destinations.map(({ id, label }) => visited.has(id) && <section className="app-destination" key={id} hidden={active !== id} aria-label={label} id={'app-page-' + id}>{id === 'characters' && <CharacterManagement />}{id === 'lookup' && <QuickReference/>}{id === 'rules' && <RulesWorkspace />}{id === 'information' && <InformationWorkspace />} {id === 'dice' && <Suspense fallback={<p className="workspace-loading">正在打开骰盘…</p>}><DiceWorkspace active={active === 'dice'}/></Suspense>}</section>)}</main><nav className="app-console" aria-label="应用主导航">{destinations.map(({ id, label, icon }) => <button type="button" key={id} className={id === 'characters' ? 'app-console-character' : ''} aria-current={active === id ? 'page' : undefined} aria-controls={'app-page-' + id} onClick={() => navigate(id)}><span className="app-console-icon">{id === 'dice' ? <svg viewBox="0 0 40 40" aria-hidden="true"><path d="M20 2 37 12v17L20 39 3 29V12Z M3 12l17 7 17-7 M20 2v17L3 29m17-10 17 10M20 19v20" fill="none" stroke="currentColor" strokeWidth="2"/><path d="m10 10 10-6 10 6-10 7Z" fill="currentColor" opacity=".2"/></svg> : id === 'characters' ? <CharacterDockIcon /> : id === 'information' ? <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="16" cy="16" r="12"/><path d="M16 14v9m0-15v2"/></svg> : <AssetIcon name={icon} size={28}/>}</span><span>{label}</span></button>)}</nav><PwaUpdateNotice/></div></AppProviders>;
}

