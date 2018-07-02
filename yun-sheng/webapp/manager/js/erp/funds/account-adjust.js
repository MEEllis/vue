var heXiaoObj = null; // 核销  元素对象
var isRedOrder = 0;  //是否为红冲单

$(function () {
	loadHeXiao();
	hxGrid();
	initTime();
	getAuthList(initDealDate);
	initPageData();
	//	是否从报表进入
	if (billsCode != "" || billId != '') {
		pageIndex = 1
		var param = getSelectPageParam();
		param.refBillsId = billId
		param.billsCode = billsCode
		param.refBillsDate = billDate
		param.queryCodeStr = "L";
		pageAjax(param);
	} else {
		getDefaultValues();
	}
	contactunitGrid();
	managerGrid();
	getPosition();
    //输入框得到焦点时
    $("input").on('focus',function(){
        this.select()
    })
});

//载入核销表格 dom
function loadHeXiao() {
	var option = {
		//保存 事件
		hxSave: function () {
			hxSave();
		},
		//编辑 事件
		hxEdit: function () {
			hxEdit();
		},
		//一键核销
		hxKye: function () {
			keyCancle();
		}
	};
	heXiaoObj = $(".boxmainDiv").oneKeyCancel(option);
}

//获取默认值
function getDefaultValues(){
	var obj={
		success:function(data){
			$('#billsHeaderForm input[name="sectionName"]').val(data.data.defaultSection.name)
			$('#billsHeaderForm input[name="sectionId"]').val(data.data.defaultSection.sectionId)
			$('#billsHeaderForm input[name="managerUname"]').val(data.data.defaultEmployee.name).data('id',data.data.defaultEmployee.employeeId)
			$('#billsHeaderForm input[name="managersUid"]').val(data.data.defaultEmployee.employeeId)
		}
	}
	InterfaceInventory.common.getDefaultValues(obj);
}

//重新载入
function reLoad() {
	//如果是红冲单
	if (isRedOrder == 1 || addFlag == true) {
		heXiaoObj.setDisabledbtn(["save", "edit", "key"]);
	} else {
		heXiaoObj.setUndisabledbtn(["save", "edit", "key"]);
	}
}

//调整金额值校验
$("#adjustAmount").bind("input propertychange", function () {
	clearNoNum(event, this);
});

$("#adjustAmount").blur(function () {
	verifyNum(this);
});

//调整金额输入框值改变事件
$("#adjustAmount").bind("input propertychange", function () {
	getAfterAmount();
});

var invalidFlag = 1;

//调整类型选择事件
var adjustType = "";

function selectAdjustType() {
	var contactsunitId = $("#contactsunitId").val();
	if (contactsunitId == "") {
		$.zxsaas_plus.showalert("提示", "请先选择往来单位");
		$("#adjustType").val("");
		return;
	}
	adjustType = $("#adjustType").val();
	if (addFlag == false && (adjustType == "YFJS" || adjustType == "YSJS" || adjustType == "YFKJS" || adjustType == "YSKJS")) {
		$(".boxmainDiv").css("display", "block");
	} else {
		$(".boxmainDiv").css("display", "none");
	}
	hideOrShowAmount();
	//获取往来单位余额
	if (adjustType != "" && contactsunitId != "") {
        var obj={
            data:{
                contactUnitId:contactsunitId,
            },
            success:function (data) {
                var contactInfo=data.data.contactUnitAmountVo;
                if ((adjustType == "YFZJ" || adjustType == "YFJS") || (adjustType == "YFKZJ" || adjustType == "YFKJS")) {
                    $("#yingfuAmount").val(contactInfo.shouldPayBalance);
                    $("#yufuAmount").val(contactInfo.prePayBalance);
                }
                if ((adjustType == "YSZJ" || adjustType == "YSJS") || (adjustType == "YSKZJ" || adjustType == "YSKJS")) {
                    $("#yingshouAmount").val(contactInfo.shouldReceiptBalance);
                    $("#yushouAmount").val(contactInfo.preReceiptBalance);
                }
            }
        }
        InterfaceInventory.common.getContactUnitAmountVo(obj)

        $("input[name='inpayClassName']").val('');
        $("input[name='inpayClassId']").val('');

            if((adjustType == "YSZJ" || adjustType == "YFJS") || (adjustType == "YFKZJ" || adjustType == "YSKJS")){

                $('#inpayClassName').comModalsInpayClass('setOption',{
                    girdParam:{
                        dataId:-2
                    },

                    treeParams:{
                        type:-2
                    },
                });
            }

            else if  ((adjustType == "YFZJ" || adjustType == "YSJS") || (adjustType == "YSKZJ" || adjustType == "YFKJS")) {
                $('#inpayClassName').comModalsInpayClass('setOption',{
                    girdParam:{
                        dataId:-3
                    },
                    treeParams:{
                        type:-3
                    },
                });
            }

        //载入类别
        getAfterAmount();
	}
}



    $('#inpayClassName').comModalsInpayClass({
        isReloadTree:true,
        clickback:function () {
            var obj= $("input[name='inpayClassName']");
            //设置编辑器值
            $("input[name='inpayClassName']").val(obj.val());
            $("input[name='inpayClassId']").val(obj.data('id'));
        }
    });


