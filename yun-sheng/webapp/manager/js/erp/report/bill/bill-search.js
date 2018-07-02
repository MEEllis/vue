$(function(){
	initTime();
	initBillTree();
	getDepartment();
	getManager(null);
	getContactunit();
});

//初始化开始时间，结束时间
function initTime(){
	var myDate = new Date();
    var year = myDate.getFullYear();
    var month = myDate.getMonth()+1;
    if (month<10){
        month = "0"+month;
    }
    var firstDay = year+"-"+month+"-01";
    $("#beginTime").val(firstDay);

    myDate = new Date(year,month,0);
    var lastDay = year+"-"+month+"-"+myDate.getDate();
	$("#endTime").val(lastDay);
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

//表头经手人下拉框获取
function getManager(sectionId){
	$.ajax({
		url:"../../funds/payment/getManager",
		type : 'get',  
		dataType: "json",
		contentType :'application/json', 
		data:{"sectionId":sectionId},
		success:function(data){
		 $("#managersName option:not(:first)").remove();
		 var managerList=data.data.managerList;
		 if(managerList.length>0){
			 $.each(managerList,function(i,value){
				 $("#managersName").append("<option value='"+value.id+"'>"+value.name+"</option>");
			 });
		 }
	   }
	});
}

//表头往来单位下拉框获取
function getContactunit(){
	$.ajax({
		url:"../../funds/payment/getContactunit",
		type : 'POST',  
		dataType: "json",
		contentType :'application/json', 
		success:function(data){
		 var contactsUnitList=data.data.contactsUnitList;
		 if(contactsUnitList.length>0){
			 $.each(contactsUnitList,function(i,value){
				 $("#contactUnitName").append("<option value='"+value.id+"'>"+value.name+"</option>");
			 });
		 }
	   }
	});
}

//部门下拉框改变事件
function changeDepartment(){
	var sectionId=$("#sectionName").val();
	getManager(sectionId);
}

//初始化单据列表树
function initBillTree(){
	var setting = {
			data: {
				simpleData: {
					enable: true,
					idKey: "id",
					pIdKey: "pId",
					rootPId: null
				}
			},
			callback: {
				onClick: function(event, treeId, treeNode, msg) {
					//通过id调用对应方法 重构表格
				    if(!treeNode.open){
				    	$("#billsTreeId").val(treeNode.id);
				    }else{
				    	$("#billsTreeId").val("-1");
				    }
					$(".grid-title").text(treeNode.name);
					$("#search").click();
				}
			},
			view: {
				showIcon: false
			}
		};

		$.ajax({
			type: 'Get',
			url: '../../json/form/billsTree.json',
			dataType: "json", 
			success: function(data) {
				$.fn.zTree.init($("#metaDataTree"), setting, data);
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

//查询按钮单击事件
$("#search").click(function(){
	$.jgrid.gridUnload("#jqGrid_metaData");
	var postData=$("#searchForm").toJsonObject();
	postData.sectionName=$("#sectionName").find("option:selected").text();
	postData.managersName=$("#managersName").find("option:selected").text();
	postData.contactUnitName=$("#contactUnitName").find("option:selected").text();
	if(postData.sectionName=="请选择"){
		postData.sectionName="";
	}
	if(postData.managersName=="请选择"){
		postData.managersName="";
	}
	if(postData.contactUnitName=="请选择"){
		postData.contactUnitName="";
	}
	if(postData.billsType==""){
		$.zxsaas_plus.showalert("提示","请选择一种单据类型!");
		return;
	}else if(postData.billsType=="-1"){
		return;
	}
	if(postData.billsType==1111){
		$.zxsaas_plus.showalert("提示","该单据需求未出，暂时无法查看!");
		return;
	}
	createBillListGrid(postData);
});

//单据列表grid
function createBillListGrid(postData){
   var options = {
			LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
			LoadTableUrl: "../../report/bill/selectBillList",
			TableName: "#jqGrid_metaData", //显示表格名称。遵照css选择器书写
			iconJsonUrl: "../json/icon.json",
			btnbox: ".btnbox ", //功能按钮存放容器。遵照css选择器书写	
			pager: "#jqGridPager"
	};
    $.jgrid.defaults.width = 1280;
	$.jgrid.defaults.responsive = true;
	$.jgrid.defaults.styleUI = 'Bootstrap';
	$(options.TableName).jqGrid({
		url: options.LoadTableUrl,
		mtype: "GET",
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
		colModel:JqGridColModel,
		sortable: false,
		multiselect : true,	
		rownumbers:true,
		rowNum: 20,
		rowList: [20, 25, 40],
		pager: options.pager,
		viewrecords: true,
		width: "100%",
		height: $(window).height() * 0.44,
		autowidth: true,
		rownumWidth: 30, 
		shrinkToFit: false,
		gridComplete:function(data){
			$(".ui-paging-pager tr:first td:last").html("");
		},
		loadComplete:function(data){
			hideBillsColumn(data,options);		
		}
	})
}

//复制、修改按钮单击事件
$(".change").click(function(e){
	var btnId=e.target.id;
	var checkdId= $("#jqGrid_metaData").jqGrid('getGridParam','selarrrow');
	if(checkdId.length!=1){
		if(btnId=="copy"){
			$.zxsaas_plus.showalert("提示","请选择一条记录复制!");
			return;
		}
		if(btnId=="update"){
			$.zxsaas_plus.showalert("提示","请选择一条记录修改!");
			return;
		}
		if(btnId=="check"){
			$.zxsaas_plus.showalert("提示","请选择一条记录联查!");
			return;
		}
	}
	
	if(checkdId.length==1){//跳转
		if(btnId=="copy"){
			
		}
		if(btnId=="update"){
			
		}
		if(btnId=="check"){
			
		}
	}
});

//红冲按钮点击事件
$(".post").click(function(e){
	var checkdIds= $("#jqGrid_metaData").jqGrid('getGridParam','selarrrow');
	if(checkdIds!=undefined && checkdIds.length==0){
		$.zxsaas_plus.showalert("提示","请至少选择一条记录!");
		return;
	}
	$.ajax({
		type : 'POST',  
		url:"../../report/bill/invalidBills",
		datatype:"json",
		data: {"checkdIds": checkdIds},
		traditional: true,
		success:function(data){
			
		}
	});
});

var colNames = ['id','单据编号', '单据日期', '部门名称',
	            '调出部门', '调入部门','移出仓库','移入仓库',
	            '经手人','往来单位',
	            '单据金额', '整单折扣', '应付金额', '已付金额','未付金额',
	            '订货量','审批量','已入量','未入量','订货总额','审批总额','已入总额',
	            '单据状态','单备注','制单人','制单时间','修改人','修改时间','审核人','审核时间','强制完成人','强制完成时间',
	            '过账人','过账时间','红冲人','红冲时间',
	            '作废人','作废时间','接收人','接收时间','拒收人','拒收时间','拒收原因'
	            ];

var JqGridColModel = [  
                  {name:'id',index:'id', width:1,align:'center',sorttype:"string",key:true,hidden:true,sortable: false},
					{name:'billsCode',index:'billsCode', width:150,align:'center',sorttype:"string",sortable: false},
					{name:'billsDate',index:'billsDate', width:150,align:'center', sorttype:'string',sortable: false},
					{name:'sectionName',index:'sectionName', width:150,align:'center', sorttype:'string',sortable: false},
					
					{name:'inDepartmentName',index:'inDepartmentName', width:150,align:'center',sorttype:"string",sortable: false},
					{name:'outDepartmentName',index:'outDepartmentName', width:150,align:'center', sorttype:'string',sortable: false},
					{name:'inStorageName',index:'inStorageName', width:150,align:'center', sorttype:'string',sortable: false},
					{name:'outStorageName',index:'outStorageName', width:150,align:'center',  sorttype:'string',sortable: false},
					
					{name:'managersName',index:'managersName', width:150,align:'center',  sorttype:'string',sortable: false},
					{name:'contactUnitName',index:'contactUnitName', width:150,align:'center', sorttype:'Long',sortable: false},
					
					{name:'billsAmount',index:'billsAmount', width:150,align:'center',sorttype:"string",sortable: false},
					{name:'billsDiscount',index:'billsDiscount', width:150,align:'center', sorttype:'string',sortable: false},
					{name:'payableAmount',index:'payableAmount', width:150,align:'center', sorttype:'string',sortable: false},
					{name:'amount',index:'amount', width:150,align:'center',  sorttype:'string',sortable: false},
					{name:'unpaidAmount',index:'unpaidAmount', width:150,align:'center', sorttype:'Long',sortable: false},
					
					{name:'orderNum',index:'orderNum', width:150,align:'center', sorttype:'Long',sortable: false},
					{name:'reviewsNum',index:'reviewsNum', width:150,align:'center', sorttype:'Long',sortable: false},
					{name:'introduceNum',index:'introduceNum', width:150,align:'center', sorttype:'Long',sortable: false},
					{name:'notIntroduceNum',index:'notIntroduceNum', width:150,align:'center', sorttype:'Long',sortable: false},
					{name:'orderAmount',index:'orderAmount', width:150,align:'center', sorttype:'Long',sortable: false},
					{name:'reviewsAmount',index:'reviewsAmount', width:150,align:'center', sorttype:'Long',sortable: false},
					{name:'introduceAmount',index:'introduceAmount', width:150,align:'center', sorttype:'Long',sortable: false},
					
					{name:'billsStatus',index:'billsStatus', width:150,align:'center',sorttype:"string",sortable: false},
					{name:'remark',index:'remark', width:150,align:'center', sorttype:'string',sortable: false},
					{name:'createUname',index:'createUname', width:150,align:'center', sorttype:'string',sortable: false},
					{name:'createDate',index:'createDate', width:150,align:'center',  sorttype:'string',sortable: false},
					{name:'updateUname',index:'updateUname', width:150,align:'center', sorttype:'string',sortable: false},
					{name:'updateDate',index:'updateDate', width:150,align:'center', sorttype:'string',sortable: false},
					
					{name:'auditor',index:'auditor', width:150,align:'center',sorttype:"string",sortable: false},
					{name:'reviewsDate',index:'reviewsDate', width:150,align:'center', sorttype:'string',sortable: false},
					{name:'forceFinishedName',index:'forceFinishedName', width:150,align:'center', sorttype:'string',sortable: false},
					{name:'forceFinishedDate',index:'forceFinishedDate', width:150,align:'center',  sorttype:'string',sortable: false},
					
					{name:'postByName',index:'postByName', width:150,align:'center', sorttype:'string',sortable: false},
					{name:'postDate',index:'postDate', width:150,align:'center',  sorttype:'string',sortable: false},
					{name:'invalidByName',index:'invalidByName', width:150,align:'center', sorttype:'string',sortable: false},
					{name:'invalidDate',index:'invalidDate', width:150,align:'center', sorttype:'string',sortable: false},
					
					{name:'cancelByName',index:'cancelByName', width:150,align:'center',sorttype:"string",sortable: false},
					{name:'cancelDate',index:'cancelDate', width:150,align:'center', sorttype:'string',sortable: false},
					{name:'receiveByName',index:'receiveByName', width:150,align:'center', sorttype:'string',sortable: false},
					{name:'receiveDate',index:'receiveDate', width:150,align:'center',  sorttype:'string',sortable: false},
					{name:'rejectionByName',index:'rejectionByName', width:150,align:'center', sorttype:'string',sortable: false},
					{name:'rejectionDate',index:'rejectionDate', width:150,align:'center', sorttype:'string',sortable: false},
					{name:'rejectionCause',index:'rejectionCause', width:150,align:'center', sorttype:'string',sortable: false}
              ];