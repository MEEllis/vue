
function Orders(basePath){
	this.basePath = basePath;
}
/**********************其他收入********************************/
/*其他收入保存并过账*/
Orders.prototype.saveOrder = function(ipt_data,callback){
	$.ajax({
		url: this.basePath + '/IcashMain/saveOthIncomeBills',
		type : "post",
		contentType : 'application/json',
		dataType : 'json',
		data:JSON.stringify(ipt_data),
		success:callback
	});
}

/*其他收入红冲*/
Orders.prototype.Hchong = function(ipt_data,callback){
	$.ajax({
		url: this.basePath + '/IcashMain/saveRedDashed',
		type : "post",
		contentType : 'application/json',
		dataType : 'json',
		data:JSON.stringify(ipt_data),
		success:callback
	});
}


/**********************其他支出********************************/
/*其他支出保存并过账*/
Orders.prototype.saveOrderPay = function(ipt_data,callback){
	$.ajax({
		url: this.basePath + '/IcashMain/saveOtherExpendBills',
		type : "post",
		contentType : 'application/json',
		dataType : 'json',
		data:JSON.stringify(ipt_data),
		success:callback
	});
}
/*获取表格数据*/
//function allGridData(gridId,delAttr){
//	var gridDatas = [];
//	var obj={};
//	var ids = $(gridId).jqGrid('getDataIDs');
//	$.each(ids,function(i,item){
//		console.log("item+++"+item);
//		obj = $(gridId).jqGrid('getRowData',ids[i]);
//		if(delAttr.length>0){
//			for(var i=0;i<delAttr.length;i++){
//				delete obj[delAttr[i].toString()];
//			}
//		}
//		gridDatas.push(obj);
//	});
//	
//	return gridDatas;
//}

