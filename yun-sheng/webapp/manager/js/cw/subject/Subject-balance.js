
function loadmodal()
			{
		var options = {
		LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
		//LoadTableUrl: "../../json/T_rolesdata.json",
		LoadTableUrl: "../../cw/qc/getSubject", //表格数据加载接口地址
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
			                        "name": "subjectCode",
			                        "width": "200",
			                        "index": "subjectCode",
			                        "align": "center",
			                        "id": "2",
			                        "sortable":false,
			                        "label":"科目编码 "
			                    },
			                    {
			                        "name": "subjectName",
			                        "width": "150",
			                        "index": "subjectName",
			                        "id": "3",
			                        "sortable":false,
			                        "align": "center",
			                        "label":"科目名称"
			                    },
			                    {
			                        "name": "creditDirection",
			                        "width": "100",
			                        "index": "creditDirection",
			                        "align": "center",
			                        "id": "4",
			                        "formatter":myFmatter,
			                        "sortable":false,
			                        "label":"方向"
			                    },
			                    {
			                        "name": "unit",
			                        "width": "150",
			                        "index": "unit",
			                        "align": "center",
			                        "sortable":false,
			                        "id": "5",
			                        "label":"计量单位 "
			                    },
			                    {
			                        "name": "accumulateBorrowNum",
			                        "width": "150",
			                        "index": "accumulateBorrowNum",
			                        "formatter": "integer",
			                        "align": "center",
			                        "sortable":false,
			                        "editable":true,
			                        "id": "8",
			                         "label":"累计借方数量 "
			                    },
			                    {
			                        "name": "accumulateBorrowAmuont",
			                        "width": "120",
			                        "index": "accumulateBorrowAmuont",
			                        "formatter": "number",
			                        "align": "center",
			                        "sortable":false,
			                        "editable":true,
			                        "id": "9",
			                         "label":"累计借方金额"
			                    },
			                     {
			                        "name": "accumulateLoanNum",
			                        "width": "120",
			                        "index": "accumulateLoanNum",
			                        "formatter": "integer",
			                        "align": "center",
			                        "sortable":false,
			                        "editable":true,
			                        "id": "9",
			                         "label":"累计贷方数量"
			                    },
			                            {
			                        "name": "accumulateLoanAmuont",
			                        "width": "120",
			                        "index": "accumulateLoanAmuont",
			                        "formatter": "number",
			                        "align": "center",
			                        "sortable":false,
			                        "editable":true,
			                        "id": "9",
			                         "label":"累计贷方金额"
			                    },
			                            {
			                        "name": "periodBeginNum",
			                        "width": "120",
			                        "index": "periodBeginNum",
			                        "formatter": "integer",
			                        "align": "center",
			                        "editable":true,
			                        "sortable":false,
			                        "id": "9",
			                         "label":"期初余额数量"
			                    },
			                            {
			                        "name": "periodBeginAmount",
			                        "width": "120",
			                        "index": "periodBeginAmount",
			                        "formatter": "number",
			                        "align": "center",
			                        "editable":true,
			                        "sortable":false,
			                        "id": "9",
			                         "label":"期初余额金额"
			                    },
			                            {
			                        "name": "yearBeginNum",
			                        "width": "120",
			                        "index": "yearBeginNum",
			                       " formatter": "integer",
			                        "align": "center",
			                        "sortable":false,
			                        "id": "9",
			                         "label":"年初余额数量"
			                    },
			                    {
			                        "name": "yearBeginBalance",
			                        "width": "200",
			                        "index": "yearBeginBalance",
			                        "formatter": "number",
			                        "id": "10",
			                        "sortable":false,
			                        "align": "center",
			                        "label":"年初余额金额 "
			                    },
			                    {
			                        "name": "ifLeaf",
			                        "width": "120",
			                        "index": "ifLeaf",
			                        "id": "11",
			                        "align": "center",
			                        "sortable":false,
			                        "hidden":true, 
			                      
			                        "label":"是否子节点"
			                    },
			                    {
			                        "name": "ifNumAccounting",
			                        "width": "120",
			                        "index": "ifNumAccounting",
			                        "id": "11",
			                        "align": "center",
			                        "sortable":false,
			                        "hidden":true, 
			                      
			                        "label":"是否数量核算"
			                    },
			                    {
			                        "name": "parentId",
			                        "width": "120",
			                        "index": "parentId",
			                        "id": "11",
			                        "align": "center",
			                        "sortable":false,
			                        "hidden":true, 
			                      
			                        "label":"父节点"
			                    }
			               
			                ];
			
			loadtable();
		//加载表格
		
			/*$.getJSON(options.LoadTableUrl,function(t_datat){
				mydata=t_datat;
				//$(options.TableName).setGridParam({data: mydata}).trigger('reloadGrid');  
			});*/
			function loadtable(){
			
			$.post(options.LoadTableUrl,{},function(r){
				
				if(r.data.rows!=null){
					 mydata=r.data;
					 $(".grid-date").text(r.data.openDate);
					 if(!!r.result==true){
						 lock=true;
					 }
					 if(r.data.month=="1")
					 {
						 hid=true;
					 }
					 if(r.data.isPsot=="1"&&r.desc!=null)
					 {
						$(".grid-status").text(r.desc);
					 }
						 
					//console.log(mydata);
					$(options.TableName).jqGrid({
						//url:options.LoadTableUrl,
						//mtype:"GET",
						datatype: "jsonstring",
				        datastr: mydata,
						//datatype: "local",
						//data:mydata,
						//datatype:"local",						
						editurl: 'clientArray',
								
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
						//cellsubmit: 'clientArray',//单元格保存内容的位置
						          
			            colModel:JqGridColModel,
			            //loadonce: false,
			            sortable:false,			            
			            rownumbers:true,
			            loadonce: true,
			            rowNum: 20,
			            //rowList: [10, 15, 20, 25, 40],
			            pager:options.pager,
			           // viewrecords: true,		           
			            //multiselect:true,
			           	//cellEdit:true,
			            width: "100%" ,
			            height: $(window).height()*0.62,
			            scroll:true,
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
						ondblClickRow:assistAccountingModel,
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
										calculateParent(lastsel);
									}
									});
								afterSaveCalculateAmounts(lastsel);
								footerData();
							}
							lastsel=id;
						var rec = $(options.TableName).jqGrid('getRowData', id);
						if(select_index > 1&&rec.ifLeaf!=0&&lock==false){
							$(options.TableName).jqGrid('editRow',id,
								{	
								keys:true,
								oneditfunc:function(id){
								if(rec.unit==null||rec.unit==""){
									$("#"+id+"_accumulateBorrowNum").attr('disabled', true);
									$("#"+id+"_accumulateLoanNum").attr('disabled', true);
									$("#"+id+"_periodBeginNum").attr('disabled', true);
								}
							//数量输入
			            $('#' + id + '_accumulateBorrowNum').keyup(function () {
			              $(this).val($(this).val().replace(/[^0-9]/g,''));
			              calculateAmounts(id);
			              
			            }).focus(function(){ 
			            	setTimeout(function () {$('#' + id + '_accumulateBorrowNum').select();},1);
							});
							 $('#' + id + '_accumulateLoanNum').keyup(function () {
			              $(this).val($(this).val().replace(/[^0-9]/g,''));
			              calculateAmounts(id);
			              
			            }).focus(function(){ 
			            	setTimeout(function () {$('#' + id + '_accumulateLoanNum').select();},1);
							});
							 $('#' + id + '_periodBeginNum').keyup(function () {
			              $(this).val($(this).val().replace(/[^0-9]/g,''));
			              calculateAmounts(id);
			              
			            }).focus(function(){ 
			            	setTimeout(function () {$('#' + id + '_periodBeginNum').select();},1);
							});
							 //金额输入
						$('#' + id + '_accumulateBorrowAmuont').keyup(function () {
							$(this).val($(this).val().replace(/[^0-9.]/g,''));
							calculateAmounts(id);
							
							}).focus(function(){ 
							setTimeout(function () {$('#' + id + '_accumulateBorrowAmuont').select();},1);
						});
						$('#' + id + '_accumulateLoanAmuont').keyup(function () {
							$(this).val($(this).val().replace(/[^0-9.]/g,''));
							calculateAmounts(id);
							
							}).focus(function(){ 
							setTimeout(function () {$('#' + id + '_accumulateLoanAmuont').select();},1);
						});
						$('#' + id + '_periodBeginAmount').keyup(function () {
							$(this).val($(this).val().replace(/[^0-9.]/g,''));
							calculateAmounts(id);
							
							}).focus(function(){ 
							setTimeout(function () {$('#' + id + '_periodBeginAmount').select();},1);
						});						
						}	
						});
							footerData();
							
						}
						},
						
						
						
						beforeSelectRow:function(rowid,e){

						},
						afterInsertRow: function (rowid, aData) { //新增一行之后

						},
						gridComplete: function() {
							if(hid==true){
								$(options.TableName).jqGrid('hideCol',[ "accumulateBorrowNum",
								 "accumulateBorrowAmuont" ,"accumulateLoanNum","accumulateLoanAmuont"]);
							}
							var ids=$(options.TableName).jqGrid("getDataIDs");
							$.each(ids,function(i,item){
								afterSaveCalculateAmounts(item);
							});	
							var ids=$(options.TableName).jqGrid("getDataIDs");
							if(ids.length>0){
							$.each(ids,function(i,item){
								var row_data= $(options.TableName).jqGrid('getRowData',item);
								if(row_data.creditDirection==1){
									
								}
							});
							}
						},
						loadComplete:function(data){
							//console.log(data);
							footerData();
							$.each(data.rows,function(i,item){
								if(item.ifLeaf==0){
								//$(options.TableName).jqGrid("setSelection",item.id,false);
								 $('#'+item.id).addClass("parent");
								}															
							})
							
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
				}else{
					$.zxsaas_plus.showalert("查询数据失败！","没有查询到数据");
					return false;
				}
				
			})
			
		
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
			//保存前计算
			function calculateAmounts(id){
				var accumulateBorrowNum = parseInt($('#' + id + '_accumulateBorrowNum').val().trim());
				var accumulateBorrowAmuont =parseFloat($('#' + id + '_accumulateBorrowAmuont').val().trim());
				var accumulateLoanNum = parseInt($('#' + id + '_accumulateLoanNum').val().trim());
				var accumulateLoanAmuont = parseFloat($('#' + id + '_accumulateLoanAmuont').val().trim());
				var periodBeginNum =parseInt($('#' + id + '_periodBeginNum').val().trim());
				var periodBeginAmount =parseFloat($('#' + id + '_periodBeginAmount').val().trim());
				var creditDirection = $(options.TableName).getRowData(id).creditDirection;
				var yearBeginNum=0;
				var yearBeginBalance =0;
				if(creditDirection=="借方"){
					yearBeginNum=periodBeginNum-accumulateBorrowNum+accumulateLoanNum;
					yearBeginBalance=periodBeginAmount-accumulateBorrowAmuont+accumulateLoanAmuont;
				}else{
					yearBeginNum=periodBeginNum+accumulateBorrowNum-accumulateLoanNum;
					yearBeginBalance=periodBeginAmount+accumulateBorrowAmuont-accumulateLoanAmuont;
				}
				$(options.TableName).jqGrid('setCell',id,"yearBeginNum",yearBeginNum);
				$(options.TableName).jqGrid('setCell',id,"yearBeginBalance",yearBeginBalance);
			}
			//保存后计算
			function afterSaveCalculateAmounts(id){
				var accumulateBorrowNum = parseInt($(options.TableName).jqGrid('getCell',id,"accumulateBorrowNum"));
				var accumulateBorrowAmuont = parseFloat($(options.TableName).jqGrid('getCell',id,"accumulateBorrowAmuont"));
				var accumulateLoanNum = parseInt($(options.TableName).jqGrid('getCell',id,"accumulateLoanNum"));
				var accumulateLoanAmuont = parseFloat($(options.TableName).jqGrid('getCell',id,"accumulateLoanAmuont"));
				var periodBeginNum = parseInt($(options.TableName).jqGrid('getCell',id,"periodBeginNum"));
				var periodBeginAmount = parseFloat($(options.TableName).jqGrid('getCell',id,"periodBeginAmount"));
				var creditDirection = $(options.TableName).getRowData(id).creditDirection;
				var yearBeginNum = '';
				var yearBeginBalance = '';
				if(creditDirection=="借方"){
					yearBeginNum=periodBeginNum-accumulateBorrowNum+accumulateLoanNum;
					yearBeginBalance=periodBeginAmount-accumulateBorrowAmuont+accumulateLoanAmuont;
				}else{
					yearBeginNum=periodBeginNum+accumulateBorrowNum-accumulateLoanNum;
					yearBeginBalance=periodBeginAmount+accumulateBorrowAmuont-accumulateLoanAmuont;
				}
				$(options.TableName).jqGrid('setCell',id,"yearBeginNum",yearBeginNum);
				$(options.TableName).jqGrid('setCell',id,"yearBeginBalance",yearBeginBalance);
		    }
			
			
			//绑定父子节点
		function calculateParent(id){
			var	accumulateBorrowNum=parseInt($(options.TableName).jqGrid('getCell',id,"accumulateBorrowNum"));
			var	accumulateBorrowAmuont=parseFloat($(options.TableName).jqGrid('getCell',id,"accumulateBorrowAmuont"));
			var	accumulateLoanNum=parseInt($(options.TableName).jqGrid('getCell',id,"accumulateLoanNum"));
			var	accumulateLoanAmuont=parseFloat($(options.TableName).jqGrid('getCell',id,"accumulateLoanAmuont"));
			var	periodBeginNum=parseInt($(options.TableName).jqGrid('getCell',id,"periodBeginNum"));
			var	periodBeginAmount=parseFloat($(options.TableName).jqGrid('getCell',id,"periodBeginAmount"));
			var	yearBeginNum=parseInt($(options.TableName).jqGrid('getCell',id,"yearBeginNum"));
			var	yearBeginBalance=parseFloat($(options.TableName).jqGrid('getCell',id,"yearBeginBalance"));
			var parentId=parseInt($(options.TableName).jqGrid('getCell',id,"parentId"));
			var ids=$(options.TableName).jqGrid("getDataIDs");
			if(ids.length>0){
			$.each(ids,function(i,item){
				var pa=$(options.TableName).jqGrid('getCell',item,"parentId");
				if(pa==parentId&&item!=id){
					accumulateBorrowNum+=parseInt($(options.TableName).jqGrid('getCell',item,"accumulateBorrowNum"));
					accumulateBorrowAmuont+=parseFloat($(options.TableName).jqGrid('getCell',item,"accumulateBorrowAmuont"));
					accumulateLoanNum+=parseInt($(options.TableName).jqGrid('getCell',item,"accumulateLoanNum"));
					accumulateLoanAmuont+=parseFloat($(options.TableName).jqGrid('getCell',item,"accumulateLoanAmuont"));
					periodBeginNum+=parseInt($(options.TableName).jqGrid('getCell',item,"periodBeginNum"));
					periodBeginAmount+=parseFloat($(options.TableName).jqGrid('getCell',item,"periodBeginAmount"));
					yearBeginNum+=parseInt($(options.TableName).jqGrid('getCell',item,"yearBeginNum"));
					yearBeginBalance+=parseFloat($(options.TableName).jqGrid('getCell',item,"yearBeginBalance"));
				}
				
			})
			}
			$(options.TableName).jqGrid('setCell',parentId,"accumulateBorrowNum",accumulateBorrowNum);
			$(options.TableName).jqGrid('setCell',parentId,"accumulateBorrowAmuont",accumulateBorrowAmuont);
			$(options.TableName).jqGrid('setCell',parentId,"accumulateLoanNum",accumulateLoanNum);
			$(options.TableName).jqGrid('setCell',parentId,"accumulateLoanAmuont",accumulateLoanAmuont);
			$(options.TableName).jqGrid('setCell',parentId,"periodBeginNum",periodBeginNum);
			$(options.TableName).jqGrid('setCell',parentId,"periodBeginAmount",periodBeginAmount);
			$(options.TableName).jqGrid('setCell',parentId,"yearBeginNum",yearBeginNum);
			$(options.TableName).jqGrid('setCell',parentId,"yearBeginBalance",yearBeginBalance);
		}
		//提取数据
		function obtainData(){
			/*$(options.TableName+">tbody>tr").each(function (){
				var InfoId="";
				InfoId=this.cells[1].innerText;
				if(InfoId!=""&&this.className!="jqgfirstrow"){
					
				myobj.push($(options.TableName).getRowData(InfoId));
				
				}
				
			});*/
			var ids=$(options.TableName).jqGrid("getDataIDs");
			if(ids.length>0){
				$.each(ids,function(i,item){
					var pa=$(options.TableName).jqGrid('getRowData',item);
					var dir=pa.creditDirection;
					if(dir=="借方"){
						pa.creditDirection=1;
					}else if(dir=="贷方"){
						pa.creditDirection=0;
					}					
					myobj.push(pa);
					
				})
				}
			saveSubmit();
		}	
		//提交数据
		function saveSubmit(){
			console.log(JSON.stringify(myobj));
			//console.log(JSON.stringify(myobj));
/*			$.post(" ../../cw/qc/saveSubjectBalance",JSON.stringify(myobj),function(r_data){
				if(r_data.result=="1") //保存成功
		        {
		        	$.zxsaas_plus.showalert("表格数据保存", "保存成功");
		        }
		        else{
		        	$.zxsaas_plus.showalert("表格数据保存", "保存失败");
		        }
			})*/
			 $.ajax({
					url: " ../../cw/qc/saveSubjectBalance",
					//cache:false,
					dataType: "json",
					type:"POST",
					contentType: "application/json",
					//processData:false,
					data:JSON.stringify(myobj),
  			        success: function( r_data ) {
			        if(r_data.result=="1") //保存成功
			        {
			        	$.zxsaas_plus.showalert("表格数据保存成功",r_data.desc );
			        }
			        else{
			        	$.zxsaas_plus.showalert("表格数据保存失败", r_data.desc);
			        }
			       
			     }
		    });
		}
		
		//查询
		$(document).on("click",".btn-group button[data-eventname='inquire']",function(event){			
			$.jgrid.GridDestroy(options.TableName);
			loadtable();
			
		});
		//保存
		$(document).on("click",".btn-group button[data-eventname='save']",function(event){	
			$(options.TableName).jqGrid('saveRow', lastsel);
			$.ajaxSetup({
			  async: false
			});
			footerData();
			$.ajaxSetup({
			  async: true
			});			
			lastsel ='';
			obtainData();			
		});
		//刷新
		$(document).on("click",".btnbox button[data-eventname='refresh']",function(event){
			$.zxsaas_plus.showconfirm("刷新","您确定要刷新吗？未保存信息可能会丢失！",function(){		
					//取消异步
					$.ajaxSetup({
					  async: false
					});				
					//打开异步
					$.ajaxSetup({
					  async: true
					});

			},function(){
				return false;
			});
			
		});
		$(document).on("click",".btnbox button[data-eventname='printbtn']",function(event){
			$.zxsaas_plus.showalert("表格打印操作", "表格打印操作咱未完成，敬请期待");
			
		});
		$(document).on("click",".btnbox button[data-eventname='exportTablename']",function(event){
			$.zxsaas_plus.showalert("表格导出操作", "表格导出操作咱未完成，敬请期待");
			
		});
}
	


