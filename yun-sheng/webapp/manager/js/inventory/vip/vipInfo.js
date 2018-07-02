var projectId  //报表ID
$(function () {
	$.jgrid.defaults.width = 1280;
	$.jgrid.defaults.responsive = true;
	$.jgrid.defaults.styleUI = 'Bootstrap';
	//点击更多条件显示隐藏相关条件
	$('.moreTerm').click(function () {
		$('#moreTermList').toggle()
		$('.moreTermIcon').toggle()
	})
	getCustomProject('客户资料')

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

    $('.vipWater').click(function(){
        window.parent.openWorkBoxByMenutext('积分流水',basePath + '/inventory/vip/report/toVipWater');
    })

    $('.vipExpense').click(function(){
        window.parent.openWorkBoxByMenutext('客户消费记录',basePath + '/inventory/vip/report/toVipExpense');
    })

    $('.import').click(function(){
        window.parent.openWorkBoxByMenutext('客户信息资料导入',basePath + '/beginning/customer/toPage');
    })

	//加入日期
	$('#joinDateBegin').datetimepicker({
        lang: "ch",
        format: "Y-m-d",
        timepicker:false,
        todayButton:false
	})
	$('#joinDateEnd').datetimepicker({
        lang: "ch",
        format: "Y-m-d",
        timepicker:false,
        todayButton:false
    })

	//最近消费期间
	$('#latelyConsumptionDateBegin').datetimepicker({
        lang: "ch",
        format: "Y-m-d",
        timepicker:false,
        todayButton:false
    })

    $('#latelyConsumptionDateEnd').datetimepicker({
        lang: "ch",
        format: "Y-m-d",
        timepicker:false,
        todayButton:false
    })
	//生日范围
	// $('#birthDateBegin').datePlu({
	// 	ifPermissions: false,
	// 	endDate: false
	// })
	// $('#birthDateEnd').datetimepicker({
	// 	lang: "ch",
	// 	format: "Y-m-d",
	// 	timepicker: false,
	// 	todayButton: false,
	// });
	//办理会员
	$('#handleDate').datePlu({
		ifPermissions: false,
		endDate: false
	})
	//变更办理日期
	$('#changeHandleDate').datePlu({
		ifPermissions: false,
		endDate: false
	})
	//新增客户生日
	$('#birth').datetimepicker({
		lang: "ch",
		format: "Y-m-d",
		timepicker: false,
		todayButton: false,
	})
	//新增客户加入日期
	$('#inDate').datePlu({
		ifPermissions: false,
		endDate: false,
        value: sysDate
	})
	//新增客户加入门店
	$('#sectionIdAdd').modalsbox({
		grid: {
			id: 'section3',
			url: basePath + "/component/section/getAccessSectionVoPageList",
			param: {
				'sectionIsStore': 1
			}
		},
		tree: {
			id: 'sectionIdAddNameTree',
			url: basePath + "/component/section/getAccessSectionTreeNodeVoList",
			param: {
				'sectionIsStore': 1
			}
		},
		multiselect: false,
		placeholder: '加入门店'

	})
	//会员类型
	$('#memberTypeIds').combobox({
		id: 'memberTypeTree',
		url: basePath + '/inventory/vip/type/selectAllList',
		param: {},
		placeholder: '会员类型',
	})
	//客户分类
	$('#customerClassIds').combobox({
		id: 'customerClassTree',
		url: basePath + '/inventory/vip/info/selectCustomerClassList',
		param: {},
		placeholder: '客户分类',
	})
	//新增客户客户分类
	$('#classLabelId').combobox({
		id: 'classLabelIdTree',
		url: basePath + '/inventory/vip/info/selectCustomerClassList',
		param: {},
		checkType:'radio',
		placeholder: '请选择客户分类',
	})
	//加入门店
	$('#joinSectionIds').modalsbox({
		grid: {
			id: 'section',
			url: basePath + "/component/section/getAccessSectionVoPageList",
			param: {
				'sectionIsStore': 1
			}
		},
		tree: {
			id: 'sectionNameTree',
			url: basePath + "/component/section/getAccessSectionTreeNodeVoList",
			param: {
				'sectionIsStore': 1
			}
		},
		multiselect: false,
		placeholder: '加入门店'

	})
	//办理门店
	$('#handleSectionIds').modalsbox({
		grid: {
			id: 'section1',
			url: basePath + "/component/section/getAccessSectionVoPageList",
			param: {
				'sectionIsStore': 1
			}
		},
		// tree: {
		// 	id: 'section1NameTree',
		// 	url: basePath + "/component/section/getAccessSectionTreeNodeVoList",
		// 	param: {
		// 		'sectionIsStore': 1
		// 	}
		// },
		multiselect: false,
		placeholder: '办理门店'

	})


	//查询条件积分范围
	$('#scoreBegin').blur(function () {
		if ($('#scoreEnd').val().trim() !== '' && $('#scoreBegin').val().trim() !== '') {
			testAmount()
		}
	})
	$('#scoreEnd').blur(function () {
		if ($('#scoreBegin').val().trim() !== '' && $('#scoreEnd').val().trim() !== '') {
			testAmount()
		}
	})
	function testAmount() {
		if (accSubtr($('#scoreEnd').val().trim(), $('#scoreBegin').val().trim()) * 1 >= 0) {
			return true;
		} else {
			$.zxsaas_plus.showalert("提示", "结束积分小于开始积分，请重新输入!");
			$('#scoreEnd').val('');
			return false
		}
	}


	//查询表格参数
	function getParams() {
		var params = {
			'joinDateBegin': $('#joinDateBegin').val(),
			'joinDateEnd': $('#joinDateEnd').val(),
			'latelyConsumptionDateBegin': $('#latelyConsumptionDateBegin').val(),
			'latelyConsumptionDateEnd': $('#latelyConsumptionDateBegin').val(),
			'scoreBegin': $('#scoreBegin').val(),
			'scoreEnd': $('#scoreEnd').val(),
			'birthDateBegin': $('#birthDateBegin').val(),
			'birthDateEnd': $('#birthDateEnd').val(),
			'sex': $('#sex').val(),
			'joinSectionIds': $('#joinSectionIds').data('id'),
			'memberTypeIds': $('#memberTypeIds').data('id'),
			'customerClassIds': $('#customerClassIds').data('id'),
			'handleSectionIds': $('#handleSectionIds').data('id'),
			'vipInfo': $('#vipInfo').val()
		}
		if($('.isVip').is(':checked')){
			params.isVip = 0;
		}
		return params;
	}

	//查询
	$('#search').click(function () {
		var url = '/manager/inventory/vip/info/selectList'
		searchDetail(getParams(), url, {})
	})

	$("#vipTypeGrid").jqGrid({
		mtype: "POST",
		url: '/manager/member/customer/selectClassLabelList',
		datatype: "json",
		shrinkToFit: true,
		pager: "#vipTypeGridPager",
		rowNum: 100,
		autowidth: true,
		rownumbers: true, // show row numbers
		rownumWidth: 50, // the width of the row numbers columns
		width: "100%",
		height: $(window).height() * 0.3,
		viewrecords: true,
		sortorder: "desc",
		colNames: [ '操作', '编码', '标签名称', '备注'],
		footerrow: false,
		userDataOnFooter: true,
		colModel: [
			{name:'ope',index:'ope', width:150,align:'center',sortable:false,formatter:manage},
			{name:'code',index:'code', width:100,align:'center',sortable:false},
			{name:'name',index:'name', width:100,align:'center',sortable:false},
			{name:'remark',index:'remark', width:100,align:'center',sortable:false}
		],
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

		},
		onCellSelect: function (rowid, index, contents, event) {

		},
		loadComplete: function (data) {
			$('#vipTypeGrid').resize()

		},
		ondblClickRow: function (id) {

		},
	});
	//类别标签修改  删除按钮
	function manage(cellvalue, options, rowObjec) {
		return '<span class="showVipTypeInfo" onclick="showVipTypeInfo(this)"  data-code="' + rowObjec.code + '" data-id="' + rowObjec.id + '" data-name="' + rowObjec.name + '" data-remark="' + rowObjec.remark + '" data-toggle="modal" data-target="#updateVipTypeModal" style="color:#00CCFF;cursor:pointer;margin-right:40px;">修改</span><span class="deleteVipType" onclick="deleteVipType(this)" data-depId="' + rowObjec.depId + '" data-id="' + options.rowId + '" style="color:#00CCFF;cursor:pointer">删除</span>';
	}
	//修改客户类型
	$('.updateVipType').click(function () {
		var obj = $("#updateVipTypeModal").toJsonObject();
		if(obj.code==''){
			$.zxsaas_plus.showalert("提示", "编码不能为空");
			return;
		}
		if(obj.name==''){
			$.zxsaas_plus.showalert("提示", "名称不能为空");
			return;
		}
		$.request({
			type: 'POST',
			url: '/manager/member/customer/saveClassLabel',
			type: "POST",
			datatype: "json",
			contentType: "application/json",
			data: JSON.stringify(obj),
			traditional: true,
			success: function (data) {
				if (data.result == 1) {
					$.zxsaas_plus.showalert("提示", data.desc);
					$("#updateVipTypeModal").modal('hide');
					$("#vipTypeGrid").trigger("reloadGrid");
					$("#updateVipTypeModal").cleanAllObj();
				} else {
					$.zxsaas_plus.showalert("错误", data.desc);
				}
			},
			error: function (msg) {
				alert(" 数据加载失败！" + msg);
			}
		});

	})

	//新增客户类型
	$('.addVipTypeBtn').click(function () {
		var obj = $("#updateVipTypeModal").toJsonObject();
		if(obj.code==''){
			$.zxsaas_plus.showalert("提示", "编码不能为空");
			return;
		}
		if(obj.name==''){
			$.zxsaas_plus.showalert("提示", "名称不能为空");
			return;
		}
		$.request({
			type: 'POST',
			url: '/manager/member/customer/saveClassLabel',
			type: "POST",
			datatype: "json",
			contentType: "application/json",
			data: JSON.stringify(obj),
			traditional: true,
			success: function (data) {
				if (data.result == 1) {
					$.zxsaas_plus.showalert("提示", data.desc);
					$("#updateVipTypeModal").modal('hide');
					$("#vipTypeGrid").trigger("reloadGrid");
					$("#updateVipTypeModal").cleanAllObj();
				} else {
					$.zxsaas_plus.showalert("错误", data.desc);
				}
			},
			error: function (msg) {
				alert(" 数据加载失败！" + msg);
			}
		});
	})

	//新增客户
	$('.addCustomer').click(function(){
		$('.vipInfoContainer').hide()
		$("#addCustomerModal").cleanAllObj();
		$('input[name="sex"][value="男"]').attr('checked',true);
        var treeObj = $.fn.zTree.getZTreeObj("classLabelIdTree");
        if(treeObj !== null){
            var nodes = treeObj.getSelectedNodes();
            treeObj.checkNode(nodes);
		}
        $('#inDate').val(sysDate);
        $('#sectionIdAdd').val(secName).data('id',secDateId)
		$('#addCustomerModal .modal-title').html('新增客户');
		$('#addCustomerModal').modal('show')
		$('#addCustomerBtn').unbind('click').bind('click',function(){
			updateCustomerInfo()
		})
	})
	$('#addCustomerBtn').click()
	//新增客户改变推荐渠道
	$('#fzrType').change(function () {
		var type = $(this).val()
		$('#fzrId').val('').data('id','')
		$('#fzrId').parent().find('.showModalBtn').remove()
		$('#fzrId').parent().find('.modal').remove()
		if(type == '1'){
			$('#fzrId').modalsbox({
				grid: {
					id: 'contactUnits',
					url: basePath + "/component/contactUnit/getContactUnitVoPageList",
					param: {

					}
				},
				tree: {
					id: 'contactUnitsTree',
					url: basePath + "/component/contactUnit/getContactUnitClassTreeNodeVoList",
					param: {

					}
				},
				multiselect: false,
				placeholder: '往来单位'
			})
		}else if(type == '2'){
			$('#fzrId').modalsbox({
				grid: {
					id: 'operator',
					url: basePath + "/component/employee/getCompanyEmployeeVoPageList",
					param: {
						'empIsOperator':2,
						'searchSectionType':2
					}
				},
				placeholder: '职员',
				multiselect: false,
			})
		}else if(type == '3'){
			$('#fzrId').modalsbox({
				grid: {
					id: 'vip',
					url: basePath + "/component/vip/getVipVoList",
					param: {
						isVip:1
					}
				},
				multiselect: false,
				placeholder: '会员'
			})
		}
	})
	//办理会员加入门店
	$('#vipSectionId').modalsbox({
		grid: {
			id: 'section6',
			url: basePath + "/component/section/getAccessSectionVoPageList",
			param: {
				'sectionIsStore': 1
			}
		},
		tree: {
			id: 'vipSectionIdTree',
			url: basePath + "/component/section/getAccessSectionTreeNodeVoList",
			param: {
				'sectionIsStore': 1
			}
		},
		multiselect: false,
		placeholder: '加入门店'

	})
	//办理会员会员类型选择
	$('#vipCardtypeId').combobox({
		id: 'vipCardtypeIdTree',
		url: basePath + '/inventory/vip/type/selectAllList',
		param: {},
		checkType:'radio',
		placeholder: '会员类型',
		callback:function (id) {
			$.ajax({
				url:'/manager/inventory/vip/type/selectOne',
				type:'post',
				dataType:'json',
				data:{id:id},
				success:function (data) {

					var activeTime = data.data.data.activeTime
					var amount = data.data.data.amount
					//办理会员页面，选择会员类型后的一系列操作
					//1、更新截止日期
					if(activeTime == -1){
						$('#invalidDate').prop('disabled',true).val('').removeClass('mustValue');
					}else{
						$('#invalidDate').prop('disabled',false).val('').addClass('mustValue');
						var dateArr = sysDate.split('-')
						var yearVal = dateArr[0]*1
						var mouthVal = dateArr[1]*1 + activeTime
						if(mouthVal > 12){
							yearVal+= parseInt(mouthVal/12) - (mouthVal-(12*parseInt(mouthVal/12)) == 0 ? 1 : 0 )
							mouthVal=mouthVal-(12*parseInt(mouthVal/12)) == 0 ? dateArr[1]*1 : mouthVal-(12*parseInt(mouthVal/12))
						}
						var dateVal = yearVal+'-'+mouthVal+'-'+dateArr[2]
						$('#invalidDate').datetimepicker({
							lang: "ch",
							format: "Y-m-d",
							timepicker: false,
							todayButton: false,
							value:dateVal
						}).change()
					}
					//2、判断会员是否需要购买
					if(amount != null && amount !== 0){
						$('.vipPrice').html(amount+'元')
						$('#vipPriceBox').show()
						$('#receiptBtn').show()
					}else {
						$('.vipPrice').html('')
						$('#vipPriceBox').hide()
						$('#receiptBtn').hide()
					}


				}
			})
		}
	})
	//办理会员办理门店
	$('#handleSection').modalsbox({
		grid: {
			id: 'section11',
			url: basePath + "/component/section/getAccessSectionVoPageList",
			param: {
				'sectionIsStore': 1
			}
		},
		tree: {
			id: 'handleSectionTree',
			url: basePath + "/component/section/getAccessSectionTreeNodeVoList",
			param: {
				'sectionIsStore': 1
			}
		},
		multiselect: false,
		placeholder: '办理门店',
		callback: function (opt) {
            $("input[name='handleSection']").data('sectionId');
            $("input[name='fcardEmployeeid']").val("");
            $("input[name='fcardEmployeeid']").data("");
            getPay(opt.dataId,blpay);
        }

	})
	//办理会员往来单位
	$('#vipContactUnitid').modalsbox({
		grid: {
			id: 'section8',
			url: basePath + "/component/contactUnit/getContactUnitVoPageList",
			param: {}
		},
		tree: {
			id: 'vipContactUnitidTree',
			url: basePath + "/component/contactUnit/getContactUnitClassTreeNodeVoList",
			param: {}
		},
		multiselect: false,
		placeholder: '往来单位'
	})
	//办理会员改变推荐渠道
	$('#vipFzrType').change(function () {
		var type = $(this).val()
		$('#vipFzrId').val('').data('id','')
		$('#vipFzrId').parent().find('.showModalBtn').remove()
		$('#vipFzrId').parent().find('.modal').remove()
		if(type == '1'){
			$('#vipFzrId').modalsbox({
				grid: {
					id: 'contactUnits11',
					url: basePath + "/component/contactUnit/getContactUnitVoPageList",
					param: {}
				},
				tree: {
					id: 'vipFzrIdTree',
					url: basePath + "/component/contactUnit/getContactUnitClassTreeNodeVoList",
					param: {}
				},
				multiselect: false,
				placeholder: '往来单位'
			})
		}else if(type == '2'){
			$('#vipFzrId').modalsbox({
				grid: {
					id: 'operator11',
					url: basePath + "/component/employee/getCompanyEmployeeVoPageList",
					param: {
						'empIsOperator':2,
						'searchSectionType':2
					}
				},
				multiselect: false,
				placeholder: '职员'
			})
		}else if(type == '3'){
			$('#vipFzrId').modalsbox({
				grid: {
					id: 'vip11',
					url: basePath + "/component/vip/getVipVoList",
					param: {
				     isVip:1
			}
				},
				multiselect: false,
				placeholder: '会员'

			})
		}
	})
	//办理会员客户分类
	$('#vipClassLabelId').combobox({
		id: 'vipClassLabelIdTree',
		url: basePath + '/inventory/vip/info/selectCustomerClassList',
		param: {},
		checkType:'radio',
		placeholder: '客户分类',
	})
	//办理会员生日
	$('#vipbirth').datetimepicker({
		lang: "ch",
		format: "Y-m-d",
		timepicker: false,
		todayButton: false,
		value:sysDate
	})
	//办理会员加入日期
	$('#vipInDate').datetimepicker({
		lang: "ch",
		format: "Y-m-d",
		timepicker: false,
		todayButton: false,
		value:sysDate
	})
	//办理会员办理日期
	$('#handleDate').datetimepicker({
		lang: "ch",
		format: "Y-m-d",
		timepicker: false,
		todayButton: false,
		value:sysDate
	})
	//办理会员经手人
	// $('#fcardEmployeeid').modalsbox({
	// 	grid: {
	// 		id: 'section30',
	// 		url: basePath + "/component/employee/getCompanyEmployeeVoList",
	// 		param: {'empIsOperator':1}
	// 	},
	// 	multiselect: false,
	// 	placeholder: '经手人'
	// })
    $('#fcardEmployeeid').comModalsEmployeeBySection({
        sectionIds:'input[name="handleSection"]',
        search: false,
        clickback:function(){
            var obj= $("input[name='fcardEmployeeid']");
            //设置编辑器值
            $("input[name='fcardEmployeeid']").val(obj.val());
            $("input[name='fcardEmployeeid']").data(obj.data('id'));
        }
    })
    //办理会员
	$('.blvip').click(function(){
		$("#addVipModal").cleanAllObj();
		$('#vipPriceBox,#receiptBtn').hide();
        var tree1 = $.fn.zTree.getZTreeObj("vipCardtypeIdTree");
        if(tree1 !== null) {
            var n1 = tree1.getSelectedNodes();
            tree1.checkNode(n1);
        }
        var tree2 = $.fn.zTree.getZTreeObj("vipClassLabelIdTree");
        if(tree2 !== null) {
            var n2 = tree2.getSelectedNodes();
            tree2.checkNode(n2);
        }
        var ids = $('#rpGrid').jqGrid('getGridParam', 'selarrrow');
        if(ids == undefined){
        	$('#creatVipBtn').data('id','');
            $('#addVipModal').modal('show');
            $('#vipInDate,#handleDate').val(sysDate);
            $('#vipSectionId').val(secName).data('id',secDateId);
            $('#handleSection').val(secName).data('id',secDateId);
            $('#vipContactUnitid').val(unitName).data('id',unitId);
            $('#fcardEmployeeid').val(userName).data('id',userId);
            $('#vipPriceBox').hide();
            getPay(secDateId,blpay);
            return
		}
        if(ids.length < 1){
            $('#creatVipBtn').data('id','');
            $('#addVipModal').modal('show');
		}else{
        	if(ids.length == 1){
                $.ajax({
                    url:'/manager/inventory/vip/info/selectOne',
                    type:'post',
                    dataType:'json',
					async: false,
                    traditional: true,
                    data:{
                        'id':ids
                    },
                    success:function (data) {
                        var info = data.data.obj
                        if(info.zcardId == '' || info.zcardId == null){
                            $('#creatVipBtn').data('id',info.id);
                            $('#addVipModal').modal('show');
                            $("#addVipModal").writeJson2Dom(info);
                            $('#vipbirth').val(info.birthString);
                            if($('#addVipModal input[name="sex"]').val() == info.sex){
                                $(this).prop('checked',true)
                            }
                            $('#vipClassLabelId').val(info.customerClassName).data('id',info.classLabelId)
                            $('#vipInDate,#handleDate').val(info.inDateString)
                            $('#vipgrade option:eq('+ (info.grade == null ? 0 : (info.grade*1))+')').attr("selected",true);
                            $('#vipFzrType option:eq('+ (info.fzrType == null ? 0 : (info.fzrType*1))+')').attr("selected",true);
                            $('#vipFzrId').val(info.fzrName).data('id',info.fzrId);
                        }else{
                            $('#creatVipBtn').data('id','');
                            $.zxsaas_plus.showalert('提示','会员无需再次办理');
                        }

                    }
                })
			}else{
                $.zxsaas_plus.showalert('提示','只能勾选一个会员客户')
			}
		}
        $('#vipPriceBox').hide();
        $('#vipInDate,#handleDate').val(sysDate);
        $('#vipSectionId').val(secName).data('id',secDateId);
        $('#handleSection').val(secName).data('id',secDateId);
        $('#vipContactUnitid').val(unitName).data('id',unitId);
        $('#fcardEmployeeid').val(userName).data('id',userId);
        getPay(secDateId,blpay);
	})
	//取消办理会员
	$('#cancelCreatBtn').click(function () {
		var  mustValue = $('#addVipBox .mustValue');
		testMustValue(mustValue)
	})

	//办理会员
	$('#creatVipBtn').click(function () {
		var  mustValue = $('#addVipBox .mustValue');
		if(!testMustValue(mustValue,true)){return}
		var obj = getCreatVipVal();
		var id = $(this).data('id');
		if(id !== '' || id !== undefined){
            obj.id = id;
		}
        var flag=false;
            if (obj.payList=='') {
                flag = true
            }

        if(flag==true){
            $.zxsaas_plus.showconfirm('提示','确认收款为0元吗？',function () {
                VipBtn()
            },function () {
                return;
            })
        }else{
            VipBtn()
        }
        function VipBtn() {
            $.request({
                url:'/manager/inventory/vip/info/handleVip',
                type:'post',
                dataType:'json',
                contentType: "application/json",
                data: JSON.stringify(obj),
                success:function (data) {
                    if(data.result == 1){
                        $('#addVipModal').modal('hide');
                        $.zxsaas_plus.showalert('success',data.desc);
                        setTimeout(function () {
                            $("#rpGrid").trigger("reloadGrid");
                        },1500)

                    }else{
                        $.zxsaas_plus.showalert('error',data.desc);
                    }
                }
            })
        }
	})

// 办理会员pos账户支付
    $("#blpos").focus(function(){
        if($(this).data('show') == "true"){
            $(".blposDiv").show();
            $(".blotherDiv").hide();
            var h = $(".blposDiv").height() + 60;
            $(".blposDiv").css('top',"-"+ h +"px");
        }
    })

    $("#blposSure").click(function(){
        $(".blposDiv").hide();
        var num = 0;
        $(".blposval").each(function(){
            num+= $(this).val()*1;
        })
        $('#blpos').val(num.toFixed(2));
        $('.blinp').change();
    })

    $('#blposNone').click(function(){
        $(".blposDiv").hide();
    })

// 办理会员其他账户支付
    $("#blother").focus(function(){
        if($(this).data('show') == "true"){
        $(".blotherDiv").show();
        $(".blposDiv").hide();
        var h = $(".blotherDiv").height() + 60;
        $(".blotherDiv").css('top',"-"+ h +"px");
        }
    })

    $("#blotherSure").click(function(){
        $(".blotherDiv").hide();
        var num = 0;
        $(".blotherval").each(function(){
            num+= $(this).val()*1;
        })
        $('#blother').val(num.toFixed(2));
        $('.blinp').change();
    })

    $('#blotherNone').click(function(){
        $(".blotherDiv").hide();
    })

    // $('.blinp').change(function(){
    //     var num = 0;
    //     $('.blinp').each(function(){
    //         var v = $(this).val()*1;
    //         num+= v;
    //     })
		// num+= $('#blpos').val()*1;
    //     num+= $('#blother').val()*1;
    //     $('.code_blss').text(num.toFixed(2));
    // })

// 办理会员扫码支付
    $('#receiptBtn').click(function(){
        var mustValue = $('#addVipBox .mustValue');
        if(!testMustValue(mustValue,true)){return};
        $('#codeModal').modal('show');
        $('.blinp').change();
        $('.blcodeMoney').val('');
        $('.codeTop').hide();
        $('.blcodeTop').show();
        $('#startCode').text('开始扫码');
        $('#codeModal .red').hide();
    })

// 办理会员扫码支付
    $('.blcodeInp').change(function(){
        var money = $('.blcodeMoney').val();
		var opt = {
			accountId: $('#receiptBtn').data('id'),
			accountType: $('#receiptBtn').data('accountType')*1,
			payreceiptAmout: money*1,
		}
		var obj = getCreatVipVal();
        obj.payList.push(opt);
        obj.unionPay = {
            transactionAmount: money*100,
            payCode: $(this).val(),
            payType:$('#codeModal input[name="payType"]:checked').val(),
        }
        $.request({
            type:'POST',
            url: '/manager/inventory/vip/info/handleVip',
            dataType:'json',
            contentType: "application/json",
            data:JSON.stringify(obj),
            success:function(data){
                $('#startCode').text('开始扫码');
                $('#codeModal .red').hide();
                if(data.result==1||data.result==-2||data.result==2){
                    $('#codeModal').modal('hide');
                    $('#addVipModal').modal('hide');
                    $.zxsaas_plus.showalert('提示',data.desc);
                    setTimeout(function(){
                        $('#rpGrid').trigger("reloadGrid")
                    },1500)
                }else{
                    $('.blcodeInp').val('');
                    $.zxsaas_plus.showalert('error',data.desc);
                }
            },
        })
    })

// 续费pos账户支付
    $("#xfpos").focus(function(){
        if($(this).data('show') == "true"){
            $(".xfposDiv").show();
            $(".xfotherDiv").hide();
            var h = $(".xfposDiv").height() + 60;
            $(".xfposDiv").css('top',"-"+ h +"px");
        }
    })

    $("#xfposSure").click(function(){
        $(".xfposDiv").hide();
        var num = 0;
        $(".xfposval").each(function(){
            num+= $(this).val()*1;
        })
        $('#xfpos').val(num.toFixed(2));
        $('.xfinp').change();
    })

    $('#xfposNone').click(function(){
        $(".xfposDiv").hide();
    })

// 续费其他账户支付
    $("#xfother").focus(function(){
        if($(this).data('show') == "true"){
            $(".xfotherDiv").show();
            $(".xfposDiv").hide();
            var h = $(".xfotherDiv").height() + 60;
            $(".xfotherDiv").css('top',"-"+ h +"px");
        }
    })

    $("#xfotherSure").click(function(){
        $(".xfotherDiv").hide();
        var num = 0;
        $(".xfotherval").each(function(){
            num+= $(this).val()*1;
        })
        $('#xfother').val(num.toFixed(2));
        $('.xfinp').change();
    })

    $('#xfotherNone').click(function(){
        $(".xfotherDiv").hide();
    })

// 续费扫码支付
    $('#renewCode').click(function(){
        var ys = $('.renewIncome').val();
        var ss = $('.renewMoney').val();
        var price = ys - ss;
        $('.code_ys').text(ys);
        $('.code_ss').text(ss);
		$('.codeMoney').val(price.toFixed(2));
        $('.blcodeTop').hide();
        $('.codeTop').show();
        $('#startCode').text('开始扫码').attr('name','xf');
        $('#codeModal .red').hide();
        $('#codeModal').modal('show');
    })

	$('.xfinp').change(function(){
		var num = 0;
        $('.xfinp').each(function(){
        	var v = $(this).val()*1;
        	num+= v;
		})
		num+= $('#xfpos').val()*1;
        num+= $('#xfother').val()*1;
		$('.renewMoney').val(num.toFixed(2));
	})

    $('.blcodeMoney').blur(function(){
        var m = $(this).val();
        if(m <=0){
            $('.blcodeMoney').addClass('mustValueError')
        }else{
            $('.blcodeMoney').removeClass('mustValueError')
        }
	})

// 开始扫码
    $('#startCode').click(function(){
    	if($('.codeTop').is(':visible')){
    		// 有应收情况下扫码
            var v = $('.codeMoney').val()*1;
            if(v <= 0){
                $.zxsaas_plus.showalert('warning','本次无收款，无法结算');
                return
            }
            $('.codeInp').val('').focus();
		}else{
    		// 无应收情况下扫码
			var m = $('.blcodeMoney').val();
			if(m<=0){return};
			$('.blcodeInp').val('').focus();
		}
        $('#startCode').text('扫码中...');
        $('#codeModal .red').show();
    })

// 续费扫码支付与会员变更保存
    $('.codeInp').change(function(){
        var name = $('#startCode').attr('name');
		var money = $('.codeMoney').val()*1;
        if(name == 'xf') {	//续费扫码
			var url = '/manager/inventory/vip/info/renewal';
            var opt = {
                accountId: $('#receiptBtn').data('id'),
                accountType: $('#receiptBtn').data('accountType')*1,
                payreceiptAmout: money*1,
            }
            var obj = getRenewVip();
            obj.id = $('#renewVipBtn').data('id');
        }else{		//变更会员扫码
            var url = '/manager/inventory/vip/info/updateCardType';
            var opt = {
                accountId: $('#changeVipCode').data('id'),
                accountType: $('#changeVipCode').data('accountType')*1,
                payreceiptAmout: money*1,
            }
            var obj = getChangeVip();
            obj.id = $('#changeVipBtn').data('id');
        }
		obj.unionPay = {
			transactionAmount: money*100,
			payCode: $(this).val(),
            payType:$('#codeModal input[name="payType"]:checked').val(),
		}
		var data = {
			payreceiptAmout: money,
			accountId: $('#renewCode').data('id'),
			accountType: $('#renewCode').data('accountType')*1,
		}
		obj.payList.push(data);
		$.request({
			type:'POST',
			url: url,
			dataType:'json',
			contentType: "application/json",
			data:JSON.stringify(obj),
			success:function(data){
				$('#startCode').text('开始扫码');
				$('#codeModal .red').hide();
				if(data.result==1||data.result==-2||data.result==2){
					$('#codeModal').modal('hide');
					$('#vipRenewModal').modal('hide');
                    $('#changeVipModal').modal('hide');
					$.zxsaas_plus.showalert('success',data.desc);
					setTimeout(function(){
						$('#rpGrid').trigger("reloadGrid")
					},1500)
				}else{
					$('.codeInp').val('');
					$.zxsaas_plus.showalert('error',data.desc);
				}
			},
		})
    })

	$('#renewVipBtn').click(function(){
		var ys = $('.renewIncome').val()*1;
		var ss = $('.renewMoney').val()*1;
		if(ys == ss && ys !== 0){
            var obj = getRenewVip();
            obj.id = $('#renewVipBtn').data('id');
            $.request({
                type:'POST',
                url:'/manager/inventory/vip/info/renewal',
                dataType:'json',
                contentType: "application/json",
                data:JSON.stringify(obj),
                success:function(data){
                    $('#startCode').text('开始扫码');
                    $('#codeModal .red').hide();
                    if(data.result==1||data.result==-2||data.result==2){
                        $('#codeModal').modal('hide');
                        $('#vipRenewModal').modal('hide');
                        $.zxsaas_plus.showalert('success',data.desc);
                        setTimeout(function(){
                            $('#rpGrid').trigger("reloadGrid")
                        },1500)
                    }else{
                        $('.codeInp').val('');
                        $.zxsaas_plus.showalert('error',data.desc);
                    }
                },
            })
		}else{
            $.zxsaas_plus.showalert('warning','请填写正确的应收与实收价格');
		}
	})

	//合并
	$('.mergeBtn').click(function () {
		var ids = $('#rpGrid').jqGrid('getGridParam', 'selarrrow');
		if(ids.length > 0){
			var vipIdArr = []
			var vipCardId = []
			$('#hbGrid').clearGridData();
			$.each(ids,function (k,v) {
				var info = $('#rpGrid').getRowData(v)
				if(info.cardId != null && info.cardId != ''){
					vipCardId.push(info.cardId)
					vipIdArr.push(info.id)
				}
				$('#hbGrid').addRowData(k,info)
			})
			if(vipIdArr.length > 1){
				$.zxsaas_plus.showalert('提示','只能勾选一个会员客户')
			}else{
				if(vipCardId.length == 1){
					var info = $('#rpGrid').getRowData(vipIdArr[0])
					$('.mergeSelect').html('<option value="'+info.id+'">'+info.consumerName+info.consumerPhone+'</option>')
					$('#mergeModal').modal('show');
				}else{
					$('.mergeSelect').html('')
					$.each(ids,function (k,v) {
						var info = $('#rpGrid').getRowData(v);
						$('.mergeSelect').append('<option value="'+info.id+'">'+info.consumerName+info.consumerPhone+'</option>')
					})
					$('#mergeModal').modal('show');
				}

				//确认合并
				$('.sureMerge').unbind('click').bind('click',function () {
					$.ajax({
						url:'/manager/inventory/vip/info/customerMerge',
						type:'post',
						dataType:'json',
						traditional: true,
						data:{
							'ids':ids,
							'id':$('.mergeSelect').val()
						},
						success:function (data) {
							if(data.result == 1){
								$.zxsaas_plus.showalert('success',data.desc)
								$('#mergeModal').modal('hide')
								$("#rpGrid").trigger("reloadGrid");
							}else{
								$.zxsaas_plus.showalert('error',data.desc)
							}
						}
					})
				})

			}

		}else{
			$.zxsaas_plus.showalert('提示','请选择要合并的信息')
		}
	})

	//合并表格
	$('#hbGrid').jqGrid({
		shrinkToFit: true,
		pager: "#hbGridPager",
		autowidth: true,
		rownumbers: true, // show row numbers
		rownumWidth: 50, // the width of the row numbers columns
		width: "100%",
		height: $(window).height() * 0.55,
		viewrecords: true,
		sortorder: "desc",
		colNames:[ '姓名', '手机号码', '会员卡号'],
		footerrow: true,
		userDataOnFooter: true,
		colModel: [
			{name: 'consumerName', index: 'consumerName', sortable: false, align: 'center', width: 100},
			{name: 'consumerPhone', index: 'consumerPhone', sortable: false, align: 'center', width: 100},
			{name: 'memberCardNum', index: 'memberCardNum', sortable: false, align: 'center', width: 100},
		],
		// multiselect: true,
		jsonReader: {
			repeatitems: false,
			root: 'data.rows',
			total: 'data.total',
			page: 'data.page',
			records: 'data.records'
		},
		gridComplete: function () {
			$('table th').css('text-align', 'center')
			$('#hbGrid').resize()

		},
		onCellSelect: function (rowid, index, contents, event) {

		},

		ondblClickRow: function (id) {

		},
	})

	//修改
	$('.updateBtn').click(function () {
		$('#addCustomerModal .modal-title').html('修改客户');
		var ids = $('#rpGrid').jqGrid('getGridParam', 'selarrrow');
		if(ids.length > 1){
			$.zxsaas_plus.showalert('warning','只能修改一条数据')
		}else{
			if(ids.length < 1){
				$.zxsaas_plus.showalert('warning','请选择要修改的数据')
			}else{
				$.ajax({
					url:'/manager/inventory/vip/info/selectOne',
					type:'post',
					dataType:'json',
					traditional: true,
					data:{
						'id':ids
					},
					success:function (data) {
						var info = data.data.obj
						if(info.zcardId != '' && info.zcardId != null){
							$('.vipInfoContainer').show()
						}else{
							$('.vipInfoContainer').hide()
						}

						$("#addCustomerModal").writeJson2Dom(info);
						$('#birth').val(info.birthString);
						if($('#addCustomerModal input[name="sex"]').val() == info.sex){
							$(this).prop('checked',true)
						}
						$('#classLabelId').val(info.customerClassName).data('id',info.classLabelId)
						$('#inDate').val(info.inDateString)
						$('#grade option:eq('+ (info.grade == null ? 0 : (info.grade*1))+')').attr("selected",true);
						$('#sectionIdAdd').val(info.inSectionName).data('id',info.sectionId)
						$('#fzrType option:eq('+ (info.fzrType == null ? 0 : (info.fzrType*1))+')').attr("selected",true);
						$('#fzrId').val(info.fzrName).data('id',info.fzrId);
						$('#addCustomerModal').modal('show')
						//确认修改
						$('#addCustomerBtn').unbind('click').bind('click',function(){
							updateCustomerInfo(info.id)

						})

					}
				})
			}
		}
	})

    // 会员积分调整表格
    $('#jfGrid').jqGrid({
        mtype: "POST",
        datatype: "json",
        jsonReader: {
            root: "data.rows",
            total: "data.total",
            records: "data.records",
        },
        // gridview: true,
        colNames: ['id','客户姓名','手机号码','会员类型','会员卡号','当前积分','调整积分','调整后积分'],
        colModel: [
            {name:'id',index:'id', width:100,align:'center',sortable:false,hidden:true},
            {name:'consumerName',index:'consumerName', width:120,align:'center',sortable:false},//客户姓名
            {name:'consumerPhone',index:'consumerPhone', width:140,align:'center',sortable:false},//手机号码
            {name:'memberType',index:'memberType', width:120,align:'center',sortable:false},//会员类型
            {name:'memberCardNum',index:'memberCardNum', width:140,align:'center',sortable:false},//会员卡号
            {name:'integral',index:'integral', width:100,align:'center',sortable:false},//积分
            {name:'updateScore',index:'updateScore', width:100,align:'center',sortable:false},//调整积分
            {name:'afterScore',index:'afterScore', width:100,align:'center',sortable:false},//调整后积分
        ],
        sortable: false,
        rownumbers: true,
        cellsubmit: 'clientArray',// 单元格保存内容的位置
        editurl: 'clientArray',
        rowNum: 9999,
        viewrecords: true,
        footerrow: false,
        multiselect: false,
        multiboxonly: true,
        multiselectWidth: 40,
        height: $(window).height() * 0.4,
        autowidth: true,
        rownumWidth: 35, // the width of the row numbers columns
        shrinkToFit: false,  // 此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
        userDataOnFooter: true,// 设置userData 显示在footer里
        gridComplete: function () {
            $("#jfGrid").setLabel(0, '序');
        }
    })

	/**
	 * 导出
	 */
	$('#export').click(function () {
		var url = '/manager/inventory/vip/info/selectVipInfoExport?rpMainId='+projectId;
		var params = getParams();
		$.each(params, function(i, val) {
			url += "&"+ i + "=" + val;
		});
		window.location.href= url;
	})

    // 发送短信
    $('.SendMessage').click(function () {
        window.parent.openWorkBoxByMenutext("短信发送",  '/manager/sms/center/sign/sendSms', true);
    })
	// 积分调整点击事件
	$('.integralBtn').click(function(){
		var ids = $('#rpGrid').jqGrid('getGridParam', 'selarrrow');
		if(ids.length <1){
            $.zxsaas_plus.showalert('提示','请选择需要调整的数据')
		}else{
			$('#jfGrid').clearGridData()
			$('#ajustScoreSection').val(secName).data('id',secDateId)
			$('.ajustScore,.ajustReason').val('');
			$('.adjustSure').hide();
			$('.adjust').attr('disabled',true);
			$.each(ids,function(i,v){
				var row = $('#rpGrid').getRowData(v);
				if(row.cardId !== '' && row.cardId !== null){
                    $('#jfGrid').addRowData(v,{
                        id: row.id,
                        consumerName: row.consumerName,
                        consumerPhone: row.consumerPhone,
                        memberType: row.memberType,
                        memberCardNum: row.memberCardNum,
                        integral: row.score,
                    })
				}
			})
            $('#integralModal').modal('show');
            $('#jfGrid').resize();
		}
	})
	$('.ajustScore,.ajustReason').bind('keyup',function () {
		if($('.ajustScore').val().trim() != '' && $('.ajustReason').val().trim() != ''){
			$('.adjust').prop('disabled',false)
		}else{
			$('.adjust').prop('disabled',true)
		}
	})


	//调整积分点击事件
	$('.adjust').click(function () {

		var ajustScore = $('.ajustScore').val().trim()
		var ids = $('#jfGrid').getDataIDs()
		if(ids.length > 0){
			$.each(ids,function (k,v) {
				var info = $('#jfGrid').getRowData(v)
				var integral = info.integral
				var afterScore;
				// $("#jfGrid").setCell(v,'updateScore',ajustScore)
				var jsType = $('.countSel').val()
				if (jsType == '1') {
					afterScore = (accAdd(integral, ajustScore) * 1)
				} else if (jsType == '2') {
					afterScore = (accSubtr(integral, ajustScore) * 1)
				} else if (jsType == '3') {
					afterScore = (accMul(integral, ajustScore) * 1)
				} else {
					if (ajustScore != 0) {
						afterScore = (accDiv(integral, ajustScore) * 1)
					} else {
						$.zxsaas_plus.showalert('提示', '相除分母不能为零')
						return
					}
				}
                afterScore = Math.floor(afterScore);
				$("#jfGrid").setCell(v,'afterScore',afterScore);
				var updateScore = afterScore - integral;
                $("#jfGrid").setCell(v,'updateScore',updateScore);
			})
			$('.adjustSure').show()
		}
	})
	//调整部门
	$('#ajustScoreSection').modalsbox({
		grid: {
			id: 'section56',
			url: basePath + "/component/section/getAccessSectionVoPageList",
			param: {}
		},
		// tree: {
		// 	id: 'ajustScoreSectionTree',
		// 	url: basePath + "/component/section/getAccessSectionTreeNodeVoList",
		// 	param: {}
		// },
		multiselect: false,
		placeholder: '部门'

	})

	//保存调整点击事件
	$('.adjustSure').click(function () {
		var obj = {
			flag: $('.countSel').val()*1,
            reason: $('.ajustReason').val(),
            integral: $('.ajustScore').val()*1,
            sectionId: $('#ajustScoreSection').data('id')*1,
            scoreList: [],
        }
        var ids = $('#jfGrid').getDataIDs();
		$.each(ids,function(i,v){
			var row = $('#jfGrid').getRowData(v);
			var opt = {
                fcardId: row.id *1,
                beforeIntegral: row.integral *1,
                adjustIntegral: row.updateScore *1,
                afterIntegral: row.afterScore *1,
            }
			obj.scoreList.push(opt);
        })
        $.request({
            url: '/manager/inventory/vip/info/scoreAdjustment',
            type: "POST",
            datatype: "json",
            contentType: "application/json",
            data: JSON.stringify(obj),
            traditional: true,
            success: function (data) {
                if (data.result == 1) {
                    $("#integralModal").modal('hide');
                    $.zxsaas_plus.showalert("success", data.desc);
                    setTimeout(function(){
                        $('#rpGrid').trigger("reloadGrid")
                    },1500)
                } else {
                    $.zxsaas_plus.showalert("error", data.desc);
                }
            }
        });
	})


	//续费门店
	$('#renewSectionName').modalsbox({
		grid: {
			id: 'section526',
			url: basePath + "/component/section/getAccessSectionVoPageList",
			param: {}
		},
		// tree: {
		// 	id: 'ajustScoreSectionTree',
		// 	url: basePath + "/component/section/getAccessSectionTreeNodeVoList",
		// 	param: {}
		// },
		multiselect: false,
		placeholder: '门店',
		callback: function (opt) {
            getPay(opt.dataId,xfpay);
        }
	})

	//续费营业员
	$('#renewCreateMan').modalsbox({
		grid: {
			id: 'section3120',
			url: basePath + "/component/employee/getCompanyEmployeeVoList",
			param: {'empIsOperator':1}
		},
		multiselect: false,
		placeholder: '营业员'
	})

	//续费时间
	$('#renewDate').datePlu({
		ifPermissions: false,
		endDate: false
	})
	//续费截止日期
	// $('#renewCloseDate').datetimepicker({
     //    lang: "ch",
     //    format: "Y-m-d",
     //    timepicker:false,
     //    todayButton:false
	// })

	//续费按钮点击
	$('.renewBtn').click(function(){
		var ids = $('#rpGrid').jqGrid('getGridParam', 'selarrrow');
		if(ids.length > 1){
			$.zxsaas_plus.showalert('warning','只能选择一条要续费的“会员客户”')
		}else{
			if(ids.length <1){
				return
			}else{
				getOneData(ids,function (data) {
					if(data.invalidDate != null && data.invalidDate != ''){
						$('#vipRenewModal').writeJson2Dom(data)
						$('#renewRemark,.renewMoney').val('')
						$('#renewVipBtn').data('id',data.id)
						$('#renewVipPrice').val(data.vipPrice + '元/年')
						$('#renewPrice,.renewIncome').val(data.vipPrice)
						$('#renewSectionName').val(secName).data('id',secDateId);
                        $('#renewCreateMan').val(unitName).data('id',unitId);
                        getPay(secDateId,xfpay);

                        var dateArr = data.invalidDateString.split('-')
                        var yearVal = dateArr[0]*1
                        var mouthVal = dateArr[1]*1 + data.vipValidityDate
                        if(mouthVal > 12){
                            yearVal+= parseInt(mouthVal/12) - (mouthVal-(12*parseInt(mouthVal/12)) == 0 ? 1 : 0 )
                            mouthVal=mouthVal-(12*parseInt(mouthVal/12)) == 0 ? dateArr[1]*1 : mouthVal-(12*parseInt(mouthVal/12))
                        }
                        var dateVal = yearVal+'-'+mouthVal+'-'+dateArr[2]
                        $('#renewCloseDate').datetimepicker({
                            lang: "ch",
                            format: "Y-m-d",
                            timepicker: false,
                            todayButton: false,
                            value:dateVal
                        })

						$('#vipRenewModal').modal('show')
					}else{
						$.zxsaas_plus.showalert('warning','所选择的客户没有期限限制，无需续费')
					}
				})
			}
		}

	})

	$('#renewPrice').change(function(){
        $('.renewIncome').val($(this).val());
	})

	//删除操作
	$('.deleteBtn').bind('click',function(){
		var ids = $('#rpGrid').jqGrid('getGridParam', 'selarrrow');
		if(ids.length<1){
			return
		}

		$.ajax({
			url:'/manager/inventory/vip/info/deleteVipInfo',
			type:'post',
			dataType:'json',
			traditional: true,
			data:{
				'ids':ids
			},
			success:function (data) {
				if(data.result == 1){
					$.zxsaas_plus.showalert('success','删除客户资料成功');
					setTimeout(function(){
						$('#rpGrid').trigger("reloadGrid")
					},1500)
				}else{
					$.zxsaas_plus.showalert('error',data.desc);
				}
			}
		})

	})

	//启用操作
	// $('.commissioningBtn').bind('click',function(){
	// 	commissioningOrdisable(0)
	// })
	//禁用操作
	// $('.disableBtn').bind('click',function(){
	// 	commissioningOrdisable(1)
	// })

	function commissioningOrdisable (state){
		var ids = $('#rpGrid').jqGrid('getGridParam', 'selarrrow');
		if(ids.length<1){
			return
		}
		$.ajax({
			url:'/manager/inventory/vip/card/updateVipInfoState',
			type:'post',
			dataType:'json',
			traditional: true,
			data:{
				'ids':ids,
				'state':state
			},
			success:function (data) {
				if(data.result == 1){
					$.zxsaas_plus.showalert('success',(state ? '禁用' : '启用')+'客户资料成功');
					setTimeout(function(){
						$('#rpGrid').trigger("reloadGrid")
					},1500)
				}else{
					$.zxsaas_plus.showalert('error',data.desc);
				}
			}
		})

	}

	//换卡操作
	$('.changeCardBtn').click(function () {
		var ids = $('#rpGrid').jqGrid('getGridParam', 'selarrrow');
		if(ids.length<1){
			return
		}else{
			if(ids.length > 1){
				$.zxsaas_plus.showalert('warning','一次只能操作一条数据')
			}else{
				var info = $('#rpGrid').getRowData(ids)
				$('#changeCardModal').writeJson2Dom(info)
				$('#newVipCardNum').val('');
				$('#changeCardModal').modal('show');
			}
		}
	})
	//确认换卡
	$('#sureChangBtn').click(function () {
		if($('#newVipCardNum').val().trim() == ''){
			return
		}
		$.ajax({
			url:'/manager/inventory/vip/info/changeCard ',
			type:'post',
			dataType:'json',
			traditional: true,
			data:{
				'id':$('#rpGrid').jqGrid('getGridParam', 'selarrrow'),
				'cardNum':$('#newVipCardNum').val().trim()
			},
			success:function (data) {
				if(data.result == 1){
					$.zxsaas_plus.showalert('success','换卡成功');
					setTimeout(function(){
						$('#changeCardModal').modal('hide');
						$('#rpGrid').trigger("reloadGrid")
					},1500)
				}else{
					$.zxsaas_plus.showalert('error',data.desc);
				}
			}
		})
	})

    //注销会员
    $('.cancellationCardBtn').bind('click',function(){
        var ids = $('#rpGrid').jqGrid('getGridParam', 'selarrrow');
        if(ids.length<1){
            $.zxsaas_plus.showalert('提示','请选择一条表格数据');
            return
        }

        $.ajax({
            url:'/manager/inventory/vip/info/cancelVip',
            type:'post',
            dataType:'json',
            traditional: true,
            data:{
                'ids':ids
            },
            success:function (data) {
                if(data.result == 1){
                    $.zxsaas_plus.showalert('success','注销会员成功');
                    setTimeout(function(){
                        $('#rpGrid').trigger("reloadGrid")
                    },1500)
                }else{
                    $.zxsaas_plus.showalert('error',data.desc);
                }
            }
        })

    })

//变更会员会员类型
    $('#changeTypeName').combobox({
        id: 'changeTypeNameTree',
        url: basePath + '/inventory/vip/type/selectAllList',
        param: {},
        checkType:'radio',
        placeholder: '会员类型',
        callback: function (id) {
            $.ajax({
                url:'/manager/inventory/vip/type/selectOne',
                type:'post',
                dataType:'json',
                data:{id:id},
                success:function (data) {
                    var amount = data.data.data.amount
					$('#changeAmount').val(amount);
                }
            })
        }
    })

//变更会员办理门店
    $('#changeHandleSection').modalsbox({
        grid: {
            id: 'section13',
            url: basePath + "/component/section/getAccessSectionVoPageList",
            param: {
                'sectionIsStore': 1
            }
        },
        // tree: {
        //     id: 'section13NameTree',
        //     url: basePath + "/component/section/getAccessSectionTreeNodeVoList",
        //     param: {
        //         'sectionIsStore': 1
        //     }
        // },
        multiselect: false,
        placeholder: '办理门店',
		callback: function (opt) {
            getPay(opt.dataId,bgpay);
        }
    })

//变更会员办理日期
    $('#changeHandleDate').datetimepicker({
        lang: "ch",
        format: "Y-m-d",
        timepicker: false,
        todayButton: false,
        value:sysDate
    })

//变更会员经手人
    $('#changeEmployee').modalsbox({
        grid: {
            id: 'section32',
            url: basePath + "/component/employee/getCompanyEmployeeVoList",
            param: {'empIsOperator':1}
        },
        multiselect: false,
        placeholder: '经手人'
    })

    //变更会员卡类型
    $('.changeVipType').click(function () {
        var ids = $('#rpGrid').jqGrid('getGridParam', 'selarrrow');
        if(ids.length<1){
            return
        }else{
            if(ids.length > 1){
                $.zxsaas_plus.showalert('warning','一次只能操作一条数据')
            }else{
            	$('#changeTypeName').val('').data('id','');
                var tree1 = $.fn.zTree.getZTreeObj("changeTypeNameTree");
                if(tree1 !== null) {
                    var nodes = tree1.getSelectedNodes();
                    tree1.checkNode(nodes);
                }
                $.ajax({
                    url:'/manager/inventory/vip/info/selectOne',
                    type:'post',
                    dataType:'json',
                    traditional: true,
                    data:{
                        'id':ids
                    },
                    success:function (data) {
                        var info = data.data.obj
						$('#changeVipBtn').data('id',info.id).attr('cardtypeId',info.cardtypeId);
                        $('#changeVipModal').writeJson2Dom(info)
						$('#changePrice').val('');
                        $('#changeTypeName').val(info.cardTypeName).data('id',info.cardtypeId);
                        $('#changeHandleSection').val(secName).data('id',secDateId);
                        $('#changeEmployee').val(userName).data('id',userId);
                        $('#changeEffectDate').datetimepicker({
                            lang: "ch",
                            format: "Y-m-d",
                            timepicker: false,
                            todayButton: false,
                            value: info.invalidDateString
                        })
						getPay(secDateId,bgpay);
                        $('#changeVipModal').modal('show');
                    }
                })

            }
        }
    })

	// 变更会员类型保存
	$('#changeVipBtn').click(function(){
        var  mustValue = $('#changeVipModal .mustValue');
        if(!testMustValue(mustValue,true)){return}
        var ys = $('#changePrice').val()*1;
        var ss = $('.code_blss').text()*1;
		var num = 0;
		num+= $('#bgcash').val()*1;
		num+= $('#bgalipay').val()*1;
		num+= $('#bgweChat').val()*1;
		num+= $('#bgpos').val()*1;
		num+= $('#bgother').val()*1;
        if(ys == num && ys !== 0){
            var obj = getChangeVip();
            if(obj.cardtypeId == $('#changeVipBtn').attr('cardtypeId')){
                $.zxsaas_plus.showalert('warning','未变更会员类型！');
            	return
			}
            obj.id = $('#changeVipBtn').data('id');
            $.request({
                type:'POST',
                url:'/manager/inventory/vip/info/updateCardType',
                dataType:'json',
                contentType: "application/json",
                data:JSON.stringify(obj),
                success:function(data){
                    $('#startCode').text('开始扫码');
                    $('#codeModal .red').hide();
                    if(data.result==1||data.result==-2||data.result==2){
                        $('#codeModal').modal('hide');
                        $('#changeVipModal').modal('hide');
                        $.zxsaas_plus.showalert('success',data.desc);
                        setTimeout(function(){
                            $('#rpGrid').trigger("reloadGrid")
                        },1500)
                    }else{
                        $('.codeInp').val('');
                        $.zxsaas_plus.showalert('error',data.desc);
                    }
                },
            })
        }else{
            $.zxsaas_plus.showalert('warning','请填写正确的应收与实收价格');
        }
    })

// 变更会员扫码
	$('#changeVipCode').click(function(){
        var  mustValue = $('#changeVipModal .mustValue');
        if(!testMustValue(mustValue,true)){return}
        if($('#changeTypeName').data('id') == $('#changeVipBtn').attr('cardtypeId')){
            $.zxsaas_plus.showalert('warning','未变更会员类型！');
            return
        }
        $('.codeTop').show();
        $('.blcodeTop').hide();
        var ys = $('#changePrice').val()*1;
        var ss = $('.code_ss').text()*1;
        var money = ys -ss;
        if(money <=0){
            $.zxsaas_plus.showalert('warning','请填写正确应收价格！');
            return
		}
        $('.code_ys').text(ys)
        $('.codeMoney').val(money.toFixed(2));
        $('#startCode').text('开始扫码').attr('name','bg');
        $('#codeModal .red').hide();
        $('#codeModal').modal('show');
    })

    // 变更会员pos账户支付
    $("#bgpos").focus(function(){
        if($(this).data('show') == "true"){
            $(".bgposDiv").show();
            $(".bgotherDiv").hide();
            var h = $(".bgposDiv").height() + 60;
            $(".bgposDiv").css('top',"-"+ h +"px");
        }
    })

    $("#bgposSure").click(function(){
        $(".bgposDiv").hide();
        var num = 0;
        $(".bgposval").each(function(){
            num+= $(this).val()*1;
        })
        $('#bgpos').val(num.toFixed(2));
        $('.bginp').change();
    })

    $('#bgposNone').click(function(){
        $(".bgposDiv").hide();
    })

// 变更会员其他账户支付
    $("#bgother").focus(function(){
        if($(this).data('show') == "true"){
            $(".bgotherDiv").show();
            $(".bgposDiv").hide();
            var h = $(".bgotherDiv").height() + 60;
            $(".bgotherDiv").css('top',"-"+ h +"px");
        }
    })

    $("#bgotherSure").click(function(){
        $(".bgotherDiv").hide();
        var num = 0;
        $(".bgotherval").each(function(){
            num+= $(this).val()*1;
        })
        $('#bgother').val(num.toFixed(2));
        $('.bginp').change();
    })

    $('#bgotherNone').click(function(){
        $(".bgotherDiv").hide();
    })

    $('.bginp').change(function(){
        var num = 0;
        $('.bginp').each(function(){
            var v = $(this).val()*1;
            num+= v;
        })
		num+= $('#bgpos').val()*1;
        num+= $('#bgother').val()*1;
        $('.code_ss').text(num.toFixed(2));
    })

})

