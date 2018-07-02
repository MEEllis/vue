(function(){
	$.request({
	    url:"/manager/authority/jobInfo/initJob",
	    type: "get",
	    traditional: true,
	    success: function(data) {
	    	$(".groupName").val(data.data.groupName);
	    	$(".companyName").val(data.data.companyName);
	    }
	});
	$(".storageCode,.storageName,.storageCodeUpdate,.storageNameUpdate").focus(function(e){
		$(this).next().html('');
	});
})();

$(document).on('click','.add',function(e){
	$('#myModal').modal('show');
	$('.storageCode').next().html('');
	$(".storageName").next().html('');
});
		
//初始化数据

function loadmodal(){
		var options = {
		LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
		LoadTableUrl: "/manager/authority/jobInfo/selectJobList",
		GetRowInfoUrl: "", //编辑时获取数据详细信息接口加载地址
		DelRowUrl: "", // 删除信息接口地址
		isSub:"",//是否有子级表格
		subLoadTableUrl:"",//子级表格数据来源地址
		//ModouleName: "", //模块名称。遵照css选择器书写  systemSet_companyParameter
		TableName: "#jqGrid_metaData", //显示表格名称。遵照css选择器书写
		iconJsonUrl:"../json/icon.json",
		btnbox: ".btnbox ",//功能按钮存放容器。遵照css选择器书写	
		pager:"#jqGridPager"
//		inputbox: ".inputbox" //搜索条件框存放容器。遵照css选择器书写
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
			var colNames = ['ID','公司名称','编码','职位名称','是否禁用','备注','新增人','新增时间','修改人','修改时间'];
			var JqGridColModel=[
								{name:'id',index:'id', width:100,align:'center', sorttype:'string',hidden:true,sortable:false},
								{name:'companyName',index:'companyName', width:200,align:'center', sorttype:'string',sortable:false},
								{name:'code',index:'code', width:150,align:'center', sorttype:"string",sortable:false},
								{name:'name',index:'name', width:150,align:'center', sorttype:"string",sortable:false},
								{name:'status',index:'status', width:100,align:'center', sorttype:'string',formatter:'select', editoptions:{value:"0:;1:√"},sortable:false},
								{name:'remark',index:'remark', width:100,align:'center',  sorttype:'string',sortable:false},
								{name:'empCreateName',index:'createUid', width:100,align:'center',  sorttype:'string',sortable:false},
								{name:'addTimeStr',index:'addTimeStr', width:150,align:'center',  sorttype:'string',sortable:false},
								{name:'empUpdateName',index:'updateUid', width:100,align:'center',  sorttype:'string',sortable:false},
								{name:'updateTimeStr',index:'updateTimeStr', width:150,align:'center', sorttype:'string',sortable:false}
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
			            rowNum: 10,
			            rowList: [10, 20, 30],
			            pager:options.pager,
			            viewrecords: true,		           
			            multiselect:true,
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
						loadComplete:function(data){
						},
						loadError:function(xhr,status,error){
						}
						})
		
			}
			//$(options.TableName).trigger("reloadGrid");
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
			
			
			//修改信息
			$('.updateBloc').click(function(){
				var checkedList = [];//存放已勾选行id
				var ids=$(options.TableName).jqGrid('getGridParam','selarrrow');
				if(ids.length != 1){
					$.zxsaas_plus.showalert("错误","一次只能修改一条信息!");
					return false;
				}else{
					$('#modalUpdate').modal('show');
					$('.storageCodeUpdate').next().html('');
					$(".storageNameUpdate").next().html('');
					var gridData = $(options.TableName).jqGrid("getRowData",ids);//获取被选中的一行数据
					$('#id').val(gridData.id);
					$('#companyName').val(gridData.companyName);
					$('#code').val(gridData.code);
					$('#name').val(gridData.name);
					$('#remark').val(gridData.remark);
					//$('.depDouble').val(gridData.depDouble);
					(gridData.status == 0) ? ($('#updateSfjy').prop({'checked':''})) : ($('#updateSfjy').prop({'checked':'checked'}));
					
					return true;
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
			        postData:{"keyword":$("#jobSelect").val(),"xsjy":obj}, //发送数据  
			    }).trigger("reloadGrid"); //重新载入
			});	
		
			//显示禁用框
			$("#xsjy").click(function(){
				if($('#xsjy').is(':checked')){
			        $(options.TableName).jqGrid('setGridParam',{  
				        datatype:'json',  
				        postData:{"keyword":$("#jobSelect").val(),"xsjy":1}, //发送数据  
				    }).trigger("reloadGrid"); //重新载入

			}else{ 
				$(options.TableName).jqGrid('setGridParam',{  
			        datatype:'json',  
			        postData:{"keyword":$("#jobSelect").val(),"xsjy":2}, //发送数据  
			    }).trigger("reloadGrid"); //重新载入
				
			}
		});

			//批量启动或禁用
		$(document).on('click', '.enableOrDisable',function(e){
				var id=e.target.id;
				var checkedIdList= $("#jqGrid_metaData").jqGrid('getGridParam','selarrrow');//获取选中行的id
				console.log(checkedIdList);
				if(checkedIdList.length==0){
					if(id==1){
						$.zxsaas_plus.showalert("提示","请勾选部门后再禁用!");
					}else{
						$.zxsaas_plus.showalert("提示","请勾选部门后再启用!");
					}
					return;
				}else{
					$.request({
					    url:"/manager/authority/jobInfo/startJob",
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
			
			//删除按钮
		$(".btnDeleteRow").click(function(){
				var checkedList = [];//存放已勾选行id
				var ids=$(options.TableName).jqGrid('getGridParam','selarrrow');
					$.zxsaas_plus.showconfirm("","是否确定删除选中数据?",function(){
						$.request({
						    url:"/manager/authority/jobInfo/delete",
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
			});
		//新增保存
		$(".saveJob").click(function(){
			var na = $('.storageName').val().trim();
			if(na == ''){
				$('.storageName').next().html('必填!');
				return;
			}
			var obj=$("#myModal").toJsonObject();
			//状态
			if(obj.status==null){
				obj.status=0
			}
			$.request({
			    url:"/manager/authority/jobInfo/saveJob/auth_add",
			    type: "POST",
			    datatype : "json",
			    contentType: "application/json",
			    data: JSON.stringify(obj),
			    traditional: true,
			    success: function(data) {
			    	if(data.result==1){
			    		$.zxsaas_plus.showalert("提示",data.desc);
			    		$(".jobData").val("");
				    	$("#jqGrid_metaData").trigger("reloadGrid");
				    	$('#myModal').modal('hide');
			    	}else{
			    		$.zxsaas_plus.showalert("错误",data.desc);
			    	}
			    }
			});
		});
		//修改保存
		$(".updateJob").click(function(){
			var na = $('.storageNameUpdate').val().trim();
			if(na == ''){
				$('.storageNameUpdate').next().html('必填!');
				return;
			}
			var obj=$("#modalUpdate").toJsonObject();
			//状态
			if(obj.status==null){
				obj.status=0
			}
			console.log(obj);
			$.request({
			    url:"/manager/authority/jobInfo/saveJob/auth_update",
			    type: "POST",
			    datatype : "json",
			    contentType: "application/json",
			    data: JSON.stringify(obj),
			    traditional: true,
			    success: function(data) {
			    	if(data.result==1){
			    		$.zxsaas_plus.showalert("提示",data.desc);
			    		$(".sectionData").val("");
				    	$("#jqGrid_metaData").trigger("reloadGrid");
			    		$('#modalUpdate').modal('hide');
			    	}else{
			    		$.zxsaas_plus.showalert("错误",data.desc);
			    	}
			    }
			});
			
		});
}
		
