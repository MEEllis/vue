
/**
 * 贺达
 * 导入公共模板数据
 * @param obj
 * @return
 */
function importSubject(obj){
	$.ajax({
		url:  '/manager/cw/fsubject/copy',
		type : "get",
		success:function(data){
			var message = data.data.message;
			alert(message);
			location.reload();
		}
	}); 
}


/**
 * 判断科目编码是否可用
 */
function checkCode(){
	$.ajax({
		url:  '/manager/cw/fsubject/checkCode/'+$("#subjectCode").val(),
		type : "get",
		success:function(data){
			var message = data.data.message;
			alert(message);
		}
	}); 
}

