/**
 * 仓储对象
 * @author PiHao
 * 
 */
function StorageObj(basePath){
	this.basePath = basePath;
}

/************************************************同价调拨发货单**************************************************/

/**
 * 过滤查询
 * @param 
 * @param 回掉函数
 */
StorageObj.prototype.filterIbillsMainCC=function(param,ac_cc,callBack){
	$.request({
		url: this.basePath + "/jxc/storage/transferPrice/filterIbillsMainCC/"+ac_cc,
		type: "post",
		dataType : 'json',
		data:param,
		success:callBack
	});
},

/**
 * 保存 正式单
 * @param 
 * @param 回掉函数
 */
StorageObj.prototype.saveToOfficial=function(type,param,ac_cc,callBack){
	 $.request({
		url: this.basePath + '/jxc/storage/transferPrice/saveToOfficial/'+type+'/'+ac_cc,
		type : "post",
		dataType : 'json',
		data:JSON.stringify(param),//将集合转换为JSON字符串
		contentType : 'application/json',//传输类型
		success:callBack
	}); 	
},

/**
 * 新增草稿单据     同价调拨  变价调拨   其他出库    借出管理
 * @param 
 * @param 回掉函数
 */
StorageObj.prototype.saveNewBills=function(param,ac_cc,callBack){
	 $.request({
		url: this.basePath + '/jxc/storage/transferPrice/saveNewBills/'+ac_cc,
		type : "post",
		dataType : 'json',
		data:JSON.stringify(param),//将集合转换为JSON字符串
		contentType : 'application/json',//传输类型
		success:callBack
	}); 	
},

/**
 * 保存 草稿单
 * @param 
 * @param 回掉函数
 */
StorageObj.prototype.saveToDraft=function(param,ac_cc,callBack){
	 $.request({
		url: this.basePath + '/jxc/storage/transferPrice/saveToDraft/'+ac_cc,
		type : "post",
		dataType : 'json',
		data:JSON.stringify(param),//将集合转换为JSON字符串
		contentType : 'application/json',//传输类型
		success:callBack
	}); 	
},

/************************************************异价调拨发货单**************************************************/
/**
 * 过滤查询
 * @param 
 * @param 回掉函数
 */
StorageObj.prototype.filterChangeIbillsMainCC=function(callBack){
	$("#filterForm").ajaxSubmit({
	     type: "post",
	     url: this.basePath + "/jxc/storage/changeAllot/filterChangeIbillsMainCC",
	     async: false,
	     dataType: "json",
	     success: callBack
	});
},


/************************************************调拨接收**************************************************/

/**
 * 过滤 调拨接收
 * @param 
 * @param 回掉函数
 */
StorageObj.prototype.filterAllotReception=function(callBack){
	$("#filterForm").ajaxSubmit({
	     type: "post",
	     url: this.basePath + "/jxc/storage/allotReceptionAffim/filterAllotReception",
	     async: false,
	     dataType: "json",
	     success: callBack
	});	
},

/**
 * 调入部门下的仓库
 * @param callBack
 * @return
 */
StorageObj.prototype.findInStorage=function(id,callBack){
	$.ajax({
		type: 'post',
		url: basePath+'/component/storage/getStorageVoList',
//		async: false,
		dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
		data:{sectionId:id},
		success: function (data) {
			if(data.result==1 && callBack){
                data.data.receiveStorage=data.data.storageVoList;
                for(var i=0;i< data.data.receiveStorage.length;i++){
                    data.data.receiveStorage[i].id=data.data.receiveStorage[i].storageId
				}
                callBack(data)
			}
        }
	});	
},

/**
 * 拒收
 * @param 
 * @param 回掉函数
 */
StorageObj.prototype.RejectBills=function(param,callBack){
	 $.ajax({
		url: this.basePath + '/jxc/storage/allotReceptionAffim/RejectBills',
		type : "post",
		dataType : 'json',
		data:JSON.stringify(param),//将集合转换为JSON字符串
		contentType : 'application/json',//传输类型
		success:callBack
	}); 	
},

