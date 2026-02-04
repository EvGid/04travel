import React from 'react';
import type { ViewState } from '../App';
import { TOURS } from '../ui-constants.ts';

interface BentoToursProps {
  setView: React.Dispatch<React.SetStateAction<ViewState>>;
}

const BentoTours: React.FC<BentoToursProps> = ({ setView }) => {
  if (!TOURS || TOURS.length < 3) {
    return (
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center text-[#2C3531]/40">Загрузка промо-туров...</div>
      </section>
    );
  }

  const tour1 = TOURS[0];
  const tour2 = TOURS[1];
  const tour3 = TOURS[2];

  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="mb-16 text-center">
        <h2 className="text-3xl md:text-5xl font-expressive mb-4 text-[#2C3531]">Кураторские маршруты 2026</h2>
        <div className="w-20 h-1 bg-[#A68B67] mx-auto"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 grid-rows-none md:grid-rows-2 gap-6 min-h-[800px]">
        {/* Large Featured Card */}
        <div onClick={() => setView({ page: 'tourDetail', params: { tourId: tour1.slug! } })} className="md:col-span-8 md:row-span-2 relative group overflow-hidden rounded-3xl shadow-lg bg-white cursor-pointer">
          <img
            src={tour1.image}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            alt={tour1.title}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-10 flex flex-col justify-end">
            <span className="bg-[#A68B67] text-white text-xs font-bold px-3 py-1 rounded-full w-fit mb-4">
              {tour1.category}
            </span>
            <h3 className="text-white text-2xl md:text-4xl font-expressive mb-4">{tour1.title}</h3>
            <p className="text-white/80 max-w-md mb-6">{tour1.description}</p>
            <div className="flex items-center gap-4">
              <span className="text-white font-bold text-xl">{tour1.price.toLocaleString()} ₽</span>
              <div className="inline-flex items-center gap-2 px-6 py-2 bg-white text-[#2C3531] rounded-full text-sm font-semibold">
                <span>Узнать детали</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </div>
            </div>
          </div>
        </div>

        {/* Small Card 1 */}
        <div onClick={() => setView({ page: 'tourDetail', params: { tourId: tour2.slug! } })} className="md:col-span-4 relative group overflow-hidden rounded-3xl shadow-lg bg-white cursor-pointer">
          <img
            src={tour2.image}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            alt={tour2.title}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-8 flex flex-col justify-end group-hover:bg-black/50 transition-all">
            <div>
              <h3 className="text-white text-xl font-expressive mb-2">{tour2.title}</h3>
              <p className="text-white/70 text-sm">{tour2.duration}</p>
            </div>
            <div className="flex items-center justify-between mt-4">
              <span className="text-white font-bold text-lg">{tour2.price.toLocaleString()} ₽</span>
              <span className="w-9 h-9 rounded-full border-2 border-white/30 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all group-hover:translate-x-1 duration-300">
                →
              </span>
            </div>
          </div>
        </div>

        {/* Small Card 2 */}
        <div onClick={() => setView({ page: 'tourDetail', params: { tourId: tour3.slug! } })} className="md:col-span-4 relative group overflow-hidden rounded-3xl shadow-lg bg-white cursor-pointer">
          <img
            src={tour3.image}
            className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${tour3.image.includes('teleckoe-ozero-artybash-altay12.webp') ? 'rotate-90 scale-[1.8]' : ''}`}
            alt={tour3.title}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-8 flex flex-col justify-end group-hover:bg-black/50 transition-all">
            <div>
              <h3 className="text-white text-xl font-expressive mb-2">{tour3.title}</h3>
              <p className="text-white/70 text-sm">{tour3.duration}</p>
            </div>
            <div className="flex items-center justify-between mt-4">
              <span className="text-white font-bold text-lg">{tour3.price.toLocaleString()} ₽</span>
              <span className="w-9 h-9 rounded-full border-2 border-white/30 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all group-hover:translate-x-1 duration-300">
                →
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BentoTours;
