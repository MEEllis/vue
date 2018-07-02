
var billsDao = new Bills(basePath);

$(function(){
	initUI();//初始化UI
	initDataGrid();//初始化表格
	initDataGrid3();//串号录入
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
		$.printBills(basePath + '/purchase/print/beentrustInStorage', 
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
	model.billsType = "5";
	
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
		url: this.basePath + '/IbillsMain/page/strk_query',
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
	var instrorageNumList = bills.instrorageOthersNumList;
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
	for ( var int = 0; int < instrorageNumList.length; int++) {
		var row = instrorageNumList[int];
		if(row.instrorageImList.length>0){
			row.imeiList = JSON.stringify(row.instrorageImList);
		}
		row.giftFlag = row.giftFlag == 1 ?true:false;
		//插入空数据的1行
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
		dataGrid3.$grid.setGridParam({cellEdit:false});

	}else{
		//草稿单据修改
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
		dataGrid3.$grid.setGridParam({cellEdit:true});

	}  	

	$(".gridTop input:not(:hidden)").not('input[name="billsCode"],input[name="remark"],input[name="billsDate"],input[name="billsDiscount"]').prop("readonly", true);
	
	//已红冲的单据禁用红冲按钮
	if(bills.billsStatus == '7')
		$(".forceFinish").attr({"disabled":"disabled"});
};

/*************************分页 E******************************/

/*************************功能按钮事件 S******************************/

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

	 $("#yuFu").val(0);
	 $("#yingFu").val(0);
	 $("#yuShou").val(0);
	 $("#yingShou").val(0);
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
	 $("#yuFu").val(0);
	 $("#yingFu").val(0);
	 $("#yuShou").val(0);
	 $("#yingShou").val(0);
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
	
	dataGrid.$grid.setGridParam({cellEdit:true});
	dataGrid3.$grid.setGridParam({cellEdit:true});
	
	//一些代码
	dataGrid.clearDataGrid();dataGrid.addKongRow();
	//草稿单据修改
	$(".gridTop input:not(:hidden)").not('input[name="billsCode"]').prop("readonly", false);
	$(".delBt,.checkBt,.forceFinish,.print,.orderImport,.billsImport,.copyBills").attr({"disabled":"disabled"});
    /*$("input[name='billsDate']").val(_authList.maxDate);*/
	$(".billsImport").removeAttr("disabled");;
	pageIndex = 0;pageCount = 0;//新增时 设置当前页为0  以便从第一张开始查询

	$(".gridTop input:not(:hidden)").not('input[name="billsCode"],input[name="remark"],input[name="billsDate"],input[name="billsDiscount"]').prop("readonly", true);
	
	Summary();
	initData = getPageData();
	$.showBillsStatus("billsStautsImg","1");
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
		}, "strk_update");
		return;
	}

	var model = getPageData();
	if(model.instrorageOthersNumList.length == 0){$.MsgBox('操作提示','明细为空');return;}
	
	//验证明细数据的合法性
	var allImeis = getAllImei(model.instrorageOthersNumList);
	for (var int = 0; int < model.instrorageOthersNumList.length; int++) {
		var ddetail = model.instrorageOthersNumList[int];

		//验证串号是否重复
		if($.trim(ddetail.instrorageImList) != ''){
			for (var int2 = 0; int2 < ddetail.instrorageImList.length; int2++) {
				if(checkImeiIsRepeat(allImeis,ddetail.instrorageImList[int2].imei,ddetail.goodsName) || checkImeiIsRepeat(allImeis,ddetail.instrorageImList[int2].auxiliaryImei,ddetail.goodsName)){
					return;
				}
			}
		}
	}
	billsDao.saveEntrustInStorageBills(model, function(data){
		if(data.result == 1){
			$.MsgBox('提示','操作成功');
			
			queryDir  = "refresh";
			$("#topForm input[name='id']").val(data.data.model.id);
			
			initData = getPageData();
			queryPage();
		}else{
			$.MsgBox('出错提示',data.desc);
		}
	});
}

//验证串号是否存在
function checkImeiIsRepeat(allImeis,imei,goodsName){
	var checkNum = 0;
	if($.trim(imei) == '')return false;
	for (var i = 0; i < allImeis.length; i++) {
		if($.trim(allImeis[i].imei) == $.trim(imei) || $.trim(allImeis[i].auxiliaryImei) == $.trim(imei)){
			checkNum++;
		}
		if(checkNum > 1){
			$.MsgBox('明细串号校验提示','商品['+ goodsName +']的串号:'+$.trim(imei)+'存在重复');
			return true;
		}
	}
	return false;
}

