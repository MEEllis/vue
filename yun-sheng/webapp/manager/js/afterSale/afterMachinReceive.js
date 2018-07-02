function wangTree(options){
	
	var defaults = {
	    url:'../../json/admin/metaDataTree.json',
	    TreeName:"#unitDataTree"
	};
	
	var options =$.extend(defaults,options);
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
	$.request({
        type: 'Get',
        url: options.url,
        dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
        success: function (data) {
        	
            $.fn.zTree.init($(options.TreeName), setting, data);
            var str = $(options.TreeName+'_1_switch').attr('class');
            var zTree = $.fn.zTree.getZTreeObj(options.TreeName.replace("#",""));
        	zTree.expandAll(true);//展开全部节点
         
        },
        error: function (msg) {
            alert(" 数据加载失败！" + msg);
        }
    });
}
function loadmodal(options){
	//初始化参数
	var colName = [];
	
	var colName0 =['操作','id','出库部门','维修部门','入库仓库','售后处理单号','业务流水号','商品编码','商品名称','所属类别'
	               ,'处理方式','品牌','型号','颜色','串号','故障说明','外观描述','备注','入库时间','供应商','服务类型',
	               '所属类别Id','品牌Id','颜色Id','服务类型ID','出库部门id','供应商id','维修部门id','入库仓库id'];
	colName[0] = colName0;
	
	var colName1 =['id','单据编号','送修部门','单据日期','单据数量','已确认数量','未确认数量'];
	colName[1] = colName1;
	
	var JqGridColModel = [];
	var JqGridColModel0 =[
                       {name:'deliveryDo',index:'deliveryDo', width:70,align:'center',formatter: addAndDelete},
	                   {name:'id',index:'id',width:70,align:'center',hidden:true},
	                   {name:'outstorSectionName',index:'outstorSectionName', width:150,align:'center',sorttype:'string'},
	                   {name:'repairSectionName',index:'repairSectionName', width:100,align:'center',sorttype:'string'},
	                   {name:'aftersaleSectionName',index:'aftersaleSectionName', width:100,align:'center',sorttype:'string'},
	                   {name:'billsNo',index:'billsNo', width:200,align:'center',sorttype:'string'},
	                   {name:'flowNo',index:'flowNo', width:200,align:'center',sorttype:'string'},
	                   {name:'code',index:'code', width:150,align:'center',sorttype:'string'},
	                   {name:'name',index:'name', width:150,align:'center',sorttype:'string'},
	                   {name:'goodsCategoryName',index:'goodsCategoryName', width:100,align:'center',sorttype:'string'},
	                   {name:'suggestHandleMode',index:'suggestHandleMode', width:100,align:'center',sorttype:'string',formatter:offerYF},
	                   {name:'goodsBrandName',index:'goodsBrandName', width:100,align:'center',sorttype:'string'},
	                   {name:'goodsModel',index:'goodsModel', width:100,align:'center',sorttype:'string'},
	                   {name:'goodsColorName',index:'goodsColorName', width:100,align:'center',sorttype:'string'},
	                   {name:'imei',index:'imei', width:150,align:'center',sorttype:'string'},
	                   {name:'falutDesc',index:'falutDesc', width:100,align:'center',sorttype:'string'},
	                   {name:'looksDesc',index:'looksDesc', width:100,align:'center',sorttype:'string'},
	                   {name:'remark',index:'remark', width:100,align:'center',sorttype:'string'},
	                   {name:'storageDateString',index:'storageDateString', width:100,align:'center',sorttype:'string'},
	                   {name:'supplierName',index:'supplierName', width:100,align:'center',sorttype:'string'},
	                   {name:'serviceType',index:'serviceType', width:100,align:'center',sorttype:'string',formatter:'select',editoptions:{value:"1:售后;2:售前"}},
	                   
	                   {name:'goodsCategoryId',index:'goodsCategoryId', width:100,align:'center',sorttype:'string',hidden:true},
	                   {name:'goodsBrandId',index:'goodsBrandId', width:100,align:'center',sorttype:'string',hidden:true},
	                   {name:'goodsColorId',index:'goodsColorId', width:100,align:'center',sorttype:'string',hidden:true},
	                   {name:'serviceTypeNa',index:'serviceTypeNa', width:100,align:'center',sorttype:'string',hidden:true},
	                   {name:'outstorSectionName',index:'outstorSectionName', width:100,align:'center',sorttype:'string',hidden:true},
	                   {name:'supplierId',index:'supplierId', width:100,align:'center',sorttype:'string',hidden:true},
	                   {name:'repairSection',index:'repairSection', width:100,align:'center',sorttype:'string',hidden:true},
	                   {name:'aftersaleSectionId',index:'aftersaleSectionId', width:100,align:'center',sorttype:'string',hidden:true}
	                   ];
	JqGridColModel[0]=JqGridColModel0;
	
	var JqGridColModel1 =[
	                      {name:'id',index:'id',width:70,align:'center',hidden:true},
	                      {name:'billsNo',index:'billsNo', width:150,align:'center',sorttype:'string',formatter:billsNoYF},
	                      {name:'outStorSectionName',index:'outStorSectionName', width:100,align:'center',sorttype:'string'},
	                      {name:'billsDate',index:'billsDate', width:100,align:'center',sorttype:'string'},
	                      {name:'billsCount',index:'billsCount', width:200,align:'center',sorttype:'string'},
	                      {name:'doneCount',index:'doneCount', width:200,align:'center',sorttype:'string'},
	                      {name:'waitCount',index:'waitCount', width:150,align:'center',sorttype:'string'}
	                      ];
	JqGridColModel[1]=JqGridColModel1;
	
	//全局当前选择的rowid colid
	var rowid='';
	//var colid='';
	var select_name='';
	var defaults = {
	LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
//	LoadTableUrl: "../../json/afterSale/registrationCard.json",
//	LoadTableUrl:"/manager/afterSalesService/receiveRecord/queryHistory?imei=null",
	GetRowInfoUrl: "", //编辑时获取数据详细信息接口加载地址
	DelRowUrl: "", // 删除信息接口地址
	isSub:"",//是否有子级表格
	subLoadTableUrl:"",//子级表格数据来源地址
	TableName: "#jqGrid_afterMachinReceive", //显示表格名称。遵照css选择器书写
	iconJsonUrl:"../json/icon.json",
	btnbox: ".btnbox ",//功能按钮存放容器。遵照css选择器书写	
	pager:"#jqGridPager_afterMachinReceive",
	TableInfo:"0",
	choose:false
	
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
							root: "rows",
							repeatitems: false
							},
					colNames:colNames,          
		            colModel:JqGridColModel,
		            cellEdit:true,
		            cellsubmit:'clientArray',//单元格保存内容的位置
		            editurl: 'clientArray',
		            sortable:false,			            
		            rownumbers:true,
		            rowNum: 10,
		            rowList: [10, 20, 40],
		            pager:options.pager,
		            viewrecords: true,
		        
		           //  cellEdit:true,
		            width: "100%" ,
		            height: $(window).height()*0.45,
					autowidth:true,
					rownumWidth: 35, // the width of the row numbers columns
					shrinkToFit:false,  //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
					multiselect:options.choose,
					multiboxonly:true,
					ondblClickRow:function(id){
					//双击进入编辑
		   				var delid = id;
					},
					onCellSelect:function(id,index,cellcontent,e){
						var colName=$(options.TableName).jqGrid('getGridParam','colModel')[index].name 
				      	select_name=colName
				      	select_index=index;
				      	rowid=id;
//				      	if(options.TableInfo!=0){
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
						
					},
					beforeSelectRow:function(rowid,e){
                        //单行选择
                          
					},
					afterInsertRow: function (rowid, aData) { //新增一行之后

					},
					gridComplete: function() {
					//	var ids=$(options.TableName).jqGrid("getDataIDs");

					},
					loadComplete:function(data){
						  
					},
					loadError:function(xhr,status,error){
						//console.log(status)
					}
					})
	
		}
		
		function addAndDelete(cellvalue, options, rowObjec){
			var addAndDel = '<div class="operating" data-id="' + options.rowId + '"><span class="glyphicon glyphicon-trash delete" aria-hidden="true" id="add_row" title="删除行"></span></div>';
			return addAndDel;
		}
		//删除一行
			$(document).on('click', '.delete',function(e){
				var thisTitle = $(this).attr("title");
				var rowId = $(this).parent().data('id');
				if(thisTitle == "删除行"){
					console.log('条数:' + $('#jqGrid_Mank tbody tr').length);
					if($('#jqGrid_Mank tbody tr').length === 2) {
						$.zxsaas_plus.showalert("错误","至少保留一条数据!")
						return false;
					}
					$.zxsaas_plus.showconfirm("","是否确定删除本行?",function(){
						$(options.TableName).jqGrid('delRowData', rowId);
					},function(){
						
					});

				}
			});
		
		//建议处理方式
		function offerYF(cellvalue, options, rowObject){
			return '<select class="handleMode suggest' + options.rowId +'" style="border:0;text-align:center;width:80px;height:30px;" ><option value="1">自修</option><option value="2">返厂</option><option value="3">外修</option><option value="4">换机</option><option value="5">退货</option></select>';
		};
}

