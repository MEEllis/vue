var orderDao = new Order(basePath);
var pageIndex = 1;//页码
var pageSize = 1;//页大小
var pageCount = 0;//页码大小
var currPage = null;//当前页数据
var queryDir = "last";
var currAtId = "";
var laiyuan = '';//末页
var lastrow = null,lastcell = null;
var billsType=1 //单据类型 1:采购订单 2:采购入库单 3:采购换货单 4:采购退货单
$(function () {
    init()
    //初始化
    function init(){
        initUI();//初始化UI
        initDataGrid();//初始化表格
        initDataGrid2();//初始化金额明细录入
        initDataGrid55();
        initEvents();//初始化事件
        initEvent()

        billId=billId||functionObjExtent.getQueryString('billsId')
        //这里入口过多，这里进行适配。（优先读取后台注入的值）
        billsCode=billsCode||functionObjExtent.getQueryString('billsCode')
        //	是否从报表进入
        if (billId != ''  || billsCode != '') {
            var copyFlag = functionObjExtent.getQueryString('copyFlag')
            var checkFlag = functionObjExtent.getQueryString('checkFlag')
            queryPage(function () {
                billId = ''
                billsCode =''
                //复制一单
                if(copyFlag==1){
                    copyBtClick()
                }else{
                    //审核一单
                    if(checkFlag==1){
                        openCheckDetailModal()
                    }
                }
            });
        } else {
            openAddState();
        }
    }
    //初始化事件
    function initEvent(){
        initMenuBtn()
        initTopForm()
        initFilter()
        initTable()
    }

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
                $('#payrecetiptAmount').val(0);
                dataGrid2.$grid.jqGrid('clearGridData');
                currPayreceiptDetailList = [];
                onSectionChange(id)
            }
        });
        //经办人
        $("#topForm input[name='managersName']").comModalsEmployeeBySection({
            sectionIds:'input[name="sectionId"]',
            clickback:function () {
                var obj= $("#topForm input[name='managersName']");
                //设置编辑器值
                $("input[name='managersName']").val(obj.val());
                $("input[name='managersUid']").val(obj.data('id'));
            }
        })
        //往来单位
        $("#topForm input[name='contactsunitName']").comModalsContactUnit({
            clickback:function () {
                var obj= $("#topForm input[name='contactsunitName']");
                //设置编辑器值
                $("input[name='contactsunitName']").val(obj.val());
                $("input[name='contactsunitId']").val(obj.data('id'));
                //切换往来单位余额
                initWLDWamount(obj.data('id'));
                var ids = $('#dataGrid').getDataIDs();
                var goodsIdList=[]
                $.each(ids,function(i,keyId){
                    var rowData = $('#dataGrid').getRowData(keyId);
                    if(rowData.goodsId!=''){
                        goodsIdList.push(rowData.goodsId)
                    }
                })
                getPrice(goodsIdList,1)
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
        //商品名称
        $("#goodsNameIdListStr").comModalsAllGoods({
            inStockMethod:1,
            clickback:function(){
                var id=$("#goodsNameIdListStr").data('id')
                $("input[name='goodsNameIdListStr']").val(id);
            }
        })

    }
    //初始化 表格
    function initTable() {
        //商品名称
        $("#dataGridGood").comModalsAllGoods({
            inStockMethod:1,
            clickback:function(goodsList){
                var selRow = $("#dataGrid").jqGrid('getGridParam','selrow');
                if(goodsList.length>0){
                    $("#dataGrid").jqGrid('saveCell',lastrow,lastcell);
                    for(var i=0;i<goodsList.length;i++){
                        var goods = goodsList[i];
                        var dataRow = {
                            'code': goods.code,
                            'categoryName':goods.categoryName,
                            'brandName':goods.brandName,
                            'models':goods.models,
                            'color':goods.color,
                            'goodsNumber':1,
                            'goodsName':goods.name,
                            'goodsId':goods.dataId,
                        };
                        if(i==0){
                            $("#dataGrid").jqGrid('setRowData', selRow, dataRow, {});
                        }else{
                            dataGrid.$grid.jqGrid('addRowData', MyEiditGrid.getMaxRowid(dataGrid.$grid) + 1, dataRow);
                        }
                    }
                    dataGrid.$grid.delRowData('dataGrid_addRowId');
                    dataGrid.addKongRow();
                    dataGrid.$grid.delRowData(MyEiditGrid.getMaxRowid(dataGrid.$grid));
                    Summary();

                    var goodsIdList=[]
                    for(var i=0;i<goodsList.length;i++){
                        goodsIdList.push(goodsList[i].dataId)
                    }

                    getPrice(goodsIdList)
                }
                $("#dataGridGood").removeData();
            }
        })
    }

    //获取价格 (isPrompt:是否提示)
    function getPrice(goodsIdList,isPrompt){
        var contactUnitId=$.trim($("input[name='contactsunitId']").val())
        var sectionId=$.trim($("input[name='sectionId']").val())
        var goodsId=goodsIdList.join(',')
        var updatePrice = function (priceList) {
            var ids = $('#dataGrid').getDataIDs();
            $.each(ids,function(i,keyId){
                var rowData = $('#dataGrid').getRowData(keyId);
                for(var j=0;j<priceList.length;j++){
                    var priceItem = priceList[j];
                    if(rowData.goodsId==priceItem.goodsId){
                        $('#dataGrid').jqGrid('setCell', keyId ,"price" ,priceItem.price);
                    }
                }
            })
            Summary()
        }
        if(sectionId!=''&&contactUnitId!=''&&goodsId.length>0){
            InterfaceInventory.common.getPurchaseGoodsPrice({
                data:{
                    'sectionId':sectionId,
                    'contactUnitId': contactUnitId,
                    'goodsId':goodsId
                },
                success:function (data) {
                    var priceList=data.data.dataList;
                    $("#dataGrid").jqGrid('saveCell',lastrow,lastcell);
                    if(data.data.updateFlag===true){
                        if(isPrompt==1){
                            $.MsgBox("操作提示","已成功切换往来单位，您需要更新采购单价吗？",function(){
                                updatePrice(priceList)
                            },function(){});
                        }else{
                            updatePrice(priceList)
                        }
                    }

                }
            })
        }


    }
});

