/*******************************************存放一些全局变量  商品借出******************************************/
var ibillsMainCC = new Object(); //商品借出单

var detaiList = new Array(); //商品借出单数量集合

var imDetaiList = new Array(); //串号

var jqgridRowId; //行id

var imDetaiList2 = new Array(); //	//表体串号数据

var imDetaiList3 = new Array(); //表体对应行串号数据

var importNumId = ''; //引入数量表id字符串

var importImId = {}; //引入串号表id对应数量表id数组

var pageNumber = 1; //当前页

var pageCount = 1; //最后页数
/*******************************************存放一些全局变量  借出还回******************************************/
var ibillsMainCCLend = new Object(); //借出还回单

var lendBackList = new Array(); //借出还回单集合

var importNumId2 = ''; //引入数量表id字符串
/*********************首先判断哪些没有数据的时候不能操作的按钮有	新增、执行*****************************/
/***button 刷新***/
function onclickRefresh() {
	location.reload();
}

/***button 切换单据***/
$("#slideThree").click(function() {
	$(".slideThree").toggleClass("color7D5F50"); //  0正式单据  1草稿单据
	$('#slideThree').prop('checked') ? $('#slideThree').val('0') : $('#slideThree').val('1');
	pageNumber = 1; //当前页
	pageCount = 1; //最后页数
	if (tabNum == 0) {
		detaiList = [];
		imDetaiList = [];
		imDetaiList2 = [];
		imDetaiList3 = [];
		$('#ibillsHeadLend').clearForm(true);
		jQuery("#jqGrid_SubjectBalance").jqGrid("clearGridData");
		ibillsMainCC = {};
	} else if (tabNum == 1) {
		lendBackList = [];
		ibillsMainCCLend = {};
		$('#ibillsHeadLendBack').clearForm(true);
		jQuery("#jqGrid_loan").jqGrid("clearGridData");
	}
	filterSelect();
});

/***button 新增***/
function onclickNewBills() {
	if (tabNum == 0) {
		//判断页面是否有动过的痕迹        若当前页面在保存前没有做过任何修改，无需提示
		var status1 = false;
		var status2 = false;
		var params = $('#ibillsHeadLend').formToArray();
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
			$.zxsaas_plus.showconfirm("", '当前页面数据未保存，是否放弃本次操作并打开一个新页面?', function() {
				if ($('#slideThree').prop('checked')) {
					//  0正式单据  1草稿单据
					$(".slideThree").toggleClass("color7D5F50");
					$('#slideThree').attr('checked', false);
					$('#slideThree').val('1');
				}
				$('#ibillsHeadLend').clearForm(true);
				jQuery("#jqGrid_SubjectBalance").jqGrid("clearGridData");
				ibillsMainCC = {};
				//赋值表尾
				$('#footerCompany').val('');
				$('#footerCreate').val('');
				$('#footerUpdate').val('');
				$('#footerPost').val('');
				//					$('#footerBack').val(ibillsMainCC.);
				statusData = true;
				initNull();
				//章子
				if ($('#slideThree').val() == 0) {
					$.showBillsStatus("billsStautsImg", ibillsMainCC.billsStatus);
				} else {
					$.showBillsStatus("billsStautsImg", "1");
				}
			}, function() {
				//				$("#slideThree").unbind( "change" );
				//				$("#slideThree").click();
			});
		}
		if ($('#slideThree').prop('checked')) {
			//  0正式单据  1草稿单据
			$(".slideThree").toggleClass("color7D5F50");
			$('#slideThree').attr('checked', false);
			$('#slideThree').val('1');
		}
	} else if (tabNum == 1) {
		//判断页面是否有动过的痕迹        若当前页面在保存前没有做过任何修改，无需提示
		var status1 = false;
		var status2 = false;
		var params = $('#ibillsHeadLendBack').formToArray();
		var rowIds = $("#jqGrid_loan").getDataIDs();
		params.billsCode = $('#billsCode2').val();
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
				$('#ibillsHeadLendBack').clearForm(true);
				jQuery("#jqGrid_loan").jqGrid("clearGridData");
				ibillsMainCCLend = {};
				//赋值表尾
				$('#footerCompany').val('');
				$('#footerCreate').val('');
				$('#footerUpdate').val('');
				$('#footerPost').val('');
				//章子
				if ($('#slideThree').val() == 0) {
					$.showBillsStatus("billsStautsImg2", ibillsMainCCLend.billsStatus);
				} else {
					$.showBillsStatus("billsStautsImg2", "1");
				}
			}, function() {
				//				$("#slideThree").unbind( "change" );
				//				$("#slideThree").click();
			});
		}
		if ($('#slideThree').prop('checked')) {
			//  0正式单据  1草稿单据
			$(".slideThree").toggleClass("color7D5F50");
			$('#slideThree').attr('checked', false);
			$('#slideThree').val('1');
		}
	} else {
		//未知清空
		alert('tab页不在商品借入单和借入归还单内');
	}
}

