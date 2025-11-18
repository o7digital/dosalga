<?php
/**
 * Configuration personnalisée pour WooCommerce
 * À placer dans wp-content/themes/votre-theme/functions.php
 * ou créer un plugin personnalisé
 */

// Activer l'API REST WooCommerce
add_filter('woocommerce_rest_is_request_to_rest_api', '__return_true');

// Autoriser CORS pour l'API WooCommerce
add_action('rest_api_init', function() {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function($value) {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Allow-Headers: Authorization, Content-Type, X-WP-Nonce');
        return $value;
    });
}, 15);

// Configuration supplémentaire pour WooCommerce
add_action('after_setup_theme', function() {
    // Support des images de produits
    add_theme_support('woocommerce');
    add_theme_support('wc-product-gallery-zoom');
    add_theme_support('wc-product-gallery-lightbox');
    add_theme_support('wc-product-gallery-slider');
});

// Désactiver la redirection après connexion WooCommerce
add_filter('woocommerce_login_redirect', function($redirect, $user) {
    return $redirect;
}, 10, 2);

// Ajouter des endpoints personnalisés si nécessaire
add_action('rest_api_init', function() {
    register_rest_route('dosalga/v1', '/sync-products', array(
        'methods' => 'GET',
        'callback' => 'dosalga_sync_products',
        'permission_callback' => '__return_true'
    ));
});

function dosalga_sync_products() {
    // Logique de synchronisation des produits
    return new WP_REST_Response(array(
        'success' => true,
        'message' => 'Products synced successfully'
    ), 200);
}

// Personnaliser les métadonnées des produits
add_filter('woocommerce_product_data_tabs', function($tabs) {
    $tabs['dosalga_custom'] = array(
        'label' => __('DOSALGA Custom', 'woocommerce'),
        'target' => 'dosalga_custom_data',
        'class' => array('show_if_simple', 'show_if_variable'),
    );
    return $tabs;
});

// Ajouter des champs personnalisés dans l'admin WooCommerce
add_action('woocommerce_product_data_panels', function() {
    echo '<div id="dosalga_custom_data" class="panel woocommerce_options_panel">';
    woocommerce_wp_text_input(array(
        'id' => '_dosalga_custom_field',
        'label' => __('Champ personnalisé DOSALGA', 'woocommerce'),
        'description' => __('Ajoutez des informations supplémentaires', 'woocommerce'),
        'desc_tip' => true,
    ));
    echo '</div>';
});

// Sauvegarder les champs personnalisés
add_action('woocommerce_process_product_meta', function($post_id) {
    $custom_field = isset($_POST['_dosalga_custom_field']) ? sanitize_text_field($_POST['_dosalga_custom_field']) : '';
    update_post_meta($post_id, '_dosalga_custom_field', $custom_field);
});
