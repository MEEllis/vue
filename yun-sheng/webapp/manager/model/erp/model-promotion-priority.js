
/**
 * @author XiangRui
 * @param basePath
 * @return
 */
function CpromotionPriorityInfo(basePath){
	this.basePath = basePath;
}

/**
 * 保存 
 */
CpromotionPriorityInfo.prototype.saveBillPriority=function(modelList,callBack){
	$.request({
		    type : "post",
			url: this.basePath + '/CpromotionPriorityInfo/saveBillPriority',
			data:JSON.stringify(modelList),//将集合转换为JSON字符串
			contentType : 'application/json',//传输类型
			dataType : 'json',//接收类型
			success:callBack
	}); 
}

/**
 * 保存 
 */
CpromotionPriorityInfo.prototype.saveTypePriority=function(typeOrders,callBack){
	 $.request({
			url: this.basePath + '/CpromotionPriorityInfo/saveTypePriority',
			type : "post",
			dataType : 'json',
			data:{"typeOrders":typeOrders},
			success:callBack
	});  	
}