/***button 保存***/
function onClickExecute() {
	//判断页面数量调整表格是否有数据                  //暂时制作这个判断，不知道前面需不需要必填
	if (tabNum == 0) {
		lastrow != undefined && $("#jqGrid_SubjectBalance").jqGrid("saveCell", lastrow, lastcell);
		var rowIds1 = $("#jqGrid_SubjectBalance").getDataIDs();
		var status1 = false;

		//表单验证  
		$("#ibillsHeadLend").data('bootstrapValidator').validate();
		if (!($('#ibillsHeadLend').data('bootstrapValidator').isValid())) {
			refreshValidator('#ibillsHeadLend');
			return;
		}

		status1 = rowIds1.length == 0 ? false : true;
		if (status1) {
			saveBills();
		}
	} else if (tabNum == 1) {
		lastrow2 != undefined && $("#jqGrid_loan").jqGrid("saveCell", lastrow2, lastcell2);
		var status2 = false;

		//表单验证  
		$("#ibillsHeadLendBack").data('bootstrapValidator').validate();
		if (!($('#ibillsHeadLendBack').data('bootstrapValidator').isValid())) {
			refreshValidator('#ibillsHeadLendBack');
			return;
		}

		var rowIds2 = $("#jqGrid_loan").getDataIDs();
		status2 = rowIds2.length == 0 ? false : true;
		if (status2) {
			saveBills2();
		}
	}
}

