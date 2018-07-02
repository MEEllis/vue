/*******************************************存放一些全局变量******************************************/
var ibillsMainCC = new Object(); //m_主表单据(相当于当前展示的单据)		里面有对应的数量表和串号表

var instroNumList = new Array(); //数量集合

var imDetaiList = new Array(); //串号

var jqgridRowId; //行id

var imDetaiList2 = new Array(); //	//表体串号数据

var imDetaiList3 = new Array(); //表体对应行串号数据

var importNumId = ''; //引入数量表id字符串

var importImId = {}; //引入串号表id对应数量表id数组

var pageNumber = 1; //当前页

var pageCount = 1; //最后页数


/*********************首先判断哪些没有数据的时候不能操作的按钮有	新增、执行*****************************/
/***button 刷新***/
function onclickRefresh() {
	location.reload();
}

/***button 键盘事件***/
function departmentDel(name) {
	if (event.keyCode == 8) {
		if (name == 'sectionName') {
			$('#sectionName').val(null);
			$('#sectionId').val(null);
			initNull();
		} else if (name == 'filterOutName') {
			$('#filterOutName').val(null);
			$('#selSectionIdStr').val(null);
		}
	}
}

/***button 切换单据***/
$("#slideThree").click(function() {
	$(".slideThree").toggleClass("color7D5F50"); //  0正式单据  1草稿单据
	$('#slideThree').prop('checked') ? $('#slideThree').val('0') : $('#slideThree').val('1');
	$('#slideThree').prop('checked') ? $('.rightMap').show() : $('.rightMap').hide();
	pageNumber = 1;
	pageCount = 1;
	instroNumList = [];
	imDetaiList = [];
	imDetaiList2 = [];
	imDetaiList3 = [];
	$('#ibillsHead').clearForm(true);
	jQuery("#jqGrid_SubjectBalance").jqGrid("clearGridData");
	ibillsMainCC = {};
	filterSelect();
});

/***button 新增***/

function onclickNewBills() {
	//判断页面是否有动过的痕迹        若当前页面在保存前没有做过任何修改，无需提示
	var status1 = false;
	var status2 = false;
	var params = $('#ibillsHead').formToArray();
	var rowIds = $("#jqGrid_SubjectBalance").getDataIDs();
	
	$('#otherStorageId').html('');
	initOtherStorageClass();
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
			$('#ibillsHead').clearForm(true);
			jQuery("#jqGrid_SubjectBalance").jqGrid("clearGridData");
			ibillsMainCC = {};
			//赋值表尾
			$('#footerCompany').val('');
			$('#footerCreate').val('');
			$('#footerUpdate').val('');
			$('#footerPost').val('');
			//					$('#footerBack').val(ibillsMainCC.);
			initNull();
			//章子
			if ($('#slideThree').val() == 0) {
				$.showBillsStatus("billsStautsImg", ibillsMainCC.billsStatus);
			} else {
				$.showBillsStatus("billsStautsImg", "1");
			}
		}, function() {
			//			$("#slideThree").unbind( "change" );
			//			$("#slideThree").click();
		});
	} else {
		if ($('#slideThree').prop('checked')) {
			//  0正式单据  1草稿单据
			$(".slideThree").toggleClass("color7D5F50");
			$('#slideThree').attr('checked', false);
			$('#slideThree').val('1');
		}
	}
	
	$("input.form-control:not(#disabledInput)").removeAttr("disabled","disabled");
	$(".btn-group button").removeAttr("disabled","disabled");
	$(".input-group-btn button").removeAttr("disabled","disabled");
	$(".box_input select").removeAttr("disabled","disabled");
	$("div.footer input").removeAttr("disabled","disabled");
	$("#billsDateString").removeAttr("disabled","disabled");
	$("#otherStorageId").removeAttr("disabled","disabled");
	$("#remark").removeAttr("disabled","disabled");
}

