
//初始化
$(function(){
	initGrid();
	initEvents();
	$(".leftDIV .active").removeClass("active");
	$(".leftDIV").find(".btn:first").addClass("active");
	linkBtClick(1);
	 $("#gridTitle").text($(".navbar-btn:first").text());
});
//按钮变化
$(".leftDIV .btn").on("click",function(){
   $(".leftDIV .active").removeClass("active");
   $(this).addClass("active");
});
//保存更改点击
function saveEdit(){
	
	var list = CwGrid.$("dataGrid").save().getGridDataList();
	if(list.length == 0)return;
	$.request({
		type: 'post',
		url: basePath+'/cw/jksz/save',
		contentType : 'application/json',
		dataType: "json",
		data:JSON.stringify(list),
		success: function(data) {
			 if(data.result != 1){$.MsgBox('错误提示',data.desc);return;};
			 
			 noSaveEdit();
			 $.MsgBox('操作提示','保存成功');
		},
		error:ajaxError
	});
}

//放弃更改点击
function noSaveEdit(){
	linkBtClick(currCode);
}

//统一错误处理
function ajaxError(msg){
//	console.log(msg);
}

//初始化界面、控件
function initUI(){
	
}

//初始化事件
function initEvents(){
	$(window).resize(wResize);//注册窗口改变事件
	wResize();
 
}

//窗口大小改变
function wResize(){
	
	$(".rightDIV").width($("body").width()-30);
	$(".rightDIV").height($("html").height()-$(".leftDIV").height()-120);
	CwGrid.$("dataGrid").setSize($(".rightDIV").width()-30,$(".rightDIV").height()-110,true);
	
}

//左边按钮点击事件调用
var currModel = null;
var currCode = null;
function linkBtClick(code){
	$("#gridTitle").text($(this).text());
    
	//code为公共选项表code
	currModel = gl_GridModel[code-1];
	currCode = code;
	
	//界面调整
	CwGrid.$('dataGrid').hideCols(allHide);//隐藏所有动态列
	CwGrid.$('dataGrid').showCols(currModel.name);//显示当前动态列
	CwGrid.$('dataGrid').changeColTitles(currModel);//显示当前动态列
	
	currModel.init();
	
	wResize();
}

