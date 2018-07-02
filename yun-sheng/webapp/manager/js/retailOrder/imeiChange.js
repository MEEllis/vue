/*串号变更.js*/
var AppEvent = $({});
// 注册事件 按钮禁用状态集中管理
AppEvent.on('buttonsRefresh', function(event, data) {
    var buttons = {
		'saveData':true,
        'deleteReceipts': true,
        'execute': true
    };
    //没有数据禁止保存，删除，执行按钮
    if (!data) {
    	buttons['saveData'] = false;
        buttons['deleteReceipts'] = false;
        buttons['execute'] = false;
    } else if (data.data.orderVo) {
        var result = data.data.orderVo;
        var billsStatus = result.billsStatus;
        // 已执行
        if (billsStatus) {
        	buttons['saveData'] = false;
            buttons['deleteReceipts'] = false;
            buttons['execute'] = false;
        } else {
        	buttons['saveData'] = true;
            buttons['deleteReceipts'] = true;
            buttons['execute'] = true;
        }
    }
    // 处理dom
    $.each(buttons, function(key, value) {
        var $button = $('.' + key);
        if (value) $button.attr('disabled', false);
        else $button.attr('disabled', true);
    })
    AppEvent.trigger('disabled', [data]);
});
$(function() {
	$('#billsTime').inputCombination().timeControl();
    //页面加载 初始化主表
    loadmodal('', '#dataGrid', '#jqGridPager', false, '0');
    //时间控件初始化
    var timeList = ['#datetimepickerStart', '#datetimepickerEnd', '#datetimepickerStart1', '#datetimepickerEnd1', '#datetimepickerStart2', '#datetimepickerEnd2', '#datetimepickerStart11', '#datetimepickerEnd11'];
    $.each(timeList, function() {
        $(arguments[1]).datetimepicker({
            lang: "ch", //语言选择中文
            format: "Y-m-d", //格式化日期
            timepicker: false, //关闭时间选项
            todayButton: false //关闭选择今天按钮
        });
    });
    // 刷新按钮
    AppEvent.trigger('buttonsRefresh');
    $('.saveData').prop('disabled',false)

    //查询条件  部门选择
    $("#sectionName").storePlu({
        isStoreShow:false,
        isLoadDefaultName:0,
        checkMore: false,
        search: false,
        ifStore: false, // 控制部门选项
        changeStore:function(){
            var id=$("#sectionName").data('sectionId');
           $("#sectionId").val(id)
        }
    });
    //过滤条件   部门选择
    $(".depFilter").storePlu({
        isStoreShow:false,
        isLoadDefaultName:0,
        checkMore: true,
        search: false,
        ifStore: false, // 控制部门选项
        changeStore:function(){
            var id=$(".depFilter").data('sectionId');
            $(".filter_tree_ids").val(id)
        }
    });
    //串号变更查询   部门选择
    $(".unitSearch").storePlu({
        isStoreShow:false,
        isLoadDefaultName:0,
        checkMore: false,
        search: false,
        ifStore: false, // 控制部门选项
        changeStore:function(){
            var id=$("unitSearch").data('sectionId');
            $(".search_tree_ids").val(id)
        }
    });

    $(".imeiImport").click(function(){
        $('#imeiImportModel').modal('show')
    })
    $(".imeiImportOK").click(function(){
        var fileName =$("#file").val();
        var fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);
        if(fileExtension == "xls"){
            $.loading();
            $.ajaxFileUpload({
                url : "/manager/imei/change/excelFileImport",
                fileElementId : "file",
                dataType : "json",
                success : function(data) {
                    $.loading(true);
                    if(data.result==1){
                        $('#imeiImportErrInfo').text('总请求行数：'+data.data.importResult.totalCount+'。正确条数：'+data.data.importResult.successCount
                            +'。错误条数：'+data.data.importResult.failedCount+'。')
                        if(data.data.importResult.downloadFlag==1){
                            $('.imeiImportError').show()
                        }else{
                            $('.imeiImportError').hide()
                            var successList=data.data.importResult.successList
                           var existImeiIdList = $('#dataGrid').getCol('sourceImeiId')
                            var existDataList =$('#dataGrid').getGridParam().data
                            var addList=[]
                            for(var i=0;i<successList.length;i++){
                                var successItem=successList[i]
                                successItem.sourceImeiId=successItem.imeiId
                                successItem.imei=successItem.oldImei
                                successItem.auxiliaryImei=successItem.oldAuxiliaryImei
                                if($.inArray($.trim( successItem.sourceImeiId),existImeiIdList) ==-1){
                                    addList.push(successItem);
                                }
                            }
                            var newData = existDataList.concat(addList);
                            $('#dataGrid').setGridParam({data:newData}).trigger('reloadGrid');

                        }


                    }

                },
                error : function(data) {
                    //上传失败
                    if($.trim(fileName)=="")
                    {
                        $.zxsaas_plus.showalert("导入失败","请选择上传文件！");
                    }else{
                        $.zxsaas_plus.showalert("导入失败","上传文件失败！");
                    }
                    $.loading(true);
                }
            });
        }else{
            if($.trim(fileName)=="")
            {
                $.zxsaas_plus.showalert("提示","请选择上传文件！");

            }else{
                $.zxsaas_plus.showalert("错误","请选择xls格式文件上传！");
            }
            return false;

        }
    })
});

