$(function(){
	initGoodsTree();initGoodsGrid();initImeiGrid();
	paymentWayGrid();initDepositGrid();contactunitGrid();
//	getGoodsBrandSelect();getCategorySelect();getGoodsColorSelect();
	;getTestBy(repairSectionId);
	initDataGrid();
});
//initDealDate()

var registerModel=0;//登记模式，默认零散模式

var lastsel="";
var lastrow="";
var jcbyj=false;
//初始化表格
var dataGrid = null;

function changeManage(value){
	if(value=='4' || value == '5'){
		if($('#spareFlag').is(':checked')){
			jcbyj=false;
			$('#spareFlag').attr('checked',false);
			$('#spareFlag').attr('disabled',"disabled");
			$('.YFhide').hide();
			$('.YFhideIn1,.YFhideIn4').attr("disabled","disabled");
			$('.YFhideIn2,.YFhideIn3').attr("disabled","disabled");
			$('.YFbtnHied1,.YFbtnHied2,.YFbtnHied3').hide();
			$('.tuYF1,.tuYF2,.tuYF3').addClass('box_input');
			$('.YFhideIn1,.YFhideIn2,.YFhideIn3,.YFhideIn4,.ppyf,.codeyf,.coloryf').val('');
			refreshValidatorField("YFhideIn1",'#beiYF');//刷新验证信息
			
		}else{
			$('#spareFlag').attr('disabled',"disabled");
		}
		
//		$('#beiYF').hide();
	}else{
		$('#spareFlag').attr('disabled',false);
	}
	
}

function initDataGrid(){
	//配置
	var paras = {
	    gridId:'dataGrid', 
	    addRow:{serviceType:'售后',remark:'',suggestHandleMode:''},
	    colNames:['商品编码', '商品名称','商品id','所属类别','品牌','型号','颜色','供应商','供应商id','串号','辅助串号','串号id','销售时间','服务类型','建议处理方式','故障说明','外观描述','随机附件','备注'], 
	    colModel:
	    	[ 
             {name:'goodsCode',index:'goodsCode', width:80,align:'center',sorttype:"string",sortable: false}, 
             {name :'goodsName',sortable: false,index : 'goodsName',align:'left',edittype:'custom_bt_input',custom_element_bt_click:"showGoodsModal",editable:true},
             {name :'goodsId',index : 'goodsId',align:'left',hidden:true},
             {name:'goodsClassName',index:'goodsClassName', width:100,align:'center', sorttype:'string',sortable: false},
             {name:'goodsBrandName',index:'goodsBrandName', width:100,align:'center', sorttype:'string',sortable: false},
			 {name:'goodsModel',index:'goodsModel', width:100,align:'center', sorttype:'string',sortable: false},
			 {name:'goodsColorName',index:'goodsColorName', width:80,align:'center', sorttype:'string',sortable: false},
			 {name :'contactUnitName',sortable: false,index : 'contactUnitName',align:'left',edittype:'custom_bt_input',custom_element_bt_click:"showContactunitModal",editable:true},
             {name :'contactsunitId',index : 'contactsunitId',align:'left',hidden:true},
             {name :'imei',index : 'imei',editable:true,sortable: false},
             {name :'auxiliaryImei',index : 'auxiliaryImei',editable:true,sortable: false},
             {name :'imeiId',index : 'imeiId',editable:true,sortable: false,hidden:true},
             {name :'saleDate',index : 'saleDate',align : "center",editable:true,editoptions:{
                 dataInit:function(e){
                     $(e).datetimepicker({
                    	  lang:"ch",           //语言选择中文
					      format:"Y-m-d",      //格式化日期
					      timepicker:false,    //关闭时间选项
					      todayButton:false,   //关闭选择今天按钮,
					      maxDate:new Date(),
                     });
                     $(this).click(function(e){//选中时间后隐藏
                         $(e).parent().datetimepicker('hide');
                     });
                 }
             },sortable : false},
             {name : 'serviceType',index : 'serviceType',align:'center'},
             {name : 'suggestHandleMode',index : 'suggestHandleMode',align:'center',editable:true,edittype:'select', editoptions:{value:"2:返厂;3:外修;4:换机;5:退货"}},
             {name : 'falutDesc',index : 'falutDesc',align:'left',editable:true},
             {name : 'exteriorDesc',index : 'exteriorDesc',align:'left',editable:true},
             {name : 'randomEnclosure',index : 'randomEnclosure',align:'left',editable:true},
             {name : 'remark',index : 'remark',editable:true,sortable: false}
           ],
           height:$(window).height()*0.7
          
           
	};
	//回调函数
	var callBackList = {
	   onCellSelect:function(rowid,iCol,cellcontent,e){
		lastsel=iCol;lastrow=rowid;
		 var currRow = $("#dataGrid").jqGrid('getRowData', rowid);
         if(iCol==11){//串号
      	   if(currRow.contactsunitId==""){
      		   $("#dataGrid").setColProp("imei",{editable:false});
      		   $.zxsaas_plus.showalert("提示","请先选择供应商!");
      	   }else{
      		   $("#dataGrid").setColProp("imei",{editable:true});
      	   }
         }
         
         if(iCol==13){//销售时间（如果串号存在，销售时间不允许被修改）
        	 if(currRow.imeiId==""){
        		 $("#dataGrid").setColProp("saleDate",{editable:true});
        	 }else{
        		 $("#dataGrid").setColProp("saleDate",{editable:false});
        	 }
         }
         
    	},
		afterEditCell:function(rowid,name,val,iRow,iCol){//开始编辑
		   
	    },
        afterSaveCell:function(rowid,name,val,iRow,iCol){//保存编辑
	    	var currRow = $("#dataGrid").jqGrid('getRowData', rowid);
        	if(iCol==11){
        		if(val==""){
        			 $("#dataGrid").jqGrid('setCell', rowid ,"imeiId" ,null);
        		}else{
        			dataGridImeiCellSearch(currRow,rowid);
        		}
        	}
        	 
        },
        summary:function(rowid,name,val,iRow,iCol){//统计处理
        },
        getGridDataList:function(rows){
        }
	};
	dataGrid = new MyEiditGrid(paras,callBackList);
}