//初始化表格
function formatterBillsType(cellvalue, options, rowObject){
	if(cellvalue == "19" || cellvalue == "销售出库单"){
		return '销售出库单';
	}else if(cellvalue == "20" || cellvalue == "销售换货单"){
		return '销售换货单';
	}else if(cellvalue == "21" || cellvalue == "销售退货单"){
		return '销售退货单';
	}else if(cellvalue == "50" || cellvalue == "零售退定单"){
		return '零售退定单';
	}else if(cellvalue == "45" || cellvalue == "零售出库单"){
		return '零售出库单';
	}else if(cellvalue == "46" || cellvalue == "零售退货单"){
		return '零售退货单';
	}else if(cellvalue == "-1" || cellvalue == "所有类型" || cellvalue == "期初库存" || cellvalue == null || cellvalue == 'null'){
		// -1 刚好对应数据库中的单据类型:期初库存
		return '所有类型';
	}else{
		return "";
	}
}
function initGrid(){

	CwGrid.$(
	  {
	    gridId:'dataGrid', 
	    cellEdit:true,
	    addRow:{id:''},
	    showAddBt:true,
	    footerrow:true,
	    colNames:['ID','集团ID','公司ID','科目类别',
	              '资金账户ID','资金账户CODE','资金账户名称','资金账户类型',
	              '单据类型','单据类型',
	              '商品分类ID','商品分类CODE','商品分类名称','商品分类层级编码',
	              '出入库方式', '出入库方式',
	              '调整原因ID','调整原因','收支分类',
	              '其它收支类型ID','其它收支类型','其它收支类型CODE',
	              '往来项目','往来项目',
	              '其他出库方式','其他出库方式',
	              '其它入库方式', '其它入库方式',
	              '收款类型', '收款类型','收款类型',
	              '税目', '税目',
	              '科目ID', '科目编码', '科目名称',
	              '成本科目ID','成本科目编码', '成本科目名称',
          			'往来科目编码','往来科目名称','摊销科目编码','摊销科目名称'
	              ], 
	    colModel:
	    	[ 
             {name : 'id',index : 'year',align:'left',editable:true,sortable: false,hidden: true},
             {name : 'groupId',index : 'year',align:'left',editable:true,sortable: false,hidden: true},
             {name : 'companyId',index : 'year',align:'left',editable:true,sortable: false,hidden: true},
             {name : 'subjectType',index : 'year',align:'left',editable:true,sortable: false,hidden: true},

             {name : 'accountId',index : 'year',align:'left',editable:true,sortable: false,hidden: true},
             {name : 'accountCode',index : 'year',align:'left',editable:false,sortable: false,hidden: false,width:200},
             {name : 'accountName',index : 'year',align:'left',editable:false,sortable: false,hidden: false,width:200},
             {name : 'accountType',index : 'VOUCHER_NUM',align:'left',editable:false,sortable: false,hidden: true},
             
             {name : 'billsType',index : 'year',align:'left',editable:true,sortable: false,hidden: true},
             {name : 'billsTypeName' ,sortable: false,index : 'billsTypeName',width:'200px',align:'left',formatter:formatterBillsType,editable:true,edittype:'custom',editoptions:{custom_element:my_input3,custom_value:my_value}},
             
             {name : 'goodsCategoryId',index : 'year',align:'left',editable:true,sortable: false,hidden: true},
             {name : 'goodsCategoryCode',index : 'year',align:'left',editable:false,sortable: false,hidden: false,width:200},
             {name : 'goodsCategoryName',sortable: false,index : 'goodsCategoryName',align:'left',edittype:'custom_bt_input',custom_element_bt_click:"selectGoodsClassReferenceOpen",editable:true,width:200}, 
             {name : 'goodsCategoryLayercode',index : 'year',align:'left',editable:true,sortable: false,hidden: true},

             {name : 'inOutType',index : 'year',align:'left',editable:true,sortable: false,hidden: true},
             {name : 'inOutTypeName',index : 'year',align:'left',editable:false,sortable: false,hidden: false,width:200},
             
             {name : 'tzReasonId',index : 'year',align:'left',editable:true,sortable: false,hidden: true},
             {name : 'tzReasonValue',index : 'year',align:'left',editable:true,sortable: false,hidden: false,width:200},
				{name : 'classifyName',index : 'classifyName',align:'left',editable:false,sortable: false,hidden: false,width:200},
             {name : 'otherIncomeId',index : 'year',align:'left',editable:true,sortable: false,hidden: true},
             {name : 'otherIncomeName',index : 'year',align:'left',editable:false,sortable: false,hidden: false,width:200},
             {name : 'otherIncomeCode',index : 'VOUCHER_NUM',align:'left',editable:false,hidden: true},
             
             {name : 'cashAccount',index : 'year',align:'left',editable:true,sortable: false,hidden: true},
             {name : 'cashAccountName',index : 'year',align:'left',editable:false,sortable: false,hidden: false,width:200},
             
             {name : 'otherOutType',index : 'month',align:'left',editable:true,sortable: false,hidden: true},
             {name : 'otherOutTypeName',index : 'month',align:'left',editable:false,sortable: false,hidden: false,width:200},
             
             {name : 'otherInType',index : 'VOUCHER',align:'left',editable:true,hidden: true},
             {name : 'otherInTypeName',index : 'VOUCHER',align:'left',editable:false,hidden: false,width:200},
             
             {name : 'incomeId',index : 'year',align:'left',editable:true,sortable: false,hidden: true},
             {name : 'incomeName',index : 'year',align:'left',editable:false,sortable: false,hidden: false,width:200},
             {name : 'incomeCode',index : 'year',align:'left',editable:false,sortable: false,hidden: true,width:200},
             
             {name : 'taxItem',index : 'VOUCHER_NUM',align:'left',editable:false,hidden: true},
             {name : 'taxItemName',index : 'VOUCHER_NUM',align:'left',editable:false,hidden: false,width:200},
             
             {name : 'subjectId',index : 'VOUCHER_NUM',align:'left',editable:false,hidden: true},
             {name : 'subjectCode',index : 'VOUCHER_NUM',align:'left',editable:false,hidden: false,width:200},
             {name : 'subjectName',sortable: false,index : 'subjectName',align:'left',edittype:'custom_bt_input',custom_element_bt_click:"selectSubjectReferenceOpen",editable:true,width:200}, 
             
             {name : 'costSubjectId',index : 'VOUCHER_NUM',align:'left',editable:false,hidden: true},
             {name : 'costSubjecCode',index : 'VOUCHER_NUM',align:'left',editable:false,hidden: false,width:200},
             {name : 'costSubjecName',sortable: false,index : 'costSubjecName',align:'left',edittype:'custom_bt_input',custom_element_bt_click:"selectSubjectReferenceOpen",editable:true,width:200},

                {name : 'contactSujectCode',align:'left',editable:false,hidden: false,width:200},
                {name : 'contactSujectName',sortable: false,align:'left',edittype:'custom_bt_input',custom_element_bt_click:"selectSubjectReferenceOpen",editable:true,width:200},
				{name : 'avgSujectCode',align:'left',editable:false,hidden: false,width:200},
				{name : 'avgSujectName',sortable: false,align:'left',edittype:'custom_bt_input',custom_element_bt_click:"selectSubjectReferenceOpen",editable:true,width:200},
            ]
	  },
	  {
		afterEditCell:function(rowid,name,cellvalue,iRow,iCol){
		    var seleV = "-1";
			if(cellvalue == "19" || cellvalue == "销售出库单"){
				seleV = "19";
			}else if(cellvalue == "20" || cellvalue == "销售换货单"){
				seleV = "20";
			}else if(cellvalue == "21" || cellvalue == "销售退货单"){
				seleV = "21";
			}else if(cellvalue == "50" || cellvalue == "零售退定单"){
				seleV = "50";
			}else if(cellvalue == "45" || cellvalue == "零售出库单"){
				seleV = "45";
			}else if(cellvalue == "46" || cellvalue == "零售退货单"){
				seleV = "46";
			}else if(cellvalue == "-1" || cellvalue == "所有类型" || cellvalue == "期初库存" || cellvalue == null || cellvalue == 'null'){
				// -1 刚好对应数据库中的单据类型:期初库存
				return "-1";
			}
		    $("#"+iRow+"_billsTypeName option[value='"+seleV+"']").attr("selected",true);
	    },
        afterSaveCell:function(rowid,name,val,iRow,iCol){
	    	//判断是否是单据类型
	    	if("billsTypeName" == name){
	    		CwGrid.$("dataGrid").$grid.jqGrid('setCell', rowid ,"billsType" ,val);
	    	}
	    },
        summary:function(rowid,name,val,iRow,iCol){},
        getGridDataList:function(rows){//筛出不合格行
        	return $.map(rows,function(row){
        		var xTag = true;
        		
        		var valFiels = currModel.name;
        		if(currModel.haveOneNoEmpty != undefined){
        			//默认使用name去验证，如果指定了必填字段 则使用必填字段验证
        			valFiels = currModel.haveOneNoEmpty;
            		for ( var int = 0; int < valFiels.length; int++) {
    					if($.notEmpty(row[valFiels[int]])){
    						xTag = true;
    						break;
    					}
    				}
            		row.subjectType = currCode;
            		if(xTag)return row;	
        		}else{
            		for ( var int = 0; int < valFiels.length; int++) {
    					if(!$.notEmpty(row[valFiels[int]])){
    						xTag = false;
    						break;
    					}
    				}
            		row.subjectType = currCode;
            		if(xTag)return row;	
        		}
        	});
        },
        queryGridData:function(grid){}
	  }
	);
	
	/**自定义字段编辑**/
    function my_input3(value, options) {
      var html =  '<select class="form-control">'+
      				'<option value ="-1">所有类型</option>'+
			        '<option value ="19">销售出库单</option>'+
			        '<option value ="20">销售换货单</option>'+
			        '<option value ="21">销售退货单</option>'+
			        '<option value ="50">零售退定单</option>'+
			        '<option value ="45">零售出库单</option>'+
			        '<option value ="46">零售退货单</option>'+
		          '</select>';
	  return $(html);             
    }
	function my_value(value) {
	    return value.val();
	}
	
}



