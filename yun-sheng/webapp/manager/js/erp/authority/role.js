(function(){
	//修改初始化标志
	var initial_modify=true;
	//数据授权标志
	var sjsqStatus=true;
	//显示初始化标志
	var initshow=true;
	//判断是否点击树
	var treeModuleId=-1;
	
	
	$(function(){
		// 先禁用按钮
		$(".btn-group button").prop("disabled",true);
		initTree();
	});
	var funType=null;
	var moduleId;
	var opTypeName;
	var status="1";
	var updateRoleId=0;
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
				    return;
				}
			},
			view: {
				showIcon: false
			}
	    }; 
		$.ajax({
	        type: 'Get',
	        url: "/manager/authority/roleInfo/selectRoleList",
	        data : {"funType" : funType,"status":status},
	        dataType: "json",
	        success: function (data) {
		       $.fn.zTree.init($("#metaDataTree"), setting, data.data.rows);
	           var str = $('#metaDataTree_1_switch').attr('class');
	           var Class = str.replace('roots','center');
	           $('#metaDataTree_1_switch').attr('class',Class);
	           appendRoleSelect(data.data.roleList);//拼接角色下拉列表
	           RoleSelect(data.data.roleList);
	           var roleId=0;
			   if (data.data.roleList) {
			   	if (data.data.roleList.length > 0) {
			   		roleId = data.data.roleList[0].id
			   	}
			   }
	           initRoleTable("#jqGrid_metaData",data.data.funList,data.data.topList,data.data.authorityDetailList,roleId); 
	        },
	        error: function (msg) {
	          
	        }
	    });
	}

