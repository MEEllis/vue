
/**
 * @author XiangRui
 * @param basePath
 * @return
 */
function GoodsClass(basePath){
	this.basePath = basePath;
}
/**
 * 新增
 */
GoodsClass.prototype.add=function(model,callBack){
	 $.request({
			url: this.basePath + '/Tgoodsclass/add',
			type : "post",
			dataType : 'json',
			data:model,
			success:callBack
	});  	
}
/**
 * 保存
 */
GoodsClass.prototype.save=function(model,callBack){
	 $.request({
			url: this.basePath + '/Tgoodsclass/save',
			type : "post",
			dataType : 'json',
			data:model,
			success:callBack
	});  
}
/**
 * 删除
 */
GoodsClass.prototype.del=function(id,callBack){
	 $.request({
		 url: this.basePath + '/Tgoodsclass/del',
			type : "post",
			dataType : 'json',
			data:{'id':id},
			success:callBack
	 }); 
}
/**
 * 启用
 */
GoodsClass.prototype.enabled=function(ids,callBack){
	 $.request({
			url: this.basePath + '/Tgoodsclass/enabled',
			type : "post",
			dataType : 'json',
			data:{'ids':ids},
			success:callBack
	});  
}
/**
 * 禁用
 */
GoodsClass.prototype.disEnabled=function(ids,callBack){
	 $.request({
			url: this.basePath + '/Tgoodsclass/disEnabled',
			type : "post",
			dataType : 'json',
			data:{'ids':ids},
			success:callBack
	});  
}