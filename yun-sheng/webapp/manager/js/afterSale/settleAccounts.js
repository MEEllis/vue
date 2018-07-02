$(function(){
	initDepositGrid();
});

//重新结算按钮单击事件
//$(".cancelsaveData").click(function(){
//	
//	
//});

$("#datetimepickerStart1").datetimepicker({
	  lang:"ch",           //语言选择中文
    format:"Y-m-d",      //格式化日期
    timepicker:false,    //关闭时间选项
    todayButton:false,    //关闭选择今天按钮
    maxDate:new Date(),
//    minDate:new Date(parseInt(new Date().setDate(1))).toLocaleString(),
//    value:new Date(parseInt(new Date().setDate(1))).toLocaleString()
	}).on('blur',function(ev){
		tableInput.checkTime('#datetimepickerStart1','#datetimepickerStart1','#datetimepickerStart2');
	});
$("#datetimepickerStart2").datetimepicker({
	  lang:"ch",           //语言选择中文
    format:"Y-m-d",      //格式化日期
    timepicker:false,    //关闭时间选项
    todayButton:false ,   //关闭选择今天按钮
    maxDate:new Date(),
//    minDate:new Date(parseInt(new Date().setDate(1))).toLocaleString(),
//    value:new Date()
	}).on('blur',function(ev){
		tableInput.checkTime('#datetimepickerStart2','#datetimepickerStart1','#datetimepickerStart2');
	});

function showPaymentModal(){
	if($(".repairName").val()==""){
		$.zxsaas_plus.showalert("提示","请先选择维修部门!");
		return;
	}
	reloadDepositGrid(repairSectionId);
	depositGridFootData();
	$("#depositModal").modal("show");
}

//保存 提交结算
$(document).on('click','.saveData',function(){
	
	$("#settleVer").data('bootstrapValidator').validate();
	if(!($("#settleVer").data('bootstrapValidator').isValid())){
		refreshValidator("#settleVer");
		return;
	}
	var rowIds =$('#jqGrid_settleAccounts').jqGrid('getGridParam','selarrrow')
	
	if(!rowIds.length){
		$.zxsaas_plus.showalert("提示","请先选择一条数据！");
		return
	}
	
	if(!repairSectionId){
		$.zxsaas_plus.showalert("提示","请先选择维修部门！");
		return
	}
	
	if($("#jqGrid_settleAccounts").jqGrid('getRowData', rowIds).settleFlag=='1'){
		$.zxsaas_plus.showalert("提示","该商品已经结算");
		return
	}
	
	var param={};
//	param.repairSectionId=repairSectionId;
	$.extend(param,$("#jqGrid_settleAccounts").jqGrid('getRowData', rowIds));
	delete param.valueAddList;
	delete param.auxiliaryImei;
	delete param.imei;
	param.id=param.takeSettleId;
	param.deleveryType=deleveryType;
	$.extend(param,$('#settleVer').toJsonObject());
	//服务实列
	console.info(param.serviceRepairRelId);
	var serviceRepairRel={};
	serviceRepairRel.section=param.repairSectionId;
	serviceRepairRel.chargeType=param.handleModel;
	serviceRepairRel.serviceId=$("#serviceId").val();
	serviceRepairRel.flowNo=param.flowNo;
	serviceRepairRel.id=param.serviceRepairRelId;
	serviceRepairRel.amount=$("#amount").val().replace(/\,/g, "");
	param.serviceRepairRel=serviceRepairRel;
	console.info(serviceRepairRel);
	delete param.rad;
	param.selfTakeFlag=selfTakeFlag;
	param.returnSpareFlag=returnSpareFlag;
	if($(".YFhideIn4").val()!=""){
		var payreceiptMainDraft={};
		payreceiptMainDraft.sectionId=param.repairSectionId;
		payreceiptMainDraft.type=19;
		payreceiptMainDraft.summary="1";
		payreceiptMainDraft.billsPrefixCode="SKD";
		payreceiptMainDraft.ratio=1;
		payreceiptMainDraft.refMainTable=param.sourceTabName;
		payreceiptMainDraft.billsId=param.sourceTabId;
		payreceiptMainDraft.contactsunitId=param.contactunitId;
		payreceiptMainDraft.amount=$(".YFhideIn4").val().replace(/\,/g, "");
		param.payreceiptMainDraft=payreceiptMainDraft;
		//收付款明细表数据
		var payreceiptDetailDraftList =new Array();
		var detailDepositIds=$("#depositModalGrid").getDataIDs();
		$.each(detailDepositIds, function (i,value) {
			var row = $("#depositModalGrid").jqGrid('getRowData', value );
			if(row.payreceiptAmout!="0.00"){
				delete row["id"];
				delete row["accountTypeName"];
				delete row["accountName"];
				payreceiptDetailDraftList.push(row);
			 }
		 });
		param.payreceiptDetailDraftList=payreceiptDetailDraftList;
	}
	$.request({  
	 	url: '/manager/afterSalesService/takeMachine/saveSettleAccount',//请求路径  
	 	dataType:'json',
	 	contentType:'application/json;charset=utf-8',
	 	data:JSON.stringify(param),
	 	type:'POST',
	 	success: function(data) {   
			if(data.result == 1){
				$("#settleVer").data('bootstrapValidator').destroy()
				getTableData();
				selfTakeFlag=1
				$('#settleVer')[0].reset();
				$('.zengzhi2').val('');
				$('#serviceId').html('');
				$('.fuwufeiyong').val('');
				$.zxsaas_plus.showalert("提示","结算成功!");
				setTimeout(clearPage,3000);
			}else{
				$.zxsaas_plus.showalert("错误",data.desc)
			}
			
	 	},
	 	error:function(){
	 		 ($.zxsaas_plus.showalert("","错误!"))
	 	}
 	});
});

function clearPage(){
	window.location.href="/manager/afterSalesService/takeMachine/page";
}


