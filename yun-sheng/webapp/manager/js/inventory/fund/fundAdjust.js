//局部全局对象
var menuBtn = null;//菜单栏按钮组对象对象
var dataGrid = null;//表格对象
var total = 1;//总记录数
var pageIndex = 0;
var isDraft = 1;  //是否草稿单 0:否 1:是
var adjustType = "";
var invalidFlag = 0;
var billsType=79   //单据类型 79:资金调整单 ,49:预收退款单,48:预付退款单,18:付款单 ,19:收款单,20:预付款单,21:预收款单,32:供应商返利单,33:客户保价单,34:客户返利单

var adjustTypeflag = -1; //差额标识 0:差额负数(收入)1:差额正数（支出）
var isRedOrder = 0;  //是否是红冲单
var isCopyOrder = 0;  //是否可以复制
var options = {
    TableName: "#dataGrid", //显示表格名称。遵照css选择器书写
    findInpayClass: "/manager/inventory/retail/reconciliation/accountRecon/getInpayClass"
};

var lastrow = "", lastcell = "";
//初始化表格
var dataGrid = null;
$(function () {
    $('#billsBeginDateStr').datePlu({
        ajaxOpt: {
            async: false,
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
            $("input[name='managerUname']").val("");

            dataGrid.clearDataGrid()  ;
            dataGrid.addKongRow();
        }
    });
    //载入 经手人
    $("#managerUname").comModalsEmployeeBySection({
        sectionIds:'input[name="sectionId"]',
        search: false,
        clickback:function(){
            var obj= $("input[name='managerUname']");
            //设置编辑器值
            $("input[name='managerUname']").val(obj.val());
            $("input[name='managerId']").val(obj.data('id'));
        }
    });


    $("#adjustType").on("change", function () {
        footerData();
        loadInPayClass();
    });
    //保存红冲按钮
    $(".redSave").on("click", function () {
        var param = {
            billsId: $(".redSave").data('id'),
            redDate: $(".redTime").val()
        };

        $.request({
            url: "/manager/inventory/fund/adjust/excuteRed",
            type: 'POST',
            dataType: "json",
            data: param,
            success: function (data) {
                if (data.result == 1) {
                    $.zxsaas_plus.showalert("success", data.desc || "红冲成功");
                    var id = $("#billsHeaderForm input[name='id']").val();
                    pageAjax({
                        billsId: id
                    });
                    $('#redModal').modal('hide');
                } else {
                    $.zxsaas_plus.showalert("提示", data.desc);
                    $('#redModal').modal('show');
                }
            }
        });
    });
    initMenuBtn();
    loadSearch();
    isBillslogShow();
    initDataGrid();
    /*是否是：跳转单据*/
    var billsId = $.trim(functionObjExtent.getQueryString('billsId'))
    if (billsId != '') {
        var billsCode = $.trim(functionObjExtent.getQueryString('billsCode'))
        var copyFlag = $.trim(functionObjExtent.getQueryString('copyFlag'))
        //单据编号
        if (billsCode != "") {
            isDraft = 0;
            pageAjax({'billsId': billsId}, function () {
                //复制一单
                if (copyFlag == 1) {
                    copy();

                }
            })
        } else {
            isDraft = 1;
            pageAjax({'billsId': billsId})
        }

    } else {
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
            $('input[name="managerUname"]').val(data.data.defaultEmployee.name).data('id',data.data.defaultEmployee.employeeId)
            $('input[name="managerId"]').val(data.data.defaultEmployee.employeeId)
        }
    }
    InterfaceInventory.common.getDefaultValues(obj);
}

//载入类别
function loadInPayClass(callback) {
    var adjustType = $("#adjustType").val();
    //资金增加
    if (adjustType == "ZJZJ") {
        adjustTypeflag =-2;
        initAccountName(callback);

    }
    //资金减少
    else if (adjustType == "ZJJS") {
        adjustTypeflag = -3;
        initAccountName(callback);
    }
}

