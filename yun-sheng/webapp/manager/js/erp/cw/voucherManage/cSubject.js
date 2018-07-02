//全局变量
var lastcell = "", lastrow = "";


$(function () {
    subjectAjax = new SubjectAjax(basePath);
    initCurrentAccountingYear();
    initSubjectClissify();
});

/*根据科目名称填充助记码*/
$(document).on('blur', '#subjectName', function (e) {
    var str = $(this).val().trim();
    if (str == "") return;
    var arrRslt = makePy(str);
//	alert(arrRslt);
    $('#mnemonicCode').val($.trim(arrRslt[0]));
});

/***button 停用***/
function enable() {
    //选择行
    var rowId = $("#companySubjectTable").jqGrid('getGridParam', 'selarrrow');
    //提示信息
    if (rowId.length == 0) {
        $.zxsaas_plus.showalert("提示信息", "请选择科目!");
        return false;
    }

    if (rowId.length >1) {
        $.zxsaas_plus.showalert("信息提示", "只能选择一条!");
        return false;
    }

    $.zxsaas_plus.showconfirm("提示信息", '是否停用此科目吗？', function () {
        subjectAjax.enableFcompanySubjectTemplate(rowId, '/cw/company/enableFcompanySubjectTemplate/', function (data) {
            if (data.result == 1) {
                $.zxsaas_plus.showalert("信息提示", "停用科目成功!");
            } else {
                $.zxsaas_plus.showalert("信息提示", data.desc);
            }
            searchData();
        });

    }, function () {

    });
}

/***button 删除***/
function deleteSubject() {
    //选择行
    var rowId = $("#companySubjectTable").jqGrid('getGridParam', 'selarrrow');
    //提示信息
    if (rowId.length == 0) {
        $.zxsaas_plus.showalert("提示信息", "请选择科目!");
        return false;
    }
    if (rowId.length >1) {
        $.zxsaas_plus.showalert("信息提示", "只能选择一条!");
        return false;
    }

    $.zxsaas_plus.showconfirm("提示信息", '是否删除此科目吗？', function () {
        subjectAjax.deleteFcompanySubjectTemplate(rowId, '/cw/company/deleteFcompanySubjectTemplate/', function (data) {
            if (data.result == 1) {
                $.zxsaas_plus.showalert("信息提示", "删除科目完成!");
            } else {
                $.zxsaas_plus.showalert("信息提示", data.desc);
            }
            searchData();
        });
    }, function () {

    });
}

//查看差异
var isDifferences = false;

/***button 科目对照***/
function SubjectControl() {
    isDifferences = false
    var year = $('#currentAccountingYear').val();
    if (year == null) {
        $.zxsaas_plus.showalert("提示", '请先加载数据！');
        return;
    }
    var GridParam = $("#subjectControlGrid").jqGrid('getGridParam');
    //是否初始化
    if (GridParam === undefined) {
        loadSubjectControlModal()
    } else {
        $("#subjectControlGrid").trigger("reloadGrid")
        $('.jqGrid_wrap .ui-th-column-header.ui-th-ltr').eq(0).text(Number(year) - 1 + '年度科目')
        $('.jqGrid_wrap .ui-th-column-header.ui-th-ltr').eq(1).text(Number(year) + '年度科目')
    }
    $('#subjectControlModal').modal('show')
}

