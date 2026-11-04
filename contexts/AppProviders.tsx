import { FavoritesProvider } from './FavoritesContext';
import React from 'react';
import { LibraryProvider } from './LibraryContext';
import { CharacterProvider } from './CharacterContext';
export const AppProviders: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => {
    return (<LibraryProvider>
            <FavoritesProvider><CharacterProvider>
                {children}
            </CharacterProvider></FavoritesProvider>
        </LibraryProvider>);
};
