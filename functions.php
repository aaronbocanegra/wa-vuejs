<?php
/** Convert Wordpress to Headless CMS **/
// Remove all default WP template redirects/lookups
remove_action( 'template_redirect', 'redirect_canonical' );

// Redirect all requests to index.php so the Vue app is loaded and 404s aren't thrown
function remove_redirects() {
	add_rewrite_rule( '^/(.+)/?', 'index.php', 'top' );
}
add_action( 'init', 'remove_redirects' );
/** End Headless CMS conversion **/

/** Load Vue JS and CSS **/
function load_vue_scripts() {
	wp_enqueue_script(
		'vue-wordpress-js',
		get_stylesheet_directory_uri() . '/dist/vue-wordpress.js',
		array( 'jquery' ),
		filemtime( get_stylesheet_directory() . '/dist/vue-wordpress.js' ),
		true
	);

	wp_enqueue_style(
		'vuejs-wordpress-theme-starter-css',
		get_stylesheet_directory_uri() . '/dist/vue-wordpress.css',
		null,
		filemtime( get_stylesheet_directory() . '/dist/vue-wordpress.css' )
	);
}
add_action( 'wp_enqueue_scripts', 'load_vue_scripts', 100 );

/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */
function vuejs_wordpress_theme_support() {

        // Add default posts and comments RSS feed links to head.
        add_theme_support( 'automatic-feed-links' );

        // Custom background color.
        add_theme_support(
                'custom-background',
                array(
                        'default-color' => 'f5efe0',
                )
        );

        // Set content-width.
        global $content_width;
        if ( ! isset( $content_width ) ) {
                $content_width = 580;
        }

        /*
         * Enable support for Post Thumbnails on posts and pages.
         *
         * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
         */
        add_theme_support( 'post-thumbnails' );

        // Set post thumbnail size.
        set_post_thumbnail_size( 250, 250 );

        // Add custom image size used in Cover Template.
        add_image_size( 'vuejs_wordpress-4k', 4096, 2160 );
        add_image_size( 'vuejs_wordpress-1080', 1920, 1080 );
        add_image_size( 'vuejs_wordpress-720', 1280, 720 );
        add_image_size( 'vuejs_wordpress-480', 720, 480 );

        // Custom logo.
        $logo_width  = 120;
        $logo_height = 120;

        // If the retina setting is active, double the recommended width and height.
        if ( get_theme_mod( 'retina_logo', false ) ) {
                $logo_width  = floor( $logo_width * 2 );
                $logo_height = floor( $logo_height * 2 );
        }

       // Add Logo Support
        add_theme_support(
                'custom-logo',
                array(
                        'height'      => $logo_height,
                        'width'       => $logo_width,
                        'flex-height' => true,
                        'flex-width'  => true,
                        'header-text' => array( 'site-title', 'site-description' ),
                )
        );

        /*
         * Let WordPress manage the document title.
         * By adding theme support, we declare that this theme does not use a
         * hard-coded <title> tag in the document head, and expect WordPress to
         * provide it for us.
         */
        add_theme_support( 'title-tag' );

        /*
         * Switch default core markup for search form, comment form, and comments
         * to output valid HTML5.
         */
        add_theme_support(
                'html5',
                array(
                        'search-form',
                        'comment-form',
                        'comment-list',
                        'gallery',
                        'caption',
                        'script',
                        'style',
                )
        );

        /*
         * Make theme available for translation.
         * Translations can be filed in the /languages/ directory.
         * If you're building a theme based on Twenty Twenty, use a find and replace
         * to change 'vuejs_wordpress' to the name of your theme in all the template files.
         */
        load_theme_textdomain( 'vuejs_wordpress' );

        // Add support for full and wide align images.
        add_theme_support( 'align-wide' );

        // Add support for responsive embeds.
        add_theme_support( 'responsive-embeds' );

        // Add support for Customize Selective Refresh Widgets
	add_theme_support( 'customize-selective-refresh-widgets' );

        register_nav_menus( array(
            'header' => 'Header',
            'footer' => 'Footer',
        ) );

}
add_action( 'after_setup_theme', 'vuejs_wordpress_theme_support' );

/**
 * Enque Admin Scripts for Custom Meta Boxes
 **/
