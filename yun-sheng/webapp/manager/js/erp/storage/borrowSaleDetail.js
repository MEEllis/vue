/*******************************************存放一些全局变量  借入转采购******************************************/
var ibillsMainCC = new Object(); //借入归还单

var borrowSaleList = new Array(); //借入归还单集合

var importNumId2 = ''; //引入数量表id字符串

var pageNumber = 1; //当前页

var pageCount = 1; //最后页数

var lastrow; //行数

var lastcell; //列数

var num = '61'; //借入转采购

/*******************************************init******************************************/

$(function() {
	//初始化
	storageObj = new StorageObj(basePath);
	initBorrowSale(); //引入未归还表格
	borrowSaleModal(); //借入转采购表格
	filterSelect(); //查询数据
});

/***init 经手人***/
function initManagers() {
	//部门选择后才能选择经手人
	$('#managersUid').removeAttr('disabled');
	$('#managersUid').html('');
	var selectHtml = '';
	var sectionId = $('#sectionId').val();
	var managersUid = 'managersUid';
	storageObj.initManagers(sectionId, function(data) {
		var list = data.data.employeeVoList;
		if(list){
			$(list).each(function(index, yu) {
				selectHtml += '<option value="' + yu.id + '">' + yu.name + '</option>'
			});
		}
	});
	$('#' + managersUid).append(selectHtml);

}

/***init 当部门为空时***/
function initNull() {
	var selectHtml = '<option value="">请选择部门</option>';
	//禁选经手人
	$('#managersUid').attr('disabled', true);
	$('#managersUid').html('');
	$('#managersUid').append(selectHtml);
}

/*******************************************button******************************************/

/***button 切换单据***/
$("#slideThree").click(function() {
	$(".slideThree").toggleClass("color7D5F50"); //  0正式单据  1草稿单据
	$('#slideThree').prop('checked') ? $('#slideThree').val('0') : $('#slideThree').val('1');
	pageNumber = 1; //当前页
	pageCount = 1; //最后页数
	borrowSaleList = [];
	$('#ibillsHeadBorrowBack').clearForm(true);
	jQuery("#jqGrid_import").jqGrid("clearGridData");
	filterSelect();
});

/***button 新增***/
function onclickNewBills() {
	var status1 = false;
	var status2 = false;
	var params = $('#ibillsHeadBorrowBack').formToArray();
	var rowIds = $("#jqGrid_borrow").getDataIDs();
	params.billsCode = $('#billsCode').val();
	$(params).each(function(index, element) {
		if (element.value != "") {
			status1 = true;
			return false;
		}
	});
	status2 = rowIds.length == 0 ? false : true;
	if (status1 || status2) {
		//动过
		$.zxsaas_plus.showconfirm("", '当前页面数据未保存，是否放弃本次操作并打开一个新页面?', function() {
			if ($('#slideThree').prop('checked')) {
				//  0正式单据  1草稿单据
				$(".slideThree").toggleClass("color7D5F50");
				$('#slideThree').attr('checked', false);
				$('#slideThree').val('1');
			}
			$('#ibillsHeadBorrowBack').clearForm(true);
			jQuery("#jqGrid_borrow").jqGrid("clearGridData");
			ibillsMainCC = {};
			//赋值表尾
			$('#footerCompany').val('');
			$('#footerCreate').val('');
			$('#footerUpdate').val('');
			$('#footerPost').val('');
			//章子
			if ($('#slideThree').val() == 0) {
				$.showBillsStatus("billsStautsImg", ibillsMainCC.billsStatus);
			} else {
				$.showBillsStatus("billsStautsImg", "1");
			}
			//					$('#footerBack').val(ibillsMainCC.);
		}, function() {
			//				$("#slideThree").unbind( "change" );
			//				$("#slideThree").click();
		});
	} else {
		if ($('#slideThree').prop('checked')) {
			//  0正式单据  1草稿单据
			$(".slideThree").toggleClass("color7D5F50");
			$('#slideThree').attr('checked', false);
			$('#slideThree').val('1');
		}
	}
}

/***button 保存***/
function onClickExecute() {
	lastrow != undefined && $("#jqGrid_borrow").jqGrid("saveCell", lastrow, lastcell);
	var status2 = false;
	var rowIds = $("#jqGrid_borrow").getDataIDs();
	status2 = rowIds.length == 0 ? false : true;
	if (status2) {
		saveBills();
	}
}

