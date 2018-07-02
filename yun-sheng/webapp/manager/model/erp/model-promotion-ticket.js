
/**
 * @author XiangRui
 * @param basePath
 * @return
 */

function CpromotionTicket(basePath){
	this.basePath = basePath;
}

/**
 * 保存 
 */
CpromotionTicket.prototype.saveTicket=function(model,callBack){
	 $.request({
		    type : "post",
			url: this.basePath + '/CretailTicketInfo/saveTicket',
			data:JSON.stringify(model),//将集合转换为JSON字符串
			contentType : 'application/json',//传输类型
			dataType : 'json',//接收类型
			success:callBack
	});  	
}

/**
 * 启用
 */
CpromotionTicket.prototype.enabled=function(ids,callBack){
	 $.request({
			url: this.basePath + '/CretailTicketInfo/enabled',
			type : "post",
			dataType : 'json',
			data:{'ids':ids},
			success:callBack
	});  
}
/**
 * 禁用
 */
CpromotionTicket.prototype.disEnabled=function(ids,callBack){
	 $.request({
			url: this.basePath + '/CretailTicketInfo/disEnabled',
			type : "post",
			dataType : 'json',
			data:{'ids':ids},
			success:callBack
	});  
}