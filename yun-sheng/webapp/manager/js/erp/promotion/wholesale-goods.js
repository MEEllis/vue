/***
 * @author XiangRui
 * 零售促销单js
 */
var billsDao = new CbillsMain(basePath);

//加载完初始化
$(function(){
	
	initUI();
	initEvent();
	
	firstPage();
});

//初始化界面
function initUI(){
	
	//多选框
	$(".js-example-basic-multiple").select2({
		//data:data,
		'width': '400px',
		placeholder: "多选", //默认提示语
		//maximumSelectionLength: 3, //最多能够选择的个数
		language: "zh-CN"
	});

	initDataGrid1_1();
	initDataGrid1_2();
	initDataGrid4();
	initDataGrid5();
	
	wResize();
}

//改变UI状态
function changeUI(){
	var value = $("input[name='cxDateType']:checked").val();			
	$("#salesTimeSelects").prop({'disabled':true});
	$(".salesBox").prop({'disabled':true});	
	if(value == "2"){
		$("#salesTimeSelects").prop({'disabled':false});
	}else if(value == "3"){
		$(".salesBox").prop({'disabled':false});
	}
}

//事件
function initEvent(){	
	
	//日期选择
	$("#datetimepickerStart").datetimepicker({
		  lang:"ch",           //语言选择中文
	      format:"Y-m-d",      //格式化日期
	      timepicker:false,    //关闭时间选项
	      todayButton:false    //关闭选择今天按钮
	});
	$("#datetimepickerStart1").datetimepicker({
		  lang:"ch",           //语言选择中文
	      format:"Y-m-d",      //格式化日期
	      timepicker:false,    //关闭时间选项
	      todayButton:false    //关闭选择今天按钮
	});
	$("#datetimepickerEnd1").datetimepicker({
		  lang:"ch",           //语言选择中文
	      format:"Y-m-d",      //格式化日期
	      timepicker:false,    //关闭时间选项
	      todayButton:false    //关闭选择今天按钮
	});
	
	//促销日期类型事件  联动具体值
	$(".radio_sales").change(
			function(){
				changeUI();
			}
	);
	
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        // 获取已激活的标签页的名称
        var activeTab = $(e.target).text();
        //根据选择初始化相应的表格
       
    });
	
	$(window).resize(wResize);//注册窗口改变事件
}


//单据状态监听
function billsStautsListerning(bills){

	if(bills == null){
		$("#billsStautsImg1,#billsStautsImg2,#billsStautsImg3,#billsStautsImg4,#billsStautsImg5").hide();return;
	}
	/*
	 * judgeStatus exeuteStatus cancleStatus disableStatus
	 */
	if(bills.cancleStatus == 1){
		//作废
		$("#billsStautsImg1").attr("src",basePath+"/images/status/statusCancellation.png").show();;
	}else{
		$("#billsStautsImg1").hide();
	}
	if(bills.disableStatus == 1){
		//禁用
		$("#billsStautsImg2").attr("src",basePath+"/images/status/stop.png").show();;
	}else{
		$("#billsStautsImg2").hide();
	}
	if(bills.judgeStatus == 1){
		//审核
		$("#billsStautsImg3").attr("src",basePath+"/images/status/statusAudit.png").show();;
	}else{
		$("#billsStautsImg3").attr("src",basePath+"/images/status/statusNotAudit.png").show();;
	}
	
	//过期状态
	var currDate = new Date().getTime();
	if(currDate < bills.beginDate){
		$("#billsStautsImg4").attr("src",basePath+"/images/status/weishengxiao.png").show();;
	}else if(currDate >= bills.beginDate && currDate <= bills.endDate){
		$("#billsStautsImg4").attr("src",basePath+"/images/status/yishengxiao.png").show();;
	}else{
		$("#billsStautsImg4").attr("src",basePath+"/images/status/yishixiao.png").show();;
	}
	
	if(bills.exeuteStatus == 1){
		//执行
		$("#billsStautsImg5").attr("src",basePath+"/images/status/statusExecute.png").show();;
	}else{
		$("#billsStautsImg5").attr("src",basePath+"/images/status/statusNotExecute.png").show();;
	}
}


//窗口大小改变
function wResize(){
	var winH = $(window).height();//浏览器高度
	var winW = $(window).width();//浏览器宽度
	var centerH = winH - 500;//中部高度
	try {
		dataGrid1_1.$grid.setGridWidth($(window).width()-85); 
		dataGrid1_2.$grid.setGridWidth($(window).width()-85); 

		dataGrid1_1.$grid.setGridHeight(centerH-90);
		dataGrid1_2.$grid.setGridHeight(centerH-90);

		dataGrid1_1.$grid.closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" });
		dataGrid1_2.$grid.closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" });
	} catch (e) {
		// TODO: handle exception
	}

}

