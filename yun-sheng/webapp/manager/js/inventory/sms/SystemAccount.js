$(function () {
    initEvent()

    //初始化事件
    function initEvent() {
        loadmodal()
        // initDataGrid()
    }

    $("input[name='groupName']").comModalsgroup({
        clickback: function () {
            var obj = $("input[name='groupName']");
            //设置编辑器值
            $("input[name='groupName']").val(obj.val());
            $("input[name='groupId']").val(obj.data('id'));
        }
    })

    // 充值记录
    $('#recordGrid').jqGrid({
        colNames: ['充值条数', '充值时间', '业务类型'],
        colModel: [
            {name: 'rechargeNum', index: 'rechargeNum', width: 150, align: 'center', sortable: false},
            {name: 'createTimeStr', index: 'createTimeStr', width: 150, align: 'center', sortable: false},
            {name: 'businessTypeName', index: 'businessTypeName', width: 150, align: 'center', sortable: false},
        ],
        search: true,
        sortable: false,
        rownumbers: true,
        mtype: "POST",
        datatype: "json",
        viewrecords: true,
        // cellEdit: true,
        rownumWidth: 40, // the width of the row numbers columns
        rowNum: 20,
        rowList: [20, 100, 200],
        pager: '#recordPager',
        shrinkToFit: false,
        width: "100%",
        height: $(window).height() * 0.5,
        jsonReader: {
            repeatitems: false,
            root: 'data.dataList',
        },
        gridComplete: function () {
            $('#recordGrid').resize()
        },
        beforeEditCell: function (rowid, cellname, v, iRow, iCol) {
            lastrow = iRow;
            lastcell = iCol;
        },
    })

    /*******************************显示禁用***********************************/
    $('#selStatus').change(function () {
        querySms()
    });
});

/************************新增、修改短信签名********************************/
function initDataGrid() {
    //操作列
    function custFormat(cellvalue, options, rowObject) {
        var signId = rowObject.id;
        var opreate = '<a class="btn" onclick="javascript: deleteOp(\''+signId+'\');"><i class="glyphicon glyphicon-trash"></i></a>';
        return opreate;
    }
    //配置
    var paras = {
        gridId: 'dataGrid',
        addRow: {name: '', defalutLogo: '', groupId: '', accountCode: ''},
        colNames: ['操作','短信签名', '默认签名', '集团Id', '短信账号', 'id',],
        colModel: [
            { name : 'opp' ,frozen: true ,index: 'opp' ,width:'50px' ,align:'left' ,formatter: custFormat,sortable: false },
            {
                width: '220px',
                name: 'name',
                index: 'name',
                align: 'left',
                editable: true,
                sortable: false,
                editoptions: {
                    onkeyup: "checkInput.clearNoText(this,100)",
                    dataEvents: [{
                        type: "focus",
                        fn: function () {
                            this.select()
                        }
                    }]
                }
            },
            {
                name: 'defalutLogo',
                sortable: false,
                index: 'defalutLogo',
                width: '100px',
                align: 'center',
                editable: true,
                edittype: 'checkbox',
                              formatter:formatterGiftFlag,
                              editoptions:{value:"√:",
                                  dataEvents: [{
                                      type: "change",
                                      fn: function(e){
                                          var ids=$("#dataGrid").jqGrid('getDataIDs');
                                          var selIndex = $("#dataGrid").getGridParam("selrow");
                                          if(ids.length>0){
                                              for(var i=0;i<ids.length;i++){
                                                  if(i!=selIndex-1){
                                                      $("#dataGrid").jqGrid('setCell',ids[i],'defalutLogo','x');
                                                  }

                                              }
                                          }
                                      }
                            },{
                                      type: "blur",
                                      fn: function(){
                                          $("#dataGrid").jqGrid("saveCell", lastrow, lastcell);
                                      }
                                  }
                            ]}
            },
            {
                name: 'groupId',
                sortable: false,
                index: 'groupId',
                width: '100px',
                align: 'center',
                editable: false,
                hidden: true,
            },
            {
                name: 'accountCode',
                sortable: false,
                index: 'accountCode',
                width: '100px',
                align: 'center',
                editable: false,
                hidden: true,
            },
            {
                name: 'id',
                sortable: false,
                index: 'id',
                width: '100px',
                align: 'center',
                editable: false,
                hidden: true,
            },
        ],
        shrinkToFit: false,

    };
    //回调函数
    var callBackList = {
        onCellSelect: function (rowid, iCol, cellcontent, e) {
            var currRow = $("#dataGrid").jqGrid('getRowData', rowid);
        },
        afterEditCell: function (rowid, name, val, iRow, iCol) {//开始编辑
            lastrow = iRow;
            lastcell = iCol;
        },
        afterSaveCell: function (rowid, name, val, iRow, iCol) {//保存编辑
            var currRow = $("#dataGrid").jqGrid('getRowData', rowid);
            if (name == 'name') {
                var groupId = $('#groupId').val()
                var accountCode = $('#accountCode').val()
                $("#" + paras.gridId).jqGrid('setCell', rowid, "groupId", groupId);
                $("#" + paras.gridId).jqGrid('setCell', rowid, "accountCode", accountCode);
            }
        },
        beforeEditCell: function (rowid, cellname, v, iRow, iCol) {
            lastrow = iRow;
            lastcell = iCol;
        },
        summary: function (rowid, name, val, iRow, iCol) {//统计处理
            // summary();
        },
        afterInsertRow: function (rowid, rowdata) {
        },
        getGridDataList: function (rows) {
        }
    };
    dataGrid = new MyEiditGrid(paras, callBackList);
    dataGrid.addKongRow();
}

