$(function(){
	loadmodal();
	initTree();
	initTime();
});

// 权限开关
var flag = true;

function initTime(){
	$("input[name='groupOpeningDate']").val($.DateFormat(new Date(),"yyyy-MM-dd"));
	$("#groupOpeningDate").datetimepicker( {
		lang : "ch", // 语言选择中文
		format : "Y-m-d", // 格式化日期
		timepicker : false, // 关闭时间选项
		todayButton : false// 关闭选择今天按钮
	});
	
	$("input[name='endDate']").val($.DateFormat(new Date(),"yyyy-MM-dd"));
	$("#endDate").datetimepicker( {
		lang : "ch", // 语言选择中文
		format : "Y-m-d", // 格式化日期
		timepicker : false, // 关闭时间选项
		todayButton : false// 关闭选择今天按钮
	});
}

function initTree(groupId){
	var setting = {  
        data: {
			simpleData: flag ? {enable: true,idKey: "id",pIdKey: "pid",rootPId: null} : {enable: true,idKey: "treeNodeId",pIdKey: "pId",rootPId: null}
		},
//		callback: {
//			onCheck:zTreeOnCheck
//		},
		view: {
			showIcon: false
		},
		check: {
			enable: true,
			chkStyle: "checkbox",
			chkboxType: { "Y": "ps", "N": "ps" }
		}
    }; 
    
//	   function zTreeOnCheck(event, treeId, treeNode) {
//			var ids = [];//选中节点id的集合
//		    if($('.add_tree_ids').val()!=""){
//		    	ids=$('.add_tree_ids').val().split(",");
//		    }
//			var id = flag ? treeNode.id : treeNode.treeNodeId;//获取数据的Id
//			if(treeNode.checked){
//				ids.push(id);
//			}else{
//				for(var i = 0;i<ids.length;i++){
//					(ids[i] == id) && (ids.splice(i,1));
//				}
//			}
//			$('.add_tree_ids').val(ids);//ids存放于此
//	 }; 
	 
	 

	 // 默认是旧权限
	 var moduleTreeUrl = "../../authority/admin/selectModuleTree";
	 if(flag){
	 	 // 开启新权限
	 	 moduleTreeUrl = "../../auth/role/getModuleTreeList" + (groupId ? "?groupId=" + groupId : "");
	 }
	 $.request({
            type: 'POST',
            url: moduleTreeUrl,
			data:{
				"code" : "auth_group"
			},
            dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
            success: function (data) {
                $.fn.zTree.init($("#publicModelTree"), setting, data.data.moduleTree);
                var str = $('#publicModelTree_1_switch').attr('class');
                var Class = str.replace('roots','center');
                $('#publicModelTree_1_switch').attr('class',Class);
                var zTree = $.fn.zTree.getZTreeObj("publicModelTree");
                zTree.expandAll(true);//展开全部节点
            }
        });
}



