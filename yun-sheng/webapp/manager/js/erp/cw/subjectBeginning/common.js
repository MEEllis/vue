$(function(){
	contactunitGrid();
	employeeModalGrid();
});

//部门模态框
function showSectionModal(cellInfo){
	//树设置参数
	var setting = {  
		    data: {//数据属性设置
		        simpleData: {enable: true,idKey: "id",pIdKey: "pid",rootPId: null}
	        },
	        async: {//从后台获取数据
	            enable: true,
	    		dataType: "json",
	    		url:'../../cw/qc/findSectionTree',
	            autoParam:[],
	            dataFilter: null
	        },
	        callback:{
	        	onClick: function (event, treeId, treeNode, msg) {zTreeOnClick(treeId,treeNode,cellInfo)},
	        },
			view: {//样式设置
				showIcon: false
			}
	    }; 
	$.fn.zTree.init($("#sectionTreeData"), setting);
	var zTree = $.fn.zTree.getZTreeObj("sectionTreeData");
    zTree.expandAll(true);
    $("#sectionModal").modal("show");
}

//往来单位模态框
var layerrCode="",remCode="";
function showContactunitModal(cellInfo){
	getClickCellInfo(cellInfo);
	
	$("#contactunitRemCode").val("");
	layerrCode="";
	remCode="";
	reloadContactunitGrid();
	//树设置参数
	var setting = {  
		    data: {//数据属性设置
		        simpleData: {enable: true,idKey: "id",pIdKey: "pid",layerrCode:"layerrCode",rootPId: null}
	        },
	        async: {//从后台获取数据
	            enable: true,
	    		dataType: "json",
	    		url:'../../tree/findContactunitTree',
	            autoParam:[],
	            dataFilter: null
	        },
	        callback:{
	        	onClick: function (event, treeId, treeNode, msg) {
	        	   zTreeOnClick(treeId,treeNode,cellInfo);
			   },
	        },
			view: {//样式设置
				showIcon: false
			}
	    }; 
	
	$.fn.zTree.init($("#contactunitTreeData"), setting);
	var zTree = $.fn.zTree.getZTreeObj("contactunitTreeData");
    zTree.expandAll(true);  
	$("#contactUnitModal").modal("show");
}

function getClickCellInfo(cellInfo){
	gridId = cellInfo.gridId;
	grid = $("#"+gridId);
	rowidRig = cellInfo.rowId;
	inptid = cellInfo.cellInputId;
}

//职员模态框
function showEmployeeModal(cellInfo){
	getClickCellInfo(cellInfo);
	$("#managerRemCode").val("");
	sectionId="";
	remCode="";
	//树设置参数
	var setting = {  
		    data: {//数据属性设置
		        simpleData: {enable: true,idKey: "id",pIdKey: "pid",rootPId: null}
	        },
	        async: {//从后台获取数据
	            enable: true,
	    		dataType: "json",
	    		url:'../../cw/qc/findSectionTree',
	            autoParam:[],
	            dataFilter: null
	        },
	        callback:{
	        	onClick: function (event, treeId, treeNode, msg) {zTreeOnClick(treeId,treeNode,cellInfo);},
	        },
			view: {//样式设置
				showIcon: false
			}
	    }; 
	$.fn.zTree.init($("#employeeTreeData"), setting);
	var zTree = $.fn.zTree.getZTreeObj("employeeTreeData");
    zTree.expandAll(true);
    reloadEmployeeGrid(null);
    $("#employeeModal").modal("show");
}


