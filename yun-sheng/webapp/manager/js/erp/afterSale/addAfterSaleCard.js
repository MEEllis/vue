//初始化参数
var outstorSectionId,aftersaleSectionId,positionId,remCode,managerId;
var imeiArr=[];
var params={};
$('.quickSHOU1').focus(function(){
	if(outstorSectionId){
		$('.imeiError').hide();
	}else{
		$.zxsaas_plus.showalert("提示","请先选择出库部门");
	}
})

$(document).on('click','.demandYF',function(){
	window.location.href="/manager/afterSalesService/serviceHandle/page";
})


$(document).ready(function(){
	$("#dataGrid").jqGrid('clearGridData');
	$('.ui-jqgrid-sdiv').hide();
})

$('.quickSHOU1').keydown(function(e){
	if(e.keyCode==13){
		fastSearch($('.quickSHOU1').val())
	}
});
var isOver=true;
function fastSearch(value){
	$("#afterSales").data('bootstrapValidator').validate();
	if(!$("#afterSales").data('bootstrapValidator').isValid()){
		refreshValidatorField("#afterSales");
		return;
	}
	if(value.trim() != '' && imeiArr.indexOf(value.trim())==-1 && isOver){
		isOver=false;
		$.ajax( {
			type : 'post',
			url : '/manager/afterSalesService/serviceHandle/selectGoodsInfoByImeiStorageId',
			dataType : "json", // 可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
			data:{
				outstorSectionId:outstorSectionId,
				imei:value.trim()
			},
			success : function(data) {
				isOver=true;
				if(data.data.imeiGoodsInfo != null){
					imeiArr.push(value.trim());
					var info=data.data.imeiGoodsInfo;
					info.repairStatus="未接机";
					info.serviceType='售前';
					info.suggestHandleMode='返厂';
					$("#dataGrid").jqGrid('addRowData',MyEiditGrid.getMaxRowid($("#dataGrid"))+1,info);
					
				}else{
					$('.imeiError').show();
				}
				
			},
			error : function(msg) {
				$.zxsaas_plus.showalert(" 数据加载失败！" + msg);
			}
		});
	}else{
		if(value!=''){
			$.zxsaas_plus.showalert("提示","该串号已录入");
		}
		
	}
}

function toAfterSale(){
		$('#dataGrid').jqGrid('saveCell',lastrow,lastcel)
		var param={};
		param.outstorSectionId=outstorSectionId;
		param.aftersaleSectionId=aftersaleSectionId;
		param.managerId=managerId;
		var aftersaleHandleDtlList=[];
		var dataIds=$('#dataGrid').jqGrid('getDataIDs');
		if(dataIds.length>0){
			$.each(dataIds,function(i,rowid){
				var rowData=$("#dataGrid").jqGrid('getRowData', rowid);
				if(rowData.imeiId!=null && rowData.imeiId!=""){
					delete rowData.op;
					delete rowData.contactUnitName;
					rowData.repairStatus=1;
					rowData.serviceType=2;
					rowData.storageDate=rowData.storageDateString;
					delete rowData.storageDateString;
					rowData.suggestHandleMode=rowData.suggestHandleMode == "返厂" ? 2 : 3;
					aftersaleHandleDtlList.push(rowData);
				}
			})
		}
		param.aftersaleHandleDtlList=aftersaleHandleDtlList;
		$("#afterSales").data('bootstrapValidator').validate();
		if($("#afterSales").data('bootstrapValidator').isValid() && param.aftersaleHandleDtlList.length !=0){
			$.ajax( {
				type : 'post',
				contentType :'application/json', 
				url : '/manager/afterSalesService/serviceHandle/saveAftersaleHandle',
				dataType : "json", // 可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
				data:JSON.stringify(param),
				success : function(data) {
					imeiArr=[]
					$("#dataGrid").jqGrid('clearGridData');
					$.zxsaas_plus.showalert("提示",data.desc);
				},
				error : function(msg) {
					$.zxsaas_plus.showalert(" 数据加载失败！" + msg);
				}
			});
		
		}else if(!$("#afterSales").data('bootstrapValidator').isValid()){
			
		}else{
			$.zxsaas_plus.showalert("提示","没有对应单据");
		}
}