var receveImerArr=[]

function dataGridImeiCellSearch(currRow,rowid){
	var entity={};
	entity.imei=currRow.imei;
	if(receveImerArr.indexOf(currRow.imei) !=-1){
		$.zxsaas_plus.showalert("提示","该串号已录入!");
		$("#dataGrid").jqGrid('setCell', rowid ,"imei" ,null);
		return
	}
	$.ajax({
		url:"/manager/afterSalesService/receiveRecord/queryImei/"+currRow.contactsunitId,
		type : 'POST',  
		dataType: "json",
		data:JSON.stringify(entity),
		contentType :'application/json', 
		success:function(data){
		  if(data.result==1){
			  var imeiStatus=data.data.imeiStatus;
			  var imeiInfo=data.data.imeiInfo;
			  if(imeiStatus!=undefined && imeiStatus==-1){
				  $.zxsaas_plus.showalert("提示","此串号尚未出销,如需售后需使用售后处理功能!");
				  $("#dataGrid").jqGrid('setCell', rowid ,"imei" ,null);
				  $("#dataGrid").jqGrid('setCell', rowid ,"imeiId" ,null);
			  }else if(imeiStatus==0){
				  $("#dataGrid").jqGrid('setCell', rowid ,"imeiId" ,null);
			  }
			  if(imeiInfo!=undefined){//串号相关记录写入值
				  var ids = $("#dataGrid").jqGrid('getCol','goodsCode',false);
				  for(x in ids){
					  if(imeiInfo.goodsCode == ids[x]){
						  $.zxsaas_plus.showalert("提示","该串号已录入!");
						  return
					  }
				  }
				  $("#dataGrid").jqGrid('setCell', rowid ,"imeiId" ,imeiInfo.imeiId);
				  $("#dataGrid").jqGrid('setCell', rowid ,"imei" ,imeiInfo.imei);
				  $("#dataGrid").jqGrid('setCell', rowid ,"auxiliaryImei" ,imeiInfo.auxiliaryImei);
				  $("#dataGrid").jqGrid('setCell', rowid ,"goodsModel" ,imeiInfo.nameModle);
				  $("#dataGrid").jqGrid('setCell', rowid ,"goodsId" ,imeiInfo.goodsId);
				  $("#dataGrid").jqGrid('setCell', rowid ,"goodsBrandName" ,imeiInfo.goodsBrandName);
				  $("#dataGrid").jqGrid('setCell', rowid ,"goodsColorName" ,imeiInfo.goodsColorName);
				  $("#dataGrid").jqGrid('setCell', rowid ,"goodsClassName" ,imeiInfo.goodsClassName);
				  $("#dataGrid").jqGrid('setCell', rowid ,"goodsCode" ,imeiInfo.goodsCode);
				  $("#dataGrid").jqGrid('setCell', rowid ,"goodsName" ,imeiInfo.goodsName);
				  $("#dataGrid").jqGrid('setCell', rowid ,"saleDate" ,($.DateFormatFromTimestamp("yyyy-MM-dd",imeiInfo.saleDate)));
			  }
			  receveImerArr.push(currRow.imei)
		  }
	    }
	});
}