add_action( 'admin_enqueue_scripts', 'vuejs_scripts_meta_box' );
function vuejs_scripts_meta_box(){
	wp_enqueue_script('jquery-ui-core');
	wp_enqueue_script('jquery-ui-widget');
	wp_enqueue_script('jquery-ui-sortable');
	wp_enqueue_script('jquery-ui-dialog');
	if ( ! did_action( 'wp_enqueue_media' ) )
		wp_enqueue_media();

	wp_enqueue_script('meta_scripts', get_template_directory_uri() . '/js/meta_scripts.js', array('jquery','jquery-ui-sortable') );

        wp_register_style( 'custom_wp_admin_gallery_css', get_bloginfo('stylesheet_directory') . '/css/admin-style-gallery.css', false, '1.0.1' );
        wp_enqueue_style( 'custom_wp_admin_gallery_css' );
        wp_register_style( 'custom_wp_admin_video_css', get_bloginfo('stylesheet_directory') . '/css/admin-style-video.css', false, '1.0.2' );
        wp_enqueue_style( 'custom_wp_admin_video_css' );
}

/** Enable Mime Types **/
function add_file_types_to_uploads($file_types){
    $new_filetypes = array();
    $new_filetypes['svg'] = 'image/svg+xml';
    $file_types = array_merge($file_types, $new_filetypes );
    return $file_types;
}
add_filter('upload_mimes', 'add_file_types_to_uploads');

/**
 * Get the information about the logo.
 *
 * @return string $JSON
 */
function vuejs_wordpress_get_custom_logo( ) {
        $logo_id = get_theme_mod( 'custom_logo' );

        if ( ! $logo_id ) {
                return "No Image Exists";
        }
        //https://whatartist.com/wp-json/wp/v2/media/$ID
        //$logoMeta = wp_get_attachment_metadata( $logo_id );
        $logoImageSrc = wp_get_attachment_image_src( $logo_id );
        $logoImageArr = array(
                             "src"    => $logoImageSrc[0],
                             "width"  => $logoImageSrc[1],
                             "height" => $logoImageSrc[2],
                             "icon"   => $logoImageSrc[3],
                        );
        $json = file_get_contents(get_bloginfo('url') .'/wp-json/wp/v2/media/' . $logo_id);
        $logo = json_decode($json);
        $arr = array(
                   "id"           => $logo_id,
                   "site_name"    => get_bloginfo(),
                   "site_tagline" => get_bloginfo("description"),
                   "image"        => $logoImageArr,
                   "logo"         => $logo,
               );
        return $arr;

}
add_filter( 'get_custom_logo', 'vuejs_wordpress_get_custom_logo' );

/**
 * Get wa-link-prevue from url
 *
 * @return string $JSON
 */
function vuejs_wordpress_get_wa_link_prevue( ) {
        $link = rtrim( $_GET['link'], '/');
        $linkRegex = '/((http(s)?)(\:\/\/)?(www)?(\w+)?(\.)(\w+)(\.)?(\w+)?)/m';
        if( preg_match_all( $linkRegex, $link, $baseUrl, PREG_SET_ORDER, 0) ){
		$baseUrl = $baseUrl[0][0];
        }else{
		return FALSE;
	}

      	$headers = @get_headers( $link );
	if( !$headers ){
    		return FALSE;
	}else{
		$html = file_get_contents( $link );
	}

        $titleRegex = '/(?<=<title>)(.*?)(?=<\/title>)/m';
        preg_match_all( $titleRegex, $html, $title, PREG_SET_ORDER, 0);

        $descRegex = '/(<meta(.*)name=[\'|\"]description[\'|\"](.*)content=[]\'|\"])(.*)([\'|\"](.*)?\/?>)/m';
        preg_match_all( $descRegex, $html, $description, PREG_SET_ORDER, 0);

        $imageRegex = '/(<img(.*)src=[\'|\"])([^"|^\']*)([\'|\"](.*)>)/m';
        preg_match_all( $imageRegex, $html, $images, PREG_SET_ORDER, 0);

	if( count($title) > 0){
          $title = $title[0][0];
        }

	if( count($description) > 0){
          $description = $description[0][0];
          $dRegex = '/(?<=content=[]\'|\"])(.*)(?=[\'|\"])/m';
          preg_match_all( $dRegex, $description, $description, PREG_SET_ORDER, 0);
          $description = $description[0][0];
        }

        $images = $images[0][0];
        $imgRegex = '/(?<=\ssrc=[\'|\"])([^"|^\']*)(?=[\'|\"])/m';
        preg_match_all( $imgRegex, $images, $images, PREG_SET_ORDER, 0);
	if($images[0][0]){
    		$images = str_replace( $link, '', $images[0][0] );
        	$images = $baseUrl . '/' . trim( $images, '/' );
	}else{
		$images = NULL;
	}

        if($title || $description || $images){
		return ['link' => $link, 'title' => $title, 'description' => $description, 'image' => $images];
	}else{
		return FALSE;
	}
}
add_filter( 'get_wa_link_prevue', 'vuejs_wordpress_get_wa_link_prevue' );

