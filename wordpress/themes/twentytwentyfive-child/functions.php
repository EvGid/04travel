<?php
/**
 * Twenty Twenty-Five Child functions and definitions
 */

function twentytwentyfive_child_enqueue_styles() {
    // Подключаем стили родительской темы
    wp_enqueue_style('parent-style', get_template_directory_uri() . '/style.css');
    
    // Подключаем стили дочерней темы
    wp_enqueue_style('child-style', get_stylesheet_uri(), array('parent-style'), wp_get_theme()->get('Version'));

    // Подключаем скрипт для хедера с cache-busting
    $js_file = get_stylesheet_directory() . '/assets/oasis-header.js';
    $js_version = file_exists($js_file) ? filemtime($js_file) : '1.0';
    wp_enqueue_script('oasis-header-js', get_stylesheet_directory_uri() . '/assets/oasis-header.js', array(), $js_version, true);

}
add_action('wp_enqueue_scripts', 'twentytwentyfive_child_enqueue_styles');



// Замена текста навигации и пагинации на "Назад/Вперед"
add_filter('render_block', function($content, $block){
    if (empty($block['blockName'])) return $content;

    $target_blocks = [
        'core/post-navigation-link',
        'core/query-pagination-previous',
        'core/query-pagination-next'
    ];

    if (in_array($block['blockName'], $target_blocks)) {
        // Определяем направление: назад или вперед
        $is_prev = (isset($block['attrs']['type']) && $block['attrs']['type'] === 'previous') || 
                   strpos($block['blockName'], 'previous') !== false || 
                   strpos($content, 'prev') !== false;
        
        $label = $is_prev ? 'Назад' : 'Вперед';
        
        // 1. Сначала заменяем стандартные метки (это не ломает стрелки в спанах)
        $search = ['Предыдущая страница', 'Предыдущая запись', 'Предыдущий пост', 'Следующая страница', 'Следующая запись', 'Следующий пост'];
        $replace = ['Назад', 'Назад', 'Назад', 'Вперед', 'Вперед', 'Вперед'];
        $content = str_replace($search, $replace, $content);

        // 2. Для core/post-navigation-link (между постами) заменяем содержимое ссылки полностью, 
        // так как там часто выводятся названия самих постов.
        if ($block['blockName'] === 'core/post-navigation-link') {
            // Заменяем всё внутри <a>, но сохраняем <a> и </a>
            $content = preg_replace('/(<a[^>]*>)(.*?)(<\/a>)/is', '$1' . $label . '$3', $content);
            // Также заменяем текст в специальном спане для меток, если он есть
            $content = preg_replace('/(<span class="wp-block-post-navigation-link__label">)(.*?)(<\/span>)/is', '$1' . $label . '$3', $content);
        }
    }

    return $content;
}, 10, 2);

/**
 * News Feed Actions: Like, Comment, Share
 */

// 1. AJAX Like Handler
add_action('wp_ajax_news_like', 'handle_news_like');
add_action('wp_ajax_nopriv_news_like', 'handle_news_like');

function handle_news_like() {
    $post_id = intval($_POST['post_id']);
    if (!$post_id) wp_send_json_error();

    $likes = get_post_meta($post_id, '_news_likes', true);
    $likes = $likes ? intval($likes) : 0;
    
    $cookie_name = 'news_liked_' . $post_id;
    $liked = isset($_COOKIE[$cookie_name]);

    if ($liked) {
        $likes = max(0, $likes - 1);
        setcookie($cookie_name, '', time() - 3600, COOKIEPATH, COOKIE_DOMAIN);
        $status = 'unliked';
    } else {
        $likes++;
        setcookie($cookie_name, '1', time() + (86400 * 30), COOKIEPATH, COOKIE_DOMAIN);
        $status = 'liked';
    }

    update_post_meta($post_id, '_news_likes', $likes);
    wp_send_json_success(['likes' => $likes, 'status' => $status]);
}

