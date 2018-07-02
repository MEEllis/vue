	function loadmodal(){
		
		var options = {
		LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
		//LoadTableUrl: "../../json/T_rolesdata.json",
		LoadTableUrl: "../../json/retailBarterAdd.json", //表格数据加载接口地址
		LoadTableUrlAdd: "../../json/retailBarter.json", //表格数据加载接口地址
		GetRowInfoUrl: "", //编辑时获取数据详细信息接口加载地址
		//LoadTableFomatUrl:"../../json/T_roles.json",
//		/LoadTableFomatUrl: "../../json/cw/SubjectBalance.json", //获取表格显示格式数据加载地址
		//SaveEditUrl: "", //新增或修改后保存数据接口地址
		//SaveAddUrl: "", //新增或修改后保存数据接口地址
		DelRowUrl: "", // 删除信息接口地址
		isSub:"",//是否有子级表格
		subLoadTableUrl:"",//子级表格数据来源地址
		//ModouleName: "", //模块名称。遵照css选择器书写  systemSet_companyParameter
		TableName: "#jqGrid_SubjectBalance", //显示表格名称。遵照css选择器书写
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
			var JqGridColModel=[
			                    {
			                        "name": "operation",
			                        "width": "75",
			                        "index": "operation",
//			                        "hidden": false,        
			                        "align": "center",
			                        "id": "1",
			                        "sortable":false,
			                        "label":"操作"
			                        
			                    },
			                    {
			                        "name": "gift",
			                        "width": "75",
			                        "index": "gift",
			                        "align": "center",
			                        "id": "2",
			                        "sortable":false,
			                        "label":"赠品 "
			                    },
			                    {
			                        "name": "contractMachine",
			                        "width": "75",
			                        "index": "contractMachine",
			                        "id": "3",
			                        "sortable":false,
			                        "align": "center",
			                        "label":"合约机"
			                    },
			                    {
			                        "name": "imei",
			                        "width": "150",
			                        "index": "imei",
			                        "align": "center",
			                        "id": "4",
			                        "formatter":"string",
			                        "editable":true,
			                        "edittype":"string",
			                        "sortable":false,
			                        "label":"串号"
			                    },
			                    {
			                        "name": "goodsId",
			                        "width": "120",
			                        "index": "goodsId",
			                        "align": "center",
			                        "editable":false,
			                        "sortable":false,
			                        "id": "5",
			                        "label":"商品名称 "
			                    },
			                    {
			                        "name": "num",
			                        "width": "100",
			                        "index": "num",
			                        "formatter": "string",
			                        "align": "center",
			                        "sortable":false,
			                        "editable":true,
			                        "id": "8",
			                         "label":"数量"
			                    },
			                    {
			                        "name": "taxPrice",
			                        "width": "100",
			                        "index": "taxPrice",
			                        "formatter": "string",
			                        "align": "center",
			                        "sortable":false,			                        
			                        "id": "9",
			                         "label":"含税单价"
			                    },
			                     {
			                        "name": "taxAmount",
			                        "width": "100",
			                        "index": "taxAmount",
			                        "formatter": "number",
			                        "align": "center",
			                        "sortable":false,
			                        "id": "9",
			                         "label":"含税金额"
			                    },
			                            {
			                        "name": "price",
			                        "width": "100",
			                        "index": "price",
			                        "formatter": "number",
			                        "align": "center",
			                        "sortable":false,
			                        "id": "9",
			                         "label":"单价"
			                    },
			                            {
			                        "name": "amount",
			                        "width": "120",
			                        "index": "amount",
			                        "formatter": "number",
			                        "align": "center",
			                        "sortable":false,
			                        "id": "9",
			                         "label":"金额"
			                    },
			                    {
			                        "name": "discountRate",
			                        "width": "120",
			                        "index": "discountRate",
			                        "formatter": "string",
			                        "sortable":false,
			                        "align": "center",
			                        "id": "9",
			                         "label":"折扣率"
			                    },
	               
			                            {
			                        "name": "discountedAmount",
			                        "width": "120",
			                        "index": "discountedAmount",
			                       " formatter": "number",
			                        "align": "center",
			                        "sortable":false,
			                        "id": "9",
			                         "label":"折后余额"
			                    },
			                    {
			                        "name": "taxRate",
			                        "width": "120",
			                        "index": "taxRate",
			                        "formatter": "string",
			                        "id": "10",
			                        "align": "center",
			                        "label":"税率"
			                    },
			                    {
			                        "name": "taxLimit",
			                        "width": "120",
			                        "index": "taxLimit",
			                        "id": "11",
			                        "align": "center",
			                        "label":"税额"
			                    },
			                    {
			                        "name": "installmentFlag",
			                        "width": "120",
			                        "index": "installmentFlag",
			                        "id": "11",
			                        "align": "center",
			                        "label":"是否分期"
			                    },
			                    {
			                        "name": "installmentId",
			                        "width": "150",
			                        "index": "installmentId",
			                        "id": "11",
			                        "align": "center",
			                        "label":"分期公司"
			                    },
			                    {
			                        "name": "installmentPayment",
			                        "width": "120",
			                        "index": "installmentPayment",
			                        "id": "11",
			                        "align": "center",
			                        "label":"分期首付"
			                    },
			                    {
			                        "name": "installmentBalance",
			                        "width": "120",
			                        "index": "installmentBalance",
			                        "id": "11",
			                        "sortable":false,
			                        "align": "center",
			                        "label":"分期余额"
			                    },
			                    {
			                        "name": "couponAmount",
			                        "width": "120",
			                        "index": "couponAmount",
			                        "id": "11",
			                        "align": "center",
			                        "label":"券"
			                    },
			                    {
			                        "name": "remark",
			                        "width": "120",
			                        "index": "remark",
			                        "id": "11",
			                        "sortable":false,
			                        "align": "center",
			                        "label":"备注"
			                    },
			                    {
			                        "name": "authorizationId",
			                        "width": "120",
			                        "index": "authorizationId",
			                        "id": "11",
			                        "align": "center",
			                        "label":"授权码"
			                    },
			                    
			               
			                ];
			
			loadtableA();
		//加载表格
		
		$(".radioA").click(function(){
			console.log($.jgrid)
			$.jgrid.gridUnload(options.TableName);
			
			loadtableA();
		});
		
		$(".radioB").click(function(){
			$.jgrid.gridUnload(options.TableName);
			loadtableB();
		});
		
			/*$.getJSON(options.LoadTableUrl,function(t_datat){
				mydata=t_datat;
				//$(options.TableName).setGridParam({data: mydata}).trigger('reloadGrid');  
			});*/
			function loadtableA(){
/*				$.post(options.LoadTableUrl,{},function(r){
					
					if(r.data.rows!=null){
						 mydata=r.data;
						*/	 
					//console.log(mydata);
					$(options.TableName).jqGrid({
						url:options.LoadTableUrl,
						mtype:"GET",
						/*datatype: "jsonstring",
				        datastr: mydata,*/
						datatype: "json",
						//data:mydata,
						//datatype:"local",						
						//editurl: 'clientArray',
								
						jsonReader  : {	
						 		page: "page",
						 		total: "total", 
						 		records: "records",
								root: "rows",
								repeatitems: false
									},
		               /* treeReader : {
		                    //level_field: "level",
		                    parent_id_field: "parentId",
		                    leaf_field: "isLeaf"
		                    //expanded_field: "expanded"
		                },*/
						//cellsubmit: 'clientArray',//单元格保存内容的位置
						          
			            colModel:JqGridColModel,
			            //loadonce: false,
			            //sortable:false,			            
			            rownumbers:true,
			            //loadonce: true,
			            rowNum: 10,
			            rowList: [10, 15, 20, 25, 40],
			            pager:options.pager,
			            viewrecords: true,		           
//			            multiselect:true,
			           	//cellEdit:true,
			            width: "100%" ,
			            height: $(window).height()*0.65,
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
				$(options.TableName).jqGrid('setGroupHeaders',{
		    		useColSpanStyle: true,
		    		groupHeaders: [
		          { startColumnName: "accumulateBorrowNum",numberOfColumns: 2, titleText: "累计借方"  },
		          { startColumnName: "accumulateLoanNum",numberOfColumns: 2, titleText: "累计贷方"  },
		          { startColumnName: "periodBeginNum",numberOfColumns: 2, titleText: "期初余额"  },
		          { startColumnName: "yearBeginNum",numberOfColumns: 2, titleText: "年初余额"  }
		    		]
		    })
				/*}else{
					$.zxsaas_plus.showalert("查询数据失败！","没有查询到数据");
					return false;
				}
				
			})*/	
			}
			
			
			function loadtableB(){
				console.log("aaaaa")
/*				$.post(options.LoadTableUrl,{},function(r){
					
					if(r.data.rows!=null){
						 mydata=r.data;
						*/	 
					//console.log(mydata);
					$(options.TableName).jqGrid({
						url:options.LoadTableUrlAdd,
						mtype:"GET",
						/*datatype: "jsonstring",
				        datastr: mydata,*/
						datatype: "json",
						//data:mydata,
						//datatype:"local",						
						//editurl: 'clientArray',
								
						jsonReader  : {	
						 		page: "page",
						 		total: "total", 
						 		records: "records",
								root: "rows",
								repeatitems: false
									},
		               /* treeReader : {
		                    //level_field: "level",
		                    parent_id_field: "parentId",
		                    leaf_field: "isLeaf"
		                    //expanded_field: "expanded"
		                },*/
						//cellsubmit: 'clientArray',//单元格保存内容的位置
						          
			            colModel:JqGridColModel,
			            //loadonce: false,
			            //sortable:false,			            
			            rownumbers:true,
			            //loadonce: true,
			            rowNum: 10,
			            rowList: [10, 15, 20, 25, 40],
			            pager:options.pager,
			            viewrecords: true,		           
//			            multiselect:true,
			           	//cellEdit:true,
			            width: "100%" ,
			            height: $(window).height()*0.65,
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
				$(options.TableName).jqGrid('setGroupHeaders',{
		    		useColSpanStyle: true,
		    		groupHeaders: [
		          { startColumnName: "accumulateBorrowNum",numberOfColumns: 2, titleText: "累计借方"  },
		          { startColumnName: "accumulateLoanNum",numberOfColumns: 2, titleText: "累计贷方"  },
		          { startColumnName: "periodBeginNum",numberOfColumns: 2, titleText: "期初余额"  },
		          { startColumnName: "yearBeginNum",numberOfColumns: 2, titleText: "年初余额"  }
		    		]
		    })
				/*}else{
					$.zxsaas_plus.showalert("查询数据失败！","没有查询到数据");
					return false;
				}
				
			})*/	
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
		

