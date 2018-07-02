//初始化
$(function () {
    //载入日期组件
    $('#startDate').datePlu({
        dateEnd: '#endDate',
        endDate: true,
        minTime:"1970-01-01",
        ifPermissions:false,
    });
	$('#storeInput').storePlu({
		search: false,
		checkMore: true,
		saleManId: 'managerIds'
	})

	$('#managerIds').storeSales({
		checkMore: true,
		search: false,
		sectionId: 'storeInput'
	})

	$('#contactUnitInput').contactUnitPlu({
		search: false,
		getCouponName: getCouponName
	})

	$('#revise').click(function () {
		$('.reviseBox').toggle()
	})


	$('#sureCount').click(function () {
		var ids = $('#couponGrid').jqGrid('getGridParam', 'selarrrow');
		if (ids.length > 0) {
			if ($('.jsNum').val().trim() != '') {
				$.each(ids, function (k, v) {
					var amount = $("#couponGrid").getCell(ids[k], 'realAmount')
					var deductionAmount = $("#couponGrid").getCell(ids[k], 'settleAmount')
					var jsType = $('.jsType').val()
					var jsNum = $('.jsNum').val().trim()
					if (jsType == '1') {
						amount = (accAdd(amount, jsNum) * 1).toFixed(2)
					} else if (jsType == '2') {
						amount = (accSubtr(amount, jsNum) * 1).toFixed(2)
					} else if (jsType == '3') {
						amount = (accMul(amount, jsNum) * 1).toFixed(2)
					} else {
						if ($('.jsNum').val().trim() != 0) {
							amount = (accDiv(amount, jsNum) * 1).toFixed(2)
						} else {
							$.zxsaas_plus.showalert('提示', '相除分母不能为零')
							return
						}
					}
					if (amount * 1 > 0) {
						$("#couponGrid").setCell(ids[k], 'realAmount', amount)
						$("#couponGrid").setCell(ids[k], 'diffAmount', (accSubtr(deductionAmount, amount) * 1).toFixed(2))
						$('#' + ids[k] + ' input').prop('checked', true)
						$("#couponGrid").setCell(ids[k], 'isCheck', 1)
						updateAccountRecon(ids[k])
					} else {

					}
				})
				var accountRealAmount = $('#couponGrid').getCol('realAmount', false, 'sum');
				var accountDiffAmount = $('#couponGrid').getCol('diffAmount', false, 'sum');

				$('#couponGrid').footerData("set", {
					"realAmount": '<font color="red" >' + Number(accountRealAmount).toFixed(2) + '</font>',
					"diffAmount": '<font color="red" >' + Number(accountDiffAmount).toFixed(2) + '</font>',
				}, false);


			}
		} else {
			$.zxsaas_plus.showalert("提示", "请先选择要修改的行!");
		}
		$('.reviseBox').hide()
	})

	//获得活动名称
	function getCouponName(data) {
		$.ajax({
			url: '/manager/inventory/retail/reconciliation/couponRecon/getCouponName',
			type: "POST",
			traditional: true,
			datatype: "json",
			data: {
				contactUnitId: data
			},
			success: function (data) {
				console.log(data)
				var info = data.data.icouponList
				$('#couponId').html('')
				$('#couponId').append('<option value="">请选择</option>')
				for (var i = 0; i < info.length; i++) {
					$('#couponId').append('<option value=' + info[i].id + '>' + info[i].name + '</option>')
				}

			},
			error: function (msg) {

			}
		})
	}

	$('#couponId').click(function () {
		if ($('#contactUnitInput').data('contactUnitId') == undefined) {
			$.zxsaas_plus.showalert("提示", "请先选择往来单位!");
		}
	})


	//核对改变
	$('#isCheck').change(function () {
		if ($(this).val() != '0') {

			$('#isDeal').prop('disabled', false);
		} else {
			$('#isDeal option:eq(0)').attr('seleted', true)
			$('#isDeal').prop('disabled', true);
		}
	})


	//重置
	$('.reset').click(function () {
		$('#searchQuery')[0].reset()
		$('#storeInput').data('sectionId', '')
		$('#managerIds').data('employeeId', '')
		$('#contactUnitInput').data('contactUnitId', '')
		$('#couponId').html('')
	})

	//查询
	$('#search').click(function () {

		$('#couponGrid').jqGrid('setGridParam', {
			url: "/manager/inventory/retail/reconciliation/couponRecon/getCouponReconPageList",
			postData: {
				page: 1,
				billsBeginDateStr: $('#startDate').val(),
				billsEndDateStr: $('#endDate').val(),
				sectionIds: $('#storeInput').data('sectionId'),
				managerIds: $('#managerIds').data('employeeId'),
				contactUnitId: $('#contactUnitInput').data('contactUnitId'),
				couponId: $('#couponId').val(),
				isCheck: $('#isCheck').val(),
				isDeal: $('#isDeal').attr('disabled') == 'disabled' ? '' : $('#isDeal').val()
			}
		}).trigger("reloadGrid");
	})

	//导出
	$('#export').click(function () {
		if ($('input[name="sectionIds"]').length) {
			$('input[name="sectionIds"]').val($('#storeInput').data('sectionId'))
		} else {
			$("#searchQuery").append('<input type="hidden" value="' + $('#storeInput').data('sectionId') + '" name="sectionIds" >')
		}
		if ($('input[name="managerIds"]').length) {
			$('input[name="managerIds"]').val($('#managerIds').data('employeeId'))
		} else {
			$("#searchQuery").append('<input type="hidden" value="' + $('#managerIds').data('employeeId') + '" name="managerIds" >')
		}

		if ($('input[name="contactUnitId"]').length) {
			$('input[name="contactUnitId"]').val($('#contactUnitInput').data('contactUnitId'))
		} else {
			$("#searchQuery").append('<input type="hidden" value="' + $('#contactUnitInput').data('contactUnitId') + '" name="contactUnitId" >')
		}
		$("#searchQuery").attr("action", "/manager/inventory/retail/reconciliation/couponRecon/export").submit();

	})

	//导出
	$('#exportSum').click(function () {
		if ($('input[name="sectionIds"]').length) {
			$('input[name="sectionIds"]').val($('#storeInput').data('sectionId'))
		} else {
			$("#searchQuery").append('<input type="hidden" value="' + $('#storeInput').data('sectionId') + '" name="sectionIds" >')
		}
		if ($('input[name="managerIds"]').length) {
			$('input[name="managerIds"]').val($('#managerIds').data('employeeId'))
		} else {
			$("#searchQuery").append('<input type="hidden" value="' + $('#managerIds').data('employeeId') + '" name="managerIds" >')
		}

		if ($('input[name="contactUnitId"]').length) {
			$('input[name="contactUnitId"]').val($('#contactUnitInput').data('contactUnitId'))
		} else {
			$("#searchQuery").append('<input type="hidden" value="' + $('#contactUnitInput').data('contactUnitId') + '" name="contactUnitId" >')
		}

		if ($('input[name="sumColumns"]').length) {
			$('input[name="sumColumns"]').val(sumColumnsArr.join(','))
		} else {
			$("#searchQuery").append('<input type="hidden" value="' + sumColumnsArr.join(',') + '" name="sumColumns" >')
		}
		$("#searchQuery").attr("action", "/manager/inventory/retail/reconciliation/couponRecon/exportSum").submit();

	})

	//往来处理
	$('#dealDif').click(function () {
		$.ajax({
			url: '/manager/inventory/retail/reconciliation/couponRecon/deal',
			type: "POST",
			traditional: true,
			datatype: "json",
			data: {
				'ids': '',
				'billsBeginDateStr': $('#startDate').val(),
				'billsEndDateStr': $('#endDate').val(),
				'sectionIds': $('#storeInput').data('sectionId')
			},
			success: function (data) {
				$('#couponGrid').jqGrid('setGridParam', {}).trigger("reloadGrid");

				$.zxsaas_plus.showalert("提示", data.desc);
			},
			error: function (msg) {

			}
		})
	})

	$('.checkSum').click(function () {
		$('.dealTime').text($('#startDate').val() + '  至   ' + $('#endDate').val())
		$('#sumModal').modal('show');

		$('#sumGrid').jqGrid('setGridParam', {
			postData: {
				isCheck: $('#isCheck').val(),
				isDeal: $('#isDeal').val(),
				billsBeginDateStr: $('#startDate').val(),
				billsEndDateStr: $('#endDate').val(),
				sectionIds: $('#storeInput').data('sectionId'),
				managerIds: $('#managerIds').data('employeeId'),
				contactUnitId: $('#contactUnitInput').data('contactUnitId'),
				couponId: $('#couponId').val(),
				sumColumns: sumColumnsArr.join(',')
			},
		}).trigger("reloadGrid");
	})


//表格初始化
	$('#couponGrid').jqGrid({
		scroll: 1,

		mtype: "POST",
		datatype: "json",
		jsonReader: {
			root: "data.couponList",
			total: "data.total",
			records: "data.records",
			repeatitems: false
		},
		postData: {
			isCheck: 0
		},
		gridview: true,
		colNames: ['id', '单据日期', '单据号', '门店', 'sectionId', '往来单位', '活动名称', '抵扣金额','单据结算金额', '核对', 'isCheck', '实际结算金额', '差额', '备注', '营业员一', '营业员二', '核对人'
			, '核对时间', '制单人', '制单时间', '处理人', '处理时间', 'isDeal', 'contactUnitId', 'billsStatus'],
		colModel: [
			{name: "id", width: "150px", align: "center", sortable: false, hidden: true},
			{name: "billsDateStr", width: "150px", align: "center", sortable: false,},
			{name: "billsCode", width: "200px", align: "center", sortable: false},
			{name: "sectionName", width: "150px", align: "center", sortable: false},
			{name: "sectionId", width: "150px", align: "center", sortable: false, hidden: true},
			{name: "contactUnitName", width: "150px", align: "center", sortable: false},
			{name: "couponName", width: "150px", align: "center", sortable: false, editoptions: {}},
			{name: "deductionAmount", width: "150px", align: "center", sortable: false, editoptions: {}},
            {name: "settleAmount", width: "150px", align: "center", sortable: false, editoptions: {}},
			{
				name: "isCheckBox",
				width: "150px",
				align: "center",
				sortable: false,
				editable: false,
				formatter: function (v, x, r) {
					return "<input type='checkbox'  onClick='test(this," + JSON.stringify(r) + ")' " + (r.isCheck == '1' ? 'checked' : null) + "/>";
				}

			},
			{name: "isCheck", width: "150px", align: "center", sortable: false, hidden: true},
			{
				name: "realAmount", width: "150px", align: "center", sortable: false, editable: false, editoptions: {
				dataEvents: [

					{
						type: "blur", fn: function () {
						if ($(this).val().trim() != '') {
							checkInput.checkPositiveNativeNum(this, 12)
						}
						if (($(this).val().trim()) * 1 < 0) {
							$.zxsaas_plus.showalert("提示", '实际结算金额不能为负数');
							$(this).val('');
							$("#couponGrid").saveCell(lastrow, lastcell);
							return
						}
						var amount = $("#couponGrid").getCell(lastrowid, 'settleAmount')
						if ($(this).val().trim() != "0" && $(this).val().trim() != "") {
							$("#couponGrid").setCell(lastrowid, 'diffAmount', accSubtr(amount, $(this).val().trim()))
							getDifAmount((accSubtr(amount, $(this).val().trim()) * 1) > 0 ? 1 : 0)
						} else {

							$('#' + lastrowid + ' input:eq(1)').prop('checked', false)
							$("#couponGrid").setCell(lastrowid, 'diffAmount', "0")
							$("#couponGrid").setCell(lastrowid, 'realAmount', "0")
							$("#couponGrid").setCell(lastrowid, 'diffTypeName')

						}
						$("#couponGrid").saveCell(lastrow, lastcell);
						updateAccountRecon(lastrowid)
						var accountRealAmount = $('#couponGrid').getCol('realAmount', false, 'sum');
						var accountDiffAmount = $('#couponGrid').getCol('diffAmount', false, 'sum');

						$('#couponGrid').footerData("set", {
							"realAmount": '<font color="red" >' + Number(accountRealAmount).toFixed(2) + '</font>',
							"diffAmount": '<font color="red" >' + Number(accountDiffAmount).toFixed(2) + '</font>',
						}, false);

					}
					},
					{
						type: 'keydown', fn: function (e) {
						if ((e.keyCode == 40 || e.keyCode == 38 || e.keyCode == 13)) {
							$(this).blur()
						}
					}
					}
				]
			}
			},
			{name: "diffAmount", width: 80, align: "center", sortable: false}, //是否确认
			{
				name: "remark", width: "150px", align: "center", sortable: false, editable: true, editoptions: {
				dataEvents: [
					{
						type: "blur", fn: function () {
						$("#couponGrid").saveCell(lastrow, lastcell);
						updateAccountRecon(lastrowid)
					}
					}
				]
			}
			},
			{name: "managerName", width: "150px", align: "center", sortable: false},
			{name: "managerName1", width: "150px", align: "center", sortable: false},
			{name: "checkedByName", width: "150px", align: "center", sortable: false},
			{name: "checkedDateStr", width: "150px", align: "center", sortable: false},
			{name: "createByName", width: "150px", align: "center", sortable: false},
			{name: "createDateStr", width: "150px", align: "center", sortable: false},
			{name: "dealByName", width: "150px", align: "center", sortable: false},
			{name: "dealDateStr", width: "150px", align: "center", sortable: false},
			{name: "isDeal", width: "150px", align: "center", sortable: false, hidden: true},
			{name: "contactUnitId", width: "150px", align: "center", sortable: false, hidden: true},
			{name: "billsStatus", width: "150px", align: "center", sortable: false, hidden: true},
		],
		sortable: false,
		rownumbers: true,
		cellsubmit: 'clientArray',// 单元格保存内容的位置
		editurl: 'clientArray',
		rowNum: 15,
		pager: '#couponGridPager',
		viewrecords: true,
		cellEdit: true,
		width: '',
		footerrow: true,
		multiselect: true,
		multiboxonly: true,
		multiselectWidth: 38,
		height: $(window).height() * 0.5,
		autowidth: true,
		rownumWidth: 35, // the width of the row numbers columns
		shrinkToFit: false,  // 此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
		userDataOnFooter: true,// 设置userData 显示在footer里
		ondblClickRow: function (id) {

		},
		onCellSelect: function (rowid, index, contents, event) {
			lastrowid = rowid * 1;
			if ($(event.target).attr('aria-describedby') == 'couponGrid_realAmount') {
				var realAmount = $("#couponGrid").getCell(rowid, 'realAmount')
				var info = $("#couponGrid").getRowData(rowid)
				if (info.isDeal == "0" && info.billsStatus != '7') {
					if (realAmount == "0" || realAmount == '') {
						$("#couponGrid").setCell(rowid, 'realAmount', $("#couponGrid").getCell(rowid, 'settleAmount'))
						$('#' + rowid + ' input').prop('checked', true)
						$("#couponGrid").setCell(info.id, 'isCheck', 1)
					} else {
						$("#couponGrid").setColProp('realAmount', {editable: true});
					}
				} else {

					$("#couponGrid").setColProp('realAmount', {editable: false});
					return
				}

			}
//		if(index == 14){
//			
//			var diffAmount = $("#couponGrid").getCell(lastrowid,'diffAmount');
//			var realAmount = $("#couponGrid").getCell(lastrowid,'realAmount');
//			if(diffAmount != "0" && diffAmount != ""){
//				getDifAmount( diffAmount*1 > 0 ? 1 : 0 )
//			}else{
//				$('.diffTypeName').remove()
//			}
//		}
		},
		beforeEditCell: function (rowid, cellname, v, iRow, iCol) {
			lastrowid = rowid * 1;
			lastrow = iRow;
			lastcell = iCol;
		},
		beforeSelectRow: function (rowid, e) {

		},
		afterInsertRow: function (rowid, aData) { // 新增一行之后

		},
		onSelectRow: function (id, status) {

		},
		gridComplete: function () {
			$('table th').css('text-align', 'center');
		},
		loadComplete: function (data) {
			var info = data.data.couponList
			for (var i = 0; i < info.length; i++) {
				if (info[i].isDeal == '1' || info[i].billsStatus == '7') {
					$('#' + info[i].id).find('input').prop('disabled', true);
				}
			}


			$('.footrow td:first-child').html('合计');
			var rowNum = parseInt($(this).getGridParam('records'), 10);
			if (rowNum > 0) {
				$(".ui-jqgrid-sdiv").show();
				var accountAmount = $(this).getCol('deductionAmount', false, 'sum');
				var accountRealAmount = $(this).getCol('realAmount', false, 'sum');
				var accountDiffAmount = $(this).getCol('diffAmount', false, 'sum');
                var accountSettleAmount = $(this).getCol('settleAmount', false, 'sum');
				$(this).footerData("set", {
					"deductionAmount": '<font color="red" >' + Number(accountAmount).toFixed(2) + '</font>',
					"settleAmount": '<font color="red" >' + Number(accountSettleAmount).toFixed(2) + '</font>',
					"realAmount": '<font color="red" >' + Number(accountRealAmount).toFixed(2) + '</font>',
					"diffAmount": '<font color="red" >' + Number(accountDiffAmount).toFixed(2) + '</font>',
				}, false);
			}
			else {
				$(".ui-jqgrid-sdiv").hide();
			}
		},
		loadError: function (xhr, status, error) {

		}
	})

//表格初始化
	$('#sumGrid').jqGrid({
		scroll: 1,
		url: "/manager/inventory/retail/reconciliation/couponRecon/getSumCouponReconPageList",
		mtype: "POST",
		datatype: "json",
		jsonReader: {
			root: "data.couponSumList",
			total: "data.total",
			records: "data.records",
			repeatitems: false
		},

		gridview: true,
		colNames: ['单据日期', '门店', '往来单位', '活动名称', '抵扣金额','单据结算金额', '实际结算金额', '差额'],
		colModel: [
			{name: "billsDateStr", width: "150px", align: "center", sortable: false,},
			{name: "sectionName", width: "150px", align: "center", sortable: false},
			{name: "contactUnitName", width: "150px", align: "center", sortable: false},

			{name: "couponName", width: "150px", align: "center", sortable: false, editoptions: {}},
			{name: "deductionAmount", width: "150px", align: "center", sortable: false, editoptions: {}},
			{name: "settleAmount", width: "150px", align: "center", sortable: false, editoptions: {}},

			{name: "realAmount", width: "150px", align: "center", sortable: false,},
			{name: "diffAmount", width: 80, align: "center", sortable: false}, //是否确认
//            	{name:"diffTypeNameBox",width:"150px",align:"center",sortable:false}, 
//            	{name:"diffType",width:"150px",align:"center",sortable:false,hidden:true}, 
//            	{name:"dutyName",width:"150px",align:"center",sortable:false}, 
//            	{name:"dutyId",width:"150px",align:"center",sortable:false,hidden:true}, 
//            	{name:"remark",width:"150px",align:"center",sortable:false},
//            	{name:"checkedByName",width:"150px",align:"center",sortable:false}
		],
		sortable: false,
		rownumbers: true,
		cellsubmit: 'clientArray',// 单元格保存内容的位置
		editurl: 'clientArray',
		rowNum: 15,
		pager: '#sumGridPager',
		viewrecords: true,
		cellEdit: true,
		width: '',
		footerrow: true,
		height: $(window).height() * 0.6,
		autowidth: true,
		rownumWidth: 35, // the width of the row numbers columns
		shrinkToFit: false,  // 此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
		userDataOnFooter: true,// 设置userData 显示在footer里
		ondblClickRow: function (id) {

		},
		onCellSelect: function (rowid, index, contents, event) {
			lastrowid = rowid * 1;
			console.log(index)
			if (index == 12) {
				var realAmount = $("#accountGrid").getCell(rowid, 'realAmount')
				if (realAmount == "0" || realAmount == '') {
					$("#accountGrid").setCell(rowid, 'realAmount', $("#accountGrid").getCell(rowid, 'amount'))
					$('#' + rowid + ' input').prop('checked', true)
				} else {
					$("#accountGrid").setColProp('realAmount', {editable: true});
				}
			}
			if (index == 14) {

				var diffAmount = $("#accountGrid").getCell(lastrowid, 'diffAmount');
				var realAmount = $("#accountGrid").getCell(lastrowid, 'realAmount');
				if (diffAmount != "0" && diffAmount != "") {
					getDifAmount(diffAmount * 1 > 0 ? 1 : 0)
				} else {
					$('.diffTypeName').remove()
				}
			}
		},
		beforeEditCell: function (rowid, cellname, v, iRow, iCol) {
			lastrowid = rowid * 1;
			lastrow = iRow;
			lastcell = iCol;
		},
		beforeSelectRow: function (rowid, e) {

		},
		afterInsertRow: function (rowid, aData) { // 新增一行之后

		},
		onSelectRow: function (id, status) {
			console.log('1')
		},
		gridComplete: function () {
			$('table th').css('text-align', 'center');
		},
		loadComplete: function (data) {

			$('.footrow td:first-child').html('合计');
			var rowNum = parseInt($(this).getGridParam('records'), 10);
			if (rowNum > 0) {
				$(".ui-jqgrid-sdiv").show();
				var accountAmount = $(this).getCol('deductionAmount', false, 'sum');
				var accountRealAmount = $(this).getCol('realAmount', false, 'sum');
				var accountDiffAmount = $(this).getCol('diffAmount', false, 'sum');
				var accountSettleAmount = $(this).getCol('settleAmount', false, 'sum');
				$(this).footerData("set", {
					"deductionAmount": '<font color="red" >' + Number(accountAmount).toFixed(2) + '</font>',
					"settleAmount": '<font color="red" >' + Number(accountSettleAmount).toFixed(2) + '</font>',
					"realAmount": '<font color="red" >' + Number(accountRealAmount).toFixed(2) + '</font>',
					"diffAmount": '<font color="red" >' + Number(accountDiffAmount).toFixed(2) + '</font>',
				}, false);
			}
			else {
				$(".ui-jqgrid-sdiv").hide();
			}
		},
		loadError: function (xhr, status, error) {

		}
	})


	$('.sumColumnsCheck').change(function (e) {
		if (e.target.checked) {
			sumColumnsArr.push(e.target.name)
			$('#sumGrid').jqGrid('setGridParam', {
				postData: {
					sumColumns: sumColumnsArr.join(',')
				},
			}).trigger("reloadGrid");
		} else {
			sumColumnsArr.splice($.inArray(e.target.name, sumColumnsArr), 1);
			$('#sumGrid').jqGrid('setGridParam', {
				postData: {
					sumColumns: sumColumnsArr.join(',')
				},
			}).trigger("reloadGrid");
		}
	})

})

