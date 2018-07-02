var lastrow;
var lastcell;
var num = '11'; //单据类型
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
	AppEvent.on('getSectionId',function(){
		return $('#sectionId').val();
	})
	storageObj = new StorageObj(basePath);
	loadmodal();
	$(".slideThree").toggleClass("color7D5F50");
	$('#slideThree').attr('checked', false);
	$('#slideThree').val('1');
	$.showBillsStatus("billsStautsImg", "0");
	loadtableLeft();
	funBlurInit();
	elseInitNull();
	/*
	 //串号管理
	filterSelect();
	onclickNewBills();*/

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
		$('#managersUid').append(selectHtml);
	});

}
/***init 移出、移入仓库***/
function initMoveStorage() {
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
				selectHtml += '<option value="' + yu.id + '">' + yu.name + '</option>'
			});
		}
		$('#inStorageId').append(selectHtml);
		$('#outStorageId').append(selectHtml);
		// selectStorage();
	});
}

/***init 移出、移入仓库***/
function initMoveStorageImport() {
	$('#selOutStorageStr').html('');
	$('#selInstorageStr').html('');
	storageObj.initStorage($('#selSectionIdStr').val(), function(data) {
		if(data.data.rows){
			selectHtml += '<option value="">请选择仓库</option>';
			var list = data.data.rows;
			var selectHtml = '';
			$(list).each(function(index, yu) {
				selectHtml += '<option value="' + yu.id + '">' + yu.name + '</option>'
			});
		}
		$('#selOutStorageStr').append(selectHtml);
		$('#selInstorageStr').append(selectHtml);
	});
}

/***init 当部门为空时***/
function initNull() {
	var selectHtml = '<option value="">请选择部门</option>';
	$('#inStorageId').attr('disabled', true);
	$('#inStorageId').html('');
	$('#inStorageId').append(selectHtml);

	$('#outStorageId').attr('disabled', true);
	$('#outStorageId').html('');
	$('#outStorageId').append(selectHtml);

	$('#managersUid').attr('disabled', true);
	$('#managersUid').html('');
	$('#managersUid').append(selectHtml);
}

