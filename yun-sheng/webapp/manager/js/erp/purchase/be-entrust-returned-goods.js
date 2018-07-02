
var billsDao = new Bills(basePath);

$(function(){
	initUI();//初始化UI
	initDataGrid();//初始化表格
	initDataGrid4();//在库串号表
	initDataGrid5();//引入串号表
	initEvents();//初始化事件
	initStorageSelect();
	
//	是否从报表进入
	if(billsCode != ""){
		
		queryPage();
	}else{
		openAddState();
	}
	
	initQueryUi();//过滤参数相关设置
});

//打印单据
function print(){
	var id = $(".gridTop").toJsonObject().id;
	if(id=="")return;
	
	var tempKindDIV = $(
			'<fieldset class="fieLeft" id="form3">'+
			'<legend>打印模板类型</legend>'+
			'<div class="">'+
				'<label class="radio-inline"><input type="radio" name="printTempKind" value="showimei" checked>商品明细</label>'+
				'<label class="radio-inline"><input type="radio" name="printTempKind" value="noimei">商品汇总</label>'+
			'</div>'+
			'</fieldset>'
	)

	BootstrapDialog.show({
	    title: '单据打印',
	    message: tempKindDIV,
	    buttons: [{label: '确定', cssClass: 'btn-primary',action: function(dialogItself) {dialogItself.close();todo();}},
	              {label: '取消',action: function(dialogItself){dialogItself.close();}
	    }]
	});
	function todo(){
		$.printBills(basePath + '/purchase/print/beentrustReturnedGoods', 
			{
		      billsId:id,
		      isDraftOp:$("#slideThree").is(':checked')?false:true,
		      tempKind:tempKindDIV.find("input[name='printTempKind']:checked").val()	  
		    }
		);
	}
}
/*************************分页 S******************************/

var pageIndex = 1;//页码
var pageSize =  1;//页大小
var pageCount = 0;//页码大小
var currPage = null;//当前页数据


var queryDir = "last";
var currAtId = "";

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
		queryDir  = "first";
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
		queryDir  = "next";
		queryPage();
	}
}
//上一页
function backPage(){
	if(checkIsEidited()){
		$.MsgBox("操作提示","当前单据未保存，继续操作将丢失当前变更数据，是否继续?",function(){
			todo();
		},function(){});return;
	}else{
		todo();
	}
	function todo(){
		queryDir  = "back";
		queryPage();
	}
}
//末页
function lastPage(){
	if(checkIsEidited()){
		$.MsgBox("操作提示","当前单据未保存，继续操作将丢失当前变更数据，是否继续?",function(){
			todo();
		},function(){});return;
	}else{
		todo();
	}
	function todo(){
		queryDir  = "last";
		queryPage();
	}
}

//分页查询
function queryPage(){
	
	//获取查询参数
	//************
	var model = {};
	model.isDraftOp = $("#slideThree").is(':checked')?false:true;
	model.page = pageIndex;
	model.rows = pageSize;
	model.billsType = "6";
	
	model.currAtId = $("#topForm input[name='id']").val();
	model.queryDir = queryDir;
	
	$.extend(model,getQueryData());

    if(model.billsDateBegin != null && model.billsDateBegin != ""){
    	model.billsDateBegin = model.billsDateBegin + " 00:00:00";
    }
    if(model.billsDateEnd != null && model.billsDateEnd != ""){
    	model.billsDateEnd = model.billsDateEnd + " 23:59:59";
    }
    //报表进入
    if(billsCode!=""){
		model.billsDateBegin = "";
		model.billsDateEnd = "";
		model.isDraftOp = false;

		model.billsCode = billsCode;
	}
	//后台查询
	$.request({
		url: this.basePath + '/IbillsMain/page/stth_query',
		type : "post",
		dataType : 'json',
		data:model,
		success:function(data){
			var result = data.data;
			
			if(data.result != 1){$.MsgBox('错误提示',data.desc);return;};
			pageIndex = result.query.pageNumber;
			pageCount = result.total;
			if(result.rows.length>0){
				initPageData(result.rows[0]);
			}else{
				if('back' == queryDir){
					$.MsgBox('查询提示',"已是最前一页")
				}else if('next' == queryDir){
					$.MsgBox('查询提示',"已是最后一页")
				}else{
					$.MsgBox('查询提示',"没有查到数据");clearAllData();
				}
			}
		}
	});  
}

//填充页面页面数据
function initPageData(bills){
	getAuthList(initDealDate);//初始化单据日期控件
	$("#topForm").data('bootstrapValidator').resetForm();
	var formObj = bills;
	var outstrorageNumList = bills.outstrorageNumOthersList;
	var payreceiptDetailList = bills.payreceiptDetailList;
	
//	initStorageSelect(bills.sectionId);
	initWLDWamount(bills.contactsunitId);
	
	//格式化数据
	formObj.billsDate = $.DateFormatFromTimestamp("yyyy-MM-dd",formObj.billsDate);

	//设置表单数据
	$(".gridTop").writeJson2Dom(formObj);
	$("input[name='billsDate']").val(formObj.billsDate);
	$(".gridBottom").writeJson2Dom(formObj);
	
	//设置明细数据
	dataGrid.clearDataGrid();
	for ( var int = 0; int < outstrorageNumList.length; int++) {
		var row = outstrorageNumList[int];
		if(row.outstrorageImList.length>0){
			row.imeiList = JSON.stringify(row.outstrorageImList);
		}
		row.giftFlag = row.giftFlag == 1 ?true:false;
		dataGrid.addRowData(int,row);
	}
	Summary();
	initData = getPageData();
	$.showBillsStatus("billsStautsImg",bills.billsStatus);
	if($("#slideThree").is(':checked')){	
		$(".delBt,.checkBt").attr({"disabled":"disabled"});
		$(".forceFinish,.copyBills,.print").removeAttr("disabled");
		$(".gridTop input:not(:hidden)").prop("readonly", true);
		//正式单据修改
		$(".gridTop input[name='remark']").prop("readonly", false);
		$(".delBt,.checkBt,.orderImport,.billsImport").attr({"disabled":"disabled"});
		
		dataGrid.$grid.setGridParam({cellEdit:false});
		dataGrid.$grid.hideCol("currStorageNumber");
	}else{
		//草稿单据修改
		if($(".gridTop").toJsonObject().id != ""){
			$(".gridTop input:not(:hidden)").not('input[name="billsCode"]').prop("readonly", false);	
			$(".gridTop input[name='remark']").prop("readonly", false);		
		}else{
			$(".gridTop input:not(:hidden)").not('input[name="billsCode"]').prop("readonly", false);
		}
		$(".delBt,.checkBt,.orderImport,.billsImport,.copyBills,.print").removeAttr("disabled");;
		$(".forceFinish").attr({"disabled":"disabled"});
		
		dataGrid.$grid.setGridParam({cellEdit:true});
		dataGrid.$grid.showCol("currStorageNumber");
		
	}  	

	$(".gridTop input:not(:hidden)").not('input[name="billsCode"],input[name="remark"],input[name="billsDate"],input[name="billsDiscount"]').prop("readonly", true);
	
	wResize();
	//已红冲的单据禁用红冲按钮
	if(bills.billsStatus == '7')
		$(".forceFinish").attr({"disabled":"disabled"});
};

/*************************分页 E******************************/
/*************************功能按钮事件 S******************************/

//仓库选择改变事件
function storageSelectChange(){
	var storageId = $("#storageSelect").val();
	var storageName = $("#storageSelect").find("option:selected").text();
	
	var ids=$("#dataGrid").getDataIDs();
    $.each(ids,function(i,value){
    	$("#dataGrid").jqGrid('setCell', value ,"storageId" ,storageId);
    	$("#dataGrid").jqGrid('setCell', value ,"storageName" ,storageName);
    });
}

