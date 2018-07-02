var imeiInputObj = null;//串号录入（对象）
//初始化表格
var dataGrid = null;
var lastrow = null, lastcell = null;
var billsType = 2   //1:采购订单 2:采购入库单 3:采购换货单 4:采购退货单
$(function () {
    init()

    //初始化
    function init() {
        initDataGrid();//初始化表格
        initDataGrid2();//初始化金额明细录入
        initEvents();//初始化事件
        initEvent()
        billId = billId || functionObjExtent.getQueryString('billsId')
        //这里入口过多，这里进行适配。（优先读取后台注入的值）
        billsCode = billsCode || functionObjExtent.getQueryString('billsCode')
        //	是否从报表进入
        if (billId != '' || billsCode != '') {
            var copyFlag = functionObjExtent.getQueryString('copyFlag')
            var checkFlag = functionObjExtent.getQueryString('checkFlag')
            queryPage(function () {
                //复制一单
                if (copyFlag == 1) {
                    copyBtClick()
                } else {
                    //审核一单
                    if (checkFlag == 1) {
                        openCheckDetailModal()
                    }
                }
            });
        } else {
            openAddState();
        }
    }

//输入框得到焦点时
    $(".discountAmount").on('focus', function () {
        this.select()
    })

    //初始化事件
    function initEvent() {
        initTopForm()
        initTable()
        initMenuBtn()
        getAuthList();
    }

    //载入菜单组件
    function initMenuBtn() {
        var isDraftOp = !$("#slideThree").is(':checked')
        var option = {
            btnGroupLeft: {
                add: {
                    isShow: true,
                    click: function () {
                        location.href = location.href.substring(0, location.href.indexOf('?'));
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
                draftPost: {
                    isShow: isDraftOp,
                    click: function () {
                        checkBtClick()
                    }
                },
                red: {
                    isShow: !isDraftOp,
                    click: function () {
                        forceFinishBtClick()
                    }
                },

                printDropdown: {
                    isShow: !isDraftOp,
                    list: [{
                        name: '商品汇总',
                        click: function () {
                            print('noimei')
                        }
                    }, {
                        name: '商品明细',
                        click: function () {
                            print('showimei')
                        }
                    }]
                },
                copy: {
                    isShow: !isDraftOp,
                    click: function () {
                        copyBtClick()
                    }
                },
                audit: {
                    isShow: !isDraftOp,
                    click: function () {
                        var topFormObj = $(".gridTop").toJsonObject();
                        $.ajaxPackage({
                            url: '/manager/inventory/purchase/updateAuditStatus',
                            data: {
                                'billsType': billsType,
                                'billsId': topFormObj.id,
                                'auditStatus': 1,
                            },
                            success: function (data) {
                                $.zxsaas_plus.showalert('success', "稽核成功");
                                queryPage();
                            }
                        })
                    }
                },
                auditCancle: {
                    isShow: !isDraftOp,
                    click: function () {
                        var topFormObj = $(".gridTop").toJsonObject();
                        $.ajaxPackage({
                            url: '/manager/inventory/purchase/updateAuditStatus',
                            data: {
                                'billsType': billsType,
                                'billsId': topFormObj.id,
                                'auditStatus': 0,
                            },
                            success: function (data) {
                                $.zxsaas_plus.showalert('success', "取消稽核成功");
                                queryPage();
                            }
                        })
                    }
                },
                update: {
                    isShow: !isDraftOp,
                    click: function () {
                        saveBtClick()
                    }
                },
                orderImport: {
                    isShow: isDraftOp,
                    click: function () {
                        orderReferenceBtClick()
                    }
                },
                printImeiDropdown: {
                    isShow: !isDraftOp,
                    name: '打印串号标签',
                    list: [{
                        name: '打印本单串号',
                        click: function () {
                            var ids = dataGrid.$grid.jqGrid('getDataIDs');
                            var selArr = getImieData(ids);
                            printSelImei(selArr, 'all');
                        }
                    }, {
                        name: '打印所选商品串号',
                        click: function () {
                            //获取多选到的id集合
                            var ids = dataGrid.$grid.jqGrid('getGridParam', 'selarrrow');
                            if (ids == "dataGrid_addRowId" || ids == "") {
                                $.zxsaas_plus.showalert("提示", '请先选中指定商品!');
                                return;
                            }
                            var selArr = getImieData(ids);
                            printSelImei(selArr);
                        }
                    }]
                }
            },
            btnGroupRight: {
                history: {
                    isShow: true,
                    click: function () {
                        window.parent.openWorkBoxByMenutext("采购入库单单据列表", '/manager/inventory/purchase/historyMain?billsType=' + billsType, true);
                    }
                }
            }
        };
        menuBtn = new componentMenuBtn("#MenuTool", option);

        function getImieData(ids) {
            var selArr = [];
            //遍历访问这个集合
            $(ids).each(function (index, id) {
                //由id获得对应数据行
                var row = dataGrid.$grid.jqGrid('getRowData', id);
                if ($.trim(row.imeiList) != "") {
                    var imeiList = JSON.parse(row.imeiList);
                    imeiList.goodsId = row.goodsId
                    selArr.push(imeiList);
                }
            })
            return selArr;
        }

        //打印选择的商品的串号
        function printSelImei(imeiList, state) {
            var imeiReg = /^(YS)[\d]{12}$/;
            var goodsImei = [];
            for (var i = 0; i < imeiList.length; i++) {
                var imeiArr = imeiList[i] || [];
                for (var j = 0; j < imeiArr.length; j++) {
                    var imeiItem = imeiArr[j] || {};
                    if (imeiReg.test(imeiItem.imei) && $.trim(imeiItem.auxiliaryImei) == "") {
                        goodsImei.push({
                            goodsId: imeiArr.goodsId,
                            imei: imeiItem.imei
                        });
                    }
                }
            }
            var goodsIdStr = "";
            for (var i = 0; i < goodsImei.length; i++) {
                var goodsImeiItem = goodsImei[i];
                var goodsId = goodsImeiItem.goodsId;
                if (goodsIdStr.indexOf(goodsId) < 0) {
                    goodsIdStr += goodsId + ','
                }
            }
            if (goodsIdStr == "") {
                if (state == 'all') {
                    $.zxsaas_plus.showalert("提示", '本单暂无自动生成串号类的商品!');
                } else {
                    $.zxsaas_plus.showalert("提示", '所选商品串号不是系统自动生成，无法打印!');
                }
                return;
            }
            goodsIdStr = goodsIdStr.substr(0, goodsIdStr.length - 1)
            $.request({
                url: "/manager/component/imei/getGoodsRetailPrice",
                type: 'POST',
                dataType: "json",
                async: false,
                data: {goodsIds: goodsIdStr},
                success: function (data) {
                    if (data.result == 1) {
                        var detailList = data.data.goodsVoList;
                        for (var i = 0; i < goodsImei.length; i++) {
                            var goodsItem = goodsImei[i];
                            for (var j = 0; j < detailList.length; j++) {
                                var detailItem = detailList[j];
                                if (goodsItem.goodsId == detailItem.goodsId) {
                                    goodsItem.goodName = detailItem.name;
                                    goodsItem.retailPrice = $.formatFloat(detailItem.retailPrice, 2);
                                }
                            }
                        }
                        try {
                            prn1_print(goodsImei);
                        }
                        catch (e) {
                        }

                    } else {
                        $.MsgBox('错误提示', data.desc);
                    }
                }
            });
        }
    }

    // 初始化 顶部表单
    function initTopForm() {
        //单据日期
        $('input[name="billsDateStr"]').datePlu({
            ajaxOpt: {
                async: false,
            },
            endDate: false,
        });
        //部门
        $("#topForm input[name='sectionName']").storePlu({
            isStoreShow: false,
            isLoadDefaultName: 0,
            checkMore: false,
            search: false,
            ifStore: false, // 控制部门选项
            changeStore: function () {
                var id = $("#topForm input[name='sectionName']").data('sectionId');
                //设置编辑器值
                $("input[name='sectionId']").val(id);
                $("input[name='managerId']").val("");
                $("input[name='managerName']").val("");
                $('#payReceiveAmount').val(0);
                dataGrid2.$grid.jqGrid('clearGridData');
                currPayreceiptDetailList = [];
                onSectionChange(id)
                InterfaceInventory.common.getDefaultStorgeList({
                    data: {sectionId: id},
                    success: function (data) {
                        var storageList = data.data.storageList || []
                        var storageItem = storageList[0] || {}
                        var ids = dataGrid.$grid.getDataIDs();
                        $.each(ids, function (i, rowid) {
                            dataGrid.$grid.jqGrid('setCell', rowid, "storageName", storageItem.name);
                            dataGrid.$grid.jqGrid('setCell', rowid, "storageId", storageItem.storageId);
                        })
                    }
                })
            }
        });
        //经办人
        $("#topForm input[name='managerName']").comModalsEmployeeBySection({
            sectionIds: 'input[name="sectionId"]',
            clickback: function () {
                var obj = $("#topForm input[name='managerName']");
                //设置编辑器值
                $("input[name='managerName']").val(obj.val());
                $("input[name='managerId']").val(obj.data('id'));
            }
        })
        //往来单位
        $("#topForm input[name='contactUnitName']").comModalsContactUnit({
            clickback: function () {
                var obj = $("#topForm input[name='contactUnitName']");
                //设置编辑器值
                $("input[name='contactUnitName']").val(obj.val());
                $("input[name='contactUnitId']").val(obj.data('id'));
                //切换往来单位余额
                initWLDWamount(obj.data('id'));
                var ids = $('#dataGrid').getDataIDs();
                var goodsIdList = []
                $.each(ids, function (i, keyId) {
                    var rowData = $('#dataGrid').getRowData(keyId);
                    if (rowData.goodsId != '') {
                        goodsIdList.push(rowData.goodsId)
                    }
                })
                getPrice(goodsIdList, 1)
            }
        })
    }

    // 初始化表格
    function initTable() {
        // 仓库
        $("#dataGridStorageName").comModalsStorage({
            treeParams: {
                sectionIsStore: 0
            },
            clickback: function () {
                var $Obj = $("#dataGridStorageName");
                var selrow = $("#dataGrid").jqGrid('getGridParam', 'selrow');
                //设置编辑器值
                $("#dataGrid input[name='storageName']").val($Obj.val());
                $("#dataGrid").jqGrid('setCell', selrow, "storageId", $Obj.data('id'));
                $Obj.data('id', '').val('')
            }
        })
        //商品名称
        $("#dataGridGood").comModalsAllGoods({
            inStockMethod: 1,
            clickback: function (goodsList) {
                if (goodsList.length > 0) {
                    addGood(goodsList)
                    var goodsIdList = []
                    for (var i = 0; i < goodsList.length; i++) {
                        goodsIdList.push(goodsList[i].dataId)
                    }

                    getPrice(goodsIdList)
                }
                $("#dataGridGood").removeData();
            }
        })
        //串号模态框
        imeiInputObj = new comImeiInputModal();

        //添加商品
        function addGood(goodsList) {
            $("#dataGrid").jqGrid('saveCell', lastrow, lastcell);
            var selRowId = $("#dataGrid").jqGrid('getGridParam', 'selrow');
            var selRowData = $("#dataGrid").jqGrid('getRowData', selRowId)
            var cIndex;
            for (var i = 0; i < goodsList.length; i++) {
                var goods = goodsList[i];
                var dataRow = {
                    'discountRate': 100,
                    'taxRate': goods.taxRate,
                    'ifManageImei': goods.ifManageImei,
                    'imeiList': " ",
                    'orderDetailId': " ",
                    'goodsNumber': 0,
                    'code': goods.code,
                    'categoryName': goods.categoryName,
                    'brandName': goods.brandName,
                    'models': goods.models,
                    'color': goods.color,
                    'goodsId': goods.dataId,
                    'goodsName': goods.name,
                    'ifEnableAuxiliaryImei': goods.ifEnableAuxiliaryImei,
                    'imeiLength': goods.imeiLength,
                    'auxiliaryImeiLength': goods.auxiliaryImeiLength,
                    'storageId': selRowData.storageId,
                    'storageName': selRowData.storageName,
                };

                if (i == 0) {
                    $("#dataGrid").jqGrid('setRowData', selRowId, dataRow, {});
                    cIndex = selRowId;
                } else {
                    cIndex = MyEiditGrid.getMaxRowid(dataGrid.$grid) + 1;
                    dataGrid.$grid.jqGrid('addRowData', cIndex, dataRow);
                }
                //是否 为 串号商品
                if (goods.ifManageImei == '1') {
                    $("#dataGrid").jqGrid('setCell', cIndex, "goodsNumber", 0, 'ifManageImeiIcon');
                } else {
                    //jqgrid 找不到移除 calss 的方法。这里只能外界操作dom 的方式
                    $("#dataGrid #" + cIndex + " td[aria-describedby='dataGrid_goodsNumber']").removeClass('ifManageImeiIcon')
                }
            }
            dataGrid.$grid.delRowData('dataGrid_addRowId');
            dataGrid.addKongRow();
            dataGrid.$grid.delRowData(MyEiditGrid.getMaxRowid(dataGrid.$grid));
            Summary();
        }

    }

    //获取价格
    function getPrice(goodsIdList, isPrompt) {
        var contactUnitId = $.trim($("input[name='contactUnitId']").val())
        var sectionId = $.trim($("input[name='sectionId']").val())
        var goodsId = goodsIdList.join(',')
        var updatePrice = function (priceList) {
            var ids = $('#dataGrid').getDataIDs();
            $.each(ids, function (i, keyId) {
                var rowData = $('#dataGrid').getRowData(keyId);
                for (var j = 0; j < priceList.length; j++) {
                    var priceItem = priceList[j];
                    if (rowData.goodsId == priceItem.goodsId && rowData.giftFlag == '否') {
                        $('#dataGrid').jqGrid('setCell', keyId, "price", priceItem.price);
                    }
                }
            })
            Summary()
        }
        if (sectionId != '' && contactUnitId != '' && goodsId.length > 0) {
            InterfaceInventory.common.getPurchaseGoodsPrice({
                data: {
                    'sectionId': sectionId,
                    'contactUnitId': contactUnitId,
                    'goodsId': goodsId
                },
                success: function (data) {
                    var priceList = data.data.dataList;
                    $("#dataGrid").jqGrid('saveCell', lastrow, lastcell);
                    if (data.data.updateFlag === true) {
                        if (isPrompt == 1) {
                            $.MsgBox("操作提示", "已成功切换往来单位，您需要更新采购单价吗？", function () {
                                updatePrice(priceList)
                            }, function () {
                            });
                        } else {
                            updatePrice(priceList)
                        }
                    }

                }
            })
        }
    }
});

//重载菜单组件
function reloadMenuBtn() {
    var isDraftOp = !$("#slideThree").is(':checked')
    var updateKey = ['printDropdown', 'printImeiDropdown', 'print', 'red', 'copy', 'update', 'audit', 'auditCancle'];
    var addkey = ['draftPost', 'draftDel', 'draftSave', 'orderImport'];
    var params = $("#topForm").toJsonObject();
    var billsStatus = $.trim(params.billsStatus)
    var isAudit = $.trim(params.auditStatus)
    $.pageDetailCommon.reloadMenuTool({
        isDraftOp: isDraftOp,
        isAudit: isAudit,
        billsStatus: billsStatus,
        menuBtn: menuBtn,
        billsCode: params.billsCode,
        updateKey: updateKey,
        addkey: addkey,
    })
}

//打开仓库引用对话框
function selectStorageReferenceOpen(cellInfo) {
    $('#dataGridStorageName').next(".showModalBtn").trigger('click')
}

//获取往来单位余额等信息
function getContactAmountByID(contactUnitId) {
    $.request({
        url: "/manager/TcontactUnit/findContactUnitAmount",
        type: 'GET',
        dataType: "json",
        data: {"id": contactUnitId},

        success: function (data) {
            if (data.result == 1) {
                $("#yingFu").val(data.data.amount.yingFu);
                $("#yuFu").val(data.data.amount.yuFu);
            }
        }
    });
}

//打印
function print(type) {
    var id = $(".gridTop").toJsonObject().id;
    if (id == "") return;

    var templateURL = '/manager/inventory/purchase/delivery/print';
    var paras = {
        billsId: id,
        isDraftOp: $("#slideThree").is(':checked') ? false : true,
        printType: type
    };
    $.printBills(templateURL, paras)
}

//打印单据
// function print() {
//     var id = $(".gridTop").toJsonObject().id;
//     if (id == "") return;
//
//     var tempKindDIV = $(
//         '<fieldset class="fieLeft" id="form3">' +
//         '<legend>打印模板类型</legend>' +
//         '<div class="">' +
//         '<label class="radio-inline"><input type="radio" name="printTempKind" value="showimei" checked>商品明细</label>' +
//         '<label class="radio-inline"><input type="radio" name="printTempKind" value="noimei">商品汇总</label>' +
//         '</div>' +
//         '</fieldset>'
//     )
//
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
//
//     function todo() {
//         $.printBills('/manager/inventory/purchase/delivery/print',
//             {
//                 billsId: id,
//                 printType: tempKindDIV.find("input[name='printTempKind']:checked").val()
//             }
//         );
//     }
// }
/*************************分页 S******************************/
//分页查询
function queryPage(callbackObj) {
    if (billId != '') {
        $("#topForm input[name='id']").val(billId)
        $("#slideThree").prop('checked', false)
    }
    if (billsCode != "") {
        $("#slideThree").prop('checked', true)
    }
    var model = {
        isDraft: $("#slideThree").is(':checked') ? 0 : 1,
        billsId: $("#topForm input[name='id']").val(),
    };
    pageAjax(model, callbackObj)
}

function pageAjax(param, callbackObj) {
    //后台查询
    $.ajaxPackage({
        url: '/manager/inventory/purchase/delivery/searchOrder',
        data: param,
        success: function (data) {
            var result = data.data;
            //清楚报表跳转过来定义的数据
            billsCode = '';
            billId = '';
            fillPageData(result.order);
            reloadMenuBtn()
            if (callbackObj) {
                callbackObj(data.data)
            }
        }
    });
}

//填充页面页面数据
function fillPageData(bills) {
    $("#topForm").data('bootstrapValidator').resetForm();
    var formObj = bills;
    var detailList = bills.detailList;
    bills.paymentReceivedOrderVo = bills.paymentReceivedOrderVo || {}

    var paymentReceivedOrderVo = bills.paymentReceivedOrderVo.detailList || [];
    currPayreceiptDetailList = paymentReceivedOrderVo;
    initWLDWamount(bills.contactUnitId);
    //设置表单数据
    $(".gridTop").writeJson2Dom(formObj);
    $(".gridBottom").writeJson2Dom(formObj);
    $("input[name='discountAmount']").val(formObj.discountAmount);
    $("input[name='id']").val(formObj.orderId);
    //设置明细数据
    dataGrid.clearDataGrid();
    for (var int = 0; int < detailList.length; int++) {
        var row = detailList[int];
        var ifManageImeiIcon = "";
        if (row.imeiList.length > 0) {
            row.imeiList = JSON.stringify(row.imeiList);
        }
        //是否是串号
        if (row.ifManageImei == true) {
            ifManageImeiIcon = 'ifManageImeiIcon';
        }
        row.giftFlag = row.giftFlag == 1 ? true : false;
        //插入空数据的1行
        dataGrid.addRowData(int, row);
        //添加串号这个图标
        dataGrid.$grid.jqGrid('setCell', int, "goodsNumber", '', ifManageImeiIcon);
    }
    //设置收付款明细数据
    dataGrid2.clearDataGrid();
    $("#payReceiveAmount").val(0);
    var allAount = 0;
    for (var int = 0; int < paymentReceivedOrderVo.length; int++) {
        var row = paymentReceivedOrderVo[int];
        allAount = allAount + row.amount;
    }
    onSectionChange(bills.sectionId);
    $("#payReceiveAmount").val(allAount.toFixed(2));
    Summary();
    Summary2();
    initData = getPageData();
    if (bills.billsStatus == 6) {
        $('.rightMap img:eq(0)').attr('src', '/manager/images/guozhang.png');
    } else if (bills.billsStatus == 7) {
        $('.rightMap img:eq(0)').attr('src', '/manager/images/status/statusRed.png');
    }
    if (bills.auditStatus == 1) {
        $('.rightMap img:eq(1)').attr('src', '/manager/images/audit.png');
    } else {
        $('.rightMap img:eq(1)').attr('src', '/manager/images/auditNo.png');
    }
    loadBillsStatusByIsDraftOp()
}

function loadBillsStatusByIsDraftOp() {

    var billsCodeWrap = $('#billsCodeWrap');
    var button = $("#topForm :button");

    var rightMap = $(".rightMap");
    var isDraftOp = !$("#slideThree").is(':checked')
    //是否是草稿单
    if (isDraftOp == true) {
        billsCodeWrap.hide()
        button.show()
        rightMap.hide()
        dataGrid.$grid.setGridParam().showCol("op");
        dataGrid.addKongRow();
        dataGrid.$grid.delRowData(MyEiditGrid.getMaxRowid(dataGrid.$grid));
    } else {
        billsCodeWrap.show()
        button.hide()
        rightMap.show()
        dataGrid.$grid.setGridParam().hideCol("op");
        dataGrid.$grid.delRowData('dataGrid_addRowId');
    }
    dataGrid2.$grid.setColProp("amount", {editable: isDraftOp});
    dataGrid.$grid.setColProp("giftFlag", {editable: isDraftOp});
    dataGrid.$grid.setColProp("storageName", {editable: isDraftOp});
    dataGrid.$grid.setColProp("goodsName", {editable: isDraftOp});
    dataGrid.$grid.setColProp("goodsNumber", {editable: isDraftOp});
    dataGrid.$grid.setColProp("price", {editable: isDraftOp});
}


/*************************功能按钮事件 S******************************/
//打开添加状态
function openAddState() {
    currPayreceiptDetailList = [];
    try {
        $("#topForm").data('bootstrapValidator').resetForm();
    } catch (e) {
    }
    $("#payReceiveAmount").val(0);
    $("#yuFu").val(0);
    $("#yingFu").val(0);
    $("#yuShou").val(0);
    $("#yingShou").val(0);

    dataGrid.$grid.setGridParam({cellEdit: true});
    dataGrid2.$grid.setGridParam({cellEdit: true});

    //一些代码
    dataGrid.clearDataGrid();
    dataGrid.addKongRow();
    dataGrid2.clearDataGrid();
    dataGrid2.addKongRow();

    //草稿单据修改
    $(".gridTop input:not(:hidden),.discountAmount").not('input[name="billsCode"]').prop("readonly", false);
    $(".gridTop input:not(:hidden),.discountAmount").not('input[name="billsCode"],input[name="remark"],input[name="discountAmount"]').prop("readonly", true);
    $("#topForm :button").show();

    Summary();
    Summary2();
    getDefaultValues()
}

//获取默认值
function getDefaultValues() {
    var obj = {
        success: function (data) {
            $('#topForm input[name="sectionName"]').val(data.data.defaultSection.name)
            $('#topForm input[name="sectionId"]').val(data.data.defaultSection.sectionId)
            $('#topForm input[name="managerName"]').val(data.data.defaultEmployee.name).data('id', data.data.defaultEmployee.employeeId)
            $('#topForm input[name="managerId"]').val(data.data.defaultEmployee.employeeId)
            var defaultStorage = data.data.defaultStorage || {}
            var ids = $('#dataGrid').getDataIDs();
            $.each(ids, function (index, rowid) {
                $('#dataGrid').jqGrid("setCell", rowid, "storageName", defaultStorage.name);
                $('#dataGrid').jqGrid("setCell", rowid, "storageId", defaultStorage.storageId);
            })
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

    //判断数量是否为0
    // var tableid = $('#dataGrid').getCol('goodsNumber');
    //
    // for(var i=0;i<tableid.length;i++){
    //     if(tableid[i] <= 0 ||tableid[i] == "" ){
    //         $.MsgBox('提示','数量不可小于或等于0');
    //         return;
    //     }
    // }
    $("#topForm").data('bootstrapValidator').resetForm();
    //表单验证
    $("#topForm").data('bootstrapValidator').validate();
    if (!($('#topForm').data('bootstrapValidator').isValid())) {
        refreshValidator();
        return;
    }
    //收付款金额和应收应付金额比较
    // if ($.parseFloat($("input[name='weiFuAmount']").val()) < 0) {
    //     $.MsgBox('金额验证提示', '未付金额不能为负数');
    //     return;
    // }
    var model = getPageData();
    if (model.detailList.length == 0) {
        $.MsgBox('操作提示', '明细为空');
        return;
    }
    for (var int = 0; int < model.detailList.length; int++) {
        var ddetail = model.detailList[int];
        delete ddetail["billsCode"]
        if (!$.notEmpty(ddetail.storageId) || ddetail.storageId == '0') {
            $.zxsaas_plus.showalert('提示', '第' + (int + 1) + '行仓库未选择');
            return;
        }

        if (!$.notEmpty(ddetail.goodsId) || ddetail.goodsId == "0") {
            $.zxsaas_plus.showalert('提示', '第' + (int + 1) + '行商品未选择');
            return;
        }
    }
    //判断是否是正式表保存
    if ($("#slideThree").is(':checked')) {
        var detailList = [];
        for (var i = 0; i < model.detailList.length; i++) {
            var detailItem = model.detailList[i];
            detailList.push({
                "id": detailItem.id,
                "remark": detailItem.remark,
            })
        }
        var dataParam = {
            "billsId": model.id,
            "billsType": billsType,
            "remark": model.remark,
            "detailList": detailList
        }
        $.ajaxPackage({
            contentType: 'application/json',
            url: '/manager/inventory/purchase/updateRemark',
            data: JSON.stringify(dataParam),
            success: function (data) {
                $.zxsaas_plus.showalert('success', '单据备注保存成功');
                queryPage();
            }
        })
    }
    else {
        //判断数量是否为0
        var tableid = $('#dataGrid').getCol('goodsNumber');

        for (var i = 0; i < tableid.length; i++) {
            if (tableid[i] <= 0 || tableid[i] == "") {
                $.MsgBox('提示', '数量不可小于或等于0');
                return;
            }
        }

        //收付款金额和应收应付金额比较
        if ($.parseFloat($("input[name='weiFuAmount']").val()) < 0) {
            $.MsgBox('金额验证提示', '未付金额不能为负数');
            return;
        }
        var detailList = [];
        var queryKey = ''
        for (var i = 0; i < model.detailList.length; i++) {
            var detailItem = model.detailList[i];
            detailItem.imeiList = $.trim(detailItem.imeiList) == '' ? [] : detailItem.imeiList
            var imeiList = [];
            for (var j = 0; j < detailItem.imeiList.length; j++) {
                var itemItem = detailItem.imeiList[j];
                var itemStr = itemItem.imei;
                imeiList.push({
                    imei: itemItem.imei,
                    auxiliaryImei: itemItem.auxiliaryImei,
                    remark: itemItem.remark,
                })
                if ($.trim(itemItem.auxiliaryImei) != '') {
                    itemStr += ',' + itemItem.auxiliaryImei;
                }
                queryKey += itemStr+';'
            }
            detailList.push({
                "giftFlag": detailItem.giftFlag,
                "orderDetailId": detailItem.orderDetailId,
                "storageId": detailItem.storageId,
                "goodsId": detailItem.goodsId,
                "goodsNumber": detailItem.goodsNumber,
                "price": detailItem.price,
                "amount": detailItem.amount,
                "discountRate": detailItem.discountRate,
                "discountAmount": detailItem.discountAmount,
                "discountedAmount": detailItem.discountedAmount,
                "taxRate": detailItem.taxRate,//商品税率
                "taxAmount": detailItem.taxAmount,//税额
                "includingTaxPrice": $.parseFloat(Number(detailItem.includingTaxPrice)),
                "includingTaxAmount": $.parseFloat(Number(detailItem.includingTaxAmount)),
                "remark": detailItem.remark,
                "imeiList": imeiList
            })
        }
        if(queryKey!=''){
            queryKey=queryKey.substr(0,queryKey.length-1);
        }
        var paymentReceivedOrderVo = {
            'detailList': []
        }
        for (var i = 0; i < model.paymentReceivedOrderVo.length; i++) {
            var paymentReceivedItem = model.paymentReceivedOrderVo[i]
            if (paymentReceivedItem.amount > 0) {
                paymentReceivedOrderVo.detailList.push(paymentReceivedItem)
            }
        }
        var dataParam = {
            "orderId": model.id,
            "billsDateStr": model.billsDateStr,
            "sectionId": model.sectionId,
            "contactUnitId": model.contactUnitId,
            "managerId": model.managerId,
            "remark": model.remark,
            "billsAmount": model.billsAmount,
            "discountAmount": model.discountAmount,
            "discountedAmount": model.discountedAmount,
            "payReceiveAmount": model.payReceiveAmount,
            "paymentReceivedOrderVo": paymentReceivedOrderVo,
            "detailList": detailList
        }
        var url = '/manager/inventory/purchase/delivery/saveDraftOrder/auth_add'
        if ($.trim(dataParam.orderId) != '') {
            url = '/manager/inventory/purchase/delivery/saveDraftOrder/auth_update'
        }
        var flag = false;
        for (var int = 0; int < model.detailList.length; int++) {
            if (model.detailList[int].giftFlag == 0 && $.parseFloat(model.detailList[int].price) == 0) {
                flag = true
            }
        }

        function saveInStorage() {
            $.ajaxPackage({
                url: url,
                data: {order: JSON.stringify(dataParam)},
                success: function (data) {
                    $.zxsaas_plus.showalert('success', '保存成功');
                    document.orderReferenceFrame.importArr = []
                    document.orderReferenceFrame.storageList = []
                    var $frameGrid = $(window.frames["orderReferenceFrame"].document);
                    $frameGrid.find('.storageBox').attr('title', '').hide()
                    $frameGrid.find('.storageLen').text('0')
                    $("#topForm input[name='id']").val(data.data.orderId);
                    queryPage();
                }
            })
        }


        if (flag == true) {
            $.zxsaas_plus.showconfirm('提示', '单据中存在不是赠品,价格为0的商品，是否确认保存', function () {
                ImeiExisting()
            }, function () {
                return;
            })
        } else {
            ImeiExisting()
        }

        //验证串号是否已在系统中存在
        function ImeiExisting() {
            if(queryKey!=''){
                $.validateImeiExisting({
                    queryKey:queryKey,
                    menuCode:$('#AUTH').data('code'),
                    sectionId: $("#topForm input[name='sectionId']").val(),
                    save:saveInStorage
                })
            }else{
                saveInStorage()
            }

        }
    }

}

//获取页面数据
function getPageData() {
    //表单
    var formObj = $(".gridTop").toJsonObject();
    formObj.billsDateStr = $("input[name='billsDateStr']").val()
    $.extend(formObj, $(".gridBottom").toJsonObject());
    //入库数量明细
    formObj.detailList = dataGrid.getGridDataList();
    //预付款明细
    formObj.paymentReceivedOrderVo = dataGrid2.getGridDataList();
    var footerRow = $("#dataGrid").footerData("get");
    formObj.billsAmount = $.parseFloat(footerRow.includingTaxAmount).toFixed(2); //单据金额
    formObj.discountAmount = $.parseFloat($("input[name='discountAmount']").val()).toFixed(2); //整单折扣总金额
    formObj.discountedAmount = $.parseFloat(footerRow.discountedAmount).toFixed(2);  //折后总金额
    formObj.payReceiveAmount = $.parseFloat($("input[name='payReceiveAmount']").val()).toFixed(2);  //付款|收款总金额
    return formObj;
}

//删除按钮点击事件
function delBtClick() {
    $.MsgBox('删除提示', '确定要删除此单据!', function () {
        del()
    }, function () {
    });

    function del() {
        var topFormObj = $(".gridTop").toJsonObject();
        if (topFormObj.id != "") {
            $.ajaxPackage({
                url: '/manager/inventory/purchase/delivery/deleteDraftOrder',
                data: {billsId: topFormObj.id},
                success: function () {
                    $.zxsaas_plus.showalert('success', "删除成功！");
                    setTimeout(function () {
                        location.href = location.href.substring(0, location.href.indexOf('?'));
                    }, 1500)
                }
            })
        } else {
            $.MsgBox("消息提示", "删除单据不存在!");
        }
    }
}

//过账按钮点击事件
function checkBtClick() {
    if (checkIsEidited()) {
        $.MsgBox("操作提示", "当前单据未保存，继续操作前请先保存");
        return;
    }
    var flag = false;
    for (var int = 0; int < initData.detailList.length; int++) {
        if (initData.detailList[int].giftFlag == 0 && $.parseFloat(initData.detailList[int].price) == 0) {
            flag = true
        }
    }
    $.MsgBox('过账提示', '确定过账此单据!', function () {
        if (flag == true) {
            $.zxsaas_plus.showconfirm('提示', '单据中存在不是赠品,价格为0的商品，是否确认过账', function () {
                todo()
            }, function () {
                return;
            })
        } else {
            todo()
        }
    }, function () {
    });

    function todo() {
        var topFormObj = $(".gridTop").toJsonObject();
        if (topFormObj.id != "") {
            $.ajaxPackage({
                url: '/manager/inventory/purchase/delivery/executePostOrder',
                data: {billsId: topFormObj.id},
                success: function (data) {
                    zhishi(data.data.order)
                    setTimeout(function () {
                        $.zxsaas_plus.showalert('success', "过账成功");
                    }, 40)
                }
            })
        } else {
            $.MsgBox("消息提示", "过账单据不存在!");
        }
    }
}

//红冲按钮点击事件FORCE_FINISH
function forceFinishBtClick() {
    if (checkIsEidited()) {
        $.MsgBox("操作提示", "当前单据未保存，继续操作前请先保存");
        return;
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
    dateInput.val($("input[name='billsDateStr']").val());
    dateInput.datetimepicker({
        lang: "ch",           //语言选择中文
        format: "Y-m-d",      //格式化日期
        timepicker: false,    //关闭时间选项
        minDate: $('input[name="billsDateStr"]').val(),
        todayButton: false,    //关闭选择今天按钮
        maxDate: _authList.maxDate,
        minDate: $("input[name='billsDateStr']").val(),
    });

    BootstrapDialog.show({
        title: '单据红冲',
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
            $.ajaxPackage({
                url: '/manager/inventory/purchase/delivery/executeRedOrder',
                data: {billsId: topFormObj.id, redDateStr: dateInput.val()},
                success: function (data) {
                    zhishi(data.data.order)
                    queryPage();
                    $.zxsaas_plus.showalert('success', "红冲成功");
                }
            })
        } else {
            $.MsgBox("消息提示", "红冲单据不存在!");
        }
    }
}

function zhishi(order) {
    $("#slideThree").prop('checked', true)
    $("#topForm input[name='id']").val(order.orderId)
    queryPage();
}


//复制单据
function copyBtClick() {
    if (checkIsEidited()) {
        $.MsgBox("操作提示", "当前单据未保存，继续操作前请先保存");
        return;
    }
    $("#topForm").data('bootstrapValidator').resetForm();
    //置空不能复制的属性
    $(".gridTop").writeJson2Dom({
        billsCode: "",
        id: ""
    });
    currPayreceiptDetailList = [];
    $("#payReceiveAmount").val(0.00);
    Summary();
    $("#slideThree").prop('checked', false)

    loadBillsStatusByIsDraftOp()
    reloadMenuBtn()
    $('#bottomForm')[0].reset()
    $.zxsaas_plus.showalert("success", "单据复制成功!");
}


function getContactsunit() {
    var formObj = $(".gridTop").toJsonObject();
    return {contactsunitId: formObj.contactUnitId, contactsunitName: formObj.contactUnitName};
}

//订单引入
function orderReferenceBtClick() {
    if ($("#slideThree").is(':checked')) return;
    inputImeiGrid33Array = [];//清空记录数据
    if ($('iframe[name="orderReferenceFrame"]').attr("src") == "") {
        $('iframe[name="orderReferenceFrame"]').attr("src", basePath + "/IorderMain/reference");
    } else {
        orderReferenceFrame.reLoadGrid();
    }
    $('#orderReferenceModal').modal('show').find('.referenceFrame').css({
        height: $("html").height() / 1.2,
    });
    callBack = function () {
        if (arguments[0].length == 0) {
            $('#orderReferenceModal').modal('hide');
            return;
        }
        dataGrid.clearRowByPara({goodsId: ''});
        var order = arguments[0];
        var $frameGrid = $(window.frames["orderReferenceFrame"].document);

        if (order.orderDetailList != undefined && order.orderDetailList.length > 0) {
            //设置单据往来单位为引入单据的往来单位
            $("input[name='contactUnitName']").val(order.contactsunitName);
            $("input[name='contactUnitId']").val(order.contactsunitId);

            //获取往来单位余额等信息
            getContactAmountByID(order.contactsunitId);

            //绑定部门名称
            $("#topForm input[name='sectionName']").val(order.sectionName);
            $("#topForm input[name='sectionId']").val(order.sectionId);
        }


        for (var int = 0; int < order.orderDetailList.length; int++) {
            var orderDetail = order.orderDetailList[int];

            //验证是否超过订单可以引入的商品数量 orderDetailId
            var haveList = MyEiditGrid.$("dataGrid").getRowsByModel({orderDetailId: orderDetail.id + ""});
            var allCount = 0;

            if (orderDetail.storageIdList != "") {
                //录入数据的明细才参与引入
                if (parseInt(orderDetail.notIntroduceNum) >= 0) {
                    if (orderDetail.nowIntroduceNum * 1 > 0) {
                        if (orderDetail.ifManageImei == 'true') {
                            for (var int2 = 0; int2 < orderDetail.storageIdList.length; int2++) {
                                var storageInfo = orderDetail.storageIdList[int2];
                                if (storageInfo != null) {
                                    storageInfo.billsCode = orderDetail.billsCode;
                                    storageInfo.storageId = storageInfo.id;
                                    storageInfo.storageName = orderDetail.storageName;
                                    storageInfo.goodsName = orderDetail.goodsName;
                                    storageInfo.goodsId = orderDetail.goodsId;
                                    storageInfo.taxRate = orderDetail.taxRate;
                                    storageInfo.goodsNumber = $.parseInt(storageInfo.goodsNumber);
                                    storageInfo.notIntroduceNum = orderDetail.notIntroduceNum;

                                    storageInfo.price = $.parseFloat(orderDetail.nowIntroducePrice);
                                    storageInfo.discountRate = 100;
                                    storageInfo.orderDetailId = orderDetail.id;
                                    storageInfo.ifManageImei = orderDetail.ifManageImei == "true" ? 1 : 0;
                                    storageInfo.ifEnableAuxiliaryImei = orderDetail.ifEnableAuxliaryImei == "true" ? 1 : 0;
                                    storageInfo.imeiLength = orderDetail.imeiLength;
                                    storageInfo.auxiliaryImeiLength = orderDetail.auxliaryImeiLength;
                                    storageInfo.categoryName = orderDetail.categoryName;
                                    storageInfo.code = orderDetail.code;
                                    storageInfo.color = orderDetail.color;
                                    storageInfo.brandName = orderDetail.brandName;
                                    storageInfo.models = orderDetail.models;
                                    var ifManageImeiIcon = "";
                                    if (storageInfo.ifManageImei == true) {
                                        ifManageImeiIcon = 'ifManageImeiIcon';
                                        // storageInfo.imeiList = document.orderReferenceFrame.importArr[orderDetail.billsCode].importDetailListArr[orderDetail.id].imeiList;
                                        storageInfo.imeiList = JSON.stringify(storageInfo.imeiList)
                                    }
                                    if (!dataGrid.isExistRow({
                                            goodsId: storageInfo.goodsId,
                                            storageId: storageInfo.storageId,
                                            orderDetailId: storageInfo.orderDetailId
                                        })) {
                                        var addIndex = MyEiditGrid.getMaxRowid(dataGrid.$grid) + 1;
                                        dataGrid.addRowData(addIndex, storageInfo);
                                        //添加串号这个图标
                                        dataGrid.$grid.jqGrid('setCell', addIndex, "goodsNumber", '', ifManageImeiIcon);
                                    } else {
                                        if (storageInfo.goodsNumber > 0) {
                                            storageInfo.giftFlag = '否';
                                            dataGrid.updateRows(['storageId', 'orderDetailId'], storageInfo);
                                        }
                                    }
                                }
                            }
                        } else {
                            var storageInfo = orderDetail.storageIdList[0];
                            if (storageInfo != null) {
                                storageInfo.billsCode = orderDetail.billsCode;
                                storageInfo.storageId = storageInfo.id;
                                storageInfo.storageName = orderDetail.storageName;
                                storageInfo.goodsName = orderDetail.goodsName;
                                storageInfo.goodsId = orderDetail.goodsId;
                                storageInfo.taxRate = orderDetail.taxRate;
                                storageInfo.goodsNumber = $.parseInt(storageInfo.goodsNumber);
                                storageInfo.notIntroduceNum = orderDetail.notIntroduceNum;

                                storageInfo.price = $.parseFloat(orderDetail.nowIntroducePrice);
                                storageInfo.discountRate = 100;
                                storageInfo.orderDetailId = orderDetail.id;
                                storageInfo.ifManageImei = orderDetail.ifManageImei == "true" ? 1 : 0;
                                storageInfo.ifEnableAuxiliaryImei = orderDetail.ifEnableAuxliaryImei == "true" ? 1 : 0;
                                storageInfo.imeiLength = orderDetail.imeiLength;
                                storageInfo.auxiliaryImeiLength = orderDetail.auxliaryImeiLength;
                                storageInfo.categoryName = orderDetail.categoryName;
                                storageInfo.code = orderDetail.code;
                                storageInfo.color = orderDetail.color;
                                storageInfo.brandName = orderDetail.brandName;
                                storageInfo.models = orderDetail.models;
                                var ifManageImeiIcon = "";
                                if (storageInfo.ifManageImei == true) {
                                    ifManageImeiIcon = 'ifManageImeiIcon';
                                    storageInfo.imeiList = document.orderReferenceFrame.importArr[orderDetail.billsCode].importDetailListArr[orderDetail.id].imeiList;
                                }
                                if (!dataGrid.isExistRow({
                                        goodsId: storageInfo.goodsId,
                                        storageId: storageInfo.storageId,
                                        orderDetailId: storageInfo.orderDetailId
                                    })) {
                                    var addIndex = MyEiditGrid.getMaxRowid(dataGrid.$grid) + 1;
                                    dataGrid.addRowData(addIndex, storageInfo);
                                    //添加串号这个图标
                                    dataGrid.$grid.jqGrid('setCell', addIndex, "goodsNumber", '', ifManageImeiIcon);
                                } else {
                                    if (storageInfo.goodsNumber > 0) {
                                        storageInfo.giftFlag = '否';
                                        dataGrid.updateRows(['storageId', 'orderDetailId'], storageInfo);
                                    }
                                }
                            }
                        }

                    }

                } else {
                    $.MsgBox('订单引入提示', '订单明细ID:' + orderDetail.id + " 已经引入" + allCount + "个，本次计划引入" + orderDetail.nowIntroduceNum + "个，总和超过订单未引入数量" + orderDetail.notIntroduceNum + "，将被忽略");
                }
            }
        }
        Summary();
        Summary2();


        var ids = $frameGrid.find('#dataGrid2').getDataIDs();
        $.each(ids, function (k, v) {
            var info = $frameGrid.find('#dataGrid2').getRowData(v);
            $frameGrid.find('#dataGrid2').setCell(v, 'nowIntroduceNum', 0)

            $frameGrid.find('#dataGrid2').setCell(v, 'imeiList', ' ')
            $frameGrid.find('#dataGrid2').setCell(v, 'storageIdList', ' ')
        })

        if (arguments[1] == undefined) {
            $('#orderReferenceModal').modal('hide');
        }
    };
}

//单据引入
function getSection() {
    var formObj = $(".gridTop").toJsonObject();
    return {sectionId: formObj.sectionId, sectionName: formObj.sectionName};
}

/*************************功能按钮事件 E******************************/

//检查页面是否有编辑过
var initData = null;

function checkIsEidited() {
    return initData == null || _.isEqual(initData, getPageData()) ? false : true;
}

function getAllData(id) {
    var info = $('#dataGrid').getRowData(id)
    return info
}

function getOrderList() {
    var orderList = []
    var ids = $('#dataGrid').getDataIDs()
    $.each(ids, function (k, v) {
        orderList.push($('#dataGrid').getRowData(v).orderDetailId)
    })
    return orderList

}

//初始化事件
function initEvents() {
    $(window).resize(wResize);//注册窗口改变事件
    wResize();
    $("input[name='discountAmount']").bind('input propertychange', function () {
        SummaryBiaoJiao();
    });
}

//窗口大小改变
function wResize() {
    var winH = $(window).height();//浏览器高度
    var centerH = winH - 450;//中部高度
    if (centerH < 400) {
        centerH = 400;
    }
    $("#dataGrid").setGridHeight(centerH);
    $("#dataGrid2").setGridHeight(centerH - 100);
    $(".referenceFrame").height(winH - 250);
    $("#dataGrid33").setGridWidth(480);
    $("#dataGrid33").closest(".ui-jqgrid-bdiv").css({"overflow-x": "hidden"});

}

//订单引入调用接口  --- 获取明细列表 切引入ID不能为空
function queryDetailByOrderDetailId(orderDetailId) {

    //过滤该订单明细的引入数据
    var list = $.grep(dataGrid.getGridDataList(), function (row) {
        return row.orderDetailId == (orderDetailId + "");
    });
    return list;
}


var eiditQianGoodsNumber = 0;

function initDataGrid() {
    function formatterGiftFlag(cellvalue, options, rowObject) {
        if (cellvalue == true || cellvalue == "是") {
            return '是';
        } else {
            return '否';
        }
    }

    //配置
    var paras = {
        gridId: 'dataGrid',
        multiselect: true,
        addRow: {
            goodsId: '',
            goodsCode: '',
            goodsName: '',
            cxSectionId: '',
            stockNum: '',
            remark: ''
        },
        colNames: ['赠品', '仓库ID', '<i class="bitianX">*</i>仓库名称', '<i class="bitianX">*</i>商品名称',
            '<i class="bitianX">*</i>数量', '<i class="bitianX">*</i>单价', '金额', '折扣率', '折扣金额', '折后金额', '含税单价', '含税金额', '税率', '税额',
            '商品备注', '商品ID', '类别', '商品编码', '品牌', '型号', '颜色',

            '是否串号管理', '是否辅助串号管理', '串号列表', '串号长度', '辅助串号长度', '辅助串号长度', '辅助串号长度', 'billsCode', '明细id'],
        colModel:
            [
                {
                    name: 'giftFlag',
                    sortable: false,
                    index: 'giftFlag',
                    width: '100px',
                    align: 'left',
                    formatter: formatterGiftFlag,
                    editable: true,
                    edittype: 'custom',

                    editoptions: {custom_element: my_input3, custom_value: my_value}
                },
                {name: 'storageId', index: 'storageId', align: 'left', sortable: false, hidden: true},
                {
                    width: '200px',
                    name: 'storageName',
                    sortable: false,
                    index: 'storageName',
                    align: 'left',
                    edittype: 'custom_bt_input',
                    custom_element_bt_click: "selectStorageReferenceOpen",
                    editable: true
                },
                {
                    width: '200px',
                    name: 'goodsName',
                    sortable: false,
                    index: 'goodsName',
                    align: 'left',
                    edittype: 'custom_bt_input',
                    custom_element_bt_click: "selectReferenceOpen",
                    editable: true
                },
                {
                    width: '100px',
                    name: 'goodsNumber',
                    index: 'goodsNumber',
                    align: 'right',
                    editable: false,
                    sortable: false,
                    formatter: 'integer',
                    editoptions: {
                        onkeyup: "checkInput.clearNoNum(this,10)",
                        dataEvents: [{
                            type: "focus",
                            fn: function () {
                                this.select()
                            }
                        }]
                    }
                },
                {
                    width: '100px',
                    name: 'price',
                    index: 'price',
                    align: 'right',
                    editable: true,
                    editrules: {number: true},
                    formatter: 'number',
                    sortable: false,
                    editoptions: {
                        onkeyup: "checkInput.checkNum(this,12)",
                        dataEvents: [{
                            type: "focus",
                            fn: function () {
                                this.select()
                            }
                        }]
                    }
                },
                {
                    width: '100px',
                    name: 'amount',
                    index: 'amount',
                    align: 'right',
                    editable: false,
                    editrules: {number: true},
                    formatter: 'number',
                    sortable: false
                },
                {
                    width: '100px',
                    name: 'discountRate',
                    index: 'discountRate',
                    hidden: true,
                    editable: false,
                    editrules: {number: true},
                    formatoptions: {suffix: "%"},
                    formatter: 'currency',
                    sortable: false,
                    editoptions: {onkeyup: "checkInput.checkNum(this,5)"}
                },
                {
                    width: '120px',
                    name: 'discountAmount',
                    index: 'discountAmount',
                    hidden: true,
                    editable: false,
                    sortable: false,
                    formatter: 'number'
                },
                {
                    width: '120px',
                    name: 'discountedAmount',
                    index: 'discountedAmount',
                    hidden: true,
                    editable: false,
                    sortable: false,
                    formatter: 'number',
                    editoptions: {onkeyup: "checkInput.checkNum(this,12)"}
                },
                {
                    width: '120px',
                    name: 'includingTaxPrice',
                    index: 'includingTaxPrice',
                    hidden: true,
                    editable: false,
                    sortable: false,
                    formatter: 'number'
                },
                {
                    width: '120px',
                    name: 'includingTaxAmount',
                    index: 'includingTaxAmount',
                    hidden: true,
                    editable: false,
                    sortable: false,
                    formatter: 'number'
                },
                {
                    width: '100px',
                    name: 'taxRate',
                    index: 'taxRate',
                    hidden: true,
                    editable: false,
                    sortable: false,
                    formatoptions: {suffix: "%"},
                    formatter: 'currency',
                    editoptions: {onkeyup: "checkInput.checkNum(this,5)"}
                },
                {
                    width: '120px',
                    name: 'taxAmount',
                    index: 'taxAmount',
                    hidden: true,
                    editable: false,
                    sortable: false,
                    formatter: 'number'
                },
                {
                    width: '200px',
                    name: 'remark',
                    index: 'remark',
                    hidden: false,
                    editable: true,
                    sortable: false,
                    editoptions: {onkeyup: "checkInput.clearNoText(this,100)"}
                },
                {name: 'goodsId', index: 'goodsId', align: 'left', sortable: false, hidden: true},
                {name: 'categoryName', width: '100px', index: 'categoryName', editable: false, sortable: false},
                {name: 'code', index: 'code', width: '100px', editable: false, sortable: false},
                {name: 'brandName', width: '100px', index: 'brandName', editable: false, sortable: false},
                {name: 'models', width: '100px', index: 'models', editable: false, sortable: false},
                {name: 'color', width: '100px', index: 'color', editable: false, sortable: false},
                {name: 'ifManageImei', index: 'ifManageImei', hidden: true, editable: false, sortable: false},
                {
                    name: 'ifEnableAuxiliaryImei',
                    index: 'ifEnableAuxiliaryImei',
                    hidden: true,
                    editable: false,
                    sortable: false
                },
                {name: 'imeiList', hidden: true, editable: false, sortable: false},
                {name: 'imeiLength', hidden: true, sortable: false},
                {
                    name: 'auxiliaryImeiLength',
                    hidden: true,
                    editable: false,
                    sortable: false,
                },
                {
                    name: 'orderDetailId',
                    hidden: true,
                    editable: false,
                    sortable: false,
                },
                {
                    name: 'notIntroduceNum',
                    hidden: true,
                    editable: false,
                    sortable: false,
                },
                {
                    name: 'billsCode',
                    hidden: true,
                    editable: false,
                    sortable: false,
                },
                {
                    name: 'id',
                    hidden: true,
                    editable: false,
                    sortable: false,
                },
            ]
        , shrinkToFit: false,
    };
    //回调函数
    var callBackList = {
        onCellSelect: function (rowid, iCol, cellcontent, e) {
            var curColName = $(e.target).attr('aria-describedby').replace(paras.gridId + '_', '');
            var currRow = $("#dataGrid").jqGrid('getRowData', rowid);
            eiditQianGoodsNumber = parseInt(currRow.goodsNumber);//用于验证引入数量不超过未引入数量
            if (curColName == 'goodsNumber') {
                //判断是否数量录入 并判断是否串号管理
                if ((currRow.ifManageImei == true || $.trim(currRow.imeiList) != "") && currRow.goodsId != "") {
                    $("#dataGrid").setColProp("goodsNumber", {editable: false});
                    openImeiInputModal("dataGrid", rowid);//打开输入框
                } else {
                    $("#dataGrid").setColProp("goodsNumber", {editable: true});
                }
            } else if (curColName == 'price' || curColName == 'discountRate' || curColName == 'taxRate') {
                try {
                    MyEiditGrid.currEditDataGrid.unAllEdit();
                } catch (e) {
                }
                var currRow2 = $("#dataGrid").jqGrid('getRowData', rowid);

                if (currRow2.giftFlag == '是' || $("#slideThree").is(':checked')) {
                    $("#dataGrid").setColProp("price", {editable: false});
                    $("#dataGrid").setColProp("discountRate", {editable: false});
                    $("#dataGrid").setColProp("taxRate", {editable: false});
                } else {
                    //todo  这里不是赠品的时候，也禁用编辑，因为 该列隐藏， 影响tab键的切换
                    $("#dataGrid").setColProp("price", {editable: true});
                    $("#dataGrid").setColProp("discountRate", {editable: false});
                    $("#dataGrid").setColProp("taxRate", {editable: false});
                }
            }
        },
        afterEditCell: function (rowid, name, val, iRow, iCol) {
            lastrow = iRow;
            lastcell = iCol;
            if (name == "giftFlag") {
                $("#" + iRow + "_giftFlag option[value='" + val + "']").attr("selected", true);
            }
        },
        afterSaveCell: function (rowid, name, val, iRow, iCol) {
            if (name == "giftFlag") {
                if (val == '是') {
                    $("#" + paras.gridId).jqGrid('setCell', rowid, "price", 0.00);
                    $("#dataGrid").setColProp("price", {editable: false});
                } else {
                    $("#dataGrid").setColProp("price", {editable: true});
                }
            }
            var currRow = $("#dataGrid").jqGrid('getRowData', rowid);
            if (name == 'goodsNumber' && $.trim(currRow.orderDetailId + "") != '') {
                //验证是否超过订单可以引入的商品数量 orderDetailId
                var haveList = MyEiditGrid.$("dataGrid").getRowsByModel({orderDetailId: currRow.orderDetailId + ""});
                var allCount = 0;
                for (var int = 0; int < haveList.length; int++)
                    allCount = allCount + parseInt(haveList[int].goodsNumber);
                if (allCount > parseInt(currRow.notIntroduceNum)) {
                    $.MsgBox('订单引入提示', '引入数量不能超过订单明细未引入量');
                    $("#" + paras.gridId).jqGrid('setCell', rowid, "goodsNumber", eiditQianGoodsNumber);
                }
            }
        },
        summary: function (rowid, name, val, iRow, iCol) {//统计处理
            Summary();
        },
        getGridDataList: function (rows) {
            //筛出不合格行
            return $.map(rows, function (row) {
//				if($.notEmpty(row.storageId) && $.notEmpty(row.goodsId) && row.goodsId != "0" && row.storageId != "0" && row.goodsNumber != 0 ){
                if ($.notEmpty(row.imeiList)) {
                    row.imeiList = JSON.parse(row.imeiList);
                }
                row.goodsNumber = $.parseInt(row.goodsNumber);
                row.amount = $.parseFloat(row.amount).toFixed(2);
                row.giftFlag = row.giftFlag == "是" ? 1 : 0;
                delete row["imeiLength"];
                delete row["auxiliaryImeiLength"];
                delete row["notIntroduceNum"];
                return row;
            });
        }
        ,
        afterInsertRow: function (rowid, rowdata) {
            //这里需要推迟执行，需要先执行表格的进入不可编辑状态
            setTimeout(function () {
                //添加一行之后，需要把上一个行的仓库也带到本行中 , 这里可能是订单引入，订单引入，这里不需要（把上一个行的仓库也带到本行中）；
                if (rowid > 0) {
                    var prevRowData = dataGrid.$grid.jqGrid('getRowData', rowid - 1);
                    var curRowData = dataGrid.$grid.jqGrid('getRowData', rowid);
                    if (prevRowData.storageId != "" && curRowData.storageId == "") {
                        dataGrid.$grid.jqGrid('setCell', rowid, 'storageId', prevRowData.storageId);
                        dataGrid.$grid.jqGrid('setCell', rowid, 'storageName', prevRowData.storageName);
                    }
                }
            }, 0)


        },
        deleteCallBack: function (info) {
            if (info.billsCode != '') {
                document.orderReferenceFrame.importArr[info.billsCode].importLen -= info.goodsNumber * 1
                document.orderReferenceFrame.importArr[info.billsCode].importDetailListArr[info.orderDetailId] = null
                var index = document.orderReferenceFrame.sotrageList.indexOf(info.storageName + ',' + info.goodsId);
                if (index > -1) {
                    document.orderReferenceFrame.sotrageList.splice(index, 1);
                }
                var $frameGrid = $(window.frames["orderReferenceFrame"].document);
                var quchong = function (arr) {
                    var len = arr.length;
                    arr.sort();
                    for (var i = len - 1; i > 0; i--) {
                        if (arr[i] == arr[i - 1]) {
                            arr.splice(i, 1);
                        }
                    }
                    return arr;
                }
                var storageArr = []
                $.each(document.orderReferenceFrame.sotrageList, function (k, v) {
                    storageArr.push(v.split(',')[0])
                })

                $frameGrid.find('.storageLen').html(quchong(storageArr).length)
                $frameGrid.find('.storageBox').attr('title', storageArr.join(','))

            }

        }
    };
    dataGrid = new MyEiditGrid(paras, callBackList);

    dataGrid.$grid.setGridParam({rowNum: 10000}).trigger('reloadGrid');

    /**自定义字段编辑**/
    function my_input3(value, options) {
        var html = '<select class="form-control" onchange="selectChange()">' +
            '<option value ="否">否</option>' +
            '<option value ="是">是</option>' +
            '</select>';
        return $(html);
    }

    function my_value(value) {
        return value.val();
    }
}

function selectChange() {
    MyEiditGrid.currEditDataGrid.unAllEdit();
}

//明细统计
function Summary() {
    //汇总每一行
    var ids = $("#dataGrid").getDataIDs();
    $.each(ids, function (i, value) {
        var currRow = dataGrid.$grid.jqGrid('getRowData', value);

        var goodsNumber = $.parseInt(currRow.goodsNumber);//数量
        var amount = Number(($.parseFloat(currRow.price) * goodsNumber).toFixed(2)); //金额
        var discountRate = $.parseFloat(currRow.discountRate) / 100; //折扣率
        var discountPrice = Number(($.parseFloat(currRow.price) * discountRate).toFixed(2)); //折扣单价
        var discountedAmount = Number(discountPrice * goodsNumber); //折后金额

        //税率录入
        var taxRate = $.parseFloat(currRow.taxRate) / 100;//税率
        var includingTaxPrice = Number((discountPrice * taxRate + discountPrice).toFixed(2));//含税单价
        var includingTaxAmount = Number((includingTaxPrice * goodsNumber).toFixed(2));
        var taxAmount = Number((includingTaxPrice - discountPrice).toFixed(2)) * goodsNumber;

        dataGrid.$grid.jqGrid('setCell', value, "amount", amount.toFixed(2));
        dataGrid.$grid.jqGrid('setCell', value, "discountedAmount", discountedAmount.toFixed(2));
        dataGrid.$grid.jqGrid('setCell', value, "includingTaxPrice", includingTaxPrice.toFixed(2));
        dataGrid.$grid.jqGrid('setCell', value, "includingTaxAmount", includingTaxAmount.toFixed(2));
        dataGrid.$grid.jqGrid('setCell', value, "taxAmount", taxAmount.toFixed(2));
    });

    //汇总
    var sumGoodsNumber = dataGrid.$grid.getCol('goodsNumber', false, 'sum').toFixed(2);
    var sumAmount = dataGrid.$grid.getCol('includingTaxAmount', false, 'sum').toFixed(2);
    var discountedAmount = dataGrid.$grid.getCol('discountedAmount', false, 'sum').toFixed(2);
    var amount = dataGrid.$grid.getCol('amount', false, 'sum').toFixed(2);
    dataGrid.$grid.footerData("set", {
        index: "合计",
        goodsNumber: sumGoodsNumber,
        discountedAmount: discountedAmount,
        includingTaxAmount: sumAmount,
        amount: amount,
    });

    SummaryBiaoJiao();
}

//表角金额统计
function SummaryBiaoJiao() {
    var footerRow = $("#dataGrid").footerData("get");
    var includingTaxAmount = $.parseFloat(footerRow.includingTaxAmount);//含税金额
    var payReceiveAmount = $.parseFloat($("#payReceiveAmount").val());//收付款金额
    var discountAmount = $.parseFloat($("input[name='discountAmount']").val());//整单折扣
    if (isNaN(discountAmount)) {
        discountAmount = 0;
        //$("input[name='discountAmount']").val(0);
    }
    $("input[name='yingFuAmount']").val((includingTaxAmount).toFixed(2));
    $("input[name='weiFuAmount']").val((includingTaxAmount - discountAmount - payReceiveAmount).toFixed(2));
}

//打开引用对话框
var callBack;

function selectReferenceOpen(cellInfo) {
    $('#dataGridGood').next().trigger('click')
}

/**********************表格1 开始******************************************/

//切换部门，联动查询收付款账户信息
var currPayreceiptDetailList = [];

function onSectionChange(sectionId, isShow) {

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
            ;
            if (data.data.dataList.length == 0) {
                $('#payrecetiptDetailModal').modal('hide');
                if (isShow === 1) {
                    $.MsgBox('错误提示', '此部门未设置资金账户');
                }
                return;
            }
            ;

            //处理表格、
            dataGrid2.$grid.jqGrid('clearGridData');
            for (var int = 0; int < data.data.dataList.length; int++) {
                if (data.data.dataList[int].status != 1 && data.data.dataList[int].status != 2) {
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
                for (var int2 = 0; int2 < currPayreceiptDetailList.length; int2++) {
                    if (currPayreceiptDetailList[int2].accountId == row.id) {
                        row.amount = currPayreceiptDetailList[int2].amount;
                    }
                }
            }

            initData = getPageData();//记录初始数据
        }
    });

}

//打开收付款明细录入
function openPayrecetiptDetailModal() {
    if ($("input[name='sectionId']").val() == "") {
        $.MsgBox("操作提示", "请选择部门");
        return;
    }
    ;
    $('#payrecetiptDetailModal').modal('show');
    onSectionChange($("input[name='sectionId']").val(), 1);
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
        colModel:
            [
                {name: 'accountType', sortable: false, index: 'accountType', align: 'left', editable: false},
                {name: 'accountId', index: 'accountId', align: 'left', sortable: false, hidden: true},
                {name: 'accountName', index: 'accountName', align: 'left', editable: false, sortable: false},
                {
                    name: 'amount',
                    index: 'amount',
                    align: 'left',
                    editable: true,
                    sortable: false,
                    formatter: 'number',
                    editoptions: {
                        onkeyup: "checkInput.checkNum(this,12)",
                        dataEvents: [{
                            type: "focus",
                            fn: function () {
                                this.select()
                            }
                        }]
                    }
                }
            ]
    };
    //回调函数
    var callBackList = {
        afterEditCell: function (rowid, name, val, iRow, iCol) {//开始编辑
            if (iCol == 2) {
                //
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
                if ($.notEmpty(row.accountType, row.amount, row.accountName)) {
                    delete row["accountName"];
                    delete row["accountType"];
                    row.amount = $.parseFloat(row.amount);
                    return row;
                }
            });
        }
    };
    dataGrid2 = new MyEiditGrid(paras, callBackList);

}

//点击保存明细事件
function savePayreceiptAmout() {
    if ($("#slideThree").is(':checked')) return;
    try {
        MyEiditGrid.currEditDataGrid.unAllEdit();
    } catch (e) {
    }
    //汇总总金额
    var footerRow = $("#dataGrid2").footerData("get");
    $("#payReceiveAmount").val(footerRow.amount);
    $('#payrecetiptDetailModal').modal('hide');
    currPayreceiptDetailList = dataGrid2.getGridDataList();
    SummaryBiaoJiao();
}

//汇总统计
function Summary2() {
    //名称
    var sumAmount = $("#dataGrid2").getCol('amount', false, 'sum').toFixed(2);
    $("#dataGrid2").footerData("set", {index: "合计", amount: sumAmount});
}

/**********************表格1 结束******************************************/


/**********************表格1 开始******************************************/

//子页面打开串号录入
function openImeiInputModal2(gridId, rowid) {
    try {
        MyEiditGrid.currEditDataGrid.unAllEdit();
    } catch (e) {
    }
    var currRow = $(window.frames["orderReferenceFrame"].document).find("#" + gridId).jqGrid('getRowData', rowid)
    currImeiLength = currRow.imeiLength;//串号长度
    currAuxliaryImeiLength = currRow.auxliaryImeiLength;
    var imeiList = [];

    //获取已录入的串号
    if ($.trim(currRow.imeiList) != "") {
        try {
            imeiList = JSON.parse(currRow.imeiList);
        } catch (e) {
            console.log(e);
        }
    }
    imeiInputObj.setOption({
        imeiList: imeiList,
        goodsName: currRow.goodsName,
        goodsID: currRow.goodsId,
        currImeiLength: currImeiLength, // 默认当前的串号长度
        currAuxliaryImeiLength: currAuxliaryImeiLength,   // 默认当前的辅助串号长度
        isEnableAuxliaryImei: currRow.ifEnableAuxliaryImei == 'true' ? true : false,   // true:辅助串号， false :没有辅助串号
        isEdit: !$("#slideThree").is(':checked'),
        isAutoImei: true, // 关闭自动串号
        appenRowCallback: appenRowCallback,
        saveImeiInputCallback: saveImeiInputCallback,
        exportImeiInputCallback: exportImeiInputCallback
    });
    imeiInputObj.reLoadDom();
    imeiInputObj.showModal();
    $("#dataGridRowId").val(gridId + "|" + rowid);
}

//打开串号录入
var currImeiLength = null;
var currAuxliaryImeiLength = null;
var imeiListRow = [];

function openImeiInputModal(gridId, rowid) {
    try {
        MyEiditGrid.currEditDataGrid.unAllEdit();
    }
    catch (e) {
    }
    var currRow = $("#dataGrid").jqGrid('getRowData', rowid);
    var imeiList = [];
    var currAuxliaryImeiLength = '';
    //获取已录入的串号
    if ($.trim(currRow.imeiList) != "") {
        imeiList = JSON.parse(currRow.imeiList);
    }
    if (currRow.ifEnableAuxiliaryImei == true) {
        currAuxliaryImeiLength = currRow.auxiliaryImeiLength;//辅助串号长度
    }
    imeiInputObj.setOption({
        imeiList: imeiList,
        goodsName: currRow.goodsName,
        goodsID: currRow.goodsId,
        currImeiLength: currRow.imeiLength.trim(), // 默认当前的串号长度
        currAuxliaryImeiLength: currAuxliaryImeiLength.trim(),   // 默认当前的辅助串号长度
        isEnableAuxliaryImei: currRow.ifEnableAuxiliaryImei == true ? true : false,   // true:辅助串号， false :没有辅助串号
        isEdit: !$("#slideThree").is(':checked'),
        isAutoImei: true, //开启自动串号
        appenRowCallback: appenRowCallback,
        saveImeiInputCallback: saveImeiInputCallback,
        exportImeiInputCallback: exportImeiInputCallback
    });
    imeiInputObj.reLoadDom();
    imeiInputObj.showModal();
    $("#dataGridRowId").val(gridId + "|" + rowid);
}

//获取表格详细数据
function getImeiList() {
    var imiData = getPageData();
    var imeiDataList = imiData.detailList;
    var imeiListDetailRow = [];
    if (imeiDataList != undefined && imeiDataList.length > 0) {
        for (var i = 0; i < imeiDataList.length; i++) {
            if ($.isArray(imeiDataList[i].imeiList)) {
                var imeiDataListDetail = imeiDataList[i].imeiList
                if (imeiDataListDetail.length > 0) {
                    var sdha = []
                    for (var j = 0; j < imeiDataListDetail.length; j++) {
                        sdha.push(imeiDataListDetail[j])
                    }
                    imeiListDetailRow.push(sdha)
                }
            } else {
                imeiListDetailRow.push('')
            }
        }
    }
    imeiListRow = imeiListDetailRow
}


//批量导入串号
function exportImeiInputCallback(exportArr) {
    var reLuru = '';
    var reLuruArr = [];
    var result = -1;
    //判断是否是引入的，如果是需要判断不能超过未引入量
    var rowid = parseInt($("#dataGridRowId").val().split("|")[1]);
    var gridId = $("#dataGridRowId").val().split("|")[0];
    var currRow = gridId == 'dataGrid2' ? $(window.frames["orderReferenceFrame"].document).find("#" + gridId).jqGrid('getRowData', rowid) : $("#dataGrid").jqGrid('getRowData', rowid);
    if ($.trim(currRow.id + "") != '') {
        //验证是否超过订单可以引入的商品数量 orderDetailId
        var haveList = MyEiditGrid.$("dataGrid").getRowsByModel({orderDetailId: currRow.id + ""});
        var allCount = 0;
        for (var int = 0; int < haveList.length; int++) {
            allCount = allCount + parseInt(haveList[int].goodsNumber);
        }
        if (((allCount - eiditQianGoodsNumber + imeiInputObj.option.dataGrid.getGridDataList().length) + exportArr.length) > parseInt(currRow.reviewsNum * 1 - currRow.introduceNum * 1)) {
            reLuru += '引入数量不能超过订单明细未引入量\n';
            result = 0;
            reLuruArr = exportArr;
        }
    }
    getImeiList()

    if (imeiListRow != [] && imeiListRow.length > 0 && result == -1) {
        for (var i = 0; i < imeiListRow.length; i++) {
            for (var j = 0; j < imeiListRow[i].length; j++) {
                for (var k = 0; k < exportArr.length; k++) {
                    var item = exportArr[k];
                    var toval = item.trim();
                    var tovalArr = toval.split(',');
                    var flag = 1;

                    for (var m = 0; m < tovalArr.length; m++) {
                        var tovalItem = tovalArr[m];
                        if ($.trim(imeiListRow[i][j].imei).toUpperCase() == tovalItem || $.trim(imeiListRow[i][j].auxiliaryImei).toUpperCase() == tovalItem) {
                            flag = 0;
                            break;
                        }
                    }
                    if (flag == 0) {
                        reLuru += '串号:[' + toval + ']在本单据表体第' + (i + 1) + '行第' + (j + 1) + '列已录入!\n';
                        result = 0;
                        reLuruArr.push(toval);
                    }
                }
            }
        }
    }

    if (gridId == "dataGrid2" && result == -1) {

        var iframeDataGrid2 = getFrameDataGrid2List();
        var iframeDataGrid2Merge = $.extend(false, iframeDataGrid2, inputImeiGrid33Array)

        var currRow = $(window.frames["orderReferenceFrame"].document).find("#" + gridId).jqGrid('getRowData', rowid);
        var $grid = imeiInputObj.option.dataGrid.$grid
        var len = $grid.getDataIDs().length
        //验证订单引入
        for (var i in iframeDataGrid2Merge) {
            var itemMerge = iframeDataGrid2Merge[i];
            var imeiList = itemMerge.imeiList;
            for (var j = 0; j < imeiList.length; j++) {
                var imeiItem = imeiList[j];
                for (var k = 0; k < exportArr.length; k++) {
                    var item = exportArr[k];
                    var toval = item.trim();
                    var tovalArr = toval.split(',');
                    var flag = 1;
                    for (var m = 0; m < tovalArr.length; m++) {
                        var tovalItem = tovalArr[m];
                        if (imeiItem.imei.toUpperCase() == tovalItem || imeiItem.auxiliaryImei.toUpperCase() == tovalItem) {
                            flag = 0;
                            break;
                        }
                    }
                    if (flag == 0) {
                        reLuru += '串号:[' + toval + ']在订单引用-单据明细中，仓库<' + itemMerge.name + '>已录入过此串号:!\n';
                        result = 0;
                        reLuruArr.push(toval);
                    }
                }
            }
        }
    }


    return {
        result: result,
        reLuru: reLuru,
        reLuruArr: reLuruArr,
    };
}

//追加一行数据
function appenRowCallback(imei1, imei2) {
    //判断是否是引入的，如果是需要判断不能超过未引入量
    var rowid = parseInt($("#dataGridRowId").val().split("|")[1]);
    var gridId = $("#dataGridRowId").val().split("|")[0];
    // if (gridId == "dataGrid") {
    var currRow = gridId == 'dataGrid2' ? $(window.frames["orderReferenceFrame"].document).find("#" + gridId).jqGrid('getRowData', rowid) : $("#dataGrid").jqGrid('getRowData', rowid);
    if ($.trim((gridId == 'dataGrid2' ? currRow.id : currRow.orderDetailId) + "") != '') {
        //验证是否超过订单可以引入的商品数量 orderDetailId
        var haveList = MyEiditGrid.$("dataGrid").getRowsByModel({orderDetailId: (gridId == 'dataGrid2' ? currRow.id : currRow.orderDetailId) + ""});
        var allCount = 0;
        for (var int = 0; int < haveList.length; int++)
            allCount = allCount + parseInt(haveList[int].goodsNumber);
        if (((allCount - eiditQianGoodsNumber + imeiInputObj.option.dataGrid.getGridDataList().length) ) >= parseInt(currRow.reviewsNum * 1 - currRow.introduceNum * 1)) {
            $.MsgBox('订单引入提示', '引入数量不能超过订单明细未引入量');
            return false;
        }
    }
    // }
    getImeiList()
    //验证串号，辅助串号在数据库是否存在
    if ($.trim(imei1) != '') {
        if (imeiListRow != [] && imeiListRow.length > 0) {
            for (var i = 0; i < imeiListRow.length; i++) {
                for (var j = 0; j < imeiListRow[i].length; j++) {
                    if (imei1 == imeiListRow[i][j].imei || imei1 == imeiListRow[i][j].auxiliaryImei) {
                        $.MsgBox('验证提示', '本单据表体第' + (i + 1) + '行第' + (j + 1) + '列已录入过此串号:' + imei1);
                        return false;
                    }
                }
            }
        }

    }

    if ($.trim(imei2) != '') {
        if (imeiListRow != [] && imeiListRow.length > 0) {
            for (var i = 0; i < imeiListRow.length; i++) {
                for (var j = 0; j < imeiListRow[i].length; j++) {
                    if (imei2 == imeiListRow[i][j].imei || imei2 == imeiListRow[i][j].auxiliaryImei) {
                        $.MsgBox('验证提示', '本单据表体第' + (i + 1) + '行第' + (j + 1) + '列已录入过此串号:' + imei2);
                        return false;
                    }
                }
            }
        }
    }

    if (gridId == "dataGrid2") {
        var iframeDataGrid2 = getFrameDataGrid2List();
        var iframeDataGrid2Merge = $.extend(false, iframeDataGrid2, inputImeiGrid33Array)
        var currRow = $(window.frames["orderReferenceFrame"].document).find("#" + gridId).jqGrid('getRowData', rowid);
        var $grid = imeiInputObj.option.dataGrid.$grid
        var len = $grid.getDataIDs().length


        for (var i in iframeDataGrid2Merge) {
            var item = iframeDataGrid2Merge[i];
            var imeiList = item.imeiList;
            for (var j = 0; j < imeiList.length; j++) {
                var imeiItem = imeiList[j];
                //主串号
                if (imei1 != '') {
                    if (imei1 == imeiItem.imei || imei1 == imeiItem.auxiliaryImei) {
                        $.MsgBox('验证提示', '订单引用-单据明细中，仓库<' + item.name + '>已录入过此串号:' + imei1);
                        return false;
                    }
                }
                //辅助串号
                if (imei2 != '') {
                    if (imei2 == imeiItem.imei || imei2 == imeiItem.auxiliaryImei) {
                        $.MsgBox('验证提示', '订单引用-单据明细中，仓库<' + item.name + '>已录入过此串号:' + imei2);
                        return false;
                    }
                }
            }
        }
    }
    return true;
}

//点击保存明细事件
function saveImeiInputCallback(objs) {
    try {
        MyEiditGrid.currEditDataGrid.unAllEdit();
    } catch (e) {
    }
    var rowid = parseInt($("#dataGridRowId").val().split("|")[1]);
    var gridId = $("#dataGridRowId").val().split("|")[0];


    if (gridId == "dataGrid") {
        var info = $("#dataGrid").getRowData(rowid)
        if (document.orderReferenceFrame.importArr != undefined && document.orderReferenceFrame.importArr[info.billsCode] != undefined) {
            if (info.ifManageImei) {
                var lastNum = info.goodsNumber * 1 - objs.length
                var hasImport = document.orderReferenceFrame.importArr[info.billsCode].importDetailListArr[info.orderDetailId].hasImport
                document.orderReferenceFrame.importArr[info.billsCode].importLen -= lastNum
                var notIntroduceNum = document.orderReferenceFrame.importArr[info.billsCode].importDetailListArr[info.orderDetailId].notIntroduceNum * 1
                document.orderReferenceFrame.importArr[info.billsCode].importDetailListArr[info.orderDetailId].hasImport = objs.length
                document.orderReferenceFrame.importArr[info.billsCode].importDetailListArr[info.orderDetailId].notIntroduceNum = notIntroduceNum + hasImport - objs.length
                document.orderReferenceFrame.importArr[info.billsCode].importDetailListArr[info.orderDetailId].imeiList = JSON.stringify(objs)

            } else {
                document.orderReferenceFrame.importArr[info.billsCode].importLen = objs.length
                document.orderReferenceFrame.importArr[info.billsCode].importDetailListArr[info.orderDetailId].hasImport = objs.length
                document.orderReferenceFrame.importArr[info.billsCode].importDetailListArr[info.orderDetailId].notIntroduceNum = objs.length
                document.orderReferenceFrame.importArr[info.billsCode].importDetailListArr[info.orderDetailId].imeiList = JSON.stringify(objs)
            }

        }

    }
    $("#" + gridId).jqGrid('setCell', rowid, "imeiList", JSON.stringify(objs));
    $("#" + gridId).jqGrid('setCell', rowid, "goodsNumber", objs.length);
    Summary();
    //看是否是订单引入 是的需要保存表格到数据组
    if (gridId == "dataGrid2") {

        var currRow = $(window.frames["orderReferenceFrame"].document).find("#" + gridId).jqGrid('getRowData', rowid);
        // 单据明细表格id
        var $frameGrid = $(window.frames["orderReferenceFrame"].document)

        // $frameGrid.find("#" + gridId).jqGrid('setCell', rowid, "hasImport", objs.length);
        $frameGrid.find("#" + gridId).jqGrid('setCell', rowid, "nowIntroduceNum", objs.length);
        var reviewsNum = $frameGrid.find("#" + gridId).jqGrid('getCell', rowid, "reviewsNum");
        var introduceNum = $frameGrid.find("#" + gridId).jqGrid('getCell', rowid, "introduceNum");
        var hasImport = $frameGrid.find("#" + gridId).jqGrid('getCell', rowid, "hasImport");
        $frameGrid.find("#" + gridId).jqGrid('setCell', rowid, "notIntroduceNum", (reviewsNum * 1 - hasImport * 1 - objs.length - introduceNum * 1));
        $frameGrid.find("#" + gridId).jqGrid('setCell', rowid, "imeiList", JSON.stringify(objs));

        var storageId = $frameGrid.find("#" + gridId).jqGrid('getCell', rowid, "storageId");
        var storageName = $frameGrid.find("#" + gridId).jqGrid('getCell', rowid, "storageName");
        var notIntroduceNum = $frameGrid.find("#" + gridId).jqGrid('getCell', rowid, "notIntroduceNum");
        $frameGrid.find("#" + gridId).jqGrid('setCell', rowid, "storageName", storageName);
        var storageIdListAll = []
        var storageList = document.orderReferenceFrame.sotrageList
        var storageArr = []
        $.each(storageList, function (k, v) {
            storageArr.push(v.split(',')[0])
        })
        var ids = dataGrid.$grid.getDataIDs();
        var goodsNumber = objs.length
        var imeiListGrid = objs
        $.each(ids, function (k, v) {
            var storageNameGrid = dataGrid.$grid.jqGrid('getCell', v, "storageName")
            var goodsIdGrid = dataGrid.$grid.jqGrid('getCell', v, "goodsId")
            if (storageNameGrid == storageName) {
                var goodsId = $frameGrid.find("#" + gridId).jqGrid('getCell', rowid, "goodsId")
                if (goodsIdGrid == goodsId) {
                    imeiListGrid = JSON.parse(dataGrid.$grid.jqGrid('getCell', v, "imeiList"))
                    $.each(objs, function (k, v) {
                        imeiListGrid.push(v)
                    })

                    var hasImportGrid = dataGrid.$grid.jqGrid('getCell', v, "goodsNumber") * 1
                    goodsNumber += hasImportGrid
                    return
                }
            }
        })

        storageIdListAll.push({
            goodsNumber: goodsNumber,
            id: storageId,
            name: storageName,
            imeiList: imeiListGrid
        })

        $frameGrid.find("#" + gridId).jqGrid('setCell', rowid, "storageIdList", JSON.stringify(storageIdListAll));
        delete currRow["op"];
        currRow.imeiList = objs;

        inputImeiGrid33Array["I" + currRow.id] = currRow;
        Summary();
    }
}

//获取 订单引入，单据明细的串号数据
function getFrameDataGrid2List() {
    var $domId = $("#orderReferenceModal .referenceFrame").contents().find("#dataGrid2")
    var ids = $domId.getDataIDs();
    var returnArr = [];
    $.each(ids, function (i, value) {
        var currRow = $domId.jqGrid('getRowData', value);
        if (currRow.ifManageImei == 'true' && $.trim(currRow.storageIdList) != '') {
            var storageIdList = JSON.parse(currRow.storageIdList);
            for (var int = 0; int < storageIdList.length; int++) {
                var storageInfo = storageIdList[int];
                if ("" != $.trim(storageInfo.imeiList)) {
                    //串号商品
                    returnArr["I" + i + storageInfo.id] = storageInfo;
                }
            }

        }
    })
    return returnArr;
}

//点击保存明细事件
function canelSaveImeiInput() {

    $('#imeiInputModal').modal('hide');
}

//往来单位余额
function initWLDWamount(id) {
    var obj = {
        data: {
            contactUnitId: id,
        },
        success: function (data) {
            var amount = data.data.contactUnitAmountVo;
            $("#yingFu").val(amount.shouldPayBalance.toFixed(2));
            $("#yuFu").val(amount.prePayBalance.toFixed(2));
            initData = getPageData();
        }
    }
    InterfaceInventory.common.getContactUnitAmountVo(obj)
}

//不能为负数验证
$(document).on('blur', '.discount', function () {
    var $m = $('.echMoney').val();
    if (Number($m) >= 0) {
        //alert('dayu')
    } else {
        $.MsgBox('金额验证提示', '未付金额不能为负数');
    }
})
