/**
 * 公司科目对象
 * @author XiangRui
 * 
 */
function CompanySubject(basePath){
	this.basePath = basePath;
}

/**
 * 分页查询子项
 * @param 集团ID
 * @param 年份
 * @param 回掉函数
 */
CompanySubject.prototype.pageChildrens=function(model,callBack){
	 $.ajax({
		url: this.basePath + '/cw/company/pageChildrens',
		type : "post",
		dataType : 'json',
		data:model,
		success:callBack
	 }); 	
}
/**
 * 根据模型查询数据
 * @param 公司ID
 * @param 年份
 * @param 回掉函数
 */
CompanySubject.prototype.findByModel=function(obj,callBack){
	 $.ajax({
		url: this.basePath + '/cw/company/findByModel',
		type : "post",
		dataType : 'json',
		data:obj,
		success:callBack
	}); 	
}
/**
 * 获取树 带查询
 * @param 公司ID
 * @param 年份
 * @param 回掉函数
 */
CompanySubject.prototype.listTreeByModel=function(model,callBack){
	 $.ajax({
		url: this.basePath + '/cw/company/findView',
		type : "post",
		dataType : 'json',
		data:model,
		success:callBack
	}); 	
}
/**
 * 查询子项包含自身
 * @param 公司科目ID
 */
CompanySubject.prototype.listChildrensById=function(companySubjectId,callBack){
	 $.ajax({
		url: this.basePath + '/cw/company/findChildrens/'+companySubjectId,
		data:{},
		type : "get",
		dataType : 'json',
		success:callBack
	 }); 	
}
/**
 * 查询子项包含自身
 * @param 公司科目ID
 */
CompanySubject.prototype.listBySubjectTypeId=function(companyId,subjectTypeId,callBack){
	 $.ajax({
			url: this.basePath + '/cw/company/listBySubjectTypeId/'+companyId+"/"+subjectTypeId,
			data:{},
			type : "get",
			dataType : 'json',
			success:callBack
	 }); 	
}
/**
 * 查询子项包含自身
 * @param 公司科目ID
 */
CompanySubject.prototype.listChildrensByIdAndModel=function(companySubjectId,model,callBack){
	 $.ajax({
		url: this.basePath + '/cw/company/findChildrens/'+companySubjectId,
		data:{},
		type : "post",
		dataType : 'json',
		data:model,
		success:callBack
	 }); 	
}
/**
 * 查询子项包含自身
 * @param 公司科目ID
 */
CompanySubject.prototype.listBySubjectByTypeIdAndModel=function(companyId,subjectTypeId,model,callBack){
	 $.ajax({
			url: this.basePath + '/cw/company/listBySubjectTypeId/'+companyId+"/"+subjectTypeId,
			data:{},
			type : "post",
			dataType : 'json',
			data:model,
			success:callBack
	 }); 	
}
/**
 * 保存集团引用
 * @param 数组字符串
 */
CompanySubject.prototype.saveCompanyReferenceGroupSubjects=function(dataList,callBack){
	 $.ajax({
		url: this.basePath + '/cw/company/saveCompanyReferenceGroupSubjects',
		type : "post",
		dataType : 'json',
		data:JSON.stringify(dataList),
		contentType : 'application/json',//传输类型
		success:callBack
	}); 	
}
/**
 * 移除集团引用
 * @param 公司科目ID
 */
CompanySubject.prototype.removeCompanyReferenceGroupSubject=function(dataList,callBack){
	 $.ajax({
		url: this.basePath + '/cw/company/removeCompanyReferenceGroupSubject',
		type : "post",
		dataType : 'json',
		data:JSON.stringify(dataList),
		contentType : 'application/json',//传输类型
		success:callBack
	}); 	
}
/**
 * 查询科目查询列表
 * @param 公司科目
 */
CompanySubject.prototype.findForSearchInput=function(query,callBack){
	 $.ajax({
		url: this.basePath + '/cw/company/findForSearchInput',
		data:query,//设置公司ID
		type : "post",
		dataType : 'json',
		success:callBack
	}); 	
}
/**
 * 批量复制
 * @param 公司科目ID
 */
CompanySubject.prototype.mulCopy=function(sourceID,targetID,query,callBack){
	 $.ajax({
		url: this.basePath + '/cw/company/mulCopy/'+sourceID+"/"+targetID,
		data:query,
		type : "post",
		dataType : 'json',
		success:callBack
	}); 	
}

