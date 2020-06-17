<?php get_header(); ?>

<div id="app"><?php if(get_custom_logo()){?><img src="<?=get_custom_logo()['image']['src']?>" alt="<?=get_custom_logo()['logo']->title->rendered?>" style="display:none;"><?php }?></div>

<?php get_footer();
