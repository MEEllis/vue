//局部全局对象
var menuBtn = null;//菜单栏按钮组对象对象
var dataGrid = null;//表格对象
var total = 1;//总记录数
var pageIndex = 0;

var adjustType = "";
var invalidFlag = 0;
var caption = "";
var billsType = -999;//单据类型 80:预收退款单,81:预付退款单
var isDraft=1;
var isRedOrder=0;  //是否是红冲单
var isCopyOrder=0;  //是否可以复制

var options = {
    LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
    TableName: "#dataGrid", //显示表格名称。遵照css选择器书写
    iconJsonUrl: "../json/icon.json",
    btnbox: ".btnbox ",
    findInpayClass: "/manager/inventory/fund/inPayment/findInpayClass"
};


$(function () {
    loadHeXiao();
    //获取单据类型
    billsType =$("#billsType").val();

    $('#billsBeginDateStr').datePlu({
        ajaxOpt:{
            async:false,
        },
        endDate: false,
    });


    //载入 部门组件
    $('#sectionName').storePlu({
        saleManId: 'managerUname',
        checkMore: false,
        search: false,
        ifStore: false, // 控制部门选项
        changeStore:function () {
            var id=$("input[name='sectionName']").data('sectionId');
            //设置编辑器值
            $("input[name='sectionId']").val(id);
            $("input[name='managerId']").val("");
            $("input[name='managerName']").val("");

            dataGrid.clearDataGrid()  ;
            dataGrid.addKongRow();
        }
    });
    //载入 经手人
    $("#managerName").comModalsEmployeeBySection({
        sectionIds:'input[name="sectionId"]',
        search: false,
        clickback:function(){
            var obj= $("input[name='managerName']");
            //设置编辑器值
            $("input[name='managerName']").val(obj.val());
            $("input[name='managerId']").val(obj.data('id'));
        }
    });
    //载入往来单位
    $('#contactsunitName').contactUnitPlu({
		search:false,
		getCouponName:getCouponName
	});
    //保存红冲按钮
    $(".redSave").on("click",function(){
    	var param={
                billsType:billsType,
    			billsId:$(".redSave").data('id'),
    			redDate:$(".redTime").val()
    	};
    	 var actionCode="";
         if(billsType=='80'){
         	actionCode='ystk_red';
         }else if(billsType=='81'){
         	actionCode='yftk_red';
         }
    	$.request({
    		url:"/manager/inventory/fund/inPayment/refund/excuteRed/"+actionCode,
    		type : 'POST',  
    		dataType: "json",
    		data:param,
    		success:function(data){

                if(data.result==1){
                    $.zxsaas_plus.showalert("success",data.desc || "红冲成功");
                    var id = $("#billsHeaderForm input[name='id']").val();
                    pageAjax({
                        billsId: id,
                        billsType:billsType
                    });
                    $('#redModal').modal('hide');
                }else{
                    $.zxsaas_plus.showalert("提示",data.desc);
                    $('#redModal').modal('show');
                }

    	    }
    	});
    });
    initMenuBtn();
    loadSearch();
    isBillslogShow();
    initDataGrid();
    cancleGrid();

    /*是否是：跳转单据*/
    var billsId = $.trim(functionObjExtent.getQueryString('billsId'))
    if(billsId!=''){
        var billsCode = $.trim(functionObjExtent.getQueryString('billsCode'))
        var copyFlag = $.trim(functionObjExtent.getQueryString('copyFlag'))
        billsType =$("#billsType").val();
        //单据编号
        if(billsCode!=""){
            isDraft=0;
            pageAjax({'billsId':billsId,'billsType':billsType},function () {
                //复制一单
                if(copyFlag==1){
                    copy();

                }
            })
        }else{
            isDraft=1;
            pageAjax({'billsId':billsId,'billsType':billsType})
        }

    }else{
        //新增
         getDefaultValues()

    }
});

//获取经手人默认值
function getDefaultValues(){
    var obj={
        success:function(data){
            $('input[name="sectionName"]').val(data.data.defaultSection.name)
            $('input[name="sectionId"]').val(data.data.defaultSection.sectionId)
            $('input[name="managerName"]').val(data.data.defaultEmployee.name).data('id',data.data.defaultEmployee.employeeId)
            $('input[name="managerId"]').val(data.data.defaultEmployee.employeeId)
        }
    }
    InterfaceInventory.common.getDefaultValues(obj);
}

//载入核销表格 dom
function loadHeXiao() {
    var option={
        //保存 事件
        hxSave:function () {
            hxSave();
        },
        //编辑 事件
        hxEdit:function () {
            hxEdit();
        },
        //一键核销
        hxKye:function () {
            keyCancle();
        }
    };
    heXiaoObj=$(".boxmainDiv").oneKeyCancel(option);
}
//重新载入
function reLoad() {
    //如果是红冲单
    if(isRedOrder==1){
        heXiaoObj.setDisabledbtn(["save","edit","key"]);
    }else{
        heXiaoObj.setUndisabledbtn(["save","edit","key"]);
    }
}

function reloadInit() {
    reloadMenuBtn();
    loadSearch();
    isBillslogShow();
    reLoad();
}

