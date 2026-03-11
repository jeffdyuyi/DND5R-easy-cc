import { useState, useEffect, useCallback } from 'react';
import Peer, { DataConnection } from 'peerjs';
import { RoomMessage, DiceRollPayload, ImageSharePayload } from '../types/room';
import { CharacterData } from '../types';

export const usePeerClient = () => {
    const [peer, setPeer] = useState<Peer | null>(null);
    const [connection, setConnection] = useState<DataConnection | null>(null);
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

    const handleDisconnect = useCallback((reason?: string) => {
        setIsConnected(false);
        setRoomState({ status: 'DISCONNECTED' });
        if (reason) setError(reason);
        setRoomId(null);
        setConnection(null);
        setPeer(currentPeer => {
            if (currentPeer) currentPeer.destroy();
            return null;
        });
    }, []);

    const connectToRoom = useCallback((targetRoomId: string, character: CharacterData) => {
        setPeer(currentPeer => {
            if (currentPeer) currentPeer.destroy();
            return null;
        });

        setRoomState({ status: 'CONNECTING' });
        setError(null);

        const newPeer = new Peer({
            debug: 1,
            config: {
                iceServers: [
                    { urls: 'stun:stun.l.google.com:19302' }, // 谷歌备用
                    { urls: 'stun:stun.qq.com:3478' },       // 腾讯
                    { urls: 'stun:stun.miwifi.com:3478' },   // 小米
                    { urls: 'stun:stun.cdn.he.net:3478' },   // HE
                    { urls: 'stun:stun.xten.com' }
                ]
            }
        });

        newPeer.on('open', (id) => {
            setPeer(newPeer);

            const conn = newPeer.connect(targetRoomId, {
                reliable: true
            });

            conn.on('open', () => {
                setConnection(conn);
                setRoomState({ status: 'WAITING_APPROVAL' });

                // Send join request immediately
                const msg: RoomMessage = {
                    type: 'JOIN_REQUEST',
                    senderId: id,
                    senderName: character.name || 'Unknown Player',
                    timestamp: Date.now(),
                    payload: { character }
                };
                conn.send(msg);
            });

            conn.on('data', (data: any) => {
                const msg = data as RoomMessage;
                if (!msg || !msg.type) return;

                switch (msg.type) {
                    case 'JOIN_ACCEPTED':
                        setIsConnected(true);
                        setRoomState({ status: 'CONNECTED' });
                        setRoomId(targetRoomId);
                        setRemoteCharacter(character); // Initialize
                        break;
                    case 'JOIN_REJECTED':
                        setRoomState({ status: 'REJECTED' });
                        setError(msg.payload.reason || 'Join rejected by GM');
                        conn.close();
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
                    default:
                        console.log('Unknown message from GM:', msg.type);
                }
            });

            conn.on('close', () => {
                handleDisconnect('连接已断开');
            });

            conn.on('error', (err) => {
                setError(`Connection error: ${err.message}`);
                handleDisconnect('发生了连接错误');
            });
        });

        newPeer.on('error', (err) => {
            setError(`Peer error: ${err.message}`);
            setRoomState({ status: 'DISCONNECTED' });
        });

    }, [handleDisconnect]);

    const disconnect = useCallback(() => {
        if (connection && connection.open) {
            const msg: RoomMessage = {
                type: 'PLAYER_LEFT',
                senderId: peer?.id || 'unknown',
                senderName: remoteCharacter?.name || 'Player',
                timestamp: Date.now(),
                payload: {}
            };
            connection.send(msg);
            setTimeout(() => {
                connection.close();
            }, 500);
        }
        handleDisconnect();
    }, [connection, peer, remoteCharacter]);

    const rollDice = useCallback((payload: DiceRollPayload) => {
        if (connection && connection.open) {
            const msg: RoomMessage = {
                type: 'DICE_ROLL',
                senderId: peer?.id || 'unknown',
                senderName: remoteCharacter?.name || 'Player',
                timestamp: Date.now(),
                payload
            };
            connection.send(msg);
            // Notice: don't add to local history here, wait for GM broadcast
        }
    }, [connection, peer, remoteCharacter]);

    useEffect(() => {
        return () => {
            if (peer) {
                peer.destroy();
            }
        };
    }, [peer]);

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
