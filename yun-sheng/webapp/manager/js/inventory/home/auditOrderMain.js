$(document).ready(function(){
	$('.startTime,.endTime').datetimepicker({
	      lang:"ch", //语言选择中文 注：旧版本 新版方法：$.datetimepicker.setLocale('ch');
	      format:"Y-m-d",      //格式化日期
	      timepicker:false,    //关闭时间选项
	});
	$('#company').contactUnitPlu({
		checkMore: true,
	})
	
	$('.startTime,.endTime').blur(function(){
		var s = $('.startTime').val();
		var e = $('.endTime').val();
		if(e !=='' && s>e){
			$('.startTime').val(e)
		}
	})
	
//    	表格参数
	var data = {
    		LoadTableUrl: basePath + '/inventory/main/getToAuditOrderPageList',
    		TableName: "#dataGrid", //显示表格名称。遵照css选择器书写
    		pager: "#jqGridPager",
    		colNames : ['id','单据编号','单据类型','单据日期','往来单位id','往来单位','部门id','部门','经办人id','经办人','单据总金额','预付/预收金额','备注','制单人','制单时间'], 
    		colModel : [
    		            {name:'orderId',index:'orderId',width:80,align:'center',hidden:true},
    		            {name:'billsCode',index:'billsCode',width:80,align:'center',hidden:true},
    		            {name:'billsType',index:'billsType', width:150,align:'center',sortable:false},
						{name:'billsDateStr',index:'billsDateStr', width:200,align:'center', sorttype:'string',sortable:false},
						{name:'contactUnitId',index:'contactUnitId', width:150,align:'center',sortable:false,hidden:true},
						{name:'contactUnitName',index:'contactUnitName', width:150,align:'center',sortable:false},
						{name:'sectionId',index:'sectionId', width:150,align:'center',sortable:false,hidden:true},
						{name:'sectionName',index:'sectionName', width:150,align:'center',sorttype:'string',sortable:false},
						{name:'managerId',index:'managerId', width:150,align:'center',sortable:false,hidden:true},
						{name:'managerName',index:'managerName', width:150,align:'center', sorttype:'string',sortable:false},
						{name:'billsAmount',index:'billsAmount', width:150,align:'center', sorttype:'string',sortable:false},
						{name:'prePayAmount',index:'prePayAmount', width:150,align:'center', sorttype:'string',sortable:false},
						{name:'remark',index:'remark', width:150,align:'center', sorttype:'string',sortable:false},
						{name:'createByName',index:'createByName', width:150,align:'center', sorttype:'string',sortable:false},
						{name:'createDateStr',index:'createDateStr', width:200,align:'center', sorttype:'string',sortable:false}
	                ]       
    	};
	var main = {
    		LoadTableUrl: basePath + '/inventory/main/getAuditOrdersDetail',
    		TableName: "#mainGrid", //显示表格名称。遵照css选择器书写
    		// pager: "#jqGridPager_main",
    		colNames : ['id','操作','商品id','商品名称','订货量', '单价', '订单总额', '审批量', '审批总额', '单台固返', '商品备注'],
    		colModel : [
    		            {name: 'id', index: 'id', width:80, hidden: true, sortable: false},
    		            {name: 'del', index: 'del', width:80,align: 'center', sortable: false,
    		            	formatter:function(cellvalue, options, rowObject){
    		            		return '<a class="btn" onclick="delRow('+ rowObject.id +')"><i class="glyphicon glyphicon-trash"></i></a>'
    		            	},
    		            },
    		            {name: 'goodsId', index: 'goodsId', width:80, hidden: true, sortable: false},
    		            {name: 'goodsName', sortable: false, index: 'goodsName', align: 'center'},
    		            {name: 'goodsNum',index: 'goodsNum',width:100,align: 'center',sortable: false},
    		            {name: 'price',index: 'price',width:100,align: 'center',sortable: false},
    		            {name: 'billsAmount',index: 'billsAmount',width:120,align: 'center', sortable: false},
    		            {name: 'reviewsNum',index: 'reviewsNum',width:120,align: 'center',editable: true,sortable: false,
    		            		editoptions: {onkeyup: "checkInput.clearNoNum(this,12)",onblur: 'editsum(this)'}
    		            },
            			{name: 'reviewsAmount',index: 'reviewsAmount',width:120,align: 'center',sortable: false},
            			{name: 'singleRebate', index: 'singleRebate',width:100,align: 'center',sortable: false},
            			{name: 'remark', index: 'remark',width:200,align: 'center', sortable: false}
            		]       
    	};
    	loadmodal(data);
    	mainmodal(main);
		
//		查询
	$('.search').click(function(){
		var obj = {
			page: 1,
			rows: 100,
			contactUnitIds: $('#company').data('contactUnitId'),
			billsBeginDateStr: $('.startTime').val(),
			billsEndDateStr: $('.endTime').val(),
			queryKey: $(".keyWord").val()
		}
		$("#dataGrid").jqGrid("setGridParam",{
			datatype:'json',
			page: 1,
			postData: obj
		}).trigger("reloadGrid"); 
	});
		
//	 审核
	$('.check').click(function(){
		var id = $("#dataGrid").jqGrid('getGridParam', 'selrow');
		if(id == null){
			$.zxsaas_plus.showalert('提示','请选择一条需要审核的数据');
			return
		}
		var row = $("#dataGrid").getRowData(id);
		$('.savecheck').data('id',id);
		checkshow(id);
	});
		
	$('.savecheck').click(function(){
		var id = $('.savecheck').data('id');
		var row = $("#dataGrid").getRowData(id);
		var obj = {
				billsCode: row.billsCode,
				billsDate: row.billsDateStr.substring(0,10),
				checkOrderDetailList:[],
				contactsunitId: row.contactUnitId,
				contactsunitName: row.contactUnitName,
				id: row.orderId,
				managersName: row.managerName,
				managersUid: row.managerId,
				remark: row.remark,
				sectionId: row.sectionId,
				sectionName: row.sectionName
		}
		var ids = $("#mainGrid").getDataIDs();
		if(ids.length<1){
			$.zxsaas_plus.showalert('提示','该商品无审核明细');
			return
		}
	    if(row.billsType == '采购订单'){
	    	$(ids).each(function(i,item){
		    	var list = $("#mainGrid").getRowData(item);
		        var data = {
		        		amount:	list.billsAmount,
		        		goodsName: list.goodsName,
		        		goodsNumber: list.goodsNum,
		        		id:	list.id,
		        		price: list.price,
		        		remark:	list.remark,
		        		reviewsAmount: list.reviewsAmount,
		        		reviewsNum:	list.reviewsNum,
		        		singleRebate: list.singleRebate
		        }
		        obj.checkOrderDetailList.push(data);
		    });
	    	checkSave(obj,'/manager/IorderMain/saveCheckOrder');
	    }else{
	    	var arr = [];
	    	$(ids).each(function(i,item){
		    	var list = $("#mainGrid").getRowData(item);
		        var data = {
		        		goodsId: list.goodsId,
		        		amount:	list.billsAmount,
		        		goodsName: list.goodsName,
		        		goodsNumber: list.goodsNum,
		        		id:	list.id,
		        		price: list.price,
		        		remark:	list.remark,
		        		reviewsAmount: list.reviewsAmount,
		        		reviewsNum:	list.reviewsNum,
		        		saleOrderMainId: row.orderId
		        }
		        arr.push(data);
		    });
	    	checkSave(arr,'/manager/salesOrder/verifyOrderBills');
	    }
	});
	
});

