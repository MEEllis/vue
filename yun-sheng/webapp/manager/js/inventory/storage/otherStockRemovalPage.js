var projectId

$(function () {

    var tableUrl='/manager/jxc/storage/allocate/documentList/getHistoricaDocPageList';
    init()
    function init() {
        getCustomProject('其他出库单-单据列表')
        initTopForm()
        $.pageListCommon.initRedModal()
        $.pageListCommon.initSetModal()
        $.pageListCommon.initMenuBtn({
            export:function(){
                var options=getSearchParam();
                options.rpMainId=projectId
                functionObjExtent.construtForm('/manager/jxc/storage/allocate/documentList/exportDetail/qtck_dc', options)
            },
            draftDel:function(mainIds){
                $.ajaxPackage({
                    url:'/manager/inventory/storage/stock/other/removal/deleteDraftOrder',
                    data:{ids:mainIds},
                    success:function (data) {
                        $.zxsaas_plus.showalert('success',data.desc || "删除成功");
                        $.pageListCommon.reloadTable()
                    }
                })
            },

            draftPost:function(mainIds){
                $.ajaxPackage({
                    url:'/manager/inventory/storage/stock/other/removal/executeDraftOrder',
                    data:{id:mainIds,isDraft:1},
                    success:function (data) {
                        $.zxsaas_plus.showalert('success',"过账成功");
                        $.pageListCommon.reloadTable()
                    }
                })
            },
            red:function(postData){
                var param={
                    id:postData.id,
                    redDateStr:postData.redDate
                };
                $.ajaxPackage({
                    url:"/manager/inventory/storage/stock/other/removal/redOfficialOrder",
                    data:param,
                    success:function(data){
                        $.zxsaas_plus.showalert('success',"红冲成功");
                        $.pageListCommon.reloadTable();
                        $('#redModal').modal('hide');
                    },
                });
            },
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
        //入库方式

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
        //出库方式
        InterfaceInventory.common.getOtherOutInStorageClassVoList({
            data:{type:1},
            success:function(data){
                var res=data.data.classVoList;
                var arr=[];
                $.each(res,function(i,val){
                    arr.push({
                        id: val.classId,
                        text: val.name,
                    })
                })
                $('#otherStorageId').combotree('loadData',arr)
            }
        });
        //往来单位
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
        var goodsIds =$("#goodsName").data("id");
        var otherStorageClassId =$("#otherStorageId").combotree('getValues').toString();
        var goodsTypeIds =$("#goodsTypeName").combotree('getValues').toString();
        var goodsBranchId =$("#goodsBranchName").data("id");
        var contactsunitIds =$("#contactsunitName").data("id");
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
            otherStorageClassId:otherStorageClassId,//出库方式
            goodsId:goodsIds, //商品名称
            goodsCategoryId:goodsTypeIds,//商品类别
            goodsBrandId:goodsBranchId,//商品品牌
            contactUnitId:contactsunitIds, //往来单位
            queryKey:queryKey,  //搜索关键字
            createById:createByIds,//制单人
            billsStatus:billsStatus,//单据状态
            auditStatus:auditStatus,//稽核状态
            containsRed:containsRed,//是否包含红冲
            tableSuffixName:'QTCKD'
        };
    }
})

