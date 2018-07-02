(function($){
    var plugin_Name='loading';
    $[plugin_Name]=function(remove){
        var $obj=$('body');
        if (remove) {
            /* $obj.find('.xloading').fadeOut('400', function() {
                 $obj.find('.xloading').remove();
             });*/
            $obj.find('.xloading').remove();
            return false;
        }
        if (!$obj.find('.xloading').length) {
            var str = '<div class="xloading"><div class="loading-mask"></div><div class="loading-info"><i></i><span>正在加载...</span></div></div>';
            $obj.append(str);
        }
    }
})(jQuery);
(function($) {
    $.request = function(opt) {
        var dtd = $.Deferred();
        var cfg = {
            url: null,
            type: 'get',
            dataType: 'json',
            params: {},
            data: {},
            done: null,
            fail: null,
            always: null,
            async: true
        };
        var params = opt.params || opt.data;
        opt = $.extend(cfg, opt);
        if (opt.json && opt.type.toLowerCase() == 'post') {
            params = JSON.stringify(params);
            opt.headers['Content-Type'] = 'application/json; charset=UTF-8';
        }
        opt.data = params;
        $.loading();
        $.ajax(opt)
            .done(function(data) {
                if (opt.done) opt.done(data);
                else dtd.resolve(data);
            })
            .fail(function(data) {
                if (opt.fail) opt.fail(data);
                else dtd.reject(data);
            })
            .always(function(data) {
                if (opt.always) opt.always(data);
                $.loading(true);
            });
        return dtd.promise();
    };
    $.extend({
        showModal: function (title,width,bodyHtml) {
            if(!title)title='';
            if(!width)width='';
            if(!bodyHtml)bodyHtml='';
            var modalHtml='<div class="defaultModal modal fade" tabindex="-1" role="dialog">'+
                '<div class="modal-dialog" style="width:'+width+';" role="document">'+
                '<div class="modal-content">'+
                '<div class="modal-header">'+
                '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
                '<h4 class="modal-title">'+title+'</h4></div>'+
                '<div class="modal-body">'+ bodyHtml +'</div>'+
                '<div class="modal-footer">'+
                '<button type="button" class="modalSave btn btn-info">确定</button>'+
                '<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>'+
                '</div></div></div></div>';
            $('body').append(modalHtml);
            $('.defaultModal').modal('show').on('hidden.bs.modal', function () {
                $('.defaultModal').remove()
            })
        },
        closeModal: function () {
            $('.defaultModal').modal('hide')
        }
    });
    $.fn.inputCombination=function (opt) {
        var cfg={
            baseClass:'form-control',
            css:{
                width:'200px',
                display:'inline-block',
                paddingRight:'25px'
            },

            treeSearch:false,//是否允许模糊查询
            tree:{
                type:'post',
                url:'',
                treeDataHeader:'',
                data:{}
            },

            modal:false,//是否允许模态框
            modalCfg:{
                modalTitle:'',
                modalWidth:'1000px',

                modalTree:false,
                modalTreeCfg:{
                    url:'',
                    type:'post',
                    treeDataHeader:'',
                    sureCallback:function(){}
                },

                modalTreeTable: false,
                modalTreeTableCfg:{
                    tree:{
                        type: 'post',
                        url: '',
                        dataType:'json',
                        data:{},
                        treeDataHeader: '',
                        sureCallback: function () {}
                    },
                    table:{
                        async:true,
                        url:'',
                        datatype:'json',
                        mtype:'post',
                        data:{},
                        jsonReader:"",
                        colNames:[],
                        colModel:[]
                    }
                }
            },

            custom:false,//自定义点击事件
            customClick:function(){}
        };
        opt = $.extend(true,cfg,opt);
        return this.each(function () {
            var _this=$(this), t;
            _this.focusout(function (e) {
                if(t)clearTimeout(t);
                e.stopPropagation()
            });
            _this.wrap('<div class="inputWrap" style="position: relative;display:inline-block;"></div>').addClass(opt.baseClass).css(opt.css);
            if(opt.treeSearch){
                _this.keyup(function (e) {
                    if(_this.val()!=''){
                        if(t)clearTimeout(t);
                        t=setTimeout(function () {
                            $.ajax({
                                type:opt.tree.type,
                                url:opt.tree.url,
                                data:{keyWord:_this.val()},
                                dataType:'json',
                                success: function (data) {
                                    $('#inputDropDownTree').remove();
                                    var arr=opt.tree.treeDataHeader.split('.');
                                    $.each(arr, function (i, val) {
                                        data=data[val];
                                    });
                                    if(data==undefined){
                                        alert('错误！检查dataHeader是否配置正确！')
                                    }else{
                                        _this.parent().append('<ul id="inputDropDownTree" class="ztree" style="position: absolute;border: 1px solid #ddd;z-index: 99999;background: #fff;border-top: 0;"></ul>');
                                        $.fn.zTree.init($("#inputDropDownTree"),{
                                            data: {
                                                simpleData: {enable: true}
                                            },
                                            view: {
                                                showLine: true
                                            },
                                            callback: {
                                                onClick: function (event, treeId, treeNode) {
                                                    _this.val(treeNode.name);
                                                    _this.data('id',treeNode.id);
                                                    $('#inputDropDownTree').remove();
                                                }
                                            }
                                        },data);
                                    }
                                },
                                error: function () {
                                    alert('error')
                                }
                            });
                        },500)
                    }
                    e.stopPropagation()
                });
                $(document).click(function (e) {
                    var __this=$('#inputDropDownTree');
                    if (!__this.is(e.target) && __this.has(e.target).length === 0) {
                        __this.remove();
                    }
                });
            }
            if(opt.modal){
                _this.prop('readonly',true);
                var _html='<span style="position: absolute;right:6px;top:9px;vertical-align: middle;cursor:pointer;z-index:2;" class="inputAssPlus glyphicon glyphicon-plus"></span>';
                _this.after(_html).closest('.inputWrap').find('.inputAssPlus').click(function () {
                    $.showModal(opt.modalCfg.modalTitle,opt.modalCfg.modalWidth);
                    if(opt.modalCfg.modalTree){
                        var nodeId=null,nodeName=null;
                        $('.defaultModal').find('.modal-body').append('<ul id="modalTree" class="ztree" style="position:relative;max-height:500px;overflow:auto;"></ul>');
                        $.fn.zTree.init($("#modalTree"),{
                            data: {
                                simpleData: {
                                    enable: true,
                                    idKey: "id",
                                    pIdKey: "parentId",
                                    rootPId: ''
                                }
                            },
                            async: {
                                enable:true,
                                url:opt.modalCfg.modalTreeCfg.url,
                                otherParam:{keyWord:_this.val()},
                                type:opt.modalCfg.modalTreeCfg.type,
                                dataType:'json',
                                dataFilter:function(treeId, parentNode, responseData){
                                    if(responseData.result==1){
                                        var optarr=opt.modalCfg.modalTreeCfg.treeDataHeader.split('.');
                                        $.each(optarr, function (i, val) {
                                            responseData=responseData[val];
                                        });
                                        if(responseData==undefined)alert('dataheader错误！');
                                        $.each(responseData,function(i,val){
                                            if(val.id==-1){
                                                val.open=true;
                                            }
                                        });
                                        return responseData
                                    }else{
                                        alert('请求失败！')
                                    }
                                }
                            },
                            view: {
                                showLine: true
                            },
                            callback: {
                                onClick: function (event, treeId, treeNode) {
                                    if(treeNode.check_Child_State==-1){
                                        nodeId=treeNode.id;
                                        nodeName=treeNode.name;
                                    }
                                },
                                onDblClick:function(event, treeId, treeNode){
                                    if($(event.target).is('span')){
                                        if(treeNode.check_Child_State==-1){
                                            _this.val(treeNode.name);
                                            _this.data('id',treeNode.id);
                                            $.closeModal();
                                            opt.modalCfg.modalTreeCfg.sureCallback()
                                        }
                                    }
                                }
                            }
                        });
                        $('.modalSave').on('click', function () {
                            if(nodeId!=null){
                                _this.val(nodeName);
                                _this.data('id',nodeId)
                            }else{
                                alert('未选择或只能选择末级节点！');
                                return false;
                            }
                            $.closeModal();
                            opt.modalCfg.modalTreeCfg.sureCallback()
                        });
                    }
                    if(opt.modalCfg.modalTreeTable){
                        var nodeIds=null;
                        $('.defaultModal').find('.modal-body').append('<ul id="modalTree" class="ztree" style="position:relative;width: 200px;float:left;max-height:500px;overflow:auto;"></ul>');
                        $.fn.zTree.init($("#modalTree"),{
                            data: {
                                simpleData: {
                                    enable: true,
                                    idKey: "id",
                                    pIdKey: "parentId",
                                    rootPId: ''
                                }
                            },
                            async: {
                                enable:true,
                                url:opt.modalCfg.modalTreeTableCfg.tree.url,
                                otherParam:{keyWord:_this.val()},
                                type:opt.modalCfg.modalTreeTableCfg.tree.type,
                                dataType:opt.modalCfg.modalTreeTableCfg.tree.dataType,
                                dataFilter:function(treeId, parentNode, responseData){
                                    if(responseData.result==1){
                                        var optarr=opt.modalCfg.modalTreeTableCfg.tree.treeDataHeader.split('.');
                                        $.each(optarr, function (i, val) {
                                            responseData=responseData[val];
                                        });
                                        if(responseData==undefined)alert('dataheader错误！');
                                        $.each(responseData,function(i,val){
                                            if(val.id==-1){
                                                val.open=true;
                                            }
                                        });
                                        return responseData
                                    }else{
                                        alert('请求失败！')
                                    }
                                }
                            },
                            view: {
                                showLine: true
                            },
                            callback: {
                                onClick: function (event, treeId, treeNode) {
                                    nodeIds=treeNode.id;
                                    $("#grid__").jqGrid('setGridParam', {
                                        ajaxGridOptions:{async:opt.modalCfg.modalTreeTableCfg.table.async},
                                        postData:{
                                            goodsCategoryIds:nodeIds
                                        }
                                    }).trigger("reloadGrid");
                                }
                            }
                        });
                        var cellVal=null;
                        $('.defaultModal').find('.modal-body').append('<div class="grid_wrap_" style="width:740px;float:left;"><table id="grid__"></table><div id="pager__"></div></div>');
                        $("#grid__").jqGrid({
                            ajaxGridOptions:{async:opt.modalCfg.modalTreeTableCfg.table.async},
                            url:opt.modalCfg.modalTreeTableCfg.table.url,
                            datatype:opt.modalCfg.modalTreeTableCfg.table.datatype,
                            mtype:opt.modalCfg.modalTreeTableCfg.table.mtype,
                            postData:opt.modalCfg.modalTreeTableCfg.table.data,
                            jsonReader:{
                                root:opt.modalCfg.modalTreeTableCfg.table.jsonReader
                            },
                            colNames:opt.modalCfg.modalTreeTableCfg.table.colNames,
                            colModel:opt.modalCfg.modalTreeTableCfg.table.colModel,
                            caption: "",//标题
                            height:259,
                            autowidth:true,
                            cellLayout:100,
                            forceFit:true,//调整宽度时是否改变总宽度
                            rownumbers: true,//行号
                            //multiselect: true,//是否复选框
                            multiboxonly: false,//是否可以同时多选
                            sortable: true,//是否排序
                            sortorder: "asc",//排序方式
                            sortname: 'id',//排序字段
                            viewrecords: true,//显示条目总数
                            recordpos: 'right',//条目总数显示位置
                            rowNum: 10,//默认显示条目数
                            rowList: [20, 50, 100],//更改默认显示条目数
                            cellEdit:false,//是否允许编辑单元格
                            cellsubmit: 'clientArray',//单元格保存内容的位置
                            footerrow:false,//合计行
                            pager: '#pager__',//翻页行
                            formatCell:function(rowid, colname, cellvalue){},
                            beforeSelectRow : function(rowid, e) {},
                            ondblClickRow:function(id){
                                var rowData=$(this).jqGrid("getRowData",id);
                                cellVal=rowData.name;
                                _this.val(cellVal);
                                $.closeModal();
                            },
                            beforeEditCell:function(rowid,cellname,v,iRow,iCol){lastrow = iRow;lastcell = iCol;},
                            onCellSelect:function(id,index,e){},
                            gridComplete:function(data){},
                            loadComplete: function(data){},
                            loadError:function(xhr,status,error){}
                        });
                        $('.grid_wrap_ div').css('width','auto');
                        $('.modalSave').on('click', function () {
                            var rowData=$("#grid__").jqGrid("getRowData",$('#grid__').getGridParam("selrow"));
                            cellVal=rowData.name;
                            if(cellVal!=null){
                                _this.val(cellVal);
                            }else{
                                alert('未选择！');
                                return false;
                            }
                            $.closeModal();
                            opt.modalCfg.modalTreeTableCfg.tree.sureCallback()
                        });
                    }
                });
            }
            if(opt.custom){
                var _html='<span style="position: absolute;right:6px;top:9px;vertical-align: middle;cursor:pointer;z-index:2;" class="inputAssPlus glyphicon glyphicon-plus"></span>';
                _this.after(_html).closest('.inputWrap').find('.inputAssPlus').click(function(){
                    opt.customClick()
                })
            }
        })
    };
    $.fn.timeControl=function(opt){
        dft={
            ajaxOpt:{
                url:'/manager/inventory/common/getInventoryBillsDate',
                type:'post',
                dataType:'json',
                data:{
                    'menuCode':$('#AUTH').data('code')
                }
            }
        };
        opt=$.extend(true,dft,opt);
        return this.each(function(){
            _this=$(this);
            $.ajax(opt.ajaxOpt)
                .done(function(data){
                    if(data.result==1){
                        if(data.data.hasPermissions==1){
                            _this.datetimepicker({
                                lang: "ch",
                                format: "Y-m-d",
                                timepicker: false,
                                todayButton: false,
                                value:data.data.maxDate,
                                minDate:data.data.minDate,
                                maxDate:data.data.maxDate
                            }).prop('disabled',false);
                        }else{
                            _this.val(data.data.maxDate).prop('disabled',true);
                        }
                    }else{alert('error')}
                })
                .fail(function(){alert('error')})
        })
    }



})(jQuery);