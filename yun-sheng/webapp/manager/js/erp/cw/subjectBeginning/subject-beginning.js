$(function(){
	initDataGrid();
	initUI();
});

//初始化事件
function initUI(){
	$(window).resize(wResize);//注册窗口改变事件
	wResize();
}

//窗口大小改变
function wResize(){
	var winH = $(window).height();//浏览器高度
	var winW = $(window).width();//浏览器宽度
	var centerH = winH - 350;//中部高度
	if(centerH < 350){
		centerH = 350;
	}
	$(".gridBody").height(centerH);
	$("#jqGrid_balance").setGridHeight(centerH);
	$("#jqGrid_balance").setGridWidth($(window).width()-30); 
	$("#jqGrid_balance").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
}

//初始化事件
function initAssistModalEvents(){
	$("#assistModal").resize(wResizeAssistModal);//注册窗口改变事件
	wResizeAssistModal();
}

//窗口大小改变
function wResizeAssistModal(){
	var winW = $("#assistModal").width();
	$("#dataGrid2").setGridWidth(winW-1150); 
	$("#dataGrid2").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
	$(".gridType").width(50);
}

//单元格点击事件
function onCellSelect(rowid,iCol,cellContent,e){
	var rowData = $(options.TableName).jqGrid('getRowData',rowid);
	if(isPost==1 || rowData.depYeId==0){
		$(options.TableName).setGridParam({cellEdit:false});
		keepRowColor(rowData,rowid);
	}else{
		$(options.TableName).setGridParam({cellEdit:true});
	}
	
	if(rowData.ifEndSubject==0){//父级科目
		setRowCellEdit(false);
		keepRowColor(rowData,rowid);
	}else{
		setRowCellEdit(true);
	}
	
	if(rowData.partnerAccounting==1 || rowData.departmentAccounting==1 || rowData.employeeAccounting==1){//辅助核算项
		$(options.TableName).jqGrid('setColProp','periodBalance',{'editable':false});
		$('#'+rowid).removeClass("ui-row-ltr");
		$('#'+rowid).find("td").css({'background-color':'#D8E6F8'});
		if(iCol==14){//辅助核算项
			openAssistAccountingModal(rowData);
		}
	}
	rowData.ifNumAccounting==1?setNumAccountingCellEdit(true):setNumAccountingCellEdit(false);
}

//保持行颜色
function keepRowColor(rowData,rowid){
	if(rowData.partnerAccounting==1 || rowData.departmentAccounting==1 || rowData.employeeAccounting==1){// 有辅助核算项的科目
		$('#'+rowid).removeClass("ui-row-ltr");
		$('#'+rowid).find("td").css({'background-color':'#D8E6F8'});
	}else{
		$('#'+rowid).find("td").css({'background-color':'#EEEEEE'});
	}
}

//汇总并退出按钮单击事件
function sumAddQuit(){
	try {MyEiditGrid.currEditDataGrid.unAllEdit();} catch (e) {}
	var rowid=$(".sumAddQuit").data('rid');
	$('#dataGrid2').jqGrid("saveCell",lastrow,lastcell);
	$('#jqGrid_balance').jqGrid('setCell',rowid,'periodBalance',$("#dataGrid2").getCol('periodBalance',false,'sum'));
	//获取该科目辅助核算
	var objs=dataGrid2.getGridDataList();
	var rowData = $('#jqGrid_balance').jqGrid('getRowData',rowid);
	//校验辅助核算数据
	var flag=true;
	if(objs.length>0){
		$.each(objs,function(i,value){
			if(rowData.partnerAccounting==1 && value.partnerId==""){
				$.zxsaas_plus.showalert("提示","第"+(i+1)+"行往来单位不能为空!");
				flag=false;
				return;
			}
			if(rowData.departmentAccounting==1 && value.departmentId==""){
				$.zxsaas_plus.showalert("提示","第"+(i+1)+"行辅助部门不能为空!");
				flag=false;
				return;
			}
			if(rowData.employeeAccounting==1 && value.employeeId==""){
				$.zxsaas_plus.showalert("提示","第"+(i+1)+"行职员不能为空!");
				flag=false;
				return;
			}
		});
	}
	if(flag){
		$('#jqGrid_balance').jqGrid('setCell',rowid,'assistBalanceList',objs);
		calcYearNumAndYearBalance(rowid);
		calFatherSubjectNumAndAmount(rowid);
		$("#assistModal").modal("hide");
	}else{
		return;
	}
}

