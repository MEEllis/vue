var lastrowImei;
var lastcellImei;
var AppEvent = $({});
// 引入在库串号右边栏状态刷新
AppEvent.on('rightRefresh', function(event, rowIds) {
	$('.seletImNumber').html(rowIds.length);
});
// 引入在库串号左边栏状态刷新
AppEvent.on('leftRefresh', function(event, rowIds) {
	if (!rowIds.length) {
		$('.leftRefresh_info').text('在库未选择串号信息');
		$('#jqGrid_tranNumber').jqGrid('resetSelection');
	} else {
		$('.leftRefresh_info').text('在库串号信息');
	}
});
//在线串号引入
$(document).on('click', '.numberPlus', function(e) {
	loadtableRight();

	/********************************每次点击弹窗的时候，保存上次弹窗的数据，然后清空上次弹窗的数据，填入这次弹窗数据************************************/
	$("#jqGrid_tranNumber2").jqGrid("clearGridData");
	$("#jqGrid_tranNumber").jqGrid("clearGridData");

	var rowData = $("#jqGrid_SubjectBalance").jqGrid("getRowData", jqgridRowId);
	var sectionId = '';
	switch (num) {
		case '7':
			sectionId = $('#outDepartmentId').val();
			reloadGridLeft();
			break;
		case '8':
			sectionId = $('#outDepartmentId').val();
			reloadGridLeft();
			break;
		case '10':
			sectionId = $('#sectionId').val();
			reloadGridLeft();
			break;
		case '11':
			sectionId = $('#sectionId').val();
			reloadGridLeft2();
			break;
		case '14':
			sectionId = $('#sectionId').val();
			reloadGridLeft();
			break;
		default:
			break;
	}

	function reloadGridLeft() {
		//左边获取在库串号信息
		$('#imeiGoodsName').val(rowData.goodsName); //商品信息
		$('#imeiStorageName').val(rowData.storageName); //仓库名称
		$("#jqGrid_tranNumber").jqGrid('setGridParam', {
			url: basePath + '/imei/interfaceImportImei',
			postData: {
				storageId: rowData.storageId,
				goodsId: rowData.goodsId,
				sectionId: sectionId
			}, //发送数据 
			page: 1
		}).trigger("reloadGrid"); //重新载入 
	}

	function reloadGridLeft2() {
		//左边获取在库串号信息
		$('#imeiGoodsName').val(rowData.goodsName); //商品信息
		$('#imeiStorageName').val($('#outStorageId option:selected').html()); //仓库名称
		$("#jqGrid_tranNumber").jqGrid('setGridParam', {
			url: basePath + '/imei/interfaceImportImei',
			postData: {
				storageId: $('#outStorageId').val(),
				goodsId: rowData.goodsId,
				sectionId: sectionId
			}, //发送数据 
			page: 1
		}).trigger("reloadGrid"); //重新载入 
	}

	if (imDetaiList2[jqgridRowId] != null) {
		$(imDetaiList2[jqgridRowId]).each(function(index, yu) {
			$('#jqGrid_tranNumber2').jqGrid('addRowData', index, yu);
		});
		$('.seletImNumber').html(imDetaiList2[jqgridRowId].length);
	}
	$('#hintStr').val('');
});

