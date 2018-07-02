function loadmodal(){
		var options = {
		LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
		LoadTableUrl: "../../json/Storage/allotReceive.json",
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
		TableName: "#jqGrid_SubjectBalance", //显示表格名称。遵照css选择器书写
		iconJsonUrl:"../json/icon.json",
		btnbox: ".btnbox ",//功能按钮存放容器。遵照css选择器书写	
//		pager:"#jqGridPager"
//		inputbox: ".inputbox" //搜索条件框存放容器。遵照css选择器书写
		};
		$("#datetimepickerStart").datetimepicker({
			  lang:"ch",           //语言选择中文
		      format:"Y-m-d",      //格式化日期
		      timepicker:false,    //关闭时间选项
		      todayButton:false    //关闭选择今天按钮
			});
		$("#datetimepickerStart1").datetimepicker({
			  lang:"ch",           //语言选择中文
		      format:"Y-m-d",      //格式化日期
		      timepicker:false,    //关闭时间选项
		      todayButton:false    //关闭选择今天按钮
			});
		$("#datetimepickerStart2").datetimepicker({
			  lang:"ch",           //语言选择中文
		      format:"Y-m-d",      //格式化日期
		      timepicker:false,    //关闭时间选项
		      todayButton:false    //关闭选择今天按钮
			});
		$("#datetimepickerStart3").datetimepicker({
			  lang:"ch",           //语言选择中文
		      format:"Y-m-d",      //格式化日期
		      timepicker:false,    //关闭时间选项
		      todayButton:false    //关闭选择今天按钮
			});
		$("#datetimepickerStart4").datetimepicker({
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
			var colNames = ['ID','单据编号','调出部门','调入部门','调拨总额','备注','新增人','新增时间','发货人','发货时间'];
			var JqGridColModel=[
								{name:'deliveryId',index:'deliveryId', width:100,align:'center', sorttype:'int',hidden:true},
								{name:'billsNumber',index:'billsNumber', width:200,align:'center',sorttype:'string',formatter:detailMod},
								{name:'export',index:'export', width:150,align:'center', sorttype:'string'},
								{name:'fold',index:'fold', width:150,align:'center', sorttype:'string'},
								{name:'zonge',index:'zonge', width:100,align:'center', sorttype:'integer'},	
								{name:'remark',index:'remark', width:200,align:'center', sorttype:'string'},
								{name:'addPeople',index:'addPeople', width:150,align:'center', sorttype:'string'},
								{name:'addDate',index:'addDate', width:100,align:'center', sorttype:'string'},
								{name:'shipmentsPeople',index:'shipmentsPeople', width:150,align:'center', sorttype:'string'},
								{name:'shipmentsDate',index:'shipmentsDate', width:100,align:'center', sorttype:'string'}
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
						jsonReader  : {	
								root: "rows",
								repeatitems: false
									},
		               /* treeReader : {
		                    //level_field: "level",
		                    parent_id_field: "parentId",
		                    leaf_field: "isLeaf"
		                    //expanded_field: "expanded"
		                },*/
						colNames:colNames,          
			            colModel:JqGridColModel,
			            //loadonce: false,
			            sortable:false,			            
			            rownumbers:true,
			            cellsubmit: 'clientArray',//单元格保存内容的位置		
			            editurl: 'clientArray',
			            //loadonce: true,
			            rowNum: 15,
			            rowList: [10, 15, 20, 25, 40],
			            pager:options.pager,
			            viewrecords: true,		           
			            multiselect:true,
			           	cellEdit:true,
			            width: "100%" ,
			            height: $(window).height()*0.25,
			            //scroll:true,
			            //treeGrid: true,
			            //treeGridModel: 'adjacecncy',
			            //treedatatype: "local",
			           // ExpandColumn: 'subjectCode',
			            /*altRows:true,
			            altclass:'.grid-row-odd',*/
						autowidth:true,
						rownumWidth: 35, // the width of the row numbers columns
						shrinkToFit:false,  //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
						footerrow:true,  //设置表格显示表脚
						userDataOnFooter:true,//设置userData 显示在footer里
						/*grouping:true, 
						groupingView :
						{ groupField : ['creditDirection'] },*/
						ondblClickRow:function(id){
						//双击进入编辑
			   				var delid = id;
			   				
						},
						onSelectRow:function(id){
							if(id!=lastsel&&lastsel!=''){
								$(options.TableName).jqGrid('saveRow',lastsel,{
									aftersavefunc:function(rowid,response ){
										console.log(id);
									
									}
									});
								footerData();
							}
							lastsel=id;
						var rec = $(options.TableName).jqGrid('getRowData', id);
						
							//footerData();
							
						
						},
						
						beforeSelectRow:function(rowid,e){

						},
						afterInsertRow: function (rowid, aData) { //新增一行之后

						},
						gridComplete: function() {
							var ids=$(options.TableName).jqGrid("getDataIDs");
						},
						loadComplete:function(data){
							//footerData();
							var arr = document.querySelectorAll('.number');
//							arr.forEach(function(e){
//								(e.dataset.rid == '') && (e.className = 'number');
//								(e.dataset.rid == '') && (e.parentNode.dataset.target = '')
//							});
							
							for(var i = 0,len = arr.length;i < len;i ++){
								(arr[i].dataset.rid == '') && (arr[i].className = 'number');
								(arr[i].dataset.rid == '') && (arr[i].parentNode.dataset.target = '');
							} 
                            totalCalc();
							$('.footrow td:first-child').html('合计');
						},
						loadError:function(xhr,status,error){
							//console.log(status)
						}
						});
			}
			function totalCalc(){
				var idsLeft = $(options.TableName).jqGrid('getDataIDs');
				var sumNumber = 0;
			//	var sumMoney = 0;
				for(var i = 0,len = idsLeft.length;i < len ;i ++){
					var thisid = $(options.TableName).getCell(idsLeft[i],"zonge"); 
					sumNumber += Number($(thisid).find("").prevObject.val());
					//sumMoney += parseFloat(totalPrice);
				}
				$('.footrow td').eq(6).html(sumNumber);
				//$('.footrow td').eq(7).html(sumMoney);
				//alert('123');
			}
			
			$(window).bind('click', function saveEdit(e) {
				var rowId = $(e.target).parent("tr").attr("id");
				if (lastsel != "" && lastsel != rowId) { //用于点击其他地方保存正在编辑状态下的行
					if ($(e.target).closest(options.TableName).length == 0) { 
						$(options.TableName).jqGrid('saveRow', lastsel);						
						lastsel='';
					}
				}
			});
			
			function addAndDelete(cellvalue, options, rowObjec){
				var addAndDel = '<div class="operating" data-id="' + options.rowId + '"><span class="glyphicon glyphicon-trash" aria-hidden="true" id="add_row" title="删除行"></span></div>';
				return addAndDel;
			}
			
			//单据编号触发事件
			function detailMod(cellvalue, options, rowObjec){
				//return detailM = '<div value="' + cellvalue +'" class="detail" data-id="' + options.rowId + '></div>';
				return detailM = '<span class="detail" >' + cellvalue + '</span>';
			}
			
		
			/**
			 * 自定义列计算
			 * @param val
			 * @param name
			 * @param record
			 * @returns {String}
			 */
			/*function mysum(val, name, record)
			{
				return "("+record.subCla+")小计：";
			}/*
			
			/**
			 * 修改表格底部
			 */
			/*function footerData(){			
				var zonge = $(options.TableName).getCol('zonge',false,'sum');
				
				$(options.TableName).jqGrid('footerData','set',{
					"fold":"合计:",
		            "zonge":zonge		            
			         }
				);
			}*/
			
			

		//查询
		$(document).on("click",".btn-group button[data-eventname='inquire']",function(event){			
			if(flag==true){
			$.jgrid.GridDestroy(options.TableName);
			loadtable();
			}else{
				flag=true;
			}
			
		});
		

		$(document).on("click",".btn button[data-eventname='printbtn']",function(event){
			$.zxsaas_plus.showalert("表格打印操作", "表格打印操作咱未完成，敬请期待");
			
		});
		$(document).on("click",".btnbox button[data-eventname='exportTablename']",function(event){
			$.zxsaas_plus.showalert("表格导出操作", "表格导出操作咱未完成，敬请期待");
			
		});
		
		
}

