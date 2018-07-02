		
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
						
						
					}
				},
				view: {
					showIcon: true
				}
		    }; 
			
			 $.ajax({
		            type: 'Get',
		            url: '../../../json/admin/company/depDataTree.json',
		            dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
		            success: function (data) {
		                $.fn.zTree.init($("#publicModelTree"), setting, data);
		                //var str = $('#publicModelTree_1_switch').attr('class');
		                //console.log(str); //button level0 switch roots_close
		                //var Class = str.replace('roots','center');
		               // $('#publicModelTree_1_switch').attr('class',Class);
		                
		                var zTree = $.fn.zTree.getZTreeObj("publicModelTree");
		                zTree.expandAll(true);//展开全部节点
						var node = zTree.getNodeByParam("id",12);//选中某节点
						//zTree.selectNode(node);
						zTree.checkNode(node);
		                
		                
		            },
		            error: function (msg) {
		                alert(" 数据加载失败！" + msg);
		            }
		        });
		
		})();
		
		function loadmodal()
			{
		var options = {
		LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
		LoadTableUrl: "../../../json/admin/company/dep.json",
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
			var colNames = ['ID','公司名称','部门编码','部门名称','所属区域','是否为门店','层级编码','上级层级编码','是否禁用','备注','层级编码是否为末级','新增人','新增时间','修改人','修改时间'];
			var JqGridColModel=[
								{name:'depId',index:'depId', width:100,align:'center', sorttype:'string',hidden:true,sortable:false},
								{name:'comName',index:'comName', width:200,align:'center', sorttype:'string',sortable:false},
								{name:'depNo',index:'depNo', width:200,align:'center', sorttype:'int',sortable:false},
								{name:'depName',index:'depName', width:200,align:'center', sorttype:'string',sortable:false},
								{name:'depArea',index:'depArea', width:200,align:'center', sorttype:'string',sortable:false},
								{name:'depStore',index:'depStore', width:150,align:'center', sorttype:'string',formatter:'select', editoptions:{value:"0:√;1:"},sortable:false},
								{name:'depCb',index:'depCb', width:150,align:'center', sorttype:"string",sortable:false},
								{name:'depScb',index:'depScb', width:150,align:'center', sorttype:"string",sortable:false},
								{name:'depDouble',index:'depDouble', width:100,align:'center', sorttype:'string',formatter:'select', editoptions:{value:"0:√;1:"},sortable:false},
								{name:'depMark',index:'depMark', width:100,align:'center',  sorttype:'string',sortable:false},
								{name:'depCbD',index:'depCbD', width:100,align:'center',  sorttype:'string',formatter:'select', editoptions:{value:"0:√;1:"},sortable:false},
								{name:'depPre',index:'depPre', width:100,align:'center',  sorttype:'string',sortable:false},
								{name:'depTime',index:'depTime', width:150,align:'center',  sorttype:'string',sortable:false},
								{name:'depUpdate',index:'depUpdate', width:100,align:'center',  sorttype:'string',sortable:false},
								{name:'depUpdateTime',index:'depUpdateTime', width:150,align:'center', sorttype:'string',sortable:false}
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
						loadComplete:function(data){
							//console.log(data);
							var len = data.rows.length;
							//var selectedRowIds = $(options.TableName).jqGrid("getRowData");  
							//var len = selectedRowIds.length;  
							//表格加载完成后 默认隐藏禁用行
							for(var i = 1;i <= len ;i ++) {  
								var gridData = $(options.TableName).jqGrid("getRowData",i);
								if(gridData.depDouble == '0'){
									$(options.TableName).setRowData(i,null,{display: 'none'});//隐藏禁用
								}
							} 
							
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
			
			
			
			//批量删除
			$(document).on('click', '.btnDeleteRow',function(e){
				
//				var checkedList = [];//存放已勾选行id
//				$('.cbox').each(function (index, domEle) { 
//					  // domEle == this 
//					($(domEle).prop('checked')) ? (checkedList.push($(domEle).data('id'))) : '';
//				});
//				
//				var len = checkedList.length;
//				console.log(len);
				var ids = $(options.TableName).jqGrid('getGridParam','selarrrow');//选中的行id
				var len = ids.length;
				if(len == 0){
					$.zxsaas_plus.showalert("错误","请勾选部门后再删除!");
					return false;
				}else{
					/*if($('#jqGrid_blocMessage tbody tr').length === 2) {
						$.zxsaas_plus.showalert("错误","至少保留一条数据!")
						return false;
					}*/
					$.zxsaas_plus.showconfirm("","是否确定删除选中数据?",function(){
						for(var i = 0;i < len;i ++){
//							$(options.TableName).jqGrid('delRowData', ids[i]);
							var gridData = $(options.TableName).jqGrid("getRowData",ids[i]);//获取被选中的一行数据
							var id = gridData.depId;//数据的id  根据此id删除数据
//							ids.shift();
							//$(options.TableName).jqGrid('delRowData', rowId);
						}
					},function(){
					
					});
				}
			});
			
			//修改密码
			$(document).on('click','.rePwd',function(e){
				//console.log(e.target);
				var reId = $(this).data('id');//获取删除的行id
				//var dataId = $(this).data('blocid');//获取数据的id  按照数据的id进行后台CRUD操作
				$.zxsaas_plus.showconfirm("","重置密码将用户密码设置为：123456<br />是否确定进行此操作",function(){
					//删除密码操作
					$.zxsaas_plus.showalert("","重置密码成功!");
				},function(){
					
				});
			});
			
			//启用
			$(document).on('click', '.qiyon',function(e){
//				var checkedList = [];//存放已勾选行id
//				$('.cbox').each(function (index, domEle) { 
//					  // domEle == this 
//					($(domEle).prop('checked')) ? (checkedList.push($(domEle).data('id'))) : '';//表格行id
//					//($(domEle).prop('checked')) ? (checkedList.push($(domEle).data('blocid'))) : '';//数据id
//				});
				var ids = $(options.TableName).jqGrid('getGridParam','selarrrow');//选中的行id
				var len = ids.length;
				if(len == 0){
					$.zxsaas_plus.showalert("错误","请勾选部门后再启用!");
					return false;
				}else{
					for(var i = 0;i < len;i ++){
						//$(options.TableName).jqGrid('delRowData', checkedList[0]);
						//checkedList.shift();
						var gridData = $(options.TableName).jqGrid("getRowData",ids[i]);//获取被选中的一行数据
						var id = gridData.blocId;//数据的id  根据此id删除数据
						//调用后台方法修改字段
					}
					$.zxsaas_plus.showalert("","启用成功!");
				}
			});
			
			//禁用
			$(document).on('click', '.jinyon',function(e){
//				var checkedList = [];//存放已勾选行id
//				$('.cbox').each(function (index, domEle) { 
//					  // domEle == this 
//					($(domEle).prop('checked')) ? (checkedList.push($(domEle).data('id'))) : '';
//					//($(domEle).prop('checked')) ? (checkedList.push($(domEle).data('blocid'))) : '';
//				});
				var ids = $(options.TableName).jqGrid('getGridParam','selarrrow');//选中的行id
				var len = ids.length;
				if(len == 0){
					$.zxsaas_plus.showalert("错误","请勾选部门后再禁用!");
					return false;
				}else{
					for(var i = 0;i < len;i ++){
						//$(options.TableName).jqGrid('delRowData', checkedList[0]);
						//checkedList.shift();
						var gridData = $(options.TableName).jqGrid("getRowData",ids[i]);//获取被选中的一行数据
						var id = gridData.blocId;//数据的id  根据此id删除数据
						//调用后台方法修改字段
					}
					$.zxsaas_plus.showalert("","禁用成功!");
				}
			});
			
			//修改信息
			$('.updateBloc').click(function(){
				var checkedList = [];//存放已勾选行id
//				$('.cbox').each(function (index, domEle) { 
//					  // domEle == this 
//					($(domEle).prop('checked')) ? (checkedList.push($(domEle).data('id'))) : '';
//				});
				var ids=$(options.TableName).jqGrid('getGridParam','selarrrow');
				console.log(ids + '....ids');
//				var len = checkedList.length;
//				var gridData = $(options.TableName).jqGrid("getRowData",checkedList[0]);//获取被选中的一行数据
				//var id = gridData.blocId;
				//console.log('id:' + id);
				if(ids.length != 1){
					$.zxsaas_plus.showalert("错误","一次只能修改一条信息!");
					return false;
				}else{
					var gridData = $(options.TableName).jqGrid("getRowData",ids);//获取被选中的一行数据
					$('.blocId').val(gridData.blocId);
					$('.depName').val(gridData.depName);
					$('.depNo').val(gridData.depNo);
					//$('.depDouble').val(gridData.depDouble);
					(gridData.depDouble == '1') ? ($('.depDouble').prop({'checked':''})) : ($('.depDouble').prop({'checked':'checked'}));
					(gridData.depStore == '1') ? ($('.depStore').prop({'checked':''})) : ($('.depStore').prop({'checked':'checked'}));
					
					$('.hide_text_updateUse').val('001;003');//设置隐藏的存放id的input
					$('.select_rel_updateUse').val('老司机1号;老司机3号');//设置显示已选项
					$('.multi_select_updateUse').on('click',function(e){
						var ids = $('.hide_text_updateUse').val();//获取ids
						var idsList = ids.split(';');
						for(var i = 0,len = idsList.length;i < len; i ++){
							//console.log(idsList[i]);
							$("._updateUse").each(function(){ 
								($(this).attr('value') == idsList[i]) && ($(this).attr('checked','true')); 
							});
						}
					});
					
					$('.hide_text_updateTurn').val('009;002');//设置隐藏的存放id的input
					$('.select_rel_updateTurn').val('老司机9号;老司机2号');//设置显示已选项
					$('.multi_select_updateTurn').on('click',function(e){
						var ids = $('.hide_text_updateTurn').val();//获取ids
						var idsList = ids.split(';');
						for(var i = 0,len = idsList.length;i < len; i ++){
							//console.log(idsList[i]);
							$("._updateTurn").each(function(){ 
								($(this).attr('value') == idsList[i]) && ($(this).attr('checked','true')); 
							});
						}
					});
					
					
					return true;
				}
			});
			
			//部门属性管理
			$('.empManage').click(function(){
				loadmodalEmpManage();
			});
			
			//地区管理
			$('.area').click(function(){
				loadmodalAreaManage();
			});
			
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
						if(gridData.depDouble == '0'){
							$(options.TableName).setRowData(i,null,{display: 'table-row'});//显示禁用
						}
					}  
				}else{
					for(var i = 1;i <= len ;i ++) {  
						var gridData = $(options.TableName).jqGrid("getRowData",i);
						if(gridData.depDouble == '0'){
							$(options.TableName).setRowData(i,null,{display: 'none'});//隐藏禁用
						}
					}  
				}
			});
			
			//列表复选框
