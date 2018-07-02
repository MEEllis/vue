var orders = new Orders(basePath);
//var save=false;
$(function(){
	initHeader();
	initRevenueGrid({});
});

/*过滤*/
$(document).on('show.bs.modal','#filterParamModalDialog',function(){
	$.ajax({
				url: basePath+'/funds/payment/findInpayClass/67',
				type : "post",
				contentType : 'application/json',
				dataType : 'json',
				success:function(data){
				var list=data.data.payClassList;
				console.log(list);
				   $("#1_inpayClassName").html("");
				    var str ="";
				 	$.each(list,function(index,item){
					    	str+='<option  value='+item.id+' >'+item.name+'</option>';
					});
					  $("#1_inpayClassName").append(str);
			     }
	});

	
});

/*复制*/
function copy(){
	$("input[name=billsCode]").val("");
	$("input[name=id]").val("");
}
$(document).on('show.bs.modal',"#recieveModal",function (e) {
	$("#revenueGrid").jqGrid("saveCell",re_lastrow,re_lastcell);
	 initDataGrid2({});
	
});

$(document).on('shown.bs.modal',"#recieveModal",function (e) {
    $("#dataGrid2").jqGrid('setGridWidth', $(this).find(".jqGrid_wrapper").width());
    
});

/*收款结算确定临时保存写入*/
var currentDataGrid2 =[];
$(document).on("click",".yes",function(){
	$("#dataGrid2").jqGrid('saveCell',dG2_lastrow,dG2_lastcell);
	currentDataGrid2 =  dataGrid2Data("#dataGrid2",[]);
	
});

function dataGrid2Data(gridId,delAttr){
var gridDatas = [];
var obj={};
var ids = $(gridId).jqGrid('getDataIDs');
$.each(ids,function(i,item){
	obj = $(gridId).jqGrid('getRowData',ids[i]);
	if(delAttr.length>0){
		for(var i=0;i<delAttr.length;i++){
			delete obj[delAttr[i].toString()];
		}
	}
	gridDatas.push(obj);
});
return gridDatas;
}
/*收款结算取消读出*/
var currentDataGrid2 =[];
$(document).on("hidden.bs.modal","#recieveModal",function(){
	$("#dataGrid2").jqGrid('saveCell',dG2_lastrow,dG2_lastcell);
	//重新写入表格
	$.each(currentDataGrid2,function(i,item){
		$("#dataGrid2").jqGrid("setRowData",item['id'],item);
	});
	
});



/*保存并过账*/
$(".saveSubmit").on("click",function(){
	$("#revenueGrid").jqGrid("saveCell",re_lastrow,re_lastcell);//保存单元格，切换为文本模式 
	$("#dataGrid2").jqGrid('saveCell',dG2_lastrow,dG2_lastcell);
	
	if(getPageData()==null){
		$.zxsaas_plus.showalert("提示","请完整填写其他收入类别、收入归集部门和金额再提交！");
		recordRows=[];//初始化不合法行数
		
	}else{
		$.zxsaas_plus.showconfirm("提示","确定保存过账？",function(){doit()},function(){});
		function doit(){
			   var obj =getPageData();
			    delete obj.billsCode;
			    delete obj.id;
			    $.each(obj.payreceiptDetailList,function(i,item){
			    	 item['accountId'] =item.id;
			    	 delete item['id'];
			    	
			    });
			    console.log(obj);
		   		orders.saveOrder(obj,function(data){
		   			alert(data.desc);
		   			//成功后添加页面单据编号
		   			$("input[name='billsCode']").val(data.data.billsCode);
		   			$("input[name='id']").val(data.data.id);
		   			//显示过账人
		   			//过账成功后不可以修改内容
		   			save=true;//保存过账成功
		   			recordRows=[];//初始化不合法行数
		   		
		   		});
		   
		}
	}
	
});

