//初始化
$(function () {
	initUI();//初始化UI

	initGrid();//初始化表格
	initDataGrid2();

	initEvents();//初始化事件

})

//初始化UI
function initUI() {

}

//初始化事件
function initEvents() {

	//注册窗口改变事件
	$(window).resize(wResize);
	wResize();
}

//窗口大小改变
function wResize() {
	$("#dataGrid").setGridHeight(250);
	$("#dataGrid").setGridWidth($(window).width() - 30);
	$("#dataGrid").closest(".ui-jqgrid-bdiv").css({"overflow-x": "hidden"});
	$("#dataGrid2").setGridHeight(250);
	$("#dataGrid2").setGridWidth($(window).width() - 30);
	$("#dataGrid2").closest(".ui-jqgrid-bdiv").css({"overflow-x": "hidden"});


}

var importArr = []
var importDetailArr = []
var importDetailListArr = []

var sotrageList = []
var selectIds = ''

//返回选中引入的单据 (保存并切换仓库)
function sendDataToParentPage(data) {

	if ($('#storageName').data('id') == '') {
		$.zxsaas_plus.showalert('提示', '请先选择入库仓库')
		return false
	}

	var row;
	try {
		// if (arguments.length == 1) {
		//
		// } else {
		$('#dataGrid2').saveCell(dataGrid2.lastrow,dataGrid2.lastcell)
		var ids = $('#dataGrid').jqGrid('getGridParam', 'selarrrow');
		if (ids.length > 1 || ids.length < 1) {
			$.MsgBox('操作提示', '请选中一行数据');
			return;
			row = [];
		} else {
			row = $("#dataGrid").jqGrid('getRowData', ids[0]);
		}
		// }
		row.orderDetailList = dataGrid2.getGridDataList();

		if (row.orderDetailList.length == 0) {
			$.MsgBox('操作提示', '本次入库不能为0');
			return;
		} else {



			var importLen = 0
			for (var i = 0; i < row.orderDetailList.length; i++) {

			}
			var idsArr = $('#dataGrid2').getDataIDs()
			$.each(idsArr, function (k, v) {
				var nowIntroduceNum = $('#dataGrid2').getCell(v,'nowIntroduceNum')
				importLen += (nowIntroduceNum * 1)
				$("#dataGrid2").setCell(v, 'hasImport', $("#dataGrid2").getCell(v, 'hasImport') * 1 + nowIntroduceNum * 1)
			})
			var storageArr = []
			$.each(sotrageList, function (k, v) {
				storageArr.push(v.split(',')[0])
			})

			$.each(row.orderDetailList, function (k, v) {

				var imeiListArr = importDetailListArr[v.id] == undefined || storageArr.indexOf($('#storageName').val()) == -1 ? [] : JSON.parse(importDetailListArr[v.id].imeiList)
				if (v.ifManageImei == 'true') {
					$.each(JSON.parse(v.imeiList), function (a, b) {
						imeiListArr.push(b)
					})
				}
				importDetailListArr[v.id] = {
					hasImport: v.nowIntroduceNum * 1 + v.hasImport * 1,
					notIntroduceNum: v.notIntroduceNum,
					imeiList: JSON.stringify(imeiListArr)
					// nowIntroduceNum: v.nowIntroduceNum,
				}
				sotrageList.push($('#storageName').val() + ',' + v.goodsId)
			})
			var storageId = $('#storageName').data('id')

			importArr[row.orderDetailList[0].billsCode] = {
				storageId: storageId,
				importLen: importArr[row.orderDetailList[0].billsCode] == undefined ? importLen * 1 : importLen * 1 + importArr[row.orderDetailList[0].billsCode].importLen * 1,
				importDetailListArr: importDetailListArr
			}

			var id = $('#dataGrid').jqGrid('getGridParam', 'selarrrow');
			$('#dataGrid').setCell(id, 'hasImport', $('#dataGrid').getCell(id, 'hasImport') * 1 + importLen)
			$('#dataGrid').setCell(id, 'notIntroduceNum', $('#dataGrid').getCell(id, 'notIntroduceNum') * 1 - importLen)
		}

		parent.callBack(row, data);

		$('.storageBox').show()

		var quchong = function (arr) {
			var len = arr.length;
			arr.sort();
			for (var i = len - 1; i > 0; i--) {
				if (arr[i] == arr[i - 1]) {
					arr.splice(i, 1);
				}
			}
			return arr;
		}
		var storageArr = []
		$.each(sotrageList, function (k, v) {
			storageArr.push(v.split(',')[0])
		})

		$('.storageLen').html(quchong(storageArr).length)
		$('.storageBox').attr('title', storageArr.join(','))
		selectIds = null

		if (data == 1) {

			$('.showModalBtn').show();
			$('#storageName').parent().find('.modal').modal('show')
			$("input[name='contactsunitName']").val(row.contactsunitName)
			$("input[name='contactsunitId']").val(row.contactsunitId)
			$('#dataGrid').jqGrid('setGridParam', {
				datatype: 'json',
				postData: {contactsunitId:row.contactsunitId},
				page: 1
			}).trigger("reloadGrid");
			selectIds = ids[0]



			// $('#storageName').val('').data('id', '');
		}
	} catch (e) {
		console.log(e);
	}
}