var sumColumnsArr = ['billsDateStr', 'sectionName', 'contactUnitName', 'couponName'];

function getnum(obj) {
	obj.value = obj.value.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
	obj.value = obj.value.replace(/^\./g, ""); //验证第一个字符是数字
	obj.value = obj.value.replace(/\.{2,}/g, "."); //只保留第一个, 清除多余的
	obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
	obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两个小数
}


//获取差额处理方式
function getDifAmount(flag) {
	$.ajax({
		url: '/manager/inventory/retail/reconciliation/accountRecon/getInpayClass',
		type: "POST",
		traditional: true,
		datatype: "json",
		data: {
			'flag': flag
		},
		success: function (data) {
			if (data.result == 1 || data.result == "1") {
				$('.diffTypeName').remove()

				var nameList = '<select class="diffTypeName"><option value="">请选择</option>';
				var list = data.data.inpayList;
				for (var i = 0; i < list.length; i++) {
					nameList += '<option value="' + list[i].id + '">' + list[i].name + '</option>'
				}
				$("#accountGrid").setCell(lastrowid, 'diffTypeName', nameList + '</select>')
				//差额处理方式变更
				$('.diffTypeName').on('change', function () {

					$("#accountGrid").setCell(lastrowid, 'diffTypeName', $(this).find("option:selected").text())
					$("#accountGrid").setCell(lastrowid, 'diffType', $(this).val())
					updateAccountRecon(lastrowid)
				})
			} else {
				$.zxsaas_plus.showalert("提示", data.desc);
			}

		},
		error: function (msg) {
			alert(" 数据加载失败！" + msg);
		}
	})
}


