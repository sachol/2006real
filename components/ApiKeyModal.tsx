import React, { useState, useEffect } from 'react';
import { validateApiKey, initializeGenAI } from '../services/geminiService';

interface ApiKeyModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, onClose, onSuccess }) => {
    const [inputKey, setInputKey] = useState('');
    const [status, setStatus] = useState<'idle' | 'checking' | 'valid' | 'invalid'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (isOpen) {
            const storedKey = localStorage.getItem('gemini_api_key');
            if (storedKey) setInputKey(storedKey);
            setStatus('idle');
            setErrorMessage('');
        }
    }, [isOpen]);

    const handleSave = async () => {
        if (!inputKey.trim()) {
            setErrorMessage('API Key를 입력해주세요.');
            return;
        }

        setStatus('checking');
        setErrorMessage('');

        const isValid = await validateApiKey(inputKey.trim());

        if (isValid) {
            setStatus('valid');
            localStorage.setItem('gemini_api_key', inputKey.trim());
            initializeGenAI(inputKey.trim());
            
            // Give user a moment to see the success state
            setTimeout(() => {
                onSuccess();
                onClose();
            }, 1000);
        } else {
            setStatus('invalid');
            setErrorMessage('유효하지 않은 API Key입니다. 다시 확인해주세요.');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white w-full max-w-md mx-4 rounded-2xl shadow-2xl overflow-hidden border border-slate-100">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-black text-slate-900 flex items-center">
                            <span className="text-xl mr-2">🔑</span> API Key 설정
                        </h3>
                        <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    
                    <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                        AI 기능을 사용하려면 Google Gemini API 키가 필요합니다. <br />
                        <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="text-blue-600 font-bold hover:underline">
                            Google AI Studio
                        </a>에서 무료로 발급받을 수 있습니다.
                    </p>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-600 mb-1.5 ml-1">API KEY</label>
                            <input 
                                type="password" 
                                value={inputKey}
                                onChange={(e) => setInputKey(e.target.value)}
                                placeholder="AIza..." 
                                className={`w-full p-3.5 bg-slate-50 border rounded-xl text-sm font-mono outline-none transition-all focus:ring-2 
                                    ${status === 'invalid' ? 'border-red-300 focus:ring-red-200' : 'border-slate-200 focus:ring-blue-200 focus:border-blue-400'}
                                `}
                            />
                            {status === 'invalid' && (
                                <p className="text-xs text-red-500 mt-2 font-medium flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {errorMessage}
                                </p>
                            )}
                             {status === 'valid' && (
                                <p className="text-xs text-green-600 mt-2 font-bold flex items-center animate-pulse">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    인증 성공! 설정이 완료되었습니다.
                                </p>
                            )}
                        </div>

                        <button 
                            onClick={handleSave}
                            disabled={status === 'checking' || status === 'valid'}
                            className={`w-full py-3.5 rounded-xl font-bold text-sm shadow-lg transition-all flex items-center justify-center
                                ${status === 'valid' 
                                    ? 'bg-green-500 text-white shadow-green-200' 
                                    : 'bg-slate-800 hover:bg-slate-900 text-white shadow-slate-200 disabled:bg-slate-400'
                                }
                            `}
                        >
                            {status === 'checking' ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    키 확인 중...
                                </>
                            ) : status === 'valid' ? (
                                '완료'
                            ) : (
                                '등록 및 테스트'
                            )}
                        </button>
                    </div>
                </div>
                <div className="bg-slate-50 p-4 text-center border-t border-slate-100">
                    <p className="text-xs text-slate-400">
                        입력된 키는 브라우저에만 저장되며 서버로 전송되지 않습니다.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ApiKeyModal;