//保存按钮点击事件
function saveBtClick(){
	try {MyEiditGrid.currEditDataGrid.unAllEdit();} catch (e) {}
	
	var formData = {};
	
	var formObj1 = $("#form1").toJsonObject();
	var formObj2 = $("#form2").toJsonObject();
	if(formObj2.cxDateType == "2"){
		formObj2.cxDateValue = $("#salesTimeSelects").select2().val()==null?"":$("#salesTimeSelects").select2().val().join(",");
	}
	if(formObj2.cxDateType == "3"){
		formObj2.cxDateValue = $("input[name='cxDateValueForWeek']:checked").map(function(){return $(this).val();}).get().join(","); 
	}
	delete formObj2["cxDateValueForMonth"];
	delete formObj2["cxDateValueForWeek"];
	
	$.extend(formData,formObj1,formObj2);

	formData.wholesaleGoodsNumList = dataGrid1_1.getGridDataList();
	formData.wholesaleRangeDetailList = dataGrid1_2.getGridDataList();
	
	if(formData.wholesaleGoodsNumList.length == 0){
		$.MsgBox('错误提示','明细数据为空');return;
	}
	if(formData.wholesaleRangeDetailList.length == 0){
		$.MsgBox('错误提示','促销范围数据为空');return;
	}
	
	formData.billsCode = $.DateFormat();//假数据
	
	billsDao.saveWholesaleGoodsBills(formData, function(data){
		if(data.result == 1){
			$.MsgBox('提示','操作成功');
			firstPage();
		}else{
			$.MsgBox('出错提示',data.desc);
		}
	});
}

//新增按钮点击事件
function addBtClick(){
	$("#form1").writeJson2Dom({id: "", billsCode: "", planName: "", billsDate: "", beginDate: "", endDate: ""});
	$("#salesTime1").prop({'checked':true});
	$("#salesTimeSelects").prop({'disabled':true});
	$(".salesBox").prop({'disabled':true});	
	$("#salesClazz1").prop({'checked':true});
	$('.radio_Obj').prop('disabled',true);
	$('#salesObj2').prop({'checked':true,'disabled':false});
	$(".flag").prop({'checked':false});
	$("#salesTimeSelects").select2().val(null).trigger("change");
	$("#salesAreaSelects").select2().val(null).trigger("change");

	dataGrid1_1.clearDataGrid();dataGrid1_1.addKongRow();
	dataGrid1_2.clearDataGrid();dataGrid1_2.addKongRow();
}


//审核
function judgeBills(){
	var model = {'id':$("#form1").toJsonObject().id,'judgeStatus':'1'};
	if(model.id == "")return;
	
	billsDao.saveJudgeStatus(model, function(data){
		if(data.result == 1){
			$.MsgBox('提示','操作成功');
			queryPage();
		}else{
			$.MsgBox('出错提示',data.desc);
		}
	}, "pftjsp_audit");
}

//取消审核
function disJudgeBills(){
	var model = {'id':$("#form1").toJsonObject().id,'judgeStatus':'0'};
	if(model.id == "")return;
	
	billsDao.saveJudgeStatus(model, function(data){
		if(data.result == 1){
			$.MsgBox('提示','操作成功');
			queryPage();
		}else{
			$.MsgBox('出错提示',data.desc);
		}
	}, "pftjsp_audit");
}

//作废
function cancleBills(){
	var model = {'id':$("#form1").toJsonObject().id,'cancleStatus':'1'};
	if(model.id == "")return;
	
	billsDao.saveCancleStatus(model, function(data){
		if(data.result == 1){
			$.MsgBox('提示','操作成功');
			queryPage();
		}else{
			$.MsgBox('出错提示',data.desc);
		}
	}, "pftjsp_zf");
}

//恢复作废
function disCancleBills(){
	var model = {'id':$("#form1").toJsonObject().id,'cancleStatus':'0'};
	if(model.id == "")return;
	
	billsDao.saveCancleStatus(model, function(data){
		if(data.result == 1){
			$.MsgBox('提示','操作成功');
			queryPage();
		}else{
			$.MsgBox('出错提示',data.desc);
		}
	}, "pftjsp_zf");
}

