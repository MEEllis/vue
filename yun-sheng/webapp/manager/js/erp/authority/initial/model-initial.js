/**
 * 基础资料对象
 * @author PiHao
 * 
 */
function InitialObj(basePath){
	this.basePath = basePath;
}

/************************************************资金账户**************************************************/

/**
 * 资金账户  新增、修改
 * @param 公司ID
 * @param 
 * @param 回掉函数
 */
InitialObj.prototype.saveAndCloseAccount=function(param,ac_jc,callBack){
	 $.request({
		url: this.basePath + '/jxc/authority/terpAccount/saveOrUpdateAccount/'+ac_jc,
		type : "post",
		traditional: true,
//		async: false,
		data:param,//将对象转换为JSON字符串
		dataType : 'json',
		success:callBack
	}); 	
}

/**
 * 资金账户  启用、禁用、删除
 * @param id
 * @param callBack
 * @author PiHao
 */
InitialObj.prototype.disOrEnAccount=function(ids,status,ac_jc,callBack){
	$.request({
		url: this.basePath + '/jxc/authority/terpAccount/disOrEnAccount/' + status + '/' + ac_jc,
		type : "POST",
		data:{'ids':ids},
//		async: false,
		traditional: true,
		success:callBack
	}); 
}

/**
 * 账户类型
 * @param callBack
 * @return
 */
InitialObj.prototype.initFindAccounType=function(callBack){
	$.request({
		type: 'Get',
		url: basePath+'/jxc/authority/terpAccount/findAccounType',
		async: false,
		dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
		success: callBack
	});	
}

/**
 * 银行名称
 * @param callBack
 * @return
 */
InitialObj.prototype.initFindBankName=function(callBack){
	$.request({
		type: 'Get',
		url: basePath+'/jxc/authority/terpAccount/findBankName',
		async: false,
		dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
		success: callBack
	});	
}
/************************************************分期商酬金**************************************************/

/**
 * 分期商酬金  修改佣金比例
 * @param 公司ID
 * @param 
 * @param 回掉函数
 */
InitialObj.prototype.updateRatio=function(remunerationRatio,id,callBack){
	 $.request({
		url: this.basePath + '/jxc/authority/tInstallMeNtfee/updateRatio',
		type : "get",
		async: false,
		data:{remunerationRatio:remunerationRatio,id:id},
		dataType : 'json',
		success:callBack
	}); 	
}

/**
 *  分期商  新增、修改
 * @param 公司ID
 * @param 
 * @param 回掉函数
 */
InitialObj.prototype.saveAndCloseRatio=function(param,ac_jc,callBack){
	 $.request({
		url: this.basePath + '/jxc/authority/tInstallMeNtfee/saveAndCloseRatio/'+ac_jc,
		type : "post",
		data:param,//将对象转换为JSON字符串
//		async: false,
		dataType : 'json',
		success:callBack
	}); 	
}

/**
 * 分期商酬金  启用、禁用、删除
 * @param id
 * @param callBack
 * @author PiHao
 */
InitialObj.prototype.disOrEnInstallMeNtfee=function(ids,status,ac_jc,callBack){
	$.request({
		url: this.basePath + '/jxc/authority/tInstallMeNtfee/disOrEnTinstallmentfee/' + status + '/' + ac_jc,
		type : "POST",
		data:{'ids':ids},
		async: false,
		traditional: true,
		success:callBack
	}); 
}

/**
 * 分期商
 * @param callBack
 * @return
 */
InitialObj.prototype.initInstallment=function(callBack){
	$.request({
		type: 'Get',
		url: basePath+'/installmentfee/searchInstallment',
//		async: false,
		dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
		success: callBack
	});	
}

/************************************************业务档案**************************************************/

/**
 * 业务档案  新增、修改
 * @param 公司ID
 * @param 
 * @param 回掉函数
 */
InitialObj.prototype.saveAndCloseSerReward=function(param,ac_jc,callBack){
	 $.request({
		url: this.basePath + '/jxc/authority/iserReward/saveOrUpdateSerReward/'+ac_jc,
		type : "post",
		async: false,
		data:param,//将对象转换为JSON字符串
		dataType : 'json',
		success:callBack
	}); 	
}

