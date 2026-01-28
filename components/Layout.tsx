import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import SocialLinks from './SocialLinks';
import Footer from './Footer';
import ChatbudAssistant from './ChatbudAssistant';
import ScrollToTop from './ScrollToTop';
import CookieConsent from './CookieConsent';
import type { ViewState } from '../App';

const navigation = [
  { name: 'Туры', key: 'tury' },
  { name: 'Экскурсии', key: 'ekskursii' },
  { name: 'Локации', key: 'lokatsii' },
  { name: 'Блог', key: 'blog', href: 'https://wp.04travel.ru' },
  { name: 'Домики', key: 'domiki' },
];

interface LayoutProps {
  children: React.ReactNode;
  view: ViewState;
  setView: React.Dispatch<React.SetStateAction<ViewState>>;
}

const Layout: React.FC<LayoutProps> = ({ children, view, setView }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [view]);

  const isHomePage = view.page === 'home';
  const mainContentClass = isHomePage
    ? ''
    : 'max-w-7xl mx-auto px-6 md:px-12';

  const handleNavClick = (pageKey: string) => {
    setView({ page: pageKey });
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F5F1E9] selection:bg-[#A68B67] selection:text-white">
      <header className="fixed top-0 left-0 right-0 z-50 p-4">
        <nav className="flex justify-between items-center px-6 py-3 glass-card rounded-full shadow-lg max-w-7xl mx-auto">
          <button onClick={() => handleNavClick('home')} className="flex items-center gap-2 shrink-0 group">
            <div className="w-10 h-10 rounded-full border border-[#2C3531]/80 flex items-center justify-center p-1.5 transition-transform group-hover:scale-110">
              <Logo className="w-full h-full text-[#2C3531]" />
            </div>
            <span className="text-lg font-medium text-[#2C3531] tracking-wide">04travel</span>
          </button>

          <div className="hidden lg:flex gap-8 text-sm font-medium text-[#2C3531]/80">
            {navigation.map((item) => (
              item.href ? (
                <a
                  key={item.name}
                  href={item.href}
                  className="transition-colors hover:text-[#A68B67]"
                >
                  {item.name}
                </a>
              ) : (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.key)}
                  className={`transition-colors ${view.page === item.key ? 'text-[#A68B67] font-bold' : 'hover:text-[#A68B67]'}`}
                >
                  {item.name}
                </button>
              )
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden sm:block">
              <SocialLinks light={false} />
            </div>
            <a href="tel:+79635106746" className="px-4 sm:px-6 py-2 bg-[#4A5D4E] text-white rounded-full text-sm font-semibold hover:bg-[#3d4d41] transition-all transform hover:scale-105 active:scale-95 shadow-md">
              Позвонить
            </a>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 rounded-full hover:bg-black/5 transition-colors z-20">
              <svg className="w-6 h-6 text-[#2C3531]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden" onClick={() => setIsMenuOpen(false)}>
          <div className="mobile-menu-container fixed top-24 left-4 right-4 bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <nav className="flex flex-col gap-6 text-center">
              {navigation.map((item) => (
                item.href ? (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-lg font-bold transition-colors text-[#2C3531] hover:text-[#A68B67]"
                  >
                    {item.name}
                  </a>
                ) : (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item.key)}
                    className={`text-lg font-bold transition-colors ${view.page === item.key ? 'text-[#A68B67]' : 'text-[#2C3531] hover:text-[#A68B67]'}`}
                  >
                    {item.name}
                  </button>
                )
              ))}
              <div className="pt-6 border-t border-[#2C3531]/10 flex flex-col items-center gap-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#A68B67]">Свяжитесь с нами</span>
                <SocialLinks light={false} />
              </div>
            </nav>
          </div>
        </div>
      )}

      <main className="pt-28 pb-24">
        <div className={mainContentClass}>
          {children}
        </div>
      </main>

      <Footer setView={setView} />
      <ChatbudAssistant setView={setView} />
      <ScrollToTop />
      <CookieConsent setView={setView} />
    </div>
  );
};

export default Layout;