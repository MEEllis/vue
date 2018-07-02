		function loadmodal()
			{
		var options = {
		LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
		//LoadTableUrl: "../../json/T_rolesdata.json",
		LoadTableUrl: "../../json/retailBarter.json", //表格数据加载接口地址
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
			                        "name": "id",
			                        "width": "75",
			                        "index": "id",
			                        "hidden":true,        
			                        "align": "center",
			                        "id": "1",
			                        "sortable":false,
			                        "label":"科目id"
			                        
			                    },
			                    {
			                        "name": "billsCode",
			                        "width": "200",
			                        "index": "billsCode",
			                        "align": "center",
			                        "id": "2",
			                        "sortable":false,
			                        "label":"单据编号 "
			                    },
			                    {
			                        "name": "retailDate",
			                        "width": "150",
			                        "index": "retailDate",
			                        "id": "3",
			                        "sortable":false,
			                        "align": "center",
			                        "label":"零售日期"
			                    },
			                    {
			                        "name": "retailStore",
			                        "width": "150",
			                        "index": "retailStore",
			                        "align": "center",
			                        "id": "4",
			                        "formatter":"string",
			                        "sortable":false,
			                        "label":"零售门店"
			                    },
			                    {
			                        "name": "vipInfo",
			                        "width": "120",
			                        "index": "vipInfo",
			                        "align": "center",
			                        "sortable":false,
			                        "id": "5",
			                        "label":"会员信息 "
			                    },
			                    {
			                        "name": "managersId",
			                        "width": "120",
			                        "index": "managersId",
			                        "formatter": "string",
			                        "align": "center",
			                        "sortable":false,
			                        "editable":true,
			                        "id": "8",
			                         "label":"营业员"
			                    },
			                    {
			                        "name": "billsAmount",
			                        "width": "120",
			                        "index": "billsAmount",
			                        "formatter": "string",
			                        "align": "center",
			                        "sortable":false,			                        
			                        "id": "9",
			                         "label":"补差金额"
			                    },
			                     {
			                        "name": "cash",
			                        "width": "120",
			                        "index": "cash",
			                        "formatter": "number",
			                        "align": "center",
			                        "sortable":false,
			                        "id": "9",
			                         "label":"现金"
			                    },
			                            {
			                        "name": "pos",
			                        "width": "120",
			                        "index": "pos",
			                        "formatter": "number",
			                        "align": "center",
			                        "sortable":false,
			                        "id": "9",
			                         "label":"POS"
			                    },
			                            {
			                        "name": "netPay",
			                        "width": "120",
			                        "index": "netPay",
			                        "formatter": "number",
			                        "align": "center",
			                        "sortable":false,
			                        "id": "9",
			                         "label":"网付"
			                    },
			                    {
			                        "name": "couponAmount",
			                        "width": "120",
			                        "index": "couponAmount",
			                        "formatter": "number",
			                        "sortable":false,
			                        "align": "center",
			                        "id": "9",
			                         "label":"券金额"
			                    },
	               
			                            {
			                        "name": "installmentBalance",
			                        "width": "120",
			                        "index": "installmentBalance",
			                       " formatter": "number",
			                        "align": "center",
			                        "sortable":false,
			                        "id": "9",
			                         "label":"分期余额"
			                    },
			                    {
			                        "name": "debt",
			                        "width": "120",
			                        "index": "debt",
			                        "formatter": "string",
			                        "id": "10",
			                        "align": "center",
			                        "label":"欠款 "
			                    },
			                    {
			                        "name": "introduceAmount",
			                        "width": "120",
			                        "index": "introduceAmount",
			                        "id": "11",
			                        "align": "center",
			                        "label":"引入定金"
			                    },
			                    {
			                        "name": "billsStatus",
			                        "width": "120",
			                        "index": "billsStatus",
			                        "id": "11",
			                        "align": "center",
			                        "label":"单据状态"
			                    },
			                    {
			                        "name": "remark",
			                        "width": "150",
			                        "index": "remark",
			                        "id": "11",
			                        "align": "center",
			                        "label":"备注"
			                    },
			                    {
			                        "name": "billsMaker",
			                        "width": "120",
			                        "index": "billsMaker",
			                        "id": "11",
			                        "align": "center",
			                        "label":"制单人"
			                    },
			                    {
			                        "name": "billsDate",
			                        "width": "120",
			                        "index": "billsDate",
			                        "id": "11",
			                        "sortable":false,
			                        "align": "center",
			                        "label":"制单时间"
			                    },
			                    {
			                        "name": "editMan",
			                        "width": "120",
			                        "index": "editMan",
			                        "id": "11",
			                        "align": "center",
			                        "label":"修改人"
			                    },
			                    {
			                        "name": "editDate",
			                        "width": "120",
			                        "index": "editDate",
			                        "id": "11",
			                        "sortable":false,
			                        "align": "center",
			                        "label":"修改时间"
			                    },
			                    {
			                        "name": "guozhangman",
			                        "width": "120",
			                        "index": "guozhangman",
			                        "id": "11",
			                        "align": "center",
			                        "label":"记账人"
			                    },
			                    {
			                        "name": "guozhangDate",
			                        "width": "120",
			                        "index": "guozhangDate",
			                        "id": "11",
			                        "sortable":false,
			                        "align": "center",
			                        "label":"记账时间"
			                    },
			                    {
			                        "name": "hongchongMaker",
			                        "width": "120",
			                        "index": "hongchongMaker",
			                        "id": "11",
			                        "align": "center",
			                        "label":"红冲人"
			                    },
			                    {
			                        "name": "hongchongDate",
			                        "width": "120",
			                        "index": "hongchongDate",
			                        "id": "11",
			                        "sortable":false,
			                        "align": "center",
			                        "label":"红冲时间"
			                    },
			                    
			               
			                ];
			
			loadtable();
		//加载表格
		
			/*$.getJSON(options.LoadTableUrl,function(t_datat){
				mydata=t_datat;
				//$(options.TableName).setGridParam({data: mydata}).trigger('reloadGrid');  
			});*/
			function loadtable(){
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
			            multiselect:true,
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
		

