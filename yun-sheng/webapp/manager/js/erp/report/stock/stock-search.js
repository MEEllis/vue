$(function(){
	initGoodclassTree();
	initCompany();
	getDepartment();
});

//初始化公司名称
function initCompany(){
	$.ajax({
		url:"../../report/stock/selectCompanyByOperator",
		type : 'POST',  
		dataType: "json",
		contentType :'application/json', 
		success:function(data){
		 var companyList=data.data.companyList;
		 if(companyList.length>0){
			 $.each(companyList,function(i,value){
				 $("#companyName").append("<option value='"+value.companyId+"'>"+value.companyName+"</option>");
			 });
		 }
	   }
	});
}

var sectionId="";
//表头部门下拉框获取
function getDepartment(){
	$.ajax({
		url:"../../funds/payment/getDepartment",
		type : 'POST',  
		dataType: "json",
		contentType :'application/json', 
		success:function(data){
		 sectionList=data.data.sectionList;
		 sectionId=data.data.sectionId;
		 if(sectionList.length>0){
			 $("#sectionName option:not(:first)").remove();
			 $.each(sectionList,function(i,value){
				if(data.data.sectionId!=null && value.id==data.data.sectionId){
					$("#sectionName").append("<option value='"+value.id+"' selected='selected'>"+value.name+"</option>");
				}else{
					$("#sectionName").append("<option value='"+value.id+"'>"+value.name+"</option>");
				}
			 })

		 }
	   }
	});
}

//初始化树
function initGoodclassTree(){
	var setting = {
			data: {
				simpleData: {
					enable: true,
					idKey: "id",
					pIdKey: "pid",
					rootPId: null
				}
			},
			callback: {
				onClick: function(event, treeId, treeNode, msg) {
				   $("#metaDataTreeId").val(treeNode.id);
				   $("#search").click();
				}
			},
			view: {
				showIcon: false
			}
		};
		
		$.ajax({
			type: 'Get',
			url: "../../report/stock/selectStockTree",
			dataType: "json", 
			success: function(data) {
				$.fn.zTree.init($("#metaDataTree"), setting, data.data.stockTree);
				var str = $('#metaDataTree_1_switch').attr('class');
				var zTree = $.fn.zTree.getZTreeObj("metaDataTree");
			    zTree.expandAll(true);//展开全部节点
				var Class = str.replace('roots', 'center');
				$('#metaDataTree_1_switch').attr('class', Class);
			},
			error: function(msg) {
				alert(" 数据加载失败！" + msg);
			}
		});
}

//获取查询参数
function getPostData(){
	var param={};
	param.ifNumTypeSearch=$("#ifNumTypeSearch").is(":checked");
	param.companyName=$("#companyName").find("option:selected").text();
	param.sectionName=$("#sectionName").find("option:selected").text();
	if(param.companyName=="请选择"){
		param.companyName="";
	}
	if(param.sectionName=="请选择"){
		param.sectionName="";
	}
	param.goodsName=$("#goodsName").val();
	param.goodsCategoryId=$("#metaDataTreeId").val();
	return param;
}

//查询按钮单击事件
$("#search").click(function(){
	var postData=getPostData();
	createStockGrid(postData);
});

//radio点击事件
$(":radio").click(function(){
	$("#search").click();
});

