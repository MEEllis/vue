var projectId,tabID = 1

$(function () {

	var tableUrl='/manager/inventory/storage/needGoods/getNeedGoodsPageList';
	init()
	function init() {
		getCustomProject('要货单-单据列表');
		initTopForm()
		$.pageListCommon.initSetModal()
		$.pageListCommon.initMenuBtn({
			export:function(){
				var options=getSearchParam();
				options.sectionId=options.sectionId?options.sectionId:""
				options.projectId=projectId
				functionObjExtent.construtForm('/manager/inventory/storage/needGoods/export', options)
			},
			draftDel: function (mainIds) {
				$.ajaxPackage({
					url: '/manager/inventory/storage/needGoods/delNeedGoods',
					data: {billsId: mainIds},
					success: function (data) {
						$.zxsaas_plus.showalert('success', data.desc || "删除成功");
						$.pageListCommon.reloadTable()
					}
				})
			},
			submit: function (mainIds) {
				$.ajaxPackage({
					url: '/manager/inventory/storage/needGoods/updateBillsStatus',
					data: {billsId: mainIds,flag:1},
					success: function (data) {
						$.zxsaas_plus.showalert('success', data.desc || "提交成功");
						$.pageListCommon.reloadTable()
					}
				})
			},
			revoke: function (mainIds) {
				$.ajaxPackage({
					url: '/manager/inventory/storage/needGoods/updateBillsStatus',
					data: {billsId: mainIds,flag:2},
					success: function (data) {
						$.zxsaas_plus.showalert('success', data.desc || "撤回成功");
						$.pageListCommon.reloadTable()
					}
				})
			},
			check: function (selRowId) {
				if (selRowId.length < 1) {
					$.zxsaas_plus.showalert('提示', "请勾选数据!");
					return false;
				}
				var mainIds=[];
				for(var i=0;i<selRowId.length;i++){
					var rowData = $("#rpGrid").jqGrid('getRowData', selRowId[i]);
					if(rowData.billsStatus !=13){
						$.zxsaas_plus.showalert('提示', "只能对已提交单据进行审核!");
						return false;
					}
					mainIds.push(rowData.billsId)
				}
				$.ajaxPackage({
					url: '/manager/inventory/storage/needGoods/updateApproveCount',
					data: {billsId: mainIds.join(',')},
					success: function (data) {
						$.zxsaas_plus.showalert('success', data.desc || "审核成功");
						$.pageListCommon.reloadTable()
					}
				})
			},
			uncheck: function (mainIds) {
				$.ajaxPackage({
					url: '/manager/inventory/storage/needGoods/cancleApprove',
					data: {billsId: mainIds},
					success: function (data) {
						$.zxsaas_plus.showalert('success', data.desc || "反审核成功");
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

		//调出部门
		$("#sectionName").storePlu({
			isStoreShow:false,
			isLoadDefaultName:0,
			checkMore: false,
			search: false,
			ifStore: false, // 控制部门选项
			changeStore:function(){
				var $obj=$("#sectionName");
				$obj.data('id',$obj.data('sectionId'))
				$('#managersName').val('').removeData()
				$("#grid").jqGrid("clearGridData");
			}
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

		//按单据查询
		$(".bill").click(function(){
			tabID = 1;
			getCustomProject('要货单-单据列表',reloadTable);

		});

		//按明细查询
		$(".detail").click(function () {
			tabID = 2;
			getCustomProject('要货单-单据明细',reloadTable);
		})
	}

	//重新加载表格
	function reloadTable() {
		$('#searchQuery .search').trigger('click')
	}

	//获取查询参数
	function getSearchParam(){
		var tab = tabID;
		var billsBeginDateStr =$("#searchQuery input[name='billsBeginDateStr']").val();
		var billsEndDateStr =$("#searchQuery input[name='billsEndDateStr']").val();
		var sectionId =$("#sectionName").data("id");
		var managerId =$("#managerUname").data("id");
		var goodsIds =$("#goodsName").data("id");
		var queryKey =$("#queryKey").val().trim();
		var billsStatus =$("#billsStatus").val();
		return {
			tab: tab,
			startTime:billsBeginDateStr,
			endTime:billsEndDateStr,
			sectionId:sectionId,
			managerId:managerId, //经手人IDs
			goodsId:goodsIds, //商品名称
			queryKey:queryKey,  //搜索关键字
			billsStatus:billsStatus//单据状态
		};
	}
})

