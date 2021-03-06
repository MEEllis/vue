var whoOnclickSection = '';		//部门 名称

/***modal调出部门 有权限限制部门***/
function yesAuthority(strName){
	$("#OutSectionModal").modal('show');
	whoOnclickSection = strName;
	var setting = {
		data : {
			simpleData : {
				enable : true,
				idKey : "id",
				pIdKey : "parentId",
				rootPId : null
			}
		},
		check : {
			enable : true,
			chkStyle: "checkbox",
			chkboxType: { "Y": "s", "N": "ps" }
		},
		callback:{
			//beforeDblClick:zTreeOnCheck
			onCheck: cancelOutChoose
		},
		view : {
			showIcon : false
		}

	};

	$.ajax( {
		type : 'Get',
		url:basePath+'/inventory/common/getSectionTreeNodeVoList',//调出部门
		dataType : "json", // 可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
		success : function(data) {
		  if(data.data.sectionVoList){
			 for(var i=0;i<data.data.sectionVoList.length;i++){
				 var n = data.data.sectionVoList[i];
				 if(n.chkDisabled==undefined || n.chkDisabled==true ){
					 data.data.sectionVoList[i].chkDisabled=false;
				 }
			 }
		    $.fn.zTree.init($("#outSectionTree"), setting, data.data.sectionVoList);
			var zTree = $.fn.zTree.getZTreeObj("outSectionTree");
			zTree.expandAll(false);// 展开全部节点
			checkLastNodes("#selOutDepartmentIdStr","outSectionTree");//勾选上次选中节点
			
		  }
	},
	error : function(msg) {
	}
	});
}

function cancelOutChoose(event, treeId, treeNode){
	  var ozTree = $.fn.zTree.getZTreeObj("outSectionTree");
	  var id =treeNode.id;//-1是父节点
	  if(id!=-1||id!="-1"){
		  if(!treeNode.getCheckStatus().checked){
				ozTree.checkNode(treeNode.getParentNode(), false, false);
			}  
	  }
}
/***modal 调入部门 无权限限制部门***/
function noAuthority(strName){
	$("#inSectionModal").modal('show');
	whoOnclickSection = strName;
	var setting = {
		data : {
			simpleData : {
				enable : true,
				idKey : "id",
				pIdKey : "parentId",
				rootPId : null
			}
		},
		check : {
			enable : true,
			chkStyle: "checkbox",
			chkboxType: { "Y": "s", "N": "ps" }
		},
		callback : { 
			//beforeDblClick:zTreeOnCheckIn
			onCheck: cancelInChoose
		},
		view : {
			showIcon : false
		}

	};
	$.ajax( {
		type : 'Get',
		url:basePath+'/inventory/common/getAccessSectionTreeNodeVoList',//调入部门
		dataType : "json", // 可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
		success : function(data) {
		 if(data.data.sectionVoList){
			 for(var i=0;i<data.data.sectionVoList.length;i++){
				 var n = data.data.sectionVoList[i];
				 if(n.chkDisabled==undefined || n.chkDisabled==true ){
					 data.data.sectionVoList[i].chkDisabled=false;
				 }
			 }
			$.fn.zTree.init($("#inSectionTree"), setting, data.data.sectionVoList);
			var zTree = $.fn.zTree.getZTreeObj("inSectionTree");
			zTree.expandAll(false);// 展开全部节点
			checkLastNodes("#selInDepartmentIdStr","inSectionTree");//勾选上次选中节点
		 }
		},
		error : function(msg) {
		}
	});
}
function cancelInChoose(event, treeId, treeNode){
	  var izTree = $.fn.zTree.getZTreeObj("inSectionTree");
	  var id =treeNode.id;//-1是父节点
	  if(id!=-1||id!="-1"){
		  if(!treeNode.getCheckStatus().checked){
				izTree.checkNode(treeNode.getParentNode(), false, false);
			}  
	  }
}
/*勾选树节点*/
function checkLastNodes(selIdStr,treeId){
	 var sel_val =$(selIdStr).val(),
     arr_Val =sel_val.split(",");
     treeObj = $.fn.zTree.getZTreeObj(treeId);
	 if(arr_Val.length>0&&arr_Val[0]){
		for (var i=0; i <arr_Val.length; i++) {
			treeObj.checkNode(treeObj.getNodeByParam("id", arr_Val[i]), true, true);
		}
	 }	    
}


