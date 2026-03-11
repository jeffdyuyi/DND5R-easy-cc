import { useState, useEffect, useRef, useCallback } from 'react';
import { MqttService, topics, packMessage, unpackMessage } from '../utils/mqttService';
import { RoomMessage, RoomMessageType, DiceRollPayload } from '../types/room';
import { CharacterData } from '../types';

export interface ConnectedPlayer {
    peerId: string;
    playerName: string;
    character: CharacterData;
}

export const useMqttHost = () => {
    const [roomId, setRoomId] = useState<string | null>(null);
    const [pendingPlayers, setPendingPlayers] = useState<ConnectedPlayer[]>([]);
    const [connectedPlayers, setConnectedPlayers] = useState<ConnectedPlayer[]>([]);
    const [diceHistory, setDiceHistory] = useState<DiceRollPayload[]>([]);
    const [error, setError] = useState<string | null>(null);

    const mqttRef = useRef<MqttService | null>(null);
    const roomIdRef = useRef<string | null>(null);

    // Keep roomIdRef in sync
    useEffect(() => { roomIdRef.current = roomId; }, [roomId]);

    const publishBroadcast = useCallback((msg: RoomMessage) => {
        const rid = roomIdRef.current;
        if (!mqttRef.current || !rid) return;
        mqttRef.current.publish(topics.broadcast(rid), packMessage(msg));
    }, []);

    const broadcast = useCallback((type: RoomMessageType, payload: any) => {
        publishBroadcast({
            type,
            senderId: 'HOST',
            senderName: '通用GM',
            timestamp: Date.now(),
            payload
        });
    }, [publishBroadcast]);

    const sendTo = useCallback((playerId: string, type: RoomMessageType, payload: any) => {
        const rid = roomIdRef.current;
        if (!mqttRef.current || !rid) return;
        const message: RoomMessage = {
            type,
            senderId: 'HOST',
            senderName: '通用GM',
            timestamp: Date.now(),
            payload
        };
        mqttRef.current.publish(topics.player(rid, playerId), packMessage(message));
    }, []);

    const handlePlayerLeft = useCallback((playerId: string) => {
        setPendingPlayers(prev => prev.filter(p => p.peerId !== playerId));
        setConnectedPlayers(current => {
            const newList = current.filter(p => p.peerId !== playerId);
            return newList;
        });
    }, []);

    // Broadcast updated player list whenever connectedPlayers changes
    const connectedPlayersRef = useRef<ConnectedPlayer[]>([]);
    useEffect(() => {
        connectedPlayersRef.current = connectedPlayers;
        if (roomIdRef.current && mqttRef.current && connectedPlayers.length >= 0) {
            const listPayload = connectedPlayers.map(p => ({
                peerId: p.peerId,
                name: p.playerName,
                characterName: p.character.name,
                class: p.character.className,
                level: p.character.level,
                avatarDataUrl: p.character.avatarDataUrl
            }));
            broadcast('PLAYER_LIST', listPayload);
        }
    }, [connectedPlayers, broadcast]);

    const handleMessage = useCallback((topic: string, payload: string) => {
        const msg = unpackMessage<RoomMessage>(payload);
        if (!msg || msg.senderId === 'HOST') return; // Ignore own messages

        console.log('[MQTT Host] Received:', topic, msg.type);

        switch (msg.type) {
            case 'JOIN_REQUEST': {
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
            }
            case 'PLAYER_LEFT':
                handlePlayerLeft(msg.senderId);
                break;
            case 'DICE_ROLL':
                setDiceHistory(prev => [msg.payload as DiceRollPayload, ...prev].slice(0, 50));
                broadcast('DICE_ROLL', msg.payload);
                break;
        }
    }, [handlePlayerLeft, broadcast]);

    const handleMessageRef = useRef(handleMessage);
    useEffect(() => { handleMessageRef.current = handleMessage; }, [handleMessage]);

    const createRoom = useCallback(async (customId?: string) => {
        setError(null);
        const hostId = `host-${Date.now().toString(36)}`;
        const newRoomId = customId || `dnd-${Math.floor(Math.random() * 100000).toString().padStart(5, '0')}`;

        try {
            const service = new MqttService(hostId);
            await service.connect();

            mqttRef.current = service;

            // Subscribe to host-specific topic (for join requests) and broadcast (for dice rolls from players)
            service.subscribe(topics.host(newRoomId));
            service.subscribe(topics.broadcast(newRoomId));

            // Set up message handler using ref pattern
            const handler = (topic: string, payload: string) => handleMessageRef.current(topic, payload);
            service.onMessage(handler);

            setRoomId(newRoomId);
            console.log(`[MQTT Host] Room created: ${newRoomId}`);
        } catch (err: any) {
            setError(`创建房间失败: ${err.message || '无法连接到消息服务器'}`);
        }
    }, []);

    const acceptPlayer = useCallback((playerId: string) => {
        let acceptedPlayer: ConnectedPlayer | undefined;
        setPendingPlayers(prev => {
            acceptedPlayer = prev.find(p => p.peerId === playerId);
            return prev.filter(p => p.peerId !== playerId);
        });

        if (!acceptedPlayer) return;

        const rid = roomIdRef.current;
        sendTo(playerId, 'JOIN_ACCEPTED', { roomId: rid });

        setConnectedPlayers(curr => [...curr, acceptedPlayer!]);
    }, [sendTo]);

    const rejectPlayer = useCallback((playerId: string) => {
        sendTo(playerId, 'JOIN_REJECTED', { reason: '主持人拒绝了您的加入请求。' });
        setPendingPlayers(prev => prev.filter(p => p.peerId !== playerId));
    }, [sendTo]);

    const updatePlayerCharacter = useCallback((playerId: string, updatedCharacter: CharacterData) => {
        setConnectedPlayers(prev => prev.map(p =>
            p.peerId === playerId ? { ...p, character: updatedCharacter } : p
        ));
        sendTo(playerId, 'CHARACTER_UPDATE', { character: updatedCharacter });
    }, [sendTo]);

    const kickPlayer = useCallback((playerId: string) => {
        sendTo(playerId, 'ROOM_CLOSED', { reason: '你已被移出房间。' });
        handlePlayerLeft(playerId);
    }, [sendTo, handlePlayerLeft]);

    const closeRoom = useCallback(() => {
        if (mqttRef.current && roomIdRef.current) {
            broadcast('ROOM_CLOSED', { reason: '房间已关闭' });
            // Small delay to ensure message is sent before disconnecting
            setTimeout(() => {
                mqttRef.current?.disconnect();
                mqttRef.current = null;
            }, 300);
        }
        setRoomId(null);
        setConnectedPlayers([]);
        setPendingPlayers([]);
        setDiceHistory([]);
    }, [broadcast]);

    useEffect(() => {
        return () => {
            mqttRef.current?.disconnect();
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