//改变已核
function test(e, data) {
	if (e.checked) {
		$("#couponGrid").setCell(data.id, 'realAmount', $("#couponGrid").getCell(data.id, 'settleAmount'))
		var accountRealAmount = $('#couponGrid').getCol('realAmount', false, 'sum');
		var accountDiffAmount = $('#couponGrid').getCol('diffAmount', false, 'sum');
		$("#couponGrid").setCell(data.id, 'isCheck', 1)
		$('#couponGrid').footerData("set", {
			"realAmount": '<font color="red" >' + Number(accountRealAmount).toFixed(2) + '</font>',
			"diffAmount": '<font color="red" >' + Number(accountDiffAmount).toFixed(2) + '</font>',
		}, false);
	} else {
		$("#couponGrid").setCell(data.id, 'realAmount', '0')
		$("#couponGrid").setCell(data.id, 'diffAmount', '0')
		$("#couponGrid").setCell(data.id, 'isCheck', 0)
		var accountRealAmount = $('#couponGrid').getCol('realAmount', false, 'sum');
		var accountDiffAmount = $('#couponGrid').getCol('diffAmount', false, 'sum');

		$('#couponGrid').footerData("set", {
			"realAmount": '<font color="red" >' + Number(accountRealAmount).toFixed(2) + '</font>',
			"diffAmount": '<font color="red" >' + Number(accountDiffAmount).toFixed(2) + '</font>',
		}, false);
	}
	updateAccountRecon(data.id, e.checked)

}

function updateAccountRecon(rowid) {
	var info = $("#couponGrid").getRowData(rowid)
	$.ajax({
		url: '/manager/inventory/retail/reconciliation/couponRecon/updateCouponRecon',
		type: "POST",
		traditional: true,
		datatype: "json",
		data: {
			'id': info.id,
			'isCheck': info.isCheck,
			'realAmount': info.realAmount,
			'diffAmount': info.diffAmount,
			'remark': info.remark,
			'contactUnitId': info.contactUnitId,
			'sectionId': info.sectionId
		},
		success: function (data) {
			$("#couponGrid").setCell(rowid, 'checkedByName', data.data.checkedByName)
			$("#couponGrid").setCell(rowid, 'checkedDateStr', data.data.checkedDateStr)
		},
		error: function (msg) {
			alert(" 数据加载失败！" + msg);
		}
	})


}