function reloadInit() {
    reloadMenuBtn();
    loadSearch();
    isBillslogShow();
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
                    var data = getSaveParams()
                    if (checkSaveParam(data) == true) {
                        return
                    }
                    $.ajaxPackage({
                        contentType: 'application/json',
                        url: '/manager/inventory/fund/adjust/saveAdjust',
                        data: JSON.stringify(data),
                        success: function (data) {
                            $.zxsaas_plus.showalert('success', data.desc || "保存成功！");
                            var billsId = data.data.billsId;
                            isDraft = 1;
                            pageAjax({'billsId': billsId})
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
                    var params = $("#billsHeaderForm").toJsonObject();
                    var billsId = $.trim(params.id)
                    if (params.billsCode != "") {
                        $.zxsaas_plus.showalert('提示', '只能过账草稿单!');
                    } else {
                        $.ajaxPackage({
                            type: 'get',
                            url: '/manager/inventory/fund/adjust/excutePost',
                            data: {billsId: billsId},
                            success: function (data) {
                                isDraft = 0;
                                pageAjax({'billsId': data.data.billsId});
                                $.zxsaas_plus.showalert('success', data.desc || "过账成功");
                            }
                        })
                    }
                }

            },
            print: {
                isShow: false,
                click: function () {
                    dayin($("#billsHeaderForm input[name='id']").val())
                }
            },
            red: {
                isShow: false,
                click: function () {
                    redChong();
                }
            },
            copy: {
                isShow: false,
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
                isShow: false,
                click: function () {
                    updateAndPost();
                }
            }
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
    //判断是否禁用
    if(isDraft == false){
        if(isRedOrder==1){
            menuBtn.setDisabledbtn("red");
        }else{
            menuBtn.setUndisabledbtn("red");
        }
    }
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
        $.ajaxPackage({
            url: "/manager/inventory/fund/adjust/getBillsLog",
            data: {
                billsId: $searchFormID.find("input[name='id']").val()
            },
            success: function (data) {
                new logMes("#billslog", {
                    list: data.data.billsLogList
                });
            }
        });

    }
}
//进来新增页面，初始化操作员所在部门的资金账户
function initAccountName(callback) {
    $('#inpayClassName').comModalsInpayClass({
        type:adjustTypeflag,
        clickback:function () {
            var obj= $("input[name='inpayClassName']");
            //设置编辑器值
            $("input[name='inpayClassName']").val(obj.val());
            $("input[name='inpayClassId']").val(obj.data('id'));
        }
    });
}
//拼接收付款类别
// function appendInPayClass(payClassList) {
//     $("#inpayClassIdWrap").show();
//     $("#inpayClassId").html("");
//     if (payClassList.length > 0) {
//         $("#inpayClassId").append("<option value=''>请选择</option>");
//         for (var i = 0; i < payClassList.length; i++) {
//             if (payClassList[i].name != '商品销售收入' && payClassList[i].name != '商品销售成本') {
//                 $("#inpayClassId").append("<option value='" + payClassList[i].id + "'>" + payClassList[i].name + "</option>");
//             }
//         }
//     }
// }
//首单
function firstPage() {
    var param = {};
    param.queryCodeStr = "F";
    pageAjax(param);
}
//上一单按钮单击事件
function backPage() {
    var id = $("#billsHeaderForm input[name='id']").val();
    pageAjax({
        queryCodeStr: "P",
        refBillsId: id
    });
}

//下一单按钮单击事件
function nextPage() {
    var id = $("#billsHeaderForm input[name='id']").val();
    pageAjax({
        queryCodeStr: "N",
        refBillsId: id
    });
}

//末单按钮单击事件
function lastPage() {
    var param = {};
    param.queryCodeStr = "L";
    pageAjax(param);
}

