var lastrow;
var lastcell;
var lastrow2;
var lastcell2;

var num = '14';

//禁止输入非数字
function clearNoNum(obj) {
	obj.value = obj.value.replace(/[^\d]/g, "");
	if (obj.value.length > 10) {
		obj.value = obj.value.substring(0, 10);
	}
}

function clearRemark(obj, num) {
	if (obj.value.length > num) {
		obj.value = obj.value.substring(0, num);
	}
}

$(function() {
	AppEvent.on('getSectionId', function() {
		return $('#sectionId').val();
	})
	storageObj = new StorageObj(basePath);
	loadmodal();
	funBlurInit();

	filterSelect();
	loadmodal_loan();
	initBorrowLend();

	loadtableLeft(); //串号管理

	$("#startTimeStr").datetimepicker({
		lang: "ch", //语言选择中文
		format: "Y-m-d", //格式化日期
		timepicker: false, //关闭时间选项
		todayButton: false //关闭选择今天按钮
	});

	$("#endTimeStr").datetimepicker({
		lang: "ch", //语言选择中文
		format: "Y-m-d", //格式化日期
		timepicker: false, //关闭时间选项
		todayButton: false //关闭选择今天按钮
	});

/*	$("#billsDateString2").datetimepicker({
		lang: "ch", //语言选择中文
		format: "Y-m-d", //格式化日期
		timepicker: false, //关闭时间选项
		todayButton: false //关闭选择今天按钮
	}).on('blur', function(ev) {
		//	        refreshValidatorField("billsDateString2",'#ibillsHeadLendBack');//刷新验证信息
	});*/



	//当前选项卡是
	$('#myTab a').click(function(e) {
		if (e.currentTarget.hash == '#commodityJC') {
			tabNum = 0;
			pageNumber = 1; //当前页
			pageCount = 1; //最后页数
			filterSelect();
		} else if (e.currentTarget.hash == '#loanBack') {
			tabNum = 1;
			pageNumber = 1; //当前页
			pageCount = 1; //最后页数
			filterSelect();
		} else if (e.currentTarget.hash == '#lendSale') {
			parent.openWorkBoxByMenutext('借出转销售', basePath + '/jxc/storage/lendSaleDetail/lendSale');
		}
		e.preventDefault()
		$(this).tab('show')

	});
});

