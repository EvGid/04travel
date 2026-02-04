// This file is the source of truth for app-wide constants.
import { TourCategory } from './types';
import type { Tour, LogisticsFlight, PricingRegion, Review, LocationExperience, ITourDefinition } from './types';

export const REVIEWS: Review[] = [
  {
    id: 'r1',
    author: 'Александр М.',
    platform: 'Yandex',
    rating: 5,
    date: 'Август 2025',
    text: 'Потрясающая организация! Заброска на Ретранслятор прошла идеально. Виды — космос, водитель — профи.',
    locationId: 'aktash',
    avatar: 'https://i.pravatar.cc/150?u=a1'
  },
  {
    id: 'r2',
    author: 'Елена С.',
    platform: '2GIS',
    rating: 5,
    date: 'Июль 2025',
    text: 'Были на Кату-Ярык. Это было самое яркое впечатление лета. Спасибо 04travel за комфорт и безопасность.',
    locationId: 'ulagan',
    avatar: 'https://i.pravatar.cc/150?u=a2'
  },
  {
    id: 'r3',
    author: 'Игорь В.',
    platform: 'Yandex',
    rating: 5,
    date: 'Сентябрь 2025',
    text: 'Укок — это место силы. Нас везли на подготовленном джипе, все продумано до мелочей. Обязательно вернусь в 2026!',
    locationId: 'kosh-agach',
    avatar: 'https://i.pravatar.cc/150?u=a3'
  }
];

export const EXPERIENCES: LocationExperience[] = [
  {
    id: 'aktash',
    name: 'Акташ и Ретранслятор',
    description: 'Панорамные виды на Северо-Чуйский хребет с высоты 3000 метров.',
    media: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1541336032412-2048a678540d?auto=format&fit=crop&q=80&w=800', title: 'Рассвет на Ретрансляторе' },
      { type: 'video', url: '#', thumbnail: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800', title: 'Драйв по серпантину' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800', title: 'Мажойский каскад' }
    ],
    reviews: REVIEWS.filter(r => r.locationId === 'aktash'),
    externalWidget: {
      platform: '2GIS',
      url: 'https://2gis.ru/gornoaltaysk/firm/70000001032822557/tab/reviews'
    }
  },
  {
    id: 'ulagan',
    name: 'Улаганские перевалы',
    description: 'Дорога в долину Чулышмана сквозь облака и красные ворота.',
    media: [
      { type: 'image', url: '/images/pereval-katu-yaryk-dolina-chulyshman-altay12.webp', title: 'Кату-Ярык сверху', link: '/location/долина-чулышмана' },
      { type: 'video', url: '#', thumbnail: '/images/pereval-katu-yaryk-dolina-chulyshman-altay1.webp', title: 'Спуск в долину', link: '/location/долина-чулышмана' }
    ],
    reviews: REVIEWS.filter(r => r.locationId === 'ulagan')
  }
];

export const REGIONAL_PRICES: PricingRegion[] = [
  {
    id: 'aktash',
    name: 'Акташ 2026',
    items: [
      { title: 'Акташский ретранслятор', pricePerPerson: 2800, minPrice: 11200, isFeatured: true },
      { title: 'Озеро Горных духов', pricePerPerson: 2800, minPrice: 11200 },
      { title: 'Чуйские меандры', pricePerPerson: 2200, minPrice: 8800 },
      { title: 'Ретранслятор + Меандры', pricePerPerson: 3800, minPrice: 15200 },
      { title: 'Карагемский прорыв', pricePerPerson: 3500, minPrice: 14000 },
    ],
  },
  {
    id: 'ulagan',
    name: 'Улаган 2026',
    items: [
      { title: 'Перевал Кату-Ярык', pricePerPerson: 3000, minPrice: 12000, isFeatured: true },
      { title: 'Каменные грибы', pricePerPerson: 3500, minPrice: 14000 },
      { title: 'Водопад Учар (заброска)', pricePerPerson: 4500, minPrice: 18000 },
    ],
  },
  {
    id: 'kosh-agach',
    name: 'Кош-Агач 2026',
    items: [
      { title: 'Алтайский Марс (Кызыл-Чин)', pricePerPerson: 2500, minPrice: 10000 },
      { title: 'Плато Укок (1 день, обзорно)', pricePerPerson: 7500, minPrice: 30000, isFeatured: true },
      { title: 'Теплый ключ (Джумалинские источники)', pricePerPerson: 5000, minPrice: 20000 },
    ],
  },
];

