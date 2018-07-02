/**
 * @author XiangRui
 * @param basePath
 * @return
 */
function AccountsQuery(basePath){
	this.basePath = basePath;
}
/**
 * 科目总账查询
 */
AccountsQuery.prototype.searchGL=function(companyId,obj,callBack){
	 $.ajax({
		url: this.basePath + '/cw/accountsQuery/GL/'+companyId,
		type : "post",
		dataType : 'json',
		data:obj,
		success:callBack
	}); 	
}
/**
 * 科目明细账查询
 */
AccountsQuery.prototype.searchSubjectDetail=function(companyId,obj,callBack){
	 $.ajax({
		url: this.basePath + '/cw/accountsQuery/subjectFdetail/'+companyId,
		type : "post",
		dataType : 'json',
		data:obj,
		success:callBack
	}); 	
}
/**
 * 科目明细账查询
 */
AccountsQuery.prototype.searchAssistSubjectDetail=function(companyId,obj,callBack){
	 $.ajax({
		url: this.basePath + '/cw/accountsQuery/assistSubjectDetail/'+companyId,
		type : "post",
		dataType : 'json',
		data:obj,
		success:callBack
	}); 	
}