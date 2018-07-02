	var shade = document.querySelector("#shade");
	var body = document.querySelector("body");
	shade.style.height = document.body.clientHeight + document.body.scrollHeight + "px";

	var pageA = document.querySelector(".pageA");
	var pageB = document.querySelector(".pageB");
	var pageC = document.querySelector(".pageC");
	var mainRightPageA = document.querySelector(".shade-mainright-pageA");
	var mainRightPageB = document.querySelector(".shade-mainright-pageB");
	var mainRightPageC = document.querySelector(".shade-mainright-pageC");
	var pickA = document.querySelector(".pickA");
	var pickB = document.querySelector(".pickB");
	var pickC = document.querySelector(".pickC");
	var pickD = document.querySelector(".pickD");
	var tabC = document.querySelector(".tabC");
	var tabB = document.querySelector(".tabB");
	
	
	sortNum();
	function sortNum(){
		for(var i =1;i<tabC.tBodies[0].rows.length;i++){
			tabC.rows[i].cells[0].innerHTML = i;
		}
		for(var i =1;i<tabB.tBodies[0].rows.length;i++){
			tabB.rows[i].cells[0].innerHTML = i;
		}
	}
	
	pickA.onchange = function(){
		if(this.checked){
			pickB.checked = false;
			$(".tabC").append("<tr class='app3'> <td></td> <td>单位分类</td> <td><input  type='checkbox' /></td> <td>200</td> <td></td></tr>");
			$(".tabB").append("<tr class='app3'> <td></td> <td>单位分类</td> <td><input class='empSelect'  type='checkbox' /></td> <td>200</td> <td></td></tr>");
			$(".app4").remove();
			sortNum();
		}else{
			pickB.checked = false;
			$(".app3").remove();
			sortNum();
		}
	}
	
	pickB.onchange = function(){
		if(this.checked){
			pickA.checked = false;
			$(".tabC").append("<tr class='app4'> <td></td> <td>往来单位</td> <td><input  type='checkbox' /></td> <td>200</td> <td></td></tr>");
			$(".tabB").append("<tr class='app4'> <td></td> <td>往来单位</td> <td><input class='empSelect'  type='checkbox' /></td> <td>200</td> <td></td></tr>");
			$(".app3").remove();
			sortNum();
		}else{
			pickA.checked = false;
			$(".app4").remove();
			sortNum();
		}
	}
	
	pickC.onchange = function(){
		if(this.checked){
			$(".tabC").append("<tr class='app1'> <td></td> <td>部门</td> <td><input  type='checkbox' /></td> <td>200</td> <td></td></tr>");
			$(".tabB").append("<tr class='app1'> <td></td> <td>部门</td> <td><input class='depSelect'  type='checkbox' /></td> <td>200</td> <td></td></tr>");
			sortNum();
		}else{
			$(".app1").remove();	
			sortNum();
		}
	}
	
	pickD.onchange = function(){
		if(this.checked){
			$(".tabC").append("<tr class='app2'> <td></td> <td>个人</td> <td><input  type='checkbox' /></td> <td>200</td> <td></td></tr>");
			$(".tabB").append("<tr class='app2'> <td></td> <td>个人</td> <td><input class='perSelect' type='checkbox' /></td> <td>200</td> <td></td></tr>");
			sortNum();
		}else{
			$(".app2").remove();
			sortNum();
		}
	}
	
	$(".pageA").click(function(){
		$(".pageA").addClass("bgcolor").siblings().removeClass("bgcolor");
		mainRightPageA.style.display = "block";
		mainRightPageB.style.display = "none";
		mainRightPageC.style.display = "none";
	});
	
	$(".pageB").click(function(){
		$(".pageB").addClass("bgcolor").siblings().removeClass("bgcolor");
		mainRightPageA.style.display = "none";
		mainRightPageC.style.display = "none";
		mainRightPageB.style.display = "block";
	});
	
	$(".pageC").click(function(){
		$(".pageC").addClass("bgcolor").siblings().removeClass("bgcolor");
		mainRightPageA.style.display = "none";
		mainRightPageB.style.display = "none";
		mainRightPageC.style.display = "block";
	});
	
	
	document.querySelector('.search-li').onclick = function(){
		document.querySelector('#shade').style.display = 'block';
		document.querySelector('#shade').style.backgroundColor = 'rgba(0,0,0,0.2)';
	}
	
	$('.sure').click(function(){
		if($(".pick").is(':checked') == false){
			alert("请选择一个分类");
		}else{
			$('#shade').css({"display":"none"});
			$(function(){
				loadmodal();
			});
			
		}
	});
	
	document.querySelector('.cancel').onclick = function(){
		document.querySelector('#shade').style.display = 'none';
	}
	document.querySelector('.shade-close').onclick = function(){
		document.querySelector('#shade').style.display = 'none';
	}
	

	
	
	