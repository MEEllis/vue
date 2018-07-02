
var billsDao = new CashMain(basePath);

$(function(){
	initUI();//初始化UI
	initDataGrid();//初始化表格
	initEvents();//初始化事件
	getAuthList(initDealDate);
	openAddState();
	
	initQueryUi();//过滤参数相关设置
});

function test(){
	
	dataGrid.addKongRow();
}

//打印单据
function print(){
	var id = $(".gridTop").toJsonObject().id;
	if(id=="")return;
	
	var tempKindDIV = $(
			'<fieldset class="fieLeft" id="form3">'+
			'<legend>打印模板类型</legend>'+
			'<div class="">'+
				'<label class="radio-inline"><input type="radio" name="printTempKind" value="detail" checked>商品明细</label>'+
				'<label class="radio-inline"><input type="radio" name="printTempKind" value="sum">商品汇总</label>'+
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
		$.printBills(basePath + '/funds/print/entrustUndoSettlement', 
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
	model.billsType = "38";
	
	model.currAtId = $("#topForm input[name='id']").val();
	model.queryDir = queryDir;
	
	$.extend(model,getQueryData());
    if(model.billsDateBegin != null && model.billsDateBegin != ""){
    	model.billsDateBegin = model.billsDateBegin + " 00:00:00";
    }
    if(model.billsDateEnd != null && model.billsDateEnd != ""){
    	model.billsDateEnd = model.billsDateEnd + " 23:59:59";
    }
	//console.log(model);
	
	//后台查询
	$.request({
		url: this.basePath + '/IcashMain/page/wtcj_query',
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
				if($("#switch-checkbox").is(':checked')){
					$.MsgBox('消息提示','没有查到数据...');
					$('#switch-checkbox').bootstrapSwitch('toggleState'); 
				}else{
					if('back' == queryDir){
						$.MsgBox('查询提示',"已是最前一页")
					}else if('next' == queryDir){
						$.MsgBox('查询提示',"已是最后一页")
					}else{
						//openAddState();
						$.MsgBox('查询提示',"没有查到任何数据")
					}
				}
			}
		}
	});  
}

//填充页面页面数据
function initPageData(bills){
	$("#topForm").data('bootstrapValidator').resetForm();
	var kong = {
			id:'',
			billsCode:'',
			sectionName:'',
			sectionId:'',
			contactsunitName:'',
			contactsunitId:'',
			managersName:'',
			managersUid:'',
			createBy:'',
			updateBy:'',
			postBy:'',
			invalidBy:'',
			createByName:'',
			updateByName:'',
			postByName:'',
			invalidByName:'',remark:''
	}
	$(".gridTop").writeJson2Dom(kong);
	$(".gridBottom").writeJson2Dom(kong);

	initWLDWamount(bills.contactsunitId);
	
	var formObj = bills;
	var mingxiList = bills.cashEntrustDeldtlList;
	
	//格式化数据
	formObj.billsDate = $.DateFormatFromTimestamp("yyyy-MM-dd",formObj.billsDate);

	//设置表单数据
	$(".gridTop").writeJson2Dom(formObj);
	$(".gridBottom").writeJson2Dom(formObj);
	
	//设置明细数据
	$("#dataGrid").jqGrid('clearGridData');
	for ( var int = 0; int < mingxiList.length; int++) {
		var row = mingxiList[int];
		row.index = int + 1;
		row.op = "OP";
		//插入空数据的1行
		$("#dataGrid").jqGrid('addRowData',int,row);
	}
	
	Summary();
	initData = getPageData();
	
	$.showBillsStatus("billsStautsImg",bills.billsStatus);
	if($("#slideThree").is(':checked')){	
		$(".delBt,.checkBt").attr({"disabled":"disabled"});
		$(".forceFinish").removeAttr("disabled");
		$(".gridTop input:not(:hidden)").prop("readonly", true);
		//正式单据修改
		$(".gridTop input[name='remark']").prop("readonly", false);
		
		dataGrid.$grid.setGridParam({cellEdit:false});
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
		
		dataGrid.$grid.setGridParam({cellEdit:true});
	} 

	$(".gridTop input:not(:hidden)").not('input[name="billsCode"],input[name="remark"],input[name="billsDate"],input[name="billsDiscount"]').prop("readonly", true);
	
	//已红冲的单据禁用红冲按钮
	if(bills.billsStatus == '7')
		$(".forceFinish").prop('disabled',true);
};