//载入菜单组件
function initMenuBtn() {
    var option = {
        btnGroupLeft: {
            add: {
                isShow: true,
                click: function () {
                    add();
                }
            },
            draftSave: {
                isShow: true,
                click: function () {
                    var data=getSaveParams()
                    if(checkSaveParam(data)==true){
                        return
                    }

                    var actionCode="";
                    if(data.billsType=='80'){
                        actionCode='ystk_save';
                    }else if(data.billsType=='81'){
                        actionCode='yftk_save';
                    }
                    $.ajaxPackage({
                        contentType:'application/json',
                        url:'/manager/inventory/fund/inPayment/refund/saveFefund/'+actionCode,
                        data:JSON.stringify(data),
                        success:function(data){
                            var  billsId=data.data.billsId;
                            data.billsType=billsType;
                            isDraft=1;
                            pageAjax({'billsId':billsId,billsType:billsType})
                            $.zxsaas_plus.showalert('success',data.desc || "保存成功！");
                        }
                    })
                }
            },
            draftDel: {
                isShow: true,
                click: function () {
                    delDraftBill()
                }
            },
            draftPost: {
                isShow: true,
                click: function () {
                    var data=getSaveParams()
                    var actionCode="";
                    if(data.billsType=='80'){
                        actionCode='ystk_post';
                    }else if(data.billsType=='81'){
                        actionCode='yftk_post';
                    }
                    var params = $("#billsHeaderForm").toJsonObject();
                    var billsId= $.trim(params.id)
                    if(params.billsCode!=""){
                        $.zxsaas_plus.showalert('提示','只能过账草稿单!');
                    }else{
                        $.ajaxPackage({
                            url:'/manager/inventory/fund/inPayment/refund/excutePost/'+actionCode,
                            data:{billsId:billsId,billsType:billsType},
                            success:function(data){
                                isDraft=0;
                                pageAjax({'billsId':data.data.billsId,billsType:billsType})
                                $.zxsaas_plus.showalert('success',data.desc || "过账成功");
                            }
                        })
                    }
                }

            },
            print: {
                click: function () {
                    dayin($("#billsHeaderForm input[name='id']").val())
                }
            },
            red: {
                click: function () {
                    redChong();
                }
            },
            copy: {
                click: function () {
                    copy();
                }
            },
            audit:{
                isShow: false,
                click: function () {
                    auditBill(1)
                }
            },
            auditCancle:{
                isShow: false,
                click: function () {
                    auditBill(0)
                }
            },
            update: {
                click: function () {
                    updateAndPost();
                }
            },
        },
        btnGroupRight: {
            history: {
                isShow: true,
                click: function () {
                    goHistory()
                }
            }
        }
    };
    menuBtn = new componentMenuBtn("#AUTH", option);
}

function reloadMenuBtn() {
    reloadToolbar()
}

function getCouponName(id){
	$.ajax({
		url: '/manager/funds/payment/getContactInfo',
        type : 'GET',
        dataType: "json",
        contentType :'application/json',
        data:{contactsunitId:id},
		success: function (data) {
			var info = data.data.contactInfo
            $("#billsHeaderForm input[name='brankName']").val(info.brankName);
            $("#billsHeaderForm input[name='accountName']").val(info.customer);
            // 80:预收退款单,81:预付退款单
            if(billsType==80){
                $("#billsHeaderForm input[name='yingsAmount']").val(info.yingshouAmount);
                $("#billsHeaderForm input[name='yusAmount']").val(info.yushouAmount);
            }else if(billsType==81){
                $("#billsHeaderForm input[name='yingfAmount']").val(info.yingfuAmount);
                $("#billsHeaderForm input[name='yufAmount']").val(info.yufuAmount);
            }
	    },
	    error: function (msg) {
         
	    }
	})
}

//载入搜索条件的东西
function loadSearch() {
    var $billsCodeWrapID = $("#billsCodeWrap");
    if (isDraft == true) {
        $billsCodeWrapID.hide();
    } else {
        $billsCodeWrapID.show();
    }
}

function isBillslogShow() {

    var $billslogID = $("#billslog");
    $billslogID.hide();
    // 不展示单据日志
    return;
    //查看状态
    if (isDraft == false) {
        $billslogID.show();
        var $searchFormID = $("#billsHeaderForm");
        var obj={
            data:{
                billsId:$searchFormID.find("input[name='id']").val(),
                billsType:billsType
            },
            success:function(data){
                new logMes("#billslog",{
                    list:data.data.billsLogList
                });
            }
        };
        fundCommonInterface.getBillsLogAjax(obj);

    }
}

//首单
function firstPage() {
    var param={};
     param.queryCodeStr = "F";
    pageAjax(param);
}

//上一单按钮单击事件
function backPage() {
    var id = $("#billsHeaderForm input[name='id']").val();
    pageAjax({
        billsType:billsType,
        queryCodeStr: "P",
        refBillsId:id
    });
}

//下一单按钮单击事件
function nextPage() {
    var id = $("#billsHeaderForm input[name='id']").val();
    pageAjax({
        billsType:billsType,
        queryCodeStr: "N",
        refBillsId:id
    });
}

//末单按钮单击事件
function lastPage() {
    var param={};
    param.queryCodeStr = "L";
    param.billsType = billsType;
    pageAjax(param);
}

//新增按钮单击事件
function add() {
    // 新增状态下，是否有用户操作过。
    if (isDraft == true && ($("#sectionName").val().length > 0 || $('#inpayClassId').val().length > 0 || $("#managerName").val().length > 0)) {
        $.zxsaas_plus.showconfirm("提示", "新开单将清空当前页面数据，是否继续？", clearAndAdd);
    } else {
        clearAndAdd();
    }

}

//红冲
function redChong(){

	var id = $("#billsHeaderForm input[name='id']").val();
	var billsDateStr = $("#billsHeaderForm input[name='billsCode']").val();
    if(id==""){
        $.zxsaas_plus.showalert("提示","单据不存在");
        return
    }
	$(".redSave").data('id',id);
	
	codeDate(billsDateStr,false);
	$('#redModal').modal('show');
}