/*红冲*/
$(".Hchong").on("click",function(){
	//$("#revenueGrid").jqGrid("saveCell",re_lastrow,re_lastcell);//保存单元格，切换为文本模式 
	//$("#dataGrid2").jqGrid('saveCell',dG2_lastrow,dG2_lastcell);
	
//	if(getPageData()==null){
//		$.zxsaas_plus.showalert("提示","请完整填写其他收入类别、收入归集部门和金额再提交！");
//		recordRows=[];//初始化不合法行数
//		
//	}else{
//		$.zxsaas_plus.showconfirm("提示","确定保存过账？",function(){doit()},function(){});
//		function doit(){
//		   		orders.saveOrder(getPageData(),function(data){
//		   			alert("保存成功");
//		   			//成功后添加页面单据编号
//		   			//显示过账人
//		   			recordRows=[];//初始化不合法行数
//		   		
//		   		});
//		   
//		}
//	}
	if($("input[name=id]").val()!=""){
		$.zxsaas_plus.showconfirm("提示","确定红冲？",function(){doit()},function(){});
		function doit(){
		   		orders.Hchong({"id":$("input[name=id]").val()},function(data){
		   			alert(data.desc);
		   			//显示过账人？？
		   			//显示已红冲状态
		   			//显示红冲人
		   			//红冲成功后不可以修改内容
		   			//收款结算只能查看
		   			recordRows=[];//初始化不合法行数
		   		
		   		});
		   
		}
	}else{
		$.zxsaas_plus.showalert("提示","请保存过帐后红冲！");
	}
	
});

////////////


