var projectId

$(function () {

    var tableUrl='/manager/jxc/storage/allocate/documentList/getHistoricaDocPageList';
    init()
    function init() {
        getCustomProject('商品移库单-单据列表')
        initTopForm()
        $.pageListCommon.initRedModal()
        $.pageListCommon.initSetModal()
        $.pageListCommon.initMenuBtn({
            export:function(){
                var options=getSearchParam();
                options.rpMainId=projectId
                functionObjExtent.construtForm('/manager/jxc/storage/allocate/documentList/exportDetail/spyk_dc', options)
            },
            draftDel:function(mainIds){
                $.ajaxPackage({
                    url:'/manager/inventory/storage/products/move/deleteDraftOrder',
                    data:{ids:mainIds},
                    success:function (data) {
                        $.zxsaas_plus.showalert('success',data.desc || "删除成功");
                        $.pageListCommon.reloadTable()
                    }
                })
            },
            draftPost:function(mainIds){
                $.ajaxPackage({
                    url:'/manager/inventory/storage/products/move/executeDraftOrder',
                    data:{id:mainIds,isDraft:1},
                    success:function (data) {
                        $.zxsaas_plus.showalert('success',"过账成功");
                        $.pageListCommon.reloadTable()
                    }
                })
            },
            // red:function(postData){
            //     var param={i
            //         pi_bills_id:postData.id,
            //         pi_invalid_date:postData.redDate,
            //         pi_bus_opr: "2",
            //         type:billsType
            //     };
            //     $.ajaxPackage({
            //         url:"/manager/inventory/storage/samePrice/transfer/redOfficialOrder",
            //         data:param,
            //         success:function(data){
            //             $.zxsaas_plus.showalert('success',data.desc || "红冲成功");
            //             $.pageListCommon.reloadTable()
            //             $('#redModal').modal('hide');
            //         },
            //     });
            // },
            audit:function(mainIds){
                $.ajaxPackage({
                    url:'/manager/jxc/storage/allocate/documentList/updateIsAudit',
                    data:{billsId:mainIds,'auditStatus':1},
                    success:function (data) {
                        $.zxsaas_plus.showalert('success',data.desc || "稽核成功");
                        $.pageListCommon.reloadTable()
                    }
                })
            },
            auditCancle:function(mainIds){
                $.ajaxPackage({
                    url:'/manager/jxc/storage/allocate/documentList/updateIsAudit',
                    data:{billsId:mainIds,'auditStatus':0},
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

        $('#outStorage,#inStorage').comModalsStorage({
            multiselect:true,
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
        var moveInStorageId =$("#inStorage").data("id");
        var moveOutStorageId =$("#outStorage").data("id")||'';
        var managerId =$("#managerUname").data("id");
        var goodsIds =$("#goodsName").data("id");
        var goodsTypeIds =$("#goodsTypeName").combotree('getValues').toString();
        var goodsBranchId =$("#goodsBranchName").data("id");
        var queryKey =$("#queryKey").val().trim();
        var createByIds =$("#createByName").data("id")
        var billsStatus =$("#billsStatus").val()
        var auditStatus =$("#auditStatus").val()
        var containsRed =$("#searchQuery input[name='isContainsRedbills']").is(":checked")?"1":"0";
        return {
            startTime:billsBeginDateStr,
            endTime:billsEndDateStr,
            sectionId:sectionId, //部门ids
            moveOutStorageId:moveOutStorageId, //调出仓库
            moveInStorageId:moveInStorageId,//调入仓库
            managerId:managerId, //经手人IDs
            goodsId:goodsIds, //商品名称
            goodsCategoryId:goodsTypeIds,//商品类别
            goodsBrandId:goodsBranchId,//商品品牌
            queryKey:queryKey,  //搜索关键字
            createById:createByIds,//制单人
            billsStatus:billsStatus,//单据状态
            auditStatus:auditStatus,//稽核状态
            containsRed:containsRed,//是否包含红冲
            tableSuffixName:'SPYKD'
        };
    }
})