/*************************分页 E******************************/
/*************************功能按钮事件 S******************************/

//新增钮点击事件
function addBtClick(){
	getAuthList(initDealDate);
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
	var kong = {
			id:'',
			billsCode:'',
			sectionName:'',
			sectionId:'',
			contactsunitName:'',
			contactsunitId:'',
			managersName:'',
			managersUid:'',
			createBy:'',
			updateBy:'',
			postBy:'',
			invalidBy:'',
			createByName:'',
			updateByName:'',
			postByName:'',
			invalidByName:'',remark:''
	}
	$(".gridTop").writeJson2Dom(kong);
	$(".gridBottom").writeJson2Dom(kong);
	 $("#yuFu").val(0);
	 $("#yingFu").val(0);
	 $("#yuShou").val(0);
	 $("#yingShou").val(0);
	
	//一些代码
	$("#dataGrid").jqGrid('clearGridData');
	
	/*$('input[name="billsDate"]').val($.DateFormat(new Date(),"yyyy-MM-dd"));*/

	pageIndex = 0;pageCount = 0;//新增时 设置当前页为0  以便从第一张开始查询
	
	initData = getPageData();
	$.showBillsStatus("billsStautsImg","1");
}

//打开添加状态
function openAddState(){
    try {
        $("#topForm").data('bootstrapValidator').resetForm();
	} catch (e) {
		console.log(e);
	}
	if($("#slideThree").is(':checked')){
		$("#slideThree").unbind( "change" );
		$("#slideThree").click();
		$("#slideThree").change(function() { 
			onTheSwitchChange();
		}); 
	}
	//**清理表单（表头和表尾）
	var kong = {
			id:'',
			billsCode:'',
			sectionName:'',
			sectionId:'',
			contactsunitName:'',
			contactsunitId:'',
			managersName:'',
			managersUid:'',
			createBy:'',
			updateBy:'',
			postBy:'',
			invalidBy:'',
			createByName:'',
			updateByName:'',
			postByName:'',
			invalidByName:'',remark:''
	}
	$(".gridTop").writeJson2Dom(kong);
	$(".gridBottom").writeJson2Dom(kong);
	 $("#yuFu").val(0);
	 $("#yingFu").val(0);
	 $("#yuShou").val(0);
	 $("#yingShou").val(0);
	
	dataGrid.$grid.setGridParam({cellEdit:true});
	
	//一些代码
	$("#dataGrid").jqGrid('clearGridData');
	
	//草稿单据修改
	$(".gridTop input:not(:hidden)").not('input[name="billsCode"]').prop("readonly", false);
	$(".delBt,.checkBt,.forceFinish").removeAttr("disabled");;
	$(".forceFinish").attr({"disabled":"disabled"});
	/*$('input[name="billsDate"]').val($.DateFormat(new Date(),"yyyy-MM-dd"));*/

	$(".gridTop input:not(:hidden)").not('input[name="billsCode"],input[name="remark"],input[name="billsDate"],input[name="billsDiscount"]').prop("readonly", true);
	
	pageIndex = 0;pageCount = 0;//新增时 设置当前页为0  以便从第一张开始查询
	
	initData = getPageData();
	$.showBillsStatus("billsStautsImg","1");
}

