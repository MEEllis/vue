var updateCode=""; 	
var eid = ""; //授权人员		
		
(function(){
		cktree();
	//	initCompanyDataTree();
		$(".nameCheck,.codeCheck,.nameCheckUp,.codeCheckUp").focus(function(e){
			$(this).next().html('');
		});
	
		  //导出
	    $("#export").click(function(){
	    	var obj;
			if($('#xsjy').is(':checked')){ 
				obj=1
			}
			else{
				obj=2
			}
	    	 window.location.href= "/manager/authority/storageInfo/export?keyword="+$("#keyword").val()
	    	 +"&xsjy="+obj;
	    });
})();
$(document).on('click','.add',function(e){
	$('#myModal').modal('show');
	$('.nameCheck').next().html('');
	$(".codeCheck").next().html('');
});


/*启用时间*/
$("#openDate").datetimepicker({//发卡日期
	  lang:"ch",           //语言选择中文
    format:"Y-m-d",      //格式化日期
    timepicker:false,    //关闭时间选项
    todayButton:false    //关闭选择今天按钮
	});

function cktree(){
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
					$("#jqGrid_metaData").jqGrid('setGridParam',{  
				        datatype:'json',  
				        postData:{"sCode":treeNode.id}, //发送数据  
				    }).trigger("reloadGrid"); //重新载入
				}
			},
			view: {
				showIcon: true
			}
	    }; 
		
		 $.ajax({
	            type: 'Get',
	            url: '/manager/authority/storageInfo/initStorage',
	            data:{"xsjy":1},
	            dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
	            success: function (data) {
			 				var obj=[];
							var bumen={};
							bumen.name=data.data.companyName;
							bumen.id=-1;
							obj.push(bumen);
							//上级部门
							if (data.data.treelist) {
								for (var i = 0; i < data.data.treelist.length; i++) {
									var bumen = {};
									bumen.id = data.data.treelist[i].layerCode;
									bumen.name = data.data.treelist[i].name;
									bumen.pId = data.data.treelist[i].parentLayerCode;
									obj.push(bumen);
								}
							}
							//可选部门
							$(".mendian").html("");
							if (data.data.slist) {
								for (var i = 0; i < data.data.slist.length; i++) {
									$(".mendian").append("<option value='" + data.data.slist[i].id + "'>" + data.data.slist[i].code + "-" + data.data.slist[i].name + "</option>");
								}
							}
							
							
							
						    //公司名称
							$(".companyName").val(data.data.companyName);
							//业务员
							 $(".yewuyuan").html("");
							 $(".yewuyuan").append("<option value=''></option>");
							 if (data.data.elist) {
							 	for (var i = 0; i < data.data.elist.length; i++) {
							 		$(".yewuyuan").append("<option value='" + data.data.elist[i].id + "'>" + data.data.elist[i].name + "</option>");
							 	}
							 }
	                $.fn.zTree.init($("#publicModelTree"), setting, obj);
	            },
	            error: function (msg) {
	            }
	        });
}
		
//		授权弹出窗树结构
				