/***button 删除***/
function onClickDelete() {
	if (ibillsMainCC != null && ibillsMainCC != undefined && ibillsMainCC.id != undefined && ibillsMainCC.id != null && ibillsMainCC.billsCode == undefined) {
		$.zxsaas_plus.showconfirm("", "是否删除当前单据?", function() {
			storageObj.deleteIbillsMainDraftCC(ibillsMainCC.id, 7, function(data) {
				var str = data.data.str;
				if (str == '删除失败!') {
					$.zxsaas_plus.showalert("提示信息", str);
					return false;
				}
				$('#ibillsHeadBorrowBack').clearForm(true);
				jQuery("#jqGrid_borrow").jqGrid("clearGridData");
				ibillsMainCC = {};
				upForm();
			});
		}, function() {

		});
	} else {
		$.zxsaas_plus.showalert("", "请选择一张草稿单删除!");
	}
}

/***button 过账红冲***/
function borrowSaleGzHc(num) {
	if (num == 1 && $('#slideThree').val() == 0) {
		$.zxsaas_plus.showalert("提示信息", "请选择一张草稿单过账!");
		return false;
	}
	if (num == 2 && $('#slideThree').val() == 1) {
		$.zxsaas_plus.showalert("提示信息", "请选择一张正式单红冲!");
		return false;
	}
	if ($.isEmptyObject(ibillsMainCC) || ibillsMainCC == undefined) {
		$.zxsaas_plus.showalert("提示信息", "请选择一张单据!");
		return false;
	}
	storageObj.borrowSale(ibillsMainCC.id, 'JRZCG', num, $('#hcTime').val(), function(data) {
		var str = data.data.str;
		$.zxsaas_plus.showalert("", str);
		if (str == '成功') {
			$("#slideThree").click();
		}
	});
}

/***button 红冲弹窗***/
function hcClick() {
	$('#hcModal').modal('show');
	
	$("#hcTime").val($("#billsDateString").val());
	getAuthList(setRTime)
	function setRTime(){
		$('#hcTime').datetimepicker({
		    lang:"ch",  //语言选择中文 
		    format:"Y-m-d",      //格式化日期
		    timepicker:false,    //关闭时间选项
		    todayButton:false,    //关闭选择今天按钮
		    maxDate:_authList.maxDate,  //设置红冲最大时间
		    minDate:$("#billsDateString").val()
		});
	}
}

/***button 过滤***/
function filterSelect() {
	//借入转采购单

	//查正式单 或  草稿单
	var statusBills;
	if ($('#slideThree').val() == 0) {
		statusBills = 0
	} else {
		statusBills = 1
	}
	storageObj.filterBorrowSaleDetail(num, pageNumber, statusBills, function(data) {
		ibillsMainCC = data.data.rows.length == 0 ? ibillsMainCC = {} : ibillsMainCC = data.data.rows[0];
		pageCount = data.data.total;
		if (!$.isEmptyObject(ibillsMainCC) && ibillsMainCC != undefined) {
			assign();
		} else {
			if ($('#slideThree').val() == 0) {
				$("#slideThree").unbind("change");
				$("#slideThree").click();
			} else {
				elseInitNull2();
			}
		}
	});
	if($('#slideThree').val() == 1){
		$('#billsDateString').inputCombination().timeControl()
	}
}

function elseInitNull2() {
	$('#ibillsHeadBorrowBack').clearForm(true);
	jQuery("#jqGrid_borrow").jqGrid("clearGridData");
	//赋值表尾
	$('#footerCompany').val('');
	$('#footerCreate').val('');
	$('#footerUpdate').val('');
	$('#footerPost').val('');
	//	$('#footerBack').val('');
	initNull();
	$.showBillsStatus("billsStautsImg", "1");
	if($('#slideThree').val() == 1){
		$('#billsDateString').inputCombination().timeControl()
	}
}

/***button 上一单***/
function upForm() {
	if ((pageNumber - 1) == 0) {
		$.zxsaas_plus.showalert("", "没有上一单!");
		return;
	}
	pageNumber = pageNumber - 1;
	filterSelect();
}

/***button 首单***/
function lastForm() {
	pageNumber = 1;
	filterSelect();
}

/***button 下一单***/
function downForm() {
	if ((pageNumber + 1) > pageCount) {
		$.zxsaas_plus.showalert("", "没有下一单!");
		return;
	}
	pageNumber = pageNumber + 1;
	filterSelect();
}