StorageObj.prototype.RejectBills_allot=function(params,callBack){
	 $.ajax({
		url: this.basePath + '/inventory/storage/price/transfer/receive/rejectOrder',
		type : "post",
	    dataType : 'json',
		data:{rejectJsonData:JSON.stringify(params)},//将集合转换为JSON字符串
		success:callBack
	}); 	
},

/**
 * 接收
 * @param 
 * @param 回掉函数
 */
StorageObj.prototype.receiveBills=function(billsIdStr,storageId,receiveDateString,receiveRemark,callBack){
	 $.request({
		url: this.basePath + '/jxc/storage/allotReceptionAffim/receiveBills',
		type : "post",
		dataType : 'json',
		data:{billsIdStr:billsIdStr,storageId:storageId,receiveDateString:receiveDateString,receiveRemark:receiveRemark},//将对象转换为JSON字符串
		success:function (data) {
            callBack(data)
        }
	}); 	
},

/**
 * 单据状态
 * @param callBack
 * @return
 */
StorageObj.prototype.findBillsStatus=function(callBack){
	$.ajax({
		type: 'Get',
		url: basePath+'/jxc/storage/allotReceptionAffim/findBillsStatus',
		async: false,
		dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
		success: callBack
	});	
},

/************************************************商品移库**************************************************/

/**
 * 过滤 商品移库
 * @param 
 * @param 回掉函数
 */
StorageObj.prototype.filterCommodity=function(param,callBack){
	$.request({
	     type: "post",
	     url: this.basePath + '/jxc/storage/commodity/filterCommodity',
	     dataType: "json",
	     data:param,
	     success: callBack
	});
},

/**
 * 新增 草稿单据
 * @param 
 * @param 回掉函数
 */
StorageObj.prototype.saveNewCommodityDraft=function(param,callBack){
	 $.request({
		url: this.basePath + '/jxc/storage/commodity/saveNewCommodityDraft',
		type : "post",
		dataType : 'json',
		data:JSON.stringify(param),//将集合转换为JSON字符串
		contentType : 'application/json',//传输类型
		success:callBack
	}); 	
},

/**
 * 保存 草稿单
 * @param 
 * @param 回掉函数
 */
StorageObj.prototype.saveCommodityDraft=function(param,callBack){
	 $.request({
		url: this.basePath + '/jxc/storage/commodity/saveCommodityDraft',
		type : "post",
		dataType : 'json',
		data:JSON.stringify(param),//将集合转换为JSON字符串
		contentType : 'application/json',//传输类型
		success:callBack
	}); 	
},

/**
 * 保存 正式单
 * @param 
 * @param 回掉函数
 */
StorageObj.prototype.saveCommodity=function(param,callBack){
	 $.request({
		url: this.basePath + '/jxc/storage/commodity/saveCommodity',
		type : "post",
		dataType : 'json',
		data:JSON.stringify(param),//将集合转换为JSON字符串
		contentType : 'application/json',//传输类型
		success:callBack
	}); 	
},

/************************************************其他入库**************************************************/

/**
 * 过滤 其他入库
 * @param 
 * @param 回掉函数
 */
StorageObj.prototype.filterOtherToStorage=function(param,callBack){
	$.request({
	     type: "post",
	     url: this.basePath + '/jxc/storage/otherToStorage/filterOtherToStorage',
	     dataType: "json",
	     data:param,
	     success: callBack
	});
},

/**
 * 新增 草稿单据
 * @param 
 * @param 回掉函数
 */
StorageObj.prototype.saveNewOtherInStorageDraft=function(param,ac_cc,callBack){
	 $.request({
		url: this.basePath + '/jxc/storage/otherToStorage/saveNewOtherInStorageDraft/'+ac_cc,
		type : "post",
		dataType : 'json',
		data:JSON.stringify(param),//将集合转换为JSON字符串
		contentType : 'application/json',//传输类型
		success:callBack
	}); 	
},

/**
 * 保存 其他入库 正式
 * @param 
 * @param 回掉函数
 */
StorageObj.prototype.saveToOthersToStorage=function(param,callBack){
	 $.request({
		url: this.basePath + '/jxc/storage/otherToStorage/saveToOthersToStorage',
		type : "post",
		dataType : 'json',
		data:JSON.stringify(param),//将集合转换为JSON字符串
		contentType : 'application/json',//传输类型
		success:callBack
	}); 	
},