function loadmodal(){
		var options = {
		LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
		LoadTableUrl: "/manager/authority/storageInfo/selectStorageList",
		GetRowInfoUrl: "", //编辑时获取数据详细信息接口加载地址
		DelRowUrl: "", // 删除信息接口地址
		isSub:"",//是否有子级表格
		subLoadTableUrl:"",//子级表格数据来源地址
		TableName: "#jqGrid_metaData", //显示表格名称。遵照css选择器书写
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
			var colNames = ['ID','公司名称','部门名称','编码','仓库名称','仓库类别','业务员名称','是否为默认仓','开账日期','是否禁用','备注','新增人','新增时间','修改人','修改时间'];
			var JqGridColModel=[
								{name:'id',index:'id', width:100,align:'center', sorttype:'string',hidden:true,sortable:true},
								{name:'companyName',index:'companyName', width:200,align:'center', sorttype:'string',sortable:false},
								{name:'sectionName',index:'section_name', width:200,align:'center', sorttype:'string',sortable:true},
								{name:'code',index:'code', width:150,align:'center', sorttype:"string",sortable:true},
								{name:'name',index:'name', width:150,align:'center', sorttype:"string",sortable:true},
								{name:'typeCode',index:'TYPE_CODE', width:150,align:'center', sorttype:"string",formatter:'select', editoptions:{value:"3:总仓;1:门店仓;4:售后仓;2:业务仓;5:其他"},sortable:true},
								{name:'salesmanName',index:'salesmanName', width:150,align:'center', sorttype:"string",sortable:true},
								{name:'isDefault',index:'IS_DEFAULT', width:100,align:'center', sorttype:'string',formatter:'select', editoptions:{value:"0:;1:√"},sortable:true},
								{name:'openDateStr',index:'OPEN_DATE', width:200,align:'center', sorttype:'string',sortable:true},
								{name:'status',index:'status', width:100,align:'center',  sorttype:'string',formatter:'select', editoptions:{value:"0:;1:√"},sortable:true},
								{name:'remark',index:'remark', width:100,align:'center',  sorttype:'string',sortable:true},
								{name:'addName',index:'add_name', width:100,align:'center',  sorttype:'string',sortable:true},
								{name:'addTimeStr',index:'CREATE_TIME', width:150,align:'center',  sorttype:'string',sortable:true},
								{name:'updateName',index:'update_name', width:100,align:'center',  sorttype:'string',sortable:true},
								{name:'updateTimeStr',index:'UPDATE_TIME', width:150,align:'center', sorttype:'string',sortable:true}
			                ];
			
			loadtable();
			//加载表格
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
			            sortable:true,	
			            sortorder: 'desc',
			            sortname:"id",
			            rowNum: 20,
			            rowList: [20, 25, 40],
			            pager:options.pager,
			            viewrecords: true,		           
			            multiselect:true,
			           	//cellEdit:true,
			            width: "100%" ,
			            height: $(window).height()*0.54,
						autowidth:true,
						rownumWidth: 35, // the width of the row numbers columns
						shrinkToFit:false,  //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
						ondblClickRow:function(id){
						//双击进入编辑
			   				var delid = id;
						},
						onCellSelect:function(id,index,e){
							var colName=$(options.TableName).jqGrid('getGridParam','colModel')[index].name 
					      	select_name=colName
					      	select_index=index;
							//后续可以通过点击的列名称来弹框等
						},
						onSelectRow:function(id){
							if(id!=lastsel&&lastsel!=''){
								$(options.TableName).jqGrid('saveRow',lastsel,{
									aftersavefunc:function(rowid,response ){
										console.log(id);
									}
									});
							}
							lastsel=id;
						var rec = $(options.TableName).jqGrid('getRowData', id);
						
						},
						
						beforeSelectRow:function(rowid,e){

						},
						afterInsertRow: function (rowid, aData) { //新增一行之后

						},
						gridComplete: function() {
							var ids=$(options.TableName).jqGrid("getDataIDs");

						},
						onSortCol: function (index, iCol, sortorder) {
				            console.log(index);
				            console.log(iCol);
				            console.log(sortorder);
				        },
						loadComplete:function(data){
						},
						loadError:function(xhr,status,error){
						}
						})
		
			}
			//隐藏/显示操作授权
			$('.shou-checkbox').click(function(){
				if($(this).prop('checked')){
					$(options.TableName).setGridParam().showCol("metaMoneySee");
					$(options.TableName).setGridParam().showCol("metaMoneyUpdate");
					$(options.TableName).setGridParam().showCol("clientSee");
		    	}else{
		    		$(options.TableName).setGridParam().hideCol("metaMoneySee");
					$(options.TableName).setGridParam().hideCol("metaMoneyUpdate");
					$(options.TableName).setGridParam().hideCol("clientSee");
		    	}
			});
			
			$(window).bind('click', function saveEdit(e) {
				var rowId = $(e.target).parent("tr").attr("id");
				if (lastsel != "" && lastsel != rowId) { //用于点击其他地方保存正在编辑状态下的行
					if ($(e.target).closest(options.TableName).length == 0) { 
						$(options.TableName).jqGrid('saveRow', lastsel);						
						lastsel='';
					}
				}
			})
			
			//批量删除
			$(document).on('click', '.btnDeleteRow',function(e){
				
				var ids = $(options.TableName).jqGrid('getGridParam','selarrrow');//选中的行id
				var len = ids.length;
				if(len == 0){
					$.zxsaas_plus.showalert("错误","请勾选仓库后再删除!");
					return false;
				}else{
					$.zxsaas_plus.showconfirm("","是否确定删除选中数据?",function(){
						$.request({
						    url:"/manager/authority/storageInfo/delete",
						    type: "POST",
						    data: {"checkedIdList":ids},
						    traditional: true,
						    success: function(data) {
						    	if(data.result==1){
						    		$.zxsaas_plus.showalert("提示",data.desc);
						    	}else{
						    		$.zxsaas_plus.showalert("错误",data.desc);
						    	}
						    	$("#jqGrid_metaData").trigger("reloadGrid");
						    }
						});
					},function(){
					
					});
				}
			});
			
			//修改密码
			$(document).on('click','.rePwd',function(e){
				var reId = $(this).data('id');//获取删除的行id
				$.zxsaas_plus.showconfirm("","重置密码将用户密码设置为：123456<br />是否确定进行此操作",function(){
					//删除密码操作
					$.zxsaas_plus.showalert("","重置密码成功!");
				},function(){
					
				});
			});
			
		
			
			//显示禁用框
			$("#xsjy").click(function(){
				if($('#xsjy').is(':checked')){  
					$(options.TableName).jqGrid('setGridParam',{  
				        datatype:'json',  
				        postData:{"sectionName":$("#sectionName").val(),"name":$("#ckname").val(),"remark":$("#ckremark").val(),"xsjy":1}, //发送数据  
				    }).trigger("reloadGrid"); //重新载入

			}else{ 
				$(options.TableName).jqGrid('setGridParam',{  
			        datatype:'json',  
			        postData:{"sectionName":$("#sectionName").val(),"name":$("#ckname").val(),"remark":$("#ckremark").val(),"xsjy":2}, //发送数据  
			    }).trigger("reloadGrid"); //重新载入
				
			}
		});
			
			
		//批量启动或禁用
		$(document).on('click', '.enableOrDisable',function(e){
			var id=e.target.id;
			var checkedIdList= $("#jqGrid_metaData").jqGrid('getGridParam','selarrrow');//获取选中行的id
			if(checkedIdList.length==0){
				if(id==1){
					$.zxsaas_plus.showalert("提示","请勾选仓库后再禁用!");
				}else{
					$.zxsaas_plus.showalert("提示","请勾选仓库后再启用!");
				}
				return;
			}else{
				$.request({
				    url:"/manager/authority/storageInfo/startStorage",
				    type: "POST",
				    data: {"checkedIdList": checkedIdList,"status":id},
				    traditional: true,
				    success: function(data) {
				    	if(data.result==1){
				    		$.zxsaas_plus.showalert("提示",data.desc);
				    	}else{
				    		$.zxsaas_plus.showalert("错误",data.desc);
				    	}
				    	$("#jqGrid_metaData").trigger("reloadGrid");
				    }
				});
			}
		});
		
		//查询
		$(".btn-success").click(function(){
			var obj;
			if($('#xsjy').is(':checked')){ 
				obj=1
			}
			else{
				obj=2
			}
			$(options.TableName).jqGrid('setGridParam',{  
		        datatype:'json',  
		        postData:{"keyword":$("#keyword").val(),"xsjy":obj}, //发送数据  
		    }).trigger("reloadGrid"); //重新载入
		});	
	
