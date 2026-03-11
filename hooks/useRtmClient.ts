import { useState, useEffect, useRef, useCallback } from 'react';
import { RTMClient } from 'agora-rtm-sdk';
import { AgoraRtmService, packMessage, unpackMessage } from '../utils/agoraRtm';
import { RoomMessage, DiceRollPayload, ImageSharePayload } from '../types/room';
import { CharacterData } from '../types';

export const useRtmClient = () => {
    const [isConnected, setIsConnected] = useState(false);
    const [roomId, setRoomId] = useState<string | null>(null);
    const [roomState, setRoomState] = useState({
        status: 'DISCONNECTED' // DISCONNECTED, CONNECTING, WAITING_APPROVAL, CONNECTED, REJECTED
    });
    const [error, setError] = useState<string | null>(null);

    // Remote state from GM
    const [remoteCharacter, setRemoteCharacter] = useState<CharacterData | null>(null);
    const [playerList, setPlayerList] = useState<any[]>([]);
    const [diceHistory, setDiceHistory] = useState<DiceRollPayload[]>([]);
    const [sharedImages, setSharedImages] = useState<ImageSharePayload[]>([]);

    const rtmServiceRef = useRef<AgoraRtmService | null>(null);
    const clientRef = useRef<RTMClient | null>(null);
    const characterRef = useRef<CharacterData | null>(null);

    const handleDisconnect = useCallback((reason?: string) => {
        setIsConnected(false);
        setRoomState({ status: 'DISCONNECTED' });
        if (reason) setError(reason);
        setRoomId(null);
        rtmServiceRef.current?.logout();
        rtmServiceRef.current = null;
        clientRef.current = null;
    }, []);


    const handleMessage = useCallback((event: any) => {
        const msg = unpackMessage<RoomMessage>(event.message);
        if (!msg) return;

        switch (msg.type) {
            case 'JOIN_ACCEPTED':
                setIsConnected(true);
                setRoomState({ status: 'CONNECTED' });
                setRoomId(msg.payload.roomId);
                setRemoteCharacter(characterRef.current);
                break;
            case 'JOIN_REJECTED':
                setRoomState({ status: 'REJECTED' });
                setError(msg.payload.reason || 'Join rejected by GM');
                handleDisconnect();
                break;
            case 'PLAYER_LIST':
                setPlayerList(msg.payload);
                break;
            case 'CHARACTER_UPDATE':
                setRemoteCharacter(msg.payload.character);
                break;
            case 'DICE_ROLL':
                setDiceHistory(prev => [msg.payload as DiceRollPayload, ...prev].slice(0, 50));
                break;
            case 'IMAGE_SHARE':
                setSharedImages(prev => [msg.payload as ImageSharePayload, ...prev].slice(0, 10));
                break;
            case 'ROOM_CLOSED':
                handleDisconnect('房间已由主持人关闭或你已被踢出。');
                break;
        }
    }, [handleDisconnect]);

    const connectToRoom = useCallback(async (targetRoomId: string, character: CharacterData) => {
        setRoomState({ status: 'CONNECTING' });
        setError(null);
        characterRef.current = character;

        const myId = `player-${Math.floor(Math.random() * 10000).toString()}`;

        try {
            const service = new AgoraRtmService(myId);
            const client = await service.login();
            rtmServiceRef.current = service;
            clientRef.current = client;

            // Subscribe to room channel and own ID
            await client.subscribe(targetRoomId);
            await client.subscribe(myId);

            client.addEventListener('message', handleMessage);

            setRoomState({ status: 'WAITING_APPROVAL' });

            // Send join request to "host" (simulated via room channel or naming convention)
            // Convention: The host is subcribed to the channel, we blast a request or target the host if ID known.
            // In our current host hook, host listens to roomId channel for requests.
            const joinMsg: RoomMessage = {
                type: 'JOIN_REQUEST',
                senderId: myId,
                senderName: character.name || 'Unknown Player',
                timestamp: Date.now(),
                payload: { character }
            };

            await client.publish(targetRoomId, packMessage(joinMsg));
        } catch (err: any) {
            setError(`连接失败: ${err.message}`);
            setRoomState({ status: 'DISCONNECTED' });
        }
    }, [handleMessage]);

    const disconnect = useCallback(() => {
        if (clientRef.current && roomId) {
            const leftMsg: RoomMessage = {
                type: 'PLAYER_LEFT',
                senderId: rtmServiceRef.current?.getUserId() || 'unknown',
                senderName: characterRef.current?.name || 'Player',
                timestamp: Date.now(),
                payload: {}
            };
            clientRef.current.publish(roomId, packMessage(leftMsg));
        }
        handleDisconnect();
    }, [roomId, handleDisconnect]);

    const rollDice = useCallback((payload: DiceRollPayload) => {
        if (clientRef.current && roomId) {
            const msg: RoomMessage = {
                type: 'DICE_ROLL',
                senderId: rtmServiceRef.current?.getUserId() || 'unknown',
                senderName: characterRef.current?.name || 'Player',
                timestamp: Date.now(),
                payload
            };
            clientRef.current.publish(roomId, packMessage(msg));
        }
    }, [roomId]);

    useEffect(() => {
        return () => {
            if (rtmServiceRef.current) {
                rtmServiceRef.current.logout();
            }
        };
    }, []);

    return {
        isConnected,
        roomId,
        roomState,
        error,
        remoteCharacter,
        playerList,
        diceHistory,
        sharedImages,
        connectToRoom,
        disconnect,
        rollDice
    };
};