//初始化页面
function initPageData() {
	$.request({
		type: 'POST',
		contentType: 'application/json',
		url: options.InitPageDataUrl,
		async: false,
		success: function (data) {
			if (data.result == 1) {
				appendAdjustType(data.data.adjustTypeList, null);
				$(".invalid").attr("disabled", true);
				hideOrShowAmount();
			} else {
				$.zxsaas_plus.showalert("提示", data.desc);
			}
		}
	});
}

//隐藏或显示余额，
function hideOrShowAmount() {
	adjustType = $("#adjustType").val();
	if (adjustType == "") {
		$(".yingfuAmountDiv,.yufuAmountDiv,.yingshouAmountDiv,.yushouAmountDiv").hide();
		$(".inpayClassIdDiv").hide();
		return;
	}
	if ((adjustType == "YFZJ" || adjustType == "YFJS") || (adjustType == "YFKZJ" || adjustType == "YFKJS")) {
		$(".yingfuAmountDiv,.yufuAmountDiv").show();
		$(".yingshouAmountDiv,.yushouAmountDiv").hide();
	}
	if ((adjustType == "YSZJ" || adjustType == "YSJS") || (adjustType == "YSKZJ" || adjustType == "YSKJS")) {
		$(".yingfuAmountDiv,.yufuAmountDiv").hide();
		$(".yingshouAmountDiv,.yushouAmountDiv").show();
	}

	$(".inpayClassIdDiv").show();
}

//拼接调整类型下拉框
function appendAdjustType(adjustTypeList, obj) {
	$("#adjustType option:not(:first)").remove();
	if (adjustTypeList != "" && adjustTypeList.length > 0) {
		for (var i = 0; i < adjustTypeList.length; i++) {
			if (obj != null && obj != undefined && obj != "") {
				if (obj.adjustType == adjustTypeList[i].content3) {
					$("#adjustType").append("<option value='" + adjustTypeList[i].content3 + "' selected='selected'>" + adjustTypeList[i].content1 + "</option>");
				} else {
					$("#adjustType").append("<option value='" + adjustTypeList[i].content3 + "'>" + adjustTypeList[i].content1 + "</option>");
				}
			} else {
				$("#adjustType").append("<option value='" + adjustTypeList[i].content3 + "'>" + adjustTypeList[i].content1 + "</option>");
			}
		}
	}
}


var type = "";
var adjustType = $("#adjustType").val();
var options = {
	InitPageDataUrl: "../../funds/adjust/initPageData/",
	LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
	FilterPaymentUrl: "../../funds/payment/filterPayment/" + type,
	SaveAdjustUrl: "../../funds/adjust/saveAdjust",
	KeyHxUrl: "../../funds/payment/keyHx/" + type,
	iconJsonUrl: "../json/icon.json",
	btnbox: ".btnbox ",//功能按钮存放容器。遵照css选择器书写
	TableName: "#jqGrid_payment"
};

var total = 1;//总记录数
var pageIndex = 0;
var addFlag = true;//页面是否是新增状态


//填充付款单表头（主信息数据）
function fillTopData(data) {
	total = data.total;
	if (total > 0) {
		$("#copy").removeAttr("disabled");
		forbiddenEdit();
		$(".saveAndPost").attr("disabled", false).text('保存');
	}
	pageIndex = data.pageIndex;
	addFlag = data.addFlag;
	isRedOrder = 0;
	var billsHeader = data.rows[0];
	if (billsHeader.billsStatus == "6") {
		$('.rightMap img').attr('src', '../../images/guozhang.png');
		$(".btnHundred .invalid").removeAttr("disabled");
	}

	else if (billsHeader.billsStatus == "7") {
		$('.rightMap img').attr('src', '../../images/status/statusRed.png');
		$(".btnHundred .invalid").attr("disabled", "disabled");
		isRedOrder = 1;
	} else {
		$('.rightMap img').removeAttr("src");
	}

	//reserve2  为1是系统自动生成的 不能红冲
	if (billsHeader.reserve2 == 1) {
		$(".btnHundred .invalid").attr("disabled", "disabled");
	}

	if (billsHeader != undefined && billsHeader != "") {
		if (billsHeader.billsDate != null) {
			billsHeader.billsDate = billsHeader.billsDate.substring(0, 10);
		}
		$("#billsHeaderForm").writeJson2Dom(billsHeader);
		$("#bottomForm").writeJson2Dom(billsHeader);
		$("#contactUnitName").val(billsHeader.conatcUnitName);
		$("#managerUname").val(billsHeader.managersUname);
		$("#adjustAmount").val($.formatFloat(billsHeader.adjustAmount, 2));
		selectAdjustType();
        getAdjustBillsType()
		//翻页时更换收支类型的值
            $("#inpayClassName").data("inpayClassId", billsHeader.inpayClassId);
            $("#inpayClassName").val(billsHeader.inpayClassName);


	}
}

