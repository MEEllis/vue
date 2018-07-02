$.jgrid.defaults.styleUI = 'Bootstrap';	

$(function(){
	// 先禁用按钮
	$(".btn-group button").prop("disabled",true);
	// 初始化左侧树
	initTree();
	// 初始化角色清单
	initRoleList();
	// 初始化角色表格
	initAuthTable(true);
	//加载冻结列

});

// 初始化左侧树
function initTree(){
	// 定义模块树的参数
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
				// 初始化角色表格
				initAuthTable(false);
			}
		},
		view: {
			showIcon: true
		}
	};
	
	$.ajax({
		async:false,
        type: 'POST',
        url: "/manager/auth/role/getModuleTreeList",
		data:{
			"code" : "auth_employee"
		},
        dataType: "json",
        success: function (data) {
			if(data.result == 1){
				$.fn.zTree.init($("#metaDataTree"), setting, data.data.moduleTree);
			}else{
				alert(data.desc);
			}
        }
    });
}

// 初始化角色清单
function initRoleList(){
	$.ajax({
		async:false,
        type: 'POST',
        url: "/manager/auth/role/getRoleList",
        dataType: "json",
        success: function (data) {
			if(data.result == 1){
				$("#roleS").empty();
				$("#roleSelect").empty();
				$.each(data.data.roleList,function(index,item){
					$("#roleS").append('<option value="' + item.id + '">' + item.name + '</option>');
					$("#roleSelect").append('<option value="' + item.id + '">' + item.name + '</option>');
				});
			}else{
				alert(data.desc);
			}
        }
    });
}

// 获取选中模块的code
function getSelectedModuleCode(treeId,first){
	if(!first){
		var zTreeObj = $.fn.zTree.getZTreeObj(treeId);
	    var selectedNodes = zTreeObj.getSelectedNodes();
		if(selectedNodes.length > 0){
			return selectedNodes[0].code;
		}
	}
	return "";
} 

// 初始化角色表格
function initAuthTable(first){
	var colNames=[];//表头
	colNames.push("id");	
	colNames.push("操作名称");	
		
	var JqGridColModel=[];//参数
	JqGridColModel.push({name:'code',width:100,align:'center',sorttype:'string',hidden:true,frozen:true});
	JqGridColModel.push({name:'name',width:100,align:'center',sorttype:'string',frozen:true});
	
	// 获取当前角色
	var roleId = $("#roleSelect").val();
	// 获取当前选中模块
	var moduleCode = getSelectedModuleCode("metaDataTree",first);
	// 获取当前是否包含数据权限
	var containDataAuth = true;//$(".shou-checkbox").prop("checked");
	
	$.ajax({
        type: 'Get',
        url: "/manager/auth/role/getAuthTableHeader",
		data: { "containDataAuth" : containDataAuth },
        dataType: "json",
        success: function (data) {
			if(data.result == 1){
				if(data.data.funList){
					// 获取当前角色当前模块下所有的权限(横向表头)
					for(var i=0;i<data.data.funList.length;i++){
						 colNames.push(data.data.funList[i].name);
						 var obj={};
						 obj.name=data.data.funList[i].code;
						 obj.width=100;
						 obj.align='center';
						 JqGridColModel.push(obj);
					}
				}
				$("#jqwrap").html('<table id="jqGrid_metaData" class="zxsaastable table table-bordered" style="text-align:center;"></table><div id="gridpager"></div>');
				
                var gridUrl = "/manager/auth/role/getAuthData";
				var data = {};
				data.moduleCode = moduleCode;
				data.containDataAuth = containDataAuth;
				if(roleId && roleId != null && roleId != ""){
					data.roleId = roleId;
				}
				
				// 加载授权表格
				$("#jqGrid_metaData").jqGrid({
					url:gridUrl,
					postData:data,
					mtype:"POST",
					datatype: "json",
					jsonReader  : {	
						root: "data.menuList",
						repeatitems: false
					},
				 	cellEdit:false,
				 	cellsubmit: 'clientArray',//单元格保存内容的位置	
				    editurl: 'clientArray',
					colNames:colNames,          
			        colModel:JqGridColModel,
			      //  sortable:false,			            
			        rownumbers:true,
			        rowNum:-1,
			        viewrecords: true,		       
			        width: "100%" ,
			        height: $(window).height()*0.65,
					autowidth:true,
					rownumWidth: 35, // the width of the row numbers columns
					shrinkToFit:false,  //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
					ondblClickRow:function(id){
					//双击进入编辑
					var delid = id;
					},
					onCellSelect:function(id,index,e){
						
					},
					onSelectRow:function(id){
					
				    },
					 beforeEditCell:function(rowid,cellname,v,iRow,iCol)
					{
					
				    },
					beforeSelectRow:function(rowid,e){
			           
					},
					afterInsertRow: function (rowid, aData) { //新增一行之后
		
					},
					gridComplete: function() {
					
		
					},
					loadComplete:function(data){
                        if (data.data.roleFunList) {
                            if (data.data.roleFunList.length > 0) {
                                var dataA = [];
                                dataA = data.data.roleFunList;
                                for (var i = 0; i < dataA.length; i++) {
                                    $("#jqGrid_metaData").setCell(dataA[i].menuCode, dataA[i].funCode, "√");
                                }
                            }
                        }
					   // 启用左上角按钮
					   $(".btn-group button").prop("disabled",false);
					},
					loadError:function(xhr,status,error){
				             
					}
				});
				jQuery("#jqGrid_metaData").jqGrid('setFrozenColumns');//frozen!!!
			}else{
				alert(data.desc);
			}
        }
    });
}

