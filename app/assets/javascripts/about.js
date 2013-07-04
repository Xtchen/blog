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
	out.mouseenter(function(){
		allStop();
		envp.fadeOut(500).fadeIn(500).fadeOut(500, function(){
			envp.css({"background-image":"url('/assets/env_open.png')", "top":"0px"});
			cdiv.css({"top":"0px"});
		}).fadeIn(500, function(){
		envp.animate({
			left: '-400px'
		}, function(){
			cdiv.animate({
				left: '650px',
				width: '350px',
				height: '110px',
				padding: '10px',
				margin: '10px'
			}, function(){
				divp.show();
			});
		});
		});
	});
	out.mouseleave(function(){
		setTimeout(function(){
			if(!$('.list').is(":hover")){
				envp.fadeOut(500).fadeIn(500).fadeOut(500, function(){
					cdiv.css({"top":"-233px"});
					envp.css({"background-image":"url('/assets/env_close.png')", "top":"211px"});
				}).fadeIn(500, function(){
					allStop();
			divp.hide();
			cdiv.animate({
				left: '0px',
				width: '0px',
				height: '0px',
				padding: '0px',
				margin: '0px'
			}, function(){
				envp.animate({
					left: '0px'
				});
			});
				});
			}
			
		}, 2000 );
	});
	$('#about-head-intro').slideDown(1000);
});