//获取页面数据
function getPageData(){
	//表单
	var formObj = $(".gridTop").toJsonObject();
	//$.extend(formObj,$(".gridBottom").toJsonObject());不需要存
	
	//其他收入类别明细
	formObj.cashOthIncomeDetailDraftList=revenueGridData("#revenueGrid",[]);
	
	//收款结算明细(读取临时变量)
	//delete currentDataGrid2["accountTypeName"];
	formObj.payreceiptDetailList =currentDataGrid2;
	
	//if(recordRows==0){//验证合法性
	   return formObj;
	//}else{
	//  return null;
	//}
}
/*获取其他收入类别表格数据*/
var recordRows=[];//记录不合法表格行
function revenueGridData(gridId,delAttr){
	var gridDatas = [];
	var obj={};
	var ids = $(gridId).jqGrid('getDataIDs');
	$.each(ids,function(i,item){
		obj = $(gridId).jqGrid('getRowData',ids[i]);
		
		if(delAttr.length>0){
			for(var i=0;i<delAttr.length;i++){
				delete obj[delAttr[i].toString()];
			}
		}
		
		//其他收入类别  其他收入名称   金额必须填写
		if(obj.inpayClassId!="" && obj.inpayClassName!=""  && obj.sectionId!=""  && obj.sectionName!=""  && obj.amount!="" ){
			 delete obj['ope'];
		    gridDatas.push(obj);
		}else{
			recordRows.push(ids[i]);
		}
	});
	return gridDatas;
}
/**********************其它收入单 开始******************************************/
var revenueGrid = null;
var re_lastrow ="";
var re_lastcell="";
//初始化表格
function initRevenueGrid(options){
	//全局当前选择的rowid colid
	var rowid='';
	var colid='';
	var select_name='';
	
	var defaults = {
	LoadTableUrl: "",
	GetRowInfoUrl: "", 
	TableName: "#revenueGrid", 
	pager:"",
	TableInfo:"",
	choose:false
	};
	var options = $.extend(defaults,options);
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
		var colNames = ['操作','其他收入类别id','其他收入类别','其他归集部门id','收入归集部门','金额','备注'];
		var JqGridColModel = [  
		                        {name:'ope',index:'ope', width:200,align:'center',sortable:false,formatter:opeater},
                                {name:'inpayClassId',index:'inpayClassId', width:200,align:'center',sortable:false,hidden:true},
		                        {name:'inpayClassName',index:'inpayClassName', width:200,align:'center',sortable:false,edittype:'select',editable:true},
		                        {name:'sectionId',index:'sectionId', width:200,align:'center',sortable:false,hidden:true},
		                        {name:'sectionName',index:'sectionName',width:200,align:'center',edittype:'custom',editoptions:{custom_element:my_bt_input,custom_value:my_bt_value},editable:true},
//		                        formatter:function(cellvalue, options, rowObject){
//								 	if(cellvalue==undefined){
//										cellvalue="";
//									}
//									return '<span class="glyphicon glyphicon-plus" onclick="selectSectionTableOpen(this)" data-rId="' + options.rowId +'"></span>';
//								}
								{name:'amount',index:'amount', width:200,align:'right',sortable:false,editable:true},
								{name:'remark',index:'remark', width:200,align:'center', sortable:false,maxLength:256,editable:true}
					    ];
		loadtable();
	   //加载表格
		function loadtable(){
				$(options.TableName).jqGrid({
					url:"/manager/member/cardType/selectAll",
					mtype:"GET",
					datatype: "json",
					jsonReader  : {	
						root: "data.rows",
//						page: "data.page",
//				        total: "data.total",
//				        records: "data.records",
//						repeatitems: false
							},
					colNames:colNames,          
		            colModel:JqGridColModel,
		            cellEdit:true,
		            cellsubmit:'clientArray',
		            editurl: 'clientArray',
		            sortable:false,			            
		            rownumbers:true,
		            rowNum: 10,
		            rowList: [10, 25, 40],
		            pager:options.pager,
		            viewrecords: true,		       
		            width: "100%" ,
		            height: $(window).height()*0.65,
					autowidth:true,
					rownumWidth: 35, 
					shrinkToFit:false,  
				    footerrow:true,
				    formatCell:function(rowid, cellname, value, iRow, iCol){
								var param=$('#revenueGrid').getRowData(rowid);
								$('#revenueGrid').setColProp('inpayClassName',{editoptions:{
									//manager/funds/payment/findInpayClass/67
									dataUrl:basePath+'/funds/payment/findInpayClass/67',
									buildSelect:function(data){
										var data=JSON.parse(data);
										var str='';
										var list=data.data.payClassList;
										str+='<select class="form-control  slctOther">';
										$.each(list,function(index,item){
											if(index==0){
												  $("#revenueGrid").setCell(rowid,'inpayClassId',item.id);//其他收入类别id
											}
											str+='<option  value='+item.id+' >'+item.name+'</option>';
										})
								  		str+='</select>';
										return str;
									}
								}});
								
							},
					ondblClickRow:function(id){
				
					},
					onCellSelect:function(id,index,cellcontent,e){
				             
					},
					beforeSelectRow:function(rowid,e){
						 
					},
					beforeEditCell:function(rowid,cellname,v,iRow,iCol){
						re_lastrow = iRow;
						re_lastcell = iCol;
					},
					afterInsertRow: function (rowid, aData) { //新增一行之后
                          
					},
					afterEditCell: function(rowid, cellname, value, iRow, iCol){//编辑完cell
					},
					gridComplete: function(rowid, cellname, value, iRow, iCol) {
						
					},
					loadComplete:function(data){
						  /*添加一行表格*/
						  addOneLine();
						  
						  /*计算总金额*/
						  $("#revenueGrid").footerData("set", {"name":'<font color="red" >本页合计</font>'},false);
					      var cashNum=  $("#revenueGrid").getCol('cashNum', false, 'sum');//金额
			              $("#revenueGrid").footerData('set', {"cashNum":'<font color="red" >'+cashNum+'</font>'},false);
			             
					},
					loadError:function(xhr,status,error){
					}
					})
	
	}
           

}
//function clearSectionName(){
//	var ids=$("#revenueGrid").jqGrid("getDataIDs");
//	
//	for(var i=0;i<ids.length;i++){
//		  $("#revenueGrid").setCell(ids[i],'sectionId',"");
//		  $("#revenueGrid").setCell(ids[i],'sectionName',"");
//		  console.log( $("#revenueGrid").getCell(ids[i],'sectionName'));
//	}
//	
//	
//}
$(document).on('click','.revenue_trash',function(){
	var ids=$("#revenueGrid").jqGrid("getDataIDs");
	if(ids.length>1){
		 $("#revenueGrid").jqGrid('addRowData',1,{});
		 //$(this).parents("tr").attr("id");//delRowData
		 $("#revenueGrid").jqGrid('delRowData',$(this).parents("tr").attr("id"));
	}else{
		alert("至少保留一行！");
	}
	
});

$(document).on('click','.revenue_plus',function(){
	var ids=$("#revenueGrid").jqGrid("getDataIDs");
	var id = Math.max.apply( Math, ids );
	$("#revenueGrid").jqGrid('addRowData',++id,{});
});

function addOneLine(){
	var ids=$("#revenueGrid").jqGrid("getDataIDs");
	if(ids.length==0){
		 $("#revenueGrid").jqGrid('addRowData',1,{});
	}
}

