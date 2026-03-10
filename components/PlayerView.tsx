import React, { useState } from 'react';
import { PlayerSidebar } from './PlayerSidebar';
import { CharacterSheet } from './CharacterSheet';
import { CardLibrary } from './CardLibrary';
import CharacterWizard from './CharacterWizard';
import SpellbookManager from './TabSpells';
import { RoomJoin } from './RoomJoin';
import { WelcomeScreen } from './common/WelcomeScreen';

import { useLibrary } from '../contexts/LibraryContext';
import { useCharacters } from '../contexts/CharacterContext';
import { BaseLibraryItem } from '../types';
import { FileUp, FileDown, Feather, Menu } from 'lucide-react';

export const PlayerView: React.FC = () => {
    const [hasEntered, setHasEntered] = useState(false);
    const [activeModule, setActiveModule] = useState('sheet');
    const [isWizardActive, setIsWizardActive] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const {
        characters, activeCharId, activeCharacter, setActiveCharId,
        createCharacter: createNewCharacter, updateCharacter, deleteCharacter,
        importCharacters, exportCharacters
    } = useCharacters();

    const { classes, subclasses, species, backgrounds, feats, allTools } = useLibrary();

    const handleCreateCharacter = () => {
        createNewCharacter();
        setIsWizardActive(true);
    };

    const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const json = JSON.parse(event.target?.result as string);
                importCharacters(json);
            } catch (err) {
                alert("导入失败：文件格式错误");
            }
        };
        reader.readAsText(file);
        e.target.value = '';
    };

    const characterListItems: BaseLibraryItem[] = characters.map(c => ({
        id: c.id,
        name: c.name || "未命名角色",
        description: `Lv.${c.level} ${c.race} ${c.className}`,
        source: '第三方/原创',
        tags: [c.className, c.race]
    }));

    if (!hasEntered) {
        return <WelcomeScreen onEnter={() => setHasEntered(true)} />;
    }

    if (isWizardActive && activeCharacter) {
        return (
            <CharacterWizard
                character={activeCharacter}
                updateCharacter={(updates) => updateCharacter(activeCharacter.id, updates)}
                onComplete={() => setIsWizardActive(false)}
            />
        );
    }

    const renderContent = () => {
        switch (activeModule) {
            case 'sheet':
                if (activeCharacter) {
                    return (
                        <CharacterSheet
                            character={activeCharacter}
                            updateCharacter={(updates) => updateCharacter(activeCharacter.id, updates)}
                            onBack={() => setActiveCharId(null)}
                            libraryClasses={classes.items}
                            librarySubclasses={subclasses.items}
                            librarySpecies={species.items}
                            libraryBackgrounds={backgrounds.items}
                            libraryFeats={feats.items}
                            libraryTools={allTools}
                        />
                    );
                }
                return (
                    <div className="p-8 pb-20 max-w-7xl mx-auto animate-fade-in">
                        <div className="mb-8 border-b-2 border-stone-300 pb-4 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                            <div>
                                <h2 className="text-4xl font-bold text-stone-800 mb-2">角色卡库</h2>
                                <p className="text-stone-500">创建新角色或点击卡片管理已有角色。</p>
                            </div>
                            <div className="flex gap-2 flex-wrap">
                                <button onClick={exportCharacters} className="bg-stone-100 text-stone-700 px-4 py-3 rounded-lg font-bold shadow-sm border border-stone-300 hover:bg-stone-200 transition-colors flex items-center gap-2 text-sm">
                                    <FileDown className="w-5 h-5" />
                                    全部导出
                                </button>
                                <label className="bg-stone-200 text-stone-700 px-6 py-3 rounded-lg font-bold shadow-md hover:bg-stone-300 transition-colors cursor-pointer flex items-center gap-2 text-sm">
                                    <FileUp className="w-5 h-5" />
                                    导入离线存档
                                    <input type="file" accept=".json" onChange={handleImport} className="hidden" />
                                </label>
                            </div>
                        </div>
                        <CardLibrary<BaseLibraryItem>
                            title="我的角色"
                            items={characterListItems}
                            itemTypeLabel="角色"
                            onSelect={(item) => setActiveCharId(item.id)}
                            onCreateAction={handleCreateCharacter}
                            onDelete={deleteCharacter}
                            allowEdit={true}
                            onEdit={(item) => setActiveCharId(item.id)}
                            cardColorTheme="stone"
                        />
                    </div>
                );

            case 'spellbook':
                return (
                    <div className="animate-fade-in">
                        <SpellbookManager
                            characters={characters}
                            activeCharId={activeCharId || (characters.length > 0 ? characters[0].id : null)}
                            setActiveCharId={setActiveCharId}
                            updateCharacter={updateCharacter}
                        />
                    </div>
                );
            case 'room-join':
                return (
                    <div className="animate-fade-in p-8">
                        <RoomJoin />
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="flex w-full bg-stone-100 font-serif h-full">
            <div className="md:hidden flex-none absolute top-0 left-0 w-full bg-stone-900 text-white z-40 p-4 flex justify-between items-center shadow-md">
                <div className="flex items-center gap-2 font-bold">
                    <Feather className="w-5 h-5 text-dndRed" />
                    <span>玩家端</span>
                </div>
                <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <Menu className="w-6 h-6" />
                </button>
            </div>

            <PlayerSidebar
                activeModule={activeModule}
                setActiveModule={(m) => { setActiveModule(m); setIsSidebarOpen(false); }}
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />

            <div className="flex-grow md:ml-64 relative overflow-y-auto">
                {renderContent()}
            </div>
        </div>
    );
};
