
//初始化
$(function(){
	
	//初始化日期控件
    $("#instroDateBegin").val($.getLastMonthYestdyStr(new Date()));
    $("#instroDateEnd").val($.DateFormat(new Date(), "yyyy-MM-dd"));
    
	initGrid();//初始化表格
	initEvents();//初始化事件
	
	$("#instroDateBegin").datetimepicker({
		  lang:"ch",           //语言选择中文
	      format:"Y-m-d",      //格式化日期
	      timepicker:false,    //关闭时间选项
	      todayButton:false    //关闭选择今天按钮
	});
	$("#instroDateEnd").datetimepicker({
		  lang:"ch",           //语言选择中文
	      format:"Y-m-d",      //格式化日期                 
	      timepicker:false,    //关闭时间选项
	      todayButton:false    //关闭选择今天按钮
	});
})

//初始化事件
function initEvents(){
	
	//注册窗口改变事件
	$(window).resize(wResize);
	wResize();

}

function saveBtClick(){
	try {
		parent.callBack(getCurrRows());
	} catch (e) {
		//console.log("缺少父页面：parent.callBack([obj]);");
	}
}

function canelBtClick(){
	try {
		parent.callBack([]);
	} catch (e) {
		
	}
}
/************************************ 开始****************************/

//获取当前选择的行数据 单选
function getCurrRow(){
	var ids=$('#dataGrid').jqGrid('getGridParam','selarrrow');
    var objs = [];
    $.each(ids,function(i,value){
  	  objs.push($("#dataGrid").jqGrid('getRowData', value ));
    });
	if(objs.length>1 || objs.length<1){
	  return null;
	}else{
	  return objs[0];
	}
}

//获取当前选择的行数据 多选
function getCurrRows(){
	var ids=$('#dataGrid').jqGrid('getGridParam','selarrrow');
    var objs = [];
    $.each(ids,function(i,value){
  	  objs.push($("#dataGrid").jqGrid('getRowData', value ));
    });
	return objs;
}

/***********************************商品名称* 结束****************************/

//窗口大小改变
function wResize(){
	$("#dataGrid").setGridHeight($(window).height()-300);
	$("#dataGrid").setGridWidth($(window).width()-20); 
	$("#dataGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
}

//初始化表格
function initGrid(){
	function formatterDate(cellvalue, options, rowObject){
		var date = new Date();
		date.setTime(cellvalue);
		return $.DateFormat(date,"yyyy-MM-dd");
	}	
	function formatterSeteNum(cellvalue, options, rowObject){
		return $.parseInt(rowObject.instroNum) - $.parseInt(rowObject.noSeteNum);
	}
	$("#dataGrid").jqGrid({
		url: basePath + '/IcashBeentrustStock/page',
        datatype : "json",
        colNames : [ 'ID', '入库日期', '商品ID','商品名称','入库数量','已结算数量', '未结算数量', '入库串号','辅助串号','入库价',
                     '入库调价后价',  '结算价', '备注',  '引入单据ID',  '引入单据ID'],  
        colModel : [ 
                     {name : 'id',index : 'id',align:'center',width:70},
                     {name : 'instroDate',index : 'instroDate',align:'left',formatter:formatterDate,sortable: false},
                     {name : 'goodsId',index : 'goodsId',align:'left',sortable: false,hidden: true}, 
                     {name : 'goodsName',index : 'goodsName',align:'left',sortable: false}, 
                     {name : 'instroNum',index : 'instroNum',align:'left',sortable: false}, 
                     {name : 'seteNum',index : 'noSeteNum',align:'left',sortable: false,formatter:formatterSeteNum},
                     {name : 'noSeteNum',index : 'noSeteNum',align:'left',sortable: false},
                     {name : 'imei',index : 'imei',align:'left',sortable: false},  
                     {name : 'auxiliaryImei',index : 'auxiliaryImei',align:'left',sortable: false},  
                     {name : 'price',index : 'price',align:'left',sortable: false},
                     {name : 'ajustPrice',index : 'ajustPrice',align:'left',sortable: false},
                     {name : 'setePrice',index : 'setePrice',align:'left',sortable: false},
                     {name : 'remark',index : 'remark',align:'left',sortable: false},
                     {name : 'billsMainId',index : 'billsMainId',align:'left',sortable: false,hidden: true},
                     {name : 'ifManageImei',index : 'ifManageImei',align:'left',sortable: false,hidden: true}
                   ],
        styleUI: 'Bootstrap',
        pager : '#jqGridPager',
        jsonReader: { root: "data.rows", total: "data.total",records: "data.records",repeatitems: false},
        mtype: "POST",
        viewrecords : true,
        multiselect : true,
        multiboxonly : true,
        caption : "",
        rowNum : 10,
        autowidth:true,
        onSortCol:function(index,iCol,sortorder){

		},
		ondblClickRow:function(rowid,iRow,iCol,e){
			var obj = $("#dataGrid").jqGrid('getRowData', rowid );
			try {
				parent.callBack([obj]);
			} catch (e) {
				//console.log("缺少父页面：parent.callBack([obj]);");
			}
		},
        postData:getQueryModel(),
        loadComplete:function(data){
        	try {
				if(data.result == 1){
					wResize();
				}else{
					$.MsgBox('出错提示',data.desc);
				}
			} catch (e) {
			//	console.log(e);
			}
        }
      });	

}

//获取分页查询参数
function getQueryModel(){

//	var postData = $("#dataGrid").jqGrid("getGridParam", "postData");
//    $.each(postData, function (k, v) {
//        delete postData[k];
//    });

    var model = $("#topForm").toJsonObject();
    if(model.instroDateBegin != null && model.instroDateBegin != ""){
    	model.instroDateBegin = model.instroDateBegin + " 00:00:00";
    }
    if(model.instroDateEnd != null && model.instroDateEnd != ""){
    	model.instroDateEnd = model.instroDateEnd + " 23:59:59";
    }
    //model.groupId = gl_groupId;

	return model;
}

//重新加载刷新数据
function reLoadGrid(){
	var model = getQueryModel();
	var query = {};

//	if(model.instroDateBegin == ""){
//		$.MsgBox('操作提示','开始时间不能为空');
//		return;
//	}
//	
//	if(model.instroDateEnd == ""){
//		model.instroDateEnd = $.DateFormat(new Date(), "yyyy-MM-dd") + " 23:59:59";
//	}
	
	if(arguments.length == 1){
		query = arguments[0];
		$.extend(model,query);
	}
    $("#dataGrid").jqGrid('setGridParam',{  
        datatype:'json',  
        postData:model,
        page:1  
    }).trigger("reloadGrid"); //重新载入  
    setWldwName(model.contactsunitName);
}

//取消引用
function cancleSelect(){
	parent.callBack([]);
}