//设置行单元格是否可以编辑
function setRowCellEdit(flag){
	$(options.TableName).jqGrid('setColProp','accumulateBorrowAmuont',{'editable':flag});
	$(options.TableName).jqGrid('setColProp','accumulateLoanAmuont',{'editable':flag});
	$(options.TableName).jqGrid('setColProp','accumulateBorrowNum',{'editable':flag});
	$(options.TableName).jqGrid('setColProp','accumulateLoanNum',{'editable':flag});
	$(options.TableName).jqGrid('setColProp','periodNum',{'editable':flag});
	$(options.TableName).jqGrid('setColProp','periodBalance',{'editable':flag});
}

//数量核算单元格
function setNumAccountingCellEdit(flag){
	$(options.TableName).jqGrid('setColProp','accumulateBorrowNum',{'editable':flag});
	$(options.TableName).jqGrid('setColProp','accumulateLoanNum',{'editable':flag});
	$(options.TableName).jqGrid('setColProp','periodNum',{'editable':flag});
}

$(document).on("shown.bs.modal","#assistModal",function(){
	$("#dataGrid2").setGridWidth($(this).find(".modal-body").width());
});

//弹出辅助核算模态框
function openAssistAccountingModal(obj){
	initDataGrid2(obj)
	$('.tip .show').html('会计科目：' + obj.subjectName);
	$('.sumAddQuit').data('rid',obj.id);
	obj.partnerAccounting==1?$("#dataGrid2").setGridParam().showCol("partnerName"):$("#dataGrid2").setGridParam().hideCol("partnerName");
	obj.departmentAccounting==1?$("#dataGrid2").setGridParam().showCol("departmentName"):$("#dataGrid2").setGridParam().hideCol("departmentName");
	obj.employeeAccounting==1?$("#dataGrid2").setGridParam().showCol("employeeName"):$("#dataGrid2").setGridParam().hideCol("employeeName");
	$("#dataGrid2").jqGrid('clearGridData');
	var assistBalanceList=JSON.parse(obj.assistBalanceList); 
	if(assistBalanceList.length==0){
		dataGrid2.addKongRow();
	}else{
		$.each(assistBalanceList,function(i,value){
			value.periodDirection=obj.periodDirection;
			dataGrid2.addRowData(i+1,value);
		});
	}
	assistGridFootData();
	$("#assistModal").modal("show");
	initAssistModalEvents();
}


var lastcell="",lastrow="",isPost="";
/*刷新表格*/
$(document).on('click','.refresh',function(e){
	$.zxsaas_plus.showconfirm("提示","确定刷新此页面？",function(){
		reloadDataGrid();
	},function(){
	});
});

/*期初对账 弹窗*/
$(document).on('click','.checkingModal',function(e){
	var currentAccountingYear =$("#accountYearSelect").find("option:selected").text();
	var ids = $(options.TableName).jqGrid('getDataIDs');
	if(ids.length>0){
	  var currentAccountingMonth=$(options.TableName).jqGrid('getCell',ids[0],"currentAccountingMonth");
	}
	var accountTime="";
	if(currentAccountingMonth){
     currentAccountingMonth.length==2 ? accountTime=currentAccountingYear+"-"+currentAccountingMonth:accountTime=currentAccountingYear+"-0"+currentAccountingMonth;
	}
	$('.qcTime').html('对账期间：' + accountTime);
	$('.qcMain p span:first-child').replaceWith('<span></span>');
	$("#periodAndYearRecon").html("");
	$("#periodAssistRecon").html("");
	$('#checkingModal').modal('show');
});

//试算平衡按钮单击事件
$(document).on('click','.trialBalance',function(e){
	var param={};
	param.depYeId=$("#sectionId").val();
	param.currentAccountingYear=$("#accountYearSelect").find("option:selected").text();
	$.ajax({
		url: " ../../cw/qc/trialBalance",
		dataType: "json",
		type:"POST",
		contentType: "application/json",
		async:false,
		data:JSON.stringify(param),
	    success: function(data){
          if(data.result==1){
        	  showTrialBalance(data.data.rows);
          }else{
        	  $.zxsaas_plus.showalert("提示","服务器出错,请稍后重试!");
          }
       }
  });
});