function vuejs_wordpress_get_videos() {
        $videos = get_post_meta($_GET['postid'], 'vuejs_custom_videos' );
        return $videos;

}
add_filter( 'get_videos', 'vuejs_wordpress_get_videos' );


function vuejs_wordpress_get_menus()
{
    $menus = array();
    // $locations is an array where ([NAME] = MENU_ID);
    $locations = get_nav_menu_locations();

    foreach ( array_keys( $locations ) as $name ) {
        $id = $locations[$name];
        $menu_items = wp_get_nav_menu_items( $id );
        $tree = wpse170033_nav_menu_object_tree( $menu_items );
        $menus[$name] = $tree;
    }
    $i = 0;
    foreach($menus as $menu){
       foreach($menu as $m){
           if(get_site_url() == $m->url){
              $m->slug = "/";
           }else if($m->object == "page"){
             $slug = get_post_field( 'post_name', $m->object_id );
             $m->slug = $slug;
           }else if($m->object == "category"){
                   $slug = get_category( $m->object_id );
                   $m->slug = $slug->slug;
           }
           foreach($m->children as $child){
               if(get_site_url() == $child->url){
                  $child->slug = "/";
               }else if($child->object == "page"){
                   $cslug = get_post_field( 'post_name', $child->object_id );
                   $child->slug = $cslug->slug;
               }else if($child->object == "category"){
                   $cslug = get_category( $child->object_id );
                   $child->slug = $cslug->slug;
               }
           }
       }
       $i++;
    }
    return $menus;
}
add_filter( 'get_menus', 'vuejs_wordpress_get_menus' );

/**
 * Modification of "Build a tree from a flat array in PHP"
 */
function wpse170033_nav_menu_object_tree( $nav_menu_items_array ) {
    foreach ( $nav_menu_items_array as $key => $value ) {
        $value->children = array();
        $nav_menu_items_array[ $key ] = $value;
    }

    $nav_menu_levels = array();
    $index = 0;
    if ( ! empty( $nav_menu_items_array ) ) do {
        if ( $index == 0 ) {
            foreach ( $nav_menu_items_array as $key => $obj ) {
                if ( $obj->menu_item_parent == 0 ) {
                    $nav_menu_levels[ $index ][] = $obj;
                    unset( $nav_menu_items_array[ $key ] );
                }
            }
        } else {
            foreach ( $nav_menu_items_array as $key => $obj ) {
                if ( in_array( $obj->menu_item_parent, $last_level_ids ) ) {
                    $nav_menu_levels[ $index ][] = $obj;
                    unset( $nav_menu_items_array[ $key ] );
                }
            }
        }
        $last_level_ids = wp_list_pluck( $nav_menu_levels[ $index ], 'db_id' );
        $index++;
    } while ( ! empty( $nav_menu_items_array ) );

    $nav_menu_levels_reverse = array_reverse( $nav_menu_levels );

    $nav_menu_tree_build = array();
    $index = 0;
    if ( ! empty( $nav_menu_levels_reverse ) ) do {
        if ( count( $nav_menu_levels_reverse ) == 1 ) {
            $nav_menu_tree_build = $nav_menu_levels_reverse;
        }
        $current_level = array_shift( $nav_menu_levels_reverse );
        if ( isset( $nav_menu_levels_reverse[ $index ] ) ) {
            $next_level = $nav_menu_levels_reverse[ $index ];
            foreach ( $next_level as $nkey => $nval ) {
                foreach ( $current_level as $ckey => $cval ) {
                    if ( $nval->db_id == $cval->menu_item_parent ) {
                        $nval->children[] = $cval;
                    }
                }
            }
        }
    } while ( ! empty( $nav_menu_levels_reverse ) );

    $nav_menu_object_tree = $nav_menu_tree_build[ 0 ];
    return $nav_menu_object_tree;
}

