;$(function () {
     //公共模块

    var commonModular = {
        searchDetail: function (params, url, comHeadData, options) {

            var alignArr = ['', 'left', 'center', 'right'];
            var def = {
                sortable: false,//是否排序
                footerrow:false,
            }
            def = $.extend({}, def, options)
            var noneDataEle = $('.notFounImgBox'); //空数据容器
            var rpContainer = $('#rpContainer'); //表格容器
            var loadingImgBox = $('.loadingImgBox'); //加载容器
            var promptBox = $('#promptBox'); //输入条件后,点击查询吧! 容器
            noneDataEle.hide();
            rpContainer.show();
            promptBox.hide();
            loadingImgBox.show();
            jQuery("#rpGrid").jqGrid("clearGridData");
            //获取头部
            $.ajax({
                url: "/manager/finance/common/getReportHead",
                type: 'POST',
                dataType: "json",
                data: comHeadData
                ,
                success: function (data) {
                    if (data.result == '-999') {
                        promptBox.show()
                        loadingImgBox.hide()
                        return
                    }
                    var colName = [];
                    var colModel = [];
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
                                var mount = Number(tv.replace(/\,/g, ""));
                                //金额负数  显示为红色字体
                                if ($.isNumeric(mount) && mount < 0) {
                                    return "style='color:red'";
                                }
                                if(v.code == "voucherNo"){
                                    return "style=color:blue;cursor:pointer;"
                                }
                            },

                        };
                        //方向 :  0 是贷  1 是借 2:平
                        if (v.code == "direction") {
                            addJson.formatter = "select";
                            addJson.editoptions = {value: "0:贷;1:借;2:平;贷:贷;借:借;"};
                        }
                        colModel.push(addJson);

                    });

                    $.jgrid.gridUnload("rpGrid");
                    $("#rpGrid").jqGrid({
                        styleUI: 'Bootstrap',
                        mtype: "POST",
                        url: url,
                        postData: params,
                        datatype: "json",
                        jsonReader: {
                            repeatitems: false,
                            root: 'data.rows',
                            total: 'data.total',
                            page: 'data.page',
                            records: 'data.records'
                        },
                        rowNum: 100,
                        rowList: [40, 50, 100, 150],
                        viewrecords: true,
                        shrinkToFit:false,
                        autowidth: true,
                        rownumWidth: 50, // the width of the row numbers columns
                        rownumbers: true,	//显示行号
                        width: '100%',
                        height: $(window).height() * 0.4,
                        pager: '#rpGridPager',
                        colNames: colName,
                        colModel: colModel,
                        footerrow: def.footerrow, //显示底部菜单
                        userDataOnFooter: true,

                        gridComplete:function(){
                            $('#rpGrid').resize()
                        },
                        loadComplete: function (data) {
                            if(def.footerrow){
                                $("#rpGrid").footerData("set",{rn:"合计"});
                                var footerData = data.data.totalVo;
                                $("#rpGrid").footerData("set", footerData, false);
                            }


                            $('#rpGrid').resize()
                            if (data.result == 1) {
                                if (Object.keys(data.data).length == 0) {
                                    $('#rpContainer').hide()
                                    $('.loadingImgBox').hide()
                                    $('.notFounImgBox').show()

                                }
                                else {
                                    $('.loadingImgBox').hide()
                                    $('.notFounImgBox').hide()
                                    $('#rpContainer').show()
                                }

                                //数据请求成功之后，若果有要操作数据的行为，在这里执行
                                if (def.callback) {
                                    def.callback(data)
                                }
                                //分页滚动条 置顶
                                $("#rpGrid").parents(".ui-jqgrid-bdiv")[0].scrollTop = 0;
                            } else {
                                $.zxsaas_plus.showalert("提示", data.desc);
                                $('#rpContainer').hide()
                                $('.loadingImgBox').hide()
                                $('.notFounImgBox').show()
                            }
                        },

                        ondblClickRow: function(rowid,iRow,iCol,e){

                            //数据请求成功之后，若果有要操作数据的行为，在这里执行双击事件
                            if (def.ondblClickRow) {
                                def.ondblClickRow(rowid,iRow,iCol,e)
                            }

                        },
                        onCellSelect: function(rowid, iCol, contents, event) {
                            if (def.onCellSelect) {
                                def.onCellSelect(rowid, iCol, contents, event)
                            }
                        },
                        resizeStop: function (newwidth, index) {
                            var columnId = data.data.colModel[index - 1].id;
                            $.ajax({
                                url: '/manager/finance/common/updateColumnSize',
                                dataType: 'json',
                                type: 'post',
                                data: {
                                    'columnId': columnId,
                                    'columnSize': newwidth,
                                    /*  'empId':empId*/
                                },
                                success: function (data) {

                                },
                                error: function () {

                                }
                            })
                        }
                    });

                    //数据请求成功之后，若果有要操作数据的行为，在这里执行
                    if (def.headCallback) {
                        def.headCallback()
                    }
                    $("#rpGrid").jqGrid('bindKeys', '');
                }
            });
        },
        //调整表格大小
        resizeJgGrid: function (dropDom) {
            var height = $(window).height() - $("#searchQuery").height()
                - $("#rpContainerTop").outerHeight()
                - $("#rpGridPager").outerHeight()
                - $(".ui-jqgrid-htable[aria-labelledby='gbox_rpGrid']").outerHeight()
                - $(".ui-jqgrid-sdiv").outerHeight()
                - ($(".fiter-wrap").is(':hidden') ? 0 : $(".fiter-wrap").outerHeight())
                - 15
            ;
            var width=$('#rpContainer').width()-5;
            $("#rpGrid").setGridWidth(width)
            $("#rpGrid").setGridHeight(height);
        }
    };
    window.commonModular = commonModular;
});