/**
 * 单据明细  双击
 */
$(document).on('dblclick', '.detail',function(e){
	$(".danju").show();
			var options = {
				LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
				LoadTableUrl: "../../json/Storage/allotReceive.json",
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
				TableName: "#jqGrid_detail", //显示表格名称。遵照css选择器书写
				iconJsonUrl:"../json/icon.json",
				btnbox: ".btnbox ",//功能按钮存放容器。遵照css选择器书写	
				pager:"#jqGridPager_detail"
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
					var colNames = ['ID','仓库名称','商品名称','数量','商品备注'];
					var JqGridColModel=[
										{name:'deliveryId',index:'deliveryId', width:150,align:'center',sorttype:'string',hidden:true},
										{name:'export',index:'export', width:100,align:'center', sorttype:'string'},
										{name:'commodity',index:'commodity', width:100,align:'center', sorttype:'string'},
										{name:'number',index:'number', width:100,align:'center', sorttype:'integer'},	
										{name:'remark',index:'remark', width:150,align:'center', sorttype:'string'}
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
					            rownumbers:true,//显示行号
					            //loadonce: true,
					            rowNum: 20,
					            rowList: [20, 25, 40],
					            pager:options.pager,
					            viewrecords: true,	//是否要记录总数	           
		                       // multiselect : true,	//复选框属性
					           	//cellEdit:true,
					            width: "100%" ,
					            height: $(window).height()*0.20,
								autowidth:true,
								footerrow:true,  //设置表格显示表脚
								userDataOnFooter:true,//设置userData 显示在footer里
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
//									$(options.TableName).setGridParam().hideCol("metaMoneySee");
//									$(options.TableName).setGridParam().hideCol("metaMoneyUpdate");
//									$(options.TableName).setGridParam().hideCol("clientSee");
									
								},
								loadError:function(xhr,status,error){
									//console.log(status)
								},
								loadComplete:function(data){
									var arr = document.querySelectorAll('.number');
									
									for(var i = 0,len = arr.length;i < len;i ++){
										(arr[i].dataset.rid == '') && (arr[i].className = 'number');
										(arr[i].dataset.rid == '') && (arr[i].parentNode.dataset.target = '');
									}

									totalCalc();
									$('.footrow td:first-child').html('合计');
								}
								});
				}
					/**
					 * 修改表格底部
					 */
					function totalCalc(){
						var idsLeft = $(options.TableName).jqGrid('getDataIDs');
						var sumNumber = 0;
						for(var i = 0,len = idsLeft.length;i < len ;i ++){
							var thisid = $(options.TableName).getCell(idsLeft[i],"number"); 
							sumNumber += Number($(thisid).find('input').prevObject.val());
						}
						$('.footrow td').eq(4).html(sumNumber);
					}
					
						
	});