/***button 末单操作***/
function firstForm() {
	pageNumber = pageCount;
	filterSelect();
}

/*** 赋值 ***/
function assign() {
	importNumId2 = '';
	$('#ibillsHeadBorrowBack').clearForm(true);
	jQuery("#jqGrid_borrow").jqGrid("clearGridData");
	borrowSaleList = ibillsMainCC.borrowSaleList;
	//赋值表头
	var params = $('#ibillsHeadBorrowBack').formToArray();
	$(params).each(function(index, element) {
		var key = element.name;
		var value = eval("ibillsMainCC." + key);
		$('#' + key).val(value);
	});
	//根据部门选择仓库
	if (ibillsMainCC.sectionId != null) {
		initManagers();
	} else {
		initNull();
	}
	$('#sectionName3').val(ibillsMainCC.sectionName);
	$('#billsCode').val(ibillsMainCC.billsCode);
	$('#managersUid').val(ibillsMainCC.managersUid);
	//赋值表体
	if (borrowSaleList != undefined && borrowSaleList.length != 0) {
		for (var i = 0; i < borrowSaleList.length; i++) {
			if (importNumId2 != '') importNumId2 += ',';
			importNumId2 += borrowSaleList[i].id; //添加   单据数量表id
			borrowSaleList[i].borrowLendDateString = borrowSaleList[i].borrowDateString;
			borrowSaleList[i].borrowLendNum = borrowSaleList[i].borrowNum;
			$("#jqGrid_borrow").jqGrid('addRowData', i, borrowSaleList[i]);
		}
	}
	//赋值表尾
	$('#footerCompany').val(ibillsMainCC.companyName);
	$('#footerCreate').val(ibillsMainCC.createName);
	$('#footerUpdate').val(ibillsMainCC.updateName);
	$('#footerPost').val(ibillsMainCC.postName);
	//	$('#footerBack').val(ibillsMainCC.);
	//章子
	if ($('#slideThree').val() == 0) {
		$.showBillsStatus("billsStautsImg", ibillsMainCC.billsStatus);
	} else {
		$.showBillsStatus("billsStautsImg", "1");
	}
}

/*** 保存 ***/
function saveBills() {
	if ($('#slideThree').val() == 0 && ibillsMainCC != undefined && ibillsMainCC.importBills == 1) {
		//0正式单据
		billsUpdate2();

	} else if (ibillsMainCC != undefined && $('#slideThree').val() == 1) {
		//1草稿单据
		if (ibillsMainCC.importBills == 1) {
			//1.引入单据
			draftBillsImport2();
		} else {
			//0.新增单据
			draftBillsInsert2();
		}
	} else {
		$.zxsaas_plus.showalert("", "不能保存!");
	}
}

/***function 草稿单据-新增***/
function draftBillsInsert2() {
	var params = $('#ibillsHeadBorrowBack').formToArray();
	var rowIds = $("#jqGrid_borrow").getDataIDs();
	//获取表头
	$(params).each(function(index, element) {
		var key = element.name;
		ibillsMainCC[key] = element.value;
	});
	ibillsMainCC.billsType = '61';
	//获取表体
	ibillsMainCC.borrowSaleList = new Array();
	$(rowIds).each(function(index, element) {
		var rowData = $("#jqGrid_borrow").jqGrid("getRowData", element);
		if (rowData.borrowLendDateString == '' || rowData.goodsId == '' || rowData.borrowLendNum == '') {
			return true;
		}
		rowData.borrowDateString = rowData.borrowLendDateString;
		rowData.borrowNum = rowData.borrowLendNum;
		delete rowData.metaName;
		delete rowData.borrowLendNum;
		delete rowData.borrowLendDateString;
		delete rowData.deliveryDo;
		ibillsMainCC.borrowSaleList[element] = rowData;
	});

	//新增
	storageObj.saveNewBorrowSaleDetailDraft(ibillsMainCC, function(data) {
		var obj = data.data.row;
		if (obj != null) {
			$.zxsaas_plus.showalert("", "保存成功!");
			ibillsMainCC = obj;
			lastForm();
		} else {
			$.zxsaas_plus.showalert("", "保存失败!");
		}
	});
}

