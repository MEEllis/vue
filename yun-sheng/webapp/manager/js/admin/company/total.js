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
		
		
		
		
		function loadmodal()
			{
		var options = {
		LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
		LoadTableUrl: "../../../json/admin/company/total.json",
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
		TableName: "#jqGrid_blocMessage", //显示表格名称。遵照css选择器书写
		iconJsonUrl:"../json/icon.json",
		btnbox: ".btnbox ",//功能按钮存放容器。遵照css选择器书写	
		pager:"#jqGridPager"
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
			var colNames = ['depId','id','部门名称','日结日期','操作人','操作时间'];
			var JqGridColModel=[
								{name:'depId',index:'depId', width:100,align:'center', sorttype:'string',hidden:true,sortable:false},
								{name:'id',index:'id', width:100,align:'center', sorttype:'string',hidden:true,sortable:false},
								{name:'depName',index:'depName', width:200,sorttype:"int",sortable:false},
								{name:'depTime',index:'depTime', width:200,align:'center', sorttype:'date',sortable:false},
								{name:'depPerson',index:'depPerson', width:150,align:'center', sorttype:"string",sortable:false},
								{name:'depDate',index:'depDate', width:200,align:'center', sorttype:"date",sortable:false}
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
						
			            treeGrid:true,//w为ture 则为树形表格
			            treeGridModel:"adjacency",
			            ExpandColumn:"depName",//展开的列
//			            ExpandColClick:true,// 树形表格是否展开
			            		
						jsonReader  : {	
								root: "rows",
								repeatitems: false
									},
					    treeReader : {  
					      level_field: "level",  
					      parent_id_field: "parent",   
					      leaf_field: "isLeaf",  
					      expanded_field: "expanded"  
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
							//console.log(data);
							var len = data.rows.length;
							//var selectedRowIds = $(options.TableName).jqGrid("getRowData");  
							//var len = selectedRowIds.length;  
							//表格加载完成后 默认隐藏禁用行
//							for(var i = 1;i <= len ;i ++) {  
//								var gridData = $(options.TableName).jqGrid("getRowData",i);
//								if(gridData.depDouble == '0'){
//									$(options.TableName).setRowData(i,null,{display: 'none'});//隐藏禁用
//								}
//							} 
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
			
			$(document).on('click','.day',function(e){
				loadmodal_day();
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
		
		
		/**
		 * 日结/反日结
		 */
		function loadmodal_day()
			{
		var options = {
		LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
		LoadTableUrl: "../../../json/admin/company/rijie.json",
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
		TableName: "#jqGrid_dayMessage", //显示表格名称。遵照css选择器书写
		iconJsonUrl:"../json/icon.json",
		btnbox: ".btnbox ",//功能按钮存放容器。遵照css选择器书写	
		pager:"#jqGridPager_dayMessage"
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
			var colNames = ['depId','id','部门名称','上次日结日期','本次日结日期','日结','反日结','备注'];
			var JqGridColModel=[
								{name:'depId',index:'depId', width:100,align:'center', sorttype:'string',hidden:true,sortable:false},
								{name:'id',index:'id', width:100,align:'center', sorttype:'string',hidden:true,sortable:false},
								{name:'depName',index:'depName', width:200,sorttype:"string",sortable:false},
								{name:'depPreTime',index:'depPreTime', width:100,align:'center', sorttype:'date',sortable:false},
								{name:'depTime',index:'depTime', width:100,align:'center', sorttype:'date',formatter:getNextDay,sortable:false},
								{name:'depPerson',index:'depPerson', width:100,align:'center', sorttype:"string",formatter:checkBox,sortable:false},
								{name:'depPerson',index:'depPerson', width:100,align:'center', sorttype:"string",formatter:checkBoxNo,sortable:false},
								{name:'depMark',index:'depMark', width:100,align:'center', sorttype:"string",hidden:true,editable:true,sortable:false}
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
						
			            treeGrid:true,//w为ture 则为树形表格
			            treeGridModel:"adjacency",
			            ExpandColumn:"depName",//展开的列
//			            ExpandColClick:true,// 树形表格是否展开
			            		
						jsonReader  : {	
								root: "rows",
								repeatitems: false
									},
					    treeReader : {  
					      level_field: "level",  
					      parent_id_field: "parent",   
					      leaf_field: "isLeaf",  
					      expanded_field: "expanded"  
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
			           	cellEdit:true,
			           	editurl: 'clientArray',
						cellsubmit: 'clientArray',//单元格保存内容的位置
			            width: "100%" ,
			            height: $(window).height()*0.45,
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
//							for(var i = 1;i <= len ;i ++) {  
//								var gridData = $(options.TableName).jqGrid("getRowData",i);
//								if(gridData.depDouble == '0'){
//									$(options.TableName).setRowData(i,null,{display: 'none'});//隐藏禁用
//								}
//							} 
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
			
			//显示隐藏备注
			$(document).on('click','.notChk',function(e){
				var count = 0;
				$(".notChk").each(function(){ 
					($(this).prop('checked')) && (count ++);
				});
				(count > 0) ? ($(options.TableName).setGridParam().showCol('depMark')) : ($(options.TableName).setGridParam().hideCol('depMark')); 
				var id = $(this).data('depid');
				var flag = $(this).prop('checked');
				$('.chk').each(function(){
					(flag && ($(this).data('depid') == id)) && ($(this).removeAttr("checked"));
				});
				var gridData = $(options.TableName).jqGrid("getRowData",id);//获取被选中的一行数据
				var mark = gridData.depMark;//备注单元格的值
//				if(flag && (mark == '')){
//					$.zxsaas_plus.showalert("错误","已勾选反日结,请填写备注!");
//				}
				(!flag) && ($(this).parent().next().html(''));
				
			});
			//日结
			$(document).on('click','.chk',function(e){
				var id = $(this).data('depid');
				var flag = $(this).prop('checked');
				var gridData = $(options.TableName).jqGrid("getRowData",id);//获取被选中的一行数据
				var count = 0;
				$('.notChk').each(function(){
					(flag && ($(this).data('depid') == id)) && ($(this).removeAttr("checked"));
					($(this).prop('checked') && count ++);
					if(flag && ($(this).data('depid') == id)){
						$(this).removeAttr("checked");
						$(options.TableName).jqGrid('setCell',id, 'depMark', '');
					}
					(!$(this).prop('checked')) && ($(this).parent().next().html(''));
				});
				(count == 0) ? ($(options.TableName).setGridParam().hideCol('depMark')) : ($(options.TableName).setGridParam().showCol('depMark')); 
				
			});
			
			function getNextDay(cellvalue, options, rowObjec){
				var d = rowObjec.depPreTime;
		        d = new Date(d);
		        d = +d + 1000*60*60*24;
		        d = new Date(d);
		        //return d;
		        //格式化
		        return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
		         
		    }

			
			//列表    重置密码
			function rePwd(cellvalue, options, rowObjec)
			{
				console.log(cellvalue + ';;;;;');
				console.log(options + ';;;;;');
				console.log(rowObjec + ';;;;;');
				return '<span class="rePwd" data-depId="' + rowObjec.depId + '" data-id="' + options.rowId + '" style="color:#00CCFF;cursor:pointer">重置密码</span>';
			}
			
			//日结复选框
			function checkBox(cellvalue, options, rowObjec)
			{
				return '<input type="checkbox" class="del chk" data-depId="' + rowObjec.depId + '"  data-id="' + options.rowId + '" />';
			}
			
			//反日结复选框
			function checkBoxNo(cellvalue, options, rowObjec)
			{
				return '<input type="checkbox" class="del notChk" data-depId="' + rowObjec.depId + '"  data-id="' + options.rowId + '" />';
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