/** Custom Routes **/
function vuejs_wordpress_register_rest_routes() {
    // For retrieving all theme mods.
    // Sample request URL: http://example.com/wp-json/vujs_wordpress/v2/settings
    register_rest_route( 'vuejs_wordpress/v2', '/settings', [
        'methods'  => 'GET',
        'callback' => function () {
            return get_theme_mods();
        },
        //'permission_callback' => function () {
        //    return current_user_can( 'manage_options' );
        //},
    ] );

    register_rest_route( 'vuejs_wordpress/v2', '/post_count', [
        'methods'  => 'GET',
        'callback' => function () {
            return wp_count_posts()->publish;
        },
        //'permission_callback' => function () {
        //    return current_user_can( 'manage_options' );
        //},
    ] );

    register_rest_route( 'vuejs_wordpress/v2', '/page_count', [
        'methods'  => 'GET',
        'callback' => function () {
            return wp_count_posts($post_type ='page')->publish;
        },
    ] );

    // For retrieving a specific theme mod.
    // Sample request URL: http://example.com/wp-json/vuejs_wordpress/v2/settings/custom_logo
    register_rest_route( 'vuejs_wordpress/v2', '/settings/(?P<name>[a-zA-Z0-9\-_]+)', [
        'methods'  => 'GET',
        'callback' => function ( $request ) {
            return vuejs_wordpress_get_custom_logo();
        },
        //'permission_callback' => function () {
        //    return current_user_can( 'managec_options' );
        //},
    ] );

    register_rest_route( 'vuejs_wordpress/v2', '/wa-link-prevue', [
        'methods'  => 'GET',
        'callback' => function ( $request ) {
            return vuejs_wordpress_get_wa_link_prevue();
        },
    ] );

    // For retrieving all Menus.
    // Sample request URL: http://example.com/wp-json/vujs_wordpress/v2/menus
    register_rest_route( 'vuejs_wordpress/v2', '/menus', [
        'methods'  => 'GET',
        'callback' => function () {
            return vuejs_wordpress_get_menus();
        },
    ] );

    // Sample request URL: http://example.com/wp-json/vuejs_wordpress/v2/vuejs_videos?postid=1
    register_rest_route( 'vuejs_wordpress/v2', '/vuejs_videos', [
        'methods'  => 'GET',
        'callback' => 'vuejs_wordpress_get_videos'
    ] );

    register_rest_field( 'post', 'metadata', array(
      'get_callback' => function ( $data ) {
          return get_post_meta( $data['id'], '', '' );
    }, ));

}
add_action( 'rest_api_init', 'vuejs_wordpress_register_rest_routes' );

/**
 * Custom Meta Boxes HTML View
 **/

