import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ToursHubPage from './pages/ToursHubPage';
import TourDetailPage from './pages/TourDetailPage';
import LocationsHubPage from './pages/LocationsHubPage';
import LocationDetailPage from './pages/LocationDetailPage';
import BlogHubPage from './pages/BlogHubPage';
import PostDetailPage from './pages/PostDetailPage';
import BookingPage from './pages/BookingPage';
import ExcursionsHubPage from './pages/ExcursionsHubPage';
import ExcursionDetailPage from './pages/ExcursionDetailPage';
import NotFoundPage from './pages/NotFoundPage';
import ContactPage from './pages/ContactPage';
import { TOUR_SLUGS_SET, LOCATION_SLUGS_SET, EXCURSION_SLUGS_SET, SLUG_ALIASES } from './services/contentService';

export interface ViewState {
  page: string;
  params?: { [key: string]: string };
  hash?: string;
}

const resolveViewFromPath = (path: string): ViewState => {
  const url = new URL(path, window.location.origin);
  let slug = url.pathname.startsWith('/') ? url.pathname.substring(1) : url.pathname;
  slug = slug.endsWith('/') ? slug.slice(0, -1) : slug;

  const params: { [key: string]: string } = {};
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.forEach((value, key) => {
    params[key] = value;
  });

  if (slug === '') {
    return { page: 'home', params };
  }

  const staticPages: { [key: string]: string } = {
    'tury': 'tury',
    'ekskursii': 'ekskursii',
    'lokatsii': 'lokatsii',
    'blog': 'blog',
    'domiki': 'domiki',
    'contact': 'contact',
  };

  if (staticPages[slug]) {
    return { page: staticPages[slug], params };
  }

  try {
    const decodedSlug = decodeURIComponent(slug);
    const canonicalSlug = SLUG_ALIASES[decodedSlug] || decodedSlug;

    if (TOUR_SLUGS_SET.has(canonicalSlug)) {
      return { page: 'tourDetail', params: { ...params, tourId: encodeURIComponent(canonicalSlug) } };
    }
    if (LOCATION_SLUGS_SET.has(canonicalSlug)) {
      return { page: 'locationDetail', params: { ...params, locationId: encodeURIComponent(canonicalSlug) } };
    }
    if (EXCURSION_SLUGS_SET.has(canonicalSlug)) {
      return { page: 'excursionDetail', params: { ...params, excursionId: encodeURIComponent(canonicalSlug) } };
    }

    return { page: 'postDetail', params: { ...params, postId: canonicalSlug } };

  } catch (e) {
    console.warn("Could not resolve path:", path, e);
    return { page: '404', params };
  }
};

const resolvePathFromView = (view: ViewState): string => {
  let path = '';
  switch (view.page) {
    case 'home':
      path = '/';
      break;
    case 'tury':
    case 'ekskursii':
    case 'lokatsii':
    case 'blog':
    case 'domiki':
    case 'contact':
      path = `/${view.page}`;
      break;
    case 'tourDetail':
      path = `/${view.params?.tourId || ''}`;
      break;
    case 'locationDetail':
      path = `/${view.params?.locationId || ''}`;
      break;
    case 'excursionDetail':
      path = `/${view.params?.excursionId || ''}`;
      break;
    case 'postDetail':
      path = `/${view.params?.postId || ''}`;
      break;
    default:
      path = '/404';
  }

  // Append query params if they exist
  if (view.params) {
    const internalParams = ['tourId', 'locationId', 'excursionId', 'postId'];
    const queryParams = new URLSearchParams();
    Object.entries(view.params).forEach(([key, value]) => {
      if (!internalParams.includes(key)) {
        queryParams.append(key, value);
      }
    });
    const queryString = queryParams.toString();
    if (queryString) {
      path += (path.includes('?') ? '&' : '?') + queryString;
    }
  }

  return path;
};

const App: React.FC = () => {
  const [history, setHistory] = useState<ViewState[]>([resolveViewFromPath(window.location.pathname)]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const view = history[currentIndex];
  const canGoBack = currentIndex > 0;
  const canGoForward = currentIndex < history.length - 1;

  const navigate = (newView: ViewState) => {
    const currentView = history[currentIndex];
    const newPath = resolvePathFromView(newView);
    const currentPath = resolvePathFromView(currentView);

    if (newPath === currentPath && newView.hash === currentView.hash) {
      // Даже если состояние одинаковое, если есть хеш, пробуем скроллить снова
      if (newView.hash) {
        const id = newView.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
      return;
    }

    const newHistory = history.slice(0, currentIndex + 1);
    newHistory.push(newView);
    setHistory(newHistory);
    const newIndex = newHistory.length - 1;
    setCurrentIndex(newIndex);

    try {
      const path = resolvePathFromView(newView);
      if (window.location.pathname !== path) {
        window.history.pushState({ page: newView.page }, '', path);
      }
    } catch (e) {
      if (e instanceof DOMException && e.name === 'SecurityError') {
        console.warn('history.pushState was blocked due to security restrictions.');
      } else {
        throw e;
      }
    }
  };

  const goBack = () => {
    if (canGoBack) {
      setCurrentIndex(prevIndex => prevIndex - 1);
    }
  };

  const goForward = () => {
    if (canGoForward) {
      setCurrentIndex(prevIndex => prevIndex + 1);
    }
  };


  useEffect(() => {
    const handlePopState = () => {
      const newViewOnPop = resolveViewFromPath(window.location.pathname);
      const newPath = resolvePathFromView(newViewOnPop);
      const existingIndex = history.findIndex(v => resolvePathFromView(v) === newPath);

      if (existingIndex !== -1) {
        setCurrentIndex(existingIndex);
      } else {
        navigate(newViewOnPop);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [history]);

  useEffect(() => {
    if (view.hash) {
      const id = view.hash.replace('#', '');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [view]);

  useEffect(() => {
    if (!view.hash) {
      window.scrollTo(0, 0);
    }
  }, [view.page, view.params]);

  const renderContent = () => {
    const detailPageProps = {
      setView: navigate,
      goBack,
      goForward,
      canGoBack,
      canGoForward,
    };

    switch (view.page) {
      case 'home':
        return <HomePage setView={navigate} />;
      case 'tury':
        return <ToursHubPage setView={navigate} />;
      case 'tourDetail':
        return view.params?.tourId ? <TourDetailPage tourId={view.params.tourId} {...detailPageProps} /> : <NotFoundPage setView={navigate} />;
      case 'ekskursii':
        return <ExcursionsHubPage setView={navigate} />;
      case 'excursionDetail':
        return view.params?.excursionId ? <ExcursionDetailPage excursionId={view.params.excursionId} {...detailPageProps} /> : <NotFoundPage setView={navigate} />;
      case 'lokatsii':
        return <LocationsHubPage setView={navigate} />;
      case 'locationDetail':
        return view.params?.locationId ? <LocationDetailPage locationId={view.params.locationId} {...detailPageProps} /> : <NotFoundPage setView={navigate} />;
      case 'blog':
        return <BlogHubPage setView={navigate} />;
      case 'postDetail':
        return view.params?.postId ? <PostDetailPage postId={view.params.postId} {...detailPageProps} /> : <NotFoundPage setView={navigate} />;
      case 'domiki':
        return <BookingPage />;
      case 'contact':
        return <ContactPage params={view.params} setView={navigate} />;
      default:
        return <NotFoundPage setView={navigate} />;
    }
  };

  return (
    <Layout view={view} setView={navigate}>
      {renderContent()}
    </Layout>
  );
};

export default App;
