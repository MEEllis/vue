//初始化、加载内置角色表格详情表格
function reloadRoleTable() {
	var id = $("#roleSelect").val();
	var hasCheck = $('.shou-checkbox').is(':checked');
	if (hasCheck) {
		funType = 1;
	} else {
		funType = null;
	}
	$.ajax( {
		type : 'Get',
		url : "../../authority/roleAccredit/selectRoleAccreditList",
		data : {
			"funType" : funType
		},
		dataType : "json",
		success : function(data) {
			initRoleTable("#jqGrid_metaData", data.data.funList,data.data.topList, data.data.authorityDetailList, id);
		}
	});
}

//拼接所有角色表格
function appendRoleTableHtml(tableId,funList,topList){
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



//元数据维护里面  通过树id调用对应方法 重构表格
function controllMetadataTableByTreeNode(treeNode){
	var moduleId;
	var name;
	if(treeNode.pId!=null && treeNode.id!=null){
		moduleId=treeNode.pId;
		name=treeNode.name;
	}else{
		moduleId=treeNode.id;
	}
	$.ajax({
        type: 'Get',
        url: "../../authority/metadata/selectMetadataTree",
        data:{"moduleId":moduleId,"name":name},
        dataType: "json",
        success: function (data) {
	        initOpFunTable(data.data.funList,data.data.topList,data.data.authorityDetailList);
        },
        error: function (msg) {
            alert(" 数据加载失败！" + msg);
        }
    });
}

//内置角色信息里初始化 通过树id调用对应方法 重构表格
function controllRoleTableByTreeNode(treeNode){
	var moduleId;
	var name;
	if(treeNode.pId!=null && treeNode.id!=null){
		moduleId=treeNode.pId;
		name=treeNode.name;
	}else{
		moduleId=treeNode.id;
	}
	var roleId=$("#roleSelect").val();
	$.ajax({
        type: 'Get',
        url: "../../authority/roleAccredit/selectRoleAccreditList",
        data:{"moduleId":moduleId,"name":name,"funType":funType},
        dataType: "json",
        success: function (data) {
        	initRoleTable("#jqGrid_metaData",data.data.funList,data.data.topList,data.data.authorityDetailList,roleId);
        },
        error: function (msg) {
            alert(" 数据加载失败！" + msg);
        }
    });
}

//内置角色信息里新增页面 通过树id调用对应方法 重构表格
function controllRoleAddTableByTreeNode(treeNode){
	var moduleId;
	var name;
	if(treeNode.pId!=null && treeNode.id!=null){
		moduleId=treeNode.pId;
		name=treeNode.name;
	}else{
		moduleId=treeNode.id;
	}
	$.ajax({
        type: 'Get',
        url: "../../authority/roleAccredit/selectRoleAccreditList",
        data:{"moduleId":moduleId,"name":name,"funType":funType},
        dataType: "json",
        success: function (data) {
        	 initAddRoleTable("#jqGrid_roleMsgAdd",data.data.funList,data.data.topList,data.data.authorityDetailList);
        },
        error: function (msg) {
            alert(" 数据加载失败！" + msg);
        }
    });
}


//内置角色信息里更新页面 通过树id调用对应方法 重构表格
function controllRoleUpdateTableByTreeNode(treeNode,id){
	var moduleId;
	var name;
	if(treeNode.pId!=null && treeNode.id!=null){
		moduleId=treeNode.pId;
		name=treeNode.name;
	}else{
		moduleId=treeNode.id;
	}
	$.ajax({
        type: 'Get',
        url: "../../authority/roleAccredit/selectRoleAccreditList",
        data:{"moduleId":moduleId,"name":name,"funType":funType},
        dataType: "json",
        success: function (data) {
        	initUpdateRoleTable("#jqGrid_roleMsgUpdate",data.data.funList,data.data.topList,data.data.authorityDetailList,id);
        },
        error: function (msg) {
            alert(" 数据加载失败！" + msg);
        }
    });
}
//***********************************************重置密码************************************************
//获取随机六位数
function getRandomPassword(){
	var password="";
	for(var i=0;i<6;i++){  
		password+=Math.floor(Math.random()*10); 
	} 
	return password;
}

//重置密码
function resetPassword(e,options){
	//var id = $(this).data('id');
	var id=e.target.id;
	if(id==""){
		id=$("#id").val();
	}
	var password=getRandomPassword();
	$.zxsaas_plus.showconfirm("提示","重置密码将用户密码设置为："+password+"<br />是否确定进行此操作",function(){
		$.ajax({
		    url:options.resetAdminPwdUrl,
		    type: "POST",
		    data: {"id": id,"password":password},
		    traditional: true,
		    success: function(data) {
		    	if(data.result==1){
		    		$.zxsaas_plus.showalert("提示",data.desc);
		    	}else{
		    		$.zxsaas_plus.showalert("错误","重置密码失败");
		    	}
		    	$(options.TableName).trigger("reloadGrid")
		    }
		});
	},function(){
		$(options.TableName).trigger("reloadGrid");
	});
}

//**********************************************功能启用中，修改弹出模态框时默认选中树节点******************************************
function getModuleTreeChecked(treeId,objList){
	if(objList!=null && objList.length>0){
		var ids="";
		for(var i=0;i<objList.length;i++){
			var zTree = $.fn.zTree.getZTreeObj(treeId);
            zTree.expandAll(true);//展开全部节点
			var node = zTree.getNodeByParam("treeNodeId","0"+objList[i].moduleId,null);//选中某节点
			zTree.checkNode(node,true,true);
			if(i==objList.length-1){
				ids+="0"+objList[i].moduleId;
			}else{
				ids+="0"+objList[i].moduleId+",";
			}
		}
		$('.add_tree_ids').val(ids);//存放默认id
	}
}
//*********************************************************集团管理、非集团管理显示禁用checkbox单击事件
function showDisableClick(inputId,options){
	var params={};
	if($(inputId).is(':checked')){
		params.status=1;
	}else{
		params.status=0;
	}
	$(options.TableName).jqGrid('setGridParam',{  
        datatype:'json',  
        postData:params, //发送数据  
        page:1  
    }).trigger("reloadGrid"); //重新载入
}
