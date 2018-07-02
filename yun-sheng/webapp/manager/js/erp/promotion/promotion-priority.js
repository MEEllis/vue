/***
 * @author XiangRui
 * 零售促销单js
 */
var priorityDao = new CpromotionPriorityInfo(basePath);

//加载完初始化
$(function(){
	
	initUI();
	

});

//初始化界面
function initUI(){

	initDataGrid1();
	queryData2();
	wResize();
	
}

//事件
var activeTabText = "同类别促销单据优先级";
function initEvent(){	

    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        // 获取已激活的标签页的名称
    	activeTabText = $(e.target).text();
    });
    
    $("#cxTypeSelectTable .cxTypeTable td").click(function(){
    	$("#cxTypeSelectTable .cxTypeTable td").removeClass("bg-primary");
    	$(this).addClass("bg-primary");
    	cxType = $(this).attr("cxType");
    	queryData();
    });
    
	
	$(window).resize(wResize);//注册窗口改变事件
}

//窗口大小改变
function wResize(){
	var winH = $(window).height();//浏览器高度
	var winW = $(window).width();//浏览器宽度
	var centerH = winH - 180;//中部高度
	try {
		dataGrid1.setGridWidth($(window).width()-185); 
		dataGrid1.setGridHeight(centerH-90);
		dataGrid1.closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" });
	} catch (e) {
		// TODO: handle exception
	}

}

//保存按钮点击事件
function saveBtClick(){
	//判断保存类型
	if(activeTabText == "同类别促销单据优先级"){
		var modelList = getGridDataList("dataGrid1");
		priorityDao.saveBillPriority(modelList, function(data){
			if(data.result == 1){
				$.MsgBox('提示','操作成功');
				queryData();
			}else{
				$.MsgBox('出错提示',data.desc);
			}
		});
	}else{
		var typeOrder = $("#tab1-2 .cxTypeTable td").map(function(){	
			return $(this).attr("cxType");
		}).get().join(",");
		priorityDao.saveTypePriority(typeOrder, function(data){
			if(data.result == 1){
				$.MsgBox('提示','操作成功');
				queryData2();
			}else{
				$.MsgBox('出错提示',data.desc);
			}
		});	
	}
}

//排序按钮点击2
function orderBtClick2(isUp){
	//当前选中行
	var currSelect = $("#typeOrderTable .bg-primary");
	var currSelectText = currSelect.html();
	var currSelectCxType = currSelect.attr("cxType");
	var toSelect = isUp?$("#typeOrderTable .bg-primary").parent().prev().children("td"):$("#typeOrderTable .bg-primary").parent().next().children("td");
	if(toSelect.length > 0){
		currSelect.attr("cxType",toSelect.attr("cxType"));
		currSelect.html(toSelect.html());
		currSelect.removeClass("bg-primary");
		toSelect.attr("cxType",currSelectCxType);
		toSelect.html(currSelectText);
		toSelect.addClass("bg-primary");
	}
}

//排序按钮点击
function orderBtClick(isUp){
	//当前选中行
	var ids=$('#dataGrid1').jqGrid('getGridParam','selarrrow');
	if(ids.length > 0){
		//选中行ID
		var selectId = ids[0];
		var $ToSelectRowId = isUp?$("#dataGrid1 #"+selectId).prev().attr("id"):$("#dataGrid1 #"+selectId).next().attr("id");
		if(undefined != $ToSelectRowId){
			//存在交换行
			var priority1 = $("#dataGrid1").jqGrid('getCell', selectId ,"priority");
			var priority2 = $("#dataGrid1").jqGrid('getCell', $ToSelectRowId ,"priority");
			$("#dataGrid1").jqGrid('setCell', selectId, "priority", priority2);
			$("#dataGrid1").jqGrid('setCell', $ToSelectRowId, "priority", priority1);
			
			$("#dataGrid1").jqGrid('sortGrid', "priority" ,true);
			//$("#dataGrid1").jqGrid('sortGrid', "priority" ,false);
		}
	}
}