function opeater(){
	
	return '<i class="glyphicon glyphicon-trash revenue_trash"></i>&nbsp;&nbsp;<i class="glyphicon glyphicon-plus revenue_plus"></i>';
}

function my_bt_input(value, options) {
	
	  var html =  '<input type="text" class="form-control disName" data-rId="'+ options.rowId +'" value="'+value+'" >'+
	  '<span class="glyphicon glyphicon-plus tbSpan"  style="float:right;cursor: pointer;margin-top: -25px;margin-right: 7px;" data-rId="'+ options.rowId +'"></span>';
	   return $(html);             
}

function my_bt_value(value){
	return $(value).val();
}


//其他收入类别下拉填写id
$(document).on("change","select.form-control",function(){
	  $("#revenueGrid").setCell($(this).attr("rowid"),'inpayClassId',$(this).find("option:selected").val());//其他收入类别id
});

//打开部门引用对话框填写表格内容

$(document).on("click",".tbSpan",function(e){
	   selectSectionTableOpen(e.target);
});
function selectSectionTableOpen(tgt){
	//传入单选标志
	sectionReferenceFrame.mulSelect(false);
	$('#sectionReferenceModal').modal('show').find('.referenceFrame').css({
	    height: $("html").height()/2
	});
	callBack = function(){
		if(arguments[0].length == 0){
			$('#sectionReferenceModal').modal('hide');
			return ;
		}
		var model = arguments[0][0];

		//设置编辑器值
	  $("#revenueGrid").setCell($(tgt).parents("tr").attr("id"),'sectionId',model.id);//其他归集部门id
	  $(tgt).siblings("input.disName").val(model.name);//其他归集部门名称
	  
		$('#sectionReferenceModal').modal('hide');
		//refreshValidator();
	}; 
}


/**********************收款结算单 开始******************************************/
//dataGrid2
//初始化表格
var dG2_lastrow = "";
var dG2_lastcell = "";
function initDataGrid2(options){
	//全局当前选择的rowid colid
	var rowid='';
	var colid='';
	var select_name='';
	
	var defaults = {
	LoadTableUrl: "",
	GetRowInfoUrl: "", 
	TableName: "#dataGrid2", 
	pager:"",
	choose:false
	};
	var options = $.extend(defaults,options);
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
		var colNames = ['id','账号类型id','账户类别','账户名称','金额','备注'];
		var JqGridColModel = [  
		                        {name:'id',index:'id',width:10,align:'center',sortable:false,hidden:true},
		                        {name:'accountType',index:'account_id',width:10,align:'center',sortable:false,hidden:true},
		                        {name:'accountTypeName',index:'account_id',width:200,align:'center', sortable:false},
								{name:'accountName',index:'account_name', width:200,align:'right', sortable:false},
								{name:'payreceiptAmout',index:'payreceiptAmout', width:200,align:'right', sortable:false,editable:true},
								{name:'remark',index:'remark', width:200,align:'center', sortable:false,maxLength:256,editable:true}
					    ];
		loadtable1();
	   //加载表格
		function loadtable1(){
				$(options.TableName).jqGrid({
					url:"/manager/funds/payment/findAccountName/67",
					mtype:"GET",
					datatype: "json",
					jsonReader  : {	
					root: "data.rows.payReceiptDetailList",
					page: "data.page",
			        total: "data.total",
			        records: "data.records",
					repeatitems: false
					 //	root: "data.rows",
//						page: "data.page",
//				        total: "data.total",
//				        records: "data.records",
//						repeatitems: false
							},
					colNames:colNames,          
		            colModel:JqGridColModel,
		            cellEdit:true,
		            cellsubmit:'clientArray',
		            editurl: 'clientArray',
		            sortable:false,			            
		            rownumbers:true,
		            rowNum: 10,
		            rowList: [10, 25, 40],
		            pager:options.pager,
		            viewrecords: true,		       
		            width: "100%" ,
		            height: $(window).height()*0.65,
					autowidth:true,
					rownumWidth: 35, 
					shrinkToFit:false,  
				    footerrow:true,
				 
					ondblClickRow:function(id){
				
					},
					onCellSelect:function(id,index,cellcontent,e){
				                
					},
					beforeSelectRow:function(rowid,e){
						 
					},
					beforeEditCell:function(rowid,cellname,v,iRow,iCol){
						dG2_lastrow = iRow;
						dG2_lastcell = iCol;
					},
					afterInsertRow: function (rowid, aData) { //新增一行之后
                          
					},
					afterEditCell: function(rowid, cellname, value, iRow, iCol){//编辑完cell
					},
					gridComplete: function() {
					},
					loadComplete:function(data){
						//建立临时变量存储表格内容
						 currentDataGrid2 = dataGrid2Data("#dataGrid2",[]);						
						/*计算总金额*/
						 $("#dataGrid2").footerData("set", {"accountTypeName":'<font color="red" >本页合计</font>'},false);
					      var payreceiptAmout=  $("#dataGrid2").getCol('payreceiptAmout', false, 'sum');//金额
			              $("#dataGrid2").footerData( 'set',  {"payreceiptAmout":'<font color="red" >'+payreceiptAmout+'</font>'},false);
					},
					loadError:function(xhr,status,error){
					}
					})
	
	     }


}


