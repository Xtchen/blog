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
function addTag(){
	var object=event.srcElement;
	document.getElementById("tags").value += (","+object.id);
}

$(document).ready(function(){
 	var options = {
 		target: '#new_comment',
 		url: '/comments/create',
 		success: function(){alert('success')},
 		error: function(){alert('error')},
 		dataType: 'json',
 		timeout: 3000
 	};

 	$('#new_comment').submit(function() {
 		var com = {
 		 author:$('#comment_author').val(),
 		 post_id:$('#comment_post_id').val(), 
 		 content:$('#comment_content').val()
 		};

	 	var c={
	 		comment:com
	 	};

 		alert("before");
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
	 				$("html,body").animate({scrollTop:$("#comment-hidden-"+data.current.toString()).offset().top}, 1000);
	 				$("#comment-hidden-"+data.current.toString()).parent().fadeOut(500).fadeIn(500).fadeOut(500).fadeIn(500);
	 				//css({"background-color":"yellow"});
	 			}
	 			else{
	 				alert("Comment invalid. The comment should contain at least 6 characters. Thx!");
	 			}
 			} );
 		alert("after");
 		return false;
 	});

 	function clean_content(elem){
 		elem.val("")
 	}
 });