function codeDate(obj,flag){
	var t = obj.split('-')[0];
	var reg = /[A-Z]/g;
	t = t.replace(reg,"");
	t = t.replace(t.substr(0,4),t.substr(0,4)+'-');
	t = t.replace(t.substr(0,7),t.substr(0,7)+'-');
	getAuthList(function () {
		var min = CompareDate(_authList.minDate,t)?_authList.minDate:t;
		if(flag == true){
			$('.exitTime').datePlu({
				endDate:false,
				minTime: min,
				defaultTime: min
			})
		}else{
			$('.redTime').datePlu({
				endDate:false,
				minTime: min,
				defaultTime: min
			})
		}
	})

}

function clearAndAdd() {

    if(billsType==80){
        location.href = basePath + '/inventory/fund/inPayment/refund/recRefund/main';
    }else if(billsType==81){
        location.href = basePath + '/inventory/fund/inPayment/refund/payRefund/main';
    }
}


//禁止页面编辑,禁用选择按钮
function forbiddenEdit() {
    $(options.TableName).setColProp('amount', {editable: false});
    $(options.TableName).setColProp('accountName', {editable: false});
    $("#billsHeaderForm input[name='billsDateStr']").attr("readonly", "readonly");
    $("#billsHeaderForm :button").hide();
    $("#billsHeaderForm select").attr("disabled", "disabled");
    $("#billsHeaderForm input[name='billsDateStr']").attr("disabled", "disabled");
    //隐藏表格删除按钮
    $("#dataGrid").setGridParam().hideCol("op");
}

//允许页面编辑，允许选择按钮
function allowEdit() {
    $(options.TableName).setColProp('amount', {editable: true});
    $("#billsHeaderForm input[name='billsDateStr']").removeAttr("readonly");
    $("#billsHeaderForm :button").show();
    $("#billsHeaderForm select").removeAttr("disabled", "disabled");
    $("#billsHeaderForm input[name='billsDateStr']").removeAttr("disabled", "disabled");
    $(options.TableName).trigger("reloadGrid").resize();
    dataGrid.addKongRow();
    dataGrid.$grid.delRowData(MyEiditGrid.getMaxRowid(dataGrid.$grid));
    //显示表格删除按钮
    $("#dataGrid").setGridParam().showCol("op");
}

//填充付款单表头（主信息数据）
function fillTopData(data) {
    total = data.total;
    pageIndex = data.pageIndex;
    var billsHeader = data;
    isRedOrder = 0;
    isCopyOrder = 0;
    if (billsHeader.billsStatus == "6") {
        $('.rightMap img').attr('src', '/manager/images/guozhang.png');
    } else if (billsHeader.billsStatus == "7") {
        $('.rightMap img').attr('src', '/manager/images/status/statusRed.png');
        isRedOrder = 1;
    } else {
        $('.rightMap img').removeAttr("src");
    }

    billsHeader.billsCode =billsHeader.billsCode===null?'':billsHeader.billsCode;
    //billsCode（包含R） 是否为红冲单 ，  为红冲单不能复制
    if(billsHeader.billsCode.indexOf("R")>-1){
        isCopyOrder = 1;
    }
    $("#billsHeaderForm").writeJson2Dom(billsHeader);
    getCouponName(billsHeader.contactsunitId)
    $("#billsHeaderForm input[name='sectionName']").data("sectionId",billsHeader.sectionId);
    $("#billsHeaderForm input[name='managerName']").data("employeeId",billsHeader.managerId);
    $("#billsHeaderForm input[name='contactsunitName']").data("contactUnitId",billsHeader.contactsunitId);
    $("#boxmainForm").writeJson2Dom(billsHeader);
    $("#bottomForm").writeJson2Dom(billsHeader);
}

//获取保存参数
function getSaveParams() {
    $(options.TableName).jqGrid("saveCell", lastrow, lastcell);
    $(options.TableName).jqGrid("restoreCell", lastrow, lastcell);
    //主表
    var params = $("#billsHeaderForm").toJsonObject();
    console.log(params);
    //明细数据
    var detailList = new Array();
    var ids = $(options.TableName).getDataIDs();
    $.each(ids, function (i, value) {
        var row = $(options.TableName).jqGrid('getRowData', value);
        if (row.accountId) {
            detailList.push({
                accountType: row["accountType"],
                accountId: row["accountId"],
                amount: row["amount"],
                remark: row["remark"]
            });
        }
    });

    return {
        id:params.id,
        billsType:billsType, //单据类型 80:预收退款单,81:预付退款单
        billsDateStr:  $("#billsBeginDateStr").val(),
        sectionId: $("#sectionName").data("sectionId"),
        managerId:params.managerId ,
        contactsunitId:$("#contactsunitName").data("contactUnitId"),
        remark: params.remark,
        detailList: detailList,
    };
}

//分页查询付款明细参数
function getSelectPageParam() {
    var param = {};
    param.id = "";
    param.billsCode = billsCode;
    //param.billsType=type;
    $.extend(param, $("#filterSearchForm").toJsonObject());
    param.contactUnitName = param.contactUnitName2;
    delete param.contactUnitName2;
    return param;
}