//试算平衡
function trialBalance(){
	$.ajax({
		url: " ../../cw/qc/subjectBeginTrialBalance",
		type : "post",
		dataType : "json",
		data : {},
		success : function(result) {
			$("#trialBalanceData").html("");
            var rows=result.data.rows;
            var htmlStr="";
            var leftTotalAccumulateBorrow=0;
            var letfTotalAccumulateLoan=0;
            var rigthTotalAccumulateBorrow=0;
            var rightTotalAccumulateLoan=0;
            for(var i=0;i<rows.length;i++){
            	if(i==0 || i==2 || i==4){
            		var firstAccuBorrow=parseFloat(rows[i].accumulateBorrowAmuont).toFixed(2);
            		var firstAccuLoan=parseFloat(rows[i].accumulateLoanAmuont).toFixed(2);
            		var secondAccuBorrow=parseFloat(rows[i+1].accumulateBorrowAmuont).toFixed(2);
            		var secondAccuLoan=parseFloat(rows[i+1].accumulateLoanAmuont).toFixed(2);
            		htmlStr +="<tr><td>"+rows[i].subjectClssifyName+"</td><td>"+firstAccuBorrow+"</td><td>"+firstAccuLoan+"</td><td>"+rows[i].creditDirectionStr+"</td><td>"+rows[i].periodTrialAmount.toFixed(2)+"</td>" +
        			"<td>"+rows[i+1].subjectClssifyName+"</td><td>"+secondAccuBorrow+"</td><td>"+secondAccuLoan+"</td><td>"+rows[i+1].creditDirectionStr+"</td><td>"+rows[i+1].periodTrialAmount.toFixed(2)+"</td></tr>";
            		leftTotalAccumulateBorrow+=parseFloat(firstAccuBorrow);
            		letfTotalAccumulateLoan+=parseFloat(firstAccuLoan);
            		rigthTotalAccumulateBorrow+=parseFloat(secondAccuBorrow);
            		rightTotalAccumulateLoan+=parseFloat(secondAccuLoan);
               }
		    }
            var totalBorrowBalance=result.data.totalBorrowBalance.toFixed(2);
            var totalLoanBalance=result.data.totalLoanBalance.toFixed(2);
            htmlStr +="<tr><td>合计</td><td>"+leftTotalAccumulateBorrow.toFixed(2)+"</td><td>"+letfTotalAccumulateLoan.toFixed(2)+"</td><td>借</td><td>"+totalBorrowBalance+"</td>" +
            		"<td>合计</td><td>"+rigthTotalAccumulateBorrow.toFixed(2)+"</td><td>"+rightTotalAccumulateLoan.toFixed(2)+"</td><td>借</td><td>"+totalLoanBalance+"</td></tr>";
            var balanceBorrowMinusLoan=result.data.balanceBorrowMinusLoan.toFixed(2);
            var accumulateBorrowMinusLoan=result.data.accumulateBorrowMinusLoan.toFixed(2);
            if(balanceBorrowMinusLoan=accumulateBorrowMinusLoan  && result.data.balanceBorrowMinusLoan==0){
            	htmlStr+="<tr><td colspan='10'  align='center'>试算结果平衡!</td></tr><tr><td colspan='3' >借贷余额差额</td><td colspan='7'></td></tr>" +
            			"<tr><td colspan='3'>借贷发生额差额</td><td colspan='7'></td></tr>";
            	
            }else{
            	htmlStr+="<tr><td colspan='10'  align='center' style='color:red'>试算结果不平衡</td></tr>";
            	 htmlStr+="<tr><td colspan='3' >借贷余额差额</td><td colspan='7'>"+balanceBorrowMinusLoan+"</td></tr>";
                 htmlStr+="<tr><td colspan='3'>借贷发生额差额</td><td colspan='7'>"+accumulateBorrowMinusLoan+"</td></tr>";
            }
            $("#trialBalanceData").append(htmlStr);
			$("#trialBalanceModal").modal("toggle");
		}
	});
}

