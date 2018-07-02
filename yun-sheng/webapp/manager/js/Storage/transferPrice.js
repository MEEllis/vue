
$("#slideThree").click(function(){
		    $(".slideThree").toggleClass("color7D5F50");
		    //  1   正式单据
		    //  0  草稿单据
		    $('#slideThree').prop('checked') ? $('#slideThree').val('1') : $('#slideThree').val('0')
		  });
function loadmodal(){
		var options = {
		LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
		LoadTableUrl: "../../json/Storage/transferPrice.json",
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
			var colNames = ['操作','ID','仓库名称','商品名称','现库存','数量','商品备注'];
			var JqGridColModel=[
								{name:'deliveryDo',index:'deliveryDo', width:70,align:'center',formatter: addAndDelete},
								{name:'deliveryId',index:'deliveryId', width:100,align:'center', sorttype:'int',hidden:true},
								{name:'ckmc',index:'ckmc', width:200,align:'center',sorttype:'string',formatter:ckmcModel},
								{name:'spmc',index:'spmc', width:200,align:'center', sorttype:'string',formatter:spmcModel},
								{name:'xkcID',index:'xkcID', width:100,align:'center', sorttype:'integer'},
								{name:'number',index:'number', width:100,align:'center', sorttype:'integer',formatter:numberModel},						
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
			            height: $(window).height()*0.45,
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
						onCellSelect:function(id,index,e){
							var colName=$(options.TableName).jqGrid('getGridParam','colModel')[index].name 
					      	select_name=colName
					      	select_index=index;
							var ids = $(options.TableName).jqGrid('getDataIDs');
							//获得当前最大行号（数据编号）
							var maxid;
							maxid = (ids.length ==0 ) ? 0 : Math.max.apply(Math,ids);
//							console.log(maxid);
							//当用户点击表格最后一行时,自动增加一行
							(id == maxid) && $(options.TableName).jqGrid('addRowData', maxid+1, {}, 'last' )
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
							var arr = document.querySelectorAll('.checkInput');
//							arr.forEach(function(e){
//								(e.dataset.rid == '') && (e.className = 'number');
//								(e.dataset.rid == '') && (e.parentNode.dataset.target = '')
//							});
							
							for(var i = 0,len = arr.length;i < len;i ++){
								(arr[i].dataset.rid == '') && (arr[i].className = 'number');
								(arr[i].dataset.rid == '') && (arr[i].parentNode.dataset.target = '');
							}
							$('.checkInput').attr('readonly',true).removeAttr('id');
							 totalCalc();
							$('.footrow td:first-child').html('合计');
						},
						loadError:function(xhr,status,error){
							//console.log(status)
						}
						})
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
			})
			
			function addAndDelete(cellvalue, options, rowObjec){
				var addAndDel = '<div class="operating" data-id="' + options.rowId + '"><span class="glyphicon glyphicon-trash" aria-hidden="true" id="add_row" title="删除行"></span></div>';
				return addAndDel;
			}
			/*弹出框输入框框*/
			function searchS(cellvalue, options, rowObjec){
				return  '<div class="operating" data-id="' + options.rowId + '"><span class="glyphicon glyphicon-search" aria-hidden="true" id="add_row" title="搜索"></span></div>';
			}
			
			$(".input-none").focus(function(){
				$(".none-cx").show();
				
			});
			$(document).on('click','.none-cx>ul>li',function(){
				$(".input-none").val($(this).text());
				$(".none-cx").hide();
			})	 
				
			
			//新增一行
			$(document).on('click', '.btnadd',function(e){
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
			
			//保存
			$(document).on('click','.saveData',function(e){
				
				$('.tip_p').html('草稿');
				$.zxsaas_plus.showalert("","保存成功!");
			});
			//新增
			$('.addAudit').click(function(e){
				$.zxsaas_plus.showconfirm("","当前页面数据未保存，是否放弃本次操作并打开一个新页面备注：若当前页面在保存前没有做过任何修改，无需提示",function(){
					$.zxsaas_plus.showalert("","保存成功!");
//					loadmodal();
					$(options.TableName).trigger("reloadGrid")
					console.log('///')
					$('.tip_p').html('已发货');
					},function(){
						
					});
			});
			//仓库名称
			function ckmcModel(cellvalue, options, rowObject){
				return '<input type="text"  style="border:0;text-align:center;width:150px" value="' + cellvalue +'" /><span data-rId="' + options.rowId +'" class="ckmc glyphicon glyphicon-plus" data-toggle="modal" data-target="#ckmcChoose"></span></span>';
			};
			
			//商品名称新增
			function spmcModel(cellvalue, options, rowObject){
//				console.log(options.rowId);
//				console.log(rowObject);
				return '<input type="text"  style="border:0;text-align:center;width:150px" value="' + cellvalue +'" /><span  data-rId="' + options.rowId +'" class="spmc glyphicon glyphicon-plus colspan2" data-toggle="modal" data-target="#spmcChoose"></span></span>';
			};
			
			//引入在库串号
			function numberModel(cellvalue, options, rowObject){
		//		return '<span data-toggle="modal" data-target="#numberChoose" data-rId="' + options.rowId +'">' + cellvalue + '<span  data-rId="' + options.rowId +'" class="number glyphicon glyphicon-plus"></span></span>';
			//loadComplete();
			console.log(rowObject.numberModel + '....numberModel');
				var str = '';
				if(rowObject.numberModel == '0'){
					str = '<input type="text" id="checkBan" class="checkInput'+options.rowId+'" style="border:0;text-align:center;width:70px" value="' + cellvalue +'" /><span  data-rId="' + options.rowId +'" class="numberPlus glyphicon glyphicon-plus"  data-toggle="modal" data-target="#numberChoose" ></span></span>';
				}else{
					str = '<input type="text" id="checkBan" class="checkInput'+options.rowId+'" style="border:0;text-align:center;width:90px" value="' + cellvalue +'" />';
				}
				return str;
			};
			$(document).on('blur','#checkBan',function(e){
				var value = $(this).val();
				var reg = /^[1-9]\d*$/;
				if(!reg.test(value)){
					value = '';
					$.zxsaas_plus.showalert("错误","只能输入数字!");
				}
				$(this).val(value)
			});
			
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
 * 单据引入
 */
$(document).on('click', '.bills',function(e){
//    rowId = $(this).data('rid');
	var optionsBills = {
		LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
		LoadTableUrl: "../../json/Storage/tranbills.json",
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
		TableName: "#jqGrid_tranBills", //显示表格名称。遵照css选择器书写
		iconJsonUrl:"../json/icon.json",
		btnbox: ".btnbox ",//功能按钮存放容器。遵照css选择器书写	
		pager:"#gridpager_tran"
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
			var colNames = ['单据编号','单据日期','部门名称','经办人','往来单位','单据金额','折后金额','新增人','新增时间','过帐人','过账时间','备注'];
			var JqGridColModel=[
								{name:'billsID',index:'billsID', width:150,align:'center', sorttype:'string'},
								{name:'billsDate',index:'billsDate', width:100,align:'center', sorttype:'string'},
								{name:'billsSection',index:'billsSection', width:100,align:'center', sorttype:'string'},
								{name:'billsAgent',index:'billsAgent', width:100,align:'center', sorttype:'string'},
								{name:'billsWang',index:'billsWang', width:100,align:'center', sorttype:'string'},
								{name:'billsMoney',index:'billsMoney', width:100,align:'center', sorttype:'string'},
								{name:'breakMoney',index:'breakMoney', width:100,align:'center', sorttype:'string'},
								{name:'addPeople',index:'addPeople', width:100,align:'center', sorttype:'string'},
								{name:'addDate',index:'addDate', width:100,align:'center', sorttype:'string'},
								{name:'postingPeople',index:'postingPeople', width:100,align:'center', sorttype:'string'},
								{name:'postingDate',index:'postingDate', width:100,align:'center', sorttype:'string'},
								{name:'addPeople',index:'addPeople', width:100,align:'center', sorttype:'string'}
			                ];
			
			loadtableBills();
			
			//加载表格
		
			/*$.getJSON(options.LoadTableUrl,function(t_datat){
				mydata=t_datat;
				//$(options.TableName).setGridParam({data: mydata}).trigger('reloadGrid');  
			});*/
			function loadtableBills(){
//				$.post(options.LoadTableUrl,{},function(r){
//					if(r.data.rows!=null){
//						 mydata=r.data;
//					//console.log(mydata);
					$(optionsBills.TableName).jqGrid({
						url:optionsBills.LoadTableUrl,
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
			            pager:optionsBills.pager,
			            viewrecords: true,	//是否要记录总数	           
                        multiselect : true,	//复选框属性
			           	//cellEdit:true,
			            width: "100%" ,
			            height: $(window).height()*0.3,
						autowidth:true,
						rownumWidth: 35, // the width of the row numbers columns
						shrinkToFit:false,  //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
						ondblClickRow:function(id){
						//双击进入编辑
			   				var delid = id;
			   				
						},
						
						gridComplete: function() {
							var ids=$(optionsBills.TableName).jqGrid("getDataIDs");

						},
						loadComplete:function(data){
							//console.log(data);
						},
						loadError:function(xhr,status,error){
							//console.log(status)
						},
						beforeSelectRow:function(rowid,e){
					       $(optionsBills.TableName).jqGrid('resetSelection');//设置单选  只能选中一行
					       return(true);
				       }
						})
		
		}	
		var optionsDetail = {
		LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
		LoadTableUrl: "../../json/Storage/tranDetail.json",
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
		TableName: "#jqGrid_tranDetail", //显示表格名称。遵照css选择器书写
		iconJsonUrl:"../json/icon.json",
		btnbox: ".btnbox ",//功能按钮存放容器。遵照css选择器书写	
		pager:"#gridpager_tranDetail"
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
			var colNames = ['ID','仓库名称','商品名称','数量','单价','金额','折扣率','折扣金额','折后金额','含税单价','含税金额','税率','税额','商品备注'];
			var JqGridColModel=[
			                    {name:'depId',index:'depId', width:100,align:'center', sorttype:'string',hidden:true},
								{name:'detailName',index:'detailName', width:100,align:'center', sorttype:'string'},
								{name:'spmcName',index:'spmcName', width:100,align:'center', sorttype:'string'},
								{name:'number',index:'number', width:100,align:'center', sorttype:'integer'},
								{name:'price',index:'price', width:100,align:'center', sorttype:'string'},
								{name:'money',index:'money', width:100,align:'center', sorttype:'string'},
								{name:'discountLV',index:'discountLV', width:100,align:'center', sorttype:'string'},
								{name:'discountJE',index:'discountJE', width:100,align:'center', sorttype:'string'},
								{name:'zhehuo',index:'zhehuo', width:100,align:'center', sorttype:'string'},
								{name:'hansuiD',index:'hansuiD', width:100,align:'center', sorttype:'string'},
								{name:'hansuiJ',index:'hansuiJ', width:100,align:'center', sorttype:'string'},
								{name:'suilv',index:'suilv', width:100,align:'center', sorttype:'string'},
								{name:'suie',index:'postingDate', width:100,align:'center', sorttype:'string'},
								{name:'remark',index:'remark', width:100,align:'center', sorttype:'string'}
			                ];
			
			loadtableDetail();
			
			//加载表格
		
			/*$.getJSON(options.LoadTableUrl,function(t_datat){
				mydata=t_datat;
				//$(options.TableName).setGridParam({data: mydata}).trigger('reloadGrid');  
			});*/
			function loadtableDetail(){
//				$.post(options.LoadTableUrl,{},function(r){
//					if(r.data.rows!=null){
//						 mydata=r.data;
//					//console.log(mydata);
					$(optionsDetail.TableName).jqGrid({
						url:optionsDetail.LoadTableUrl,
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
			            pager:optionsDetail.pager,
			            viewrecords: true,	//是否要记录总数	           
                        multiselect : true,	//复选框属性
			           	//cellEdit:true,
			            width: "100%" ,
			            height: $(window).height()*0.3,
						autowidth:true,
						rownumWidth: 35, // the width of the row numbers columns
						shrinkToFit:false,  //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
						ondblClickRow:function(id){
						//双击进入编辑
			   				var delid = id;
			   				
						},
						
						gridComplete: function() {
							var ids=$(optionsDetail.TableName).jqGrid("getDataIDs");

						},
						loadComplete:function(data){
							//console.log(data);
							
						},
						loadError:function(xhr,status,error){
							//console.log(status)
						}
						
		})
		}	
	
	//保存
	$(document).on('click','.billsSave',function(e){
		var idsLeft = $(optionsBills.TableName).jqGrid('getGridParam','selarrrow');//获取选中主信息行
		(idsLeft < 1) && ($.zxsaas_plus.showalert("错误","请至少选中一张单据!"));
	});
	
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
/**
 * 仓库名称选择
 */
$(document).on('click', '.ckmc',function(e){
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
	    }; 
		
		 $.ajax({
	            type: 'Get',
	            url: '../../json/Storage/tranBUMEN.json',
	            dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
	            success: function (data) {
	                $.fn.zTree.init($("#ckmcDataTree"), setting, data);
	                var str = $('#ckmcDataTree_1_switch').attr('class');
	                //console.log(str); //button level0 switch roots_close
	                var Class = str.replace('roots','center');
	                $('#ckmcDataTree_1_switch').attr('class',Class);
	                
	                var zTree = $.fn.zTree.getZTreeObj("ckmcDataTree");
                	zTree.expandAll(true);//展开全部节点
	            },
	            error: function (msg) {
	                alert(" 数据加载失败！" + msg);
	            }
	        });
});
//仓库名称
		function ckmcCheck(cellvalue, options, rowObject){
//				console.log(rowObject);
			return '<span class="ckmcCheck" data-dismiss="modal">' + cellvalue + '</span>';
		};
		
		$(document).on('click','.ckmcCheck',function(e){
//			console.log($(this).html() + '....' + rowId)
			$("#jqGrid_SubjectBalance").jqGrid('setCell', rowId, 'ckmc', $(this).html());
		});

/**
 * 商品名称选择
 */
var rowId = '';
$(document).on('click', '.spmc',function(e){
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
	    }; 
		
		 $.ajax({
	            type: 'Get',
	            url: '../../json/Storage/tranSJ.json',
	            dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
	            success: function (data) {
	                $.fn.zTree.init($("#spmcDataTree"), setting, data);
	                var str = $('#spmcDataTree_1_switch').attr('class');
	                //console.log(str); //button level0 switch roots_close
	                var Class = str.replace('roots','center');
	                $('#spmcDataTree_1_switch').attr('class',Class);
	                
	                var zTree = $.fn.zTree.getZTreeObj("spmcDataTree");
                	zTree.expandAll(true);//展开全部节点
	            },
	            error: function (msg) {
	                alert(" 数据加载失败！" + msg);
	            }
	        });
	        rowId = $(this).data('rid');
	        console.log(rowId + '..rowId');
			var options = {
				LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
				LoadTableUrl: "../../json/Storage/tranSP.json",
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
				TableName: "#jqGrid_tranSpmc", //显示表格名称。遵照css选择器书写
				iconJsonUrl:"../json/icon.json",
				btnbox: ".btnbox ",//功能按钮存放容器。遵照css选择器书写	
				pager:"#gridpager_tran"
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
					var colNames = ['ID','商品编码','商品名称','商品类别','商品品牌','商品型号','商品颜色','网络制式','是否管理串号'];
					var JqGridColModel=[
										{name:'blocId',index:'blocId', width:55,align:'center', sorttype:'string',hidden:true},
										{name:'codeSP',index:'codeSP', width:100,align:'center', sorttype:'string'},
										{name:'nameSP',index:'nameSP', width:100,align:'center', sorttype:'string',formatter:spmcCheck},
										{name:'sortSP',index:'sortSP', width:100,align:'center', sorttype:'string'},
										{name:'brandSP',index:'brandSP', width:100,align:'center', sorttype:'string'},
										{name:'modelSP',index:'modelSP', width:100,align:'center', sorttype:'string'},
										{name:'colorSP',index:'colorSP', width:100,align:'center', sorttype:'string'},
										{name:'networkSP',index:'networkSP', width:100,align:'center', sorttype:'string'},
										{name:'ifName',index:'ifName', width:100,align:'center', sorttype:'string',formatter:'select', editoptions:{value:"0:√;1:"}}
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
		//			            multiselect:true,//复选框
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
								}
								})
				
					}
		
		//商品名称
		function spmcCheck(cellvalue, options, rowObject){
//				console.log(rowObject);
			return '<span class="spmcCheck" data-dismiss="modal">' + cellvalue + '</span>';
		};
		
		$(document).on('click','.spmcCheck',function(e){
//			console.log($(this).html() + '....' + rowId)
			$("#jqGrid_SubjectBalance").jqGrid('setCell', rowId, 'spmc', $(this).html());
		});
		
			
	});
	

	/**
 * 商品名称选择   复选框
 */
var rowId = '';
$(document).on('click', '.spmcCheck2',function(e){
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
	    }; 
		
		 $.ajax({
	            type: 'Get',
	            url: '../../json/Storage/tranSJ.json',
	            dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
	            success: function (data) {
	                $.fn.zTree.init($("#spmcDataTree2"), setting, data);
	                var str = $('#spmcDataTree2_1_switch').attr('class');
	                //console.log(str); //button level0 switch roots_close
	                var Class = str.replace('roots','center');
	                $('#spmcDataTree2_1_switch').attr('class',Class);
	                
	                var zTree = $.fn.zTree.getZTreeObj("spmcDataTree2");
                	zTree.expandAll(true);//展开全部节点
	            },
	            error: function (msg) {
	                alert(" 数据加载失败！" + msg);
	            }
	        });
	        rowId = $(this).data('rid');
	        console.log(rowId + '..rowId');
			var options = {
				LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
				LoadTableUrl: "../../json/Storage/tranSP.json",
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
				TableName: "#jqGrid_tranSpmcCheck", //显示表格名称。遵照css选择器书写
				iconJsonUrl:"../json/icon.json",
				btnbox: ".btnbox ",//功能按钮存放容器。遵照css选择器书写	
				pager:"#gridpager_tranSpmcCheck"
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
					var colNames = ['ID','商品编码','商品名称','商品类别','商品品牌','商品型号','商品颜色','网络制式','是否管理串号'];
					var JqGridColModel=[
										{name:'blocId',index:'blocId', width:55,align:'center', sorttype:'string',hidden:true},
										{name:'codeSP',index:'codeSP', width:100,align:'center', sorttype:'string'},
										{name:'nameSP',index:'nameSP', width:100,align:'center', sorttype:'string',formatter:spmcCheck2},
										{name:'sortSP',index:'sortSP', width:100,align:'center', sorttype:'string'},
										{name:'brandSP',index:'brandSP', width:100,align:'center', sorttype:'string'},
										{name:'modelSP',index:'modelSP', width:100,align:'center', sorttype:'string'},
										{name:'colorSP',index:'colorSP', width:100,align:'center', sorttype:'string'},
										{name:'networkSP',index:'networkSP', width:100,align:'center', sorttype:'string'},
										{name:'ifName',index:'ifName', width:100,align:'center', sorttype:'string',formatter:'select', editoptions:{value:"0:√;1:"}}
					                ];
					
					loadtable3();
					
					//加载表格
				
					/*$.getJSON(options.LoadTableUrl,function(t_datat){
						mydata=t_datat;
						//$(options.TableName).setGridParam({data: mydata}).trigger('reloadGrid');  
					});*/
					function loadtable3(){
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
					           //	cellEdit:true,
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
								}
								})
				
					}
		
		//商品名称
		function spmcCheck2(cellvalue, options, rowObject){
//				console.log(rowObject);
			return '<span class="spmcCheck" data-dismiss="modal">' + cellvalue + '</span>';
		};
		
		$(document).on('click','.spmcCheck2',function(e){
//			console.log($(this).html() + '....' + rowId)
			$("#jqGrid_SubjectBalance").jqGrid('setCell', rowId, 'spmc', $(this).html());
		});
		
			
	});

