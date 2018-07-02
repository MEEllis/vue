var projectId
var alignArr = ['', 'left', 'center', 'right'];
$(function () {
    init()

    //载入菜单组件
    function initMenuBtn(){

        var GridToolOption = {
            btnGroupLeft: {
				ColumnSettings:{
					isShow: true,
					click:function(){
						$('#lineSet-modal').modal('show');
						$("#lineSetGrid").jqGrid('setGridParam', {
							url:'/manager/erp/projectAndColumn/getColumns',
							postData: {
								'rpMainId':  projectId
							}
						}).trigger("reloadGrid");
					}
				},
                export: {
                    isShow: true,
                    click: function () {
                        var options=getSearchParam();
                        options.projectId=projectId
                        functionObjExtent.construtForm('/manager/inventory/income/export', options)
                    }
                },
				add: {
					isShow: true,
					click: function () {
						window.parent.openWorkBoxByMenutext("收入单", '/manager/inventory/income/incomeBill', true);
					}
				},
                draftDel: {
                    isShow: true,
                    click: function () {
                        var selRowId = $("#rpGrid").jqGrid('getGridParam','selarrrow');
                        if(selRowId.length<1){
                            $.zxsaas_plus.showalert('提示', "请勾选数据!");
                            return false;
                        }
						$.ajax({
							url:'/manager/inventory/income/deteleBill',
							type:'post',
							traditional: true,
							dataType:'json',
							data:{ids:selRowId},
							success:function (data) {
								if(data.result > 0){
									$.zxsaas_plus.showalert('success',data.desc || "删除成功");
									setTimeout(function(){selTable()},1500)
								}else{
									$.zxsaas_plus.showalert('error',data.desc );
								}

							}
						})
                    }
                },
                draftPost: {
                    isShow: true,
                    click: function () {
                        var selRowId = $("#rpGrid").jqGrid('getGridParam','selarrrow');
                        if(selRowId.length<1){
                            $.zxsaas_plus.showalert('提示', "请勾选数据!");
                            return false;
                        }

						if(selRowId.length > 1){
							$.zxsaas_plus.showalert('提示', "一次只能过账一条数据");
							return false;
						}
                        $.ajax({
                            url:'/manager/inventory/income/postBill',
							type:'post',
							traditional: true,
							dataType:'json',
                            data:{id:selRowId},
                            success:function (data) {
                            	if(data.result > 0){
									$.zxsaas_plus.showalert('success',data.desc || "过账成功");
									setTimeout(function(){selTable()},1500)
								}else{
									$.zxsaas_plus.showalert('error',data.desc);
								}

                            }
                        })
                    }
                },
                red: {
                    isShow: true,
                    click: function () {
                        var selRowId = $("#rpGrid").jqGrid('getGridParam','selarrrow');
                        if(selRowId.length<1){
                            $.zxsaas_plus.showalert('提示', "请勾选数据!");
                            return false;
                        }else if(selRowId.length>1){
                            $.zxsaas_plus.showalert('提示', "只能红冲一条数据!");
                            return false;
                        }else{
							var rowData = $("#rpGrid").jqGrid('getRowData', selRowId[0]);
							$('#redModal').modal('show');
							getAuthList(function () {
								var min = CompareDate(_authList.minDate, rowData.billsDate) ? _authList.minDate : rowData.billsDate;
								$('.redTime').datePlu({
									endDate:false,
									minTime: min,
									defaultTime: min
								})
							})

                        }
                    }
                },
                copy: {
                    isShow: true,
                    click: function () {
                        var selRowId = $("#rpGrid").jqGrid('getGridParam','selarrrow');
                        if(selRowId.length>1){
                            $.zxsaas_plus.showalert('提示', "只能复制一条数据!");
                            return
                        }else if(selRowId.length<1){
                            $.zxsaas_plus.showalert('提示', "请勾选数据!");
                            return false;
                        }
                        var selRowData = $("#rpGrid").jqGrid('getRowData', selRowId[0]);
                        if(selRowData.redMan != '' && selRowData.billsCode.indexOf('_') != -1){
                            $.zxsaas_plus.showalert('提示', "不能复制红冲单据!");
                            return false;
                        }
                        var billsId=selRowId[0]
                        var billsCode=selRowData.billsCode
                        window.parent.openWorkBoxByMenutext('收入单',
                            '/manager/inventory/income/incomeBill?billsId='+billsId+'&copyFlag=1'+'&billsCode='+billsCode
                            ,true);
                    }
                },
                audit: {
                    isShow: true,
                    click: function () {
                        var selRowId = $("#rpGrid").jqGrid('getGridParam','selarrrow');
                        if(selRowId.length<1){
                            $.zxsaas_plus.showalert('提示', "请勾选数据!");
                            return false;
                        }

                        $.ajax({
                            url:'/manager/inventory/income/auditBill',
							type:'post',
							traditional: true,
							dataType:'json',
                            data:{ids:selRowId},
                            success:function (data) {
                            	if(data.result > 0){
									$.zxsaas_plus.showalert('success',data.desc || "稽核成功");
									setTimeout(function(){selTable()},1500)
								}else{
									$.zxsaas_plus.showalert('error',data.desc );
								}

                            }
                        })
                    }
                },
                auditCancle: {
                    isShow: true,
                    click: function () {
                        var selRowId = $("#rpGrid").jqGrid('getGridParam','selarrrow');
                        if(selRowId.length<1){
                            $.zxsaas_plus.showalert('提示', "请勾选数据!");
                            return false;
                        }

                        $.ajax({
                            url:'/manager/inventory/income/unAuditBill',
							type:'post',
							traditional: true,
							dataType:'json',
							data:{ids:selRowId},
                            success:function (data) {
                            	if(data.result > 0){
									$.zxsaas_plus.showalert('success',data.desc || "取消稽核成功");
									setTimeout(function(){selTable()},1500)

								}else{
									$.zxsaas_plus.showalert('error',data.desc);
								}

                            }
                        })
                    }
                },
                voucher: {
                    isShow: true,
                    click: function () {
                        var selRowId = $("#rpGrid").jqGrid('getGridParam','selarrrow');
                        if(selRowId.length<1){
                            $.zxsaas_plus.showalert('提示', "请勾选数据!");
                            return false;
                        }
                        var mainIds=[];
                        for(var i=0;i<selRowId.length;i++){
                            var rowData = $("#rpGrid").jqGrid('getRowData', selRowId[i]);
                            if((rowData.billsCode =="草稿单")){
                                $.zxsaas_plus.showalert('提示', "只能正式单据才能生成凭证!");
                                return false;
                            }
                            mainIds.push(selRowId[i])
                        }
                        $.ajaxPackage({
                            url:'/manager/inventory/common/batchSaveGenerateVoucher',
                            data:{billsIds:mainIds.join(','),'menuCode':$('#GridTool').data('code')},
                            success:function (data) {
                                $.zxsaas_plus.showalert('提示', data.data.executeResult);
                                setTimeout(function(){selTable()},1500)
                            }
                        })
                    }
                }
            }
        }
        new componentMenuBtn("#GridTool", GridToolOption);

        //保存红冲按钮
        $(".redSave").on("click",function(){
			var selRowId = $("#rpGrid").jqGrid('getGridParam','selarrrow');

            $.request({
                url:"/manager/inventory/income/redBill",
                dataType: "json",
				type:'post',
				traditional: true,
                data:{
                	id:selRowId,
					redDate:$('.redTime').val()
				},
                success:function(data){
                    if(data.result==1){
                        $.zxsaas_plus.showalert("success",data.desc || "红冲成功");
						setTimeout(function(){selTable()},1500)
                        $('#redModal').modal('hide');
                    }else{
                        $.zxsaas_plus.showalert("error",data.desc);
                        $('#redModal').modal('show');
                    }

                }
            });
        });
    }
    // 初始化 顶部表单
    function initTopForm(){
        //载入日期组件
        $('#startDate').datePlu({
            dateEnd:'#endDate',
            endDate:true,
            minTime:"1970-01-01",
            ifPermissions:false,
        });



        //单据状态
        $('#billsStatus').change(function () {
            var $this=$(this)
            //草稿单
            if($this.val()=='1'){
                $('.ifContainRedBill').prop({'checked':false,'disabled':true})
            }else{
                $('.ifContainRedBill').prop({'disabled':false})
            }
        })

        //查询
        $('#searchQuery .search').click(function () {
			searchDetail(getSearchParam())
        })
        //重置
        $('#searchQuery .reset').click(function () {
            $("#searchQuery")[0].reset();
			$('#startDate').datePlu({
				dateEnd: '#endDate'
			})
            $("#searchQuery input").data({'id':''})
			$('.ComboBox ul').html('')
			$("#searchQuery table tbody .jqgrow").remove()
        })
    }
    function selTable() {
        $('#rpGrid').jqGrid('setGridParam', {
            datatype:'json',
            url:"/manager/inventory/income/selectList",
            postData:getSearchParam()
        }).trigger("reloadGrid");
    }
	function init() {

		initMenuBtn()
		initTopForm()

		//部门组件
		$('#sectionIds').modalsbox({
			grid: {
				id: 'section',
				url:"/manager/component/section/getAccessSectionVoPageList",
				param: {}
			},
			tree: {
				id: 'sectionNameTree',
				url: "/manager/component/section/getAccessSectionTreeNodeVoList",
				param: {}
			},
			multiselect: true,
			placeholder: '部门',
		});
		//收入类别
		$('#inpayClassIds').combobox({
			id:'reasonIdsTree',
			url: '/manager/inventory/common/getIncomeExpendClassVoList',
			param:{
				type: '0'
			},
			placeholder:'收入类别'
		})

		$("#unitIds").modalsbox({
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
			placeholder: '往来单位',
		})
		//职员
		$('#employeeIds').modalsbox({
			grid: {
				id: 'operatorqwe',
				url: basePath + "/component/employee/getCompanyEmployeeVoList",
				param: {
					'empIsOperator':2
				}
			},
			placeholder: '职员',
		})
		//制单人
		$('#addManIds').modalsbox({
			grid: {
				id: 'operatorqw12e',
				url: basePath + "/component/employee/getCompanyEmployeeVoList",
				param: {}
			},
			placeholder: '制单人',
		})
	}
	getCustomProject('收入单据列表')


	//查询方法
	$.jgrid.defaults.width = 1280;
	$.jgrid.defaults.responsive = true;
	$.jgrid.defaults.styleUI = 'Bootstrap';
	function searchDetail(params, url, options) {

		$('.notFounImgBox').hide()
		$('#rpContainer').show()
		$('.loadingImgBox').show()
		$('#promptBox').hide()
		var def = {
			multiselect: false, //是否多选
			sortable: true,//是否排序
			merge: false,//是否合并
			gotoable: true,//是否跳转
			rows: '100'//默认数量

		}
		def = $.extend({}, def, options)

		$.ajax({
			url: '/manager/finance/common/getReportHead',
			dataType: 'json',
			type: 'post',
			data: {
				'projectId': projectId,
			},
			success: function (data) {
				if (data.result == '-999') {
					$('#rpContainer').hide()
					$('.notFounImgBox').hide()
					return
				}
				var colName = [];
				var colModel = [];
				var groupHeader = [];
				var mergeArr = [];
				var complexData = {
					colName: colName,
					colModel: colModel,
					groupHeader: groupHeader
				};
				$.each(data.data.colModel, function (k, v) {
                    colName.push(v.defualname);
                    var addJson = {
                        name: v.code,
                        index: v.code,
                        width: v.columnSize,
                        align: alignArr[v.align],
                        hidden: !v.isShow,
                        id: v.id,
                        sortable: def.sortable,
                        cellattr: function (rowId, tv, rawObject, cm, rdata) {
                            return 'id=\'' + v.code + rowId + "\'";
                        }
                    };
                    //单据编号
                    if(v.code == "voucherNo"){
                        addJson.classes='billsCodecss'
                    }
                    colModel.push(addJson);

				});
				for (var i = 0; i < data.data.colModel.length; i++) {
					if (data.data.colModel[i].dataType == 'String' && data.data.colModel[i].isShow) {
						mergeArr.push(data.data.colModel[i].code)
					}
					if (data.data.colModel[i].dataType == 'Number') {
						break;
					}
				}
				;
				$.jgrid.gridUnload("rpGrid");

				$("#rpGrid").jqGrid({
					mtype: "POST",
					url: '/manager/inventory/income/selectList',
					postData: params,
					datatype: "json",
					shrinkToFit: false,
					pager: "#rpGridPager",
					rowList: [100, 200, 500],
					rowNum: def.rows,
					autowidth: true,
					rownumbers: true, // show row numbers
					rownumWidth: 50, // the width of the row numbers columns
					width: "100%",
					height: $(window).height() * 0.35,
					sortable: false,
					viewrecords: true,
					sortorder: "desc",
					colNames: colName,
					footerrow: true,
					userDataOnFooter: true,
					colModel: colModel,
					multiselect: true,
					jsonReader: {
						repeatitems: false,
						root: 'data.rows',
						total: 'data.total',
						page: 'data.page',
						records: 'data.records'
					},
					gridComplete: function () {
						$('table th').css('text-align', 'center')
						$('#rpGrid').resize()

						if (mergeArr.length > 0 && def.merge) {
							Merger("rpGrid", mergeArr);
						}
					},
					onCellSelect: function (rowid, index, contents, event) {
						if (def.gotoable) {
							var info = $("#rpGrid").getRowData(rowid)
							var billsCode = info.billsCode == '草稿单' ? '' : info.billsCode
                            var tarName=$(event.target).attr('aria-describedby')||'';



                            if (tarName== 'rpGrid_billsCode') {
                                window.top.openWorkBoxByMenutext('收入单',   '/manager/inventory/income/incomeBill?billsId='+rowid+'&billsCode='+billsCode, true)
                            }else if(tarName== 'rpGrid_voucherNo'){
                                if($.trim(info.voucherId)!=""){
                                    window.top.openWorkBoxByMenutext("填制凭证",
                                        "/manager/cw/test/voucher"+ '?billsId='+info.voucherId+'&bId='+info.voucherId, true)
                                }

                            }
						}
						if (def.onCellSelect) {
							def.onCellSelect(rowid, index, contents, event);
						}
					},
					loadComplete: function (data) {
						$('#rpGrid').resize()
						if (Object.keys(data.data).length == 0 || data.result == -999) {
							// $('#rpContainer').hide()
							$('.loadingImgBox').hide()
							$('.notFounImgBox').hide()
							return
						} else {
							$('.loadingImgBox').hide()
							$('.notFounImgBox').hide()
							$('#rpContainer').show()
						}
						$('#rpGrid td').css('text-overflow','ellipsis')

						if (data.data.rows.length > 0) {
							var info = data.data.rows

							$.each(info, function (k, v) {
								if (v.redMan) {
									$('#rpGrid').find('tbody tr:eq(' + (k + 1) + ')').css('color', 'red')
								}
								if (def.gotoable) {
									$('#rpGrid tr td[aria-describedby="rpGrid_billsCode"]').addClass('billsCodeStyle');
								}

							})

							$('.footrow td:first-child').html('合计');
							// var rowNum = parseInt($(this).getGridParam('records'), 10);
							// if (rowNum > 0) {
								$(".ui-jqgrid-sdiv").show();
								var footerData = data.data.totalVo;
								$(this).footerData("set", footerData, false);
                                var payAmount = $('#rpGrid').getCol('payAmount', false, 'sum');
                                var sumAmount = $('#rpGrid').getCol('sumAmount', false, 'sum');
                            function fmoney(s, n) {
                                n = n > 0 && n <= 20 ? n : 2;
                                s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
                                var l = s.split(".")[0].split("").reverse(),
                                    r = s.split(".")[1],
                                    t = "";
                                for(var i = 0; i < l.length; i ++ )
                                {
                                    t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
                                }
                                return t.split("").reverse().join("") + "." + r;
                            }
                                $('#rpGrid').footerData("set", {
                                    "payAmount": '<font >' + fmoney(payAmount, 2) + '</font>',
                                    "sumAmount": '<font >' + fmoney(sumAmount, 2) + '</font>',
                                }, false);
							// }
							// else {
							// 	$(".ui-jqgrid-sdiv").hide();
							// }

							//分页滚动条 置顶
							$("#rpGrid").parents(".ui-jqgrid-bdiv")[0].scrollTop = 0;

							//数据请求成功之后，若果有要操作数据的行为，在这里执行
							if (def.callback) {
								def.callback(data);
							}

							//垂直滚动条置顶
							/*$("#rpGrid").setSelection(1);
							$("#rpGrid").resetSelection();*/
						} else {
							// $('#rpContainer').hide()
							$('.loadingImgBox').hide()
							// $('.notFounImgBox').show()
						}
					},
					ondblClickRow: function (id) {
						if (def.ondblClickRow) {
							def.ondblClickRow(id)
						}
					},
				});
				$("#rpGrid").jqGrid('bindKeys', '');
			}
		})
	}

	$("#lineSetGrid").jqGrid({
		mtype: "POST",
		datatype: "json",
		viewrecords: true,
		rowNum: 400,
		width: "100%",
		height: $(window).height() * 0.55,
		colNames: ['id', '报表列字段', '是否显示', 'code'],
		colModel: [
			{name: "id", width: '150px', align: "center", sortable: false, hidden: true},
			{name: "name", width: '150px', align: "center", sortable: false},
			{
				name: "isShow",
				width: '150px',
				align: "center",
				sortable: false,
				formatter: "checkbox",
				formatoptions: {disabled: false},
				edittype: 'checkbox',
				editoptions: {value: '1:0'}
			},
			{name: "code", width: '150px', align: "center", sortable: false, hidden: true},
		],
		jsonReader: {
			repeatitems: false,
			root: 'data.columnVoList',
		},
		gridComplete: function () {
			$('table th').css('text-align', 'center')
			$('#lineSetGrid').resize()
		},
	});


    //获取查询参数
    function getSearchParam(){
        return {
			billsDateBegin:$("#searchQuery input[name='billsDateBegin']").val(),
			billsDateEnd:$("#searchQuery input[name='billsDateEnd']").val(),
            sectionIds:$("#sectionIds").data("id"),
			unitIds:$("#unitIds").data("id"),
			inpayClassIds : $("#inpayClassIds").data('id'),
			employeeIds : $("#employeeIds").data("id"),
			keyWord : $("#keyWord").val().trim(),
			amountBegin : $("#amountBegin").val().trim(),
			amountEnd : $("#amountEnd").val().trim(),
			addManIds : $("#addManIds").data("id"),
			billsStatus : $("#billsStatus").val(),
			ifShowNotAudit : $("#ifShowNotAudit").val(),
			ifContainRedBill : $('.ifContainRedBill').is(":checked") ? "1" : "0"
        };
    }
})


//列设置确认
function sureLineSet() {
	var valList = $('#lineSetGrid').getRowData()
	var ids = $("#lineSetGrid").jqGrid('getDataIDs');
	var rowData = $("#lineSetGrid").jqGrid('getRowData', ids[ids.length - 1]);
	valList.push(rowData)
	$.ajax({
		url: '/manager/erp/projectAndColumn/updateColumns',
		dataType: 'json',
		type: 'post',
		data: {
			'flag':false,
			'valList': JSON.stringify(valList)
		},
		success: function (data) {
			if (data.data.status == '1') {
				$.jgrid.gridUnload("rpGrid");

				$(".search").click()
			}
		}
	})
}
