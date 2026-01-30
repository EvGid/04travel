import React from 'react';
import type { ViewState } from '../App';

interface HeroProps {
  setView: (view: ViewState) => void;
}

const Hero: React.FC<HeroProps> = ({ setView }) => {
  return (
    <section className="relative h-[85vh] w-full overflow-hidden flex items-center justify-center">
      {/* Immersive Video Overlay Placeholder */}
      <div className="absolute inset-0 z-0 bg-black/20">
        <img
          src="https://images.unsplash.com/photo-1541336032412-2048a678540d?auto=format&fit=crop&q=80&w=2574"
          alt="Altai Nature"
          className="w-full h-full object-cover scale-105 transition-transform duration-[10s] hover:scale-100"
        />
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl">
        <h1 className="text-white font-expressive text-4xl md:text-7xl mb-6 drop-shadow-lg leading-tight">
          Алтай: <br /> Глубина и Пауза
        </h1>
        <p className="text-white/90 text-lg md:text-2xl font-archival font-light mb-10 max-w-2xl mx-auto drop-shadow-md">
          Откройте Республику Алтай через философию осознанных путешествий и цифровой комфорт 2026 года.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => setView({ page: 'contact' })}
            className="px-8 py-4 bg-[#A68B67] text-white rounded-full font-medium tracking-wide hover:bg-[#8e7656] transition-all transform hover:-translate-y-1 shadow-xl"
          >
            Забронировать приключение
          </button>
          <button
            onClick={() => setView({ page: 'home', hash: 'vibe-selector' })}
            className="px-8 py-4 glass-card text-white rounded-full font-medium tracking-wide hover:bg-white/30 transition-all transform hover:-translate-y-1"
          >
            Подобрать по вайбу
          </button>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;