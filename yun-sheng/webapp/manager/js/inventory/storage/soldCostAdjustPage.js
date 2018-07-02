$(function () {
    init()
    function init() {
        initTable()
        initMenuBtn()
        initTopForm()
    }
    //载入菜单组件
    function initMenuBtn(){
        // var MenuToolOption = {
        //     btnGroupLeft: {
        //         add: {
        //             isShow: true,
        //             click: function () {
        //                 window.parent.openWorkBoxByMenutext('已售成本调整单','/manager/inventory/storage/sold/cost/adjustment/main',true);
        //             }
        //         }
        //     }
        // };
        // new componentMenuBtn("#MenuTool", MenuToolOption);

        var GridToolOption = {
            btnGroupLeft: {
                add: {
                    isShow: true,
                    click: function () {
                        window.parent.openWorkBoxByMenutext('已售成本调整单','/manager/inventory/storage/sold/cost/adjustment/main',true);
                    }
                },
                export: {
                    isShow: true,
                    click: function () {
                        var options = getSearchParam();
                        functionObjExtent.construtForm('/manager/inventory/storage/sold/cost/adjustment/exportDetail', options)
                    }
                },
                draftDel: {
                    isShow: true,
                    click: function () {
                        var selRowId = $("#accountGrid").jqGrid('getGridParam','selarrrow');
                        if(selRowId.length<1){
                            $.zxsaas_plus.showalert('提示', "请勾选数据!");
                            return false;
                        }
                        var mainIds=[];
                        for(var i=0;i<selRowId.length;i++){
                            var rowData = $("#accountGrid").jqGrid('getRowData', selRowId[i]);
                            if(rowData.billsStatus !=1 ){
                                $.zxsaas_plus.showalert('提示', "只能删除草稿单!");
                                return false;
                            }
                            mainIds.push(rowData.orderId)
                        }
                        $.zxsaas_plus.showconfirm('提示', "是否删除此草稿单？", function(){
                            $.ajaxPackage({
                                url:'/manager/inventory/storage/sold/cost/adjustment/deleteDraftOrder',
                                data:{billsId:mainIds.toString()},
                                success:function (data) {
                                    $.zxsaas_plus.showalert('提示',data.desc || "删除成功");
                                    selTable()
                                }
                            })
                        });

                    }
                },
                draftPost: {
                    isShow: true,
                    click: function () {
                        var selRowId = $("#accountGrid").jqGrid('getGridParam','selarrrow');
                        if(selRowId.length<1){
                            $.zxsaas_plus.showalert('提示', "请勾选数据!");
                            return false;
                        }

                        var mainIds=[];
                        for(var i=0;i<selRowId.length;i++){
                            var rowData = $("#accountGrid").jqGrid('getRowData', selRowId[i]);
                            if(rowData.billsStatus !=1 ){
                                $.zxsaas_plus.showalert('提示', "只能过账草稿单!");
                                return false;
                            }
                            mainIds.push(rowData.orderId)
                        }
                        $.ajaxPackage({
                            url:'/manager/inventory/storage/sold/cost/adjustment/executePostOrder',
                            data:{billsId:mainIds.toString()},
                            success:function (data) {
                                $.zxsaas_plus.showalert('提示',data.desc || "过账成功");
                                selTable()
                            }
                        })
                    }
                },
               /* red: {
                    isShow: true,
                    click: function () {
                        var selRowId = $("#accountGrid").jqGrid('getGridParam','selarrrow');
                        if(selRowId.length<1){
                            $.zxsaas_plus.showalert('提示', "请勾选数据!");
                            return false;
                        }else if(selRowId.length>1){
                            $.zxsaas_plus.showalert('提示', "只能红冲一条数据!");
                            return false;
                        }else{
                            var mainIds=[];
                            var rowData = $("#accountGrid").jqGrid('getRowData', selRowId[0]);
                            if(!(rowData.billsStatus ==6 && rowData.auditStatus=='0')){
                                $.zxsaas_plus.showalert('提示', "只能对已过账且未稽核单据红冲!");
                                return false;
                            }
                            mainIds.push(rowData.orderId)

                            $('.redSave').data('id',mainIds.toString())
                            codeDate($(rowData.billsCode).data('billscode'));
                            $('#redModal').modal('show');

                            function codeDate(obj){
                                var times = obj.split('-')[0];
                                var reg = /[A-Z]/g;
                                times = times.replace(reg,"");
                                times = times.replace(times.substr(0,4),times.substr(0,4)+'-');
                                times = times.replace(times.substr(0,7),times.substr(0,7)+'-');
                                $('.redTime').datePlu({
                                    endDate:false,
                                    minTime: times,
                                    defaultTime: times
                                })
                            }
                        }
                    }
                },*/
                copy: {
                    isShow: true,
                    click: function () {
                        var selRowId = $("#accountGrid").jqGrid('getGridParam','selarrrow');
                        if(selRowId.length>1){
                            $.zxsaas_plus.showalert('提示', "只能复制一条数据!");
                            return
                        }else if(selRowId.length<1){
                            $.zxsaas_plus.showalert('提示', "请勾选数据!");
                            return false;
                        }
                        var selRowData = $("#accountGrid").jqGrid('getRowData', selRowId);
                        if(!(selRowData.billsStatus !=1 )){
                            $.zxsaas_plus.showalert('提示', "只能复制单据状态为“已过账”的单据!");
                            return false;
                        }

                        var billsId=$.trim(selRowData.orderId)
                        var billsCode=$.trim($(selRowData.billsCode).data('billscode'))
                        window.parent.openWorkBoxByMenutext('已售成本调整单',
                            '/manager/inventory/storage/sold/cost/adjustment/main?billsId='+billsId+'&copyFlag=1'+'&billsCode='+billsCode
                            ,true);
                    }
                },
                audit: {
                    isShow: true,
                    click: function () {
                        var selRowId = $("#accountGrid").jqGrid('getGridParam','selarrrow');
                        if(selRowId.length<1){
                            $.zxsaas_plus.showalert('提示', "请勾选数据!");
                            return false;
                        }
                        var mainIds=[];
                        for(var i=0;i<selRowId.length;i++){
                            var rowData = $("#accountGrid").jqGrid('getRowData', selRowId[i]);
                            if(!(rowData.billsStatus !=1 && rowData.auditStatus==0)){
                                $.zxsaas_plus.showalert('提示', "只能对正式且未稽核单据稽核!");
                                return false;
                            }
                            mainIds.push(rowData.orderId)
                        }
                        $.ajaxPackage({
                            url:'/manager/inventory/storage/sold/cost/adjustment/executeAuditOrder',
                            data:{billsId:mainIds.toString(),'status':1},
                            success:function (data) {
                                $.zxsaas_plus.showalert('提示',data.desc || "稽核成功");
                                selTable()
                            }
                        })
                    }
                },
                auditCancle: {
                    isShow: true,
                    click: function () {
                        var selRowId = $("#accountGrid").jqGrid('getGridParam','selarrrow');
                        if(selRowId.length<1){
                            $.zxsaas_plus.showalert('提示', "请勾选数据!");
                            return false;
                        }
                        var mainIds=[];
                        for(var i=0;i<selRowId.length;i++){
                            var rowData = $("#accountGrid").jqGrid('getRowData', selRowId[i]);
                            if(!(rowData.billsStatus !=1 && rowData.auditStatus==1)){
                                $.zxsaas_plus.showalert('提示', "只能对已稽核单据取消稽核!");
                                return false;
                            }
                            mainIds.push(rowData.orderId)
                        }
                        $.ajaxPackage({
                            url:'/manager/inventory/storage/sold/cost/adjustment/executeAuditOrder',
                            data:{billsId:mainIds.toString(),'status':0},
                            success:function (data) {
                                $.zxsaas_plus.showalert('提示',data.desc || "取消稽核成功");
                                selTable()
                            }
                        })
                    }
                }
            }
        }
        new componentMenuBtn("#GridTool", GridToolOption);

        //保存红冲按钮
        $(".redSave").on("click",function(){
            var param={
                billsId:$(this).data('id'),
                redDateStr:$(".redTime").val()
            };
            $.request({
                url:'/manager/inventory/storage/sold/cost/adjustment/executeRedOrder',
                type : 'POST',
                dataType: "json",
                data:param,
                success:function(data){
                    if(data.result==1){
                        $.zxsaas_plus.showalert("提示",data.desc || "红冲成功");
                        selTable()
                        $('#redModal').modal('hide');
                    }else{
                        $.zxsaas_plus.showalert("提示",data.desc);
                        $('#redModal').modal('show');
                    }

                }
            });
        });
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

        //载入 经手人
        $("#managerUname").comModalsEmployee({
            multiselect:true,
            girdParam:{
                empIsOperator:2
            }
        });
        //商品名称
        $('#goodsName').comModalsAllGoods({
            multiselect: true
        });
        //调整成本种类
        $("#adjustmentType").combotree('loadData', [{
            id: 2,
            text: '公司成本',
            },{
            id: 3,
            text: '部门考核',
            },{
            id: 4,
            text: '公司成本+部门考核',
            }
        ]);

        //调整原因
        InterfaceInventory.common.getCostAdjustmentReasonVoList({
            success:function(data){
                var res=data.data.reasonVoList;
                var arr=[];
                $.each(res,function(i,val){
                    arr.push({
                        id: val.reasonId,
                        text: val.name,
                    })
                })
                $('#reasonId').combotree('loadData',arr)
            }
        })

        //载入 制单人
        $("#createByName").comModalsEmployee({
            multiselect: true,
            girdParam:{
                empIsOperator:1  //制单人
            }
        });
        //单据状态
        $('#billsStatus').change(function () {
            var $this=$(this)
            //草稿单
            if($this.val()=='1'){
                $('#isContainsRedbills').prop({'checked':false,'disabled':true})
            }else{
                $('#isContainsRedbills').prop({'disabled':false})
            }
        })

        //查询
        $('#searchQuery .search').click(function () {
            selTable()
        })
        //重置
        $('#searchQuery .reset').click(function () {
            $("#searchQuery")[0].reset();
            $("#searchQuery input").data({'id':'','sectionId':''})
            $("#goodsTypeName").combotree("clear")
            $("#reasonId").combotree("clear")
            $("#adjustmentType").combotree("clear")
            $('#startDate').datePlu({
                dateEnd: '#endDate'
            })
        })
    }
    function selTable() {
        $('#accountGrid').jqGrid('setGridParam', {
            datatype:'json',
            url:"/manager/inventory/storage/sold/cost/adjustment/searchOrderPageList",
            postData:getSearchParam()

        }).trigger("reloadGrid");
    }
    // 初始化表格
    function initTable() {
        $('#accountGrid').jqGrid({
            mtype:"POST",
            datatype : "local",
            jsonReader  : {
                root: "data.dataList",
                total:"data.total",
                records:"data.records",
                repeatitems: false
            },
            styleUI: 'Bootstrap',
            shrinkToFit: false,
            viewrecords: true,
            width:"100%",
            autowidth:true,
            multiselect : true,	//复选框属性
            multiboxonly : true,
            cellEdit: true,
            rownumbers:true,	//显示行号
            height: $(window).height()*0.4,

            rowNum: 100,
            rowList: [100, 200, 500],
            pager:'#accountGridPager',
            colNames: ['稽核','单据日期', '单据编号', '部门名称','调整原因','调整成本种类',
               '公司成本调整总差额','部门考核调整总差额', '经手人', '单据备注', '制单人', '制单时间', "过账人","过账时间","红冲人","红冲时间",
                '单据id', '部门名称id','调整原因id','调整成本种类id', '经办人id', '制单人id', '过账人id', '红冲人id', '订单状态'
            ],
            colModel: [
                {name: 'auditStatus', width: 100, align: 'center',formatter:'select',editoptions:{value:"0:;1:√"}},
                {name: 'billsDateStr', width: 150, align: 'center'},
                {name: 'billsCode', width: 250, align: 'center',classes:"billsCodecss",
                    formatter: cLink
                },
                {name: 'sectionName', width: 150, align: 'center'},
                {name: 'reasonName', width: 150, align: 'center'},
                {name: 'adjustmentTypeName', width: 200, align: 'center'},
                {name: 'totalCompanyCostAmountBalance',formatter: 'number', width: 180, align: 'right'},
                {name: 'totalSectionCostAmountBalance',formatter: 'number', width: 180, align: 'right'},
                {name: 'managerName', width: 150, align: 'center'},
                {name: 'remark', width: 150, align: 'center'},
                {name: 'createByName', width: 150, align: 'center'},
                {name: 'createDateStr', width: 150, align: 'center'},
                {name: 'postByName', width: 150, align: 'center'},
                {name: 'postDateStr', width: 150, align: 'center'},
                {name: 'redByName', width: 150, align: 'center'},
                {name: 'redDateStr', width: 150, align: 'center'},
                {name: 'orderId',hidden: true},
                {name: 'sectionId',hidden: true},
                {name: 'reasonId',hidden: true},
                {name: 'adjustmentType',hidden: true},
                {name: 'managerId',hidden: true},
                {name: 'createById',hidden: true},
                {name: 'postById',hidden: true},
                {name: 'redById',hidden: true},
                {name: 'billsStatus',hidden: true},

            ],
            footerrow:true, //显示底部菜单
            beforeSelectRow: function(rowid,e){
            },
            onSelectAll:function(aRowids,status){
            },
            gridComplete: function() {
            },
            loadComplete:function(data){
                if(data.data!=undefined){
                    var ids = $('#accountGrid').getDataIDs();
                    $.each(ids,function(i,keyId){
                        var row = $('#accountGrid').getRowData(keyId);
                        var curTr= $("#accountGrid #"+keyId);
                        if(row.billsStatus == 7){
                            curTr.css("color","red");
                        }else{
                            curTr.css("color","");
                        }
                        if(row.adjustmentType == 2){
                            $('#accountGrid').jqGrid("setCell",keyId,"totalSectionCostAmountBalance",'-');
                        }else if(row.adjustmentType == 3){
                            $('#accountGrid').jqGrid("setCell",keyId,"totalCompanyCostAmountBalance",'-');
                        }

                    })
                    $('.footrow td:first-child').html('合计');
                    $(".ui-jqgrid-sdiv").show();
                    var footerData = data.data.totalVo;
                    $(this).footerData("set", footerData, false);
                    function fmoney(s, n) {
                        n = n > 0 && n <= 20 ? n : 2;
                        s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
                        var l = s.split(".")[0].split("").reverse(),
                            r = s.split(".")[1],
                            t = "";
                        for(var i = 0; i < l.length; i ++ )
                        {
                            t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
                        }
                        return t.split("").reverse().join("") + "." + r;
                    }
                    var totalCompanyCostAmountBalance = $('#accountGrid').getCol('totalCompanyCostAmountBalance', false, 'sum');
                    var totalSectionCostAmountBalance = $('#accountGrid').getCol('totalSectionCostAmountBalance', false, 'sum');

                    $('#accountGrid').footerData("set", {

                        "totalCompanyCostAmountBalance": '<font >' + fmoney(totalCompanyCostAmountBalance, 2) + '</font>',
                        "totalSectionCostAmountBalance": '<font >' + fmoney(totalSectionCostAmountBalance, 2) + '</font>',
                    }, false);

                }
            }
        });
        function cLink(cellvalue, options, rowObject){
            var links
            if(rowObject.billsStatus==1){
                links="<lable data-billsId='"+rowObject.orderId+"' data-billsCode='"+$.trim(rowObject.billsCode)+"'onclick='showHistoryDetail(this)'>草稿单-点我编辑</lable>";
            }else{
                links="<lable data-billsId='"+rowObject.orderId+"'  data-billsCode='"+$.trim(rowObject.billsCode)+"' onclick='showHistoryDetail(this)'>"+cellvalue+"</lable>";
            }
            return  links
        }
    }
    //获取查询参数
    function getSearchParam(){
        var billsBeginDateStr =$("#searchQuery input[name='billsBeginDateStr']").val();
        var billsEndDateStr =$("#searchQuery input[name='billsEndDateStr']").val();
        var sectionIds =$("#sectionName").data("sectionId")||'';
        var managerIds =$("#managerUname").data("id");
        var goodsIds =$("#goodsName").data("id");
        var goodsTypeIds =$("#goodsTypeName").combotree('getValues').toString();
        var adjustmentTypes =$("#adjustmentType").combotree('getValues').toString();

        var reasonId =$("#reasonId").combotree('getValues').toString();


        var queryKey =$("#queryKey").val().trim();
        var createByIds =$("#createByName").data("id")
        var billsStatus =$("#billsStatus").val()
        var auditStatus =$("#auditStatus").val()
        var isContainsRedbills =$("#searchQuery input[name='isContainsRedbills']").is(":checked")?"1":"0";
        return {
            startTime:billsBeginDateStr,
            endTime:billsEndDateStr,
            sectionIds:sectionIds, //部门ids
            managerId:managerIds, //经手人IDs
            goodsId:goodsIds, //
            reasonId:reasonId,
            queryKey:queryKey,
            goodsCategoryIds:goodsTypeIds,//商品类别
            adjustmentType:adjustmentTypes,//商品类别
            createByIds:createByIds,
            containsRed:isContainsRedbills,

            billsStatus:billsStatus,
            auditStatus:auditStatus,

        };
    }
})
//jsp 业务 调用
//展示详情
function showHistoryDetail(obj){
    var billsId = $.trim($(obj).attr("data-billsId"));
    var billsCode = $.trim($(obj).attr("data-billsCode"));
    window.parent.openWorkBoxByMenutext('已售成本调整单',
        '/manager/inventory/storage/sold/cost/adjustment/main?billsId='+billsId+'&billsCode='+billsCode
        ,true);
}