var	lastrow = "";
var lastcell = "";
var handlemode ="";
var lastSel="";
var isSettleAccount,payreceiptMainId;
function loadmodal(options){
	
	//初始化参数
	var colName = [];
	//主表，取机结算，不可增加
	var colName0 =['id','业务流水号','商品名称','型号','原颜色','新颜色','原主串号','新主串号',
	               '原辅串号','新辅串号','原外观描述','是否借出备用机','是否返修机','备注','结算状态','技术员','服务类型','商品id','处理方式','服务类型ID','客户id',
	               'custom','valueAddList','totalAmount','telephone','address','prePayment','deposit','repairStatus','sourceTabId','sourceTabName',
	               'contactunitId','处理方式','收付款主表id','repairSectionId','amount','fwFee','serviceRepairRelId','takeSettleId'];
	colName[0] = colName0;
	//主表下的选项卡表 ，维修项目，不可增加
	var colName1 =['id','项目编号','项目名称','实际收费','增值服务','增值服务抵减','备注','增值id'];
	colName[1] = colName1;
	//选项卡表，更换备件 ，可增加
	var colName2 =['id','仓库','配件编码','配件名称','增/换','数量','单价','金额','增值服务','增值服务抵减','型号','品牌','原颜色','新颜色','原主串号','新主串号','原辅串号','新辅串号','备注','增值id'];
	colName[2] = colName2;
	
	var JqGridColModel = [];
	var JqGridColModel0 =[
	                   {name:'id',index:'id',width:70,align:'center',hidden:true},
	                   {name:'flowNo',index:'flowNo', width:200,align:'center',sorttype:'string',sortable:false},
	                   {name:'goodsName',index:'goodsName', width:150,align:'center',sorttype:'string',sortable:false},
	                   {name:'goodsModel',index:'goodsModel', width:100,align:'center',sorttype:'string',sortable:false},
	                   {name:'oldColor',index:'oldColor', width:100,align:'center',sorttype:'string',sortable:false},
	                   {name:'newColor',index:'newColor', width:100,align:'center',sorttype:'string',sortable:false},
	                   {name:'oldImeiStr',index:'imei', width:150,align:'center',sorttype:'string',sortable:false},
	                   {name:'newImeiStr',index:'newImei', width:150,align:'center',sorttype:'string',sortable:false},
	                   {name:'oldAuxiliaryImei',index:'auxiliaryImei', width:150,align:'center',sorttype:'string',sortable:false},
	                   {name:'newAuxiliaryImei',index:'newAuxiliaryImei', width:150,align:'center',sorttype:'string',sortable:false},
	                   {name:'oldLooksDesc',index:'oldLooksDesc', width:150,align:'center',sorttype:'string',sortable:false},
	                   {name:'borrowSpareFlag',index:'borrowSpareFlag', width:150,align:'center',sorttype:'string',sortable:false,formatter:'select',editoptions:{value:"1:是;0:否"}},
	                   {name:'returnFlag',index:'returnFlag', width:100,align:'center',sorttype:'string',sortable:false,formatter:'select',editoptions:{value:"1:是;0:否"}},
	                   {name:'remark',index:'remark', width:100,align:'center',sorttype:'string',sortable:false},
	                   {name:'settleFlag',index:'settleFlag', width:100,align:'center',sorttype:'string',sortable:false,formatter:'select',editoptions:{value:"1:已结算;0:未结算"}},
	                   {name:'technicianName',index:'technicianName', width:100,align:'center',sorttype:'string',sortable:false},
	                   {name:'serviceType',index:'serviceType', width:100,align:'center',sorttype:'string',sortable:false,formatter:'select',editoptions:{value:"1:售后;2:售前"}},
	                   
	                   {name:'goodsId',index:'goodsId', width:150,align:'center',sorttype:'string',sortable:false,hidden:true},
	                   {name:'handleModel',index:'handleModel', width:100,align:'center',sorttype:'string',sortable:false,hidden:true},
	                   {name:'serviceId',index:'serviceId', width:100,align:'center',sorttype:'string',sortable:false,hidden:true},
	                   {name:'technicianId',index:'technicianId', width:100,align:'center',sorttype:'string',sortable:false,hidden:true},
	                   {name:'custom',index:'custom', width:100,align:'center',sorttype:'string',sortable:false,hidden:true},
	                   {name:'valueAddList',index:'valueAddList', width:100,align:'center',sorttype:'string',sortable:false,hidden:true,
	                	   	formatter: function (cellvalue, options, rowObject) {
                      			return JSON.stringify(cellvalue)
                  			}
	                   },
	                   
	                   {name:'totalAmount',index:'totalAmount', width:100,align:'center',sorttype:'string',sortable:false,hidden:true},
	                   {name:'telephone',index:'telephone', width:100,align:'center',sorttype:'string',sortable:false,hidden:true},
	                   {name:'address',index:'address', width:100,align:'center',sorttype:'string',sortable:false,hidden:true},
	                   {name:'prePayment',index:'prePayment', width:100,align:'center',sorttype:'string',sortable:false,hidden:true},
	                   {name:'deposit',index:'deposit', width:100,align:'center',sorttype:'string',sortable:false,hidden:true},
	                   {name:'repairStatus',index:'repairStatus', width:100,align:'center',sorttype:'string',sortable:false,hidden:true},
	                   
	                   {name:'sourceTabId',index:'sourceTabId', width:100,align:'center',sorttype:'string',sortable:false,hidden:true},
	                   {name:'sourceTabName',index:'sourceTabName', width:100,align:'center',sorttype:'string',sortable:false,hidden:true},
	                   {name:'contactunitId',index:'contactunitId', width:100,align:'center',sorttype:'string',sortable:false,hidden:true},
	                   {name:'handleModel',index:'handleModel', width:100,align:'center',sorttype:'string',sortable:false,hidden:true},
	                   {name:'payreceiptId',index:'payreceiptId', width:100,align:'center',sorttype:'string',sortable:false,hidden:true},
	                   {name:'repairSectionId',index:'repairSectionId', width:100,align:'center',sorttype:'string',sortable:false,hidden:true},
	                   {name:'amount',index:'amount', width:100,align:'center',sorttype:'string',sortable:false,hidden:true},
	                   {name:'fwFee',index:'fwFee', width:100,align:'center',sorttype:'string',sortable:false,hidden:true},
	                   {name:'serviceRepairRelId',index:'serviceRepairRelId', width:100,align:'center',sorttype:'string',sortable:false,hidden:true},
	                   {name:'takeSettleId',index:'takeSettleId', width:100,align:'center',sorttype:'string',sortable:false,hidden:true}
//	                   {name:'repairSectionId',index:'repairSectionId', width:100,align:'center',sorttype:'string',sortable:false,hidden:true}
	                   ];
	JqGridColModel[0]=JqGridColModel0;
	
	var JqGridColModel1 =[
		                   {name:'id',index:'id',width:70,align:'center',hidden:true},
		                   {name:'code',index:'code', width:150,align:'center',sorttype:'string',sortable:false},
		                   {name:'name',index:'name', width:150,align:'center',sorttype:'string',sortable:false},
		                   {name:'actualAmount',index:'actualAmount', width:100,align:'center',sorttype:'string',sortable:false},
		                   {name:'serviceName',index:'serviceName', width:180,align:'center',sortable:false,editable:true,edittype:"select",editoptions:{
		                	 
		                	   dataEvents:[{type:"blur",fn:function(){
		                		   $("#jqGrid_YFtab1").jqGrid("setCell",lastrow ,'serviceNameID',$(this).val() );
		               				$("#jqGrid_YFtab1").jqGrid("saveCell",lastrow ,lastcell );
		                		   
		                	   }
		                		  
		                		   }]}},
		                   {name:'amount',index:'amount', width:150,align:'center',sorttype:'string',editable:true,sortable:false,formatter:'number',editoptions:{
								dataEvents:[{
									type:"blur",
									fn:function(e){
										$("#jqGrid_YFtab1").jqGrid("saveCell",lastrow,lastcell);
										var parseTotal=  $("#jqGrid_YFtab1").jqGrid('getCol', 'amount', false, 'sum');
				                        $("#jqGrid_YFtab1").jqGrid('footerData', 'set', {amount: parseTotal});
				                        zeng();
									}
								}]}},
		                   {name:'remark',index:'remark', width:150,align:'center',sorttype:'string',sortable:false},
		                   
		                   {name:'serviceNameID',index:'serviceNameID', width:150,align:'center',sorttype:'string',sortable:false,hidden:true}
		                   ];
	JqGridColModel[1]=JqGridColModel1;

	var JqGridColModel2 =[
		                   {name:'id',index:'id',width:70,align:'center',hidden:true},
		                   {name:'storageName',index:'storageName', width:150,align:'center',sorttype:'string',sortable:false},
		                   {name:'code',index:'code', width:150,align:'center',sorttype:'string',sortable:false},
		                   {name:'name',index:'name', width:150,align:'center',sorttype:'string',sortable:false},
		                   {name:'addFlag',index:'addFlag', width:100,align:'center',sorttype:'string',sortable:false,formatter:'select',editoptions:{value:"1:增;2:换"}},
		                   {name:'partNumber',index:'partNumber', width:100,align:'center',sorttype:'string',sortable:false},
		                   {name:'price',index:'price', width:100,align:'center',sorttype:'string',sortable:false},
		                   {name:'amount',index:'amount', width:100,align:'center',sorttype:'string',sortable:false},
		                   {name:'serviceName',index:'serviceName', width:180,align:'center',sorttype:'string',sortable:false,editable:true,edittype:'select',editoptions: {
		                	   size:1,
		                	   dataEvents:[{
									type:"blur",
									fn:function(e){
		                		   $("#jqGrid_YFtab2").jqGrid("setCell",lastrow ,'serviceNameID',$(this).val() );
		               				$("#jqGrid_YFtab2").jqGrid("saveCell",lastrow ,lastcell );
			                   		}
		                	   }]}},
		                   {name:'zeng2',index:'zeng2', width:150,align:'center',sorttype:'string',editable:true,sortable:false,formatter:'number',editoptions:{
									dataEvents:[{
										type:"blur",
										fn:function(e){
											$("#jqGrid_YFtab2").jqGrid("saveCell",lastrow ,lastcell );
											var parseTotal=  $("#jqGrid_YFtab2").jqGrid('getCol', 'zeng2', false, 'sum');
					                        $("#jqGrid_YFtab2").jqGrid('footerData', 'set', {zeng2: parseTotal});
					                    //    $(".wxf").val(parseTotal);
					                        zeng();
										}
									}]}},
		                   {name:'goodsModel',index:'goodsModel', width:150,align:'center',sorttype:'string',sortable:false},
		                   {name:'goodsBrandId',index:'goodsBrandId', width:100,align:'center',sorttype:'string',sortable:false},
		                   {name:'oldColor',index:'oldColor', width:100,align:'center',sorttype:'string',sortable:false},
		                   {name:'newColor',index:'newColor', width:100,align:'center',sorttype:'string',sortable:false},
		                   {name:'oldImei',index:'oldImei', width:150,align:'center',sorttype:'string',sortable:false},
		                   {name:'newImei',index:'newImei', width:150,align:'center',sorttype:'string',sortable:false},
		                   {name:'oldAuxiliaryImei',index:'oldAuxiliaryImei', width:150,align:'center',sorttype:'string',sortable:false},
		                   {name:'newAuxiliaryImei',index:'newAuxiliaryImei', width:150,align:'center',sorttype:'string',sortable:false},
		                   {name:'remark',index:'remark', width:150,align:'center',sorttype:'string',sortable:false},
		                   {name:'serviceNameID',index:'serviceNameID', width:150,align:'center',sorttype:'string',sortable:false,hidden:true}
		                   ];
	JqGridColModel[2]=JqGridColModel2;
	
    
	//全局当前选择的rowid colid
	var rowid='';
	//var colid='';
	var select_name='';
	var defaults = {
	LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
	GetRowInfoUrl: "", //编辑时获取数据详细信息接口加载地址
	DelRowUrl: "", // 删除信息接口地址
	isSub:"",//是否有子级表格
	subLoadTableUrl:"",//子级表格数据来源地址
	TableName: "#jqGrid_settleAccounts", //显示表格名称。遵照css选择器书写
	iconJsonUrl:"../json/icon.json",
	btnbox: ".btnbox ",//功能按钮存放容器。遵照css选择器书写	
//	pager:"#jqGridPager_settleAccounts",
	TableInfo:"0",
	choose:true,
	height: $(window).height()*0.4,
	footerrow:false,
	userDataOnFooter:false,
	shrinkToFit:false
//	inputbox: ".inputbox" //搜索条件框存放容器。遵照css选择器书写
	};
	
	var options = $.extend(defaults,options);
		$.jgrid.defaults.width = 1280;
		$.jgrid.defaults.responsive = true;
		$.jgrid.defaults.styleUI = 'Bootstrap';	
		var lastsel='';//最后一次选中的行
		var rightClickColid="";//右键列id
		var rightClickColIndex=0;//右键index
		//var toggleflag=false;//冻结时候切换用
		var c=options.TableInfo;//参数index
	//	console.log("&&&&"+c);
		var colNames = colName[c];
		var JqGridColModel = JqGridColModel[c];
		loadtable();
	//加载表格
	
		function loadtable(){
				$(options.TableName).jqGrid({
					url:options.LoadTableUrl,
					mtype:"GET",
					datatype: "json",
					jsonReader  : {	
							root: "data.pageList",
							repeatitems: false
							},
					colNames:colNames,          
		            colModel:JqGridColModel,
		            cellEdit:true,
		            cellsubmit:'clientArray',//单元格保存内容的位置
		            editurl: 'clientArray',
		            sortable:false,			            
		            rownumbers:true,
		            viewrecords: true,
		            sortable:false,
		           //  cellEdit:true,
		            width: "100%" ,
		           // height: $(window).height()*0.45,
		            height:options.height,
					autowidth:true,
					rownumWidth: 35, // the width of the row numbers columns
					shrinkToFit:options.shrinkToFit,  //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
					multiselect:options.choose,
					multiboxonly:true,
					//footerrow:true,  //设置表格显示表脚
					//userDataOnFooter:true,//设置userData 显示在footer里
					footerrow:options.footerrow,
					userDataOnFooter:options.userDataOnFooter,
					ondblClickRow:function(id){
					//双击进入编辑
		   				var delid = id;
					},
					onCellSelect:function(id,index,cellcontent,e){
						var colName=$(options.TableName).jqGrid('getGridParam','colModel')[index].name 
				      	select_name=colName
				      	select_index=index;
				      	rowid=id;
//				      	if(options.TableInfo == 1 || options.TableInfo == 2){
//					      	var ids = $(options.TableName).jqGrid('getDataIDs');
//							//获得当前最大行号（数据编号）
//							var maxid;
//							maxid = (ids.length ==0 ) ? 0 : Math.max.apply(Math,ids);
//							//当用户点击表格最后一行时,自动增加一行
//							
//							(id == maxid && index != 1) && $(options.TableName).jqGrid('addRowData', maxid+1, {}, 'last' );
//						}
				     
					},
					beforeEditCell:function(rowid,cellname,v,iRow,iCol){
						           lastrow = iRow;
						           lastcell = iCol;
					},
					afterEditCell: function(rowid, cellname, value, iRow, iCol){//编辑完cell
						
					//	alert(lastrow);	
					},
					onSelectAll:function(aRowids,status){
						$('#jqGrid_settleAccounts').jqGrid('resetSelection');
						$.zxsaas_plus.showalert("提示","只能单选，请重新选择");
						$('#serviceId').html('');
						return(true);  
					},
					beforeSelectRow:function(rowid,e){
                        //单行选择
						$('#jqGrid_settleAccounts').jqGrid('resetSelection');  
						return(true);  	
					},
					afterInsertRow: function (rowid, aData) { //新增一行之后

					},
					gridComplete: function() {
					//	var ids=$(options.TableName).jqGrid("getDataIDs");
						
                   
					},
//					onSelectCell:function(id,index){
//						alert("&&&"+id);
//					},
					onSelectRow:function(rowid,status){//当选择行时触发此事件
						//单选
						$('.zengYF5').html('');
						var tableData=$("#jqGrid_settleAccounts").jqGrid('getRowData', rowid);
						$('.fuwufeiyong').val(tableData.fwFee)
						$('#settleVer').writeJson2Dom(tableData);
						var valueAddList=JSON.parse(tableData.valueAddList);
						$.each(valueAddList,function(i,v){
							$('.zengYF5').append("<option value="+v.id+">"+v.serviceName+"</option>")
						})
						if(tableData.settleFlag == '1'){
							payreceiptMainId=tableData.settleFlag;
							
							var param={}
							param.createDateBegin=$('#datetimepickerStart1').val();
							param.createDateEnd=$('#datetimepickerStart2').val();
							param.ifContainSettle=ifContainSettle;
							param.repairSectionId=repairSectionId;
							$.ajax( {
								type : 'post',
								contentType :'application/json', 
								url : '/manager/afterSalesService/takeMachine/selectTakeMachineDataGrid',
								dataType : "json", // 可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
								data:JSON.stringify(param),
								success : function(data) {
									console.log(data);
									var datas = data.data.dataGridList;
									console.log(datas[rowid]);
									$('.haihui1').val("");
									if(datas[rowid].returnSpareFlag == 1){
										$('.haihui').attr('checked',true);
									}else{
										$('.haihui').attr('checked',false);
									}
									if(datas[rowid].deleveryType == 0){
										$('.ziqu').attr('checked',false);
										$('.fayun2').click();
										$('.qita1').show();
									}else if(datas[rowid].deleveryType == 1){
										$('.ziqu').attr('checked',false);
										$('.fayun1').attr('checked',true);
										$('.qita1').hide();
										$('.ziqu1').show();
										$('.ziqu2').show();
										$('.express').val(datas[rowid].express);
										$('.trackNo').val(datas[rowid].trackNo);
									}else{
										$('.ziqu').attr('checked',true);
										$('.qita1').hide();
										$('.ziqu1').hide();
										$('.ziqu2').hide();
										$('.fayun1').attr('checked',false);
										$('.fayun2').attr('checked',false);
									}
								},
								error : function(msg) {
									$.zxsaas_plus.showalert(" 数据加载失败！" + msg);
								}
							});
						}else{
							$('.ziqu').attr('checked',true);
							$('.qita1').hide();
							$('.ziqu1').hide();
							$('.ziqu2').hide();
							$('.fayun1').attr('checked',false);
							$('.fayun2').attr('checked',false);
							$('.express').val("");
							$('.trackNo').val("");
						}
		 				
		 				if(tableData.borrowSpareFlag=='1'){
		 					$('.haihui').attr('disabled',false);
		 					
		 				}else{
		 					$('.haihui').attr('disabled',true);
		 					$('.haihui').attr('checked',false);
		 					$('.haihui1').attr('disabled',true);
		 				}
		 				
		 				
		 				
//						if (rowId == lastSel) {
//				            $(this).jqGrid("resetSelection");
//				            lastSel = undefined;
//				            status = false;
//				        } else {
//				            lastSel = rowId;
//				        }
//						
//						
//						var rowIds =$('#jqGrid_settleAccounts').jqGrid('getGridParam','selrow');
//						for(var i = 0 ;i < rowIds.length;i++){
//					 		var rows= $("#jqGrid_settleAccounts").jqGrid("getRowData", rowIds[i]);
//					 		handlemode =rows.handlemode;
//					 	//	console.log(handlemode);
//					 	}
//						if(handlemode==1){
//							$('.diaplayYF2').hide();
//							$('.diaplayYF1').show();
//							queryData1();
//						}else{
//							$('.diaplayYF1').hide();
//							$('.diaplayYF2').show();
//							queryData2()
//						}
//						
//						getStorage();//增值服务下拉
//						
//						
						calcMoney();//费用合计 ,实际收费
//						//费用合计
						calcMoney();
//						//增值服务抵减
						zeng();
//						//应收费用
						costY();
//						//优惠金额
						youMoney();
//						//欠款金额
						qiankuan();
					},
					loadComplete:function(data){
					},
					loadError:function(xhr,status,error){
						//console.log(status)
					}
					})
	
		}
		function saveCell(){
			$("#jqGrid_YFtab1").jqGrid("saveCell",lastrow ,lastcell );
			$("#jqGrid_YFtab2").jqGrid("saveCell",lastrow ,lastcell );
		}
		
		//新增一行
		$(document).on('click', '.glyphicon-plus-sign',function(e){
			var thisTitle = $(this).attr("title");
			var rowId = $(this).parent().data('id');
			$(options.TableName).jqGrid('addRowData', rowId+1, {}, 'last' );
		});
		
		function addAndDelete(cellvalue, options, rowObjec){
			var addAndDel = '<div class="operating" data-id="' + options.rowId + '"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true" id="add_row" title="新增"></span><span class="glyphicon glyphicon-trash" aria-hidden="true" id="add_row" title="删除行"></span></div>';
			return addAndDel;
		}
		
		// 列表复选框
		function checkBox(cellvalue, options, rowObjec){
			return '<input type="checkbox" class="checkBoxNum" data-id="' + rowObjec.deliveryId + '"  data-rId="' + options.rowId + '" />';
		}
		
		//select下拉框
		function selectYF(cellvalue, options, rowObject){
			return '<select class="offerYF' + options.rowId +'" style="border:0;text-align:center;width:150px;height:30px;"><option value="' + cellvalue +'"></option></select>';
		};
		
		function selectYF(cellvalue, options, rowObject){
			return '<span class="selectYF"></span>';
		}
		  
}
//删除一行
$(document).on('click', '.delete',function(e){
	var thisTitle = $(this).attr("title");
	var rowId = $(this).parent().data('id');
	if(thisTitle == "删除行"){
		console.log('条数:' + $('#jqGrid_YFtab1 tbody tr').length);
		if($('#jqGrid_YFtab1 tbody tr').length === 2) {
			$.zxsaas_plus.showalert("错误","至少保留一条数据!")
			return false;
		}
		$.zxsaas_plus.showconfirm("","是否确定删除本行?",function(){
			$("#jqGrid_YFtab1").jqGrid('delRowData', rowId);
		},function(){
			
		});

	}
});
//选项卡主表
$(document).ready(function(){
	var ad=$(document.body).width();
	
	$('.zhubiao').attr("width",ad);
	$('.widthYF2').attr("width",ad);
	$('.widthYFS1').attr("width",ad);
	
	loadmodal({"TableName":"#jqGrid_YFtab1","pager":"#jqGridPager_YFtab1","shrinkToFit":true,"choose":false,"footerrow":true,"TableInfo":"1","footerrow":true,"userDataOnFooter":true});
	loadmodal({"TableName":"#jqGrid_YFtab2","pager":"#jqGridPager_YFtab2","shrinkToFit":true,"choose":false,"footerrow":true,"TableInfo":"2","footerrow":true,"userDataOnFooter":true});
	$('.diaplayYF1').hide();
//	$('.diaplayYF2').hide();
	
	//维修部门
//	getStorageWEI();
//	readyYF();//加载页面加载数据
	
	settleVer('#settleVer');
});

var createDateBegin,createDateEnd,ifContainSettle=0,repairSectionId,selfTakeFlag=1,returnSpareFlag=0;

getTableData()
function getTableData(){
	var param={}
	param.createDateBegin=$('#datetimepickerStart1').val();
	param.createDateEnd=$('#datetimepickerStart2').val();
	param.ifContainSettle=ifContainSettle;
	param.repairSectionId=repairSectionId;
	$.ajax( {
		type : 'post',
		contentType :'application/json', 
		url : '/manager/afterSalesService/takeMachine/selectTakeMachineDataGrid',
		dataType : "json", // 可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
		data:JSON.stringify(param),
		success : function(data) {
			$('#jqGrid_settleAccounts').jqGrid('clearGridData')
			var billInfo=data.data.dataGridList
			$.each(billInfo,function(i,v){
				 $('#jqGrid_settleAccounts').jqGrid('addRowData',[i],v);
			})
//			imeiArr=[]
//			         $('#jqGrid_RAS').jqGrid('clearGridData');
//			$.zxsaas_plus.showalert("提示",data.desc);
		},
		error : function(msg) {
			$.zxsaas_plus.showalert(" 数据加载失败！" + msg);
		}
	});
}



//var readyYF=function(){
//	var repairSectionId=$('.repairSectionId').val();
//	$.request({
//    	url:"/manager/afterSalesService/takeMachine/query?repairSectionId="+repairSectionId,
//    	dataType:'json',
//    	contentType:'application/json;charset=utf-8',
//    //	data:JSON.stringify(data),
//    	type:'GET',
//    	success:function(data){
//			if(data.result==1){
//				var dataList = data.data.pageList;
//				for(var i = 0,len = dataList.length;i<len;i ++){
//					handlemode= dataList[i].handlemode;
//				}
//			}
//		//	console.log(data);
//    	},
//    	error:function(){
//    		$.zxsaas_plus.showalert("","error!")
//    	}
//    })
//}

