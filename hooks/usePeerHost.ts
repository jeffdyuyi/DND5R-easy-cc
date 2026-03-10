import { useState, useEffect, useRef, useCallback } from 'react';
import Peer, { DataConnection } from 'peerjs';
import { RoomMessage, RoomMessageType, DiceRollPayload } from '../types/room';
import { CharacterData } from '../types';

export interface PendingPlayer {
    peerId: string;
    playerName: string;
    character: CharacterData;
    connection: DataConnection;
}

export interface ConnectedPlayer {
    peerId: string;
    playerName: string;
    character: CharacterData;
    connection: DataConnection;
}

export const usePeerHost = () => {
    const [peer, setPeer] = useState<Peer | null>(null);
    const [roomId, setRoomId] = useState<string | null>(null);
    const [pendingPlayers, setPendingPlayers] = useState<PendingPlayer[]>([]);
    const [connectedPlayers, setConnectedPlayers] = useState<ConnectedPlayer[]>([]);
    const [diceHistory, setDiceHistory] = useState<DiceRollPayload[]>([]);
    const [error, setError] = useState<string | null>(null);

    const connectionsRef = useRef<Map<string, DataConnection>>(new Map());

    const broadcast = useCallback((type: RoomMessageType, payload: any) => {
        const message: RoomMessage = {
            type,
            senderId: 'HOST',
            senderName: '通用GM', // later can be customized
            timestamp: Date.now(),
            payload
        };

        connectedPlayers.forEach(p => {
            if (p.connection.open) {
                p.connection.send(message);
            }
        });
    }, [connectedPlayers]);

    const sendTo = useCallback((peerId: string, type: RoomMessageType, payload: any) => {
        const conn = connectionsRef.current.get(peerId);
        if (conn && conn.open) {
            const message: RoomMessage = {
                type,
                senderId: 'HOST',
                senderName: '通用GM',
                timestamp: Date.now(),
                payload
            };
            conn.send(message);
        }
    }, []);

    const createRoom = useCallback((customId?: string) => {
        if (peer) {
            peer.destroy();
        }

        const newRoomId = customId || `dnd5r-${Math.floor(Math.random() * 100000).toString().padStart(5, '0')}`;
        const newPeer = new Peer(newRoomId, {
            debug: 2
        });

        newPeer.on('open', (id) => {
            setRoomId(id);
            setPeer(newPeer);
            setError(null);
        });

        newPeer.on('error', (err) => {
            setError(err.message);
            console.error('Peer error:', err);
        });

        newPeer.on('connection', (conn) => {
            conn.on('data', (data: any) => {
                const msg = data as RoomMessage;
                if (!msg || !msg.type) return;

                switch (msg.type) {
                    case 'JOIN_REQUEST':
                        handleJoinRequest(conn, msg.payload as { character: CharacterData });
                        break;
                    case 'PLAYER_LEFT':
                        handlePlayerLeft(conn.peer);
                        break;
                    case 'DICE_ROLL':
                        handleDiceRoll(msg.payload as DiceRollPayload);
                        break;
                    default:
                        console.log('Received unknown message type:', msg.type);
                }
            });

            conn.on('close', () => {
                handlePlayerLeft(conn.peer);
            });

            conn.on('error', (err) => {
                console.error(`Connection error with ${conn.peer}:`, err);
                handlePlayerLeft(conn.peer);
            });
        });
    }, [peer]);

    const handleJoinRequest = (conn: DataConnection, payload: { character: CharacterData }) => {
        const char = payload.character;
        setPendingPlayers(prev => {
            // Remove existing request from same peer if any
            const filtered = prev.filter(p => p.peerId !== conn.peer);
            return [...filtered, {
                peerId: conn.peer,
                playerName: char.name || 'Unknown',
                character: char,
                connection: conn
            }];
        });
        connectionsRef.current.set(conn.peer, conn);
    };

    const handlePlayerLeft = (peerId: string) => {
        setPendingPlayers(prev => prev.filter(p => p.peerId !== peerId));
        setConnectedPlayers(prev => prev.filter(p => p.peerId !== peerId));
        connectionsRef.current.delete(peerId);

        // Broadcast updated player list
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

            const message: RoomMessage = {
                type: 'PLAYER_LIST',
                senderId: 'HOST',
                senderName: 'GM',
                timestamp: Date.now(),
                payload: listPayload
            };

            newList.forEach(p => {
                if (p.connection.open) p.connection.send(message);
            });
            return newList;
        });
    };

    const acceptPlayer = useCallback((peerId: string) => {
        setPendingPlayers(prev => {
            const player = prev.find(p => p.peerId === peerId);
            if (player) {
                setConnectedPlayers(curr => [...curr, player]);
                sendTo(peerId, 'JOIN_ACCEPTED', { roomId });

                // Need to defer PLAYER_LIST broadcast until state updates
                setTimeout(() => {
                    broadcastPlayerList([...connectedPlayers, player]);
                }, 100);
            }
            return prev.filter(p => p.peerId !== peerId);
        });
    }, [roomId, sendTo, connectedPlayers]);

    const rejectPlayer = useCallback((peerId: string) => {
        sendTo(peerId, 'JOIN_REJECTED', { reason: '主持人拒绝了您的加入请求。' });
        setTimeout(() => {
            const conn = connectionsRef.current.get(peerId);
            if (conn) conn.close();
            connectionsRef.current.delete(peerId);
        }, 500);

        setPendingPlayers(prev => prev.filter(p => p.peerId !== peerId));
    }, [sendTo]);

    const broadcastPlayerList = useCallback((players: ConnectedPlayer[]) => {
        const payload = players.map(p => ({
            peerId: p.peerId,
            name: p.playerName,
            characterName: p.character.name,
            class: p.character.className,
            level: p.character.level,
            avatarDataUrl: p.character.avatarDataUrl
        }));

        const message: RoomMessage = {
            type: 'PLAYER_LIST',
            senderId: 'HOST',
            senderName: 'GM',
            timestamp: Date.now(),
            payload
        };

        players.forEach(p => {
            if (p.connection.open) p.connection.send(message);
        });
    }, []);

    const updatePlayerCharacter = useCallback((peerId: string, updatedCharacter: CharacterData) => {
        setConnectedPlayers(prev => prev.map(p => {
            if (p.peerId === peerId) {
                return { ...p, character: updatedCharacter };
            }
            return p;
        }));
        sendTo(peerId, 'CHARACTER_UPDATE', { character: updatedCharacter });
    }, [sendTo]);

    const handleDiceRoll = useCallback((payload: DiceRollPayload) => {
        setDiceHistory(prev => [payload, ...prev].slice(0, 50));
        broadcast('DICE_ROLL', payload);
    }, [broadcast]);

    const kickPlayer = useCallback((peerId: string) => {
        sendTo(peerId, 'ROOM_CLOSED', { reason: '你已被移出房间。' });
        setTimeout(() => {
            const conn = connectionsRef.current.get(peerId);
            if (conn) conn.close();
            handlePlayerLeft(peerId);
        }, 500);
    }, [sendTo]);

    const closeRoom = useCallback(() => {
        broadcast('ROOM_CLOSED', { reason: '房间已关闭' });
        setTimeout(() => {
            if (peer) {
                peer.destroy();
            }
            setPeer(null);
            setRoomId(null);
            setConnectedPlayers([]);
            setPendingPlayers([]);
            connectionsRef.current.clear();
        }, 500);
    }, [peer, broadcast]);

    useEffect(() => {
        return () => {
            if (peer) {
                peer.destroy();
            }
        };
    }, [peer]);

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
        handleDiceRoll // For GM's own dice rolls
    };
};
