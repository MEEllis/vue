		
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
						
						controll(treeNode.id);//通过id调用对应方法 重构表格
					}
				},
				view: {
					showIcon: true
				}
		    }; 
			
			 $.ajax({
		            type: 'Get',
		            url: '../../json/admin/metaDataTree.json',
		            dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
		            success: function (data) {
		                $.fn.zTree.init($("#metaDataTree"), setting, data);
		                //var str = $('#metaDataTree_1_switch').attr('class');
		                //console.log(str); //button level0 switch roots_close
		               // var Class = str.replace('roots','center');
		                //$('#metaDataTree_1_switch').attr('class',Class);
		            },
		            error: function (msg) {
		                alert(" 数据加载失败！" + msg);
		            }
		        });
		
		})();
		
		//通过树的id判断调用加载方法路由
		function controll(str){
			switch (str){
				case 11:
					$('#jqGrid_metaData').setGridParam({url:'../../json/admin/metaData.json'}).trigger('reloadGrid');
					break;
				case 111:
					$('#jqGrid_metaData').setGridParam({url:'../../json/admin/metaData.json'}).trigger('reloadGrid');
					break;
				case 112:
					$('#jqGrid_metaData').setGridParam({url:'../../json/admin/metaData112.json'}).trigger('reloadGrid');
					break;
					
				case 12:
					$('#jqGrid_metaData').setGridParam({url:'../../json/admin/metaData12.json'}).trigger('reloadGrid');
					break;
				case 121:
					$('#jqGrid_metaData').setGridParam({url:'../../json/admin/metaData12.json'}).trigger('reloadGrid');
					break;
				case 122:
					$('#jqGrid_metaData').setGridParam({url:'../../json/admin/metaData112.json'}).trigger('reloadGrid');
					break;
					
				case 13:
					loadmodal13();
					break;
				case 131:
					loadmodal13();
					break;
				case 132:
					loadmodal132();
					break;
				case 133:
					loadmodal133();
					break;
			}
		}
		
		
		function loadmodal()
			{
		var options = {
		LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
		LoadTableUrl: "../../json/admin/metaData.json",
		//LoadTableUrl: "../../cw/qc/getSubject", //表格数据加载接口地址
		GetRowInfoUrl: "", //编辑时获取数据详细信息接口加载地址
		//LoadTableFomatUrl:"../../json/T_roles.json",
		//LoadTableFomatUrl: "../../", //获取表格显示格式数据加载地址
		//SaveEditUrl: "", //新增或修改后保存数据接口地址
		//SaveAddUrl: "", //新增或修改后保存数据接口地址
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
			var colNames = ['操作名称','ID','查询','新增','修改','删除','过账','红冲','发起','审批','金额查看','金额编辑','客户查看'];
			var JqGridColModel=[
								{name:'metaName',index:'metaName', width:147,align:'center',sorttype:"string",sortable:false},
								{name:'blocId',index:'blocId', width:55,align:'center', sorttype:'string',hidden:true,sortable:false},
								{name:'metaSearch',index:'metaSearch', width:55,align:'center', sorttype:'string',formatter:'select', editoptions:{value:"0:√;1:"},sortable:false},
								{name:'metaAdd',index:'metaAdd', width:55,align:'center', sorttype:'string',formatter:'select', editoptions:{value:"0:√;1:"},sortable:false},
								{name:'metaUpdate',index:'metaUpdate', width:55,align:'center', sorttype:'string',formatter:'select', editoptions:{value:"0:√;1:"},sortable:false},
								{name:'metaDelete',index:'metaDelete', width:55,align:'center', sorttype:'string',formatter:'select', editoptions:{value:"0:√;1:"},sortable:false},
								{name:'metaGuo',index:'metaGuo', width:55,align:'center', sorttype:'string',formatter:'select', editoptions:{value:"0:√;1:"},sortable:false},
								{name:'metaHong',index:'metaHong', width:55,align:'center', sorttype:'string',formatter:'select', editoptions:{value:"0:√;1:"},sortable:false},
								{name:'metaFa',index:'metaFa', width:55,align:'center',  sorttype:'string',formatter:'select', editoptions:{value:"0:√;1:"},sortable:false},
								{name:'metaShen',index:'metaShen', width:55,align:'center',  sorttype:'string',formatter:'select', editoptions:{value:"0:√;1:"},sortable:false},
								{name:'metaMoneySee',index:'metaMoneySee', width:80,align:'center',  sorttype:'string',formatter:'select', editoptions:{value:"0:√;1:"},sortable:false},
								{name:'metaMoneyUpdate',index:'metaMoneyUpdate', width:80,align:'center',  sorttype:'string',formatter:'select', editoptions:{value:"0:√;1:"},sortable:false},
								{name:'clientSee',index:'clientSee', width:80,align:'center', sorttype:'string',formatter:'select', editoptions:{value:"0:√;1:"},sortable:false}
			                ];
			
			loadtable();
			//加载表格
		
			/*$.getJSON(options.LoadTableUrl,function(t_datat){
				mydata=t_datat;
				//$(options.TableName).setGridParam({data: mydata}).trigger('reloadGrid');  
			});*/
			function loadtable(){
//				$.post(options.LoadTableUrl,{},function(r){
//					if(r.data.rows!=null){
//						 mydata=r.data;
//					//console.log(mydata);
					$(options.TableName).jqGrid({
						url:options.LoadTableUrl,
						mtype:"GET",
//						datatype: "jsonstring",
//				        datastr: mydata,
						datatype: "json",
						//data:mydata,
						//datatype:"local",						
						//editurl: 'clientArray',
								
						jsonReader  : {	
								root: "rows",
								repeatitems: false
									},
						//cellsubmit: 'clientArray',//单元格保存内容的位置
						colNames:colNames,          
			            colModel:JqGridColModel,
			            //loadonce: false,
			            sortable:false,			            
			            //rownumbers:true,
			            //loadonce: true,
			            rowNum: 20,
			            rowList: [20, 25, 40],
			            pager:options.pager,
			            viewrecords: true,		           
//			            multiselect:true,
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
							//console.log(data);
							var len = data.rows.length;
							//var selectedRowIds = $(options.TableName).jqGrid("getRowData");  
							//var len = selectedRowIds.length;  
							//表格加载完成后 默认隐藏禁用行
							/*for(var i = 1;i <= len ;i ++) {  
								var gridData = $(options.TableName).jqGrid("getRowData",i);
								if(gridData.blocDouble == '0'){
									console.log(gridData.blocId + '...hide...');
									var index = gridData.blocDo.indexOf('data-id');
									var rowId = gridData.blocDo.substring(index + 9,gridData.blocDo.length-2);
									$(options.TableName).setRowData(rowId,null,{display: 'none'});//隐藏禁用
								}
							} */ 
							//表格加载完成 默认隐藏的列
							$(options.TableName).setGridParam().hideCol("metaMoneySee");
							$(options.TableName).setGridParam().hideCol("metaMoneyUpdate");
							$(options.TableName).setGridParam().hideCol("clientSee");
							
						},
						loadError:function(xhr,status,error){
							//console.log(status)
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
			
			/*function addAndDelete(cellvalue, options, rowObjec){
				var addAndDel = '<div class="operating" data-id="' + options.rowId + '"><span style="margin-right:0.7rem" id="remove_row" title="添加商品" class="glyphicon glyphicon-plus"></span><span class="glyphicon glyphicon-trash" aria-hidden="true" id="add_row" title="删除行"></span></div>';
				return addAndDel;
			}*/
			
			//通过树的id判断调用加载方法路由
			function controllAdd(str){
				switch (str){
					case 11:
						$('#jqGrid_roleMsgAdd').setGridParam({url:'../../json/admin/metaData112.json'}).trigger('reloadGrid');
						break;
					case 111:
						$('#jqGrid_roleMsgAdd').setGridParam({url:'../../json/admin/metaData112.json'}).trigger('reloadGrid');
						break;
					case 112:
						$('#jqGrid_roleMsgAdd').setGridParam({url:'../../json/admin/metaData.json'}).trigger('reloadGrid');
						break;
						
					case 12:
						$('#jqGrid_roleMsgAdd').setGridParam({url:'../../json/admin/metaData12.json'}).trigger('reloadGrid');
						break;
					case 121:
						$('#jqGrid_roleMsgAdd').setGridParam({url:'../../json/admin/metaData12.json'}).trigger('reloadGrid');
						break;
					case 122:
						$('#jqGrid_roleMsgAdd').setGridParam({url:'../../json/admin/metaData112.json'}).trigger('reloadGrid');
						break;
						
					case 13:
						loadmodal13();
						break;
					case 131:
						loadmodal13();
						break;
					case 132:
						loadmodal132();
						break;
					case 133:
						loadmodal133();
						break;
				}
			}
			//通过树的id判断调用加载方法路由
			function controllUpdate(str){
				switch (str){
					case 11:
						$('#jqGrid_roleMsgUpdate').setGridParam({url:'../../json/admin/metaData112.json'}).trigger('reloadGrid');
						break;
					case 111:
						$('#jqGrid_roleMsgUpdate').setGridParam({url:'../../json/admin/metaData112.json'}).trigger('reloadGrid');
						break;
					case 112:
						$('#jqGrid_roleMsgUpdate').setGridParam({url:'../../json/admin/metaData.json'}).trigger('reloadGrid');
						break;
						
					case 12:
						$('#jqGrid_roleMsgUpdate').setGridParam({url:'../../json/admin/metaData12.json'}).trigger('reloadGrid');
						break;
					case 121:
						$('#jqGrid_roleMsgUpdate').setGridParam({url:'../../json/admin/metaData12.json'}).trigger('reloadGrid');
						break;
					case 122:
						$('#jqGrid_roleMsgUpdate').setGridParam({url:'../../json/admin/metaData112.json'}).trigger('reloadGrid');
						break;
						
					case 13:
						loadmodal13();
						break;
					case 131:
						loadmodal13();
						break;
					case 132:
						loadmodal132();
						break;
					case 133:
						loadmodal133();
						break;
				}
			}
			
			
			
			//新增内置角色信息
			$('.add').on('click',function(e){
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
							
							controllAdd(treeNode.id);//通过id调用对应方法 重构表格
						}
					},
					view: {
						showIcon: true
					}
			    }; 
				
				 $.ajax({
			            type: 'Get',
			            url: '../../json/admin/metaDataTree.json',
			            dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
			            success: function (data) {
			                $.fn.zTree.init($("#roleDataTree"), setting, data);
			                //var str = $('#roleDataTree_1_switch').attr('class');
			                //console.log(str); //button level0 switch roots_close
			                //var Class = str.replace('roots','center');
			                //$('#roleDataTree_1_switch').attr('class',Class);
			            },
			            error: function (msg) {
			                alert(" 数据加载失败！" + msg);
			            }
			        });
			        
					var options = {
						LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
						LoadTableUrl: "../../json/admin/metaData12.json",
						//LoadTableUrl: "../../cw/qc/getSubject", //表格数据加载接口地址
						GetRowInfoUrl: "", //编辑时获取数据详细信息接口加载地址
						//LoadTableFomatUrl:"../../json/T_roles.json",
						//LoadTableFomatUrl: "../../", //获取表格显示格式数据加载地址
						//SaveEditUrl: "", //新增或修改后保存数据接口地址
						//SaveAddUrl: "", //新增或修改后保存数据接口地址
						DelRowUrl: "", // 删除信息接口地址
						isSub:"",//是否有子级表格
						subLoadTableUrl:"",//子级表格数据来源地址
						//ModouleName: "", //模块名称。遵照css选择器书写  systemSet_companyParameter
						TableName: "#jqGrid_roleMsgAdd", //显示表格名称。遵照css选择器书写
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
							var colNames = ['操作名称','ID','查询','新增','修改','删除','过账','红冲','发起','审批','金额查看','金额编辑','客户查看'];
							var JqGridColModel=[
												{name:'metaName',index:'metaName', width:147,align:'center',sorttype:"string",sortable:false},
												{name:'blocId',index:'blocId', width:55,align:'center', sorttype:'string',hidden:true,sortable:false},
												{name:'metaSearch',index:'metaSearch', width:55,align:'center', sorttype:'string',formatter:checkBox,sortable:false},
												{name:'metaAdd',index:'metaAdd', width:55,align:'center', sorttype:'string',formatter:checkBox,sortable:false},
												{name:'metaUpdate',index:'metaUpdate', width:55,align:'center', sorttype:'string',formatter:checkBox,sortable:false},
												{name:'metaDelete',index:'metaDelete', width:55,align:'center', sorttype:'string',formatter:checkBox,sortable:false},
												{name:'metaGuo',index:'metaGuo', width:55,align:'center', sorttype:'string',formatter:checkBox,sortable:false},
												{name:'metaHong',index:'metaHong', width:55,align:'center', sorttype:'string',formatter:checkBox,sortable:false},
												{name:'metaFa',index:'metaFa', width:55,align:'center',  sorttype:'string',formatter:checkBox,sortable:false},
												{name:'metaShen',index:'metaShen', width:55,align:'center',  sorttype:'string',formatter:checkBox,sortable:false},
												{name:'metaMoneySee',index:'metaMoneySee', width:80,align:'center',  sorttype:'string',formatter:checkBox,sortable:false},
												{name:'metaMoneyUpdate',index:'metaMoneyUpdate', width:80,align:'center',  sorttype:'string',formatter:checkBox,sortable:false},
												{name:'clientSee',index:'clientSee', width:80,align:'center', sorttype:'string', formatter: checkBox,editoptions:{value:'1'},sortable:false}
							                ];
							
							loadtable();
							
							//加载表格
						
							/*$.getJSON(options.LoadTableUrl,function(t_datat){
								mydata=t_datat;
								//$(options.TableName).setGridParam({data: mydata}).trigger('reloadGrid');  
							});*/
							function loadtable(){
				//				$.post(options.LoadTableUrl,{},function(r){
				//					if(r.data.rows!=null){
				//						 mydata=r.data;
				//					//console.log(mydata);
									$(options.TableName).jqGrid({
										url:options.LoadTableUrl,
										mtype:"GET",
				//						datatype: "jsonstring",
				//				        datastr: mydata,
										datatype: "json",
										//data:mydata,
										//datatype:"local",						
										//editurl: 'clientArray',
												
										jsonReader  : {	
												root: "rows",
												repeatitems: false
													},
										//cellsubmit: 'clientArray',//单元格保存内容的位置
										colNames:colNames,          
							            colModel:JqGridColModel,
							            //loadonce: false,
							            sortable:false,			            
							            //rownumbers:true,
							            //loadonce: true,
							            rowNum: 20,
							            rowList: [20, 25, 40],
							            pager:options.pager,
							            viewrecords: true,		           
				//			            multiselect:true,
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
											//console.log(data);
											var len = data.rows.length;
											//var selectedRowIds = $(options.TableName).jqGrid("getRowData");  
											//var len = selectedRowIds.length;  
											//表格加载完成后 默认隐藏禁用行
											/*for(var i = 1;i <= len ;i ++) {  
												var gridData = $(options.TableName).jqGrid("getRowData",i);
												if(gridData.blocDouble == '0'){
													console.log(gridData.blocId + '...hide...');
													var index = gridData.blocDo.indexOf('data-id');
													var rowId = gridData.blocDo.substring(index + 9,gridData.blocDo.length-2);
													$(options.TableName).setRowData(rowId,null,{display: 'none'});//隐藏禁用
												}
											} */ 
											//表格加载完成 默认隐藏的列
											$(options.TableName).setGridParam().hideCol("metaMoneySee");
											$(options.TableName).setGridParam().hideCol("metaMoneyUpdate");
											$(options.TableName).setGridParam().hideCol("clientSee");
											
										},
										loadError:function(xhr,status,error){
											//console.log(status)
										}
										})
						
							}
					//隐藏/显示操作授权
					$('.shou-checkbox-add').click(function(){
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
			
			
			
			});
			
			//修改内置角色信息
			$('.update').on('click',function(e){
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
							
							controllUpdate(treeNode.id);//通过id调用对应方法 重构表格
						}
					},
					view: {
						showIcon: true
					}
			    }; 
				
				 $.ajax({
			            type: 'Get',
			            url: '../../json/admin/metaDataTree.json',
			            dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
			            success: function (data) {
			                $.fn.zTree.init($("#roleUpdateTree"), setting, data);
//			                var str = $('#roleUpdateTree_1_switch').attr('class');
//			                var Class = str.replace('roots','center');
//			                $('#roleUpdateTree_1_switch').attr('class',Class);
			            },
			            error: function (msg) {
			                alert(" 数据加载失败！" + msg);
			            }
			        });
			        
					var options = {
						LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
						LoadTableUrl: "../../json/admin/metaData12.json",
						//LoadTableUrl: "../../cw/qc/getSubject", //表格数据加载接口地址
						GetRowInfoUrl: "", //编辑时获取数据详细信息接口加载地址
						//LoadTableFomatUrl:"../../json/T_roles.json",
						//LoadTableFomatUrl: "../../", //获取表格显示格式数据加载地址
						//SaveEditUrl: "", //新增或修改后保存数据接口地址
						//SaveAddUrl: "", //新增或修改后保存数据接口地址
						DelRowUrl: "", // 删除信息接口地址
						isSub:"",//是否有子级表格
						subLoadTableUrl:"",//子级表格数据来源地址
						//ModouleName: "", //模块名称。遵照css选择器书写  systemSet_companyParameter
						TableName: "#jqGrid_roleMsgUpdate", //显示表格名称。遵照css选择器书写
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
							var colNames = ['操作名称','ID','查询','新增','修改','删除','过账','红冲','发起','审批','金额查看','金额编辑','客户查看'];
							var JqGridColModel=[
												{name:'metaName',index:'metaName', width:147,align:'center',sorttype:"string",sortable:false},
												{name:'blocId',index:'blocId', width:55,align:'center', sorttype:'string',hidden:true,sortable:false},
												{name:'metaSearch',index:'metaSearch', width:55,align:'center', sorttype:'string',formatter:checkBox,sortable:false},
												{name:'metaAdd',index:'metaAdd', width:55,align:'center', sorttype:'string',formatter:checkBox,sortable:false},
												{name:'metaUpdate',index:'metaUpdate', width:55,align:'center', sorttype:'string',formatter:checkBox,sortable:false},
												{name:'metaDelete',index:'metaDelete', width:55,align:'center', sorttype:'string',formatter:checkBox,sortable:false},
												{name:'metaGuo',index:'metaGuo', width:55,align:'center', sorttype:'string',formatter:checkBox,sortable:false},
												{name:'metaHong',index:'metaHong', width:55,align:'center', sorttype:'string',formatter:checkBox,sortable:false},
												{name:'metaFa',index:'metaFa', width:55,align:'center',  sorttype:'string',formatter:checkBox,sortable:false},
												{name:'metaShen',index:'metaShen', width:55,align:'center',  sorttype:'string',formatter:checkBox,sortable:false},
												{name:'metaMoneySee',index:'metaMoneySee', width:80,align:'center',  sorttype:'string',formatter:checkBox,sortable:false},
												{name:'metaMoneyUpdate',index:'metaMoneyUpdate', width:80,align:'center',  sorttype:'string',formatter:checkBox,sortable:false},
												{name:'clientSee',index:'clientSee', width:80,align:'center', sorttype:'string', formatter: checkBox,editoptions:{value:'1'},sortable:false}
							                ];
							
							loadtable();
							
							//加载表格
						
							/*$.getJSON(options.LoadTableUrl,function(t_datat){
								mydata=t_datat;
								//$(options.TableName).setGridParam({data: mydata}).trigger('reloadGrid');  
							});*/
							function loadtable(){
				//				$.post(options.LoadTableUrl,{},function(r){
				//					if(r.data.rows!=null){
				//						 mydata=r.data;
				//					//console.log(mydata);
									$(options.TableName).jqGrid({
										url:options.LoadTableUrl,
										mtype:"GET",
				//						datatype: "jsonstring",
				//				        datastr: mydata,
										datatype: "json",
										//data:mydata,
										//datatype:"local",						
										//editurl: 'clientArray',
												
										jsonReader  : {	
												root: "rows",
												repeatitems: false
													},
										//cellsubmit: 'clientArray',//单元格保存内容的位置
										colNames:colNames,          
							            colModel:JqGridColModel,
							            //loadonce: false,
							            sortable:false,			            
							            //rownumbers:true,
							            //loadonce: true,
							            rowNum: 20,
							            rowList: [20, 25, 40],
							            pager:options.pager,
							            viewrecords: true,		           
				//			            multiselect:true,
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
											//console.log(data);
											var len = data.rows.length;
											//var selectedRowIds = $(options.TableName).jqGrid("getRowData");  
											//var len = selectedRowIds.length;  
											//表格加载完成后 默认隐藏禁用行
											/*for(var i = 1;i <= len ;i ++) {  
												var gridData = $(options.TableName).jqGrid("getRowData",i);
												if(gridData.blocDouble == '0'){
													console.log(gridData.blocId + '...hide...');
													var index = gridData.blocDo.indexOf('data-id');
													var rowId = gridData.blocDo.substring(index + 9,gridData.blocDo.length-2);
													$(options.TableName).setRowData(rowId,null,{display: 'none'});//隐藏禁用
												}
											} */ 
											//表格加载完成 默认隐藏的列
											$(options.TableName).setGridParam().hideCol("metaMoneySee");
											$(options.TableName).setGridParam().hideCol("metaMoneyUpdate");
											$(options.TableName).setGridParam().hideCol("clientSee");
											
										},
										loadError:function(xhr,status,error){
											//console.log(status)
										}
										})
						
							}
					//隐藏/显示操作授权
					$('.shou-checkbox-update').click(function(){
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
			
			
			
			});
			
			
			//启用
			$(document).on('click', '.qiyon',function(e){
				var checkedList = [];//存放已勾选行id
				$('.del').each(function (index, domEle) { 
					  // domEle == this 
					($(domEle).prop('checked')) ? (checkedList.push($(domEle).data('id'))) : '';
				});
				
				var len = checkedList.length;
				if(len == 0){
					$.zxsaas_plus.showalert("错误","请勾选公司后再启用!");
					return false;
				}else{
					for(var i = 0;i < len;i ++){
						//$(options.TableName).jqGrid('delRowData', checkedList[0]);
						//checkedList.shift();
						//调用后台方法修改字段
					}
					alert('启用成功');
				}
			});
			
			//禁用
			$(document).on('click', '.jinyon',function(e){
				var checkedList = [];//存放已勾选行id
				$('.del').each(function (index, domEle) { 
					  // domEle == this 
					($(domEle).prop('checked')) ? (checkedList.push($(domEle).data('id'))) : '';
				});
				
				var len = checkedList.length;
				if(len == 0){
					$.zxsaas_plus.showalert("错误","请勾选公司后再禁用!");
					return false;
				}else{
					for(var i = 0;i < len;i ++){
						//$(options.TableName).jqGrid('delRowData', checkedList[0]);
						//checkedList.shift();
						//调用后台方法修改字段
					}
					alert('禁用成功');
				}
			});
			
			//修改信息
//			$('.updateBloc').click(function(){
//				var checkedList = [];//存放已勾选行id
//				$('.del').each(function (index, domEle) { 
//					  // domEle == this 
//					($(domEle).prop('checked')) ? (checkedList.push($(domEle).data('id'))) : '';
//				});
//				var len = checkedList.length;
//				var gridData = $(options.TableName).jqGrid("getRowData",checkedList[0]);//获取被选中的一行数据
//				//var id = gridData.blocId;
//				//console.log('id:' + id);
//				if(len != 1){
//					$.zxsaas_plus.showalert("错误","一次只能修改一条信息!");
//					return false;
//				}else{
//					$('.blocId').val(gridData.blocId);
//					$('.blocPer').val(gridData.blocPer);
//					$('.blocTime').val(gridData.blocTime);
//					$('.blocUpdate').val(gridData.blocUpdate);
//					$('.blocUpdateTime').val(gridData.blocUpdateTime);
//					$('.blocNo').val(gridData.blocNo);
//					$('.blocName').val(gridData.blocName);
//					$('.blocMark').val(gridData.blocMark);
//					$('.blocAdmin').val(gridData.blocAdmin);
//					$('.blocPwd').html(gridData.blocPwd);
//					//$('.blocDouble').val(gridData.blocDouble);
//					if(gridData.blocDouble == '1'){
//						//不禁用
//						$('.blocDouble').prop({'checked':''});
//					}else{
//						$('.blocDouble').prop({'checked':'checked'});
//					}
//					
//					return true;
//				}
//			});
			
			//显示隐藏禁用
			//  0 : 禁用       
			//  1 : 不禁用
			$(document).on('click','.double',function(e){
				//console.log(e.target);
				var selectedRowIds = $(options.TableName).jqGrid("getRowData");  
				var len = selectedRowIds.length;  
				if($('input.double').prop('checked')){
					for(var i = 1;i <= len ;i ++) {  
						var gridData = $(options.TableName).jqGrid("getRowData",i);
						if(gridData.blocDouble == '0'){
							console.log(gridData.blocDo + '、、、show、、、');
							var index = gridData.blocDo.indexOf('data-id');
							var rowId = gridData.blocDo.substring(index + 9,gridData.blocDo.length-2);
							$(options.TableName).setRowData(rowId,null,{display: 'table-row'});//显示禁用
						}
					}  
				}else{
					for(var i = 1;i <= len ;i ++) {  
						var gridData = $(options.TableName).jqGrid("getRowData",i);
						if(gridData.blocDouble == '0'){
							console.log(gridData.blocId + '...hide...');
							var index = gridData.blocDo.indexOf('data-id');
							var rowId = gridData.blocDo.substring(index + 9,gridData.blocDo.length-2);
							$(options.TableName).setRowData(rowId,null,{display: 'none'});//隐藏禁用
						}
					}  
				}
			});
			
			
			//列表    重置密码
			function rePwd(cellvalue, options, rowObjec)
			{
				console.log(options + ';;;;;');
				return '<span class="rePwd" data-blocId="' + rowObjec.blocId + '" data-id="' + options.rowId + '" style="color:#00CCFF;cursor:pointer">重置密码</span>';
			}
			
			//列表复选框
			function checkBox(cellvalue, options, rowObjec)
			{
				return '<input type="checkbox" class="del" data-blocId="' + rowObjec.blocId + '"  data-id="' + options.rowId + '" />';
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
		

		$(document).on("click",".btnbox button[data-eventname='printbtn']",function(event){
			$.zxsaas_plus.showalert("表格打印操作", "表格打印操作咱未完成，敬请期待");
			
		});
		$(document).on("click",".btnbox button[data-eventname='exportTablename']",function(event){
			$.zxsaas_plus.showalert("表格导出操作", "表格导出操作咱未完成，敬请期待");
			
		});
}
		