$(document).on('change','.repairSectionId',function(){
	accountYF();//资金账户
	$('.YFhideIn4').val('');
});
//押金预收款
var accountYF = function(data){
	
	$.request({
        type: 'Get',
        url: '/manager/afterSalesCommon/getAccounts?sectionId='+data,
        dataType: "json",
        success: function (data) {
			var moneyList = data.data.accountList;
			var str1 = '<tr><th>付款类别</th><th>账户名称</th><th>付款金额</th></tr>';
	 		var str2 = '';
	 		var str3 = '<tr><td>合计</td><td colspan="2" style="text-align: right;" class="totalMoney" value="0.00"></td></tr>';
	 		for(var i = 0,len = moneyList.length; i < len;i ++){
	 			str2 += '<tr><td>'+moneyList[i].customer+'</td><td>'+moneyList[i].name+'</td><td><input type="text" class="money mon'+i+'" data-accId='+moneyList[i].id+' ></td></tr>';
	 		}
	 		var tab = str1 + str2 + str3;
	 		$('.moneyTab').html('');
	 		$('.moneyTab').append(tab);

        },
        error: function (msg) {
            alert(" 数据加载失败！" + msg);
        }
    });
}


$(document).on('blur','.money',function(e){
	var total = 0;0
	$('.money').each(function(){
	//	console.log('..' +$(arguments[1]).val());
		total += ((($(arguments[1]).val() * 1).toFixed(2)) * 1);
	});
	$('.totalMoney').html(total);
});
//收款
$(document).on('click','.saveMoney',function(){
	var a=$('.totalMoney').html();
	$('.YFhideIn4').val(a);
	
	//$.zxsaas_plus.showalert("","保存成功!");
	qiankuan();
});
$(document).on('click','.changeYF1',function(){
	loadmodal({"TableName":"#jqGrid_YFtab1","pager":"#jqGridPager_YFtab1","shrinkToFit":true,"choose":false,"footerrow":true,"userDataOnFooter":true,"TableInfo":"1","footerrow":true,"userDataOnFooter":true});
//	getStorage();
});
//选项卡表2
$(document).on('click','.changeYF2',function(){
	loadmodal({"TableName":"#jqGrid_YFtab2","pager":"#jqGridPager_YFtab2","shrinkToFit":true,"choose":false,"footerrow":true,"userDataOnFooter":true,"TableInfo":"2","footerrow":true,"userDataOnFooter":true});
//	getStorage();
});