//更改角色初始化表格
//	function chanageRole(){
//		$.ajax({
//	        type: 'Get',
//	        url: "/manager/authority/roleInfo/selectRoleList",
//	        data : {"funType" : funType,"status":status},
//	        dataType: "json",
//	        success: function (data) {
//	           initRoleTable("#jqGrid_metaData",data.data.funList,data.data.topList,data.data.authorityDetailList,$("#roleSelect").val()); 
//	        },
//	        error: function (msg) {
//	          
//	        }
//	    });
//	}
	
	
	
	function controllRoleTableByTreeNode(treeNode){
		if(treeNode.pId!=null && treeNode.id!=null){
			moduleId=treeNode.pId;
			opTypeName=treeNode.name;
		}else{
			moduleId=treeNode.id;
			opTypeName=null
		}
	    var roleId=$("#roleSelect").val();
		$("#jqGrid_metaData").jqGrid('setGridParam',{  
	        datatype:'json',
	        postData:{"moduleId":moduleId,"opTypeName":opTypeName,"funType":funType,"status":1}
	    }).trigger("reloadGrid"); //重新载入
	}


	//初始页面数据操作授权点击事件
	$(".shou-checkbox").click(function(){
		var id = $("#roleSelect").val();
		var hasCheck = $('.shou-checkbox').is(':checked');
		if (hasCheck) {
			funType = 1;
		} else {
			funType = null;
		}
		$t = $("<table id='jqGrid_metaData'></table>");
		$("#jqwrap").empty().html($t);
		//jQuery('.jqGrid_wrap').GridUnload(); 
		$.ajax( {
		type : 'Get',
			url : "/manager/authority/roleInfo/selectRoleList",
			data : {"funType" : funType,"moduleId" : moduleId,"opTypeName" : opTypeName,"status":1},
			dataType : "json",
			success : function(data) {
				initRoleTable("#jqGrid_metaData", data.data.funList,data.data.topList, data.data.authorityDetailList, id);
			}
	});
	});
	
	//新增数据操作授权点击事件
	$(".shou-checkbox-add").click(function(){
		var id = $("#roleSelect").val();
		var hasCheck = $('.shou-checkbox-add').is(':checked');
		if (hasCheck) {
			funType = 1;
		} else {
			funType = null;
		}
		$t = $("<table id='jqGrid_roleMsgAdd'></table>");
		$("#add_jqwrap").empty().html($t);
		//jQuery('.jqGrid_wrap').GridUnload(); 
		$.ajax( {
		type : 'Get',
			url : "/manager/authority/roleInfo/selectRoleList",
			data : {"funType" : funType,"moduleId" : moduleId,"opTypeName" : opTypeName,"status":1},
			dataType : "json",
			success : function(data) {
				initAddRoleTable("#jqGrid_roleMsgAdd",data.data.funList,data.data.topList,data.data.grantedFun);
			}
	});
	});
	
	//修改数据操作授权点击事件
	$(".shou-checkbox-update").click(function(){
		var id = $("#roleSelect").val();
		var hasCheck = $('.shou-checkbox-update').is(':checked');
		if (hasCheck) {
			funType = 1;
		} else {
			funType = null;
		}
		sjsqStatus=false;
		$t = $("<table id='jqGrid_roleMsgUpdate'></table>");
		$("#update_jqwrap").empty().html($t);
		//jQuery('.jqGrid_wrap').GridUnload(); 
		$.ajax( {
		type : 'Get',
			url : "/manager/authority/roleInfo/selectRoleList",
			data : {"funType" : funType,"moduleId" : moduleId,"opTypeName" : opTypeName,"status":1,"roleId":$("#roleSelect").val()},
			dataType : "json",
			success : function(data) {
				  drawUpdateRoleTable("#jqGrid_roleMsgUpdate",data.data.funList,data.data.topList,data.data.authorityDetailList,data.data.grantedFun);
			}
	});
		
	});
	
	
	//初始化、加载内置角色表格详情表格
	function reloadRoleTable2() {
		
//		alert(id);
//		$.ajax( {
//			type : 'Get',
//			url : "/manager/authority/roleInfo/selectRoleList",
//			data : {"funType" : funType,"moduleId" : moduleId,"opTypeName" : opTypeName,"status":1},
//			dataType : "json",
//			success : function(data) {
//				//initRoleTable("#jqGrid_metaData", data.data.funList,data.data.topList, data.data.authorityDetailList, id);
//			      
//			}
//		});
	
		$("#jqGrid_metaData").jqGrid('setGridParam',{  
	        datatype:'json',
	        postData:{"moduleId":moduleId,"opTypeName":opTypeName,"funType":funType,"status":1}
	    }).trigger("reloadGrid"); //重新载入
	}


	$.jgrid.defaults.styleUI = 'Bootstrap';	
	function initRoleTable(tableId,funList,topList,authorityDetailList,roleId){
		var colNames=[];//表头
		colNames.push("id");	
		colNames.push("操作名称");	
		
		var JqGridColModel=[];//参数
		JqGridColModel.push({name:'id',width:100,align:'center',sorttype:'string',hidden:true});
		JqGridColModel.push({name:'name',width:100,align:'center',sorttype:'string'});//操作名称（name对应接口的name）
		
		for(var i=0;i<funList.length;i++){
			 colNames.push(funList[i].name);//查询。。。。
			 var obj={};
			 obj.name=funList[i].name;
			 obj.width=100;
			 obj.align='center';
			 JqGridColModel.push(obj);
		}
		$(tableId).jqGrid({
			url:"/manager/authority/roleInfo/selectRoleList",
			mtype:"GET",
			datatype: "json",
			jsonReader  : {	
				root: "data.topList",
				repeatitems: false
			},
		 	cellEdit:true,
		 	cellsubmit: 'clientArray',//单元格保存内容的位置	
		    editurl: 'clientArray',
			colNames:colNames,          
	        colModel:JqGridColModel,
	        sortable:false,			            
	        rownumbers:true,
	        rowNum:-1,
	       // rowList: [20, 25, 40],
	        //pager:options.pager,
	        viewrecords: true,		       
	        width: "100%" ,
	        height: $(window).height()*0.65,
			autowidth:true,
			rownumWidth: 35, // the width of the row numbers columns
			shrinkToFit:false,  //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
			//multiselect:true,
		//multiboxonly:true,
			//multiselectWidth:38,
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
				if(initshow==false){
					authorityDetailList=data.data.authorityDetailList;
				}
			    if(authorityDetailList.length>0){
			    	var dataA=[];
			    	dataA=authorityDetailList;
				    for(var i=0;i<dataA.length;i++){
				       if(dataA[i].roleId==$("#roleSelect>option:selected").val()){
				    	   $(tableId).setCell(dataA[i].opId,dataA[i].funName,"√");  
				       }
				    }
			    }
			    initshow=true;
			   // 启用左上角按钮
			   $(".btn-group button").prop("disabled",false);
			},
			//resizeStop: grid_setAutoWidth,
			loadError:function(xhr,status,error){
		             
			}
			})
		
		
	}

	//拼接角色下拉列表
	function appendRoleSelect(roleList){
		$("#roleSelect").html("");
		for(var i=0;i<roleList.length;i++){
			$("#roleSelect").append("<option value='"+roleList[i].id+"'>"+roleList[i].name+"</option>");
		}
	}

	//角色关联
	function RoleSelect(roleList){
		$("#roleS").html("");
		for(var i=0;i<roleList.length;i++){
			$("#roleS").append("<option value='"+roleList[i].id+"'>"+roleList[i].name+"</option>");
		}
	}

	//选中角色下拉框change事件
	$("#roleSelect").change(function(){
		reloadRoleTable2();
	});
	/******************************************************************新增操作开始*********************************************/
	$(document).on("click",".addNew",addRole);
	//新增内置角色信息按钮单击事件
	function addRole(){
		//jQuery("#jqGrid_roleMsgAdd").jqGrid("clearGridData");
		$("#myModal").find(".jqGrid_wrap").html('<table id="jqGrid_roleMsgAdd" class="zxsaastable ui-jqgrid-btable ui-common-table table table-bordered" style="text-align:center;"></table><div id="gridpager"></div>');
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
			 $.ajax({
		            type: 'Get',
		            url: "/manager/authority/roleInfo/selectRoleList",
		            data:{"funType":funType},
		            dataType: "json",
		            success: function (data) {
		                $.fn.zTree.init($("#roleDataTree"), setting, data.data.rows);
		                var str = $('#roleDataTree_1_switch').attr('class');
		                var Class = str.replace('roots','center');
		                $('#roleDataTree_1_switch').attr('class',Class);
		                initAddRoleTable("#jqGrid_roleMsgAdd",data.data.funList,data.data.topList,data.data.grantedFun);
		                $(".shou-checkbox-add").attr("checked",false);
		                $("#myModal").modal("show");
		            },
		            error: function (msg) {
		               
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
			opTypeName=null
		}
		var roleId=$("#roleSelect").val();
		$("#jqGrid_roleMsgAdd").jqGrid('setGridParam',{  
	        datatype:'json',
	        postData:{"moduleId":moduleId,"opTypeName":opTypeName,"funType":funType,"status":1}
	    }).trigger("reloadGrid"); //重新载入
	}


    function initAddRoleTable(tableId,funList,topList,grantedFun){
		var colNames=[];//表头
		colNames.push("id");	
		colNames.push("操作名称");	
		
		var JqGridColModel=[];//参数
		JqGridColModel.push({name:'id',width:100,align:'center',sorttype:'string',hidden:true});
		JqGridColModel.push({name:'name',width:100,align:'center',sorttype:'string'});//操作名称（name对应接口的name）
		
		for(var i=0;i<funList.length;i++){
			 colNames.push(funList[i].name);//查询。。。。
			 var obj={};
			 obj.name=funList[i].name;
			 obj.width=100;
			 obj.align='center';
			 
			 JqGridColModel.push(obj);
		}
		$(tableId).jqGrid({
			url:"/manager/authority/roleInfo/selectRoleList",
			mtype:"GET",
			datatype: "json",
			jsonReader:{	
				root: "data.topList",
				repeatitems: false
			},
		 	cellEdit:true,
		 	cellsubmit: 'clientArray',//单元格保存内容的位置	
		    editurl: 'clientArray',
			colNames:colNames,          
	        colModel:JqGridColModel,
	        sortable:false,			            
	        rownumbers:true,
	        rowNum:-1,
	        //pager:options.pager,
	        viewrecords: true,		       
	        width: "100%" ,
	        height: $(window).height()*0.65,
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
				if(tableId=="#jqGrid_roleMsgAdd"){
					//$(tableId).find("tr[id="'+id+'"]").find("input[type=checkbox]").filter(".addCheck:checked").prop("checked",false);
					   if(status){
						  // slectROW=id;
						  // loadChoseTable(id);
						   $(tableId).find("tr[id="+id+"]").find("input[type=checkbox]").filter(".addCheck").prop("checked",true);
					   }
					   if(!status){
						  // slectROW =-1; 
						 //  initial();
						   $(tableId).find("tr[id="+id+"]").find("input[type=checkbox]").filter(".addCheck").prop("checked",false);
					   }
					}
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
			    if(grantedFun.length>0){
			    	var dataA=[];
			    	dataA=grantedFun;
			    	var tb=tableId.replace("#","");
				    for(var i=0;i<dataA.length;i++){
				    	$("tr[id="+dataA[i].opId+"]").find("td[aria-describedby="+tb+"_"+dataA[i].funName+"]").html("<input class='addCheck' type='checkbox' value='"+dataA[i].id+"'>");
				    }
				    
				   /* for(var k=0;k<data.data.funList.length;k++){
				    	var obj =jQuery("#jqGrid_roleMsgAdd").getCol(data.data.funList[k].name,false)||[];
				    	if(obj==",,,,,"){
				    		console.log(data.data.funList[k].name+"--"+obj+"+++");
				    		 $("#jqGrid_metaData").setGridParam().hideCol(data.data.funList[k].name); 
				    
				    	}
				    }*/
			    }
			},
		
			loadError:function(xhr,status,error){
		             
			}
			});
		
		
    }
    //全选触发事件(新增)
    $(document).on("click","#cb_jqGrid_roleMsgAdd",function(){
    	   $(this).prop("checked")&&$("#jqGrid_roleMsgAdd").find("input[type=checkbox]").prop("checked",true);
    	   $(this).prop("checked")||$("#jqGrid_roleMsgAdd").find("input[type=checkbox]").prop("checked",false);
    });
    //重制新增表格的宽度
    $("#myModal").on("shown.bs.modal",function(){
    	  $("#jqGrid_roleMsgAdd").jqGrid('setGridWidth',$("#jqGrid_roleMsgAdd").parents(".jqGrid_wrap").width());
    });
    //重制修改表格的宽度
    $("#modalUpdate").on("shown.bs.modal",function(){
  	      $("#jqGrid_roleMsgUpdate").jqGrid('setGridWidth',$("#jqGrid_roleMsgUpdate").parents(".jqGrid_wrap").width());
    });
    
	// 数据操作单击事件
	/*$(".shou-checkbox-add").click(function(){
	   var hasCheck = $('.shou-checkbox-add').is(':checked');
	   if (hasCheck) {
			funType = 1;
		} else {
			funType = null;
		}
	  $.ajax( {
		type : 'Get',
		url : "/manager/authority/roleInfo/selectRoleList",
		data : {"funType" : funType,"moduleId" : moduleId,"opTypeName" : opTypeName},
		dataType : "json",
		success : function(data) {
		initAddRoleTable("#jqGrid_roleMsgAdd", data.data.funList,data.data.topList, data.data.authorityDetailList);
	  } 
		});
	});*/
				
	// 保存角色信息
	$(document).on("click",".save_add",saveAndClose);
	function saveAndClose() {
		var name = $("#addRoleName").val().trim();
		if (name == "") {
			$.zxsaas_plus.showalert("提示", "角色名称不能为空");
			return;
		}
		var metadataIds = "";
		$("#jqGrid_roleMsgAdd").find("input[type=checkbox]").filter(".addCheck:checked").each(function(){
			metadataIds += $(this).val() + ",";
		});
		$.ajax( {
			url : "/manager/authority/roleInfo/saveRole",
			type : "POST",
			data : {"metadataIds" : metadataIds,"name" : name},
			success : function(data) {
				if (data.result == 1) {
					$.zxsaas_plus.showalert("提示", data.desc);
					$("#addRoleName").val("");
					initTree();
				} else {
					$.zxsaas_plus.showalert("错误", data.desc);
				}
			}
		});

	}
				
	// ***************************************************************新增操作结束***************************************************

	//*************************************************************修改操作开始*******************************************************
	$(document).on("click",".modify",updateRole);
	function updateRole(){
		jQuery("#jqGrid_roleMsgUpdate").jqGrid("clearGridData");
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
				   treeModuleId = treeNode.id;
				   var id=$("#roleSelect").val();
				   controllRoleUpdateTableByTreeNodeUpdate(treeNode,id);//通过id调用对应方法 重构表格
				   return;
				}
			},
			view: {
				showIcon: false
			}
	    }; 
		var id=$("#roleSelect").val();
		var name=$("#roleSelect").find("option:selected").text();
		
		 $.ajax({
	            type: 'Get',
	            url: "/manager/authority/roleInfo/selectRoleList",
	            data: {"funType":null,"status":1,"roleId":$("#roleSelect").val()},
	            dataType: "json",
	            success: function (data) {
			       $("#updateRoleName").val(name);
	                $.fn.zTree.init($("#roleUpdateTree"), setting, data.data.rows);
	                var str = $('#roleUpdateTree_1_switch').attr('class');
	                var Class = str.replace('roots','center');
	                $('#roleUpdateTree_1_switch').attr('class',Class);
	                if(initial_modify){
	                    drawUpdateRoleTable("#jqGrid_roleMsgUpdate",data.data.funList,data.data.topList,data.data.authorityDetailList,data.data.grantedFun);
	                }else{
	                	$("#jqGrid_roleMsgUpdate").jqGrid('setGridParam',{  
	            	        datatype:'json',
	            	        postData:{"moduleId":moduleId,"opTypeName":opTypeName,"funType":funType,"status":1,"roleId":$("#roleSelect").val()}
	            	    }).trigger("reloadGrid"); //重新载入	
	                }
	                updateRoleId=$("#roleSelect").val();
	                $("#modalUpdate").modal("show");
	            },
	            error: function (msg) {
	             
	            }
	  });
		 
		 
	//修改数据操作授权点击事件	