//默认签名
function formatterGiftFlag(cellvalue, options, rowObject) {
    if (cellvalue == 1 || cellvalue == "√") {
        return "√";
    } else {
        return "";
    }
}

/************************新增、修改弹窗********************************/
function modalUpdate(num) {
    $('#dataGrid').resize()
    $('#accountCode').next().html('');
    $('#accountPassword').next().html('');
    $('#msgNumber').next().html('');
    initDataGrid()
    // $('#accountName').next().html('');
    //num  1.新增     2.修改
    if (num == 1) {
        //清空表单
        $('#dataGrid').setGridParam().showCol('op').hideCol('opp').trigger("reloadGrid");
        kongRow()
        $('#saveOrUpdateForm').clearForm(true);
        $('#saveOrUpdateModal').modal('show');
        $('#myModalLabel').html('新增账号');
    } else if (num == 2) {
        //修改
        $('#dataGrid').setGridParam().showCol('opp').hideCol('op').trigger("reloadGrid");
        $('#myModalLabel').html('修改');
        //判断选中
        var ids = $("#jqGrid_blocMessage").jqGrid('getGridParam', 'selarrrow');//选中的行id
        var len = ids.length;
        if (len == 0) {
            $.zxsaas_plus.showalert("错误", "请勾选一行数据!");
            return false;
        } else if (len != 1) {
            $.zxsaas_plus.showalert("错误", "一次只能修改一条信息!");
            return false;
        } else if (len == 1) {
            var gridData = $("#jqGrid_blocMessage").jqGrid("getRowData", ids);//获取被选中的一行数据
            //赋值表头
            var params = $('#saveOrUpdateForm').formToArray();
            $(params).each(function (index, element) {
                var key = element.name;
                var value = eval("gridData." + key);
                $('#' + key).val(value);
            });
            $("#dataGrid").jqGrid("clearGridData");
            var msg = JSON.parse(gridData.msg)
            if (msg.length > 0) {
                for (var i = 0; i < msg.length; i++) {
                    $("#dataGrid").jqGrid('addRowData', i + 1, msg[i]);
                }
            }
            kongRow()
            $('#saveOrUpdateModal').modal('show');
        }
    }
}
//添加空行
function kongRow() {
    var $grid = dataGrid.$grid;
    $grid.delRowData('dataGrid_addRowId');
    dataGrid.addKongRow();
    $grid.delRowData(MyEiditGrid.getMaxRowid($grid));
}
/*****************************保存,确定**********************************/
function saveAndCloseTotherstorageClass() {
    var code = $('#accountCode').val(),
        pa = $('#accountPassword').val(),
        nu = $('#msgNumber').val(),
        ac = $('#accountName').val();
    if (code == '') {
        $('#accountCode').next().html('必填!');
        return;
    }
    if (pa == '') {
        $('#accountPassword').next().html('必填!');
        return;
    }
    if (nu == '') {
        $('#msgNumber').next().html('必填!');
        return;
    }
    //调用存储方法
    var param = $('form').toJsonObject();
    param.remark=$('#remark').val();
    delete param.defalutLogo;
    delete param.queryText;
    var msgSign = [];
    var flag=true;
    var ids = $('#dataGrid').jqGrid('getDataIDs');
    for (var i = 0; i < ids.length; i++) {
        var rowData = $("#dataGrid").jqGrid('getRowData', ids[i]);
        if (rowData.defalutLogo == '√') {
            rowData.defalutLogo = 1
            flag=false;
        } else {
            rowData.defalutLogo = 0
        }
        delete rowData.op;
        msgSign.push(rowData)
    }
   if(flag==true){
       $.zxsaas_plus.showalert("提示", "必须选一个默认签名");
       return false;
   }
    param.msgSign = msgSign
    var ac_jc = param.id != '' ? 'updateMain' : 'saveMsgAccount';
    $.MsgBox('提示', '确定是否保存账号？', function () {
        $.request({
            url:  '/manager/system/sms/' + ac_jc,
            type: 'post',
            data: {"jsonStr": JSON.stringify(param)},//将对象转换为JSON字符串
            dataType: 'json',
            success: function (data) {
                if (data.result == 1) {
                    if (ac_jc == 'saveMsgAccount') {
                        $.zxsaas_plus.showalert("success", "新增成功");
                    } else {
                        $.zxsaas_plus.showalert("success", "修改成功");
                    }
                    querySms();
                    $('#saveOrUpdateModal').modal('hide');
                } else {
                    $.zxsaas_plus.showalert("提示", data.desc);
                }

            }
        });
    }, function () {
    });
}

