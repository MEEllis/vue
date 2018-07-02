//隐藏单据列表对应的字段
function hideBillsColumn(data,options){
	var billsType=data.data.billsType;
	if(billsType=="1"){//采购订单列表
		$(options.TableName).setGridParam().hideCol("inDepartmentName");
		$(options.TableName).setGridParam().hideCol("outDepartmentName");
		$(options.TableName).setGridParam().hideCol("inStorageName");
		$(options.TableName).setGridParam().hideCol("outStorageName");
		
		$(options.TableName).setGridParam().hideCol("billsAmount");
		$(options.TableName).setGridParam().hideCol("billsDiscount");
		$(options.TableName).setGridParam().hideCol("payableAmount");
		$(options.TableName).setGridParam().hideCol("amount");
		$(options.TableName).setGridParam().hideCol("unpaidAmount");
		
		$(options.TableName).setGridParam().hideCol("postByName");
		$(options.TableName).setGridParam().hideCol("postDate");
		$(options.TableName).setGridParam().hideCol("invalidByName");
		$(options.TableName).setGridParam().hideCol("invalidDate");
		
		$(options.TableName).setGridParam().hideCol("cancelByName");
		$(options.TableName).setGridParam().hideCol("cancelDate");
		$(options.TableName).setGridParam().hideCol("receiveByName");
		$(options.TableName).setGridParam().hideCol("receiveDate");
		$(options.TableName).setGridParam().hideCol("rejectionByName");
		$(options.TableName).setGridParam().hideCol("rejectionDate");
		$(options.TableName).setGridParam().hideCol("rejectionCause");
	}
	
   if(billsType==2 || billsType==3 || billsType==4){//采购入库单列表、采购换货单列表、采购退货单列表
	    $(options.TableName).setGridParam().hideCol("inDepartmentName");
		$(options.TableName).setGridParam().hideCol("outDepartmentName");
		$(options.TableName).setGridParam().hideCol("inStorageName");
		$(options.TableName).setGridParam().hideCol("outStorageName");
	   
	    $(options.TableName).setGridParam().hideCol("orderNum");
		$(options.TableName).setGridParam().hideCol("reviewsNum");
		$(options.TableName).setGridParam().hideCol("introduceNum");
		$(options.TableName).setGridParam().hideCol("notIntroduceNum");
		$(options.TableName).setGridParam().hideCol("orderAmount");
		$(options.TableName).setGridParam().hideCol("reviewsAmount");
		$(options.TableName).setGridParam().hideCol("introduceAmount");
		
		$(options.TableName).setGridParam().hideCol("auditor");
		$(options.TableName).setGridParam().hideCol("reviewsDate");
		$(options.TableName).setGridParam().hideCol("forceFinishedName");
		$(options.TableName).setGridParam().hideCol("forceFinishedDate");
		
		$(options.TableName).setGridParam().hideCol("cancelByName");
		$(options.TableName).setGridParam().hideCol("cancelDate");
		$(options.TableName).setGridParam().hideCol("receiveByName");
		$(options.TableName).setGridParam().hideCol("receiveDate");
		$(options.TableName).setGridParam().hideCol("rejectionByName");
		$(options.TableName).setGridParam().hideCol("rejectionDate");
		$(options.TableName).setGridParam().hideCol("rejectionCause");
   }
   
   //受托入库单列表、受托退货单列表、其它入库单列表、其它出库单列表、商品借入单列表、借入归还单列表、商品借出单列表、借出还回单列表
   if(billsType==5 || billsType==6 || billsType==9 || billsType==10 || billsType==12 || billsType==13 || billsType==14 || billsType==15){
	    $(options.TableName).setGridParam().hideCol("inDepartmentName");
		$(options.TableName).setGridParam().hideCol("outDepartmentName");
		$(options.TableName).setGridParam().hideCol("inStorageName");
		$(options.TableName).setGridParam().hideCol("outStorageName");
	   
	    $(options.TableName).setGridParam().hideCol("billsDiscount");
		$(options.TableName).setGridParam().hideCol("payableAmount");
		$(options.TableName).setGridParam().hideCol("amount");
		$(options.TableName).setGridParam().hideCol("unpaidAmount");
		
		$(options.TableName).setGridParam().hideCol("orderNum");
		$(options.TableName).setGridParam().hideCol("reviewsNum");
		$(options.TableName).setGridParam().hideCol("introduceNum");
		$(options.TableName).setGridParam().hideCol("notIntroduceNum");
		$(options.TableName).setGridParam().hideCol("orderAmount");
		$(options.TableName).setGridParam().hideCol("reviewsAmount");
		$(options.TableName).setGridParam().hideCol("introduceAmount");
		
		$(options.TableName).setGridParam().hideCol("auditor");
		$(options.TableName).setGridParam().hideCol("reviewsDate");
		$(options.TableName).setGridParam().hideCol("forceFinishedName");
		$(options.TableName).setGridParam().hideCol("forceFinishedDate");
		
		$(options.TableName).setGridParam().hideCol("cancelByName");
		$(options.TableName).setGridParam().hideCol("cancelDate");
		$(options.TableName).setGridParam().hideCol("receiveByName");
		$(options.TableName).setGridParam().hideCol("receiveDate");
		$(options.TableName).setGridParam().hideCol("rejectionByName");
		$(options.TableName).setGridParam().hideCol("rejectionDate");
		$(options.TableName).setGridParam().hideCol("rejectionCause");
   }
   
   if(billsType==7 || billsType==8){//同价调拨发货单列表、变价调拨发货单列表
	    $(options.TableName).setGridParam().hideCol("sectionName");
	    $(options.TableName).setGridParam().hideCol("inStorageName");
		$(options.TableName).setGridParam().hideCol("outStorageName");
		$(options.TableName).setGridParam().hideCol("contactUnitName");
		
		$(options.TableName).setGridParam().hideCol("billsDiscount");
		$(options.TableName).setGridParam().hideCol("payableAmount");
		$(options.TableName).setGridParam().hideCol("amount");
		$(options.TableName).setGridParam().hideCol("unpaidAmount");
		
		$(options.TableName).setGridParam().hideCol("orderNum");
		$(options.TableName).setGridParam().hideCol("reviewsNum");
		$(options.TableName).setGridParam().hideCol("introduceNum");
		$(options.TableName).setGridParam().hideCol("notIntroduceNum");
		$(options.TableName).setGridParam().hideCol("orderAmount");
		$(options.TableName).setGridParam().hideCol("reviewsAmount");
		$(options.TableName).setGridParam().hideCol("introduceAmount");
		
		$(options.TableName).setGridParam().hideCol("auditor");
		$(options.TableName).setGridParam().hideCol("reviewsDate");
		$(options.TableName).setGridParam().hideCol("forceFinishedName");
		$(options.TableName).setGridParam().hideCol("forceFinishedDate");
		
		$(options.TableName).setGridParam().hideCol("invalidByName");
		$(options.TableName).setGridParam().hideCol("invalidDate");
   }
   
   if(billsType==11){//商品移库单列表
		$(options.TableName).setGridParam().hideCol("inDepartmentName");
		$(options.TableName).setGridParam().hideCol("outDepartmentName");
		$(options.TableName).setGridParam().hideCol("contactUnitName");
		
		$(options.TableName).setGridParam().hideCol("billsAmount");
		$(options.TableName).setGridParam().hideCol("billsDiscount");
		$(options.TableName).setGridParam().hideCol("payableAmount");
		$(options.TableName).setGridParam().hideCol("amount");
		$(options.TableName).setGridParam().hideCol("unpaidAmount");
		
		$(options.TableName).setGridParam().hideCol("orderNum");
		$(options.TableName).setGridParam().hideCol("reviewsNum");
		$(options.TableName).setGridParam().hideCol("introduceNum");
		$(options.TableName).setGridParam().hideCol("notIntroduceNum");
		$(options.TableName).setGridParam().hideCol("orderAmount");
		$(options.TableName).setGridParam().hideCol("reviewsAmount");
		$(options.TableName).setGridParam().hideCol("introduceAmount");
		
		$(options.TableName).setGridParam().hideCol("auditor");
		$(options.TableName).setGridParam().hideCol("reviewsDate");
		$(options.TableName).setGridParam().hideCol("forceFinishedName");
		$(options.TableName).setGridParam().hideCol("forceFinishedDate");
		
		$(options.TableName).setGridParam().hideCol("cancelByName");
		$(options.TableName).setGridParam().hideCol("cancelDate");
		$(options.TableName).setGridParam().hideCol("receiveByName");
		$(options.TableName).setGridParam().hideCol("receiveDate");
		$(options.TableName).setGridParam().hideCol("rejectionByName");
		$(options.TableName).setGridParam().hideCol("rejectionDate");
		$(options.TableName).setGridParam().hideCol("rejectionCause");
   }
}