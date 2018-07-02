
var billsDao = new CashMain(basePath);
var stockNumDao = new StockNum(basePath);
var stockImDao = new StockIm(basePath);
var currRebateDeldtType = "返利明细1";
var isDraft=1;
var billsType=34
var pageIndex = 1;//页码
var pageSize =  1;//页大小
var pageCount = 0;//页码大小
var currPage = null;//当前页数据
var queryDir = "last";
var currAtId = "";
var dataGrid = null;
var dataGrid3 = null;
var dataGrid6 = null;
$(function(){
    initMenuBtn()
	initUI();//初始化UI
	initDataGrid();//数量保价表格
	initDataGrid6()//串号保价表格
	initDataGrid3();//串号录入
	initEvents();//初始化事件
	getAuthList(initDealDate);
	openAddState();
    initTopForm()
    initFilter()
    getDefaultValues()
    /*是否是：跳转单据*/
    var billsId = $.trim(functionObjExtent.getQueryString('billsId'))
    if(billsId!=''){
        var billsCode = $.trim(functionObjExtent.getQueryString('billsCode'))
        var copyFlag = $.trim(functionObjExtent.getQueryString('copyFlag'))

        //单据编号
        if(billsCode!=""&& billsCode!=null && billsCode!=undefined){
            isDraft=0;
            var model={};
            queryDir  = "refresh"
            model.billsCode=billsCode;
            model.currAtId=billsId;
            model.queryDir  = queryDir;

            queryPage(model,function () {
                //复制一单
                if(copyFlag==1){
                    copyBtClick();

                }
            })
        }else{
            isDraft=1;
            queryDir  = "refresh";
            queryPage({'currAtId':billsId,'queryDir':queryDir})
        }

    }else{
        //新增
        openAddState();
        getDefaultValues();

    }
});

// 初始化 顶部表单
function initTopForm(){
    //部门
    $("#topForm input[name='sectionName']").storePlu({
        isStoreShow:false,
        isLoadDefaultName:0,
        checkMore: false,
        search: false,
        ifStore: false, // 控制部门选项
        changeStore:function(){
            var id=$("#topForm input[name='sectionName']").data('sectionId');
            //设置编辑器值
            $("input[name='sectionId']").val(id);
            $("input[name='managersUid']").val("");
            $("input[name='managersName']").val("");
            $('#dataGrid6').clearGridData();
            dataGrid6.addKongRow();
        }
    }).prop('disabled',false);
    //经办人
    $("#topForm input[name='managersName']").comModalsEmployeeBySection({
        sectionIds:'input[name="sectionId"]',
        clickback:function () {
            var obj= $("#topForm input[name='managersName']");
            //设置编辑器值
            $("input[name='managersUid']").val(obj.data('id'));
        }
    })
    //往来单位
    $("#topForm input[name='contactsunitName']").comModalsContactUnit({
        clickback:function () {
            var obj= $("#topForm input[name='contactsunitName']");
            var id=obj.data('id');
            //设置编辑器值
            $("input[name='contactsunitId']").val(id)
            $('#dataGrid6').clearGridData();
            dataGrid6.addKongRow();
            //切换往来单位余额
            initWLDWamount(id);

        }
    })
}
// 初始化 过滤
function initFilter() {
    //部门
    $("#sectionIdListStr").storePlu({
        isStoreShow:false,
        isLoadDefaultName:0,
        checkMore: true,
        search: false,
        ifStore: false, // 控制部门选项
        changeStore:function(){
            var id=$("#sectionIdListStr").data('sectionId');
            //设置编辑器值
            $("input[name='sectionIdListStr']").val(id);
        }
    });
    //往来单位
    $("#contactsunitIdListStr").comModalsContactUnit({
        multiselect:true,
        clickback:function () {
            var id=$("#contactsunitIdListStr").data('id');
            //设置编辑器值
            $("input[name='contactsunitIdListStr']").val(id);
        }
    })
}
//获取默认值
function getDefaultValues(){
    var obj={
        success:function(data){
            $('#topForm input[name="sectionName"]').val(data.data.defaultSection.name)
            $('#topForm input[name="sectionId"]').val(data.data.defaultSection.sectionId)
            $('#topForm input[name="managersName"]').val(data.data.defaultEmployee.name).data('id',data.data.defaultEmployee.employeeId)
            $('#topForm input[name="managersUid"]').val(data.data.defaultEmployee.employeeId)
        }
    }
    InterfaceInventory.common.getDefaultValues(obj);
}
//打印单据
function print(){
	var id = $(".gridTop").toJsonObject().id;
	var doType = $(".gridTop").toJsonObject().rebateType + "";
	if(id=="")return;
	
	// var tempKindDIV = $(
	// 		'<fieldset class="fieLeft" id="form3">'+
	// 		'<legend>打印模板类型</legend>'+
	// 		'<div class="">'+
	// 			'<label class="radio-inline"><input type="radio" name="printTempKind" disabled value="detail"  ' + (doType == '1' || doType == '4'?'checked':'') + '>数量-默认</label>'+
	// 			'<label class="radio-inline"><input type="radio" name="printTempKind" disabled value="sum" ' + (doType == '2' || doType == '3'?'checked':'') + ' >总额-默认</label>'+
	// 		'</div>'+
	// 		'</fieldset>'
	// )
	// BootstrapDialog.show({
	//     title: '单据打印',
	//     message: tempKindDIV,
	//     buttons: [{label: '确定', cssClass: 'btn-primary',action: function(dialogItself) {dialogItself.close();todo();}},
	//               {label: '取消',action: function(dialogItself){dialogItself.close();}
	//     }]
	// });
	// function todo(){
	// }

	$.printBills(basePath + '/funds/print/clientRebate',
		{
			billsId:id,
			tempKind: (doType == '1' || doType == '4') ? 'detail' : (doType == '2' || doType == '3') ? 'sum':''
		}
	);

}
/*************************分页 S******************************/
var initData = null;
function checkIsEidited() {
	var isj = initData == null || _.isEqual(initData, getPageData()) ? false : true;
	return isj;
}
//获取页面数据
function getPageData() {
	//表单
	var formObj = $(".gridTop").toJsonObject();
	$.extend(formObj,$(".gridBottom").toJsonObject());
	
	//明细  根据返利类型获取明细表格
	if(currRebateDeldtType == "返利明细1"){
		formObj.cashRebateNumList = dataGrid6.getGridDataList();
	}else{
		formObj.cashRebateNumList = dataGrid.getGridDataList();
	}

	return formObj;
}

