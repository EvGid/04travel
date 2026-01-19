import React, { useState, useRef, useEffect } from 'react';
import { getTourRecommendation } from '../services/geminiService';
import type { ViewState } from '../App';

interface ChatbudAssistantProps {
  setView: React.Dispatch<React.SetStateAction<ViewState>>;
}

const ChatbudAssistant: React.FC<ChatbudAssistantProps> = ({ setView }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: 'Привет! Я ваш проводник по Алтаю. Какой отдых вы ищете: активный треккинг или спокойное уединение?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsTyping(true);

    const botReply = await getTourRecommendation(userMsg);
    setIsTyping(false);
    setMessages(prev => [...prev, { role: 'bot', text: botReply || 'Извините, я задумался о вечном.' }]);
  };

  return (
    <div className="fixed bottom-10 right-6 z-[100]">
      {isOpen ? (
        <div className="w-[calc(100vw-48px)] sm:w-[350px] h-[500px] max-h-[80vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-gray-100 transform transition-all duration-300">
          {/* Header */}
          <div className="bg-[#4A5D4E] p-6 text-white flex justify-between items-center">
            <div>
              <h4 className="font-bold text-lg">AI-Проводник</h4>
              <p className="text-xs text-white/60">Всегда на связи с гор</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F5F1E9]/30">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm ${m.role === 'user'
                  ? 'bg-[#A68B67] text-white rounded-tr-none'
                  : 'bg-white text-[#2C3531] shadow-sm rounded-tl-none border border-gray-100'
                  }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white px-4 py-2 rounded-2xl shadow-sm animate-pulse flex gap-1">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-100">
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Спросите о туре..."
                className="flex-1 bg-gray-50 border-none focus:ring-2 focus:ring-[#A68B67] rounded-full px-4 py-2 text-sm outline-none"
              />
              <button
                onClick={handleSend}
                className="p-2 bg-[#A68B67] text-white rounded-full hover:scale-110 transition-transform flex-shrink-0"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
            <p className="text-[10px] text-gray-400 leading-tight text-center">
              Нажимая «Отправить», вы соглашаетесь с обработкой персональных данных и принимаете{' '}
              <button
                onClick={() => setView({ page: 'postDetail', params: { postId: '%d0%bf%d0%be%d0%bb%d0%b8%d1%82%d0%b8%d0%ba%d0%b0-%d0%ba%d0%be%d0%bd%d1%84%d0%b8%d0%b4%d0%b5%d0%bd%d1%86%d0%b8%d0%b0%d0%bb%d1%8c%d0%bd%d0%be%d1%81%d1%82%d0%b8' } })}
                className="text-[#A68B67] hover:underline"
              >
                Политику конфиденциальности
              </button>
            </p>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-white/20 hover:scale-110 active:scale-95 transition-all duration-300 group"
          aria-label="Открыть чат"
        >
          <svg className="w-6 h-6 group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default ChatbudAssistant;