function loadtableLeft() {
	$("#jqGrid_tranNumber").jqGrid({
		url: basePath + '/imei/interfaceImportImei',
		mtype: "GET",
		datatype: "json",
		jsonReader: {
			root: "data.rows",
			page: "data.page",
			total: "data.total",
			records: "data.records",
			repeatitems: false
		},
		colNames: ['串号', '辅助串号', '备注', '主表id', '数量表id', '商品移库数量表id', '仓库id', '商品id', '入库价', '成本价'],
		colModel: [{
				name: 'imei',
				index: 'imei',
				align: 'center',
				sortable: false,
				key: true
			}, {
				name: 'auxiliaryImei',
				index: 'auxiliaryImei',
				align: 'center',
				sortable: false
			}, {
				name: 'remark',
				index: 'remark',
				align: 'center',
				hidden: false,
				sortable: false
			},
			//{name:'id',index:'id',hidden:true,sortable:false},
			{
				name: 'billsMainId',
				index: 'billsMainId',
				hidden: true,
				sortable: false
			}, {
				name: 'otherOutstroNumId',
				index: 'otherOutstroNumId',
				hidden: true,
				sortable: false
			}, {
				name: 'transferNumId',
				index: 'transferNumId',
				hidden: true,
				sortable: false
			}, {
				name: 'storageId',
				index: 'storageId',
				hidden: true,
				sortable: false
			}, {
				name: 'goodsId',
				index: 'goodsId',
				hidden: true,
				sortable: false
			}, {
				name: 'inStoragePrices',
				index: 'inStoragePrices',
				hidden: true,
				sortable: false
			}, {
				name: 'costPrice',
				index: 'costPrice',
				align: 'center',
				hidden: true,
				sortable: false
			}

		],
		sortable: false,
		rownumbers: true,
		cellsubmit: 'clientArray', //单元格保存内容的位置		
		editurl: 'clientArray',
		rowNum: 15,
		rowList: [1, 2, 10, 15, 20, 25, 40],
		pager: "#gridpager_tranNumber",
		viewrecords: true,
		multiselect: true,
		cellEdit: false, //点击行勾选复选框
		height: $(window).height() * 0.45,
		autowidth: true,
		autoScroll: false,
		rownumWidth: 35, // the width of the row numbers columns
		shrinkToFit: false, //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
		footerrow: false, //设置表格显示表脚
		userDataOnFooter: false //设置userData 显示在footer里

	});

}

function loadtableRight() {
	$("#jqGrid_tranNumber2").jqGrid({
		//url:optionsRight.LoadTableUrl,
		mtype: "GET",
//		datatype: "local",
		//datastr: mydata,
		datatype: "json",
		//data:mydata,
		//datatype:"local",						
		//editurl: 'clientArray',
		jsonReader: {
			root: "rows",
			repeatitems: false
		},
		//cellsubmit: 'clientArray',//单元格保存内容的位置
		colNames: ['串号', '备注', '辅助串号', 'ID', '主表id', '数量表id', '商品移库数量id', '仓库id', '商品id', '新增人id', '新增时间', '入库价', '成本价'],
		colModel: [{
			name: 'imei',
			index: 'imei',              
			align: 'center',
			sortable: false
		}, {
			name: 'remark',
			index: 'remark',
			align: 'center',
			sorttype: 'string',
			editable: true,
			sortable: false,
			editoptions: {
				dataEvents: [{
					type: "blur",
					fn: saveCellImei
				}]
			}
		}, {
			name: 'auxiliaryImei',
			index: 'auxiliaryImei',
			hidden: true,
			sortable: false
		}, {
			name: 'id',
			index: 'id',
			hidden: true,
			sortable: false
		}, {
			name: 'billsMainId',
			index: 'billsMainId',
			hidden: true,
			sortable: false
		}, {
			name: 'otherOutstroNumId',
			index: 'otherOutstroNumId',
			hidden: true,
			sortable: false
		}, {
			name: 'transferNumId',
			index: 'transferNumId',
			hidden: true,
			sortable: false
		}, {
			name: 'storageId',
			index: 'storageId',
			hidden: true,
			sortable: false
		}, {
			name: 'goodsId',
			index: 'goodsId',
			hidden: true,
			sortable: false
		}, {
			name: 'createBy',
			index: 'createBy',
			hidden: true,
			sortable: false
		}, {
			name: 'createDateString',
			index: 'createDateString',
			hidden: true,
			sortable: false
		}, {
			name: 'inStoragePrices',
			index: 'inStoragePrices',
			hidden: true,
			sortable: false
		}, {
			name: 'costPrice',
			index: 'costPrice',
			align: 'center',
			hidden: true,
			sortable: false
		}],
		sortable: false,
		rownumbers: true,
		//loadonce: true,
		rowNum: 20,
		rowList: [20, 25, 40],
		pager: "#gridpager_tranNumber2",
		pagerpos: 'left',
		viewrecords: true,
		multiselect: true,
		//cellEdit:true, //编辑
		width: "100%",
		height: $(window).height() * 0.44,
		autowidth: true,
		rownumWidth: 35, // the width of the row numbers columns
		shrinkToFit: false, //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
		ondblClickRow: function(id) {
			//双击进入编辑
			var delid = id;
		},
		beforeEditCell: function(rowid, cellname, v, iRow, iCol) {
			lastrowImei = iRow;
			lastcellImei = iCol;
		},
		gridComplete: function() {
			$('#jqGrid_tranNumber').setGridWidth(536);
			$("#jqGrid_tranNumber2").setGridWidth(388);
		},
		//数据加载完成后
		loadComplete: function(data) {
			$('.selectNum').html(data.rows.length);
		},
		loadError: function(xhr, status, error) {}
	})
}