//服务费用
$(document).on('change','.fuwufeiyong',function(){
	var va=$(this).val();
	//var reg = /^\d*(\.)?\d{0,2}/;
	var reg=/^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/;
	if(reg.test(va)|| !va){
		//alert('yy')
	}else{
		$.zxsaas_plus.showalert("错误","输入格式不正确!")
	}
	calcMoney();
	costY();
	youMoney();
	qiankuan();
});

//其他费用
$(document).on('change','.qitafeiyong',function(){
	var va=($(this).val()*1).toFixed(2);
	calcMoney();
	costY();
	youMoney();
	qiankuan();
});

//验证
function yan(){
	var reg = /^\d*(\.)?\d{0,2}/;
	if(reg.test($(this).val())){
		return true;
	}else{
		alert('a')
		return false;
	}
}


//费用合计
var calcMoney = function(){
//	debugger;
	//（维修项目）实收项目合计
	var parseTotal=  $("#jqGrid_YFtab1").jqGrid('getCol', 'actualAmount', false, 'sum');
    $("#jqGrid_YFtab1").jqGrid('footerData', 'set', {actualAmount: parseTotal.toFixed(2)});
  //  console.log(parseTotal.toFixed(2)+"@@@@")
    //（更换备件）金额合计
    var parseTotal2=  $("#jqGrid_YFtab2").jqGrid('getCol', 'amount', false, 'sum');
    $("#jqGrid_YFtab2").jqGrid('footerData', 'set', {amount: parseTotal2.toFixed(2)});
    
    //（检修结果）其他费用
    var va=$(".qitafeiyong").val();
    
    //(外修及返厂)服务费用
    var va1=$('.fuwufeiyong').val();
    
    //合计
    var a=(parseTotal*1+parseTotal2*1+va*1+va1*1).toFixed(2);
    $('.feitotal').val(a);
};

//增值服务抵减
$(document).on('change','.zengzhi1',function(){
	zeng();
	costY();
	youMoney();
	qiankuan();
});
$(document).on('change','.zengzhi2',function(){
	zeng();
	costY();
	youMoney();
	qiankuan();
});
//增值服务抵减
var zeng = function(){
    //（维修项目）增值服务抵减
	var parseTotal=  $("#jqGrid_YFtab1").jqGrid('getCol', 'amount', false, 'sum');
    $("#jqGrid_YFtab1").jqGrid('footerData', 'set', {amount: parseTotal.toFixed(2)});
    
    //（更换备件）增值服务抵减
    var parseTotal2=  $("#jqGrid_YFtab2").jqGrid('getCol', 'zeng2', false, 'sum');
    $("#jqGrid_YFtab2").jqGrid('footerData', 'set', {zeng2: parseTotal2.toFixed(2)});
    
    //（检修结果）增值服务抵减
    var va=$(".zengzhi1").val();
    
    //(外修及返厂)抵扣费用
    var va1=$('.zengzhi2').val();
    
    //合计
    var a=(parseTotal*1+parseTotal2*1+va*1+va1*1).toFixed(2);
    $('.zengzhiO').val(a);	
}

//应收费用
var costY = function(){
	var a= $('.feitotal').val();
	var b=$('.zengzhiO').val();
	var aa=(a*1-b*1).toFixed(2);
	$('.shishou').val(aa);
}

//应收费用
$(document).on('change','.shishou',function(){
	youMoney();
	qiankuan();
});

//优惠金额
var youMoney = function(){
	//合计
	var a= $('.feitotal').val();	
	//增值
	var b= $('.zengzhiO').val();	
	//实收
	var c= $('.shishou').val();	
	var aa=(a*1-b*1-c*1).toFixed(2) > 0 ? (a*1-b*1-c*1).toFixed(2) : 0;
	$('.youhui').val(aa);
}