/***button 保存***/
function onClickExecute() {
	lastrow != undefined && $("#jqGrid_SubjectBalance").jqGrid("saveCell", lastrow, lastcell);
	//判断页面数量调整表格是否有数据                  //暂时制作这个判断，不知道前面需不需要必填
	var status1 = false;
	//表单验证  
	$("#ibillsHead").data('bootstrapValidator').validate();
	if (!($('#ibillsHead').data('bootstrapValidator').isValid())) {
		refreshValidator('#ibillsHead');
		return;
	}
	var rowIds = $("#jqGrid_SubjectBalance").getDataIDs();
	status1 = rowIds.length == 0 ? false : true;
	if (status1) {
		saveBills();
	}
}

/***button 删除***/
function onClickDelete() {
	if (ibillsMainCC != null && ibillsMainCC != undefined && ibillsMainCC.id != undefined && ibillsMainCC.id != null && ibillsMainCC.billsCode == undefined) {
		$.zxsaas_plus.showconfirm("", "是否删除当前单据?", function() {
			storageObj.deleteIbillsMainDraftCC(ibillsMainCC.id, 2,'qtrk_del', function(data) {
				if($.ac_cc(data)) return false;  //判断权限
				
				var str = data.data.str;
				if (str == '删除失败!') {
					$.zxsaas_plus.showalert("提示信息", str);
					return false;
				}
				$('#ibillsHead').clearForm(true);
				jQuery("#jqGrid_SubjectBalance").jqGrid("clearGridData");
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
function otherInStorageGzHc(num) {
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
	
	//权限设置    过账作废
	var ac_cc = '';
	if(num == 1) {
		ac_cc = 'qtrk_gz';
	}else if(num == 2) {
		ac_cc = 'qtrk_hc';
	}
	
	storageObj.otherInStorage(ibillsMainCC.id, 'QTRK', num, $('#hcTime').val(),ac_cc, function(data) {
		if($.ac_cc(data)) return false;  //判断权限
		
		var str = data.data.str;
		$.zxsaas_plus.showalert("", str);
		if (str == '成功') {
			if (num == '1') {
				$("#slideThree").click();
			} else {
				$('#hcModal').modal('hide');
				lastForm();
			}
		}
	});
}

/***button 红冲弹窗***/
function hcClick() {
	$('#hcModal').modal('show');

	$("#hcTime").val($.DateFormat(new Date(), "yyyy-MM-dd"));

	$("#hcTime").datetimepicker({
		lang: "ch", //语言选择中文
		format: "Y-m-d", //格式化日期
		timepicker: false, //关闭时间选项
		todayButton: false //关闭选择今天按钮
	});
}

/***button 打印***/
function print() {
	if (ibillsMainCC != undefined && ibillsMainCC != null && ibillsMainCC.id != null && ibillsMainCC.id != undefined) {
		$.printBills(basePath + '/storagePrint/print/otherToStorage', {
			billsId: ibillsMainCC.id,
			statusBills: $("#slideThree").is(':checked') ? 0 : 1,
			printType: $('input[name="printRadio"]:checked').val(),
			startTime: $('#startTimeStr').val(),
			endTime: $('#endTimeStr').val()
		});
	} else {
		$.zxsaas_plus.showalert("提示信息", "请选择一张草稿单或正式单!");
	}
	$('#printModal').modal('hide');
}

/****************************然后点击就可以出现数据的按钮	  过滤************************************/
/***button 过滤***/
function filterSelect() {
	$('#filtrationChoose').modal('hide');
	$('#selBillsTypeStr').val(num); //单据类型
	$('#pageNumber').val(pageNumber); //当前页
	//查正式单 或  草稿单
	if ($('#slideThree').val() == 0) {
		$('#statusBills').val(0); //正式单据
		var formParams = $("#filterForm").serializeObject();
		//单据状态
		if($('#selBillsStatuStr').is(':checked')) {
			formParams.selBillsStatuStr = "6,7";
		}else {
			formParams.selBillsStatuStr = "6";
		}
		storageObj.filterOtherToStorage(formParams, function(data) {
			ibillsMainCC = data.data.rows.length == 0 ? ibillsMainCC = {} : ibillsMainCC = data.data.rows[0];
			pageCount = data.data.total;
			if (!$.isEmptyObject(ibillsMainCC) && ibillsMainCC != undefined) {
				assign();
			} else {
				//				elseInitNull();
				$("#slideThree").unbind("change");
				$("#slideThree").click();
			}
		});
	} else if ($('#slideThree').val() == 1) {
		$('#statusBills').val(1); //草稿单据
		$('#selBillsStatuStr').val('1'); //单据状态 
		var formParams = $("#filterForm").serializeObject();
		formParams.selBillsStatuStr = $('#selBillsStatuStr').is(':checked') ? 1 : null;
		storageObj.filterOtherToStorage(formParams, function(data) {
			ibillsMainCC = data.data.rows.length == 0 ? ibillsMainCC = {} : ibillsMainCC = data.data.rows[0];
			pageCount = data.data.total;
			if (!$.isEmptyObject(ibillsMainCC) && ibillsMainCC != undefined) {
				assign();
			} else {
				elseInitNull();
			}
		});
		$('#ibillsHead button,#ibillsHead select,#ibillsHead input').prop('disabled',false);
	}
}

function elseInitNull() {
	$('#ibillsHead').clearForm(true);
	jQuery("#jqGrid_SubjectBalance").jqGrid("clearGridData");
	initNull();
	//赋值表尾
	$('#footerCompany').val('');
	$('#footerCreate').val('');
	$('#footerUpdate').val('');
	$('#footerPost').val('');
	//	$('#footerBack').val('');
	$.showBillsStatus("billsStautsImg", "1");
}

/***button 重置***/
function resetFilter() {
	$('#filterForm').clearForm(true);
	$('#pageSize').val(1);
	var selectHtml = '<option value="">请选择部门</option>';
	$('#selStorageIdStr').html('');
	$('#selStorageIdStr').append(selectHtml);
}

//赋值
function assign() {
	importNumId = '';
	importImId = {};
	jQuery("#jqGrid_SubjectBalance").jqGrid("clearGridData");
	$('#ibillsHead').clearForm(true);
	if (ibillsMainCC != undefined) {
		instroNumList = ibillsMainCC.instroNumList;
		//赋值表头
		var params = $('#ibillsHead').formToArray();
		$(params).each(function(index, element) {
			var key = element.name;
			var value = eval("ibillsMainCC." + key);
			$('#' + key).val(value);
		});

		//根据部门选择仓库
		if (ibillsMainCC.sectionId != null) {
			// 部门赋值
			$('#sectionName').val(ibillsMainCC.sectionName);
			initManagers();
//			$('#contactName').removeAttr('disabled');
			$('#contactName').val(ibillsMainCC.contactName);
		} else {
			initNull();
		}

		//盘盈入库
		if (ibillsMainCC.ykStatus == 1) {
			$('#otherStorageId').html('');
			$('#otherStorageId').append('<option value="' + ibillsMainCC.otherStorageId + '">盘盈入库</option>');
		} else {
			$('#otherStorageId').html('');
			initOtherStorageClass();
			$('#otherStorageId').val(ibillsMainCC.otherStorageId);
		}

		$('#billsCode').val(ibillsMainCC.billsCode);
		$('#managersUid').val(ibillsMainCC.managersUid);
		$('#contactName').val(ibillsMainCC.contactName);
		$(instroNumList).each(function(index, element) {
			if (importNumId != '') importNumId += ',';
			importNumId += element.id; //添加   单据数量表id
			//赋值表体
			$("#jqGrid_SubjectBalance").jqGrid('addRowData', index, element);
			imDetaiList3[index] = new Array(); //创建空的数组，存放所有串号
			var imArray = [];
			$(element.imDetaiList).each(function(index2, element2) { //遍历串号数组
				imArray.push(element2.id);
				imDetaiList3[index].push(element2); //添加到空的数组中
			});
			importImId[element.id] = imArray;
			imDetaiList2[index] = [].concat(imDetaiList3[index]); //保存对应行的数组
		});
		//赋值表尾
		$('#footerCompany').val(ibillsMainCC.companyName);
		$('#footerCreate').val(ibillsMainCC.createName);
		$('#footerUpdate').val(ibillsMainCC.updateName);
		$('#footerPost').val(ibillsMainCC.postName);
		//		$('#footerBack').val(ibillsMainCC.);

		//根据部门选择仓库
		if (ibillsMainCC.sectionId != null) {
			initStorage();
		}
	}
	//章子
	if ($('#slideThree').val() == 0) {
		$.showBillsStatus("billsStautsImg", ibillsMainCC.billsStatus);
		$('#ibillsHead button,#ibillsHead select,#ibillsHead input').prop('disabled',true);
	} else {
		$.showBillsStatus("billsStautsImg", "1");
	}
}

/**********************************保存****************************************/
function saveBills() {
	if (ibillsMainCC != undefined && ibillsMainCC.importBills == 1 && $('#slideThree').val() == 0) {
		//0正式单据
		billsUpdate();

	} else if ($('#slideThree').val() == 1) {
		//1草稿单据
		if (ibillsMainCC != undefined && ibillsMainCC.importBills == 1) {
			//1.引入单据
			draftBillsImport();
		} else {
			//0.新增单据
			draftBillsInsert();
		}
	} else {
		$.zxsaas_plus.showalert("", "不能保存!");
	}
}

/***function 草稿单据-新增***/
function draftBillsInsert() {
	var params = $('#ibillsHead').formToArray();
	var rowIds = $("#jqGrid_SubjectBalance").getDataIDs();
	//获取表头
	$(params).each(function(index, element) {
		var key = element.name;
		ibillsMainCC[key] = element.value;
	});
	ibillsMainCC.billsType = '9';
	//获取表体
	ibillsMainCC.instroNumList = new Array();
	$(rowIds).each(function(index, element) {
		var rowData = $("#jqGrid_SubjectBalance").jqGrid("getRowData", element);
		if (rowData.storageId == '' || rowData.goodsId == '') {
			return true;
		}
		delete rowData.deliveryDo;
		rowData.storageName = null;
		rowData.goodsName = null;
		ibillsMainCC.instroNumList[element] = rowData;
		//获取表体串号
		if (parseInt(rowData.ifManageImei) == 1) {
			ibillsMainCC.instroNumList[element].imDetaiList = new Array();
			ibillsMainCC.instroNumList[element].imDetaiList = imDetaiList2[element];
		}
	});
	//新增
	storageObj.saveNewOtherInStorageDraft(ibillsMainCC,'qtrk_add', function(data) {
		if($.ac_cc(data)) return false;  //判断权限
		
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
function draftBillsImport(copyString) {
	var params = $('#ibillsHead').formToArray();
	var rowIds = $("#jqGrid_SubjectBalance").getDataIDs();
	//获取表头
	$(params).each(function(index, element) {
		var key = element.name;
		ibillsMainCC[key] = element.value;
	});
	//获取表体
	$(rowIds).each(function(index, element) {
		var rowData = $("#jqGrid_SubjectBalance").jqGrid("getRowData", element);
		if (rowData.storageId == '' || rowData.goodsId == '') {
			return true;
		}
		delete rowData.deliveryDo;
		//		rowData.storageName = $('#storageName'+element).val();
		//		rowData.goodsName = $('#goodsName'+element).val();
		ibillsMainCC.instroNumList[element] = rowData;
		//获取表体串号
		if (parseInt(rowData.ifManageImei) == 1) {
			if (imDetaiList2.length != 0) {
				ibillsMainCC.instroNumList[element].imDetaiList = new Array();
				ibillsMainCC.instroNumList[element].imDetaiList = imDetaiList2[element];
			}
		}
	});
	ibillsMainCC.importNumId = importNumId;
	ibillsMainCC.importImId = importImId;
	//修改草稿
	storageObj.saveOtherInStorageDraft(ibillsMainCC,'qtrk_update', function(data) {
		if($.ac_cc(data)) return false;  //判断权限
		
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
function billsUpdate(copyString) {
	var rowIds = $("#jqGrid_SubjectBalance").getDataIDs();
	//表头备注
	ibillsMainCC.remark = $('#remark').val();

	//表体备注
	$(rowIds).each(function(index, element) {
		var rowData = $("#jqGrid_SubjectBalance").jqGrid("getRowData", element);
		if (rowData.storageId == '' || rowData.goodsId == '') {
			return true;
		}
		if (ibillsMainCC.instroNumList[element] != undefined) {
			ibillsMainCC.instroNumList[element].remark = rowData.remark;
		}
	});
	//修改正式单据
	storageObj.saveToOfficial(2, ibillsMainCC,'qtrk_update', function(data) {
		if($.ac_cc(data)) return false;  //判断权限
		
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

/****************************仓库弹窗、商品弹窗、部门弹窗点击事件方法************************************/


//打开引用对话框
var callBack;

function showGoods(id) {
	$('#goodsnameReferenceModal').modal('show');
	callBack = function() {
		if (arguments[0].length == 0) {
			$.zxsaas_plus.showalert("", "未选中任何行!");
			$('#goodsnameReferenceModal').modal('hide');
			return;
		}
		var goods = arguments[0][0];

		//设置编辑器值
		//设置编辑器值
		$("#jqGrid_SubjectBalance").jqGrid("saveCell", lastrow, lastcell);
		$("#jqGrid_SubjectBalance").jqGrid('setCell', id, "goodsName", goods.name);
		$("#jqGrid_SubjectBalance").jqGrid('setCell', id, "goodsId", goods.id);
		var ifManageImei = goods.ifManageImei == 'true' ? 1 : 0;
		var ifEnableAuxliaryImei = goods.ifEnableAuxliaryImei == 'true' ? 1 : 0;
		$("#jqGrid_SubjectBalance").jqGrid('setCell', id, 'ifManageImei', ifManageImei);
		$("#jqGrid_SubjectBalance").jqGrid('setCell', id, 'ifAuxImei', ifEnableAuxliaryImei);
		$("#jqGrid_SubjectBalance").jqGrid('setCell', id, 'imeiLength', goods.imeiLength);
		$("#jqGrid_SubjectBalance").jqGrid('setCell', id, 'auxliaryImeiLength', goods.auxliaryImeiLength);
		$('#goodsnameReferenceModal').modal('hide');
		//选择新商品重置行数据
		arithmeticNo3(id, 0, 0);
		imDetaiList3[id] = [];
		imDetaiList2[id] = [];
		$("#jqGrid_SubjectBalance").jqGrid('setCell', id, 'goodsNumber', 0);
		$("#jqGrid_SubjectBalance").jqGrid('setCell', id, 'price', 0);
		//		setTimeout('MyEiditGrid.getFocus('+'"#'+inptid+'")',200);
	};
	jqgridRowId = id;
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
		switch (str) {
			case 'insert':
				//设置编辑器值
				$('#contactName').val(contactUnit.name);
				$('#contactsunitId').val(contactUnit.id);
				break;
			case 'select':
				//设置编辑器值
				$('#contactsunitName').val(contactUnit.name);
				$('#selContactsunitIdStr').val(contactUnit.id);
				break;
			default:
				break;
		}
		$('#contactUnitReferenceModal').modal('hide');
		refreshValidatorField("contactName", '#ibillsHead'); //刷新验证信息
	};
}

function showGoodsImport() {
	$('#goodsnameReferenceModal').modal('show');
	callBack = function() {
		if (arguments[0].length == 0) {
			$.zxsaas_plus.showalert("", "未选中任何行!");
			$('#goodsnameReferenceModal').modal('hide');
			return;
		}
		var goods = arguments[0][0];

		//设置编辑器值
		//设置编辑器值
		$('#selGoodsName').val(goods.name);
		$('#selGoodsIdStr').val(goods.id);
		$('#selImei').prop("disabled", false);
		$('#goodsnameReferenceModal').modal('hide');
	};
}

/*********************************公共的计算方式赋值***************************************/
/***changeAllotCC.js 算法单价乘数量等于总额***/
function arithmeticNo3(rowid, price, goodsNumber) {
	$("#jqGrid_SubjectBalance").jqGrid('setCell', rowid, 'amount', goodsNumber * price);
}