/**
 * 凭证查询对象
 * @author PiHao
 * 
 */
function VoucherManage(basePath){
	this.basePath = basePath;
}

/**
 * 获取期间表年、月
 * @param 公司ID
 * @param 
 * @param 回掉函数
 */
VoucherManage.prototype.findFAcc=function(companyId,callBack){
	 $.ajax({
		url: this.basePath + '/cw/pz/findFAccountAnnual/'+companyId,
		type : "get",
		async:false,
		dataType : 'json',
		success:callBack
	}); 	
}

VoucherManage.prototype.accountList=function(callBack){
	$.ajax({
		url: this.basePath + '/cw/accountsQuery',
		type : "get",
		async:false,
		dataType : 'json',
		success:callBack
	}); 
}

/**
 * 获取制单人、审核人等名字id
 * @param 公司ID
 * @param 
 * @param 回掉函数
 */
VoucherManage.prototype.selectUserName=function(callBack){
	$.ajax({
		url: this.basePath + '/cw/pz/get/voucherCreater',
		type : "get",
		async:false,
		dataType : 'json',
		success:callBack
	}); 
}

/**
 * 审核/弃审
 * @param 公司ID
 * @param 
 * @param 回掉函数
 */
VoucherManage.prototype.audit=function(param,arr,callBack){
	$.ajax({
		url:  this.basePath+'/cw/pz/audit/'+param,
		type : "POST",
		data:JSON.stringify(arr),//将集合转换为JSON字符串
		contentType : 'application/json',//传输类型
		dataType : 'json',
		success:callBack
	});
}

/**
 * 标错/取消标错
 * @param 公司ID
 * @param 
 * @param 回掉函数
 */
VoucherManage.prototype.makeError=function(param,arr,callBack){
	$.ajax({
		url:  this.basePath+'/cw/pz/errorFlag/'+param,
		type : "POST",
		data:JSON.stringify(arr),//将集合转换为JSON字符串
		contentType : 'application/json',//传输类型
		dataType : 'json',
		success:callBack
	});
}

/**
 * 主管签字/取消主管签字
 * @param 公司ID
 * @param 
 * @param 回掉函数
 */
VoucherManage.prototype.supervisorAudit=function(param,arr,callBack){
	$.ajax({
		url:  this.basePath+'/cw/pz/supervisorSign/'+param,
		type : "POST",
		data:JSON.stringify(arr),//将集合转换为JSON字符串
		contentType : 'application/json',//传输类型
		dataType : 'json',
		success:callBack
	});
}