$(document).on('click','.detail',function(){
	$(".tableNone").attr("display","none");
});


/**
 * 接收
 */
$(document).on('click', '.reception',function(e){
			var options = {
				LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
				LoadTableUrl: "../../json/Storage/allotReceive.json",
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
				TableName: "#jqGrid_tranReceive", //显示表格名称。遵照css选择器书写
				iconJsonUrl:"../json/icon.json",
				btnbox: ".btnbox ",//功能按钮存放容器。遵照css选择器书写	
				pager:"#gridpager_tranReceive"
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
					var colNames = ['单据编号','调出部门','调入部门','调拨总额','备注','新增人','新增时间','发货人','发货时间'];
					var JqGridColModel=[
										{name:'billsNumber',index:'billsNumber', width:150,align:'center',sorttype:'string',formatter:detailMod2},
										{name:'export',index:'export', width:100,align:'center', sorttype:'string'},
										{name:'fold',index:'fold', width:100,align:'center', sorttype:'string'},
										{name:'zonge',index:'zonge', width:100,align:'center', sorttype:'integer'},	
										{name:'remark',index:'remark', width:150,align:'center', sorttype:'string'},
										{name:'addPeople',index:'addPeople', width:100,align:'center', sorttype:'string'},
										{name:'addDate',index:'addDate', width:100,align:'center', sorttype:'string'},
										{name:'shipmentsPeople',index:'shipmentsPeople', width:100,align:'center', sorttype:'string'},
										{name:'shipmentsDate',index:'shipmentsDate', width:100,align:'center', sorttype:'string'}
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
					            rownumbers:true,//显示行号
					            //loadonce: true,
					            rowNum: 20,
					            rowList: [20, 25, 40],
					            pager:options.pager,
					            viewrecords: true,	//是否要记录总数	           
		                       // multiselect : true,	//复选框属性
					           	//cellEdit:true,
					            footerrow:true,  //设置表格显示表脚
								userDataOnFooter:true,//设置userData 显示在footer里
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
//									$(options.TableName).setGridParam().hideCol("metaMoneySee");
//									$(options.TableName).setGridParam().hideCol("metaMoneyUpdate");
//									$(options.TableName).setGridParam().hideCol("clientSee");
									
								},
								loadError:function(xhr,status,error){
									//console.log(status)
								},
								loadComplete:function(data){
									var arr = document.querySelectorAll('.number');
//									arr.forEach(function(e){
//										(e.dataset.rid == '') && (e.className = 'number');
//										(e.dataset.rid == '') && (e.parentNode.dataset.target = '')
//									});
									
									for(var i = 0,len = arr.length;i < len;i ++){
										(arr[i].dataset.rid == '') && (arr[i].className = 'number');
										(arr[i].dataset.rid == '') && (arr[i].parentNode.dataset.target = '');
									}
									 totalCalc();
										$('.footrow td:first-child').html('合计');
								},
								
								});
				}
					/**
					 * 修改表格底部
					 */
					function totalCalc(){
						var idsLeft = $(options.TableName).jqGrid('getDataIDs');
						var sumNumber = 0;
					//	var sumMoney = 0;
						for(var i = 0,len = idsLeft.length;i < len ;i ++){
							var thisid = $(options.TableName).getCell(idsLeft[i],"zonge"); 
							sumNumber += Number($(thisid).find("").prevObject.val());
							//sumMoney += parseFloat(totalPrice);
						}
						$('.footrow td').eq(5).html(sumNumber);
						//$('.footrow td').eq(7).html(sumMoney);
						//alert('123');
					}
				//单据编号触发事件
				function detailMod2(cellvalue, options, rowObjec){
					return detailM2 = '<span class="detailJS" >' + cellvalue + '</span>';
				}
				

	});