//首页
function firstPage(){
	todo();
	function todo(){
		queryDir  = "first";
        queryPage({'queryDir':queryDir});
	}
}
//下一页
function nextPage(){
	todo();
	function todo(){
		queryDir  = "next";
        queryPage({'queryDir':queryDir});
	}
}
//上一页
function backPage(){
	todo();
	function todo(){
		queryDir  = "back";
        queryPage({'queryDir':queryDir});
	}
}
//末页
function lastPage(){
	todo();
	function todo(){
		queryDir  = "last";
        queryPage({'queryDir':queryDir});
	}
}


//分页查询
function queryPage(model,callbackObj){
    model.isDraftOp = !!isDraft;
    model.billsType = "34";
    model.queryDir = queryDir;
    $.extend(model,getQueryData());

	//后台查询
	$.request({
		url: this.basePath + '/IcashMain/page/khfl_query',
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
					$.MsgBox('查询提示',"没有查到任何数据")
				}
			}
            if (callbackObj) {
                callbackObj(data.data);
            }
		}
	});  
}

//填充页面页面数据
function initPageData(bills){
	$("#topForm").data('bootstrapValidator').resetForm();
	var formObj = bills;
     var mingxiList1 = bills.cashRebateNumList;
	//格式化数据
	formObj.billsDate = $.DateFormatFromTimestamp("yyyy-MM-dd",formObj.billsDate);
	
	//设置表单数据
	$(".gridTop").writeJson2Dom(formObj);
	$(".gridBottom").writeJson2Dom(formObj);

	initWLDWamount(bills.contactsunitId);
	lastType = formObj.rebateType;
   // $('#rebateTypeTabs a[href="#tab1-1"]').tab('show')
	//设置明细数据
	if(formObj.rebateType == "2" || formObj.rebateType == "3"){
		$("#dataGrid").jqGrid('clearGridData');

		for ( var int = 0; int < mingxiList1.length; int++) {
			var row = mingxiList1[int];
			dataGrid.addRowData(int,row);
		}
		$('#rebateTypeTabs a[href="#tab1-2"]').tab('show')
	}else{
		$("#dataGrid6").jqGrid('clearGridData');

		for ( var int = 0; int < mingxiList1.length; int++) {
			var row = mingxiList1[int];
			row.storageName6 = row.storageName;
			row.goodsName6 = row.goodsName;
			if(row.cashRebateImList.length>0){
				row.imeiList = JSON.stringify(row.cashRebateImList);
			}
			dataGrid6.addRowData(int,row);
		}
		$('#rebateTypeTabs a[href="#tab1-1"]').tab('show')
	}


	Summary();
	Summary6();
	$.showBillsStatus("billsStautsImg",bills.billsStatus);
	
	$("#saveAndPostBt").attr({"disabled":"disabled"});
	$("#redDashedBt").removeAttr("disabled");
	$(".gridTop input:not(:hidden)").prop("readonly", true);

	//正式单据修改
	$(".gridTop input[name='remark']").prop("readonly", false);

	$(".gridTop input:not(:hidden)").not('input[name="billsCode"],input[name="remark"],input[name="billsDate"],input[name="billsDiscount"]').prop("readonly", true);
    if(isDraft=='0'){
        $(".gridTop :button").hide();
        dataGrid.$grid.setGridParam({cellEdit:false});
        dataGrid6.$grid.setGridParam({cellEdit:false});
    }
	wResize();
	
	initData = getPageData();
	
	//已红冲的单据禁用红冲按钮
	if(bills.billsStatus == '7'){
        $("#redDashedBt").prop('disabled',true);
	}
    reloadMenuBtn()
}

