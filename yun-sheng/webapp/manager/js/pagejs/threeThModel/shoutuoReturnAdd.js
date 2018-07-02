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
		TableName: "#jqGrid_retailDepositAdd", //显示表格名称。遵照css选择器书写
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
		var billsOper_goods = function (val, opt, row) {
			var html_con = '<div class="operating" data-id="' + opt.rowId + '"><i style="cursor:pointer;float:center;display:block;margin-left:10px;padding-top:0px;font-size:14px;" id="remove_row" class="ui-icon ui-icon-trash iconfont" title="删除行" >&#xe61c;</i></div>';
			return html_con;
		}
		window.onresize = function(){
			var innerHeight  = window.innerHeight;//页面显示高度
			var inquire_option = $("#inquire_option").outerHeight(true);//表单inquire_option高度
			var inputboxBottom = $(".inputboxBottom").outerHeight(true);//表单inputboxBottom高度
			jqGridHeight = innerHeight-inquire_option-inputboxBottom-235;

			if(jqGridHeight < 50){
				jqGridHeight = 50;
			}
			$(options.TableName).setGridHeight(jqGridHeight);

		}
		$(window).resize();
		
			$.jgrid.defaults.width = 1280;
			$.jgrid.defaults.responsive = true;
			$.jgrid.defaults.styleUI = 'Bootstrap';	
			var lastsel='';//最后一次选中的行
			var rightClickColid="";//右键列id
			var rightClickColIndex=0;//右键index
			var jqGridHeight;//表单header高度
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
			                        "label":"行号"
			                        
			                    },
			                    { 
			                    	name: 'actions', 
			                    	width: 50,
			                    	index: 'actions' ,
			                    	"formatter": billsOper_goods,
			                    	sortable:false,
			                    	align:"center",
			                    	fixed:!0,
			                    	id:"2",
			                    	label: "操作",
			                    },
			                    {
			                        "name": "name",
			                        "width": "300",
			                        "index": "name",
			                        "align": "center",
			                        "editable":true,
			                        "id": "2",
			                        "sortable":false,
			                        "label":"商品名称 "
			                    },
			                     {
			                        "name": "sectionname",
			                        "width": "300",
			                        "index": "sectionname",
			                        "align": "center",
			                        "editable":true,
			                        "id": "2",
			                        "sortable":false,
			                        "label":"店仓名称 "
			                    },
			                    {
			                        "name": "quantity",
			                        "width": "200",
			                        "index": "quantity",
			                        "formatter": "integer",
			                        "align": "center",
			                        "editable":true,
			                        "sortable":false,
			                        "id": "9",
			                         "label":"数量"
			                    },
			                    {
			                        "name": "preDeposit",
			                        "width": "200",
			                        "index": "preDeposit",
			                        "formatter": "number",
			                        "align": "center",
			                        "editable":true,
			                        "sortable":false,
			                        "id": "9",
			                         "label":"单价"
			                    },
			                    {
			                        "name": "cash",
			                        "width": "200",
			                        "index": "cash",
			                        "formatter": "integer",
			                        "align": "center",
			                        "editable":true,
			                        "sortable":false,
			                        "id": "9",
			                         "label":"金额"
			                    },
			                    {
			                        "name": "remark",
			                        "width": "250",
			                        "index": "remark",
			                        "formatter": "string",
			                        "align": "center",
			                        "editable":true,
			                        "sortable":false,
			                        "id": "9",
			                         "label":"备注"
			                    }
			                    
			                   
			                ];
			
			loadtable();
		//加载表格
			function loadtable(){
			/*	$.post(options.LoadTableUrl,{},function(r){
					
					if(r.data.rows!=null){
						 mydata=r.data;
							 */
					//console.log(mydata);
					$(options.TableName).jqGrid({
						datatype: "local",
						data:mydata,					
						editurl: 'clientArray',		
						jsonReader  : {	
								root: "rows",
								repeatitems: false
									},
						cellsubmit: 'clientArray',//单元格保存内容的位置						          
			            colModel:JqGridColModel,
			            sortable:false,			            
			            rownumbers:true,
			            rowNum: 9999,
			            viewrecords: false,		           
			           	cellEdit:true,
			            width: "100%" ,
			            height: jqGridHeight,
						autowidth:true,
						rownumWidth: 50, // the width of the row numbers columns
						shrinkToFit:true,  //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。		
						ondblClickRow:function(id){
						//双击进入编辑
			   				var delid = id;
			   				
						},
						onCellSelect:function(id,index,e){
							var ids = $(options.TableName).jqGrid('getDataIDs');
							var maxid = Math.max.apply(Math,ids);
							if(id==maxid){
								 $(options.TableName).jqGrid('addRowData', maxid+1, {}, 'last');
					      		resetRow(maxid+1);
							}
							var colName=$(options.TableName).jqGrid('getGridParam','colModel')[index].name 
					      	select_name=colName
					      	select_index=index;
							//后续可以通过点击的列名称来弹框等
							lastsel=id;
						},
						onSelectRow:function(id){
							if(id!=lastsel&&lastsel!=''){
							}
							lastsel=id;
						var rec = $(options.TableName).jqGrid('getRowData', id);	
						$(options.TableName).jqGrid('editRow',id,
							{	
								keys:true,
								oneditfunc:function(id){
									
								}
							});
						},
						
						beforeSelectRow:function(rowid,e){

						},
						afterInsertRow: function (rowid, aData) { //新增一行之后

						},
						gridComplete: function() {
							$(window).resize();
							var ids=$(options.TableName).jqGrid("getDataIDs");

						},
						loadComplete:function(data){
							//console.log(data);
					      	var ids = $(options.TableName).jqGrid('getDataIDs');
							var maxid = Math.max.apply(Math,ids);
							if(maxid < 0){
								maxid = 0;
							}
					      	var count = (jqGridHeight-80)/35 - maxid;
					      	for (var i = 0; i < count; i++) {
					      		 $(options.TableName).jqGrid('addRowData', maxid+1, {}, 'last');
					      		resetRow(maxid+1)
					      		 maxid = maxid+1
					      	}
							
						},
						loadError:function(xhr,status,error){
							//console.log(status)
						}
						})
				/*}else{
					$.zxsaas_plus.showalert("查询数据失败！","没有查询到数据");
					return false;
				}*/
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

		
			//操作中删除一列
			$(document).on('click', '.ui-icon-trash',function(e){
				var thisTitle = $(this).attr("title");
				var rowId = $(this).parent().data('id');
				if(thisTitle == "删除行"){
					if($('#jqGrid tbody tr').length === 3) {
						$.zxsaas_plus.showalert("错误","至少保留一条数据!")
						//alert('至少保留一条分录！');
						return false;
					}
					$.zxsaas_plus.showconfirm("","是否确定删除本行?",function(){
						$(options.TableName).jqGrid('delRowData', rowId);
					},function(){
						
					});

				}
			});
			function resetRow(rowId){
				$(options.TableName).jqGrid('setCell',rowId,"remark","无");
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
		