//弹出试算平衡模态框
function showTrialBalance(rows){
	trialBalance('#jqGrid_trialBalance',true);
	trialBalance('#jqGrid_trialBalanceRight',false);
	$("#jqGrid_trialBalance").jqGrid('clearGridData');
	$("#jqGrid_trialBalanceRight").jqGrid('clearGridData');
	$.each(rows,function(i,value){
		if(i<2){
		  $('#jqGrid_trialBalance').jqGrid('addRowData', i+1,value, 'last' );
		  if(i==1){
			  var kongRow={subjectClassifyName:''};
			  $('#jqGrid_trialBalance').jqGrid('addRowData', i+2,kongRow, 'last' );
		  }
		}else{
		  $('#jqGrid_trialBalanceRight').jqGrid('addRowData', i+1,value, 'last' );
		}
	});
	var result="";
	var periodBalance = $('#jqGrid_trialBalance').getCol('periodBalance',false,'sum');
	var periodBalanceRight = $('#jqGrid_trialBalanceRight').getCol('periodBalance',false,'sum');
	var accumulateBorrowAmuont=Number($('#jqGrid_trialBalance').getCol('accumulateBorrowAmuont',false,'sum'))+Number($('#jqGrid_trialBalanceRight').getCol('accumulateBorrowAmuont',false,'sum'));
	var accumulateLoanAmuont=Number($('#jqGrid_trialBalance').getCol('accumulateLoanAmuont',false,'sum'))+Number($('#jqGrid_trialBalanceRight').getCol('accumulateLoanAmuont',false,'sum'));
	if(!(periodBalance==periodBalanceRight && accumulateBorrowAmuont==accumulateLoanAmuont)){
		result="不";
	}
	var name=$("#sectionName").val();
	if(name==null || name=="0" || name==""){
		name="所有部门";
	}
	$('.show').html("当前部门  :"+name+"<span style='margin-left:30px;'></span>试算结果"+result+"平衡!");
	footerDataTrialBalance();
	$('#trialBalanceModal').modal('show');
}

/*对账按钮 触发事件*/
$(document).on('click','.checking',function(e){
	var param={};
	param.currentAccountingYear=$("#accountYearSelect").find("option:selected").text();
	$.ajax({
		url: " ../../cw/qc/periodReconciliation",
		dataType: "json",
		type:"POST",
		contentType: "application/json",
		async:false,
		data:JSON.stringify(param),
	    success: function(data){
          if(data.result==1){
        	  checkResult(data.data.query);
          }else{
        	  $.zxsaas_plus.showalert("提示","服务器出错,请稍后重试!");
          }
       }
  });
	
});

//期初对账结果集
function checkResult(query){
	var yes = '<span class="glyphicon glyphicon-ok" style="color: darkgreen;margin-right: 10px;float: left;"></span>',
    no = '<span class="glyphicon glyphicon-remove" style="color: red;margin-right: 10px;float: left;"></span>';
	var periodAndYearReconResult=yes,periodAssistReconResult=yes;
	//年初+累计=期初
	var periodAndYearRecon=query.periodAndYearRecon;
	$.each(periodAndYearRecon,function(i,value){
		if(value.equalLeft !=value.equalRight){
			$("#periodAndYearRecon").append(value.subjectCode+"&nbsp;&nbsp;&nbsp;"+value.subjectName+"&nbsp;&nbsp;&nbsp;"+value.depYeName+"<br/>");
			periodAndYearReconResult=no;
		}
	});
	//科目期初与辅助期初
	var periodAssistRecon=query.periodAssistRecon;
	$.each(periodAndYearRecon,function(i,value){
		if(value.equalLeft !=value.equalRight){
			$("#periodAssistRecon").append(value.subjectCode+"&nbsp;&nbsp;&nbsp;"+value.subjectName+"&nbsp;&nbsp;&nbsp;"+value.depYeName+"<br/>");
			periodAssistReconResult=no;
		}
	});
	$('.p2 span:first-child').replaceWith(periodAndYearReconResult);
	$('.p3 span:first-child').replaceWith(periodAssistReconResult);
}


//改变会计年度下拉框
function changeAccountYear(){
	reloadDataGrid();
}

//重新加载表格
function reloadDataGrid(){
   var param={};
   param.depYeId=$("#sectionId").val();
   param.currentAccountingYear=$("#accountYearSelect").find("option:selected").text();
   $(options.TableName).jqGrid('setGridParam',{  
	  datatype:'json',  
	  postData:param
	}).trigger("reloadGrid");
}

var options = {
		LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
		LoadTableUrl: '../../cw/qc/selectSubjectBeginning',
		SaveTableUrl: '../../cw/qc/saveSubjectBeginning',
		TableName: "#jqGrid_balance", //显示表格名称。遵照css选择器书写
 };

$.jgrid.defaults.width = 1280;
$.jgrid.defaults.responsive = true;
$.jgrid.defaults.styleUI = 'Bootstrap';	