//初始化 科目对照模态框
function loadSubjectControlModal() {
    var url = '/manager/cw/company/getSubjectCompareList';
    var params = getYear();
    function getYear() {
        return {
            year: $('#currentAccountingYear').val()
        }
    }
    //查看差异
    $('.subjectControlDifferences').bind('click', function () {
        var $this = $(this);
        isDifferences = true
        $this.hide();
        var url = '/manager/cw/company/getSubjectDiffList';
        $("#subjectControlGrid").jqGrid('setGridParam', {
            url: url,
            postData: getYear()
        }).trigger("reloadGrid")
        $('.subjectControlSave').hide();
        $('.subjectControlExit').show();
    })
    //退出
    $('.subjectControlExit').bind('click', function () {
        var $this = $(this);
        isDifferences = false
        $this.hide();
        $("#subjectControlGrid").jqGrid('setGridParam', {
            url: url,
            postData: params
        }).trigger("reloadGrid")
        $('.subjectControlSave').show();
        $('.subjectControlDifferences').show();
    })
    //保存
    $('.subjectControlSave').bind('click', function () {
        var tableName = $("#subjectControlGrid");
        var ids = tableName.jqGrid('getDataIDs');
        var detailList = [];
        var year = getYear();
        $.each(ids, function (i, value) {
            var row = tableName.jqGrid('getRowData', value);
            detailList.push({
                preSubjectCode: row.preSubjectCode,
                subjectCode: row.subjectCode,
                year: year.year
            });
        });
        if (detailList.length > 0) {
            $.ajax({
                url: "/manager/cw/company/saveSubjectCompare",
                type: 'POST',
                dataType: "json",
                data: JSON.stringify(detailList),
                contentType: 'application/json',
                success: function (data) {
                    if (data.result == 1) {
                        $.zxsaas_plus.showalert("提示", data.desc || '保存成功！');
                    } else {
                        $.zxsaas_plus.showalert("提示", data.desc);
                    }

                }
            });
        } else {
            $.zxsaas_plus.showalert("提示", "没有修改的数据！");
        }
    })
    //导出
    $('.subjectControlImport').bind('click', function () {
        var url='';
        var params = getYear();
        if(isDifferences===false){
            url='/manager/cw/company/subjectCompareExport'
        }else{
            url='/manager/cw/company/subjectDiffExport'
        }

        functionObjExtent.construtForm(url,params)
    })


    var colName = ['科目编码', '科目名称', '科目编码', '科目名称'];
    var colModel = [
        {name: 'preSubjectCode', index: 'preSubjectCode',sortable: false,  align: 'center', width: 150},
        {name: 'preSubjectName', index: 'preSubjectName',sortable: false,  align: 'center', width: 180},
        {name: 'subjectCode', index: 'subjectCode', sortable: false, align: 'center', width: 150},
        {
            name: 'subjectName', index: 'subjectName',sortable: false,  align: 'center', width: 180,
            formatter: function (cellvalue, options, rowObjec) {
                cellvalue = cellvalue || ''
                if (isDifferences == true) {
                    return cellvalue;
                } else {
                    var timestamp = Date.parse(new Date());
                    var id = options.gid + options.rowId + timestamp;
                    var inp = '<div class="form-group" style="margin:0;"><div class="input-group"><input  id="' + id + '" type="text" class="form-control" placeholder="" readonly="" disabled=""></div></div>';
                    //会计科目
                    setTimeout(function () {
                        $('#' + id).comSubjectCode({
                            ifEndSubject:1,
                            currentAccountingYear: $('#currentAccountingYear').val(),
                            ondblClickRowCallBack: function (data) {
                                var accountInfo = data.accountInfo;
                                var tableGrid = $("#subjectControlGrid");
                                var selectedId = options.rowId;
                                var dataRow = {
                                    subjectCode: accountInfo.subjectCode,
                                    subjectName: accountInfo.subjectName,
                                };
                                var cssprop = {};
                                tableGrid.jqGrid('setRowData', selectedId, dataRow, cssprop);
                            }
                        });
                        $('#' + id).val(cellvalue)
                    }, 200);
                    return inp;
                }
            }
        }
    ];
    $("#subjectControlGrid").jqGrid({
        styleUI: 'Bootstrap',
        mtype: "post",
        url: url,
        jsonReader: {
            root: "data.dataList",
            repeatitems: true
        },
        rowNum: 10000,
        postData: getYear(),
        datatype: "json",
        viewrecords: true,
        sortable: false,
        shrinkToFit: false,
        autowidth: true,
        rownumWidth: 50, // the width of the row numbers columns
        rownumbers: true,	//显示行号
        width: '700',
        height: "300",
        colNames: colName,
        colModel: colModel,
        gridComplete: function () {

        },
        loadComplete: function (data) {

        }

    });
    $("#subjectControlGrid").jqGrid('setGroupHeaders', {
        useColSpanStyle: true,
        groupHeaders: [
            {startColumnName: 'preSubjectCode', numberOfColumns: 2, titleText: Number(params.year) - 1 + '年度科目'},
            {startColumnName: 'subjectCode', numberOfColumns: 2, titleText: params.year + '年度科目'}
        ]
    });

}

//是否禁用科目参照
function isDisabledSubjectControl() {
    var $currentAccountingYear = $('#currentAccountingYear');
    var year = $currentAccountingYear.val();
    var options = $currentAccountingYear.find('option');
    var len = options.length;
    $('.SubjectControl').prop('disabled', false)
    if (len <= 1) {
        $('.SubjectControl').prop('disabled', true)
    }
    var arr = [];
    for (var i = 0; i < len; i++) {
        arr.push(options[i].text)
    }
    var flag = true;
    if (arr.length > 0) {
        arr.sort() // 升序
        if (arr[0] != year) {
            flag = false;
        }
    }

    if (flag) {
        $('.SubjectControl').prop('disabled', true)
    }

}

/***button 新增、修改前***/
function saveBefore(str) {
    subjectAjax.memberOfGroup("C01004", function (data) {
        if (data == 1) {
            if (str == 'save') {
                $.zxsaas_plus.showalert("信息提示", "请选择集团引入!");
                return false;
            } else {
                $('#subjectLabel').html('修改科目');
                updateSubject(data);
            }
        } else {
            if (str == 'save') {
                $('#subjectLabel').html('新增科目');
                saveSubject();
            } else {
                $('#subjectLabel').html('修改科目');
                updateSubject(data);
            }
        }
    });
}