var filter = false;

//过滤查询
function searchPayment() {
	filter = true;
	pageIndex = 0;
	var param = comGetFilterParam();
	$("#filterModel").modal("hide");
	pageAjax(param);
}

//分页查询核销明细参数
function getSelectPageParam() {
	var param = comGetFilterParam();
	param.id = "";
	return param;
}

//首单
function firstPage() {
	var param = getSelectPageParam();
	param.queryCodeStr = "F";
	pageAjax(param);
}

//上一单按钮单击事件
function backPage() {
	var param = getSelectPageParam();
	param.queryCodeStr = "P";
	param.refBillsDate = $("#billsHeaderForm input[name='billsDate']").val();
	param.refBillsId = $("#billsHeaderForm input[name='id']").val();
	pageAjax(param);
}

//下一单按钮单击事件
function nextPage() {
	var param = getSelectPageParam();
	param.queryCodeStr = "N";
	param.refBillsDate = $("#billsHeaderForm input[name='billsDate']").val();
	param.refBillsId = $("#billsHeaderForm input[name='id']").val();
	if (param.refBillsId == "") {
		$.zxsaas_plus.showalert("提示", "没有下一单单据");
		return;
	}
	pageAjax(param);
}

//末单按钮单击事件
function lastPage() {
	var param = getSelectPageParam();
	param.queryCodeStr = "L";
	pageAjax(param);
}

//上一单，下一单,首单，末单分页查询ajax请求
function pageAjax(param) {
	addFlag = false;
	$.request({
		url: "../../funds/adjust/selectAdjustList/" + pageIndex,
		type: 'POST',
		dataType: "json",
		contentType: 'application/json',
		async: false,
		data: JSON.stringify(param),
		success: function (data) {
			if (data.result == 1 && data.data.rows.length != 0) {

				$(".invalid").removeAttr("disabled");
				jQuery("#jqGrid_SubjectBalance").jqGrid("clearGridData");
				//禁止页面编辑
				$("#jqGrid_payment").setGridParam({cellEdit: false});
				fillTopData(data.data);
				tranOrderVoList(data.data.orderVoList);
				fillHxDetail(data.data.orderVoList)
				reLoad();
				hideOrShowAmount();
			} else {
				$(".invalid").attr("disabled", true);
				$.zxsaas_plus.showalert("提示", data.desc || "未查询到数据!");
			}
		}
	});
}

//填充核销明细数据
function fillHxDetail(hxList, flag) {
	jQuery("#jqGrid_payment").jqGrid("clearGridData");
	if (hxList != undefined && hxList.length > 0) {
		for (var i = 0; i < hxList.length; i++) {
			if (flag != 1) {
				hxList[i].hasAmount = hxList[i].hasAmount - hxList[i].hxAmount;
			}

			$("#jqGrid_payment").jqGrid('addRowData', i + 1, hxList[i], 'last');
		}
	}
	jQuery("#jqGrid_payment").resize();
}

//重置
function reset() {
	$("#filterSearchForm")[0].reset();
	initTime();
}

//获取调整后余额
function getAfterAmount() {
	var contactsunitId = $("#contactUnitName").val();
	var adjsutType = $("#adjustType").val();
	if (contactsunitId != "" && adjsutType != "") {
		var contactsunitAmount = $("#contactsunitAmount").val();
		var adjustAmount = $("#adjustAmount").val();
		if (contactsunitAmount == "") {
			contactsunitAmount = 0;
		}
		if (adjustAmount == "") {
			adjustAmount = 0;
		}


		//根据调整类型计算调整后余额，
		var afterAdjustAmount = "";
		if (adjsutType == "YFZJ" || adjsutType == "YFZJ") {
			afterAdjustAmount = Number(contactsunitAmount) + Number(adjustAmount);
		} else if (adjsutType == "YFJS" || adjsutType == "YSJS") {
			afterAdjustAmount = Number(contactsunitAmount) - Number(adjustAmount);
		}
		$("#afterAdjustAmount").val($.formatFloat(afterAdjustAmount, 2));
	} else {
		$("#contactsunitAmount").val("0");
		$("#afterAdjustAmount").val("0");
	}
}

