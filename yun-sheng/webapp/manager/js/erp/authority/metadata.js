$(function(){
	initTree();
});

$(".btn-warning").click(function(){
	initTree();
});

function closeModal(){
	initTree();
}

function initTree(){
	moduleId="";
	opTypeName=null;
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
			reloadMetadataTableByTreeNode(treeNode);//通过树id调用对应方法 重构表格
		  }
		},
		view: {
			showIcon: true
		}
    }; 
	 $.request({
            type: 'Get',
            url: "../../authority/metadata/selectMetadataTree",
            data:{"funType":funType},
            dataType: "json",
            success: function (data) {
               $("#searchName").val("");
		       $.fn.zTree.init($("#metaDataTree"), setting, data.data.rows);
               //var str = $('#metaDataTree_1_switch').attr('class');
               var zTree = $.fn.zTree.getZTreeObj("metaDataTree");
               zTree.expandAll(true);//展开全部节点
//               if(str!=undefined){
//            	   var Class = str.replace('roots','center');
//                   $('#metaDataTree_1_switch').attr('class',Class);
                   initMetadataTable("#jqGrid_metaData",data.data.funList,data.data.topList,data.data.authorityDetailList);
//               }
            },
            error: function (msg) {
                alert(" 数据加载失败！" + msg);
            }
        });
}

var moduleId=null;
var opTypeName=null;
var funType=null;
//点击授权树菜单重构表格
function reloadMetadataTableByTreeNode(treeNode){
	//单据、报表点击
	if(treeNode.id == -1 && treeNode.pId!=0 && treeNode.pId!=null){
		moduleId=treeNode.pId;
		opTypeName=treeNode.name;
	}
	//模块类别点击
	if(treeNode.id !=0 && treeNode.pId==0){
		moduleId=treeNode.id;
		opTypeName=null;
	}
	
	//顶级节点点击
	if(treeNode.id == 0 && treeNode.pId==null){
		moduleId="";
		opTypeName="";
	}
	
	$.request({
        type: 'Get',
        url: "../../authority/metadata/selectMetadataTree",
        data:{"funType":funType,"moduleId":moduleId,"opTypeName":opTypeName},
        dataType: "json",
        success: function (data) {
        	initMetadataTable("#jqGrid_metaData",data.data.funList,data.data.topList,data.data.authorityDetailList);
        },
        error: function (msg) {
            alert(" 数据加载失败！" + msg);
        }
    });
}

//数据操作授权checkbox点击事件
$(".shou-checkbox").click(function(){
	var hasCheck=$('.shou-checkbox').is(':checked');
	if(hasCheck){
		funType=1;
	}else{
		funType=null;
	}
	$.request({
        type: 'Get',
        url: "../../authority/metadata/selectMetadataTree",
        data:{"funType":funType,"moduleId":moduleId,"opTypeName":opTypeName},
        dataType: "json",
        success: function (data) {
        	initMetadataTable("#jqGrid_metaData",data.data.funList,data.data.topList,data.data.authorityDetailList);
        }
    });
});

