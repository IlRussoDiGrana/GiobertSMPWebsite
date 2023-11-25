(function($) {	
	"use strict";
	
	/* Default Variables */
	var AppMeOptions = {
		loader:true,
		navigation:"sticky",
		security:""
	};
	
	if (typeof AppMe!=="undefined") {
		jQuery.extend(AppMeOptions, AppMe);
	}
	
	$.AppMe_Theme = {
	
		//Initialize
		init:function() {
			this.loader();			
			this.banner();			
			this.parallax();
			this.wow();
			this.menu();
			this.top();
			this.counter();
			this.skills();
			this.testimonials();
			this.carousel();
			this.screenshots();
			this.popup();
			this.subscribe();
			this.result();
			this.replace();
		},
		
		//Preloader
		loader:function() {
			if (AppMeOptions.loader) {
				jQuery(window).on("load", function() {
					jQuery(".preloader").fadeOut(600);
				});
			}
		},
		
		//Banner
		banner:function() {
			var bgImg, src, delay, arr;
			
			//Image background
			if (jQuery(".banner.image-bg").length>0) {
				bgImg = jQuery(".banner.image-bg");
				src = bgImg.data("source");
				
				if (src!==undefined && src!=="") {
					arr = src.split(",");
					bgImg.backstretch(arr);
				}
			}
			
			//Image background / blog
			if (jQuery(".main-title.blog-bg").length>0) {
				bgImg = jQuery(".main-title.blog-bg");
				src = bgImg.data("source");
				
				if (src!==undefined && src!=="") {
					arr = src.split(",");
					bgImg.backstretch(arr);
				}
			}

			//Slide background
			if (jQuery(".banner.slide-bg").length>0) {
				bgImg = jQuery(".banner.slide-bg");
				src = bgImg.data("source");
				
				if (src!==undefined && src!=="") {
					delay = bgImg.data("delay") * 1000;		
					arr = src.split(",");
					bgImg.backstretch(arr, {duration:delay, fade:750});
				}
			}
	
			//Video background
			if (jQuery(".banner.video-bg").length>0) {
				//Hide player on mobile
				if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
					jQuery(".player").hide();
					jQuery(".player-controls").hide();
				}
				
				//Youtube player
				jQuery(".player").mb_YTPlayer();

				//Player controls
				jQuery("#play").on("click", function() {
					jQuery(".player").playYTP();
				});

				jQuery("#pause").on("click", function() {
					jQuery(".player").pauseYTP();
				});
			}
		},
		
		//Parallax effect
		parallax:function() {
			var $parallax = jQuery(".parallax");
	
			if ($parallax.length>0) {
				$parallax.parallax("50%", 0.5);
			}

			if (jQuery(".parallax-bg").length>0) {
				jQuery(".parallax-bg").each(function() {
					var $parallaxBg = jQuery(this);
					$parallaxBg.css({backgroundImage:"url('"+$parallaxBg.attr("data-bg")+"')"});
				});
			}
		},
		
		//Animate with wow js
		wow:function() {
			new WOW().init(); 
		},
		
		//Menu
		menu:function() {
			//Slick nav
			jQuery(".main-navigation").slicknav({
				prependTo:"#responsive-menu", 
				label:"", 
				closeOnClick:true
			});
			
			//Submenu
			jQuery(".nav li").on("mouseenter", function() {
				jQuery(this).children("ul").stop().slideDown(200);
			});

			jQuery(".nav li").on("mouseleave", function() {
				jQuery(this).children("ul").stop().slideUp(200);
			});
			
			//Header menu
			jQuery(document).on("click", "#navigation ul li a, #responsive-menu ul li a", function() {
				try {
					var id = jQuery(this).attr("href");
					var h = parseFloat(jQuery(id).offset().top);
					var offset = parseInt(jQuery("body").data("offset"), 10);

					jQuery("body, html").stop().animate({
						scrollTop:(h-offset)
					}, 800);

					return false;
				} catch(err) {
					console.log(err);
				}
			});
			
			//Sticky navigation
			if (AppMeOptions.navigation==="sticky") {
				jQuery(window).scroll(function() {
					if (jQuery(window).scrollTop()>200) {
						jQuery(".navbar").addClass("sticky-header");
					} else {
						jQuery(".navbar").removeClass("sticky-header");
					}
				});
			}
		},
		
		//To top
		top:function() {
			jQuery(".to-top").on("click", function() {
				jQuery(window).scrollTo(jQuery("body"), 1500, {offset:{top:0, left:0}});
			});
		},
		
		//Counter
		counter:function() {
			jQuery(".number-count").counterUp({
				delay:4,
				time:600
			});
		},
		
		//Skills
		skills:function() {
			if (jQuery('.progress .progress-bar').length>0) {				
				setTimeout(function() {
					$(window).scroll(function() {
						var scrollTop = jQuery(window).scrollTop();

						jQuery('.progress .progress-bar').each(function() {
							var $that = jQuery(this), 
								itemTop = $that.offset().top-jQuery(window).height()+$that.height()/2;

							if (scrollTop>itemTop && $that.outerWidth()===0) {
								var percent = parseInt(jQuery(this).attr('data-value'), 10)+'%';
								var $value = jQuery(this).parent().parent().find('.progress-value');

								if ($value.length>0) {
									$value.css({width:percent, opacity:0}).html('<span>'+percent+'</span>');
								}

								$that.animate({width:percent}, {duration:1500, queue:false, complete:function() {
									if ($value.length>0) {
										$value.animate({opacity:1}, {duration:300, queue:false});
									}
								}});
							}
						});
					}).scroll();
				}, 1);
			}
		},
		
		//Testimonials
		testimonials:function() {
			if (jQuery(".testimonial-carousel").length>0) {
				jQuery(".testimonial-slider").append(jQuery(".single-block-text"));
				jQuery(".testimonial-nav").append(jQuery(".single-block-media"));
		
				jQuery(".testimonial-slider").slick({
					slidesToShow:1,
					slidesToScroll:1,
					arrows:false,
					fade:true,
					asNavFor:".testimonial-nav"
				});

				jQuery(".testimonial-nav").slick({
					slidesToShow:5,
					slidesToScroll:1,
					asNavFor:".testimonial-slider",
					dots:false,
					centerMode:true,
					focusOnSelect:true,
					variableWidth:false,
					arrows:false,
					responsive:[
						{
							breakpoint:991,
							settings:{
								slidesToShow:3
							}
						},
						{
							breakpoint:480,
							settings:{
								slidesToShow:1
							}
						}
					]
				});
			}
		},
		
		//Header slider
		carousel:function() {
			jQuery("#header-slider-carousel").owlCarousel({
				loop:true,
				items:1,
				margin:10,
				responsiveClass:true,
				nav:false,
				dots:true,
				autoplay:true,
				autoplaySpeed:1000
			});
		},
		
		//Screenshots
		screenshots:function() {
			jQuery(".screenshot-slider").owlCarousel({
				loop:false,
				margin:30,
				responsiveClass:true,
				responsive:{
					0:{
						items:1,
						nav:true,
						dots:false
					},			 
					768:{
						items:3,
						nav:true,
						dots:false
					},			
					960 : {
						items:4
					},			
					1024 : {
						items:5
					}
				},
				nav:false,
				navText:['<i class="fas fa-angle-left"></i>','<i class="fas fa-angle-right"></i>'],
				dots:true,
				autoplay:true,
				autoplaySpeed:1000
			});
		},
		
		//Popup
		popup:function() {
			//Popup video
			jQuery(".popup-video").magnificPopup({
				type:"iframe",
				preloader:true
			});
			
			//Zoom screenshot
			jQuery(".zoom-screenshot").magnificPopup({
				delegate:"a",
				type:"image",
				closeOnContentClick:false,
				closeBtnInside:false,
				mainClass:"mfp-with-zoom",
				image:{verticalFit:true},
				gallery:{enabled:true},
				zoom:{
					enabled:true,
					duration:300, // Don't forget to change the duration also in CSS
					opener:function(element) {
						return element.find("img");
					}
				}
			});
			
			//Popup page
			jQuery(".has-popup").magnificPopup({
				type:"inline",
				fixedContentPos:true,
				fixedBgPos:true,
				overflowY:"auto",
				closeBtnInside:true,
				mainClass:"mfp-with-zoom",
				zoom:{
					enabled:true,
					duration:300
				}
			});
		},
		
		//Subscribe
		subscribe:function() {
			var $that = this;
			
			//Subscribe form validator
			var $subscribeform = jQuery("#subscribeForm");

			$subscribeform.validator({focus:false}).on("submit", function(e) {
				if (!e.isDefaultPrevented()) {
					e.preventDefault();
					
					//Form fields
					var email = jQuery("#emailsubscribe").val();

					//Submit form
					jQuery.ajax({
						type:"POST",
						url:$subscribeform.data("url"),
						data:{
							action:"subscribe",
							security:AppMeOptions.security,
							email:email
						},
						cache:false,
                        success:function(response) {
                            var data = $.parseJSON(response);
							var layer = "#subscribeSubmit";
                            
                            if (data.status==="success") {
								$subscribeform[0].reset();
								$that.result(layer, true, $subscribeform.data("success"));
							} else {
								$that.result(layer, false, "Subscription failed!");
							}
						}
					});
				}
			});
		},
		
		//Form result
		result:function(layer, valid, msg) {
			var cls;
		
			if (valid) {
				cls = "h3 text-center text-success";
			} else {
				cls = "h3 text-center text-danger";
			}

			jQuery(layer).removeClass().addClass(cls).text(msg);
		},
		
		//Replace
		replace:function() {
			//Search form
			var btn = jQuery("input.search-submit"),
				field = jQuery(".search-field"),
				social = jQuery(".widget_social"),
				txt = "";
			
			btn.replaceWith('<button class="search-submit btn-custom btn-fill btn-search" type="submit"><i class="fas fa-angle-right"></i></button>');
			field.addClass("form-control");			
			
			if (field.parent().is("label")) {
				field.unwrap();
			}
			
			//Social
			if (!social.find("header").length) {
				if (social.prev().hasClass("widget_text")) {					
					social.prev().addClass("mb-0");
				}
			}
			
			//Instagram
			jQuery(".instagram-feed li").each(function() {
				var width = jQuery(this)[0].getBoundingClientRect().width;
				jQuery(this).css('height', width+'px');
			});
			
			//Submit
			btn = jQuery(".comment-form .submit");
			txt = btn.val();
			btn.replaceWith('<button id="submit" name="submit" class="submit btn-custom btn-fill btn-comment" type="submit">'+txt+'</button>');		
			
			//Footer menu
			if (jQuery("footer .widget").length===1) {
				jQuery("footer .widget_nav_menu").addClass("fullwidth-nav-menu");
			}
		},
		
		//Share functions
		share:function(network, title, image, url) {
			//Window size
			var w = 650, h = 350, params = "width="+w+", height="+h+", resizable=1";
	
			//Title
			if (typeof title==="undefined") {
				title = jQuery("title").text();
			} else if (typeof title==="string") {
				if (jQuery(title).length>0) {
					title = jQuery(title).text();
				}
			}
			
			//Image
			if (typeof image==="undefined") {
				image = "";
			} else if (typeof image==="string") {
				if (!/http/i.test(image)) {
					if (jQuery(image).length>0) {
						if (jQuery(image).is("img")) {
							image = jQuery(image).attr("src");
						} else {
							image = jQuery(image).find("img").eq(0).attr("src");
						}
					} else {
						image = "";
					}
				}
			}
			
			//Url
			if (typeof url==="undefined" || url==="") {
				url = document.location.href;
			} else {
				if (url==="single-portfolio") {
					url = document.location.protocol+"//"+document.location.host+document.location.pathname+"#view-"+jQuery("#portfolio-details").attr("data-current");
				} else {
					url = document.location.protocol+"//"+document.location.host+document.location.pathname+url;
				}
			}
			
			//Share
			if (network==="twitter") {
				return window.open("https://twitter.com/intent/tweet?text="+encodeURIComponent(title+" "+url), "share", params);
			} else if (network==="facebook") {
				return window.open("https://www.facebook.com/sharer/sharer.php?s=100&p[url]="+encodeURIComponent(url)+"&p[title]="+encodeURIComponent(title)+"&p[images][0]="+encodeURIComponent(image), "share", params);
			} else if (network==="pinterest") {
				return window.open("https://pinterest.com/pin/create/bookmarklet/?media="+image+"&description="+title+" "+encodeURIComponent(url), "share", params);
			} else if (network==="linkedin") {
				return window.open("https://www.linkedin.com/shareArticle?mini=true&url="+encodeURIComponent(url)+"&title="+title, "share", params);
			}
			
			return;
		}	
		
	};
	
	//Initialize
	$.AppMe_Theme.init();

})(jQuery);

//Share Functions
function shareTo(network, title, image, url) {
	return jQuery.AppMe_Theme.share(network, title, image, url);
}