/**
 * 保存 其他入库 草稿单
 * @param 
 * @param 回掉函数
 */
StorageObj.prototype.saveOtherInStorageDraft=function(param,ac_cc,callBack){
	 $.request({
		url: this.basePath + '/jxc/storage/otherToStorage/saveOtherInStorageDraft/'+ac_cc,
		type : "post",
		dataType : 'json',
		data:JSON.stringify(param),//将集合转换为JSON字符串
		contentType : 'application/json',//传输类型
		success:callBack
	}); 	
},

/************************************************其他出库**************************************************/

/**
 * 过滤 其他出库
 * @param 
 * @param 回掉函数
 */
StorageObj.prototype.filterOtherOutStorage=function(param,callBack){
	$.request({
	     type: "post",
	     url: this.basePath + '/jxc/storage/OtherOutStorage/filterOtherOutStorage',
	     dataType: "json",
	     data:param,
	     success: callBack
	});
},

/**
 * 新增 草稿单据
 * @param 
 * @param 回掉函数
 */
StorageObj.prototype.saveNewOtheroutStorageDraft=function(param,callBack){
	 $.ajax({
		url: this.basePath + '/jxc/storage/OtherOutStorage/saveNewOtheroutStorageDraft',
		type : "post",
		dataType : 'json',
		data:JSON.stringify(param),//将集合转换为JSON字符串
		contentType : 'application/json',//传输类型
		success:callBack
	}); 	
},

/**
 * 保存 其他出库 草稿单
 * @param 
 * @param 回掉函数
 */
StorageObj.prototype.saveOtherOutStorageDraft=function(param,callBack){
	 $.ajax({
		url: this.basePath + '/jxc/storage/OtherOutStorage/saveOtherOutStorageDraft',
		type : "post",
		dataType : 'json',
		data:JSON.stringify(param),//将集合转换为JSON字符串
		contentType : 'application/json',//传输类型
		success:callBack
	}); 	
},

/**
 * 保存 其他出库 正式
 * @param 
 * @param 回掉函数
 */
StorageObj.prototype.saveToOthersOutStorage=function(param,callBack){
	 $.ajax({
		url: this.basePath + '/jxc/storage/OtherOutStorage/saveToOthersOutStorage',
		type : "post",
		dataType : 'json',
		data:JSON.stringify(param),//将集合转换为JSON字符串
		contentType : 'application/json',//传输类型
		success:callBack
	}); 	
},

/************************************************借入管理**************************************************/

/**
 * 过滤 商品借入单
 * @param 
 * @param 回掉函数
 */
StorageObj.prototype.filterBorrowGoods=function(param,callBack){
	$.request({
	     type: "post",
	     url: this.basePath + '/jxc/storage/borrowManage/filterBorrowGoods',
	     dataType: "json",
	     data:param,
	     success: callBack
	});
},

/**
 * 过滤 借入归还单
 * @param 
 * @param 回掉函数
 */
StorageObj.prototype.filterBorrowBack=function(param,callBack){
	$.request({
	     type: "post",
	     url: this.basePath + '/jxc/storage/borrowManage/filterBorrowBack',
	     dataType: "json",
	     data:param,
	     success: callBack
	});
},

/**
 * 新增 草稿单据
 * @param 
 * @param 回掉函数
 */
StorageObj.prototype.saveNewBorrowBackDetailDraft=function(param,callBack){
	 $.request({
		url: this.basePath + '/jxc/storage/borrowManage/saveNewBorrowBackDetailDraft',
		type : "post",
		dataType : 'json',
		data:JSON.stringify(param),//将集合转换为JSON字符串
		contentType : 'application/json',//传输类型
		success:callBack
	}); 	
},

/**
 * 保存 草稿单
 * @param 
 * @param 回掉函数
 */
StorageObj.prototype.saveBorrowBackDetailDraft=function(param,callBack){
	 $.request({
		url: this.basePath + '/jxc/storage/borrowManage/saveBorrowBackDetailDraft',
		type : "post",
		dataType : 'json',
		data:JSON.stringify(param),//将集合转换为JSON字符串
		contentType : 'application/json',//传输类型
		success:callBack
	}); 	
},


