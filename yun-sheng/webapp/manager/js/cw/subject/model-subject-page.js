/**
 * 公司科目表对象
 * @author PiHao
 * 
 */
function SubjectPage(basePath){
	this.basePath = basePath;
}

/**
 * 计量单位
 * @param 
 * @param 回掉函数
 * @author PiHao
 */
SubjectPage.prototype.getUnit=function(callBack){
	 $.ajax({
		url: this.basePath + '/cw/company/getUnit',
		type : "get",
		dataType : 'json',
		success:callBack
	}); 	
}

/**
 * 根据id查询科目
 * @param id
 * @param callBack
 * @author PiHao
 */
SubjectPage.prototype.findSubjectById=function(id,callBack){
	$.ajax({
		url : this.basePath + '/cw/company/findSubjectById/'+id,
		type : 'get',
		dataType : 'json',
		success : callBack
	});
}

/**
 * 保存/更新
 * @param obj
 * @param callBack
 * @author PiHao
 */
SubjectPage.prototype.saveFcompanySubjectTemplate=function(obj,callBack){
	$.ajax({
		url : this.basePath + '/cw/company/saveFcompanySubjectTemplate',
		type : "get",
		data:obj,
		dataType : 'json',
		success : callBack
	});
}

/**
 * 根据id删除科目
 * @param id
 * @param callBack
 * @author PiHao
 */
SubjectPage.prototype.deleteFcompanyById=function(id,callBack){
	$.ajax({
		url: this.basePath + '/cw/company/deleteFcompanySubjectTemplate/' + id,
		type : "get",
		dataType : 'json',
		success:callBack
	}); 
}

/**
 * 根据Code查询出父级参数
 * @param Code
 * @param callBack
 * @author PiHao
 */
SubjectPage.prototype.findCompanyByCode=function(initCompanyId,initGroupId,initYear,code,callBack){
	$.ajax({
		url: this.basePath + '/cw/company/findCompanyByCode/' + initCompanyId + '/' + initGroupId + '/' + initYear + '/' + code,
		type : "get",
		dataType : 'json',
		success:callBack
	}); 
}

/**
 * 查询所有子集
 * @param id
 * @param callBack
 * @author PiHao
 */
SubjectPage.prototype.findFcompanyChildrens=function(id,callBack){
	$.ajax({
		url: this.basePath + '/cw/company/findChildrens/' + id,
		type : "get",
		dataType : 'json',
		success:callBack
	}); 
}

/**
 * 公司科目树
 * @param id
 * @param callBack
 * @author PiHao
 */
SubjectPage.prototype.findView=function(companyId,year,callBack){
	$.ajax({
		url: this.basePath + '/cw/company/findView/' + companyId + '/' +year,
		type : "get",
		dataType : 'json',
		success:callBack
	}); 
}

/**
 * 根据条件查询公司科目
 * @param id
 * @param callBack
 * @author PiHao
 */
SubjectPage.prototype.getSubjectHeader=function(groupId,companyId,year,obj,callBack){
	$.ajax({
		url: this.basePath + '/cw/company/get/getSubjectHeader/' + groupId +'/' + companyId + '/' +year,
		type : "get",
		async:false,
		dataType : 'json',
		data:obj,
		success:callBack
	}); 
}

/**
 *  上一张、下一张SS
 * @param id
 * @param callBack
 * @author PiHao
 */
SubjectPage.prototype.findPageSubject=function(obj,num,callBack){
	$.ajax({
		url: this.basePath + '/cw/company/get/findPageSubject/'+num,
		type : "get",
		dataType : 'json',
		data:obj,
		success:callBack
	}); 
}