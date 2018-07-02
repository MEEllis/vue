var lastrow;
var lastcell;
var lastrow2;
var lastcell2;
var num = '9';

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
	storageObj = new StorageObj(basePath);
	loadmodal();
	funBlurInit();
	filterSelect();
	initOtherStorageClass();

	$('.multi_select_audit').MSDL({
		'width': '180',
		'data': ['未审核', '已审核', '入库中', '已完成'],
		'ids': ['001', '002', '003', '004'],
		'msg': '_audit'
	});

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
});
//$('.hide_text_audit').val();//获取ids


/***init 经手人***/
function initManagers() {
	//部门选择后才能选择经手人
	$('#managersUid').removeAttr('disabled');
	$('#managersUid').html('');
	var selectHtml = '';
	storageObj.initManagers($('#sectionId').val(), function(data) {
		var list = data.data.employeeVoList;
		if(list){
			$(list).each(function(index, yu) {
				selectHtml += '<option value="' + yu.id + '">' + yu.name + '</option>'
			});
		}
	});
	$('#managersUid').append(selectHtml);
}

/***init 其他出入库方式***/
function initOtherStorageClass() {
	var selectHtml = '';
	storageObj.findOtherStorageClass(0, function(data) {
		var list = data.data.rows;
		$(list).each(function(index, yu) {
			selectHtml += '<option value="' + yu.id + '">' + yu.name + '</option>'
		});
	});
	$('#otherStorageId').append(selectHtml);
}


/***init 仓库名称***/
function initStorage() {
	//部门选择后才能选择仓库
	$('#storageId').removeAttr('disabled');
	$('#storageId').html('');
	var selectHtml = '';
	storageObj.initStorage($('#sectionId').val(), function(data) {
		var list = data.data.rows;
		$(list).each(function(index, yu) {
			selectHtml += '<option value="' + yu.id + '">' + yu.name + '</option>'
		});
	});
	$('#storageId').append(selectHtml);
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
	$('#storageId').attr('disabled', true);
	$('#storageId').html('');
	var selectHtml = '<option value="">请选择部门</option>';
	$('#storageId').append(selectHtml);

	$('#managersUid').attr('disabled', true);
	$('#managersUid').html('');
	var selectHtml = '<option value="">请选择部门</option>';
	$('#managersUid').append(selectHtml);

	//禁选往来单位
	$('#contactName').attr('disabled', true);
	$('#contactName').val('请选择部门');
}

//重置
$(document).on('click', '.reset', function(e) {
	$('.filterData').val('');
	$('.select_rel_audit').val('');
	$('.hide_text_audit').val('');
});

