//= ../../../bower_components/jquery/dist/jquery.min.js
//= ../../../bower_components/owl.carousel/src/js/owl.carousel.js


$(document).ready(function(){

    console.log('ss')

  $('.owl-carousel').owlCarousel({
    loop:true,
    margin:0,
    nav:true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:1
        },
        1000:{
            items:1
        }
    }
})
});