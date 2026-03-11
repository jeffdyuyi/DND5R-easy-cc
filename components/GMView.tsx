import React, { useState } from 'react';
import { GMSidebar } from './GMSidebar';
import { LibraryManager } from './LibraryManager';
import {
    ClassDetailView, SpeciesDetailView, BackgroundDetailView,
    SubclassDetailView, SpellDetailView, FeatDetailView, ItemDetailView
} from './LibraryDetails';
import { ClassEditor, SubclassEditor, RichDescriptionEditor, BackgroundEditor, SpellEditor, ToolEditor } from './LibraryEditors';
import { ClassItem, SubclassItem, SpeciesItem, BackgroundItem, SpellItem, FeatItem, ItemItem } from '../types';
import { CompactCard } from './common/CompactCard';
import { ClassCard } from './common/ClassCard';
import { useLibrary } from '../contexts/LibraryContext';
import { useSpellFilter, useFeatFilter, useItemFilter, useMagicItemFilter } from '../hooks/useLibraryFilters';
import { Feather, Menu } from 'lucide-react';

export const GMView: React.FC = () => {
    const [activeModule, setActiveModule] = useState('lib-class');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const {
        classes, subclasses, species, backgrounds, spells, feats,
        weapons, armors, tools, gears, magicItems
    } = useLibrary();

    const { filteredSpells, FilterUI: SpellFilters } = useSpellFilter(spells.items, classes.items);
    const { filteredFeats, FilterUI: FeatFilters } = useFeatFilter(feats.items);
    const { filteredItems: filteredTools, FilterUI: ToolFilters } = useItemFilter(tools.items, ['工匠工具', '其他工具']);
    const { filteredItems: filteredGears, FilterUI: GearFilters } = useItemFilter(gears.items, ['冒险道具', '容器', '弹药', '套组', '坐骑', '载具', '奥术法器', '德鲁伊法器', '圣徽']);
    const { filteredItems: filteredMagicItems, FilterUI: MagicFilters } = useMagicItemFilter(magicItems.items);

    const renderContent = () => {
        switch (activeModule) {
            case 'lib-class':
                return (
                    <LibraryManager<ClassItem>
                        key="lib-class"
                        title="职业库" itemLabel="职业" items={classes.items}
                        onAdd={classes.onAdd} onUpdate={classes.onUpdate} onDelete={classes.onDelete} onImport={classes.onImport}
                        cardColorTheme="red"
                        renderDetail={(item) => <ClassDetailView item={item} />}
                        renderEditFields={(item, setItem) => <ClassEditor item={item} setItem={setItem} />}
                        layout="grid"
                        renderItem={(item, isSelected, onClick, actions) => (
                            <ClassCard
                                item={item}
                                type="class"
                                isSelected={isSelected}
                                onClick={onClick}
                                actions={actions}
                            />
                        )}
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
                        title="子职业库" itemLabel="子职业" items={subclasses.items}
                        onAdd={subclasses.onAdd} onUpdate={subclasses.onUpdate} onDelete={subclasses.onDelete} onImport={subclasses.onImport}
                        cardColorTheme="orange"
                        renderDetail={(item) => <SubclassDetailView item={item} />}
                        renderEditFields={(item, setItem) => <SubclassEditor item={item} setItem={setItem} classes={classes.items} />}
                        layout="grid"
                        renderItem={(item, isSelected, onClick, actions) => (
                            <ClassCard
                                item={item}
                                type="subclass"
                                isSelected={isSelected}
                                onClick={onClick}
                                actions={actions}
                            />
                        )}
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
                        title="种族库" itemLabel="种族" items={species.items}
                        onAdd={species.onAdd} onUpdate={species.onUpdate} onDelete={species.onDelete} onImport={species.onImport}
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
                        title="背景库" itemLabel="背景" items={backgrounds.items}
                        onAdd={backgrounds.onAdd} onUpdate={backgrounds.onUpdate} onDelete={backgrounds.onDelete} onImport={backgrounds.onImport}
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
                        title="法术库" itemLabel="法术" items={filteredSpells}
                        onAdd={spells.onAdd} onUpdate={spells.onUpdate} onDelete={spells.onDelete} onImport={spells.onImport}
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
                        title="专长库" itemLabel="专长" items={filteredFeats}
                        onAdd={feats.onAdd} onUpdate={feats.onUpdate} onDelete={feats.onDelete} onImport={feats.onImport}
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
                        title="武器库" itemLabel="武器" items={weapons.items}
                        onAdd={weapons.onAdd} onUpdate={weapons.onUpdate} onDelete={weapons.onDelete} onImport={weapons.onImport}
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
                        title="护甲库" itemLabel="护甲" items={armors.items}
                        onAdd={armors.onAdd} onUpdate={armors.onUpdate} onDelete={armors.onDelete} onImport={armors.onImport}
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
                        title="工具库" itemLabel="工具" items={filteredTools}
                        onAdd={tools.onAdd} onUpdate={tools.onUpdate} onDelete={tools.onDelete} onImport={tools.onImport}
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
                        title="冒险物品库" itemLabel="冒险物品" items={filteredGears}
                        onAdd={gears.onAdd} onUpdate={gears.onUpdate} onDelete={gears.onDelete} onImport={gears.onImport}
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
                        title="魔法物品库" itemLabel="魔法物品" items={filteredMagicItems}
                        onAdd={magicItems.onAdd} onUpdate={magicItems.onUpdate} onDelete={magicItems.onDelete} onImport={magicItems.onImport}
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
                return null;
        }
    };

    return (
        <div className="flex w-full bg-stone-100 text-stone-900 font-serif h-full">
            <div className="md:hidden flex-none absolute top-0 left-0 w-full bg-stone-900 text-white z-40 p-4 flex justify-between items-center shadow-md">
                <div className="flex items-center gap-2 font-bold">
                    <Feather className="w-5 h-5 text-stone-400" />
                    <span>主持人端</span>
                </div>
                <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <Menu className="w-6 h-6" />
                </button>
            </div>

            <GMSidebar
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