/***button 确定新增、修改***/
function save(int) {
    var formParams = {};
    submitObj(formParams);
    formParams.subjectClssifyName = $('#subjectClssify').find("option:selected").text();

    if ($('#subjectLabel').html() == '新增科目') {
        subjectAjax.saveFcompanySubjectTemplate(formParams, $('#currentAccountingYear').val(), '/cw/company/saveFcompanySubjectTemplate/', function (data) {
            if (data.result == 1) {
                $.zxsaas_plus.showalert("信息提示", "新增科目成功!");
            } else {
                $.zxsaas_plus.showalert("信息提示", data.desc);
            }
            searchData();
        });
    } else {
        subjectAjax.updateFcompanySubjectTemplate(formParams, '/cw/company/updateFcompanySubjectTemplate', function (data) {
            if (data.result == 1) {
                $.zxsaas_plus.showalert("信息提示", "修改科目成功!");
            } else {
                $.zxsaas_plus.showalert("信息提示", data.desc);
            }
            searchData();
        });
    }

    int == 1 ? $('#subjectModal').modal('hide') : saveSubject();

}

function updateSubject(member) {
    var ids = $('#companySubjectTable').jqGrid('getGridParam', 'selarrrow');
    if (ids.length == 0) {
        $.zxsaas_plus.showalert("信息提示", "请选择科目!");
        return false;
    }
    if (ids.length >1) {
        $.zxsaas_plus.showalert("信息提示", "只能选择一条!");
        return false;
    }

    //根据id查询科目信息
    subjectAjax.getById(ids[0], '/cw/company/findSubjectById/', function (data) {
        fill(data);

        //隶属于集团
        if (member == 1) {
            $('#subjectName').prop("disabled", true);
            $('#mnemonicCode').prop("disabled", true);
            $('#subjectClssify').prop("disabled", true);
            $('#creditDirection').prop("disabled", true);
        }
    });

    $('#subjectModal').modal('show');
}

function saveSubject() {
    //禁用
    initial();
    $('#ifControl').prop("disabled", true);
    $('#unit').prop("disabled", true);
    $('#enable').prop("disabled", true);

    //去值
    $('#id').val('');
    $('#subjectCode').val('');
    $('#subjectName').val('');
    $('#mnemonicCode').val('');
    $('#subjectClssify').val('');
    $('#creditDirection').val('');
    $('#cashFlow').prop("checked", false);
    $('#ifNumAccounting').prop("checked", false);
    $('#unit').val('');
    $('#fatherSubjectName').html('');
    $('#enable').prop("checked", false);
    $('#ifControl').prop("checked", false);
    $('#partnerAccounting').prop("checked", false);
    $('#departmentAccounting').prop("checked", false);
    $('#employeeAccounting').prop("checked", false);

    $('#subjectModal').modal('show');
}

//填充数据
function fill(data) {
    var obj = data.data.entity;
    initial();
    //左上
    $('#id').val(obj.id);
    $('#subjectCode').val(obj.subjectCode);
    $('#subjectName').val(obj.subjectName);
    $('#mnemonicCode').val(obj.mnemonicCode);
    $('#subjectClssify').val(obj.subjectClssify);
    $('#creditDirection').val(obj.creditDirection);

    //左下
    obj.cashFlow == 1 ? $('#cashFlow').prop("checked", true) : $('#cashFlow').prop("checked", false);
    $('#cashFlow').val(obj.cashFlow);
    obj.ifNumAccounting == 1 ? $('#ifNumAccounting').prop("checked", true) : $('#ifNumAccounting').prop("checked", false);
    $('#ifNumAccounting').val(obj.ifNumAccounting);
    $('#unit').val(obj.unit);

    //右上
    $('#fatherSubjectName').html(obj.fatherSubjectName);
    obj.enable == 1 ? $('#enable').prop("checked", true) : $('#enable').prop("checked", false) && $('#enable').prop("disabled", true);
    $('#enable').val(obj.enable);
    obj.ifControl == 1 ? $('#ifControl').prop("checked", true) : $('#ifControl').prop("checked", false);
    $('#ifControl').val(obj.ifControl);

    //右下
    obj.partnerAccounting == 1 ? $('#partnerAccounting').prop("checked", true) : $('#partnerAccounting').prop("checked", false);
    $('#partnerAccounting').val(obj.partnerAccounting);
    obj.departmentAccounting == 1 ? $('#departmentAccounting').prop("checked", true) : $('#departmentAccounting').prop("checked", false);
    $('#departmentAccounting').val(obj.departmentAccounting);
    obj.employeeAccounting == 1 ? $('#employeeAccounting').prop("checked", true) : $('#employeeAccounting').prop("checked", false);
    $('#employeeAccounting').val(obj.employeeAccounting);

    //禁用
    $('#subjectCode').prop("disabled", true);
    obj.subjectLevel == 1 ? $('#subjectName').prop("disabled", true) : '';
    //是否是最终节点
    if (obj.ifEndSubject == 0) {
        $('#mnemonicCode').prop("disabled", true);
        $('#subjectClssify').prop("disabled", true);
        $('#creditDirection').prop("disabled", true);
        $('#cashFlow').prop("disabled", true);
        $('#ifNumAccounting').prop("disabled", true);
        $('#unit').prop("disabled", true);
        $('#enable').prop("disabled", true);
        $('#ifControl').prop("disabled", true);
        $('#partnerAccounting').prop("disabled", true);
        $('#departmentAccounting').prop("disabled", true);
        $('#employeeAccounting').prop("disabled", true);
    }else{
        if(data.data.isUsed==0){
            //如果科目未被凭证明细表、科目余额表-正式、科目余额表-预计账使用，除了科目类型、余额方向外，其他都可以修改
            $('#subjectClssify').prop("disabled", true);
            $('#creditDirection').prop("disabled", true);
        }
        else{
            //如果科目已被凭证明细表、科目余额表-正式、科目余额表-预计账使用，只允许修改科目名称
            $('#subjectForm').find('input,textarea,select').not('#subjectName').attr('disabled',true)
        }
    }




}

