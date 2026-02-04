import React from 'react';
import Hero from '../components/Hero';
import BentoTours from '../components/BentoTours';
import PricingSection from '../components/PricingSection';
import ExperienceExplorer from '../components/ExperienceExplorer';
import ReviewsSection from '../components/ReviewsSection';
import LogisticsHub from '../components/LogisticsHub';
import VibeSelector from '../components/VibeSelector';
import BookingWidget from '../components/BookingWidget';
import type { ViewState } from '../App';

interface HomePageProps {
  setView: React.Dispatch<React.SetStateAction<ViewState>>;
}

const HomePage: React.FC<HomePageProps> = ({ setView }) => {
  return (
    <>
      <Hero setView={setView} />

      <section className="py-24 px-6 text-center max-w-4xl mx-auto">
        <div className="animate-pulse-soft">
          <span className="text-[#A68B67] text-sm font-bold uppercase tracking-[0.3em] mb-4 block">Organic Minimalism</span>
        </div>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-expressive text-[#2C3531] mb-8 leading-tight">
          Путешествие как продолжение <br className="hidden md:block" /> вашего внутреннего мира
        </h2>
        <p className="text-xl text-[#2C3531]/70 font-archival leading-relaxed max-w-2xl mx-auto">
          В 2026 году мы верим, что технологии должны исчезать, оставляя место для подлинного опыта. Мы переосмыслили каждый пиксель, чтобы ваш путь к Алтаю был таким же чистым и вдохновляющим, как горный воздух.
        </p>
      </section>

      <div id="tours">
        <BentoTours setView={setView} />
      </div>

      {/* Секция бронирования домиков остается на главной для удобства */}
      <div id="booking-widget-home">
        <BookingWidget />
      </div>

      <div id="experiences">
        <ExperienceExplorer setView={setView} />
      </div>

      <div id="pricing">
        <PricingSection setView={setView} />
      </div>

      <div id="vibe-selector">
        <VibeSelector />
      </div>

      <div id="reviews">
        <ReviewsSection />
      </div>

      <div id="logistics">
        <LogisticsHub />
      </div>
    </>
  );
};

export default HomePage;