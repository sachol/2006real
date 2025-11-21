import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { StrategyRequest } from "../types";

// Manage the AI client instance dynamically
let aiClient: GoogleGenAI | null = null;

// Helper to initialize the client
export const initializeGenAI = (apiKey: string) => {
    aiClient = new GoogleGenAI({ apiKey });
};

// Helper to get the client or throw error if not initialized
const getClient = () => {
    if (!aiClient) {
        // Fallback to env if available (useful for dev), otherwise check localStorage
        const envKey = process.env.API_KEY;
        const storedKey = typeof window !== 'undefined' ? localStorage.getItem('gemini_api_key') : null;
        const keyToUse = envKey || storedKey;

        if (keyToUse) {
            initializeGenAI(keyToUse);
            if (aiClient) return aiClient;
        }
        throw new Error("API Key가 설정되지 않았습니다. 우측 상단의 설정 버튼을 통해 키를 등록해주세요.");
    }
    return aiClient;
};

export const validateApiKey = async (apiKey: string): Promise<boolean> => {
    try {
        // Create a temporary client to test the key
        const tempAi = new GoogleGenAI({ apiKey });
        // Try a minimal generation request
        await tempAi.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: 'Test',
        });
        return true;
    } catch (error) {
        console.error("API Key Validation Failed:", error);
        return false;
    }
};

export const generateRealEstateStrategy = async (request: StrategyRequest): Promise<string> => {
    const ai = getClient();

    const prompt = `
        당신은 대한민국 최고의 부동산 전문가입니다. 
        2026년 대한민국 부동산 시장의 핵심 키워드인 '공급 절벽(서울 입주물량 급감)'과 '지역별 초양극화'를 바탕으로 사용자에게 맞춤형 조언을 해주세요.
        
        [사용자 정보]
        - 현재 상태: ${request.status}
        - 관심 지역/자금: ${request.target}

        [요청사항]
        1. 사용자의 상황에 대한 냉철한 분석.
        2. 2026년 시장 전망(공급부족, 전세가 상승 등)과 연결된 구체적인 행동 가이드.
        3. 추천 전략 (매수/매도/관망 등)을 명확하게 제시.
        
        답변은 전문적이지만 친절하게, 요점을 명확히(Bullet point 활용) 작성해주세요. 한국어로 답변하세요.
    `;

    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text || "전략을 생성할 수 없습니다.";
    } catch (error) {
        console.error("Strategy generation error:", error);
        throw error;
    }
};

export const sendRealEstateChatMessage = async (history: string[], userMessage: string): Promise<string> => {
    const ai = getClient();

    const systemInstruction = `
        당신은 '2026년 부동산 시장 전망 리포트'의 AI 도우미입니다.
        이 리포트의 핵심 내용은 다음과 같습니다:
        1. 2026년은 '공급 절벽'이 현실화되는 해이며, 서울 아파트 입주 물량이 7,145가구(평년 대비 71% 감소)로 예상됨.
        2. 전세 가격은 매물 부족으로 인해 4% 이상 상승할 전망.
        3. 금리는 2.25% 내외로 하향 안정화되나 DSR 규제는 유지됨.
        4. 시장은 서울 핵심지(상승), 수도권(강보합), 지방(침체)로 극심하게 양극화될 것임.
        
        이 내용을 바탕으로 사용자의 질문에 한국어로 답변하세요. 답변은 3문장 내외로 간결하게 핵심만 전달하세요.
    `;

    try {
        const prompt = `${systemInstruction}\n\n이전 대화:\n${history.join('\n')}\n\n사용자 질문: ${userMessage}`;
        
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        return response.text || "답변을 생성할 수 없습니다.";
    } catch (error) {
        console.error("Chat error:", error);
        throw error;
    }
};