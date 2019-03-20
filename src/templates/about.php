<?php
/*
Template Name: About
*/
?>
<?php get_header(); ?>
<?php the_post(); ?>
<div class="page" style="background: #000;">
<div class="header_margin"></div>
	<div class="box-p">
		<div class="caption white mt30 uppercase"><?php the_title(); ?></div>
		<div class="hr_long bg_white"></div>
	</div>
	<div class="box f0 pb100">
		<div class="pt20"></div>
		<div class="md-6">
			<div class="the_content white about_the_content"><?php the_content(); ?></div>
		</div>
		<div class="md-6 center">
			<img src="<?php the_post_thumbnail_url(); ?>" alt="">
		</div>
	</div>

</div>
<?php get_footer(); ?>