//遍历明细获取串号列表
function getAllImei(instrorageNumList){
	var imeis = [];
	for (var int = 0; int < instrorageNumList.length; int++) {
		if($.trim(instrorageNumList[int].instrorageImList) != ''){
			for (var int2 = 0; int2 < instrorageNumList[int].instrorageImList.length; int2++) {
				imeis.push({imei:instrorageNumList[int].instrorageImList[int2].imei,auxiliaryImei:instrorageNumList[int].instrorageImList[int2].auxiliaryImei});
			}
		}
	}
	return imeis;
}

//获取页面数据
function getPageData(){
	getAuthList(initDealDate);//初始化单据日期控件
	//表单
	var formObj = $(".gridTop").toJsonObject();
	formObj.billsDate=$("input[name='billsDate']").val()
	$.extend(formObj,$(".gridBottom").toJsonObject());

	//入库数量明细
	formObj.instrorageOthersNumList = dataGrid.getGridDataList();

	//验证数据，提交保存
	//添加一些代码
	//code......
	var footerRow = $("#dataGrid").footerData("get");
	formObj.billsAmount = $.parseFloat(footerRow.amount);
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
			}, "strk_delete");
			
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
			}, "strk_gz");
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
			}, "strk_red");
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
	dataGrid3.$grid.setGridParam({cellEdit:true});
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
		$('iframe[name="billsReferenceFrame"]').attr("src",basePath+"/BillsImport/reference?billsQZ=STRK&defaultSelectBillsQZ=CGRK");
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
	/*$("input[name='billsDate']").val(_authList.maxDate);*/
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
				dataGrid3.$grid.setGridParam({cellEdit:false});
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
				dataGrid3.$grid.setGridParam({cellEdit:true});
			}  

			$(".gridTop input:not(:hidden)").not('input[name="billsCode"],input[name="remark"],input[name="billsDate"],input[name="billsDiscount"]').prop("readonly", true);
			
			//固定不能修改的
			$(".gridTop input[name='billsCode']").prop("readonly", true);
			
			lastPage();
		}
	} catch (e) {
	}
}

//初始化事件
function initEvents(){
	$(window).resize(wResize);//注册窗口改变事件
	wResize();
}

