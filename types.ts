// Общие типы данных для проекта

export enum TourCategory {
  TREKKING = 'trekking',
  AUTO = 'auto',
  RELAX = 'relax'
}

export interface Review {
  id: string;
  author: string;
  platform: 'Yandex' | '2GIS' | 'Google';
  rating: number;
  date: string;
  text: string;
  locationId: string;
  avatar: string;
}

export interface LocationExperience {
  id: string;
  name: string;
  description: string;
  media: Array<{
    type: 'image' | 'video';
    url: string;
    title: string;
    thumbnail?: string;
    link?: string;
  }>;
  reviews: Review[];
  externalWidget?: {
    platform: string;
    url: string;
  };
}

export interface Tour {
  id: string;
  slug?: string;
  title: string;
  category: TourCategory;
  price: number;
  duration: string;
  intensity: 'Низкая' | 'Средняя' | 'Высокая';
  comfort: 'Базовый' | 'Стандарт' | 'Премиум';
  description: string;
  image: string;
  tags: string[];
}

export interface PricingItem {
  title: string;
  pricePerPerson: number;
  minPrice: number;
  isFeatured?: boolean;
}

export interface PricingRegion {
  id: string;
  name: string;
  items: PricingItem[];
}

export interface LogisticsFlight {
  destination: string;
  airline: string;
  time: string;
  period: string;
}

// Определение структуры данных для одного тура в константах
export interface ITourDefinition {
  wp_id: string;
  title: string;
  slug: string; // Используем кириллицу для slug для единообразия
  image?: string;
}

// Интерфейс для данных страницы из WordPress (используется в contentService)
export interface IPageData {
  wp_id: string; // Поле обязательно для сопоставления
  title: string;
  url: string;
  slug: string;
  published: string;
  modified: string;
  contentHtml: string;
}

// Интерфейс для комментария из WordPress REST API
export interface IComment {
  id: number;
  author_name: string;
  author_avatar_url: string;
  date: string;
  content: string;
  parent: number;
}