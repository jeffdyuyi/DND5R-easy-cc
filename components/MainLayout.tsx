import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { CharacterSheet } from './CharacterSheet';
import { LibraryManager } from './LibraryManager';
import { CardLibrary } from './CardLibrary';
import CharacterWizard from './CharacterWizard';
import { BaseLibraryItem, ClassItem, SubclassItem, SpeciesItem, BackgroundItem, SpellItem, FeatItem, ItemItem } from '../types';
import {
    ClassDetailView, SpeciesDetailView, BackgroundDetailView,
    SubclassDetailView, SpellDetailView, FeatDetailView, ItemDetailView
} from './LibraryDetails';
import { ClassEditor, SubclassEditor, RichDescriptionEditor, BackgroundEditor, SpellEditor, ToolEditor } from './LibraryEditors';
import SpellbookManager from './TabSpells';
import { FileUp, FileDown, Feather, Menu } from 'lucide-react';

import { useLibrary } from '../contexts/LibraryContext';
import { useCharacters } from '../contexts/CharacterContext';
import { useSpellFilter, useFeatFilter, useItemFilter, useMagicItemFilter } from '../hooks/useLibraryFilters';
import { WelcomeScreen } from './common/WelcomeScreen';
import { CompactCard } from './common/CompactCard';