// 更改选中的角色
$("#roleSelect").change(function(){
	// 初始化角色表格
	initAuthTable(false);
});

// 勾选数据操作权限
$(".shou-checkbox").click(function(){
	// 初始化角色表格
	initAuthTable(false);
});

//------------------------------------------新增----------------------------------------//
//新增数据操作授权点击事件
$(document).on("click",".addNew,.modify",addRole);

//新增内置角色信息按钮单击事件
function addRole(){
	$("#myModal").modal("show");
	// 点击的是修改按钮
	if($(this).hasClass('modify')){
		$("#myModalLabel").html("角色修改");
		// 获取当前角色
		var roleId = $("#roleSelect").val();
		var roleName = $("#roleSelect option:selected").html();
		$("#roleId").val(roleId);
		$("#roleName").val(roleName);
	} else {
		$("#myModalLabel").html("角色新增");
		$("#roleId").val("");
		$("#roleName").val("");
		$(".shou-checkbox-add").prop("checked",false);
	}
	// 初始化模态弹窗左侧树
	initModalTree();
	// 初始化模态弹窗角色表格
	initModalAuthTable(true);
}

// 初始化模态弹窗左侧树
function initModalTree(){
    // 定义模块树的参数
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
            onClick: function(event, treeId, treeNode, msg){
                // 初始化角色表格
                initModalAuthTable(false);
            }
        },
        view: {
            showIcon: true
        }
    };
    
    $.ajax({
        async: false,
        type: 'POST',
        url: "/manager/auth/role/getModuleTreeList",
		data:{
			"code" : "auth_employee"
		},
        dataType: "json",
        success: function(data){
            if (data.result == 1) {
                $.fn.zTree.init($("#roleDataTree"), setting, data.data.moduleTree);
            }
            else {
                alert(data.desc);
            }
        }
    });
}