var tableArr = [] //表格数据

/**
 * 获取表格模版
 */
var getColTpl = function(choiseStr) {
    var tlp = [];
    var colNames0 = ['串号ID', '操作', '商品名称', '串号', '辅助串号', '新串号', '新辅助串号', '备注'];
    var JqGridColModel0 = [{name: 'sourceImeiId', index: 'sourceImeiId', width: 200, align: 'center', sorttype: 'int', hidden: true, sortable: false},
        {name: 'deliveryDo', index: 'deliveryDo', width: 70, align: 'center',sortable: false, formatter: function(cellvalue, options, rowObjec) {
            return addAndDel = '<div class="operating" data-id="' + options.rowId + '" data-gId="' + rowObjec.goodsId + '"><span class="readOnly glyphicon glyphicon-trash trashRow" aria-hidden="true" id="add_row" title="删除行"></span></div>';
        }},
        {name: 'goodsName', index: 'goodsName', width: 200, align: 'center', sorttype: 'string', sortable: false,hidden:true},
        {name: 'imei', index: 'imei', width: 200, align: 'center', sorttype: 'string', sortable: false}, 
        {name: 'auxiliaryImei', index: 'auxiliaryImei', width: 200, align: 'center', sorttype: 'string', sortable: false}, 
        {name: 'newImei', index: 'newImei', width: 200, align: 'center', sorttype: 'string', editable: true, sortable: false,editoptions:{
            dataEvents: [{
                type: "blur",
                fn: function(e) {
            		$("#dataGrid").jqGrid("saveCell", lastrow, lastcell);
                }
            }]
        }}, 
        {name: 'newAuxiliaryImei', index: 'newAuxiliaryImei', width: 200, align: 'center', sorttype: 'float', editable: true,sortable: false, editoptions: {
            dataEvents: [{
                type: "blur",
                fn: function(e) {
            		$("#dataGrid").jqGrid("saveCell", lastrow, lastcell);
                }
            }]
        }}, 
        {name: 'remark', index: 'remark', width: 200, align: 'center', sorttype: 'string', editable: true, sortable: false,editoptions: {
            dataEvents: [{
                type: "blur",
                fn: function(e) {
            		$("#dataGrid").jqGrid("saveCell", lastrow, lastcell);
                }
            }]
        }}
    ];

    var colNames1 = ['操作人', '操作时间', '操作部门', '原串号', '原辅助串号', '新串号', '新辅助串号', '商品名称', '记录备注', '单据备注'];
    var JqGridColModel1 = [
        {name: 'executeByName', index: 'executeByName', width: 100, align: 'center', sorttype: 'string', sortable: false}, 
        {name: 'executeTime', index: 'executeTime', width: 200, align: 'center', sortable: false}, 
        {name: 'sectionName', index: 'sectionName', width: 100, align: 'center', sortable: false}, 
        {name: 'oldImei', index: 'oldImei', width: 100, align: 'center', sorttype: 'string', sortable: false}, 
        {name: 'oldAuxiliaryImei', index: 'oldAuxiliaryImei', width: 100, align: 'center', sorttype: 'string', sortable: false}, 
        {name: 'newImei', index: 'newImei', width: 100, align: 'center', sorttype: 'string', sortable: false},
        {name: 'newAuxiliaryImei', index: 'newAuxiliaryImei', width: 100, align: 'center', sorttype: 'float', sortable: false},
        {name: 'goodsName', index: 'goodsName', width: 100, align: 'center', sorttype: 'string', sortable: false}, 
        {name: 'remark', index: 'remark', width: 100, align: 'center', sorttype: 'string', sortable: false}, 
        {name: 'billsRemark', index: 'billsRemark', width: 100, align: 'center', sorttype: 'string', sortable: false}
    ];

    var colNames2 = ['ID', '入库单号', '入库日期', '往来单位', '部门名称', '商品名称', '串号', '辅助串号', '制单人', '制单时间'];
    var JqGridColModel2 = [
        {name: 'id', index: 'id', width: 200, align: 'center', sorttype: 'int', hidden: true, sortable: false},
        {name: 'inNo', index: 'inNo', width: 200, align: 'center', sorttype: 'string', sortable: false},
        {name: 'inTime', index: 'inTime', width: 200, align: 'center', sortable: false}, 
        {name: 'unit', index: 'unit', width: 200, align: 'center', sortable: false},
        {name: 'section', index: 'section', width: 100, align: 'center', sorttype: 'string', sortable: false}, 
        {name: 'goods', index: 'price', width: 100, align: 'center', sorttype: 'string', sortable: false},
        {name: 'imei', index: 'imei', width: 100, align: 'center', sorttype: 'string', sortable: false},
        {name: 'assistImei', index: 'assistImei', width: 100, align: 'center', sorttype: 'string', sortable: false}, 
        {name: 'zPerson', index: 'zPerson', width: 100, align: 'center', sorttype: 'string', sortable: false}, 
        {name: 'zTime', index: 'zTime', width: 140, align: 'center', sorttype: 'string', sortable: false}
    ];

    switch (choiseStr) {
        case '0':
            tlp = [colNames0, JqGridColModel0];
            break;
        case '1':
            tlp = [colNames1, JqGridColModel1];
            break;
        case '2':
            tlp = [colNames2, JqGridColModel2];
            break;
        case '3':
            tlp = [colNames3, JqGridColModel3];
            break;
        default:
            break;
    }
    return tlp;
};

