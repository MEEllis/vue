/**
 * 科目对照
 * @author XiangRui
 * 
 */
function SubjectCompare(basePath){
	this.basePath = basePath;
}
/**
 * 科目对照查询
 * @param 公司ID
 * @param 年份
 * @param 回掉函数
 */
SubjectCompare.prototype.compare=function(companyId,year,callBack){
	 $.ajax({
		url: this.basePath + '/cw/subjectCompare/compare/'+companyId+"/"+year,
		type : "get",
		dataType : 'json',
		success:callBack
	}); 	
}
/**
 * 科目差异查询
 * @param 公司ID
 * @param 年份
 * @param 回掉函数
 */
SubjectCompare.prototype.difference=function(companyId,year,callBack){
	 $.ajax({
		url: this.basePath + '/cw/subjectCompare/difference/'+companyId+"/"+year,
		type : "get",
		dataType : 'json',
		success:callBack
	}); 	
}
/**
 * 科目对照批量修改
 * @param 对象array
 * @param 回掉函数
 */
SubjectCompare.prototype.mulUpdate=function(array,callBack){
	 $.ajax({
		url: this.basePath + '/cw/subjectCompare/mulUpdate',
		type : "post",
		data:JSON.stringify(array),
		dataType:'json',
		contentType:'application/json;charset=utf-8',
		success:callBack
	}); 	
}