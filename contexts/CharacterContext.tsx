import { downloadJson, exportStoredRecord } from '../utils/files';
import React, { createContext, useContext, useState } from 'react';
import { CharacterData } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { CHARACTERS_STORAGE_KEY, validateCharacterData, validateCharacterList, withCharacterDefaults } from '../src/character/persistence';
// Default Character Template
export const INITIAL_CHARACTER: CharacterData = {
    id: 'char-1',
    avatarDataUrl: '',
    name: '未命名角色',
    playerName: '',
    level: 1,
    className: '',
    subclass: '',
    race: '',
    subRace: '',
    background: '',
    alignment: '绝对中立',
    // Extended Details
    pronouns: '',
    faith: '',
    lifestyle: '',
    // Physical Characteristics
    gender: '',
    age: '',
    height: '',
    weight: '',
    hair: '',
    skin: '',
    eyes: '',
    appearance: '',
    originFeat: '',
    languages: '通用语',
    toolProficiencies: '',
    abilities: { strength: 10, dexterity: 10, constitution: 10, intelligence: 10, wisdom: 10, charisma: 10 },
    abilityBonuses: { strength: 0, dexterity: 0, constitution: 0, intelligence: 0, wisdom: 0, charisma: 0 },
    backgroundBonuses: { strength: 0, dexterity: 0, constitution: 0, intelligence: 0, wisdom: 0, charisma: 0 },
    skillMastery: {},
    featSelections: {},
    hpMax: 10,
    currentHp: 10,
    tempHp: 0,
    hitDiceCurrent: 1,
    personalityTraits: '',
    ideals: '',
    bonds: '',
    flaws: '',
    backstory: '',
    // Notes & Relations
    organizations: '',
    allies: '',
    enemies: '',
    otherNotes: '',
    copper: 0, silver: 0, gold: 0, platinum: 0,
    equipment: '',
    treasure: '',
    inventoryWeapons: [],
    inventoryArmor: [],
    inventoryGear: [],
    tools: [],
    experience: 0,
    notes: '',
    spellcastingAbility: '智力',
    spellSaveDC: 10,
    spellAttackBonus: 2,
    spells: {
        cantrips: '', level1: '', level2: '', level3: '', level4: '', level5: '', level6: '', level7: '', level8: '', level9: ''
    },
    spellSlots: {
        level1: { total: 0, used: 0 },
        level2: { total: 0, used: 0 },
        level3: { total: 0, used: 0 },
        level4: { total: 0, used: 0 },
        level5: { total: 0, used: 0 },
        level6: { total: 0, used: 0 },
        level7: { total: 0, used: 0 },
        level8: { total: 0, used: 0 },
        level9: { total: 0, used: 0 },
    },
    // Structured Proficiency Tracking
    proficiencySources: {
        skills: { class: [], background: [], species: [], feat: [] },
        tools: { class: [], background: [], species: [], feat: [] },
    },
    // Equipment Choices
    equipmentChoices: {
        classChoice: '',
        classSubChoices: {},
        backgroundChoice: '',
        backgroundSubChoices: {},
    },
    startingInventory: [],
    // Feat Configuration
    featConfig: {
        originFeat: { name: '' },
        otherFeats: {},
    },
    // Structured Notes
    notesStructured: {
        organizations: [],
        allies: [],
        enemies: [],
        other: [],
    },
    selections: {},
    achievements: [],
};
interface CharacterContextType {
    characters: CharacterData[];
    activeCharId: string | null;
    activeCharacter: CharacterData | undefined;
    setActiveCharId: (id: string | null) => void;
    createCharacter: () => string; // Returns new ID
    updateCharacter: (id: string, updates: Partial<CharacterData>) => boolean;
    deleteCharacter: (id: string) => void;
    importCharacters: (json: any) => void;
    exportCharacters: () => void;
}
const CharacterContext = createContext<CharacterContextType | null>(null);
export const CharacterProvider: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => {
    const [storedCharacters, setCharacters, storage] = useLocalStorage<CharacterData[]>(CHARACTERS_STORAGE_KEY, []);
    const characters = Array.isArray(storedCharacters) ? storedCharacters.filter(validateCharacterData) : [];
    const damaged = storage.unreadable || !validateCharacterList(storedCharacters);
    const [activeCharId, setActiveCharId] = useState<string | null>(null);
    const selectedCharacter = characters.find(c => c.id === activeCharId);
    const activeCharacter = selectedCharacter ? withCharacterDefaults(INITIAL_CHARACTER, selectedCharacter) : undefined;
    const createCharacter = () => {
        const newId = `char-${crypto.randomUUID()}`;
        const newChar: CharacterData = { ...structuredClone(INITIAL_CHARACTER), id: newId, name: '新角色' };
        if (damaged) { alert('角色记录有无效结构，请先备份原始记录后恢复；当前禁止覆盖。'); return ''; }
        if (!setCharacters(prev => [...prev, newChar])) return '';
        setActiveCharId(newId);
        return newId;
    };
    const updateCharacter = (id: string, updates: Partial<CharacterData>) => {
        if (damaged) { alert('角色记录有无效结构，请先备份原始记录后恢复。'); return false; }
        return setCharacters(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
    };
    const deleteCharacter = (id: string) => {
        if (damaged) return;
        if (!setCharacters(prev => prev.filter(c => c.id !== id))) return;
        if (activeCharId === id)
            setActiveCharId(null);
    };
    const importCharacters = (json: any) => {
        if (damaged) {
            const recovered = Array.isArray(json) ? json : [json];
            if (!recovered.length || !validateCharacterList(recovered)) { alert('恢复文件包含无效角色或重复身份，原记录保留。'); return; }
            if (!confirm('用此备份恢复角色？将先发起当前原始记录的下载，请保留备份文件。')) return;
            try {
                exportStoredRecord(CHARACTERS_STORAGE_KEY, 'easy-cc-damaged-characters.json');
                if (storage.restore(recovered)) alert('角色记录已恢复。');
            }
            catch (error) { alert('恢复未完成，原记录保留：' + String(error)); }
            return;
        }
        if (Array.isArray(json)) {
            // Import multiple characters
            if (!json.every(validateCharacterData)) { alert('文件包含无效角色，本次未导入任何记录，原存档保留。'); return; }
            const newChars: CharacterData[] = json;
            if (newChars.length === 0) {
                alert("文件中没有有效的角色数据");
                return;
            }
            let added = 0;
            const saved = setCharacters(previous => {
                const ids = new Set(previous.map(character => character.id)), additions: CharacterData[] = [];
                for (const character of newChars)
                    if (!ids.has(character.id)) {
                        ids.add(character.id);
                        additions.push(withCharacterDefaults(INITIAL_CHARACTER, character));
                    }
                added = additions.length;
                return [...previous, ...additions];
            });
            if (saved) alert(`已导入 ${added} 个角色，跳过 ${newChars.length - added} 个重复身份。`);
        }
        else if (validateCharacterData(json)) {
            // Import single character
            const newChar = { ...withCharacterDefaults(INITIAL_CHARACTER, json), id: `char-${crypto.randomUUID()}` };
            if (setCharacters(prev => [...prev, newChar])) setActiveCharId(newChar.id);
        }
        else {
            alert("无效的角色数据文件，或数据结构已损坏");
        }
    };
    const exportCharacters = () => {
        try {
            if (storage.unreadable) exportStoredRecord(CHARACTERS_STORAGE_KEY, 'easy-cc-characters-original.json');
            else downloadJson(storedCharacters, `dnd_characters_backup_${new Date().toISOString().slice(0, 10)}.json`);
        }
        catch (error) { alert('导出未完成：' + String(error)); }
    };
    const value = {
        characters,
        activeCharId,
        activeCharacter,
        setActiveCharId,
        createCharacter,
        updateCharacter,
        deleteCharacter,
        importCharacters,
        exportCharacters
    };
    return (<CharacterContext.Provider value={value}>
            {children}
        </CharacterContext.Provider>);
};
export const useCharacters = () => {
    const context = useContext(CharacterContext);
    if (!context) {
        throw new Error('useCharacters must be used within a CharacterProvider');
    }
    return context;
};
