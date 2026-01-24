import React from 'react';
import { LibraryProvider } from './LibraryContext';
import { CharacterProvider } from './CharacterContext';

export const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <LibraryProvider>
            <CharacterProvider>
                {children}
            </CharacterProvider>
        </LibraryProvider>
    );
};
