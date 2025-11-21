import React, { useState } from 'react';

const IntroGuide: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 border border-blue-100 shadow-lg shadow-blue-50/50 relative animate-fade-in-up delay-100">
      <button 
        onClick={() => setIsVisible(false)}
        className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-colors"
        aria-label="가이드 닫기"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
      
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="flex-1 space-y-4">
            <div className="flex items-center space-x-2">
                <span className="bg-blue-100 text-blue-600 p-2 rounded-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </span>
                <h3 className="text-lg font-black text-slate-900">앱 소개 및 사용 가이드</h3>
            </div>
            
            <p className="text-slate-600 text-sm leading-relaxed">
                본 서비스는 <strong>2026년 부동산 시장의 공급 절벽 시나리오</strong>를 데이터를 통해 시각화하고, 
                <strong>Google Gemini AI</strong>를 활용하여 공인중개사와 고객을 위한 1:1 맞춤 투자 전략을 제안하는 지능형 대시보드입니다.
            </p>
            
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                <h4 className="text-xs font-bold text-slate-500 uppercase mb-4 tracking-wider">How to Use</h4>
                <ul className="space-y-3 text-sm text-slate-700">
                    <li className="flex items-start">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold mr-3 mt-0.5 shadow-sm">1</span>
                        <span>
                            우측 상단 <span className="inline-flex items-center justify-center bg-slate-800 text-white text-[10px] px-1.5 py-0.5 rounded mx-1 font-bold">🔑 API 키 등록 필요</span> 버튼을 눌러 Gemini API 키를 등록하세요.
                        </span>
                    </li>
                    <li className="flex items-start">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold mr-3 mt-0.5 shadow-sm">2</span>
                        <span>
                            <strong>AI 부동산 어드바이저</strong> 섹션에서 고객의 주택 보유 현황과 관심 지역을 입력하고 맞춤 전략을 생성하세요.
                        </span>
                    </li>
                    <li className="flex items-start">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold mr-3 mt-0.5 shadow-sm">3</span>
                        <span>
                            복잡한 시장 전망이나 특정 지역 이슈는 <strong>'무엇이든 물어보세요'</strong> 탭을 통해 실시간으로 대화할 수 있습니다.
                        </span>
                    </li>
                </ul>
            </div>

            <div className="pt-2 text-right">
                <span className="inline-block text-[11px] font-extrabold text-slate-400 bg-slate-100 px-3 py-1.5 rounded-lg tracking-wide">
                    개발자: RSA AI Lab.
                </span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default IntroGuide;