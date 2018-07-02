$(function(){	
	
});

//传对象
function saveone(){
	//创建对象
	var obj = new Object;
	//赋值
	obj.name = $("#nameinput").val();
	obj.age = $("#agesel").val();

	$.ajax({
		url:"/manager/cw/test/getObject",
		type : "POST",
		data:JSON.stringify(obj),//将对象转换为JSON字符串
		contentType : 'application/json',//传输类型
		dataType : 'json',//接收类型
		success:function(data){
			//接收后台返回
		}
	});
}

//传集合
function savetwo(){
	var arr = new Array();
	
	if($("#sex1").is(':checked')){
		var obj = new Object();
		obj.name = $("#sex1").val();
		obj.age = 1;
		
		arr.push(obj);
	}
	
	if($("#sex2").is(':checked')){
		var obj = new Object();
		obj.name = $("#sex2").val();
		obj.age = 2;
		
		arr.push(obj);
	}
	
	if($("#sex3").is(':checked')){
		var obj = new Object();
		obj.name = $("#sex3").val();
		obj.age = 3;
		
		arr.push(obj);
	}

	$.ajax({
		url:"/manager/cw/test/getList",
		type : "POST",
		data:JSON.stringify(arr),//将集合转换为JSON字符串
		contentType : 'application/json',//传输类型
		dataType : 'json',//接收类型
		success:function(data){
			//接收后台返回
		}
	});
}