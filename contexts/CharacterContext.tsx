import React, { createContext, useContext, useState } from 'react';
import { CharacterData } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { validateCharacterData } from '../utils/rules';

// Default Character Template
export const INITIAL_CHARACTER: CharacterData = {
    id: 'char-1',
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
};

interface CharacterContextType {
    characters: CharacterData[];
    activeCharId: string | null;
    activeCharacter: CharacterData | undefined;
    setActiveCharId: (id: string | null) => void;
    createCharacter: () => string; // Returns new ID
    updateCharacter: (id: string, updates: Partial<CharacterData>) => void;
    deleteCharacter: (id: string) => void;
    importCharacters: (json: any) => void;
    exportCharacters: () => void;
}

const CharacterContext = createContext<CharacterContextType | null>(null);

export const CharacterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [characters, setCharacters] = useLocalStorage<CharacterData[]>('dnd_characters_v1', []);
    const [activeCharId, setActiveCharId] = useState<string | null>(null);

    const activeCharacter = characters.find(c => c.id === activeCharId);

    const createCharacter = () => {
        const newId = `char-${Date.now()}`;
        const newChar: CharacterData = { ...INITIAL_CHARACTER, id: newId, name: '新角色' };
        setCharacters(prev => [...prev, newChar]);
        setActiveCharId(newId);
        return newId;
    };

    const updateCharacter = (id: string, updates: Partial<CharacterData>) => {
        setCharacters(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
    };

    const deleteCharacter = (id: string) => {
        setCharacters(prev => prev.filter(c => c.id !== id));
        if (activeCharId === id) setActiveCharId(null);
    };

    const importCharacters = (json: any) => {
        if (Array.isArray(json)) {
            // Import multiple characters
            const newChars = json.filter(c => validateCharacterData(c));
            if (newChars.length === 0) {
                alert("文件中没有有效的角色数据");
                return;
            }
            setCharacters(prev => {
                const ids = new Set(prev.map(c => c.id));
                return [...prev, ...newChars.filter((c: CharacterData) => !ids.has(c.id))];
            });
            alert(`已导入 ${newChars.length} 个角色`);
        } else if (validateCharacterData(json)) {
            // Import single character
            const newChar = { ...json, id: `char-${Date.now()}` };
            setCharacters(prev => [...prev, newChar]);
            setActiveCharId(newChar.id);
        } else {
            alert("无效的角色数据文件，或数据结构已损坏");
        }
    };

    const exportCharacters = () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(characters, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", `dnd_characters_backup_${new Date().toISOString().slice(0, 10)}.json`);
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
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

    return (
        <CharacterContext.Provider value={value}>
            {children}
        </CharacterContext.Provider>
    );
};

export const useCharacters = () => {
    const context = useContext(CharacterContext);
    if (!context) {
        throw new Error('useCharacters must be used within a CharacterProvider');
    }
    return context;
};