//停用
function disableBills(){
	var model = {'id':$("#form1").toJsonObject().id,'disableStatus':'1'};
	if(model.id == "")return;

	billsDao.saveDisableStatus(model, function(data){
		if(data.result == 1){
			$.MsgBox('提示','操作成功');
			queryPage();
		}else{
			$.MsgBox('出错提示',data.desc);
		}
	}, "pftjsp_disabled");
}

//恢复停用（启用）
function enableBills(){
	var model = {'id':$("#form1").toJsonObject().id,'disableStatus':'0'};
	if(model.id == "")return;

	billsDao.saveDisableStatus(model, function(data){
		if(data.result == 1){
			$.MsgBox('提示','操作成功');
			queryPage();
		}else{
			$.MsgBox('出错提示',data.desc);
		}
	}, "pftjsp_disabled");
}



//表格是否数量控制改变事件

//表格是否数量控制改变事件
function changeNumControlFlag(obj){
	try {MyEiditGrid.currEditDataGrid.unAllEdit();} catch (e) {}
	var isSelect = $("#"+obj).is(':checked');
	var gridId = $("#"+obj).attr('gid');
	var rowId = $("#"+obj).attr('rowid');
	if($("#"+obj).is(':checked')){
		$("#"+gridId).jqGrid('setCell', rowId ,"cxNum" ,0);
		$("#"+gridId).setColProp("cxNum",{editable:true});
		$("#checkIm_"+gridId+"_"+rowId).prop({'disabled':false});
	}else{
		$("#"+gridId).jqGrid('setCell', rowId ,"cxNum" ,-1);
		$("#"+gridId).setColProp("cxNum",{editable:false});
		$("#checkIm_"+gridId+"_"+rowId).prop({'checked':false,'disabled':true});
	}
}

function changeImControlFlag(obj){
	try {MyEiditGrid.currEditDataGrid.unAllEdit();} catch (e) {}
	var isSelect = $("#"+obj).is(':checked');
	var gridId = $("#"+obj).attr('gid');
	var rowId = $("#"+obj).attr('rowid');
	if($("#"+obj).is(':checked')){
		$("#"+gridId).setColProp("cxNum",{editable:false});
	}else{
		$("#"+gridId).setColProp("cxNum",{editable:true});
	}
	$("#"+gridId).jqGrid('setCell', rowId ,"imeiList" ,"");
	$("#"+gridId).jqGrid('setCell', rowId ,"cxNum" ,0);
}


/*****************************表格1-1 开始*******************************/
/*****************************/