//保存并过账
function saveAndPost() {
	if ($('.saveAndPost').text() == '保存') {
		$.request({
			type: 'POST',
			url: '/manager/funds/adjust/updateAdjust',
			dataType:'json',
			data: {
				'id':$("#billsHeaderForm input[name='id']").val(),
				'remark':$("#billsHeaderForm input[name='remark']").val()
			},
			async: false,
			success: function (data) {
				if (data.result == 1 ) {
					$.zxsaas_plus.showalert("success",'保存成功' );
				} else {
					$.zxsaas_plus.showalert("提示", data.desc || "未查询到数据!");
				}

			}
		});
	} else {
		$("#billsHeaderForm").data('bootstrapValidator').validate();
		if (!($('#billsHeaderForm').data('bootstrapValidator').isValid())) {
			refreshValidator('#billsHeaderForm');
			return;
		}

		if ($('#inpayClassId').val() == "") {
			$.zxsaas_plus.showalert("提示", "请选择支付类别");
			return;
		}

		if ($("#adjustAmount").val() == "0.00") {
			$.zxsaas_plus.showalert("提示", "调整金额不能为0!");
			return;
		}

		var params = getSaveParams();
		params.billsDate = $('#billsDate').val();
		var checkResult = checkSaveParam(params);
		if (checkResult) {
			return;
		}

		//清空本单核销金额为0的数据
		var ids = $("#jqGrid_payment").jqGrid('getDataIDs');
		if (ids.length > 0) {
			$.each(ids, function (i, value) {
				var rowData = $('#jqGrid_payment').jqGrid('getRowData', value);
				if (rowData.hxAmount == "0.00") {
					//   $("#jqGrid_payment").jqGrid("delRowData", value);
				}
			});
		}


		$.request({
			type: 'POST',
			contentType: 'application/json',
			url: options.SaveAdjustUrl,
			data: JSON.stringify(params),
			async: false,
			success: function (data) {
				$("#billsHeaderForm").data('bootstrapValidator').resetForm();
				$.zxsaas_plus.showalert("提示", data.desc);
				if (data.result != -1) {
					$("#copy").removeAttr("disabled");
					var param = {};
					param.id = data.result;
					pageAjax(param);
					$(".keyHxBtn").hide();
				}
				$("#jqGrid_payment").setGridParam({cellEdit: true});

			}
		});
	}
}

//根据调整类型获取单据类型
function getAdjustBillsType() {
	var adjustType = $("#adjustType").val();
	if (adjustType == "YFZJ") {
		type = "58";
	} else if (adjustType == "YFJS") {
		type = "59";
	} else if (adjustType == "YSZJ") {
		type = "56";
	} else if (adjustType == "YSJS") {
		type = "57";
	} else if (adjustType == "YFKJS") {
		type = "87";
	} else if (adjustType == "YFKZJ") {
		type = "86";
	} else if (adjustType == "YSKJS") {
		type = "85";
	} else if (adjustType == "YSKZJ") {
		type = "84";
	}
	return type;
}

//获取保存参数
function getSaveParams() {
	var params = {};
	params = $("#billsHeaderForm").toJsonObject();
	var billsType = getAdjustBillsType();
	params.billsType = billsType;
	params.billsStatus = 1;
	delete params.inpayClassName;
	delete params.contactUnitName;
	delete params.managerUname;
	delete params.sectionName;
	delete params.yingfuAmount;
	delete params.yufuAmount;
	delete params.yingshouAmount;
	delete params.yushouAmount;
	//核销数据
	var array = new Array();
	var ids = $("#jqGrid_payment").jqGrid('getDataIDs');
	$.each(ids, function (i, value) {
		var param = {};
		var rowData = $('#jqGrid_payment').jqGrid('getRowData', value);
		param.detailId = rowData.detailId;
		param.mainId = rowData.mainId;
		param.hxAmount = Number(rowData.hxAmount);
		param.remark = rowData.remark;
		array.push(param);
	});
	params.hxDetailDraft = array;
	return params;
}