//获取检测人下拉框
var testByList =new Array();
function getTestBy(repairSectionId){
	if(repairSectionId==""){return;}
	$.ajax({
		url:"/manager/afterSalesService/receiveRecord/getTestBy",
		type : 'GET',  
		dataType: "json",
		async:false,
		data:{"sectionId":repairSectionId},
		contentType :'application/json', 
		success:function(data){
		  if(data.result==1){
			  testByList=data.data.testByList;
			  $("#testBy").html("");
			  if(testByList!=null && testByList.length>0){
				  $.each(testByList,function(i,value){
					  $("#testBy").append("<option value='"+value.id+"'>"+value.name+"</option>");
				  });
			  }
		  }
	    }
	});
}
getAuthList( initDealDate )
//初始化受理时间
function initDealDate(){
	formateDateInput("scatteredModel");
	$("#scatteredModel input[name='dealDate']").val($.DateFormat(new Date(),"yyyy-MM-dd"));
	formateDateInput("batchModel");
	$("#batchModel input[name='dealDate']").val($.DateFormat(new Date(),"yyyy-MM-dd"));
}

//格式化日期控件
function formateDateInput(modelId){
	if(!_authList.hasPermissions){
		$("#"+modelId+" input[name='dealDate']").prop('disabled',true);
		$("#"+modelId+" input[name='acceptDate']").prop('disabled',true);
	}
	
	//零散模式受理时间
	$("#"+modelId+" input[name='dealDate']").datetimepicker({
		  lang:"ch",           //语言选择中文
	      format:"Y-m-d",      //格式化日期
	      timepicker:false,    //关闭时间选项
	      todayButton:false,    //关闭选择今天按钮
	      maxDate:_authList.maxDate,
	      minDate:_authList.minDate,
	      value:_authList.maxDate
	      
	}).on('blur',function(ev){
		//tableInput.thisTime("#"+modelId+" input[name='dealDate']","#"+modelId+" input[name='dealDate']");
		refreshValidatorField("dealDate",'#verifYF');//刷新验证信息
	});
	//批量模式受理时间
	$("#"+modelId+" input[name='acceptDate']").datetimepicker({
		  lang:"ch",           //语言选择中文
	      format:"Y-m-d",      //格式化日期
	      timepicker:false,    //关闭时间选项
	      todayButton:false,    //关闭选择今天按钮
	      maxDate:_authList.maxDate,
	      minDate:_authList.minDate,
	      value:_authList.maxDate
	})
//	.on('blur',function(ev){
//		refreshValidatorField("acceptDate",'#batchValidator');//刷新验证信息
//	});
	
	//购机日期
	$("#"+modelId+" input[name='buyDate']").datetimepicker({
		  lang:"ch",           //语言选择中文
	      format:"Y-m-d",      //格式化日期
	      timepicker:false,    //关闭时间选项
	      todayButton:false ,   //关闭选择今天按钮
	      maxDate:new Date()
	})
//	.on('blur',function(ev){
//		refreshValidatorField("buyDateString",'#verifYF');//刷新验证信息
//	});
}

