//初始化参数
var createDateBegin,createDateEnd,billsNoBegin,billsNoEnd,refBillsId,sxstorSectionId;
var imeiArr=[];

var queryCodeStr="L";

$("#createDateBegin").datetimepicker({
    lang:"ch",           //语言选择中文
    format:"Y-m-d",      //格式化日期
    timepicker:false,    //关闭时间选项
    todayButton:false  ,  //关闭选择今天按钮
    value:new Date(parseInt(new Date().setDate(1))).toLocaleString(),
    maxDate:new Date()
});
$("#createDateEnd").datetimepicker({
	lang:"ch",           //语言选择中文
    format:"Y-m-d",      //格式化日期
    timepicker:false,    //关闭时间选项
    todayButton:false ,   //关闭选择今天按钮
    value:new Date(),
    maxDate:new Date()
});

$(document).on('blur','#createDateBegin,#createDateEnd',function(e){
	var startTime = new Date($('#createDateBegin').val().replace(/\-/g,'/'));
	var endTime = new Date($('#createDateEnd').val().replace(/\-/g,'/'));
	var flag = (endTime < startTime) ? false : true;
	if(!flag){  
	    $.zxsaas_plus.showalert("提示","结束日期必须晚于开始日期！");
		$(this).val('');
	    return;  
	}  
});

$(document).ready(function(){
	searchAfterSaleCard();
	$('.ui-jqgrid-sdiv').hide();
	$('.afterSaleReturn').hide();
	$("#searchDataGrid").jqGrid('clearGridData');
})

$(document).on('click','.hiddeXIN',function(){
	window.location.href="/manager/afterSalesService/serviceHandle/editPage";
});

$('.cxQueryYF').click(function(){
	createDateBegin=$('#createDateBegin').val();
	createDateEnd=$('#createDateEnd').val();
	billsNoBegin=$('#billsNoBegin').val();
	billsNoEnd=$('#billsNoEnd').val();
	queryCodeStr="L";
	searchAfterSaleCard();
})

//首单
function firstBill(){
	queryCodeStr="F";
	searchAfterSaleCard();
}
//末单
function lastBill(){
	queryCodeStr="L";
	searchAfterSaleCard();
}
//上一单
function prevBill(){
	if(queryCodeStr=="F"){
		$.zxsaas_plus.showalert("提示" ,"当前已是第一单！");
	}else{
		queryCodeStr="P";
		searchAfterSaleCard();
	}
}
//下一单
function nextBill(){
	if(queryCodeStr=="L"){
		$.zxsaas_plus.showalert("提示" ,"当前已是最后一单！");
	}else{
		queryCodeStr="N";
		searchAfterSaleCard();
	}
}

$('.changeYF1').click(function(){
	$('.toAfterSale').show();
	$('.afterSaleReturn').hide();
})
$('.changeYF2').click(function(){
	$('.afterSaleReturn').show();
	$('.toAfterSale').hide();
	
})
$('.fasttips').focus(function(){
	if(sxstorSectionId){
		
	}else{
		$.zxsaas_plus.showalert("提示","请先选择送修部门");
	}
})