//树点击事件
var gridId="",grid="",rowidRig="",inptid="",sectionId="";
function zTreeOnClick(treeId,treeNode,cellInfo){
	if(cellInfo!=undefined){
		getClickCellInfo(cellInfo);
	}
	
	if(treeId=="sectionTreeData" && treeNode.id==0){//顶级节点
		if(cellInfo==undefined || cellInfo==null || cellInfo==""){
			$("#sectionId").val(null);
			$("#sectionName").val("所有部门");
			$("#sectionModal").modal("hide");
			reloadDataGrid();
		}
	}
	
	if(treeId=="sectionTreeData" && treeNode.children.length==0){//部门树,末级部门
		if(cellInfo==undefined || cellInfo==null || cellInfo==""){
			 $("#sectionId").val(treeNode.obj.id);
  		     $("#sectionName").val(treeNode.obj.name);
  		     reloadDataGrid();
		}else{
			//设置编辑器值
			$("#"+gridId+" #"+inptid).val(treeNode.obj.name);
			$("#"+gridId).jqGrid('setCell', rowidRig ,"departmentId" ,treeNode.obj.id);
			setTimeout('MyEiditGrid.getFocus('+'"#'+inptid+'")',200);
			$("#"+gridId).jqGrid("saveCell",lastrow,lastcell);
		}
		$("#sectionModal").modal("hide");
	}
	
	if(treeId=="contactunitTreeData"){//往来单位树
		layerrCode=treeNode.obj.layerrCode;
		reloadContactunitGrid();
	}
	
	if(treeId=="employeeTreeData"){
		if(treeNode.id==0){
			sectionId="";
		}else{
			sectionId=treeNode.obj.id;
		}
		reloadEmployeeGrid(sectionId);
	}
}

//加载往来单位grid
function reloadContactunitGrid(){
	 $("#contactunitModalGrid").jqGrid('setGridParam', {
	    url:'../../tree/getContactList',
		datatype : 'json',
		postData :{"layerrCode":layerrCode,"remCode":remCode},
		page : 1
	}).trigger("reloadGrid");
}

//加载经手人grid
function reloadEmployeeGrid(sectionId){
	 $("#employeeModalGrid").jqGrid('setGridParam', {
	    url:'../../tree/getManagerList',
		datatype : 'json',
		postData :{"remCode":remCode,"sectionId":sectionId},
		page : 1
	}).trigger("reloadGrid");
}

//经办人查询参数改变事件
$(document).delegate("#managerRemCode", "input propertychange", function(e){
	var id=e.target.id
	remCode=$(this).val();
	reloadEmployeeGrid(sectionId);
});

//往来单位助记码模糊搜索
$(document).delegate("#contactunitRemCode", "input propertychange", function(e){
	remCode=$(this).val();
	reloadContactunitGrid();
});

//grid表格行双击事件
function gridRowDbclick(clickGridId,id,name){
	//设置编辑器值
	$("#"+gridId+" #"+inptid).val(name);
	if(clickGridId=="#contactunitModalGrid"){//往来单位表格
		$("#"+gridId).jqGrid('setCell', rowidRig ,"partnerId" ,id);
		setTimeout('MyEiditGrid.getFocus('+'"#'+inptid+'")',200);
		$("#"+gridId).jqGrid("saveCell",lastrow,lastcell);
		$("#contactUnitModal").modal("hide");
	}
	
    if(clickGridId=="#employeeModalGrid"){//经手人表格
    	$("#"+gridId).jqGrid('setCell', rowidRig ,"employeeId" ,id);
    	setTimeout('MyEiditGrid.getFocus('+'"#'+inptid+'")',200);
		$("#"+gridId).jqGrid("saveCell",lastrow,lastcell);
		$("#employeeModal").modal("hide");
	}
}