var callBack ;
//科目参照
function selectSubjectReferenceOpen(cellInfo){
	var gridId = cellInfo.gridId;var rowid = cellInfo.rowId;var inptid = cellInfo.cellInputId;
	
	$('#subjectReferenceModal').modal('show');
	//subjectReferenceFrame.reLoad();//可以参数查询
	callBack = function(){
		if(arguments[0].length == 0){
			$('#subjectReferenceModal').modal('hide');
			return ;
		}
		var model = arguments[0][0];
		if(model.ifEndSubject == '否'){
			$.MsgBox('操作提示','只能选择末级部门');
			return;
		}
		
		//设置编辑器值
		$("#"+gridId+" #"+inptid).val(model.subjectName);
		
		//判断是否是成本科目
		//判断是否是末级科目
		
		if(/costSubjecName$/.test(inptid)){
			CwGrid.$(gridId).$grid.jqGrid('setCell', rowid ,"costSubjectId" ,model.subjectCode);
			CwGrid.$(gridId).$grid.jqGrid('setCell', rowid ,"costSubjecCode" ,model.subjectCode);	
		}
        else if(/contactSujectName/.test(inptid)){
            CwGrid.$(gridId).$grid.jqGrid('setCell', rowid ,"contactSujectCode" ,model.subjectCode);
        }
		else if(/avgSujectName/.test(inptid)){
			CwGrid.$(gridId).$grid.jqGrid('setCell', rowid ,"avgSujectCode" ,model.subjectCode);
		}else {
			CwGrid.$(gridId).$grid.jqGrid('setCell', rowid ,"subjectId" ,model.subjectCode);
			CwGrid.$(gridId).$grid.jqGrid('setCell', rowid ,"subjectCode" ,model.subjectCode);
		}
		
		$('#subjectReferenceModal').modal('hide');
	}; 
}
//商品类别参照
function selectGoodsClassReferenceOpen(cellInfo){
	var gridId = cellInfo.gridId;
	var rowid = cellInfo.rowId;
	var inptid = cellInfo.cellInputId;
	
	$('#goodsClassReferenceModal').modal('show');
	//goodsClassReferenceFrame.reLoad();//可以参数查询
	callBack = function(){
		if(arguments[0].length == 0){$('#goodsClassReferenceModal').modal('hide');return ;}
		var entity = arguments[0][0];
		try {
			//设置编辑器值
			$("#"+inptid).val(entity.name);
			CwGrid.$(gridId).$grid.jqGrid('setCell', rowid ,"goodsCategoryId" ,entity.id);
			CwGrid.$(gridId).$grid.jqGrid('setCell', rowid ,"goodsCategoryCode" ,entity.code);
			CwGrid.$(gridId).$grid.jqGrid('setCell', rowid ,"goodsCategoryLayercode" ,entity.layerCode);
			
		} catch (e) {
			console.log(e);
		}
		$('#goodsClassReferenceModal').modal('hide');
	}; 
}