//保存按钮点击事件
function saveBtClick(){
	try {MyEiditGrid.currEditDataGrid.unAllEdit();} catch (e) {}
	
	//判断本次撤结量不能大于结算量
	var $grid=$('#dataGrid').getDataIDs();
	for(var i=0;$grid.length>i;i++){
		var $m=$('#dataGrid').getCell($grid[i],'disseteNum');//本次撤结量量
		var $n=$('#dataGrid').getCell($grid[i],'seteNum');//结算数量
		if(parseInt($m)>parseInt($n)){
			$.MsgBox('提示',"本次撤结量不能大于结算量");
			return;
		}
		if(parseInt($m) == 0){
			$.MsgBox('提示',"本次撤结量不能为0");
			return;	
		}
	}
	
	//表单验证  
	$("#topForm").data('bootstrapValidator').validate();
	if(!($('#topForm').data('bootstrapValidator').isValid())){
		refreshValidator();
	    return ;
	}

	var model = getPageData();
	 model.billsDate=$('input[name="billsDate"]').val();
	//验证数据，提交保存
	
	//判断是否是正式表保存
	if($("#slideThree").is(':checked')){
		
		var model2 = {};
		model2.remark = model.remark;
		model2.id = model.id;
		
		billsDao.saveBillsRamark(model2, function(data){
			if(data.result == 1){
				$.MsgBox('提示','单据备注保存成功');
				
				queryDir  = "refresh";
				
				initData = getPageData();
				queryPage();
			}else{
				$.MsgBox('出错提示',data.desc);
			}
		}, "wtcj_update");
		return;
	}
	

	//添加一些代码
	for (var int = 0; int < model.cashEntrustDeldtlList.length; int++) {
		var deta  = model.cashEntrustDeldtlList[int];
		if(deta.disseteNum <= 0){
			$.MsgBox('保存提示','撤结量不能为0');
			return;
		}
	}

	//code......
	billsDao.saveEntrustUndoSettlementBills(model, function(data){
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

//获取页面数据
function getPageData(){
	//表单
	var formObj = $(".gridTop").toJsonObject();
	$.extend(formObj,$(".gridBottom").toJsonObject());

	//明细
	formObj.cashEntrustDeldtlList = dataGrid.getGridDataList();

	delete formObj["storageId"];
	
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
			billsDao.delCashBills(model, function(data){
				if(data.result == 1){
					lastPage();
					$.MsgBox('提示','操作成功');
				}else{
					$.MsgBox('出错提示',data.desc);
				}
			}, "wtcj_delete");
		}else{
			//$.MsgBox("消息提示","删除单据不存在!");
		}
	}
}

//过账按钮点击事件
function checkBtClick(){
	
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
					
					$.MsgBox('提示','过账成功');
				}else{
					$.MsgBox('出错提示',data.desc);
				}
			}, "wtcj_gz");
		}else{
			$.MsgBox("消息提示","过账单据不存在!");
		}
	}
}

//红冲按钮点击事件FORCE_FINISH
function forceFinishBtClick(){
	var dateInputDIV = $(
			'<div class="form-horizontal"><div class="form-group">' +
			    '<label for="firstname" class="col-sm-5 control-label">红冲日期:</label>' +
			    '<div class="col-sm-7" style="padding-left: 0px;">' +
						'<div class="input-group">' +
					'<input type="text" class="form-control" name="hcDate">' +
			    '</div></div>' +
		    '</div></div>'		
	)
	var dateInput = dateInputDIV.find("input[name='hcDate']");
	dateInput.val($('input[name="billsDate"]').val());
	
	dateInput.datetimepicker({
		  lang:"ch",           //语言选择中文
	      format:"Y-m-d",      //格式化日期
	      minDate:$('input[name="billsDate"]').val(),
	      maxDate:_authList.maxDate,
	      timepicker:false,    //关闭时间选项
	      todayButton:false    //关闭选择今天按钮
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
			billsDao.saveRedDashed({id:topFormObj.id,invalidDate:dateInput.val()}, function(data){
				if(data.result == 1){
					$("#topForm input[name='id']").val(data.data.billsId);
					
					queryDir  = "refresh";
				    queryPage();
					$.MsgBox('提示',data.desc);
				}else{
					$.MsgBox('出错提示',data.desc);
				}
			}, "wtcj_red");
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
		width: '150px',
		height:'30px',
		placeholder: "多选", //默认提示语
		//maximumSelectionLength: 3, //最多能够选择的个数
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
		//	$.MsgBox('查询提示','没有查到任何数据');
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
    $("#billsDateBegin").val($.getLastMonthYestdyStr(new Date()));
    $("#billsDateEnd").val($.DateFormat(new Date(), "yyyy-MM-dd"));
	
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
	$("input[name='billsDate']").val($.DateFormat(new Date(),"yyyy-MM-dd"));
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
		billsDateBegin:$.DateFormat($.getCurrentMonthFirst(),"yyyy-MM-dd"),
		billsDateEnd:$.DateFormat($.getCurrentMonthLast(),"yyyy-MM-dd"),
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
				
				dataGrid.$grid.setGridParam({cellEdit:false});
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
				
				dataGrid.$grid.setGridParam({cellEdit:true});
			}  

			$(".gridTop input:not(:hidden)").not('input[name="billsCode"],input[name="remark"],input[name="billsDate"],input[name="billsDiscount"]').prop("readonly", true);
			
			//固定不能修改的
			$(".gridTop input[name='billsCode']").prop("readonly", true);
			
			lastPage();
		}
	} catch (e) {
		//console.log(e);
	}
}

