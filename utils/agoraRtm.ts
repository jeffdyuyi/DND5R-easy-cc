import AgoraRTM, { RTMClient, RTMConfig } from 'agora-rtm-sdk';

const APP_ID = '37ed98d2fe3741deac2a967a1a0754d3';

export class AgoraRtmService {
    private client: RTMClient | null = null;
    private userId: string;

    constructor(userId: string) {
        this.userId = userId;
    }

    async login(): Promise<RTMClient> {
        if (this.client) return this.client;

        const config: RTMConfig = {
            encryptionMode: 'NONE',
            presenceTimeout: 300,
            logUpload: false,
            logLevel: 'error'
        };

        try {
            this.client = new AgoraRTM.RTM(APP_ID, this.userId, config);
            const response = await this.client.login({ token: '' });
            console.log('Agora RTM Login Successful:', response);
            return this.client;
        } catch (error) {
            console.error('Agora RTM Login Failed:', error);
            throw error;
        }
    }

    async logout() {
        if (this.client) {
            await this.client.logout();
            this.client = null;
        }
    }

    getClient() {
        return this.client;
    }

    getUserId() {
        return this.userId;
    }
}

/**
 * 辅助函数：将对象序列化为 RTM 消息
 */
export const packMessage = (obj: any): string => {
    return JSON.stringify(obj);
};

/**
 * 辅助函数：将 RTM 消息解析为对象
 */
export const unpackMessage = <T>(msg: string): T | null => {
    try {
        return JSON.parse(msg) as T;
    } catch (e) {
        console.error('Failed to parse RTM message:', e);
        return null;
    }
};