//现存量查询表格
function createStockGrid(postData){
	$.jgrid.gridUnload("#jqGrid_metaData");
	var options = {
			LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
			TableName: "#jqGrid_metaData", //显示表格名称。遵照css选择器书写
			LoadTableUrl:  "../../report/stock/selectStockList",
			iconJsonUrl: "../json/icon.json",
			btnbox: ".btnbox ", //功能按钮存放容器。遵照css选择器书写	
			pager: "#jqGridPager"
		};
	$.jgrid.defaults.width = 2000;
	$.jgrid.defaults.responsive = true;
	$.jgrid.defaults.styleUI = 'Bootstrap';
	var colNames=[];
	var JqGridColModel=[];
	if(postData.ifNumTypeSearch){
		colNames = ['id','公司名称', '部门名称', '仓库名称', '商品名称','数量','总金额','单价','公司id','部门id','仓库id','商品id','分类id'];
		JqGridColModel = [  
                            {name:'id',index:'id', width:150,align:'center',sorttype:"string",key:true,hidden:true,sortable: false},
							{name:'companyName',index:'companyName', width:150,align:'center',sorttype:"string",sortable: false},
							{name:'sectionName',index:'sectionName', width:150,align:'center', sorttype:'string',sortable: false},
							{name:'storageName',index:'storageName', width:150,align:'center', sorttype:'string',sortable: false},
							{name:'goodsName',index:'goodsName', width:150,align:'center',  sorttype:'string',sortable: false},
							{name:'stockNumber',index:'stockNumber', width:150,align:'center', sorttype:'Long',formatter:formatNumberColumn,sortable: false},
							{name:'amount',index:'amount', width:150,align:'center', sorttype:'Long',formatter:formatNumberColumn,sortable: false},
							{name:'unitPrice',index:'unitPrice', width:150,align:'center', sorttype:'Long',formatter:formatNumberColumn,sortable: false},
							
							{name:'companyId',index:'companyId', width:1,align:'center', sorttype:'Long',hidden:true,sortable: false},
							{name:'sectionId',index:'sectionId', width:1,align:'center', sorttype:'Long',hidden:true,sortable: false},
							{name:'storageId',index:'storageId', width:1,align:'center', sorttype:'Long',hidden:true,sortable: false},
							{name:'goodsId',index:'goodsId', width:1,align:'center', sorttype:'Long',hidden:true,sortable: false},
							{name:'goodsCategoryId',index:'goodsCategoryId', width:150,align:'center', sorttype:'Long',hidden:true,sortable: false}
		                ];
		
	}else{
		colNames = ['公司名称', '部门名称', '仓库名称', '商品名称','串号','辅助串号','入库价', '成本价','供应商名称', '采购日期', '调入日期'];
		JqGridColModel = [
							{name:'companyName',index:'companyName', width:150,align:'center',sorttype:"string",sortable: false},
							{name:'sectionName',index:'sectionName', width:150,align:'center', sorttype:'string',sortable: false},
							{name:'storageName',index:'storageName', width:150,align:'center', sorttype:'string',sortable: false},
							{name:'goodsName',index:'goodsName', width:150,align:'center',  sorttype:'string',sortable: false},
							{name:'imei',index:'imei', width:150,align:'center',  sorttype:'string',sortable: false},
							{name:'auxiliaryImei',index:'auxiliaryImei', width:150,align:'center',  sorttype:'string',sortable: false},
							{name:'inStoragePrices',index:'inStoragePrices', width:150,align:'center', sorttype:'Long',formatter:formatNumberColumn,sortable: false},
							{name:'costPrice',index:'costPrice', width:200,align:'center', sorttype:'Long',formatter:formatNumberColumn,sortable: false},
							{name:'contactUnitName',index:'contactUnitName', width:150,align:'center',  sorttype:'string',sortable: false},
							{name:'purchaseDate',index:'purchaseDate', width:200,align:'center',sortable: false},
							{name:'transferredDate',index:'transferredDate', width:250,align:'center',sortable: false}
		                ];
	}
	
	$(options.TableName).jqGrid({
		mtype: "GET",
		url:options.LoadTableUrl,
		datatype: "json",
		postData:postData,
		jsonReader  : {	
			root:"data.rows",
			page: "data.page",
	        total: "data.total",
	        records: "data.records",
			repeatitems: false
				},
		colNames: colNames,
		colModel: JqGridColModel,
		sortable: false,
		rownumbers: false,	//显示行号
		rowNum: 20,
		rowList: [20,25,40],
		pager:options.pager,
		viewrecords: true,
		width: "100%",
		height: $(window).height() * 0.44,
		autowidth: true,
		rownumWidth:25, 
		shrinkToFit: true, 
		ondblClickRow: function(id) {
		    if(postData.ifNumTypeSearch){//数量查询查看串号明细
		    	var rowData = $(options.TableName).jqGrid('getRowData',id);
		    	delete rowData.stockNumber;
		    	delete rowData.amount;
		    	delete rowData.unitPrice;
		    	loadModal(rowData);
		    	$('#myModal').modal('show');
		    }
		},
		gridComplete:function(data){
			$(".ui-paging-pager tr:first td:last").html("");
		}
	})
}

//格式化数字
function formatNumberColumn(cellvalue, options, rowObject){
	if(cellvalue == 0){
		return "";
	}else{
		return $.formatFloat(cellvalue,2);
	}
}

//数量明细模态框
function loadModal(rowData) {
	$.jgrid.gridUnload("#jqGrid_modal");
	var options = {
		LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
		LoadTableUrl:"../../report/stock/selectStockDetail",
		TableName: "#jqGrid_modal", //显示表格名称。遵照css选择器书写
		iconJsonUrl: "../json/icon.json",
		btnbox: ".btnbox ", //功能按钮存放容器。遵照css选择器书写	
		pager: "#jqGridmodals"
	};
	$.jgrid.defaults.width = 1280;
	$.jgrid.defaults.responsive = true;
	$.jgrid.defaults.styleUI = 'Bootstrap';
	var colNames = ['公司名称', '部门名称', '仓库名称', '商品名称','串号','辅助串号','入库价', '成本价','供应商名称', '采购日期', '调入日期'];
	var JqGridColModel =[
							{name:'companyName',index:'companyName', width:100,align:'center',sorttype:"string",sortable: false},
							{name:'sectionName',index:'sectionName', width:100,align:'center', sorttype:'string',sortable: false},
							{name:'storageName',index:'storageName', width:100,align:'center', sorttype:'string',sortable: false},
							{name:'goodsName',index:'goodsName', width:100,align:'center',  sorttype:'string',sortable: false},
							{name:'imei',index:'imei', width:100,align:'center',  sorttype:'string',sortable: false},
							{name:'auxiliaryImei',index:'auxiliaryImei', width:100,align:'center',  sorttype:'string',sortable: false},
							{name:'inStoragePrices',index:'inStoragePrices', width:100,align:'center', sorttype:'Long',formatter:formatNumberColumn,sortable: false},
							{name:'costPrice',index:'costPrice', width:80,align:'center', sorttype:'Long',formatter:formatNumberColumn,sortable: false},
							{name:'contactUnitName',index:'contactUnitName', width:150,align:'center',  sorttype:'string',sortable: false},
							{name:'purchaseDate',index:'purchaseDate', width:150,align:'center',sortable: false},
							{name:'transferredDate',index:'transferredDate', width:150,align:'center',sortable: false}
		                ];
	loadtable();
	function loadtable() {
		$(options.TableName).jqGrid({
			url: options.LoadTableUrl,
			mtype: "GET",
			datatype: "json",
			postData:rowData,
			jsonReader  : {	
				root:"data.rows",
				page: "data.page",
		        total: "data.total",
		        records: "data.records",
				repeatitems: false
					},
			colNames: colNames,
			colModel: JqGridColModel,
			sortable: false,
			rowNum: 20,
			rowList: [20, 25, 40],
			pager: options.pager,
			viewrecords: true,
			width: "100%",
			height: $(window).height() * 0.44,
			autowidth: true,
			shrinkToFit: true,
			gridComplete:function(data){
				$(".ui-paging-pager tr:first td:last").html("");
			}
		})
	}
}