//上一单，下一单,首单，末单分页查询ajax请求
function pageAjax(param, callbackObj) {
    // callbackObj = callbackObj || {
    //         addSuccess: null   // 添加成功的回调函数
    //     }; //回调函数集合
    var locaParam={
        isDraft:isDraft
    }
    var exParam=$.extend(false,locaParam,param);
    $.request({
        url: "/manager/inventory/fund/inPayment/refund/searchRefundMain",
        type: 'POST',
        dataType: "json",
       /* contentType: 'application/json',*/
        async: false,
        data: exParam,
        success: function (data) {
            if (data.result == 1) {
                if (data.data.mainVo != null) {
                    var mainVo=data.data.mainVo;
                    jQuery("#dataGrid").jqGrid("clearGridData");
                    fillTopData(mainVo);
                    $("#jqGrid_payment").setGridParam({cellEdit:false});
                    fillHxDetail(data.data.orderVoList);
                    var detailList= mainVo.detailList;
                    if (detailList.length > 0) {
                        for (var i = 0; i < detailList.length; i++) {
                            $("#dataGrid").jqGrid('addRowData', i + 1, detailList[i], 'last');
                        }
                    }
                    if(isDraft){
                        allowEdit()
                    }else{
                        forbiddenEdit();
                    }
                    footerData();
                    reloadInit();
                    calHasnotAmount();
                    if (callbackObj) {
                        callbackObj(data);
                    }
                } else {
                    $.zxsaas_plus.showalert("提示", "没有查询到单据!");
                }
            } else {
                $.zxsaas_plus.showalert("提示", data.desc);
            }
        }
    });
}

//重置
function reset() {
    $("#filterSearchForm")[0].reset();
}


//保存并过账
// var _successOrderDate = '';//保存过账后的单据日期
// function saveAndPost() {
//     $.zxsaas_plus.showconfirm("提示", "单据过账后将无法修改，是否继续？", function () {
//         $("#billsHeaderForm").data('bootstrapValidator').validate();
//         if (!($('#billsHeaderForm').data('bootstrapValidator').isValid())) {
//             refreshValidator('#billsHeaderForm');
//             return;
//         }
//         var params = getSaveParams();
//         var checkResult = checkSaveParam(params);
//         if (checkResult) {
//             return;
//         }
//         var actionCode="";
//         if(params.billsType=='80'){
//         	actionCode='ystk_save';
//         }else if(params.billsType=='81'){
//         	actionCode='yftk_save';
//         }
//         var postUrl = "/manager/inventory/fund/inPayment/refund/saveFefund/"+actionCode;
//         $.request({
//             type: 'POST',
//             url: postUrl,
//             contentType :'application/json',
//             async:false,
//             data:JSON.stringify(params),
//             success: function (data) {
//                 $("#billsHeaderForm").data('bootstrapValidator').resetForm();
//                 if (data.result == 1) {
//                     $.zxsaas_plus.showalert("提示", data.desc||"操作成功");
//                     _successOrderDate = params.billsDate;
//                     $("#copy").removeAttr("disabled");
//                     var param = {};
//                     param.billsId = data.data.billsId;
//                     param.billsType = billsType;
//                     var callbackObj = {
//                         addSuccess: function () {
//
//                         }
//                     };
//                     pageAjax(param, callbackObj);
//                 } else {
//                     _successOrderDate = '';
//                     $.zxsaas_plus.showalert("提示", data.desc);
//                 }
//             }
//         });
//
//     });
// }

//打印
function dayin(id,title) {

    $.zxsaas_plus.showconfirm("提示",title || "确定打印此单据？",function(){
        todo();
    },function(){

    });

    function todo(){
    	 var actionCode="";
         if(billsType=='80'){
         	actionCode='ystk_print';
         }else if(billsType=='81'){
         	actionCode='yftk_print';
         }
        $.printBills('/manager/inventory/fund/inPayment/refund/printRefund/'+actionCode,
            {
                billsId:id,
                billsType:billsType
            }
        );
    }

}

//查看状态下，保存并过账
function updateAndPost() {
    $(options.TableName).jqGrid("saveCell", lastrow, lastcell);
    var $searchFormID = $("#billsHeaderForm");
    var detailList = [];
    var ids = $(options.TableName).getDataIDs();
    $.each(ids, function (i, value) {
        var row = $(options.TableName).jqGrid('getRowData', value);
        detailList.push({
            id: row["id"],
            remark: row["remark"]
        });
    });
    var id= $searchFormID.find("input[name='id']").val();
    var obj = {
        data: {
            billsType:billsType,
            id:id,
            remark: $searchFormID.find("input[name='remark']").val(),
            detailList: detailList
        },
        success: function (data) {
            pageAjax({
                billsType:billsType,
                billsId:id
            });
            $.zxsaas_plus.showalert("success", "修改成功");
        }
    };
    fundCommonInterface.updateRemarkAjax(obj);
}


//校验保存参数
function checkSaveParam(params) {
    var flag = false;
    if ($("#billsCode").val() != "") {
        $.zxsaas_plus.showalert("提示", "该单据已保存!");
        flag = true;
        return flag;
    }

    if ($("#managerName").val() == "") {
        $.zxsaas_plus.showalert("提示", "请选择经手人!");
        flag = true;
        return flag;
    }
    if ($("#contactsunitName").val() == "") {
        $.zxsaas_plus.showalert("提示", "请选择往来单位!");
        flag = true;
        return flag;
    }


    //判断单据总金额不能为0
    var amount = $(options.TableName).getCol('amount', false, 'sum');
    if (amount <= 0) {
        $.zxsaas_plus.showalert("提示", "金额大于0!");
        flag = true;
        return flag;
    }

    var accountName = $(options.TableName).getCol('accountName');
    for(var i=0;i<accountName.length;i++){
        if($.trim(accountName[i]) == "" ){
            $.zxsaas_plus.showalert("提示","请选择资金账户!");
            flag=true;
            return flag;
        }
    }
}