//新增钮点击事件
function addBtClick(){
	if(checkIsEidited()){
		$.MsgBox("操作提示","当前单据未保存，是否放弃保存",function(){
			openAddState();
		},function(){
			
		});return;
	}else{
		openAddState();
	}
}

//清空数据
function clearAllData(){
	$("#topForm").data('bootstrapValidator').resetForm();

	//**清理表单（表头和表尾）
	var kong = { billsAmount:0,
		billsCode:"",
		billsDate:"",
		contactsunitId:"",
		contactsunitName:"",
		createBy:"",
		id:"",
		invalidBy:"",
		lastupdateBy:"",
		managersName:"",
		managersUid:"",
		postBy:"",
		remark:"",
		sectionId:"",
		sectionName:"",
		companyName:"",
		createByName:"",
		lastupdateByName:"",
		auditorName:"",
		forceFinishName:"",
		postByName:"",
		invalidByName:""
	}
	$(".gridTop").writeJson2Dom(kong);
	$(".gridBottom").writeJson2Dom(kong);
	$("#payrecetiptAmount").val(0);
	 $("#yuFu").val(0);
	 $("#yingFu").val(0);
	 $("#yuShou").val(0);
	 $("#yingShou").val(0);
	 
	//一些代码
	dataGrid.clearDataGrid();dataGrid.addKongRow();

	pageIndex = 0;pageCount = 0;//新增时 设置当前页为0  以便从第一张开始查询
	
	Summary();
	initData = getPageData();
	$(".print").attr({"disabled":"disabled"});
	$.showBillsStatus("billsStautsImg","1");
}
//打开添加状态
function openAddState(){
    try {
        $("#topForm").data('bootstrapValidator').resetForm();
	} catch (e) {
	}
	if($("#slideThree").is(':checked')){
		$("#slideThree").unbind( "change" );
		$("#slideThree").click();
		$("#slideThree").change(function() { 
			onTheSwitchChange();
		}); 
	}
	//**清理表单（表头和表尾）
	var kong = { billsAmount:0,
		billsCode:"",
		billsDate:"",
		contactsunitId:"",
		contactsunitName:"",
		createBy:"",
		id:"",
		invalidBy:"",
		lastupdateBy:"",
		managersName:"",
		managersUid:"",
		postBy:"",
		remark:"",
		sectionId:"",
		sectionName:"",
		companyName:"",
		createByName:"",
		lastupdateByName:"",
		auditorName:"",
		forceFinishName:"",
		postByName:"",
		invalidByName:""
	}
	$(".gridTop").writeJson2Dom(kong);
	$(".gridBottom").writeJson2Dom(kong);
	$("#payrecetiptAmount").val(0);
	 $("#yuFu").val(0);
	 $("#yingFu").val(0);
	 $("#yuShou").val(0);
	 $("#yingShou").val(0);
	 
	dataGrid.$grid.setGridParam({cellEdit:true});
	dataGrid.$grid.showCol("currStorageNumber");
	
	//一些代码
	dataGrid.clearDataGrid();dataGrid.addKongRow();
	//草稿单据修改
	$(".gridTop input:not(:hidden)").not('input[name="billsCode"]').prop("readonly", false);
	$(".delBt,.checkBt,.forceFinish,.print,.orderImport,.billsImport,.copyBills").attr({"disabled":"disabled"});
//	$('input[name="billsDate"]').val($.DateFormat(new Date(),"yyyy-MM-dd"));
	$(".billsImport").removeAttr("disabled");;
	pageIndex = 0;pageCount = 0;//新增时 设置当前页为0  以便从第一张开始查询

	$(".gridTop input:not(:hidden)").not('input[name="billsCode"],input[name="remark"],input[name="billsDate"],input[name="billsDiscount"]').prop("readonly", true);
	
	Summary();
	initData = getPageData();
	$.showBillsStatus("billsStautsImg","1");

	wResize();
}

//保存按钮点击事件
function saveBtClick(){
	try {MyEiditGrid.currEditDataGrid.unAllEdit();} catch (e) {}
	if($("input[name='managersName']").val()==""){
    	$.MsgBox('提示', '经办人不能为空');
        return;
    }
	//判断数量是否为0
	var tableid=$('#dataGrid').getCol('goodsNumber');
	if(tableid<0 || tableid==0){
		$.MsgBox('提示','数量不可小于或等于0');
		return;
	}
	
	//表单验证  
	$("#topForm").data('bootstrapValidator').validate();
	if(!($('#topForm').data('bootstrapValidator').isValid())){
		refreshValidator();
	    return ;
	}

	//表单
	var formObj = $(".gridTop").toJsonObject();
	$.extend(formObj,$(".gridBottom").toJsonObject());

	//判断是否是正式表保存
	if($("#slideThree").is(':checked')){
		formObj.billsDate = formObj.billsDate + " 00:00:00";
		billsDao.saveBillsRamark(formObj, function(data){
			if(data.result == 1){
				$.MsgBox('提示','单据备注保存成功');
				
				queryDir  = "refresh";
				initData = getPageData();
				queryPage();
			}else{
				$.MsgBox('出错提示',data.desc);
			}
		}, "stth_update");
		return;
	}
	var model = getPageData();
	if(model.outstrorageNumOthersList.length == 0){$.MsgBox('操作提示','明细为空');return;}
	billsDao.saveEntrustReturnedGoodsBills(model, function(data){
		if(data.result == 1){
			$.MsgBox('提示','操作成功');
			
			queryDir  = "refresh";
			$("#topForm input[name='id']").val(data.data.model.id);
			
			initData = getPageData();
			queryPage();
		}else{
			$.MsgBox('出错提示',data.desc);
		}
	}, "stth_update");
}

//获取页面数据
function getPageData(){
	getAuthList(initDealDate);//初始化单据日期控件
	//表单
	var formObj = $(".gridTop").toJsonObject();
	formObj.billsDate=$("input[name='billsDate']").val()
	$.extend(formObj,$(".gridBottom").toJsonObject());

	//出库数量明细
	formObj.outstrorageNumOthersList = dataGrid.getGridDataList();

	delete formObj["storageId"];
	
	//验证数据，提交保存
	//添加一些代码
	//code......
	var footerRow = $("#dataGrid").footerData("get");
	formObj.billsAmount = footerRow.amount.replace(",","");
	
	return formObj;
}

//删除按钮点击事件
function delBtClick(){
	
	$.MsgBox('删除提示','确定要删除此单据!',function(){del()},function(){});
	function del(){
		var topFormObj = $(".gridTop").toJsonObject();
		if(topFormObj.id != ""){
			var model = {};
			model.id = topFormObj.id;
			billsDao.delCgBills(model, function(data){
				if(data.result == 1){
					lastPage();
					$.MsgBox('提示','操作成功');
				}else{
					$.MsgBox('出错提示',data.desc);
				}
			}, "stth_delete");
		}else{
			$.MsgBox("消息提示","删除单据不存在!");
		}
	}
}

//过账按钮点击事件
function checkBtClick(){
	if(checkIsEidited()){
		$.MsgBox("操作提示","当前单据未保存，继续操作前请先保存");return;
	}
	$.MsgBox('过账提示','确定过账此单据!',function(){todo()},function(){});
	function todo(){
		var topFormObj = $(".gridTop").toJsonObject();
		if(topFormObj.id != ""){
			//审核请求
			billsDao.saveCheckOrder({id:topFormObj.id}, function(data){
				if(data.result == 1){
                	$("#topForm input[name='id']").val(data.data.billsId);
					
                	$("#slideThree").unbind( "change" );
                	$("#slideThree").click();
                	
                	queryDir  = "refresh";
                    queryPage();
                	
                	//重新绑定事件
                	$("#slideThree").on("change", function () {
                		onTheSwitchChange();
                	})	
					
					$.MsgBox('提示',data.desc);
				}else{
					$.MsgBox('出错提示',data.desc);
				}
			}, "stth_gz");
		}else{
			$.MsgBox("消息提示","过账单据不存在!");
		}
	}
}

