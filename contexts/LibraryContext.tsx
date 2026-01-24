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
    const classes = useLibraryManager(CLASS_DB);
    const subclasses = useLibraryManager(SUBCLASS_DB);
    const species = useLibraryManager(SPECIES_DB);
    const backgrounds = useLibraryManager(BACKGROUND_DB);
    const spells = useLibraryManager(SPELL_DB);
    const feats = useLibraryManager(FEAT_DB);

    const weapons = useLibraryManager(WEAPON_DB);
    const armors = useLibraryManager(ARMOR_DB);
    const tools = useLibraryManager(TOOL_DB);
    const gears = useLibraryManager(GEAR_DB);
    const magicItems = useLibraryManager(MAGIC_ITEM_DB);

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
