		
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
				             /*   var tableStr = 
				                	'<table>' + 
				                		'<tr><td>操作名称</td><td><input type="checkbox" class="checkAll" /></td></tr>' + 
										'<tr><td>采购订单</td><td><input type="checkbox" class="checkOne" /></td></tr>' + 
										'<tr><td>采购入库</td><td><input type="checkbox" class="checkOne" /></td></tr>' + 
										'<tr><td>采购退货</td><td><input type="checkbox" class="checkOne" /></td></tr>' + 
										'<tr><td>采购换货</td><td><input type="checkbox" class="checkOne" /></td></tr>' + 
										'<tr><td>获赠单</td><td><input type="checkbox" class="checkOne" /></td></tr>' + 
										'<tr><td>供应商报价单</td><td><input type="checkbox" class="checkOne" /></td></tr>' + 
										'<tr><td>供应商返利单</td><td><input type="checkbox" class="checkOne" /></td></tr>' + 
										'<tr><td>受托入库单</td><td><input type="checkbox" class="checkOne" /></td></tr>' + 
										'<tr><td>受托退货单</td><td><input type="checkbox" class="checkOne" /></td></tr>' + 
										'<tr><td>受托调价单</td><td><input type="checkbox" class="checkOne" /></td></tr>' + 
										'<tr><td>受托结算单</td><td><input type="checkbox" class="checkOne" /></td></tr>' + 
									'</table>';
								
								$('.jqGrid_wrap').html(tableStr);*/
				                
				                
				            },
				            error: function (msg) {
				                alert(" 数据加载失败！" + msg);
				            }
						});
						
						
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
		            url: '../../json/admin/metaDataTree.json',
		            dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
		            success: function (data) {
		                $.fn.zTree.init($("#publicModelTree"), setting, data);
		                var str = $('#publicModelTree_1_switch').attr('class');
		                //console.log(str); //button level0 switch roots_close
		                var Class = str.replace('roots','center');
		                $('#publicModelTree_1_switch').attr('class',Class);
		                
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
		LoadTableUrl: "../../json/admin/metaData.json",
		//LoadTableUrl: "../../cw/qc/getSubject", //表格数据加载接口地址
		GetRowInfoUrl: "", //编辑时获取数据详细信息接口加载地址
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
			var colNames = ['操作名称','ID','<input type="checkbox" class="checkAll" />'];
			var JqGridColModel=[
								{name:'metaName',index:'metaName', width:241,align:'center',sorttype:"string",sortable:false},
								{name:'blocId',index:'blocId', width:5,align:'center', sorttype:'string',hidden:true,sortable:false},
								{name:'checkx',index:'checkx', width:55,align:'center', sorttype:'string',formatter:checkBox,sortable:false}
			                ];
			
			loadtable();
			function loadtable(){
					$(options.TableName).jqGrid({
						url:options.LoadTableUrl,
						mtype:"GET",
						datatype: "json",
						jsonReader  : {	
								root: "rows",
								repeatitems: false
									},
						colNames:colNames,          
			            colModel:JqGridColModel,
			            sortable:false,			            
			            rowNum: 20,
			            rowList: [20, 25, 40],
			            pager:options.pager,
			            viewrecords: true,		           
			            width: "100%" ,
			            height: $(window).height()*0.44,
						autowidth:true,
						rownumWidth: 35, // the width of the row numbers columns
						shrinkToFit:false,  //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
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
			
			
			//新增通用模块
			$('.add').on('click',function(e){
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
			            url: '../../json/admin/metaDataTree.json',
			            dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
			            success: function (data) {
			                $.fn.zTree.init($("#publicDataTree"), setting, data);
			                var str = $('#publicDataTree_1_switch').attr('class');
			                //console.log(str); //button level0 switch roots_close
			                var Class = str.replace('roots','center');
			                $('#publicDataTree_1_switch').attr('class',Class);
			                
			                var zTree = $.fn.zTree.getZTreeObj("publicDataTree");
			                zTree.expandAll(true);//展开全部节点
							//var node = zTree.getNodeByParam("id",12);//选中某节点
							//zTree.selectNode(node);
							//zTree.checkNode(node);
			                
			                
			            },
			            error: function (msg) {
			                alert(" 数据加载失败！" + msg);
			            }
		        });
			        
			});
			
			//修改通用模块
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
							
							controll(treeNode.id);//通过id调用对应方法 重构表格
							
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
			            url: '../../json/admin/metaDataTree.json',
			            dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
			            success: function (data) {
			                $.fn.zTree.init($("#publicDataTreeUpdate"), setting, data);
			                var str = $('#publicDataTreeUpdate_1_switch').attr('class');
			                //console.log(str); //button level0 switch roots_close
			                var Class = str.replace('roots','center');
			                $('#publicDataTreeUpdate_1_switch').attr('class',Class);
			                
			                var zTree = $.fn.zTree.getZTreeObj("publicDataTreeUpdate");
			                zTree.expandAll(true);//展开全部节点
							var node = zTree.getNodeByParam("id",11);//选中某节点
							//zTree.selectNode(node);
							zTree.checkNode(node);
			            },
			            error: function (msg) {
			                alert(" 数据加载失败！" + msg);
			            }
			    });    
					
			
			
			
			});
			
			//删除模版
			$(document).on('click','.deletePublicModel',function(e){
				e.preventDefault();
				var reId = $(this).data('id');//获取删除的行id
				$.zxsaas_plus.showconfirm("","是否删除此模版",function(){
					//删除密码操作
					$.zxsaas_plus.showalert("","删除成功!");
				},function(){
					
				});
			});
			

			
		//列表复选框
		function checkBox(cellvalue, options, rowObjec)
		{
			return '<input type="checkbox" class="del checkOne" data-blocId="' + rowObjec.blocId + '"  data-id="' + options.rowId + '" />';
		}

		

		$(document).on("click",".btnbox button[data-eventname='printbtn']",function(event){
			$.zxsaas_plus.showalert("表格打印操作", "表格打印操作咱未完成，敬请期待");
			
		});
		$(document).on("click",".btnbox button[data-eventname='exportTablename']",function(event){
			$.zxsaas_plus.showalert("表格导出操作", "表格导出操作咱未完成，敬请期待");
			
		});
}
		
