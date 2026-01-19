<?php
/**
 * Plugin Name: 04travel Glass Blog Cards
 * Description: Ultimate Parity Fix V8 (Placeholder Images + Layout Fixes)
 * Version: 8.0
 * Author: 04travel
 */

if (!defined('ABSPATH')) exit;

/**
 * Filter to inject featured image (or placeholder) into blog cards
 */
function travel_v8_block_fix($block_content, $block) {
    if (strpos($block_content, 'oasis-blog-card') !== false) {
        $post_id = get_the_ID();
        if ($post_id) {
            $thumb_url = get_the_post_thumbnail_url($post_id, 'large');
            if (!$thumb_url) {
                // High-quality Altay placeholder
                $thumb_url = 'https://images.unsplash.com/photo-1541447142022-d122ccc2b979?auto=format&fit=crop&q=80&w=1024';
            }
            // Inject data-bg more robustly - strictly match the class to avoid child elements like oasis-blog-card__title
            // Check if data-bg is already present to avoid multiple injections
            if (strpos($block_content, 'data-bg') === false) {
                $block_content = preg_replace_callback(
                    '/(<[^>]*class="[^"]*(?<![a-zA-Z0-9-_])oasis-blog-card(?![a-zA-Z0-9-_])[^"]*"[^>]*)(>)/',
                    function($matches) use ($thumb_url) {
                        $tag_open = $matches[1];
                        $tag_close = $matches[2];
                        return $tag_open . ' data-bg="' . esc_attr($thumb_url) . '"' . $tag_close;
                    },
                    $block_content
                );
            }
        }
    }
    
    // Inject marker for category nav
    if (strpos($block_content, 'oasis-category-nav') !== false || strpos($block_content, 'cezony/') !== false) {
        if (strpos($block_content, 'oasis-nav-scroll') === false) {
            $block_content = str_replace('wp-block-columns', 'wp-block-columns oasis-nav-scroll', $block_content);
        }
    }

    return $block_content;
}
add_filter('render_block', 'travel_v8_block_fix', 9999, 2);

/**
 * Assets for 1:1 Parity
 */
