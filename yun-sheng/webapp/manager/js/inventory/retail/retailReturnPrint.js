$(document).ready(function(){
    if(CODELIST.indexOf('B_LSTHD_0020') == -1){
        $('#printModal').modal('hide');
        $('#AUTH').find('button[data-target="#printModal"]').hide();
    }else{
        if($('#billsCode').val() ==null || $('#billsCode').val() =="" || $('#billsCode').val() ==undefined ){
            $('#printModal').modal('show');
            $('#AUTH').find('button[data-target="#printModal"]').show();
        }else{
            $('#printModal').modal('hide');
            $('#AUTH').find('button[data-target="#printModal"]').show();
        }
    }

	//新开单
	$("#newBills").click(function(){
		location.href='/manager/inventory/retail/returnGoods/main';
	})
	
	 //    历史单据
    $('.hisbill').click(function(){
		 window.parent.openWorkBoxByMenutext('零售收银台',basePath + '/inventory/retail/cashier/main?tabType=2',true);
    })
	
//	打印
	$(".plft").click(function(){
		var id = $('#billsId').val();
		$.printBills(basePath + '/inventory/retail/cashier/tuihuo',{billsId:id});
	});
	
	$(".prig").click(function(){
		var id = $('#billsId').val();
		$.printBills(basePath + '/inventory/retail/cashier/tuihuo',{billsId:id,printType:'xiaopiao'});
	});
	
	$('#saveModify').click(function(){
		var id = $('#billsId').val();
		var remark = $('.retailRemark').val().trim();
		$.ajax({
			type: 'post',
			url: "/manager/inventory/retail/cashier/updateReturnRemark",
			data:{
				'orderId': id,
				'remark': remark
			},
			dataType: "json",
			success: function(data) {
				if(data.result == 1){
					$.zxsaas_plus.showalert("提示",data.desc);
				}else{
					$.zxsaas_plus.showalert("提示",data.desc);
				}
			}
		});
	});
	
	var id = $('#billsId').val();
	$.request({
		type:'POST',
    	url:'/manager/inventory/retail/delivery/loadDraftOrder',
    	dataType:'json',
    	data:{
			id: id
		},
    	success:function(data){
			if(data.result==1){
				var data = data.data.obj;
				var detail = (data.detailList == undefined)?"":data.detailList;
				var operator = (data.operatorList == undefined)?"":data.operatorList;
				var service = (data.serviceList == undefined)?"":data.serviceList;
				var coupon = (data.couponList == undefined)?"":data.couponList;
				var install = (data.installList == undefined)?"":data.installList;
				var payreceipt = (data.payDetail == undefined)?"":data.payDetail;
				
				data.memberTelephone = data.memberTelephone==null?"":data.memberTelephone;
				data.memberName = data.memberName==null?"":data.memberName;
				$('.billnum').text(data.billsCode);
				$('.storeInput').text(data.sectionName);
				$('.saleInput').text(data.managerName);
				$('.dateInput').text(data.billsDateStr);
				$('.viptel').text(data.memberTelephone);
				$('.vipname').text(data.memberName);

                if (data.billsStatus == 7) {
                    $('.rightMap img:eq(0)').attr('src', '/manager/images/status/statusRed.png');
                }
                if (data.auditStatus == 1) {
                    $('.rightMap img:eq(1)').attr('src', '/manager/images/audit.png');
                } else {
                    $('.rightMap img:eq(1)').attr('src', '/manager/images/auditNo.png');
                }


                var deposit = 0;
				if(detail.length<1){
					$('.productEentry').hide();
				}else{
					$('.productEentry').show();
					var tr1 = "";
					var t1s = 0,t1j = 0;
					$.each(detail,function(i,item){
						var isF = (item.isGift == 0)?"":"checked";
						var isT = (item.isInstall == 0)?"":"checked";
						
						item.imei = (item.imei == null)?"":item.imei;
						item.auxiliaryImei = (item.auxiliaryImei == null)?"":item.auxiliaryImei;
						item.color = (item.color == null)?"":item.color;
						item.categoryName = (item.categoryName == null)?"":item.categoryName;
						item.goodsModels = (item.goodsModels == null)?"":item.goodsModels;
						item.configure = (item.configure == null)?"":item.configure;
						item.saleManName1 = (item.saleManName1 == null)?"":item.saleManName1;
						item.saleManName2 = (item.saleManName2 == null)?"":item.saleManName2;
						item.busName = (item.busName == null)?"":item.busName;
						item.remark = (item.remark == null)?"":item.remark;
						
						t1s+=item.goodsCount*1;
						t1j+=item.amount*1;
						
						tr1+= '<tr><td>'+ (i+1) + '</td><td><input type="checkbox" disabled="disabled" '+ isF + 
						' ></td><td>'+ item.storageName +
						'</td><td class="shopMes"><div>'+ item.goodsName + 
						'</div><div class="shopMesBox"><p class="shopp1">编码 :' + item.goodsCode + 
						'</p><p class="shopp1">型号 :' + item.goodsModels + '</p><p class="shopp2">颜色 :'+ item.color +
						'</p><p class="shopp2">类别 :' + item.categoryName + 
						'</p><p class="shopp2">配置 :'+ item.configure +
						'</p></div></td><td>'+ item.imei +
						'</td><td>'+ item.auxiliaryImei +
						'</td><td>'+ item.goodsCount + '</td><td>'+ item.amount +
						'</td><td>'+ item.saleManName1 + '</td><td>'+ item.saleManName2 +
						'</td><td>'+ item.busName +
						'</td><td><input type="checkbox" disabled="disabled" '+ isT +
						' ></td><td>'+ item.retailPrice +
						'</td><td>'+ item.oldAmount + 
						'</td><td>'+ item.oldPrice +
						'</td><td>'+ item.remark + '</td></tr>'
					});
					deposit+= t1j;
					$('.t1_sl').text(t1s);
					$('.t1_je').text(t1j.toFixed(2));
					$('#productInfoTable tbody').html(tr1);
				}
				
				if(operator.length<1){
					$('.carrierBusiness').hide();
				}else{
					var tr2 = "";
					var t2j = 0;
					var t2s1 = 0;
					var t2s2 = 0;
					var t2s3 = 0;
					$.each(operator,function(i,item){
						item.unitName = (item.unitName == null)?"":item.unitName;
						item.busName = (item.busName == null)?"":item.busName;
						item.busAmount = (item.busAmount == null)?"":item.busAmount;
						item.busNo = (item.busNo == null)?"":item.busNo;
						item.tel = (item.tel == null)?"":item.tel;
						item.telImei = (item.telImei == null)?"":item.telImei;
						item.saleManName2 = (item.saleManName2 == null)?"":item.saleManName2;
						item.commissionWill = (item.commissionWill == null)?"":item.commissionWill;
						item.remark = (item.remark == null)?"":item.remark;
                        item.qty = Number($.trim(item.qty))
						
						t2j+=item.busAmount*1;
                        t2s1+=item.qty*1;
                        t2s2+=item.commissionWill*1;
                        t2s3+=item.debuBond*1;
						
						tr2+= '<tr><td>'+ (i+1) + '</td><td>'+ item.unitName + 
						'</td><td>'+ item.busName + 
						'</td><td>'+ item.oldAmount +
                         '</td><td>'+ item.busAmount +
						'</td><td>'+ Number(item.qty) +
						'</td><td>'+ Number(item.commissionWill) +

						'</td><td>'+ item.busNo + 
						'</td><td>'+ item.saleManName1 + '</td><td>'+ item.saleManName2+
						'</td><td>'+ item.tel +
						'</td><td>'+ item.telImei + 
						'</td><td>'+ item.debuBond +

						'</td><td>'+ item.remark + '</td></tr>'
					});
					deposit+= t2j;
					$('.carrierBusiness').show();
					$('.t2_je').text(t2j.toFixed(2));
                    $('.t2_sj1').text(t2s1);
                    $('.t2_sj2').text(t2s2.toFixed(2));
                    $('.t2_sj3').text(t2s3.toFixed(2));
					$('#carrBusinTable tbody').html(tr2);
				}
				
				if(service.length<1){
					$('.Value-addedServices').hide();
				}else{
					var tr3 = "";
					var t3k = 0;
					$.each(service,function(i,item){
						item.orderno = (item.orderno == null)?"":item.orderno;
						item.setPrice = (item.setPrice == null)?"":item.setPrice;
						item.memberPrice = (item.memberPrice == null)?"":item.memberPrice;
						item.goodsName = (item.goodsName == null)?"":item.goodsName;
						item.imei = (item.imei == null)?"":item.imei;
						item.userNum = (item.userNum == null)?"":item.userNum;
						item.serviceDue = (item.serviceDue == null)?"":item.serviceDue;
						item.saleManName1 = (item.saleManName1 == null)?"":item.saleManName1;
						item.saleManName2 = (item.saleManName2 == null)?"":item.saleManName2;
						item.remark = (item.remark == null)?"":item.remark;
						item.flowNo = (item.flowNo == null)?"":item.flowNo;
						
						t3k+=item.serviceAmount*1;
						
						var  userNum = item.userNum;
						var  serviceDue = item.serviceDue;
						if(userNum=="-1"){userNum=""}
						if(serviceDue=="-1"){ serviceDue=""}
						
						if(data.isVip=="1"){
							if(item.mUserNum!=null){
								 userNum = item.mUserNum;
							 }
						 }
						
						tr3+= '<tr><td>'+ (i+1) + '</td><td>'+ item.serviceName + 
						'</td><td>'+ item.saleManName1 + '</td><td>'+ item.serviceAmount +
						'</td><td>'+ item.stratDate +
						'</td><td>'+ item.oldAmount +
						'</td><td>'+ serviceDue + '</td><td>'+ userNum +
						'</td><td>'+ item.goodsName + '</td><td>'+ item.imei +
						'</td><td>'+ item.setPrice + '</td><td>'+ item.memberPrice +
						'</td><td>' + item.saleManName2 +
						'</td><td>' + item.flowNo +
						'</td><td>'+ item.remark + '</td></tr>'
					});
					deposit+= t3k;
					$('.Value-addedServices').show();
					$('.t3_tk').text(t3k.toFixed(2));
					$('#Value-addedTable tbody').html(tr3);
				}
				
				if(coupon.length<1){
					$('.ThirdpartyDiscount').hide();
				}else{
					var tr4 = "";
                    var t4y = 0;
					var t4t = 0;
					var t4j = 0;
					$.each(coupon,function(i,item){
						item.unitName = (item.unitName == null)?"":item.unitName;
                        item.settleAmount = (item.settleAmount == null)?"0":item.settleAmount;
						item.couponName = (item.couponName == null)?"":item.couponName;
						item.busNo = (item.busNo == null)?"":item.busNo;
						item.saleManName1 = (item.saleManName1 == null)?"":item.saleManName1;
						item.saleManName2 = (item.saleManName2 == null)?"":item.saleManName2;
						item.remark = (item.remark == null)?"":item.remark;

                        t4y+=item.oldAmount*1;
						t4t+=item.amount*1;
                        t4j+=item.settleAmount*1;

						tr4+= '<tr><td>'+ (i+1) + '</td><td>'+ item.unitName + 
						'</td><td>'+ item.couponName + 
						'</td><td>'+ item.oldAmount +
						'</td><td>'+ item.amount +
						'</td><td>'+ item.settleAmount +
						'</td><td>'+ item.busNo + '</td><td>'+ item.saleManName1 +
						'</td><td>' + item.saleManName2 +'</td><td>'+ item.remark + '</td></tr>'
					});
					$('.ThirdpartyDiscount').show();
                    $('.t4_yd').text(t4y.toFixed(2));
					$('.t4_th').text(t4t.toFixed(2));
					$('.t4_js').text(t4j.toFixed(2));
					$('#DiscountTable tbody').html(tr4);
				}
				
				if(install.length<1){
					$('.StaBusiness').hide();
				}else{
					var tr5 = "";
					var t5t = 0;
					$.each(install,function(i,item){
						item.busNo = (item.busNo == null)?"":item.busNo;
						item.imei = (item.imei == null)?"":item.imei;
						item.saleManName1 = (item.saleManName1 == null)?"":item.saleManName1;
						item.saleManName2 = (item.saleManName2 == null)?"":item.saleManName2;
						item.monthsPay = (item.monthsPay == null)?"":item.monthsPay;
						item.remark = (item.remark == null)?"":item.remark;
						item.retType = (item.retType == 1)?"现金退款":"注销分期";
						
						t5t+=item.refundAmount*1;
						
						tr5+= '<tr><td>'+ (i+1) + 
						'</td><td>'+ item.retType + //退款方式
						'</td><td>'+ item.unitName + 
						'</td><td>'+ item.instalName + 
						'</td><td>'+ item.amount +
						'</td><td>'+ item.installAmount + 
						'</td><td>'+ item.installmentCount + 
						'</td><td>'+ item.installmentBalance +
						'</td><td>'+ item.refundAmount +
						'</td><td>'+ item.commissionWill +
						'</td><td>'+ item.saleManName1 + '</td><td>'+ item.saleManName2 +
						'</td><td>'+ item.busNo + '</td><td>'+ item.imei +
						'</td><td>' + item.monthsPay +'</td><td>'+ item.remark + '</td></tr>'
					});
					$('.StaBusiness').show();
					$('.t5_tk').text(t5t.toFixed(2));
					$('#StaBuTable tbody').html(tr5);
				}
				$('.amountDue').text(data.totGoodsAmount);
				$('.paidAmount').text(data.totPayAmount);
				$('.arrears').text(data.totDebtAmount);
				$('.billsAmount').text(data.oldAmount);
				$('.retailDeposit').text(deposit.toFixed(2));
				$('.arrialAmount').text(data.oldBillsCode);
				$('.reduceAmout').text(data.reduceAmout);
				$('.promotionalCoupons').text(data.promotionAccount);
				$('.memberStoredValue').text(data.memberAmountMoney );
				$('.pointArrived').text(data.memberScoreMoney);
				$('.retailRemark').val(data.remark);
				
				
				if(payreceipt.length>0){
					var s1=0,s2=0,s3=0,s4=0,s5=0;
					$.each(payreceipt,function(i,item){
						switch(item.accountTypeName)
						{
						case "现金":
							s1+=item.amountStr;
						  break;
						case "银行":
							s2+=item.amountStr;
						  break;
						case "支付宝":
							s3+=item.amountStr;
						  break;
						case "微信":
							s4+=item.amountStr;
						  break;
						case "其它":
							s5+=item.amountStr;
						  break;
						default:
							break;
						}
					});
					$('.retailAmount').text( Number(s1).toFixed(2));
					$('.posAmount').text(Number(s2).toFixed(2));
					$('.alipayAmount').text(Number(s3).toFixed(2));
					$('.wxAmount').text(Number(s4).toFixed(2));
					$('.otherAccount').text(Number(s5).toFixed(2));
				}else{
					$('.mespay').html('');
				}
				
			}else{
				$.zxsaas_plus.showalert('error',data.desc); 
			}
		},
		error:function(){
			alert('请求失败！')
		}
	})
	
})