/************************************************借出管理**************************************************/

/**
 * 过滤 商品借出单
 * @param 
 * @param 回掉函数
 */
StorageObj.prototype.filterLendGoods=function(param,callBack){
	$.request({
	     type: "post",
	     url: this.basePath + '/jxc/storage/loanManage/filterLendGoods',
	     dataType: "json",
	     data:param,
	     success: callBack
	});
},

/**
 * 过滤 借出归还单
 * @param 
 * @param 回掉函数
 */
StorageObj.prototype.filterLendBack=function(param,callBack){
	$.request({
	     type: "post",
	     url: this.basePath + '/jxc/storage/loanManage/filterLendBack',
	     dataType: "json",
	     data:param,
	     success: callBack
	});
},

/**
 * 新增 草稿单据
 * @param 
 * @param 回掉函数
 */
StorageObj.prototype.saveNewLendBackDetailDraft=function(param,callBack){
	 $.request({
		url: this.basePath + '/jxc/storage/loanManage/saveNewLendBackDetailDraft',
		type : "post",
		dataType : 'json',
		data:JSON.stringify(param),//将集合转换为JSON字符串
		contentType : 'application/json',//传输类型
		success:callBack
	}); 	
},

/**
 * 保存 草稿单
 * @param 
 * @param 回掉函数
 */
StorageObj.prototype.saveLendBackDetailDraft=function(param,callBack){
	 $.request({
		url: this.basePath + '/jxc/storage/loanManage/saveLendBackDetailDraft',
		type : "post",
		dataType : 'json',
		data:JSON.stringify(param),//将集合转换为JSON字符串
		contentType : 'application/json',//传输类型
		success:callBack
	}); 	
},

/************************************************借入转采购**************************************************/

/**
 * 过滤 借入转采购单
 * @param 
 * @param 回掉函数
 */
StorageObj.prototype.filterBorrowSaleDetail=function(billsType,pageNumber,statusBills,callBack){
	$.request({
		url: this.basePath + '/jxc/storage/borrowSaleDetail/filterBorrowSaleDetail',
		type : "get",
		dataType : 'json',
		data:{billsType:billsType,pageNumber:pageNumber,statusBills:statusBills},
		success:callBack
	}); 	
},

/**
 * 新增 草稿单据
 * @param 
 * @param 回掉函数
 */
StorageObj.prototype.saveNewBorrowSaleDetailDraft=function(param,callBack){
	 $.request({
		url: this.basePath + '/jxc/storage/borrowSaleDetail/saveNewBorrowSaleDetailDraft',
		type : "post",
		dataType : 'json',
		data:JSON.stringify(param),//将集合转换为JSON字符串
		contentType : 'application/json',//传输类型
		success:callBack
	}); 	
},

/**
 * 保存 草稿单
 * @param 
 * @param 回掉函数
 */
StorageObj.prototype.saveBorrowSaleDetailDraft=function(param,callBack){
	 
	 $.request({
		url: this.basePath + '/jxc/storage/borrowSaleDetail/saveBorrowSaleDetailDraft',
		type : "post",
		dataType : 'json',
		data:JSON.stringify(param),//将集合转换为JSON字符串
		contentType : 'application/json',//传输类型
		success:callBack
	}); 	
},

/************************************************借出转销售**************************************************/

/**
 * 过滤 借出转销售单
 * @param 
 * @param 回掉函数
 */
StorageObj.prototype.filterLendSaleDetail=function(billsType,pageNumber,statusBills,callBack){
	$.request({
		url: this.basePath + '/jxc/storage/lendSaleDetail/filterLendSaleDetail',
		type : "get",
		dataType : 'json',
		data:{billsType:billsType,pageNumber:pageNumber,statusBills:statusBills},
		success:callBack
	}); 
},

/**
 * 新增 草稿单据
 * @param 
 * @param 回掉函数
 */
