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
        

        <div class="oasis-social-icons">
            <a href="tel:+79635106746" class="oasis-social-icon oasis-social-icon--phone" title="Позвонить">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="40" height="40" rx="12" fill="#4A5D4E"></rect>
                    <path d="M25.7 21C22.6 19.9 21.6 19.9 20 21.3C18.4 22.7 18.2 22.7 17.5 22.3C16.8 21.9 13.9 19.6 13.5 18.5C13.1 17.4 13.5 16.9 14.2 16.3L15.4 15.2C15.8 14.8 15.8 14.2 15.6 13.7L13.8 10.3C13.5 9.8 13 9.4 12.4 9.4C11.5 9.4 10.5 10 9.8 10.5C8.8 11.2 8.1 12.4 8.1 13.7C8.1 15.4 8.7 17.1 9.8 18.7C11.3 22 15.1 27.2 20.2 29.3C21.7 30 23.3 30.5 25 30.5C26.7 30.5 28.5 30 29.8 28.7C30.4 28.1 30.9 27.2 30.9 26.2C30.9 25.4 30.4 24.7 29.8 24.3L27.6 22.5C27 22.1 26.3 21.3 25.7 21Z" fill="white"></path>
                </svg>
            </a>
            <a href="https://t.me/travel_ra" class="oasis-social-icon oasis-social-icon--telegram" target="_blank" rel="noreferrer noopener" title="Telegram">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="40" height="40" rx="12" fill="#26A5E4"></rect>
                    <path d="M28.9 11.2L10.4 18.3C9.1 18.8 9.1 19.6 10.2 19.9L14.9 21.4L16.7 27.1C16.9 27.6 16.8 27.9 17.4 27.9C17.9 27.9 18.1 27.7 18.4 27.4L20.9 25L25.7 28.5C26.6 29 27.2 28.8 27.4 27.7L30 12.5C30.3 11.1 29.5 10.6 28.9 11.2ZM17.5 24.3L16.5 20.6L26.3 14.4C26.7 14.1 27.1 14.3 26.8 14.6L18.3 22.2L17.5 24.3Z" fill="white"></path>
                </svg>
            </a>
            <a href="https://vk.com/domgornii" class="oasis-social-icon oasis-social-icon--vk" target="_blank" rel="noreferrer noopener" title="ВКонтакте">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="40" height="40" rx="12" fill="#0077FF"></rect>
                    <path d="M21.1164 29C12.5749 29 7.703 22.994 7.5 13H11.7786C11.9191 20.3353 15.0733 23.4424 17.5717 24.0831V13H21.6006V19.3263C24.0678 19.054 26.6596 16.1712 27.5341 13H31.5629C30.8915 16.9079 28.0807 19.7908 26.082 20.976C28.0807 21.9369 31.282 24.4514 32.5 29H28.0651C27.1126 25.957 24.7393 23.6026 21.6006 23.2823V29H21.1164Z" fill="white"></path>
                </svg>
            </a>
            <a href="https://max.ru/id41103048347_biz" class="oasis-social-icon oasis-social-icon--max" target="_blank" rel="noreferrer noopener" title="Профиль Max">
                <svg width="40" height="40" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="max_a"><stop offset="0" stop-color="#4cf"></stop><stop offset=".662" stop-color="#53e"></stop><stop offset="1" stop-color="#93d"></stop></linearGradient>
                        <linearGradient id="max_c" x1="117.8" x2="1000" y1="760.5" y2="500" gradientUnits="userSpaceOnUse" href="#max_a"></linearGradient>
                    </defs>
                    <rect width="1000" height="1000" fill="url(#max_c)" rx="120"></rect>
                    <path fill="#fff" fill-rule="evenodd" d="M508.2 878.3c-75 0-109.9-11-170.5-54.8-38.3 49.3-159.7 87.8-165 21.9 0-49.5-11-91.2-23.4-136.9-14.8-56.2-31.6-118.8-31.6-209.5 0-216.6 177.8-379.6 388.4-379.6 210.8 0 375.9 171 375.9 381.6.7 207.3-166.6 376.1-373.9 377.2m3.1-571.6c-102.6-5.3-182.5 65.7-200.2 177-14.6 92.2 11.3 204.4 33.4 210.2 10.6 2.6 37.2-19 53.8-35.6a189.8 189.8 0 0 0 92.7 33c106.3 5.1 197.1-75.8 204.2-182 4.2-106.4-77.7-196.5-184-202.6Z" clip-rule="evenodd"></path>
                </svg>
            </a>
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