//初始化表格
var dataGrid1_1 = null;
function initDataGrid1_1(){
	//配置
	var paras = {
	    gridId:'dataGrid1_1', 
	    addRow:{goodsId:'',goodsCode:'',goodsName:'',goodsBrandName:'',stockNumber:'',numControlFlag:'',imControlFlag:'',cxNum:'',cxPrice:'',price:'',remark:''},
	    colNames:['商品ID','商品类别','商品编码','商品名称','商品品牌','现存量','数量控制','串号控制','促销数量','促销价','零售价','备注','串号管理','串号列表'], 
	    colModel:
    	[
          {name:'goodsId',index:'goodsId', width:10,align:'center',hidden:true},
          {name:'goodsCategoryName',index:'goodsCategoryName', width:200,align:'center'},
 		  {name:'goodsCode',index:'goodsCode', width:200,align:'center'},
 		  {name:'goodsName',index:'goodsName', width:200,align:'center',edittype:'custom_bt_input',custom_element_bt_click:"selectReferenceOpenForGrid1_2",editable:true}, 
 		  {name:'goodsBrandName',index:'goodsBrandName', width:100,align:'center'},
 		  {name:'stockNumber',index:'stockNumber', sorttype:'integer',formatter:'integer', width:100,align:'center'},
 		  {name:'numControlFlag',index:'numControlFlag', width:100,align:'center',edittype:'checkbox',formatter:formatterNumControlFlag},
 		  {name:'imControlFlag',index:'imControlFlag',  width:100,align:'center',formatter:formatterImControlFlag},
 		  {name:'cxNum',index:'cxNum', width:100,align:'center',sorttype:'integer',formatter:'integer',editable:true},
 		  {name:'cxPrice',index:'cxPrice', width:100,align:'center',  sorttype:'float',formatter:"currency",editable:true},
 		  {name:'price',index:'price', width:100,align:'center',  sorttype:'float',formatter:'currency'},
 		  {name:'remark',index:'remark', width:200,align:'center', sorttype:'string',editable:true},
          {name:'ifManageImei',index:'ifManageImei',hidden: true,editable:true,sortable: false},
          {name:'imeiList',index:'imeiList',hidden: true,editable:true,sortable: false}
        ]
	};
	//回调函数
	var callBackList = {
		onCellSelect:function(rowid,iCol,cellcontent,e){
			if(iCol == 10){
	    	  var currRow = $("#"+paras.gridId).jqGrid('getRowData', rowid);
	    	  if(currRow.goodsName == "" || currRow.cxSectionName == ""){
	    		  $.MsgBox("操作提示","请先选择门店和商品");
	    		  $("#"+paras.gridId).setColProp("cxNum",{editable:false});
	    		  return ;
	    	  }
			  var numControlFlag = $("#check_"+paras.gridId+'_'+rowid).is(':checked');
			  var imControlFlag = $("#checkIm_"+paras.gridId+'_'+rowid).is(':checked');
	    	  if(numControlFlag && imControlFlag){
	    		  $("#"+paras.gridId).setColProp("cxNum",{editable:false});
	    		  openInputImeiModal(paras.gridId,rowid);
	    	  }else if(numControlFlag && !imControlFlag){
	    		  $("#"+paras.gridId).setColProp("cxNum",{editable:true});
	    	  }else{
	    		  $("#"+paras.gridId).setColProp("cxNum",{editable:false});
	    	  }
			}
		},
		afterEditCell:function(rowid,name,val,iRow,iCol){//开始编辑
	 	
        },
        afterSaveCell:function(rowid,name,val,iRow,iCol){//保存编辑
  	 
        },
        summary:function(rowid,name,val,iRow,iCol){//统计处理
  	 	
        },
        getGridDataList:function(rows){
        	//筛出不合格行
        	return $.map(rows,function(row){
				if(row.goodsId != "" && row.cxPrice != "" ){
					row.numControlFlag = $("#check_"+row.gridId+'_'+row.rowId).is(':checked');
					row.imControlFlag = $("#checkIm_"+row.gridId+'_'+row.rowId).is(':checked');
					row.numControlFlag = (row.numControlFlag==true?1:0);
					row.imControlFlag = (row.imControlFlag==true?1:0);
					delete row["stockNumber"];
					delete row["price"];
					delete row["ifManageImei"];
					delete row["goodsCategoryName"];
					if(row.imControlFlag && row.imeiList != ""){
						row.wholesaleGoodsImList = JSON.parse(row.imeiList);
						delete row["imeiList"];
						return row;
					}else{
						delete row["imeiList"];
						return row;	
					}
				}
        	});
        }
	};
	dataGrid1_1 = new MyEiditGrid(paras,callBackList);

	//串号管理格式化
	function formatterImControlFlag(cellvalue, options, rowObject){
		if(cellvalue=="true" || rowObject.ifManageImei == "true" || rowObject.ifManageImei == true){
			return '<input type="checkbox" id="checkIm_'+options.gid+'_'+options.rowId+'" gid="'+options.gid+'" rowid="'+options.rowId+'" onchange="changeImControlFlag(this.id)">';;
		}else{
			return '<input type="checkbox" disabled="disabled">'; 
		}
	}
	//数量管理格式化
	function formatterNumControlFlag(cellvalue, options, rowObject){
		return '<input type="checkbox" id="check_'+options.gid+'_'+options.rowId+'" gid="'+options.gid+'" rowid="'+options.rowId+'" onchange="changeNumControlFlag(this.id)"  checked="checked">';
	}
}

/*****************************/
/*****************************表格1-1 结束*******************************/

function queryStorageNum(gridId,rowId,fieldName,isImei,paras){
	var url = this.basePath + '/IstockNum/listByModel';
	if(isImei == true){
		url = this.basePath + '/IstockIm/listByModel';	
	}
	$.ajax({
		url: url,
		type : "post",
		dataType : 'json',
		data:paras,
		success:function(data){
			if(data.result == 1){
				$("#"+gridId).jqGrid('setCell', rowId ,fieldName ,data.data.stockNum);
			}else{
				console.log(data);
			}
		}
	}); 
}

/*****************************表格1-2 开始*******************************/
/*****************************/

