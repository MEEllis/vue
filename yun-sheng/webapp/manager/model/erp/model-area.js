/**
 * @author XiangRui
 * @param basePath
 * @return
 */
function Area(basePath){
	this.basePath = basePath;
}
/**
 * 新增
 */
Area.prototype.add=function(model,callBack){
	 $.request({
			url: this.basePath + '/Tarea/add',
			type : "post",
			dataType : 'json',
			data:model,
			success:callBack
	});  	
}
/**
 * 保存
 */
Area.prototype.save=function(model,callBack){
	 $.request({
			url: this.basePath + '/Tarea/save',
			type : "post",
			dataType : 'json',
			data:model,
			success:callBack
	});  
}
/**
 * 删除
 */
Area.prototype.del=function(ids,callBack){
	 $.request({
		 url: this.basePath + '/Tarea/del',
			type : "post",
			dataType : 'json',
			data:{'ids':ids},
			success:callBack
	 }); 
}
/**
 * 启用
 */
Area.prototype.enabled=function(ids,callBack){
	 $.request({
			url: this.basePath + '/Tarea/enabled',
			type : "post",
			dataType : 'json',
			data:{'ids':ids},
			success:callBack
	});  
}
/**
 * 禁用
 */
Area.prototype.disEnabled=function(ids,callBack){
	 $.request({
			url: this.basePath + '/Tarea/disEnabled',
			type : "post",
			dataType : 'json',
			data:{'ids':ids},
			success:callBack
	});  
}