
/**
 * @author XiangRui
 * @param basePath
 * @return
 */
function GoodsName(basePath){
	this.basePath = basePath;
}
/**
 * 新增
 */
GoodsName.prototype.add=function(model,callBack){
	 $.request({
			url: this.basePath + '/Tgoodsname/add',
			type : "post",
			dataType : 'json',
			data:model,
			success:callBack
	});  	
}
/**
 * 保存
 */
GoodsName.prototype.save=function(model,callBack){
	 $.request({
			url: this.basePath + '/Tgoodsname/save',
			type : "post",
			dataType : 'json',
			data:model,
			success:callBack
	});  
}
/**
 * 删除
 */
GoodsName.prototype.del=function(ids,callBack){
	 $.request({
		 url: this.basePath + '/Tgoodsname/del',
			type : "post",
			dataType : 'json',
			data:{'ids':ids},
			success:callBack
	 }); 
}
/**
 * 启用
 */
GoodsName.prototype.enabled=function(ids,callBack){
	 $.request({
			url: this.basePath + '/Tgoodsname/enabled',
			type : "post",
			dataType : 'json',
			data:{'ids':ids},
			success:callBack
	});  
}
/**
 * 禁用
 */
GoodsName.prototype.disEnabled=function(ids,callBack){
	 $.request({
			url: this.basePath + '/Tgoodsname/disEnabled',
			type : "post",
			dataType : 'json',
			data:{'ids':ids},
			success:callBack
	});  
}