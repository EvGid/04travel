import React, { useState } from 'react';
import { REGIONAL_PRICES } from '../ui-constants.ts';
import type { PricingRegion } from '../types';
import type { ViewState } from '../App.tsx';

interface PricingSectionProps {
  setView?: (view: ViewState) => void;
}

const PricingSection: React.FC<PricingSectionProps> = ({ setView }) => {
  const [activeTab, setActiveTab] = useState(REGIONAL_PRICES[0]?.id);
  const [groupSize, setGroupSize] = useState(4);
  const [phone, setPhone] = useState('');

  const activeRegion = REGIONAL_PRICES.find(r => r.id === activeTab);

  const calculatePrice = (minPrice: number, perPerson: number) => {
    if (groupSize >= 4) return perPerson * groupSize;
    return minPrice; // Если меньше 4, платится минималка за машину
  };

  const handleBooking = () => {
    if (setView) {
      setView({ page: 'contact', params: { phone } });
    }
  };

  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden" id="pricing">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div>
          <span className="text-[#A68B67] text-sm font-bold uppercase tracking-widest mb-4 block">Прайс-лист 2026</span>
          <h2 className="text-3xl md:text-5xl font-expressive text-[#2C3531] mb-6">Стоимость приключений</h2>
          <p className="text-[#2C3531]/60 font-archival max-w-xl text-lg">
            Цены на автозаброски повышенной проходимости сезона 2026. Выберите размер вашей группы для точного расчета.
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:gap-12 mb-12">
        <div className="flex flex-wrap gap-2 order-1">
          {REGIONAL_PRICES.map((region) => (
            <button
              key={region.id}
              onClick={() => setActiveTab(region.id)}
              className={`px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${activeTab === region.id
                ? 'bg-[#4A5D4E] text-white shadow-lg scale-105'
                : 'bg-white text-[#2C3531] hover:bg-gray-100 border border-gray-100'
                }`}
            >
              {region.name}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4 bg-white p-4 rounded-full border border-gray-100 shadow-sm order-2 self-start mt-6 md:mt-0">
          <span className="text-xs font-bold text-[#2C3531]/40 uppercase tracking-tighter px-2">Ваша группа:</span>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setGroupSize(Math.max(1, groupSize - 1))}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
            >—</button>
            <span className="text-xl font-black text-[#4A5D4E] min-w-[1.5rem] text-center">{groupSize}</span>
            <button
              onClick={() => setGroupSize(Math.min(10, groupSize + 1))}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
            >+</button>
          </div>
          <span className="text-[10px] text-[#A68B67] font-bold">чел.</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="glass-card rounded-[2rem] overflow-hidden border border-white/40 shadow-sm">
            <table className="w-full text-left table-fixed md:table-auto">
              <thead className="bg-[#4A5D4E]/5">
                <tr>
                  <th className="py-3 px-2 md:py-6 md:px-8 text-[9px] md:text-xs font-bold uppercase tracking-widest text-[#2C3531]/40 w-[45%] md:w-auto">Маршрут</th>
                  <th className="py-3 px-2 md:py-6 md:px-8 text-[9px] md:text-xs font-bold uppercase tracking-widest text-[#2C3531]/40 text-right w-[25%] md:w-auto">На человека</th>
                  <th className="py-3 px-2 md:py-6 md:px-8 text-[9px] md:text-xs font-bold uppercase tracking-widest text-[#2C3531]/40 text-right w-[30%] md:w-auto">Итого за группу</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {activeRegion?.items.map((item, idx) => {
                  const totalPrice = calculatePrice(item.minPrice, item.pricePerPerson);
                  const perPersonEffective = Math.round(totalPrice / groupSize);

                  return (
                    <tr key={idx} className={`group hover:bg-white/60 transition-colors ${item.isFeatured ? 'bg-[#A68B67]/5' : ''}`}>
                      <td className="py-3 px-2 md:py-6 md:px-8 align-middle">
                        <div className="flex items-center gap-1.5 md:gap-3">
                          {item.isFeatured && (
                            <span className="shrink-0 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#A68B67]"></span>
                          )}
                          <span className={`font-bold text-[13px] md:text-lg leading-tight ${item.isFeatured ? 'text-[#A68B67]' : 'text-[#2C3531]'}`}>
                            {item.title}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-2 md:py-6 md:px-8 text-right align-middle">
                        <span className="text-sm md:text-xl font-black text-[#2C3531]">
                          {perPersonEffective.toLocaleString()}
                        </span>
                        <span className="text-[10px] ml-0.5 text-gray-400">₽</span>
                      </td>
                      <td className="py-3 px-2 md:py-6 md:px-8 text-right font-black text-sm md:text-2xl text-[#4A5D4E] align-middle">
                        {totalPrice.toLocaleString()} ₽
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <div className="bg-[#4A5D4E] p-10 rounded-[2.5rem] text-white relative overflow-hidden group">
            <h3 className="text-2xl md:text-3xl font-expressive mb-4 relative z-10">Быстрый старт</h3>
            <p className="text-white/70 text-sm mb-8 relative z-10">
              Выбрали маршрут? Забронируйте машину сейчас, чтобы гарантировать лучшую дату в сезоне 2026.
            </p>
            <div className="space-y-4 relative z-10">
              <input
                type="text"
                placeholder="Ваш телефон"
                className="w-full bg-white/10 border border-white/20 rounded-full px-6 py-4 outline-none focus:bg-white/20 transition-all"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <button
                onClick={handleBooking}
                className="w-full py-5 bg-[#A68B67] text-white rounded-full font-bold hover:shadow-[0_0_30px_rgba(166,139,103,0.4)] transition-all"
              >
                Оставить заявку
              </button>
            </div>
            <div className="absolute -bottom-10 -right-10 opacity-10 group-hover:rotate-12 transition-transform duration-700">
              <svg className="w-48 h-48" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" /></svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;