//复制按钮单击事件(有单据编号才让复制，复制一模一样的数据，单据编号清空，无单据编号不让复制)
function copy() {
    isDraft = 1;
    $("#billsCode").val("");
    var id = $("#billsHeaderForm input[name='id']").val("");
    reloadInit();
    $('.rightMap img').removeAttr("src");
    $("#bottomForm")[0].reset();
    $("#jqGrid_payment").jqGrid('clearGridData');
    allowEdit();
    dataGrid.addKongRow();
    dataGrid.$grid.delRowData(MyEiditGrid.getMaxRowid(dataGrid.$grid));
}

//新加行
function loadKongRow() {
     dataGrid.addKongRow();
}
//核销保存
function hxSave(){
    if($("#billsCode").val()==""){
        $.zxsaas_plus.showalert("提示","该单据未过账,没有核销明细!");
        return;
    }
    //校验未核销金额不能小于0
    var remainingHxAmount=$("#hasnotAmount").val().replace(",","");
    if(remainingHxAmount<0){
        $.zxsaas_plus.showalert("提示","未核销金额不能小于0,请重新输入本单核销金额!");
        return;
    }

    var ids = $("#jqGrid_payment").jqGrid('getDataIDs');
    var array=new Array();
    if(ids.length>0){
        $.each(ids,function(i,value){
            var param={};
            var rowData = $('#jqGrid_payment').jqGrid('getRowData',value);
            if(rowData.curHxAmount !="0.00"){
                param.batchId=-1;
                //param.detailId=rowData.detailId;
                param.mainId=rowData.accountMainId;
                param.zwMainId=rowData.refAccountMainId;
                param.hxAmount=Number(rowData.curHxAmount);
                param.hasnotAmount=rowData.remainingHxAmount.replace(/\,/g, "");
                param.remark=rowData.remark;
                param.resBillsCode=rowData.billsCode;
                param.contactsunitId=rowData.contactsUnitId;
                array.push(param);
            }else{
                //清空本单核销金额为0的数据
                $("#jqGrid_payment").jqGrid("delRowData", value);
            }
        });
    }
    else{
        $.zxsaas_plus.showalert("提示","没有核销明细!");
        return;
    }

    //清空核销明细表数据条件
    var billsCode=$("#billsCode").val();
    var contactsunitId = $("#billsHeaderForm input[name='contactsunitName']").data("contactUnitId");
    var params={
   /*     billsCode:billsCode,
        contactsunitId :contactsunitId,
        billsType :billsType,*/
        hxList:array
    }
    var url ="/manager/inventory/fund/inPayment/refund/saveHxDeatil/"+contactsunitId+"/"+billsCode+"/"+billsType+"";
    $.request({
        url:url,
        type : 'POST',
        dataType: "json",
        contentType :'application/json',
        data:JSON.stringify(array),
        success:function(data){
            if(data.result==1){
                $.zxsaas_plus.showalert("提示",data.desc || "保存成功");
                $("#jqGrid_payment").setGridParam({cellEdit:false});
            }else{
                $.zxsaas_plus.showalert("错误",data.desc);
            }
        }
    });
}

//核销编辑
function hxEdit(){
    $("#jqGrid_payment").setGridParam({cellEdit:true});
    var param=getHxEditParam();
    if(param==true){
        return;
    }
    var billsCode=$("#billsHeaderForm input[name='billsCode']").val();
    var contactsunitId = $("#billsHeaderForm input[name='contactsunitName']").data("contactUnitId");
    var actionCode="";
    if(billsType=='80'){
        actionCode='YSTKD';
    }else if(billsType=='81'){
        actionCode='YFTKD';
    }
    var hxEditUrl="/manager/inventory/fund/common/verification/getVerificationOrderVoList";
    $.request({
        url:hxEditUrl,
        type : 'POST',
        dataType: "json",
/*        contentType :'application/json',*/
        data:{"billsCode":billsCode,
            adjustTypeCode:actionCode,
            contactUnitId:contactsunitId},
        success:function(data){
            if(data.result==1){
                fillHxDetail(data.data.orderVoList)
                $("#nowAmount").val($.formatFloat($("#jqGrid_payment").getCol('curHxAmount',false,'sum'),2));
                calHasnotAmount();
            }else{
                $.zxsaas_plus.showalert("错误",data.desc);
            }
        }
    });
}

//一键核销
function keyCancle(){
    if($("#billsCode").val()==""){
        $.zxsaas_plus.showalert("提示","该单据未过账,没有核销明细!");
        return;
    }

    //校验未核销金额不能小于0
    var remainingHxAmount=$("#hasnotAmount").val().replace(/\,/g, "");
    if(remainingHxAmount<=0){
        $.zxsaas_plus.showalert("提示","未核销金额必须大于0才能一键核销!");
        return;
    }

    var ids = $("#jqGrid_payment").jqGrid('getDataIDs');
    if(ids.length==0){
        $.zxsaas_plus.showalert("提示","没有核销明细");
        return;
    }
    //可以核销的总金额（控制未核销金额不能小于0）
    var totalAmount=Number($("#amount").val().replace(/\,/g, ""))-Number($("#nowAmount").val().replace(/\,/g, ""));

    $.each(ids,function(i,value){
        var rowData = $('#jqGrid_payment').jqGrid('getRowData',value);
        var curHxAmount=Number(rowData.curHxAmount);
        var remainingHxAmount=Number(rowData.remainingHxAmount);
        if(totalAmount>0 && totalAmount>=rowData.remainingHxAmount){
            $("#jqGrid_payment").jqGrid('setCell',value,"remainingHxAmount",0);
            $("#jqGrid_payment").jqGrid('setCell',value,"curHxAmount",curHxAmount+remainingHxAmount);
            totalAmount=totalAmount-rowData.remainingHxAmount;
        }else if(totalAmount>0 && totalAmount<rowData.remainingHxAmount){
            $("#jqGrid_payment").jqGrid('setCell',value,"remainingHxAmount",Number(rowData.remainingHxAmount)-totalAmount);
            $("#jqGrid_payment").jqGrid('setCell',value,"curHxAmount",curHxAmount+totalAmount);
            totalAmount=0;
        }
        hxCal();
    });

    //清空本单核销金额为0的数据
    if(ids.length>0){
        $.each(ids,function(i,value){
            var rowData = $('#jqGrid_payment').jqGrid('getRowData',value);
            if(rowData.curHxAmount=="0.00"){
                $("#jqGrid_payment").jqGrid("delRowData", value);
            }
        });
    }

    calHasnotAmount();
}