//校验保存参数
function checkSaveParam(params) {
	var flag = false;
	if ($("#billsCode").val() != "") {
		$.zxsaas_plus.showalert("提示", "该单据已保存过账!");
		flag = true;
		return flag;
	}
	if (params.adjustType == "") {
		$.zxsaas_plus.showalert("提示", "请选择调整类型!");
		flag = true;
		return flag;
	}
	if (params.inpayClassId == "") {
		$.zxsaas_plus.showalert("提示", "请选择收支类别!");
		flag = true;
		return flag;
	}
}

var lastrow = "";
var lastcell = "";

//核销grid
function hxGrid() {
	$.jgrid.defaults.responsive = true;
	$.jgrid.defaults.styleUI = 'Bootstrap';
	var mydata;
	var hid = false;
	var lock = false;
	var myobj = [];
	var colNames = ['账务明细表id', '账务主表id', '往来单位id', '单据日期', '单据类型', '单据编号', '商品名称', '金额', '已核销金额', '本单核销金额', '未核销金额', '备注', "zwMainId"];
	var JqGridColModel = [
		{name: 'detailId', index: 'detailId', width: 1, align: 'center', sorttype: 'string', hidden: true, key: true},
		{name: 'mainId', index: 'mainId', width: 1, align: 'center', sorttype: 'string', hidden: true},
		{name: 'contactsunitId', index: 'contactsunitId', width: 1, align: 'center', sorttype: 'string', hidden: true},
		{name: 'billsDate', index: 'billsDate', width: 200, align: 'center', sorttype: 'string', sortable: false},
		{
			name: 'billsTypeName',
			index: 'billsTypeName',
			width: 200,
			align: 'center',
			sorttype: 'string',
			sortable: false
		},
		{name: 'resBillsCode', index: 'resBillsCode', width: 200, align: 'center', sorttype: 'string', sortable: false},
		{
			name: 'goodsName',
			index: 'goodsName',
			width: 200,
			align: 'center',
			sorttype: 'string',
			sortable: false,
			hidden: true
		},
		{
			name: 'amount',
			index: 'amount',
			width: 100,
			align: 'center',
			sorttype: 'string',
			formatter: "number",
			sortable: false
		},
		{
			name: 'hasAmount',
			index: 'hasAmount',
			width: 200,
			align: 'center',
			sorttype: 'string',
			formatter: "number",
			sortable: false
		},
		{
			name: 'hxAmount',
			index: 'hxAmount',
			width: 100,
			align: 'center',
			sorttype: 'Long',
			formatter: "number",
			editable: true,
			editoptions: {
				readonly: false,
				onblur: "cellOnBlurs(this)",
				onkeyup: "checkInput.checkNum(this,12);",
                dataEvents: [{
                    type: "focus",
                    fn: function(){
                        this.select()
                    }
                }
                ]},
			sortable: false
		},
		{
			name: 'hasnotAmount',
			index: 'hasnotAmount',
			width: 100,
			align: 'center',
			sorttype: 'string',
			formatter: "number",
			sortable: false
		},
		{
			name: 'remark',
			index: 'remark',
			width: 350,
			align: 'center',
			sorttype: 'string',
			editable: true,
			editoptions: {readonly: false, onblur: "cellOnBlur()", onkeyup: "checkInput.clearNoText(this,100)"},
			sortable: false
		},
		{name: 'zwMainId', index: 'zwMainId', width: 1, align: 'center', sorttype: 'string', hidden: true, key: true},
	];
	loadtable();

	function loadtable() {
		$(options.TableName).jqGrid({
			url: options.LoadTableUrl,
			mtype: "GET",
			datatype: "local",
			colNames: colNames,
			colModel: JqGridColModel,
			sortable: false,
			rownumbers: true,
			cellsubmit: 'clientArray',//单元格保存内容的位置
			editurl: 'clientArray',
			caption: "核销明细",
			cellEdit: true,
			rownumWidth: 40, // the width of the row numbers columns
			shrinkToFit: false,
			footerrow: true,  //设置表格显示表脚
			height: $(window).height() * 0.5 - 50,
			width: $(window).width() - 80,
			userDataOnFooter: true,//设置userData 显示在footer里
			beforeEditCell: function (rowid, cellname, v, iRow, iCol) {
				cancleFooterData();
				lastrow = iRow;
				lastcell = iCol;
				cancleFooterData();
			},
			beforeSelectRow: function (id) {
				var t;
				setTimeout(function () {
					$('#' + id + '_hxAmount').on('input propertychange', function () {
						var _this = this;
						if (t) {
							console.log(1);
							clearTimeout(t)
						}
						t = setTimeout(function () {
							var amount = $(options.TableName).getCell(id, "amount");//金额
							var hasAmount = $(options.TableName).getCell(id, "hasAmount");
							var hxAmount = $(_this).val();//核销金额
							var hasnotAmount = Number(amount) - Number(hasAmount) - Number(hxAmount);
							if (Number(hasnotAmount) < 0) {
								$(options.TableName).jqGrid('setCell', id, "hasnotAmount", "0.00");
								$(options.TableName).jqGrid('setCell', id, "hxAmount", Number($(options.TableName).getCell(id, "amount")) - Number($(options.TableName).getCell(id, "hasAmount")));
								cancleFooterData();
								$.zxsaas_plus.showalert("提示", "未核销金额不能小于0!");
							} else {
								$(options.TableName).jqGrid('setCell', id, "hasnotAmount", hasnotAmount);
								$(options.TableName).jqGrid('footerData', 'set', {
										"hasnotAmount": $(options.TableName).getCol('hasnotAmount', false, 'sum'),
										"hxAmount": Number($(options.TableName).getCol('hxAmount', false, 'sum')) + hxAmount,
									}
								);
							}
						}, 10);


					});
					$(document).delegate('#' + id + '_hxAmount', "contextmenu", function (e) {
						return false;
					});
				}, 0);


			},
			loadComplete: function (data) {
				cancleFooterData();
			},
			gridComplete: function (data) {
				$(options.TableName).closest(".ui-jqgrid-bdiv").css({"overflow-x": "hidden"});
				$(".HeaderButton").html("");
				$("#gbox_jqGrid_payment tr:last").find("td").eq(0).text("合计");
				cancleFooterData();
			}
		})
		jQuery(options.TableName).jqGrid('setLabel', 0, '序号');
	}
}


