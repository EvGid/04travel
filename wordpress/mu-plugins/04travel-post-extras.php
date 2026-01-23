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

/**
 * Shortcode for social reactions widget (likes, comments, share, support)
 * Usage: [oasis_social_reactions]
 */
add_shortcode('oasis_social_reactions', function($atts) {
    global $post;
    if (!$post) return '';

    $post_id = $post->ID;
    $post_url = get_permalink($post_id);
    $post_title = get_the_title($post_id);
    $comments_count = get_comments_number($post_id);

    ob_start();
    ?>
    <div class="oasis-reactions" data-post-id="<?php echo esc_attr($post_id); ?>">
        <div class="oasis-reactions__left">
            <!-- Like -->
            <button class="oasis-reaction-btn oasis-reaction-btn--like" data-action="like" title="Нравится">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 22V11M2 13V20C2 21.1046 2.89543 22 4 22H17.4262C18.907 22 20.1662 20.9197 20.3914 19.4562L21.4683 12.4562C21.7479 10.6389 20.3418 9 18.5032 9H15C14.4477 9 14 8.55228 14 8V4.46584C14 3.10399 12.896 2 11.5342 2C11.2093 2 10.915 2.1913 10.7831 2.48812L7.26394 10.4061C7.10344 10.7673 6.74532 11 6.35013 11H4C2.89543 11 2 11.8954 2 13Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span class="oasis-reaction-btn__count" data-count="like">0</span>
            </button>

            <!-- Comments -->
            <a href="#respond" class="oasis-reaction-btn oasis-reaction-btn--comments" title="Комментарии">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span class="oasis-reaction-btn__count"><?php echo esc_html($comments_count); ?></span>
            </a>

            <!-- Share -->
            <div class="oasis-reaction-btn oasis-reaction-btn--share" title="Поделиться">
                <button type="button" class="oasis-share-trigger" onclick="event.preventDefault(); event.stopPropagation(); this.parentElement.querySelector('.oasis-share-dropdown').classList.toggle('open');">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 12V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V12M16 6L12 2M12 2L8 6M12 2V15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
                <div class="oasis-share-dropdown">
                    <div class="oasis-share-dropdown__header">Поделиться</div>
                    <button type="button" class="oasis-share-item" onclick="navigator.clipboard.writeText('<?php echo esc_js($post_url); ?>').then(function(){alert('Ссылка скопирована!');});">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        <span>Скопировать ссылку</span>
                    </button>
                    <button type="button" class="oasis-share-item" onclick="window.open('https://vk.com/share.php?url=<?php echo urlencode($post_url); ?>&title=<?php echo urlencode($post_title); ?>','_blank','width=600,height=400');">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="#0077FF"><path d="M12.785 16.241s.288-.032.436-.194c.136-.148.132-.427.132-.427s-.02-1.304.587-1.496c.596-.19 1.362 1.259 2.174 1.816.613.42 1.08.328 1.08.328l2.17-.03s1.135-.07.596-.962c-.044-.073-.312-.66-1.609-1.866-1.358-1.263-1.176-1.058.46-3.24.995-1.328 1.393-2.14 1.268-2.488-.118-.331-.852-.244-.852-.244l-2.441.015s-.181-.025-.315.056c-.131.079-.216.264-.216.264s-.387 1.03-.903 1.906c-1.089 1.848-1.524 1.946-1.702 1.832-.414-.266-.31-1.066-.31-1.635 0-1.778.27-2.52-.525-2.712-.264-.063-.458-.105-1.132-.112-.865-.008-1.598.003-2.012.207-.276.136-.49.44-.36.457.161.022.526.098.72.363.248.341.24 1.109.24 1.109s.143 2.093-.333 2.354c-.327.178-.775-.186-1.739-1.852-.49-.853-.86-1.796-.86-1.796s-.072-.176-.199-.27c-.154-.115-.369-.151-.369-.151l-2.321.015s-.349.01-.477.161c-.114.135-.009.413-.009.413s1.82 4.258 3.881 6.403c1.889 1.967 4.034 1.838 4.034 1.838h.972z"/></svg>
                        <span>VK</span>
                    </button>
                    <button type="button" class="oasis-share-item" onclick="window.open('https://t.me/share/url?url=<?php echo urlencode($post_url); ?>&text=<?php echo urlencode($post_title); ?>','_blank','width=600,height=400');">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="#26A5E4"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                        <span>Telegram</span>
                    </button>
                    <button type="button" class="oasis-share-item" onclick="window.open('https://max.ru/share?url=<?php echo urlencode($post_url); ?>','_blank','width=600,height=400');">
                        <svg width="20" height="20" viewBox="0 0 24 24"><defs><linearGradient id="max_share_grad" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stop-color="#4cf"/><stop offset="66%" stop-color="#53e"/><stop offset="100%" stop-color="#93d"/></linearGradient></defs><rect width="24" height="24" rx="5" fill="url(#max_share_grad)"/><path fill="#fff" d="M12.2 18.5c-1.8 0-2.6-.3-4.1-1.3-.9 1.2-3.8 2.1-4-.5 0-1.2-.3-2.2-.6-3.3-.4-1.3-.8-2.8-.8-5 0-5.2 4.3-9.1 9.3-9.1 5.1 0 9 4.1 9 9.2 0 5-4 9-9 9zm.1-13.7c-2.5-.1-4.4 1.6-4.8 4.2-.4 2.2.3 4.9.8 5 .3.1.9-.5 1.3-.9.6.4 1.3.7 2.2.8 2.5.1 4.7-1.8 4.9-4.4.1-2.5-1.9-4.7-4.4-4.7z"/></svg>
                        <span>Max</span>
                    </button>
                    <button type="button" class="oasis-share-item" onclick="window.open('https://connect.ok.ru/offer?url=<?php echo urlencode($post_url); ?>&title=<?php echo urlencode($post_title); ?>','_blank','width=600,height=400');">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="#EE8208"><path d="M12 12.75c2.9 0 5.25-2.35 5.25-5.25S14.9 2.25 12 2.25 6.75 4.6 6.75 7.5s2.35 5.25 5.25 5.25zm0-7.5c1.24 0 2.25 1.01 2.25 2.25S13.24 9.75 12 9.75 9.75 8.74 9.75 7.5 10.76 5.25 12 5.25zm5.57 9.83a8.25 8.25 0 0 1-4.07 1.42v3.25a1.5 1.5 0 0 1-3 0V16.5a8.25 8.25 0 0 1-4.07-1.42 1.5 1.5 0 0 1 1.64-2.51 5.25 5.25 0 0 0 5.86 0 1.5 1.5 0 0 1 1.64 2.51z"/></svg>
                        <span>Одноклассники</span>
                    </button>
                </div>
            </div>
            <script>
            if (typeof oasisShareInit === 'undefined') {
                window.oasisShareInit = true;
                document.addEventListener('click', function(e) {
                    var dropdowns = document.querySelectorAll('.oasis-share-dropdown.open');
                    dropdowns.forEach(function(d) {
                        if (!d.parentElement.contains(e.target)) {
                            d.classList.remove('open');
                        }
                    });
                });
            }
            </script>

            <!-- Dislike -->
            <button class="oasis-reaction-btn oasis-reaction-btn--dislike" data-action="dislike" title="Не нравится">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 2V13M22 11V4C22 2.89543 21.1046 2 20 2H6.57385C5.09299 2 3.83382 3.08028 3.60862 4.54379L2.53165 11.5438C2.25207 13.3611 3.65818 15 5.49687 15H9C9.55228 15 10 15.4477 10 16V19.5342C10 20.896 11.104 22 12.4658 22C12.7907 22 13.085 21.8087 13.2169 21.5119L16.7361 13.5939C16.8966 13.2327 17.2547 13 17.6499 13H20C21.1046 13 22 12.1046 22 11Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
        </div>
    </div>
    <script>
    (function() {
        const pid = '<?php echo esc_js($post_id); ?>';
        const key = 'oasis_reac_' + pid;
        const stored = JSON.parse(localStorage.getItem(key) || '{}');
        const container = document.currentScript.previousElementSibling.querySelector('.oasis-social-reactions');
        if (!container) return;

        const lb = container.querySelector('.oasis-reaction-btn--like');
        const db = container.querySelector('.oasis-reaction-btn--dislike');
        const lc = lb.querySelector('.oasis-reaction-btn__count');

        let likes = stored.l || 0;
        if (lc) lc.textContent = likes;
        if (stored.ul) lb.classList.add('active');
        if (stored.ud) db.classList.add('active');

        const cb = container.querySelector('.oasis-reaction-btn--comments');
        if (cb) {
            cb.onclick = function(e) {
                const target = document.querySelector('.wp-block-comments') || document.querySelector('#respond');
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth' });
                    // If target is #respond, also focus it
                    if (target.id === 'respond') {
                        const textarea = target.querySelector('textarea');
                        if (textarea) textarea.focus();
                    }
                }
            };
        }

        lb.onclick = function() {
            let s = JSON.parse(localStorage.getItem(key) || '{}');
            if (lb.classList.contains('active')) {
                likes--; lb.classList.remove('active'); s.ul = false;
            } else {
                likes++; lb.classList.add('active'); s.ul = true;
                if (db.classList.contains('active')) { db.classList.remove('active'); s.ud = false; }
            }
            s.l = likes; lc.textContent = likes;
            localStorage.setItem(key, JSON.stringify(s));
        };
        db.onclick = function() {
            let s = JSON.parse(localStorage.getItem(key) || '{}');
            if (db.classList.contains('active')) {
                db.classList.remove('active'); s.ud = false;
            } else {
                db.classList.add('active'); s.ud = true;
                if (lb.classList.contains('active')) {
                    likes--; lb.classList.remove('active'); s.ul = false;
                    s.l = likes; lc.textContent = likes;
                }
            }
            localStorage.setItem(key, JSON.stringify(s));
        };
    })();
    </script>
    <?php
    return ob_get_clean();
});

/**
 * Customize WordPress comment form:
 * 1. Change title from "Добавить комментарий" to "Комментарии"
 * 2. Add "Войти, чтобы комментировать" link for non-logged-in users
 * 3. Keep the form visible for everyone
 */
add_filter('comment_form_defaults', function($defaults) {
    // Change the title
    $defaults['title_reply'] = 'Комментарии';
    $defaults['title_reply_to'] = 'Ответ на комментарий %s';
    
    // Add login link at the bottom for non-logged-in users
    if (!is_user_logged_in()) {
        $login_url = wp_login_url(get_permalink());
        $defaults['submit_field'] = '<p class="form-submit">%1$s %2$s</p>
            <p class="oasis-login-to-comment" style="text-align: right; margin-top: 10px;">
                <a href="' . esc_url($login_url) . '" style="color: #c9302c; text-decoration: none; font-size: 14px;">Войти, чтобы комментировать</a>
            </p>';
    }
    
    return $defaults;
});