//零散模式、批量模式选项切换点击事件
$("#myTab li").bind("click",function(){
	registerModel=$(this).index();
	if(registerModel==1){
		dataGrid.clearDataGrid();
		dataGrid.addKongRow();
	}
});

$('body').click(function(){
	$('.none-cx').hide();
})

var isOver=true
//登记.保存按钮点击事件
function registrationBtnClick(){
	
	//页面校验不通过不允许往下走（当选中借出备用机时，仓库，商品，串号校验，没填不允许往下走，未选中无需校验）
	
	var param={};
	if(registerModel==0){//零散模式
		if(jcbyj){
			$("#verifYF").data('bootstrapValidator').validate();
			if(!$("#verifYF").data('bootstrapValidator').isValid()){
				refreshValidator("#verifYF");
				return;
			}
			$("#beiYF").data('bootstrapValidator').validate();
			if(!$("#beiYF").data('bootstrapValidator').isValid()){
				refreshValidator("#beiYF");
				return;
			}
		}
		
		$("#verifYF").data('bootstrapValidator').validate();
		if(!$("#verifYF").data('bootstrapValidator').isValid()){
			refreshValidator("#verifYF");
			return;
		}
		
		$('#fourTier').data('bootstrapValidator').validate();
		if(!$("#fourTier").data('bootstrapValidator').isValid()){
			refreshValidator("#fourTier");
			return;
		}
		
		if(!$('#goodsNameVal').val()){
			 $.zxsaas_plus.showalert("提示","请选择商品名称");
			return;
		}
		if(!$('.YFselect1').val()){
			 $.zxsaas_plus.showalert("提示","请选择商品保修方法");
			return;
		}
//		if($('.imei').val().trim().length !=parseInt(imeiLength) && imeiLength!='' && ifManageIMei && ifManageIMei==1){
//			$.zxsaas_plus.showalert("提示","输入的串号长度应是"+imeiLength+"位数！");
//			return
//		}
//		if($('.AuxliaryImei').val().trim().length != parseInt(auxliaryImeiLength) && auxliaryImeiLength!='' && ifEnableAuxliaryImei){
//			$.zxsaas_plus.showalert("提示","输入的辅助串号长度应是"+auxliaryImeiLength+"位数！");
//			return
//		}
		param=getScatterSaveParam();
		
	}else if(registerModel==1){
		 $("#dataGrid").jqGrid('saveCell', lastrow ,lastsel);
		param=getBatchSaveParam()
		
		
		$('#inquire_option').data('bootstrapValidator').validate();
		if(!$("#inquire_option").data('bootstrapValidator').isValid()){
			refreshValidator("#inquire_option");
			return;
		}
		if(!param.batchPickDtlList.length){
			 $.zxsaas_plus.showalert("提示","请填写完整商品信息");
			return
		}
		$("#batchValidator").data('bootstrapValidator').validate();
		if(!$("#batchValidator").data('bootstrapValidator').isValid()){
			param=getBatchSaveParam()
			refreshValidator("#batchValidator");
			return;
		}
	}
	
	if(isOver){
		isOver=false;
		$.request({
			url:"/manager/afterSalesService/receiveRecord/save/"+registerModel,
			type : 'POST',  
			dataType: "json",
			data:JSON.stringify(param),
			contentType :'application/json', 
			success:function(data){
				isOver=true;
				console.log(data.desc);
			   $.zxsaas_plus.showalert("提示",data.desc);
		    }
		});
	}
}


//会员卡号事件
$(document).on('blur','.cardNo',function(event){
	var cardNo=$.trim($('.cardNo').val());
	if(cardNo !=""){
		searchMemberInfo(cardNo);
	}
});

