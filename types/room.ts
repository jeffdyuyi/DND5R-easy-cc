import { CharacterData } from '../types';

/** 消息类型枚举 */
export type RoomMessageType =
    | 'JOIN_REQUEST'       // 玩家 → GM: 请求加入 + 角色卡数据
    | 'JOIN_ACCEPTED'      // GM → 玩家: 接受加入
    | 'JOIN_REJECTED'      // GM → 玩家: 拒绝加入
    | 'PLAYER_LIST'        // GM → 全体: 当前玩家列表快照
    | 'CHARACTER_UPDATE'   // GM → 玩家: GM 修改角色卡后推送
    | 'DICE_ROLL'          // 双向: 掷骰结果广播
    | 'IMAGE_SHARE'        // GM → 全体: 共享图片(Base64)
    | 'PLAYER_LEFT'        // 玩家 → GM: 离开通知
    | 'ROOM_CLOSED';       // GM → 全体: 房间关闭通知

/** 消息信封 */
export interface RoomMessage {
    type: RoomMessageType;
    senderId: string;       // 发送者 RTM User ID
    senderName: string;     // 显示名称
    timestamp: number;
    payload: any;           // 具体数据，根据 type 不同而不同
}

/** 掷骰详细节点 */
export interface ParseNode {
    type: 'dice' | 'constant';
    diceType?: string; // e.g., 'd6'
    count?: number;    // e.g., 2
    value?: number;    // resolved value for constant or sum
    results?: number[]; // individual die rolls, e.g. [3, 4]
    sign: '+' | '-';
}

/** 掷骰请求/结果 payload */
export interface DiceRollPayload {
    formula: string;        // e.g. "2d6+1d4+3"
    nodes: ParseNode[];     // detailed breakdown
    total: number;          // grand total
    rollerName: string;     // who rolled this
}

/** 图片共享 payload */
export interface ImageSharePayload {
    imageDataUrl: string;   // Base64 图片
    caption?: string;       // 可选标题
}

/** 加入房间请求 payload */
export interface JoinRequestPayload {
    character: CharacterData;  // 完整角色卡数据(含头像)
}
