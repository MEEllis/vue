
/**
 * @author XiangRui
 * @param basePath
 * @return
 */
function CbillsMain(basePath){
	this.basePath = basePath;
}

/**
 * 保存 零售促销单
 */
CbillsMain.prototype.saveRetailPromotionBills=function(model,callBack){
	 $.request({
		    type : "post",
			url: this.basePath + '/CbillsMain/saveRetailPromotionBills',
			data:JSON.stringify(model),//将集合转换为JSON字符串
			contentType : 'application/json',//传输类型
			dataType : 'json',//接收类型
			success:callBack
	});  	
}

/**
 * 保存 特价促销单
 */
CbillsMain.prototype.saveWholesaleGoodsBills=function(model,callBack){
	 $.request({
		    type : "post",
			url: this.basePath + '/CbillsMain/saveWholesaleGoodsBills',
			data:JSON.stringify(model),//将集合转换为JSON字符串
			contentType : 'application/json',//传输类型
			dataType : 'json',//接收类型
			success:callBack
	});  	
}

/**
 * 修改审核状态
 */
CbillsMain.prototype.saveJudgeStatus=function(model,callBack, valCode){
	 $.request({
			url: this.basePath + '/CbillsMain/saveJudgeStatus/'+valCode,
			type : "post",
			dataType : 'json',
			data:model,
			success:callBack
	});  
}

/**
 * 修改作废状态
 */
CbillsMain.prototype.saveCancleStatus=function(model,callBack, valCode){
	 $.request({
			url: this.basePath + '/CbillsMain/saveCancleStatus/'+valCode,
			type : "post",
			dataType : 'json',
			data:model,
			success:callBack
	});  
}

/**
 * 修改启用状态
 */
CbillsMain.prototype.saveDisableStatus=function(model,callBack, valCode){
	 $.request({
			url: this.basePath + '/CbillsMain/saveDisableStatus/'+valCode,
			type : "post",
			dataType : 'json',
			data:model,
			success:callBack
	});  
}