//初始化input
function initial() {
    $('#subjectCode').prop("disabled", false);
    $('#subjectName').prop("disabled", false);
    $('#mnemonicCode').prop("disabled", false);
    $('#subjectClssify').prop("disabled", false);
    $('#creditDirection').prop("disabled", false);
    $('#cashFlow').prop("disabled", false);
    $('#ifNumAccounting').prop("disabled", false);
    $('#unit').prop("disabled", false);
    $('#enable').prop("disabled", false);
    $('#ifControl').prop("disabled", false);
    $('#partnerAccounting').prop("disabled", false);
    $('#departmentAccounting').prop("disabled", false);
    $('#employeeAccounting').prop("disabled", false);
}

//ajax obj
function submitObj(formParams) {
    formParams.id = $('#id').val();
    formParams.subjectCode = $('#subjectCode').val();
    formParams.subjectName = $('#subjectName').val();
    formParams.mnemonicCode = $('#mnemonicCode').val();
    formParams.subjectClssify = $('#subjectClssify').val();
    formParams.creditDirection = $('#creditDirection').val();
    formParams.cashFlow = $('#cashFlow').val();
    formParams.ifNumAccounting = $('#ifNumAccounting').val();
    formParams.unit = $('#unit').val();
    formParams.enable = $('#enable').val();
    formParams.ifControl = $('#ifControl').val();
    formParams.partnerAccounting = $('#partnerAccounting').val();
    formParams.departmentAccounting = $('#departmentAccounting').val();
    formParams.employeeAccounting = $('#employeeAccounting').val();
}


/***blur subjectCode***/
$(document).on('blur', '.subjectCode', function (e) {
    subjectAjax.blurSubjectCode($('#currentAccountingYear').val(), $('#subjectCode').val().trim(), '/cw/company/blurSubjectCode', function (data) {
        var obj = data.data.entity;

        //左上
        $('#subjectClssify').val(obj.subjectClssify);
        $('#subjectClssify').prop("disabled", true);
        $('#creditDirection').val(obj.creditDirection);
        $('#creditDirection').prop("disabled", true);

        //左下
        if (obj.cashFlow == 1) {
            $('#cashFlow').prop("checked", true);
            $('#cashFlow').prop("disabled", true);
        } else {
            $('#cashFlow').prop("checked", false);
        }
        $('#cashFlow').val(obj.cashFlow);
        if (obj.ifNumAccounting == 1) {
            $('#ifNumAccounting').prop("checked", true);
            $('#ifNumAccounting').prop("disabled", true);
        } else {
            $('#ifNumAccounting').prop("checked", false)
        }
        $('#ifNumAccounting').val(obj.ifNumAccounting);
        $('#unit').val(obj.unit);

        //右上
        $('#fatherSubjectName').html(obj.subjectName);
        if (obj.enable == 1) {
            $('#enable').prop("checked", true);
            $('#enable').prop("disabled", true);
        } else {
            $('#enable').prop("checked", false);
        }
        $('#enable').val(obj.enable);
        if (obj.ifControl == 1) {
            $('#ifControl').prop("checked", true);
            $('#ifControl').prop("disabled", true);
        } else {
            $('#ifControl').prop("checked", false);
        }
        $('#ifControl').val(obj.ifControl);

        //右下
        if (obj.partnerAccounting == 1) {
            $('#partnerAccounting').prop("checked", true);
            $('#partnerAccounting').prop("disabled", true);
        } else {
            $('#partnerAccounting').prop("checked", false);
        }
        $('#partnerAccounting').val(obj.partnerAccounting);
        if (obj.departmentAccounting == 1) {
            $('#departmentAccounting').prop("checked", true);
            $('#departmentAccounting').prop("disabled", true);
        } else {
            $('#departmentAccounting').prop("checked", false);
        }
        $('#departmentAccounting').val(obj.departmentAccounting);
        if (obj.employeeAccounting == 1) {
            $('#employeeAccounting').prop("checked", true);
            $('#employeeAccounting').prop("disabled", true);
        } else {
            $('#employeeAccounting').prop("checked", false);
        }
        $('#employeeAccounting').val(obj.employeeAccounting);
    });
});

