$(function () {
	$.jgrid.defaults.width = 1280;
	$.jgrid.defaults.responsive = true;
	$.jgrid.defaults.styleUI = 'Bootstrap';
	//点击更多条件显示隐藏相关条件
	$('.moreTerm').click(function(){
		$('#moreTermList').toggle()
		$('.moreTermIcon').toggle()
	})
	var start , end ;
	//凭证日期
	
	var news =new Date($.ajax({async: false}).getResponseHeader("Date"));
	var oneday = new Date($.ajax({async: false}).getResponseHeader("Date"));
	oneday.setDate(1);
	var ones = oneday.getFullYear()+"-"+("00"+(oneday.getMonth()+1)).substr(-2)+"-"+("00"+oneday.getDate()).substr(-2);
	var today = news.getFullYear()+"-"+("00"+(news.getMonth()+1)).substr(-2)+"-"+("00"+news.getDate()).substr(-2);
	
	$('#startDate').datetimepicker({
        lang: "ch",
        format: "Y-m-d",
        value: ones,
        timepicker: false,
        todayButton: false,
    });
	$('#endDate').datetimepicker({
        lang: "ch",
        format: "Y-m-d",
        value: today,
        timepicker: false,
        todayButton: false,
    });
	// $('#startDate').datePlu({
	// 	dateEnd:"#endDate",
	// 	endDate:true,
	// 	minTime: "1970-01-01",
	// 	ifPermissions:false
    //
	// })
		// .on('changeMonth', function(ev){
	//
	// 		if(ev.currentTarget.id == 'startDate'){
	// 			if($('#endDate').val() != ''){
	// 				end = parseInt($('#endDate').val());
	// 				start = parseInt(new Date(ev.date.valueOf()).toISOString().slice(0,7).replace('-',''))
	// 				$('#startDate,#endDate').datetimepicker('setStartDate', start);
	// 			}
	// 		}else{
	// 			if($('#startDate').val() != '') {
	// 				start = parseInt($('#startDate').val());
	// 				end = parseInt(new Date(ev.date.valueOf()).toISOString().slice(0, 7).replace('-', ''))
	// 			}
	// 		}
	//
	// }).on('outOfRange',function(ev){
	// 	if(start > end){
	//
	// 		$.zxsaas_plus.showalert('提示','凭证结束日期应大于凭证开始日期')
	// 		$('#endDate').val('')
	// 		return false
	// 	}
	//
	// });
	//会计期间

	$("#startPeriod").comDateAccounting({
		endDateId:"#endPeriod"
	})

	$('#sortMonthInput').comDateAccounting()

	$('#reverseMonthInput').datePlu({

		minTime: "1970-01-01",
		ifPermissions:false

	})

	// 	.on('changeMonth', function(ev){
	// 	if($('#startPeriod').val() != '' && $('#endPeriod').val() != ''){
	// 		var start = parseInt($('#startPeriod').val());
	// 		var end = parseInt($('#endPeriod').val());
	// 		if(start > end){
	// 			$('#endPeriod').val('')
	// 			$.zxsaas_plus.showalert('提示','会计结束日期应大于会计开始日期')
	// 		}
	// 	}
	// });

	//凭证日期和会计期间切换
	$("input[name='timeSection']").change(function () {

		if($(this).attr('id') == 'creatDate'){
			$('#startPeriod,#endPeriod').val('').prop('disabled',true)
			$('#startDate,#endDate').prop('disabled',false)
		}else{
			$('#startDate,#endDate').val('').prop('disabled',true)
			$('#startPeriod,#endPeriod').prop('disabled',false)
		}

	})

	//凭证来源
	$('#voucherFrom').combobox({
		id: 'voucherFromTree',
		url: basePath + '/finance/common/getVoucherSourceList',
		param: {

		},
		placeholder: '请选择凭证来源',
		checkType:'radio'
	})
	//业务部门
	$('#operatingDepartment').combobox({
		id: 'operatingDepartmentTree',
		url: basePath + '/component/section/getAllSectionTreeNodeVoList',
		param: {

		},
		placeholder: '请选择业务部门'
	})
	//辅助部门
	$('#auxiliaryDepartment').combobox({
		id: 'auxiliaryDepartmentTree',
		url: basePath + '/component/section/getAllSectionTreeNodeVoList',
		param: {

		},
		placeholder: '请选择辅助部门'
	})
	//往来单位
	$('#contactsUnitName').modalsbox({
		grid:{
			id:'contactUnits',
			url: basePath+"/component/contactUnit/getContactUnitVoPageList",
			param:{

				'containsDisable':$('.ifContainsDisable').is(':checked') ? "1" : '0'
			}
		},
		tree:{
			id:'contactsUnitNameTree',
			url:basePath+"/component/contactUnit/getContactUnitClassTreeNodeVoList",

		},
		placeholder:'请选择往来单位'

	})
	//制单人
	$('#OperatorBusinessInput').modalsbox({
		grid:{
			id:'createMan',
			url: basePath + '/component/employee/getCompanyEmployeeVoList',
			param:{
				'empIsOperator':'1'
			}
		},
		placeholder:'制单人'
	})
	//职员
	$('#employee').modalsbox({
		grid:{
			id:'operator',
			url: basePath + '/component/employee/getCompanyEmployeeVoList',
			param:{
				'empIsOperator':'2'
			}
		},
		placeholder:'职员'
	})

	//新增
	$('#B_PZGL_0001').click(function(){
		window.top.openWorkBoxByMenutext('填制凭证','/manager/cw/test/voucher?',true)
	})

	//审核
	$('#B_PZGL_0002').click(function(){
		auditFun('/manager/finance/voucher/manager/auditBatch','审核')
	})

	//弃审
	$('#B_PZGL_0003').click(function(){
		auditFun('/manager/finance/voucher/manager/cancelAuditBatch','弃审')
	})

	//删除
	$('#B_PZGL_0004').click(function(){
		$('.gridBox').hide()
		$('.descBox').hide()
		$('.ifSortDocNo').prop('checked',true)
		var ids=$('#rpGrid').jqGrid('getGridParam','selarrrow');
		if(ids.length > 0 ){
			$('.delBox').show();
			$('.sortBox').hide();
			$('#delModal').modal('show');
			$('#delBtn').unbind('click').on('click',function () {
				$('.delBox').hide();
				$('.sortBox').hide();
				var isSortNo = 0;
				if($('.ifSortDocNo').is(':checked')){
					isSortNo = 1
				}
				auditFun('/manager/finance/voucher/manager/deleteBatch','删除',{isSortNo:isSortNo})

			})
		}else{
			$.zxsaas_plus.showalert('提示','请先选择要删除的凭证')
		}


	})

	//复制
	$('#B_PZGL_0006').click(function(){
		var ids=$('#rpGrid').jqGrid('getGridParam','selarrrow');
		if(ids.length > 0 ){
			if(ids.length > 1){
				$.zxsaas_plus.showalert('提示','只能复制一条凭证')
			}else{
				var info = $("#rpGrid").getRowData(ids)
				window.top.openWorkBoxByMenutext('填制凭证','/manager/cw/test/voucher?voucherId='+info.billsId,true)
			}

		}else{
			$.zxsaas_plus.showalert('提示','请先选择要复制的凭证')
		}


	})

	//批量作废
	$('#B_PZGL_0008').click(function(){
		auditFun('/manager/finance/voucher/manager/cancelBatch','作废')
	})

	//批量取消作废
	$('#B_PZGL_0009').click(function(){
		auditFun('/manager/finance/voucher/manager/cancelCancelBatch','取消作废')
	})

	//出纳签字
	$('#B_PZGL_0010').click(function(){
		auditFun('/manager/finance/voucher/manager/cashierSignBatch','出纳签字')
	})

	//取消出纳签字
	$('#B_PZGL_0011').click(function(){
		auditFun('/manager/finance/voucher/manager/cancelCashierSignBatch','取消出纳签字')
	})
	//主管签字
	$('#B_PZGL_0012').click(function(){
		auditFun('/manager/finance/voucher/manager/supervisorSignBatch','主管签字')
	})

	//取消主管签字
	$('#B_PZGL_0013').click(function(){
		auditFun('/manager/finance/voucher/manager/cancelSupervisorSignBatch','取消主管签字')
	})
	//标错
	$('#B_PZGL_0014').click(function(){
		auditFun('/manager/finance/voucher/manager/signWrongBatch','标错')
	})

	//取消标错
	$('#B_PZGL_0015').click(function(){
		auditFun('/manager/finance/voucher/manager/cancelSignWrongBatch','取消标错')
	})

	//断号整理
	$('#B_PZGL_0016').click(function(){
		$('.delBox').hide();
		$('.sortBox').show();
		$('.sortBox label').text('整理月份:');
		$('#sortMonthInput').show()
		$('#reverseMonthInput').hide()
		$('.gridBox').hide()
		$('.descBox').hide()
		$('#delModal').modal('show');

		$('#delBtn').unbind('click').on('click',function () {
			// var params = {isClickDel:1,sortDateStr:$("#sortMonthInput").val()}
			// auditFun('/manager/finance/voucher/manager/sortDocNo','断号整理',params)
			$.ajax({
				url:'/manager/finance/voucher/manager/sortDocNo',
				type:'post',
				dataType:'json',
				data:{
					isClickDel:1,
					sortDateStr:$("#sortMonthInput").val()
				},
				success:function (data) {

					$('#delModal').modal('hide');
					$.zxsaas_plus.showalert('提示',data.desc,function () {
						$('#rpGrid').jqGrid('setGridParam', {
							// page:1
						}).trigger("reloadGrid");
					})

				}
			})
		})


	})

	//冲销
	$('#B_PZGL_0007').click(function(){
		var ids=$('#rpGrid').jqGrid('getGridParam','selarrrow');
		if(ids.length > 0 ){
			if(ids.length > 1){
				$.zxsaas_plus.showalert('提示','只能冲销一条凭证')
			}else{
				$('.delBox').hide();
				$('.gridBox').hide()
				$('.descBox').hide()
				$('.sortBox').show();
				$('.sortBox label').text('冲销日期:');
				$('#sortMonthInput').hide()
				$('#reverseMonthInput').show()

				$('#delModal').modal('show');
				$('#delBtn').unbind('click').on('click',function () {
					var info = $("#rpGrid").getRowData(ids)
					var params = {reverseDate:$("#reverseMonthInput").val(),voucherId:info.billsId}

					$('#delModal').modal('hide');
					$.ajax({
						url:'/manager/finance/voucher/manager/reverse',
						type:'post',
						dataType:'json',
						data:params,
						success:function (data) {

							$('#delModal').modal('hide');
							$.zxsaas_plus.showalert('提示',data.desc,function () {
								$('#rpGrid').jqGrid('setGridParam', {
									// page:1
								}).trigger("reloadGrid");
							})

						}
					})
				})

			}

		}else{
			$.zxsaas_plus.showalert('提示','请先选择要冲销的凭证')
		}
	})

	//打印凭证
	$('#print').click(function(){
		var rows = $('#rpGrid').jqGrid('getGridParam','selarrrow');
		var ids = "";
		if(rows.length > 0 ) {
			var infoArr = [];
			$.each(rows, function (k, v) {
				var info = $("#rpGrid").getRowData(v)
				infoArr.push(info.billsId)
			});
			ids = infoArr.join(',');  //凭证单号
		}
		if ( ifCheckAll ) { //勾选全部
			ids = allBillsId;
		}
		var startDate = $('#startDate').val().substr(0,7);
		var endDate = $('#endDate').val().substr(0,7);
		var printObj = new comProofPrintModal();
		printObj.setOption({
			ids: ids,
			startDate: startDate,
			endDate: endDate
		})
		printObj.reLoadDom();
		printObj.showModal();
	})

	function auditFun (url,marked,param){
		$('.gridBox').hide()
		$('.delBox').hide();
		$('.sortBox').hide();
		$('.checkBoxInfo').hide()
		$('.checkinfoBox').show()
		$('.hasCheckedBox').hide()
		var ids=$('#rpGrid').jqGrid('getGridParam','selarrrow');
		var params ={}
		params = $.extend({},params,param)
		if(ids.length > 0 ){
			var infoArr = []
			$.each(ids,function(k,v){
				var info = $("#rpGrid").getRowData(v)
				infoArr.push(info.billsId)
			})

			if(ifCheckAll){
				params.voucherIds = allBillsId
			}else{
				params.voucherIds = infoArr.sort(function(a,b){return a-b}).join(',')
			}


			$('#subGrid').jqGrid('setGridParam', {
				url:url,
				postData:params
			}).trigger("reloadGrid");

		}else{
			$.zxsaas_plus.showalert('提示','请先选择要'+marked+'的凭证')
		}


	}

	$('#startMoney').blur(function () {
		if ($('#endMoney').val().trim() !== '' && $('#startMoney').val().trim() !== '') {
			testAmount()
		}

	})

	$('#endMoney').blur(function () {
		if ($('#startMoney').val().trim() !== '' && $('#endMoney').val().trim() !== '') {
			testAmount()
		}
	})




	function testAmount() {
		if (accSubtr($('#endMoney').val().trim(), $('#startMoney').val().trim()) * 1 >= 0) {
			return true;
		} else {
			$.zxsaas_plus.showalert("提示", "结束金额小于开始金额，请重新输入!");
			$('#endMoney').val('');
			return false
		}
	}


	//tab切换
	$('#gridType li').click(function(){
		$(this).removeClass('activeType').addClass('activeType');
		$(this).siblings().removeClass('activeType');
		$('.checkBoxInfo').hide()
		$('.checkinfoBox').show()
		$('.hasCheckedBox').hide()
		ifCheckAll = false;
		$('#rpGrid').jqGrid('setGridParam', {
			//搞不懂他为什么传一个page=1
			//url: "/manager/finance/voucher/manager/getVoucherManagerOrderVoPageList?page=1",
            url: "/manager/finance/voucher/manager/getVoucherManagerOrderVoPageList",
			page:1,
			postData: {
				startVoucherDate: $('#creatDate').is(':checked') ? $('#startDate').val() : '',
				endVoucherDate:  $('#creatDate').is(':checked') ?  $('#endDate').val() : '',
				startAccountingPeriod:  $('#accountingPeriod').is(':checked') ?  $('#startPeriod').val() : '',
				endAccountingPeriod: $('#accountingPeriod').is(':checked') ?  $('#endPeriod').val() : '',
				startVoucherNumber: $('#startNum').val(),
				endVoucherNumber: $('#endNum').val(),
				voucherSource: $('#voucherFrom').data('id'),
				allocateFlowsStatus: $("input[name='flowAllocating']:checked").val(),
				tallyStatus: $("input[name='chargeState']:checked").val(),
				auditStatus: $("input[name='auditState']:checked").val(),
				cancelStatus: $("input[name='cancellationState']:checked").val(),
				signWrongStatus:$("input[name='wrongState']:checked").val(),
				direction:$("input[name='directionState']:checked").val(),
				startAmount:$('#startMoney').val().trim(),
				endAmount:$('#endMoney').val().trim(),
				businessSectionId:$('#operatingDepartment').data('id'),
				contactUnitId:$('#contactsUnitName').data('id'),
				subsidiarySectionId:$("#auxiliaryDepartment").data('id'),
				employeeId:$('#employee').data('id'),
                createById:$('#OperatorBusinessInput').data('id'),
				queryType:$(this).attr('value'),

			}
		}).trigger("reloadGrid");

	})




	var ifCheckAll = false;

	var allBillsId;

	$('#rpGrid').jqGrid({
		// scroll: 1,
		mtype: "POST",
		datatype: "json",
		jsonReader: {
			root: "data.dataList",
			total: "data.total",
			records: "data.records"
		},
		// gridview: true,
		colNames: ['billsId','制单日期','凭证字号','凭证总金额','审核人','制单人','摘要','科目编码','科目名称','往来单位','部门','职员名称','借方','贷方','业务部门',
					'出纳','记账人','主管','错误状态','作废状态','流量'
		],
		colModel: [
			{name:"billsId",index:"billsId",width:"150px",align:"center",sortable:false,hidden:true},
			{name:"voucherDateStr",index:"voucherDateStr",width:"150px",align:"center",sortable:false,cellattr:function(rowId, tv, rawObject, cm, rdata){
				return 'id=\'voucherDateStr' +rowId + "\'";
			}}, //制单日期
			{name:"docWord",width:"150px",align:"center",sortable:false,cellattr:function(rowId, tv, rawObject, cm, rdata){
				return 'id=\'docWord' +rowId + "\'";
			}},//凭证字号
			{name:"voucherAmount",width:"150px",align:"center",sortable:false,cellattr:function(rowId, tv, rawObject, cm, rdata){
				return 'id=\'voucherAmount' +rowId + "\'";
			}},//凭证总金额
			{name:"auditorName",width:"150px",align:"center",sortable:false,cellattr:function(rowId, tv, rawObject, cm, rdata){
				return 'id=\'auditorName' +rowId + "\'";
			}}, // 审核人
			{name:"createByName",width:"150px",align:"center",sortable:false,cellattr:function(rowId, tv, rawObject, cm, rdata){
				return 'id=\'createByName' +rowId + "\'";
			}},//制单人
			{name:"summary",width:"150px",align:"center",sortable:false}, //摘要
			{name:"subjectCode",width:"150px",align:"center",sortable:false}, //科目编码
			{name:"subjectName",width:"150px",align:"center",sortable:false}, //科目名称
			{name:"contactUnitName",width:"150px",align:"center",sortable:false}, //往来单位
			{name:"subsidiarySectionName",width:"150px",align:"center",sortable:false}, //部门
			{name:"employeeName",width:"150px",align:"center",sortable:false}, //职员名称
			{name:"debtorAmount",width:"150px",align:"center",sortable:false}, //借方
			{name:"lenderAmount",width:"150px",align:"center",sortable:false},//贷方
			{name:"businessSectionName",width:"150px",align:"center",sortable:false},//业务部门
			{name:"cashierName",width:"150px",align:"center",sortable:false,cellattr:function(rowId, tv, rawObject, cm, rdata){
				return 'id=\'cashierName' +rowId + "\'";
			}},//出纳
			{name:"bookkeeperName",width:"150px",align:"center",sortable:false,cellattr:function(rowId, tv, rawObject, cm, rdata){
				return 'id=\'bookkeeperName' +rowId + "\'";
			}},//记账人
			{name:"supervisorName",width:"150px",align:"center",sortable:false,cellattr:function(rowId, tv, rawObject, cm, rdata){
				return 'id=\'supervisorName' +rowId + "\'";
			}},//主管
			{name:"signWrongStatus",width:"150px",align:"center",sortable:false,cellattr:function(rowId, tv, rawObject, cm, rdata){
				return 'id=\'signWrongStatus' +rowId + "\'";
			},formatter: "select", editoptions:{value:"0: ;1:有错;"}},//错误状态
			{name:"cancelStatus",width:"150px",align:"center",sortable:false,cellattr:function(rowId, tv, rawObject, cm, rdata){
				return 'id=\'cancelStatus' +rowId + "\'";
			},formatter: "select", editoptions:{value:"0: ;1:已作废;"}},//作废状态
			{name:"allocateFlowsStatus",width:"150px",align:"center",sortable:false,cellattr:function(rowId, tv, rawObject, cm, rdata){
				return 'id=\'allocateFlowsStatus' +rowId + "\'";
			},formatter: "select", editoptions:{value:"0:未分配;1:已分配;"}},//流量
		],
		sortable: false,
		rownumbers: true,
		cellsubmit: 'clientArray',// 单元格保存内容的位置
		editurl: 'clientArray',
		rowNum: 40,
		pager: '#rpGridPager',
		viewrecords: true,
		cellEdit: true,
		page:1,
		width: '',
		footerrow: true,
   		multiselect:true,
		multiboxonly:true,
		multiselectWidth:68,
		height: $(window).height() * 0.5,
		autowidth: true,
		rownumWidth: 35, // the width of the row numbers columns
		shrinkToFit: false,  // 此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
		userDataOnFooter: true,// 设置userData 显示在footer里
		ondblClickRow: function (id) {

		},
		onCellSelect: function (rowid, iCol, contents, event) {
			if (iCol == 4) {
				var data = $('#rpGrid').getRowData(rowid);
				window.parent.openWorkBoxByMenutext('填制凭证',basePath + '/cw/test/voucher?bId='+ data.billsId,true);
			}
		},
		beforeEditCell: function (rowid, cellname, v, iRow, iCol) {

		},
		beforeSelectRow: function (rowid, e) {

		},
		afterInsertRow: function (rowid, aData) { // 新增一行之后

		},
		onSelectRow: function (id, status) {
			$('table tr').removeClass('success')
			if(!status){
				$('.checkAll').prop('checked',false)
				$('.checkBoxInfo').hide()
			}


		},
		gridComplete: function () {
			$('table th').css('text-align', 'center');
			var mergeArr = ['billsId','voucherDateStr','docWord','voucherAmount','auditorName','createByName','cashierName','bookkeeperName','supervisorName','signWrongStatus','cancelStatus','allocateFlowsStatus']

			Merger("rpGrid", mergeArr);

		},

		loadComplete: function (data) {
			$('#rpGrid').resize()
			$('#cb_rpGrid').css('float','left')
			// $('#jqgh_rpGrid_cb .s-ico').html('全选').show()
			//
			// // $('#jqgh_rpGrid_cb').append('全选')
			// //增加全选功能
			$('#rpGrid').jqGrid('setLabel',1, '<input type="checkbox" class="fl checkAll"/>全选');

			if(ifCheckAll){
				$('.checkAll').prop('checked',true)
				$.each(data.data.dataList,function (k,v) {

					$('#rpGrid').jqGrid('setSelection' , k+1 ,true)
				})
				$('.checkLen').text('本页'+data.data.dataList.length)
			}else{
				$('.checkBoxInfo').hide()
			}
			$('.checkAll').on('change',function (e) {

				if(e.target.checked){
					// ifCheckAll = true
					if(data.data.total > 1){
						$('.checkAllBox').show()
						$('.checkAllLen').text(data.data.records)
						$('.checkAllInfo').show().text('勾选本条件下 '+data.data.records+' 行');

						$('.checkAllInfo').unbind('click').on('click',function () {
							$.ajax({
								url: "/manager/finance/voucher/manager/getVoucherManagerOrderVoPageList",
								dataType:'json',
								type:'post',
								data:{
									page:1,
									rows:1,
									startVoucherDate: $('#creatDate').is(':checked') ? $('#startDate').val() : '',
									endVoucherDate:  $('#creatDate').is(':checked') ?  $('#endDate').val() : '',
									startAccountingPeriod:  $('#accountingPeriod').is(':checked') ?  $('#startPeriod').val() : '',
									endAccountingPeriod: $('#accountingPeriod').is(':checked') ?  $('#endPeriod').val() : '',
									startVoucherNumber: $('#startNum').val(),
									endVoucherNumber: $('#endNum').val(),
									voucherSource: $('#voucherFrom').data('id'),
									allocateFlowsStatus: $("input[name='flowAllocating']:checked").val(),
									tallyStatus: $("input[name='chargeState']:checked").val(),
									auditStatus: $("input[name='auditState']:checked").val(),
									cancelStatus: $("input[name='cancellationState']:checked").val(),
									signWrongStatus:$("input[name='wrongState']:checked").val(),
									direction:$("input[name='directionState']:checked").val(),
									startAmount:$('#startMoney').val().trim(),
									endAmount:$('#endMoney').val().trim(),
									businessSectionId:$('#operatingDepartment').data('id'),
									contactUnitId:$('#contactsUnitName').data('id'),
									subsidiarySectionId:$("#auxiliaryDepartment").data('id'),
									employeeId:$('#employee').data('id'),
                                    createById:$('#OperatorBusinessInput').data('id'),
									queryType:$('.activeType').attr('value'),
									//全选参数
									checkedAll:1
								},
								success:function (data) {
									// $('.checkLen').text('全部'+data.data.records)
									// $('.checkAllInfo').text('取消勾选')
									$('.hasCheckedBox ').show()
									$('.checkinfoBox').hide()
									ifCheckAll = true;
									allBillsId = data.data.allIdList.join(',');

									$('.qxCheck').unbind('click').on('click',function () {
										ifCheckAll = false;
										// $('#rpGrid').trigger("reloadGrid");
										$('.checkinfoBox').show()
										$('.hasCheckedBox').hide()
										// $('.checkBoxInfo').hide()
										allBillsId = ''

									})
								}
							})
						})

					}else{
						$('.checkAllBox').hide()
					}
					$('.checkLen').text('本页'+data.data.dataList.length)
					$('.checkBoxInfo').show();

					var rowsId,lastId;
					$.each(data.data.dataList,function (k,v) {
						lastId = v.billsId;
						if(rowsId == lastId){

						}else{
							if(!$('#rpGrid tr:eq('+(k+1)+')').attr('aria-selected')){
								rowsId = lastId
								$('#rpGrid').jqGrid('setSelection' , k+1 )
							}

						}
					})

				}else{
					$('.checkBoxInfo').hide();
					ifCheckAll = false;
					$('#rpGrid').trigger("reloadGrid");

					// $.each(data.data.dataList,function (k,v) {
					// 	$('#rpGrid').jqGrid('setSelection' , k+1 , false )
					// })
				}
			})

			//分页滚动条 置顶
			$("#rpGrid").parents(".ui-jqgrid-bdiv")[0].scrollTop=0;

			if(Object.keys(data.data).length == 0 ){
				$('#rpContainer').hide()
				$('.loadingImgBox').hide()
				$('.notFounImgBox').show()

			}else{
				$('.loadingImgBox').hide()
				$('.notFounImgBox').hide()
				$('#rpContainer').show()
			}
			$('.footrow td:first-child').html('合计');

			var rowNum = parseInt($(this).getGridParam('records'), 10);
			if (rowNum > 0) {
				$(".ui-jqgrid-sdiv").show();
				var footerData = data.data.dataList , debtorAmount=0 , lenderAmount=0;
				$.each(footerData,function(k,v){
					debtorAmount+=v.debtorAmount;
					lenderAmount+=v.lenderAmount

				})

				$(this).footerData("set", {
					'lenderAmount':lenderAmount.toFixed(2),
					'debtorAmount':debtorAmount.toFixed(2)
				} , false);
			}
			else {
				$(".ui-jqgrid-sdiv").hide();
			}
			// console.log(data)
			//
			// var info = data.data.accountList
			// for (var i = 0; i < info.length; i++) {
			// 	if (info[i].isDeal == '1' || info[i].billsStatus == '7') {
			// 		$('#' + info[i].id).find('input').prop('disabled', true);
			// 	}
			// }
			//
			// $('.footrow td:first-child').html('合计');
			// var rowNum = parseInt($(this).getGridParam('records'), 10);
			// if (rowNum > 0) {
			// 	$(".ui-jqgrid-sdiv").show();
			// 	var accountAmount = $(this).getCol('amount', false, 'sum');
			// 	var accountRealAmount = $(this).getCol('realAmount', false, 'sum');
			// 	var accountDiffAmount = $(this).getCol('diffAmount', false, 'sum');
			// 	$(this).footerData("set", {
			// 		"amount": '<font color="red" >' + Number(accountAmount).toFixed(2) + '</font>',
			// 		"realAmount": '<font color="red" >' + Number(accountRealAmount).toFixed(2) + '</font>',
			// 		"diffAmount": '<font color="red" >' + Number(accountDiffAmount).toFixed(2) + '</font>',
			// 	}, false);
			// }
			// else {
			// 	$(".ui-jqgrid-sdiv").hide();
			// }
		},
		loadError: function (xhr, status, error) {

		}
	})
	$("#rpGrid").jqGrid("setGroupHeaders", {
		useColSpanStyle : true ,//没有表头的列是否与表头所在行的空单元格合并
		groupHeaders : [//{},{}...
			{
				startColumnName : "contactUnitName",//合并列的起始位置 colModel中的name
				numberOfColumns : 3, //合并列数 包含起始列
				titleText : "辅助项"//表头
			}
		]
	});

	$('#subGrid').jqGrid({
		mtype: "POST",
		datatype: "json",
		jsonReader: {
			root: "data.failedList",
		},
		colNames: ['凭证号','出错原因'],
		colModel: [
			{name:"name",index:"name",align:"center",sortable:false},
			{name:"reason",index:"reason",align:"center",sortable:false},
		],
		sortable: false,
		rownumbers: true,
		cellsubmit: 'clientArray',// 单元格保存内容的位置
		editurl: 'clientArray',
		rowNum: 40000,
		viewrecords: true,
		cellEdit: true,
		page:1,
		width: '',
		// footerrow: true,
		// multiselect:true,
		// multiboxonly:true,
		// multiselectWidth:38,
		height: $(window).height() * 0.5,
		autowidth: true,
		rownumWidth: 35, // the width of the row numbers columns
		shrinkToFit: true,  // 此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
		// userDataOnFooter: true,// 设置userData 显示在footer里
		gridComplete: function () {
			$('table th').css('text-align', 'center');

		},
		loadComplete: function (data) {
			$('#subGrid').resize()
			$('#delModal').modal('show');
			$('.descBox').show()
			$('.gridBox').hide()
			if(data.data.failedList.length >0 ) {
				$('.gridBox').show()
				// $('#subGrid').jqGrid('setGridParam', {
				// 	url:url,
				// 	postData:{
				// 		voucherIds:infoArr.join(',')
				// 	}
				// }).trigger("reloadGrid");
			}

			$('.descBox').text(data.desc)

			$('#delBtn').unbind('click').on('click',function () {
				$('#delModal').modal('hide')
				ifCheckAll = false;
				$('.checkBoxInfo').hide()
				$('.checkAll').prop('checked',false)
				$('#rpGrid').jqGrid('setGridParam', {
					// page:1
				}).trigger("reloadGrid");
			})
		},
		loadError: function (xhr, status, error) {

		}
	})

	$.ajax({
		url:'/manager/finance/common/getCompanyFinanceConfigVo',
		dataType:'json',
		type:'post',
		success:function (data) {
			console.log(data)
			if(data.data.configVo.businessSectionAccounting == '0'){
				$('#operatingDepartment').parent().find('.showComboBox').css('display','none')
			}
		}
	})
//查询
    $('#search').click(function(){
        $('.notFounImgBox').hide()
        $('#rpContainer').show()
        $('.loadingImgBox').show()
        $('#promptBox').hide()
        $('.checkBoxInfo').hide()
        $('.checkinfoBox').show()
        $('.hasCheckedBox').hide()

        ifCheckAll = false
        $('#rpGrid').jqGrid('setGridParam', {
            url: "/manager/finance/voucher/manager/getVoucherManagerOrderVoPageList",
            datatype:'json',
            postData: {
                startVoucherDate: $('#creatDate').is(':checked') ? $('#startDate').val() : '',
                endVoucherDate:  $('#creatDate').is(':checked') ?  $('#endDate').val() : '',
                startAccountingPeriod:  $('#accountingPeriod').is(':checked') ?  $('#startPeriod').val() : '',
                endAccountingPeriod: $('#accountingPeriod').is(':checked') ?  $('#endPeriod').val() : '',
                startVoucherNumber: $('#startNum').val(),
                endVoucherNumber: $('#endNum').val(),
                voucherSource: $('#voucherFrom').data('id'),
                allocateFlowsStatus: $("input[name='flowAllocating']:checked").val(),
                tallyStatus: $("input[name='chargeState']:checked").val(),
                auditStatus: $("input[name='auditState']:checked").val(),
                cancelStatus: $("input[name='cancellationState']:checked").val(),
                signWrongStatus:$("input[name='wrongState']:checked").val(),
                direction:$("input[name='directionState']:checked").val(),
                startAmount:$('#startMoney').val().trim(),
                endAmount:$('#endMoney').val().trim(),
                businessSectionId:$('#operatingDepartment').data('id'),
                contactUnitId:$('#contactsUnitName').data('id'),
                subsidiarySectionId:$("#auxiliaryDepartment").data('id'),
                employeeId:$('#employee').data('id'),
                createById:$('#OperatorBusinessInput').data('id')

            },
            page:1
        }).trigger("reloadGrid");

    })
//导出
    $("#export").click(function(){
        var startVoucherDate=$('#creatDate').is(':checked') ? $('#startDate').val() : '';
        var endVoucherDate=$('#creatDate').is(':checked') ?  $('#endDate').val() : '';
        var startAccountingPeriod=$('#accountingPeriod').is(':checked') ?  $('#startPeriod').val() : '';
        var endAccountingPeriod=$('#accountingPeriod').is(':checked') ?  $('#endPeriod').val() : '';
        var startVoucherNumber=$('#startNum').val();
        var endVoucherNumber=$('#endNum').val();
        var voucherSource=$('#voucherFrom').data('id');
        var allocateFlowsStatus=$("input[name='flowAllocating']:checked").val();
        var tallyStatus=$("input[name='chargeState']:checked").val();

        var auditStatus=$("input[name='auditState']:checked").val();
        var cancelStatus=$("input[name='cancellationState']:checked").val();
        var signWrongStatus=$("input[name='wrongState']:checked").val();
        var direction=$("input[name='directionState']:checked").val();
        var startAmount=$('#startMoney').val().trim();
        var endAmount=$('#endMoney').val().trim();
        var businessSectionId=$('#operatingDepartment').data('id');
        var contactUnitId=$('#contactsUnitName').data('id');
        var subsidiarySectionId=$("#auxiliaryDepartment").data('id');
        var employeeId=$('#employee').data('id');
		var activeType=$('.activeType').val();


        window.location.href= "/manager/finance/voucher/manager/exportVoucherManagerOrder?startVoucherDate="
            +startVoucherDate
            +"&endVoucherDate="+endVoucherDate
            +"&startAccountingPeriod="+startAccountingPeriod
            +"&endAccountingPeriod="+endAccountingPeriod
            +"&startVoucherNumber="+startVoucherNumber
            +"&endVoucherNumber="+endVoucherNumber
            +"&voucherSource="+voucherSource
            +"&allocateFlowsStatus="+allocateFlowsStatus
            +"&tallyStatus="+tallyStatus
            +"&auditStatus="+auditStatus
            +"&cancelStatus="+cancelStatus
            +"&signWrongStatus="+signWrongStatus
            +"&direction="+direction
            +"&startAmount="+startAmount
            +"&endAmount="+endAmount
            +"&businessSectionId="+businessSectionId
            +"&contactUnitId="+contactUnitId
            +"&subsidiarySectionId="+subsidiarySectionId
            +"&employeeId="+employeeId
            +"&queryType="+activeType;

    });

})

//只能输入数字
function getnum(obj) {
	obj.value = obj.value.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
	obj.value = obj.value.replace(/^\./g, ""); //验证第一个字符是数字
	obj.value = obj.value.replace(/\.{2,}/g, "."); //只保留第一个, 清除多余的
	obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
	obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两个小数
}

//重置
function resetFun(){
	$('#searchQuery')[0].reset()
	$('#searchQuery input').data('id','')
	$('#startPeriod,#endPeriod').val('').prop('disabled',true)
	$('#startDate,#endDate').prop('disabled',false)
}



