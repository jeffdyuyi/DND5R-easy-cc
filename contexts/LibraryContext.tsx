import React, { createContext, useContext } from 'react';
import { useLibraryManager, LibraryHandler } from '../hooks/useLibraryManager';
import { ClassItem, SubclassItem, SpeciesItem, BackgroundItem, SpellItem, FeatItem, ItemItem } from '../types';
import { CHAR_OPTION_DB, REWARD_DB, PSIONIC_DB, OPTIONAL_FEATURE_DB, CLASS_DB, SUBCLASS_DB, SPECIES_DB, BACKGROUND_DB, SPELL_DB, FEAT_DB, WEAPON_DB, ARMOR_DB, TOOL_DB, GEAR_DB, MAGIC_ITEM_DB } from '../data';
interface LibraryContextType {
    charOptions: LibraryHandler<any>;
    rewards: LibraryHandler<any>;
    psionics: LibraryHandler<any>;
    optionalFeatures: LibraryHandler<any>;
    classes: LibraryHandler<ClassItem>;
    subclasses: LibraryHandler<SubclassItem>;
    species: LibraryHandler<SpeciesItem>;
    backgrounds: LibraryHandler<BackgroundItem>;
    spells: LibraryHandler<SpellItem>;
    feats: LibraryHandler<FeatItem>;
    weapons: LibraryHandler<ItemItem>;
    armors: LibraryHandler<ItemItem>;
    tools: LibraryHandler<ItemItem>;
    gears: LibraryHandler<ItemItem>;
    magicItems: LibraryHandler<ItemItem>;
}
const LibraryContext = createContext<LibraryContextType | null>(null);
export const LibraryProvider: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => {
    const classes = useLibraryManager<ClassItem>('dnd_lib_classes', CLASS_DB);
    const subclasses = useLibraryManager<SubclassItem>('dnd_lib_subclasses', SUBCLASS_DB);
    const species = useLibraryManager<SpeciesItem>('dnd_lib_species', SPECIES_DB);
    const backgrounds = useLibraryManager<BackgroundItem>('dnd_lib_backgrounds', BACKGROUND_DB);
    const spells = useLibraryManager<SpellItem>('dnd_lib_spells', SPELL_DB);
    const feats = useLibraryManager<FeatItem>('dnd_lib_feats', FEAT_DB);
    const charOptions = useLibraryManager<any>('dnd_lib_char_options', CHAR_OPTION_DB);
    const rewards = useLibraryManager<any>('dnd_lib_rewards', REWARD_DB);
    const psionics = useLibraryManager<any>('dnd_lib_psionics', PSIONIC_DB);
    const optionalFeatures = useLibraryManager<any>('dnd_lib_optional_features', OPTIONAL_FEATURE_DB);
    const weapons = useLibraryManager<ItemItem>('dnd_lib_items_weapons', WEAPON_DB);
    const armors = useLibraryManager<ItemItem>('dnd_lib_items_armor', ARMOR_DB);
    const tools = useLibraryManager<ItemItem>('dnd_lib_items_tools', TOOL_DB);
    const gears = useLibraryManager<ItemItem>('dnd_lib_items_gear', GEAR_DB);
    const magicItems = useLibraryManager<ItemItem>('dnd_lib_items_magic', MAGIC_ITEM_DB);
    const value = {
        charOptions, rewards, psionics,
        optionalFeatures,
        classes,
        subclasses,
        species,
        backgrounds,
        spells,
        feats,
        weapons,
        armors,
        tools,
        gears,
        magicItems
    };
    return (<LibraryContext.Provider value={value}>
            {children}
        </LibraryContext.Provider>);
};
export const useLibrary = () => {
    const context = useContext(LibraryContext);
    if (!context) {
        throw new Error('useLibrary must be used within a LibraryProvider');
    }
    return context;
};
