/***button 过账红冲***/
function transferPriceGzHc(num) {
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
		ac_cc = 'tjdb_gz';
	}else if(num == 2) {
		ac_cc = 'tjdb_hc';
	}
	
	storageObj.transferPrice(ibillsMainCC.id, 'TJDB', num,$('#hcTime').val(),ac_cc, function(data) {
		if($.ac_cc(data)) return false;  //判断权限
		
		var str = data.data.str;
		$.zxsaas_plus.showalert("", str);
		if (str == '成功') {
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
function print() {
	if (ibillsMainCC != undefined && ibillsMainCC != null && ibillsMainCC.id != null && ibillsMainCC.id != undefined) {
		$.printBills(basePath + '/storagePrint/print/transferPrice/'+'tjdb_print', {
			billsId: ibillsMainCC.id,
			statusBills: $("#slideThree").is(':checked') ? 0 : 1,
			printType: $('input[name="printRadio"]:checked').val(),
			startTime: $('#startTimeStr').val(),
			endTime: $('#endTimeStr').val()
		});
	} else {
		$.zxsaas_plus.showalert("提示信息", "请选择一张草稿单或正式单!");
	}
	$('#printModal').modal('hide');
}

/***button 复制***/
function copyBills() {
	if (ibillsMainCC != undefined && ibillsMainCC != null && ibillsMainCC.id != undefined && ibillsMainCC.id != null) {
		//切换成草稿单据
		if ($('#slideThree').prop('checked')) {
			//  0正式单据  1草稿单据
			$(".slideThree").toggleClass("color7D5F50");
			$('#slideThree').attr('checked', false);
			$('#slideThree').val('1');
		}
		//看是正式还是草稿进行保存
		if ($('#slideThree').val() == 0) {
			//0正式单据
			billsUpdate('copy');
		} else if ($('#slideThree').val() == 1) {
			//1草稿单据
			draftBillsImport('copy');
		}
	} else {
		$.zxsaas_plus.showalert("", "请选择一张正式单据或者草稿单据进行复制!");
	}
}