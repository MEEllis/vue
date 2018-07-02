function showImeiModal(classTag){
	if(classTag=="threeTier"){
		var goodsId=$(".threeTier input[name='spareGoodsId']").val();
		var storageId=$("#storageId").val();
		if(goodsId==""){
			$.zxsaas_plus.showalert("提示","请先选择商品名称!");
			return;
		}
		if(storageId==""){
			$.zxsaas_plus.showalert("提示","请先选择仓库!");
			return;
		}
		
		reloadImeiGrid(storageId,goodsId)
	}
	$('#imeiModal').modal('show');
}

function reloadImeiGrid(storageId,goodsId){
	var queryModal={};
	queryModal.storageId=storageId;
	queryModal.goodsId=goodsId;
	$("#imeiModalGrid").jqGrid('setGridParam',{  
		url:"/manager/salesCommon/getStockImei",
        datatype:'json',  
        traditional: true,
        postData:queryModal //发送数据  
    }).trigger("reloadGrid"); //重新载入
}

function initImeiGrid(){
	var options = {
			LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
			iconJsonUrl:"../json/icon.json",
			TableName: "#imeiModalGrid", //显示表格名称。遵照css选择器书写
			btnbox: ".btnbox "
	};
	$.jgrid.defaults.responsive = true;
	$.jgrid.defaults.styleUI = 'Bootstrap';	
	var colNames = ['串号Id','串号','辅助串号','备注','成本价' ];
	var JqGridColModel= [ 
                         {name : 'imeiId',index : 'imeiId',align:'left',sortable: false,hidden: false,editable:false,width:'1px',hidden: true}, 
	                     {name : 'imei',index : 'imei',align:'left',sortable: false,hidden: false,editable:false,width:'140px'}, 
	                     {name : 'auxiliaryImei',index : 'auxiliaryImei',align:'left',sortable: false,width:'140px'},
	                     {name : 'remark',index : 'remark',align:'left',editable:true,sortable: false,width:'140px'},
	                     {name : 'costPrice',index : 'costPrice',align:'left',editable:true,sortable: false,width:'1',hidden: true},
	                   ];
	loadtable();
	function loadtable(){
			$(options.TableName).jqGrid({
				mtype:"GET",
				datatype: "json",
				jsonReader  : {	root: "data.dataList",repeatitems: false},
				colNames:colNames,          
	            colModel:JqGridColModel,
	            sortable:false,			            
	            rownumbers:true,
	            width: $(window).width() * 0.8,
	            height:"300px",
				autowidth:true,
				rownumWidth:40,
				shrinkToFit:false,
				ondblClickRow:function(rowid,iRow,iCol,e){
					
					var currRow = $(options.TableName).jqGrid('getRowData', rowid);	
					$(".threeTier input[name='spareImei']").val(currRow.imeiId);
					$(".threeTier input[name='spareImeiStr']").val(currRow.imei);
					$(".threeTier input[name='costPrice']").val(currRow.costPrice);
					refreshValidatorField("spareImeiStr",'#beiYF');
					$('#imeiModal').modal('hide');
					
				}
			})
			jQuery(options.TableName).jqGrid('setLabel',0, '序号');
			$(options.TableName).closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
	}
}
var regu =/^[0-9]{0,20}$/;
var re = new RegExp(regu);

$(document).on('blur','.imei',function(event){
	var contactsunitId=$(".oneTier input[name='contactsunitId']").val();
//	if(contactsunitId !="" && $(this).val().trim()!=""){
//		if($('#goodsNameVal').val()){
//			if(!re.test($(this).val().trim()*1)){
//				$.zxsaas_plus.showalert("提示","输入的串号只能是数字");
//			}else{
//				if($(this).val().trim().length != parseInt(imeiLength) &&  imeiLength !='' && ifManageIMei && ifManageIMei!=1){
//					$.zxsaas_plus.showalert("提示","输入的串号长度应是"+imeiLength+"位数！");
//				}
//			}
//		}
		queryImei(contactsunitId);
//	}
});

//$(document).on('blur','.AuxliaryImei',function(event){
//	var auxliaryImei=$(this).val().trim();
//	if($('#goodsNameVal').val()){
//		if(!re.test(auxliaryImei*1)){
//			$.zxsaas_plus.showalert("提示","输入的辅助串号只能是数字");
//		}else{
//			if($(this).val().trim().length != parseInt(auxliaryImeiLength) && auxliaryImeiLength!='' && ifEnableAuxliaryImei){
//				$.zxsaas_plus.showalert("提示","输入的辅助串号长度应是"+auxliaryImeiLength+"位数！");
//			}
//		}
//	}
//	
//});

$(document).on('focus','.imei',function(event){
	var contactsunitId=$(".wanglai1").val();
	if(contactsunitId==""){
		$(".imei").val("");
		$.zxsaas_plus.showalert("提示","请先选择往来单位!");
	}
});

function queryImei(contactsunitId){
	var entity={};
	entity.imei=$(".twoTier input[name='imei']").val().trim();
	if(entity.imei=="" ){return;}
	if(isOver){
		isOver=false
		$.ajax({
			url:"/manager/afterSalesService/receiveRecord/queryImei/"+contactsunitId,
			type : 'POST',  
			dataType: "json",
			data:JSON.stringify(entity),
			contentType :'application/json', 
			success:function(data){
				isOver=true
				  if(data.result==1){
					  var imeiStatus=data.data.imeiStatus;
					  var imeiInfo=data.data.imeiInfo;
					  if(imeiStatus!=undefined && imeiStatus==-1){
						  $.zxsaas_plus.showalert("提示","此串号尚未出销,如需售后需使用售后处理功能!");
						  $(".imei").val("");
					  }else if(imeiStatus==0 || imeiInfo==null){
						  //取消禁用
//						  $.zxsaas_plus.showalert("提示","未查询到该串号信息");
						  enableChooseRelyImei(true);
						  $("#goodsName").attr("disabled",false);
						  $(".salesSectionNameBtn").attr("disabled",false);
						  $(".AuxliaryImei").attr("disabled",false);
						  $(".salesNo").attr("disabled",false);
						  $(".clearinp input").val("");
//						  $('#verifYF')[0].reset()
					  }
					  if(imeiInfo!=undefined){
						  ifManageIMei=false;
						  ifEnableAuxliaryImei=false;
						  imeiInfo.nameModle=imeiInfo.goodsId;
						  $(".imeiInfo").writeJson2Dom(imeiInfo);
						  $("#goodsNameVal").val(imeiInfo.goodsName);
						  $("#buyDate").val(imeiInfo.buyDateString);
						  $("#goodsName").attr("disabled",true);
						  $(".AuxliaryImei").attr("disabled",true);
						  $(".YFselect1").val("1");
						  $(".salesSectionNameBtn").attr("disabled",true);
						  enableChooseRelyImei(false);
					  }
					
				  }else{
					  $.zxsaas_plus.showalert("提示",data.desc);
				  }
		    }
		});
	}
}

function enableChooseRelyImei(flag){
	if(flag){
		$(".brandId,.categoryId,.nameModle,.color,.salesNo,.salesSectionName").removeAttr("readonly");
		$(".salesSectionNameBtn").attr("disabled",false);
	}else{
		$(".brandId,.categoryId,.nameModle,.color,.salesSectionName").attr("readonly","readonly");
//		$(".brandId,.categoryId,.nameModle,.color,.salesNo,.salesSectionName").attr("readonly","readonly");
//		$(".salesSectionNameBtn").attr("disabled","disabled");
		$('.brandId,.categoryId,.color').attr('disabled','true');
	}
}