// 初始化模态弹窗角色表格
function initModalAuthTable(first){
	var colNames=[];//表头
	colNames.push("id");	
	colNames.push("操作名称");	
		
	var JqGridColModel=[];//参数
	JqGridColModel.push({name:'code',width:100,align:'center',sorttype:'string',hidden:true,frozen:true});
	JqGridColModel.push({name:'name',width:100,align:'center',sorttype:'string',frozen:true});
	
	// 获取当前加载的角色
	var roleId = $("#roleId").val();
	// 获取当前选中模块
	var moduleCode = getSelectedModuleCode("roleDataTree",first);
	// 获取当前是否包含数据权限
	var containDataAuth = true;//$(".shou-checkbox-add").prop("checked");
	
	$.ajax({
        type: 'Get',
        url: "/manager/auth/role/getAuthTableHeader",
		data: { "containDataAuth" : containDataAuth },
        dataType: "json",
        success: function (data) {
			if(data.result == 1){
				if (data.data.funList) {
					// 获取当前角色当前模块下所有的权限(横向表头)
					for (var i = 0; i < data.data.funList.length; i++) {
						colNames.push(data.data.funList[i].name);
						var obj = {};
						obj.name = data.data.funList[i].code;
						obj.width = 100;
						obj.align = 'center';
						JqGridColModel.push(obj);
					}
				}
				$("#myModal").find(".jqGrid_wrap").html('<table id="jqGrid_roleMsgAdd" class="zxsaastable ui-jqgrid-btable ui-common-table table table-bordered" style="text-align:center;"></table><div id="gridpager"></div>');
				
                var gridUrl = "/manager/auth/role/getAuthTemplateData?roleId=" + roleId + "&moduleCode=" + moduleCode + "&containDataAuth=" + containDataAuth;
				
				// 加载授权表格
				$("#jqGrid_roleMsgAdd").jqGrid({
					url:gridUrl,
					mtype:"POST",
					datatype: "json",
					jsonReader  : {	
						root: "data.menuList",
						repeatitems: false
					},
				 	cellEdit:false,
				 	cellsubmit: 'clientArray',//单元格保存内容的位置	
				    editurl: 'clientArray',
					colNames:colNames,          
			        colModel:JqGridColModel,
			        sortable:false,			            
			        rownumbers:true,
			        rowNum:-1,
			        viewrecords: true,		       
			        width: "100%" ,
			        height:$(window).height()*0.45,
					autowidth:true,
					rownumWidth: 35, // the width of the row numbers columns
					shrinkToFit:false,  //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
					multiselect:true,
					multiboxonly:true,
					multiselectWidth:38,
					ondblClickRow:function(id){
					//双击进入编辑
					var delid = id;
							
					},
					onCellSelect:function(id,index,e){
                        
					},
					onSelectRow:function(id,status){
                        if (status) {
                            $("#jqGrid_roleMsgAdd").find("tr[id=" + id + "]").find("input[type=checkbox]").filter(".addCheck").prop("checked", true);
                           
                        }
                        if (!status) {
                            $("#jqGrid_roleMsgAdd").find("tr[id=" + id + "]").find("input[type=checkbox]").filter(".addCheck").prop("checked", false);
                        }
                        selectAllRow("jqGrid_roleMsgAdd");
				    },
					 beforeEditCell:function(rowid,cellname,v,iRow,iCol)
					{
					
				    },
					beforeSelectRow:function(rowid,e){
			           
					},
					afterInsertRow: function (rowid, aData) { //新增一行之后
		
					},
					gridComplete: function() {
					
		
					},
					loadComplete:function(data){
						if (data.data.templateList) {
							if (data.data.templateList.length > 0) {
								var dataA = [];
								dataA = data.data.templateList;
								if (dataA) {
									for (var i = 0; i < dataA.length; i++) {
										var checkInput = "<input class='addCheck' type='checkbox' value='" + dataA[i].authCode + "'>";
										if (dataA[i].checked) {
											checkInput = "<input class='addCheck' type='checkbox' value='" + dataA[i].authCode + "' checked='true'>"
										}
										$("tr[id=" + dataA[i].menuCode + "]").find("td[aria-describedby=jqGrid_roleMsgAdd_" + dataA[i].funCode + "]").html(checkInput);
									}
									
									
								}
							
							}
						}
                        // 启用左上角按钮
                        $(".btn-group button").prop("disabled", false);
                    	checkRows("jqGrid_roleMsgAdd");
					},
					loadError:function(xhr,status,error){
				             
					}
				});
				jQuery("#jqGrid_roleMsgAdd").jqGrid('setFrozenColumns');//frozen!!!
				
			}else{
				alert(data.desc);
			}
        }
    });
}

