var lastrow;
var lastcell;
var num = '10';

//禁止输入非数字
function clearNoNum(obj) {
	var xck = $(obj).parent().prev().html();
	obj.value = obj.value.replace(/[^\d]/g, "");
	if (obj.value.length > 10) {
		obj.value = obj.value.substring(0, 10);
	}
	if (($(obj).val()) * 1 > (xck * 1)) {
		if (!$('.modal').is(':visible')) $.zxsaas_plus.showalert("提示信息", "数量应该小于现库存!");
		$(obj).val('');
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

	loadtableLeft(); //串号管理
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
	storageObj.findOtherStorageClass(1, function(data) {
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
	var colNames = ['操作', '仓库名称', '商品名称', '现库存', '数量', '单价', '金额', '商品备注', '仓库id', '商品id', 'id', '是否串号管理', '新增人id', '新增时间', '成本价', 'M_主表id'];
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
		name: 'stockNumber',
		index: 'stockNumber',
		width: 200,
		align: 'center',
		hidden: false,
		sortable: false
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
			//单元格编辑后出发  rowid - 数据行的id   cellname-单元格名称（colModel定义的name）  value - 单元格内容   iRow - 单元格所在行的行号（注意不要和rowid搞混），iRow从1开始    iCol - 单元格处于行中的列号，iCol从0开始
			afterSaveCell: function(rowid, cellname, value, iRow, iCol) {},

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
					$("#jqGrid_SubjectBalance").find('#' + rowid).find("td:eq(5)").attr({
						"data-toggle": "modal",
						"data-target": "#numberChoose",
						"data-rId": rowid
					});
					$("#jqGrid_SubjectBalance").find('#' + rowid).find("td:eq(5)").addClass("numberPlus");
				} else {
					$("#jqGrid_SubjectBalance").find('#' + rowid).find("td:eq(5)").removeAttr("data-toggle");
					$("#jqGrid_SubjectBalance").find('#' + rowid).find("td:eq(5)").removeAttr("data-target");
					$("#jqGrid_SubjectBalance").find('#' + rowid).find("td:eq(5)").removeAttr("data-rId");
					$("#jqGrid_SubjectBalance").find('#' + rowid).find("td:eq(5)").removeClass("numberPlus");
					$('#jqGrid_SubjectBalance').setColProp('goodsNumber', {
						editable: true
					});
				}
			},
			afterInsertRow: function(rowid, aData) { //新增一行之后
				arithmeticNo(rowid, aData.goodsNumber, aData.price);
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
				//console.log(data);
				footerData();
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
			var maxId = idList.length == 0 ? 0 : Math.max.apply(null, idList);
			$('#jqGrid_SubjectBalance').jqGrid('addRowData', maxId + 1, {
				storageName: '',
				goodsName: '',
				stockNumber: 0,
				goodsNumber: 0,
				price: 0.00,
				amount: 0.00,
				remark: ''
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

	//检测输入的是否为数字
	function checkNumber(value, colname) {
		//				console.log(arguments);
		//				console.log('value:' + value + '....colname:' + colname);
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