/**
 * 初始化 主表
 */
function loadmodal(urlData, tName, pName, flag, choiseStr) {
    var options = {
        LoadTableUrl: urlData,
        TableName: tName,
        //pager:pName
    };
    $.jgrid.defaults.width = 1280;
    $.jgrid.defaults.responsive = true;
    $.jgrid.defaults.styleUI = 'Bootstrap';
    var lastsel = ''; //最后一次选中的行
    var mydata;
    var hid = false;
    var lock = false;
    var myobj = [];
    var tlp = getColTpl(choiseStr); //获取表格模版
    var colNames = tlp[0];
    var JqGridColModel = tlp[1];
    $(options.TableName).jqGrid({
        url: options.LoadTableUrl,
        mtype: "GET",
        datatype: "local",
        jsonReader: {
            root: "",
            repeatitems: false
        },
        colNames: colNames,
        colModel: JqGridColModel,
        sortable: false,
        rownumbers: true,
        cellsubmit: 'clientArray',
        editurl: 'clientArray',
        rowNum: 50,
        rowList: [50,150,300],
        pager:'#jqGridPager',
        viewrecords: true,
        multiselect: flag,
        cellEdit: !flag,
        width: "100%",
        height: $(window).height() * 0.45,
        autowidth: true,
        rownumWidth: 35,
        shrinkToFit: false,
        //footerrow:true,  
        userDataOnFooter: true,
        onCellSelect: function(id, index, e) {

        },
        beforeEditCell: function(rowid, cellname, v, iRow, iCol) {
            lastrow = iRow;
            lastcell = iCol;
        },
        gridComplete: function() {
        	var ids=$('#dataGrid').getDataIDs()
        	if(ids.length>0){
        		for(var i=0;i<ids.length;i++){
        		 var resData=$("#dataGrid").jqGrid("getRowData",ids[i])
        		 if(resData.newImei==""||resData.newImei==null){
        			$("#dataGrid").setRowData( ids[i], { newImei:resData.imei, newAuxiliaryImei:resData.auxiliaryImei })
        		 }
        		}
        	}
        },
        loadComplete: function(data) {
            $(options.TableName).jqGrid('setLabel', 0, '序号');
			$(options.TableName).resize()
        }
    })

    $(window).bind('click', function saveEdit(e) {
        var rowId = $(e.target).parent("tr").attr("id");
        if (lastsel != "" && lastsel != rowId) { //用于点击其他地方保存正在编辑状态下的行
            if ($(e.target).closest(options.TableName).length == 0) {
                $(options.TableName).jqGrid('saveRow', lastsel);
                lastsel = '';
            }
        }
    })

}

