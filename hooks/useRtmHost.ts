import { useState, useEffect, useRef, useCallback } from 'react';
import { RTMClient } from 'agora-rtm-sdk';
import { AgoraRtmService, packMessage, unpackMessage } from '../utils/agoraRtm';
import { RoomMessage, RoomMessageType, DiceRollPayload } from '../types/room';
import { CharacterData } from '../types';

export interface ConnectedPlayer {
    peerId: string; // Used as RTM User ID
    playerName: string;
    character: CharacterData;
}

export const useRtmHost = () => {
    const [roomId, setRoomId] = useState<string | null>(null);
    const [pendingPlayers, setPendingPlayers] = useState<ConnectedPlayer[]>([]);
    const [connectedPlayers, setConnectedPlayers] = useState<ConnectedPlayer[]>([]);
    const [diceHistory, setDiceHistory] = useState<DiceRollPayload[]>([]);
    const [error, setError] = useState<string | null>(null);

    const rtmServiceRef = useRef<AgoraRtmService | null>(null);
    const clientRef = useRef<RTMClient | null>(null);

    const broadcast = useCallback(async (type: RoomMessageType, payload: any) => {
        if (!clientRef.current || !roomId) return;

        const message: RoomMessage = {
            type,
            senderId: 'HOST',
            senderName: '通用GM',
            timestamp: Date.now(),
            payload
        };

        try {
            await clientRef.current.publish(roomId, packMessage(message));
        } catch (err) {
            console.error('Broadcast failed:', err);
        }
    }, [roomId]);

    const sendTo = useCallback(async (peerId: string, type: RoomMessageType, payload: any) => {
        if (!clientRef.current) return;

        const message: RoomMessage = {
            type,
            senderId: 'HOST',
            senderName: '通用GM',
            timestamp: Date.now(),
            payload
        };

        try {
            await clientRef.current.publish(peerId, packMessage(message));
        } catch (err) {
            console.error(`Send to ${peerId} failed:`, err);
        }
    }, []);

    const handlePlayerLeft = useCallback((peerId: string) => {
        setPendingPlayers(prev => prev.filter(p => p.peerId !== peerId));
        setConnectedPlayers(current => {
            const newList = current.filter(p => p.peerId !== peerId);
            const listPayload = newList.map(p => ({
                peerId: p.peerId,
                name: p.playerName,
                characterName: p.character.name,
                class: p.character.className,
                level: p.character.level,
                avatarDataUrl: p.character.avatarDataUrl
            }));
            broadcast('PLAYER_LIST', listPayload);
            return newList;
        });
    }, [broadcast]);

    const handleMessageInternal = useCallback((event: any) => {
        console.log('RTM Host Received Message:', event);
        const msg = unpackMessage<RoomMessage>(event.message);
        if (!msg) return;

        switch (msg.type) {
            case 'JOIN_REQUEST':
                const char = msg.payload.character;
                setPendingPlayers(prev => {
                    const filtered = prev.filter(p => p.peerId !== msg.senderId);
                    return [...filtered, {
                        peerId: msg.senderId,
                        playerName: char.name || 'Unknown',
                        character: char
                    }];
                });
                break;
            case 'PLAYER_LEFT':
                handlePlayerLeft(msg.senderId);
                break;
            case 'DICE_ROLL':
                setDiceHistory(prev => [msg.payload as DiceRollPayload, ...prev].slice(0, 50));
                broadcast('DICE_ROLL', msg.payload);
                break;
        }
    }, [handlePlayerLeft, broadcast]);

    // Use ref to always have latest handleMessage in the event listener
    const handleMessageRef = useRef(handleMessageInternal);
    useEffect(() => {
        handleMessageRef.current = handleMessageInternal;
    }, [handleMessageInternal]);

    const createRoom = useCallback(async (customId?: string) => {
        setError(null);
        const hostId = `host-${Math.floor(Math.random() * 10000).toString()}`;
        const newRoomId = customId || `dnd5r-${Math.floor(Math.random() * 100000).toString().padStart(5, '0')}`;

        try {
            const service = new AgoraRtmService(hostId);
            const client = await service.login();

            console.log(`RTM Host Login as ${hostId}, subscribing to ${newRoomId}`);

            // Subscribe to room channel for messages from players
            await client.subscribe(newRoomId);
            // Also subscribe to own ID for private messages (like join requests)
            await client.subscribe(hostId);

            setRoomId(newRoomId);
        } catch (err: any) {
            setError(`创建房间失败: ${err.message}`);
        }
    }, []);

    const acceptPlayer = useCallback((peerId: string) => {
        let acceptedPlayer: ConnectedPlayer | undefined;
        setPendingPlayers(prev => {
            acceptedPlayer = prev.find(p => p.peerId === peerId);
            return prev.filter(p => p.peerId !== peerId);
        });

        if (!acceptedPlayer) return;

        setConnectedPlayers(curr => {
            const nextList = [...curr, acceptedPlayer!];
            sendTo(peerId, 'JOIN_ACCEPTED', { roomId });

            const listPayload = nextList.map(p => ({
                peerId: p.peerId,
                name: p.playerName,
                characterName: p.character.name,
                class: p.character.className,
                level: p.character.level,
                avatarDataUrl: p.character.avatarDataUrl
            }));

            broadcast('PLAYER_LIST', listPayload);
            return nextList;
        });
    }, [roomId, sendTo, broadcast]);

    const rejectPlayer = useCallback((peerId: string) => {
        sendTo(peerId, 'JOIN_REJECTED', { reason: '主持人拒绝了您的加入请求。' });
        setPendingPlayers(prev => prev.filter(p => p.peerId !== peerId));
    }, [sendTo]);

    const updatePlayerCharacter = useCallback((peerId: string, updatedCharacter: CharacterData) => {
        setConnectedPlayers(prev => prev.map(p => {
            if (p.peerId === peerId) {
                return { ...p, character: updatedCharacter };
            }
            return p;
        }));
        sendTo(peerId, 'CHARACTER_UPDATE', { character: updatedCharacter });
    }, [sendTo]);

    const kickPlayer = useCallback((peerId: string) => {
        sendTo(peerId, 'ROOM_CLOSED', { reason: '你已被移出房间。' });
        handlePlayerLeft(peerId);
    }, [sendTo, handlePlayerLeft]);

    const closeRoom = useCallback(async () => {
        if (clientRef.current && roomId) {
            await broadcast('ROOM_CLOSED', { reason: '房间已关闭' });
            await clientRef.current.unsubscribe(roomId);
            await rtmServiceRef.current?.logout();
        }
        setRoomId(null);
        setConnectedPlayers([]);
        setPendingPlayers([]);
    }, [roomId, broadcast]);

    useEffect(() => {
        const client = clientRef.current;
        if (!client) return;

        const listener = (event: any) => handleMessageRef.current(event);
        client.addEventListener('message', listener);

        return () => {
            client.removeEventListener('message', listener);
        };
    }, [roomId]); // Re-bind when roomId changes

    useEffect(() => {
        return () => {
            if (rtmServiceRef.current) {
                rtmServiceRef.current.logout();
            }
        };
    }, []);

    return {
        roomId,
        error,
        pendingPlayers,
        connectedPlayers,
        diceHistory,
        createRoom,
        closeRoom,
        acceptPlayer,
        rejectPlayer,
        kickPlayer,
        updatePlayerCharacter,
        broadcast,
        handleDiceRoll: (payload: DiceRollPayload) => {
            setDiceHistory(prev => [payload, ...prev].slice(0, 50));
            broadcast('DICE_ROLL', payload);
        }
    };
};