StorageObj.prototype.saveNewLendSaleDetailDraft=function(param,callBack){
	 $.request({
		url: this.basePath + '/jxc/storage/lendSaleDetail/saveNewLendSaleDetailDraft',
		type : "post",
		dataType : 'json',
		data:JSON.stringify(param),//将集合转换为JSON字符串
		contentType : 'application/json',//传输类型
		success:callBack
	}); 	
},

/**
 * 保存 草稿单
 * @param 
 * @param 回掉函数
 */
StorageObj.prototype.saveLendSaleDetailDraft=function(param,callBack){
	 $.request({
		url: this.basePath + '/jxc/storage/lendSaleDetail/saveLendSaleDetailDraft',
		type : "post",
		dataType : 'json',
		data:JSON.stringify(param),//将集合转换为JSON字符串
		contentType : 'application/json',//传输类型
		success:callBack
	}); 	
},

/************************************************成本调整**************************************************/

/**
 * 过滤 成本调整
 * @param 
 * @param 回掉函数
 */
StorageObj.prototype.filterCostAdjust=function(param,callBack){
	$.request({
	     type: "post",
	     url: this.basePath + "/jxc/storage/costAdjust/filterCostAdjust",
	     dataType: "json",
	     data:param,
	     success: callBack 
	});
},

/**
 * 锁死库存
 * @param 
 * @param 回掉函数
 */
StorageObj.prototype.lockStock=function(param,callBack){
	 $.ajax({
		url: this.basePath + '/jxc/storage/costAdjust/lockStock',
		type : "post",
		dataType : 'json',
		data:param,
		success:callBack
	}); 	
},

/**
 * 新增 草稿单据
 * @param 
 * @param 回掉函数
 */
StorageObj.prototype.saveOrUpdateCost=function(param,ac_cc,callBack){
	 $.request({
		url: this.basePath + '/jxc/storage/costAdjust/saveOrUpdateCost/'+ac_cc,
		type : "post",
		dataType : 'json',
		data:JSON.stringify(param),//将集合转换为JSON字符串
		contentType : 'application/json',//传输类型
		success:callBack
	}); 	
},

/************************************************公共接口**************************************************/

/**
 * 查找库存量
 * @param 
 * @param 回掉函数
 */
StorageObj.prototype.findStockNumber=function(storageId,goodsId,sectionId,callBack){
	 $.ajax({
		url: this.basePath + '/storage/interfaceStockNum',
		type : "get",
		dataType : 'json',
		data:{storageId:storageId,goodsId:goodsId,sectionId:sectionId},
		success:callBack
	}); 	
},

/**
 * 引入在库串号、引入调整串号
 * @param 
 * @param 回掉函数
 */
StorageObj.prototype.interfaceImportImei=function(storageId,goodsId,callBack){
	 $.ajax({
		url: this.basePath + '/imei/interfaceImportImei',
		type : "get",
		dataType : 'json',
		data:{storageId:storageId,goodsId:goodsId},
		success:callBack
	}); 	
},

/**
 * 串号匹配
 * @param 
 * @param 回掉函数
 */
StorageObj.prototype.imeiMate=function(param,callBack){
	 $.ajax({
		url: this.basePath + '/jxc/storage/transferPrice/imeiMate',
		type : "post",
		dataType : 'json',
		data:param,//将对象转换为JSON字符串
		success:callBack
	}); 	
},

/**
 * 删除草稿单据
 * @param callBack
 * @author PiHao
 */
StorageObj.prototype.deleteIbillsMainDraftCC=function(id,storageType,ac_cc,callBack){
	$.request({
		url: this.basePath + '/jxc/storage/ibillsMainDraftCC/deleteIbillsMainDraftCC/'+ac_cc,
		type : "get",
		async: false,
		data:{id:id,storageType:storageType},
		success:callBack
	}); 
},

/**
 * 作废正式单据
 * @param callBack
 * @author PiHao
 */
StorageObj.prototype.deleteIbillsMainCC=function(id,callBack){
	$.request({
		url: this.basePath + '/jxc/storage/ibillsMainCC/deleteIbillsMainCC',
		type : "get",
		async: false,
		data:{id:id},
		success:callBack
	}); 
},

/**
 * 经手人
 * @param callBack
 * @return
 */
