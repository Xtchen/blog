// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require_tree .
//= require ckeditor/ckeditor

$(document).ready(function(){
	// $('#test').click(function(){
	// 	$(this).remove();
	// });
	$('.addTag').click(function(){
		var tag = $(this).text();
		$('#tags').val(function(i, old){
			return old+","+tag;
		});
	});
	$('#submit-comment').click(function(){
		var com = {
 		 author:$('#comment_author').val(),
 		 post_id:$('#comment_post_id').val(), 
 		 content:$('#comment_content').val()
 		};
		$.ajax({
	 		type: "POST",
	 		url: "/comments",
	 		data: {comment: com},
			success: function(data){
				if(data.saved==false){
					$('#show-alert').addClass("alert alert-error show-alert").html("<p>The comment should contain at least 6 characters.</p>").show().fadeOut(3000, function(){
						$('#show-alert').removeClass("alert alert-error show-alert");
					});
				}
				else{
					clean_content($('#comment_author'));
					clean_content($('#comment_content'));
					$('#comments').empty();
					$('#comments').html(data);
					$("html,body").animate({scrollTop:$('html').height()}, 500);
					$('#show-alert').addClass("alert alert-success show-alert").html("<p>Comment posted successfully.</p>").show().fadeOut(3000, function(){
						$('#show-alert').removeClass("alert alert-success show-alert");
					});
				}
 			}
		});
 		return false;
	 });
 	
 	function clean_content(elem){
 		elem.val("")
 	}

 	$(window).scroll(function(){
 		var distance = $(document).scrollTop();
		var factor=distance/3/$(window).height()+1;
		var height_1=$(window).height()*1.5*factor;
		var width_1=$(window).width()*factor;
		var dis=1.05*distance-200;

		$('#img1').css({'height':ht-distance, 'backgroundSize':width_1+'px '+height_1+'px'});
		$('#lt-trick').css({'backgroundPosition':'700px '+dis+'px'});
		$('#part1 h1,#part1 h2.show').css({'opacity':1-distance/$(window).height()});
		$('#part1 h2.my-hide').css({'opacity':0.2+distance/$(window).height()});

		if(distance==$(document).height()-$(window).height()){
			$('#bottom-intro').fadeIn(2000);
		}
 		if(distance >=100){
 			$('#navbar').css({"opacity":"0.7"});
 		}
 		else{
 			$('#navbar').css({"opacity":"1"});
 		}
 		if (distance >= 1000){
 			$('#go-top').show();
 			$('#go-top').css({"display": "inline", "opacity": "0.3"});
 		}
 		else{
 			$('#go-top').hide();
 		}
 	});

 	$('#go-top').click(function(){
 		$("html,body").animate({scrollTop: 0}, 1000);
 	});

 	$('#go-top').mouseenter(function(){
 		$('#go-top').css({"display": "inline", "opacity": "0.7"});
 	});
 	$('#go-top').mouseleave(function(){
 		$('#go-top').css({"display": "inline", "opacity": "0.3"});
 	});

 	//toNext div in show page
 	$(document).on('click', '#toNext', function(event){
 		$('#loader').show();
 		var $wholeShow = $('#whole_show');
		var nextId=$('#toNextHidden').val();
 		$.ajax({
 			type: "GET",
 			url: nextId,
 			success: function(data){
 				$wholeShow.empty();
 				var $newDiv=$(data).find('#whole_show').html();
 				$wholeShow.html($newDiv);
 				$wholeShow.find('div').hide();
 				$wholeShow.find('#toNext').show();
 				$wholeShow.find('#toPrev').show();
 				$wholeShow.find('div').fadeIn('slow');
  				$('html,body').animate({scrollTop: 0}, 200);
  				$('#loader').hide();
 			}
 		});
 	});

 	//toPrev div in show page
 	$(document).on('click', '#toPrev', function(event){
 		$('#loader').show();
 		var $wholeShow = $('#whole_show');
		var prevId=$('#toPrevHidden').val();
 		$.ajax({
 			type: "GET",
 			url: prevId,
 			success: function(data){
 				$wholeShow.empty();
 				var $newDiv=$(data).find('#whole_show').html();
 				$wholeShow.html($newDiv);
 				$wholeShow.find('div').hide();
 				$wholeShow.find('#toNext').show();
 				$wholeShow.find('#toPrev').show();
 				$wholeShow.find('div').fadeIn('slow');
 				$('html,body').animate({scrollTop: 0}, 200);
 				$('#loader').hide();
 			}
 		});
 	});

// about js starts from here
	var index=1;
	var lis=$('#sentences li');
	function rotate(){
		if(index>=lis.length){
			index=0;
		}
		$(lis).hide();
		$(lis[index]).css({'display':'inline'}).hide().fadeIn(1000);
		index++;
	};

	$(lis).first().css({'display':'inline'});

	setInterval(rotate, 3000);	
	//rotate(0, lis);
	var lt_trick_pos=$(window).width()-700;
	$('#lt-trick').css({'backgroundPosition':'0 0'});
	$('#part1, #part2').css({'height':$(window).height()*1.5});
	$('#part3').css({'height':$(window).height()*0.8});
	var ht=$('#img1').height();	
 	$('#part3 li').mouseenter(function(){
		$(this).find('div').stop().animate({'background-position-x':'-120px','background-position-y': '0px'},500).css({'color':'#FFFFFF'});
		$(this).find('p').stop().animate({'margin-top':'20px'},500);
	});
	$('#part3 li').mouseleave(function(){
		$(this).find('div').stop().animate({'background-position-x':'0px','background-position-y': '-120px'},500).css({'color':'#77c18d'});
		$(this).find('p').stop().animate({'margin-top':'40px'},500);
	});
//about js ends at here
 });

