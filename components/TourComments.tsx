import React, { useEffect, useState } from 'react';
import type { IComment } from '../types';
import { getCommentsByPostId, getBlogPostId, getBlogPostUrl } from '../services/commentsService';

interface TourCommentsProps {
  tourWpId: string;
}

const TourComments: React.FC<TourCommentsProps> = ({ tourWpId }) => {
  const [comments, setComments] = useState<IComment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [blogPostId, setBlogPostId] = useState<number | null>(null);

  useEffect(() => {
    const loadComments = async () => {
      setIsLoading(true);

      const postId = getBlogPostId(tourWpId);

      if (!postId) {
        setIsLoading(false);
        return;
      }

      setBlogPostId(postId);
      const fetchedComments = await getCommentsByPostId(postId);
      setComments(fetchedComments);
      setIsLoading(false);
    };

    loadComments();
  }, [tourWpId]);

  // Не показываем ничего если нет комментариев или загрузка
  if (isLoading) {
    return null;
  }

  if (!blogPostId || comments.length === 0) {
    return null;
  }

  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const renderComments = (parentId: number, depth: number = 0) => {
    const childComments = comments.filter(c => c.parent === parentId);

    // Сортируем по дате (старые сверху, как в WP обычно для веток)
    childComments.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    if (childComments.length === 0) return null;

    return (
      <ul className={depth === 0 ? "tour-comments__list" : "tour-comments__replies"}>
        {childComments.map((comment) => (
          <li key={comment.id} className={`tour-comments__item ${depth > 0 ? 'tour-comments__item--reply' : ''}`}>
            <div className="tour-comments__header">
              {comment.author_avatar_url && (
                <img
                  src={comment.author_avatar_url}
                  alt={comment.author_name}
                  className="tour-comments__avatar"
                />
              )}
              <div className="tour-comments__meta">
                <div className="tour-comments__author">
                  {comment.author_name}
                </div>
                <div className="tour-comments__date">
                  {formatDate(comment.date)}
                </div>
              </div>
            </div>
            <div
              className="tour-comments__text"
              dangerouslySetInnerHTML={{ __html: comment.content }}
            />
            {/* Рекурсивный вызов для ответов */}
            {renderComments(comment.id, depth + 1)}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="tour-comments mt-16 pt-10 border-t border-[#e5e5e5]">
      <style>{`
        .tour-comments__title {
          font-size: 28px;
          font-weight: 600;
          color: #333;
          margin-bottom: 30px;
          text-align: center;
        }
        .tour-comments__list, .tour-comments__replies {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .tour-comments__replies {
          margin-top: 15px;
          margin-left: 40px;
          border-left: 2px solid #eee;
          padding-left: 20px;
        }
        .tour-comments__item {
          background: #f7f8f9;
          border-radius: 12px;
          padding: 24px;
          margin-bottom: 20px;
          position: relative;
        }
        .tour-comments__item--reply {
          background: #ffffff;
          border: 1px solid #f0f0f0;
          padding: 16px;
          margin-bottom: 10px;
        }
        .tour-comments__header {
          display: flex;
          align-items: center;
          margin-bottom: 16px;
        }
        .tour-comments__avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          margin-right: 16px;
          flex-shrink: 0;
          object-fit: cover;
        }
        .tour-comments__meta {
          flex-grow: 1;
        }
        .tour-comments__author {
          font-weight: 600;
          font-size: 16px;
          color: #333;
          margin-bottom: 4px;
        }
        .tour-comments__date {
          font-size: 14px;
          color: #888;
        }
        .tour-comments__text {
          font-size: 15px;
          line-height: 1.6;
          color: #444;
        }
        .tour-comments__text p {
          margin: 0 0 12px 0;
        }
        .tour-comments__text p:last-child {
          margin-bottom: 0;
        }
        .tour-comments__footer {
          text-align: center;
          margin-top: 30px;
        }
        .tour-comments__button {
          display: inline-block;
          background-color: #5d6d66;
          color: #fff !important;
          text-decoration: none !important;
          padding: 14px 32px;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 500;
          transition: background-color 0.3s ease, transform 0.2s ease;
        }
        .tour-comments__button:hover {
          background-color: #4a5850;
          transform: translateY(-2px);
        }
        .tour-comments__button:active {
          transform: translateY(0);
        }
        @media (max-width: 600px) {
          .tour-comments {
            margin-top: 40px;
            padding-top: 30px;
          }
          .tour-comments__title {
            font-size: 22px;
            margin-bottom: 20px;
          }
          .tour-comments__replies {
            margin-left: 15px;
            padding-left: 10px;
          }
          .tour-comments__item {
            padding: 16px;
          }
          .tour-comments__item--reply {
            padding: 12px;
          }
          .tour-comments__avatar {
            width: 40px;
            height: 40px;
            margin-right: 12px;
          }
          .tour-comments__author {
            font-size: 15px;
          }
          .tour-comments__date {
            font-size: 13px;
          }
          .tour-comments__text {
            font-size: 14px;
          }
          .tour-comments__button {
            padding: 12px 24px;
            font-size: 15px;
          }
        }
      `}</style>

      <h2 className="tour-comments__title">Отзывы наших туристов</h2>

      {renderComments(0)}

      <div className="tour-comments__footer">
        <a
          href={getBlogPostUrl(blogPostId)}
          target="_blank"
          rel="noopener noreferrer"
          className="tour-comments__button"
        >
          Оставить свой отзыв
        </a>
      </div>
    </div>
  );
};

export default TourComments;