//获取单条数据方法（通过请求后台数据）,
function getOneData (id,doSomeThing){
	$.ajax({
		url:'/manager/inventory/vip/info/selectOne',
		type:'post',
		dataType:'json',
		data:{id:id},
		traditional: true,
		success:function (data) {
			doSomeThing(data.data.obj)
		}
	})
}
//新增或修改客户资料
function updateCustomerInfo(id) {
	var  mustValue = $('#addCustomerModal .mustValue');
	if(!testMustValue(mustValue,true)){return}
	var obj = $('#addCustomerModal').toJsonObject();
	obj.fzrType = $('#fzrType').val();
	obj.fzrId = $('#fzrId').data('id') == '' ? '' : $('#fzrId').data('id')*1;
	obj.grade = $('#grade').val()*1;
	obj.sex = $('#addCustomerModal input[name="sex"]:checked').val();
	obj.classLabelId = $('#classLabelId').data('id') == '' ? '' : $('#classLabelId').data('id')*1;
	obj.sectionId = $('#sectionIdAdd').data('id')*1;
	obj.id = id
	$.request({
		type: 'POST',
		url: '/manager/inventory/vip/info/save',
		type: "POST",
		datatype: "json",
		contentType: "application/json",
		data: JSON.stringify(obj),
		traditional: true,
		success: function (data) {
			if (data.result == 1) {

				$("#rpGrid").trigger("reloadGrid");
				$.zxsaas_plus.showalert("success", data.desc);
				setTimeout(function(){
					$("#addCustomerModal").modal('hide');
					$("#addCustomerModal").cleanAllObj();

				},1500)

			} else {
				$.zxsaas_plus.showalert("error", data.desc);
			}
		},
		error: function (msg) {
		}
	});
}
//查看客户类型详情方法
function showVipTypeInfo(e){

	var code = $(e).data('code');
	var name = $(e).data('name');
	var remark = $(e).data('remark');
	var id= $(e).data('id');
	$("#S_code").val(code);
	$("#S_name").val(name);
	$("#S_remark").val(remark);
	$("#S_id").val(id);
}
//删除客户类型方法
function deleteVipType(e) {
	var dId = $(e).data('id');//获取数据的id
	//调用接口删除数据
	$.zxsaas_plus.showconfirm("提示", "是否确定删除此条数据?", function () {
		$.request({
			url: '/manager/member/customer/deleteClassLabel',
			type: "POST",
			data:{"id":dId},
			traditional: true,
			success: function (data) {
				$.zxsaas_plus.showalert("提示",data.desc);
				$("#vipTypeGrid").trigger("reloadGrid");

			},
			error: function (msg) {

			}
		});
	}, function () {

	});

}
//验证必填
function testMustValue(data,flag) {
	if(flag){
		var testResult = true
		$.each(data,function (k,v) {
			$(v).bind('change',function(){
				$(this).removeClass('mustValueError')
			})
			if($(v).val().trim() == '' || $(v).data('id') == ''){
				$(v).addClass('mustValueError')
				testResult = false
			}
		})
		return testResult
	}else{
		$.each(data,function (k,v) {
			$(v).removeClass('mustValueError')
		})
	}

}
//只能输入数字
function getnum(obj) {
	obj.value = obj.value.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
	obj.value = obj.value.replace(/^\./g, ""); //验证第一个字符是数字
	obj.value = obj.value.replace(/\.{2,}/g, "."); //只保留第一个, 清除多余的
	obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
	obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两个小数
}
// 日月格式
function getday(opt){
    var v = opt.value;
    v = v.replace(/[^\d,，。-]/g, "");
    v = v.replace(/,/g,'-');
    v = v.replace(/，/g,'-');
    v = v.replace(/。/g,'-');
    opt.value = v;
}


