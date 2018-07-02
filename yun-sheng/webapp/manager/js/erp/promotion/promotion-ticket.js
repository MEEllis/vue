/***
 * @author XiangRui
 * 零售促销单js
 */
var promotionTicketDao = new CpromotionTicket(basePath);

//加载完初始化
$(function(){
	
	initUI();
	initEvent();
});

//初始化界面
function initUI(){

	initDataGrid1();
	initDataGrid2();
	
	//日期选择
	$("#datetimepickerStart").datetimepicker({
		  lang:"ch",           //语言选择中文
	      format:"Y-m-d",      //格式化日期
	      timepicker:false,    //关闭时间选项
	      todayButton:false    //关闭选择今天按钮
	});
	$("#datetimepickerEnd").datetimepicker({
		  lang:"ch",           //语言选择中文
	      format:"Y-m-d",      //格式化日期
	      timepicker:false,    //关闭时间选项
	      todayButton:false    //关闭选择今天按钮
	});
	
	wResize();
}

//事件
function initEvent(){	
	$("input[name='thresholdFlag']").change(
		function(){
			var sValue = $(this).is(':checked');
			sValue? $("#thresholdFlagGrid").show():$("#thresholdFlagGrid").hide();
		}
	);
	$("input[name='thirdpartyFlag']").change(
		function(){
			var sValue = $(this).is(':checked');
			if(sValue){
				$("input[name='cooperateUnitName']").prop({'disabled':false});
				$("button[name='cooperateUnitNameBtn']").prop({'disabled':false});
				$("input[name='thresholdFlag']").prop({'disabled':true,'checked':false});
				$("#thresholdFlagGrid").hide();
			}else{
				$("input[name='cooperateUnitName']").prop({'disabled':true});
				$("button[name='cooperateUnitNameBtn']").prop({'disabled':true});
				$("input[name='thresholdFlag']").prop({'disabled':false});
			}
		}
	);
	
	$(window).resize(wResize);//注册窗口改变事件
}

//编辑按钮点击事件
function eiditBtClick(){
	var obj = getGridSelectedData("dataGrid1",false);
	if(obj == null)return;
	
	$("#addAndEiditForm").writeJson2Dom(obj);
	$("input[name='printFlag']").prop({'checked':(obj.printFlag != undefined && obj.printFlag != "")});
	$("input[name='sendnoteFlag']").prop({'checked':(obj.sendnoteFlag != undefined && obj.sendnoteFlag != "")});
	$("input[name='thirdpartyFlag']").prop({'checked':(obj.thirdpartyFlag != undefined && obj.thirdpartyFlag != "")});
	$("input[name='thresholdFlag']").prop({'checked':(obj.thresholdFlag != undefined && obj.thresholdFlag != "")});
	
	$("input[name='thirdpartyFlag']").trigger('change');
	if(obj.thresholdFlag != undefined && obj.thresholdFlag != ""){
		$("#thresholdFlagGrid").show();
	}else{
		$("#thresholdFlagGrid").hide();
	}
	
	$("select[name='ticketType']").val(obj.ticketType);
	
	//门槛表格设置
	var infoList =  JSON.parse(obj.thresholdInfoList);
	showEiditTicketThresholdInfo(infoList);
	
	$("#addAndEiditDialogTitle").html("编辑");
	$('#addAndEiditDialog').modal('show');
}

//新增按钮点击事件
function addBtClick(){
	
	var kong = {
			id:"",
			beginDate:"",
			cooperateUnit:"",
			cooperateUnitName:"",
			endDate:"",
			remark:"",
			ticketAmount:"",
			ticketCode:"",
			ticketName:"",
			ticketType:"1"}
	$("#addAndEiditForm").writeJson2Dom(kong);
	$("input[name='printFlag']").prop({'checked':false});
	$("input[name='sendnoteFlag']").prop({'checked':false});
	$("input[name='thirdpartyFlag']").prop({'disabled':false,'checked':false});
	$("input[name='thresholdFlag']").prop({'disabled':false,'checked':false});
	$("#thresholdFlagGrid").hide();
	$("#addAndEiditDialogTitle").html("新增");
	$('#addAndEiditDialog').modal('show');

}

//保存按钮点击事件
function saveBtClick(){
	
	var formObj = $("#addAndEiditForm").toJsonObject();
	formObj.printFlag = ($("input[name='printFlag']").is(':checked')==true?1:0);
	formObj.sendnoteFlag = ($("input[name='sendnoteFlag']").is(':checked')==true?1:0);
	formObj.thirdpartyFlag = ($("input[name='thirdpartyFlag']").is(':checked')==true?1:0);
	formObj.thresholdFlag = ($("input[name='thresholdFlag']").is(':checked')==true?1:0);
	formObj.thresholdInfoList = dataGrid2.getGridDataList();
	
	promotionTicketDao.saveTicket(formObj, function(data){
		if(data.result == 1){
			$.MsgBox('提示','操作成功');
			reLoadGrid1();
			$('#addAndEiditDialog').modal('hide');
		}else{
			$.MsgBox('出错提示',data.desc);
		}
	});
}