//红冲按钮点击事件FORCE_FINISH
function forceFinishBtClick(){
	if(checkIsEidited()){
		$.MsgBox("操作提示","当前单据未保存，继续操作前请先保存");return;
	}
	var dateInputDIV = $(
			'<div class="form-horizontal"><div class="form-group">' +
			    '<label for="firstname" class="col-sm-5 control-label">红冲日期:</label>' +
			    '<div class="col-sm-7" style="padding-left: 0px;">' +
						'<div class="input-group">' +
					'<input type="text" class="form-control" name="hcDate" readonly>' +
			    '</div></div>' +
		    '</div></div>'		
	)
	var dateInput = dateInputDIV.find("input[name='hcDate']");
	dateInput.val($("input[name='billsDate']").val());
	
	dateInput.datetimepicker({
		  lang:"ch",           //语言选择中文
	      format:"Y-m-d",      //格式化日期
	      minDate:$('input[name="billsDate"]').val(),
	      timepicker:false,    //关闭时间选项
	      todayButton:false,    //关闭选择今天按钮
	      maxDate:_authList.maxDate,
	      minDate:$("input[name='billsDate']").val(),
	});
	
    BootstrapDialog.show({
        title: '单据红冲',
        message: dateInputDIV,
        size:BootstrapDialog.SIZE_SMALL,
        buttons: [{label: '确定', cssClass: 'btn-primary',action: function(dialogItself) {dialogItself.close();todo();}},
                  {label: '取消',action: function(dialogItself){dialogItself.close();}
        }]
    });
    
	function todo(){
		var topFormObj = $(".gridTop").toJsonObject();
		if(topFormObj.id != ""){
			billsDao.saveForceFinishOrder({id:topFormObj.id,invalidDate:dateInput.val()}, function(data){
				if(data.result == 1){
					$("#topForm input[name='id']").val(data.data.billsId);
					
					queryDir  = "refresh";
				    queryPage();
					$.MsgBox('提示',data.desc);
				}else{
					$.MsgBox('出错提示',data.desc);
				}
			}, "stth_red");
		}else{
			$.MsgBox("消息提示","红冲单据不存在!");
		}
	}
}

//过滤按钮点击事件
function filterBtClick(){
	$('#filterParamModalDialog').modal('show');
	
}

//刷新按钮点击事件
function refreshBtClick(){
	$.MsgBox("操作提示","确定刷新页面!",function(){				
		queryDir  = "refresh";
	    queryPage();
	},function(){});
}

//复制单据
function copyBtClick(){
	if(checkIsEidited()){
		$.MsgBox("操作提示","当前单据未保存，继续操作前请先保存");return;
	}
	$("#topForm").data('bootstrapValidator').resetForm();
	
	//判断是否是正式单据状态，是则改为草稿
	if($("#slideThree").is(':checked')){
		$("#slideThree").unbind( "change" );
		$("#slideThree").click();
		$("#slideThree").change(function() { 
			onTheSwitchChange();
		}); 
	}
	
	//置空不能复制的属性
	var kong = {
			billsCode:"",
			id:""
		}
	$(".gridTop").writeJson2Dom(kong);
	
	pageIndex = 0;pageCount = 0;//新增时 设置当前页为0  以便从第一张开始查询
	
	//草稿单据修改
	$(".gridTop input:not(:hidden)").not('input[name="billsCode"]').prop("readonly", false);
	$(".delBt,.checkBt,.forceFinish").removeAttr("disabled");;
	$(".forceFinish").attr({"disabled":"disabled"});
	
	dataGrid.$grid.setGridParam({cellEdit:true});
	$.showBillsStatus("billsStautsImg","1");
	$.MsgBox("操作提示","单据复制成功!");
}


//单据引入
function getSection(){
	var formObj = $(".gridTop").toJsonObject();
	return {sectionId:formObj.sectionId,sectionName:formObj.sectionName};
}
function billsReferenceBtClick(){
	if($("#slideThree").is(':checked'))return;
	
	var formObj = $(".gridTop").toJsonObject();
	if(formObj.sectionId == ""){
		$.MsgBox('操作消息',"请先选择部门");return;
	}
	
	if($('iframe[name="billsReferenceFrame"]').attr("src") == ""){
		$('iframe[name="billsReferenceFrame"]').attr("src",basePath+"/BillsImport/reference?billsQZ=STTH&defaultSelectBillsQZ=CGRK");
	}else{
		billsReferenceFrame.reLoadGrid();
	}
	
	$('#billsReferenceModal').modal('show').find('.referenceFrame').css({
	    height: $("html").height()/1.2,
	});
	callBack = function(){
		if(arguments[0].length == 0){
			$.MsgBox('提示消息',"未选中任何行");
			$('#billsReferenceModal').modal('hide');
			return ;
		}
		var bills = arguments[0];

		//将单据明细写入表格
		var detailList = bills.detailList;
		for ( var int = 0; int < detailList.length; int++) {
			var row = detailList[int];
			row.imeiList = JSON.stringify(row.imeiList);
			dataGrid.addRowData(MyEiditGrid.getMaxRowid(dataGrid.$grid)+1,detailList[int]);
		}
		Summary();
		$('#billsReferenceModal').modal('hide');
	}; 
}
/*************************功能按钮事件 E******************************/

//检查页面是否有编辑过
var initData = null;
function checkIsEidited(){
	return initData == null || _.isEqual(initData,getPageData())?false:true;
}

//初始化UI
function initUI(){
	//多选框
	$(".js-example-basic-multiple").select2({
		//data:data,
		'width': '153px',
		placeholder: "多选", //默认提示语
		language: "zh-CN"
	});
	

	//草稿切换按钮
	$("#slideThree").change(function() { 
		onTheSwitchChange();
	}); 
	
	//草稿按钮
	$(document).on('click','#slideThree',function(){
		$(".slideThree").toggleClass("color7D5F50");
		//  1   正式单据
		//  0   草稿单据
//		$('#slideThree').prop('checked') ? $('#slideThree').val('1') : $('#slideThree').val('0');
		if($('#slideThree').val() == 1){
			$('.deleteReceipts').attr('disabled','true');
			$('.transfer').attr('disabled','true');
			$('.redRush').removeAttr('disabled');
			//$('.audit').attr('disabled','true');
		}else{
			$('.deleteReceipts').removeAttr('disabled');
			$('.transfer').removeAttr('disabled');
			$('.redRush').attr('disabled','true');
		}
	})
	
	onTheSwitchChange();
	
	//初始化日期控件
    $("#billsDateBegin").val();
    $("#billsDateEnd").val();
	
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
//	$("input[name='billsDate']").val($.DateFormat(new Date(),"yyyy-MM-dd"));
	$("input[name='billsDate']").datetimepicker({
		  lang:"ch",           //语言选择中文
	      format:"Y-m-d",      //格式化日期
	      timepicker:false,    //关闭时间选项
	      todayButton:false    //关闭选择今天按钮
	}).on('blur', function (ev) {  
        refreshValidatorField("billsDate");//刷新验证信息
    }); 
}

//重置查询表单
function resetQueryForm(){
	var form = {
		billsCode:"",
		billsDateBegin:"",
		billsDateEnd:"",
		imei:"",
		contactsunitIdListStr:"",
		goodsNameIdListStr:"",
		remark:"",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
		sectionIdListStr:"",
		storageIdListStr:""
	}
	$(".filterParamForm").writeJson2Dom(form);
    $("#billsStatusCodeListStr").val("");
    $("#contactsunitIdListStr").val("");
    $("#sectionIdListStr").val("");
    $("#storageIdListStr").val("");
    $("#goodsNameIdListStr").val("");
}

