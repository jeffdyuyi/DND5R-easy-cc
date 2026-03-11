import mqtt, { MqttClient } from 'mqtt';

const BROKER_URL = 'wss://broker.emqx.io:8084/mqtt';
const TOPIC_PREFIX = 'dnd5r/room';

export class MqttService {
    private client: MqttClient | null = null;
    private userId: string;
    private messageHandlers: ((topic: string, payload: string) => void)[] = [];

    constructor(userId: string) {
        this.userId = userId;
    }

    connect(): Promise<MqttClient> {
        return new Promise((resolve, reject) => {
            if (this.client?.connected) {
                resolve(this.client);
                return;
            }

            const client = mqtt.connect(BROKER_URL, {
                clientId: `dnd5r_${this.userId}_${Date.now()}`,
                clean: true,
                connectTimeout: 8000,
                reconnectPeriod: 3000,
                keepalive: 60,
            });

            client.on('connect', () => {
                console.log(`[MQTT] Connected as ${this.userId}`);
                this.client = client;
                resolve(client);
            });

            client.on('error', (err) => {
                console.error('[MQTT] Connection error:', err);
                reject(err);
            });

            client.on('message', (topic: string, message: Buffer) => {
                const payload = message.toString();
                this.messageHandlers.forEach(handler => handler(topic, payload));
            });

            client.on('reconnect', () => {
                console.log('[MQTT] Reconnecting...');
            });

            client.on('close', () => {
                console.log('[MQTT] Connection closed');
            });
        });
    }

    subscribe(topic: string): void {
        if (this.client?.connected) {
            this.client.subscribe(topic, { qos: 1 }, (err) => {
                if (err) console.error(`[MQTT] Subscribe error for ${topic}:`, err);
                else console.log(`[MQTT] Subscribed to ${topic}`);
            });
        }
    }

    unsubscribe(topic: string): void {
        if (this.client?.connected) {
            this.client.unsubscribe(topic);
        }
    }

    publish(topic: string, message: string): void {
        if (this.client?.connected) {
            this.client.publish(topic, message, { qos: 1 });
        }
    }

    onMessage(handler: (topic: string, payload: string) => void): void {
        this.messageHandlers.push(handler);
    }

    removeMessageHandler(handler: (topic: string, payload: string) => void): void {
        this.messageHandlers = this.messageHandlers.filter(h => h !== handler);
    }

    disconnect(): void {
        if (this.client) {
            this.client.end(true);
            this.client = null;
        }
        this.messageHandlers = [];
    }

    getUserId(): string {
        return this.userId;
    }

    isConnected(): boolean {
        return this.client?.connected ?? false;
    }
}

/** Topic helpers */
export const topics = {
    broadcast: (roomId: string) => `${TOPIC_PREFIX}/${roomId}/broadcast`,
    host: (roomId: string) => `${TOPIC_PREFIX}/${roomId}/host`,
    player: (roomId: string, playerId: string) => `${TOPIC_PREFIX}/${roomId}/p/${playerId}`,
};

/** Serialize object to JSON string */
export const packMessage = (obj: any): string => JSON.stringify(obj);

/** Parse JSON string to object */
export const unpackMessage = <T>(msg: string): T | null => {
    try {
        return JSON.parse(msg) as T;
    } catch (e) {
        console.error('[MQTT] Failed to parse message:', e);
        return null;
    }
};
