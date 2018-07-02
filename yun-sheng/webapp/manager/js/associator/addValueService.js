var ifOne=0;

function loadmodal(options){
	/*初始化表格参数*/
        var  colNamec =[];
        var JqGridColModelc =[];
		colNamec[0] = ['id','服务名称','是否永久有效','服务期限','是否不限次数','效期内可服务次数','预设定价','是否关联串号','备注','停用'];//增值服务
		 JqGridColModelc[0] = [
		                       	{name:'id',index:'id', width:150,align:'center',sortable:false,hidden:true},
								{name:'serviceName',index:'serviceName', width:200,align:'center',sortable:false},//服务名称
								{name:'serviceDue',index:'serviceDue', width:150,align:'center',sortable:false,formatter:'select', editoptions:{value:"0:√"}},//有无期限
								{name:'qx',index:'qx', width:150,align:'center',sortable:false},//服务期限
								{name:'userNum',index:'userNum', width:150,align:'center',sortable:false,formatter:'select', editoptions:{value:"0:√"}},//有无次数限制
								{name:'cs',index:'cs', width:155,align:'center',sortable:false},//效期内可服务次数
								{name:'setPrice',index:'setPrice', width:150,align:'center',sortable:false},//预设定价
//								{name:'ifXf',index:'ifXf', width:100,align:'center',sorttype:'string',formatter:'select', editoptions:{value:"1:√;0:"}},//允许续费
//							    {name:'ifCsh',index:'ifCsh', width:100,align:'center',sorttype:'string',formatter:'select', editoptions:{value:"1:√;0:"}},//逾期重置
								{name:'ifIm',index:'ifIm', width:150,align:'center',sortable:false,formatter:'select',editoptions:{value:"1:√;0:"}},//是否关联串号							
							    {name:'remark',index:'remark', width:200,align:'center',sortable:false},//备注
							    {name:'isStop',index:'isStop',width:100,align:'center',sortable:false,formatter:'select',editoptions:{value:"1:√;0:"}}//停用					
			                ];
	     colNamec[1] = ['id','操作','商品分类编码','商品分类名称'];//新增/修改
		 JqGridColModelc[1] = [
		                       	{name:'goodsclassId',index:'goodsclassId', width:70,align:'center',hidden:true},
								{name:'justDo',index:'juseDo', width:100,align:'center',sortable:false,formatter:addAndDelete},//操作
								{name:'code',index:'code', width:100,align:'center',sortable:false,formatter:Goodsmodel},//商品分类编码
								{name:'name',index:'name', width:100,align:'center',sortable:false,formatter:Goodsmodel},//商品分类名称
			                  ];
		var defaults = {
		LoadTableUrl: "/manager/member/cardType/selectRange?rid=38",
		pager:"",
		TableInfo:"",
		multi:"true",
		edit:true
		};
		var options = $.extend(defaults,options);
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
			var colNames = colNamec[options.TableInfo];
			var JqGridColModel= JqGridColModelc[options.TableInfo];
			loadtable();
		//加载表格
		    
			function loadtable(){
					$(options.TableName).jqGrid({
						url:options.LoadTableUrl,
						mtype:"POST",
						datatype: "json",
						jsonReader  : {	
							root: "data.rows",
							repeatitems: false
						},
						colNames:colNames,          
			            colModel:JqGridColModel,
			            sortable:false,			            
			            rownumbers:true,
			            viewrecords: true,		       
			            width: "100%" ,
			            height: $(window).height()*0.65,
						autowidth:true,
						rownumWidth: 45, // the width of the row numbers columns
						shrinkToFit:false,  //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
						multiselect:options.multi,
						multiboxonly:false,
						multiselectWidth:50,
						cellEdit:options.edit,
						cellsubmit: 'clientArray',//单元格保存内容的位置		
			            editurl: 'clientArray',
			            row:1,
						ondblClickRow:function(id){
						//双击进入编辑
			   				var delid = id;
			   				
						},
						onCellSelect:function(id,index,e){
							var colName=$(options.TableName).jqGrid('getGridParam','colModel')[index].name 
					      	select_name=colName
					      	select_index=index;
							
							rowid=id;

						},
						beforeSelectRow:function(rowid,e){
                            if(options.TableInfo!=0){
                               return $(e.target).is('input[type=checkbox]');
                            }
                               return true;
                            
						},
						afterInsertRow: function (rowid, aData) { //新增一行之后

						},
						gridComplete: function() {
							
						},
						loadComplete:function(data){
					         if(ifOne==0){
					        	 var rowIds = jQuery("#jqGrid_update").jqGrid('getDataIDs');
					 	 		if(rowIds.length>0){
					 	 			$("#dis-modify").prop('checked',true);
					 	 			$("#all-modify").prop('checked',false);
					 	 		}
					 	 		else{
					 	 			$("#dis-modify").prop('checked',false);
					 	 			$("#all-modify").prop('checked',true);
					 	 		}
					         }
					         else{
					        	 var ids=$("#jqGrid_update").jqGrid("getDataIDs");
							     if(ids.length==0){
									$("#jqGrid_update").jqGrid('addRowData',1,{},'first');
							     }
					         }
					 		
						},
						loadError:function(xhr,status,error){
						}
						})
		
			}
			/*操作列*/
			function addAndDelete(cellvalue, options, rowObjec){
				var addAndDel ='<div class="operating" data-id="' + options.rowId + '"><span style="cursor:pointer;margin-right:10px" class="icon-plus" id="icon-plus" title="添加" ></span><span style="cursor:pointer;" class="icon-trash" id="icon-trash" title="删除"></span></div>';
				return addAndDel;
			}
			
//			function addInitialRow(TableName){
//				 $(TableName).jqGrid('addRowData', "1", {},'first' );
//			}
//			//删除一行
//			$(document).on('click', '.glyphicon-trash',function(e){
//				var thisTitle = $(this).attr("title");
//				var rowId = $(this).parent().data('id');
//				if(thisTitle == "删除行"){
//					$.zxsaas_plus.showconfirm("","是否确定删除本行?",function(){
//						$(options.TableName).jqGrid('delRowData', rowId);
//					},function(){
//						
//					});
//
//				}
//			});
			$(window).bind('click', function saveEdit(e) {
				var rowId = $(e.target).parent("tr").attr("id");
				if (lastsel != "" && lastsel != rowId) { //用于点击其他地方保存正在编辑状态下的行
					if ($(e.target).closest(options.TableName).length == 0) { 
						$(options.TableName).jqGrid('saveRow', lastsel);						
						lastsel='';
					}
				}
			})
			
			 function Goodsmodel(cellvalue, options, rowObject){
	            if(cellvalue == undefined || cellvalue == ""){
                	cellvalue = "";
                }
				return '<span class="goodsSort" style="display: inline-block; width: 89px;height: 16px;" data-toggle="modal" data-target="#goodsch" data-rId="' + options.rowId +'">' + cellvalue + '</span>';     
		}
			
	
		//查询
		$(document).on("click",".btn-group button[data-eventname='inquire']",function(event){			
			if(flag==true){
			$.jgrid.GridDestroy(options.TableName);
			loadtable();
			}else{
				flag=true;
			}
			
		});
		

}