//取消引用
function cancleSelect() {

	try {
		parent.callBack([]);
	} catch (e) {
		console.log(e);
	}
}

/****************************************** 单据主表 开始********************************************************/

var lastSelectRow = null;
var currRowIds = null;

var importObj = {}

//初始化表格
function initGrid() {
	function formatterDetailList(cellvalue, options, rowObject) {
		if (_.isString(cellvalue)) {
			return cellvalue;
		} else {
			return JSON.stringify(cellvalue);
		}
	}

	function formatterDate(cellvalue, options, rowObject) {
		if (!isNaN(cellvalue)) {
			var date = new Date();
			date.setTime(cellvalue);
			return $.DateFormat(date, "yyyy-MM-dd");
		} else {
			return cellvalue;
		}
	}

	function formatterTime(cellvalue, options, rowObject) {
		if (!isNaN(cellvalue)) {
			var date = new Date();
			date.setTime(cellvalue);
			return $.DateFormat(date, "yyyy-MM-dd hh:mm:ss");
		} else {
			return cellvalue;
		}
	}

	//配置
	var paras = {
		gridId: 'dataGrid',
		pageUrl: basePath + '/IorderMain/page2',
		colNames: ['单据编号', '单据日期', '往来单位', '往来单位', '部门名称', '部门名称', '订货总额', '订货量', '已入库', '本单已引', '余量', '备注', '明细'],
		colModel:
			[
				{name: 'billsCode', index: 'INDEX', align: 'center', sortable: false},
				{
					name: 'billsDate',
					index: 'TICKET_CODE',
					width: 120,
					fixed: true,
					align: 'center',
					formatter: formatterDate,
					sortable: false
				},
				{
					name: 'contactsunitId',
					index: 'TICKET_NAME',
					width: 100,
					align: 'center',
					sortable: false,
					hidden: true
				},
				{name: 'contactsunitName', index: 'TICKET_NAME', width: 100, align: 'center', sortable: false},
				{name: 'sectionId', index: 'TICKET_NAME', width: 100, align: 'center', hidden: true, sortable: false},
				{name: 'sectionName', index: 'TICKET_TYPE', width: 100, align: 'center', sortable: false},
				{name: 'billsAmount', index: 'TICKET_AMOUNT', width: 100, align: 'center', sortable: false},
				{
					name: 'reviewsNum',
					index: 'TICKET_AMOUNT',
					width: 100,
					align: 'center',
					sortable: false,
					formatter: 'integer'
				},
				{
					name: 'introduceNum',
					index: 'TICKET_AMOUNT',
					width: 100,
					align: 'center',
					sortable: false,
					formatter: 'integer'
				},
				{
					name: 'hasImport',
					index: 'hasImport',
					width: 100,
					align: 'center',
					sortable: false,
					formatter: 'integer'
				},
				{
					name: 'notIntroduceNum',
					index: 'TICKET_AMOUNT',
					width: 100,
					align: 'center',
					sortable: false,
					formatter: 'integer'
				},
				{name: 'remark', index: 'remark', width: 100, align: 'center', sortable: false},
				{
					name: 'orderDetailList',
					index: 'orderDetailList',
					width: 100,
					align: 'center',
					sortable: false,
					hidden: true,
					formatter: formatterDetailList
				},

			]
	};
	$("#" + paras.gridId).jqGrid({
		url: paras.pageUrl,
		datatype: "json",
		colNames: paras.colNames,
		colModel: paras.colModel,
		styleUI: 'Bootstrap',
		pager: '#jqGridPager',
		jsonReader: {root: "data.rows", total: "data.total", records: "data.records", repeatitems: false},
		mtype: "POST",
		rownumbers: true,
		viewrecords: true,
		multiselect: true,
		multiboxonly: true,
		caption: "",
		rowNum: 10,
		autowidth: true,
		onSortCol: function (index, iCol, sortorder) {
		},
		ondblClickRow: function (rowid, iRow, iCol, e) {
			var currRow = $("#" + paras.gridId).jqGrid('getRowData', rowid);

			//sendDataToParentPage(currRow);
		},
		beforeSelectRow: function (rowid, e) {
			$('#dataGrid').jqGrid('resetSelection')
			return (true);
		},
		onCellSelect: function (rowid, iCol, cellcontent, e) {

			var currRow = $("#" + paras.gridId).jqGrid('getRowData', rowid);
			currRow.rowid = rowid;
//			if(lastSelectRow != null){
//				lastSelectRow.orderDetailList = JSON.stringify(dataGrid2.getGridDataList());
//				$("#"+paras.gridId).jqGrid('setRowData', lastSelectRow.rowid ,lastSelectRow);
//			}else{
//				lastSelectRow = currRow;
//			}
			$('.showModalBtn').show();
			// $('#storageName').val('').data('id', '');
			dataGrid2.$grid.jqGrid('clearGridData');

			showDetailList(JSON.parse(currRow.orderDetailList), currRow.billsCode);

			currRowIds = rowid;
			//parent.clearInputImeiGrid33Array();

		},
		postData: getQueryModel(),
		loadComplete: function (data) {
			$("#loadingDiv").hide();

			try {
				if (data.result == 1) {
					$.each(data.data.rows, function (k, v) {
						if (importArr[v.billsCode] != undefined) {
							$("#dataGrid").setCell(v.id, 'hasImport', importArr[v.billsCode].importLen)
							$("#dataGrid").setCell(v.id, 'notIntroduceNum', ($("#dataGrid").getCell(v.id, 'notIntroduceNum') * 1 - importArr[v.billsCode].importLen))
						}
					})
					if(selectIds != null){
						$('#dataGrid').jqGrid('setSelection',selectIds)
					}
					wResize();
				} else {
					$.MsgBox('出错提示', data.desc);
				}
			} catch (e) {
				console.log(e);
			}
		}
	});
}