/*header constuction*/
function initHeader(){
	$('#billsStautsImg').addClass('hidden');//隐藏红冲状态

	/*单据日期时间控件*/
	    $("input[name='billsDate']").val($.DateFormat(new Date(),"yyyy-MM-dd"));
		$("input[name='billsDate']").datetimepicker({
			  lang:"ch",           //语言选择中文
		      format:"Y-m-d",      //格式化日期
		      timepicker:false,    //关闭时间选项
		      todayButton:false    //关闭选择今天按钮
		})
		 $("input[name='billsDateEnd']").val($.DateFormat(new Date(),"yyyy-MM-dd"));
		$("input[name='billsDateEnd']").datetimepicker({
			  lang:"ch",           //语言选择中文
		      format:"Y-m-d",      //格式化日期
		      timepicker:false,    //关闭时间选项
		      todayButton:false    //关闭选择今天按钮
		})
		 $("input[name='billsDateBegin']").val($.DateFormat(new Date(),"yyyy-MM-01"));
		$("input[name='billsDateBegin']").datetimepicker({
			  lang:"ch",           //语言选择中文
		      format:"Y-m-d",      //格式化日期
		      timepicker:false,    //关闭 	时间选项
		      todayButton:false    //关闭选择今天按钮
		})
//		.on('blur', function (ev) {  
//	        refreshValidatorField("billsDate",'#topForm');//刷新验证信息
//	    })
	
}

/*header function*/

	//打开部门引用对话框填写部门input框内容
function selectSectionReferenceOpen(){
	//if($("#slideThree").is(':checked') || $(".gridTop").toJsonObject().id != "")return;
	//传入单选标志
	sectionReferenceFrame.mulSelect(false);
	$('#sectionReferenceModal').modal('show').find('.referenceFrame').css({
	    height: $("html").height()/2
	});
	callBack = function(){
		if(arguments[0].length == 0){
			$('#sectionReferenceModal').modal('hide');
			return ;
		}
		var model = arguments[0][0];

		//设置编辑器值
		$("input[name='sectionId']").val(model.id);
		$("input[name='sectionName']").val(model.name);
		//$('input[name="managersUid"').val("");
      // $('input[name="managersName"').val("");
		initStorageSelect(model.id);
		$('#sectionReferenceModal').modal('hide');
		refreshValidator();
	}; 
}


//加载经手人（与部门名称联动）
function initStorageSelect(sId){
	$.request({
		type: 'Get',
		url: basePath+'/aboutPeople/interfaceManagers1?sectionId='+sId,
		dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
		success: function(data) {
			 var list = data.data.rows;
//			 currSectionStorageList = list;
			 $("#operater").html("");
			 for ( var i = 0; i < list.length; i++) {
				 $("#operater").append('<option value="'+list[i].id+'">'+list[i].code+'-'+list[i].name+'</option>');
			 }
		},
		error: function(msg) {
			console.log(msg);
		}
	});
}

