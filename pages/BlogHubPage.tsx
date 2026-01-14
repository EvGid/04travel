import React, { useState, useEffect } from 'react';
import { getAllPages, createExcerpt, getPageCategory, PageCategory } from '../services/contentService';
import type { IPageData } from '../types';
import type { ViewState } from '../App';

interface BlogHubPageProps {
  setView: React.Dispatch<React.SetStateAction<ViewState>>;
}

const BlogHubPage: React.FC<BlogHubPageProps> = ({ setView }) => {
  const [posts, setPosts] = useState<IPageData[]>([]);

  useEffect(() => {
    getAllPages().then(all => {
      // Только страницы с префиксом "Блог:"
      setPosts(all.filter(p => getPageCategory(p) === PageCategory.BLOG));
    });
  }, []);

  return (
    <div className="py-10">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-expressive mb-4 text-[#2C3531]">Блог 04travel</h1>
        <p className="text-lg text-[#2C3531]/70 font-archival">Полезные статьи, советы и новости</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.map(p => (
          <div 
            key={p.wp_id} 
            onClick={() => setView({ page: 'postDetail', params: { postId: p.slug } })}
            className="glass-card rounded-[2rem] p-8 hover:shadow-xl transition-all block cursor-pointer group"
          >
            <h3 className="text-2xl font-expressive mb-4 text-[#2C3531]">{p.title}</h3>
            <p className="text-sm text-[#2C3531]/60 font-archival leading-relaxed line-clamp-3">
              {createExcerpt(p.contentHtml, 180)}
            </p>
            <div className="mt-6 text-[#A68B67] font-bold flex items-center gap-2">
              <span>Читать статью</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogHubPage;
