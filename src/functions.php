<?php

/*=== Front-End ===*/
function dcSrc()
{
    return get_template_directory_uri();
}

add_action('after_setup_theme', 'dc_theme_support');
add_action('wp_enqueue_scripts', 'dc_front_scripts');
add_action('admin_head', 'dc_admin_scripts');

add_action( 'admin_menu', 'remove_page_attribute_support', 10000000000 );
//add_filter( 'tiny_mce_before_init', 'my_custom_styles' );
add_editor_style(dcSrc() . "/assets/css/admin.css");

function dc_theme_support()
{
    add_theme_support('custom-logo');
    add_theme_support('post-thumbnails');
    //add_image_size( 'square-photo',  400,  400, array( 'center', 'center' )  );

    add_theme_support('title-tag');
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
    ));

    add_theme_support('automatic-feed-links');
    add_theme_support('custom-background');
    add_theme_support('customize-selective-refresh-widgets');

    register_nav_menu( 'header', 'Header Menu' );
    register_nav_menu( 'ensembles', 'Ensembles Menu' );
    register_nav_menu( 'footer', 'Footer Menu' );
}

function dc_front_scripts()
{
    $time = time();

    //css
    wp_enqueue_style('dc-connect-style', dcSrc() . "/style.css?v=" . $time);

    //js
    wp_enqueue_script('script-js', dcSrc() . "/assets/js/script.js?v=" . $time);
}

function dc_admin_scripts()
{
    echo '<link rel="stylesheet" href="' . dcSrc() . '/assets/css/admin.css" type="text/css" media="all" />';
    echo '<script src="' . dcSrc() . '/assets/js/admin.js"></script>';
}

//add custom styles to the WordPress editor
function my_custom_styles( $init_array ) {  
 
    $style_formats = array(  
        array(  
            'title' => 'Gray block',  
            'block' => 'div',
            'classes' => 'gray-block',
            'wrapper' => true,
        )
    );  
    // Insert the array, JSON ENCODED, into 'style_formats'
    $init_array['style_formats'] = json_encode( $style_formats );  
    
    return $init_array;  
  
}

function remove_page_attribute_support() {
    $user = wp_get_current_user();
    $role = $user->data->user_login;

    if(is_admin() && $role == 'editor')
    {
        remove_menu_page('edit.php?post_type=acf-field-group');
        remove_menu_page('options-general.php');
        remove_menu_page('admin.php?page=wc-settings');
        remove_menu_page('users.php');
    }
    remove_menu_page('tools.php');
    remove_menu_page('edit-comments.php');
    remove_menu_page('edit.php');
}