//打开往来单位引用对话框
function selectContactUnitReferenceOpen(t){
	//if($("#slideThree").is(':checked') || $(".gridTop").toJsonObject().id != "")return;
	//传入单选标志
	
	contactUnitReferenceFrame.mulSelect(false);
	$('#contactUnitReferenceModal').modal('show').find('.referenceFrame').css({
	    height: $("html").height()/1.25
	});
	callBack = function(objs){
		if(arguments[0].length == 0){
			$('#contactUnitReferenceModal').modal('hide');
			return ;
		}
		var contactUnit = arguments[0][0];

		//设置编辑器值
		$("input[name='contactsunitName']").val(contactUnit.name);
		$("input[name='contactsunitId']").val(contactUnit.id);
		$('#contactUnitReferenceModal').modal('hide');

		//切换往来单位余额
		//initWLDWamount(contactUnit.id);
		
		//refreshValidatorField("contactsunitName",'#topForm');//刷新验证信息
		
	}; 
}
//$('#contactUnitReferenceModal').on('show.bs.modal',function(e){
//	if($(e.target).parents("div").hasClass("gridTop")){
//	$($("#contactUnitReferenceModal").find("iframe")[0].contentWindow).find("#saveBt").css({"display":"none"});
//	}
//	if($(e.target).parents("div").hasClass("modal")){
//		alert("22");
//		console.log($($("#contactUnitReferenceModal").find("iframe")[0].contentWindow.document).find("#saveBt").attr("class"));
//		$($("#contactUnitReferenceModal").find("iframe")[0].contentWindow.document).find("#saveBt").css({"display":"inlineBlock"});
//	}
//	
//	
//});


/*************************分页 S******************************/

var pageIndex = 0;//页码(0为最后一页)
var pageSize =  1;//页大小
var pageCount = 0;//页码大小
var currPage = null;//当前页数据

//首页
function firstPage(){
	if(checkIsEidited()){
		$.MsgBox("操作提示","当前单据未保存，继续操作将丢失当前变更数据，是否继续?",function(){
			todo();
		},function(){});return;
	}else{
		todo();
	}
	function todo(){
		pageIndex = 1;
		queryPage();
	}
}
//下一页
function nextPage(){
	if(checkIsEidited()){
		$.MsgBox("操作提示","当前单据未保存，继续操作将丢失当前变更数据，是否继续?",function(){
			todo();
		},function(){});return;
	}else{
		todo();
	}
	function todo(){
		if((pageIndex + 1) > pageCount){
			$.MsgBox('消息提示','已是最后一条单据');
			return;
		}
		pageIndex = pageIndex + 1;
		queryPage();
	}
}
//上一页
function backPage(){
//	if(checkIsEidited()){
//		$.MsgBox("操作提示","当前单据未保存，继续操作将丢失当前变更数据，是否继续?",function(){
//			todo();
//		},function(){});return;
//	}else{
		todo();
	//}
	function todo(){
		if(pageIndex != 0 && (pageIndex - 1) == 0){
			$.MsgBox('消息提示','已是最前一条单据');
			return;
		}
		pageIndex = pageIndex - 1;
		queryPage();
	}
}
//末页
function lastPage(){
//	if(checkIsEidited()){
//		$.MsgBox("操作提示","当前单据未保存，继续操作将丢失当前变更数据，是否继续?",function(){
//			todo();
//		},function(){});return;
//	}else{
//		todo();
//	}
	
	todo();
//	if($("input[name=id]").val()!=""){
//		todo();
//	}else{
//		alert("当前单据未保存！");
//	}
	
	function todo(){
		pageIndex = 0;
		queryPage();
	}
}

//分页查询
function queryPage(){
	
	//获取查询参数
	//************
//	var model = {};
//	model.page = pageIndex;
//	model.rows = pageSize;
//	model.billsType = "67";
//	
//	model.billsCode = billsCode;
//	$.extend(model,getQueryData());
//	model.billsDateBegin = model.billsDateBegin + " 00:00:00";
//	model.billsDateEnd = model.billsDateEnd + " 23:59:59";
	
	var n_model =$("#filterParamModalDialog").toJsonObject();
	delete n_model.billsId;
	
	n_model.sectionIdListStr=[];//n_model.sectionId;
	n_model.sectionIdListStr.push(n_model.sectionId);
	delete n_model.sectionId;
	
	n_model.contactsunitIdListStr=[];//n_model.contactsunitId;
	n_model.contactsunitIdListStr.push(n_model.contactsunitId);
	delete n_model.contactsunitId;
	delete n_model.contactsunitName;
	delete n_model.inpayClassName;
	delete n_model.sectionName;
	n_model.billsType="67";
	
	
	n_model.page =  pageIndex;
	
	console.log(n_model);
//	if(billsCode!=""){
//		model.billsDateBegin = "";
//		model.billsDateEnd = "";
//	}
	//后台查询
	$.request({
		url: this.basePath + '/IcashMain/page',
		type : "post",
		contentType : 'application/json',
		dataType : 'json',
		data:JSON.stringify(n_model),
		success:function(data){
		pageIndex=data.data.page;
			console.log(data.data.page);
			$(".gl_fieldset").attr("disabled",true);
		}
	});  
}