function vuejs_gallery_field( $name, $value = '', $post ) {
        ?>
        <div class="vue-js-notice">**Save post after deleting or sorting.</div>
            <ul class="vuejs_gallery_mtb">
        <?php
	/* array with image IDs for hidden field */
	$hidden = array();

	if( $images = get_posts( array(
		'post_type' => 'attachment',
		'orderby' => 'post__in', /* we have to save the order */
		'order' => 'ASC',
		'post__in' => explode(',',$value), /* $value is the image IDs comma separated */
		'numberposts' => -1,
		'post_mime_type' => 'image'
	) ) ) {

		foreach( $images as $image ) {
			$hidden[] = $image->ID;
			$image_src = wp_get_attachment_image_src( $image->ID, array( 80, 80 ) );
                        $image_full = wp_get_attachment_url( $image->ID );
			?>
			<li data-id="<?=$image->ID?>" data-postID="<?=$post->ID?>">
                            <img data-src="<?=$image_full?>" src="<?=$image_src[0]?>" alt="<?=$image->post_title?>"/>
                            <div class="vuejs-tools-overlay">
                                <a href="javascript:void(0);" class="vuejs_gallery_edit" title="Edit Content">
                                    <svg class="vuejs-edit-icon vuejs-icon" viewBox="0 0 20 20">
			                <path d="M18.303,4.742l-1.454-1.455c-0.171-0.171-0.475-0.171-0.646,0l-3.061,3.064H2.019c-0.251,0-0.457,0.205-0.457,0.456v9.578c0,0.251,0.206,0.456,0.457,0.456h13.683c0.252,0,0.457-0.205,0.457-0.456V7.533l2.144-2.146C18.481,5.208,18.483,4.917,18.303,4.742 M15.258,15.929H2.476V7.263h9.754L9.695,9.792c-0.057,0.057-0.101,0.13-0.119,0.212L9.18,11.36h-3.98c-0.251,0-0.457,0.205-0.457,0.456c0,0.253,0.205,0.456,0.457,0.456h4.336c0.023,0,0.899,0.02,1.498-0.127c0.312-0.077,0.55-0.137,0.55-0.137c0.08-0.018,0.155-0.059,0.212-0.118l3.463-3.443V15.929z M11.241,11.156l-1.078,0.267l0.267-1.076l6.097-6.091l0.808,0.808L11.241,11.156z"></path>
				    </svg>
                                </a>
                                <a href="javascript:void(0);" class="vuejs_gallery_remove" title="Remove Content">
                                   <svg class="vuejs-del-icon vuejs-icon" viewBox="0 0 20 20">
				       <path d="M10.185,1.417c-4.741,0-8.583,3.842-8.583,8.583c0,4.74,3.842,8.582,8.583,8.582S18.768,14.74,18.768,10C18.768,5.259,14.926,1.417,10.185,1.417 M10.185,17.68c-4.235,0-7.679-3.445-7.679-7.68c0-4.235,3.444-7.679,7.679-7.679S17.864,5.765,17.864,10C17.864,14.234,14.42,17.68,10.185,17.68 M10.824,10l2.842-2.844c0.178-0.176,0.178-0.46,0-0.637c-0.177-0.178-0.461-0.178-0.637,0l-2.844,2.841L7.341,6.52c-0.176-0.178-0.46-0.178-0.637,0c-0.178,0.176-0.178,0.461,0,0.637L9.546,10l-2.841,2.844c-0.178,0.176-0.178,0.461,0,0.637c0.178,0.178,0.459,0.178,0.637,0l2.844-2.841l2.844,2.841c0.178,0.178,0.459,0.178,0.637,0c0.178-0.176,0.178-0.461,0-0.637L10.824,10z"></path>
				   </svg>
                                </a>
                            </div>
                        </li>
			<?php
		}
	}
        ?>
	</ul><div style="clear:both"></div></div>
	<input type="hidden" name="<?=$name?>" value="<?=join(',',$hidden)?>" /><a href="javascript:void(0);" class="button vuejs_upload_gallery_button">Add Content</a>
        <div id="vuejs-overlay">
            <button id="vuejs-close-button">
                <svg class="vuejs-close-icon" xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 18 18">
                    <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"/>
                </svg>
            </button>
         <div id="vuejs-inner-overlay"></div>
     </div>
<?php
}
/* End vuejs_gallery_field */

