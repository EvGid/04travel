<?php
/**
 * Overridden template for WP Telegram Login
 * Location: wp-content/themes/twentytwentyfive-child/wptelegram-login/login-view.php
 */

// Original plugin logic to prepare $html
$atts = '';
if ( '' !== $login_options['corner_radius'] ) {
	$atts .= ' data-radius="' . esc_attr( $login_options['corner_radius'] ) . '"';
}
if ( empty( $login_options['show_user_photo'] ) ) {
	$atts .= ' data-userpic="false"';
}
if ( ! empty( $login_options['lang'] ) ) {
	$atts .= ' data-lang="' . esc_attr( $login_options['lang'] ) . '"';
}

$error_message = '';
if ( WPTG_Login()->options()->get( 'show_message_on_error' ) ) {
	$error_message = esc_attr( WPTG_Login()->options()->get( 'custom_error_message' ) );
	if ( empty( $error_message ) ) {
		$error_message = sprintf( '%s %s', __( 'Error loading Telegram Login!', 'wptelegram-login' ), __( 'May be your ISP blocks Telegram!', 'wptelegram-login' ) );
	}

	$atts .= ' data-error-message="' . $error_message . '" onerror="(function(script){if(script.dataset.errorMessage){var doc=document,div=doc.createElement(\'div\'),span=doc.createElement(\'span\');span.appendChild(doc.createTextNode(script.dataset.errorMessage));div.setAttribute(\'class\', \'error-message\');div.appendChild(span);Object.assign(div.style,{overflow:\'scroll\',border:\'1px solid rgb(221, 221, 221)\',textAlign:\'center\',display:\'inline-block\',padding:\'5px\'});script.parentElement.appendChild(div);}})(this)"';
}

$html = sprintf(
	'<script async src="https://telegram.org/js/telegram-widget.js?%1$s" data-telegram-login="%2$s" data-size="%3$s" data-auth-url="%4$s" data-request-access="write" %5$s></script>',
	esc_attr( WPTG_Login()->version() ),
	esc_attr( $login_options['bot_username'] ),
	esc_attr( ( $login_options['button_style'] ) ),
	esc_url( $login_options['callback_url'] ),
	$atts
);

// Unique container ID to prevent duplicate VK ID widgets
$vkid_container_id = 'vkid-auth-' . uniqid();
?>
<div class="wptelegram-login-output-wrap container">
	<div style="text-align: center; margin-bottom: 20px;">
		<?php echo $html; ?>
	</div>
    
    <!-- VK ID Authorization Widget (rendered only once per page) -->
    <?php if (!defined('VKID_WIDGET_RENDERED')): ?>
    <?php define('VKID_WIDGET_RENDERED', true); ?>
    <div style="margin-top: 15px; text-align: center;">
        <div id="<?php echo esc_attr($vkid_container_id); ?>"></div>

        <script src="https://unpkg.com/@vkid/sdk@<3.0.0/dist-sdk/umd/index.js"></script>
        <script type="text/javascript">
            (function() {
                if ('VKIDSDK' in window && !window.vkidInitialized) {
                    window.vkidInitialized = true;
                    const VKID = window.VKIDSDK;

                    VKID.Config.init({
                        app: 54427215,
                        redirectUrl: 'https://wp.04travel.ru',
                        responseMode: VKID.ConfigResponseMode.Callback,
                        source: VKID.ConfigSource.LOWCODE,
                        scope: '', 
                    });

                    const oAuth = new VKID.OAuthList();
                    const container = document.getElementById('<?php echo esc_js($vkid_container_id); ?>');
                    
                    if (container) {
                        oAuth.render({
                            container: container,
                            oauthList: ['vkid', 'mail_ru', 'ok_ru']
                        })
                        .on(VKID.WidgetEvents.ERROR, function(error) {
                            console.error('VKID Error:', error);
                        })
                        .on(VKID.OAuthListInternalEvents.LOGIN_SUCCESS, function (payload) {
                            const code = payload.code;
                            const deviceId = payload.device_id;
                            VKID.Auth.exchangeCode(code, deviceId)
                                .then(function(data) { console.log('VKID Success:', data); })
                                .catch(function(error) { console.error('VKID Error:', error); });
                        });
                    }
                }
            })();
        </script>
    </div>
    <?php endif; ?>
</div>