/**
 * 单据明细  双击  接收
 */
$(document).on('dblclick', '.detailJS',function(e){
	$(".danju3").show();
			var options = {
				LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
				LoadTableUrl: "../../json/Storage/allotReceive.json",
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
				TableName: "#jqGrid_detail2", //显示表格名称。遵照css选择器书写
				iconJsonUrl:"../json/icon.json",
				btnbox: ".btnbox ",//功能按钮存放容器。遵照css选择器书写	
				pager:"#jqGridPager_detail2"
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
					var colNames = ['ID','仓库名称','商品名称','数量','商品备注'];
					var JqGridColModel=[
										{name:'deliveryId',index:'deliveryId', width:150,align:'center',sorttype:'string',hidden:true},
										{name:'export',index:'export', width:100,align:'center', sorttype:'string'},
										{name:'commodity',index:'commodity', width:100,align:'center', sorttype:'string'},
										{name:'number',index:'number', width:100,align:'center', sorttype:'integer'},	
										{name:'remark',index:'remark', width:150,align:'center', sorttype:'string'}
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
					            rownumbers:true,//显示行号
					            //loadonce: true,
					            rowNum: 20,
					            rowList: [20, 25, 40],
					            pager:options.pager,
					            viewrecords: true,	//是否要记录总数	           
		                       // multiselect : true,	//复选框属性
					           	//cellEdit:true,
					            footerrow:true,  //设置表格显示表脚
								userDataOnFooter:true,//设置userData 显示在footer里
					            width: "100%" ,
					            height: $(window).height()*0.17,
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
//									$(options.TableName).setGridParam().hideCol("metaMoneySee");
//									$(options.TableName).setGridParam().hideCol("metaMoneyUpdate");
//									$(options.TableName).setGridParam().hideCol("clientSee");
									
								},
								loadError:function(xhr,status,error){
									//console.log(status)
								},
								loadComplete:function(data){
									var arr = document.querySelectorAll('.number');
//									arr.forEach(function(e){
//										(e.dataset.rid == '') && (e.className = 'number');
//										(e.dataset.rid == '') && (e.parentNode.dataset.target = '')
//									});
									
									for(var i = 0,len = arr.length;i < len;i ++){
										(arr[i].dataset.rid == '') && (arr[i].className = 'number');
										(arr[i].dataset.rid == '') && (arr[i].parentNode.dataset.target = '');
									}
									 totalCalc();
										$('.footrow td:first-child').html('合计');
								},
								});
				}	
					/**
					 * 修改表格底部
					 */
					function totalCalc(){
						var idsLeft = $(options.TableName).jqGrid('getDataIDs');
						var sumNumber = 0;
					//	var sumMoney = 0;
						for(var i = 0,len = idsLeft.length;i < len ;i ++){
							var thisid = $(options.TableName).getCell(idsLeft[i],"number"); 
							sumNumber += Number($(thisid).find("").prevObject.val());
							//sumMoney += parseFloat(totalPrice);
						}
						$('.footrow td').eq(4).html(sumNumber);
						//$('.footrow td').eq(7).html(sumMoney);
						//alert('123');
					}
	});
