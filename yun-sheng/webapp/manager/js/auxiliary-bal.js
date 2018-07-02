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
			$(".searchA").attr("disabled",false);
			$('.inpA').removeAttr("disabled");
			$(".inpA").attr("readonly","readonly");
			$('.inpB').attr("disabled","disabled");
			$(".tabC").append("<tr class='app3'> <td></td> <td>单位分类</td> <td><input class='app3A' onclick='add3A()' type='checkbox' checked /></td> <td>200</td> <td></td></tr>");
			$(".tabB").append("<tr class='app3'> <td></td> <td>单位分类</td> <td><input class='empSelect app3B' onclick='add3B()' type='checkbox' /></td> <td>200</td> <td></td></tr>");
			$(".app4").remove();
			sortNum();
			
			if(($(".searchA").is(":disabled") == false) && ($(".searchB").is(":disabled") == false)){
			$(".searchB").attr("disabled",true);
			}
		}else{
			pickB.checked = false;
			$(".searchA").attr("disabled",true);
			$('.inpA').removeAttr("readonly");
			$('.inpA').attr("disabled","disabled");
			$(".app3").remove();
			sortNum();
		}
	}
	
	
	pickB.onchange = function(){
		if(this.checked){
			pickA.checked = false;
			$(".searchB").attr("disabled",false);
			$('.inpB').removeAttr("disabled");
			$(".inpB").attr("readonly","readonly");
			$('.inpA').attr("disabled","disabled");
			$(".tabC").append("<tr class='app4'> <td></td> <td>往来单位</td> <td><input id='partnerBoolean' class='app4A' onclick='add4A()' type='checkbox' checked /></td> <td>200</td> <td></td></tr>");
			$(".tabB").append("<tr class='app4'> <td></td> <td>往来单位</td> <td><input class='empSelect app4B' onclick='add4B()' type='checkbox' /></td> <td>200</td> <td></td></tr>");
			$(".app3").remove();
			sortNum();
			
			if(($(".searchA").is(":disabled") == false) && ($(".searchB").is(":disabled") == false)){
			$(".searchA").attr("disabled",true);
			}
		}else{
			pickA.checked = false;
			$(".searchB").attr("disabled",true);
			$('.inpB').removeAttr("readonly");
			$('.inpB').attr("disabled","disabled");
			$(".app4").remove();
			sortNum();
		}
	}
	
	pickC.onchange = function(){
		if(this.checked){
			//$(".inpC").attr("disabled",false);
			$(".searchC").attr("disabled",false);
			$('.inpC').removeAttr("disabled");
			$(".inpC").attr("readonly","readonly");
			$(".tabC").append("<tr class='app1'> <td></td> <td>部门</td> <td><input id='departmentBoolean' class='app1A' onclick='add1A()' type='checkbox' checked /></td> <td>200</td> <td></td></tr>");
			$(".tabB").append("<tr class='app1'> <td></td> <td>部门</td> <td><input class='depSelect app1B' onclick='add1B()' type='checkbox' /></td> <td>200</td> <td></td></tr>");
			sortNum();
		}else{
			//$(".inpC").attr("disabled",true);
			$(".searchC").attr("disabled",true);
			$('.inpC').removeAttr("readonly");
			$('.inpC').attr("disabled","disabled");
			$(".app1").remove();	
			sortNum();
		}
	}
	
	pickD.onchange = function(){
		if(this.checked){
			$(".searchD").attr("disabled",false);
			$('.inpD').removeAttr("disabled");
			$(".inpD").attr("readonly","readonly");
			$(".tabC").append("<tr class='app2'> <td></td> <td>个人</td> <td><input id='employeeBoolean' class='app2A' onclick='add2A()' type='checkbox' checked /></td> <td>200</td> <td></td></tr>");
			$(".tabB").append("<tr class='app2'> <td></td> <td>个人</td> <td><input class='perSelect app2B' onclick='add2B()' type='checkbox' /></td> <td>200</td> <td></td></tr>");
			sortNum();
		}else{
			$(".searchD").attr("disabled",true);
			$('.inpD').removeAttr("readonly");
			$('.inpD').attr("disabled","disabled");
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
		if($(".tabBsub").is(':checked') == true){
			$(".tabCsub").prop("checked",false);
		}
	});
	
	$(".tabBsub").click(function(){
		if($(".tabBsub").is(':checked') == false){
			$(".tabCsub").prop("checked",true);
		}else{
			$(".tabCsub").prop("checked",false);
		}
	});
	
	
	$(".pageC").click(function(){
		$(".pageC").addClass("bgcolor").siblings().removeClass("bgcolor");
		mainRightPageA.style.display = "none";
		mainRightPageB.style.display = "none";
		mainRightPageC.style.display = "block";
		if($(".tabCsub").is(':checked') == true){
			$(".tabBsub").prop("checked",false);
		}
	});
	
	$(".tabCsub").click(function(){
		if($(".tabCsub").is(':checked') == false){
			$(".tabBsub").prop("checked",true);
		}else{
			$(".tabBsub").prop("checked",false);
		}
	});
	
	
	function add1A(){
		if(($(".app1A").is(':checked') == true) && ($(".app1B").is(':checked') == true)){
			$(".app1B").prop('checked',false);
		}
	}
	
	function add1B(){
		if($(".app1B").is(':checked') == true && $(".app1A").is(':checked') == true){
			$(".app1A").prop('checked',false);
		}
	}
	
	function add2A(){
		if(($(".app2A").is(':checked') == true) && ($(".app2B").is(':checked') == true)){
			$(".app2B").prop('checked',false);
		}
	}
	
	function add2B(){
		if($(".app2B").is(':checked') == true && $(".app2A").is(':checked') == true){
			$(".app2A").prop('checked',false);
		}
	}
	
	function add3A(){
		if(($(".app3A").is(':checked') == true) && ($(".app3B").is(':checked') == true)){
			$(".app3B").prop('checked',false);
		}
	}
	
	function add3B(){
		if($(".app3B").is(':checked') == true && $(".app3A").is(':checked') == true){
			$(".app3A").prop('checked',false);
		}
	}
	
	function add4A(){
		if(($(".app4A").is(':checked') == true) && ($(".app4B").is(':checked') == true)){
			$(".app4B").prop('checked',false);
		}
	}
	
	function add4B(){
		if($(".app4B").is(':checked') == true && $(".app4A").is(':checked') == true){
			$(".app4A").prop('checked',false);
		}
	}
	
	
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
				//accountSelect(2);
				queryPage(2);
			});
			
		}
	});
	
	document.querySelector('.cancel').onclick = function(){
		document.querySelector('#shade').style.display = 'none';
	}
	document.querySelector('.shade-close').onclick = function(){
		document.querySelector('#shade').style.display = 'none';
	}
	

	
	
	