function loadmodal(){
		var options = {
		LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
		iconJsonUrl:"../json/icon.json",
		TableName: "#jqGrid_blocMessage", //显示表格名称。遵照css选择器书写
		LoadTableUrl: "../../authority/group/selectGroupList",//查询集团信息接口地址
		deleteGroupUrl:"../../authority/group/deleteGroup",//删除集团信息接口地址
		resetAdminPwdUrl:"../../authority/group/resetAdminPwd",//重置管理员密码接口地址
		enableOrDisableGroupUrl:"../../authority/group/enableOrDisableGroup",
		selectGroupByIdUrl:"../../authority/group/selectGroupById",
		btnbox: ".btnbox ",//功能按钮存放容器。遵照css选择器书写	
		pager:"#jqGridPager"
		};
		
			$.jgrid.defaults.responsive = true;
			$.jgrid.defaults.styleUI = 'Bootstrap';	
			var lastsel='';//最后一次选中的行
			var rightClickColid="";//右键列id
			var rightClickColIndex=0;//右键index
			var mydata;
			var hid=false;
			var lock=false;
			var myobj=[];
			var colNames = ['ID','集团编码','集团名称','管理员工号','重置管理员密码','是否禁用','备注','新增人','新增人id','新增时间','修改人','修改人id','修改时间','模板id'];
			var JqGridColModel=[
								{name:'id',index:'id', width:50,align:'center', sorttype:'string',hidden:true, key: true,sortable:false},
								{name:'code',index:'code', width:200,align:'center', sorttype:'String',sortable:false},
								{name:'name',index:'name', width:200,align:'center', sorttype:'string',sortable:false},
								{name:'adminLogin',index:'adminLogin', width:150,align:'center', sorttype:'string',sortable:false},
								{name:'adminPwd',index:'adminPwd', width:150,align:'center', sorttype:"string",formatter:rePwd,sortable:false},
								{name:'status',index:'status', width:100,align:'center',formatter:formatStatus,sortable:false},
								{name:'remark',index:'remark', width:100,align:'center',  sorttype:'string',sortable:false},
								{name:'createUName',index:'createUName', width:100,align:'center',  sorttype:'string',sortable:false},
								{name:'createId',index:'createId', width:100,align:'center',  sorttype:'Long',hidden:true,sortable:false},
								{name:'createTime',index:'createTime', width:200,align:'center',sorttype:'string',sortable:false},
								{name:'updateUName',index:'updateUName', width:100,align:'center',  sorttype:'string',sortable:false},
								{name:'updateId',index:'updateId', width:100,align:'center',  sorttype:'Long',hidden:true,sortable:false},
								{name:'updateTime',index:'updateTime', width:200,align:'center', sorttype:'string',sortable:false},
								{name:'templetId',index:'templetId', width:100,align:'center',  sorttype:'Long',hidden:true,sortable:false}
			                ];
			loadtable();
			function loadtable(){
					$(options.TableName).jqGrid({
						url:options.LoadTableUrl,
						mtype:"POST",
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
			            rownumWidth:50,
			            rowNum: 20,
			            rowList: [20, 25, 40],
			            pager:options.pager,
			            viewrecords: true,		           
			            width: "90%" ,
			            height: $(window).height()*0.65,
			            multiselect:true,//定义是否可以多选
			            multiselectWidth:50,
						autowidth:true,
						shrinkToFit:true,  //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
						beforeSelectRow: function(rowid, e) { 
							var check=$(e.target).is('input[type=checkbox]');
							if(check){
								$(options.TableName).jqGrid('setSelection',rowid);
							}
							return check;
						},
						gridComplete:function(data){
							$(".ui-paging-pager tr:first td:last").html("");
							$(options.TableName).closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
						},
						loadComplete:function(data){
							$(options.TableName).find('td').find(':checkbox').removeClass();
						}
					})
			}
			jQuery(options.TableName).jqGrid('setLabel',0, '序号');
			//列表    重置密码
			function rePwd(cellvalue, options, rowObjec){
			    if(rowObjec.adminLogin=="" || rowObjec.adminLogin==null){
			    	return "";
			    }else{
			    	return '<span class="rePwd" id="'+rowObjec.id+'" data-blocId="' + rowObjec.id + '" data-id="' + options.rowId + '" style="color:#00CCFF;cursor:pointer">重置密码</span>';
			    }
			}
			
			//格式禁用、启用
			function formatStatus(cellvalue, options, rowObjec){
				return cellvalue == 1?"√":"";
			}
			
			//集团信息查询按钮单击事件
			$(".row .btn-success").on('click',function(){
				var params={};
				params.code=$("#groupCode").val();
				params.name=$("#groupName").val();
				params.remark=$("#groupRemark").val();
				if($('#groupStatus').is(':checked')){
					params.status=1;
				}else{
					params.status=0;
				}
				$(options.TableName).jqGrid('setGridParam',{  
			        datatype:'json',  
			        postData:params, //发送数据  
			        page:1  
			    }).trigger("reloadGrid"); //重新载入
			});
			
			//显示禁用checkbox单击事件
			$("#groupStatus").on('click',function(){
				showDisableClick("#groupStatus",options);
			});
			
			//批量删除
			$(document).on('click', '.btnDeleteRow',function(e){
				var checkedIdList = $(options.TableName).jqGrid('getGridParam','selarrrow');
				if(checkedIdList.length==0){
					$.zxsaas_plus.showalert("提示","请勾选集团后再删除!");
					return;
				}else{
					$.zxsaas_plus.showconfirm("提示","是否确定删除选中数据?",function(){
						$.request({
						    url:options.deleteGroupUrl,
						    type: "POST",
						    data: {"checkedIdList": checkedIdList},
						    traditional: true,
						    success: function(data) {
						    	if(data.result==1){
						    		$.zxsaas_plus.showalert("提示",data.desc);
						    		if(data.data.flag!=undefined && data.data.flag){
						    			
						    		}else{
						    			$(options.TableName).trigger("reloadGrid")
						    		}
						    	}
						    }
						});
					},function(){
						$(options.TableName).jqGrid('setGridParam',{  
					        datatype:'json',  
					        traditional: true,
					        postData:{"checkedIdList":checkedIdList}, //发送数据  
					        page:1  
					    }).trigger("reloadGrid"); //重新载入
					});
				}
			});
			
			//重置密码
			$(document).on('click','.rePwd',function(e){
				resetPassword(e,options);
			});
			
			//批量启用或禁用集团信息
			$(document).on('click', '.enableOrDisable',function(e){
				var id=e.target.id;
				var checkedIdList= $(options.TableName).jqGrid('getGridParam','selarrrow');//获取选中行的id
				if(checkedIdList.length==0){
					if(id==1){
						$.zxsaas_plus.showalert("提示","请勾选集团后再禁用!");
					}else{
						$.zxsaas_plus.showalert("提示","请勾选集团后再启用!");
					}
					return;
				}else{
					$.request({
					    url:options.enableOrDisableGroupUrl,
					    type: "POST",
					    data: {"checkedIdList": checkedIdList,"status":id},
					    traditional: true,
					    success: function(data) {
					    	if(data.result==1){
					    		$.zxsaas_plus.showalert("提示",data.desc);
					    	}else{
					    		$.zxsaas_plus.showalert("错误",data.desc);
					    	}
					    	$(options.TableName).trigger("reloadGrid");
					    }
					});
				}
			});

			//新增或修改弹出模态框
			$(".addGroup").click(function(e){
				$("#code").next().html('');
				$("#name").next().html('');
				$(".add_tree_ids").val("");
				 var zTree = $.fn.zTree.getZTreeObj("publicModelTree");
				 zTree.checkAllNodes(false);
				var btnId=e.target.id;
				var id="";
				if(btnId=="update"){
					var checkdId= $(options.TableName).jqGrid('getGridParam','selarrrow');//获取选中行的id
					id=checkdId[0];
					if(checkdId.length!=1){
						if(checkdId.length == 0){
							$.zxsaas_plus.showalert("提示","请选择一条信息修改!");
							return;
						}
						$.zxsaas_plus.showalert("提示","一次只能修改一条信息!");
						return;
					}
				}
				$.request({
					type : 'POST',  
					url:options.selectGroupByIdUrl,
					async:false,
					data: {"id": id},
					success:function(data){
					  $("#spanAdminPwd").html("");
					  if(data.result==1){
						  $("#saveAndAddSpan").html("");
						  groupParamsSettting(data.data.tgroupManage,data.data.tradeList);
						  if(btnId=="update"){
							  $("#addSpan").html("");
							  setGroupValue(data.data.tgroupManage,data.data.templete);
                              
                              if (flag) {
                              	initTree(id);
                              } else {
                                  //功能启用树节点默认选中
                                getmoduletreechecked("publicmodeltree", data.data.groupmodulerellist);
                              }
						  }
						  if(btnId=="add"){
							  initTree();
							  resetGroupValue();
							  initTime();
						  }
						  $('#myModal').modal('show');
					  }else{
						  $.zxsaas_plus.showalert("提示","服务器出错,请稍后重试!");
					  }
				    }
				});
			});	
			
			//集团参数设置
			function groupParamsSettting(tgroupManage,tradeList){
				$("#tradeId").html("");
				if(tradeList.length>0){
					$("#tradeId").append("<option value=''>请选择</option>");
					$.each(tradeList,function(i,value){
						if(tgroupManage!=undefined && tgroupManage.tradeId!=null && tgroupManage.tradeId==value.id){
							$("#tradeId").append("<option value='"+value.id+"' selected='selected'>"+value.tradeName+"</option>");
						}else{
							$("#tradeId").append("<option value='"+value.id+"'>"+value.tradeName+"</option>");
						}
					});
				}
			}
			
			
			//清空文本框的值
			function resetGroupValue(){
				$("#myModalLabel").html("集团信息新增");
				$("#spanAdminPwd").append("<input type='text' id='adminPwd' class='.rePwd' readonly='readonly' value='123456'/>");
				$("#saveAndAddSpan").append('<button type="button" class="btn btn-success" id="saveAndAdd" onclick="saveGroup(this.id);">保存并新增</button>');
				$("#saveGroupForm")[0].reset();
				
				$("#saveGroupForm input[name='code']").removeAttr("readonly");
				$('#tradeId').removeAttr("disabled");
				$("#saveGroupForm input[name='groupOpeningDate']").removeAttr("readonly");
			}
			
			
			
			//设置修改的原始值
			function setGroupValue(tgroupManage,template){
				$("#myModalLabel").html("集团信息修改");
				$("#saveGroupForm").writeJson2Dom(tgroupManage);
				
				if(tgroupManage.endDate){
				      var birth = new Date(tgroupManage.endDate);
				      $("#endDate").val(format(birth.getTime(), 'yyyy-MM-dd'));//出生日期
				      }else{
				    	  $("#endDate").val("");
				      }
				$("#saveGroupForm input[name='code']").attr("readonly","readonly");
				$('#tradeId').attr("disabled","disabled");
				$("#saveGroupForm input[name='groupOpeningDate']").attr("readonly","readonly");
				if(tgroupManage.status==1){
					$("#status").attr("checked",true);
				}
				$("#spanAdminPwd").append("<span class='rePwd'  style='color:#00CCFF;cursor:pointer' >重置密码</span>");
			}
}