/*永久有效*/
$(document).on("click",".yjyx",function(){
  if($(this).prop("checked")){
		if($(this).parents(".modal").hasClass("addModal")){
			$("#addServiceAddForm").bootstrapValidator('resetField','serviceDue',true);
			$("#serviceDueAdd").val("");
			$("#serviceDueAdd").attr("disabled",true);
	
		}else if($(this).parents(".modal").hasClass("modifyModal")){
			$("#addServiceModifyForm").bootstrapValidator('resetField','serviceDue',true);
			$("#serviceDue").val("");
			$("#serviceDue").attr("disabled",true);
		}
  }else{
	  if($(this).parents(".modal").hasClass("addModal")){
			$("#serviceDueAdd").removeAttr("disabled");
		}else if($(this).parents(".modal").hasClass("modifyModal")){
			$("#serviceDue").removeAttr("disabled");
		}
	  
  }
});

/*无限次数*/
$(document).on("click",".wxcs",function(){
	  if($(this).prop("checked")){
			if($(this).parents(".modal").hasClass("addModal")){
				$("#addServiceAddForm").bootstrapValidator('resetField','userNum',true);
				$("#userNumAdd").val("");
				$("#userNumAdd").attr("disabled",true);
		
			}else if($(this).parents(".modal").hasClass("modifyModal")){
				$("#addServiceModifyForm").bootstrapValidator('resetField','userNum',true);
				$("#userNum").val("");
				$("#userNum").attr("disabled",true);
			}
	  }else{
		  if($(this).parents(".modal").hasClass("addModal")){
				$("#userNumAdd").removeAttr("disabled");
			}else if($(this).parents(".modal").hasClass("modifyModal")){
				$("#userNum").removeAttr("disabled");
			}
		  
	  }
	
});


