/*******************************************存放一些全局变量******************************************/
var ibillsMainCC = {}; //m_主表单据(相当于当前展示的单据)		里面有对应的数量表和串号表

var detaiList = []; //数量集合

var imDetaiList = []; //串号

var jqgridRowId; //行id

var imDetaiList2 = []; //	//表体串号数据

var imDetaiList3 = []; //表体对应行串号数据

var importNumId = ''; //引入数量表id字符串

var importImId = {}; //引入串号表id对应数量表id数组

var pageNumber = 1; //当前页

var pageCount = 1; //最后页数

/*********************首先判断哪些没有数据的时候不能操作的按钮有	新增、执行*****************************/
/***button 刷新***/
function onclickRefresh() {
	location.reload();
}

/***button 切换单据***/
$("#slideThree").click(function() {
	$(".slideThree").toggleClass("color7D5F50"); //  0正式单据  1草稿单据
	$('#slideThree').prop('checked') ? $('#slideThree').val('0') : $('#slideThree').val('1');
	pageNumber = 1;
	pageCount = 1;
	detaiList = [];
	imDetaiList = [];
	imDetaiList2 = [];
	imDetaiList3 = [];
	$('#ibillsHead').clearForm(true);
	$("#jqGrid_SubjectBalance").jqGrid("clearGridData");
	ibillsMainCC = {};
	filterSelect();
});


