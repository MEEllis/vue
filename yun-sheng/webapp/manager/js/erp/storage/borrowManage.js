var lastrow;
var lastcell;
var lastrow2;
var lastcell2;
var lastrow3;
var lastcell3;

var num = '12';

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
	
	loadmodal_borrow();
	initBorrowLend();
	$('#billsDateString').val(new Date())
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
	
	
	/*$("#billsDateString2").datetimepicker({
		lang: "ch", //语言选择中文
		format: "Y-m-d", //格式化日期
		timepicker: false, //关闭时间选项
		todayButton: false, //关闭选择今天按钮
		value:$.DateFormat(new Date(),"yyyy-MM-dd"),
	}).on('blur', function(ev) {
		refreshValidatorField("billsDateString2", '#ibillsHeadBorrowBack'); //刷新验证信息
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
		} else if (e.currentTarget.hash == '#borrowSale') {
			parent.openWorkBoxByMenutext('借入转采购', basePath + '/jxc/storage/borrowSaleDetail/borrowSale');
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
		$('#contactName').attr('disabled', true);
		$('#contactName').val('请选择部门');
	} else if (tabNum == 1) {
		//禁选经手人
		$('#managersUid2').attr('disabled', true);
		$('#managersUid2').html('');
		$('#managersUid2').append(selectHtml);

		//禁选往来单位
		$('#contactName2').attr('disabled', true);
		$('#contactName2').val('请选择部门');
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
			//inputbox: ".inputbox" //搜索条件框存放容器。遵照css选择器书写
	};
	
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
	var colNames = ['操作', '仓库名称',  '类别','商品编码','商品名称','品牌','型号','颜色', '数量', 'detailList','单价', '金额', '商品备注', '仓库id', '商品id', 'id', '是否串号管理', '新增人id', '新增时间', '成本价', 'M_主表id', '是否辅助串号管理', '主串号长度', '辅助串号长度'];
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
	}, 
	{name: 'categoryName', index: 'categoryName', width: 70, align: 'center', sortable: false},
    {name: 'code', index: 'code', width: 160, align: 'center', sortable: false},
	{
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
	}, 
	 {name: 'brandName', index: 'brandName', width: 140, align: 'center', sortable: false},
     {name: 'models', index: 'models', width: 70, align: 'center', sortable: false},
     {name: 'color', index: 'color', width: 70, align: 'center', sortable: false},
	{
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
	}, 
	{name: 'detailList', index: 'detailList',hidden:true},
	{
		name: 'price',
		index: 'price',
		width: 100,
		align: 'center',
		editable: true,
		edittype: 'text',
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
		width: 100,
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
				//							console.log(maxid);
				//当用户点击表格最后一行时,自动增加一行
				//							(id == maxid) && $(options.TableName).jqGrid('addRowData', maxid+1, {storageName:'',goodsName:'',goodsNumber:'',price:'',amount:'',remark:''}, 'last' )
				//							$('#storageName'+(maxid+1)).val($('#storageId').find("option:selected").text());
				//							$("#jqGrid_SubjectBalance").jqGrid('setCell',maxid+1,'storageId',$('#storageId').val()); 
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
				//   0    表示串号管理     
				//   1    数量管理
				var rowData = $("#jqGrid_SubjectBalance").getRowData(rowid);
				if (rowData.ifManageImei == '1') {
					$('#jqGrid_SubjectBalance').setColProp('goodsNumber', {
						editable: false
					});
					$("#jqGrid_SubjectBalance").find('#' + rowid).find("td:eq(9)").attr({
						"data-toggle": "modal",
						"data-target": "#inStorageModal",
						"data-rId": rowid
					});
					$("#jqGrid_SubjectBalance").find('#' + rowid).find("td:eq(9)").addClass("numberPlus");
				} else {
					$("#jqGrid_SubjectBalance").find('#' + rowid).find("td:eq(9)").removeAttr("data-toggle");
					$("#jqGrid_SubjectBalance").find('#' + rowid).find("td:eq(9)").removeAttr("data-target");
					$("#jqGrid_SubjectBalance").find('#' + rowid).find("td:eq(9)").removeAttr("data-rId");
					$("#jqGrid_SubjectBalance").find('#' + rowid).find("td:eq(9)").removeClass("numberPlus");
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
				}else{
					// 启用编辑
					$('#jqGrid_SubjectBalance').setGridParam({
						'cellEdit': true
					});
				}
			},
			loadComplete: function(data) {
				footerData();
				var arr = document.querySelectorAll('.spmc');
				//							arr.forEach(function(e){
				//								(e.dataset.rid == '') && (e.className = 'number');
				//								(e.dataset.rid == '') && (e.parentNode.dataset.target = '')
				//							});

				for (var i = 0, len = arr.length; i < len; i++) {
					(arr[i].dataset.rid == '') && (arr[i].className = 'commodity');
					(arr[i].dataset.rid == '') && (arr[i].parentNode.dataset.target = '');
				}
				$('.commodity').attr('readonly', true);
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
		var addAndDel = '<div class="operating" data-id="' + options.rowId + '"></span><span class="glyphicon glyphicon-trash delect-boost" aria-hidden="true" id="add_row" title="删除行"></span></div>';
		return addAndDel;
	}


	/*弹出框输入框框*/
	function searchS(cellvalue, options, rowObjec) {
		return '<div class="operating" data-id="' + options.rowId + '"><span class="glyphicon glyphicon-search" aria-hidden="true" id="add_row" title="搜索"></span></div>';
	}
	$(document).on('blur', '#checkBan', function(e) {
		var value = $(this).val();
		var reg = /^[1-9]\d*$/;
		if (!reg.test(value)) {
			value = '';
			$.zxsaas_plus.showalert("错误", "只能输入数字!");
		}
		$(this).val(value)
	});

	//新增一行
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
				goodsNumber: 0,
				price: 0.00,
				amount: 0.00,
				remark: ''
			}, 'last');
			$('#storageName' + (maxId + 1)).val($('#storageId').find("option:selected").text());
			$("#jqGrid_SubjectBalance").jqGrid('setCell', maxId + 1, 'storageId', $('#storageId').val());
		}
	});

	//删除一行
	$(document).on('click', '.delect-boost', function(e) {
		var thisTitle = $(this).attr("title");
		var rowId = $(this).parent().data('id');
		if (thisTitle == "删除行") {
			$(options.TableName).jqGrid('delRowData', rowId);
		}
	});

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
	//			function loadComplete(data){
	//							//console.log(data);
	//							footerData();
	//							var arr = document.querySelectorAll('.number');
	//							arr.forEach(function(data){
	////								console.log(data.dataset.rid + '........');
	//								if(data.dataset.rid == '' && data.hidden == 'true'){
	//									console.log('你好世界');
	//									
	//								}
	//							});
	//							//console.log($('.goodsName').data('rid'));
	//						}

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
 * 商品借出单   经手人
 */
function loadmyper() {
	var options = {
		LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
		LoadTableUrl: "../../json/Storage/tranYuan.json",
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
		TableName: "#jqGrid_myPer", //显示表格名称。遵照css选择器书写
		iconJsonUrl: "../json/icon.json",
		btnbox: ".btnbox ", //功能按钮存放容器。遵照css选择器书写	
		pager: "#jqGridmyPer"
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
	var colNames = ['ID', '员工编码', '员工名称', '所属部门', '职位名称', '员工属性', '备注'];
	var JqGridColModel = [{
		name: 'depId',
		index: 'depId',
		width: 100,
		align: 'center',
		sorttype: 'string',
		hidden: true
	}, {
		name: 'code',
		index: 'code',
		width: 100,
		align: 'center',
		sorttype: "string"
	}, {
		name: 'name',
		index: 'name',
		width: 150,
		align: 'center',
		sorttype: 'string',
		formatter: checkName
	}, {
		name: 'sector',
		index: 'sector',
		width: 150,
		align: 'center',
		sorttype: 'string'
	}, {
		name: 'post',
		index: 'post',
		width: 150,
		align: 'center',
		sorttype: 'string'
	}, {
		name: 'property',
		index: 'property',
		width: 100,
		align: 'center',
		sorttype: 'string'
	}, {
		name: 'remark',
		index: 'remark',
		width: 200,
		align: 'center',
		sorttype: 'string'
	}];

	loadtable();
	//加载表格

	/*$.getJSON(options.LoadTableUrl,function(t_datat){
		mydata=t_datat;
		//$(options.TableName).setGridParam({data: mydata}).trigger('reloadGrid');  
	});*/
	function loadtable() {
		//		$.post(options.LoadTableUrl,{},function(r){
		//			if(r.data.rows!=null){
		//				 mydata=r.data;
		//			//console.log(mydata);
		$(options.TableName).jqGrid({
			url: options.LoadTableUrl,
			mtype: "GET",
			//				datatype: "jsonstring",
			//		        datastr: mydata,
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
			//	            multiselect:true,
			//cellEdit:true,
			width: "100%",
			height: $(window).height() * 0.25,
			autowidth: true,
			rownumWidth: 35, // the width of the row numbers columns
			shrinkToFit: false, //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
			ondblClickRow: function(id) {
				//双击进入编辑
				var delid = id;

			},
			onCellSelect: function(id, index, e) {
				var colName = $(options.TableName).jqGrid('getGridParam', 'colModel')[index].name
				select_name = colName
				select_index = index;
				//后续可以通过点击的列名称来弹框等
			},
			onSelectRow: function(id) {
				if (id != lastsel && lastsel != '') {
					$(options.TableName).jqGrid('saveRow', lastsel, {
						aftersavefunc: function(rowid, response) {}
					});
				}
				lastsel = id;
				var rec = $(options.TableName).jqGrid('getRowData', id);

			},

			beforeSelectRow: function(rowid, e) {

			},
			afterInsertRow: function(rowid, aData) { //新增一行之后

			},
			gridComplete: function() {
				var ids = $(options.TableName).jqGrid("getDataIDs");

			},
			loadComplete: function(data) {

			},
			loadError: function(xhr, status, error) {
				//console.log(status)
			}
		})
	}
}
//经办人
function checkName(cellvalue, options, rowObject) {
	//	console.log(rowObject);
	return '<span class="checkName" data-dismiss="modal">' + cellvalue + '</span>';
};
$(document).on('click', '.checkName', function(e) {
	$('.perSearch').val($(this).html());
});


/**
 * 借入归还
 */
function loadmodal_borrow() {
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
		TableName: "#jqGrid_borrow", //显示表格名称。遵照css选择器书写
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
	var colNames = ['操作', '借入单号', '借入日期', '商品名称', '借入数量', '串号', '已转采购数', '已归还数', '未归还数', '本次归还数量', '本次归还串号', '归还仓库名称', '未归还剩余数量', '备注', 'id', '草稿单据id', '仓库id', '商品id', '借入日期', '借入串号', '借入数量', '新增人', '新增时间', '是否串号管理'];
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
						$(this).parents("table").jqGrid("saveCell", lastrow3, lastcell3);
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
						$(this).parents("table").jqGrid("saveCell", lastrow3, lastcell3);
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
		name: 'borrowDateString',
		index: 'borrowDateString',
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
				lastrow3 = iRow;
				lastcell3 = iCol;
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
				jqgridRowId = rowid;
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
				//						var parentId=$(this).attr('id');
				//						if(parentId='jqGrid_SubjectBalance'){
				//							$('.moveFlag').remove();
				//							var tdListTime=$('#jqGrid_SubjectBalance').getGridParam('colModel');
				//							var tdHtml=$.map(tdListTime,function(){return '<td></td>'}).join(" ");
				//							var html="<tr class='moveFlag' style='height:40px;outline-style:none;'><td><span id='addIcon' class='glyphicon glyphicon-plus-sign'></span></td>"+tdHtml+"</tr>"
				//							$('#jqGrid_SubjectBalance tbody').append(html);
				//						}
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
	function saveCell2() {
		$("#jqGrid_borrow").jqGrid("saveCell", lastrow3, lastcell3);
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
		// 单据状态
		var status = $('#slideThree').val();
		// 列表数据
		var rows = $("#jqGrid_SubjectBalance").getDataIDs();
		// 非正式单据
		if (status != 0){
			// 启用编辑
			var thisTitle = $(this).attr("title");
			var rowId = $(this).parent().data('id');
			if (thisTitle == "删除行") {
				$("#jqGrid_borrow").jqGrid('delRowData', rowId);
			}
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
	var colNames = ['借入单号', '借入日期', '商品名称', '仓库名称', '借入数量', '串号', '已转采购数', '已归还数', '未归还数', '仓库id', '商品id', '是否串号管理'];
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
		width: 100,
		align: 'center',
		hidden: false,
		sortable: false
	}, {
		name: 'borrowLendNum',
		index: 'borrowLendNum',
		width: 80,
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
	var gId = rowData.goodsId; //数据id

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
				//console.log(data);

			},
			loadError: function(xhr, status, error) {
				//console.log(status)
			}
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
	
//	$(document).on("input propertyinput",".mainBill",function(){
//		 if($(this).val()!=""){
//			 
//		 }
//	});
	
	function numCheck(n,callback){//串号重复check
		var switch1=true,switch2=true;
		var tranNumberimeiArr=$('#jqGrid_tranNumber').getCol('imei',false);
		var tranNumberauimeiArr=$('#jqGrid_tranNumber').getCol('auxiliaryImei',false);
		if($.inArray(n,tranNumberimeiArr)==-1&&$.inArray(n,tranNumberauimeiArr)==-1){
			switch1=true;
		}else{
			$.zxsaas_plus.showalert('warning','串号'+n+'在表中第'+( tranNumberimeiArr.indexOf(n) != -1 ? (tranNumberimeiArr.indexOf(n)+1) : (tranNumberauimeiArr.indexOf(n)+1))+'行已录入');
			switch1=false;
		}
		if(switch1){
			var gridIDs=$('#jqGrid_SubjectBalance').jqGrid("getDataIDs");
			var excludeID=$('#jqGrid_SubjectBalance').getGridParam("selrow");
			gridIDs.splice($.inArray(excludeID,gridIDs),1);
			$.each(gridIDs,function(i,val){
				var gridRowDetailList=$('#jqGrid_SubjectBalance').jqGrid("getRowData",val).detailList;
				if(gridRowDetailList!=''){
					var imeiArr=[],auimeiArr=[];
					$.each(JSON.parse(gridRowDetailList),function(j,jval){
						imeiArr.push(jval.imei)
						auimeiArr.push(jval.auxiliaryImei)
						imeiArr=$.grep(imeiArr,function(n){return $.trim(n).length > 0;});
						auimeiArr=$.grep(auimeiArr,function(n){return $.trim(n).length > 0;});
						if($.inArray(n,imeiArr)==-1&&$.inArray(n,auimeiArr)==-1){
							switch2=true;
						}else{
							$.zxsaas_plus.showalert('warning','串号'+n+'在第'+(i+1)+'行'+(j+1)+'列已录入，请前往查看');
							switch2=false;
							return false;
						}
					})
					
				}
			})
			if(switch2){
				if(callback)callback();
			}
		}
	}
	
	function testImei(data,callBack){
		   $.ajax({
				url: basePath + '/inventory/common/validateImeiBeforeInStock',
				type : "POST",
				dataType : 'json',
				data:{"queryKey":data},
				success:function(data){
					var result = data.data;
					if(data.result != 1){
						$.zxsaas_plus.showalert('warning',data.desc);
						return
					}else{
						callBack()
					};
				}
			}); 
	   }
	$(document).on("keyup",".mainBill",function(){
		
		if (event.keyCode == '13') {
			var rowDataImei = $('#jqGrid_SubjectBalance').jqGrid('getRowData', jqgridRowId); //获取行数据
			//var sign =false;
			//不需要辅助串号
			//如果主串号为空值则不验证
			if ($(this).val().trim() == '') {
				$.zxsaas_plus.showalert('提示信息', '主串号信息不能为空!');
				return false;
			//	sign=false;
				
			}
			//如果限制主串号和辅助串号的长度不存在则不需要验证长度
			else if (rowDataImei.imeiLength && rowDataImei.imeiLength != $(this).val().trim().length) {
				$.zxsaas_plus.showalert('提示信息', '主串号长度为：' + rowDataImei.imeiLength);
				return false;
			//	sign=false;
			}else{
				numCheck($(".mainBill").val().trim(),function(){
					// 如果辅助串号的输入框可见,则获取焦点
					testImei($(".mainBill").val().trim(),function(){
						if ($('.secondBill').is(':visible')) {
							$('.secondBill').focus();
						} else {
							rData = {
								'imei': $(this).val(),
								'remark': ''
							};
							//if(sign){
							 addData();
							//}
							// $(this).val('');
						}
					})
					
				})
				
				
				
				
			}
			
			
			
		}
		
		
		
		
	});
//	$('.mainBill').keydown(function() {
//		
//	});
	$(document).on("keydown",".secondBill",function(){
	//$('.secondBill').keydown(function() {
		if (event.keyCode == "13") {
			var rowDataImei = $('#jqGrid_SubjectBalance').jqGrid('getRowData', jqgridRowId);
			var auxImei = $('.mainBill').val();
			//var sign=false;
			// 如果主串号不存在，则提示输入
			if (auxImei.trim() == '') {
				$.zxsaas_plus.showalert('提示信息', '主串号信息不能为空!', function() {
					$('.mainBill').focus();
				});
				return false;
				//sign=false;
			}
			// 如果辅助串号不存在,则提示输入
			else if ($(this).val().trim() == '') {
				$.zxsaas_plus.showalert('提示信息', '辅助串号信息不能为空!');
				return false;
			//	sign=false;
			}
			// 验证主串号和辅助串号的长度
			else if (rowDataImei.imeiLength && rowDataImei.imeiLength != auxImei.trim().length) {
				$.zxsaas_plus.showalert('提示信息', '主串号长度为:' + rowDataImei.imeiLength);
			//	sign=false;
			} else if (rowDataImei.auxliaryImeiLength && rowDataImei.auxliaryImeiLength != $(this).val().trim().length) {
				$.zxsaas_plus.showalert('提示信息', '辅助串号长度为:' + rowDataImei.auxliaryImeiLength);
				//sign=false;
			} else if ($(this).val().trim() == auxImei.trim()) {
				$.zxsaas_plus.showalert('提示信息', '主串号、辅助串号不能相同!');
				//sign=false;
			} else {
				numCheck($(".mainBill").val().trim(),function(){
					// 如果辅助串号的输入框可见,则获取焦点
					testImei($(".secondBill").val().trim(),function(){
						rData = {
								'imei': $('.mainBill').val(),
								'auxiliaryImei': $(".secondBill").val(),
								'remark': ''
							};
						addData();
						$('.mainBill').val('');
						$('.secondBill').val('');
					})
					
				})
				
//				
//				rData = {
//					'imei': $('.mainBill').val(),
//					'auxiliaryImei': $(this).val(),
//					'remark': ''
//				};
//				addData();
//				// 添加数据后清空输入框
//				$('.mainBill').val('');
//				$('.secondBill').val('');
			}
		}
	});
	var addData = function(e) {
		var ids = $('#jqGrid_tranNumber').jqGrid('getDataIDs');
		var maxid;
		maxid = (ids.length == 0) ? 0 : Math.max.apply(Math, ids);
		var arr = [];
		if (ids != 0) {
			for (var j = 0; j < ids.length; j++) {
				var rowData = $('#jqGrid_tranNumber').jqGrid("getRowData", ids[j]); //每一行的数据
				arr.push(rowData.imei);
			}
			if (arr.indexOf($('.mainBill').val()) < 0) {
				$('#jqGrid_tranNumber').jqGrid('addRowData', maxid + 1, rData, 'last');
			}
		} else {
			$('#jqGrid_tranNumber').jqGrid('addRowData', maxid + 1, rData, 'last');
		}
		$('.seletImNumber').html(maxid + 1);
	};

	//行串号填入
	jQuery("#jqGrid_tranNumber").jqGrid("clearGridData");
	if (imDetaiList2[jqgridRowId] != null) {
		$(imDetaiList2[jqgridRowId]).each(function(index, yu) {
			$('#jqGrid_tranNumber').jqGrid('addRowData', index, yu);
		});
		$('.seletImNumber').html(imDetaiList2[jqgridRowId].length);
	}

	//确定
	$(document).on('click', '.numSave', function(e) {
		var ids=$("#jqGrid_tranNumber").jqGrid("getDataIDs");
		if(!ids.length){$.zxsaas_plus.showalert('warning','串号条目为0！');return false;}
		var detailList=new Array;
		$.each(ids,function(i,val){
			var rowData=$("#jqGrid_tranNumber").jqGrid("getRowData",val);
			detailList[i]={};
			detailList[i].imei=rowData.imei;
			detailList[i].auxiliaryImei=rowData.auxiliaryImei;
			detailList[i].remark=rowData.remark;
		})
		$("#jqGrid_SubjectBalance").jqGrid("setCell",$("#jqGrid_SubjectBalance").getGridParam("selrow"),"goodsNumber",detailList.length);
		$("#jqGrid_SubjectBalance").jqGrid("setCell",$("#jqGrid_SubjectBalance").getGridParam("selrow"),"detailList",JSON.stringify(detailList));
//		$('#inStorageModal').modal('hide');
//		var tol=Number($("#grid").jqGrid("getRowData",$("#grid").getGridParam("selrow")).goodsNumber)*Number($("#grid").jqGrid("getRowData",$("#grid").getGridParam("selrow")).price);
//    	$("#grid").jqGrid("setCell",$("#grid").getGridParam("selrow"),"amount",tol);
		
		
//		lastrow2 != undefined && $("#jqGrid_tranNumber").jqGrid("saveCell", lastrow2, lastcell2);
//		imDetaiList3[jqgridRowId] = []; //点击行串号list
//		//保存上次弹窗的数据
//		var rightRowIds = $("#jqGrid_tranNumber").getDataIDs();
//		var mainJqGridData = $("#jqGrid_SubjectBalance").jqGrid("getRowData", jqgridRowId);
//		$("#jqGrid_SubjectBalance").jqGrid('setCell', jqgridRowId, 'goodsNumber', rightRowIds.length);
//		arithmeticNo(jqgridRowId, mainJqGridData.price, rightRowIds.length);
//		$(rightRowIds).each(function(index, element) {
//			var rowData = $("#jqGrid_tranNumber").jqGrid("getRowData", element);
//			delete rowData.deliveryDo;
//			rowData.storageId = mainJqGridData.storageId;
//			rowData.goodsId = mainJqGridData.goodsId;
//			imDetaiList3[jqgridRowId].push(rowData);
//		});
//		imDetaiList2[jqgridRowId] = imDetaiList3[jqgridRowId];
	});

});