/*主表*/
function initDataGrid(){
			var lastsel='';
			var colNames = ['科目id','科目编号','科目名称','年初方向','计量单位','年初数量','年初余额','借方数量','借方累计','贷方数量','贷方累计','期初方向','期初数量','期初余额','是否数量核算','父id','往来单位核算','部门核算','职员核算','是否末级科目','辅助核算','月份','业务部门','年度'];
			var JqGridColModel=[
								{name:'id',index:'id',align:'center' ,sorttype:'int',sortable:false,key:true,hidden:true},
								{name:'subjectCode',index:'subjectCode',align:'left', sorttype:'string',sortable:false},
								{name:'subjectName',index:'subjectName',align:'left', sortable:false},
								{name:'yearDirection',index:'yearDirection',align:'center', formatter:'select', editoptions:{value:"1:借;0:贷"},sortable:false},
								{name:'unit',index:'unit', sorttype:'string',align:'center',sortable:false},
								{name:'yearNum',index:'yearNum',align:'center', sorttype:'float',formatter:"integer",sortable:false},
								{name:'yearBalance',index:'yearBalance',align:'center', sorttype:'float',formatter:"number",editable:false,sortable:false},
								{name:'accumulateBorrowNum',index:'accumulateBorrowNum',align:'center', sorttype:'float',formatter:"integer",editable:true,editoptions:{
									dataEvents:[{
										type:"blur",
										fn:function(e){
											var rex=/^(\-?)\d+(\.\d+)?$/;
											if(rex.test($(this).val())){
												calcYearNumAndYearBalance($(this).attr('rowid'));
												calFatherSubjectNumAndAmount($(this).attr('rowid'));
											}else{
												$.zxsaas_plus.showalert("提示","请输入合法数字！");
												$(this).val('');
												$(this).parent().next().html('');
											}
										}
									}]
								},sortable:false},
								{name:'accumulateBorrowAmuont',index:'accumulateBorrowAmuont',align:'center',formatter:"number",editable:true,editoptions:{
									dataEvents:[{
										type:"blur",
										fn:function(e){
											var rex=/^(\-?)\d+(\.\d{1,2})?$/;
											if(rex.test($(this).val())){
												calcYearNumAndYearBalance($(this).attr('rowid'));
												calFatherSubjectNumAndAmount($(this).attr('rowid'));
											}else{
												$.zxsaas_plus.showalert("提示","请输入合法数字！");
												$(this).val('');
											}
										}
									}]
								},sortable:false},
								{name:'accumulateLoanNum',index:'accumulateLoanNum',align:'center', sorttype:'float',formatter:"integer",editable:true,editoptions:{
									dataEvents:[{
										type:"blur",
										fn:function(e){
											var rex=/^(\-?)\d+(\.\d+)?$/;
											if(rex.test($(this).val())){
												calcYearNumAndYearBalance($(this).attr('rowid'));
												calFatherSubjectNumAndAmount($(this).attr('rowid'));
											}else{
												$.zxsaas_plus.showalert("提示","请输入合法数字！");
												$(this).val('');
												$(this).parent().next().html('');
											}
										}
									}]
								},sortable:false},
								{name:'accumulateLoanAmuont',index:'accumulateLoanAmuont',align:'center', sorttype:'float',formatter:"number",editable:true,editoptions:{
									dataEvents:[{
										type:"blur",
										fn:function(e){
											var rex=/^(\-?)\d+(\.\d{1,2})?$/;
											if(rex.test($(this).val())){
												calcYearNumAndYearBalance($(this).attr('rowid'));
												calFatherSubjectNumAndAmount($(this).attr('rowid'));
											}else{
												$.zxsaas_plus.showalert("提示","请输入合法数字！");
												$(this).val('');
											}
										}
									}]
								},sortable:false},
								{name:'periodDirection',index:'periodDirection', width:100,align:'center', sorttype:'float',formatter:'select', editoptions:{value:"1:借;0:贷"},sortable:false},
								{name:'periodNum',index:'periodNum',align:'center', sorttype:'float',formatter:"integer",editable:true,editoptions:{
									dataEvents:[{
										type:"blur",
										fn:function(e){
											var rex=/^(\-?)\d+(\.\d+)?$/;
											if(rex.test($(this).val())){
												calcYearNumAndYearBalance($(this).attr('rowid'));
												calFatherSubjectNumAndAmount($(this).attr('rowid'));
											}else{
												$.zxsaas_plus.showalert("提示","请输入合法数字！");
												$(this).val('');
												$(this).parent().next().html('');
											}
										}
									}]
								},sortable:false},
								{name:'periodBalance',index:'periodBalance',align:'center', sorttype:'float',formatter:"number",editable:true,edittype:'text',editoptions:{
									dataEvents:[{
										type:"blur",
										fn:function(e){
											var rex=/^(\-?)\d+(\.\d{1,2})?$/;
											if(rex.test($(this).val())){
												calcYearNumAndYearBalance($(this).attr('rowid'));
												calFatherSubjectNumAndAmount($(this).attr('rowid'));
											}else{
												$.zxsaas_plus.showalert("提示","请输入合法数字！");
												$(this).val('');
											}
										}
									}]
								},sortable:false},
								{name:'ifNumAccounting',index:'ifNumAccounting',align:'left', sortable:false,hidden:true},
								{name:'fatherId',index:'fatherId',hidden:true},
								{name:'partnerAccounting',index:'partnerAccounting',hidden:true},
								{name:'departmentAccounting',index:'departmentAccounting',hidden:true},
								{name:'employeeAccounting',index:'employeeAccounting',hidden:true},
								{name:'ifEndSubject',index:'ifEndSubject',hidden:true},
								{name:'assistBalanceList',index:'assistBalanceList',editable:true,formatter:formatterObj,hidden:true},
								{name:'currentAccountingMonth',index:'currentAccountingMonth',hidden:true},
								{name:'depYeId',index:'depYeId',hidden:true},
								{name:'currentAccountingYear',index:'currentAccountingYear',hidden:true}
			                ];
			
			loadtable();
			function loadtable(){
					$(options.TableName).jqGrid({
						url:options.LoadTableUrl,
						mtype:"GET",
						datatype: "json",
						jsonReader  : {	root: "data.rows",repeatitems: false},
						colNames:colNames,          
			            colModel:JqGridColModel,
			            sortable:false,			            
			            rownumbers:true,
			            rowNum:10000000,
			            cellsubmit: 'clientArray',//单元格保存内容的位置		
			            editurl: 'clientArray',
			           	cellEdit:true,
						autowidth:true,
						rownumWidth: 50, 
						shrinkToFit:true, 
						beforeEditCell:function(rowid,cellname,v,iRow,iCol){lastrow = iRow;lastcell = iCol;},
						onCellSelect:function(rowid,iCol,cellContent,e){onCellSelect(rowid,iCol,cellContent,e);},
						gridComplete:function(){
							var ids = $(options.TableName).jqGrid('getDataIDs');
							if(ids.length>0){
								$.each(ids,function(i,value){
									calFatherSubjectNumAndAmount(value);
								});
								ifHideColumn($(options.TableName).jqGrid('getCell',ids[0],"currentAccountingMonth"));
							}
						},
						loadComplete:function(data){
							$(options.TableName).jqGrid('setLabel',0, '序号');
							appendAccountYearSelect(data.data.accountYear,data.data.currentAccountingYear);
							setTableRowColor(data.data.rows);
							checkIsPost(data.data.isPost,data.data.depYeId);
							wResize();
						}
					})
			}
			//编辑框退出编辑状态
			$(window).bind('click', function saveEdit(e) {
				var rowId = $(e.target).parents("tr").attr("id");
				if (lastsel != "" && lastsel != rowId) { //用于点击其他地方保存正在编辑状态下的行
					if ($(e.target).closest(options.TableName).length == 0) { 
						$(options.TableName).jqGrid('saveRow', lastsel);						
						lastsel='';
					}
				}
			})
			
}