/**
 * 拒收
 */
$(document).on('click', '.rejection',function(e){
			var options = {
				LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
				LoadTableUrl: "../../json/Storage/allotReceive.json",
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
				TableName: "#jqGrid_tranRejection", //显示表格名称。遵照css选择器书写
				iconJsonUrl:"../json/icon.json",
				btnbox: ".btnbox ",//功能按钮存放容器。遵照css选择器书写	
				pager:"#gridpager_tranRejection"
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
					var colNames = ['单据编号','调出部门','调入部门','调拨总额','备注','拒收原因','新增人','新增时间','发货人','发货时间'];
					var JqGridColModel=[
										{name:'billsNumber',index:'billsNumber', width:150,align:'center',sorttype:'string',formatter:detailMod2},
										{name:'export',index:'export', width:100,align:'center', sorttype:'string'},
										{name:'fold',index:'fold', width:100,align:'center', sorttype:'string'},
										{name:'zonge',index:'zonge', width:100,align:'center', sorttype:'integer'},	
										{name:'remark',index:'remark', width:150,align:'center', sorttype:'string'},
										{name:'rejectionYY',index:'rejectionYY', width:150,align:'center', sorttype:'string'},
										{name:'addPeople',index:'addPeople', width:100,align:'center', sorttype:'string'},
										{name:'addDate',index:'addDate', width:100,align:'center', sorttype:'string'},
										{name:'shipmentsPeople',index:'shipmentsPeople', width:100,align:'center', sorttype:'string'},
										{name:'shipmentsDate',index:'shipmentsDate', width:100,align:'center', sorttype:'string'}
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
					            rownumbers:true,//显示行号
					            //loadonce: true,
					            rowNum: 20,
					            rowList: [20, 25, 40],
					            pager:options.pager,
					            viewrecords: true,	//是否要记录总数	           
		                       // multiselect : true,	//复选框属性
					           	//cellEdit:true,
					            footerrow:true,  //设置表格显示表脚
								userDataOnFooter:true,//设置userData 显示在footer里
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
//									$(options.TableName).setGridParam().hideCol("metaMoneySee");
//									$(options.TableName).setGridParam().hideCol("metaMoneyUpdate");
//									$(options.TableName).setGridParam().hideCol("clientSee");
									
								},
								loadError:function(xhr,status,error){
									//console.log(status)
								},
								loadComplete:function(data){
									var arr = document.querySelectorAll('.number');
//									arr.forEach(function(e){
//										(e.dataset.rid == '') && (e.className = 'number');
//										(e.dataset.rid == '') && (e.parentNode.dataset.target = '')
//									});
									
									for(var i = 0,len = arr.length;i < len;i ++){
										(arr[i].dataset.rid == '') && (arr[i].className = 'number');
										(arr[i].dataset.rid == '') && (arr[i].parentNode.dataset.target = '');
									}
									 totalCalc();
									 $('.footrow td:first-child').html('合计');
								},
								
								});
				}	
				//单据编号触发事件
				function detailMod2(cellvalue, options, rowObjec){
					return detailM2 = '<span class="detailJU" >' + cellvalue + '</span>';
				}
				/**
				 * 修改表格底部
				 */
				function totalCalc(){
					var idsLeft = $(options.TableName).jqGrid('getDataIDs');
					var sumNumber = 0;
				//	var sumMoney = 0;
					for(var i = 0,len = idsLeft.length;i < len ;i ++){
						var thisid = $(options.TableName).getCell(idsLeft[i],"zonge"); 
						sumNumber += Number($(thisid).find("").prevObject.val());
						//sumMoney += parseFloat(totalPrice);
					}
					$('.footrow td').eq(5).html(sumNumber);
					//$('.footrow td').eq(7).html(sumMoney);
					//alert('123');
				}

	});

