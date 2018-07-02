var lastrow;
var lastcell;
var num = '7';
$(window).resize(function() {
    $('.grid-wrap').find('.ui-jqgrid-bdiv').css({
        'overflow-x': 'hidden'
    });
    $('.grid-wrap').css({
        'overflow-x': 'hidden'
    });
});
//禁止输入非数字
function clearNoNum(obj) {
    var xck = $(obj).parent().prev().html();
    obj.value = obj.value.replace(/[^\d]/g, "");
    if (obj.value.length > 10) {
        obj.value = obj.value.substring(0, 10);
    }
    if (($(obj).val()) * 1 > (xck * 1)) {
        if (!$('.modal').is(':visible')) $.zxsaas_plus.showalert("提示信息", "数量应该小于现库存!");
        $(obj).val('');
    }
}
//备注
function clearRemark(obj, num) {
    if (obj.value.length > num) {
        obj.value = obj.value.substring(0, num);
    }
}
$(function() {
    AppEvent.on('getSectionId', function() {
        return $('#outDepartmentId').val();
    });
    // 刷新表单禁用状态
    AppEvent.on('refreshDisabled', function(event) {
        // 单据状态
        var status = $('#slideThree').val();
        // 列表数据
        var rows = $("#jqGrid_SubjectBalance").getDataIDs();
        var buttons = {
            'billsCode': '单据编号',
            'outDepartmentName': '调出部门',
            'billsDateString': '单据日期',
            'managersUid': '经手人',
            'inDepartmentName': '调入部门',
            'remark': '备注单'
        };
        // 如果是正式单据
        if (status == 0 && rows.length) {
            $.each(buttons, function(key, value) {
                if (key != 'remark') {
                    $('#' + key).attr('disabled', 'disabled');
                } else {
                    $('#' + key).attr('disabled', false);
                }
                if (key == 'outDepartmentName' || key == 'inDepartmentName') {
                    $('#' + key).parents('.input-group').find('button').attr('disabled', 'disabled');
                }
            });
        } else {
            $.each(buttons, function(key, value) {
                $('#' + key).attr('disabled', false);
                if (key == 'outDepartmentName' || key == 'inDepartmentName') {
                    $('#' + key).parents('.input-group').find('button').attr('disabled', false);
                }
            });
        }
        // 如果是已作废的单子,禁用作废按钮
        if (ibillsMainCC.billsStatus == 9 || ibillsMainCC.billsStatus == 10) $('.toVoid').attr('disabled', 'disabled');
        else $('.toVoid').attr('disabled', false);
    })
    storageObj = new StorageObj(basePath);
    loadmodal();
    funBlurInit();
    loadtableLeft(); //串号管理
    filterSelect();
    $("#startTimeStr").datetimepicker({
        lang: "ch", //语言选择中文
        format: "Y-m-d", //格式化日期
        timepicker: false, //关闭时间选项
        todayButton: false //关闭选择今天按钮
    });
    $("#endTimeStr").datetimepicker({
        lang: "ch", //语言选择中文
        format: "Y-m-d", //格式化日期
        timepicker: false, //关闭时间选项
        todayButton: false //关闭选择今天按钮
    });
    $('.multi_select_audit').MSDL({
        'width': '180',
        'data': ['已发货', '已接收', '拒收', '作废'],
        'ids': ['8', '10', '11', '9'],
        'msg': '_audit'
    });
    //串号匹配
    $(".input-none").focus(function() {
        $(".none-cx").show();

    });
    $(document).on('click', '.none-cx>ul>li', function() {
        $(".input-none").val($(this).text());
        $(".none-cx").hide();
    })
});
/***init 经手人***/
function initManagers() {
    //部门选择后才能选择经手人
    $('#managersUid').removeAttr('disabled');
    $('#managersUid').html('');
    var selectHtml = '';
    storageObj.initManagers($('#outDepartmentId').val(), function(data) {
        var list = data.data.employeeVoList;
        if(list){
	        $(list).each(function(index, yu) {
	            selectHtml += '<option value="' + yu.id + '">' + yu.name + '</option>'
	        });
        }
    });
    $('#managersUid').append(selectHtml);
}
/*************************************前端表格**************************************************/
function loadmodal() {
    var options = {
        LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
        GetRowInfoUrl: "", //编辑时获取数据详细信息接口加载地址
        DelRowUrl: "", // 删除信息接口地址
        isSub: "", //是否有子级表格
        subLoadTableUrl: "", //子级表格数据来源地址
        TableName: "#jqGrid_SubjectBalance", //显示表格名称。遵照css选择器书写
        iconJsonUrl: "../json/icon.json",
        btnbox: ".btnbox " //功能按钮存放容器。遵照css选择器书写	
    };
    $("#billsDateString").datetimepicker({
        lang: "ch", //语言选择中文
        format: "Y-m-d", //格式化日期
        timepicker: false, //关闭时间选项
        todayButton: false //关闭选择今天按钮
    }).on('blur', function(ev) {
        refreshValidatorField("billsDateString", '#ibillsHead'); //刷新验证信息
    });
    $.jgrid.defaults.width = 1280;
    $.jgrid.defaults.responsive = true;
    $.jgrid.defaults.styleUI = 'Bootstrap';
    var lastsel = ''; //最后一次选中的行
    var rightClickColid = ""; //右键列id
    var rightClickColIndex = 0; //右键index
    var mydata;
    var hid = false;
    var lock = false;
    var myobj = [];
    var colNames = ['操作', '仓库名称', '商品名称', '现库存', '数量', '商品备注', '仓库id', 'id', '商品id', '是否管理串号', '单价', '新增人', '新增时间', '成本价', '主表ID', '总价'];
    var JqGridColModel = [
        {name: 'deliveryDo', index: 'deliveryDo', width: 70, align: 'center', formatter: addAndDelete, sortable: false},
        {name: 'storageName', index: 'storageName', width: 200, align: 'center', sorttype: 'string', sortable: false, editable: true, edittype: 'custom', editoptions: {
                custom_element: function(value, option) {
                    return '<input value="' + value + '" readonly="readonly" class="form-control" /><span data-rid=' + option.rowId + ' class="ckmc glyphicon glyphicon-plus" onClick="showStorage(' + option.rowId + ')" style="margin-left:-40px;margin-top:-25px;" ></span>'
                },
                custom_value: function(value) {
                    return value.val();
                }
            }
        }, 
        {name: 'goodsName', index: 'goodsName', width: 200, align: 'center', sorttype: 'string', sortable: false, editable: true, edittype: 'custom', editoptions: {
                custom_element: function(value, options) {
                    return '<input type="text" readonly="readonly" id="goodsName' + options.rowId + '" class="form-control" value="' + value + '" /><span style="margin-top:-25px;margin-left:-40px;" data-rId="' + options.rowId + '" class="spmc glyphicon glyphicon-plus colspan2" onclick="showGoods(' + options.rowId + ')"></span></span>';
                },
                custom_value: function(value) {
                    return value.val();
                }
            }
        }, 
        {name: 'stockNumber', index: 'stockNumber', width: 200, align: 'center', sorttype: 'integer', sortable: false}, 
        {name: 'goodsNumber', index: 'goodsNumber', width: 200, align: 'center', sorttype: 'integer', editable: true, sortable: false, editoptions: {
                dataEvents: [{
                    type: "blur",
                    fn: saveCell
                }],
                onkeyup: "clearNoNum(this)"
            }
        },
        {name: 'remark', index: 'remark', width: 200, align: 'center', sorttype: 'string', editable: true, sortable: false, editoptions: {
                dataEvents: [{
                    type: "blur",
                    fn: saveCell
                }],
                onkeyup: "clearRemark(this,100)"
            }
        },
        {name: 'storageId', index: 'storageId', hidden: true, sortable: false},
        {name: 'id', index: 'id', hidden: true, sortable: false},
        {name: 'goodsId', index: 'goodsId', hidden: true, sortable: false},
        {name: 'ifManageImei', index: 'ifManageImei', hidden: true, sortable: false},
        {name: 'price', index: 'price', hidden: true, sortable: false, footerrow: true},
        {name: 'createBy', index: 'createBy', hidden: true, sortable: false},
        {name: 'createDateString', index: 'createDateString', hidden: true, sortable: false},
        {name: 'costPrice', index: 'costPrice', hidden: true, sortable: false},
        {name: 'billsMainId', index: 'billsMainId', hidden: true, sortable: false},
        {name: 'amount', index: 'amount', width: 100, align: 'center', sorttype: 'integer', hidden: true, sortable: false}
    ];
    loadtable();
    //加载表格
    function loadtable() {
        $(options.TableName).jqGrid({
            //					url:options.LoadTableUrl,
            mtype: "GET",
            datatype: "json",
            data: mydata,
            jsonReader: {
                root: "rows",
                repeatitems: false
            },
            colNames: colNames,
            colModel: JqGridColModel,
            sortable: false,
            rownumbers: true,
            cellsubmit: 'clientArray', //单元格保存内容的位置		
            editurl: 'clientArray',
            rowNum: 15,
            rowList: [10, 15, 20, 25, 40],
            pager: options.pager,
            viewrecords: true,
            //		            multiselect:true,
            cellEdit: true,
            width: "100%",
            height: $(window).height() * 0.45,
            autowidth: true,
            rownumWidth: 35, // the width of the row numbers columns
            shrinkToFit: true, //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
            footerrow: true, //设置表格显示表脚
            userDataOnFooter: true, //设置userData 显示在footer里
            ondblClickRow: function(id) {
                //双击进入编辑
                var delid = id;
            },
            beforeEditCell: function(rowid, cellname, v, iRow, iCol) {
                lastrow = iRow;
                lastcell = iCol;
            },
            //单元格编辑后出发  rowid - 数据行的id   cellname-单元格名称（colModel定义的name）  value - 单元格内容   iRow - 单元格所在行的行号（注意不要和rowid搞混），iRow从1开始    iCol - 单元格处于行中的列号，iCol从0开始
            afterSaveCell: function(rowid, cellname, value, iRow, iCol) {},
            onCellSelect: function(id, index, e) {
            	
            },
            onSelectRow: function(id) {
                if (id != lastsel && lastsel != '') {
                    $(options.TableName).jqGrid('saveRow', lastsel, {
                        aftersavefunc: function(rowid, response) {

                        }
                    });
                }
                lastsel = id;
                var rec = $(options.TableName).jqGrid('getRowData', id);
            },
            beforeSelectRow: function(rowid, e) {
                jqgridRowId = rowid;
                //数量修改  
                //   0    表示串号管理     
                //   1    数量管理
                var rowData = $("#jqGrid_SubjectBalance").getRowData(rowid);
                if (rowData.ifManageImei == '1') {
                    $('#jqGrid_SubjectBalance').setColProp('goodsNumber',{editable: false});
                    $("#jqGrid_SubjectBalance").find('#' + rowid).find("td:eq(5)").attr({
                        "data-toggle": "modal",
                        "data-target": "#numberChoose",
                        "data-rId": rowid
                    });
                    $("#jqGrid_SubjectBalance").find('#' + rowid).find("td:eq(5)").addClass("numberPlus");
                } else {
                    $("#jqGrid_SubjectBalance").find('#' + rowid).find("td:eq(5)").removeAttr("data-toggle");
                    $("#jqGrid_SubjectBalance").find('#' + rowid).find("td:eq(5)").removeAttr("data-target");
                    $("#jqGrid_SubjectBalance").find('#' + rowid).find("td:eq(5)").removeAttr("data-rId");
                    $("#jqGrid_SubjectBalance").find('#' + rowid).find("td:eq(5)").removeClass("numberPlus");
                    $('#jqGrid_SubjectBalance').setColProp('goodsNumber', {
                        editable: true
                    });
                }
            },
            afterInsertRow: function(rowid, aData) { //新增一行之后
                arithmeticNo(rowid, aData.goodsNumber, aData.price);
            },
            gridComplete: function() {
                $(window).trigger('resize');
                var parentId = $(this).attr('id');
                if (parentId = 'jqGrid_SubjectBalance') {
                    $('.moveFlag').remove();
                    var tdListTime = $('#jqGrid_SubjectBalance').getGridParam('colModel');
                    var tdHtml = $.map(tdListTime, function() {
                        return '<td></td>'
                    }).join(" ");
                    var html = "<tr class='moveFlag' style='height:40px;outline-style:none;'><td><span id='addIcon' class='glyphicon glyphicon-plus-sign'></span></td>" + tdHtml + "</tr>"
                    $('#jqGrid_SubjectBalance tbody').append(html);
                }
                footerData();
                // 单据状态
                var status = $('#slideThree').val();
                // 列表数据
                var rows = $("#jqGrid_SubjectBalance").getDataIDs();
                // 正式单据
                if (status == 0 && rows.length) {
                    // 禁用编辑
                    $('#jqGrid_SubjectBalance').setGridParam({
                        'cellEdit': false
                    });
                }else{
                    // 启用编辑
                    $('#jqGrid_SubjectBalance').setGridParam({
                        'cellEdit': true
                    });
                }
            },
            loadComplete: function(data) {

            },
            loadError: function(xhr, status, error) {}
        })
    }
    $(window).bind('click', function saveEdit(e) {
        var rowId = $(e.target).parent("tr").attr("id");
        if (lastsel != "" && lastsel != rowId) { //用于点击其他地方保存正在编辑状态下的行
            if ($(e.target).closest(options.TableName).length == 0) {
                $(options.TableName).jqGrid('saveRow', lastsel);
                lastsel = '';
            }
        }
    });
    /***save ***/
    function saveCell() {
        $("#jqGrid_SubjectBalance").jqGrid("saveCell", lastrow, lastcell);
        footerData();
    }
    function addAndDelete(cellvalue, options, rowObjec) {
        var addAndDel = '<div class="operating" data-id="' + options.rowId + '"></span><span class="glyphicon glyphicon-trash" aria-hidden="true" id="add_row" title="删除行"></span></div>';
        return addAndDel;
    }
    /***删除一行***/
    $(document).on('click', '.glyphicon-trash', function(e) {
        // 单据状态
        var status = $('#slideThree').val();
        // 列表数据
        var rows = $("#jqGrid_SubjectBalance").getDataIDs();
        // 非正式单据
        if (status != 0){
            // 启用编辑
            var thisTitle = $(this).attr("title");
            var rowId = $(this).parent().data('id');
            $('#jqGrid_SubjectBalance').jqGrid('delRowData', rowId);
        }
    });
    /***新增一行***/
    $(document).on('click', '#addIcon', function(e) {
        // 单据状态
        var status = $('#slideThree').val();
        // 列表数据
        var rows = $("#jqGrid_SubjectBalance").getDataIDs();
        // 非正式单据
        if (status != 0){
            // 启用编辑
            var idList = $("#jqGrid_SubjectBalance").getDataIDs();
            var maxId = idList.length == 0 ? 0 : Math.max.apply(null, idList);
            var row = $("#jqGrid_SubjectBalance").jqGrid('getRowData', maxId);
            $('#jqGrid_SubjectBalance').jqGrid('addRowData', maxId + 1, {
                storageName: '',
                goodsName: '',
                stockNumber: 0,
                goodsNumber: 0,
                remark: '',
                price: 0
            }, 'last');
        }
    });
    /**
     * 自定义列计算
     * @param val
     * @param name
     * @param record
     * @returns {String}
     */
     /**
     * 修改表格底部
     */
    function footerData() {
        var footerSum = $("#jqGrid_SubjectBalance").getCol('goodsNumber', false, 'sum');
        $("#jqGrid_SubjectBalance").jqGrid('footerData', 'set', {
            "goodsNumber": footerSum
        });
    }
    //查询
    $(document).on("click", ".btn-group button[data-eventname='inquire']", function(event) {
        if (flag == true) {
            $.jgrid.GridDestroy(options.TableName);
            loadtable();
        } else {
            flag = true;
        }

    });
    $(document).on("click", ".btn button[data-eventname='printbtn']", function(event) {
        $.zxsaas_plus.showalert("表格打印操作", "表格打印操作咱未完成，敬请期待");

    });
    $(document).on("click", ".btnbox button[data-eventname='exportTablename']", function(event) {
        $.zxsaas_plus.showalert("表格导出操作", "表格导出操作咱未完成，敬请期待");

    });
    
    //单据状态不同时引入串号弹框button状态管理
    $('#numberChoose').on('shown.bs.modal',function(){
    	if($('.slideThree input[type=checkbox]').val()==0){
    		$('#numberChoose .coverDemo button').prop('disabled',true);
    		$('#numberChoose .modal-footer button').prop('disabled',true);
    		$('#jqGrid_tranNumber').setGridParam({'cellEdit':false});
    		$('#jqGrid_tranNumber').setGridParam({'cellEdit':false});
    	}else{
    		$('#numberChoose .coverDemo button').prop('disabled',false);
    		$('#numberChoose .modal-footer button').prop('disabled',false);
    		$('#jqGrid_tranNumber').setGridParam({'cellEdit':true});
    		$('#jqGrid_tranNumber').setGridParam({'cellEdit':true});
    	}
    })
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
}