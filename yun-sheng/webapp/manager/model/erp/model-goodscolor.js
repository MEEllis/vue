
/**
 * @author XiangRui
 * @param basePath
 * @return
 */
function GoodsColor(basePath){
	this.basePath = basePath;
}
/**
 * 新增
 */
GoodsColor.prototype.add=function(model,callBack){
	 $.request({
			url: this.basePath + '/Tgoodscolor/add',
			type : "post",
			dataType : 'json',
			data:model,
			success:callBack
	});  	
}
/**
 * 保存
 */
GoodsColor.prototype.save=function(model,callBack){
	 $.request({
			url: this.basePath + '/Tgoodscolor/save',
			type : "post",
			dataType : 'json',
			data:model,
			success:callBack
	});  
}
/**
 * 删除
 */
GoodsColor.prototype.del=function(id,callBack){
	 $.request({
		 url: this.basePath + '/Tgoodscolor/del',
			type : "post",
			dataType : 'json',
			data:{'id':id},
			success:callBack
	 }); 
}
/**
 * 启用
 */
GoodsColor.prototype.enabled=function(ids,callBack){
	 $.request({
			url: this.basePath + '/Tgoodscolor/enabled',
			type : "post",
			dataType : 'json',
			data:{'ids':ids},
			success:callBack
	});  
}
/**
 * 禁用
 */
GoodsColor.prototype.disEnabled=function(ids,callBack){
	 $.request({
			url: this.basePath + '/Tgoodscolor/disEnabled',
			type : "post",
			dataType : 'json',
			data:{'ids':ids},
			success:callBack
	});  
}