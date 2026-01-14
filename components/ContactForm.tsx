import React, { useState } from 'react';
import type { ViewState } from '../App';

interface ContactFormProps {
    setView?: React.Dispatch<React.SetStateAction<ViewState>>;
    variant?: 'full' | 'compact';
}

interface FormData {
    name: string;
    phone: string;
    telegram: string;
    interest: 'tour' | 'cabin';
    dates: string;
    comment: string;
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const ContactForm: React.FC<ContactFormProps> = ({ setView, variant = 'full' }) => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        phone: '',
        telegram: '',
        interest: 'tour',
        dates: '',
        comment: '',
    });
    const [status, setStatus] = useState<FormStatus>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleInterestChange = (interest: 'tour' | 'cabin') => {
        setFormData(prev => ({ ...prev, interest }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name.trim() || !formData.phone.trim()) {
            setErrorMessage('Пожалуйста, заполните обязательные поля');
            return;
        }

        setStatus('submitting');
        setErrorMessage('');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Ошибка отправки');
            }

            setStatus('success');
        } catch (error) {
            setStatus('error');
            setErrorMessage('Не удалось отправить заявку. Попробуйте позже или свяжитесь напрямую.');
        }
    };

    const handlePrivacyClick = () => {
        if (setView) {
            setView({ page: 'postDetail', params: { postId: '%d0%bf%d0%be%d0%bb%d0%b8%d1%82%d0%b8%d0%ba%d0%b0-%d0%ba%d0%be%d0%bd%d1%84%d0%b8%d0%b4%d0%b5%d0%bd%d1%86%d0%b8%d0%b0%d0%bb%d1%8c%d0%bd%d0%be%d1%81%d1%82%d0%b8' } });
        }
    };

    if (status === 'success') {
        return (
            <div className="text-center py-12 px-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#2C3531] mb-3">Спасибо!</h3>
                <p className="text-[#2C3531]/60 mb-8">Обычно отвечаю в течение 10-30 минут</p>
                <a
                    href="https://t.me/your_telegram_username"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-[#0088cc] text-white rounded-full font-semibold hover:bg-[#0077b5] transition-colors"
                >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                    </svg>
                    Ускорить в Telegram
                </a>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Имя */}
            <div>
                <label className="block text-sm font-semibold text-[#2C3531] mb-2">
                    Имя <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Как к вам обращаться?"
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#A68B67] focus:border-transparent outline-none transition-all"
                    required
                />
            </div>

            {/* Телефон */}
            <div>
                <label className="block text-sm font-semibold text-[#2C3531] mb-2">
                    Телефон <span className="text-red-500">*</span>
                </label>
                <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+7 (___) ___-__-__"
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#A68B67] focus:border-transparent outline-none transition-all"
                    required
                />
            </div>

            {/* Telegram */}
            <div>
                <label className="block text-sm font-semibold text-[#2C3531] mb-2">
                    Telegram <span className="text-[#2C3531]/40 font-normal">(необязательно)</span>
                </label>
                <input
                    type="text"
                    name="telegram"
                    value={formData.telegram}
                    onChange={handleChange}
                    placeholder="@ваш_ник"
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#A68B67] focus:border-transparent outline-none transition-all"
                />
            </div>

            {/* Что интересует */}
            <div>
                <label className="block text-sm font-semibold text-[#2C3531] mb-3">
                    Что интересует?
                </label>
                <div className="flex gap-4">
                    <button
                        type="button"
                        onClick={() => handleInterestChange('tour')}
                        className={`flex-1 py-4 px-6 rounded-2xl font-semibold transition-all ${formData.interest === 'tour'
                                ? 'bg-[#4A5D4E] text-white shadow-lg'
                                : 'bg-gray-100 text-[#2C3531] hover:bg-gray-200'
                            }`}
                    >
                        🏔️ Тур
                    </button>
                    <button
                        type="button"
                        onClick={() => handleInterestChange('cabin')}
                        className={`flex-1 py-4 px-6 rounded-2xl font-semibold transition-all ${formData.interest === 'cabin'
                                ? 'bg-[#4A5D4E] text-white shadow-lg'
                                : 'bg-gray-100 text-[#2C3531] hover:bg-gray-200'
                            }`}
                    >
                        🏡 Домик
                    </button>
                </div>
            </div>

            {/* Даты */}
            <div>
                <label className="block text-sm font-semibold text-[#2C3531] mb-2">
                    Даты <span className="text-[#2C3531]/40 font-normal">(примерно)</span>
                </label>
                <input
                    type="text"
                    name="dates"
                    value={formData.dates}
                    onChange={handleChange}
                    placeholder="Например: июль 2026, 5-7 дней"
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#A68B67] focus:border-transparent outline-none transition-all"
                />
            </div>

            {/* Комментарий */}
            {variant === 'full' && (
                <div>
                    <label className="block text-sm font-semibold text-[#2C3531] mb-2">
                        Комментарий <span className="text-[#2C3531]/40 font-normal">(необязательно)</span>
                    </label>
                    <textarea
                        name="comment"
                        value={formData.comment}
                        onChange={handleChange}
                        placeholder="Любые пожелания или вопросы..."
                        rows={3}
                        className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#A68B67] focus:border-transparent outline-none transition-all resize-none"
                    />
                </div>
            )}

            {/* Ошибка */}
            {errorMessage && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-sm">
                    {errorMessage}
                </div>
            )}

            {/* Кнопка */}
            <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full py-5 bg-[#A68B67] text-white rounded-full font-bold text-lg hover:shadow-[0_0_30px_rgba(166,139,103,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {status === 'submitting' ? 'Отправляю...' : 'Оставить заявку'}
            </button>

            {/* Политика конфиденциальности */}
            <p className="text-center text-xs text-[#2C3531]/40 leading-relaxed">
                Отправляя заявку, вы соглашаетесь с{' '}
                <button
                    type="button"
                    onClick={handlePrivacyClick}
                    className="text-[#A68B67] hover:underline"
                >
                    Политикой конфиденциальности
                </button>
            </p>
        </form>
    );
};

export default ContactForm;