//拼接表格(初始化授权明细)
function initMetadataTable(tableId,funList,topList,authorityDetailList){
	appendTableHeader(tableId,funList,topList);
	//循环赋予的操作权限
	for(var i=0;i<authorityDetailList.length;i++){
	    var opId=authorityDetailList[i].opId;
	    var funName=authorityDetailList[i].funName;
	    if(opId!=null && funName!=null){
	    	var tdId="#td_"+opId+"_"+funName;
	    	$(tdId).text("√");
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

var addSetStatus=0;//默认模块新增状态
$('.tab .toggle').click(function() {
	addSetStatus=$(this).index('.toggle');
	$.request({
		url:'../../authority/metadata/getSelectData',
	    type: "POST",
	    data: {"addSetStatus": addSetStatus},
	    success: function(data) {
	    	if(data.result==1){
	    		resetForm();
	    		appendSelect(data.data,null);
	    	}else{
	    		$.zxsaas_plus.showalert("错误",data.desc);
	    	}
	    }
	});
	$(this).addClass('active').siblings().removeClass('active');
	$('.showTab .change').eq($(this).index('.toggle')).show().siblings().hide();
});

//菜单新增按钮单击事件
function add(){
	resetForm();
	$.request({
		url : '../../authority/metadata/getSelectData',
		type : "POST",
		data : {"addSetStatus" : addSetStatus},
		success : function(data) {
			if (data.result == 1) {
				appendSelect(data.data,null);
			} else {
				$.zxsaas_plus.showalert("错误", "服务器出错，请稍后重试");
			}
		}
	});
	$('#myModal').modal('show');
}

//拼接模态框下拉框
function appendSelect(data,obj){
	if(addSetStatus==0){
		var moduleTypeList=data.moduleTypeList;
		var firstLevelMenuText=data.firstLevelMenuText;
		setModuleSelect("#moduleAddForm ",moduleTypeList,firstLevelMenuText,obj);
	}
	if(addSetStatus==1){
		var bindModuleType=data.bindModuleType;
		var opTypeList=data.opTypeList;
		var secondLevelMenuText=data.secondLevelMenuText;
		setOpSelect("#opAddForm ",bindModuleType,opTypeList,secondLevelMenuText,obj)
	}
	if(addSetStatus==2){
		var bindTopType=data.bindTopType;
		setFunSelect("#funAddForm ",bindTopType,obj);
	}
}

//表单重置
function resetForm(){
	$("#moduleAddForm")[0].reset();
	$("#opAddForm")[0].reset();
	$("#funAddForm")[0].reset();
	//清空提示
	$("#funAddForm input[name=name]").next().html('');
	$("#funAddForm input[name=name]").css({'borderColor':''});
}

//保存
function saveMetadata(btnId){
	var checkResult=checkNullColumn("#funAddForm ",null);
	if(checkResult){
		return;
	}
	var formId="";
	if(addSetStatus=="0"){
		formId="#moduleAddForm ";
	}else if(addSetStatus=="1"){
		formId="#opAddForm ";
	}else if(addSetStatus=="2"){
		formId="#funAddForm ";
	}
	var gName = $(formId + ' input[name=name]');//功能名
	var result=checkDuplicateData(addSetStatus,formId);
	if(result){
		$.zxsaas_plus.showalert("提示","不能重复添加数据!");
		return;
	}
	var params=JSON.stringify(getSaveParams(addSetStatus));
	$.request({
		type :'GET',  
		contentType :'application/json', 
		url:'../../authority/metadata/addMetadata',
		data:{"params":params,"addSetStatus":addSetStatus},
		success:function(data){
		  if(data.result==1){
			  initTree();
			  $.zxsaas_plus.showalert("提示",data.desc);
			  if(btnId=="saveAndAdd"){
				  resetForm();
			  }else{
				  $('#myModal').modal('hide');
			  }
		  }else{
			  $.zxsaas_plus.showalert("错误","服务器出错，请稍后重试");
		  }
	    }
	});
}

//校验重复添加数据
function checkDuplicateData(status,formId){
	var id=$(formId+" input[name=id]").val();
	var flag=false;
	var params={};
	if(status==0){
		params.moduleType=$(formId+"select[name=moduleType]").val();
		params.resourceId=$(formId+"select[name=resourceId]").val();
	}
	if(status==1){
		params.modeuleId=$(formId+"select[name=modeuleId]").val();
		params.opType=$(formId+"select[name=opType]").val();
		params.resourceId=$(formId+"select[name=resourceId]").val();
	}
	if(status==2){
		params.funType=$(formId+"select[name=funType]").val();
		params.opId=$(formId+"select[name=opId]").val();
		params.name=$(formId+"input[name=name]").val();
	}
	$.request({
		type :'GET',  
		contentType :'application/json', 
		url:'../../authority/metadata/checkDuplicateData',
		async:false,
		data:{"params":JSON.stringify(params),"status":status},
		success:function(data){
		  if(data.result==1){
			 var rows=data.data.rows;
			 if(id=="" && rows.length>0){
				 flag=true;
			 }
			 if(id != "" && rows.length==1){
				 if(rows[0].id != id){
					 flag=true;
				 }
			 }else if(id!="" && rows.length>1){
				 flag=true;
			 }
		  }else{
			  $.zxsaas_plus.showalert("错误","服务器出错，请稍后重试");
		  }
	    }
	});
	return flag;
}



//**********************************************修改或删除操作开始********************************************************************************//		

//主导航修改或删除按钮单击事件
function updateOrDelete(){
	var name=$("#searchName").val().trim();
	$.request({
		type :'GET',  
		contentType :'application/json', 
		data:{"name":name,"moduleId":moduleId,"opTypeName":opTypeName},
		url:'../../authority/metadata/selectMetadataInfo',
		success:function(data){
		  if(data.result==1){
			  $("#moduleTable").html("");
			  $("#opTable").html("");
			  $("#funTable").html("");
			  var moduleList=data.data.moduleList;
			  var topList=data.data.topList;
			  var funList=data.data.funList;
			  getTableData("#moduleTable",moduleList,"模块名称");
			  getTableData("#opTable",topList,"操作名称");
			  getTableData("#funTable",funList,"功能名称");
			  $('#modalUpdate').modal('show');
		  }else{
			  $.zxsaas_plus.showalert("错误","服务器出错，请稍后重试");
		  }
	    }
	});
}
		
//修改
$('body').delegate(".modelUpdate-table tr td a:nth-child(1)","click",function(e){
	$(this).parents().parent().children("td").eq(1).attr("name","oraginal");;
	var id = $(this).parent().parent().children(":first").html();
	var tableId=this.parentNode.parentNode.parentNode.parentNode.id;
	$.request({
		url:'../../authority/metadata/selectMetadataInfo',
	    type: "POST",
	    data: {"id": id,"tableId": tableId,"moduleId":moduleId,"opTypeName":opTypeName},
	    success: function(data) {
	    	if(data.result==1){
	    		if(tableId=="moduleTable"){
	    			setModuleValue("#updateModuleForm ",data.data.moduleTypeList,data.data.firstLevelMenuText,data.data.module);
	    			$("#model-update-dialog").modal("show");
	    		}
	    		if(tableId=="opTable"){
	    			setOpValue("#updateOpForm ",data.data.bindModuleType,data.data.opTypeList,data.data.secondLevelMenuText,data.data.top);
	    			$("#oper-update-dialog").modal("show");
	    		}
	    		if(tableId=="funTable"){
	    			setFunValue("#updateFunForm ",data.data.bindTopType,data.data.tfun);
	    			clearUpdatePrompt();
	    			$("#fn-update-dialog").modal("show");
	    		}
	    	}else{
	    		$.zxsaas_plus.showalert("错误",data.desc);
	    	}
	    }
	});
 });		

//修改模块设置原始值	
function setModuleValue(formId,moduleTypeList,firstLevelMenuText,obj){
	$(formId).writeJson2Dom(obj);
	setCheckbox(formId,obj);
	setModuleSelect(formId,moduleTypeList,firstLevelMenuText,obj);
}

//设置操作的原始值
function setOpValue(formId,bindModuleType,opTypeList,secondLevelMenuText,obj){
	$(formId).writeJson2Dom(obj);
	setCheckbox(formId,obj);
	setOpSelect(formId,bindModuleType,opTypeList,secondLevelMenuText,obj);
	$(formId+"select[name=modeuleId]").val(obj.modeuleId);
}

//设置功能的原始值
function setFunValue(formId,bindTopType,obj){
	$(formId).writeJson2Dom(obj);
	setCheckbox(formId,obj);
	setFunSelect(formId,bindTopType,obj);
	$(formId+"select[name=opId]").val(obj.opId);
	$(formId+"select[name=funType]").val(obj.funType);
}
		
//修改删除弹出框拼接模块，操作、功能表格数据
function getTableData(tableId,objList,name){
	var strHtml="<tr><td>ID</td><td>"+name+"</td><td>操作</td></tr>";
	if(tableId=="#funTable"){
		strHtml="<tr><td>ID</td><td>"+name+"</td><td>绑定操作名</td><td>操作</td></tr>";
		for(var i=0;i<objList.length;i++){
			strHtml=strHtml+"<tr><td>"+objList[i].id+"</td><td>"+objList[i].name+"</td><td>"+objList[i].opTypeName+"</td><td><a data-toggle='modal'>修改</a><a>删除</a></td></tr>"
		}
	}else{
		strHtml="<tr><td>ID</td><td>"+name+"</td><td>操作</td></tr>";
		for(var i=0;i<objList.length;i++){
			strHtml=strHtml+"<tr><td>"+objList[i].id+"</td><td>"+objList[i].name+"</td><td><a data-toggle='modal'>修改</a><a>删除</a></td></tr>"
		}
	}
	
	$(tableId).append(strHtml);
}

//删除
$('body').delegate(".modelUpdate-table tr td a:nth-child(2)","click",function(e){
	var id = $(this).parent().parent().children(":first").html();
	var tableId=this.parentNode.parentNode.parentNode.parentNode.id;
	$.request({
		url:'../../authority/metadata/deleteMetadata',
		type: "POST",
		data: {"id": id,"tableId": tableId,"moduleId":moduleId,"opTypeName":opTypeName},
		success: function(data) {
			if(data.result==1){
			    $.zxsaas_plus.showalert("提示",data.desc);
			    if("moduleTable"==tableId){
			    	  $("#opTable").html("");
					  $("#funTable").html("");
			    	  getTableData("#opTable",data.data.topList,"操作名称");
					  getTableData("#funTable",data.data.funList,"功能名称");
			    }
			    if("opTable"==tableId){
			    	  $("#funTable").html("");
					  getTableData("#funTable",data.data.funList,"功能名称");
			    }
			    initTree();
			    e.target.parentNode.parentNode.remove();
			  }else{
			    $.zxsaas_plus.showalert("错误",data.desc);
			  }
			}
	});
});
     
//修改保存（保存后关闭按钮单击事件）
function saveAndClose(btnId){
    var params=JSON.stringify(getUpdateParams(btnId));
    var checkResult=checkNullColumn("#updateFunForm ",btnId);
    if(checkResult){
    	return;
    }
    var formId="";
	if(btnId==0){
		formId="#updateModuleForm ";
	}else if(btnId==1){
		formId="#updateOpForm ";
	}else if(btnId==2){
		formId="#updateFunForm ";
	}
	var gName = $(formId + ' input[name=name]');//功能名
	var result=checkDuplicateData(btnId,formId);
	if(result){
		$.zxsaas_plus.showalert("提示","该数据已存在!");
		return;
	}
    var updateName="";
    if(btnId==0){
    	updateName=$("#updateModuleForm select[name=resourceId]").find("option:selected").text();
    }else if(btnId==1){
    	updateName=$("#updateOpForm select[name=resourceId]").find("option:selected").text();
    }
    $.request({
		type :'GET',  
		contentType :'application/json', 
		url:'../../authority/metadata/updateMetadata',
		data:{"params":params,"updateStatus":btnId},
		success:function(data){
		if(data.result==1){
			$.zxsaas_plus.showalert("提示",data.desc);
			if(btnId==0){
				$("#moduleTable tr td[name='oraginal']").text(updateName);
				$('#model-update-dialog').modal('hide');
				$("#moduleTable td").removeAttr("name");
			}
			if(btnId==1){
				$("#opTable tr td[name='oraginal']").text(updateName);
				$('#oper-update-dialog').modal('hide');
				$("#opTable td").removeAttr("name");
			}
			if(btnId==2){
			$("#funTable tr td[name='oraginal']").text(data.data.name);
			$('#fn-update-dialog').modal('hide');
			$("#funTable td").removeAttr("name");
		 }
		}else{
		   $.zxsaas_plus.showalert("错误","服务器出错，请稍后重试");
		  }
		}
	});
}

    
//查询名称模糊搜索
$("#searchName").bind('input propertychange', function() {  
  searchMetadataInfo();
});
    
function searchMetadataInfo() {
	var name = $("#searchName").val().trim();
	$.request( {
		type : 'GET',
		contentType : 'application/json',
		data : {"name" : name},
		url : '../../authority/metadata/selectMetadataInfo',
		success : function(data) {
			if (data.result == 1) {
				$("#moduleTable").html("");
				$("#opTable").html("");
				$("#funTable").html("");
				var moduleList = data.data.moduleList;
				var topList = data.data.topList;
				var funList = data.data.funList;
				getTableData("#moduleTable", moduleList, "模块名称");
				getTableData("#opTable", topList, "操作名称");
				getTableData("#funTable", funList, "功能名称");
				$('#modalUpdate').modal('show');
			} else {
				$.zxsaas_plus.showalert("错误", "服务器出错，请稍后重试");
			}
		}
	});
}

/** ******************************************************************下拉框设置开始************************************************** */    
//模块设置下拉框
function setModuleSelect(formId,moduleTypeList,firstLevelMenuText,obj){
    	if(moduleTypeList.length>0){//模块类别
    		$(formId+"select[name=moduleType]").html("");
    		 $.each(moduleTypeList,function(i,value){
    			if(obj!=null && obj.moduleType==value.code){
    				$(formId+"select[name=moduleType]").append("<option value='"+value.code+"' selected='selected'>"+value.content1+"</option>");
    			}else{
    				$(formId+"select[name=moduleType]").append("<option value='"+value.code+"' >"+value.content1+"</option>");
    			}
    		});
    	}
    	if(firstLevelMenuText.length>0){//模块名即一级菜单
    		$(formId+"select[name=resourceId]").html("");
    		 $.each(firstLevelMenuText,function(i,value){
    			if(obj!=null && obj.resourceId==value.id){
    				$(formId+"select[name=resourceId]").append("<option value='"+value.id+"' selected='selected'>"+value.menuText+"</option>");
    			}else{
    				$(formId+"select[name=resourceId]").append("<option value='"+value.id+"' >"+value.menuText+"</option>");
    			}
    		});
    	}
}

//操作下拉框设置
function setOpSelect(formId,bindModuleType,opTypeList,secondLevelMenuText,obj){
	if(bindModuleType.length>0){//绑定模块类别
		$(formId+"select[name=modeuleId]").html("");
		 $.each(bindModuleType,function(i,value){
			if(obj!=null && obj.id==value.id){
				$(formId+"select[name=modeuleId]").append("<option value='"+value.id+"' selected='selected'>"+value.menuText+"</option>");
			}else{
				$(formId+"select[name=modeuleId]").append("<option value='"+value.id+"' >"+value.menuText+"</option>");
			}
		});
	}
	if(opTypeList.length>0){//操作类别
		$(formId+"select[name=opType]").html("");
		 $.each(opTypeList,function(i,value){
			if(obj!=null && obj.opType==value.code){
				$(formId+"select[name=opType]").append("<option value='"+value.code+"' selected='selected'>"+value.content1+"</option>");
			}else{
				$(formId+"select[name=opType]").append("<option value='"+value.code+"' >"+value.content1+"</option>");
			}
		});
	}
	if(secondLevelMenuText.length>0){//操作名（二级菜单）
		$(formId+"select[name=resourceId]").html("");
		 $.each(secondLevelMenuText,function(i,value){
			 if(obj!=null && obj.resourceId==value.id){
					$(formId+"select[name=resourceId]").append("<option value='"+value.id+"' selected='selected'>"+value.menuText+"</option>");
				}else{
					$(formId+"select[name=resourceId]").append("<option value='"+value.id+"' >"+value.menuText+"</option>");
				}
		});
	}
}

//功能下拉框
function setFunSelect(formId,bindTopType,obj){
	if(bindTopType.length>0){//绑定操作
		$(formId+"select[name=opId]").html("");
		 $.each(bindTopType,function(i,value){
			if(obj!=null && obj.id==value.id){
				$(formId+"select[name=opId]").append("<option value='"+value.id+"' selected='selected'>"+value.menuText+"</option>");
			}else{
				$(formId+"select[name=opId]").append("<option value='"+value.id+"' >"+value.menuText+"</option>");
			}
		});
	}
}

//设置checkbox的值
function setCheckbox(formId,obj){
	if(obj.status==1){
		$(formId+"input[name=status]").attr("checked",true);
	}
	if(obj.status==0){
		$(formId+"input[name=status]").attr("checked",false);
	}
	if(obj.isShow==1){
		$(formId+"input[name=isShow]").attr("checked",true);
	}
	if(obj.isShow==0){
		$(formId+"input[name=isShow]").attr("checked",true);
	}
}

/********************************************************************下拉框设置结束***************************************************/ 

/********************************************************************新增，修改保存参数获开始**********************************************************/
//新增获取保存参数
function getSaveParams(addSetStatus){
	var params={};
	if(addSetStatus==0){
		params=$("#moduleAddForm").toJsonObject();
		params.status=0;
		if($('#moduleAddForm input[name=isShow]').is(':checked')){
			params.isShow=1;
		}else{
			params.isShow=0;
		}
	}
	if(addSetStatus==1){
		params=$("#opAddForm").toJsonObject();
		params.status=0;
		if($('#opAddForm input[name=isShow]').is(':checked')){
			params.isShow=1;
		}else{
			params.isShow=0;
		}
	}
	if(addSetStatus==2){
		params=$("#funAddForm").toJsonObject();
		params.status=0;
		if($('#funAddForm input[name=isShow]').is(':checked')){
			params.isShow=1;
		}else{
			params.isShow=0;
		}
	}
	return params;
}

//修改获取保存参数
function getUpdateParams(btnId){
	var params={};
	if(btnId==0){
		params=$("#updateModuleForm").toJsonObject();
		if($('#updateModuleForm input[name=isShow]').is(':checked')){
			params.isShow=1;
		}else{
			params.isShow=0;
		}
		if($('#updateModuleForm input[name=status]').is(':checked')){
			params.status=1;
		}else{
			params.status=0;
		}
	}
	if(btnId==1){
		params=$("#updateOpForm").toJsonObject();
		if($('#updateOpForm input[name=isShow]').is(':checked')){
			params.isShow=1;
		}else{
			params.isShow=0;
		}
		if($('#updateOpForm input[name=status]').is(':checked')){
			params.status=1;
		}else{
			params.status=0;
		}
	}
	if(btnId==2){
		params=$("#updateFunForm").toJsonObject();
		if($('#updateFunForm input[name=isShow]').is(':checked')){
			params.isShow=1;
		}else{
			params.isShow=0;
		}
		if($('#updateFunForm input[name=status]').is(':checked')){
			params.status=1;
		}else{
			params.status=0;
		}
	}
	return params;
}
/*******************************************************************新增，修改保存参数获开始**********************************************************/

/**********************************************************校验开始*******************************************************************************/
//校验非空字段
function checkNullColumn(formId,btnId){
	var flag=false;
	if(addSetStatus==2 || btnId==2){
		var funName=$(formId+"input[name=name]").val().trim();
		if(funName==""){
			$(formId+"input[name=name]").next().html('必填!');
			$(formId+" input[name=name]").next().css({'color':'red'});
			flag=true;
			return flag;
		}
	}
}

function clearUpdatePrompt(){
	$("#updateFunForm input[name=name]").next().html('');
	$("#updateFunForm input[name=name]").css({'borderColor':''});
}

$("#funAddForm input[name=name]").focus(function(e){
	$(this).next().html('');
	$(this).css({'borderColor':''});
});
$("#updateFunForm input[name=name]").focus(function(e){
	$(this).next().html('');
	$(this).css({'borderColor':''});
});

function updateModalCloseOnly(){
	$("#moduleTable td").removeAttr("name");
	$("#opTable td").removeAttr("name");
	$("#funTable td").removeAttr("name");
}
/**********************************************************校验结束*****************************************************************************/