/***onchange 年度***/
$(document).on('change', '#currentAccountingYear', function (e) {
    loadDataCompanySubjectTree();
    searchData();
    isDisabledSubjectControl();
});

//是否现金流量
$(document).on('change', '.xjll', function (e) {
    $(this).is(':checked') ? $('#cashFlow').val(1) : $('#cashFlow').val(0);
});

//数量核算
$(document).on('change', '.sjhs', function (e) {
    if ($(this).is(':checked')) {
        $('.jldw').removeAttr('disabled');
        $('#ifNumAccounting').val(1);
    } else {
        $('.jldw').attr('disabled', 'disabled');
        $('#ifNumAccounting').val(0);
    }
    $('.jldw').val('');
});
//停用
$(document).on('change', '.stop', function (e) {
    $(this).is(':checked') ? $('#enable').val(1) : $('#enable').val(0) && $('#enable').prop("disabled", true);
});
//是否受控科目
$(document).on('change', '.sfsk', function (e) {
    $(this).is(':checked') ? $('#ifControl').val(1) : $('#ifControl').val(0);
});
//辅助核算项
$(document).on('click', '.hesuan', function (e) {
    var hesuan = $('.hesuan'), count = 0;
    $.each(hesuan, function () {
        if (arguments[1].checked) {
            $(arguments[1]).val(1);
            count++;
        } else {
            $(arguments[1]).val(0);
        }
    });
    if (count) {
        //$('.sfsk').attr('checked',true);
        $('.sfsk').removeAttr('disabled');
    } else {
        //$('.sfsk').attr('checked',false);
        $('.sfsk').attr({'disabled': 'disabled', 'checked': false});
        $('#ifControl').val(0);
    }
});

/***init year***/
function initCurrentAccountingYear() {
    subjectAjax.initYear(function (data) {
        var list = data.data.dataList;
        var selectHtml = '';
        $(list).each(function (index, yu) {
            selectHtml += '<option value=' + yu + '>' + yu + '</option>';
        });
        $('#currentAccountingYear').html(selectHtml);
        isDisabledSubjectControl();
    });
}

/***init subjectClissify***/
function initSubjectClissify() {
    subjectAjax.subjectClssify(function (data) {
        var list = data.data.dataList;
        var selectHtml = '<option value=""></option>';
        $(list).each(function (index, yu) {
            selectHtml += '<option value=' + yu.id + '>' + yu.subjectClssifyName + '</option>';
        });
        $('#subjectClssify').html(selectHtml);
    });
}

/*删除*/
$(document).on('click', '.delete', function (e) {
    var ids = $('#companySubjectTable').jqGrid('getGridParam', 'selarrrow');
    if (ids.length == 0) {
        $.zxsaas_plus.showalert("错误", "请选择需要删除的行!");
        return false;
    } else {
        $.zxsaas_plus.showconfirm("", "是否确定删除选中数据?", function () {
            for (var i = 0, len = ids.length; i < len; i++) {
                $('#companySubjectTable').jqGrid('delRowData', ids[0]);
                //调用接口  删除

            }
        }, function () {

        });
    }
});

