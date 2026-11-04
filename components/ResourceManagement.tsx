import { characterSourceKey } from '../src/content/resourceIdentity';
import { LibraryNavigation } from './LibraryNavigation';
import React, { useEffect, useMemo, useState } from 'react';
import { PixelGlyph } from './common/PixelGlyph';
import { LibraryManager } from './LibraryManager';
import { useLibrary } from '../contexts/LibraryContext';
import { useResourceCatalog } from '../hooks/useResourceCatalog';
import { RESOURCE_TYPES } from '../src/content/resourceRegistry';
import { sourceLabel } from '../src/content/sourceNames';
import { ItemItem, SubclassItem } from '../types';
import { useSpellFilter, useFeatFilter, useItemFilter, useMagicItemFilter, useFieldFilter, useMultiFieldFilter } from '../hooks/useLibraryFilters';
export const ResourceManagement: React.FC = () => {
    const library = useLibrary(), entries = useResourceCatalog();
    const [activeModule, setActiveModule] = useState(() => {
        try {
            return localStorage.getItem('easy_cc_resource_category') || 'lib-class';
        }
        catch {
            return 'lib-class';
        }
    });
    const [selectedSources, setSelectedSources] = useState<string[]>(() => {
        try {
            const saved = JSON.parse(localStorage.getItem('easy_cc_selected_sources_v1') || 'null');
            if (Array.isArray(saved))
                return saved.filter((s: unknown): s is string => typeof s === 'string').map((s: string) => s.includes('|') ? s : '5etools-cn|' + s);
        }
        catch { }
        return ['5etools-cn|XPHB', '5etools-cn|PHB'];
    });
    useEffect(() => {
        try {
            localStorage.setItem('easy_cc_selected_sources_v1', JSON.stringify(selectedSources));
        }
        catch { }
    }, [selectedSources]);
    const currentType = RESOURCE_TYPES.find(type => type.id === activeModule) || RESOURCE_TYPES[0];
    const catalog = useMemo(() => Object.fromEntries(RESOURCE_TYPES.map(type => { const handler = library[type.kind], allItems = entries.filter(item => item.kind === type.kind); return [type.kind, { ...handler, allItems, items: allItems.filter(item => selectedSources.includes(characterSourceKey(item))) }]; })), [library, entries, selectedSources]);
    const { classes, subclasses, species, backgrounds, spells, feats, weapons, armors, tools, gears, magicItems, optionalFeatures, charOptions, rewards, psionics } = catalog;
    const currentItems = catalog[currentType.kind].allItems as any[];
    const rank = (source: string) => source === 'XPHB' ? 0 : source === 'PHB' ? 1 : 2;
    const sourceNames = [...new Set<string>(currentItems.map(characterSourceKey))].sort((a, b) => rank(a) - rank(b) || a.localeCompare(b));
    const chooseContent = (id: string) => {
        setActiveModule(id);
        try {
            localStorage.setItem('easy_cc_resource_category', id);
        }
        catch { }
    };
    const toggleSource = (source: string) => setSelectedSources(previous => previous.includes(source) ? previous.filter(s => s !== source) : [...previous, source]);
    const { filteredSpells, FilterUI: SpellFilters } = useSpellFilter(spells.items);
    const { filteredFeats, FilterUI: FeatFilters } = useFeatFilter(feats.items);
    const { filteredItems: filteredTools, FilterUI: ToolFilters } = useItemFilter(tools.items, ['工匠工具', '其他工具']);
    const { filteredItems: filteredGears, FilterUI: GearFilters } = useItemFilter(gears.items, ['冒险道具', '容器', '弹药', '套组', '坐骑', '载具', '奥术法器', '德鲁伊法器', '圣徽']);
    const { filteredItems: filteredMagicItems, FilterUI: MagicFilters } = useMagicItemFilter(magicItems.items);
    const { filteredItems: filteredWeapons, FilterUI: WeaponFilters } = useFieldFilter(weapons.items as ItemItem[], '武器类别', (item: any) => item.weaponCategory);
    const { filteredItems: filteredArmors, FilterUI: ArmorFilters } = useFieldFilter(armors.items as ItemItem[], '护甲类别', (item: any) => { const raw = String(item.armorCategory || '').split(/[（(]/)[0]; return ({ '轻甲': '轻型护甲', '中甲': '中型护甲', '重甲': '重型护甲' } as Record<string, string>)[raw] || raw; });
    const { filteredItems: filteredSubclasses, FilterUI: SubclassFilters } = useFieldFilter(subclasses.items as SubclassItem[], '所属职业', (item: any) => item.parentClass);
    const { filteredItems: filteredOptional, FilterUI: OptionalFilters } = useMultiFieldFilter(optionalFeatures.items as any[], '原始选项类别', (item: any) => item.optionTypeLabels?.length ? item.optionTypeLabels : item.optionCategory);
    const { filteredItems: filteredOptionalClasses, FilterUI: OptionalClassFilters } = useMultiFieldFilter(filteredOptional as any[], '关联职业', (item: any) => item.associatedClasses);
    const { filteredItems: filteredCharOptions, FilterUI: CharOptionFilters } = useMultiFieldFilter(charOptions.items as any[], '原始选项类别', (item: any) => item.charOptionTypeLabels?.length ? item.charOptionTypeLabels : item.charOptionCategory);
    const { filteredItems: filteredRewards, FilterUI: RewardFilters } = useFieldFilter(rewards.items as any[], '奖励类别', (item: any) => item.rewardType);
    const { filteredItems: filteredPsionics, FilterUI: PsionicFilters } = useFieldFilter(psionics.items as any[], '灵能类型', (item: any) => item.psionicType);
    const { filteredItems: filteredPsionicOrders, FilterUI: PsionicOrderFilters } = useFieldFilter(filteredPsionics as any[], '学派／体系', (item: any) => item.psionicOrder);
    const filtered: Record<string, {
        items: any[];
        tools?: React.ReactNode;
    }> = {
        classes: { items: classes.items }, species: { items: species.items }, backgrounds: { items: backgrounds.items },
        subclasses: { items: filteredSubclasses, tools: SubclassFilters }, spells: { items: filteredSpells, tools: SpellFilters },
        feats: { items: filteredFeats, tools: FeatFilters }, weapons: { items: filteredWeapons, tools: WeaponFilters },
        armors: { items: filteredArmors, tools: ArmorFilters }, tools: { items: filteredTools, tools: ToolFilters },
        gears: { items: filteredGears, tools: GearFilters }, magicItems: { items: filteredMagicItems, tools: MagicFilters },
        optionalFeatures: { items: filteredOptionalClasses, tools: <>{OptionalFilters}{OptionalClassFilters}</> },
        charOptions: { items: filteredCharOptions, tools: CharOptionFilters }, rewards: { items: filteredRewards, tools: RewardFilters },
        psionics: { items: filteredPsionicOrders, tools: <>{PsionicFilters}{PsionicOrderFilters}</> },
    };
    const handler = library[currentType.kind], list = filtered[currentType.kind];
    const updateResource = (item: any) => {
        const exists = [...handler.items, ...handler.userItems].some(existing => existing.id === item.id);
        if (exists)
            handler.onUpdate(item);
        else
            handler.onAdd(item);
    };
    return <section className="resource-catalog w-full h-full min-w-0 overflow-y-auto bg-stone-100 text-stone-900" aria-label="资源总库">
  <>
   <LibraryManager toolbar={<LibraryNavigation categories={RESOURCE_TYPES.map(type => ({ id: type.id, label: type.label, count: catalog[type.kind].allItems.length }))} current={currentType.id} onCategory={chooseContent} sources={sourceNames.map(source => ({ id: source, label: sourceLabel(currentItems.find(item => characterSourceKey(item) === source) || { source }), count: currentItems.filter(item => characterSourceKey(item) === source).length, group: source.startsWith('SRD') ? '内置SRD' : source === '用户自定义' ? '自订资料' : '出版物与资料包' }))} selectedSources={selectedSources} onSources={setSelectedSources} filters={list.tools}/>} key={currentType.kind} kind={currentType.kind} title={currentType.label + '库'} itemLabel={currentType.label} items={list.items} onUpdate={updateResource} onImport={handler.onImport}/>
  </>
 </section>;
};


