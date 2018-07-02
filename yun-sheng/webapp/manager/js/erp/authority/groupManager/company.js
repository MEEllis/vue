
//数据访问对象
var companyDao = new Company(basePath);
var kong = {
		adminLogin:"",
		adminPwd:"123456",
		areaId:"",
		code:"",
		fqsIds:"",
		name:"",
		parentId:"",
		remark:"",
		status:false
	}

//初始化
$(function(){
	initCompanyTree();//初始化树
	initCompanyFunTree();//公司功能树
	initCompanyDataTree();
	initGrid();//初始化表格
	initEvents();//初始化事件
	initFQSselect();//初始化分期商列表
	
	initCompanyRoseTree();
})

// 权限开关
var flag = true;

//窗口大小改变
function wResize(){
	$("#dataTree").height($(window).height()-230);
	$("#dataTree").width(200);
	$("#dataGrid").setGridHeight($(window).height()-250);
	$("#dataGrid").setGridWidth($(window).width()-290); 
	$(".menuTools").width($(window).width()-270); 
	$("#dataGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
}

//初始化事件
function initEvents(){
	
	//注册窗口改变事件
	$(window).resize(wResize);
	wResize();

	//模糊查询
    $("#companyKeyWord").bind('input propertychange', function() {  
    	reLoadGrid();
    });
    $("#searchCompanyKeyWord").bind('input propertychange', function() {  
    	var objTree = $.fn.zTree.getZTreeObj("empDataPowerTree");
    	objTree.setting.async.url=getUrl();
        objTree.reAsyncChildNodes(null, "refresh");  	
    });
    
    $("input[name='code']").bind('input propertychange', function() {  
    	$("input[name='adminLogin']").val(gl_groupCode + 'g' + $(this).val() + "cadmin");
    });
    
    //查询参数 ：是否包含禁用状态
	$("#companyStatusCheckbox").change(function(){
		reLoadGrid();
	});

	$("#addBtn").click(function(){
		//清空表单
		$(".codeAdd").next().html('');
		$(".nameAdd").next().html('');
		$(".codeUp").next().html('');
		$(".nameUp").next().html('');
		$("#addModalDialog").writeJson2Dom(kong);
		$('#addModalDialog').modal('show');
		if(curr_company_tree_selectId != ""){
			$('#addParentIdTree').combotree('setValue',-1); 
		}
		if(curr_company_tree_selectAreaId != ""){
			$('#addParentAreaIdTree').combotree('setValue',-1); 
		}
		$("#fqsIdsSelect").selectpicker('deselectAll');
		$("#fqsIdsSelect2").selectpicker('deselectAll');
	});
	$("#eiditBtn").click(function(){

		eiditBtClick();

	});
	
	$(".codeAdd").focus(function(e){
		$(this).next().html('');
	});
	$(".nameAdd").focus(function(e){
		$(this).next().html('');
	});
	$(".codeUp").focus(function(e){
		$(this).next().html('');
	});
	$(".nameUp").focus(function(e){
		$(this).next().html('');
	});

}

//编辑按钮点击事件
function eiditBtClick(){
	var obj = getCurrRow();
	obj.status = (obj.status == ""?"false":"true");
	if(obj != null){
		$(".codeAdd").next().html('');
		$(".nameAdd").next().html('');
		$(".codeUp").next().html('');
		$(".nameUp").next().html('');
		$('#eiditModalDialog').modal('show');
		$("#eiditModalDialog").writeJson2Dom(obj);
		$('#eiditParentIdTree').combotree('setValue',obj.parentId); 
		$('#eiditParentAreaIdTree').combotree('setValue',obj.areaId); 
		
		//分期是列表
		$('#fqsIdsSelect2').selectpicker('val', obj.fqsIds.split(","));
		
        
        if (flag) {
        	initCompanyFunTree(obj.id);
        } else {
            //功能权限输值
            var haveModelList = obj.moduleIds.split(",");
            var treeObj = $.fn.zTree.getZTreeObj("dataPowerTree2");
            var nodes = treeObj.getNodes();
            for (var i = 0; i < nodes.length; i++) {
                eachDataPowerTree2(nodes[i], haveModelList);
            }
        }
	}else{
		$.MsgBox('提示消息','请选择要编辑的行'); 
	}
	function eachDataPowerTree2(node,modelList){
    	if(node.objType=="Module"){
    		node.checked = false;
    		for ( var int = 0; int < modelList.length; int++) {
				if((node.obj.id + "") == (modelList[int]+"")){
					node.checked = true;
					break;
				}
			}
    		$.fn.zTree.getZTreeObj("dataPowerTree2").updateNode(node);
    	}	
    	for(var i=0;i<node.children.length;i++){
    		eachDataPowerTree2(node.children[i],modelList);
    	}
	}
}

//初始化树
var curr_company_tree_selectId = "";
var curr_company_tree_selectAreaId = "";
function initCompanyTree(){
	//树设置参数
	var setting = {
		data: {//数据属性设置
			simpleData: {enable: true,idKey: "id",pIdKey: "pid",rootPId: null}
		},
        async: {//从后台获取数据
            enable: true,
            url: basePath+'/Tcompany/findTree2?haveDisEnableStatus=0',
            autoParam:[],
            dataFilter: null
        },
		callback: {//回调事件设置
			onClick: function(event, treeId, treeNode, msg) {
				curr_company_tree_selectId = Number(treeNode.id);
				curr_company_tree_selectAreaId = Number(treeNode.obj.areaId);
	    		if(curr_company_tree_selectId == 0 || curr_company_tree_selectId == -1){
	    			curr_company_tree_selectId = "";
	    		}				
				reLoadGrid();
			}
		},
		view: {//样式设置
			showIcon: true
		}
	};
	$.fn.zTree.init($("#dataTree"), setting);
	var zTree = $.fn.zTree.getZTreeObj("dataTree");
    zTree.expandAll(true); 

}

//公司功能树
function initCompanyFunTree(companyId){
	var setting = flag ? {  
        data: {
			simpleData: flag ? {enable: true,idKey: "id",pIdKey: "pid",rootPId: null} : {enable: true,idKey: "treeNodeId",pIdKey: "pId",rootPId: null}
		},
		view: {
			showIcon: false
		},
		check: {
			enable: true,
			chkStyle: "checkbox",
			chkboxType: { "Y": "ps", "N": "ps" }
		}
    } :  {
		data: {},
		check: {
	        enable: true
            //chkboxType : { "Y" : "", "N" : "" }
	    },	
        async: { enable: true, url: basePath+'/Tmodule/findTreeByGroupID?groupId='+gl_groupId, autoParam:[], dataFilter: null },
		callback: {//回调事件设置
			onClick: function(event, treeId, treeNode, msg) {
				
			}
		},
		view: {//样式设置
			showIcon: true
		}
	};
	if(flag){
		var dataObj = {
			"code" : "auth_company",
			"groupId" : gl_groupId
		};
		if(companyId){
			dataObj.companyId = companyId;
		}
		$.ajax({
            type: 'POST',
            url: basePath+'/auth/role/getModuleTreeList',
			data:dataObj,
            dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
            success: function (data) {
                $.fn.zTree.init($("#dataPowerTree"), setting, data.data.moduleTree);
                $.fn.zTree.init($("#dataPowerTree2"), setting, data.data.moduleTree);
				var zTree2 = $.fn.zTree.getZTreeObj("dataPowerTree2");
				zTree2.expandAll(true);   
				var zTree = $.fn.zTree.getZTreeObj("dataPowerTree");
				zTree.expandAll(true);  
            }
        });
	} else {
		$.fn.zTree.init($("#dataPowerTree"), setting);
		$.fn.zTree.init($("#dataPowerTree2"), setting);
		var zTree2 = $.fn.zTree.getZTreeObj("dataPowerTree2");
		zTree2.expandAll(true);   
		var zTree = $.fn.zTree.getZTreeObj("dataPowerTree");
		zTree.expandAll(true);  
	}
}

//公司数据权限树
function initCompanyDataTree(){

	//人员选择树
	var setting = {
		data: {//数据属性设置
		},
		check: {
	        enable: true
            //chkboxType : { "Y" : "", "N" : "" }
	    },	
        async: {//从后台获取数据
            enable: true,
            url: basePath+'/Tgroup/findTree2?groupId='+gl_groupId,
            autoParam:[],
            dataFilter: null
        },
		callback: {//回调事件设置
			onClick: function(event, treeId, treeNode, msg) {
        		if(treeNode.objType == "Temployee"){
        			$("#rightTree").show();
            		var eid = treeNode.obj.id;
            		$.ajax({
            				url: basePath + '/TemployeeData/findByModel',
            				type : "post",
            				dataType : 'json',
            				data:{'employeesId':eid,'typeCode':'KSYGS'},
            				success:function(data){
            					var cList = data.data.dataList;
            					
            					//更新此员工的公司数据权限
            				    var treeObj = $.fn.zTree.getZTreeObj("empDataPowerTree");
            				    var nodes = treeObj.getNodes();
            				    for(var i=0;i<nodes.length;i++){
            				    	eachTree2(nodes[i],cList);
            				    }
            				    $("#rightTreeInfo").hide();
                    			$("#rightTree").show();
                    			
            			    }
            		});
        		}else{
        			$("#rightTree").hide();
        			$("#rightTreeInfo").show();
        		}
			}
		},
		view: {//样式设置
			showIcon: true
		}
	};
	$.fn.zTree.init($("#empTree"), setting);
	var zTree = $.fn.zTree.getZTreeObj("empTree");
    zTree.expandAll(true);  
   
	//公司选择树
	var setting2 = {
		data: {//数据属性设置
		},
		check: {
	        enable: true ,
            chkboxType : { "Y" : "", "N" : "" }
	    },	
        async: {//从后台获取数据
            enable: true,
            url: getUrl(),
            autoParam:[],
            dataFilter: null
        },
		callback: {//回调事件设置
			onClick: function(event, treeId, treeNode, msg) {
			},
			onAsyncSuccess: function(event, treeId, treeNode, msg){
			    
			    var treeObj = $.fn.zTree.getZTreeObj("empDataPowerTree");
			    var nodes = treeObj.getNodes();
			    for(var i=0;i<nodes.length;i++){
			    	eachTree(nodes[i]);
			    }
			}
		},
		view: {//样式设置
			showIcon: true
		}
	};
	$.fn.zTree.init($("#empDataPowerTree"), setting2);
	var zTree2 = $.fn.zTree.getZTreeObj("empDataPowerTree");
    zTree2.expandAll(true); 

    //递归遍历树节点
    function eachTree(node){
    	if(node.objType=="Tcompany"){
    		node.nocheck = false;
    		$.fn.zTree.getZTreeObj("empDataPowerTree").updateNode(node);
    	}	
    	for(var i=0;i<node.children.length;i++){
    		eachTree(node.children[i]);
    	}
    }
    //递归遍历树节点
    function eachTree2(node,cList){
    	if(node.objType=="Tcompany"){
    		node.checked = false;
    		for ( var int = 0; int < cList.length; int++) {
				if((node.obj.id + "") == cList[int].valueCode){
					node.checked = true;
					break;
				}
			}
    		$.fn.zTree.getZTreeObj("empDataPowerTree").updateNode(node);
    	}	
    	for(var i=0;i<node.children.length;i++){
    		eachTree2(node.children[i],cList);
    	}
    }
    

}
function getUrl() {
    var param = basePath+'/Tgroup/findTree2?isHaveEmp=false&isHaveSection=false&groupId='+gl_groupId+"&companyQueryKeyWord="+$("#searchCompanyKeyWord").val();
    return param;
}

//重置密码
function resetAdminPwd(id){
	$.MsgBox("操作提示","重置密码将用户密码设置为：123456<br>确定继续操作",function(){
		companyDao.resetAdminPwd({'id':id},function(data){
			if(data.result == 1){
				 $.MsgBox('提示消息','重置成功');
				 reLoadGrid();
			}else{
				 $.MsgBox('提示消息',data.desc);
			}
		});
	},function(){
		
	});
}

//初始化表格
var currPage = 1;
function initGrid(){

	function formatterResetAdminPwd(cellvalue, options, rowObject){
		return '<span class="rePwd" onclick="resetAdminPwd('+rowObject.id+');" style="color:#00CCFF;cursor:pointer">重置密码</span>';
	}
	//0为启用,1为禁用,2删除
	function formatterStatus(cellvalue, options, rowObject){
		if(cellvalue == 0){
			return "";
		}else if(cellvalue == 1){
			return '<span class="glyphicon glyphicon-ok"></span>';
		}else if(cellvalue == 2){
			return "";
		}
	}
	function formatterDate(cellvalue, options, rowObject){
		var date = new Date();
		date.setTime(cellvalue);
		return $.DateFormat(date,"yyyy-MM-dd");
	}
	$("#dataGrid").jqGrid({
		url: basePath + '/Tcompany/page',
        datatype : "json",
        colNames : [ 'ID',  '公司编码', '公司名称', '管理员工号','重置管理员密码','重置管理员密码','是否禁用','备注',
                     '新增人','新增人','新增时间','修改人','修改人','修改时间','上级公司ID','区域ID','分期商','模块','层级编码'],  
        colModel : [ 
                     {name : 'id',index : 'id',align:'center',width:50,hidden: true},
                     {name : 'code',index : 'code',align:'left'}, 
                     {name : 'name',index : 'name',align:'left'}, 
                     {name : 'adminLogin',index : 'adminLogin',align:'left'},//管理员工号
                     {name : 'adminPwd2',index : 'adminPwd2',align:'left',formatter:formatterResetAdminPwd}, //管理员密码
                     {name : 'adminPwd',index : 'adminPwd',align:'left',hidden: true}, //管理员密码
                     {name : 'status',index : 'status',align:'left',formatter:formatterStatus},
                     {name : 'remark',index : 'remark',align:'left'},
                     {name : 'createUid',index : 'createUid',hidden: true},
                     {name : 'createName',index : 'createName',hidden: false},
                     {name : 'createTime',index : 'createTime',hidden: false,formatter:formatterDate},
                     {name : 'updateUid',index : 'updateUid',hidden: true},
                     {name : 'updateName',index : 'updateName',hidden: false},
                     {name : 'updateTime',index : 'updateTime',hidden: false,formatter:formatterDate},
                     {name : 'areaId',index : 'areaId',align:'center',width:50,hidden: true},
                     {name : 'parentId',index : 'parentId',align:'center',width:50,hidden: true},
                     {name : 'fqsIds',index : 'fqsIds',align:'center',width:50,hidden: true},
                     {name : 'moduleIds',index : 'moduleIds',align:'center',width:50,hidden: true},
                     {name : 'layerCode',index : 'layerCode',align:'center',width:50,hidden: true}
                     
                   ],
        styleUI: 'Bootstrap',
        pager : '#jqGridPager',
        jsonReader: { root: "data.rows", total: "data.total",records: "data.records",repeatitems: false},
        mtype: "POST",
        viewrecords : true,
        multiselect : true,
        multiboxonly : true,
        rownumbers:true,
        caption : "",
        rowNum : 10,
        autowidth:true,
        onSortCol:function(index,iCol,sortorder){
		},
		ondblClickRow:function(){
			$("#eiditBtn").click();
		},
        postData:getQueryModel(),
        loadComplete:function(data){
        	try {
				if(data.result == 1){
					currPage = data.data.page;
					wResize();
				}else{
					$.MsgBox('出错提示',data.desc);
				}
			} catch (e) {
				console.log(e);
			}
        }
      });	
}

//获取分页查询参数
var sortColumns ="LAYER_CODE";
function getQueryModel(){

	var postData = $("#dataGrid").jqGrid("getGridParam", "postData");
    $.each(postData, function (k, v) {
        delete postData[k];
    });
    var model = {};
    model.groupId = gl_groupId;
    
    //***其它参数
    model.keyWord = $.trim($("#companyKeyWord").val());
    model.selectTreeClassId = curr_company_tree_selectId ;
    model.sortColumns = sortColumns;
    model.haveDisEnableStatus = $('#companyStatusCheckbox').is(':checked')==true?1:0;
	return model;
}

//初始化分期商列表
function initFQSselect(){
	$.ajax({
		type: 'Get',
		url: basePath+'/Tpublictabs/listByModel?typeCode=FQSMC',
		dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
		success: function(data) {
			 var list = data.data.dataList;
			 $("#fqsIdsSelect").html("");$("#fqsIdsSelect2").html("");
			 for ( var int = 0; int < list.length; int++) {
				 $("#fqsIdsSelect").append('<option value="'+list[int].code+'">'+list[int].content+'</option>');
				 $("#fqsIdsSelect2").append('<option value="'+list[int].code+'">'+list[int].content+'</option>');
			 }
			 $('#fqsIdsSelect').selectpicker('refresh');$('#fqsIdsSelect2').selectpicker('refresh');
		},
		error: function(msg) {
			alert(" 数据加载失败！" + msg);
		}
	});
}

//删除
function delBtn(){
	
	//获取选择的行 多选
	var objs = getCurrRows();
	if(objs.length > 0){
		var ids = $.map(objs,function(obj){ return obj.id; })
		$.MsgBox('删除确认','是否确定删除',function(){
			companyDao.del(ids.join(","),function(data){
				if(data.result == 1){
					 $.MsgBox('提示消息','删除成功'); 
					 reLoadCompanyTree();reLoadGrid(currPage);
				}else{
					 $.MsgBox('提示消息',data.desc);
				}
			});
		},function(){});
	}else{
		$.MsgBox('提示消息','请选择要删除的行'); 
	}
}

//禁用
function disEnabledBtn(){
	//获取选择的行 多选
	var objs = getCurrRows();
	if(objs.length > 0){
		var ids = $.map(objs,function(obj){ return obj.id; })
		$.MsgBox('禁用确认','是否确定禁用',function(){
			companyDao.disEnabled(ids.join(","),function(data){
				if(data.result == 1){
					 $.MsgBox('提示消息','禁用成功'); 
					 reLoadGrid(currPage);
					    $('#addParentIdTree').combotree('reload');
					    $('#eiditParentIdTree').combotree('reload');
				}else{
					 $.MsgBox('提示消息',data.desc);
				}
			});
		},function(){});
	}else{
		$.MsgBox('提示消息','请选择要删除的行'); 
	}
}

//启用
function enabledBtn(){
	//获取选择的行 多选
	var objs = getCurrRows();
	if(objs.length > 0){
		var ids = $.map(objs,function(obj){ return obj.id; })
		$.MsgBox('启用确认','是否确定启用',function(){
			companyDao.enabled(ids.join(","),function(data){
				if(data.result == 1){
					 $.MsgBox('提示消息','启用成功'); 
					 reLoadGrid(currPage);
					    $('#addParentIdTree').combotree('reload');
					    $('#eiditParentIdTree').combotree('reload');
				}else{
					 $.MsgBox('提示消息',data.desc);
				}
			});
		},function(){});
	}else{
		$.MsgBox('提示消息','请选择要删除的行'); 
	}
}



//添加保存
function addSave(op){
	//新增验证非空
	var area = $('.codeAdd').val().trim(),
		na = $('.nameAdd').val().trim();
	if(area == ''){
		$(".codeAdd").next().html('必填!');
		return;
	}
	if(na == ''){
		$('.nameAdd').next().html('必填!');
		return;
	}
	var funTree = $.fn.zTree.getZTreeObj("dataPowerTree");
	var nodes = funTree.getCheckedNodes(); 
	
	var moduleIdList = $.map(nodes,function(obj){
		return obj.id;
	});
	
	var moduleCodeList = $.map(nodes,function(obj){
		return obj.code;
	});

	var model = getAddFormData();
	model.moduleIds = moduleIdList.join(",");
	model.moduleCodes = moduleCodeList.join(",");
	//添加方法
	companyDao.add(model,function(data){
		if(data.result == 1){
			 $.MsgBox('提示消息','保存成功'); 
			 //清空表单
			 $("#addModalDialog").writeJson2Dom(kong);
			 
			 //清空表单
			 $(".codeAdd").next().html('');
			 $(".nameAdd").next().html('');
			 $(".codeUp").next().html('');
			 $(".nameUp").next().html('');
			 $('#addParentIdTree').combotree('setValue',-1); 
			 $('#addParentAreaIdTree').combotree('setValue',-1); 

			 if(op == 2){
				 $('#addModalDialog').modal('hide');
			 }
			 reLoadCompanyTree();reLoadGrid();
		}else{
			 $.MsgBox('提示消息',data.desc);
		}
	});
}

//编辑保存
function eiditSave(op){
	var area = $('.codeUp').val().trim(),
	na = $('.nameUp').val().trim();
	if(area == ''){
		$(".codeUp").next().html('必填!');
		return;
	}
	if(na == ''){
		$('.nameUp').next().html('必填!');
		return;
	}
	companyDao.save(getSaveFormData(),function(data){
		if(data.result == 1){
			 $('#eiditModalDialog').modal('hide');
			 $.MsgBox('提示消息','保存成功');
			 reLoadCompanyTree();reLoadGrid(currPage);
		}else{
			 $.MsgBox('提示消息',data.desc);
		}
	});
}


//保存职员数据权限数据
function saveEmpDataPower(op){
	
	//获取人员
	var emp = getCurrSelectEmp();
	
	//获取公司IDS
	var comIds = getCurrSelectCompanyIDS().join(",");
	
	//保存数据
	if(!(emp == null)){
		companyDao.saveEmpPowerData({'id':emp.id,'companyIds':comIds},function(data){
			if(data.result == 1){
				 $('#dataPowerModalDialog').modal('hide');
				 $.MsgBox('提示消息','保存成功');
				 reLoadGrid();
			}else{
				 $.MsgBox('提示消息',data.desc);
			}
		});
	}
}

//获取当前选中职员公司数据权限
function getCurrSelectCompanyIDS(){
	
	//获取公司IDS
	var funTree = $.fn.zTree.getZTreeObj("empDataPowerTree");
	var nodes = funTree.getCheckedNodes(); 

	var moduleIdList = $.map(nodes,function(obj){
		return obj.obj.id;
	});
	return moduleIdList;
}

//获取当前选中的职员
function getCurrSelectEmp(){
	var treeObj = $.fn.zTree.getZTreeObj("empTree");
	var nodes = treeObj.getSelectedNodes();
	
	//判断是否有选中的节点
	if(nodes.length>0){
		return nodes[0].obj;
	}else{
		return null;
	}
}

//获取添加表单数据
function getAddFormData(){
	
	var obj = $("#addModalDialog").toJsonObject();
	obj.status = (obj.status == undefined?0:1);
	
	var fqsList = $("#fqsIdsSelect").selectpicker('val');
	var fqsIds = "";
	if(fqsList != null){
		fqsIds = fqsList.join(",");
	}
	obj.fqsIds =  fqsIds;
	obj.groupId = gl_groupId;
	
	return obj;
}

//获取保存表单数据
function getSaveFormData(){
	var obj = $("#eiditModalDialog").toJsonObject();
	obj.status = (obj.status == undefined?0:1);
	
	var fqsList = $("#fqsIdsSelect2").selectpicker('val');
	var fqsIds = "";
	if(fqsList != null){
		fqsIds = fqsList.join(",");
	}
	
	var funTree = $.fn.zTree.getZTreeObj("dataPowerTree2");
	var nodes = funTree.getCheckedNodes(); 

	var moduleIdList = $.map(nodes,function(obj){
		return flag ? obj.id : obj.obj.id;
	});
	var moduleCodeList = $.map(nodes,function(obj){
		return flag ? obj.code : obj.obj.id;
	});
	
	obj.moduleIds = moduleIdList.join(",");
	obj.moduleCodes = moduleCodeList.join(",");
	obj.fqsIds =  fqsIds;
	obj.groupId = gl_groupId;
	return obj;
}

//获取当前选择的行数据 单选
function getCurrRow(){
	var ids=$('#dataGrid').jqGrid('getGridParam','selarrrow');
    var objs = [];
    $.each(ids,function(i,value){
    	objs.push($("#dataGrid").jqGrid('getRowData', value ));
    });
	if(objs.length>1 || objs.length<1){
		$.MsgBox('操作提示','请只选中一行数据');
		return null;
	}else{
		return objs[0];
	}
}

//获取当前选择的行数据 多选
function getCurrRows(){
	var ids=$('#dataGrid').jqGrid('getGridParam','selarrrow');
    var objs = [];
    $.each(ids,function(i,value){
    	objs.push($("#dataGrid").jqGrid('getRowData', value ));
    });
	return objs;
}

//重新加载数据
function reLoadGrid(page){
	page = _.isUndefined(page)?1:page;
    $("#dataGrid").jqGrid('setGridParam',{  
        datatype:'json',  
        postData:getQueryModel(),
        page:page  
    }).trigger("reloadGrid"); //重新载入  
}

//重新加载树
function reLoadCompanyTree(){
	
	curr_company_tree_selectId = "";
	curr_company_tree_selectAreaId = "";
	
	var objTree = $.fn.zTree.getZTreeObj("dataTree");
	objTree.setting.async.url=basePath+'/Tcompany/findTree2?haveDisEnableStatus=' + ($('#companyStatusCheckbox').is(':checked')==true?1:0);
    objTree.reAsyncChildNodes(null, "refresh"); 
    
    $('#addParentIdTree').combotree('reload');
    $('#eiditParentIdTree').combotree('reload');
}

//重新加载公司数据功能树
function reLoadCompanyDataTree(){
	var objTree = $.fn.zTree.getZTreeObj("empDataPowerTree");
    objTree.reAsyncChildNodes(null, "refresh"); 
    
}

//公司角色权限树
var currSelectGroupEmpId = null;
var currSelectEmpCompanyId = null;
function initCompanyRoseTree(){

	//人员选择树
	var setting = {data: {},check: {enable: true},	
        async: {//从后台获取数据
          enable: true,
          url: basePath+'/Tgroup/findTree2?groupId='+gl_groupId,
          autoParam:[],
          dataFilter: null
        },
		callback: {//回调事件设置
			onClick: function(event, treeId, treeNode, msg) {
	      		if(treeNode.objType == "Temployee"){
	      			$(".rightDIIII").show();
	      			currSelectGroupEmpId = treeNode.obj.id;
	      			if(currSelectEmpCompanyId == "" || currSelectEmpCompanyId == null){
			  			return;
			  		}else{
			  			$.ajax({
							url: basePath + '/authority/roleInfo/findByCompanyId',
							type : "post",
							dataType : 'json',
							data:{'companyId':currSelectEmpCompanyId},
							success:function(data){
								if(data.result != 1){$.MsgBox('错误提示',data.desc);return;};
								var cList = data.data.roleList;
								$("#roseBox").html("");
								var htmll = "";
								for ( var int = 0; int < cList.length; int++) {
									htmll = htmll + '<label style="float: left;margin-left:6px;"><input type="checkbox" id="companyRoseId_'+cList[int].id+'" name="companyRose" value="'+cList[int].id+'">'+cList[int].name+'</label>';;
								}
								$("#roseBox").html(htmll);
								if(cList.length == 0){
									$("#roseBox").html("该公司未关联角色!");
								}else{
									setEmpHavedRose(currSelectEmpCompanyId,currSelectGroupEmpId);
								}
						    }
						});
			  		}
	      		}else{
	      			$(".rightDIIII").hide();
	      		}
			}
		},
		view: {//样式设置
			showIcon: true
		}
	};
	$.fn.zTree.init($("#empTree2"), setting);
	var zTree = $.fn.zTree.getZTreeObj("empTree2");
    zTree.expandAll(true);  
 
	//公司选择树
	var setting2 = {
		data: {//数据属性设置
		},
		check: {
	        enable: true ,
          chkboxType : { "Y" : "", "N" : "" }
	    },	
      async: {//从后台获取数据
          enable: true,
          url: getUrl(),
          autoParam:[],
          dataFilter: null
      },
		callback: {//回调事件设置
			onClick: function(event, treeId, treeNode, msg) {
		  		var cid = treeNode.obj.id;
		  		currSelectEmpCompanyId = cid;
		  		if(currSelectGroupEmpId == "" || currSelectGroupEmpId == null){
		  			$.MsgBox("操作提示","请先选择人员");
		  			return;
		  		}
				$.ajax({
					url: basePath + '/authority/roleInfo/findByCompanyId',
					type : "post",
					dataType : 'json',
					data:{'companyId':cid},
					success:function(data){
						if(data.result != 1){$.MsgBox('错误提示',data.desc);return;};
						var cList = data.data.roleList;
						$("#roseBox").html("");
						var htmll = "";
						for ( var int = 0; int < cList.length; int++) {
							htmll = htmll + '<label style="float: left;margin-left:6px;"><input type="checkbox" id="companyRoseId_'+cList[int].id+'" name="companyRose" value="'+cList[int].id+'">'+cList[int].name+'</label>';;
						}
						$("#roseBox").html(htmll);
						if(cList.length == 0){
							$("#roseBox").html("该公司未关联角色!");
						}else{
							setEmpHavedRose(cid,currSelectGroupEmpId);
						}
				    }
				});
			}
		},
		view: {//样式设置
			showIcon: true
		}
	};
	$.fn.zTree.init($("#empDataPowerTree2"), setting2);
	var zTree2 = $.fn.zTree.getZTreeObj("empDataPowerTree2");
    zTree2.expandAll(true); 
  
    //设置该员工再该公司所拥有的角色
    function setEmpHavedRose(companyId,empId){
		$.ajax({
			url: basePath + '/authority/roleInfo/findEmpRosesByCompanyIdAndEmpId',
			type : "post",
			dataType : 'json',
			data:{'companyId':companyId,'empId':empId},
			success:function(data){
				if(data.result != 1){$.MsgBox('错误提示',data.desc);return;};
				var cList = data.data.empCompanyRoleList;
				for ( var int = 0; int < cList.length; int++) {
					$("#companyRoseId_"+cList[int].roleId).attr("checked",'true'); 
				}
		    }
	});
    }

}


function saveEmpCompanyRoleToPower(){
	
	if(currSelectEmpCompanyId != "" && currSelectEmpCompanyId != null && currSelectGroupEmpId != null && currSelectGroupEmpId != "" ){
		var dataLen = $("input[name='companyRose']:checked").length , dataList;
		if(dataLen){
			dataList = $("input[name='companyRose']:checked").map(function(){
				return currSelectEmpCompanyId+"_"+currSelectGroupEmpId+"_"+$(this).val();
			}).get().join(",")
		}else{
			dataList = currSelectEmpCompanyId+"_"+currSelectGroupEmpId+"_";
		}
		//与产品协商后，此处不做限制 吴洋 2017.6.26 
//		if(dataList != ""){
			$.ajax({
					url: basePath + '/authority/roleInfo/saveEmpCompanyRose',
					type : "post",
					dataType : 'json',
					data:{'models':dataList},
					success:function(data){
						if(data.result != 1){$.MsgBox('错误提示',data.desc);return;};
						$.MsgBox('操作提示',"保存成功")
				    }
			});
			 
			 
//		}
	}
	
}