/*****************************充值**********************************/
function topUp() {
    //判断选中
    var ids = $("#jqGrid_blocMessage").jqGrid('getGridParam', 'selarrrow');//选中的行id
    var len = ids.length;
    if (len == 0) {
        $.zxsaas_plus.showalert("错误", "请勾选一行数据!");
        return false;
    } else if (len != 1) {
        $.zxsaas_plus.showalert("错误", "一次只能修改一条信息!");
        return false;
    }
    $('#topUpNumber').next().html('');
    $('#BusinessTypes').next().html('');
    //清空表单
    $('#topUpForm').clearForm(true);
    $('#topUpModal').modal('show');
}

/*****************************充值确定按钮**********************************/
function topUpSave() {
    var nb = $('#topUpNumber').val(),
        ty = $('#BusinessTypes').val();
    if (nb == '') {
        $('#topUpNumber').next().html('必填!');
        return;
    }
    if (ty == '') {
        $('#BusinessTypes').next().html('必填!');
        return;
    }
    var rowid = $("#jqGrid_blocMessage").jqGrid('getGridParam', 'selarrrow');
    var rowDate = $('#jqGrid_blocMessage').getRowData(rowid);
    var groupId = rowDate.groupId
    var msgAccountId = rowDate.id
    var accountCode = rowDate.accountCode
    var rechargeNum = $('#topUpNumber').val()
    var businessType = $('#BusinessTypes').val()
    var remark = $('#remarkc').val()
    $.MsgBox('提示', '确定是否充值!', function () {
        $.request({
            url: '/manager/system/sms/rechargeSave',
            type: 'post',
            data: {
                groupId: groupId,
                msgAccountId: msgAccountId,
                accountCode: accountCode,
                rechargeNum: rechargeNum,
                businessType: businessType,
                remark: remark,
            },//将对象转换为JSON字符串
            dataType: 'json',
            success: function (data) {
                if (data.result == 1) {
                    $.zxsaas_plus.showalert("success", "充值成功");
                    querySms();
                    $('#topUpModal').modal('hide');
                } else {
                    $.zxsaas_plus.showalert("提示", data.desc);
                }

            }
        });
    }, function () {
    });

}

