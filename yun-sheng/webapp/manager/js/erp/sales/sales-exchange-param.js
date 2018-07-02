//获取保存参数
function getSaveParam(){
	try {MyEiditGrid.currEditDataGrid.unAllEdit();} catch (e) {}
	var param={};
	//单据表头
	param=$("#billsHeaderForm").toJsonObject();
	param.billsDate=$("#billsDate").val();
	param.billsStatus=1;
	param.billsType=type;
	param.billsAmount=parseFloat($("#dataGrid2").getCol('taxAmount',false,'sum'))-parseFloat($("#dataGrid").getCol('taxAmount',false,'sum'));
	param.discountedAmount=parseFloat($(options.TableName).getCol('discountedAmount',false,'sum'));
	param.billsDiscount=parseFloat($("#billsDiscount").val().replace(/\,/g, ""));
	param.prepaymentAmount=$("#prepaymentAmount").val().replace(/\,/g, "");
	delete param.managerUname;
	delete param.contactUnitName;
	delete param.yingshouAmount;
	delete param.yushouAmount;
	delete param.sectionName;
	delete param.billsCode;
	delete param.auditStatus;

		//收付款主表草稿表数据
		var paymentParam={};
		paymentParam.managersUid=param.managerUid;
		paymentParam.sectionId=param.sectionId;
		paymentParam.contactsunitId=param.contactsunitId;
		paymentParam.billsDate=param.billsDate;
		paymentParam.type=type;//销售单
		paymentParam.refMainTable="I_SALES_MAIN_DRAFT";
		paymentParam.amount=$("#prepaymentAmount").val().replace(/\,/g, "");
		param.payreceiptMainDraftData=paymentParam;
		//收付款明细表草稿表数据
		var payreceiptDetailDraftData =new Array();
		var detailDraftIds=$("#paymentWayModalGrid").getDataIDs();
		$.each(detailDraftIds, function (i,value) {
			var row = $("#paymentWayModalGrid").jqGrid('getRowData', value );
			if(row.payreceiptAmout!="0.00"){
				delete row["id"];
				delete row["accountTypeName"];
				delete row["accountName"];
				delete row["status"];
				payreceiptDetailDraftData.push(row);
			 }
		 });
		param.payreceiptDetailDraftData=payreceiptDetailDraftData;
	
	//表体数量存储-换入
	var ids=$("#dataGrid").getDataIDs();
	if(ids.length>0){
		var salesInstrorageNumDraftList=new Array();
		$.each(ids,function(i,value){
			var rowData = $("#dataGrid").jqGrid('getRowData', value);
			if(rowData.goodsNumber!=0){
				delete rowData["op"];
				delete rowData["storageName"];
				delete rowData["stockNum"];
				delete rowData["ifManageIMei"];
				delete rowData["ifEnableAuxliaryImei"];
				delete rowData["imeiLength"];
				delete rowData["auxliaryImeiLength"];
				deleteRelateGoodsColumn(rowData);
				//表体串号存储-换入
				if(rowData.salesInstrorageImDraftList=="" || rowData.salesInstrorageImDraftList==null || rowData.salesInstrorageImDraftList==undefined){
					delete rowData["salesInstrorageImDraftList"];
				}else{
					if(! jQuery.isArray(rowData.salesInstrorageImDraftList)){
						rowData.salesInstrorageImDraftList=JSON.parse(rowData.salesInstrorageImDraftList);
					}
				}
				salesInstrorageNumDraftList.push(rowData);
			}
		});
		if(salesInstrorageNumDraftList.length>0){
			param.salesInstrorageNumDraftList=salesInstrorageNumDraftList;
		}
	}
	
	//表体数量存储-换出
	var ids=$("#dataGrid2").getDataIDs();
	if(ids.length>0){
		var salesOutstrorageNumDraft=new Array();
		$.each(ids,function(i,value){
			var rowData = $("#dataGrid2").jqGrid('getRowData', value);
			if(rowData.goodsNumber!=0){
				delete rowData["op"];
				delete rowData["storageName"];
				delete rowData["stockNum"];
				delete rowData["ifManageIMei"];
				deleteRelateGoodsColumn(rowData);
				//表体串号存储-换出
				if(rowData.salesOutstrorageImDraftList=="" || rowData.salesOutstrorageImDraftList==null){
					delete rowData["salesOutstrorageImDraftList"];
				}else{
					if(! jQuery.isArray(rowData.salesOutstrorageImDraftList)){
						rowData.salesOutstrorageImDraftList=JSON.parse(rowData.salesOutstrorageImDraftList);
					}
				}
				salesOutstrorageNumDraft.push(rowData);
			}
		});
		
		if(salesOutstrorageNumDraft.length>0){
			param.salesOutstrorageNumDraft=salesOutstrorageNumDraft;
		}
	}
	return param;
}