// 勾选模态弹窗数据操作权限
$(".shou-checkbox-add").click(function(){
	// 初始化角色表格
	initModalAuthTable(false);
});



// 保存角色信息
$(document).on("click",".save_add",saveAndClose);

function saveAndClose() {
	var roleId = $("#roleId").val().trim();
	var roleName = $("#roleName").val().trim();
	if (roleName == "") {
		$.zxsaas_plus.showalert("提示", "角色名称不能为空!");
		return;
	}
	// 获取当前选中模块
	var moduleCode = getSelectedModuleCode("roleDataTree",false);
	var url = "/manager/auth/role/saveRole/" + (roleId == '' ? 'auth_add' : 'auth_update');
	var authCodes = "";
	$("#jqGrid_roleMsgAdd").find("input[type=checkbox]").filter(".addCheck:checked").each(function(){
		authCodes += $(this).val() + ",";
	});
	var data = {"roleId" : roleId,"roleName" : roleName,"moduleCode" : moduleCode,"authCodes" : authCodes};
	if (authCodes == "") {
		$.zxsaas_plus.showconfirm("提示", "当前角色本模块下未分配功能,确定收回权限吗?",function(){
			saveAuthRequest(url,data);
		});
		return;
	}
	saveAuthRequest(url,data);
}
// 保存授权的请求
function saveAuthRequest(url,data){
	var roleId = data.roleId;
	$.ajax( {
		url : url,
		type : "POST",
		data : data,
		success : function(data) {
			if (data.result == 1) {
				$.zxsaas_plus.showalert("提示", data.desc);
				$("#roleId").val(data.data.roleId);
				$("#myModalLabel").html("角色修改");
				// 保存成功后,初始化主页下拉框
				initRoleList();
				parent.websocket.send("auth_kickOut;"+roleId);
			} else {
				$.zxsaas_plus.showalert("错误", data.desc);
			}
		}
	});
}


var options = {
    LoadTableUrl: "/manager/auth/role/getEmpVoList",
    TableName: "#jqGrid_empMa", //显示表格名称。遵照css选择器书写
    pager: ""
};
/**
 * 角色关联人员
 */