//保存 核销
function hxSave() {

	if ($("#billsCode").val() == "") {
		$.zxsaas_plus.showalert("提示", "该单据未过账,没有核销明细!");
		return;
	}
	//校验未核销金额不能小于0
	var totalAmount = Number($("#adjustAmount").val().replace(/\,/g, ""));//单据总金额即单据总金额
	if (totalAmount <= 0) {
		$.zxsaas_plus.showalert("提示", "调整金额不能大于0!");
		return;
	}

	var hxAmount = $("#jqGrid_payment").getCol('hxAmount', false, 'sum');

	//调整金额必须小于核销金额
	if (hxAmount > totalAmount) {
		$.zxsaas_plus.showalert("提示", "核销金额大于调整金额！");
		return;
	}

	var ids = $("#jqGrid_payment").jqGrid('getDataIDs');
	var array = new Array();
	if (ids.length > 0) {
		$.each(ids, function (i, value) {
			var param = {};
			var rowData = $('#jqGrid_payment').jqGrid('getRowData', value);
			if (rowData.hxAmount != "0.00") {
				param.batchId = -1;
				param.detailId = rowData.detailId;
				param.zwMainId = rowData.zwMainId;
				param.mainId = rowData.mainId;
				param.hxAmount = Number(rowData.hxAmount);
				param.hasnotAmount = rowData.hasnotAmount.replace(/\,/g, "");
				param.remark = rowData.remark;
				param.resBillsCode = rowData.resBillsCode;
				param.contactsunitId = rowData.contactsunitId;
				param.billsAmount = $("#adjustAmount").val();
				array.push(param);
			} else {
				//清空本单核销金额为0的数据
				$("#jqGrid_payment").jqGrid("delRowData", value);
			}
		});
	}
	else {
		$.zxsaas_plus.showalert("提示", "没有核销明细!");
		return;
	}

	//清空核销明细表数据条件
	var billsCode = $("#billsCode").val();
	var contactsunitId = $("#billsHeaderForm input[name='contactsunitId']").val();
	var billsType = getAdjustBillsType();
	var params = {
		hxList: array
	}
	var url = "/manager/inventory/fund/inPayment/refund/saveHxDeatil/" + contactsunitId + "/" + billsCode + "/" + billsType + "";
	$.request({
		url: url,
		type: 'POST',
		dataType: "json",
		contentType: 'application/json',
		data: JSON.stringify(array),
		success: function (data) {
			if (data.result == 1) {
				$.zxsaas_plus.showalert("提示", data.desc || "保存成功");
				$("#jqGrid_payment").setGridParam({cellEdit: false});
			} else {
				$.zxsaas_plus.showalert("错误", data.desc);
			}
		}
	});

}

var heList = null;

