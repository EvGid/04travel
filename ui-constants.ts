import { TourCategory } from './types';

export const REVIEWS = [
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

export const EXPERIENCES = [
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
      rating: '4.9 / 4.9',
      url: 'https://2gis.ru/gornoaltaysk/firm/70000001075445874/tab/reviews?utm_source=widget_firm'
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

export const REGIONAL_PRICES = [
  {
    id: 'aktash',
    name: 'Акташ 2026',
    items: [
      { title: 'Акташский ретранслятор', pricePerPerson: 2800, minPrice: 11200 },
      { title: 'Озеро Горных духов', pricePerPerson: 2800, minPrice: 11200 },
      { title: 'Чуйские меандры', pricePerPerson: 2200, minPrice: 8800 },
      { title: 'Ретранслятор + Меандры', pricePerPerson: 3800, minPrice: 15200 },
      { title: 'Сердце АЛТАЯ г. Сардыма', pricePerPerson: 5500, minPrice: 22000, isFeatured: true },
    ]
  },
  {
    id: 'kosh-agach',
    name: 'Кош-Агач 2026',
    items: [
      { title: 'Софийский ледник', pricePerPerson: 8500, minPrice: 34000 },
      { title: 'Марс 1, 2 и Луна', pricePerPerson: 4000, minPrice: 16000 },
      { title: 'Плато Укок (5 дней)', pricePerPerson: 25000, minPrice: 100000, isFeatured: true },
    ]
  }
];

export const FLIGHTS = [
  { destination: 'Москва', airline: 'S7 Airlines', time: '09:15', period: 'Ежедневно' },
  { destination: 'Новосибирск', airline: 'S7 Airlines', time: '17:55', period: 'Ежедневно' }
];

export const COLORS = {
  sand: '#F5F1E9',
  moss: '#4A5D4E',
  earth: '#A68B67',
  slate: '#2C3531'
};

// Промо-туры для главной страницы (Bento Grid). 
// Данные основаны на реальных турах из TOURS_DATA, но дополнены для визуального представления.
export const TOURS = [
  {
    id: 'promo-1',
    slug: 'джип-туры-по-алтаю',
    title: 'Джип-туры по Алтаю',
    category: TourCategory.AUTO,
    price: 45000,
    duration: 'от 5 дней',
    intensity: 'Средняя',
    comfort: 'Стандарт',
    description: 'Покоряйте самые труднодоступные локации на подготовленных внедорожниках. Увидьте Алтай таким, каким его видят единицы.',
    image: '/images/chuyskiy-trakt-doroga-altay3.webp',
    tags: ['Джипы', 'Экспедиция', 'Чуйский тракт'],
  },
  {
    id: 'promo-2',
    slug: 'белуха',
    title: 'Треккинг к Белухе',
    category: TourCategory.TREKKING,
    price: 65000,
    duration: '9 дней',
    intensity: 'Высокая',
    comfort: 'Базовый',
    description: 'Классический пеший маршрут к сердцу Алтая — подножию священной горы Белуха.',
    image: '/images/chuyskiy-trakt-doroga-altay2.webp',
    tags: ['Треккинг', 'Горы', 'Белуха'],
  },
  {
    id: 'promo-3',
    slug: 'телецкое-озеро-туры-и-экскурсии',
    title: 'Магия Телецкого озера',
    category: TourCategory.RELAX,
    price: 38000,
    duration: '4 дня',
    intensity: 'Низкая',
    comfort: 'Премиум',
    description: 'Спокойный отдых на "младшем брате Байкала". Водопады, катерные прогулки и уединение.',
    image: '/images/teleckoe-ozero-artybash-altay12.webp',
    tags: ['Озеро', 'Релакс', 'Семья'],
  },
];
