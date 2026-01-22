import type { IComment } from '../types';

const WP_API_BASE = 'https://wp.04travel.ru/wp-json/wp/v2';

/**
 * Маппинг wp_id из JSON основного сайта на ID постов в WordPress блоге
 * Ключ: wp_id из TOURS_DATA, Значение: ID поста на wp.04travel.ru
 */
const TOUR_TO_BLOG_POST_MAP: { [key: string]: number } = {
    '309': 725,  // Туры на Алтай на 3 дня
    '310': 726,  // Туры на Алтай на 5 дней
    // Добавляйте новые маппинги по мере необходимости
};

/**
 * Получает ID поста на блоге по wp_id из JSON основного сайта
 */
export const getBlogPostId = (tourWpId: string): number | null => {
    return TOUR_TO_BLOG_POST_MAP[tourWpId] || null;
};

/**
 * Получает комментарии по ID поста из WordPress REST API
 */
export const getCommentsByPostId = async (postId: number): Promise<IComment[]> => {
    if (!postId) {
        return [];
    }

    try {
        const response = await fetch(
            `${WP_API_BASE}/comments?post=${postId}&per_page=50&status=approve`,
            {
                headers: {
                    'Accept': 'application/json',
                },
            }
        );

        if (!response.ok) {
            console.error(`[commentsService] Ошибка загрузки комментариев: ${response.status}`);
            return [];
        }

        const data = await response.json();

        return data.map((comment: any): IComment => ({
            id: comment.id,
            author_name: comment.author_name || 'Аноним',
            author_avatar_url: comment.author_avatar_urls?.['96'] || comment.author_avatar_urls?.['48'] || '',
            date: comment.date,
            content: comment.content?.rendered || '',
            parent: comment.parent || 0,
        }));

    } catch (error) {
        console.error('[commentsService] Ошибка при запросе комментариев:', error);
        return [];
    }
};

/**
 * Получает URL страницы поста на блоге для ссылки "Оставить отзыв"
 */
export const getBlogPostUrl = (postId: number): string => {
    return `https://wp.04travel.ru/?p=${postId}#respond`;
};

export default {
    getCommentsByPostId,
    getBlogPostId,
    getBlogPostUrl,
};