/*调出部门、调入部门点击确定*/
var out_current_nodes=[];
var in_current_nodes=[];
$(document).on("click",".outSectionConfirm",function(){
	 checkNodes("outSectionTree","selOutDepartmentIdStr");
	 $("#OutSectionModal").modal('hide');
	 jSR();
});
$(document).on("click",".inSectionConfirm",function(){
	 checkNodes("inSectionTree","selInDepartmentIdStr");
	 $("#inSectionModal").modal('hide');
});
function checkNodes(treeId,selctStr){
	out_current_nodes=[];
	in_current_nodes=[]
	var treeObj = $.fn.zTree.getZTreeObj(treeId);
	var nodes = treeObj.getCheckedNodes(true);
	if(nodes){
		if (nodes.length>0) {
			if(treeId=="outSectionTree"){
				out_current_nodes=nodes;
			}else if(treeId=="inSectionTree"){
				in_current_nodes=nodes;
			}
			var ids=[];
			var treeNodeName=[];
			for(var i=0;i<nodes.length;i++){
				if(nodes[i].id&&nodes[i].name){
					ids.push(nodes[i].id);
					treeNodeName.push(nodes[i].name);
				}else{
				    $.zxsaas_plus.showalert("提示","存在所选结点的id或者名称为空!");
				}
			}
			if(ids.length>0){
			  $("#"+selctStr).val(ids.join(","));
			  $("#" + whoOnclickSection).val(treeNodeName.join(","));
			  if(treeId=="inSectionTree"){
				  $("#filterOutName").attr("title",treeNodeName.join(",")); 
			  }else if(treeId=="outSectionTree"){
				  $("#filterInName").attr("title",treeNodeName.join(","));
			  }
			}
		}else{
			 $("#"+selctStr).val("");
			 $("#" + whoOnclickSection).val("");
			if(treeId=="outSectionTree"){
				out_current_nodes=[];
				  $("#filterOutName").attr("title",""); 
				  $("#managersUid>option:first").attr("selected",true);
				  $("#managersUid").attr("disabled","disabled");
			}else if(treeId=="inSectionTree"){
				in_current_nodes=[];
				  $("#filterInName").attr("title","");
			}
		}
	}
	
}

function jSR(){
	if($("#selOutDepartmentIdStr").val()){
		   $("#managersUid").removeAttr("disabled");
			$.request({
	    		type:'post',
	        	url:basePath+'/inventory/common/getEmployeeVoList',
	        	data:{sectionId:$('#selOutDepartmentIdStr').val()},
	        	dataType:'json',
	        	success:function(data){
					if(data.result==1){
						var res=data.data.employeeVoList;
						var html;
						html='<option value="" selected="">请选择部门</option>';
						$.each(res,function(i,val){
							html+='<option value="'+val.employeeId+'">'+val.name+'</option>';
						})
						$('#managersUid').html(html)
					//	if(callback)callback();
					}else{
						$.zxsaas_plus.showalert('error',data.desc);
					}
	    		},
	    		error:function(){
	    			alert('请求失败！')
	    		}
			});
	}else{
		if(!$("#managersUid").attr("disabled")){
		   $("#managersUid>option:first").attr("selected",true);
		   $("#managersUid").attr("disabled","disabled");
		}
	}
	
}
/*调出部门、调入部门清空选中数据*/
$(".clear_dc").on("click",function(){
	$("#selOutDepartmentIdStr").val("");
	$("#filterInName").val("");
	$("#filterInName").attr("title","");
	jSR();
});
$(".clear_dr").on("click",function(){
	$("#selInDepartmentIdStr").val("");
	$("#filterOutName").val("");
	$("#filterOutName").attr("title","");
});

