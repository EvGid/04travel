import React, { useState } from 'react';
import { EXPERIENCES } from '../ui-constants.ts';

const ExperienceExplorer: React.FC = () => {
  // Защита: если EXPERIENCES пуст или undefined, используем null, чтобы не упасть при инициализации useState
  const [activeLoc, setActiveLoc] = useState(EXPERIENCES && EXPERIENCES.length > 0 ? EXPERIENCES[0] : null);

  // Если данных нет, не рендерим секцию или показываем заглушку
  if (!activeLoc) {
    return null;
  }

  return (
    <section className="py-24 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 items-start">
          {/* Navigation Sidebar */}
          <div className="w-full md:w-1/3 space-y-6">
            <h2 className="text-3xl md:text-4xl font-expressive text-[#2C3531] mb-8">Альбомы локаций</h2>
            {EXPERIENCES.map((exp) => (
              <button
                key={exp.id}
                onClick={() => setActiveLoc(exp)}
                className={`w-full text-left p-6 rounded-[2rem] transition-all duration-300 group relative overflow-hidden ${activeLoc.id === exp.id
                  ? 'bg-[#4A5D4E] text-white shadow-xl'
                  : 'bg-[#F5F1E9] text-[#2C3531] hover:bg-gray-100'
                  }`}
              >
                <div className="relative z-10">
                  <h4 className="text-xl font-bold mb-2">{exp.name}</h4>
                  <p className={`text-sm opacity-60 line-clamp-2`}>{exp.description}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Immersive Gallery & Reviews */}
          <div className="w-full md:w-2/3">
            <div className="mb-12">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                {activeLoc.media && activeLoc.media.map((item, idx) => (
                  <div
                    key={idx}
                    className={`relative rounded-[2rem] overflow-hidden bg-gray-100 group cursor-pointer ${idx === 0 ? 'col-span-2 row-span-2' : ''
                      }`}
                  >
                    <img
                      src={item.type === 'video' ? item.thumbnail : item.url}
                      alt={item.title}
                      className="w-full h-full object-cover aspect-square transition-transform duration-700 group-hover:scale-110"
                    />
                    {item.type === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-all">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40">
                          <svg className="w-6 h-6 text-white fill-current" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    )}
                    <div className="absolute bottom-4 left-4 right-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                      <p className="text-white text-xs font-bold uppercase tracking-widest drop-shadow-md">{item.title}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Verified Platform Integration (The 2GIS Widget) */}
              {activeLoc.externalWidget && (
                <div className="mb-8 p-6 bg-blue-50/50 rounded-[2rem] border border-blue-100 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="min-w-[48px] h-12 px-3 bg-[#36A26B] rounded-xl flex items-center justify-center shadow-lg shadow-[#36A26B]/20">
                      <span className="text-white font-bold text-lg leading-none">2GIS</span>
                    </div>
                    <div>
                      <h6 className="font-bold text-[#2C3531]">Официальный рейтинг 2GIS</h6>
                      <p className="text-xs text-[#2C3531]/50 italic">Проверено тысячами путешественников</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-2xl font-black text-[#36A26B]">{activeLoc.externalWidget.rating || '4.9 / 4.9'}</p>
                      <div className="flex justify-end gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className={`w-3 h-3 ${i === 4 ? 'fill-[#36A26B]/30' : 'fill-[#36A26B]'}`} viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                        ))}
                      </div>
                    </div>
                    <a
                      href={activeLoc.externalWidget.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-[#36A26B] text-white rounded-full text-xs font-bold hover:bg-[#2e8a5a] transition-all shadow-md active:scale-95"
                    >
                      Открыть виджет
                    </a>
                  </div>
                </div>
              )}

              {/* Location Specific Reviews Card Stack */}
              <div className="bg-[#F5F1E9] p-10 rounded-[3rem]">
                <h5 className="font-expressive text-2xl mb-8 text-[#2C3531]">Отзывы об этой локации</h5>
                <div className="space-y-6">
                  {activeLoc.reviews && activeLoc.reviews.map((rev) => (
                    <div key={rev.id} className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-4">
                          <img src={rev.avatar} className="w-10 h-10 rounded-full border border-[#A68B67]/20" alt={rev.author} />
                          <div>
                            <p className="font-bold text-sm text-[#2C3531]">{rev.author}</p>
                            <p className="text-[10px] text-[#A68B67] uppercase font-bold tracking-widest">{rev.platform} • {rev.date}</p>
                          </div>
                        </div>
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-[#2C3531]/70 italic leading-relaxed">"{rev.text}"</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceExplorer;