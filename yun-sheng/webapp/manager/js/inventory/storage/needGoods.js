var dataGrid;
var valuationMethodsGrid;
$(function () {
	var lastrow, lastcell; //表格的 行 ，列
	var isDraftOp = true; //草稿单状态  :  true ： 草稿单 ； false ： 正式单据
	var menuBtn; //菜单组
	init();

	function init() {
		initTable();
		initTopForm();
		/*是否是：跳转单据*/
		var billsId = $.trim(functionObjExtent.getQueryString('billsId'))
		if (billsId != '') {
			var billsCode = $.trim(functionObjExtent.getQueryString('billsCode'))
			var copyFlag = $.trim(functionObjExtent.getQueryString('copyFlag'))
			//单据编号
			if (billsCode != "") {
				isDraftOp = false
			} else {
				isDraftOp = true
			}
			pageAjax({
				'billsId': billsId
			}, function () {
				//复制一单
				if (copyFlag == 1) {
					copyBills()
				}
			})
		} else {
			//新增
			getDefaultValues()
		}
		initMenuBtn()
	}
	//载入菜单组件
	function initMenuBtn() {
		var option = {
			btnGroupLeft: {
				add: {
					isShow: true,
					click: function () {
						location.href =location.href.substring(0,location.href.indexOf('?'));
					}
				},
				update: {
					isShow: !isDraftOp,
					click: function () {
						var $grid = dataGrid.$grid;
						$grid.jqGrid("saveCell", lastrow, lastcell);
						var data = getParams();
						var params = $("#topForm").toJsonObject();
						var mainIds = $.trim(params.id)
						if (checkParam(data) == true) {
							return
						}
						$.ajaxPackage({
							contentType: 'application/json',
							url: '/manager/inventory/storage/needGoods/updateNeedGoodsRemark',
							data: JSON.stringify(data),
							success: function (data) {
								$.zxsaas_plus.showalert('success', data.desc || "修改备注成功！");
								pageAjax({
									'billsId': mainIds
								})
							}
						})
					}
				},
				draftSave: {
					isShow: isDraftOp,
					click: function () {
						var data = getParams()
						if (checkParam(data) == true) {
							return
						}
						$.ajaxPackage({
							contentType: 'application/json',
							url: '/manager/inventory/storage/needGoods/saveNeedGoods',
							data: JSON.stringify(data),
							success: function (data) {
								$.zxsaas_plus.showalert('success', "保存成功！");
								var billsId = data.billsId;
								pageAjax({
									'billsId': billsId
								})
							}
						})
					}
				},
				submit: {
					isShow: !!isDraftOp,
					click: function () {
						var params = $("#topForm").toJsonObject();
						var billsStatus = $.trim(params.billsStatus)
						if (billsStatus != '14' && billsStatus != '15' && mainIds == "") {
							$.zxsaas_plus.showalert('提示', '只能提交草稿单!');
						} else {
							handle('/manager/inventory/storage/needGoods/updateBillsStatus', 1);
						}
					}
				},
				draftDel: {
					isShow: isDraftOp,
					click: function () {
						var params = $("#topForm").toJsonObject();
						var mainIds = $.trim(params.id);
						var billsStatus = $.trim(params.billsStatus)
						if (billsStatus != '14' && billsStatus != '15' && mainIds == "") {
							$.zxsaas_plus.showalert('提示', '只能删除草稿单!');
						} else {
							$.zxsaas_plus.showconfirm('提示', "是否删除此草稿单？", function () {
								$.ajaxPackage({
									type: 'get',
									url: '/manager/inventory/storage/needGoods/delNeedGoods',
									data: {
										'billsId': mainIds
									},
									success: function (data) {
										$.zxsaas_plus.showalert('success', data.desc ||
											"删除成功");
										isDraftOp = true;
										setTimeout(function () {
											location.href = location.href.substring( 0, location.href.indexOf( '?'));
										}, 1500)
									}
								})
							});
						}
					}
				},
				check: {
					isShow: !isDraftOp,
					click: function () {
						var params = $("#topForm").toJsonObject();
						var mainIds = $.trim(params.id);
						var billsStatus = $.trim(params.billsStatus);
						var data = getParams()
						if (checkParam(data) == true) {
							return
						}
						if (billsStatus != 13 || mainIds == "") {
							$.zxsaas_plus.showalert('提示', '只能审核已提交订单!');
						} else {
							$.ajaxPackage({
								contentType: 'application/json',
								url: '/manager/inventory/storage/needGoods/approveNeedGoods',
								data: JSON.stringify(data),
								success: function (data) {
									$.zxsaas_plus.showalert('success', "审核成功！");
									var billsId = data.billsId;
									pageAjax({
										'billsId': billsId
									})
								}
							})
						}
					}
				},
				uncheck: {
					isShow: !isDraftOp,
					click: function () {
						var params = $("#topForm").toJsonObject();
						var mainIds = $.trim(params.id);
						var billsStatus = $.trim(params.billsStatus);
						if (billsStatus != 2 || mainIds == "") {
							$.zxsaas_plus.showalert('提示', '只能对已审核的订单进行反审核!');
						} else {
							$.ajaxPackage({
								'url': '/manager/inventory/storage/needGoods/cancleApprove',
								'data': {billsId: mainIds},
								'success': function (data) {
									$.zxsaas_plus.showalert('success', "反审核成功！");
									pageAjax({
										'billsId': mainIds
									})
									$('.rightMap img').removeAttr("src");
								}
							})
						}
					}
				},
				revoke: {
					isShow: !isDraftOp,
					click: function () {
						handle('/manager/inventory/storage/needGoods/updateBillsStatus', 2);
					}
				},
				copy: {
					isShow: !isDraftOp,
					click: function () {
						copyBills();
					}
				},
				loadstore: {
					isShow: !!isDraftOp,
					click: function () {
						reloadStore();
					}
				}
			},
			btnGroupRight: {
				history: {
					isShow: true,
					click: function () {
						window.parent.openWorkBoxByMenutext("要货单单据列表",'/manager/inventory/storage/needGoods/historyMain', true);
					}
				}
			}
		};
		menuBtn = new componentMenuBtn("#MenuTool", option);
	}


	//提交或撤回
	function handle(url, type) {
		var params = $("#topForm").toJsonObject();
		var mainIds=  $.trim(params.id);
		if (mainIds != "") {
			$.ajaxPackage({
				'url': url,
				'data': {billsId: mainIds, flag: type},
				'success': function (data) {
					if (data.result == 1) {
						var mainVo = data.data.mainVo;
						clearAllData();
						if (mainVo != null) {
							fillTopData(mainVo);
							fillTable(mainVo.detailList || []);
							checkBillsStatus(mainVo);
							reloadMenuBtn()
						}

						pageAjax({
							'billsId': mainIds
						})

						var msg = "提交成功！"
						switch (type) {
							case 1:
								break;
							case 2:
								msg = "撤回成功！"
								break;
						}
						$.zxsaas_plus.showalert('success', msg );
					}
				}
			})
		}
	}

	//刷新库存
	function reloadStore(nomsg) {
		var params = $("#topForm").toJsonObject();
		var mainIds = $.trim(params.id);
		var billsStatus = $.trim(params.billsStatus);
		var data = getParams()

		function todo() {
			$.ajaxPackage({
				contentType: 'application/json',
				url: '/manager/inventory/storage/needGoods/refreshStock',
				data: JSON.stringify(data),
				success: function (data) {
					if (data.result == 1) {
						var mainVo = data.data.mainVo;
						if (mainVo != null) {
							if(!nomsg){
								clearAllData();
								fillTopData(mainVo);
								fillTable(mainVo.detailList || []);
								checkBillsStatus(mainVo);
								reloadMenuBtn()
							}else{
								dataGrid.$grid.jqGrid('clearGridData');
								fillTable(mainVo.detailList || []);
							}
						}
						if(!nomsg){
							pageAjax({
								'billsId': mainIds
							})
							$.zxsaas_plus.showalert('success', "库存刷新成功！");
						}
					}

				}
			})
		}

		if (data.detailList && data.detailList.length > 0) {
			if (billsStatus == '14' || billsStatus == '15' && mainIds != "") {
				todo()
			}else if(nomsg && mainIds == ""){
				data.billsStatus = '14';
				todo()
			} else if(!nomsg) {
				$.zxsaas_plus.showalert('提示', "只能对草稿单进行刷新库存的操作！");
			}
		}
	}

	//重载菜单组件
	function reloadMenuBtn() {
		var updateKey = ['draftSave','draftDel','update','check','uncheck','revoke','copy'];
		var addkey = ['draftSave','draftDel','submit','loadstore'];
		var params = $("#topForm").toJsonObject();
		var billsStatus = $.trim(params.billsStatus)
		$.pageDetailCommon.reloadMenuTool({
			isDraftOp:isDraftOp,
			billsStatus:billsStatus,
			menuBtn:menuBtn,
			billsCode:params.billsCode,
			updateKey:updateKey,
			addkey:addkey
		})
		//判断是否禁用反审核
		if(isDraftOp == false && billsStatus==2){
			menuBtn.setUndisabledbtn("uncheck");
			menuBtn.setDisabledbtn("check");
		}else{
			menuBtn.setDisabledbtn("uncheck");
			menuBtn.setUndisabledbtn("check");
		}
		//判断是否禁用撤回
		if(isDraftOp == false && billsStatus==13){
			menuBtn.setUndisabledbtn("revoke");
		}else{
			menuBtn.setDisabledbtn("revoke");
		}
	}
	//复制一单
	function copyBills() {
		isDraftOp = false
		checkBillsStatus({billsStatus:15})
		$("#topForm input[name ='billsStatus']").val(15);//未提交
		reloadMenuBtn()
		//清空底部信息
		$("#topForm input[name='id']").val('')
		loadGood()

		function loadGood() {
			var goodsList = [];
			var ids = $('#dataGrid').getDataIDs();
			$.each(ids, function (i, keyId) {
				var rowData = $('#dataGrid').getRowData(keyId);
				rowData.dataId = rowData.goodsId
				rowData.name = rowData.goodsName
				goodsList.push(rowData)
			});
			$('#dataGrid').jqGrid('clearGridData');
			var goodsId = [];
			for (var i = 0; i < goodsList.length; i++) {
				goodsId.push(goodsList[i].dataId);
			}
			var obj = {
				menuCode: $('#AUTH').data('code'),
				goodsId: goodsId.toString()
			}
			$.ajaxPackage({
				'url': '/manager/component/goods/getStockImeiVoList',
				'data': obj,
				'success': function (data) {
					var list = data.data.dataList;
					var $grid = dataGrid.$grid;
					var cIndex;
					for (var i = 0; i < goodsList.length; i++) {
						var goods = goodsList[i];
						var dataRow = {
							'code': goods.code,
							'goodsName': goods.name,
							'count': goods.count,
							'goodsId': goods.dataId,
							'models': goods.models,
							'color': goods.color,
							'suggestCount': goods.suggestCount,
							'deliveryDateStr': goods.deliveryDateStr,
							'days': goods.days,
							'bookingCount': goods.bookingCount,
							'brandName': goods.brandName,
							'categoryName': goods.categoryName,
							'needSectionCount': goods.needSectionCount,
							'sendSectionCount': goods.sendSectionCount,
							'remark': goods.remark
						};
						cIndex = MyEiditGrid.getMaxRowid($grid) + 1;
						$grid.jqGrid('addRowData', cIndex, dataRow);
					}
					kongRow()
				}
			})
		}
	}
	// 初始化 顶部表单
	function initTopForm() {
		//初始化日期控件
		$('#billsBeginDateStr').datePlu({
			ajaxOpt:{
				async:false,
			},
			endDate: false,
		});
		//要货部门
		$("#needSectionName").storePlu({
			isStoreShow:false,
			isLoadDefaultName:0,
			checkMore: false,
			search: false,
			ifStore: false, // 控制部门选项
			changeStore:function(){
				var $obj=$("#needSectionName");
				$obj.data('id',$obj.data('sectionId'))
				reloadStore(true)
			}
		});
		//发货部门
		$('#sendSectionName').comModalsSection({
			clickback:function(){
				reloadStore(true)
			}
		});
		//经办人
		$("#managerName").comModalsEmployeeBySection({
			sectionIds: 'input[name="needSectionName"]',
			clickback: function () {
				var obj = $("#managerName");
				$("input[name='managerId']").val(obj.data('id'));//设置编辑器值
			}
		})
	}

	// 初始化表格
	function initTable() {
		//操作列
		function custFormat(cellvalue, options, rowObject) {
			var goodsId = rowObject.goodsId?rowObject.goodsId:null;
			var ahref = "<a style='padding-left: 10px;color: blue;text-decoration: none;cursor: pointer' onclick=\"jumpStore('" +goodsId+ "')\">商品库存分布</a>";
			var opreate = '<a class="btn" style="\n' +
				'    padding: 0px;\n' +
				'   width: 20%;\n' +
				'" onclick="javascript: MyEiditGrid.delClickRow(\''+options.gid+'\',\''+options.rowId+'\');"><i class="glyphicon glyphicon-trash"></i></a>';
			return opreate + ahref;
		}

		//当前日期
		function getNowFormatDate() {
			var date = new Date();
			var seperator1 = "-";
			var year = date.getFullYear();
			var month = date.getMonth() + 1;
			var strDate = date.getDate();
			if (month >= 1 && month <= 9) {
				month = "0" + month;
			}
			var currentdate = year + seperator1 + month;
			return currentdate;
		}

		//配置
		var paras = {
			gridId: 'dataGrid',
			noShowOp:false,
			colNames: ['操作','商品编码', '<i class="bitianX">*</i>商品名称', '<i class="bitianX">*</i>申请数量',
				'<i class="bitianX">*</i>审批数量', '建议补货量', '最晚交货日期', '周转天数',
				'门店库存', '客户预订', '备注', '发货部门库存', '品牌', '商品类别', '型号', '颜色', '配置', '商品id','明细id'
			],
			colModel: [
				{ name : 'opp' ,frozen: true ,index: 'op' ,width:'150px' ,align:'left' ,formatter: custFormat,sortable: false },
				{ name: 'code', width: 150, align: 'left' },
				{ name: 'goodsName', width: 200, align: 'left', edittype: 'custom_bt_input', custom_element_bt_click: "openGoodsName", editable: true },
				{ name: 'count', width: 100, align: 'right', sorttype: 'integer', editable: true, sortable: false,
					formatter: 'integer',
					editoptions:{
						onkeyup: "checkInput.clearNoNum(this,10)",
						dataEvents: [{
							type: "focus",
							fn: function(){
								this.select()
							}
						}]
					}
				},
				{ name: 'approveCount', width: 100, align: 'right', hidden: true, sorttype: 'integer', editable: true, sortable: false,
					formatter: 'integer',
					editoptions:{
						onkeyup: "checkInput.clearNoNum(this,10)",
						dataEvents: [{
							type: "focus",
							fn: function(){
								this.select()
							}
						}]
					}
				},
				{ name: 'suggestCount', width: 100, align: 'right' },
				{ name: 'deliveryDateStr', width: 150, align: 'left',editable: true,edittype:"text",editoptions:{
					dataInit:function(e){
						$(e).prop('readonly',true).datepicker({
							format: 'yyyy-mm-dd',
							autoclose: true,
							language:"zh-CN",
							startDate: new Date()
						});
					}
				}},
				{ name: 'days', width: 100, align: 'right' },
				{ name: 'needSectionCount', width: 100, align: 'right' },
				{ name: 'bookingCount', width: 100, align: 'right' },
				{ name: 'remark', width: 200, align: 'left', editable: true },
				{ name: 'sendSectionCount', width: 100, align: 'right' },
				{ name: 'brandName', width: 100, align: 'left' },
				{ name: 'categoryName', width: '100', align: 'left', sortable: false },
				{ name: 'models', width: 70, align: 'left' },
				{ name: 'color', width: 70, align: 'left' },
				{ name: 'configure', width: 70, align: 'left', hidden: true },
				{ name: 'goodsId', hidden: true },
				{ name: 'detailId', hidden: true }
			],
			height: $(window).height() * 0.48,
			shrinkToFit: false
		};
		//回调函数
		var callBackList = {
			onCellSelect: function (rowid, iCol, cellcontent, e) {
				var currRow = $("#dataGrid").jqGrid('getRowData', rowid);
				var aria = $(e.target).attr('aria-describedby').replace(paras.gridId + '_', '')
				lastcell = iCol;
			},
			afterEditCell: function (rowid, name, val, iRow, iCol) { //开始编辑
				lastrow = iRow;
				lastcell = iCol;
			},
			afterSaveCell: function (rowid, name, val, iRow, iCol) { //保存编辑
				lastrow = iRow;
				lastcell = iCol;
			},
			summary: function (rowid, name, val, iRow, iCol) { //统计处理
				gridSum(1)
			},
			getGridDataList: function (rows) {
				delete rows["op"];
				return rows;
			}
		};
		dataGrid = new MyEiditGrid(paras, callBackList);
		dataGrid.addKongRow()
		//商品
		$('#dataGridGood').comModalsStoreNeedGoods({
			clickback: function (goodsList) {
				var $grid = dataGrid.$grid;
				var ids = $grid.getDataIDs();
				var gridSelDataRow = $grid.jqGrid("getRowData", dataGrid.lastrow); //主表选中的行 数据
				var hasRepetGood = false; //是否有重复商品，默认是没有
				var hasCurRow = false; //是否有当前行选中的重复商品，默认是没有
				$.each(ids, function (m, keyId) {
					var rowData = $grid.jqGrid('getRowData', keyId);
					for (var i = 0; i < goodsList.length; i++) {
						var goodsItem = goodsList[i];
						if (goodsItem.dataId == rowData.goodsId) {
							goodsList.splice(i, 1);
							if (gridSelDataRow.goodsId == goodsItem.dataId) {
								hasCurRow = true;
								break
							}
							hasRepetGood = true;
							break;
						}
					}
				});
				if (hasRepetGood == true) {
					$.zxsaas_plus.showalert('提示', "页面存在被选中的商品，已经去掉！");
				}
				addGoodInfo(goodsList, hasCurRow);
				$("#dataGridGood").removeData();
			}
		})
	}
	//添加商品
	function addGoodInfo(goodsList, hasCurRow) {
		var $grid = dataGrid.$grid;
		$grid.jqGrid('saveCell', lastrow, lastcell);
		var selRowId = $grid.jqGrid('getGridParam', 'selrow');
		var cIndex;
		for (var i = 0; i < goodsList.length; i++) {
			var goods = goodsList[i];
			var dataRow = {
				'code': goods.code,
				'goodsName': goods.name,
				'suggestCount': goods.suggestCount,
				'days': goods.days,
				'needSectionCount': goods.needSectionCount,
				'bookingCount': goods.bookingCount,
				'sendSectionCount': goods.sendSectionCount,
				'brandName': goods.brandName,
				'categoryName': goods.categoryName,
				'models': goods.models,
				'color': goods.color,
				'configure': goods.configure,
				'goodsId': goods.dataId
			};
			if (i == 0 && hasCurRow == false) {
				$grid.jqGrid('setRowData', selRowId, dataRow, {});
				cIndex = selRowId;
			} else {
				cIndex = MyEiditGrid.getMaxRowid($grid) + 1;
				$grid.jqGrid('addRowData', cIndex, dataRow);
			}
		}
		kongRow()
	}
	//添加空行
	function kongRow() {
		var $grid = dataGrid.$grid;
		$grid.delRowData('dataGrid_addRowId');
		dataGrid.addKongRow();
		$grid.delRowData(MyEiditGrid.getMaxRowid($grid));
		gridSum()
	}
	var frozenFlag = false;
	//合计
	function gridSum() {
		var $grid = dataGrid.$grid;
		//汇总
		var count = $grid.getCol('count', false, 'sum');
		var approveCount = $grid.getCol('approveCount', false, 'sum');
		var suggestCount = $grid.getCol('suggestCount', false, 'sum');
		var needSectionCount = $grid.getCol('needSectionCount', false, 'sum');
		var bookingCount = $grid.getCol('bookingCount', false, 'sum');
		var sendSectionCount = $grid.getCol('sendSectionCount', false, 'sum');
		$grid.footerData("set", {
			rn: "合计",
			count: count,
			approveCount: approveCount,
			suggestCount: suggestCount,
			needSectionCount: needSectionCount,
			bookingCount: bookingCount,
			sendSectionCount: sendSectionCount
		});
	}
	//获取默认值
	function getDefaultValues() {
		var obj = {
			success: function (data) {
				var deEm = data.data.defaultEmployee;
				$('#managerName').val(deEm.name).data('id', deEm.employeeId)
				$('#topForm input[name="managerId"]').val(deEm.employeeId)
			}
		};
		InterfaceInventory.common.getDefaultValues(obj);
	}
	//获取保存参数
	function getParams() {
		var $grid = dataGrid.$grid;
		$grid.jqGrid("saveCell", lastrow, lastcell);
		//主表
		var params = $("#topForm").toJsonObject();
		//明细数据
		var detailList = [];
		var List = dataGrid.getGridDataList();
		for (var i = 0; i < List.length; i++) {
			var item = List[i];
			if (item.goodsId != '') {
				detailList.push({
					goodsId: item.goodsId,
					code: item.code,
					goodsName: item.goodsName,
					count: item.count,
					approveCount: item.approveCount,
					suggestCount: item.suggestCount,
					deliveryDateStr: item.deliveryDateStr,
					days: item.days,
					needSectionCount: item.needSectionCount,
					sendSectionCount: item.sendSectionCount,
					bookingCount: item.bookingCount,
					remark: item.remark,
					models: item.models,
					color: item.color,
					brandName: item.brandName,
					categoryName: item.categoryName,
					id: item.detailId
				})
			}
		}
		return {
			billsId: params.id,
			needSectionId: $('#needSectionName').data('id'),
			sendSectionId: $('#sendSectionName').data('id'),
			billsDateStr: $("#billsBeginDateStr").val(),
			managerId: params.managerId,
			billsStatus: params.billsStatus,
			historyDays: params.historyDays,
			planDays: params.planDays,
			remark: params.remark,
			detailList: detailList,
		};
	}
	//检查参数
	function checkParam(params) {
		if (params.detailList.length < 1) {
			$.zxsaas_plus.showalert("提示", "没有商品明细！");
			return true
		}
		if(params.needSectionId == params.sendSectionId){
			$.zxsaas_plus.showalert("提示", "发货部门和要货部门相同！");
			return true
		}
	}
	//分页查询ajax请求
	function pageAjax(param, callbackObj) {
		var locaParam = {
			'isDraftOp': isDraftOp
		};
		var exParam = $.extend(false, locaParam, param);
		$.ajaxPackage({
			type: 'get',
			contentType: 'application/json',
			url: '/manager/inventory/storage/needGoods/searchNeedGoods',
			data: exParam,
			success: function (data) {
				if (data.result == 1) {
					var mainVo = data.data.mainVo;
					clearAllData();
					if (mainVo != null) {
						fillTopData(mainVo);
						fillTable(mainVo.detailList || []);
						checkBillsStatus(mainVo);
						reloadMenuBtn()
					} else {
						$.zxsaas_plus.showalert('提示', "没有查询到单据!");
					}
					if (callbackObj) {
						callbackObj(data)
					}
				}
			}
		})
	}
	////清空数据
	function clearAllData() {
		dataGrid.$grid.jqGrid('clearGridData');
		$("#topForm")[0].reset();
	}
	//填充表头（主信息数据）
	function fillTopData(billsHeader) {
		$("#topForm").writeJson2Dom(billsHeader);
		$("#bottomForm").writeJson2Dom(billsHeader);

		$("#topForm input[name='needSectionName']").data("id",billsHeader.needSectionId);
		$("#topForm input[name='sendSectionName']").data("id",billsHeader.sendSectionId);
		$("#topForm input[name='id']").val(billsHeader.billsId);
	}
	//填充表体（信息数据）
	function fillTable(detailList) {
		if (detailList != undefined && detailList.length > 0) {
			for (var i = 0; i < detailList.length; i++) {
				dataGrid.$grid.jqGrid('addRowData', i + 1, detailList[i], 'last');
			}
		}
		gridSum()
	}
	//检查单据状态
	function checkBillsStatus(mainVo) {
		var billsStatus=mainVo.billsStatus
		if(billsStatus==14 || billsStatus==15){ //14-已撤回、15-未提交
			isDraftOp=true
			$('.rightMap img').removeAttr("src");
			$("#topForm :button").show();
			$("#billsBeginDateStr").attr('disabled',false);
			dataGrid.$grid.setColProp("goodsName", {editable: isDraftOp});
			dataGrid.$grid.setGridParam().hideCol("approveCount").trigger("reloadGrid");
		} else {
			isDraftOp=false
			if(billsStatus == 13) { //已提交
				$('.rightMap img').removeAttr("src");
				dataGrid.$grid.setColProp("goodsName", {editable: isDraftOp});
			}
			if(billsStatus==2){ //已审核
				$('.rightMap img:eq(0)').attr('src', '/manager/images/status/statusAudit.png');
			}
			dataGrid.$grid.setGridParam().showCol("approveCount").trigger("reloadGrid");
			$("#topForm :button").hide();
			$("#billsBeginDateStr").attr('disabled',true);
		}
		dataGrid.$grid.setColProp("count", {editable: isDraftOp});
		loadBillsStatusByIsDraftOp()
	}
	//根据 单据类型 显示，隐藏 按钮
	function loadBillsStatusByIsDraftOp() {
		var button  =  $("#billsHeaderForm :button");
		var rightMap  =  $(".rightMap");
		var billsCodeWrap = $('#billsCodeWrap');

		//是否是草稿单
		if(isDraftOp==true){
			button.show()
			rightMap.hide()
			billsCodeWrap.hide()
			dataGrid.$grid.setGridParam().showCol("opp");
			dataGrid.addKongRow();
			dataGrid.$grid.delRowData(MyEiditGrid.getMaxRowid(dataGrid.$grid));
		}
		else {
			button.hide()
			rightMap.show()
			billsCodeWrap.show()
			dataGrid.$grid.setGridParam().hideCol("opp");
		}
	}
})