//获取分页查询参数
function getQueryModel() {
	var contt = parent.getContactsunit();
	$("input[name='contactsunitName']").val(contt.contactsunitName);
	$("input[name='contactsunitId']").val(contt.contactsunitId);

//	var postData = $("#dataGrid").jqGrid("getGridParam", "postData");
//    $.each(postData, function (k, v) {
//        delete postData[k];
//    });
	var model = $("#topForm").toJsonObject();
	model.contactsunitId = contt.contactsunitId;
	model.isDraftOp = false;

	model.notIntroduceNumEqul0 = 1;
	return model;
}

//重新加载刷新数据
function reLoadGrid() {
	$("#loadingDiv").show();
	var model = getQueryModel();
	if (arguments.length == 1) {
		//混合对象
		$.extend(model, arguments[0]);
	}

	$("#dataGrid").jqGrid('setGridParam', {
		datatype: 'json',
		postData: model,
		page: 1
	}).trigger("reloadGrid"); //重新载入
	dataGrid2.$grid.jqGrid('clearGridData');
	$('html, body').animate({scrollTop: 0}, 'slow');
}

/****************************************** 单据主表 结束********************************************************/

/****************************************** 单据明细表 开始********************************************************/

//创建明细
function showDetailList(detailList, code) {

	for (var i = 0; i < detailList.length; i++) {
		var row = detailList[i];


		if (parseInt(row.notIntroduceNum) > 0) {

			//重新查询数据后， 获取已引入的数据
			if (row.storageIdList == undefined) {
				//已引入的数据
				var haveList = parent.queryDetailByOrderDetailId(row.id);
				if (haveList.length > 0) {
					var dataList = $.map(haveList, function (item) {
						var obj = {};
						obj.id = item.storageId;
						obj.name = item.storageName;
						obj.remark = item.remark;
						try {
							obj.imeiList = item.instrorageImList;
						} catch (e) {
							obj.imeiList = " ";
						}
						obj.goodsNumber = item.goodsNumber;
						return obj;
					});
					var innnum = 0;
					for (var j = 0; j < dataList.length; j++) {
						var obj = dataList[j];
						innnum = innnum + obj.goodsNumber;
					}
					row.nowIntroduceNum = innnum;
					// row.storageIdList = dataList;
					row.storageNameList = $.map(dataList, function (item) {
						return item.name;
					});
					// row.imeiList = JSON.stringify(dataList[0].imeiList)

				}
			}

			//只加载未入库量大于0的明细
			row.billsCode = code;
			if (importArr[code] != undefined && importArr[code].importDetailListArr != undefined && importArr[code].importDetailListArr[row.id] != undefined) {
				row.hasImport = importArr[code].importDetailListArr[row.id].hasImport;
				row.notIntroduceNum = importArr[code].importDetailListArr[row.id].notIntroduceNum;

			}
			row.nowIntroduceNum = 0

			row.nowIntroducePrice = row.price;

			dataGrid2.$grid.jqGrid('addRowData', i, row);
		}
	}
}