function vuejs_videos_field( $name, $value = '', $post_id, $post ) {
	/*
         * Populate Fields
         */
?>
    <div class="vuejs_videos_mtb">
        <div class="vue-js-notice">**Save post after making changes.</div>
 	<a class="vuejs_videos_description" href="https://wordpress.org/support/article/embeds/#okay-so-what-sites-can-i-embed-from" title="Okay, So What Sites Can I Embed From?">
            WordPress oEmbed Availability
        </a>
        </br>This function is designed to swap fixed width and height to <code>style="width:100%; height:100%;"</code> If this fails, please change in textarea.
	<ul id="vuejs_videos_form" post-id="<?=$post_id?>">
	<?php
            if( $value[0] != NULL && $value[0] != "" ){
		$i = 0;
                foreach( $value[0] as $val){
	            $oembed_video_url 	           = $val['vuejs_video_url'];
		    $oembed_video_thumbnail        = $val['vuejs_video_thumbnail'];
		    $oembed_video_thumbnail_width  = $val['vuejs_video_thumbnail_width'];
		    $oembed_video_thumbnail_height = $val['vuejs_video_thumbnail_height'];
		    $oembed_video_title            = $val['vuejs_video_title'];
		    $oembed_video_author_name      = $val['vuejs_video_author_name'];
		    $oembed_video_oembed           = $val['vuejs_video_oembed'];
	 ?>
            <li id="video-<?=$i?>">
                <div class="vuejs_video_field vuejs_video_url_field">
               	    <input class="vuejs_video_id" name="vuejs_custom_videos[<?=$i?>][id]" type="hidden" value='<?=$i?>' />
     	            <input class="vuejs_video_url" type="url" name="vuejs_custom_videos[<?=$i?>][vuejs_video_url]"  placeholder="Enter Video URL" value="<?=$oembed_video_url?>" />
	            <button type="button" class="vuejs_videos_delete vuejs_videos_button">Delete Video</button>
		</div>
                <?php
		if ( $oembed_video_thumbnail != NULL ) {
		?>
		<div class="vuejs_video_field vuejs_video_hidden_field vuejs_video_data_field">
                    <h3><?=$oembed_video_title?></h3>
  	            <img class="vuejs_video_thumbnail" src="<?=$oembed_video_thumbnail?>" alt="" />
               	    <input class="vuejs_video_thumbnail" name="vuejs_custom_videos[<?=$i?>][vuejs_video_thumbnail]" type="hidden" value='<?=$oembed_video_thumbnail?>' />
               	    <input class="vuejs_video_thumbnail_width" name="vuejs_custom_videos[<?=$i?>][vuejs_video_thumbnail_width]" type="hidden" value='<?=$oembed_video_thumbnail_width?>' />
               	    <input class="vuejs_video_thumbnail_height" name="vuejs_custom_videos[<?=$i?>][vuejs_video_thumbnail_height]" type="hidden" value='<?=$oembed_video_thumbnail_height?>' />
               	    <input class="vuejs_video_title" name="vuejs_custom_videos[<?=$i?>][vuejs_video_title]" type="hidden" value='<?=$oembed_video_title?>' />
               	    <input class="vuejs_video_author_name" name="vuejs_custom_videos[<?=$i?>][vuejs_video_author_name]" type="hidden" value='<?=$oembed_video_author_name?>' />
               	    <input class="vuejs_video_type" name="vuejs_custom_videos[<?=$i?>][vuejs_video_type]" type="hidden" value='oembed' />
               	    <textarea class="vuejs_video_oembed" name="vuejs_custom_videos[<?=$i?>][vuejs_video_oembed]"><?=$oembed_video_oembed?></textarea>
               </div>
		<?php
		} // end if ( $oembed_video_url )
               ?>
             </li>
          <?php
		$i++;
              } // End foreach
          } // End if
	  ?>
        </ul>
        <div id="vuejs-video-dialog" style="display:none">Video is Loading...
          <svg xmlns:svg="http://www.w3.org/2000/svg"
            xmlns="http://www.w3.org/2000/svg" 
            xmlns:xlink="http://www.w3.org/1999/xlink"
            version="1.0" width="64px" height="64px" viewBox="0 0 128 128" style="fill: currentColor; color: white; display: flex; padding:2rem; margin: 0 auto;"
            xml:space="preserve">
              <path d="M64.4 16a49 49 0 0 0-50 48 51 51 0 0 0 50 52.2 53 53 0 0 0 54-52c-.7-48-45-55.7-45-55.7s45.3 3.8 49 55.6c.8 32-24.8 59.5-58 60.2-33 .8-61.4-25.7-62-60C1.3 29.8 28.8.6 64.3 0c0 0 8.5 0 8.7 8.4 0 8-8.6 7.6-8.6 7.6z">
                <animateTransform attributeName="transform" type="rotate" from="0 64 64" to="360 64 64" dur="1800ms" repeatCount="indefinite">
                </animateTransform>
              </path>
          </svg>
        </div>
        <button type="button" id="vuejs_videos_newvideo" class="vuejs_videos_button">Add New Video</button>
    </div>
<?php
}

/*
 * Add a meta boxes
 */
add_action( 'admin_menu', 'vuejs_meta_box_add' );