/***function 草稿单据-引入***/
function draftBillsImport2(copyString) {
	var params = $('#ibillsHeadBorrowBack').formToArray();
	var rowIds = $("#jqGrid_borrow").getDataIDs();
	//获取表头
	$(params).each(function(index, element) {
		var key = element.name;
		ibillsMainCC[key] = element.value;
	});
	//获取表体
	ibillsMainCC.borrowSaleList = new Array();
	$(rowIds).each(function(index, element) {
		var rowData = $("#jqGrid_borrow").jqGrid("getRowData", element);
		if (rowData.borrowLendDateString == '' || rowData.goodsId == '' || rowData.borrowLendNum == '') {
			return true;
		}
		rowData.borrowDateString = rowData.borrowLendDateString;
		rowData.borrowNum = rowData.borrowLendNum;
		delete rowData.metaName;
		delete rowData.borrowLendNum;
		delete rowData.borrowLendDateString;
		delete rowData.deliveryDo;
		ibillsMainCC.borrowSaleList[element] = rowData;
	});
	ibillsMainCC.importNumId = importNumId2;

	//修改草稿
	storageObj.saveBorrowSaleDetailDraft(ibillsMainCC, function(data) {
		var obj = data.data.row;
		if (obj != null) {
			if (copyString != 'copy') {
				$.zxsaas_plus.showalert("", "修改成功!");
				ibillsMainCC = obj;
				assign();
			} else {
				$.zxsaas_plus.showalert("", "复制成功!");
			}
		} else {
			$.zxsaas_plus.showalert("", "修改失败!");
		}
	});
}

/***function 正式单据-修改备注***/
function billsUpdate2(copyString) {
	var rowIds = $("#jqGrid_borrow").getDataIDs();
	//获取表头
	ibillsMainCC.remark = $('#remark').val();
	$(rowIds).each(function(index, element) {
		var rowData = $("#jqGrid_borrow").jqGrid("getRowData", element);
		if (rowData.storageId == '' || rowData.goodsId == '') {
			return true;
		}
		if (ibillsMainCC.borrowSaleList[element] != undefined) {
			ibillsMainCC.borrowSaleList[element].remark = rowData.remark;
		}
	});
	//修改正式单据
	storageObj.saveToOfficial(6, ibillsMainCC, function(data) {
		var obj = data.data.row;
		if (obj != null) {
			if (copyString != 'copy') {
				$.zxsaas_plus.showalert("", "修改成功!");
				ibillsMainCC = obj;
				assign();
			} else {
				$.zxsaas_plus.showalert("", "复制成功!");
			}
		} else {
			$.zxsaas_plus.showalert("", "修改失败!");
		}
	});
}

//打开往来单位引用对话框
function selectContactUnitReferenceOpen(str) {
	$('#contactUnitReferenceModal').modal('show');
	callBack = function() {
		if (arguments[0].length == 0) {
			$.zxsaas_plus.showalert("", "未选中任何行!");
			$('#contactUnitReferenceModal').modal('hide');
			return;
		}
		var contactUnit = arguments[0][0];

		//设置编辑器值
		$('#contactName').val(contactUnit.name);
		$('#contactsunitId').val(contactUnit.id);
		$('#contactUnitReferenceModal').modal('hide');
	};
}

/***onclick 引入记录***/
function importBorrowLend() {
	if ($('#contactsunitId').val() == null || $('#contactsunitId').val() == '') {
		$.zxsaas_plus.showalert("", "请先选择往来单位!");
		return false;
	}
	$('#showContactUnit').html($('#contactName').val());
	$('#importChoose').modal('show');
	var param = {};
	param.type = 1;
	param.contactId = $('#contactsunitId').val();
	$("#jqGrid_import").jqGrid('setGridParam', {
		url: basePath + "/jxc/storage/borrowManage/importBorrowOrLend",
		postData: param, //发送数据 
		page: 1
	}).trigger("reloadGrid"); //重新载入 

}

/***button 确定  引入借出未还回单据***/
function onclickImport(id) {
	$("#jqGrid_borrow").jqGrid("clearGridData");
	if (id != undefined && id != null && id != '') {
		var rowData = $("#jqGrid_import").jqGrid("getRowData", id);
		rowData.revertNum = rowData.surNum; //本次转采购数
		rowData.revertImei = rowData.imei; //本次转采购串号
		rowData.amount = rowData.cost;
		rowData.notBackNum = rowData.surNum - rowData.revertNum; //未归还剩余数量
		$('#jqGrid_borrow').jqGrid('addRowData', 0, rowData);
	} else {
		var selRowIds = $("#jqGrid_import").jqGrid('getGridParam', 'selarrrow');
		$(selRowIds).each(function(index, item) {
			var rowData = $("#jqGrid_import").jqGrid("getRowData", item);
			rowData.revertNum = rowData.surNum; //本次转采购数
			rowData.revertImei = rowData.imei; //本次转采购串号
			rowData.amount = rowData.cost;
			rowData.notBackNum = rowData.surNum - rowData.revertNum; //未归还剩余数量
			$('#jqGrid_borrow').jqGrid('addRowData', index, rowData);
		});
	}
	$('#importChoose').modal('hide');
}

