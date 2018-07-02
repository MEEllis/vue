$(function(){
	loadtable();
	initDetailBills();   //引入单据明细
});

/**********************************单据引入****************************************/
function funBlurInit(){
	
	$('#selBillsCodeImport').bind('input propertychange', function() {
		billsImport();
//		alert('触发1');
	});
	
	$("#startTimeStrImport").blur(function(){
		billsImport();
//		alert('触发2');
	});
	$("#endTimeStrImport").blur(function(){
		billsImport();
//		alert('触发3');
	});
	
	$("#selBillsTypeStrImport").change(function(){
		billsImport();
//		alert('触发4');
	});
	
	$("#startTimeStrImport").datetimepicker({
		  lang:"ch",           //语言选择中文
	    format:"Y-m-d",      //格式化日期
	    timepicker:false,    //关闭时间选项
	    todayButton:false    //关闭选择今天按钮
		});
	
	$("#endTimeStrImport").datetimepicker({
		  lang:"ch",           //语言选择中文
	    format:"Y-m-d",      //格式化日期
	    timepicker:false,    //关闭时间选项
	    todayButton:false    //关闭选择今天按钮
		});
	
	//禁选本单据类型
	$('#selBillsTypeStrImport option[value='+num+']').attr('disabled',true);
}

//刷新 单据引入表格
function billsImport(){
	$('#billsChoose').modal('show');
	var param = new Object();
	param.selBillsCode = $('#selBillsCodeImport').val();
	param.startTimeStr = $('#startTimeStrImport').val();
	param.endTimeStr = $('#endTimeStrImport').val();
	param.billsTypeImport = num;
	param.selSectionIdStr =$("#sectionIdImport").val();
	param.selBillsTypeStr = $('#selBillsTypeStrImport').val();
	$("#jqGrid_tranBills").jqGrid('setGridParam',{ 
        url: basePath + '/jxc/storage/ibillsMainCC/importBills',
        postData:param, //发送数据 
        page:1 
    }).trigger("reloadGrid"); //重新载入 
}

//确定引入
function onclickSureImport(){
	var rowIds = $("#jqGrid_detailBills").getDataIDs(); 						//单据引入明细N id
	var selrow = $("#jqGrid_tranBills").jqGrid('getGridParam','selarrrow');		//单据引入主表M id
	var rowIdsNum = $("#jqGrid_SubjectBalance").getDataIDs(); 						//数量表
	$(rowIds).each(function(index,yu){
		var rowData = $("#jqGrid_detailBills").jqGrid("getRowData", yu);		
		if(rowData.ifManageImei == '1'){
			//串号管理  引入串号
			storageObj.findImeiByMidAndNid(selrow[0],rowData.id,function(data){
				var imDetaiList = data.data.rows;
				imDetaiList2[rowIdsNum.length] = imDetaiList;
			});
		}
		delete rowData.id;
		$("#jqGrid_SubjectBalance").jqGrid('addRowData',rowIdsNum.length,rowData);
	});
	$('#billsChoose').modal('hide');
}

//刷新单据明细
function reloadDetail(id,billsType){
	$("#jqGrid_detailBills").jqGrid('setGridParam',{ 
        url: basePath + '/jxc/storage/ibillsMainCC/importBillsDetail',
        postData:{id:id,billsType:billsType}, //发送数据 
        page:1 
    }).trigger("reloadGrid"); //重新载入 
}



/************************************单据引入***************************************/
$.jgrid.defaults.width = 1280;
$.jgrid.defaults.responsive = true;
$.jgrid.defaults.styleUI = 'Bootstrap';	

function loadtable(){
	$("#jqGrid_tranBills").jqGrid({
		mtype:"GET",
		datatype: "json",
		jsonReader  : {	
			root:"data.rows",
			page: "data.page",
	        total: "data.total",
	        records: "data.records",
			repeatitems: false
				},
		colNames:['单据编号','单据日期','部门名称','经办人','往来单位','单据金额','折后金额','新增人','新增时间','过帐人','过账时间','备注','id','单据类型'],          
        colModel:[
          	    {name:'billsCode',index:'billsCode', width:100,align:'center',sortable:false},
        		{name:'billsDateString',index:'billsDateString', width:100,align:'center',sortable:false},
        		{name:'sectionName',index:'sectionName', width:100,align:'center',sortable:false},
        		{name:'managerName',index:'managerName', width:100,align:'center',sortable:false},
        		{name:'contactName',index:'contactName', width:100,align:'center',sortable:false},
        		{name:'billsAmount',index:'billsAmount', width:100,align:'center',sortable:false},
        		{name:'discountedAmount',index:'discountedAmount', width:100,align:'center',sortable:false},
        		{name:'createName',index:'createName', width:100,align:'center',sortable:false},
        		{name:'createDateString',index:'createDateString', width:100,align:'center',sortable:false},
        		{name:'postName',index:'postName', width:100,align:'center',sortable:false},
        		{name:'postDateString',index:'postDateString', width:100,align:'center',sortable:false},
        		{name:'remark',index:'remark', width:100,align:'center',sortable:false},
        		{name:'id',index:'id', width:100,align:'center',hidden:true},
        		{name:'billsType',index:'billsType',hidden:true}
            ],
        sortable:false,			            
        rownumbers:true,//显示行号
        rowNum: 20,
        rowList: [5,20, 25, 40],
        pager:"#gridpager_tran",
        viewrecords: true,	//是否要记录总数	           
        multiselect : true,	//复选框属性
        width: "100%" ,
        height: $(window).height()*0.44,
		autowidth:true,
		rownumWidth: 35, // the width of the row numbers columns
		shrinkToFit:false,  //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
		ondblClickRow:function(id){
		},
		gridComplete: function() {
		},
		onSelectRow:function(id){
			var rowData = $('#jqGrid_tranBills').jqGrid('getRowData', id);
			reloadDetail(id,rowData.billsType);
		},
		beforeSelectRow:function(rowid,e){
		   $("#jqGrid_tranBills").jqGrid('resetSelection');//设置单选  只能选中一行
       }
	});
}

