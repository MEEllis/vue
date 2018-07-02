    //新增 、修改树
	(function(){
			//ztree
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
						//controll(treeNode.id);//通过id调用对应方法 重构表格
						
						//单击树节点动态加载相应内容
						$.ajax({
							type: 'Get',
				            url: '',
				            dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
				            success: function (data) {
				                
				                
				            },
				            error: function (msg) {
				                alert(" 数据加载失败！" + msg);
				            }
						});
					}
				},
				view: {
					showIcon: false
				},
				check: {
					enable: true,
					chkStyle: "checkbox",
					chkboxType: { "Y": "p", "N": "s" }
				}
		    }; 
			
			
			   function zTreeOnCheck(event, treeId, treeNode) {
				   var ids = [];//选中节点id的集合
//				    console.log(event + ',' + treeId + ',' + treeNode.tId + ", " + treeNode.name + "," + treeNode.checked);
				    if($('.add_tree_ids').val()!=""){
				    	ids=$('.add_tree_ids').val().split(",");
				    }
					var id = treeNode.id;//获取数据的Id
					if(treeNode.checked){
						ids.push(id);
					}else{
						for(var i = 0;i<ids.length;i++){
							(ids[i] == id) && (ids.splice(i,1));
						}
					}
					$('.add_tree_ids').val(ids);//ids存放于此
			 }; 
			 
			 // 权限开关
			 var flag = true;
			 // 默认是旧权限
			 var moduleTreeUrl = "../../authority/admin/selectModuleTree";
			 if(flag){
			 	 // 开启新权限
			 	 moduleTreeUrl = "../../auth/role/getModuleTreeList";
			 }
			 
			 $.ajax({
		            type: 'Get',
		            url: moduleTreeUrl,
					data:{
						"code" : "auth_company"
					},
		            dataType: "json",
		            success: function (data) {
		                $.fn.zTree.init($("#publicModelTree"), setting, data.data.moduleTree);
		                var str = $('#publicModelTree_1_switch').attr('class');
		                var Class = str.replace('roots','center');
		                $('#publicModelTree_1_switch').attr('class',Class);
		                var zTree = $.fn.zTree.getZTreeObj("publicModelTree");
		                zTree.expandAll(true);//展开全部节点
		            },
		            error: function (msg) {
		                alert(" 数据加载失败！" + msg);
		            }
		        });
		
		})();
	
	
$(function(){
	loadmodal();
});

