//初始化一个数组  存放准备接收的单据
var columnCodes= new Array();

//需校验数
var verifytotal = 0;
//校验成功数
var verifySucceedNum = 0;
//未校验数
var notVerifyNum = 0;
//不在校验内数
var notInVerifyNum = 0;
//校验数组
var verifyArr = new Array();
//输入过的值存放数组
var inputValueArr = new Array();
//校验回车的次数
var verifyCount = 0;
//提示信息
var hintStr = '';

/***button 刷新***/
function onclickRefresh(){
	location.reload();
}

function showPrintAllot(){
	var selrow = $("#jqGrid_SubjectBalance").jqGrid('getGridParam','selarrrow');
	
	//控制单据数
	if(selrow.length != 1){
		$.zxsaas_plus.showalert("提示信息", "请选择一张单据打印!");
		return false;
	}
	
	//根据单据类型切换类型
	var rowData = $("#jqGrid_SubjectBalance").jqGrid("getRowData", selrow); 
	if(rowData.billsType == '7'){
		//同价调拨单
		
		$('#printTypeOne').show();
		$('#printTypeTwo').hide();
	}else{
		//变价调拨单
		
		$('#printTypeOne').hide();
		$('#printTypeTwo').show();
	}
	$('#printModal').modal('show');
}

/***button 打印***/
function print(){
	var selrow = $("#jqGrid_SubjectBalance").jqGrid('getGridParam','selarrrow');
	var rowData = $("#jqGrid_SubjectBalance").jqGrid("getRowData", selrow); 
	var printType = rowData.billsType == '7' ? $('input[name="printRadioOne"]:checked').val() : $('input[name="printRadioTwo"]:checked').val();
	if(rowData != undefined && rowData != null && rowData.orderId != null && rowData.orderId != undefined){
		$.printBills(basePath + '/storagePrint/print/allot', 
			{
		      billsId:rowData.orderId,
		      printType:printType,
		      startTime:$('#startTimeStr').val(),
		      endTime:$('#endTimeStr').val(),
				checkCost:checkCost, //是否有查看权限
		    }
		);
	}else{
		$.zxsaas_plus.showalert("提示信息","请选择一张草稿单或正式单!");
	}
	$('#printModal').modal('hide');
}

//正式单据  查询
function official(){
	var param = new Object();
	param.moveOutSectionId = $('#selOutDepartmentIdStr').val();
	param.moveInSectionId = $('#selInDepartmentIdStr').val();
	//单据状态
	if($('.hide_text_audit').val() != null && $('.hide_text_audit').val() != undefined && $('.hide_text_audit').val() !=''){
		param.billsStatuses = $('.hide_text_audit').val();
	}else{
		param.billsStatuses = '';
	}
	//调拨类型
	if($('.hide_text_alloType').val() != null && $('.hide_text_alloType').val() != undefined && $('.hide_text_alloType').val() !=''){
		param.billsType = $('.hide_text_alloType').val();
	}else{
		param.billsType = '';
	}
	param.startTime = $('#startTimeStr').val();
	param.managerId = $('#managersName').data('id');
	param.endTime = $('#endTimeStr').val();
	param.remark = $('#selRemark').val();
	
	$("#jqGrid_SubjectBalance").jqGrid('setGridParam',{ 
        url: basePath + "/inventory/storage/price/transfer/receive/searchOrderPageList",
        postData:param, //发送数据 
        page:1 
    }).trigger("reloadGrid"); //重新载入 

	$('.Zmargin').hide();
}

/******************************接收、拒收************************************/

//拒收原因
$('#rejectionCause').blur(function(){
	var value = $(this).val();
	var rowIds = $("#jqGrid_tranRejection").getDataIDs();
	$.each(rowIds, function(index, item) {
		$("#jqGrid_tranRejection").jqGrid('setCell', item, "rejectionCause", value);
	});
});