//载入菜单组件
function initMenuBtn(){
    var isDraftOp=!$("#slideThree").is(':checked')
    var option = {
        btnGroupLeft: {
            add: {
                isShow: true,
                click: function () {
                    location.href =location.href.substring(0,location.href.indexOf('?'));
                }
            },
            draftSave: {
                isShow: isDraftOp,
                click: function () {
                    saveBtClick()
                }
            },
            draftDel: {
                isShow: isDraftOp,
                click: function () {
                    delBtClick()
                }
            },
            check:{
                isShow: !isDraftOp,
                click: function () {
                    openCheckDetailModal()
                }
            },
            mandatory:{
                isShow: !isDraftOp,
                click: function () {
                    forceFinishBtClick()
                }
            },
            print:{
                isShow: true,
                click: function () {
                    print()
                }
            },
			// printDropdown:{
				// isShow: true,
				// list:[{
				// 	name:'未审核',
				// 	click:function(){
				// 		print('nocheck')
				// 	}
				// },{
				// 	name:'已审核及强制完成',
				// 	click:function(){
				// 		print('check')
				// 	}
				// }]
			// },
            copy:{
                isShow: !isDraftOp,
                click: function () {
                    copyBtClick()
                }
            },
            audit:{
                isShow: !isDraftOp,
                click: function () {
                    var topFormObj = $(".gridTop").toJsonObject();
                    $.ajaxPackage({
                        url: '/manager/inventory/purchase/updateAuditStatus',
                        data: {
                            billsType:billsType,
                            billsId:topFormObj.id,
                            auditStatus:1,
                        },
                        success: function (data) {
                            $.zxsaas_plus.showalert('success', "稽核成功");
                            queryDir  = "refresh";
                            queryPage();
                        }
                    })
                }
            },
            auditCancle:{
                isShow: !isDraftOp,
                click: function () {
                    var topFormObj = $(".gridTop").toJsonObject();
                    $.ajaxPackage({
                        url: '/manager/inventory/purchase/updateAuditStatus',
                        data: {
                            'billsType':billsType,
                            'billsId':topFormObj.id,
                            'auditStatus':0,
                        },
                        success: function (data) {
                            $.zxsaas_plus.showalert('success', "取消稽核成功");
                            queryDir  = "refresh";
                            queryPage();
                        }
                    })
                }
            },
            update:{
                isShow: !isDraftOp,
                click: function () {
                    saveBtClick()
                }
            },
        },
        btnGroupRight: {
            history: {
                isShow: true,
                click: function () {
                    window.parent.openWorkBoxByMenutext("采购订单单据列表",  '/manager/inventory/purchase/historyMain?billsType='+billsType, true);
                }
            }
        }
    };
    menuBtn = new componentMenuBtn("#MenuTool", option);
}
//重载菜单组件
function reloadMenuBtn() {
    var isDraftOp=!$("#slideThree").is(':checked')
    var updateKey=['mandatory','copy','update','audit','auditCancle'];
    var addkey=['draftPost','draftDel','draftSave','check'];
    var params = $("#topForm").toJsonObject();
    var billsStatus=  $.trim(params.billsStatus)
    var isAudit=  $.trim(params.auditStatus)
    $.pageDetailCommon.reloadMenuTool({
        isDraftOp:isDraftOp,
        isAudit:isAudit,
        billsStatus:billsStatus,
        menuBtn:menuBtn,
        billsCode:params.billsCode,
        updateKey:updateKey,
        addkey:addkey,
    })
    //判断是否禁用
    if(isDraftOp == false){
        if(billsStatus=="2"){
            menuBtn.setUndisabledbtn("mandatory");
        }else if(billsStatus=="4" ||billsStatus=="5" ||billsStatus=="12"){
            menuBtn.setDisabledbtn("mandatory");
        }
    }
}
/*************************分页 S******************************/
function lastPage(){
    laiyuan = arguments[0];
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
function queryPage(callbackObj) {
    //获取查询参数
    var model = {};
    model.isDraftOp = $("#slideThree").is(':checked') ? false : true;
    model.page = pageIndex;
    model.rows = pageSize;
    model.billsType = "1";
    $.extend(model, getQueryData());

    if(model.billsDateBegin != null && model.billsDateBegin != ""){
        model.billsDateBegin = model.billsDateBegin + " 00:00:00";
}
    if(model.billsDateEnd != null && model.billsDateEnd != ""){
        model.billsDateEnd = model.billsDateEnd + " 23:59:59";
    }

    model.queryDir = queryDir;
    if (billId != '') {
		model.id = billId;
		model.billsDateBegin = "";
		model.billsDateEnd = "";
		model.isDraftOp = true;
        $("#topForm input[name='id']").val(billId)
	}
    if (billsCode != "") {
        model.billsDateBegin = "";
        model.billsDateEnd = "";
        model.isDraftOp = false;
        model.billsCode = billsCode;
    }
    model.currAtId = $("#topForm input[name='id']").val();
    //后台查询
    $.request({
        url: this.basePath + '/IorderMain/page',
        type: "post",
        dataType: 'json',
        data: model,
        success: function (data) {
            var result = data.data;
            if (data.result != 1) {
                $.MsgBox('错误提示', data.desc);
                return;
            }
            pageIndex = result.query.pageNumber;
            pageCount = result.total;
            if (result.rows.length > 0) {
                dataGrid.clearDataGrid();
                dataGrid2.clearDataGrid();
                initPageData(result.rows[0],model.isDraftOp);
            }
            else {
                if('back' == queryDir){
                    $.MsgBox('查询提示',"已是最前一页")
                }else if('next' == queryDir){
                    $.MsgBox('查询提示',"已是最后一页")
                }else{
                    $.MsgBox('查询提示',"没有查到数据");clearAllData();
                }
            }
            if(callbackObj){
                callbackObj(data.data)
            }

        }
    });
}
//填充页面页面数据
function initPageData(order,isDraftOp) {
    getAuthList(initDealDate);
    $("#topForm").data('bootstrapValidator').resetForm();
    var formObj = order;
    var orderDetailList = order.orderDetailList;
    var payreceiptDetailList = order.payreceiptDetailList;
    currPayreceiptDetailList = order.payreceiptDetailList;
    onSectionChange(order.sectionId);
    //格式化数据
    formObj.billsDate = $.DateFormatFromTimestamp("yyyy-MM-dd", formObj.billsDate);
    initWLDWamount(order.contactsunitId);
    //设置表单数据
    $(".gridTop").writeJson2Dom(formObj);
    $("input[name='billsDate']").val(formObj.billsDate);
    $(".gridBottom").writeJson2Dom(formObj);
    //设置明细数据
    for (var int = 0; int < orderDetailList.length; int++) {
        var row = orderDetailList[int];
        dataGrid.addRowData(int, row);
    }
    //设置收付款明细数据
    var allAount = 0;
    $("#payrecetiptAmount").val(0);
    try {
        for (var int = 0; int < payreceiptDetailList.length; int++) {
            var row = payreceiptDetailList[int];
            row.accountType = "现金";
            allAount = allAount + row.payreceiptAmout;
            dataGrid2.addRowData(int, row);
        }
        $("#payrecetiptAmount").val(allAount.toFixed(2));
    } catch (e) {

    }
    Summary();
    Summary2();

    if(order.billsStatus==1){
        $("#billsStautsImg").attr("src",basePath+"/images/status/statusNotAudit.png").show();
    }else{
        $.showBillsStatus("billsStautsImg", order.billsStatus);
    }

    initData = getPageData();//记录初始数据
    if (isDraftOp) {
        $('#slideThree').attr('checked',false);
        $(".delBt,.checkBt").attr({"disabled": "disabled"});
        $(".forceFinish,.copyBills").removeAttr("disabled");
        $(".gridTop input:not(:hidden)").prop("readonly", true);
        //正式单据修改
        $(".gridTop input[name='remark']").prop("readonly", false);
        dataGrid.$grid.setGridParam({cellEdit: true});
        dataGrid2.$grid.setGridParam({cellEdit: true});
        $("#dataGrid").hideCol("reviewsNum");
        $("#dataGrid").hideCol("reviewsAmount");
        wResize();
    }
    else {
        $('#slideThree').attr('checked',true);
        if ($(".gridTop").toJsonObject().id != "") {
            $(".gridTop input:not(:hidden)").not('input[name="billsCode"]').prop("readonly", false);
            $(".gridTop input[name='remark']").prop("readonly", false);
        } else {
            $(".gridTop input:not(:hidden)").not('input[name="billsCode"]').prop("readonly", false);
        }
        $(".delBt,.checkBt,.forceFinish,.copyBills").removeAttr("disabled");
        $(".forceFinish").attr({"disabled": "disabled"});
        dataGrid.$grid.setGridParam({cellEdit: false});
        dataGrid2.$grid.setGridParam({cellEdit: false});

        $(".gridTop input:not(:hidden)").not('input[name="billsCode"],input[name="remark"],input[name="billsDate"],input[name="billsDiscount"]').prop("readonly", true);
        if (order.auditStatus == 1) {
            $('.rightMap img:eq(1)').attr('src', '/manager/images/audit.png');
        } else {
            $('.rightMap img:eq(1)').attr('src', '/manager/images/auditNo.png');
        }
        $("#dataGrid").showCol("reviewsNum");
        $("#dataGrid").showCol("reviewsAmount");
        wResize();
    }
    if(order.billsStatus == 4 || order.billsStatus == 5){
        $('.forceFinish').attr({"disabled": "disabled"});
    }
    reloadMenuBtn()
};
/*************************分页 E******************************/
/*************************功能按钮事件 S******************************/
//打印单据
// function print() {
//     var id = $(".gridTop").toJsonObject().id;
//     if (id == "")return;
//     var tempKindDIV;
//     if($("#slideThree").is(':checked')==false){
//         tempKindDIV = $(
//             '<fieldset class="fieLeft" id="form3">' +
//             '<legend>打印模板类型</legend>' +
//             '<div class="">' +
//             '<label class="radio-inline"><input type="radio" name="printTempKind" value="default" checked>默认</label>' +
//             '<label class="radio-inline"><input type="radio" name="printTempKind" value="nocheck">未审核</label>' +
//             '<label class="radio-inline"><input type="radio" name="printTempKind" value="check" disabled="disabled">已审核及强制完成</label>' +
//             '</div>' +
//             '</fieldset>'
//         );
//     }else{
//         tempKindDIV = $(
//             '<fieldset class="fieLeft" id="form3">' +
//             '<legend>打印模板类型</legend>' +
//             '<div class="">' +
//             '<label class="radio-inline"><input type="radio" name="printTempKind" value="default" checked>默认</label>' +
//             '<label class="radio-inline"><input type="radio" name="printTempKind" value="nocheck" disabled="disabled">未审核</label>' +
//             '<label class="radio-inline"><input type="radio" name="printTempKind" value="check" >已审核及强制完成</label>' +
//             '</div>' +
//             '</fieldset>'
//         );
//     }
//     /*  var tempKindDIV = $(
//           '<fieldset class="fieLeft" id="form3">' +
//           '<legend>打印模板类型</legend>' +
//           '<div class="">' +
//           '<label class="radio-inline"><input type="radio" name="printTempKind" value="default" checked>默认</label>' +
//           '<label class="radio-inline"><input type="radio" name="printTempKind" value="nocheck">未审核</label>' +
//           '<label class="radio-inline"><input type="radio" name="printTempKind" value="check">已审核及强制完成</label>' +
//           '</div>' +
//           '</fieldset>'
//       );
//       */
//     BootstrapDialog.show({
//         title: '单据打印',
//         message: tempKindDIV,
//         buttons: [{
//             label: '确定', cssClass: 'btn-primary', action: function (dialogItself) {
//                 dialogItself.close();
//                 todo();
//             }
//         },
//             {
//                 label: '取消', action: function (dialogItself) {
//                 dialogItself.close();
//             }
//             }]
//     });
//     function todo() {
//         $.printBills(basePath + '/purchase/print/order',
//             {
//                 billsId: id,
//                 isDraftOp: $("#slideThree").is(':checked') ? false : true,
//                 tempKind: tempKindDIV.find("input[name='printTempKind']:checked").val()
//             }
//         );
//     }
// }

function print() {
	var id = $(".gridTop").toJsonObject().id;
	if (id == "")return;
	var tempKindDIV;
	if($("#slideThree").is(':checked')==false){
		type = 'nocheck';

	}else if($("#slideThree").is(':checked')){
		type = 'check';
	}
	$.printBills(basePath + '/purchase/print/order',
		{
			billsId: id,
			isDraftOp: $("#slideThree").is(':checked') ? false : true,
			tempKind: type
		}
	);
}

//新增钮点击事件
function addBtClick() {
    if (checkIsEidited()) {
        $.MsgBox('操作提示', '是否放弃保存页面', function () {
            location.href =location.href.substring(0,location.href.indexOf('?'));
        }, function () {
        });
    } else {
        location.href =location.href.substring(0,location.href.indexOf('?'));
    }
}
//清空数据
function clearAllData() {
    wResize();
    currPayreceiptDetailList = [];
    $("#topForm").data('bootstrapValidator').resetForm();
    //**清理表单（表头和表尾）
    var kong = {
        billsAmount: 0,
        billsCode: "",
        billsDate: "",
        contactsunitId: "",
        contactsunitName: "",
        createBy: "",
        id: "",
        invalidBy: "",
        lastupdateBy: "",
        managersName: "",
        managersUid: "",
        postBy: "",
        remark: "",
        sectionId: "",
        sectionName: ""
    };
    $(".gridTop").writeJson2Dom(kong);
    $("#middleForm").writeJson2Dom(kong);
    $(".gridBottom").writeJson2Dom(kong);
    $("#payrecetiptAmount").val(0);
    //一些代码
    dataGrid.clearDataGrid();
    dataGrid.addKongRow();
    dataGrid2.clearDataGrid();
    dataGrid2.addKongRow();
    pageIndex = 0;
    pageCount = 0;//新增时 设置当前页为0  以便从第一张开始查询
    Summary();
    Summary2();
    $("#yuFu").val(0);
    $("#yingFu").val(0);
    $("#yuShou").val(0);
    $("#yingShou").val(0);
    initData = getPageData();
    $.showBillsStatus("billsStautsImg", "1");
}
//打开添加状态
function openAddState() {
    currPayreceiptDetailList = [];
    try {
        $("#topForm").data('bootstrapValidator').resetForm();
    } catch (e) {

    }
    if ($("#slideThree").is(':checked')) {
        $("#slideThree").unbind("change");
        $("#slideThree").click();
        $("#slideThree").change(function () {
            onTheSwitchChange();
        });
    }
    //**清理表单（表头和表尾）
    var kong = {
        billsAmount: 0,
        billsCode: "",
        billsDate: "",
        contactsunitId: "",
        contactsunitName: "",
        createBy: "",
        id: "",
        invalidBy: "",
        lastupdateBy: "",
        managersName: "",
        managersUid: "",
        postBy: "",
        remark: "",
        sectionId: "",
        sectionName: "",
        companyName: "",
        createByName: "",
        lastupdateByName: "",
        auditorName: "",
        forceFinishName: "",
        postByName: "",
        invalidByName: ""
    };
    $(".gridTop").writeJson2Dom(kong);
    $("#middleForm").writeJson2Dom(kong);
    $(".gridBottom").writeJson2Dom(kong);
    $("#payrecetiptAmount").val(0);
    dataGrid.$grid.setGridParam({cellEdit: true});
    dataGrid2.$grid.setGridParam({cellEdit: true});
    //一些代码
    dataGrid.clearDataGrid();
    dataGrid.addKongRow();
    dataGrid2.clearDataGrid();
    dataGrid2.addKongRow();
    pageIndex = 0;
    pageCount = 0;//新增时 设置当前页为0  以便从第一张开始查询
    Summary();
    Summary2();
    $("#yuFu").val(0);
    $("#yingFu").val(0);
    $("#yuShou").val(0);
    $("#yingShou").val(0);
    //草稿单据修改
    $(".gridTop input:not(:hidden)").not('input[name="billsCode"]').prop("readonly", false);
    $(".delBt,.forceFinish").removeAttr("disabled");
    $(".delBt,.forceFinish,.copyBills").attr({"disabled": "disabled"});
    //固定不能修改的
    $(".gridTop input[name='billsCode']").prop("readonly", true);
    $(".gridTop input:not(:hidden)").not('input[name="billsCode"],input[name="remark"],input[name="billsDate"],input[name="billsDiscount"]').prop("readonly", true);
    $("#topForm :button").show();
    initData = getPageData();
    $.showBillsStatus("billsStautsImg", "1");
    $("#dataGrid").hideCol("reviewsNum");
    $("#dataGrid").hideCol("reviewsAmount");
    wResize();

    getDefaultValues()
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
//保存按钮点击事件
function saveBtClick() {
    try {
        MyEiditGrid.currEditDataGrid.unAllEdit();
    } catch (e) {
    }
    //判断经办人是否为空
    if($("input[name='managersName']").val()==""){
        $.MsgBox('提示', '经办人不能为空');
        return;
    }
    //判断数量是否为0
    var tableid = $('#dataGrid').getCol('goodsNumber');
    for(var i=0;i<tableid.length;i++){
        if(tableid[i] <= 0 ||tableid[i] == "" ){
            $.MsgBox('提示','数量不可小于或等于0');
            return;
        }
    }
    $("#topForm").data('bootstrapValidator').resetForm();
    //表单验证
    $("#topForm").data('bootstrapValidator').validate();
    if (!($('#topForm').data('bootstrapValidator').isValid())) {
        refreshValidator();
        return;
    }

    var model = getPageData();
    if (model.orderDetailList.length == 0) {
        $.MsgBox('操作提示', '明细为空');
        return;
    }
    for (var int = 0; int < model.orderDetailList.length; int++) {
        var ddetail = model.orderDetailList[int];
        delete ddetail["billsCode"]
        if (!$.notEmpty(ddetail.goodsId) || ddetail.goodsId == "0") {
            $.zxsaas_plus.showalert('提示', '第' + (int + 1) + '行商品未选择');
            return;
        }
    }

if ($("#slideThree").is(':checked')) {
    var detailList=[];
    for(var i=0;i<model.orderDetailList.length;i++){
        var detailItem=model.orderDetailList[i];
        detailList.push({
            "id": detailItem.id,
            "remark":detailItem.remark,
        })
    }
    var dataParam={
        "billsId": model.id,
        "billsType":billsType,
        "remark": model.remark,
        "detailList": detailList
    }
    orderDao.saveBillsRamark(dataParam, function (data) {
        if (data.result == 1) {
            $.zxsaas_plus.showalert('success', '单据备注保存成功');

            queryDir  = "refresh";

            queryPage();
        } else {
            $.MsgBox('出错提示', data.desc);
        }
    });
    return;
}

    function saveOrder() {
        orderDao.savePurchaseOrder(model, function (data) {
            if (data.result == 1) {
                // $.MsgBox('提示', '操作成功');
                $.zxsaas_plus.showalert("success", "保存成功");
                queryDir = "refresh";

                $("#topForm input[name='id']").val(data.data.model.id);

                queryPage();
            } else {
                $.MsgBox('出错提示', data.desc);
            }
        });
    }
    var flag=false;
    for (var int = 0; int < model.orderDetailList.length; int++) {
        if ($.parseFloat(model.orderDetailList[int].price) == 0) {
            flag = true
        }
    }
        if(flag==true){
            $.zxsaas_plus.showconfirm('提示','单据中存在价格为0的商品，是否确认保存',function () {
                saveOrder()
            },function () {
                return;
            })
        }else{
            saveOrder()
        }

}

//获取页面数据
function getPageData() {
    getAuthList(initDealDate);
    //表单
    var formObj = $(".gridTop").toJsonObject();
    delete formObj.billsStatus
    delete formObj.auditStatus
    formObj.billsDate=$("input[name='billsDate']").val()
    $.extend(formObj, $(".gridBottom").toJsonObject());
    //单据明细数据
    formObj.orderDetailList = dataGrid.getGridDataList();
    //预付款明细
    formObj.payreceiptDetailList = dataGrid2.getGridDataList();
    //验证数据，提交保存
    var footerRow = $("#dataGrid").footerData("get");
    formObj.billsAmount = $.parseFloat(footerRow.amount).toFixed(2);
    formObj.orderNum = $.parseInt(footerRow.goodsNumber);
    return formObj;
}
//删除按钮点击事件
function delBtClick() {
    $.MsgBox('删除提示', '确定要删除此订单!', function () {
        del()
    }, function () {
    });
    function del() {
        var topFormObj = $(".gridTop").toJsonObject();
        if (topFormObj.id != "") {
            var model = {};
            model.id = topFormObj.id;
            orderDao.delCgOrder(model, function (data) {
                if (data.result == 1) {
                    $.zxsaas_plus.showalert('success' ,"删除成功！");
                    setTimeout(function(){
                        location.href =location.href.substring(0,location.href.indexOf('?'));
                    },1500)
                } else {
                    $.MsgBox('出错提示', data.desc);
                }
            });
        } else {
            $.MsgBox("消息提示", "删除单据不存在!");
        }
    }
}
//审核按钮点击事件
function checkBtClick() {
    var detailList = dataGrid55.getGridDataList();

    if (detailList.length == 0) {
        $.MsgBox('审核提示', '无有效的明细数据!');
        return;
    }
    $('#checkDetailModal').modal('hide');
    var flag=false;
    for (var int = 0; int < detailList.length; int++) {
        if ($.parseFloat(detailList[int].price) == 0) {
            flag = true
        }
    }
    $.MsgBox('审核提示', '确定审核此单据!', function () {
        if(flag==true){
            $.zxsaas_plus.showconfirm('提示','单据中存在价格为0的商品，是否确认审核',function () {
                todo()
            },function () {
                return;
            })
        }else{
            todo()
        }
    }, function () {
    });

    function todo() {
        var topFormObj = $(".gridTop").toJsonObject();
        topFormObj.checkOrderDetailList = detailList;
        if (topFormObj.id != "") {
            //审核请求
            orderDao.saveCheckOrder(topFormObj, function (data) {
                if (data.result == 1) {
                    $("#topForm input[name='id']").val(data.data.billsId);

                    $("#slideThree").unbind( "change" );
                    $("#slideThree").click();

                    queryDir  = "refresh";
                    queryPage();

                    //重新绑定事件
                    $("#slideThree").on("change", function () {
                        onTheSwitchChange();
                    })

                   // $.MsgBox('提示',data.desc);
                    $.zxsaas_plus.showalert("success","审核成功");
                } else {
                    $.MsgBox('出错提示', data.desc);
                }
            });
        } else {
            $.MsgBox("消息提示", "审核单据不存在!");
        }
    }
}

//强制完成按钮点击事件FORCE_FINISH
function forceFinishBtClick() {
    if (checkIsEidited()) {
        $.MsgBox("操作提示", "当前单据未保存，继续操作前请先保存");
        return;
    }
    var topFormObj = $(".gridTop").toJsonObject();
    if (!((topFormObj.billsStatus == 2 && topFormObj.auditStatus == '0') ||(topFormObj.billsStatus == 3 && topFormObj.auditStatus == '0'))) {
        $.zxsaas_plus.showalert('提示', "只能对已审核、入库中且未稽核的单据进行强制完成!");
        return false;
    }
    var dateInputDIV = $(
        '<div class="form-horizontal"><div class="form-group">' +
        '<label for="firstname" class="col-sm-5 control-label">完成日期:</label>' +
        '<div class="col-sm-7" style="padding-left: 0px;">' +
        '<div class="input-group">' +
        '<input type="text" class="form-control" name="hcDate" readonly>' +
        '</div></div>' +
        '</div></div>'
    );
    var dateInput = dateInputDIV.find("input[name='hcDate']");
    dateInput.val($("input[name='billsDate']").val());
    dateInput.datetimepicker({
        lang: "ch",           //语言选择中文
        format: "Y-m-d",      //格式化日期
        timepicker: false,    //关闭时间选项
        todayButton: false,    //关闭选择今天按钮
        maxDate:_authList.maxDate,
        minDate:$("input[name='billsDate']").val(),
    });
    BootstrapDialog.show({
        title: '单据强制完成',
        message: dateInputDIV,
        size: BootstrapDialog.SIZE_SMALL,
        buttons: [{
            label: '确定', cssClass: 'btn-primary', action: function (dialogItself) {
                dialogItself.close();
                todo();
            }
        },
            {
                label: '取消', action: function (dialogItself) {
                dialogItself.close();
            }
            }]
    });
    function todo() {
        var topFormObj = $(".gridTop").toJsonObject();
        if (topFormObj.id != "") {
            orderDao.saveForceFinishOrder({id: topFormObj.id, forceFinishDate: dateInput.val()}, function (data) {
                if (data.result == 1) {

                    $.zxsaas_plus.showalert("success",'强制完成成功');
                    queryDir  = "refresh";

                    queryPage();
                } else {
                    $.MsgBox('出错提示', data.desc);
                }
            });
        } else {
            $.MsgBox("消息提示", "强制完成单据不存在!");
        }
    }
}


//复制单据
function copyBtClick() {
    if (checkIsEidited()) {
        $.MsgBox("操作提示", "当前单据未保存，继续操作前请先保存");
        return;
    }
    $("#topForm").data('bootstrapValidator').resetForm();
    //判断是否是正式单据状态，是则改为草稿
    if ($("#slideThree").is(':checked')) {
        $("#slideThree").unbind("change");
        $("#slideThree").click();
        $("#slideThree").change(function () {
            onTheSwitchChange();
        });
    }
    //置空不能复制的属性
    var kong = {
        billsCode: "",
        id: ""
    };
    $(".gridTop").writeJson2Dom(kong);
    currPayreceiptDetailList = [];
    $("#payrecetiptAmount").val(0.00);
    Summary();
    pageIndex = 0;
    pageCount = 0;//新增时 设置当前页为0  以便从第一张开始查询

    //草稿单据修改
    $(".gridTop input:not(:hidden)").not('input[name="billsCode"]').prop("readonly", false);
    $(".delBt,.checkBt,.forceFinish").removeAttr("disabled");

    $(".forceFinish").attr({"disabled": "disabled"});
    dataGrid.$grid.setGridParam({cellEdit: true});
    dataGrid2.$grid.setGridParam({cellEdit: true});
    $("#topForm :button").show();

    var ids = $("#dataGrid").getDataIDs();
    $.each(ids, function (i, value) {
        $("#dataGrid").jqGrid('setCell', value, "reviewsNum", '0');
        $("#dataGrid").jqGrid('setCell', value, "reviewsAmount", '0.00');
    });

    $("#dataGrid").hideCol("reviewsNum");
    $("#dataGrid").hideCol("reviewsAmount");

    $.showBillsStatus("billsStautsImg", "1");
    $.zxsaas_plus.showalert("success","单据复制成功!");

    //清空预付款金额
    openPayrecetiptDetailModal(true);
    $('#bottomForm')[0].reset()
     $("#slideThree").prop('checked',false)
     $(".rightMap img").attr('src','')
    reloadMenuBtn()
}
/*************************功能按钮事件 E******************************/
//检查页面是否有编辑过
var initData = null;
function checkIsEidited() {
    return initData == null || _.isEqual(initData, getPageData()) ? false : true;
}
//初始化UI
function initUI() {
    //多选框
    $(".js-example-basic-multiple").select2({
        //data:data,
        'width': '153px',
        placeholder: "多选", //默认提示语
        language: "zh-CN"
    });


    //草稿切换按钮
    $("#slideThree").change(function () {
        onTheSwitchChange();
    });
    $(document).on('click', '#slideThree', function () {
        $(".slideThree").toggleClass("color7D5F50");
        //  1   正式单据
        //  0   草稿单据
        if ($('#slideThree').val() == 1) {
            $('.deleteReceipts').attr('disabled', 'true');
            $('.transfer').attr('disabled', 'true');
            $('.redRush').removeAttr('disabled');
        } else {
            $('.deleteReceipts').removeAttr('disabled');
            $('.transfer').removeAttr('disabled');
            $('.redRush').attr('disabled', 'true');
        }
    })
    onTheSwitchChange();
    //初始化日期控件
    $("#billsDateBegin").val();
    $("#billsDateEnd").val();
    $("#billsDateBegin").datetimepicker({
        lang: "ch",           //语言选择中文
        format: "Y-m-d",      //格式化日期
        timepicker: false,    //关闭时间选项
        todayButton: false    //关闭选择今天按钮
    });
    $("#billsDateEnd").datetimepicker({
        lang: "ch",           //语言选择中文
        format: "Y-m-d",      //格式化日期
        timepicker: false,    //关闭时间选项
        todayButton: false    //关闭选择今天按钮
    });
    $("input[name='billsDate']").datetimepicker({
        lang: "ch",           //语言选择中文
        format: "Y-m-d",      //格式化日期
        timepicker: false,    //关闭时间选项
        todayButton: false,    //关闭选择今天按钮
        maxDate:_authList.maxDate,
        minDate:_authList.minDate,
        value:_authList.maxDate
    }).on('blur', function (ev) {
        refreshValidatorField("billsDate");//刷新验证信息
    });
}
//重置查询表单
function resetQueryForm() {
    var form = {
        billsCode: "",
        billsDateBegin:"",
        billsDateEnd:"",
        billsStatusCodeListStr: "",
        contactsunitIdListStr: "",
        goodsNameIdListStr: "",
        remark: "",
        sectionIdListStr: "",
        storageIdListStr: ""
    }
    $(".filterParamForm").writeJson2Dom(form);
    $("#billsStatusCodeListStr").val("");
    $("#contactsunitIdListStr").val("");
    $("#sectionIdListStr").val("");
    $("#storageIdListStr").val("");
    $("#goodsNameIdListStr").val("");
}
//获取查询表单数据
function getQueryData() {
    var data = $(".filterParamForm").toJsonObject();
    data.billsStatusCodeListStr = $("#billsStatusCodeListStr").select2().val() == null ? "" : $("#billsStatusCodeListStr").select2().val().join(",");
    //data.storageIdListStr = $("#storageIdListStr").select2().val()==null?"":$("#storageIdListStr").select2().val().join(",");
    return data;
}
function onTheSwitchChange() {
    try {
        if (checkIsEidited()) {
            $.MsgBox('操作提示', '当前页面数据未保存，是否放弃本次操作并打开一个新页面?', function () {
                initData = getPageData();
                todo();
            }, function () {
                $("#slideThree").unbind("change");
                $("#slideThree").click();
                $("#slideThree").change(function () {
                    onTheSwitchChange();
                });
            });
        } else {
            todo();
        }
        function todo() {
            if ($("#slideThree").is(':checked')) {
                $(".delBt,.checkBt").attr({"disabled": "disabled"});

                $(".forceFinish").removeAttr("disabled");
                $(".gridTop input:not(:hidden)").prop("readonly", true);
                //正式单据修改
                $(".gridTop input[name='remark']").prop("readonly", false);
                dataGrid.$grid.setGridParam({cellEdit: false});
                dataGrid2.$grid.setGridParam({cellEdit: false});
                $("#dataGrid").showCol("reviewsNum");
                $("#dataGrid").showCol("reviewsAmount");
                $("#topForm :button").hide();
            } else {
                if ($(".gridTop").toJsonObject().id != "") {
                    $(".gridTop input:not(:hidden)").not('input[name="billsCode"]').prop("readonly", false);
                    $(".gridTop input[name='remark']").prop("readonly", false);
                } else {
                    $(".gridTop input:not(:hidden)").not('input[name="billsCode"]').prop("readonly", false);
                }
                $(".delBt,.checkBt,.forceFinish").removeAttr("disabled");
                $(".forceFinish,.copyBills").attr({"disabled": "disabled"});
                dataGrid.$grid.setGridParam({cellEdit: true});
                dataGrid2.$grid.setGridParam({cellEdit: true});
                $("#dataGrid").hideCol("reviewsNum");
                $("#dataGrid").hideCol("reviewsAmount");
                $("#topForm :button").show();
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
function initEvents() {
    $(window).resize(wResize);//注册窗口改变事件
    wResize();
}
//窗口大小改变
function wResize() {
    var winH = $(window).height();//浏览器高度
    var centerH = winH - 450;//中部高度
    if (centerH < 350) {
        centerH = 350;
    }
    $(".gridBody").height(centerH);
    $("#dataGrid").setGridHeight(centerH);

    $("#dataGrid2").setGridHeight(centerH - 100);
    $(".referenceFrame").height(winH - 300);
}
//初始化表格
var dataGrid = null;
function initDataGrid() {
    //配置
    var paras = {
        gridId: 'dataGrid',
        addRow: {
            goodsId: '',
            goodsCode: '',
            goodsName: '',
            cxSectionId: '',
            stockNum: '',
            numControlFlag: '',
            imControlFlag: '',
            singleRebate:0,
            cxNum: '',
            cxDiscount: '',
            cxPrice: '',
            price: '',
            remark: ''
        },
        colNames: ['<i class="bitianX">*</i>商品名称','<i class="bitianX">*</i>数量', '审批量', '<i class="bitianX">*</i>单价', '总金额', '审批金额',
            '单台固返', '商品备注', '类别','商品编码','品牌','型号','颜色','商品ID', 'ID'],
        colModel: [
            {name: 'goodsName',width:'200', align: 'left', edittype: 'custom_bt_input', custom_element_bt_click: "selectReferenceOpen", editable: true},
            {name: 'goodsNumber',width:'100', align: 'right', editable: true, formatter: 'integer',
                editoptions: {
                    onkeyup: "checkInput.clearNoNum(this,10)",
                    dataEvents: [{
                        type: "focus",
                        fn: function(){
                            this.select()
                        }
                    }]
                }
            },
            {name: 'reviewsNum',width:'100', align: 'right', sortable: false, formatter: 'integer'},
            {name: 'price', width:'100', align: 'right', editable: true, editrules: {number: true}, formatter: 'number', sortable: false,
                editoptions: {
                    onkeyup: "checkInput.checkNum(this,12)",
                    dataEvents: [{
                        type: "focus",
                        fn: function(){
                            this.select()
                        }
                    }]
                }
            },
            {name: 'amount', width:'100', align: 'right', editrules: {number: true}, formatter: 'number', sortable: false},


            {name: 'reviewsAmount', hidden: false, align: 'right',  editrules: {number: true}, formatter: 'number', sortable: false},
            {name: 'singleRebate', width:'100', align: 'right', editable: true, sortable: false,
                editoptions: {
                    onkeyup: "checkInput.checkNum(this,12)",
                    dataEvents: [{
                        type: "focus",
                        fn: function(){
                            this.select()
                        }
                    }]
                }
            },
            {name: 'remark',width:'200', index: 'remark', hidden: false, editable: true, sortable: false, editoptions: {onkeyup: "checkInput.clearNoText(this,100)"}},

            {name : 'categoryName',width:'100',sortable: false},
            {name : 'code',width:'100',sortable:false},

            {name : 'brandName',width:'100',sortable: false},
            {name : 'models',width:'100',sortable: false},
            {name : 'color',width:'100',sortable: false},
             {name: 'goodsId', index: 'goodsId', hidden: true, editable: true, sortable: false},
            {name: 'id', index: 'id', hidden: true, editable: true, sortable: false}
        ],
        shrinkToFit: false,
    };
    //回调函数
    var callBackList = {
        afterEditCell: function (rowid, name, val, iRow, iCol) {//开始编辑
            lastrow = iRow;
            lastcell = iCol;
        },
        afterSaveCell: function (rowid, name, val, iRow, iCol) {//保存编辑
            //计算总价
            var currRow = $("#dataGrid").jqGrid('getRowData', rowid);
            var amount = currRow.price * currRow.goodsNumber;
            currRow.amount = amount;
            currRow.op = "OP";
            $("#dataGrid").jqGrid('setRowData', rowid, currRow);
        },
        summary: function (rowid, name, val, iRow, iCol) {//统计处理
            Summary();
        },
        getGridDataList: function (rows) {
            //筛出不合格行
            return $.map(rows, function (row) {
                if ($.notEmpty(row.goodsId, row.goodsName) && row.goodsId != "0") {
                    row.amount = $.parseFloat(row.amount).toFixed(2);
                    row.goodsNumber = $.parseInt(row.goodsNumber);
                    return row;
                }
            });
        }
    };
    dataGrid = new MyEiditGrid(paras, callBackList);
}
//商品引用
function selectReferenceOpen() {
    $('#dataGridGood').next().trigger('click')
}
//汇总统计
function Summary() {
    //汇总每一行
    var ids = $("#dataGrid").getDataIDs();
    $.each(ids, function (i, value) {
        var currRow = $("#dataGrid").jqGrid('getRowData', value);
        $("#dataGrid").jqGrid('setCell', value, "amount", currRow.price * currRow.goodsNumber);
        $("#dataGrid").jqGrid('setCell', value, "reviewsAmount", currRow.price * currRow.reviewsNum);
    });
    //汇总
    var sumGoodsNumber = $("#dataGrid").getCol('goodsNumber', false, 'sum');
    var sumReviewsNumber = $("#dataGrid").getCol('reviewsNum', false, 'sum');
    var sumAmount = $("#dataGrid").getCol('amount', false, 'sum');
    var sumReviewsAmount = $("#dataGrid").getCol('reviewsAmount', false, 'sum');
    $("#dataGrid").footerData("set", {
        index: "合计",
        goodsNumber: sumGoodsNumber,
        reviewsNum: sumReviewsNumber,
        reviewsAmount: sumReviewsAmount,
        amount: sumAmount
    });
}
/**********************表格1 开始******************************************/
//切换部门，联动查询收付款账户信息
var currPayreceiptDetailList = [];
function onSectionChange(sectionId) {
    //判断部门是否切换
    $.request({
        url: this.basePath + '/account/findSectionKsyAccount',
        type: "post",
        dataType: 'json',
        data: {'sectionId': sectionId},
        success: function (data) {
            var result = data.data;
            if (data.result != 1) {
                $('#payrecetiptDetailModal').modal('hide');
                $.MsgBox('错误提示', data.desc);
                return;
            }
            if (data.data.dataList.length == 0) {
                $('#payrecetiptDetailModal').modal('hide');
                return;
            }
            //处理表格、
            dataGrid2.$grid.jqGrid('clearGridData');
            for (var int = 0; int < data.data.dataList.length; int++) {
                if(data.data.dataList[int].status!=1&&data.data.dataList[int].status!=2){
                    var row = data.data.dataList[int];
                    row.accountType = row.accounTypeName;
                    row.accountId = row.id;
                    row.accountName = row.name;
                    getAmount(row);
                    //插入空数据的1行
                    dataGrid2.$grid.jqGrid('addRowData', MyEiditGrid.getMaxRowid(dataGrid2.$grid) + 1, row);
                }
            }
            Summary2();
            function getAmount(row) {
                if (currPayreceiptDetailList != null) {
                    for (var int2 = 0; int2 < currPayreceiptDetailList.length; int2++) {
                        if (currPayreceiptDetailList[int2].accountId == row.id) {
                            row.payreceiptAmout = currPayreceiptDetailList[int2].payreceiptAmout;
                        }
                    }
                }
            }
            initData = getPageData();//记录初始数据
        }
    });
}
//打开收付款明细录入
function openPayrecetiptDetailModal(noShowModal) {
    if ($("input[name='sectionId']").val() == "") {
        $.MsgBox("操作提示", "请选择部门");
        return;
    }
    if(noShowModal==true){
        $('#payrecetiptDetailModal').modal('hide');
    }else{
        $('#payrecetiptDetailModal').modal('show');
    }

    onSectionChange($("input[name='sectionId']").val());
    $("#dataGrid2").setGridWidth(567);
    $("#dataGrid2").closest(".ui-jqgrid-bdiv").css({"overflow-x": "hidden"});
    try {
        MyEiditGrid.currEditDataGrid.unAllEdit();
    } catch (e) {
    }
}
//初始化表格
var dataGrid2 = null;
function initDataGrid2() {
    //配置
    var paras = {
        gridId: 'dataGrid2',
        noShowOp: false,
        noShowAdd: true,
        addRow: {accountType: '', accountId: '', accountName: '', remark: ''},
        colNames: ['付款类别', '账户ID', '账户名称', '付款金额'],
        colModel: [
            {name: 'accountType', sortable: false, index: 'accountType', align: 'left', editable: false},
            {name: 'accountId', index: 'accountId', align: 'left', sortable: false, hidden: true},
            {name: 'accountName', index: 'accountName', align: 'left', editable: false, sortable: false},
            {
                name: 'payreceiptAmout',
                index: 'payreceiptAmout',
                align: 'left',
                editable: true,
                sortable: false,
                formatter: 'number',
                formatter: 'number',
                editoptions: {onkeyup: "checkInput.checkNum(this,12)"}
            }
        ]
    };
    //回调函数
    var callBackList = {
        afterEditCell: function (rowid, name, val, iRow, iCol) {//开始编辑
            if (iCol == 2) {
                $("#" + iRow + "_accountType option[value='" + val + "']").attr("selected", true);
            }
        },
        afterSaveCell: function (rowid, name, val, iRow, iCol) {//保存编辑

        },
        summary: function (rowid, name, val, iRow, iCol) {//统计处理
            Summary2();
        },
        getGridDataList: function (rows) {
            //筛出不合格行
            return $.map(rows, function (row) {
                if ($.notEmpty(row.accountType, row.payreceiptAmout, row.accountName)) {
                    delete row["accountName"];
                    row.payreceiptAmout = $.parseFloat(row.payreceiptAmout);
                    return row;
                }
            });
        }
    };
    dataGrid2 = new MyEiditGrid(paras, callBackList);
}
//点击保存明细事件
function savePayreceiptAmout() {
    try {
        MyEiditGrid.currEditDataGrid.unAllEdit();
    } catch (e) {
    }
    //汇总总金额
    var footerRow = $("#dataGrid2").footerData("get");
    $("#payrecetiptAmount").val(footerRow.payreceiptAmout);
    $('#payrecetiptDetailModal').modal('hide');
    currPayreceiptDetailList = dataGrid2.getGridDataList();

}
//汇总统计
function Summary2() {
    //名称
    var sumAmount = $("#dataGrid2").getCol('payreceiptAmout', false, 'sum');
    $("#dataGrid2").footerData("set", {index: "合计", payreceiptAmout: sumAmount});
}
/**********************表格1 结束******************************************/
/**********************表格55 开始******************************************/
//打开审核明细录入
function openCheckDetailModal() {
    if ($("#slideThree").is(':checked'))return;
    if (checkIsEidited()) {
        $.MsgBox("操作提示", "当前单据未保存，继续操作前请先保存");
        return;
    }
    //清理表格
    dataGrid55.$grid.jqGrid('clearGridData');
    //载入明细
    var rows = dataGrid.getGridDataList();
    if (rows.length == 0)return;
    for (var i = 0; i < rows.length; i++) {
        rows[i].reviewsNum = rows[i].goodsNumber;
        rows[i].reviewsAmount = rows[i].amount;
        dataGrid55.addRowData(i, rows[i]);
    }
    $('#checkDetailModal').modal('show');
    var winH = $(window).height();//浏览器高度
    var winW = $(window).width();//浏览器宽度
    $("#dataGrid55").setGridHeight(winH * 0.6);
    $("#dataGrid55").setGridWidth(winW * 0.8 - 60);
    $("#dataGrid55").closest(".ui-jqgrid-bdiv").css({"overflow-x": "hidden"});
	setTimeout(function(){
		$('#dataGrid55').resize()
    },150)

    dataGrid55.callBacks.summary()
}
//初始化表格
var dataGrid55 = null;
function initDataGrid55() {
    //配置
    var paras = {
        gridId: 'dataGrid55',
        noShowAdd: true,
        addRow: {reviewsNum: 0, reviewsAmount: 0},
        colNames: ['商品名称', '订货量', '单价', '订单总额', '<i class="bitianX">*</i>审批量', '审批总额', '单台固返', '商品备注', 'ID'],
        colModel: [
            {name: 'goodsName', sortable: false, index: 'goodsName', align: 'left', editable: false},
            {
                name: 'goodsNumber',
                index: 'goodsNumber',
                align: 'left',
                editable: false,
                sortable: false,
                formatter: 'integer'
            },
            {
                name: 'price',
                index: 'price',
                align: 'left',
                editable: false,
                editrules: {number: true},
                formatter: 'number',
                sortable: false
            },
            {
                name: 'amount',
                index: 'amount',
                align: 'left',
                editable: false,
                editrules: {number: true},
                formatter: 'number',
                sortable: false
            },
            {
                name: 'reviewsNum',
                index: 'reviewsNum',
                align: 'left',
                editable: true,
                sortable: false,
                formatter: 'integer',
                editoptions: {
                    dataEvents: [{
                        type: "focus",
                        fn: function(){
                            this.select()
                        }
                     }]
                }
            },
            {
                name: 'reviewsAmount',
                index: 'reviewsAmount',
                align: 'right',
                hidden: false,
                editable: false,
                editrules: {number: true},
                formatter: 'number',
                sortable: false
            },
            {name: 'singleRebate', index: 'singleRebate', hidden: false, editable: false, sortable: false},
            {name: 'remark', index: 'remark', hidden: false, editable: false, sortable: false},
            {name: 'id', index: 'id', hidden: true, editable: true, sortable: false}
        ]
    };
    //回调函数
    var callBackList = {
        afterEditCell: function (rowid, name, val, iRow, iCol) {//开始编辑
        },
        afterSaveCell: function (rowid, name, val, iRow, iCol) {//保存编辑
            var currRow = $("#dataGrid55").jqGrid('getRowData', rowid);
            if (name == 'reviewsNum') {
                if ($.parseInt(val) < 0) {
                    //输入数量小于现库存
                    $.MsgBox('错误提示', '审核数量不能小于0');
                    $("#" + paras.gridId).jqGrid('setCell', rowid, "reviewsNum", currRow.goodsNumber);
                }
            }
        },
        summary: function (rowid, name, val, iRow, iCol) {//统计处理
            var $grid=$("#" + paras.gridId);
            var currRow = $grid.jqGrid('getRowData', rowid);
            $grid.jqGrid('setCell', rowid, "reviewsAmount", currRow.price * currRow.reviewsNum);

            $grid.footerData('set',{"goodsName":'合计'},false);
            var sum1=$grid.getCol('goodsNumber',false,'sum');
            $grid.footerData('set',{"goodsNumber":sum1},false);
            var sum2=$grid.getCol('amount',false,'sum');
            $grid.footerData('set',{"amount":$.formatFloat(sum2,2)},false);
            var sum3=$grid.getCol('reviewsAmount',false,'sum');
            $grid.footerData('set',{"reviewsAmount":$.formatFloat(sum3,2)},false);
            var sum4=$grid.getCol('singleRebate',false,'sum');
            $grid.footerData('set',{"singleRebate":sum4},false);
            var sum5=$grid.getCol('reviewsNum',false,'sum');
            $grid.footerData('set',{"reviewsNum":sum5},false);
        },
        getGridDataList: function (rows) {
            //筛出不合格行
            return $.map(rows, function (row) {
                if ($.notEmpty(row.reviewsNum) && row.reviewsNum != "0") {
                    return row;
                }
            });
        },

    };
    dataGrid55 = new MyEiditGrid(paras, callBackList);
}

//点击保存明细事件
function saveCheckDetail() {
    try {
        MyEiditGrid.currEditDataGrid.unAllEdit();
    } catch (e) {
    }
    checkBtClick();
}
/**********************权限控制按钮******************************************/
//往来单位余额
function initWLDWamount(id) {
    var obj={
        data:{
            contactUnitId:id,
        },
        success:function (data) {
            var amount = data.data.contactUnitAmountVo;
            $("#yingFu").val(amount.shouldPayBalance.toFixed(2));
            $("#yuFu").val(amount.prePayBalance.toFixed(2));
        }
    }
    InterfaceInventory.common.getContactUnitAmountVo(obj)
}