/*************************分页 E******************************/

/*************************功能按钮事件 S******************************/

//新增钮点击事件
function addBtClick(){
		//openAddState();
	getAuthList(initDealDate);
	if(checkIsEidited()){
		$.MsgBox("操作提示","当前单据未保存，是否放弃保存",function(){
			window.location.href=basePath+'/funds/clientRebate';
		},function(){
			
		});return;
	}else{
		window.location.href=basePath+'/funds/clientRebate';
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
		sectionName:""
	}
	$(".gridTop").writeJson2Dom(kong);
	$(".gridBottom").writeJson2Dom(kong);
	currSectionStorageList = [];
	 $("#yuFu").val(0);
	 $("#yingFu").val(0);
	 $("#yuShou").val(0);
	 $("#yingShou").val(0);
	
	//一些代码
	dataGrid.clearDataGrid();dataGrid.addKongRow();
	dataGrid6.clearDataGrid();dataGrid6.addKongRow();
	$('input[name="billsDate"]').val($.DateFormat(new Date(),"yyyy-MM-dd"));

	pageIndex = 0;pageCount = 0;//新增时 设置当前页为0  以便从第一张开始查询
	
	Summary();
	Summary6();
	$.showBillsStatus("billsStautsImg","1");
	
	initData = getPageData();
}

//打开添加状态
function openAddState(){
	$("#topForm").bootstrapValidator('resetForm',true);
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
		sectionName:""
	}
	$(".gridTop").writeJson2Dom(kong);
	$(".gridBottom").writeJson2Dom(kong);
	currSectionStorageList = [];
	 $("#yuFu").val(0);
	 $("#yingFu").val(0);
	 $("#yuShou").val(0);
	 $("#yingShou").val(0);
	
	$("#redDashedBt").attr({"disabled":"disabled"});
	$("#saveAndPostBt").removeAttr("disabled");
	$(".gridTop input:not(:hidden)").not('input[name="billsCode"]').prop("readonly", false);

	$(".gridTop input:not(:hidden)").not('input[name="billsCode"],input[name="remark"],input[name="billsDate"],input[name="billsDiscount"]').prop("readonly", true);
	
	dataGrid.$grid.setGridParam({cellEdit:true});
	dataGrid6.$grid.setGridParam({cellEdit:true});
	
	//一些代码
	dataGrid.clearDataGrid();dataGrid.addKongRow();
	dataGrid6.clearDataGrid();dataGrid6.addKongRow();
	$('input[name="billsDate"]').val($.DateFormat(new Date(),"yyyy-MM-dd"));

	pageIndex = 0;pageCount = 0;//新增时 设置当前页为0  以便从第一张开始查询
	
	Summary();
	Summary6();
	$.showBillsStatus("billsStautsImg","1");
	
	initData = getPageData();
}