/**
 * 单据明细  双击  拒收
 */
$(document).on('dblclick', '.detailJU',function(e){
	$(".danju2").show();
			var options = {
				LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
				LoadTableUrl: "../../json/Storage/allotReceive.json",
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
				TableName: "#jqGrid_rejection2", //显示表格名称。遵照css选择器书写
				iconJsonUrl:"../json/icon.json",
				btnbox: ".btnbox ",//功能按钮存放容器。遵照css选择器书写	
				pager:"#jqGridPager_rejection2"
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
					var colNames = ['ID','仓库名称','商品名称','数量','商品备注'];
					var JqGridColModel=[
										{name:'deliveryId',index:'deliveryId', width:150,align:'center',sorttype:'string',hidden:true},
										{name:'export',index:'export', width:100,align:'center', sorttype:'string'},
										{name:'commodity',index:'commodity', width:100,align:'center', sorttype:'string'},
										{name:'number',index:'number', width:100,align:'center', sorttype:'integer'},	
										{name:'remark',index:'remark', width:150,align:'center', sorttype:'string'}
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
					            rownumbers:true,//显示行号
					            //loadonce: true,
					            rowNum: 20,
					            rowList: [20, 25, 40],
					            pager:options.pager,
					            viewrecords: true,	//是否要记录总数	           
		                       // multiselect : true,	//复选框属性
					           	//cellEdit:true,
					            footerrow:true,  //设置表格显示表脚
								userDataOnFooter:true,//设置userData 显示在footer里
					            width: "100%" ,
					            height: $(window).height()*0.20,
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
//									$(options.TableName).setGridParam().hideCol("metaMoneySee");
//									$(options.TableName).setGridParam().hideCol("metaMoneyUpdate");
//									$(options.TableName).setGridParam().hideCol("clientSee");
									
								},
								loadError:function(xhr,status,error){
									//console.log(status)
								},
								loadComplete:function(data){
									var arr = document.querySelectorAll('.number');
//									arr.forEach(function(e){
//										(e.dataset.rid == '') && (e.className = 'number');
//										(e.dataset.rid == '') && (e.parentNode.dataset.target = '')
//									});
									
									for(var i = 0,len = arr.length;i < len;i ++){
										(arr[i].dataset.rid == '') && (arr[i].className = 'number');
										(arr[i].dataset.rid == '') && (arr[i].parentNode.dataset.target = '');
									}
									 totalCalc();
										$('.footrow td:first-child').html('合计');
								},
								});
				}	
					/**
					 * 修改表格底部
					 */
					function totalCalc(){
						var idsLeft = $(options.TableName).jqGrid('getDataIDs');
						var sumNumber = 0;
					//	var sumMoney = 0;
						for(var i = 0,len = idsLeft.length;i < len ;i ++){
							var thisid = $(options.TableName).getCell(idsLeft[i],"number"); 
							sumNumber += Number($(thisid).find("").prevObject.val());
							//sumMoney += parseFloat(totalPrice);
						}
						$('.footrow td').eq(4).html(sumNumber);
						//$('.footrow td').eq(7).html(sumMoney);
						//alert('123');
					}
	});