//校验保存参数
function checkSaveParam(param){
	var flag=false;
	if(param.sectionId==""){
		$.zxsaas_plus.showalert("提示","部门名称不能为空!");
		flag=true;
		return flag;
	}
	if(param.contactsunitId==""){
		$.zxsaas_plus.showalert("提示","往来单位不能为空!");
		flag=true;
		return flag;
	}
	if(param.managerUid==""){
		$.zxsaas_plus.showalert("提示","经手人不能为空!");
		flag=true;
		return flag;
	}
	if(param.billsDate==""){
		$.zxsaas_plus.showalert("提示","单据日期不能为空!");
		flag=true;
		return flag;
	}
}

//填充页面数据
function fillPageData(row){
	row.billsDate = $.DateFormatFromTimestamp("yyyy-MM-dd",row.billsDate);
	row.billsDate == "1970-01-01" ? "":row.billsDate;
	$("#billsHeaderForm,#gridFooter").writeJson2Dom(row);
	getStorage(row.sectionId);
    getContactAmount(row.contactsunitId);
	$("#prepaymentAmount").val($.formatFloat(row.prepaymentAmount,2));
	$("#dataGrid").jqGrid("clearGridData");
	$("#dataGrid2").jqGrid("clearGridData");
	//表体数量-换入
	if(row.salesInstrorageNumList.length>0){
		$.each(row.salesInstrorageNumList,function(i,value){
            var addIndex=i+1;
			//表体串号-换入
			 if(value.salesInstrorageImDraftList!=null && value.salesInstrorageImDraftList.length>0){
				 value.salesInstrorageImDraftList=JSON.stringify(value.salesInstrorageImDraftList);
			 }
			 if(isDraft==1){
				 dataGrid.addRowData(addIndex,value);
				 allowEdit();
			 }else{
				 $("#dataGrid").jqGrid('addRowData', addIndex,value, 'last' );
				 forbiddenEdit();
			 }
            //添加串号图标
            if(value.ifManageIMei==1){
                $("#dataGrid").jqGrid('setCell', addIndex, "goodsNumber", '', 'ifManageImeiIcon');
            }
		});
	}else{
		if(isDraft==1){
			dataGrid.addKongRow();
		}
	}
	
	//表体数量-换出
	if(row.outStorageNumList.length>0){
		$.each(row.outStorageNumList,function(i,value){
            var addIndex=i+1;
			//表体串号-换出
			 if(value.salesOutstrorageImDraftList!=null && value.salesOutstrorageImDraftList.length>0){
				 value.salesOutstrorageImDraftList=JSON.stringify(value.salesOutstrorageImDraftList);
			 }
			 if(isDraft==1){
				 dataGrid2.addRowData(addIndex,value);
				 allowEdit();
			 }else{
				 $("#dataGrid2").jqGrid('addRowData',addIndex,value, 'last' );
				 forbiddenEdit();
			 }
		});
	}else{
		if(isDraft==1){
			dataGrid2.addKongRow();
		}
	}
	
	//回显单据收付款金额
	echoPaymentWayGrid(row.salesBillsAccount);
}