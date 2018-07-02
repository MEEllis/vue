		
//校验时间
	$(document).on('blur','#datetimepickerStart1,#datetimepickerEnd1',function(e){
		if(!checkT.checkTime()){  
		    $.zxsaas_plus.showalert("提示","截止日期必须晚于生效日期！");
			$(this).val('');
		    return;  
		}  
	});
	
	var tableArr = [],//表格数据
		lastrow,
		lastcell;

	
	/**
	 * 商品名称选择
	 */
	$(document).on('click', '.goodsName',function(e){
		//加载
		 var rowId = $(this).data('rid');
//		treeGoodsModal('goodsDataTree','jqGrid_goodsMsgAdd','gridpager_goods','/manager/salesCommon/getGoods',false,rowId,'/manager/salesCommon/getGoods','#jqGrid_SubjectBalance');
		treeGoodsModal('goodsDataTree','jqGrid_goodsMsgAdd','gridpager_goods','../../json/retailOrder/retailGoods.json',false,rowId,'../../json/retailOrder/goodsClazz.json','#jqGrid_SubjectBalance');
	});
	
	
	/**
	 * 表格   仓库选择
	 */
//	$(document).on('click', '.storName',function(e){
//		var rowId = $(this).data('rid');
//		stroModal('/manager/salesCommon/getSections','storModelTree',rowId);
//				
//	});		
	
	//入库成本修改
	var moneyModal = function(that){
		var flag = true;
		$('#moneyChoose').modal('show');
			$(document).on('click','.saveMoney',function(e){
				if(flag){
					if(checkT.checkNum('.moneyRk')){
						$(that).html($('.moneyRk').val());
					}
					flag = false;
				}
			});
	};
	
	//收款结算
    $('#settleBtn').click(function () {
        $('#myModal_settle').modal('show');
        //POS机
        $('#pos').focus(function () {
            $("#myModal_pos").modal('show');
        });
        //促销券
        $('#coupons').focus(function () {
            $("#myModal_coupons").modal('show');
        });
    });
	
	
		
		function loadmodal(urlData)
			{
		var options = {
		LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
		LoadTableUrl: urlData,
		TableName: "#jqGrid_SubjectBalance", //显示表格名称。遵照css选择器书写
//		pager:"#jqGridPager"
		};
		$("#datetimepickerStart").datetimepicker({
			  lang:"ch",           //语言选择中文
		      format:"Y-m-d",      //格式化日期
		      timepicker:false,    //关闭时间选项
		      todayButton:false    //关闭选择今天按钮
			});
		
			$.jgrid.defaults.width = 1280;
			$.jgrid.defaults.responsive = true;
			$.jgrid.defaults.styleUI = 'Bootstrap';	
			var lastsel='';//最后一次选中的行
			var colNames = ['操作','ID','赠品','入库仓库','商品名称','型号','颜色','串号','数量','原单单价','原单金额','第三方券','退款金额','是否分期','是否合约机','运营商业务','备注','原单据号','入库成本','gId','sttrs','是否串号管理'];
			var JqGridColModel=[
								{name:'deliveryDo',index:'deliveryDo', width:70,align:'center',formatter: addAndDelete,sortable:false},
								{name:'id',index:'id', width:200,align:'center', sorttype:'int',hidden:true,sortable:false},
								{name:'ifGift',index:'ifGift', width:80,align:'center', sorttype:'string',formatter:checkBox,sortable:false},
								{name:'storageId',index:'storageId', width:200,align:'center', sortable:false,editable: true,edittype:'select',editoptions: {value: getStorage()
									
								}},
								{name:'goodsName',index:'goodsName', width:200,align:'center', formatter:goodsModel,sortable:false},
								{name:'xh',index:'xh', sorttype:'integer', width:100,align:'center',editable:true,sortable:false},
								{name:'color',index:'color', sorttype:'integer', width:100,align:'center',editable:true,sortable:false},
								{name:'imei',index:'imei', sorttype:'integer', width:100,align:'center',editable:true,sortable:false},
								{name:'goodsNum',index:'goodsNum', width:100,align:'center',editable:true,sortable:false,formatter:"integer",editable:true,editoptions:{
									dataEvents:[{
										type:"blur",
										fn:function(e){
											var rex=/^[1-9]*$/;
											if(rex.test($(this).val())){
												$(this).parent().next().next().html(($(this).val().replace(/\,/g,'') * $(this).parent().next().html().replace(/\,/g,'')).toFixed(2))
												totalAll.totalCalc();
											}else{
												$.zxsaas_plus.showalert("提示","请输入合法数字！");
												$(this).val('');
												$(this).parent().next().html('');
											}
										}
									}]
								}},
								{name:'price',index:'price', width:100,align:'center',  sorttype:'float',formatter:"number",editable:true,editoptions:{
									dataEvents:[{
										type:"blur",
										fn:function(e){
											var rex=/^[0-9]*\.{0,1}[0-9]{0,2}$/;
											if(rex.test($(this).val())){
												$(this).parent().next().html(($(this).val().replace(/\,/g,'') * $(this).parent().prev().html().replace(/\,/g,'')).toFixed(2))
												totalAll.totalCalc();
											}else{
												$.zxsaas_plus.showalert("提示","请输入合法数字！");
												$(this).val('');
												$(this).parent().next().html('');
											}
										}
									}]
								},sortable:false},
								{name:'money',index:'money', width:100,align:'center',  sorttype:'float',formatter:"number",editable:true,sortable:false,editoptions:{
									dataEvents:[{
										type:'blur',
										fn:function(e){
											var reg=/^[0-9]*\.{0,1}[0-9]{0,2}$/;
											if(reg.test($(this).val())){
												$(this).parent().prev().html(($(this).val().replace(/\,/g,'') / $(this).parent().prev().prev().html().replace(/\,/g,'')).toFixed(2))
												totalAll.totalCalc();
											}else{
												$.zxsaas_plus.showalert("提示","请输入合法数字！");
												$(this).val('');
											}
										}
									}]
								}},
								{name:'thirdTicket',index:'thirdTicket', width:100,align:'center',  sorttype:'float',formatter:thirdTicket,sortable:false},
								{name:'amount',index:'amount', width:100,align:'center',  sorttype:'float',formatter:"number",editable:true,sortable:false,editoptions:{
									dataEvents:[{
										type:'blur',
										fn:function(e){
											var reg=/^[0-9]*\.{0,1}[0-9]{0,2}$/;
											var money = $(this).parent().prev().prev().html().replace(/\,/g,'') * 1;
											if(reg.test($(this).val()) && ($(this).val() * 1) <= money){
												totalAll.totalCalc();
											}else{
												$.zxsaas_plus.showalert("提示","请输入合法数字！");
												$(this).val('');
											}
										}
									}]
								}},
								{name:'imstallmentFlag',index:'imstallmentFlag', width:100,align:'center',  sorttype:'float',formatter:checkBoxIm,sortable:false},
								{name:'chponeFlag',index:'chponeFlag', width:100,align:'center',  sorttype:'float',formatter:checkBoxCh,sortable:false},
								{name:'businessId',index:'businessId', width:100,align:'center', sorttype:'string',editable:true,sortable:false},
								{name:'remark',index:'remark', width:100,align:'center', sorttype:'string',editable:true,sortable:false},
								{name:'retailDetailId',index:'retailDetailId', width:100,align:'center', sorttype:'string',formatter:yinru,sortable:false},
								{name:'costMoney',index:'costMoney', width:100,align:'center', sorttype:'string',sortable:false},
								{name:'goodsId',index:'goodsId', width:200,align:'center', sorttype:'string',hidden:true,sortable:false},
								{name:'attrs',index:'attrs', width:200,align:'center', sorttype:'string',hidden:true},
								{name:'ifManageImei',index:'ifManageImei', width:200,align:'center', sorttype:'string',hidden:true,sortable:false}
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
			            rownumbers:true,
			            cellsubmit: 'clientArray',//单元格保存内容的位置		
			            editurl: 'clientArray',
			            rowNum: 15,
			            rowList: [10, 15, 20, 25, 40],
			            pager:options.pager,
			            viewrecords: true,		           
//			            multiselect:true,
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
						beforeEditCell:function(rowid,cellname,v,iRow,iCol){
								lastrow = iRow;
								lastcell = iCol;
						},
						onCellSelect:function(id,index,e){
							var colName=$(options.TableName).jqGrid('getGridParam','colModel')[index].name 
					      	select_name=colName
					      	select_index=index;
					      	console.log('select');
					      	var imei = $(options.TableName).jqGrid('getCell',id,'ifManageImei');
					      	if(imei == 1){
					      		$(options.TableName).setColProp('goodsNum',{editable:false});
					      	}else{
					      		$(options.TableName).setColProp('goodsNum',{editable:true});
					      	}
					      	
						},
						gridComplete: function() {
							console.log(arguments);
							var ids=$(options.TableName).jqGrid("getDataIDs");
//							
						},
						loadComplete:function(){
							console.log(arguments);
							
							for(var j = 0,len = arguments[0].rows.length;j < len;j ++){
								chengben(j+1,arguments[0].rows[j].costMoney);
							}
							
							var arr = document.querySelectorAll('.goodsName');
							for(var i = 0,len = arr.length;i < len;i ++){
								(arr[i].dataset.rid == '') && (arr[i].className = 'goodsName');
								(arr[i].dataset.rid == '') && (arr[i].dataset.target = '');
							}
							$('.goodsRid').attr('readonly',true);
							$('.numberRid').attr('readonly',true).removeAttr('id');
							
							totalAll.totalCalc();
							
							$('.footrow td:first-child').html('合计');
							
						},
						loadError:function(xhr,status,error){
							
						}
						})
			}
			
			//获取仓库名称
			function getStorage(){
				var countries = {};
				$.ajax({  
				 	url: '../../json/retailOrder/getUnitSelect.json',//请求路径  
				 	async: false,  
				 	success: function(data) {   
				 		for(var i = 0,len = data.countries.length;i < len;i ++){
				 			countries[data.countries[i].tId] = data.countries[i].tName;
				 		}
				 	},
				 	error:function(){
				 		
				 	}
				 	});
				return countries;
			};
			