//拼接会计年度下拉框
function appendAccountYearSelect(accountYear,currentAccountingYear){
	$("#accountYearSelect").html("");
	 $.each(accountYear, function (i, value) {
		 if(currentAccountingYear!="" && currentAccountingYear==value){
			 $("#accountYearSelect").append("<option selected='selected'>"+value+"</option>");
		 }else{
			 $("#accountYearSelect").append("<option>"+value+"</option>");
		 }
	 });
}

//格式化对象
function formatterObj(cellvalue, options, rowObject){
	return JSON.stringify(cellvalue);
}

//1月份隐藏累计字段
function ifHideColumn(month){
	if(month==1){
		$(options.TableName).setGridParam().hideCol("accumulateBorrowNum");
		$(options.TableName).setGridParam().hideCol("accumulateBorrowAmuont");
		$(options.TableName).setGridParam().hideCol("accumulateLoanNum");
		$(options.TableName).setGridParam().hideCol("accumulateLoanAmuont");
	}
}

//设置行颜色
function setTableRowColor(rows){
	$.each(rows, function(i,value) {
		if(value.partnerAccounting==1 || value.departmentAccounting==1 || value.employeeAccounting==1){// 有辅助核算项的科目
			$('#'+value.id).css({'background-color':'#D8E6F8'});
			$('#'+value.id).find("td:eq(14)").css({'color':'#0000FF'});
		}else{
			if(value.ifEndSubject==0){//父级科目
				$('#'+value.id).css({'background-color':'#EEEEEE'});
			}
		}
	});
}