//拒收
function RejectBills(){
	var params = [];
    var flag=true;
	var rowIds = $("#jqGrid_tranRejection").getDataIDs();
	$.each(rowIds, function(index, item) {
		var rowData = $("#jqGrid_tranRejection").jqGrid("getRowData", item);
		var obj={};
		if(rowData.rejectionCause){
			obj['id']=rowData.realid;
			obj['reason']=rowData.rejectionCause;
		    params.push(obj);
		}else{
			flag=false;	
			return false;
		}
	});
	if(flag){
		storageObj.RejectBills_allot(params,function(data){
			if($.ac_cc(data)) return false;  //判断权限
			
			var result = data.data.result;
			if(result==1||result=="1"){
				$.zxsaas_plus.showalert("成功","已拒收！");
			}else{
				$.zxsaas_plus.showalert("失败", data.data.desc);
			}
			official();
			
		});
		$('#rejectionChoose').modal('hide');
		window.location.reload();
	}else{
		$.zxsaas_plus.showalert("提示","拒收原因必填！");
	}

}


//接收模态框显示
$("#receiveChoose").on("shown.bs.modal",function(){
	$("#jqGrid_tranReceive").setGridWidth($(this).find(".chosen").width());
});

//点击接收
$("#rcev").on("click",function(){
	allotData();
});

/*日期转化时间*/
function DateToSecond(date){
	 var Time = new Array();   
	Time = date.split("-"); 
	 return (new Date(Time[0],Time[1]-1,Time[2])).valueOf();  
}

var format = function(time, format){
    var t = new Date(time);
    var tf = function(i){return (i < 10 ? '0' : '') + i};
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a){
    switch(a){
        case 'yyyy':
            return tf(t.getFullYear());
            break;
        case 'MM':
            return tf(t.getMonth() + 1);
            break;
        case 'mm':
            return tf(t.getMinutes());
            break;
        case 'dd':
            return tf(t.getDate());
            break;
        case 'HH':
            return tf(t.getHours());
            break;
        case 'ss':
            return tf(t.getSeconds());
            break;
    }
})
}


function MathDate(arr){
	for(var i=0;i<arr.length;i++){
		var curDate = arr[i].split(" ");
	    if(curDate.length>0){
	       arr[i]=curDate[0];	
	    }
	    arr[i]=DateToSecond(arr[i]);
	}
	var mDate =Math.max.apply(null, arr);
		mDate = format(new Date(mDate),'yyyy-MM-dd');
		return mDate;
	
}
//接收勾选的数据
function allotData(){
	var status = true;	//验证是否有已接收单据、已拒收单据.
	var arr = [];
	columnCodes = [];
	var selrow = $("#jqGrid_SubjectBalance").jqGrid('getGridParam','selarrrow');
	$(selrow).each(function (index, yu) {//遍历每个id 找到每个data 并把属性加到初始化数组里 
		var rowData = $("#jqGrid_SubjectBalance").jqGrid("getRowData", yu); 
		rowData.inDepartmentName=rowData.moveInSectionName;
		rowData.outDepartmentName=rowData.moveOutSectionName;
		if(rowData.billsStatus  != '8'){
			status = false;	//已接收 或 已拒收
			arr[index] = rowData.moveInSectionId;
			return false;
		}else{
			columnCodes.push(rowData); 
			arr[index] = rowData.moveInSectionId;
		}
	}); 
	//添加表格
	jQuery("#jqGrid_tranReceive").jqGrid("clearGridData");
	for(var i=0;i<columnCodes.length;i++)  {
        $("#jqGrid_tranReceive").jqGrid('addRowData',i,columnCodes[i]);
	}
	//接收日期权限
	var maxDate='',
		minDate='',
		allFhDate=[];
	$.request({
		url:'/manager/inventory/common/getInventoryBillsDate',
		type:'post',
		dataType:'json',
		data:{
			'menuCode':$('#AUTH').data('code')
		},
		success:function(data){
		
			if(data.result==1){
				maxDate=data.data.maxDate;
				//接收日期
				//var allFhDate=$("#jqGrid_tranReceive").jqGrid('getCol','postDateStr');
				//allFhDate.push(minDate);
				/*单据日期---change*/
				var allFhDate=$("#jqGrid_tranReceive").jqGrid('getCol','billsDateStr');
				/*----change*/
				if(allFhDate.length>0){
					minDate = MathDate(allFhDate);//单据日期(批量的最大单据日期)
				}
				$("#receiveDateString").val(minDate);
				$("#receiveDateString").datetimepicker({
			        lang:"ch",           //语言选择中文
			        format:"Y-m-d",      //格式化日期
			        timepicker:false,    //关闭时间选项
			        todayButton:false,    //关闭选择今天按钮
			        maxDate:maxDate,
			        minDate:minDate
			        
			    });
				if(data.data.hasPermissions==1||data.data.hasPermissions=='1'){
					$("#receiveDateString").removeAttr("disabled");
				}else{
					if(!$("#receiveDateString").attr("disabled")){
						$("#receiveDateString").attr("disabled","disabled");
					}
				}
			}
		},
		error:function(msg){
			
		}
	});
	//验证是否调入部门不统一
	var stuIndepartmentId = $.isRepeat(arr);
	if(selrow.length == 0){
		$.zxsaas_plus.showalert('提示信息','请选择一张单据接收!');
	}else if(stuIndepartmentId && selrow.length != 1){
		$.zxsaas_plus.showalert('提示信息','请选择相同的调入部门!');
	}else if(status){
		$("#receiveChoose").modal('show');
		$('#receiveStorage').html('');
	
		
		//添加仓库
		storageObj.findInStorage(arr[0],function(data){
			var selectHtml = '';
			$(data.data.receiveStorage).each(function(index,element){
				selectHtml += '<option value="'+element.id+'">'+element.name+'</option>';
			});
			$('#receiveStorage').append(selectHtml);
			//获取默认仓
            InterfaceInventory.common.getDefaultStorgeList({
                data:{sectionId:arr[0]},
                success:function(data){
                    var storageList=data.data.storageList||[]
                    var storageItem=storageList[0]||{}
                    if($.trim(storageItem.storageId)!=''){
                        $('#receiveStorage').val(storageItem.storageId)
					}
                }
            })

		});
	
		

	}else{
		$.zxsaas_plus.showalert("提示信息", "已接收或已拒收单据不能再次接收!");
		
	}
}