function fasttips(value){
	
	if(value != '' && imeiArr.indexOf(value)==-1 ){
		var param={
				outstorSectionId:sxstorSectionId,
				imei:value
		}
		$.ajax( {
			type : 'post',
			contentType :'application/json', 
			url : '/manager/afterSalesService/serviceHandle/selectAfterSaleQuickReceive',
			dataType : "json", // 可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
			data:JSON.stringify(param),
			success : function(data) {
				var billInfo=data.data.list
				if(billInfo!=null){
					
					if(billInfo.length>0){
						imeiArr.push(value);
						billInfo.searchData=value;
						$.each(billInfo,function(i,value){
							var getId = $("#searchDataGrid").jqGrid('getDataIDs');
							$("#searchDataGrid").jqGrid('addRowData',getId.length,value);
						})
					}else{
						$.zxsaas_plus.showalert("提示","未查询到单据信息");
					}
				}else{
					$.zxsaas_plus.showalert("提示","未查询到单据信息");
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



function searchAfterSaleCard(){
	var param={}
	param.queryCodeStr=queryCodeStr;
	param.refBillsId=refBillsId;
	param.createDateBegin=createDateBegin;
	param.createDateEnd=createDateEnd;
	param.billsNoBegin=billsNoBegin;
	param.billsNoEnd=billsNoEnd;
	$.ajax( {
		type : 'post',
		url : '/manager/afterSalesService/serviceHandle/selectAfterSaleHandleMain',
		contentType :'application/json', 
		dataType : "json", // 可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
		data:JSON.stringify(param),
		success : function(data) {
			var billInfo=data.data.aftersaleHandleMain
			if(billInfo!=null){
				$("#dataGrid").jqGrid('clearGridData');
				refBillsId=billInfo.id;
				$('.billsNo').val(billInfo.billsNo);
				$('.aftersaleSectionName').val(billInfo.aftersaleSectionName);
				$('.managerName').val(billInfo.managerName);
				$('.outstorSectionName').val(billInfo.outstorSectionName);
				var info=data.data.aftersaleHandleMain.aftersaleHandleDtlList;
				if(info.length>0){
					$.each(info,function(i,value){
						$("#dataGrid").jqGrid('addRowData',[i],value);
					})
				}else{
					if(queryCodeStr=='P'){
						$.zxsaas_plus.showalert("提示","已经是第一单了");
					}
					if(queryCodeStr=='N'){
						$.zxsaas_plus.showalert("提示","已经是最后一单了");
					}
//					$("#dataGrid").jqGrid('clearGridData');
//					$.zxsaas_plus.showalert("提示","未查询到单据信息");
				}
			}else{
				if(queryCodeStr=='P'){
					$.zxsaas_plus.showalert("提示","已经是第一单了");
				}
				if(queryCodeStr=='N'){
					$.zxsaas_plus.showalert("提示","已经是最后一单了");
				}
//				$("#dataGrid").jqGrid('clearGridData');
//				$.zxsaas_plus.showalert("提示","未查询到单据信息");
			}
		},
		error : function(msg) {
			$.zxsaas_plus.showalert(" 数据加载失败！" + msg);
		}
	});
}



initDataGrid()
initSearchDataGrid()
function initDataGrid(){
	//配置
	var paras = {
	    gridId:'dataGrid', 
	    colNames:['商品编码','仓库','商品名称','所属类别','品牌','型号','颜色','串号',
	               '故障说明','外观描述','建议处理方式','备注','入库时间','供应商','业务流水号','服务类型','手机状态'], 
	    colModel:
	    	[
               {name:'goodsCode',index:'goodsCode', width:250,align:'center',sorttype:'string',sortable:false},
               {name:'storageName',index:'storageName', width:150,align:'center',sorttype:'string',sortable:false},
               {name:'goodsName',index:'goodsName', width:180,align:'center',sorttype:'string',sortable:false},
               {name:'goodsClassName',index:'goodsClassName', width:150,align:'center',sortable:false,sorttype:'string'},
               {name:'goodsBrandName',index:'goodsBrandName', width:100,align:'center',sortable:false,sorttype:'string'},
               {name:'goodsModel',index:'goodsModel', width:100,align:'center',sortable:false,sorttype:'string'},
               {name:'goodsColorName',index:'goodsColorName', width:100,align:'center',sortable:false,sorttype:'string'},
               {name:'imei',index:'imei', width:250,align:'center',sorttype:'string',sortable:false},
               {name:'falutDesc',index:'falutDesc', width:150,align:'center',sorttype:'string',sortable:false,},
               {name:'looksDesc',index:'looksDesc', width:130,align:'center',sorttype:'string',sortable:false,},
               {name:'suggestHandleMode',index:'suggestHandleMode', width:150,align:'center',sorttype:'string',sortable:false,formatter:
            	   function(cellvalue, options, rowObject){
            	   		if(cellvalue=="2"){
            	   			return "返厂";
            	   		}else{
            	   			return "外修";
            	   		}
            	   }
               },
               {name:'remark',index:'remark', width:150,align:'center',sorttype:'string',sortable:false,},
               {name:'storageDateString',index:'storageDateString', width:150,align:'center',sorttype:'string',sortable:false},
               {name:'supplierName',index:'supplierName', width:150,align:'center',sorttype:'string',sortable:false},
               {name:'flowNo',index:'flowNo', width:250,align:'center',sorttype:'string',sortable:false},
               {name:'serviceType',index:'serviceType', width:150,align:'center',sorttype:'string',sortable:false,formatter:function(){return "售前"}},
               {name:'repairStatusContent',index:'repairStatusContent', width:150,align:'center',sorttype:'string',sortable:false}
           ],
           height:$(window).height()*0.5,
           noShowOp:false,
           width:"100%",
           shrinkToFit:false
	};
	//回调函数
	var callBackList = {
			 
	};
	dataGrid = new MyEiditGrid(paras,callBackList);
	$('.jqGrid_wrap div').css('width','auto');
}

//确认返回按钮单击事件
$(".afterSaleReturn").click(function(e){
	if(sxstorSectionId){
		var array=[];
		var dataIds=$('#searchDataGrid').jqGrid('getDataIDs');
		if(dataIds.length>0){
			$.each(dataIds,function(i,rowid){
				var rowData=$("#searchDataGrid").jqGrid('getRowData', rowid);
				rowData.inStorageId=$("#rkSectionName").val();
				delete rowData.op;
				array.push(rowData);
			});
			console.log(array);
			$.ajax({
				url:"/manager/afterSalesService/serviceHandle/confirmAfterSaleReturn",
				type : 'POST',  
				dataType: "json",
				data:JSON.stringify(array),
				contentType :'application/json', 
				success:function(data){
				   $.zxsaas_plus.showalert("提示",data.desc);
				   $("#searchDataGrid").jqGrid("clearGridData");
			    }
			});
		}else{
			$.zxsaas_plus.showalert("提示","未查询到数据");
		}
		
	}else{
		 $.zxsaas_plus.showalert("提示","请先选择送修部门");
	}
});

function initSearchDataGrid(){
	//配置
	var paras = {
	    gridId:'searchDataGrid', 
	    colNames:['id','售后部门Id','送修部门Id','售后部门','送修部门','售后处理单号','业务流水号','商品名称','型号','品牌','原颜色','外观描述','新主串','原主串','新辅串','原辅串','故障说明','往来单位','公司','集团'],
	    colModel:
	    	[
               {name:'id',index:'id', width:150,align:'center',sorttype:'string',sortable:false,hidden:true},
	    	   {name:'repairSectionId',index:'repairSectionId', width:150,align:'center',sorttype:'string',sortable:false,hidden:true},
	    	   {name:'outstorSectionId',index:'outstorSectionId', width:150,align:'center',sorttype:'string',sortable:false,hidden:true},
               {name:'repairSectionName',index:'repairSectionName', width:150,align:'center',sorttype:'string',sortable:false},
               {name:'outstorSectionName',index:'outstorSectionName', width:150,align:'center',sorttype:'string',sortable:false},
               {name:'billsNo',index:'billsNo', width:250,align:'center',sortable:false,sorttype:'string'},
               {name:'flowNo',index:'flowNo', width:250,align:'center',sortable:false,sorttype:'string'},
               {name:'goodsName',index:'goodsName', width:100,align:'center',sortable:false,sorttype:'string'},
               {name:'goodsClassName',index:'goodsClassName', width:100,align:'center',sortable:false,sorttype:'string'},
               {name:'goodsBrandName',index:'goodsBrandName', width:100,align:'center',sorttype:'string',sortable:false},
               {name:'goodsColorName',index:'goodsColorName', width:130,align:'center',sorttype:'string',sortable:false,},
               {name:'looksDesc',index:'looksDesc', width:150,align:'center',sorttype:'string',sortable:false,},
               {name:'newImeiStr',index:'newImeiStr', width:200,align:'center',sorttype:'string',sortable:false,},
               {name:'imei',index:'imei', width:200,align:'center',sorttype:'string',sortable:false},
               {name:'newAuxiliaryImei',index:'newAuxiliaryImei', width:200,align:'center',sorttype:'string',sortable:false},
               {name:'auxiliaryImei',index:'auxiliaryImei', width:200,align:'center',sorttype:'string',sortable:false},
               {name:'falutDesc',index:'falutDesc', width:150,align:'center',sorttype:'string',sortable:false},
               {name:'supplierId',index:'supplierId', width:150,align:'center',sorttype:'string',sortable:false,hidden:true},
               {name:'groupId',index:'groupId', width:150,align:'center',sorttype:'string',sortable:false,hidden:true},
               {name:'companyId',index:'companyId', width:150,align:'center',sorttype:'string',sortable:false,hidden:true},
           ],
           height:$(window).height()*0.5,
//           noShowOp:false
	};
	//回调函数
	var callBackList = {
			deleteCallBack:function(){
				imeiArr=[]
			},
			summary:function(info){
				
				imeiArr=imeiArr.splice(imeiArr.indexOf(info.imei),1);
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
	            			if(data.id=='sxSection'){
	            				$("#searchDataGrid").jqGrid('clearGridData');
	            				imeiArr=[];
	            				$('#sxSectionName').val(treeNode.name);
	            				sxstorSectionId=treeNode.obj.id;
	            				refreshValidatorField("sxSectionName",'#inquire_option');
	            				getStorage()
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

//获取仓库名称下拉框
var storageList =new Array();

function getStorage(){
	$.ajax({
		url:"/manager/salesCommon/getStorages",
		type : 'GET',  
		dataType: "json",
		async:false,
		data:{"sectionId":sxstorSectionId},
		contentType :'application/json', 
		success:function(data){
		  if(data.result==1){
			  storageList=data.data.storageList;
			  //$("#storageId").find("option:not(:first)").remove();
			  $("#rkSectionName").html("");
			  if(storageList.length>0){
				  $.each(storageList,function(i,value){
					  $("#rkSectionName").append("<option value='"+value.id+"'>"+value.name+"</option>");
				  });
				  
			  }
		  }
	    }
	});
}

function refreshValidatorField(fieldName,formId){
	$(formId).data('bootstrapValidator').updateStatus(fieldName, 'NOT_VALIDATED').validateField(fieldName); 
}

$('#inquire_option').bootstrapValidator({
	feedbackIcons:{
		valid : 'glyphicon glyphicon-ok',
		invalid : 'glyphicon glyphicon-remove',
		validating : 'glyphicon glyphicon-refresh'
	},
	fields:{
		sxSectionName:{
			validators:{
				notEmpty:{
					message:'字段必填'
				}
			},
		},
		rkSectionName:{
			validators:{
			  	notEmpty: {
            		message: '字段必填'
	            },
	           
			},
		},
		
	}
})