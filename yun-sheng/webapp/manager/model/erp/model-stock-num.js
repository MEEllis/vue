
/**
 * @author XiangRui
 * @param basePath
 * @return
 */
function StockNum(basePath){
	this.basePath = basePath;
}
/**
 * 查询列表
 */
StockNum.prototype.listByModel=function(model,callBack){
	 $.request({
			url: this.basePath + '/IstockNum/listByModel',
			type : "post",
			dataType : 'json',
			data:model,
			success:callBack
	});  	
}