$(document).on('click', '.rel', function(e){
    $.jgrid.defaults.width = 1280;
    $.jgrid.defaults.responsive = true;
    $.jgrid.defaults.styleUI = 'Bootstrap';
    var lastsel = '';//最后一次选中的行
    var rightClickColid = "";//右键列id
    var rightClickColIndex = 0;//右键index
    var mydata;
    var hid = false;
    var lock = false;
    var myobj = [];
    var colNames = ['ID','职位名称','员工编号','员工名称','部门名称','员工属性'];
    var JqGridColModel = [{
        name: 'id',
        index: 'id',
        width: 100,
        align: 'center',
        sorttype: 'string',
        hidden: true,
        sortable: false
    },{
        name: 'jobName',
        index: 'jobName',
        width: 100,
        align: 'center',
        sorttype: "string",
        sortable: false
    },{
        name: 'code',
        index: 'code',
        width: 100,
        align: 'center',
        sorttype: 'string',
        sortable: false
    },{
        name: 'name',
        index: 'name',
        width: 100,
        align: 'center',
        sorttype: 'string',
        sortable: false
    },{
        name: 'sectionName',
        index: 'sectionName',
        width: 100,
        align: 'center',
        sorttype: "string",
        sortable: false
    },{
        name: 'attrName',
        index: 'attrName',
        width: 100,
        align: 'center',
        sorttype: "string",
        sortable: false
    }];
    
    loadtable();
    
    function loadtable(){
        $(options.TableName).jqGrid({
            url: options.LoadTableUrl,
            mtype: "POST",
            postData: {
				"roleId" : $("#roleS").val()
            },
            datatype: "json",
            jsonReader: {
                root: "data.empVoList",
                repeatitems: false
            },
            colNames: colNames,
            colModel: JqGridColModel,
            sortable: false,
            rownumbers: true,
		    rowNum: -1,
			// rowList: [20, 50, 100, 200],
//            pager: options.pager,
            viewrecords: true,
            multiselect: true,
            width: "100%",
            height: $(window).height() * 0.44,
            autowidth: true,
            rownumWidth: 35, // the width of the row numbers columns
            shrinkToFit: false, //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
            ondblClickRow: function(id){
                //双击进入编辑
                var delid = id;
                
            },
            gridComplete: function(){
                var ids = $(options.TableName).jqGrid("getDataIDs");
            },
            loadComplete: function(data){
				$(options.TableName).jqGrid('resetSelection');
				if(data.result == 1){
					if(data.data.empVoList){
						for(var i = 0,len = data.data.empVoList.length;i < len;i ++){
							if(data.data.empVoList[i].checked){
								$(options.TableName).jqGrid('setSelection',data.data.empVoList[i].id);
							}
						}
					}
				} else {
					$.zxsaas_plus.showalert('warning',data.desc);
				}
            },
            loadError: function(xhr, status, error){
                //console.log(status)
            }
        })
    }

});

/*
    * save
    */
$(document).on('click', '.saveRoles ,.saveAdd', function(e){
    var chRowsIds = $(options.TableName).jqGrid('getGridParam', 'selarrrow');
    if (chRowsIds.length == 0) {
        chRowsIds = "";
    }
    $.ajax({
        url: '/manager/auth/role/saveAssignEmpRole',
        type: 'POST',
        data: {
            'roleId': $('.roleS option:checked').val(),
            'empIds': chRowsIds
        },
        traditional: true,
        success: function(data){
            if (data.result == 1) {
                $.zxsaas_plus.showalert('提示', data.desc);
            } else {
                $.zxsaas_plus.showalert('错误', data.desc);
            }
        }
    });
});

/*
 * toggle
 */
$(document).on('change', '#roleS', function(e){
    var roleId = $("#roleS").val();
    $(options.TableName).jqGrid('setGridParam',{
        datatype:'json',
        postData:{"roleId":roleId}
    }).trigger("reloadGrid"); //重新载入
});

//全选触发事件(新增)
$(document).on("click","#cb_jqGrid_roleMsgAdd",function(){
	   $(this).prop("checked")&&$("#jqGrid_roleMsgAdd").find("input[type=checkbox]").prop("checked",true);
	   $(this).prop("checked")||$("#jqGrid_roleMsgAdd").find("input[type=checkbox]").prop("checked",false);
});
//表格加载操作行全选
function checkRows(tbleId){
	  var ids= $("#"+tbleId).jqGrid('getDataIDs'); 
	  for(var i=0;i<ids.length;i++){
		  var notCk =$("#"+tbleId).find("#"+ids[i]).find("input.addCheck:not(:checked)").length;
		  $("#"+tbleId).resetSelection(ids[i]);
			 if(notCk<1){//行全部选中
				 $("#"+tbleId).setSelection(ids[i]);
			
			 }
	  }
		 selectAllRow(tbleId);
}

//单行全选
//addCheck
$(document).on("click",".addCheck",function(){
	var tr =$(this).parents("tr");
	 var notCk =$(tr).find("input.addCheck:not(:checked)").length;
	 var tbleId = $(this).parents("table").attr("id");
	 var trId =$(tr).attr("id");
	 $("#"+tbleId).resetSelection(trId);
	 if(notCk<1){//行全部选中
		 $("#"+tbleId).setSelection(trId);
		 selectAllRow(tbleId);
	 }
});
//行全选
function selectAllRow(tbleId){
    var selRow_len =$("#"+tbleId).jqGrid('getGridParam','selarrrow').length;
    var ids_len = $("#"+tbleId).jqGrid('getDataIDs').length; 
	if(ids_len>selRow_len){//非全选
		$("#cb_"+tbleId).prop("checked",false);
	}else{//全选
		$("#cb_"+tbleId).prop("checked",true);
	}
}


