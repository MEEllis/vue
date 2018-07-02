var globalId = null;
var lastrow;
var lastcell;

var firstrow;
var firstcell;
$(function () {
    init()
    function init() {
        initTree();
        // initsecTree();
        initTable()
        // initModalGrid()
        initTopForm()

        treeFun();
    }
    function initTree() {
        //树设置参数
        var setting = {
            data: {//数据属性设置
                simpleData: {enable: true, idKey: "id", pIdKey: "pid", rootPId: null}
            },
            async: {//从后台获取数据
                enable: true,
                url: "/manager/Tgoodsclass/findTree2?groupId=" + gl_groupId,
                autoParam: [],
                dataFilter: null
            },
            callback: {//回调事件设置
                onClick: function (event, treeId, treeNod) {
                    globalId = treeNod.id * 1;
                    $("#goodsClassify a").removeClass("curSelectedNode");
                    $("#" + event.target.parentNode.id).addClass("curSelectedNode");
                    var getChange = event.target.parentNode.id.replace(/^[A-Za-z]+/, "modalZtree");
                    $("#modalZtree a").removeClass("curSelectedNode");
                    $("#" + getChange).addClass("curSelectedNode");
                    // var companyId = null;
                    // if ($(".companySe option:selected").data("id")) {
                    //     companyId = $(".companySe option:selected").data("id").toString();
                    // }
                   var userName = $(".filterGoodsName").val().toString();
                    var page = $("#input_mainPager>input").val();
                    var pageSize = $(".ui-pg-selbox option:selected").val();

                    $("#mainGrid").setGridParam( //G,P要大写
                        {
                            url: "/manager/priceManage/showList",
                            postData: {
                               keyWord: userName,
                                goodsBrandId: null,
                               // companyId: companyId,
                                goodsClassId: globalId,
                                page: page,
                                pageSize: pageSize
                            }
                        }
                    ).trigger("reloadGrid");


                }

            },
            view: {//样式设置
                showIcon: true
            }
        };
        $.fn.zTree.init($("#goodsClassify"), setting);
        var zTree = $.fn.zTree.getZTreeObj("goodsClassify");
        zTree.expandAll(true);
    };

    function initTable() {
        /**
         * 表格初始化
         */
        $.jgrid.defaults.width = 500;
        $.jgrid.defaults.responsive = true;
        $.jgrid.defaults.styleUI = 'Bootstrap';
        $("#mainGrid").jqGrid({
            url: "/manager/priceManage/showList",
            mtype: "POST",
            datatype: "json",
            //data:mydata,
            //datatype:"local",
            jsonReader: {
                root: "data.priceVoList",
                repeatitems: false,
                page: "data.page",
                total: "data.pageCount",
                records: "data.totalCount"
            },
            pager: "#mainPager",
            rowNum: 10,
            rowList: [10, 15, 20, 25, 40],
            colNames: ["禁用","商品类别", "商品品牌", "商品型号", "商品颜色", "商品编码", "商品名称", "零售价", "最低零售价", "最低批发价","specialSectionCount","", "部门考核价",'调拨价', "售价一", "售价二", "售价三", "售价四", "售价五", "预设进价", "集团指导价一", "集团指导价二", "价格ID", "集团ID", "商品ID", "类别ID", "品牌ID", "颜色ID"],
            colModel: [
                {name: "disableStatus", index: "disableStatus", align: "center", width: 40, sortable: false},
                {name: "goodsCategoryName", index: "goodsCategoryId", align: "center", width: 110, sortable: false},
                {name: "goodsBrandName", index: "goodsBrandId", align: "center", width:110, sortable: false},
                {name: "goodsModel", index: "goodsModel", align: "center", width: 110, sortable: false},
                {name: "goodsColorName", index: "goodsColorName", align: "center", width: 110, sortable: false},
                {name: "code", index: "code", align: "left", width: 110, sortable: false},
                {name: "name", index: "name", align: "left", width: 200, sortable: false},
                {
                    name: "retailPrice",
                    index: "retailPrice",
                    align: "right",
                    width: 90,
                    editable: true,
                    edittype: "text",
                    formatter: "number",
                    sortable: false,
                    editoptions: {
                        onkeyup: "checkInput.checkNum(this,10)",
                        dataEvents: [{
                            type: "focus",
                            fn: function(){
                                this.select()
                            }
                        }]}
                },
                {
                    name: "minRetailPrice",
                    index: "minRetailPrice",
                    align: "right",
                    width: 110,
                    editable: true,
                    edittype: "text",
                    formatter: "number",
                    sortable: false,
                    editoptions: {
                        onkeyup: "checkInput.checkNum(this,10)",
                        dataEvents: [{
                            type: "focus",
                            fn: function(){
                                this.select()
                            }
                        }]}
                },
                {
                    name: "minWholesalePrice",
                    index: "minWholesalePrice",
                    align: "right",
                    width: 110,
                    editable: true,
                    edittype: "text",
                    formatter: "number",
                    sortable: false,
                    editoptions: {
                        onkeyup: "checkInput.checkNum(this,10)",
                        dataEvents: [{
                            type: "focus",
                            fn: function(){
                                this.select()
                            }
                        }]}
                },
                {name: 'specialSectionCount', index: 'specialSectionCount', width:110,align: 'center', sortable: false,hidden: true},
                {name: 'specialSectionCountNum', index: 'specialSectionCountNum', width:70,align: 'center', sortable: false,
                    formatter:function(cellvalue, options, rowObject){
                        var retStr
                        if(Number($.trim(rowObject.specialSectionCount))>0){
                            retStr="<label class='valuationMethodsIcon3'><span class='priceLen'>"+rowObject.specialSectionCount+"</span> </label>"
                        }else{
                            retStr="<label class='valuationMethodsIcon3'></label>"
                        }
                        return retStr
                    },
                },

                {
                    name: "storeVisiblePrice",
                    index: "storeVisiblePrice",
                    align: "right",
                    width: 110,
                    editable: true,
                    edittype: "text",
                    formatter: "number",
                    sortable: false,
                    editoptions: {
                        onkeyup: "checkInput.checkNum(this,10)",
                        dataEvents: [{
                            type: "focus",
                            fn: function(){
                                this.select()
                            }
                        }]}
                },
                {
                    name: "transferPrice",
                    index: "transferPrice",
                    align: "right",
                    width: 110,
                    editable: true,
                    edittype: "text",
                    formatter: "number",
                    sortable: false,
                    editoptions: {
                        onkeyup: "checkInput.checkNum(this,10)",
                        dataEvents: [{
                            type: "focus",
                            fn: function(){
                                this.select()
                            }
                        }]}
                },
                {
                    name: "salesPrice1",
                    index: "salesPrice1",
                    align: "right",
                    width: 110,
                    editable: true,
                    edittype: "text",
                    formatter: "integer",
                    sortable: false,
                    editoptions: {onkeyup: "checkInput.checkNum(this,10)"}
                },
                {
                    name: "salesPrice2",
                    index: "salesPrice2",
                    align: "right",
                    width: 110,
                    editable: true,
                    edittype: "text",
                    formatter: "integer",
                    sortable: false,
                    editoptions: {onkeyup: "checkInput.checkNum(this,10)"}
                },
                {
                    name: "salesPrice3",
                    index: "salesPrice3",
                    align: "right",
                    width: 110,
                    editable: true,
                    edittype: "text",
                    formatter: "integer",
                    sortable: false,
                    editoptions: {onkeyup: "checkInput.checkNum(this,10)"}
                },
                {
                    name: "salesPrice4",
                    index: "salesPrice4",
                    align: "right",
                    width: 110,
                    editable: true,
                    edittype: "text",
                    formatter: "integer",
                    sortable: false,
                    editoptions: {onkeyup: "checkInput.checkNum(this,10)"}
                },
                {
                    name: "salesPrice5",
                    index: "salesPrice5",
                    align: "right",
                    width: 110,
                    editable: true,
                    edittype: "text",
                    formatter: "integer",
                    sortable: false,
                    editoptions: {onkeyup: "checkInput.checkNum(this,10)"}
                },
                {
                    name: "presetPrice",
                    index: "presetPrice",
                    align: "right",
                    width: 110,
                    editable: true,
                    edittype: "text",
                    formatter: "integer",
                    sortable: false,
                    editoptions: {onkeyup: "checkInput.checkNum(this,10)"}
                },
                {name: "groupGuidePrice1", index: "groupGuidePrice1", align: "right", width: 110, sortable: false},
                {name: "groupGuidePrice2", index: "groupGuidePrice2", align: "right", width: 110, sortable: false},
                {name: "tpriceGoodsId", index: "tpriceGoodsId", align: "center", width: 0, hidden: true, hidedlg: true},
                {name: "groupId", index: "groupId", align: "center", width: 0, hidden: true, hidedlg: true},
                {name: "goodsId", index: "goodsId", align: "center", width: 0, hidden: true, hidedlg: true},
                {name: "goodsCategoryId", index: "goodsCategoryId", align: "center", width: 0, hidden: true, hidedlg: true},
                {name: "goodsBrandId", index: "goodsBrandId", align: "center", width: 0, hidden: true, hidedlg: true},
                {name: "goodsColorId", index: "goodsColorId", align: "center", width: 0, hidden: true, hidedlg: true}
            ],
            //loadonce: false,
            sortable: false,
            rownumbers: true,
            multiselect: true,
            cellsubmit: 'clientArray',//单元格保存内容的位置
            editurl: 'clientArray',
            viewrecords: true,
            cellEdit: true,
            shrinkToFit:false,
            height: $(window).height() * 0.6,
            autowidth: true,
            prmNames: {
                page: "page",    // 表示请求页码的参数名称
                rows: "pageSize",    // 表示请求行数的参数名称
                sort: null, // 表示用于排序的列名的参数名称
                order: null, // 表示采用的排序方式的参数名称
                search: null, // 表示是否是搜索请求的参数名称
                nd: null, // 表示已经发送请求的次数的参数名称
                id: null // 表示当在编辑数据模块中发送数据时，使用的id的名称

            },
            postData: {
                "keyWord": $(".mainFilter").val(),
               // "companyId": $(".companySe option:selected").data("id"),
                "goodsBrandId": null,
                "goodsClassId": globalId,
            },
            //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
//							footerrow:true,  //设置表格显示表脚
            userDataOnFooter: true,//设置userData 显示在footer里
            /*grouping:true,
            groupingView :
            { groupField : ['creditDirection'] },*/
            ondblClickRow: function (id) {
                //双击进入编辑
                var delid = id;

            },

            onCellSelect: function (rowid, iCol, contents, event) {
                var $target=$(event.target)
                var curColName
                if($.trim($target.attr('aria-describedby'))!=''){
                     curColName=$target.attr('aria-describedby').replace('mainGrid_','');
                }else{
                    curColName=$target.closest('td').attr('aria-describedby').replace('mainGrid_','');
                }

                if (curColName=='specialSectionCountNum') {

                    $('#bmkhjGrid').resize()

                    var rowDate = $('#mainGrid').getRowData(rowid);
                    $('.currentGoods').html("当前商品:<b>"+rowDate.name+"</b>")


                    $.ajax({
                        url:'/manager/Tgoodsname/loadInfo',
                        type:'post',
                        dataType:'json',
                        data:{
                            id:rowDate.goodsId
                        },
                        success:function(data){
                            obj = data.data.data
                            var ids=$('#bmkhjGrid').getDataIDs();
                            $.each(ids,function(index,rowid){
                                var idxRowData=$('#bmkhjGrid').jqGrid("getRowData",rowid);
                                var flag=0;
                                for(var i=0;i<obj.priceSectionList.length;i++){
                                    if(idxRowData.dataId==obj.priceSectionList[i].sectionId){
                                        $('#bmkhjGrid').setCell(rowid,'bmkhcb',obj.priceSectionList[i].specialPrice)
                                        $('#bmkhjGrid').setCell(rowid,'id',obj.priceSectionList[i].id)
                                        flag=1
                                        break;
                                    }
                                }
                                if(flag==0){
									$('#bmkhjGrid').setCell(rowid,'id','&nbsp')
                                    $('#bmkhjGrid').setCell(rowid,'bmkhcb',0)
                                }

                            })
                            $('#bmkhjModal').data('goodsPriceId',$.trim(obj.goodsPriceId)).modal('show')

                        }
                    })
                }

            },
            onSelectRow: function (id) {


            },

            beforeSelectRow: function (rowid, e) {

            },
            afterInsertRow: function (rowid, aData) { //新增一行之后

            },
            gridComplete: function () {

            },
            loadComplete: function (data) {

            },

            loadError: function (xhr, status, error) {
                //console.log(status)
            },
            beforeEditCell: function (rowid, cellname, v, iRow, iCol) {
                firstrow = iRow;
                firstcell = iCol;
            },

        })
    }

//     function initModalGrid() {
//         $.jgrid.defaults.width = 300;
//         $.jgrid.defaults.responsive = true;
//         $.jgrid.defaults.styleUI = 'Bootstrap';
//         $("#modalGrid").jqGrid({
//             url: "/manager/priceManage/showList",
//             mtype: "POST",
//             datatype: "json",
//             jsonReader: {
//                 root: "data.priceVoList",
//                 repeatitems: false,
//                 page: "data.page",
//                 total: "data.pageCount",
//                 records: "data.totalCount"
//             },
//             colNames: ["商品类别", "商品品牌", "商品型号", "商品颜色", "商品编码", "商品名称", "零售价", "最低零售价", "最低批发价", "部门考核价", "售价一", "售价二", "售价三", "售价四", "售价五", "预设进价", "集团指导价一", "集团指导价二", "价格ID", "集团ID", "商品ID", "类别ID", "品牌ID", "颜色ID"],
//             colModel: [
//                 {name: "goodsCategoryName", index: "goodsCategoryId", align: "center", width: 100, sortable: false},
//                 {name: "goodsBrandName", index: "goodsBrandId", align: "center", width: 100, sortable: false},
//                 {name: "goodsModel", index: "goodsModel", align: "center", width: 100, sortable: false},
//                 {name: "goodsColorName", index: "goodsColorName", align: "center", width: 100, sortable: false},
//                 {name: "code", index: "code", align: "center", width: 100, sortable: false},
//                 {name: "name", index: "name", align: "center", width: 100, sortable: false},
//                 {
//                     name: "retailPrice",
//                     index: "retailPrice",
//                     align: "center",
//                     width: 100,
//                     editable: true,
//                     edittype: "text",
//                     formatter: "integer",
//                     sortable: false,
//                     editoptions: {onkeyup: "checkInput.checkNum(this,12)"}
//                 },
//                 {
//                     name: "minRetailPrice",
//                     index: "minRetailPrice",
//                     align: "center",
//                     width: 100,
//                     editable: true,
//                     edittype: "text",
//                     formatter: "integer",
//                     sortable: false,
//                     editoptions: {onkeyup: "checkInput.checkNum(this,12)"}
//                 },
//                 {
//                     name: "minWholesalePrice",
//                     index: "minWholesalePrice",
//                     align: "center",
//                     width: 100,
//                     editable: true,
//                     edittype: "text",
//                     formatter: "integer",
//                     sortable: false,
//                     editoptions: {onkeyup: "checkInput.checkNum(this,12)"}
//                 },
//                 {
//                     name: "storeVisiblePrice",
//                     index: "storeVisiblePrice",
//                     align: "center",
//                     width: 100,
//                     editable: true,
//                     edittype: "text",
//                     formatter: "integer",
//                     sortable: false,
//                     editoptions: {onkeyup: "checkInput.checkNum(this,12)"}
//                 },
//                 {
//                     name: "salesPrice1",
//                     index: "salesPrice1",
//                     align: "center",
//                     width: 100,
//                     editable: true,
//                     edittype: "text",
//                     formatter: "integer",
//                     sortable: false,
//                     editoptions: {onkeyup: "checkInput.checkNum(this,12)"}
//                 },
//                 {
//                     name: "salesPrice2",
//                     index: "salesPrice2",
//                     align: "center",
//                     width: 100,
//                     editable: true,
//                     edittype: "text",
//                     formatter: "integer",
//                     sortable: false,
//                     editoptions: {onkeyup: "checkInput.checkNum(this,12)"}
//                 },
//                 {
//                     name: "salesPrice3",
//                     index: "salesPrice3",
//                     align: "center",
//                     width: 100,
//                     editable: true,
//                     edittype: "text",
//                     formatter: "integer",
//                     sortable: false,
//                     editoptions: {onkeyup: "checkInput.checkNum(this,12)"}
//                 },
//                 {
//                     name: "salesPrice4",
//                     index: "salesPrice4",
//                     align: "center",
//                     width: 100,
//                     editable: true,
//                     edittype: "text",
//                     formatter: "integer",
//                     sortable: false,
//                     editoptions: {onkeyup: "checkInput.checkNum(this,12)"}
//                 },
//                 {
//                     name: "salesPrice5",
//                     index: "salesPrice5",
//                     align: "center",
//                     width: 100,
//                     editable: true,
//                     edittype: "text",
//                     formatter: "integer",
//                     sortable: false,
//                     editoptions: {onkeyup: "checkInput.checkNum(this,12)"}
//                 },
//                 {
//                     name: "presetPrice",
//                     index: "presetPrice",
//                     align: "center",
//                     width: 100,
//                     editable: true,
//                     edittype: "text",
//                     formatter: "integer",
//                     sortable: false,
//                     editoptions: {onkeyup: "checkInput.checkNum(this,12)"}
//                 },
//                 {name: "groupGuidePrice1", index: "groupGuidePrice1", align: "center", width: 100, sortable: false},
//                 {name: "groupGuidePrice2", index: "groupGuidePrice2", align: "center", width: 100, sortable: false},
//                 {name: "tpriceGoodsId", index: "tpriceGoodsId", align: "center", width: 0, hidden: true, hidedlg: true},
//                 {name: "groupId", index: "groupId", align: "center", width: 0, hidden: true, hidedlg: true},
//                 {name: "goodsId", index: "goodsId", align: "center", width: 0, hidden: true, hidedlg: true},
//                 {name: "goodsCategoryId", index: "goodsCategoryId", align: "center", width: 0, hidden: true, hidedlg: true},
//                 {name: "goodsBrandId", index: "goodsBrandId", align: "center", width: 0, hidden: true, hidedlg: true},
//                 {name: "goodsColorId", index: "goodsColorId", align: "center", width: 0, hidden: true, hidedlg: true}
//             ],
//             //loadonce: false,
//             sortable: false,
//             viewrecords: true,
//             rownumbers: true,
//             multiselect: true,
//             cellsubmit: 'clientArray',//单元格保存内容的位置
//             editurl: 'clientArray',
//             postData: {
//                 keyWord: $(".mainFilter").val(),
//                 companyId: $(".companySe option:selected").data("id"),
//                 goodsBrandId: null,
//                 goodsClassId: globalId
//             },
//
//             cellEdit: true,
//             width: "100%",
//             height: $(window).height() * 0.5,
//             scroll: true,
//             autowidth: true,
//             prmNames: {
//                 page: "page",    // 表示请求页码的参数名称
//                 rows: "pageSize",    // 表示请求行数的参数名称
//                 sort: null, // 表示用于排序的列名的参数名称
//                 order: null, // 表示采用的排序方式的参数名称
//                 search: null, // 表示是否是搜索请求的参数名称
//                 nd: null, // 表示已经发送请求的次数的参数名称
//                 id: null // 表示当在编辑数据模块中发送数据时，使用的id的名称
//
//             },
//             autoScroll: false,
//             shrinkToFit: false,  //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
// //							footerrow:true,  //设置表格显示表脚
//             userDataOnFooter: true,//设置userData 显示在footer里
//             /*grouping:true,
//             groupingView :
//             { groupField : ['creditDirection'] },*/
//             ondblClickRow: function (id) {
//                 //双击进入编辑
//                 var delid = id;
//
//             },
//             onCellSelect: function (id, index, e) {
//
//             },
//             onSelectRow: function (id) {
//
//
//             },
//
//             beforeSelectRow: function (rowid, e) {
//
//             },
//             afterInsertRow: function (rowid, aData) { //新增一行之后
//
//             },
//             gridComplete: function () {
//
//             },
//             loadComplete: function (data) {
//
//             },
//             loadError: function (xhr, status, error) {
//                 //console.log(status)
//             },
//             beforeEditCell: function (rowid, cellname, v, iRow, iCol) {
//                 lastrow = iRow;
//                 lastcell = iCol;
//             }
//         })
//     }

    function initTopForm() {
        /**
         * 公司内容改变触发事件
         */
        $(".companySe").change(function () {
            // if ($(".companySe option:selected").data("id")) {
            //     var companyId = $(".companySe option:selected").data("id").toString();
            // }
           var userName = $(".filterGoodsName").val().toString();
            var page = $("#input_mainPager>input").val();
            var pageSize = $(".ui-pg-selbox option:selected").val();
            $("#mainGrid").setGridParam( //G,P要大写
                {
                    url: "/manager/priceManage/showList",
                    postData: {
                        keyWord: userName,
                        goodsBrandId: null,
                        // companyId: companyId,
                        goodsClassId: globalId,
                        page: page,
                        pageSize: pageSize
                    }
                }
            ).trigger("reloadGrid");
        })
        // $(".BrandName").change(function () {
        //     var companyId = $(".companySe option:selected").data("id").toString();
        //     var userName =$(".filterGoodsName").val().toString();
        //     var goodsBrandId = $(".BrandName option:selected").data("id").toString();
        //     var page = $("#input_mainPager>input").val();
        //     var pageSize = $(".ui-pg-selbox option:selected").val();
        //     $.request({
        //         url: "/manager/priceManage/showList",
        //         type: "GET",
        //         dataType: "json",
        //         data: {
        //             keyWord: userName,
        //             goodsBrandId: goodsBrandId,
        //             companyId: companyId,
        //             goodsClassId: globalId,
        //             page: page,
        //             pageSize: pageSize
        //         },
        //         success: function (data) {
        //
        //             $("#mainGrid").jqGrid("clearGridData");
        //             for (var i = 0; i < data.data.priceVoList.length; i++) {
        //                 $("#mainGrid").jqGrid('addRowData', i + 1, data.data.priceVoList[i]);
        //             }
        //             $("#modalGrid").jqGrid("clearGridData");
        //             for (var i = 0; i < data.data.priceVoList.length; i++) {
        //                 $("#modalGrid").jqGrid('addRowData', i + 1, data.data.priceVoList[i]);
        //             }
        //         }
        //     })
        // })
        /**
         * 过滤条件关联
         */
        $(".filterGoodsName").change(function () {
            $(".mainFilter").val($(this).val());
        })

        $(".mainFilter").keyup(function () {
            $(".filterGoodsName").val($(this).val());
            // var companyId = null;
            // if ($(".companySe option:selected").data("id")) {
            //     companyId = $(".companySe option:selected").data("id").toString();
            // }
           var userName = $(".filterGoodsName").val().toString();
            var page = $("#input_mainPager>input").val();
            var pageSize = $(".ui-pg-selbox option:selected").val();
            $("#mainGrid").setGridParam( //G,P要大写
                {
                    url: "/manager/priceManage/showList",
                    postData: {
                        keyWord: userName,
                         goodsBrandId: null,
                        // companyId: companyId,
                        goodsClassId: globalId,
                        page: page,
                        pageSize: pageSize
                    }
                }
            ).trigger("reloadGrid");
        })
        /**
         * 保存按钮
         */
        $(document).on("click", ".add", function () {
            firstrow && $("#mainGrid").jqGrid("saveCell", firstrow, firstcell);
            var arr = [];
            // var companyId = $(".companySe option:selected").data("id") * 1;
           var userName = $(".filterGoodsName").val().toString();

            var selRowList =  $('#mainGrid').jqGrid('getGridParam','selarrrow');
            var  selRowLen=selRowList.length
            if(selRowLen==0){
                $.zxsaas_plus.showalert("提示", "请选中商品!")
                return
            }
            for (var i = 0; i < selRowLen; i++) {
                arr.push($("#mainGrid").jqGrid("getRowData", selRowList[i]))
                delete arr[i].specialSectionCountNum;
            }

            var rowNum = $("#mainPager .ui-pg-selbox").val();
            changePrice()
            function changePrice() {
                $.request({
                    url: "/manager/priceManage/changePrice",
                    type: "POST",
                    data: {
                        "valList": JSON.stringify(arr),
                        "keyWord": userName,
                        "goodsClassId": globalId,
                        // "companyId": companyId
                    },
                    dataType: "json",
                    success: function (data) {
                        console.log(data);
                        if (data.data.status) {
                            $("#mainGrid").jqGrid("clearGridData");
                            for (var i = 0; i < data.data.priceVoList.length; i++) {
                                $("#mainGrid").jqGrid('addRowData', i + 1, data.data.priceVoList[i]);
                            }

                            $("#mainGrid").jqGrid("setGridParam", {
                                rowNum: rowNum,
                            }).trigger('reloadGrid');
                            $.zxsaas_plus.showalert("提示", "保存成功！！！")
                        } else {
                            $.zxsaas_plus.showalert("提示", "保存出错！！！")
                        }
                    },
                    error: function () {
                        debugger;
                    }
                })
            }
        })
        /**
         * 条件过滤
         */
        $(document).on('click', '.criteriaFilter', function () {
            // var companyId = $(".companySe option:selected").data("id").toString();
           var userName = $(".filterGoodsName").val().toString();
            // var goodsBrandId = $(".BrandName option:selected").data("id").toString();
            $.request({
                url: "/manager/priceManage/showList",
                type: "GET",
                dataType: "json",
                data: {keyWord: userName, goodsClassId: globalId},
                success: function (data) {

                    $("#mainGrid").jqGrid("clearGridData");
                    for (var i = 0; i < data.data.priceVoList.length; i++) {
                        $("#mainGrid").jqGrid('addRowData', i + 1, data.data.priceVoList[i]);
                    }
                    // $("#modalGrid").jqGrid("clearGridData");
                    // for (var i = 0; i < data.data.priceVoList.length; i++) {
                    //     $("#modalGrid").jqGrid('addRowData', i + 1, data.data.priceVoList[i]);
                    // }
                }
            })
        })
        /**
         * 批量改价
         */
        // $(document).on("click", "#batchChange", function () {
        //     var companyId = $(".companySe option:selected").data("id").toString();
        //    var userName = $(".filterGoodsName").val().toString();
        //
        //     var page = $("#input_mainPager>input").val();
        //     var pageSize = $(".ui-pg-selbox option:selected").val();
        //     /**
        //      * 模态框数据初始化
        //      */
        //     $("#changePriceModal").modal("show");
        //     $.request({
        //         url: "/manager/priceManage/batchChange",
        //         type: "GET",
        //         dataType: "json",
        //         data: {companyId: $(".companySe option:selected").data("id")},
        //         success: function (data) {
        //             $(".BrandName").html("");
        //             var companyList = data.data.tgoodsbrandList;
        //             for (var i = 0, len = companyList.length; i < len; i++) {
        //                 $(".BrandName").append("<option data-id=" + companyList[i].id + " >" + companyList[i].name + "</option>")
        //             }
        //             $(".BrandName").append("<option selected data-id >全部</option>")
        //         }
        //     });
        //     $("#modalGrid").setGridParam( //G,P要大写
        //         {
        //             url: "/manager/priceManage/showList",
        //             postData: {
        //                 keyWord: userName,
        //                 goodsBrandId: null,
        //                 companyId: companyId,
        //                 goodsClassId: globalId,
        //                 page: page,
        //                 pageSize: pageSize
        //             }
        //         }
        //     ).trigger("reloadGrid");
        // })
        /**
         * 退出后请求数据
         */
        $(document).on('click', '.secede', function () {
            changePrice()
            function changePrice() {
                var arr = [];
                var temp = [];
                // var companyId = $(".companySe option:selected").data("id") * 1;
               var userName = $(".filterGoodsName").val().toString();
               // var goodsBrandId = $(".BrandName option:selected").data("id");
                var page = $("#input_mainPager>input").val();
                var pageSize = $(".ui-pg-selbox option:selected").val();
                $("#mainGrid tr").each(function () {
                    this.id && temp.push(this.id);
                })
                for (var i = 0, len = temp.length; i < len; i++) {

                    arr.push($("#mainGrid").jqGrid("getRowData", temp[i]))
                    delete arr[i].specialSectionCountNum;
                }
                $("#mainGrid").setGridParam( //G,P要大写
                    {
                        url: "/manager/priceManage/changePrice",
                        postData: {
                            valList: JSON.stringify(arr),
                            keyWord: userName,
                            //goodsBrandId: goodsBrandId,
                            // companyId: companyId,
                            goodsClassId: globalId,
                            page: page,
                            pageSize: pageSize
                        }
                    }
                ).trigger("reloadGrid");
                $("#changePriceModal").modal("hide");
            }

        })
        $(document).on("click", ".sureChange", function () {
            lastrow && $("#mainGrid").jqGrid("saveCell", lastrow, lastcell)
            var oneIndex = $(".changeOne option:selected").data("flag");
            var twoIndex = $(".changeTwo option:selected").data("flag");
            var operator = $(".operator").val();
            var operatorVal = $(".operatorNum").val();
            operatorPrice(oneIndex, twoIndex, operator, operatorVal)

        })

        //查询参数 ：是否包含禁用状态
        $("#goodsNameStatusCheckbox").change(function(){
            // if ($(".companySe option:selected").data("id")) {
            //     var companyId = $(".companySe option:selected").data("id").toString();
            // }
            var haveDisEnableStatus=$('#goodsNameStatusCheckbox').is(':checked')==true?1:0;
            var userName = $(".filterGoodsName").val().toString();
            var page = $("#input_mainPager>input").val();
            var pageSize = $(".ui-pg-selbox option:selected").val();
            $("#mainGrid").setGridParam( //G,P要大写
                {
                    url: "/manager/priceManage/showList",
                    postData: {
                        keyWord: userName,
                        goodsBrandId: null,
                        haveDisEnableStatus:haveDisEnableStatus,
                        // companyId: companyId,
                        goodsClassId: globalId,
                        page: page,
                        pageSize: pageSize
                    }
                }
            ).trigger("reloadGrid");
        });
        //导出
        $(".del").click(function () {
            if(globalId==null){
                globalId=''
            }

        	 window.location.href= "/manager/priceManage/exportAllPriceGoods?keyword="+$(".mainFilter").val()+"&classId="+globalId;
        })
        //打印
        $(".entry").click(function () {
            var arr = [];
            var temp = [];
            // var companyId = $(".companySe option:selected").data("id") * 1;
           var userName = $(".filterGoodsName").val().toString();
            //var goodsBrandId = $(".BrandName option:selected").data("id");
            var page = $("#input_mainPager>input").val();
            var pageSize = $(".ui-pg-selbox option:selected").val();
            $("#mainGrid tr").each(function () {
                this.id && temp.push(this.id);
            })
            for (var i = 0, len = temp.length; i < len; i++) {

                arr.push($("#mainGrid").jqGrid("getRowData", temp[i]))
                delete arr[i].specialSectionCountNum;
            }
            $.printBills(basePath + '/priceManage/printPriceGoods',{
                keyWord: userName,
               // goodsBrandId: goodsBrandId,
               //  companyId: companyId,
                goodsClassId: globalId,
                page: page,
                pageSize: pageSize
            })
        })
        //显示往来单位价格设置页面
        $(document).on('click', '.priceSet', function () {
            location.href = "/manager/priceManage/showContactsunitSale";
        })
    }

        /**
         * 价格改变
         *
         */
    function operatorPrice(oneIndex, twoIndex, operator, val) {
            if (!$("#mainGrid tr[aria-selected=true]").length) {
                $.zxsaas_plus.showalert("错误", "请选中至少一条数据！！！！")
            }
            switch (operator) {
                case "+":
                    $("#mainGrid tr[aria-selected=true]").each(function () {
                        var temp = $(this).find("td");
                        var num = temp.eq(twoIndex).html().replace(/\,/g, "") * 1 + val * 1;
                        if (num < 0) {
                            $.zxsaas_plus.showalert("错误", "零售价不能小于零，请重新输入")
                            $('.operatorNum').val('');
                            $('.operatorNum').focus();
                        } else {
                            num = num.toFixed(2);
                            temp.eq(oneIndex).html(num);
                        }


                    })
                    break;
                case "-":
                    $("#mainGrid tr[aria-selected=true]").each(function () {
                        var temp = $(this).find("td");
                        var num = temp.eq(twoIndex).html().replace(/\,/g, "") * 1 - val * 1;
                        if (num < 0) {
                            $.zxsaas_plus.showalert("错误", "零售价不能小于零，请重新输入")
                            $('.operatorNum').val('');
                            $('.operatorNum').focus();
                        } else {
                            num = num.toFixed(2);
                            temp.eq(oneIndex).html(num);
                        }

                    })
                    break;
                case "*":
                    $("#mainGrid tr[aria-selected=true]").each(function () {
                        var temp = $(this).find("td");
                        var num = parseInt(temp.eq(twoIndex).html().replace(/\,/g, "") * 1 * val * 1);
                        if (num < 0) {
                            $.zxsaas_plus.showalert("错误", "零售价不能小于零，请重新输入")
                            $('.operatorNum').val('');
                            $('.operatorNum').focus();
                        } else {
                            num = num.toFixed(2);
                            temp.eq(oneIndex).html(num);
                        }

                    })
                    break;
                case "/":
                    $("#mainGrid tr[aria-selected=true]").each(function () {
                        var temp = $(this).find("td");
                        var num = parseInt(temp.eq(twoIndex).html().replace(/\,/g, "") * 1 / (val * 1));
                        if (num < 0) {
                            $.zxsaas_plus.showalert("错误", "零售价不能小于零，请重新输入")
                            $('.operatorNum').val('');
                            $('.operatorNum').focus();
                        } else {
                            num = num.toFixed(2);
                            temp.eq(oneIndex).html(num);
                        }

                    })
                    break;
            }
        }


    // 保存修改
    $('#surebmjSet').click(function(){
        bmkhjData=getbmkhjGridList()
         // 提交表格数据
        $.ajaxPackage({
            contentType: 'application/json',
            url: '/manager/Tgoodsname/saveSectionPrice/'+$('#bmkhjModal').data('goodsPriceId'),
            data:JSON.stringify(bmkhjData),
            success: function (data) {
                if(data.result != 1){
                    $.zxsaas_plus.showalert('error',data.desc||"失败")
                }else{
                    //加载表格内容
                    $("#mainGrid").trigger("reloadGrid");
                    $.zxsaas_plus.showalert("提示", data.desc||'保存成功')
                }

            }
        })
    })

    function getbmkhjGridList() {
        var  bmkhjData=[]
        $('#bmkhjGrid').saveCell(lastrow,lastcell)
        var ids = $('#bmkhjGrid').getDataIDs()

        $.each(ids,function(k,v){
            var info = $('#bmkhjGrid').getRowData(v)
            bmkhjData.push({
                'id':info.id,
                'sectionId':info.dataId,
                'specialPrice':info.bmkhcb
            })
        })
        return bmkhjData
    }
    // 特殊部门考核价表格
    $('#bmkhjGrid').jqGrid({
        url: basePath + "/component/section/getAccessSectionVoPageList",
        mtype: "GET",
        datatype: "json",
        colNames: ['id','dataId', '部门编码', '部门名称', '部门考核成本<span class="pixia"  data-key="bmkhcb" title="批量修改以下所有行">(批下)</span>'],
        colModel: [
            {name: 'id', index: 'id', width: 1, align: 'center', sorttype: "string", hidden: true},
            {name: 'dataId', index: 'dataId', width: 1, align: 'center', sorttype: "string", hidden: true},
            {name: 'code', index: 'code', width: 150, align: 'center', sorttype: "string", sortable: false,editable:false},
            {name: 'name', index: 'name', width: 150, align: 'center', sorttype: 'string', sortable: false,editable:false},
            {name: 'bmkhcb', index: 'bmkhcb', width: 150, align: 'right', sortable: false,editable:true,formatter: 'number',editrules: {number: true},

                editoptions: {
                    onkeyup: "checkInput.checkNum(this,12)",
                    dataEvents: [{
                        type: "focus",
                        fn: function () {
                            $(this)[0].select()
                        }
                    }]
                }},
        ],
        jsonReader  : {
            root: "data.dataList",
            total:"data.total",
            records:"data.records",
            repeatitems: false
        },
        search: true,
        sortable: false,
        rownumbers: true,
        cellsubmit: 'clientArray',//单元格保存内容的位置
        editurl: 'clientArray',
        cellEdit: true,
        rownumWidth: 40, // the width of the row numbers columns
        shrinkToFit: false,
        width:"100%",
        height:$(window).height()*0.5,
        gridComplete: function() {
            $('#bmkhjGrid').resize()
        },
        beforeEditCell:function(rowid,cellname,v,iRow,iCol){
            lastrow = iRow;
            lastcell = iCol;
        },
    })

    //批下
    $('.pixia').on('click', function () {
        var key = $(this).data('key');
        var $grid = $("#bmkhjGrid");
        $grid.jqGrid('saveCell', lastrow, lastcell);
        var selRowId = $grid.jqGrid('getGridParam', 'selrow');
        var currRow = $grid.jqGrid('getRowData', selRowId);
        var ids = $grid.getDataIDs();
        for (var i = ids.indexOf(selRowId) + 1; i < ids.length; i++) {
            $grid.jqGrid('setCell', ids[i], key, Number(currRow[key]).toFixed(2));
        }

    })
    function  treeFun() {
        $.ajax({
            type: 'post',
            url: "/manager/component/section/getAccessSectionTreeNodeVoList",

            dataType: "json",
            success:function(data){
                var nodes = data.data.dataList||[];
                for(var i=0;i<nodes.length;i++){
                    nodes[i].pId=nodes[i].parentId
                }
                var treeObj = $.fn.zTree.init($("#TreeDom"),
                    {data: {simpleData: {enable: true}},
                        view: {
                            showLine: true
                        },
                        callback:{
                            onClick: function(event, treeId, treeNode){

                                loadbmkhjGrid()
                            }
                        }
                    },nodes);
                treeObj.expandAll(true);
            }
        });
    }
    $("#searchStore").bind('input propertychange', function() {
        var _this=$(this)
        loadbmkhjGrid()
        setTimeout(function(){
            _this.focus()
        })
    });
    function loadbmkhjGrid() {
        var queryKey=$.trim($("#searchStore").val()).toUpperCase()
        var typeId=[]
        var treeObj = $.fn.zTree.getZTreeObj("TreeDom");
        var treeNodeList=treeObj.getSelectedNodes().length==0?treeObj.getNodes():treeObj.getSelectedNodes();
        addId(treeNodeList)
        function addId(treeNodeList) {
            for(var j=0;j<treeNodeList.length;j++){
                var treeNode=treeNodeList[j]
                if(treeNode.children){
                    for(var i=0;i<treeNode.children.length;i++){
                        var children=treeNode.children[i]
                        addId([children])
                    }
                }
                typeId.push($.trim(treeNode.id))
            }
        }

        var $grid= $('#bmkhjGrid');
        $grid.jqGrid('saveCell',lastrow,lastcell);
        var ids = $grid.getDataIDs();
        $.each(ids, function (i, keyId) {
            var currRow = $grid.jqGrid('getRowData', keyId);
            if(((currRow.code.toUpperCase()).indexOf(queryKey)>-1 || (currRow.name.toUpperCase()).indexOf(queryKey)>-1) &&
                $.inArray(currRow.dataId,typeId)>-1
            ){
                $("#bmkhjGrid tr").removeClass('active')
                //设置单元格高亮
                var curTr= $("#bmkhjGrid #"+keyId);
                curTr.addClass('active')
                var hegiht=curTr[0].offsetTop;
                $grid.parents(".ui-jqgrid-bdiv").scrollTop(hegiht);
                return false;
            }
        })

    }
})