/***button 删除***/
function onClickDelete() {
	if (tabNum == 0) {
		if (ibillsMainCC != null && ibillsMainCC != undefined && ibillsMainCC.id != undefined && ibillsMainCC.id != null && ibillsMainCC.billsCode == undefined) {
			$.zxsaas_plus.showconfirm("", "是否删除当前单据?", function() {
				storageObj.deleteIbillsMainDraftCC(ibillsMainCC.id, 1,'jcgl_del', function(data) {
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
	} else if (tabNum == 1) {
		if (ibillsMainCCLend != null && ibillsMainCCLend != undefined && ibillsMainCCLend.id != undefined && ibillsMainCCLend.id != null && ibillsMainCCLend.billsCode == undefined) {
			$.zxsaas_plus.showconfirm("", "是否删除当前单据?", function() {
				storageObj.deleteIbillsMainDraftCC(ibillsMainCCLend.id, 4,'jcgl_del', function(data) {
					if($.ac_cc(data)) return false;  //判断权限
					
					var str = data.data.str;
					if (str == '删除失败!') {
						$.zxsaas_plus.showalert("提示信息", str);
						return false;
					}
					$('#ibillsHeadLendBack').clearForm(true);
					jQuery("#jqGrid_loan").jqGrid("clearGridData");
					ibillsMainCCLend = {};
					upForm();
				});

			}, function() {

			});
		} else {
			$.zxsaas_plus.showalert("", "请选择一张草稿单删除!");
		}
	}
}

/***button 过账红冲***/
function loanGoodsGzHc(num) {
	//权限设置    过账红冲
	var ac_cc = '';
	if(num == 1) {
		ac_cc = 'jcgl_gz';
	}else if(num == 2) {
		ac_cc = 'jcgl_hc';
	}
	
	if (tabNum == 0) {
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
		storageObj.loanGoods(ibillsMainCC.id, 'SPJC', num, $('#hcTime').val(),ac_cc, function(data) {
			if($.ac_cc(data)) return false;  //判断权限
			
			var str = data.data.str;
			$.zxsaas_plus.showalert("", str);
			if (str == '成功') {
				$("#slideThree").click();
			}
		});
	} else if (tabNum == 1) {
		if (num == 1 && $('#slideThree').val() == 0) {
			$.zxsaas_plus.showalert("提示信息", "请选择一张草稿单过账!");
			return false;
		}
		if (num == 2 && $('#slideThree').val() == 1) {
			$.zxsaas_plus.showalert("提示信息", "请选择一张正式单红冲!");
			return false;
		}
		if ($.isEmptyObject(ibillsMainCCLend) || ibillsMainCCLend == undefined) {
			$.zxsaas_plus.showalert("提示信息", "请选择一张单据!");
			return false;
		}
		storageObj.loanBackGoods(ibillsMainCCLend.id, 'JCHH', num, $('#hcTime').val(),ac_cc, function(data) {
			if($.ac_cc(data)) return false;  //判断权限
			
			var str = data.data.str;
			$.zxsaas_plus.showalert("", str);
			if (str == '成功') {
				$("#slideThree").click();
			}
		});
	}
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

/****************************然后点击就可以出现数据的按钮	  过滤************************************/
/***button 过滤***/
function filterSelect() {
	//tab 切换  过滤
	if (tabNum == 0) {
		$('#filtrationChoose').modal('hide');
		//商品借出单
		$('#selBillsTypeStr').val(14); //单据类型
		$('#pageNumber').val(pageNumber); //当前页
		//查正式单 或  草稿单
		if ($('#slideThree').val() == 0) {
			$('#statusBills').val(0);
			var formParams = $("#filterForm").serializeObject();
			//单据状态
			if($('#selBillsStatuStr').is(':checked')) {
				formParams.selBillsStatuStr = "6,7";
			}else {
				formParams.selBillsStatuStr = "6";
			}
			storageObj.filterLendGoods(formParams, function(data) {
				if($.ac_cc(data)) return false;  //判断权限
				
				ibillsMainCC = data.data.rows.length == 0 ? ibillsMainCC = {} : ibillsMainCC = data.data.rows[0];
				pageCount = data.data.total;
				if (!$.isEmptyObject(ibillsMainCC) && ibillsMainCC != undefined) {
					assign();
				} else {
					//					elseInitNull();
					$("#slideThree").unbind("change");
					$("#slideThree").click();
				}
			});
			
		} else if ($('#slideThree').val() == 1) {
			$('#statusBills').val(1);
			var formParams = $("#filterForm").serializeObject();
			storageObj.filterLendGoods(formParams, function(data) {
				if($.ac_cc(data)) return false;  //判断权限
				
				ibillsMainCC = data.data.rows.length == 0 ? ibillsMainCC = {} : ibillsMainCC = data.data.rows[0];
				pageCount = data.data.total;
				if (!$.isEmptyObject(ibillsMainCC) && ibillsMainCC != undefined) {
					assign();
				} else {
					elseInitNull();
				}
			});
			$('#billsDateString').inputCombination().timeControl()
		}
	} else if (tabNum == 1) {
		$('#filtrationChoose').modal('hide');
		//借出还回  单
		$('#selBillsTypeStr').val(15); //单据类型
		$('#pageNumber').val(pageNumber); //当前页
		//查正式单 或  草稿单
		if ($('#slideThree').val() == 0) {
			$('#statusBills').val(0);
			var formParams = $("#filterForm").serializeObject();
			//单据状态
			if($('#selBillsStatuStr').is(':checked')) {
				formParams.selBillsStatuStr = "6,7";
			}else {
				formParams.selBillsStatuStr = "6";
			}
			storageObj.filterLendBack(formParams, function(data) {
				if($.ac_cc(data)) return false;  //判断权限
				
				ibillsMainCCLend = data.data.rows.length == 0 ? ibillsMainCCLend = {} : ibillsMainCCLend = data.data.rows[0];
				pageCount = data.data.total;
				if (!$.isEmptyObject(ibillsMainCCLend) && ibillsMainCCLend != undefined) {
					assignLendBack();
				} else {
					//					elseInitNull2();
					$("#slideThree").unbind("change");
					$("#slideThree").click();
				}
			});
		} else if ($('#slideThree').val() == 1) {
			$('#statusBills').val(1);
			var formParams = $("#filterForm").serializeObject();
			storageObj.filterLendBack(formParams, function(data) {
				if($.ac_cc(data)) return false;  //判断权限
				
				ibillsMainCCLend = data.data.rows.length == 0 ? ibillsMainCCLend = {} : ibillsMainCCLend = data.data.rows[0];
				pageCount = data.data.total;
				if (!$.isEmptyObject(ibillsMainCCLend) && ibillsMainCCLend != undefined) {
					assignLendBack();
				} else {
					elseInitNull2();
				}
			});
			$('#billsDateString2').inputCombination().timeControl()
		}
	} else {
		//未知清空
		alert('tab页不在商品借入单和借入归还单内');
	}
}

function elseInitNull() {
	$('#ibillsHeadLend').clearForm(true);
	jQuery("#jqGrid_SubjectBalance").jqGrid("clearGridData");
	//赋值表尾
	$('#footerCompany').val('');
	$('#footerCreate').val('');
	$('#footerUpdate').val('');
	$('#footerPost').val('');
	//	$('#footerBack').val('');
	initNull();
	$.showBillsStatus("billsStautsImg", "1");
	$('#billsDateString').inputCombination().timeControl()

}

function elseInitNull2() {
	$('#ibillsHeadLendBack').clearForm(true);
	jQuery("#jqGrid_loan").jqGrid("clearGridData");
	//赋值表尾
	$('#footerCompany').val('');
	$('#footerCreate').val('');
	$('#footerUpdate').val('');
	$('#footerPost').val('');
	//	$('#footerBack').val('');
	initNull();
	$.showBillsStatus("billsStautsImg2", "1");
	$('#billsDateString2').inputCombination().timeControl()
}

/***button 重置***/
function resetFilter() {
	$('#filterForm').clearForm(true);
	$('#pageSize').val(1);
	var selectHtml = '<option value="">请选择部门</option>';
	$('#selStorageIdStr').html('');
	$('#selStorageIdStr').append(selectHtml);
}

/****************************根据规则来进行上一单、首单、下一单、末单操作************************************/

//默认搜索条件：	部门ID，单据类型
/**  规则说明：	1.每个按钮都能点，第一次点击个个按钮效果说明，	上一单：显示最后一单。	首单：显示第一单。下一单：不显示（因为他说没有下一单了）。	末单：最后一单。
 * 	 			2.第一次点击了上一单之后点击按钮效果说明，		上一单：显示倒数第二单。	首单：显示第一单。下一单：不变化（当前是最后一单了）。		末单：不变化（当前是最后一单了）。
 * 	 根据上面的模拟点击，找出规律。
 */


/***button 上一单***/
function upForm() {
	//tab 切换  过滤
	//	if(tabNum == 0){
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

//赋值
function assign() {
	importNumId = '';
	importImId = {};
	jQuery("#jqGrid_SubjectBalance").jqGrid("clearGridData");
	$('#ibillsHeadLend').clearForm(true);
	if (ibillsMainCC != undefined) {
		detaiList = ibillsMainCC.detaiList;
		//赋值表头
		var params = $('#ibillsHeadLend').formToArray();
		$(params).each(function(index, element) {
			var key = element.name;
			var value = eval("ibillsMainCC." + key);
			$('#' + key).val(value);
		});
		//根据部门选择仓库
		if (ibillsMainCC.sectionId != null) {
			initManagers();
			//			$('#contactName').removeAttr('disabled');
			//			$('#contactName').val(ibillsMainCC.contactName);
		} else {
			initNull();
		}
		$('#billsCode').val(ibillsMainCC.billsCode);
		$('#managersUid').val(ibillsMainCC.managersUid);
		$(detaiList).each(function(index, element) {
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
		if (ibillsMainCC.sectionId != null) {
			initStorage();
		}
	}
	//章子
	if ($('#slideThree').val() == 0) {
		$.showBillsStatus("billsStautsImg", ibillsMainCC.billsStatus);
	} else {
		$.showBillsStatus("billsStautsImg", "1");
	}
}

//赋值
function assignLendBack() {
	importNumId2 = '';
	$('#ibillsHeadLendBack').clearForm(true);
	jQuery("#jqGrid_loan").jqGrid("clearGridData");
	lendBackList = ibillsMainCCLend.lendBackList;
	//赋值表头
	var params = $('#ibillsHeadLendBack').formToArray();
	$(params).each(function(index, element) {
		var key = element.name;
		var value = eval("ibillsMainCCLend." + key);
		$('#' + key + '2').val(value);
	});

	//根据部门选择仓库
	if (ibillsMainCCLend.sectionId != null) {
		initManagers();
		//		$('#contactName2').removeAttr('disabled');
		//		$('#contactName2').val(ibillsMainCCLend.contactName);
	} else {
		initNull();
	}
	$('#billsCode2').val(ibillsMainCCLend.billsCode);
	$('#managersUid2').val(ibillsMainCCLend.managersUid);
	//赋值表体
	if (lendBackList != undefined && lendBackList.length != 0) {
		for (var i = 0; i < lendBackList.length; i++) {
			if (importNumId2 != '') importNumId2 += ',';
			importNumId2 += lendBackList[i].id; //添加   单据数量表id
			lendBackList[i].borrowLendDateString = lendBackList[i].lendDateString;
			lendBackList[i].borrowLendNum = lendBackList[i].borrowNum;
			$("#jqGrid_loan").jqGrid('addRowData', i, lendBackList[i]);
		}
	}
	//赋值表尾
	$('#footerCompany').val(ibillsMainCCLend.companyName);
	$('#footerCreate').val(ibillsMainCCLend.createName);
	$('#footerUpdate').val(ibillsMainCCLend.updateName);
	$('#footerPost').val(ibillsMainCCLend.postName);
	//	$('#footerBack').val(ibillsMainCC.);
	//章子
	if ($('#slideThree').val() == 0) {
		$.showBillsStatus("billsStautsImg2", ibillsMainCCLend.billsStatus);
	} else {
		$.showBillsStatus("billsStautsImg2", "1");
	}
}

/**********************************保存****************************************/
function saveBills2() {
	if ($('#slideThree').val() == 0 && ibillsMainCCLend != undefined && ibillsMainCCLend.importBills == 1) {
		//0正式单据
		billsUpdate2();

	} else if (ibillsMainCCLend != undefined && $('#slideThree').val() == 1) {
		//1草稿单据
		if (ibillsMainCCLend.importBills == 1) {
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
	var params = $('#ibillsHeadLend').formToArray();
	var rowIds = $("#jqGrid_SubjectBalance").getDataIDs();
	//获取表头
	$(params).each(function(index, element) {
		var key = element.name;
		ibillsMainCC[key] = element.value;
	});
	ibillsMainCC.billsType = '14';
	//获取表体
	ibillsMainCC.detaiList = new Array();
	$(rowIds).each(function(index, element) {
		var rowData = $("#jqGrid_SubjectBalance").jqGrid("getRowData", element);
		if (rowData.storageId == '' || rowData.goodsId == '') {
			return true;
		}
		delete rowData.deliveryDo;
		rowData.storageName = null;
		rowData.goodsName = null;
		ibillsMainCC.detaiList[element] = rowData;
		//获取表体串号
		if (parseInt(rowData.ifManageImei) == 1) {
			ibillsMainCC.detaiList[element].imDetaiList = new Array();
			ibillsMainCC.detaiList[element].imDetaiList = imDetaiList2[element];
		}
	});
	//新增
	storageObj.saveNewBills(ibillsMainCC,'jcgl_add', function(data) {
		if($.ac_cc(data)) {
			ibillsMainCC = {};
			return false;  //判断权限
		}
		
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
	var params = $('#ibillsHeadLend').formToArray();
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
	//修改草稿
	storageObj.saveToDraft(ibillsMainCC,'jcgl_update', function(data) {
		if($.ac_cc(data)) {
			ibillsMainCC = {};
			return false;  //判断权限
		}
		
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
	//获取表头
	ibillsMainCC.remark = $('#remark').val();
	$(rowIds).each(function(index, element) {
		var rowData = $("#jqGrid_SubjectBalance").jqGrid("getRowData", element);
		if (rowData.storageId == '' || rowData.goodsId == '') {
			return true;
		}
		if (ibillsMainCC.detaiList[element] != undefined) {
			ibillsMainCC.detaiList[element].remark = rowData.remark;
		}
	});
	//修改正式单据
	storageObj.saveToOfficial(1, ibillsMainCC,'jcgl_update', function(data) {
		if($.ac_cc(data)) {
			ibillsMainCC = {};
			return false;  //判断权限
		}
		
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


/***function 草稿单据-新增***/
function draftBillsInsert2() {
	var params = $('#ibillsHeadLendBack').formToArray();
	var rowIds = $("#jqGrid_loan").getDataIDs();
	//获取表头
	$(params).each(function(index, element) {
		var key = element.name;
		ibillsMainCCLend[key] = element.value;
	});
	ibillsMainCCLend.billsType = '15';
	//获取表体
	ibillsMainCCLend.lendBackList = new Array();
	$(rowIds).each(function(index, element) {
		var rowData = $("#jqGrid_loan").jqGrid("getRowData", element);
		if (rowData.borrowLendDateString == '' || rowData.goodsId == '' || rowData.borrowLendNum == '') {
			return true;
		}
		rowData.lendDateString = rowData.borrowLendDateString;
		rowData.borrowNum = rowData.borrowLendNum;
		delete rowData.metaName;
		delete rowData.borrowLendNum;
		delete rowData.borrowLendDateString;
		delete rowData.deliveryDo;
		ibillsMainCCLend.lendBackList[element] = rowData;
	});
	//新增
	storageObj.saveNewLendBackDetailDraft(ibillsMainCCLend, function(data) {
		if($.ac_cc(data)) {
			ibillsMainCCLend = {};
			return false;  //判断权限
		}
		
		var obj = data.data.row;
		if (obj != null) {
			$.zxsaas_plus.showalert("", "保存成功!");
			ibillsMainCCLend = obj;
			lastForm();
		} else {
			$.zxsaas_plus.showalert("", "保存失败!");
		}
	});
}

/***function 草稿单据-引入***/
function draftBillsImport2(copyString) {
	var params = $('#ibillsHeadLendBack').formToArray();
	var rowIds = $("#jqGrid_loan").getDataIDs();
	//获取表头
	$(params).each(function(index, element) {
		var key = element.name;
		ibillsMainCCLend[key] = element.value;
	});
	//获取表体
	$(rowIds).each(function(index, element) {
		var rowData = $("#jqGrid_loan").jqGrid("getRowData", element);
		if (rowData.borrowLendDateString == '' || rowData.goodsId == '' || rowData.borrowLendNum == '') {
			return true;
		}
		rowData.lendDateString = rowData.borrowLendDateString;
		rowData.borrowNum = rowData.borrowLendNum;
		delete rowData.metaName;
		delete rowData.borrowLendNum;
		delete rowData.borrowLendDateString;
		delete rowData.deliveryDo;
		ibillsMainCCLend.lendBackList[element] = rowData;
	});
	ibillsMainCCLend.importNumId = importNumId2;
	//修改草稿
	storageObj.saveLendBackDetailDraft(ibillsMainCCLend, function(data) {
		if($.ac_cc(data)) {
			ibillsMainCCLend = {};
			return false;  //判断权限
		}
		
		var obj = data.data.row;
		if (obj != null) {
			if (copyString != 'copy') {
				$.zxsaas_plus.showalert("", "修改成功!");
				ibillsMainCCLend = obj;
				assignLendBack();
			} else {
				$.zxsaas_plus.showalert("", "复制成功!");
			}
		} else {
			$.zxsaas_plus.showalert("", "修改失败!");
		}
	});
}

/****************************仓库弹窗、商品弹窗、部门弹窗点击事件方法************************************/

//获取现库存
function findStockNumber() {
	var rowData = $('#jqGrid_SubjectBalance').jqGrid('getRowData', jqgridRowId);
	if (rowData.storageId != null && rowData.storageId != '' && rowData.goodsId != null && rowData.goodsId != '') {
		storageObj.findStockNumber(rowData.storageId, rowData.goodsId, $("#sectionId").val(), function(data) {
			var rowObject = data.data.row;
			if (rowObject != null && rowObject != undefined) {
				$("#jqGrid_SubjectBalance").jqGrid('setCell', jqgridRowId, 'ifManageImei', rowObject.ifManageImei);
				$("#jqGrid_SubjectBalance").jqGrid('setCell', jqgridRowId, 'price', rowObject.price);
				//用来存放这一列的串号
				imDetaiList3[jqgridRowId] = [];
				//防止  4.回车，选择数量仓库，在还原仓库，数量变0.
				imDetaiList2[jqgridRowId] = [];
				arithmeticNo(jqgridRowId, rowObject.price, rowData.goodsNumber);
			} else {
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
		$("#jqGrid_SubjectBalance").saveCell(lastrow, lastcell);
		$("#jqGrid_SubjectBalance").setCell(id, 'goodsName', goods.name);
		$("#jqGrid_SubjectBalance").jqGrid('setCell', id, "goodsId", goods.id);
		var ifManageImei = goods.ifManageImei == 'true' ? 1 : 0;
		$("#jqGrid_SubjectBalance").jqGrid('setCell', id, "ifManageImei", ifManageImei);
		$('#goodsnameReferenceModal').modal('hide');
		findStockNumber();
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
			case 'contactName':
				//设置编辑器值
				$('#contactName').val(contactUnit.name);
				$('#contactsunitId').val(contactUnit.id);
				break;
			case 'contactName2':
				//设置编辑器值
				$('#contactName2').val(contactUnit.name);
				$('#contactsunitId2').val(contactUnit.id);
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
		refreshValidatorField("contactName", '#ibillsHeadLend'); //刷新验证信息
	};
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

//选项卡      0.商品借入单   1.借入归还
var tabNum = 0;

//输入过的串号存放数组
var inputValueArr = new Array();
//校验回车的次数
var verifyCount = 0;

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
	var imeiStatus = true; //输入串号不能相同
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
							$("#jqGrid_SubjectBalance").jqGrid('setCell', index, 'goodsNumber', parseInt(rowData.goodsNumber) + 1);
							imDetaiList3[idIndex].push(dataList[0]);
							imDetaiList2[idIndex] = imDetaiList3[idIndex];
							arithmeticNo(index, rowData.price, imDetaiList2[idIndex].length);
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

/***button 确定  引入借出未还回单据***/
function onclickImport(id) {
	jQuery("#jqGrid_loan").jqGrid("clearGridData");
	if (id != undefined && id != null && id != '') {
		var rowData = $("#jqGrid_import").jqGrid("getRowData", id);
		rowData.revertNum = rowData.surNum; //本次还回数量
		rowData.revertImei = rowData.imei; //本次还回串号
		rowData.notBackNum = rowData.surNum - rowData.revertNum; //未还回剩余数量
		$('#jqGrid_loan').jqGrid('addRowData', 0, rowData);
	} else {
		var selRowIds = $("#jqGrid_import").jqGrid('getGridParam', 'selarrrow');
		$(selRowIds).each(function(index, element) {
			var rowData = $("#jqGrid_import").jqGrid("getRowData", element);
			rowData.revertNum = rowData.surNum; //本次还回数量
			rowData.revertImei = rowData.imei; //本次还回串号
			rowData.notBackNum = rowData.surNum - rowData.revertNum; //未还回剩余数量
			$('#jqGrid_loan').jqGrid('addRowData', index, rowData);
		});
	}
	$('#importChoose').modal('hide');
}

/***onclick 引入记录***/
function importBorrowLend() {
	if ($('#contactsunitId2').val() == null || $('#contactsunitId2').val() == '') {
		$.zxsaas_plus.showalert("", "请先选择往来单位!");
		return false;
	}
	$('#showContactUnit').html($('#contactName').val());;
	$('#importChoose').modal('show');
	var param = new Object();
	param.type = 2;
	param.contactId = $('#contactsunitId2').val();
	$("#jqGrid_import").jqGrid('setGridParam', {
		url: basePath + "/jxc/storage/borrowManage/importBorrowOrLend",
		postData: param, //发送数据 
		page: 1
	}).trigger("reloadGrid"); //重新载入 

}

/*********************************公共的计算方式赋值***************************************/
/***changeAllotCC.js 算法单价乘数量等于总额***/
function arithmeticNo(rowid, price, goodsNumber) {
	$("#jqGrid_SubjectBalance").jqGrid('setCell', rowid, 'amount', goodsNumber * price);
}