//新增按钮单击事件
function add() {
    // 新增状态下，是否有用户操作过。
    if (isDraft == true && ($("#sectionName").val().length > 0 || $('#inpayClassName').val().length > 0 || $("#managerUname").val().length > 0)) {
        $.zxsaas_plus.showconfirm("提示", "新开单将清空当前页面数据，是否继续？", clearAndAdd);
    } else {
        clearAndAdd();
    }
}
//红冲
function redChong() {

    var id = $("#billsHeaderForm input[name='id']").val();
    var billsDateStr = $("#billsHeaderForm input[name='billsCode']").val();
    if (id == "") {
        $.zxsaas_plus.showalert("提示", "单据不存在");
        return
    }
    $(".redSave").data('id', id);

    codeDate(billsDateStr, false);
    $('#redModal').modal('show');
}

function codeDate(obj, flag) {
    var t = obj.split('-')[0];
    var reg = /[A-Z]/g;
    t = t.replace(reg, "");
    t = t.replace(t.substr(0, 4), t.substr(0, 4) + '-');
    t = t.replace(t.substr(0, 7), t.substr(0, 7) + '-');
    getAuthList(function () {
		var min = CompareDate(_authList.minDate, t)?_authList.minDate:t;
		if (flag == true) {
			$('.exitTime').datePlu({
				endDate: false,
				minTime: min,
				defaultTime: min
			})
		} else {
			$('.redTime').datePlu({
				endDate: false,
				minTime: min,
				defaultTime: min
			})
		}
	})

}

function clearAndAdd() {
    location.href = basePath + '/inventory/fund/adjust/main';
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
    //显示表格删除按钮
    $("#dataGrid").setGridParam().showCol("op");

    dataGrid.addKongRow();
    dataGrid.$grid.delRowData(MyEiditGrid.getMaxRowid(dataGrid.$grid));
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
    }
    else if (billsHeader.billsStatus == "7") {
        $('.rightMap img').attr('src', '/manager/images/status/statusRed.png');
        isRedOrder = 1;
    }
    else {
        $('.rightMap img').removeAttr("src");
    }
    //summery 为1是系统自动生成的 不能红冲
    if (billsHeader.summary == 1) {
        isRedOrder = 1;
    }
    billsHeader.billsCode = billsHeader.billsCode === null ? '' : billsHeader.billsCode;
    //billsCode（包含R） 是否为红冲单 ，  为红冲单不能复制
    if (billsHeader.billsCode.indexOf("R") > -1) {
        isCopyOrder = 1;
    }
    $("#billsHeaderForm").writeJson2Dom(billsHeader);
    $("#sectionName").data("sectionId", billsHeader.sectionId);
    $("#managerUname").data("employeeId", billsHeader.managerId);
    $("#managerUname").val(billsHeader.managerName);
    loadInPayClass(function () {
        $("#inpayClassName").data("inpayClassId", billsHeader.inpayClassId);
        $("#inpayClassName").val(billsHeader.inpayClassName);
    });
    $("#bottomForm").writeJson2Dom(billsHeader);
    loadBeforeAdjustAmount()
}

//获取保存参数
function getSaveParams() {
    $(options.TableName).jqGrid("saveCell", lastrow, lastcell);
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
        id: params.id,
        sectionId: $("#sectionName").data("sectionId"),
        adjustType: params.adjustType,
        inpayClassId: params.inpayClassId,
        billsDateStr: $("#billsBeginDateStr").val(),
        managerId: params.managerId,
        remark: params.remark,
        detailList: detailList,
    };
}

//分页查询付款明细参数
function getSelectPageParam() {
    var param = {};
    param.id = "";
    param.billsCode = billsCode;
    $.extend(param, $("#filterSearchForm").toJsonObject());
    param.contactUnitName = param.contactUnitName2;
    delete param.contactUnitName2;
    return param;
}