//双击进入辅助核算
var refresh=true;
var assistAccountingModel=function(id){
	var subjectCode= $("#jqGrid_SubjectBalance").getCell(id,"subjectCode");
	var creditDirection= $("#jqGrid_SubjectBalance").getCell(id,"creditDirection");
	$("#subjectCode").html(subjectCode);
	$("#creditDirection").html(creditDirection);
	
	$("#assistTable").jqGrid('setGridParam', { 
		url: '/manager/cw/qc/findAssistSubjectById',
		postData:{"subjectId":id}}).trigger('reloadGrid');	
	
	    if(refresh){
	    	$( "#assistTable" ).jqGrid( 'setGroupHeaders' , {
				useColSpanStyle :  true ,  // 没有表头的列是否与表头列位置的空单元格合并
				groupHeaders : [ {
				startColumnName :  'accumulateBorrowAmuont' ,
				numberOfColumns :1, 
				titleText :  '累计借方'
				},
				{
					startColumnName :  'accumulateLoanAmuont' ,
					numberOfColumns :1, 
					titleText :  '累计贷方'
				},
				{
					startColumnName :  'periodBalance' ,
					numberOfColumns :1, 
					titleText :  '期初余额'
				},
				{
					startColumnName :  'yearBeginningBalance' ,
					numberOfColumns :1,
					titleText :  '年初余额'
				}
				]
			});
	    }
		//jQuery("#assistTable").jqGrid('setLabel',0, '序号');//添加一个表头信息
		refresh=false;
}

