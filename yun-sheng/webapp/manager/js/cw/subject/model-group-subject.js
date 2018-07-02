/**
 * 集团科目对象
 * @author XiangRui
 * 
 */
function GroupSubject(basePath){
	this.basePath = basePath;
}
/**
 * 获取树
 * @param 集团ID
 * @param 年份
 * @param 回掉函数
 */
GroupSubject.prototype.listTreeByModel=function(model,callBack){
	 $.ajax({
		url: this.basePath + '/cw/fsubject/tree',
		type : "post",
		dataType : 'json',
		data:model,
		success:callBack
	}); 	
}
/**
 * 分页查询子项
 * @param 集团ID
 * @param 年份
 * @param 回掉函数
 */
GroupSubject.prototype.pageChildrens=function(model,callBack){
	 $.ajax({
		url: this.basePath + '/cw/fsubject/pageChildrens',
		type : "post",
		dataType : 'json',
		data:model,
		success:callBack
	 }); 	
}

/**
 * 保存集团引用
 * @param 集团科目ID
 */
GroupSubject.prototype.saveCompanyReferenceGroupSubjects=function(dataStr,callBack){
	 $.ajax({
		url: this.basePath + '/cw/fsubject/saveCompanyReferenceGroupSubjects',
		data:{'dataStr':dataStr},//设置公司ID
		type : "post",
		dataType : 'json',
		success:callBack
	}); 	
}
/**
 * 批量复制
 * @param 集团科目ID
 */
GroupSubject.prototype.mulCopy=function(sourceID,targetID,query,callBack){
	 $.ajax({
		url: this.basePath + '/cw/fsubject/mulCopy/'+sourceID+"/"+targetID,
		data:query,
		type : "post",
		dataType : 'json',
		success:callBack
	}); 	
}
