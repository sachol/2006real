export enum MessageRole {
    USER = 'user',
    MODEL = 'model'
}

export interface ChatMessage {
    role: MessageRole;
    text: string;
    isError?: boolean;
}

export enum UserStatus {
    NO_HOME = '무주택자 (전월세 거주)',
    ONE_HOME = '1주택자 (갈아타기 희망)',
    MULTI_HOME = '다주택자 (투자/증여 고민)'
}

export interface StrategyRequest {
    status: UserStatus;
    target: string;
}

export const INITIAL_CHAT_MESSAGE: ChatMessage = {
    role: MessageRole.MODEL,
    text: '안녕하세요! 2026년 부동산 시장에 대해 궁금한 점이 있으신가요? 예: "왜 2026년에 공급 절벽인가요?"'
};