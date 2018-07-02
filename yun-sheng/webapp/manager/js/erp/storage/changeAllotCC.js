/***button 过账红冲***/
function changeAllotGzHc(num){
	if(num == 1 && $('#slideThree').val() == 0){
		$.zxsaas_plus.showalert("提示信息","请选择一张草稿单过账!");
		return false; 
	}
	if(num == 2 && $('#slideThree').val() == 1){
		$.zxsaas_plus.showalert("提示信息","请选择一张正式单作废!");
		return false; 
	}
	if($.isEmptyObject(ibillsMainCC) || ibillsMainCC == undefined){
		$.zxsaas_plus.showalert("提示信息","请选择一张单据!");
		return false; 
	}
	
	//权限设置    过账作废
	var ac_cc = '';
	if(num == 1) {
		ac_cc = 'bjdb_gz';
	}else if(num == 2) {
		ac_cc = 'bjdb_hc';
	}
	
	storageObj.changeAllot(ibillsMainCC.id,'BJDB',num,$('#hcTime').val(),ac_cc,function(data){
		//判断权限
		if(data.desc != null) {
			$.zxsaas_plus.showalert("提示信息", data.desc);
			return false;
		}
		
		var str = data.data.str;
		$.zxsaas_plus.showalert("",str);
		if(str == '成功'){
			if(num == '1'){
				$("#slideThree").click();
			}else{
				$('#hcModal').modal('hide');
				lastForm();
			}
		}
	}); 
}

/***button 红冲弹窗***/
function hcClick(){
	$('#hcModal').modal('show');
	
	$("#hcTime").val($.DateFormat(new Date(),"yyyy-MM-dd"));
	
	$("#hcTime").datetimepicker({
		  lang:"ch",           //语言选择中文
	    format:"Y-m-d",      //格式化日期
	    timepicker:false,    //关闭时间选项
	    todayButton:false    //关闭选择今天按钮
		});
}

/***button 打印***/
function print(){
	if(ibillsMainCC != undefined && ibillsMainCC != null && ibillsMainCC.id != null && ibillsMainCC.id != undefined){
		$.printBills(basePath + '/storagePrint/print/transferPrice/'+'bjdb_print', 
			{
		      billsId:ibillsMainCC.id,
		      statusBills:$("#slideThree").is(':checked')?0:1,
		      printType:$('input[name="printRadio"]:checked').val(),
		      startTime:$('#startTimeStr').val(),
		      endTime:$('#endTimeStr').val()
		    }
		);
	}else{
		$.zxsaas_plus.showalert("提示信息","请选择一张草稿单或正式单!");
	}
	$('#printModal').modal('hide');
}