/*
* jPreLoader - jQuery plugin
* Create a Loading Screen to preload images and content for you website
*
* Name:			jPreLoader.js
* Author:		Kenny Ooi - http://www.inwebson.com
* Date:			July 11, 2012		
* Version:		2.1
* Example:		http://www.inwebson.com/demo/jpreloader-v2/
*	
*/

(function($) {
	var items = new Array(),
		errors = new Array(),
		onComplete = function() {},
		current = 0;
	
	var jpreOptions = {
		splashVPos: '55%',
		loaderVPos: '55%',
		splashID: '#jpreContent',
		showSplash: true,
		showPercentage: true,
		autoClose: true,
		closeBtnText: 'Start!',
		onetimeLoad: false,
		debugMode: false,
		splashFunction: function() {}
	}
	
	//cookie
	var getCookie = function() {
		if( jpreOptions.onetimeLoad ) {
			var cookies = document.cookie.split('; ');
			for (var i = 0, parts; (parts = cookies[i] && cookies[i].split('=')); i++) {
				if ((parts.shift()) === "jpreLoader") {
					return (parts.join('='));
				}
			}
			return false;
		} else {
			return false;
		}
		
	}
	var setCookie = function(expires) {
		if( jpreOptions.onetimeLoad ) {
			var exdate = new Date();
			exdate.setDate( exdate.getDate() + expires );
			var c_value = ((expires==null) ? "" : "expires=" + exdate.toUTCString());
			document.cookie="jpreLoader=loaded; " + c_value;
		}
	}
	
	//create jpreLoader UI
	var createContainer = function() {
		
		jOverlay = $('<div></div>')
		.attr('id', 'jpreOverlay')
		.css({
			position: "fixed",
			top: 0,
			left: 0,
			width: '100%',
			height: '100%',
			zIndex: 9999999
		})
		.appendTo('body');
		
		if(jpreOptions.showSplash) {
			jContent = $('<div></div>')
			.attr('id', 'jpreSlide')
			.appendTo(jOverlay);
			
			var conWidth = $(window).width() - $(jContent).width();
			$(jContent).css({
				position: "absolute",
				top: jpreOptions.splashVPos,
				left: Math.round((50 / $(window).width()) * conWidth) + '%'
			});
			$(jContent).html($(jpreOptions.splashID).wrap('<div/>').parent().html());
			$(jpreOptions.splashID).remove();
			jpreOptions.splashFunction()			
		}
		
		jLoader = $('<div></div>')
		.attr('id', 'jpreLoader')
		.appendTo(jOverlay);
		
		var posWidth = $(window).width() - $(jLoader).width();
		$(jLoader).css({
			position: 'absolute',
			top: jpreOptions.loaderVPos,
			left: Math.round((50 / $(window).width()) * posWidth) + '%'
		});
		
		jBar = $('<div></div>')
		.attr('id', 'jpreBar')
		.css({
			width: '0%',
			height: '100%'
		})
		.appendTo(jLoader);
		
		if(jpreOptions.showPercentage) {
			jPer = $('<div></div>')
			.attr('id', 'jprePercentage')
			.css({
				position: 'relative',
				height: '100%'
			})
			.appendTo(jLoader)
			.html('Loading...');
		}
		if( !jpreOptions.autoclose ) {
			jButton = $('<div></div>')
			.attr('id', 'jpreButton')
			.on('click', function() {
				loadComplete();
			})
			.css({
				position: 'relative',
				height: '100%'
			})
			.appendTo(jLoader)
			.text(jpreOptions.closeBtnText)
			.hide();
		}
	}
	
	//get all images from css and <img> tag
	var getImages = function(element) {
		$(element).find('*:not(script)').each(function() {
			var url = "";

			if ($(this).css('background-image').indexOf('none') == -1 && $(this).css('background-image').indexOf('-gradient') == -1) {
				url = $(this).css('background-image');
				if(url.indexOf('url') != -1) {
					var temp = url.match(/url\((.*?)\)/);
					url = temp[1].replace(/\"/g, '');
				}
			} else if ($(this).get(0).nodeName.toLowerCase() == 'img' && typeof($(this).attr('src')) != 'undefined') {
				url = $(this).attr('src');
			}
			
			if (url.length > 0) {
				items.push(url);
			}
		});
	}
	
	//create preloaded image
	var preloading = function() {
		for (var i = 0; i < items.length; i++) {
			if(loadImg(items[i]));
		}
	}
	var loadImg = function(url) {
		var imgLoad = new Image();
		$(imgLoad)
		.load(function() {
			completeLoading();
		})
		.error(function() {
			errors.push($(this).attr('src'));
			completeLoading();
		})
		.attr('src', url);
	}
	
	//update progress bar once image loaded
	var completeLoading = function() {
		current++;

		var per = Math.round((current / items.length) * 100);
		$(jBar).stop().animate({
			width: per + '%'
		}, 500, 'linear');
		
		if(jpreOptions.showPercentage) {
			$(jPer).text(per+"%");
		}
		
		//if all images loaded
		if(current >= items.length) {
			current = items.length;
			setCookie();	//create cookie
			
			if(jpreOptions.showPercentage) {
				$(jPer).text("100%");
			}
			
			//fire debug mode
			if (jpreOptions.debugMode) {
				var error = debug();
			}
			
			
			//max progress bar
			$(jBar).stop().animate({
				width: '100%'
			}, 500, 'linear', function() {
				//autoclose on
				if( jpreOptions.autoClose )
					loadComplete();
				else
					$(jButton).fadeIn(1000);
			});	
		}	
	}
	
	//triggered when all images are loaded
	var loadComplete = function() {
		$(jOverlay).fadeOut(800, function() {
			$(jOverlay).remove();
			onComplete();	//callback function
		});
	}
	
	//debug mode
	var debug = function() {
		if(errors.length > 0) {
			var str = 'ERROR - IMAGE FILES MISSING!!!\n\r'
			str	+= errors.length + ' image files cound not be found. \n\r';	
			str += 'Please check your image paths and filenames:\n\r';
			for (var i = 0; i < errors.length; i++) {
				str += '- ' + errors[i] + '\n\r';
			}
			return true;
		} else {
			return false;
		}
	}
	
	$.fn.jpreLoader = function(options, callback) {
        if(options) {
            $.extend(jpreOptions, options );
        }
		if(typeof callback == 'function') {
			onComplete = callback;
		}
		
		//show preloader once JS loaded
		$('body').css({
			'display': 'block'
		});
		
		return this.each(function() {
			if( !(getCookie()) ) {
				createContainer();
				getImages(this);
				preloading();
			}
			else {	//onetime load / cookie is set
				$(jpreOptions.splashID).remove();
				onComplete();
			}
		});
    };

})(jQuery);
