import React, { createContext, useContext, useState, ReactNode } from 'react';
import { usePeerHost, PendingPlayer, ConnectedPlayer } from '../hooks/usePeerHost';
import { usePeerClient } from '../hooks/usePeerClient';
import { CharacterData } from '../types';
import { RoomMessageType, DiceRollPayload, ImageSharePayload } from '../types/room';

interface RoomContextType {
    // Mode
    role: 'host' | 'client' | null;
    setRole: (role: 'host' | 'client' | null) => void;

    // Common
    roomId: string | null;
    error: string | null;
    diceHistory: DiceRollPayload[];

    // Host specifics
    hostPendingPlayers: PendingPlayer[];
    hostConnectedPlayers: ConnectedPlayer[];
    createRoom: (customId?: string) => void;
    closeRoom: () => void;
    acceptPlayer: (peerId: string) => void;
    rejectPlayer: (peerId: string) => void;
    kickPlayer: (peerId: string) => void;
    hostBroadcast: (type: RoomMessageType, payload: any) => void;
    hostUpdateCharacter: (peerId: string, char: CharacterData) => void;
    hostRollDice: (payload: DiceRollPayload) => void;

    // Client specifics
    clientState: { status: string };
    clientIsConnected: boolean;
    clientRemoteCharacter: CharacterData | null;
    clientPlayerList: any[];
    clientSharedImages: ImageSharePayload[];
    connectToRoom: (roomId: string, character: CharacterData) => void;
    disconnectFromRoom: () => void;
    clientRollDice: (payload: DiceRollPayload) => void;
}

const RoomContext = createContext<RoomContextType | undefined>(undefined);

export const RoomProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [role, setRole] = useState<'host' | 'client' | null>(null);

    const hostHook = usePeerHost();
    const clientHook = usePeerClient();

    // The shared states will come from whoever is active
    const roomId = role === 'host' ? hostHook.roomId : clientHook.roomId;
    const error = role === 'host' ? hostHook.error : clientHook.error;
    const diceHistory = role === 'host' ? hostHook.diceHistory : clientHook.diceHistory;

    const value: RoomContextType = {
        role,
        setRole,

        roomId,
        error,
        diceHistory,

        hostPendingPlayers: hostHook.pendingPlayers,
        hostConnectedPlayers: hostHook.connectedPlayers,
        createRoom: hostHook.createRoom,
        closeRoom: hostHook.closeRoom,
        acceptPlayer: hostHook.acceptPlayer,
        rejectPlayer: hostHook.rejectPlayer,
        kickPlayer: hostHook.kickPlayer,
        hostBroadcast: hostHook.broadcast,
        hostUpdateCharacter: hostHook.updatePlayerCharacter,
        hostRollDice: hostHook.handleDiceRoll,

        clientState: clientHook.roomState,
        clientIsConnected: clientHook.isConnected,
        clientRemoteCharacter: clientHook.remoteCharacter,
        clientPlayerList: clientHook.playerList,
        clientSharedImages: clientHook.sharedImages,
        connectToRoom: clientHook.connectToRoom,
        disconnectFromRoom: clientHook.disconnect,
        clientRollDice: clientHook.rollDice
    };

    return <RoomContext.Provider value={value}>{children}</RoomContext.Provider>;
};

export const useRoom = () => {
    const context = useContext(RoomContext);
    if (context === undefined) {
        throw new Error('useRoom must be used within a RoomProvider');
    }
    return context;
};
