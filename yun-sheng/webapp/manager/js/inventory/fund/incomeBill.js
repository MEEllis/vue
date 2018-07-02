var dataGrid, allotGrid;
var footerAdd = true
$(function () {
	var lastrow, lastcell;
	var billsStatus = 1;//订单状态  1 草稿 6 过账 7 红冲
	var isDraftOp = true;//草稿单状态  :  true ： 草稿单 ； false ： 正式单据
	init()

	$("#managerName").parent().find('.showModalBtn').click(function () {
		if ($("#sectionName").data('id')) {

		} else {
			$.zxsaas_plus.showalert('warning', '请先选择付款部门')
		}
	})
	//部门
	$("#sectionName").modalsbox({
		grid: {
			id: 'section',
			url: basePath + "/component/section/getAccessSectionVoPageList",
			param: {}
		},
		tree: {
			id: 'sectionNameTree',
			url: basePath + "/component/section/getAccessSectionTreeNodeVoList",
			param: {}
		},
		multiselect: false,
		placeholder: '收款部门',
		callback: function (data) {
			$('#paymentGrid').setGridParam({
				url: '/manager/component/account/getAccountVoPageList',
				postData: {
					sectionIds: data.dataId
				}
			}).trigger('reloadGrid').resize();
			$('#payAmountSum').val('')


			$("#managerName").parent().find('.modal').remove()
			$("#managerName").val('').data('id', '')
			$("#managerName").modalsbox({
				grid: {
					id: 'operator',
					url: basePath + "/component/employee/getEmployeeVoPageList",
					param: {
						'sectionIds': data.dataId
					}
				},
				multiselect: false,
				placeholder: '收款人',
			})

		}
	})
	//添加部门
	$("#addSection").modalsbox({
		grid: {
			id: 'sectionAdd',
			url: basePath + "/component/section/getAccessSectionVoPageList",
			param: {}
		},
		tree: {
			id: 'sectionNameAddTree',
			url: basePath + "/component/section/getAccessSectionTreeNodeVoList",
			param: {}
		},
		multiselect: true,
		placeholder: '部门',
		callback: function (data) {
			var info = $('#allotGrid').getRowData()
			$.each(info, function (k, v) {
				if (v.allotMoney == 0 && v.allotScale == 0 && v.managersUid == '' && v.sectionId == '') {
					$('#allotGrid').delRowData(k + 1)
				}

			})
			$.each(data, function (k, v) {
				allotGrid.kongRow = {
					sectionName: v.name,
					sectionId: v.dataId
				}
				allotGrid.addKongRow()
			})

			allotGrid.kongRow = {}
		}
	})

	//往来单位
	$("#contactsunitName").modalsbox({
		grid: {
			id: 'contactUnits',
			url: basePath + "/component/contactUnit/getContactUnitVoPageList",
			param: {}
		},
		tree: {
			id: 'contactsunitTree',
			url: basePath + "/component/contactUnit/getContactUnitClassTreeNodeVoList",
			param: {}
		},
		multiselect: false,
		placeholder: '往来单位',
	})


	function init() {
		initTopForm()
		initTable()
		initAllotTable()
		initMenuBtn()
		/*是否是：跳转单据*/
		var billsId = $.trim(functionObjExtent.getQueryString('billsId'))
		if (billsId != '') {
			var billsCode = $.trim(functionObjExtent.getQueryString('billsCode'))
			var copyFlag = $.trim(functionObjExtent.getQueryString('copyFlag'))
			//单据编号
			if (billsCode != "") {
				isDraftOp = false
				if(billsCode.indexOf('_') != -1){
					menuBtn.setDisabledbtn("copy");
				}
			} else {
				isDraftOp = true
			}
			pageAjax({'id': billsId}, function () {
				//复制一单
				if (copyFlag == 1) {
					copyBills()
				}
			})
		} else {
			//新增
			getDefaultValues()
		}

	}

	//载入菜单组件
	function initMenuBtn() {
		var option = {
			btnGroupLeft: {
				add: {
					isShow: true,
					click: function () {
						location.href = location.href.substring(0, location.href.indexOf('?'));
					}
				},
				draftSave: {
					isShow: true,
					click: function () {
						$('#dataGrid').saveCell(lastrow, lastcell)
						var data = getParams()
						//选择现金结算：与现在判断相同，即单据保存、过账时单据明细金额合计等于收（付）款金额且大于0（收付款明细金额大于等于0）
                        //选择欠款：表头收（付）款金额必须等于0，收（付款）明细金额和原来一样不变
						var payAmountSum=Number(data.payAmountSum)
						if(Number(data.settlementMode)==0){
							if(payAmountSum!=0){
                                $.zxsaas_plus.showalert("提示",  "选择欠款,收款金额必须等于0!");
                                return false;
							}
						}else{
                            if(payAmountSum<=0){
                                $.zxsaas_plus.showalert("提示",  "选择现金结算,收款金额大于0!");
                                return false;
                            }
						}
						$.ajaxPackage({
							contentType: 'application/json',
							url: '/manager/inventory/income/saveBill',
							data: JSON.stringify(data),
							success: function (data) {
								$.zxsaas_plus.showalert("success", data.desc || "保存成功！当前页面商品库存已锁！");
								var billsId = data.data.billsId;
								footerAdd = false
								setTimeout(function () {
									pageAjax({'id': billsId})
								}, 1500)

							}
						})
					}
				},
				draftPost: {
					isShow: true,
					click: function () {
						var mainIds = $.trim($('#billsHeaderForm input[name="id"]').val())
						if (billsStatus != '1' || mainIds == "") {
							$.zxsaas_plus.showalert("提示", '只能过账草稿单!');
						} else {
							$.ajaxPackage({
								type: 'post',
								url: '/manager/inventory/income/postBill',
								data: {'id': mainIds},
								success: function (data) {
									$.zxsaas_plus.showalert("success", data.desc || "过账成功");
									footerAdd = false
									setTimeout(function () {
										pageAjax({'id': mainIds})
									}, 1500)

								},
								error:function(data){
									footerAdd = false
									setTimeout(function () {
										pageAjax({'id': mainIds})
									}, 1500)

								}
							})
						}
					}
				},
				draftDel: {
					isShow: true,
					click: function () {
						var mainIds = $.trim($('#billsHeaderForm input[name="id"]').val())
						if (billsStatus != '1' || mainIds == "") {
							$.zxsaas_plus.showalert("提示", '只能删除草稿单!');
						} else {
							$.zxsaas_plus.showconfirm("提示", "是否删除此草稿单？", function () {
								$.ajaxPackage({
									type: 'get',
									url: '/manager/inventory/income/deteleBill',
									data: {'ids': mainIds},
									success: function (data) {
										$.zxsaas_plus.showalert("success", data.desc || "删除成功");
										location.href = location.href.substring(0, location.href.indexOf('?'));
										setTimeout(function () {
											location.reload()
										}, 1500)


										// pageAjax({'queryCodeStr': 'L', 'isDraftOp': true})
									}
								})
							});
						}
					}
				},
				red: {
					isShow: !isDraftOp,
					click: function () {
						var params = $("#billsHeaderForm").toJsonObject();
						var id = $.trim(params.id)
						var billsStatus = $.trim(params.billsStatus)
						var isAudit = $.trim(params.isAudit)
						if (billsStatus != '1' && id != "" && isAudit == 0) {
							$('#redModal').modal('show');
							getAuthList(function () {
								var min = CompareDate(_authList.minDate,params.billsDateString)?_authList.minDate:params.billsDateString;
								$('.redTime').datePlu({
									endDate: false,
									ifPermissions:false,
									minTime: min,
									defaultTime: min
								})
							})
						} else {
							$.zxsaas_plus.showalert('提示', "只能对已过账且未稽核单据红冲!");
						}
					}
				},
				// printDropdown:{
				// 	isShow: !isDraftOp,
				// 	list:[{
				// 		name:'串号明细',
				// 		click:function(){
				// 			print('default')
				// 		}
				// 	},{
				// 		name:'商品汇总（带串号）',
				// 		click:function(){
				// 			print('sumImei')
				// 		}
				// 	},{
				// 		name:'商品汇总',
				// 		click:function(){
				// 			print('sum')
				// 		}
				// 	}
				// 	]
				// },
				copy: {
					isShow: !isDraftOp,
					click: function () {
						copyBills()
					}
				},
				audit: {
					isShow: !isDraftOp,
					click: function () {
						var params = $("#billsHeaderForm").toJsonObject();
						var mainIds = $.trim(params.id)
						var billsStatus = $.trim(params.billsStatus)
						var isAudit = $.trim(params.isAudit)
						if (billsStatus != '1' && mainIds != "" && isAudit == 0) {
							$.ajax({
								url: '/manager/inventory/income/auditBill',
								type: 'post',
								traditional: true,
								dataType: 'json',
								data: {ids: mainIds},
								success: function (data) {
									if (data.result > 0) {
										$.zxsaas_plus.showalert('success', data.desc || "稽核成功");
										setTimeout(function () {
											pageAjax({id: mainIds})
										}, 1500)
									} else {
										$.zxsaas_plus.showalert('error', data.desc);
									}

								}
							})
						} else {
							$.zxsaas_plus.showalert('提示', '只能对正式且未稽核单据稽核!');
						}
					}
				},
				auditCancle: {
					isShow: !isDraftOp,
					click: function () {
						var params = $("#billsHeaderForm").toJsonObject();
						var mainIds = $.trim(params.id)
						var billsStatus = $.trim(params.billsStatus)
						var isAudit = $.trim(params.isAudit)
						if (billsStatus != '1' && mainIds != "" && isAudit == 1) {
							$.ajax({
								type: 'post',
								traditional: true,
								dataType: 'json',
								url: '/manager/inventory/income/unAuditBill',
								data: {'ids': mainIds},
								success: function (data) {
									$.zxsaas_plus.showalert('success', data.desc || "取消稽核成功");
									isDraftOp = false
									setTimeout(function () {
										pageAjax({id: mainIds})
									}, 1500)
								}
							})
						} else {
							$.zxsaas_plus.showalert('提示', '只能对已稽核单据取消稽核!');
						}
					}
				},
				update: {
					isShow: !isDraftOp,
					click: function () {
						var $grid = dataGrid.$grid;
						$grid.jqGrid("saveCell", lastrow, lastcell);
						//主表
						var params = $("#billsHeaderForm").toJsonObject();
						//明细数据
						var cashOthIncomeDetail = [];
						var List = dataGrid.getGridDataList();
						for (var i = 0; i < List.length; i++) {
							var item = List[i];
							cashOthIncomeDetail.push({
								id: item.id,
								remark: item.remark,
							})
						}
						var data = {
							id: params.id,
							remark: params.remark,
							cashOthIncomeDetail: cashOthIncomeDetail,
						};
						$.ajaxPackage({
							contentType: 'application/json',
							url: '/manager/inventory/income/updateRemark',
							data: JSON.stringify(data),
							success: function (data) {
								$.zxsaas_plus.showalert('success', data.desc || "修改备注成功！");
								isDraftOp = false
								setTimeout(function () {
									pageAjax({'id': params.id})
								}, 1500)
							}
						})
					}
				}
			},
			btnGroupRight: {
				history: {
					isShow: true,
					click: function () {
						window.parent.openWorkBoxByMenutext("收入单据列表", '/manager/inventory/income/incomeList', true);
					}
				}
			}
		};
		menuBtn = new componentMenuBtn("#MenuTool", option);

		//保存红冲按钮
		$(".redSave").on("click", function () {
			var params = $("#billsHeaderForm").toJsonObject();
			$.request({
				url: "/manager/inventory/income/redBill",
				dataType: "json",
				type: 'post',
				traditional: true,
				data: {
					id: params.id,
					redDate: $('.redTime').val()
				},
				success: function (data) {
					if (data.result == 1) {
						$.zxsaas_plus.showalert("success", data.desc || "红冲成功");
						setTimeout(function () {
							pageAjax({'id': params.id})
						}, 1500)
						$('#redModal').modal('hide');
					} else {
						$.zxsaas_plus.showalert("error", data.desc);
						$('#redModal').modal('show');
					}
				}
			});
		});

		//打印
		function print(tempKind) {
			var id = $("#billsHeaderForm input[name='id']").val();
			if (id == "") {
				$.zxsaas_plus.showalert("提示", "单据不存在");
				return
			}
			$.printBills('/manager/inventory/fund/supplier/reprice/printReprice',
				{
					'billsId': id,
					'tempKind': tempKind,
				}
			);
		}
	}

	// 初始化 顶部表单
	function initTopForm() {
		//单据日期
		$('#billsBeginDateStr').datePlu({
			ajaxOpt: {
				async: false,
			},
			endDate: false,
		});
		$('#billsHeaderForm input[name="settlementMode"]').click(function () {
			var $this=$(this)
            var  keys=$this.val()
			if(keys==0){
				$('#payAmountSum').val('0')
				var ids= $('#paymentGrid').getDataIDs();
                $.each(ids,function(index,rowid){
                    $('#paymentGrid').jqGrid("setCell",rowid,"payreceiptAmout",0);
                })
                sumPaymentGrid()
			}
			isShowPayAmountSum(keys)
        })

	}

    function isShowPayAmountSum(keys) {
        var span=$('#payAmountSum').parent().find('span')
        if(keys==0){
            span.hide()
        }else{
            span.show()
        }
    }



	// 初始化表格
	function initTable() {

        //获取收入类别
        $('#dataGridInpayType').comModalsInpayClass({
            type:-2,
            clickback:function () {
                var $Obj=$("#dataGridInpayType");
                var  selrow=$("#dataGrid").jqGrid('getGridParam','selrow');
                //设置编辑器值
                $("#dataGrid input[name='inpayClassName']").val($Obj.val());
                $("#dataGrid").jqGrid('setCell', selrow, "inpayClassId", $Obj.data('id'));
                $Obj.data('id','').val('')
            }
        });

		function my_input(value, options) {
			var customHtml;
			switch (options.name) {

				case 'sectionName' :
					customHtml = '<div class="input-group"><input type="text" class="form-control inpaySectionName"></div>'
					break;
				case 'managersName'    :
					customHtml = '<div class="input-group"><input type="text" class="form-control inpayManagersName"></div>'
					break;
				// <span class="input-group-btn showModalBtn" onclick="'+showInpaySection()+'"><button class="btn btn-default" type="button"><span class="glyphicon glyphicon-option-horizontal"></span></button></span>
			}

			return $(customHtml);
		}

		function sectionName(value) {
			return value.find('input').val();
		}

		//配置
		var paras = {
			gridId: 'dataGrid',
			colNames: ['<i class="bitianX">*</i>类别名称', '收入类别id', '<i class="bitianX">*</i>收入归集部门', '收入归集部门id', '<i class="bitianX">*</i>经手人', '经手人id', '<i class="bitianX">*</i>金额', '备注','id'],
			colModel: [
				{
					name: 'inpayClassName', index: 'inpayClass', width: 100, editable: true,
                    edittype: 'custom_bt_input',
                    custom_element_bt_click: "selectStorageReferenceOpen",
				},
				{name: 'inpayClassId', width: 150, align: 'center', hidden: true},
				{
					name: 'sectionName', width: 150, align: 'left', editable: true, edittype: 'custom',
					editoptions: {
						custom_element: my_input,
						custom_value: sectionName
					}
				},
				{name: 'sectionId', width: 150, align: 'center', hidden: true},
				{
					name: 'managersName', width: 150, align: 'left', editable: true, edittype: 'custom',
					editoptions: {
						custom_element: my_input,
						custom_value: sectionName
					}
				},
				{name: 'managersUid', width: 150, align: 'center', hidden: true},
				{
					name: 'amount',
					width: 150,
					align: 'right',
					editable: true,
					editrules: {number: true},
					formatter: 'number',
					editoptions: {
						dataEvents: [{
							type: "focus",
							fn: function () {
								this.select()
							}
						}, {
							type: "blur",
							fn: function () {
								$('#dataGrid').saveCell(lastrow, lastcell)
							}
						}]
					}
				},
				{
					name: 'remark', width: 150, align: 'left', editable: true, editoptions: {
					dataEvents: [{
						type: "focus",
						fn: function () {
							this.select()
						}
					}, {
						type: "blur",
						fn: function () {
							$('#dataGrid').saveCell(lastrow, lastcell)
						}
					}]
				}
				},
				{name: 'id', width: 150, align: 'center', hidden: true},
			],
			autowidth: true,
			height: $(window).height() * 0.5,
			shrinkToFit: true,
		};
		//回调函数
		var callBackList = {

			onCellSelect: function (rowid, iCol, cellcontent, e) {
				var currRow = $("#dataGrid").jqGrid('getRowData', rowid);
				if (iCol == 3 && currRow.goodsId != "") {
					openImeiInputModal("dataGrid", rowid);//打开输入框
				}
			},
			afterEditCell: function (rowid, name, val, iRow, iCol) {//开始编辑
				lastrow = iRow;
				lastcell = iCol;
				rowid = rowid * 1

				if (iCol == '4') {
					$('.inpaySectionName').modalsbox({
						grid: {
							id: 'sectionInpay',
							url: basePath + "/component/section/getAccessSectionVoPageList",
							param: {}
						},
						tree: {
							id: 'sectionInpayNameTree',
							url: basePath + "/component/section/getAccessSectionTreeNodeVoList",
							param: {}
						},
						// multiselect: false,
						placeholder: '收款归集部门',
						callback: function (data) {

							$.each(data, function (k, v) {
								footerAdd = false
								//设置当前行的值
								$('#dataGrid').saveCell(lastrow + k, lastcell)
								$('#dataGrid').setCell(rowid + k, 'sectionName', v.name)
								$('#dataGrid').setCell(rowid + k, 'sectionId', v.dataId)
								$('#dataGrid').setCell(rowid + k, 'managersUid', ' ')
								$('#dataGrid').setCell(rowid + k, 'managersName', ' ')
								$('#dataGrid').setCell(rowid + k, 'inpayClassName', $('#dataGrid').getCell(rowid, 'inpayClassName'))
								$('#dataGrid').setCell(rowid + k, 'inpayClassId', $('#dataGrid').getCell(rowid, 'inpayClassId'))
								//判断是不是最后一条数据
								if (k != data.length - 1) {
									//判断下一行是不是最后一行
									if (!$('#dataGrid').getCell(rowid + k + 1, 'sectionId')) {
										dataGrid.$grid.jqGrid('addRowData', rowid + k + 1, {}, 'after', rowid + k);
									} else {
										//不是最后一行，判断下一行有没有数据
										if ($('#dataGrid').getCell(rowid + k + 1, 'sectionId') != '') {
											dataGrid.$grid.jqGrid('addRowData', rowid + k + 1, {}, 'after', rowid + k);
										}
									}
								} else {
									//最后一条数据，更改底部添加模式
									$('.modal-backdrop').hide()
									footerAdd = true
								}
								//添加一行后，将这一行后的行id全部重置一次
								var ids = $("#dataGrid").jqGrid('getDataIDs')
								if (lastrow + k < ids.length - 1) {
									var j = i = parseInt(rowid + k) + 1;
									$('#dataGrid tr').eq(i).nextAll().not('#dataGrid_addRowId').each(function () {
										j++;
										$(this).attr("id", j);
										$(this).find('a').attr('id','dataGrid,'+j)
										$(this).find('a').attr('onclick','javascript: MyEiditGrid.delClickRow("dataGrid",'+j+');')
									});
								}


							})

						}
					})

					$('.inpaySectionName').val(val)
				}
				if (iCol == '6') {
					if ($('#dataGrid').getCell(rowid, 'sectionId')) {
						$('.inpayManagersName').modalsbox({
							grid: {
								id: 'operator23',
								url: basePath + "/component/employee/getEmployeeVoPageList",
								param: {
									'sectionIds': $('#dataGrid').getCell(rowid, 'sectionId')
								}
							},
							multiselect: false,
							placeholder: '经手人',
							callback: function (data) {
								$('#dataGrid').saveCell(lastrow, lastcell)
								$('#dataGrid').setCell(rowid, 'managersUid', data.dataId)
							}
						})
						$('.inpayManagersName').val(val)
					} else {
						$.zxsaas_plus.showalert('warning', '请先选择收款归集部门')
						$('#dataGrid').saveCell(lastrow, lastcell)
					}
				}
			},
			afterSaveCell: function (rowid, name, val, iRow, iCol) {//保存编辑
				lastrow = iRow;
				lastcell = iCol;
				var accountAmount = $('#dataGrid').getCol('amount', false, 'sum');

				$('#dataGrid').footerData("set", {
					"amount": '<font color="red" >' + Number(accountAmount).toFixed(2) + '</font>',
				}, false);
			},
			summary: function (rowid, name, val, iRow, iCol) {//统计处理
				gridSum()
			},
			getGridDataList: function (rows) {
				delete rows["op"];
				return rows;
			},
			afterInsertRow: function (rowid, rowdata) {
				if (rowid > 1 && footerAdd) {
					var info = $('#dataGrid').getRowData(rowid - 1)
					$('#dataGrid').setRowData(rowid, {
						'inpayClassName': info.inpayClassName,
						'inpayClassId': info.inpayClassId,
						'sectionName': info.sectionName,
						'sectionId': info.sectionId,
						'managersName': info.managersName,
						'managersUid': info.managersUid,

					})
				}

			},
			loadComplete: function (data) {

				$('.footrow td:first-child').html('合计');
				$(".ui-jqgrid-sdiv").show();
				var accountAmount = $('#dataGrid').getCol('amount', false, 'sum');
				$('#dataGrid').footerData("set", {
					"amount": '<font color="red" >' + Number(accountAmount).toFixed(2) + '</font>',
				}, false);

			},
			deleteCallBack:function(info){
				var accountAmount = $('#dataGrid').getCol('amount', false, 'sum');
				$('#dataGrid').footerData("set", {
					"amount": '<font color="red" >' + Number(accountAmount).toFixed(2) + '</font>',
				}, false);

			}
		};
		dataGrid = new MyEiditGrid(paras, callBackList);
		dataGrid.addKongRow()

	}

	//初始化收款金额账户表格
	function initpaymentGrid(sectionId, payreceiptDetailList) {

		$.jgrid.defaults.width = 1280;
		$.jgrid.defaults.responsive = true;
		$.jgrid.defaults.styleUI = 'Bootstrap';
		var colNames = ['账户类别', '账户名称', '金额', '备注', "资金账户id", "资金账户类型code"];
		var JqGridColModel = [
			{
				name: 'accountTypeName',
				index: 'account_id',
				width: 200,
				align: 'center',
				sorttype: 'string',
				sortable: false
			},
			{name: 'name', index: 'name', width: 200, align: 'center', sorttype: 'integer', sortable: false},
			{
				name: 'payreceiptAmout',
				index: 'payreceiptAmout',
				width: 200,
				align: 'center',
				sorttype: 'Long',
				formatter: "number",
				editable: true,
				editoptions: {
					dataEvents: [{
						type: "focus",
						fn: function () {
							this.select()
						}
					}, {
						type: "blur",
						fn: function () {
							$('#paymentGrid').saveCell(lastrow, lastcell)
							checkInput.checkNum(this, 12);
						}
					},
					]
				},
				sortable: false
			},
			{
				name: 'remark',
				index: 'remark',
				width: 200,
				align: 'center',
				sorttype: 'string',
				editable: true,
				editoptions: {
					dataEvents: [{
						type: "focus",
						fn: function () {
							this.select()
						}
					}, {
						type: "blur",
						fn: function () {
							$('#paymentGrid').saveCell(lastrow, lastcell)
							checkInput.clearNoText(this, 100)
						}
					},
					]
				},
				sortable: false
			},
			{name: 'dataId', index: 'dataId', width: 15, align: 'center', hidden: true, sortable: false},
			{name: 'accountType', index: 'accountType', width: 15, align: 'center', hidden: true, sortable: false}
		];
		loadtable();

		function loadtable() {
			$('#paymentGrid').jqGrid({
				url: '/manager/component/account/getAccountVoPageList',
				postData: {
					sectionIds: sectionId,
					isContainPay: 0
				},
				mtype: "GET",
				datatype: "json",
				jsonReader: {
					root: "data.dataList",
					page: "data.page",
					total: "data.total",
					records: "data.records",
					repeatitems: false
				},
                rowNum:10000,
				colNames: colNames,
				colModel: JqGridColModel,
				sortable: false,
				rownumbers: true,
				cellsubmit: 'clientArray',//单元格保存内容的位置
				editurl: 'clientArray',
				viewrecords: true,
				cellEdit: true,
				width: "90%",
				height: $(window).height() * 0.5,
				autowidth: true,
				rownumWidth: 50,
				shrinkToFit: false,
				footerrow: true,  //设置表格显示表脚
				userDataOnFooter: true,//设置userData 显示在footer里
				loadComplete: function (data) {

					$('.footrow td:first-child').html('合计');
					$(".ui-jqgrid-sdiv").show();

					$.each(payreceiptDetailList, function (k, v) {
						var dataId = $('#paymentGrid').getCol('dataId')
						var index = dataId.indexOf(v.accountId + '')
						$('#paymentGrid').setCell(index + 1, 'payreceiptAmout', v.payreceiptAmout)
						$('#paymentGrid').setCell(index + 1, 'remark', v.remark)
					})
					var payreceiptAmout = $('#paymentGrid').getCol('payreceiptAmout', false, 'sum');
					$('#paymentGrid').footerData("set", {
						"payreceiptAmout": '<font color="red" >' + Number(payreceiptAmout).toFixed(2) + '</font>',
					}, false);
					$('#paymentGrid').resize()
				},
				afterSaveCell: function (rowid, name, val, iRow, iCol) {//保存编辑
                    sumPaymentGrid()
				},
				afterEditCell: function (rowid, name, val, iRow, iCol) {//开始编辑
					lastrow = iRow;
					lastcell = iCol;
				}
			})
		}
	}

	function sumPaymentGrid(){
        var payreceiptAmout = $('#paymentGrid').getCol('payreceiptAmout', false, 'sum');
        $('#paymentGrid').footerData("set", {
            "payreceiptAmout": '<font color="red" >' + Number(payreceiptAmout).toFixed(2) + '</font>',
        }, false);
	}

	//收款金额点击操作
	$('.inpayMoneySave').click(function () {
		$('#paymentGrid').saveCell(lastrow, lastcell)
		var payreceiptAmout = $('#paymentGrid').getCol('payreceiptAmout', false, 'sum');
		$('#payAmountSum').val(Number(payreceiptAmout).toFixed(2))
		$('#paymentGrid').resize()
		$('#inpayMoneyModal').modal('hide');
	})
	$('.showMoneyModalBtn').click(function () {
		$('#dataGrid').jqGrid("saveCell", lastrow, lastcell);
	})

	// 初始化快捷分配表格
	function initAllotTable() {
		function my_input(value, options) {
			var customHtml;
			switch (options.name) {
				case 'sectionName' :
					customHtml = '<div class="input-group"><input type="text" class="form-control allotSectionName"></div>'
					break;
				case 'managersName'    :
					customHtml = '<div class="input-group"><input type="text" class="form-control allotManagersName"></div>'
					break;
			}
			return $(customHtml);
		}

		function sectionName(value) {
			return value.find('input').val();
		}

        $('#inpayType').comModalsInpayClass({
            type:-2,
            clickback:function () {
                var obj= $("input[name='inpayType']");
                //设置编辑器值
                $("input[name='inpayType']").val(obj.val());
                $("input[name='inpayTypeId']").val(obj.data('id'));
            }
        });
		//配置
		var paras = {
			gridId: 'allotGrid',
			colNames: ['部门名称', '部门id', '经手人', '经手人id', '分配比例(%)', '分配金额', '备注'],
			colModel: [
				{
					name: 'sectionName', width: 150, align: 'left', editable: true, edittype: 'custom',
					editoptions: {
						custom_element: my_input,
						custom_value: sectionName
					}
				},
				{name: 'sectionId', width: 150, align: 'center', hidden: true},
				{
					name: 'managersName', width: 150, align: 'center', editable: true, edittype: 'custom',
					editoptions: {
						custom_element: my_input,
						custom_value: sectionName
					}
				},
				{name: 'managersUid', width: 150, align: 'center', hidden: true},
				{
					name: 'allotScale',
					width: 150,
					align: 'right',
					editable: false,
					hidden: true,
					editrules: {number: true},
					formatter: 'number',
					editoptions: {
						dataEvents: [{
							type: "focus",
							fn: function () {
								this.select()
							}
						}, {
							type: "blur",
							fn: function () {
								$('#allotGrid').saveCell(lastrow, lastcell)
							}
						}]
					}
				},
				{
					name: 'allotMoney', width: 150, align: 'right', editable: true,
					editrules: {number: true},
					formatter: 'number',
					editoptions: {
						dataEvents: [{
							type: "focus",
							fn: function () {
								this.select()
							}
						}, {
							type: "blur",
							fn: function (e) {
								if (e.target.value * 1 >= 0) {
								} else {
									$('#allotGrid').setCell(lastrow, 'allotMoney', '0.00')
								}
								$('#allotGrid').saveCell(lastrow, lastcell)

							}
						}]
					}
				},
				{
					name: 'remark', width: 150, align: 'left', editable: true, editoptions: {
					dataEvents: [{
						type: "blur",
						fn: function () {
							$('#allotGrid').saveCell(lastrow, lastcell)
						}
					}]
				}
				},
			],
			autowidth: true,
			height: $(window).height() * 0.6,
			shrinkToFit: true,
		};
		//回调函数
		var callBackList = {
			afterEditCell: function (rowid, name, val, iRow, iCol) {//开始编辑
				lastrow = iRow;
				lastcell = iCol;

				if (iCol == '2') {
					$('.allotSectionName').modalsbox({
						grid: {
							id: 'sectionAllot',
							url: basePath + "/component/section/getAccessSectionVoPageList",
							param: {}
						},
						tree: {
							id: 'sectionAllotNameTree',
							url: basePath + "/component/section/getAccessSectionTreeNodeVoList",
							param: {}
						},
						multiselect: false,
						placeholder: '收款归集部门',
						callback: function (data) {
							$('#allotGrid').saveCell(lastrow, lastcell)
							$('#allotGrid').setCell(rowid, 'sectionId', data.dataId)
							$('#allotGrid').setCell(rowid, 'managersUid', ' ')
							$('#allotGrid').setCell(rowid, 'managersName', ' ')
						}
					})
					$('.allotSectionName').val(val)
				}
				if (iCol == '4') {
					if ($('#allotGrid').getCell(rowid, 'sectionId')) {
						$('.allotManagersName').modalsbox({
							grid: {
								id: 'operator23',
								url: basePath + "/component/employee/getEmployeeVoPageList",
								param: {
									'sectionIds': $('#allotGrid').getCell(rowid, 'sectionId')
								}
							},
							multiselect: false,
							placeholder: '经手人',
							callback: function (data) {
								$('#allotGrid').saveCell(lastrow, lastcell)
								$('#allotGrid').setCell(rowid, 'managersUid', data.dataId)
							}
						})
						$('.allotManagersName').val(val)
					} else {
						$.zxsaas_plus.showalert('warning', '请先选择部门')
						$('#allotGrid').saveCell(lastrow, lastcell)
					}
				}
			},
			afterSaveCell: function (rowid, name, val, iRow, iCol) {//保存编辑
				lastrow = iRow;
				lastcell = iCol;
				var allotMoney = $('#allotGrid').getCol('allotMoney', false, 'sum').toFixed(2);
				var allotScale = $('#allotGrid').getCol('allotScale', false, 'sum');
				$('#allotGrid').footerData("set", {
					"allotMoney": '<font color="red" >' + Number(allotMoney).toFixed(2) + '</font>',
					"allotScale": '<font color="red" >' + Number(allotScale).toFixed(2) + '</font>',
				}, false);

				if (iCol == 6) {
					if (val * 1 < 0) {
						$('#allotGrid').setCell(lastrow, 'allotScale', '0.00')
					}
				}
				if (iCol == 7) {
					if (val * 1 >= 0) {
						$('#waitAllotMoney').val(allotMoney)
					} else {
						$('#allotGrid').setCell(lastrow, 'allotMoney', '0.00')
					}
				}
			},
			summary: function (rowid, name, val, iRow, iCol) {//统计处理
				gridSum()
			},
			getGridDataList: function (rows) {
				delete rows["op"];
				return rows;
			},
			loadComplete: function (data) {

				$('.footrow td:first-child').html('合计');
				$(".ui-jqgrid-sdiv").show();
				var allotMoney = $('#allotGrid').getCol('allotMoney', false, 'sum');
				var allotScale = $('#allotGrid').getCol('allotScale', false, 'sum');
				$('#allotGrid').footerData("set", {
					"allotMoney": '<font color="red" >' + Number(allotMoney).toFixed(2) + '</font>',
					"allotScale": '<font color="red" >' + Number(allotScale).toFixed(2) + '</font>',
				}, false);

			},
			afterInsertRow: function (rowid, rowdata) {
				// if (rowid > 1) {
				// 	var info = $('#allotGrid').getRowData(rowid - 1)
				// 	$('#allotGrid').setCell(rowid, 'section', info.section)
				// 	$('#allotGrid').setCell(rowid, 'sectionId', info.sectionId)
				// 	$('#allotGrid').setCell(rowid, 'managers', info.managers)
				// 	$('#allotGrid').setCell(rowid, 'managersUid', info.managersUid)
				//
				// }
			},
			deleteCallBack:function(info){
				var allotMoney = $('#allotGrid').getCol('allotMoney', false, 'sum');
				var allotScale = $('#allotGrid').getCol('allotScale', false, 'sum');
				$('#allotGrid').footerData("set", {
					"allotMoney": '<font color="red" >' + Number(allotMoney).toFixed(2) + '</font>',
					"allotScale": '<font color="red" >' + Number(allotScale).toFixed(2) + '</font>',
				}, false);

			}
		};
		allotGrid = new MyEiditGrid(paras, callBackList);
		allotGrid.addKongRow()

	}

	//快捷分配按钮点击
	$('.quickAllot').click(function () {
		$('#allotGrid').resize()
		$('#quickAllotModal').modal('show')
		$('#allotGrid').clearGridData()
		$('#allotGrid').trigger('reloadGrid')
		$('#waitAllotMoney').val('')
		$('#inpayType').html('')
		allotGrid.addKongRow()
	})
	//点击添加部门
	$('.addSectionBtn').click(function () {
		$('#addSection').parent().find('.showModalBtn').trigger('click')
		$('#allotGrid').saveCell(lastrow, lastcell)
		$('#sectionAdd').trigger('reloadGrid')
	})
	//切换分配方式
	$('input[name="wrongState"]').change(function (e) {
		$('#allotGrid').resize()
		if (e.target.value == 0) {
			$('#allotGrid').hideCol("allotScale")
			$('#allotGrid').setCell("allotScale", ' ')
		} else {
			$('#allotGrid').setColProp("allotScale", {editable: true})
			$('#allotGrid').showCol("allotScale")
		}
	})
	//分配事件
	$('.allotBtn').click(function () {
		var waitAllotMoney = $('#waitAllotMoney').val().trim() * 1
		if (waitAllotMoney != '' && waitAllotMoney > 0) {
			if ($('input:radio:checked').val() == '0') {
				///平均分配
				var ids = $('#allotGrid').getDataIDs()
				if (ids.length > 0) {
					//获取两位平均值
					var averageMoney = Math.floor(accDiv(waitAllotMoney, ids.length) * 100) / 100
					//计算出最后一行的值
					var lastAverageMoney = accSubtr(waitAllotMoney, accMul(averageMoney, ids.length - 1) )
					$.each(ids, function (k, v) {
						$('#allotGrid').setCell(v, 'allotMoney', averageMoney)
						if (k == ids.length - 1) {
							$('#allotGrid').setCell(v, 'allotMoney', lastAverageMoney)
						}
					})
					var allotMoney = $('#allotGrid').getCol('allotMoney', false, 'sum');
					var allotScale = $('#allotGrid').getCol('allotScale', false, 'sum');
					$('#allotGrid').footerData("set", {
						"allotMoney": '<font color="red" >' + Number(allotMoney).toFixed(2) + '</font>',
						"allotScale": '<font color="red" >' + Number(allotScale).toFixed(2) + '</font>',
					}, false);
				}
			} else {
				//按比例分配
				if (Number($('#allotGrid').getCol('allotScale', false, 'sum')).toFixed(2) == 100) {
					//获取两位平均值
					var newWaitAllotMoney = waitAllotMoney
					var ids = $('#allotGrid').getDataIDs()
					$.each(ids, function (k, v) {
						//获取到当行的分配比例
						if (k == ids.length - 1) {
							$('#allotGrid').setCell(v, 'allotMoney', newWaitAllotMoney)
						} else {
							var allotScale = $('#allotGrid').getCell(v, 'allotScale')
							$('#allotGrid').setCell(v, 'allotMoney', Math.floor(accMul(waitAllotMoney, accMul(allotScale, 0.01)) * 100) / 100)
							newWaitAllotMoney -= Math.floor(accMul(waitAllotMoney, accMul(allotScale, 0.01)) * 100) / 100
						}
					})
					var allotMoney = $('#allotGrid').getCol('allotMoney', false, 'sum');
					var allotScale = $('#allotGrid').getCol('allotScale', false, 'sum');
					$('#allotGrid').footerData("set", {
						"allotMoney": '<font color="red" >' + Number(allotMoney).toFixed(2) + '</font>',
						"allotScale": '<font color="red" >' + Number(allotScale).toFixed(2) + '</font>',
					}, false);
				} else {
					$.zxsaas_plus.showalert('warning', '分配比例合计需为100%')
				}
			}
		} else {
			$.zxsaas_plus.showalert('warning', '请输入待分配金额')
		}

	})
	//分配确定
	$('.allotSave').click(function () {
		var allotMoney = $('#allotGrid').getCol('allotMoney', false, 'sum');
		if (allotMoney == 0) {
			$.zxsaas_plus.showalert('warning', '无分配金额')
			return
		}
		footerAdd = false
		var data = $('#allotGrid').getRowData()
		$.each(data, function (k, v) {
			if (v.allotMoney > 0) {
				dataGrid.kongRow = {
					inpayClassName: $('#inpayType').val(),
					inpayClassId: $("input[name='inpayTypeId']").val(),
					sectionName: v.sectionName,
					sectionId: v.sectionId,
					managersName: v.managersName,
					managersUid: v.managersUid,
					amount: v.allotMoney,
					remark: v.remark,
				}
				dataGrid.addKongRow()
			}
		})

		dataGrid.kongRow = {}
		$('#quickAllotModal').modal('hide')
		gridSum()
	})

	$('#dataGrid_addRowId').click(function () {
		footerAdd = true
	})

	//添加空行
	function kongRow() {
		var $grid = dataGrid.$grid;
		$grid.delRowData('dataGrid_addRowId');
		dataGrid.addKongRow();
		$grid.delRowData(MyEiditGrid.getMaxRowid($grid));
		gridSum()
	}

	//合计
	function gridSum() {
		var $grid = dataGrid.$grid;
		// 汇总
		var amount = $grid.getCol('amount', false, 'sum').toFixed(2);
		$grid.footerData("set", {
			amount: amount,
		});
	}

	//获取默认值
	function getDefaultValues() {
		var obj = {
			success: function (data) {
				var deSe = data.data.defaultSection;
				var deEm = data.data.defaultEmployee;
				var deSt = data.data.defaultStorage;
				var deCn = data.data.zjwlDefaultUnit ? data.data.zjwlDefaultUnit : ''
				$('#sectionName').val(deSe.name).data('id', deSe.sectionId)
				$('#contactsunitName').val(deCn.name).data('id', deCn.id)
				initpaymentGrid(deSe.sectionId)
				if (deSe.sectionId) {
					//收款人
					$("#managerName").modalsbox({
						grid: {
							id: 'operator',
							url: basePath + "/component/employee/getEmployeeVoPageList",
							param: {
								'sectionIds': deSe.sectionId
							}
						},
						multiselect: false,
						placeholder: '收款人',
					})
				}
				$('#managerName').val(deEm.name).data('id', deEm.employeeId)

			}
		}
		InterfaceInventory.common.getDefaultValues(obj);
	}

	//获取保存参数
	function getParams() {
		var $grid = dataGrid.$grid;
		$grid.jqGrid("saveCell", lastrow, lastcell);
		//主表
		var params = $("#billsHeaderForm").toJsonObject();
		params.contactsunitId = $('#contactsunitName').data('id')
		params.sectionId = $('#sectionName').data('id')
		params.managersUid = $('#managerName').data('id')
		params.payAmountSum = params.payAmountSum * 1
		//明细数据
		var List = dataGrid.getGridDataList();
		params.cashOthIncomeDetail = List
		var ids = $('#paymentGrid').getDataIDs()
		var payreceiptDetail = []
		$.each(ids, function (k, v) {
			var info = $('#paymentGrid').getRowData(v)
			payreceiptDetail.push(info)
		})
		params.payreceiptDetailList = []
		$.each(payreceiptDetail, function (k, v) {
			if (v.payreceiptAmout * 1 != 0 || v.remark != '') {
				params.payreceiptDetailList.push({
					accountId: v.dataId,
					payreceiptAmout: v.payreceiptAmout * 1,
					remark: v.remark
				})
			}

		})
		return params
	}

	//分页查询ajax请求
	function pageAjax(param, callbackObj) {
		$.ajaxPackage({
			type: 'post',
			dataType: 'json',
			url: '/manager/inventory/income/loadBill',
			data: param,
			success: function (data) {
				if (data.result == 1) {
					var mainVo = data.data.data;
					clearAllData()

					if (mainVo != null) {
						footerAdd = false
						fillTopData(mainVo)
						fillTable(mainVo.cashOthIncomeDetail || [])
						checkBillsStatus(mainVo)
						reloadMenuBtn()
					} else {
						$.zxsaas_plus.showalert("提示", "没有查询到单据!");
					}
					if (callbackObj) {
						callbackObj(data)
					}
					footerAdd = true
				}
			}
		})
	}

	//重载菜单组件
	function reloadMenuBtn() {
		var updateKey = ['printDropdown', 'red', 'copy', 'update', 'audit', 'auditCancle'];
		var addkey = ['draftPost', 'draftDel', 'draftSave'];
		var params = $("#billsHeaderForm").toJsonObject();
		var billsStatus = $.trim(params.billsStatus)
		var isAudit = $.trim(params.isAudit)
		if (isDraftOp == false) {
			menuBtn.setShow(updateKey);
			menuBtn.setHide(addkey);
		} else {
			menuBtn.setHide(updateKey);
			menuBtn.setShow(addkey);
		}

		//判断是否禁用 红冲
		if (isDraftOp == false && billsStatus == 7 ) {
			menuBtn.setDisabledbtn("red");
		} else {
			menuBtn.setUndisabledbtn("red");
		}
		//判断是否禁用 复制
		if (isDraftOp == false) {
			//单据：稽核状态
			if (isAudit == 1) {
				//启用：取消稽核，禁用：稽核
				menuBtn.setDisabledbtn("audit");
				menuBtn.setUndisabledbtn("auditCancle");
			} else {
				//启用：稽核，禁用：取消稽核
				menuBtn.setUndisabledbtn("audit");
				menuBtn.setDisabledbtn("auditCancle");
			}



		} else {
			menuBtn.setUndisabledbtn("audit");
			menuBtn.setUndisabledbtn("auditCancle");
		}


	}

	////清空数据
	function clearAllData() {
		dataGrid.$grid.jqGrid('clearGridData');
		$("#billsHeaderForm")[0].reset();
	}

	//填充表头（主信息数据）
	function fillTopData(billsHeader) {
		$("#billsHeaderForm").writeJson2Dom(billsHeader);
		$("#managerName").parent().find('.modal').remove()
		$("#managerName").modalsbox({
			grid: {
				id: 'operator',
				url: basePath + "/component/employee/getEmployeeVoPageList",
				param: {
					'sectionIds':  billsHeader.sectionId
				}
			},
			multiselect: false,
			placeholder: '付款人',
		})

		$("#contactsunitName").data('id', billsHeader.contactsunitId)
		$("#sectionName").data('id', billsHeader.sectionId)
		$("#managerName").data('id', billsHeader.managersUid)

        isShowPayAmountSum(billsHeader.payAmountSum)

		initpaymentGrid(billsHeader.sectionId, billsHeader.payreceiptDetailList)

		$("#bottomForm").writeJson2Dom(billsHeader);
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

	var isDraftOp = true;

	//检查单据状态
	function checkBillsStatus(mainVo) {
		//1 草稿 6 过账 7 红冲
		var billsStatus = mainVo.billsStatus
		var isAudit = mainVo.isAudit
		if (billsStatus == 1) {
			isDraftOp = true;
			$('.rightMap img').removeAttr("src");
			dataGrid.addKongRow();
			dataGrid.$grid.delRowData(MyEiditGrid.getMaxRowid(dataGrid.$grid));
		} else {
			isDraftOp = false;
			if (billsStatus == 6) {
				$('.rightMap img:eq(0)').attr('src', '/manager/images/guozhang.png');
				// dataGrid.$grid.setGridParam({cellEdit: false});
			} else if (billsStatus == 7) {
				$('.rightMap img:eq(0)').attr('src', '/manager/images/status/statusRed.png');
			}
			if (isAudit == 1) {
				$('.rightMap img:eq(1)').attr('src', '/manager/images/audit.png');
			} else {
				$('.rightMap img:eq(1)').attr('src', '/manager/images/auditNo.png');
			}
		}
        loadBillsStatusByIsDraftOp()
	}

	//根据 单据类型 显示，隐藏 按钮
	function loadBillsStatusByIsDraftOp() {
		var importWrap = $('.importWrap');
		var billsCodeWrap = $('#billsCodeWrap');
		var button = $("#billsHeaderForm :button");
		var radio = $("#billsHeaderForm input[type='radio']");
		var rightMap = $(".rightMap");

		//是否是草稿单
		if (isDraftOp == true) {
            radio.attr('disabled',false)
			$('#billsBeginDateStr').css('pointer-events', 'auto')
			$('.quickAllot').show()
			importWrap.show()
			button.show()
			billsCodeWrap.hide()
			rightMap.hide()
			dataGrid.$grid.setGridParam().showCol("op");
			dataGrid.$grid.setColProp("inpayClassName", {editable: true});
			dataGrid.$grid.setColProp("sectionName", {editable: true});
			dataGrid.$grid.setColProp("managersName", {editable: true});
			dataGrid.$grid.setColProp("amount", {editable: true});
			dataGrid.$grid.setColProp("remark", {editable: true});
			$('#paymentGrid').setColProp("payreceiptAmout", {editable: true})
			$('#paymentGrid').setColProp("remark", {editable: true})
            dataGrid.addKongRow();
            dataGrid.$grid.delRowData(MyEiditGrid.getMaxRowid(dataGrid.$grid));
		}
		else {
            radio.attr('disabled',true)
			$('#billsBeginDateStr').css('pointer-events', 'none')
			$('.quickAllot').hide()
			importWrap.hide()
			button.hide()
			billsCodeWrap.show()
			rightMap.show()
			$('#payAmountSum').parent().find('.btn').show()
			$('#paymentGrid').setColProp("payreceiptAmout", {editable: false})
			$('#paymentGrid').setColProp("remark", {editable: false})
			dataGrid.$grid.setGridParam().hideCol("op");
			dataGrid.$grid.setColProp("inpayClassName", {editable: false});
			dataGrid.$grid.setColProp("sectionName", {editable: false});
			dataGrid.$grid.setColProp("managersName", {editable: false});
			dataGrid.$grid.setColProp("amount", {editable: false});
			dataGrid.$grid.setColProp("remark", {editable: true});
		}
	}

	//复制一单
	function copyBills() {
		isDraftOp = true
		$('#billsHeaderForm input[name="billsStatus"]').val('')
		loadBillsStatusByIsDraftOp()
		reloadMenuBtn()
		//清空底部信息
		$('#bottomForm')[0].reset()
		$("#billsHeaderForm input[name='id']").val('')
		$("#billsHeaderForm input[name='billsCode']").val('')
	}
})

//打开收入类别引用对话框
function selectStorageReferenceOpen(cellInfo) {
    $('#dataGridInpayType').next(".showModalBtn").trigger('click')
}

