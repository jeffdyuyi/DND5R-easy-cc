import React from 'react';
import { LibraryProvider } from './LibraryContext';
import { CharacterProvider } from './CharacterContext';
import { RoomProvider } from './RoomContext';

export const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <RoomProvider>
            <LibraryProvider>
                <CharacterProvider>
                    {children}
                </CharacterProvider>
            </LibraryProvider>
        </RoomProvider>
    );
};