//初始化表格
var dataGrid1_2 = null;
function initDataGrid1_2(){
	//配置
	var paras = {
	    gridId:'dataGrid1_2', 
	    addRow:{contactsunitId:'',contactsunitCode:'',contactsunitName:'',contactsunitType:'',remark:''},
	    colNames:['往来单位ID','往来单位编码','往来单位名称','往来单位分类','往来单位分类','备注'], 
	    colModel:
    	[
          {name:'contactsunitId',index:'contactsunitId', width:10,align:'center',hidden:true},
 		  {name:'contactsunitCode',index:'contactsunitCode', width:200,align:'center'},
 		  {name:'contactsunitName',index:'contactsunitName', width:200,align:'center',edittype:'custom_bt_input',custom_element_bt_click:"selectContactUnitReferenceOpen",editable:true}, 
 		  {name:'contactsunitType',index:'contactsunitType', width:200,align:'center',hidden:false},
 		  {name:'contactsunitTypeName',index:'contactsunitTypeName', width:200,align:'center',hidden:true},
 		  {name:'remark',index:'remark', width:200,align:'center', sorttype:'string',editable:true}
        ]
	};
	//回调函数
	var callBackList = {
		afterEditCell:function(rowid,name,val,iRow,iCol){//开始编辑
	 	
        },
        afterSaveCell:function(rowid,name,val,iRow,iCol){//保存编辑
  	 
        },
        summary:function(rowid,name,val,iRow,iCol){//统计处理
  	 	
        },
        getGridDataList:function(rows){
        	//筛出不合格行
        	return $.map(rows,function(row){
				if(row.goodsId != "" && row.cxPrice != "" ){
					if(row.contactsunitId){
						delete row["contactsunitTypeName"];
						return row;
					}
				}
        	});
        }
	};
	dataGrid1_2 = new MyEiditGrid(paras,callBackList);

}

/*****************************/
/*****************************表格1-2 结束*******************************/


/*****************************引用 开始*******************************/
/*****************************/
var callBack ;

function selectReferenceOpenForGrid1_2(cellInfo){
	var gridId = cellInfo.gridId;
	var grid = $("#"+gridId);
	var rowid = cellInfo.rowId;
	var inptid = cellInfo.cellInputId;
	
	$('#goodsnameReferenceModal').modal('show');
	goodsnameReferenceFrame.reLoadGrid();//可以参数查询
	callBack = function(){
		if(arguments[0].length == 0){$('#goodsnameReferenceModal').modal('hide');return ;}
		var goods = arguments[0][0];
		try {
			
			//设置编辑器值
			$("#"+inptid).val(goods.name);
			grid.jqGrid('setCell', rowid ,"goodsId" ,goods.id);
			grid.jqGrid('setCell', rowid ,"goodsCode" ,goods.code);
			grid.jqGrid('setCell', rowid ,"goodsBrandName" ,goods.goodsBrandName);
			grid.jqGrid('setCell', rowid ,"ifManageImei" ,goods.ifManageImei);
			grid.jqGrid('setCell', rowid ,"imControlFlag" ,goods.ifManageImei);
			grid.jqGrid('setCell', rowid ,"goodsCategoryName" ,goods.goodsCategoryName);

			if(goods.ifManageImei == "true"){
				$("#checkIm_"+gridId+"_"+rowid).prop({'disabled':false});
				//查询库存
				queryStorageNum(gridId,rowid,"stockNumber",true,{companyId:campanyId,goodsId:goods.id});
			}else{
				$("#checkIm_"+gridId+"_"+rowid).prop({'checked':false,'disabled':true});
				//查询库存
				queryStorageNum(gridId,rowid,"stockNumber",false,{sectionId:sections[0],goodsId:goods.id});
			}
			
		} catch (e) {
			console.log(e);
		}
		$('#goodsnameReferenceModal').modal('hide');
		setTimeout('MyEiditGrid.getFocus('+'"#'+inptid+'")',200);
	}; 
}

//打开往来单位引用对话框
function selectContactUnitReferenceOpen(cellInfo){
	var gridId = cellInfo.gridId;
	var grid = $("#"+gridId);
	var rowid = cellInfo.rowId;
	var inptid = cellInfo.cellInputId;
	
	$('#contactUnitReferenceModal').modal('show');
	callBack = function(){
		if(arguments[0].length == 0){
			$.MsgBox('提示消息',"未选中任何行");
			$('#contactUnitReferenceModal').modal('hide');
			return ;
		}
		var contactUnit = arguments[0][0];

		//设置编辑器值
		$("#"+inptid).val(contactUnit.name);
		grid.jqGrid('setCell', rowid ,"contactsunitId" ,contactUnit.id);
		grid.jqGrid('setCell', rowid ,"contactsunitCode" ,contactUnit.code);
		//grid.jqGrid('setCell', rowid ,"contactsunitType" ,contactUnit.typeId);
		grid.jqGrid('setCell', rowid ,"contactsunitType" ,contactUnit.typeName);
		
		$('#contactUnitReferenceModal').modal('hide');
		setTimeout('MyEiditGrid.getFocus('+'"#'+inptid+'")',200);
	}; 
}
/*****************************/
/*****************************引用 结束*******************************/