//删除一行
$(document).on('click', '.trashRow', function(e) {
    var thisTitle = $(this).attr("title");
    var rowId = $(this).parent().data('id');
    if (thisTitle == "删除行") {
        console.log('条数:' + $('#jqGrid_tranNumber tbody tr').length);
        $.zxsaas_plus.showconfirm("", "是否确定删除本行?", function() {
            $('#dataGrid').jqGrid('delRowData', rowId);
        }, function() {

        });
    }
});
/**
 * 获取过滤条件
 */
var getFilterData = function() {
    var fData = {
        startTime: $('#datetimepickerStart').val(),
        endTime: $('#datetimepickerEnd').val(),
        sectionId: $('.filter_tree_ids').val(),
        billsCodeKey: $('.noFilter').val(),
        imeiKey: $('.imeiFilter').val(),
        // goodsNameKey: $('.goodsNameFilter').val(),
        remarkKey: $('.remarkFilter').val()
    };
    return fData;
};
/*
 * 过滤
 */
$(document).on('click', '.filter', function(e) {
    $('#filterModel').modal('show');
//    $('.filterData').val('');
});
//过滤查询
$(document).on('click', '.searchFilter', function(e) {
    $.ajax({
        url: basePath + '/imei/change/loadOrder',
        type: 'post',
        dataType: 'json',
        data: {
            startTime: $('input[name=beginTime1]').val(),
            endTime: $('input[name=endTime1]').val(),
            sectionId: $('.filter_tree_ids').val(),
            billsCodeKey: $('input[name=docNum1]').val(),
            imeiKey: $('input[name=imei1]').val(),
            goodsNameKey: $('input[name=proname1]').val(),
            remarkKey: $('input[name=remark1]').val()
        },
        success: function(data) {
            $('#filterModel').modal('hide');
            if(data.desc=="未查到满足条件的单据!"){
                $.zxsaas_plus.showalert('warning','未查询到数据!');
            }else{
                refreshView(data, function(){})
            }
        },
        error: function(e) {
        }
    });
});
//重置
$('.reset').click(function(e){
	$('.filterData').val('');
})
/*$(document).on('click', '.reset', function(e) {
    $('.filterData').val('');
});*/
function seeSthState0() { //保存状态
    $('#billsHeaderForm input,#billsHeaderForm button,.searchInputImei,.footer input').prop('disabled', false);
    $('#dataGrid').setGridParam({'cellEdit':true});
    $('.trashRow').css({
    	'width':'auto',
    	'overflow':'hidden'
    })
    $('.rightMapImg').hide();
}
function seeSthState1() { //执行状态
    $('#billsHeaderForm input,#billsHeaderForm button,.searchInputImei').prop('disabled', true);
    $('#dataGrid').setGridParam({'cellEdit':false});
    $('.trashRow').css({
    	'width':0,
    	'overflow':'hidden'
    })
    $('.rightMapImg').show();
}
/**
 * 新增
 */