//获取查询表单数据
function getQueryData(){
	var data = $(".filterParamForm").toJsonObject();
	data.billsStatusCodeListStr = $("#billsStatusCodeListStr").select2().val()==null?"":$("#billsStatusCodeListStr").select2().val().join(",");
	//data.storageIdListStr = $("#storageIdListStr").select2().val()==null?"":$("#storageIdListStr").select2().val().join(",");
	
	data.haveInvalid = $("input[name='haveInvalid']").is(':checked');
	return data;
}

function onTheSwitchChange(){
	try {
		if(checkIsEidited()){
			$.MsgBox('操作提示','当前页面数据未保存，是否放弃本次操作并打开一个新页面?',function(){
				initData = getPageData();
				todo();
			},function(){
				$("#slideThree").unbind("change");
				$("#slideThree").click();
				$("#slideThree").change(function() { 
					onTheSwitchChange();
				}); 		
			});
		}else{
			todo();
		}
		function todo(){
			if($("#slideThree").is(':checked')){	
				$(".delBt,.checkBt").attr({"disabled":"disabled"});
				$(".forceFinish").removeAttr("disabled");
				$(".gridTop input:not(:hidden)").prop("readonly", true);
				//正式单据修改
				$(".gridTop input[name='remark']").prop("readonly", false);
				$(".delBt,.checkBt,.orderImport,.billsImport").attr({"disabled":"disabled"});
				
				dataGrid.$grid.setGridParam({cellEdit:false});
				dataGrid.$grid.hideCol("currStorageNumber");
			}else{
				//草稿单据修改
				if($(".gridTop").toJsonObject().id != ""){
					$(".gridTop input:not(:hidden)").not('input[name="billsCode"]').prop("readonly", false);	
					$(".gridTop input[name='remark']").prop("readonly", false);		
				}else{
					$(".gridTop input:not(:hidden)").not('input[name="billsCode"]').prop("readonly", false);
				}
				$(".delBt,.checkBt,.forceFinish").removeAttr("disabled");;
				$(".forceFinish").attr({"disabled":"disabled"});
				$(".delBt,.checkBt,.orderImport,.billsImport,.copyBills").removeAttr("disabled");;
				
				dataGrid.$grid.setGridParam({cellEdit:true});
				dataGrid.$grid.showCol("currStorageNumber");
			}  

			$(".gridTop input:not(:hidden)").not('input[name="billsCode"],input[name="remark"],input[name="billsDate"],input[name="billsDiscount"]').prop("readonly", true);
			
			//固定不能修改的
			$(".gridTop input[name='billsCode']").prop("readonly", true);
			
			lastPage();
			wResize();
		}
	} catch (e) {
	}
}

//初始化事件
function initEvents(){
	$(window).resize(wResize);//注册窗口改变事件
	wResize();
	$('.searchImei').bind('input propertychange click', function() {  
		$('#imeiUl').html('');
		//右匹配  最少输入5位数或以上
		if($.trim($('.searchImei').val()) != "" && $("input[name='sectionId']").val() != ""){

			//查询串号库存
			$.request({
				url: basePath + '/IstockIm/listByModel',
				type : "post",
				dataType : 'json',
				data:{keyWord:$.trim($('.searchImei').val()), storageMode:2},
				success:function(data){
					if(data.result != 1){$.MsgBox('错误提示',data.desc);return;};
					
					var ulHtml = '';
					if(data.data.dataList.length != 0){
						for(var i=0;i<data.data.dataList.length;i++){
							ulHtml += '<li onclick = "imeiUlLiClick({'+
					          'imei:\''+data.data.dataList[i].imei+'\','+
					          'auxiliaryImei:\''+data.data.dataList[i].auxiliaryImei+'\','+
					          'storageId:\''+data.data.dataList[i].storageId+'\','+
					          'storageName:\''+data.data.dataList[i].storageName+'\','+
					          'taxRate:\''+data.data.dataList[i].taxRate+'\','+
					          'stockNum:\''+data.data.dataList[i].stockNum+'\','+
					          'goodsId:\''+data.data.dataList[i].goodsId+'\','+
					          'goodsName:\''+data.data.dataList[i].goodsName+'\''+
					          '})">'+data.data.dataList[i].imei+'</li>';
						}
					}else{
						ulHtml += '<li>暂无数据</li>';
					}
					$('#imeiUl').html(ulHtml);
					$('.none-cx').width($('.wiRes').width()); 
					$('.none-cx').show();
				}
			});
		}
    });
}

