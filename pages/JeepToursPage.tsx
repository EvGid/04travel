import React, { useState, useEffect } from 'react';

const JeepToursPage: React.FC = () => {
    // Images from /public/images/Jeep/
    const images = [
        '/images/Jeep/photo_2026-02-05_13-22-47.webp', // Main (Large)
        '/images/Jeep/20250728_170904.webp',
        '/images/Jeep/20250802_180958.webp',
        '/images/Jeep/IMG-20241015-WA0003.webp',
        '/images/Jeep/photo_2026-02-05_13-22-20.webp',
    ];

    const [activeTab, setActiveTab] = useState('planning');

    // JSON-LD
    useEffect(() => {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.text = JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Tour",
            "name": "Джип-туры по Алтаю",
            "description": "Путешествие по самым красивым местам Алтая на комфортабельных внедорожниках. Чуйский тракт, Марс, Перевалы.",
            "offers": {
                "@type": "Offer",
                "price": "15000",
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

                {/* Mobile: Vertical Snap */}
                <div className="md:hidden h-screen overflow-y-scroll snap-y snap-mandatory no-scrollbar">
                    {images.map((img, idx) => (
                        <div key={idx} className="w-full h-full snap-center relative">
                            <img src={img} alt={`Алтай Джип-тур ${idx + 1}`} className="w-full h-full object-cover" />
                            {idx === 0 && (
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-6 pb-32">
                                    <span className="text-white/80 uppercase tracking-widest text-xs mb-2 animate-pulse">Алтай 2026</span>
                                    <h1 className="text-4xl font-bold text-white leading-tight">Джип-туры<br />по Алтаю</h1>
                                </div>
                            )}
                        </div>
                    ))}
                    <div className="absolute bottom-24 left-1/2 -translate-x-1/2 text-white/50 animate-bounce pointer-events-none z-10">↓</div>
                </div>

                {/* Desktop: Bento Grid */}
                <div className="hidden md:grid grid-cols-4 grid-rows-2 gap-4 h-[80vh] p-4 max-w-[1600px] mx-auto">
                    <div className="col-span-2 row-span-2 relative rounded-3xl overflow-hidden group shadow-2xl">
                        <img src={images[0]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Main" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-12">
                            <span className="text-[#A68B67] uppercase tracking-[0.3em] font-bold mb-4">Adventure</span>
                            <h1 className="text-6xl font-bold text-white mb-6">Джип-туры<br />по Алтаю</h1>
                            <p className="text-white/80 text-xl max-w-md">Комфорт и драйв на легендарном Чуйском тракте.</p>
                        </div>
                    </div>
                    {images.slice(1, 5).map((img, i) => (
                        <div key={i} className="col-span-1 row-span-1 relative rounded-3xl overflow-hidden group cursor-pointer shadow-lg">
                            <img src={img} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={`Thumb ${i}`} />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                        </div>
                    ))}
                </div>
            </section>

            {/* 2. Sticky Mobile Button */}
            <div className="fixed bottom-0 left-0 w-full z-50 md:hidden pointer-events-none flex justify-center pb-6">
                <button className="pointer-events-auto w-auto min-w-[200px] bg-[#4A5D4E]/90 backdrop-blur-xl text-white py-3 px-8 rounded-full font-bold text-lg shadow-2xl border border-white/20 active:scale-95 transition-all">
                    Забронировать
                </button>
            </div>

            <div className="max-w-6xl mx-auto px-4 md:px-8 py-12 space-y-24">

                {/* 3. О маршруте */}
                <section className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <span className="text-[#A68B67] uppercase font-bold tracking-widest text-xs mb-4 block">О туре</span>
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Максимум Алтая</h2>
                        <p className="text-lg opacity-80 leading-relaxed mb-6">
                            Мы покажем вам Алтай таким, каким его видим мы. Без толп туристов, с остановками в самых живописных местах.
                            Комфортабельные джипы (Toyota Land Cruiser, Lexus) позволят добраться туда, куда не проедет обычный автобус.
                        </p>
                    </div>
                    <div className="relative rounded-[2rem] overflow-hidden shadow-2xl h-[400px]">
                        <img src={images[1]} className="w-full h-full object-cover" alt="Jeep Tour" />
                    </div>
                </section>

                {/* Что интересного (Grid) */}
                <section>
                    <h3 className="text-3xl font-bold mb-12 text-center">Что вас ждет</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { icon: '🏔️', title: 'Горы', desc: 'Снежные пики' },
                            { icon: '🛣️', title: 'Чуйский тракт', desc: 'Топ-5 дорог мира' },
                            { icon: '🦅', title: 'Свобода', desc: 'Дикие места' },
                            { icon: '📸', title: 'Фото', desc: 'Лучшие ракурсы' },
                        ].map((item, i) => (
                            <div key={i} className="bg-white p-6 rounded-[2rem] hover:shadow-xl transition-all duration-300">
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
                            <button key={tab} onClick={() => setActiveTab(tab)}
                                className={`text-lg md:text-xl font-bold whitespace-nowrap transition-colors ${activeTab === tab ? 'text-[#4A5D4E]' : 'text-gray-300 hover:text-gray-500'}`}>
                                {tab === 'planning' ? 'Как планировать' : tab === 'getting_there' ? 'Как добраться' : 'Маршрут'}
                            </button>
                        ))}
                    </div>
                    <div className="min-h-[150px]">
                        {activeTab === 'planning' && <p className="text-lg">Туры проводятся круглый год. Летом — зелень и водопады, осенью — бирюзовая Катунь и золото лесов, зимой — снежная сказка.</p>}
                        {activeTab === 'getting_there' && <p className="text-lg">Старт из Горно-Алтайска (аэропорт) или Новосибирска. Мы встретим вас и доставим к месту начала тура.</p>}
                        {activeTab === 'route' && (
                            <div className="space-y-4">
                                <p>1. Встреча в аэропорту</p>
                                <p>2. Чуйский тракт</p>
                                <p>3. Урочище Марс</p>
                                <p>4. Гейзерное озеро</p>
                            </div>
                        )}
                    </div>
                </section>

                {/* 6. Что включено & Цены */}
                <div className="grid md:grid-cols-2 gap-12">
                    <div>
                        <h3 className="text-2xl font-bold mb-6">Включено</h3>
                        <ul className="space-y-4">
                            {['Трансфер на джипах', 'Работа гида-водителя', 'Топливо и парковки', 'Входные билеты (по программе)'].map((item, i) => (
                                <li key={i} className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm">
                                    <div className="w-6 h-6 rounded-full bg-[#36A26B]/20 text-[#36A26B] flex items-center justify-center">✓</div>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="space-y-6">
                        <div className="bg-[#4A5D4E] text-white p-8 rounded-[2rem]">
                            <span className="opacity-60 uppercase text-sm font-bold">Стоимость</span>
                            <div className="text-4xl font-bold my-4">от 15 000 ₽</div>
                            <p className="opacity-80">за группу / день</p>
                        </div>
                    </div>
                </div>

                {/* 7. Map Placeholder */}
                <section className="bg-gray-200 rounded-[3rem] h-80 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-cover bg-center grayscale opacity-30" style={{ backgroundImage: `url(${images[0]})` }}></div>
                    <div className="z-10 bg-white/80 backdrop-blur px-6 py-3 rounded-full font-bold">🗺️ Карта маршрута (Загрузка...)</div>
                </section>

                {/* 8. FAQ */}
                <section className="max-w-3xl mx-auto">
                    <h3 className="text-3xl font-bold mb-8 text-center">Частые вопросы</h3>
                    <div className="space-y-4">
                        {[
                            { q: 'Какая машина будет?', a: 'Мы используем Toyota Land Cruiser 80/100/200 и Lexus LX.' },
                            { q: 'Сколько человек в машине?', a: 'Комфортное размещение — до 4 пассажиров.' },
                            { q: 'Можно ли с детьми?', a: 'Да, мы предоставляем детские кресла.' }
                        ].map((item, i) => (
                            <details key={i} className="group bg-white rounded-2xl p-6 shadow-sm cursor-pointer">
                                <summary className="font-bold flex justify-between items-center list-none">
                                    {item.q}
                                    <span className="transform group-open:rotate-180 transition-transform">▼</span>
                                </summary>
                                <p className="mt-4 text-gray-600 animate-fadeIn">{item.a}</p>
                            </details>
                        ))}
                    </div>
                </section>

            </div>
        </div>
    );
};

export default JeepToursPage;
