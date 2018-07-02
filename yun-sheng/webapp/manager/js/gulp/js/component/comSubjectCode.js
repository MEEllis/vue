/*
 组件 模板
科目编码
*/

!function ($) {
    // 默认模板
    var _template = '';
    // 构造函数
    var comSubjectCode = function (el, option) {
        var nonDuplicateID = functionObjExtent.GenNonDuplicateID();// 不重复的ID
        // 默认参数
        var defaults = {
            nonDuplicateID: nonDuplicateID,
            gridId: "comSubjectGridId" + nonDuplicateID,
            gridPageId: "comSubjectGridPageId" + nonDuplicateID,
            treeId: "comSubjecTreeId" + nonDuplicateID,
            ondblClickRowCallBack:null,// 双击的回调
            ifEndSubject:null,  // null：查询全部，   0只显示末级科目， 1 ，只显示父级科目  
            currentAccountingYear: ""
        };
        this.option = $.extend(true, defaults, option);


        this.element = $(el);

        this.dom = null;
        this._init();
    };
    comSubjectCode.prototype = {
        _init: function () {
            this.clearDom();
            this.loadDom();
        },
        //加载dom
        loadDom: function () {
            var _self = this;
            _self.element.prop('readonly', true);
            if (_self.element.parent().find(".showBox").size() > 0) {
                _self.element.parent().find(".showBox").remove();
            }
            _self.element.parent().append('<span class="input-group-btn showBox"><button class="btn btn-default" type="button"><span class="glyphicon glyphicon-option-horizontal"></span></button></span>')
            _self.element.parent().find('.showBox').off("click").on("click", function () {

                if (_self.option.currentAccountingYear == "") {
                    $.zxsaas_plus.showalert("提示", "请先选择日期!");
                    return;
                }

                //模态框id
                var modalID = "modal" + _self.option.nonDuplicateID;
                var modalClass = "modal" + _self.element.attr("id");
                if ($("#" + modalID).size() < 1) {
                    //清空初始化多次的modal
                    $("."+modalClass).remove();

                    $(document.body).append([
                        '<div  id="' + modalID + '" class="modal fade '+modalClass+'" tabindex="-1" role="dialog" aria-hidden="true">',
                        '<div class="modal-dialog modal-lg" role="document">',
                        '<div class="modal-content">',
                        '<div class="modal-header">',
                        '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>',
                        '<h4 class="modal-title">科目参照</h4>',
                        '</div>',
                        '<div class="modal-body">',
                        '<div class="col-xs-3"><ul id="' + _self.option.treeId + '" class="ztree"></ul></div>',
                        '<div class="col-xs-9">',
                        '<div class="row"><input type="text" class="form-control searchStore" placeholder="请输入科目名称或科目编码"></div>',
                        '<div class="row gridBox"><table id="' + _self.option.gridId + '" class="zxsaastable"></table><div id="' + _self.option.gridPageId + '"></div>\'</div>',
                        '</div>',
                        '</div>',
                        '<div class="modal-footer none">',
                        '<button type="button" class="btn btn-default comOk" data-dismiss="modal">确定</button>',
                        '<button type="button" class="btn btn-default comClose" data-dismiss="modal">关闭</button>',
                        '</div>',
                        '</div>',
                        '</div>',
                        '</div>',
                    ].join('\n'));
                    $("#" + _self.option.treeId).html("");
                    //加载tree
                    $.ajax({
                        type: 'post',
                        url: "/manager/cw/company/findView",
                        data: {
                            'currentAccountingYear': _self.option.currentAccountingYear
                        },
                        dataType: "json",
                        success: function (data) {
                            var treeSetOption = {
                                data: {simpleData: {enable: true, idKey: "id", pIdKey: "pId", rootPId: null}},
                                callback: {
                                    onClick: function (event, treeId, treeNode, msg) {
                                        var param =null;
                                        if(treeNode.id < 0){
                                            param = {
                                                id:null,
                                                subjectClssify:treeNode.id,
                                            }
                                        }else{
                                            param = {
                                                id:treeNode.id,
                                                subjectClssify:null,
                                            }
                                        }
                                        $("#" + _self.option.gridId).jqGrid("clearGridData")
                                            .jqGrid('setGridParam', {
                                                datatype: 'json',
                                                postData: param, //发送数据
                                            }).trigger("reloadGrid");
                                    }
                                },
                                view: {
                                    showLine: true
                                }
                            };
                            $.fn.zTree.init($("#" + _self.option.treeId), treeSetOption, data.data.rows);
                            var treeObj = $.fn.zTree.getZTreeObj(_self.option.treeId);
                            var nodes = treeObj.getNodes();
                            for (var i = 0; i < nodes.length; i++) { //设置一级节点展开
                                treeObj.expandNode(nodes[i], true, false, false);
                            }
                        }
                    });
                    $.jgrid.gridUnload(_self.option.gridId);
                    //加载grid
                    $("#" + _self.option.gridId).jqGrid({
                        styleUI: 'Bootstrap',//设置jqgrid的全局样式为bootstrap样式 ，
                        url: "/manager/cw/company/pageChildrens",
                        mtype: "post",
                        datatype: "json",
                        postData: {
                            ifEndSubject:_self.option.ifEndSubject,
                            'currentAccountingYear': _self.option.currentAccountingYear,
                            rows: 20,
                            page: 1
                        },
                        colNames: ['ID', '科目编码', '科目名称', '科目类型'],
                        colModel: [
                            {name: 'id', index: 'id', align: 'center', width: 90, hidden: true},
                            {name: 'subjectCode', index: 'subjectCode', align: 'left',sortable: false, width: 180},
                            {name: 'subjectName', index: 'subjectName', align: 'left', sortable: false,width: 180},
                            {name: 'subjectClssifyName', index: 'subjectClssifyName', align: 'left',sortable: false, width: 180},
                        ],
                        jsonReader: {
                            root: "data.rows",
                            page: "data.page",
                            total: "data.total",
                            records: "data.records",
                            repeatitems: false
                        },
                        sortable: false,
                        rownumbers: true,	//显示行号
                        rowNum: 10,
                        rowList: [20, 25, 40],
                        pager: "#" + _self.option.gridPageId,
                        viewrecords: true,
                        width: '100%',
                        height: $(window).height() * 0.45,
                        autowidth: true,
                        rownumWidth: 50,
                        shrinkToFit: false,
                        gridComplete: function () {
                            $("#"+_self.option.gridPageId+"_left").remove();
                            $("#"+_self.option.gridPageId+"_center").attr('colspan',2);
                        },
                        ondblClickRow: function (rowid, iRow, iCol, e) {
                            var accountInfo =  $("#" + _self.option.gridId).jqGrid('getRowData', rowid);
                            _self.element.val(accountInfo.subjectCode).data('id', accountInfo.id);

                            if( _self.option.ondblClickRowCallBack){
                                _self.option.ondblClickRowCallBack({
                                    accountInfo:accountInfo
                                })
                            }
                            $("#" + modalID).modal('hide')

                        }
                    })
                    $("#" + _self.option.gridId).resize();
                    $("#" + modalID).modal('show');
                    $("#" + modalID).find(".searchStore").on("input", function () {
                        $("#" + _self.option.gridId).jqGrid("clearGridData")
                            .jqGrid('setGridParam', {
                                datatype: 'json',
                                postData: {
                                    keyWord: $(this).val(),
                                    currentAccountingYear: _self.option.currentAccountingYear
                                }, //发送数据
                            }).trigger("reloadGrid");
                    });

                } else {
                    $("#" + _self.option.gridId).resize();
                    $("#" + modalID).modal('show')
                }

            });
        },
        //清空dom
        clearDom: function () {
            this.element.val("").data("id","");
        },
        //清除当前信息
        clearEle:function(){
            this.element.val("").data("id","")
        },
        //设置当前年份
        setCurrentAccountingYear:function (year) {
            this.option.currentAccountingYear =year;
        }
    };
    window.comSubjectCode = comSubjectCode;

    //在插件中使用  组件对象
    $.fn.comSubjectCode = function (options) {
        //创建的实体
        var obj = new comSubjectCode(this, options);
        //调用其方法
        return obj;
    }
}(jQuery);