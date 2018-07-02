
//初始化
$(function(){
	initUI();//初始化UI
	initGrid();//初始化表格
	initDataGrid2();
	initEvents();//初始化事件
})

//初始化UI
function initUI(){
	
	//初始化日期控件
	$("#billsDateBegin").val($.DateFormat($.getCurrentMonthFirst(),"yyyy-MM-dd"));
	$("#billsDateEnd").val($.DateFormat($.getCurrentMonthLast(),"yyyy-MM-dd"));
	
	$("#billsDateBegin").datetimepicker({
		  lang:"ch",           //语言选择中文
	      format:"Y-m-d",      //格式化日期
	      timepicker:false,    //关闭时间选项
	      todayButton:false    //关闭选择今天按钮
	});
	$("#billsDateEnd").datetimepicker({
		  lang:"ch",           //语言选择中文
	      format:"Y-m-d",      //格式化日期                 
	      timepicker:false,    //关闭时间选项
	      todayButton:false    //关闭选择今天按钮
	});
	
	$('option[name="'+billsQZ+'"]').prop('disabled','true');
	$('option[name="'+defaultSelectBillsQZ+'"]').prop('selected','selected');
}

//初始化事件
function initEvents(){
	
	//注册窗口改变事件
	$(window).resize(wResize);
	wResize();
}