//会员卡号详情查询（会员卡号，手机号，卡密全匹配）
function searchMemberInfo(cardNo){
	$.ajax({
    	url:"/manager/afterSalesService/receiveRecord/selectMemberInfo",
    	type:'GET',
    	dataType:'JSON',
    	data:{"cardNo":cardNo},
    	contentType:'application/json;charset=utf-8',
    	success:function(data){
    		var memberList=data.data.memberList;
    		if(memberList!=null && memberList.length>0){
    			$(".oneTier").writeJson2Dom(memberList[0]);
    			enableOrDisbaleMemberInput(true);
    			$('.telephone').val(memberList[0].customerTel);
    			$(".oneTier input[name=contactsunitId]").val(memberList[0].contactUnitId);
    			$(".oneTier input[name=memberAddress]").val(memberList[0].address);
    			$(".imei").val("");
    			enableChooseRelyImei(true);
    		}else{
    			$.zxsaas_plus.showalert("提示","会员卡号不存在!")
    			$(".oneTier input").val("");
    			enableOrDisbaleMemberInput(false);
    		}
	    },
	    error:function(){
    		$.zxsaas_plus.showalert("提示","服务器出错,请稍后重试")
    	}
    });
}

//禁用或启用会员文本框值
function enableOrDisbaleMemberInput(flag){
	if(flag){
		$(".oneTier input:not('.cardNo')").attr("readonly","readonly");
		$(".oneTier :button").attr("disabled","disabled");
	}else{
		$(".oneTier input").removeAttr("readonly");
		$(".oneTier :button").removeAttr("disabled");
	}
}


//是否借出备用机checkbox选择事件
$(document).on('click','.YFcheckbox',function(){
	
	jcbyj=$('.YFcheckbox').is(':checked');
	if($(this).prop('checked')){
			$('.YFhide').show();
			$('.YFhideIn1,.YFhideIn4').removeAttr("disabled");
			$('.YFhideIn2,.YFhideIn3').removeAttr("disabled");
			$('.YFbtnHied1,.YFbtnHied2,.YFbtnHied3').show();
			$('.tuYF1,.tuYF2,.tuYF3').removeClass('box_input');
			$("#depositTotal").val("0.00");
			var repairSectionId=$("#verifYF input[name='repairSectionId']").val();
			getStorage(repairSectionId);
			$('#beiYF').data('bootstrapValidator').resetForm();
	}else{
		$('#beiYF').data('bootstrapValidator').resetForm();
			$('.YFhide').hide();
			$('.YFhideIn1,.YFhideIn4').attr("disabled","disabled");
			$('.YFhideIn2,.YFhideIn3').attr("disabled","disabled");
			$('.YFbtnHied1,.YFbtnHied2,.YFbtnHied3').hide();
			$('.tuYF1,.tuYF2,.tuYF3').addClass('box_input');
			$('.YFhideIn1,.YFhideIn2,.YFhideIn3,.YFhideIn4,.ppyf,.codeyf,.coloryf').val('');
			
	}
	if($('.YFhideIn2').val()==''){
		$('.tuYF2').addClass('box_input');
		$('.YFhideIn3').attr("disabled","disabled"); 
		$('.YFbtnHied2').hide();
	}
});

$('#storageId').change(function(){
	/*$('#beiYF')[0].reset();*/
	$('.YFcheckbox').prop('checked',true);
	$('#beiYF').data('bootstrapValidator').resetForm();
	$("input[name='goodsCode']").val("");
	$("input[name='goodsName']").val("");
	$("input[name='goodsBrandName']").val("");
	$("input[name='goodsColorName']").val("");
	$("input[name='spareImeiStr']").val("");
	$("input[name='depositTotal']").val("0.00")
})


