import { CharacterGuides } from './CharacterGuides';
import React, { useState } from 'react';
import { PortraitPlaceholder } from './CharacterPortrait';
import CharacterWorkspace from './CharacterWorkspace';
import { useCharacters } from '../../contexts/CharacterContext';
export const CharacterManagement: React.FC = () => {
    const { characters, activeCharacter, setActiveCharId, createCharacter: createNewCharacter, updateCharacter, deleteCharacter } = useCharacters();
    const [mode, setMode] = useState<'overview' | 'edit'>('overview');
    const handleCreateCharacter = () => {
        setMode('edit'); createNewCharacter();
    };
    if (activeCharacter) return <CharacterWorkspace key={activeCharacter.id} character={activeCharacter} updateCharacter={updates => updateCharacter(activeCharacter.id, updates)} onComplete={() => setActiveCharId(null)} mode={mode} onMode={setMode}/>;
    return <section className="character-roster"><header><h1>我的角色</h1><p>本工具适用于龙与地下城五版规则，是线下跑团时的速查助手，提供基础数值辅助与手动记录，不能替代完整电子角色卡。</p></header><CharacterGuides/><div className="character-roster-grid">{characters.map(c => <article key={c.id} className="character-roster-card"><button className="character-roster-open" onClick={() => { setMode('overview'); setActiveCharId(c.id); }}><div className="roster-portrait">{c.characterPortraitDataUrl || c.avatarDataUrl ? <img src={c.characterPortraitDataUrl || c.avatarDataUrl} alt=""/> : <PortraitPlaceholder/>}</div><div className="roster-caption"><strong>{c.name || '未命名角色'}</strong><span>Lv.{c.level}</span></div></button><div className="roster-view-actions"><button type="button" onClick={() => { setMode('overview'); setActiveCharId(c.id); }}>速览</button><button type="button" onClick={() => { setMode('edit'); setActiveCharId(c.id); }}>编辑</button></div><button className="roster-delete" aria-label={'删除' + c.name} onClick={() => { if (window.confirm('删除角色“' + c.name + '”？')) deleteCharacter(c.id); }}>×</button></article>)}<button type="button" className="character-create-card" onClick={handleCreateCharacter}><span aria-hidden="true">＋</span><strong>新角色</strong></button></div></section>;
};
