/**
 * 科目对象
 */
function SubjectAjax(basePath){
	this.basePath = basePath;
}

/**
 * 新增、修改前判断是否隶属于集团。
 * @param 
 */
SubjectAjax.prototype.memberOfGroup=function(code,callBack){
	$.ajax({
		url: this.basePath + '/cw/company/memberOfGroup',
		type : "get",
		dataType : 'json',
		data:{code:code},//将集合转换为JSON字符串
		success:callBack
	}); 
}

/**
 * 根据科目id 查询科目信息
 * @param 
 */
SubjectAjax.prototype.getById=function(id,url,callBack){
	$.ajax({
		url: this.basePath + url + id,
		type : "get",
		dataType : 'json',
		success:callBack
	}); 
}

/**
 * 新增公司科目
 * @param 
 */
SubjectAjax.prototype.saveFcompanySubjectTemplate=function(obj,year,url,callBack){
	$.ajax({
		url: this.basePath + url + year,
		type : "post",
		dataType : 'json',
		data:JSON.stringify(obj),//将集合转换为JSON字符串
		contentType : 'application/json',//传输类型
		success:callBack
	}); 
}

/**
 * 修改公司科目
 * @param 
 */
SubjectAjax.prototype.updateFcompanySubjectTemplate=function(obj,url,callBack){
	$.ajax({
		url: this.basePath + url,
		type : "post",
		dataType : 'json',
		data:JSON.stringify(obj),//将集合转换为JSON字符串
		contentType : 'application/json',//传输类型
		success:callBack
	}); 
}

/**
 * 会计期间年度
 * @param 
 */
SubjectAjax.prototype.initYear=function(callBack){
	$.ajax({
		url: this.basePath + '/cw/accountAnnual/findAnnualYears',
		async: false,
		type : "post",
		dataType : 'json',
		success:callBack
	}); 
}

/**
 * 科目类别列表
 * @param 
 */
SubjectAjax.prototype.subjectClssify=function(callBack){
	$.ajax({
		url: this.basePath + '/cw/company/subjectClssify',
		async: false,
		type : "post",
		dataType : 'json',
		success:callBack
	}); 
}

/**
 * 科目编码搜索父级
 * @param 
 */
SubjectAjax.prototype.blurSubjectCode=function(year,code,url,callBack){
	$.ajax({
		url: this.basePath + url,
		type : "post",
		dataType : 'json',
		data:{year:year,code:code},
		success:callBack
	}); 
}

/**
 * 停用公司科目
 * @param 
 */
SubjectAjax.prototype.enableFcompanySubjectTemplate=function(id,url,callBack){
	$.ajax({
		url: this.basePath + url + id,
		type : "post",
		dataType : 'json',
		success:callBack
	}); 
}

/**
 * 删除公司科目
 * @param 
 */
SubjectAjax.prototype.deleteFcompanySubjectTemplate=function(id,url,callBack){
	$.ajax({
		url: this.basePath + url + id,
		type : "post",
		dataType : 'json',
		success:callBack
	}); 
}