/***init 经手人***/
function initManagers() {
	if (tabNum == 0) {
		//部门选择后才能选择经手人
		$('#managersUid').removeAttr('disabled');
		$('#managersUid').html('');
		var selectHtml = '';
		var sectionId = $('#sectionId').val();
		var managersUid = 'managersUid';
	} else if (tabNum == 1) {
		//部门选择后才能选择经手人
		$('#managersUid2').removeAttr('disabled');
		$('#managersUid2').html('');
		var selectHtml = '';
		var sectionId = $('#sectionId2').val();
		var managersUid = 'managersUid2';
	}
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

/***init 仓库名称***/
function initStorage() {
	if (tabNum == 0) {
		//部门选择后才能选择仓库
		$('#storageId').removeAttr('disabled');
		$('#storageId').html('');
		var selectHtml = '';
		var sectionId = $('#sectionId').val();
		var storageId = 'storageId';
	} else if (tabNum == 1) {
		//部门选择后才能选择仓库
		$('#storageId2').removeAttr('disabled');
		$('#storageId2').html('');
		var selectHtml = '';
		var sectionId = $('#sectionId2').val();
		var storageId = 'storageId2';
	}
	storageObj.initStorage(sectionId, function(data) {
		var list = data.data.rows;
		$(list).each(function(index, yu) {
			selectHtml += '<option value="' + yu.id + '">' + yu.name + '</option>'
		});
	});
	$('#' + storageId).append(selectHtml);
}

/***init 仓库名称***/
function initStorageImport() {
	//部门选择后才能选择仓库
	$('#selStorageIdStr').html('');
	var selectHtml = '';
	storageObj.initStorage($('#selSectionIdStr').val(), function(data) {
		var list = data.data.rows;
		$(list).each(function(index, yu) {
			selectHtml += '<option value="' + yu.id + '">' + yu.name + '</option>'
		});
	});
	$('#selStorageIdStr').append(selectHtml);
}

/***init 当部门为空时***/
function initNull() {
	var selectHtml = '<option value="">请选择部门</option>';
	if (tabNum == 0) {
		//禁选经手人
		$('#storageId').attr('disabled', true);
		$('#storageId').html('');
		$('#storageId').append(selectHtml);

		$('#managersUid').attr('disabled', true);
		$('#managersUid').html('');
		$('#managersUid').append(selectHtml);

		//禁选往来单位
		//		$('#contactName').attr('disabled',true);
		//		$('#contactName').val('请选择部门');
	} else if (tabNum == 1) {
		//禁选经手人
		$('#managersUid2').attr('disabled', true);
		$('#managersUid2').html('');
		$('#managersUid2').append(selectHtml);

		//		//禁选往来单位
		//		$('#contactName2').attr('disabled',true);
		//		$('#contactName2').val('请选择部门');
	}
}

/**
 * 商品借出单
 */
function loadmodal() {
	var options = {
		LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
		//		LoadTableUrl: "../../json/Storage/loanManage.json",
		//LoadTableUrl: "../../cw/qc/getSubject", //表格数据加载接口地址
		GetRowInfoUrl: "", //编辑时获取数据详细信息接口加载地址
		//LoadTableFomatUrl:"../../json/T_roles.json",
		//LoadTableFomatUrl: "../../", //获取表格显示格式数据加载地址
		//SaveEditUrl: "", //新增或修改后保存数据接口地址
		//SaveAddUrl: "", //新增或修改后保存数据接口地址
		DelRowUrl: "", // 删除信息接口地址
		isSub: "", //是否有子级表格
		subLoadTableUrl: "", //子级表格数据来源地址
		//ModouleName: "", //模块名称。遵照css选择器书写  systemSet_companyParameter
		TableName: "#jqGrid_SubjectBalance", //显示表格名称。遵照css选择器书写
		iconJsonUrl: "../json/icon.json",
		btnbox: ".btnbox ", //功能按钮存放容器。遵照css选择器书写	
		pager: "#jqGridPager_commodityLoan"
			//		inputbox: ".inputbox" //搜索条件框存放容器。遵照css选择器书写
	};

	//单据日期

	$("#datetimepickerStart1").datetimepicker({
		lang: "ch", //语言选择中文
		format: "Y-m-d", //格式化日期
		timepicker: false, //关闭时间选项
		todayButton: false //关闭选择今天按钮
	});
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
	var colNames = ['操作', '仓库名称', '商品名称', '数量', '单价', '金额', '商品备注', '仓库id', '商品id', 'id', '是否串号管理', '新增人id', '新增时间', '成本价', 'M_主表id'];
	var JqGridColModel = [{
		name: 'deliveryDo',
		index: 'deliveryDo',
		width: 70,
		align: 'center',
		formatter: addAndDelete,
		sortable: false
	}, {
		name: 'storageName',
		index: 'storageName',
		width: 200,
		align: 'center',
		sortable: false,
		editable: true,
		edittype: 'custom',
		editoptions: {
			custom_element: function(value, option) {
				return '<input value="' + value + '" readonly="readonly" class="form-control" /><span data-rid=' + option.rowId + ' class="glyphicon glyphicon-plus" onClick="showStorage(' + option.rowId + ')" style="float:right;margin-left:-40px;margin-top:-25px;" ></span>'
			},
			custom_value: function(value) {
				return value.val();
			}
		}
	}, {
		name: 'goodsName',
		index: 'goodsName',
		width: 200,
		align: 'center',
		sortable: false,
		editable: true,
		edittype: 'custom',
		editoptions: {
			custom_element: function(value, options) {
				return '<input type="text" readonly="readonly" id="goodsName' + options.rowId + '" class="form-control" value="' + value + '" /><span style="float:right;margin-top:-25px;margin-left:-40px;" data-rId="' + options.rowId + '" class="spmc glyphicon glyphicon-plus colspan2" onclick="showGoods(' + options.rowId + ')"></span></span>';
			},
			custom_value: function(value) {
				return value.val();
			}
		}
	}, {
		name: 'goodsNumber',
		index: 'goodsNumber',
		width: 100,
		align: 'center',
		sorttype: 'integer',
		editable: true,
		sortable: false,
		editoptions: {
			dataEvents: [{
				type: "blur",
				fn: saveCell
			}],
			onkeyup: 'clearNoNum(this)'
		}
	}, {
		name: 'price',
		index: 'price',
		width: 100,
		align: 'center',
		sorttype: 'float',
		editable: true,
		sortable: false,
		editoptions: {
			dataEvents: [{
				type: "blur",
				fn: function(e) {
					var rex = /^[0-9]{0,12}\.{0,1}[0-9]{0,2}$/;
					if (rex.test($(this).val())) {
						var rowid = $(this).parents("tr").attr("id");
						var goodsNumber = $(this).parents("table").getCell(rowid, "goodsNumber"); //数量
						var price = $(this).val(); //单价
						$(this).parents("table").setCell(rowid, "amount", price * goodsNumber); //总价
						$(this).parents("table").jqGrid("saveCell", lastrow, lastcell);
						footerData();
					} else {
						$.zxsaas_plus.showalert("提示", "请输入合法数字！");
						$(this).val('');
						$(this).parent().next().html('');
					}
				}
			}]
		}
	}, {
		name: 'amount',
		index: 'amount',
		width: 200,
		align: 'center',
		sorttype: 'float',
		formatter: "number",
		sortable: false
	}, {
		name: 'remark',
		index: 'remark',
		width: 300,
		align: 'center',
		sorttype: 'string',
		editable: true,
		sortable: false,
		editoptions: {
			dataEvents: [{
				type: "blur",
				fn: saveCell
			}],
			onkeyup: "clearRemark(this,100)"
		}
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
		name: 'id',
		index: 'id',
		hidden: true,
		sortable: false
	}, {
		name: 'ifManageImei',
		index: 'ifManageImei',
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
		name: 'costPrice',
		index: 'costPrice',
		hidden: true,
		sortable: false
	}, {
		name: 'billsMainId',
		index: 'billsMainId',
		hidden: true,
		sortable: false
	}];

	loadtable();
	//加载表格

	/*$.getJSON(options.LoadTableUrl,function(t_datat){
		mydata=t_datat;
		//$(options.TableName).setGridParam({data: mydata}).trigger('reloadGrid');  
	});*/
	function loadtable() {
		//				$.post(options.LoadTableUrl,{},function(r){
		//					if(r.data.rows!=null){
		//						 mydata=r.data;
		//					//console.log(mydata);

		$(options.TableName).jqGrid({
			//						url:options.LoadTableUrl,
			mtype: "GET",
			//						datatype: "jsonstring",
			//				        datastr: mydata,
			datatype: "json",
			//data:mydata,
			//datatype:"local",						
			jsonReader: {
				root: "rows",
				repeatitems: false
			},
			/* treeReader : {
			     //level_field: "level",
			     parent_id_field: "parentId",
			     leaf_field: "isLeaf"
			     //expanded_field: "expanded"
			 },*/
			colNames: colNames,
			colModel: JqGridColModel,
			//loadonce: false,
			sortable: false,
			rownumbers: true,
			cellsubmit: 'clientArray', //单元格保存内容的位置		
			editurl: 'clientArray',
			//loadonce: true,
			rowNum: 15,
			rowList: [10, 15, 20, 25, 40],
			pager: options.pager,
			viewrecords: true,
			//			            multiselect:true,
			cellEdit: true,
			width: "100%",
			height: $(window).height() * 0.45,
			//scroll:true,
			//treeGrid: true,
			//treeGridModel: 'adjacecncy',
			//treedatatype: "local",
			// ExpandColumn: 'subjectCode',
			/*altRows:true,
			altclass:'.grid-row-odd',*/
			autowidth: true,
			rownumWidth: 35, // the width of the row numbers columns
			shrinkToFit: true, //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
			footerrow: true, //设置表格显示表脚
			userDataOnFooter: true, //设置userData 显示在footer里
			/*grouping:true, 
			groupingView :
			{ groupField : ['creditDirection'] },*/
			ondblClickRow: function(id) {
				//双击进入编辑
				var delid = id;

			},
			beforeEditCell: function(rowid, cellname, v, iRow, iCol) {
				lastrow = iRow;
				lastcell = iCol;
			},
			onCellSelect: function(id, index, e) {},
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
				jqgridRowId = rowid;
				//数量修改  
				//   0    表示串号管理     
				//   1    数量管理
				var rowData = $("#jqGrid_SubjectBalance").getRowData(rowid);
				if (rowData.ifManageImei == '1') {
					$('#jqGrid_SubjectBalance').setColProp('goodsNumber', {
						editable: false
					});
					$("#jqGrid_SubjectBalance").find('#' + rowid).find("td:eq(4)").attr({
						"data-toggle": "modal",
						"data-target": "#numberChoose",
						"data-rId": rowid
					});
					$("#jqGrid_SubjectBalance").find('#' + rowid).find("td:eq(4)").addClass("numberPlus");
				} else {
					$("#jqGrid_SubjectBalance").find('#' + rowid).find("td:eq(4)").removeAttr("data-toggle");
					$("#jqGrid_SubjectBalance").find('#' + rowid).find("td:eq(4)").removeAttr("data-target");
					$("#jqGrid_SubjectBalance").find('#' + rowid).find("td:eq(4)").removeAttr("data-rId");
					$("#jqGrid_SubjectBalance").find('#' + rowid).find("td:eq(4)").removeClass("numberPlus");
					$('#jqGrid_SubjectBalance').setColProp('goodsNumber', {
						editable: true
					});
				}
			},
			afterInsertRow: function(rowid, aData) { //新增一行之后
				arithmeticNo(rowid, aData.goodsNumber, aData.price);
			},
			gridComplete: function() {
				$(options.TableName).setGridHeight($(window).height() - 240);
				$(options.TableName).setGridWidth($(window).width() - 290);
				var parentId = $(this).attr('id');
				if (parentId = 'jqGrid_SubjectBalance') {
					$('.moveFlag').remove();
					var tdListTime = $('#jqGrid_SubjectBalance').getGridParam('colModel');
					var tdHtml = $.map(tdListTime, function() {
						return '<td></td>'
					}).join(" ");
					var html = "<tr class='moveFlag' style='height:40px;outline-style:none;'><td><span id='addIcon' class='glyphicon glyphicon-plus-sign'></span></td>" + tdHtml + "</tr>"
					$('#jqGrid_SubjectBalance tbody').append(html);
				}
				footerData();
				// 单据状态
				var status = $('#slideThree').val();
				// 列表数据
				var rows = $("#jqGrid_SubjectBalance").getDataIDs();
				// 正式单据
				if (status == 0 && rows.length) {
					// 禁用编辑
					$('#jqGrid_SubjectBalance').setGridParam({
						'cellEdit': false
					});
				} else {
					// 启用编辑
					$('#jqGrid_SubjectBalance').setGridParam({
						'cellEdit': true
					});
				}
			},
			loadComplete: function(data) {
				footerData();
				var arr = document.querySelectorAll('.spmc');
				for (var i = 0, len = arr.length; i < len; i++) {
					(arr[i].dataset.rid == '') && (arr[i].className = 'commodity');
					(arr[i].dataset.rid == '') && (arr[i].parentNode.dataset.target = '');
				}
				$('.commodity').attr("readonly", true);
				$('.checkInput').attr("readonly", true).removeAttr('id');
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
		$("#jqGrid_SubjectBalance").jqGrid("saveCell", lastrow, lastcell);
		footerData();
	}

	function addAndDelete(cellvalue, options, rowObjec) {
		var addAndDel = '<div class="operating" data-id="' + options.rowId + '"></span><span class="glyphicon glyphicon-trash" aria-hidden="true" id="add_row" title="删除行"></span></div>';
		return addAndDel;
	}

	/***删除一行***/
	$(document).on('click', '.glyphicon-trash', function(e) {
		// 单据状态
		var status = $('#slideThree').val();
		// 列表数据
		var rows = $("#jqGrid_SubjectBalance").getDataIDs();
		// 非正式单据
		if (status != 0) {
			// 启用编辑
			var thisTitle = $(this).attr("title");
			var rowId = $(this).parent().data('id');
			$('#jqGrid_SubjectBalance').jqGrid('delRowData', rowId);
		}
	});

	/***新增一行***/
	$(document).on('click', '#addIcon', function(e) {
		// 单据状态
		var status = $('#slideThree').val();
		// 列表数据
		var rows = $("#jqGrid_SubjectBalance").getDataIDs();
		// 非正式单据
		if (status != 0){
			// 启用编辑
			var idList = $("#jqGrid_SubjectBalance").getDataIDs();
			var rowId = idList.length == 0 ? 0 : Math.max.apply(null, idList);
			$('#jqGrid_SubjectBalance').jqGrid('addRowData', rowId + 1, {
				storageName: '',
				goodsName: '',
				goodsNumber: 0,
				price: 0.00,
				amount: 0.00,
				remark: ''
			}, 'last');
			$('#storageName' + (rowId + 1)).val($('#storageId').find("option:selected").text());
			$("#jqGrid_SubjectBalance").jqGrid('setCell', rowId + 1, 'storageId', $('#storageId').val());
		}
	});



	/*弹出框输入框框*/
	function searchS(cellvalue, options, rowObjec) {
		return '<div class="operating" data-id="' + options.rowId + '"><span class="glyphicon glyphicon-search" aria-hidden="true" id="add_row" title="搜索"></span></div>';
	}

	//仓库名称
	function ckmcModel(cellvalue, options, rowObject) {
		return '<input type="text" readonly="readonly" id="storageName' + options.rowId + '" style="border:0;text-align:center;width:150px;height:30px" value="' + cellvalue + '" /><span data-rId="' + options.rowId + '" class="ckmc glyphicon glyphicon-plus" onclick="showStorage(' + options.rowId + ')"></span></span>';
	};

	//商品名称新增
	function spmcModel(cellvalue, options, rowObject) {
		//				console.log(options.rowId);
		//				console.log(rowObject);
		return '<input type="text" readonly="readonly" id="goodsName' + options.rowId + '" style="border:0;text-align:center;width:150px;height:30px" value="' + cellvalue + '" /><span  data-rId="' + options.rowId + '" class="spmc glyphicon glyphicon-plus colspan2" onclick="showGoods(' + options.rowId + ')"></span></span>';
	};

	$(document).on('blur', '#checkBan', function(e) {
		var value = $(this).val();
		var reg = /^[1-9]\d*$/;
		if (!reg.test(value)) {
			value = '';
			$.zxsaas_plus.showalert("错误", "只能输入数字!");
		}
		$(this).val(value)
	});


	$(".input-none").focus(function() {
		$(".none-cx").show();

	});
	$(document).on('click', '.none-cx>ul>li', function() {
		$(".input-none").val($(this).text());
		$(".none-cx").hide();
	})

	//红冲
	$(document).on('click', '.redRush', function(e) {
		//获取单据审批状态   1  已过账      
		var status = 1;
		//				status != 1 && $.zxsaas_plus.showalert("","审核失败,此单不是未审核单!")
		if (status == 1) {
			$('.tip_p').html('已红冲');
			$.zxsaas_plus.showalert("", "红冲成功!");
		} else {
			$.zxsaas_plus.showalert("错误", "红冲失败,此单不是已过账!");
			return false;
		}

	});
	//过账
	$(document).on('click', '.transfer', function(e) {
		//获取单据审批状态   1  草稿单     
		var status = 1;
		//				status != 1 && $.zxsaas_plus.showalert("","审核失败,此单不是未审核单!")
		if (status == 1) {
			$('.tip_p').html('已过账');
			$.zxsaas_plus.showalert("", "过账成功!");
		} else {
			$.zxsaas_plus.showalert("错误", "过账失败,此单不是草稿单!");
			return false;
		}
	});

	$(document).on('blur', '#checkBan', function(e) {
		var value = $(this).val();
		var reg = /^[1-9]\d*$/;
		if (!reg.test(value)) {
			value = '';
			$.zxsaas_plus.showalert("错误", "只能输入数字!");
		}
		$(this).val(value)
	});

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



	//查询
	$(document).on("click", ".btn-group button[data-eventname='inquire']", function(event) {
		if (flag == true) {
			$.jgrid.GridDestroy(options.TableName);
			loadtable();
		} else {
			flag = true;
		}

	});


	$(document).on("click", ".btn button[data-eventname='printbtn']", function(event) {
		$.zxsaas_plus.showalert("表格打印操作", "表格打印操作咱未完成，敬请期待");

	});
	$(document).on("click", ".btnbox button[data-eventname='exportTablename']", function(event) {
		$.zxsaas_plus.showalert("表格导出操作", "表格导出操作咱未完成，敬请期待");

	});


}

/**
 *  借出单  商品名称选择   复选框
 */
var rowId = '';
$(document).on('click', '.spmcCheck2', function(e) {
	var setting = {
		data: {
			simpleData: {
				enable: true,
				idKey: "id",
				pIdKey: "pId",
				rootPId: null
			}
		},
		callback: {
			onClick: function(event, treeId, treeNode, msg) {
				controllAdd(treeNode.id); //通过id调用对应方法 重构表格
			}
		},
		view: {
			showIcon: false
		}
	};

	$.ajax({
		type: 'Get',
		url: '../../json/Storage/tranSJ.json',
		dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
		success: function(data) {
			$.fn.zTree.init($("#spmcDataTree2"), setting, data);
			var str = $('#spmcDataTree2_1_switch').attr('class');
			//console.log(str); //button level0 switch roots_close
			var Class = str.replace('roots', 'center');
			$('#spmcDataTree2_1_switch').attr('class', Class);

			var zTree = $.fn.zTree.getZTreeObj("spmcDataTree2");
			zTree.expandAll(true); //展开全部节点
		},
		error: function(msg) {
			alert(" 数据加载失败！" + msg);
		}
	});
	rowId = $(this).data('rid');
	var options = {
		LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
		LoadTableUrl: "../../json/Storage/tranSP.json",
		//LoadTableUrl: "../../cw/qc/getSubject", //表格数据加载接口地址
		GetRowInfoUrl: "", //编辑时获取数据详细信息接口加载地址
		//LoadTableFomatUrl:"../../json/T_roles.json",
		//LoadTableFomatUrl: "../../", //获取表格显示格式数据加载地址
		//SaveEditUrl: "", //新增或修改后保存数据接口地址
		//SaveAddUrl: "", //新增或修改后保存数据接口地址
		DelRowUrl: "", // 删除信息接口地址
		isSub: "", //是否有子级表格
		subLoadTableUrl: "", //子级表格数据来源地址
		//ModouleName: "", //模块名称。遵照css选择器书写  systemSet_companyParameter
		TableName: "#jqGrid_tranSpmcCheck", //显示表格名称。遵照css选择器书写
		iconJsonUrl: "../json/icon.json",
		btnbox: ".btnbox ", //功能按钮存放容器。遵照css选择器书写	
		pager: "#gridpager_tranSpmcCheck"
			//		inputbox: ".inputbox" //搜索条件框存放容器。遵照css选择器书写
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
	var colNames = ['ID', '商品编码', '商品名称', '商品类别', '商品品牌', '商品型号', '商品颜色', '网络制式', '是否管理串号'];
	var JqGridColModel = [{
		name: 'blocId',
		index: 'blocId',
		width: 55,
		align: 'center',
		sorttype: 'string',
		hidden: true
	}, {
		name: 'codeSP',
		index: 'codeSP',
		width: 100,
		align: 'center',
		sorttype: 'string'
	}, {
		name: 'nameSP',
		index: 'nameSP',
		width: 100,
		align: 'center',
		sorttype: 'string',
		formatter: spmcCheck2
	}, {
		name: 'sortSP',
		index: 'sortSP',
		width: 100,
		align: 'center',
		sorttype: 'string'
	}, {
		name: 'brandSP',
		index: 'brandSP',
		width: 100,
		align: 'center',
		sorttype: 'string'
	}, {
		name: 'modelSP',
		index: 'modelSP',
		width: 100,
		align: 'center',
		sorttype: 'string'
	}, {
		name: 'colorSP',
		index: 'colorSP',
		width: 100,
		align: 'center',
		sorttype: 'string'
	}, {
		name: 'networkSP',
		index: 'networkSP',
		width: 100,
		align: 'center',
		sorttype: 'string'
	}, {
		name: 'ifName',
		index: 'ifName',
		width: 100,
		align: 'center',
		sorttype: 'string',
		formatter: 'select',
		editoptions: {
			value: "0:√;1:"
		}
	}];

	loadtable3();

	//加载表格

	/*$.getJSON(options.LoadTableUrl,function(t_datat){
		mydata=t_datat;
		//$(options.TableName).setGridParam({data: mydata}).trigger('reloadGrid');  
	});*/
	function loadtable3() {
		//				$.post(options.LoadTableUrl,{},function(r){
		//					if(r.data.rows!=null){
		//						 mydata=r.data;
		//					//console.log(mydata);
		$(options.TableName).jqGrid({
			url: options.LoadTableUrl,
			mtype: "GET",
			//						datatype: "jsonstring",
			//				        datastr: mydata,
			datatype: "json",
			//data:mydata,
			//datatype:"local",						
			//editurl: 'clientArray',

			jsonReader: {
				root: "rows",
				repeatitems: false
			},
			//cellsubmit: 'clientArray',//单元格保存内容的位置
			colNames: colNames,
			colModel: JqGridColModel,
			//loadonce: false,
			sortable: false,
			rownumbers: true,
			//loadonce: true,
			rowNum: 20,
			rowList: [20, 25, 40],
			pager: options.pager,
			viewrecords: true,
			multiselect: true,
			//	cellEdit:true,
			width: "100%",
			height: $(window).height() * 0.44,
			autowidth: true,
			rownumWidth: 35, // the width of the row numbers columns
			shrinkToFit: true, //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
			ondblClickRow: function(id) {
				//双击进入编辑
				var delid = id;

			},

			gridComplete: function() {
				var ids = $(options.TableName).jqGrid("getDataIDs");

			},
			loadComplete: function(data) {
				//console.log(data);
				var len = data.rows.length;
				//表格加载完成 默认隐藏的列
				//								$(options.TableName).setGridParam().hideCol("metaMoneySee");
				//								$(options.TableName).setGridParam().hideCol("metaMoneyUpdate");
				//								$(options.TableName).setGridParam().hideCol("clientSee");

			},
			loadError: function(xhr, status, error) {
				//console.log(status)
			}
		})

	}

	//商品名称
	function spmcCheck2(cellvalue, options, rowObject) {
		//			console.log(rowObject);
		return '<span class="spmcCheck" data-dismiss="modal">' + cellvalue + '</span>';
	};

	$(document).on('click', '.spmcCheck2', function(e) {
		//		console.log($(this).html() + '....' + rowId)
		$("#jqGrid_SubjectBalance").jqGrid('setCell', rowId, 'spmc', $(this).html());
	});


});

/**
 * 借出还回
 */
function loadmodal_loan() {
	var options = {
		LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
		//	LoadTableUrl: "../../json/Storage/loanReturn.json",
		//LoadTableUrl: "../../cw/qc/getSubject", //表格数据加载接口地址
		GetRowInfoUrl: "", //编辑时获取数据详细信息接口加载地址
		//LoadTableFomatUrl:"../../json/T_roles.json",
		//LoadTableFomatUrl: "../../", //获取表格显示格式数据加载地址
		//SaveEditUrl: "", //新增或修改后保存数据接口地址
		//SaveAddUrl: "", //新增或修改后保存数据接口地址
		DelRowUrl: "", // 删除信息接口地址
		isSub: "", //是否有子级表格
		subLoadTableUrl: "", //子级表格数据来源地址
		//ModouleName: "", //模块名称。遵照css选择器书写  systemSet_companyParameter
		TableName: "#jqGrid_loan", //显示表格名称。遵照css选择器书写
		iconJsonUrl: "../json/icon.json",
		btnbox: ".btnbox ", //功能按钮存放容器。遵照css选择器书写	
		pager: "#jqGridPager_loan"
			//	inputbox: ".inputbox" //搜索条件框存放容器。遵照css选择器书写
	};
	$("#billsDate2").datetimepicker({
		lang: "ch", //语言选择中文
		format: "Y-m-d", //格式化日期
		timepicker: false, //关闭时间选项
		todayButton: false //关闭选择今天按钮
	});
	$("#datetimepickerStart1").datetimepicker({
		lang: "ch", //语言选择中文
		format: "Y-m-d", //格式化日期
		timepicker: false, //关闭时间选项
		todayButton: false //关闭选择今天按钮
	});
	$("#datetimepickerStart2").datetimepicker({
		lang: "ch", //语言选择中文
		format: "Y-m-d", //格式化日期
		timepicker: false, //关闭时间选项
		todayButton: false //关闭选择今天按钮
	});
	$("#datetimepickerStart3").datetimepicker({
		lang: "ch", //语言选择中文
		format: "Y-m-d", //格式化日期
		timepicker: false, //关闭时间选项
		todayButton: false //关闭选择今天按钮
	});
	$("#datetimepickerStart4").datetimepicker({
		lang: "ch", //语言选择中文
		format: "Y-m-d", //格式化日期
		timepicker: false, //关闭时间选项
		todayButton: false //关闭选择今天按钮
	});
	$("#datetimepickerStart5").datetimepicker({
		lang: "ch", //语言选择中文
		format: "Y-m-d", //格式化日期
		timepicker: false, //关闭时间选项
		todayButton: false //关闭选择今天按钮
	});

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
	var colNames = ['借出单号', '借出日期', '商品名称', '借出数量', '串号', '已转销售数', '已还回数', '未还回数', '本次还回数量', '本次还回串号', '还回仓库名称', '未还回剩余数量', '备注', 'id', '草稿单据id', '仓库id', '商品id', '借出日期', '借出串号', '借出数量', '新增人', '新增时间', '是否串号管理'];
	var JqGridColModel = [{
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
						$(this).parents("table").jqGrid("saveCell", lastrow2, lastcell2);
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
						$(this).parents("table").jqGrid("saveCell", lastrow2, lastcell2);
					} else {
						$.zxsaas_plus.showalert("提示", "请输入合法数字！");
						$(this).val('');
						$(this).parent().next().html('');
					}
				}
			}]
		}
	}, {
		name: 'storageName',
		index: 'storageName',
		hidden: false,
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
				fn: saveCell2
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
		name: 'lendDateString',
		index: 'lendDateString',
		hidden: true,
		sortable: false
	}, {
		name: 'borrowImei',
		index: 'borrowImei',
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

	/*$.getJSON(options.LoadTableUrl,function(t_datat){
		mydata=t_datat;
		//$(options.TableName).setGridParam({data: mydata}).trigger('reloadGrid');  
	});*/
	function loadtable() {
		//			$.post(options.LoadTableUrl,{},function(r){
		//				if(r.data.rows!=null){
		//					 mydata=r.data;
		//				//console.log(mydata);

		$(options.TableName).jqGrid({
			//					url:options.LoadTableUrl,
			mtype: "GET",
			//					datatype: "jsonstring",
			//			        datastr: mydata,
			datatype: "json",
			//data:mydata,
			//datatype:"local",						
			jsonReader: {
				root: "rows",
				repeatitems: false
			},
			/* treeReader : {
			     //level_field: "level",
			     parent_id_field: "parentId",
			     leaf_field: "isLeaf"
			     //expanded_field: "expanded"
			 },*/
			colNames: colNames,
			colModel: JqGridColModel,
			//loadonce: false,
			sortable: false,
			rownumbers: true,
			cellsubmit: 'clientArray', //单元格保存内容的位置		
			editurl: 'clientArray',
			//loadonce: true,
			rowNum: 15,
			rowList: [10, 15, 20, 25, 40],
			pager: options.pager,
			viewrecords: true,
			//		            multiselect:true,
			cellEdit: true,
			width: "100%",
			height: $(window).height() * 0.45,
			//scroll:true,
			//treeGrid: true,
			//treeGridModel: 'adjacecncy',
			//treedatatype: "local",
			// ExpandColumn: 'subjectCode',
			/*altRows:true,
			altclass:'.grid-row-odd',*/
			autowidth: true,
			rownumWidth: 35, // the width of the row numbers columns
			shrinkToFit: false, //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
			footerrow: true, //设置表格显示表脚
			userDataOnFooter: true, //设置userData 显示在footer里
			/*grouping:true, 
			groupingView :
			{ groupField : ['creditDirection'] },*/
			ondblClickRow: function(id) {
				//双击进入编辑
				var delid = id;

			},
			beforeEditCell: function(rowid, cellname, v, iRow, iCol) {
				lastrow2 = iRow;
				lastcell2 = iCol;
			},
			onCellSelect: function(id, index, e) {},
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
				jqgridRowId = rowid;
				//数量修改  
				//   1    表示串号管理     
				//   0    数量管理
				var rowData = $("#jqGrid_loan").getRowData(rowid);
				if (rowData.isImei == '1') {
					$('#jqGrid_loan').setColProp('revertImei', {
						editable: true
					});
					$('#jqGrid_loan').setColProp('revertNum', {
						editable: false
					});
				} else {
					$('#jqGrid_loan').setColProp('revertImei', {
						editable: false
					});
					$('#jqGrid_loan').setColProp('revertNum', {
						editable: true
					});
				}
			},
			afterInsertRow: function(rowid, aData) { //新增一行之后
				//						$("#jqGrid_loan").jqGrid('setCell',rowid,'surNum',aData.borrowNum); 
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

	function addAndDelete(cellvalue, options, rowObjec) {
		var addAndDel = '<div class="operating" data-id="' + options.rowId + '"></span><span class="glyphicon glyphicon-trash delect-boost2" aria-hidden="true" id="add_row" title="删除行"></span></div>';
		return addAndDel;
	}

	/***save ***/
	function saveCell2() {
		$("#jqGrid_loan").jqGrid("saveCell", lastrow2, lastcell2);
	}

	/***删除一行***/
	$(document).on('click', '.delect-boost2', function(e) {
		var thisTitle = $(this).attr("title");
		var rowId = $(this).parent().data('id');
		$('#jqGrid_loan').jqGrid('delRowData', rowId);
	});

	/***新增一行***/
	$(document).on('click', '.newColumn', function(e) {
		var thisTitle = $(this).attr("title");
		var rowId = $(this).parent().data('id');
		$('#jqGrid_loan').jqGrid('addRowData', rowId + 1, {}, 'last');
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
			"loanNumber": loanNumber,
			"returnNumber": returnNumber,
			"residue": residue
		});
	}



	//查询
	$(document).on("click", ".btn-group button[data-eventname='inquire']", function(event) {
		if (flag == true) {
			$.jgrid.GridDestroy(options.TableName);
			loadtable();
		} else {
			flag = true;
		}

	});


}



function checkBox(cellvalue, options, rowObjec) {
	return '<input type="checkbox" class="del" data-blocId="' + rowObjec.blocId + '"  data-id="' + options.rowId + '" />';
}

/**
 *  借出还回  引入借出未还回单据
 */
function initBorrowLend() {
	rowId = $(this).data('rid');
	var options = {
		LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
		//					LoadTableUrl: basePath + "/jxc/storage/borrowManage/importBorrowOrLend",
		//LoadTableUrl: "../../cw/qc/getSubject", //表格数据加载接口地址
		GetRowInfoUrl: "", //编辑时获取数据详细信息接口加载地址
		//LoadTableFomatUrl:"../../json/T_roles.json",
		//LoadTableFomatUrl: "../../", //获取表格显示格式数据加载地址
		//SaveEditUrl: "", //新增或修改后保存数据接口地址
		//SaveAddUrl: "", //新增或修改后保存数据接口地址
		DelRowUrl: "", // 删除信息接口地址
		isSub: "", //是否有子级表格
		subLoadTableUrl: "", //子级表格数据来源地址
		//ModouleName: "", //模块名称。遵照css选择器书写  systemSet_companyParameter
		TableName: "#jqGrid_import", //显示表格名称。遵照css选择器书写
		iconJsonUrl: "../json/icon.json",
		btnbox: ".btnbox ", //功能按钮存放容器。遵照css选择器书写	
		pager: "#gridpager_import"
			//		inputbox: ".inputbox" //搜索条件框存放容器。遵照css选择器书写
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
	var colNames = ['借出单号', '借出日期', '商品名称', '仓库名称', '借出数量', '串号', '已转销售数', '已还回数', '未还回数', '仓库id', '商品id', '是否串号管理'];
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
		name: 'storageName',
		index: 'storageName',
		width: 120,
		align: 'center',
		hidden: false,
		sortable: false
	}, {
		name: 'borrowLendNum',
		index: 'borrowLendNum',
		width: 100,
		align: 'center',
		sorttype: 'string',
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

	/*$.getJSON(options.LoadTableUrl,function(t_datat){
		mydata=t_datat;
		//$(options.TableName).setGridParam({data: mydata}).trigger('reloadGrid');  
	});*/
	function loadtable3() {
		$(options.TableName).jqGrid({
			url: options.LoadTableUrl,
			mtype: "GET",
			datatype: "json",
			//data:mydata,
			//datatype:"local",						
			//editurl: 'clientArray',
			jsonReader: {
				root: "data.rows",
				page: "data.page",
				total: "data.total",
				records: "data.records",
				repeatitems: false
			},
			//cellsubmit: 'clientArray',//单元格保存内容的位置
			colNames: colNames,
			colModel: JqGridColModel,
			//loadonce: false,
			sortable: false,
			rownumbers: true,
			//loadonce: true,
			rowNum: 20,
			rowList: [2, 20, 25, 40],
			pager: options.pager,
			viewrecords: true,
			multiselect: true,
			//	cellEdit:true,
			width: "100%",
			height: $(window).height() * 0.44,
			autowidth: true,
			rownumWidth: 35, // the width of the row numbers columns
			shrinkToFit: false, //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
			ondblClickRow: function(id) {
				//双击进入编辑
				onclickImport(id);
			},
			gridComplete: function() {
				var ids = $(options.TableName).jqGrid("getDataIDs");
				//										debugger;

			},
			afterInsertRow: function(rowid, aData) { //新增一行之后
				$("#jqGrid_import").jqGrid('setCell', rowid, 'backNum', aData.borrowLendNum - aData.surNum);

			},
			loadComplete: function(data) {
				//										var len = data.rows.length;
				//表格加载完成 默认隐藏的列
				//										$(options.TableName).setGridParam().hideCol("metaMoneySee");
				//										$(options.TableName).setGridParam().hideCol("metaMoneyUpdate");
				//										$(options.TableName).setGridParam().hideCol("clientSee");
			},
			loadError: function(xhr, status, error) {
				//console.log(status)
			}
		})
	}

	//商品名称
	function spmcCheck2(cellvalue, options, rowObject) {
		//					console.log(rowObject);
		return '<span class="spmcCheck" data-dismiss="modal">' + cellvalue + '</span>';
	};

	$(document).on('click', '.spmcCheck2', function(e) {
		//				console.log($(this).html() + '....' + rowId)
		$("#jqGrid_SubjectBalance").jqGrid('setCell', rowId, 'spmc', $(this).html());
	});
}