//			//列表复选框
			function checkBox(cellvalue, options, rowObjec)
			{
				//   0   非赠品
				//   1   赠品
				var str = '';
				if(cellvalue == '0'){
					str = '<input type="checkbox" class="del giftFlag' + options.rowId + '" data-flag="' + rowObjec.ifFlag + '"  data-id="' + options.rowId + '" />';
				}else{
					str = '<input type="checkbox" checked class="del giftFlag' + options.rowId + '" data-flag="' + rowObjec.ifFlag + '"  data-id="' + options.rowId + '" />';
				};
				return str;
			}
			
			$(document).on('click','.del',function(e){
				if($(this).is(':checked')){
					$(this).data('giftFlag',1);
				}else{
					$(this).data('giftFlag',0)
				}
//				($(this).is(':checked')) ? $(this).data('giftFlag',1) : $(this).data('giftFlag',0)
			});
			
			//列表复选框  是否分期
			function checkBoxIm(cellvalue, options, rowObjec)
			{
				//   0   非赠品
				//   1   赠品
				var str = '';
				if(cellvalue == '0'){
					str = '<input type="checkbox" class="del imstallmentFlag' + options.rowId + '" data-flag="' + rowObjec.imstallmentFlag + '"  data-id="' + options.rowId + '" />';
				}else{
					str = '<input type="checkbox" checked class="del imstallmentFlag' + options.rowId + '" data-flag="' + rowObjec.imstallmentFlag + '"  data-id="' + options.rowId + '" />';
				};
				return str;
			}
			
			//列表复选框  是否合约机
			function checkBoxCh(cellvalue, options, rowObjec)
			{
				//   0   非赠品
				//   1   赠品
				var str = '';
				if(cellvalue == '0'){
					str = '<input type="checkbox" class="del chponeFlag' + options.rowId + '" data-flag="' + rowObjec.chponeFlag + '"  data-id="' + options.rowId + '" />';
				}else{
					str = '<input type="checkbox" checked class="del chponeFlag' + options.rowId + '" data-flag="' + rowObjec.chponeFlag + '"  data-id="' + options.rowId + '" />';
				};
				return str;
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
				var addAndDel = '<div class="operating" data-id="' + options.rowId + '" data-gId="' + rowObjec.goodsId + '"><span style="margin-right:0.7rem" id="remove_row" title="添加" class="glyphicon glyphicon-plus addRow"></span><span class="glyphicon glyphicon-trash trashMain" aria-hidden="true" id="add_row" title="删除行"></span></div>';
				return addAndDel;
			}
			
			//新增一行
			$(document).on('click', '.addRow',function(e){
				var thisTitle = $(this).attr("title");
				var rowId = $(this).parent().data('id');
				
				var ids = $(options.TableName).jqGrid('getDataIDs');
				//获得当前最大行号（数据编号）
				var maxid;
				maxid = (ids.length ==0 ) ? 0 : Math.max.apply(Math,ids);
				//当用户点击表格最后一行时,自动增加一行
				(rowId == maxid && rowId != 1) && $(options.TableName).jqGrid('addRowData', maxid+1, {}, 'last' )
				$('.goodsRid'+(maxid+1)).val('');
				$('.t'+(maxid+1)).html(0);
				$('.y'+(maxid+1)).html(0);
				chengben(maxid+1,'');
			});
			
			//删除一行
			$(document).on('click', '.trashMain',function(e){
				var thisTitle = $(this).attr("title");
				var rowId = $(this).parent().data('id');
				if(thisTitle == "删除行"){
					console.log('条数:' + $('#jqGrid_SubjectBalance tbody tr').length);
					if($('#jqGrid_SubjectBalance tbody tr').length === 2) {
						$.zxsaas_plus.showalert("错误","至少保留一条数据!")
						return false;
					}
					$.zxsaas_plus.showconfirm("","是否确定删除本行?",function(){
						var rData = $(options.TableName).jqGrid('getRowData',rowId);
						if(rData.goodsId != ''){
							tableArr.push({'id':rData.id,'operationFlag':3});
						}
						$(options.TableName).jqGrid('delRowData', rowId);
						totalAll.totalCalc();
					},function(){
						
					});

				}
			});
			
			//列表    第三方券
			function thirdTicket(cellvalue, options, rowObjec)
			{
				console.log(options + ';;;;;');
				return '<span class="third t' + options.rowId + '" data-id="' + rowObjec.id + '" data-rId="' + options.rowId + '" onclick="loadmodalThird(this)" style="color:#00CCFF;cursor:pointer">' + cellvalue + '</span>';
			}
			
			//列表    原单引入
			function yinru(cellvalue, options, rowObjec)
			{
				return '<span class="yinru y' + options.rowId + '" data-id="' + rowObjec.id + '" data-rId="' + options.rowId + '" style="color:#00CCFF;cursor:pointer" onclick="">' + cellvalue + '</span>';
			}
			//列表    入库成本
			function chengben(rId, costMoney)
			{
                if(costMoney == ''){
                	$('#jqGrid_SubjectBalance').find('#'+rId).find("td:eq(19)").attr({'onclick':'moneyModal(this)',"data-rId":rId,'class':'cheng'});
//              	$(rowObjec.costMoney).attr({"data-toggle":"modal","data-target":"#moneyChoose","data-rId":options.rowId});
                }
				return costMoney;
			}
