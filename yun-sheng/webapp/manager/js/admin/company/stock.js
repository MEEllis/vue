	(function(){
			//ztree
			var areaStr = '';//存储零时选中量
			var areaList = [];//存储零时选中量
			var tempStr=""; 
			var result = [];
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
						console.log();
						//controll(treeNode.id);//通过id调用对应方法 重构表格
						
						//单击树节点动态加载相应内容
						$.ajax({
							type: 'Get',
				            url: '',
				            dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
				            success: function (data) {
//				                var tableStr = 
//				                	'<table>' + 
//				                		'<tr><td>操作名称</td><td><input type="checkbox" class="checkAll" /></td></tr>' + 
//										'<tr><td>采购订单</td><td><input type="checkbox" class="checkOne" /></td></tr>' + 
//										'<tr><td>采购入库</td><td><input type="checkbox" class="checkOne" /></td></tr>' + 
//										'<tr><td>采购退货</td><td><input type="checkbox" class="checkOne" /></td></tr>' + 
//										'<tr><td>采购换货</td><td><input type="checkbox" class="checkOne" /></td></tr>' + 
//										'<tr><td>获赠单</td><td><input type="checkbox" class="checkOne" /></td></tr>' + 
//										'<tr><td>供应商报价单</td><td><input type="checkbox" class="checkOne" /></td></tr>' + 
//										'<tr><td>供应商返利单</td><td><input type="checkbox" class="checkOne" /></td></tr>' + 
//										'<tr><td>受托入库单</td><td><input type="checkbox" class="checkOne" /></td></tr>' + 
//										'<tr><td>受托退货单</td><td><input type="checkbox" class="checkOne" /></td></tr>' + 
//										'<tr><td>受托调价单</td><td><input type="checkbox" class="checkOne" /></td></tr>' + 
//										'<tr><td>受托结算单</td><td><input type="checkbox" class="checkOne" /></td></tr>' + 
//									'</table>';
//								
								//$('.jqGrid_wrap').html(tableStr);
				                
				                
				            },
				            error: function (msg) {
				                alert(" 数据加载失败！" + msg);
				            }
						});
					},
					onCheck: function (event, treeId, treeNode) {
						console.log();
						var tId = treeNode.id;
						var tName = treeNode.name;
//						console.log(tName.indexOf(areaStr));
//						if(tName.indexOf(areaStr) != -1){
//							areaStr += tName + ';';
//						}
						areaList = areaStr.split(';');
//						for(var i in areaList)  
//			            {  
//			                 if(areaList[i] != tempStr)  
//			                 {  
//			                      result.push(areaList[i]);  
//			                      tempStr=areaList[i];  
//			                 }  
//			                 else  
//			                 {  
//			                      continue;  
//			                 }  
//			            }  
						for(var i = 0; i < areaList.length; i++){
							(areaList[i] != tName) && (areaStr += tName + ';');
						}
				        console.log(areaStr); 
						$('.areaSearch').val(areaStr);
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
			
			 $.ajax({
		            type: 'Get',
		            url: '../../../json/admin/company/areaDataTree.json',
		            dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
		            success: function (data) {
		                $.fn.zTree.init($("#publicModelTree"), setting, data);
		                var str = $('#publicModelTree_1_switch').attr('class');
		                //console.log(str); //button level0 switch roots_close
		                var Class = str.replace('roots','center');
		                $('#publicModelTree_1_switch').attr('class',Class);
		                
		                var zTree = $.fn.zTree.getZTreeObj("publicModelTree");
		                zTree.expandAll(true);//展开全部节点
//						var node = zTree.getNodeByParam("id",12);//选中某节点
						//zTree.selectNode(node);
//						zTree.checkNode(node);
		                
		                
		            },
		            error: function (msg) {
		                alert(" 数据加载失败！" + msg);
		            }
		        });
		
		})();	
		
		
		
		/**
		 * 串号库存
		 */
		function loadmodal_no()
			{
		var options = {
		LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
		LoadTableUrl: "../../../json/admin/company/money.json",
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
		TableName: "#jqGrid_goods_no", //显示表格名称。遵照css选择器书写
		iconJsonUrl:"../json/icon.json",
		btnbox: ".btnbox ",//功能按钮存放容器。遵照css选择器书写	
		pager:"#jqGridPager_no"
//		inputbox: ".inputbox" //搜索条件框存放容器。遵照css选择器书写
		};
		$("#datetimepickerStart").datetimepicker({
		  lang:"ch",           //语言选择中文
	      format:"Y-m-d",      //格式化日期
	      timepicker:false,    //关闭时间选项
	      todayButton:false    //关闭选择今天按钮
		});
		
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
			var colNames = ['ID','公司名称','仓库名称','商品名称','供应商名称','串号','单价','总金额','日期','入库方式'];
			var JqGridColModel=[
								{name:'depId',index:'depId', width:100,align:'center', sorttype:'string',hidden:true,sortable:false},
								{name:'comName',index:'comName', width:200,align:'center', sorttype:'string',sortable:false},
								{name:'depName',index:'depName', width:200,align:'center', sorttype:'string',sortable:false},
								{name:'storageName',index:'storageName', width:150,align:'center', sorttype:"string",sortable:false},
								{name:'storageName',index:'storageName', width:150,align:'center', sorttype:"string",sortable:false},
								{name:'storageName',index:'storageName', width:150,align:'center', sorttype:"string",sortable:false},
								{name:'storageName',index:'storageName', width:150,align:'center', sorttype:"string",sortable:false},
								{name:'storageName',index:'storageName', width:150,align:'center', sorttype:"string",sortable:false},
								{name:'storageName',index:'storageName', width:150,align:'center', sorttype:"string",sortable:false},
								{name:'depDouble',index:'depDouble', width:100,align:'center', sorttype:'string',sortable:false}
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
			            rownumbers:true,
			            //loadonce: true,
			            rowNum: 20,
			            rowList: [20, 25, 40],
			            pager:options.pager,
			            viewrecords: true,		           
//			            multiselect:true,
			           	//cellEdit:true,
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
							//console.log(status)
						}
						})
		
			}
			
}
			
		/**
		 * 数量库存
		 */
		function loadmodal_num()
			{
		var options = {
		LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
		LoadTableUrl: "../../../json/admin/company/money.json",
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
		TableName: "#jqGrid_goods_num", //显示表格名称。遵照css选择器书写
		iconJsonUrl:"../json/icon.json",
		btnbox: ".btnbox ",//功能按钮存放容器。遵照css选择器书写	
		pager:"#jqGridPager_num"
//		inputbox: ".inputbox" //搜索条件框存放容器。遵照css选择器书写
		};
		$("#datetimepickerStart").datetimepicker({
		  lang:"ch",           //语言选择中文
	      format:"Y-m-d",      //格式化日期
	      timepicker:false,    //关闭时间选项
	      todayButton:false    //关闭选择今天按钮
		});
		
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
			var colNames = ['ID','公司名称','仓库名称','商品名称','数量','单价','总金额','日期'];
			var JqGridColModel=[
								{name:'depId',index:'depId', width:100,align:'center', sorttype:'string',hidden:true,sortable:false},
								{name:'comName',index:'comName', width:200,align:'center', sorttype:'string',sortable:false},
								{name:'depName',index:'depName', width:200,align:'center', sorttype:'string',sortable:false},
								{name:'storageName',index:'storageName', width:150,align:'center', sorttype:"string",sortable:false},
								{name:'storageName',index:'storageName', width:150,align:'center', sorttype:"string",sortable:false},
								{name:'storageName',index:'storageName', width:150,align:'center', sorttype:"string",sortable:false},
								{name:'storageName',index:'storageName', width:150,align:'center', sorttype:"string",sortable:false},
								{name:'depDouble',index:'depDouble', width:100,align:'center', sorttype:'string',sortable:false}
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
			            rownumbers:true,
			            //loadonce: true,
			            rowNum: 20,
			            rowList: [20, 25, 40],
			            pager:options.pager,
			            viewrecords: true,		           
//			            multiselect:true,
			           	//cellEdit:true,
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
							//console.log(status)
						}
						})
		
			}
			
}
		