//上一单，下一单,首单，末单分页查询ajax请求
function pageAjax(param, callbackObj) {
    param.billsType=''
    var locaParam = {
        isDraft: isDraft,

    }
    var exParam = $.extend(false, locaParam, param);
    $.request({
        url: "/manager/inventory/fund/adjust/searchFundAdjustDetail",
        type: 'POST',
        dataType: "json",
        /* contentType: 'application/json',*/
        async: false,
        data: exParam,
        success: function (data) {
            if (data.result == 1) {
                var mainVo = data.data.mainVo;
                if (data.data.mainVo != null) {
                    $("#dataGrid").jqGrid("clearGridData");
                    var detailList = mainVo.detailList;
                    if (detailList.length > 0) {
                        for (var i = 0; i < detailList.length; i++) {
                            $("#dataGrid").jqGrid('addRowData', i + 1, detailList[i], 'last');
                        }
                    }
                    fillTopData(mainVo);
                    footerData();
                    reloadInit();
                    if(isDraft){
                        allowEdit()
                        $("#dataGrid").setGridParam().showCol("beforeAdjustAmount").showCol("AfterAdjustAmount");
                    }else{
                        forbiddenEdit();
                        $("#dataGrid").setGridParam().hideCol("beforeAdjustAmount").hideCol("AfterAdjustAmount");
                    }
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

//打印
function dayin(id, title) {
    $.zxsaas_plus.showconfirm("提示", title || "确定打印此单据？", function () {
        todo();
    }, function () {

    });
    function todo() {
        $.printBills('/manager/inventory/fund/adjust/printAdjust',
            {
                billsId: id
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
    var id = $searchFormID.find("input[name='id']").val();
    var obj = {
        data: {
            id: id,
            remark: $searchFormID.find("input[name='remark']").val(),
            detailList: detailList
        },
        success: function (data) {
            pageAjax({
                billsId: id
            });
        }
    };
    $.ajaxPackage({
        url: "/manager/inventory/fund/adjust/updateAdjust",
        data: JSON.stringify(obj.data),
        contentType: "application/json",
        success: function (data) {
            if (obj) {
                setTimeout(function () {
                    $.zxsaas_plus.showalert("success", "修改成功");
                }, 0);
                obj.success(data);
            }
        }
    });
}
//校验保存参数
function checkSaveParam(params) {
    var flag = false;
    if ($("#billsCode").val() != "") {
        $.zxsaas_plus.showalert("提示", "该单据已保存!");//该单据已保存过账
        flag = true;
        return flag;
    }
    //校验收付款类别
    if (params.inpayClassId == "") {
        var text = "收入类别";
        if (adjustTypeflag == -3) {
            text = "支出类别";
        }
        $.zxsaas_plus.showalert("提示", "请选择" + text);
        flag = true;
        return flag;
    }

    //校验调整类型
    if (params.adjustType == "") {
        $.zxsaas_plus.showalert("提示", "请选择调整类型!");
        flag = true;
        return flag;
    }
    //判断单据总金额不能为0
    var amount = $(options.TableName).getCol('amount', false, 'sum');
    if (amount <= 0) {
        $.zxsaas_plus.showalert("提示", "调整金额大于0!");
        flag = true;
        return flag;
    }
}
//复制按钮单击事件(有单据编号才让复制，复制一模一样的数据，单据编号清空，无单据编号不让复制)
function copy() {
    isDraft = 1;
    $("#billsCode").val("");
    var id = $("#billsHeaderForm input[name='id']").val("");
    $("#dataGrid").setGridParam().showCol("beforeAdjustAmount").showCol("AfterAdjustAmount").trigger("reloadGrid").resize();
    reloadInit();
    $('.rightMap img').removeAttr("src");
    $("#bottomForm")[0].reset();
    allowEdit();
    dataGrid.addKongRow()
    dataGrid.$grid.delRowData(MyEiditGrid.getMaxRowid(dataGrid.$grid));
}
//新加行
function loadKongRow() {
    dataGrid.addKongRow();
}
function cellOnBlur() {
    $(options.TableName).jqGrid("saveCell", lastrow, lastcell);
    footerData();
}
function initDataGrid() {
    //配置
    var paras = {
        gridId: 'dataGrid',
        addRow: {
            accountId: '', accountName: '', accountType: '', accountTypeName: '',
            beforeAdjustAmount: '', amount: '', AfterAdjustAmount: ''
        },
        colNames: ['id', 'accountId', '账户名称', '账户类型ID', '账户类型', '调整前金额', '调整金额', '调整后金额', '备注'],
        colModel: [
            {name: 'id', hidden: true, sortable: false},
            {name: 'accountId', index: 'accountId', width: 150, align: 'center', hidden: true, sortable: false},
            {
                name: 'accountName',
                index: 'accountName',
                width: '200px',
                align: 'left',
                sorttype: 'integer',
                edittype: 'custom_bt_input',
                custom_element_bt_click: "selectAccountReferenceOpen",
                editable: true,
            },
            {
                name: 'accountType',
                hidden: true,
                sorttype: 'string',
                sortable: false,
            },
            {
                name: 'accountTypeName',
                index: 'accountTypeName',
                width: '200px',
                align: 'left',
                sortable: false,
            },
            {
                name: 'beforeAdjustAmount',
                index: 'beforeAdjustAmount',
                sorttype: 'Long',
                formatter: "number",
                width: '100px',
                align: 'right',
                sortable: false
            },
            {
                name: 'amount',
                index: 'amount',
                sorttype: 'Long',
                formatter: "number",
                width: '100px',
                align: 'right',
                sortable: false,
                editoptions: {readonly: false, onkeyup: "checkInput.checkNum(this,12);",
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
                },
                editable: true
            },
            {
                name: 'AfterAdjustAmount',
                index: 'AfterAdjustAmount',
                sorttype: 'Long',
                formatter: "number",
                width: '100px',
                align: 'right',
                sortable: false

            },
            {
                name: 'remark',
                index: 'remark',
                width: '200px',
                align: 'left',
                sorttype: 'string',
                editable: true,
                editoptions: {readonly: false, onblur: "cellOnBlur()", onkeyup: "checkInput.clearNoText(this,100)"},
                sortable: false
            },
        ],
        shrinkToFit: false,
    };
    //回调函数
    var callBackList = {
        onCellSelect: function (rowid, iCol, cellcontent, e) {
            var describedby = $(e.target).attr("aria-describedby");
            if (describedby.indexOf("_amount") >= 0 && isDraft) {
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
    initTabAccountName()
}
//页脚合计
function footerData() {
    //汇总每一行
    var ids = $(options.TableName).getDataIDs();
    var adjustType = $("#adjustType").val();
    //增加
    if (adjustType == "ZJZJ") {
        $.each(ids, function (i, value) {
            var currRow = $(options.TableName).jqGrid('getRowData', value);
            $(options.TableName).jqGrid('setCell', value, "AfterAdjustAmount", Number(currRow.beforeAdjustAmount) + Number(currRow.amount));
        });
    }
    //减少
    else if (adjustType == "ZJJS") {
        $.each(ids, function (i, value) {
            var currRow = $(options.TableName).jqGrid('getRowData', value);
            $(options.TableName).jqGrid('setCell', value, "AfterAdjustAmount", Number(currRow.beforeAdjustAmount) - Number(currRow.amount));
        });
    }


    var beforeAdjustAmount = $(options.TableName).getCol('beforeAdjustAmount', false, 'sum');
    var amount = $(options.TableName).getCol('amount', false, 'sum');
    var AfterAdjustAmount = $(options.TableName).getCol('AfterAdjustAmount', false, 'sum');
    $(options.TableName).jqGrid('footerData', 'set', {
        "rn": "合计",
        "beforeAdjustAmount": beforeAdjustAmount,
        "amount": amount,
        "AfterAdjustAmount": AfterAdjustAmount
    });


}