//初始化事件
function initEvents(){

	$('.searchImei').bind('input propertychange click', function() {  
		$('#imeiUl').html('');
		//右匹配  最少输入5位数或以上
		if($.trim($('.searchImei').val()) != "" && $("input[name='sectionId']").val() != "" && $("input[name='contactsunitId']").val() != ""){

			//查询串号库存
			$.request({
				url: basePath + '/IcashEntrustStock/listByModel',
				type : "post",
				dataType : 'json',
				data:{keyWord:$.trim($('.searchImei').val()),status:1,contactsunitId:$("input[name='contactsunitId']").val()},//此处查询未结的数据
				success:function(data){
					if(data.result != 1){$.MsgBox('错误提示',data.desc);return;};
					
					var ulHtml = '';
					if(data.data.dataList.length != 0){
						for(var i=0;i<data.data.dataList.length;i++){
							var currDa = data.data.dataList[i];
							ulHtml += '<li onclick = "imeiUlLiClick({'+
					          'imei:\''+currDa.imei+'\','+
					          'auxiliaryImei:\''+currDa.auxiliaryImei+'\','+
					          'seteNum:\''+(parseInt(currDa.outstroNum - currDa.noSeteNum))+'\','+
					          'id:\''+currDa.id+'\','+
					          'refMainId:\''+currDa.billsMainId+'\','+
					          'goodsId:\''+currDa.goodsId+'\','+
					          'goodsName:\''+currDa.goodsName+'\','+
					          'outstroDate:\''+currDa.outstroDate+'\','+
					          'setePrice:\''+currDa.setePrice+'\','+
					          'dissetePrice:\''+currDa.setePrice+'\','+
					          'disseteNum:\''+(parseInt(currDa.outstroNum - currDa.noSeteNum))+'\''+
					          '})">'+""+currDa.imei+'</li>';
					          //'})">'+data.data.dataList[i].goodsName+"-"+data.data.dataList[i].imei+'</li>';
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
	$(window).resize(wResize);//注册窗口改变事件
	wResize();
}

//窗口大小改变
function wResize(){
	var winH = $(window).height();//浏览器高度
	var winW = $(window).width();//浏览器宽度
	var centerH = winH - 620;//中部高度
	if(centerH < 400){
		centerH = 400;
	}
	//console.log(winH+"   "+centerH);
	$(".gridBody").height(centerH);
	$("#dataGrid").setGridHeight(centerH);
	$("#dataGrid").setGridWidth($(window).width()-30); 
	$("#dataGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
	
	$("#dataGrid5").setGridHeight(centerH);
	$("#dataGrid4").setGridHeight(centerH);
	
	$("#beentrustStockReferenceFrame").height(winH*0.75);
	
}

//打开引用对话框
var callBack ;

//打开受托库存引用对话框
function selectBeentrustStockReferenceOpen(){
	if($("#slideThree").is(':checked'))return;
	
	if($("input[name='sectionId']").val() == "" || $("input[name='contactsunitId']").val() == ""){$.MsgBox("操作提示","部门或往来单位未选择");return;}
	$('#beentrustStockReferenceModal').modal('show').find('.referenceFrame').css({
	    height: $("html").height()/1.25
	});
	
	//此处应用的 是未结算的数据 所以在这里需要添加查询
	beentrustStockReferenceFrame.reLoadGrid({status:1,sectionId:$("input[name='sectionId']").val(),contactsunitId:$("input[name='contactsunitId']").val(),
        contactsunitName:$("input[name='contactsunitName']").val()});
	
	callBack = function(){
		if(arguments[0].length == 0){
			$('#beentrustStockReferenceModal').modal('hide');
			return ;
		}
		var models = arguments[0];
		
		//$("#dataGrid").jqGrid('clearGridData');
		//设置表格的值
		for ( var i = 0; i < models.length; i++) {
			var model = models[i];
			model.remark = "";
			model.seteNum =  $.parseInt(model.outstroNum) - $.parseInt(model.noSeteNum);
			model.setePrice = model.setePrice;
			model.refMainId = model.billsMainId;
			model.dissetePrice = model.setePrice;
			model.disseteNum =  $.parseInt(model.outstroNum) - $.parseInt(model.noSeteNum);
			model.disseteAmount = $.parseFloat(model.setePrice) * $.parseInt(model.seteNum);
			if(dataGrid.getRowByModel({id:model.id}) == null && model.seteNum > 0)
				$("#dataGrid").jqGrid('addRowData',MyEiditGrid.getMaxRowid($("#dataGrid"))+1,model);	
		}
		Summary();
		$('#beentrustStockReferenceModal').modal('hide');
	}; 
}

//打开往来单位引用对话框
function selectContactUnitReferenceOpen(){
	if($("#slideThree").is(':checked') || $(".gridTop").toJsonObject().id != "")return;
	//传入单选标志
	contactUnitReferenceFrame.mulSelect(false);
	$('#contactUnitReferenceModal').modal('show').find('.referenceFrame').css({
	    height: $("html").height()/1.25
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
		
		refreshValidatorField("contactsunitName");//刷新验证信息
		dataGrid.$grid.jqGrid('clearGridData');
		$('#contactUnitReferenceModal').modal('hide');
	}; 
}

//打开部门引用对话框
function selectSectionReferenceOpen(){
	if($("#slideThree").is(':checked') || $(".gridTop").toJsonObject().id != "")return;
	//传入单选标志
	sectionReferenceFrame.mulSelect(false);
	$('#sectionReferenceModal').modal('show').find('.referenceFrame').css({
	    height: $("html").height()/1.25
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
		$('input[name="managersUid"').val("");
		$('input[name="managersName"').val("");
		$('#sectionReferenceModal').modal('hide');
		dataGrid.$grid.jqGrid('clearGridData');
		//refreshValidator();
	}; 
}

//打开职员引用对话框
function selectEmployeeReferenceOpen(){
	if($("#slideThree").is(':checked') || $(".gridTop").toJsonObject().id != "")return;
	
	//检查部门是否选择
	if($("input[name='sectionId']").val() == ""){
		$.MsgBox('操作提示','部门还没选择');
		return;
	}
	$('#employeeReferenceModal').modal('show').find('.referenceFrame').css({
	    height: $("html").height()/1.25
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
		refreshValidatorField("managersName");//刷新验证信息
		$('#employeeReferenceModal').modal('hide');
	}; 
}

//打开仓库引用对话框
function selectStorageReferenceOpen(rowid,id){
	$('#storageReferenceModal').modal('show').find('.referenceFrame').css({
	    height: $("html").height()/1.25
	});
	callBack = function(){
		if(arguments[0].length == 0){
			$('#storageReferenceModal').modal('hide');
			return ;
		}
		var storage = arguments[0][0];
		
		//设置编辑器值
		$("#"+id).val(storage.name);
		
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
    	$("#dataGrid").jqGrid('setCell', value ,"dissetePrice" ,currRow.disseteAmount / currRow.disseteNum);
    	$("#dataGrid").jqGrid('setCell', value ,"surNum" ,$.parseInt(currRow.seteNum) - ($.parseInt(currRow.disseteNum) < 0?0:$.parseInt(currRow.disseteNum)));
    });
    
////	//汇总
//	var sumNumber = $("#dataGrid").getCol('disseteNum', false, 'sum');  
//	var sumAmount = $("#dataGrid").getCol('disseteAmount', false, 'sum');  
//	$("#dataGrid").footerData("set",{index:"合计",disseteNum:sumNumber,sumAmount:sumAmount});
//	
}

//初始化表格
var dataGrid = null;
function initDataGrid(){
	function formatterDate(cellvalue, options, rowObject){
		if(cellvalue == "" || undefined == cellvalue)return "";
		if(!_.isNaN(parseInt(cellvalue)) && parseInt(cellvalue)>10000){
			var date = new Date();
			date.setTime(cellvalue);
			return $.DateFormat(date,"yyyy-MM-dd");
		}else{
			return cellvalue;
		}
	}
	//配置
	var paras = {
	    gridId:'dataGrid', 
	    addRow:{goodsId:'',goodsCode:'',goodsName:'',goodsBrandName:'',stockNumber:'',numControlFlag:'',imControlFlag:'',cxNum:'',cxPrice:'',price:'',remark:''},
	    colNames:['id','出库日期','商品ID','商品名称','出库数量','结算量','串号','辅助串号','结算价','本次撤结量','撤结单价','撤结总额', '撤结后剩余数量', '备注', '备注'],
	    colModel:
	    	[ {name : 'id',index : 'id',align:'left',sortable: false,hidden: true}, 
             {name : 'outstroDate',index : 'instroDate',align:'left',sortable: false,formatter:formatterDate}, 
             {name : 'goodsId',index : 'goodsId',align:'left',sortable: false,hidden: true,formatter:'integer'}, 
             {name : 'goodsName',sortable: false,index : 'goodsName',align:'left',editable:false}, 
             {name : 'outstroNum',index : 'outstroNum',hidden: false,editable:false,sortable: false,formatter:'integer'},
             {name : 'seteNum',index : 'seteNum',align:'left',editable:false,sortable: false,formatter:'integer'},
             {name : 'imei',index : 'imei',align:'left',editable:false,sortable: false},
             {name : 'auxiliaryImei',index : 'auxiliaryImei',align:'left',editable:false,sortable: false},
             {name : 'setePrice',index : 'setePrice',align:'left',editable:false,editrules:{number:true},formatter:'number',sortable: false},
             //{name : 'disseteNum',index : 'disseteNum',align:'left',editable:true,editrules:{number:true},formatter:'integer',sortable: false,editoptions:{readonly:false,onkeyup:"checkInput.clearNoNum(this,0,10);"}},
             {name : 'disseteNum',index : 'disseteNum',align:'left',editable:true,editrules:{number:true},formatter:'integer',sortable: false,editoptions:{readonly:false,onkeyup:"checkInput.checkNumPure(this,12)"}},
             {name : 'dissetePrice',index : 'dissetePrice',hidden: false,editable:false,editrules:{number:true},formatter:'number',sortable: false,editoptions:{onkeyup:"checkInput.checkNum(this,12)"}},
             {name : 'disseteAmount',index : 'disseteAmount',hidden: false,editable:false,sortable: false,formatter:'number',editoptions:{onkeyup:"checkInput.checkNum(this,12)"}},
             {name : 'surNum',index : 'surNum',hidden: false,editable:false,sortable: false,formatter:'integer'},
             {name : 'remark',index : 'remark',hidden: false,editable:true,sortable: false,editoptions:{readonly:false,onkeyup:"checkInput.clearNoText(this,100)"}},
             {name : 'refMainId',index : 'refMainId',align:'left',sortable: false,hidden: true}
           ],
	};
	//回调函数
	var callBackList = {		
		onCellSelect:function(rowid,iCol,cellcontent,e){
			var currRow = $("#dataGrid").jqGrid('getRowData', rowid);
			if(iCol == 11){
			  
		      //判断是否数量还是一个串号
		      if($.trim(currRow.imei) == ""){
		    	  $("#dataGrid").setColProp("disseteNum",{editable:true});
		      }else{
		    	  $("#dataGrid").setColProp("disseteNum",{editable:false});
		      }
		      
			}
		},
		afterEditCell:function(rowid,name,val,iRow,iCol){//开始编辑
	 	
        },
        afterSaveCell:function(rowid,name,val,iRow,iCol){//保存编辑
		      try {
			      var currRow = $("#dataGrid").jqGrid('getRowData', rowid);
			      if(name == "disseteNum")
			    	  $("#dataGrid").jqGrid('setCell', rowid ,"disseteAmount" ,currRow.disseteNum * currRow.dissetePrice);
			      if(name == "disseteAmount")
			    	  $("#dataGrid").jqGrid('setCell', rowid ,"dissetePrice" ,currRow.disseteAmount / currRow.disseteNum);
			      if(name == "dissetePrice")
			    	  $("#dataGrid").jqGrid('setCell', rowid ,"disseteAmount" ,currRow.disseteNum * currRow.dissetePrice);
			  } catch (e) {
				
			  }
        },
        summary:function(rowid,name,val,iRow,iCol){//统计处理
        	Summary();
        },
        getGridDataList:function(rows){
        	//筛出不合格行
        	return $.map(rows,function(row){
				if(row.goodsName != ""){
		    		row.seteNum = parseInt(row.seteNum) ;
		    		row.surNum = parseInt(row.surNum) ;
		    		row.disseteNum = parseInt(row.disseteNum) ;
		    		row.setePrice = parseFloat(row.setePrice).toFixed(2);
		    		row.disseteAmount = parseFloat(row.disseteAmount).toFixed(2);
		        	delete row["op"];
		        	delete row["index"];
		        	delete row["goodsName"];
		        	delete row["numberRemaining"];
		        	delete row["dissetePrice"];
		        	delete row["outstroDate"];
		        	delete row["outstroNum"];
		        	
		        	return row;
				}
        	});
        }
	};
	dataGrid = new MyEiditGrid(paras,callBackList);

}

/**********************表格1 结束******************************************/
/**********************串号搜索 开始******************************************/

function imeiUlLiClick(obj){
	obj.ifManageImei = true;
	
	$(".searchImei").focus();
	$('.none-cx').hide();
	if(!dataGrid.isCanEdit())return;
	if(dataGrid.getRowByModel({id:obj.id}) == null){
//		obj.remark = "";
//		obj.seteNum = parseInt(obj.outstroNum - obj.noSeteNum);
//		obj.setePrice = obj.setePrice;
//		obj.dissetePrice = obj.setePrice;
//		obj.disseteNum = obj.seteNum;
		obj.disseteAmount = $.parseFloat(obj.setePrice) * $.parseInt(obj.seteNum);
		$("#dataGrid").jqGrid('addRowData',MyEiditGrid.getMaxRowid($("#dataGrid"))+1,obj);
		Summary();
	}else{
		$.MsgBox("消息提示","该数据已经引入");
	}
}
/**********************串号搜索 结束******************************************/


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
			console.log(msg);
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
	    height: $("html").height()/1.25
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
	    height: $("html").height()/1.25
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
			$("#sectionIdListStr").val( names.join(","));//$("#sectionIdListStr").val() + "," +
		}
		$('#sectionReferenceModal').modal('hide');
	}; 
}

//打开商品名称引入对话框
function selectGoodsNameReferenceForFiterOpen(){
	$('#goodsnameReferenceModal').modal('show').find('.referenceFrame').css({
	    height: $("html").height()/1.25
	});
	
	//传入多选标志
	goodsnameReferenceFrame.mulSelect(true);
	
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
//初始化受理时间
function initDealDate(){
	$('input[name="billsDate"]').prop('readonly','readonly')
	formateDateInput('input[name="billsDate"]');
	if($('input[name="billsDate"]').val()==""||$('input[name="billsDate"]').val()==null||$('input[name="billsDate"]').val()==undefined)
	{
		$('input[name="billsDate"]').val(_authList.maxDate);
	}
}
//格式化日期控件
function formateDateInput(modelId){
	if(_authList.hasPermissions==0){
		$(modelId).prop('disabled',true);
	}else{
		$(modelId).prop('disabled',false);
	}
	$("input[name='billsDate']").datetimepicker({
		  lang:"ch",           //语言选择中文
	      format:"Y-m-d",      //格式化日期
	      timepicker:false,    //关闭时间选项
	      todayButton:false,    //关闭选择今天按钮
	      maxDate:_authList.maxDate,
		  minDate:_authList.minDate,
		  value:_authList.maxDate
	}).on('blur', function (ev) {  
  refreshValidatorField("billsDate",'#topForm');//刷新验证信息
});
}
/**********************过滤 参数选择******************************************/