function vuejs_meta_box_add() {
	add_meta_box('vuejsvideosdiv', // meta box ID
		'oEmbed Videos', // meta box title
		'vuejs_videos_print_box', // callback function that prints the meta box HTML
		'post', // post type where to add it
		'normal', // priority
		'high' ); // position

	add_meta_box('vuejsgallerydiv', // meta box ID
		'Portfolio Gallery', // meta box title
		'vuejs_content_print_box', // callback function that prints the meta box HTML
		'post', // post type where to add it
		'normal', // priority
		'high' ); // position
}

/*
 * Meta Box HTML
 */
function vuejs_content_print_box( $post ) {
	$meta_key = 'vuejs_custom_gallery';
	echo vuejs_gallery_field( $meta_key, get_post_meta($post->ID, $meta_key, true), $post );
}

function vuejs_videos_print_box( $post ) {
	$meta_key = 'vuejs_custom_videos';
	echo vuejs_videos_field( $meta_key, get_post_meta($post->ID, $meta_key), $post->ID, $post );
}

/*
 * Save Meta Box data
 */
/* save vuejs_custom_gallery */
add_action('save_post', 'vuejs_gallery_save');
function vuejs_gallery_save( $post_id ) {
	if ( defined('DOING_AUTOSAVE') && DOING_AUTOSAVE )
		return $post_id;
	$meta_key = 'vuejs_custom_gallery';
        $imageArr = ltrim( $_POST[$meta_key], ',' );
	update_post_meta( $post_id, $meta_key, $imageArr );
	return $post_id;
}

add_action('save_post', 'vuejs_videos_save');
function vuejs_videos_save( $post_id ) {
	// Return if doing autosave
	if ( defined('DOING_AUTOSAVE') AND DOING_AUTOSAVE )
		return $post_id;
	// Restrict User
	if ( !current_user_can( 'edit_post', $post_id ) )
		return $post_id;
	// New
	$meta_key = 'vuejs_custom_videos';
	if ( !empty( $_POST[$meta_key] ) )
		update_post_meta( $post_id, $meta_key, $_POST[$meta_key] );
	elseif ( empty( $_POST[$meta_key] ) )
		delete_post_meta( $post_id, $meta_key, $_POST[$meta_key] );

       	return $post_id;
}

/*
 * Delete meta box attachment
 */
add_action ( 'wp_ajax_' . 'vuejs_delete_attachment', 'vuejsDeleteAttachment' );
function vuejsDeleteAttachment(){
	if ( isset($_REQUEST) ) {
	        $mid = $_REQUEST['mid'];
                $res = wp_delete_attachment( $mid, true );
		wp_send_json_success(  [ 'mid' => $mid, 'res' => $res] );
	}
}

add_action ( 'wp_ajax_' . 'vuejs_delete_video', 'vuejsDeleteVideo' );
function vuejsDeleteVideo(){
	if ( isset($_REQUEST) ) {
	        $mid = $_REQUEST['mid'];
		wp_send_json_success(  [ 'mid' => $mid, 'res' => $res] );
	}
}

/*
 * vuejs videos functions
 */

/* load vuejs_custom_video */
add_action ( 'wp_ajax_' . 'vuejs_load_video', 'vuejsLoadVideo' );
function vuejsLoadVideo(){
	if ( isset($_REQUEST) ) {
	        $vid = $_REQUEST['ID'];
	        $url = $_REQUEST['url'];
                $postID = $_REQUEST['post_id'];
                $instance = embed_oembed_html( $url, $postID );
		wp_send_json_success(  [ 'post_id' => $postID, 'ID' => $vid, 'url' => $url, 'instance' => $instance ] );
	}
}

/**
 * Filter embed_oembed_html
 * based on filter 'embed_oembed_html', $html, $url, $attr, $post_ID )
 **/
function embed_oembed_html( $url, $post_ID ) {
	if ( ! class_exists( 'WP_oEmbed' ) )
		require_once( ABSPATH . WPINC . '/class-oembed.php' );

	$WP_oEmbed = new WP_oEmbed();
	$provider = $WP_oEmbed->discover( $url );
	$data = $WP_oEmbed->fetch( $provider, $url );

	if ( isset( $data ) AND $data != false ) {
		$output['thumbnail'] = $data->thumbnail_url;
		$output['oembed']    = $data;
		return $output;
	} else {
		$output['thumbnail'] = false;
		$output['oembed'] = false;
		return $output;
	}

} // end function embed_oembed_html
