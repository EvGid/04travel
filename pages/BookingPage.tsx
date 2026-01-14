import React from 'react';

const BookingPage: React.FC = () => {
  return (
    <div>
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-expressive text-[#2C3531] mb-6">Бронирование домиков</h1>
        <p className="text-lg text-[#2C3531]/60 font-archival max-w-2xl mx-auto">
          Выберите даты и домик для вашего идеального отдыха. Прямое бронирование с гарантией лучшей цены.
        </p>
      </div>
      <iframe
        src="https://homereserve.ru/k33LFU2fRH?tag=04"
        style={{ width: '100%', height: '80vh', border: 'none', borderRadius: '2.5rem' }}
        className="shadow-lg"
        title="Система бронирования HomeReserve"
      ></iframe>
    </div>
  );
};

export default BookingPage;