/**
 * 串号校验
 */
var rowId = '';
$(document).on('click', '.verify',function(e){
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
				showIcon: false
			}
//			check: {
//					enable: true,
//					chkStyle: "checkbox",
//					chkboxType: { "Y": "ps", "N": "ps" }
//			}
	    }; 
		
	        rowId = $(this).data('rid');
	        console.log(rowId + '..rowId');
			var options = {
				LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
				LoadTableUrl: "../../json/Storage/allotReceive.json",
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
				TableName: "#jqGrid_tranVerify", //显示表格名称。遵照css选择器书写
				iconJsonUrl:"../json/icon.json",
				btnbox: ".btnbox ",//功能按钮存放容器。遵照css选择器书写	
				pager:"#gridpager_tranVerify"
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
					var colNames = ['商品名称','串号','已校验'];
					var JqGridColModel=[
										{name:'commodity',index:'commodity', width:150,align:'center',sorttype:'string'},
										{name:'number',index:'number', width:100,align:'center', sorttype:'string'},
										{name:'verify',index:'verify', width:100,align:'center', sorttype:'string',editoptions:{value:"0:√;1:"}}
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
					            rownumbers:true,//显示行号
					            //loadonce: true,
					            rowNum: 20,
					            rowList: [20, 25, 40],
					            pager:options.pager,
					            viewrecords: true,	//是否要记录总数	           
		                       // multiselect : true,	//复选框属性
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
//									$(options.TableName).setGridParam().hideCol("metaMoneySee");
//									$(options.TableName).setGridParam().hideCol("metaMoneyUpdate");
//									$(options.TableName).setGridParam().hideCol("clientSee");
									
								},
								loadError:function(xhr,status,error){
									//console.log(status)
								},
								
								})
				}	
	});