//禁用
function disEnabledBtnClick(){
	//获取选择的行 多选
	var objs = getGridSelectedData("dataGrid1",true);
	if(objs.length > 0){
		var ids = $.map(objs,function(obj){ return obj.id; })
		$.MsgBox('禁用确认','是否确定禁用',function(){
			promotionTicketDao.disEnabled(ids.join(","),function(data){
				if(data.result == 1){
					 reLoadGrid1();
				}else{
					 $.MsgBox('提示消息',data.desc);
				}
			});
		},function(){});
	}else{
		$.MsgBox('提示消息','请选择要删除的行'); 
	}
}

//启用
function enabledBtnClick(){
	//获取选择的行 多选
	var objs = getGridSelectedData("dataGrid1",true);
	if(objs.length > 0){
		var ids = $.map(objs,function(obj){ return obj.id; })
		$.MsgBox('启用确认','是否确定启用',function(){
			promotionTicketDao.enabled(ids.join(","),function(data){
				if(data.result == 1){
					reLoadGrid1();
				}else{
					$.MsgBox('提示消息',data.desc);
				}
			});
		},function(){});
	}else{
		$.MsgBox('提示消息','请选择要删除的行'); 
	}
}



/*****************************表格1 开始*******************************/
/*****************************/

//获取分页查询参数
function getQueryModel1(){

	var postData = $("#dataGrid1").jqGrid("getGridParam", "postData");
    $.each(postData, function (k, v) {
        delete postData[k];
    });
    var model = {};
    
    //***其它参数
    model.keyWord = $("#keyWord").val();
    model.sortColumns = sortColumns1;
	return model;
}