//判断是否已记账
function checkIsPost(isPost,depYeId){
	if(isPost==1){//不能修改
		$("#isPost").css({display:"block"});
		$(".btnHundred .saveData").attr("disabled","disabled");
		$("#sectionBtn").attr("disabled","disabled");
	}else{
		if(depYeId==null){
			$("#sectionId").val(null);
			$("#sectionName").val("所有部门");
			$(".btnHundred .saveData").attr("disabled","disabled");
			$("#sectionBtn").removeAttr("disabled");
		}else if(depYeId==-1){
			$("#sectionId").val(-1);
			$("#sectionBtn").attr("disabled","disabled");
		}else{
			$(".btnHundred .saveData").removeAttr("disabled");
			$("#sectionBtn").removeAttr("disabled");
		}
	}
}

//计算年初数量和年初余额
function calcYearNumAndYearBalance(rowid){
	$('#jqGrid_balance').jqGrid("saveCell",lastrow,lastcell);
	var rowData = $('#jqGrid_balance').jqGrid('getRowData',rowid);
	var yearNum = 0,yearBalance = 0; 
	if(rowData.yearDirection==1){//借方  年初＝期初+贷方－借方
		yearNum = (rowData.periodNum * 1) + (rowData.accumulateLoanNum * 1) - (rowData.accumulateBorrowNum * 1);//年初数量
		yearBalance = (rowData.periodBalance * 1) + (rowData.accumulateLoanAmuont * 1) - (rowData.accumulateBorrowAmuont * 1);//年初余额
	}else{//贷方   年初＝期初－贷方+借方
		yearNum = (rowData.periodNum * 1)-(rowData.accumulateLoanNum * 1) + (rowData.accumulateBorrowNum * 1);//年初数量
		yearBalance = (rowData.periodBalance * 1)-(rowData.accumulateLoanAmuont * 1)+(rowData.accumulateBorrowAmuont * 1);//年初余额
	}
	$('#jqGrid_balance').jqGrid('setCell',rowid,'yearNum',yearNum);
	$('#jqGrid_balance').jqGrid('setCell',rowid,'yearBalance',yearBalance);
}

//计算父级科目的数量和金额
function calFatherSubjectNumAndAmount(rowid){
	calcYearNumAndYearBalance(rowid);
	
	var currentRowData = $('#jqGrid_balance').jqGrid('getRowData',rowid);
	if(currentRowData.ifEndSubject==0 || currentRowData.fatherId==""){
		return;
	}
	var ids=$(options.TableName).jqGrid("getDataIDs");
	if(ids.length==0){
		return;
	}
	var yearNum=0,yearBalance=0,periodNum = 0,periodBalance = 0,accumulateBorrowNum = 0,accumulateBorrowAmuont = 0,accumulateLoanNum = 0,accumulateLoanAmuont = 0;
	$.each(ids,function(i,item){
		var fatherId=$(options.TableName).jqGrid('getCell',item,"fatherId");
		if(currentRowData.fatherId==fatherId){
			yearNum+=parseInt($(options.TableName).jqGrid('getCell',item,"yearNum"));
			yearBalance+=parseFloat($(options.TableName).jqGrid('getCell',item,"yearBalance"));
			periodNum+=parseInt($(options.TableName).jqGrid('getCell',item,"periodNum"));
			periodBalance+=parseFloat($(options.TableName).jqGrid('getCell',item,"periodBalance"));
			accumulateBorrowNum+=parseInt($(options.TableName).jqGrid('getCell',item,"accumulateBorrowNum"));
			accumulateBorrowAmuont+=parseFloat($(options.TableName).jqGrid('getCell',item,"accumulateBorrowAmuont"));
			accumulateLoanNum+=parseInt($(options.TableName).jqGrid('getCell',item,"accumulateLoanNum"));
			accumulateLoanAmuont+=parseFloat($(options.TableName).jqGrid('getCell',item,"accumulateLoanAmuont"));
		}
	})
	$(options.TableName).jqGrid('setCell',currentRowData.fatherId,"yearNum",yearNum);
	$(options.TableName).jqGrid('setCell',currentRowData.fatherId,"yearBalance",yearBalance);
	$(options.TableName).jqGrid('setCell',currentRowData.fatherId,"periodNum",periodNum);
	$(options.TableName).jqGrid('setCell',currentRowData.fatherId,"periodBalance",periodBalance);
	$(options.TableName).jqGrid('setCell',currentRowData.fatherId,"accumulateBorrowNum",accumulateBorrowNum);
	$(options.TableName).jqGrid('setCell',currentRowData.fatherId,"accumulateBorrowAmuont",accumulateBorrowAmuont);
	$(options.TableName).jqGrid('setCell',currentRowData.fatherId,"accumulateLoanNum",accumulateLoanNum);
	$(options.TableName).jqGrid('setCell',currentRowData.fatherId,"accumulateLoanAmuont",accumulateLoanAmuont);
}