/***dblclick 有权限部门双击***/
function zTreeOnCheck(event, treeId, treeNode) {
	//只能选择最末级
	if(treeId.children && treeId.children.length != 0) return false;
	switch (whoOnclickSection) {
	case 'filterOutName':
		//过滤调出部门
		$("#selOutDepartmentIdStr").val(treeId.obj.id);
		$("#" + whoOnclickSection).val(treeId.obj.name);
		break;
	case 'filterInName':
		//调入部门
		$("#selInDepartmentIdStr").val(treeId.obj.id);
		$("#" + whoOnclickSection).val(treeId.obj.name);
		break;
	case 'outDepartmentName':
		//调出部门
		if($('#inDepartmentId').val() == treeId.obj.id){
			$("#OutSectionModal").modal('hide');
			$.zxsaas_plus.showalert("提示信息","调入部门不能和调出部门相同!");
			return false;
		}
		var rowIds = $("#jqGrid_SubjectBalance").getDataIDs(); 
		//切换部门时要提示清空明细吗
		if($("#outDepartmentId").val() != treeId.obj.id){
			if(rowIds.length == 1){  //是否有一行数据
				//获取这行，如果这行不是空行怎判断是否清空
				var rowData = $("#jqGrid_SubjectBalance").jqGrid("getRowData", rowIds);
				if(rowData.storageName != '' || rowData.goodsName != '' || rowData.goodsNumber != 0 || rowData.remark != ''){
					$.zxsaas_plus.showconfirm("提示信息",'切换部门将清空表格,是否继续?',function(){
						jQuery("#jqGrid_SubjectBalance").jqGrid("clearGridData");
						
						//加一个null行
						$('#jqGrid_SubjectBalance').jqGrid('addRowData',0,{storageName:'',goodsName:'',stockNumber:0,goodsNumber:0,price:0.00,amount:0.00,remark:''});
						
						$("#outDepartmentId").val(treeId.obj.id);
						initManagers();
						$("#" + whoOnclickSection).val(treeId.obj.name);
					},function(){
					});
				}else{
					$("#outDepartmentId").val(treeId.obj.id);
					initManagers();
					$("#" + whoOnclickSection).val(treeId.obj.name);
				}
			}else if(rowIds.length != 0){
				$.zxsaas_plus.showconfirm("提示信息",'切换部门将清空表格,是否继续?',function(){
					jQuery("#jqGrid_SubjectBalance").jqGrid("clearGridData");
					
					//加一个null行
					$('#jqGrid_SubjectBalance').jqGrid('addRowData',0,{storageName:'',goodsName:'',stockNumber:0,goodsNumber:0,price:0.00,amount:0.00,remark:''});
					
					$("#outDepartmentId").val(treeId.obj.id);
					initManagers();
					$("#" + whoOnclickSection).val(treeId.obj.name);
				},function(){
				});
			}else{
				$("#outDepartmentId").val(treeId.obj.id);
				initManagers();
				$("#" + whoOnclickSection).val(treeId.obj.name);
			}
		}
		//refreshValidatorField("outDepartmentName",'#ibillsHead');//刷新验证信息
		break;
	case 'sectionNameImport':
		//单据引入
		$("#sectionIdImport").val(treeId.obj.id);
		billsImport();
		$("#" + whoOnclickSection).val(treeId.obj.name);
		break;
	case 'sectionName':
		var rowIds = $("#jqGrid_SubjectBalance").getDataIDs(); 
		//切换部门时要提示清空明细吗
		if($("#sectionId").val() != treeId.obj.id){	//选择的和当前部门是否一样
			if(rowIds.length == 1){	//是否有一行数据
				//获取这行，如果这行不是空行怎判断是否清空
				var rowData = $("#jqGrid_SubjectBalance").jqGrid("getRowData", rowIds);
				if(rowData.goodsName != '' || rowData.goodsNumber != 0 || rowData.remark != ''){
					$.zxsaas_plus.showconfirm("提示信息",'切换部门将清空表格,是否继续?',function(){
						jQuery("#jqGrid_SubjectBalance").jqGrid("clearGridData");
						//商品移库  部门名称
						$("#sectionId").val(treeId.obj.id);
						initManagers();
						initMoveStorage();
						$("#" + whoOnclickSection).val(treeId.obj.name);
					},function(){
					});
				}else{
					//商品移库  部门名称
					$("#sectionId").val(treeId.obj.id);
					initManagers();
					initMoveStorage();
					$("#" + whoOnclickSection).val(treeId.obj.name);
				}
			}else if(rowIds.length != 0){	//是否一行都没有
				$.zxsaas_plus.showconfirm("提示信息",'切换部门将清空表格,是否继续?',function(){
					jQuery("#jqGrid_SubjectBalance").jqGrid("clearGridData");
					//商品移库  部门名称
					$("#sectionId").val(treeId.obj.id);
					initManagers();
					initMoveStorage();
					$("#" + whoOnclickSection).val(treeId.obj.name);
				},function(){
				});
			}else{
				//商品移库  部门名称
				$("#sectionId").val(treeId.obj.id);
				initManagers();
				initMoveStorage();
				$("#" + whoOnclickSection).val(treeId.obj.name);
			}
		}
		
		//refreshValidatorField("sectionName",'#ibillsHead');//刷新验证信息
		break;
	case 'filterSectionName':
		//商品移库  过滤部门名称
		$("#selSectionIdStr").val(treeId.obj.id);
		if(num == '11')initMoveStorageImport();
		if(num == '9' || num == '10' || num == '14' || num == '12' || num == '44')initStorageImport();
		$("#" + whoOnclickSection).val(treeId.obj.name);
		break;
	case 'sectionNameOtherOut':
		var rowIds = $("#jqGrid_SubjectBalance").getDataIDs(); 
		//切换部门时要提示清空明细吗
		if($("#sectionId").val() != treeId.obj.id){ //选择的和当前部门是否一样
			if(rowIds.length == 1){  //是否有一行数据
				//获取这行，如果这行不是空行怎判断是否清空
				var rowData = $("#jqGrid_SubjectBalance").jqGrid("getRowData", rowIds);
				if(rowData.storageName != '' || rowData.goodsName != '' || rowData.goodsNumber != 0 || rowData.price != 0 || rowData.amount != 0 || rowData.remark != ''){
					$.zxsaas_plus.showconfirm("提示信息",'切换部门将清空表格,是否继续?',function(){
						jQuery("#jqGrid_SubjectBalance").jqGrid("clearGridData");
						
						//加一个null行
						$('#jqGrid_SubjectBalance').jqGrid('addRowData',0,{storageName:'',goodsName:'',goodsNumber:0,price:0.00,amount:0.00,remark:''});
						
						//其他出库  部门名称
						$("#sectionId").val(treeId.obj.id);
						$('#sectionName').val(treeId.name);
						initStorage();
						initManagers();
						$("#" + whoOnclickSection).val(treeId.obj.name);
					},function(){
					});
				}else{
					//其他出库  部门名称
					$("#sectionId").val(treeId.obj.id);
					$('#sectionName').val(treeId.name);
					initStorage();
					initManagers();
					$("#" + whoOnclickSection).val(treeId.obj.name);
				}
			}else if(rowIds.length != 0){
				$.zxsaas_plus.showconfirm("提示信息",'切换部门将清空表格,是否继续?',function(){
					jQuery("#jqGrid_SubjectBalance").jqGrid("clearGridData");
					
					//加一个null行
					$('#jqGrid_SubjectBalance').jqGrid('addRowData',0,{storageName:'',goodsName:'',goodsNumber:0,price:0.00,amount:0.00,remark:''});
					
					//其他出库  部门名称
					$("#sectionId").val(treeId.obj.id);
					$('#sectionName').val(treeId.name);
					initStorage();
					initManagers();
					$("#" + whoOnclickSection).val(treeId.obj.name);
				},function(){
				});
			}else{
				//其他出库  部门名称
				$("#sectionId").val(treeId.obj.id);
				$('#sectionName').val(treeId.name);
				initStorage();
				initManagers();
				$("#" + whoOnclickSection).val(treeId.obj.name);
			}
		}
		// 验证相关操作
		var formId = $('body').find('form').eq(0).attr('id');//表单Id
		//refreshValidatorField("sectionName",'#' + formId);//刷新验证信息
		break;
	case 'sectionName2':
		$("#sectionId2").val(treeId.obj.id);
		initStorage();
		initManagers();
		$("#" + whoOnclickSection).val(treeId.obj.name);
//		$('#contactName2').removeAttr('disabled');
//		$('#contactName2').val('');
		//refreshValidatorField("sectionName",'#ibillsHead');//刷新验证信息
		break;
	case 'sectionNameCostAdjust':
		//判断数量调整0还是串号调整1
		var rowIds = tabNum == 0 ? $("#jqGrid_SubjectBalance").getDataIDs() : $("#jqGrid_ImeiAdjust").getDataIDs();
		
		//切换部门时要提示清空明细吗
		if($("#sectionId").val() != treeId.obj.id){ //选择的和当前部门是否一样
			if(rowIds.length == 1){  //是否有一行数据
				var rowData = {};
				//获取这行，如果这行不是空行怎判断是否清空
				if(tabNum == 0){
					rowData = $("#jqGrid_SubjectBalance").jqGrid("getRowData", rowIds);
					
					if(rowData.storageName != '' || rowData.goodsName != '' || rowData.inputChangePrice != 0 || rowData.remark != ''){	//如果有输入内容就要提示
						$.zxsaas_plus.showconfirm("提示信息",'切换部门将清空表格,是否继续?',function(){
							jQuery("#jqGrid_SubjectBalance").jqGrid("clearGridData");
							
							//加一个null行
							$('#jqGrid_SubjectBalance').jqGrid('addRowData',0,{storageName:'',goodsName:'',stockNumber:0,amount:0.00,avgPrice:0.00,inputChangePrice:0.00,geTotalChangeAmount:0.00,remark:''});
							
							//成本调整  部门名称
							$("#sectionId").val(treeId.obj.id);
							$('#sectionName').val(treeId.name);
							initStorage();
							initManagers();
							$("#" + whoOnclickSection).val(treeId.obj.name);
						},function(){
						});
					}else{
						//成本调整  部门名称
						$("#sectionId").val(treeId.obj.id);
						$('#sectionName').val(treeId.name);
						initStorage();
						initManagers();
						$("#" + whoOnclickSection).val(treeId.obj.name);
					}
				}else{
					rowData = $("#jqGrid_ImeiAdjust").jqGrid("getRowData", rowIds);
					
					if(rowData.storageName != '' || rowData.goodsName != '' || rowData.imei != '' || rowData.thischangePrice != 0 || rowData.remark != ''){
						$.zxsaas_plus.showconfirm("提示信息",'切换部门将清空表格,是否继续?',function(){
							jQuery("#jqGrid_ImeiAdjust").jqGrid("clearGridData");
							
							//加一个null行
							$('#jqGrid_ImeiAdjust').jqGrid('addRowData',0,{});
							
							//成本调整  部门名称
							$("#sectionId").val(treeId.obj.id);
							$('#sectionName').val(treeId.name);
							initStorage();
							initManagers();
							$("#" + whoOnclickSection).val(treeId.obj.name);
						},function(){
						});
					}else{
						//成本调整  部门名称
						$("#sectionId").val(treeId.obj.id);
						$('#sectionName').val(treeId.name);
						initStorage();
						initManagers();
						$("#" + whoOnclickSection).val(treeId.obj.name);
					}
				}
			}else if(rowIds.length != 0){
				$.zxsaas_plus.showconfirm("提示信息",'切换部门将清空表格,是否继续?',function(){
					if(tabNum == 0){
						jQuery("#jqGrid_SubjectBalance").jqGrid("clearGridData");
						
						//加一个null行
						$('#jqGrid_SubjectBalance').jqGrid('addRowData',0,{storageName:'',goodsName:'',stockNumber:0,amount:0.00,avgPrice:0.00,inputChangePrice:0.00,geTotalChangeAmount:0.00,remark:''});
						
						//成本调整  部门名称
						$("#sectionId").val(treeId.obj.id);
						$('#sectionName').val(treeId.name);
						initStorage();
						initManagers();
						$("#" + whoOnclickSection).val(treeId.obj.name);
					}else{
						jQuery("#jqGrid_ImeiAdjust").jqGrid("clearGridData");
						
						//加一个null行
						$('#jqGrid_ImeiAdjust').jqGrid('addRowData',0,{});
						
						//成本调整  部门名称
						$("#sectionId").val(treeId.obj.id);
						$('#sectionName').val(treeId.name);
						initStorage();
						initManagers();
						$("#" + whoOnclickSection).val(treeId.obj.name);
					}
				},function(){
				});
			}else{
				//成本调整  部门名称
				$("#sectionId").val(treeId.obj.id);
				$('#sectionName').val(treeId.name);
				initStorage();
				initManagers();
				$("#" + whoOnclickSection).val(treeId.obj.name);
			}
		}
		//refreshValidatorField("sectionName",'#ibillsHead');//刷新验证信息
		break;
	case 'sectionName3':
		//借入转采购
		$("#sectionId").val(treeId.obj.id);
		initManagers();
		$("#" + whoOnclickSection).val(treeId.obj.name);
		break;
	default:
		break;
	}

	
	$("#OutSectionModal").modal('hide');
}