/**
 * 引入在库串号
 */
//数量
		$(document).on('click','.numberPlus',function(e){
			var rid = $(this).data('rid');//获取选择行id
			var rowData = $('#jqGrid_SubjectBalance').jqGrid('getRowData',rid);//获取行数据
			//var endGoods = check(rowData.goods_id);
			//var endStor = check(rowData.stor_id);
			//$('.goodsMsg').val(endGoods);
			//$('.storageMsg').val(endStor);
			
			var textVal = $(this).prev().val();//获取输入框的数量值
			
			function check(val){
				var first = val.indexOf('value=') + 7;
				var str = val.substring(first);
				var end = str.indexOf('\"');
				return str.substring(0,end);
			}
			
			
			var optionsLeft = {
				LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
				LoadTableUrl: "../../json/Storage/number.json",
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
				TableName: "#jqGrid_tranNumber", //显示表格名称。遵照css选择器书写
				iconJsonUrl:"../json/icon.json",
				btnbox: ".btnbox ",//功能按钮存放容器。遵照css选择器书写	
				pager:"#gridpager_tranNumber"
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
					var colNames = ['ID','串号','成本价','辅助串号'];
					var JqGridColModel=[
										{name:'blocId',index:'blocId', width:55,align:'center', sorttype:'string',hidden:true},
										{name:'codeNumber',index:'codeNumber', width:150,align:'center', sorttype:'string'},
										{name:'costPrice',index:'costPrice', width:100,align:'center', sorttype:'string'},
										{name:'assist',index:'assist', width:150,align:'center', sorttype:'string'}
					                ];
					
					loadtableLeft();
					
					//加载表格
				
					/*$.getJSON(options.LoadTableUrl,function(t_datat){
						mydata=t_datat;
						//$(options.TableName).setGridParam({data: mydata}).trigger('reloadGrid');  
					});*/
					function loadtableLeft(){
		//				$.post(options.LoadTableUrl,{},function(r){
		//					if(r.data.rows!=null){
		//						 mydata=r.data;
		//					//console.log(mydata);
							$(optionsLeft.TableName).jqGrid({
								url:optionsLeft.LoadTableUrl,
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
					            pager:optionsLeft.pager,
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
									var ids=$(optionsLeft.TableName).jqGrid("getDataIDs");
		
								},
								loadComplete:function(data){
									//console.log(data);
									var len = data.rows.length;
									
								},
								loadError:function(xhr,status,error){
									//console.log(status)
								}
								})
				
					}
					
					var optionsRight = {
				LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
				LoadTableUrl: "../../json/Storage/number.json",
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
				TableName: "#jqGrid_tranNumber2", //显示表格名称。遵照css选择器书写
				iconJsonUrl:"../json/icon.json",
				btnbox: ".btnbox ",//功能按钮存放容器。遵照css选择器书写	
				pager:"#gridpager_tranNumber2"
		 	//	inputbox: ".inputbox" //搜索条件框存放容器。遵照css选择器书写
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
					var colNames = ['ID','串号','备注'];
					var JqGridColModel=[
										{name:'blocId',index:'blocId', width:55,align:'center', sorttype:'string',hidden:true},
										{name:'codeNumber',index:'codeNumber', width:150,align:'center', sorttype:'string'},
										{name:'remark',index:'remark', width:100,align:'center', sorttype:'string',editable:true}
					                ];
					
					loadtableRight();
					
					//加载表格
				
					/*$.getJSON(options.LoadTableUrl,function(t_datat){
						mydata=t_datat;
						//$(optionsRight.TableName).setGridParam({data: mydata}).trigger('reloadGrid');  
					});*/
					function loadtableRight(){
		//				$.post(optionsRight.LoadTableUrl,{},function(r){
		//					if(r.data.rows!=null){
		//						 mydata=r.data;
		//					//console.log(mydata);
							$(optionsRight.TableName).jqGrid({
								url:optionsRight.LoadTableUrl,
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
					            //loadonce: true,
					            rowNum: 20,
					            rowList: [20, 25, 40],
					            pager:optionsRight.pager,
					            viewrecords: true,		           
		  		                multiselect:true,
//					           	cellEdit:true, //编辑
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
									var ids=$(optionsRight.TableName).jqGrid("getDataIDs");
		
								},
								//数据加载完成后
								loadComplete:function(data){
									//console.log(data);
									var len = data.rows.length;
									$('.selectNum').html(len);
								},
								loadError:function(xhr,status,error){
									//console.log(status)
								}
								})
				
					}
			
			//给.selectNum初始赋值 表格数据没有加载就赋值
//			var rowListNum = $(optionsRight.TableName).jqGrid('getGridParam', 'records');
//			$('.selectNum').html(rowListNum);
			
			//右移已选中数据
			
			
			
//			//左移已选中数据
//			$(document).on('click','.glyphicon-chevron-left',function(e){
//				var idsRight = $(optionsRight.TableName).jqGrid('getGridParam','selarrrow');//获取右边选中的行
//				if(idsRight.length == 0){
//					$.zxsaas_plus.showalert("错误","请至少选中一行!");//模态框 至少要选择一行
//				}else{
//					for(var i = 0,len = idsRight.length;i < len ;i ++){
//						$(optionsRight.TableName).jqGrid('delRowData', idsRight[0]);  //idsRight[i]会出问题
//					}
//				}
//				var rowListNum = $(optionsRight.TableName).jqGrid('getGridParam', 'records');
//				$('.selectNum').html(rowListNum);
//			});
			
			
			
			//左移全部数据
			$(document).on('click','.glyphicon-fast-backward',function(e){
				var idsRight = $(optionsRight.TableName).jqGrid('getDataIDs');
				for(var i = 0,len = idsRight.length;i < len ;i ++){
					$(optionsRight.TableName).jqGrid('delRowData', idsRight[i]); 
				}
				var rowListNum = $(optionsRight.TableName).jqGrid('getGridParam', 'records');
				$('.selectNum').html(rowListNum);
			});
			
			//保存
			$(document).on('click','.numSave',function(e){
				var numTotal = $('.selectNum').html();
				console.log(numTotal + '...' + textVal);
				if(Number(numTotal) != Number(textVal)){
					$.zxsaas_plus.showalert("错误","已选择和应入数不匹配!");
					return false;
				}
			});
			
		});
		