function loadmodal() {
	var options = {
		LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
		//		LoadTableUrl: "../../json/Storage/transferPrice.json",
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
	var colNames = ['操作', '商品名称', '移出数量', '备注', 'id', '商品id', '仓库id', '是否串号管理', 'm_主表id', '新增人id', '新增时间'];
	var JqGridColModel = [{
		name: 'deliveryDo',
		index: 'deliveryDo',
		width: 70,
		align: 'center',
		formatter: addAndDelete,
		sortable: false
	}, {
		name: 'goodsName',
		index: 'goodsName',
		width: 200,
		align: 'center',
		sorttype: 'string',
		sortable: false,
		editable: true,
		edittype: 'custom',
		editoptions: {
			custom_element: function(value, options) {
				return '<input type="text" readonly="readonly" id="goodsName' + options.rowId + '" class="form-control" value="' + value + '" /><span style="margin-top:-25px;margin-left:-40px;display:block;float:right;" data-rId="' + options.rowId + '" class="spmc glyphicon glyphicon-plus colspan2" onclick="showGoods(' + options.rowId + ')"></span></span>';
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
		name: 'id',
		index: 'id',
		hidden: true,
		sortable: false
	}, {
		name: 'goodsId',
		index: 'goodsId',
		align: 'center',
		sorttype: 'int',
		hidden: true,
		sortable: false
	}, {
		name: 'storageId',
		index: 'storageId',
		align: 'center',
		sorttype: 'int',
		hidden: true,
		sortable: false
	}, {
		name: 'ifManageImei',
		index: 'ifManageImei',
		hidden: true,
		sortable: false
	}, {
		name: 'billsMainId',
		index: 'billsMainId',
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

	loadtable();
	//加载表格


	function loadtable() {
		$(options.TableName).jqGrid({
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
			width: "100%",
			height: $(window).height() * 0.45,
			autowidth: true,
			rownumWidth: 35, // the width of the row numbers columns
			shrinkToFit: true, //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
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
					$("#jqGrid_SubjectBalance").find('#' + rowid).find("td:eq(3)").attr({
						"data-toggle": "modal",
						"data-target": "#numberChoose",
						"data-rId": rowid
					});
					$("#jqGrid_SubjectBalance").find('#' + rowid).find("td:eq(3)").addClass("numberPlus");
				} else {
					$("#jqGrid_SubjectBalance").find('#' + rowid).find("td:eq(3)").removeAttr("data-toggle");
					$("#jqGrid_SubjectBalance").find('#' + rowid).find("td:eq(3)").removeAttr("data-target");
					$("#jqGrid_SubjectBalance").find('#' + rowid).find("td:eq(3)").removeAttr("data-rId");
					$("#jqGrid_SubjectBalance").find('#' + rowid).find("td:eq(3)").removeClass("numberPlus");
					$('#jqGrid_SubjectBalance').setColProp('goodsNumber', {
						editable: true
					});
				}
			},
			afterInsertRow: function(rowid, aData) { //新增一行之后

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
				}else{
					// 启用编辑
					$('#jqGrid_SubjectBalance').setGridParam({
						'cellEdit': true
					});
				}
			},
			loadComplete: function(data) {
				//console.log(data);
				footerData();
				var arr = document.querySelectorAll('.spmc');
				//							arr.forEach(function(e){
				//								(e.dataset.rid == '') && (e.className = 'number');
				//								(e.dataset.rid == '') && (e.parentNode.dataset.target = '')
				//							});

				for (var i = 0, len = arr.length; i < len; i++) {
					(arr[i].dataset.rid == '') && (arr[i].className = 'spmc');
					(arr[i].dataset.rid == '') && (arr[i].parentNode.dataset.target = '');
				}
				$('.commodity').attr('readonly', true);
				$('.numberRid').attr('readonly', true).removeAttr('id');
			},
			//						loadHE:function(data){
			//							//console.log(data);
			//							footerData();
			//							var arr = document.querySelectorAll('.spmc');
			////							arr.forEach(function(e){
			////								(e.dataset.rid == '') && (e.className = 'number');
			////								(e.dataset.rid == '') && (e.parentNode.dataset.target = '')
			////							});
			//							
			//							for(var i = 0,len = arr.length;i < len;i ++){
			//								(arr[i].dataset.rid == '') && (arr[i].className = 'spmc');
			//								(arr[i].dataset.rid == '') && (arr[i].parentNode.dataset.target = '');
			//							}
			//						},
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
		if (status != 0){
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
				goodsName: '',
				goodsNumber: 0,
				remark: ''
			}, 'last');
		}
	});


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
	/*function mysum(val, name, record)
			{
				return "("+record.subCla+")小计：";
			}/*
			
		/**
		 * 修改表格底部
		 */
	function footerData() {
		var footerNumber = $("#jqGrid_SubjectBalance").getCol('goodsNumber', false, 'sum');

		$("#jqGrid_SubjectBalance").jqGrid('footerData', 'set', {
			goodsNumber: footerNumber
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
 * 商品名称选择   复选框
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
			$.fn.zTree.init($("#spmcDataTreeCheck"), setting, data);
			var str = $('#spmcDataTreeCheck_1_switch').attr('class');
			//console.log(str); //button level0 switch roots_close
			var Class = str.replace('roots', 'center');
			$('#spmcDataTreeCheck_1_switch').attr('class', Class);

			var zTree = $.fn.zTree.getZTreeObj("spmcDataTreeCheck");
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
			shrinkToFit: false, //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
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
				//									$(options.TableName).setGridParam().hideCol("metaMoneySee");
				//									$(options.TableName).setGridParam().hideCol("metaMoneyUpdate");
				//									$(options.TableName).setGridParam().hideCol("clientSee");

			},
			loadError: function(xhr, status, error) {
				//console.log(status)
			}
		})

	}

	//商品名称
	function spmcCheck2(cellvalue, options, rowObject) {
		//				console.log(rowObject);
		return '<span class="spmcCheck" data-dismiss="modal">' + cellvalue + '</span>';
	};

	$(document).on('click', '.spmcCheck2', function(e) {
		//			console.log($(this).html() + '....' + rowId)
		$("#jqGrid_SubjectBalance").jqGrid('setCell', rowId, 'spmc', $(this).html());
	});


});

/**
 * 过滤 移出仓库   复选框
 */