/**
 * 获取选中功能id
 * @param {Object} treeId
 */
function getCheckedNodeIds(treeId){
    var treeObj = $.fn.zTree.getZTreeObj(treeId);
    var nodes = treeObj.getCheckedNodes(true);
    var v = "";
    for (var i = 0; i < nodes.length; i++) {
        v += "," + (flag ? nodes[i].id : nodes[i].treeNodeId);
    }
    return v.length > 0 ? v.substring(1) : "";
}


//保存集团信息
function saveGroup(btnId){
	var moduleTypeIds=getCheckedNodeIds("publicModelTree");
//	var moduleTypeIds=$(".add_tree_ids").val();//功能启用模块id
	var id=$("#id").val();
	var code=$("#code").val().trim();
	var name=$("#name").val().trim();
	var remark=$("#remark").val().trim();
	var adminLogin=$("#adminLogin").val().trim();
	var adminPwd=$("#adminPwd").val();
	if(adminPwd!=undefined){
		adminPwd=adminPwd.trim();
	}
	var checkParamsResult=checkGroupParams(code,name,adminLogin,adminPwd,remark);
	if(checkParamsResult){
		//校验集团编码重复问题
		var checkCodeResult=judge(checkParamsResult,code);
		if(checkCodeResult){//保存集团信息
			var params=getSaveParams(moduleTypeIds,id,code,name,adminLogin,adminPwd);
			$.request({
				type : 'POST',  
				contentType :'application/json', 
				url:'../../authority/group/saveGroup',
				async:false,
				data:JSON.stringify(params),
				success:function(data){
				  if(data.result==1){
					  $.zxsaas_plus.showalert("提示",data.desc);
					  if(btnId=="saveAndAdd"){
						  $("#saveGroupForm")[0].reset();
					  }else{
						  $('#myModal').modal('hide');
						  $("#jqGrid_blocMessage").trigger("reloadGrid");
					  }
				  }else{
					  $.zxsaas_plus.showalert("错误","服务器出错，请稍后重试");
				  }
			    }
			});
		}
	}
}


