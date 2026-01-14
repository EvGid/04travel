import React from 'react';

const BookingWidget: React.FC = () => {
  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto" id="booking">
      <div className="mb-16 text-center">
        <span className="text-[#A68B67] text-sm font-bold uppercase tracking-[0.3em] mb-4 block">Accommodation 2026</span>
        <h2 className="text-4xl md:text-5xl font-expressive text-[#2C3531] mb-6">Бронирование домиков</h2>
        <div className="w-20 h-1 bg-[#A68B67] mx-auto mb-8"></div>
        <p className="text-[#2C3531]/60 font-archival max-w-2xl mx-auto text-lg">
          Найдите свое идеальное убежище среди гор. Прямое бронирование уютных домов и глэмпингов с гарантией лучшей цены.
        </p>
      </div>
      
      <div className="glass-card rounded-[3rem] shadow-2xl border border-white/50 min-h-[500px] overflow-hidden">
        <iframe
          src="https://homereserve.ru/k33LFU2fRH?tag=04"
          style={{ width: '100%', height: '70vh', border: 'none' }}
          title="Система бронирования HomeReserve"
        ></iframe>
      </div>
    </section>
  );
};

export default BookingWidget;