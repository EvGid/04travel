import React, { useState } from 'react';
import { categorizeUserVibe } from '../services/geminiService';

const VibeSelector: React.FC = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ vibe: string, description: string } | null>(null);

  const handleAnalysis = async () => {
    if (!input.trim() || loading) return;
    setLoading(true);
    const data = await categorizeUserVibe(input);
    setResult(data);
    setLoading(false);
  };

  return (
    <section className="py-24 bg-white/40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="glass-card p-12 rounded-[3rem] w-full border-dashed border-2 border-[#A68B67]/30">
          <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-expressive mb-4 text-[#2C3531]">Манифест вашего Алтая</h3>
            <p className="text-[#2C3531]/60 mb-10 text-lg">
              Опишите ваше идеальное состояние. Не маршрут, а именно чувства.
              AI сопоставит ваш запрос с энергетикой локаций.
            </p>

            <div className="relative group mb-6 w-full">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Например: 'Хочу чувствовать масштаб гор, просыпаться в тумане и чтобы вокруг не было ни одного звука, кроме шума реки...'"
                className="w-full h-32 bg-white rounded-[2rem] p-8 pb-8 border border-[#A68B67]/20 outline-none focus:ring-4 focus:ring-[#A68B67]/10 transition-all text-[#2C3531] resize-none text-lg font-archival italic"
              />
            </div>
            <button
              onClick={handleAnalysis}
              disabled={loading}
              className={`px-10 py-4 bg-[#4A5D4E] text-white rounded-full font-bold shadow-xl hover:scale-105 transition-all disabled:opacity-50 ${loading ? 'animate-pulse' : ''}`}
            >
              {loading ? 'Синхронизация...' : 'Найти мой вайб'}
            </button>
          </div>

          {result && (
            <div className="mt-12 p-8 bg-[#4A5D4E] text-white rounded-[2rem] text-left animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1">
                  <span className="text-[#A68B67] text-xs font-bold uppercase tracking-[0.2em] mb-2 block">Ваш архетип путешествия:</span>
                  <h4 className="text-3xl font-expressive mb-4">{result.vibe}</h4>
                  <p className="text-white/70 font-archival text-xl leading-relaxed">
                    {result.description}
                  </p>
                </div>
                <div className="w-px h-24 bg-white/10 hidden md:block"></div>
                <button className="px-10 py-5 bg-[#A68B67] text-white rounded-full font-bold hover:bg-white hover:text-[#2C3531] transition-all whitespace-nowrap">
                  Маршруты этого вайба
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default VibeSelector;