$(document).on('click', '.addAudit', function(e) {
    window.location.href = basePath + '/imei/change/imeiChangeMain';
});
/**
 * 调用保存方法
 */
$(document).on('click', '.saveData', function(e) {
    saveDo();
});

/**
 * 保存
 */
var saveDo = function(e) {
    var params = billsData();
    var IDs = $("#dataGrid").jqGrid("getDataIDs");
    var row=[]
    var rowNewMei=[]
    var rowNuList=[]
    if (IDs.length) {
    	for(var i=0;i<IDs.length;i++){
    		row[i] = $("#dataGrid").jqGrid("getRowData", IDs[i]);
            if (row[i].hasOwnProperty('newImei') && row[i].newImei == row[i].imei&&row[i].auxiliaryImei == row[i].newAuxiliaryImei) {
                $.zxsaas_plus.showalert('', '新串号+新辅助串号不能和串号+辅助串号一致！');
                return false;
            }
           
    	}
    	 if(row.length>0){
             for(var k=0;k<row.length;k++){
            	 if(row[k].newImei==""){
            		 $.zxsaas_plus.showalert('', '新串号为空！');
	            	 return false; 
            	 }else{
            	var model={
            			newImei:row[k].newImei,
            			newAuxiliaryImei:row[k].newAuxiliaryImei
            	}
            	 rowNewMei.push(model)
            	 }
             }
           var ary = rowNewMei;
             var nary=ary.sort();
            for(var i=0;i<ary.length-1;i++){
                if (nary[i].newImei==nary[i+1].newImei&&nary[i].newAuxiliaryImei==nary[i+1].newAuxiliaryImei){
               	 $.zxsaas_plus.showalert('', '新串号和新辅助串号中必须有一个唯一！');
	            	 return false; 
            }}
    	};
         	
         }
       
        
    
    // 保存链接
    var saveUrl = basePath + '/imei/change/saveOrder/' + ($('#billsId').val() == '' ? 'auth_add' : 'auth_update');
    $.ajax({
        url: saveUrl,
        dataType: 'json',
        data: {
            "jsonData": JSON.stringify(billsData())
        },
        type: 'POST',
        success: function(data) {
            if (data.result == 1) {
                $('#billsId').val(data.data.billsId)
                $.zxsaas_plus.showalert("success", "保存成功")
				// 刷新页面
                setTimeout(function () {
					$.ajax({
						url: basePath + '/imei/change/loadOrder',
						data: {
							billsId: $('#billsId').val()
						},
						type: 'POST',
						dataType: 'JSON',
						success: function (data) {
							refreshView(data);
						}
					})
				},1500)
            } else {
                $.zxsaas_plus.showalert("警告", data.desc);
            }
        },
        error: function() {
            $.zxsaas_plus.showalert("", "error!");
        }
    })
};

function billsData() {
    var jsonData = {};
    var IDs = $("#dataGrid").jqGrid("getDataIDs"); //获取行ID数组
    var rowData=[]
    var obj=[]
    if(IDs.length>0){
    	for(var i=0;i<IDs.length;i++){
    		rowData[i]=$("#dataGrid").jqGrid("getRowData", IDs[i]) //根据行ID得到行数据
    		obj[i]={ 
    			sourceImeiId: rowData[i].sourceImeiId,
    	        newImei: rowData[i].newImei,
    	        newAuxiliaryImei: rowData[i].newAuxiliaryImei,
    	        remark: rowData[i].remark
    	                        }
    		}
    	jsonData.detailList=obj
    }
    jsonData.id = $('#billsId').val();
    jsonData.sectionId = $('#sectionId').val();
    jsonData.remark = $('#remark').val()
    return jsonData;
}
/**
 * 获取数据
 */