StorageObj.prototype.initManagers=function(sectionId,callBack){
	$.ajax({
		type: 'Get',
		url: basePath+'/jxc/base/getEmployeeVoList',
		async: false,
		data:{sectionId:sectionId},
		dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
		success: callBack
	});	
},

/**
 * 移入、移出仓库
 * @param callBack
 * @return
 */
StorageObj.prototype.initStorage=function(sectionId,callBack){
	$.ajax({
		type: 'Get',
		url: basePath+'/storage/interfaceMoveStorage',
		async: false,
		data:{sectionId:sectionId},
		dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
		success: callBack
	});	
},

/**
 * 查找串号 根据单据id、数量表id
 * @param callBack
 * @return
 */
StorageObj.prototype.findImeiByMidAndNid=function(mid,nid,callBack){
	$.ajax({
		type: 'Get',
		url: basePath+'/jxc/storage/ibillsMainCC/findImeiByMidAndNid',
		async: false,
		data:{mid:mid,nid:nid},
		dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
		success: callBack
	});	
},

/**
 * 其他出入库方式 
 * @param callBack
 * @return
 */
StorageObj.prototype.findOtherStorageClass=function(flag,callBack){
	$.ajax({
		type: 'Get',
		url: basePath+'/storage/findOtherStorageClass',
		async: false,
		data:{flag:flag},
		dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
		success: callBack
	});	
},

/**
 * 其他出入库方式 
 * @param callBack
 * @return
 */
StorageObj.prototype.findTzReason=function(callBack){
	$.ajax({
		type: 'Get',
		url: basePath+'/storage/findTzReason',
		async: false,
//		data:{flag:flag},
		dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
		success: callBack
	});	
},

/************************************************过账、红冲**************************************************/

/**
 * 同价调拨 过账、红冲
 * @param callBack
 * @return
 */
StorageObj.prototype.transferPrice=function(billsId,flag,busOpr,hcTimeStr,ac_cc,callBack){
	$.request({
		type: 'Get',
		url: basePath+'/jxc/storage/storedprocedure/transferPrice/'+ac_cc,
//		async: false,
		data:{billsId:billsId,flag:flag,busOpr:busOpr,hcTimeStr:hcTimeStr},
		dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
		success: callBack
	});	
},

/**
 * 变价调拨 过账、红冲
 * @param callBack
 * @return
 */
StorageObj.prototype.changeAllot=function(billsId,flag,busOpr,hcTimeStr,ac_cc,callBack){
	$.request({
		type: 'Get',
		url: basePath+'/jxc/storage/storedprocedure/changeAllot/'+ac_cc,
//		async: false,
		data:{billsId:billsId,flag:flag,busOpr:busOpr,hcTimeStr:hcTimeStr},
		dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
		success: callBack
	});	
},

/**
 * 调拨接收 过账、红冲
 * @param callBack
 * @return
 */
StorageObj.prototype.allotReceive=function(billsId,flag,busOpr,callBack){
	$.ajax({
		type: 'Get',
		url: basePath+'/jxc/storage/storedprocedure/allotReceive',
//		async: false,
		data:{billsId:billsId,flag:flag,busOpr:busOpr},
		dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
		success: callBack
	});	
},

/**
 * 商品移库 过账、红冲
 * @param callBack
 * @return
 */
StorageObj.prototype.commodity=function(billsId,flag,busOpr,hcTimeStr,callBack){
	$.request({
		type: 'Get',
		url: basePath+'/jxc/storage/storedprocedure/commodity',
//		async: false,
		data:{billsId:billsId,flag:flag,busOpr:busOpr,hcTimeStr:hcTimeStr},
		dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
		success: callBack
	});	
},

/**
 * 其他入库 过账、红冲
 * @param callBack
 * @return
 */
StorageObj.prototype.otherInStorage=function(billsId,flag,busOpr,hcTimeStr,qtrk_hc,callBack){
	$.request({
		type: 'Get',
		url: basePath+'/jxc/storage/storedprocedure/otherInStorage/'+qtrk_hc,
//		async: false,
		data:{billsId:billsId,flag:flag,busOpr:busOpr,hcTimeStr:hcTimeStr},
		dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
		success: callBack
	});	
},