/**********************串号引入表格 开始******************************************/
//打开串号引入对话框
function openInputImeiModal(gridId,rowid){
	if($("#slideThree").is(':checked'))return;
	try {MyEiditGrid.currEditDataGrid.unAllEdit();} catch (e) {}
	$('#inputStorageImeiModal').modal('show');
	$("#dataGridRowId2").val(gridId+"|"+rowid);
	
	var currRow = $("#"+gridId).jqGrid('getRowData', rowid);
	$("#goodsnameTitle2").html(currRow.goodsName);
	$("#storagenameTitle2").html(currRow.storageName);
	
	
	setDataGrid4();
	setDataGrid5(); 

	var width = $(window).width()*0.8;
		
	$("#inputStorageImeiModal_grid4").width((width-300)/2);
	$("#inputStorageImeiModal_grid5").width((width-300)/2);
	
	$("#dataGrid5").setGridWidth((width-300)/2);  
	$("#dataGrid5").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
	$("#dataGrid4").setGridWidth((width-300)/2);  
	$("#dataGrid4").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
	
	$("#dataGrid5").setGridHeight(300);
	$("#dataGrid4").setGridHeight(300);
	$("#inputStorageImeiModal_info_text").height(300);
	
	longInfo = 0;
	$("#inputStorageImeiModal_info_text").val("");
}

//点击保存引入串号事件
function saveInputImei(){
	if($('#havedInputNum').html() == "0"){
		return;
	}
	try {MyEiditGrid.currEditDataGrid.unAllEdit();} catch (e) {}
	var gridId = $("#dataGridRowId2").val().split("|")[0] ;
	var rowid = parseInt($("#dataGridRowId2").val().split("|")[1]) ;
	var objs = getObjListFromGrid5();
	
	$("#"+gridId).jqGrid('setCell', rowid ,"cxNum" ,objs.length);
	$("#"+gridId).jqGrid('setCell', rowid ,"imeiList" ,JSON.stringify(objs));

	$('#inputStorageImeiModal').modal('hide');
	Summary();

}

//获取串号引入对象数组
function getObjListFromGrid5(){
    return dataGrid5.getGridDataList();
}

var longInfo = 0;
//移入所有按钮点击事件
function inAllBtClick(){
	var ids=$.map( $("#dataGrid4").jqGrid('getDataIDs'), function(obj){return parseInt(obj);});
	for ( var int = 0; int < ids.length; int++) {
		var row =  $("#dataGrid4").jqGrid('getRowData', ids[int] );
		if(! _.isEqual(row,{})){
			longInfo = longInfo + 1;
			$("#dataGrid5").jqGrid('addRowData',MyEiditGrid.getMaxRowid($("#dataGrid5"))+1,row);
			$("#dataGrid4").jqGrid("delRowData", ids[int] ); 
			$("#inputStorageImeiModal_info_text").val($("#inputStorageImeiModal_info_text").val()+(longInfo)+"、串号"+row.imei+"录入\r\n");
		}
	}
	$("#havedInputNum").html($("#dataGrid5").jqGrid('getDataIDs').length);
}

//移出所有按钮点击事件
function outAllBtClick(){
	var ids=$.map( $("#dataGrid5").jqGrid('getDataIDs'), function(obj){return parseInt(obj);});
	for ( var int = 0; int < ids.length; int++) {
		var row =  $("#dataGrid5").jqGrid('getRowData',  ids[int] );
		if(! _.isEqual(row,{})){
			longInfo = longInfo + 1;
			$("#dataGrid4").jqGrid('addRowData',MyEiditGrid.getMaxRowid($("#dataGrid4"))+1,row);
			$("#dataGrid5").jqGrid("delRowData", ids[int] ); 
			$("#inputStorageImeiModal_info_text").val($("#inputStorageImeiModal_info_text").val()+(longInfo)+"、串号"+row.imei+"移除\r\n");
		}
	}	
	$("#havedInputNum").html($("#dataGrid5").jqGrid('getDataIDs').length);
}