//退押金
$(document).on('change','.haihui1,.haihui2',function(){
	qiankuan();
});

//欠款金额
var qiankuan = function(){
	//应收
	var a= $('.shishou').val();	
	//预收
	var b=$('.yushou').val();
	//收款
	var c=$('.YFhideIn4').val().replaceAll(',','');
	//退押金
	var d=$('.haihui1').val();
	//押金
	var e=$('.yajin').val();
	if($('.haihui2').prop('checked')){
		var aa=(a*1-b*1-c*1+d*1-e*1).toFixed(2);
		$('.qiankuanYY').val(aa);
	}else{
		var bb=(a*1-b*1-c*1).toFixed(2);
		$('.qiankuanYY').val(bb);
	}
}


//是否包含已结算
$(document).on('click','.yfbao',function(){
	if($(this).prop('checked')){
		ifContainSettle=1;
//		$(".yfbao1").removeAttr("disabled");
//		$(".yfbao2").removeAttr("disabled");
		
	}else{
		ifContainSettle=0;
//		$('.yfbao1').attr("disabled","disabled");
//		$('.yfbao2').attr("disabled","disabled");
//		$('.yfbao1').val('');
//		$('.yfbao2').val('');
	}
	
});

//自取

$(document).on('click','.ziqu',function(){
	if($(this).prop('checked')){
		selfTakeFlag=1
		$('.fayun1').attr("disabled","disabled");
		$('.fayun2').attr("disabled","disabled");
		$('.ziqu1').css('display','none');
		$('.ziqu2').css('display','none');
		$('.qita1').css('display','none');
		$('.fayun1').attr("checked",false);
		$('.fayun2').attr("checked",false);
		deleveryType = null;
	}else{
		selfTakeFlag=0
		$(".fayun1").attr("disabled",false);
		$(".fayun1").prop("checked","checked");
		deleveryType=1
		$(".fayun2").removeAttr("disabled");
		$('.ziqu1').css('display','block');
		$('.ziqu2').css('display','block');
	}
});

//发运方式
var deleveryType = null;
$(document).on('click','.fayun1',function(){
	deleveryType=1
	if($(this).prop('checked')){
		
		$('.ziqu1').css('display','block');
		$('.ziqu2').css('display','block');
		$('.qita1').css('display','none');
	}else{
		$('.ziqu1').css('display','none');
		$('.ziqu2').css('display','none');
	}
});
$(document).on('click','.fayun2',function(){
	deleveryType=0
	if($(this).prop('checked')){
		$('.qita1').css('display','block');
		$('.ziqu1').css('display','none');
		$('.ziqu2').css('display','none');
	}else{
		$('.qita1').css('display','none');
	}
});

//还回备用机
$(document).on('click','.haihui',function(){
	if($(this).prop('checked')){
		$('.haihui1').attr("disabled",false);
		$('.haihui2').attr("disabled",false);
		returnSpareFlag=1
	}else{
		$('.haihui1').attr("disabled","disabled");
		$('.haihui2').attr("disabled","disabled");
		$('.haihui2').removeAttr("checked");
		$('.haihui1').val('');
		returnSpareFlag=0
		qiankuan();
	}
});

//查询时间
$(document).on('click','.queryDate',function(){
	var hasSettled =0;
	if($('.yfbao').prop('checked')==true){
		hasSettled=1;
	}
	getTableData()
	
});
var rowsFlow = null;
//获取维修选项卡数据
var queryData1 = function(){
		var rowIds =$('#jqGrid_settleAccounts').jqGrid('getGridParam','selrow');
		//var rowIds = $('#jqGrid_settleAccounts').jqGrid('getDataIDs');
		var rows = $("#jqGrid_settleAccounts").jqGrid("getRowData", rowIds);
		var flowNo=rows.flowNo;
		rowsFlow =rows.flowNo;
		//console.log(JSON.stringify(rowsFlow)+'-----------');
		$.request({  
		 	url: '/manager/afterSalesService/takeMachine/getRepairData?flowNo='+flowNo,//请求路径  
		 	async: false,  
		 	type:'GET',
		 	success: function(data) {  
				//(data.result == 1) && ($.zxsaas_plus.showalert("","保存成功!"))
				//维修项目
				var weixiu = data.data.projectList;
				$("#jqGrid_YFtab1").jqGrid('clearGridData');
				for(var i = 0,len = weixiu.length;i < len;i ++){
					var arr = {
						'id':weixiu[i].id,
						'code':weixiu[i].attrs.projectName.code,
						'name':weixiu[i].attrs.projectName.name,
						'actualAmount':weixiu[i].actualAmount,
						'remark':weixiu[i].remark
					};
					$("#jqGrid_YFtab1").jqGrid('addRowData',(i+1),arr,'last');
				}
				//更换备件	
				var dataList = data.data.partsList;
				$("#jqGrid_YFtab2").jqGrid('clearGridData');
				for(var i = 0;i< dataList.length; i ++){
					//更换备件
					var attrT=dataList[i];
					var attrs =dataList[i].attrs.goods;
					var arrList = {
						'id':attrT.id,
						"storageName":attrT.storageName,
						"code":attrs.code,
						'name':attrs.name,
						'addFlag':attrT.addFlag,
						'partNumber':attrT.partNumber,
						'price':attrT.price,
						'amount':attrT.amount,
						'goodsModel':attrs.goodsModel,
						'goodsBrandId':attrs.goodsBrandId,
						'oldColor':attrs.goodsColorName,
						'newColor':'',
						'oldImei':attrT.oldImei,
						'newImei':attrT.newImei,
						'oldAuxiliaryImei':attrT.oldAuxiliaryImei,
						'newAuxiliaryImei':attrT.newAuxiliaryImei,
						'remark':attrT.remark
					};
					$("#jqGrid_YFtab2").jqGrid('addRowData',(i+1),arrList,'last');
				}
				//外观、串号变更
				var wguan = data.data.imeicolorChange;
				$('.newImei').val(wguan.newImei);
				$('.newAuxiliaryImei').val(wguan.newAuxiliaryImei);
				$('.newColor').val(wguan.newColor);
				
				//检修结果
				var resultY =data.data.testresult;
				$('.hideYF4').val(resultY.id);
				$('.falutDesc').val(resultY.falutDesc);
				$('.testResult').val(resultY.testResult);
				$('.repairProject').val(resultY.repairProject);
				$('.qitafeiyong').val(resultY.otherAmount);
				$('.otherCost').val(resultY.otherCost);
				$('.remark').val(resultY.remark);
				
		 	},
		 	error:function(){
		 		
		 	}
		 	
	 	});
}
//外修返厂单个
var queryData2 = function(){
	var rowIds =$('#jqGrid_settleAccounts').jqGrid('getGridParam','selrow');
	var rows = $("#jqGrid_settleAccounts").jqGrid("getRowData", rowIds);
	var flowNo=rows.flowNo;
	rowsFlow =rows.flowNo;
	$.request({  
		url: '/manager/afterSalesService/takeMachine/getRepairData?flowNo='+flowNo,//请求路径  
		async: false,  
		type:'GET',
		success: function(data) {  
			var dataList=data.data.receiptSettleList;
			for(var i=0,len=dataList.length;i<len;i++){
				var a=dataList[i].serviceAmount;
				var id=dataList[i].id;
				$('.fuwufeiyong').val(a);
				$('.hideYF5').val(id);
			}
		//(data.result == 1) && ($.zxsaas_plus.showalert("","保存成功!"))
		
	},
	error:function(){
		
	}
	
	});
}
//增值服务下拉框
function getStorage(){
	var countries = {};
	$.request({  
	 	url: '/manager/afterSalesService/takeMachine/getAvaAddService?flowNo='+rowsFlow,//请求路径  
	 	async: false,  
	 	success: function(data) {   
		if(data.result == 1){
			for(var i = 0,len = data.data.list.length;i < len;i ++){
	 			//if(data.data.list[i].attrs.addService != null){
	 				countries[data.data.list[i].id] =data.data.list[i].attrs.addService.serviceName;
	 				  $('.zengzhi').append("<option value="+data.data.list[i].id+">"+data.data.list[i].attrs.addService.serviceName+"</option>");
	 				 $('.zengYF5').append("<option value="+data.data.list[i].id+">"+data.data.list[i].attrs.addService.serviceName+"</option>");
	 			//}
			}
			//	$("#jqGrid_YFtab2").jqGrid("setGridParam").trigger("reloadGrid");
			}
	 		
	 	},
	 	error:function(){
	 		alert('错误！')
	 	}
	 	});
	return countries;
};

