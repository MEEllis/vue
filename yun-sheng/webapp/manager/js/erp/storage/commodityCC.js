
/*******************************************存放一些全局变量******************************************/
var ibillsMainCC = new Object(); //m_主表单据(相当于当前展示的单据)		里面有对应的数量表和串号表

var goodsTransferList = new Array(); //数量集合

var imDetaiList = new Array(); //串号

var jqgridRowId; //行id

var imDetaiList2 = new Array(); //	//表体串号数据

var imDetaiList3 = new Array(); //表体对应行串号数据

var importNumId = ''; //引入数量表id字符串

var importImId = {}; //引入串号表id对应数量表id数组

var inStorageId;

var outStorageId;

var pageNumber = 1; //当前页

var pageCount = 1; //最后页数



/*********************首先判断哪些没有数据的时候不能操作的按钮有	新增、执行*****************************/
/***button 刷新***/
function onclickRefresh() {
	location.reload();
}

/***button 打印***/
function print() {
	if (ibillsMainCC != undefined && ibillsMainCC != null && ibillsMainCC.id != null && ibillsMainCC.id != undefined) {
		$.printBills(basePath + '/storagePrint/print/commodity', {
			billsId: ibillsMainCC.id,
			statusBills: $("#slideThree").is(':checked') ? 0 : 1,
			printType: $('input[name="printRadio"]:checked').val(),
			startTime: $('#startTimeStr').val(),
			endTime: $('#endTimeStr').val()
		});
	} else {
		$.zxsaas_plus.showalert("error", "请选择一张草稿单或正式单!");
	}
	$('#printModal').modal('hide');
}

/***button 移入、移出仓库不能相同***/
function clickStorage(storageName) {
	if (inStorageId != null && outStorageId != null && $('#outStorageId').val() == $('#inStorageId').val()) {
		if (storageName == 'inStorageId') $('#' + storageName).val(inStorageId);
		if (storageName == 'outStorageId') $('#' + storageName).val(outStorageId);
		$.zxsaas_plus.showalert("error", "移出仓库和移入仓库不能相同!");
		return false;
	} else {
		inStorageId = $('#inStorageId').val(); //初始化移入仓库
		outStorageId = $('#outStorageId').val(); //初始化移出仓库
		findStockNumber();
	}
}

/***button 切换单据***/
$("#slideThree").click(function() {
	$(".slideThree").toggleClass("color7D5F50"); //  0正式单据  1草稿单据
	$('#slideThree').prop('checked') ? $('#slideThree').val('0') : $('#slideThree').val('1');
	$('#slideThree').prop('checked') ? $('.rightMap').show() : $('.rightMap').hide();
	pageNumber = 1;
	pageCount = 1;
	goodsTransferList = [];
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
		$.zxsaas_plus.showconfirm("提示", '当前页面数据未保存，是否放弃本次操作并打开一个新页面?', function() {
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
			initNull();
			//章子
			if ($('#slideThree').val() == 0) {
				$.showBillsStatus("billsStautsImg", ibillsMainCC.billsStatus);
			} else {
				$.showBillsStatus("billsStautsImg", "1");
			}
		}, function() {});
	} else {
		if ($('#slideThree').prop('checked')) {
			//  0正式单据  1草稿单据
			$(".slideThree").toggleClass("color7D5F50");
			$('#slideThree').attr('checked', false);
			$('#slideThree').val('1');
		}
	}
}