//保存按钮单击事件
function saveData(){
	var ids = $(options.TableName).jqGrid('getDataIDs');
	if(ids.length==0){
		$.zxsaas_plus.showalert("提示","没有数据！");
		return;
	}
	 var param=getSaveParam(ids);
	 var depYeId=$("#sectionId").val();
	 var currentAccountingYear =$("#accountYearSelect").find("option:selected").text();
	 $.ajax({
		url: "../../cw/qc/saveSubjectBeginning/"+currentAccountingYear+"/"+depYeId,
		dataType: "json",
		type:"POST",
		contentType: "application/json",
		data:JSON.stringify(param),
	    success: function(data) {
		   if(data.result==1){
			   $.zxsaas_plus.showalert("提示",data.desc);
		   }
	   }
   });
}

//获取保存参数
function getSaveParam(ids){
	var array=new Array();
	$.each(ids,function(i,item){
		var obj=$(options.TableName).jqGrid('getRowData',item);
		if(obj.assistBalanceList=="" || obj.assistBalanceList==null || obj.assistBalanceList==undefined || obj.assistBalanceList.length==2){
			delete obj.assistBalanceList;
		}else{
			if(! jQuery.isArray(obj.assistBalanceList)){
				obj.assistBalanceList=JSON.parse(obj.assistBalanceList);
			}
		}
		
		if(obj.currentAccountingMonth==1 && obj.ifEndSubject==1){//1月份,只保存末级科目
			if(!(obj.periodNum ==0 && obj.periodBalance =="0.00")){
				array.push(obj);
			}
		}
		
		if(obj.currentAccountingMonth !=1 && obj.ifEndSubject==1){//1月份,只保存末级科目
			if(!(obj.periodNum ==0 && obj.periodBalance =="0.00" 
				&& obj.yearNum ==0 && obj.yearBalance =="0.00" 
				&& obj.accumulateBorrowNum ==0 && obj.accumulateBorrowAmuont =="0.00" 
				&& obj.accumulateLoanNum ==0 && obj.accumulateLoanAmuont =="0.00")){
				
				array.push(obj);
			}
		}
		
	})
	return array;
}


// 快速定位
$(document).on('keyup','#searchText',function(e){
	var searchText = $(this).val().trim();
	var tObj = document.getElementById('jqGrid_balance');
	var rowLens = tObj.rows.length;//长度
	var flag = true;
	for(var i = 0;i<rowLens;i++){
		var rText1 = tObj.rows[i].cells[2].innerHTML;//科目编号
		var rText2 = tObj.rows[i].cells[3].innerHTML;//科目名称
		//var color = tObj.rows[i].style.backgroundColor;
		var top = (i-1) * 36 + 'px';
		if(flag){
			if(searchText != '' && (rText1.match(searchText) || rText2.match(searchText))){
				//tObj.rows[i].style.backgroundColor = 'lightgray';
				$(".ui-jqgrid-bdiv").animate({scrollTop:top},"slow"); //定位tr 
				flag = false;
			}
		}
	}
});


