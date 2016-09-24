$(document).ready(function() {

	function heightDetect() {
		$(".main_header").css("min-height", $(window).height());
	};
	heightDetect();
	$(window).resize(function() {
		heightDetect();
	});

	particlesJS.load('particles-js', 'assets/libs/particles.js/particlesjs-config.json', function() {
	  
	});
	function scroll_down() {
	    var el = document.querySelector('.container');
	    smooth_scroll_to(el, el.scrollTop + 400, 600);
	};
	$(".scroll-down").mPageScroll2id();
	$("#toggle_mnu").click(function(){
		$(this).toggleClass("on");
		$(".mnu").slideToggle();
		return false;
	});
	// $(".popup").magnificPopup({type:"image"});
	// $(".popup_content").magnificPopup({
	// 	type:"inline",
	// 	midClick: true
	// });

	$('.owl-carousel').owlCarousel({
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
	        // 720:{
	        // 	items:1,
	        // 	nav: false,
	        // 	pagination: true,
	        // 	dots: true,
	        // }
	    }
	});
	$("input, select, textarea").jqBootstrapValidation();
	// var designForm = document.getElementById('main_form')

	// $("input, select.cs-select, textarea").jqBootstrapValidation({
	// 	preventSubmit: true, 
	// 	submitError: function($designForm, event, errors) { 
	// 	// Here I do nothing, but you could do something like display 
	// 	// the error messages to the user, log, etc. 
	// 	}, 
	// 	submitSuccess: function($designForm, event) { 
	// 	alert("OK"); 
	// 	event.preventDefault(); 
	// 	}, 
	// 	filter: function() { 
	// 	return $(this).is(":visible"); 
	// 	} 
	// });
	// $("a[data-toggle=\"tab\"]").click(function(e) {
 //        e.preventDefault();
 //        $(this).tab("show");
 //    });
	// $(".main_form").validate({

	// });
	
	


	


	$(".loader_inner").fadeOut();
	$(".loader").delay(200).fadeOut("slow");


// $(window).on('load', function () {
//     var $preloader = $('.loader'),
//         $spinner   = $preloader.find('.loader_inner');
//     $spinner.fadeOut();
//     $preloader.delay(600).fadeOut('slow');
// // // });
// $(window).load(function() {
//     setTimeout(function() {
//       $('.loader').fadeOut('slow', function() {});
//     }, 2000);

//   });

});


// (function() {
// 	[].slice.call( document.querySelectorAll( 'select.cs-select' ) ).forEach( function(el) {	
// 		new SelectFx(el);
// 	} );
// })();

// $(function() {

//   $('form[name="forms"]').find('input,select,textarea').not('[type=submit]').jqBootstrapValidation({

//     submitSuccess: function ($form, event) {

//       $.ajax({
//         type: 'POST',
//         url: $form.attr('action'),
//         data: $form.serialize(),
//         success: function(data)
//         { 
//           // just to confirm ajax submission
//           console.log('submitted successfully!');
//           alert("asd");
//         }
//       });

//       // will not trigger the default submission in favor of the ajax function
//       event.preventDefault();
//     }

//   });

// });

// $(document).ready(function() {

//         $('#step1').jqBootstrapValidation({
//             message: 'This value is not valid',
//             live: 'enabled',
            
//             submitHandler: function(validator, form, submitButton) {

//                 $.ajax({
//                   type: "POST",
//                   url: "scripts/process-step2.php",
//                   data: $('#step1').serialize(),
//                   success: function(msg){
                    
//                   },
//                   error: function(){
//                     alert("error");
//                   }
//                 });
//             },
//             excluded: ':disabled',
//             fields: {
//                 coverage: {
//                     validators: {
//                         notEmpty: {
//                             message: 'Please select level of coverage'
//                         }
//                     }
//                 }
//             }
//         });
//       });

            // $(function() {
            //     $(".main_form").find("label>input,textarea").jqBootstrapValidation(
            //         {
            //             preventSubmit: true,
            //             submitError: function($form, event, errors) {
            //                 // Here I do nothing, but you could do something like display 
            //                 // the error messages to the user, log, etc.
            //             },
            //             submitSuccess: function($form, event) {
            //                 alert("OK");
            //                 event.preventDefault();
            //             },
            //             filter: function() {
            //                 return $(this).is(":visible");
            //             }
            //         }
            //     );
            // });
// 