//保存 提交结算
//$(document).on('click','.saveData',function(){
//	$("#settleVer").data('bootstrapValidator').validate();
//	if(!($("#settleVer").data('bootstrapValidator').isValid())){
//		refreshValidator("#settleVer");
//		return;
//	}
//	var rowIds =$('#jqGrid_settleAccounts').jqGrid('getGridParam','selarrrow')
//	if(!rowIds.length){
//		$.zxsaas_plus.showalert("提示","请先选择一条数据！");
//		return
//	}
//	
//	if(!repairSectionId){
//		$.zxsaas_plus.showalert("提示","请先选择维修部门！");
//		return
//	}
//	
//	var params={}
//	var payreceiptMainDraft={}  //  主表
//	var payreceiptDetailDraftList={} // 数据表
//	payreceiptDetailDraftList=tableData1().main
//	
//	
//	payreceiptMainDraft.billsPrefixCode="JJDJYJ";
//	payreceiptMainDraft.refMainTable=payreceiptDetailDraftList.sourceTabName;
//	payreceiptMainDraft.billsDate='';
//	payreceiptMainDraft.amount=$(".YFhideIn4").val().replace(/\,/g, "");
//	
//	params.payreceiptMainDraft=payreceiptMainDraft;
//	params.payreceiptDetailDraftList=payreceiptDetailDraftList;
//	var handlemode="";
//	var data='';
//	var rowIds =$('#jqGrid_settleAccounts').jqGrid('getGridParam','selarrrow');
//	for(var i = 0 ;i < rowIds.length;i++){
// 		var rows= $("#jqGrid_settleAccounts").jqGrid("getRowData", rowIds[i]);
// 		handlemode =rows.handlemode;
// 		console.log(handlemode);
// 	}
//	if(handlemode==1){
//		data = tableData1();
//	}else{
//		data = tableData2();
//	}
//	
//	$.request({  
//	 	url: '/manager/afterSalesService/takeMachine/saveSettleAccount',//请求路径  
//	 	dataType:'json',
//	 	contentType:'application/json;charset=utf-8',
//	 	data:JSON.stringify(tableData1().main),
//	 	type:'POST',
//	 	//async: false,  
//	 	success: function(data) {   
//			if(data.result == 1){
//				getTableData();
//				$('#settleVer')[0].reset();
//				$('.zengzhi2').val('');
//				$.zxsaas_plus.showalert("","结算成功!")
//			}else{
//				$.zxsaas_plus.showalert("错误","保存失败!")
//			}
//			
//	 	},
//	 	error:function(){
//	 		 ($.zxsaas_plus.showalert("","错误!"))
//	 	}
// 	});
//});
//4个选项卡
var tableData1 = function(){
	var rowIds = $('#jqGrid_settleAccounts').jqGrid('getDataIDs');
	
	var rowI=$('#jqGrid_settleAccounts').jqGrid('getGridParam','selarrrow');
	var rows = $("#jqGrid_settleAccounts").jqGrid("getRowData",rowI);
	
	var selfTakeFlag =0;
	if($('.ziqu').prop('checked') == true){
		selfTakeFlag = 1;
	}
	var returnSpareFlag =0;
	if($('.haihui').prop('checked') == true){
		returnSpareFlag = 1;
	}
	
	var deleveryType=1;
	if($('.fayun1').prop('checked')==true){
		deleveryType;
	}else{                                                           
		deleveryType=2;
	}
	
	var main = {
		'goodsId':rows.goodsId,
		'oldColor':rows.oldColor,
		'newColor':rows.newColor,
		'oldImei':rows.imei,
		'newImei':rows.newImei,
		'oldAuxiliaryImei':rows.newAuxiliaryImei,
		'newAuxiliaryImei':rows.newAuxiliaryImei,
		'oldLooksDesc':rows.looksDesc,
		'borrowSpareFlag':rows.borrowSpareFlag,
		'returnFlag':rows.returnFlag,
		'remark':rows.remark,
		'technicianId':rows.technicianId,
		'serviceType':rows.serviceType,
		'selfTakeFlag':selfTakeFlag,
		'returnSpareFlag':returnSpareFlag,
		'custom':$('.custom').val(),
		'telephone':$('.telephone').val(),
		'address':$('.address').val(),
		'deleveryType':deleveryType,
		'express':$('.express').val(),
		'trackNo':$('.trackNo').val(),
		'totalAmount':$('.feitotal').val(),
		'serviceDeductAmount':$('.zengzhiO').val(),
		'actualAmount':$('.shishou').val(),
		'prePayment':$('.yushou').val(),
		'amount':$('.YFhideIn4').val(),
		'deposit':$('.yajin').val(),
		'returnDeposit':$('.haihui1').val(),
		'settleFlag':rows.settleFlag,
		'repairStatus':rows.repairStatus,
		'goodsModel':rows.goodsModel,
		'sourceTabId':rows.sourceTabId,
		'sourceTabName':rows.sourceTabName,
		'contactunitId':rows.contactunitId,
		'handleModel':rows.handleModel,
		'serviceId':rows.serviceId,
		
		'repairSectionId':$('.repairSectionId').val()
	};
	 var repairProject = function(){
		 var arrtable=[];
		 var rowIds = $('#jqGrid_YFtab1').jqGrid('getDataIDs');
		 var flag=0;
	 		for(var i = 0 ;i < rowIds.length;i++){
	 		var rows = $("#jqGrid_YFtab1").jqGrid("getRowData", rowIds[i]);
	 		arrtable.push({"chargeId":rows.id,"serviceId":rows.serviceNameID,"amount":rows.amount});
	 	}
	 	return arrtable;
	};
	 var changeParts = function(){
		 var arrtable=[];
		 var rowIds = $('#jqGrid_YFtab2').jqGrid('getDataIDs');
		 var flag=0;
	 		for(var i = 0 ;i < rowIds.length;i++){
	 		var rows = $("#jqGrid_YFtab2").jqGrid("getRowData", rowIds[i]);
	 		
	 		arrtable.push({"chargeId":rows.id,"serviceId":rows.serviceNameID,"amount":rows.amount});
	 	}
	 	return arrtable;
	};
	
	var checkResult ={
			'chargeId':$('.hideYF4').val(),
			'serviceId':$('.zengzhi option:selected').val(),
			'amount':$('.YFtab4jian').val()
	}
	//底部总金额
 	var monInput = $('.money');
 	var monArr = [];//金额
 	$('.money').each(function(){
 		if($.trim($(arguments[1]).val())!=''&&$.trim($(arguments[1]).val())!=0){
 			monArr.push({'accountId':$(arguments[1]).data('accid'),'payreceiptAmout':$(arguments[1]).val()});
 		}
 	});
	//押金弹出框
	var payreceipt ={
			"amount": $('.YFhideIn4').val(), 
	        "remark":"", 
	        "details": monArr	
	};
	
	var getData ={
		'main':main,
		'repairProject':repairProject(),
		'changeParts':changeParts(),
		'checkResult':checkResult,
		'payreceipt':payreceipt
	}
	return getData;
}

