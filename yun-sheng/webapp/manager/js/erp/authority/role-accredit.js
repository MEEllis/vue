$(function(){
	initTree();
});
var funType=null;
var moduleId;
var opTypeName;
var status="";
function initTree(){
	$(".shou-checkbox").attr("checked",false);
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
			onClick: function (event, treeId, treeNode, msg) {
			    controllRoleTableByTreeNode(treeNode);
			}
		},
		view: {
			showIcon: true
		}
    }; 
	$.request({
        type: 'Get',
        url: "../../authority/roleAccredit/selectRoleAccreditList",
        data : {"funType" : funType,"status":1},
        dataType: "json",
        success: function (data) {
	       $.fn.zTree.init($("#metaDataTree"), setting, data.data.rows);
//           var str = $('#metaDataTree_1_switch').attr('class');
//           var Class = str.replace('roots','center');
//           $('#metaDataTree_1_switch').attr('class',Class);
           appendRoleSelect(data.data.roleList);//拼接角色下拉列表
           initRoleTable("#jqGrid_metaData",data.data.funList,data.data.topList,data.data.authorityDetailList,data.data.roleList[0].id);
        },
        error: function (msg) {
            alert(" 数据加载失败！" + msg);
        }
    });
}

//内置角色信息里初始化 通过树id调用对应方法 重构表格
function controllRoleTableByTreeNode(treeNode){
	if(treeNode.pId!=null && treeNode.id!=null){
		moduleId=treeNode.pId;
		opTypeName=treeNode.name;
	}else{
		moduleId=treeNode.id;
		opTypeName=null
	}
	var roleId=$("#roleSelect").val();
	$.request({
        type: 'Get',
        url: "../../authority/roleAccredit/selectRoleAccreditList",
        data:{"moduleId":moduleId,"opTypeName":opTypeName,"funType":funType,"status":1},
        dataType: "json",
        success: function (data) {
        	initRoleTable("#jqGrid_metaData",data.data.funList,data.data.topList,data.data.authorityDetailList,roleId);
        },
        error: function (msg) {
            alert(" 数据加载失败！" + msg);
        }
    });
}

//初始页面数据操作授权点击事件
$(".shou-checkbox").click(function(){
	reloadRoleTable();
});

//初始化、加载内置角色表格详情表格
function reloadRoleTable() {
	var id = $("#roleSelect").val();
	var hasCheck = $('.shou-checkbox').is(':checked');
	if (hasCheck) {
		funType = 1;
	} else {
		funType = null;
	}
	$.request( {
		type : 'Get',
		url : "../../authority/roleAccredit/selectRoleAccreditList",
		data : {"funType" : funType,"moduleId" : moduleId,"opTypeName" : opTypeName,"status":1},
		dataType : "json",
		success : function(data) {
			initRoleTable("#jqGrid_metaData", data.data.funList,data.data.topList, data.data.authorityDetailList, id);
		}
	});
}

//角色初始化授权明细
function initRoleTable(tableId,funList,topList,authorityDetailList,roleId){
	appendTableHeader(tableId,funList,topList);
	for(var k=0;k<authorityDetailList.length;k++){
		var opId=authorityDetailList[k].opId;
		var funId=authorityDetailList[k].funName;
		var tdId="td_"+opId+"_"+funId;
	    if(opId!=null && funId!=null){
	    	if(authorityDetailList[k].roleId==roleId){
	    		$(tableId).find("td[id='"+tdId+"']").html("√");
	    	}
	    }
	}
} 

//拼接表头
function appendTableHeader(tableId,funList,topList){
	$(tableId).html("");
	//循环表头
	var strHtml="<tr><td>操作名称</td>";
	for(var k=0;k<funList.length;k++){
		strHtml+="<td >"+funList[k].name+"</td>";
	}
	strHtml+="</tr>";
	//循环表中数据
	for(var i=0;i<topList.length;i++){
		strHtml+="<tr><td >"+topList[i].name+"</td>";
		for(var j=0;j<funList.length;j++){
			var tdId="td_"+topList[i].id+"_"+funList[j].name;
			strHtml+="<td id='"+tdId+"'></td>";
		}
		strHtml+="</tr>";
	}
	$(tableId).html(strHtml);
}

//拼接角色下拉列表
function appendRoleSelect(roleList){
	$("#roleSelect").html("");
	for(var i=0;i<roleList.length;i++){
		$("#roleSelect").append("<option value='"+roleList[i].id+"'>"+roleList[i].name+"</option>");
	}
}