//保存按钮点击事件
function save(){
	try {MyEiditGrid.currEditDataGrid.unAllEdit();} catch (e) {}
	
	//表单验证  
    refreshValidator()
	if(!($('#topForm').data('bootstrapValidator').isValid())){
	    return ;
	}
	
	//表单
	var formObj = $(".gridTop").toJsonObject();
	 formObj.billsDate=$('input[name="billsDate"]').val();
    if(formObj.contactsunitId==''){
        $.zxsaas_plus.showalert('提示', "请选择往来单位！");
        return ;
    }
	$.extend(formObj,$(".gridBottom").toJsonObject());
	
	//明细  根据返利类型获取明细表格
	if(currRebateDeldtType == "返利明细1"){
		formObj.cashRebateNumList = dataGrid6.getGridDataList();
		for (var int = 0; int < formObj.cashRebateNumList.length; int++) {
			if(formObj.cashRebateNumList[int].rebateNum < 1){
				$.MsgBox('操作提示', '返利数量应大于0.');
				return;
			}
		}
	}else{
		formObj.cashRebateNumList = dataGrid.getGridDataList();
	}
//	formObj.billsCode = $.DateFormat();//假数据
	if(formObj.cashRebateNumList.length == 0){
		$.MsgBox('消息提示','明细不能为空');return;
	}
	billsDao.saveAndPostClientRebateBills(formObj, function(data){
		if(data.result == 1){
            var id=data.data.billsId;
			$("#topForm input[name='id']").val(id);
			
			queryDir  = "refresh";
            isDraft=1;
            queryPage({'currAtId':id,'queryDir':queryDir});
            $.zxsaas_plus.showalert('success',data.desc || "保存成功！");
		}else{
			$.MsgBox('出错提示',data.desc);
		}
	});
}

//过账
function post() {

    var models = $(".gridTop").toJsonObject();
    var billsId= $.trim(models.id)
    if(models.billsCode!=""){
        $.zxsaas_plus.showalert('提示','只能过账草稿单!');
    }else{
        $.ajaxPackage({
            url:'/manager/IcashMain/executePostClientRebateBills',
            data:{billsId:billsId},
            success:function(data){
                isDraft=0;
                queryPage({'currAtId':data.data.billsId})
                $.zxsaas_plus.showalert('success',data.desc || "过账成功");
            }
        })
    }
}
//红冲按钮点击
function redDashedBtClick(){
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
	//dateInput.val($('input[name="billsDate"]').val());
	var min = CompareDate(_authList.minDate, $('input[name="billsDate"]').val())?_authList.minDate:$('input[name="billsDate"]').val();
	dateInput.datetimepicker({
		lang:"ch",           //语言选择中文
		format:"Y-m-d",      //格式化日期
		timepicker:false,    //关闭时间选项
		minDate:min,
		maxDate:_authList.maxDate,
		todayButton:false,    //关闭选择今天按钮
		value: min
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
                    var id=data.data.billsId
					$("#topForm input[name='id']").val(id);
					
					queryDir  = "refresh";
                    queryPage({'currAtId':id,'queryDir':queryDir});
                    $.zxsaas_plus.showalert('提示',data.desc || "红冲成功！");
				}else{
					$.MsgBox('出错提示',data.desc);
				}
			}, 'khfl_red');
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
        queryPage({'queryDir':queryDir});
	},function(){});
}

//初始化UI
var lastType = null;
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

	//返利类型选择列表
	$('#rebateTypeSelect').change(function(){ 
		if($.trim($(".gridTop").toJsonObject().id) != ''){
			$('#rebateTypeSelect').val(lastType);		
		}
		lastType = $('#rebateTypeSelect').val();
		var num = parseInt($('#rebateTypeSelect').val());
		if(num == 3){
			num = 2;
		}else if(num == 4){
			num = 1;
		}
		$('#rebateTypeTabs a[href="#tab1-'+num+'"]').tab('show')
		 dataGrid6.$grid.resize();
		//$('#rebateTypeTabs li:eq('+$(this).children('option:selected').val()+') a').tab('show')
	});	

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