/*集团引用*/
$(document).on('click', '.groupIntroduce', function (e) {
    $("#groupModalGrid").trigger("reloadGrid");
    $('#groupRemCode').val('');
    $('#groupModal').modal('show');

    var setting = {
        data: {
            simpleData: {enable: true, idKey: "id", pIdKey: "pId", rootPId: null}
        },
        callback: {
            onClick: zTreeOnClick
        },
        view: {
            showIcon: false
        }
    };

    //点击树节点查询
    function zTreeOnClick(event, treeId, treeNode) {

        $.ajax({
            url: '' + treeNode.id,
            type: 'GET',
            dataType: 'JSON',
            contentType: 'application/json;charset=utf-8',
            async: false,
            success: function (data) {
                $('#groupModalGrid').jqGrid('clearGridData');
//	    		for(var i = 0,len = data.data.contactsunitList.length;i<len;i ++){
//	    			$('#groupModalGrid').jqGrid('addRowData',i,data.data.contactsunitList[i],'last');
//	    		}
            }
        });
    };
    $.ajax({
        type: 'Get',
        url: '../../json/cw/accountSub.json',
        dataType: "json",
        success: function (data) {
            $.fn.zTree.init($('#groupTreeData'), setting, data);
            var zTree = $.fn.zTree.getZTreeObj('groupTreeData');
            zTree.expandAll(true);//展开全部节点
        },
        error: function (msg) {
            alert(" 数据加载失败！" + msg);
        }
    });

    //加载表格
    var options = {
        LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
        LoadTableUrl: '../../json/cw/unit.json',
        TableName: "#groupModalGrid",
        pager: "#groupGridpager"
    };
    $.jgrid.defaults.width = 1280;
    $.jgrid.defaults.responsive = true;
    $.jgrid.defaults.styleUI = 'Bootstrap';
    var lastsel = '';//最后一次选中的行
    var rightClickColid = "";//右键列id
    var rightClickColIndex = 0;//右键index
    var mydata;
    var hid = false;
    var lock = false;
    var myobj = [];
    var colNames = ['ID', '公司ID', '级次', '科目编码', '科目名称', '科目类型', '余额方向'];
    var JqGridColModel = [
        {name: 'id', index: 'id', width: 55, align: 'center', sorttype: 'string', hidden: true},
        {name: 'companyId', index: 'companyId', width: 55, align: 'center', sorttype: 'string', hidden: true},
        {name: 'jc', index: 'jc', width: 100, align: 'center', sorttype: 'string', sortable: false},
        {name: 'code', index: 'code', width: 100, align: 'center', sorttype: 'string', sortable: false},
        {name: 'name', index: 'name', width: 100, align: 'center', sorttype: 'string', sortable: false},
        {name: 'clazz', index: 'clazz', width: 100, align: 'center', sorttype: 'string', sortable: false},
        {name: 'direction', index: 'direction', width: 100, align: 'center', sorttype: 'string', sortable: false}
    ];

    $(options.TableName).jqGrid({
        url: options.LoadTableUrl,
        mtype: "GET",
        datatype: "json",
        jsonReader: {
            root: "data.contactsunitList",
            repeatitems: false,
            page: 'data.page',
            total: 'data.pageCount',
            records: 'data.totalCount'
        },
        colNames: colNames,
        colModel: JqGridColModel,
        sortable: false,
        rownumbers: true,
        rowNum: 30,
        rowList: [50, 100, 200],
        pager: options.pager,
        viewrecords: true,
        multiselect: true,
        width: "100%",
        height: $(window).height() * 0.54,
        autowidth: true,
        rownumWidth: 35,
        shrinkToFit: false,
        ondblClickRow: function () {
            var clickData = $(options.TableName).jqGrid('getRowData', arguments[0]);
            var clickId = clickData.id,
                clickName = clickData.name;
        },
        beforeEditCell: function (rowid, cellname, v, iRow, iCol) {
            lastrow = iRow;
            lastcell = iCol;
        },
        loadComplete: function (data) {
            $(options.TableName).jqGrid('setLabel', 0, '序号');

        }
    })
});

/*集团引用参照  保存*/
$(document).on('click', '.saveSub', function (e) {
    //获取选中行
    var ids = $('#groupModalGrid').jqGrid('getGridParam', 'selarrrow'),
        subCode = [],
        subName = [];
    $.each(ids, function () {
        var rData = $('#groupModalGrid').jqGrid('getRowData', arguments[1]);//获取每行数据
        subCode.push(rData.code);
        subName.push(rData.name);
    });
    //调接口

    $('#subjectModal').modal('hide');
});

/*集团引用参照搜索*/
$(document).on('keyup', '#groupRemCode', function () {
    $.ajax({
        url: '' + $(this).val(),
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json;charset=utf-8',
        success: function (data) {
            var sData = data.data.xx;
            $('#groupModalGrid').jqGrid('clearGridData');
            if (sData.length == 0) {
                $.zxsaas_plus.showalert("错误", "没有匹配的数据!")
            } else {
                for (var i = 0, len = sData.length; i < len; i++) {
                    $('#groupModalGrid').jqGrid('addRowData', i, sData[i], 'last');
                }
            }
        }
    });
});

/*科目对照*/
$(document).on('click', '.subjectContrast', function (e) {
    var d = new Date();
    var year = d.getFullYear();
    subComparison('../../json/cw/ciqiong.json', '#jqGrid_subComparison', 'jqGridPager_subComparison', true, (year - 1));//前一年
    subComparison('../../json/cw/ciqiong.json', '#jqGrid_subComparisonRight', 'jqGridPager_subComparisonRight', false, year);//本年
    $('#subComparisonModal').modal('show');
});

