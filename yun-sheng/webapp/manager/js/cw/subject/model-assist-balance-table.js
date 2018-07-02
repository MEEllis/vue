/**
 * 辅助余额表查询对象
 * @author PiHao
 * 
 */
function AssistBalanaceTableQuery(basePath){
	this.basePath = basePath;
}

/**
 * 辅助余额表查询
 * @param 公司ID
 * @param 
 * @param 回掉函数
 */
AssistBalanaceTableQuery.prototype.assistList=function(companyId,groupId,obj,callBack){
	 $.ajax({
		url: this.basePath + '/cw/assistQuery/assistList/'+companyId+'/'+groupId,
		type : "post",
		dataType : 'json',
		data:obj,
		success:callBack
	}); 	
}

/**
 * 获取科目类别参数
 * @param 公司ID
 * @param 
 * @param 回掉函数
 */
AssistBalanaceTableQuery.prototype.getSubjectClssify=function(callBack){
	 $.ajax({
		url: this.basePath + '/cw/assistQuery/getSubjectClssify',
		type : "get",
		dataType : 'json',
		success:callBack
	}); 	
}

/**
 * 获取部门参数
 * @param 公司ID
 * @param 
 * @param 回掉函数
 */
AssistBalanaceTableQuery.prototype.getdepartmentForAssist=function(callBack){
	 $.ajax({
		url: this.basePath + '/cw/assistQuery/getdepartmentForAssist',
		type : "get",
		async:false,
		dataType : 'json',
		success:callBack
	}); 	
}

/**
 * 获取个人参数
 * @param 公司ID
 * @param 
 * @param 回掉函数
 */
AssistBalanaceTableQuery.prototype.getEmployeesForAssist=function(callBack){
	 $.ajax({
		url: this.basePath + '/cw/assistQuery/getEmployeesForAssist',
		type : "get",
		async:false,
		dataType : 'json',
		success:callBack
	}); 	
}

/**
 * 获取往来单位参数
 * @param 公司ID
 * @param 
 * @param 回掉函数
 */
AssistBalanaceTableQuery.prototype.getPartnerForAssist=function(callBack){
	 $.ajax({
		url: this.basePath + '/cw/assistQuery/getPartnerForAssist',
		type : "get",
		async:false,
		dataType : 'json',
		success:callBack
	}); 	
}