export const TOURS: Tour[] = [
  {
    id: 'grand-tour',
    slug: 'золотое-кольцо-алтая',
    title: 'Золотое кольцо Алтая: Гранд-тур',
    category: TourCategory.AUTO,
    price: 85000,
    duration: '10 дней',
    intensity: 'Средняя',
    comfort: 'Стандарт',
    description: 'Самый полный и насыщенный маршрут, который позволяет увидеть все главные жемчужины Алтая за одно путешествие.',
    image: 'https://images.unsplash.com/photo-1541336032412-2048a678540d?auto=format&fit=crop&q=80&w=1200',
    tags: ['все включено', 'гранд-тур', 'хит'],
  },
  {
    id: 'belukha-trek',
    slug: 'маршрут-к-подножию-белухи',
    title: 'К подножию Белухи',
    category: TourCategory.TREKKING,
    price: 65000,
    duration: '12 дней',
    intensity: 'Высокая',
    comfort: 'Базовый',
    description: 'Духовное паломничество к самой высокой и почитаемой вершине Сибири.',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1200',
    tags: ['треккинг', 'белуха', 'место силы'],
  },
  {
    id: 'shavlinskie-lakes',
    slug: 'конный-тур-шавлинские-озера',
    title: 'Конный тур к Шавлинским озерам',
    category: TourCategory.RELAX,
    price: 72000,
    duration: '9 дней',
    intensity: 'Средняя',
    comfort: 'Базовый',
    description: 'Ощутите себя настоящим кочевником в походе к жемчужине Алтая — Шавлинским озерам.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=1200',
    tags: ['кони', 'озера', 'романтика'],
  },
];

export const FLIGHTS: LogisticsFlight[] = [
  { destination: 'Москва (SVO)', airline: 'Aeroflot', time: '07:30, 22:15', period: 'Ежедневно' },
  { destination: 'Новосибирск (OVB)', airline: 'S7 Airlines', time: '10:00, 18:45', period: 'Ежедневно' },
  { destination: 'Красноярск (KJA)', airline: 'Nordstar', time: '14:20', period: 'Пн, Ср, Пт' },
  { destination: 'Екатеринбург (SVX)', airline: 'Ural Airlines', time: '09:00', period: 'Вт, Сб' },
];

export const TOURS_DATA: ITourDefinition[] = [
  { wp_id: '55', title: 'Маршрут к подножию Белухи', slug: 'маршрут-к-подножию-белухи' },
  { wp_id: '62', title: 'Зимний Алтай: Ледовые чудеса', slug: 'зимний-алтай-ледовые-чудеса' },
  { wp_id: '101', title: 'Фото-тур по Чуйскому тракту', slug: 'фото-тур-чуйский-тракт' },
  { wp_id: '115', title: 'Тур из Москвы на Алтай "Перезагрузка"', slug: 'тур-из-москвы-на-алтай' },
  { wp_id: '122', title: 'Тур из Новосибирска на Алтай "Сердце Сибири"', slug: 'тур-из-новосибирска-на-алтай' },
  { wp_id: '201', title: 'Золотое кольцо Алтая: Гранд-тур', slug: 'золотое-кольцо-алтая' },
  { wp_id: '230', title: 'Конный тур к Шавлинским озерам', slug: 'конный-тур-шавлинские-озера' },
  { wp_id: '301', title: 'Семейный тур "Алтай для детей"', slug: 'семейный-тур-алтай-для-детей' },
  { wp_id: '310', title: 'Гастрономический тур "Вкусы Алтая"', slug: 'гастрономический-тур-вкусы-алтая' },
  { wp_id: '330', title: 'Йога-тур "Перезагрузка в горах"', slug: 'йога-тур-перезагрузка' },
  { wp_id: '350', title: 'VIP-тур "Алтай. Премиум"', slug: 'вип-тур-алтай-премиум' },
  { wp_id: '360', title: 'Корпоративные туры на Алтай', slug: 'корпоративные-туры-на-алтай' },
  { wp_id: '401', title: 'Тур "Марсианские хроники"', slug: 'тур-марсианские-хроники' },
  { wp_id: '430', title: 'Этно-тур "Дух кочевников"', slug: 'этно-тур-дух-кочевников' },
  { wp_id: '440', title: 'Тур "Ледники Актру"', slug: 'тур-ледники-актру' },
  { wp_id: '460', title: 'Осенний фото-тур "Золото Алтая"', slug: 'осенний-фото-тур' },
  { wp_id: '480', title: 'Ретрит-тур "Тишина"', slug: 'ретрит-тур-тишина' },
  { wp_id: '490', title: 'Свадебный тур на Алтае', slug: 'свадебный-тур-на-алтае' },
  { wp_id: '530', title: 'Ски-тур на Алтае', slug: 'ски-тур-на-алтае' },
  { wp_id: '540', title: 'Джип-тур на Каракольские озера', slug: 'джип-тур-каракольские-озера' },
  { wp_id: '40', title: 'О нас', slug: 'о-нас' },
  { wp_id: '3', title: 'Политика конфиденциальности', slug: 'политика-конфиденциальности' },
];