//移入按钮点击事件
function inBtClick(){
	var ids=$.map( $("#dataGrid4").jqGrid('getGridParam','selarrrow'), function(obj){return parseInt(obj);});
	for ( var int = 0; int < ids.length; int++) {
		var row =  $("#dataGrid4").jqGrid('getRowData', ids[int] );
		if(! _.isEqual(row,{})){
			$("#dataGrid5").jqGrid('addRowData',MyEiditGrid.getMaxRowid($("#dataGrid5"))+1,row);
			$("#dataGrid4").jqGrid("delRowData", ids[int] ); 
		}
	}
	$("#havedInputNum").html($("#dataGrid5").jqGrid('getDataIDs').length);
}

//移出按钮点击事件
function outBtClick(){
	var ids=$.map( $("#dataGrid5").jqGrid('getGridParam','selarrrow'), function(obj){return parseInt(obj);});
	for ( var int = 0; int < ids.length; int++) {
		var row =  $("#dataGrid5").jqGrid('getRowData',  ids[int] );
		if(! _.isEqual(row,{})){
			$("#dataGrid4").jqGrid('addRowData',MyEiditGrid.getMaxRowid($("#dataGrid4"))+1,row);
			$("#dataGrid5").jqGrid("delRowData", ids[int] ); 
		}
	}	
	$("#havedInputNum").html($("#dataGrid5").jqGrid('getDataIDs').length);
}

//初始化表格
var dataGrid4 = null;
function initDataGrid4(){
	 var paras = {
		    gridId:'dataGrid4', 
		    addRow:{imei:'',auxiliaryImei:'',remark:''},
		    multiselect : true,
		    noShowOp:false,
		    colNames:['串号',  '成本', '辅助串号'], 
		    colModel:
		    	[ 
                 {name : 'imei',index : 'imei',align:'left',sortable: true,hidden: false,editable:false}, 
                 {name : 'costPrice',index : 'costPrice',align:'left',editable:false,sortable: false},
                 {name : 'auxiliaryImei',index : 'auxiliaryImei',align:'left',sortable: false}
	           ]
	 };
	 var callBackList = {
		afterEditCell:function(rowid,name,val,iRow,iCol){},
        afterSaveCell:function(rowid,name,val,iRow,iCol){},
        summary:function(rowid,name,val,iRow,iCol){},
        getGridDataList:function(rows){
        	//筛出不合格行
        	return $.map(rows,function(row){
				if(row.imei != ""){
		        	return row;
				}
        	});
        }
	 };
	 dataGrid4 = new MyEiditGrid(paras,callBackList);
}

//去库存表查询串号
function setDataGrid4(){
	//清空
	$("#dataGrid4").jqGrid('clearGridData');
	var gridId = $("#dataGridRowId2").val().split("|")[0] ;
	var rowid = parseInt($("#dataGridRowId2").val().split("|")[1]) ;
	var currRow = $("#"+gridId).jqGrid('getRowData', rowid);
	
	//查询串号库存
	$.ajax({
			url: this.basePath + '/IstockIm/listByModel',
			type : "post",
			dataType : 'json',
			data:{sectionId:currRow.cxSectionId,goodsId:currRow.goodsId},
			success:function(data){
				if(data.result == 1){
					$.each(data.data.dataList,function(i,item){
						if(!isHaveInput(item.imei)){
							$("#dataGrid4").jqGrid('addRowData',i,item);
						}
					});
					$("#"+gridId).jqGrid('setCell', rowid ,"stockNumber" ,data.data.dataList.length);
				}else{
					$.MsgBox('出错提示',data.desc);
				}
			}
	}); 
	function isHaveInput(imei){
		if("" != currRow.imeiList){
			  var imList = JSON.parse(currRow.imeiList);
			  for ( var int = 0; int < imList.length; int++) {
				  if(imList[int].imei == imei){
					  return true;
				  }
			  }
		}
		return false;
	}
	
}
//初始化表格
var dataGrid5 = null;
function initDataGrid5(){
	
	 var paras = {
		    gridId:'dataGrid5', 
		    addRow:{imei:'',auxiliaryImei:'',remark:''},
		    multiselect : true,
		    noShowOp:false,
		    colNames:['串号',  '辅助串号', '备注' ,'成本'],
		    colModel:
		    	[ 
                 {name : 'imei',index : 'imei',align:'left',sortable: true,hidden: false,editable:false}, 
                 {name : 'auxiliaryImei',index : 'auxiliaryImei',align:'left',sortable: false},
                 {name : 'remark',index : 'remark',align:'left',editable:true,sortable: false},
                 {name : 'costPrice',index : 'costPrice',align:'left',editable:false,sortable: false,hidden: true}
	           ]
	 };
	 var callBackList = {
		afterEditCell:function(rowid,name,val,iRow,iCol){},
        afterSaveCell:function(rowid,name,val,iRow,iCol){},
        summary:function(rowid,name,val,iRow,iCol){},
        getGridDataList:function(rows){
        	//筛出不合格行
        	return $.map(rows,function(row){
	        	delete row["costPrice"];
	        	delete row["index"];
	        	return row;
        	});
        }
	 };
	 dataGrid5 = new MyEiditGrid(paras,callBackList);
	 
}

