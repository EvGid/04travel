<?php
/**
 * Plugin Name: 04travel Social Login Integration
 * Description: Adds social login buttons to comment form and login page
 * Version: 1.0
 * Author: 04travel
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Add social login buttons before comment form for non-logged users
 */
function travel_social_login_comment_form() {
    if (!is_user_logged_in()) {
        echo '<div class="travel-social-login-wrapper" style="margin-bottom: 30px; padding: 20px; background: #f9f9f9; border-radius: 8px;">';
        echo '<p style="margin-bottom: 15px; font-weight: 600;">Войдите через социальные сети:</p>';
        echo '<div class="travel-social-buttons">';
        
        // Heateor Social Login shortcode
        if (function_exists('the_champ_login_button')) {
            echo do_shortcode('[TheChamp-Login]');
        }
        
        // WP Telegram Login button
        if (function_exists('wptelegram_login')) {
            echo '<div class="travel-telegram-login" style="margin-top: 10px;">';
            echo do_shortcode('[wptelegram-login button_style="large" show_user_photo="0" corner_radius="8" lang="ru"]');
            echo '</div>';
        }
        
        echo '</div>';
        echo '</div>';
    }
}
// Disabled - now using modal popup from 04travel-post-extras.php
// add_action('comment_form_top', 'travel_social_login_comment_form', 5);

/**
 * Modify "must log in" message to include social login buttons
 */
function travel_modify_comment_form_defaults($defaults) {
    if (!is_user_logged_in()) {
        $login_url = wp_login_url(get_permalink());
        
        $social_buttons = '<div class="travel-social-login-inline" style="margin: 20px 0;">';
        $social_buttons .= '<p style="margin-bottom: 15px;">Войдите через:</p>';
        
        // Heateor Social Login - DISABLED (VK ID is included via wptelegram login-view.php)
        // if (function_exists('the_champ_login_button')) {
        //     $social_buttons .= do_shortcode('[TheChamp-Login]');
        // }
        
        // Telegram Login
        if (function_exists('wptelegram_login')) {
            $social_buttons .= '<div style="margin-top: 10px;">';
            $social_buttons .= do_shortcode('[wptelegram-login button_style="large" show_user_photo="0" corner_radius="8" lang="ru"]');
            $social_buttons .= '</div>';
        }
        
        $social_buttons .= '</div>';
        
        // Remove default must_log_in message, show only social buttons
        $defaults['must_log_in'] = $social_buttons;
    }
    
    return $defaults;
}
// Re-enabled - shows social buttons instead of default "must log in" message
add_filter('comment_form_defaults', 'travel_modify_comment_form_defaults');

/**
 * Add custom CSS for social login buttons
 */
function travel_social_login_styles() {
    ?>
    <style>
        /* Social login wrapper */
        .travel-social-login-wrapper,
        .travel-social-login-inline {
            text-align: center;
        }
        
        .travel-social-buttons {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            justify-content: center;
            align-items: center;
        }
        
        /* Heateor buttons styling */
        .theChampLogin {
            margin: 0 !important;
        }
        
        .theChampLoginButton {
            margin: 5px !important;
            border-radius: 8px !important;
            transition: transform 0.2s ease;
        }
        
        .theChampLoginButton:hover {
            transform: translateY(-2px);
        }
        
        /* Telegram button styling */
        .travel-telegram-login {
            width: 100%;
            max-width: 100%;
            overflow: visible !important;
        }
        
        .travel-telegram-login iframe {
            margin: 0 auto;
            display: block;
            max-width: 100% !important;
            width: 100% !important;
            height: auto !important;
            min-height: 40px;
        }
        
        /* Hide Heateor warnings for non-admin users */
        .theChampLoginOptions,
        .theChampLoginOptionsContainer > div[style*="background"],
        .theChampLogin > div[style*="yellow"],
        .theChampLogin > div[style*="background-color: yellow"] {
            display: none !important;
        }
        
        /* Mobile responsive */
        @media (max-width: 768px) {
            .travel-social-buttons {
                flex-direction: column;
                width: 100%;
            }
            
            .theChampLoginButton {
                width: 100%;
                max-width: 100%;
            }
            
            .travel-social-login-wrapper,
            .travel-social-login-inline {
                padding: 15px;
                width: 100%;
                box-sizing: border-box;
            }
            
            /* Fix Telegram button on mobile */
            .travel-telegram-login {
                width: 100%;
                overflow: visible !important;
            }
            
            .travel-telegram-login iframe {
                width: 100% !important;
                max-width: 100% !important;
            }
        }
        
        /* Comment form adjustments */
        .comment-form {
            margin-top: 20px;
        }
        
        .must-log-in {
            font-size: 1.1em;
            margin-bottom: 10px;
        }
    </style>
    <?php
}
add_action('wp_head', 'travel_social_login_styles');

/**
 * Add social login buttons to wp-login.php page
 */
function travel_login_page_social_buttons() {
    ?>
    <div class="travel-login-social" style="margin: 20px 0; text-align: center;">
        <p style="margin-bottom: 15px; font-weight: 600;">Или войдите через социальные сети:</p>
        <?php
        if (function_exists('the_champ_login_button')) {
            echo do_shortcode('[TheChamp-Login]');
        }
        
        if (function_exists('wptelegram_login')) {
            echo '<div style="margin-top: 10px;">';
            echo do_shortcode('[wptelegram-login button_style="large" show_user_photo="0" corner_radius="8" lang="ru"]');
            echo '</div>';
        }
        ?>
    </div>
    <style>
        .travel-login-social .theChampLogin {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            justify-content: center;
        }
        
        .travel-login-social .theChampLoginButton {
            border-radius: 8px;
        }
    </style>
    <?php
}
add_action('login_form', 'travel_login_page_social_buttons');
add_action('register_form', 'travel_login_page_social_buttons');
