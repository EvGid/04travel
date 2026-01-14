import React from 'react';

interface PageNavigatorProps {
  goBack: () => void;
  goForward: () => void;
  canGoBack: boolean;
  canGoForward: boolean;
}

const PageNavigator: React.FC<PageNavigatorProps> = ({ goBack, goForward, canGoBack, canGoForward }) => {
  const buttonBaseClasses = "flex items-center gap-2 text-[#A68B67]/60 transition-all duration-300 group";
  const enabledClasses = "hover:text-[#2C3531]";
  const disabledClasses = "opacity-20 cursor-not-allowed";

  return (
    <div className="flex justify-between items-center w-full mb-10 px-2 md:px-0">
      <button
        onClick={goBack}
        disabled={!canGoBack}
        className={`${buttonBaseClasses} ${canGoBack ? enabledClasses : disabledClasses}`}
      >
        <svg className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
        </svg>
        <span className="text-sm font-medium tracking-tight">Назад</span>
      </button>

      <button
        onClick={goForward}
        disabled={!canGoForward}
        className={`${buttonBaseClasses} flex-row-reverse ${canGoForward ? enabledClasses : disabledClasses}`}
      >
        <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
        </svg>
        <span className="text-sm font-medium tracking-tight">Далее</span>
      </button>
    </div>
  );
};

export default PageNavigator;
