/**
 * @author XiangRui
 * @param basePath
 * @return
 */
function Company(basePath){
	this.basePath = basePath;
}
/**
 * 新增
 */
Company.prototype.add=function(model,callBack){
	$.request({
			url: this.basePath + '/Tcompany/add',
			type : "post",
			dataType : 'json',
			data:model,
			success:callBack
	});  	
}
/**
 * 重置密码
 */
Company.prototype.resetAdminPwd=function(model,callBack){
	$.request({
			url: this.basePath + '/Tcompany/resetAdminPwd',
			type : "post",
			dataType : 'json',
			data:model,
			success:callBack
	});  
}
/**
 * 保存
 */
Company.prototype.save=function(model,callBack){
	$.request({
			url: this.basePath + '/Tcompany/save',
			type : "post",
			dataType : 'json',
			data:model,
			success:callBack
	});  
}
/**
 * 保存对职员授权数据
 */
Company.prototype.saveEmpPowerData=function(model,callBack){
	$.request({
			url: this.basePath + '/Tcompany/saveEmpPowerData',
			type : "post",
			dataType : 'json',
			data:model,
			success:callBack
	});  
}
/**
 * 删除
 */
Company.prototype.del=function(ids,callBack){
	$.request({
		 url: this.basePath + '/Tcompany/del',
			type : "post",
			dataType : 'json',
			data:{'ids':ids},
			success:callBack
	 }); 
}
/**
 * 启用
 */
Company.prototype.enabled=function(ids,callBack){
	$.request({
			url: this.basePath + '/Tcompany/enabled',
			type : "post",
			dataType : 'json',
			data:{'ids':ids},
			success:callBack
	});  
}
/**
 * 禁用
 */
Company.prototype.disEnabled=function(ids,callBack){
	$.request({
			url: this.basePath + '/Tcompany/disEnabled',
			type : "post",
			dataType : 'json',
			data:{'ids':ids},
			success:callBack
	});  
}