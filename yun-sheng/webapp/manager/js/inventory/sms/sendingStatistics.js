$(function() {
    initEvent()
    getCustomProject('短信发送统计')
    //初始化事件
    function initEvent() {
        initMenuBtn()
        initTopForm()
        $("#search").trigger("click")
    }

    // 初始化 顶部表单
    function initTopForm(){
        //载入日期组件
        $('#startDate').datePlu({
            dateEnd:'#endDate',
            endDate:true,
            minTime:"1970-01-01",
            ifPermissions:false,
        });

        //载入 部门组件
        $('#sectionName').storePlu({
            isStoreShow:false,
            checkMore: true,
            search: false,
            isLoadDefaultName:false,
            ifStore: false // 控制部门选项
        });

        //载入 提交人
        $("#managerUname").comModalsEmployee({
            multiselect:true,
            name:'提交人',
            girdParam:{
                empIsOperator:2
            }
        });
    }

    //载入菜单组件
    function initMenuBtn() {
        var option = {
            btnGroupLeft: {
                ColumnSettings: {
                    isShow: true,
                    click: function () {
                           $('#lineSet-modal').modal('show');
                          $("#lineSetGrid").jqGrid('setGridParam', {
                              url:'/manager/erp/projectAndColumn/getColumns',
                             postData: {
                                'rpMainId':  projectId
                                }
                             }).trigger("reloadGrid");
                    }
                },
                export: {
                    isShow: true,
                    click: function () {
                        var options=getParam();
                        functionObjExtent.construtForm('/manager/sms/center/send/record/getSendStatistExport', options)
                    }
                },
            },
        };
        menuBtn = new componentMenuBtn("#GridTool", option);

    }

    $('#sendStatus').combotree({
        valueField: "id", //Value字段
        textField: "text", //Text字段
        multiple: true,
        // 发送状态 0：草稿单 1 已发送 2.发送失败
        data: [{ "id": 0, "text": "草稿单" }, { "id": 1, "text": "已发送" }, { "id": 2, "text": "发送失败"}],
        onCheck: function (node, checked) {
            //让全选不显示
            // $("#sendStatus").combotree("setText", $("#sendStatus").combobox("getText").toString().replace("全选,", ""));
        },
        onClick: function (node, checked) {
            //让全选不显示
            // $("#sendStatus").combotree("setText", $("#sendStatus").combobox("getText").toString().replace("全选,", ""));
        }
    });

//查询
    $('#search').click(function () {
        searchDetail(getParam())
    })

    function getParam() {
        var param = new Object();
        param.sendTimeStr = $("#startDate").val();
        param.sendTimeEnd=$("#endDate").val();
        param.createId=$('#managerUname').data("id");
        param.msmStatus=$('#sendNode').val();
        param.sendStatus=String($("#sendStatus").combotree("getValues"));
        param.sectionIds =$("#sectionName").data("sectionId")||'';
        param.queryKey = $("#queryKey").val();
        param.rpMainId=projectId
        return param
    }
    /*******************************重置***********************************/
    function resetFun(){
        location.reload();
    }
    /*******************************短信账户表格***********************************/
//查询方法
    $.jgrid.defaults.width = 1280;
    $.jgrid.defaults.responsive = true;
    $.jgrid.defaults.styleUI = 'Bootstrap';
    function searchDetail(params, url, options) {

        $('.notFounImgBox').hide()
        $('#rpContainer').show()
        $('.loadingImgBox').show()
        $('#promptBox').hide()
        var def = {
            multiselect: false, //是否多选
            sortable: true,//是否排序
            merge: false,//是否合并
            gotoable: true,//是否跳转
            rows: '100'//默认数量

        }
        def = $.extend({}, def, options)
        var alignArr = ['', 'left', 'center', 'right'];
        $.ajax({
            url: '/manager/finance/common/getReportHead',
            dataType: 'json',
            type: 'post',
            data: {
                'projectId': projectId,
            },
            success: function (data) {
                if (data.result == '-999') {
                    $('#rpContainer').hide()
                    $('.notFounImgBox').hide()
                    return
                }
                var colName = [];
                var colModel = [];
                var groupHeader = [];
                var mergeArr = [];
                var complexData = {
                    colName: colName,
                    colModel: colModel,
                    groupHeader: groupHeader
                };
                $.each(data.data.colModel, function (k, v) {
                    colName.push(v.defualname);
                    var addJson = {
                        name: v.code,
                        index: v.code,
                        width: v.columnSize,
                        align: alignArr[v.align],
                        hidden: !v.isShow,
                        id: v.id,
                        sortable: def.sortable,
                        cellattr: function (rowId, tv, rawObject, cm, rdata) {
                            return 'id=\'' + v.code + rowId + "\'";
                        }
                    };
                    colModel.push(addJson);

                });
                $.jgrid.gridUnload("rpGrid");

                $("#rpGrid").jqGrid({
                    mtype: "POST",
                    url: '/manager/sms/center/send/record/getSendStatistics',
                    postData: params,
                    datatype: "json",
                    shrinkToFit: false,
                    pager: "#rpGridPager",
                    rowList: [100, 200, 500],
                    rowNum: def.rows,
                    autowidth: true,
                    rownumbers: true, // show row numbers
                    rownumWidth: 50, // the width of the row numbers columns
                    width: "100%",
                    height: $(window).height() * 0.35,
                    sortable: false,
                    viewrecords: true,
                    sortorder: "desc",
                    colNames: colName,
                    footerrow: true,
                    userDataOnFooter: true,
                    colModel: colModel,
                    multiselect: true,
                    shrinkToFit:false,
                    jsonReader: {
                        repeatitems: false,
                        root: 'data.dataList',
                        total: 'data.total',
                        page: 'data.page',
                        records: 'data.records'
                    },
                    gridComplete: function () {
                        $('table th').css('text-align', 'center')
                        $('#rpGrid').resize()
                    },
                    onCellSelect: function (rowid, index, contents, event) {
                        if (def.onCellSelect) {
                            def.onCellSelect(rowid, index, contents, event);
                        }
                    },
                    loadComplete: function (data) {
                        $('#rpGrid').resize()
                        if (Object.keys(data.data).length == 0 || data.result == -999) {
                            // $('#rpContainer').hide()
                            $('.loadingImgBox').hide()
                            $('.notFounImgBox').hide()
                            return
                        } else {
                            $('.loadingImgBox').hide()
                            $('.notFounImgBox').hide()
                            $('#rpContainer').show()
                        }
                    },
                    ondblClickRow: function (rowid) {
                        var rowDate = $('#rpGrid').getRowData(rowid);
                        var temp=$('#ifname').contents().context.URL
                        var str1 = temp.split("?") ;
                        var str  = str1[1].toString();

                        var goUrl= encodeURI( '/manager/sms/center/sign/sendingDetails?'+str[1]
                            + '&duan=1'
                            + '&from=查询短信发送统计'

                        )
                        var startDate=$('#startDate').val()
                        var endDate=$('#endDate').val()
                        localStorage.setItem('statistics',JSON.stringify({
                            sectionName:rowDate.sectionName,
                            sectionId:rowDate.sectionId,
                            sendName:rowDate.sendName,
                            sendUid:rowDate.sendUid,
                            sendStatusName:rowDate.sendStatusName,
                            sendStatus:rowDate.sendStatus,
                            msmStatusName:rowDate.msmStatusName,
                            msmStatus:rowDate.msmStatus,
                            taskNum:rowDate.taskNum,
                            startDate:startDate,
                            endDate:endDate,
                        }));
                        window.parent.openWorkBoxByMenutext('查询短信发送明细',goUrl , true);
                    },
                });
                $("#rpGrid").jqGrid('bindKeys', '');
            }
        })
    }

    // 列设置
    $("#lineSetGrid").jqGrid({
        mtype: "POST",
        datatype: "json",
        viewrecords: true,
        rowNum: 400,
        width: "100%",
        height: $(window).height() * 0.55,
        colNames: ['id', '报表列字段', '是否显示', 'code'],
        colModel: [
            {name: "id", width: '150px', align: "center", sortable: false, hidden: true},
            {name: "name", width: '150px', align: "center", sortable: false},
            {
                name: "isShow",
                width: '150px',
                align: "center",
                sortable: false,
                formatter: "checkbox",
                formatoptions: {disabled: false},
                edittype: 'checkbox',
                editoptions: {value: '1:0'}
            },
            {name: "code", width: '150px', align: "center", sortable: false, hidden: true},
        ],
        jsonReader: {
            repeatitems: false,
            root: 'data.columnVoList',
        },
        gridComplete: function () {
            $('table th').css('text-align', 'center')
            $('#lineSetGrid').resize()
        },
    });

 })


//列设置确认
function sureLineSet() {
    var valList = $('#lineSetGrid').getRowData()
    var ids = $("#lineSetGrid").jqGrid('getDataIDs');
    var rowData = $("#lineSetGrid").jqGrid('getRowData', ids[ids.length - 1]);
    valList.push(rowData)
    $.ajax({
        url: '/manager/erp/projectAndColumn/updateColumns',
        dataType: 'json',
        type: 'post',
        data: {
            'flag':false,
            'valList': JSON.stringify(valList)
        },
        success: function (data) {
            if (data.data.status == '1') {
                $.jgrid.gridUnload("rpGrid");

                $("#search").click()
            }
        }
    })
}