export const TOUR_TITLES_SET = new Set<string>(TOURS_DATA.map(t => t.title));

export const LOCATIONS_PAGE_DEFINITIONS: ITourDefinition[] = [
  { wp_id: '245', title: 'Локация: Плато Укок', slug: 'плато-укок' },
  { wp_id: '255', title: 'Локация: Телецкое озеро', slug: 'телецкое-озеро' },
  { wp_id: '320', title: 'Локация: Долина Чулышмана', slug: 'долина-чулышмана' },
  { wp_id: '410', title: 'Локация: Гейзерное озеро', slug: 'гейзерное-озеро' },
  { wp_id: '450', title: 'Локация: Северо-Чуйский хребет', slug: 'северо-чуйский-хребет' },
  { wp_id: '500', title: 'Локация: Каменные грибы Аккурум', slug: 'каменные-грибы' },
  { wp_id: '550', title: 'Локация: Чуйский тракт', slug: 'чуйский-тракт' },
];

export const EXCURSIONS_PAGE_DEFINITIONS: ITourDefinition[] = [
  { wp_id: '540', title: 'Экскурсия на Каракольские озера', slug: 'джип-тур-каракольские-озера' },
  { wp_id: '401', title: 'Экскурсия на Алтайский Марс', slug: 'тур-марсианские-хроники' },
  { wp_id: '410', title: 'Экскурсия на Гейзерное озеро', slug: 'гейзерное-озеро' },
  { wp_id: '25', title: 'Джип-тур на Акташский ретранслятор', slug: 'джип-туры-на-алтай' }
];

export const EXCLUDED_SLUGS_FOR_BLOG = new Set([
  'tury-na-altay', 'tury-na-altay-iz-moskvy', 'tury-na-altay-iz-sibiri', 'tury-na-altay-iz-novosibirska',
  'tury-na-altay-iz-barnaula', 'tury-na-altay-iz-krasnoyarska', 'tury-na-altay-iz-omska', 'tury-na-altay-iz-tomska',
  'tury-na-altay-iz-kemerovo', 'tury-na-altay-iz-novokuznecka', 'tury-na-altay-iz-irkutska', 'ekskursii-po-gornomu-altayu',
  'odnodnevnye-ekskursii-gorno-altaysk', 'tury-vyhodnogo-dnya-na-altay', 'chuyskiy-trakt-tury-i-marshrut',
  'teleckoe-ozero-tury-i-ekskursii', 'geyzerovoe-ozero-na-altae-kak-popast', 'pereval-katu-yaryk',
  'dolina-chulyshmana', 'vodopad-uchar', 'altay-mars-kyzyl-chin-ekskursii-i-tury', 'ust-koksa', 'beluha',
  'tury-na-altay-2026', 'tury-na-altay-2025', 'dzhip-tury-po-altayu', 'konnye-tury-na-altae', 'splav-po-katuni-na-altae',
  'tury-na-gornyy-altay', 'tury-na-altay-s-pereletom', 'novyy-god-na-altae-2026-tury-i-otdyh', 'bronirovanie-tura',
  'kontakty', 'o-nas', 'chavo', 'blog', 'politika-konfidencialnosti', 'individualnye-tury-na-altae',
  'tury-na-altay-na-3-dnya', 'tury-na-altay-5-dney', 'individualnye-tury-na-altae',
]);