/**
 * 其他出库 过账、红冲
 * @param callBack
 * @return
 */
StorageObj.prototype.otherOutStorage=function(billsId,flag,busOpr,hcTimeStr,ac_cc,callBack){
	$.request({
		type: 'Get',
		url: basePath+'/jxc/storage/storedprocedure/otherOutStorage/'+ac_cc,
//		async: false,
		data:{billsId:billsId,flag:flag,busOpr:busOpr,hcTimeStr:hcTimeStr},
		dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
		success: callBack
	});	
},

/**
 * 商品借入 过账、红冲
 * @param callBack
 * @return
 */
StorageObj.prototype.borrowGoods=function(billsId,flag,busOpr,hcTimeStr,ac_cc,callBack){
	$.request({
		type: 'Get',
		url: basePath+'/jxc/storage/storedprocedure/borrowGoods/'+ac_cc,
//		async: false,
		data:{billsId:billsId,flag:flag,busOpr:busOpr,hcTimeStr:hcTimeStr},
		dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
		success: callBack
	});	
},

/**
 * 借入归还 过账、红冲
 * @param callBack
 * @return
 */
StorageObj.prototype.borrowBackGoods=function(billsId,flag,busOpr,hcTimeStr,ac_cc,callBack){
	$.request({
		type: 'Get',
		url: basePath+'/jxc/storage/storedprocedure/borrowBackGoods/'+ac_cc,
//		async: false,
		data:{billsId:billsId,flag:flag,busOpr:busOpr,hcTimeStr:hcTimeStr},
		dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
		success: callBack
	});	
},

/**
 * 商品借出 过账、红冲
 * @param callBack
 * @return
 */
StorageObj.prototype.loanGoods=function(billsId,flag,busOpr,hcTimeStr,ac_cc,callBack){
	$.request({
		type: 'Get',
		url: basePath+'/jxc/storage/storedprocedure/loanGoods/'+ac_cc,
//		async: false,
		data:{billsId:billsId,flag:flag,busOpr:busOpr,hcTimeStr:hcTimeStr},
		dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
		success: callBack
	});	
},

/**
 * 借出还回 过账、红冲
 * @param callBack
 * @return
 */
StorageObj.prototype.loanBackGoods=function(billsId,flag,busOpr,hcTimeStr,ac_cc,callBack){
	$.request({
		type: 'Get',
		url: basePath+'/jxc/storage/storedprocedure/loanBackGoods/'+ac_cc,
//		async: false,
		data:{billsId:billsId,flag:flag,busOpr:busOpr,hcTimeStr:hcTimeStr},
		dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
		success: callBack
	});	
},

/**
 * 成本调整 过账、红冲
 * @param callBack
 * @return
 */
StorageObj.prototype.costAdjust=function(billsId,flag,busOpr,callBack){
	$.request({
		type: 'Get',
		url: basePath+'/jxc/storage/storedprocedure/costAdjust',
//		async: false,
		data:{billsId:billsId,flag:flag,busOpr:busOpr},
		dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
		success: callBack
	});	
},

/**
 * 借入转采购 过账、红冲
 * @param callBack
 * @return
 */
StorageObj.prototype.borrowSale=function(billsId,flag,busOpr,hcTimeStr,callBack){
	$.request({
		type: 'Get',
		url: basePath+'/jxc/storage/storedprocedure/borrowSale',
//		async: false,
		data:{billsId:billsId,flag:flag,busOpr:busOpr,hcTimeStr:hcTimeStr},
		dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
		success: callBack
	});	
},

/**
 * 借出转销售 过账、红冲
 * @param callBack
 * @return
 */
StorageObj.prototype.lendSale=function(billsId,flag,busOpr,hcTimeStr,callBack){
	$.request({
		type: 'Get',
		url: basePath+'/jxc/storage/storedprocedure/lendSale',
//		async: false,
		data:{billsId:billsId,flag:flag,busOpr:busOpr,hcTimeStr:hcTimeStr},
		dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
		success: callBack
	});	
},

/**
 * 打印
 */