function setDataGrid5(){
	//清空
	$("#dataGrid5").jqGrid('clearGridData');
	var gridId = $("#dataGridRowId2").val().split("|")[0] ;
	var rowid = parseInt($("#dataGridRowId2").val().split("|")[1]) ;
	var currRow = $("#"+gridId).jqGrid('getRowData', rowid);
	if("" != currRow.imeiList){
		  var imList = JSON.parse(currRow.imeiList);  
		  $("#havedInputNum").html(imList.length);
		  $.each(imList,function(i,obj){
			  $("#dataGrid5").jqGrid('addRowData',i,obj);
		  });
	}else{
		$("#havedInputNum").html(0);
	}

}

/**********************串号引入表格 结束******************************************/


/*************************分页 S******************************/

var pageIndex = 1;//页码
var pageSize =  1;//页大小
var pageCount = 1;//页码大小
var currPage = null;//当前页数据

//首页
function firstPage(){
	pageIndex = 1;
	queryPage();
}
//下一页
function nextPage(){
	if((pageIndex + 1) > pageCount){
		$.MsgBox('消息提示','已是最后一条单据');
		return;
	}
	pageIndex = pageIndex + 1;
	queryPage();
}
//上一页
function backPage(){
	if((pageIndex - 1) == 0){
		$.MsgBox('消息提示','已是第一条单据');
		return;
	}
	pageIndex = pageIndex - 1;
	queryPage();
}
//末页
function lastPage(){
	pageIndex = pageCount;
}

//分页查询
function queryPage(){
	
	//获取查询参数
	//************
	var model = {};
	model.page = pageIndex;
	model.rows = pageSize;
	model.billsType = "43";//批发特价单
	
	//后台查询
	$.ajax({
		url: this.basePath + '/CbillsMain/page/pftjsp_query',
		type : "post",
		dataType : 'json',
		data:model,
		success:function(result){
			if(result.result == 1){
				pageCount = result.data.total;
				if(result.data.rows.length>0){
					initPageData(result.data.rows[0]);
				}else{
					addBtClick();
				}
			}else{
				$.MsgBox("错误提示",result.desc);
			}
		}
	});  
}

//填充页面页面数据
function initPageData(bills){
	var formObj = bills;
	$("#salesTimeSelects").select2().val(null).trigger("change");
	
	//格式化数据
	formObj.billsDate = $.DateFormatFromTimestamp("yyyy-MM-dd",formObj.billsDate);
	formObj.beginDate = $.DateFormatFromTimestamp("yyyy-MM-dd",formObj.beginDate);
	formObj.endDate = $.DateFormatFromTimestamp("yyyy-MM-dd",formObj.endDate);
	$.showBillsStatus("billsStautsImg",bills.billsStatus);
	
	//设置表单数据
	$("#form1").writeJson2Dom(formObj);
	$("#form2").writeJson2Dom(formObj);
	
	//促销时段
	if(bills.cxDateType == "1"){
		//...
	}else if(bills.cxDateType == "2"){
		try {
			$("#salesTimeSelects").select2().val(bills.cxDateValue.split(",")).trigger("change");
		} catch (e) {
		}
	}
	
	dataGrid1_1.clearDataGrid();
	dataGrid1_2.clearDataGrid();
	
	//设置明细数据
	var mingxiList1 = bills.wholesaleGoodsNumList;
	for ( var int = 0; int < mingxiList1.length; int++) {
		var row = mingxiList1[int];
		row.index = int + 1;
		row.op = "";
		//插入空数据的1行
		dataGrid1_1.addRowData(int,row);
	}
	var mingxiList2 = bills.wholesaleRangeDetailList;
	for ( var int = 0; int < mingxiList2.length; int++) {
		var row = mingxiList2[int];
		row.index = int + 1;
		row.op = "";
		//插入空数据的1行
		dataGrid1_2.addRowData(int,row);
	}	
	
	//改变控件状态
	changeUI();

	billsStautsListerning(bills);
};
/*************************分页 E******************************/