		function loadmodal()
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
		TableName: "#jqGrid_blocMessage", //显示表格名称。遵照css选择器书写
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
			var colNames = ['ID','公司名称','账户编码','账户类型','账户名称','刷卡手续费','刷卡最高额','刷卡手续费顶额','刷卡最低额','最低手续费','银行名称','户名','银行卡号','是否禁用','备注','新增人','新增时间','修改人','修改时间'];
			var JqGridColModel=[
								{name:'depId',index:'depId', width:100,align:'center', sorttype:'string',hidden:true,sortable:false},
								{name:'comName',index:'comName', width:200,align:'center', sorttype:'string',sortable:false},
								{name:'depName',index:'depName', width:200,align:'center', sorttype:'string',sortable:false},
								{name:'storageName',index:'storageName', width:150,align:'center', sorttype:"string",sortable:false},
								{name:'storageCla',index:'storageCla', width:150,align:'center', sorttype:"string",sortable:false},
								{name:'storageInfo',index:'storageInfo', width:150,align:'center', sorttype:"string",sortable:false},
								{name:'storageInfo',index:'storageInfo', width:150,align:'center', sorttype:"string",sortable:false},
								{name:'storageInfo',index:'storageInfo', width:150,align:'center', sorttype:"string",sortable:false},
								{name:'storageInfo',index:'storageInfo', width:150,align:'center', sorttype:"string",sortable:false},
								{name:'storageInfo',index:'storageInfo', width:150,align:'center', sorttype:"string",sortable:false},
								{name:'storageInfo',index:'storageInfo', width:150,align:'center', sorttype:"string",sortable:false},
								{name:'storageInfo',index:'storageInfo', width:150,align:'center', sorttype:"string",sortable:false},
								{name:'storageInfo',index:'storageInfo', width:150,align:'center', sorttype:"string",sortable:false},
								{name:'depDouble',index:'depDouble', width:100,align:'center', sorttype:'string',formatter:'select', editoptions:{value:"0:√;1:"},sortable:false},
								{name:'depMark',index:'depMark', width:100,align:'center',  sorttype:'string',sortable:false},
								{name:'depPre',index:'depPre', width:100,align:'center',  sorttype:'string',sortable:false},
								{name:'depTime',index:'depTime', width:150,align:'center',  sorttype:'string',sortable:false},
								{name:'depUpdate',index:'depUpdate', width:100,align:'center',  sorttype:'string',sortable:false},
								{name:'depUpdateTime',index:'depUpdateTime', width:150,align:'center', sorttype:'string',sortable:false}
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
			
			/*function addAndDelete(cellvalue, options, rowObjec){
				var addAndDel = '<div class="operating" data-id="' + options.rowId + '"><span style="margin-right:0.7rem" id="remove_row" title="添加商品" class="glyphicon glyphicon-plus"></span><span class="glyphicon glyphicon-trash" aria-hidden="true" id="add_row" title="删除行"></span></div>';
				return addAndDel;
			}*/
			
			//新增一行
			/*$(document).on('click', '.glyphicon-plus',function(e){
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
			});*/
			
			
			//批量删除
			$(document).on('click', '.btnDeleteRow',function(e){
				
				var ids = $(options.TableName).jqGrid('getGridParam','selarrrow');//选中的行id
				var len = ids.length;
				if(len == 0){
					$.zxsaas_plus.showalert("错误","请勾选仓库后再删除!");
					return false;
				}else{
					/*if($('#jqGrid_blocMessage tbody tr').length === 2) {
						$.zxsaas_plus.showalert("错误","至少保留一条数据!")
						return false;
					}*/
					$.zxsaas_plus.showconfirm("","是否确定删除选中数据?",function(){
						for(var i = 0;i < len;i ++){
//							$(options.TableName).jqGrid('delRowData', ids[i]);
							var gridData = $(options.TableName).jqGrid("getRowData",ids[i]);//获取被选中的一行数据
							var id = gridData.depId;//数据的id  根据此id删除数据
//							ids.shift();
							//$(options.TableName).jqGrid('delRowData', rowId);
						}
					},function(){
					
					});
				}
			});
			
			//修改密码
			$(document).on('click','.rePwd',function(e){
				//console.log(e.target);
				var reId = $(this).data('id');//获取删除的行id
				$.zxsaas_plus.showconfirm("","重置密码将用户密码设置为：123456<br />是否确定进行此操作",function(){
					//删除密码操作
					$.zxsaas_plus.showalert("","重置密码成功!");
				},function(){
					
				});
			});
			
			//启用
			$(document).on('click', '.qiyon',function(e){
				var ids = $(options.TableName).jqGrid('getGridParam','selarrrow');//选中的行id
				var len = ids.length;
				if(len == 0){
					$.zxsaas_plus.showalert("错误","请勾选公司后再启用!");
					return false;
				}else{
					for(var i = 0;i < len;i ++){
						//$(options.TableName).jqGrid('delRowData', checkedList[0]);
						//checkedList.shift();
						//调用后台方法修改字段
					}
					alert('启用成功');
				}
			});
			
			//禁用
			$(document).on('click', '.jinyon',function(e){
				var ids = $(options.TableName).jqGrid('getGridParam','selarrrow');//选中的行id
				var len = ids.length;
				if(len == 0){
					$.zxsaas_plus.showalert("错误","请勾选公司后再禁用!");
					return false;
				}else{
					for(var i = 0;i < len;i ++){
						//$(options.TableName).jqGrid('delRowData', checkedList[0]);
						//checkedList.shift();
						//调用后台方法修改字段
					}
					alert('禁用成功');
				}
			});
			
			//修改信息
			$('.updateBloc').click(function(){
//				var checkedList = [];//存放已勾选行id
//				$('.del').each(function (index, domEle) { 
//					  // domEle == this 
//					($(domEle).prop('checked')) ? (checkedList.push($(domEle).data('id'))) : '';
//				});
//				var len = checkedList.length;
				var ids = $(options.TableName).jqGrid('getGridParam','selarrrow');//选中的行id
				var len = ids.length;
//				var gridData = $(options.TableName).jqGrid("getRowData",checkedList[0]);//获取被选中的一行数据
				//var id = gridData.blocId;
				//console.log('id:' + id);
				if(len != 1){
					$.zxsaas_plus.showalert("错误","一次只能修改一条信息!");
					return false;
				}else{
					var gridData = $(options.TableName).jqGrid("getRowData",ids);//获取被选中的一行数据
					$('.blocId').val(gridData.blocId);
					//$('.blocDouble').val(gridData.blocDouble);
					(gridData.depDouble == '1') ? ($('.depDouble').prop({'checked':''})) : ($('.depDouble').prop({'checked':'checked'}));
					
					return true;
				}
			});
			
			//授权
			$('.accredit').click(function(){
				var ids=$(options.TableName).jqGrid('getGridParam','selarrrow');
				//console.log(ids + '....ids');
				if(ids.length < 1){
					$.zxsaas_plus.showalert("错误","请勾选仓库后再授权!");
					return false;
				}else if(ids.length >= 2){
					$.zxsaas_plus.showalert("错误","一次只能对一个仓库进行授权!");
					return false;
				}else{
					
					return true;
				}
			});
			
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
		