$.extend({
	//判断明细是否有不一样的
	isRepeat:function(arr){ 
	     var hash = []; 
	     for(var i in arr) { 
	         if(hash[arr[i]]){
	            continue;
	         }else if(hash.length == 0){
	        	hash[arr[i]] = true; 
	         }else{
	        	 return true;
	         }
	     } 
	     return false; 
	 }
});
//点击拒收按钮
$("#refus").on("click",function(){
	RejectData();
});
//拒收模态框显示
$("#rejectionChoose").on("shown.bs.modal",function(){
	$("#jqGrid_tranRejection").setGridWidth($(this).find(".refuChoose").width());
});
//拒收模态框消失
$("#rejectionChoose").on("hide.bs.modal",function(){
	$("#rejectionCause").val("");
	$(".danju").hide();
});
//拒收勾选的数据
function RejectData(){
//	initRejectData();
	var status = true;	//验证是否有已拒收单据、已接收
	columnCodes = [];
	var selrow = $("#jqGrid_SubjectBalance").jqGrid('getGridParam','selarrrow');
	$(selrow).each(function (index, yu) {//遍历每个id 找到每个data 并把属性加到初始化数组里 
		var rowData = $("#jqGrid_SubjectBalance").jqGrid("getRowData", yu); 
		rowData.realid=rowData.orderId;
		rowData.inDepartmentName=rowData.moveInSectionName;
		rowData.outDepartmentName=rowData.moveOutSectionName;
		
		if(rowData.rejectionBy != null && rowData.rejectionBy != '' || rowData.receiveBy != null && rowData.receiveBy != ''){
			status = false;	//已拒收 或 已接收
			return false;
		}else{
			columnCodes.push(rowData); 
		}
	}); 
	if(selrow.length == 0){
		$.zxsaas_plus.showalert('提示信息','请选择一张单据拒收!');
	}else if(status){
		$("#rejectionChoose").modal('show');
		//添加表格
		jQuery("#jqGrid_tranRejection").jqGrid("clearGridData");
		for(var i=0;i<columnCodes.length;i++)  {
	        $("#jqGrid_tranRejection").jqGrid('addRowData',i,columnCodes[i]);
		}
	}else{
		$.zxsaas_plus.showalert("", "已接收或已拒收单据不能再次拒收!");
	}
	
}

