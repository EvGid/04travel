import React from 'react';
import SocialLinks from './SocialLinks';
import type { ViewState } from '../App';
import './Footer.css';

interface FooterProps {
  setView: React.Dispatch<React.SetStateAction<ViewState>>;
}

const Footer: React.FC<FooterProps> = ({ setView }) => {
  const handleNav = (page: string, id?: string, hash?: string) => {
    if (page === 'tourDetail' && id) {
      setView({ page: 'tourDetail', params: { tourId: id }, hash });
    } else if (page === 'postDetail' && id) {
      setView({ page: 'postDetail', params: { postId: id }, hash });
    } else if (page === 'locationDetail' && id) {
      setView({ page: 'locationDetail', params: { locationId: id }, hash });
    } else if (page === 'excursionDetail' && id) {
      setView({ page: 'excursionDetail', params: { excursionId: id }, hash });
    } else {
      setView({ page, hash });
    }
  };

  return (
    <footer className="oasis-footer bg-[#2C3531] text-white pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="footer-grid grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-1">
            <h3 className="footer-brand text-2xl font-expressive mb-6">04travel</h3>
            <p className="footer-description text-white/50 text-sm leading-relaxed mb-6">
              Ваш персональный гид в мир Алтая. Сочетаем древние традиции гостеприимства и технологии будущего.
            </p>
            <div className="mb-8">
              <h4 className="footer-col-title text-[10px] font-bold uppercase tracking-[0.2em] text-[#A68B67] mb-5">Подписывайтесь на наши каналы</h4>
              <SocialLinks light />
            </div>
          </div>

          <div>
            <h4 className="footer-col-title text-sm font-bold uppercase tracking-widest text-[#A68B67] mb-6">Навигация</h4>
            <ul className="footer-nav-list space-y-4 text-white/70 text-sm">
              <li><button onClick={() => handleNav('tury')} className="hover:text-white transition-colors text-left">Все туры</button></li>
              <li><button onClick={() => handleNav('domiki')} className="hover:text-white transition-colors text-left">Забронировать дом</button></li>
              <li><button onClick={() => handleNav('home', undefined, 'vibe-selector')} className="hover:text-white transition-colors text-left">Подобрать вайб</button></li>
              <li><a href="https://wp.04travel.ru" className="hover:text-white transition-colors">Блог</a></li>
              <li><button onClick={() => handleNav('postDetail', '%d0%be-%d0%bd%d0%b0%d1%81')} className="hover:text-white transition-colors text-left">О нас</button></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-col-title text-sm font-bold uppercase tracking-widest text-[#A68B67] mb-6">Юридическая информация</h4>
            <ul className="footer-nav-list space-y-4 text-white/70 text-sm">
              <li><button onClick={() => handleNav('postDetail', '%d0%bf%d0%be%d0%bb%d0%b8%d1%82%d0%b8%d0%ba%d0%b0-%d0%ba%d0%be%d0%bd%d1%84%d0%b8%d0%b4%d0%b5%d0%bd%d1%86%d0%b8%d0%b0%d0%bb%d1%8c%d0%bd%d0%be%d1%81%d1%82%d0%b8')} className="hover:text-white transition-colors text-left">Политика конфиденциальности</button></li>
              <li><button className="hover:text-white transition-colors text-left">Политика отмены</button></li>
              <li><button className="hover:text-white transition-colors text-left">Реестр туроператоров</button></li>
              <li><button onClick={() => handleNav('postDetail', '%d0%bf%d0%be%d0%bb%d0%b8%d1%82%d0%b8%d0%ba%d0%ba%d0%b0-%d1%83%d0%ba%d0%b8')} className="hover:text-white transition-colors text-left">Cookies</button></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-col-title text-sm font-bold uppercase tracking-widest text-[#A68B67] mb-6">Рейтинги</h4>
            <div className="footer-rating-cards footer-nav-list space-y-4">
              <a
                href="https://yandex.ru/maps/org/aktash_vibes/136013722623/"
                target="_blank"
                rel="noopener noreferrer"
                className="rating-card bg-white/5 rounded-2xl border border-white/10 overflow-hidden flex items-center justify-center p-2 min-h-[74px] hover:bg-white/10 transition-colors cursor-pointer"
              >
                <iframe
                  src="https://yandex.ru/sprav/widget/rating-badge/136013722623?type=rating"
                  width="150"
                  height="50"
                  frameBorder="0"
                  className="rounded-lg"
                ></iframe>
              </a>
              <a
                href="https://2gis.ru/gornoaltaysk/firm/70000001075445874/tab/reviews?utm_source=widget_firm"
                target="_blank"
                rel="noopener noreferrer"
                className="rating-card bg-white/5 rounded-2xl border border-white/10 overflow-hidden flex items-center justify-center p-2 min-h-[74px] hover:bg-white/10 transition-colors cursor-pointer"
              >
                <iframe
                  src="https://widget.2gis.ru/api/widget?org_id=70000001100580502&amp;branch_id=70000001075445874&amp;size=medium&amp;theme=light"
                  width="150"
                  height="50"
                  frameBorder="0"
                  className="rounded-lg"
                ></iframe>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="footer-copyright text-white/30 text-xs space-y-1">
            <p>© 2026 04travel. Все права защищены. Республика Алтай, г. Горно-Алтайск. ул. П.Кучияка 71/1 т. 89635106746</p>
            <p>Улаганский район с. Акташ ул. Юбилейная 1г</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;