/***dblclick 无权限部门双击***/
function zTreeOnCheckIn(event, treeId, treeNode){
	//只能选择最末级
	if(treeId.children && treeId.children.length != 0) return false;
	switch (whoOnclickSection) {
	case 'filterInName':
		//过滤调入部门
		$("#selInDepartmentIdStr").val(treeId.obj.id);
		break;
	case 'filterOutName':
		//过滤调入部门
		$("#selOutDepartmentIdStr").val(treeId.obj.id);
		initManagers();
		break;
	case 'inDepartmentName':
		//调入部门
		if($('#outDepartmentId').val() == treeId.obj.id){
			$("#inSectionModal").modal('hide');
			$.zxsaas_plus.showalert("","调入部门不能和调出部门相同!");
			return false;
		}
		$("#inDepartmentId").val(treeId.obj.id);
//		refreshValidatorField("inDepartmentName",'#ibillsHead');//刷新验证信息
		break;
	default:
		break;
	}
	$("#" + whoOnclickSection).val(treeId.name);
//	refreshValidatorField("inDepartmentName",'#ibillsHead');//刷新验证信息
	$("#inSectionModal").modal('hide');
}

/***keyDown 键盘删除事件***/
function departmentDel(name){
	if(event.keyCode == 8){ 
		switch (name) {
		case 'outDepartmentName':
			//调出部门
			$('#outDepartmentName').val(null);
			$('#outDepartmentId').val(null);
			$('#managersUid').attr('disabled',true);
			$('#managersUid').html('');
			var selectHtml = '<option value="">请选择部门</option>';
			$('#managersUid').append(selectHtml);
			break;
		case 'inDepartmentName':
			//调入部门
			$('#inDepartmentName').val(null);
			$('#inDepartmentId').val(null);
			break;
		case 'filterOutName':
			//过滤调出部门
			$('#filterOutName').val(null);
			$('#selOutDepartmentIdStr').val(null);
			break;
		case 'filterInName':
			//过滤调入部门
			$('#filterInName').val(null);
			$('#selInDepartmentIdStr').val(null);
			break;
		case 'sectionNameImport':
			//单据引入
			$("#sectionIdImport").val(null);
			$("#sectionNameImport").val(null);
			billsImport();
			break;
		case 'sectionName':
			//商品移库  部门名称
			$('#sectionName').val(null);
			$('#sectionId').val(null);
			initNull();
			break;
		case 'filterSectionName':
			//商品移库  过滤部门名称
			$("#selSectionIdStr").val(null);
			$('#filterSectionName').val(null);
			break;
		case 'sectionNameOtherOut':
			//其他出库  部门名称
			$('#sectionName').val(null);
			$('#sectionId').val(null);
			initNull();
			break;
		case 'sectionName2':
			//其他出库  部门名称
			$('#sectionName2').val(null);
			$('#sectionId2').val(null);
			initNull();
			break;
		case 'filterInNameAllot':
			//调拨接收  调入部门
			$('#filterOutName').val(null);
			$('#selOutDepartmentIdStr').val(null);
			$('#managersUid').attr('disabled',true);
			$('#managersUid').html('');
			var selectHtml = '<option value="">请选择部门</option>';
			$('#managersUid').append(selectHtml);
			break;
		default:
			break;
		}
	}
}

