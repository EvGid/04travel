import React, { useState, useEffect } from 'react';

const ChulyshmanTest: React.FC = () => {
    // Полный список изображений (v=3 для сброса кэша после ротации)
    const images = [
        '/images/chulyshman/pereval-katu-yaryk-dolina-chulyshman-altay12.webp', // Landscape (Main)
        '/images/chulyshman/pereval-katu-yaryk-dolina-chulyshman-altay1.webp?v=3', // Portrait (Rotated)
        '/images/chulyshman/pereval-katu-yaryk-dolina-chulyshman-altay2.webp?v=3', // Portrait (Rotated)
        '/images/chulyshman/pereval-katu-yaryk-dolina-chulyshman-altay3.webp',
        '/images/chulyshman/pereval-katu-yaryk-dolina-chulyshman-altay4.webp',
        '/images/chulyshman/pereval-katu-yaryk-dolina-chulyshman-altay5.webp',
        '/images/chulyshman/pereval-katu-yaryk-dolina-chulyshman-altay6.webp',
        '/images/chulyshman/pereval-katu-yaryk-dolina-chulyshman-altay7.webp',
        '/images/chulyshman/pereval-katu-yaryk-dolina-chulyshman-altay8.webp',
        '/images/chulyshman/pereval-katu-yaryk-dolina-chulyshman-altay9.webp',
        '/images/chulyshman/pereval-katu-yaryk-dolina-chulyshman-altay10.webp',
        '/images/chulyshman/pereval-katu-yaryk-dolina-chulyshman-altay11.webp',
        '/images/chulyshman/pereval-katu-yaryk-dolina-chulyshman-altay13.webp',
        '/images/chulyshman/pereval-katu-yaryk-dolina-chulyshman-altay14.webp',
        '/images/chulyshman/pereval-katu-yaryk-dolina-chulyshman-altay15.webp',
        '/images/chulyshman/pereval-katu-yaryk-dolina-chulyshman-altay16.webp',
        '/images/chulyshman/pereval-katu-yaryk-dolina-chulyshman-altay17.webp',
        '/images/chulyshman/pereval-katu-yaryk-dolina-chulyshman-altay18.webp',
        '/images/chulyshman/pereval-katu-yaryk-dolina-chulyshman-altay19.webp',
        '/images/chulyshman/pereval-katu-yaryk-dolina-chulyshman-altay20.webp',
        '/images/chulyshman/pereval-katu-yaryk-dolina-chulyshman-altay21.webp',
        '/images/chulyshman/pereval-katu-yaryk-dolina-chulyshman-altay23.webp',
        '/images/chulyshman/pereval-katu-yaryk-dolina-chulyshman-altay24.webp',
    ];

    const [activeTab, setActiveTab] = useState('planning');

    // JSON-LD
    useEffect(() => {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.text = JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Tour",
            "name": "Долина Чулышмана",
            "description": "Путешествие в 'Затерянный мир' Алтая через легендарный перевал Кату-Ярык.",
            "offers": {
                "@type": "Offer",
                "price": "45000",
                "priceCurrency": "RUB",
                "availability": "https://schema.org/InStock"
            },
            "areaServed": "Республика Алтай"
        });
        document.head.appendChild(script);
        return () => {
            document.head.removeChild(script);
        };
    }, []);

    return (
        <div className="bg-[#F5F1E9] min-h-screen pb-24 md:pb-0 font-sans text-[#2C3531]">
            {/* 1. Gallery: Bento (Desktop) & Vertical Stories (Mobile) */}
            <section className="relative w-full overflow-hidden">

                {/* Mobile: Vertical Snap Scroll (Instagram Stories style) */}
                <div className="md:hidden h-screen overflow-y-scroll snap-y snap-mandatory no-scrollbar">
                    {images.map((img, idx) => (
                        <div key={idx} className="w-full h-full snap-center relative">
                            <img src={img} alt={`Долина Чулышмана ${idx + 1} `} className="w-full h-full object-cover" />
                            {idx === 0 && (
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-6 pb-32">
                                    <span className="text-white/80 uppercase tracking-widest text-xs mb-2 animate-pulse">Алтай 2026</span>
                                    <h1 className="text-5xl font-bold text-white leading-tight">Долина<br />Чулышмана</h1>
                                </div>
                            )}
                        </div>
                    ))}
                    {/* Scroll Hint */}
                    <div className="absolute bottom-24 left-1/2 -translate-x-1/2 text-white/50 animate-bounce pointer-events-none z-10">
                        ↓
                    </div>
                </div>

                {/* Desktop: Bento Grid */}
                <div className="hidden md:grid grid-cols-4 grid-rows-2 gap-4 h-[80vh] p-4 max-w-[1600px] mx-auto">
                    {/* Large Main Item */}
                    <div className="col-span-2 row-span-2 relative rounded-3xl overflow-hidden group shadow-2xl">
                        <img src={images[0]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Main" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-12">
                            <span className="text-[#A68B67] uppercase tracking-[0.3em] font-bold mb-4">Extreme Journey</span>
                            <h1 className="text-7xl font-bold text-white mb-6">Долина<br />Чулышмана</h1>
                            <p className="text-white/80 text-xl max-w-md">Путешествие к водопадам-гигантам через легендарный перевал.</p>
                        </div>
                    </div>

                    {/* Secondary Items */}
                    {images.slice(1, 5).map((img, i) => (
                        <div key={i} className="col-span-1 row-span-1 relative rounded-3xl overflow-hidden group cursor-pointer shadow-lg">
                            <img src={img} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={`Thumb ${i} `} />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                        </div>
                    ))}
                </div>

            </section>

            {/* 2. Mobile Sticky Button */}
            <div className="fixed bottom-0 left-0 w-full z-50 md:hidden pointer-events-none flex justify-center pb-6">
                <button className="pointer-events-auto w-auto min-w-[200px] bg-[#4A5D4E]/60 backdrop-blur-xl text-white py-3 px-8 rounded-full font-bold text-lg shadow-2xl border border-white/20 active:scale-95 transition-all hover:bg-[#4A5D4E]/80">
                    Забронировать
                </button>
            </div>

            <div className="max-w-6xl mx-auto px-4 md:px-8 py-12 space-y-24">

                {/* 3. О маршруте */}
                <section className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <span className="text-[#A68B67] uppercase font-bold tracking-widest text-xs mb-4 block">Дикая природа</span>
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Сердце древнего Алтая</h2>
                        <p className="text-lg opacity-80 leading-relaxed mb-6">
                            Это место называют "затерянным миром". Здесь нет сотовой связи, зато есть грохот водопадов-гигантов и величие отвесных скал.
                            Путь сюда лежит через <span className="font-bold text-[#4A5D4E] underline decoration-dotted cursor-help relative group">перевал Кату-Ярык
                                {/* Image tooltip/preview */}
                                <div className="hidden group-hover:block absolute bottom-full left-0 mb-2 w-48 h-32 rounded-lg overflow-hidden shadow-xl z-10">
                                    <img src="/images/chulyshman/pereval-katu-yaryk-dolina-chulyshman-altay1.webp" className="w-full h-full object-cover" alt="Кату-Ярык" />
                                </div>
                            </span> — самый сложный и живописный серпантин Сибири.
                        </p>
                    </div>
                    <div className="relative rounded-[2rem] overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-all duration-500 h-[400px]">
                        <img src="/images/chulyshman/pereval-katu-yaryk-dolina-chulyshman-altay12.webp" className="w-full h-full object-cover" alt="Каньон" />
                    </div>
                </section>

                {/* 4. Что здесь интересного (Grid) */}
                <section>
                    <h3 className="text-3xl font-bold mb-12 text-center">Что вас ждет</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { icon: '🏔️', title: 'Кату-Ярык', desc: 'Перепад высот 800м' },
                            { icon: '💦', title: 'Водопад Учар', desc: '160 метров мощи' },
                            { icon: '🍄', title: 'Каменные грибы', desc: 'Чудо природы Аккурум' },
                            { icon: '⛺', title: 'Глэмпинг', desc: 'Ночевка под звездами' },
                        ].map((item, i) => (
                            <div key={i} className="bg-white p-6 rounded-[2rem] hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                                <div className="text-4xl mb-4">{item.icon}</div>
                                <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                                <p className="text-sm opacity-60">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 5. Интерактивное планирование */}
                <section className="bg-white p-8 md:p-12 rounded-[3rem] shadow-sm">
                    <div className="flex gap-4 md:gap-8 overflow-x-auto mb-8 border-b border-gray-100 pb-4">
                        {['planning', 'getting_there', 'route'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`text-lg md:text-xl font-bold whitespace-nowrap transition-colors ${activeTab === tab ? 'text-[#4A5D4E]' : 'text-gray-300 hover:text-gray-500'}`}
                            >
                                {tab === 'planning' ? 'Как планировать' : tab === 'getting_there' ? 'Как добраться' : 'Маршрут'}
                            </button>
                        ))}
                    </div>
                    <div className="min-h-[200px]">
                        {activeTab === 'planning' && (
                            <div className="animate-fadeIn">
                                <p className="text-lg leading-relaxed">Лучшее время для посещения — с июня по сентябрь. Бронируйте проживание минимум за 3 месяца, так как количество баз в долине ограничено. Связи нет, скачайте оффлайн карты.</p>
                            </div>
                        )}
                        {activeTab === 'getting_there' && (
                            <div className="animate-fadeIn">
                                <p className="text-lg leading-relaxed">Выезд из Акташа в сторону села Улаган. 100 км по гравийной дороге через Красные ворота и Улаганский перевал. Для спуска в долину нужен автомобиль с высоким клиренсом и опытный водитель.</p>
                            </div>
                        )}
                        {activeTab === 'route' && (
                            <div className="animate-fadeIn space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-8 h-8 rounded-full bg-[#4A5D4E] text-white flex items-center justify-center font-bold">1</div>
                                    <p>Акташ (Старт)</p>
                                </div>
                                <div className="w-0.5 h-6 bg-gray-200 ml-4"></div>
                                <div className="flex items-center gap-4">
                                    <div className="w-8 h-8 rounded-full bg-[#4A5D4E] text-white flex items-center justify-center font-bold">2</div>
                                    <p>Красные ворота</p>
                                </div>
                                <div className="w-0.5 h-6 bg-gray-200 ml-4"></div>
                                <div className="flex items-center gap-4">
                                    <div className="w-8 h-8 rounded-full bg-[#4A5D4E] text-white flex items-center justify-center font-bold">3</div>
                                    <p>Перевал Кату-Ярык</p>
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                {/* 6. Что включено & Цены */}
                <div className="grid md:grid-cols-2 gap-12">
                    <div>
                        <h3 className="text-2xl font-bold mb-6">Включено в тур</h3>
                        <ul className="space-y-4">
                            {['Проезд на джипах Toyota Land Cruiser', 'Проживание в эко-домиках', 'Питание (костровое + кафе)', 'Гид-инструктор', 'Рекреационные сборы'].map((item, i) => (
                                <li key={i} className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm">
                                    <div className="w-6 h-6 rounded-full bg-[#36A26B]/20 text-[#36A26B] flex items-center justify-center">✓</div>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="space-y-6">
                        <div className="bg-[#4A5D4E] text-white p-8 rounded-[2rem] relative overflow-hidden">
                            <div className="relative z-10">
                                <span className="text-white/60 text-sm uppercase font-bold tracking-widest">Стоимость тура</span>
                                <div className="text-5xl font-bold my-4">45 000 ₽</div>
                                <p className="opacity-80">Цена за человека в группе из 4-х. Всё включено.</p>
                            </div>
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                        </div>
                        <div className="bg-white p-8 rounded-[2rem] border-2 border-[#F5F1E9]">
                            <span className="text-[#A68B67] text-sm uppercase font-bold tracking-widest">Сезонность</span>
                            <p className="text-xl font-bold mt-2">Май — Октябрь 2026</p>
                        </div>
                    </div>
                </div>

                {/* 7. Карта (Placeholder) */}
                <section className="bg-gray-200 rounded-[3rem] h-96 relative overflow-hidden flex items-center justify-center group">
                    <div className="absolute inset-0 bg-cover bg-center opacity-50 grayscale group-hover:grayscale-0 transition-all duration-700" style={{ backgroundImage: "url('/images/chulyshman/pereval-katu-yaryk-dolina-chulyshman-altay7.webp')" }}></div>
                    <div className="relative z-10 bg-white/90 backdrop-blur px-8 py-4 rounded-full text-[#2C3531] font-bold shadow-xl flex items-center gap-3">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        Карта маршрута (Загрузка...)
                    </div>
                </section>

                {/* 8. FAQ Accordion */}
                <section className="max-w-3xl mx-auto">
                    <h3 className="text-3xl font-bold mb-8 text-center">Частые вопросы</h3>
                    <div className="space-y-4">
                        {[
                            { q: 'Нужна ли специальная подготовка?', a: 'Нет, тур подходит для людей с обычной физической формой. Пешие переходы несложные.' },
                            { q: 'Есть ли связь в долине?', a: 'Сотовая связь отсутствует полностью. Связь только через спутниковый телефон у гида (для экстренных случаев).' },
                            { q: 'Можно ли с детьми?', a: 'Да, рекомендуем детям от 7 лет. Дорога может быть утомительной.' }
                        ].map((item, i) => (
                            <details key={i} className="group bg-white rounded-2xl p-6 shadow-sm cursor-pointer">
                                <summary className="font-bold flex justify-between items-center list-none">
                                    {item.q}
                                    <span className="transform group-open:rotate-180 transition-transform">▼</span>
                                </summary>
                                <p className="mt-4 text-gray-600 leading-relaxed animate-fadeIn">{item.a}</p>
                            </details>
                        ))}
                    </div>
                </section>

            </div>
        </div>
    );
};

export default ChulyshmanTest;
