$(function(){
	loadmodal();
});
var lastcell="",lastrow="";
/*刷新表格*/
$(document).on('click','.refresh',function(e){
	$("#jqGrid_balance").trigger("reloadGrid");
});

/*期初对账 弹窗*/
$(document).on('click','.checkingModal',function(e){
	var qj = '2016-11';
	$('.qcTime').html('对账期间：' + qj);
	$('.qcMain p span:first-child').replaceWith('<span></span>');
	$('#checkingModal').modal('show');
});

/*试算平衡*/
$(document).on('click','.trialBalance',function(e){
	trialBalance('../../json/cw/trial.json','#jqGrid_trialBalance','jqGridPager_trialBalance',true);
	trialBalance('../../json/cw/trial.json','#jqGrid_trialBalanceRight','jqGridPager_trialBalanceRight',false);
	if(true){
		$('.show').html('试算结果平衡!');
	}
	$('#trialBalanceModal').modal('show');
});

/*对账按钮 触发事件*/
$(document).on('click','.checking',function(e){
	var yes = '<span class="glyphicon glyphicon-ok" style="color: darkgreen;margin-right: 10px;float: left;"></span>',
	    no = '<span class="glyphicon glyphicon-remove" style="color: red;margin-right: 10px;float: left;"></span>';
	$('.p1 span:first-child').replaceWith(yes);
	$('.p2 span:first-child').replaceWith(yes);
	$('.p3 span:first-child').replaceWith(no);
	$('.p4 span:first-child').replaceWith(yes);
	
});