//跳转库存分布
function jumpStore(goodsId) {
	//查看商品权限
	$.ajaxPackage({
		url: '/manager/inventory/common/validateAccessToken',
		data: {
			menuCode:'SPFB_RP',
			funCode: 'CX',
			authCode:'AC_BB_0273'
		},
		success: function (data) {
			if (data.result == 1) {
				if(data.data.hasPermissions){
					window.parent.openWorkBoxByMenutext("商品库存分布","/report/manager/reportCenter/common/showQueryPage?reportEmid="+userId+"&userId="+userId+"&gsId="+companyId+"&jspPath=reportSystem/storage/goodsDistribute&goodsId="+goodsId,true)
				}else{
					$.zxsaas_plus.showalert('提示','无访问权限!');
				}
			}
		}
	})
}

//jsp业务 调用
function openGoodsName() {
	if ($('#needSectionName').data('id')==null) {
		$.zxsaas_plus.showalert('warning','请选择要货部门!');
	} else if($('#sendSectionName').data('id')==""){
		$.zxsaas_plus.showalert('warning','请选择发货部门!');
	} else {
		$("#dataGridGood").comModalsStoreNeedGoods('setOption', {
			'girdParam': {
				'needSectionId': $('#needSectionName').data('id'),  //要货门店
				'sendSectionId': $('#sendSectionName').data('id'),	//发货门店
				'historyDays': $('#historyDays').val(), 	//历史统计天数
				'planDays': $('#planDays').val(), 			//计划备货天数
				'flag': 0  		//建议补货量大于0
			}
		})
		$('#dataGridGood').next().trigger('click')
	}
}
