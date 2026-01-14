import React from 'react';

interface SocialLinksProps {
  light?: boolean; // true если фон темный (нужны светлые иконки), false если наоборот
}

const SocialLinks: React.FC<SocialLinksProps> = ({ light = false }) => {
  // Базовые стили: чистый контейнер без заливки по умолчанию
  // Размер w-10 h-10 остается для удобства нажатия, но визуально иконка внутри меньше
  const btnBase = "relative w-10 h-10 flex items-center justify-center rounded-full transition-all duration-500 group";

  // Цвета иконок: черный для светлых фонов и белый для темных
  const iconColor = light ? "text-white" : "text-black";

  // Эффект наведения: легкое "призрачное" появление подложки
  const hoverStyles = light
    ? "hover:bg-white/10 hover:shadow-[0_4px_15px_rgba(255,255,255,0.1)]"
    : "hover:bg-[#2C3531]/5 hover:shadow-[0_4px_15px_rgba(44,53,49,0.05)]";

  return (
    <ul className="flex items-center gap-1.5 list-none p-0 m-0">
      {/* PHONE - Контурный стиль */}
      <li>
        <a href="tel:+79635106746" title="Позвонить" className={`${btnBase} ${iconColor} ${hoverStyles}`}>
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l2.27-2.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
        </a>
      </li>

      <li>
        <a href="https://t.me/travel_ra" target="_blank" rel="noopener noreferrer" title="Telegram" className={`${btnBase} ${iconColor} ${hoverStyles}`}>
          <svg className="w-6 h-6 scale-[1.05] transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21.196 2.152L2.094 9.912c-1.151.45-1.134 1.107-.196 1.392l4.896 1.53 1.83 5.513c.17.51.107.714.43.714.323 0 .5-.153.69-.34l2.583-2.516 5.4 3.993c.99.546 1.7.264 1.946-.92l3.483-16.427c.362-1.442-.483-2.043-1.431-1.247zm-14.364 9.998l10.28-6.488c.484-.294.928-.136.564.187l-8.86 7.996-.345 3.593-1.639-5.288z" />
          </svg>
        </a>
      </li>

      <li>
        <a href="https://vk.com/domgornii" target="_blank" rel="noopener noreferrer" title="ВКонтакте" className={`${btnBase} ${iconColor} ${hoverStyles}`}>
          <svg className="w-6 h-6 scale-[1.5]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21.16 7.42c.13-.43 0-.75-.6-.75h-2c-.5 0-.73.26-.86.55 0 0-1.02 2.48-2.46 4.09-.46.47-.67.62-.92.62-.13 0-.31-.15-.31-.58V7.42c0-.5-.14-.75-.56-.75H10.3c-.31 0-.5.23-.5.45 0 .47.7.58.78 1.91v2.86c0 .63-.11.74-.36.74-.67 0-2.3-2.5-3.26-5.36-.19-.55-.38-.78-.89-.78H4.07c-.57 0-.68.27-.68.56 0 .53.68 3.14 3.16 6.62 1.65 2.37 3.98 3.65 6.1 3.65 1.27 0 1.43-.29 1.43-.78v-1.8c0-.57.12-.68.52-.68.3 0 .8.15 1.98 1.29 1.35 1.35 1.57 1.97 2.34 1.97h2c.57 0 .86-.29.69-.85-.18-.56-.82-1.37-1.67-2.33-.46-.54-1.15-1.12-1.36-1.42-.29-.39-.21-.55 0-.9 0 0 2.43-3.41 2.68-4.57z" />
          </svg>
        </a>
      </li>

      <li>
        <a href="https://max.ru/id41103048347_biz" target="_blank" rel="noopener noreferrer" title="Max" className={`${btnBase} ${iconColor} ${hoverStyles}`}>
          <svg className="w-6 h-6 scale-[1.1]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C17.523 2 22 6.477 22 12c0 5.523-4.477 10-10 10-1.259 0-2.455-.233-3.56-.656L2 22l.656-6.44C2.233 14.455 2 13.259 2 12c0-5.523 4.477-10 10-10zm0 18c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8c0 .99.181 1.937.51 2.812L4 20l4.188-.51C9.063 19.819 10.01 20 12 20z" />
          </svg>
        </a>
      </li>
    </ul>
  );
};

export default SocialLinks;
