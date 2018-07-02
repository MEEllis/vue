$(function(){
//	$('#printModal').modal('show');
	
	//新开单
	$("#newBills").click(function(){
		location.href='/manager/inventory/retail/delivery/main';
	})
	
	 //    历史单据
    $('.hisbill').click(function(){
		 window.parent.openWorkBoxByMenutext('零售收银台',basePath + '/inventory/retail/cashier/main?tabType=1',true);
    })
	
//	打印
	$(".plft").click(function(){
		var id = $('#billsId').val();
		$.printBills(basePath + '/inventory/retail/cashier/kaidan',{billsId:id});
	});
	
	$(".prig").click(function(){
		var id = $('#billsId').val();
		$.printBills(basePath + '/inventory/retail/cashier/kaidan',{billsId:id,printType:'xiaopiao'});
	});
	
	$('#saveModify').click(function(){
		var id = $('#billsId').val();
		var remark = $('.retailRemark').val().trim();
		$.ajax({
			type: 'post',
			url: "/manager/inventory/retail/cashier/updateRetailRemark",
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
				var payreceipt = (data.payreceiptList == undefined)?"":data.payreceiptList;
				
				data.memberTelephone = data.memberTelephone==null?"":data.memberTelephone;
				data.memberName = data.memberName==null?"":data.memberName;
				$('.billnum').text(data.billsCode);
				$('.storeInput').text(data.sectionName);
				$('.saleInput').text(data.managerName);
				$('.dateInput').text(data.billsDateStr);
				$('.viptel').text(data.memberTelephone);
				$('.vipname').text(data.memberName);
				
				if(detail.length<1){
					$('.productEentry').hide();
				}else{
					$('.productEentry').show();
					var tr1 = "";
					var t1z = 0;
					$.each(detail,function(i,item){
						var isF = (item.isGift == 0)?"":"checked";
						var isT = (item.isInstall == 0)?"":"checked";
						var imeistr ="";
						if(item.imei != null){
							imeistr += "主串："+item.imei
						}
						if(item.auxiliaryImei !=null){
							imeistr += "<br />辅串："+item.auxiliaryImei
						}
						
						if(item.barCode != null){
							imeistr += "<br />条码："+item.barCode	
						}
						item.color = (item.color == null)?"":item.color;
						item.categoryName = (item.categoryName == null)?"":item.categoryName;
						item.goodsModels = (item.goodsModels == null)?"":item.goodsModels;
						item.configure = (item.configure == null)?"":item.configure;
						item.saleManName1 = (item.saleManName1 == null)?"":item.saleManName1;
						item.saleManName2 = (item.saleManName2 == null)?"":item.saleManName2;
						item.busName = (item.busName == null)?"":item.busName;
						item.remark = (item.remark == null)?"":item.remark;
						
						t1z+=item.amount*1;
						tr1+= '<tr><td>'+ item.orderno + '</td><td><input type="checkbox" disabled="disabled" '+ isF + 
						' ></td><td class="shopMes"><div>'+ item.goodsName + 
						'</div><div class="shopMesBox"><p class="shopp1">编码 :' + item.goodsCode + 
						'</p><p class="shopp1">型号 :' + item.goodsModels + '</p><p class="shopp2">颜色 :'+ item.color +
						'</p><p class="shopp2">类别 :' + item.categoryName + 
						'</p><p class="shopp2">配置 :'+ item.configure +'</p></div></td><td>'+ imeistr +
						'</td><td>'+ item.goodsCount + '</td><td>'+ item.retailPrice +
						'</td><td>'+ item.disCount + '</td><td>'+ item.disPrice +
						'</td><td>'+ item.amount + '</td><td>'+ item.saleManName1 +
						'</td><td>'+ item.saleManName2 + '</td><td>'+ item.busName +
						'</td><td><input type="checkbox" disabled="disabled" '+ isT +
						' ></td><td>' + item.storageName +'</td><td>'+ item.remark + '</td></tr>'
					});
					$('.t1_zh').text(t1z.toFixed(2));
					$('#productInfoTable tbody').html(tr1);
				}
				
				if(operator.length<1){
					$('.carrierBusiness').hide();
				}else{
					var tr2 = "";
					var t2s = 0;
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
						
						t2s+=item.busAmount*1;
						
						tr2+= '<tr><td>'+ (i+1) + '</td><td>'+ item.unitName + 
						'</td><td>'+ item.busName + '</td><td>'+ item.busAmount +
						'</td><td>'+ item.busNo + '</td><td>'+ item.tel +
						'</td><td>'+ item.telImei + '</td><td>'+ item.debuBond +
						'</td><td>'+ item.saleManName1 + '</td><td>'+ item.saleManName2+
						'</td><td>' + item.commissionWill +'</td><td>'+ item.remark + '</td></tr>'
					});
					$('.carrierBusiness').show();
					$('.t2_sj').text(t2s.toFixed(2));
					$('#carrBusinTable tbody').html(tr2);
				}
				
				if(service.length<1){
					$('.Value-addedServices').hide();
				}else{
					var tr3 = "";
					var t3s = 0;
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
						
						var  userNum = item.userNum;
						var  serviceDue = item.serviceDue;
						if(userNum=="-1"){userNum=""}
						if(serviceDue=="-1"){ serviceDue=""}
						
						if(data.isVip=="1"){
							if(item.mUserNum!=null){
								 userNum = item.mUserNum;
							 }
						 }
						t3s+=item.serviceAmount*1;
						
						tr3+= '<tr><td>'+ (i+1) + '</td><td>'+ item.serviceName + 
						'</td><td>'+ item.saleManName1 + '</td><td>'+ item.serviceAmount +
						'</td><td>'+ item.stratDate + '</td><td>'+ item.orderno +
						'</td><td>'+ item.setPrice + '</td><td>'+ item.memberPrice +
						'</td><td>'+ item.goodsName + '</td><td>'+ item.imei +
						'</td><td>'+ userNum + '</td><td>'+ serviceDue +
						'</td><td>' + item.saleManName2 +'</td><td>'+ item.remark + '</td></tr>'
					});
					$('.Value-addedServices').show();
					$('.t3_sj').text(t3s.toFixed(2));
					$('#Value-addedTable tbody').html(tr3);
				}
				
				if(coupon.length<1){
					$('.ThirdpartyDiscount').hide();
				}else{
					var tr4 = "";
					var t4d = 0;
					$.each(coupon,function(i,item){
						item.unitName = (item.unitName == null)?"":item.unitName;
						item.couponName = (item.couponName == null)?"":item.couponName;
						item.busNo = (item.busNo == null)?"":item.busNo;
						item.saleManName1 = (item.saleManName1 == null)?"":item.saleManName1;
						item.saleManName2 = (item.saleManName2 == null)?"":item.saleManName2;
						item.remark = (item.remark == null)?"":item.remark;
						
						t4d+=item.amount*1;
						
						tr4+= '<tr><td>'+ (i+1) + '</td><td>'+ item.unitName + 
						'</td><td>'+ item.couponName + '</td><td>'+ item.amount +
						'</td><td>'+ item.busNo + '</td><td>'+ item.saleManName1 +
						'</td><td>' + item.saleManName2 +'</td><td>'+ item.remark + '</td></tr>'
					});
					$('.ThirdpartyDiscount').show();
					$('.t4_dx').text(t4d.toFixed(2));
					$('.arrialAmount').text(t4d.toFixed(2));
					$('#DiscountTable tbody').html(tr4);
				}
				
				if(install.length<1){
					$('.StaBusiness').hide();
				}else{
					var tr5 = "";
					var t5f = 0,t5d = 0,t5y = 0;
					$.each(install,function(i,item){
						item.busNo = (item.busNo == null)?"":item.busNo;
						item.imei = (item.imei == null)?"":item.imei;
						item.saleManName1 = (item.saleManName1 == null)?"":item.saleManName1;
						item.saleManName2 = (item.saleManName2 == null)?"":item.saleManName2;
						item.monthsPay = (item.monthsPay == null)?"":item.monthsPay;
						item.remark = (item.remark == null)?"":item.remark;
						
						t5f+=item.amount*1;
						t5d+=item.installmentBalance;
						t5y+=item.commissionWill;
						
						tr5+= '<tr><td>'+ (i+1) + '</td><td>'+ item.unitName + 
						'</td><td>'+ item.instalName + '</td><td>'+ item.amount +
						'</td><td>'+ item.installAmount + '</td><td>'+ item.installmentBalance +
						'</td><td>'+ item.installmentCount + '</td><td>'+ item.commissionWill +
						'</td><td>'+ item.busNo + '</td><td>'+ item.imei +
						'</td><td>'+ item.saleManName1 + '</td><td>'+ item.saleManName2 +
						'</td><td>' + item.monthsPay +'</td><td>'+ item.remark + '</td></tr>'
					});
					$('.StaBusiness').show();
					$('.t5_fq').text(t5f.toFixed(2));
					$('.t5_dk').text(t5d.toFixed(2));
					$('.t5_yj').text(t5y.toFixed(2));
					$('#StaBuTable tbody').html(tr5);
				}
				$('.amountDue').text(data.totGoodsAmount);
				
				$('.arrears').text(data.totDebtAmount);
				$('.billsAmount').text(data.totAmount);
				$('.retailDeposit').text(data.totDepostitAmount);
				$('.installMentLoad').text(data.totInstallAmount);
				$('.reduceAmout').text(data.reduceAmout);
				$('.promotionalCoupons').text(data.promotionAccount);
				$('.memberStoredValue').text(data.memberAmountMoney );
				$('.pointArrived').text(data.memberScoreMoney);
				$('.retailRemark').val(data.remark);
				
				
				if(payreceipt.length>0){
					var s1=0,s2=0,s3=0,s4=0,s5=0,jh=0;
					$.each(payreceipt,function(i,item){
						switch(item.accountTypeName)
						{
						case "现金":
							s1+=item.payreceiptAmout;
						  break;
						case "银行":
							s2+=item.payreceiptAmout;
						  break;
						case "支付宝":
							s3+=item.payreceiptAmout;
						  break;
						case "微信":
							s4+=item.payreceiptAmout;
						  break;
						case "其它":
							s5+=item.payreceiptAmout;
						  break;
						case "聚合收款":
							jh+=item.payreceiptAmout;
						  break;
						default:
							break;
						}
					});
					$('.retailAmount').text(s1.toFixed(2));
					$('.posAmount').text(s2.toFixed(2));
					$('.alipayAmount').text(s3.toFixed(2));
					$('.wxAmount').text(s4.toFixed(2));
					$('.otherAccount').text(s5.toFixed(2));
					if(jh>0){
						$('.paidAmount').html(data.totPayAmount+'<font style="font-size: 16px;">(聚合收款：'+ jh +')</font>').css({position:'absolute',width:'320px'});
					}else{
						$('.paidAmount').html(data.totPayAmount);
					}
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