/*	$(".shou-checkbox-update").click(function(){
		var id=$("#roleSelect").val();
		var hasCheck=$('.shou-checkbox-update').is(':checked');
		if(hasCheck){
			funType=1;
		}else{
			funType=null;
		}
		$.ajax({
		   type: 'Get',
		   url: "/manager/authority/roleInfo/selectRoleList",
		   data: {"funType":funType,"status":1,"moduleId" : moduleId,"opTypeName" : opTypeName},
		   dataType: "json",
		   success: function (data) {
		   $.fn.zTree.init($("#roleUpdateTree"), setting, data.data.rows);
			var str = $('#roleUpdateTree_1_switch').attr('class');
			var Class = str.replace('roots','center');
			$('#roleUpdateTree_1_switch').attr('class',Class);
			drawUpdateRoleTable("#jqGrid_roleMsgUpdate",data.data.funList,data.data.topList,data.data.authorityDetailList,data.data.grantedFun);
		   }
		});
	  });*/
	}			

	//内置角色信息里更新页面 通过树id调用对应方法 重构表格
	function controllRoleUpdateTableByTreeNodeUpdate(treeNode,id){
		if(treeNode.pId!=null && treeNode.id!=null){
			moduleId=treeNode.pId;
			opTypeName=treeNode.name;
		}else{
			moduleId=treeNode.id;
			opTypeName=null
		}
		$("#jqGrid_roleMsgUpdate").jqGrid('setGridParam',{  
	        datatype:'json',
	        postData:{"moduleId":moduleId,"opTypeName":opTypeName,"funType":funType,"status":1,"roleId":$("#roleSelect").val()}
	    }).trigger("reloadGrid"); //重新载入
	}

	function drawUpdateRoleTable(tableId,funList,topList,authorityDetailList,grantedFun){

		$("#updateRoleId").val($("#roleSelect").val());
		var colNames=[];//表头
		colNames.push("id");	
		colNames.push("操作名称");	
		
		var JqGridColModel=[];//参数
		JqGridColModel.push({name:'id',width:100,align:'center',sorttype:'string',hidden:true});
		JqGridColModel.push({name:'name',width:100,align:'center',sorttype:'string'});//操作名称（name对应接口的name）
		
		for(var i=0;i<funList.length;i++){
			 colNames.push(funList[i].name);//查询。。。。
			 var obj={};
			 obj.name=funList[i].name;
			 obj.width=100;
			 obj.align='center';
			
			 JqGridColModel.push(obj);
		}
		$(tableId).jqGrid({
			url:"/manager/authority/roleInfo/selectRoleList",
			mtype:"GET",
			datatype: "json",
			jsonReader:{	
				root: "data.topList",
				repeatitems: false
			},
		 	cellEdit:true,
		 	cellsubmit: 'clientArray',//单元格保存内容的位置	
		    editurl: 'clientArray',
			colNames:colNames,          
	        colModel:JqGridColModel,
	        sortable:false,			            
	        rownumbers:true,
	        rowNum:-1,
	        //pager:options.pager,
	        viewrecords: true,		       
	        width: "100%" ,
	        height: $(window).height()*0.65,
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
				if(tableId=="#jqGrid_roleMsgUpdate"){
					//$(tableId).find("tr[id="'+id+'"]").find("input[type=checkbox]").filter(".addCheck:checked").prop("checked",false);
				
					if(status){
						   $(tableId).find("tr[id="+id+"]").find("input[type=checkbox]").filter(".addCheck").prop("checked",true);
				
					   }
					   if(!status){
						   $(tableId).find("tr[id="+id+"]").find("input[type=checkbox]").filter(".addCheck").prop("checked",false);
					   }
					}
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
				var tb=tableId.replace("#","");
			    if(grantedFun.length>0){
			    	var dataA=[];
			    	dataA=grantedFun;
				    for(var i=0;i<dataA.length;i++){
				    	$(tableId).find("tr[id="+dataA[i].opId+"]").find("td[aria-describedby="+tb+"_"+dataA[i].funName+"]").html("<input class='addCheck' type='checkbox' value='"+dataA[i].id+"'>");
				    }
			    }if(sjsqStatus){
			    	 if(initial_modify==false){
					    	authorityDetailList=data.data.authorityDetailList;
					    }
			    }
			    
			    if(authorityDetailList.length>0){
				    for(var k=0;k<authorityDetailList.length;k++){
						var opId=authorityDetailList[k].opId;
						var funId=authorityDetailList[k].funName;
						//var tdId="td_"+opId+"_"+funId;
						if(opId!=null && funId!=null){
							if(authorityDetailList[k].roleId==$("#roleSelect").val()){
							   //$(tableId).find("td[id='"+tdId+"']").html("<input type='checkbox' checked  value='"+authorityDetailList[k].metadataId+"' >");
							   $(tableId).find("tr[id="+opId+"]").find("td[aria-describedby="+tb+"_"+funId+"]").html("<input class='addCheck' type='checkbox' checked value='"+authorityDetailList[k].metadataId+"'>");
							}
							else{
							   //$(tableId).find("td[id='"+tdId+"']").html("<input type='checkbox' value='"+authorityDetailList[k].metadataId+"'>");
							   $(tableId).find("tr[id="+opId+"]").find("td[aria-describedby="+tb+"_"+funId+"]").html("<input class='addCheck' type='checkbox' value='"+authorityDetailList[k].metadataId+"'>");
						    }
					    }
				    }
			    }
			    initial_modify=false;
			    sjsqStatus=true;
			},
		
			loadError:function(xhr,status,error){
		             
			}
			});
		
		
		
	}
	
	//全选触发事件(新增)
    $(document).on("click","#cb_jqGrid_roleMsgUpdate",function(){
    	   $(this).prop("checked")&&$("#jqGrid_roleMsgUpdate").find("input[type=checkbox]").prop("checked",true);
    	   $(this).prop("checked")||$("#jqGrid_roleMsgUpdate").find("input[type=checkbox]").prop("checked",false);
    });
	$(document).on("click",".update_close",updateAndClose);
	//更新内置角色
	function updateAndClose() {
		var name = $("#updateRoleName").val().trim();
		if (name == "") {
			$.zxsaas_plus.showalert("提示", "角色名称不能为空");
			return;
		}
		var metadataIds = [];
		$("#jqGrid_roleMsgUpdate").find("input[type=checkbox]").filter(".addCheck:checked").each(function(){
			metadataIds.push($(this).val());
		});
		$.ajax( { 
			type : 'POST',
			url : "/manager/authority/roleInfo/updateRole",
			data : {"metadataIds" : metadataIds,"id" : $("#roleSelect").val(),"name" : name,"mId":treeModuleId},
			traditional : true,
			dataType : "json",
			success : function(data) {
				$.zxsaas_plus.showalert("提示", data.desc);
				if (data.result == 1) {
					$("#addRoleName").val("");
					initshow=false;
					$("#jqGrid_metaData").jqGrid('setGridParam',{  
				        datatype:'json',
				        postData:{"moduleId":moduleId,"opTypeName":opTypeName,"funType":funType,"status":1,"roleId":$("#roleSelect").val()}
				    }).trigger("reloadGrid"); //重新载入
				}
			},
			error : function(msg) {
			
			}
		});
	}
	
