	var shade = document.querySelector("#shade");
	var body = document.querySelector("body");
	shade.style.height = document.body.clientHeight + document.body.scrollHeight + "px";

	document.querySelector('.search-li').onclick = function(){
		document.querySelector('#shade').style.display = 'block';
		document.querySelector('#shade').style.backgroundColor = 'rgba(0,0,0,0.2)';
	}
	
	$('.sure').click(function(){
			$('#shade').css({"display":"none"});
			$(function(){
				//accountSelect(2);
				loadmodal();
			});
	});
	
	document.querySelector('.cancel').onclick = function(){
		document.querySelector('#shade').style.display = 'none';
	}
	document.querySelector('.shade-close').onclick = function(){
		document.querySelector('#shade').style.display = 'none';
	}
	

	
	
	