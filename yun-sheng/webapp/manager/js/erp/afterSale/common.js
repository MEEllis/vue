//获取仓库名称下拉框
var storageList =new Array();
function getStorage(sectionId){
	$.ajax({
		url:"/manager/salesCommon/getStorages",
		type : 'GET',  
		dataType: "json",
		async:false,
		data:{"sectionId":sectionId},
		contentType :'application/json', 
		success:function(data){
		  if(data.result==1){
			  storageList=data.data.storageList;
			  //$("#storageId").find("option:not(:first)").remove();
			  $("#storageId").html("");
			  if(storageList.length>0){
				  $.each(storageList,function(i,value){
					  $("#storageId").append("<option value='"+value.id+"'>"+value.name+"</option>");
				  });
			  }
		  }
	    }
	});
}

//部门模态框
function showSectionModal(sectionFlag){
	//树设置参数
	var setting = {  
		    data: {//数据属性设置
		        simpleData: {enable: true,idKey: "code",pIdKey: "pCode",rootPId: null}
	        },
	        callback:{
	        	onClick: function (event, treeId, treeNode, msg) {
	        	    zTreeClick(treeId,treeNode,sectionFlag);
			   },
	        },
			view: {//样式设置
				showIcon: false
			}
	    }; 
	$.request( {
		type : 'Get',
		url:'/manager/jxc/storage/authorityAndTree/findTree',
		dataType : "json", // 可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
		success : function(data) {
			$.fn.zTree.init($("#sectionTreeData"), setting, data);
			var zTree = $.fn.zTree.getZTreeObj("sectionTreeData");
			zTree.expandAll(true);// 展开全部节点
			$("#sectionModal").modal("show");
		},
		error : function(msg) {
			$.zxsaas_plus.showalert("提示","服务器出错,请稍后重试!")
		}
	});
}

//树点击事件
function zTreeClick(treeId,treeNode,sectionFlag){
	//往来单位树
	if(treeId=="contactunitTreeData"){
		layerrCode=treeNode.obj.layerrCode;
		reloadContactunitGrid();
	}
	//部门树
	if(treeId=="sectionTreeData"){
		//只能选择最末级
		if(treeNode.children.length != 0) return false;
		var modelId=sectionFlag.split("_")[1];
		var sectionFlag=sectionFlag.split("_")[0];
		if(sectionFlag=="repairSectionId"){
			$("#"+modelId+" input[name='repairSectionName").val(treeNode.name);
			$("#"+modelId+" input[name='repairSectionId']").val(treeNode.obj.id);	
			getTestBy(treeNode.obj.id);
			getStorage(treeNode.obj.id)
			if($(".YFcheckbox").prop('checked')){getStorage(treeNode.obj.id)}
			$("input[name='goodsCode']").val("");
			$("input[name='goodsName']").val("");
			$("input[name='goodsBrandName']").val("");
			$("input[name='goodsColorName']").val("");
			$("input[name='spareImeiStr']").val("");
			$("input[name='depositTotal']").val("0.00")
		}else if(sectionFlag=="salesSectionId"){
			$("."+modelId+" input[name='salesSectionName").val(treeNode.name);
			$("."+modelId+" input[name='salesSectionId']").val(treeNode.obj.id);
		}
		$("#sectionModal").modal("hide");
	}
}

//往来单位模态框
var layerrCode="";//往来单位类别层级编码
var remCode="";//往来单位助记码

var unitGridId = "",unitGrid ="",unitRowidRig ="",unitInptid ="";
function showContactunitModal(cellInfo){
	$("#contactunitRemCode").val("");
	layerrCode="";
	remCode="";
	if(cellInfo!="" && cellInfo!=null && cellInfo!=undefined){
		unitGridId = cellInfo.gridId;
		unitRowidRig = cellInfo.rowId;
		unitInptid = cellInfo.cellInputId;
	}
	initContactunitTree()
	reloadContactunitGrid();
    $("#contactunitModal").modal("show");
}

function initContactunitTree(){
	//树设置参数
	var setting = {  
		    data: {//数据属性设置
		        simpleData: {enable: true,idKey: "id",pIdKey: "pid",layerrCode:"layerrCode",rootPId: null}
	        },
	        async: {//从后台获取数据
	            enable: true,
	    		dataType: "json",
	    		url:'/manager/tree/findContactunitTree',
	            autoParam:[],
	            dataFilter: null
	        },
	        callback:{
	        	onClick: function (event, treeId, treeNode, msg) {
	        	    zTreeClick(treeId,treeNode);
			   },
	        },
			view: {//样式设置
				showIcon: false
			}
	    }; 
	
	$.fn.zTree.init($("#contactunitTreeData"), setting);
	var zTree = $.fn.zTree.getZTreeObj("contactunitTreeData");
    zTree.expandAll(true);
}