$('#storageName').modalsbox({
	grid: {
		id: 'storage',
		url: basePath + "/component/storage/getStorageVoPageList",
		param: {}
	},
	tree: {
		id: 'sectionIdAddNameTree',
		url: basePath + "/component/section/getAccessSectionTreeNodeVoList",
		param: {
			'sectionIsStore': 1
		}
	},
	multiselect: false,
	placeholder: '仓库',
	callback: function (info) {
		// $('.showModalBtn').hide();
		var ids = $('#dataGrid2').getDataIDs()
		if (ids.length <= 0) {
			return
		}
		var goodsId = []
		$.each(ids, function (k, v) {
			var info = $("#dataGrid2").getRowData(v)
			goodsId.push(info.goodsId)
		})
		$.ajax({
			type: 'post',
			dataType: 'json',
			url: '/manager/inventory/common/getStockCostGoodsVoList',
			data: {
				'menuCode': 'CGRKD',
				'storageIds': $('#storageName').data('id'),
				'goodsId': goodsId.join(',')
			},
			success: function (data) {
				var info = $("#dataGrid2").getDataIDs()
				var goodsIdArr = ['']
				$.each(info,function(k,v){
					goodsIdArr.push($('#dataGrid2').getRowData(v).goodsId)
					$('#dataGrid2').setCell(v, 'averagePrice',  0 )
				})
				$.each(data.data.dataList, function (k, v) {

					$('#dataGrid2').setCell(goodsIdArr.indexOf(v.goodsId + ''), 'averagePrice', data.data.dataList[k].averagePrice == null ? 0 : data.data.dataList[k].averagePrice)
				})
				var storageName = info.name
				storageIdListAll.storageName = []
			}
		})

	}
})