/***save ***/
function saveCellImei() {
	$("#jqGrid_tranNumber2").jqGrid("saveCell", lastrowImei, lastcellImei);
}

/***button 确定保存串号***/
function saveImei() {
	imDetaiList3[jqgridRowId] = [];
	//保存上次弹窗的数据
	var rightRowIds = $("#jqGrid_tranNumber2").getDataIDs();
	$(rightRowIds).each(function(index, element) {
		var rowData = $("#jqGrid_tranNumber2").jqGrid("getRowData", element);
		imDetaiList3[jqgridRowId].push(rowData);
	});
	imDetaiList2[jqgridRowId] = imDetaiList3[jqgridRowId];
	var rowData2 = $("#jqGrid_SubjectBalance").jqGrid("getRowData", jqgridRowId);
	$("#jqGrid_SubjectBalance").jqGrid('setCell', jqgridRowId, 'goodsNumber', imDetaiList2[jqgridRowId].length);
	if (num != '11') arithmeticNo(jqgridRowId, rowData2.price, imDetaiList2[jqgridRowId].length);
	$('#numberChoose').modal('hide');
	footerData();
}

/**
 * 修改表格底部
 */
function footerData() {
	var footerNumber = $("#jqGrid_SubjectBalance").getCol('goodsNumber', false, 'sum');
	var footerAmount = $("#jqGrid_SubjectBalance").getCol('amount', false, 'sum');

	$("#jqGrid_SubjectBalance").jqGrid('footerData', 'set', {
		goodsNumber: footerNumber,
		amount: footerAmount
	});
}

/***button 右移所有***/
function rightAll() {
	var rightRowIds = $('#jqGrid_tranNumber2').getDataIDs();
	var maxId = rightRowIds.length ? Math.max.apply(null, rightRowIds) : 0;
	var leftRowIds = $("#jqGrid_tranNumber").getDataIDs();
	// 右边栏串号集合
	var imeis = [];
	$(rightRowIds).each(function(i, v) {
		var row = $('#jqGrid_tranNumber2').jqGrid('getRowData', v);
		imeis.push(row.imei);
	});
	$(leftRowIds).each(function(i, v) {
		var row = $('#jqGrid_tranNumber').jqGrid('getRowData', v);
		if (imeis.indexOf(row.imei) > -1) {
			$('#hintStr').val($('#hintStr').val() + row.imei + '串号已选择，重复出现一次');
		} else {
			$('#jqGrid_tranNumber2').jqGrid('addRowData', maxId + 1, row);
			$('#jqGrid_tranNumber').jqGrid('delRowData', v);
			maxId++;
		}
	})
	var newRightRowIds = $("#jqGrid_tranNumber2").getDataIDs();
	var newLeftRowIds = $('#jqGrid_tranNumber').getDataIDs();
	AppEvent.trigger('rightRefresh', [newRightRowIds]);
	AppEvent.trigger('leftRefresh', [newLeftRowIds]);
}