//底部合计
function footerData(){
	var sum_ccumulateBorrowAmuont = $("#assistTable").getCol('accumulateBorrowAmuont',false,'sum');
	var sum_accumulateLoanAmuont = $("#assistTable").getCol('accumulateLoanAmuont',false,'sum');
	var sum_periodBalance = $("#assistTable").getCol('periodBalance',false,'sum');
	var sum_yearBeginningBalance = $("#assistTable").getCol('yearBeginningBalance',false,'sum');
	$("#assistTable").jqGrid('footerData','set',{
		"order":"合计",
        "accumulateBorrowAmuont": sum_ccumulateBorrowAmuont,
        "accumulateLoanAmuont": sum_accumulateLoanAmuont,
        "periodBalance": sum_periodBalance,
        "yearBeginningBalance": sum_yearBeginningBalance
        }
	);
	var  gridData= $("#assistTable").jqGrid("getRowData");
	//设置序号值
	var rows = $("#assistTable").getGridParam("reccount");
	if(rows>0){
		for(var i=1;i<rows+1;i++){
			 jQuery("#assistTable").jqGrid('setCell',i, 'order', i);
		}
	}
}


$(function(){
	$("#assistTable").jqGrid({
		 colNames:['科目id','方向','序号','部门','职员','往来单位','金额','金额','金额','金额'],
	     colModel:[
         {name:'subjectId',index:'subjectId', width:1,align:"center",sortable: false,hidden:true},
         {name:'direction',	index:'direction', width:1,align:"left",sortable: false,hidden:true},
         
	     {name:'order',index:'order', width:50,sorttype:"Integer",align:"center",sortable: false,key:true},
	     {name:'departmentId',	index:'departmentId', width:110,sorttype:"Long",align:"left",sortable: false},
	     {name:'employeeId',index:'employeeId',width:110,sorttype:"Long",align:"left", sortable: false},
	     {name:'partnerId',index:'partnerId',width:110,sorttype:"Long",align:"left",sortable: false},
	     {name:'accumulateBorrowAmuont',index:'accumulateBorrowAmuont', width:150,	sorttype:"Double",	align:"right",sortable: false, formatter: "number"},
	     {name:'accumulateLoanAmuont',	index:'accumulateLoanAmuont',width:150,sorttype:"Double",align:"right",sortable: false, formatter: "number"},    
	     {name:'periodBalance',index:'periodBalance', width:150,sorttype:"Double",align:"right",sortable: false, formatter: "number"}, 
	     {name:'yearBeginningBalance',	index:'yearBeginningBalance', width:150,sorttype:"Double",align:"right",sortable: false, formatter: "number"}
	   ],
	    jsonReader  : {	
		root: "data.rows",
		repeatitems: false
		},
		datatype: "json",
		async: false,
		footerrow:true,  //设置表格显示表脚
		userDataOnFooter:true,//设置userData 显示在footer里
		autowidth:true,
		viewrecords:true,
		styleUI: 'Bootstrap',//设置jqgrid的全局样式为bootstrap样式  
		//rownumbers: true,//添加左侧行号
		loadComplete:function(data){
			var ifExistAssist=data.data.ifExistAssist;
			var rows=data.data.rows;
			if(ifExistAssist && rows!=null && rows.length>0){
				if(rows[0].departmentId==null){
					jQuery("#assistTable").setGridParam().hideCol("departmentId").trigger("reloadGrid");
				}
				if(rows[0].employeeId==null){
					jQuery("#assistTable").setGridParam().hideCol("employeeId").trigger("reloadGrid");
				}
				if(rows[0].partnerId==null){
					jQuery("#assistTable").setGridParam().hideCol("partnerId").trigger("reloadGrid");
				}
				$("#assistAccountingModal").modal("toggle");
			}
		},
		gridComplete:footerData
		});
});


//保存辅助核算期初
function saveAssistBalance(){
	var ids=$("#assistTable").jqGrid("getDataIDs");
	var params=[];
	if(ids.length>0){
		$.each(ids,function(i,item){
			var obj=$("#assistTable").jqGrid('getRowData',item);
			delete obj.order;
			params.push(obj);
		})
	}
	 $.ajax({
			url: " ../../cw/qc/saveAssistBalance",
			dataType: "json",
			type:"POST",
			contentType: "application/json",
			data:JSON.stringify(params),
	        success: function( r_data ) {
		    $.zxsaas_plus.showalert("表格数据保存",r_data.desc);
	  }
 });
}