/**
 * 业务档案  启用、禁用、删除
 * @param id
 * @param callBack
 * @author PiHao
 */
InitialObj.prototype.disOrEnSerReward=function(ids,status,ac_jc,callBack){
	$.request({
		url: this.basePath + '/jxc/authority/iserReward/disOrEnSerReward/' + status + '/' + ac_jc,
		type : "POST",
		async: false,
		data:{'ids':ids},
		traditional: true,
		success:callBack
	}); 
}

/**
 * 运营商
 * @param callBack
 * @return
 */
InitialObj.prototype.initFindOterator=function(callBack){
	$.request({
		type: 'Get',
		url: basePath+'/jxc/authority/iserReward/findOperator',
		async: false,
		dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
		success: callBack
	});	
}

/************************************************卷名称**************************************************/

/**
 * 卷名称  新增、修改
 * @param 公司ID
 * @param 
 * @param 回掉函数
 */
InitialObj.prototype.saveAndCloseIcoUpOn=function(param,ac_jc,callBack){
	 $.request({
		url: this.basePath + '/jxc/authority/icoupon/saveAndCloseIcoUpOn/'+ac_jc,
		type : "post",
		data:param,//将对象转换为JSON字符串
//		async: false,
		dataType : 'json',
		success:callBack
	}); 	
}

/**
 * 卷类型
 * @param callBack
 * @return
 */
InitialObj.prototype.initCoUpOnName=function(selStatus,callBack){
	$.request({
		type: 'Get',
		url: basePath+'/jxc/authority/icoupon/findCoUpOnName/'+selStatus,
		async: false,
		dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
		success: callBack
	});	
}

/**
 * 往来单位
 * @param callBack
 * @return
 */
InitialObj.prototype.findContactUnit=function(callBack){
	$.request({
		type: 'Get',
		url: basePath+'/jxc/authority/icoupon/findContactUnit',
		async: false,
		dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
		success: callBack
	});	
}

/**
 * 卷名称  启用、禁用、删除
 * @param id
 * @param callBack
 * @author PiHao
 */
InitialObj.prototype.disOrEnIcoUpOn=function(ids,status,ac_jc,callBack){
	$.request({
		url: this.basePath + '/jxc/authority/icoupon/disOrEnIcoUpOn/'+ac_jc,
		type : "GET",
		data:{ids:ids,status:status},
//		async: false,
		traditional: true,
		success:callBack
	}); 
}

/************************************************收支类别管理**************************************************/

/**
 * 收支类别  新增、修改
 * @param 公司ID
 * @param 
 * @param 回掉函数
 */
InitialObj.prototype.saveAndCloseInpayClass=function(param,ac_jc,callBack){
	 $.request({
		url: this.basePath + '/jxc/authority/tinpayClass/saveAndCloseInpayClass/'+ac_jc,
		type : "post",
//		async: false,
		data:param,//将对象转换为JSON字符串
		dataType : 'json',
		success:callBack
	}); 	
}

/**
 * 收支类别  启用、禁用、删除
 * @param id
 * @param callBack
 * @author PiHao
 */
InitialObj.prototype.disOrEnInpayClass=function(ids,status,ac_jc,callBack){
	$.request({
		url: this.basePath + '/jxc/authority/tinpayClass/disOrEnInpayClass/' + status + '/' + ac_jc,
		type : "POST",
		data:{'ids':ids},
//		async: false,
		traditional: true,
		success:callBack
	}); 
}

/************************************************收付款类别管理**************************************************/

/**
 * 收付款类别  新增、修改
 * @param 公司ID
 * @param 
 * @param 回掉函数
 */
InitialObj.prototype.saveAndClosePayReceiveClass=function(param,callBack){
	 $.request({
		url: this.basePath + '/jxc/funds/tpayReceiveClass/saveAndClosePayReceiveClass',
		type : "post",
//		async: false,
		data:param,//将对象转换为JSON字符串
		dataType : 'json',
		success:callBack
	}); 	
}

/**
 * 收付款类别  启用、禁用、删除
 * @param id
 * @param callBack
 * 
 */