//填充页面页面数据
function initPageData(bills){
	$("#topForm").data('bootstrapValidator').resetForm();
	var formObj = bills;
	var contactsunitName = bills.contactsunitName;
	var billsDate = bills.billsDate;
	var sectionName = bills.sectionName;
	var managersName = bills.managersName;
	var remark = bills.remark;
	currPayreceiptDetailList = bills.payreceiptDetailList;
//	
//	initStorageSelect(bills.sectionId);
//	initWLDWamount(bills.contactsunitId);
//	
	//格式化数据
	formObj.billsDate = $.DateFormatFromTimestamp("yyyy-MM-dd",formObj.billsDate);

	//设置表单数据
	$(".gridTop").writeJson2Dom(formObj);
	$(".gridBottom").writeJson2Dom(formObj);
	$("input[name='billsDiscount']").val(formObj.billsDiscount);
	
	//设置明细数据
	dataGrid.clearDataGrid();
	for ( var int = 0; int < instrorageNumList.length; int++) {
		var row = instrorageNumList[int];
		if(row.instrorageImList.length>0){
			row.imeiList = JSON.stringify(row.instrorageImList);
		}
		row.giftFlag = row.giftFlag == 1 ?true:false;
		//插入空数据的1行
		dataGrid.addRowData(int,row);
	}
	
	//设置收付款明细数据
	dataGrid2.clearDataGrid();$("#payrecetiptAmount").val(0);
	var allAount = 0;
	for ( var int = 0; int < payreceiptDetailList.length; int++) {
		var row = payreceiptDetailList[int];
//		row.accountType = "现金";
		allAount = allAount + row.payreceiptAmout;
//		//插入空数据的1行
//		dataGrid2.addRowData(int,row);
	}
	onSectionChange(bills.sectionId);
	
	$("#payrecetiptAmount").val(allAount);
	
	Summary();
	Summary2();
	initData = getPageData();
	$.showBillsStatus("billsStautsImg",bills.billsStatus);
	if($("#slideThree").is(':checked')){	
		
		$(".forceFinish,.print,.copyBills").removeAttr("disabled");
		$(".gridTop input:not(:hidden),.billsDiscount").prop("readonly", true);
		//正式单据修改
		$(".gridTop input[name='remark']").prop("readonly", false);
		
		$(".delBt,.checkBt,.orderImport,.billsImport").attr({"disabled":"disabled"});
		dataGrid.$grid.setGridParam({cellEdit:false});
		dataGrid2.$grid.setGridParam({cellEdit:false});
		dataGrid3.$grid.setGridParam({cellEdit:false});
	}else{
		//草稿单据修改
		if($(".gridTop").toJsonObject().id != ""){
			$(".gridTop input:not(:hidden),.billsDiscount").not('input[name="billsCode"]').prop("readonly", false);	
			$(".gridTop input[name='remark']").prop("readonly", false);		
		}else{
			$(".gridTop input:not(:hidden),.billsDiscount").not('input[name="billsCode"]').prop("readonly", false);
		}
		$(".delBt,.checkBt,.orderImport,.billsImport,.copyBills,.print").removeAttr("disabled");;
		$(".forceFinish").attr({"disabled":"disabled"});
		
		dataGrid.$grid.setGridParam({cellEdit:true});
		dataGrid2.$grid.setGridParam({cellEdit:true});
		dataGrid3.$grid.setGridParam({cellEdit:true});		
	} 
	
	//已红冲的单据禁用红冲按钮
	if(bills.billsStatus == '7')
		$(".forceFinish").attr({"disabled":"disabled"});
};

/*************************分页 E******************************/