/***************************修改名称要刷新下拉框并且刷新表格*********************/
/*	$("body").delegate("#yesBta", "click", function() {
		moduleId="";
		opTypeName="";
		initTree();
	});
			
	function closeOnly() {
		moduleId="";
		opTypeName="";
		initTree();
	}*/
  
	

	/**
	 * 角色关联人员
	 */
		$(document).on('click', '.rel',function(e){
				var options = {
					LoadTableUrl: "/manager/authority/employeeInfo/selectEmployeeList",
					TableName: "#jqGrid_empMa", //显示表格名称。遵照css选择器书写
					pager:"#jqGridPager_empMa"
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
						var colNames = ['ID','员工编号','员工名称','部门名称','职位名称','员工属性'];
						var JqGridColModel=[
											{name:'id',index:'id', width:100,align:'center', sorttype:'string',hidden:true,sortable:false},
											{name:'code',index:'code', width:100,align:'center', sorttype:'string',sortable:false},
											{name:'name',index:'name', width:100,align:'center', sorttype:'string',sortable:false},
											{name:'sectionName',index:'sectionName', width:100,align:'center', sorttype:"string",sortable:false},
											{name:'jobName',index:'jobName', width:100,align:'center', sorttype:"string",sortable:false},
											{name:'attrName',index:'attrName', width:100,align:'center', sorttype:"string",sortable:false}
						                ];
						
						loadtable();
						
						function loadtable(){
								$(options.TableName).jqGrid({
									url:options.LoadTableUrl,
									mtype:"POST",
									postData:{"isOpr":1},
									datatype: "json",
									jsonReader  : {	
											root: "data.rows",
											repeatitems: false
												},
									colNames:colNames,          
						            colModel:JqGridColModel,
						            sortable:false,			            
						            rownumbers:true,
						            rowNum: 20,
						            rowList: [20, 50, 100,200],
						            pager:options.pager,
						            viewrecords: true,		           
						            multiselect:true,
						           	//cellEdit:true,
						            width: "100%" ,
						            height: $(window).height()*0.44,
									autowidth:true,
									rownumWidth: 35, // the width of the row numbers columns
									shrinkToFit:false,  //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
									ondblClickRow:function(id){
									//双击进入编辑
						   				var delid = id;
						   				
									},
									
									gridComplete: function() {
										var ids=$(options.TableName).jqGrid("getDataIDs");
			
									},
									loadComplete:function(data){
										searchSe();
									},
									loadError:function(xhr,status,error){
										//console.log(status)
									}
									})
					
						}
						/*
						 * xx 
						 */
						var searchSe = function(e){
							var rid = $('#roleS option:checked').val();
							$.ajax({
								url:'/manager/authority/roleInfo/initRoleAndEmp/' + rid,
								type:'GET',
								success:function(data){
									var roleAndEmp = data.data.roleAndEmp;
									$(options.TableName).jqGrid('resetSelection');
									for(var i = 0,len = roleAndEmp.length;i < len;i ++){
										//roleAndEmp[i].employeeId
										$(options.TableName).jqGrid('setSelection',roleAndEmp[i].employeeId);
									}
								}
							});
						};
						
						/*
						 * save 
						 */
						$(document).on('click','.saveRoles ,.saveAdd',function(e){
							var chRowsIds = $(options.TableName).jqGrid('getGridParam','selarrrow');
							console.log(chRowsIds.length);
							if(chRowsIds.length==0){
								chRowsIds=[];
							}
							$.ajax({
								url:'/manager/authority/roleInfo/saveRoleAndEmp',
								type:'POST',
								data:{'rid':$('.roleS option:checked').val(),'ids':chRowsIds},
								traditional: true,
								success:function(data){
									if(data.result == 1){
										$.zxsaas_plus.showalert('提示',data.desc);
									}
									
								}
							});
						});
						
						/*
						 * toggle 
						 */
						$(document).on('change','#roleS',function(e){
							searchSe();
						});
						
						
		
		
		});
})();