/***button 右移***/
function rightSome() {
	var rightRowIds = $('#jqGrid_tranNumber2').getDataIDs();
	var leftRowIds = $('#jqGrid_tranNumber').jqGrid('getGridParam', 'selarrrow');
	var rightLength = rightRowIds.length; //右边长度
	//右边栏串号集合
	var imeis = [];
	$(rightRowIds).each(function(i, v) {
		var row = $('#jqGrid_tranNumber2').jqGrid('getRowData', v);
		imeis.push(row.imei);
	})
	$(leftRowIds).each(function(i, v) {
		var row = $('#jqGrid_tranNumber').jqGrid('getRowData', v);
		if (imeis.indexOf(row.imei) > -1) {
			$('#hintStr').val($('#hintStr').val() + row.imei + '串号已选择，重复出现一次');
		} else {
			$('#jqGrid_tranNumber2').jqGrid('addRowData', rightLength, row);
			$('#jqGrid_tranNumber').jqGrid('delRowData', v);
			rightLength++;
		}
	});
	var newRightRowIds = $("#jqGrid_tranNumber2").getDataIDs();
	var newLeftRowIds = $('#jqGrid_tranNumber').getDataIDs();
	AppEvent.trigger('rightRefresh', [newRightRowIds]);
	AppEvent.trigger('leftRefresh', [newLeftRowIds]);
}


/***button 左移所有***/
function leftAll() {
	var leftRowIds = $('#jqGrid_tranNumber').getDataIDs();
	var rightRowIds = $('#jqGrid_tranNumber2').getDataIDs();
	var maxId = leftRowIds.length ? Math.max.apply(null, leftRowIds) : 0;
	// 左边栏串号集合
	var imeis = [];
	$(leftRowIds).each(function(i, v) {
		var row = $('#jqGrid_tranNumber').jqGrid('getRowData', v);
		imeis.push(row.imei);
	});
	$(rightRowIds).each(function(i, v) {
		var row = $('#jqGrid_tranNumber2').jqGrid('getRowData', v);
		if (imeis.indexOf(row.imei) > -1) {
			$('#hintStr').val($('#hintStr').val() + row.imei + '串号已选择，重复出现一次');
		} else {
			$('#jqGrid_tranNumber').jqGrid('addRowData', maxId + 1, row);
			$('#jqGrid_tranNumber2').jqGrid('delRowData', v);
			maxId++;
		}
	});
	var newRightRowIds = $("#jqGrid_tranNumber2").getDataIDs();
	var newLeftRowIds = $('#jqGrid_tranNumber').getDataIDs();
	AppEvent.trigger('rightRefresh', [newRightRowIds]);
	AppEvent.trigger('leftRefresh', [newLeftRowIds]);
}
/***button 左移***/
function leftSome() {
	var leftRowIds = $('#jqGrid_tranNumber').getDataIDs();
	var rightRowIds = $('#jqGrid_tranNumber2').jqGrid('getGridParam', 'selarrrow');
	var maxId = leftRowIds.length ? Math.max.apply(null, leftRowIds) : 0;
	// 左边栏串号集合
	var imeis = [];
	$(leftRowIds).each(function(i, v) {
		var row = $('#jqGrid_tranNumber').jqGrid('getRowData', v);
		imeis.push(row.imei);
	});
	$(rightRowIds).each(function(i, v) {
		var row = $('#jqGrid_tranNumber2').jqGrid('getRowData', v);
		if (imeis.indexOf(row.imei) > -1) {
			$('#hintStr').val($('#hintStr').val() + row.imei + '串号已选择，重复出现一次');
		} else {
			$('#jqGrid_tranNumber').jqGrid('addRowData', maxId + 1, row);
			$('#jqGrid_tranNumber2').jqGrid('delRowData', v);
			maxId++;
		}
	});
	var newRightRowIds = $("#jqGrid_tranNumber2").getDataIDs();
	var newLeftRowIds = $('#jqGrid_tranNumber').getDataIDs();
	AppEvent.trigger('rightRefresh', [newRightRowIds]);
	AppEvent.trigger('leftRefresh', [newLeftRowIds]);
}

/***button  删除串号***/
function delLeftImei() {
	var rowIds = $("#jqGrid_tranNumber").jqGrid('getGridParam', 'selarrrow');
	$(rowIds).each(function(index, item) {
		$("#jqGrid_tranNumber").jqGrid("delRowData", item);
	});
	var newRowIds = $('#jqGrid_tranNumber').getDataIDs();
	AppEvent.trigger('leftRefresh', [newRowIds]);
}