/***button 新增***/
function onclickNewBills() {
	//判断页面是否有动过的痕迹        若当前页面在保存前没有做过任何修改，无需提示
	var flag = false;
	var params = $('#ibillsHead').formToArray();
	var rowIds = $('#jqGrid_SubjectBalance').getDataIDs();
	var billsCode = $('#billsCode').val();
	$.each(params, function(index, item) {
		if (item.value != '') {
			flag = true;
			return false;
		}
	});
	if (billsCode != '' || rowIds.length) flag = true;
	if (flag) {
		$.zxsaas_plus.showconfirm('', '当前页面数据未保存，是否放弃本次操作并打开一个新页面?', function() {
			if ($('#slideThree').prop('checked')) {
				//  0正式单据  1草稿单据
				$(".slideThree").toggleClass("color7D5F50");
				$('#slideThree').attr('checked', false);
				$('#slideThree').val('1');
			}
			$('#ibillsHead').clearForm(true);
			$("#jqGrid_SubjectBalance").jqGrid("clearGridData");
			//赋值表尾
			$('#footerCompany').val('');
			$('#footerCreate').val('');
			$('#footerUpdate').val('');
			$('#footerPost').val('');
			ibillsMainCC = {};
			switch (num) {
				case '7':
					$('#managersUid').attr('disabled', true);
					$('#managersUid').html('');
					var selectHtml = '<option value="">请选择部门</option>';
					$('#managersUid').append(selectHtml);
					break;
				case '8':
					$('#managersUid').attr('disabled', true);
					$('#managersUid').html('');
					var selectHtml = '<option value="">请选择部门</option>';
					$('#managersUid').append(selectHtml);
					break;
				case '10':
					initNull();
					
					$('#otherStorageId').html('');
					initOtherStorageClass();
					break;
				default:
					break;
			}
			//章子
			if ($('#slideThree').val() == 0) {
				$.showBillsStatus("billsStautsImg", ibillsMainCC.billsStatus);
			} else {
				$.showBillsStatus("billsStautsImg", "1");
			}
			AppEvent.trigger('refreshDisabled');
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
	if (lastrow) $("#jqGrid_SubjectBalance").jqGrid("saveCell", lastrow, lastcell);
	//表单验证  
	$("#ibillsHead").data('bootstrapValidator').validate();
	if (!($('#ibillsHead').data('bootstrapValidator').isValid())) {
		refreshValidator('#ibillsHead');
		return false;
	}
	var rowIds = $("#jqGrid_SubjectBalance").getDataIDs();
	if (rowIds.length) {
		saveBills();
	}
}

/***button 删除***/
function onClickDelete() {
	if (ibillsMainCC != null && ibillsMainCC != undefined && ibillsMainCC.id != undefined && ibillsMainCC.id != null && ibillsMainCC.billsCode == undefined) {
		$.zxsaas_plus.showconfirm("", "是否删除当前单据?", function() {
			 
			//权限设置    删除
			var ac_cc = '';
			if(num == '7') {
				ac_cc = 'tjdb_del';
			}else if(num == '8') {
				ac_cc = 'bjdb_del';
			}else if(num == '10') {
				ac_cc = 'qtck_del';
			}
			
			storageObj.deleteIbillsMainDraftCC(ibillsMainCC.id, 1,ac_cc, function(data) {
				
				var str = data.data.str;
				if (str == '删除失败!') {
					$.zxsaas_plus.showalert("提示信息", str);
					return false;
				}
				$('#ibillsHead').clearForm(true);
				$("#jqGrid_SubjectBalance").jqGrid("clearGridData");
				ibillsMainCC = {};
				upForm();
			});

		}, function() {

		});
	} else {
		$.zxsaas_plus.showalert("", "请选择一张草稿单删除!");
	}
}

/***button 作废***/
//function onClickCancellation() {
//	if (ibillsMainCC != null && ibillsMainCC != undefined && ibillsMainCC.billsCode != undefined && ibillsMainCC.billsCode != null) {
//		$.zxsaas_plus.showconfirm("", "是否作废此单?&nbsp;&nbsp;&nbsp;&nbsp;" + ibillsMainCC.billsCode, function() {
//			storageObj.deleteIbillsMainCC(ibillsMainCC.id, function(data) {
//				var str = data.data.str;
//				$.zxsaas_plus.showalert("", str , function(){
//					$('#ibillsHead').clearForm(true);
//					$("#jqGrid_SubjectBalance").jqGrid("clearGridData");
//					upForm();
//				});
//			});
//		});
//	} else {
//		$.zxsaas_plus.showalert("", "请选择一张正式单据作废!");
//	}
//}

/****************************然后点击就可以出现数据的按钮	  过滤************************************/
/***button 过滤***/
function filterSelect() {
	$('#filtrationChoose').modal('hide');
	//查正式单 或  草稿单
	$('#selBillsTypeStr').val(num); //单据类型
	$('#pageNumber').val(pageNumber); //当前页
	
	//权限设置    查询
	var ac_cc = '';
	if(num == '7') {
		ac_cc = 'tjdb_select';
	}else if(num == '8') {
		ac_cc = 'bjdb_select';
	}else if(num == '10') {
		ac_cc = 'qtck_select';
	}
	
	if ($('#slideThree').val() == 0) {
		$('#statusBills').val(0); //正式单据
		//单据状态
		if (num != 10) {
			if ($('.hide_text_audit').val() != null && $('.hide_text_audit').val() != undefined && $('.hide_text_audit').val() != '') {
				$('#selBillsStatuStr').val($('.hide_text_audit').val());
			} else {
				$('#selBillsStatuStr').val('');
			}
		}
		var formParams = $("#filterForm").serializeObject();
		if(num == 10) {
			//单据状态
			if($('#selBillsStatuStr').is(':checked')) {
				formParams.selBillsStatuStr = "6,7";
			}else {
				formParams.selBillsStatuStr = "6";
			}
		}
		storageObj.filterOtherOutStorage(formParams,function(data) {
			ibillsMainCC = data.data.rows.length == 0 ? ibillsMainCC = {} : ibillsMainCC = data.data.rows[0];
			pageCount = data.data.total;
			if (!$.isEmptyObject(ibillsMainCC) && ibillsMainCC != undefined) {
				//				statusData = false;
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
		storageObj.filterOtherOutStorage(formParams,function(data) {
			ibillsMainCC = data.data.rows.length == 0 ? ibillsMainCC = {} : ibillsMainCC = data.data.rows[0];
			pageCount = data.data.total;
			if (!$.isEmptyObject(ibillsMainCC) && ibillsMainCC != undefined) {
				//				statusData = false;
				//				upFormStatus = true;	//上一单是否查询出数据
				assign();
			} else {
				//				upFormStatus = false;	//上一单是否查询出数据
				elseInitNull();
			}
		});
	}
}

function elseInitNull() {
	$('#ibillsHead').clearForm(true);
	$("#jqGrid_SubjectBalance").jqGrid("clearGridData");
	//赋值表尾
	$('#footerCompany').val('');
	$('#footerCreate').val('');
	$('#footerUpdate').val('');
	$('#footerPost').val('');
	//	$('#footerBack').val('');
	switch (num) {
		case '7':
			$('#managersUid').attr('disabled', true);
			$('#managersUid').html('');
			var selectHtml = '<option value="">请选择部门</option>';
			$('#managersUid').append(selectHtml);
			break;
		case '8':
			$('#managersUid').attr('disabled', true);
			$('#managersUid').html('');
			var selectHtml = '<option value="">请选择部门</option>';
			$('#managersUid').append(selectHtml);
			break;
		case '10':
			initNull();
			break;
		default:
			break;
	}
	$.showBillsStatus("billsStautsImg", "1");
}

/***button 重置***/
function resetFilter() {
	$('#filterForm').clearForm(true);
	$('#pageSize').val(1);
	if (num == '10') {
		var selectHtml = '<option value="">请选择部门</option>';
		$('#selStorageIdStr').html('');
		$('#selStorageIdStr').append(selectHtml);
	}
}

//赋值
function assign() {
	importNumId = '';
	importImId = {};
	$("#jqGrid_SubjectBalance").jqGrid("clearGridData");
	$('#ibillsHead').clearForm(true);
	if (ibillsMainCC != undefined) {
		detaiList = ibillsMainCC.detaiList;
		//赋值表头
		$('#id').val(ibillsMainCC.id);
		$('#inDepartmentId').val(ibillsMainCC.inDepartmentId);
		$('#outDepartmentId').val(ibillsMainCC.outDepartmentId);
		$('#billsCode').val(ibillsMainCC.billsCode);
		$('#outDepartmentName').val(ibillsMainCC.outDepartmentName);
		$('#billsDateString').val(ibillsMainCC.billsDateString);
		$('#inDepartmentName').val(ibillsMainCC.inDepartmentName);
		$('#remark').val(ibillsMainCC.remark);
		
		$('#sectionId').val(ibillsMainCC.sectionId);
		$('#contactsunitId').val(ibillsMainCC.contactsunitId);
		$('#sectionName').val(ibillsMainCC.sectionName);
		
		var params = $('#ibillsHead').formToArray();
		$(params).each(function(index, element) {
			var key = element.name;
			var value = eval("ibillsMainCC." + key);
			console.log(value)
			$('#' + key).val(value);
		});
		switch (num) {
			case '7':
				//根据部门选择仓库
				if (ibillsMainCC.outDepartmentId != null) {
					initManagers();
				} else {
					$('#managersUid').attr('disabled', true);
					$('#managersUid').html('');
					var selectHtml = '<option value="">请选择部门</option>';
				}
				break;
			case '8':
				//根据部门选择仓库
				if (ibillsMainCC.outDepartmentId != null) {
					initManagers();
				} else {
					$('#managersUid').attr('disabled', true);
					$('#managersUid').html('');
					var selectHtml = '<option value="">请选择部门</option>';
				}
				break;
			case '10':
				//根据部门选择仓库
				if (ibillsMainCC.sectionId != null) {
					initManagers();
					$('#contactName').removeAttr('disabled');
					$('#contactName').val(ibillsMainCC.contactName);
				} else {
					initNull();
				}
				//盘盈入库
				if (ibillsMainCC.ykStatus == 1) {
					$('#otherStorageId').html('');
					$('#otherStorageId').append('<option value="' + ibillsMainCC.otherStorageId + '">盘亏出库</option>');
				} else {
					$('#otherStorageId').html('');
					initOtherStorageClass();
					$('#otherStorageId').val(ibillsMainCC.otherStorageId);
				}
				break;
			default:
				break;
		}


		$('#billsCode').val(ibillsMainCC.billsCode);
		$('#managersUid').val(ibillsMainCC.managersUid);
		$(detaiList).each(function(index, element) {
			if (importNumId != '') importNumId += ',';
			importNumId += element.id; //添加   单据数量表id
			//赋值表体
			$("#jqGrid_SubjectBalance").jqGrid('addRowData', index, element);
			imDetaiList3[index] = []; //创建空的数组，存放所有串号
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
		
		$('#outDepartmentName').val(ibillsMainCC.outDepartmentName);
		$('#inDepartmentName').val(ibillsMainCC.inDepartmentName);
		$('#billsDateString').val(ibillsMainCC.billsDateString);
		//$('#footerBack').val(ibillsMainCC.);
		if (num == '10') {
			//根据部门选择仓库
			if (ibillsMainCC.sectionId != null) {
				initStorage();
			}
		}
	}
	//章子
	if ($('#slideThree').val() == 0) {
		$.showBillsStatus("billsStautsImg", ibillsMainCC.billsStatus);
	} else {
		$.showBillsStatus("billsStautsImg", "1");
	}

	AppEvent.trigger('refreshDisabled');
}

/***save 保存***/
function saveBills() {
	if ($('#slideThree').val() == 0 && ibillsMainCC != undefined && ibillsMainCC.importBills == 1) {
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
	$.each(params, function(index, item) {
		var key = item.name;
		ibillsMainCC[key] = item.value;
	});
	ibillsMainCC.billsType = num;
	//获取表体
	ibillsMainCC.detaiList = [];
	$.each(rowIds, function(index, item) {
		var rowData = $("#jqGrid_SubjectBalance").jqGrid("getRowData", item);
		if (rowData.storageId == '' || rowData.goodsId == '') return true;
		if (rowData.hasOwnProperty('deliveryDo')) delete rowData.deliveryDo;
		rowData.storageName = null;
		rowData.goodsName = null;
		ibillsMainCC.detaiList[item] = rowData;
		//获取表体串号
		if (parseInt(rowData.ifManageImei) == 1) ibillsMainCC.detaiList[item].imDetaiList = imDetaiList2[item];
	});
	
	//权限设置  新增
	var ac_cc = '';
	if(num == '7') {
		ac_cc = 'tjdb_add';
	}else if(num == '8') {
		ac_cc = 'bjdb_add';
	}else if(num == '10') {
		ac_cc = 'qtck_add';
	}
	
	//新增
	storageObj.saveNewBills(ibillsMainCC,ac_cc, function(data) {
		var obj = data.data.row;
		if (obj != null) {
			$.zxsaas_plus.showalert("", "新增成功!");
			ibillsMainCC = obj;
			lastForm();
		} else {
			$.zxsaas_plus.showalert("", "新增失败!");
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
	ibillsMainCC.detaiList = new Array();
	$(rowIds).each(function(index, element) {
		var rowData = $("#jqGrid_SubjectBalance").jqGrid("getRowData", element);
		if (rowData.storageId == '' || rowData.goodsId == '') {
			return true;
		}
		delete rowData.deliveryDo;
		//		rowData.storageName = $('#storageName'+element).val();
		//		rowData.goodsName = $('#goodsName'+element).val();
		ibillsMainCC.detaiList[element] = rowData;
		//获取表体串号
		if (parseInt(rowData.ifManageImei) == 1) {
			if (imDetaiList2.length != 0) {
				ibillsMainCC.detaiList[element].imDetaiList = new Array();
				ibillsMainCC.detaiList[element].imDetaiList = imDetaiList2[element];
			}
		}
	});
	ibillsMainCC.importNumId = importNumId;
	ibillsMainCC.importImId = importImId;
	
	//权限设置  修改
	var ac_cc = '';
	if(num == '7') {
		ac_cc = 'tjdb_update';
	}else if(num == '8') {
		ac_cc = 'bjdb_update';
	}else if(num == '10') {
		ac_cc = 'qtck_update';
	}
	
	//修改草稿
	storageObj.saveToDraft(ibillsMainCC,ac_cc, function(data) {
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
		if (ibillsMainCC.detaiList[element] != undefined) {
			ibillsMainCC.detaiList[element].remark = rowData.remark;
		}
	});
	
	//权限设置  修改
	var ac_cc = '';
	if(num == '7') {
		ac_cc = 'tjdb_update';
	}else if(num == '8') {
		ac_cc = 'bjdb_update';
	}else if(num == '10') {
		ac_cc = 'qtck_update';
	}
	
	//修改正式单据
	storageObj.saveToOfficial(1, ibillsMainCC,ac_cc, function(data) {
		var obj = data.data.row;
		if (obj != null) {
			if (copyString != 'copy') {
				$.zxsaas_plus.showalert("", "保存成功!");
				ibillsMainCC = obj;
				assign();
			} else {
				$.zxsaas_plus.showalert("", "复制成功!");
			}
		} else {
			$.zxsaas_plus.showalert("", "保存失败!");
		}
	});
}

/****************************串号监听、回车入库串号事件************************************/

//监听
function imeiMate() {
	$('#otherOutUl').html('');
	//右匹配  最少输入5位数或以上
	if ($('#otherOutstroNumIdStr').val().length >= 5) {
		var sectionId = AppEvent.triggerHandler('getSectionId');
		var param = {
			imeiLength: $('#otherOutstroNumIdStr').val().length,
			imei: $('#otherOutstroNumIdStr').val(),
			sectionId: sectionId
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

//回车添加到明细表格
function EnterPressOtherImei() {
	//在找到已有串号时跳出方法
	var findBills = true;
	//输入串号不能相同
	var imeiStatus = true;
	//是否输入过同样的值，有的话就不进入判断
	if (event.keyCode == 13) {
		// 如果不存在部门
		var sectionId = AppEvent.triggerHandler('getSectionId');
		if (sectionId.trim() == '') {
			$.zxsaas_plus.showalert('', '请选择部门!');
			return false;
		}
		if ($('#otherOutstroNumIdStr').val().length >= 5) {
			var param = {
				imeiLength: $('#otherOutstroNumIdStr').val().length,
				imei: $('#otherOutstroNumIdStr').val(),
				sectionId: sectionId
			};
			storageObj.imeiMate(param, function(data) {
				var dataList = data.data.rows;
				if (dataList && dataList.length) {
					var rowIds = $("#jqGrid_SubjectBalance").jqGrid('getDataIDs');
					//是否仓库、商品相同，有数量上+1
					$.each(rowIds, function(index, idIndex) { //遍历每个id 找到每个data 并把属性加到初始化数组里 
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
							arithmeticNo(idIndex, rowData.price, imDetaiList2[idIndex].length);
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
/****************************仓库弹窗、商品弹窗、部门弹窗点击事件方法************************************/



//获取现库存
function findStockNumber() {
	var sectionId = '';
	if (num == '7' || num == '8') {
		sectionId = $('#outDepartmentId').val();
	} else if (num == '10') {
		sectionId = $('#sectionId').val();
	}
	var rowData = $('#jqGrid_SubjectBalance').jqGrid('getRowData', jqgridRowId);
	if (rowData.storageId != null && rowData.storageId != '' && rowData.goodsId != null && rowData.goodsId != '') {
		storageObj.findStockNumber(rowData.storageId, rowData.goodsId, sectionId, function(data) {
			var rowObject = data.data.row;
			if (rowObject != null && rowObject != undefined) {
				$("#jqGrid_SubjectBalance").jqGrid('setCell', jqgridRowId, 'stockNumber', rowObject.stockNumber);
				$("#jqGrid_SubjectBalance").jqGrid('setCell', jqgridRowId, 'ifManageImei', rowObject.ifManageImei);
				$("#jqGrid_SubjectBalance").jqGrid('setCell', jqgridRowId, 'price', rowObject.price);
				//用来存放这一列的串号
				imDetaiList3[jqgridRowId] = [];
				//防止  4.回车，选择数量仓库，在还原仓库，数量变0.
				imDetaiList2[jqgridRowId] = [];
				arithmeticNo(jqgridRowId, rowObject.price, rowData.goodsNumber);
			} else {
				$("#jqGrid_SubjectBalance").jqGrid('setCell', jqgridRowId, 'stockNumber', 0);
				//				$("#jqGrid_SubjectBalance").jqGrid('setCell',jqgridRowId,'ifManageImei',null); 
				$("#jqGrid_SubjectBalance").jqGrid('setCell', jqgridRowId, 'price', 0);
				$("#jqGrid_SubjectBalance").jqGrid('setCell', jqgridRowId, 'goodsNumber', 0);
				arithmeticNo(jqgridRowId, 0, 0);
			}
		});
	}
}


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
		$("#jqGrid_SubjectBalance").jqGrid('setCell', id, "goodsId", goods.id);
		$("#jqGrid_SubjectBalance").jqGrid('setCell', id, "goodsName", goods.name);
		var ifManageImei = goods.ifManageImei == 'true' ? 1 : 0;
		$("#jqGrid_SubjectBalance").jqGrid('setCell', id, "ifManageImei", ifManageImei);
		$('#goodsnameReferenceModal').modal('hide');
		findStockNumber();
		//		setTimeout('MyEiditGrid.getFocus('+'"#'+inptid+'")',200);
	};
	jqgridRowId = id;
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
		$('#selImei').prop("disabled", false);
		$('#goodsnameReferenceModal').modal('hide');
	};
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



/*********************************公共的计算方式赋值***************************************/
/***changeAllotCC.js 算法单价乘数量等于总额***/
function arithmeticNo(rowid, price, goodsNumber) {
	$("#jqGrid_SubjectBalance").jqGrid('setCell', rowid, 'amount', goodsNumber * price);
}
/***button 过账红冲***/
function otherOutStorageGzHc(num){
	if(num == 1 && $('#slideThree').val() == 0){
		$.zxsaas_plus.showalert("提示信息","请选择一张草稿单过账!");
		return false; 
	}
	if(num == 2 && $('#slideThree').val() == 1){
		$.zxsaas_plus.showalert("提示信息","请选择一张正式单红冲!");
		return false; 
	}
	if($.isEmptyObject(ibillsMainCC) || ibillsMainCC == undefined){
		$.zxsaas_plus.showalert("提示信息","请选择一张单据!");
		return false; 
	}
	
	//权限设置    过账红冲
	var ac_cc = '';
	if(num == 1) {
		ac_cc = 'qtck_gz';
	}else if(num == 2) {
		ac_cc = 'qtck_hc';
	}
	
	storageObj.otherOutStorage(ibillsMainCC.id,'QTCK',num,$('#hcTime').val(),ac_cc,function(data){
		//判断权限
		if(data.desc != null) {
			$.zxsaas_plus.showalert("提示信息", data.desc);
			return false;
		}
		
		var str = data.data.str;
		$.zxsaas_plus.showalert("",str);
		if(str == '成功'){
			if(num == '1'){
				$("#slideThree").click();
			}else{
				$('#hcModal').modal('hide');
				lastForm();
			}
		}
	}); 
}
//***button 红冲弹窗***//
function hcClick(){
	$('#hcModal').modal('show');
	
	$("#hcTime").val($.DateFormat(new Date(),"yyyy-MM-dd"));
	
	$("#hcTime").datetimepicker({
		  lang:"ch",           //语言选择中文
	    format:"Y-m-d",      //格式化日期
	    timepicker:false,    //关闭时间选项
	    todayButton:false    //关闭选择今天按钮
		});
}

//***button 打印***//
function print(){
	if(ibillsMainCC != undefined && ibillsMainCC != null && ibillsMainCC.id != null && ibillsMainCC.id != undefined){
		$.printBills(basePath + '/storagePrint/print/transferPrice/'+'qtck_print', 
			{
		      billsId:ibillsMainCC.id,
		      statusBills:$("#slideThree").is(':checked')?0:1,
		      printType:$('input[name="printRadio"]:checked').val(),
		      startTime:$('#startTimeStr').val(),
		      endTime:$('#endTimeStr').val()
		    }
		);
	}else{
		$.zxsaas_plus.showalert("提示信息","请选择一张草稿单或正式单!");
	}
	$('#printModal').modal('hide');
}