//新增保存(保存并关闭)
$(".saveCK").click(function(){
			var na = $('.nameCheck').val().trim();
			if(na == ''){
				$('.nameCheck').next().html('必填!');
				return;
			}
			var obj=$("#myModal").toJsonObject();
			//状态
			if(obj.status==null){
				obj.status=0
			}
			if(obj.isDefault==null){
				obj.isDefault=0
			}
			if(obj.sectionId == ''){
				$.zxsaas_plus.showalert("提示",'门店不能为空');
				return false;
			}
			
			if($('.storageCla option:selected').text()=='业务仓'){
				if(obj.salesmanId == ''){
					$.zxsaas_plus.showalert("提示",'业务仓必选业务员');
					return false;
				}
			}
			
			$.request({
			    url:"/manager/authority/storageInfo/saveStorage/auth_add",
			    type: "POST",
			    datatype : "json",
			    contentType: "application/json",
			    data: JSON.stringify(obj),
			    traditional: true,
			    success: function(data) {
			    	if(data.result==1){
			    		$.zxsaas_plus.showalert("提示",data.desc);
			    		$('#myModal').modal('hide');
			    		$(".ckData").val("");
			    		$('.addStorage option[value="0"]').prop('selected',true);
			    		$('.updateStorage option[value="0"]').prop('selected',true);
			    		$("#myModal").modal('hide');
				    	$("#jqGrid_metaData").trigger("reloadGrid");
				    	
			    	}else{
			    		$.zxsaas_plus.showalert("错误",data.desc);
			    	}
			    	
			    }
			});
		});