/*调出部门*/
(function() {
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
			onClick: function(event, treeId, treeNode, msg) {

				console.log(treeNode.id); //通过id调用对应方法 重构表格
				
			}
		},
		view: {
			showIcon: false
		}
		
	};

	$.ajax({
		type: 'Get',
		url: '../../json/Storage/tranBUMEN.json',
		dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
		success: function(data) {
			$.fn.zTree.init($("#mySectionTree"), setting, data);
			var str = $('#mySectionTree_1_switch').attr('class');
			//console.log(str); //button level0 switch roots_close
			var zTree = $.fn.zTree.getZTreeObj("mySectionTree");
		    zTree.expandAll(true);//展开全部节点
			var Class = str.replace('roots', 'center');
			$('#mySectionTree_1_switch').attr('class', Class);
		},
		error: function(msg) {
			alert(" 数据加载失败！" + msg);
		}
	});

})();

//经手人
function loadmyper() {
	var options = {
		LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
		LoadTableUrl: "../../json/Storage/tranYuan.json",
		//LoadTableUrl: "../../cw/qc/getSubject", //表格数据加载接口地址
		GetRowInfoUrl: "", //编辑时获取数据详细信息接口加载地址
		//LoadTableFomatUrl:"../../json/T_roles.json",
		//LoadTableFomatUrl: "../../", //获取表格显示格式数据加载地址
		//SaveEditUrl: "", //新增或修改后保存数据接口地址
		//SaveAddUrl: "", //新增或修改后保存数据接口地址
		DelRowUrl: "", // 删除信息接口地址
		isSub: "", //是否有子级表格
		subLoadTableUrl: "", //子级表格数据来源地址
		//ModouleName: "", //模块名称。遵照css选择器书写  systemSet_companyParameter
		TableName: "#jqGrid_myPer", //显示表格名称。遵照css选择器书写
		iconJsonUrl: "../json/icon.json",
		btnbox: ".btnbox ", //功能按钮存放容器。遵照css选择器书写	
		pager: "#jqGridmyPer"
			//		inputbox: ".inputbox" //搜索条件框存放容器。遵照css选择器书写
	};

	$.jgrid.defaults.width = 1280;
	$.jgrid.defaults.responsive = true;
	$.jgrid.defaults.styleUI = 'Bootstrap';
	var lastsel = ''; //最后一次选中的行
	var rightClickColid = ""; //右键列id
	var rightClickColIndex = 0; //右键index
	var mydata;
	var hid = false;
	var lock = false;
	var myobj = [];
	//var toggleflag=false;//冻结时候切换用
	var colNames = ['ID','员工编码', '员工名称', '所属部门', '职位名称','员工属性','备注'];
	var JqGridColModel = [
                        {name:'depId',index:'depId', width:100,align:'center', sorttype:'string',hidden:true},
						{name:'code',index:'code', width:100,align:'center',sorttype:"string"},
						{name:'name',index:'name', width:150,align:'center', sorttype:'string',formatter:checkName},
						{name:'sector',index:'sector', width:150,align:'center', sorttype:'string'},
						{name:'post',index:'post', width:150,align:'center', sorttype:'string'},
						{name:'property',index:'property', width:100,align:'center', sorttype:'string'},
						{name:'remark',index:'remark', width:200,align:'center', sorttype:'string'}
	                ];

	loadtable();
	//加载表格

	/*$.getJSON(options.LoadTableUrl,function(t_datat){
		mydata=t_datat;
		//$(options.TableName).setGridParam({data: mydata}).trigger('reloadGrid');  
	});*/
	function loadtable(){
//		$.post(options.LoadTableUrl,{},function(r){
//			if(r.data.rows!=null){
//				 mydata=r.data;
//			//console.log(mydata);
			$(options.TableName).jqGrid({
				url:options.LoadTableUrl,
				mtype:"GET",
//				datatype: "jsonstring",
//		        datastr: mydata,
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
//	            multiselect:true,
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
					
				},
				loadError:function(xhr,status,error){
					//console.log(status)
				}
				})
	}
}
//经办人
function checkName(cellvalue, options, rowObject){
//	console.log(rowObject);
	return '<span class="checkName" data-dismiss="modal">' + cellvalue + '</span>';
};
$(document).on('click','.checkName',function(e){
	$('.perSearch').val($(this).html());
});