//初始化事件
function initEvents(){
	
	$(window).resize(wResize);//注册窗口改变事件
	
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        // 获取已激活的标签页的名称
        currRebateDeldtType = $(e.target).text();
        //alert(currRebateDeldtType);
    });
	$('.searchImei').bind('keypress', function(event) { 
		if(event.keyCode != "13") return; //回车事件   
			
		$('#imeiUl').html('');
		//右匹配  最少输入5位数或以上
		if($.trim($('.searchImei').val()) != ""){

			//查询串号库存
			$.request({
				url: basePath + '/IstockIm/listByModel',
				type : "post",
				dataType : 'json',
				data:{keyWord:$.trim($('.searchImei').val())},
				success:function(data){
					if(data.result != 1){$('#imeiUl').html(data.desc);return;};
					
					if(data.data.dataList.length > 0){
						for ( var int = 0; int < data.data.dataList.length; int++) {
							var queryModel = {imei:data.data.dataList[int].imei};
							if(!dataGrid3.isExistRow(queryModel)){
								appenRow3({imei:data.data.dataList[int].imei, auxiliaryImei:data.data.dataList[int].auxiliaryImei});
								$('.searchImei').val("");
								return;
							}
						}
						
					}
					appenRow3({imei:$('.searchImei').val()});
					$('.searchImei').val("");
					
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
	var centerH = winH - 510;//中部高度
	if(centerH < 400){
		centerH = 400;
	}
	//console.log(winH+"   "+centerH);
	$(".gridBody").height(centerH);
	$("#dataGrid").setGridHeight(centerH);
	$("#dataGrid").setGridWidth($(window).width()-30); 
	$("#dataGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
	
	$("#dataGrid2").setGridHeight(centerH-100);
	$("#dataGrid3").setGridHeight(centerH-100);
	$("#dataGrid3").setGridWidth(565);
	$("#dataGrid3").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
	
	$("#dataGrid6").setGridHeight(centerH);
	$("#dataGrid6").setGridWidth($(window).width()-30); 
	$("#dataGrid6").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 

}

/*************************功能按钮事件 E******************************/
/***************************************************************************
/**********************数量保价表格 开始******************************************/


//汇总统计
function Summary(){

	//汇总每一行
	var ids=$("#dataGrid").getDataIDs();
    $.each(ids,function(i,value){
  	  var currRow = $("#dataGrid").jqGrid('getRowData', value);
  	  //$("#dataGrid").jqGrid('setCell', value ,"amount" ,currRow.price * currRow.goodsNumber);
    });
  
//	//汇总
//	var rebateAmount = $("#dataGrid").getCol('rebateAmount', false, 'sum');
//	$("#dataGrid").footerData("set",{index:"合计",rebateAmount:rebateAmount});
	
}

/**********************数量保价表格 开始******************************************/
/***************************************************************************
/**********************外部引用 开始******************************************/
//打开引用对话框
var callBack ;
function selectReferenceOpen(cellInfo){
	var gridId = cellInfo.gridId;
	var grid = $("#"+gridId);
	var rowid = cellInfo.rowId;
	var inptid = cellInfo.cellInputId;
	//传入单选标志
	goodsnameReferenceFrame.mulSelect(false,{ifManageImei:""});
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
		
		$("#dataGrid").jqGrid('setCell', rowid ,"goodsId" ,goods.id);
		
		$("#dataGrid").jqGrid('setCell', rowid ,"ifManageImei" ,goods.ifManageImei);
		$("#dataGrid").jqGrid('setCell', rowid ,"ifEnableAuxliaryImei" ,goods.ifEnableAuxliaryImei);
		
		$('#goodsnameReferenceModal').modal('hide');
		setTimeout('MyEiditGrid.getFocus('+'"#'+gridId+' #'+inptid+'")',200);
	}; 
}

function selectReferenceOpen6(cellInfo){
	var gridId = cellInfo.gridId;
	var grid = $("#"+gridId);
	var rowid = cellInfo.rowId;
	var inptid = cellInfo.cellInputId;
	//传入单选标志
	goodsnameReferenceFrame.mulSelect(false,{ifManageImei:true});
	$('#goodsnameReferenceModal').modal('show').find('.referenceFrame').css({
	    height: $("html").height()/1.25,
	});
	callBack = function(){
		if(arguments[0].length == 0){
			$('#goodsnameReferenceModal').modal('hide');
			return ;
		}
		var goods = arguments[0][0];
		
		var currRow = $("#dataGrid6").jqGrid('getRowData', rowid);
		
		//清空关联数据       
		$("#dataGrid6").jqGrid('setCell', rowid ,"ifManageImei" ," ");
		$("#dataGrid6").jqGrid('setCell', rowid ,"imeiList" ," ");
		$("#dataGrid6").jqGrid('setCell', rowid ,"rebateNum" ,"0");
			
		
		//设置编辑器值
		//设置编辑器值
		$("#"+gridId+" #"+inptid).val(goods.name);
		
		$("#dataGrid6").jqGrid('setCell', rowid ,"goodsId" ,goods.id);
		
		$("#dataGrid6").jqGrid('setCell', rowid ,"ifManageImei" ,goods.ifManageImei);
		$("#dataGrid6").jqGrid('setCell', rowid ,"ifEnableAuxliaryImei" ,goods.ifEnableAuxliaryImei);
		$("#dataGrid6").jqGrid('setCell', rowid ,"valuationMethods" ,goods.valuationMethods);
		
		$('#goodsnameReferenceModal').modal('hide');
		setTimeout('MyEiditGrid.getFocus('+'"#'+gridId+' #'+inptid+'")',200);
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
		setTimeout('MyEiditGrid.getFocus('+'"#'+gridId+' #'+inptid+'")',200);
	};
}
function selectStorageReferenceOpen6(cellInfo){
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
		$("#dataGrid6").jqGrid('setCell', rowid ,"storageId" ,storage.id);

		$('#storageReferenceModal').modal('hide');
		setTimeout('MyEiditGrid.getFocus('+'"#'+gridId+' #'+inptid+'")',200);
	};
}

/**********************外部引用 开始******************************************/
/***************************************************************************

/**********************串号保价表格 开始******************************************/
//汇总统计
function Summary6(){

//	//汇总每一行
//	var ids=$("#dataGrid6").getDataIDs();
//	$.each(ids,function(i,value){
//	  	var currRow = $("#dataGrid6").jqGrid('getRowData', value);
//	  	$("#dataGrid6").jqGrid('setCell', value ,"rebateAmount" ,currRow.rebateNum * currRow.perAmount);
//	});
//
//	//汇总
//	var sumGoodsNumber = $("#dataGrid6").getCol('rebateNum', false, 'sum');  
//	var sumAmount = $("#dataGrid6").getCol('rebateAmount', false, 'sum');  
//	$("#dataGrid6").footerData("set",{index:"合计",rebateNum:sumGoodsNumber,rebateAmount:sumAmount});
//	
}

//初始化表格

function initDataGrid6(){

	//配置
	var paras = {
	    gridId:'dataGrid6', 
	    addRow:{goodsId:'',goodsCode:'',goodsName:'',goodsBrandName:'',stockNumber:'',numControlFlag:'',imControlFlag:'',cxNum:'',cxPrice:'',price:'',remark:''},
	    colNames:[ '仓库ID','仓库名称','商品ID','商品名称', '返利数量','返利总额', '备注','是否串号管理','是否辅助串号管理','串号列表','商品计价方式','单据明细id'],
	    colModel:
	    	 [ 
              {name : 'storageId',index : 'storageId',align:'left',sortable: false,hidden: true,formatter:'integer'}, 
              //{name : 'storageName' ,sortable: false,index : 'storageName',align:'left',editable:true,edittype:'custom',editoptions:{custom_element:my_inputxx, custom_value:my_valuexx}}, 
              {name : 'storageName',sortable: false,index : 'storageName',align:'left',edittype:'custom_bt_input',custom_element_bt_click:"selectStorageReferenceOpen6",editable:true}, 
              {name : 'goodsId',index : 'goodsId',align:'left',sortable: false,hidden: true,formatter:'integer'}, 
              {name : 'goodsName6',sortable: false,index : 'goodsName6',align:'left',edittype:'custom_bt_input',custom_element_bt_click:"selectReferenceOpen6",editable:true},
              {name : 'rebateNum',index : 'rebateNum',align:'right',hidden: false,editable:false,sortable: false,formatter:'integer'},
              {name : 'rebateAmount',index : 'rebateAmount',align:'right',editable:true,editrules:{number:true},formatter:'number',sortable: false,editoptions:{onkeyup:"checkInput.checkNum(this,12)"}},
              {name : 'remark',index : 'remark',align:'left',hidden: false,editable:true,sortable: false,editoptions:{readonly:false,onkeyup:"checkInput.clearNoText(this,100)"}},
              {name : 'ifManageImei',index : 'ifManageImei',hidden: true,editable:true,sortable: false},
              {name : 'ifEnableAuxliaryImei',index : 'ifEnableAuxliaryImei',hidden: true,editable:true,sortable: false},
              {name : 'imeiList',index : 'imeiList',hidden: true,editable:true,sortable: false},
              {name : 'valuationMethods',index : 'valuationMethods',hidden: true,editable:true,sortable: false},
                 {name : 'id',hidden: true,editable:false,sortable: false},
            ]
	};
	//回调函数
	var callBackList = {
		onCellSelect:function(rowid,iCol,cellcontent,e){
		   if(iCol == 6){

				try {MyEiditGrid.currEditDataGrid.unAllEdit();} catch (e) {}
				
			  var currRow = $("#dataGrid6").jqGrid('getRowData', rowid);
			  
		      //判断是否数量录入 并判断是否串号管理
		      if((currRow.ifManageImei == "true" || $.trim(currRow.imeiList) != "") && currRow.goodsId != ""){
		    	  $("#dataGrid6").setColProp("rebateNum",{editable:false});
		    	  openImeiInputModal("dataGrid6",rowid);//打开输入框	  
		      }
			}
		},
		afterEditCell:function(rowid,name,val,iRow,iCol){//开始编辑
//			if(iCol == 3){
//				$("#dataGrid6 #"+iRow+"_"+name).html("");
//				for ( var int = 0; int < currSectionStorageList.length; int++) {
//					$("#dataGrid6 #"+iRow+"_"+name).append("<option sid='"+currSectionStorageList[int].id+"' value='"+currSectionStorageList[int].sectionName+'-'+currSectionStorageList[int].name+"'>"+currSectionStorageList[int].sectionName+'-'+currSectionStorageList[int].name+"</option>");
//				}
//				$("#dataGrid6 #"+iRow+"_"+name+" option[value='"+val+"']").attr("selected",true);
//				$("#"+paras.gridId).jqGrid('setCell', rowid ,"storageId" ,$("#dataGrid6 #"+iRow+"_"+name).children('option:selected').attr("sid"));
//			}
        },
        afterSaveCell:function(rowid,name,val,iRow,iCol){//保存编辑
        },
        summary:function(rowid,name,val,iRow,iCol){//统计处理
        	Summary6();
        },
        getGridDataList:function(rows){
        	//筛出不合格行
        	return $.map(rows,function(row){
				if(row.goodsName6 != "" && row.storageName6 != ""){
			  		if($.trim(row.imeiList) != ""){
			  			row.cashRebateImList = JSON.parse(row.imeiList);
			  		}
			  		row.rebateNum = parseInt(row.rebateNum) ;
			  		row.rebateAmount = parseFloat(row.rebateAmount).toFixed(2);
			      	delete row["beforePrNum"];
			      	delete row["perAmount"];
			      	delete row["goodsName6"];
			      	delete row["storageName6"];
			      	delete row["ifEnableAuxliaryImei"];
			      	delete row["ifManageImei"];
			      	delete row["ifEnableAuxliaryImei"];
			      	delete row["valuationMethods"];
			      	delete row["imeiList"];
			      	delete row["beforePrNum"];
			      	return row;
				}
        	});
        }
	};
	dataGrid6 = new MyEiditGrid(paras,callBackList);
	dataGrid6.clearDataGrid();dataGrid6.addKongRow();
	
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

function getFocus(id){
	$(id).focus();
}

/**********************串号保价表格 开始******************************************/

//加载刷新仓库列表
var currSectionStorageList = [];

/**********************过滤 参数选择******************************************/
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

//打开商品名称引入对话框
function selectGoodsNameReferenceForFiterOpen(){
	$('#goodsnameReferenceModal').modal('show').find('.referenceFrame').css({
	    height: $("html").height()/1.25,
	});
	
	//传入多选标志
	goodsnameReferenceFrame.mulSelect(true,{ifManageImei:"",
		storageMode: 1});
	
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