//接收  
function receiveBills(){
	if($("#receiveDateString").val()==""){
		$.zxsaas_plus.showalert("warning", "请选择接收日期!");
		return;
	}
	
	var billsIdStr = '';
	if(columnCodes.length != 0){
		for(var i=0;i<columnCodes.length;i++){
			if(billsIdStr != '') billsIdStr += ','; 
			billsIdStr += columnCodes[i].orderId;
		}
		
		storageObj.receiveBills(billsIdStr,$('#receiveStorage').val(),$('#receiveDateString').val(),$('#receiveRemark').val(),function(data){
			var str = data.data.str.replace(/&/g,'<br/>');
    		official();
    		$.zxsaas_plus.showconfirmsure('提示',str,function(){
    			window.location.reload();
    		})
			
		});
	}else{
		$.zxsaas_plus.showalert("warning", "请选择单据!");
		return;
	}
	
	$('#receiveChoose').modal('hide');
}

/******************************串号校验************************************/
$("#verifyChoose").on("shown.bs.modal",function(){
	$("#jqGrid_tranVerify").setGridWidth($(this).find(".next-modal").width());
    $("#jqGrid_tranVerify").jqGrid('setGridParam',{height:$(this).find(".jqGrid_wrap").height()}); //重新载入 （直接传入   就会刷新表格）
});

$("#numerValidate").on("click",function(){
	billsVerify();
});
function billsVerify(){
	verifytotal = 0;   //需校验数
	verifySucceedNum = 0;   //校验成功数
	notVerifyNum = 0;    //未校验数
	notInVerifyNum = 0;    //不在校验内数
	verifyArr = [];    //校验数组
	inputValueArr = [];    //清空输入的值
	verifyCount = 0;    //清空回车次数
	hintStr = '';   //清空提示信息
	var selrow = $("#jqGrid_SubjectBalance").jqGrid('getGridParam','selarrrow');
	if(selrow.length == 0){
		$.zxsaas_plus.showalert("", "请选择单据!");
		return false;
	}else if(selrow.length >1){
		$.zxsaas_plus.showalert("", "请选择一条单据!");
		return false;
	}else if(selrow.length == 1){
		//获取选择数据
		var rowData = $("#jqGrid_SubjectBalance").jqGrid("getRowData", selrow); 
		//单据编号
		$('#verifyBillsCode').val(rowData.billsCode);
		$('#verifyChoose').modal('show');
		$("#jqGrid_tranVerify").jqGrid('setGridParam',{ 
			 url: basePath + "/inventory/storage/price/transfer/receive/getImeiListInMain",
	        postData:{id:rowData.id}, //发送数据 
	        page:1 
	    }).trigger("reloadGrid"); //重新载入 
	}
}

//串号录入回车
function EnterPressOtherImei(){
	if(event.keyCode == 13){
		var i = $.inArray($('#imeiPut').val(), verifyArr);  //返回 下标
		if(i == -1){
			//不在校验数内
			notInVerifyNum += 1;
			hintStr += $('#imeiPut').val()+'串号不在列表内\r';
			$('#hintStr').val(hintStr);  //提示信息
			
		}else{
			//在校验串号内
			//判断是否回车过同样的值
			if($.inArray($('#imeiPut').val(), inputValueArr) != -1){
				//同样的值
				
				var repeatCount=(hintStr.split($('#imeiPut').val())).length;  //重复次数
				hintStr += $('#imeiPut').val()+'串号已在列表中,重复'+repeatCount+'次';
				$('#hintStr').val(hintStr);  //提示信息
			}else{
				//校验成功数
				verifySucceedNum += 1;
				//未校验数
				notVerifyNum -= 1;
				var rowData = $("#jqGrid_tranVerify").jqGrid("getRowData", i+1);
				
				//这是显示校验过的
				$("#jqGrid_tranVerify").jqGrid('setCell',i+1,'verify','√'); 
			}
		}
		//保存输入过的内容
		inputValueArr[verifyCount] = $('#imeiPut').val();
		//回车次数加一
		verifyCount += 1;
		$('#verifytotal').html(verifytotal);
		$('#notVerifyNum').html(notVerifyNum);
		$('#verifySucceedNum').html(verifySucceedNum);
		$('#notInVerifyNum').html(notInVerifyNum);
	}
}

//退出校验
function openVerify(){
	//如果有校验不成功的，需要弹窗提示
	if(verifySucceedNum == verifytotal){
		$('#verifyChoose').modal('hide');
	}else{
		$.zxsaas_plus.showalert("", "校验不完全匹配!");
		$('#verifyChoose').modal('hide');
	}
}




