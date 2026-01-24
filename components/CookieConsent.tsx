import React, { useState, useEffect } from 'react';
import './CookieConsent.css';

import type { ViewState } from '../App';

interface CookieConsentProps {
    setView: (view: ViewState) => void;
}

const CookieConsent: React.FC<CookieConsentProps> = ({ setView }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookie-consent-04travel-v2');
        if (!consent) {
            setIsVisible(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie-consent-04travel-v2', 'true');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="cookie-consent-overlay">
            <div className="cookie-consent-banner glass-card">
                <div className="cookie-consent-content">
                    <h3 className="cookie-consent-title">Согласие на обработку файлов cookie</h3>
                    <div className="cookie-consent-text">
                        <p>
                            Мы используем файлы cookie, чтобы сайт работал корректно, а ваш пользовательский опыт становился лучше. Продолжая работу с сайтом, вы соглашаетесь с нашей <button onClick={() => setView({ page: 'postDetail', params: { postId: 'cookies' } })} className="underline hover:text-[#A68B67] transition-colors">Политикой использования cookies</button> и <button onClick={() => setView({ page: 'postDetail', params: { postId: '%d0%bf%d0%be%d0%bb%d0%b8%d1%82%d0%b8%d0%ba%d0%b0-%d0%ba%d0%be%d0%bd%d1%84%d0%b8%d0%b4%d0%b5%d0%bd%d1%86%d0%b8%d0%b0%d0%bb%d1%8c%d0%bd%d0%be%d1%81%d1%82%d0%b8' } })} className="underline hover:text-[#A68B67] transition-colors">Политикой конфиденциальности</button>.
                        </p>
                    </div>
                </div>
                <div className="cookie-consent-actions">
                    <button onClick={handleAccept} className="cookie-accept-btn">
                        Принимаю
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CookieConsent;
