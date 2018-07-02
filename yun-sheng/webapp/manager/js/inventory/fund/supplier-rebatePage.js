
var projectId

$(function () {
    var billsType=32;   //单据类型 79:资金调整单 ,49:预收退款单,48:预付退款单,18:付款单 ,19:收款单,20:预付款单,21:预收款单,32:供应商返利单,33:客户保价单,34:客户返利单
    var tableUrl='/manager/inventory/fund/getFundPageList'
    init()
    function init() {
        getCustomProject('供应商返利单-单据列表')
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
                    url:'/manager/IcashMain/executePostSupplierRebateBills',
                    data:{billsId:mainIds,billsType:billsType},
                    success:function (data) {
                        $.zxsaas_plus.showalert('success',"过账成功");
                        $.pageListCommon.reloadTable()
                    }
                })
            },
            red:function(postData){
                var param={
                    id:postData.id,
                    invalidDate:postData.redDate,
                    type:billsType
                };
                $.ajaxPackage({

                    url:"/manager/IcashMain/saveRedDashed/khfl_red",
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

        //往来单位
        $('#contactsunitName').comModalsContactUnit({
            multiselect: true
        });

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
        var contactsunitIds =$("#contactsunitName").data("id");
        var queryKey =$("#queryKey").val().trim();
        var createByIds =$("#createByName").data("id")
        var billsStatus =$("#billsStatus").val()
        var rebateType=$("#rebateTypeSelect").val()
        var auditStatus =$("#isAudit").val()
        var containsRed =$("#searchQuery input[name='isContainsRedbills']").is(":checked")?"1":"0";
        return {
            startTime:billsBeginDateStr,
            endTime:billsEndDateStr,
            sectionId:sectionId, //部门ids
            managerId:managerId, //经手人IDs
            contactUnitId:contactsunitIds, //往来单位
            queryKey:queryKey,  //搜索关键字
            createById:createByIds,//制单人
            rebateType:rebateType,//返利类型
            billsStatus:billsStatus,//单据状态
            auditStatus:auditStatus,//稽核状态
            containsRed:containsRed,//是否包含红冲
            billsType:billsType
        };
    }
})

