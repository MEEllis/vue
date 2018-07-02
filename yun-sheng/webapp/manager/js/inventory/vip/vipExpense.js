var projectId

$(function () {
	$.jgrid.defaults.width = 1280;
	$.jgrid.defaults.responsive = true;
	$.jgrid.defaults.styleUI = 'Bootstrap';
	//点击更多条件显示隐藏相关条件
	$('.moreTerm').click(function () {
		$('#moreTermList').toggle()
		$('.moreTermIcon').toggle()
	})

	getCustomProject('客户消费记录')
	//列设置表格
	$("#lineSetGrid").jqGrid({
		mtype:"POST",
		datatype : "json",
		viewrecords:true,
		rowNum : 400,
		width: "100%" ,
		height: $(window).height()*0.55,
		colNames:['id','报表列字段','是否显示','code'],
		colModel:[
			{name:"id",width:'150px',align:"center",sortable:false,hidden:true},
			{name:"name",width:'150px',align:"center",sortable:false},
			{name:"isShow",width:'150px',align:"center",sortable:false,formatter: "checkbox",formatoptions:{disabled:false},edittype:'checkbox',editoptions:{value:'1:0'}},
			{name:"code",width:'150px',align:"center",sortable:false,hidden:true},
		],
		jsonReader: {
			repeatitems: false,
			root:'data.columnVoList',
		},
		gridComplete:function(){
			$('table th').css('text-align','center')
			$('#lineSetGrid')
		},
	});
	//列设置
	$('.lineSet').click(function(){
		$('#lineSet-modal').modal('show');
		$("#lineSetGrid").jqGrid('setGridParam', {
			url :'/manager/erp/projectAndColumn/getColumns',
			postData:{
				'rpMainId': projectId
			}
		}).trigger("reloadGrid");
	})

    //导出
    $("#export").click(function(){
        var isRed=$('.isred').is(':checked')?1:0;
        window.location.href= "/manager/inventory/vip/report/selectVipExpenseExport?latelyConsumptionDateBegin="
            +$('#startDate').val()
			+"&latelyConsumptionDateEnd="+$('#endDate').val()
            +"&joinSectionIds="+$('#sectionIds').data('id')
			+"&goodsClassIds="+$('#goodsType').data('id')
			+"&goodsIds="+$('#goodsNames').data('id')
			+"&vipInfo="+$('#customerInfo').val()
			+"&memberTypeIds="+$('#vipType').data('id')
            +"&empIds="+$('#shopMan').data('id')
			+"&keyword="+$('#seek').val()
            +"&consumptionType="+$('#consumeType').data('id')
			+"&operatorIds="+$('#operatorName').data('id')
            +"&addServiceIds="+$('#addServiceName').data('id')
            +"&operatorUnitIds="+$('#operatorCompany').data('id')
			+"&businessIds="+$('#operatorService').data('id')
            +"&isRed="+isRed
			+"&rpMainId="+projectId;
    });

    //加入日期
	$('#startDate').datePlu({
		minTime: "1970-01-01",
		ifPermissions: false,
		dateEnd: '#endDate',
	})
    //消费门店
    $('#sectionIds').modalsbox({
        grid: {
            id: 'sectionIdsGrid',
            url: basePath + "/component/section/getAccessSectionVoPageList",
            param: {
                'sectionIsStore': 1
            }
        },
        tree: {
            id: 'sectionIdsTree',
            url: basePath + "/component/section/getAccessSectionTreeNodeVoList",
            param: {
                'sectionIsStore': 1
            }
        },
        multiselect: false,
        placeholder: '消费门店'

    })
	//商品类别
	$('#goodsType').combobox({
        id: 'goodsTypeTree',
        url: basePath + '/component/goods/getGoodsClassTreeNodeVoList',
        param: {},
        placeholder: '商品类型',
    })
	//商品名称
    // $('#goodsNames').modalsbox({
     //   grid: {
     //       id: 'goodsName',
     //       url: basePath + "/component/goods/getGoodsVoPageList",
     //       param: {
     //       	'rows': 9999,
    	// 	}
     //   },
     //   tree: {
     //       id: 'goodsNameTree',
     //       url: basePath + "/component/goods/getGoodsClassTreeNodeVoList",
     //        param: {}
     //    },
     //    placeholder: '商品名称'
    // })
    //商品名称
    $('#goodsNames').comModalsAllGoods({
        multiselect: true
    });


    //会员类型
	$('#vipType').combobox({
		id: 'vipTypeTree',
		url: basePath + '/inventory/vip/type/selectAllList',
		param: {},
		placeholder: '会员类型',
	})
	//营业员
	$('#shopMan').modalsbox({
        grid: {
            id: 'operatorMan1',
            url: basePath + "/component/employee/getCompanyEmployeeVoList",
            param: {
                'empIsOperator':'2'
			}
        },
        placeholder: '营业员'
    })
	//增值服务名称
	$('#addServiceName').combobox({
        id: 'addServiceNameTree',
        url: basePath + '/inventory/vip/report/loadExpenseRecordQuery/1',
        param: {},
        placeholder: '请选择增值服务',
    })
    //运营商业务名称
    $('#operatorService').combobox({
        id: 'operatorServiceTree',
        url: basePath + '/inventory/vip/report/loadExpenseRecordQuery/2',
        param: {},
        placeholder: '请选择业务名称',
    })
//运营商单位
    $('#operatorCompany').combobox({
        id: 'operatorCompanyTree',
        url: basePath + '/inventory/vip/report/loadExpenseRecordQuery/3',
        param: {},
        placeholder: '请选择运营商单位',
    })
    //运营商名称
    $('#operatorName').combobox({
        id: 'operatorNameTree',
        url: basePath + '/inventory/vip/report/loadExpenseRecordQuery/4',
        param: {},
        placeholder: '请选择运营商名称',
    })
    //消费类型
    $('#consumeType').combobox({
        id: 'consumeTypeTree',
        url: basePath + '/inventory/vip/report/loadExpenseRecordQuery/5',
        param: {},
        placeholder: '请选择运营商名称',
    })

	//查询
	$('#search').click(function () {
		var url = '/manager/inventory/vip/report/selectVipExpense'
		var params = {
			'latelyConsumptionDateBegin': $('#startDate').val(),
			'latelyConsumptionDateEnd': $('#endDate').val(),
			'joinSectionIds': $('#sectionIds').data('id'),
			'goodsClassIds': $('#goodsType').data('id'),
			'goodsIds': $('#goodsNames').data('id'),
			'vipInfo': $('#customerInfo').val(),
			'memberTypeIds': $('#vipType').data('id'),
			'empIds': $('#shopMan').data('id'),
			'keyword': $('#seek').val(),
			'consumptionType': $('#consumeType').data('id'),
			'operatorIds': $('#operatorName').data('id'),
			'addServiceIds': $('#addServiceName').data('id'),
			'operatorUnitIds': $('#operatorCompany').data('id'),
			'businessIds': $('#operatorService').data('id'),
			'isRed': $('.isred').is(':checked')?1:0,
		}
		searchDetail(params, url, {})
	})

})
//重置
function resetFun() {
	$('#searchQuery')[0].reset();
	$('#searchQuery input').data('id', '');
    $('#searchQuery select').val('');
	$('#startDate,#endDate').prop('disabled', false);
    var t1 = $.fn.zTree.getZTreeObj("goodsTypeTree");
    if(t1 !== null) {
    	t1.checkAllNodes(false);
    }
    var t2 = $.fn.zTree.getZTreeObj("vipTypeTree");
    if(t2 !== null) {
    	t2.checkAllNodes(false);
    }
    var t3 = $.fn.zTree.getZTreeObj("consumeTypeTree");
	if(t3 !== null) {
	t3.checkAllNodes(false);
	}
    var t4 = $.fn.zTree.getZTreeObj("operatorNameTree");
	if(t4 !== null) {
    	t4.checkAllNodes(false);
	}
    var t5 = $.fn.zTree.getZTreeObj("addServiceNameTree");
	if(t5 !== null) {
    	t5.checkAllNodes(false);
	}
    var t6 = $.fn.zTree.getZTreeObj("operatorCompanyTree");
	if(t6 !== null) {
    	t6.checkAllNodes(false);
	}
    var t7 = $.fn.zTree.getZTreeObj("operatorServiceTree");
	if(t7 !== null) {
    	t7.checkAllNodes(false);
	}
}
//公共查询方法
function searchDetail(params, url, options) {

	$('.notFounImgBox').hide()
	$('#rpContainer').show()
	$('.loadingImgBox').show()
	$('#promptBox').hide()
	var def = {
		multiselect: true, //是否多选
		sortable: true,//是否排序
		merge: false,//是否合并
		gotoable: false,//是否跳转
		rows: '100'//默认数量

	}
	def = $.extend({}, def, options)
	var alignArr = ['', 'left', 'center', 'right'];
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
				colModel.push({
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
				});
			});

			$.jgrid.gridUnload("rpGrid");

			$("#rpGrid").jqGrid({
				mtype: "POST",
				url: url,
				postData: params,
				datatype: "json",
				shrinkToFit: false,
				pager: "#rpGridPager",
				rowNum: def.rows,
				rowList: [100,200,500],
				autowidth: true,
				rownumbers: true, // show row numbers
				rownumWidth: 50, // the width of the row numbers columns
				width: "100%",
				height: $(window).height() * 0.55,
				sortable: def.sortable,
				viewrecords: true,
				sortorder: "desc",
				colNames: colName,
				footerrow: true,
				userDataOnFooter: true,
				colModel: colModel,
				multiselect: def.multiselect,
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

				},
				loadComplete: function (data) {
					$('#rpGrid').resize()
					if (Object.keys(data.data).length == 0 ) {
						$('#rpContainer').hide()
						$('.loadingImgBox').hide()
						$('.notFounImgBox').show()

					} else {
						$('.loadingImgBox').hide()
						$('.notFounImgBox').hide()
						$('#rpContainer').show()
					}
					//分页滚动条 置顶
					$("#rpGrid").parents(".ui-jqgrid-bdiv")[0].scrollTop = 0;
				},
				ondblClickRow: function (id) {

				},
			});
		}
	})
}
