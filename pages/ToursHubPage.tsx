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
            className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
              activeTab === tab.key 
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
          <div key={tour.wp_id} onClick={() => setView({ page: 'tourDetail', params: { tourId: encodeURIComponent(tour.slug) } })} className="block group h-full cursor-pointer">
            <div className="bg-white/60 glass-card rounded-[2.5rem] p-8 border border-white/40 shadow-sm hover:shadow-xl hover:bg-white hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
              <div className="flex-grow">
                <h3 className="text-2xl font-expressive mb-4 text-[#2C3531] group-hover:text-[#A68B67] transition-colors leading-tight">
                  {tour.title}
                </h3>
                <div className="w-12 h-0.5 bg-[#A68B67]/20 mb-6 group-hover:w-20 transition-all duration-500"></div>
                <p className="text-sm text-[#2C3531]/70 font-archival leading-relaxed">
                  {tour.description}
                </p>
              </div>
              <div className="mt-8 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-[#A68B67]">Подробнее</span>
                <span className="w-8 h-8 rounded-full border border-[#A68B67]/20 flex items-center justify-center text-[#A68B67] group-hover:bg-[#A68B67] group-hover:text-white transition-all group-hover:translate-x-1 duration-300">
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