//校验集团重复问题
function judge(checkParamsResult,code){
	var id=$("#id").val();
		$.request({
			type : 'GET',  
			contentType :'application/json', 
			async: false,
			url:'../../authority/group/countGroupByCode',
			data:{"code":code,"id":id},
			success:function(data){
				if((data.data.count!=0 && (id=="" || id==undefined || id==null)) || (id !=null && data.data.count>=1)){//集团编码重复
					$("#code").next().html('该编码已存在!');
					$("#code").next().css({'color':'red'});
					checkParamsResult=false;
				}
		    }
		});
	
	return checkParamsResult;
}


//获取保存参数，组装成json对象
function getSaveParams(moduleTypeIds,id,code,name,adminLogin,adminPwd){
	var params={};
	params.moduleTypeIds=moduleTypeIds;
	params.id=id;
	params.code=code;
	params.name=name;
	params.remark=$("#remark").val();
	params.tradeId=$("#tradeId").val();
	params.groupOpeningDate=$("#groupOpeningDate").val();
	params.onlineCount=$("#onlineCount").val();
	params.endDate = $("#endDate").val();
	if($('#status').is(':checked')){
		params.status=1;
	}else{
		params.status=0;
	}
	if(adminLogin!=""){
		params.adminLogin=adminLogin;
		if(adminPwd==""){
			params.adminPwd="123456";
		}else{
			params.adminPwd=adminPwd;
		}
	}
	return params;
}