//重置
function resetFun() {
	$('#searchQuery')[0].reset()
	$('#searchQuery input').data('id', '')
	$('#startPeriod,#endPeriod').val('').prop('disabled', true)
	$('#startDate,#endDate').prop('disabled', false)
    var tree1 = $.fn.zTree.getZTreeObj("memberTypeTree");
	if(tree1 !== null) {
        tree1.checkAllNodes(false);
    }
    var tree2 = $.fn.zTree.getZTreeObj("customerClassTree");
    if(tree2 !== null){
        tree2.checkAllNodes(false);
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
			'projectId':projectId,
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
				autowidth: true,
				rownumbers: true, // show row numbers
				rownumWidth: 50, // the width of the row numbers columns
				width: "100%",
				height: $(window).height() * 0.5,
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

var blpay = {
	inp: '.blinp',
	pos: '#blpos',
    other: '#blother',
	cash: '#blcash',
	alipay: '#blalipay',
	weChat: '#blweChat',
	codeBtn: '#receiptBtn',
    posid: 'blposid',
    posval: 'blposval',
    otherid: 'blotherid',
    otherval: 'blotherval',
    posTab: '#blposTab',
    otherTab: '#blotherTab',
}

var xfpay = {
    inp: '.xfinp',
    pos: '#xfpos',
    other: '#xfother',
    cash: '#xfcash',
    alipay: '#xfalipay',
    weChat: '#xfweChat',
    codeBtn: '#renewCode',
    posid: 'xfposid',
    posval: 'xfposval',
    otherid: 'xfotherid',
    otherval: 'xfotherval',
    posTab: '#xfposTab',
    otherTab: '#xfotherTab',
}

var bgpay = {
    inp: '.bginp',
    pos: '#bgpos',
    other: '#bgother',
    cash: '#bgcash',
    alipay: '#bgalipay',
    weChat: '#bgweChat',
    codeBtn: '#changeVipCode',
    posid: 'bgposid',
    posval: 'bgposval',
    otherid: 'bgotherid',
    otherval: 'bgotherval',
    posTab: '#bgposTab',
    otherTab: '#bgotherTab',
}

// 获取资金账户
function getPay(id,pay){
    $.request({
        type: 'post',
        url: "/manager/inventory/retail/cashier/findAccountList",
        data:{
            'sectionId': id
        },
        dataType: "json",
        success: function(data) {
            if(data.result == 1){
                var list = data.data.accountList;
                var postr = "";
                var otherstr = "";
                $(pay.inp +','+ pay.pos +','+ pay.other).val('');
                $(pay.cash+','+pay.alipay+','+pay.weChat+','+pay.CodeBtn).attr("disabled",true);
                var num = {a1 : 0,a2 : 0,a3 : 0,a4 : 0,a5 : 0,a6: 0};
                if(list.length == undefined){
                    return
                }
                for(var i =0;i<list.length;i++){
                    var n = list[i].accountType*1;
                    switch(n){
                        case 1:
                            num.a1++;
                            $(pay.cash).data("id",list[i].accountId);
                            $(pay.cash).data('accountType',list[i].accountType);
                            $(pay.cash).attr("disabled",false);
                            break;
                        case 2:
                            num.a2++;
                            $(pay.pos).data("id",list[i].accountId);
                            $(pay.pos).data("accountType",list[i].accountType);
                            postr += '<tr><td>'+ num.a2 +'</td><td class='+ pay.posid + ' data-id='+ list[i].accountId +'>'+ list[i].accountName +
                                '</td><td><input type="text" class="form-control '+ pay.posval +'" onkeyup="getnum(this)" ></td></tr>';
                            break;
                        case 4:
                            num.a4++;
                            $(pay.alipay).data("id",list[i].accountId);
                            $(pay.alipay).data("accountType",list[i].accountType);
                            $(pay.alipay).attr("disabled",false);
                            break;
                        case 3:
                            num.a3++;
                            $(pay.weChat).data("id",list[i].accountId);
                            $(pay.weChat).data("accountType",list[i].accountType);
                            $(pay.weChat).attr("disabled",false);
                            break;
                        case 5:
                            num.a5++;
                            $(pay.other).data("id",list[i].accountId);
                            $(pay.other).data("accountType",list[i].accountType);
                            otherstr += '<tr><td>'+ num.a5 +'</td><td class='+ pay.otherid +' data-id='+ list[i].accountId +'>'+ list[i].accountName +
                                '</td><td><input type="text" class="form-control '+ pay.otherval +'" onkeyup="getnum(this)" ></td></tr>';
                            break;
                        case 8:
                            num.a6++;
                            $(pay.codeBtn).data("id",list[i].accountId);
                            $(pay.codeBtn).data("accountType",list[i].accountType);
                            $(pay.codeBtn).attr("disabled",false);
                            break;
                        default:
                            break;
                    }
                }
                $(pay.posTab +' tbody').html(postr);
                $(pay.otherTab + ' tbody').html(otherstr);
                if(num.a2 == 0){
                    $(pay.pos).data('show','false');
                }else{
                    $(pay.pos).data('show','true');
                }
                if(num.a5 == 0){
                    $(pay.other).data('show','false');
                }else{
                    $(pay.other).data('show','true');
                }
                if(num.a6 == 0){
                    $(pay.codeBtn).attr('disabled',true);
                }else{
                    $(pay.codeBtn).data('disabled',false);
                }
            }else{
                $.zxsaas_plus.showalert('提示',data.desc);
            }
        }
    });
}

function getCreatVipVal(){
	var obj = $('#addVipModal').toJsonObject();
    obj.cardtypeId = $('#vipCardtypeId').data('id')*1;
    obj.sex = $('#addVipBox input[name="sex"]:checked').val();
    obj.grade = $('#vipgrade').val()*1;
    obj.sectionId = $('#vipSectionId').data('id')*1;
    obj.contactUnitid = $('#vipContactUnitid').data('id')*1;
    obj.handleSection = $('#handleSection').data('id')*1;
    obj.fcardEmployeeid = $('#fcardEmployeeid').data('id')*1;
    obj.fzrType = $('#vipFzrType').val();
    obj.fzrId = $('#vipFzrId').data('id') == undefined?'':$('#vipFzrId').data('id')*1;
    obj.classLabelId = $('#vipClassLabelId').data('id')*1;
    obj.score = obj.score == '' ? 0 : obj.score*1;
    if($('#vipPriceBox').is(':visible')){
        obj.payList = getVipPrice(blpay);
    }
    return obj
}

function getRenewVip(){
    var obj = {
        sectionId: $('#renewSectionName').data('id')*1,
        fcardEmployeeid: $('#renewCreateMan').data('id')*1,
        billsDate: $('#renewDate').val(),
        invalidDate: $('#renewCloseDate').val(),
        remark: $('#renewRemark').val(),
        payList: getVipPrice(xfpay),
	}
	return obj
}

function getChangeVip(){
    var obj = {
        cardtypeId: $('#changeTypeName').data('id')*1,
        sectionId: $('#changeHandleSection').data('id')*1,
        fcardEmployeeid: $('#changeEmployee').data('id')*1,
        handleDate : $('#changeHandleDate').val(),
        invalidDate: $('#changeEffectDate').val(),
        payList: getVipPrice(bgpay),
    }
    return obj
}

function getVipPrice(pay){
    var arr = [];
    $(pay.inp).each(function(i,v){
        var val = $(v).val();
        if(val > 0){
            var opt = {
                accountId: $(v).data('id'),
                accountType: $(v).data('accountType')*1,
                payreceiptAmout: val*1,
            }
            arr.push(opt);
        }
    })
    if($('.'+pay.posval).length>0){
        $(pay.posTab+" tbody tr").each(function(i,item){
            if($(item).find('.'+pay.posval).val() > 0){
                var opt = {
                    accountId : $(item).find('.'+pay.posid).data("id"),
                    accountType : $(pay.pos).data("accountType")*1,
                    payreceiptAmout : $(item).find('.'+pay.posval).val()*1,
                };
                arr.push(opt);
            }
        });
    }
    if($('.'+pay.otherval).length>0){
        $(pay.otherTab+" tbody tr").each(function(i,item){
            if($(item).find('.'+pay.otherval).val().trim() > 0){
                var opt = {
                    accountId : $(item).find('.'+pay.otherid).data("id"),
                    accountType : $(pay.other).data("accountType")*1,
                    payreceiptAmout : $(item).find('.'+pay.otherval).val()*1,
                };
                arr.push(opt);
            }
        });
    }
    return arr
}