/*******************************启用、禁用、删除**********************************/
function disOrEnAccount(num) {
    //批量启用0、禁用1、删除2
    //修改对应标志
    var status;
    if (num == 0) {
        status = 1;
    } else if (num == 1) {
        status = 0;
    } else if (num == 2) {
        status = 2;
    }
    var ids = $("#jqGrid_blocMessage").jqGrid('getGridParam', 'selarrrow');//选中的行ids
    var len = ids.length;
    //至少选中一行
    if (len == 0) {
        if (num == 0) {
            $.zxsaas_plus.showalert("错误", "请勾选数据，再点击启用！");
        } else if (num == 1) {
            $.zxsaas_plus.showalert("错误", "请勾选数据，再点击禁用！");
        } else if (num == 2) {
            $.zxsaas_plus.showalert("错误", "请勾选数据，再点击删除！");
        }
        return false;
    } else {
        ids = String(ids)
        //弹窗提醒
        if (num == 0) {
            $.MsgBox('提示', "是否确定启用选中数据?", function () {
                $.request({
                    url: '/manager/system/sms/checkEnable',
                    type: 'post',
                    data: {ids: ids, status: status},//将对象转换为JSON字符串
                    dataType: 'json',
                    success: function (data) {
                        if (data.result == 1) {
                            $.zxsaas_plus.showalert("success", "启用成功");
                            querySms();
                        }else{
                            $.zxsaas_plus.showalert("提示", data.desc);
                        }
                    }
                });
            }, function () {

            });
        } else if (num == 1) {
            $.MsgBox('提示', "是否确定禁用选中数据?", function () {
                $.request({
                    url: '/manager/system/sms/checkEnable',
                    type: 'post',
                    data: {ids: ids, status: status},//将对象转换为JSON字符串
                    dataType: 'json',
                    success: function (data) {
                        if (data.result == 1) {
                            $.zxsaas_plus.showalert("success", "禁用成功");
                            querySms();
                        }else{
                            $.zxsaas_plus.showalert("提示", data.desc);
                        }
                    }
                });
            }, function () {

            });
        } else if (num == 2) {
            $.MsgBox( '提示',"是否确定删除选中数据?", function () {
                $.request({
                    url: '/manager/system/sms/del',
                    type: 'post',
                    data: {'ids': ids},//将对象转换为JSON字符串
                    dataType: 'json',
                    success: function (data) {
                        if (data.result == 1) {
                            $.zxsaas_plus.showalert("success", "删除成功");
                            querySms();
                        }else{
                            $.zxsaas_plus.showalert("提示", data.desc);
                        }
                    }
                });
            }, function () {

            });
        }
    }
}

function getParam() {
    var param = new Object();
    param.disableFlag = $("#selStatus").is(':checked') == true ? 1 : 0;
    param.queryKey = $.trim($("#queryText").val());
    return param
}

$('#selStatus').change(function(){
    querySms()
})
/*******************************条件查询***********************************/
function querySms() {
    $("#jqGrid_blocMessage").jqGrid('setGridParam', {
        url: '/manager/system/sms/getMsgList',
        postData: getParam(), //发送数据
        page: 1
    }).trigger("reloadGrid"); //重新载入
}

/*******************************重置***********************************/
function resetFun() {
    location.reload();
}