//零散模式保存参数
function getScatterSaveParam(){
//	 $('.brandId,.categoryId,.color').removeAttr("disabled");
	var param={};
	param=$('#verifYF').toJsonObject();
	param.groupId=groupId;
	param.companyId=companyId;
	param.dealDate=$("#verifYF input[name='dealDate']").val();
	delete param.brandId;
	delete param.categoryId;
	delete param.color;
	delete param.AuxliaryImeiId;
	//是否借出备用机
	if($('#spareFlag').is(':checked')){
		$.extend(param,$('#beiYF').toJsonObject());
		param.spareFlag=1;
		param.spareCostPrice=param.costPrice;
		
		delete param.goodsColorName;
		delete param.goodsBrandName;
		delete param.goodsCode;
		delete param.goodsName;
		delete param.spareImeiStr;
		delete param.depositTotal;
		//押金收付款主表
		if($("#depositTotal").val()!="0.00"){
			var depositPayreceiptMain={};
			depositPayreceiptMain.groupdId=groupId;
			depositPayreceiptMain.companyId=companyId;
			depositPayreceiptMain.managersUid=param.managersUid;
			depositPayreceiptMain.sectionId=param.repairSectionId;
			depositPayreceiptMain.contactsunitId=param.contactsunitId;
			depositPayreceiptMain.ratio=1;
			depositPayreceiptMain.type=36;
			depositPayreceiptMain.billsPrefixCode="JJDJYJ";
			depositPayreceiptMain.refMainTable="a_scatter_pick";
			depositPayreceiptMain.billsDate=param.dealDate;
			depositPayreceiptMain.amount=$("#depositTotal").val().replace(/\,/g, "");
			param.depositPayreceiptMain=depositPayreceiptMain;
			//押金收付款明细表数据
			var depositPayreceiptDetail =new Array();
			var detailDepositIds=$("#depositModalGrid").getDataIDs();
			$.each(detailDepositIds, function (i,value) {
				var row = $("#depositModalGrid").jqGrid('getRowData', value );
				if(row.payreceiptAmout!="0.00"){
					delete row["id"];
					delete row["accountTypeName"];
					delete row["accountName"];
					depositPayreceiptDetail.push(row);
				 }
			 });
			param.depositPayreceiptDetail=depositPayreceiptDetail;
		}
	}else{
		param.spareFlag=0;
	}
	
	//预收款收付款主表
	if($("#prepaymentAmount").val()!="0.00"){
		var payreceiptMain={};
		payreceiptMain.groupdId=groupId;
		payreceiptMain.companyId=companyId;
		payreceiptMain.managersUid=param.managersUid;
		payreceiptMain.sectionId=param.repairSectionId;
		payreceiptMain.contactsunitId=param.contactsunitId;
		payreceiptMain.ratio=1;
		payreceiptMain.type=37;
		payreceiptMain.billsPrefixCode="JJDJYSK";
		payreceiptMain.refMainTable="a_scatter_pick";
		payreceiptMain.billsDate=param.dealDate;
		payreceiptMain.amount=$("#prepaymentAmount").val().replace(/\,/g, "");
		param.payreceiptMain=payreceiptMain;
		//押金收付款明细表数据
		var payreceiptDetail =new Array();
		var detailIds=$("#paymentWayModalGrid").getDataIDs();
		$.each(detailIds, function (i,value) {
			var row = $("#paymentWayModalGrid").jqGrid('getRowData', value );
			if(row.payreceiptAmout!="0.00"){
				delete row["id"];
				delete row["accountTypeName"];
				delete row["accountName"];
				payreceiptDetail.push(row);
			 }
		 });
		param.payreceiptDetail=payreceiptDetail;
	}
	$.extend(param,$('#fourTier').toJsonObject());
	if($('#repairFlag').is(':checked')){
		param.repairFlag=1;
	}else{
		param.repairFlag=0;
	}
	return param;
}

//批量模式保存参数
function getBatchSaveParam(){
	var param={};
	param.id="";
	//批量模式主表
	var abatchPickMain={};
	abatchPickMain=$('#batchValidator').toJsonObject();
	abatchPickMain.groupId=groupId;
	abatchPickMain.companyId=companyId;
	abatchPickMain.acceptDate=$("#batchValidator input[name='acceptDate']").val();
	delete abatchPickMain.repairSectionName;
	delete abatchPickMain.contactUnitName;
	param.abatchPickMain=abatchPickMain;
	var batchPickDtlList=[];
	//明细表
	var dataIds=$('#dataGrid').jqGrid('getDataIDs');
	if(dataIds.length>0){
		$.each(dataIds,function(i,rowid){
			var rowData=$("#dataGrid").jqGrid('getRowData', rowid);
			if(rowData.goodsId!="" && rowData.suggestHandleMode!=""){
				rowData.supplyBy=rowData.contactsunitId;
				rowData.serviceType=1;
				delete rowData.contactsunitId;
				delete rowData.goodsCode;
				delete rowData.goodsName;
				delete rowData.goodsModel;
				delete rowData.goodsColorName;
				delete rowData.contactUnitName;
				delete rowData.contactsunitId;
				delete rowData.op;
				delete rowData.goodsBrandName;
				delete rowData.goodsClassName;
				delete rowData.serviceType;
				if(rowData.suggestHandleMode=="自修"){
					rowData.suggestHandleMode=1;
				}else if(rowData.suggestHandleMode=="返厂"){
					rowData.suggestHandleMode=2;
				}else if(rowData.suggestHandleMode=="外修"){
					rowData.suggestHandleMode=3;
				}else if(rowData.suggestHandleMode=="换机"){
					rowData.suggestHandleMode=4;
				}else if(rowData.suggestHandleMode=="退货"){
					rowData.suggestHandleMode=5;
				}
				batchPickDtlList.push(rowData);
			}
		});
	}
	param.batchPickDtlList=batchPickDtlList;
	return param;
}