/*******************************************jqgrid******************************************/
/**
 * 借入转采购
 */
function borrowSaleModal() {
	var options = {
		LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
		GetRowInfoUrl: "", //编辑时获取数据详细信息接口加载地址
		DelRowUrl: "", // 删除信息接口地址
		isSub: "", //是否有子级表格
		subLoadTableUrl: "", //子级表格数据来源地址
		TableName: "#jqGrid_borrow", //显示表格名称。遵照css选择器书写
		iconJsonUrl: "../json/icon.json",
		btnbox: ".btnbox ", //功能按钮存放容器。遵照css选择器书写	
		pager: "#jqGridPager_loan"
	};
	$.jgrid.defaults.width = 1280;
	$.jgrid.defaults.responsive = true;
	$.jgrid.defaults.styleUI = 'Bootstrap';
	var lastsel = ''; //最后一次选中的行
	var rightClickColid = ""; //右键列id
	var rightClickColIndex = 0; //右键index
	var mydata;
	var hid = false;
	var lock = false;
	var myobj = [];
	//var toggleflag=false;//冻结时候切换用
	var colNames = ['操作', '借入单号', '借入日期', '商品名称', '借入数量', '串号', '已转采购数', '已归还数', '未归还数', '本次转采购数', '本次转采购串号', '单价', '金额', '未归还剩余数量', '备注', 'id', '草稿单据id', '仓库id', '商品id', '借入日期', '借入数量', '新增人', '新增时间', '是否串号管理'];
	var JqGridColModel = [{
		name: 'deliveryDo',
		index: 'deliveryDo',
		width: 70,
		align: 'center',
		formatter: addAndDelete,
		sortable: false
	}, {
		name: 'refMainId',
		index: 'refMainId',
		width: 120,
		align: 'center',
		sortable: false
	}, {
		name: 'borrowLendDateString',
		index: 'borrowLendDateString',
		width: 120,
		align: 'center',
		sorttype: 'string',
		sortable: false
	}, {
		name: 'goodsName',
		index: 'goodsName',
		width: 120,
		align: 'center',
		sortable: false
	}, {
		name: 'borrowLendNum',
		index: 'borrowLendNum',
		width: 120,
		align: 'center',
		sorttype: 'string',
		sortable: false
	}, {
		name: 'imei',
		index: 'imei',
		width: 120,
		hidden: false,
		sortable: false
	}, {
		name: 'saleNum',
		index: 'saleNum',
		width: 120,
		hidden: false,
		sortable: false
	}, {
		name: 'backNum',
		index: 'backNum',
		width: 120,
		hidden: false,
		sortable: false
	}, {
		name: 'surNum',
		index: 'surNum',
		width: 120,
		hidden: false,
		sortable: false
	}, {
		name: 'revertNum',
		index: 'revertNum',
		width: 135,
		hidden: false,
		sortable: false,
		editable: true,
		editoptions: {
			dataEvents: [{
				type: "blur",
				fn: function(e) {
					var rex = /^[0-9]{0,10}$/;
					if (rex.test($(this).val())) {
						var rowid = $(this).parents("tr").attr("id");
						var surNum = $(this).parents("table").getCell(rowid, "surNum"); //未归还数
						var revertNum = $(this).val(); //本次还回数量
						$(this).parents("table").setCell(rowid, "notBackNum", surNum - revertNum); //总价
						$(this).parents("table").jqGrid("saveCell", lastrow, lastcell);
					} else {
						$.zxsaas_plus.showalert("提示", "请输入合法数字！");
						$(this).val('');
						$(this).parent().next().html('');
					}
				}
			}]
		}
	}, {
		name: 'revertImei',
		index: 'revertImei',
		width: 135,
		hidden: false,
		sortable: false,
		editable: true,
		editoptions: {
			dataEvents: [{
				type: "blur",
				fn: function(e) {
					var rex = /^[a-zA-Z0-9]{0,20}$/;
					if (rex.test($(this).val())) {
						var rowid = $(this).parents("tr").attr("id");
						var revertImei = $(this).val(); //本次还回数量
						var surNum = $(this).parents("table").getCell(rowid, "surNum"); //未归还数
						if (revertImei == '' || revertImei == null) {
							$(this).parents("table").setCell(rowid, "revertNum", 0); //总价
							$(this).parents("table").setCell(rowid, "notBackNum", surNum - 0); //总价
						} else {
							$(this).parents("table").setCell(rowid, "revertNum", 1); //总价
							$(this).parents("table").setCell(rowid, "notBackNum", surNum - 1); //总价
						}
						$(this).parents("table").jqGrid("saveCell", lastrow, lastcell);
					} else {
						$.zxsaas_plus.showalert("提示", "请输入合法数字！");
						$(this).val('');
						$(this).parent().next().html('');
					}
				}
			}]
		}
	}, {
		name: 'price',
		index: 'price',
		width: 120,
		align: 'center',
		sortable: false,
		editable: true,
		editoptions: {
			dataEvents: [{
				type: 'blur',
				fn: function(e) {
					var price = $(this).val();
					if (isNaN(price)) {
						$.zxsaas_plus.showalert('提示', '请输入合法数字！');
						$(this).val('');
						return false;
					} else {
						var rowid = $(this).parents('tr').attr('id');
						var row = $('#jqGrid_borrow').getRowData(rowid);
						var revertNum = row.revertNum;
						var amount = revertNum * price;
						if (isNaN(amount)) {
							$.zxsaas_plus.showalert('提示', '请输入合法数字！');
							$(this).val('');
							return false;
						}
						$('#jqGrid_borrow').setCell(rowid, 'amount', amount);
					}
				}
			}, {
				type: 'keydown',
				fn: function(e) {
					if(e.keyCode==13) $(this).trigger('blur');
				}
			}]
		}
	}, {
		name: 'amount',
		index: 'amount',
		width: 120,
		align: 'center',
		sortable: false
	}, {
		name: 'notBackNum',
		index: 'notBackNum',
		width: 135,
		hidden: false,
		sortable: false
	}, {
		name: 'remark',
		index: 'remark',
		width: 130,
		hidden: false,
		editable: true,
		sortable: false,
		editoptions: {
			dataEvents: [{
				type: "blur",
				fn: saveCell
			}]
		}
	}, {
		name: 'id',
		index: 'id',
		hidden: true,
		sortable: false
	}, {
		name: 'billsMainId',
		index: 'billsMainId',
		hidden: true,
		width: 100,
		align: 'center',
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
		name: 'borrowDateString',
		index: 'borrowDateString',
		hidden: true,
		sortable: false
	}, {
		name: 'borrowNum',
		index: 'borrowNum',
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
		name: 'isImei',
		index: 'isImei',
		hidden: true,
		sortable: false
	}];

	loadtable();
	//加载表格
	function loadtable() {
		$(options.TableName).jqGrid({
			//					url:options.LoadTableUrl,
			mtype: "GET",
			datatype: "json",
			jsonReader: {
				root: "rows",
				repeatitems: false
			},
			colNames: colNames,
			colModel: JqGridColModel,
			sortable: false,
			rownumbers: true,
			cellsubmit: 'clientArray', //单元格保存内容的位置		
			editurl: 'clientArray',
			rowNum: 15,
			rowList: [10, 15, 20, 25, 40],
			pager: options.pager,
			viewrecords: true,
			cellEdit: true,
			height: $(window).height() * 0.45,
			autowidth: true,
			width: '100%',
			rownumWidth: 35, // the width of the row numbers columns
			shrinkToFit: false, //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
			footerrow: true, //设置表格显示表脚
			userDataOnFooter: true, //设置userData 显示在footer里
			ondblClickRow: function(id) {
				//双击进入编辑
				var delid = id;

			},
			beforeEditCell: function(rowid, cellname, v, iRow, iCol) {
				lastrow = iRow;
				lastcell = iCol;
			},
			onCellSelect: function(id, index, e) {
				var colName = $(options.TableName).jqGrid('getGridParam', 'colModel')[index].name
				select_name = colName
				select_index = index;
				var ids = $(options.TableName).jqGrid('getDataIDs');
				//获得当前最大行号（数据编号）
				var maxid;
				maxid = (ids.length == 0) ? 0 : Math.max.apply(Math, ids);
				//						console.log(maxid);
				//当用户点击表格最后一行时,自动增加一行
				//						(id == maxid) && $(options.TableName).jqGrid('addRowData', maxid+1, {}, 'last' )
			},
			onSelectRow: function(id) {
				if (id != lastsel && lastsel != '') {
					$(options.TableName).jqGrid('saveRow', lastsel, {
						aftersavefunc: function(rowid, response) {

						}
					});
					footerData();
				}
				lastsel = id;
				var rec = $(options.TableName).jqGrid('getRowData', id);

				//footerData();


			},
			beforeSelectRow: function(rowid, e) {
				//数量修改  
				//   1    表示串号管理     
				//   0    数量管理
				var rowData = $("#jqGrid_borrow").getRowData(rowid);
				if (rowData.isImei == '1') {
					$('#jqGrid_borrow').setColProp('revertImei', {
						editable: true
					});
					$('#jqGrid_borrow').setColProp('revertNum', {
						editable: false
					});
				} else {
					$('#jqGrid_borrow').setColProp('revertImei', {
						editable: false
					});
					$('#jqGrid_borrow').setColProp('revertNum', {
						editable: true
					});
				}
			},
			afterInsertRow: function(rowid, aData) { //新增一行之后
				//						$("#jqGrid_borrow").jqGrid('setCell',rowid,'surNum',aData.borrowNum); 
			},
			gridComplete: function() {
				var ids = $(options.TableName).jqGrid("getDataIDs");
			},
			loadComplete: function(data) {
				//console.log(data);
				footerData();
				var arr = document.querySelectorAll('.number');
				//						arr.forEach(function(e){
				//							(e.dataset.rid == '') && (e.className = 'number');
				//							(e.dataset.rid == '') && (e.parentNode.dataset.target = '')
				//						});

				for (var i = 0, len = arr.length; i < len; i++) {
					(arr[i].dataset.rid == '') && (arr[i].className = 'number');
					(arr[i].dataset.rid == '') && (arr[i].parentNode.dataset.target = '');
				}
			},
			loadError: function(xhr, status, error) {
				//console.log(status)
			}
		})
	}

	$(window).bind('click', function saveEdit(e) {
		var rowId = $(e.target).parent("tr").attr("id");
		if (lastsel != "" && lastsel != rowId) { //用于点击其他地方保存正在编辑状态下的行
			if ($(e.target).closest(options.TableName).length == 0) {
				$(options.TableName).jqGrid('saveRow', lastsel);
				lastsel = '';
			}
		}
	})

	/***save ***/
	function saveCell() {
		$("#jqGrid_borrow").jqGrid("saveCell", lastrow, lastcell);
	}

	function addAndDelete(cellvalue, options, rowObjec) {
		var addAndDel = '<div class="operating" data-id="' + options.rowId + '"></span><span class="glyphicon glyphicon-trash" aria-hidden="true" id="add_row" title="删除行"></span></div>';
		return addAndDel;
	}

	//新增一行
	$(document).on('click', '.newColumn', function(e) {
		var thisTitle = $(this).attr("title");
		var rowId = $(this).parent().data('id');
		$('#jqGrid_borrow').jqGrid('addRowData', rowId + 1, {}, 'last');
	});

	//删除一行
	$(document).on('click', '.glyphicon-trash', function(e) {
		var thisTitle = $(this).attr("title");
		var rowId = $(this).parent().data('id');
		if (thisTitle == "删除行") {
			$("#jqGrid_borrow").jqGrid('delRowData', rowId);
		}
	});



	$(document).on('blur', '.checkInput', function(e) {
		var value = $(this).val();
		var reg = /^[1-9]\d*$/;
		if (!reg.test(value)) {
			value = '';
			$.zxsaas_plus.showalert("错误", "只能输入数字!");
		}
		$(this).val(value)
	});

	/**
	 * 自定义列计算
	 * @param val
	 * @param name
	 * @param record
	 * @returns {String}
	 */

	/**
	 * 修改表格底部
	 */
	function footerData() {
		var loanNumber = $(options.TableName).getCol('loanNumber', false, 'sum');
		var returnNumber = $(options.TableName).getCol('returnNumber', false, 'sum');
		var residue = $(options.TableName).getCol('residue', false, 'sum');

		$(options.TableName).jqGrid('footerData', 'set', {
			"loanName": "合计:",
			"loanNumber": returnNumber,
			"returnNumber": returnNumber,
			"residue": returnNumber
		});
	}
}

