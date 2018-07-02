$(function(){
	getMonth()

	//获取摊销月份
	function getMonth(){
		$.ajax({
			url:'/manager/inventory/expend/loadAvgMonth',
			type:'post',
			dataType:'json',
			success:function(data){
				if(data.data.dataList.length > 0){
					$.each(data.data.dataList,function(k,v){
						$('#avgMonth').append('<option value="' + v.avgMonth + '">' + v.avgMonth + '</option>')
					})
					loadGrid()
				}
			}
		})
	}

	$('#avgMonth').change(function(){
		$("#dataGrid").jqGrid('setGridParam', {
			postData: {
				avgMonth:$('#avgMonth').val()
			}
		}).trigger("reloadGrid");

	})

	$('.creatAvgDate').click(function(){
		var ids = $("#dataGrid").jqGrid('getGridParam','selarrrow');
		if(ids.length > 0){
			$.ajax({
				url:'/manager/inventory/expend/amortizedBill',
				type:'post',
				dataType:'json',
				traditional: true,
				data:{
					ids:ids,
					avgMonth:$('#avgMonth').val()
				},
				success:function(data){
					if(data.result == '1'){
						$.zxsaas_plus.showalert('success',data.desc)
						setTimeout(function(){
							$("#dataGrid").jqGrid('setGridParam', {
								postData: {
									avgMonth:$('#avgMonth').val()
								}
							}).trigger("reloadGrid");
						},1500)


					}


				}
			})
		}else{
			$.zxsaas_plus.showalert('warning','请选择一条数据')
		}

	})

	function loadGrid(){
		$.jgrid.defaults.width = 1280;
		$.jgrid.defaults.responsive = true;
		$.jgrid.defaults.styleUI = 'Bootstrap';
		$("#dataGrid").jqGrid({
			mtype: "POST",
			url: '/manager/inventory/expend/selectAvgList',
			postData: {
				avgMonth:$('#avgMonth').val()
			},
			datatype: "json",
			shrinkToFit: false,
			pager: "#dataGridPager",
			rowList: [100, 200, 500],
			rowNum: 100,
			autowidth: true,
			rownumbers: true, // show row numbers
			rownumWidth: 50, // the width of the row numbers columns
			width: "100%",
			height: $(window).height() * 0.8,
			sortable: false,
			viewrecords: true,
			sortorder: "desc",
			colNames: ['id','单据号','单据日期','待摊月数','往来单位','支出类别','费用归集部门','合计金额','已摊销金额','待摊销金额','本次摊销金额','备注'],
			footerrow: true,
			userDataOnFooter: true,
			colModel: [
				{name: 'id', width: 150, align: 'center', hidden: true},
				{name: 'billsCode', width: 250, align: 'center'},
				{name: 'billsDate', width: 150, align: 'center'},
				{name: 'avgMonth', width: 150, align: 'center'},
				{name: 'unitName', width: 250, align: 'center'},
				{name: 'inpayClassNames', width: 150, align: 'center'},
				{name: 'sectionNames', width: 150, align: 'center'},
				{name: 'sumAmount', width: 150, align: 'center'},
				{name: 'amortizedAmount', width: 150, align: 'center'},
				{name: 'noAmortizedAmount', width: 150, align: 'center'},
				{name: 'amout', width: 150, align: 'center'},
				{name: 'remark', width: 150, align: 'center'},
			],
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
				$('#dataGrid').resize()

			},
			onCellSelect: function (rowid, index, contents, event) {

				var info = $("#rpGrid").getRowData(rowid)
				var billsCode = info.billsCode == '草稿单' ? '' : info.billsCode

				if (event.target.className == 'billsCodeStyle') {
					window.top.openWorkBoxByMenutext('收入单',   '/manager/inventory/income/incomeBill?billsId='+rowid+'&billsCode='+billsCode, true)
				}

			},
			loadComplete: function (data) {
				$('#dataGrid').resize()
				if (Object.keys(data.data).length == 0 || data.result == -999) {
					$('.loadingImgBox').hide()
					$('.notFounImgBox').hide()
					return
				} else {
					$('.loadingImgBox').hide()
					$('.notFounImgBox').hide()
					$('#rpContainer').show()
				}
				$('#dataGrid td').css('text-overflow','ellipsis')

				if (data.data.rows.length > 0) {
					var info = data.data.rows

					$.each(info, function (k, v) {
						$('#dataGrid tr td[aria-describedby="rpGrid_billsCode"]').addClass('billsCodeStyle');
					})

					$('.footrow td:first-child').html('合计');
					// var rowNum = parseInt($(this).getGridParam('records'), 10);
					// if (rowNum > 0) {
						$(".ui-jqgrid-sdiv").show();
						var footerData = data.data.totalVo;
						$(this).footerData("set", footerData, false);
						var sumAmount = $('#dataGrid').getCol('sumAmount', false, 'sum');
						var amortizedAmount = $('#dataGrid').getCol('amortizedAmount', false, 'sum');
						var noAmortizedAmount = $('#dataGrid').getCol('noAmortizedAmount', false, 'sum');
						var amout = $('#dataGrid').getCol('amout', false, 'sum');
						$('#dataGrid').footerData("set", {
							"sumAmount": '<font color="red" >' + Number(sumAmount).toFixed(2) + '</font>',
							"amortizedAmount": '<font color="red" >' + Number(amortizedAmount).toFixed(2) + '</font>',
							"noAmortizedAmount": '<font color="red" >' + Number(noAmortizedAmount).toFixed(2) + '</font>',
							"amout": '<font color="red" >' + Number(amout).toFixed(2) + '</font>',
						}, false);
					// }
					// else {
					// 	$(".ui-jqgrid-sdiv").hide();
					// }

					//分页滚动条 置顶
					$("#dataGrid").parents(".ui-jqgrid-bdiv")[0].scrollTop = 0;

					//数据请求成功之后，若果有要操作数据的行为，在这里执行


				} else {
					$('.loadingImgBox').hide()
				}
			},
			ondblClickRow: function (id) {

			},
		});

	}


})