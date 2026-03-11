import React, { createContext, useContext } from 'react';
import { useLibraryManager, LibraryHandler } from '../hooks/useLibraryManager';
import { ClassItem, SubclassItem, SpeciesItem, BackgroundItem, SpellItem, FeatItem, ItemItem } from '../types';
import {
    CLASS_DB, SUBCLASS_DB, SPECIES_DB, BACKGROUND_DB, SPELL_DB, FEAT_DB,
    WEAPON_DB, ARMOR_DB, TOOL_DB, GEAR_DB, MAGIC_ITEM_DB
} from '../data';

interface LibraryContextType {
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

    // Aggregated valid options
    allTools: ItemItem[];
}

const LibraryContext = createContext<LibraryContextType | null>(null);

export const LibraryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const classes = useLibraryManager('dnd_lib_classes', CLASS_DB);
    const subclasses = useLibraryManager('dnd_lib_subclasses', SUBCLASS_DB);
    const species = useLibraryManager('dnd_lib_species', SPECIES_DB);
    const backgrounds = useLibraryManager('dnd_lib_backgrounds', BACKGROUND_DB);
    const spells = useLibraryManager('dnd_lib_spells', SPELL_DB);
    const feats = useLibraryManager('dnd_lib_feats', FEAT_DB);

    const weapons = useLibraryManager('dnd_lib_items_weapons', WEAPON_DB);
    const armors = useLibraryManager('dnd_lib_items_armor', ARMOR_DB);
    const tools = useLibraryManager('dnd_lib_items_tools', TOOL_DB);
    const gears = useLibraryManager('dnd_lib_items_gear', GEAR_DB);
    const magicItems = useLibraryManager('dnd_lib_items_magic', MAGIC_ITEM_DB);

    // Derived aggregations
    const allTools = [...tools.items, ...weapons.items, ...armors.items, ...gears.items, ...magicItems.items];

    const value = {
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
        magicItems,
        allTools
    };

    return (
        <LibraryContext.Provider value={value}>
            {children}
        </LibraryContext.Provider>
    );
};

export const useLibrary = () => {
    const context = useContext(LibraryContext);
    if (!context) {
        throw new Error('useLibrary must be used within a LibraryProvider');
    }
    return context;
};