/*前端模态框调整勿动*/
$(window).resize(function(){
	var modal=$(".modal:visible");
	if(modal.length>0){resizeModal(modal);}
});

//模态框大小调整
/*新增模态框*/
$(document).on("shown.bs.modal","#myModal",function(){
	resizeModal(this);
	$("#jqGrid_roleMsgAdd").jqGrid('setGridWidth',$("#jqGrid_roleMsgAdd").parents(".jqGrid_wrap").width());
	$(this).find(".ui-jqgrid-bdiv").height($(this).find(".jqGrid_wrap").height()*0.76);
	frozenAdjust();
});

//冻结列调试样式
function frozenAdjust(){
	$("#myModal .ui-jqgrid-view .ui-jqgrid-bdiv>div").css({"height":"100%"});
	var top =$("#myModal .ui-jqgrid-hbox").height();
	var height=$("#myModal .ui-jqgrid-view .ui-jqgrid-bdiv>div").height();
	$("#myModal .frozen-bdiv").css({
		"top":top,
		"height":height
	});
	
}
/*角色关联人员*/
$(document).on("shown.bs.modal","#myModalRel",function(){
	$("#jqGrid_empMa").jqGrid('setGridWidth',$("#jqGrid_empMa").parents(".grid-wrap").width());
});

	

function resizeModal(modal){
	var  _width =$(window.parent).width()||$(window).width();//$(window.parent).width()||
	var  _height=$(window.parent).height()||$(window).height();//$(window.parent).height()||
	var modal_id=$(modal).attr("id");
	if(modal_id=="myModal"){
		if(_width<1200){
		    $("#"+modal_id).find(".modal-content").css({
			   "width":$(window).width()*0.85+"px",
			   "height":"auto",
			   "overflow-y":"hidden"
		    });
		    
		    $("#"+modal_id).find(".modal-body").css({
		    //	"height":$(window).height()*0.65+"px",
				"overflow":"auto"	
		    });
		}else if(_width<1400){
		    $("#"+modal_id).find(".modal-content").css({
			   "width":"842px",
			   "height":"auto",
			   "overflow-y":"hidden"	
		    });
		    $("#"+modal_id).find(".modal-body").css({
		    //	"height":$(window).height()*0.65+"px",
				"overflow":"auto"	
		    });
		    
		   // $("#myModal").find(".ui-jqgrid-bdiv").height($("#myModal").find(".modal-body").height()*0.5);
		   // console.log($("#myModal").find(".ui-jqgrid-bdiv").height()+"::::"+$("#myModal").find(".modal-body").height()*0.6);
		}else{
			 $("#"+modal_id).find(".modal-content").css({
				   "width":"1100px",
				   "height":"auto",
				   "overflow-y":"hidden"
			  });
			 $("#"+modal_id).find(".modal-body").css({
			    //	"height":$(window).height()*0.65+"px",
			    	"overflow":"auto"
			    });
		}
		$("#myModal").find(".ui-jqgrid-bdiv").height($("#myModal").find(".modal-body").height()*0.75);
		HorizontalMiddle(modal_id);//水平居中模态框
		frozenAdjust();//冻结列调整
	}
}		

function HorizontalMiddle(modal_id){
    var w =$(window).width();
    var modal_w=$("#"+modal_id+" .modal-content").width();
    if(w&&modal_w){
        var modal_l=(w-modal_w)/2;
        $("#"+modal_id+" .modal-dialog").css({"position":"absolute"});	
        $("#"+modal_id+" .modal-content").css({"position":"absolute","left":modal_l});	
    }
}
