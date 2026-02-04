import React, { useState, useEffect } from 'react';

const MarsPage: React.FC = () => {
    // 1. SEO & Metadata
    useEffect(() => {
        document.title = "Алтай Марс (Кызыл-Чин): экскурсии и туры 2026";
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute('content', "Путешествие на Алтай Марс (Кызыл-Чин). Цветные горы, экскурсии, как добраться, маршруты и цены 2026. Туры с посещением Гейзерового озера.");
        }

        // JSON-LD Schema
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.text = JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Tour",
            "name": "Экскурсия на Алтай Марс (Кызыл-Чин)",
            "description": "Путешествие на другую планету, не покидая Алтая. Цветные горы Кызыл-Чина.",
            "image": "https://04travel.ru/images/mars/mars-kyzyl-chin-altay1.webp",
            "offers": {
                "@type": "Offer",
                "price": "3500", // Exemplary price
                "priceCurrency": "RUB",
                "availability": "https://schema.org/InStock",
                "url": "https://04travel.ru/алтай-марс-кызыл-чин-экскурсии-и-туры"
            },
            "areaServed": {
                "@type": "Place",
                "name": "Республика Алтай, Чаган-Узун"
            }
        });
        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, []);

    // 2. Data & Content
    const images = [
        '/images/mars/mars-kyzyl-chin-altay1-rotated.webp',
        '/images/Chagan-Uzun/chuyskiy-trakt-m52-chuya-altay-kyzyl-chin8.webp',
        '/images/mars/mars-kyzyl-chin-altay2-v5.webp',
        '/images/Chagan-Uzun/chuyskiy-trakt-m52-chuya-altay-kyzyl-chin19-v2.webp',
        '/images/Chagan-Uzun/chuyskiy-trakt-m52-chuya-altay-kyzyl-chin16-v2.webp',
        '/images/Chagan-Uzun/chuyskiy-trakt-m52-chuya-altay-kyzyl-chin25.webp'
    ];

    const [activeTab, setActiveTab] = useState<'route' | 'plan' | 'tips'>('plan');

    const scrollToBooking = () => {
        const element = document.getElementById('booking-block');
        if (element) element.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="bg-[#FAF9F6] text-[#2C3531] font-sans pb-24 md:pb-0 selection:bg-[#D4A373] selection:text-white">

            {/* --- 1. HERO SECTION (BENTO GRID & STORIES) --- */}
            <section className="relative w-full">

                {/* --- DESKTOP BENTO GRID (Hide on Mobile) --- */}
                <div className="hidden md:grid h-[85vh] grid-cols-4 grid-rows-2 gap-2 p-2">
                    {/* Main Large Image */}
                    <div className="col-span-2 row-span-2 relative rounded-2xl overflow-hidden group">
                        <img
                            src={images[0]}
                            alt="Алтай Марс главное фото"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        {/* Text Overlay for Desktop */}
                        <div className="absolute inset-0 flex flex-col justify-end p-12">
                            <span className="text-[#E0C097] uppercase tracking-[0.2em] font-bold mb-4 animate-fade-in-up">
                                Локация №1 на Алтае
                            </span>
                            <h1 className="text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-xl">
                                Алтай Марс<br />
                                <span className="text-4xl font-light text-white/90">Путешествие на красную планету</span>
                            </h1>
                            <button
                                onClick={scrollToBooking}
                                className="bg-white text-[#2C3531] px-8 py-3 rounded-full font-bold hover:bg-[#D4A373] hover:text-white transition-all w-max shadow-lg"
                            >
                                Забронировать тур
                            </button>
                        </div>
                    </div>

                    {/* Secondary Images */}
                    {images.slice(1, 5).map((img, idx) => (
                        <div key={idx} className="relative rounded-2xl overflow-hidden group cursor-pointer">
                            <img
                                src={img}
                                alt={`Алтай Марс фото ${idx + 2}`}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                        </div>
                    ))}
                </div>


                {/* --- MOBILE STORIES (Vertical Snap) --- */}
                <div className="md:hidden h-[100dvh] w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar">
                    {images.slice(0, 5).map((img, idx) => (
                        <div key={idx} className="w-full h-full snap-start relative">
                            <img
                                src={img}
                                alt={`Алтай Марс сторис ${idx + 1}`}
                                className="w-full h-full object-cover"
                            />
                            {/* Overlay only on the first slide for Title */}
                            {idx === 0 && (
                                <>
                                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80" />
                                    <div className="absolute bottom-24 left-6 right-6 text-center">
                                        <h1 className="text-5xl font-bold text-white mb-2 drop-shadow-lg leading-tight">
                                            Алтай Марс
                                        </h1>
                                        <p className="text-white/90 text-lg font-light mb-6">
                                            Кызыл-Чин
                                        </p>
                                        <div className="animate-bounce text-white/70 text-sm flex flex-col items-center">
                                            <span>Листай вниз</span>
                                            <span className="mt-1">↓</span>
                                        </div>
                                    </div>
                                </>
                            )}
                            {/* Simple gradient for others to ensure smooth look */}
                            {idx !== 0 && (
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                            )}
                        </div>
                    ))}
                </div>

            </section>


            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24 space-y-20">

                {/* --- 2. INTRO BLOCK --- */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#2C3531]">
                            Марсианские пейзажи <span className="text-[#D4A373]">земного происхождения</span>
                        </h2>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            Алтай Марс — это урочище Кызыл-Чин. Миллионы лет назад здесь было теплое субтропическое море или соленое озеро.
                            Разноцветные полосы гор — это слои глины с примесями оксидов железа (красный), марганца (фиолетовый) и хрома (желтый).
                        </p>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            Это место выводит представление о природе Алтая на новый уровень. Здесь нет лесов и бурных рек, только сюрреалистичная геометрия цвета.
                        </p>
                    </div>
                    <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
                        <img
                            src="/images/Chagan-Uzun/chuyskiy-trakt-m52-chuya-altay-kyzyl-chin30.webp" // Good texture shot
                            alt="Текстура гор Кызыл-Чин"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-4 py-2 rounded-xl text-sm font-semibold text-[#2C3531]">
                            📍 Чаган-Узун, 864 км Чуйского тракта
                        </div>
                    </div>
                </section>


                {/* --- 3. HIGHLIGHTS GRID --- */}
                <section>
                    <h3 className="text-2xl font-bold mb-8 text-center md:text-left">Что здесь интересного</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                        {[
                            { icon: "📸", title: "Фото-рай", desc: "Лучшие кадры на рассвете и закате" },
                            { icon: "🦕", title: "Окаменелости", desc: "Можно найти ракушки древнего моря" },
                            { icon: "🏜️", title: "Марс-1 и Марс-2", desc: "Две основные локации с разным рельефом" },
                            { icon: "🚙", title: "Джип-заброска", desc: "Приключение по руслу сухой реки" },
                        ].map((item, i) => (
                            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col items-center text-center md:items-start md:text-left">
                                <span className="text-4xl mb-4">{item.icon}</span>
                                <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                                <p className="text-sm text-gray-500">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>


                {/* --- 4. PLANNING TABS --- */}
                <section className="bg-white rounded-[2rem] shadow-xl overflow-hidden border border-gray-100">
                    <div className="flex border-b border-gray-100 overflow-x-auto no-scrollbar">
                        {(['plan', 'route', 'tips'] as const).map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`flex-1 py-6 px-4 text-center font-bold text-sm md:text-lg uppercase tracking-wider transition-colors whitespace-nowrap ${activeTab === tab ? 'bg-[#4A5D4E] text-white' : 'hover:bg-gray-50 text-gray-500'}`}
                            >
                                {tab === 'plan' ? 'Как добраться' : tab === 'route' ? 'Маршрут тура' : 'Советы'}
                            </button>
                        ))}
                    </div>
                    <div className="p-8 md:p-12 min-h-[300px]">
                        {activeTab === 'plan' && (
                            <div className="space-y-6 animate-fade-in">
                                <h4 className="text-2xl font-bold">Логистика до Марса</h4>
                                <p className="text-gray-700">
                                    Кызыл-Чин находится недалеко от села Чаган-Узун, примерно на 864-м километре Чуйского тракта.
                                    От асфальта до самих гор нужно проехать около 7 км по степи и руслу реки.
                                </p>
                                <ul className="space-y-4">
                                    <li className="flex items-start">
                                        <span className="bg-[#E0C097] text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 text-sm flex-shrink-0">1</span>
                                        <span>Доезжаем до села Чаган-Узун по Чуйскому тракту.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="bg-[#E0C097] text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 text-sm flex-shrink-0">2</span>
                                        <span>Пересаживаемся на подготовленные УАЗы или джипы (входит в наши туры).</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="bg-[#E0C097] text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 text-sm flex-shrink-0">3</span>
                                        <span>15-20 минут драйва — и вы на Марсе.</span>
                                    </li>
                                </ul>
                            </div>
                        )}
                        {activeTab === 'route' && (
                            <div className="space-y-6 animate-fade-in">
                                <h4 className="text-2xl font-bold">Примерный план дня</h4>
                                <div className="space-y-4 border-l-2 border-[#D4A373] pl-6 ml-2">
                                    <div className="relative">
                                        <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-[#D4A373] border-4 border-white"></div>
                                        <h5 className="font-bold">09:00 — Выезд с базы в Акташе</h5>
                                        <p className="text-sm text-gray-500">Фотостопы на фоне Северо-Чуйского хребта.</p>
                                    </div>
                                    <div className="relative">
                                        <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-[#D4A373] border-4 border-white"></div>
                                        <h5 className="font-bold">11:00 — Прибытие на Марс-1</h5>
                                        <p className="text-sm text-gray-500">Прогулка по каньонам, свободное время для фото.</p>
                                    </div>
                                    <div className="relative">
                                        <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-[#D4A373] border-4 border-white"></div>
                                        <h5 className="font-bold">13:00 — Треккинг к Марсу-2</h5>
                                        <p className="text-sm text-gray-500">Для желающих — прогулка 3 км к более фиолетовым горам.</p>
                                    </div>
                                    <div className="relative">
                                        <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-[#D4A373] border-4 border-white"></div>
                                        <h5 className="font-bold">15:00 — Обед-пикник</h5>
                                        <p className="text-sm text-gray-500">С видом на долину.</p>
                                    </div>
                                </div>
                            </div>
                        )}
                        {activeTab === 'tips' && (
                            <div className="grid md:grid-cols-2 gap-8 animate-fade-in">
                                <div>
                                    <h4 className="text-xl font-bold mb-4">Что взять с собой</h4>
                                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                                        <li>Удобную обувь (кроссовки/треккинговые ботинки) — глина может быть скользкой.</li>
                                        <li>Ветровку — в степи часто дует ветер.</li>
                                        <li>Солнцезащитные очки и крем — здесь много солнца.</li>
                                        <li>Powerbank — вы будете много фотографировать.</li>
                                    </ul>
                                </div>
                                <div className="bg-[#FAF9F6] p-6 rounded-xl">
                                    <h4 className="text-xl font-bold mb-4">Важно знать</h4>
                                    <p className="text-gray-600 mb-4">
                                        После дождя дорога становится непроходимой даже для джипов.
                                        Мы всегда следим за погодой и можем скорректировать время выезда ради вашей безопасности.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </section>


                {/* --- 5. INFO CARDS & INCLUDED --- */}
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Col: Included (2 spans) */}
                    <div className="lg:col-span-2 space-y-8">
                        <h3 className="text-2xl font-bold">Что включено в тур</h3>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {[
                                "Трансфер из Акташа/Горно-Алтайска",
                                "Заброска на внедорожниках",
                                "Сопровождение гида",
                                "Рекреационные сборы",
                                "Посещение Гейзерового озера (бонус)",
                                "Питьевая вода в дороге"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center space-x-3 bg-white p-4 rounded-xl border border-gray-100">
                                    <div className="w-6 h-6 rounded-full bg-[#E8F5E9] flex items-center justify-center text-[#4A5D4E]">✓</div>
                                    <span className="font-medium text-gray-700">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Col: Price Cards */}
                    <div className="space-y-4">
                        <div className="bg-[#2C3531] text-white p-6 rounded-2xl shadow-lg relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150"></div>
                            <h4 className="text-gray-400 uppercase text-xs font-bold tracking-widest mb-2">Групповой выезд</h4>
                            <div className="text-3xl font-bold mb-1">от 3 500 ₽</div>
                            <p className="text-sm text-gray-400 mb-4">с человека из Акташа</p>
                            <button onClick={scrollToBooking} className="w-full bg-white/20 hover:bg-white/30 text-white py-2 rounded-lg transition-colors">Выбрать</button>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                            <h4 className="text-gray-400 uppercase text-xs font-bold tracking-widest mb-2">Индивидуально</h4>
                            <div className="text-3xl font-bold mb-1 text-[#2C3531]">от 15 000 ₽</div>
                            <p className="text-sm text-gray-500 mb-4">за машину (до 4 чел)</p>
                            <button onClick={scrollToBooking} className="w-full border border-[#2C3531] text-[#2C3531] hover:bg-gray-50 py-2 rounded-lg transition-colors">Обсудить</button>
                        </div>
                    </div>
                </div>

                {/* --- 6. MAP PLACEHOLDER --- */}
                <section className="rounded-3xl overflow-hidden shadow-inner bg-gray-200 relative h-[400px] flex items-center justify-center group">
                    {/* Placeholder content */}
                    <div className="text-center z-10">
                        <span className="text-4xl mb-2 block text-gray-400">🗺️</span>
                        <h4 className="text-xl font-bold text-gray-500">Интерактивная карта маршрута</h4>
                        <p className="text-gray-400 text-sm">Горно-Алтайск — Чуйский тракт — Акташ — Кызыл-Чин</p>
                    </div>
                    {/* Fake Map BG */}
                    <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] opacity-10 bg-center bg-cover grayscale" />
                    <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur px-3 py-1 rounded-md text-xs text-gray-500">
                        Map data © 2026 OpenStreetMap
                    </div>
                </section>

                {/* --- 7. FAQ ACCORDION --- */}
                <section>
                    <h3 className="text-2xl font-bold mb-8">Частые вопросы (FAQ 2026)</h3>
                    <div className="space-y-4 max-w-3xl mx-auto">
                        {[
                            { q: "Нужна ли специальная подготовка?", a: "Нет, прогулка по Марсу доступна для людей с любой физической подготовкой и детей." },
                            { q: "Какую обувь надеть?", a: "Лучше всего кроссовки с нескользящей подошвой. После дождя глина очень скользкая, белые кеды лучше оставить в машине." },
                            { q: "Есть ли там связь?", a: "На самом Марсе связь ловит местами (МТС, Билайн), но интернет слабый. Лучше наслаждаться видами." },
                            { q: "Когда лучше ехать?", a: "Идеально — с мая по сентябрь. Осенью (сентябрь) цвета становятся особенно контрастными на фоне желтой листвы в долине." }
                        ].map((item, i) => (
                            <details key={i} className="group bg-white border border-gray-100 rounded-xl overflow-hidden cursor-pointer shadow-sm">
                                <summary className="flex justify-between items-center p-5 font-medium text-lg text-[#2C3531] list-none select-none hover:bg-gray-50 transition-colors">
                                    {item.q}
                                    <span className="transform transition-transform group-open:rotate-180 text-[#D4A373]">▼</span>
                                </summary>
                                <div className="px-5 pb-5 text-gray-600 leading-relaxed border-t border-gray-50 pt-4">
                                    {item.a}
                                </div>
                            </details>
                        ))}
                    </div>
                </section>

                {/* --- 8. FOOTER / CONTACT (ID for scrolling) --- */}
                <div id="booking-block" className="bg-[#4A5D4E] rounded-[2.5rem] p-8 md:p-16 text-center text-white relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('/img/noise.png')] opacity-10"></div>
                    <div className="relative z-10 max-w-2xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Готовы к марсианским хроникам?</h2>
                        <p className="text-lg text-white/80 mb-10">
                            Оставьте заявку, и мы организуем ваше путешествие «под ключ».
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a href="https://t.me/travel_ra" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center bg-white text-[#4A5D4E] px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition shadow-lg">
                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" /></svg>
                                Написать в Telegram
                            </a>
                            <a href="https://vk.com/domgornii" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center border-2 border-white/30 hover:bg-white/10 text-white px-8 py-4 rounded-full font-bold transition">
                                ВКонтакте
                            </a>
                        </div>
                    </div>
                </div>

            </div>

            {/* --- 9. MOBILE FLOATING CTA  --- */}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden w-[90%] max-w-sm">
                <button
                    onClick={scrollToBooking}
                    className="w-full bg-[#4A5D4E]/95 backdrop-blur-md text-white py-4 rounded-2xl font-bold shadow-2xl border border-white/20 flex items-center justify-center space-x-2 animate-bounce-subtle"
                >
                    <span>🚀</span>
                    <span>Забронировать место</span>
                </button>
            </div>

        </div>
    );
};

export default MarsPage;
