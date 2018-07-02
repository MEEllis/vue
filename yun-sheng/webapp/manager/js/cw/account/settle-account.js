//加载完成
$(function(){

	//创建结账对象
	settleAccount = new SettleAccount(basePath);
	$("#yearSelect").val(gl_CurrYear);
	
	//结账第一步
	settleStep(1);
	
	$("#yearSelect").change(function(){
		gl_CurrYear = $(this).val();
		initSettleAccountTable();
	});
});
//初始化会计期间表
var year = 0;
var month = 0;
function initSettleAccountTable(){
	month = 0;
	//查询会计期间
	settleAccount.list(gl_CurrCompanyId,gl_CurrYear,function(data){
		$("#loggingDIV").hide();
		var list = data.data.rows;
		$("#dataTable").html("");
		for ( var i = 0; i < list.length; i++) {
			$("#dataTable").html($("#dataTable").html()+
			 '<tr><td>'+list[i].currentAccountingMonth+'</td><td>'+(list[i].financeAccountsFlag==1?'Y':'')+'</td></tr>');
			if(list[i].financeAccountsFlag == 1){
				month = list[i].currentAccountingMonth;
			}
		}
		if(list[list.length-1].financeAccountsFlag==1 && list[list.length-1].currentAccountingMonth == 12 ){
			//alert("当前年度没有可结账月份");
			//下一步按钮不可用
			$("#goStep2").attr("disabled","disabled");
			$("#canCancleSettleMonth").html(gl_CurrYear+"."+(month));
			$("#canSettleMonth").html("无");
		}else{
			//可结账月
			$("#canSettleMonth").html(gl_CurrYear+"."+(month+1));
			//可取消结账月
			if(month > 1){
				$("#canCancleSettleMonth").html(gl_CurrYear+"."+(month));
			}else{
				$("#canCancleSettleMonth").html("无");
			}
			//下一步按钮可用
			$("#goStep2").removeAttr("disabled");
			$(".currMonth").html(gl_CurrYear + "." + (month+1));
		}
	});
}
//对账
function accountCompare(){
	settleAccount.compare(gl_CurrCompanyId,gl_CurrYear,month,function(data){
		$("#loggingDIV").hide();
		if(data.result == 1){
			$("#dzResultDIV").html("对账成功");
			$("#goStep3").removeAttr("disabled");
		}else{
			$("#goStep3").attr("disabled","disabled");
			errorJson = data.data.obj;
			$("#dzResultDIV").html(data.desc);
		}
	});
}
//显示对照信息
var errorJson = null;
function showErro(){
	console.log(errorJson);
	var html = "<span>总账与明细账</span></br>";
	for(var i=0;i<errorJson.error1.length;i++){
		html=html+""+errorJson.error1[i].desc+"</br>";
	}
	html = html+"<span>总账与辅助总账</span></br>";
	for(var i=0;i<errorJson.error2.length;i++){
		html=html+""+errorJson.error2[i].desc+"</br>";
	}
	html = html+"<span>辅助总账与辅助明细账</span></br>";
	for(var i=0;i<errorJson.error3.length;i++){
		html=html+""+errorJson.error3[i].desc+"</br>";
	}
	$("#infoDIVBody").html(html);
	$("#infoDIV").show();
}
//财务报告
function accountReport(){
	settleAccount.report(gl_CurrCompanyId,gl_CurrYear,month,function(data){$("#loggingDIV").hide();
	    var obj = data.data.obj;
		if(data.result == 1){

		}else{
			$("#goStep4").attr("disabled","disabled");
			$("#bgResultDIV").html(data.desc);
			
		}
		if(obj.listSubject != null && obj.listSubject.length>0){
			var html = "";
			for ( var int = 0; int < obj.listSubject.length; int++) {
				html = html + obj.listSubject[int] + "</br>" ;
			}
			$("#weijiezhuan").html(html+"</br>");
			
		}
		if(obj.listPH2 != null ){
			var html = "";
			html = html + "<tr><td>"+"资产"+"</td> <td>"+"借"+"</td> <td>"+obj.listPH2[0].periodEndAmuont+"</td> <td>"+"负债"+"</td> <td>"+"贷"+"</td> <td>"+obj.listPH2[1].periodEndAmuont+"</td></tr>";
			html = html + "<tr><td>"+"成本"+"</td> <td>"+"借"+"</td> <td>"+obj.listPH2[3].periodEndAmuont+"</td> <td>"+"权益"+"</td> <td>"+"贷"+"</td> <td>"+obj.listPH2[2].periodEndAmuont+"</td></tr>";
			html = html + "<tr><td>"+"损益支出"+"</td> <td>"+"借"+"</td> <td>"+obj.listPH2[4].periodEndAmuont+"</td> <td>"+"损益收入"+"</td> <td>"+"贷"+"</td> <td>"+obj.listPH2[5].periodEndAmuont+"</td></tr>";
			html = html + "<tr><td>"+"合计"+"</td> <td>"+"借"+"</td> <td>"+(obj.listPH2[0].periodEndAmuont+obj.listPH2[3].periodEndAmuont+obj.listPH2[4].periodEndAmuont)+"</td> <td>"+
			                             "合计"+"</td> <td>"+"贷"+"</td> <td>"+(obj.listPH2[1].periodEndAmuont+obj.listPH2[2].periodEndAmuont+obj.listPH2[5].periodEndAmuont)+"</td></tr>";
			
			$("#groupSubjectTabledddd").html(html);
			if((obj.listPH2[0].periodEndAmuont+obj.listPH2[3].periodEndAmuont+obj.listPH2[4].periodEndAmuont) != (obj.listPH2[1].periodEndAmuont+obj.listPH2[2].periodEndAmuont+obj.listPH2[5].periodEndAmuont) ){
				$("#goStep4").attr("disabled","disabled");
			}
		}
		if(obj.listPH1 != null ){
			var dd = obj.listPH1[0].currentPeriodBorrowAmuont-obj.listPH1[0].currentPeriodLoanAmuont
			$("#allR").html("总借贷平衡："+dd);
			if(dd != 0 ){
				$("#goStep4").attr("disabled","disabled");
			}
		}
		$("#workcuont").html("本期共"+obj.workload.total+"个凭证，共"+obj.workload.noPost+"个未记账");
		if(obj.workload.noPost != 0 ){
			$("#goStep4").attr("disabled","disabled");
		}
		$("#dhhhhh").html(obj.isBroken==false?"无断号":"有断号");
	});
}
//结账
function closingAccounts(){
	settleAccount.closingAccounts(gl_CurrCompanyId,gl_CurrYear,month,function(data){$("#loggingDIV").hide();
		if(data.result == 1){
			//显示信息
			$("#jzResultDIV").html("结账成功");
		}else{
			$("#jzResultDIV").html(data.desc);
		}
	});
}
//切换步骤
function settleStep(index){
	$("#loggingDIV").show();
	if(index == 1){
		
		//会计期间
		initSettleAccountTable();
	}else if(index == 2){
	
		//对账
		accountCompare();
	}else if(index == 3){
		
		//工作报告
		accountReport();
	}else if(index == 4){
		$("#loggingDIV").hide();
	}
	$("#settleAccount1").modal('hide');
	$("#settleAccount2").modal('hide');
	$("#settleAccount3").modal('hide');
	$("#settleAccount4").modal('hide');
	$("#settleAccount"+index).modal('show');
}