$(document).ready(function(){
	getStorageWEI();//维修部门下拉
	entrepotYF(); //仓库下拉
});

//引入售后处理单
$(document).on('click','.importYF',function(){
	loadmodal({"TableName":"#jqGrid_import","pager":"#jqGridpager_import","LoadTableUrl":"","TableInfo":"1"});
	var repairSectionId=$('.repairSectionId').val();
	$.request({  
		 	url: '/manager/afterSalesService/receiveMachine/getWaitBills?repairSectionId='+repairSectionId,//请求路径    
		 	async: false, 
		 	dataType:'json',
		 	success: function(data) {
				var dataList = data.data.list;
				$("#jqGrid_import").jqGrid('clearGridData');
				for(var i = 0,len = dataList.length;i<len;i ++){
					$("#jqGrid_import").jqGrid('addRowData',i,dataList[i],'last');
				}
		 	},
		 	error:function(){
		 		$.zxsaas_plus.showalert("错误","error!")
		 	}
	 	});
})
function billsNoYF(cellvalue, options, rowObject){
   return '<span class="bill" data-dismiss="modal">' + cellvalue + '</span>';
}
var billyf='';
$(document).on('click','.bill',function(){
	billyf=$(this).text();
	$.request({  
	 	url: '/manager/afterSalesService/receiveMachine/importBills?billsNo='+billyf,//请求路径    
	 	async: false, 
	 	dataType:'json',
	 	success: function(data) {
		
			var repairSectionName=$('.repairSectionId option:selected').text();
			var entrepotYF=$('.entrepotYF option:selected').text();
			var dataList = data.data.list;
			$("#jqGrid_afterMachinReceive").jqGrid('clearGridData');
			for(var i = 0,len = dataList.length;i<len;i ++){
				var second = dataList[i].attrs.tgoodsname;
				var arr={
						'id':dataList[i].id,
						'outstorSectionId':dataList[i].outstorSectionId,
						'outstorSectionName':dataList[i].outstorSectionName,
						'repairSection':dataList[i].repairStatus,
						'aftersaleSectionId':dataList[i].aftersaleSectionId,
						'billsNo':dataList[i].billsNo,
						'flowNo':dataList[i].flowNo,
						'code':second.code,
						'name':second.name,
						'goodsCategoryName':second.goodsCategoryName,
						'suggestHandleMode':dataList[i].suggestHandleMode,
						'goodsBrandName':second.goodsBrandName,
						'goodsModel':second.goodsModel,
						'goodsColorName':second.goodsColorName,
						'imei':dataList[i].imei,
						'falutDesc':dataList[i].falutDesc,
						'looksDesc':dataList[i].looksDesc,
						'remark':dataList[i].remark,
						'updateTimeString':second.updateTimeString,
						'serviceType':dataList[i].serviceType,
						'supplierName':dataList[i].supplierName,
						'supplierId':dataList[i].supplierId,
						
						'goodsBrandId':second.goodsBrandId,
						'goodsCategoryId':second.goodsCategoryId,
						'goodsColorId':second.goodsColorId
				}
				
				$("#jqGrid_afterMachinReceive").jqGrid('addRowData',(i+1),arr,'last');
				
				$('#jqGrid_afterMachinReceive').jqGrid('setCell',i+1,'repairSectionName',repairSectionName);
				$('#jqGrid_afterMachinReceive').jqGrid('setCell',i+1,'aftersaleSectionName',entrepotYF);
			}
	 	},
	 	error:function(){
	 		$.zxsaas_plus.showalert("错误","error!")
	 	}
 	});
});

