import React from 'react';
import ContactForm from '../components/ContactForm';
import type { ViewState } from '../App';

interface ContactPageProps {
    setView: React.Dispatch<React.SetStateAction<ViewState>>;
    params?: { [key: string]: string };
}

const ContactPage: React.FC<ContactPageProps> = ({ setView, params }) => {
    return (
        <div className="min-h-screen bg-[#F5F1E9]/30">
            {/* Hero Section */}
            <section className="py-16 px-6 md:px-12 max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <span className="text-[#A68B67] text-sm font-bold uppercase tracking-widest mb-4 block">
                        Свяжитесь с нами
                    </span>
                    <h1 className="text-3xl md:text-5xl font-expressive text-[#2C3531] mb-6">
                        Оставить заявку
                    </h1>
                    <p className="text-[#2C3531]/60 font-archival text-lg max-w-xl mx-auto">
                        Заполните форму, и мы свяжемся с вами в ближайшее время для обсуждения деталей вашего путешествия.
                    </p>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-[2rem] shadow-xl p-8 md:p-12 border border-gray-100">
                    <ContactForm setView={setView} variant="full" initialPhone={params?.phone} />
                </div>

                {/* Alternative Contact */}
                <div className="mt-12 text-center">
                    <p className="text-[#2C3531]/60 mb-4">Или свяжитесь напрямую:</p>
                    <div className="flex flex-wrap justify-center gap-6">
                        <a
                            href="tel:+79635106746"
                            className="flex items-center gap-2 text-[#2C3531] hover:text-[#A68B67] transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            +7 963 510-67-46
                        </a>
                        <a
                            href="https://t.me/your_telegram_username"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-[#2C3531] hover:text-[#0088cc] transition-colors"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                            </svg>
                            Telegram
                        </a>
                        <a
                            href="mailto:oasis@04travel.ru"
                            className="flex items-center gap-2 text-[#2C3531] hover:text-[#A68B67] transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            oasis@04travel.ru
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContactPage;