function delRow(id){
	$("#mainGrid").delRowData(id);
}

function checkSave(obj,url){
	$.request({
	    type : "post",
		url: url,
		data:JSON.stringify(obj),//将集合转换为JSON字符串
		contentType : 'application/json',//传输类型
		dataType : 'json',//接收类型
		success: function (data){
			if (data.result == 1) {
				$('#checkModal').modal('hide');
				$.zxsaas_plus.showalert('success',data.desc);
				$("#dataGrid").trigger('reloadGrid');
            }else{
            	$.zxsaas_plus.showalert('error', data.desc);
            }
    	},
    	error: function(){
    		$.zxsaas_plus.showalert('error', data.desc);
    	}
	});
}

function checkshow(id){
	var row = $("#dataGrid").getRowData(id);
	$.request({
	    type : "post",
		url: '/manager/inventory/main/getAuditOrdersDetail',
		data: {'orderId':row.orderId},//将集合转换为JSON字符串
		dataType : 'json',//接收类型
		success: function (data){
			if (data.result == 1) {
				var num = data.data.ordersVo.detailVoList;
				if(num.length<1){
					$.zxsaas_plus.showalert('提示','该商品无审核明细');
					return
				}
				$("#mainGrid").jqGrid("setGridParam",{
					datatype:'json',
					page: 1,
					postData: {orderId: row.orderId}
				}).trigger("reloadGrid"); 
				$('#checkModal').modal('show');
				if(row.billsType == '采购订单'){
					$("#mainGrid").showCol('singleRebate').resize();
				}else{
					$("#mainGrid").hideCol('singleRebate').resize();
				}
				$('.htitle').text(row.billsType+'审核');
				var tr = '<tr><td>'+ row.billsDateStr +
					'</td><td>'+ row.contactUnitName +
					'</td><td>'+ row.sectionName +
					'</td><td>'+ row.managerName +
					'</td><td>'+ row.remark +
					'</td><td>'+ row.createByName +
					'</td><td>'+ row.createDateStr +
					'</td></tr>';
				$('.maintab tbody').html(tr);
            } else {
            	$.zxsaas_plus.showalert('error', data.desc);
            }
    	},
    	error: function(){
    		$.zxsaas_plus.showalert('error', data.desc);
    	}
	});
}