//验证bootstrap规范
//var billsHeaderForm=function(fromid){
	$('#verifYF').bootstrapValidator({
		feedbackIcons:{
			valid : 'glyphicon glyphicon-ok',
			invalid : 'glyphicon glyphicon-remove',
			validating : 'glyphicon glyphicon-refresh'
		},
		fields:{
			customerName:{
				validators:{
					notEmpty:{
						message:'字段必填'
					}
				},
			},
			telephone:{
				validators:{
				  	notEmpty: {
                		message: '手机号码不能为空'
		            },
		            stringLength: {
		                min: 11,
		                max: 11,
		                message: '请输入11位手机号码'
		            },
		            regexp: {
		                regexp: /^1[3|5|8]{1}[0-9]{9}$/,
		                message: '请输入正确的手机号码'
		            }
				},
			},
			invoiceNo:{
				validators:{
					numeric:{
						message: '请输入数字'
					},
				},
			},
			nameModle:{
				validators:{
					notEmpty:{
						message:'字段必填'
					}
				},
			},
			goodsPhone:{
				validators:{
					 regexp: {
	                	regexp: /^1[3|5|8]{1}[0-9]{9}$/,
	                	message: '请输入正确的手机号码'
	            	}
				},
			},
			dealDate:{
				validators:{
					notEmpty:{
						message:'字段必填'
					}
				},
			}
		
		}
	})
	
$('#beiYF').bootstrapValidator({
	feedbackIcons:{
		valid : 'glyphicon glyphicon-ok',
		invalid : 'glyphicon glyphicon-remove',
		validating : 'glyphicon glyphicon-refresh'
	},
	fields:{
		storageId:{
			validators:{
				notEmpty:{
					message:'字段必填'
				}
			},
		},
		goodsName:{
			validators:{
			  	notEmpty: {
            		message: '字段必填'
	            },
	           
			},
		},
		spareImeiStr:{
			validators:{
				notEmpty:{
					message:'字段必填'
				}
			},
		}
	}
})

$('#batchValidator').bootstrapValidator({
	feedbackIcons:{
		valid : 'glyphicon glyphicon-ok',
		invalid : 'glyphicon glyphicon-remove',
		validating : 'glyphicon glyphicon-refresh'
	},
	fields:{
		acceptDate:{
			validators:{
				notEmpty:{
					message:'字段必填'
				}
			},
		},
	}
})

$('#inquire_option').bootstrapValidator({
	feedbackIcons:{
	valid : 'glyphicon glyphicon-ok',
	invalid : 'glyphicon glyphicon-remove',
	validating : 'glyphicon glyphicon-refresh'
	},
	fields:{
		contactPhone:{
			validators:{
				 regexp: {
			       	regexp: /^1[3|5|8]{1}[0-9]{9}$/,
			       	message: '请输入正确的手机号码'
			   	}
			},
		},
	}
})

$('#fourTier').bootstrapValidator({
	feedbackIcons:{
	valid : 'glyphicon glyphicon-ok',
	invalid : 'glyphicon glyphicon-remove',
	validating : 'glyphicon glyphicon-refresh'
	},
	fields:{
		quotePrice:{
			validators:{
					numeric:{
					message: '请输入数字'
					},
					regexp: {
		                regexp: /^[1-9]{1}\d*(\.\d{1,2})?$/,
		                message: '请输入正确的金额'
		            }
			},
		},
	}
})
