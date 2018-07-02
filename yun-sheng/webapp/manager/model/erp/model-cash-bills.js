
/**
 * @author XiangRui
 * @param basePath
 * @return
 */
function CashMain(basePath){
	this.basePath = basePath;
}
/**
 * 保存备注
 */
CashMain.prototype.saveBillsRamark=function(model, callBack, valCode){
	 $.request({
			url: this.basePath + '/IcashMain/saveBillsRamark/'+valCode,
			type : "post",
			dataType : 'json',
			data:model,
			success:callBack
	});   	
}
/**
 * 过账
 */
CashMain.prototype.saveCheckOrder=function(model,callBack, valCode){
	 $.request({
			url: this.basePath + '/IcashMain/saveCheckOrder/'+valCode,
			type : "post",
			dataType : 'json',
			data:model,
			success:callBack
	});   	
}

/**
 * 红冲
 */
CashMain.prototype.saveRedDashed=function(model,callBack, valCode){
	 $.request({
			url: this.basePath + '/IcashMain/saveRedDashed/'+valCode,
			type : "post",
			dataType : 'json',
			data:model,
			success:callBack
	});   	
}

/**
 * 删除资金单据
 */
CashMain.prototype.delCashBills=function(model,callBack, valCode){
	 $.ajax({
			url: this.basePath + '/IcashMain/delCashBills/'+valCode,
			type : "post",
			dataType : 'json',
			data:model,
			success:callBack
	});  	 
}

/**
 * 保存 保存并过账供应商保价单
 */
CashMain.prototype.saveSupplierRepriceBills=function(model,callBack){
	 $.ajax({
		    type : "post",
			url: this.basePath + '/IcashMain/saveSupplierRepriceBills',
			data:JSON.stringify(model),//将集合转换为JSON字符串
			contentType : 'application/json',//传输类型
			dataType : 'json',//接收类型
			success:callBack
	});  	
}

/**
 * 保存 保存供应商返利单
 */
CashMain.prototype.saveAndPostSupplierRebateBills=function(model,callBack){
	 $.ajax({
		    type : "post",
			url: this.basePath + '/IcashMain/saveAndPostSupplierRebateBills',
			data:JSON.stringify(model),//将集合转换为JSON字符串
			contentType : 'application/json',//传输类型
			dataType : 'json',//接收类型
			success:callBack
	});  	
}

/**
 * 保存 保存客户保价单
 */
CashMain.prototype.saveAndPostClientRepriceBills=function(model,callBack){
	 $.ajax({
		    type : "post",
			url: this.basePath + '/IcashMain/saveAndPostClientRepriceBills',
			data:JSON.stringify(model),//将集合转换为JSON字符串
			contentType : 'application/json',//传输类型
			dataType : 'json',//接收类型
			success:callBack
	});  	
}

/**
 * 保存 保存客户返利单
 */
CashMain.prototype.saveAndPostClientRebateBills=function(model,callBack){
	 $.ajax({
		    type : "post",
			url: this.basePath + '/IcashMain/saveAndPostClientRebateBills',
			data:JSON.stringify(model),//将集合转换为JSON字符串
			contentType : 'application/json',//传输类型
			dataType : 'json',//接收类型
			success:callBack
	});  	
}

/**
 * 保存 保存受托结算单
 */
CashMain.prototype.saveBeEntrustSettlementBills=function(model,callBack){
	 $.ajax({
		    type : "post",
			url: this.basePath + '/IcashMain/saveBeEntrustSettlementBills',
			data:JSON.stringify(model),//将集合转换为JSON字符串
			contentType : 'application/json',//传输类型
			dataType : 'json',//接收类型
			success:callBack
	});  	
}

/**
 * 保存 保存受托撤结单
 */
CashMain.prototype.saveBeEntrustUndoSettlementBills=function(model,callBack){
	 $.ajax({
		    type : "post",
			url: this.basePath + '/IcashMain/saveBeEntrustUndoSettlementBills',
			data:JSON.stringify(model),//将集合转换为JSON字符串
			contentType : 'application/json',//传输类型
			dataType : 'json',//接收类型
			success:callBack
	});  	
}

/**
 * 保存 保存受托商品调价单
 */
CashMain.prototype.saveBeEntrustChangePriceBills=function(model,callBack){
	 $.ajax({
		    type : "post",
			url: this.basePath + '/IcashMain/saveBeEntrustChangePriceBills',
			data:JSON.stringify(model),//将集合转换为JSON字符串
			contentType : 'application/json',//传输类型
			dataType : 'json',//接收类型
			success:callBack
	});  	
}

/**
 * 保存 保存委托商品调价单
 */
CashMain.prototype.saveEntrustChangePriceBills=function(model,callBack){
	 $.ajax({
		    type : "post",
			url: this.basePath + '/IcashMain/saveEntrustChangePriceBills',
			data:JSON.stringify(model),//将集合转换为JSON字符串
			contentType : 'application/json',//传输类型
			dataType : 'json',//接收类型
			success:callBack
	});  	
}

/**
 * 保存 保存委托结算单
 */
CashMain.prototype.saveEntrustSettlementBills=function(model,callBack){
	 $.ajax({
		    type : "post",
			url: this.basePath + '/IcashMain/saveEntrustSettlementBills',
			data:JSON.stringify(model),//将集合转换为JSON字符串
			contentType : 'application/json',//传输类型
			dataType : 'json',//接收类型
			success:callBack
	});  	
}

/**
 * 保存 保存委托撤结单
 */
CashMain.prototype.saveEntrustUndoSettlementBills=function(model,callBack){
	 $.ajax({
		    type : "post",
			url: this.basePath + '/IcashMain/saveEntrustUndoSettlementBills',
			data:JSON.stringify(model),//将集合转换为JSON字符串
			contentType : 'application/json',//传输类型
			dataType : 'json',//接收类型
			success:callBack
	});  	
}