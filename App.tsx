import React, { useState, useEffect } from 'react';
import SupplyChart from './components/SupplyChart';
import AiAdvisor from './components/AiAdvisor';
import ApiKeyModal from './components/ApiKeyModal';
import IntroGuide from './components/IntroGuide';
import { initializeGenAI } from './services/geminiService';

const App: React.FC = () => {
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(false);

  useEffect(() => {
    // Check for existing key on mount
    const storedKey = localStorage.getItem('gemini_api_key') || process.env.API_KEY;
    if (storedKey) {
      initializeGenAI(storedKey);
      setHasApiKey(true);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-20 relative selection:bg-blue-100 selection:text-blue-900">
      
      <ApiKeyModal 
        isOpen={isKeyModalOpen} 
        onClose={() => setIsKeyModalOpen(false)}
        onSuccess={() => setHasApiKey(true)}
      />

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex flex-col">
                <span className="text-[10px] font-extrabold text-blue-600 tracking-[0.2em] uppercase mb-1">Market Insight</span>
                <div className="flex items-center gap-3">
                    <h1 className="text-lg md:text-2xl font-black text-slate-900 tracking-tight">2026 부동산 전망 보고서</h1>
                    <div className="hidden md:inline-flex items-center px-2 py-0.5 rounded bg-white border border-slate-200 shadow-[0_2px_0_rgb(203,213,225)] text-[10px] font-black text-slate-500 tracking-wide uppercase transform hover:-translate-y-0.5 transition-transform cursor-default select-none">
                        개발자: RSA AI Lab.
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <button 
                    onClick={() => setIsKeyModalOpen(true)}
                    className={`
                        flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 shadow-sm
                        ${hasApiKey 
                            ? 'bg-white text-blue-600 border border-blue-100 hover:border-blue-300 hover:shadow-md' 
                            : 'bg-slate-900 text-white hover:bg-slate-800 hover:scale-105 hover:shadow-lg ring-2 ring-offset-2 ring-slate-900 ring-offset-slate-50'
                        }
                    `}
                >
                    <span className="text-base">🔑</span>
                    {hasApiKey ? 'API 설정됨' : 'API 키 등록 필요'}
                </button>
                <div className="hidden sm:block text-right border-l border-slate-200 pl-4">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Base Date</p>
                    <p className="text-sm font-black text-slate-700">2025.11</p>
                </div>
            </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10 space-y-12">

        {/* Hero Section */}
        <section className="text-center space-y-6 py-4 md:py-8 animate-fade-in-up">
            <div className="inline-block relative group">
                <div className="absolute inset-0 bg-red-100 rounded-full blur-md opacity-50 group-hover:opacity-70 transition-opacity"></div>
                <span className="relative px-4 py-1.5 rounded-full bg-white border border-red-100 text-red-600 text-xs font-extrabold tracking-wide shadow-sm">
                    🚨 핵심 키워드
                </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black leading-tight tracking-tight text-slate-900">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">공급 절벽</span>의 습격,<br />
                <span className="text-slate-800">초양극화</span>의 시작
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed font-medium">
                2026년은 지난 수년 간의 착공 감소가 입주 급감으로 현실화되는 '보릿고개'입니다. 
                서울 핵심지와 그 외 지역의 격차는 역사상 가장 크게 벌어질 것입니다.
            </p>
        </section>

        {/* Guide Section */}
        <IntroGuide />

        {/* AI Advisor Component */}
        <div className="animate-fade-in-up delay-200">
            <AiAdvisor />
        </div>

        {/* Metrics Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up delay-300">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:-translate-y-1 hover:shadow-md transition-all duration-300 group">
                <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-red-50 rounded-xl group-hover:bg-red-100 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                        </svg>
                    </div>
                    <span className="text-[11px] font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-lg uppercase tracking-wide">Supply Crisis</span>
                </div>
                <h3 className="text-slate-500 text-sm font-bold mb-1">2026 서울 아파트 입주</h3>
                <p className="text-3xl font-black text-slate-900 tracking-tight">7,145<span className="text-sm font-bold text-slate-400 ml-1">가구</span></p>
                <p className="text-xs text-slate-400 mt-3 font-medium">평년 대비 <span className="text-red-500 font-bold bg-red-50 px-1 rounded">-71% 급감</span></p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:-translate-y-1 hover:shadow-md transition-all duration-300 group">
                <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-blue-50 rounded-xl group-hover:bg-blue-100 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                    </div>
                    <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg uppercase tracking-wide">Price Rise</span>
                </div>
                <h3 className="text-slate-500 text-sm font-bold mb-1">전세 가격 전망</h3>
                <p className="text-3xl font-black text-slate-900 tracking-tight">+4.0<span className="text-sm font-bold text-slate-400 ml-1">%</span></p>
                <p className="text-xs text-slate-400 mt-3 font-medium">매물 부족으로 인한 <span className="text-slate-600 font-bold bg-slate-100 px-1 rounded">강세 지속</span></p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:-translate-y-1 hover:shadow-md transition-all duration-300 group">
                <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-purple-50 rounded-xl group-hover:bg-purple-100 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <span className="text-[11px] font-bold text-purple-600 bg-purple-50 px-2.5 py-1 rounded-lg uppercase tracking-wide">Stabilization</span>
                </div>
                <h3 className="text-slate-500 text-sm font-bold mb-1">기준 금리 전망</h3>
                <p className="text-3xl font-black text-slate-900 tracking-tight">2.25<span className="text-sm font-bold text-slate-400 ml-1">%</span></p>
                <p className="text-xs text-slate-400 mt-3 font-medium">하향 안정화, <span className="text-slate-600 font-bold bg-slate-100 px-1 rounded">DSR 유지</span></p>
            </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in-up delay-400">
            {/* Supply Chart Section */}
            <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col h-full">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-lg font-bold flex items-center text-slate-900">
                        <span className="w-1.5 h-5 bg-red-500 rounded-full mr-3"></span>
                        서울 아파트 입주 물량 추이
                    </h3>
                    <span className="text-[10px] font-bold text-white bg-red-500 px-2 py-1 rounded-full animate-pulse">공급 절벽 경보</span>
                </div>
                <div className="flex-grow flex items-center justify-center min-h-[250px]">
                    <SupplyChart />
                </div>
                <p className="text-[11px] text-slate-400 text-right mt-4 font-medium">*자료: 부동산R114 등 민간 통계 재구성</p>
            </section>

            {/* Regional Outlook Table */}
            <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 h-full">
                <h3 className="text-lg font-bold mb-6 flex items-center text-slate-900">
                    <span className="w-1.5 h-5 bg-purple-600 rounded-full mr-3"></span>
                    지역별 시장 기상도
                </h3>
                <div className="overflow-hidden rounded-2xl border border-slate-100">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50/50 text-slate-400 uppercase tracking-wider text-[10px]">
                            <tr>
                                <th className="px-5 py-3 font-extrabold">권역</th>
                                <th className="px-5 py-3 font-extrabold">분위기</th>
                                <th className="px-5 py-3 font-extrabold hidden sm:table-cell">전망 키워드</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-slate-50">
                            <tr className="group hover:bg-slate-50 transition-colors">
                                <td className="px-5 py-4 font-bold text-slate-900 group-hover:text-blue-600">서울 (핵심지)</td>
                                <td className="px-5 py-4">
                                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-red-100 text-red-700">
                                        🔥 Hot
                                    </span>
                                </td>
                                <td className="px-5 py-4 text-slate-600 hidden sm:table-cell text-xs font-medium">신고가 경신, 쏠림 심화</td>
                            </tr>
                            <tr className="group hover:bg-slate-50 transition-colors">
                                <td className="px-5 py-4 font-bold text-slate-900 group-hover:text-blue-600">경기 (수도권)</td>
                                <td className="px-5 py-4">
                                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-orange-100 text-orange-700">
                                        ☀️ Warm
                                    </span>
                                </td>
                                <td className="px-5 py-4 text-slate-600 hidden sm:table-cell text-xs font-medium">GTX 호재, 전세 수요 유입</td>
                            </tr>
                            <tr className="group hover:bg-slate-50 transition-colors">
                                <td className="px-5 py-4 font-bold text-slate-900 group-hover:text-blue-600">지방 광역시</td>
                                <td className="px-5 py-4">
                                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700">
                                        ☁️ Cool
                                    </span>
                                </td>
                                <td className="px-5 py-4 text-slate-600 hidden sm:table-cell text-xs font-medium">미분양 해소, 입지 차별화</td>
                            </tr>
                            <tr className="group hover:bg-slate-50 transition-colors">
                                <td className="px-5 py-4 font-bold text-slate-900 group-hover:text-blue-600">지방 중소도시</td>
                                <td className="px-5 py-4">
                                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600">
                                        🌧️ Cold
                                    </span>
                                </td>
                                <td className="px-5 py-4 text-slate-600 hidden sm:table-cell text-xs font-medium">인구 감소, 장기 침체 우려</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </div>

        {/* Strategies Grid */}
        <section className="animate-fade-in-up delay-500">
            <h3 className="text-lg font-bold mb-6 flex items-center text-slate-900">
                <span className="w-1.5 h-5 bg-green-500 rounded-full mr-3"></span>
                유형별 2026 필수 대응 전략
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-8 rounded-3xl border border-slate-200 hover:border-blue-400 hover:shadow-xl transition duration-300 group cursor-default">
                    <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 group-hover:bg-blue-100 transition-all duration-300">🏠</div>
                    <h4 className="text-lg font-bold text-slate-900 mb-3">무주택 실수요</h4>
                    <p className="text-sm text-slate-500 mb-6 leading-relaxed">분양가 상승으로 청약 매력도가 낮아지고 있습니다. 전세가율이 오르는 준신축 급매물을 적극 공략하세요.</p>
                    <div className="text-blue-700 text-[11px] font-bold bg-blue-50 inline-block px-3 py-2 rounded-lg">💡 추천: 서울 외곽/경기 핵심지</div>
                </div>
                
                <div className="bg-white p-8 rounded-3xl border border-slate-200 hover:border-purple-400 hover:shadow-xl transition duration-300 group cursor-default">
                    <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 group-hover:bg-purple-100 transition-all duration-300">🔄</div>
                    <h4 className="text-lg font-bold text-slate-900 mb-3">1주택 갈아타기</h4>
                    <p className="text-sm text-slate-500 mb-6 leading-relaxed">양극화는 상급지 이동의 기회입니다. 보유 주택 매도보다 매수 타이밍을 우선적으로 고려하세요.</p>
                    <div className="text-purple-700 text-[11px] font-bold bg-purple-50 inline-block px-3 py-2 rounded-lg">💡 추천: 상급지 선진입 전략</div>
                </div>
                
                <div className="bg-white p-8 rounded-3xl border border-slate-200 hover:border-green-400 hover:shadow-xl transition duration-300 group cursor-default">
                    <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 group-hover:bg-green-100 transition-all duration-300">🏗️</div>
                    <h4 className="text-lg font-bold text-slate-900 mb-3">투자자</h4>
                    <p className="text-sm text-slate-500 mb-6 leading-relaxed">공급 부족의 장기적 수혜는 '미래의 신축'에 있습니다. 사업시행인가 이후의 재개발/재건축을 주목하세요.</p>
                    <div className="text-green-700 text-[11px] font-bold bg-green-50 inline-block px-3 py-2 rounded-lg">💡 추천: 서울 주요 정비사업</div>
                </div>
            </div>
        </section>

        <footer className="pt-12 pb-6 border-t border-slate-200 text-center animate-fade-in-up delay-500">
            <p className="text-slate-400 text-xs leading-relaxed font-medium">
                * 본 리포트는 2025년 11월 기준의 시장 데이터와 전문가 전망을 종합하여 작성되었습니다.<br />
                투자의 책임은 투자자 본인에게 있음을 알려드립니다.
            </p>
        </footer>

      </main>
    </div>
  );
};

export default App;