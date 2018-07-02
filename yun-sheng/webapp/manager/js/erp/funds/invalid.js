//红冲按钮单击事件
function invalid(callback){
	var dateInputDIV = $(
			'<div class="form-horizontal"><div class="form-group">' +
			    '<label for="firstname" class="col-sm-5 control-label" >红冲日期:</label>' +
			    '<div class="col-sm-7" style="padding-left: 0px;">' +
						'<div class="input-group">' +
					'<input type="text" class="form-control" name="hcDate">' +
			    '</div></div>' +
		    '</div></div>'		
	)
	var min = CompareDate(_authList.minDate, $("#billsDate").val()) ? _authList.minDate : $("#billsDate").val();
	var dateInput = dateInputDIV.find("input[name='hcDate']");
	//dateInput.val($("#billsDate").val());
	dateInput.datetimepicker({
		  lang:"ch",           //语言选择中文
	      format:"Y-m-d",      //格式化日期
	      timepicker:false,    //关闭时间选项
	      todayButton:false,    //关闭选择今天按钮
	      minDate: min,
	      maxDate:_authList.maxDate,
		  value: min
	});
		BootstrapDialog.show({
	        title: '单据红冲',
	        message: dateInputDIV,
	        size:BootstrapDialog.SIZE_SMALL,
	        buttons: [{label: '确定', cssClass: 'btn-primary',action: function(dialogItself) {toInvalid(type,callback);dialogItself.close();}},
	                  {label: '取消',action: function(dialogItself){dialogItself.close();}
	        }]
	    });
}

//红冲请求
function toInvalid(type,callback){
	var actionCode="";
	if(type==18){
		actionCode="fk_red";
	}else if(type==19){
		actionCode="sh_red";
	}else if(type==20){
		actionCode="yf_red";
	}else if(type==21){
		actionCode="ys_red";
	}else if(type==27){
		actionCode="qtfk_red";
	}else if(type==28){
		actionCode="qtsk_red";
	}else if(type==29){
		actionCode="nbzz_red";
	}else if($("#adjustType").val() !="" && $("#adjustType").val()!=undefined){
		actionCode="yfystz_red";
	}else if(type==56 || type==57 || type==58 || type==59 || type==87 || type==86 || type==85 || type==84){
		actionCode="yfystz_red";
	}else if(type==51 || type==52 || type==53 || type==54 || type==55){
		actionCode="wljs_red";
	}else if(type==67){
		actionCode="qtsr_red";
	}else if(type==68){
		actionCode="qtzc_red";
	}
	var param=getInvalidParam(type);
	$.request({
		url:"/manager/funds/invalidBills/"+actionCode,
		type : 'POST',  
		dataType: "json",
		contentType :'application/json', 
		data:JSON.stringify(param),
		success:function(data){
		   $.zxsaas_plus.showalert("提示",data.desc);
		   if(data.result !=-1){
			   //$("#billsHeaderForm").data('bootstrapValidator').resetForm();
			    pageIndex=0;
				var param={};
				param.id=data.result;
				param.type=type;
				if(type==67 || type==68 || type==56 || type==57 || type==58 || type==59 || type==51 || type==52 || type==53 || type==54 || type==55 || type==87 || type==86 || type==85 || type==84){
					delete param.type;
					param.billsType=type;
				}
				if(type==29){
					delete param.type;
					loadPageTable(param);
				}
				if(callback){
                    callback();
				}
				else{
					pageAjax(param);
				}
				$("#copy").removeAttr("disabled");
				$(".invalid").attr("disabled",true);
			 }
	    }
	});
}

//获取红冲参数
function getInvalidParam(type){
	var param={};
	if(invalidFlag==0){//付款，收款,预付款，预收款，其它付款，其它收款,内部转账单
		param.type=type;
	}else if(invalidFlag==1){//应付应收调整
		var type=getAdjustBillsType();
		param.type=type;
	}else if(invalidFlag==2){//往来结算单
		var type=getSettlementType();
		param.type=type;
	}
	if(param.type=="29"){
		param.pi_bills_id=$("#headerForm input[name='id']").val();
	}else{
		param.pi_bills_id=$("#billsHeaderForm input[name='id']").val();
	}
	param.pi_bus_opr="2";
	param.pi_invalid_date=$("input[name='hcDate']").val();
	return param;
}