/*******************************短信账户表格***********************************/
function loadmodal() {
    $.jgrid.defaults.width = 1280;
    $.jgrid.defaults.responsive = true;
    $.jgrid.defaults.styleUI = 'Bootstrap';
    //var toggleflag=false;//冻结时候切换用
    var colNames = ['集团ID', '关联集团', '短信账户ID', '短信账号', '密码', '短信签名ID', '签名列表', '充值总条数', '消费总条数', '剩余条数', '新增人ID', '新增人', '新增时间', '修改人ID', '修改人', '修改时间', '是否禁用', '备注', 'msgSign'];
    var JqGridColModel = [
        {name: 'groupId', index: 'groupId', align: 'center', sortable: false, hidden: true},
        {name: 'groupName', index: 'groupName', align: 'left', sortable: false},
        {name: 'id', index: 'id', align: 'center', sortable: false, hidden: true},
        {name: 'accountCode', index: 'accountCode', align: 'center', sortable: false},
        {name: 'accountPassword', index: 'accountPassword', align: 'center', sortable: false},
        {name: 'signaturesId', index: 'signaturesId', sortable: false, hidden: true},
        {name: 'signaturesnName', index: 'signaturesnName', sortable: false,width:250, classes: 'billsCodeStyle'},
        {name: 'msgNumber', index: 'msgNumber',align: 'center', sortable: false, classes: 'billsCodeStyle'},
        {name: 'consumerNumber', index: 'consumerNumber', sortable: false},
        {name: 'remainNumber', index: 'remainNumber', align: 'center', sortable: false},
        {name: 'createUid', index: 'createUid', align: 'center', hidden: true, sortable: false},
        {name: 'createName', index: 'createName', align: 'center', sortable: false},
        {name: 'createTimeStr', index: 'createTimeStr', align: 'center',width:200, sortable: false},
        {name: 'updateUid', index: 'updateUid', align: 'center', hidden: true, sortable: false},
        {name: 'updateName', index: 'updateName', align: 'center', sortable: false},
        {name: 'updateTimeStr', index: 'updateTimeStr',width:200, align: 'center', sortable: false},
        {name: 'statusName', index: 'statusName', align: 'center', sortable: false},
        {name: 'remark', index: 'remark', align: 'center', sortable: false},
        {name: 'msg', index: 'msg', align: 'center', sortable: false, hidden: true},
    ];
    loadtable();

    //加载表格
    function loadtable() {
        $('#jqGrid_blocMessage').jqGrid({
            url: '/manager/system/sms/getMsgList',
            mtype: "POST",
            datatype: "json",
            jsonReader: {
                root: "data.dataList",
                page: "data.page",
                total: "data.total",
                records: "data.records",
                repeatitems: false
            },
            colNames: colNames,
            colModel: JqGridColModel,
            sortable: false,
            rowNum: 50,
            rowList: [50, 100, 300],
            pager: '#jqGridPager',
            rownumbers: true,	//显示行号
            viewrecords: true,
            multiselect: true,
            width: "100%",
            postData: getParam(),
            height: $(window).height() * 0.65,
            autowidth: true,
            rownumWidth: 35, // the width of the row numbers columns
            shrinkToFit: true,  //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
            ondblClickRow: function (id) {
                //双击进入编辑
                var delid = id;

            },
            onCellSelect: function (rowid, iCol, contents, event) {
                var $target = $(event.target)
                var curColName
                if ($.trim($target.attr('aria-describedby')) != '') {
                    curColName = $target.attr('aria-describedby').replace('jqGrid_blocMessage_', '');
                } else {
                    curColName = $target.closest('td').attr('aria-describedby').replace('jqGrid_blocMessage_', '');
                }

                if (curColName == 'signaturesnName') {

                    $('#signatureModal').resize()

                    var rowDate = $('#jqGrid_blocMessage').getRowData(rowid);
                    $('.currentGoods').html("关联集团:<b>" + rowDate.groupName + "</b>")
                    signature()
                    var groupIds = rowDate.groupId
                    $.ajax({
                        url: '/manager/system/sms/getGroupSignatures',
                        type: 'post',
                        dataType: 'json',
                        data: {groupId: groupIds},
                        success: function (data) {
                            if (data.result == 1) {
                                var obj = data.data.signList
                                $("#signatureGrid").jqGrid("clearGridData");
                                if (obj.length > 0) {
                                    for (var i = 0; i < obj.length; i++) {
                                        $("#signatureGrid").jqGrid('addRowData', i + 1, obj[i]);
                                    }
                                }
                            } else {
                                $.zxsaas_plus.showalert("提示", data.desc);
                            }
                            $('#signatureModal').modal('show')
                        }
                    })
                }
                if (curColName == 'msgNumber') {
                    var rowDate = $('#jqGrid_blocMessage').getRowData(rowid);
                    $("#recordGrid").jqGrid('setGridParam', {
                        url: '/manager/system/sms/rechargeRecord',
                        postData: {
                            accountCode: rowDate.accountCode
                        }
                    }).trigger("reloadGrid");
                    $('#recordModal').modal('show')
                }

            },
            onSelectRow: function (id) {

            },

            beforeSelectRow: function (rowid, e) {

            },
            afterInsertRow: function (rowid, aData) { //新增一行之后

            },
            gridComplete: function () {
                var ids = $('#jqGrid_blocMessage').jqGrid("getDataIDs");

            },
            loadComplete: function (data) {

            },
            loadError: function (xhr, status, error) {
            }
        })

    }
}

// 签名列表
function signature() {
    $('#signatureGrid').jqGrid({
        colNames: ['短信签名', '默认签名'],
        colModel: [
            {name: 'name', index: 'name', width: 150, align: 'center', sortable: false},
            {name: 'defalutLogo', index: 'defalutLogo', width: 150, align: 'center', sortable: false,formatter:formatterGiftFlag,},
        ],
        search: true,
        sortable: false,
        rownumbers: true,
        cellsubmit: 'clientArray',//单元格保存内容的位置
        editurl: 'clientArray',
        cellEdit: true,
        rownumWidth: 40, // the width of the row numbers columns
        rowNum: 20,
        rowList: [20, 100, 200],
        pager: '#signaturePager',
        shrinkToFit: false,
        width: "100%",
        height: $(window).height() * 0.5,
        gridComplete: function () {
            $('#signatureGrid').resize()
        },
        beforeEditCell: function (rowid, cellname, v, iRow, iCol) {
            lastrow = iRow;
            lastcell = iCol;
        },
    })
}
// 操作删除
function deleteOp(signId) {
    $.ajaxPackage({
        url: '/manager/system/sms/delSign',
        data: {
            signId:signId
        },
        success: function (data) {
            if (data.result == 1) {
                $.zxsaas_plus.showalert("success", "删除成功");
                // $("#dataGrid").jqGrid('delRowData', rowId);
            }else{
                $.zxsaas_plus.showalert("提示", data.desc);
            }
        }
    })
}