/*：正整数   /^\\d+$/ */
	 $(".fwqx,.yxq").on("input propertychange",function(){
	 	  var v = $(this).val(); 
	 	  var aftv = v.replace(/[^\d\s]/g,'');
	 	
		 	  	var nv = parseInt(aftv);//屏掉0XX
		 	  	if(isNaN(nv)){
		 	  		 $(this).val("") ;
		 	  	}else{
		 	  		 $(this).val(nv) ;
		 	  	}
	 	 
	 	
	 });
	 
/*全部商品*/
/*$(".tgle").find("input").on("click",function(){
	   var tbN =$(this).parents(".tp-info").siblings(".bt-tble").find(".zxsaastable").attr("id");
	   if($(this).hasClass("allGoods")){
	   	  $(this).prop("checked") && $("#"+tbN).setGridParam({cellEdit:false}).trigger("reloadGrid");
	   	  $(this).prop("checked") || $("#"+tbN).setGridParam({cellEdit:true}).trigger("reloadGrid");
	   }
	   if($(this).hasClass("someGoods")){
	   	  $(this).prop("checked") && $("#"+tbN).setGridParam({cellEdit:true}).trigger("reloadGrid");
	   	  $(this).prop("checked") || $("#"+tbN).setGridParam({cellEdit:false}).trigger("reloadGrid");
	   }
})*/
     
function drawTable(tn,pger,tableinfo){
	if(tableinfo == 0){//增值表
	    loadmodal({TableName:tn,pager:pger,TableInfo:tableinfo,LoadTableUrl: "../../json/associator/zzfwdefault1.json"});	
	}
	else if(tableinfo == 1){//新增
		loadmodal({TableName:tn,pager:pger,TableInfo:tableinfo,LoadTableUrl: "../../json/associator/zkdefault.json"});	
	}	
}

function initial(){
	loadmodal({TableName: "#jqGrid_addService",pager:"#jqGridPagerAS",edit:false,TableInfo:"0",LoadTableUrl: "/manager/member/cardType/selectaddServiceList"});
	loadmodal({TableName: "#jqGrid_add",pager:"#jqGridPageradd",TableInfo:"1",LoadTableUrl: "/manager/member/cardType/selectAll" ,multi:false});
	 $("#jqGrid_add").setGridParam({cellEdit:false}).trigger("reloadGrid");//初始化选中全部商品
	loadmodal({TableName: "#jqGrid_update",pager:"#jqGridPagermodify",TableInfo:"1",LoadTableUrl: "/manager/member/cardType/selectAll",multi:false});
	 $("#jqGrid_update").setGridParam({cellEdit:false}).trigger("reloadGrid");//初始化选中全部商品
	$(".init").attr("disabled",true);
}


