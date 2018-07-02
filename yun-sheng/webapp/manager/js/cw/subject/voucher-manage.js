$(function(){
	//初始化对象
	assistBalanaceTableQuery = new AssistBalanaceTableQuery(basePath);
	voucherManage = new VoucherManage(basePath);
//	findFAccInit();
	initDataGrid();
	initUserName();
	partnerInit();
	departmentInit();
	employeesInit();
	initTab();
});


/**********************************会计期间*********************************/
//function findFAccInit(){
//	$("#minYearAndMon").html("");
//	$("#maxYearAndMon").html("");
//	var myDate = new Date();
//	var dateStr = myDate.getFullYear(); //获取完整的年份(4位,1970-????)
//	dateStr += '.'+(myDate.getMonth()+1); //获取当前月份(0-11,0代表1月)
//	voucherManage.findFAcc(12, function(data){
//		var dataList = data.data.rows;
//		for(var i = 0;i < dataList.length;i++){	
//			var obj = dataList[i];
//			var dateStr2 = obj.currentAccountingYear+'.'+obj.currentAccountingMonth;
//			var checkHtml='<option value='+obj.currentAccountingYear+'.'+obj.currentAccountingMonth+'>'+obj.currentAccountingYear+'.'+obj.currentAccountingMonth+'</option>';
//			$("#minYearAndMon").append(checkHtml);
//			$("#maxYearAndMon").append(checkHtml);
//			if(dateStr2 == dateStr){
//				$("#minYearAndMon option").attr('selected',true);
//			}
//			if(dateStr2 == dateStr){
//				$("#maxYearAndMon option").attr('selected',true);
//			}
//		}
//	});
//}

/**********************************用户名*********************************/
function initUserName(){
	voucherManage.selectUserName(function(data){
		var dataList = data.data.rows;
		for(var i = 0;i < dataList.length;i++){
			var obj = dataList[i];
			var checkHtml='<option value='+obj.id+'>'+obj.userName+'</option>';
			$("#createId").append(checkHtml);
			$("#bookKeeperId").append(checkHtml);
			$("#auditorId").append(checkHtml);
			$("#cashierId").append(checkHtml);
			
		}
	});
}

/*******************************部门*******************************/
function departmentInit(){
	$("#departmentHeader").html("");
	assistBalanaceTableQuery.getdepartmentForAssist(function(data){
		var dataList = data.data.rows;
		for(var i = 0;i < dataList.length;i++){	
			var obj = dataList[i];
			var checkHtml='<option value='+obj.departmentId+'>'+obj.departmentCode+'.'+obj.departmentName+'</option>';
			$("#departmentIdStr").append(checkHtml);
		}
	});
}

/*******************************个人*******************************/
function employeesInit(){
$("#employeeHeader").html("");
assistBalanaceTableQuery.getEmployeesForAssist(function(data){
	var dataList = data.data.rows;
	for(var i = 0;i < dataList.length;i++){	
		var obj = dataList[i];
		var checkHtml='<option value='+obj.employeeId+'>'+obj.employeeCode+'.'+obj.employeeName+'</option>';
		$("#employeeIdStr").append(checkHtml);
	}
});
}

/*******************************往来单位****************************/
function partnerInit(){
	$("#partnerheader").html("");
	assistBalanaceTableQuery.getPartnerForAssist(function(data){
		var dataList = data.data.rows;
		for(var i = 0;i < dataList.length;i++){	
			var obj = dataList[i];
			var checkHtml='<option value='+obj.partnerId+'>'+obj.partnerCode+'.'+obj.partnerName+'</option>';
			$("#partnerIdStr").append(checkHtml);
		}
	});
}

/**
 * @author XiangRui
 * @note 打开科目参照对话框
 * @return
 */
var callBack;
function selectReferenceOpen(name){
	$('#subjectReferenceModal').modal('show');
	callBack = function(){
		var subject = arguments[0];
		$("#"+name).val($.map(subject,function(obj){return obj.subjectCode;}).join(";"));
		$("#subjectCodeStr").val($.map(subject,function(obj){return obj.subjectCode;}).join(","));
		$('#subjectReferenceModal').modal('hide');
	}; 
}