function loadmodal(){
		var options = {
		LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
		LoadTableUrl: "../../authority/company/selectCompanyList",//查询集团信息接口地址
		deleteCompanyUrl: "../../authority/company/deleteCompany", // 删除信息接口地址
		resetAdminPwdUrl:"../../authority/company/resetAdminPwd",//重置管理员密码接口地址
		enableOrDisableCompanyUrl:"../../authority/company/enableOrDisableComapny",
		selectCompanyByIdUrl:"../../authority/company/selectCompanyById",
		subLoadTableUrl:"",//子级表格数据来源地址
		TableName: "#jqGrid_blocMessage", //显示表格名称。遵照css选择器书写
		iconJsonUrl:"../json/icon.json",
		btnbox: ".btnbox ",//功能按钮存放容器。遵照css选择器书写	
		pager:"#jqGridPager"
		};
		
			$.jgrid.defaults.width = 1280;
			$.jgrid.defaults.responsive = true;
			$.jgrid.defaults.styleUI = 'Bootstrap';	
			var lastsel='';//最后一次选中的行
			var rightClickColid="";//右键列id
			var rightClickColIndex=0;//右键index
			var mydata;
			var hid=false;
			var lock=false;
			var myobj=[];
			//var toggleflag=false;//冻结时候切换用
			var colNames = ['ID','公司编码','公司名称','管理员工号','重置管理员密码','是否禁用','备注','新增人','新增人id','新增时间','修改人','修改人id','修改时间','模板id'];
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
		//加载表格
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
			            rowNum: 20,
			            rowList: [20, 25, 40],
			            pager:options.pager,
			            viewrecords: true,		           
			            width: "100%" ,
			            height: $(window).height()*0.65,
			            multiselect:true,//定义是否可以多选
			            multiselectWidth:40,
						autowidth:true,
						rownumWidth: 35, // the width of the row numbers columns
						shrinkToFit:false,  //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
						beforeSelectRow : function(rowid, e) {
						  var check = $(e.target).is('input[type=checkbox]');
						  if (check) {
							$(options.TableName).jqGrid('setSelection', rowid);
						  }
						    return check;
					  },
						loadComplete:function(data){
							$(options.TableName).find('td').find(':checkbox').removeClass();
						 }
					 })
		
			}
			
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
	  
			//非集团信息查询按钮单击事件
			$(".row .btn-success").on('click',function(){
				var params={};
				params.code=$("#companyCode").val();
				params.name=$("#companyName").val();
				params.remark=$("#companyRemark").val();
				if($('#companyStatus').is(':checked')){
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
			
			//显示禁用单击事件
			$("#companyStatus").on('click',function(){
				showDisableClick("#companyStatus",options);
			});
			
			
			//批量删除
			$(document).on('click', '.btnDeleteRow',function(e){
				var checkedIdList = $(options.TableName).jqGrid('getGridParam','selarrrow');
				if(checkedIdList.length==0){
					$.zxsaas_plus.showalert("提示","请勾选记录后再删除!");
					return;
				}else{
					$.zxsaas_plus.showconfirm("提示","是否确定删除选中数据?",function(){
						$.ajax({
						    url:options.deleteCompanyUrl,
						    type: "POST",
						    data: {"checkedIdList": checkedIdList},
						    traditional: true,
						    success: function(data) {
						    	if(data.result==1){
						    		$.zxsaas_plus.showalert("提示",data.desc);
						    	}else{
						    		$.zxsaas_plus.showalert("错误",data.desc);
						    	}
						    	$(options.TableName).trigger("reloadGrid")
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
				//var id = $(this).data('id');
				var id=e.target.id;
				if(id==""){
					id=$("#id").val();
				}
				$.zxsaas_plus.showconfirm("提示","重置密码将用户密码设置为：123456<br />是否确定进行此操作",function(){
					$.ajax({
					    url:options.resetAdminPwdUrl,
					    type: "POST",
					    data: {"id": id},
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
			});
			
			//批量启用或禁用非集团信息
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
					$.ajax({
					    url:options.enableOrDisableCompanyUrl,
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
			
			//新增按钮单击事件
			$(".addCompany").click(function(e){
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
				
				$.ajax({
				    url:options.selectCompanyByIdUrl,
				    data: {"id": id},
				    type: "POST",
				    success: function(data) {
				    	if(data.result==1){
				    		$("#saveAndAddSpan").html("");
				    		$("#spanAdminPwd").html("");
				    		if(btnId=="add"){
				    			appendSelectOption(data.data.areaList,data.data.companyDataList,null);
								resetCompanyValue();
							}
				    		if(btnId=="update"){
				    			appendSelectOption(data.data.areaList,data.data.companyDataList,data.data.companyManage);
				    			setCompanyValue(data.data.companyManage);
				    			 //功能启用树节点默认选中
								 getModuleTreeChecked("publicModelTree",data.data.companyModuleRelList);
				    		}
				    		$("#myModal").modal("show");
				    	}
				    }
				});
			});
}

//保存公司信息
function saveCompany(btnId){
	var moduleTypeIds=$(".add_tree_ids").val();//功能启用模块id
	var id=$("#id").val();
	var code=$("#code").val().trim();
	var name=$("#name").val().trim();
	var checkNullResult=checkNullColumn(code,name);
	if(checkNullResult){
		return;
	}
	
	
	var params=getSaveParams(moduleTypeIds,id,code,name);
	$.ajax({
		type : 'POST',  
		contentType :'application/json', 
		url:'../../authority/company/saveCompany',
		async:false,
		data:JSON.stringify(params),
		success:function(data){
		  if(data.result==1){
			  $.zxsaas_plus.showalert("提示",data.desc);
			  if(btnId=="saveAndAdd"){
				  $("#saveCompanyForm")[0].reset();
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

//检验保存参数是否为空等信息
function checkNullColumn(code,name){
	var flag=false;
	if(code==""){
		$("#code").next().html('信息不能为空!');
		$("#code").css({'borderColor':'red','opacity':'0.5'});
		$("#code").next().css({'color':'red'});
		flag=true;
		return flag;
	}
	if(name==""){
		$("#name").next().html('信息不能为空!');
		$("#name").css({'borderColor':'red','opacity':'0.5'});
		$("#name").next().css({'color':'red'});
		flag=true;
		return flag;
	}
	return flag;
}

//获取保存参数，组装成json对象
function getSaveParams(moduleTypeIds,id,code,name){
	var params={};
	params.moduleTypeIds=moduleTypeIds;
	params.id=id;
	params.code=code;
	params.name=name;
	params.remark=$("#remark").val();
	params.areaId=$("#areaSelect").val();
	params.companyDataTypeCode=$("#companyDataSelect").val();
	params.companyDataValueCode=$("#companyDataSelect").find("option:selected").text();
	if($('#status').is(':checked')){
		params.status=1;
	}else{
		params.status=0;
	}
	var adminLogin=$("#adminLogin").val();
	var adminPwd=$("#adminPwd").val();
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

//清空文本框值
function resetCompanyValue(){
	$("#myModalLabel").html("公司信息新增");
	$("#spanAdminPwd").append("<input type='text' id='adminPwd' />");
	$("#saveAndAddSpan").append('<button type="button" class="btn btn-success" id="saveAndAdd" onclick="saveCompany(this.id);">保存并新增</button>');
	$("#saveCompanyForm")[0].reset();
}

//设置文本框的值
function setCompanyValue(companyManage){
	$("#myModalLabel").html("公司信息修改");
	$("#spanAdminPwd").append("<span class='rePwd'  style='color:#00CCFF;cursor:pointer' >重置密码</span>");
	$("#id").val(companyManage.id);
	$("#code").val(companyManage.code);
	$("#name").val(companyManage.name);
	$("#remark").val(companyManage.remark);
	$("#adminLogin").val(companyManage.adminLogin);
	if(companyManage.status==1){
		$("#status").attr("checked",true);
	}
}

//拼接区域名称、分期商名称下拉框
function appendSelectOption(areaList,companyDataList,companyObj){
	$("#areaSelect").html("");
	$("#companyDataSelect").html("");
	for(var i=0;i<areaList.length;i++){
		if(companyObj!=null && companyObj.areaId==areaList[i].id){
			$("#areaSelect").append("<option selected='selected' value='"+areaList[i].id+"'>"+areaList[i].name+"</option>")
		}else{
			$("#areaSelect").append("<option value='"+areaList[i].id+"'>"+areaList[i].name+"</option>")
		}
		
	}
	for(var i=0;i<companyDataList.length;i++){
		if(companyObj!=null && companyObj.companyDataValueCode==areaList[i].content1){
			$("#companyDataSelect").append("<option selected='selected' value='"+companyDataList[i].typeCode+"'>"+companyDataList[i].content1+"</option>")
		}else{
			$("#companyDataSelect").append("<option value='"+companyDataList[i].typeCode+"'>"+companyDataList[i].content1+"</option>")
		}
	}
}

//仅关闭按钮单击事件
function closeOnly(){
	history.go(0);
}

$("#code").focus(function(e){
	$(this).next().html('');
	$(this).css({'borderColor':''});
});

$("#name").focus(function(e){
	$(this).next().html('');
	$(this).css({'borderColor':''});
});
