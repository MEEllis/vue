
var projectId

$(function () {
    var billsType=79   //单据类型 79:资金调整单 ,49:预收退款单,48:预付退款单,18:付款单 ,19:收款单,20:预付款单,21:预收款单,32:供应商返利单,33:客户保价单,34:客户返利单
    var tableUrl='/manager/inventory/fund/getFundPageList'
    init()
    function init() {
        getCustomProject('资金调整单-单据列表')
        initTopForm()
        $.pageListCommon.initRedModal()
        $.pageListCommon.initSetModal()
        $.pageListCommon.initMenuBtn({
            export:function(){
                var options=getSearchParam();
                options.projectId=projectId
                functionObjExtent.construtForm('/manager/inventory/fund/export', options)
            },
            draftDel:function(mainIds){

                $.ajaxPackage({
                    url:'/manager/inventory/fund/deleteBills',
                    data:{billsId:mainIds,billsType:billsType},
                    success:function (data) {
                        $.zxsaas_plus.showalert('success',data.desc || "删除成功");
                        $.pageListCommon.reloadTable()
                    }
                })
            },
            draftPost:function(mainIds){
                $.ajaxPackage({
                    url:'/manager/inventory/fund/adjust/excutePost',
                    data:{billsId:mainIds},
                    success:function (data) {
                        $.zxsaas_plus.showalert('success',"过账成功");
                        $.pageListCommon.reloadTable()
                    }
                })
            },
            red:function(postData){
                var param={
                    billsId:postData.id,
                    redDate:postData.redDate
                };
                $.ajaxPackage({
                    url:"/manager/inventory/fund/adjust/excuteRed",
                    data:param,
                    success:function(data){
                        $.zxsaas_plus.showalert('success', "红冲成功");
                        $.pageListCommon.reloadTable()
                        $('#redModal').modal('hide');
                    },
                });
            },
            audit:function(mainIds){
                $.ajaxPackage({
                    url:'/manager/inventory/fund/updateAuditStatus',
                    data:{billsType:billsType,billsId:mainIds,'auditStatus':1},
                    success:function (data) {
                        $.zxsaas_plus.showalert('success',data.desc || "稽核成功");
                        $.pageListCommon.reloadTable()
                    }
                })
            },
            auditCancle:function(mainIds){
                $.ajaxPackage({
                    url:'/manager/inventory/fund/updateAuditStatus',
                    data:{billsType:billsType,billsId:mainIds,'auditStatus':0},
                    success:function (data) {
                        $.zxsaas_plus.showalert('success',data.desc || "取消稽核成功");
                        $.pageListCommon.reloadTable()
                    }
                })
            }
        })
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

        $("#adjustType").on("change", //载入类别
            function loadInPayClass(callback){
                var adjustType = $("#adjustType").val();
                //资金增加
                if (adjustType == "ZJZJ") {
                    adjustTypeflag = 0;
                    initAccountName(callback);
                    $("#inpayClassIdWrap").find("label").html("收入类别:");
                }
                //资金减少
                else if (adjustType == "ZJJS") {
                    adjustTypeflag = 1;
                    initAccountName(callback);
                    $("#inpayClassIdWrap").find("label").html("支出类别:");
                } else {
                    $("#inpayClassId").html("<option value=''>请选择调整类型</option>");
                }
            }
        );
        //载入 经手人
        $("#managerUname").comModalsEmployee({
            multiselect:true,
            girdParam:{
                empIsOperator:2
            }
        });

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
            $.pageListCommon.searchDetail(
                getSearchParam(),
                tableUrl
            )
        })
        //重置
        $('#searchQuery .reset').click(function () {
            $.pageListCommon.resetFun()
        })
    }
    //获取查询参数
    function getSearchParam(){
        var billsBeginDateStr =$("#searchQuery input[name='billsBeginDateStr']").val();
        var billsEndDateStr =$("#searchQuery input[name='billsEndDateStr']").val();
        var sectionId =$("#sectionName").data("sectionId")||'';
        var managerId =$("#managerUname").data("id");
        var adjustType = $("#adjustType").val();
        var inpayClassId = $("#inpayClassId").val()
        var queryKey =$("#queryKey").val().trim();
        var createByIds =$("#createByName").data("id")
        var billsStatus =$("#billsStatus").val()
        var auditStatus =$("#isAudit").val()
        var containsRed =$("#searchQuery input[name='isContainsRedbills']").is(":checked")?"1":"0";
        return {
            startTime:billsBeginDateStr,
            endTime:billsEndDateStr,
            sectionId:sectionId, //部门ids
            managerId:managerId, //经手人IDs
            adjustType:adjustType,
            inpayClassId:inpayClassId,
            queryKey:queryKey,  //搜索关键字
            createById:createByIds,//制单人
            billsStatus:billsStatus,//单据状态
            auditStatus:auditStatus,//稽核状态
            containsRed:containsRed,//是否包含红冲
            billsType:billsType
        };
    }
})

//进来新增页面，初始化操作员所在部门的资金账户
function initAccountName(callback) {
    $.request({
        url: "/manager/inventory/retail/reconciliation/accountRecon/getInpayClass",
        type: 'POST',
        dataType: "json",
        data: {flag: adjustTypeflag},
        success: function (data) {
            if (data.result == 1) {
                appendInPayClass(data.data.inpayList);

            } else {
                $.zxsaas_plus.showalert("提示", data.desc);
            }
        }
    });
}

//拼接收付款类别
function appendInPayClass(payClassList) {
    $("#inpayClassIdWrap").show();
    $("#inpayClassId").html("");
    if (payClassList.length > 0) {
        $("#inpayClassId").append("<option value=''>请选择</option>");
        for (var i = 0; i < payClassList.length; i++) {
            if(payClassList[i].name !='商品销售收入' && payClassList[i].name !='商品销售成本'){
                $("#inpayClassId").append("<option value='" + payClassList[i].id + "'>" + payClassList[i].name + "</option>");
            }
        }
    }
}