/**********************************初始化表格*********************************/
function initDataGrid(){
	//凭证号
	function formatterInNo(cellvalue, options, rowObject){
		if(cellvalue == 0 || cellvalue == null || cellvalue == ""){
			return "";
		}else{
			return rowObject.docWordId+""+ ( "0000000000000000" + cellvalue ).substr( -6 );
		}
	}	
	//金额
//	function formatterAmuont(cellvalue, options, rowObject){
//		if(cellvalue == 0){
//			return "";
//		}else{
//			return $.formatFloat(cellvalue,2);
//		}
//	}
	
	$.jgrid.gridUnload("voucherManageData");
	$.jgrid.defaults.width = 1280;
	$.jgrid.defaults.responsive = true;
	$.jgrid.defaults.styleUI = 'Bootstrap';	
	jQuery("#voucherManageData").jqGrid({
		url: basePath + '/cw/pz/get/voucherManageData/'+initCompanyId+'/'+initGroupId,
        datatype : "json",
        height: $(window).height()*0.615,
		  colNames:['序号', '制单日期', '凭证字号','凭证总金额','审核人','制单人','摘要','科目编码','科目名称','辅助项','借方','贷方',
		            '集团id','公司id','年份','月份','字','部门id','个人id','单价','借方个数','贷方个数','科目id','是否现金流量'
		            ],
          colModel:[
           {name:'index',						index:'index',						 		align:'center', sorttype:"int"},
           {name:'createTimeStr',				index:'createTimeStr',			width:150, 	align:"left"},
           {name:'inNo',						index:'inNo', 					width:150, 	align:"left",},
           {name:'accuntAmuont',				index:'accuntAmuont', 			width:150, 	align:"left",},
           {name:'auditorName',					index:'auditorName', 			width:150, 	align:"left",},
           {name:'createName',					index:'createName', 			width:150, 	align:"left",},
           {name:'summary',						index:'summary', 				width:150,	align:"right",},
           {name:'subjectCode',					index:'subjectCode', 			width:150,	align:"right",},    
           {name:'subjectName',					index:'subjectName', 			width:150,	align:"right",}, 
           {name:'contactsUnitName',			index:'contactsUnitName', 		width:150,	align:"right",}, 
           {name:'borrowCurrency',				index:'borrowCurrency', 		width:150,	align:"right",}, 
           {name:'loanCurrency',				index:'loanCurrency', 			width:150,	align:"right",},
           //隐藏字段
           
           {name : 'groupId',index : 'groupId',hidden: true},
           {name : 'companyId',index : 'companyId',hidden: true},
           {name : 'year',index : 'year',hidden: true},
           {name : 'month',index : 'month',hidden: true},
           {name : 'docWordId',index : 'docWordId',hidden: true},
           {name : 'departmentId',index : 'departmentId',hidden: true},
           {name : 'employeeId',index : 'employeeId',hidden: true},
           {name : 'price',index : 'price',hidden: true},
           {name : 'borrowNum',index : 'borrowNum',hidden: true},
           {name : 'loanNum',index : 'loanNum',hidden: true},
           {name : 'subjectId',index : 'subjectId',hidden: true},
           {name : 'cashFlowedState',index : 'cashFlowedState',hidden: true},
         ],
         shrinkToFit:true,
         pager: "#gridpager",
         jsonReader: {
             root: "rows",
             page: "page",
             total: "total",
             records: "records",
             repeatitems: false
         },
         mtype: "POST",
         viewrecords: true,
         autowidth : true,
         multiselect : false,
         multiboxonly : true,
         forceFit:true,
         width:$(window).width()*0.9,
         postData:accountSelect(),
         footerrow:true,  //设置表格显示表脚
		 userDataOnFooter:true,//设置userData 显示在footer里
		 multiselect: true,
//		 onSelectRow: function (rowId, status, e) {       
//		         var rowIds = jQuery("#voucherManageData").jqGrid('getGridParam', 'selarrrow');  
//		         if(rowIds.length==1){
//		        	 var rowid=$("#voucherManageData").jqGrid("getGridParam","selrow");
//		        	 $("#voucherManageData").panGrid("downlayer",{"rowid":rowid});
//		        	 }else{
//		        		 alert("你没有选取或者选取为多行数据，不允许进入下一级");
//		        	 }
//		         var i = 0;
//		 },
		 loadComplete: function(xhr) {  
             var rowNum = parseInt($(this).getGridParam("records"), 10);  
             if (rowNum <= 0) {  
//                 alert("没有符合条件的记录！");  
             }  
         } 
	});
}

/*******************************删除键*******************************/
function delWholeInput(obj) {
    evt = event || window.event;
    if (evt.keyCode.toString() == "8" || evt.keyCode.toString() == "46" ){
        $("#"+obj.id).val("");       
    }
}

/**********************************获取查询条件*********************************/
function accountSelect(param){
	var postData = $("#voucherManageData").jqGrid("getGridParam", "postData");
    $.each(postData, function (k, v) {
        delete postData[k];
    });
    var paras = new Object();
    //会计日期
    paras.minYear = $("#minYearAndMon").val().split(".")[0];
    paras.minMonth = $("#minYearAndMon").val().split(".")[1];
    paras.maxYear = $("#maxYearAndMon").val().split(".")[0];
    paras.maxMonth = $("#maxYearAndMon").val().split(".")[1];
    //制单日期
    paras.minCreateDateStr = $("#minCreateDateStr").val();
    paras.maxCreateDateStr = $("#maxCreateDateStr").val();
    //摘要
    paras.summary = $("#summary").val();
    //科目编码
	paras.subjectCode = $("#subjectCode").val();
    //金额
	paras.minMoney = $("#minMoney").val();
	paras.maxMoney = $("#maxMoney").val();
	//凭证编号
	paras.minInNo = $("#minInNo").val();
	paras.maxInNo = $("#maxInNo").val();
	//来源类型
	paras.docSourceType = $("#docSourceType").val();
	//记账状态
	paras.isPost = $("#isPost").val();
	//审核状态
	paras.auditorStu = $("#auditorStu").val();
	//制单人
	paras.createId = $("#createId").val();
	//方向
	paras.fangxiang = $("#fangxiang").val();
	//科目名称
	paras.subjectName = $("#subjectName").val();
	//记账人
	paras.bookKeeperId = $("#bookKeeperId").val();
	//审核人
	paras.auditorId = $("#auditorId").val();
	//出纳
	paras.cashierId = $("#cashierId").val();
	//错误
	paras.makeErrorState = $("#makeErrorState").val();
	//作废
	paras.invalidateState = $("#invalidateState").val();
	//现金流量分配
	paras.cashFlowedState = $("#cashFlowedState").val();
	//出纳签字状态
	paras.cashierStu = $("#cashierStu").val();
	//部门
	paras.departmentIdStr = $("#departmentIdStr").val();
	//个人
	paras.employeeIdStr = $("#employeeIdStr").val();
	//往来单位
	paras.partnerIdStr = $("#partnerIdStr").val();
	//tab选项卡
	paras.param = param;
	
    return paras;
}