//窗口大小改变
function wResize(){
	var winH = $(window).height();//浏览器高度
	var winW = $(window).width();//浏览器宽度
	var centerH = winH - 500;//中部高度
	if(centerH < 350){
		centerH = 350;
	}
	$(".gridBody").height(centerH);
	$("#dataGrid").setGridHeight(centerH);
	$("#dataGrid").setGridWidth($(window).width()-30); 
	$("#dataGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
	
	$("#dataGrid5").setGridHeight(centerH);
	$("#dataGrid4").setGridHeight(centerH);
	$(".referenceFrame").height(winH - 300);
}

//打开引用对话框
var callBack ;

//打开往来单位引用对话框
function selectContactUnitReferenceOpen(){
	if($("#slideThree").is(':checked'))return;
	
	//传入单选标志
	contactUnitReferenceFrame.mulSelect(false);
	$('#contactUnitReferenceModal').modal('show').find('.referenceFrame').css({
	    height: $("html").height()/1.25,
	});
	callBack = function(){
		if(arguments[0].length == 0){
			$('#contactUnitReferenceModal').modal('hide');
			return ;
		}
		var contactUnit = arguments[0][0];

		//设置编辑器值
		$("input[name='contactsunitName']").val(contactUnit.name);
		$("input[name='contactsunitId']").val(contactUnit.id);

		//切换往来单位余额
		initWLDWamount(contactUnit.id);
		
		$('#contactUnitReferenceModal').modal('hide');
		refreshValidatorField("contactsunitName");//刷新验证信息
	}; 
}

//打开部门引用对话框
function selectSectionReferenceOpen(){
	if($("#slideThree").is(':checked'))return;
	
	//传入单选标志
	sectionReferenceFrame.mulSelect(false);
	$('#sectionReferenceModal').modal('show').find('.referenceFrame').css({
	    height: $("html").height()/2,
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
//		initStorageSelect(model.id);

		$('input[name="managersUid"').val("");
		$('input[name="managersName"').val("");
		
		$('#sectionReferenceModal').modal('hide');
		//refreshValidator();
	}; 
}

//打开职员引用对话框
function selectEmployeeReferenceOpen(){
	if($("#slideThree").is(':checked'))return;
	
	//检查部门是否选择
	if($("input[name='sectionId']").val() == ""){
		$.MsgBox('操作提示','部门还没选择');
		return;
	}
	$('#employeeReferenceModal').modal('show').find('.referenceFrame').css({
	    height: $("html").height()/1.25,
	});
	
	//alert($("input[name='sectionId']").val());
	employeeReferenceFrame.setSectionId($("input[name='sectionId']").val()) ;
	callBack = function(){
		if(arguments[0].length == 0){
			$('#employeeReferenceModal').modal('hide');
			return ;
		}
		var model = arguments[0][0];

		//设置编辑器值
		$("input[name='managersUid']").val(model.id);
		$("input[name='managersName']").val(model.name);

		$('#employeeReferenceModal').modal('hide');
		refreshValidatorField("managersName");//刷新验证信息
	}; 
}

//打开仓库引用对话框
function selectStorageReferenceOpen(cellInfo){
	var gridId = cellInfo.gridId;
	var grid = $("#"+gridId);
	var rowid = cellInfo.rowId;
	var inptid = cellInfo.cellInputId;
	
	$('#storageReferenceModal').modal('show').find('.referenceFrame').css({
	    height: $("html").height()/1.25,
	});
	callBack = function(){
		if(arguments[0].length == 0){
			$('#storageReferenceModal').modal('hide');
			return ;
		}
		var storage = arguments[0][0];
		
		//设置编辑器值
		$("#"+gridId+" #"+inptid).val(storage.name);
		
		$("#dataGrid").jqGrid('setCell', rowid ,"storageId" ,storage.id);

		$('#storageReferenceModal').modal('hide');
		
		//根据仓库和商品去入库数量表里查询库存数量
		var currRow = $("#dataGrid").jqGrid('getRowData', rowid);
		//*********ajax查询库存 这里暂时放假数据********
		//查询串号库存
		if(currRow.goodsName != ""){
			var toUrl = this.basePath + '/IstockNum/listByModel';
			if(currRow.ifManageImei == "true"){
				toUrl = this.basePath + '/IstockIm/listByModel';	
			}
			queryStorageNum("dataGrid",rowid,"currStorageNumber",toUrl,{storageId:currRow.storageId,goodsId:currRow.goodsId});
		}
	};
}

//提取表格合格数据列表
function getObjListFromGrid(){
	
    //验证表格行数据是否合法
    function verifyRow(row){
    	//**加入验证逻辑
    	//**写些代码
    	if(row.goodsId == "" || row.goodsNumber == 0 || row.storageId == "")
    		return false;
    	
    	return true;
    }
	var objList = [];
	var ids=$("#dataGrid").getDataIDs();
    $.each(ids,function(i,value){
    	var row = $("#dataGrid").jqGrid('getRowData', value );
    	//提取合格数据
    	if( verifyRow(row) ){
    		if(row.imeiList != ""){
    			row.outstrorageImList = JSON.parse(row.imeiList);
    		}
    		row.goodsNumber = $.parseInt(row.goodsNumber) ;
    		row.amount = $.parseFloat(row.amount).toFixed(2);
        	delete row["op"];
        	delete row["index"];
        	delete row["goodsName"];
        	delete row["storageName"];
        	delete row["ifEnableAuxliaryImei"];
        	delete row["ifManageImei"];
        	delete row["ifEnableAuxliaryImei"];
        	delete row["currStorageNumber"];
        	delete row["imeiList"];
    		objList.push(row);
    	}
    });
    return objList;
}

//初始化表格
var dataGrid = null;
function initDataGrid(){
	
	//配置
	var paras = {
	    gridId:'dataGrid', 
	    addRow:{goodsId:'',goodsCode:'',goodsName:'',cxSectionId:'',stockNum:'',numControlFlag:'',imControlFlag:'',cxNum:'',cxDiscount:'',cxPrice:'',price:'',remark:''},
	    colNames:[ '仓库ID','仓库名称','商品ID','类别','商品编码','商品名称','品牌','型号','颜色','现库存数量', '数量','单价','金额', '商品备注','是否串号管理','是否辅助串号管理','串号列表'], 
	    colModel:
	    	[  
             {name : 'storageId',index : 'storageId',align:'left',sortable: false,hidden: true}, 
             {name : 'storageName',sortable: false,index : 'storageName',align:'left',edittype:'custom_bt_input',custom_element_bt_click:"selectStorageReferenceOpen",editable:true},
             {name : 'goodsId',index : 'goodsId',align:'left',sortable: false,hidden: true},
             {name : 'categoryName',index : 'categoryName',editable:false,sortable: false},
             {name : 'code',index : 'code',editable:false,sortable:false},
             {name : 'goodsName',sortable: false,index : 'goodsName',align:'left',edittype:'custom_bt_input',custom_element_bt_click:"selectReferenceOpen",editable:true},
             {name : 'brandName',index : 'brandName',editable:false,sortable: false},
             {name : 'models',index : 'models',editable:false,sortable: false},
             {name : 'color',index : 'color',editable:false,sortable: false},
             {name : 'currStorageNumber',index : 'currStorageNumber',hidden: false,editable:false,sortable: false,formatter:'integer'},
             {name : 'goodsNumber',index : 'goodsNumber',align:'left',editable:true,sortable: false,editoptions:{onkeyup:"checkInput.clearNoNum(this,10)"}},
             {name : 'price',index : 'price',align:'left',editable:true,sortable: false,editoptions:{onkeyup:"checkInput.checkNum(this,12)"}},
             {name : 'amount',index : 'amount',align:'left',editable:false,editrules:{number:true},formatter:'number',sortable: false},
             {name : 'remark',index : 'remark',hidden: false,editable:true,sortable: false,editoptions:{onkeyup:"checkInput.clearNoText(this,100)"}},
             {name : 'ifManageImei',index : 'ifManageImei',hidden: true,editable:true,sortable: false},
             {name : 'ifEnableAuxliaryImei',index : 'ifEnableAuxliaryImei',hidden: true,editable:true,sortable: false},
             {name : 'imeiList',index : 'imeiList',hidden: true,editable:true,sortable: false}
           ]
	};
	//回调函数
	var callBackList = {
		onCellSelect:function(rowid,iCol,cellcontent,e){
			if(iCol == 12){

				try {MyEiditGrid.currEditDataGrid.unAllEdit();} catch (e) {}
				
	    	  var currRow = $("#dataGrid").jqGrid('getRowData', rowid);
	    	  if(currRow.storageName == "" || currRow.goodsName == ""){
	    		  $.MsgBox("操作提示","请先选择仓库和商品");
	    		  $("#dataGrid").setColProp("goodsNumber",{editable:false});
	    		  return false;
	    	  }
	    	  if((currRow.ifManageImei == "true" || $.trim(currRow.imeiList) != "") && currRow.goodsId != ""){
	    		  $("#dataGrid").setColProp("goodsNumber",{editable:false});
	    		  openInputImeiModal("dataGrid",rowid);
	    	  }else{
	    		  $("#dataGrid").setColProp("goodsNumber",{editable:true});
	    	  }
			}
		},
		afterEditCell:function(rowid,name,val,iRow,iCol){
//			if(iCol == 3){
//				$("#dataGrid #"+iRow+"_"+name).html("");
//				for ( var int = 0; int < currSectionStorageList.length; int++) {
//					$("#dataGrid #"+iRow+"_"+name).append("<option sid='"+currSectionStorageList[int].id+"' value='"+currSectionStorageList[int].name+"'>"+currSectionStorageList[int].name+"</option>");
//				}
//				$("#dataGrid #"+iRow+"_"+name+" option[value='"+val+"']").attr("selected",true);
//				$("#"+paras.gridId).jqGrid('setCell', rowid ,"storageId" ,$("#dataGrid #"+iRow+"_"+name).children('option:selected').attr("sid"));
//			}
		},
        afterSaveCell:function(rowid,name,val,iRow,iCol){
        	var currRow = $("#dataGrid").jqGrid('getRowData', rowid);
        	if(name == 'goodsNumber' && currRow.ifManageImei != "true"){
        		if($.parseInt(val) > $.parseInt(currRow.currStorageNumber)){
        			//输入数量小于现库存
        			$.MsgBox('错误提示','出库数量不能大于现库存');
        			$("#"+paras.gridId).jqGrid('setCell', rowid ,"goodsNumber" ,currRow.currStorageNumber);
        		}
        	}
        },
        summary:function(rowid,name,val,iRow,iCol){//统计处理
        	Summary();
        },
        getGridDataList:function(rows){
        	//筛出不合格行
        	return $.map(rows,function(row){
				if($.notEmpty(row.storageId) && $.notEmpty(row.goodsId) && row.goodsId != "0" && row.storageId != "0" && row.goodsNumber != 0 ){
		    		if($.notEmpty(row.imeiList)){
		    			row.outstrorageImList = JSON.parse(row.imeiList);
		    		}
		    		row.goodsNumber = $.parseInt(row.goodsNumber) ;
		    		row.amount = $.parseFloat(row.amount).toFixed(2);
		        	delete row["goodsName"];
		        	delete row["storageName"];
		        	delete row["ifEnableAuxliaryImei"];
		        	delete row["ifManageImei"];
		        	delete row["ifEnableAuxliaryImei"];
		        	delete row["currStorageNumber"];
		        	delete row["imeiList"];
		        	return row;
				}
        	});
        }
	};
	dataGrid = new MyEiditGrid(paras,callBackList);
	
    function my_inputxx(value, options) {
        var html =  '<select class="form-control" >'+
  		            '</select>';
        var em = $(html);
        em.change(function(){
        	$("#"+paras.gridId).jqGrid('setCell', options.rowId ,"storageId" ,em.children('option:selected').attr("sid"));
        });
  	    return em;             
      }
  	function my_valuexx(value) {
  	    return value.val();
  	}
}

//打开引用对话框
function selectReferenceOpen(cellInfo){
	var gridId = cellInfo.gridId;
	var grid = $("#"+gridId);
	var rowid = cellInfo.rowId;
	var inptid = cellInfo.cellInputId;
	var currRow = $("#dataGrid").jqGrid('getRowData', rowid);
	
	//传入单选标志
	goodsnameReferenceFrame.mulSelect(false,{storageMode:2, storageId:currRow.storageId});
	$('#goodsnameReferenceModal').modal('show').find('.referenceFrame').css({
	    height: $("html").height()/1.25,
	});
	callBack = function(){
		if(arguments[0].length == 0){
			$('#goodsnameReferenceModal').modal('hide');
			return ;
		}
		var goods = arguments[0][0];
		
		//清空关联数据       
		$("#dataGrid").jqGrid('setCell', rowid ,"discountRate" ,100);
		$("#dataGrid").jqGrid('setCell', rowid ,"taxRate" ,0);
		$("#dataGrid").jqGrid('setCell', rowid ,"ifManageImei" ," ");
		$("#dataGrid").jqGrid('setCell', rowid ,"imeiList" ," ");
		$("#dataGrid").jqGrid('setCell', rowid ,"goodsNumber" ,0);
		
		//设置编辑器值
		$("#"+gridId+" #"+inptid).val(goods.name);
		$("#"+gridId).jqGrid('setCell', rowid ,"code" ,goods.code);
    	$("#"+gridId).jqGrid('setCell', rowid ,"categoryName" ,goods.goodsCategoryName);
    	$("#"+gridId).jqGrid('setCell', rowid ,"brandName" ,goods.goodsBrandName);
    	$("#"+gridId).jqGrid('setCell', rowid ,"models" ,goods.goodsModel);
    	$("#"+gridId).jqGrid('setCell', rowid ,"color" ,goods.goodsColorName);
		$("#dataGrid").jqGrid('setCell', rowid ,"goodsId" ,goods.id);
		
		$("#dataGrid").jqGrid('setCell', rowid ,"ifManageImei" ,goods.ifManageImei);
		$("#dataGrid").jqGrid('setCell', rowid ,"ifEnableAuxliaryImei" ,goods.ifEnableAuxliaryImei);
		
		$('#goodsnameReferenceModal').modal('hide');
		
		//根据仓库和商品去入库数量表里查询库存数量
		//*********ajax查询库存 这里暂时放假数据********
		//查询串号库存
		var currRow = $("#dataGrid").jqGrid('getRowData', rowid);
		if(currRow.storageName != ""){
			var toUrl = this.basePath + '/IstockNum/listByModel';
			if(currRow.ifManageImei == "true"){
				toUrl = this.basePath + '/IstockIm/listByModel';	
			}
			queryStorageNum("dataGrid",rowid,"currStorageNumber",toUrl,{storageId:currRow.storageId,goodsId:currRow.goodsId});
		}
		
		//setTimeout('MyEiditGrid.getFocus('+'"#'+inptid+'")',200);
		Summary();
	}; 
}

//查询现库存
function queryStorageNum(gridId,rowId,fieldName,url,paras){
	$.request({
		url: url,
		type : "post",
		dataType : 'json',
		data:paras,
		success:function(data){
			if(data.result == 1){
				$("#"+gridId).jqGrid('setCell', rowId ,fieldName ,data.data.stockNum);
			}else{
				console.log(data);
			}
		}
	}); 
}

//汇总统计
function Summary(){

	//汇总每一行
	var ids=$("#dataGrid").getDataIDs();
    $.each(ids,function(i,value){
    	var currRow = $("#dataGrid").jqGrid('getRowData', value);
    	$("#dataGrid").jqGrid('setCell', value ,"amount" ,currRow.price * currRow.goodsNumber);
    	
    });
    
	//汇总
	var sumGoodsNumber = $("#dataGrid").getCol('goodsNumber', false, 'sum');  
	var sumAmount = $("#dataGrid").getCol('amount', false, 'sum');  
	$("#dataGrid").footerData("set",{index:"合计",goodsNumber:sumGoodsNumber,amount:sumAmount});
	
}

/**********************表格1 结束******************************************/

//加载刷新仓库列表
function initStorageSelect(sId){
	$.request({
		type: 'Get',
		url: basePath+'/Temployee/findKSYBM',
		dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
		success: function(data) {
			 var list = data.data.dataList;
			 currSectionStorageList = list;
			 $("#storageSelect").html("");
			 for ( var int = 0; int < list.length; int++) {
				 $("#storageSelect").append('<option value="'+list[int].id+'">'+list[int].name+'</option>');
			 }
		},
		error: function(msg) {
			alert(msg);
		}
	});
}


/**********************串号引入表格 开始******************************************/
//打开串号引入对话框
function openInputImeiModal(gridId,rowid){
//	if($("#slideThree").is(':checked'))return;
	try {MyEiditGrid.currEditDataGrid.unAllEdit();} catch (e) {}
	$('#inputStorageImeiModal').modal('show');
	$("#dataGridRowId2").val(gridId+"|"+rowid);
	
	var currRow = $("#"+gridId).jqGrid('getRowData', rowid);
	$("#goodsnameTitle2").html(currRow.goodsName);
	$("#storagenameTitle2").html(currRow.storageName);
	
	
	setDataGrid4();
	setDataGrid5(); 

	var width = $(window).width()*0.8;
		
	$("#inputStorageImeiModal_grid4").width((width-300)/2);
	$("#inputStorageImeiModal_grid5").width((width-300)/2);
	
	$("#dataGrid5").setGridWidth((width-300)/2);  
	$("#dataGrid5").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
	$("#dataGrid4").setGridWidth((width-300)/2);  
	$("#dataGrid4").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
	
	$("#dataGrid5").setGridHeight(300);
	$("#dataGrid4").setGridHeight(300);
	$("#inputStorageImeiModal_info_text").height(300);
	
	longInfo = 0;
	$("#inputStorageImeiModal_info_text").val("");
}

//点击保存引入串号事件
function saveInputImei(){
	if($("#slideThree").is(':checked'))return;
	if($('#havedInputNum').html() == "0"){
		return;
	}
	try {MyEiditGrid.currEditDataGrid.unAllEdit();} catch (e) {}
	var gridId = $("#dataGridRowId2").val().split("|")[0] ;
	var rowid = parseInt($("#dataGridRowId2").val().split("|")[1]) ;
	var objs = getObjListFromGrid5();
	
	$("#"+gridId).jqGrid('setCell', rowid ,"goodsNumber" ,objs.length);
	$("#"+gridId).jqGrid('setCell', rowid ,"imeiList" ,JSON.stringify(objs));

	$('#inputStorageImeiModal').modal('hide');
	Summary();

}

//获取串号引入对象数组
function getObjListFromGrid5(){
    return dataGrid5.getGridDataList();
}

var longInfo = 0;
//移入所有按钮点击事件
function inAllBtClick(){
	if($("#slideThree").is(':checked'))return;
	var ids=$.map( $("#dataGrid4").jqGrid('getDataIDs'), function(obj){return parseInt(obj);});
	for ( var int = 0; int < ids.length; int++) {
		var row =  $("#dataGrid4").jqGrid('getRowData', ids[int] );
		if(! _.isEqual(row,{})){
			longInfo = longInfo + 1;
			$("#dataGrid5").jqGrid('addRowData',MyEiditGrid.getMaxRowid($("#dataGrid5"))+1,row);
			$("#dataGrid4").jqGrid("delRowData", ids[int] ); 
			$("#inputStorageImeiModal_info_text").val($("#inputStorageImeiModal_info_text").val()+(longInfo)+"、串号"+row.imei+"录入\r\n");
		}
	}
	$("#havedInputNum").html($("#dataGrid5").jqGrid('getDataIDs').length);
}

//移出所有按钮点击事件
function outAllBtClick(){
	if($("#slideThree").is(':checked'))return;
	var ids=$.map( $("#dataGrid5").jqGrid('getDataIDs'), function(obj){return parseInt(obj);});
	for ( var int = 0; int < ids.length; int++) {
		var row =  $("#dataGrid5").jqGrid('getRowData',  ids[int] );
		if(! _.isEqual(row,{})){
			longInfo = longInfo + 1;
			$("#dataGrid4").jqGrid('addRowData',MyEiditGrid.getMaxRowid($("#dataGrid4"))+1,row);
			$("#dataGrid5").jqGrid("delRowData", ids[int] ); 
			$("#inputStorageImeiModal_info_text").val($("#inputStorageImeiModal_info_text").val()+(longInfo)+"、串号"+row.imei+"移除\r\n");
		}
	}	
	$("#havedInputNum").html($("#dataGrid5").jqGrid('getDataIDs').length);
}

//移入按钮点击事件
function inBtClick(){
	if($("#slideThree").is(':checked'))return;
	var ids=$.map( $("#dataGrid4").jqGrid('getGridParam','selarrrow'), function(obj){return parseInt(obj);});
	for ( var int = 0; int < ids.length; int++) {
		var row =  $("#dataGrid4").jqGrid('getRowData', ids[int] );
		if(! _.isEqual(row,{})){
			$("#dataGrid5").jqGrid('addRowData',MyEiditGrid.getMaxRowid($("#dataGrid5"))+1,row);
			$("#dataGrid4").jqGrid("delRowData", ids[int] ); 
		}
	}
	$("#havedInputNum").html($("#dataGrid5").jqGrid('getDataIDs').length);
}

//移出按钮点击事件
function outBtClick(){
	if($("#slideThree").is(':checked'))return;
	var ids=$.map( $("#dataGrid5").jqGrid('getGridParam','selarrrow'), function(obj){return parseInt(obj);});
	for ( var int = 0; int < ids.length; int++) {
		var row =  $("#dataGrid5").jqGrid('getRowData',  ids[int] );
		if(! _.isEqual(row,{})){
			$("#dataGrid4").jqGrid('addRowData',MyEiditGrid.getMaxRowid($("#dataGrid4"))+1,row);
			$("#dataGrid5").jqGrid("delRowData", ids[int] ); 
		}
	}	
	$("#havedInputNum").html($("#dataGrid5").jqGrid('getDataIDs').length);
}

//初始化表格
var dataGrid4 = null;
function initDataGrid4(){
	 var paras = {
		    gridId:'dataGrid4', 
		    addRow:{imei:'',auxiliaryImei:'',remark:''},
		    multiselect : true,
		    noShowOp:false,
		    colNames:['串号',  '成本', '辅助串号'], 
		    colModel:
		    	[ 
                 {name : 'imei',index : 'imei',align:'left',sortable: true,hidden: false,editable:false}, 
                 {name : 'costPrice',index : 'costPrice',align:'left',editable:false,hidden: true,sortable: false},
                 {name : 'auxiliaryImei',index : 'auxiliaryImei',align:'left',sortable: false}
	           ]
	 };
	 var callBackList = {
		afterEditCell:function(rowid,name,val,iRow,iCol){},
        afterSaveCell:function(rowid,name,val,iRow,iCol){},
        summary:function(rowid,name,val,iRow,iCol){},
        getGridDataList:function(rows){
        	//筛出不合格行
        	return $.map(rows,function(row){
				if(row.imei != ""){
		        	return row;
				}
        	});
        }
	 };
	 dataGrid4 = new MyEiditGrid(paras,callBackList);
}

//去库存表查询串号
function setDataGrid4(){
	//清空
	$("#dataGrid4").jqGrid('clearGridData');
	var gridId = $("#dataGridRowId2").val().split("|")[0] ;
	var rowid = parseInt($("#dataGridRowId2").val().split("|")[1]) ;
	var currRow = $("#"+gridId).jqGrid('getRowData', rowid);
	
	//查询串号库存
	$.request({
			url: this.basePath + '/IstockIm/listByModel',
			type : "post",
			dataType : 'json',
			data:{storageId:currRow.storageId,goodsId:currRow.goodsId},
			success:function(data){
				if(data.result == 1){
					$.each(data.data.dataList,function(i,item){
						if(!isHaveInput(item.imei)){
							$("#dataGrid4").jqGrid('addRowData',i,item);
						}
					});
					$("#"+gridId).jqGrid('setCell', rowid ,"currStorageNumber" ,data.data.dataList.length);
				}else{
					$.MsgBox('出错提示',data.desc);
				}
			}
	}); 
	function isHaveInput(imei){
		if("" != $.trim(currRow.imeiList)){
			  var imList = JSON.parse(currRow.imeiList);
			  for ( var int = 0; int < imList.length; int++) {
				  if(imList[int].imei == imei){
					  return true;
				  }
			  }
		}
		return false;
	}
	
}
//初始化表格
var dataGrid5 = null;
function initDataGrid5(){
	
	 var paras = {
		    gridId:'dataGrid5', 
		    addRow:{imei:'',auxiliaryImei:'',remark:''},
		    multiselect : true,
		    noShowOp:false,
		    colNames:['串号',  '辅助串号', '备注' ,'成本'],
		    colModel:
		    	[ 
                 {name : 'imei',index : 'imei',align:'left',sortable: true,hidden: false,editable:false}, 
                 {name : 'auxiliaryImei',index : 'auxiliaryImei',align:'left',sortable: false},
                 {name : 'remark',index : 'remark',align:'left',editable:true,sortable: false},
                 {name : 'costPrice',index : 'costPrice',align:'left',editable:false,sortable: false,hidden: true}
	           ]
	 };
	 var callBackList = {
		afterEditCell:function(rowid,name,val,iRow,iCol){},
        afterSaveCell:function(rowid,name,val,iRow,iCol){},
        summary:function(rowid,name,val,iRow,iCol){},
        getGridDataList:function(rows){
        	//筛出不合格行
        	return $.map(rows,function(row){
	        	delete row["costPrice"];
	        	delete row["index"];
	        	return row;
        	});
        }
	 };
	 dataGrid5 = new MyEiditGrid(paras,callBackList);
	 
}

function setDataGrid5(){
	//清空
	$("#dataGrid5").jqGrid('clearGridData');
	var gridId = $("#dataGridRowId2").val().split("|")[0] ;
	var rowid = parseInt($("#dataGridRowId2").val().split("|")[1]) ;
	var currRow = $("#"+gridId).jqGrid('getRowData', rowid);
	if("" != $.trim(currRow.imeiList)){
		  var imList = JSON.parse(currRow.imeiList);  
		  $("#havedInputNum").html(imList.length);
		  $.each(imList,function(i,obj){
			  $("#dataGrid5").jqGrid('addRowData',i,obj);
		  });
	}else{
		$("#havedInputNum").html(0);
	}

}

/**********************串号引入表格 结束******************************************/

/**********************串号搜索 开始******************************************/

function imeiUlLiClick(obj){
	var queryModel = {goodsId:obj.goodsId,storageId:obj.storageId};
	var imeiModel = {imei:obj.imei,auxiliaryImei:obj.auxiliaryImei};
	
	obj.ifManageImei = true;
	
	$(".searchImei").focus();
	$('.none-cx').hide();
	if(!dataGrid.isCanEdit())return;
	if(!dataGrid.isExistRow(queryModel)){
		
		obj.imeiList = JSON.stringify([imeiModel])
		obj.goodsNumber = 1;
		obj.discountRate = 100;
		obj.currStorageNumber = obj.stockNum;
		dataGrid.addRowData(MyEiditGrid.getMaxRowid($("#dataGrid"))+1,obj);
		Summary();
	}else{
		var row = dataGrid.getRowByModel(queryModel);
		var imeiList = $.trim(row.imeiList) == ""?[]:JSON.parse(row.imeiList);
		for ( var int = 0; int < imeiList.length; int++) {
			  if(imeiList[int].imei == imeiModel.imei){
				  $.MsgBox("消息提示","串号已经引入");
				  return ;
			  }
		}
		imeiList.push(imeiModel);
		$("#"+row.gridId).jqGrid('setCell', row.rowId ,"imeiList" ,JSON.stringify(imeiList));
		$("#"+row.gridId).jqGrid('setCell', row.rowId ,"goodsNumber" ,(parseInt(row.goodsNumber) + 1));
		Summary();
	}
	dataGrid.clearRowByPara({storageId:'',goodsId:''});
}
/**********************串号搜索 结束******************************************/


//打开仓库引用对话框  输值给模板
function selectStorageReferenceOpen_(){
	if($("#slideThree").is(':checked'))return;

	$('#storageReferenceModal').modal('show').find('.referenceFrame').css({
	    height: $("html").height()/1.25,
	});
	callBack = function(){
		if(arguments[0].length == 0){
			$('#storageReferenceModal').modal('hide');
			return ;
		}
		var model = arguments[0][0];
		
		$("input[name='tempStorageName']").val(model.name);
		dataGrid.setKongRow({storageId:model.id,storageName:model.name,discountRate:100,price:'',remark:''});
		
		$('#storageReferenceModal').modal('hide');
		
	};
}

//往来单位余额
function initWLDWamount(id){
	$.request({
		type: 'post',
		url: basePath+'/TcontactUnit/findContactUnitAmount',
		dataType: "json", 
		data:{id:id},
		success: function(data) {
			 var amount = data.data.amount;
			 $("#yuFu").val(amount.yuFu.toFixed(2));
			 $("#yingFu").val(amount.yingFu.toFixed(2));
			 $("#yuShou").val(amount.yuShou.toFixed(2));
			 $("#yingShou").val(amount.yingShou.toFixed(2));
		},
		error: function(msg) {
			alert(msg);
		}
	});
}


/**********************过滤 参数选择******************************************/
function initQueryUi(){
	$("#sectionIdListStr,#goodsNameIdListStr,#contactsunitIdListStr").bind('input propertychange', function() {  
		//if($.trim($(this).val()) == ""){		
			$(this).val("");
			$("input[name='"+this.id+"']").val("");
		//}
    });
}

//判断ID是否存在一个字符串列表里面
function isHave(value,list){
	var havedTag = false;
	for (var int2 = 0; int2 < list.length; int2++) {
		if(list[int2] == (value+"")){
			havedTag = true;
			break;
		}
	}	
	return havedTag;
}

//打开往来单位引用对话框
function selectContactUnitReferenceForFiterOpen(){
	$('#contactUnitReferenceModal').modal('show').find('.referenceFrame').css({
	    height: $("html").height()/1.25,
	});
	
	//传入多选标志
	contactUnitReferenceFrame.mulSelect(true);
	
	callBack = function(){
		if(arguments[0].length == 0){
			$('#contactUnitReferenceModal').modal('hide');
			return ;
		}
		var model = arguments[0];

		var ids = [];
		var names = [];
		for (var int = 0; int < model.length; int++) {
			//去重复
			if(!isHave(model[int].id, $("input[name='contactsunitIdListStr']").val().split(","))){
				ids.push(model[int].id);
				names.push(model[int].name);
			}
		}
		
		//如果没有加入新的 则隐藏对话框
		if(ids.length == 0){
			$('#contactUnitReferenceModal').modal('hide');
			return;
		}
		
		//设置编辑器值
		if($("input[name='contactsunitIdListStr']").val() == ""){
			$("input[name='contactsunitIdListStr']").val(ids.join(","));
			$("#contactsunitIdListStr").val(names.join(","));
		}else{
			$("input[name='contactsunitIdListStr']").val($("input[name='contactsunitIdListStr']").val() + "," + ids.join(","));
			$("#contactsunitIdListStr").val($("#contactsunitIdListStr").val() + "," + names.join(","));
		}
		$('#contactUnitReferenceModal').modal('hide');
	}; 
}

//打开部门引用对话框
function selectSectionReferenceForFiterOpen(valId){
	$('#sectionReferenceModal').modal('show').find('.referenceFrame').css({
	    height: $("html").height()/2,
	});
	
	//传入多选标志
	sectionReferenceFrame.mulSelect(true, $("input[name='"+valId+"']").val());
	
	callBack = function(){
		if(arguments[0].length == 0){
			$('#sectionReferenceModal').modal('hide');
			return ;
		}
		

        $("input[name='sectionIdListStr']").val("");
        $("#sectionIdListStr").val("");
	
		var model = arguments[0];
		var ids = [];
		var names = [];
		for (var int = 0; int < model.length; int++) {
			//去重复
			if(!isHave(model[int].id, $("input[name='sectionIdListStr']").val().split(","))){
				ids.push(model[int].id);
				names.push(model[int].name);
			}
		}
		
		//如果没有加入新的 则隐藏对话框
		if(ids.length == 0){
			$('#sectionReferenceModal').modal('hide');
			return;
		}
		
		//设置编辑器值
		if($("input[name='sectionIdListStr']").val() == ""){
			$("input[name='sectionIdListStr']").val(ids.join(","));
			$("#sectionIdListStr").val(names.join(","));
		}else{
			$("input[name='sectionIdListStr']").val($("input[name='sectionIdListStr']").val() + "," + ids.join(","));
			$("#sectionIdListStr").val($("#sectionIdListStr").val() + "," + names.join(","));
		}
		$('#sectionReferenceModal').modal('hide');
	}; 
}

//打开商品名称引入对话框
function selectGoodsNameReferenceForFiterOpen(){
	$('#goodsnameReferenceModal').modal('show').find('.referenceFrame').css({
	    height: $("html").height()/1.25,
	});
	
	//传入多选标志
	goodsnameReferenceFrame.mulSelect(true,{storageMode:2});
	
	callBack = function(){
		if(arguments[0].length == 0){
			$('#goodsnameReferenceModal').modal('hide');
			return ;
		}
		var model = arguments[0];
		var ids = [];
		var names = [];
		for (var int = 0; int < model.length; int++) {
			//去重复
			if(!isHave(model[int].id, $("input[name='goodsNameIdListStr']").val().split(","))){
				ids.push(model[int].id);
				names.push(model[int].name);
			}
		}
		
		//如果没有加入新的 则隐藏对话框
		if(ids.length == 0){
			$('#goodsnameReferenceModal').modal('hide');
			return;
		}
		
		//设置编辑器值
		if($("input[name='goodsNameIdListStr']").val() == ""){
			$("input[name='goodsNameIdListStr']").val(ids.join(","));
			$("#goodsNameIdListStr").val(names.join(","));
		}else{
			$("input[name='goodsNameIdListStr']").val($("input[name='goodsNameIdListStr']").val() + "," + ids.join(","));
			$("#goodsNameIdListStr").val($("#goodsNameIdListStr").val() + "," + names.join(","));
		}

		$('#goodsnameReferenceModal').modal('hide');
	}; 
}
/**********************过滤 参数选择******************************************/

