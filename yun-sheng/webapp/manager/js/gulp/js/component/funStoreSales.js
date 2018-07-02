//  经手人组件
!function ($) {
    //    营业员
    $.fn.funStoreSales = function (opt) {
        var ms = Math.floor(Math.random() * 10000);
        var timer=null; //定时器
        var def = {
            sectionId:"",   //部门id
            search: true,
            storeGrid: true,
            ifStore: false,
            listBox: true,
            checkMore: false,
            gridConfig: {
                colNames: ['id', '编码', '姓名', '所属部门', '职位', '联系方式', '员工属性名称', 'sectionId', 'dataId', '备注'],
                colModel: [
                    {name: 'id', index: 'id', width: 1, align: 'center', sorttype: "string", hidden: true},
                    {name: 'code', index: 'code', width: 100, align: 'center', sorttype: "string", sortable: false},
                    {name: 'name', index: 'name', width: 150, align: 'center', sorttype: 'string', sortable: false},
                    {
                        name: 'sectionName',
                        index: 'sectionName',
                        width: 150,
                        align: 'center',
                        sorttype: 'string',
                        sortable: false
                    },
                    {
                        name: 'positionName',
                        index: 'positionName',
                        width: 150,
                        align: 'center',
                        sorttype: 'string',
                        sortable: false
                    },
                    {
                        name: 'telephone',
                        index: 'telephone',
                        width: 150,
                        align: 'center',
                        sorttype: 'string',
                        sortable: false
                    },
                    {name: 'attrName', index: 'attrName', width: 100, align: 'center', sortable: false},
                    {name: 'sectionId', index: 'sectionId', width: 10, hidden: true},
                    {name: 'dataId', index: 'dataId', width: 10, hidden: true},
                    {name: 'remark', index: 'remark', width: 100, align: 'center', sortable: false}
                ]
            },
            searchFun: function (e) {

                clearTimeout(timer);
                timer = setTimeout(function () {
                    if ((e.keyCode == 40 || e.keyCode == 38 || e.keyCode == 13)) {
                        $('#searchSaleMan').blur()
                    } else {
                        $("#saleManModalGrid" + ms).jqGrid('setGridParam', {
                            datatype: 'json',
                            postData: {
                                "positionId": opt.gridConfig.positionId,
                                "remCode": $('.searchSaleMan').val().trim(),
                                "sectionId": opt.gridConfig.sectionId
                            },
                            page: 1
                        }).trigger("reloadGrid"); //重新载入
                    }
                }, 250);


            },
            clickback:function () {

            }
        }
        opt = $.extend({}, def, opt);
        return this.each(function () {
            var _this = $(this);
            _this.data('employeeId', '');
            if (opt.listBox) {
                if (_this.parent().find('.showSaleManBox').size() < 1) {
                    _this.parent().append('<span class="input-group-btn showSaleManBox"><button class="btn btn-default" type="button"><span class="glyphicon glyphicon-option-horizontal"></span></button></span>')
                }
                _this.parent().find('.showSaleManBox>button').click(function () {
                    $('.assistantBox').hide()
                    if ($('#saleMan-modal' + ms).size() < 1) {
                        $(document.body).append(
                            '<div id="saleMan-modal'+ms+'" class="modal fade saleMan-modal" tabindex="-1" role="dialog" aria-hidden="true">'+
                            '<div class="modal-dialog modal-lg" role="document">'+
                        '<div class="modal-content">'+
                            '<div class="modal-header">'+
                        '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
                        ' <h4 class="modal-title">营业员选择</h4>'+
                        ' </div>'+
                        ' <div class="modal-body">'+
                        '<div class="col-md-12">'+
                        '<div class="row">'+
                        '<div class="col-md-5" style="padding-left:0">'+
                        '<input type="text" class="form-control searchSaleMan"  placeholder="请输入编码,姓名,助记码">'+
                        '</div>'+
                        '</div>    '+
                        '<div class="row gridBox" style="margin-top:8px;"></div>'+
                        '</div>'+
                        '</div>'+
                        '<div class="modal-footer">'+
                        '<button type="button" class="btn btn-default sureSaleMan" data-dismiss="modal">确认</button>'+
                        '<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>'+
                        '</div>'+
                        '</div>'+
                        '</div>'+
                        ' </div>'
                    );
                        $('#saleMan-modal' + ms).find('.gridBox').append('<table id="saleManModalGrid' + ms + '" class="zxsaastable"></table><div id="gridpager_saleMan' + ms + '"></div>')
                        $('#saleMan-modal' + ms).find('.searchSaleMan').on('input propertychange', function (e) {
                            opt.searchFun(e)
                        })

                        if (!opt.checkMore) {
                            $('.sureSaleMan').hide()
                        }
                        $('.sureSaleMan').click(function () {
                            var ids = $("#saleManModalGrid" + ms).jqGrid('getGridParam', 'selarrrow')
                            var employeeIds = [];
                            var employeeName = [];
                            var employeeList = [];
                            for (var i = 0; i < ids.length; i++) {
                                var employeeInfo = $("#saleManModalGrid" + ms).jqGrid('getRowData', ids[i])
                                employeeIds.push(employeeInfo.id)
                                employeeName.push(employeeInfo.name)
                                employeeList.push(employeeInfo)
                            }
                            _this.val(employeeName.join(',')).data('employeeId', employeeIds.join(','))
                            opt.clickback(employeeList)
                        })
                        $.jgrid.defaults.width = 1280;
                        $.jgrid.defaults.responsive = true;
                        $.jgrid.defaults.styleUI = 'Bootstrap';

                        $("#saleManModalGrid" + ms).jqGrid({
                            url: "/manager/tree/getManagerList",
                            mtype: "post",
                            datatype: "json",
                            postData: {
                                "positionId": opt.gridConfig.positionId,
                                "remCode": opt.gridConfig.remCode,
                                "sectionId": opt.gridConfig.sectionId
                            },
                            jsonReader: {
                                root: "data.rows",
                                total: "data.total",
                                records: "data.records",
                                repeatitems: false
                            },
                            colNames: opt.gridConfig.colNames,
                            colModel: opt.gridConfig.colModel,
                            sortable: false,
                            rownumbers: true,	//显示行号
                            rowNum: 10,
                            rowList: [20, 25, 40],
                            pager: "#gridpager_saleMan" + ms,
                            viewrecords: true,
                            width: '100%',
                            height: $(window).height() * 0.4,
                            autowidth: true,
                            multiselect: opt.checkMore,
                            rownumWidth: 50,
                            shrinkToFit: false,
                            ondblClickRow: function (rowid, iRow, iCol, e) {
                                var storeInfo = $("#saleManModalGrid" + ms).jqGrid('getRowData', rowid);
                                _this.val(storeInfo.name).data('employeeId', storeInfo.id)
                                $(opt.salesPersonName).val(storeInfo.name).data('employeeId', storeInfo.id)
                                $('#saleMan-modal' + ms).modal('hide')
                                $('.saleManerrorBox').hide()
                                opt.clickback([storeInfo])
                            },
                            gridComplete: function () {
                                $("#saleManModalGrid" + ms).setLabel(0, '序号')
                                $("#gridpager_saleMan"+ms+"_left").remove()
                                $("#gridpager_saleMan"+ms+"_center").attr('colspan',2)
                            },
                            loadComplete: function (data) {
                            }

                        })
                        $("#saleManModalGrid" + ms).resize();
                        $('#saleMan-modal' + ms).modal('show')

                    }
                    else {

                        $("#saleManModalGrid" + ms).jqGrid('setGridParam', {
                            datatype: 'json',
                            postData: {
                                "positionId": opt.gridConfig.positionId,
                                "remCode": opt.gridConfig.remCode,
                                "sectionId": opt.gridConfig.sectionId
                            },
                            page: 1
                        }).trigger("reloadGrid"); //重新载入
                        $("#saleManModalGrid" + ms).resize();
                        $('#saleMan-modal' + ms).modal('show')

                    }
                })

            }
        })
    }
}(jQuery);