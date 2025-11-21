import React, { useState, useRef, useEffect } from 'react';
import { MessageRole, ChatMessage, UserStatus, INITIAL_CHAT_MESSAGE } from '../types';
import { generateRealEstateStrategy, sendRealEstateChatMessage } from '../services/geminiService';

const TypingIndicator = () => (
    <div className="flex space-x-1 p-2">
        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
    </div>
);

const AiAdvisor: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'strategy' | 'chat'>('strategy');
    
    // Strategy State
    const [userStatus, setUserStatus] = useState<UserStatus>(UserStatus.NO_HOME);
    const [userTarget, setUserTarget] = useState('');
    const [strategyResult, setStrategyResult] = useState<string | null>(null);
    const [isStrategyLoading, setIsStrategyLoading] = useState(false);

    // Chat State
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([INITIAL_CHAT_MESSAGE]);
    const [chatInput, setChatInput] = useState('');
    const [isChatLoading, setIsChatLoading] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);

    // Scroll to bottom of chat
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatHistory, isChatLoading, activeTab]);

    const handleStrategyGenerate = async () => {
        if (!userTarget.trim()) {
            alert("관심 지역이나 예산/상황을 입력해주세요.");
            return;
        }
        setIsStrategyLoading(true);
        setStrategyResult(null);
        try {
            const result = await generateRealEstateStrategy({ status: userStatus, target: userTarget });
            setStrategyResult(result);
        } catch (error) {
            setStrategyResult("오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
        } finally {
            setIsStrategyLoading(false);
        }
    };

    const handleSendMessage = async () => {
        if (!chatInput.trim() || isChatLoading) return;

        const newMessage: ChatMessage = { role: MessageRole.USER, text: chatInput };
        setChatHistory(prev => [...prev, newMessage]);
        setChatInput('');
        setIsChatLoading(true);

        try {
            // Convert history to simple string array for context
            const historyContext = chatHistory.map(msg => `${msg.role === MessageRole.USER ? 'User' : 'AI'}: ${msg.text}`);
            const responseText = await sendRealEstateChatMessage(historyContext, newMessage.text);
            
            setChatHistory(prev => [...prev, { role: MessageRole.MODEL, text: responseText }]);
        } catch (error) {
            setChatHistory(prev => [...prev, { role: MessageRole.MODEL, text: "죄송합니다. 일시적인 오류가 발생했습니다.", isError: true }]);
        } finally {
            setIsChatLoading(false);
        }
    };

    const formatMarkdown = (text: string) => {
        // Simple replacement for bolding **text** to <b>text</b> for display
        const parts = text.split(/(\*\*.*?\*\*)/g);
        return parts.map((part, index) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={index} className="text-blue-900 font-bold">{part.slice(2, -2)}</strong>;
            }
            return part;
        });
    };

    return (
        <section className="bg-gradient-to-br from-indigo-50 to-blue-50 p-1 rounded-3xl shadow-lg border border-blue-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-blue-200 rounded-full opacity-20 blur-3xl pointer-events-none"></div>
            
            <div className="bg-white rounded-[20px] p-6 md:p-8 relative z-10">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl md:text-2xl font-black text-slate-900 flex items-center">
                        <span className="mr-2 text-2xl">✨</span> AI 부동산 어드바이저
                    </h3>
                    <span className="text-xs font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                        Powered by Gemini 2.5
                    </span>
                </div>

                {/* Tabs */}
                <div className="flex space-x-1 bg-slate-100 p-1 rounded-xl mb-6">
                    <button 
                        onClick={() => setActiveTab('strategy')}
                        className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all duration-200 ${activeTab === 'strategy' ? 'bg-white shadow text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        🎯 맞춤형 전략
                    </button>
                    <button 
                        onClick={() => setActiveTab('chat')}
                        className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all duration-200 ${activeTab === 'chat' ? 'bg-white shadow text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        💬 무엇이든 물어보세요
                    </button>
                </div>

                {/* Strategy Tab Content */}
                {activeTab === 'strategy' && (
                    <div className="space-y-4 animate-fadeIn">
                        <p className="text-sm text-slate-500 mb-4">
                            나의 상황을 입력하면 2026년 시장 전망에 기반한 구체적인 대응 전략을 AI가 분석해 드립니다.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 mb-1">현재 주택 보유</label>
                                <select 
                                    value={userStatus}
                                    onChange={(e) => setUserStatus(e.target.value as UserStatus)}
                                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
                                >
                                    {Object.values(UserStatus).map(status => (
                                        <option key={status} value={status}>{status}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 mb-1">관심 지역/자금</label>
                                <input 
                                    type="text" 
                                    value={userTarget}
                                    onChange={(e) => setUserTarget(e.target.value)}
                                    placeholder="예: 서울 마포구 / 5억 원" 
                                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
                                />
                            </div>
                        </div>
                        <button 
                            onClick={handleStrategyGenerate}
                            disabled={isStrategyLoading}
                            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-200 transition-all flex items-center justify-center group"
                        >
                            {isStrategyLoading ? (
                                <TypingIndicator />
                            ) : (
                                <>
                                    <span className="mr-2 group-hover:animate-pulse">✨</span> AI 전략 생성하기
                                </>
                            )}
                        </button>
                        
                        {strategyResult && (
                            <div className="mt-6 p-6 bg-slate-50 rounded-xl border border-slate-200 text-sm leading-relaxed whitespace-pre-line animate-fade-in-up">
                                <h4 className="font-bold text-blue-600 mb-3">📊 AI 분석 결과</h4>
                                {formatMarkdown(strategyResult)}
                            </div>
                        )}
                    </div>
                )}

                {/* Chat Tab Content */}
                {activeTab === 'chat' && (
                    <div className="flex flex-col h-[450px] animate-fadeIn">
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 rounded-xl border border-slate-100 mb-4 custom-scrollbar">
                            {chatHistory.map((msg, idx) => (
                                <div key={idx} className={`flex ${msg.role === MessageRole.USER ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`
                                        max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm
                                        ${msg.role === MessageRole.USER 
                                            ? 'bg-slate-800 text-white rounded-br-none' 
                                            : 'bg-white border border-slate-100 text-slate-700 rounded-bl-none'}
                                        ${msg.isError ? 'border-red-200 bg-red-50 text-red-600' : ''}
                                    `}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            {isChatLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-white border border-slate-100 p-3 rounded-2xl rounded-bl-none shadow-sm">
                                        <TypingIndicator />
                                    </div>
                                </div>
                            )}
                            <div ref={chatEndRef} />
                        </div>
                        <div className="flex space-x-2">
                            <input 
                                type="text" 
                                value={chatInput}
                                onChange={(e) => setChatInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                placeholder="궁금한 점을 입력하세요..." 
                                className="flex-1 p-3.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
                            />
                            <button 
                                onClick={handleSendMessage}
                                disabled={isChatLoading || !chatInput.trim()}
                                className="bg-slate-800 hover:bg-slate-900 disabled:bg-slate-400 text-white px-5 rounded-xl transition-colors shadow-lg shadow-slate-200"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default AiAdvisor;