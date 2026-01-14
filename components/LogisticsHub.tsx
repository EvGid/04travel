import React from 'react';
import { FLIGHTS } from '../ui-constants.ts';

const LogisticsHub: React.FC = () => {
  return (
    <section className="py-16 px-6 bg-[#4A5D4E] text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-4xl font-expressive mb-4">Логистический хаб</h2>
            <p className="text-white/70 font-archival text-lg">
              Мы заботимся о вашем времени. Актуальное расписание рейсов и трансферов до Горно-Алтайска собрано здесь.
            </p>
          </div>
          <a
            href="https://rasp.yandex.ru/station/9623328"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border border-white/30 rounded-full hover:bg-white/10 transition-colors inline-block"
          >
            Смотреть все рейсы
          </a>
        </div>

        <div className="flex justify-center overflow-x-auto pb-4 custom-scrollbar">
          <div className="min-w-[700px] glass-card p-4 rounded-3xl border border-white/10 shadow-2xl">
            <iframe
              frameBorder="0"
              style={{
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                overflow: 'hidden',
                border: 0,
                width: '700px',
                height: '351px',
                borderRadius: '1rem'
              }}
              src="https://rasp.yandex.ru/informers/v2/search/?fromId=c213&toId=c11319&size=5&color=5&type=plane"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogisticsHub;