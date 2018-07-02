$(function(){
	loadmodal();
 })
 
 function loadmodal(){
		var options = {
		LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
		LoadTableUrl: "../../authority/publictab/selectPublicTabList",//查询集团信息接口地址
		deletePublictabUrl:"../../authority/publictab/deletePublictab",//删除公共选项接口地址
		enableOrDisablePublictabUrl:"../../authority/publictab/enableOrDisablePublictab",
		selectPublictabByIdUrl:"../../authority/publictab/selectPublictabById",
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
			var colNames = ['ID','选项编码','选项类型','选项内容1','选项内容2','选项内容3','是否禁用','备注','新增人','新增时间','修改人','修改时间','新增人id','修改人id'];
			var JqGridColModel=[
								{name:'id',index:'id', width:10,align:'center', sorttype:'string',hidden:true, key: true,sortable:false},
								{name:'code',index:'code', width:100,align:'center', sorttype:'string',sortable:false},
								{name:'type',index:'type', width:150,align:'center', sorttype:'string',sortable:false},
								{name:'content1',index:'content1', width:200,align:'center', sorttype:'string',sortable:false},
								{name:'content2',index:'content2', width:200,align:'center', sorttype:'int',sortable:false},
								{name:'content3',index:'content3', width:200,align:'center', sorttype:'string',sortable:false},
								{name:'status',index:'status', width:150,align:'center', sorttype:'Integer',formatter:formatStatus,sortable:false},
								{name:'remark',index:'remark', width:200,align:'center', sorttype:'string',sortable:false},
								{name:'createUname',index:'createUname', width:100,align:'center', sorttype:'string',sortable:false},
								{name:'createTime',index:'createTime', width:180,align:'center',  sorttype:'string',sortable:false},
								{name:'updateUname',index:'updateUname', width:100,align:'center',  sorttype:'string',sortable:false},
								{name:'updateTime',index:'updateTime', width:180,align:'center',  sorttype:'string',sortable:false},
								{name:'createUid',index:'createUid', width:10,align:'center',  sorttype:'Long',hidden:true,sortable:false},
								{name:'updateUid',index:'updateUid', width:10,align:'center', sorttype:'Long',hidden:true,sortable:false}
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
			            rowNum: 20,
			            rowList: [20, 25, 40],
			            pager:options.pager,
			            viewrecords: true,		           
			            multiselect:true,//定义是否可以多选
			            multiselectWidth:40,
			            width: "90%" ,
			            height: $(window).height()*0.65,
						autowidth:true,
						rownumWidth:45, // the width of the row numbers columns
						shrinkToFit:false,  
						beforeSelectRow: function(rowid, e) { 
							var check=$(e.target).is('input[type=checkbox]');
							if(check){
								$(options.TableName).jqGrid('setSelection',rowid);
							}
							return check;
						},
						gridComplete:function(data){
							$(".ui-paging-pager tr:first td:last").html("");
						},
						loadComplete:function(data){
							$(options.TableName).find('td').find(':checkbox').removeClass();
							var typeList=data.data.typeList;
							for(var i=0;i<typeList.length;i++){
								$("#publictabTypeSearch").append("<option value='"+typeList[i].typeCode+"'>"+typeList[i].type+"</option>");
							}
						}
					})
			}
			jQuery(options.TableName).jqGrid('setLabel',0, '序号');
			//格式禁用、启用
			function formatStatus(cellvalue, options, rowObjec){
				return cellvalue == 1?"√":"";
			}
			
			
			//批量删除
			$(document).on('click', '.btnDeleteRow',function(e){
				var checkedIdList = $(options.TableName).jqGrid('getGridParam','selarrrow');
				if(checkedIdList.length==0){
					$.zxsaas_plus.showalert("提示","请勾选记录后再删除!");
					return;
				}else{
					$.zxsaas_plus.showconfirm("提示","是否确定删除选中数据?",function(){
						$.request({
						    url:options.deletePublictabUrl,
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
			
			//批量启用或禁用集团信息
			$(document).on('click', '.enableOrDisable',function(e){
				var id=e.target.id;
				var checkedIdList= $(options.TableName).jqGrid('getGridParam','selarrrow');//获取选中行的id
				if(checkedIdList.length==0){
					if(id==1){
						$.zxsaas_plus.showalert("提示","请勾选记录后再禁用!");
					}else{
						$.zxsaas_plus.showalert("提示","请勾选记录后再启用!");
					}
					return;
				}else{
					$.request({
					    url:options.enableOrDisablePublictabUrl,
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
			
			//新增修改弹出模态框
			$(".addPublictab").click(function(e){
				$("#code").next().html('');
				$("#code").css({'borderColor':''});
				$("#content1").next().html('');
				$("#content1").css({'borderColor':''});
				
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
					url:options.selectPublictabByIdUrl,
					data: {"id": id},
					success:function(data){
					  if(data.result==1){
						  $("#saveAndAddSpan").html("");
						  $("#typeSelect").html("");
						 if(btnId=="add"){
							 resetPublictabValue(data.data.typeList);
						 }
						 if(btnId=="update"){
							 setPublictabValue(data.data.publictabs,data.data.typeList);
						 }
					  }
					  $('#myModal').modal('show');
				    }
				});
			});
			
			//清空文本框的值
			function resetPublictabValue(typeList){
				$("#myModalLabel").html("公共选项新增");
				$("#saveAndAddSpan").append('<button type="button" class="btn btn-success" id="saveAndAdd" onclick="savePublictab(this.id);">保存并新增</button>');
				for(var i=0;i<typeList.length;i++){
					  $("#typeSelect").append("<option value='"+typeList[i].typeCode+"'>"+typeList[i].type+"</option>")  
				}
				 $("#publictabForm")[0].reset();
			}
			
			//设置修改的原始值
			function setPublictabValue(publictabs,typeList){
				$("#myModalLabel").html("公共选修信息修改");
				$("#publictabForm").writeJson2Dom(publictabs);
				if(publictabs.status==1){
					$("#status").attr("checked",true);
				}
				for(var i=0;i<typeList.length;i++){
				   if(typeList[i].type==publictabs.type){
					   $("#typeSelect").append("<option selected='selected' value='"+typeList[i].typeCode+"'>"+typeList[i].type+"</option>")  
				   }else{
					   $("#typeSelect").append("<option value='"+typeList[i].typeCode+"'>"+typeList[i].type+"</option>")   
				   }
				}
			}
}
		
//保存集团信息
function savePublictab(btnId){
	var type=$("#typeSelect").find("option:selected").text();
	var code=$("#code").val().trim();
	var content1=$("#content1").val().trim();
	if(code==""){
		$("#code").next().html('必填!');
		$("#code").next().css({'color':'red'});
		return;
	}
	if(content1==""){
		$("#content1").next().html('必填!');
		$("#content1").next().css({'color':'red'});
		return;
	}
	var resultTypeList=judgeCode(code,type);
	var params=getSaveParams();
	if(params.id==""){//新增状态
		if(resultTypeList.length!=0){
			$("#code").next().html('该编码已存在!');
			$("#code").next().css({'color':'red'});
			return;
		}
	}else{//修改状态
		if(resultTypeList.length>1 || (resultTypeList.length == 1 && resultTypeList[0].id != params.id)){
			$("#code").next().html('该编码已存在!');
			$("#code").next().css({'color':'red'});
			return;
		}
	}
	
	
	$.request({
		type : 'POST',  
		contentType :'application/json', 
		url:'../../authority/publictab/savePublictab',
		async:false,
		data:JSON.stringify(params),
		success:function(data){
		  if(data.result==1){
			  $.zxsaas_plus.showalert("提示",data.desc);
			  if(btnId=="saveAndAdd"){
				  $("#publictabForm")[0].reset();
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

//获取保存参数，组装成json对象
function getSaveParams(){
	var params=$("#publictabForm").toJsonObject();
	params.type=$("#typeSelect option:selected").text();
	if($('#status').is(':checked')){
		params.status=1;
	}else{
		params.status=0;
	}
	return params;
}


//校验集团重复问题
function judgeCode(code,type){
	var resultTypeList=new Array();
		$.request({
			type : 'GET',  
			contentType :'application/json', 
			async: false,
			url:'../../authority/publictab/selectPublictabByType',
			data:{"code":code,"type":type},
			success:function(data){
				resultTypeList=data.data.resultTypeList;
		    }
		});
	return resultTypeList;
}

//查询按钮单击事件
function search() {
	var params = $("#inquire_option").toJsonObject();
	$("#jqGrid_blocMessage").jqGrid('setGridParam', {
		datatype : 'json',
		postData : params, // 发送数据
		page : 1
	}).trigger("reloadGrid"); // 重新载入
}


function closeOnly(){
	$(".row .btn-success").click();
}
$("#code").focus(function(e){
	$(this).next().html('');
	$(this).css({'borderColor':''});
});
$("#content1").focus(function(e){
	$(this).next().html('');
	$(this).css({'borderColor':''});
});