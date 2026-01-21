<?php
/**
 * Plugin Name: 04travel Post Extras
 * Description: Dynamic contact section and meta extraction for 04travel.ru
 */

if (!defined('WPINC')) {
    die;
}

/**
 * Shortcode to render centered contact buttons and optional source link
 * Usage: [oasis_contact_section]
 */
add_shortcode('oasis_contact_section', function($atts) {
    global $post;
    if (!$post) return '';

    $open_page_url = get_post_meta($post->ID, 'oasis_open_page_url', true);
    
    ob_start();
    ?>
    <div class="oasis-cta oasis-booking" style="margin-top: 40px; text-align: center;">
        <h3 class="wp-block-heading has-text-align-center">Связаться и забронировать</h3>
        
        <div class="wp-block-buttons" style="display: flex; justify-content: center; flex-wrap: wrap; gap: 12px; margin-top: 20px;">
            <div class="wp-block-button">
                <a class="wp-block-button__link wp-element-button" href="tel:+79635106746">Позвонить</a>
            </div>
            <div class="wp-block-button">
                <a class="wp-block-button__link wp-element-button" href="https://t.me/travel_ra" target="_blank" rel="noreferrer noopener">Telegram</a>
            </div>
            <div class="wp-block-button">
                <a class="wp-block-button__link wp-element-button" href="https://vk.com/domgornii" target="_blank" rel="noreferrer noopener">ВКонтакте</a>
            </div>
            <div class="wp-block-button">
                <a class="wp-block-button__link wp-element-button" href="https://max.ru/id41103048347_biz" target="_blank" rel="noreferrer noopener">Профиль Max</a>
            </div>
        </div>

        <?php if ($open_page_url): ?>
        <div class="oasis-open-source-wrap" style="margin-top: 20px; text-align: center;">
            <p>
                <a class="oasis-open-source-btn" href="<?php echo esc_url($open_page_url); ?>" target="_blank" rel="noopener nofollow">Открыть страницу</a>
            </p>
        </div>
        <?php endif; ?>
    </div>
    <?php
    return ob_get_clean();
});