var saveData = function() {
    $("#dataGrid").jqGrid("saveCell", lastrow, lastcell);
    //			var tableArr = [];//表格数据
    var rowIds = $('#dataGrid').jqGrid('getDataIDs');
    for (var i = 0; i < rowIds.length; i++) {
        var rows = $("#dataGrid").jqGrid("getRowData", rowIds[i]);
        tableArr.push({
            'goodsId': rows.goodsId,
            'storageId': rows.storageId,
            'amount': rows.amount,
            'inStoragePrice': rows.inStoragePrice,
            'discountRate': rows.discountRate,
            'discountAmount': rows.discountAmount,
            'discountedAmount': rows.discountedAmount,
            'taxPrice': rows.taxPrice,
            'taxAmount': rows.taxAmount,
            'taxRate': rows.taxRate,
            'taxLimit': rows.taxLimit,
            'goodsNumber': $('.numberRid' + rowIds[i]).val(),
            'price': rows.price,
            'remark': rows.remark
        });
    }
    //表头数据
    var orderMa = {
        'id': $('.orderId').val(),
        "billsCode": $('#billsCode').val(),
        "billsTime": $('#billsTime').val(),
        "add_tree_ids": $('.add_tree_ids').val(),
        "remark": $('.remark').val()
    };
    var getData = {
        "billsMain": orderMa,
        "tableList": tableArr
    }
    return getData;
};

/**
 * 删除订单
 */
$('.deleteReceipts').click(function(e) {
    $.zxsaas_plus.showconfirm("", "是否确定删除此单据?", function() {
        //通过单据id删除单据
        $.ajax({
            url: basePath + '/imei/change/deleteOrder',
            type: 'GET',
            dataType: 'json',
            data: {
                billsId: $("#billsId").val()
            },
            success: function(data) {
                if (data.result == 1) {
                    setTimeout(function() {
                        $.zxsaas_plus.showconfirmsure("提示", "删除成功!", function() {
                            window.location.href = basePath + '/imei/change/imeiChangeMain';
                        });
                    }, 600);
                } else {
                    $.zxsaas_plus.showalert("提示", data.desc);
                }
            }
        });

    });
});
/**
 * 执行
 */
$(document).on('click', '.execute', function(e) {
    var orderId = $('.orderId').val(); //订单id
    $.zxsaas_plus.showconfirm("", "过账后，涉及到此串号的所有单据以及记录将全部替换成新串号，请确认是否继续", function() {
        $.ajax({
            url: basePath + '/imei/change/executeOrder',
            data: {
                billsId: $("#billsId").val()
            },
            type: 'post',
            dataType: 'json',
            success: function(data) {
                if(data.result == 1){
                    $.zxsaas_plus.showalert('success','执行成功!');
                    $.ajax({
                        url: basePath + '/imei/change/loadOrder',
                        data: {
                            billsId: $('#billsId').val()
                        },
                        type: 'POST',
                        dataType: 'JSON',
                        success: function(data) {
                            refreshView(data);
                        }
                    })
                } else {
                    $.zxsaas_plus.showalert('error',data.desc);
                }
            },
            error: function(data) {
                $.zxsaas_plus.showalert("提示", data.desc);
            }
        });
    }, function() {

    });
});
/**
 * 上一单 下一单 首单 末单查询
 */