//新增保存（保存并新增 ）
$(".saveCKaddNew").click(function(){
			var na = $('.nameCheck').val().trim();
			if(na == ''){
				$('.nameCheck').next().html('必填!');
				return;
			}
			var obj=$("#myModal").toJsonObject();
			//状态
			if(obj.status==null){
				obj.status=0
			}
			if(obj.isDefault==null){
				obj.isDefault=0
			}
			
			if(obj.sectionId == ''){
				$.zxsaas_plus.showalert("提示",'门店不能为空');
				return false;
			}
			
			if($('.storageCla option:selected').text()=='业务仓'){
				if(obj.salesmanId == ''){
					$.zxsaas_plus.showalert("提示",'业务仓必选业务员');
					return false;
				}
			}
			
			$.request({
			    url:"/manager/authority/storageInfo/saveStorage/auth_add",
			    type: "POST",
			    datatype : "json",
			    contentType: "application/json",
			    data: JSON.stringify(obj),
			    traditional: true,
			    success: function(data) {
			    	if(data.result==1){
			    		$.zxsaas_plus.showalert("提示",data.desc);
			    		$('#myModal').removeData("bs.modal");
			    		$(".ckData").val("");
			    		$('.addStorage option[value="0"]').prop('selected',true);
			    		$('.updateStorage option[value="0"]').prop('selected',true);
				    	$("#jqGrid_metaData").trigger("reloadGrid");
			    	}else{
			    		$.zxsaas_plus.showalert("错误",data.desc);
			    	}
			    	
			    }
			});
		});
//修改保存
$(".updateCK").click(function(){
			var na = $('.nameCheckUp').val().trim();
			if(na == ''){
				$('.nameCheckUp').next().html('必填!');
				return;
			}
			var obj=$("#modalUpdate").toJsonObject();
			//状态
			if(obj.status==null){
				obj.status=0
			}
			if(obj.isDefault==null){
				obj.isDefault=0
			}
			
			if(obj.sectionId == ''){
				$.zxsaas_plus.showalert("提示",'门店不能为空');
				return false;
			}
			
			if($('.storageCla option:selected').text()=='业务仓'){
				if(obj.salesmanId == ''){
					$.zxsaas_plus.showalert("提示",'业务仓必选业务员');
					return false;
				}
			}
			$.request({
			    url:"/manager/authority/storageInfo/saveStorage/auth_update",
			    type: "POST",
			    datatype : "json",
			    contentType: "application/json",
			    data: JSON.stringify(obj),
			    traditional: true,
			    success: function(data) {
			    	if(data.result==1){
			    		$.zxsaas_plus.showalert("提示",data.desc);
			    		$(".ckData").val("");
				    	$("#jqGrid_metaData").trigger("reloadGrid");
			    		$('#modalUpdate').modal('hide');
			    	}else{
			    		$.zxsaas_plus.showalert("错误",data.desc);
			    	}
			    }
			});
			
		});

//修改信息
$('.updateBloc').click(function(){
			$('.nameCheckUp').next().html('');
			$(".codeCheckUp").next().html('');
			var checkedList = [];//存放已勾选行id
			var ids=$(options.TableName).jqGrid('getGridParam','selarrrow');
			console.log(ids);
			if(ids.length != 1){
				$.zxsaas_plus.showalert("错误","一次只能修改一条信息!");
				return false;
			}else{
				 $.request({
			            url: '/manager/authority/storageInfo/selectOne',
			            type: "POST",
					    data:{"id":ids},
					    traditional: true,
			            success: function (data) {
					        updateCode=data.data.obj.code; 
			            	$('#id').val(data.data.obj.id);
							$('#companyName').val(data.data.obj.companyName);
							$('#code').val(data.data.obj.code);
							$('#name').val(data.data.obj.name);
							$('#remark').val(data.data.obj.remark);
							(data.data.obj.status == 0) ? ($('#status').prop({'checked':''})) : ($('#status').prop({'checked':'checked'}));
							(data.data.obj.isDefault == 0) ? ($('#isDefault').prop({'checked':''})) : ($('#isDefault').prop({'checked':'checked'}));
							
							//仓库类型
							 var cklx = document.getElementById("typeCode").options;
							   for (i=0; i<cklx.length; i++){
							      if (cklx[i].value == data.data.obj.typeCode)  // 根据option标签的ID来进行判断  测试的代码这里是两个等号
							      {
							    	  cklx[i].selected = true;
							      }
							   }
							   
							//门店名称
							   var mdmc = document.getElementById("sectionId").options;
							   console.log(mdmc);
							   for (i=0; i<mdmc.length; i++){
							      if (mdmc[i].value == data.data.obj.sectionId)  // 根据option标签的ID来进行判断  测试的代码这里是两个等号
							      {
							    	  mdmc[i].selected = true;
							      }
							   }
							   
							 //业务员
							   var ywy = document.getElementById("salesmanId").options;
							   for (i=0; i<ywy.length; i++){
							      if (ywy[i].value == data.data.obj.salesmanId)  // 根据option标签的ID来进行判断  测试的代码这里是两个等号
							      {
							    	  ywy[i].selected = true;
							      }
							   }
							   
			            },
			            error: function (msg) {
			            }
			        });
			}
		});

}