/*主表*/
function loadmodal()
		{
		var options = {
			LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
			LoadTableUrl: '../../json/cw/startBalance.json',
			TableName: "#jqGrid_balance", //显示表格名称。遵照css选择器书写
	//		pager:"#jqGridPager"
			};
			$.jgrid.defaults.width = 1280;
			$.jgrid.defaults.responsive = true;
			$.jgrid.defaults.styleUI = 'Bootstrap';	
			var lastsel='';
			var mydata;
			var hid=false;
			var lock=false;
			var myobj=[];
			var colNames = ['ID','科目编号','科目名称','年初方向','计量单位','年初数量','年初余额','借方数量','借方累计','贷方数量','贷方累计','期初方向','期初数量','期初余额','是否有辅助核算项','是否父类'];
			var JqGridColModel=[
								{name:'id',index:'id', width:200,align:'center', sorttype:'int',hidden:true,sortable:false},
								{name:'subjectNo',index:'subjectNo', width:100,align:'left', sorttype:'string',sortable:false},
								{name:'subjectName',index:'subjectName', width:200,align:'center', sortable:false},
								{name:'startF',index:'startF', width:100,align:'center', formatter:'select', editoptions:{value:"0:借;1:贷;2:平"},sortable:false},
								{name:'unit',index:'unit', sorttype:'string', width:100,align:'center',sortable:false},
								{name:'startNumber',index:'startNumber', width:100,align:'center', sorttype:'float',formatter:"integer",sortable:false},
								{name:'startMoney',index:'startMoney', width:100,align:'center', sorttype:'float',formatter:"number",editable:false,sortable:false},
								{name:'borrowNumber',index:'borrowNumber', width:100,align:'center', sorttype:'float',formatter:"integer",editable:true,editoptions:{
									dataEvents:[{
										type:"blur",
										fn:function(e){
											var rex=/^[0-9]{0,12}$/;
											if(rex.test($(this).val())){
												calcMain($(this).attr('rowid'));
												parentCalc();
											}else{
												$.zxsaas_plus.showalert("提示","请输入合法数字！");
												$(this).val('');
												$(this).parent().next().html('');
											}
										}
									}]
								},sortable:false},
								{name:'borrowMoney',index:'borrowMoney', width:100,align:'center',formatter:"number",editable:true,editoptions:{
									dataEvents:[{
										type:"blur",
										fn:function(e){
											var rex=/^[0-9]*\.{0,1}[0-9]{0,2}$/;
											if(rex.test($(this).val())){
												calcMain($(this).attr('rowid'));
												parentCalc();
											}else{
												$.zxsaas_plus.showalert("提示","请输入合法数字！");
												$(this).val('');
											}
										}
									}]
								},sortable:false},
								{name:'loanNumber',index:'discountAmount', width:100,align:'center', sorttype:'float',formatter:"integer",editable:true,editoptions:{
									dataEvents:[{
										type:"blur",
										fn:function(e){
											var rex=/^[0-9]{0,12}$/;
											if(rex.test($(this).val())){
												calcMain($(this).attr('rowid'));
												parentCalc();
											}else{
												$.zxsaas_plus.showalert("提示","请输入合法数字！");
												$(this).val('');
												$(this).parent().next().html('');
											}
										}
									}]
								},sortable:false},
								{name:'loanMoney',index:'loanMoney', width:100,align:'center', sorttype:'float',formatter:"number",editable:true,editoptions:{
									dataEvents:[{
										type:"blur",
										fn:function(e){
											var rex=/^[0-9]*\.{0,1}[0-9]{0,2}$/;
											if(rex.test($(this).val())){
												calcMain($(this).attr('rowid'));
												parentCalc();
											}else{
												$.zxsaas_plus.showalert("提示","请输入合法数字！");
												$(this).val('');
											}
										}
									}]
								},sortable:false},
								{name:'qcF',index:'qcF', width:100,align:'center', sorttype:'float',formatter:'select', editoptions:{value:"0:借;1:贷;2:平"},sortable:false},
								{name:'qcNumber',index:'qcNumber', width:100,align:'center', sorttype:'float',formatter:"integer",editable:true,editoptions:{
									dataEvents:[{
										type:"blur",
										fn:function(e){
											var rex=/^[0-9]{0,12}$/;
											if(rex.test($(this).val())){
												calcMain($(this).attr('rowid'));
												parentCalc();
											}else{
												$.zxsaas_plus.showalert("提示","请输入合法数字！");
												$(this).val('');
												$(this).parent().next().html('');
											}
										}
									}]
								},sortable:false},
								{name:'qcMoney',index:'qcMoney', width:100,align:'center', sorttype:'float',formatter:"number",editable:true,edittype:'text',editoptions:{
									dataEvents:[{
										type:"blur",
										fn:function(e){
											var rex=/^[0-9]*\.{0,1}[0-9]{0,2}$/;
											if(rex.test($(this).val())){
												calcMain($(this).attr('rowid'));
												parentCalc();
											}else{
												$.zxsaas_plus.showalert("提示","请输入合法数字！");
												$(this).val('');
											}
										}
									}]
								},sortable:false},
								{name:'assist',index:'assist', width:100,align:'center', sorttype:'float',hidden:true,sortable:false},
								{name:'parentFlag',index:'parentFlag', width:100,align:'center', sorttype:'float',hidden:true,sortable:false}
			                ];
			
			loadtable();
			function loadtable(){
					$(options.TableName).jqGrid({
						url:options.LoadTableUrl,
						mtype:"GET",
						datatype: "json",
						//datatype: "local",
						jsonReader  : {	
								root: "rows",
								repeatitems: false
									},
						colNames:colNames,          
			            colModel:JqGridColModel,
			            sortable:false,			            
			            rownumbers:true,
			            cellsubmit: 'clientArray',//单元格保存内容的位置		
			            editurl: 'clientArray',
			            //pager:options.pager,
			            viewrecords: true,		           
			           	cellEdit:true,
			           	rowNum:10000000,
			            width: "100%" ,
			            height: $(window).height()*0.65,
						autowidth:true,
						rownumWidth: 35, 
						shrinkToFit:false, 
						ondblClickRow:function(id){
						//双击进入编辑
			   				var delid = id;
			   				
						},
						beforeEditCell:function(rowid,cellname,v,iRow,iCol){
							lastrow = iRow;
							lastcell = iCol;
						},
						onCellSelect:function(id,index,e){
							var colName=$(options.TableName).jqGrid('getGridParam','colModel')[index].name;
							var rowData = $(options.TableName).jqGrid('getRowData',id);
							if(rowData.assist == '1'){
								//$(options.TableName).editRow(id,false);//行不可编辑
								$(options.TableName).jqGrid('setColProp','qcMoney',{'editable':false});
							}else{
								$(options.TableName).jqGrid('setColProp','qcMoney',{'editable':true});
							}
							if(rowData.parentFlag == '1'){
								$(options.TableName).jqGrid('setColProp','borrowNumber',{'editable':false});
								$(options.TableName).jqGrid('setColProp','borrowMoney',{'editable':false});
								$(options.TableName).jqGrid('setColProp','loanNumber',{'editable':false});
								$(options.TableName).jqGrid('setColProp','loanMoney',{'editable':false});
								$(options.TableName).jqGrid('setColProp','qcNumber',{'editable':false});
								$(options.TableName).jqGrid('setColProp','qcMoney',{'editable':false});
							}else{
								$(options.TableName).jqGrid('setColProp','borrowNumber',{'editable':true});
								$(options.TableName).jqGrid('setColProp','borrowMoney',{'editable':true});
								$(options.TableName).jqGrid('setColProp','loanNumber',{'editable':true});
								$(options.TableName).jqGrid('setColProp','loanMoney',{'editable':true});
								$(options.TableName).jqGrid('setColProp','qcNumber',{'editable':true});
								$(options.TableName).jqGrid('setColProp','qcMoney',{'editable':true});
							}
						},
						onSelectRow:function(id){
							
						},
						
						gridComplete: function() {
							
						},
						loadComplete:function(data){
							$(options.TableName).jqGrid('setLabel',0, '序号');
							var no = [];
							$.each(data.rows, function() {
								if(arguments[1].assist == '1'){// 有辅助核算项的科目
									$('#'+arguments[1].id).css({'background-color':'#D8E6F8'});
									$('#'+arguments[1].id).find("td:eq(14)").attr({'onclick':'moneyModal(this)',"data-rId":arguments[1].id}).css({'color':'#0000FF'});
									//$(options.TableName).editRow(arguments.id,false);
								}
								no.push(arguments[1].subjectNo);//存放科目编号
								//calcMain(arguments[1].id);
							});
							
							for(var i = 0,len = no.length;i<len;i++){
								if(no[i+1] != undefined){
									if(no[i+1].substring(0,no[i].length) == no[i]){
										$.each(data.rows, function() {
											if(arguments[1].subjectNo == no[i]){// 
												$(options.TableName).jqGrid('setCell',arguments[1].id,'parentFlag','1');//parentFlag为1  表示父类
												$('#'+arguments[1].id).css({'background-color':'#EEEEEE'});
											}
										});
									}
								}
							}
							parentCalc();//父类合计
							
						}
						})
			}
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

/*主表计算*/
function calcMain(rid){
	$('#jqGrid_balance').jqGrid("saveCell",lastrow,lastcell);
	var rData = $('#jqGrid_balance').jqGrid('getRowData',rid);
	var startNum = 0,startMon = 0;
	if(rData.qcF == '0'){//借
		startNum = (rData.qcNumber * 1) + (rData.loanNumber * 1) - (rData.borrowNumber * 1);//年初数量
		startMon = (rData.qcMoney * 1) + (rData.loanMoney * 1) - (rData.borrowMoney * 1);//年初余额
	}else{//贷
		startNum = (rData.qcNumber * 1) - (rData.loanNumber * 1) + (rData.borrowNumber * 1);//年初数量
		startMon = (rData.qcMoney * 1) - (rData.loanMoney * 1) + (rData.borrowMoney * 1);//年初余额
	}
	$('#jqGrid_balance').jqGrid('setCell',rid,'startNumber',startNum);
	$('#jqGrid_balance').jqGrid('setCell',rid,'startMoney',startMon);
}

/*辅助核算期初*/
function moneyModal(t){
	var rid = $(t).data('rid');
	$('.sumAddQuit').data('rid',rid);
	var rData = $('#jqGrid_balance').jqGrid('getRowData',rid);
	$('.tip .show').html('会计科目：' + rData.subjectName);
	loadmodalAssist();
	$('#assistModal').modal('show');
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

/*汇总并退出*/
$(document).on('click','.sumAddQuit',function(e){
	$('#jqGrid_assist').jqGrid("saveCell",lastrow,lastcell);
	var rData = $('#jqGrid_assist').jqGrid('getRowData');//获取所有数据
	var dataList = [],total = 0;
	$.each(rData,function(){
		 rData.push(arguments[1]);
		 total += (arguments[1].money) * 1;
	});
	$('#jqGrid_balance').jqGrid('setCell',$(this).data('rid'),'qcMoney',total);
	$('#assistModal').modal('hide');
	calcMain($(this).data('rid'));
});

/*父级合计*/
function parentCalc(){
	var no = [];
	var rData = $('#jqGrid_balance').jqGrid('getRowData');//获取所有数据
	$.each(rData, function() {
		no.push(arguments[1].subjectNo);//存放科目编号
	});
	
	for(var j = 0;j<no.length;j++){
		var sNum = 0,sMon = 0,jNum = 0,jMon = 0,dNum = 0,dMon = 0,qNum = 0,qMon = 0,flag = false;
		for(k = 1;k < no.length;k++){
			if(no[k].substring(0,no[j].length) == no[j] && no[k].length != no[j].length){
				$.each(rData, function(){
					if(arguments[1].subjectNo == no[k]){
						sNum += (arguments[1].startNumber * 1);
						sMon += (arguments[1].startMoney * 1);
						jNum += (arguments[1].borrowNumber * 1);
						jMon += (arguments[1].borrowMoney * 1);
						dNum += (arguments[1].loanNumber * 1);
						dMon += (arguments[1].loanMoney * 1);
						qNum += (arguments[1].qcNumber * 1);
						qMon += (arguments[1].qcMoney * 1);
					}
				});
				flag = true;
			}
		}
		$.each(rData, function() {
			if(arguments[1].subjectNo == no[j] && flag){
				$('#jqGrid_balance').jqGrid('setRowData',arguments[1].id,{'startNumber':sNum,'startMoney':sMon,'borrowNumber':jNum,'borrowMoney':jMon,'loanNumber':dNum,'loanMoney':dMon,'qcNumber':qNum,'qcMoney':qMon});
			}
		});
	}
	
}

/*辅助核算期初弹窗*/
function loadmodalAssist()
		{
		var options = {
			LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
			LoadTableUrl: '../../json/cw/assist.json',
			TableName: "#jqGrid_assist", //显示表格名称。遵照css选择器书写
	//		pager:"#jqGridPager"
			};
			$.jgrid.defaults.width = 1280;
			$.jgrid.defaults.responsive = true;
			$.jgrid.defaults.styleUI = 'Bootstrap';	
			var lastsel='';
			var mydata;
			var hid=false;
			var lock=false;
			var myobj=[];
			var colNames = ['ID','往来单位','辅助部门','职员','金额'];
			var JqGridColModel=[
								{name:'id',index:'id', width:200,align:'center', sorttype:'int',hidden:true,sortable:false},
								{name:'unit',index:'unit', width:200,align:'center', sorttype:'string',editable:true,edittype:'custom',sortable:false,editoptions:{
										custom_element:function(value,options){
										 var html='<input type="text" class="form-control unitInput" style="border:0;text-align:center;width:96%;" value="' + value +'" /><span style="float:right;margin-top:-27px;margin-right:20px;" class="glyphicon glyphicon-plus" onclick="treeUnitModal(this);" data-toggle="modal" data-target="" data-rId="' + options.rowId +'"></span>';
										 return $(html);
									},
										custom_value:function(value){
											return value.val();
										}
								}},
								{name:'section',index:'section', width:200,align:'center',editable:true,edittype:'custom',sortable:false,editoptions:{
										custom_element:function(value,options){
										 var html='<input type="text" class="form-control sectionInput" style="border:0;text-align:center;width:96%;" value="' + value +'" /><span style="float:right;margin-top:-27px;margin-right:20px;" class="glyphicon glyphicon-plus" onclick="sectionModal(this,0);" data-toggle="modal" data-target="" data-rId="' + options.rowId +'"></span>';
										 return $(html);
									},
										custom_value:function(value){
										return value.val();
									}
								}},
								{name:'employee',index:'startF', width:200,align:'center',editable:true,edittype:'custom',sortable:false,editoptions:{
										custom_element:function(value,options){
										 var html='<input type="text" class="form-control employeeInput" style="border:0;text-align:center;width:96%;" value="' + value +'" /><span style="float:right;margin-top:-27px;margin-right:20px;" class="employeeName glyphicon glyphicon-plus" onclick="peoModal(this);" data-toggle="modal" data-target="" data-rId="' + options.rowId +'"></span>';
										 return $(html);
									},
										custom_value:function(value){
										return value.val();
									}
								}},
								{name:'money',index:'money', width:120,align:'center',editable:true,editoptions:{
									dataEvents:[{
										type:"blur",
										fn:function(e){
											var rex=/^[0-9]*\.{0,1}[0-9]{0,2}$/;
											if(rex.test($(this).val())){
											
											}else{
												$.zxsaas_plus.showalert("提示","请输入合法数字！");
												$(this).val('');
												return false;
											}
										}
									}]
								},sortable:false}
			                ];
			
			loadtable();
			function loadtable(){
					$(options.TableName).jqGrid({
						url:options.LoadTableUrl,
						mtype:"GET",
						datatype: "json",
						//datatype: "local",
						jsonReader  : {	
								root: "rows",
								repeatitems: false
									},
						colNames:colNames,          
			            colModel:JqGridColModel,
			            sortable:false,			            
			            rownumbers:true,
			            cellsubmit: 'clientArray',//单元格保存内容的位置		
			            editurl: 'clientArray',
			            //pager:options.pager,
			            viewrecords: true,		           
			           	cellEdit:true,
			           	rowNum:10000000,
			            width: "100%" ,
			            height: $(window).height()*0.35,
						autowidth:true,
						rownumWidth: 35, 
						shrinkToFit:false, 
						beforeEditCell:function(rowid,cellname,v,iRow,iCol){
							lastrow = iRow;
							lastcell = iCol;
						},
						onCellSelect:function(id,index,e){
							var ids = $(options.TableName).jqGrid('getDataIDs');
							var maxid = (ids.length ==0 ) ? 0 : Math.max.apply(Math,ids);
							(id == maxid && index != 1) && $(options.TableName).jqGrid('addRowData', maxid+1, {}, 'last' )
						},
						gridComplete: function() {
							
						},
						loadComplete:function(data){
							$(options.TableName).jqGrid('setLabel',0, '序号');
							//$(options.TableName).setGridParam().trigger("reloadGrid").hideCol('');//隐藏列
						}
						})
			}
			
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

/*试算平衡弹窗*/
function trialBalance(url,tName,tPage,flag)
		{
		var options = {
			LoadBtnUrl: "../../json/button.json", 
			LoadTableUrl: url,
			TableName: tName, 
			pager:tPage,
			};
			$.jgrid.defaults.width = 1280;
			$.jgrid.defaults.responsive = true;
			$.jgrid.defaults.styleUI = 'Bootstrap';	
			var lastsel='';
			var mydata;
			var hid=false;
			var lock=false;
			var myobj=[];
			var colNames = ['ID','科目类型','借方发生','贷方发生','方向','余额'];
			var JqGridColModel=[
								{name:'id',index:'id', width:200,align:'center', sorttype:'int',hidden:true,sortable:false},
								{name:'clazz',index:'clazz', width:100,align:'center', sorttype:'string',editable:false,sortable:false},
								{name:'jf',index:'jf', width:100,align:'center', sorttype:'string',editable:false,sortable:false},
								{name:'df',index:'df', width:100,align:'center', sorttype:'string',editable:false,sortable:false},
								{name:'fx',index:'fx', width:100,align:'center', sorttype:'string',editable:false,sortable:false},
								{name:'money',index:'money', width:100,align:'center', sorttype:'float',formatter:"number",editable:false,sortable:false}
			                ];
			
			loadtable();
			function loadtable(){
					$(options.TableName).jqGrid({
						url:options.LoadTableUrl,
						mtype:"GET",
						datatype: "json",
						//datatype: "local",
						jsonReader  : {	
								root: "rows",
								repeatitems: false
									},
						colNames:colNames,          
			            colModel:JqGridColModel,
			            sortable:false,			            
			            rownumbers:flag,
			            cellsubmit: 'clientArray',//单元格保存内容的位置		
			            editurl: 'clientArray',
//			            pager:options.pager,
			            viewrecords: true,		           
			           	cellEdit:true,
			           	rowNum:10000000,
			            width: "100%" ,
			            height: $(window).height()*0.35,
						autowidth:true,
						rownumWidth: 35, 
						shrinkToFit:false, 
						footerrow:true,  //设置表格显示表脚
    		 			userDataOnFooter:true,
						loadComplete:function(data){
							$(options.TableName).jqGrid('setLabel',0, '序号');
							footerData();
						}
						})
			}
}

/*修改表格底部*/
function footerData(){			
	var sum_money = $('#jqGrid_trialBalance').getCol('money',false,'sum');
	var sum_money2 = $('#jqGrid_trialBalanceRight').getCol('money',false,'sum');
	$('#jqGrid_trialBalance').jqGrid('footerData','set',{
		"clazz":"合计",
        "money": sum_money
         }
	);
	$('#jqGrid_trialBalanceRight').jqGrid('footerData','set',{
		"clazz":"合计",
        "money": sum_money
         }
	);
}

var lNum = '';
/*往来单位*/
function treeUnitModal(t){
	$("#unitModalGrid").trigger("reloadGrid");
	lNum = $(t).data('rid');
	$('#unitModal').modal('show');
	var setting = {  
        data: {
			simpleData: {enable: true,idKey: "id",pIdKey: "pid",rootPId: null}
		},
		callback: {
			onClick: zTreeOnClick
		},
		view: {
			showIcon: false
		}
    }; 
	//点击树节点查询
	function zTreeOnClick(event, treeId, treeNode) {
	   
	    $.ajax({
	    	url:'' + treeNode.id,
	    	type:'GET',
	    	dataType:'JSON',
	    	contentType:'application/json;charset=utf-8',
	    	async:false,
	    	success:function(data){
	    		$('#unitModalGrid').jqGrid('clearGridData');
//	    		for(var i = 0,len = data.data.contactsunitList.length;i<len;i ++){
//	    			$('#').jqGrid('addRowData',i,data.data.contactsunitList[i],'last');
//	    		}
		    }
	    });
	};
	 $.ajax({
            type: 'Get',
            url: '',
            dataType: "json",
            success: function (data) {
                $.fn.zTree.init($('#unitTreeData'), setting, data);
                var zTree = $.fn.zTree.getZTreeObj('unitTreeData');
                zTree.expandAll(true);//展开全部节点
            },
            error: function (msg) {
                alert(" 数据加载失败！" + msg);
            }
        });
	 
	 //加载表格
		var options = {
			LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
			LoadTableUrl: '../../json/cw/unit.json',
			TableName: "#unitModalGrid", 
			pager:"#unitGridpager"
			};
				$.jgrid.defaults.width = 1280;
				$.jgrid.defaults.responsive = true;
				$.jgrid.defaults.styleUI = 'Bootstrap';	
				var lastsel='';//最后一次选中的行
				var rightClickColid="";//右键列id
				var rightClickColIndex=0;//右键index
				var mydata;
				var hid=false;
				var lock=false;
				var myobj=[];
				var colNames = ['ID','公司ID','往来单位编码','往来单位名称','助记码','所属地区','往来单位类型','往来单位类别'];
				var JqGridColModel=[
									{name:'id',index:'id', width:55,align:'center', sorttype:'string',hidden:true},
									{name:'companyId',index:'companyId', width:55,align:'center', sorttype:'string',hidden:true},
									{name:'code',index:'code', width:100,align:'center', sorttype:'string',sortable:false},
									{name:'name',index:'name', width:100,align:'center', sorttype:'string',sortable:false},
									{name:'remCode',index:'remCode', width:100,align:'center', sorttype:'string',sortable:false},
									{name:'companyAddr',index:'companyAddr', width:100,align:'center', sorttype:'string',sortable:false},
									{name:'contactunitTypeCode',index:'contactunitTypeCode', width:100,align:'center', sorttype:'string',sortable:false},
									{name:'contactsunitClassName',index:'contactsunitClassName', width:100,align:'center', sorttype:'string',sortable:false}
				                ];
				
				console.log(lNum)
				$(options.TableName).jqGrid({
					url:options.LoadTableUrl,
					mtype:"GET",
					datatype: "json",
					jsonReader  : {	
							root: "data.contactsunitList",
							repeatitems: false,
							page:'data.page',
							total:'data.pageCount',
							records:'data.totalCount'
								},
					colNames:colNames,          
		            colModel:JqGridColModel,
		            sortable:false,			            
		            rownumbers:true,
		            rowNum: 10,
		            rowList: [20, 25, 40],
		            pager:options.pager,
		            viewrecords: true,		           
		            width: "100%" ,
		            height: $(window).height()*0.44,
					autowidth:true,
					rownumWidth: 35,
					shrinkToFit:false, 
					ondblClickRow:function(){
						var clickData = $(options.TableName).jqGrid('getRowData',arguments[0]);
						var clickId = clickData.id,
							clickName = clickData.name;
						$('#jqGrid_assist').jqGrid('saveCell',lastrow,lastcell);
						$('#jqGrid_assist').jqGrid('setCell',lNum,'unit',clickName);
						console.log(lNum)
						$('#unitModal').modal('hide');
					},
					loadComplete:function(data){
						$(options.TableName).jqGrid('setLabel',0, '序号');
						
					}
				})
};

/*往来单位搜索*/
$(document).on('keyup','#unitRemCode',function(){
	$.ajax({
		url:'' + $(this).val(),
		type:'GET',
	 	dataType:'json',
	 	contentType:'application/json;charset=utf-8',
		success:function(data){
			console.log(data);
			var sData = data.data.contactsunitList;
			$('#unitModalGrid').jqGrid('clearGridData');
			if(sData.length == 0){
				$.zxsaas_plus.showalert("错误","没有匹配的数据!")
			}else{
				for(var i = 0,len = sData.length;i<len;i ++){
					$('#unitModalGrid').jqGrid('addRowData',i,sData[i],'last');
				}
			}
		}
	});
});

/*辅助部门 && 业务部门*/
function sectionModal(t,f){
	!f && (lNum = $(t).data('rid'));
	$('#sectionModal').modal('show');
	var setting = {  
        data: {
			simpleData: {enable: true,idKey: "id",pIdKey: "parentId",rootPId: null}
		},
		callback: {
			onCheck:zTreeOnCheck
		},
		view: {
			showIcon: false
		}
    }; 
    
	function zTreeOnCheck(event, treeId, treeNode) {
		var id = treeNode.id;//获取数据的Id
		var tName = treeNode.name;
		if(!f){
			$('#jqGrid_assist').jqGrid('saveCell',lastrow,lastcell);
			$('#jqGrid_assist').jqGrid('setCell',lNum,'section',tName);
		}else{
			$('#ywUnitName').val(tName);
		}
		$('#sectionModal').modal('hide');
	}; 
	
	 $.ajax({
            type: 'Get',
            url: '',
            dataType: "json",
            success: function (data) {
                $.fn.zTree.init($('#sectionTreeData'), setting, data.data.sectionList);
                var zTree = $.fn.zTree.getZTreeObj('sectionTreeData');
                zTree.expandAll(true);//展开全部节点
            },
            error: function (msg) {
                alert(" 数据加载失败！" + msg);
            }
        });
};

/*职员选择 弹窗*/
function peoModal(t){
	$("#managerModalGrid").trigger("reloadGrid");
	lNum = $(t).data('rid');
	$('#managerModal').modal('show');
	var options = {
			LoadBtnUrl: "../../json/button.json", 
			LoadTableUrl: '',
			TableName: '#managerModalGrid',
			pager:'#managerGridpager'
			};
		
			$.jgrid.defaults.width = 1280;
			$.jgrid.defaults.responsive = true;
			$.jgrid.defaults.styleUI = 'Bootstrap';	
			var lastsel='';//最后一次选中的行
			var rightClickColid="";//右键列id
			var rightClickColIndex=0;//右键index
			var mydata;
			var hid=false;
			var lock=false;
			var myobj=[];
			//var toggleflag=false;//冻结时候切换用
			var colNames = ['ID','员工编码','员工名称','所属部门','职位名称','备注'];
			var JqGridColModel=[
								{name:'id',index:'id', width:100,align:'center', sorttype:'string',hidden:true},
								{name:'code',index:'code', width:100,align:'center', sorttype:'string',sortable:false},
								{name:'name',index:'name', width:100,align:'center', sorttype:'string',sortable:false},
								{name:'sectionName',index:'sectionName', width:100,align:'center', sorttype:'string',sortable:false},
								{name:'jobName',index:'jobName', width:100,align:'center', sorttype:'string',sortable:false},
								{name:'remark',index:'remark', width:100,align:'center', sorttype:"string",sortable:false}
			                ];
			
			loadtable();
			function loadtable(){
					$(options.TableName).jqGrid({
						url:options.LoadTableUrl,
						mtype:"GET",
						datatype: "json",
						jsonReader  : {	
								root: "",
								repeatitems: false,
								page:'data.page',
								total:'data.pageCount',
								records:'data.totalCount'
									},
						colNames:colNames,          
			            colModel:JqGridColModel,
			            sortable:false,			            
			            rownumbers:true,
			            rowNum: 10,
			            rowList: [20, 25, 40],
			            pager:options.pager,
			            viewrecords: true,		           
			            width: "100%" ,
			            height: $(window).height()*0.25,
						autowidth:true,
						rownumWidth: 35, 
						shrinkToFit:false,
						ondblClickRow:function(){
							var clickData = $(options.TableName).jqGrid('getRowData',arguments[0]);
							var clickId = clickData.id,
								clickName = clickData.name;
							$('#jqGrid_assist').jqGrid('saveCell',lastrow,lastcell);
							$('#jqGrid_assist').jqGrid('setCell',lNum,'employee',clickName);
							$('#managerModal').modal('hide');
						},
						loadComplete:function(data){
							$(options.TableName).jqGrid('setLabel',0, '序号');
							
						}
						})
			}
		
};





