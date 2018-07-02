var projectId

$(function () {

    var tableUrl='/manager/jxc/storage/allocate/documentList/getHistoricaDocPageList';
    init()
    function init() {
        getCustomProject('同价调拨发货单单据列表')
        initTopForm()
        $.pageListCommon.initRedModal()
        $.pageListCommon.initSetModal()
        $.pageListCommon.initMenuBtn({
            export:function(){
                var options=getSearchParam();
                options.rpMainId=projectId
                functionObjExtent.construtForm('/manager/jxc/storage/allocate/documentList/exportDetail/tjdb_dc', options)
            },
            draftDel:function(mainIds){
                $.ajaxPackage({
                    url:'/manager/inventory/storage/samePrice/transfer/deleteDraftOrder',
                    data:{ids:mainIds},
                    success:function (data) {
                        $.zxsaas_plus.showalert('success',data.desc || "删除成功");
                        $.pageListCommon.reloadTable()
                    }
                })
            },
            shipments:function(mainIds){
                $.ajaxPackage({
                    url:'/manager/inventory/storage/samePrice/transfer/executeDraftOrder',
                    data:{id:mainIds,isDraft:1},
                    success:function (data) {
                        $.zxsaas_plus.showalert('success', "发货成功");
                        $.pageListCommon.reloadTable()
                    }
                })
            },
            redValidation:function(){
                //todo  红冲的验证
                var selRowId = $("#rpGrid").jqGrid('getGridParam','selarrrow');
                if(selRowId.length<1){
                    $.zxsaas_plus.showalert('提示', "请勾选数据!");
                    return false;
                }else if(selRowId.length>1){
                    $.zxsaas_plus.showalert('提示', "只能红冲一条数据!");
                    return false;
                }else{
                    var mainIds=[];
                    var rowData = $("#rpGrid").jqGrid('getRowData', selRowId);
                    if(!((rowData.billsStatus ==8&& rowData.auditStatus=='0')||(rowData.billsStatus ==10&& rowData.auditStatus=='0'))){
                        $.zxsaas_plus.showalert('提示', "只能对已发货、已接收且未稽核单据红冲!");
                        return false;
                    }
					var defaultTime=rowData.billsDateStr
					//发货状态，红冲日期不可选
					if(rowData.billsStatus ==8){
						$('.redTime').prop('disabled',true)
					}else{
						if(rowData.billsStatus ==10){
							defaultTime=rowData.receiveDateStr
						}
						$('.redTime').prop('disabled',false)
					}

                    mainIds.push(rowData.billsId)
                    $('#redModal').modal('show');
                    $('.redSave').data('billsId',mainIds.toString())
                    getAuthList(function () {
						var current_date = _authList.minDate;
						var min = CompareDate(current_date, defaultTime) ? current_date : defaultTime;
						$('.redTime').datePlu({
							endDate: false,
							ifPermissions: false,
							minTime: min,
							defaultTime: min
						})
					})
                }
            },
            red:function(postData){
                var param={
                        id:postData.id,
                        redDateStr:postData.redDate
                };
                $.ajaxPackage({
                    url:"/manager/inventory/storage/samePrice/transfer/redOfficialOrder",
                    data:param,
                    success:function(data){
                        $.zxsaas_plus.showalert('success',"红冲成功");
                        $.pageListCommon.reloadTable()
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
        },{red:true})
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

        //调出部门
        $("#outDepartmentName").storePlu({
            isStoreShow:false,
            isLoadDefaultName:0,
            checkMore: false,
            search: false,
            ifStore: false, // 控制部门选项
            changeStore:function(){
                var $obj=$("#outDepartmentName");
                $obj.data('id',$obj.data('sectionId'))
                $('#managersName').val('').removeData()
                $("#grid").jqGrid("clearGridData");
            }
        });
        //调入部门
        $("#inDepartmentName").comModalsSection();

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
        var moveInSectionId =$("#inDepartmentName").data("id");
        var moveOutSectionId =$("#outDepartmentName").data("id")||'';
        var managerId =$("#managerUname").data("id");
        var goodsIds =$("#goodsName").data("id");
        var goodsTypeIds =$("#goodsTypeName").combotree('getValues').toString();
        var goodsBranchId =$("#goodsBranchName").data("id");
       // var billsType=$("#billsType").val();
        var queryKey =$("#queryKey").val().trim();
        var createByIds =$("#createByName").data("id")
        var billsStatus =$("#billsStatus").val()
        var auditStatus =$("#auditStatus").val()
        var containsRed =$("#searchQuery input[name='isContainsRedbills']").is(":checked")?"1":"0";
        return {
            startTime:billsBeginDateStr,
            endTime:billsEndDateStr,
            moveOutSectionId:moveOutSectionId, //调出部门
            moveInSectionId:moveInSectionId,//调入部门
            managerId:managerId, //经手人IDs
            goodsId:goodsIds, //商品名称
            goodsCategoryId:goodsTypeIds,//商品类别
            goodsBrandId:goodsBranchId,//商品品牌
            //billsType:billsType,//同价调拨发货单、变价调拨发货单
            queryKey:queryKey,  //搜索关键字
            createById:createByIds,//制单人
            billsStatus:billsStatus,//单据状态
            auditStatus:auditStatus,//稽核状态
            containsRed:containsRed,//是否包含红冲
            tableSuffixName:'DBCKD',
            billsType:'7'
        };
    }
})