//辅助核算期初余额表格
var dataGrid2 = null;
function initDataGrid2(obj){
	//配置
	var paras = {
	    gridId:'dataGrid2', 
	    addRow:{partnerId:'',departmentId:'',employeeId:'',periodDirection:obj.periodDirection,periodBalance:''},
	    colNames:['往来单位id', '往来单位','辅助部门id', '辅助部门','职员id','职员','方向','金额'],
	    colModel:
	    	[
           {name : 'partnerId',index : 'partnerId',align:'left',sortable: false,hidden: true,editable:false}, 
           {name : 'partnerName',index : 'partnerName',sortable: false,align:'center',edittype:'custom_bt_input',custom_element_bt_click:"showContactunitModal",editable:true},
           {name : 'departmentId',index : 'departmentId',align:'left',sortable: false,hidden: true},
           {name : 'departmentName',index : 'departmentName',sortable: false,align:'center',edittype:'custom_bt_input',custom_element_bt_click:"showSectionModal",editable:true},
           {name : 'employeeId',index : 'employeeId',align:'left',editable:true,sortable: false,hidden: true},
           {name : 'employeeName',index : 'employeeName',sortable: false,align:'center',edittype:'custom_bt_input',custom_element_bt_click:"showEmployeeModal",editable:true},
           {name : 'periodDirection',index : 'periodDirection',align:'center',editable:false,width:80,sortable: false,formatter:formatterDirection},
           {name : 'periodBalance',index : 'periodBalance',align:'center',editable:true,sortable: false,formatter:"number"}
         ],
		width:"100%",
		autowidth:true,
		shrinkToFit: false,
	};
	//回调函数
	var callBackList = {
	  afterEditCell:function(rowid,name,val,iRow,iCol){//开始编辑
		lastrow = iRow;
	    lastcell = iCol;
      },
      afterSaveCell:function(rowid,name,val,iRow,iCol){//保存编辑
    	  lastrow = iRow;
		  lastcell = iCol;
      },
      summary:function(rowid,name,val,iRow,iCol){//统计处理
    	  assistGridFootData();
      },
      getGridDataList:function(rows){
    	  //筛出不合格行
        	return $.map(rows,function(row){
        		if(row.periodBalance!="0.00"){
        			delete row["op"];
    	        	delete row["operate"];
    	        	delete row["periodDirection"];
      				return row;
        		}
        	});
      }
	};
	dataGrid2 = new MyEiditGrid(paras,callBackList);
}


//辅助核算页脚合计
function assistGridFootData(){
	var periodBalance = $("#dataGrid2").getCol('periodBalance',false,'sum');
	$("#dataGrid2").jqGrid('footerData','set',{
        "periodBalance": periodBalance,
        }
	);
}

/*试算平衡弹窗*/
function trialBalance(tName,flag){
		var options = {
			  TableName: tName
			};
			var colNames = ['id','科目类型','借方发生','贷方发生','方向','余额'];
			var JqGridColModel=[
                                {name:'id',index:'id', width:100,align:'center', sorttype:'string',editable:false,hidden:true},
								{name:'subjectClassifyName',index:'subjectClassifyName', width:100,align:'center', sorttype:'string',editable:false,sortable:false},
								{name:'accumulateBorrowAmuont',index:'accumulateBorrowAmuont', width:100,align:'center', sorttype:'string',editable:false,sortable:false,formatter:"number"},
								{name:'accumulateLoanAmuont',index:'accumulateLoanAmuont', width:100,align:'center', sorttype:'string',editable:false,sortable:false,formatter:"number"},
								{name:'periodDirection',index:'periodDirection', width:100,align:'center', sorttype:'string',editable:false,sortable:false,formatter:formatterDirection},
								{name:'periodBalance',index:'periodBalance', width:100,align:'center', sorttype:'float',formatter:"number",editable:false,sortable:false}
			                ];
			
			loadtable();
			function loadtable(){
					$(options.TableName).jqGrid({
						mtype:"GET",
						datatype: "local",
						colNames:colNames,          
			            colModel:JqGridColModel,
			            sortable:false,			            
			            rownumbers:flag,
			            width: "100%" ,
						autowidth:true,
						rownumWidth:40, 
						shrinkToFit:false, 
						footerrow:true,  //设置表格显示表脚
    		 			userDataOnFooter:true,
						loadComplete:function(data){
							$(options.TableName).jqGrid('setLabel',0, '序号');
						}
					})
			}
}

/*修改表格底部*/
function footerDataTrialBalance(){			
	var periodBalance = $('#jqGrid_trialBalance').getCol('periodBalance',false,'sum');
	var periodBalanceRight = $('#jqGrid_trialBalanceRight').getCol('periodBalance',false,'sum');
	$('#jqGrid_trialBalance').jqGrid('footerData','set',{
		"subjectClassifyName":"合计",
        "periodBalance": periodBalance
         }
	);
	$('#jqGrid_trialBalanceRight').jqGrid('footerData','set',{
		"subjectClassifyName":"合计",
        "periodBalance": periodBalanceRight
        }
	);
}

function formatterDirection(cellvalue, options, rowObject){
	if(cellvalue==1){
		return "借方";
	}else if(cellvalue==0){
		return "贷方";
	}else{
		return "";
	}
}