//保存
$('.addService').click(function(){
	var obj=$("#addServiceModal").toJsonObject();
	var rad=$("input[name='qbsp']:checked").val();
	var list=[];
	if(rad==2){
		   var rangeList = $("#jqGrid_add").jqGrid('getDataIDs');
		    for(var i=0;i<rangeList.length;i++){
		    	var rowData =$("#jqGrid_add").jqGrid('getRowData',rangeList[i]);
		    	var jfobj={};
		    	jfobj.goodsclassId=rowData.goodsclassId;
		    	list.push(jfobj);
		    }
	}
	obj.rangeList=list;
	if(obj.yjyx==1){
		obj.serviceDue=-1;
	}else{
			
		if(!obj.serviceDue){
			obj.serviceDue=0;
		}
	}
	if(obj.wxcs==1){
		obj.userNum=-1;
	}else{
		
		//obj.userNum||obj.userNum=0;
		if(!obj.userNum){
			obj.userNum=0;
		}
	
	}
	
	if(!obj.setPrice){	//预设定价
		obj.setPrice=0;
	}

	delete obj.qbsp;
	delete obj.yjyx;  
	delete obj.wxcs;  
	//判断验证是否通过
	var bootstrapValidator = $("#addServiceAddForm").data('bootstrapValidator');
	bootstrapValidator.validate();
	if(bootstrapValidator.isValid()){
		$.request({
	         url: '/manager/member/cardType/saveService',
	         type: "POST",
			 datatype : "json",
			 contentType: "application/json",
			 data: JSON.stringify(obj),
			 traditional: true,
	         success: function (data) {
					 if(data.result==1){
				    		$.zxsaas_plus.showalert("提示",data.desc);
				    		$("#addServiceModal").modal('hide');
				    	}else{
				    		$.zxsaas_plus.showalert("错误",data.desc);
				    	}
				    	$("#jqGrid_addService").trigger("reloadGrid");
				    	
				    	clearModal("#jqGrid_add");
				         
			          },
	         error: function (msg) {
	        
	         }
	     });
	}
});

var rowId = '';
$(document).on('click','.goodsSort',function(){
	var ptId = $(this).parents("table").attr("id");
	var setting = {  
	        data: {
				simpleData: {
					enable: true,
					idKey: "id",
					pIdKey: "pid",
					rootPId: null
				}
			},
			callback: {
				onClick: function (event, treeId, treeNode, msg) {
					//controllAdd(treeNode.id);//通过id调用对应方法 重构表格

				},
				onDblClick: function(event, treeId, treeNode){
					 if(treeNode.id>-1){
						 var f =checkOrNot(treeNode,"#"+ptId);
						 if(!f){
							$("#"+ptId).setCell(rowId,'code',treeNode.obj.code)//分类编码treeNode.obj.code
							$("#"+ptId).setCell(rowId,'name',treeNode.obj.name)//分类编码
							$("#"+ptId).setCell(rowId,'goodsclassId',treeNode.obj.id)//隐藏的商品分类ID   treeNode.obj.id                           
							//$("#"+ptId).find("#"+rowId).find("td[aria-describedby="+ptId+"_goodsclassId]").attr("name","goodsclassId");
							$('#goodsch').modal('hide');//关闭商品资料模态框
						 }else{
							 $.zxsaas_plus.showalert("提示","已经选择!");
						 }
					 }else{
						 
						 $.zxsaas_plus.showalert("提示","不能选择!");
					 }
				}
			},
			view: {
				showIcon: false
			}
	    }; 
	    rowId = $(this).data('rid');
	     $.request({
	            type: 'Get',
	            url: '/manager/Tgoodsclass/findTree2',//树结构地址
	            dataType: "json", 
	            success: function (data1) {
	    	 		
	                $.fn.zTree.init($("#goodsDataTree"), setting, data1);
	                var zTree1 = $.fn.zTree.getZTreeObj("goodsDataTree");
                	zTree1.expandAll(true);//展开全部节点
                	
	            },
	            error: function (msg) {
	          
	            }
	        });
	     var liidx = $(".phead>li.active").index();
	      drawTable(liidx,"#jqGridTranGoods","#gridpagerTranGoods","5") ;//加载商品表格
	
});

//判断是否选中
function checkOrNot(treeNode,tn){
	  var ids = $(tn).jqGrid('getDataIDs'); 
	  for(var i=0;i<ids.length;i++){
		  var rowData = $(tn).jqGrid('getRowData',ids[i]);  
		  if(rowData.goodsclassId){
				if(tn=="#jqGrid_add"){//增值服务新增表格
					if(rowData.goodsclassId==treeNode.obj.id){
						return true;
					}
					
				}else if(tn=="#jqGrid_update"){//增值服务修改表格
					if(rowData.goodsclassId==treeNode.obj.id){
						return true;
					}
					
				}
		  }
	  }
	  return false;
	
}

///*修改模态框弹出后*/
$("#modifyServiceModal").on("shown.bs.modal",function(){
	$("#jqGrid_update").setGridWidth($(this).find(".grid-wrap").width());
	$("#jqGrid_update").setGridHeight($(this).find(".grid-wrap").height());
});

//修改信息
$('.updateBloc').click(function(){
	ifOne=0;
	var ids = $("#jqGrid_addService").jqGrid('getGridParam','selarrrow');//选中的行id
	var len = ids.length;
	if(len != 1){
	    $.zxsaas_plus.showalert("提示","请选择一条信息!");
		return false;
	}else{
		var gridData = $("#jqGrid_addService").jqGrid("getRowData",ids);
		$('#id').val(gridData.id);
		$('#serviceName').val(gridData.serviceName);
		$('#serviceDue').val(gridData.qx);
		$('#userNum').val(gridData.cs);
	
		$('#setPrice').val(gridData.setPrice);
		$('#remark').val(gridData.remark);
		//是否关联串号
		(gridData.ifIm == '1') ? ($('#ifIm').prop({'checked':'checked'})) : ($('#ifIm').prop({'checked':''}));
		//是否永久有效
		if(gridData.serviceDue == '0'){
			$('#yjyx').prop('checked',true);
			$("#serviceDue").attr("disabled","disabled");
		}else{
			$('#yjyx').prop("checked",false);
		}
		//是否不限次数
		if(gridData.userNum == '0'){
			$('#wxcs').prop('checked',true);
			$("#userNum").attr("disabled","disabled");
		}else{
			$('#wxcs').prop("checked",false);
		}
		  $("#jqGrid_update").jqGrid('setGridParam',{  
	           url:'/manager/member/cardType/selectRange/'+gridData.id}).trigger("reloadGrid"); 
		  
		 return true;
	}
});

//保存修改信息
$(".updateService").click(function(){
	var obj=$("#modifyServiceModal").toJsonObject();
	var rad=$("input[name='updateqbsp']:checked").val();
	var list=[];
	if(rad==2){
		
		var ids =$("#jqGrid_update").jqGrid("getDataIDs");
		for(var i=0;i<ids.length;i++){
		    	var rowData =$("#jqGrid_update").jqGrid("getRowData",ids[i]);
		    	var jfobj={};
		    	jfobj.goodsclassId=rowData.goodsclassId;
		    	list.push(jfobj);
		    }
		}
	obj.rangeList=list;
	if(obj.yjyx==1){
		obj.serviceDue=-1;
	}else{
			
		if(!obj.serviceDue){
			obj.serviceDue=0;
		}
	}
	if(obj.wxcs==1){
		obj.userNum=-1;
	}else{
		if(!obj.userNum){
			obj.userNum=0;
		}
	
	}
	
	if(!obj.setPrice){	//预设定价
		obj.setPrice=0;
	}
	delete obj.updateqbsp;
	delete obj.yjyx;  
	delete obj.wxcs; 
	//判断验证是否通过
	var bootstrapValidator = $("#addServiceModifyForm").data('bootstrapValidator');
	bootstrapValidator.validate();
	if(bootstrapValidator.isValid()){
	$.request({
         url: '/manager/member/cardType/saveService',
         type: "POST",
		 datatype : "json",
		 contentType: "application/json",
		 data: JSON.stringify(obj),
		 traditional: true,
         success: function (data) {
				 if(data.result==1){
			    		$.zxsaas_plus.showalert("提示",data.desc);
			    		$("#modifyServiceModal").modal('hide');
			    		$("#jqGrid_addService").trigger("reloadGrid");
				    	 clearModal("#jqGrid_update");
			    	}else{
			    		$.zxsaas_plus.showalert("错误",data.desc);
			    	}
		          },
         error: function (msg) {
            
         }
     });
	}
});

//删除
$(document).on('click', '.delete',function(e){
	var ids = $("#jqGrid_addService").jqGrid('getGridParam','selarrrow');//选中的行id
	if(ids.length==0){
		
		$.zxsaas_plus.showalert("提示","请选择要删除的增值服务");
	}
	else{
		if(ids.length==1){
			$.zxsaas_plus.showconfirm("提示","是否确定删除数据?",function(){
				$.request({
			          type: 'GET',	
			          url: '/manager/member/cardType/deleteService/'+ids[0],//树结构地址
			          success: function (data) {
							$.zxsaas_plus.showalert("提示",data.desc);
			          		 $("#jqGrid_addService").trigger("reloadGrid");
			          },
			          error: function (msg) {
			           
			          }
			      });
			},function(){
				
			});
		}
		else{
			$.zxsaas_plus.showalert("提示","只允许单条删除");
		}
	}
	

});