$(document).on('click', '.searchOtherBill', function(e) {
    var clickTitle = e.target.textContent;
    var param={	
    }
    param.startTime=$("#filterSearchForm input[name='beginTime1']").val()
    param.endTime=$("#filterSearchForm input[name='endTime1']").val()
    param.sectionId=$("#filterSearchForm #sectionId1").val()
    param.billsCodeKey=$("#filterSearchForm input[name='docNum1']").val()
    param.imeiKey=$("#filterSearchForm input[name='imei1']").val()
    param.goodsNameKey=$("#filterSearchForm input[name='proname1']").val()
    param.remarkKey=$("#filterSearchForm input[name='remark1']").val()
    if(clickTitle=="上一单"||clickTitle=="下一单"){
    	param.refBillsId=$('#billsId').val()
    }
    switch (clickTitle) {
        case '上一单':
            seeSth('P',param)
            break;
        case '下一单':
            seeSth('N',param)
            break;
        case '首单':
            seeSth('F',param)
            break;
        case '末单':
            seeSth('L',param)
            break;
        default:
            break;
    }
});

//dataRender 
function refreshView(data, resolve, reject) {
    if (data.result == 1) {
        var res = data.data.orderVo;
        if (res != null) {
        	$('#billsHeaderForm input').val('')
            /*$('input').val('');*/
            $("#dataGrid").jqGrid("clearGridData"); //清空表格数据
            $('#billsCode').val(res.billsCode);
            $('#billsTime').val(res.billsDate);
            $('#billsId').val(res.billsId);
            $('#billsStatus').val(res.billsStatus);
            $('#sectionName').val(res.sectionName);
            $('#remark').val(res.remark);
            $('#executeTime').val(res.executeTime);
            $('#executeByName').val(res.executeByName);
            $('#createTime').val(res.createTime);
            $('#createByName').val(res.createByName);
            $('#sectionId').val(res.sectionId);
            $.each(res.detailVoList,function(i,val){
            	$("#dataGrid").jqGrid("addRowData",i,val);
            })
            AppEvent.trigger('buttonsRefresh', [data]);
            if (res.billsStatus == 1) {
                seeSthState1()
            } else {
                seeSthState0()
            }
            // 如果成功,执行回调
            if (resolve) resolve();
        } else {
            // 如果失败,执行回调
            if (reject) reject();
        }
    } else {
        $.zxsaas_plus.showalert("警告", data.desc);
    }
}

/**
 * 查询
 */
function seeSth(direct, sendData) {
    $.ajax({
        url: basePath + '/imei/change/loadOrder?queryCodeStr=' + direct,
        data:  sendData,
        type: 'POST',
        dataType: 'JSON',
        success: function(data) {
            refreshView(data, null, function() {
                if (direct == 'P') {
                    $.zxsaas_plus.showalert("error", '没有上一单了');
                } else if (direct == 'N') {
                    $.zxsaas_plus.showalert("error", '没有下一单了');
                } else {
                    $.zxsaas_plus.showalert("error", data.desc);
                }
            });
        },
        error: function(data) {
            alert('请求失败')
        }
    });
}
var resUrl = function(currentId, toPage) {
    var resData = getFilterData(); // 获取原始数据
    resData.toPage = toPage;
    resData.currentId = currentId;
    $.ajax({
        url: '',
        type: 'POST',
        dataType: 'JSON',
        data: JSON.stringify(resData),
        contentType: 'application/json;charset=utf-8',
        success: function(data) {
            // var list = data.data.orderMain;
            if (checkT.isEmptyObject(data.data)) {
                $.zxsaas_plus.showalert("", "暂无数据!");
                return false;
            }
            fillData(data, '#dataGrid');

        },
        error: function(data) {
            console.log('....');
        }
    });
}

/**
 * 填充数据
 * @param data  返回的数据
 * @param url   表格id
 * @return
 */
var fillData = function(data, url) {
    //表头数据
    //表格数据
}

/**
 * 打印
 */
$(document).on('click', '.print', function(e) {
	var id = $('#billsId').val();
	if(id==""){
		$.zxsaas_plus.showalert("提示","请选择一张单据");
		return;
	}
    $.zxsaas_plus.showconfirm("", "是否确定打印此单据?", function() {
    	$.printBills(basePath + '/imei/change/print',{billsId:id});
    }, function() {

    });
});

/*
 * 串号变更记录查询弹窗
 */