function editsum(t){
	var v = $(t).val().trim();
	var id = $(t).parent().parent().attr('id');
	var row = $("#mainGrid").getRowData(id);
	var num = (v*row.price).toFixed(2);
	$("#mainGrid").setCell(id,'reviewsAmount',num);
	$("#mainGrid").jqGrid("saveCell",lastrow,lastcell);
	var reviewsNum = $("#mainGrid").getCol('reviewsNum', false, 'sum');
	var reviewsAmount = $("#mainGrid").getCol('reviewsAmount', false, 'sum');
	$("#mainGrid").footerData("set", {reviewsNum:reviewsNum},false);
	$("#mainGrid").footerData("set", {reviewsAmount:reviewsAmount},false);
}
    
    
function loadmodal(options) {
	$.jgrid.defaults.width = 1280;
	$.jgrid.defaults.responsive = true;
	$.jgrid.defaults.styleUI = 'Bootstrap';

	$(options.TableName).jqGrid({
		url: options.LoadTableUrl,
		mtype: "GET",
		datatype: "json",
		jsonReader: {
			root: "data.orderVoList",
			total: "data.total",
			records: "data.records",
			repeatitems: false
		},
		colNames: options.colNames,
		colModel: options.colModel,
		sortable: false,
		multiselect : false,	//复选框属性
		rownumbers:true,	//显示行号
		footerrow: true,//分页上添加一行，用于显示统计信息
		rowNum: 100,
		rowList: [100, 200, 500],
		pager: options.pager,
		viewrecords: true,
		//cellEdit:true,
		width: "100%",
		height: $(window).height() * 0.6,
		autowidth: true,
		rownumWidth: 35, // the width of the row numbers columns
		shrinkToFit: false, //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
		ondblClickRow: function(rowid,iRow,iCol,e) {
			checkshow(rowid)
			$('.savecheck').data('id',rowid);
		},
		gridComplete: function() {
			var billsAmount = $("#dataGrid").getCol('billsAmount', false, 'sum');
			var prePayAmount = $("#dataGrid").getCol('prePayAmount', false, 'sum');
			$("#dataGrid").footerData("set", {billsType:"合计"},false);
			$("#dataGrid").footerData("set", {billsAmount:billsAmount.toFixed(2)},false);
			$("#dataGrid").footerData("set", {prePayAmount:prePayAmount.toFixed(2)},false);
		}
	})
}

var lastrow =null,lastcell = null;
function mainmodal(options) {
	$.jgrid.defaults.width = 780;
	$.jgrid.defaults.responsive = true;
	$.jgrid.defaults.styleUI = 'Bootstrap';

	$(options.TableName).jqGrid({
		url: options.LoadTableUrl,
		mtype: "GET",
		datatype: "json",
		jsonReader: {
			root: "data.ordersVo.detailVoList",
			total: "data.total",
			records: "data.records",
			repeatitems: false
		},
		colNames: options.colNames,
		colModel: options.colModel,
		cellsubmit: 'clientArray',// 单元格保存内容的位置
	    editurl: 'clientArray',
		sortable: false,
		multiselect : false,	//复选框属性
		rownumbers:true,	//显示行号
		footerrow: true,//分页上添加一行，用于显示统计信息
		rowNum: 100,
		rowList: [10, 20, 30],
		pager: options.pager,
		viewrecords: true,
		cellEdit:true,
		width: "100%",
		height: $(window).height() * 0.3,
		autowidth: true,
		rownumWidth: 35, // the width of the row numbers columns
		shrinkToFit: false, //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
		gridComplete: function() {
			var goodsNum = $("#mainGrid").getCol('goodsNum', false, 'sum');
			var billsAmount = $("#mainGrid").getCol('billsAmount', false, 'sum');
			var reviewsAmount = $("#mainGrid").getCol('reviewsAmount', false, 'sum');
			var reviewsNum = $("#mainGrid").getCol('reviewsNum', false, 'sum');
			$("#mainGrid").footerData("set", {goodsName:"合计"},false);
			$("#mainGrid").footerData("set", {goodsNum:goodsNum},false);
			$("#mainGrid").footerData("set", {billsAmount:billsAmount.toFixed(2)},false);
			$("#mainGrid").footerData("set", {reviewsAmount:reviewsAmount.toFixed(2)},false);
			$("#mainGrid").footerData("set", {reviewsNum:reviewsNum},false);
		},
		beforeEditCell:function(rowid,cellname,v,iRow,iCol){
			lastrow = iRow;
			lastcell = iCol;
		}
	})
}
