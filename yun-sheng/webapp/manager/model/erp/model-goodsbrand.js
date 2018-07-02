
/**
 * @author XiangRui
 * @param basePath
 * @return
 */
function GoodsBrand(basePath){
	this.basePath = basePath;
}
/**
 * 新增
 */
GoodsBrand.prototype.add=function(model,callBack){
	 $.request({
			url: this.basePath + '/Tgoodsbrand/add',
			type : "post",
			dataType : 'json',
			data:model,
			success:callBack
	});  	
}
/**
 * 保存
 */
GoodsBrand.prototype.save=function(model,callBack){
	 $.request({
			url: this.basePath + '/Tgoodsbrand/save',
			type : "post",
			dataType : 'json',
			data:model,
			success:callBack
	});  
}
/**
 * 删除
 */
GoodsBrand.prototype.del=function(id,callBack){
	 $.request({
		 url: this.basePath + '/Tgoodsbrand/del',
			type : "post",
			dataType : 'json',
			data:{'id':id},
			success:callBack
	 }); 
}
/**
 * 启用
 */
GoodsBrand.prototype.enabled=function(ids,callBack){
	 $.request({
			url: this.basePath + '/Tgoodsbrand/enabled',
			type : "post",
			dataType : 'json',
			data:{'ids':ids},
			success:callBack
	});  
}
/**
 * 禁用
 */
GoodsBrand.prototype.disEnabled=function(ids,callBack){
	 $.request({
			url: this.basePath + '/Tgoodsbrand/disEnabled',
			type : "post",
			dataType : 'json',
			data:{'ids':ids},
			success:callBack
	});  
}