//外修返厂单个
var tableData2 = function(){
	var rowIds = $('#jqGrid_settleAccounts').jqGrid('getDataIDs');
	
	var rowI=$('#jqGrid_settleAccounts').jqGrid('getGridParam','selarrrow');
	var rows = $("#jqGrid_settleAccounts").jqGrid("getRowData",rowI);
	
	var selfTakeFlag =0;
	if($('.ziqu').prop('checked') == true){
		selfTakeFlag = 1;
	}
	var returnSpareFlag =0;
	if($('.haihui').prop('checked') == true){
		returnSpareFlag = 1;
	}
	
	var deleveryType=1;
	if($('.fayun1').prop('checked')==true){
		deleveryType;
	}else{                                                           
		deleveryType=2;
	}
	
	var main = {
		'flowNo':rows.flowNo,
		'goodsId':rows.goodsId,
		'oldColor':rows.oldColor,
		'newColor':rows.newColor,
		'oldImei':rows.imei,
		'newImei':rows.newImei,
		'oldAuxiliaryImei':rows.newAuxiliaryImei,
		'newAuxiliaryImei':rows.newAuxiliaryImei,
		'oldLooksDesc':rows.looksDesc,
		'borrowSpareFlag':rows.borrowSpareFlag,
		'returnFlag':rows.returnFlag,
		'remark':rows.remark,
		'technicianId':rows.technicianId,
		'serviceType':rows.serviceType,
		'selfTakeFlag':selfTakeFlag,
		'returnSpareFlag':returnSpareFlag,
		'custom':$('.custom').val(),
		'telephone':$('.telephone').val(),
		'address':$('.address').val(),
		'deleveryType':deleveryType,
		'express':$('.express').val(),
		'trackNo':$('.trackNo').val(),
		'totalAmount':$('.feitotal').val(),
		'serviceDeductAmount':$('.zengzhiO').val(),
		'actualAmount':$('.shishou').val(),
		'prePayment':$('.yushou').val(),
		'amount':$('.YFhideIn4').val(),
		'deposit':$('.yajin').val(),
		'returnDeposit':$('.haihui1').val(),
		'repairSectionId':$('.repairSectionId').val()
	};
	var wxfc ={
			'chargeId':$('.hideYF5').val(),
			'serviceId':$('.zengYF5 option:selected').val(),
			'amount':$('.zengzhi2').val()	
	}
	//底部总金额
 	var monInput = $('.money');
 	var monArr = [];//金额
 	$('.money').each(function(){
 		if($.trim($(arguments[1]).val())!=''&&$.trim($(arguments[1]).val())!=0){
 			monArr.push({'accountId':$(arguments[1]).data('accid'),'payreceiptAmout':$(arguments[1]).val()});
 		}
 	});
	//押金弹出框
	var payreceipt ={
			"amount": $('.YFhideIn4').val(), 
	        "remark":"", 
	        "details": monArr	
	};
	
	var getData ={
		'main':main,
		'wxfc':wxfc,
		'payreceipt':payreceipt
	}
	return getData;
}


////维修部门下拉
//function getStorageWEI(){
//	$.request({  
//	 	url: '/manager/afterSalesCommon/getRepairSections',//请求路径  
//	 	async: false,  
//	 	success: function(data) {   
//	 		for(var i = 0,len = data.data.sectionList.length;i < len;i ++){
//	 			countries = data.data.sectionList[i];
//	 			$('.repairSectionId').append("<option value='"+countries.id+"' selected>"+countries.name+"</option>");
//	 		}
//	 	},
//	 	error:function(){
//	 		$.zxsaas_plus.showalert("","error!")
//	 	}
//	 	});
//	
//};


//设置表格
$(document).on("click","#myTab>li>a",function(){
	var t=$(this).attr("href");
	$(t).find("table").setGridWidth($(t).width());
	
});


function showSectionModal(data){
	
	//树设置参数
	var setting = {  
		    data: {//数据属性设置
		        simpleData: {enable: true,idKey: "code",pIdKey: "pCode",rootPId: null}
	        },
	        callback:{
			   onDblClick:function(event, treeId, treeNode){
	            	if($(event.target).is('span')){
	            		if(treeNode.check_Child_State==-1){
            				$('.repairName').val(treeNode.name);
            				repairSectionId=treeNode.obj.id;
            				getTableData();
            				$('.fuwufeiyong').val('');
            				$('#settleVer')[0].reset();
            				$('.zengzhi2').val('');
            				accountYF(repairSectionId)
	            			$("#sectionModal").modal('hide');
	                	}
	            	}
	            }
	        },
			view: {//样式设置
				showIcon: false
			}
	    }; 
	$.ajax( {
		type : 'Get',
		url:'/manager/jxc/storage/authorityAndTree/findTree',
		dataType : "json", // 可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
		success : function(data) {
			$.fn.zTree.init($("#sectionTreeData"), setting, data);
			var zTree = $.fn.zTree.getZTreeObj("sectionTreeData");
			zTree.expandAll(true);// 展开全部节点
			$("#sectionModal").modal("show");
		},
		error : function(msg) {
			alert(" 数据加载失败！" + msg);
		}
	});
}

$('.YFbtnHied3').click(function(){
	if(repairSectionId){
		$('#moneyChoose').modal('show');
	}else{
		$.zxsaas_plus.showalert("提示","请先选择维修部门！");
		return;
	}
})

$('.cancelsaveData').click(function(){
	var rowIds =$('#jqGrid_settleAccounts').jqGrid('getGridParam','selarrrow')
	if(!rowIds.length){
		$.zxsaas_plus.showalert("提示","请先选择一条记录在结算！");
		return;
	}
	var settleFlag=$('#jqGrid_settleAccounts').jqGrid('getRowData',rowIds).settleFlag;
	if(settleFlag == '0'){
		$.zxsaas_plus.showalert("提示","该记录未结算过，无法在重新结算！");
		return;
	}else{
	
		$.request({  
		 	url: '/manager/afterSalesService/takeMachine/againSettleAccount',//请求路径  
		 	dataType:'json',
		 	contentType:'application/json;charset=utf-8',
		 	data:{payreceiptMainId:payreceiptMainId},
		 	type:'POST',
		 	success: function(data) {   
		 		
				if(data.result == 1){
					$.zxsaas_plus.showalert("","取消结算成功!")
					getTableData();
					$('#settleVer')[0].reset();
					$('.zengzhi2').val('');
					$('#serviceId').html('');
				}else{
	    			$.zxsaas_plus.showalert("错误",data.desc)
	    		}
		 	},
		 	error:function(){
		 		 ($.zxsaas_plus.showalert("","错误!"))
		 	}
	 	});
	}


})