//往来单位grid
function contactunitGrid(){
	var options = {
			LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
			iconJsonUrl:"../json/icon.json",
			TableName: "#contactunitModalGrid", //显示表格名称。遵照css选择器书写
			LoadTableUrl:'../../tree/getContactList',
			btnbox: ".btnbox ",//功能按钮存放容器。遵照css选择器书写	
			pager:"#contactunitGridpager",
	};
	$.jgrid.defaults.width = 1280;
	$.jgrid.defaults.responsive = true;
	$.jgrid.defaults.styleUI = 'Bootstrap';	
	var colNames = ['id','往来单位编码','往来单位名称','助记码','所属地区','往来单位类型','往来单位类别'];
	var JqGridColModel=[
						{name:'id',index:'id', width:1,align:'center', sorttype:'id',hidden:true},
						{name:'code',index:'code', width:100,align:'center', sorttype:'string',sortable:false},
						{name:'name',index:'name', width:100,align:'center', sorttype:'string',sortable:false},
						{name:'remCode',index:'remCode', width:100,align:'center', sorttype:'string',sortable:false},
						{name:'districtName',index:'districtName', width:100,align:'center', sorttype:'string',sortable:false},
						{name:'contactTypeName',index:'contactTypeName', width:100,align:'center', sorttype:'string',sortable:false},
						{name:'contactCategoryName',index:'contactCategoryName', width:100,align:'center', sorttype:'string',sortable:false}
	                ];
	loadtable();
	function loadtable(){
			$(options.TableName).jqGrid({
				url:options.LoadTableUrl,
				mtype:"GET",
				datatype: "json",
				jsonReader  : {	root: "data.rows",page: "data.page",total: "data.total",records: "data.records",repeatitems: false},
				colNames:colNames,          
	            colModel:JqGridColModel,
	            sortable:false,			            
	            rownumbers:true,
	            viewrecords: true,
	            pager:options.pager,
	            width: "100%" ,
	            height: $(window).height()*0.44,
				autowidth:true,
				rownumWidth:40,
				shrinkToFit:false,
				ondblClickRow:function(rowid,iRow,iCol,e){
					var name=$(options.TableName).getRowData(rowid).name;
					gridRowDbclick(options.TableName,rowid,name);		
				}
			})
			jQuery(options.TableName).jqGrid('setLabel',0, '序号');
	}
}

//经手人grid
function employeeModalGrid(){
	var options = {
			LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
			iconJsonUrl:"../json/icon.json",
			TableName: "#employeeModalGrid", //显示表格名称。遵照css选择器书写
			LoadTableUrl:'../../tree/getManagerList',
			btnbox: ".btnbox ",//功能按钮存放容器。遵照css选择器书写	
			pager:"#employeeGridpager",
	};
	
	$.jgrid.defaults.width = 1280;
	$.jgrid.defaults.responsive = true;
	$.jgrid.defaults.styleUI = 'Bootstrap';	
	var colNames = ['ID','员工编码','员工名称','所属部门','职位名称','助记码','备注'];
	var JqGridColModel=[
						{name:'id',index:'id', width:1,align:'center', sorttype:'string',hidden:true},
						{name:'code',index:'code', width:100,align:'center', sorttype:'string',sortable:false},
						{name:'name',index:'name', width:100,align:'center', sorttype:'string',sortable:false},
						{name:'sectionName',index:'sectionName', width:100,align:'center', sorttype:'string',sortable:false},
						{name:'positionName',index:'positionName', width:100,align:'center', sorttype:'string',sortable:false},
						{name:'remCode',index:'remCode', width:100,align:'center', sorttype:'string',sortable:false},
						{name:'remark',index:'remark', width:100,align:'center', sorttype:"string",sortable:false}
	                ];
	loadtable();
	function loadtable(){
			$(options.TableName).jqGrid({
				url:options.LoadTableUrl,
				mtype:"GET",
				datatype: "json",
				jsonReader  : {	root: "data.rows",page: "data.page",total: "data.total",records: "data.records",repeatitems: false},
				colNames:colNames,          
	            colModel:JqGridColModel,
	            sortable:false,			            
	            rownumbers:true,
	            viewrecords: true,
	            pager:options.pager,
	            width: "100%" ,
	            height: $(window).height()*0.44,
				autowidth:true,
				rownumWidth:40,
				shrinkToFit:false,
				ondblClickRow:function(rowid,iRow,iCol,e){
					var name=$(options.TableName).getRowData(rowid).name;
					gridRowDbclick(options.TableName,rowid,name);		
				}
			})
			jQuery(options.TableName).jqGrid('setLabel',0, '序号');
	}
}