// 2. Render Social Actions Panel
function render_news_social_actions($post_id = null) {
    if (!$post_id) $post_id = get_the_ID();
    
    $likes = get_post_meta($post_id, '_news_likes', true);
    $likes = $likes ? intval($likes) : 0;
    $comments_count = get_comments_number($post_id);
    $post_url = get_permalink($post_id);
    $post_title = get_the_title($post_id);
    $is_liked = isset($_COOKIE['news_liked_' . $post_id]);
    
    ob_start();
    ?>
    <div class="news-actions" data-post-id="<?php echo $post_id; ?>">
        <div class="news-actions__item news-actions__like <?php echo $is_liked ? 'is-active' : ''; ?>" onclick="handleNewsLike(<?php echo $post_id; ?>, this)">
            <svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M16 4a5.95 5.95 0 0 0-4.3 1.9L11 6.6l-.7-.7A5.95 5.95 0 0 0 2 10c0 4.4 6 9 9 10 3-1 9-5.6 9-10A5.95 5.95 0 0 0 16 4z"/></svg>
            <span class="news-actions__count"><?php echo $likes ?: ''; ?></span>
        </div>
        
        <a href="<?php echo $post_url; ?>#comments" class="news-actions__item news-actions__comment">
            <svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12c0 2.02.6 3.9 1.63 5.48L2 22l4.52-1.63C8.1 21.4 9.98 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.85 0-3.58-.55-5.03-1.49l-2.61.94.94-2.61C4.55 15.58 4 13.85 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8z"/></svg>
            <span class="news-actions__count"><?php echo $comments_count ?: ''; ?></span>
        </a>

        <div class="news-actions__item news-actions__share" onclick="toggleNewsShare(this)">
            <svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/></svg>
            <div class="news-share-popover">
                <a href="https://vk.com/share.php?url=<?php echo urlencode($post_url); ?>" target="_blank">VK</a>
                <a href="https://t.me/share/url?url=<?php echo urlencode($post_url); ?>&text=<?php echo urlencode($post_title); ?>" target="_blank">Telegram</a>
                <a href="https://connect.ok.ru/offer?url=<?php echo urlencode($post_url); ?>" target="_blank">OK</a>
                <a href="https://max.ru/share?url=<?php echo urlencode($post_url); ?>" target="_blank">Max</a>
                <a href="#" onclick="copyNewsLink('<?php echo $post_url; ?>'); return false;">Ссылка</a>
            </div>
        </div>
    </div>
    <?php
    return ob_get_clean();
}

// 3. News Excerpt Length
add_filter('excerpt_length', function($length) {
    if (in_category('novosti') || (is_single() && in_category('novosti'))) {
        return 25; // ~2-4 lines
    }
    return $length;
}, 999);

add_filter('excerpt_more', function($more) {
    if (in_category('novosti')) {
        return '...';
    }
    return $more;
});

// 4. Scripts for News Actions
add_action('wp_footer', function() {
    ?>
    <script>
    function handleNewsLike(postId, el) {
        const formData = new FormData();
        formData.append('action', 'news_like');
        formData.append('post_id', postId);

        fetch('<?php echo admin_url('admin-ajax.php'); ?>', {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                const countEl = el.querySelector('.news-actions__count');
                countEl.textContent = data.data.likes || '';
                el.classList.toggle('is-active', data.data.status === 'liked');
            }
        });
    }

    function toggleNewsShare(el) {
        el.classList.toggle('is-open');
    }

    function copyNewsLink(url) {
        navigator.clipboard.writeText(url).then(() => {
            alert('Ссылка скопирована!');
        });
    }

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.news-actions__share')) {
            document.querySelectorAll('.news-actions__share.is-open').forEach(el => el.classList.remove('is-open'));
        }
    });
    </script>
    <?php
});

// 5. Shortcode for news actions (to use in single.html or blocks)
add_shortcode('news_actions', function() {
    if (in_category('novosti')) {
        return render_news_social_actions();
    }
    return '';
});

// 6. Add body class for single news posts to apply specific styles
add_filter('body_class', function($classes) {
    if (is_single() && in_category('novosti')) {
        $classes[] = 'category-novosti-single';
    }
    return $classes;
});

// 7. Exclude "Новости" from the main blog feed
add_action('pre_get_posts', function($query) {
    // 29 is the ID of "Новости" category
    if (!is_admin() && $query->is_main_query() && (is_home() || (is_archive() && !is_category('novosti')))) {
        $query->set('category__not_in', array(29));
    }
});
