//初始化参数
var repairSectionId,aftersaleHandleDtlList,_chooseId;
var imeiArr=[];
var flowNoArr=[];
var delArr = "";

$(document).ready(function(){
	$("#dataGrid").jqGrid('clearGridData');
	$('.ui-jqgrid-sdiv').hide();
})

function sureReceive(){
	
		if(repairSectionId==undefined){
			$.zxsaas_plus.showalert("提示","请选择维修部门");
			return;
		}
		var ids=$("#dataGrid").getDataIDs();
		
		if(ids.length==0){
			$.zxsaas_plus.showalert("提示","无明细数据");
			return
		}
		
		
		var checkedIdList=[];
		$.each(ids, function (i,value) {
			var row = $("#dataGrid").jqGrid('getRowData', value );
			checkedIdList.push(row.id);
		 });
		
		$.request({
			url:"/manager/afterSalesService/receiveMachine/confirmReceive",
		    type: "POST",
		    data: {"checkedIdList": checkedIdList,"inStorageId":$("#rkSectionName").val()},
		    traditional: true,
		    success: function(data) {
		    	if(data.result==1){
		    		$.zxsaas_plus.showalert("提示",data.desc);
		    		$("#dataGrid").jqGrid('clearGridData')
		    	}else{
		    		$.zxsaas_plus.showalert("提示",data.desc);
		    	}
		    }
		});
	
}

function emptyAll(){
	
	$("#dataGrid").jqGrid('clearGridData');
	$('.fasttips,#ckSectionName,#rkSectionName').val('');
	repairSectionId='';
}

function importDataList(){
	if(repairSectionId){
		importDataGrid();
		$('#importChoose').modal('show')
	}else{
		
		$.zxsaas_plus.showalert("提示","请先选择维修部门");
		return;
	}
}

$('.fasttips').focus(function(){
	if(repairSectionId){}else{
		$.zxsaas_plus.showalert("提示","请先选择维修部门");
		$('.fasttips').blur();
	}
})

$(document).on('keydown','.fasttips',function(event){
	if(event.keyCode==13){
		$('.fasttips').blur();
		return;
	}
});

