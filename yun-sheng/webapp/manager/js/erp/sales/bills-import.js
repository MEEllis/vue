$(function(){
	initBillsModalTime();
	initBillsImportGrid();
	initBillsImportGrid2();
	initBillsModalEvents();
})

function initBillsModalTime(){
	//初始化日期控件
	$("#billsDateBegin").val($.DateFormat($.getCurrentMonthFirst(),"yyyy-MM-dd"));
	$("#billsDateEnd").val($.DateFormat($.getCurrentMonthLast(),"yyyy-MM-dd"));
	
	$("#billsDateBegin").datetimepicker( {
		lang : "ch", // 语言选择中文
		format : "Y-m-d", // 格式化日期
		timepicker : false, // 关闭时间选项
		todayButton : false// 关闭选择今天按钮
	});

	$("#billsDateEnd").datetimepicker( {
		lang : "ch", // 语言选择中文
		format : "Y-m-d", // 格式化日期
		timepicker : false, // 关闭时间选项
		todayButton : false// 关闭选择今天按钮
	});
}

//初始化事件
function initBillsModalEvents(){
	$("#billsImportModal").resize(wResizeBillsModal);//注册窗口改变事件
	wResizeBillsModal();
	
	$('#billsTypeSelect,#billsDateBegin,#billsDateEnd').on('change', function (evt) {
		reLoadGrid();
	});
}

$(document).delegate("#topForm input[name='billsCode']", "input propertychange", function(e){
	reLoadGrid();
});