/***************************选项卡********************************/
function initTab(){
	$('#tabs').tabs({
	    border:false,
	    onSelect:function(title,index){
			// #这里写你要怎么处理这个选中的tab
			accountSumbit(index);
	    }
	});
}

/**********************************条件提交*************************************/
function accountSumbit(param){
	$("#voucherManageData").jqGrid("setGridParam", { postData: accountSelect(param),page:1}).trigger("reloadGrid");
}


/************************审核/弃审*****************************/
function audit(param){
	var selectedIds = $("#voucherManageData").jqGrid("getGridParam", "selarrrow");
	var arr = new Array();
	if(selectedIds.length >= 1){
		for(var i = 0;i<selectedIds.length;i++){
			var rowData = $("#voucherManageData").jqGrid("getRowData", selectedIds[i]);
			arr.push(rowData);
			voucherManage.audit(param,arr,function(data){
				var obj = data.data.row;
				if(param == 1){
					switch (obj) {
					case 0:alert('数据检查不通过!');
						break;
					case 1:alert('审核通过!');location.replace(document.referrer);
						break;
					case 3:alert('记账了 或者 已审核不用再审核了!');
						break;
					default:
						alert("审核失败!");
						break;
					}
				}else{
					switch (obj) {
					case 0:alert('数据检查不通过!');
						break;
					case 1:alert('弃审通过!');location.replace(document.referrer);
						break;
					case 4:alert('未审核不能弃审!');
						break;
					default:
						alert("弃核失败!");
						break;
					}
				}
				
			});
		}
	}else{
		alert('请选择至少一行数据！'); 
	}
}

/************************标错/取消标错*****************************/
function makeError(param){
	var selectedIds = $("#voucherManageData").jqGrid("getGridParam", "selarrrow");
	var arr = new Array();
	if(selectedIds.length >= 1){
		for(var i = 0;i<selectedIds.length;i++){
			var rowData = $("#voucherManageData").jqGrid("getRowData", selectedIds[i]);
			arr.push(rowData);
			voucherManage.makeError(param,arr,function(data){
				var obj = data.data.row;
				if(param == 1){
					switch (obj) {
					case 0:alert('标错失败!');
						break;
					case 1:alert('标错成功!');location.replace(document.referrer);
						break;
					case 3:alert('已经标错了!');
						break;
					default:
						alert("标错失败!");
						break;
					}
				}else{
					switch (obj) {
					case 0:alert('标错失败!');
						break;
					case 1:alert('取消标错成功!');location.replace(document.referrer);
						break;
					case 4:alert('没有标错不需要取消!');
						break;
					default:
						alert("标错失败!");
						break;
					}
				}
			});
		}
	}else{
		alert('请选择至少一行数据！'); 
	}
}

/************************主管签字/取消主管签字*****************************/
function supervisorAudit(param){
	var selectedIds = $("#voucherManageData").jqGrid("getGridParam", "selarrrow");
	var arr = new Array();
	if(selectedIds.length >= 1){
		for(var i = 0;i<selectedIds.length;i++){
			var rowData = $("#voucherManageData").jqGrid("getRowData", selectedIds[i]);
			arr.push(rowData);
			voucherManage.supervisorAudit(param,arr,function(data){
				var obj = data.data.row;
				if(param == 1){
					switch (obj) {
					case 0:alert('主管签字失败!');
						break;
					case 1:alert('主管签字成功!');location.replace(document.referrer);
						break;
					case 3:alert('主管已签字!');
						break;
					default:
						alert("签字失败!");
						break;
					}
				}else{
					switch (obj) {
					case 0:alert('主管签字失败!');
						break;
					case 1:alert('主管签字成功!');location.replace(document.referrer);
						break;
					case 4:alert('主管未签字，不需要取消!');
						break;
					default:
						alert("签字失败!");
						break;
					}
				}
			});
		}
	}else{
		alert('请选择至少一行数据！'); 
	}
}
