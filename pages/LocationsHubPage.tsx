import React, { useEffect, useMemo, useState } from 'react';
import { createExcerpt, getAllPages, LOCATIONS_DATA } from '../services/contentService.ts';
import type { IPageData } from '../types';
import type { ViewState } from '../App';

interface LocationsHubPageProps {
  setView: React.Dispatch<React.SetStateAction<ViewState>>;
}

const LocationsHubPage: React.FC<LocationsHubPageProps> = ({ setView }) => {
  const [locations, setLocations] = useState<IPageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const allPages = await getAllPages();
        
        const finalLocations = LOCATIONS_DATA.map(locationDef => {
          const pageContent = allPages.find(p => p.wp_id === locationDef.wp_id);
          if (pageContent) {
            return {
              ...pageContent,
              title: locationDef.title, 
              slug: locationDef.slug,
            };
          }
          return null;
        }).filter((p): p is IPageData => p !== null);

        setLocations(finalLocations);

      } catch (e: any) {
        console.error("Critical error loading locations:", e);
        setError(e.message || "Ошибка загрузки данных");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const cards = useMemo(() => {
    return locations.map(t => ({
      wp_id: t.wp_id,
      title: t.title,
      slug: t.slug,
      description: createExcerpt(t.contentHtml, 150),
    }));
  }, [locations]);

  if (loading) {
    return (
      <div className="text-center py-40 font-archival animate-pulse">
        <div className="w-12 h-12 border-4 border-[#A68B67] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <h2 className="text-xl text-[#2C3531]">Загружаем путеводитель...</h2>
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
        <h1 className="text-4xl md:text-6xl font-expressive text-[#2C3531] mb-6">Локации Алтая</h1>
        <p className="text-lg text-[#2C3531]/60 font-archival max-w-2xl mx-auto">
          Путеводитель по {locations.length} знаковым объектам Алтая, которые формируют наши маршруты.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {cards.map(location => (
          <div key={location.wp_id} onClick={() => setView({ page: 'locationDetail', params: { locationId: encodeURIComponent(location.slug) } })} className="block group h-full cursor-pointer">
            <div className="bg-white/60 glass-card rounded-[2.5rem] p-8 border border-white/40 shadow-sm hover:shadow-xl hover:bg-white hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
              <div className="flex-grow">
                <h3 className="text-2xl font-expressive mb-4 text-[#2C3531] group-hover:text-[#A68B67] transition-colors leading-tight">
                  {location.title}
                </h3>
                <div className="w-12 h-0.5 bg-[#A68B67]/20 mb-6 group-hover:w-20 transition-all duration-500"></div>
                <p className="text-sm text-[#2C3531]/70 font-archival leading-relaxed">
                  {location.description}
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

export default LocationsHubPage;
