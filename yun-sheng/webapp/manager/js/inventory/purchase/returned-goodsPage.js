var projectId
$(function () {
    var billsType=4   //单据类型 1:采购订单 2:采购入库单 3:采购换货单 4:采购退货单
    var tableUrl='/manager/inventory/purchase/getPurchasePageList'
    init()
    function init() {
        getCustomProject('采购退货单-单据列表')
        initTopForm()
        $.pageListCommon.initRedModal()
        $.pageListCommon.initSetModal()
        $.pageListCommon.initMenuBtn({
            export:function(){
                var options=getSearchParam();
                options.projectId=projectId
                functionObjExtent.construtForm('/manager/inventory/purchase/export', options)
            },
            draftDel:function(mainIds){
                $.ajaxPackage({
                    url:'/manager/IbillsMain/delCgBills/cgth_delete',
                    data:{id:mainIds},
                    success:function (data) {
                        $.zxsaas_plus.showalert('success', "删除成功");
                        $.pageListCommon.reloadTable()
                    }
                })
            },
            draftPost:function(mainIds){
				$.ajaxPackage({
					url: '/manager/inventory/purchase/validatePurchaseRefundPost',
					data: {billsId: mainIds},
					success: function (data) {
						if (data.result == 1) {
							switch (data.data.validateResult ) {
                                case 'Error':
                                    $.zxsaas_plus.showalert("操作提示", data.data.message);
                                    break;
                                case 'Confirm':
                                    $.zxsaas_plus.showconfirm("操作提示", data.data.message, function () {
                                        todo()
                                    }, function () {
                                    });
                                    break;
                                case 'Success':
								    todo();
                                    break;
							}
						}
					}
				})
                function todo(){
					$.ajaxPackage({
						url:'/manager/IbillsMain/saveCheckOrder/cgth_gz',
						data:{id:mainIds},
						success:function (data) {
							$.zxsaas_plus.showalert('success', "过账成功");
							$.pageListCommon.reloadTable()
						}
					})
                }
            },
            red:function(postData){
                var param={
                    id:postData.id,
                    invalidDate:postData.redDate
                };
                $.ajaxPackage({
                    url:"/manager/IbillsMain/saveForceFinishOrder/cgth_red",
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
                    url:'/manager/inventory/purchase/updateAuditStatus',
                    data:{billsType:billsType,billsId:mainIds,'auditStatus':1},
                    success:function (data) {
                        $.zxsaas_plus.showalert('success', "稽核成功");
                        $.pageListCommon.reloadTable()
                    }
                })
            },
            auditCancle:function(mainIds){
                $.ajaxPackage({
                    url:'/manager/inventory/purchase/updateAuditStatus',
                    data:{billsType:billsType,billsId:mainIds,'auditStatus':0},
                    success:function (data) {
                        $.zxsaas_plus.showalert('success', "取消稽核成功");
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

        //载入 经手人
        $("#managerUname").comModalsEmployee({
            multiselect:true,
            girdParam:{
                empIsOperator:2
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
            $.pageListCommon.searchDetail(getSearchParam(), tableUrl)
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
            billsType:billsType,
            goodsId:goodsIds, //商品名称
            goodsCategoryId:goodsTypeIds,//商品类别
            goodsBranchId:goodsBranchId,//商品品牌
            contactUnitId:contactsunitIds, //往来单位
            queryKey:queryKey,  //搜索关键字
            createById:createByIds,//制单人
            billsStatus:billsStatus,//单据状态
            auditStatus:auditStatus,//稽核状态
            containsRed:containsRed//是否包含红冲
        };
    }
})