//			"data-toggle":"modal","data-target":"#moneyChoose"
			
			//商品名称修改
			function goodsModel(cellvalue, options, rowObject){
				return '<input type="text" class="goodsRid' + options.rowId +'" style="border:0;text-align:center;width:170px" value="' + cellvalue +'" /><span class="goodsName glyphicon glyphicon-plus" data-toggle="modal" data-target="#goodsChoose" data-rId="' + options.rowId +'"></span>';
				
			};
			
			//数字列检测
			$(document).on('blur','#checkNum',function(e){
				var value = $(this).val();
				var reg = /^[0-9]*[1-9][0-9]*$/;
				if(reg.test(value)){
					var $temp = $(this).parent().next().html().indexOf("<") == -1 ? $(this).parent().next().html().replace(/\,/g,'') : $(this).parent().next().find('input').val().replace(/\,/g,'');
					$(this).parent().next().next().html(($(this).val() * $temp).toFixed(2));
					
					totalAll.totalCalc();
					
				}else{
					$.zxsaas_plus.showalert("提示","请输入合法数字！");
					$(this).val('');
					$(this).parent().next().next().html('');
				}
			});
			
			
			
			//检测输入的是否为数字
			function checkNumber(value, colname) {
//				console.log(arguments);
				var reg = /^[1-9]\d*$/;
				var arr = [];
				arr = (!reg.test(value)) ? ([false,'请输入数字']) : ([true,""])
//				   return value.replace(/[^\d]$/g,'')
				return arr;
			}
			
}
			
	//总计
	var totalAll = {
		totalCalc:function(){//入库总计
			 $("#jqGrid_SubjectBalance").jqGrid("saveCell",lastrow,lastcell);
			var idsLeft = $('#jqGrid_SubjectBalance').jqGrid('getDataIDs');
			var sumNumber = 0;//数量
			var sumMoney = 0,//退款金额
				thirdTicket = 0,//第三方券
				price = 0,//单价
				total = 0;//原单金额
			for(var i = 0,len = idsLeft.length;i < len ;i ++){
				var rowsData = $('#jqGrid_SubjectBalance').jqGrid('getRowData',idsLeft[i])
				sumMoney += ((rowsData.amount) * 1);
				thirdTicket += ($(rowsData.thirdTicket).html() * 1);
				sumNumber += (rowsData.goodsNum * 1);
				total += (rowsData.money * 1);
			}
			$('#gview_jqGrid_SubjectBalance .ui-jqgrid-sdiv').children().children().children().children().eq(0).children().eq(13).html(sumMoney);
			$('#gview_jqGrid_SubjectBalance .ui-jqgrid-sdiv').children().children().children().children().eq(0).children().eq(12).html(thirdTicket);
			$('#gview_jqGrid_SubjectBalance .ui-jqgrid-sdiv').children().children().children().children().eq(0).children().eq(11).html(total);
			$('#gview_jqGrid_SubjectBalance .ui-jqgrid-sdiv').children().children().children().children().eq(0).children().eq(9).html(sumNumber);
		}
	};
		
			
	/**
	 * 第三方券
	 */
	var loadmodalThird = function(that)
			{
				console.log(that);
		$('#thirdChoose').modal('show');
		var options = {
		LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
		LoadTableUrl: '../../json/retailOrder/third.json',
		TableName: "#jqGrid_Third", //显示表格名称。遵照css选择器书写
		};
		
			$.jgrid.defaults.width = 1280;
			$.jgrid.defaults.responsive = true;
			$.jgrid.defaults.styleUI = 'Bootstrap';	
			var lastsel='';//最后一次选中的行
			var colNames = ['操作','ID','往来单位','券名称','抵现金额','券编号','备注'];
			var JqGridColModel=[
								{name:'deliveryDo',index:'deliveryDo', width:70,align:'center',formatter: addAndDelete,sortable:false},
								{name:'id',index:'id', width:200,align:'center', sorttype:'int',hidden:true,sortable:false},
								{name:'unit',index:'unit', width:100,align:'center', sorttype:'string',sortable:false},
								{name:'ticketName',index:'ticketName', width:100,align:'center',sortable:false, editable: true,edittype:'select',editoptions: {value: gettypes()
									,dataEvents:[{
										type:"change",
										fn:function(e){
											//checkbox值改变时，查找相关联的往来单位
											console.log('checkbox值为:' + this.value);
											$.ajax({
												url:'',
												async: false,
					                            cache: false,
					                            dataType: "json",
				                               	data:{
				                                    actiontype:this.value  //传入值，到后台获取json
				                                },
				                                success:function(data){
				                                	if(data != ''){
				                                		$(this).prev().html(data);
				                                	}
				                                }
											});
										}
									}]
								}},
								{name:'money',index:'price', width:100,align:'center',  sorttype:'float',formatter:"number",editable:true,editoptions:{
									dataEvents:[{
										type:"blur",
										fn:function(e){
											var rex=/^[0-9]*\.{0,1}[0-9]{0,2}$/;
											if(!rex.test($(this).val())){
												$.zxsaas_plus.showalert("提示","请输入合法数字！");
												$(this).val('');
											}
										}
									}]
								},sortable:false},
								{name:'ticketNo',index:'ticketNo', width:100,align:'center',  sorttype:'string',editable:true,sortable:false},
								{name:'remark',index:'remark', width:150,align:'center', sorttype:'string',editable:true,sortable:false}
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
			            rownumbers:true,
			            cellsubmit: 'clientArray',//单元格保存内容的位置		
			            editurl: 'clientArray',
			            pager:options.pager,
			            viewrecords: true,		           
			           	cellEdit:true,
			            width: "100%" ,
			            height: $(window).height()*0.45,
						autowidth:true,
						rownumWidth: 35, // the width of the row numbers columns
						shrinkToFit:false,  //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
						footerrow:false,  //设置表格显示表脚
						userDataOnFooter:false,//设置userData 显示在footer里
						onCellSelect:function(id,index,e){
							var colName=$(options.TableName).jqGrid('getGridParam','colModel')[index].name 
					      	select_name=colName
					      	select_index=index;
						},
						beforeEditCell:function(rowid,cellname,v,iRow,iCol){
								lastrow = iRow;
								lastcell = iCol;
						},
						gridComplete: function() {
							var ids=$(options.TableName).jqGrid("getDataIDs");
//							
						},
						loadComplete:function(){
							console.log(arguments);
							
						}
						})
			}
			//获取券名称
			function gettypes(){
				var countries = {};
				$.ajax({  
				 	url: '../../json/retailOrder/getUnitSelect.json',//请求路径  
				 	async: false,  
				 	success: function(data) {   
				 		for(var i = 0,len = data.countries.length;i < len;i ++){
				 			countries[data.countries[i].tId] = data.countries[i].tName;
				 		}
				 	},
				 	error:function(){
				 		
				 	}
				 	});
				return countries;
			};
			
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
				var addAndDel = '<div class="operating" data-id="' + options.rowId + '" data-gId="' + rowObjec.goodsId + '"><span style="margin-right:0.7rem" id="remove_row" title="添加" class="glyphicon glyphicon-plus addThird"></span><span class="glyphicon glyphicon-trash trashThird" aria-hidden="true" id="add_row" title="删除行"></span></div>';
				return addAndDel;
			}
			
			//新增一行
			$(document).on('click', '.addThird',function(e){
				var thisTitle = $(this).attr("title");
				var rowId = $(this).parent().data('id');
				
				var ids = $('#jqGrid_Third').jqGrid('getDataIDs');
				//获得当前最大行号（数据编号）
				var maxid;
				maxid = (ids.length ==0 ) ? 0 : Math.max.apply(Math,ids);
				//当用户点击表格最后一行时,自动增加一行
				(rowId == maxid && rowId != 1) && $('#jqGrid_Third').jqGrid('addRowData', maxid+1, {}, 'last' )
				
			});
			
			//删除一行
			$(document).on('click', '.trashThird',function(e){
				var thisTitle = $(this).attr("title");
				var rowId = $(this).parent().data('id');
				if(thisTitle == "删除行"){
					console.log('条数:' + $('#jqGrid_Third tbody tr').length);
					if($('#jqGrid_Third tbody tr').length === 2) {
						$.zxsaas_plus.showalert("错误","至少保留一条数据!")
						return false;
					}
					$.zxsaas_plus.showconfirm("","是否确定删除本行?",function(){
						var rData = $('#jqGrid_Third').jqGrid('getRowData',rowId);
//						if(rData.goodsId != ''){
//							tableArr.push({'id':rData.id,'operationFlag':3});
//						}
						$(options.TableName).jqGrid('delRowData', rowId);
						$.zxsaas_plus.showalert("提示","删除成功!")
					},function(){
						
					});

				}
			});
			
			//总计
			$(document).on('click','.saveMoney',function(e){
				lastrow != undefined && $(options.TableName).jqGrid("saveCell",lastrow,lastcell);
				var idsLeft = $(options.TableName).jqGrid('getDataIDs');
				var sumMoney = 0;
				for(var i = 0,len = idsLeft.length;i < len ;i ++){
					var rowsData = $(options.TableName).jqGrid('getRowData',idsLeft[i])
					sumMoney += ((rowsData.money) * 1);
				}
				$(that).html(sumMoney);
				that = '';
				totalAll.totalCalc();
			});
}	
	//增值服务详情
	$(document).on('click','.seeDetail',function(e){
		$('#serveDetail').modal('show');
		loadmodalServe('../../json/retailOrder/serve.json','#jqGrid_serveDetail',false);
	});

