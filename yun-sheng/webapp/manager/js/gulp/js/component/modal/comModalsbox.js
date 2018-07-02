/*
 组件 模板

*/

!function ($) {

    // 构造函数
    var comModalsbox = function (el, option) {
        var nonDuplicateID = functionObjExtent.GenNonDuplicateID();// 不重复的ID
        // 默认参数
        var defaults = {
            gridID:'modalGrid'+nonDuplicateID, //表格的id
            treeSetOption:{},
            clickBefore:null,// 点击之前的回调
            clickback:null,//确定的回调，双击的回调
        };
        this.option = $.extend(true, defaults, option);
        if(this.option.isHasTree==true){
            this.option.treeID='modalTree'+nonDuplicateID;
        }
        this.element = $(el);
        var target = this.element;
        target.data('id','');
        target.empty();
        target.prop('readonly',true)
        this.dom = null;
        this._init();
    };
    comModalsbox.prototype = {
        _init: function () {
            this.clearDom();
            this.getDom();
            this.loadDom();
        },
        //获取dom
        getDom: function () {
            var _self=this;
            var options=this.option;
            var icon=$('<span class="input-group-btn showBox showModalBtn"><button class="btn btn-default" type="button"><span class="glyphicon glyphicon-option-horizontal"></span></button></span>');
            this.element.after(icon)
            var  $_template=$([
                '<div class="modal fade comModal" tabindex="-1" role="dialog" aria-hidden="true">',
                '<div class="modal-dialog modal-lg" role="document">',
                '<div class="modal-content" >',
                '<div class="modal-header">',
                '<button type="button" class="close closer" aria-label="Close"><span aria-hidden="true">&times;</span></button>',
                '<h4 class="modal-title">'+options.name+'选择</h4>',
                '</div>',
                '<div class="modal-body" style="width: 900px;">',
                '<div>',
                '<div class="row form-inline filterWrap" style="margin:0 0 10px 0;"><input type="text" style="width:50%;" class="form-control searchInput" placeholder="请输入'+options.placeholder+'"></div>',
                '<div class="row gridBox" style="margin:0 0 10px 0;"></div>',
                '</div>',
                '</div>',
                '<div class="modal-footer">',
                '<button type="button" class="erp-btn-bg  sureModalBtn" data-dismiss="modal">确定</button>',
                '<button type="button" class="erp-btn-lab closer" >关闭</button>',
                '</div>',
                '</div>',
                '</div>',
                '</div>',
            ].join('\n'));
            if(options.treeID){
                $_template.find('.modal-body').prepend('<div class="col-xs-3 treeBox" style="overflow:auto;"><ul id="'+options.treeID+'" class="ztree" ></ul></div>')
                $_template.find('.gridBox').parent().addClass('col-xs-9')
            }
            $_template.find('.gridBox').append('<table id="'+options.gridID+'" class="zxsaastable"></table><div id="gridpager_'+options.gridID+'"></div>')
            //点击下拉图标
            icon.unbind("click").on("click", function (e) {
                //点击之前验证，
                if(_self.option.clickBefore){
                    var flag=_self.option.clickBefore();
                    if(flag===false){
                        return
                    }
                }
                _self.dom.modal('show')
                var options=_self.option;
                setTimeout(function(){
                    var grid=$('#'+options.gridID);
                    var len = grid.find('tbody').children().length
                    if(len <= 1){
                        //加载树
                        if(options.treeID){
                            treeFun()
                        }
                    }else if(options.isReloadTree===true){
                        //加载树
                        if(options.treeID){
                            treeFun()
                        }
                    }

                    //页面进来的时候，清空掉 搜索 的值
                    $_template.find('.searchInput').val('')
					$_template.find('.modalFilter').attr('checked',false);
                    options.girdParam.queryKey=''
                    grid.jqGrid('setGridParam',{
                        datatype:'json',
                        url:options.girdUrl,
                        postData:options.girdParam,
                        page:1
                    }).trigger("reloadGrid"); //重新载入
                },150)
            });
            $_template.find('.closer').on('click',function(){
                _self.dom.modal('hide')
            })
            //确定按钮点击事件
            $_template.find('.sureModalBtn').unbind("click").on("click", function (e) {
                var ids = $("#"+options.gridID).jqGrid('getGridParam', 'selarrrow')
                var Ids = [];
                var Names = [];
                var arrList=[];
                for(var i = 0 ; i<ids.length;i++){
                    var dataInfo = $("#"+options.gridID).jqGrid('getRowData',ids[i])
                    Ids.push(dataInfo.dataId)
                    Names.push(dataInfo.name)
                    arrList.push(dataInfo)
                }
                _self.element.val(Names.join(',')).data('id',Ids.join(','))
                if(_self.option.clickback){
                    _self.option.clickback(arrList)
                }
            });
            var times
            //搜索事件 注销实时搜索，添加回车
            if(options.enter){
				$_template.find('.searchInput').unbind("input propertychange");
				$_template.find('.searchInput').unbind("keypress").on('keypress',function(e){
					var _this=$(this)
					if( (e.keyCode == 40 || e.keyCode == 38)){
						_this.blur()
					}
					else if(e.keyCode == 13)
					{
						$("#"+options.gridID).jqGrid('setGridParam',{
							datatype:'json',
							postData:{
								'queryKey':_this.val().trim(),
							},
							page:1
						}).trigger("reloadGrid"); //重新载入
					}
				});
            }else{
				$_template.find('.searchInput').unbind("input propertychange").on("input propertychange", function (e) {
					var _this=$(this)
					if( (e.keyCode == 40 || e.keyCode == 38 || e.keyCode == 13)){
						_this.blur()
					}else{
						if (times) clearTimeout(times)
						times = setTimeout(function () {
							$("#"+options.gridID).jqGrid('setGridParam',{
								datatype:'json',
								postData:{
									'queryKey':_this.val().trim(),
								},
								page:1
							}).trigger("reloadGrid"); //重新载入
						}, 300)
					}
				});
            }
            if(!options.multiselect){
                $_template.find('.sureModalBtn').hide()
            }
            this.dom = $_template;
            $('body').append(this.dom)
            var $gird=$("#"+options.gridID)
            gridLoad();
            function treeFun(){
                var options=_self.option;
                options.treeSetOption = {
                    callback:{
                        onClick: function(event, treeId, treeNode, msg) {
                            $gird.jqGrid('setGridParam',{
                                datatype:'json',
                                postData:{
                                    'typeId': options.treeSelCod===true? treeNode.code:treeNode.id,
                                    'dataId': options.treeSelCod===true? treeNode.code:treeNode.id
                                },
                                page:1
                            }).trigger("reloadGrid"); //重新载入
                        }
                    },
                    view: {
                        showLine: true
                    },
                    data: {
                        simpleData: {enable: true}
                    }
                }
                $.ajax({
                    type: 'post',
                    url: options.treeUrl,
                    data:options.treeParams,
                    dataType: "json",
                    success: function(data) {
                        var nodes = data.data.dataList||[];
                        for(var i=0;i<nodes.length;i++){
                            nodes[i].pId=nodes[i].parentId
                        }
                        $.fn.zTree.init($("#"+options.treeID), options.treeSetOption,nodes);
                        var zTree = $.fn.zTree.getZTreeObj(options.treeID);
                        zTree.expandAll(false);
                        var nodes = zTree.getNodes();
                        for (var i = 0; i < nodes.length; i++) { //设置节点展开
                            zTree.expandNode(nodes[i], true, false, true);
                        }
                    }
                });
            }
            function gridLoad(){
                var postTimes=0
                $gird.jqGrid({
                    shrinkToFit: false,
                    styleUI: 'Bootstrap',
                    responsive:true,
                    mtype: "post",
                    datatype: "local",
                    jsonReader  : {
                        root:"data.dataList",
                        total: "data.total",
                        records: "data.records",
                        repeatitems: false
                    },
                    colNames: options.colNames,
                    colModel: options.colModel,
                    sortable: false,
                    rownumbers:true,	//显示行号
                    rowNum: 100,
                    rowList: [100, 200, 500],
                    pager: "#gridpager_"+options.gridID,
                    viewrecords: true,
                    width:'100%',
                    height: $(window).height() * 0.4,
                    autowidth: true,
                    rownumWidth:50,
                    multiselect:options.multiselect ,

                    gridComplete:function(){
                        $gird.resize()
                        $gird.setLabel(0,'序号')
                        $gird.find('table th').css('text-align','center')
                        $("#gridpager_"+options.gridID+"_left").remove()
                        $("#gridpager_"+options.gridID+"_center").attr('colspan',2)
                    },
                    loadComplete:function(){
                        postTimes++
                        if(postTimes==2){
                            setTimeout(function(){
                                $gird.jqGrid('setFrozenColumns');
                            },100)
                        }
                        else if(postTimes==100){
                            postTimes=3
                        }
                        //选中的ids集合
                        var selectionArrDataIds = $.trim(_self.element.data('id')).split(',');
                        if(selectionArrDataIds.length>0){
                            var ids = $gird.getDataIDs();
                            $.each(ids,function(i,index){
                                var row = $gird.getRowData(index);
                                if(selectionArrDataIds.indexOf(row.dataId)>-1){
                                    $gird.jqGrid('setSelection',index);
                                }
                            })
                        }
                        setTimeout(function(){
                            $_template.find('.searchInput').focus()
                        },400)

                    },
                    ondblClickRow: function (rowid, iRow, iCol, e) {
                        if(!options.multiselect){
                            var info = $gird.jqGrid('getRowData',rowid)
                            _self.element.val(info.name).data('id',info.dataId)
                            if(_self.option.clickback){
                                _self.option.clickback([info])
                            }
                            _self.dom.modal('hide')
                        }
                    },
                })

            }

        },
        //加载dom
        loadDom: function () {

        },
        //清空dom
        clearDom:function () {
            if (this.dom !== null) {
                this.dom.remove();
                this.dom = null;
            }
        },
        //设置当前的参数
        setOption: function (data) {
            this.option = $.extend(false, this.option, data);
        },
        //设置当前的参数
        getOption: function () {
            return this.option;
        },
        getMethod:function(name){
            return this.getAccessor(comModalsbox.prototype, name);
        },
        //访问器
        getAccessor : function(obj, expr) {
            var ret,p,prm = [], i;
            if( typeof expr === 'function') { return expr(obj); }
            ret = obj[expr];
            if(ret===undefined) {
                try {
                    if ( typeof expr === 'string' ) {
                        prm = expr.split('.');
                    }
                    i = prm.length;
                    if( i ) {
                        ret = obj;
                        while (ret && i--) {
                            p = prm.shift();
                            ret = ret[p];
                        }
                    }
                } catch (e) {}
            }
            return ret;
        },
        // 默认模板
        getTemplate:function(){
            // 默认模板
            var _template = '';
            return _template
        }
    };
    window.comModalsbox = comModalsbox;

    //在插件中使用  组件对象
    $.fn.comModalsbox = function(options) {
        //创建的实体
        var obj = new comModalsbox(this, options);
        //调用其方法
        return obj;
    }
}(jQuery);