//窗口大小改变
function wResizeBillsModal(){
	var winH = $("#billsImportModal").height();
	var winW = $("#billsImportModal").width();
	var centerH = winH - 555;//中部高度
	if(centerH < 300){
		centerH = 300;
	}
	$("#billsImportDataGrid").setGridHeight(centerH/2 - 20);
	$("#billsImportDataGrid").setGridWidth(winW-440); 
	$("#billsImportDataGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
	
	$(".gridType").width(50);
	$("#billsImportDataGrid2").setGridHeight(centerH/2 - 20);
	$("#billsImportDataGrid2").setGridWidth(winW-440); 
	$("#billsImportDataGrid2").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" });  
}

// 单据引入按钮单击事件
function billsImportBtClick(){
	$("#topForm")[0].reset();
	initBillsModalTime();
	var sectionId = $("#billsHeaderForm input[name='sectionId']").val();
	var sectionName = $("#billsHeaderForm input[name='sectionName']").val();
	if(sectionId=="" || sectionName==""){
		$.zxsaas_plus.showalert("提示","请先选择部门!");
		return;
	}
	$("#topForm input[name='sectionId']").val(sectionId);
	$("#topForm input[name='sectionName']").val(sectionName);
	reLoadGrid();
	$("#billsImportModal").modal("show");
}

//获取分页查询参数
function getQueryModel(){
  var model = $("#topForm").toJsonObject();
  model.billsDateBegin = model.billsDateBegin + " 00:00:00";
  model.billsDateEnd = model.billsDateEnd + " 23:59:59";
  if(model == "")return;
	return model;
}

//重新加载刷新数据
function reLoadGrid(){
	var model = getQueryModel();
	if(arguments.length == 1){
		//混合对象
		$.extend(model,arguments[0]);
	}
$("#billsImportDataGrid").jqGrid('setGridParam',{  
    datatype:'json',  
    postData:model,
    page:1  
}).trigger("reloadGrid"); //重新载入  
billsImportDataGrid2.$grid.jqGrid('clearGridData');
}

//保存按钮单击事件
function saveBillsImportData(){
	var rows = billsImportDataGrid2.getGridDataList();
	if(rows.length==0){
		$.zxsaas_plus.showalert("提示","未选中任何数据!");
	}else{
		 $("#dataGrid").jqGrid('clearGridData');
		 $.each(rows,function(i,value){
			if(!(value.imeiList=="" || value.imeiList.length==2)){
				value.ifManageIMei=1;
				if(type==19){//销售单
					value.salesOutstrorageImDraftList=value.imeiList; 
				}else{
					value.salesInstrorageImDraftList=value.imeiList; 
				}
			}else{
				value.ifManageIMei=0;
			}
			dataGrid.addRowData(i+1,value);
		 });
	}
	$("#billsImportModal").modal("hide");
}

/****************************************** 单据主表 开始********************************************************/
//初始化表格
function initBillsImportGrid(){
	//配置
	var paras = {
	    gridId:'billsImportDataGrid', 
	    pageUrl:'../BillsImport/page',
	    colNames:['单据编号','单据日期','部门名称','部门名称','经办人','经办人','往来单位','往来单位','单据金额','折后金额','新增人','新增人','新增时间','过账人','过账人','过账时间','备注','明细'], 
	    colModel:
  	  [
          {name:'billsCode',index:'INDEX', width:110,align:'center',sortable: false},
		  {name:'billsDate',index:'TICKET_CODE', width:90,fixed:true,align:'center',formatter:formatterDate,sortable: false},
		  {name:'sectionId',index:'TICKET_NAME', width:1,align:'center',hidden:true,sortable: false}, 
		  {name:'sectionName',index:'TICKET_TYPE', width:100,align:'center',sortable: false},
		  {name:'managersUid',index:'TICKET_AMOUNT', width:1,align:'center',hidden:true,sortable: false},
		  {name:'managersName',index:'TICKET_AMOUNT', width:80,align:'center',sortable: false},
		  {name:'contactsunitId',index:'TICKET_AMOUNT', width:100,align:'center',hidden:true,sortable: false},
		  {name:'contactsunitName',index:'TICKET_AMOUNT', width:100,align:'center',sortable: false},
		  {name:'billsAmount',index:'TICKET_AMOUNT', width:75,align:'center',sortable: false},
		  {name:'billsDiscount',index:'TICKET_AMOUNT', width:75,align:'center',sortable: false},
		  {name:'createBy',index:'TICKET_AMOUNT', width:1,align:'center',hidden:true,sortable: false},
		  {name:'createByName',index:'TICKET_AMOUNT', width:86,align:'center',sortable: false},
		  {name:'createDate',index:'TICKET_AMOUNT', width:125,align:'center',formatter:formatterTime,sortable: false},
		  {name:'postBy',index:'TICKET_AMOUNT', width:1,align:'center',hidden:true,sortable: false},
		  {name:'postByName',index:'TICKET_AMOUNT', width:86,align:'center',sortable: false},
		  {name:'postDate',index:'TICKET_AMOUNT', width:125,align:'center',formatter:formatterTime,sortable: false},
		  {name:'remark',index:'remark', width:100,align:'center',sortable: false},
		  {name:'detailList',index:'detailList', width:1,align:'center',sortable: false,hidden:true,formatter:formatterDetailList}
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
      rowNum : 20,
      autowidth:true,
      shrinkToFit:true,
      postData:getQueryModel(),
      beforeSelectRow:function(){
		 $("#"+paras.gridId).jqGrid('resetSelection');  
		 return(true);  		
	  },
	 onCellSelect:function(rowid,iCol,cellcontent,e){
		   billsImportDataGrid2.$grid.jqGrid('clearGridData');
			var currRow = $("#"+paras.gridId).jqGrid('getRowData', rowid);
			showDetailList(JSON.parse(currRow.detailList));
	  }
    });
}

/****************************************** 单据主表 结束********************************************************/

/****************************************** 单据明细表 开始********************************************************/

//创建明细
function showDetailList(detailList){
	for ( var i = 0; i < detailList.length; i++) {
		 $("#billsImportDataGrid2").jqGrid('addRowData', i+1,detailList[i], 'last' );
	}
}

//初始化表格
var billsImportDataGrid2 = null;
function initBillsImportGrid2(){
	//配置
	var paras = {
	    gridId:'billsImportDataGrid2', 
	    addRow:{goodsId:'',goodsCode:'',goodsName:'',goodsBrandName:'',stockNumber:'',numControlFlag:'',imControlFlag:'',cxNum:'',cxPrice:'',price:'',remark:''},
	    colNames:['id','仓库名称','仓库名称','商品名称','商品名称','数量','单价','金额','折扣率','折扣金额','折后金额','含税单价','含税金额', '税率', '税额', '备注','串号','现存量'], 
	    colModel:
	    	[ 
                 {name : 'id',index : 'id',align:'left',sortable: false,formatter:'integer',key:true,hidden:true},
	             {name : 'storageId',index : 'storageId',align:'left',sortable: false,hidden: true,formatter:'integer'}, 
	             {name : 'storageName' ,sortable: false,index : 'storageName',align:'center',editable:false}, 
	             {name : 'goodsId',index : 'goodsId',align:'center',sortable: false,hidden: true,formatter:'integer'}, 
	             {name : 'goodsName',sortable: false,index : 'goodsName',align:'center',editable:false}, 
	             {name : 'goodsNumber',index : 'goodsNumber',align:'center',editable:false,sortable: false,formatter:'integer',width:100},
	             {name : 'price',index : 'price',align:'center',editable:false,editrules:{number:true},formatter:'number',sortable: false},
	             {name : 'amount',index : 'amount',align:'center',editable:false,editrules:{number:true},formatter:'number',sortable: false},
	             {name : 'discountRate',index : 'discountRate',hidden: false,editable:false,editrules:{number:true},formatoptions: {suffix:"%"},formatter:'currency',sortable: false},
	             {name : 'discountAmount',index : 'discountAmount',hidden: false,editable:false,sortable: false,formatter:'number'},
	             {name : 'discountedAmount',index : 'discountedAmount',hidden: false,editable:false,sortable: false,formatter:'number'},
	             {name : 'taxPrice',index : 'taxPrice',hidden: false,editable:false,sortable: false,formatter:'number'},
	             {name : 'taxAmount',index : 'taxAmount',hidden: false,editable:false,sortable: false,formatter:'number'},
	             {name : 'taxRate',index : 'taxRate',hidden: false,editable:false,sortable: false,formatoptions: {suffix:"%"},formatter:'currency'},
	             {name : 'taxLimit',index : 'taxLimit',hidden: false,editable:false,sortable: false,formatter:'number'},
	             {name : 'remark',index : 'remark',hidden: false,editable:false,sortable: false},
	             {name : 'imeiList',index : 'imeiList',editable:false,sortable: false,formatter:formatterImeiList,hidden:true},
	             {name : 'stockNum',index : 'stockNum',editable:false,sortable: false,hidden:true}
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
   		        	delete row["numberRemaining"];
   		        	delete row["instroDate"];
   		        	delete row["dissetePrice"];
   		        	return row;
   				}
         	});
         }
	};
	billsImportDataGrid2 = new MyEiditGrid(paras,callBackList);
	
}

/****************************************** 单据明细表 结束********************************************************/

/*****************************************表格字段格式化开始*******************************************************/
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

function formatterImeiList(cellvalue, options, rowObject){
	return JSON.stringify(cellvalue);
}

/*****************************************表格字段格式化结束*******************************************************/
