import React from 'react';
import type { ViewState } from '../App';

interface NotFoundPageProps {
  setView: React.Dispatch<React.SetStateAction<ViewState>>;
}

const NotFoundPage: React.FC<NotFoundPageProps> = ({ setView }) => {
  return (
    <div className="text-center flex flex-col items-center py-16">
      <h1 className="text-9xl font-expressive font-black text-[#A68B67]/20">404</h1>
      <h2 className="text-4xl font-expressive mt-[-2rem] mb-4 text-[#2C3531]">Страница не найдена</h2>
      <p className="text-lg text-[#2C3531]/70 mb-8 max-w-md">
        Кажется, вы свернули с тропы. Но не волнуйтесь, мы поможем вернуться к началу маршрута.
      </p>
      <button 
        onClick={() => setView({ page: 'home' })}
        className="px-8 py-4 bg-[#A68B67] text-white rounded-full font-medium tracking-wide hover:bg-[#8e7656] transition-all transform hover:-translate-y-1 shadow-xl"
      >
        Вернуться на главную
      </button>
    </div>
  );
};

export default NotFoundPage;