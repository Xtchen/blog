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
		$(this).find('div').stop().animate({'background-position-x':'-120px','background-position-y': '0px','margin-bottom':'-20px'},500).css({'color':'#FFFFFF'});
	});
	$('#part3 li').mouseleave(function(){
		$(this).find('div').stop().animate({'background-position-x':'0px','background-position-y': '-120px','margin-bottom':'0px'},500).css({'color':'#77c18d'});
	});
//about js ends at here
 });