//查询数据
function queryData2(){
	//后台查询
	$.ajax({
		url: this.basePath + '/CpromotionPriorityInfo/listOrderCxType',
		type : "post",
		dataType : 'json',
		data:{},
		success:function(result){
			
			var mingxiList = result.data.dataList;
			$("#typeOrderTable").html("");
			$("#cxTypeTableMenu").html("");
			for ( var int = 0; int < mingxiList.length; int++) {
				var row = mingxiList[int];
				//插入空数据的1行
				var classHtml = (int == 0?'class="bg-primary"':"");
				$("#typeOrderTable").append('<tr><td '+classHtml+' cxType="'+row.cxType+'">'+row.cxTypeName+'</td></tr>');
				$("#cxTypeTableMenu").append('<tr><td '+classHtml+' cxType="'+row.cxType+'">'+row.cxTypeName+'</td></tr>');
			}
		    $("#tab1-2 .cxTypeTable td").click(function(){
		    	$("#tab1-2 .cxTypeTable td").removeClass("bg-primary");
		    	$(this).addClass("bg-primary");
		    	cxType = $(this).attr("cxType");
		    }); 
		    queryData();
		    initEvent();
		}
	}); 
}
/*****************************表格1-1 开始*******************************/
//查询数据
function queryData(){
	var model = getQueryModel1();
	//后台查询
	$.ajax({
		url: this.basePath + '/CbillsMain/list',
		type : "post",
		dataType : 'json',
		data:model,
		success:function(result){
			$("#dataGrid1").jqGrid('clearGridData');
			var mingxiList = result.data.dataList;
			for ( var int = 0; int < mingxiList.length; int++) {
				var row = mingxiList[int];
				//插入空数据的1行
				$("#dataGrid1").jqGrid('addRowData',row.id,row);
			}
		}
	}); 
}

//初始化表格
var dataGrid1 = null;
function initDataGrid1(){
	
	function formatterDate(cellvalue, options, rowObject){
		var date = new Date();
		date.setTime(cellvalue);
		return $.DateFormat(date,"yyyy-MM-dd");
	}
	//配置
	var paras = {
	    gridId:'dataGrid1', 
	    colNames:['ID','促销单号','方案名称','促销类型','促销对象','门店范围','单据日期','生效日期','截止日期','促销时段','排序值(nnn)'], 
	    colModel:
    	[
          {name:'id',index:'INDEX', width:10,align:'center',hidden:true},
 		  {name:'billsCode',index:'TICKET_CODE', width:200,align:'center'},
 		  {name:'planName',index:'TICKET_NAME', width:200,align:'center'}, 
 		  {name:'cxType',index:'TICKET_TYPE', width:100,align:'center'},
 		  {name:'cxObject',index:'TICKET_AMOUNT', width:100,align:'center'},
 		  {name:'sectionRangeId',index:'THRESHOLD_FLAG', width:100,align:'center'},
 		  {name:'billsDate',index:'ENABLE_FLAG',  width:100,align:'center',formatter:formatterDate},
 		  {name:'beginDate',index:'BEGIN_DATE', width:150,align:'center',formatter:formatterDate},
 		  {name:'endDate',index:'END_DATE', width:150,align:'center',formatter:formatterDate},
 		  {name:'cxDateValue',index:'THIRDPARTY_FLAG', width:300,align:'center'},
 		  {name:'priority',index:'priority', width:300,align:'center',hidden:true}
        ]
	};
	$("#"+paras.gridId).jqGrid({
	        datatype : "local",
	        colNames : paras.colNames,  
	        colModel : paras.colModel,
	        styleUI: 'Bootstrap',//设置jqgrid的全局样式为bootstrap样式  
	        viewrecords : true,
	        autowidth : true,
	        multiselect : true,
	        multiboxonly : true,
	        sortable:true,
	        caption : "",
	        footerrow:true ,
	        rownumbers:true
	});
	dataGrid1 = $("#"+paras.gridId);
}

//获取分页查询参数
var cxType = "1";
function getQueryModel1(){

  var model = {};
  model.sortColumns = "PRIORITY, BILLS_DATE DESC";//排序字段
  model.currDate = $.DateFormat(new Date(),"yyyy-MM-dd");//当前时间，只查有效时段内的
  model.cxType = cxType;
  
  //***其它参数
  return model;
}

//获取表格选中的数据
function getGridSelectedData(gridId,isMul){
	var ids=$('#'+gridId).jqGrid('getGridParam','selarrrow');
    var objs = [];
    $.each(ids,function(i,value){
    	objs.push($("#"+gridId).jqGrid('getRowData', value ));
    });
	if(objs.length<1){
		return null;
	}else{
		if(isMul){
			return objs;
		}else{
			return objs[0];
		}
	}
}

function getGridDataList(grid){
	var objList = [];
	var ids=$("#"+grid).getDataIDs();
    $.each(ids,function(i,value){
    	var row = $("#"+grid).jqGrid('getRowData', value );
    	objList.push({"cxBillsCode":row.billsCode});
    });
    return objList;
}
/*****************************表格1-1 结束*******************************/