/**
 *  借入  引入借入未归还单据
 */
function initBorrowSale() {
	rowId = $(this).data('rid');
	var options = {
		LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
		GetRowInfoUrl: "", //编辑时获取数据详细信息接口加载地址
		DelRowUrl: "", // 删除信息接口地址
		isSub: "", //是否有子级表格
		subLoadTableUrl: "", //子级表格数据来源地址
		TableName: "#jqGrid_import", //显示表格名称。遵照css选择器书写
		iconJsonUrl: "../json/icon.json",
		btnbox: ".btnbox ", //功能按钮存放容器。遵照css选择器书写	
		pager: "#gridpager_import"
	};

	$.jgrid.defaults.width = 1280;
	$.jgrid.defaults.responsive = true;
	$.jgrid.defaults.styleUI = 'Bootstrap';
	var lastsel = ''; //最后一次选中的行
	var rightClickColid = ""; //右键列id
	var rightClickColIndex = 0; //右键index
	var mydata;
	var hid = false;
	var lock = false;
	var myobj = [];
	var colNames = ['借入单号', '借入日期', '商品名称', '借入数量', '单价', '金额', '串号', '已转采购数', '已归还数', '未归还数', '仓库id', '商品id', '是否串号管理'];
	var JqGridColModel = [{
		name: 'refMainId',
		index: 'refMainId',
		width: 100,
		align: 'center',
		sortable: false
	}, {
		name: 'borrowLendDateString',
		index: 'borrowLendDateString',
		width: 100,
		align: 'center',
		sorttype: 'string',
		sortable: false
	}, {
		name: 'goodsName',
		index: 'goodsName',
		width: 120,
		align: 'center',
		sortable: false
	}, {
		name: 'borrowLendNum',
		index: 'borrowLendNum',
		width: 100,
		align: 'center',
		sorttype: 'string',
		sortable: false
	}, {
		name: 'price',
		index: 'price',
		width: 100,
		align: 'center',
		sortable: false,
		formatter: function(cellvalue, options, row) {
			return (row.cost / row.borrowLendNum).toFixed(0);
		}
	}, {
		name: 'cost',
		index: 'cost',
		hidden: true,
		sortable: false
	}, {
		name: 'imei',
		index: 'imei',
		width: 100,
		hidden: false,
		sortable: false
	}, {
		name: 'saleNum',
		index: 'saleNum',
		width: 100,
		hidden: false,
		sortable: false
	}, {
		name: 'backNum',
		index: 'backNum',
		width: 100,
		hidden: false,
		sortable: false,
		formatter: function(cellvalue, options, rowObject) {
			var temp = rowObject.borrowLendNum - rowObject.surNum - rowObject.saleNum;
			return temp
		}
	}, {
		name: 'surNum',
		index: 'surNum',
		width: 100,
		hidden: false,
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
		name: 'isImei',
		index: 'isImei',
		hidden: true,
		sortable: false
	}];

	loadtable3();
	//加载表格
	function loadtable3() {
		$(options.TableName).jqGrid({
			url: options.LoadTableUrl,
			mtype: "GET",
			datatype: "json",
			jsonReader: {
				root: "data.rows",
				page: "data.page",
				total: "data.total",
				records: "data.records",
				repeatitems: false
			},
			colNames: colNames,
			colModel: JqGridColModel,
			sortable: false,
			rownumbers: true,
			rowNum: 20,
			rowList: [2, 20, 25, 40],
			pager: options.pager,
			viewrecords: true,
			multiselect: true,
			width: "100%",
			height: $(window).height() * 0.44,
			autowidth: true,
			rownumWidth: 35, // the width of the row numbers columns
			shrinkToFit: true, //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
			ondblClickRow: function(id) {
				//双击进入编辑
				onclickImport(id);
			},
			gridComplete: function() {

				var ids = $(options.TableName).jqGrid("getDataIDs");
			},
			afterInsertRow: function(rowid, aData) { //新增一行之后
				$("#jqGrid_import").jqGrid('setCell', rowid, 'backNum', aData.borrowLendNum - aData.surNum);

			},
			loadComplete: function(data) {
				$("#jqGrid_import").setGridWidth($('#importChoose .modal-dialog').width() - 100);
				$("#importChoose").find('.ui-jqgrid-bdiv').css({
					'overflow-x': 'hidden'
				});
			},
			loadError: function(xhr, status, error) {}
		})
		}
}

	
