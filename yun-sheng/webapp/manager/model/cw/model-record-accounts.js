/**
 * @author XiangRui
 * @param basePath
 * @return
 */
function RecordAccounts(basePath){
	this.basePath = basePath;
}
/**
 * 记账
 * @param 公司ID
 * @param 年份
 * @param 月
 * @param 回掉函数
 */
RecordAccounts.prototype.assistRecord=function(companyId,year,months,password,callBack){
	 var obj = {};
	 obj.password = password;
	 obj.months = months;
	 $.ajax({
		url: this.basePath + '/cw/recordAccounts/assistRecord/'+companyId+"/"+year,
		type : "post",
		dataType : 'json',
		data:JSON.stringify(obj),
		contentType : 'application/json',//传输类型
		success:callBack
	}); 	
}
/**
 * 记账
 * @param 公司ID
 * @param 年份
 * @param 月
 * @param 回掉函数
 */
RecordAccounts.prototype.record=function(companyId,year,month,callBack){
	 $.ajax({
		url: this.basePath + '/cw/recordAccounts/record/'+companyId+"/"+year+"/"+month,
		type : "get",
		dataType : 'json',
		success:callBack
	}); 	
}
/**
 * 反记账
 * @param 公司ID
 * @param 年份
 * @param 回掉函数
 */
RecordAccounts.prototype.cancelRecord=function(companyId,year,password,callBack){
	 $.ajax({
		url: this.basePath + '/cw/recordAccounts/cancelRecord/'+companyId+"/"+year,
		type : "post",
		dataType : 'json',
		data:{'password':password},
		success:callBack
	}); 	
}
/**
 * 查询判断反记账月
 * @param 公司ID
 * @param 年份
 * @param 回掉函数
 */
RecordAccounts.prototype.findCanCanelRecordMonth=function(companyId,year,callBack){
	$.ajax({
		url: this.basePath + '/cw/recordAccounts/findCanCanelRecordMonth/'+companyId+"/"+year,
		type : "post",
		dataType : 'json',
		success:callBack
	}); 	
}
/**
 * 查询记账月
 * @param 公司ID
 * @param 年份
 * @param 回掉函数
 */
RecordAccounts.prototype.findMinCanRecordMonth=function(companyId,year,callBack){
	$.ajax({
		url: this.basePath + '/cw/recordAccounts/findMinCanRecordMonth/'+companyId+"/"+year,
		type : "post",
		dataType : 'json',
		success:callBack
	}); 	
}