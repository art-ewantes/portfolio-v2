$(document).ready(function() {
	var y; 
	function heightDetect() {
		// $(".main_header").css("min-height", $(window).height());
		var wH = $(window).height();
		y = wH;
	};
	heightDetect();
	$(window).resize(function() {
		heightDetect();
	});

	// particlesJS.load('particles-js', 'assets/libs/particles.js/particlesjs-config.json', function() {
	  
	// });

	$(".scroll-down").mPageScroll2id();
	$("#toggle_mnu").click(function(){
		$(this).toggleClass("on");
		$(".menu").slideToggle();
		return false;
	});
	// $(".popup").magnificPopup({type:"image"});
	// $(".popup_content").magnificPopup({
	// 	type:"inline",
	// 	midClick: true
	// });

	$('.testemonials .owl-carousel').owlCarousel({
	    loop:true,
	    margin:10,
	    autoplayTimeout: 8000,
	    autoplayHoverPause: true,
	    autoplaySpeed:1400,
	    pagination:false,
	    nav: true,
		navText: ['<img src="../assets/img/prev.png"/>','<img src="../assets/img/next.png"/>'],
	    dots:false,
	    dotsSpeed: 100,
	    responsive:{
	        0:{
	            items:1,
	        	nav: false,
	        	pagination: true,
	        	dots: true,
	        },
	        600:{
	            items:1,
	            autoplay: false,
	        },
	        700:{
	            items:1,
	            autoplay: true,
	        },

	    }
	});
	$('.top_slider .owl-carousel').owlCarousel({
	    loop:true,
	    margin:10,
	    autoplayTimeout: 8000,
	    autoplayHoverPause: true,
	    autoplaySpeed:1400,
	    pagination:false,
	    nav: false,
	    dots:false,
	    dotsSpeed: 100,
	    responsive:{
	        0:{
	            items:1,
	        	nav: false,
	        	pagination: true,
	        	dots: true,
	        },
	        600:{
	            items:1,
	            autoplay: false,
	        },
	        700:{
	            items:1,
	            autoplay: true,
	        },

	    }
	});
	$(window).scroll(function () {

		if ($(this).scrollTop() > y) {
			$("#block").addClass("f-nav");
		} else {
			$("#block").removeClass("f-nav");
		}
	});
	$("input, select, textarea").jqBootstrapValidation();

	$(".loader_inner").fadeOut();
	$(".loader").delay(200).fadeOut("slow");


});
