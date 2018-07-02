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
						
//						controll(treeNode.id);//通过id调用对应方法 重构表格
					}
				},
				view: {
					showIcon: true
				}
		    }; 
			
			 $.ajax({
		            type: 'Get',
		            url: '../../../json/admin/metaDataTree.json',
		            dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
		            success: function (data) {
		                $.fn.zTree.init($("#metaDataTree"), setting, data);
		                //var str = $('#metaDataTree_1_switch').attr('class');
		                //console.log(str); //button level0 switch roots_close
		                //var Class = str.replace('roots','center');
		                //$('#metaDataTree_1_switch').attr('class',Class);
		                
		                var zTree = $.fn.zTree.getZTreeObj("metaDataTree");
		                zTree.expandAll(true);//展开全部节点
		            },
		            error: function (msg) {
		                alert(" 数据加载失败！" + msg);
		            }
		        });
		
		})();
		
		
		/**
		 * 角色权限
		 */
		function loadmodal_no()
			{
		var options = {
		LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
		LoadTableUrl: "../../../json/admin/metaData.json",
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
			var colNames = ['操作名称','ID','查询','新增','修改','删除','过账','红冲','发起','审批','金额查看','金额编辑','客户查看'];
			var JqGridColModel=[
								{name:'metaName',index:'metaName', width:144,align:'center',sorttype:"string",sortable:false},
								{name:'blocId',index:'blocId', width:65,align:'center', sorttype:'string',hidden:true,sortable:false},
								{name:'metaSearch',index:'metaSearch', width:65,align:'center', sorttype:'string',formatter:'select', editoptions:{value:"0:√;1:"},sortable:false},
								{name:'metaAdd',index:'metaAdd', width:65,align:'center', sorttype:'string',formatter:'select', editoptions:{value:"0:√;1:"},sortable:false},
								{name:'metaUpdate',index:'metaUpdate', width:65,align:'center', sorttype:'string',formatter:'select', editoptions:{value:"0:√;1:"},sortable:false},
								{name:'metaDelete',index:'metaDelete', width:65,align:'center', sorttype:'string',formatter:'select', editoptions:{value:"0:√;1:"},sortable:false},
								{name:'metaGuo',index:'metaGuo', width:65,align:'center', sorttype:'string',formatter:'select', editoptions:{value:"0:√;1:"},sortable:false},
								{name:'metaHong',index:'metaHong', width:65,align:'center', sorttype:'string',formatter:'select', editoptions:{value:"0:√;1:"},sortable:false},
								{name:'metaFa',index:'metaFa', width:65,align:'center',  sorttype:'string',formatter:'select', editoptions:{value:"0:√;1:"},sortable:false},
								{name:'metaShen',index:'metaShen', width:65,align:'center',  sorttype:'string',formatter:'select', editoptions:{value:"0:√;1:"},sortable:false},
								{name:'metaMoneySee',index:'metaMoneySee', width:100,align:'center',  sorttype:'string',formatter:'select', editoptions:{value:"0:√;1:"},sortable:false},
								{name:'metaMoneyUpdate',index:'metaMoneyUpdate', width:100,align:'center',  sorttype:'string',formatter:'select', editoptions:{value:"0:√;1:"},sortable:false},
								{name:'clientSee',index:'clientSee', width:100,align:'center', sorttype:'string',formatter:'select', editoptions:{value:"0:√;1:"},sortable:false}
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
//			            rownumbers:true,
			            //loadonce: true,
			            rowNum: 20,
			            rowList: [20, 25, 40],
			            pager:options.pager,
			            viewrecords: true,		           
//			            multiselect:true,
			           	//cellEdit:true,
			            width: "100%" ,
			            height: $(window).height()*0.50,
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
			$('.show-checkbox').click(function(){
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
			
}
			
		/**
		 * 角色用户关联
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
			var colNames = ['ID','员工编码','员工名称','角色名称','部门名称','职位名称','借调部门','登录工号','登录密码','状态','员工属性'];
			var JqGridColModel=[
								{name:'depId',index:'depId', width:100,align:'center', sorttype:'string',hidden:true,sortable:false},
								{name:'comName',index:'comName', width:200,align:'center', sorttype:'string',sortable:false},
								{name:'depName',index:'depName', width:200,align:'center', sorttype:'string',sortable:false},
								{name:'storageName',index:'storageName', width:150,align:'center', sorttype:"string",sortable:false},
								{name:'storageName',index:'storageName', width:150,align:'center', sorttype:"string",sortable:false},
								{name:'storageName',index:'storageName', width:150,align:'center', sorttype:"string",sortable:false},
								{name:'storageName',index:'storageName', width:150,align:'center', sorttype:"string",sortable:false},
								{name:'storageName',index:'storageName', width:150,align:'center', sorttype:"string",sortable:false},
								{name:'blocPwd',index:'blocPwd', width:150,align:'center', sorttype:"string",formatter:rePwd,sortable:false},
								{name:'depDouble',index:'depDouble', width:100,align:'center', sorttype:'string',sortable:false},
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
			            multiselect:true,
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
			
			//修改     
			$(document).on('click', '.updateEmpManage',function(e){
				
				var dId = $(this).data('depid');//获取数据的id
				console.log(dId);
				//调用接口获取本id的数据  填充至表格
				
				return true;
				
			});
			
			//重置密码
			$(document).on('click','.rePwd',function(e){
				//console.log(e.target);
				var reId = $(this).data('depid');//获取数据的id
				//获取随机6位数密码
				var randNum = MathRand();
				$.zxsaas_plus.showconfirm("","重置密码将用户密码设置为：" + randNum + "<br />是否确定进行此操作",function(){
					//调用接口重置密码
					
					$.zxsaas_plus.showalert("","重置密码成功!");
				},function(){
					
				});
			});
			
			//获取6为随机数
			function MathRand(){
				var Num = '';
				for(var i = 0;i < 6; i ++){
					Num += Math.floor(Math.random()*10); 
				}
				return Num;
			};
			
			
			//列表    重置密码
			function rePwd(cellvalue, options, rowObjec)
			{
				console.log(options + ';;;;;');
				return '<span class="rePwd" data-depId="' + rowObjec.depId + '" data-id="' + options.rowId + '" style="color:#00CCFF;cursor:pointer">重置密码</span>';
			};
			
			//启用
			$(document).on('click', '.qiyon',function(e){
				var checkedList = [];//存放已勾选行数据id
				var ids = $(options.TableName).jqGrid('getGridParam','selarrrow');//选中的行id
//				console.log(ids);
				var len = ids.length;
				$('.rePwd').each(function (index, domEle) { 
					  // domEle == this 
					  for(var i = 0; i < len; i ++){
					  	($(domEle).data('id') == ids[i]) && (checkedList.push($(domEle).data('depid')));
					  }
				});
//				console.log(checkedList.join(','));
				if(len == 0){
					$.zxsaas_plus.showalert("错误","请勾选角色后再启用!");
					return false;
				}else{
//					for(var i = 0;i < len;i ++){
						//$(options.TableName).jqGrid('delRowData', checkedList[0]);
						//checkedList.shift();
						//调用后台方法修改字段
//					}
					//通过 checkedList 集合中的数据id 调用接口修改对应数据字段
					$.zxsaas_plus.showalert("","启用成功!");
				}
			});
			
			//禁用
			$(document).on('click', '.jinyon',function(e){
				var checkedList = [];//存放已勾选行数据id
				var ids = $(options.TableName).jqGrid('getGridParam','selarrrow');//选中的行id
				var len = ids.length;
				$('.rePwd').each(function (index, domEle) { 
					  // domEle == this 
					  for(var i = 0; i < len; i ++){
					  	($(domEle).data('id') == ids[i]) && (checkedList.push($(domEle).data('depid')));
					  }
				});
//				console.log(checkedList.join(','));
				if(len == 0){
					$.zxsaas_plus.showalert("错误","请勾选角色后再禁用!");
					return false;
				}else{
//					for(var i = 0;i < len;i ++){
						//$(options.TableName).jqGrid('delRowData', checkedList[0]);
						//checkedList.shift();
						//调用后台方法修改字段
//					}
					//通过 checkedList 集合中的数据id 调用接口修改对应数据字段
					$.zxsaas_plus.showalert("","禁用成功!");
				}
			});

			
			
			
			
}
		
		/**
		 * 角色新增
		 */
			$(document).on('click', '.add',function(e){
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
			            url: '../../../json/admin/metaDataTree.json',
			            dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
			            success: function (data) {
			                $.fn.zTree.init($("#roleDataTree"), setting, data);
			                //var str = $('#roleDataTree_1_switch').attr('class');
			                //console.log(str); //button level0 switch roots_close
			                //var Class = str.replace('roots','center');
			                //$('#roleDataTree_1_switch').attr('class',Class);
			                
			                var zTree = $.fn.zTree.getZTreeObj("roleDataTree");
		                	zTree.expandAll(true);//展开全部节点
			            },
			            error: function (msg) {
			                alert(" 数据加载失败！" + msg);
			            }
			        });
			        
					var options = {
						LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
						LoadTableUrl: "../../../json/admin/metaData12.json",
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
					$('.show-checkbox-add').click(function(){
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
			
			//修改角色信息
			$(document).on('click', '.update',function(e){
				var dId = $(this).data('depid');//获取数据的id
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
			            url: '../../../json/admin/metaDataTree.json',
			            dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
			            success: function (data) {
			                $.fn.zTree.init($("#roleUpdateTree"), setting, data);
//			                var str = $('#roleUpdateTree_1_switch').attr('class');
//			                var Class = str.replace('roots','center');
//			                $('#roleUpdateTree_1_switch').attr('class',Class);
			                
			                var zTree = $.fn.zTree.getZTreeObj("roleUpdateTree");
		                	zTree.expandAll(true);//展开全部节点
			            },
			            error: function (msg) {
			                alert(" 数据加载失败！" + msg);
			            }
			        });
			        
					var options = {
						LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
						LoadTableUrl: "../../../json/admin/metaData12.json",
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
					$('.show-checkbox-update').click(function(){
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
			
			
			
		/**
		 * 修改删除列表
		 */
		$('.updateList').on('click',function(e){
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
					TableName: "#jqGrid_emp", //显示表格名称。遵照css选择器书写
					iconJsonUrl:"../json/icon.json",
					btnbox: ".btnbox ",//功能按钮存放容器。遵照css选择器书写	
					pager:"#jqGridPager_emp"
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
					var colNames = ['ID','角色名称','备注','操作'];
					var JqGridColModel=[
										{name:'depId',index:'depId', width:100,align:'center', sorttype:'string',hidden:true,sortable:false},
										{name:'storageCla',index:'storageCla', width:200,align:'center', sorttype:"string",sortable:false},
										{name:'storageInfo',index:'storageInfo', width:200,align:'center', sorttype:"string",sortable:false},
										{name:'storageName',index:'storageName', width:200,align:'center', sorttype:"string",formatter:upDe,sortable:false}
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
			            height: $(window).height()*0.35,
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
			$(document).on('click', '.deleteEmp',function(e){
				
				var dId = $(this).data('depid');//获取数据的id
				console.log(dId);
				//调用接口删除数据
				
				$.zxsaas_plus.showconfirm("","是否确定删除此条数据?",function(){
						$.zxsaas_plus.showalert("","删除成功!");
					},function(){
						
					});
				
			});
			
			//修改     
//			$(document).on('click', '.update',function(e){
//				
//				var dId = $(this).data('depid');//获取数据的id
//				console.log(dId);
//				//调用接口获取本id的数据  填充至表格
//				
//				return true;
//				
//			});
			
			//修改  删除按钮
			function upDe(cellvalue, options, rowObjec)
			{
				console.log(options + ';;;;;');
				return '<span class="update" data-depId="' + rowObjec.depId + '" data-id="' + options.rowId + '" data-toggle="modal" data-target="#modalUpdate" style="color:#00CCFF;cursor:pointer;margin-right:20px;">修改</span><span class="deleteEmp" data-depId="' + rowObjec.depId + '" data-id="' + options.rowId + '" style="color:#00CCFF;cursor:pointer">删除</span>';
			}
			
				
		});
		
		//列表复选框
		
		/**
		 * 角色关联人员
		 */
			$(document).on('click', '.rel',function(e){
			        
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
						TableName: "#jqGrid_empMa", //显示表格名称。遵照css选择器书写
						iconJsonUrl:"../json/icon.json",
						btnbox: ".btnbox ",//功能按钮存放容器。遵照css选择器书写	
						pager:"#jqGridPager_empMa"
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
							var colNames = ['ID','员工编号','员工名称','角色名称','部门名称','职位名称','借调部门','状态','员工属性'];
							var JqGridColModel=[
												{name:'depId',index:'depId', width:100,align:'center', sorttype:'string',hidden:true,sortable:false},
												{name:'comName',index:'comName', width:100,align:'center', sorttype:'string',sortable:false},
												{name:'depName',index:'depName', width:100,align:'center', sorttype:'string',sortable:false},
												{name:'storageName',index:'storageName', width:100,align:'center', sorttype:"string",sortable:false},
												{name:'storageCla',index:'storageCla', width:100,align:'center', sorttype:"string",sortable:false},
												{name:'storageInfo',index:'storageInfo', width:100,align:'center', sorttype:"string",sortable:false},
												{name:'storageInfo',index:'storageInfo', width:100,align:'center', sorttype:"string",sortable:false},
												{name:'storageInfo',index:'storageInfo', width:100,align:'center', sorttype:"string",sortable:false},
												{name:'storageName',index:'storageName', width:100,align:'center', sorttype:"string",sortable:false}
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
											//console.log(data);
											var len = data.rows.length;
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
					$('.show-checkbox-add').click(function(){
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
		
		function checkBox(cellvalue, options, rowObjec)
		{
			return '<input type="checkbox" class="del" data-blocId="' + rowObjec.blocId + '"  data-id="' + options.rowId + '" />';
		}
		
		