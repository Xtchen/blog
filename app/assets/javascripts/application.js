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
	$('.addTag').click(function(){
		var tag = $(this).text();
		$('#tags').val(function(i, old){
			return old+","+tag;
		});
	});

 	$('#new_comment').submit(function() {
 		var com = {
 		 author:$('#comment_author').val(),
 		 post_id:$('#comment_post_id').val(), 
 		 content:$('#comment_content').val()
 		};

	 	var c={
	 		comment:com
	 	};

 		//alert("before");
 		$.post("/comments", c, 
 			function(data){
 				if(data.saved == true){
	 				clean_content($('#comment_author'));
		 			clean_content($('#comment_content'));
		 			$('#all-comments').html("");//clean the original content
		 			// var jsonobj = eval('(' + data + ')');
		 			// $('#all-comments').append(jsonobj.count.toString());
		 			// //add the header
		 			var htmlstr="";
		 			if(data.count == 0){
		 				htmlstr += "<legend class=\"muted\">Still no comment.</legend>";
		 			}
		 			else{
		 				htmlstr += "<legend class=\"muted\">"+data.count.toString()+" Comments:</legend>";
		 			}

	 				$.each(data.comments, function(i, item) {
	 					htmlstr += "<div id=\"comment\">";
	 					htmlstr += "<div id=\"comment-hidden-"+item.id.toString()+"\"></div>";
	 					htmlstr += "<p class=\"muted normal-size\">";
	 					if(item.mine == true){
	 						htmlstr += "<span class=\"label label-important\">Author</span>";
	 					}
	 					htmlstr += "<strong> "+item.author+"</strong> @ "+item.created_at+"</p>";
	 					htmlstr += "<p>"+item.content+"</p>";
	 					if(data.valid == true){
	 						htmlstr += "<div><a id=\"delete-btn-"+item.id.toString()+"\" href=\"/comments/"+item.id.toString()+"\" class=\"btn btn-primary\" data-confirm=\"Delete this comment?\" data-method=\"delete\" rel=\"nofollow\">Delete</a></div>";
	 					}
	 					htmlstr += "<hr>";
	 					htmlstr += "</div>";
	 				});
	 				$('#all-comments').append(htmlstr);

	 				var current_comment = "#comment-hidden-"+data.current.toString();
	 				$("html,body").animate({scrollTop:$(current_comment).offset().top}, 1000);
	 				$(current_comment).addClass("alert alert-success").html("<p>Comment posted successfully.</p>").show();
	 				$(current_comment).parent().fadeOut(500).fadeIn(500).fadeOut(500).fadeIn(500, function(){
	 					$(current_comment).fadeOut(5000);	
	 				});
	 			}
	 			else{
	 				$('#comment-error-message')
	 				.addClass("alert alert-error")
	 				.html("<p>Comment invalid. The comment should contain at least 6 characters. Thx!</p>")
	 				.show()
	 				.fadeOut(5000, function(){
	 				$('#comment-error-message').removeClass("alert alert-error")
	 				.html("")
	 				});
	 			}
 			} );
 		//alert("after");
 		return false;
 	});

 	function clean_content(elem){
 		elem.val("")
 	}

 	$(window).scroll(function(){
 		var distance = $(document).scrollTop();
 		
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
 		if (distance < topOf2ndH1){
 			showImg(goNext);
 			goTop.hide();
 			goPrev.hide();
 		}
 		else if(distance < topOfLastH1){
 			showImg(goTop);
 			showImg(goPrev);
 			showImg(goNext);
 		}
 		else{
 			goNext.hide();
			showImg(goPrev);
 			showImg(goTop);
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
 			}
 		});
 	});

 	//toPrev div in show page
 	$(document).on('click', '#toPrev', function(event){
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
 			}
 		});
 	});

// about js starts from here
 	function allStop(){
		envp.stop();
		cdiv.stop();
		divp.stop();
	}
	var out = $('#envp-out');
	var envp = $('#envp');
	var cdiv = $('.contact-div');
	var divp = $('.contact-div p');
	var opened = false;
	out.mouseenter(function(){
		if(!opened){
			allStop();
			envp.fadeOut(500).fadeIn(500).fadeOut(500, function(){
				envp.css({"background-image":"url('/assets/env_open.png')", "top":"0px"});
				cdiv.css({"top":"0px"});
			}).fadeIn(500, function(){
				envp.animate({
					left: '-400px'
				}, function(){
					cdiv.animate({
						left: '550px',
						width: '350px',
						height: '110px',
						padding: '10px',
						margin: '10px'
					}, function(){
						divp.show();
					});
				});
			});
			opened = true;
		}
	});
	$('#about-head-intro').slideDown(1000);
	var h1s = $('h1');
	var topOf2ndH1 = $('h1:eq(1)').offset().top;
	var topOfLastH1 = $('h1:last').offset().top;
	var goTop = $('#go-top-about');
	var goPrev = $('#go-prev-blk');
	var goNext = $('#go-next-blk');

	function showImg(elem){
		elem.show();
		elem.css({"display": "inline", "opacity": "0.3"});
	}

	function mIn(elem){
		elem.mouseenter(function(){
	 		elem.css({"display": "inline", "opacity": "0.7"});
	 	});
	}

	function mOut(elem){
		elem.mouseleave(function(){
	 		elem.css({"display": "inline", "opacity": "0.3"});
	 	});
	}

	function calculateNext(distance){
		var res = 0;
		h1s.each(function(){
			res = $(this).offset().top;
			if(distance<res){
				return false;
			}
		});
		return res;
	}

	function calculatePrev(distance){
		var res = 0;
		h1s.each(function(index){
			res = $(this).offset().top;
			if(distance<res){
				res = $('h1:eq('+ (index-2) +')').offset().top;
				return false;
			}
			res = $('h1:eq('+ (index-1) +')').offset().top;
		});
		return res;
	}

 	goTop.click(function(){
 		$("html,body").animate({scrollTop: 0}, 1000);
 	});
 	mIn(goTop);
 	mOut(goTop);

 	goPrev.click(function(){
 		var distance = $(document).scrollTop();
 		var prevDis = calculatePrev(distance);
 		$("html,body").animate({scrollTop: prevDis}, 1000);
 	});
 	mIn(goPrev);
 	mOut(goPrev);

 	goNext.click(function(){
 		var distance = $(document).scrollTop();
 		var nextDis = calculateNext(distance);
 		$("html,body").animate({scrollTop: nextDis}, 1000);
 	});
 	mIn(goNext);
 	mOut(goNext);
 	
 	//about js ends at here
 });