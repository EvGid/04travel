<?php
/**
 * Overridden template for WP Telegram Login
 * Location: wp-content/themes/twentytwentyfive-child/wptelegram-login/login-view.php
 * VK ID widget removed to avoid duplication - VK buttons come from Heateor Social Login
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
?>
<div class="wptelegram-login-output-wrap container">
	<div style="text-align: center;">
		<?php echo $html; ?>
	</div>
</div>
