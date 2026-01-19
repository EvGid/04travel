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
