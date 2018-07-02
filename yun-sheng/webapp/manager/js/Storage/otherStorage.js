//正式单据  点击正式单据时候此页面不可更改
$("div.unitClazz label:first").click(function(){
	$("input.form-control").attr("disabled","disabled");
	$(".btn-group button").attr("disabled","disabled");
	$(".input-group-btn button").attr("disabled","disabled");
	$(".box_input select").attr("disabled","disabled");
	$("div.footer input").attr("disabled","disabled");
    $("input[type='text']").attr("disabled","disabled");
   
});
$("div.unitClazz label:last").click(function(){
	$("input.form-control:not(#disabledInput)").removeAttr("disabled","disabled");
	$(".btn-group button").removeAttr("disabled","disabled");
	$(".input-group-btn button").removeAttr("disabled","disabled");
	$(".box_input select").removeAttr("disabled","disabled");
	$("div.footer input").removeAttr("disabled","disabled");
});
$("#slideThree").click(function(){
    $(".slideThree").toggleClass("color7D5F50");
    //  1   正式单据
    //  0  草稿单据
    $('#slideThree').prop('checked') ? $('#slideThree').val('1') : $('#slideThree').val('0')
  });
//部门选择
	(function(){
			//ztree
			var areaStr = '';//存储临时选中量
			var areaList = [];//存储临时选中量
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

				            },
				            error: function (msg) {
				                alert(" 数据加载失败！" + msg);
				            }
						});
					},
					onCheck:zTreeOnCheck
				},
				view: {
					showIcon: false
				},
				check: {
					enable: true,
					chkStyle: "checkbox",
					chkboxType: { "Y": "ps", "N": "ps" }
				}
		    }; 
		    
		    var ids = [];//选中节点id的集合
		    var names = [];//选中节点名字的集合
			function zTreeOnCheck(event, treeId, treeNode) {
				var id = treeNode.id;//获取数据的Id
				var tName = treeNode.name;
				if(treeNode.checked){
					ids.push(id);
					names.push(tName);
				}else{
					for(var i = 0;i<ids.length;i++){
						(ids[i] == id) && (ids.splice(i,1));
					}
					for(var i = 0;i<names.length;i++){
						(names[i] == tName) && (names.splice(i,1));
					}
				}
				$('.add_tree_ids').val(ids);//ids存放于此 可以通过此隐藏域获取选中项id   
				$('.depSearch').val(names);//显示已勾选的name
			}; 
			
			 $.ajax({
		            type: 'Get',
		            url: '../../json/procurement/depDataTree.json',
		            dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
		            success: function (data) {
		                $.fn.zTree.init($("#depModelTree"), setting, data);
		                var str = $('#depModelTree_1_switch').attr('class');
		                //console.log(str); //button level0 switch roots_close
		                var Class = str.replace('roots','center');
		                $('#depModelTree_1_switch').attr('class',Class);
		                
		                var zTree = $.fn.zTree.getZTreeObj("depModelTree");
		                zTree.expandAll(true);//展开全部节点
		            },
		            error: function (msg) {
		                alert(" 数据加载失败！" + msg);
		            }
		        });
		
		})();	
		//过滤条件   部门选择
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
						console.log();
						//controll(treeNode.id);//通过id调用对应方法 重构表格
						
						//单击树节点动态加载相应内容
						$.ajax({
							type: 'Get',
				            url: '',
				            dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
				            success: function (data) {

				            },
				            error: function (msg) {
				                alert(" 数据加载失败！" + msg);
				            }
						});
					},
					onCheck:zTreeOnCheck
				},
				view: {
					showIcon: false
				},
				check: {
					enable: true,
					chkStyle: "checkbox",
					chkboxType: { "Y": "ps", "N": "ps" }
				}
		    }; 
		    
		    var ids = [];//选中节点id的集合
		    var names = [];//选中节点名字的集合
			function zTreeOnCheck(event, treeId, treeNode) {
//			    console.log(event + ',' + treeId + ',' + treeNode.tId + ", " + treeNode.name + "," + treeNode.checked);
				var id = treeNode.id;//获取数据的Id
				var tName = treeNode.name;
				if(treeNode.checked){
					ids.push(id);
					names.push(tName);
				}else{
					for(var i = 0;i<ids.length;i++){
						(ids[i] == id) && (ids.splice(i,1));
					}
					for(var i = 0;i<names.length;i++){
						(names[i] == tName) && (names.splice(i,1));
					}
				}
				$('.filter_tree_ids').val(ids);//ids存放于此 可以通过此隐藏域获取选中项id   $('.add_tree_ids').val();
				$('.depFilter').val(names);//显示已勾选的name
			}; 
			
			 $.ajax({
		            type: 'Get',
		            url: '../../json/procurement/depDataTree.json',
		            dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
		            success: function (data) {
		                $.fn.zTree.init($("#filterModelTree"), setting, data);
		                var str = $('#filterModelTree_1_switch').attr('class');
		                var Class = str.replace('roots','center');
		                $('#filterModelTree_1_switch').attr('class',Class);
		                
		                var zTree = $.fn.zTree.getZTreeObj("filterModelTree");
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
		LoadTableUrl: "../../json/procurement/trusteeData.json",
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
		$("#datetimepickerEnd1").datetimepicker({
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
		$("#datetimepickerEnd2").datetimepicker({
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
			var colNames = ['操作','ID','仓库名称','商品名称','数量','单价','金额','商品备注','是否串号管理'];
			var JqGridColModel=[
								{name:'deliveryDo',index:'deliveryDo', width:70,align:'center',formatter: addAndDelete},
								{name:'deliveryId',index:'deliveryId', width:200,align:'center', sorttype:'int',hidden:true},
								{name:'stor_id',index:'stor_id', width:200,align:'center', formatter:storModel},
								{name:'goods_id',index:'goods_id', width:200,align:'center', formatter:goodsModel},
								{name:'goods_number',index:'goods_number', width:100,align:'center',editable:true},
								{name:'goods_price',index:'goods_price', width:100,align:'center',  sorttype:'float',formatter:"number",editable:true,editoptions:{
									dataEvents:[{
										type:"blur",
										fn:function(e){
											var rex=/^[0-9]*\.{0,1}[0-9]{0,2}$/;
											if(rex.test($(this).val())){
												$(this).parent().next().html(($(this).val().replace(/\,/g,'') * $(this).parent().prev().find('input').val().replace(/\,/g,'')).toFixed(2));//金额计算
											}else{
												$.zxsaas_plus.showalert("提示","请输入合法数字！");
												$(this).val('');
												$(this).parent().next().html('');
											}
										}
									}]
								}},
								{name:'totalPrice',index:'totalPrice', width:100,align:'center',  sorttype:'float',formatter:"number",editoptions:{
									dataEvents:[{
										type:"blur",
										fn:function(e){
											var rex=/^[0-9]*\.{0,1}[0-9]{0,2}$/;
											if(rex.test($(this).val())){
												$(this).parent().prev().html((Number($(this).val())/Number($(this).parent().prev().prev().find('input').val())).toFixed(2));//单价计算
											}else{
												$.zxsaas_plus.showalert("提示","请输入合法数字！");
												$(this).val('');
												$(this).parent().next().html('');
											}
										}
									}]
								}},
								{name:'remark',index:'remark', width:300,align:'center', sorttype:'string',editable:true},
								{name:'numManage',index:'numManage', width:300,align:'center', sorttype:'string',hidden:true}
			                ];
			
			loadtable();
		//加载表格
		
			/*$.getJSON(options.LoadTableUrl,function(t_datat){
				mydata=t_datat;
				//$(options.TableName).setGridParam({data: mydata}).trigger('reloadGrid');  
			});*/
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
			            rownumbers:true,
			            cellsubmit: 'clientArray',//单元格保存内容的位置		
			            editurl: 'clientArray',
			            rowNum: 15,
			            rowList: [10, 15, 20, 25, 40],
			            pager:options.pager,
			            viewrecords: true,		           
			           	cellEdit:true,
			            width: "100%" ,
			            height: $(window).height()*0.45,
						autowidth:true,
						rownumWidth: 35, // the width of the row numbers columns
						shrinkToFit:false,  //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
						footerrow:true,  //设置表格显示表脚
						userDataOnFooter:true,//设置userData 显示在footer里
						ondblClickRow:function(id){
						//双击进入编辑
			   				var delid = id;
			   				
						},
						onCellSelect:function(id,index,e){
//							console.log(id + '...' + index + '...' + e);
							var colName=$(options.TableName).jqGrid('getGridParam','colModel')[index].name 
					      	select_name=colName
					      	select_index=index;
							var ids = $(options.TableName).jqGrid('getDataIDs');
							//获得当前最大行号（数据编号）
							var maxid;
							maxid = (ids.length ==0 ) ? 0 : Math.max.apply(Math,ids);
							console.log(maxid + id + '................,,,,,,,');
							//当用户点击表格最后一行时,自动增加一行
							(id == maxid && index != 1) && $(options.TableName).jqGrid('addRowData', maxid+1, {}, 'last' )
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
						
						},
						
						beforeSelectRow:function(rowid,e){

						},
						afterInsertRow: function (rowid, aData) { //新增一行之后

						},
						gridComplete: function(rowid,aData) {
							var ids=$(options.TableName).jqGrid("getDataIDs");
							    // var jsid = $("#jqGrid_SubjectBalance").getCell(rowid,"goods_id");
		
                               
						},
						loadComplete:function(data){
							var arr = document.querySelectorAll('.goodsName');
							for(var i = 0,len = arr.length;i < len;i ++){
								(arr[i].dataset.rid == '') && (arr[i].className = 'goodsName');
								(arr[i].dataset.rid == '') && (arr[i].dataset.target = '');
							}
							$('.goodsRid').attr('readonly',true);
							$('.numberRid').attr('readonly',true).removeAttr('id');
							 totalCalc();
								$('.footrow td:first-child').html('合计');
								//数量修改  
								//   0    表示串号管理     
								//   1    数量管理
								 var ids = $("#jqGrid_SubjectBalance").getDataIDs();
					             for(var i=0;i<ids.length;i++){
					                 var rowData = $("#jqGrid_SubjectBalance").getRowData(ids[i]);
					                 if(rowData.numManage==0){
					                 	 $('#'+ids[i]).find("td:eq(5)").attr({"data-toggle":"modal" ,"data-target":"#numberChoose"});
					                     $('#'+ids[i]).find("td:eq(5)").addClass("numberPlus");
					                 }
					             }
						
						},
						loadError:function(xhr,status,error){
							//console.log(status)
							
						}
						});
			}
			/**
			 * 修改表格底部
			 */
			function totalCalc(){
				var idsLeft = $(options.TableName).jqGrid('getDataIDs');
				var sumNumber = 0;
				var sumMoney = 0;
				for(var i = 0,len = idsLeft.length;i < len ;i ++){
					var thisid = $(options.TableName).getCell(idsLeft[i],"goods_number"); 
					var totalPrice = $(options.TableName).getCell(idsLeft[i],"totalPrice");
					sumNumber += Number($(thisid).find("input").prevObject.val());
					sumMoney += parseFloat(totalPrice);
				}
				$('.footrow td').eq(5).html(sumNumber);
				$('.footrow td').eq(7).html(sumMoney);
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
			/*//新增
			$('.addAudit').click(function(e){
				$.zxsaas_plus.showconfirm("","是否保存当前修改?",function(){
					$.zxsaas_plus.showalert("","保存成功!");
//					loadmodal();
					$(options.TableName).trigger("reloadGrid")
					console.log('///')
					$('.tip_p').html('未审核');
					},function(){
						
					});
			});*/
			//新增
			$(document).on('click','.addAudit',function(){
				alert('add!!!');
				//console.log(this);
				//页面编辑数据
				var inputsData;
				var selectsData;
				
				//记录下表单中的原始值
				function initFileds(){console.log(00000);
					var inputs = document.getElementsByTagName("input");
					var selects =document.getElementsByTagName("select");
					inputsData =new Array(inputs.length);
					for(var i=0;i<inputs.length;i++){
						inputsData[i] = inputs[i].value;
						if(inputs[i].type=="radio"){
							inputsData[i]=inputs[i].checked;
						}
					}
					selectsData = new Array(selects.length);
					for(var i=0;i<selects.length;i++){
						selectsData[i]=selects[i].value;
					}
					console.log(this);
				}

                  /*判断表单中的值是否被修改了
                   * submitCommand  表单有改动时执行的javascript代码
                   * */
					
				   function checkModification(submitCommand){
					   var inputs=document.getElementsByTagName("input");
					   var selects=docment.getElementsByTagName("select");
					   var hasBeenChanged = false;
					   for(var i=0;i<inputs.length;i++){
						   if(inputs[i].type=="radio"&&(inputs[i].checked!=inputsData[i])){
							   hasBeenChanged = true;
							   inputsData[i] = inputs[i].checked;
						   }
					   }
					   for(var i=0;i<selects.length;i++){
						   if(selectsData[i]!=selects[i].value){
							   hasBeenChanged = true;
							   selectsData[i]=selects[i].value;
						   }
					   }
					   if(hasBeenChanged&&confirm("数据已经改变，是否保存？")){
						   eval(submitCommand);
					   }
				   }
			});
			
			function addAndDelete(cellvalue, options, rowObjec){
				var addAndDel = '<div class="operating" data-id="' + options.rowId + '"><span class="glyphicon glyphicon-trash" aria-hidden="true" id="add_row" title="删除行"></span></div>';
				return addAndDel;
			}
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
			
			//商品名称修改
			function goodsModel(cellvalue, options, rowObject){
//				console.log(options.rowId);
//				console.log(rowObject);
//				return '<span class="goodsName" data-toggle="modal" data-target="#goodsChoose" data-rId="' + options.rowId +'">' + cellvalue + '</span>';
				return '<input type="text" class="ceshis goodsRid' + options.rowId +'" style="border:0;text-align:center;width:170px" value="' + cellvalue +'" /><span class="goodsName glyphicon glyphicon-plus" data-toggle="modal" data-target="#goodsChoose" data-rId="' + options.rowId +'"></span>';
				
			};
			
			//仓库名称修改
			function storModel(cellvalue, options, rowObject){
//				console.log(options.rowId);
//				console.log(rowObject);
//				return '<span class="storName" data-toggle="modal" data-target="#storChoose" data-rId="' + options.rowId +'">' + cellvalue + '</span>';
				return '<input type="text" class="storRid' + options.rowId +'" style="border:0;text-align:center;width:170px" value="' + cellvalue +'" /><span class="storName glyphicon glyphicon-plus" data-toggle="modal" data-target="#storChoose" data-rId="' + options.rowId +'"></span>';
				
			};
			
			$(document).on('blur','#checkNum',function(e){
				var value = $(this).val();
				var reg = /^[1-9]\d*$/;
				if(!reg.test(value)){
					value = '';
					$.zxsaas_plus.showalert("错误","只能输入数字!");
				}
				$(this).val(value)
			});
			
			//检测输入的是否为数字
			function checkNumber(value, colname) {
//				console.log(arguments);
//				console.log('value:' + value + '....colname:' + colname);
				var reg = /^[1-9]\d*$/;
				var arr = [];
				arr = (!reg.test(value)) ? ([false,'请输入数字']) : ([true,""])
//				   return value.replace(/[^\d]$/g,'')
				return arr;
			}
			
			//保存付款金额
			$(document).on('blur','.money',function(e){
//				var temp = $(this).val();
//				var result=temp.match(/^[0-9]+(.[0-9]{1,2})$/); 
//				result == null && alert("非法的输入!")
				var cash = $('.cash').val();
				var pos = $('.pos').val();
				var aliPay = $('.aliPay').val();
				var total = Number(cash) + Number(pos) + Number(aliPay);
				console.log(total);
				$('.totalMoney').html(total);
			});
			
			$(document).on('click','.saveMoney',function(e){
				var total = $('.totalMoney').html();
				$('.moneyCh').val(total);
				$.zxsaas_plus.showalert("","添加成功!");
			});
			
			//审核
			$('.audit').click(function(e){
				//获取单据审批状态   1 未审核      
				var status = 1;
//				status != 1 && $.zxsaas_plus.showalert("","审核失败,此单不是未审核单!")
				if(status == 1){
					return true;
				}else{
					$.zxsaas_plus.showalert("错误","审核失败,此单不是未审核单!");
					return false;
				}
			});
			//审核保存数据
			$(document).on('click','.auditSave',function(e){
				$(options.TableName).setGridParam().showCol("exa_number");
				$(options.TableName).setGridParam().showCol("exaPrice");
				$('.tip_p').html('已审核');
			});
			
			//保存
			$(document).on('click','.saveData',function(e){
				
				$('.tip_p').html('未审核');
				$.zxsaas_plus.showalert("","保存成功!");
			});
			
			//过账
			$(document).on('click','.transfer',function(e){
				//获取单据审批状态   1  草稿单     
				var status = 1;
//				status != 1 && $.zxsaas_plus.showalert("","审核失败,此单不是未审核单!")
				if(status == 1){
					$('.tip_p').html('已过账');
					$.zxsaas_plus.showalert("","过账成功!");
				}else{
					$.zxsaas_plus.showalert("错误","过账失败,此单不是草稿单!");
					return false;
				}
			});
			
			//红冲
			$(document).on('click','.redRush',function(e){
				//获取单据审批状态   1  已过账      
				var status = 1;
//				status != 1 && $.zxsaas_plus.showalert("","审核失败,此单不是未审核单!")
				if(status == 1){
					$('.tip_p').html('已红冲');
					$.zxsaas_plus.showalert("","红冲成功!");
				}else{
					$.zxsaas_plus.showalert("错误","红冲失败,此单不是已过账!");
					return false;
				}
				
			});
			
			//删除单据
			$('.deleteReceipts').click(function(e){
				//获取单据审批状态   1 未审核      
				var status = 1;
				if(status == 1){
					$.zxsaas_plus.showconfirm("","是否确定删除此单据?",function(){
						//通过单据id删除单据
						
						$.zxsaas_plus.showalert("","删除成功!");
					},function(){
						
					});
				}else{
					$.zxsaas_plus.showalert("错误","删除失败,此单不是未审核单!");
					return false;
				}
			});
			
			//强制完成
			$('.completeReceipts').click(function(e){
				//获取单据审批状态   1 未审核      
				var status = 1;
				if(status == 1){
					$.zxsaas_plus.showalert("错误","强制完成失败,此单是未审核单!");
					return false;
				}else{
					$.zxsaas_plus.showalert("","强制完成成功!");
					$('.tip_p').html('强制完成');
				}
				
			});
			
			/**
			 * 自定义列计算
			 * @param val
			 * @param name
			 * @param record
			 * @returns {String}
			 */
			function mysum(val, name, record)
			{
				return "("+record.subCla+")小计：";
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
		 * 往来单位选择
		 */
		$(document).on('click', '.unitSearch',function(e){
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
			            url: '../../json/admin/metaDataTree.json',
			            dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
			            success: function (data) {
			                $.fn.zTree.init($("#roleDataTree"), setting, data);
			                var str = $('#roleDataTree_1_switch').attr('class');
			                //console.log(str); //button level0 switch roots_close
			                var Class = str.replace('roots','center');
			                $('#roleDataTree_1_switch').attr('class',Class);
			                
			                var zTree = $.fn.zTree.getZTreeObj("roleDataTree");
		                	zTree.expandAll(true);//展开全部节点
			            },
			            error: function (msg) {
			                alert(" 数据加载失败！" + msg);
			            }
			        });
			        
					var options = {
						LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
						LoadTableUrl: "../../json/admin/metaData12.json",
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
						TableName: "#jqGrid_roleMsgAdd", //显示表格名称。遵照css选择器书写
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
							var colNames = ['ID','往来单位编码','往来单位名称','助记码','所属地区','往来单位类型','往来单位类别'];
							var JqGridColModel=[
												{name:'blocId',index:'blocId', width:55,align:'center', sorttype:'string',hidden:true},
												{name:'metaSearch',index:'metaSearch', width:100,align:'center', sorttype:'string'},
												{name:'metaName',index:'metaName', width:100,align:'center', sorttype:'string',formatter: cLink},
												{name:'metaUpdate',index:'metaUpdate', width:100,align:'center', sorttype:'string'},
												{name:'metaDelete',index:'metaDelete', width:100,align:'center', sorttype:'string'},
												{name:'metaGuo',index:'metaGuo', width:100,align:'center', sorttype:'string'},
												{name:'metaHong',index:'metaHong', width:100,align:'center', sorttype:'string'}
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
							            rowList: [20, 40, 60],
							            pager:options.pager,
							            viewrecords: true,		           
					//			        multiselect:true,
							           	//cellEdit:true,
							            width: "100%" ,
							            height: $(window).height()*0.44,
										autowidth:true,
										rownumWidth: 35, // the width of the row numbers columns
										shrinkToFit:false,  //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
										gridComplete: function() {
											var ids=$(options.TableName).jqGrid("getDataIDs");
				
										},
										loadComplete:function(data){
											//console.log(data);
											var len = data.rows.length;
											//表格加载完成 默认隐藏的列
//											$(options.TableName).setGridParam().hideCol("metaMoneySee");
//											$(options.TableName).setGridParam().hideCol("metaMoneyUpdate");
//											$(options.TableName).setGridParam().hideCol("clientSee");
											
										},
										loadError:function(xhr,status,error){
											//console.log(status)
										}
										})
						
							}
					//隐藏/显示操作授权
					$('.show-checkbox-add').click(function(){
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
					
					//往来单位新增
					function cLink(cellvalue, options, rowObject){
						return '<span class="unitCh" data-dismiss="modal">' + cellvalue + '</span>';
					};
					
					$(document).on('click','.unitCh',function(e){
//						console.log($(this).html() + '....html');
						$('.unitSearch').val($(this).html());
					});
					
			});
			
		//经办人选择
		$(document).on('click','.perSearch',function(e){
			var options = {
						LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
						LoadTableUrl: "../../json/admin/company/money.json",
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
						TableName: "#jqGrid_areaManage", //显示表格名称。遵照css选择器书写
						iconJsonUrl:"../json/icon.json",
						btnbox: ".btnbox ",//功能按钮存放容器。遵照css选择器书写	
						pager:"#jqGridPager_areaManage"
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
					var colNames = ['ID','员工编码','员工名称','所属部门','职位名称','备注'];
					var JqGridColModel=[
										{name:'depId',index:'depId', width:100,align:'center', sorttype:'string',hidden:true},
										{name:'comNo',index:'comNo', width:100,align:'center', sorttype:'string'},
										{name:'comName',index:'comName', width:100,align:'center', sorttype:'string',formatter:checkName},
										{name:'comMark',index:'comMark', width:100,align:'center', sorttype:'string'},
										{name:'comCheck',index:'comCheck', width:100,align:'center', sorttype:'string'},
										{name:'storageName',index:'storageName', width:100,align:'center', sorttype:"string"}
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
//			            multiselect:true,
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

		//经办人新增
		function checkName(cellvalue, options, rowObject){
//			console.log(rowObject);
			return '<span class="checkName" data-dismiss="modal">' + cellvalue + '</span>';
		};
		
		$(document).on('click','.checkName',function(e){
//			console.log($(this).html() + '....html');
			$('.perSearch').val($(this).html());
		});
		
		
		
	});
		
		/**
		 * 商品名称选择
		 */
		var rowId = '';
		$(document).on('click', '.goodsName',function(e){
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
			            url: '../../json/admin/metaDataTree.json',
			            dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
			            success: function (data) {
			                $.fn.zTree.init($("#goodsDataTree"), setting, data);
			                var str = $('#goodsDataTree_1_switch').attr('class');
			                //console.log(str); //button level0 switch roots_close
			                var Class = str.replace('roots','center');
			                $('#goodsDataTree_1_switch').attr('class',Class);
			                
			                var zTree = $.fn.zTree.getZTreeObj("goodsDataTree");
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
						LoadTableUrl: "../../json/admin/metaData12.json",
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
						TableName: "#jqGrid_goodsMsgAdd", //显示表格名称。遵照css选择器书写
						iconJsonUrl:"../json/icon.json",
						btnbox: ".btnbox ",//功能按钮存放容器。遵照css选择器书写	
						pager:"#gridpager_goods"
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
												{name:'metaSearch',index:'metaSearch', width:100,align:'center', sorttype:'string'},
												{name:'metaName',index:'metaName', width:100,align:'center', sorttype:'string',formatter: goodsCheck},
												{name:'metaUpdate',index:'metaUpdate', width:100,align:'center', sorttype:'string'},
												{name:'metaDelete',index:'metaDelete', width:100,align:'center', sorttype:'string'},
												{name:'metaGuo',index:'metaGuo', width:100,align:'center', sorttype:'string'},
												{name:'metaGuo',index:'metaGuo', width:100,align:'center', sorttype:'string'},
												{name:'metaGuo',index:'metaGuo', width:100,align:'center', sorttype:'string'},
												{name:'metaHong',index:'metaHong', width:100,align:'center', sorttype:'string'}
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
				//			            multiselect:true,
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
//											$(options.TableName).setGridParam().hideCol("metaMoneySee");
//											$(options.TableName).setGridParam().hideCol("metaMoneyUpdate");
//											$(options.TableName).setGridParam().hideCol("clientSee");
											
										},
										loadError:function(xhr,status,error){
											//console.log(status)
										}
										})
						
							}
				
				//商品名称新增
				function goodsCheck(cellvalue, options, rowObject){
	//				console.log(rowObject);
					return '<span class="goodsCheck" data-dismiss="modal">' + cellvalue + '</span>';
				};
				
				$(document).on('click','.goodsCheck',function(e){
//					$('.goodsNameCheck').val($(this).html());
//					$("#jqGrid_SubjectBalance").jqGrid('setCell', rowId, 'goods_id', $(this).html());
					$('input[class=goodsRid' + rowId + ']').val($(this).html());
//					$('input').hasClass('className').val($(this).html());
				});
					
			});
			
		
		//订单审核
		$(document).on('click','.audit',function(e){
			var options = {
		LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
		LoadTableUrl: "../../json/admin/company/money.json",
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
		TableName: "#jqGrid_auditManage", //显示表格名称。遵照css选择器书写
		iconJsonUrl:"../json/icon.json",
		btnbox: ".btnbox ",//功能按钮存放容器。遵照css选择器书写	
		pager:"#jqGridPager_auditManage"
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
			var colNames = ['ID','操作','商品名称','订货量','单价','订单总额','审批量','审批总额','单台固返','商品备注'];
			var JqGridColModel=[
								{name:'depId',index:'depId', width:200,align:'center', sorttype:'int',hidden:true},
								{name:'deliveryDo',index:'deliveryDo', width:50,align:'center',formatter: deleteRows},
								{name:'goods_name',index:'goods_name', width:100,align:'center', sorttype:'string'},
								{name:'goods_number',index:'goods_number', width:100,align:'center', sorttype:'integer'},
								{name:'goods_price',index:'goods_price', width:80,align:'center', sorttype:'integer'},
								{name:'goods_total',index:'goods_total', width:100,align:'center',  sorttype:'float',formatter:"number"},
								{name:'audit_number',index:'audit_number', width:80,align:'center',  sorttype:'float',formatter:"integer",editable:true},
								{name:'audit_total',index:'audit_total', width:100,align:'center',  sorttype:'float',formatter:"number"},
								{name:'gufan',index:'gufan', width:100,align:'center', sorttype:'integer'},
								{name:'remark',index:'remark', width:100,align:'center', sorttype:'string'}
			                ];
			
			loadtable();
		//加载表格
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
//						editurl: 'clientArray',
								
						jsonReader  : {	
								root: "rows",
								repeatitems: false
									},
						cellsubmit: 'clientArray',//单元格保存内容的位置
						colNames:colNames,          
			            colModel:JqGridColModel,
			            //loadonce: false,
			            sortable:false,			            
			            rownumbers:true,
			            //loadonce: true,
			            rowNum: 20,
			            rowList: [20, 40, 60],
			            pager:options.pager,
			            viewrecords: true,		           
//			            multiselect:true,
			           	cellEdit:true,
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

		function deleteRows(cellvalue, options, rowObjec){
			return '<div class="operating" data-id="' + options.rowId + '"><span class="glyphicon glyphicon-trash glyphicon-trash-audit" aria-hidden="true" id="add_row" title="删除行"></span></div>';
		}
		
		//删除一行
		$(document).on('click', '.glyphicon-trash-audit',function(e){
			var thisTitle = $(this).attr("title");
			var rowId = $(this).parent().data('id');
			if(thisTitle == "删除行"){
				console.log('条数:' + $('#jqGrid_auditManage tbody tr').length);
				if($('#jqGrid_auditManage tbody tr').length === 2) {
					$.zxsaas_plus.showalert("错误","至少保留一条数据!")
					return false;
				}
				$.zxsaas_plus.showconfirm("","是否确定删除本行?",function(){
					$(options.TableName).jqGrid('delRowData', rowId);
				},function(){
					
				});

			}
		});
		
		});
		
		/**
		 * 过滤条件     仓库选择
		 */
		$(document).on('click', '.storageName',function(e){
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
			            url: '../../json/admin/metaDataTree.json',
			            dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
			            success: function (data) {
			                $.fn.zTree.init($("#storageDataTree"), setting, data);
			                var str = $('#storageDataTree_1_switch').attr('class');
			                //console.log(str); //button level0 switch roots_close
			                var Class = str.replace('roots','center');
			                $('#storageDataTree_1_switch').attr('class',Class);
			                
			                var zTree = $.fn.zTree.getZTreeObj("storageDataTree");
		                	zTree.expandAll(true);//展开全部节点
			            },
			            error: function (msg) {
			                alert(" 数据加载失败！" + msg);
			            }
			        });
			        
					var options = {
						LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
						LoadTableUrl: "../../json/admin/metaData12.json",
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
						TableName: "#jqGrid_storage", //显示表格名称。遵照css选择器书写
						iconJsonUrl:"../json/icon.json",
						btnbox: ".btnbox ",//功能按钮存放容器。遵照css选择器书写	
						pager:"#gridpager_storage"
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
							var colNames = ['ID','公司名称','部门名称','仓库名称','仓库类型','备注'];
							var JqGridColModel=[
												{name:'blocId',index:'blocId', width:55,align:'center', sorttype:'string',hidden:true},
												{name:'metaSearch',index:'metaSearch', width:120,align:'center', sorttype:'string'},
												{name:'metaDelete',index:'metaDelete', width:120,align:'center', sorttype:'string'},
												{name:'metaName',index:'metaName', width:120,align:'center', sorttype:'string'},
												{name:'metaDelete',index:'metaDelete', width:100,align:'center', sorttype:'string'},
												{name:'metaHong',index:'metaHong', width:100,align:'center', sorttype:'string'}
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
							            rowList: [20, 40, 60],
							            pager:options.pager,
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
											var ids=$(options.TableName).jqGrid("getDataIDs");
				
										},
										loadComplete:function(data){
											//console.log(data);
											var len = data.rows.length;
											//表格加载完成 默认隐藏的列
//											$(options.TableName).setGridParam().hideCol("metaMoneySee");
//											$(options.TableName).setGridParam().hideCol("metaMoneyUpdate");
//											$(options.TableName).setGridParam().hideCol("clientSee");
											
										},
										loadError:function(xhr,status,error){
											//console.log(status)
										}
										})
						
							}
					//保存
					$(document).on('click','.storageSave',function(e){
						var ids = $(options.TableName).jqGrid('getGridParam','selarrrow');//选中的行id
						var len = ids.length;
						var sIds = [];//选中节点id的集合
		    			var names = [];//选中节点名字的集合
						for(var i = 0;i < len;i ++){
							var gridData = $(options.TableName).jqGrid("getRowData",ids[i]);//获取被选中的一行数据
							var storageId = gridData.blocId;//数据的id    blocId为此行数据的id
							var storageName = gridData.metaName;//仓库名称
							sIds.push(storageId);
							names.push(storageName);
							//$(options.TableName).jqGrid('delRowData', rowId);
						}
						$('.storageId').val(sIds);//ids存放于此 可以通过此隐藏域获取选中项id   $('.add_tree_ids').val();
						$('.storageName').val(names);
						
					});
					
					
					
			});
			
		/**
		 * 过滤条件     往来单位选择
		 */
		$(document).on('click', '.unitName',function(e){
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
			            url: '../../json/admin/metaDataTree.json',
			            dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
			            success: function (data) {
			                $.fn.zTree.init($("#unitDataTree"), setting, data);
			                var str = $('#unitDataTree_1_switch').attr('class');
			                //console.log(str); //button level0 switch roots_close
			                var Class = str.replace('roots','center');
			                $('#unitDataTree_1_switch').attr('class',Class);
			                
			                var zTree = $.fn.zTree.getZTreeObj("unitDataTree");
		                	zTree.expandAll(true);//展开全部节点
			            },
			            error: function (msg) {
			                alert(" 数据加载失败！" + msg);
			            }
			        });
			        
					var options = {
						LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
						LoadTableUrl: "../../json/admin/metaData12.json",
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
						TableName: "#jqGrid_unit", //显示表格名称。遵照css选择器书写
						iconJsonUrl:"../json/icon.json",
						btnbox: ".btnbox ",//功能按钮存放容器。遵照css选择器书写	
						pager:"#gridpager_unit"
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
							var colNames = ['ID','往来单位编码','往来单位名称','助记码','所属地区','往来单位类型','往来单位类别'];
							var JqGridColModel=[
												{name:'blocId',index:'blocId', width:55,align:'center', sorttype:'string',hidden:true},
												{name:'metaSearch',index:'metaSearch', width:100,align:'center', sorttype:'string'},
												{name:'metaName',index:'metaName', width:100,align:'center', sorttype:'string'},
												{name:'metaUpdate',index:'metaUpdate', width:100,align:'center', sorttype:'string'},
												{name:'metaDelete',index:'metaDelete', width:100,align:'center', sorttype:'string'},
												{name:'metaGuo',index:'metaGuo', width:100,align:'center', sorttype:'string'},
												{name:'metaHong',index:'metaHong', width:100,align:'center', sorttype:'string'}
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
							            rowNum: 20,
							            rowList: [20, 40, 60],
							            pager:options.pager,
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
											var ids=$(options.TableName).jqGrid("getDataIDs");
				
										},
										loadComplete:function(data){
											//console.log(data);
											var len = data.rows.length;
											//表格加载完成 默认隐藏的列
//											$(options.TableName).setGridParam().hideCol("metaMoneySee");
//											$(options.TableName).setGridParam().hideCol("metaMoneyUpdate");
//											$(options.TableName).setGridParam().hideCol("clientSee");
											
										},
										loadError:function(xhr,status,error){
											//console.log(status)
										}
										})
						
							}
					//保存
					$(document).on('click','.unitSave',function(e){
						var ids = $(options.TableName).jqGrid('getGridParam','selarrrow');//选中的行id
						var len = ids.length;
						var sIds = [];//选中节点id的集合
		    			var names = [];//选中节点名字的集合
						for(var i = 0;i < len;i ++){
							var gridData = $(options.TableName).jqGrid("getRowData",ids[i]);//获取被选中的一行数据
							var storageId = gridData.blocId;//数据的id    blocId为此行数据的id
							var storageName = gridData.metaName;//仓库名称
							sIds.push(storageId);
							names.push(storageName);
							//$(options.TableName).jqGrid('delRowData', rowId);
						}
						$('.unitId').val(sIds);//ids存放于此 可以通过此隐藏域获取选中项id   $('.add_tree_ids').val();
						$('.unitName').val(names);
						
					});
					
					
					
			});
			
		/**
		 * 过滤条件     商品名称选择
		 */
		$(document).on('click', '.goodsName',function(e){
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
			            url: '../../json/admin/metaDataTree.json',
			            dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
			            success: function (data) {
			                $.fn.zTree.init($("#goodsDataTree_audit"), setting, data);
			                var str = $('#goodsDataTree_audit_1_switch').attr('class');
			                //console.log(str); //button level0 switch roots_close
			                var Class = str.replace('roots','center');
			                $('#goodsDataTree_audit_1_switch').attr('class',Class);
			                
			                var zTree = $.fn.zTree.getZTreeObj("goodsDataTree_audit");
		                	zTree.expandAll(true);//展开全部节点
			            },
			            error: function (msg) {
			                alert(" 数据加载失败！" + msg);
			            }
			        });
			        
					var options = {
						LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
						LoadTableUrl: "../../json/admin/metaData12.json",
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
						TableName: "#jqGrid_goods", //显示表格名称。遵照css选择器书写
						iconJsonUrl:"../json/icon.json",
						btnbox: ".btnbox ",//功能按钮存放容器。遵照css选择器书写	
						pager:"#gridpager_goods_audit"
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
												{name:'metaSearch',index:'metaSearch', width:100,align:'center', sorttype:'string'},
												{name:'metaName',index:'metaName', width:100,align:'center', sorttype:'string'},
												{name:'metaUpdate',index:'metaUpdate', width:100,align:'center', sorttype:'string'},
												{name:'metaDelete',index:'metaDelete', width:100,align:'center', sorttype:'string'},
												{name:'metaGuo',index:'metaGuo', width:100,align:'center', sorttype:'string'},
												{name:'metaHong',index:'metaHong', width:80,align:'center', sorttype:'string'},
												{name:'metaHong',index:'metaHong', width:100,align:'center', sorttype:'string'},
												{name:'metaHong',index:'metaHong', width:100,align:'center', sorttype:'string',formatter:'select', editoptions:{value:"0:√;1:"}}
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
											var ids=$(options.TableName).jqGrid("getDataIDs");
				
										},
										loadComplete:function(data){
											//console.log(data);
											var len = data.rows.length;
											//表格加载完成 默认隐藏的列
//											$(options.TableName).setGridParam().hideCol("metaMoneySee");
//											$(options.TableName).setGridParam().hideCol("metaMoneyUpdate");
//											$(options.TableName).setGridParam().hideCol("clientSee");
											
										},
										loadError:function(xhr,status,error){
											//console.log(status)
										}
										})
						
							}
					//保存
					$(document).on('click','.goodsSave',function(e){
						var ids = $(options.TableName).jqGrid('getGridParam','selarrrow');//选中的行id
						var len = ids.length;
						var sIds = [];//选中节点id的集合
		    			var names = [];//选中节点名字的集合
						for(var i = 0;i < len;i ++){
							var gridData = $(options.TableName).jqGrid("getRowData",ids[i]);//获取被选中的一行数据
							var goodsId = gridData.blocId;//数据的id    blocId为此行数据的id
							var goodsName = gridData.metaName;//仓库名称
							sIds.push(goodsId);
							names.push(goodsName);
							//$(options.TableName).jqGrid('delRowData', rowId);
						}
						$('.goodsId').val(sIds);//ids存放于此 可以通过此隐藏域获取选中项id   $('.add_tree_ids').val();
						$('.goodsName').val(names);
						
					});
					
					
					
			});
			
		//仓库
		$(document).on('click','.storName',function(e){
			
			var rowId = $(this).data('rid');
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
						console.log();
						//controll(treeNode.id);//通过id调用对应方法 重构表格
						
						//单击树节点动态加载相应内容
						$.ajax({
							type: 'Get',
				            url: '',
				            dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
				            success: function (data) {

				            },
				            error: function (msg) {
				                alert(" 数据加载失败！" + msg);
				            }
						});
					},
					onClick:zTreeOnClick
				},
				view: {
					showIcon: false
				}
		    }; 
		    
			function zTreeOnClick(event, treeId, treeNode) {
//			    console.log(event + ',' + treeId + ',' + treeNode.tId + ", " + treeNode.name + "," + treeNode.checked);
			    console.log(treeNode);
				var id = treeNode.id;//获取数据的Id
				var tName = treeNode.name;//得到选中的节点名
//				$("#jqGrid_SubjectBalance").jqGrid('setCell', rowId, 'stor_id', tName);//设置单元格的值
				$('#storChoose').modal('hide');//关闭模态框
				$('input[class=storRid' + rowId + ']').val(tName);
			}; 
			
			 $.ajax({
		            type: 'Get',
		            url: '../../json/procurement/depDataTree.json',
		            dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
		            success: function (data) {
		                $.fn.zTree.init($("#storModelTree"), setting, data);
		                var str = $('#storModelTree_1_switch').attr('class');
		                //console.log(str); //button level0 switch roots_close
		                var Class = str.replace('roots','center');
		                $('#storModelTree_1_switch').attr('class',Class);
		                
		                var zTree = $.fn.zTree.getZTreeObj("storModelTree");
		                zTree.expandAll(true);//展开全部节点
//						var node = zTree.getNodeByParam("id",12);//选中某节点
						//zTree.selectNode(node);
//						zTree.checkNode(node);
		                
		                
		            },
		            error: function (msg) {
		                alert(" 数据加载失败！" + msg);
		            }
		        });
		
			
		})

		//数量
		$(document).on('click','.numberPlus',function(e){
			var rid = $(this).data('rid');//获取选择行id
			var rowData = $("#jqGrid_SubjectBalance").jqGrid('getRowData',rid);//获取行数据
	  		$('.goodsMsg').val($(rowData.goodsName).val());
			$('.storageMsg').val($(rowData.storageId).val());
			
			var textVal = $(this).prev().val();//获取输入框的数量值
			
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
			
			
			//左移全部数据
			$(document).on('click','.glyphicon-fast-backward',function(e){
				var idsRight = $(optionsRight.TableName).jqGrid('getDataIDs');
				for(var i = 0,len = idsRight.length;i < len ;i ++){
					$(optionsRight.TableName).jqGrid('delRowData', idsRight[i]); 
				}
				var rowListNum = $(optionsRight.TableName).jqGrid('getGridParam', 'records');
				$('.selectNum').html(rowListNum);
				checkDouble();
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


		/**
		 * 单据引入
		 */
		$(document).on('click', '.billsChoose',function(e){
//	        rowId = $(this).data('rid');
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
					            height: $(window).height()*0.2,
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
					            height: $(window).height()*0.2,
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




