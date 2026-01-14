import React, { useEffect, useRef } from 'react';

const TwoGisReviewsWidget: React.FC = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current) {
      const u = "PGhlYWQ+PHNjcmlwdCB0eXBlPSJ0ZXh0L2phdmFzY3JpcHQiPgogICAgd2luZG93Ll9fc2l6ZV9fPSdiaWcnOwogICAgd2luZG93Ll9fdGhlbWVfXz0nbGlnaHQnOwogICAgd2luZG93Ll9fYnJhbmNoSWRfXz0nNzAwMDAwMDEwNzU0NDU4NzQnCiAgICB3aW5kb3cuX19vcmdJZF9fPSc3MDAwMDAwMTEwMDU4MDUwMicKICAgPC9zY3JpcHQ+PHNjcmlwdCBjcm9zc29yaWdpbj0iYW5vbnltb3VzIiB0eXBlPSJtb2R1bGUiIHNyYz0iaHR0cHM6Ly9kaXNrLjJnaXMuY29tL3dpZGdldC1jb25zdHJ1Y3Rvci9hc3NldHMvaWZyYW1lLmpzIj48L3NjcmlwdD48bGluayByZWw9Im1vZHVsZXByZWxvYWQiIGNyb3Nzb3JpZ2luPSJhbm9ueW1vdXMiIGhyZWY9Imh0dHBzOi8vZGlzay4yZ2lzLmNvbS93aWRnZXQtY29uc3RydWN0b3IvYXNzZXRzL2RlZmF1bHRzLmpzIj48bGluayByZWw9InN0eWxlc2hlZXQiIGNyb3Nzb3JpZ2luPSJhbm9ueW1vdXMiIGhyZWY9Imh0dHBzOi8vZGlzay4yZ2lzLmNvbS93aWRnZXQtY29uc3RydWN0b3IvYXNzZXRzL2RlZmF1bHRzLmNzcyI+PC9oZWFkPjxib2R5PjxkaXYgaWQ9ImlmcmFtZSI+PC9kaXY+PC9ib2R5Pg==";
      try {
        const l = iframeRef.current;
        const doc = l.contentWindow?.document;
        if (doc) {
          doc.open();
          doc.write(decodeURIComponent(escape(atob(u))));
          doc.close();
        }
      } catch (e) {
        console.error("Failed to load 2GIS widget", e);
      }
    }
  }, []);

  return (
    <div className="flex justify-center w-full">
      <iframe
        ref={iframeRef}
        id="big_light_70000001075445874"
        frameBorder="0"
        width="100%"
        height="824px"
        style={{ maxWidth: '528px' }}
        className="rounded-[3rem] shadow-2xl bg-white"
        sandbox="allow-modals allow-forms allow-scripts allow-same-origin allow-popups allow-top-navigation-by-user-activation"
      />
    </div>
  );
};

const ReviewsSection: React.FC = () => {
  return (
    <section className="py-24 bg-[#4A5D4E] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <span className="text-[#A68B67] text-sm font-bold uppercase tracking-widest mb-4 block">Социальное доверие</span>
            <h2 className="text-4xl md:text-5xl font-expressive mb-6">Говорят наши гости</h2>
            <p className="text-white/60 font-archival max-w-xl text-lg">
              Мы гордимся тем, что наши путешественники возвращаются снова и снова. Реальные отзывы с независимых площадок.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 items-center">
            <a
              href="https://yandex.ru/maps/org/aktash_vibes/136013722623/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 backdrop-blur-md rounded-[1.5rem] border border-white/20 overflow-hidden flex items-center justify-center p-2 min-h-[70px] hover:bg-white/20 transition-colors cursor-pointer"
            >
              <iframe
                src="https://yandex.ru/sprav/widget/rating-badge/136013722623?type=rating"
                width="150"
                height="50"
                frameBorder="0"
                className="rounded-lg"
              ></iframe>
            </a>
            <a
              href="https://yandex.ru/maps/org/aktash_vibes/136013722623/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 backdrop-blur-md rounded-[1.5rem] border border-white/20 overflow-hidden flex items-center justify-center p-2 min-h-[70px] hover:bg-white/20 transition-colors cursor-pointer"
            >
              <iframe
                src="https://yandex.ru/sprav/widget/rating-badge/136013722623?type=award"
                width="150"
                height="50"
                frameBorder="0"
                className="rounded-lg"
              ></iframe>
            </a>
            <a
              href="https://2gis.ru/gornoaltaysk/firm/70000001075445874/tab/reviews?utm_source=widget_firm"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 backdrop-blur-md rounded-[1.5rem] border border-white/20 overflow-hidden flex items-center justify-center p-2 min-h-[70px] hover:bg-white/20 transition-colors cursor-pointer"
            >
              <iframe
                src="https://widget.2gis.ru/api/widget?org_id=70000001100580502&amp;branch_id=70000001075445874&amp;size=medium&amp;theme=light"
                width="150"
                height="50"
                frameBorder="0"
                className="rounded-lg"
              ></iframe>
            </a>
          </div>
        </div>

        <TwoGisReviewsWidget />
      </div>
    </section>
  );
};

export default ReviewsSection;