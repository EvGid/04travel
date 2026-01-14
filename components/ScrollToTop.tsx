import React, { useState, useEffect } from 'react';

const ScrollToTop: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Show button when page is scrolled down
    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Set the top scroll position
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <div className="fixed bottom-10 left-6 z-[100]">
            <button
                type="button"
                onClick={scrollToTop}
                className={`
          flex items-center justify-center
          w-12 h-12 
          bg-white/10 backdrop-blur-md 
          border border-white/20 
          rounded-full 
          text-white 
          shadow-2xl 
          transition-all duration-300 ease-in-out
          hover:bg-white/20 hover:scale-110 active:scale-95
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}
        `}
                aria-label="Наверх"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 15.75l7.5-7.5 7.5 7.5"
                    />
                </svg>
            </button>
        </div>
    );
};

export default ScrollToTop;