/*科目对照 弹窗*/
function subComparison(url, tName, tPage, flag, year) {
    var options = {
        LoadBtnUrl: "../../json/button.json",
        LoadTableUrl: url,
        TableName: tName,
        pager: tPage,
    };
    $.jgrid.defaults.width = 1280;
    $.jgrid.defaults.responsive = true;
    $.jgrid.defaults.styleUI = 'Bootstrap';
    var lastsel = '';
    var mydata;
    var hid = false;
    var lock = false;
    var myobj = [];
    var colNames = ['ID', '科目编码', '科目名称'];
    var JqGridColModel = [];
    var JqGridColModelOld = [
        {name: 'id', index: 'id', width: 200, align: 'center', sorttype: 'int', hidden: true, sortable: false},
        {
            name: 'subjectCode',
            index: 'subjectCode',
            width: 200,
            align: 'center',
            sorttype: 'string',
            editable: false,
            sortable: false
        },
        {
            name: 'subjectName',
            index: 'subjectName',
            width: 200,
            align: 'center',
            sorttype: 'string',
            editable: false,
            sortable: false
        },
    ];
    var JqGridColModelNew = [
        {name: 'id', index: 'id', width: 200, align: 'center', sorttype: 'int', hidden: true, sortable: false},
        {
            name: 'subjectCode',
            index: 'subjectCode',
            width: 200,
            align: 'center',
            sorttype: 'string',
            editable: true,
            sortable: false,
            editoptions: {dataEvents: [{type: "blur", fn: searchByCode}]}
        },
        {
            name: 'subjectName',
            index: 'subjectName',
            width: 200,
            align: 'center',
            sorttype: 'string',
            editable: true,
            edittype: 'custom',
            sortable: false,
            editoptions: {
                custom_element: function (value, options) {
                    var html = '<input type="text" class="form-control unitInput" style="border:0;text-align:center;width:96%;" value="' + value + '" /><span style="float:right;margin-top:-27px;margin-right:20px;" class="glyphicon glyphicon-plus" onclick="subChooseModal(this);" data-toggle="modal" data-target="" data-rId="' + options.rowId + '"></span>';
                    return $(html);
                },
                custom_value: function (value) {
                    return value.val();
                }
            }
        },
    ];
    JqGridColModel = flag ? JqGridColModelOld : JqGridColModelNew;
    $(options.TableName).jqGrid({
        url: options.LoadTableUrl,
        mtype: "GET",
        datatype: "json",
        //datatype: "local",
        jsonReader: {
            root: "rows",
            repeatitems: false
        },
        colNames: colNames,
        colModel: JqGridColModel,
        sortable: false,
        rownumbers: flag,
        cellsubmit: 'clientArray',//单元格保存内容的位置		
        editurl: 'clientArray',
        viewrecords: true,
        cellEdit: !flag,
        rowNum: 10000000,
        width: "100%",
        height: $(window).height() * 0.55,
        autowidth: true,
        rownumWidth: 55,
        shrinkToFit: false,
        beforeEditCell: function (rowid, cellname, v, iRow, iCol) {
            lastrow = iRow;
            lastcell = iCol;
        },
        loadComplete: function (data) {
            $(options.TableName).jqGrid('setLabel', 0, '序号');
            /*设置二级表头哦*/
            $(options.TableName).jqGrid('setGroupHeaders', {
                useColSpanStyle: true,
                groupHeaders: [
                    {startColumnName: 'subjectCode', numberOfColumns: 2, titleText: '<em>' + year + '</em>'}
                ]
            });
        }
    })
}


/*科目 参照*/
var lNum = '';