//回车查询
$(document).on('keydown','.fasttips',function(event){
	if(event.keyCode==13){
	    quick();
	}
});
function quick(){
	    var flag=1;
		if($('.flag1').prop('checked')==true){
			flag;
		}else{                                                           
			flag=2;
		}
		var no=$('.fasttips').val();
		var repairSectionId=$('.repairSectionId').val();
		$.request({  
			 	url: '/manager/afterSalesService/receiveMachine/query?flag='+flag+'&no='+no+'&repairSectionId='+repairSectionId,//请求路径    
			 	async: false, 
			 	dataType:'json',
			 	success: function(data) {   
					var repairSectionName=$('.repairSectionId option:selected').text();
					var entrepotYF=$('.entrepotYF option:selected').text();
				
					var dataList = data.data.list;
					$("#jqGrid_afterMachinReceive").jqGrid('clearGridData');
					for(var i = 0,len = dataList.length;i<len;i ++){
						var second = dataList[i].attrs.tgoodsname;
						var arrLlist = {
								'id':dataList[i].id,
								'outstorSectionId':dataList[i].outstorSectionId,
								'outstorSectionName':dataList[i].outstorSectionName,
								'repairSection':dataList[i].repairStatus,
								'aftersaleSectionId':dataList[i].aftersaleSectionId,
								'billsNo':dataList[i].billsNo,
								'flowNo':dataList[i].flowNo,
								'code':second.code,
								'name':second.name,
								'goodsCategoryName':second.goodsCategoryName,
								'suggestHandleMode':dataList[i].suggestHandleMode,
								'goodsBrandName':second.goodsBrandName,
								'goodsModel':second.goodsModel,
								'goodsColorName':second.goodsColorName,
								'imei':dataList[i].imei,
								'falutDesc':dataList[i].falutDesc,
								'looksDesc':dataList[i].looksDesc,
								'remark':dataList[i].remark,
								'updateTimeString':second.updateTimeString,
								'serviceType':dataList[i].serviceType,
								'supplierName':dataList[i].supplierName,
								'supplierId':dataList[i].supplierId,
								
								'goodsBrandId':second.goodsBrandId,
								'goodsCategoryId':second.goodsCategoryId,
								'goodsColorId':second.goodsColorId
						};
						$("#jqGrid_afterMachinReceive").jqGrid('addRowData',(i+1),arrLlist,'last');
						
						$('#jqGrid_afterMachinReceive').jqGrid('setCell',i+1,'repairSectionName',repairSectionName);
						$('#jqGrid_afterMachinReceive').jqGrid('setCell',i+1,'aftersaleSectionName',entrepotYF);
					}
			 	},
			 	error:function(){
			 		
			 	}
		 	});
};

