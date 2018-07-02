var projectId
$(function () {
    init()
    function init() {
        getCustomProject('供应商保价单据列表')
        initTopForm()
        $.pageListCommon.initRedModal()
        $.pageListCommon.initSetModal()
        $.pageListCommon.initMenuBtn({
            export:function(){
                var options=getSearchParam();
                options.projectId=projectId
                functionObjExtent.construtForm('/manager/inventory/fund/supplier/reprice/export', options)
            },
            draftDel:function(mainIds){
                $.ajaxPackage({
                    url:'/manager/inventory/fund/supplier/reprice/delReprice',
                    data:{mainIds:mainIds},
                    success:function (data) {
                        $.zxsaas_plus.showalert('提示',data.desc || "删除成功");
                        $.pageListCommon.reloadTable()()
                    }
                })
            },
            draftPost:function(mainIds){
                $.ajaxPackage({
                    url:'/manager/inventory/fund/supplier/reprice/excutePost',
                    data:{mainIds:mainIds},
                    success:function (data) {
                        $.zxsaas_plus.showalert('提示',data.desc || "过账成功");
                        $.pageListCommon.reloadTable()()
                    }
                })
            },
            red:function(postData){
                var param={
                    mainIds:postData.id,
                    redDate:postData.redDate
                };
                $.ajaxPackage({
                    url:"/manager/inventory/fund/supplier/reprice/excuteRed",
                    data:param,
                    success:function(data){
                        $.zxsaas_plus.showalert("提示",data.desc || "红冲成功");
                        $.pageListCommon.reloadTable()()
                        $('#redModal').modal('hide');
                    },
                });
            },
            audit:function(mainIds){
                $.ajaxPackage({
                    url:'/manager/inventory/fund/supplier/reprice/updateAuditStatus',
                    data:{mainIds:mainIds,'status':1},
                    success:function (data) {
                        $.zxsaas_plus.showalert('提示',data.desc || "稽核成功");
                        $.pageListCommon.reloadTable()()
                    }
                })
            },
            auditCancle:function(mainIds){
                $.ajaxPackage({
                    url:'/manager/inventory/fund/supplier/reprice/updateAuditStatus',
                    data:{mainIds:mainIds,'status':0},
                    success:function (data) {
                        $.zxsaas_plus.showalert('提示',data.desc || "取消稽核成功");
                        $.pageListCommon.reloadTable()()
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

        //载入 经手人
        $("#managerUname").comModalsEmployee({
            multiselect:true,
            girdParam:{
                empIsOperator:2
            }
        });
        //供应商
        $('#contactsunitName').comModalsContactUnit({
            multiselect: true
        });
        //商品名称
        $('#goodsName').comModalsAllGoods({
            multiselect: true
        });

        //商品品牌
        $('#goodsBranchName').comModalsBrand({
            multiselect: true,

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
            $.pageListCommon.searchDetail(
                getSearchParam(),
                '/manager/inventory/fund/supplier/reprice/getRepricePageList'
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
        var sectionIds =$("#sectionName").data("sectionId")||'';
        var managerIds =$("#managerUname").data("id");
        var goodsIds =$("#goodsName").data("id");
        var goodsTypeIds =$("#goodsTypeName").combotree('getValues').toString();
        var goodsBranchIds =$("#goodsBranchName").data("id");
        var contactsunitIds =$("#contactsunitName").data("id");
        var queryKey =$("#queryKey").val().trim();
        var createByIds =$("#createByName").data("id")
        var billsStatus =$("#billsStatus").val()
        var isAudit =$("#isAudit").val()
        var isContainsRedbills =$("#searchQuery input[name='isContainsRedbills']").is(":checked")?"1":"0";
        return {
            billsBeginDateStr:billsBeginDateStr,
            billsEndDateStr:billsEndDateStr,
            sectionIds:sectionIds, //部门ids
            managerIds:managerIds, //经手人IDs

            goodsIds:goodsIds, //
            goodsTypeIds:goodsTypeIds,//商品类别
            goodsBranchIds:goodsBranchIds,
            contactsunitIds:contactsunitIds, //往来单位
            queryKey:queryKey,
            createByIds:createByIds,
            billsStatus:billsStatus,
            isAudit:isAudit,
            isContainsRedbills:isContainsRedbills
        };
    }
})