InitialObj.prototype.disOrEnPayReceiveClass=function(ids,status,callBack){
	$.request({
		url: this.basePath + '/jxc/funds/tpayReceiveClass/disOrEnPayReceiveClass/' + status,
		type : "POST",
		data:{'ids':ids},
//		async: false,
		traditional: true,
		success:callBack
	}); 
}

/************************************************日结**************************************************/
/**
 * 日结/反日结
 * @param callBack
 * @author PiHao
 */
InitialObj.prototype.dailyOrUnDaily=function(param,status,callBack){
	$.request({
		url: this.basePath + '/jxc/authority/tdaily/dailyOrUnDailyUpdate/'+status,
		type : "post",
		data:JSON.stringify(param),//将集合转换为JSON字符串
		contentType : 'application/json',//传输类型
		success:callBack
	}); 
}

/************************************************其他出入库方式**************************************************/

/**
 * 其他出入库方式  新增、修改
 * @param 公司ID
 * @param 
 * @param 回掉函数
 */
InitialObj.prototype.saveAndCloseTotherstorageClass=function(param,ac_jc,callBack){
	 $.request({
		url: this.basePath + '/jxc/authority/tOtherstorageClass/saveAndCloseTotherstorageClass/'+ac_jc,
		type : "post",
		async: false,
		data:param,//将对象转换为JSON字符串
		dataType : 'json',
		success:callBack
	}); 	
}

/**
 * 其他出入库方式  启用、禁用、删除
 * @param id
 * @param callBack
 * @author PiHao
 */
InitialObj.prototype.disOrEnTotherstorageClass=function(ids,status,ac_jc,callBack){
	$.request({
		url: this.basePath + '/jxc/authority/tOtherstorageClass/disOrEnTotherstorageClass/' + status + '/' + ac_jc,
		type : "POST",
		data:{'ids':ids},
		async: false,
		traditional: true,
		success:callBack
	}); 
}

/************************************************调整原因**************************************************/

/**
 * 调整原因  新增、修改
 * @param 公司ID
 * @param 
 * @param 回掉函数
 */
InitialObj.prototype.saveAndCloseItzReason=function(param,ac_jc,callBack){
	 $.request({
		url: this.basePath + '/jxc/authority/ItzReason/saveAndCloseItzReason/'+ac_jc,
		type : "post",
//		async: false,
		data:param,//将对象转换为JSON字符串
		dataType : 'json',
		success:callBack
	}); 	
}

/**
 * 调整原因  删除
 * @param 公司ID
 * @param 
 * @param 回掉函数
 */
InitialObj.prototype.delItzReason=function(delIds,callBack){
	 $.request({
		url: this.basePath + '/jxc/authority/ItzReason/delItzReason',
		type : "post",
//		async: false,
		data:{delIds:delIds},//将对象转换为JSON字符串
		dataType : 'json',
		success:callBack
	}); 	
}

/************************************************售后维护项目**************************************************/

/**
 * 售后维护项目  新增、修改
 * @param 公司ID
 * @param 
 * @param 回掉函数
 */
InitialObj.prototype.saveAndCloseAprojectName=function(param,ac_jc,callBack){
	 $.request({
		url: this.basePath + '/jxc/authority/AprojectName/saveAndCloseAprojectName/'+ac_jc,
		type : "post",
//		async: false,
		data:param,//将对象转换为JSON字符串
		dataType : 'json',
		success:callBack
	}); 	
}

/**
 * 售后维护项目  删除
 * @param 公司ID
 * @param 
 * @param 回掉函数
 */
InitialObj.prototype.delAprojectName=function(delIds,callBack){
	 $.request({
		url: this.basePath + '/jxc/authority/AprojectName/delAprojectName',
		type : "post",
//		async: false,
		data:{delIds:delIds},//将对象转换为JSON字符串
		dataType : 'json',
		success:callBack
	}); 	
}

$.extend({
	ac_jc:function(data) {
		//判断权限
		if(data.desc != null) {
			$.zxsaas_plus.showalert("提示信息", data.desc);
			return true;
		}
	}
});

