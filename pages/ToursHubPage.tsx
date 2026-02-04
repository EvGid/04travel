import React, { useEffect, useMemo, useState } from 'react';
import { createExcerpt, getAllPages, TOURS_DATA } from '../services/contentService.ts';
import type { IPageData } from '../types';
import type { ViewState } from '../App';

interface ToursHubPageProps {
  setView: React.Dispatch<React.SetStateAction<ViewState>>;
}

const TABS = [
  { key: 'all', name: 'Все туры' },
  { key: 'popular', name: 'Популярные маршруты' },
  { key: 'cities', name: 'Туры по городам' },
  { key: 'types', name: 'Типы туров' },
];

const POPULAR_SLUGS = new Set([
  'чуйский-тракт-туры-и-маршрут',
  'телецкое-озеро-туры-и-экскурсии',
  'белуха',
  'перевал-кату-ярык',
  'долина-чулышмана',
  'алтай-марс-кызыл-чин-экскурсии-и-туры',
  'гейзеровое-озеро-на-алтае-как-попасть',
]);

const TYPE_KEYWORDS = ['Джип-тур', 'Конные', 'Индивидуальные', 'выходного дня'];

const ToursHubPage: React.FC<ToursHubPageProps> = ({ setView }) => {
  const [tours, setTours] = useState<IPageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const allPages = await getAllPages();

        const finalTours = TOURS_DATA.map(tourDef => {
          const pageContent = allPages.find(p => p.wp_id === tourDef.wp_id);
          if (pageContent) {
            return {
              ...pageContent,
              title: tourDef.title,
              slug: tourDef.slug,
              image: tourDef.image,
            };
          }
          return null;
        }).filter((p): p is IPageData => p !== null);

        setTours(finalTours);

      } catch (e: any) {
        console.error("Critical error loading tours:", e);
        setError(e.message || "Ошибка загрузки данных");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const allCards = useMemo(() => {
    return tours.map(t => ({
      wp_id: t.wp_id,
      title: t.title,
      slug: t.slug,
      image: (t as any).image,
      description: createExcerpt(t.contentHtml, 150),
    }));
  }, [tours]);

  const filteredCards = useMemo(() => {
    switch (activeTab) {
      case 'popular':
        return allCards.filter(c => POPULAR_SLUGS.has(c.slug));
      case 'cities':
        return allCards.filter(c => c.title.includes(' из '));
      case 'types':
        return allCards.filter(c => TYPE_KEYWORDS.some(kw => c.title.toLowerCase().includes(kw.toLowerCase())));
      case 'all':
      default:
        return allCards;
    }
  }, [allCards, activeTab]);

  if (loading) {
    return (
      <div className="text-center py-40 font-archival animate-pulse">
        <div className="w-12 h-12 border-4 border-[#A68B67] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <h2 className="text-xl text-[#2C3531]">Загружаем каталог туров...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-40 font-archival text-red-600">
        <h2 className="text-2xl">Ошибка загрузки</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-expressive text-[#2C3531] mb-6">Коллекция путешествий</h1>
        <p className="text-lg text-[#2C3531]/60 font-archival max-w-2xl mx-auto">
          Полный каталог из {tours.length} реальных маршрутов по Алтаю: от классических экспедиций до авторских туров выходного дня.
        </p>
      </div>

      <div className="flex justify-center flex-wrap gap-2 mb-12">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${activeTab === tab.key
              ? 'bg-[#4A5D4E] text-white shadow-lg scale-105'
              : 'bg-white text-[#2C3531] hover:bg-gray-100 border border-gray-100'
              }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredCards.map(tour => (
          <div
            key={tour.wp_id}
            onClick={() => setView({ page: 'tourDetail', params: { tourId: encodeURIComponent(tour.slug) } })}
            className="block group cursor-pointer relative overflow-hidden rounded-[2rem] aspect-[4/5] md:aspect-[4/3] shadow-md hover:shadow-2xl transition-all duration-500"
          >
            {/* Background Layer */}
            <div className="absolute inset-0">
              {tour.image ? (
                <img
                  src={tour.image}
                  alt={tour.title}
                  className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${tour.image.includes('teleckoe-ozero-artybash-altay12.webp') ? 'rotate-90 scale-[1.5]' : ''}`}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#4A5D4E] to-[#2C3531]"></div>
              )}
              {/* Universal Gradient Overlay for better text contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></div>
            </div>

            {/* Content Overlay */}
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
              <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-white font-expressive text-lg md:text-xl uppercase leading-tight tracking-tight drop-shadow-lg mb-4">
                  {tour.title}
                </h3>
              </div>

              <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 transform translate-y-2 group-hover:translate-y-0">
                <span className="text-white/70 text-[10px] font-bold uppercase tracking-[0.2em]">Подробнее</span>
                <span className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-colors">
                  →
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToursHubPage;