var rowId = '';
$(document).on('click', '.shiftOut', function(e) {
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
			$.fn.zTree.init($("#shiftOutDataTree"), setting, data);
			var str = $('#shiftOutDataTree_1_switch').attr('class');
			//console.log(str); //button level0 switch roots_close
			var Class = str.replace('roots', 'center');
			$('#shiftOutDataTree_1_switch').attr('class', Class);

			var zTree = $.fn.zTree.getZTreeObj("shiftOutDataTree");
			zTree.expandAll(true); //展开全部节点
		},
		error: function(msg) {
			alert(" 数据加载失败！" + msg);
		}
	});
	rowId = $(this).data('rid');
	var options = {
		LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
		LoadTableUrl: "../../json/Storage/comShift.json",
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
		TableName: "#jqGrid_tranEntrepot", //显示表格名称。遵照css选择器书写
		iconJsonUrl: "../json/icon.json",
		btnbox: ".btnbox ", //功能按钮存放容器。遵照css选择器书写	
		pager: "#gridpager_tranEntrepot"
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
	var colNames = ['ID', '公司名称', '部门名称', '仓库名称', '仓库类型', '备注'];
	var JqGridColModel = [{
		name: 'blocId',
		index: 'blocId',
		width: 55,
		align: 'center',
		sorttype: 'string',
		hidden: true
	}, {
		name: 'company',
		index: 'company',
		width: 100,
		align: 'center',
		sorttype: 'string'
	}, {
		name: 'department',
		index: 'department',
		width: 100,
		align: 'center',
		sorttype: 'string'
	}, {
		name: 'entrepot',
		index: 'entrepot',
		width: 100,
		align: 'center',
		sorttype: 'string'
	}, {
		name: 'entrepotType',
		index: 'entrepotType',
		width: 100,
		align: 'center',
		sorttype: 'string'
	}, {
		name: 'remark',
		index: 'remark',
		width: 100,
		align: 'center',
		sorttype: 'string'
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
			shrinkToFit: false, //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
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
				//									$(options.TableName).setGridParam().hideCol("metaMoneySee");
				//									$(options.TableName).setGridParam().hideCol("metaMoneyUpdate");
				//									$(options.TableName).setGridParam().hideCol("clientSee");

			},
			loadError: function(xhr, status, error) {
				//console.log(status)
			}
		})

	}
});


/**
 * 过滤 移入仓库   复选框
 */
var rowId = '';
$(document).on('click', '.shiftIn', function(e) {
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
			$.fn.zTree.init($("#shiftInDataTree"), setting, data);
			var str = $('#shiftInDataTree_1_switch').attr('class');
			//console.log(str); //button level0 switch roots_close
			var Class = str.replace('roots', 'center');
			$('#shiftInDataTree_1_switch').attr('class', Class);

			var zTree = $.fn.zTree.getZTreeObj("shiftInDataTree");
			zTree.expandAll(true); //展开全部节点
		},
		error: function(msg) {
			alert(" 数据加载失败！" + msg);
		}
	});
	rowId = $(this).data('rid');
	var options = {
		LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
		LoadTableUrl: "../../json/Storage/comShift.json",
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
		TableName: "#jqGrid_tranShiftIn", //显示表格名称。遵照css选择器书写
		iconJsonUrl: "../json/icon.json",
		btnbox: ".btnbox ", //功能按钮存放容器。遵照css选择器书写	
		pager: "#gridpager_tranShiftIn"
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
	var colNames = ['ID', '公司名称', '部门名称', '仓库名称', '仓库类型', '备注'];
	var JqGridColModel = [{
		name: 'blocId',
		index: 'blocId',
		width: 55,
		align: 'center',
		sorttype: 'string',
		hidden: true
	}, {
		name: 'company',
		index: 'company',
		width: 100,
		align: 'center',
		sorttype: 'string'
	}, {
		name: 'department',
		index: 'department',
		width: 100,
		align: 'center',
		sorttype: 'string'
	}, {
		name: 'entrepot',
		index: 'entrepot',
		width: 100,
		align: 'center',
		sorttype: 'string'
	}, {
		name: 'entrepotType',
		index: 'entrepotType',
		width: 100,
		align: 'center',
		sorttype: 'string'
	}, {
		name: 'remark',
		index: 'remark',
		width: 100,
		align: 'center',
		sorttype: 'string'
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
			shrinkToFit: false, //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
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
				//									$(options.TableName).setGridParam().hideCol("metaMoneySee");
				//									$(options.TableName).setGridParam().hideCol("metaMoneyUpdate");
				//									$(options.TableName).setGridParam().hideCol("clientSee");

			},
			loadError: function(xhr, status, error) {
				//console.log(status)
			}
		})

	}
});