//	增值服务
	function loadmodalServe(urlData,tName,flag)
			{
		var options = {
		LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
		LoadTableUrl: urlData,
		TableName: tName, //显示表格名称。遵照css选择器书写
		};
		
			$.jgrid.defaults.width = 1280;
			$.jgrid.defaults.responsive = true;
			$.jgrid.defaults.styleUI = 'Bootstrap';	
			var lastsel='';//最后一次选中的行
			var colNames = [];
			var JqGridColModel = [];
			var colNamesDetail = ['操作','ID','增值服务名称','生效日期','关联序号','有效期限','效期内使用次数','商品编码','商品名称','颜色','型号','手机串号','会员卡号','零售单号','预设售价','会员价','实际收款','备注','服务流水号'];
			var JqGridColModelDetail=[
								{name:'deliveryDo',index:'deliveryDo', width:70,align:'center',formatter: addAndDelete,sortable:false},
								{name:'id',index:'id', width:200,align:'center', sorttype:'int',hidden:true,sortable:false},
								{name:'serveName',index:'serveName', width:100,align:'center', sorttype:'string',sortable:false},
								{name:'startTime',index:'startTime', width:100,align:'center', sortable:false,editable: true,editoptions:{
					                dataInit:function(e){
					                    $(e).datetimepicker({
										  lang:"ch",          
									      format:"Y-m-d",      
									      timepicker:false,    
									      todayButton:false    
										});
					                }
					            }},
								{name:'conNo',index:'conNo', width:100,align:'center',sortable:false},
								{name:'endTime',index:'endTime', sorttype:'integer', width:100,align:'center',editable:true,sortable:false,editoptions:{
					                dataInit:function(e){
					                    $(e).datetimepicker({
										  lang:"ch",      
									      format:"Y-m-d", 
									      timepicker:false,
									      todayButton:false 
										});
					                }
					            }},
								{name:'times',index:'times', sorttype:'integer', width:100,align:'center',editable:true,sortable:false},
								{name:'goodsNo',index:'goodsNo', sorttype:'integer', width:100,align:'center',editable:true,sortable:false},
								{name:'goodsName',index:'goodsName', width:100,align:'center',editable:true,sortable:false},
								{name:'color',index:'color', width:60,align:'center',  sorttype:'string',sortable:false},
								{name:'model',index:'model', width:80,align:'center',  sorttype:'string',sortable:false},
								{name:'imei',index:'imei', width:100,align:'center',  sorttype:'string',sortable:false},
								{name:'card',index:'card', width:100,align:'center',  sorttype:'string',sortable:false},
								{name:'orderId',index:'orderId', width:100,align:'center',  sorttype:'string',sortable:false},
								{name:'defaultPrice',index:'defaultPrice', width:100,align:'center',  sorttype:'number',sortable:false},
								{name:'vipPrice',index:'vipPrice', width:100,align:'center',  sorttype:'number',sortable:false},
								{name:'practicalMoney',index:'practicalMoney', width:100,align:'center',  sorttype:'float',formatter:"number",editable:true,sortable:false},
								{name:'remark',index:'remark', width:100,align:'center', sorttype:'string',editable:true,sortable:false},
								{name:'serialNumber',index:'serialNumber', width:100,align:'center', sorttype:'string',sortable:false}
			                ];
			var colNamesJ = ['操作','ID','服务名称','关联序号','关联会员卡号','实际收款','应付金额','备注','关联原单明细'];
			var JqGridColModelJ=[
								{name:'deliveryDo',index:'deliveryDo', width:70,align:'center',formatter: addAndDelete,sortable:false},
								{name:'id',index:'id', width:200,align:'center', sorttype:'int',hidden:true,sortable:false},
								{name:'serveName',index:'serveName', width:80,align:'center', sorttype:'string',sortable:false},
								{name:'conNo',index:'conNo', width:200,align:'center',sortable:false},
								{name:'card',index:'card', width:100,align:'center',  sorttype:'string',sortable:false},
								{name:'practicalMoney',index:'practicalMoney', width:100,align:'center',  sorttype:'float',formatter:"number",editable:true,sortable:false},
								{name:'handleMoney',index:'handleMoney', width:100,align:'center',  sorttype:'float',formatter:"number",sortable:false},
								{name:'remark',index:'remark', width:100,align:'center', sorttype:'string',editable:true,sortable:false},
								{name:'serialNumber',index:'serialNumber', width:100,align:'center', sorttype:'string',sortable:false}
			                ];
			if(flag){
				colNames = colNamesJ;
				JqGridColModel = JqGridColModelJ;
			}else{
				colNames = colNamesDetail;
				JqGridColModel = JqGridColModelDetail;
			}
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
			            rownumbers:true,
			            cellsubmit: 'clientArray',//单元格保存内容的位置		
			            editurl: 'clientArray',
			            rowNum: 15,
			            rowList: [10, 15, 20, 25, 40],
			            pager:options.pager,
			            viewrecords: true,		           
//			            multiselect:true,
			           	cellEdit:true,
			            width: "100%" ,
			            height: $(window).height()*0.25,
						autowidth:true,
						rownumWidth: 35, // the width of the row numbers columns
						shrinkToFit:false,  //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
						footerrow:true,  //设置表格显示表脚
						userDataOnFooter:true,//设置userData 显示在footer里
						beforeEditCell:function(rowid,cellname,v,iRow,iCol){
								lastrow = iRow;
								lastcell = iCol;
						},
						onCellSelect:function(id,index,e){
							var colName=$(options.TableName).jqGrid('getGridParam','colModel')[index].name 
					      	select_name=colName
					      	select_index=index;
					      	
						},
						gridComplete: function() {
							console.log(arguments);
							var ids=$(options.TableName).jqGrid("getDataIDs");
//							
						},
						loadComplete:function(){
							console.log(arguments);
							
							var arr = document.querySelectorAll('.goodsName');
							for(var i = 0,len = arr.length;i < len;i ++){
								(arr[i].dataset.rid == '') && (arr[i].className = 'goodsName');
								(arr[i].dataset.rid == '') && (arr[i].dataset.target = '');
							}
							$('.goodsRid').attr('readonly',true);
							$('.numberRid').attr('readonly',true).removeAttr('id');
							
							totalAll.totalCalc();
							
							$('.footrow td:first-child').html('合计');
							
						},
						loadError:function(xhr,status,error){
							
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
				var addAndDel = '<div class="operating" data-id="' + options.rowId + '" data-gId="' + rowObjec.goodsId + '"><span style="margin-right:0.7rem" id="remove_row" title="添加" class="glyphicon glyphicon-plus addRowServe"></span><span class="glyphicon glyphicon-trash trashServe" aria-hidden="true" id="add_row" title="删除行"></span></div>';
				return addAndDel;
			}
			
			//新增一行
			$(document).on('click', '.addRowServe',function(e){
				var thisTitle = $(this).attr("title");
				var rowId = $(this).parent().data('id');
				
				var ids = $(options.TableName).jqGrid('getDataIDs');
				//获得当前最大行号（数据编号）
				var maxid;
				maxid = (ids.length ==0 ) ? 0 : Math.max.apply(Math,ids);
				//当用户点击表格最后一行时,自动增加一行
				(rowId == maxid && rowId != 1) && $(options.TableName).jqGrid('addRowData', maxid+1, {}, 'last' )
				$('.goodsRid'+(maxid+1)).val('');
				$('.t'+(maxid+1)).html(0);
				$('.y'+(maxid+1)).html(0);
			});
			
			//删除一行
			$(document).on('click', '.trashServe',function(e){
				var thisTitle = $(this).attr("title");
				var rowId = $(this).parent().data('id');
				if(thisTitle == "删除行"){
					console.log('条数:' + $(options.TableName+' tbody tr').length);
					if($(options.TableName+' tbody tr').length === 2) {
						$.zxsaas_plus.showalert("错误","至少保留一条数据!")
						return false;
					}
					$.zxsaas_plus.showconfirm("","是否确定删除本行?",function(){
						var rData = $(options.TableName).jqGrid('getRowData',rowId);
//						if(rData.goodsId != ''){
//							tableArr.push({'id':rData.id,'operationFlag':3});
//						}
						$(options.TableName).jqGrid('delRowData', rowId);
					},function(){
						
					});

				}
			});
			
			//检测输入的是否为数字
			function checkNumber(value, colname) {
//				console.log(arguments);
				var reg = /^[1-9]\d*$/;
				var arr = [];
				arr = (!reg.test(value)) ? ([false,'请输入数字']) : ([true,""])
//				   return value.replace(/[^\d]$/g,'')
				return arr;
			}
			
}
			


