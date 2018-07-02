		function loadmodal()
			{
		var options = {
		LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
		LoadTableUrl: "../../json/retailDeliveryUpdate.json",
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
		$("#datetimepickerEnd").datetimepicker({
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
			var colNames = ['操作','ID','店仓名称','商品名称','数量','单价','金额','备注'];
			var JqGridColModel=[
								{name:'deliveryDo',index:'deliveryDo', width:70,align:'center',formatter: addAndDelete},
								{name:'deliveryId',index:'deliveryId', width:200,align:'center', sorttype:'int',hidden:true},
								{name:'goods_number',index:'goods_number', width:100,align:'center', sorttype:'integer',editable:true},
								{name:'goods_id',index:'goods_id', width:200,align:'center', sorttype:'string',editable:true},
								{name:'goods_number',index:'goods_number', width:100,align:'center', sorttype:'integer',editable:true},
								{name:'goods_number',index:'goods_number', width:100,align:'center',  sorttype:'float',formatter:"number",editable:true},
								{name:'goods_number',index:'goods_number', width:100,align:'center',  sorttype:'float',formatter:"number"},
								{name:'remark',index:'remark', width:300,align:'center', sorttype:'string',editable:true}
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
//			            multiselect:true,
			           	cellEdit:true,
			            width: "100%" ,
			            height: $(window).height()*0.55,
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
						/*footerrow:true,  //设置表格显示表脚
						userDataOnFooter:true,//设置userData 显示在footer里
*/						/*grouping:true, 
						groupingView :
						{ groupField : ['creditDirection'] },*/
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
								footerData();
							}
							lastsel=id;
						var rec = $(options.TableName).jqGrid('getRowData', id);
						
							footerData();
							
						
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
			
			function addAndDelete(cellvalue, options, rowObjec){
				var addAndDel = '<div class="operating" data-id="' + options.rowId + '"><span style="margin-right:0.7rem" id="remove_row" title="添加商品" class="glyphicon glyphicon-plus"></span><span class="glyphicon glyphicon-trash" aria-hidden="true" id="add_row" title="删除行"></span></div>';
				return addAndDel;
			}
			function mySelect(cellvalue, options, rowObjec){
				var mySelect = '<select style="width:90%" class="" onclick="" value="请选择"></select>';
				return mySelect;
			}
			function getData(){
				//动态生成select
				var opt = '';
			}
			
			function myFmatter (cellvalue, options, rowObject) {
				//console.log(cellvalue);
				if(cellvalue=="1"){
					return "借方" ;
				}else if(cellvalue=="0"){
					return "贷方" ;
				}else{
					return "";
				}
				
			}
			
			//新增一行
			$(document).on('click', '.glyphicon-plus',function(e){
				var thisTitle = $(this).attr("title");
				var rowId = $(this).parent().data('id');
				var ids = $(options.TableName).jqGrid('getDataIDs');
				//获得当前最大行号（数据编号）
				var maxid;
				if(ids.length ==0 ){
						maxid=0;
					}else{
						maxid = Math.max.apply(Math,ids);
					}		
				$(options.TableName).jqGrid('addRowData', maxid+1, {}, 'last' );
				$(options.TableName).jqGrid("setCell",maxid+1,"",maxid+1);			
			});
			
			
			//删除一行
			$(document).on('click', '.glyphicon-trash',function(e){
				var thisTitle = $(this).attr("title");
				var rowId = $(this).parent().data('id');
				if(thisTitle == "删除行"){
					console.log('条数:' + $('#jqGrid_SubjectBalance tbody tr').length);
					if($('#jqGrid_SubjectBalance tbody tr').length === 2) {
						$.zxsaas_plus.showalert("错误","至少保留一条数据!")
						return false;
					}
					$.zxsaas_plus.showconfirm("","是否确定删除本行?",function(){
						$(options.TableName).jqGrid('delRowData', rowId);
					},function(){
						
					});

				}
			});
			
			function footerData(){			
				var sum_accumulateBorrowNum = $(options.TableName).getCol('accumulateBorrowNum',false,'sum');
				var sum_accumulateBorrowAmuont = $(options.TableName).getCol('accumulateBorrowAmuont',false,'sum');
				var sum_accumulateLoanNum = $(options.TableName).getCol('accumulateLoanNum',false,'sum');
				var sum_accumulateLoanAmuont = $(options.TableName).getCol('accumulateLoanAmuont',false,'sum');
				var sum_periodBeginNum = $(options.TableName).getCol('periodBeginNum',false,'sum');
				var sum_periodBeginAmount = $(options.TableName).getCol('periodBeginAmount',false,'sum');
				var sum_yearBeginNum = $(options.TableName).getCol('yearBeginNum',false,'sum');
				var sum_yearBeginBalance = $(options.TableName).getCol('yearBeginBalance',false,'sum');
				$(options.TableName).jqGrid('footerData','set',{
		            "accumulateBorrowNum": sum_accumulateBorrowNum,
		            "accumulateBorrowAmuont": sum_accumulateBorrowAmuont,
		            "accumulateLoanNum": sum_accumulateLoanNum,
		            "accumulateLoanAmuont": sum_accumulateLoanAmuont,
		            "periodBeginNum": sum_periodBeginNum,
		            "periodBeginAmount": sum_periodBeginAmount,
		            "yearBeginNum":sum_yearBeginNum,
		            "yearBeginBalance": sum_yearBeginBalance
			         }
				);
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
		