//一键核销页脚计算
function hxCal(){
    var billsAmount = $("#jqGrid_payment").getCol('billsAmount',false,'sum');
    var hasHxAmount = $("#jqGrid_payment").getCol('hasHxAmount',false,'sum');
    var curHxAmount = $("#jqGrid_payment").getCol('curHxAmount',false,'sum');
    //核销金额
    $("#nowAmount").val($.formatFloat(hasHxAmount,2));
    var remainingHxAmount = $("#jqGrid_payment").getCol('remainingHxAmount',false,'sum');
    $("#jqGrid_payment").jqGrid('footerData','set',{
            "billsAmount": billsAmount,
            "hasHxAmount": hasHxAmount,
            "curHxAmount": curHxAmount,
            "remainingHxAmount": remainingHxAmount,
        }
    );
}

//获取核销编辑查询参数
function getHxEditParam(){
    //校验编辑参数
    if($("#billsCode").val()==""){
        $.zxsaas_plus.showalert("提示","该单据未过账,没有核销明细!");
        return true;
    }
    //校验未核销金额不能小于0
    var remainingHxAmount=$("#hasnotAmount").val();
    if(remainingHxAmount<0){
        $.zxsaas_plus.showalert("提示","未核销金额不能小于0,请重新输入本单核销金额!");
        return true;
    }
}

//填充核销明细数据
function fillHxDetail(hxList){
    jQuery("#jqGrid_payment").jqGrid("clearGridData");
    if(hxList!=undefined && hxList.length>0){
        for(var i=0;i<hxList.length;i++){
            $("#jqGrid_payment").jqGrid('addRowData', i+1,hxList[i], 'last' );
        }
    }
}



//收付款明细表格金额、核销明细表格本单核销金额文本框退出编辑或失去焦点事件
function cellOnBlurs(obj){
    var cellName=obj.id.split("_")[1];

    if(cellName=="amount"){
        if(isNaN(obj.value)){
            var id = $(options.TableName).jqGrid('getGridParam','selrow');
            $(options.TableName).jqGrid('setCell',id,cellName,"0.00");
            footerData();
            calHasnotAmount();
            $.zxsaas_plus.showalert("提示","请输入数字或保留两位小数!");
        }
        $(options.TableName).jqGrid("saveCell",lastrow,lastcell);
        footerData();
        calHasnotAmount();
    }

    if(cellName=="curHxAmount"){
        if(isNaN(obj.value)){
            var id=obj.id.split("_")[0];
            $("#jqGrid_payment").jqGrid('setCell',id,cellName,"0.00");
        }
        $("#jqGrid_payment").jqGrid("saveCell",lastrow,lastcell);
        hxFooterData();
        calHasnotAmount();
    }

}

function cellOnBlur(){
    $(options.TableName).jqGrid("saveCell",lastrow,lastcell);
    $("#jqGrid_payment").jqGrid("saveCell",lastrow,lastcell);
}

//改变未核销金额
function changeHasnotAmount(id,tableId){
    var billsAmount=$(tableId).getCell(id,"billsAmount");//金额
    var hasHxAmount=$(tableId).getCell(id,"hasHxAmount");//已核销金额
    var curHxAmount=$("#"+id+"_curHxAmount").val();//本单核销金额
    remainingHxAmount=Number(billsAmount)-Number(hasHxAmount)-Number(curHxAmount);
    if(Number(remainingHxAmount)<0){
        $.zxsaas_plus.showalert("提示","未核销金额不能小于0!");
        $(tableId).jqGrid('setCell',id,"remainingHxAmount","0.00");
        //本单核销金额==金额-已核销金额
        $(tableId).jqGrid('setCell',id,"curHxAmount",Number($(tableId).getCell(id,"billsAmount"))-Number($(tableId).getCell(id,"hasHxAmount")));
        hxFooterData();
    }else{
        $(tableId).jqGrid('setCell',id,"remainingHxAmount",remainingHxAmount);

        var sumHxAmount=$("#jqGrid_payment").getCol('curHxAmount',false,'sum');
        if(curHxAmount!="" && curHxAmount!=undefined){
            sumHxAmount=parseFloat(sumHxAmount)+parseFloat(curHxAmount.replace(/\,/g, ""));
            $(tableId).jqGrid('footerData','set',{
                    "curHxAmount":sumHxAmount,
                    "remainingHxAmount":$("#jqGrid_payment").getCol('remainingHxAmount',false,'sum'),
                }
            );
        }
    }

    calHasnotAmount();
}
//计算未核销金额
function calHasnotAmount(){
    //单据总金额
    $("#boxmainForm input[name='amount']").val($.formatFloat(Number($(options.TableName).getCol('amount',false,'sum')),2));

    //核销金额
    $("#boxmainForm input[name='nowAmount']").val($.formatFloat(Number($("#jqGrid_payment").getCol('curHxAmount',false,'sum')),2));

    //未核销金额
    var remainingHxAmount=Number($("#boxmainForm input[name='amount']").val().replace(",",""))
        -Number($("#nowAmount").val().replace(",",""));
    $("#boxmainForm input[name='hasnotAmount']").val($.formatFloat(remainingHxAmount,2));
}

