
/**
 * @author XiangRui
 * @param basePath
 * @return
 */
function StockIm(basePath){
	this.basePath = basePath;
}
/**
 * 查询列表
 */
StockIm.prototype.listByModel=function(model,callBack){
	 $.request({
			url: this.basePath + '/IstockIm/listByModel',
			type : "post",
			dataType : 'json',
			data:model,
			success:callBack
	});  	
}
