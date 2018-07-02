/**
 * @author XiangRui
 * @param basePath
 * @return
 */
function Order(basePath){
	this.basePath = basePath;
}
/**
 * 保存备注
 */
Order.prototype.saveBillsRamark=function(model,callBack){
	 $.request({
            type : "post",
            contentType:'application/json',
			url: this.basePath + '/inventory/purchase/updateRemark',
            data:JSON.stringify(model),
			success:callBack
	});   	
}
/**
 * 新增
 */
Order.prototype.savePurchaseOrder=function(model,callBack){
	 $.request({
		    type : "post",
			url: this.basePath + '/IorderMain/savePurchaseOrder',
			data:JSON.stringify(model),//将集合转换为JSON字符串
			contentType : 'application/json',//传输类型
			dataType : 'json',//接收类型
			success:callBack
	});  	
}
/**
 * 删除采购订单
 */
Order.prototype.delCgOrder=function(model,callBack){
	 $.request({
			url: this.basePath + '/IorderMain/delCgOrder',
			type : "post",
			dataType : 'json',
			data:model,
			success:callBack
	});  	
}
/**
 * 审核
 */
Order.prototype.saveCheckOrder=function(model,callBack){
	$.request({
		    type : "post",
			url: this.basePath + '/IorderMain/saveCheckOrder',
			data:JSON.stringify(model),//将集合转换为JSON字符串
			contentType : 'application/json',//传输类型
			dataType : 'json',//接收类型
			success:callBack
	});
}
/**
 * 强制完成
 */
Order.prototype.saveForceFinishOrder=function(model,callBack){
	 $.request({
			url: this.basePath + '/IorderMain/saveForceFinishOrder',
			type : "post",
			dataType : 'json',
			data:model,
			success:callBack
	});   	
}