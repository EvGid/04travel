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