//编辑 事件
function hxEdit() {
	$("#jqGrid_payment").setGridParam({cellEdit: true});
	var contactsunitId = $("#contactsunitId").val();
	var adjustType = $("#adjustType").val();
	$.request({
		url: "/manager/inventory/fund/common/verification/getVerificationOrderVoList",
		type: 'get',
		dataType: "json",
		contentType: 'application/json',
		async: false,
		data: {"contactUnitId": contactsunitId, "adjustTypeCode": adjustType, "billsCode": $("#billsCode").val()},
		success: function (data) {
			heList = null;
			if (data.result == 1) {
				if (data.result == 1) {
					var list = data.data.orderVoList;
					if (list != undefined && list.length > 0) {
						tranOrderVoList(list);
						heList = $.extend(true, [], list);
						fillHxDetail(list)
					}
					getAfterAmount();
				} else {
					$.zxsaas_plus.showalert("提示", data.desc);
				}
			} else {
				$.zxsaas_plus.showalert("提示", data.desc);
			}
		}
	});
}

//核销明细的数据装换
function tranOrderVoList(list) {
	if (list != undefined && list.length > 0) {
		for (var i = 0; i < list.length; i++) {
			var item = list[i];
			item.detailId = item.detailId;
			item.mainId = item.accountMainId;
			item.contactsunitId = $("#contactsunitId").val();
			item.billsDate = item.billsDateStr;
			item.billsTypeName = item.billsTypeName;
			item.resBillsCode = item.billsCode;
			item.goodsName = '';
			item.amount = item.billsAmount;
			item.hasAmount = item.hasHxAmount;
			item.hxAmount = item.curHxAmount;
			item.hasnotAmount = item.remainingHxAmount;
			item.remark = item.remark;
			item.zwMainId = item.refAccountMainId
		}
	}

}

//一键核销
function keyCancle() {
	//一键核销后不清除支付方式，注释掉下面一行代码，后期有问题可以从这里进行入手，吴洋，2017.6.15
//	selectAdjustType();
	if ($("#billsCode").val() == "") {
		$.zxsaas_plus.showalert("提示", "该单据未过账,没有核销明细!");
		return;
	}

	var adjustAmount = Number($("#adjustAmount").val().replace(/\,/g, ""));//单据总金额即单据总金额
	if (adjustAmount < 0) {
		$.zxsaas_plus.showalert("提示", "调整金额不能小于0!");
		return;
	}
	if (heList == null) {
		$.zxsaas_plus.showalert("提示", "没有核销明细!");
		return;
	} else {
		fillHxDetail($.extend(true, [], heList));
		getAfterAmount();
	}
//可以核销的总金额（控制未核销金额不能小于0）
	var hxAmountAll = $("#jqGrid_payment").getCol('hxAmount', false, 'sum');
	var totalAmount = adjustAmount - hxAmountAll;
	var ids = $("#jqGrid_payment").jqGrid('getDataIDs');
	if (ids.length > 0) {
		$.each(ids, function (i, value) {
			var rowData = $('#jqGrid_payment').jqGrid('getRowData', value);
			var hxAmount = Number(rowData.hxAmount);
			var hasnotAmount = Number(rowData.hasnotAmount);
			if (totalAmount > 0 && totalAmount >= rowData.hasnotAmount) {
				$("#jqGrid_payment").jqGrid('setCell', value, "hasnotAmount", 0);
				$("#jqGrid_payment").jqGrid('setCell', value, "hxAmount", hxAmount + hasnotAmount);
				totalAmount = totalAmount - rowData.hasnotAmount;
			} else if (totalAmount > 0 && totalAmount < rowData.hasnotAmount) {
				$("#jqGrid_payment").jqGrid('setCell', value, "hasnotAmount", Number(rowData.hasnotAmount) - totalAmount);
				$("#jqGrid_payment").jqGrid('setCell', value, "hxAmount", hxAmount + totalAmount);
				totalAmount = 0;

			}
			hxCal();
			if (totalAmount == 0) {
				return false;
			}
		});
	} else {
		$.zxsaas_plus.showalert("提示", "没有核销明细!");
		return;
	}

	//清空本单核销金额为0的数据
	if (ids.length > 0) {
		$.each(ids, function (i, value) {
			var rowData = $('#jqGrid_payment').jqGrid('getRowData', value);
			if (rowData.hxAmount == "0.00") {
				$("#jqGrid_payment").jqGrid("delRowData", value);
			}
		});
	}
}


