import { useState, useEffect, useRef, useCallback } from 'react';
import { MqttService, topics, packMessage, unpackMessage } from '../utils/mqttService';
import { RoomMessage, DiceRollPayload, ImageSharePayload } from '../types/room';
import { CharacterData } from '../types';

export const useMqttClient = () => {
    const [isConnected, setIsConnected] = useState(false);
    const [roomId, setRoomId] = useState<string | null>(null);
    const [roomState, setRoomState] = useState({
        status: 'DISCONNECTED', // DISCONNECTED, CONNECTING, WAITING_APPROVAL, CONNECTED, REJECTED
        reason: '' // To pass the disconnect reason
    });
    const [error, setError] = useState<string | null>(null);

    const [remoteCharacter, setRemoteCharacter] = useState<CharacterData | null>(null);
    const [playerList, setPlayerList] = useState<any[]>([]);
    const [diceHistory, setDiceHistory] = useState<DiceRollPayload[]>([]);
    const [sharedImages, setSharedImages] = useState<ImageSharePayload[]>([]);

    const mqttRef = useRef<MqttService | null>(null);
    const characterRef = useRef<CharacterData | null>(null);
    const roomIdRef = useRef<string | null>(null);
    const myIdRef = useRef<string>('');

    useEffect(() => { roomIdRef.current = roomId; }, [roomId]);

    const handleDisconnect = useCallback((reason?: string) => {
        setIsConnected(false);
        setRoomState({ status: 'DISCONNECTED', reason: reason || '' });
        if (reason) setError(reason);
        setRoomId(null);

        const currentMqtt = mqttRef.current;
        if (currentMqtt) {
            // Delay disconnect to ensure any pending publishes are flushed
            setTimeout(() => {
                currentMqtt.disconnect();
            }, 300);
        }
        mqttRef.current = null;
    }, []);

    const handleMessage = useCallback((topic: string, payload: string) => {
        const msg = unpackMessage<RoomMessage>(payload);
        if (!msg) return;
        // Ignore own messages (when we publish to broadcast)
        if (msg.senderId === myIdRef.current) return;

        console.log('[MQTT Client] Received:', topic, msg.type);

        switch (msg.type) {
            case 'JOIN_ACCEPTED':
                setIsConnected(true);
                setRoomState({ status: 'CONNECTED', reason: '' });
                setRemoteCharacter(characterRef.current);
                break;
            case 'JOIN_REJECTED':
                setRoomState({ status: 'REJECTED', reason: msg.payload.reason });
                setError(msg.payload.reason || '主持人拒绝了加入请求');
                handleDisconnect(msg.payload.reason);
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
                handleDisconnect('房间已由主持人解散。');
                break;
        }
    }, [handleDisconnect]);

    const handleMessageRef = useRef(handleMessage);
    useEffect(() => { handleMessageRef.current = handleMessage; }, [handleMessage]);

    const connectToRoom = useCallback(async (targetRoomId: string, character: CharacterData) => {
        setRoomState({ status: 'CONNECTING', reason: '' });
        setError(null);
        characterRef.current = character;

        const myId = `player-${Date.now().toString(36)}`;
        myIdRef.current = myId;

        try {
            const service = new MqttService(myId);
            await service.connect();

            mqttRef.current = service;
            setRoomId(targetRoomId);

            // Subscribe to broadcast (room-wide messages) and own private topic
            service.subscribe(topics.broadcast(targetRoomId));
            service.subscribe(topics.player(targetRoomId, myId));

            const handler = (topic: string, payload: string) => handleMessageRef.current(topic, payload);
            service.onMessage(handler);

            setRoomState({ status: 'WAITING_APPROVAL', reason: '' });

            // Send join request to host topic
            const joinMsg: RoomMessage = {
                type: 'JOIN_REQUEST',
                senderId: myId,
                senderName: character.name || 'Unknown Player',
                timestamp: Date.now(),
                payload: { character }
            };
            service.publish(topics.host(targetRoomId), packMessage(joinMsg));

            console.log(`[MQTT Client] Join request sent to room ${targetRoomId}`);
        } catch (err: any) {
            setError(`连接失败: ${err.message || '无法连接到消息服务器'}`);
            setRoomState({ status: 'DISCONNECTED', reason: err.message });
        }
    }, []);

    const disconnect = useCallback(() => {
        const rid = roomIdRef.current;
        if (mqttRef.current && rid) {
            const leftMsg: RoomMessage = {
                type: 'PLAYER_LEFT',
                senderId: myIdRef.current,
                senderName: characterRef.current?.name || 'Player',
                timestamp: Date.now(),
                payload: {}
            };
            mqttRef.current.publish(topics.host(rid), packMessage(leftMsg));
        }
        // Proceed to disconnect, relying on handleDisconnect's timeout to flush the PLAYER_LEFT message
        handleDisconnect();
    }, [handleDisconnect]);

    const rollDice = useCallback((payload: DiceRollPayload) => {
        const rid = roomIdRef.current;
        if (mqttRef.current && rid) {
            const msg: RoomMessage = {
                type: 'DICE_ROLL',
                senderId: myIdRef.current,
                senderName: characterRef.current?.name || 'Player',
                timestamp: Date.now(),
                payload
            };
            mqttRef.current.publish(topics.broadcast(rid), packMessage(msg));
        }
    }, []);

    useEffect(() => {
        return () => {
            mqttRef.current?.disconnect();
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
