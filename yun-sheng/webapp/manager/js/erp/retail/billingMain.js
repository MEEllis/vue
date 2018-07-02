$(function(){
	
//报表
	if(billsCode!=""){
		$.request({
    		type:'post',
        	url:basePath+'/retail/billing/loadBillingOrder',
        	data:{
				"billsCode":billsCode
			},
        	dataType:'json',
        	success:function(data){
				if(data.result==1){
					if(data.data.orderDetailVo==null){
						$.zxsaas_plus.showalert('warning','没有查到单据!');
					}else{
						var res=data.data.orderDetailVo;
						checkDoc(res);
					}
				}else{
					$.zxsaas_plus.showalert('error',data.desc);
					return false;
				}
    		},
    		error:function(){
    			alert('请求失败！')
    		}
    	})
	}
//报表over
	
	var BILLSID;//单据ID
	var isView=false;//单据状态，true为查询，false为操作
//首单
	$('#firstSingle').click(function(){
    	$.request({
    		type:'post',
        	url:basePath+'/retail/billing/loadBillingOrder?queryCodeStr=F',
        	dataType:'json',
        	success:function(data){
				if(data.result==1){
					if(data.data.orderDetailVo!=null){
						var res=data.data.orderDetailVo;
						checkDoc(res);
					}else{
						$.zxsaas_plus.showalert('error',data.desc);
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
//上一单
	$('#prevSingle').click(function(){
		$.request({
    		type:'post',
        	url:basePath+'/retail/billing/loadBillingOrder?queryCodeStr=P',
        	data:{
				refBillsId:BILLSID
			},
        	dataType:'json',
        	success:function(data){
				if(data.result==1){
					if(data.data.orderDetailVo==null){
						$.zxsaas_plus.showalert('warning','没有上一单了');
					}else{
						var res=data.data.orderDetailVo;
						checkDoc(res);
					}
				}else{
					$.zxsaas_plus.showalert('warning',data.desc);
					return false;
				}
    		},
    		error:function(){
    			alert('请求失败！')
    		}
    	})
	})
//下一单
	$('#nextSingle').click(function(){
		$.request({
    		type:'post',
        	url:basePath+'/retail/billing/loadBillingOrder?queryCodeStr=N',
        	data:{
				refBillsId:BILLSID
			},
        	dataType:'json',
        	success:function(data){
				if(data.result==1){
					if(data.data.orderDetailVo==null){
						$.zxsaas_plus.showalert('warning','没有下一单了');
					}else{
						var res=data.data.orderDetailVo;
						checkDoc(res);
					}
				}else{
					$.zxsaas_plus.showalert('warning',data.desc);
					return false;
				}
    		},
    		error:function(){
    			alert('请求失败！')
    		}
    	})
	})
//末单
	$('#finalSingle').click(function(){
		$.request({
    		type:'post',
        	url:basePath+'/retail/billing/loadBillingOrder?queryCodeStr=L',
        	dataType:'json',
        	success:function(data){
				if(data.result==1){
					if(data.data.orderDetailVo!=null){
						var res=data.data.orderDetailVo;
						checkDoc(res);
					}else{
						$.zxsaas_plus.showalert('error',data.desc);
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
//新开单
	$('#newSingle').click(function(){
		window.location.href=basePath+'/retail/billing/retailBillingMain';
	})
//引入定单
    $('#introSingle').click(function () {
        $("#myModal_introSingle").modal('show');
        $('#introSearchBtn').click(function(){
        	$.request({
            	type:'post',
            	url:basePath+'/retail/billing/searchDepositGoodsVoList',
            	data:{
        			sectionId:$('#sectionId').val(),
        			queryKey:$('#introSearch').val()
	        	},
            	dataType:'json',
            	success:function(data){
	        		if(data.result==1){
	        			var intro=data.data.depositGoodsVoList;
	            		var html;
	            		if(intro.length==0){
	            			$("#table_introSingle tbody").html('')
	            		}else{
	            			$.each(intro,function(i,val){
	            				for(var i in val){
	            					if(val[i]==null){
	            						val[i]=''
	            					}
	            				}
	                			html+="<tr><td><input class='rb_check' type='checkbox'/><input class='introCode' value='"+val.retailMainId+"' type='hidden'/><input class='rb_introDepositId' value='"+val.retailDepositId+"' type='hidden'/></td>"+
	    		                    "<td class='rb_introOrderCode'>"+val.billsCode+"</td>"+
	    		                    "<td class='rb_introName'>"+val.customerName+"</td>"+
	    		                    "<td class='rb_introTel'>"+val.customerTel+"</td>"+
	    		                    "<td class='rb_introProName'>"+val.name+"</td>"+
	    		                    "<td class='rb_introModel'>"+val.models+"</td>"+
	    		                    "<td class='rb_introColor'>"+val.color+"</td>"+
	    		                    "<td><input class='rb_introTTD' type=text/></td>"+
	    		                    "<td class='rb_introDeposit'>"+val.deposit+"</td>"+
	    		                    "<td class='rb_introWriteOff'>"+val.hxAmount+"</td>"+
	    		                    "<td class='rb_introRetired'>"+val.tdAmount+"</td>"+
	    		                    "<td class='rb_introBalance'>"+val.remainderAmount+"</td>"+
	    		                    "<td class='rb_introOrderNum'>"+val.goodsNum+"</td>"+
	    		                    "<td class='rb_introWriteOffNum'>"+val.hxNum+"</td>"+
	    		                    "<td class='rb_introRetiredNum'>"+val.tdNum+"</td>"+
	    		                    "<td class='rb_introNumBalance'>"+val.remainderNum+"</td>"+
	    		                    "<td class='rb_introRemark'>"+val.remark+"</td></tr>";
	                		});
	                		$("#table_introSingle tbody").html(html)
	            		}
	        		}else{
	        			$.zxsaas_plus.showalert('error',data.desc);
	        		}
            		
        		},
        		error:function(){
        			alert('运营商业务请求失败！')
        		}
            });
        })
    });
    	//定单引入勾选
    var introCode;
    var introCodeHasVal=false;
    $(document).on('click','.rb_check',function(e){
    	if($(this).prop('checked')==true){
    		if(!introCodeHasVal){
    			introCode=$(this).next('input').val();
    			introCodeHasVal=true;
    		}else{
    			if(introCode!=$(this).next('input').val()){
    				$.zxsaas_plus.showalert('warning','零售定单编码不同！');
    				return false;
    			}
    		}
    	}else{
    		//如果只有最后一个可以被勾选，那么关掉开关，需要重新给introCode赋值
    		for(var i=0,q=0;i<$('#table_introSingle tbody').find('.rb_check').length;i++){
    			if($('#table_introSingle tbody').find('.rb_check:eq('+i+')').prop('checked')==true){
    				q++;
    			}
    		}
    		if(q==0){
    			introCodeHasVal=false;
    		}
    	}
    })
    $("#myModal_introSingle").on('hidden.bs.modal',function(){
    	$('#introSearchBtn').off()
    })
    $(document).on('keyup','.rb_introTTD',function(){
    	$(this).val(($(this).val().replace(/[^0-9.]/g,'')));//只允许数字小数点输入
    })
    $(document).on('focusout','.rb_introTTD',function(){
    	var _this=$(this)
    	if(Number(_this.val())>Number(_this.closest('tr').find('.rb_introBalance').text())){
    		$.zxsaas_plus.showconfirmsure('提示','引入金额不能大于定金结余',function(){
    			_this.focus()
    		});
    	}
    	$(this).val(Math.round(Number($(this).val())*100)/100)
    })
    $('#introSingle_sure').click(function(){
    	var tol=0;
    	var len=$('#table_introSingle tbody tr').length;
    	for(var i=0;i<len;i++){
    		if($('#table_introSingle tbody tr:eq('+i+')').find('.rb_check').prop('checked')==true){
    			$('#depositMainId').val($('#table_introSingle tbody tr:eq('+i+')').find('.introCode').val());
    			var toll=Number($('#table_introSingle tbody tr:eq('+i+')').find('.rb_introTTD').val())
    			if(toll==0){
    				$.zxsaas_plus.showalert('error','已勾选定金未填写金额！');
    				return false
    			}else{
    				tol+=toll;
    			}
    		}
    	}
		$('#retailDeposit').val(tol.toFixed(2))
    	$('#depositDetailList').val(JSON.stringify(introDepositIdData()))
    })
//挂单
    $('#hangSingle').click(function(){
    	var existPro=false;
    	$('.rb_proNameId').each(function(i,val){
    		if($(this).val()!=''){
    			existPro=true;
    		}
    	})
    	if($('#table_operatorBusiness_data').val()!='')existPro=true;
    	if(existPro){
    		$('#ifDraft').val(1);
        	$.request({
        		type:'post',
            	url:basePath+'/retail/billing/saveOrder',
            	data:{
        			"jsonData":JSON.stringify(billData())
        		},
            	dataType:'json',
            	success:function(data){
        			if(data.result==1){
        				$('#DraftId').val(data.data.draftId);
        				$.zxsaas_plus.showalert('success','挂单成功');
        			}else{
        				$.zxsaas_plus.showalert('error',data.desc);
        			}
        		},
        		error:function(){
        			alert('请求失败！')
        		}
        	})
    	}else{
    		$.zxsaas_plus.showalert('warning','没有商品');
    	}
    })
//调入挂单
    $("#transferSingle").click(function () {
        $("#myModal_transferSingle").modal('show');
        $.request({
        	type:'post',
        	url:basePath+'/retail/billing/searchDraftOrderList',
        	data:{
        		sectionIds:sectionId
	        },
        	dataType:'json',
        	success:function(data){
	        	if(data.result>0){
	        		var res=data.data.draftOrderList;
	        		var html;
	        		if(res.length!=0){
	        			$.each(res,function(i,val){
	        				if(val.cardNum==null){
	        					val.cardNum='';
	        				}
	        				if(val.customerName==null){
	        					val.customerName='';
	        				}
	        				if(val.customerTel==null){
	        					val.customerTel='';
	        				}
	        				if(val.remark==null){
	        					val.remark='';
	        				}
	    	        		html+='<tr><td><a class="transferSingle_choose" href="javascript:void(0)">选择</a><input class="transferSingle_id" value="'+val.id+'" type="hidden"/></td>'+
	                            '<td><a class="transferSingle_del" href="javascript:void(0)">删除</a></td>'+
	                            '<td class="transferSingle_date">'+val.billsDate+'</td>'+
	                            '<td class="transferSingle_cardNum">'+val.cardNum+'</td>'+
	                            '<td class="transferSingle_name">'+val.customerName+'</td>'+
	                            '<td class="transferSingle_tel">'+val.customerTel+'</td>'+
	                            '<td class="transferSingle_remark">'+val.remark+'</td></tr>';
	    	        	})
	        		}else{
	        			html='';
	        		}
		        	$('#table_transferSingle tbody').html(html);
	        	}
	        },
        	error:function(){
        		alert('请求错误')
        	}
        })
    });
    	//挂单选择
    var ddres;
    $(document).on('click','.transferSingle_choose',function(){
    	var billsid=$(this).closest('tr').find('.transferSingle_id').val();
    	$('#DraftId').val(billsid);
    	$.request({
        	type:'post',
        	url:basePath+'/retail/billing/loadDraftOrder',
        	data:{
    			billsId:billsid
	        },
        	dataType:'json',
        	success:function(data){
	        	if(data.result==1){
	        		var res=data.data.draftOrderDetailVo;
	        		//门店、营业员、日期、运营商
	            	$('#sectionId option[value='+res.sectionId+']').prop('selected',true);
	            	$.request({
	        	        type: 'Post',
	        	        url: basePath + '/aboutPeople/interfaceSelfCompanyEmployees',
	        	        data: {
	        	    		sectionId : res.sectionId
	        	    	},
	        	        dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
	        	        success: function (data) {
	        	    		// 营业员
	        	    		$("#employeeId option").remove();
	        	    		$(data.data.empList).each(function(index,item){
	        	    			$("#employeeId").append("<option value='" + item.id + "'>" + item.name + "</opion>");
	        	    		});
	        	    		$('#employeeId option[value='+res.salesmanId+']').prop('selected',true);
	        	        },
	        	        error: function () {
	        	            alert("营业员加载失败！");
	        	        }
	        	    });
	            	$("#rb_date").val(res.billsDate);
	            	if(res.operatorList.length){
	            		var obj={};
	            		$.each(res.operatorList,function(i,val){
	            			obj[i]={};
			    			obj[i].select1=val.operatorId;
			    			obj[i].select2=val.businessId;
			    			obj[i].input1=val.czAmount;
			    			obj[i].input2=val.ssAmount;
			    			obj[i].input3=val.yjAmount;
			    			obj[i].input4=val.imei;
			    			obj[i].input5=val.phoneNum;
			    			obj[i].input6=val.ywNo;
			    			obj[i].input7=val.remark;
	            		})
	            		$('#table_operatorBusiness_data').val(JSON.stringify(obj))
	            	}else{
	            		var html='<tr><td>1</td><td>'+
	    	        	'<span class="operatorBusinessAdd glyphicon glyphicon-plus"></span>'+
	    	        	'<span class="operatorBusinessDel glyphicon glyphicon-minus"></span></td>'+
	    	            '<td><select name="billshangId" class="billshangId"></select></td>'+
	    	            '<td><select name="billywId" class="billywId"></select></td>'+
	    	            '<td><input class="Tb_opr_rechargeAmount" type="text" value=""></td>'+
	    	            '<td><input class="Tb_opr_netAmount" type="text" value=""></td>'+
	    	            '<td><input class="Tb_opr_commissionAmount" type="text" value=""></td>'+
	    	            '<td><input class="Tb_opr_remark" type="text" value=""></td></tr>';
		        		$('#table_operatorBusiness tbody').html(html);
		        		$.request({//初始化
		        	    	type:'post',
		        	    	url:basePath+'/retail/billing/searchOperator',
		        	    	dataType:'json',
		        	    	success:function(data){
		        	    		var operator=data.data.operatorList;
		        	    		var operatorHtml;
		        	    		$.each(operator, function (i,val) {
		        	    			operatorHtml+='<option value="'+val.code+'">'+val.name+'</option>';
		        		        });
		        	    		$('.billshangId').html(operatorHtml);
		        			},
		        			error:function(){
		        				alert('运营商业务请求失败！')
		        			}
		        	    });
	            	}
	            	//会员
	            	$('#cardNum').val(res.cardNum);
	            	$('#cardTypeId').val(res.memberTypeId);//会员类型ID
	            	$('#customerName').val(res.customerName);
	            	$('#memberId').val(res.memberId);
	            	$('#customerTel').val(res.customerTel);
	            	$('#customerType').val(res.memberType);
	            	$('#CurrentBalance').val(res.memberAmount);
	            	$('#CurrentIntegration').val(res.memberScore);
	            	$('#dAmount').val(res.dAmount);
	            	$('#dScore').val(res.dScore);
	            	//主输入项
	            	$("#receivableTotal").val(res.totalYsAmount);
	            	$("#shouldReceive").val(res.serviceYsAmount);
	            	$("#retailDeposit").val(res.retailDeposit);
	            	$("#receivableIgnore").val(res.billsTozero);
	            	$('#uncollected').val(res.wsAmount);
//	            	$('#settle').val(res.ssAmount);
	            	$('#settle').val('');
	            	$("#remarks").val(res.remark);
	            	//商品
	            	var _html;
	            	$.each(res.draftGoodsList,function(i,val){
	            		if(val.goodsNum==null){
	            			val.goodsNum='';
	            		}
	            		if(val.amount==null){
	            			val.amount='';
	            		}
	            		if(val.discount==null){
	            			val.discount=''
	            		}
	            		if(val.discountPrice==null){
	            			val.discountPrice='';
	            		}
	            		if(val.operator==null){
	            			val.operator={};
	            			val.operator.operatorId='';
	            			val.operator.businessId='';
	            			val.operator.remark='';
	            			val.operator.operatorBusinessName='';
	            		}
	            		for(var key in val.operator){
	            			if(val.operator[key]==null){
	            				val.operator[key]='';
	            			}
	            		}
	            		if(val.imei==null){
	            			val.imei=''
	            		}
	            		if(val.install==null){
	            			val.install={};
	            			val.install.installmentId='';
	            			val.install.installmentPayment='';
	            			val.install.installmentBalance='';
	            			val.install.monthsPay='';
	            			val.install.remark='';
	            			val.install.installmentCount='';
	            		}
	            		for(var key in val.install){
	            			if(val.install[key]==null){
	            				val.install[key]='';
	            			}
	            		}
	            		for(var key in val){
	            			if(val[key]==null){
	            				val[key]='';
	            			}
	            		}
	            		_html+='<tbody class="rb_tbody"><tr><td rowspan="3">1</td>'+
		                    '<td rowspan="3"><span class="rb_add glyphicon glyphicon-plus"></span> <span class="rb_del glyphicon glyphicon-minus"></span></td>'+
		                    '<td rowspan="3"><input class="rb_gift" type="checkbox" disabled><input class="giftFlag" type="hidden" value="'+val.giftFlag+'"></td>'+
		                    '<td rowspan="3">'+
		                        '<input class="rb_proName" disabled type="text" value="'+val.name+'">'+
		                        '<input class="rb_proNameId" type="hidden" value="'+val.goodsId+'">'+
		                        '<input class="rb_proCode" type="hidden" value="'+val.code+'"> '+
		                        '<button class="rb_proNameBtn smBtn btn btn-default"><span class="glyphicon glyphicon-plus"></span></button>'+
		                        '<input class="rb_proSerialNumId" type="hidden" value="'+val.imei+'">'+
		                        '<input class="rb_ifManageImei" type="hidden" value="'+val.ifManageImei+'">'+
		                    '</td>'+
		                    '<td class="rb_proModel" rowspan="3">'+val.models+'</td>'+
		                    '<td class="rb_proColor" rowspan="3">'+val.color+'</td>'+
		                    '<td class="rb_proSerialNum" rowspan="3">'+val.imeiStr+'</td>'+
		                    '<td rowspan="3"><input class="rb_proNum" type="text" value="'+val.goodsNum+'"></td> '+
		                    '<td rowspan="3"><input class="rb_proPrice" type="text" value="'+val.amount+'"></td>'+
		                    '<td rowspan="3">'+
		                        '<input class="rb_voucher" disabled type="text" value="'+val.totalThridTicketAmount+'">'+
		                        '<input class="rb_voucherData" type="hidden">'+
		                        '<input class="thridTicketdata" type="hidden">'+
		                        ' <button class="voucherBtn smBtn btn btn-default"><span class="glyphicon glyphicon-plus"></span></button>'+
		                    '</td>'+
		                    '<td>标价</td>'+
		                    '<td><input class="rb_bPrice" type="text" disabled value="'+val.price+'"></td>'+
		                    '<td>'+
		                    	'<a class="stages">分期商</a>'+
		                    	'<input class="rb_stages_payments" type="hidden" value="'+val.install.installmentPayment+'">'+
		                    	'<input class="rb_stages_balance" disabled type="hidden" value="'+val.install.installmentBalance+'">'+
		                    	'<input class="rb_stages_monthly" disabled type="hidden" value="'+val.install.monthsPay+'">'+
		                    	
		                    	'<input class="rb_stages_contract" disabled type="hidden" value="'+val.install.htNo+'">'+
		                    	
		                    	'<input class="rb_stages_remarks" maxlength="100" type="hidden" value="'+val.install.remark+'">'+
		                    '</td>'+
		                    '<td><select name="" class="rb_stages_opt"></select></td>'+
		                    '<td>是否合约机</td>'+
		                    '<td><input class="rb_isContract" type="checkbox" value="'+val.cphoneFlag+'"></td>'+
		                '</tr>'+
		                '<tr>'+
		                    '<td>折扣率(Z)</td>'+
		                    '<td><input class="rb_discountRate" type="text" value="'+val.discount+'">%</td>'+
		                    '<td>分期数</td>'+
		                    '<td><input type="text" class="rb_StageNum" disabled="" value="'+val.install.installmentCount+'"></td>'+
		                    '<td>备注</td>'+
		                    '<td><input class="rb_remark" type="text" value="'+val.remark+'"></td>'+
		                '</tr>'+
		                '<tr>'+
		                    '<td>折后价(J)</td>'+
		                    '<td><input class="rb_discountPrice" type="text" value="'+val.discountPrice+'"></td>'+
		                    '<td>首付</td>'+
		                    '<td><input class="rb_downPayments" type="text" disabled="" value="'+val.install.installmentPayment+'"></td>'+
		                    '<td>仓库<input class="rb_storageId" type="hidden" value="'+val.storageId+'"></td>'+
		                    '<td class="rb_warehouse">'+val.storageName+'</td>'+
		                '</tr>'+
		                '</tbody>';
	            	})
	            	var thead='<thead><tr><td>序号</td><td>操作</td>'+
		                '<td>赠品(Z)</td><td>商品名称(F3)</td><td>型号</td>'+
		                '<td>颜色</td><td>串号(F2)</td><td>数量(S)</td>'+
		                '<td>金额(E)</td><td>第三方抵扣</td>'+
		                '<td colspan="2">价格售息</td>'+
		                '<td colspan="2">分期信息</td>'+
		                '<td colspan="2">其他信息</td></tr></thead>';
	            	var tfoot='<tbody class="table_bottom"><tr>'+
			                '<td colspan="8">合计</td><td id="rb_proPrice_total">0</td><td id="rb_voucher_total">0</td>'+
			                '<td colspan="2">折扣合计：<span id="rb_discountPrice_total">0</span></td>'+
			                '<td colspan="2">首付合计：<span id="rb_downPayments_total">123</span></td>'+
			                '<td colspan="2"></td></tr></tbody>';
	            	$('#rb_table').html(thead+_html+tfoot);
	            	orderBy();
	                totalCal();
	                //数量
	                $('.rb_proSerialNum').each(function(i,val){
	                	if($(this).text()!=''){
	                		$(this).closest('tbody').find('.rb_proNum').prop('disabled',true);
	                	}
	                })
	                //是否赠品
	                $('.rb_proNameId').each(function(i,val){
	                	var _this=$(this)
	                	if(_this.val()!=''){
	                		_this.closest('tbody').find('.rb_gift').prop('disabled',false)
	                	}
	                })
	                $('.giftFlag').each(function(i,val){
	                	if($(this).val()==1){
	                		$(this).prev('.rb_gift').prop('checked',true);
	                		$(this).closest('tbody').find('.rb_proPrice,.rb_discountRate,.rb_discountPrice').val('').prop('disabled',true);
	                		$(this).closest('tbody').find('.voucherBtn,.rb_stages_opt').prop('disabled',true);
	                	}
	                })
	                //是否合约机
	                $('.rb_isContract').each(function(i,val){
	                	if($(this).val()==1){
	                		$(this).prop('checked',true);
	                	}
	                })
	            	//商品分期商
	            	$.request({
			        	type:'post',
			        	url:basePath+'/retail/billing/searchInstallment',
			        	dataType:'json',
			        	success:function(data){
			        		var stagesJson=data.data.installmentList;
			        		var temp_html_stages;
			    			$.each(stagesJson, function (i) {
			                    temp_html_stages+='<option value="'+stagesJson[i].code+'">'+stagesJson[i].name+'</option>';
			                });
			                $('.rb_stages_opt').html(temp_html_stages);
			                $.each(res.draftGoodsList,function(i,val){
			                	if(val.install.installmentId!=''){
			                		$('.rb_stages_opt:eq('+i+') option[value='+val.install.installmentId+']').prop('selected',true);
			                		$('.rb_stages_opt:eq('+i+')').closest('tbody').find('.rb_StageNum').prop('disabled',false);
			                		$('.rb_stages_opt:eq('+i+')').closest('tbody').find('.rb_downPayments').prop('disabled',false);
			                	}
			            	})
			    		},
			    		error:function(){
			    			alert('分期商初始化失败！')
			    		}
			        })
			        //第三方抵扣
			        $.each(res.draftGoodsList,function(j,vall){
			        	if(vall.thridTicket.length){
			        		var voucher=new Array;
			        		var thridTicket=new Array();
			        		$.each(vall.thridTicket,function(i,val){
				        		for(var k in val){
				        			if(val[k]==null)val[k]='';
				        		}
				        		voucher[i]={};
				        		voucher[i].rb_voucher_units=val.contactUnitId;//往来单位id
					    		voucher[i].rb_voucher_name=val.couponId;//券ID
					    		voucher[i].rb_voucher_credit=val.amount;//抵现金额
					    		voucher[i].rb_voucher_num=val.couponCode;//券编号
					    		voucher[i].rb_voucher_remark=val.remark;//备注
					    		thridTicket[i]={};
				        		thridTicket[i].contactUnitId=val.contactUnitId;//往来单位id
				        		thridTicket[i].couponId=val.couponId;//券ID
				        		thridTicket[i].amount=val.amount;//抵现金额
				        		thridTicket[i].couponCode=val.couponCode;//券编号
				        		thridTicket[i].remark=val.remark;//备注
				        	})
				        	$('.rb_voucherData:eq('+j+')').val(JSON.stringify(voucher))
				        	$('.thridTicketdata:eq('+j+')').val(JSON.stringify(thridTicket))
			        	}
			        });
			        //服务
			        var serHtml;
			        $.each(res.addServiceList,function(i,val){
			        	for(var key in val){
			        		if(val[key]==null){
			        			val[key]='';
			        		}
			        	}
			        	serHtml+='<tr><td>1</td><td><span class="rb_serPur_add glyphicon glyphicon-plus"></span> <span class="rb_serPur_del glyphicon glyphicon-minus"></span></td>'+
			        		'<td><select name="" class="rb_serPur_name"></select><input class="rb_serPur_ID" type="hidden" value="'+val.serviceId+'"><input class="rb_serPur_EFmonth" type="hidden" value="'+val.serviceDue+'"/></td>'+
			        		'<td>'+val.effectDateString+'</td><td><select name="" class="rb_serPur_ToIndex"></select></td><td class="rb_serPur_serviceDue">'+val.invalidDateString+'</td>'+
			        		'<td class="rb_serPur_userNum">'+val.usedTimes+'</td><td class="rb_serPur_Code">'+val.goodsCode+'</td>'+
			        		'<td><input class="rb_serPur_ProName" disabled="" value="'+val.goodsName+'"> <input class="rb_serPur_ProNameId" type="hidden" value="'+val.goodsId+'">'+
			        		'<button class="rb_serPur_ProNameBtn smBtn btn btn-default" disabled><span class="glyphicon glyphicon-plus"></span></button></td>'+
			        		'<td class="rb_serPur_color">'+val.color+'</td><td class="rb_serPur_model">'+val.model+'</td>'+
			        		'<td><input class="rb_serPur_SerialNum" disabled type="text" value="'+val.imeiStr+'"><input class="rb_serPur_if" type="hidden" value="'+val.ifManageIMei+'">'+
			        		'<input class="rb_serPur_NumId" type="hidden" value="'+val.imei+'"></td><td class="rb_serPur_cardNum">'+val.cardNo+'</td>'+
			        		'<td class="rb_serPur_retailNum"></td><td class="rb_serPur_setPrice">'+val.presetPrice+'</td><td class="rb_serPur_vipPrice">'+val.memberPrice+'</td>'+
			        		'<td><input class="rb_serPur_Actual" type="text" value="'+val.actualAmount+'"></td><td><input class="rb_serPur_remark" maxlength="100" type="text" value="'+val.remark+'"></td>'+
			        		'<td class="rb_serPur_serviceNum"></td></tr>';
			        })
			        $('#table_serPur tbody').html(serHtml);
			        $.request({
			        	type:'post',
			        	url:basePath+'/retail/billing/searchAddService',
			        	dataType:'json',
			        	success:function(data){
			        		var serPur=data.data.addServiceList;
			        		var html;
			        		$.each(serPur,function(i,val){
			        			html+='<option value="'+val.id+'">'+val.name+'</option>'
			        		})
			        		$('.rb_serPur_name').html(html);
			        		$.each(res.addServiceList,function(i,val){
			        			$('.rb_serPur_name:eq('+i+') option[value='+val.serviceId+']').prop('selected',true);
			        		})
			    		},
			    		error:function(){
			    			alert('请求失败！')
			    		}
			        })
			        //引入定单
			        if(res.depositDetailList!=null&&res.depositDetailList.length!=0){
			        	var depositDetailList=new Array;
				        $.each(res.depositDetailList,function(i,val){
				        	depositDetailList[i]={};
				        	depositDetailList[i].depositId=val.depositId;
			        		depositDetailList[i].depositAmount=val.depositAmount;
		        		});
		        		$('#depositDetailList').val(JSON.stringify(depositDetailList));
			        }
			        $('#depositMainId').val(res.depositMainId);
			        if(!res.draftGoodsList.length){
	        	        var tbodyHtml='<tbody class="rb_tbody"><tr><td rowspan="3">1</td><td rowspan="3"><span class="rb_add glyphicon glyphicon-plus"></span> <span class="rb_del glyphicon glyphicon-minus"></span></td>' +
	        	                '<td rowspan="3"><input type="checkbox" class="rb_gift" disabled/><input class="giftFlag" type="hidden" value="0"/></td>';
	        	        tbodyHtml+='<td rowspan="3"><input class="rb_proName" disabled type="text"/><input class="rb_proNameId" type="hidden"/><input class="rb_proCode" type="hidden"/> <button class="rb_proNameBtn smBtn btn btn-default"><span class="glyphicon glyphicon-plus"></span></button><input class="rb_proSerialNumId" type="hidden"/><input class="rb_ifManageImei" type="hidden"/></td>';
	        	        tbodyHtml+='<td class="rb_proModel" rowspan="3"></td><td class="rb_proColor" rowspan="3"></td><td class="rb_proSerialNum" rowspan="3"></td><td rowspan="3"><input class="rb_proNum" type="text"/></td>' +
	        	                '<td rowspan="3"><input class="rb_proPrice" type="text"/></td><td rowspan="3"><input class="rb_voucher" disabled type="text"/> <input class="rb_voucherData" type="hidden"/><input class="thridTicketdata" type="hidden"/><button class="voucherBtn smBtn btn btn-default"><span class="glyphicon glyphicon-plus"></span></button></td>';
	        	        tbodyHtml+='<td>标价</td><td><input class="rb_bPrice" type="text" disabled/></td><td><a class="stages">分期商</a>'+
	        	        	'<input class="rb_stages_payments" type="hidden"/><input class="rb_stages_balance" disabled type="hidden"/><input class="rb_stages_monthly" disabled type="hidden"/>'+
	        	    		'<input class="rb_stages_remarks" maxlength="100" type="hidden"/></td><td><select name="" class="rb_stages_opt"></select></td><td>是否合约机</td>';
	        	        tbodyHtml+='<td><input class="rb_isContract" type="checkbox" value="0"/></td></tr><tr><td>折扣率(Z)</td><td><input class="rb_discountRate" type="text" value="100"/>%</td><td>分期数</td>' +
	        	                '<td><input type="text" class="rb_StageNum" disabled/></td><td>备注</td>';
	        	        tbodyHtml+='<td><input class="rb_remark" type="text"></td></tr><tr><td>折后价(J)</td><td><input class="rb_discountPrice" type="text"/></td><td>首付</td>' +
	        	                '<td><input class="rb_downPayments" type="text" disabled/></td><td>仓库<input class="rb_storageId" type="hidden" /></td><td class="rb_warehouse"></td></tr></tbody>';
	        	        $('.table_bottom').before(tbodyHtml);
	        	        //排序
	        	        orderBy();
	        	        //分期商
	        	        stagesRequest($('.rb_stages_opt'));
	        		}
	        	}else{
	        		$.zxsaas_plus.showalert('error',data.desc);
	        	}
	        },
        	error:function(){
        		alert('请求错误')
        	}
        })
    	$("#myModal_transferSingle").modal('hide');
    })
    	//挂单删除
    $(document).on('click','.transferSingle_del',function(){
    	var billsid=$(this).closest('tr').find('.transferSingle_id').val();
    	$(this).closest('tr').remove();
		$.request({
        	type:'post',
        	url:basePath+'/retail/billing/deleteDraftOrder',
        	data:{
				billsId:billsid
			},
        	dataType:'json',
        	success:function(data){
				$("#myModal_transferSingle").modal('hide');
				$.zxsaas_plus.showconfirmsure('提示','删除成功！',function(){
					window.location.href=basePath+'/retail/billing/retailBillingMain';
		    	})
    		},
    		error:function(){
    			alert('请求失败！')
    		}
        })
    })
//服务购买
    var myModal_serPur=$("#myModal_serPur");
    myModal_serPur.modal({backdrop:'static', show:false, keyboard: false});//增值服务空白ESC阻止
    addserviceRequest($('.rb_serPur_name'));
    function addserviceRequest(specialClass){
    	$.request({
        	type:'post',
        	url:basePath+'/retail/billing/searchAddService',
        	dataType:'json',
        	success:function(data){
        		var serPur=data.data.addServiceList;
        		var html;
        		$.each(serPur,function(i,val){
        			html+='<option value="'+val.id+'">'+val.name+'</option>'
        		})
        		specialClass.html(html)
    		},
    		error:function(){
    			alert('请求失败！')
    		}
        })
    }
    var _thisserPur;
    $(document).on('change','.rb_serPur_name',function(){//服务名下拉
    	_thisserPur=$(this);
    	if(_thisserPur.val()=='null'){
    		_thisserPur.closest('tr').find('.rb_serPur_ID').text('');//ID
			_thisserPur.closest('tr').find('.rb_serPur_if').val('');//是否串号管理
			_thisserPur.closest('tr').find('.rb_serPur_date').text('默认单据');//生效日期
			
			_thisserPur.closest('tr').find('.rb_serPur_EFmonth').val('');//有效月数
			_thisserPur.closest('tr').find('.rb_serPur_serviceDue').text('');//有效期
			_thisserPur.closest('tr').find('.rb_serPur_userNum').text('');//效期内使用次数
			_thisserPur.closest('tr').find('.rb_serPur_setPrice').text('');//预设售价
			_thisserPur.closest('tr').find('.rb_serPur_vipPrice').text('');//会员价
    	}else{
    		$.request({
        		type:'post',
            	url:basePath+'/retail/billing/loadAddService',
            	data:{
    	    		serviceId:_thisserPur.val(),
    	    		cardTypeId:$('#cardTypeId').val(),
    	    		billsDate:$('#rb_date').val()
        		},
            	dataType:'json',
            	success:function(data){
        			var addService=data.data.addService;
        			_thisserPur.closest('tr').find('.rb_serPur_ID').text(addService.id);//ID
        			_thisserPur.closest('tr').find('.rb_serPur_if').val(addService.ifIm);//是否串号管理
        			_thisserPur.closest('tr').find('.rb_serPur_date').text($("#rb_date").val());//生效日期
        			
        			_thisserPur.closest('tr').find('.rb_serPur_EFmonth').val(addService.serviceDue);//有效月数
        			_thisserPur.closest('tr').find('.rb_serPur_serviceDue').text(addService.invalidDateStr);//有效期
        			_thisserPur.closest('tr').find('.rb_serPur_userNum').text(addService.userNum);//效期内使用次数
        			_thisserPur.closest('tr').find('.rb_serPur_setPrice').text(addService.setPrice);//预设售价
        			_thisserPur.closest('tr').find('.rb_serPur_vipPrice').text(addService.feeScale);//会员价
        			
        			if(addService.ifIm==1){//关联
        				
        			}else{//不关联
        				
        			}
        		},
        		error:function(){
        			alert('服务购买数据请求失败！')
        		}
        	})
    	}
    })
    var rbTableIndexSum=0;//表格行
    function loadAddviceRow(specialClass){
    	rbTableIndexSum=$('#rb_table tbody:last-child').prev('tbody').find('tr:eq(0)').find('td:eq(0)').text();
    	var html;
    	for(var i=1,q=0;i<=rbTableIndexSum;i++){
    		q++;
    		html+='<option value="'+q+'">'+q+'</option>';
    	}
    	specialClass.html('<option></option>'+html);
    	//带入会员信息
    	var cardNum=$('#cardNum').val();//会员卡号
    	if(cardNum==''){
    		//会员卡号为空
    	}else{
    		$('.rb_serPur_cardNum').text(cardNum)
    	}
    }
    $("#serPur").click(function () {//打开新增增值服务
    	myModal_serPur.modal('show');
    	loadAddviceRow($('.rb_serPur_ToIndex'));
    });
    myModal_serPur.on('hidden.bs.modal',function(){
    	if(!isView){
    		var shouldSum=0;
        	$('.rb_serPur_Actual').each(function(i,val){
        		shouldSum+=Number($(this).val());
        	})
        	$('#shouldReceive').val(shouldSum.toFixed(2))
        	receivableTotal();
    	}
    })
    $(document).on('keyup','.rb_serPur_Actual',function(){
    	$(this).val(($(this).val().replace(/[^0-9.]/g,'')));//只允许数字小数点输入
    })
    $(document).on('focusout','.rb_serPur_Actual',function(){
    	$(this).val(Number($(this).val()));
        if(isNaN($(this).val())){
            $(this).val(0)
        }
    })
    $('#serPur_sure').click(function(){//保存增值服务信息
    	var trLen=$("#table_serPur tbody tr").length;
    	for(var i=0;i<trLen;i++){
    		if($('#table_serPur tbody').find('.rb_serPur_name').length==1){
    			if($("#table_serPur tbody tr:eq("+i+")").find('.rb_serPur_name').val()=='null'&&($("#table_serPur tbody tr:eq("+i+")").find('.rb_serPur_ProNameId').val()=='')){
    				$('#table_increment tbody').html('');
    			}else if($("#table_serPur tbody tr:eq("+i+")").find('.rb_serPur_name').val()!='null'&&($("#table_serPur tbody tr:eq("+i+")").find('.rb_serPur_ProNameId').val()!='')){
    				if($("#table_serPur tbody tr:eq("+i+")").find('.rb_serPur_if').val()==1){//关联串号
            			if($("#table_serPur tbody tr:eq("+i+")").find('.rb_serPur_SerialNum').val()==''){
            				$.zxsaas_plus.showalert('warning','第'+(Number(i)+1)+'行关联串号但无串号');
            				return false
            			}else{
            				if($("#table_serPur tbody tr:eq("+i+")").find('.rb_serPur_ProNameId').val()==''){
            					$.zxsaas_plus.showalert('warning','第'+(Number(i)+1)+'行商品必须填!');
            					return false
            				}
            			}
            		}else if($("#table_serPur tbody tr:eq("+i+")").find('.rb_serPur_if').val()==0){//不关联串号
            			if($("#table_serPur tbody tr:eq("+i+")").find('.rb_serPur_cardNum').text()==''){
            				$.zxsaas_plus.showalert('warning','第'+(Number(i)+1)+'行不关联串号但无会员卡号');
            				return false
            			}
            		}
    			}else{
    				$.zxsaas_plus.showalert('warning','服务名或商品名未填写');
    				return false;
    			}
    		}else if($('#table_serPur tbody').find('.rb_serPur_name').length!=1&&$("#table_serPur tbody tr:eq("+i+")").find('.rb_serPur_name').val()=='null'){
    			$.zxsaas_plus.showalert('warning','第'+(Number(i)+1)+'行服务为空');
    			return false
    		}else{
    			if($("#table_serPur tbody tr:eq("+i+")").find('.rb_serPur_if').val()==1){//关联串号
        			if($("#table_serPur tbody tr:eq("+i+")").find('.rb_serPur_SerialNum').val()==''){
        				$.zxsaas_plus.showalert('warning','第'+(Number(i)+1)+'行关联串号但无串号');
        				return false
        			}else{
        				if($("#table_serPur tbody tr:eq("+i+")").find('.rb_serPur_ProNameId').val()==''){
        					$.zxsaas_plus.showalert('warning','第'+(Number(i)+1)+'行商品必须填!');
        					return false
        				}
        			}
        		}else if($("#table_serPur tbody tr:eq("+i+")").find('.rb_serPur_if').val()==0){//不关联串号
        			if($("#table_serPur tbody tr:eq("+i+")").find('.rb_serPur_cardNum').text()==''){
        				$.zxsaas_plus.showalert('warning','第'+(Number(i)+1)+'行不关联串号但无会员卡号');
        				return false
        			}
        		}
    		}
    	}
    	var html;
    	for(var i=0;i<$('#table_serPur tbody tr').length;i++){
    		var name=$('#table_serPur tbody tr:eq('+i+')').find('.rb_serPur_name option:selected').text();//增值服务名称
    		var nameId=$('#table_serPur tbody tr:eq('+i+')').find('.rb_serPur_name').val();//增值服务名称ID
    		var toNum=$('#table_serPur tbody tr:eq('+i+')').find('.rb_serPur_SerialNum').val();//关联串号
    		var toNumId=$('#table_serPur tbody tr:eq('+i+')').find('.rb_serPur_NumId').val();//关联串号ID
    		var toCardNum=$('#table_serPur tbody tr:eq('+i+')').find('.rb_serPur_cardNum').text();//关联会员卡号
    		var Actual=Number($('#table_serPur tbody tr:eq('+i+')').find('.rb_serPur_Actual').val());//关联实际收款
    		var remark=$('#table_serPur tbody tr:eq('+i+')').find('.rb_serPur_remark').val();//关联备注
    		html+='<tr><td class="increment_index">1</td>'+
                '<td class="increment_serName">'+name+'</td><input class="increment_serNameId" value="'+nameId+'" type="hidden"/>'+
                '<td class="increment_toNum">'+toNum+'</td><input class="increment_toNumId" value="'+toNumId+'" type="hidden"/>'+
                '<td class="increment_toCardNum">'+toCardNum+'</td><input class="increment_toCardNumId" value="" type="hidden"/>'+
                '<td class="increment_Actual">'+Actual+'</td><input class="increment_ActualId" value="" type="hidden"/>'+
                '<td class="increment_remark">'+remark+'</td><input class="increment_remarkId" value="" type="hidden"/></tr>';
    	}
    	$('#table_increment tbody').html(html)
    	for(var i=0,q=0;i<=$('#table_increment tbody tr').length;i++){
    		q++;
    		$('#table_increment tbody tr:eq('+i+') td:eq(0)').text(q)
    	}
    })
    $(document).on('change','.rb_serPur_ToIndex',function(){//序标下拉切换
    	var _thisTrrrr=$(this).closest('tr');
    	var index=$(this).val()-1;//序号
    	var maintbody=$('#rb_table tbody:eq('+index+')');
    	if(index==-1){
    		_thisTrrrr.find('.rb_serPur_Code').text('')
    	}
    	_thisTrrrr.find('.rb_serPur_Code').text(maintbody.find('.rb_proCode').val());//商品编码
    	_thisTrrrr.find('.rb_serPur_ProName').val(maintbody.find('.rb_proName').val());//商品名称
    	_thisTrrrr.find('.rb_serPur_ProNameId').val(maintbody.find('.rb_proNameId').val());//商品id
    	_thisTrrrr.find('.rb_serPur_color').text(maintbody.find('.rb_proColor').text());//商品颜色
    	_thisTrrrr.find('.rb_serPur_model').text(maintbody.find('.rb_proModel').text());//商品型号
    	_thisTrrrr.find('.rb_serPur_SerialNum').val(maintbody.find('.rb_proSerialNum').text());//串号
    	_thisTrrrr.find('.rb_serPur_NumId').val(maintbody.find('.rb_proSerialNumId').val());//串号ID
    })
    //增值服务弹框取消
    $('#serPur_cancel').click(function(){
    	$.zxsaas_plus.showconfirm('提示','取消将清空服务，确定吗？',function(){
    		var html='<tr><td>1</td><td><span class="rb_serPur_add glyphicon glyphicon-plus"></span> <span class="rb_serPur_del glyphicon glyphicon-minus"></span></td><td>'+
            '<select name="" class="rb_serPur_name"></select><input class="rb_serPur_ID" type="hidden"><input class="rb_serPur_EFmonth" type="hidden"></td><td class="rb_serPur_date">默认单据</td> <td> <select name="" class="rb_serPur_ToIndex"></select>'+
            '</td><td class="rb_serPur_serviceDue"></td> <td class="rb_serPur_userNum"></td><td class="rb_serPur_Code"></td> <td><input class="rb_serPur_ProName" disabled=""> '+
            '<input class="rb_serPur_ProNameId" type="hidden"><button class="rb_serPur_ProNameBtn smBtn btn btn-default" disabled><span class="glyphicon glyphicon-plus"></span></button></td><td class="rb_serPur_color"></td>'+
            '<td class="rb_serPur_model"></td><td><input class="rb_serPur_SerialNum" disabled type="text"><input class="rb_serPur_if" type="hidden"><input class="rb_serPur_NumId" type="hidden"></td>'+
            '<td class="rb_serPur_cardNum"></td><td class="rb_serPur_retailNum"></td><td class="rb_serPur_setPrice"></td><td class="rb_serPur_vipPrice"></td>'+
            '<td><input class="rb_serPur_Actual" type="text"></td><td><input class="rb_serPur_remark" maxlength="100" type="text"></td><td class="rb_serPur_serviceNum"></td></tr>';
        	$('#table_serPur tbody').html(html);
        	addserviceRequest($('.rb_serPur_name'));
        	$('#table_increment tbody').html('');
        	$('#myModal_serPur').modal('hide');
    	},function(){})
    })
    	//新增行
    $(document).on('click','.rb_serPur_add',function(){
    	var _this=$(this);
    	var html;
    	html='<tr><td>1</td><td><span class="rb_serPur_add glyphicon glyphicon-plus"></span> <span class="rb_serPur_del glyphicon glyphicon-minus"></span>'+
            '</td><td><select name="" class="rb_serPur_name"></select><input class="rb_serPur_ID" type="hidden"/><input class="rb_serPur_EFmonth" type="hidden">'+
            '</td><td class="rb_serPur_date">默认单据</td><td><select name="" class="rb_serPur_ToIndex"></select></td>'+
            '<td class="rb_serPur_serviceDue"></td><td class="rb_serPur_userNum"></td><td class="rb_serPur_Code"></td>'+
            '<td><input class="rb_serPur_ProName" disabled/> <input class="rb_serPur_ProNameId" type="hidden"/><button class="rb_serPur_ProNameBtn smBtn btn btn-default" disabled><span class="glyphicon glyphicon-plus"></span></button>'+
            '</td><td class="rb_serPur_color"></td><td class="rb_serPur_model"></td>'+
            '<td><input class="rb_serPur_SerialNum" disabled type="text"/><input class="rb_serPur_if" type="hidden"/><input class="rb_serPur_NumId" type="hidden"/></td>'+
            '<td class="rb_serPur_cardNum"></td><td class="rb_serPur_retailNum"></td><td class="rb_serPur_setPrice"></td>'+
            '<td class="rb_serPur_vipPrice"></td><td><input class="rb_serPur_Actual" type="text" /></td><td><input class="rb_serPur_remark" maxlength="100" type="text"/></td><td class="rb_serPur_serviceNum"></td></tr>';
    	_this.closest('tr').after(html);
    	addserviceRequest(_this.closest('tr').next('tr').find('.rb_serPur_name'));
    	loadAddviceRow(_this.closest('tr').next('tr').find('.rb_serPur_ToIndex'))
    	orderByaddservice()
    })
    	//删除行
    $(document).on('click','.rb_serPur_del',function(){
    	if($('#table_serPur tbody tr').length==1){
    		return false
    	}else{
    		$(this).closest('tr').remove()
    		orderByaddservice()
    	}
    })
    function orderByaddservice(){
    	var q=0;
    	$('#table_serPur tbody tr').each(function(){
    		q++;
    		$(this).find('td:eq(0)').text(q)
    	})
    }

    //运营商业务
    $('#operator').click(function(){
    	$('#myModal_operatorBusiness').modal('show');
    	var tbObjData=$('#table_operatorBusiness_data');
    	if(tbObjData.val()!=''){//非初始化
    		var dataObj=JSON.parse(tbObjData.val());
    		var html='';
    		$.each(dataObj,function(i,val){
    			for(var i in val){
    				if(val[i]==null){
    					val[i]=''
    				}
    			}
    			html+='<tr><td>1</td><td>'+
	            	'<span class="operatorBusinessAdd glyphicon glyphicon-plus"></span>'+
	            	'<span class="operatorBusinessDel glyphicon glyphicon-minus"></span></td>'+
	                '<td><select name="billshangId" class="billshangId"></select></td>'+
	                '<td><select name="billywId" class="billywId"></select></td>'+
	                '<td><input class="Tb_opr_rechargeAmount" type="text" value="'+val.input1+'"></td>'+
	                '<td><input class="Tb_opr_netAmount" type="text" value="'+val.input2+'"></td>'+
	                '<td><input class="Tb_opr_commissionAmount" type="text" value="'+val.input3+'"></td>'+
	                '<td><input class="Tb_opr_imei" type="text" value="'+val.input4+'"/></td>'+
	                '<td><input class="Tb_opr_tel" type="text" value="'+val.input5+'"/></td>'+
	                '<td><input class="Tb_opr_servNum" type="text" value="'+val.input6+'"/></td>'+
	                '<td><input class="Tb_opr_remark" type="text" value="'+val.input7+'"></td></tr>';
    		})
    		$('#table_operatorBusiness tbody').html(html);
    		$.request({//初始化
    	    	type:'post',
    	    	url:basePath+'/retail/billing/searchOperator',
    	    	dataType:'json',
    	    	success:function(data){
    	    		var operator=data.data.operatorList;
    	    		var operatorHtml;
    	    		$.each(operator, function (i,val) {
    	    			operatorHtml+='<option value="'+val.code+'">'+val.name+'</option>';
    		        });
    	    		$('.billshangId').html(operatorHtml);
	    			$.each(dataObj,function(i,val){
	        			$('.billshangId:eq('+i+') option[value='+val.select1+']').prop('selected',true);
	        			$.request({
	        	    		type:'post',
	        	    		url:basePath+'/retail/billing/searchCarierSearch',
	        	    		data:{
	        	    			operatorCode:val.select1
	        		    	},
	        	    		dataType:'json',
	        	    		success:function(data){
	        		    		var operator=data.data.operatorList;
	        	        		var operatorHtml;
	        	        		$.each(operator, function (j,val) {
	        	        			operatorHtml+='<option value="'+val.id+'">'+val.name+'</option>';
	        	    	        });
	        	        		$('.billshangId:eq('+i+')').closest('tr').find('.billywId').html(operatorHtml);
	        	        		$('.billshangId:eq('+i+')').closest('tr').find('.billywId option[value='+val.select2+']').prop('selected',true);
	        		    	},
	        		    	error:function(){
	        		    		alert('请求失败')
	        		    	}
	        	    	})
	        		})
    			},
    			error:function(){
    				alert('运营商业务请求失败！')
    			}
    	    });
    		oprTotalCal()
    	}else{//初始化操作
    		var html='<tr><td>1</td><td>'+
	        	'<span class="operatorBusinessAdd glyphicon glyphicon-plus"></span>'+
	        	'<span class="operatorBusinessDel glyphicon glyphicon-minus"></span></td>'+
	            '<td><select name="billshangId" class="billshangId"></select></td>'+
	            '<td><select name="billywId" class="billywId"></select></td>'+
	            '<td><input class="Tb_opr_rechargeAmount" type="text" value=""></td>'+
	            '<td><input class="Tb_opr_netAmount" type="text" value=""></td>'+
	            '<td><input class="Tb_opr_commissionAmount" type="text" value=""></td>'+
	            
	            '<td><input class="Tb_opr_imei" type="text"/></td>'+
                '<td><input class="Tb_opr_tel" type="text"/></td>'+
                '<td><input class="Tb_opr_servNum" type="text"/></td>'+
	            
	            '<td><input class="Tb_opr_remark" type="text" value=""></td></tr>';
    		$('#table_operatorBusiness tbody').html(html);
    		$.request({//初始化
    	    	type:'post',
    	    	url:basePath+'/retail/billing/searchOperator',
    	    	dataType:'json',
    	    	success:function(data){
    	    		var operator=data.data.operatorList;
    	    		var operatorHtml;
    	    		$.each(operator, function (i,val) {
    	    			operatorHtml+='<option value="'+val.code+'">'+val.name+'</option>';
    		        });
    	    		$('.billshangId').html(operatorHtml);
    			},
    			error:function(){
    				alert('运营商业务请求失败！')
    			}
    	    });
    		oprTotalCal()
    	}
    	if(isView){
    		$('#table_operatorBusiness input,#table_operatorBusiness select').prop('disabled',true);
    		$('.operatorBusinessAdd').remove()
    		$('.operatorBusinessDel').remove()
    	}
    	$('#operatorBusiness_sure').click(function(){
    		var canHide=true;
    		$('#table_operatorBusiness tbody tr').each(function(i,val){
    			var _this=$(this);
    			if(_this.find('.billshangId').val()==null||_this.find('.billshangId').val()=='null'){
    				_this.remove();
    				oprOrderBy();
    			}else if(_this.find('.billywId').val()=='null'){
    				var index=_this.find('td:eq(0)').text()
    				$.zxsaas_plus.showalert('warning','第'+index+'行未选择业务名称!');
    				canHide=false;
    				return false;
    			}else{
    				if(Number(_this.find('.Tb_opr_rechargeAmount').val())==0&&Number(_this.find('.Tb_opr_netAmount').val())==0&&Number(_this.find('.Tb_opr_commissionAmount').val())==0){
    					var index=_this.find('td:eq(0)').text()
    					$.zxsaas_plus.showalert('warning','第'+index+'行运营商信息未填写完整!');
    					canHide=false
    					return false;
    				}else{
    					canHide=true
    				}
    			}
    		})
    		if(canHide){
    			if($('#table_operatorBusiness tbody tr').length!=0){
        			var obj={};
        			$('#table_operatorBusiness tbody tr').each(function(i,val){
            			obj[i]={};
            			obj[i].select1=$(this).find('.billshangId').val();
            			obj[i].select2=$(this).find('.billywId').val();
            			obj[i].input1=Number($(this).find('.Tb_opr_rechargeAmount').val());
            			obj[i].input2=Number($(this).find('.Tb_opr_netAmount').val());
            			obj[i].input3=Number($(this).find('.Tb_opr_commissionAmount').val());
            			obj[i].input4=$(this).find('.Tb_opr_imei').val();
            			obj[i].input5=$(this).find('.Tb_opr_tel').val();
            			obj[i].input6=$(this).find('.Tb_opr_servNum').val();
            			obj[i].input7=$(this).find('.Tb_opr_remark').val();
            		})
            		tbObjData.val(JSON.stringify(obj));
            		$('#tempOprAmount').val(Number($('#Tb_opr_rechargeAmountSum').text())+Number($('#Tb_opr_netAmountSum').text())+Number($('#Tb_opr_commissionAmountSum').text()));
        			$('#tempOprRealAmount').val(Number($('#Tb_opr_netAmountSum').text()));
        			receivableTotal();
    			}else{
    				tbObjData.val('');
    				$('#tempOprAmount').val(0);
        			$('#tempOprRealAmount').val(0)
        			receivableTotal()
    			}
        		$('#myModal_operatorBusiness').modal('hide');
    		}
        })
        $('#myModal_operatorBusiness').on('hidden.bs.modal',function(){
        	$('#operatorBusiness_sure').off()
        })
    })
    $(document).on('keyup','.Tb_opr_rechargeAmount,.Tb_opr_netAmount,.Tb_opr_commissionAmount',function(){
    	$(this).val(($(this).val().replace(/[^0-9.]/g,'')));
    	oprTotalCal()
    })
    $(document).on('focusout','.Tb_opr_rechargeAmount,.Tb_opr_netAmount,.Tb_opr_commissionAmount',function(){
    	$(this).val(Number(Math.round($(this).val()*100)/100));
    	if(isNaN($(this).val())){
    		$(this).val(0)
    	}
    	oprTotalCal()
    })
    $(document).on('change','.billshangId',function(){
    	var _this=$(this);
    	$.request({
    		type:'post',
    		url:basePath+'/retail/billing/searchCarierSearch',
    		data:{
    			operatorCode:_this.val()
	    	},
    		dataType:'json',
    		success:function(data){
	    		var operator=data.data.operatorList;
        		var operatorHtml;
        		$.each(operator, function (i,val) {
        			operatorHtml+='<option value="'+val.id+'">'+val.name+'</option>';
    	        });
        		_this.closest('tr').find('.billywId').html(operatorHtml);
	    	},
	    	error:function(){
	    		alert('请求失败')
	    	}
    	})
    })
    $(document).on('click','.operatorBusinessAdd',function(e){
    	var _this=$(this);
    	var html='<tr><td>1</td><td>'+
	    	'<span class="operatorBusinessAdd glyphicon glyphicon-plus"></span>'+
	    	'<span class="operatorBusinessDel glyphicon glyphicon-minus"></span></td>'+
	        '<td><select name="billshangId" class="billshangId"></select></td>'+
	        '<td><select name="billywId" class="billywId"></select></td>'+
	        '<td><input class="Tb_opr_rechargeAmount" type="text" value=""></td>'+
	        '<td><input class="Tb_opr_netAmount" type="text" value=""></td>'+
	        '<td><input class="Tb_opr_commissionAmount" type="text" value=""></td>'+
	        '<td><input class="Tb_opr_imei" type="text"/></td>'+
            '<td><input class="Tb_opr_tel" type="text"/></td>'+
            '<td><input class="Tb_opr_servNum" type="text"/></td>'+
	        '<td><input class="Tb_opr_remark" type="text" value=""></td></tr>';
    	_this.closest('tr').after(html);
    	$.request({//初始化
	    	type:'post',
	    	url:basePath+'/retail/billing/searchOperator',
	    	dataType:'json',
	    	success:function(data){
	    		var operator=data.data.operatorList;
	    		var operatorHtml;
	    		$.each(operator, function (i,val) {
	    			operatorHtml+='<option value="'+val.code+'">'+val.name+'</option>';
		        });
	    		_this.closest('tr').next('tr').find('.billshangId').html(operatorHtml);
			},
			error:function(){
				alert('运营商业务请求失败！')
			}
	    });
    	oprOrderBy();
    })
    $(document).on('click','.operatorBusinessDel',function(){
    	var _this=$(this);
    	if($('#table_operatorBusiness tbody tr').length==1){
    		return false
    	}else{
    		_this.closest('tr').remove()
    		oprOrderBy()
    		oprTotalCal()
    	}
    })
    function oprOrderBy(){
    	var $obj=$('#table_operatorBusiness tbody tr');
    	var index=0;
    	$obj.each(function(i,val){
    		index++;
    		$(this).find('td:eq(0)').text(index)
    	})
    }
    function oprTotalCal(){
    	var sum1=0,sum2=0,sum3=0;
    	$('.Tb_opr_rechargeAmount').each(function(i,val){
    		sum1+=Number($(this).val());
    	})
    	$('.Tb_opr_netAmount').each(function(i,val){
    		sum2+=Number($(this).val());
    	})
    	$('.Tb_opr_commissionAmount').each(function(i,val){
    		sum3+=Number($(this).val());
    	})
    	$('#Tb_opr_rechargeAmountSum').text(Math.round((sum1)*100)/100);
    	$('#Tb_opr_netAmountSum').text(Math.round((sum2)*100)/100);
    	$('#Tb_opr_commissionAmountSum').text(Math.round((sum3)*100)/100);
    }
    //复制**************************************************************************************************************************************
    $('#copy').click(function(){
    	$.request({
            type:'Post',
            url:basePath+'/retail/billing/loadBillingOrder',
            dataType:"json",
            data:{
	    		retailMainId:$('#billNumId').val()
    		},
            success:function(data){
            	if(data.result==1){
            		isView=false;
	        		var res=data.data.orderDetailVo;
	        		//门店、营业员、日期、运营商
	            	$('#sectionId option[value='+res.sectionId+']').prop('selected',true);
	            	$.request({
	        	        type: 'Post',
	        	        url: basePath + '/aboutPeople/interfaceSelfCompanyEmployees',
	        	        data: {
	        	    		sectionId : res.sectionId
	        	    	},
	        	        dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
	        	        success: function (data) {
	        	    		// 营业员
	        	    		$("#employeeId option").remove();
	        	    		$(data.data.empList).each(function(index,item){
	        	    			$("#employeeId").append("<option value='" + item.id + "'>" + item.name + "</opion>");
	        	    		});
	        	    		$('#employeeId option[value='+res.salesmanId+']').prop('selected',true);
	        	        },
	        	        error: function () {
	        	            alert("营业员加载失败！");
	        	        }
	        	    });
	            	$("#rb_date").val(res.billsDate);
	            	if(res.operatorList.length){
	            		var obj={};
	            		$.each(res.operatorList,function(i,val){
	            			obj[i]={};
			    			obj[i].select1=val.operatorId;
			    			obj[i].select2=val.businessId;
			    			obj[i].input1=val.czAmount;
			    			obj[i].input2=val.ssAmount;
			    			obj[i].input3=val.yjAmount;
			    			obj[i].input4=val.imei;
			    			obj[i].input5=val.phoneNum;
			    			obj[i].input6=val.ywNo;
			    			obj[i].input7=val.remark;
	            		})
	            		$('#table_operatorBusiness_data').val(JSON.stringify(obj))
	            	}else{
	            		$('#table_operatorBusiness_data').val('')
	            		var html='<tr><td>1</td><td>'+
	    	        	'<span class="operatorBusinessAdd glyphicon glyphicon-plus"></span>'+
	    	        	'<span class="operatorBusinessDel glyphicon glyphicon-minus"></span></td>'+
	    	            '<td><select name="billshangId" class="billshangId"></select></td>'+
	    	            '<td><select name="billywId" class="billywId"></select></td>'+
	    	            '<td><input class="Tb_opr_rechargeAmount" type="text" value=""></td>'+
	    	            '<td><input class="Tb_opr_netAmount" type="text" value=""></td>'+
	    	            '<td><input class="Tb_opr_commissionAmount" type="text" value=""></td>'+
	    	            '<td><input class="Tb_opr_remark" type="text" value=""></td></tr>';
		        		$('#table_operatorBusiness tbody').html(html);
		        		$.request({//初始化
		        	    	type:'post',
		        	    	url:basePath+'/retail/billing/searchOperator',
		        	    	dataType:'json',
		        	    	success:function(data){
		        	    		var operator=data.data.operatorList;
		        	    		var operatorHtml;
		        	    		$.each(operator, function (i,val) {
		        	    			operatorHtml+='<option value="'+val.code+'">'+val.name+'</option>';
		        		        });
		        	    		$('.billshangId').html(operatorHtml);
		        			},
		        			error:function(){
		        				alert('运营商业务请求失败！')
		        			}
		        	    });
	            	}
	            	//会员
	            	$('#cardNum').val(res.cardNum);
	            	$('#cardTypeId').val(res.memberTypeId);//会员类型ID
	            	$('#customerName').val(res.customerName);
	            	$('#memberId').val(res.memberId);
	            	$('#customerTel').val(res.customerTel);
	            	$('#customerType').val(res.memberType);
	            	$('#CurrentBalance').val(res.memberAmount);
	            	$('#CurrentIntegration').val(res.memberScore);
	            	$('#dAmount').val(res.dAmount);
	            	$('#dScore').val(res.dScore);
	            	//主输入项
	            	$("#receivableTotal").val(res.totalYsAmount);
	            	$("#shouldReceive").val(res.serviceYsAmount);
	            	$("#retailDeposit").val(res.retailDeposit);
	            	$("#receivableIgnore").val(res.billsTozero);
	            	$('#uncollected').val(res.wsAmount);
//	            	$('#settle').val(res.ssAmount);
	            	$('#settle').val('');
	            	$("#remarks").val(res.remark);
	            	//商品
	            	var _html;
	            	$.each(res.goodsList,function(i,val){
	            		if(val.goodsNum==null){
	            			val.goodsNum='';
	            		}
	            		if(val.amount==null){
	            			val.amount='';
	            		}
	            		if(val.discount==null){
	            			val.discount=''
	            		}
	            		if(val.discountPrice==null){
	            			val.discountPrice='';
	            		}
	            		if(val.operator==null){
	            			val.operator={};
	            			val.operator.operatorId='';
	            			val.operator.businessId='';
	            			val.operator.remark='';
	            			val.operator.operatorBusinessName='';
	            		}
	            		for(var key in val.operator){
	            			if(val.operator[key]==null){
	            				val.operator[key]='';
	            			}
	            		}
	            		if(val.imei==null){
	            			val.imei=''
	            		}
	            		if(val.install==null){
	            			val.install={};
	            			val.install.installmentId='';
	            			val.install.installmentPayment='';
	            			val.install.installmentBalance='';
	            			val.install.monthsPay='';
	            			val.install.remark='';
	            			val.install.installmentCount='';
	            		}
	            		for(var key in val.install){
	            			if(val.install[key]==null){
	            				val.install[key]='';
	            			}
	            		}
	            		for(var key in val){
	            			if(val[key]==null){
	            				val[key]='';
	            			}
	            		}
	            		_html+='<tbody class="rb_tbody"><tr><td rowspan="3">1</td>'+
		                    '<td rowspan="3"><span class="rb_add glyphicon glyphicon-plus"></span> <span class="rb_del glyphicon glyphicon-minus"></span></td>'+
		                    '<td rowspan="3"><input class="rb_gift" type="checkbox" disabled><input class="giftFlag" type="hidden" value="'+val.giftFlag+'"></td>'+
		                    '<td rowspan="3">'+
		                        '<input class="rb_proName" disabled type="text" value="'+val.name+'">'+
		                        '<input class="rb_proNameId" type="hidden" value="'+val.goodsId+'">'+
		                        '<input class="rb_proCode" type="hidden" value="'+val.code+'"> '+
		                        '<button class="rb_proNameBtn smBtn btn btn-default"><span class="glyphicon glyphicon-plus"></span></button>'+
		                        '<input class="rb_proSerialNumId" type="hidden" value="'+val.imei+'">'+
		                        '<input class="rb_ifManageImei" type="hidden" value="'+val.ifManageImei+'">'+
		                    '</td>'+
		                    '<td class="rb_proModel" rowspan="3">'+val.models+'</td>'+
		                    '<td class="rb_proColor" rowspan="3">'+val.color+'</td>'+
		                    '<td class="rb_proSerialNum" rowspan="3">'+val.imeiStr+'</td>'+
		                    '<td rowspan="3"><input class="rb_proNum" type="text" value="'+val.goodsNum+'"></td> '+
		                    '<td rowspan="3"><input class="rb_proPrice" type="text" value="'+val.amount+'"></td>'+
		                    '<td rowspan="3">'+
		                        '<input class="rb_voucher" disabled type="text" value="'+val.totalThridTicketAmount+'">'+
		                        '<input class="rb_voucherData" type="hidden">'+
		                        '<input class="thridTicketdata" type="hidden">'+
		                        ' <button class="voucherBtn smBtn btn btn-default"><span class="glyphicon glyphicon-plus"></span></button>'+
		                    '</td>'+
		                    '<td>标价</td>'+
		                    '<td><input class="rb_bPrice" type="text" disabled value="'+val.price+'"></td>'+
		                    '<td>'+
		                    	'<a class="stages">分期商</a>'+
		                    	'<input class="rb_stages_payments" type="hidden" value="'+val.install.installmentPayment+'">'+
		                    	'<input class="rb_stages_balance" disabled type="hidden" value="'+val.install.installmentBalance+'">'+
		                    	'<input class="rb_stages_monthly" disabled type="hidden" value="'+val.install.monthsPay+'">'+
		                    	
		                    	'<input class="rb_stages_contract" disabled type="hidden" value="'+val.install.htNo+'">'+
		                    	
		                    	'<input class="rb_stages_remarks" maxlength="100" type="hidden" value="'+val.install.remark+'">'+
		                    '</td>'+
		                    '<td><select name="" class="rb_stages_opt"></select></td>'+
		                    '<td>是否合约机</td>'+
		                    '<td><input class="rb_isContract" type="checkbox" value="'+val.cphoneFlag+'"></td>'+
		                '</tr>'+
		                '<tr>'+
		                    '<td>折扣率(Z)</td>'+
		                    '<td><input class="rb_discountRate" type="text" value="'+val.discount+'">%</td>'+
		                    '<td>分期数</td>'+
		                    '<td><input type="text" class="rb_StageNum" disabled="" value="'+val.install.installmentCount+'"></td>'+
		                    '<td>备注</td>'+
		                    '<td><input class="rb_remark" type="text" value="'+val.remark+'"></td>'+
		                '</tr>'+
		                '<tr>'+
		                    '<td>折后价(J)</td>'+
		                    '<td><input class="rb_discountPrice" type="text" value="'+val.discountPrice+'"></td>'+
		                    '<td>首付</td>'+
		                    '<td><input class="rb_downPayments" type="text" disabled="" value="'+val.install.installmentPayment+'"></td>'+
		                    '<td>仓库<input class="rb_storageId" type="hidden" value="'+val.storageId+'"></td>'+
		                    '<td class="rb_warehouse">'+val.storageName+'</td>'+
		                '</tr>'+
		                '</tbody>';
	            	})
	            	var thead='<thead><tr><td>序号</td><td>操作</td>'+
		                '<td>赠品(Z)</td><td>商品名称(F3)</td><td>型号</td>'+
		                '<td>颜色</td><td>串号(F2)</td><td>数量(S)</td>'+
		                '<td>金额(E)</td><td>第三方抵扣</td>'+
		                '<td colspan="2">价格售息</td>'+
		                '<td colspan="2">分期信息</td>'+
		                '<td colspan="2">其他信息</td></tr></thead>';
	            	var tfoot='<tbody class="table_bottom"><tr>'+
			                '<td colspan="8">合计</td><td id="rb_proPrice_total">0</td><td id="rb_voucher_total">0</td>'+
			                '<td colspan="2">折扣合计：<span id="rb_discountPrice_total">0</span></td>'+
			                '<td colspan="2">首付合计：<span id="rb_downPayments_total">123</span></td>'+
			                '<td colspan="2"></td></tr></tbody>';
	            	$('#rb_table').html(thead+_html+tfoot);
	            	orderBy();
	                totalCal();
	                //数量
	                $('.rb_proSerialNum').each(function(i,val){
	                	if($(this).text()!=''){
	                		$(this).closest('tbody').find('.rb_proNum').prop('disabled',true);
	                	}
	                })
	                //是否赠品
	                $('.rb_proNameId').each(function(i,val){
	                	var _this=$(this)
	                	if(_this.val()!=''){
	                		_this.closest('tbody').find('.rb_gift').prop('disabled',false)
	                	}
	                })
	                $('.giftFlag').each(function(i,val){
	                	if($(this).val()==1){
	                		$(this).prev('.rb_gift').prop('checked',true);
	                		$(this).closest('tbody').find('.rb_proPrice,.rb_discountRate,.rb_discountPrice').val('').prop('disabled',true);
	                		$(this).closest('tbody').find('.voucherBtn,.rb_stages_opt').prop('disabled',true);
	                	}
	                })
	                //是否合约机
	                $('.rb_isContract').each(function(i,val){
	                	if($(this).val()==1){
	                		$(this).prop('checked',true);
	                	}
	                })
	            	//商品分期商
	            	$.request({
			        	type:'post',
			        	url:basePath+'/retail/billing/searchInstallment',
			        	dataType:'json',
			        	success:function(data){
			        		var stagesJson=data.data.installmentList;
			        		var temp_html_stages;
			    			$.each(stagesJson, function (i) {
			                    temp_html_stages+='<option value="'+stagesJson[i].code+'">'+stagesJson[i].name+'</option>';
			                });
			                $('.rb_stages_opt').html(temp_html_stages);
			                $.each(res.goodsList,function(i,val){
			                	if(val.install.installmentId!=''){
			                		$('.rb_stages_opt:eq('+i+') option[value='+val.install.installmentId+']').prop('selected',true);
			                		$('.rb_stages_opt:eq('+i+')').closest('tbody').find('.rb_StageNum').prop('disabled',false);
			                		$('.rb_stages_opt:eq('+i+')').closest('tbody').find('.rb_downPayments').prop('disabled',false);
			                	}
			            	})
			    		},
			    		error:function(){
			    			alert('分期商初始化失败！')
			    		}
			        })
			        //第三方抵扣
			        $.each(res.goodsList,function(j,vall){
			        	if(vall.thridTicket.length){
			        		var voucher=new Array;
			        		var thridTicket=new Array();
			        		$.each(vall.thridTicket,function(i,val){
				        		for(var k in val){
				        			if(val[k]==null)val[k]='';
				        		}
				        		voucher[i]={};
				        		voucher[i].rb_voucher_units=val.contactUnitId;//往来单位id
					    		voucher[i].rb_voucher_name=val.couponId;//券ID
					    		voucher[i].rb_voucher_credit=val.amount;//抵现金额
					    		voucher[i].rb_voucher_num=val.couponCode;//券编号
					    		voucher[i].rb_voucher_remark=val.remark;//备注
					    		thridTicket[i]={};
				        		thridTicket[i].contactUnitId=val.contactUnitId;//往来单位id
				        		thridTicket[i].couponId=val.couponId;//券ID
				        		thridTicket[i].amount=val.amount;//抵现金额
				        		thridTicket[i].couponCode=val.couponCode;//券编号
				        		thridTicket[i].remark=val.remark;//备注
				        	})
				        	$('.rb_voucherData:eq('+j+')').val(JSON.stringify(voucher))
				        	$('.thridTicketdata:eq('+j+')').val(JSON.stringify(thridTicket))
			        	}
			        });
			        //服务
			        var serHtml;
			        $.each(res.addServiceList,function(i,val){
			        	for(var key in val){
			        		if(val[key]==null){
			        			val[key]='';
			        		}
			        	}
			        	serHtml+='<tr><td>1</td><td><span class="rb_serPur_add glyphicon glyphicon-plus"></span> <span class="rb_serPur_del glyphicon glyphicon-minus"></span></td>'+
			        		'<td><select name="" class="rb_serPur_name"></select><input class="rb_serPur_ID" type="hidden" value="'+val.serviceId+'"><input class="rb_serPur_EFmonth" type="hidden" value="'+val.serviceDue+'"/></td>'+
			        		'<td>'+val.effectDateString+'</td><td><select name="" class="rb_serPur_ToIndex"></select></td><td class="rb_serPur_serviceDue">'+val.invalidDateString+'</td>'+
			        		'<td class="rb_serPur_userNum">'+val.usedTimes+'</td><td class="rb_serPur_Code">'+val.goodsCode+'</td>'+
			        		'<td><input class="rb_serPur_ProName" disabled="" value="'+val.goodsName+'"> <input class="rb_serPur_ProNameId" type="hidden" value="'+val.goodsId+'">'+
			        		'<button class="rb_serPur_ProNameBtn smBtn btn btn-default" disabled><span class="glyphicon glyphicon-plus"></span></button></td>'+
			        		'<td class="rb_serPur_color">'+val.color+'</td><td class="rb_serPur_model">'+val.model+'</td>'+
			        		'<td><input class="rb_serPur_SerialNum" disabled type="text" value="'+val.imeiStr+'"><input class="rb_serPur_if" type="hidden" value="'+val.ifManageIMei+'">'+
			        		'<input class="rb_serPur_NumId" type="hidden" value="'+val.imei+'"></td><td class="rb_serPur_cardNum">'+val.cardNo+'</td>'+
			        		'<td class="rb_serPur_retailNum"></td><td class="rb_serPur_setPrice">'+val.presetPrice+'</td><td class="rb_serPur_vipPrice">'+val.memberPrice+'</td>'+
			        		'<td><input class="rb_serPur_Actual" type="text" value="'+val.actualAmount+'"></td><td><input class="rb_serPur_remark" maxlength="100" type="text" value="'+val.remark+'"></td>'+
			        		'<td class="rb_serPur_serviceNum"></td></tr>';
			        })
			        $('#table_serPur tbody').html(serHtml);
			        $.request({
			        	async:false,
			        	type:'post',
			        	url:basePath+'/retail/billing/searchAddService',
			        	dataType:'json',
			        	success:function(data){
			        		var serPur=data.data.addServiceList;
			        		var html;
			        		$.each(serPur,function(i,val){
			        			html+='<option value="'+val.id+'">'+val.name+'</option>'
			        		})
			        		$('.rb_serPur_name').html(html);
			        		$.each(res.addServiceList,function(i,val){
			        			$('.rb_serPur_name:eq('+i+') option[value='+val.serviceId+']').prop('selected',true);
			        		})
			    		},
			    		error:function(){
			    			alert('请求失败！')
			    		}
			        })
			        //引入定单
			        if(res.depositDetailList!=null&&res.depositDetailList.length!=0){
			        	var depositDetailList=new Array;
				        $.each(res.depositDetailList,function(i,val){
				        	depositDetailList[i]={};
				        	depositDetailList[i].depositId=val.depositId;
			        		depositDetailList[i].depositAmount=val.depositAmount;
		        		});
		        		$('#depositDetailList').val(JSON.stringify(depositDetailList));
			        }
			        $('#depositMainId').val(res.depositMainId);
			        if(!res.goodsList.length){
	        	        var tbodyHtml='<tbody class="rb_tbody"><tr><td rowspan="3">1</td><td rowspan="3"><span class="rb_add glyphicon glyphicon-plus"></span> <span class="rb_del glyphicon glyphicon-minus"></span></td>' +
	        	                '<td rowspan="3"><input type="checkbox" class="rb_gift" disabled/><input class="giftFlag" type="hidden" value="0"/></td>';
	        	        tbodyHtml+='<td rowspan="3"><input class="rb_proName" disabled type="text"/><input class="rb_proNameId" type="hidden"/><input class="rb_proCode" type="hidden"/> <button class="rb_proNameBtn smBtn btn btn-default"><span class="glyphicon glyphicon-plus"></span></button><input class="rb_proSerialNumId" type="hidden"/><input class="rb_ifManageImei" type="hidden"/></td>';
	        	        tbodyHtml+='<td class="rb_proModel" rowspan="3"></td><td class="rb_proColor" rowspan="3"></td><td class="rb_proSerialNum" rowspan="3"></td><td rowspan="3"><input class="rb_proNum" type="text"/></td>' +
	        	                '<td rowspan="3"><input class="rb_proPrice" type="text"/></td><td rowspan="3"><input class="rb_voucher" disabled type="text"/> <input class="rb_voucherData" type="hidden"/><input class="thridTicketdata" type="hidden"/><button class="voucherBtn smBtn btn btn-default"><span class="glyphicon glyphicon-plus"></span></button></td>';
	        	        tbodyHtml+='<td>标价</td><td><input class="rb_bPrice" type="text" disabled/></td><td><a class="stages">分期商</a>'+
	        	        	'<input class="rb_stages_payments" type="hidden"/><input class="rb_stages_balance" disabled type="hidden"/><input class="rb_stages_monthly" disabled type="hidden"/>'+
	        	    		'<input class="rb_stages_remarks" maxlength="100" type="hidden"/></td><td><select name="" class="rb_stages_opt"></select></td><td>是否合约机</td>';
	        	        tbodyHtml+='<td><input class="rb_isContract" type="checkbox" value="0"/></td></tr><tr><td>折扣率(Z)</td><td><input class="rb_discountRate" type="text" value="100"/>%</td><td>分期数</td>' +
	        	                '<td><input type="text" class="rb_StageNum" disabled/></td><td>备注</td>';
	        	        tbodyHtml+='<td><input class="rb_remark" type="text"></td></tr><tr><td>折后价(J)</td><td><input class="rb_discountPrice" type="text"/></td><td>首付</td>' +
	        	                '<td><input class="rb_downPayments" type="text" disabled/></td><td>仓库<input class="rb_storageId" type="hidden" /></td><td class="rb_warehouse"></td></tr></tbody>';
	        	        $('.table_bottom').before(tbodyHtml);
	        	        //排序
	        	        orderBy();
	        	        //分期商
	        	        stagesRequest($('.rb_stages_opt'));
	        		}
			        $('#sectionId,#employeeId,#rb_date,#rb_superInput').prop('disabled',false);
			        $('#customerName,#customerTel,#settle_sure,#receivableIgnore,#remarks').prop('disabled',false);
			        $('.rb_serPur_add,.rb_serPur_del').show();
			        $('.rb_serPur_name,.rb_serPur_ToIndex,.rb_serPur_Actual,.rb_serPur_remark,#serPur_cancel').prop('disabled',false);
			        $('#myModal_introSingle input,#myModal_introSingle button,#myModal_introSingle,#operatorBusiness_sure').prop('disabled',false);
			        $('#myModal_proName input,#myModal_proName button,#voucher_cancel,#voucher_sure').prop('disabled',false);
			        $('#rb_stages_business,#rb_stages_num,#rb_stages_proPrice,#rb_stages_payments,#rb_stages_contract,#rb_stages_remarks,#stages_sure').prop('disabled',false);
			        $('#copy,#print,#rb_mistake').prop('disabled',true);
			        $('#hangSingle,#transferSingle').prop('disabled',false);
			        $('#billNum,#billNumId,#receivableIgnore,#uncollected').val('');
            	}else{
            		$.zxsaas_plus.showalert('error',data.desc);
            	}
            },
            error:function(){
                alert("error");
            }
        });
    })
//门店初始化
    var sectionId;
    loadSectionAndEmployee();
    bindChangeEvent();
    function loadSectionAndEmployee(){
        $.request({
            type: 'Post',
            url: basePath + '/department/interfaceDeptAndEmp',
            dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
            success: function (data) {
        		var curSectionId = data.data.curSectionId;
        		// 门店
    	    	$("#sectionId option").remove();
        		$(data.data.sectionList).each(function(index,item){
        			if(item.id == curSectionId){
        				$("#sectionId").append("<option value='" + item.id + "' selected>" + item.name + "</opion>");
        			}else{
        				$("#sectionId").append("<option value='" + item.id + "'>" + item.name + "</opion>");
        			}
        		});
        		sectionId=$('#sectionId').val();
        		// 营业员
        		$("#employeeId option").remove();
        		$(data.data.empList).each(function(index,item){
        			$("#employeeId").append("<option value='" + item.id + "'>" + item.name + "</opion>");
        		});
            },
            error: function () {
                alert("可使用部门和营业员加载失败！");
            }
        });
    }
    function bindChangeEvent(){
    	$("#sectionId").bind("change", function() {
    		refresh();
    		sectionId=$('#sectionId').val();
    	    $.request({
    	        type: 'Post',
    	        url: basePath + '/aboutPeople/interfaceSelfCompanyEmployees',
    	        data: {
    	    		sectionId : $("#sectionId").val()
    	    	},
    	        dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
    	        success: function (data) {
    	    		// 营业员
    	    		$("#employeeId option").remove();
    	    		$(data.data.empList).each(function(index,item){
    	    			$("#employeeId").append("<option value='" + item.id + "'>" + item.name + "</opion>");
    	    		});
    	        },
    	        error: function () {
    	            alert("营业员加载失败！");
    	        }
    	    });
    	});
    }
//时间插件
    (function(){
		$("#rb_date").timeControl()
	})();
//表格change事件
    $("#rb_table").change(function(){
    	receivableTotal();//应收合计变化
    })
//表格行的增
    $(document).on('click','.rb_add', function () {
        var _this=$(this);
        var tbodyHtml='<tbody class="rb_tbody"><tr><td rowspan="3">1</td><td rowspan="3"><span class="rb_add glyphicon glyphicon-plus"></span> <span class="rb_del glyphicon glyphicon-minus"></span></td>' +
                '<td rowspan="3"><input type="checkbox" class="rb_gift" disabled/><input class="giftFlag" type="hidden" value="0"/></td>';
        tbodyHtml+='<td rowspan="3"><input class="rb_proName" disabled type="text"/><input class="rb_proNameId" type="hidden"/><input class="rb_proCode" type="hidden"/> <button class="rb_proNameBtn smBtn btn btn-default"><span class="glyphicon glyphicon-plus"></span></button><input class="rb_proSerialNumId" type="hidden"/><input class="rb_ifManageImei" type="hidden"/></td>';
        tbodyHtml+='<td class="rb_proModel" rowspan="3"></td><td class="rb_proColor" rowspan="3"></td><td class="rb_proSerialNum" rowspan="3"></td><td rowspan="3"><input class="rb_proNum" type="text"/></td>' +
                '<td rowspan="3"><input class="rb_proPrice" type="text"/></td><td rowspan="3"><input class="rb_voucher" disabled type="text"/> <input class="rb_voucherData" type="hidden"/><input class="thridTicketdata" type="hidden"/><button class="voucherBtn smBtn btn btn-default"><span class="glyphicon glyphicon-plus"></span></button></td>';
        tbodyHtml+='<td>标价</td><td><input class="rb_bPrice" type="text" disabled/></td><td><a class="stages">分期商</a>'+
        	'<input class="rb_stages_payments" type="hidden"/><input class="rb_stages_balance" disabled type="hidden"/><input class="rb_stages_monthly" disabled type="hidden"/>'+
    		'<input class="rb_stages_contract" type="hidden"/><input class="rb_stages_remarks" maxlength="100" type="hidden"/></td><td><select name="" class="rb_stages_opt"></select></td><td>是否合约机</td>';
        tbodyHtml+='<td><input class="rb_isContract" type="checkbox" value="0"/></td></tr><tr><td>折扣率(Z)</td><td><input class="rb_discountRate" type="text" value="100"/>%</td><td>分期数</td>' +
                '<td><input type="text" class="rb_StageNum" disabled/></td><td>备注</td>';
        tbodyHtml+='<td><input class="rb_remark" type="text"></td></tr><tr><td>折后价(J)</td><td><input class="rb_discountPrice" type="text"/></td><td>首付</td>' +
                '<td><input class="rb_downPayments" type="text" disabled/></td><td>仓库<input class="rb_storageId" type="hidden" /></td><td class="rb_warehouse"></td></tr></tbody>';
        $(this).closest('tbody').after(tbodyHtml);
        //排序
        orderBy();
        //分期商
        stagesRequest(_this.closest('tbody').next('tbody').find('.rb_stages_opt'));
    });
//表格行的删
    $(document).on('click','.rb_del', function () {
        if($(this).closest('table').find('.rb_tbody').length==1){
            return false
        }else{
        	var proId=$(this).closest('tbody').find('.rb_proNameId').val();
        	$('.rb_serPur_ProNameId').each(function(i,val){
        		if($(this).val()==proId){
        			$(this).closest('tr').find('.rb_serPur_Code').text('');
        			$(this).closest('tr').find('.rb_serPur_ProName').val('')
        			$(this).closest('tr').find('.rb_serPur_color').text('')
        			$(this).closest('tr').find('.rb_serPur_model').text('')
        			$(this).closest('tr').find('.rb_serPur_setPrice').text('')
        			$(this).closest('tr').find('.rb_serPur_vipPrice').text('')
        			$(this).closest('tr').find('.rb_serPur_Actual').val('')
        			$(this).val('')
        		}
        	})
        	
        	$(this).closest('tbody').remove()
            orderBy();
            totalCal();
            receivableTotal()
        }
    });
    //序号格式化
    function orderBy(){
        var len=$('#rb_table').find('tbody').length-1;
        for(var i= 0,p=0;i<len;i++){
            p++;
            $('#rb_table tbody:eq('+i+') tr:eq(0) td:eq(0)').text(p)
        }
    }
//赠品
    var _this_rb_gift;
    $(document).on('click','.rb_gift', function () {
        _this_rb_gift=$(this);
        if($(this).prop('checked')==true){
            //禁用项
            _this_rb_gift.closest('tbody').find('.rb_proPrice').prop('disabled',true).val('');
            _this_rb_gift.closest('tbody').find('.rb_voucher').prop('disabled',true).val('');
            _this_rb_gift.closest('tbody').find('.rb_voucherData').val('');
            _this_rb_gift.closest('tbody').find('.thridTicketdata').val('');
            _this_rb_gift.closest('tbody').find('.voucherBtn').prop('disabled',true).val('');
            _this_rb_gift.closest('tbody').find('.rb_discountRate').prop('disabled',true).val('');
            _this_rb_gift.closest('tbody').find('.rb_discountPrice').prop('disabled',true).val('');
            _this_rb_gift.closest('tbody').find('.rb_stages_opt').prop('disabled',true).val('');
            _this_rb_gift.closest('tbody').find('.rb_StageNum').prop('disabled',true).val('');
            _this_rb_gift.closest('tbody').find('.rb_downPayments').prop('disabled',true).val('');
            _this_rb_gift.closest('tbody').find('.rb_stages_payments').val('');
            _this_rb_gift.closest('tbody').find('.rb_stages_balance').val('');
            _this_rb_gift.closest('tbody').find('.rb_stages_monthly').val('');
            _this_rb_gift.closest('tbody').find('.rb_stages_remarks').val('');
            _this_rb_gift.closest('tbody').find('.giftFlag').val(1)
            totalCal();
            receivableTotal()
        }else{
            //解锁项
            _this_rb_gift.closest('tbody').find('.rb_proPrice').prop('disabled',false);
            _this_rb_gift.closest('tbody').find('.voucherBtn').prop('disabled',false);
            _this_rb_gift.closest('tbody').find('.rb_discountRate').prop('disabled',false);
            _this_rb_gift.closest('tbody').find('.rb_discountPrice').prop('disabled',false);
            _this_rb_gift.closest('tbody').find('.rb_stages_opt').prop('disabled',false);
            _this_rb_gift.closest('tbody').find('.giftFlag').val(0)
        }
    });
//是否合约机
    $(document).on('click','.rb_isContract',function(){
    	if($(this).prop('checked')==true){
    		$(this).val(1)
    	}else{
    		$(this).val(0)
    	}
    })

//商品名称
    //商品信息
    $(document).on('mouseover','.rb_proName',function(){
    	$(this).attr('title',$(this).val())
    })
    $(document).on('mouseover','.rb_stages_opt',function(){
    	$(this).attr('title',$(this).find("option:selected").text())
    })
    var realProName;//商品名称
    var realProModel;//型号
    var realProColor;//颜色
    var realProPrice;//零售价
    var realProWarehouse;//仓库
    var realstorageId;//仓库ID
    var realProSerialNum;//串号
    var realProSerialNumId;//串号ID
    var realifManageImei;//是否串号管理
    var rb_proNameId;//商品ID
    var rb_proCode;//商品编码
    var selectedTreeClassId;//树节点ID
    var quickSearch=$('#quickSearch');//快速搜索框
    var myModal_proName=$('#myModal_proName');
    myModal_proName.modal({backdrop:'static', show:false, keyboard: false});//商品框
    var thisPro;
    $(document).on('click','.rb_proNameBtn', function () {
    	myModal_proName.modal('show');
    	proTbEmt();
    	$('#rb_proNameL tbody').html('');
    	$('#rb_proNameR tbody').html('');
    	selectedTreeClassId='';
        thisPro=$(this).closest('tbody');
        var oldProId=thisPro.find('.rb_proNameId').val();
        var temp_val=thisPro.find('.rb_proName').val();
        var setting = {
    		data: {
    			simpleData: {enable: true,idKey: "id",pIdKey: "parentId",rootPId: null}
    		},
            async: {
                enable: true,
                url: basePath + "/inventory/common/getGoodsClassTreeNodeVoList",
                otherParam:{},
                dataFilter:function(treeId, parentNode, responseData){
                	if(responseData.result==1){
                		var arr=responseData.data.goodsClassVoList;
                    	$.each(arr,function(i,val){
                    		if(val.id==-1){
                        		val.open=true;
                        	}
                    	})
                    	return arr
                	}else{
                		alert('请求失败！')
                	}
                }
            },
    		callback: {
            	onClick:function(event, treeId, treeNode){
    				// 通过选中节点id查询类型下所有商品
            		selectedTreeClassId = Number(treeNode.id);
    			    SearchRequest(selectedTreeClassId);
    			    proTbEmt();
            	}
    		},
    		view: {
    			showIcon: false
    		}
    	};
    	$.fn.zTree.init($("#ztree1"), setting);
    	$.fn.zTree.getZTreeObj("ztree1").expandAll(true);  
    	$('#dosearch').click(function(){
    		SearchRequest(selectedTreeClassId)
    		proTbEmt();
    	})
        myModal_proName.on('hidden.bs.modal',function () {
            $('#dosearch').off('click')
            $("#rb_proName_sure").off()
        });
        $("#rb_proName_sure").click(function(){
        	if(realProSerialNum!=''){//串号重复性判断
        		for(var i=0;i<$('.rb_proSerialNum').length;i++){
            		if($('.rb_proSerialNum:eq('+i+')').text()==realProSerialNum){
            			$.zxsaas_plus.showalert('warning','该商品已存在列表中');
            			return false
            		}
            	}
        	}
        	if(realifManageImei==1){//是否串号管理
        		if(realProSerialNum==''){
        			$.zxsaas_plus.showalert('warning','请选择串号');
        			return false;
        		}else{
        			thisPro.find('.rb_proNum').val(1).prop('disabled',true);
        		}
        	}else{
        		thisPro.find('.rb_proNum').val(1).prop('disabled',false);
        	}
        	thisPro.find('.rb_gift').prop('disabled',false);
        	if(thisPro.find('.rb_gift').prop('checked')==true){
        		thisPro.find('.rb_discountRate').val('');
        		thisPro.find('.rb_discountPrice').val(0);//折后价
            	thisPro.find('.rb_proPrice').val(0);//金额
        	}else{
        		thisPro.find('.rb_discountRate').val(100);
        		thisPro.find('.rb_discountPrice').val(realProPrice);//折后价
            	thisPro.find('.rb_proPrice').val(realProPrice);//金额
        	}
        	thisPro.find('.rb_voucher').closest('td').find('input').val('');
        	thisPro.find('.rb_stages_payments').closest('td').find('input').val('');
        	thisPro.find('.rb_stages_opt option:first').prop('selected',true);
        	thisPro.find('.rb_StageNum').val('').prop('disabled',true);
        	thisPro.find('.rb_downPayments').val('').prop('disabled',true);
        	thisPro.find('.rb_isContract').prop('checked',false);
        	thisPro.find('.shangId').closest('td').find('input').val('');
        	thisPro.find('.rb_operatorBusiness').text('');
        	thisPro.find('.rb_proName').val(realProName);
        	thisPro.find('.rb_proModel').text(realProModel);
        	thisPro.find('.rb_proColor').text(realProColor);
        	thisPro.find('.rb_proSerialNum').text(realProSerialNum);
        	thisPro.find('.rb_proSerialNumId').val(realProSerialNumId);
        	thisPro.find('.rb_bPrice').val(realProPrice);
        	thisPro.find('.rb_warehouse').text(realProWarehouse);
        	thisPro.find('.rb_proNameId').val(rb_proNameId);
        	thisPro.find('.rb_proCode').val(rb_proCode);
        	thisPro.find('.rb_ifManageImei').val(realifManageImei);
        	thisPro.find('.rb_storageId').val(realstorageId);
        	if(oldProId!=''){
        		$('.rb_serPur_ProNameId').each(function(i,val){
            		if($(this).val()==oldProId){
            			$(this).closest('tr').find('.rb_serPur_Code').text('');
            			$(this).closest('tr').find('.rb_serPur_ProName').val('')
            			$(this).closest('tr').find('.rb_serPur_color').text('')
            			$(this).closest('tr').find('.rb_serPur_model').text('')
            			$(this).closest('tr').find('.rb_serPur_setPrice').text('')
	        			$(this).closest('tr').find('.rb_serPur_vipPrice').text('')
	        			$(this).closest('tr').find('.rb_serPur_Actual').val('')
            			$(this).val('')
            		}
            	})
        	}
        	totalCal()
        	receivableTotal()
        	$("#rb_proName_sure").off()
        })
    });
    //商品搜索请求
    function SearchRequest(selectedTreeClassId){
    	$.request({
	        type: 'Post',
	        url: basePath + '/inventory/common/getStockGoodsVoList',
	        data: {
    			sectionId:sectionId,
				queryKey: $('#quickSearch').val(),//搜索字
				goodsCategoryIds:selectedTreeClassId//树ID
			},
	        dataType: "json", 
	        success: function (data) {
				var res=data.data.stockGoodsVoList;
				var html;
				if(data.result==1){
					if(res.length==0){
						html=''
					}else{
						for(var i=0;i<res.length;i++){
							for(var k in res[i]){
								if(res[i][k]==null)res[i][k]='';
							}
			    			html+='<tr><td class="rb_proCode">'+res[i].code+'</td><td>'+res[i].name+'<input class="proNameId" type="hidden" value='+res[i].goodsId+'><input class="proifManageImei" type="hidden" value='+res[i].ifManageImei+'></td>'+
			    			'<td>'+res[i].models+'</td><td>'+res[i].color+'</td><td>'+res[i].retailPrice+'</td>'+
			    			'<td>'+res[i].storageName+'<input class="storageId" type="hidden" value='+res[i].storageId+'></td>'+
			    			'<td>'+res[i].stockCount+'<input class="stockNumId" type="hidden" value='+res[i].stockNumId+'></td></tr>';
			    		}
					}
				}else{
					html=''
				}
				$("#rb_proNameL tbody").html(html);
				$('#rb_proNameR tbody').html('');
	        },
	        error: function () {
	            alert("查询失败！");
	        }
	    });
    }
    //商品表格置空
    function proTbEmt(){
    	realProName='';
    	realProModel='';
    	realProColor='';
    	realProSerialNum='';
    	realProSerialNumId='';
    	realProPrice='';
    	realProWarehouse='';
    	rb_proNameId='';
    	rb_proCode='';
    	realifManageImei='';
    	realstorageId='';
    }
    //商品弹出框表格点击事件
    $('#rb_proNameL').on('click','tbody tr',function(){
    	$(this).css('background','#ddd').siblings().css('background','#fff');
    	realProSerialNum='';
    	realProSerialNumId='';
    	realProName=$(this).find('td:eq(1)').text();//商品名称
    	realProModel=$(this).find('td:eq(2)').text();//型号
    	realProColor=$(this).find('td:eq(3)').text();//颜色
    	realProPrice=$(this).find('td:eq(4)').text();//零售价
    	realProWarehouse=$(this).find('td:eq(5)').text();//仓库
    	realstorageId=$(this).find('.storageId').val();//仓库ID
    	rb_proNameId=$(this).find('.proNameId').val();//商品id
    	rb_proCode=$(this).find('.rb_proCode').text();//商品编码
    	realifManageImei=$(this).find('.proifManageImei').val();//是否串号管理
    	
    	var nowstockNumId=$(this).find('.stockNumId').val();//点击商品库存量id
    	var nowstorageId=$(this).find('.storageId').val();//点击商品仓库id
    	var nowgoodsId=$(this).find('.proNameId').val();//点击商品id
    	$.request({
    		type:'post',
    		url:basePath+'/retail/billing/loadStockGoodsImeiVoList',
    		data:{
	    		stockNumId:nowstockNumId,
	    		storageId:nowstorageId,
	    		goodsId:nowgoodsId
    		},
    		dataType:'json',
    		success:function(data){
    			var res=data.data.imeiVoList;
    			var html;
    			if(res.length==0){
    				html=''
    			}else{
    				for(var i=0,p=0;i<res.length;i++){
    					if(res[i].imei==null){
    						res[i].imei=''
    					}
    					if(res[i].imeiId==null){
    						res[i].imeiId=''
    					}
        				p++;
        				html+='<tr><td>'+p+'</td><td class="RSerialNum">'+res[i].imei+'</td><input class="RSerialId" type="hidden" value="'+res[i].imeiId+'"/></tr>';
        			}
    			}
    			$("#rb_proNameR tbody").html(html)
    		},
    		error:function(){
    			alert('串号查询失败！')
    		}
    	})
    })
    //商品弹出框串号点击事件
    $('#rb_proNameR').on('click','tbody tr',function(){
    	$(this).css('background','#ddd').siblings().css('background','#fff');
    	realProSerialNum=$(this).find('.RSerialNum').text();
    	realProSerialNumId=$(this).find('.RSerialId').val();
    })
//数量
    $(document).on('keyup','.rb_proNum', function () {
        $(this).val($(this).val().replace(/\D/g,''));//只允许数字输入
        $(this).val(parseInt($(this).val()));
        if(isNaN($(this).val())){
            $(this).val(0)
        }
        //需要的值
        var rb_proNum=$(this).val();//数量
        var rb_discountPrice=Number($(this).closest('tbody').find('.rb_discountPrice').val());//折后价
        $(this).closest('tbody').find('.rb_proPrice').val(rb_proNum*rb_discountPrice);
        totalCal()
    });
//金额
    $(document).on('keyup','.rb_proPrice', function () {
        $(this).val(($(this).val().replace(/[^0-9.]/g,'')));//只允许数字小数点输入
        //需要的值
        var jine=$(this).val();//金额
        var shuliang=$(this).closest('tbody').find('.rb_proNum').val();//数量
        var lingshoujia=Number($(this).closest('tbody').find('.rb_bPrice').val());//零售价
        if(jine!=''&&shuliang!=''){
            $(this).closest('tbody').find('.rb_discountPrice').val((Math.round(jine/shuliang*10000)/10000).toFixed(2));//折后价反算
            if(lingshoujia!=''){
            	var zhekoulv=((Math.round(jine/shuliang*10000)/10000).toFixed(2)/lingshoujia)*100;
                $(this).closest('tbody').find('.rb_discountRate').val((Math.round(zhekoulv*10000)/10000).toFixed(2))
            }
        }else{
            $(this).closest('tbody').find('.rb_discountRate').val(0);
            $(this).closest('tbody').find('.rb_discountPrice').val(0)
        }
        totalCal()
    });
    $(document).on('focusout','.rb_proPrice', function () {
        $(this).val(Math.round(Number($(this).val())*100)/100);
        if(isNaN($(this).val())){
            $(this).val(0)
        }
        if(Number($(this).val())<Number($(this).closest('tbody').find('.rb_voucher').val())){
        	$.zxsaas_plus.showalert('warning','金额不能小于第三方抵扣!');
        	$(this).focus()
        }
        totalCal();
        receivableTotal();
    });
//第三方抵扣
    $(document).on('keyup','.rb_voucher',function(){
    	$(this).val(($(this).val().replace(/[^0-9.]/g,'')));//只允许数字小数点输入
    })
    $(document).on('focusout','.rb_voucher',function(){
    	$(this).val(Number($(this).val()));
		if(Number($(this).val())>Number($(this).closest('tbody').find('.rb_proPrice').val())){
    		$.zxsaas_plus.showconfirmsure('提示','券不能大于金额',function(){
    			$(this).focus()
    		});
    		return false
    	}
		totalCal()
		receivableTotal();
    })
    var myModal_voucher=$('#myModal_voucher');
    var _this_voucher;//第三方抵扣抵现金额
    var voucherState=2;
    $(document).on('click','.voucherBtn', function () {
        _this_voucher=$(this);
        myModal_voucher.modal('show');
        var _html;
        if(_this_voucher.closest('tbody').find('.rb_voucherData').val()!=''){//已操作过券
        	voucherState=1;
        	var data=JSON.parse(_this_voucher.closest('tbody').find('.rb_voucherData').val());
        	for(var i=0;i<data.length;i++){
        		_html+='<tr><td>1</td><td><span class="rb_voucher_add glyphicon glyphicon-plus"></span><span class="rb_voucher_del glyphicon glyphicon-minus"></span>'+
	                '</td><td><select name="rb_voucher_units" class="rb_voucher_units"></select></td>'+
	                '<td><select name="rb_voucher_name" class="rb_voucher_name"></select></td>'+
	                '<td><input class="rb_voucher_credit" type="text" value="'+data[i].rb_voucher_credit+'"></td>'+
	                '<td><input class="rb_voucher_num" type="text" value="'+data[i].rb_voucher_num+'"></td>'+
	                '<td><input class="rb_voucher_remark" type="text" value="'+data[i].rb_voucher_remark+'"></td></tr>';
        	}
        	$("#rb_voucher tbody").html(_html);
        	$.request({//初始化
            	type:'post',
            	url:basePath+'/jxc/base/getContactUnitList',
            	dataType:'json',
            	success:function(data){
        			var voucherJson=data.data.contactUnitList;
        	        var voucherHtml;
        	        $.each(voucherJson, function (i,val) {
        	            voucherHtml+='<option value="'+val.id+'">'+val.name+'</option>';
        	        });
        	        $('.rb_voucher_units').html(voucherHtml);
        		},
        		error:function(){
        			alert('请求失败')
        		}
            });
        	myModal_voucher.on('shown.bs.modal',function(){
        		if(voucherState==1){
        			for(var j=0;j<data.length;j++){
                		$('.rb_voucher_units:eq('+j+') option[value='+data[j].rb_voucher_units+']').prop('selected',true);
                		var _this=$('.rb_voucher_units:eq('+j+')');
                		var _thisName=data[j].rb_voucher_name;
                		if(data[j].rb_voucher_units=='null')data[j].rb_voucher_units='';
                		$.request({//初始化
        	            	type:'post',
        	            	url:basePath+'/retail/billing/searchThirdTicket',
        	            	async:false,
        	            	data:{contactUnitId:data[j].rb_voucher_units},
        	            	dataType:'json',
        	            	success:function(data){
        	        			var voucherJson=data.data.thridTicketList;
        	        	        var voucherHtml;
        	        	        $.each(voucherJson, function (i,val) {
        	        	            voucherHtml+='<option value="'+val.id+'">'+val.ticketName+'</option>';
        	        	        });
        	        	        _this.closest('tr').find('.rb_voucher_name').html(voucherHtml);
        	        	        _this.closest('tr').find('.rb_voucher_name option[value='+_thisName+']').prop('selected',true);
        	        		},
        	        		error:function(){
        	        			alert('请求失败')
        	        		}
        	            });
                	}
        			$('.rb_voucher_units').each(function(i,val){
        				var c=$(this).closest('tr')
        				if($(this).val()=='null'){
        					c.find('.rb_voucher_credit').prop('disabled',true)
        					c.find('.rb_voucher_num').prop('disabled',true)
        					c.find('.rb_voucher_remark').prop('disabled',true)
        				}
        			})
        		}
        	})
        	myModal_voucher.on('hidden.bs.modal',function(){
		    	myModal_voucher.off()
		    })
        }else{//未操作过券
        	voucherState=2;
        	_html='<tr><td>1</td><td><span class="rb_voucher_add glyphicon glyphicon-plus"></span> <span class="rb_voucher_del glyphicon glyphicon-minus"></span>'+
                '</td><td><select name="rb_voucher_units" class="rb_voucher_units"></select></td><td><select name="rb_voucher_name" class="rb_voucher_name"></td>'+
                '<td><input class="rb_voucher_credit" type="text" disabled=""></td>'+
                '<td><input class="rb_voucher_num" type="text" disabled=""></td>'+
                '<td><input class="rb_voucher_remark" type="text" disabled=""></td></tr>';
        	$("#rb_voucher tbody").html(_html);
        	$.request({//初始化
            	type:'post',
            	url:basePath+'/jxc/base/getContactUnitList',
            	dataType:'json',
            	success:function(data){
        			var voucherJson=data.data.contactUnitList;
        	        var voucherHtml;
        	        $.each(voucherJson, function (i,val) {
        	            voucherHtml+='<option value="'+val.id+'">'+val.name+'</option>';
        	        });
        	        $('.rb_voucher_units').html(voucherHtml);
        		},
        		error:function(){
        			alert('第三方抵扣请求失败')
        		}
            });
        }
        $("#voucher_sure").click(function () {
        	var canClose=true;
        	$('.rb_voucher_units').each(function(i,val){
        		if(($(this).val()!='null'&&$(this).val()!=null)&&(($(this).closest('tr').find('.rb_voucher_name').val()==null||$(this).closest('tr').find('.rb_voucher_name').val()=='null')||$(this).closest('tr').find('.rb_voucher_credit').val()==''||$(this).closest('tr').find('.rb_voucher_num').val()=='')){
        			$.zxsaas_plus.showalert('warning','第'+Number(i+1)+'行活动名称、抵现金额与业务号必须填');
        			canClose=false;
        			return false
        		}
        	})
        	if(!canClose){
        		return false
        	}else{
        		var rb_voucher_credit=0;
                $(".rb_voucher_credit").each(function () {
                    rb_voucher_credit+=Number($(this).val())
                });
                if(Number(rb_voucher_credit)>Number(_this_voucher.closest('tbody').find('.rb_proPrice').val())){
                	$.zxsaas_plus.showalert('warning','券总额大于金额！');
                	return false;
                }else{
                	_this_voucher.closest('tbody').find('.rb_voucher').val(Number(rb_voucher_credit).toFixed(2));
                    totalCal();
                    receivableTotal();
                    //保存券对象至隐藏域
                    _this_voucher.closest('tbody').find('.rb_voucherData').val(JSON.stringify(voucherTb()))
                    _this_voucher.closest('tbody').find('.thridTicketdata').val(JSON.stringify(thridTicketdata()))
                }
        	}
        })
    });
    
    myModal_voucher.on('hidden.bs.modal',function(){
    	$('#voucher_sure').off()
    })
    $(document).on('keyup','.rb_voucher_credit', function () {
        $(this).val(($(this).val().replace(/[^0-9.]/g,'')));//只允许数字小数点输入
    });
    $(document).on('focusout','.rb_voucher_credit', function () {
        $(this).val(Number($(this).val()));
        if(isNaN($(this).val())){
            $(this).val(0)
        }
    });
    //第三方抵扣弹框
    $(document).on('change','.rb_voucher_units',function(){
    	var _this=$(this),html='';
    	if(_this.val()=='null'){
    		_this.closest('tr').find('.rb_voucher_name').html('');
    		$(this).closest('tr').find('.rb_voucher_credit').val('').prop('disabled',true);
            $(this).closest('tr').find('.rb_voucher_num').val('').prop('disabled',true);
            $(this).closest('tr').find('.rb_voucher_remark').val('').prop('disabled',true);
    	}else{
    		$.request({//初始化
            	type:'post',
            	url:basePath+'/retail/billing/searchThirdTicket',
            	data:{contactUnitId:_this.val()},
            	dataType:'json',
            	success:function(data){
        			var voucherJson=data.data.thridTicketList;
        	        var voucherHtml;
        	        $.each(voucherJson, function (i,val) {
        	            voucherHtml+='<option value="'+val.id+'">'+val.ticketName+'</option>';
        	        });
        	        _this.closest('tr').find('.rb_voucher_name').html(voucherHtml);
        		},
        		error:function(){
        			alert('第三方抵扣请求失败')
        		}
            });
    		$(this).closest('tr').find('.rb_voucher_credit').prop('disabled',false);
            $(this).closest('tr').find('.rb_voucher_num').prop('disabled',false);
            $(this).closest('tr').find('.rb_voucher_remark').prop('disabled',false);
    	}
    })
    $(document).on('click','.rb_voucher_add', function () {
        var _this=$(this);
        var _html='<tr><td>1</td><td><span class="rb_voucher_add glyphicon glyphicon-plus"></span> <span class="rb_voucher_del glyphicon glyphicon-minus"></span></td>' +
                '<td><select name="rb_voucher_units" class="rb_voucher_units"></select></td><td><select name="rb_voucher_name" class="rb_voucher_name"></select></td>' +
                '<td><input class="rb_voucher_credit" type="text" disabled/></td><td><input class="rb_voucher_num" type="text" disabled/></td><td><input class="rb_voucher_remark" type="text" disabled/></td></tr>';
        _this.closest('tr').after(_html);
        $.request({
        	type:'post',
        	url:basePath+'/jxc/base/getContactUnitList',
        	dataType:'json',
        	success:function(data){
    			var voucherJson=data.data.contactUnitList;
    	        var voucherHtml;
    	        $.each(voucherJson, function (i,val) {
    	            voucherHtml+='<option value="'+val.id+'">'+val.name+'</option>';
    	        });
    	        var _this_rb_voucher_units=_this.closest('tr').next('tr').find('.rb_voucher_units');
    	        _this_rb_voucher_units.html(voucherHtml);
    	        _this_rb_voucher_units.change(function () {
    	        	var n=_this_rb_voucher_units.get(0).selectedIndex;
    	        	$(this).closest('tr').find('.rb_voucher_units').html(voucherJson[n].unitName);
    	        	if($(this).find('option:eq('+n+')').text()!=''){
                      $(this).closest('tr').find('.rb_voucher_credit').prop('disabled',false);
                      $(this).closest('tr').find('.rb_voucher_num').prop('disabled',false);
                      $(this).closest('tr').find('.rb_voucher_remark').prop('disabled',false);
    	        	}else{
				      $(this).closest('tr').find('.rb_voucher_credit').val('').prop('disabled',true);
					  $(this).closest('tr').find('.rb_voucher_num').val('').prop('disabled',true);
					  $(this).closest('tr').find('.rb_voucher_remark').val('').prop('disabled',true);
    	        	}
    	        });
    		},
    		error:function(){
    			alert('第三方抵扣请求失败')
    		}
        });
        voucher_OrderBy()
    });
    $(document).on('click','.rb_voucher_del', function () {
        if($(this).closest('tbody').find('tr').length==1){
            return false
        }else{
            $(this).closest('tr').remove()
        }
        voucher_OrderBy()
    });
    function voucher_OrderBy(){
        var len=$('#rb_voucher tbody tr').length;
        for(var i= 0,p=0;i<len;i++){
            p++;
            $('#rb_voucher tbody tr:eq('+i+') td:eq(0)').text(p)
        }
    }
    
//折扣率
    $(document).on('keyup','.rb_discountRate', function () {
//        $(this).val($(this).val().replace(/\D/g,''));//只允许数字输入
        $(this).val($(this).val().replace(/[^0-9.]/g,''));//只允许数字输入
        if($(this).val()>=100){
            $(this).val(100)
        }
        if(isNaN($(this).val())){
        	$(this).val(0)
        }
    });
    $(document).on('focusin','.rb_discountRate', function () {
    	var val=$(this).val();
    	$(this).focusout(function(){
    		if($(this).val()!=val){
    			//需要的值
    	        var lingshoujia=$(this).closest('tbody').find('.rb_bPrice').val();//零售价
    	        var zhekoulv=$(this).val();//折扣率
    	        var shuliang=$(this).closest('tbody').find('.rb_proNum').val();//数量
    	        if(lingshoujia!=''&&zhekoulv!=''){
    	            $(this).closest('tbody').find('.rb_discountPrice').val(Math.round((lingshoujia*zhekoulv/100)*100)/100);//折后价反算
    	            if(shuliang!=''){
    	                $(this).closest('tbody').find('.rb_proPrice').val(shuliang*($(this).closest('tbody').find('.rb_discountPrice').val()));//反算金额
    	            }
    	        }
    	        totalCal();
    	        receivableTotal()
    		}
    	})
    });
//折后价
    $(document).on('keyup','.rb_discountPrice', function () {
        $(this).val($(this).val().replace(/[^0-9.]/g,''));//只允许数字小数点输入
//        var lingshoujia=$(this).closest('tbody').find('.rb_bPrice').val();
//        if(lingshoujia!=''){
//            if(Number($(this).val())>Number(lingshoujia)){
//                $(this).val(lingshoujia)
//            }
//        }
        totalCal()
    });
    $(document).on('focusout','.rb_discountPrice', function () {
//        if()商品名存在
        $(this).val((Math.round($(this).val()*100)/100).toFixed(2));
        //需要的值
        var zhehoujia=$(this).val();//折后价
        var lingshoujia=$(this).closest('tbody').find('.rb_bPrice').val();//零售价
        var shuliang=$(this).closest('tbody').find('.rb_proNum').val();
        if(lingshoujia!=''&&zhehoujia!=''){
        	var zkl=((Math.round(zhehoujia/lingshoujia*10000)/10000)*100).toFixed(2);
        	if(isNaN(zkl))zkl='';
            $(this).closest('tbody').find('.rb_discountRate').val(zkl);//反算折扣率
            if(zhehoujia/lingshoujia==Infinity){
            	$(this).closest('tbody').find('.rb_discountRate').val('')
            }
        }
        if(zhehoujia!=''&&shuliang!=''){
            $(this).closest('tbody').find('.rb_proPrice').val(zhehoujia*shuliang);//反算金额
        }
        totalCal();
        receivableTotal();
    });
    
//分期商信息初始化
    stagesRequest($('.rb_stages_opt'))
    function stagesRequest(opt_class){
    	$.request({
        	type:'post',
        	url:basePath+'/retail/billing/searchInstallment',
        	dataType:'json',
        	success:function(data){
        		var stagesJson=data.data.installmentList;
        		var temp_html_stages;
    			$.each(stagesJson, function (i) {
    				if(stagesJson[i].name==null){
    					stagesJson[i].name=''
    				}
                    temp_html_stages+='<option value="'+stagesJson[i].code+'">'+stagesJson[i].name+'</option>';
                });
                opt_class.html(temp_html_stages);
    		},
    		error:function(){
    			alert('分期商初始化失败！')
    		}
        })
    }
    //分期商
    var myModal_stages=$("#myModal_stages");
    var _thisStages;//分期商index
    $(document).on('click','.stages', function () {
        _thisStages=$(this);
        if(_thisStages.closest('tbody').find('.rb_stages_opt').val()==''||_thisStages.closest('tbody').find('.rb_stages_opt').val()=='null'||_thisStages.closest('tbody').find('.rb_StageNum').val()==''){
            $.zxsaas_plus.showalert('warning','分期商或分期数为空！');
            return false;
        }else{
        	var fenqishang=_thisStages.closest('tbody').find('.rb_stages_opt option:selected').text();//分期商
            var fenqishu=_thisStages.closest('tbody').find('.rb_StageNum').val();//分期数
            var shangpinjine=_thisStages.closest('tbody').find('.rb_proPrice').val();//商品金额
            var shoufu=_thisStages.closest('tbody').find('.rb_downPayments').val();//首付
            var quan=_thisStages.closest('tbody').find('.rb_voucher').val();//券
            _thisStages.closest('tbody').find('.rb_stages_balance').val((Number(shangpinjine)-Number(quan)-Number(shoufu)).toFixed(2));//余额计算
            var yue=_thisStages.closest('tbody').find('.rb_stages_balance').val();//余额
            if(Number(yue)<=0){
            	$.zxsaas_plus.showalert('warning','余额必须大于0');
            	return false;
            }
            _thisStages.closest('tbody').find('.rb_stages_monthly').val(Math.round(Number(yue/fenqishu)*100)/100);
            var yuefu=_thisStages.closest('tbody').find('.rb_stages_monthly').val();//月付
            var hetonghao=_thisStages.closest('tbody').find('.rb_stages_contract').val();//合同号
            var beizhu=_thisStages.closest('tbody').find('.rb_stages_remarks').val();//备注
            
            myModal_stages.modal('show');
            $('#rb_stages_business').val(fenqishang);
            $('#rb_stages_num').val(fenqishu);
            $('#rb_stages_proPrice').val(Number(shangpinjine));
            $('#rb_stages_payments').val(Number(shoufu));
            $('#rb_stages_balance').val(yue);
            $('#rb_stages_monthly').val(yuefu);
            $('#rb_stages_contract').val(hetonghao);
            $('#rb_stages_remarks').val(beizhu);
            $('#stages_sure').click(function () {
            	_thisStages.closest('tbody').find('.rb_stages_opt option[value='+fenqishang+']').prop('selected',true);
                _thisStages.closest('tbody').find('.rb_StageNum').val($('#rb_stages_num').val());//分期数
                _thisStages.closest('tbody').find('.rb_proPrice').val($('#rb_stages_proPrice').val());//商品金额
                _thisStages.closest('tbody').find('.rb_downPayments').val($('#rb_stages_payments').val());//首付
                _thisStages.closest('tbody').find('.rb_stages_balance').val($('#rb_stages_balance').val());//余额
                _thisStages.closest('tbody').find('.rb_stages_monthly').val($('#rb_stages_monthly').val());//月付
                _thisStages.closest('tbody').find('.rb_stages_contract').val($('#rb_stages_contract').val());//合同号
                _thisStages.closest('tbody').find('.rb_stages_remarks').val($('#rb_stages_remarks').val());//备注
                totalCal();
                receivableTotal();
            });
        }
    });
    $(document).on('change','.rb_stages_opt', function () {
    	$(this).closest('tbody').find('.rb_StageNum,.rb_downPayments,.rb_stages_payments,.rb_stages_balance,.rb_stages_monthly,.rb_stages_contract,.rb_stages_remarks').val('')
        if($(this).val()!='null'){
            $(this).closest('tbody').find('.rb_StageNum,.rb_downPayments').prop('disabled',false);
        }else{
            $(this).closest('tbody').find('.rb_StageNum,.rb_downPayments').prop('disabled',true);
            totalCal()
        }
        receivableTotal()
    });
    //分期详情弹框计算
    function stagesCacu(){
    	var fenqishu=Number($('#rb_stages_num').val());
    	var jine=Number($('#rb_stages_proPrice').val());
    	var shoufu=Number($('#rb_stages_payments').val());
    	$('#rb_stages_balance').val(jine-shoufu);//余额
    	$('#rb_stages_monthly').val(Math.round(((jine-shoufu)/fenqishu)*100)/100);//月付
    }
    //分期数
    $(document).on('keyup','.rb_StageNum', function () {
        $(this).val(Number($(this).val().replace(/\D/g,'')));//只允许数字输入
        if(isNaN($(this).val())||$(this).val()==''){
            $(this).val(0)
        }
    });
        //分期详情输入限制
    $('#rb_stages_num').keyup(function () {
        $(this).val(Number($(this).val().replace(/\D/g,'')));//只允许数字输入
        stagesCacu()
    });
    $('#rb_stages_proPrice').keyup(function () {
    	$(this).val(($(this).val().replace(/[^0-9.]/g,'')));//只允许数字.输入
    	if(Number($(this).val())<Number($('#rb_stages_payments').val())){
        	$(this).val($('#rb_stages_payments').val())
        }
    	stagesCacu()
    });
    $('#rb_stages_proPrice').focusout(function () {
        $(this).val(Number($(this).val()));
        $(this).val(Math.round($(this).val()*100)/100)
        stagesCacu()
    });
    $('#rb_stages_payments').keyup(function () {
        $(this).val(($(this).val().replace(/[^0-9.]/g,'')));//只允许数字.输入
        if(Number($(this).val())>Number($('#rb_stages_proPrice').val())){
        	$(this).val($('#rb_stages_proPrice').val())
        }
        stagesCacu()
    });
    $('#rb_stages_payments').focusout(function () {
    	$(this).val(Number($(this).val()));
    	$(this).val(Math.round($(this).val()*100)/100)
    	stagesCacu()
    });
    //首付
    $(document).on('keyup','.rb_downPayments', function () {
        $(this).val($(this).val().replace(/[^0-9.]/g,''));//只允许数字小数点输入
        totalCal()
    });
    $(document).on('focusout','.rb_downPayments', function () {
    	var jine=Number($(this).closest('tbody').find('.rb_proPrice').val());
    	var quan=Number($(this).closest('tbody').find('.rb_voucher').val());
        $(this).val((Math.round($(this).val()*100)/100).toFixed(2));
        if(isNaN($(this).val())){
        	$(this).val(0)
        }
        if($(this).val()>(jine-quan)){
        	var _this=$(this);
        	$.zxsaas_plus.showconfirmsure('提示','首付不能大于余额',function(){
    			_this.focus()
    		});
        	return false;
        }
        totalCal()
    });
    
    //抹零
    $('#receivableIgnore').keyup(function(){
    	$(this).val(($(this).val().replace(/[^0-9.]/g,'')));//只允许数字.输入
    })
    $('#receivableIgnore').focusout(function(){
    	$(this).val(Math.round(Number($(this).val())*100)/100);//只允许数字.输入
    	if(isNaN($(this).val())){
    		$(this).val(0)
    	}
    })
//合计计算
    function totalCal(){
        //金额合计
        var rb_proPrice_total=0;
        for(var i=0;i<$('.rb_proPrice').length;i++){
            rb_proPrice_total+=Number($('.rb_proPrice:eq('+i+')').val());
        }
        $('#rb_proPrice_total').text(Math.round(rb_proPrice_total*100)/100);
        //第三方抵扣合计
        var rb_voucher_total=0;
        for(var j=0;j<$('.rb_voucher').length;j++){
            rb_voucher_total+=Number($('.rb_voucher:eq('+j+')').val());
        }
        $('#rb_voucher_total').text(Math.round(rb_voucher_total*100)/100);
        //折扣合计
        var rb_discountPrice_total=0;
        for(var k=0;k<$('.rb_bPrice').length;k++){
        	var Bprice=Number($('.rb_bPrice:eq('+k+')').val());
        	var num=Number($('.rb_bPrice:eq('+k+')').closest('tbody').find('.rb_proNum').val());
        	var price=Number($('.rb_bPrice:eq('+k+')').closest('tbody').find('.rb_proPrice').val());
            rb_discountPrice_total+=Bprice*num-price;
        }
        $('#rb_discountPrice_total').text(Math.round(rb_discountPrice_total*100)/100);
//        //首付合计
        var rb_downPayments_total=0;
        for(var l=0;l<$('.rb_downPayments').length;l++){
            rb_downPayments_total+=Number($('.rb_downPayments:eq('+l+')').val());
        }
        $('#rb_downPayments_total').text(Math.round(rb_downPayments_total*100)/100);
    }

    
    
//主输入框    会员串号查询
    function removeEmpTr(){
    	$('.rb_proNameId').each(function(i,val){
    		if($(this).val()==''){
    			$(this).closest('tbody').remove()
    		}
    	})
    	orderBy()
    }
    var superInput=$('#rb_superInput');
    var myModal_rb_MQR=$('#myModal_rb_MQR');//会员框
    var myModal_rb_MQI=$('#myModal_rb_MQI');//串号框
    var searchState=2;//搜索状态，默认串号
    superInput.keyup(function(e){
        	if(e.ctrlKey&&e.keyCode==18){
        		if(searchState==1){
        			searchState=2;//串号
        			$('.tip').html('请录入串号或条码')
        		}else{
        			searchState=1;//会员
        			$('.tip').html('请录入会员卡号或手机号、微信号、支付宝账号')
        		}
        	}
        	if(e.keyCode==13){
        		if(searchState==1){
            		myModal_rb_MQR.modal('show');
                    $.request({
                    	type:'post',
                    	url:basePath+'/retail/billing/searchCustomerVoList',
                    	data:{
                    		queryKey:superInput.val()
                    	},
                    	dataType:'json',
                    	success:function(data){
                    		var rb_MQR=data.data.customerVoList;
                    		var html;
                    		if(rb_MQR.length==0){
                    			$("#rb_MQR tbody").html('')
                    		}else{
                    			$.each(rb_MQR,function(i,val){
                    				for(var key in val){
                    					if(val[key]==null){
                    						val[key]='';
                    					}
                    				}
                        			html+='<tr><td><a class="rb_MQR_choose" href="javascript:void(0)">选择</a><input class="rb_MQR_cardNumID" type="hidden" value="'+val.cardId+'"/><input class="rb_MQR_dAmount" type="hidden" value="'+val.dAmount+'"/><input class="rb_MQR_dScore" type="hidden" value="'+val.dScore+'"/></td>'+
                                    '<td class="rb_MQR_cardNum">'+val.cardNum+'</td>'+
                                    '<td class="rb_MQR_customerName">'+val.customerName+'</td>'+
                                    '<td class="rb_MQR_customerTel">'+val.customerTel+'</td>'+
                                    '<td class="rb_MQR_customerType">'+val.customerType+'<input class="rb_MQR_cardTypeId" type="hidden" value="'+val.cardTypeId+'"/></td>'+
                                    '<td class="rb_MQR_contactUnitName">'+val.contactUnitName+'<input class="rb_MQR_contactUnitId" type="hidden" value="'+val.contactUnitId+'"/></td>'+
                                    '<td class="rb_MQR_remark">'+val.remark+'</td>'+
                                    '<input class="rb_MQR_customerScore" type="hidden" value="'+val.customerScore+'"/>'+
                                    '<input class="rb_MQR_customerAmount" type="hidden" value="'+val.customerAmount+'"/></tr>';
                        		})
                        		$("#rb_MQR tbody").html(html)
                    		}
                		},
                		error:function(){
                			alert('请求失败！')
                		}
                    })
            	}else{
            		if(superInput.val().length<5){$.zxsaas_plus.showalert('warning','索引长度必须大于5位！');superInput.blur();return;}
            		$.request({
            			type:'post',
            			url:basePath+'/inventory/common/getStockGoodsImeiVoList',
            			data:{
            				sectionId:sectionId,
	            			queryKey:$('#rb_superInput').val()
	            		},
            			dataType:'json',
            			success:function(data){
	            			if(data.result==1){
	            				var rb_MQI=data.data.goodsImeiVoList;
		                		var html;
		                		if(rb_MQI.length==0){
		                			$.zxsaas_plus.showalert('warning','未搜索到商品！');
		                			$("#rb_MQI tbody").html('')
		                		}else if(rb_MQI.length==1){
		                			rb_MQI=data.data.goodsImeiVoList[0];
		                			for(var k in rb_MQI){
		                				if(rb_MQI[k]==null)rb_MQI[k]=''
		                			}
		                			var MQIres_1=rb_MQI.goodsId;//商品ID
		                	    	var MQIres_2=rb_MQI.retailPrice;//价格
		                	    	var MQIres_3=rb_MQI.storageId;//仓库ID
		                	    	var MQIres_4=rb_MQI.ifManageImei;//是否串号管理
		                	    	var MQIres_5=rb_MQI.brandId;//品牌id
		                	    	var MQIres_6=rb_MQI.categoryId;//类别ID
		                	    	var MQIres_7=rb_MQI.code;//商品编码
		                	    	var MQIres_8=rb_MQI.name;//商品名称
		                	    	var MQIres_9=rb_MQI.models;//商品型号
		                	    	var MQIres_10=rb_MQI.color;//颜色
		                	    	var MQIres_11=rb_MQI.brandName;//类别
		                	    	var MQIres_12=rb_MQI.imei;//串号
		                	    	var MQIres_13=rb_MQI.storageName;//仓库
		                	    	var MQIres_14=rb_MQI.imeiId;//串号ID
		                	    	if(MQIres_4==1){
		                	    		for(var i=0;i<$('.rb_proSerialNum').length;i++){
			                	    		if($('.rb_proSerialNum:eq('+i+')').text()==MQIres_12){
			                	    			$.zxsaas_plus.showalert('warning','该商品相同串号已存在列表中');
			                	    			return;
			                	    		}
			                	    	}
		                	    		var tbodyHtml='<tbody class="rb_tbody"><tr><td rowspan="3">1</td><td rowspan="3"><span class="rb_add glyphicon glyphicon-plus"></span> <span class="rb_del glyphicon glyphicon-minus"></span></td>' +
				                			        '<td rowspan="3"><input type="checkbox" class="rb_gift"/><input class="giftFlag" type="hidden" value="0"/></td>';
				                			tbodyHtml+='<td rowspan="3"><input class="rb_proName" disabled type="text" value="'+MQIres_8+'"/><input class="rb_proNameId" type="hidden" value="'+MQIres_1+'"/><input class="rb_proCode" type="hidden" value="'+MQIres_7+'"/> <button class="rb_proNameBtn smBtn btn btn-default"><span class="glyphicon glyphicon-plus"></span></button><input class="rb_proSerialNumId" type="hidden" value="'+MQIres_14+'" /><input class="rb_ifManageImei" type="hidden" value="'+MQIres_4+'"/></td>';
				                			tbodyHtml+='<td class="rb_proModel" rowspan="3">'+MQIres_9+'</td><td class="rb_proColor" rowspan="3">'+MQIres_10+'</td><td class="rb_proSerialNum" rowspan="3">'+MQIres_12+'</td><td rowspan="3"><input class="rb_proNum" type="text"/></td>' +
				                			        '<td rowspan="3"><input class="rb_proPrice" type="text" /></td><td rowspan="3"><input class="rb_voucher" disabled type="text"/> <input class="rb_voucherData" type="hidden"/><input class="thridTicketdata" type="hidden"/><button class="voucherBtn smBtn btn btn-default"><span class="glyphicon glyphicon-plus"></span></button></td>';
				                			tbodyHtml+='<td>标价</td><td><input class="rb_bPrice" type="text" disabled value="'+MQIres_2+'"/></td><td><a class="stages">分期商</a>'+
				                	    			'<input class="rb_stages_payments" type="hidden"/><input class="rb_stages_balance" disabled type="hidden"/>'+
				                	    			'<input class="rb_stages_monthly" disabled type="hidden"/><input class="rb_stages_contract" type="hidden"/><input class="rb_stages_remarks" maxlength="100" type="hidden"/></td><td><select name="" class="rb_stages_opt"></select></td><td>是否合约机</td>';
				                			tbodyHtml+='<td><input class="rb_isContract" type="checkbox" value="0"/></td></tr><tr><td>折扣率(Z)</td><td><input class="rb_discountRate" type="text" value="100"/>%</td><td>分期数</td>' +
				                			        '<td><input type="text" class="rb_StageNum" disabled/></td><td>备注</td>';
				                			tbodyHtml+='<td><input class="rb_remark" type="text"></td></tr><tr><td>折后价(J)</td><td><input class="rb_discountPrice" type="text"/></td><td>首付</td>' +
				                			        '<td><input class="rb_downPayments" type="text" disabled/></td><td>仓库<input class="rb_storageId" value="'+MQIres_3+'"  type="hidden" /></td><td class="rb_warehouse">'+MQIres_13+'</td></tr></tbody>';
			                			$('#rb_table tbody:last-child').before(tbodyHtml);
			                			//排序
			                			//分期商
			                			stagesRequest($('#rb_table tbody:last-child').prev('tbody').find('.rb_stages_opt'));
			                			$('#rb_table tbody:last-child').prev('tbody').find('.rb_proNum').val(1).prop('disabled',true);
		                	    	}else{
		                	    		var asd=false;
		                	    		$('.rb_proNameId').each(function(i,val){
		                	    			if($(this).val()==MQIres_1){
		                	    				var n=Number($(this).closest('tbody').find('.rb_proNum').val());
		                	    				n++;
		                	    				$(this).closest('tbody').find('.rb_proNum').val(n);
		                	    				asd=false
		                	    				$("#rb_superInput").val('');
		                	    				return false;
		                	    			}else{
		                	    				asd=true
		                	    			}
		                	    		})
		                	    		if(asd){
		                	    			var tbodyHtml='<tbody class="rb_tbody"><tr><td rowspan="3">1</td><td rowspan="3"><span class="rb_add glyphicon glyphicon-plus"></span> <span class="rb_del glyphicon glyphicon-minus"></span></td>' +
		                			        '<td rowspan="3"><input type="checkbox" class="rb_gift"/><input class="giftFlag" type="hidden" value="0"/></td>';
					                			tbodyHtml+='<td rowspan="3"><input class="rb_proName" disabled type="text" value="'+MQIres_8+'"/><input class="rb_proNameId" type="hidden" value="'+MQIres_1+'"/><input class="rb_proCode" type="hidden" value="'+MQIres_7+'"/> <button class="rb_proNameBtn smBtn btn btn-default"><span class="glyphicon glyphicon-plus"></span></button><input class="rb_proSerialNumId" type="hidden" value="'+MQIres_14+'" /><input class="rb_ifManageImei" type="hidden" value="'+MQIres_4+'"/></td>';
					                			tbodyHtml+='<td class="rb_proModel" rowspan="3">'+MQIres_9+'</td><td class="rb_proColor" rowspan="3">'+MQIres_10+'</td><td class="rb_proSerialNum" rowspan="3">'+MQIres_12+'</td><td rowspan="3"><input class="rb_proNum" type="text"/></td>' +
					                			        '<td rowspan="3"><input class="rb_proPrice" type="text" /></td><td rowspan="3"><input class="rb_voucher" disabled type="text"/> <input class="rb_voucherData" type="hidden"/><input class="thridTicketdata" type="hidden"/><button class="voucherBtn smBtn btn btn-default"><span class="glyphicon glyphicon-plus"></span></button></td>';
					                			tbodyHtml+='<td>标价</td><td><input class="rb_bPrice" type="text" disabled value="'+MQIres_2+'"/></td><td><a class="stages">分期商</a>'+
					                	    			'<input class="rb_stages_payments" type="hidden"/><input class="rb_stages_balance" disabled type="hidden"/>'+
					                	    			'<input class="rb_stages_monthly" disabled type="hidden"/><input class="rb_stages_contract" type="hidden"/><input class="rb_stages_remarks" maxlength="100" type="hidden"/></td><td><select name="" class="rb_stages_opt"></select></td><td>是否合约机</td>';
					                			tbodyHtml+='<td><input class="rb_isContract" type="checkbox" value="0"/></td></tr><tr><td>折扣率(Z)</td><td><input class="rb_discountRate" type="text" value="100"/>%</td><td>分期数</td>' +
					                			        '<td><input type="text" class="rb_StageNum" disabled/></td><td>备注</td>';
					                			tbodyHtml+='<td><input class="rb_remark" type="text"></td></tr><tr><td>折后价(J)</td><td><input class="rb_discountPrice" type="text"/></td><td>首付</td>' +
					                			        '<td><input class="rb_downPayments" type="text" disabled/></td><td>仓库<input class="rb_storageId" value="'+MQIres_3+'"  type="hidden" /></td><td class="rb_warehouse">'+MQIres_13+'</td></tr></tbody>';
				                			$('#rb_table tbody:last-child').before(tbodyHtml);
				                			//排序
				                			//分期商
				                			stagesRequest($('#rb_table tbody:last-child').prev('tbody').find('.rb_stages_opt'));
				                			$('#rb_table tbody:last-child').prev('tbody').find('.rb_proNum').val(1).prop('disabled',false);
		                	    		}
		                	    	}
		                	    	$('#rb_superInput').val('').focus();
		                	    	removeEmpTr();
		                		}else{
		                			myModal_rb_MQI.modal('show');
		                			$.each(rb_MQI,function(i,val){
		                				for(var k in val){
		                					if(val[k]==null)val[k]='';
		                				}
		                				html+='<tr><td><a class="rb_MQI_choose" href="javascript:void(0)">选择</a>'+
		                					'<input class="rb_MQI_proId" type="hidden" value="'+val.goodsId+'"/>'+
		                					'<input class="rb_MQI_imeiId" type="hidden" value="'+val.imeiId+'"/>'+
		                					'<input class="rb_MQI_retailPrice" type="hidden" value="'+val.retailPrice+'"/>'+
		                					'<input class="rb_MQI_storageId" type="hidden" value="'+val.storageId+'"/>'+
		                					'<input class="rb_MQI_ifManageImei" type="hidden" value="'+val.ifManageImei+'"/>'+
		                					'<input class="rb_MQI_brandId" type="hidden" value="'+val.brandId+'"/>'+
		                					'<input class="rb_MQI_categoryId" type="hidden" value="'+val.categoryId+'"/></td>'+
		                					'<td class="rb_MQI_SerialNum">'+val.imei+'</td>'+
		                					'<td class="rb_MQI_barcode">'+val.barcode+'</td>'+
				                            '<td class="rb_MQI_proCode">'+val.code+'</td>'+
				                            '<td class="rb_MQI_proName">'+val.name+'</td>'+
				                            '<td class="rb_MQI_type">'+val.brandName+'</td>'+
				                            '<td class="rb_MQI_model">'+val.models+'</td>'+
				                            '<td class="rb_MQI_color">'+val.color+'</td>'+
				                            '<td class="rb_MQI_Warehouse">'+val.storageName+'</td></tr>';
		                    		})
		                    		$("#rb_MQI tbody").html(html)
		                		}
	            			}else{
	            				$.zxsaas_plus.showalert('error',data.desc);
	            			}
	            		},
	            		error:function(){
	            			alert('请求失败')
	            		}
            		})
            	}
        	}
        })
    	//串号查询结果选择
    $(document).on('click','.rb_MQI_choose',function(){
    	var MQIres_1=$(this).closest('tr').find('.rb_MQI_proId').val();//商品ID
    	var MQIres_2=$(this).closest('tr').find('.rb_MQI_retailPrice').val();//价格
    	var MQIres_3=$(this).closest('tr').find('.rb_MQI_storageId').val();//仓库ID
    	var MQIres_4=$(this).closest('tr').find('.rb_MQI_ifManageImei').val();//是否串号管理
    	var MQIres_5=$(this).closest('tr').find('.rb_MQI_brandId').val();//品牌id
    	var MQIres_6=$(this).closest('tr').find('.rb_MQI_categoryId').val();//类别ID
    	var MQIres_7=$(this).closest('tr').find('.rb_MQI_proCode').text();//商品编码
    	var MQIres_8=$(this).closest('tr').find('.rb_MQI_proName').text();//商品名称
    	var MQIres_9=$(this).closest('tr').find('.rb_MQI_model').text();//商品型号
    	var MQIres_10=$(this).closest('tr').find('.rb_MQI_color').text();//颜色
    	var MQIres_11=$(this).closest('tr').find('.rb_MQI_type').text();//类别
    	var MQIres_12=$(this).closest('tr').find('.rb_MQI_SerialNum').text();//串号
    	var MQIres_13=$(this).closest('tr').find('.rb_MQI_Warehouse').text();//仓库
    	var MQIres_14=$(this).closest('tr').find('.rb_MQI_imeiId').val();//串号ID
    	if(MQIres_4==1){
    		for(var i=0;i<$('.rb_proSerialNum').length;i++){
	    		if($('.rb_proSerialNum:eq('+i+')').text()==MQIres_12){
	    			$.zxsaas_plus.showalert('warning','该商品相同串号已存在列表中');
	    			return;
	    		}
	    	}
    		var tbodyHtml='<tbody class="rb_tbody"><tr><td rowspan="3">1</td><td rowspan="3"><span class="rb_add glyphicon glyphicon-plus"></span> <span class="rb_del glyphicon glyphicon-minus"></span></td>' +
    			        '<td rowspan="3"><input type="checkbox" class="rb_gift"/><input class="giftFlag" type="hidden" value="0"/></td>';
    			tbodyHtml+='<td rowspan="3"><input class="rb_proName" disabled type="text" value="'+MQIres_8+'"/><input class="rb_proNameId" type="hidden" value="'+MQIres_1+'"/><input class="rb_proCode" type="hidden" value="'+MQIres_7+'"/> <button class="rb_proNameBtn smBtn btn btn-default"><span class="glyphicon glyphicon-plus"></span></button><input class="rb_proSerialNumId" type="hidden" value="'+MQIres_14+'" /><input class="rb_ifManageImei" type="hidden" value="'+MQIres_4+'"/></td>';
    			tbodyHtml+='<td class="rb_proModel" rowspan="3">'+MQIres_9+'</td><td class="rb_proColor" rowspan="3">'+MQIres_10+'</td><td class="rb_proSerialNum" rowspan="3">'+MQIres_12+'</td><td rowspan="3"><input class="rb_proNum" type="text"/></td>' +
    			        '<td rowspan="3"><input class="rb_proPrice" type="text" /></td><td rowspan="3"><input class="rb_voucher" disabled type="text"/> <input class="rb_voucherData" type="hidden"/><input class="thridTicketdata" type="hidden"/><button class="voucherBtn smBtn btn btn-default"><span class="glyphicon glyphicon-plus"></span></button></td>';
    			tbodyHtml+='<td>标价</td><td><input class="rb_bPrice" type="text" disabled value="'+MQIres_2+'"/></td><td><a class="stages">分期商</a>'+
    	    			'<input class="rb_stages_payments" type="hidden"/><input class="rb_stages_balance" disabled type="hidden"/>'+
    	    			'<input class="rb_stages_monthly" disabled type="hidden"/><input class="rb_stages_contract" type="hidden"/><input class="rb_stages_remarks" maxlength="100" type="hidden"/></td><td><select name="" class="rb_stages_opt"></select></td><td>是否合约机</td>';
    			tbodyHtml+='<td><input class="rb_isContract" type="checkbox" value="0"/></td></tr><tr><td>折扣率(Z)</td><td><input class="rb_discountRate" type="text" value="100"/>%</td><td>分期数</td>' +
    			        '<td><input type="text" class="rb_StageNum" disabled/></td><td>备注</td>';
    			tbodyHtml+='<td><input class="rb_remark" type="text"></td></tr><tr><td>折后价(J)</td><td><input class="rb_discountPrice" type="text"/></td><td>首付</td>' +
    			        '<td><input class="rb_downPayments" type="text" disabled/></td><td>仓库<input class="rb_storageId" value="'+MQIres_3+'"  type="hidden" /></td><td class="rb_warehouse">'+MQIres_13+'</td></tr></tbody>';
			$('#rb_table tbody:last-child').before(tbodyHtml);
			//排序
			//分期商
			stagesRequest($('#rb_table tbody:last-child').prev('tbody').find('.rb_stages_opt'));
			$('#rb_table tbody:last-child').prev('tbody').find('.rb_proNum').val(1).prop('disabled',true);
    	}else{
    		var asd=false;
    		$('.rb_proNameId').each(function(i,val){
    			if($(this).val()==MQIres_1){
    				var n=Number($(this).closest('tbody').find('.rb_proNum').val());
    				n++;
    				$(this).closest('tbody').find('.rb_proNum').val(n);
    				asd=false
    				$("#rb_superInput").val('');
    				return false;
    			}else{
    				asd=true
    			}
    		})
    		if(asd){
    			var tbodyHtml='<tbody class="rb_tbody"><tr><td rowspan="3">1</td><td rowspan="3"><span class="rb_add glyphicon glyphicon-plus"></span> <span class="rb_del glyphicon glyphicon-minus"></span></td>' +
		        '<td rowspan="3"><input type="checkbox" class="rb_gift"/><input class="giftFlag" type="hidden" value="0"/></td>';
        			tbodyHtml+='<td rowspan="3"><input class="rb_proName" disabled type="text" value="'+MQIres_8+'"/><input class="rb_proNameId" type="hidden" value="'+MQIres_1+'"/><input class="rb_proCode" type="hidden" value="'+MQIres_7+'"/> <button class="rb_proNameBtn smBtn btn btn-default"><span class="glyphicon glyphicon-plus"></span></button><input class="rb_proSerialNumId" type="hidden" value="'+MQIres_14+'" /><input class="rb_ifManageImei" type="hidden" value="'+MQIres_4+'"/></td>';
        			tbodyHtml+='<td class="rb_proModel" rowspan="3">'+MQIres_9+'</td><td class="rb_proColor" rowspan="3">'+MQIres_10+'</td><td class="rb_proSerialNum" rowspan="3">'+MQIres_12+'</td><td rowspan="3"><input class="rb_proNum" type="text"/></td>' +
        			        '<td rowspan="3"><input class="rb_proPrice" type="text" /></td><td rowspan="3"><input class="rb_voucher" disabled type="text"/> <input class="rb_voucherData" type="hidden"/><input class="thridTicketdata" type="hidden"/><button class="voucherBtn smBtn btn btn-default"><span class="glyphicon glyphicon-plus"></span></button></td>';
        			tbodyHtml+='<td>标价</td><td><input class="rb_bPrice" type="text" disabled value="'+MQIres_2+'"/></td><td><a class="stages">分期商</a>'+
        	    			'<input class="rb_stages_payments" type="hidden"/><input class="rb_stages_balance" disabled type="hidden"/>'+
        	    			'<input class="rb_stages_monthly" disabled type="hidden"/><input class="rb_stages_contract" type="hidden"/><input class="rb_stages_remarks" maxlength="100" type="hidden"/></td><td><select name="" class="rb_stages_opt"></select></td><td>是否合约机</td>';
        			tbodyHtml+='<td><input class="rb_isContract" type="checkbox" value="0"/></td></tr><tr><td>折扣率(Z)</td><td><input class="rb_discountRate" type="text" value="100"/>%</td><td>分期数</td>' +
        			        '<td><input type="text" class="rb_StageNum" disabled/></td><td>备注</td>';
        			tbodyHtml+='<td><input class="rb_remark" type="text"></td></tr><tr><td>折后价(J)</td><td><input class="rb_discountPrice" type="text"/></td><td>首付</td>' +
        			        '<td><input class="rb_downPayments" type="text" disabled/></td><td>仓库<input class="rb_storageId" value="'+MQIres_3+'"  type="hidden" /></td><td class="rb_warehouse">'+MQIres_13+'</td></tr></tbody>';
    			$('#rb_table tbody:last-child').before(tbodyHtml);
    			//排序
    			//分期商
    			stagesRequest($('#rb_table tbody:last-child').prev('tbody').find('.rb_stages_opt'));
    			$('#rb_table tbody:last-child').prev('tbody').find('.rb_proNum').val(1).prop('disabled',false);
    		}
    	}
    	$('#myModal_rb_MQI').modal('hide');
    	$('#rb_superInput').val('').focus();
    	removeEmpTr();
    })
    	//会员查询结果选择按钮
    $(document).on('click','.rb_MQR_choose',function(){
    	$('#table_increment tbody').html('');
    	var _thisClosestTr=$(this).closest('tr');
    	$('#cardNum').val(_thisClosestTr.find('.rb_MQR_cardNum').text())
    	$("#memberId").val(_thisClosestTr.find('.rb_MQR_cardNumID').val())//
    	$('#cardTypeId').val(_thisClosestTr.find('.rb_MQR_cardTypeId').val())//
    	$('#customerName').val(_thisClosestTr.find('.rb_MQR_customerName').text())
    	$('#customerTel').val(_thisClosestTr.find('.rb_MQR_customerTel').text())
    	$('#customerType').val(_thisClosestTr.find('.rb_MQR_customerType').text())
    	$('#CurrentBalance').val(_thisClosestTr.find('.rb_MQR_customerAmount').val())
    	$('#CurrentIntegration').val(_thisClosestTr.find('.rb_MQR_customerScore').val())
    	$('#dAmount').val(_thisClosestTr.find('.rb_MQR_dAmount').val())
    	$('#dScore').val(_thisClosestTr.find('.rb_MQR_dScore').val())
    	$("#rb_superInput").val('');
    	myModal_rb_MQR.modal('hide');
    	$('#addAdminForm').bootstrapValidator('resetForm', false);//为true时清空表单内容
    	$('#addAdminForm').data('bootstrapValidator').validate();
        if (!$('#addAdminForm').data('bootstrapValidator').isValid()) {
            return false;
        }else{
        	$('#customerName,#customerTel').prop('disabled',true);
        }
    })
//应收合计
    function receivableTotal(){
    	var tol=0;
    	var len=$('#rb_table tbody').length-1;
    	for(var i=0;i<len;i++){
    		var voucher = Number($('#rb_table tbody:eq('+i+')').find('.rb_voucher').val());
    		var proPrice = Number($('#rb_table tbody:eq('+i+')').find('.rb_proPrice').val());
    		var downPayments = Number($('#rb_table tbody:eq('+i+')').find('.rb_downPayments').val());
    		if($('#rb_table tbody:eq('+i+')').find('.rb_downPayments').prop('disabled')==true){//无分期
    			tol+= proPrice - voucher;
    		}else{//有分期
    			tol+=downPayments;
    		}
    	}
    	tol+=Number($('#shouldReceive').val());
    	$('#receivableTotal').val((tol+Number($('#tempOprRealAmount').val())).toFixed(2))
    }

//收款结算
    var myModal_settle=$('#myModal_settle');
    var canSettle=false;
    var collectionDetails=null;//收款明细
    $('#settleBtn').click(function () {
    	if(isView){//查询模式
    		var posTotal=0;//pos总金额
    		myModal_settle.modal('show');
    		var shouldBeCount=Number($('#receivableTotal').val())-Number($('#retailDeposit').val())-Number($('#receivableIgnore').val());
    		$('#settle_receivable').html(shouldBeCount);//应收金额
    		$('#table_settle input,#table_pos input').val('');
    		$('#pos').prop('disabled',false);
    		$.request({
				type: 'Post',
				url: basePath + '/retail/deposit/findAccountList',
				data: {
					sectionId : $("#sectionId").val()
				},
				dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
				success: function (data) {
					var res=data.data.accountList;
					var _html;
					for(var i=0;i<res.length;i++){
						if(res[i].accountType==2){
							_html+='<tr><td>'+res[i].accountName+'</td><td><input class="posAccount" type="text" value="" disabled><input class="posAccountId" type="hidden" value="'+res[i].accountId+'"><input class="posAccountType" type="hidden" value="'+res[i].accountType+'"></td></tr>'
						}else{
							html='';
						}
					}
					$('#table_pos tbody').html(_html);
				},
				error: function () {
					alert("资金账户加载失败！");
				}
			});
    		$.each(collectionDetails,function(i,val){
    			if(val.remark==null){
    				val.remark=''
    			}
    			switch(val.accountType){
    			case '1':
    				$('#cash').val(val.amount);
    				$('#deductionRemark').val(val.remark);
    				break;
    			case '2':
    				posTotal+=Number(val.amount)
    				$('#pos').val(posTotal);
    				$('#deductionRemark').val(val.remark);
    				break;
    			case '3':
    				$('#weixin').val(val.amount);
    				$('#deductionRemark').val(val.remark);
    				break;
    			case '4':
    				$('#alipay').val(val.amount);
    				$('#deductionRemark').val(val.remark);
    				break;
    			case '5':
    				$('#coupons').val(val.amount);
    				$('#deductionRemark').val(val.remark);
    				break;
    			case '6':
    				$('#memberAmount').val(val.amount);
    				$('#deductionRemark').val(val.remark);
    				break;
    			case '7':
    				$('#deductionMoney').val(val.amount);
    				$('#deductionRemark').val(val.remark);
    				break;
    			}
    		})
    		thisTimesettleTotal()
    		//POS机
    		$('#pos').focus(function () {
	            $("#myModal_pos").modal('show');
	            $.each(collectionDetails,function(i,val){
	            	if(val.accountType==2){
	            		$('.posAccountId').each(function(j,value){
	            			if(val.accountId==$(this).val()){
	            				$(this).closest('tr').find('.posAccount').val(val.amount)
	            			}
	    				})
	            	}
	            })
	        });
	        //促销券
	        var coupons=$('#coupons');
	        coupons.focus(function () {
	            $("#myModal_coupons").modal('show');
	        });
	        $("#settle_availableIntegral").html('');//可用积分
//			$('#arrivalStandard').html(Number($('#dScore').val())+':'+Number($('#dAmount').val()));//积分：金额
	        $('#arrivalStandard').html('');//积分：金额
			$('#settle_storedValue').html('');//储值余额
    	}else{
    		if(($.trim($('#customerName').val())==''&&$.trim($('#customerTel').val())!='')||($.trim($('#customerName').val())!=''&&$.trim($('#customerTel').val())=='')){
    			$.zxsaas_plus.showalert('warning','姓名电话必须同时填写或者同时不填写！');
    			return false;
    		}
    		$('#addAdminForm').bootstrapValidator('resetForm', false);//为true时清空表单内容
        	$('#addAdminForm').data('bootstrapValidator').validate();
            if (!$('#addAdminForm').data('bootstrapValidator').isValid()) {
            	$.zxsaas_plus.showalert('warning','验证不通过');
                return false;
            }else{
            	$('.rb_proNameId').each(function(i,val){
            		if($(this).val()==''){
            			if($('#rb_table').find('.rb_tbody').length==1){
            				if($('.rb_proNameId:eq(0)').val()==''||($('.rb_proPrice:eq(0)').val()==''||$('.rb_proPrice:eq(0)').val()==0)){
            		    		canSettle=false;
            		    		return false
            		    	}else{
            		    		canSettle=true
            		    	}
            				return false
            			}else{
            				$(this).closest('tbody').remove();
            				orderBy();totalCal();receivableTotal();
            			}
            		}else{
            			if($(this).closest('tbody').find('.rb_proPrice').val()==''||$(this).closest('tbody').find('.rb_proPrice').val()==0){
            				if($(this).closest('tbody').find('.giftFlag').val()==1){
            					canSettle=true;
            				}else{
            					var n=Number(i)+1;
                				$.zxsaas_plus.showalert('warning','序号'+n+'商品无金额');
                				canSettle=false;
                				return false
            				}
            			}else{
            				canSettle=true;
            			}
            		}
            	})
            	var qqq=false;
            	if(canSettle){
            		qqq=true;
            	}else{
            		if(Number($('#tempOprAmount').val())!=0){
            			qqq=true;
            		}else{
            			$.zxsaas_plus.showalert('warning','商品信息未填写完整或者商品为空且没有运营商业务！');
            			qqq=false;
            		}
            	}
            	if(qqq){
            		var shouldBeCount=Number($('#receivableTotal').val())-Number($('#retailDeposit').val())-Number($('#receivableIgnore').val());
                	if(shouldBeCount>=0){
                		myModal_settle.modal('show');
            			// 获取并加载可使用资金账户
            			$.request({
            				type: 'Post',
            				url: basePath + '/retail/deposit/findAccountList',
            				data: {
            					sectionId : $("#sectionId").val()
            				},
            				dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
            				success: function (data) {
            					$('#cash,#pos,#alipay,#weixin,#coupons,#memberAmount,#deductionMoney,#deductionScore').val('').prop('disabled',true);
            					var res=data.data.accountList;
            					var _html;
            					for(var i=0;i<res.length;i++){
            						if(res[i].accountType==1){
            							$('#cash').prop('disabled',false)
            							$('#cash').closest('tr').find('.tb_se_accountId').val(res[i].accountId)
            							$('#cash').closest('tr').find('.tb_se_accountType').val(res[i].accountType)
            						}else if(res[i].accountType==2){
            							_html+='<tr><td>'+res[i].accountName+'</td><td><input class="posAccount" type="text" value=""><input class="posAccountId" type="hidden" value="'+res[i].accountId+'"><input class="posAccountType" type="hidden" value="'+res[i].accountType+'"></td></tr>'
            							$('#pos').prop('disabled',false)
            							$('#pos').closest('tr').find('.tb_se_accountType').val(res[i].accountType)
            						}else if(res[i].accountType==3){
            							$('#weixin').prop('disabled',false)
            							$('#weixin').closest('tr').find('.tb_se_accountId').val(res[i].accountId)
            							$('#weixin').closest('tr').find('.tb_se_accountType').val(res[i].accountType)
            						}else if(res[i].accountType==4){
            							$('#alipay').prop('disabled',false)
            							$('#alipay').closest('tr').find('.tb_se_accountId').val(res[i].accountId)
            							$('#alipay').closest('tr').find('.tb_se_accountType').val(res[i].accountType)
            						}else if(res[i].accountType==5){
            							$('#coupons').prop('disabled',false)
            						}else if(res[i].accountType==6&&$('#cardTypeId').val()!=''){
            							$('#memberAmount').prop('disabled',false)
            							$('#memberAmount').closest('tr').find('.tb_se_accountId').val(res[i].accountId)
            							$('#memberAmount').closest('tr').find('.tb_se_accountType').val(res[i].accountType)
            						}else if(res[i].accountType==7&&$('#cardTypeId').val()!=''){
            							$('#deductionMoney').prop('disabled',false);
            							$('#deductionMoney').closest('tr').find('.tb_se_accountId').val(res[i].accountId)
            							$('#deductionMoney').closest('tr').find('.tb_se_accountType').val(res[i].accountType)
            							$('#deductionScore').prop('disabled',false)
            						}
            					}
            					$('#table_pos tbody').html(_html);
            					$('#settle_receivable').html((Number(shouldBeCount).toFixed(2)));//应收金额
            					$('#settle_thisTime').html('');//本次结算
            					$('#settle_balance').html((Number(shouldBeCount).toFixed(2)));//应收余额
            					$("#settle_availableIntegral").html($('#CurrentIntegration').val());//可用积分
            					$('#arrivalStandard').html(Number($('#dScore').val())+':'+Number($('#dAmount').val()));//积分：金额
            					$('#settle_storedValue').html($('#CurrentBalance').val());//储值余额
            				},
            				error: function () {
            					alert("资金账户加载失败！");
            				}
            			});
            	        //POS机
            	        var pos=$('#pos');
            	        pos.focus(function () {
            	            $("#myModal_pos").modal('show');
            	        });
            	        $('#myModal_pos').on('hidden.bs.modal',function(){
            	        	var tol=0;
            	        	$('.posAccount').each(function(i,val){
            	        		tol+=Number($(this).val());
            	        	})
            	        	$('#pos').val(tol);
            	        	thisTimesettleTotal();
            	        })
            	        //促销券
            	        var coupons=$('#coupons');
            	        coupons.focus(function () {
            	            $("#myModal_coupons").modal('show');
            	        });
                	}else{
                		$.zxsaas_plus.showalert('warning','定金结余大于应收合计或者抹零过大，不允许结算');
                		return false
                	}
            	}
            }
    	}
    });
    //结算框输入限制
    $("#table_settle tbody tr").find('td:eq(1) input').keyup(function(){
    	$(this).val(($(this).val().replace(/[^0-9.]/g,'')));//只允许数字小数点输入
    });
    $(document).on('keyup','#table_pos input',function(){
    	$(this).val(($(this).val().replace(/[^0-9.]/g,'')));//只允许数字小数点输入
    })
    $("#table_settle tbody tr").find('td:eq(1) input').focusout(function(){
    	$(this).val(Number($(this).val()));
    	if(isNaN($(this).val())){
    		$(this).val(0)
    	}
    	$(this).val(Math.round(Number($(this).val())*100)/100);
    	thisTimesettleTotal()
    });
    $(document).on('focusout','#table_pos input',function(){
    	$(this).val(Number($(this).val()));
    	if(isNaN($(this).val())){
    		$(this).val(0)
    	}
    	$(this).val(Math.round(Number($(this).val())*100)/100);
    	thisTimesettleTotal()
    })
    //储值余额
    $('#memberAmount').keyup(function(){
    	if(Number($(this).val())>Number($('#settle_storedValue').text())){
    		$(this).val(Number($('#settle_storedValue').text()))
    	}
    })
    //积分&余额
    $('#deductionMoney').keyup(function(){//余额
    	var bl=Number($('#dAmount').val())/Number($('#dScore').val());
    	if(Number($(this).val())>(Number($('#settle_availableIntegral').html())*bl)){
    		$(this).val(Number($('#settle_availableIntegral').html())*bl)
    	}
    	$('#deductionScore').val(Number($(this).val())/bl);
    });
    $("#deductionMoney").focusout(function(){
    	var bl=Number($('#dAmount').val())/Number($('#dScore').val());
    	$(this).val(parseInt($(this).val()));
    	$('#deductionScore').val(Number($(this).val())/bl);
    	thisTimesettleTotal();
    })
    $('#deductionScore').keyup(function(){//积分
    	var bl=Number($('#dAmount').val())/Number($('#dScore').val());
    	if(Number($(this).val())>Number($('#settle_availableIntegral').html())){
    		$(this).val(Number($('#settle_availableIntegral').html()))
    	}
    	$('#deductionMoney').val(Number($(this).val())*bl);
    })
    $("#deductionScore").focusout(function(){
    	var bl=Number($('#dAmount').val())/Number($('#dScore').val());
    	$('#deductionMoney').val(parseInt($('#deductionMoney').val()));
    	$('#deductionScore').val(Number($('#deductionMoney').val())/bl);
    	thisTimesettleTotal();
    })
    $('#table_settle').keyup(function(){
    	thisTimesettleTotal()
    })
    function thisTimesettleTotal(){//结算框计算
    	var  STol=Number($('#cash').val())+Number($('#pos').val())+Number($('#alipay').val())+Number($('#weixin').val())+Number($('#coupons').val())+Number($('#memberAmount').val())+Number($('#deductionMoney').val());
    	$('#settle_thisTime').html(Math.round(STol*100)/100);
    	$('#settle_balance').html(Math.round((Number($('#settle_receivable').html())-Number($('#settle_thisTime').html()))*100)/100);//应收余额
    }
    //结算按钮，整单提交
    $('#settle_sure').click(function(){
    	var cansettle=false;
    	if(Number($('#settle_balance').text())<0){
    		$.zxsaas_plus.showalert('warning','应收出错!');
    		cansettle=false;
    	}else if($('#settle_balance').text()>0){
    		if($('#customerName').val()==''||$('#customerTel').val()==''){
				$.zxsaas_plus.showalert('warning','此单存在欠款，客户姓名和联系方式不能为空！');
				cansettle=false;
			}else{
				$.zxsaas_plus.showconfirm('提示','此单还有'+$('#settle_balance').text()+'元未结算，是否确认结算？',function(){
					var obj=billData();
					obj.ifDisplay=0;
					$.request({
						async:false,
			    		type:'post',
			        	url:basePath+'/retail/billing/saveOrder',
			        	data:{
			    			"jsonData":JSON.stringify(obj)
			    		},
			        	dataType:'json',
			        	success:function(data){
			    			if(data.result==1){
			    				$('#myModal_settle').modal('hide');
			    				$.zxsaas_plus.showconfirmsure('提示','保存成功',function(){
			    					window.location.href=basePath+'/retail/billing/retailBillingMain';
			    				})
			    			}else if(data.desc=='单据过账成功，生成凭证失败'){
			    				$('#myModal_settle').modal('hide');
			    				$.zxsaas_plus.showconfirmsure('提示',data.desc,function(){
			    					window.location.href=basePath+'/retail/billing/retailBillingMain';
			    				})
			    			}else{
			    				$.zxsaas_plus.showalert('error',data.desc);
			    			}
			    		},
			    		error:function(){
			    			alert('请求失败！')
			    		}
			    	})
				},function(){
					cansettle=false;
				});
			}
    	}else{
    		cansettle=true;
    	}
    	if(cansettle){
    		var obj=billData();
    		obj.ifDisplay=0;
    		$.request({
    			async:false,
        		type:'post',
            	url:basePath+'/retail/billing/saveOrder',
            	data:{
        			"jsonData":JSON.stringify(obj)
        		},
            	dataType:'json',
            	success:function(data){
        			if(data.result==1){
        				$.zxsaas_plus.showconfirmsure('提示','保存成功',function(){
        					window.location.href=basePath+'/retail/billing/retailBillingMain';
        				})
        			}else if(data.desc=='单据过账成功，生成凭证失败'){
        				$.zxsaas_plus.showconfirmsure('提示',data.desc,function(){
        					window.location.href=basePath+'/retail/billing/retailBillingMain';
        				})
        			}else{
        				$.zxsaas_plus.showalert('error',data.desc);
        			}
        		},
        		error:function(){
        			alert('请求失败！')
        		}
        	})
    	}
    })

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    



    
    //单据data
    function billData(){
    	var billMain={};
    	if($('#DraftId').val()!=''){
    		billMain.id=$('#DraftId').val();//挂单ID
    	}
    	billMain.sectionId=$('#sectionId').val();//门店ID
    	billMain.salesmanId=$('#employeeId').val();//营业员ID
    	billMain.billsDate=$('#rb_date').val();//日期
    	if($('#rb_proPrice_total').text()!=''){
    		billMain.billsAmount=$('#rb_proPrice_total').text();//单据金额
    	}
    	if($('#settle_thisTime').text()!=''){
    		billMain.ssAmount=$('#settle_thisTime').text();//实收金额
    	}
    	if($('#settle_balance').text()!=''){
    		billMain.wsAmount=$('#settle_balance').text();//未收金额
    	}
    	billMain.billsTozero=$('#receivableIgnore').val();//应收抹零
    	if($('#memberId').val()!=''){
    		billMain.memberId=$('#memberId').val();//会员ID
    	}
    	if($('#customerName').val()!=''){
    		billMain.customName=$('#customerName').val();//客户姓名
    	}
    	if($('#customerTel').val()!=''){
    		billMain.telephone=$('#customerTel').val();//客户电话
    	}
    	if($('#shouldReceive').val()!=''){
    		billMain.serviceYsAmount=$('#shouldReceive').val();//增值服务应收
    	}
    	if($('#receivableTotal').val()!=''){
    		billMain.totalYsAmount=$('#receivableTotal').val();//应收合计
    	}
    	if($('#remarks').val()!=''){
    		billMain.remark=$('#remarks').val();//备注
    	}
    	if($('#table_operatorBusiness_data').val()!=''){
    		billMain.operatorList=new Array;
        	$.each(JSON.parse($('#table_operatorBusiness_data').val()),function(i,val){
        		billMain.operatorList[i]={};
        		billMain.operatorList[i].operatorId=val.select1;
        		billMain.operatorList[i].businessId=val.select2;
        		billMain.operatorList[i].czAmount=val.input1;
        		billMain.operatorList[i].ssAmount=val.input2;
        		billMain.operatorList[i].yjAmount=val.input3;
        		billMain.operatorList[i].imei=val.input4;
        		billMain.operatorList[i].phoneNum=val.input5;
        		billMain.operatorList[i].ywNo=val.input6;
        		billMain.operatorList[i].remark=val.input7;
        		for(var key in billMain.operatorList[i]){
        			if(billMain.operatorList[i][key]==''){
        				billMain.operatorList[i][key]=0
        			}
        		}
        	})
    	}
    	$('.rb_proNameId').each(function(i,val){
    		if($(this).val()==''){
    			if($('#rb_table').find('.rb_tbody').length==1){
    				return false
    			}else{
    				$(this).closest('tbody').remove();
    			}
    		}else{
    			billMain.goodsList=new Array;//商品
    	    	var len=$('#rb_table tbody').length;
    	    	$('#rb_table tbody:not(:last)').each(function(i,val){
    	    		billMain.goodsList[i]={};//行对象
    	    		billMain.goodsList[i].giftFlag=$(this).find('.giftFlag').val();//是否赠品
    	    		billMain.goodsList[i].goodsId=$(this).find('.rb_proNameId').val();//商品ID
    	    		if($(this).find('.rb_ifManageImei').val()!=''){
    	    			billMain.goodsList[i].ifManageImei=$(this).find('.rb_ifManageImei').val();//是否串号管理
    	    		}
    	    		if($(this).find('.rb_proSerialNumId').val()!=''){
    	    			billMain.goodsList[i].imei=$(this).find('.rb_proSerialNumId').val();//串号id
    	    		}
    	    		billMain.goodsList[i].auxiliaryImei='';//辅助串号
    	    		if($(this).find('.rb_proNum').val()!=''){
    	    			billMain.goodsList[i].goodsNum=$(this).find('.rb_proNum').val();//数量
    	    		}
    	    		if($(this).find('.rb_proPrice').val()!=''){
    	    			billMain.goodsList[i].amount=$(this).find('.rb_proPrice').val();//金额
    	    		}
    	    		billMain.goodsList[i].price=$(this).find('.rb_bPrice').val();//标价
    	    		billMain.goodsList[i].discount=$(this).find('.rb_discountRate').val();//折扣率
    	    		if($(this).find('.rb_discountPrice').val()!=''){
    	    			billMain.goodsList[i].discountPrice=$(this).find('.rb_discountPrice').val();//折后价
    	    		}
    	    		billMain.goodsList[i].cphoneFlag=$(this).find('.rb_isContract').val();//是否合约机
    	    		billMain.goodsList[i].storageId=$(this).find('.rb_storageId').val();//仓库ID
    	    		billMain.goodsList[i].remark='';//商品备注 空
    	    		if($('.rb_voucherData:eq('+i+')').val()!=''){
    	    			billMain.goodsList[i].thridTicket=new Array;//第三方抵扣Data
    	    			for(var j=0;j<JSON.parse($('.rb_voucherData:eq('+i+')').val()).length;j++){
    	        			billMain.goodsList[i].thridTicket[j]={};
    	        			if(JSON.parse($('.rb_voucherData:eq('+i+')').val())[j].rb_voucher_units!=''&&JSON.parse($('.rb_voucherData:eq('+i+')').val())[j].rb_voucher_units!='null'){
    	        				billMain.goodsList[i].thridTicket[j].contactUnitId=JSON.parse($('.rb_voucherData:eq('+i+')').val())[j].rb_voucher_units;
    	        			}
    	        			if(JSON.parse($('.rb_voucherData:eq('+i+')').val())[j].rb_voucher_name!=''&&JSON.parse($('.rb_voucherData:eq('+i+')').val())[j].rb_voucher_name!='null'&&JSON.parse($('.rb_voucherData:eq('+i+')').val())[j].rb_voucher_name!=null){
    	        				billMain.goodsList[i].thridTicket[j].couponId=JSON.parse($('.rb_voucherData:eq('+i+')').val())[j].rb_voucher_name;
    	        			}
    	        			if(JSON.parse($('.rb_voucherData:eq('+i+')').val())[j].rb_voucher_credit!=''){
    	        				billMain.goodsList[i].thridTicket[j].amount=JSON.parse($('.rb_voucherData:eq('+i+')').val())[j].rb_voucher_credit;
    	        			}
    	        			if(JSON.parse($('.rb_voucherData:eq('+i+')').val())[j].rb_voucher_num!=''){
    	        				billMain.goodsList[i].thridTicket[j].couponCode=JSON.parse($('.rb_voucherData:eq('+i+')').val())[j].rb_voucher_num;
    	        			}
    	        			if(JSON.parse($('.rb_voucherData:eq('+i+')').val())[j].rb_voucher_remark!=''){
    	        				billMain.goodsList[i].thridTicket[j].remark=JSON.parse($('.rb_voucherData:eq('+i+')').val())[j].rb_voucher_remark;
    	        			}
    	        		}
    	    		}
    	    		if($(this).find('.rb_stages_opt').val()!='null'){
    	    			billMain.goodsList[i].install={};//分期商
    	    			if($(this).find('.rb_stages_opt').val()!=''&&$(this).find('.rb_stages_opt').val()!=null){
    	    				billMain.goodsList[i].install.installmentId=$(this).find('.rb_stages_opt').val();//分期商ID
    	    			}
    	        		if($(this).find('.rb_StageNum').val()!=''){
    	        			billMain.goodsList[i].install.installmentCount=$(this).find('.rb_StageNum').val();//分期数
    	        		}
    	        		if($(this).find('.rb_proPrice').val()!=''){
    	        			billMain.goodsList[i].install.goodsAmount=$(this).find('.rb_proPrice').val();//金额
    	        		}
    	        		if($(this).find('.rb_downPayments').val()!=''){
    	        			billMain.goodsList[i].install.installmentPayment=$(this).find('.rb_downPayments').val();//首付
    	        		}
    	        		if($(this).find('.rb_stages_balance').val()!=''){
    	        			billMain.goodsList[i].install.installmentBalance=$(this).find('.rb_stages_balance').val();//余额
    	        		}
    	        		if($(this).find('.rb_stages_monthly').val()!=''){
    	        			billMain.goodsList[i].install.monthsPay=$(this).find('.rb_stages_monthly').val(); //月付
    	        		}
    	        		if($(this).find('.rb_stages_contract').val()!=''){
    	        			billMain.goodsList[i].install.htNo=$(this).find('.rb_stages_contract').val(); //合同号
    	        		}
    	        		if($(this).find('.rb_stages_remarks').val()){
    	        			billMain.goodsList[i].install.remark=$(this).find('.rb_stages_remarks').val(); //备注
    	        		}
    	    		}
    	    		if($(this).find('.rb_remark').val()){
    	    			billMain.goodsList[i].remark=$(this).find('.rb_remark').val();//商品备注
    	    		}
    	    	})
    		}
    	})
    	billMain.payList=new Array;//收款data
    	$('#table_settle tbody tr').each(function(i,val){
    		if($(this).find('.tb_se_accountType').val()==1&&$("#cash").val()!=''){
    			billMain.payList[i]={};
    			billMain.payList[i].accountId=$(this).find('.tb_se_accountId').val();
    			billMain.payList[i].accountType=$(this).find('.tb_se_accountType').val();
    			billMain.payList[i].payreceiptAmout=$("#cash").val();
    			billMain.payList[i].remark=$('#deductionRemark').val();
    		}else if($(this).find('.tb_se_accountType').val()==2&&$("#pos").val()!=''){//pos
    			billMain.payList[i]={};
    			billMain.payList[i].posList=new Array;
    			$('#table_pos tbody tr').each(function(k,val){
    				if($(this).find('.posAccount').val()!=''){
    					billMain.payList[i].posList[k]={};
        				billMain.payList[i].posList[k].accountId=$(this).find('.posAccountId').val();
        				billMain.payList[i].posList[k].accountType=$(this).find('.posAccountType').val();
        				billMain.payList[i].posList[k].payreceiptAmout=$(this).find('.posAccount').val();
        				billMain.payList[i].posList[k].remark=$('#deductionRemark').val();
    				}
    			})
    		}else if($(this).find('.tb_se_accountType').val()==3&&$("#weixin").val()!=''){
    			billMain.payList[i]={};
    			billMain.payList[i].accountId=$(this).find('.tb_se_accountId').val();
    			billMain.payList[i].accountType=$(this).find('.tb_se_accountType').val();
    			billMain.payList[i].payreceiptAmout=$("#weixin").val();
    			billMain.payList[i].remark=$('#deductionRemark').val();
    		}else if($(this).find('.tb_se_accountType').val()==4&&$("#alipay").val()!=''){
    			billMain.payList[i]={};
    			billMain.payList[i].accountId=$(this).find('.tb_se_accountId').val();
    			billMain.payList[i].accountType=$(this).find('.tb_se_accountType').val();
    			billMain.payList[i].payreceiptAmout=$("#alipay").val();
    			billMain.payList[i].remark=$('#deductionRemark').val();
    		}else if($(this).find('.tb_se_accountType').val()==5&&$("#coupons").val()!=''){//促销券
    			billMain.payList[i]={};
    			//促销券
    		}else if($(this).find('.tb_se_accountType').val()==6&&$("#memberAmount").val()!=''){
    			billMain.payList[i]={};
    			billMain.payList[i].accountId=$(this).find('.tb_se_accountId').val();
    			billMain.payList[i].accountType=$(this).find('.tb_se_accountType').val();
    			billMain.payList[i].payreceiptAmout=$("#memberAmount").val();
    			billMain.payList[i].remark=$('#deductionRemark').val();
    		}else if($(this).find('.tb_se_accountType').val()==7&&$("#deductionMoney").val()!=''){
    			billMain.payList[i]={};
    			billMain.payList[i].accountId=$(this).find('.tb_se_accountId').val();
    			billMain.payList[i].accountType=$(this).find('.tb_se_accountType').val();
    			billMain.payList[i].payreceiptAmout=$("#deductionMoney").val();
    			billMain.payList[i].remark=$('#deductionRemark').val();
    		}
    	})
		billMain.addServiceList=new Array;//增值服务
    	$('#table_serPur tbody tr').each(function(i,val){
    		if($(this).find('.rb_serPur_name').val()!='null'&&$(this).find('.rb_serPur_name').val()!=''){
    			billMain.addServiceList[i]={};
    			billMain.addServiceList[i].serviceId=$(this).find('.rb_serPur_name').val();//服务ID
    			if($(this).find('.rb_serPur_cardNum').text()!=''){
        			billMain.addServiceList[i].cardNo=$(this).find('.rb_serPur_cardNum').text();//会员卡号
        		}
        		if($(this).find('.rb_serPur_ProNameId').val()!=''){
        			billMain.addServiceList[i].goodsId=$(this).find('.rb_serPur_ProNameId').val();//商品ID
        		}
        		if($(this).find('.rb_serPur_NumId').val()!=null){
        			billMain.addServiceList[i].imei=$(this).find('.rb_serPur_NumId').val();//关联串号id
        		}
        		if($(this).find('.rb_serPur_color').text()!=''){
        			billMain.addServiceList[i].color=$(this).find('.rb_serPur_color').text();//颜色
        		}
        		if($(this).find('.rb_serPur_model').text()!=''){
        			billMain.addServiceList[i].model=$(this).find('.rb_serPur_model').text();//型号
        		}
        		if($(this).find('.rb_serPur_setPrice').text()!=''){
        			billMain.addServiceList[i].presetPrice=$(this).find('.rb_serPur_setPrice').text();//预售价
        		}
        		if($(this).find('.rb_serPur_vipPrice').text()!=''){
        			billMain.addServiceList[i].memberPrice=$(this).find('.rb_serPur_vipPrice').text();//会员价
        		}
        		if($(this).find('.rb_serPur_EFmonth').val()!=''){
        			billMain.addServiceList[i].serviceDue=$(this).find('.rb_serPur_EFmonth').val();//有效期限
        		}
        		if($(this).find('.rb_serPur_userNum').text()!=''){
        			billMain.addServiceList[i].enableTimes=$(this).find('.rb_serPur_userNum').text();//使用次数
        		}
        		if($(this).find('.rb_serPur_remark').text()!=null){
        			billMain.addServiceList[i].remark=$(this).find('.rb_serPur_remark').val();//备注
        		}
        		if($(this).find('.rb_serPur_Actual').text()!=null){
        			billMain.addServiceList[i].actualAmount=Number($(this).find('.rb_serPur_Actual').val());//实际收款
        		}
    		}
    	})
    	billMain.ifDisplay=$('#ifDraft').val();//是否挂单
    	if($('#retailDeposit').val()!=''){
    		billMain.retailDeposit=$('#retailDeposit').val();//零售定金
    	}
    	if($('#depositMainId').val()!=''){
    		billMain.depositMainId=$('#depositMainId').val();//引入定单ID
    		billMain.depositDetailList=new Array;
        	if($('#depositDetailList').val()!=''){
        		for(z=0;z<JSON.parse($('#depositDetailList').val()).length;z++){
            		billMain.depositDetailList[z]={};
            		billMain.depositDetailList[z].depositId=JSON.parse($('#depositDetailList').val())[z].depositId;//订单详情ID
            		billMain.depositDetailList[z].depositAmount=JSON.parse($('#depositDetailList').val())[z].depositAmount;//定金金额
            	}
        	}
    	}
    	return billMain;
    }
    //定金详情data
    function introDepositIdData(){
    	var depositDetailList=new Array;
    	var q=-1;
    	$('#table_introSingle tbody tr').each(function(i,val){
    		if($(this).find('.rb_check').prop('checked')==true){
    			q++;
    			depositDetailList[q]={};
    			depositDetailList[q].depositId=$(this).closest('tr').find('.rb_introDepositId').val();//定金单ID
    			depositDetailList[q].depositAmount=$(this).closest('tr').find('.rb_introTTD').val();//定金金额
    		}
    	})
    	return depositDetailList
    }
    //第三方抵扣data
    function thridTicketdata(){//整单
    	var thridTicket=new Array();
    	$('#rb_voucher tbody tr').each(function(i,val){
    		thridTicket[i]={};
    		thridTicket[i].contactUnitId=$(this).find('.rb_voucher_units').val();//往来单位id
    		thridTicket[i].couponId=$(this).find('.rb_voucher_name').val();//活动名称
    		thridTicket[i].amount=$(this).find('.rb_voucher_credit').val();//抵现金额
    		thridTicket[i].couponCode=$(this).find('.rb_voucher_num').val();//券编号
    		thridTicket[i].remark=$(this).find('.rb_voucher_remark').val();//备注
    	})
    	return thridTicket
    }
    function voucherTb(){//本单数据
    	var voucher=new Array();
    	$('#rb_voucher tbody tr').each(function(i,val){
    		voucher[i]={};
    		voucher[i].rb_voucher_units=$(this).find('.rb_voucher_units').val();//往来单位id
    		voucher[i].rb_voucher_name=$(this).find('.rb_voucher_name').val();//活动名称
    		voucher[i].rb_voucher_credit=$(this).find('.rb_voucher_credit').val();//抵现金额
    		voucher[i].rb_voucher_num=$(this).find('.rb_voucher_num').val();//券编号
    		voucher[i].rb_voucher_remark=$(this).find('.rb_voucher_remark').val();//备注
    	})
    	return voucher
    }
    
    function refresh(){//门店切换页面刷新
    	//引入定单
    	$('#table_introSingle').html('<thead><tr><td></td><td>零售定单编码</td><td>客户姓名</td><td>联系电话</td><td>商品名称</td>'+
                            '<td>型号</td><td>颜色</td><td>本次引入金额</td><td>定金</td><td>已核销金额</td><td>已退定金</td><td>定金结余</td><td>定单数量</td>'+
                            '<td>已核销数量</td><td>已退数量</td><td>数量结余</td><td>备注</td></tr></thead>'+
                            '<tbody><tr><td><input class="rb_check" type="checkbox"><input class="introCode" type="hidden"></td>'+
                            '<td class="rb_introOrderCode"></td><td class="rb_introName"></td>'+
                            '<td class="rb_introTel"></td><td class="rb_introProName"></td>'+
                            '<td class="rb_introModel"></td><td class="rb_introColor"></td>'+
                            '<td><input class="rb_introTTD" type="text"></td><td class="rb_introDeposit"></td>'+
                            '<td class="rb_introWriteOff"></td><td class="rb_introRetired"></td>'+
                            '<td class="rb_introBalance"></td><td class="rb_introOrderNum"></td>'+
                            '<td class="rb_introWriteOffNum"></td><td class="rb_introRetiredNum"></td>'+
                            '<td class="rb_introNumBalance"></td><td class="rb_introRemark"></td></tr></tbody>');
    	//服务
    	$('#table_serPur').html('<thead><tr><td>序号</td><td>操作</td>'+
                '<td>增值服务名称</td><td>生效日期</td><td>关联序号</td><td>有效期限</td><td>效期内使用次数</td><td>商品编码</td>'+
                '<td>商品名称</td><td>颜色</td><td>型号</td><td>手机串号</td><td>会员卡号</td><td>零售单号</td>'+
                '<td>预设售价</td><td>会员价</td><td>实际收款</td><td>备注</td><td>服务流水号</td></tr></thead><tbody><tr>'+
            '<td>1</td><td><span class="rb_serPur_add glyphicon glyphicon-plus"></span> <span class="rb_serPur_del glyphicon glyphicon-minus"></span>'+
            '</td><td><select name="" class="rb_serPur_name"></select><input class="rb_serPur_ID" type="hidden"><input class="rb_serPur_EFmonth" type="hidden"></td>'+
            '<td class="rb_serPur_date">默认单据</td><td><select name="" class="rb_serPur_ToIndex"></select></td>'+
            '<td class="rb_serPur_serviceDue"></td><td class="rb_serPur_userNum"></td><td class="rb_serPur_Code"></td>'+
            '<td><input class="rb_serPur_ProName" disabled=""><input class="rb_serPur_ProNameId" type="hidden">'+
            	'<button class="rb_serPur_ProNameBtn smBtn btn btn-default" disabled><span class="glyphicon glyphicon-plus"></span></button></td>'+
            '<td class="rb_serPur_color"></td><td class="rb_serPur_model"></td><td>'+
            	'<input class="rb_serPur_SerialNum" disabled type="text"><input class="rb_serPur_if" type="hidden"><input class="rb_serPur_NumId" type="hidden">'+
            '</td><td class="rb_serPur_cardNum"></td><td class="rb_serPur_retailNum"></td><td class="rb_serPur_setPrice"></td>'+
            '<td class="rb_serPur_vipPrice"></td><td><input class="rb_serPur_Actual" type="text"></td><td>'+
            	'<input class="rb_serPur_remark" maxlength="100" type="text"></td><td class="rb_serPur_serviceNum"></td></tr></tbody>');
    	addserviceRequest($('.rb_serPur_name'));
    	//主单运营商
    	$('#billshangId option[value=""]').prop('selected',true);
    	$('#billywId').html('').text('');
    	$('#billOperator_real_remark').val('');
    	//主表格
    	$('#rb_table').html('<thead><tr><td>序号</td><td>操作</td><td>赠品(Z)</td><td>商品名称(F3)</td><td>型号</td>'+
                '<td>颜色</td><td>串号(F2)</td><td>数量(S)</td><td>金额(E)</td><td>第三方抵扣</td>'+
                '<td colspan="2">价格售息</td><td colspan="2">分期信息</td> <td colspan="2">其他信息</td></tr>'+
                '</thead><tbody class="rb_tbody"><tr><td rowspan="3">1</td><td rowspan="3"><span class="rb_add glyphicon glyphicon-plus"></span> <span class="rb_del glyphicon glyphicon-minus"></span>'+
                '</td><td rowspan="3"><input class="rb_gift" type="checkbox" disabled><input class="giftFlag" type="hidden" value="0"></td>'+
                '<td rowspan="3"><input class="rb_proName" disabled type="text"><input class="rb_proNameId" type="hidden"><input class="rb_proCode" type="hidden">'+
                ' <button class="rb_proNameBtn smBtn btn btn-default"><span class="glyphicon glyphicon-plus"></span></button><input class="rb_proSerialNumId" type="hidden">'+
                '<input class="rb_ifManageImei" type="hidden"></td><td class="rb_proModel" rowspan="3"></td><td class="rb_proColor" rowspan="3"></td><td class="rb_proSerialNum" rowspan="3"></td>'+
                '<td rowspan="3"><input class="rb_proNum" type="text"></td> <td rowspan="3"><input class="rb_proPrice" type="text"></td><td rowspan="3">'+
                '<input class="rb_voucher" disabled type="text"><input class="rb_voucherData" type="hidden"><input class="thridTicketdata" type="hidden">'+
                ' <button class="voucherBtn smBtn btn btn-default"><span class="glyphicon glyphicon-plus"></span></button></td><td>标价</td><td><input class="rb_bPrice" type="text" disabled=""></td><td><a class="stages">分期商</a>'+
                '<input class="rb_stages_payments" type="hidden"><input class="rb_stages_balance" disabled type="hidden"><input class="rb_stages_monthly" disabled type="hidden"><input class="rb_stages_contract" type="hidden"/><input class="rb_stages_remarks" maxlength="100" type="hidden"></td>'+
                '<td><select name="" class="rb_stages_opt"></select></td><td>是否合约机</td><td><input class="rb_isContract" type="checkbox" value="0"></td></tr><tr>'+
                '<td>折扣率(Z)</td><td><input class="rb_discountRate" type="text" value="100">%</td><td>分期数</td><td><input type="text" class="rb_StageNum" disabled=""></td><td>'+
                '备注</td><td><input class="rb_remark" type="text"></td></tr><tr><td>折后价(J)</td>'+
                '<td><input class="rb_discountPrice" type="text"></td><td>首付</td><td><input class="rb_downPayments" type="text" disabled=""></td><td>仓库<input class="rb_storageId" type="hidden"></td>'+
                '<td class="rb_warehouse"></td></tr></tbody><tbody class="table_bottom"><tr><td colspan="8">合计</td><td id="rb_proPrice_total"></td><td id="rb_voucher_total"></td>'+
                '<td colspan="2">折扣合计：<span id="rb_discountPrice_total"></span></td><td colspan="2">首付合计：<span id="rb_downPayments_total"></span></td><td colspan="2"></td></tr></tbody>');
    	stagesRequest($('.rb_stages_opt'));
    	$('.mainL input').val('');
    	$('#table_increment').html('<thead><tr><td>序号</td><td>服务名称</td><td>关联串号</td><td>关联会员卡号</td><td>实际收款</td><td>备注</td></tr></thead>'+
    			'<tbody><tr><td class="increment_index"></td><td class="increment_serName"></td>'+
                '<input class="increment_serNameId" type="hidden"><td class="increment_toNum"></td>'+
                '<input class="increment_toNumId" type="hidden"><td class="increment_toCardNum"></td>'+
                '<input class="increment_toCardNumId" type="hidden"><td class="increment_Actual"></td>'+
                '<input class="increment_ActualId" type="hidden"><td class="increment_remark"></td>'+
                '<input class="increment_remarkId" type="hidden"></tr></tbody>');
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    function checkDoc(res){
    	isView=true;
    	collectionDetails=res.payRecieveDetailList;
    	for(var k in res){
    		if(res[k]==null){
    			res[k]=''
    		}
    	}
    	refresh();
    	BILLSID=res.id;
    	$('#billNum').val(res.billsCode);
    	$('#billNumId').val(BILLSID);
    	//门店、营业员、日期、运营商
    	$('#sectionId option[value='+res.sectionId+']').prop('selected',true);
    	$.request({
	        type: 'Post',
	        url: basePath + '/aboutPeople/interfaceSelfCompanyEmployees',
	        data: {
	    		sectionId : res.sectionId
	    	},
	        dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
	        success: function (data) {
	    		// 营业员
	    		$("#employeeId option").remove();
	    		$(data.data.empList).each(function(index,item){
	    			$("#employeeId").append("<option value='" + item.id + "'>" + item.name + "</opion>");
	    		});
	    		$('#employeeId option[value='+res.salesmanId+']').prop('selected',true);
	        },
	        error: function () {
	            alert("营业员加载失败！");
	        }
	    });
    	$("#rb_date").val(res.billsDate);
    	if(res.operatorList!=null){
    		var obj={};
    		$.each(res.operatorList,function(i,val){
    			obj[i]={};
    			obj[i].select1=val.operatorId;
    			obj[i].select2=val.businessId;
    			obj[i].input1=val.czAmount;
    			obj[i].input2=val.ssAmount;
    			obj[i].input3=val.yjAmount;
    			obj[i].input4=val.imei;
    			obj[i].input5=val.phoneNum;
    			obj[i].input6=val.ywNo;
    			obj[i].input7=val.remark;
    		})
    		$('#table_operatorBusiness_data').val(JSON.stringify(obj))
    	}
    	$('#billsStatus').val(res.billsStatus);
    	//会员
    	$('#cardNum').val(res.cardNum);
    	$('#cardTypeId').val(res.memberTypeId);//会员类型ID
    	$('#customerName').val(res.customerName);
    	$('#memberId').val(res.memberId);
    	$('#customerTel').val(res.customerTel);
    	$('#customerType').val(res.memberType);
    	$('#CurrentBalance').val(res.memberAmount);
    	$('#CurrentIntegration').val(res.memberScore);
    	$('#dAmount').val(res.dAmount);
    	$('#dScore').val(res.dScore);
    	//主输入项
    	$("#receivableTotal").val(res.totalYsAmount);
    	$("#shouldReceive").val(res.serviceYsAmount);
    	$("#retailDeposit").val(res.retailDeposit);
    	$("#receivableIgnore").val(res.billsTozero);
    	$('#uncollected').val(res.wsAmount);
    	$('#settle').val(res.ssAmount);
    	$("#remarks").val(res.remark);
    	//商品
    	var _html;
    	$.each(res.goodsList,function(i,val){
    		if(val.goodsNum==null){
    			val.goodsNum='';
    		}
    		if(val.amount==null){
    			val.amount='';
    		}
    		if(val.discount==null){
    			val.discount=''
    		}
    		if(val.discountPrice==null){
    			val.discountPrice='';
    		}
    		if(val.operator==null){
    			val.operator={};
    			val.operator.operatorId='';
    			val.operator.businessId='';
    			val.operator.remark='';
    			val.operator.operatorBusinessName='';
    		}
    		if(val.imei==null){
    			val.imei=''
    		}
    		if(val.install==null){
    			val.install={};
    			val.install.installmentId='';
    			val.install.installmentPayment='';
    			val.install.installmentBalance='';
    			val.install.monthsPay='';
    			val.install.remark='';
    			val.install.installmentCount='';
    		}
    		for(var i in val.install){
				if(val.install[i]==null){
					val.install[i]=''
				}
			}
    		for(var i in val){
    			if(val[i]==null){
    				val[i]=''
    			}
    		}
    		_html+='<tbody class="rb_tbody"><tr><td rowspan="3">1</td>'+
                '<td rowspan="3"><span class="rb_add glyphicon glyphicon-plus"></span> <span class="rb_del glyphicon glyphicon-minus"></span>'+
                '<td rowspan="3"><input class="rb_gift" type="checkbox" disabled><input class="giftFlag" type="hidden" value="'+val.giftFlag+'"></td>'+
                '<td rowspan="3">'+
                    '<input class="rb_proName" disabled type="text" value="'+val.name+'">'+
                    '<input class="rb_proNameId" type="hidden" value="'+val.goodsId+'">'+
                    '<input class="rb_proCode" type="hidden" value="'+val.code+'">'+
                    ' <button class="rb_proNameBtn smBtn btn btn-default"><span class="glyphicon glyphicon-plus"></span></button>'+
                    '<input class="rb_proSerialNumId" type="hidden" value="'+val.imei+'">'+
                    '<input class="rb_ifManageImei" type="hidden" value="'+val.ifManageImei+'">'+
                '</td>'+
                '<td class="rb_proModel" rowspan="3">'+val.models+'</td>'+
                '<td class="rb_proColor" rowspan="3">'+val.color+'</td>'+
                '<td class="rb_proSerialNum" rowspan="3">'+val.imeiStr+'</td>'+
                '<td rowspan="3"><input class="rb_proNum" type="text" value="'+val.goodsNum+'"></td> '+
                '<td rowspan="3"><input class="rb_proPrice" type="text" value="'+val.amount+'"></td>'+
                '<td rowspan="3">'+
                    '<input class="rb_voucher" disabled type="text" value="'+val.totalThridTicketAmount+'">'+
                    '<input class="rb_voucherData" type="hidden">'+
                    '<input class="thridTicketdata" type="hidden">'+
                    ' <button class="voucherBtn smBtn btn btn-default"><span class="glyphicon glyphicon-plus"></span></button>'+
                '</td>'+
                '<td>标价</td>'+
                '<td><input class="rb_bPrice" type="text" disabled value="'+val.price+'"></td>'+
                '<td>'+
                	'<a class="stages">分期商</a>'+
                	'<input class="rb_stages_payments" type="hidden" value="'+val.install.installmentPayment+'">'+
                	'<input class="rb_stages_balance" disabled type="hidden" value="'+val.install.installmentBalance+'">'+
                	'<input class="rb_stages_monthly" disabled type="hidden" value="'+val.install.monthsPay+'">'+
                	'<input class="rb_stages_contract" disabled type="hidden" value="'+val.install.htNo+'">'+
                	'<input class="rb_stages_remarks" maxlength="100" type="hidden" value="'+val.install.remark+'">'+
                '</td>'+
                '<td><select name="" class="rb_stages_opt"></select></td>'+
                '<td>是否合约机</td>'+
                '<td><input class="rb_isContract" type="checkbox" value="'+val.cphoneFlag+'"></td>'+
            '</tr>'+
            '<tr>'+
                '<td>折扣率(Z)</td>'+
                '<td><input class="rb_discountRate" type="text" value="'+val.discount+'">%</td>'+
                '<td>分期数</td>'+
                '<td><input type="text" class="rb_StageNum" disabled="" value="'+val.install.installmentCount+'"></td>'+
                '<td>备注</td>'+
                '<td><input class="rb_remark" type="text" value="'+val.remark+'"></td>'+
            '</tr>'+
            '<tr>'+
                '<td>折后价(J)</td>'+
                '<td><input class="rb_discountPrice" type="text" value="'+val.discountPrice+'"></td>'+
                '<td>首付</td>'+
                '<td><input class="rb_downPayments" type="text" disabled="" value="'+val.install.installmentPayment+'"></td>'+
                '<td>仓库<input class="rb_storageId" type="hidden" value="'+val.storageId+'"></td>'+
                '<td class="rb_warehouse">'+val.storageName+'</td>'+
            '</tr>'+
            '</tbody>';
    	})
    	var thead='<thead><tr><td>序号</td><td>操作</td>'+
            '<td>赠品(Z)</td><td>商品名称(F3)</td><td>型号</td>'+
            '<td>颜色</td><td>串号(F2)</td><td>数量(S)</td>'+
            '<td>金额(E)</td><td>第三方抵扣</td>'+
            '<td colspan="2">价格售息</td>'+
            '<td colspan="2">分期信息</td>'+
            '<td colspan="2">其他信息</td></tr></thead>';
    	var tfoot='<tbody class="table_bottom"><tr>'+
                '<td colspan="8">合计</td><td id="rb_proPrice_total">0</td><td id="rb_voucher_total">0</td>'+
                '<td colspan="2">折扣合计：<span id="rb_discountPrice_total">0</span></td>'+
                '<td colspan="2">首付合计：<span id="rb_downPayments_total">123</span></td>'+
                '<td colspan="2"></td></tr></tbody>';
    	$('#rb_table').html(thead+_html+tfoot);
    	orderBy();
        totalCal();
        //是否赠品
        $('.giftFlag').each(function(i,val){
        	if($(this).val()==1){
        		$(this).prev('.rb_gift').prop('checked',true);
        	}
        })
        //是否合约机
        $('.rb_isContract').each(function(i,val){
        	if($(this).val()==1){
        		$(this).prop('checked',true);
        	}
        })
    	//商品分期商
    	$.request({
        	type:'post',
        	url:basePath+'/retail/billing/searchInstallment',
        	dataType:'json',
        	success:function(data){
        		var stagesJson=data.data.installmentList;
        		var temp_html_stages;
    			$.each(stagesJson, function (i) {
                    temp_html_stages+='<option value="'+stagesJson[i].code+'">'+stagesJson[i].name+'</option>';
                });
                $('.rb_stages_opt').html(temp_html_stages);
                $.each(res.goodsList,function(i,val){
                	if(val.install.installmentId!=''){
                		$('.rb_stages_opt:eq('+i+') option[value='+val.install.installmentId+']').prop('selected',true).prop('disabled',true);
                		$('.rb_stages_opt:eq('+i+')').closest('tbody').find('.rb_StageNum').prop('disabled',true);
                		$('.rb_stages_opt:eq('+i+')').closest('tbody').find('.rb_downPayments').prop('disabled',true);
                	}
            	})
    		},
    		error:function(){
    			alert('分期商初始化失败！')
    		}
        })
        //第三方抵扣
        $.each(res.goodsList,function(j,vall){
        	if(vall.thridTicket.length){
        		var voucher=new Array;
        		var thridTicket=new Array();
        		$.each(vall.thridTicket,function(i,val){
	        		for(var k in val){
	        			if(val[k]==null)val[k]='';
	        		}
	        		voucher[i]={};
	        		voucher[i].rb_voucher_units=val.contactUnitId;//往来单位id
		    		voucher[i].rb_voucher_name=val.couponId;//券ID
		    		voucher[i].rb_voucher_credit=val.amount;//抵现金额
		    		voucher[i].rb_voucher_num=val.couponCode;//券编号
		    		voucher[i].rb_voucher_remark=val.remark;//备注
		    		thridTicket[i]={};
	        		thridTicket[i].contactUnitId=val.contactUnitId;//往来单位id
	        		thridTicket[i].couponId=val.couponId;//券ID
	        		thridTicket[i].amount=val.amount;//抵现金额
	        		thridTicket[i].couponCode=val.couponCode;//券编号
	        		thridTicket[i].remark=val.remark;//备注
	        	})
	        	$('.rb_voucherData:eq('+j+')').val(JSON.stringify(voucher))
	        	$('.thridTicketdata:eq('+j+')').val(JSON.stringify(thridTicket))
        	}
        });
        //服务
        var serHtml;
        $.each(res.addServiceList,function(i,val){
        	for(var key in val){
        		if(val[key]==null){
        			val[key]='';
        		}
        	}
        	serHtml+='<tr><td>1</td><td><span class="rb_serPur_add glyphicon glyphicon-plus"></span> <span class="rb_serPur_del glyphicon glyphicon-minus"></span></td>'+
    		'<td><select name="" class="rb_serPur_name"></select><input class="rb_serPur_ID" type="hidden" value="'+val.serviceId+'"><input class="rb_serPur_EFmonth" type="hidden" value="'+val.serviceDue+'"/></td>'+
    		'<td>'+val.effectDateString+'</td><td><select name="" class="rb_serPur_ToIndex"></select></td><td class="rb_serPur_serviceDue">'+val.invalidDateString+'</td>'+
    		'<td class="rb_serPur_userNum">'+val.usedTimes+'</td><td class="rb_serPur_Code">'+val.goodsCode+'</td>'+
    		'<td><input class="rb_serPur_ProName" disabled="" value="'+val.goodsName+'"> <input class="rb_serPur_ProNameId" type="hidden" value="'+val.goodsId+'">'+
    		'<button class="rb_serPur_ProNameBtn smBtn btn btn-default" disabled><span class="glyphicon glyphicon-plus"></span></button></td>'+
    		'<td class="rb_serPur_color">'+val.color+'</td><td class="rb_serPur_model">'+val.model+'</td>'+
    		'<td><input class="rb_serPur_SerialNum" disabled type="text" value="'+val.imeiStr+'"><input class="rb_serPur_if" type="hidden" value="'+val.ifManageIMei+'">'+
    		'<input class="rb_serPur_NumId" type="hidden" value=""></td><td class="rb_serPur_cardNum">'+val.cardNo+'</td>'+
    		'<td class="rb_serPur_retailNum"></td><td class="rb_serPur_setPrice">'+val.presetPrice+'</td><td class="rb_serPur_vipPrice">'+val.memberPrice+'</td>'+
    		'<td><input class="rb_serPur_Actual" type="text" value="'+val.actualAmount+'"></td><td><input class="rb_serPur_remark" maxlength="100" type="text" value="'+val.remark+'"></td>'+
    		'<td class="rb_serPur_serviceNum">'+val.serviceInstanceNo+'</td></tr>';
        })
        $('#table_serPur tbody').html(serHtml);
        $.request({
        	type:'post',
        	url:basePath+'/retail/billing/searchAddService',
        	dataType:'json',
        	success:function(data){
        		var serPur=data.data.addServiceList;
        		var html;
        		$.each(serPur,function(i,val){
        			html+='<option value="'+val.id+'">'+val.name+'</option>'
        		})
        		$('.rb_serPur_name').html(html);
        		$.each(res.addServiceList,function(i,val){
        			$('.rb_serPur_name:eq('+i+') option[value='+val.serviceId+']').prop('selected',true);
        		})
    		},
    		error:function(){
    			alert('请求失败！')
    		}
        })
        orderByaddservice()
        //引入定单
        if(res.depositDetailList!=null&&res.depositDetailList!=''){
        	if(res.depositDetailList.length!=0){
            	var depositDetailList=new Array;
                $.each(res.depositDetailList,function(i,val){
                	depositDetailList[i]={};
                	depositDetailList[i].depositId=val.depositId;
            		depositDetailList[i].depositAmount=val.depositAmount;
        		});
        		$('#depositDetailList').val(JSON.stringify(depositDetailList));
            }
        }
        $('#depositMainId').val(res.depositMainId);
        
		$('.container-lg input,.container-lg select,.container-lg button').prop('disabled',true);
		$('.btn-group button').prop('disabled',false);
		$('#hangSingle,#transferSingle').prop('disabled',true);
		$('.rb_add,.rb_del,.rb_serPur_add,.rb_serPur_del').css('display','none');
		$('#serPur_sure,#operatorBusiness_cancel,#rb_mistake').prop('disabled',false);
		$('#myModal_mistake button').prop('disabled',false);
		$('#mistakeDate,#settleBtn').prop('disabled',false);
		if(res.billsStatus==7){
    		$('#copy').prop('disabled',true);
    		$('#redSign').show();
    		$('#rb_mistake').prop('disabled',true);
    	}else{
    		$('#copy').prop('disabled',false);
    		$('#redSign').hide();
    		$('#rb_mistake').prop('disabled',false);
    	}
		$('#stages_cancel,#settle_cancel,#pos_sure,#introSingle_cancel').prop('disabled',false);
    }
    $('#rb_mistake').click(function(){
    	$('#myModal_mistake').modal('show');
    	$("#mistakeDate").val($("#rb_date").val())
    	getAuthList(billMainRedDate)
		function billMainRedDate(){
			$("#mistakeDate").datetimepicker({
			lang:"ch",           //语言选择中文
			format:"Y-m-d",      //格式化日期
			timepicker:false,    //关闭时间选项
			todayButton:false,    //关闭选择今天按钮
			maxDate:_authList.maxDate,  //设置红冲最大时间
			minDate:$("#rb_date").val()
		});
		}
    })
    $('#mistake_sure').click(function(){
    	$.request({
    		type:'post',
        	url:basePath+'/retail/billing/redBillingOrder',
        	data:{
    			billsId:$('#billNumId').val(),
    			redDate:$('#mistakeDate').val()
    		},
        	dataType:'json',
        	success:function(data){
				if(data.result==1){
					$.zxsaas_plus.showconfirmsure('提示','红冲成功!',function(){
						$('#newSingle').click()
					});
				}else{
					$.zxsaas_plus.showalert('error',data.desc);
				}
    		},
    		error:function(){
    			alert('请求失败！')
    		}
    	})
    })
//验证
    //客户姓名联系电话
    $('#addAdminForm').bootstrapValidator({
    	 message: 'This value is not valid',
         feedbackIcons: {
             valid: 'glyphicon glyphicon-ok',
             invalid: 'glyphicon glyphicon-remove',
             validating: 'glyphicon glyphicon-refresh'
         },
         fields:{
        	 customerName:{
        	 	validators: {
//		        	 notEmpty: {
//			             message: '不能为空'
//			         },
		             stringLength: {
		            	 min: 2,
		            	 max: 15,
		            	 message: '2-15位'
		             },
		             regexp: {
		            	 regexp: /^[a-zA-Z0-9\u4E00-\u9FA5]+$/,
		            	 message: '不允许特殊符号'
		             },
	         	},
         	},
         	customerTel:{
	        	 validators: {
//	         		notEmpty: {
//		                message: '不能为空'
//		            },
		             regexp: {
		            	 regexp: /^1(3|4|5|7|8)\d{9}$/,
		            	 message: '手机号码格式错误'
		             },
	         	}
        	}
         }
    })
    $('#rb_superInput').focus()
})


  //******************** 打印  **********************//
  function printFunction(){
  	var id = $('#billNumId').val();
  	if(id==""){
		$.zxsaas_plus.showalert("提示","请选择一张单据");
		return;
	}
  	$.printBills(basePath + '/retail/print/kaidan',{billsId:id});
  }