function fasttips(value){
	for (x in imeiArr){
		if(imeiArr[x] == delArr){
			imeiArr.splice(x,1);
			delArr = "";
			return false;
		}
	}
	if(value != '' && imeiArr.indexOf(value)==-1){
		var param={};
		param.imei=value;
		param.repairSectionId=repairSectionId
		
		$.ajax( {
			type : 'post',
			url : '/manager/afterSalesService/receiveMachine/quickReceive',
			contentType :'application/json', 
			dataType : "json", // 可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
			data:JSON.stringify(param),
			success : function(data) {
				
				var billInfo=data.data.list
				if(billInfo!=null){
//					$("#dataGrid").jqGrid('clearGridData');
					if(billInfo.length>0){
						imeiArr.push(value);
						$.each(billInfo,function(i,value){
							var getId = $("#dataGrid").jqGrid('getDataIDs');
							$("#dataGrid").jqGrid('addRowData',getId.length,value);
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
		if(imeiArr.indexOf(value)!=-1){
			$.zxsaas_plus.showalert("提示","该串号已录入");
		}
	}
	
}

initDataGrid();

function initDataGrid(){
	//配置
	var paras = {
	    gridId:'dataGrid', 
	    colNames:['id','出库部门','维修部门','售后处理单号','业务流水号','商品编码','商品名称','所属类别'
	               ,'处理方式','品牌','型号','颜色','串号','故障说明','外观描述','备注','入库时间','供应商','服务类型',
	               '所属类别Id','品牌Id','颜色Id','服务类型ID','出库部门id','供应商id','维修部门id','入库仓库id'], 
	    colModel:
	    	[
	                   {name:'id',index:'id',width:70,align:'center',hidden:true},
	                   {name:'outstorSectionName',index:'outstorSectionName', width:150,align:'center',sorttype:'string'},
	                   {name:'repairSectionName',index:'repairSectionName', width:100,align:'center',sorttype:'string'},
	                   {name:'billsNo',index:'billsNo', width:200,align:'center',sorttype:'string'},
	                   {name:'flowNo',index:'flowNo', width:200,align:'center',sorttype:'string'},
	                   {name:'goodsCode',index:'code', width:150,align:'center',sorttype:'string'},
	                   {name:'goodsName',index:'name', width:150,align:'center',sorttype:'string'},
	                   {name:'goodsClassName',index:'goodsCategoryName', width:100,align:'center',sorttype:'string'},
	                   {name:'suggestHandleMode',index:'suggestHandleMode', width:100,align:'center',sorttype:'string',formatter:'select',editoptions:{value:"1:自修;2:返厂;3:外修;4:换机;5:退货"}},
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
	                   {name:'aftersaleSectionId',index:'aftersaleSectionId', width:100,align:'center',sorttype:'string',hidden:true,}
           ],
           height:$(window).height()*0.5,
           width: "100%" ,
//           noShowOp:false
	};
	//回调函数
	var callBackList = {
			summary:function(data){
//				$('#importDataGrid').jqGrid('addRowData',MyEiditGrid.getMaxRowid($("#dataGrid"))+1,data);		
			}
	};
	dataGrid = new MyEiditGrid(paras,callBackList);
}

function importList(){
	if(aftersaleHandleDtlList != null){
		if(flowNoArr.indexOf(aftersaleHandleDtlList[0].flowNo) == -1){
			var imei = $("#dataGrid").jqGrid('getCol','imei',false);
			for (x in imei){
				if(imei[x] == aftersaleHandleDtlList[0].imei){
					$.zxsaas_plus.showalert("提示","该商品已录入");
					return
				}
			}
			$('#importChoose').modal('hide')
			imeiArr.push(aftersaleHandleDtlList[0].imei);
			flowNoArr.push(aftersaleHandleDtlList[0].flowNo);
	//		$('#importDataGrid').jqGrid('delRowData',_chooseId);
			$("#dataGrid").jqGrid('addRowData',MyEiditGrid.getMaxRowid($("#dataGrid"))+1,aftersaleHandleDtlList);
		}else{
			$.zxsaas_plus.showalert("提示","该商品已录入");
		}
	}
	
}

function importDataGrid(){
	$.jgrid.defaults.width = 1280;
	$.jgrid.defaults.responsive = true;
	$.jgrid.defaults.styleUI = 'Bootstrap';
	
	$('#importDataGrid').jqGrid({
		url: '/manager/afterSalesService/receiveMachine/importAfterSaleHandleBills',
		mtype:"post",
		datatype: "json",
		jsonReader  : {	
			root:"data.rows",
			page: "data.page",
	        total: "data.total",
	        records: "data.records",
			repeatitems: false
		},
		postData:{
			aftersaleSectionId:repairSectionId
		},
		colNames:['id','单据编号','送修部门','单据日期','单据数量','已确认数量','未确认数量','aftersaleHandleDtlList'],          
	    colModel:[
	               {name:'id',index:'id',width:70,align:'center',hidden:true},
	               {name:'billsNo',index:'billsNo', width:150,align:'center',sorttype:'string'},
	               {name:'outstorSectionName',index:'outstorSectionName', width:100,align:'center',sorttype:'string'},
	               {name:'createDateString',index:'createDateString', width:100,align:'center',sorttype:'string'},
	               {name:'billsNum',index:'billsNum', width:100,align:'center',sorttype:'string'},
	               {name:'confirmNum',index:'code', width:100,align:'center',sorttype:'string'},
	               {name:'notConfirmNum',index:'notConfirmNum', width:100,align:'center',sorttype:'string'},
	               {name:'aftersaleHandleDtlList',index:'aftersaleHandleDtlList', width:150,align:'center',sorttype:'string',hidden:true,
	            	   formatter: function (cellvalue, options, rowObject) {
                       		return JSON.stringify(cellvalue)
                   		}
	               },
	               
	           ],
        height:$(window).height()*0.5,
        multiselect: true,  
        multiboxonly:true, 
	    rownumbers:true,
	    rowNum: 10,
	    pager:'#jqGridpager_import',
	    autowidth:true,
	    shrinkToFit:true,
		rownumWidth: 35, // the width of the row numbers columns
		userDataOnFooter:true,//设置userData 显示在footer里
		beforeSelectRow:function(){
			$('#importDataGrid').jqGrid('resetSelection');  
			return(true);  		
		},
		onSelectRow:function(rowid,status){
					var list=$('#importDataGrid').getRowData(rowid);
					console.log(list)
					if(JSON.parse(list.aftersaleHandleDtlList).length){
						aftersaleHandleDtlList=JSON.parse(list.aftersaleHandleDtlList);
						_chooseId=list.id;
//						if(imeiArr.indexOf(aftersaleHandleDtlList[0].imei) == -1){
//						
//							
//						}else{
//							
//							$.zxsaas_plus.showalert("提示","该商品已录入");
//						}
						
					}else{
						aftersaleHandleDtlList=null;
//						$('#importDataGrid').jqGrid('resetSelection',rowid);
						
						$.zxsaas_plus.showalert("提示","该商品暂无明细");
					}
		},
		onSelectAll:function(aRowids,status){
			$('#importDataGrid').jqGrid('resetSelection');
			return(true);  
		},

		gridComplete: function() {
			$('#importDataGrid').jqGrid('setGridParam',{
				url: '/manager/afterSalesService/receiveMachine/importAfterSaleHandleBills',
				datatype:'json',
				page:1,
			}).trigger("reloadGrid");
//			footerData();
		},
		loadComplete:function(data){
			
		},
		loadError:function(xhr,status,error){
			
		}
	})
	
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
	            				imeiArr=[];
	            				$('#ckSectionName').val(treeNode.name);
	            				repairSectionId=treeNode.obj.id;
		            			$("#sectionModal").modal('hide');
		            			$('#importDataGrid').setGridParam({
		            				postData:{
		            					aftersaleSectionId:repairSectionId
		            				}
		            		    }).trigger("reloadGrid");
		            			getStorage();
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
		data:{"sectionId":repairSectionId},
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
				  $("#rkSectionName option:eq(0)").attr("selected","true");
			  }
		  }
	    }
	});
}