//选中角色下拉框change事件
$("#roleSelect").change(function(){
	reloadRoleTable();
});
/******************************************************************新增操作开始*********************************************/
//新增内置角色信息按钮单击事件
function addRole(){
	$("#addRoleName").parent().next().html('');
	funType=null;
	status=1;
	moduleId="";
	opTypeName="";
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
				onClick: function (event, treeId, treeNode, msg) {
				   controllRoleAddTableByTreeNode(treeNode);//通过id调用对应方法 重构表格
				}
			},
			view: {
				showIcon: false
			}
	    }; 
		 $.request({
	            type: 'Get',
	            url: "../../authority/roleAccredit/selectRoleAccreditList",
	            data:{"funType":funType},
	            dataType: "json",
	            success: function (data) {
	                $.fn.zTree.init($("#roleDataTree"), setting, data.data.rows);
	                var str = $('#roleDataTree_1_switch').attr('class');
	                var Class = str.replace('roots','center');
	                $('#roleDataTree_1_switch').attr('class',Class);
	                initAddRoleTable("#jqGrid_roleMsgAdd",data.data.funList,data.data.topList,data.data.authorityDetailList);
	                $(".shou-checkbox-add").attr("checked",false);
	                $("#myModal").modal("show");
	            },
	            error: function (msg) {
	                alert(" 数据加载失败！" + msg);
	            }
	    });
}

//内置角色信息里新增页面 通过树id调用对应方法 重构表格
function controllRoleAddTableByTreeNode(treeNode){
	if(treeNode.pId!=null && treeNode.id!=null){
		moduleId=treeNode.pId;
		opTypeName=treeNode.name;
	}else{
		moduleId=treeNode.id;
		opTypeName=null;
	}
	$.request({
        type: 'Get',
        url: "../../authority/roleAccredit/selectRoleAccreditList",
        data:{"moduleId":moduleId,"opTypeName":opTypeName,"funType":funType},
        dataType: "json",
        success: function (data) {
        	 initAddRoleTable("#jqGrid_roleMsgAdd",data.data.funList,data.data.topList,data.data.authorityDetailList);
        },
        error: function (msg) {
            alert(" 数据加载失败！" + msg);
        }
    });
}

//角色添加表格
function initAddRoleTable(tableId,funList,topList,authorityDetailList){
	appendTableHeader(tableId,funList,topList);
	for(var k=0;k<authorityDetailList.length;k++){
		var opId=authorityDetailList[k].opId;
		var funId=authorityDetailList[k].funName;
		var tdId="td_"+opId+"_"+funId;
	    if(opId!=null && funId!=null){
	    	if(authorityDetailList[k].funType==2){
	    		$(tableId).find("td[id='"+tdId+"']").html("<input type='checkbox' checked  value='"+authorityDetailList[k].id+"' >");
	    	}else{
	    		$(tableId).find("td[id='"+tdId+"']").html("<input type='checkbox' value='"+authorityDetailList[k].id+"'>");
	    	}
	    }
	}
}  

// 数据操作单击事件
$(".shou-checkbox-add").click(function(){
   var hasCheck = $('.shou-checkbox-add').is(':checked');
   if (hasCheck) {
		funType = 1;
	} else {
		funType = null;
	}
  $.request( {
	type : 'Get',
	url : "../../authority/roleAccredit/selectRoleAccreditList",
	data : {"funType" : funType,"moduleId" : moduleId,"opTypeName" : opTypeName},
	dataType : "json",
	success : function(data) {
	initAddRoleTable("#jqGrid_roleMsgAdd", data.data.funList,data.data.topList, data.data.authorityDetailList);
  } 
	});
});
			
// 保存角色信息
function saveAndClose() {
	var name = $("#addRoleName").val().trim();
	if (name == "") {
		$("#addRoleName").parent().next().html('必填!');
		return;
	}
	var metadataIds = "";
	$("#jqGrid_roleMsgAdd").find(":checkbox:checked").each(function() {
		metadataIds += $(this).val() + ",";
	});
	$.request( {
		url : "../../authority/roleAccredit/saveRoleAccredit",
		type : "POST",
		data : {"metadataIds" : metadataIds,"name" : name},
		success : function(data) {
			if (data.result == 1) {
				$.zxsaas_plus.showalert("提示", data.desc);
				$("#myModal").modal("hide");
			} else {
				$.zxsaas_plus.showalert("错误", data.desc);
			}
		}
	});

}
$("#addRoleName").focus(function(e){
	$(this).parent().next().html('');
});
			
// ***************************************************************新增操作结束***************************************************

//*************************************************************修改操作开始*******************************************************
function updateRole(){
	$("#addRoleName").parent().next().html('');
	$("#shou-checkbox-update").attr("checked",false);
	funType=null;
	status=1;
	moduleId="";
	opTypeName="";
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
			onClick: function (event, treeId, treeNode, msg) {
			   var id=$("#roleSelect").val();
			   controllRoleUpdateTableByTreeNode(treeNode,id);//通过id调用对应方法 重构表格
			}
		},
		view: {
			showIcon: true
		}
    }; 
	var id=$("#roleSelect").val();
	var name=$("#roleSelect").find("option:selected").text();
	 $.request({
            type: 'Get',
            url: "../../authority/roleAccredit/selectRoleAccreditList",
            data: {"funType":null,"status":1,"roleId":id},
            dataType: "json",
            success: function (data) {
		       $("#updateRoleName").val(name);
                $.fn.zTree.init($("#roleUpdateTree"), setting, data.data.rows);
//                var str = $('#roleUpdateTree_1_switch').attr('class');
//                var Class = str.replace('roots','center');
//                $('#roleUpdateTree_1_switch').attr('class',Class);
                drawUpdateRoleTable("#jqGrid_roleMsgUpdate",data.data.funList,data.data.topList,data.data.authorityDetailList,data.data.grantedFun,id);
                $("#modalUpdate").modal("show");
            },
            error: function (msg) {
                alert(" 数据加载失败！" + msg);
            }
  });
	 
	 