var lastrow = "", lastcell = "";
//初始化表格
var dataGrid = null;
function initDataGrid() {
    //配置
    var paras = {
        gridId: 'dataGrid',
        addRow: {
            id: '', accountName: '', accountTypeName: '', amount: '',
            remark: '', accountId: '', accountType: ''
        },
        colNames: ['id','账户名称','账户类别','金额','备注',"资金账户id","资金账户类型code"],
        colModel: [
            {name:'id',index:'id', width:150,align:'center',key:true,sortable:false,hidden:true},
            {name:'accountName',index:'account_name', width:300,align:'left', sorttype:'integer',
                edittype: 'custom_bt_input',
                custom_element_bt_click: "selectAccountReferenceOpen",
                editable: true,
            },
            {name:'accountTypeName',index:'account_id', width:300,align:'left', sorttype:'string',sortable:false},
            {name:'amount',index:'amount', width:200,align:'right', sorttype:'Long'
                ,formatter:"number",editable:true,editoptions:{readonly:false,
                onkeyup:"checkInput.checkNum(this,12)",
                dataEvents: [{
                    type: "blur",
                    fn: function(){
                        $("#dataGrid").jqGrid("saveCell", lastrow, lastcell);
                    }
                },{
                    type: "focus",
                    fn: function(){
                        this.select()
                    }
                }
                ]
            }
                ,sortable:false},
            {name:'remark',index:'remark', width:700,align:'left', sorttype:'string',editable:true,editoptions:{readonly:false,onblur:"cellOnBlur()",onkeyup:"checkInput.clearNoText(this,100)"},sortable:false},
            {name:'accountId',index:'accountId', width:15,align:'center',hidden:true,sortable:false},
            {name:'accountType',index:'accountType', width:15,align:'center',hidden:true,sortable:false}
        ],
        width: '1000px'
    };
    //回调函数
    var callBackList = {
        onCellSelect: function (rowid, iCol, cellcontent, e) {
            var describedby=  $(e.target).attr("aria-describedby");
            if (describedby.indexOf("_amout") >=0 && isDraft) {
                var adjustType = $("#adjustType").val();
                if (adjustType == "") {
                    $("#dataGrid").setColProp("amount", {editable: false});
                    $.zxsaas_plus.showalert("提示", "请先选择调整类型！");
                    return false
                } else {
                    $("#dataGrid").setColProp("amount", {editable: true});
                }
            }

        },
        afterEditCell: function (rowid, name, val, iRow, iCol) {//开始编辑
            lastrow = iRow;
            lastcell = iCol;
        },
        afterSaveCell: function (rowid, name, val, iRow, iCol) {//保存编辑
            lastrow = iRow;
            lastcell = iCol;
        },
        summary: function (rowid, name, val, iRow, iCol) {//统计处理
            footerData();
        },
        getGridDataList: function (rows) {
        }
    };
    dataGrid = new MyEiditGrid(paras, callBackList);
    loadKongRow();
    $('#dataGridAccountName').comModalsAccount({
        clickback:function(goodsList){
            var $grid = dataGrid.$grid;
            var ids = $grid.getDataIDs();
            var hasRepetGood=false //是否有重复商品，默认是没有
            var gridSelDataRow=$grid.jqGrid("getRowData",dataGrid.lastrow);  //主表选中的行 数据
            var hasCurRow=false;//是否有当前行选中的重复商品，默认是没有
            $.each(ids, function (m, keyId) {
                var rowData = $grid.jqGrid('getRowData', keyId);
                for(var i=0;i<goodsList.length;i++){
                    var goodsItem=goodsList[i];
                    if(goodsItem.dataId==rowData.accountId){
                        goodsList.splice(i, 1);
                        if(gridSelDataRow.accountId==goodsItem.dataId){
                            hasCurRow=true;
                            break;
                        }
                        hasRepetGood=true
                        break;
                    }
                }
            });
            if(hasRepetGood==true){
                $.zxsaas_plus.showalert('提示',"页面存在被选中的账户名称，已经去掉！");
            }
            var accountIds=[]
            for(var i=0;i<goodsList.length;i++){
                accountIds.push(goodsList[i].dataId)
            }
            if(accountIds.length>0){
                $("#dataGrid").jqGrid('saveCell',lastrow,lastcell);
                var  selRowId=$("#dataGrid").jqGrid('getGridParam','selrow');
                var cIndex;
                for(var i=0;i<goodsList.length;i++){
                    var goods = goodsList[i];
                    var dataRow = {
                        accountId: goods.dataId,
                        accountName: goods.name,
                        accountType: goods.accountTypeCode,
                        accountTypeName: goods.accountTypeName,
                        amount: "0.00"
                    };
                    if(i==0&&hasCurRow==false){
                        $grid.jqGrid('setRowData', selRowId, dataRow, {});
                        cIndex=selRowId;
                    }else{
                        cIndex=MyEiditGrid.getMaxRowid($grid) + 1;
                        $grid.jqGrid('addRowData', cIndex, dataRow);
                    }
                }
                $grid.delRowData('dataGrid_addRowId');
                dataGrid.addKongRow();
                $grid.delRowData(MyEiditGrid.getMaxRowid($grid));
                footerData();
            }
            $("#dataGridAccountName").removeData();
        }
    })
}
//页脚合计
function footerData() {
    var amount = $(options.TableName).getCol('amount', false, 'sum');
    $(options.TableName).jqGrid('footerData', 'set', {
        "rn": "合计",
        "amount": amount
    });
    calHasnotAmount();
}