//获取 订单引入，单据明细的串号数据
function getFrameDataGrid2List() {
	var $domId = $("#orderReferenceModal .referenceFrame").contents().find("#dataGrid2")
	var ids = $domId.getDataIDs();
	var returnArr = [];
	$.each(ids, function (i, value) {
		var currRow = $domId.jqGrid('getRowData', value);
		if (currRow.ifManageImei == 'true' && $.trim(currRow.storageIdList) != '') {
			var storageIdList = JSON.parse(currRow.storageIdList);
			for (var int = 0; int < storageIdList.length; int++) {
				var storageInfo = storageIdList[int];
				if ("" != $.trim(storageInfo.imeiList)) {
					//串号商品
					returnArr["I" + i + storageInfo.id] = storageInfo;
				}
			}

		}
	})
	return returnArr;
}

//初始化表格
var dataGrid2 = null;
var lastrowid ,lastrow ,lastcell;
var storageIdListAll = {}

function initDataGrid2() {

	//配置
	var paras = {
		gridId: 'dataGrid2',
		noShowOp: false,
		addRow: {
			goodsId: '',
			goodsCode: '',
			goodsName: '',
			goodsBrandName: '',
			stockNumber: '',
			numControlFlag: '',
			imControlFlag: '',
			cxNum: '',
			cxPrice: '',
			price: '',
			remark: '',
			categoryName: '',
			code: '',
			brandName: '',
			models: '',
			color: ''
		},
		colNames: ['单据编号', 'storageId', '仓库名Id', '仓库名称', '商品名称', '商品名称', '订货量', '已入库', '本单已引', '余量', '本次引入', '订货单价', '本次入库价', '仓库成本价', '备注', '串号', '备注', '串号', '串号', '串号', '串号', '单据编号', '类别', '商品编码', '品牌', '型号', '颜色'],
		colModel:
			[
				{name: 'billsCode', width: 200, index: 'billsCode', align: 'center', sortable: false},
				{
					name: 'storageId',
					width: 200,

					index: 'storageId',
					align: 'left',
					sortable: false,
					hidden: true
				},
				{
					name: 'storageIdList',
					width: 200,
					index: 'storageIdList',
					align: 'left',
					sortable: false,
					hidden: true
				},
				{name: 'storageName', width: 200, index: 'storageName', align: 'left', sortable: false, hidden: true},
				{
					name: 'goodsId',
					index: 'goodsId',
					width: 200,
					align: 'left',
					sortable: false,
					hidden: true,
					formatter: 'integer'
				},
				{name: 'goodsName', sortable: false, width: 200, index: 'goodsName', align: 'left', editable: false},
				{
					name: 'reviewsNum',
					index: 'reviewsNum',
					width: 100,
					align: 'left',
					editable: false,
					sortable: false,
					formatter: 'integer'
				},
				{
					name: 'introduceNum',
					index: 'introduceNum',
					width: 100,
					align: 'left',
					editable: false,
					editrules: {number: true},
					formatter: 'integer',
					sortable: false
				},
				{
					name: 'hasImport',
					index: 'hasImport',
					width: 100,
					align: 'left',
					editable: false,
					editrules: {number: true},
					formatter: 'integer',
					sortable: false
				},
				{
					name: 'notIntroduceNum',
					index: 'notIntroduceNum',
					width: 100,
					align: 'left',
					editable: false,
					editrules: {number: true},
					formatter: 'integer',
					sortable: false
				},
				{
					name: 'nowIntroduceNum',
					index: 'nowIntroduceNum',
					width: 100,
					align: 'left',
					editable: false,
					sortable: false,
					classes:'editable',
					editoptions: {
                        onkeyup: "checkInput.clearNoNum(this,10)",
						dataEvents: [{
							type: "blur",
							fn: function () {

								var reviewsNum = $("#dataGrid2").getCell(lastrowid, 'reviewsNum') * 1
								var introduceNum = $("#dataGrid2").getCell(lastrowid, 'introduceNum') * 1
								var nowIntroduceNum = $(this).val() * 1
								var hasImport = $("#dataGrid2").getCell(lastrowid, 'hasImport') * 1
								if (nowIntroduceNum < 0) {
									$.zxsaas_plus.showalert("提示", '本次引入量不能小于零')
									$("#dataGrid2").setCell(lastrowid, 'nowIntroduceNum', '0')
									return
								}
								if (reviewsNum - nowIntroduceNum - hasImport - introduceNum < 0) {
									$.zxsaas_plus.showalert("提示", '本次引入量大于该商品余量')
									$("#dataGrid2").setCell(lastrowid, 'nowIntroduceNum', '0')
								} else {
									var storageIdList = []
									$("#dataGrid2").setCell(lastrowid, 'notIntroduceNum', reviewsNum - nowIntroduceNum - hasImport - introduceNum)
									var notIntroduceNum = $("#dataGrid2").getCell(lastrowid, 'notIntroduceNum') * 1
									var storageName = $("#storageName").val()
									var storageArr = []
									$.each(sotrageList, function (k, v) {
										storageArr.push(v.split(',')[0])
									})
									if(storageIdListAll.storageName == undefined){
										storageIdListAll.storageName = []
									}
									var storageIdListObj = {}
									storageIdListObj.goodsNumber = $(this).val()*1
									var dataGrid = parent.dataGrid
									var ids=dataGrid.$grid.getDataIDs();
									$.each(ids,function(k,v) {
										var storageNameGrid = dataGrid.$grid.jqGrid('getCell', v, "storageName")
										var goodsIdGrid = dataGrid.$grid.jqGrid('getCell', v, "goodsId")
										if(storageNameGrid == storageName){
											var goodsId = $("#dataGrid2").getCell(lastrowid, 'goodsId')
											if(goodsIdGrid == goodsId){
												var hasImportGrid = dataGrid.$grid.jqGrid('getCell', v, "goodsNumber")*1
												storageIdListObj.goodsNumber += hasImportGrid
												return
											}
										}
									})

									storageIdListObj.id = $('#storageName').data('id');
									storageIdListObj.name = $('#storageName').val();

									storageIdListAll.storageName[lastrowid] = storageIdListObj
									storageIdList.push(storageIdListObj)

									$("#dataGrid2").setCell(lastrowid, 'storageIdList', JSON.stringify(storageIdList))
								

									// $('#dataGrid2').saveCell(lastrowid+1,lastcell)
								}
							}
						}, {
							type: "keydown",
							fn: function (e) {
								if (e.keyCode == '13') {
									var reviewsNum = $("#dataGrid2").getCell(lastrowid, 'reviewsNum') * 1
									var introduceNum = $("#dataGrid2").getCell(lastrowid, 'introduceNum') * 1
									var nowIntroduceNum = $(this).val() * 1
									var hasImport = $("#dataGrid2").getCell(lastrowid, 'hasImport') * 1
									if (nowIntroduceNum < 0) {
										$.zxsaas_plus.showalert("提示", '本次引入量不能小于零')
										$("#dataGrid2").setCell(lastrowid, 'nowIntroduceNum', '0')
										return
									}
									if (reviewsNum - nowIntroduceNum - hasImport - introduceNum < 0) {
										$.zxsaas_plus.showalert("提示", '本次引入量大于该商品余量')
										$("#dataGrid2").setCell(lastrowid, 'nowIntroduceNum', '0')
									} else {
										var storageIdList = []
										$("#dataGrid2").setCell(lastrowid, 'notIntroduceNum', reviewsNum - nowIntroduceNum - hasImport - introduceNum)
										var notIntroduceNum = $("#dataGrid2").getCell(lastrowid, 'notIntroduceNum') * 1
										var storageName = $("#storageName").val()
										var storageArr = []
										$.each(sotrageList, function (k, v) {
											storageArr.push(v.split(',')[0])
										})
										if(storageIdListAll.storageName == undefined){
											storageIdListAll.storageName = []
										}
										var storageIdListObj = {}
										storageIdListObj.goodsNumber = $(this).val()*1
										var dataGrid = parent.dataGrid
										var ids=dataGrid.$grid.getDataIDs();
										$.each(ids,function(k,v) {
											var storageNameGrid = dataGrid.$grid.jqGrid('getCell', v, "storageName")
											var goodsIdGrid = dataGrid.$grid.jqGrid('getCell', v, "goodsId")
											if(storageNameGrid == storageName){
												var goodsId = $("#dataGrid2").getCell(lastrowid, 'goodsId')
												if(goodsIdGrid == goodsId){
													var hasImportGrid = dataGrid.$grid.jqGrid('getCell', v, "goodsNumber")*1
													storageIdListObj.goodsNumber += hasImportGrid
													return
												}
											}
										})

										storageIdListObj.id = $('#storageName').data('id');
										storageIdListObj.name = $('#storageName').val();

										storageIdListAll.storageName[lastrowid] = storageIdListObj
										storageIdList.push(storageIdListObj)

										$("#dataGrid2").setCell(lastrowid, 'storageIdList', JSON.stringify(storageIdList))


										// $('#dataGrid2').saveCell(lastrowid+1,lastcell)
									}
								}

							}
						},{
                            type: "focus",
                            fn: function(){
                                this.select()
                            }
                        }]
					}
				},
				{
					name: 'price',
					index: 'price',
					hidden: false,
					width: 100,
					editable: false,
					sortable: false,
					formatter: 'number'
				},
				{
					name: 'nowIntroducePrice',
					index: 'nowIntroducePrice',
					width: 100,
					hidden: false,
					editable: true,
					classes:'editable',
					sortable: false,
					formatter: 'number',
					editoptions: {
						dataEvents: [{
							type: "focus",
							fn: function () {
								this.select()
							}
						},
						{
							type: "blur",
							fn: function () {
								if ($(this).val() * 1 < 0) {
									$.zxsaas_plus.showalert('提示', '本次入库价应为正数')
									$('#dataGrid2').setCell(lastrowid,'nowIntroducePrice','0.00')
								}else{
									$('#dataGrid2').saveCell(dataGrid2.lastrow,dataGrid2.lastcell)
								}
							}
						},
						{
							type: "keydown",
							fn: function (e) {
								if (e.keyCode == '13') {
									if ($(this).val() < 0) {
										$.zxsaas_plus.showalert('提示', '本次入库价应为正数')
										$('#dataGrid2').setCell(lastrowid,'nowIntroducePrice','0.00')
									}else{
										$('#dataGrid2').saveCell(dataGrid2.lastrow,dataGrid2.lastcell)
									}
								}
							}
						}]
					}
				},
				{
					name: 'averagePrice',
					index: 'averagePrice',
					width: 100,
					hidden: false,
					editable: false,
					sortable: false,
					formatter: 'number'
				},
				{name: 'remark', index: 'remark', hidden: false, width: 200, editable: false, sortable: false},
				{name: 'imeiList', index: 'imeiList', hidden: true, width: 200, editable: false, sortable: false},
				{
					name: 'ifManageImei',
					index: 'ifManageImei',
					hidden: true,
					width: 200,
					editable: false,
					sortable: false
				},
				{
					name: 'ifEnableAuxliaryImei',
					index: 'ifEnableAuxliaryImei',
					hidden: true,
					width: 200,
					editable: false,
					sortable: false
				},
				{name: 'imeiLength', index: 'imeiLength', hidden: true, editable: true, sortable: false, hidden: true},
				{
					name: 'taxRate',
					index: 'taxRate',
					hidden: true,
					editable: true,
					sortable: false,
					formatoptions: {suffix: "%"},
					formatter: 'currency'
				},
				{
					name: 'auxliaryImeiLength',
					index: 'auxliaryImeiLength',
					hidden: true,
					editable: true,
					sortable: false,
					hidden: true
				},
				{name: 'id', width: 200, index: 'id', align: 'center', sortable: false, hidden: true},
				{
					name: 'categoryName',
					width: 200,
					sortable: false,
					index: 'categoryName',
					align: 'left',
					editable: false,
					hidden: true
				},
				{
					name: 'code',
					width: 200,
					sortable: false,
					index: 'code',
					align: 'left',
					editable: false,
					hidden: true
				},
				{
					name: 'brandName',
					width: 200,
					sortable: false,
					index: 'brandName',
					align: 'left',
					editable: false,
					hidden: true
				},
				{
					name: 'models',
					width: 200,
					sortable: false,
					index: 'models',
					align: 'left',
					editable: false,
					hidden: true
				},
				{
					name: 'color',
					width: 200,
					sortable: false,
					index: 'color',
					align: 'left',
					editable: false,
					hidden: true
				},
			],
	};
	var manySubmit;
	//回调函数
	var callBackList = {
		afterEditCell: function (rowid, name, val, iRow, iCol) {
		},
		afterSaveCell: function (rowid, name, val, iRow, iCol) {
		},
		onCellSelect: function (rowid, iCol, cellcontent, e) {

			lastrowid = rowid * 1;
			if (iCol == 12) {
				if ($('#storageName').data('id') == '') {
					$.zxsaas_plus.showalert('提示', '请先选择入库仓库')
					return false
				}

				var ids = $('#dataGrid').jqGrid('getGridParam', 'selarrrow');
				if (ids.length > 1 || ids.length < 1) {
					$.MsgBox('操作提示', '请选中一行数据');
					return;

				}

				$("#dataGrid2").setCell(rowid, "storageName", $('#storageName').val());
				$("#dataGrid2").setCell(rowid, "storageId", $('#storageName').data('id'));
				$("#dataGrid2").setColProp("nowIntroduceNum", {editable: false});

				try {
					var goodsInfo = $("#" + paras.gridId).jqGrid('getRowData', rowid);

					//判断是否数量录入 并判断是否串号管理
					if (goodsInfo.ifManageImei == "true") {
						//避免用户多次提交。 这里 串号管理的模态层没有遮盖住上一层的页面
						if (manySubmit) {
							clearTimeout(manySubmit)
						}
						manySubmit = setTimeout(function () {
							window.parent.openImeiInputModal2("dataGrid2", rowid);//打开输入框
						}, 150)
						// $("#dataGrid2").setCell(rowid, "notIntroduceNum", goodsInfo.reviewsNum * 1 - goodsInfo.hasImport * 1 - goodsInfo.introduceNum * 1);
					} else {
						$("#dataGrid2").setColProp("nowIntroduceNum", {editable: true});
					}
				} catch (e) {
				}
			}
		},
		summary: function (rowid, name, val, iRow, iCol) {
		},
		getGridDataList: function (rows) {
			//筛出不合格行
			return $.map(rows, function (row) {
				if (row.storageIdList != "" && row.storageIdList != " ") {
					row.storageIdList = JSON.parse(row.storageIdList);
					return row;
				}
			});
		}
	};
	dataGrid2 = new MyEiditGrid(paras, callBackList);

}

/****************************************** 单据明细表 结束********************************************************/