function loadmodal() {
	var options = {
		LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
		//		LoadTableUrl: "../../json/procurement/trusteeData.json",
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
		//		pager:"#jqGridPager"
		//		inputbox: ".inputbox" //搜索条件框存放容器。遵照css选择器书写
	};
	$("#billsDateString").datetimepicker({
		lang: "ch", //语言选择中文
		format: "Y-m-d", //格式化日期
		timepicker: false, //关闭时间选项
		todayButton: false //关闭选择今天按钮
	}).on('blur', function(ev) {
		refreshValidatorField("billsDateString", '#ibillsHead'); //刷新验证信息
	});
	$("#datetimepickerStart1").datetimepicker({
		lang: "ch", //语言选择中文
		format: "Y-m-d", //格式化日期
		timepicker: false, //关闭时间选项
		todayButton: false //关闭选择今天按钮
	});
	$("#datetimepickerEnd1").datetimepicker({
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
	$("#datetimepickerEnd2").datetimepicker({
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
	var colNames = ['操作', '仓库名称', '商品名称', '数量', '单价', '金额', '商品备注', '仓库id', '商品id', 'id', '是否串号管理', '新增人id', '新增时间', '成本价', 'M_主表id', '是否辅助串号管理', '主串号长度', '辅助串号长度'];
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
		width: 200,
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
		width: 200,
		align: 'center',
		sorttype: 'float',
		formatter: "number",
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
	}, {
		name: 'ifAuxImei',
		index: 'ifAuxImei',
		hidden: true,
		sortable: false
	}, {
		name: 'imeiLength',
		index: 'imeiLength',
		hidden: true,
		sortable: false
	}, {
		name: 'auxliaryImeiLength',
		index: 'auxliaryImeiLength',
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
			//单元格编辑后出发  rowid - 数据行的id   cellname-单元格名称（colModel定义的name）  value - 单元格内容   iRow - 单元格所在行的行号（注意不要和rowid搞混），iRow从1开始    iCol - 单元格处于行中的列号，iCol从0开始
			afterSaveCell: function(rowid, cellname, value, iRow, iCol) {},

			onCellSelect: function(id, index, e) {},
			onSelectRow: function(id) {
				if (id != lastsel && lastsel != '') {
					$(options.TableName).jqGrid('saveRow', lastsel, {
						aftersavefunc: function(rowid, response) {

						}
					});
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
						"data-target": "#inStorageModal",
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

				//是否辅助串号管理
				if (rowData.ifAuxImei == '1') {
					$('.fuSwitch').prop('checked', true);
				} else {
					$('.fuSwitch').prop('checked', false);
				}
			},
			afterInsertRow: function(rowid, aData) { //新增一行之后
				arithmeticNo3(rowid, aData.goodsNumber, aData.price);
			},
			gridComplete: function() {
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
				var arr = document.querySelectorAll('.goodsName');
				//							arr.forEach(function(e){
				//								(e.dataset.rid == '') && (e.dataset.target = '')
				//							});
				for (var i = 0, len = arr.length; i < len; i++) {
					(arr[i].dataset.rid == '') && (arr[i].className = 'goodsName');
					(arr[i].dataset.rid == '') && (arr[i].dataset.target = '');
				}
				$('.goodsRid').attr('readonly', true);
				$('.numberRid').attr('readonly', true).removeAttr('id');

			},
			loadError: function(xhr, status, error) {

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
		var addAndDel = '<div class="operating" data-id="' + options.rowId + '"></span><span class="glyphicon glyphicon-trash trashNum2" aria-hidden="true" id="add_row" title="删除行"></span></div>';
		return addAndDel;
	}

	/***删除一行***/
	$(document).on('click', '.trashNum2', function(e) {
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
			var maxId = idList.length == 0 ? 0 : Math.max.apply(null, idList);
			var preRow = $("#jqGrid_SubjectBalance").getRowData(maxId);
			var preStorageName = preRow.storageName || '';
			var storageId = preRow.storageId || '';
			$('#jqGrid_SubjectBalance').jqGrid('addRowData', maxId + 1, {
				storageName: preStorageName,
				goodsName: '',
				goodsNumber: 0,
				price: 0.00,
				amount: 0.00,
				remark: '',
				storageId: storageId
			}, 'last');
			$('#storageName' + (maxId + 1)).val($('#storageId').find("option:selected").text());
			$("#jqGrid_SubjectBalance").jqGrid('setCell', maxId + 1, 'storageId', $('#storageId').val());
		}
	});


	//仓库名称
	function ckmcModel(cellvalue, options, rowObject) {
		return '<input type="text" readonly="readonly" id="storageName' + options.rowId + '" style="border:0;text-align:center;width:150px;height:30px" value="' + cellvalue + '" /><span data-rId="' + options.rowId + '" class="ckmc glyphicon glyphicon-plus" onclick="showStorage(' + options.rowId + ')"></span></span>';
	};

	//商品名称新增
	function spmcModel(cellvalue, options, rowObject) {
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

	//检测输入的是否为数字
	function checkNumber(value, colname) {
		var reg = /^[1-9]\d*$/;
		var arr = [];
		arr = (!reg.test(value)) ? ([false, '请输入数字']) : ([true, ""])
			//				   return value.replace(/[^\d]$/g,'')
		return arr;
	}

	/**
	 * 自定义列计算
	 * @param val
	 * @param name
	 * @param record
	 * @returns {String}
	 */
	function mysum(val, name, record) {
		return "(" + record.subCla + ")小计：";
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


	//查询
	$(document).on("click", ".btn-group button[data-eventname='inquire']", function(event) {
		if (flag == true) {
			$.jgrid.GridDestroy(options.TableName);
			loadtable();
		} else {
			flag = true;
		}

	});


	$(document).on("click", ".btnbox button[data-eventname='printbtn']", function(event) {
		$.zxsaas_plus.showalert("表格打印操作", "表格打印操作咱未完成，敬请期待");

	});
	$(document).on("click", ".btnbox button[data-eventname='exportTablename']", function(event) {
		$.zxsaas_plus.showalert("表格导出操作", "表格导出操作咱未完成，敬请期待");

	});

}

/******************************串号入库***********************************/
var chData = {}; //串号
//数量
$(document).on('click', '.numberPlus', function(e) {
	//清空主串号、辅助串号
	$('#mainImei').val("");
	$('#nextImei').val("");
	var tId = $(this).parent().parent().parent().parent().attr('id');
	var tName = '#' + tId;
	var rId = $(this).data('rid');
	jqgridRowId = $(this).data('rid'); //点击行下标
	var rowData = $('#jqGrid_SubjectBalance').jqGrid('getRowData', rId); //获取行数据
	$('.goodsMsg').val(rowData.goodsName);
	var optionsLeft = {
		LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
		LoadTableUrl: '',
		TableName: '#jqGrid_tranNumber' //显示表格名称。遵照css选择器书写
	};
	$.jgrid.defaults.width = 1280;
	$.jgrid.defaults.responsive = true;
	$.jgrid.defaults.styleUI = 'Bootstrap';
	var lastsel = ''; //最后一次选中的行
	var rightClickColid = ""; //右键列id
	var rightClickColIndex = 0; //右键index
	var mydata;
	var colNames = ['操作', '串号', '辅助串号', '备注', 'ID', '主表id', '数量表id', '仓库id', '商品id', '新增人id', '新增时间'];
	var JqGridColModel = [{
		name: 'deliveryDo',
		index: 'deliveryDo',
		width: 70,
		align: 'center',
		formatter: addAndDelete,
		sortable: false
	}, {
		name: 'imei',
		index: 'imei',
		width: 170,
		align: 'center',
		sorttype: 'string',
		sortable: false
	}, {
		name: 'auxiliaryImei',
		index: 'auxiliaryImei',
		width: 180,
		align: 'center',
		sorttype: 'string',
		sortable: false
	}, {
		name: 'remark',
		index: 'remark',
		width: 100,
		align: 'center',
		sorttype: 'string',
		editable: true,
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
		name: 'otherInstorId',
		index: 'otherInstorId',
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
	}];

	loadtableLeft();

	function loadtableLeft() {
		$(optionsLeft.TableName).jqGrid({
			url: optionsLeft.LoadTableUrl,
			mtype: "GET",
			datatype: "json",
			jsonReader: {
				id: "Id", //相当于设置主键
				root: "row",
				repeatitems: false
			},
			colNames: colNames,
			colModel: JqGridColModel,
			sortable: false,
			rownumbers: true,
			viewrecords: true,
			width: "100%",
			cellsubmit: 'clientArray', //单元格保存内容的位置		
			editurl: 'clientArray',
			cellEdit: true,
			height: $(window).height() * 0.44,
			autowidth: true,
			rownumWidth: 35, // the width of the row numbers columns
			shrinkToFit: false, //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
			gridComplete: function() {
				var ids = $(optionsLeft.TableName).jqGrid("getDataIDs");

			},
			beforeEditCell: function(rowid, cellname, v, iRow, iCol) {
				lastrow2 = iRow;
				lastcell2 = iCol;
			},
			loadComplete: function(data) {

			},
			loadError: function(xhr, status, error) {}
		})

	}

	function addAndDelete(cellvalue, options, rowObjec) {
		var addAndDel = '<div class="operating" data-id="' + options.rowId + '"><span class="glyphicon glyphicon-trash trashNum" aria-hidden="true" id="add_row" title="删除行"></span></div>';
		return addAndDel;
	}

	//删除一行
	$(document).on('click', '.trashNum', function(e) {
		var thisTitle = $(this).attr("title");
		var rowId = $(this).parent().data('id');
		if (thisTitle == "删除行") {
			$('#jqGrid_tranNumber').jqGrid('delRowData', rowId);
			var ids = $('#jqGrid_tranNumber').jqGrid('getDataIDs');
			$('.seletImNumber').html(ids.length);
		}
	});

	var rData = {};
	if ($('.fuSwitch').prop('checked')) {
		$('.fuHi').show();
	} else {
		$('.fuHi').hide();
	}

	$('.mainBill').keydown(function() {
		if (event.keyCode == '13') {
			var rowDataImei = $('#jqGrid_SubjectBalance').jqGrid('getRowData', jqgridRowId); //获取行数据
			//不需要辅助串号
			//如果主串号为空值则不验证
			if ($(this).val().trim() == '') {
				$.zxsaas_plus.showalert('提示信息', '主串号信息不能为空!');
				return false;
			}
			//如果限制主串号和辅助串号的长度为空或''则不需要验证长度
			if (rowDataImei.imeiLength && rowDataImei.imeiLength != $(this).val().trim().length) {
				$.zxsaas_plus.showalert('提示信息', '主串号长度为：' + rowDataImei.imeiLength);
				return false;
			}
			// 如果辅助串号的输入框可见,则获取焦点
			if ($('.secondBill').is(':visible')) {
				$('.secondBill').focus();
			} else {
				rData = {
					'imei': $(this).val(),
					'remark': ''
				};
				addData();
				$(this).val('');
			}
		}
	});
	$('.secondBill').keydown(function() {
		if (event.keyCode == "13") { //keyCode=13是回车键
			var rowDataImei = $('#jqGrid_SubjectBalance').jqGrid('getRowData', jqgridRowId); //获取行数据
			var auxImei = $('.mainBill').val();
			// 如果主串号不存在，则提示输入
			if (auxImei.trim() == '') {
				$.zxsaas_plus.showalert('提示信息', '主串号信息不能为空!', function() {
					$('.mainBill').focus();
				});
				return false;
			}
			// 如果辅助串号不存在,则提示输入
			if ($(this).val().trim() == '') {
				$.zxsaas_plus.showalert('提示信息', '辅助串号信息不能为空!');
				return false;
			}
			// 验证主串号和辅助串号的长度
			if (rowDataImei.imeiLength && rowDataImei.imeiLength != auxImei.trim().length) {
				$.zxsaas_plus.showalert('提示信息', '主串号长度为:' + rowDataImei.imeiLength);
			} else if (rowDataImei.auxliaryImeiLength && rowDataImei.auxliaryImeiLength != $(this).val().trim().length) {
				$.zxsaas_plus.showalert('提示信息', '辅助串号长度为:' + rowDataImei.auxliaryImeiLength);
			} else if ($(this).val().trim() == auxImei.trim()) {
				$.zxsaas_plus.showalert('提示信息', '主串号、辅助串号不能相同!');
			} else {
				rData = {
					'imei': $('.mainBill').val(),
					'auxiliaryImei': $(this).val(),
					'remark': ''
				};
				addData();
				// 添加数据后清空输入框
				$('.mainBill').val('');
				$('.secondBill').val('');
			}
		}
	});
	var addData = function(e) {
		var ids = $('#jqGrid_tranNumber').jqGrid('getDataIDs');
		var maxid;
		maxid = (ids.length == 0) ? 0 : Math.max.apply(Math, ids);
		var li = [];
		var nu = 0;
		if (ids != 0) {
			for (var j = 0; j < ids.length; j++) {
				var rowData = $('#jqGrid_tranNumber').jqGrid("getRowData", ids[j]); //每一行的数据
				li.push(rowData.imei);
				(li.indexOf($('.mainBill').val()) > -1) && (nu++)
			}
			if (nu != 0) {
				//					$.zxsaas_plus.showalert("","已重复!");
			} else {
				$('#jqGrid_tranNumber').jqGrid('addRowData', maxid + 1, rData, 'last');
				$('.seletImNumber').html(maxid + 1);
			}
		} else {
			$('#jqGrid_tranNumber').jqGrid('addRowData', maxid + 1, rData, 'last');
			$('.seletImNumber').html(maxid + 1);
		}
	};

	//行串号填入
	jQuery("#jqGrid_tranNumber").jqGrid("clearGridData");
	$('.goodsMsg').val($('#goodsName' + jqgridRowId).val());

	if (imDetaiList2[jqgridRowId] != null) {
		$(imDetaiList2[jqgridRowId]).each(function(index, yu) {
			$('#jqGrid_tranNumber').jqGrid('addRowData', index, yu);
		});
		$('.seletImNumber').html(imDetaiList2[jqgridRowId].length);
	}

	//确定
	$(document).on('click', '.numSave', function(e) {
		lastrow2 != undefined && $("#jqGrid_tranNumber").jqGrid("saveCell", lastrow2, lastcell2);
		imDetaiList3[jqgridRowId] = []; //点击行串号list
		//保存上次弹窗的数据
		var rightRowIds = $("#jqGrid_tranNumber").getDataIDs();
		var mainJqGridData = $("#jqGrid_SubjectBalance").jqGrid("getRowData", jqgridRowId);
		$("#jqGrid_SubjectBalance").jqGrid('setCell', jqgridRowId, 'goodsNumber', rightRowIds.length);
		arithmeticNo3(jqgridRowId, mainJqGridData.price, rightRowIds.length);
		$(rightRowIds).each(function(index, element) {
			var rowData = $("#jqGrid_tranNumber").jqGrid("getRowData", element);
			delete rowData.deliveryDo;
			rowData.storageId = mainJqGridData.storageId;
			rowData.goodsId = mainJqGridData.goodsId;
			imDetaiList3[jqgridRowId].push(rowData);
		});
		imDetaiList2[jqgridRowId] = imDetaiList3[jqgridRowId];
		footerData();
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

});

$('#inStorageModal').on('shown.bs.modal',function(){
	if($('#slideThree').val()==0){
		$('#mainImei,.numSave').prop('disabled',true);
		$('.btn-warning').prop('disabled',false);
		$('#jqGrid_tranNumber').setGridParam({'cellEdit':false});
	}else{
		$('#mainImei,.numSave').prop('disabled',false);
		$('.btn-warning').prop('disabled',false);
		$('#jqGrid_tranNumber').setGridParam({'cellEdit':true});
	}
})
