function travel_v8_assets() {
    ?>
    <style id="oasis-v8-styles">
        /* PC WIDTH CONSTRAINT */
        @media (min-width: 1025px) {
            .wp-block-query.alignfull,
            .wp-block-query.alignwide,
            .oasis-category-nav {
                width: 100% !important;
                max-width: 1320px !important; /* Standard site-container width */
                margin-left: auto !important;
                margin-right: auto !important;
                box-sizing: border-box !important;
                padding-left: 20px !important; /* Safety padding */
                padding-right: 20px !important;
            }
        }

        /* HEADER & NAV FIXES */
        .oasis-category-nav {
            position: relative !important;
            z-index: 100 !important;
            background: transparent !important; /* REMOVE WHITE BG */
            margin-top: 100px !important; 
            margin-bottom: 30px !important;
            box-shadow: none !important; /* REMOVE SHADOW */
            width: 100% !important;
            max-width: 100% !important;
            border-bottom: none !important;
        }
        
        @media (min-width: 1025px) {
            .oasis-category-nav { 
                margin-top: 40px !important; 
                max-width: 1320px !important;
            }
        }

        /* CATEGORY NAV BUTTONS STYLE - COMPACT PILLS */
        .oasis-nav-scroll {
            display: flex !important;
            flex-direction: row !important;
            flex-wrap: nowrap !important; 
            justify-content: center !important;
            align-items: center !important;
            gap: 8px !important; 
            padding: 8px 16px !important;
            width: 100% !important;
            box-sizing: border-box !important;
            overflow-x: auto !important;
            -webkit-overflow-scrolling: touch !important;
            scrollbar-width: none !important;
            background: transparent !important;
        }

        .oasis-nav-scroll::-webkit-scrollbar {
            display: none !important;
        }

        /* FORCE ALL COLUMNS TO SHRINK TO CONTENT - CRITICAL FOR MOBILE */
        .oasis-nav-scroll.wp-block-columns,
        .oasis-nav-scroll.wp-block-columns:not(.is-not-stacked-on-mobile) {
            flex-wrap: nowrap !important;
            flex-direction: row !important;
            display: flex !important;
            gap: 8px !important;
        }
        
        .oasis-nav-scroll .wp-block-column {
            flex-basis: auto !important; 
            flex-grow: 0 !important;
            flex-shrink: 0 !important;
            width: auto !important;
            min-width: 0 !important;
            max-width: none !important;
            margin: 0 !important;
            padding: 0 !important;
            background: transparent !important;
        }

        /* RESET ALL GROUP PADDING - THIS IS THE FIX */
        .oasis-nav-scroll .wp-block-group {
            padding: 0 !important;
            margin: 0 !important;
            background: transparent !important;
            border-radius: 0 !important;
        }

        .oasis-nav-scroll .wp-block-button__link,
        .oasis-nav-scroll .wp-block-button,
        .oasis-nav-scroll a,
        .oasis-nav-scroll .wp-block-column,
        .oasis-nav-scroll .wp-block-group,
        .oasis-nav-scroll p {
            background-color: transparent !important; 
            background: transparent !important;
            box-shadow: none !important;
            border: none !important;
            color: #000 !important;
            margin: 0 !important;
            padding: 0 !important;
        }

        .oasis-nav-scroll a {
            border-radius: 0 !important;
            padding: 6px 10px !important;
            font-size: 13px !important; 
            font-weight: 700 !important;
            text-decoration: none !important;
            transition: all 0.2s ease !important;
            white-space: nowrap !important;
            display: inline-block !important;
            text-transform: uppercase !important;
            letter-spacing: 0.5px !important;
        }

        /* MOBILE: EVEN SMALLER BUTTONS */
        @media (max-width: 480px) {
            .oasis-nav-scroll {
                justify-content: flex-start !important;
                gap: 6px !important;
                padding: 8px 12px !important;
            }
            .oasis-nav-scroll a {
                font-size: 10px !important;
                padding: 4px 6px !important;
                letter-spacing: 0 !important;
            }
        }

        .oasis-nav-scroll a:hover {
            opacity: 0.6 !important;
        }


        /* BLOG CARDS */
        .oasis-blog-card {
            position: relative !important;
            overflow: hidden !important;
            border-radius: 16px !important; 
            background-color: #eee !important;
            width: 100% !important;
            max-width: 100% !important;
            aspect-ratio: 16 / 10 !important;
            transition: all 0.3s ease !important;
            cursor: pointer;
            padding: 0 !important;
        }

        .oasis-blog-card .wp-block-post-featured-image { display: none !important; }

        .oasis-card-media {
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 100% !important;
            background-size: cover !important;
            background-position: center !important;
            z-index: 0 !important;
            filter: brightness(0.9) !important;
            transition: transform 0.6s ease !important;
        }

        .oasis-blog-card:hover .oasis-card-media {
            transform: scale(1.05) !important;
            filter: brightness(1) !important;
        }

        .oasis-blog-card::after {
            content: "" !important;
            position: absolute !important;
            inset: 0 !important;
            background: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.8) 100%) !important;
            z-index: 1 !important;
            pointer-events: none !important;
        }

        .oasis-blog-card__content {
            position: absolute !important;
            bottom: 0 !important;
            left: 0 !important;
            right: 0 !important;
            padding: 20px !important;
            z-index: 2 !important;
            color: #fff !important;
            text-shadow: 0 2px 10px rgba(0,0,0,0.5) !important;
        }

        .oasis-blog-card__title {
            font-size: 1.25rem !important;
            margin: 0 0 4px !important;
            font-weight: 700 !important;
            color: #fff !important;
        }

        .oasis-blog-card__title a {
            color: inherit !important;
            text-decoration: none !important;
        }

        .oasis-blog-card__excerpt {
            font-size: 0.8rem !important;
            opacity: 0.9 !important;
            margin: 0 !important;
            color: #fff !important;
        }

        @media (max-width: 768px) {
            /* FORCE RESET ALL NESTED CONTAINER PADDINGS */
            .wp-block-query,
            .wp-block-post-template,
            .wp-block-post-template.is-layout-grid {
                padding-left: 0 !important;
                padding-right: 0 !important;
                margin-left: 0 !important;
                margin-right: 0 !important;
            }
            main.alignfull {
                padding-left: 15px !important;
                padding-right: 15px !important;
            }
            .oasis-blog-card {
                height: 240px !important;
                aspect-ratio: auto !important;
                width: 100% !important;
                margin-left: 0 !important;
                margin-right: 0 !important;
            }
            .oasis-blog-card__content { padding: 20px !important; }
            .oasis-blog-card__title { font-size: 1.25rem !important; }
        }
    </style>
    
    <script id="oasis-v8-script">
        (function() {
            function recoverImages() {
                document.querySelectorAll('.oasis-blog-card').forEach(card => {
                    const bgUrl = card.getAttribute('data-bg');
                    if (bgUrl && !card.querySelector('.oasis-card-media')) {
                        const media = document.createElement('div');
                        media.className = 'oasis-card-media';
                        media.style.backgroundImage = 'url(' + bgUrl + ')';
                        card.prepend(media);
                    }
                });
            }
            // Run immediately and on DOM load
            recoverImages();
            document.addEventListener('DOMContentLoaded', recoverImages);
            
            // Observer for dynamic content (infinite scroll etc)
            const observer = new MutationObserver(recoverImages);
            observer.observe(document.body, { childList: true, subtree: true });
        })();
    </script>
    <?php
}
add_action('wp_footer', 'travel_v8_assets', 9999);