var allHide = ['accountCode','accountName',             //资金账户编码、名称
               'goodsCategoryCode','goodsCategoryName', //商品分类、编码
               'billsTypeName',                         //单据类型
               'inOutTypeName',                         //出入库方式
               'tzReasonValue',                         //调整原因
                'classifyName',                     //收支分类
               'otherIncomeName',                       //其它收支类型
               'incomeName',                            //收支类型
               'cashAccountName',                       //往来项目
               'otherOutTypeName',                      //其它出库方式
               'otherInTypeName',                       //其它入库方式
               'taxItemName',                           //税目
               'subjectCode','subjectName',             //通用科目编码、名称
               'contactSujectCode','contactSujectName',             //通用科目编码、名称
               'costSubjecCode','costSubjecName','avgSujectCode','avgSujectName'];      //成本科目编码、名称

var gl_GridModel = 
	[
      {//资金账户对应科目
    	name:['accountCode','accountName','subjectCode','subjectName'],
        title:['账户编码','资金账户名称','科目编码','对应会计科目'],
        init:function(){
    		 //查询资金账户
    	     CwGrid.$("dataGrid").config.showAddBt = false;
    	     $("#dataGrid").hideCol("op");
    	     CwGrid.$("dataGrid").clear();
    		 $.request({
    			url: basePath + '/account/find',
    			type : "post",
    			dataType : 'json',
    			data:{},
    			success:function(data){
    				if(data.result != 1){$.MsgBox('错误提示',data.desc);return;};
    				var rows = $.map(data.data.dataList,function(model){
    					return {accountId:model.id,accountCode:model.code,accountName:model.name,accountType:model.accounType};
    				});
    				CwGrid.$("dataGrid").addRowDatas(rows);
    				currModel.query();
    			}
    		});   
        },
        query:function(){
        	$.request({type: 'post',url: basePath+'/cw/jksz/find',dataType: "json", data:{subjectType:currCode},
        		success: function(data) {
        			if(data.result != 1){$.MsgBox('错误提示',data.desc);CwGrid.$("dataGrid").clear();return;};
        			for ( var int = 0; int < data.data.dataList.length; int++) {
        				CwGrid.$("dataGrid").updateRows(['accountId'],data.data.dataList[int]);
					}	
        		},error: ajaxError
        	});	
        }
      },
      {//存货科目
        name:['goodsCategoryCode','goodsCategoryName','subjectCode','subjectName'],
        title:['商品分类编码','商品分类名称','存货科目编码','存货科目名称 '],
        init:function(){
    	  CwGrid.$("dataGrid").config.showAddBt = true;
 	      $("#dataGrid").showCol("op");
    	  CwGrid.$("dataGrid").clear();
    	  currModel.query();
        },
        query:function(){
        	$.request({type: 'post',url: basePath+'/cw/jksz/find',dataType: "json", data:{subjectType:currCode},
        		success: function(data) {
        			if(data.result != 1){$.MsgBox('错误提示',data.desc);CwGrid.$("dataGrid").clear();return;};
        			CwGrid.$("dataGrid").addRowDatas(data.data.dataList);	
        		},error: ajaxError
        	});	
        }
      },
      {//委托库存科目
        name:['goodsCategoryCode','goodsCategoryName','subjectCode','subjectName'],
        title:['商品分类编码','商品分类名称','委托库存科目编码','委托库存科目名称'],
        init:function(){
    	  CwGrid.$("dataGrid").config.showAddBt = true;
 	      $("#dataGrid").showCol("op");
    	  CwGrid.$("dataGrid").clear();
    	  currModel.query();
        },
        query:function(){
        	$.request({type: 'post',url: basePath+'/cw/jksz/find',dataType: "json", data:{subjectType:currCode},
        		success: function(data) {
        			if(data.result != 1){$.MsgBox('错误提示',data.desc);CwGrid.$("dataGrid").clear();return;};
        			CwGrid.$("dataGrid").addRowDatas(data.data.dataList);	
        		},error: ajaxError
        	});	
        }
	  },
      {//受托库存科目
        name:['goodsCategoryCode','goodsCategoryName','subjectCode','subjectName'],
        title:['商品分类编码','商品分类名称','受托库存科目编码','受托库存科目名称'],
        init:function(){
    	  CwGrid.$("dataGrid").config.showAddBt = true;
 	      $("#dataGrid").showCol("op");
		  CwGrid.$("dataGrid").clear();
		  currModel.query();
        },
        query:function(){
        	$.request({type: 'post',url: basePath+'/cw/jksz/find',dataType: "json", data:{subjectType:currCode},
        		success: function(data) {
        			if(data.result != 1){$.MsgBox('错误提示',data.desc);CwGrid.$("dataGrid").clear();return;};
        			CwGrid.$("dataGrid").addRowDatas(data.data.dataList);	
        		},error: ajaxError
        	});	  	
        }
      },
      {//销售收入、成本科目
        name:['billsTypeName','goodsCategoryCode','goodsCategoryName','subjectCode','subjectName','costSubjecCode','costSubjecName'],
        title:['单据类型','商品分类编码','商品分类名称','收入科目编码','销售收入入账科目','成本科目编码','销售成本入账科目'],
        init:function(){
    	  CwGrid.$("dataGrid").$grid.setColProp("billsTypeName",{editable:true,formatter:formatterBillsType});
    	  CwGrid.$("dataGrid").config.showAddBt = true;
 	      $("#dataGrid").showCol("op");
    	  CwGrid.$("dataGrid").clear();
    	  currModel.query();
        },
        query:function(){
        	$.request({type: 'post',url: basePath+'/cw/jksz/find',dataType: "json", data:{subjectType:currCode},
        		success: function(data) {
        			if(data.result != 1){$.MsgBox('错误提示',data.desc);CwGrid.$("dataGrid").clear();return;};
        			CwGrid.$("dataGrid").addRowDatas(data.data.dataList);	
        		},error: ajaxError
        	});	
        }
      },
      {//成本差异科目
        name:['billsTypeName','inOutTypeName','subjectCode','subjectName'],
        title:['单据类型','出入库方式','科目编码','科目名称'],
        init:function(){
    	  CwGrid.$("dataGrid").config.showAddBt = false;
 	      $("#dataGrid").hideCol("op");
    	  CwGrid.$("dataGrid").$grid.setColProp("billsTypeName",{editable:false,formatter:function(v){return v;}});
    	  var rows = [
    	               {billsType:'4',billsTypeName:'采购退货',inOutType:'2',inOutTypeName:'采购退货'},
    	               {billsType:'2',billsTypeName:'采购入库',inOutType:'27',inOutTypeName:'借入转采购'}
    	               ];
    	  CwGrid.$("dataGrid").clear().addRowDatas(rows);;
    	  currModel.query();
        },
        query:function(){
        	$.request({type: 'post',url: basePath+'/cw/jksz/find',dataType: "json", data:{subjectType:currCode},
        		success: function(data) {
        			if(data.result != 1){$.MsgBox('错误提示',data.desc);CwGrid.$("dataGrid").clear();return;};
        			for ( var int = 0; int < data.data.dataList.length; int++) {
        				CwGrid.$("dataGrid").updateRows(['inOutType'],data.data.dataList[int]);
					}	
        		},error: ajaxError
        	});	
        }
      },
      {//成本调整科目
        name:['tzReasonValue','subjectCode','subjectName'],
        title:['调整原因','科目编码','科目名称'],
        init:function(){
    		 //查询公司调整原因
    	     CwGrid.$("dataGrid").config.showAddBt = false;
    	      $("#dataGrid").hideCol("op");
	 	     CwGrid.$("dataGrid").clear();
	 		 $.request({
	 			url: basePath + '/jxc/authority/ItzReason/find',
	 			type : "post",
	 			dataType : 'json',
	 			data:{},
	 			success:function(data){
	 				if(data.result != 1){$.MsgBox('错误提示',data.desc);return;};
	 				var rows = $.map(data.data.dataList,function(model){
	 					return {tzReasonId:model.id,tzReasonValue:model.name};
	 				});
	 				CwGrid.$("dataGrid").addRowDatas(rows);
	 				currModel.query();
	 			}
	 		});   
        },
        query:function(){
          	$.request({type: 'post',url: basePath+'/cw/jksz/find',dataType: "json", data:{subjectType:currCode},
        		success: function(data) {
        			if(data.result != 1){$.MsgBox('错误提示',data.desc);CwGrid.$("dataGrid").clear();return;};
        			for ( var int = 0; int < data.data.dataList.length; int++) {
        				CwGrid.$("dataGrid").updateRows(['tzReasonId'],data.data.dataList[int]);
					}	
        		},error: ajaxError
        	});	
        }
      },
      {//其它收入科目
        name:['classifyName','otherIncomeName','subjectCode','subjectName','contactSujectCode','contactSujectName'],
        title:['收支分类','其它收入类型','收入科目编码','收入科目名称（必填）','往来科目编码','往来科目名称'],
         haveOneNoEmpty:['subjectCode'],
        init:function(){
    	     CwGrid.$("dataGrid").config.showAddBt = false;
    	      $("#dataGrid").showCol("classifyName");
            $("#dataGrid").hideCol("op");
	 	     CwGrid.$("dataGrid").clear();
	 		 $.request({
	 			url: basePath + '/jxc/authority/tinpayClass/find?flag=0',
	 			type : "post",
	 			dataType : 'json',
	 			data:{},
	 			success:function(data){
	 				if(data.result != 1){$.MsgBox('错误提示',data.desc);return;};
	 				var rows = $.map(data.data.dataList,function(model){
	 					//if(model.name != '商品销售收入' && model.name != '分期商佣金收入' && model.name != '运营商佣金收入' && model.name != '成本调整收入' && model.name != '其他入库收入' ){
							return {otherIncomeId:model.id,otherIncomeCode:model.code,otherIncomeName:model.name,classifyName:model.classifyName};
						//}

	 				});
	 				CwGrid.$("dataGrid").addRowDatas(rows);
	 		 		currModel.query();
	 			}
	 		});
        },
        query:function(){
          	$.request({type: 'post',url: basePath+'/cw/jksz/find',dataType: "json", data:{subjectType:currCode},
        		success: function(data) {
        			if(data.result != 1){$.MsgBox('错误提示',data.desc);CwGrid.$("dataGrid").clear();return;};
        			for ( var int = 0; int < data.data.dataList.length; int++) {
        				delete data.data.dataList[int]['classifyName']
        				CwGrid.$("dataGrid").updateRows(['otherIncomeId'],data.data.dataList[int]);
					}	
        		},error: ajaxError
        	});	
        } 
      },
      {//其它支出科目
        name:['classifyName','otherIncomeName','subjectCode','subjectName','contactSujectCode','contactSujectName','avgSujectCode','avgSujectName'],
        title:['收支分类','其它支出类型','支出科目编码','支出科目名称（必填）','往来科目编码','往来科目名称','摊销科目编码','摊销科目名称'],
         haveOneNoEmpty:['subjectCode'],
        init:function(){
    	     CwGrid.$("dataGrid").config.showAddBt = false;
    	      $("#dataGrid").hideCol("op");
	 	     CwGrid.$("dataGrid").clear();
	 		 $.request({
	 			url: basePath + '/jxc/authority/tinpayClass/find?flag=1',
	 			type : "post",
	 			dataType : 'json',
	 			data:{},
	 			success:function(data){
	 				if(data.result != 1){$.MsgBox('错误提示',data.desc);return;};
	 				var rows = $.map(data.data.dataList,function(model){
						//if(model.name != '商品销售成本' && model.name != '预存运营商风险金' && model.name != '其他出库支出' && model.name != '成本调整支出' && model.name != '积分抵现支出' ){
							return {otherIncomeId:model.id,otherIncomeCode:model.code,otherIncomeName:model.name,classifyName:model.classifyName};
						//}
	 				});
	 				CwGrid.$("dataGrid").addRowDatas(rows);
	 				currModel.query();
	 			}
	 		});
        },
        query:function(){
          	$.request({type: 'post',url: basePath+'/cw/jksz/find',dataType: "json", data:{subjectType:currCode},
        		success: function(data) {
        			if(data.result != 1){$.MsgBox('错误提示',data.desc);CwGrid.$("dataGrid").clear();return;};
        			for ( var int = 0; int < data.data.dataList.length; int++) {
                        delete data.data.dataList[int]['classifyName']
        				CwGrid.$("dataGrid").updateRows(['otherIncomeId'],data.data.dataList[int]);
					}	
        		},error: ajaxError
        	});	
        }
      },
      {//往来账务科目
        name:['cashAccountName','subjectCode','subjectName'],
        title:['往来项目','往来科目编码','往来科目名称'],
        init:function(){
    	  CwGrid.$("dataGrid").config.showAddBt = false;
 	      $("#dataGrid").hideCol("op");
    	  var rows = [
    	               {cashAccount:'零售定金科目',cashAccountName:'零售定金科目'},
    	               {cashAccount:'预收科目',cashAccountName:'预收科目'},
    	               {cashAccount:'预付科目',cashAccountName:'预付科目'},
    	               {cashAccount:'应收科目',cashAccountName:'应收科目'},
    	               {cashAccount:'应付科目',cashAccountName:'应付科目'},
    	               //{cashAccount:'内部应收往来',cashAccountName:'内部应收往来'},
    	               //{cashAccount:'内部应付往来',cashAccountName:'内部应付往来'},
    	               //{cashAccount:'借入单往来科目',cashAccountName:'借入单往来科目'},
    	               //{cashAccount:'借出单往来科目',cashAccountName:'借出单往来科目'},
    	               {cashAccount:'受托商品结算科目',cashAccountName:'受托商品结算科目'},
    	               //{cashAccount:'会员充值差异科目',cashAccountName:'会员充值差异科目'},
    	               //{cashAccount:'分期余额应收',cashAccountName:'分期余额应收'},
    	               //{cashAccount:'第三方抵扣应收',cashAccountName:'第三方抵扣应收'},
    	               //{cashAccount:'运营商风险金往来科目',cashAccountName:'运营商风险金往来科目'},
    	               //{cashAccount:'运营商佣金往来科目',cashAccountName:'运营商佣金往来科目'},
    	               //{cashAccount:'代收运营商业务款科目',cashAccountName:'代收运营商业务款科目'}
    	               {cashAccount:'供应商保价往来科目',cashAccountName:'供应商保价往来科目'},
    	              {cashAccount:'客户保价往来科目',cashAccountName:'客户保价往来科目'},
    	               {cashAccount:'供应商返利往来科目',cashAccountName:'供应商返利往来科目'},
    	               {cashAccount:'客户返利往来科目',cashAccountName:'客户返利往来科目'}
    	               //{cashAccount:'其它收入单往来科目',cashAccountName:'其它收入单往来科目'},
    	               //{cashAccount:'其它支出单往来科目',cashAccountName:'其它支出单往来科目'}
    	               ];
    	  CwGrid.$("dataGrid").clear().addRowDatas(rows);;
    	  currModel.query();
        },
        query:function(){
          	$.request({type: 'post',url: basePath+'/cw/jksz/find',dataType: "json", data:{subjectType:currCode},
        		success: function(data) {
        			if(data.result != 1){$.MsgBox('错误提示',data.desc);CwGrid.$("dataGrid").clear();return;};
        			for ( var int = 0; int < data.data.dataList.length; int++) {
        				CwGrid.$("dataGrid").updateRows(['cashAccount'],data.data.dataList[int]);
					}	
        		},error: ajaxError
        	});	
        }
      },
      {
        name:['otherOutTypeName','subjectCode','subjectName'],
        title:['其它出库方式','科目编码','科目名称'],
        init:function(){
    	     CwGrid.$("dataGrid").config.showAddBt = false;
    	      $("#dataGrid").hideCol("op");
	 	     CwGrid.$("dataGrid").clear();
	 		 $.request({
	 			url: basePath + '/jxc/authority/tOtherstorageClass/find?flag=1',
	 			type : "post",
	 			dataType : 'json',
	 			data:{},
	 			success:function(data){
	 				if(data.result != 1){$.MsgBox('错误提示',data.desc);return;};
	 				var rows = $.map(data.data.dataList,function(model){
	 					return {otherOutType:model.id,otherOutTypeName:model.name};
	 				});
	 				CwGrid.$("dataGrid").addRowDatas(rows);
	 				currModel.query();
	 			}
	 		});
        },
        query:function(){
          	$.request({type: 'post',url: basePath+'/cw/jksz/find',dataType: "json", data:{subjectType:currCode},
        		success: function(data) {
        			if(data.result != 1){$.MsgBox('错误提示',data.desc);CwGrid.$("dataGrid").clear();return;};
        			for ( var int = 0; int < data.data.dataList.length; int++) {
        				CwGrid.$("dataGrid").updateRows(['otherOutType'],data.data.dataList[int]);
					}	
        		},error: ajaxError
        	});	
        }
      },
      {
        name:['otherInTypeName','subjectCode','subjectName'],
        title:['其它入库方式','科目编码','科目名称'],
        init:function(){
    	     CwGrid.$("dataGrid").config.showAddBt = false;
    	      $("#dataGrid").hideCol("op");
	 	     CwGrid.$("dataGrid").clear();
	 		 $.request({
	 			url: basePath + '/jxc/authority/tOtherstorageClass/find?flag=0',
	 			type : "post",
	 			dataType : 'json',
	 			data:{},
	 			success:function(data){
	 				if(data.result != 1){$.MsgBox('错误提示',data.desc);return;};
	 				var rows = $.map(data.data.dataList,function(model){
	 					return {otherInType:model.id,otherInTypeName:model.name};
	 				});
	 				CwGrid.$("dataGrid").addRowDatas(rows);
	 				currModel.query();
	 			}
	 		});
        },
        query:function(){
          	$.request({type: 'post',url: basePath+'/cw/jksz/find',dataType: "json", data:{subjectType:currCode},
        		success: function(data) {
        			if(data.result != 1){$.MsgBox('错误提示',data.desc);CwGrid.$("dataGrid").clear();return;};
        			for ( var int = 0; int < data.data.dataList.length; int++) {
        				CwGrid.$("dataGrid").updateRows(['otherInType'],data.data.dataList[int]);
					}	
        		},error: ajaxError
        	});	
        }
      },
      {
        name:['goodsCategoryCode','goodsCategoryName','subjectCode','subjectName'],
        title:['商品分类编码','商品分类名称','科目编码','科目名称'],
        init:function(){
    	  CwGrid.$("dataGrid").config.showAddBt = true;
 	      $("#dataGrid").showCol("op");
    	  CwGrid.$("dataGrid").clear();
    	  currModel.query();
        },
        query:function(){
        	$.request({type: 'post',url: basePath+'/cw/jksz/find',dataType: "json", data:{subjectType:currCode},
        		success: function(data) {
        			if(data.result != 1){$.MsgBox('错误提示',data.desc);CwGrid.$("dataGrid").clear();return;};
        			CwGrid.$("dataGrid").addRowDatas(data.data.dataList);	
        		},error: ajaxError
        	});	
        }
      },
      {
        name:['taxItemName','subjectCode','subjectName'],
        title:['税目','科目编码','科目名称'],
        init:function(){
    	  CwGrid.$("dataGrid").config.showAddBt = false;
 	      $("#dataGrid").hideCol("op");
    	  var rows = [
    	               {taxItem:'销项税科目',taxItemName:'销项税科目'},
    	               {taxItem:'进项税科目',taxItemName:'进项税科目'}
    	               ];
    	  CwGrid.$("dataGrid").clear().addRowDatas(rows);;
    	  currModel.query();
        },
        query:function(){
          	$.request({type: 'post',url: basePath+'/cw/jksz/find',dataType: "json", data:{subjectType:currCode},
        		success: function(data) {
        			if(data.result != 1){$.MsgBox('错误提示',data.desc);CwGrid.$("dataGrid").clear();return;};
        			for ( var int = 0; int < data.data.dataList.length; int++) {
        				CwGrid.$("dataGrid").updateRows(['taxItem'],data.data.dataList[int]);
					}	
        		},error: ajaxError
        	});	
        }  
      },
      {
        name:['billsTypeName','subjectCode','subjectName'],
        title:['单据类型','科目编码','科目名称'],
        init:function(){
    	      CwGrid.$("dataGrid").config.showAddBt = false;
    	      CwGrid.$("dataGrid").$grid.setColProp("billsTypeName",{editable:false,formatter:function(v){return v;}});
	       	  CwGrid.$("dataGrid").config.showAddBt = false;
	 	      $("#dataGrid").hideCol("op");
	    	  var rows = [
	    	               {billsType:'45',billsTypeName:'零售出库单'},
	    	               {billsType:'17',billsTypeName:'收款单'},
	    	               {billsType:'16',billsTypeName:'付款单'}
	    	               ];
	    	  CwGrid.$("dataGrid").clear().addRowDatas(rows);;
	    	  currModel.query();
        },
        query:function(){
          	$.request({type: 'post',url: basePath+'/cw/jksz/find',dataType: "json", data:{subjectType:currCode},
        		success: function(data) {
        			if(data.result != 1){$.MsgBox('错误提示',data.desc);CwGrid.$("dataGrid").clear();return;};
        			for ( var int = 0; int < data.data.dataList.length; int++) {
        				CwGrid.$("dataGrid").updateRows(['billsType'],data.data.dataList[int]);
					}	
        		},error: ajaxError
        	});	
        }
      },
      {//内部收款类型科目
          name:['incomeName','subjectCode','subjectName'],
          title:['内部往来类型','科目编码','科目名称'],
          init:function(){
      	     CwGrid.$("dataGrid").config.showAddBt = false;
      	      $("#dataGrid").hideCol("op");
  	 	     CwGrid.$("dataGrid").clear();
  	 		 $.request({
  	 			url: basePath + '/jxc/funds/tpayReceiveClass/find?selStatus=0&havaYuZhi=1',
  	 			type : "post",
  	 			dataType : 'json',
  	 			data:{},
  	 			success:function(data){
  	 				if(data.result != 1){$.MsgBox('错误提示',data.desc);return;};
  	 				var rows = $.map(data.data.dataList,function(model){
  	 					return {incomeId:model.id,incomeName:model.name,incomeCode:model.code};
  	 				});
  	 				CwGrid.$("dataGrid").addRowDatas(rows);
  	 				currModel.query();
  	 			}
  	 		});
          },
          query:function(){
            	$.ajax({type: 'post',url: basePath+'/cw/jksz/find',dataType: "json", data:{subjectType:currCode},
          		success: function(data) {
          			if(data.result != 1){$.MsgBox('错误提示',data.desc);CwGrid.$("dataGrid").clear();return;};
          			for ( var int = 0; int < data.data.dataList.length; int++) {
          				CwGrid.$("dataGrid").updateRows(['incomeId'],data.data.dataList[int]);
  					}	
          		},error: ajaxError
          	});	
          }
        }
//      ,
//        {//内部收款类型科目
//            name:['incomeName','subjectCode','subjectName'],
//            title:['内部付款类型','科目编码','科目名称'],
//            init:function(){
//        	     CwGrid.$("dataGrid").config.showAddBt = false;
//        	      $("#dataGrid").hideCol("op");
//    	 	     CwGrid.$("dataGrid").clear();
//    	 		 $.request({
//    	 			url: basePath + '/jxc/funds/tpayReceiveClass/find?havaYuZhi=1',
//    	 			type : "post",
//    	 			dataType : 'json',
//    	 			data:{},
//    	 			success:function(data){
//    	 				if(data.result != 1){$.MsgBox('错误提示',data.desc);return;};
//    	 				var rows = $.map(data.data.dataList,function(model){
//    	 					return {incomeId:model.id,incomeName:model.name,incomeCode:model.code};
//    	 				});
//    	 				CwGrid.$("dataGrid").addRowDatas(rows);
//    	 				currModel.query();
//    	 			}
//    	 		});
//            },
//            query:function(){
//              	$.request({type: 'post',url: basePath+'/cw/jksz/find',dataType: "json", data:{subjectType:currCode},
//            		success: function(data) {
//            			if(data.result != 1){$.MsgBox('错误提示',data.desc);CwGrid.$("dataGrid").clear();return;};
//            			for ( var int = 0; int < data.data.dataList.length; int++) {
//            				CwGrid.$("dataGrid").updateRows(['incomeId'],data.data.dataList[int]);
//    					}	
//            		},error: ajaxError
//            	});	
//            }
//          }
	];