/************************************单据引入明细信息***************************************/
function initDetailBills(){
	$.jgrid.defaults.width = 1280;
	$.jgrid.defaults.responsive = true;
	$.jgrid.defaults.styleUI = 'Bootstrap';	
	var colNames = ['仓库名称','类别','商品编码','商品名称','品牌','型号','颜色','数量','单价','金额','折扣率','折扣金额','折后金额','含税单价','含税金额','税率','税额','商品备注','商品id','仓库id','是否串号管理','成本价','id','库存量'];
	var JqGridColModel=[  
        { name: 'storageName', index: 'storageName' ,sortable:false},  
        {name: 'categoryName', index: 'categoryName', width: 70, align: 'center', sortable: false},
        {name: 'code', index: 'code', width: 160, align: 'center', sortable: false},
        { name: 'goodsName', index: 'goodsName',sortable:false}, 
        {name: 'brandName', index: 'brandName', width: 140, align: 'center', sortable: false},
        {name: 'models', index: 'models', width: 70, align: 'center', sortable: false},
        {name: 'color', index: 'color', width: 70, align: 'center', sortable: false},
        { name: 'goodsNumber', index: 'goodsNumber' ,sortable:false},  
        { name: 'price', index: 'price' ,sortable:false},  
        { name: 'amount', index: 'amount' ,sortable:false},  
        { name: 'swipeHighLines', index: 'swipeHighLines' ,sortable:false},  
        { name: 'swipeFeesHigh', index: 'swipeFeesHigh' ,sortable:false},  
        { name: 'swipeLowLines', index: 'swipeLowLines' ,sortable:false},  
        { name: 'swipeFeesLow', index: 'swipeFeesLow' ,sortable:false},  
        { name: 'bankName', index: 'bankName' ,sortable:false},  
        { name: 'customer', index: 'customer' ,sortable:false},  
        { name: 'bankCard', index: 'bankCard' ,sortable:false},  
        { name: 'remark', index: 'remark',sortable:false},
        { name: 'storageId', index: 'storageId',hidden:true,sortable:false},
        { name: 'goodsId', index: 'goodsId',hidden:true,sortable:false},
        { name: 'ifManageImei', index: 'ifManageImei',hidden:true,sortable:false},
        { name: 'costPrice', index: 'costPrice',hidden:true,sortable:false},
        { name: 'id',index: 'id', width:100,align:'center',hidden:true},
        { name: 'stockNumber',index:'stockNumber', hidden:true}
        
    ];
	
	loadtable();

	function loadtable(){
		$("#jqGrid_detailBills").jqGrid({
//			url: basePath + '/jxc/storage/ibillsMainCC/importBillsDetail',
			datatype: "json", 
			mtype:"GET",
			jsonReader  : {	
					root: "rows",
					repeatitems: false
						},
			colNames:colNames,          
	        colModel:JqGridColModel,
	        sortable:false,			            
	        rownumbers:true,
	        rowNum: 20,
	        rowList: [20, 25, 40],
//	        pager:"#jqGridPager",
	        viewrecords: true,		           
	        multiselect:false,
	        postData:{id:0},
	        width: "100%" ,
	        height: $(window).height()*0.65,
			autowidth:true,
			rownumWidth: 35, // the width of the row numbers columns
			shrinkToFit:false,  //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
			ondblClickRow:function(id){
			},
			onCellSelect:function(id,index,e){
			},
			onSelectRow:function(id){
			},
			beforeSelectRow:function(rowid,e){
			},
			afterInsertRow: function (rowid, aData) { //新增一行之后
			},
			gridComplete: function() {
			},
			loadComplete:function(data){
			},
			loadError:function(xhr,status,error){
			}
		})
	}
}
