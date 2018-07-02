/**
 * 科目余额表查询对象
 * @author PiHao
 * 
 */
function SubjectBalanaceQuery(basePath){
	this.basePath = basePath;
}

/**
 * 科目余额表查询
 * @param 公司ID
 * @param 
 * @param 回掉函数
 */
SubjectBalanaceQuery.prototype.accountList=function(companyId,groupId,obj,callBack){
	 $.ajax({
		url: this.basePath + '/cw/accountsQuery/accountList/'+companyId+'/'+groupId,
		type : "post",
		dataType : 'json',
		data:obj,
		success:callBack
	}); 	
}