//初始化表格
var dataGrid1 = null;
var sortColumns1 = "ID DESC";
function initDataGrid1(){
	function formatterDate(cellvalue, options, rowObject){
		var date = new Date();
		date.setTime(cellvalue);
		return $.DateFormat(date,"yyyy-MM-dd");
	}
	function formatterState(cellvalue, options, rowObject){
		console.log(rowObject);
		var beginDate = $.StringToDate(rowObject.beginDateString + " 00:00:00");
		var endDate = $.StringToDate(rowObject.endDateString + " 23:59:59");
		var currDate = new Date().getTime();
		if(currDate < beginDate){
			return "未生效";
		}else if(currDate >= beginDate && currDate <= endDate){
			return "生效";
		}else if(currDate > endDate){
			return "已过期";
		}
	}
	function formatterThresholdFlag(cellvalue, options, rowObject){
		if(cellvalue == "1"){
			return '<span class="glyphicon glyphicon-ok"></span>';
		}else{
			return '';
		}
	}
	function formatterTicketType(cellvalue, options, rowObject){
		return rowObject.ticketType==1?"抵现卷":"现金卷";
	}
	function formatterThresholdInfoList(cellvalue, options, rowObject){
		try {
			return JSON.stringify(cellvalue);
		} catch (e) {
			return "[]";
		}
	}
	//配置
	var paras = {
	    gridId:'dataGrid1', 
	    pageUrl:basePath + '/CretailTicketInfo/page',
	    colNames:['卷ID','卷编号','卷名称','卷分类','卷分类','面值','使用门槛','启用','生效日期','截止日期','第三方使用卷','合作单位ID','合作单位','状态','备注','是否打印','发送短信','门槛信息'], 
	    colModel:
    	[
          {name:'id',index:'INDEX', width:10,align:'center',hidden:true},
 		  {name:'ticketCode',index:'TICKET_CODE', width:200,align:'center'},
 		  {name:'ticketName',index:'TICKET_NAME', width:200,align:'center'}, 
 		  {name:'ticketType',index:'TICKET_TYPE', width:100,align:'center',hidden:true},
 		  {name:'ticketTypeName',index:'TICKET_TYPE', width:100,align:'center',formatter:formatterTicketType},
 		  {name:'ticketAmount',index:'TICKET_AMOUNT', width:100,align:'center'},
 		  {name:'thresholdFlag',index:'THRESHOLD_FLAG', width:100,align:'center',formatter:formatterThresholdFlag},
 		  {name:'enableFlag',index:'ENABLE_FLAG',  width:100,align:'center',formatter:formatterThresholdFlag},
 		  {name:'beginDate',index:'BEGIN_DATE', width:150,align:'center',formatter:formatterDate},
 		  {name:'endDate',index:'END_DATE', width:150,align:'center',formatter:formatterDate},
 		  {name:'thirdpartyFlag',index:'THIRDPARTY_FLAG', width:300,align:'center',formatter:formatterThresholdFlag},
 		  {name:'cooperateUnit',index:'COOPERATE_UNIT', width:200,align:'center',hidden:true},
 		  {name:'cooperateUnitName',index:'COOPERATE_UNIT', width:200,align:'center',sortable:false},
          {name:'state',index:'STATE',sortable:false,formatter:formatterState},
          {name:'remark',index:'REMARK'},
          {name:'printFlag',index:'PRINT_FLAG',formatter:formatterThresholdFlag},
          {name:'sendnoteFlag',index:'SENDNOTE_FLAG',formatter:formatterThresholdFlag},
          {name:'thresholdInfoList',index:'thresholdInfoList',sortable:false,formatter:formatterThresholdInfoList,hidden:true}
        ]
	};
	$("#"+paras.gridId).jqGrid({
		url: paras.pageUrl,
        datatype : "json",
        colNames : paras.colNames,  
        colModel : paras.colModel,
        styleUI: 'Bootstrap',
        pager : '#jqGridPager1',
        jsonReader: { root: "data.rows", total: "data.total",records: "data.records",repeatitems: false},
        mtype: "POST",
        rownumbers:true,
        viewrecords : true,
        multiselect : true,
        multiboxonly : true,
        caption : "",
        rowNum : 20,
        autowidth:true,
        onSortCol:function(index,iCol,sortorder){
        	var postData = $("#"+paras.gridId).jqGrid("getGridParam", "postData");
        	postData.sortColumns = index + " " + sortorder;
        	$("#"+paras.gridId).jqGrid("setGridParam", "postData",postData);
		},
		ondblClickRow:function(){
			//eiditBtClick();
		},
		onCellSelect:function(rowid,iCol,cellcontent,e){
			//alert("");
			var currRow = $("#"+paras.gridId).jqGrid('getRowData', rowid);
			var infoList =  JSON.parse(currRow.thresholdInfoList);
			showTicketThresholdInfo(infoList);
		},
        postData:getQueryModel1(),
        loadComplete:function(data){
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
	dataGrid1 = $("#"+paras.gridId);
}

//重新载入  
function reLoadGrid1(){
    $("#dataGrid1").jqGrid('setGridParam',{  
        datatype:'json',  
        postData:getQueryModel1(),
        page:1  
    }).trigger("reloadGrid"); 
}
/*****************************/
/*****************************表格1 结束*******************************/


/*****************************表格1-2 开始*******************************/
/*****************************/

//初始化表格
var dataGrid2 = null;
function initDataGrid2(){
	//配置
	var paras = {
	    gridId:'dataGrid2', 
	    addRow:{amount:'',equalAmount:'',remark:''},
	    colNames:['ID','金额达到','抵现金额','备注'], 
	    colModel:
    	[
    	  {name:'id',index:'id', width:10,align:'center',hidden:true},
          {name:'amount',index:'amount',align:'center',editable:true,sorttype:'float',formatter:"currency"},
 		  {name:'equalAmount',index:'equalAmount',align:'center',editable:true,sorttype:'float',formatter:"currency"},
 		  {name:'remark',index:'remark',align:'center',editable:true}
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
				if(row.amount != "0.00" && row.equalAmount != "0.00" ){
					return row;
				}
        	});
        }
	};
	dataGrid2 = new MyEiditGrid(paras,callBackList);
	dataGrid2.addKongRow();
}

/*****************************/
/*****************************表格1-2 结束*******************************/


//窗口大小改变
function wResize(){
	var winH = $(window).height();//浏览器高度
	var winW = $(window).width();//浏览器宽度
	var centerH = winH - 500;//中部高度
	try {
		$(".referenceFrame").height(winH - 300);
		
		$("#dataGrid1").setGridHeight($(window).height()-450);
		$("#dataGrid1").setGridWidth($(window).width()-60); 
		$("#dataGrid1").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
		
		dataGrid2.$grid.setGridHeight(160);
		dataGrid2.$grid.setGridWidth(742); 
		dataGrid2.$grid.closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
		
	} catch (e) {
		// TODO: handle exception
	}
}

//打开往来单位引用对话框
var callBack = null;
function selectContactUnitReferenceOpen(){
	$('#contactUnitReferenceModal').modal('show');
	callBack = function(){
		if(arguments[0].length == 0){
			$.MsgBox('提示消息',"未选中任何行");
			$('#contactUnitReferenceModal').modal('hide');
			return ;
		}
		var contactUnit = arguments[0][0];

		//设置编辑器值
		$("input[name='cooperateUnitName']").val(contactUnit.name);
		$("input[name='cooperateUnit']").val(contactUnit.id);

		$('#contactUnitReferenceModal').modal('hide');
	}; 
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

//显示行数据的门槛明细
function showTicketThresholdInfo(infoList){
	$("#thresholdTableBody").html("");
	for ( var int = 0; int < infoList.length; int++) {
		var info = infoList[int];
		$("#thresholdTableBody").append(
			'<tr><td>'+info.amount+'</td><td>'+info.equalAmount+'</td></tr>'
		);
	}
}

//显示编辑表行数据的门槛明细
function showEiditTicketThresholdInfo(infoList){
	if(infoList.length == 0){
		dataGrid2.clearDataGrid();dataGrid2.addKongRow();
	}else{
		dataGrid2.$grid.jqGrid('clearGridData');
		for ( var int = 0; int < infoList.length; int++) {
			dataGrid2.addRowData(int,infoList[int]);
		}
	}
}
