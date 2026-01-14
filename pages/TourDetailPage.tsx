import React, { useEffect, useState, useRef } from 'react';
import { getAllPages, TOURS_DATA, TOUR_SLUGS_SET, LOCATION_SLUGS_SET, EXCURSION_SLUGS_SET, SLUG_ALIASES } from '../services/contentService.ts';
import NotFoundPage from './NotFoundPage';
import type { IPageData } from '../types';
import type { ViewState } from '../App';
import PageNavigator from '../components/PageNavigator';
import BookingActions from '../components/BookingActions';

interface TourDetailPageProps {
  tourId: string;
  setView: (view: ViewState) => void;
  goBack: () => void;
  goForward: () => void;
  canGoBack: boolean;
  canGoForward: boolean;
}

const TourDetailPage: React.FC<TourDetailPageProps> = ({ tourId, setView }) => {
  const [page, setPage] = useState<IPageData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const decodedSlug = decodeURIComponent(tourId || '');
  const currentIndex = TOURS_DATA.findIndex(t => t.slug.toLowerCase() === decodedSlug.toLowerCase());

  const canGoBackInList = currentIndex > 0;
  const canGoForwardInList = currentIndex < TOURS_DATA.length - 1;

  const handleGoBack = () => {
    if (canGoBackInList) {
      const prevTour = TOURS_DATA[currentIndex - 1];
      setView({ page: 'tourDetail', params: { tourId: encodeURIComponent(prevTour.slug) } });
    }
  };

  const handleGoForward = () => {
    if (canGoForwardInList) {
      const nextTour = TOURS_DATA[currentIndex + 1];
      setView({ page: 'tourDetail', params: { tourId: encodeURIComponent(nextTour.slug) } });
    }
  };

  useEffect(() => {
    const run = async () => {
      setIsLoading(true);
      setError(null);
      try {
        if (!decodedSlug) {
          setPage(null);
          return;
        }

        const tourDefinition = TOURS_DATA[currentIndex];

        if (!tourDefinition) {
          setPage(null);
          return;
        }

        const allPages = await getAllPages();
        const foundPage = allPages.find(p => p.wp_id === tourDefinition.wp_id);

        if (foundPage) {
          setPage({ ...foundPage, title: tourDefinition.title });
        } else {
          console.error(`Контент для тура с wp_id=${tourDefinition.wp_id} (${tourDefinition.title}) не найден в JSON!`);
          setPage(null);
        }

      } catch (e: any) {
        console.error("Error loading tour detail:", e);
        setError("Не удалось загрузить данные тура.");
      } finally {
        setIsLoading(false);
      }
    };

    run();
  }, [tourId, currentIndex]);

  useEffect(() => {
    const contentElement = contentRef.current;
    if (!contentElement) return;

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const link = target.closest('a');

      if (!link || !link.href) return;

      if (link.target === '_blank' || event.ctrlKey || event.metaKey) {
        return;
      }

      const url = new URL(link.href);

      const isInternal = url.host === window.location.host || url.hostname === '04travel.ru';
      if (!isInternal) {
        return;
      }

      if (url.pathname === window.location.pathname && url.hash) {
        return;
      }

      event.preventDefault();

      let slug = url.pathname;
      slug = slug.startsWith('/') ? slug.substring(1) : slug;
      slug = slug.endsWith('/') ? slug.slice(0, -1) : slug;

      const staticPages: { [key: string]: string } = {
        'tury': 'tury',
        'ekskursii': 'ekskursii',
        'lokatsii': 'lokatsii',
        'blog': 'blog',
        'domiki': 'domiki',
        '': 'home',
      };

      if (slug in staticPages) {
        setView({ page: staticPages[slug] });
        return;
      }

      try {
        const decodedSlug = decodeURIComponent(slug);
        const canonicalSlug = SLUG_ALIASES[decodedSlug] || decodedSlug;

        if (TOUR_SLUGS_SET.has(canonicalSlug)) {
          setView({ page: 'tourDetail', params: { tourId: encodeURIComponent(canonicalSlug) } });
        } else if (LOCATION_SLUGS_SET.has(canonicalSlug)) {
          setView({ page: 'locationDetail', params: { locationId: encodeURIComponent(canonicalSlug) } });
        } else if (EXCURSION_SLUGS_SET.has(canonicalSlug)) {
          setView({ page: 'excursionDetail', params: { excursionId: encodeURIComponent(canonicalSlug) } });
        } else {
          setView({ page: 'postDetail', params: { postId: slug } });
        }
      } catch (e) {
        console.error("Failed to handle internal navigation for slug:", slug, e);
      }
    };

    contentElement.addEventListener('click', handleClick);

    return () => {
      contentElement.removeEventListener('click', handleClick);
    };
  }, [page, setView]);

  const rawHtml = page?.contentHtml || '';

  if (isLoading) {
    return (
      <div className="text-center py-40 animate-pulse font-archival">
        <div className="w-10 h-10 border-4 border-[#A68B67] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        Загрузка контента...
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-40 text-red-500 font-archival">{error}</div>;
  }

  if (!page) {
    return <NotFoundPage setView={setView} />;
  }

  return (
    <div className="bg-white/70 glass-card rounded-[2.5rem] p-6 md:p-12 border border-white/50 shadow-sm">
      <PageNavigator
        goBack={handleGoBack}
        goForward={handleGoForward}
        canGoBack={canGoBackInList}
        canGoForward={canGoForwardInList}
      />
      <div
        ref={contentRef}
        className="content-container wp-content prose max-w-none text-[#2C3531]"
        dangerouslySetInnerHTML={{ __html: rawHtml }}
      />
      <BookingActions />
    </div>
  );
};

export default TourDetailPage;