function hxAmountChange(obj){
    changeHasnotAmount(obj.id.split("_")[0],"#jqGrid_payment");
}
//核销grid
function cancleGrid(){
    var options = {
        LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
        TableName: "#jqGrid_payment", //显示表格名称。遵照css选择器书写
        iconJsonUrl:"../json/icon.json",
        btnbox: ".btnbox ",//功能按钮存放容器。遵照css选择器书写
    };

    $.jgrid.defaults.width = 1280;
    $.jgrid.defaults.responsive = true;
    $.jgrid.defaults.styleUI = 'Bootstrap';
    var lastsel='';//最后一次选中的行
    var mydata;
    var hid=false;
    var lock=false;
    var colNames = ['账务主表id(被核销)','账务主表id(用于核销)','往来单位id','单据日期','单据类型','单据编号','单据部门','金额','已核销金额','本单核销金额','未核销金额','备注'];
    var JqGridColModel=[

        {name:'refAccountMainId',index:'refAccountMainId', width:100,align:'center', sorttype:'string',sortable:false,hidden:true},
        {name:'accountMainId',index:'accountMainId', width:200,align:'center', sorttype:'string',sortable:false,hidden:true},
        {name:'contactsUnitId',index:'contactsUnitId', width:200,align:'center', sorttype:'string',hidden:true,},
        {name:'billsDateStr',index:'billsDateStr', width:200,align:'center', sorttype:'string',},
        {name:'billsTypeName',index:'billsTypeName', width:200,align:'center', sorttype:'string',},
        {name:'billsCode',index:'billsCode', width:250,align:'center', sorttype:'string',},
        {name:'sectionName',index:'sectionName', width:200,align:'center', sorttype:'string',},
        {name:'billsAmount',index:'billsAmount', width:100,align:'center',  sorttype:'string',formatter:"number",},
        {name:'hasHxAmount',index:'hasHxAmount', width:200,align:'center', sorttype:'string',formatter:"number",},
        {name:'curHxAmount',index:'curHxAmount', width:100,align:'center', sorttype:'Long',formatter:"number",editable:true,
            editoptions:{
            readonly:false,
            onkeyup:"hxAmountChange(this)",
            onblur:"cellOnBlurs(this)",
                dataEvents: [{
                    type: "focus",
                    fn: function(){
                        this.select()
                    }
                }
                ]},
        },
        {name:'remainingHxAmount',index:'remainingHxAmount', width:100,align:'center', sorttype:'string',formatter:"number",},
        {name:'remark',index:'remark',align:'center', width:300, sorttype:'string',editable:true,editoptions:{readonly:false,onblur:"cellOnBlur()",onkeyup:"checkInput.clearNoText(this,100)"},},
    ];
    loadtable();
    function loadtable(){
        $(options.TableName).jqGrid({
            mtype:"GET",
            datatype: "local",
            jsonReader  : {	root: "data.hxDeatilList",repeatitems: false},
            colNames:colNames,
            colModel:JqGridColModel,
            sortable:true,
            rownumbers:true,
            cellsubmit: 'clientArray',//单元格保存内容的位置
            editurl: 'clientArray',
            caption:'核销明细',
            cellEdit:true,
            width: "100%" ,
            autowidth:true,
            rownumWidth: 40, // the width of the row numbers columns
            shrinkToFit:false,
            footerrow:true,  //设置表格显示表脚
            userDataOnFooter:true,//设置userData 显示在footer里
            beforeEditCell:function(rowid,cellname,v,iRow,iCol){
                hxFooterData();
                lastrow = iRow;
                lastcell = iCol;
                hxFooterData();
            },
            afterSaveCell:function(rowid,name,val,iRow,iCol){//保存编辑
                lastrow = iRow;
                lastcell = iCol;
            },
            beforeSelectRow:function(id){
                hxFooterData();
                $(document).delegate('#' + id + '_curHxAmount', "contextmenu", function(e){
                    return false;
                });
            },
            loadComplete:function(data){
                hxFooterData();
            },
            gridComplete:function(data){
                $("#gbox_jqGrid_payment tr:last").find("td").eq(0).text("合计");
                hxFooterData();
            }
        })
        jQuery(options.TableName).jqGrid('setLabel',0, '序号');
    }
}


//核销底部合计
function hxFooterData(){
    var billsAmount = $("#jqGrid_payment").getCol('billsAmount',false,'sum');
    var hasHxAmount = $("#jqGrid_payment").getCol('hasHxAmount',false,'sum');
    var curHxAmount = $("#jqGrid_payment").getCol('curHxAmount',false,'sum');
    var remainingHxAmount = $("#jqGrid_payment").getCol('remainingHxAmount',false,'sum');

    $("#jqGrid_payment").jqGrid('footerData','set',{
            "billsAmount": billsAmount,
            "hasHxAmount": hasHxAmount,
            "curHxAmount": curHxAmount,
            "remainingHxAmount": remainingHxAmount,
        }
    );
    //核销金额
    $("#nowAmount").val($.formatFloat(curHxAmount,2));
    calHasnotAmount();
}