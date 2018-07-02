$(function () {

    $('#queryDate').val($.DateFormat(new Date($.ajax({async: false}).getResponseHeader("Date")),"yyyy-MM-dd"));
    $("#queryDate").datetimepicker({
        lang:"ch",           //语言选择中文
        format:"Y-m-d",      //格式化日期
        timepicker:false,    //关闭时间选项
        todayButton:false    //关闭选择今天按钮
    });

    $.ajaxPackage({
        url:'/manager/finance/common/getCompany',
        success:function (data) {
            var res=data.data.dataList;
            var arr=[];
            $.each(res,function(i,val){
                arr.push({
                    id: val.id,
                    text: val.name,
                })
            })

            $('#companyIds').combotree('loadData',arr)
            $('#companyIds').combotree('setValue', CURCOMPANYID);
            $('#companyIds').combotree({
                onChange: function (newValue,oldValue) {
                    $('#sectionIds').combotree("clear").combotree('loadData',[])
                    $('#subsidiarySectionId').combotree("clear").combotree('loadData',[])
                    if(newValue.length==1){
                        for(var m=0;m<res.length;m++){
                            var companyItem=res[m]
                            if(companyItem.id==newValue.toString()){

                                $.ajaxPackage({
                                    url: '/manager/component/section/getAuthSectionTreeNodeVoList',
                                    data:{companyId:newValue.toString()},
                                    success: function (data) {
                                        var res=data.data.dataList;
                                        var abc=$.extend(true,[],res)
                                        if(companyItem.isEnable==1){
                                            $('#sectionIds').combotree('loadData',res)
                                        }

                                        $('#subsidiarySectionId').combotree('loadData',abc)
                                    }
                                })

                                break;
                            }
                        }


                    }else{
                        $('#sectionIds,#subsidiarySectionId').prop('disabled',true)
                    }

                    // 财务参数 是否启用业务部门核算
                    if(STATUS){

                    }else{

                    }
                }
            })

        }
    })


    $('#sumModal').modal('show')

    $('.searchBtn').click(function () {
        $('#rpGrid').jqGrid('setGridParam', {
            url: '/manager/finance/getProfitReportData',
            postData: {
                'accountingPeriod': $('#queryDate').val(),
                'companyIds': $('#companyIds').combotree('getValues').toString(),
                'sectionIds': $('#sectionIds').combotree('getValues').toString(),
                'assistSectionIds': $('#subsidiarySectionId').combotree('getValues').toString(),
                'isContained': $('#isContained').is(':checked') ? '1' : '0'
            }
        }).trigger("reloadGrid");

        $('#sectionIdsBox').text($('#sectionIds').data().combo.previousText);
        $('#companyIdsBox').text($('#companyIds').data().combo.previousText);
        $('#accountingPeriodBox').text($('#queryDate').val())

    })
    $.jgrid.defaults.width = 1280;
    $.jgrid.defaults.responsive = true;
    $.jgrid.defaults.styleUI = 'Bootstrap';
    $('#rpGrid').jqGrid({
        mtype: "POST",
        datatype: "json",
        jsonReader: {
            root: "data.rows",
        },
        colNames: ['项目', '行次', '本月发生额', '累计发生额'],
        colModel: [
            {name: "projectName", index: "projectName", width: "150px", align: "center", sortable: false},
            {name: "num", index: "num", width: "150px", align: "center", sortable: false},
            {name: "byAmount", width: "150px", align: "center", sortable: false},
            {name: "ljAmount", width: "150px", align: "center", sortable: false},
        ],
        sortable: false,
        rownumbers: true,
        cellsubmit: 'clientArray',// 单元格保存内容的位置
        editurl: 'clientArray',
        rowNum: 40,
        rowList: [40, 80, 120],
        viewrecords: true,
        pager: '#rpGridPager',
        width: '',
        height: $(window).height() * 0.5,
        autowidth: true,
        rownumWidth: 35, // the width of the row numbers columns
        shrinkToFit: false,  // 此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
        userDataOnFooter: true,// 设置userData 显示在footer里
        ondblClickRow: function (id) {

        },
        onCellSelect: function (rowid, iCol, contents, event) {

        },
        beforeEditCell: function (rowid, cellname, v, iRow, iCol) {

        },
        beforeSelectRow: function (rowid, e) {

        },
        afterInsertRow: function (rowid, aData) { // 新增一行之后

        },
        onSelectRow: function (id, status) {

        },
        gridComplete: function () {


        },
        loadComplete: function (data) {
            $('#rpGrid').resize()
        },
        loadError: function (xhr, status, error) {

        }
    })

    $('.print').click(function () {
        $.printBills('/manager/finance/printProfitReportData',
            {
                'accountingPeriod': $('#queryDate').val(),
                'companyIds': $('#companyIds').combotree('getValues').toString(),
                'sectionIds': $('#sectionIds').combotree('getValues').toString(),
                'assistSectionIds': $('#subsidiarySectionId').combotree('getValues').toString(),
                'isContained': $('#isContained').is(':checked') ? '1' : '0',
                'sectionNames':$('#sectionIdsBox').text(),
                'companyNames':$('#companyIdsBox').text(),
            }
        );
    })

    $('.export').click(function () {
        var accountingPeriod = $('#queryDate').val()
        var companyIds =  $('#companyIds').combotree('getValues').toString();
        var sectionIds = $('#sectionIds').combotree('getValues').toString();
        var assistSectionIds = $('#subsidiarySectionId').combotree('getValues').toString();
        var isContained = $('#isContained').is(':checked') ? '1' : '0';

        window.location.href="/manager/finance/getProfitReportData/export?accountingPeriod="+accountingPeriod+"&companyIds="+companyIds+'&sectionIds='+sectionIds+'&assistSectionIds='+assistSectionIds+'&isContained='+isContained;
    })
    $(window).resize(function(){
        var height = $(window).height() - $("#ysHeader").height()-30
            - 170
        ;
        $("#rpGrid").setGridHeight(height);
    });
})

