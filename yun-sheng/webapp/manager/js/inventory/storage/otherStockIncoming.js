var imeiInputObj = null;//串号录入（对象）
var signName = '其他入库单'
$(function () {
    var EventList = $({});//总线
    EventList.on({
        clearAll: function () {//清空表格内容
            $('#billsHeader input,#collapseExample input').val('');
            $('#DepartmentName,#contactName').data('id', null);
            $('#managersName').val('').removeData()
            $("#grid").jqGrid("clearGridData");
        },
        draftSign: function () {//草稿单状态
            $('.slideThree').css('background', '#D09E85');
            $('#billsDateString,#remark,#incomingType,#otherOutstroNumIdStr,.imeiImport,#save,#deliver,#print,#del').prop('disabled', false);
            $('#abandon,#print,#copy').prop('disabled', true);
            $('.inputAssPlus,.del,#add').css({
                'width': 'auto',
                'overflow': 'hidden'
            })
            $('#billsStautsImg1').hide()
            $('#billsStautsImg2').hide()
            $("#slideThree").prop('checked', false)
            reloadMenuBtn()
        },
        draftSignNull: function () {//草稿未查到数据状态
            $('.slideThree').css('background', '#D09E85');
            $('#billsDateString,#remark,#incomingType,#otherOutstroNumIdStr,.imeiImport,#save').prop('disabled', false);
            $('#del,#deliver,#abandon,#print,#copy').prop('disabled', true);
            $('.inputAssPlus,.del,#add').css({
                'width': 'auto',
                'overflow': 'hidden'
            })
            $('#billsStautsImg1').hide()
            $('#billsStautsImg2').hide()
            $("#slideThree").prop('checked', false)
            reloadMenuBtn()
        },
        formalSign: function () {//正式状态
            $('.slideThree').css('background', '#8BAEC7');
            $('#billsHeader input,#billsHeader select,#collapseExample input,#otherOutstroNumIdStr,.imeiImport,#deliver,#del').prop('disabled', true);
            $('#abandon,#remark,#save,#print,#copy').prop('disabled', false);
            $('.inputAssPlus,.del,#add').css({
                'width': 0,
                'overflow': 'hidden'
            })
            $('#filtrationChoose .inputAssPlus').css({
                'width': 'auto',
                'overflow': 'hidden'
            })
            $('#billsStautsImg1').show()
            $('#billsStautsImg2').hide()
            $("#slideThree").prop('checked', true)
            reloadMenuBtn()
        },
        formalSignNull: function () {//正式未查询到数据状态
            $('.slideThree').css('background', '#8BAEC7');
            $('#billsHeader input,#billsHeader select,#collapseExample input,#otherOutstroNumIdStr,.imeiImport,#deliver,#del,#abandon,#save,#remark,#print,#copy').prop('disabled', true);
            $('.inputAssPlus,.del,#add').css({
                'width': 0,
                'overflow': 'hidden'
            })
            $('#filtrationChoose .inputAssPlus').css({
                'width': 'auto',
                'overflow': 'hidden'
            })
            $('#billsStautsImg1').hide()
            $('#billsStautsImg2').hide()
            $("#slideThree").prop('checked', true)
            reloadMenuBtn()
        },
        redSign: function () {//作废状态
            $('.slideThree').css('background', '#8BAEC7');
            $('#billsHeader input,#billsHeader select,#collapseExample input,#save,#print,#otherOutstroNumIdStr,.imeiImport,#deliver,#abandon').prop('disabled', true);
            $('#print').prop('disabled', false);
            $('.inputAssPlus,.del,#add').css({
                'width': 0,
                'overflow': 'hidden'
            })
            $('#filtrationChoose .inputAssPlus').css({
                'width': 'auto',
                'overflow': 'hidden'
            })
            $('#billsStautsImg1').hide()
            $('#billsStautsImg2').show()
            $("#slideThree").prop('checked', true)
            reloadMenuBtn()
        }
    })
    //表格
    $.jgrid.defaults.width = 1280;
    $.jgrid.defaults.responsive = true;
    $.jgrid.defaults.styleUI = 'Bootstrap';
    var lastrow = null, lastcell = null;
    imeiInputObj = new comImeiInputModal();
    init()

    // 初始化
    function init() {
        initMenuBtn()
        initMenu()
        initFilter()
        initTopForm()
        initTable()
        initRender();
        getAuthList(function () {
        })
        var billsId = $.trim(functionObjExtent.getQueryString('billsId'));
        if (billsCode != '') {
            $("#slideThree").prop('checked', true)
            $('#isDraft').val(0)
            $('#selBillsCode').val(billsCode)
            billSearch("", '', billsId, function () {
                var copyFlag = functionObjExtent.getQueryString('copyFlag');
                if (copyFlag == 1) {
                    $('#copy').trigger('click')
                }

            })
        }
        else {
            //草稿单据

            if (billsId != "") {

                $("#slideThree").prop('checked', false)
                $('#isDraft').val(1)
                billSearch('', '', billsId, '')
            } else {
                getDefaultValues()
                $("#add").trigger('click')
            }
        }
    }

    //初始化菜单栏
    function initMenu() {
        //打印本单串号
        $('#printAllImei').bind('click', function () {
            var ids = $('#grid').jqGrid('getDataIDs');
            var selArr = getImieData(ids);
            printSelImei(selArr, 'all');
        })
        //打印所选商品串号
        $('#printSelImei').bind('click', function () {
            //获取多选到的id集合
            var ids = $('#grid').jqGrid('getGridParam', 'selarrrow');
            if (ids == "dataGrid_addRowId" || ids == "") {
                $.zxsaas_plus.showalert("提示", '请先选中指定商品!');
                return;
            }
            var selArr = getImieData(ids);
            printSelImei(selArr);
        })

        function getImieData(ids) {
            var selArr = [];
            //遍历访问这个集合
            $(ids).each(function (index, id) {
                //由id获得对应数据行
                var row = $('#grid').jqGrid('getRowData', id);
                if ($.trim(row.detailList) != "") {
                    var imeiList = JSON.parse(row.detailList);
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

        //查询
        $('.billSearch').click(function () {
            var _thisCode = $(this).data('code');
            billSearch(_thisCode, function () {
                switch (_thisCode) {
                    case 'F':
                        $.zxsaas_plus.showalert('error', '未查询到单据!');
                        break;
                    case 'P':
                        $.zxsaas_plus.showalert('error', '没有上一单了!');
                        break;
                    case 'N':
                        $.zxsaas_plus.showalert('error', '没有下一单了!');
                        break;
                    case 'L':
                        $.zxsaas_plus.showalert('error', '未查询到单据!');
                        break;
                }
            })
        })
        //新增
        $('#new').click(function () {
            window.location.href = basePath + '/inventory/storage/stock/other/incoming/main';
        })
        //保存
        $('#save').click(function () {
            var canSave = true;
            var pc = true;
            $("#grid").jqGrid('saveCell', lastrow, lastcell);
            var obj = billsData(), urlParam = null, canSave = true;
            if (!obj.sectionId) {
                $.zxsaas_plus.showalert('warning', '部门为空!');
                return false;
            }
            if (!obj.billsDateStr) {
                $.zxsaas_plus.showalert('warning', '未填写日期!');
                return false;
            }
            if (!obj.detailList.length) {
                $.zxsaas_plus.showalert('warning', '表格为空!');
                return false;
            }
            var ids = $("#grid").jqGrid("getDataIDs");
            $.each(ids, function (i, val) {
                var rowDataGoodsPrice = $("#grid").jqGrid("getRowData", val).price;
                var rowDataGoodsNum = $("#grid").jqGrid("getRowData", val).goodsNumber;
                if (rowDataGoodsNum <= 0) {
                    canSave = false;
                }
                if (rowDataGoodsPrice < 0) {
                    pc = false;
                }
            })
            if (canSave == false) {
                $.zxsaas_plus.showalert('提示', '数量不能为0!');
                return false;
            }
            if (pc == false) {
                $.zxsaas_plus.showalert('提示', '单价不能为负数!');
                return false;
            }
            var $p = $('#grid').getCol('price');
            //判断价格是否为0
            var flag = false;
            for (var int = 0; int < $p.length; int++) {
                if ($.parseFloat($p[int]) == 0) {
                    flag = true
                }
            }
            if (flag == true) {
                $.zxsaas_plus.showconfirm('提示', '单据中存在价格为0的商品，是否确认保存', function () {
                    saveOtherIn()
                }, function () {
                    return;
                })
            } else {
                saveOtherIn()
            }

            function saveOtherIn() {
                if (canSave) {
                    if ($('#isDraft').val() == 1) {//草稿
                        var queryKey = '';
                        for (var i = 0; i < obj.detailList.length; i++) {
                            var detailItem =obj.detailList[i];
                            if ($.isArray(detailItem.detailList)) {
                                for (var j = 0; j < detailItem.detailList.length; j++) {
                                    var itemItem = detailItem.detailList[j];
                                    var itemStr = itemItem.imei;
                                    if ($.trim(itemItem.auxiliaryImei) != '') {
                                        itemStr += ',' + itemItem.auxiliaryImei;
                                    }
                                    queryKey += itemStr + ';'
                                }
                            }
                        }
                        if (queryKey != '') {
                            queryKey = queryKey.substr(0, queryKey.length - 1);
                            $.validateImeiExisting({
                                queryKey: queryKey,
                                menuCode: $('#AUTH').data('code'),
                                sectionId: $("#DepartmentName").data('id'),
                                save: saveDraft
                            })
                        } else {
                            saveDraft()
                        }


                        function saveDraft() {
                            urlParam = $('#billsId').val() == '' ? 'auth_add' : 'auth_update';
                            $.request({
                                type: 'post',
                                url: basePath + '/inventory/storage/stock/other/incoming/saveDraftOrder/' + urlParam,
                                data: {order: JSON.stringify(obj)},
                                dataType: 'json',
                                success: function (data) {
                                    if (data.result == 1) {
                                        $('#billsId').val(data.data.orderId);
                                        if (data.data.orderId) {
                                            footDataRender(true, {
                                                billsId: data.data.orderId,
                                                isDraft: $('#isDraft').val()
                                            })
                                        }
                                        EventList.trigger('draftSign');
                                        $.zxsaas_plus.showalert('success', '保存成功！');
                                    } else {
                                        $.zxsaas_plus.showalert('error', data.desc);
                                    }
                                },
                                error: function () {
                                    alert('请求失败！')
                                }
                            })
                        }
                    }
                    else {//正式
                        $.request({
                            type: 'post',
                            url: basePath + '/inventory/storage/stock/other/incoming/updateOfficialOrder',
                            data: {order: JSON.stringify(obj)},
                            dataType: 'json',
                            success: function (data) {
                                if (data.result == 1) {
                                    $('#billsId').val(data.data.orderId);
                                    if (data.data.orderId) {
                                        footDataRender(true, {
                                            billsId: data.data.orderId,
                                            isDraft: $('#isDraft').val()
                                        })
                                    }

                                    $.zxsaas_plus.showalert('success', '保存成功！');
                                } else {
                                    $.zxsaas_plus.showalert('error', data.desc);
                                }
                            },
                            error: function () {
                                alert('请求失败！')
                            }
                        })
                    }
                }
            }
        })
        //删除
        $("#del").click(function () {
            $.zxsaas_plus.showconfirm('提示', '确定删除此草稿单?', function () {
                $.request({
                    type: 'post',
                    url: basePath + '/inventory/storage/stock/other/incoming/deleteDraftOrder',
                    data: {ids: $('#billsId').val()},
                    dataType: 'json',
                    success: function (data) {
                        if (data.result == 1) {
                            $.zxsaas_plus.showalert('success', '删除成功!');
                            EventList.trigger('clearAll');
                            $('#isDraft').val(1)
                            billSearch('L', function () {
                                EventList.trigger('draftSignNull');
                                $.zxsaas_plus.showalert('error', '未查询到单据!');
                            })

                        } else {
                            $.zxsaas_plus.showalert('error', data.desc);
                        }
                    },
                    error: function () {
                        alert('请求失败！')
                    }
                })
            });
        })
        //过账
        $('#deliver').click(function () {
            var $p = $('#grid').getCol('price');
            //判断价格是否为0
            var flag = false;
            for (var int = 0; int < $p.length; int++) {
                if ($.parseFloat($p[int]) == 0) {
                    flag = true
                }
            }
            if (flag == true) {
                $.zxsaas_plus.showconfirm('提示', '单据中存在价格为0的商品，是否确认过账', function () {
                    otherIn()
                }, function () {
                    return;
                })
            } else {
                otherIn()
            }

            function otherIn() {
                $.request({
                    type: 'post',
                    url: basePath + '/inventory/storage/stock/other/incoming/executeDraftOrder',
                    data: {
                        id: $('#billsId').val(),
                        isDraft: $('#isDraft').val()
                    },
                    dataType: 'json',
                    success: function (data) {
                        if (data.result == 1) {
                            $('#isDraft').val(0)
                            var res = data.data.order;
                            drawGrid(res)
                            $('#slideThree').prop('checked', true);
                            $.zxsaas_plus.showalert('success', '过账成功!');
                        } else {
                            $.zxsaas_plus.showalert('error', data.desc);
                        }
                    },
                    error: function () {
                        alert('请求失败！')
                    }
                })
            }
        })
        //红冲
        $('#abandon').click(function () {
            $('#hcModal').modal('show')
			var min = CompareDate(_authList.minDate, $("#billsDateString").val()) ? _authList.minDate : $("#billsDateString").val();
			$('#hcTime').datetimepicker({
				lang:"ch",           //语言选择中文
				format:"Y-m-d",      //格式化日期
				timepicker:false,    //关闭时间选项
				todayButton:false,    //关闭选择今天按钮
				maxDate:_authList.maxDate,
				minDate: min,
				value: min
			});
        })
        $('.sureRed').click(function () {
            $.request({
                type: 'post',
                url: basePath + '/inventory/storage/stock/other/incoming/redOfficialOrder',
                data: {
                    id: $('#billsId').val(),
                    redDateStr: $('#billsDateString').val()
                },
                dataType: 'json',
                success: function (data) {
                    if (data.result == 1) {
                        var res = data.data.order;
                        $('#billsStatus').val(res.billsStatus);
                        billSearch('', '', res.orderId)
                        EventList.trigger('redSign');
                        $.zxsaas_plus.showalert('success', '红冲成功!');
                        $('#hcModal').modal('hide')
                    } else {
                        $.zxsaas_plus.showalert('error', data.desc);
                    }
                },
                error: function () {
                    alert('请求失败！')
                }
            })
        })
        //打印
        $('.printOpt').click(function () {
            var templateURL = basePath + '/inventory/storage/stock/other/incoming/print';
            var paras = {
                isDraft: $('#isDraft').val(),
                billsId: $('#billsId').val(),
                printType: $(this).data('type')
                // checkCost:hasPermissions
            };
            $.printBills(templateURL, paras)
        })
        //过滤
        $('#filter').click(function () {
            $('#filtrationChoose').modal('show');
        })

        //复制
        $('#copy').click(function () {
            var code = $('#billsCode').val()
            if (code.indexOf('_R') > -1) {
                $.zxsaas_plus.showalert('error', '红冲R单据不允许复制!');
                return;
            }
            EventList.trigger('draftSign');
            $('#slideThree').prop('checked', false);
            //清空底部信息
            $('#bottomForm')[0].reset()
            $("#billsHeader input[name='billsCode']").val('')
            $('#billsId').val('')
            $('#isDraft').val(1)
            $('#billsStatus').val('')
        })
        //状态切换按钮
        $("#slideThree").click(function () {//单据切换按钮
            if ($('#isDraft').val() == 1) {
                EventList.trigger('clearAll');
                $('#isDraft').val(0);
                $('.imeiImport').attr('disabled', true);
                billSearch('L', function () {
                    EventList.trigger('formalSignNull');
                    $.zxsaas_plus.showalert('error', '未查询到单据!');
                })
            } else {
                EventList.trigger('clearAll');
                $('#isDraft').val(1);
                $('.imeiImport').attr('disabled', false);
                billSearch('L', function () {
                    EventList.trigger('draftSignNull');
                    $.zxsaas_plus.showalert('error', '未查询到单据!');
                })
            }
        })
    }

    // 初始化 过滤
    function initFilter() {
        //过滤窗筛选条件
        $('#startTimeStr').inputCombination().click(function () {
            $(this).datetimepicker({
                maxDate: $('#endTimeStr').val()
            })
        });
        $('#startTimeStr').datetimepicker({
            lang: "ch", //语言选择中文
            format: "Y-m-d", //格式化日期
            timepicker: false, //关闭时间选项
            todayButton: false,//关闭选择今天按钮
        })
        $('#endTimeStr').inputCombination().click(function () {
            $(this).datetimepicker({
                minDate: $('#startTimeStr').val()
            })
        })
        $('#endTimeStr').datetimepicker({
            lang: "ch", //语言选择中文
            format: "Y-m-d", //格式化日期
            timepicker: false, //关闭时间选项
            todayButton: false,//关闭选择今天按钮
        })
        $('#filterSectionName').storePlu({
            isStoreShow: false,
            isLoadDefaultName: 0,
            checkMore: true,
            search: false,
            ifStore: false, // 控制部门选项
            changeStore: function () {
                var $obj = $("#filterSectionName");
                $obj.data('id', $obj.data('sectionId'))
            }
        }).inputCombination()
        $('#selBillsCode,#selRemark,#selImei').inputCombination();
        $('#filSearch').click(function () {
            $('#filtrationChoose').modal('hide');
            $('#first').click()
        })
        $('#filReset').click(function () {//过滤重置
            var inputs = $('#filterForm').find('input');
            $.map(inputs, function (item, index) {
                $(item).val('').data('id', null);
            });
        })
    }

    // 初始化 顶部表单
    function initTopForm() {
        //单据日期
        $('#billsDateString').datePlu({
            ajaxOpt: {
                async: false,
            },
            endDate: false,
        });
        //备注

        $("#DepartmentName").storePlu({
            isStoreShow: false,
            isLoadDefaultName: 0,
            checkMore: false,
            search: false,
            ifStore: false, // 控制部门选项
            changeStore: function () {
                var $obj = $("#DepartmentName");
                $obj.data('id', $obj.data('sectionId'))
                $('#managersName').val('').removeData()
                $("#grid").jqGrid("clearGridData");
                InterfaceInventory.common.getDefaultStorgeList({
                    data: {sectionId: $obj.data('sectionId')},
                    success: function (data) {
                        var storageList = data.data.storageList || []
                        var storageItem = storageList[0] || {}
                        $('#grid').jqGrid('addRowData', 1, {
                            storageName: storageItem.name,
                            storageId: storageItem.storageId
                        });
                        gridSum()
                    }
                })
            }
        });
        //经办人
        $("#managersName").comModalsEmployeeBySection({
            sectionIds: '#DepartmentName'
        })
        //往来单位
        $("#contactName").comModalsContactUnit()
        requestIncomingType(false)
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
                        $('#save').trigger('click')
                    }
                },
                draftDel: {
                    isShow: isDraftOp,
                    click: function () {
                        $('#del').trigger('click')
                    }
                },
                draftPost: {
                    isShow: !isDraftOp,
                    click: function () {
                        $('#deliver').trigger('click')
                    }
                },
                red: {
                    isShow: !isDraftOp,
                    click: function () {
                        $('#abandon').trigger('click')
                    }
                },
                printDropdown: {
                    isShow: !isDraftOp,
                    list: [{
                        name: '商品汇总',
                        click: function () {
                            print('numberDetail')
                        }
                    }, {
                        name: '商品明细',
                        click: function () {
                            print('imeiDetail')
                        }
                    }]
                },
                printImeiDropdown: {
                    isShow: !isDraftOp,
                    list: [{
                        name: '打印本单串号',
                        click: function () {
                            $('#printAllImei').trigger('click')
                        }
                    }, {
                        name: '打印所选商品串号',
                        click: function () {
                            $('#printSelImei').trigger('click')
                        }
                    }]
                },
                copy: {
                    isShow: !isDraftOp,
                    click: function () {
                        $('#copy').trigger('click')
                    }
                },
                audit: {
                    isShow: !isDraftOp,
                    click: function () {
                        var topFormObj = $(".gridTop").toJsonObject();
                        $.ajaxPackage({
                            url: '/manager/jxc/storage/allocate/documentList/updateIsAudit',
                            data: {
                                'billsId': topFormObj.billsId,
                                'auditStatus': 1,
                            },
                            success: function (data) {
                                $.zxsaas_plus.showalert('success', "稽核成功");
                                billSearch('', '', topFormObj.billsId)
                            }
                        })
                    }
                },
                auditCancle: {
                    isShow: !isDraftOp,
                    click: function () {
                        var topFormObj = $(".gridTop").toJsonObject();
                        $.ajaxPackage({
                            url: '/manager/jxc/storage/allocate/documentList/updateIsAudit',
                            data: {
                                'billsId': topFormObj.billsId,
                                'auditStatus': 0,
                            },
                            success: function (data) {
                                $.zxsaas_plus.showalert('success', "取消稽核成功");
                                billSearch('', '', topFormObj.billsId)
                            }
                        })
                    }
                },
                update: {
                    isShow: !isDraftOp,
                    click: function () {
                        $('#save').trigger('click')
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
        menuBtn = new componentMenuBtn("#MenuTool", option);

        //打印
        function print(type) {
            var templateURL = basePath + '/inventory/storage/stock/other/incoming/print';
            var paras = {
                isDraft: $('#isDraft').val(),
                billsId: $('#billsId').val(),
                printType: type
            };
            $.printBills(templateURL, paras)
        }
    }

    //重载菜单组件
    function reloadMenuBtn() {
        var isDraftOp = !$("#slideThree").is(':checked')
        var updateKey = ['printDropdown', 'printImeiDropdown', 'red', 'copy', 'update', 'audit', 'auditCancle'];
        var addkey = ['draftDel', 'draftSave', 'draftPost'];
        var params = $("#billsHeader").toJsonObject();
        var isAudit = $.trim(params.auditStatus)
        var billsStatus = $.trim(params.billsStatus)
        $.pageDetailCommon.reloadMenuTool({
            isDraftOp: isDraftOp,
            isAudit: isAudit,
            billsStatus: billsStatus,
            menuBtn: menuBtn,
            billsCode: params.billsCode,
            updateKey: updateKey,
            addkey: addkey,
        })
        //判断是否禁用
        if (isDraftOp == false) {
            //单据：稽核状态
            if (isAudit == 1) {
                $('#auditImg').attr('src', '/manager/images/audit.png');
            } else {
                $('#auditImg').attr('src', '/manager/images/auditNo.png');
            }
            $('#grid').setGridParam().hideCol("deliveryDo");
            $('.moveFlag').hide()
        } else {
            $('#auditImg').attr('src', '')
            $('#grid').setGridParam().showCol("deliveryDo");
            $('.moveFlag').show()
        }
        $('#grid').setColProp('storageName', {editable: !!isDraftOp})
        $('#grid').setColProp('goodsName', {editable: !!isDraftOp})
        $('#grid').setColProp('goodsNumber', {editable: !!isDraftOp})
        $('#grid').setColProp('price', {editable: !!isDraftOp})
    }

    // 初始化表格
    function initTable() {
        $('#grid').jqGrid({
            datatype: "local",
            colNames: ['操作', '<i class="bitianX">*</i>仓库名称', '<i class="bitianX">*</i>商品名称', '<i class="bitianX">*</i>数量', '串号明细', '<i class="bitianX">*</i>单价', '总金额', '备注',
                '类别', '商品编码', '品牌', '型号', '颜色', '仓库id', 'goodsId', '是否管理串号',
                '是否含辅助串号', '串号长度', '辅助串号长度', '明细id'],
            colModel: [
                {
                    name: 'deliveryDo',
                    index: 'deliveryDo',
                    width: 80,
                    align: 'center',
                    formatter: addAndDelete,
                    sortable: false
                },
                {
                    name: 'storageName',
                    index: 'storageName',
                    width: 150,
                    align: 'left',
                    sorttype: 'string',
                    sortable: false,
                    editable: true,
                    edittype: 'custom',
                    editoptions: {
                        custom_element: function (value, option) {
                            return '<input value="' + value + '" readonly="readonly" class="form-control" /><span class="ckmc glyphicon glyphicon-plus" style="margin-left:-40px;margin-top:-25px;"></span>'
                        },
                        custom_value: function (value) {
                            return value.val();
                        }
                    }
                },
                {
                    name: 'goodsName',
                    index: 'goodsName',
                    width: 200,
                    align: 'left',
                    sorttype: 'string',
                    sortable: false,
                    editable: true,
                    edittype: 'custom',
                    editoptions: {
                        custom_element: function (value, options) {
                            return '<input value="' + value + '" type="text" readonly="readonly" class="form-control"/><span style="margin-top:-25px;margin-left:-40px;" class="spmc glyphicon glyphicon-plus colspan2" ></span></span>';
                        },
                        custom_value: function (value) {
                            return value.val();
                        }
                    }
                },
                {
                    name: 'goodsNumber',
                    index: 'goodsNumber',
                    width: 100,
                    align: 'right',
                    sorttype: 'integer',
                    formatter: 'number',
                    formatoptions: {decimalPlaces: 0},
                    editable: true,
                    sortable: false,
                    editoptions: {

                        dataEvents: [{
                            type: "blur",
                            fn: function () {
                                $("#grid").jqGrid("saveCell", lastrow, lastcell);
                            }
                        }, {
                            type: "focus",
                            fn: function () {
                                this.select()
                            }
                        }
                        ]
                    }
                },
                {name: 'detailList', index: 'detailList', hidden: true},
                {
                    name: 'price',
                    index: 'price',
                    width: 100,
                    align: 'right',
                    formatter: 'number',
                    editable: true,
                    sortable: false,
                    editoptions: {
                        onkeyup: "checkInput.checkNum(this,12)",
                        dataEvents: [{
                            type: "blur",
                            fn: function () {
                                $("#grid").jqGrid("saveCell", lastrow, lastcell);
                            }
                        }, {
                            type: "focus",
                            fn: function () {
                                this.select()
                            }
                        }]
                    }
                },
                {name: 'amount', index: 'amount', width: 100, align: 'right', sortable: false, formatter: 'number'},
                {
                    name: 'remark',
                    index: 'remark',
                    width: 300,
                    align: 'left',
                    sorttype: 'string',
                    editable: true,
                    sortable: false,
                    editoptions: {
                        dataEvents: [{
                            type: "blur",
                            fn: function () {
                                $("#grid").jqGrid("saveCell", lastrow, lastcell);
                            }
                        }, {
                            type: "focus",
                            fn: function () {
                                this.select()
                            }
                        }]
                    }
                },
                {name: 'categoryName', index: 'categoryName', width: 100, align: 'left', sortable: false},
                {name: 'code', index: 'code', width: 160, align: 'left', sortable: false},
                {name: 'brandName', index: 'brandName', width: 140, align: 'left', sortable: false},
                {name: 'models', index: 'models', width: 100, align: 'left', sortable: false},
                {name: 'color', index: 'color', width: 100, align: 'left', sortable: false},

                {name: 'storageId', index: 'storageId', hidden: true},
                {name: 'goodsId', index: 'goodsId', hidden: true},
                {name: 'ifManageImei', index: 'ifManageImei', hidden: true},
                {name: 'ifEnableAuxiliaryImei', index: 'ifEnableAuxiliaryImei', hidden: true},
                {name: 'imeiLength', index: 'imeiLength', hidden: true},
                {name: 'auxiliaryImeiLength', index: 'auxiliaryImeiLength', hidden: true},
                {name: 'id', hidden: true},
            ],
            sortable: false,
            rownumbers: true,
            cellsubmit: 'clientArray', //单元格保存内容的位置
            editurl: 'clientArray',
            viewrecords: true,
            multiselect: true,
            cellEdit: true,
            width: "100%",
            height: 350,
            autowidth: true,
            rownumWidth: 35,
            shrinkToFit: false,
            footerrow: true,
            userDataOnFooter: true,
            ondblClickRow: function (id) {
            },
            beforeEditCell: function (rowid, cellname, v, iRow, iCol) {
                lastrow = iRow;
                lastcell = iCol;
            },
            afterSaveCell: function (rowid, name, val, iRow, iCol) {
                var currRow = $('#grid').jqGrid('getRowData', rowid);
                if (name == 'goodsNumber' && currRow.ifManageImei == "0" && currRow.goodsName != "") {
                    if ($.parseInt(val) < 0) {
                        $.MsgBox('错误提示', '不允许小于0！');
                        $('#grid').jqGrid('setCell', rowid, "goodsNumber", '0');
                    }
                }
                gridSum()
            },
            onCellSelect: function (rowid, index, cellcontent, e) {
                var curColName = $.trim($(e.target).attr('aria-describedby')).replace('grid_', '');
                if (curColName == 'goodsNumber') {
                    $("#grid").jqGrid("saveCell", lastrow, lastcell);
                    var rowData = $('#grid').jqGrid("getRowData", rowid);
                    var ifim = rowData.ifManageImei;
                    if (ifim == 1) {//串号管理
                        $(this).setColProp('goodsNumber', {editable: false});
                        openImeiInputModal(rowid)
                        return;
                    } else {
                        $(this).setColProp('goodsNumber', {editable: true});
                    }
                }
            },
            onSelectRow: function (id) {
            },
            afterInsertRow: function (rowid, e) {
                //这里需要推迟执行，需要先执行表格的进入不可编辑状态
                setTimeout(function () {
                    //添加一行之后，需要把上一个行的仓库也带到本行中 , 这里可能是订单引入，订单引入，这里不需要（把上一个行的仓库也带到本行中）；
                    if (rowid > 1) {
                        var prevRowData = $('#grid').jqGrid('getRowData', rowid - 1);
                        var curRowData = $('#grid').jqGrid('getRowData', rowid);
                        if (prevRowData.storageId != "" && curRowData.storageId == "") {
                            $('#grid').jqGrid('setCell', rowid, 'storageId', prevRowData.storageId);
                            $('#grid').jqGrid('setCell', rowid, 'storageName', prevRowData.storageName);
                        }
                    }
                }, 0)
            },

            gridComplete: function () {
                $('.moveFlag').remove();
                var tdListTime = $('#grid').getGridParam('colModel');
                var tdHtml = $.map(tdListTime, function () {
                    return '<td></td>'
                }).join(" ");
                var html = "<tr class='moveFlag' style='height:40px;outline-style:none;'><td><span id='add' class='glyphicon glyphicon-plus-sign'></span></td>" + tdHtml + "</tr>"
                $('#grid tbody').append(html);
            },
            loadComplete: function (data) {
            }
        })

        function addAndDelete(cellvalue, options, rowObjec) {
            var addAndDel = '<div class="operating"></span><span class="del glyphicon glyphicon-trash"></span></div>';
            return addAndDel;
        }

        //增删
        $(document).on('click', '#add', function (e) {
            var ids = $("#grid").getDataIDs();
            var maxId = ids.length == 0 ? 0 : Math.max.apply(null, ids);
            $('#grid').jqGrid('addRowData', maxId + 1, {
                storageName: '',
                goodsName: '',
                stockNumber: 0,
                goodsNumber: 0,
                remark: '',
                price: 0
            }, 'last');
        });
        $(document).on('click', '.del', function (e) {
            var rowId = $("#grid").jqGrid("getGridParam", "selrow");
            $('#grid').jqGrid('delRowData', rowId);
            gridSum();
        });
        //仓库选择
        $(document).on('click', '.ckmc', function () {
            if ($('#DepartmentName').data('id') != undefined) {
                $.request({
                    type: 'post',
                    url: basePath + '/inventory/common/getStorageVoList',
                    dataType: 'json',
                    data: {
                        sectionId: $('#DepartmentName').data('id')
                    },
                    success: function (data) {
                        if (data.result == 1) {
                            var res = data.data.storageVoList;
                            if (!res.length) {
                                $.zxsaas_plus.showalert('warning', '条目为空！');
                            } else {
                                $('#ckmcChoose').modal('show');
                                $.fn.zTree.init($("#ckmcDataTree"), {
                                    data: {
                                        simpleData: {
                                            enable: true,
                                            idKey: "id",
                                            pIdKey: "parentId",
                                            rootPId: ''
                                        }
                                    },
                                    view: {
                                        showLine: true
                                    },
                                    callback: {
                                        onClick: function (event, treeId, treeNode) {
                                            if (treeNode.check_Child_State == -1) {
                                            }
                                        },
                                        onDblClick: function (event, treeId, treeNode) {
                                            if ($(event.target).is('span')) {
                                                if (treeNode.check_Child_State == -1) {
                                                    $("#grid").jqGrid("saveCell", lastrow, lastcell);
                                                    var rowId = $("#grid").jqGrid("getGridParam", "selrow");
                                                    $("#grid").setRowData(rowId, {
                                                        'storageName': treeNode.name,
                                                        "categoryName": '&nbsp',
                                                        "code": '&nbsp',
                                                        "brandName": '&nbsp',
                                                        "models": '&nbsp',
                                                        "color": '&nbsp',
                                                        'storageId': treeNode.storageId,
                                                        'goodsName': '&nbsp',
                                                        'goodsId': '&nbsp',
                                                        'goodsNumber': 0,
                                                        'detailList': '&nbsp',
                                                        'price': 0,
                                                        'amount': 0,
                                                        'ifManageImei': '&nbsp'
                                                    })
                                                    $('#ckmcChoose').modal('hide');
                                                }
                                            }
                                        }
                                    }
                                }, res);
                                $.fn.zTree.getZTreeObj("ckmcDataTree").expandAll(true);
                            }
                        } else {
                            $.zxsaas_plus.showalert('error', data.desc);
                        }
                    },
                    error: function () {
                        alert('请求失败！')
                    }
                })
            } else {
                $.zxsaas_plus.showalert('warning', '请选择部门！');
            }
        })
        //商品选择
        $(document).on('click', '.spmc', function () {
            var rowId = $("#grid").jqGrid("getGridParam", "selrow");
            var rowData = $("#grid").jqGrid("getRowData", rowId);
            if (rowData.storageId != '') {
                $.request({
                    type: 'post',
                    url: basePath + '/inventory/common/getGoodsClassTreeNodeVoList',
                    dataType: 'json',
                    data: {
                        sectionId: $('#DepartmentName').data('id'),
                        storageId: rowData.storageId
                    },
                    success: function (data) {
                        if (data.result == 1) {
                            var res = data.data.goodsClassVoList;
                            if (!res.length) {
                                $.zxsaas_plus.showalert('warning', '条目为空！');
                            } else {
                                ajaxDataFilter(res);
                                $('#goodsnameReferenceModal').modal('show');
                                $.fn.zTree.init($("#spmcDataTree"), {
                                    data: {
                                        simpleData: {
                                            enable: true,
                                            idKey: "id",
                                            pIdKey: "parentId",
                                            rootPId: ''
                                        }
                                    },
                                    view: {
                                        showLine: true
                                    },
                                    callback: {
                                        onClick: function (event, treeId, treeNode) {
                                            $("#proTable").jqGrid('setGridParam', {
                                                datatype: 'json',
                                                postData: {
                                                    sectionId: $('#DepartmentName').data('id'),
                                                    storageIds: rowData.storageId,
                                                    goodsCategoryIds: treeNode.id,
                                                    queryKey: $('#proSearch').val()
                                                }
                                            }).trigger("reloadGrid");
                                        }
                                    }
                                }, res);
                                // $.fn.zTree.getZTreeObj("spmcDataTree").expandAll(true);
                            }
                        } else {
                            $.zxsaas_plus.showalert('error', data.desc);
                        }
                    },
                    error: function () {
                        alert('请求失败！')
                    }
                })
                $('#goodsnameReferenceModal').modal('show');
                $("#proTable").jqGrid('setGridParam', {
                    datatype: 'json',
                    postData: {
                        sectionId: $('#DepartmentName').data('id'),
                        storageIds: rowData.storageId
                    }
                }).trigger("reloadGrid");
            } else {
                $.zxsaas_plus.showalert('warning', '请先选择仓库！');
            }
        })

        function ajaxDataFilter(responseData) {
            for (var i = 0, m = responseData.length; i < m; i++) {
                if (responseData[i].parentId == -2) {
                    responseData[i].open = true;
                } else {
                    responseData[i].open = false;
                }
            }
        }
    }

    //商品引用
    function initRender() {
        $('#proTable').jqGrid({
            url: basePath + '/inventory/common/getGoodsVoPageList',
            mtype: "post",
            datatype: "local",
            jsonReader: {
                root: "data.goodsVoList",
                total: "data.total",
                records: "data.records",
                repeatitems: false
            },
            colNames: ['编码', '商品名称', '类别', '品牌', '型号', '颜色', '是否串号管理', '计价方式', '库存数', '备注', '商品id', '串号id', '是否含辅助串号', '串号长度', '辅助串号长度'],
            colModel: [
                {name: 'code', index: 'code', align: 'center', sortable: true, width: 200},
                {name: 'name', index: 'name', align: 'center', sortable: true, width: 200},
                {name: 'categoryName', index: 'categoryName', align: 'center', sortable: true, width: 100},
                {name: 'brandName', index: 'brandName', align: 'center', sortable: true, width: 100},
                {name: 'models', index: 'models', align: 'center', sortable: true, width: 150},
                {name: 'color', index: 'color', align: 'center', sortable: true, width: 100},
                {
                    name: 'ifManageImei',
                    index: 'ifManageImei',
                    align: 'center',
                    sortable: true,
                    width: 100,
                    formatter: 'select',
                    editoptions: {value: "0:×;1:√"}
                },
                {
                    name: 'valuationMethods',
                    index: 'valuationMethods',
                    align: 'center',
                    sortable: true,
                    width: 200,
                    formatter: 'select',
                    editoptions: {value: "1:个别计价法;2:移动加权平均价"}
                },
                {name: 'stockCount', index: 'stockCount', align: 'center', sortable: true, width: 100, hidden: true},
                {name: 'remark', index: 'remark', align: 'center', sortable: true, width: 200},
                {name: 'goodsId', index: 'goodsId', hidden: true},
                {name: 'imeiId', index: 'imeiId', hidden: true},
                {name: 'ifEnableAuxiliaryImei', index: 'ifEnableAuxiliaryImei', hidden: true},
                {name: 'imeiLength', index: 'imeiLength', hidden: true},
                {name: 'auxiliaryImeiLength', index: 'auxiliaryImeiLength', hidden: true}
            ],
            sortable: true,
            rownumbers: true,
            cellsubmit: 'clientArray', //单元格保存内容的位置
            editurl: 'clientArray',
            rowNum: 100,
            rowList: [100, 200, 500],
            pager: '#proPager',
            viewrecords: true,
            multiselect: true,
            multiboxonly: false,
            cellEdit: false,
            width: "auto",
            height: 350,
            autowidth: true,
            rownumWidth: 35,
            shrinkToFit: false,
            footerrow: false,
            userDataOnFooter: true,
            ondblClickRow: function (rowid) {
                addGoodName([rowid]);
                return;
                $("#grid").jqGrid("saveCell", lastrow, lastcell);
                var row = $("#proTable").jqGrid("getRowData", rowid);
                var mainSelectID = $("#grid").getGridParam("selrow");
                $("#grid").setRowData(mainSelectID, {
                    'goodsName': row.name,
                    'goodsId': row.goodsId,
                    'stockCount': row.stockCount,
                    'ifManageImei': row.ifManageImei,
                    'goodsNumber': 0,
                    'detailList': '&nbsp',
                    'remark': row.remark,
                    'ifEnableAuxiliaryImei': row.ifEnableAuxiliaryImei,
                    'imeiLength': row.imeiLength,
                    'auxiliaryImeiLength': row.auxiliaryImeiLength,
                    "categoryName": row.categoryName,
                    "code": row.code,
                    "brandName": row.brandName,
                    "models": row.models,
                    "color": row.color
                })
                //添加串号图标
                if (row.ifManageImei == 1) {
                    $("#grid").jqGrid('setCell', mainSelectID, "goodsNumber", '', 'ifManageImeiIcon');
                } else {
                    $("#grid tr:eq(" + mainSelectID + ") td[aria-describedby='grid_goodsNumber']").removeClass('ifManageImeiIcon')
                }
                $('#goodsnameReferenceModal').modal('hide');
            },
            beforeEditCell: function (rowid, cellname, v, iRow, iCol) {
                lastrow = iRow;
                lastcell = iCol;
            },
            afterSaveCell: function (rowid, cellname, value, iRow, iCol) {
            },
            onCellSelect: function (id, index, e) {
            },
            onSelectRow: function (id) {
            },
            beforeSelectRow: function (rowid, e) {
            },
            afterInsertRow: function (rowid, aData) { //新增一行之后
            },
            gridComplete: function () {
                $('.moveFlag').remove();
                var tdListTime = $('#grid').getGridParam('colModel');
                var tdHtml = $.map(tdListTime, function () {
                    return '<td></td>'
                }).join(" ");
                var html = "<tr class='moveFlag' style='height:40px;outline-style:none;'><td><span id='add' class='glyphicon glyphicon-plus-sign'></span></td>" + tdHtml + "</tr>"
                $('#grid tbody').append(html);
                if ($("#slideThree").is(':checked')) {
                    $('.moveFlag').hide()
                } else {
                    $('.moveFlag').show()
                }
            },
            loadComplete: function (data) {
            },
            loadError: function (xhr, status, error) {
            }
        })
        $('#goodsnameReferenceModal').on('shown.bs.modal', function (e) {
            $('.modalRight div').css('width', 'auto')
        })
        $('#proSearch').keyup(function (e) {
            if (e.keyCode == 13) {
                var rowId = $("#grid").jqGrid("getGridParam", "selrow");
                var rowData = $("#grid").jqGrid("getRowData", rowId);
                $("#proTable").jqGrid('setGridParam', {
                    datatype: 'json',
                    postData: {
                        sectionId: $('#DepartmentName').data('id'),
                        storageIds: rowData.storageId,
                        queryKey: $('#proSearch').val()
                    }
                }).trigger("reloadGrid");
            }
        })
        //商品引用--- 确定按钮
        $('.goodsnameReferenceOk').bind('click', function () {
            var proSelIds = $('#proTable').jqGrid('getGridParam', 'selarrrow');
            addGoodName(proSelIds)
        })
    }


    function gridSum() {
        var $table = $("#grid");
        var ids = $table.getDataIDs();
        $.each(ids, function (i, value) {
            var currRow = $table.jqGrid('getRowData', value);
            $table.jqGrid('setCell', value, "amount", Number(currRow.price) * Number(currRow.goodsNumber));
        });

        var sum = $table.getCol('amount', false, 'sum');
        $table.footerData('set', {"amount": $.formatFloat(sum, 2)}, false);
        var sum1 = $("#grid").getCol('goodsNumber', false, 'sum');
        $table.footerData('set', {"goodsNumber": sum1}, false);
    }

    function openImeiInputModal(rowid) {
        var rowData = $('#grid').jqGrid("getRowData", rowid);
        var imeiList = [];
        if ($.trim(rowData.detailList) != "") {
            imeiList = JSON.parse(rowData.detailList);
        }
        imeiInputObj.setOption({
            imeiList: imeiList,
            goodsName: rowData.goodsName,
            goodsID: rowData.goodsId,
            currImeiLength: rowData.imeiLength.trim(), // 默认当前的串号长度
            currAuxliaryImeiLength: rowData.auxiliaryImeiLength.trim(),   // 默认当前的辅助串号长度
            isEnableAuxliaryImei: rowData.ifEnableAuxiliaryImei == "1" ? true : false,   // true:辅助串号， false :没有辅助串号
            isEdit: !$("#slideThree").is(':checked'),
            isAutoImei: true, //开启自动串号
            appenRowCallback: appenRowCallback,
            saveImeiInputCallback: saveImeiInputCallback,
            exportImeiInputCallback: exportImeiInputCallback
        });
        imeiInputObj.reLoadDom();
        imeiInputObj.showModal();
    }

    //串号录入: 追加一行
    function appenRowCallback(imei1, imei2) {
        //由于删除是 实时的，这里必须实时获取表格数据
        var imeiList = getImeiList();
        for (var i = 0; i < imeiList.length; i++) {
            for (var j = 0; j < imeiList[i].length; j++) {
                var item = imeiList[i][j];
                if (imei1 != '' && (imei1 == item.imei || imei1 == item.auxiliaryImei)) {
                    var desc = '本单据表体第' + (i + 1) + '行第' + (j + 1) + '列已录入过此串号:' + imei1;
                    $.zxsaas_plus.showalert('warning', desc);
                    return false;
                }
                if (imei2 != '' && (imei2 == item.imei || imei2 == item.auxiliaryImei)) {
                    var desc = '本单据表体第' + (i + 1) + '行第' + (j + 1) + '列已录入过此串号:' + imei2;
                    $.zxsaas_plus.showalert('warning', desc);
                    return false;
                }
            }
        }
        return true;
    }

    //串号录入: 点击 确定
    function saveImeiInputCallback(objs) {
        try {
            MyEiditGrid.currEditDataGrid.unAllEdit();
        } catch (e) {
        }
        $("#grid").jqGrid("setCell", $("#grid").getGridParam("selrow"), "goodsNumber", objs.length);
        $("#grid").jqGrid("setCell", $("#grid").getGridParam("selrow"), "detailList", JSON.stringify(objs));
        var tol = Number($("#grid").jqGrid("getRowData", $("#grid").getGridParam("selrow")).goodsNumber) * Number($("#grid").jqGrid("getRowData", $("#grid").getGridParam("selrow")).price);
        $("#grid").jqGrid("setCell", $("#grid").getGridParam("selrow"), "amount", tol);

        var sum_1 = $("#grid").getCol('goodsNumber', false, 'sum');
        $("#grid").footerData('set', {"goodsNumber": sum_1}, false);

        var tol = Number($("#grid").jqGrid("getRowData", $("#grid").getGridParam("selrow")).goodsNumber) * Number($("#grid").jqGrid("getRowData", $("#grid").getGridParam("selrow")).price);
        $("#grid").jqGrid("setCell", $("#grid").getGridParam("selrow"), "amount", tol);
        var sum = $("#grid").getCol('amount', false, 'sum');
        $("#grid").footerData('set', {"amount": sum}, false);
    }

    //串号录入: 导入
    function exportImeiInputCallback(exportArr) {
        var reLuru = '';
        var reLuruArr = [];
        var result = -1;
        //判断是否是引入的，如果是需要判断不能超过未引入量
        var imeiList = getImeiList()
        if (imeiList != [] && imeiList.length > 0 && result == -1) {
            for (var i = 0; i < imeiList.length; i++) {
                for (var j = 0; j < imeiList[i].length; j++) {
                    for (var k = 0; k < exportArr.length; k++) {
                        var item = exportArr[k];
                        var toval = item.trim();
                        var tovalArr = toval.split(',');
                        var flag = 1;
                        for (var m = 0; m < tovalArr.length; m++) {
                            var tovalItem = tovalArr[m];
                            if ($.trim(imeiList[i][j].imei).toUpperCase() == tovalItem || $.trim(imeiList[i][j].auxiliaryImei).toUpperCase() == tovalItem) {
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
        return {
            result: result,
            reLuru: reLuru,
            reLuruArr: reLuruArr,
        };
    }

    function getImeiList() {
        var imeiList = [];
        var gridIDs = $("#grid").jqGrid("getDataIDs");
        $.each(gridIDs, function (i, val) {
            var gridRowDetailList = $("#grid").jqGrid("getRowData", val).detailList;
            if (gridRowDetailList != '') {
                imeiList.push(JSON.parse(gridRowDetailList));
            }
        })
        return imeiList;
    }

    //入库方式
    function requestIncomingType(asyncOpt, callback) {
        $.request({
            async: asyncOpt,
            type: 'post',
            url: basePath + '/inventory/common/getOtherOutInStorageClassVoList',
            data: {type: 0},
            dataType: 'json',
            success: function (data) {
                if (data.result == 1) {
                    var res = data.data.classVoList;
                    var html;
                    $.each(res, function (i, val) {
                        html += '<option value="' + val.classId + '">' + val.name + '</option>';
                    })
                    $('#incomingType').html(html)
                    if (callback) callback();
                } else {
                    $.zxsaas_plus.showalert('error', data.desc);
                }
            },
            error: function () {
                alert('请求失败！')
            }
        })
    }

    function footDataRender(asyncOpt, param) {//页面底部信息请求加载
        var dft = {
            bool: true
        }
        asyncOpt = $.extend(true, dft, asyncOpt);
        $.request({
            async: asyncOpt.bool,
            type: 'post',
            url: basePath + '/inventory/storage/stock/other/incoming/searchOrder',
            data: param,
            dataType: 'json',
            success: function (data) {
                if (data.result == 1) {
                    $('#footerCompany').val(data.data.order.companyName);
                    $('#footerCreate').val(data.data.order.createByName);
                    if (data.data.order.updateByName) $('#footerUpdate').val(data.data.order.updateByName);
                    if (data.data.order.redByName) $('#footerBack').val(data.data.order.redByName);
                } else {
                    $.zxsaas_plus.showalert('error', data.desc);
                }
            },
            error: function () {
                alert('请求失败！')
            }
        })
    }

    function billsData() {//单据保存
        var order = {};
        order.orderId = $('#billsId').val();
        order.sectionId = $('#DepartmentName').data('id');
        order.contactUnitId = $('#contactName').data('id');
        order.billsDateStr = $('#billsDateString').val();
        order.managerId = $('#managersName').data('id');
        order.otherStorageClassId = $('#incomingType').val();
        order.remark = $('#remark').val();
        order.detailList = new Array();
        var ids = $("#grid").jqGrid("getDataIDs");
        $.each(ids, function (i, val) {
            var rowdata = $('#grid').jqGrid("getRowData", val);
            order.detailList[i] = {};
            order.detailList[i].storageId = rowdata.storageId;
            order.detailList[i].id = rowdata.id;
            order.detailList[i].goodsId = rowdata.goodsId;
            order.detailList[i].goodsNumber = rowdata.goodsNumber;
            order.detailList[i].price = rowdata.price;
            order.detailList[i].amount = rowdata.amount;
            order.detailList[i].remark = rowdata.remark;
            if (rowdata.detailList != '') {
                order.detailList[i].detailList = new Array();
                $.each(JSON.parse(rowdata.detailList), function (k, kval) {
                    order.detailList[i].detailList[k] = {};
                    order.detailList[i].detailList[k].imei = kval.imei;
                    order.detailList[i].detailList[k].auxiliaryImei = kval.auxiliaryImei;
                    order.detailList[i].detailList[k].remark = kval.remark;
                })
            }
        })
        return order
    }

    function billSearch(url_Code, failCallback, billsId, callbackObj) {//单据查询
        url_Code = url_Code || ''
        billsId = billsId || ''
        var filParam = {
            billsId: billsId,
            isDraft: $('#isDraft').val(),
            refBillsId: $('#billsId').val(),
            startTime: $('#startTimeStr').val(),
            sectionIds: $('#filterSectionName').data('id'),
            billsCode: $('#selBillsCode').val(),
            endTime: $('#endTimeStr').val(),
            remark: $('#selRemark').val(),
            imeiKey: $('#selImei').val()
        }
        $.request({
            async: true,
            type: 'post',
            url: basePath + '/inventory/storage/stock/other/incoming/searchOrder?queryCodeStr=' + url_Code,
            data: filParam,
            dataType: 'json',
            success: function (data) {
                if (data.result == 1) {
                    var res = data.data.order;
                    $("#grid").jqGrid("clearGridData");
                    $.each(res.detailList, function (i, val) {
                        var ids = $("#grid").jqGrid("getDataIDs");
                        var maxid = (ids.length == 0 ) ? 0 : Math.max.apply(null, ids);
                        var index = maxid + 1;
                        $("#grid").addRowData(index, {
                            "storageName": val.storageName,

                            "categoryName": val.categoryName,
                            "code": val.code,
                            "brandName": val.brandName,
                            "models": val.models,
                            "color": val.color,
                            "id": val.id,

                            "goodsName": val.goodsName,
                            "goodsNumber": val.goodsNumber,
                            "detailList": val.detailList.length == 0 ? '' : JSON.stringify(val.detailList),
                            "price": val.price,
                            "amount": val.amount,
                            "remark": val.remark,
                            "storageId": val.storageId,
                            "goodsId": val.goodsId,
                            "ifManageImei": val.ifManageImei,
                            "ifEnableAuxiliaryImei": val.ifEnableAuxiliaryImei,
                            "imeiLength": val.imeiLength,
                            "auxiliaryImeiLength": val.auxiliaryImeiLength
                        }, "last");
                        //添加串号这个图标
                        if (val.ifManageImei == 1) {
                            $("#grid").jqGrid('setCell', index, "goodsNumber", '', 'ifManageImeiIcon');
                        }

                    })
                    drawGrid(res)
                    if (callbackObj) {
                        callbackObj(data.data)
                    }
                } else {
                    if (failCallback) {
                        failCallback()
                    }
                }
            },
            error: function () {
                alert('请求失败！')
            }
        })
    }

    function dataRender(data) {//单据render
        $('#billsStatus').val(data.billsStatus)
        $('#auditStatus').val(data.auditStatus)
        $('#billsId').val(data.orderId);
        $('#billsCode').val(data.billsCode);
        $('#DepartmentName').val(data.sectionName).data('id', data.sectionId);
        $('#contactName').val(data.contactUnitName).data('id', data.contactUnitId);
        $('#billsDateString').val(data.billsDateStr);
        $('#managersName').val(data.managerName).data('id', data.managerId);

        if (data.otherStorageClassCode == 'PYRK') {
            $('#incomingType').html('<option value="' + data.otherStorageClassId + '">' + data.otherStorageClassName + '</option>')
        } else {
            requestIncomingType(false, function () {//入库方式
                $('#incomingType option[value=' + data.otherStorageClassId + ']').prop('selected', true);
            })
        }
        $('#remark').val(data.remark);
        $('#otherOutstroNumIdStr').val('');
        $('#footerCompany').val(data.companyName);
        $('#footerCreate').val(data.createByName);
        data.updateByName ? $('#footerUpdate').val(data.updateByName) : $('#footerUpdate').val('');
        data.postByName ? $('#footerPost').val(data.postByName) : $('#footerPost').val('');
        data.redByName ? $('#footerBack').val(data.redByName) : $('#footerBack').val('');
        $('#isDraft').val() == 1 ? EventList.trigger('draftSign') : EventList.trigger('formalSign');
        switch ($('#billsStatus').val()) {
            case '6':
                //过账;
                EventList.trigger('formalSign')
                break;
            case '7':
                //红冲;
                EventList.trigger('redSign')
                $('#remark').attr('disabled', false);
                break;
        }
    }

    //渲染表格
    function drawGrid(res) {
        dataRender(res)
        checkIfManageImeiIcon()
        gridSum()
    }

    //添加商品
    function addGoodName(proSelIds) {
        var proDataList = [];//弹出层选中的集合
        var gridSelId = $("#grid").getGridParam("selrow"); //主表选中的行
        var gridSelDataRow = $("#grid").jqGrid("getRowData", gridSelId);  //主表选中的行 数据
        var gridDataList = $("#grid").jqGrid("getRowData");  //主表的所有数据
        //获取 ： 弹出层选中的集合
        $.each(proSelIds, function (i, value) {
            var rowData = $("#proTable").jqGrid('getRowData', value)
            rowData.storageId = gridSelDataRow.storageId;
            rowData.storageName = gridSelDataRow.storageName;
            proDataList.push(rowData);
        });
        $("#grid").jqGrid("saveCell", lastrow, lastcell);
        for (var i = 0; i < proDataList.length; i++) {
            var proDataItem = proDataList[i];
            var dataRow = {
                'goodsName': proDataItem.name,
                'goodsId': proDataItem.goodsId,
                'stockCount': proDataItem.stockCount,
                'ifManageImei': proDataItem.ifManageImei,
                'goodsNumber': 0,
                'detailList': '&nbsp',
                'remark': proDataItem.remark,
                'ifEnableAuxiliaryImei': proDataItem.ifEnableAuxiliaryImei,
                'imeiLength': proDataItem.imeiLength,
                'auxiliaryImeiLength': proDataItem.auxiliaryImeiLength,
                'categoryName': proDataItem.categoryName,
                'code': proDataItem.code,
                'brandName': proDataItem.brandName,
                'models': proDataItem.models,
                'color': proDataItem.color,
                'storageId': proDataItem.storageId,
                'storageName': proDataItem.storageName,

            };
            var flag = 1;
            var cIndex;
            if (flag === 1) {
                if (i == 0) {
                    cIndex = Number(gridSelId);
                    $("#grid" + " #" + cIndex + "_goodsName").val(dataRow.goodsName);
                    $("#grid").jqGrid('setRowData', cIndex, dataRow, {});
                } else {
                    cIndex = $('#grid').jqGrid('getDataIDs').length + 1;
                    $('#grid').jqGrid('addRowData', cIndex, dataRow);
                }
            }
        }
        checkIfManageImeiIcon();
        $('#goodsnameReferenceModal').modal('hide');
        gridSum()
    }

    //检查IfManageImeiIcon
    function checkIfManageImeiIcon() {
        var $grid = $("#grid");
        var ids = $grid.getDataIDs();
        $.each(ids, function (i, value) {
            var rowData = $grid.jqGrid('getRowData', value)
            //是否 为 串号商品
            if (rowData.ifManageImei == "1") {
                $grid.jqGrid('setCell', value, "goodsNumber", '', 'ifManageImeiIcon');
            } else {
                //jqgrid 找不到移除 calss 的方法。这里只能外界操作dom 的方式
                $("#grid #" + value + " td[aria-describedby='grid_goodsNumber']").removeClass('ifManageImeiIcon')
            }
        });
    }
})


















