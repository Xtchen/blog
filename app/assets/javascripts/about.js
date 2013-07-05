$(document).ready(function(){
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
	// out.mouseleave(function(){
	// 	setTimeout(function(){
	// 		if(!$('.list').is(":hover")){
	// 			envp.fadeOut(500).fadeIn(500).fadeOut(500, function(){
	// 				cdiv.css({"top":"-233px"});
	// 				envp.css({"background-image":"url('/assets/env_close.png')", "top":"211px"});
	// 			}).fadeIn(500, function(){
	// 				allStop();
	// 		divp.hide();
	// 		cdiv.animate({
	// 			left: '0px',
	// 			width: '0px',
	// 			height: '0px',
	// 			padding: '0px',
	// 			margin: '0px'
	// 		}, function(){
	// 			envp.animate({
	// 				left: '0px'
	// 			});
	// 		});
	// 			});
	// 		}

	// 	}, 2000 );
	// });
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

$(window).scroll(function(){
 		var distance = $(document).scrollTop();
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
});