//加载往来单位grid
function reloadContactunitGrid(){
	 $("#contactunitModalGrid").jqGrid('setGridParam', {
	    url:'/manager/tree/getContactList',
		datatype : 'json',
		postData :{"layerrCode":layerrCode,"remCode":remCode},
		page : 1
	}).trigger("reloadGrid");
}

//往来单位助记码模糊搜索
$(document).delegate("#contactunitRemCode", "input propertychange", function(e){
	remCode=$(this).val();
	reloadContactunitGrid();
});

//往来单位grid
function contactunitGrid(){
	var options = {
			LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
			iconJsonUrl:"../json/icon.json",
			TableName: "#contactunitModalGrid", //显示表格名称。遵照css选择器书写
			LoadTableUrl:'/manager/tree/getContactList',
			btnbox: ".btnbox ",//功能按钮存放容器。遵照css选择器书写	
			pager:"#contactunitGridpager",
	};
	$.jgrid.defaults.width = 1280;
	$.jgrid.defaults.responsive = true;
	$.jgrid.defaults.styleUI = 'Bootstrap';	
	var colNames = ['id','往来单位编码','往来单位名称','助记码','往来单位类别'];
	var JqGridColModel=[
						{name:'id',index:'id', width:1,align:'center', sorttype:'id',hidden:true},
						{name:'code',index:'code', width:180,align:'center', sorttype:'string',sortable:false},
						{name:'name',index:'name', width:180,align:'center', sorttype:'string',sortable:false},
						{name:'remCode',index:'remCode', width:100,align:'center', sorttype:'string',sortable:false},
						{name:'contactCategoryName',index:'contactCategoryName', width:180,align:'center', sorttype:'string',sortable:false}
	                ];
	loadtable();
	function loadtable(){
			$(options.TableName).jqGrid({
				url:options.LoadTableUrl,
				mtype:"GET",
				datatype: "json",
				jsonReader  : {	
					root: "data.rows",
					page: "data.page",
			        total: "data.total",
			        records: "data.records",
					repeatitems: false
						},
				colNames:colNames,          
	            colModel:JqGridColModel,
	            sortable:false,			            
	            rownumbers:true,
	            viewrecords: true,
	            pager:options.pager,
	            width: "80%" ,
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

//grid表格行双击事件
function gridRowDbclick(gridId,rowid,name){
	if(gridId=="#contactunitModalGrid"){//往来单位表格
		if(registerModel==0){
			$("#scatteredModel input[name='contactsunitId']").val(rowid);
			$("#scatteredModel input[name='contactUnitName']").val(name);
			 $(".imei").val("");
			enableChooseRelyImei(true);
		}else if(registerModel==1){
			if(unitGridId==""){
				$("#batchModel input[name='contactsunitId']").val(rowid);
				$("#batchModel input[name='contactUnitName']").val(name);
			}else{
				var currRow = $(gridId).jqGrid('getRowData', rowid);	
				$("#"+unitGridId+" #"+unitInptid).val(currRow.name);
				$("#"+unitGridId).jqGrid('setCell', unitRowidRig ,"contactsunitId" ,currRow.id);
				$("#"+unitGridId).jqGrid('setCell', unitRowidRig ,"imei" ,null);
				$("#"+unitGridId).jqGrid('setCell', unitRowidRig ,"imeiId" ,null);
				unitGridId="";
			}
		}
		$("#contactunitModal").modal("hide");
	}
}

//弹出收付款结算方式模态框
function showSettleAccountsModal(){
	var sectionId=$("input[name='repairSectionId']").val();
	if(sectionId==""){
		$.zxsaas_plus.showalert("提示","请先选择维修部门!");
		return;
	}
	if($("#prepaymentAmount").val()=="0.00"){
		reloadPaymentWayGrid(sectionId);
	}
	$("#paymentWay").modal("show");
}

//重新加载收款方式表格
function reloadPaymentWayGrid(sectionId){
	$("#paymentWayModalGrid").jqGrid('setGridParam',{  
		url:"/manager/salesCommon/findAccountById",
        datatype:'json',  
        postData:{"sectionId":sectionId}
    }).trigger("reloadGrid"); //重新载入  
}

//付款方式grid页脚合计
function paymentWayGridFootData(){
	var payreceiptAmout=$("#paymentWayModalGrid").getCol('payreceiptAmout',false,'sum');
	$("#paymentWayModalGrid").jqGrid('footerData','set',{
        "payreceiptAmout": payreceiptAmout,
       }
	);
}

function cellOnBlurs(){
	$("#paymentWayModalGrid").jqGrid("saveCell",lastrow,lastcell);
	paymentWayGridFootData();
}

function cellOnBlur(){
	$("#paymentWayModalGrid").jqGrid("saveCell",lastrow,lastcell);
	paymentWayGridFootData();
}

//禁止输入非数字
function clearNoNum(evt,obj){
 var reg=/^(?:[1-9]+\d*|0)(\.\d+)?$/;
 if(!reg.test(obj.value)){
	   obj.value = obj.value.replace(/[^\d.]/g,"");
 }
}

//付款方式保存按钮单击事件
function savePaymentWay(){
	var payreceiptAmout=$.formatFloat($("#paymentWayModalGrid").getCol('payreceiptAmout',false,'sum'),2);
	$("#prepaymentAmount").val(payreceiptAmout);
}

//付款方式grid
var lastrow="";
var lastcell="";
function paymentWayGrid(){
	$.jgrid.defaults.width = 1280;
	$.jgrid.defaults.responsive = true;
	$.jgrid.defaults.styleUI = 'Bootstrap';	
	var colNames = ['id','账户类别','账户名称','金额','备注',"资金账户id","资金账户类型code"];
	var JqGridColModel=[
	                    {name:'id',index:'id', width:1,align:'center',key:true,sortable:false,hidden:true},
						{name:'accountTypeName',index:'account_id', width:150,align:'center', sorttype:'string',sortable:false},
						{name:'accountName',index:'account_name', width:150,align:'center', sorttype:'integer',sortable:false},
						{name:'payreceiptAmout',index:'payreceiptAmout', width:100,align:'center', sorttype:'Long',formatter:"number",editable:true,editoptions:{readonly:false,onblur:"cellOnBlurs(this)",onkeyup:"clearNoNum(event,this)"},sortable:false},
						{name:'remark',index:'remark', width:160,align:'center', sorttype:'string',editable:true,editoptions:{readonly:false,onblur:"cellOnBlur()"},sortable:false},
						{name:'accountId',index:'accountId', width:1,align:'center',hidden:true,sortable:false},
						{name:'accountType',index:'accountType', width:1,align:'center',hidden:true,sortable:false}
	                ];
	loadtable();
	function loadtable(){
			$("#paymentWayModalGrid").jqGrid({
				mtype:"GET",
				datatype: "json",
				jsonReader  : {	
					root: "data.rows",
					repeatitems: false
						},
				colNames:colNames,          
	            colModel:JqGridColModel,
	            cellsubmit: 'clientArray',//单元格保存内容的位置		
	            editurl: 'clientArray',
	            sortable:false,			            
	            rownumbers:true,
	           	cellEdit:true,
	            width: "80%" ,
				autowidth:true,
				rownumWidth:40,
				shrinkToFit:false,
				footerrow:true,  //设置表格显示表脚
				userDataOnFooter:true,//设置userData 显示在footer里
				beforeSelectRow:function(id){
					var rownumber=$('#' + id)[0].rowIndex;
					$('#'+rownumber+'_payreceiptAmout').bind("input propertychange",function(){
						var payreceiptAmout=Number($(this).val());
						payreceiptAmout += Number($("#paymentWayModalGrid").getCol('payreceiptAmout',false,'sum')); 
						$("#paymentWayModalGrid").jqGrid('footerData','set',{
					        "payreceiptAmout": payreceiptAmout,
					       }
						);
					});
					$(document).delegate('#'+rownumber+'_payreceiptAmout', "contextmenu", function(e){
						return false;
					});
				},
				beforeEditCell:function(rowid,cellname,v,iRow,iCol){
					lastrow = iRow;
					lastcell = iCol;		
				},
				gridComplete:function(data){
					$("#paymentWay tr:last").find("td").eq(0).text("合计");
					paymentWayGridFootData();
					
				}
			})
			jQuery("#paymentWayModalGrid").jqGrid('setLabel',0, '序号');
	}
}