//窗口大小改变
function wResize(){
	$("#dataGrid").setGridHeight($(window).height()*0.4);
	$("#dataGrid").setGridWidth($(window).width()-30); 
	$("#dataGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
	$("#dataGrid2").setGridHeight($(window).height()*0.4);
	$("#dataGrid2").setGridWidth($(window).width()-30); 
	$("#dataGrid2").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
}

//返回选中引入的单据
function sendDataToParentPage(){
	var row;
	try {
		if(arguments.length == 1){
			row = arguments[0];
		}else{
			var ids=$('#dataGrid').jqGrid('getGridParam','selarrrow');
			if(ids.length>1 || ids.length<1){
			  $.MsgBox('操作提示','请选中一行数据');
			  row = [];
			}else{
			  row = $("#dataGrid").jqGrid('getRowData', ids[0]);
			}
		}
		row.detailList = JSON.parse(row.detailList);
		for ( var int = 0; int < row.detailList.length; int++) {
			var rowObj = row.detailList[int];
			for ( var int2 = 0; int2 < rowObj.imeiList.length; int2++) {
				var row2Obj = rowObj.imeiList[int2];
				delete row2Obj["outstroNumberId"];
				delete row2Obj["billsMainId"];
				delete row2Obj["billsImId"];
				delete row2Obj["createDate"];
				delete row2Obj["createDateString"];
				delete row2Obj["createBy"];
				delete row2Obj["id"];
				delete row2Obj["lastupdateDateString"];
				delete row2Obj["remark"];
				delete row2Obj["goodsName"];
				delete row2Obj["storageName"];
			}
		}
		parent.callBack(row);
	} catch (e) {
		console.log(e);
	}
}

//取消引用
function cancleSelect(){
	try {
		parent.callBack([]);
	} catch (e) {
		console.log(e);
	}
}

/****************************************** 单据主表 开始********************************************************/
//初始化表格
function initGrid(){
	function formatterDetailList(cellvalue, options, rowObject){
		
		return JSON.stringify(cellvalue);
	}
	function formatterDate(cellvalue, options, rowObject){
		var date = new Date();
		date.setTime(cellvalue);
		return $.DateFormat(date,"yyyy-MM-dd");
	}
	function formatterTime(cellvalue, options, rowObject){
		var date = new Date();
		date.setTime(cellvalue);
		return $.DateFormat(date,"yyyy-MM-dd hh:mm:ss");
	}
	//配置
	var paras = {
	    gridId:'dataGrid', 
	    pageUrl:basePath + '/BillsImport/page',
	    colNames:['单据编号','单据日期','部门名称','部门名称','经办人','经办人','往来单位','往来单位','单据金额','折后金额','新增人','新增人','新增时间','过账人','过账人','过账时间','备注','明细'], 
	    colModel:
    	[
          {name:'billsCode',index:'INDEX', align:'center',sortable: false},
 		  {name:'billsDate',index:'TICKET_CODE', width:120,fixed:true,align:'center',formatter:formatterDate,sortable: false},
 		  {name:'sectionId',index:'TICKET_NAME', width:100,align:'center',hidden:true,sortable: false}, 
 		  {name:'sectionName',index:'TICKET_TYPE', width:100,align:'center',sortable: false},
 		  {name:'managersUid',index:'TICKET_AMOUNT', width:100,align:'center',hidden:true,sortable: false},
 		  {name:'managersName',index:'TICKET_AMOUNT', width:100,align:'center',sortable: false},
 		  {name:'contactsunitId',index:'TICKET_AMOUNT', width:100,align:'center',hidden:true,sortable: false},
 		  {name:'contactsunitName',index:'TICKET_AMOUNT', width:100,align:'center',sortable: false},
 		  {name:'billsAmount',index:'TICKET_AMOUNT', width:100,align:'center',sortable: false},
 		  {name:'billsDiscount',index:'TICKET_AMOUNT', width:100,align:'center',sortable: false},
 		  {name:'createBy',index:'TICKET_AMOUNT', width:100,align:'center',hidden:true,sortable: false},
 		  {name:'createByName',index:'TICKET_AMOUNT', width:100,align:'center',sortable: false},
 		  {name:'createDate',index:'TICKET_AMOUNT', width:100,align:'center',formatter:formatterTime,sortable: false},
 		  {name:'postBy',index:'TICKET_AMOUNT', width:100,align:'center',hidden:true,sortable: false},
 		  {name:'postByName',index:'TICKET_AMOUNT', width:100,align:'center',sortable: false},
 		  {name:'postDate',index:'TICKET_AMOUNT', width:100,align:'center',formatter:formatterTime,sortable: false},
		  {name:'remark',index:'remark', width:100,align:'center',sortable: false},
		  {name:'detailList',index:'detailList', width:100,align:'center',sortable: false,hidden:true,formatter:formatterDetailList}
        ]
	};
	$("#"+paras.gridId).jqGrid({
		url: paras.pageUrl,
        datatype : "json",
        colNames : paras.colNames,  
        colModel : paras.colModel,
        styleUI: 'Bootstrap',
        pager : '#jqGridPager',
        jsonReader: { root: "data.rows", total: "data.total",records: "data.records",repeatitems: false},
        mtype: "POST",
        rownumbers:true,
        viewrecords : true,
        multiselect : true,
        multiboxonly : true,
        caption : "",
        rowNum : 5,
        autowidth:true,
        onSortCol:function(index,iCol,sortorder){
//        	var postData = $("#"+paras.gridId).jqGrid("getGridParam", "postData");
//        	postData.sortColumns = index + " " + sortorder;
//        	$("#"+paras.gridId).jqGrid("setGridParam", "postData",postData);
		},
		ondblClickRow:function(rowid,iRow,iCol,e){
			var currRow = $("#"+paras.gridId).jqGrid('getRowData', rowid);
			//sendDataToParentPage(currRow);
		},
		onCellSelect:function(rowid,iCol,cellcontent,e){
			dataGrid2.$grid.jqGrid('clearGridData');
			var currRow = $("#"+paras.gridId).jqGrid('getRowData', rowid);
			showDetailList(JSON.parse(currRow.detailList));
		},
        postData:getQueryModel(),
        loadComplete:function(data){
			$("#loadingDiv").hide();
        	try {
				if(data.result == 1){
					wResize();
				}else{
					$.MsgBox('出错提示',data.desc);
				}
			} catch (e) {
				console.log(e);
			}
        }
      });
}

//获取分页查询参数
function getQueryModel(){
	try {
		var contt = parent.getSection();
		$("input[name='sectionName']").val(contt.sectionName);
		$("input[name='sectionId']").val(contt.sectionId);
	} catch (e) {
	}
	
//	var postData = $("#dataGrid").jqGrid("getGridParam", "postData");
//    $.each(postData, function (k, v) {
//        delete postData[k];
//    });
    var model = $("#topForm").toJsonObject();
    model.billsDateBegin = model.billsDateBegin + " 00:00:00";
    model.billsDateEnd = model.billsDateEnd + " 23:59:59";

    if(model == "")return;

	return model;
}

//重新加载刷新数据
function reLoadGrid(){
	$("#loadingDiv").show();
	var model = getQueryModel();
	if(arguments.length == 1){
		//混合对象
		$.extend(model,arguments[0]);
	}
    $("#dataGrid").jqGrid('setGridParam',{  
        datatype:'json',  
        postData:model,
        page:1  
    }).trigger("reloadGrid"); //重新载入  
    dataGrid2.$grid.jqGrid('clearGridData');
}
/****************************************** 单据主表 结束********************************************************/

/****************************************** 单据明细表 开始********************************************************/

//创建明细
function showDetailList(detailList){
	for ( var i = 0; i < detailList.length; i++) {
		dataGrid2.$grid.jqGrid('addRowData',MyEiditGrid.getMaxRowid(dataGrid2.$grid),detailList[i]);
	}
}

//初始化表格
var dataGrid2 = null;
function initDataGrid2(){
	function formatterImeiList(cellvalue, options, rowObject){
		
		return JSON.stringify(cellvalue);
	}
	//配置
	var paras = {
	    gridId:'dataGrid2', 
	    addRow:{goodsId:'',goodsCode:'',goodsName:'',goodsBrandName:'',stockNumber:'',numControlFlag:'',imControlFlag:'',cxNum:'',cxPrice:'',price:'',remark:''},
	    colNames:['仓库名称','仓库名称','商品名称','商品名称','数量','单价','金额','折扣率','折扣金额','折后金额','含税单价','含税金额', '税率', '税额', '备注','串号'], 
	    colModel:
	    	[ 
	             {name : 'storageId',index : 'storageId',align:'left',sortable: false,hidden: true,formatter:'integer'}, 
	             {name : 'storageName' ,sortable: false,index : 'storageName',align:'left',edittype:'custom_bt_input',custom_element_bt_click:"selectStorageReferenceOpen",editable:false}, 
	             {name : 'goodsId',index : 'goodsId',align:'left',sortable: false,hidden: true,formatter:'integer'}, 
	             {name : 'goodsName',sortable: false,index : 'goodsName',align:'left',edittype:'custom_bt_input',custom_element_bt_click:"selectReferenceOpen",editable:false}, 
	             {name : 'goodsNumber',index : 'goodsNumber',align:'left',editable:false,sortable: false,formatter:'integer'},
	             {name : 'price',index : 'price',align:'left',editable:false,editrules:{number:true},formatter:'number',sortable: false},
	             {name : 'amount',index : 'amount',align:'left',editable:false,editrules:{number:true},formatter:'number',sortable: false},
	             {name : 'discountRate',index : 'discountRate',hidden: false,editable:false,editrules:{number:true},formatoptions: {suffix:"%"},formatter:'currency',sortable: false},
	             {name : 'discountAmount',index : 'discountAmount',hidden: false,editable:false,sortable: false,formatter:'number'},
	             {name : 'discountedAmount',index : 'discountedAmount',hidden: false,editable:false,sortable: false,formatter:'number'},
	             {name : 'taxPrice',index : 'taxPrice',hidden: false,editable:false,sortable: false,formatter:'number'},
	             {name : 'taxAmount',index : 'taxAmount',hidden: false,editable:false,sortable: false,formatter:'number'},
	             {name : 'taxRate',index : 'taxRate',hidden: false,editable:false,sortable: false,formatoptions: {suffix:"%"},formatter:'currency'},
	             {name : 'taxLimit',index : 'taxLimit',hidden: false,editable:false,sortable: false,formatter:'number'},
	             {name : 'remark',index : 'remark',hidden: false,editable:false,sortable: false},
	             {name : 'imeiList',index : 'imeiList',hidden: true,editable:false,sortable: false,formatter:formatterImeiList}
           ],
	};
	//回调函数
	var callBackList = {
		afterEditCell:function(rowid,name,val,iRow,iCol){},
        afterSaveCell:function(rowid,name,val,iRow,iCol){},
        summary:function(rowid,name,val,iRow,iCol){},
        getGridDataList:function(rows){
        	//筛出不合格行
        	return $.map(rows,function(row){
				if(row.goodsName != ""){
		    		row.seteNum = parseInt(row.seteNum) ;
		    		row.surNum = parseInt(row.surNum) ;
		    		row.disseteNum = parseInt(row.disseteNum) ;
		    		row.setePrice = parseFloat(row.setePrice).toFixed(2);
		    		row.disseteAmount = parseFloat(row.disseteAmount).toFixed(2);
		        	delete row["op"];
		        	delete row["index"];
		        	delete row["goodsName"];
		        	delete row["numberRemaining"];
		        	delete row["instroDate"];
		        	delete row["dissetePrice"];
		        	return row;
				}
        	});
        }
	};
	dataGrid2 = new MyEiditGrid(paras,callBackList);
	
}

/****************************************** 单据明细表 结束********************************************************/