//判断重复
function compare(tnl,lid,tnR){
	var flag=false;
	var idsRight = $(tnR).jqGrid('getDataIDs');//右边的所有id
	var lnum =  $(tnl).jqGrid('getCell',lid,'codeNumber');
	for(var i=0;i<idsRight.length;i++){
		var Rnum = $(tnR).jqGrid('getCell',idsRight[i],'codeNumber');
		if(Rnum==lnum){
			
			flag =true;
			break;
		}
	}
	if(flag){
		alert("已经重复！");
	}else{
		var maxid;
		maxid = (idsRight.length ==0 ) ? 0 : Math.max.apply(Math,idsRight);
		var rowData = $(tnl).jqGrid("getRowData",lid);//左边每一行的数据
		$(tnR).jqGrid('addRowData', maxid+1, rowData, 'last' );//添加到右边表格
	}
	
};
//左移一行数据
function rightYF(e){
	var idsLeft = $("#jqGrid_tranNumber").jqGrid('getGridParam','selarrrow');//获取左边选中的行
	if(idsLeft.length == 0){
		$.zxsaas_plus.showalert("错误","请至少选中一行!");
	}else{
		
		for(var i = 0,len = idsLeft.length;i < len ;i ++){
			compare("#jqGrid_tranNumber",idsLeft[i],"#jqGrid_tranNumber2");//比较是否重复
		}
		
	}
	var rowListNum = $("#jqGrid_tranNumber2").jqGrid('getGridParam', 'records');
	$('.selectNum').html(rowListNum);
	
};	
//右移全部数据			
function rightArr(){
	var idsLeft = $("#jqGrid_tranNumber").jqGrid('getDataIDs');
	for(var i = 0,len = idsLeft.length;i < len ;i ++){
		compare("#jqGrid_tranNumber",idsLeft[i],"#jqGrid_tranNumber2");//比较是否重复
	}
	var rowListNum = $("#jqGrid_tranNumber2").jqGrid('getGridParam', 'records');
	$('.selectNum').html(rowListNum);
};
//左移已选中数据
function leftRemover(){
	var idsRight = $("#jqGrid_tranNumber2").jqGrid('getGridParam','selarrrow');//获取右边选中的行
	if(idsRight.length == 0){
		$.zxsaas_plus.showalert("错误","请至少选中一行!");//模态框 至少要选择一行
	}else{
		for(var i = 0,len = idsRight.length;i < len ;i ++){
			$("#jqGrid_tranNumber2").jqGrid('delRowData', idsRight[0]);  //idsRight[i]会出问题
		}
	}
	var rowListNum = $("#jqGrid_tranNumber2").jqGrid('getGridParam', 'records');
	$('.selectNum').html(rowListNum);
}
