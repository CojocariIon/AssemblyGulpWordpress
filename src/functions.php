<?php

/*=== Front-End ===*/

// Lang Attributes
function __language_attributes($lang){

  // ignore the supplied argument
  $langs = array( 'en-US');

  // change to whatever you want
  $my_language = $langs[0];

  // return the new attribute
  return 'lang="'.$my_language.'"';
}

add_filter('language_attributes', '__language_attributes');

function templateDirectory()
{
    return get_template_directory_uri();
}

add_action('after_setup_theme', 'themeSupport');
add_action('wp_enqueue_scripts', 'frontScripts');
add_action('admin_head', 'adminScripts');

add_action( 'admin_menu', 'removePageAttributeSupport', 10000000000 );
//add_filter( 'tiny_mce_before_init', 'customStyles' );
add_editor_style(templateDirectory() . "/assets/css/admin.css");

function themeSupport()
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

function frontScripts()
{
    $time = time();

    //css
    wp_enqueue_style('dc-connect-style', templateDirectory() . "/assets/css/style.css?v=" . $time);

    //js
    wp_enqueue_script('script-js', templateDirectory() . "/assets/js/script.js?v=" . $time);
}

function adminScripts()
{
    echo '<link rel="stylesheet" href="' . templateDirectory() . '/assets/css/admin.css" type="text/css" media="all" />';
    echo '<script src="' . templateDirectory() . '/assets/js/admin.js"></script>';
}

//add custom styles to the WordPress editor
function customStyles( $init_array ) {  
 
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

function removePageAttributeSupport() {
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