$(document).on('click', '.imeiSearch', function(e) {
    loadmodal('', '#jqGrid_imei', '#jqGridPager_imei', false, '1');
    $('.grid-wrap div').css('width', 'auto');
    $('.filterData').val('');
    $('#imeiChangeModal').modal('show');
});
/*
 * 串号变更记录查询 按钮
 */
$(document).on('click', '.searchImei', function(e) {
    $.ajax({
        url: basePath + '/imei/change/searchRecordVoList',
        data: {
            startTime: $('input[name=beginTime]').val(),
            endTime: $('input[name=endTime]').val(),
            sectionId: $('.search_tree_ids').val(),
            imeiKey: $('.imeiSearchInput').val(),
            goodsNameKey: $('.goodsNameSearch').val(),
            remarkKey: $('.remarkSearch').val()
        },
        type: 'post',
        dataType: 'json',
        success: function(data) {
            console.log(data);
            if (data.result != 1) {
                $.zxsaas_plus.showalert("错误", "没有匹配的数据!")
                return false;
            } else {
                $("#jqGrid_imei").jqGrid("clearGridData"); //清空表格数据
                var res = data.data.recordVoList;
                for (var i = 0, len = res.length; i < len; i++) {
                    $("#jqGrid_imei").jqGrid("addRowData", 0, res[i]); //添加行res数组数据
                }
            }
        }
    });
});
/*
 * 引入入库串号数据 弹窗
 */
$(document).on('click', '.importImei', function(e) {
    $('#importImeiModal').modal('show');
    $('.filterData').val('');
    loadmodal('', '#jqGrid_number', '#jqGridPager_number', true, '2');
});
/*
 * 引入入库串号数据查询   按钮
 */
$(document).on('click', '.searchImei2', function(e) {
});

/**
 * 引入入库串号数据 填充数据
 */
$(document).on('click', '.numberImport', function(e) {
    //获取已选数据  填充至主表
    $('#importImeiModal').modal('hide');
});

/**
 * 串号搜索
 */
$('.searchInputImei').keyup(function(e){
	if($(this).val().trim()!=null&&e.keyCode==13){
		e.preventDefault();
        $('#imeiUl').html('');
        $.ajax({
            url: basePath + '/imei/change/searchChangeImeiVo' ,
            type: 'post',
            dataType: 'json',
            data:{
				'queryKey' :$('.searchInputImei').val().trim()
            },
            success: function(data) {
                if (data.result != 1) {
                    $.zxsaas_plus.showalert("warning", "没有匹配的数据!")
                    return false;
                } else {
                	$('.searchInputImei').val('')
                	var ids=$("#dataGrid").jqGrid('getDataIDs');
                	var maxId=Math.max.apply(null, ids);//获取最大id
                	var res=[]
                	for(var i=0;i<ids.length;i++){
                		res.push($("#dataGrid").jqGrid("getRowData",ids[i]))
                	}
                	if(res.length!="0"){
                		 $.each(data.data.imeiVoList,function(index,item){
                			 var indexNumber=res.find(function (obj) {
                		            return obj.sourceImeiId==item.sourceImeiId;
                		        });
                			if(indexNumber==undefined){
                					 $("#dataGrid").jqGrid("addRowData", maxId+1+index, item); //添加行res数组数据 
                				 }else{
                					 $.zxsaas_plus.showalert("warning", "此串号已存在!") 
                				 }
                               });	
                		 
                	}else{
                		 $.each(data.data.imeiVoList,function(index,item){
            				$("#dataGrid").jqGrid("addRowData", index, item); //添加行res数组数据 
            				 })
                   }
            }
        }
        });
	}
})
/**
 * 点击 新增串号
 */
function imeiUlLiClick(obj) {
    var ids = $('#dataGrid').jqGrid('getDataIDs');
    //获得当前最大行号（数据编号）
    var maxid = (ids.length == 0) ? 0 : Math.max.apply(Math, ids);
    (rowId == maxid) && $('#dataGrid').jqGrid('addRowData', maxid + 1, obj, 'last')
    $(".searchInputImei").focus();
    $('.none-cx').hide();

}