function subChooseModal(t) {
    $("#unitModalGrid").trigger("reloadGrid");
    $('#subSearch').val('');
    lNum = $(t).data('rid');
    $('#subjectDirModal').modal('show');
    var setting = {
        data: {
            simpleData: {enable: true, idKey: "id", pIdKey: "pId", rootPId: null}
        },
        callback: {
            onClick: zTreeOnClick
        },
        view: {
            showIcon: false
        }
    };

    //点击树节点查询
    function zTreeOnClick(event, treeId, treeNode) {

        $.ajax({
            url: '' + treeNode.id,
            type: 'GET',
            dataType: 'JSON',
            contentType: 'application/json;charset=utf-8',
            async: false,
            success: function (data) {
                $('#groupModalGrid').jqGrid('clearGridData');
//	    		for(var i = 0,len = data.data.contactsunitList.length;i<len;i ++){
//	    			$('#groupModalGrid').jqGrid('addRowData',i,data.data.contactsunitList[i],'last');
//	    		}
            }
        });
    };
    $.ajax({
        type: 'Get',
        url: '../../json/cw/accountSub.json',
        dataType: "json",
        success: function (data) {
            $.fn.zTree.init($('#groupTreeData2'), setting, data);
            var zTree = $.fn.zTree.getZTreeObj('groupTreeData2');
            zTree.expandAll(true);//展开全部节点
        },
        error: function (msg) {
            alert(" 数据加载失败！" + msg);
        }
    });
    var options = {
        LoadBtnUrl: "../../json/button.json",
        LoadTableUrl: '../../json/cw/unit.json',
        TableName: "#unitModalGrid",
        pager: "#unitGridpager"
    };
    $.jgrid.defaults.width = 1280;
    $.jgrid.defaults.responsive = true;
    $.jgrid.defaults.styleUI = 'Bootstrap';
    var lastsel = '';//最后一次选中的行
    var mydata;
    var hid = false;
    var lock = false;
    var myobj = [];
    var colNames = ['ID', '公司ID', '级次', '科目编码', '科目名称', '科目类型', '余额方向'];
    var JqGridColModel = [
        {name: 'id', index: 'id', width: 55, align: 'center', sorttype: 'string', hidden: true},
        {name: 'companyId', index: 'companyId', width: 55, align: 'center', sorttype: 'string', hidden: true},
        {name: 'jc', index: 'jc', width: 100, align: 'center', sorttype: 'string', sortable: false},
        {name: 'code', index: 'code', width: 100, align: 'center', sorttype: 'string', sortable: false},
        {name: 'name', index: 'name', width: 100, align: 'center', sorttype: 'string', sortable: false},
        {name: 'clazz', index: 'clazz', width: 100, align: 'center', sorttype: 'string', sortable: false},
        {name: 'direction', index: 'direction', width: 100, align: 'center', sorttype: 'string', sortable: false}
    ];

    $(options.TableName).jqGrid({
        url: options.LoadTableUrl,
        mtype: "GET",
        datatype: "json",
        jsonReader: {
            root: "data.contactsunitList",
            repeatitems: false,
            page: 'data.page',
            total: 'data.pageCount',
            records: 'data.totalCount'
        },
        colNames: colNames,
        colModel: JqGridColModel,
        sortable: false,
        rownumbers: true,
        rowNum: 10,
        rowList: [50, 100, 200],
        pager: options.pager,
        viewrecords: true,
//	            multiselect:true,
        width: "100%",
        height: $(window).height() * 0.54,
        autowidth: true,
        rownumWidth: 35,
        shrinkToFit: false,
        ondblClickRow: function () {
            var clickData = $(options.TableName).jqGrid('getRowData', arguments[0]);
            var clickId = clickData.id,
                clickName = clickData.name,
                clickCode = clickData.code;
            $('#jqGrid_subComparisonRight').jqGrid('saveCell', lastrow, lastcell);
            $('#jqGrid_subComparisonRight').jqGrid('setCell', lNum, 'subjectCode', clickCode);
            $('#jqGrid_subComparisonRight').jqGrid('setCell', lNum, 'subjectName', clickName);
            $('#subjectDirModal').modal('hide');
        },
        beforeEditCell: function (rowid, cellname, v, iRow, iCol) {
            lastrow = iRow;
            lastcell = iCol;
        },
        loadComplete: function (data) {
            $(options.TableName).jqGrid('setLabel', 0, '序号');

        }
    })
}

/*科目参照搜索*/
$(document).on('keyup', '#subSearch', function () {
    $.ajax({
        url: '' + $(this).val(),
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json;charset=utf-8',
        success: function (data) {
            var sData = data.data.contactsunitList;
            $('#unitModalGrid').jqGrid('clearGridData');
            if (sData.length == 0) {
                $.zxsaas_plus.showalert("错误", "没有匹配的数据!");
            } else {
                for (var i = 0, len = sData.length; i < len; i++) {
                    $('#unitModalGrid').jqGrid('addRowData', i, sData[i], 'last');
                }
            }
        }
    });
});

/*科目对照弹窗 科目编码搜索*/
var searchByCode = function () {
    $.ajax({
        url: "" + $(this).val(),
        type: "get",
        dataType: 'JSON',
        contentType: 'application/json;charset=utf-8',
        success: function (data) {
            if (!true) {//有数据
                $('#jqGrid_subComparisonRight').jqGrid('saveCell', lastrow, lastcell);
                $('#jqGrid_subComparisonRight').jqGrid('setCell', $(this).attr('rowid'), 'subjectCode', clickCode);
                $('#jqGrid_subComparisonRight').jqGrid('setCell', $(this).attr('rowid'), 'subjectName', clickName);
            } else {
                $.zxsaas_plus.showalert("错误", "没有匹配的数据!");
            }

        }
    });
}

/*差异科目*/
$(document).on('click', '.subDiff', function (e) {
    var d = new Date();
    var year = d.getFullYear();
    subComparison('../../json/cw/ciqiong.json', '#jqGrid_subDiff', 'jqGridPager_subDiff', true, (year - 1));//前一年
    subComparison('../../json/cw/ciqiong.json', '#jqGrid_subDiffRight', 'jqGridPager_subDiffRight', false, year);//本年
    $('#jqGrid_subDiffRight').jqGrid('setGridParam', {'cellEdit': false});
    $('#subDiffModal').modal('show');

});

/*科目信息*/
$(document).on('click', '.subInfo', function (e) {
    var id = $('#jqGrid_subDiffRight').jqGrid('getGridParam', 'selrow');
    if (id.length == 0) {
        $.zxsaas_plus.showalert("错误", "请选择需要删除的行!");
        return false;
    } else {
        //调用接口查询选中行详情  渲染页面数据


        $('.clear').attr('disabled', true);
        $('.save').attr('disabled', true);
        $('.saveAndAdd').attr('disabled', true);
        $('#subjectModal').modal('show');

    }

});