/*点击关闭、取消清空模态框新增或者修改数据*/
$(document).on("click",".addCancel",function(){
		$("#addServiceModal").find("input[type=text]").val("");
		$("#addServiceModal").find("input[type=checkbox]").prop("checked",false);
		$("#jqGrid_add").jqGrid('clearGridData');
		$("#all-add").prop("checked",true);
		//清除验证提示状态
		$('#addServiceAddForm').data('bootstrapValidator').enableFieldValidators('serviceName',true);//服务名称
		$('#addServiceAddForm').data('bootstrapValidator').enableFieldValidators('serviceDue',true);//服务期限
		$('#addServiceAddForm').data('bootstrapValidator').enableFieldValidators('userNum',true);//有效期内可服务次数
		$('#addServiceAddForm').data('bootstrapValidator').enableFieldValidators('setPrice',true);//预设定价
});
$(document).on("click",".modifyCancel",function(){
		$("#modifyServiceModal").find("input[type=text]").val("");
		$("#modifyServiceModal").find("input[type=checkbox]").prop("checked",false);
		$("#jqGrid_update").jqGrid('clearGridData');
		$("#all-modify").prop("checked",true);
		//清除验证提示状态
		$('#addServiceModifyForm').data('bootstrapValidator').enableFieldValidators('serviceName',true);//服务名称
		$('#addServiceModifyForm').data('bootstrapValidator').enableFieldValidators('serviceDue',true);//服务期限
		$('#addServiceModifyForm').data('bootstrapValidator').enableFieldValidators('userNum',true);//有效期内可服务次数
		$('#addServiceModifyForm').data('bootstrapValidator').enableFieldValidators('setPrice',true);//预设定价
});
/*切换修改模态框 全部 部分radio加载表格*/
$(document).on("click","input[name=updateqbsp]",function(){
	ifOne=1;
	if($(this).val()=='1'){
	     $("#jqGrid_update").jqGrid('clearGridData');
	}else{
		var id = $("#jqGrid_addService").jqGrid('getGridParam','selrow');//选中的行id
		 $("#jqGrid_update").jqGrid('setGridParam',{  
	         url:'/manager/member/cardType/selectRange/'+id}).trigger("reloadGrid");
	}
});
/*切换新增模态框 全部 部分radio加载表格*/
$(document).on("click","input[name=qbsp]",function(){
	$("#jqGrid_add").jqGrid('clearGridData');
	if($(this).val()=='2'){
		   var ids = $("#jqGrid_add").jqGrid('getDataIDs');
			//获得当前最大行号（数据编号）
			var maxid;
			maxid = (ids.length ==0 ) ? 0 : Math.max.apply(Math,ids);
			$("#jqGrid_add").jqGrid('addRowData',maxid+1,{},'last');
	}
});
/*清空新增模态框函数*/
function clearModal(tn){
	if(tn=="#jqGrid_add"){//新增
		$("#addServiceModal").find("input[type=text]").val("");
		$("#addServiceModal").find("input[type=checkbox]").prop("checked",false);
		$(tn).jqGrid('clearGridData');
		$("#all-add").prop("checked",true);
		//清除验证提示状态
		$('#addServiceAddForm').data('bootstrapValidator').enableFieldValidators('serviceName',true);//服务名称
		$('#addServiceAddForm').data('bootstrapValidator').enableFieldValidators('serviceDue',true);//服务期限
		$('#addServiceAddForm').data('bootstrapValidator').enableFieldValidators('userNum',true);//有效期内可服务次数
		$('#addServiceAddForm').data('bootstrapValidator').enableFieldValidators('setPrice',true);//预设定价
	}else{//修改
		$("#modifyServiceModal").find("input[type=text]").val("");
		$("#modifyServiceModal").find("input[type=checkbox]").prop("checked",false);
		$(tn).jqGrid('clearGridData');
		$("#all-modify").prop("checked",true);
		//清除验证提示状态
		$('#addServiceModifyForm').data('bootstrapValidator').enableFieldValidators('serviceName',true);//服务名称
		$('#addServiceModifyForm').data('bootstrapValidator').enableFieldValidators('serviceDue',true);//服务期限
		$('#addServiceModifyForm').data('bootstrapValidator').enableFieldValidators('userNum',true);//有效期内可服务次数
		$('#addServiceModifyForm').data('bootstrapValidator').enableFieldValidators('setPrice',true);//预设定价
	}
}
///*新增模态框弹出后*/
$("#addServiceModal").on("shown.bs.modal",function(){
	///clearModal();
	$("#jqGrid_add").setGridWidth($(this).find(".grid-wrap").width());
	$("#jqGrid_add").setGridHeight($(this).find(".grid-wrap").height());
	$("#yj").prop("checked",false);
	$("#wc").prop("checked",false);
	$("#serviceDueAdd").removeAttr("disabled");
	$("#userNumAdd").removeAttr("disabled");
});
	//新增一行
	$(document).on("click",".icon-plus",function(){
	    var tableId =$(this).parents("table").attr("id");//选择相应的表格进行操作
	//$(options.TableName).jqGrid('addRowData', maxid+1, {}, 'last' );
	 if(tableId == "jqGrid_add"){ 
			var rowId = $(this).parent().data('id');
			var ids = $("#jqGrid_add").jqGrid('getDataIDs');
			//获得当前最大行号（数据编号）
			var maxid;
			console.log(ids+"******");
			maxid = (ids.length ==0 ) ? 0 : Math.max.apply(Math,ids);
		 $("#jqGrid_add").jqGrid('addRowData', maxid+1, {});
	 }
	 else if(tableId == "jqGrid_update"){
		 var rowId = $(this).parent().data('id');
			var ids = $("#jqGrid_update").jqGrid('getDataIDs');
			//获得当前最大行号（数据编号）
			var maxid;
			maxid = (ids.length ==0 ) ? 0 : Math.max.apply(Math,ids);
		 $("#jqGrid_update").jqGrid('addRowData', maxid+1, {});
	 } 
	});
	
  	
  	//删除一行
	$(document).on('click','.icon-trash',function(e){
	    var tableId =$(this).parents("table").attr("id");//选择相应的表格进行删除操作
		var thisTitle = $(this).attr("title");
		var rowId = $(this).parent().data('id');
		//var checkedList =[];
	//	checkedList.push(rowId);
			 if(tableId == "jqGrid_add"){ 
					var ids = $("#jqGrid_add").jqGrid('getDataIDs');
					if(ids.length == 1){
						$.zxsaas_plus.showalert("提示","至少保留一条！");
					}else{
						   $.zxsaas_plus.showconfirm("删除","是否确定删除本行?",function(){
		            	       $("#jqGrid_add").jqGrid('delRowData', rowId);
							},function(){
								
							});
						
					}
                 
		     	
		    }
		    else if(tableId == "jqGrid_update"){
		    	var ids = $("#jqGrid_update").jqGrid('getDataIDs');
				if(ids.length == 1){
					$.zxsaas_plus.showalert("提示","至少保留一条！");
				}else{
					   $.zxsaas_plus.showconfirm("删除","是否确定删除本行?",function(){
					    	  $("#jqGrid_update").jqGrid('delRowData', rowId);
						},function(){
								
						});
				}
			  
		    } 
	}); 
	
	/*启用/停用切换组*/
	$(document).on("click",'.toggle_use',function(e){
		e.preventDefault();
		var checkedList = [];//存放已勾选行id
		checkedList =$("#jqGrid_addService").jqGrid('getGridParam','selarrrow');
       console.log(checkedList);
		var len = checkedList.length;
		if(len == 0){
			$.zxsaas_plus.showalert("提示","请选择操作项!");
			return false;
		}else{
			$.request({
		         url: '/manager/member/cardType/startService',
		         type: "POST",
		         data:{"ids":checkedList},
				 traditional: true,
		         success: function (data) {
		        	 	 $.zxsaas_plus.showalert("提示",data.desc);
						 $("#jqGrid_addService").trigger("reloadGrid");
				          },
				         
		         error: function (msg) {
//		             alert(" 数据加载失败！" + msg);
		         }
		     });
		
			return true;
		}
	});