initDataGrid()
var lastrow,lastcel;
function initDataGrid(){
	//配置
	var paras = {
	    gridId:'dataGrid', 
	    addRow:{serviceType:'售前',repairStatus:'未接机',suggestHandleMode:'返厂'},
	    colNames:['id','billsMainId','flowNo','goodsId','imeiId','storageId','supplierId','costPrice'
	              ,'商品编码', '仓库','商品名称','所属类别','品牌','型号','颜色','串号','故障说明','外观描述','建议处理方式','备注','storageDate','入库时间','供应商','服务类型','手机状态'], 
	    colModel:
	    	[
				{name :'id',index : 'id',align:'center',sortable: false,hidden:true},
				{name :'billsMainId',index : 'billsMainId',align:'center',sortable: false,hidden:true},
				{name :'flowNo',index : 'flowNo',align:'center',sortable: false,hidden:true},
				{name :'goodsId',index : 'goodsId',align:'center',sortable: false,hidden:true},
				{name :'imeiId',index : 'imeiId',align:'center',sortable: false,hidden:true},
				{name :'storageId',index : 'storageId',align:'center',sortable: false,hidden:true},
				{name :'supplierId',index : 'supplierId',align:'center',sortable: false,hidden:true},
				{name :'costPrice',index : 'costPrice',align:'center',sortable: false,hidden:true},
	             {name:'goodsCode',index:'goodsCode', align:'center',sorttype:"string",sortable: false}, 
	             {name :'storageName',index : 'storageName',align:'center',sortable: false},
	             {name :'goodsName',index : 'goodsName',align:'center'},
	             {name:'goodsClassName',index:'goodsClassName', width:100,align:'center', sorttype:'string',sortable: false},
	             {name:'goodsBrandName',index:'goodsBrandName', width:100,align:'center', sorttype:'string',sortable: false},
				 {name:'goodsModel',index:'goodsModel', width:100,align:'center', sorttype:'string',sortable: false},
				 {name:'goodsColorName',index:'goodsColorName', width:80,align:'center', sorttype:'string',sortable: false},
				 {name:'imei',index:'imei', width:80,align:'center', sorttype:'string',sortable: false},
				 {name :'falutDesc',sortable: false,index : 'falutDesc',align:'center',edittype:'text',editable:true},
	             {name : 'looksDesc',index : 'looksDesc',align:'center',edittype:'text',editable:true},
	             {name : 'suggestHandleMode',index : 'suggestHandleMode',editable:true,sortable: false,align:'center',edittype:'select', editoptions:{value:"1:返厂;2:外修"}},
	             {name : 'remark',index : 'remark',editable:true,sortable: false,align:'center'},
	             {name : 'storageDate',index : 'storageDate',sortable: false,align:'center',hidden:true},
	             {name : 'storageDateString',index : 'storageDateString',sortable: false,align:'center'},
	             {name : 'supplierName',index : 'supplierName',sortable: false,align:'center'},
	             {name : 'serviceType',index : 'serviceType',sortable: false,align:'center'},
	             {name : 'repairStatus',index : 'repairStatus',align:'center'},
           ],
           height:$(window).height()*0.5,
           width: "100%" ,
//           noShowOp:false
	};
	//回调函数
	var callBackList = {
			
			summary:function(info){
				imeiArr.splice(imeiArr.indexOf(info.imei),1);
				console.log(imeiArr);
			},
			onCellSelect:function(rowid,iCol,cellcontent,e){
				lastrow=rowid;lastcel=iCol
				
			}
	};
	dataGrid = new MyEiditGrid(paras,callBackList);
}