jQuery.extend({ 
	//单据打印
	printBills:function(billsUrl,param){
		$.request({
			url: billsUrl,
			type : "post",
			dataType : 'html',
			data:param,
			success:function(data){
				//判断权限
				if(data.indexOf("对不起,您没有操作权限,请联系系统管理员!") > 0 )
				{
					$.zxsaas_plus.showalert("提示信息", "对不起,您没有操作权限,请联系系统管理员!");
					return false;
				}
				
				var html = null;
				$(data).map(function(index, obj){if((obj.nodeName == "DIV" || obj.nodeName == "div") && obj.id == "billsDIV")html = obj;});
				if(html == null){$.zxsaas_plus.showalert("","打印模板生成失败!");;return;}
				$(html.outerHTML).jqprint({
				     debug: false, //如果是true则可以显示iframe查看效果（iframe默认高和宽都很小，可以再源码中调大），默认是false
				     importCSS: true, //true表示引进原来的页面的css，默认是true。（如果是true，先会找$("link[media=print]")，若没有会去找$("link")中的css文件）
				     printContainer: true, //表示如果原来选择的对象必须被纳入打印（注意：设置为false可能会打破你的CSS规则）。
				     operaSupport: true//表示如果插件也必须支持歌opera浏览器，在这种情况下，它提供了建立一个临时的打印选项卡。默认是true
				});
			}
		});	
	},
	
	//根据单据状态给状态图片输值
	showBillsStatus:function(domId,status){
		 if(status == "1"){
			 //草稿
			 $("#"+domId).hide();
		 }else if(status == "2"){
			 //已审核
			 $("#"+domId).attr("src",basePath+"/images/status/statusAudit.png").show();
		 }else if(status == "3"){
			 //入库中
			 $("#"+domId).hide();
		 }else if(status == "4"){
			 //已完成
			 $("#"+domId).attr("src",basePath+"/images/status/statusComplete.png").show();
		 }else if(status == "5"){
			 //强制完成
			 $("#"+domId).attr("src",basePath+"/images/status/statusForce.png").show();
		 }else if(status == "6"){
			 //已过账
			 $("#"+domId).attr("src",basePath+"/images/status/statusPass.png").show();
		 }else if(status == "7"){
			 //已红冲
			 $("#"+domId).attr("src",basePath+"/images/status/statusRed.png").show();
		 }else if(status == "8"){
			 //已发货
			 $("#"+domId).attr("src",basePath+"/images/status/statusSend.png").show();
		 }else if(status == "9"){
			 //作废
			 $("#"+domId).attr("src",basePath+"/images/status/statusCancellation.png").show();
		 }else if(status == "10"){
			 //已接收
			 $("#"+domId).attr("src",basePath+"/images/status/statusReceive.png").show();
		 }else if(status == "11"){
			 //拒收
			 $("#"+domId).attr("src",basePath+"/images/status/statusRejection.png").show();
		 }else{
			 $("#"+domId).hide();
		 }
	},
	DateFormat:function()   
	{   //(new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423   
		//(new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18  
		var fmt = null;
		var date = null;
		if(arguments.length == 0){
			date = new Date();
			fmt = "yyyy-MM-dd hh:mm:ss.S";
		}
		if(arguments.length == 1){
			date = arguments[0];
			fmt = "yyyy-MM-dd hh:mm:ss.S";
		}
		if(arguments.length == 2){
			date = arguments[0];
			fmt = arguments[1];
		}
		var o = {   
		 "M+" : date.getMonth()+1,                 //月份   
		 "d+" : date.getDate(),                    //日   
		 "h+" : date.getHours(),                   //小时   
		 "m+" : date.getMinutes(),                 //分   
		 "s+" : date.getSeconds(),                 //秒   
		 "q+" : Math.floor((date.getMonth()+3)/3), //季度   
		 "S"  : date.getMilliseconds()             //毫秒   
		};   
		if(/(y+)/.test(fmt))   
		    fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));   
		for(var k in o)   
		    if(new RegExp("("+ k +")").test(fmt))   
		        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
		return fmt;   
	},
	ac_cc:function(data) {
		//判断权限
		if(data.desc != null) {
			$.zxsaas_plus.showalert("提示信息", data.desc);
			return true;
		}
	}
});