$(document).on('change','.storageId',function(){
	var storageId=$('.storageId option:selected').text();
	var dataQ=$('#jqGrid_afterMachinReceive').getDataIDs();
	for(var i=0,len=dataQ.length;i<len;i++){
		$('#jqGrid_afterMachinReceive').jqGrid('setCell',i+1,'aftersaleSectionName',storageId);
	}
});

//保存
$(document).on('click','.saveData',function(){
	var data ="";
	var rows = $('#jqGrid_afterMachinReceive').jqGrid('getDataIDs');
	if(rows==""){
		$.zxsaas_plus.showalert("错误","接收失败!")
	}else{
		 data = tableData();
	}
//	var data = tableData();
	$.request({  
	 	url: '/manager/afterSalesService/receiveMachine/save',//请求路径  
	 	dataType:'json',
	 	contentType:'application/json;charset=utf-8',
	 	data:JSON.stringify(data),
	 	type:'POST',
	 	success: function(data) { 
			(data.result == 1) && ($.zxsaas_plus.showalert("","接收成功!"))
			if(data.result == -999){
				$.zxsaas_plus.showalert("错误","接收失败!")
			}
		//	console.log(rows)
	 	},
	 	error:function(){
	 		$.zxsaas_plus.showalert("","错误!")
	 	}
 	});
});

var tableData =function(){
	var arrtable=[];
	var rowIds = $('#jqGrid_afterMachinReceive').jqGrid('getDataIDs');
	var storageId=$('.storageId option:selected').val();
	var repairSection=$('.repairSectionId option:selected').val();
 	for(var i = 0 ;i < rowIds.length;i++){
 		var rows = $("#jqGrid_afterMachinReceive").jqGrid("getRowData", rowIds[i]);
 		//var suggest=$('.suggest'+rows.id+' option:selected').val();
 		var suggest=$('.handleMode option:selected').val();
 		
 		arrtable.push({"billsNo":rows.billsNo,"imei":rows.imei,"flowNo":rows.flowNo,"repairSection":repairSection,"storageId":storageId,"handleMode":suggest,"remark":rows.remark});
 	}
 	return arrtable;
}



//维修部门下拉
function getStorageWEI(){
	$.request({  
	 	url: '/manager/afterSalesCommon/getRepairSections',//请求路径  
	 	async: false,  
	 	success: function(data) {   
	 		for(var i = 0,len = data.data.sectionList.length;i < len;i ++){
	 			countries = data.data.sectionList[i];
	 			$('.repairSectionId').append("<option value='"+countries.id+"' selected>"+countries.name+"</option>");
	 		}
	 	},
	 	error:function(){
	 		$.zxsaas_plus.showalert("","error!")
	 	}
	 	});
	
};

//仓库下拉
function entrepotYF(){
	$.request({  
	 	url: '/manager/afterSalesCommon/getStorages',//请求路径  
	 	async: false,  
	 	success: function(data) {   
	 		for(var i = 0,len = data.data.storageList.length;i < len;i ++){
	 			countries = data.data.storageList[i];
	 			$('.entrepotYF').append("<option value='"+countries.id+"' selected>"+countries.name+"</option>");
	 		}
	 	},
	 	error:function(){
	 		$.zxsaas_plus.showalert("","error!")
	 	}
	 	});
	
};

$(document).on('click','.emptyYF',function(){
	$('.fasttips').val('');
	$('#jqGrid_afterMachinReceive').clearGridData();
})













