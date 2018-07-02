var projectId
var alignArr = ['', 'left', 'center', 'right'];
$(function () {
    init()

    //载入菜单组件
    function initMenuBtn(){
        //保存红冲按钮
        $(".redSave").on("click",function(){
			var selRowId = $("#rpGrid").jqGrid('getGridParam','selarrrow');

            $.request({
                url:"/manager/inventory/income/redBill",
                dataType: "json",
				type:'post',
				traditional: true,
                data:{
                	id:selRowId,
					redDate:$('.redTime').val()
				},
                success:function(data){
                    if(data.result==1){
                        $.zxsaas_plus.showalert("success",data.desc || "红冲成功");
						setTimeout(function(){selTable()},1500)
                        $('#redModal').modal('hide');
                    }else{
                        $.zxsaas_plus.showalert("error",data.desc);
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



        //单据状态
        $('#billsStatus').change(function () {
            var $this=$(this)
            //草稿单
            if($this.val()=='1'){
                $('.ifContainRedBill').prop({'checked':false,'disabled':true})
            }else{
                $('.ifContainRedBill').prop({'disabled':false})
            }
        })

        //查询
        $('#searchQuery .search').click(function () {
			searchDetail(getSearchParam())
        })
        //重置
        $('#searchQuery .reset').click(function () {
            $("#searchQuery")[0].reset();
			$('#startDate').datePlu({
				dateEnd: '#endDate',
				ifPermissions:false,
			})
            $("#searchQuery input").data({'id':''})
			$('.ComboBox ul').html('')
			$("#searchQuery table tbody .jqgrow").remove()
        })
    }
    function selTable() {
        $('#rpGrid').jqGrid('setGridParam', {
            datatype:'json',
            url:"/manager/inventory/income/selectList",
            postData:getSearchParam()
        }).trigger("reloadGrid");
    }
	function init() {

		initMenuBtn()
		initTopForm()

		//单据类型
		$('#billsType').combobox({
			id:'billsTypeTree',
			url: '/manager/inventory/common/getAllBillsType',
			param:{
			},
			placeholder:'单据类型'
		})

		//制单人
		$('#addManIds').modalsbox({
			grid: {
				id: 'operatorqw12e',
				url: basePath + "/component/employee/getCompanyEmployeeVoList",
				param: {}
			},
			placeholder: '制单人',
		})

		// //凭证来源
		// $('#voucherSource').combobox({
		// 	id: 'voucherSourceTree',
		// 	url: basePath + '/finance/common/getVoucherSourceList',
		// 	param: {
		//
		// 	},
		// 	placeholder: '请选择凭证来源',
		// 	// checkType:'radio'
		// })
	}
	getCustomProject('凭证单据对照表')



	//查询方法
	$.jgrid.defaults.width = 1280;
	$.jgrid.defaults.responsive = true;
	$.jgrid.defaults.styleUI = 'Bootstrap';
	function searchDetail(params, url, options) {

		$('.notFounImgBox').hide()
		$('#rpContainer').show()
		$('.loadingImgBox').show()
		$('#promptBox').hide()
		var def = {
			multiselect: false, //是否多选
			sortable: true,//是否排序
			merge: false,//是否合并
			gotoable: true,//是否跳转
			rows: '100'//默认数量

		}
		def = $.extend({}, def, options)

		$.ajax({
			url: '/manager/finance/common/getReportHead',
			dataType: 'json',
			type: 'post',
			data: {
				'projectId': projectId,
			},
			success: function (data) {
				if (data.result == '-999') {
					$('#rpContainer').hide()
					$('.notFounImgBox').hide()
					return
				}
				var colName = [];
				var colModel = [];
				var groupHeader = [];
				var mergeArr = [];
				var complexData = {
					colName: colName,
					colModel: colModel,
					groupHeader: groupHeader
				};
				$.each(data.data.colModel, function (k, v) {
					colName.push(v.defualname);
					colModel.push({
						name: v.code,
						index: v.code,
						width: v.columnSize,
						align: alignArr[v.align],
						hidden: !v.isShow,
						id: v.id,
						sortable: def.sortable,
						cellattr: function (rowId, tv, rawObject, cm, rdata) {
							return 'id=\'' + v.code + rowId + "\'";
						}
					});

				});
				for (var i = 0; i < data.data.colModel.length; i++) {
					if (data.data.colModel[i].dataType == 'String' && data.data.colModel[i].isShow) {
						mergeArr.push(data.data.colModel[i].code)
					}
					if (data.data.colModel[i].dataType == 'Number') {
						break;
					}
				}
				;
				$.jgrid.gridUnload("rpGrid");

				$("#rpGrid").jqGrid({
					mtype: "POST",
					url: '/manager/finance/voucherCertificate/selectList',
					postData: params,
					datatype: "json",
					shrinkToFit: true,
					pager: "#rpGridPager",
					rowList: [100, 200, 500],
					rowNum: def.rows,
					autowidth: true,
					rownumbers: true, // show row numbers
					rownumWidth: 50, // the width of the row numbers columns
					width: "100%",
					height: $(window).height() * 0.55,
					sortable: false,
					viewrecords: true,
					sortorder: "desc",
					colNames: colName,
					footerrow: true,
					userDataOnFooter: true,
					colModel: colModel,
					multiselect: true,
					jsonReader: {
						repeatitems: false,
						root: 'data.rows',
						total: 'data.total',
						page: 'data.page',
						records: 'data.records'
					},
					gridComplete: function () {
						$('table th').css('text-align', 'center')
						$('#rpGrid').resize()

						if (mergeArr.length > 0 && def.merge) {
							Merger("rpGrid", mergeArr);
						}
					},
					onCellSelect: function (rowid, index, contents, event) {
						if (def.gotoable) {
							var info = $("#rpGrid").getRowData(rowid)
							if (event.target.className == 'billsCodeStyle') {
								if(index == 5){
									window.top.openWorkBoxByMenutext('填制凭证',   '/manager/cw/test/voucher?voucherId='+info.voucherId+'&billsCode='+info.billsCode, true)
								}
								if(index == 7){
									var gotoUrl = getGoInfo(info).gotoUrl;
									var gotoName = getGoInfo(info).gotoName;
									window.top.openWorkBoxByMenutext(gotoName,gotoUrl,true)
								}
							}

						}
						if (def.onCellSelect) {
							def.onCellSelect(rowid, index, contents, event);
						}
					},
					loadComplete: function (data) {
						$('#rpGrid').resize()
						if (Object.keys(data.data).length == 0 || data.result == -999) {
							// $('#rpContainer').hide()
							$('.loadingImgBox').hide()
							$('.notFounImgBox').hide()
							return
						} else {
							$('.loadingImgBox').hide()
							$('.notFounImgBox').hide()
							$('#rpContainer').show()
						}
						$('#rpGrid td').css('text-overflow','ellipsis')

						if (data.data.rows.length > 0) {
							var info = data.data.rows

							$.each(info, function (k, v) {
								if (v.redMan) {
									$('#rpGrid').find('tbody tr:eq(' + (k + 1) + ')').css('color', 'red')
								}
								if (def.gotoable) {
									$('#rpGrid tr td[aria-describedby="rpGrid_billsCode"]').addClass('billsCodeStyle');
									$('#rpGrid tr td[aria-describedby="rpGrid_vouchetInNo"]').addClass('billsCodeStyle');
								}

							})

							$('.footrow td:first-child').html('合计');
							var rowNum = parseInt($(this).getGridParam('records'), 10);
							if (rowNum > 0) {
								$(".ui-jqgrid-sdiv").show();
								var footerData = data.data.totalVo;
								$(this).footerData("set", footerData, false);
							}
							else {
								$(".ui-jqgrid-sdiv").hide();
							}

							//分页滚动条 置顶
							$("#rpGrid").parents(".ui-jqgrid-bdiv")[0].scrollTop = 0;

							//数据请求成功之后，若果有要操作数据的行为，在这里执行
							if (def.callback) {
								def.callback(data);
							}

							//垂直滚动条置顶
							/*$("#rpGrid").setSelection(1);
							$("#rpGrid").resetSelection();*/
						} else {
							// $('#rpContainer').hide()
							$('.loadingImgBox').hide()
							// $('.notFounImgBox').show()
						}
					},
					ondblClickRow: function (id) {
						if (def.ondblClickRow) {
							def.ondblClickRow(id)
						}
					},
				});
				$("#rpGrid").jqGrid('bindKeys', '');
			}
		})
	}

	$("#lineSetGrid").jqGrid({
		mtype: "POST",
		datatype: "json",
		viewrecords: true,
		rowNum: 400,
		width: "100%",
		height: $(window).height() * 0.55,
		colNames: ['id', '报表列字段', '是否显示', 'code'],
		colModel: [
			{name: "id", width: '150px', align: "center", sortable: false, hidden: true},
			{name: "name", width: '150px', align: "center", sortable: false},
			{
				name: "isShow",
				width: '150px',
				align: "center",
				sortable: false,
				formatter: "checkbox",
				formatoptions: {disabled: false},
				edittype: 'checkbox',
				editoptions: {value: '1:0'}
			},
			{name: "code", width: '150px', align: "center", sortable: false, hidden: true},
		],
		jsonReader: {
			repeatitems: false,
			root: 'data.columnVoList',
		},
		gridComplete: function () {
			$('table th').css('text-align', 'center')
			$('#lineSetGrid').resize()
		},
	});

	$('#subGrid').jqGrid({
		mtype: "POST",
		datatype: "json",
		jsonReader: {
			root: "data.failedList",
		},
		colNames: ['凭证号','出错原因'],
		colModel: [
			{name:"name",index:"name",align:"center",sortable:false},
			{name:"reason",index:"reason",align:"center",sortable:false},
		],
		sortable: false,
		rownumbers: true,
		cellsubmit: 'clientArray',// 单元格保存内容的位置
		editurl: 'clientArray',
		rowNum: 40000,
		viewrecords: true,
		cellEdit: true,
		page:1,
		width: '',
		// footerrow: true,
		// multiselect:true,
		// multiboxonly:true,
		// multiselectWidth:38,
		height: $(window).height() * 0.5,
		autowidth: true,
		rownumWidth: 35, // the width of the row numbers columns
		shrinkToFit: true,  // 此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
		// userDataOnFooter: true,// 设置userData 显示在footer里
		gridComplete: function () {
			$('table th').css('text-align', 'center');

		},
		loadComplete: function (data) {
			$('#subGrid').resize()
			$('#delModal').modal('show');
			$('.descBox').show()
			$('.gridBox').hide()
			if(data.data.failedList.length >0 ) {
				$('.gridBox').show()
				// $('#subGrid').jqGrid('setGridParam', {
				// 	url:url,
				// 	postData:{
				// 		voucherIds:infoArr.join(',')
				// 	}
				// }).trigger("reloadGrid");
			}

			$('.descBox').text(data.desc)

			$('#delBtn').unbind('click').on('click',function () {
				$('#delModal').modal('hide')
				ifCheckAll = false;
				$('.checkBoxInfo').hide()
				$('.checkAll').prop('checked',false)
				$('#rpGrid').jqGrid('setGridParam', {
					// page:1
				}).trigger("reloadGrid");
			})
		},
		loadError: function (xhr, status, error) {

		}
	})

    //获取查询参数
    function getSearchParam(){
        return {
			beginTime:$("#searchQuery input[name='billsDateBegin']").val(),
			endTime:$("#searchQuery input[name='billsDateEnd']").val(),
			addManIds:$("#addManIds").data("id"),
			billsType:$("#billsType").data("id"),
			voucherSource : $("#voucherSource").val(),
			keyword : $("#keyWord").val().trim(),
			isShowVoid : $(".isShowVoid").is(":checked") ? "1" : "0",
			isContainRed : $('.ifContainRedBill').is(":checked") ? "1" : "0"
        };
    }
})

//列設置
function lineSet(){
	$('#lineSet-modal').modal('show');
	$("#lineSetGrid").jqGrid('setGridParam', {
		url:'/manager/erp/projectAndColumn/getColumns',
		postData: {
			'rpMainId':  projectId
		}
	}).trigger("reloadGrid");
}
//列设置确认
function sureLineSet() {
	var valList = $('#lineSetGrid').getRowData()
	var ids = $("#lineSetGrid").jqGrid('getDataIDs');
	var rowData = $("#lineSetGrid").jqGrid('getRowData', ids[ids.length - 1]);
	valList.push(rowData)
	$.ajax({
		url: '/manager/erp/projectAndColumn/updateColumns',
		dataType: 'json',
		type: 'post',
		data: {
			'valList': JSON.stringify(valList)
		},
		success: function (data) {
			if (data.data.status == '1') {
				$.jgrid.gridUnload("rpGrid");

				$(".search").click()
			}
		}
	})
}

function action(url,param){
	$('.gridBox').hide()
	$('.delBox').hide();
	$('.sortBox').hide();
	$('.checkBoxInfo').hide()
	$('.checkinfoBox').show()
	$('.hasCheckedBox').hide()
	var ids = $('#rpGrid').jqGrid('getGridParam','selarrrow')
	if(ids.length > 0){
		var infoArr = []
		$.each(ids,function(k,v){
			var info = $("#rpGrid").getRowData(v)
			infoArr.push(info.voucherId)
		})
		var params = $.extend({}, params, param)
		params.voucherIds = infoArr.sort(function(a,b){return a-b}).join(','),

		$('#subGrid').jqGrid('setGridParam', {
			url:url,
			postData:params
		}).trigger("reloadGrid");
	}
}
//作廢憑證
function invalidVoucher(){
	action('/manager/finance/voucher/manager/cancelBatch')
}
//取消作廢
function cancelInvalid(){
	action('/manager/finance/voucher/manager/cancelCancelBatch')
}
//刪除憑證
function deleteVoucher(){
	$('.gridBox').hide()
	$('.descBox').hide()
	$('.ifSortDocNo').prop('checked',true)
	var ids=$('#rpGrid').jqGrid('getGridParam','selarrrow');
	if(ids.length > 0 ){
		$.zxsaas_plus.showconfirm('删除',' 删除后自动整理凭证断号？',function(){
			action('/manager/finance/voucher/manager/deleteBatch',{isSortNo:1})
		},function(){
			action('/manager/finance/voucher/manager/deleteBatch',{isSortNo:0})
		})
	}else{
		$.zxsaas_plus.showalert('提示','请先选择要删除的凭证')
	}


}


function getGoInfo(info) {
	var gotoUrl = '', gotoName = '';
	switch (info.billsType.split('-')[0]) {
		case "零售退货单" :
			gotoName = "零售退货单";
			gotoUrl = '/manager/inventory/retail/returnGoods/toPrint?bId=' + info.billId + '&billsCode=' + info.billsCode
			break;
		case '零售开单' :
			gotoName = '零售开单';
			gotoUrl = '/manager/inventory/retail/delivery/toPrint?bId=' + info.billId + '&billsCode=' + info.billsCode
			break;
		case '零售出库单' :
			gotoName = '零售开单';
			gotoUrl = '/manager/inventory/retail/delivery/toPrint?bId=' + info.billId + '&billsCode=' + info.billsCode
			break;
		case '采购订单' :
			gotoName = '采购订单';
			gotoUrl = '/manager/purchase/order?billsId=' + info.billId + '&billsCode=' + info.billsCode
			break;
		case '采购入库单' :
			gotoName = '采购入库单';
			gotoUrl = '/manager/inventory/purchase/delivery/main?billsId=' + info.billId + '&billsCode=' + info.billsCode
			break;
		case '采购退货单' :
			gotoName = '采购退货单';
			gotoUrl = '/manager/inventory/purchase/refund/main?billsId=' + info.billId + '&billsCode=' + info.billsCode
			break;
		case '采购换货单' :
			gotoName = '采购换货单';
			gotoUrl = '/manager/inventory/purchase/exchange/main?billsId=' + info.billId + '&billsCode=' + info.billsCode
			break;
		case '同价调拨发货单' :
			gotoName = '同价调拨发货单';
			gotoUrl = '/manager/inventory/storage/samePrice/transfer/main?billsId=' + info.billId + '&billsCode=' + info.billsCode
			break;
		case '变价调拨发货单' :
			gotoName = '变价调拨发货单';
			gotoUrl = '/manager/inventory/storage/changePrice/transfer/main?billsId=' + info.billId + '&billsCode=' + info.billsCode
			break;
		case '成本调整单' :
			gotoName = '成本调整单';
			gotoUrl = '/manager/inventory/storage/cost/adjustment/main?billsId=' + info.billId + '&billsCode=' + info.billsCode
			break;
		case '销售订单' :
			gotoName = '销售订单';
			gotoUrl = '/manager/salesOrder/show?billsId=' + info.billId + '&billsCode=' + info.billsCode
			break;
		case '其它入库单' :
			gotoName = '其它入库单';
			gotoUrl = '/manager/inventory/storage/stock/other/incoming/main?billsId=' + info.billId + '&billsCode=' + info.billsCode
			break;
		case '其它出库单' :
			gotoName = '其它出库单';
			gotoUrl = '/manager/inventory/storage/stock/other/removal/main?billsId=' + info.billId + '&billsCode=' + info.billsCode
			break;
		case '供应商保价单' :
			gotoName = '供应商保价单';
			gotoUrl = '/manager/inventory/fund/supplier/reprice/main?billsId=' + info.billId + '&billsCode=' + info.billsCode
			break;
		case '供应商返利单' :
			gotoName = '供应商返利单';
			gotoUrl = '/manager/funds/supplierRebate?billsId=' + info.billId + '&billsCode=' + info.billsCode
			break;
		case '其它收入单' :
			gotoName = '供应商返利单';
			gotoUrl = '/manager/funds/supplierRebate?billsId=' + info.billId + '&billsCode=' + info.billsCode
			break;
		case '其它支出单' :
			gotoName = '其它支出单';
			gotoUrl = '/manager/funds/payment/otherExpend?billsId=' + info.billId + '&billsCode=' + info.billsCode
			break;
		case '收款单' :
			gotoName = '收款单';
			gotoUrl = '/manager/funds/payment/initPayee?billsId=' + info.billId + '&billsCode=' + info.billsCode
			break;
		case '付款单' :
			gotoName = '付款单';
			gotoUrl = '/manager/funds/payment/initPayment?billsId=' + info.billId + '&billsCode=' + info.billsCode
			break;
		case '预付款单' :
			gotoName = '预付款单';
			gotoUrl = '/manager/funds/payment/planPayment?billsId=' + info.billId + '&billsCode=' + info.billsCode
			break;
		case '预收款单' :
			gotoName = '预收款单';
			gotoUrl = '/manager/funds/payment/planPayee?billsId=' + info.billId + '&billsCode=' + info.billsCode
			break;
		case '往来调整单' :
			gotoName = '往来调整单';
			gotoUrl = '/manager/funds/adjust/initAdjust?billsId=' + info.billId + '&billsCode=' + info.billsCode + '&billsDate=' + info.billDate
			break;
		case '往来结算单' :
			gotoName = '往来结算单';
			gotoUrl = '/manager/funds/settlement/initSettlement?billsId=' + info.billId + '&billsCode=' + info.billsCode
			break;
		case '批发出库单' :
			gotoName = '批发单';
			gotoUrl = '/manager/salesOut/show?billsId=' + info.billId + '&billsCode=' + info.billsCode
			break;
		case '批发退货单' :
			gotoName = '批发退货单';
			gotoUrl = '/manager/salesRefund/show?billsId=' + info.billId + '&billsCode=' + info.billsCode
			break;
		case '批发换货单' :
			gotoName = '批发换货单';
			gotoUrl = '/manager/salesExchange/show?billsId=' + info.billId + '&billsCode=' + info.billsCode
			break;
		case '客户返利单' :
			gotoName = '客户返利单';
			gotoUrl = '/manager/funds/clientRebate?billsId=' + info.billId + '&billsCode=' + info.billsCode
			break;
		case '客户保价单' :
			gotoName = '客户价保单';
			gotoUrl = '/manager/funds/clientReprice?billsId=' + info.billId + '&billsCode=' + info.billsCode
			break;
		case '受托结算单' :
			gotoName = '受托结算单';
			gotoUrl = '/manager/funds/beEntrustSettlement?billsId=' + info.billId + '&billsCode=' + info.billsCode
			break;
		case '受托撤结单' :
			gotoName = '受托撤结单';
			gotoUrl = '/manager/funds/beEntrustUndoSettlement?billsId=' + info.billId + '&billsCode=' + info.billsCode
			break;
		case '委托结算单' :
			gotoName = '委托结算单';
			gotoUrl = '/manager/funds/entrustSettlement?billsId=' + info.billId + '&billsCode=' + info.billsCode
			break;
		case '委托撤结单' :
			gotoName = '委托撤结单';
			gotoUrl = '/manager/funds/entrustUndoSettlement?billsId=' + info.billId + '&billsCode=' + info.billsCode
			break;
		case '受托调价单' :
			gotoName = '受托调价单';
			gotoUrl = '/manager/funds/beEntrustChangePrice?billsId=' + info.billId + '&billsCode=' + info.billsCode
			break;
		case '委托调价单' :
			gotoName = '委托调价单';
			gotoUrl = '/manager/funds/entrustChangePrice?billsId=' + info.billId + '&billsCode=' + info.billsCode
			break;
		case '预付退款单' :
			gotoName = '预付退款单';
			gotoUrl = '/manager/inventory/fund/inPayment/refund/payRefund/main?billsId=' + info.billId + '&billsCode=' + info.billsCode
			break;
		case '预收退款单' :
			gotoName = '预收退款单';
			gotoUrl = '/manager/inventory/fund/inPayment/refund/recRefund/main?billsId=' + info.billId + '&billsCode=' + info.billsCode
			break;
        case '收入单' :
            gotoName = '收入单';
            gotoUrl = '/manager/inventory/income/incomeBill?billsId=' + info.billId + '&billsCode=' + info.billsCode
            break;
        case '费用单' :
            gotoName = '费用单';
            gotoUrl = '/manager/inventory/expend/expendBill?billsId=' + info.billId + '&billsCode=' + info.billsCode
            break;
        case '资金调整单' :
            gotoName = '资金调整单';
            gotoUrl = '/manager/inventory/fund/adjust/main?billsId=' + info.billId + '&billsCode=' + info.billsCode
            break;
        case '内部转账单' :
            gotoName = '内部转账单';
            gotoUrl = '/manager/funds/innerTransfer/initInnerTransfer?billsId=' + info.billId + '&billsCode=' + info.billsCode
            break;
        case '零售定金单' :
            gotoName = '零售定金单';
            gotoUrl = '/manager/retail/deposit/retailDepositMain?billsId=' + info.billId + '&billsCode=' + info.billsCode
            break;
        case '零售退定单' :
            gotoName = '零售退定单';
            gotoUrl = '/manager/retail/reDeposit/retailReDepositMain?billsId=' + info.billId + '&billsCode=' + info.billsCode
            break;
	}
	var goInfo = {
		gotoName: gotoName,
		gotoUrl: gotoUrl
	}
	return goInfo;
}