//窗口大小改变
function wResize(){
	var winH = $(window).height();//浏览器高度
	var winW = $(window).width();//浏览器宽度
	var centerH = winH - 400;//中部高度
	if(centerH < 350){
		centerH = 350;
	}
	$(".gridBody").height(centerH);
	$("#dataGrid").setGridHeight(centerH);
	$("#dataGrid").setGridWidth($(window).width()-30); 
	$("#dataGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
	
	$("#dataGrid2").setGridHeight(centerH-100);
	$("#dataGrid3").setGridHeight(centerH-100);
	$("#dataGrid3").setGridWidth(748);
	$("#dataGrid3").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
	$(".referenceFrame").height(winH - 300);
}

//初始化表格
var dataGrid = null;
function initDataGrid(){
	
	//配置
	var paras = {
	    gridId:'dataGrid', 
	    addRow:{goodsId:'',goodsCode:'',goodsName:'',cxSectionId:'',stockNum:'',numControlFlag:'',imControlFlag:'',cxNum:'',cxDiscount:'',cxPrice:'',price:'',remark:''},
	    colNames:['仓库ID','仓库名称','商品ID','类别','商品编码','商品名称','品牌','型号','颜色', '数量','单价','金额', '商品备注','是否串号管理','是否辅助串号管理','串号列表','串号长度','辅助串号长度'],  
	    colModel:
	    	[ 
	         {name : 'storageId',index : 'storageId',align:'left',sortable: false,hidden: true,formatter:'integer'}, 
             {name : 'storageName',sortable: false,index : 'storageName',align:'left',edittype:'custom_bt_input',custom_element_bt_click:"selectStorageReferenceOpen",editable:true},
	         {name : 'goodsId',index : 'goodsId',align:'left',sortable: false,hidden: true,formatter:'integer'},
	         {name : 'categoryName',index : 'categoryName',editable:false,sortable: false},
	         {name : 'code',index : 'code',editable:false,sortable:false},
	         {name : 'goodsName',sortable: false,index : 'goodsName',align:'left',edittype:'custom_bt_input',custom_element_bt_click:"selectReferenceOpen",editable:true},
	         {name : 'brandName',index : 'brandName',editable:false,sortable: false},
             {name : 'models',index : 'models',editable:false,sortable: false},
             {name : 'color',index : 'color',editable:false,sortable: false},
	         {name : 'goodsNumber',index : 'goodsNumber',align:'left',editable:false,sortable: false,editoptions:{onkeyup:"checkInput.clearNoNum(this,10)"}},
	         {name : 'price',index : 'price',align:'left',editable:true,sortable: false,editoptions:{onkeyup:"checkInput.checkNum(this,12)"}},
	         {name : 'amount',index : 'amount',align:'left',editable:false,editrules:{number:true},formatter:'number',sortable: false},
	         {name : 'remark',index : 'remark',hidden: false,editable:true,sortable: false,editoptions:{onkeyup:"checkInput.clearNoText(this,100)"}},
	         {name : 'ifManageImei',index : 'ifManageImei',hidden: true,editable:true,sortable: false},
	         {name : 'ifEnableAuxliaryImei',index : 'ifEnableAuxliaryImei',hidden: true,editable:true,sortable: false},
	         {name : 'imeiList',index : 'imeiList',hidden: true,editable:true,sortable: false},
             {name : 'imeiLength',index : 'imeiLength',hidden: true,editable:true,sortable: false,hidden: true},
             {name : 'auxliaryImeiLength',index : 'auxliaryImeiLength',hidden: true,editable:true,sortable: false,hidden: true}
	         
           ]
	};
	//回调函数
	var callBackList = {
		onCellSelect:function(rowid,iCol,cellcontent,e){
			if(iCol == 11){
			  var currRow = $("#dataGrid").jqGrid('getRowData', rowid);
			  
		      //判断是否数量录入 并判断是否串号管理
		      if("true" == currRow.ifManageImei || $.trim(currRow.imeiList) != ""){
		    	  $("#dataGrid").setColProp("goodsNumber",{editable:false});
		    	  openImeiInputModal("dataGrid",rowid);//打开输入框	  
		      }else{
		    	  $("#dataGrid").setColProp("goodsNumber",{editable:true});  
		      }
			}
		},
		beforeEditCell:function(rowid,cellname,v,iRow,iCol){
			lastrow = iRow;
			lastcell = iCol;
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
        afterSaveCell:function(rowid,name,val,iRow,iCol){},
        summary:function(rowid,name,val,iRow,iCol){//统计处理
        	Summary();
        },
        getGridDataList:function(rows){
        	//筛出不合格行
        	return $.map(rows,function(row){
				if($.notEmpty(row.storageId) && $.notEmpty(row.goodsId) && row.goodsId != "0" && row.storageId != "0" && row.goodsNumber != 0 ){
		    		if($.notEmpty(row.imeiList)){
		    			row.instrorageImList = JSON.parse(row.imeiList);
		    		}
		    		row.goodsNumber = $.parseInt(row.goodsNumber) ;
		    		row.amount = $.parseFloat(row.amount).toFixed(2);
		        	delete row["ifEnableAuxliaryImei"];
		        	delete row["ifManageImei"];
		        	delete row["ifEnableAuxliaryImei"];
		        	delete row["imeiLength"];
		        	delete row["auxliaryImeiLength"];
		        	delete row["imeiList"];
		        	delete row["giftFlag"];
		        	
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
var callBack ;
function selectReferenceOpen(cellInfo){
	var gridId = cellInfo.gridId;
	var grid = $("#"+gridId);
	var rowid = cellInfo.rowId;
	var inptid = cellInfo.cellInputId;
	
	//传入单选标志
	goodsnameReferenceFrame.mulSelect(false,{storageMode:2});
	$('#goodsnameReferenceModal').modal('show').find('.referenceFrame').css({
	    height: $("html").height()/1.25,
	});
	callBack = function(){
		if(arguments[0].length == 0){
			$('#goodsnameReferenceModal').modal('hide');
			return ;
		}
		var goods = arguments[0][0];
		var currRow = $("#dataGrid").jqGrid('getRowData', rowid);
		
		//设置编辑器值
		//设置编辑器值
		$("#"+gridId+" #"+inptid).val(goods.name);
		$("#"+gridId).jqGrid('setCell', rowid ,"code" ,goods.code);
    	$("#"+gridId).jqGrid('setCell', rowid ,"categoryName" ,goods.goodsCategoryName);
    	$("#"+gridId).jqGrid('setCell', rowid ,"brandName" ,goods.goodsBrandName);
    	$("#"+gridId).jqGrid('setCell', rowid ,"models" ,goods.goodsModel);
    	$("#"+gridId).jqGrid('setCell', rowid ,"color" ,goods.goodsColorName);
		//清空关联数据       
		$("#dataGrid").jqGrid('setCell', rowid ,"ifManageImei" ," ");
		$("#dataGrid").jqGrid('setCell', rowid ,"imeiList" ," ");
		$("#dataGrid").jqGrid('setCell', rowid ,"goodsNumber" ,0);
		
		//设置值
		$("#dataGrid").jqGrid('setCell', rowid ,"imeiLength" ," ");//解决空字符串写入不了的奇怪问题
		$("#dataGrid").jqGrid('setCell', rowid ,"auxliaryImeiLength" ," ");//解决空字符串写入不了的奇怪问题
		$("#dataGrid").jqGrid('setCell', rowid ,"goodsId" ,goods.id);
		$("#dataGrid").jqGrid('setCell', rowid ,"ifManageImei" ,goods.ifManageImei);
		$("#dataGrid").jqGrid('setCell', rowid ,"ifEnableAuxliaryImei" ,goods.ifEnableAuxliaryImei);
		$("#dataGrid").jqGrid('setCell', rowid ,"imeiLength" ,goods.imeiLength);
		$("#dataGrid").jqGrid('setCell', rowid ,"auxliaryImeiLength" ,goods.auxliaryImeiLength);
		$('#goodsnameReferenceModal').modal('hide');
		//setTimeout('MyEiditGrid.getFocus('+'"#'+inptid+'")',200);
		Summary();
	}; 
}

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
	};
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

/**********************表格1 开始******************************************/

//打开串号录入
var currImeiLength = null;
var currAuxliaryImeiLength = null;
var imeiListRow=[];
function openImeiInputModal(gridId,rowid){
	var imiData=getPageData();
	var imeiDataList=imiData.instrorageOthersNumList;
	var imeiListDetailRow=[];
	if(imeiDataList!=undefined&&imeiDataList.length>0){
		for(var i=0;i<imeiDataList.length;i++){
			if(imeiDataList[i].instrorageImList!=undefined){
			var imeiDataListDetail=imeiDataList[i].instrorageImList
			if(imeiDataListDetail.length>0){
				var sdha=[]
				for(var j=0;j<imeiDataListDetail.length;j++){
					sdha.push(imeiDataListDetail[j])
				}
				imeiListDetailRow.push(sdha)
			}
			}else{
				imeiListDetailRow.push('')
			}
		}
	}
	imeiListRow=imeiListDetailRow
//	  if($("#slideThree").is(':checked'))return;
	  try {MyEiditGrid.currEditDataGrid.unAllEdit();} catch (e) {}
	  var currRow = $("#dataGrid").jqGrid('getRowData', rowid);
	  dataGrid3.clearDataGrid();
	  
	  //获取已录入的串号
	  if($.trim(currRow.imeiList) != ""){
		  var instrorageImList = JSON.parse(currRow.imeiList);  
		  $("#currInputNum").html(instrorageImList.length);
		  $.each(instrorageImList,function(i,obj){
			  dataGrid3.addRowData(i,obj);
		  });
	  }else{
		  $("#currInputNum").html(0);
	  }

	  currImeiLength = currRow.imeiLength;//串号长度
	  currAuxliaryImeiLength = null;
	  
	  //清空界面表单
	  $("#imeiInput1").val("");//清空输入框的值
	  $("#imeiInput2").val("");
	  $("#goodsnameTitle").html("商品信息："+currRow.goodsName);
	  if(currRow.ifEnableAuxliaryImei == "true"){
		  $("#ifEnableAuxliaryImei").prop("checked",true);  
		  $(".auxliaryImeiGroup").show();   

		  currAuxliaryImeiLength = currRow.auxliaryImeiLength;//辅助串号长度
	  }else{
		  $("#ifEnableAuxliaryImei").prop("checked",false); 
		  $(".auxliaryImeiGroup").hide();  
	  }
	
	$('#imeiInputModal').modal('show');
	$("#dataGridRowId").val(gridId+"|"+rowid);
	
	$("#dataGrid3").setGridHeight(300);
	$("#dataGrid3").setGridWidth(565);
	$("#dataGrid3").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
}

//初始化表格
var dataGrid3 = null;
function initDataGrid3(){

  $('#imeiInput1').bind('keypress',function(event){
	  if($("#slideThree").is(':checked'))return;
      if(event.keyCode == "13")    
      {
      	if($('#imeiInput1').val() != ""){
    		if($.notEmpty(currImeiLength) && $('#imeiInput1').val().length != currImeiLength){$.MsgBox('验证提示','串号长度为'+currImeiLength+"位");return;}
    		inStorageImei($('#imeiInput1').val(),'mainImei',callBack)
    		function callBack(){
    		//判断是否有辅助串号
        	if($("#ifEnableAuxliaryImei").is(':checked')){
        		$("#imeiInput2").focus();
        	}else{
        		appenRow3();
        	}
    		}
      	}
      }
  });
  $('#imeiInput2').bind('keypress',function(event){
	  if($("#slideThree").is(':checked'))return;
      if(event.keyCode == "13")    
      {
      	if($('#imeiInput2').val() != "" && $('#imeiInput1').val() != ""){
    		if($.trim($('#imeiInput1').val()) == $.trim($('#imeiInput2').val())){
    			$.MsgBox('串号校验提示','主串号和辅助串号重复');
    			return;
    		}
    		if(($.notEmpty(currImeiLength) && $('#imeiInput1').val().length != currImeiLength) || ($.notEmpty(currAuxliaryImeiLength) && $('#imeiInput2').val().length != currAuxliaryImeiLength)){$.MsgBox('验证提示','串号长度为'+currImeiLength+"位"+' 辅助串号长度为'+currAuxliaryImeiLength+"位");return;}
    		inStorageImei($('#imeiInput2').val(),'AuxiliaryImei',callBackyanzheng)
    		function callBackyanzheng(){
    			appenRow3();
    			$("#imeiInput1").focus();
    		}
      	}
      }
  });
		
	//配置
	var paras = {
	    gridId:'dataGrid3', 
	    noShowAdd:true,
	    addRow:{goodsId:'',goodsCode:'',goodsName:'',cxSectionId:'',stockNum:'',numControlFlag:'',imControlFlag:'',cxNum:'',cxDiscount:'',cxPrice:'',price:'',remark:''},
	    colNames:['主串号',  '辅助串号', '备注'],
	    colModel:
	    	[ 
           {name : 'imei',index : 'imei',align:'left',sortable: false,hidden: false,editable:false}, 
           {name : 'auxiliaryImei',index : 'auxiliaryImei',align:'left',sortable: false},
           {name : 'remark',index : 'remark',align:'left',editable:true,sortable: false}
         ]
	};
	//回调函数
	var callBackList = {
		afterEditCell:function(rowid,name,val,iRow,iCol){//开始编辑
			
      },
      afterSaveCell:function(rowid,name,val,iRow,iCol){//保存编辑
      	
      },
      summary:function(rowid,name,val,iRow,iCol){//统计处理
      	Summary2();
      },
      getGridDataList:function(rows){
      	//筛出不合格行
      	return $.map(rows,function(row){
				if($.notEmpty(row.imei)){
		        	return row;
				}
      	});
      },
      deleteCallBack:function(){
      	$('#currInputNum').html(dataGrid3.getGridDataList().length);
      }, 
	};
	dataGrid3 = new MyEiditGrid(paras,callBackList);

}

//追加一行数据
function appenRow3(){

	//验证串号，辅助串号在数据库是否存在
	if($.trim($('#imeiInput1').val()) != '' ){
						var objList=[]
			     		var ids=$("#dataGrid3").jqGrid('getDataIDs')
			     		if(ids.length>0){
			     			var objData=[]
			     			for(var i=0;i<ids.length;i++){
			     				objData.push($('#dataGrid3').jqGrid('getRowData',ids[i]))
			     			}
			     			for(var j=0;j<objData.length;j++){
			     				if($.trim($('#imeiInput1').val())==objData[j].imei||$.trim($('#imeiInput1').val())==objData[j].auxiliaryImei){
			     					$.MsgBox('重复校验提示','串号:'+$.trim($('#imeiInput1').val())+' 在表格里第'+(j+1)+'行已经存在');return;
			     				}
			     			}
			     		}
			     		if(imeiListRow!=[]&&imeiListRow.length>0){
			         		for(var i=0;i<imeiListRow.length;i++){
			         			for(var j=0;j<imeiListRow[i].length;j++){
			         				if($('#imeiInput1').val()==imeiListRow[i][j].imei||$('#imeiInput1').val()==imeiListRow[i][j].auxiliaryImei){
			         					$.MsgBox('验证提示','本单据表体第'+(i+1)+'行第'+(j+1)+'列已录入过此串号:'+$('#imeiInput1').val());return;
			         				}
			         			}
			         		}
			         	}
	}
	if($.trim($('#imeiInput2').val()) != ''){
						var objList=[]
			     		var ids=$("#dataGrid3").jqGrid('getDataIDs')
			     		if(ids.length>0){
			     			var objData=[]
			     			for(var i=0;i<ids.length;i++){
			     				objData.push($('#dataGrid3').jqGrid('getRowData',ids[i]))
			     			}
			     			for(var j=0;j<objData.length;j++){
			     				if($.trim($('#imeiInput2').val())==objData[j].imei||$.trim($('#imeiInput2').val())==objData[j].auxiliaryImei){
			     					$.MsgBox('重复校验提示','辅助串号:'+$.trim($('#imeiInput2').val())+' 在表格里第'+(j+1)+'行已经存在');return;
			     				}
			     			}
			     		}
						if(imeiListRow!=[]&&imeiListRow.length>0){
				    		for(var i=0;i<imeiListRow.length;i++){
				    			for(var j=0;j<imeiListRow[i].length;j++){
				    				if($('#imeiInput2').val()==imeiListRow[i][j].imei||$('#imeiInput2').val()==imeiListRow[i][j].auxiliaryImei){
				    					$.MsgBox('验证提示','本单据表体第'+(i+1)+'行第'+(j+1)+'列已录入过此串号:'+$('#imeiInput2').val());return;
				    				}
				    			}
				    		}
				    	}
	}
	
	dataGrid3.addRowData(MyEiditGrid.getMaxRowid($("#dataGrid3"))+1,{imei:$('#imeiInput1').val(),auxiliaryImei:$('#imeiInput2').val()});
	$('#imeiInput1').val("");
	$('#imeiInput2').val("");
	$('#currInputNum').html(dataGrid3.getGridDataList().length);
}

//点击保存明细事件
function saveImeiInput(){
	try {MyEiditGrid.currEditDataGrid.unAllEdit();} catch (e) {}
	var rowid = parseInt($("#dataGridRowId").val().split("|")[1]) ;
	var gridId = $("#dataGridRowId").val().split("|")[0] ;
	var objs =dataGrid3.getGridDataList();
	
	$("#"+gridId).jqGrid('setCell', rowid ,"imeiList" ,JSON.stringify(objs));
	$("#"+gridId).jqGrid('setCell', rowid ,"goodsNumber" ,objs.length);
	$('#imeiInputModal').modal('hide');
	
	Summary();
}

//点击保存明细事件
function canelSaveImeiInput(){
	$('#imeiInputModal').modal('hide');
}
//查询在库串号
function inStorageImei(Imei,imeiType,callBack){
	//后台查询数据
	$.request({
		url: this.basePath + '/inventory/common/validateImeiBeforeInStock',
		type : "POST",
		dataType : 'json',
		data:{"queryKey":Imei},
		success:function(data){
			var result = data.data;
			if(data.result != 1){
				if(imeiType=='mainImei'){
					$("input[name='imeiInput2']").prop('disabled',true)	
				}
				$.MsgBox('错误提示',data.desc);return
				}else{
					$("input[name='imeiInput2']").prop('disabled',false)
					callBack()
			};
		}
	}); 
}
/**********************表格1 结束******************************************/

//加载刷新仓库列表
var currSectionStorageList = [];
function initStorageSelect(sId){
	$.request({
		type: 'Get',
		url: basePath+'/Temployee/findKSYBM',
		dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
		success: function(data) {
			 var list = data.data.dataList;
			 
			 currSectionStorageList = list;
		},
		error: function(msg) {
			console.log(msg);
		}
	});
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