/***button 删除***/
function onClickDelete() {
	if (ibillsMainCC != null && ibillsMainCC != undefined && ibillsMainCC.id != undefined && ibillsMainCC.id != null && ibillsMainCC.billsCode == undefined) {
		$.zxsaas_plus.showconfirm("", "是否删除当前单据?", function() {
			storageObj.deleteIbillsMainDraftCC(ibillsMainCC.id, 3,'spyk_del', function(data) {
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
function commodityGzHc(num) {
	if (num == 1 && $('#slideThree').val() == 0) {
		$.zxsaas_plus.showalert("error", "请选择一张草稿单过账!");
		return false;
	}
	if (num == 2 && $('#slideThree').val() == 1) {
		$.zxsaas_plus.showalert("error", "请选择一张正式单红冲!");
		return false;
	}
	if ($.isEmptyObject(ibillsMainCC) || ibillsMainCC == undefined) {
		$.zxsaas_plus.showalert("error", "请选择一张单据!");
		return false;
	}
	storageObj.commodity(ibillsMainCC.id, 'SPYK', num, $('#hcTime').val(), function(data) {
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
	// 移出仓库和移入仓库不能为空
	if($("#outStorageId").val() == "" || $("#inStorageId").val() == ""){
		$.zxsaas_plus.showalert('error','移出仓库和移入仓库不能为空!');
		return;
	}
	
	var rowIds = $("#jqGrid_SubjectBalance").getDataIDs();
	status1 = rowIds.length == 0 ? false : true;
	if (status1) {
		saveBills();
	}
}

/***select 仓库选择***/
function selectStorage() {
	var rowIds = $("#jqGrid_SubjectBalance").getDataIDs();
	if (rowIds.length == 0) {
		$('#jqGrid_SubjectBalance').jqGrid('addRowData', 0, {
			goodsName: '',
			goodsNumber: 0,
			remark: ''
		});
		$('#storageName' + 0).val($('#storageId').find("option:selected").text());
		$("#jqGrid_SubjectBalance").jqGrid('setCell', 0, 8, $('#storageId').val());
	}
}

/****************************然后点击就可以出现数据的按钮	  过滤************************************/
/***button 过滤***/
function filterSelect() {
	$('#filtrationChoose').modal('hide');
	$('#selBillsTypeStr').val(num); //单据类型
	$('#pageNumber').val(pageNumber); //当前页
	//查正式单 或  草稿单
	if ($('#slideThree').val() == 0) {
		$('#statusBills').val(0);
		var formParams = $("#filterForm").serializeObject();
		storageObj.filterCommodity(formParams, function(data) {
			if(data.data.rows){
				ibillsMainCC = data.data.rows.length == 0 ? ibillsMainCC = {} : ibillsMainCC = data.data.rows[0];
				pageCount = data.data.total;
				if (!$.isEmptyObject(ibillsMainCC) && ibillsMainCC != undefined) {
					assign();
				} else {
					$("#slideThree").unbind("change");
					$("#slideThree").click();
				}
			}else{
				$.zxsaas_plus.showalert("错误", data.desc);
			}
		});
	} else if ($('#slideThree').val() == 1) {
		$('#statusBills').val(1);
		var formParams = $("#filterForm").serializeObject();
		storageObj.filterCommodity(formParams, function(data) {
			if(data.data.rows){
				ibillsMainCC = data.data.rows.length == 0 ? ibillsMainCC = {} : ibillsMainCC = data.data.rows[0];
				pageCount = data.data.total;
				if (!$.isEmptyObject(ibillsMainCC) && ibillsMainCC != undefined) {
					assign();
				} else {
					elseInitNull();
				}
			}else{
				$.zxsaas_plus.showalert("错误", data.desc);
			}
		});
	}
}

function elseInitNull() {
	$('#ibillsHead').clearForm(true);
	jQuery("#jqGrid_SubjectBalance").jqGrid("clearGridData");
	//赋值表尾
	$('#footerCompany').val('');
	$('#footerCreate').val('');
	$('#footerUpdate').val('');
	$('#footerPost').val('');
	initNull();
	$.showBillsStatus("billsStautsImg", "1");
}

/***button 重置***/
function resetFilter() {
	$('#filterForm').clearForm(true);
	$('#pageSize').val(1);
	var selectHtml = '<option value="">请选择部门</option>';
	$('#selOutStorageStr').html('');
	$('#selInstorageStr').html('');
	$('#selOutStorageStr').append(selectHtml);
	$('#selInstorageStr').append(selectHtml);
}

//赋值
function assign() {
	importNumId = '';
	importImId = {};
	jQuery("#jqGrid_SubjectBalance").jqGrid("clearGridData");
	$('#ibillsHead').clearForm(true);
	if (ibillsMainCC != undefined) {
		goodsTransferList = ibillsMainCC.goodsTransferList;
		//赋值表头
		var params = $('#ibillsHead').formToArray();
		$(params).each(function(index, element) {
			var key = element.name;
			var value = eval("ibillsMainCC." + key);
			$('#' + key).val(value);
		});
		//根据部门选择仓库
		if (ibillsMainCC.sectionId != null) {
			initManagers();
			$('#inStorageId').removeAttr('disabled');
			$('#inStorageId').html('');
			$('#outStorageId').removeAttr('disabled');
			$('#outStorageId').html('');
			var selectHtml = '';
			storageObj.initStorage($('#sectionId').val(), function(data) {
				if(data.data.rows){
					selectHtml += '<option value="">请选择仓库</option>';
					var list = data.data.rows;
					$(list).each(function(index, yu) {
						selectHtml += '<option value="' + yu.id + '">' + yu.name + '</option>';
					});
				}
			});
			$('#inStorageId').append(selectHtml);
			$('#outStorageId').append(selectHtml);
		} else {
			initNull();
		}

		$('#billsCode').val(ibillsMainCC.billsCode);
		$('#managersUid').val(ibillsMainCC.managersUid);
		$('#inStorageId').val(ibillsMainCC.inStorageId);
		$('#outStorageId').val(ibillsMainCC.outStorageId);
		inStorageId = ibillsMainCC.inStorageId; //初始化移入仓库
		outStorageId = ibillsMainCC.outStorageId; //初始化移出仓库

		$(goodsTransferList).each(function(index, element) {
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
	}
	//章子
	if ($('#slideThree').val() == 0) {
		$.showBillsStatus("billsStautsImg", ibillsMainCC.billsStatus);
	} else {
		$.showBillsStatus("billsStautsImg", "1");
	}
}

/**********************************保存****************************************/
function saveBills() {
	if ($('#slideThree').val() == 0) {
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
	if (ibillsMainCC.outStorageId == ibillsMainCC.inStorageId) {
		$.zxsaas_plus.showalert("提示信息", "移出仓库和移入仓库不能相同!");
		return false;
	}
	ibillsMainCC.billsType = '11';
	//获取表体
	ibillsMainCC.goodsTransferList = new Array();
	$(rowIds).each(function(index, element) {
		var rowData = $("#jqGrid_SubjectBalance").jqGrid("getRowData", element);
		if (rowData.goodsId == '') {
			return true;
		}
		delete rowData.deliveryDo;
		rowData.goodsName = null;
		ibillsMainCC.goodsTransferList[element] = rowData;
		//获取表体串号
		if (parseInt(rowData.ifManageImei) == 1) {
			ibillsMainCC.goodsTransferList[element].imDetaiList = new Array();
			ibillsMainCC.goodsTransferList[element].imDetaiList = imDetaiList2[element];
		}
	});
	//新增
	storageObj.saveNewCommodityDraft(ibillsMainCC, function(data) {
		if($.ac_cc(data)) return false;  //判断权限
		
		var obj = data.data.row;
		if (obj != null) {
			$.zxsaas_plus.showalert("error", "新增成功!");
			ibillsMainCC = obj;
			lastForm();
		} else {
			$.zxsaas_plus.showalert("error", "新增失败!");
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
	if (ibillsMainCC.outStorageId == ibillsMainCC.inStorageId) {
		$.zxsaas_plus.showalert("error", "移入、移出部门不能相同!");
		return false;
	}
	//获取表体
	ibillsMainCC.goodsTransferList = new Array();
	$(rowIds).each(function(index, element) {
		var rowData = $("#jqGrid_SubjectBalance").jqGrid("getRowData", element);
		if (rowData.goodsId == '') {
			return true;
		}
		delete rowData.deliveryDo;
		//		rowData.goodsName = $('#goodsName'+element).val();
		ibillsMainCC.goodsTransferList[element] = rowData;
		//获取表体串号
		if (parseInt(rowData.ifManageImei) == 1) {
			if (imDetaiList2.length != 0) {
				ibillsMainCC.goodsTransferList[element].imDetaiList = new Array();
				ibillsMainCC.goodsTransferList[element].imDetaiList = imDetaiList2[element];
			}
		}
	});
	ibillsMainCC.importNumId = importNumId;
	ibillsMainCC.importImId = importImId;
	//修改草稿
	storageObj.saveCommodityDraft(ibillsMainCC, function(data) {
		var obj = data.data.row;
		if (obj != null) {
			if (copyString != 'copy') {
				$.zxsaas_plus.showalert("error", "修改成功!");
				ibillsMainCC = obj;
				assign();
			} else {
				$.zxsaas_plus.showalert("error", "复制成功!");
			}
		} else {
			$.zxsaas_plus.showalert("error", "修改失败!");
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
		if (rowData.goodsId == '') {
			return true;
		}
		if (ibillsMainCC.goodsTransferList[element] != undefined) {
			ibillsMainCC.goodsTransferList[element].remark = rowData.remark;
		}
	});
	storageObj.saveToOfficial(3, ibillsMainCC, function(data) {
		if($.ac_cc(data)) return false;  //判断权限
		
		var obj = data.data.row;
		if (obj != null) {
			if (copyString != 'copy') {
				$.zxsaas_plus.showalert("error", "保存成功!");
				ibillsMainCC = obj;
				assign();
			} else {
				$.zxsaas_plus.showalert("error", "复制成功!");
			}
		} else {
			$.zxsaas_plus.showalert("error", "保存失败!");
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
			$.zxsaas_plus.showalert("error", "未选中任何行!");
			$('#goodsnameReferenceModal').modal('hide');
			return;
		}
		var goods = arguments[0][0];

		//设置编辑器值
		//设置编辑器值
		$("#jqGrid_SubjectBalance").jqGrid('saveCell', lastrow, lastcell);
		$("#jqGrid_SubjectBalance").jqGrid('setCell', id, "goodsId", goods.id);
		$("#jqGrid_SubjectBalance").jqGrid('setCell', id, "goodsName", goods.name);
		var ifManageImei = goods.ifManageImei == 'true' ? 1 : 0;
		$("#jqGrid_SubjectBalance").jqGrid('setCell', id, "ifManageImei", ifManageImei);
		$('#goodsnameReferenceModal').modal('hide');
		findStockNumber();
	};
	jqgridRowId = id;
}

//获取现库存
function findStockNumber() {
	var rowData = $('#jqGrid_SubjectBalance').jqGrid('getRowData', jqgridRowId);
	if ($('#outStorageId').val() != null && $('#outStorageId').val() != '' && rowData.goodsId != null && rowData.goodsId != '') {
		storageObj.findStockNumber($('#outStorageId').val(), rowData.goodsId, $('#sectionId').val(), function(data) {
			var rowObject = data.data.row;
			if (rowObject != null && rowObject != undefined) {
				$("#jqGrid_SubjectBalance").jqGrid('setCell', jqgridRowId, 'ifManageImei', rowObject.ifManageImei);
				//用来存放这一列的串号
				imDetaiList3[jqgridRowId] = [];
				//防止  4.回车，选择数量仓库，在还原仓库，数量变0.
				imDetaiList2[jqgridRowId] = [];
			} else {
				//				$("#jqGrid_SubjectBalance").jqGrid('setCell',jqgridRowId,'ifManageImei',null); 
				$("#jqGrid_SubjectBalance").jqGrid('setCell', jqgridRowId, 'goodsNumber', 0);
			}
		});
	}
}

//打开引用对话框  查询商品
var callBack;

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
		$('#goodsnameReferenceModal').modal('hide');
	};
}
$("#")


//输入过的串号存放数组
var inputValueArr = new Array();
//校验回车的次数
var verifyCount = 0;

//监听
function imeiMate() {
	$('#otherOutUl').html('');
	//右匹配  最少输入5位数或以上
	if ($('#otherOutstroNumIdStr').val().length >= 5) {
		var param = {
			imeiLength: $('#otherOutstroNumIdStr').val().length,
			imei: $('#otherOutstroNumIdStr').val(),
			sectionId: $('#sectionId').val(),
			storageId: $('#outStorageId').val()
		};
		storageObj.imeiMate(param, function(data) {
			var dataList = data.data.rows;
			var ulHtml = '';
			if (dataList && dataList.length != 0) {
				for (var i = 0; i < dataList.length; i++) {
					ulHtml += '<li>' + dataList[i].imei + '</li>';
				}
			}
			$('#otherOutUl').html(ulHtml);
		});
	}
}
//EnterPressOtherImei()
//回车添加到明细表格
function EnterPressOtherImei() {
	//在找到已有串号时跳出方法
	var findBills = true;
	var event=e||event;
	var keyCode = event.which || event.keyCode;
	var imeiStatus = true; //输入串号不能相同
	if (event.keyCode == 13) {
		// 如果不存在部门
		var sectionId = AppEvent.triggerHandler('getSectionId');
		if (sectionId.trim() == '') {
			$.zxsaas_plus.showalert('error', '请选择部门!');
			return false;
		}
		var param = {
			imeiLength: $('#otherOutstroNumIdStr').val().length,
			imei: $('#otherOutstroNumIdStr').val(),
			sectionId: $('#sectionId').val(),
			storageId: $('#outStorageId').val()
		};
		if ($('#otherOutstroNumIdStr').val().length >= 5) { //是否输入过同样的值，有的话就不进入判断
			storageObj.imeiMate(param, function(data) {
				var dataList = data.data.rows;
				if (dataList && dataList.length) {
					var rowIds = $("#jqGrid_SubjectBalance").jqGrid('getDataIDs');
					//是否仓库、商品相同，有数量上+1
					//有
					$(rowIds).each(function(index, idIndex) { //遍历每个id 找到每个data 并把属性加到初始化数组里 
						var rowData = $("#jqGrid_SubjectBalance").jqGrid("getRowData", idIndex);
						if (rowData.ifManageImei != '1') return true;
						if (rowData.goodsId == dataList[0].goodsId && rowData.storageId == dataList[0].storageId) {
							var arr = _pluck(imDetaiList2[idIndex], 'imei');
							$.each(imDetaiList2[idIndex], function(i, v) {
								if (arr.indexOf(param.imei) > -1) {
									imeiStatus = false;
									return false;
								}
							});
							if (!imeiStatus) return false;
							//这是显示校验过的
							$("#jqGrid_SubjectBalance").jqGrid('setCell', idIndex, 'goodsNumber', parseInt(rowData.goodsNumber) + 1);
							imDetaiList3[idIndex].push(dataList[0]);
							imDetaiList2[idIndex].push(dataList[0]);
							findBills = false;
							return false;
						}
					});
					if (!imeiStatus) {
						$.zxsaas_plus.showalert('', '两次串号不能相同!');
						return false;
					}
					if (!findBills) return false;
					//没有
					dataList[0].goodsNumber = 1;
					$("#jqGrid_SubjectBalance").jqGrid('addRowData', rowIds.length, dataList[0]);
					imDetaiList3[rowIds.length] = [dataList[0]];
					imDetaiList2[rowIds.length] = [dataList[0]];
				}
			});
			$(".none-cx").hide();
			$('#otherOutstroNumIdStr').val('');
		}
	}
}
// 接受一个集合，根据name值返回数组
function _pluck(arr, name) {
	var result = [];
	for (var i = 0; i < arr.length; i++) {
		var item = arr[i];
		if (item.hasOwnProperty(name)) result.push(item[name])
	}
	return result;
}