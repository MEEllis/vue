/**
 * @author XiangRui
 * @param basePath
 * @return
 */
function Bills(basePath){
	this.basePath = basePath;
}
/**
 * 保存备注
 */
Bills.prototype.saveBillsRamark=function(model, callBack, valCode){
	 $.request({
			url: this.basePath + '/IbillsMain/saveBillsRamark/'+valCode,
			type : "post",
			dataType : 'json',
			data:model,
			success:callBack
	});   	
}
/**
 * 过账
 */
Bills.prototype.saveCheckOrder=function(model, callBack, valCode){
	 $.request({
			url: this.basePath + '/IbillsMain/saveCheckOrder/'+valCode,
			type : "post",
			dataType : 'json',
			data:model,
			success:callBack
	});   	
}
/**
 * 红冲
 */
Bills.prototype.saveForceFinishOrder=function(model, callBack, valCode){
	 $.request({
			url: this.basePath + '/IbillsMain/saveForceFinishOrder/'+valCode,
			type : "post",
			dataType : 'json',
			data:model,
			success:callBack
	});   	
}

/**
 * 删除采购单据
 */
Bills.prototype.delCgBills=function(model, callBack, valCode){
	 $.request({
			url: this.basePath + '/IbillsMain/delCgBills/'+valCode,
			type : "post",
			dataType : 'json',
			data:model,
			success:callBack
	});  	
}
/**
 * 新增 入库单据
 */
Bills.prototype.saveInStorageBills=function(model,callBack){
	 $.request({
		    type : "post",
			url: this.basePath + '/IbillsMain/saveInStorageBills',
			data:JSON.stringify(model),//将集合转换为JSON字符串
			contentType : 'application/json',//传输类型
			dataType : 'json',//接收类型
			success:callBack
	});  	
}
/**
 * 新增 换货单据
 */
Bills.prototype.saveExchangeGoodsBills=function(model,callBack){
	 $.request({
		    type : "post",
			url: this.basePath + '/IbillsMain/saveExchangeGoodsBills',
			data:JSON.stringify(model),//将集合转换为JSON字符串
			contentType : 'application/json',//传输类型
			dataType : 'json',//接收类型
			success:callBack
	});  	
}
/**
 * 新增 退货单据
 */
Bills.prototype.saveReturnedGoodsBills=function(model,callBack){
	 $.request({
		    type : "post",
			url: this.basePath + '/IbillsMain/saveReturnedGoodsBills',
			data:JSON.stringify(model),//将集合转换为JSON字符串
			contentType : 'application/json',//传输类型
			dataType : 'json',//接收类型
			success:callBack
	});  	
}
/**
 * 新增 委托入库单据
 */
Bills.prototype.saveEntrustInStorageBills=function(model,callBack){
	 $.request({
		    type : "post",
			url: this.basePath + '/IbillsMain/saveEntrustInStorageBills',
			data:JSON.stringify(model),//将集合转换为JSON字符串
			contentType : 'application/json',//传输类型
			dataType : 'json',//接收类型
			success:callBack
	});  	
}
/**
 * 新增 委托退货单据
 */
Bills.prototype.saveEntrustReturnedGoodsBills=function(model,callBack){
	 $.request({
		    type : "post",
			url: this.basePath + '/IbillsMain/saveEntrustReturnedGoodsBills',
			data:JSON.stringify(model),//将集合转换为JSON字符串
			contentType : 'application/json',//传输类型
			dataType : 'json',//接收类型
			success:callBack
	});  	
}

Bills.prototype.saveEntrustReturnedGoodsBills2=function(model,callBack){
	 $.request({
		    type : "post",
			url: this.basePath + '/IbillsMain/saveEntrustReturnedGoodsBills2',
			data:JSON.stringify(model),//将集合转换为JSON字符串
			contentType : 'application/json',//传输类型
			dataType : 'json',//接收类型
			success:callBack
	});  	
}