//修改数据操作授权点击事件	
$(".shou-checkbox-update").click(function(){
	var id=$("#roleSelect").val();
	var hasCheck=$('.shou-checkbox-update').is(':checked');
	if(hasCheck){
		funType=1;
	}else{
		funType=null;
	}
	$.request({
	   type: 'Get',
	   url: "../../authority/roleAccredit/selectRoleAccreditList",
	   data: {"funType":funType,"status":1,"moduleId" : moduleId,"opTypeName" : opTypeName,"roleId":id},
	   dataType: "json",
	   success: function (data) {
	   $.fn.zTree.init($("#roleUpdateTree"), setting, data.data.rows);
		var str = $('#roleUpdateTree_1_switch').attr('class');
		var Class = str.replace('roots','center');
		$('#roleUpdateTree_1_switch').attr('class',Class);
		drawUpdateRoleTable("#jqGrid_roleMsgUpdate",data.data.funList,data.data.topList,data.data.authorityDetailList,data.data.grantedFun,id);
	   }
	});
  });
}			

//内置角色信息里更新页面 通过树id调用对应方法 重构表格
function controllRoleUpdateTableByTreeNode(treeNode,id){
	if(treeNode.pId!=null && treeNode.id!=null){
		moduleId=treeNode.pId;
		opTypeName=treeNode.name;
	}else{
		moduleId=treeNode.id;
		opTypeName=null;
	}
	$.request({
        type: 'Get',
        url: "../../authority/roleAccredit/selectRoleAccreditList",
        data:{"moduleId":moduleId,"opTypeName":opTypeName,"funType":funType,"status":1},
        dataType: "json",
        success: function (data) {
        	drawUpdateRoleTable("#jqGrid_roleMsgUpdate",data.data.funList,data.data.topList,data.data.authorityDetailList,data.data.grantedFun,id);
        },
        error: function (msg) {
            alert(" 数据加载失败！" + msg);
        }
    });
}

//修改授权明显
function drawUpdateRoleTable(tableId,funList,topList,authorityDetailList,grantedFun,id){
	$("#updateRoleId").val(id);
	appendTableHeader(tableId,funList,topList)
	for(var k=0;k<grantedFun.length;k++){
		var opId=grantedFun[k].opId;
		var funId=grantedFun[k].funName;
		var tdId="td_"+opId+"_"+funId;
	    if(opId!=null && funId!=null){
	    	$(tableId).find("td[id='"+tdId+"']").html("<input type='checkbox' value='"+grantedFun[k].id+"'>");
	    }
	}
	
	for(var k=0;k<authorityDetailList.length;k++){
		var opId=authorityDetailList[k].opId;
		var funId=authorityDetailList[k].funName;
		var tdId="td_"+opId+"_"+funId;
		if(opId!=null && funId!=null){
			if(authorityDetailList[k].roleId==id){
			   $(tableId).find("td[id='"+tdId+"']").html("<input type='checkbox' checked  value='"+authorityDetailList[k].metadataId+"' >");
			}else{
			$(tableId).find("td[id='"+tdId+"']").html("<input type='checkbox' value='"+authorityDetailList[k].metadataId+"'>");
		  }
	}
 }
}

//更新内置角色
function updateAndClose() {
	var name = $("#updateRoleName").val().trim();
	var id = $("#updateRoleId").val();
	if (name == "") {
		$("#addRoleName").parent().next().html('必填!');
		return;
	}
	var metadataIds = [];
	$("#jqGrid_roleMsgUpdate").find(":checkbox:checked").each(function() {
		metadataIds.push($(this).val());
	});

	$.request( {
		type : 'POST',
		url : "../../authority/roleAccredit/updateRoleAccredit",
		data : {"metadataIds" : metadataIds,"id" : id,"name" : name},
		traditional : true,
		dataType : "json",
		success : function(data) {
			if (data.result == 1) {
				$.zxsaas_plus.showalert("提示", data.desc);
				$("#modalUpdate").modal("hide");
			}
		},
		error : function(msg) {
			alert(" 数据加载失败！" + msg);
		}
	});
}
		
$("body").delegate("#yesBta", "click", function() {
	moduleId="";
	opTypeName="";
	initTree();
});
		
function closeOnly() {
	moduleId="";
	opTypeName="";
	initTree();
}