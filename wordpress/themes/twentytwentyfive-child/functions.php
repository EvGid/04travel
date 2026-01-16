<?php
/**
 * Twenty Twenty-Five Child functions and definitions
 */

function twentytwentyfive_child_enqueue_styles() {
    // Подключаем стили родительской темы
    wp_enqueue_style('parent-style', get_template_directory_uri() . '/style.css');
    
    // Подключаем стили дочерней темы
    wp_enqueue_style('child-style', get_stylesheet_uri(), array('parent-style'), wp_get_theme()->get('Version'));

    // Подключаем скрипт для хедера
    wp_enqueue_script('oasis-header-js', get_stylesheet_directory_uri() . '/assets/oasis-header.js', array(), wp_get_theme()->get('Version'), true);
}
add_action('wp_enqueue_scripts', 'twentytwentyfive_child_enqueue_styles');