//出库部门树
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
	            			if(data.id=='ckSection'){
	            				imeiArr=[];
	            				$('#ckSectionName').val(treeNode.name);
	            				outstorSectionId=treeNode.obj.id;
	            				params.outstorSectionId=outstorSectionId;
	            				refreshValidatorField("outStorSectionName",'#afterSales');
		            			$("#sectionModal").modal('hide');
	            			}else{
	            				
	            				$('#managerUname').val('');
	            				managerId=null;
	            				$('#rkSectionName').val(treeNode.name);
		            			aftersaleSectionId=treeNode.obj.id;
		            			params.aftersaleSectionId=aftersaleSectionId;
		            			refreshValidatorField("afterSaleSectionName",'#afterSales');
		            			refreshValidatorField("managerUname",'#afterSales');
		            			$("#sectionModal").modal('hide');
	            			}
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
//弹出经手人模态框
function showManagerModal(){
	if(aftersaleSectionId){
		reloadManagerGrid(aftersaleSectionId);
		$("#managerModal").modal("show");
	}else{
		$.zxsaas_plus.showalert("提示","请先选择售后部门名称!");
	}
	
}
//经手人grid
managerGrid()
function managerGrid(){
	var options = {
			LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
			iconJsonUrl:"../json/icon.json",
			TableName: "#managerModalGrid", //显示表格名称。遵照css选择器书写
			LoadTableUrl:'/manager/tree/getManagerList',
			btnbox: ".btnbox ",//功能按钮存放容器。遵照css选择器书写	
			pager:"#managerGridpager",
	};
	
	$.jgrid.defaults.width = 1280;
	$.jgrid.defaults.responsive = true;
	$.jgrid.defaults.styleUI = 'Bootstrap';	
	var colNames = ['ID','员工编码','员工名称','所属部门','职位名称'];
	var JqGridColModel=[
						{name:'id',index:'id', width:1,align:'center', sorttype:'string',hidden:true},
						{name:'code',index:'code', width:100,align:'center', sorttype:'string',sortable:false},
						{name:'name',index:'name', width:100,align:'center', sorttype:'string',sortable:false},
						{name:'sectionName',index:'sectionName', width:100,align:'center', sorttype:'string',sortable:false},
						{name:'positionName',index:'positionName', width:100,align:'center', sorttype:'string',sortable:false},
	                ];
	loadtable();
	function loadtable(){
			$(options.TableName).jqGrid({
				url:options.LoadTableUrl,
				mtype:"GET",
				datatype: "json",
				jsonReader  : {	
					root: "data.rows",
					page: "data.page",
			        total: "data.total",
			        records: "data.records",
					repeatitems: false
						},
				colNames:colNames,          
	            colModel:JqGridColModel,
	            sortable:false,			            
	            rownumbers:true,
	            viewrecords: true,
	            pager:options.pager,
	            width: "90%" ,
				autowidth:true,
				rownumWidth:40,
				shrinkToFit:false,
				ondblClickRow:function(rowid,iRow,iCol,e){
					
					var name=$(options.TableName).getRowData(rowid).name;
					managerId=$(options.TableName).getRowData(rowid).id;
					params.managerId=managerId;
					$('#managerUname').val(name);	
					refreshValidatorField("managerUname",'#afterSales');
					$("#managerModal").modal("hide");
				}
			})
			jQuery(options.TableName).jqGrid('setLabel',0, '序号');
	}
}



//加载经手人grid
function reloadManagerGrid(sectionId){
	 $("#managerModalGrid").jqGrid('setGridParam', {
	    url:'/manager/tree/getManagerList',
		datatype : 'json',
		postData :{"positionId":positionId,"remCode":remCode,"sectionId":aftersaleSectionId},
		page : 1
	}).trigger("reloadGrid");
}


//经办人查询参数改变事件
$(document).delegate("#positionSelect,#managerRemCode", "input propertychange", function(e){
	var id=e.target.id
	if(id=="positionSelect"){
		positionId=$(this).val();
	}else if(id=="managerRemCode"){
		remCode=$(this).val();
	}
	reloadManagerGrid();
});

////获取职位信息
//function getPosition(){
//	$.ajax({
//		type: 'Get',
//        url: '/manager/tree/getPositionList',
//        dataType: "json",
//        success: function (data) {
//          var positionList=data.data.positionList;
//          if(positionList.length>0){
//        	  $.each(positionList,function(i,value){
//        		  $("#positionSelect").append("<option value='"+value.id+"'>"+value.name+"</option>")
//        	  });
//          }
//        },
//        error: function (msg) {
//        	$.zxsaas_plus.showalert("提示","数据加载失败,请稍后重试!");
//        }
//	});
//}

function refreshValidatorField(fieldName,formId){
	$(formId).data('bootstrapValidator').updateStatus(fieldName, 'NOT_VALIDATED').validateField(fieldName); 
}

$('#afterSales').bootstrapValidator({
	feedbackIcons:{
		valid : 'glyphicon glyphicon-ok',
		invalid : 'glyphicon glyphicon-remove',
		validating : 'glyphicon glyphicon-refresh'
	},
	fields:{
		outStorSectionName:{
			validators:{
				notEmpty:{
					message:'字段必填'
				}
			},
		},
		afterSaleSectionName:{
			validators:{
			  	notEmpty: {
            		message: '字段必填'
	            },
	           
			},
		},
		managerUname:{
			validators:{
				notEmpty:{
					message:'字段必填'
				}
			},
		}
	}
})