// Main Component
export const MainLayout = () => {
    const [hasEntered, setHasEntered] = useState(false);
    const [activeModule, setActiveModule] = useState('sheet');
    const [isWizardActive, setIsWizardActive] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Contexts
    const {
        characters, activeCharId, activeCharacter, setActiveCharId,
        createCharacter: createNewCharacter, updateCharacter, deleteCharacter,
        importCharacters, exportCharacters
    } = useCharacters();

    const {
        classes, subclasses, species, backgrounds, spells, feats,
        weapons, armors, tools, gears, magicItems, allTools
    } = useLibrary();

    // Filters
    const { filteredSpells, FilterUI: SpellFilters } = useSpellFilter(spells.items, classes.items);
    const { filteredFeats, FilterUI: FeatFilters } = useFeatFilter(feats.items);
    const { filteredItems: filteredTools, FilterUI: ToolFilters } = useItemFilter(tools.items, ['工匠工具', '其他工具']);
    const { filteredItems: filteredGears, FilterUI: GearFilters } = useItemFilter(gears.items, ['冒险道具', '容器', '弹药', '套组', '坐骑', '载具', '奥术法器', '德鲁伊法器', '圣徽']);
    const { filteredItems: filteredMagicItems, FilterUI: MagicFilters } = useMagicItemFilter(magicItems.items);

    // Actions
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

    // Wizard
    if (isWizardActive && activeCharacter) {
        return (
            <CharacterWizard
                character={activeCharacter}
                updateCharacter={(updates) => updateCharacter(activeCharacter.id, updates)}
                onComplete={() => setIsWizardActive(false)}
            />
        );
    }

    // Render Router
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
                    <div className="p-8 pb-20 max-w-7xl mx-auto">
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
                    <SpellbookManager
                        characters={characters}
                        activeCharId={activeCharId || (characters.length > 0 ? characters[0].id : null)}
                        setActiveCharId={setActiveCharId}
                        updateCharacter={updateCharacter}
                    />
                );

            case 'lib-class':
                return (
                    <LibraryManager<ClassItem>
                        key="lib-class"
                        title="职业库" itemLabel="职业" items={classes.items} {...classes}
                        cardColorTheme="red"
                        renderDetail={(item) => <ClassDetailView item={item} />}
                        renderEditFields={(item, setItem) => <ClassEditor item={item} setItem={setItem} />}
                        emptyTemplate={{
                            id: '', name: '', source: '第三方/原创', description: '',
                            hitDie: 'd8', primaryAbility: '力量', saves: [], tags: [],
                            coreTraits: {
                                primaryAbility: '待定', hitPointDie: 'd8', savingThrows: '待定',
                                skillProficiencies: '待定', weaponProficiencies: '待定', armorTraining: '待定',
                                startingEquipment: { optionA: '', optionB: '' }
                            },
                            features: [], subclasses: [], subclassLevel: 3
                        }}
                    />
                );
            case 'lib-subclass':
                return (
                    <LibraryManager<SubclassItem>
                        key="lib-subclass"
                        title="子职业库" itemLabel="子职业" items={subclasses.items} {...subclasses}
                        cardColorTheme="orange"
                        renderDetail={(item) => <SubclassDetailView item={item} />}
                        renderEditFields={(item, setItem) => <SubclassEditor item={item} setItem={setItem} classes={classes.items} />}
                        emptyTemplate={{
                            id: '', name: '', source: '第三方/原创', description: '',
                            parentClass: classes.items[0]?.name || '', features: []
                        }}
                    />
                );
            case 'lib-species':
                return (
                    <LibraryManager<SpeciesItem>
                        key="lib-species"
                        title="种族库" itemLabel="种族" items={species.items} {...species}
                        cardColorTheme="green"
                        renderDetail={(item) => <SpeciesDetailView item={item} />}
                        renderEditFields={(item, setItem) => <RichDescriptionEditor item={item} setItem={setItem} />}
                        emptyTemplate={{ id: '', name: '', source: '第三方/原创', description: '', speed: 30, size: '中型', darkvision: false, traits: [] }}
                    />
                );
            case 'lib-bg':
                return (
                    <LibraryManager<BackgroundItem>
                        key="lib-bg"
                        title="背景库" itemLabel="背景" items={backgrounds.items} {...backgrounds}
                        cardColorTheme="yellow"
                        renderDetail={(item) => <BackgroundDetailView item={item} libraryFeats={feats.items} />}
                        renderEditFields={(item, setItem) => <BackgroundEditor item={item} setItem={setItem} feats={feats.items} />}
                        emptyTemplate={{
                            id: '', name: '', source: '第三方/原创',
                            description: '在此描述角色的过往经历...',
                            abilityScores: [],
                            feat: '',
                            skills: [],
                            tool: '',
                            equipment: ["价值50GP的装备组合"]
                        }}
                    />
                );
            case 'lib-spell':
                return (
                    <LibraryManager<SpellItem>
                        key="lib-spell"
                        title="法术库" itemLabel="法术" items={filteredSpells} {...spells}
                        extraTools={SpellFilters}
                        layout="grid"
                        renderItem={(item, isSelected, onClick, actions) => (
                            <CompactCard
                                title={item.name}
                                subtitle={`${item.level === 0 ? '戏法' : item.level + '环'} ${item.school}`}
                                tags={item.classes}
                                isSelected={isSelected}
                                onClick={onClick}
                                actions={actions}
                            />
                        )}
                        renderDetail={(item) => <SpellDetailView item={item} />}
                        renderEditFields={(item, setItem) => <SpellEditor item={item} setItem={setItem} />}
                        emptyTemplate={{
                            id: '', name: '', source: '第三方/原创',
                            description: '法术描述...',
                            level: 1, school: '塑能', castingTime: '1 动作',
                            range: '60 尺', components: 'V, S', duration: '立即',
                            tags: [], classes: []
                        }}
                    />
                );
            case 'lib-feat':
                return (
                    <LibraryManager<FeatItem>
                        key="lib-feat"
                        title="专长库" itemLabel="专长" items={filteredFeats} {...feats}
                        extraTools={FeatFilters}
                        cardColorTheme="purple"
                        renderDetail={(item) => <FeatDetailView item={item} />}
                        renderEditFields={(item, setItem) => <RichDescriptionEditor item={item} setItem={setItem} />}
                        emptyTemplate={{ id: '', name: '', source: '第三方/原创', category: '通用专长', description: '', benefits: [], tags: [] }}
                    />
                );
            case 'lib-weapon':
                return (
                    <LibraryManager<ItemItem>
                        key="lib-weapon"
                        title="武器库" itemLabel="武器" items={weapons.items} {...weapons}
                        layout="grid"
                        renderItem={(item, isSelected, onClick, actions) => (
                            <CompactCard
                                title={item.name}
                                subtitle={item.type}
                                meta={
                                    <div className="flex gap-2">
                                        <span>{item.damage} {item.damageType}</span>
                                        <span className="text-stone-400">|</span>
                                        <span>{item.cost}</span>
                                    </div>
                                }
                                tags={item.properties}
                                isSelected={isSelected}
                                onClick={onClick}
                                actions={actions}
                            />
                        )}
                        renderDetail={(item) => <ItemDetailView item={item} />}
                        renderEditFields={(item, setItem) => <RichDescriptionEditor item={item} setItem={setItem} />}
                        emptyTemplate={{ id: '', name: '', source: '第三方/原创', description: '', type: '武器', cost: '10 GP', weight: '2 lb', tags: [] }}
                    />
                );
            case 'lib-armor':
                return (
                    <LibraryManager<ItemItem>
                        key="lib-armor"
                        title="护甲库" itemLabel="护甲" items={armors.items} {...armors}
                        layout="grid"
                        renderItem={(item, isSelected, onClick, actions) => (
                            <CompactCard
                                title={item.name}
                                titleColor="text-stone-900"
                                subtitle={item.tags?.find(t => t.includes('甲') || t === '盾牌') || item.type}
                                meta={
                                    <div className="flex justify-between items-center mt-2">
                                        <div className="font-bold text-dndRed bg-stone-100 px-2 py-0.5 rounded">AC {item.ac?.split('+')[0].trim()}</div>
                                        <div className="text-stone-500 font-normal">{item.cost}</div>
                                    </div>
                                }
                                tags={[]}
                                isSelected={isSelected}
                                onClick={onClick}
                                actions={actions}
                                bgColor="bg-stone-50"
                            />
                        )}
                        renderDetail={(item) => <ItemDetailView item={item} />}
                        renderEditFields={(item, setItem) => <RichDescriptionEditor item={item} setItem={setItem} />}
                        emptyTemplate={{ id: '', name: '', source: '第三方/原创', description: '', type: '护甲', cost: '50 GP', weight: '20 lb', tags: [] }}
                    />
                );
            case 'lib-tool':
                return (
                    <LibraryManager<ItemItem>
                        key="lib-tool"
                        title="工具库" itemLabel="工具" items={filteredTools} {...tools}
                        extraTools={ToolFilters}
                        layout="grid"
                        renderItem={(item, isSelected, onClick, actions) => (
                            <CompactCard
                                title={item.name}
                                subtitle={item.type}
                                meta={
                                    <div className="flex gap-2 text-stone-500">
                                        <span>{item.cost}</span>
                                        <span>|</span>
                                        <span>{item.weight}</span>
                                    </div>
                                }
                                tags={item.tags?.filter(t => t !== '工匠工具' && t !== '其他工具')}
                                isSelected={isSelected}
                                onClick={onClick}
                                actions={actions}
                            />
                        )}
                        renderDetail={(item) => <ItemDetailView item={item} />}
                        renderEditFields={(item, setItem) => <ToolEditor item={item} setItem={setItem} />}
                        emptyTemplate={{ id: '', name: '', source: '第三方/原创', description: '', type: '工具', cost: '1 GP', weight: '1 lb', tags: [] }}
                    />
                );
            case 'lib-gear':
                return (
                    <LibraryManager<ItemItem>
                        key="lib-gear"
                        title="冒险物品库" itemLabel="冒险物品" items={filteredGears} {...gears}
                        extraTools={GearFilters}
                        layout="grid"
                        renderItem={(item, isSelected, onClick, actions) => (
                            <CompactCard
                                title={item.name}
                                subtitle={item.type}
                                meta={
                                    <div className="flex gap-2 text-stone-500">
                                        <span>{item.cost}</span>
                                        <span>|</span>
                                        <span>{item.weight}</span>
                                    </div>
                                }
                                tags={[]}
                                isSelected={isSelected}
                                onClick={onClick}
                                actions={actions}
                            />
                        )}
                        renderDetail={(item) => <ItemDetailView item={item} />}
                        renderEditFields={(item, setItem) => <RichDescriptionEditor item={item} setItem={setItem} />}
                        emptyTemplate={{ id: '', name: '', source: '第三方/原创', description: '', type: '杂物', cost: '1 SP', weight: '1 lb', tags: [] }}
                    />
                );
            case 'lib-magic':
                return (
                    <LibraryManager<ItemItem>
                        key="lib-magic"
                        title="魔法物品库" itemLabel="魔法物品" items={filteredMagicItems} {...magicItems}
                        extraTools={MagicFilters}
                        layout="grid"
                        renderItem={(item, isSelected, onClick, actions) => {
                            const rarityColor = {
                                '普通': 'text-stone-500', '非普通': 'text-green-600', '珍稀': 'text-blue-600',
                                '极珍稀': 'text-purple-600', '传说': 'text-orange-500', '神器': 'text-yellow-600'
                            }[item.rarity || '普通'];

                            const requiresAttunement = item.attuned || (item.description && item.description.includes('需同调'));

                            return (
                                <CompactCard
                                    title={item.name}
                                    subtitle={item.type}
                                    meta={
                                        <div className={`font-bold ${rarityColor} mt-1`}>
                                            {item.rarity}
                                        </div>
                                    }
                                    tags={requiresAttunement ? ['需同调'] : []}
                                    isSelected={isSelected}
                                    onClick={onClick}
                                    actions={actions}
                                />
                            );
                        }}
                        renderDetail={(item) => <ItemDetailView item={item} />}
                        renderEditFields={(item, setItem) => <RichDescriptionEditor item={item} setItem={setItem} />}
                        emptyTemplate={{ id: '', name: '', source: '第三方/原创', description: '', type: '奇物', cost: '---', weight: '1 lb', tags: [], rarity: '普通' }}
                    />
                );
            default:
                return <div className="p-8">模块开发中...</div>;
        }
    };

    return (
        <div className="flex min-h-screen bg-stone-100 font-serif">
            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 left-0 w-full bg-stone-900 text-white z-50 p-4 flex justify-between items-center shadow-md">
                <div className="flex items-center gap-2 font-bold">
                    <Feather className="w-5 h-5 text-dndRed" />
                    <span>不咕鸟DND5R</span>
                </div>
                <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <Menu className="w-6 h-6" />
                </button>
            </div>

            <Sidebar
                activeModule={activeModule}
                setActiveModule={(m) => { setActiveModule(m); setIsSidebarOpen(false); }}
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />

            <div className="flex-grow md:ml-64 pt-16 md:pt-0 overflow-y-auto min-h-screen">
                {renderContent()}
            </div>
        </div>
    );
};