//一键核销页脚计算
function hxCal() {
	var amount = $("#jqGrid_payment").getCol('amount', false, 'sum');
	var hasAmount = $("#jqGrid_payment").getCol('hasAmount', false, 'sum');
	var hxAmount = $("#jqGrid_payment").getCol('hxAmount', false, 'sum');
	//核销金额
	$("#nowAmount").val($.formatFloat(hxAmount, 2));
	var hasnotAmount = $("#jqGrid_payment").getCol('hasnotAmount', false, 'sum');
	$("#jqGrid_payment").jqGrid('footerData', 'set', {
			"amount": amount,
			"hasAmount": hasAmount,
			"hxAmount": hxAmount,
			"hasnotAmount": hasnotAmount,
		}
	);
}

function cellOnBlur() {
	$("#jqGrid_payment").jqGrid("saveCell", lastrow, lastcell);
}

//复制按钮单击事件(有单据编号才让复制，复制一模一样的数据，单据编号清空，无单据编号不让复制)
function copy() {
	allowEdit();
	$("#jqGrid_payment").jqGrid('clearGridData');
	$("#billsCode").val("");
	addFlag = true;
	$("#copy").attr("disabled", true);
	$('.rightMap img').removeAttr("src");
	$(".keyHxBtn").show();
    $("#bottomForm")[0].reset();
	reLoad();
}

//新增按钮单击事件
function add() {
	location.href = '/manager/funds/adjust/initAdjust';
	return;
	allowEdit();
	$("#copy").attr("disabled", true);
	$(".invalid").attr("disabled", true);
	$(".retailDetailTable").hide();
	addFlag = true;
	filter = false;
	getAuthList(initDealDate);
	$("#billsHeaderForm input").val("");
	$("#adjustType").val("");
	$("#adjustAmount").val("0.00");
	$(".boxmainDiv").css("display", "none");
	$("#bottomForm")[0].reset();
	$("#sectionName").val(sectionName);
	$("#sectionId").val(sectionId);
	hideOrShowAmount();
	$(".keyHxBtn").show();
	$('.rightMap img').removeAttr("src");
	total = 1;
	pageIndex = 0;
	reset();
}

//核销底部合计
function cancleFooterData() {
	var amount = $(options.TableName).getCol('amount', false, 'sum');
	var hasAmount = $(options.TableName).getCol('hasAmount', false, 'sum');
	var hxAmount = $(options.TableName).getCol('hxAmount', false, 'sum');
	var hasnotAmount = $(options.TableName).getCol('hasnotAmount', false, 'sum');
	$(options.TableName).jqGrid('footerData', 'set', {
			"amount": amount,
			"hasAmount": hasAmount,
			"hxAmount": hxAmount,
			"hasnotAmount": hasnotAmount,
		}
	);
}

function cellOnBlurs(obj) {
	$(options.TableName).jqGrid("saveCell", lastrow, lastcell);
	var cellName = obj.id.split("_")[1];
	var id = $(options.TableName).jqGrid('getGridParam', 'selrow');
	if (cellName == "hxAmount") {
		if (isNaN(obj.value)) {
			$(options.TableName).jqGrid('setCell', id, cellName, "0.00");
			$(options.TableName).jqGrid('setCell', id, "hasnotAmount", Number($(options.TableName).getCell(id, "amount")) - Number($(options.TableName).getCell(id, "hasAmount")));
			cancleFooterData();
			$.zxsaas_plus.showalert("提示", "请输入数字或保留两位小数!");
		}
	}
	//$(options.TableName).jqGrid('setCell',id,"hasnotAmount",Number($(options.TableName).getCell(id,"amount"))-Number($(options.TableName).getCell(id,"hasAmount"))-Number($(options.TableName).getCell(id,"hxAmount")));
	cancleFooterData();
}

//

//禁止页面编辑,禁用选择按钮
function forbiddenEdit() {
	$("#billsHeaderForm input[name='billsDate'],input[name='adjustAmount'],input[name='adjustCuase']").attr("readonly", "readonly");
	$("#billsHeaderForm select").attr("disabled", "disabled");
	$("#billsHeaderForm :button").attr("disabled", "disabled");
	$(".saveAndPost").attr("disabled", "disabled");
	$("#adjustAmount").attr("disabled", "disabled");
}

//允许页面编辑，允许选择按钮
function allowEdit() {
	$("#billsHeaderForm input[name='billsDate'],input[name='adjustAmount'],input[name='adjustCuase']").removeAttr("readonly");
	$("#billsHeaderForm select").removeAttr("disabled");
	$("#billsHeaderForm :button").removeAttr("disabled");
	$(".saveAndPost").removeAttr("disabled").text('保存并过账');
	$("#adjustAmount").removeAttr("disabled");
}

//过滤按钮单击事件
function filterModalBtnClick() {
	//reset();
	$("#filterSearchForm input[name='remark']").removeAttr("readonly");
	$("#filterModel").modal("show");
}