//			function checkBox(cellvalue, options, rowObjec)
//			{
//				return '<input type="checkbox" class="checkOne del" data-blocId="' + rowObjec.blocId + '"  data-id="' + options.rowId + '" />';
//			}
			
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
		


	//部门属性管理弹出窗
		function loadmodalEmpManage()
			{
		var options = {
		LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
		LoadTableUrl: "../../../json/admin/company/money.json",
		GetRowInfoUrl: "", //编辑时获取数据详细信息接口加载地址
		DelRowUrl: "", // 删除信息接口地址
		isSub:"",//是否有子级表格
		subLoadTableUrl:"",//子级表格数据来源地址
		TableName: "#jqGrid_empManage", //显示表格名称。遵照css选择器书写
		iconJsonUrl:"../json/icon.json",
		btnbox: ".btnbox ",//功能按钮存放容器。遵照css选择器书写	
		pager:"#jqGridPager_empManage"
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
			var colNames = ['ID','属性名称','属性编码','操作'];
			var JqGridColModel=[
								{name:'depId',index:'depId', width:100,align:'center', sorttype:'string',hidden:true},
								{name:'comName',index:'comName', width:200,align:'center', sorttype:'string'},
								{name:'comNo',index:'comNo', width:200,align:'center', sorttype:'string'},
								{name:'storageName',index:'storageName', width:300,align:'center', sorttype:"string",formatter:manage}
			                ];
			
			loadtable();
		//加载表格
		
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
			            sortable:false,			            
			            rownumbers:true,
			            rowNum: 20,
			            rowList: [20, 25, 40],
			            pager:options.pager,
			            viewrecords: true,		           
			            width: "100%" ,
			            height: $(window).height()*0.25,
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
							for(var i = 1;i <= len ;i ++) {  
								var gridData = $(options.TableName).jqGrid("getRowData",i);
								if(gridData.depDouble == '0'){
									$(options.TableName).setRowData(i,null,{display: 'none'});//隐藏禁用
								}
							} 
						},
						loadError:function(xhr,status,error){
							//console.log(status)
						}
						})
		
			}
			
			$(window).bind('click', function saveEdit(e) {
				var rowId = $(e.target).parent("tr").attr("id");
				if (lastsel != "" && lastsel != rowId) { //用于点击其他地方保存正在编辑状态下的行
					if ($(e.target).closest(options.TableName).length == 0) { 
						$(options.TableName).jqGrid('saveRow', lastsel);						
						lastsel='';
					}
				}
			})
			
			//删除      根据每行数据的id删除  而不是行id
			$(document).on('click', '.deleteEmpManage',function(e){
				
				var dId = $(this).data('depid');//获取数据的id
				console.log(dId);
				//调用接口删除数据
				
				$.zxsaas_plus.showconfirm("","是否确定删除此条数据?",function(){
						$.zxsaas_plus.showalert("","删除成功!");
					},function(){
						
					});
				
			});
			
			//修改     
			$(document).on('click', '.updateEmpManage',function(e){
				
				var dId = $(this).data('depid');//获取数据的id
				console.log(dId);
				//调用接口获取本id的数据  填充至表格
				
				return true;
				
			});
			
			//部门属性修改  删除按钮
			function manage(cellvalue, options, rowObjec)
			{
				console.log(options + ';;;;;');
				return '<span class="updateEmpManage" data-depId="' + rowObjec.depId + '" data-id="' + options.rowId + '" data-toggle="modal" data-target="#modalEmpManageAdd" style="color:#00CCFF;cursor:pointer;margin-right:40px;">修改</span><span class="deleteEmpManage" data-depId="' + rowObjec.depId + '" data-id="' + options.rowId + '" style="color:#00CCFF;cursor:pointer">删除</span>';
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

	//地区管理弹出窗
		function loadmodalAreaManage()
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
		TableName: "#jqGrid_areaManage", //显示表格名称。遵照css选择器书写
		iconJsonUrl:"../json/icon.json",
		btnbox: ".btnbox ",//功能按钮存放容器。遵照css选择器书写	
		pager:"#jqGridPager_areaManage"
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
			var colNames = ['ID','地区编码','地区名称','备注','是否禁用','操作'];
			var JqGridColModel=[
								{name:'depId',index:'depId', width:100,align:'center', sorttype:'string',hidden:true},
								{name:'comNo',index:'comNo', width:100,align:'center', sorttype:'string'},
								{name:'comName',index:'comName', width:150,align:'center', sorttype:'string'},
								{name:'comMark',index:'comMark', width:150,align:'center', sorttype:'string'},
								{name:'comCheck',index:'comCheck', width:100,align:'center', sorttype:'string',formatter:'select', editoptions:{value:"0:√;1:"}},
								{name:'storageName',index:'storageName', width:200,align:'center', sorttype:"string",formatter:manage}
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
			            height: $(window).height()*0.25,
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
							for(var i = 1;i <= len ;i ++) {  
								var gridData = $(options.TableName).jqGrid("getRowData",i);
								if(gridData.depDouble == '0'){
									$(options.TableName).setRowData(i,null,{display: 'none'});//隐藏禁用
								}
							} 
						},
						loadError:function(xhr,status,error){
							//console.log(status)
						}
						})
		
			}
			
			$(window).bind('click', function saveEdit(e) {
				var rowId = $(e.target).parent("tr").attr("id");
				if (lastsel != "" && lastsel != rowId) { //用于点击其他地方保存正在编辑状态下的行
					if ($(e.target).closest(options.TableName).length == 0) { 
						$(options.TableName).jqGrid('saveRow', lastsel);						
						lastsel='';
					}
				}
			})
			
			//删除      根据每行数据的id删除  而不是行id
			$(document).on('click', '.deleteAreaManage',function(e){
				
				var dId = $(this).data('depid');//获取数据的id
				console.log(dId);
				//调用接口删除数据
				
				$.zxsaas_plus.showconfirm("","是否确定删除此条数据?",function(){
						$.zxsaas_plus.showalert("","删除成功!");
					},function(){
						
					});
				
			});
			
			//修改     
			$(document).on('click', '.updateAreaManage',function(e){
				
				var dId = $(this).data('depid');//获取数据的id
				console.log(dId);
				//调用接口获取本id的数据  填充至表格
				
				return true;
				
			});
			
			//地区修改  删除按钮
			function manage(cellvalue, options, rowObjec)
			{
				console.log(options + ';;;;;');
				return '<span class="updateAreaManage" data-depId="' + rowObjec.depId + '" data-id="' + options.rowId + '" data-toggle="modal" data-target="#modalAreaUpdate" style="color:#00CCFF;cursor:pointer;margin-right:40px;">修改</span><span class="deleteAreaManage" data-depId="' + rowObjec.depId + '" data-id="' + options.rowId + '" style="color:#00CCFF;cursor:pointer">删除</span>';
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