//检验保存参数是否为空等信息
function checkGroupParams(code,name,adminLogin,adminPwd,remark){
	var flag=true;
	if(code==""){
		$("#code").next().html('必填!');
		$("#code").next().css({'color':'red'});
		flag=false;
		return flag;
	}
	if(name==""){
		$("#name").next().html('必填!');
		$("#name").next().css({'color':'red'});
		flag=false;
		return flag;
	}
	if(remark.length > 256){
		$("#remark").next().html('至多256个字符!');
		$("#remark").next().css({'color':'red'});
		flag=false;
		return flag;
	}
	
	if($("#tradeId").val()==""){
		$("#tradeId").next().html('必填!');
		$("#tradeId").next().css({'color':'red'});
		flag=false;
		return flag;
	}
	
	var reg = /^\+?[1-9]\d*$/;
	if(!reg.test($("#onlineCount").val())){
		$("#onlineCount").next().html('请输入正整数!');
		$("#onlineCount").next().css({'color':'red'});
		flag=false;
		return flag;
      }
	
	if($("#endDate").val()==""){
		$("#endDate").next().html('必填!');
		$("#endDate").next().css({'color':'red'});
		flag=false;
		return flag;
	}
	return flag;
}

$("#code").focus(function(e){
	$(this).next().html('');
	$(this).css({'borderColor':''});
});

$("#tradeId").focus(function(e){
	$(this).next().html('');
	$(this).css({'borderColor':''});
});

$("#code").blur(function(e){
	if($("#code").val().trim()!=""){
		$("#adminLogin").val($("#code").val()+"gadmin");
	}
});

$("#code").keydown(function(e){
	$("#adminLogin").val($("#code").val()+"gadmin");
});

$("#name").focus(function(e){
	$(this).next().html('');
	$(this).css({'borderColor':''});
});

$("#remark").focus(function(e){
	$(this).next().html('');
	$(this).css({'borderColor':''});
});

$("#onlineCount").focus(function(e){
	$(this).next().html('');
	$(this).css({'borderColor':''});
});

$("#endDate").focus(function(e){
	$(this).next().html('');
	$(this).css({'borderColor':''});
});

$("#adminLogin").focus(function(e){
	$(this).next().html('');
	$(this).css({'borderColor':''});
});

function resetPwdTip(){
	$("#adminPwdTip").html('');
}

function closeOnly(){
	 $("#jqGrid_blocMessage").trigger("reloadGrid");
}

$(".close").click(function(){
	 $("#jqGrid_blocMessage").trigger("reloadGrid");
});

var format = function(time, format){
    var t = new Date(time);
    var tf = function(i){return (i < 10 ? '0' : '') + i};
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a){
    switch(a){
        case 'yyyy':
            return tf(t.getFullYear());
            break;
        case 'MM':
            return tf(t.getMonth() + 1);
            break;
        case 'mm':
            return tf(t.getMinutes());
            break;
        case 'dd':
            return tf(t.getDate());
            break;
        case 'HH':
            return tf(t.getHours());
            break;
        case 'ss':
            return tf(t.getSeconds());
            break;
    }
})
}