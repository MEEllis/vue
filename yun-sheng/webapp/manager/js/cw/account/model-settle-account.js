/**
 * @author XiangRui
 * @param basePath
 * @return
 */
function SettleAccount(basePath){
	this.basePath = basePath;
}
/**
 * 查询结账期间
 * @param 集团ID
 * @param 年份
 * @param 回掉函数
 */
SettleAccount.prototype.list=function(companyId,year,callBack){
	 $.ajax({
		url: this.basePath + '/cw/settleAccounts/listByModel/'+companyId+"/"+year,
		type : "get",
		dataType : 'json',
		success:callBack
	}); 	
}
/**
 * 对账
 * @param 集团ID
 * @param 年份
 * @param 月
 * @param 回掉函数
 */
SettleAccount.prototype.compare=function(companyId,year,month,callBack){
	 $.ajax({
		url: this.basePath + '/cw/settleAccounts/compare/'+companyId+"/"+year+"/"+month,
		type : "get",
		dataType : 'json',
		success:callBack
	}); 	
}
/**
 * 财务报告
 * @param 集团ID
 * @param 年份
 * @param 月
 * @param 回掉函数
 */
SettleAccount.prototype.report=function(companyId,year,month,callBack){
	 $.ajax({
		url: this.basePath + '/cw/settleAccounts/report/'+companyId+"/"+year+"/"+month,
		type : "get",
		dataType : 'json',
		success:callBack
	}); 	
}
/**
 * 结账
 * @param 集团ID
 * @param 年份
 * @param 月
 * @param 回掉函数
 */
SettleAccount.prototype.closingAccounts=function(companyId,year,month,callBack){
	 $.ajax({
		url: this.basePath + '/cw/settleAccounts/closingAccounts/'+companyId+"/"+year+"/"+month,
		type : "get",
		dataType : 'json',
		success:callBack
	}); 	
}