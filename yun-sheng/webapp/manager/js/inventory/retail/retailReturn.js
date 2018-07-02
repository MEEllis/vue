//	定义仓库接收变量
	var inStorageOption = "";
$(function(){
	$('#storeInput').storePlu({
		search:false,
		gridId:'zxc3',
		treeId:'zxc4',
		saleManId:'saleInput',
		changeStore:resetRetailBills,// 改变门店时的回调函数
		getFundAccount:storeIdCallBack// 初始化时根据门店获取资金账户
	})
	$('#saleInput').storeSales({
		search:false,
		sectionId:'storeInput',
		salesPersonName:'.saleInput1,.carrSaleInput1,.thirdSaleInput1,.stagingSaleInput1'
	})
	$("#retailCardNum").vipPlu({
		gridLocation:'left',
        defaultBtnText:"会员刷卡",
		changeVip:findVip
	})
	$('#startTime').datePlu({
		dateEnd:'#endTime',
		endDate:true,
		minTime: "1970-01-01",
		ifPermissions:false
	})
	$('#origstore').storePlu({
		checkMore: false,
		search: false,
		gridId:'zxc1',
		treeId:'zxc2'
	})
    //输入框得到焦点时
    $("input").on('focus',function(){
        this.select()
    })

    //往来单位
    $('#contactsunitId').contactUnitPlu({
        search:false,
    });

    $('#contactsunitId').val(unitName).data('contactUnitId',unitId);

	function findVip(data){
		if($("#retailCardNum").data("vipId")!=null&&$("#retailCardNum").data("vipId")!=undefined&&$("#retailCardNum").data("vipId")!=""){
			if(data!=undefined){
				if(data.isAmount==1){
					$("#memberStoredValue").val(0);
					$("#memberStoredValue").removeAttr("disabled");	
				}else{
					$("#memberStoredValue").val(0);
					$("#memberStoredValue").attr("disabled","disabled")
				}
			   if(data.isScore==1){
				   $("#pointArrived").val(0);
				   $("#pointArrived").removeAttr("disabled");
			   }else{
				   $("#pointArrived").val(0);
				   $("#pointArrived").attr("disabled","disabled")
			   }
			
			}else{
				$("#memberStoredValue").val(0);
				$("#pointArrived").val(0);
				$("#memberStoredValue").attr("disabled","disabled")
				$("#pointArrived").attr("disabled","disabled")
			}
		}
		$("#Value-addedTable tbody tr").each(function(){
			if($(this).attr("id")!="addValueService_1"){
				$(this).remove();
			}else{
				clearAddValueData("#addValueService_1")
			}
		})
//		临时暂用
		$("#memberStoredValue").attr("disabled","disabled");
		$("#pointArrived").attr("disabled","disabled");
	}
	$(document).on("blur","#memberStoredValue",function(){
		if(Number($(this).val())>Number($("#vipAmount").val())){
			$(this).val(0);
			$.zxsaas_plus.showalert('提示','会员储值金额不能大于储值金额');
			return;
		}
	})
    //第三方抵扣:退回金额
    $(document).on("blur",".inputthirdReturnAmount",function(){
        var $this=$(this);
        var $obj=$this.closest('tr').find('.settleAmountInput');
        if(Number($obj.val())==0){
            $obj.val($this.val())
        }
    })
	function initAddValueDate(addValueRowId){           // 初始化生效日期
		$(addValueRowId).datetimepicker({
	        lang: "ch",           // 语言选择中文
	        format: "Y-m-d",      // 格式化日期
	        timepicker: false,    // 关闭时间选项
	        todayButton: false,    // 关闭选择今天按钮
	        value:new Date(),
	    })             
	}
	
	function storeIdCallBack(returnStoreId){
		abledUseAccount(returnStoreId)
		instorage(returnStoreId)
	}
	$("#wipingAmount").val(0);
	$("#retailAmount").val(0);
	$("#posAmount").val(0);
	$("#alipayAmount").val(0);
	$("#microLetterAmount").val(0);
	$("#otherAccount").val(0);
	$("#promotionalCoupons").val(0);
	$("#memberStoredValue").val(0);
	$("#pointArrived").val(0);
	$("#StaBuTable tfoot tr td:eq(5)").text(0);
	$("#dateInput").datePlu({
		endDate:false
	})

	contractMac()// 合约机
	searchStagingUnit()// 分期商名称
	searchCarrBusinUnit()// 运营商往来单位
	thirdDiscountUnit()// 第三方抵扣往来单位
	panelShow("#carrierImg",".carrBusin");// 运营商业务面板收缩展开
	/*
	 * panelShow("#Value-addedImg",".Value-added");//增值服务面板收缩展开
	 */	panelShow("#discountImg",".Discount");// 第三方抵扣面板收缩展开
	panelShow("#StaBusinessImg",".StaBu");// 分期业务面板收缩展开
	// 新开单
	$("#newBills").click(function(){
		window.location.href = '/manager/inventory/retail/returnGoods/main';
	})
	
	// 入库仓库
	function instorage(returnStoreId){
		$.request({
    		type:'POST',
    		async: false,
        	url:'/manager/component/storage/getStorageVoList',
        	dataType:'json',
        	data:{
			sectionId:returnStoreId
		},
        	success:function(data){
			 if(data.result==1){
				var inStorageList=data.data.storageVoList
				var inStorageListOpt = "";
				inStorageList.map(function(inStorageOpt,i){
				 inStorageListOpt+='<option value="'+inStorageOpt.storageId+'">'+inStorageOpt.name+'</option>'
				})
				$("#productInfoTable tr").find(".stroageSelect").html(inStorageListOpt)
				return inStorageOption=inStorageListOpt
			 }else{
				$.zxsaas_plus.showalert('error',data.desc); 
			 }
    		},
    		error:function(){
    			alert('请求失败！')
    		}
    	})
	}
	
	
	// 修改门店或者会员卡号时，清空页面的所有数据
	function resetRetailBills(){
		$("#productInfoTable tbody #addproductInfo_1").nextUntil("#addGifts_1").html(""),
		$("#productInfoTable tbody #addGifts_1").nextAll().remove(),
		$("#carrBusinTable tbody #carrBusinRowNum_1").nextAll().remove(),
		$("#Value-addedTable tbody #addValueService_1").nextAll().remove(),
		$("#DiscountTable tbody #thirdDisount_1").nextAll().remove(),
		$("#StaBuTable tbody #stagingRow_1").nextAll().remove(),
		clearProductInfo("#addproductInfo_1"),// 清空商品
		clearCarrData("#carrBusinRowNum_1"),// 清空运营商业务
		clearAddValueData("#addValueService_1"),// 清空增值服务业务
		clearDiscountData("#thirdDisount_1"),// 清空第三方抵扣业务
		clearStagingData("#stagingRow_1") ,// 清空分期业务
		$("#posTable tbody").children().remove(),// 清空资金账户
		$("#otherCounterTable tbody").children().remove(),// 清空其它资金账户
		$("#wipingAmount").val(0);
		$("#retailAmount").val(0);
		$("#posAmount").val(0);
		$("#alipayAmount").val(0);
		$("#microLetterAmount").val(0);
		$("#otherAccount").val(0);
		$("#promotionalCoupons").val(0);
		$("#memberStoredValue").val(0);
		$("#pointArrived").val(0);
		$("#dateInput").datePlu({
			endDate:false
		})
		$("#productInfoTable tfoot tr td:eq(5)").text(0)
		$("#productInfoTable tfoot tr td:eq(6)").text(0)
		$("#carrBusinTable #carrTotal_1").text(0)
		$("#carrBusinTable #carrTotal_2").text(0)
		$("#carrBusinTable #carrTotal_3").text(0)
		$("#carrBusinTable #carrTotal_4").text(0)
        $("#carrBusinTable #carrTotal_5").text(0)
		$("#Value-addedTable tfoot tr td:eq(3)").text(0)
		$("#Value-addedTable tfoot tr td:eq(5)").text(0)
		$("#DiscountTable tfoot tr td:eq(3)").text(0)
		$("#DiscountTable tfoot tr td:eq(4)").text(0)
		$("#StaBuTable tfoot tr td:eq(4)").text(0)
		$("#StaBuTable tfoot tr td:eq(5)").text(0)
		$("#StaBuTable tfoot tr td:eq(7)").text(0)
		$("#StaBuTable tfoot tr td:eq(8)").text(0)
		$("#StaBuTable tfoot tr td:eq(15)").text(0)
		$(".billsAmount").text(0);
		$(".shouldRdfunded").text(0);
		$(".originalSingleNum").text("");
		$(".originalSingleNumId").text('')
		$(".installMentLoad").text(0);
		$(".arrialAmount").text(0);
		$(".amountDue").text(0);
		$(".paidAmount").text(0);
		$(".arrears").text(0);
		$("#retailRemark").val("")
		$("#retailCardNum").data("vipId","")
		/* clearDepositBills(); */
		var data=$("#storeInput").data("sectionId")
		abledUseAccount(data)
		instorage(data)
	}
	// 新增商品
	$("#addProduct").click(function(){
		$("#myModal").modal('show')
		$(".sureButton").attr("id","productSure")
		getGoodsClass()
		$("#retailgridProduct").jqGrid('setGridParam', {
			url:'/manager/inventory/retail/returnGoods/page',
			datatype:'json',
			postData:{
				keyWord:"",
				page:1,
				rows:10,
			}
		}).trigger("reloadGrid");
		$("#retailgridProduct").resize();
	})
	// 查找商品
	$("#retailSearchProduct").bind('keyup',function(event){
		if($.trim($("#retailSearchProduct").val())){
			$("#retailgridProduct").jqGrid('setGridParam', {
				url:'/manager/inventory/retail/returnGoods/page',
				datatype:'json',
				postData:{
					keyWord:$("#retailSearchProduct").val(),
					page:1,
					rows:10,
				}
			}).trigger("reloadGrid");
		}
	})
	
// 修改商品
$(document).on('click','.editProduct',function(){
	$("#myModal").modal('show')
	$(".sureButton").attr("id","editproductSure")
	var productRowId=$(this).parent().parent().parent().attr("id")
	var sel = $(this).parent().parent().parent().find('.stroageSelect').val();
	$(".sureButton").attr("editRowIds",productRowId);
	$(".sureButton").attr("sel",sel);
// clearProductInfo("#"+productRowId);
	getGoodsClass()
	$("#retailgridProduct").jqGrid('setGridParam', {
		url:'/manager/inventory/retail/returnGoods/page',
		datatype:'json',
		postData:{
			keyWord:"",
			page:1,
			rows:10,
		}
	}).trigger("reloadGrid");
	$("#retailgridProduct").resize();
})

// 删除商品或赠品
$(document).on('click','.delProduct',function(){
	var delid = $(this).parent().find('.productRowNumber').text();
	resetAddValue(delid);
	if($(this).parent().hasClass("addGifts")){
		var ids = $(this).parent().attr('id').split('_');
		$(this).parent().remove()
		var idsnum = 1;
		$('.addGifts').each(function(i,item){
			var tid = $(item).attr('id').split('_')
			if($(item).hasClass("addGiftslastRow")){
				return false 
			}
			if(ids[1] == tid[1]){
				$(item).find('.productRowNumber').text(tid[1]+'.'+idsnum);
				$(item).attr('id','addGifts_'+tid[1]+'_'+idsnum);
				idsnum++;
			}
		})
		var productDiscountAmountSum=0
		$("#productInfoTable tbody tr").each(function(index,value){
			if($(this).find(".discountAmount").children().val()!=undefined){
				var inputDiscountCountAmount=Number($(this).find(".discountAmount").children().val())
				productDiscountAmountSum=Number(productDiscountAmountSum)+inputDiscountCountAmount
			}
		})
		$("#productInfoTable tfoot tr td:eq(8)").text(productDiscountAmountSum)
		countAmount(countAmountDue,countAmountOfArrears,true);
	}else if($(this).parent().hasClass("addproductInfo")){
		var productIds=$(this).parent().attr("id")
		var delProductIdsArry=productIds.split("_")
		var delIdsNum=delProductIdsArry[1];
        $('.addGifts').each(function(i,item){
			var tid = $(item).attr('id').split('_');
			if($(item).hasClass("addGiftslastRow")&&$('#addProduct').attr('disabled') == undefined && $('.addproductInfo').length == 1){
				return false 
			}
			if(delIdsNum == tid[1]){
				var deltid = $(item).find('.productRowNumber').text();
				resetAddValue(deltid);
				$(item).remove();
			}
		});
        
		if(delIdsNum!=undefined&&delIdsNum<$("#productInfoTable tbody").find(".addproductInfo").length){
			$(this).parent().remove();
		}else if(delIdsNum==$("#productInfoTable tbody").find(".addproductInfo").length&&$("#productInfoTable tbody").find(".addproductInfo").length!=1){
			$(this).parent().nextAll().remove();
			$(this).parent().remove();
		}else if($("#productInfoTable tbody").find(".addproductInfo").length==1){
			clearProductInfo("#addproductInfo_1")
			$("#productInfoTable tfoot tr td:eq(8)").text(0)
		}
		var productDiscountAmountSum=0
		$("#productInfoTable tbody tr").each(function(index,value){
			if($(this).find(".discountAmount").children().val()!=undefined){
			var inputDiscountCountAmount=Number($(this).find(".discountAmount").children().val())
			productDiscountAmountSum=Number(productDiscountAmountSum)+inputDiscountCountAmount
			}
		})
		$("#productInfoTable tfoot tr td:eq(8)").text(productDiscountAmountSum)
		countAmount(countAmountDue,countAmountOfArrears,true);
	}
	$("#productInfoTable tbody").find('.addproductInfo').each(function(index,value){
		$(this).find('.productRowNumber').text(index+1)
		$(this).attr("id","addproductInfo_"+(index+1));
		var productInfoId=$(this).attr("id");
		var productInfoIdArray=productInfoId.split("_");
		var resetProductNum=productInfoIdArray[1];
		if($(this).attr("id")!="addproductInfo_"+$("#productInfoTable tbody").find('.addproductInfo').length){
			$(this).nextUntil("#addproductInfo_"+(index+2)).find(".addGiftsButton").parent().parent().attr("id","addGifts_"+(index+1))
			var addgiftId=$(this).nextUntil("#addproductInfo_"+(index+2)).find(".addGiftsButton").parent().parent().attr("id")
			$(this).nextUntil("#"+addgiftId).each(function(index,value){
				$(this).attr("id",addgiftId+'_'+(index+1));
				$(this).find('.productRowNumber').text(resetProductNum+'.'+(index+1))
			})
			if($(this).nextUntil("#"+addgiftId).length==0){
				if($('#retailId').val() == ''){
					$("#addproductInfo_"+resetProductNum).find(".changeGift").removeAttr("disabled")
				}
			}
		}else if($(this).attr("id")=="addproductInfo_"+$("#productInfoTable tbody").find('.addproductInfo').length){
			$(this).nextAll().find(".addGiftsButton").parent().parent().attr("id","addGifts_"+(index+1))
			var lasProductId=$(this).nextAll().find(".addGiftsButton").parent().parent().attr("id")
			$(this).nextUntil("#"+lasProductId).each(function(index,value){
				$(this).attr("id",lasProductId+'_'+(index+1));
				$(this).find('.productRowNumber').text(resetProductNum+'.'+(index+1))
			})
			if($(this).nextUntil("#"+lasProductId).length==0 && $('#retailId').val() == ''){
				$("#addproductInfo_"+resetProductNum).find(".changeGift").removeAttr("disabled")
			}
		}
		countProductTotal()
		countProductReturnAmount()
	})
	
	countAddValueAmount()
	
	function resetAddValue(id){
		$("#Value-addedTable tbody .addValueSelectName").each(function(index,value){
			 var addValueProId=$(this).attr('orderno');
			 if(addValueProId == id){
				 var addid = $(this).parent().parent().attr('id');
				 if($("#Value-addedTable tbody tr").length>1){
					$('#'+addid).remove();
					$("#Value-addedTable tbody tr").each(function(index,value){
						 $(this).find(".valueRowNumber").text(index+1);
						 $(this).attr("id","addValueService_"+(index+1))
					 })
				 }else{
					clearAddValueData("#"+addid);
					$('.realPaymentInput,.valueRemark input').attr('disabled',true);
				 }
			 }
		})
	}
	
})
 // 新增赠品
	$(document).on('click','.addGiftsButton',function(){
		$("#myModal").modal('show')
		$(".sureButton").attr("id","giftSure")
		getGoodsClass()
		$("#retailgridProduct").jqGrid('setGridParam', {
			url:'/manager/inventory/retail/returnGoods/page',
			datatype:'json',
			postData:{
				keyWord:"",
				page:1,
				rows:10,
			}
		}).trigger("reloadGrid");
		var addGiftIds=$(this).parent().parent().attr("id")
		$(".sureButton").attr("giftIds",addGiftIds)
	})
	// 修改赠品
	$(document).on('click','.editGift',function(){
		$("#myModal").modal('show')
		$(".sureButton").attr("id","editGiftSure")
		var giftRowId=$(this).parent().parent().parent().attr("id")
		$(".sureButton").attr("editgiftRowIds",giftRowId)
		clearProductInfo("#"+giftRowId);
		getGoodsClass()
		$("#retailgridProduct").jqGrid('setGridParam', {
			url:'/manager/inventory/retail/returnGoods/page',
			datatype:'json',
			postData:{
				keyWord:"",
				page:1,
				rows:10,
			}
		}).trigger("reloadGrid");
	})
	// 商品转赠品或者赠品转商品
   var changeGiftHtml;
   var changeGiftId;
   var inputModel={
		   productName:"",
		   productCounter:"",
		   productImei:"",
		   productAuxiImei:"",
		   productReturnAmount:"",
		   productContractMac:"",
		   productStaging:"",
		   productSaleMan1:"",
		   productSaleMan1Id:"",
		   productSaleMan2:"",
		   productSaleMan2Id:"",
		   productRemark:""
   }
   var getGiftRow = $('.addGiftslastRow').clone();
	$(document).on('change','.changeGift',function(){
		spliceId=$(this).parent().parent().attr("id")
		if($("#"+spliceId).filter(".addproductInfo").length>0){
		    var spliceidsNumber = spliceId.split("_")[1];
		    $("#addValueService_"+spliceidsNumber).remove();
			if($(this).parent().parent().nextUntil("#addGifts_"+spliceidsNumber).length==0){
				if($(this).attr("checked")==true||$(this).attr("checked")=="checked"){
					$("#addGifts_"+spliceidsNumber).hide();
					$(this).parent().parent().find('.inputReturnProductPrice').val(0).attr('disabled',true);
					var productOption=[]
	       			var productSelectHtml
	       			$("#productInfoTable tbody").find(".addproductInfo").each(function(){
	       				var productNumber=$(this).find(".productRowNumber").text();
	       				var isChecked = $(this).find(".changeGift").is(':checked')
	       				if(spliceidsNumber&& productNumber!=spliceidsNumber&&!isChecked ){
	       					productOption.push(productNumber)
	       				}
	       			})
					if(productOption.length>0){
						productOption.map(function(value,index){
							productSelectHtml=productSelectHtml+'<option value="'+value+'">'+value+'</option>'
						})
						$("#RelatedProduct").modal('show')
						$("#relateedProductSelect").html(productSelectHtml)
						$("#notRelatedProduct").attr("productIds",spliceId)
					}
				}else{
					var goodsIds = $("#"+spliceId).find('.goodsIds').text();
					isEntryArr.splice((spliceidsNumber*1-1),0,goodsIds);
					$("#addGifts_"+spliceidsNumber).show();
					$(this).parent().parent().find('.inputReturnProductPrice').val(0).attr({disabled:false,readonly:false});
				}
				
				
				
				changeGiftHtml=$(this).parent().parent().html();
				inputModel.productName=$(this).parent().parent().find(".productInfo").find(".productInfoName").val();
				inputModel.productCounter=$(this).parent().parent().find(".productNumber").children().val();
				inputModel.productImei=$(this).parent().parent().find(".inputImeiInfo").val();
				inputModel.productAuxiImei=$(this).parent().parent().find(".inputAuxImeiInfo").val();
				inputModel.productReturnAmount=$(this).parent().parent().find(".inputReturnProductPrice").val();
				inputModel.productContractMac=$(this).parent().parent().find(".businessMac").children().val();
				inputModel.productStaging=$(this).parent().parent().find(".staging").children().attr("checked");
				inputModel.productSaleMan1=$(this).parent().parent().find(".saleInput1").val();
				inputModel.productSaleMan1Id=$(this).parent().parent().find(".saleInput1").data("employeeId");
				inputModel.productSaleMan2=$(this).parent().parent().find(".saleInput2").val();
				inputModel.productSaleMan2Id=$(this).parent().parent().find(".saleInput2").data("employeeId");
				inputModel.productRemark=$(this).parent().parent().find(".productRemark").children().val();
				$(this).parent().parent().find(".discountRate").children().removeAttr("disabled");
				$(this).parent().parent().find(".discountUnitPrice").children().removeAttr("disabled");
				$(this).parent().parent().find(".discountAmount").children().removeAttr("disabled");
				changeGiftIdNum=spliceidsNumber;
			}else{
				$("#addGifts_"+spliceidsNumber).after(getGiftRow);
				$("#addGifts_"+spliceidsNumber).attr('id','addproductInfo_'+spliceidsNumber);
				$("#addproductInfo_"+spliceidsNumber).next().attr('id','addGifts_'+spliceidsNumber);
			}
		}else{
			changeGiftHtml=$(this).parent().parent().html();
			inputModel.productName=$(this).parent().parent().find(".productInfo").find(".productInfoName").val();
			inputModel.productCounter=$(this).parent().parent().find(".productNumber").children().val();
			inputModel.productImei=$(this).parent().parent().find(".inputImeiInfo").val();
			inputModel.productAuxiImei=$(this).parent().parent().find(".inputAuxImeiInfo").val();
			inputModel.productReturnAmount=$(this).parent().parent().find(".inputReturnProductPrice").val();
			inputModel.productContractMac=$(this).parent().parent().find(".businessMac").children().val();
			inputModel.productStaging=$(this).parent().parent().find(".staging").children().attr("checked");
			inputModel.productSaleMan1=$(this).parent().parent().find(".saleInput1").val();
			inputModel.productSaleMan1Id=$(this).parent().parent().find(".saleInput1").data("employeeId");
			inputModel.productSaleMan2=$(this).parent().parent().find(".saleInput2").val();
			inputModel.productSaleMan2Id=$(this).parent().parent().find(".saleInput2").data("employeeId");
			inputModel.productRemark=$(this).parent().parent().find(".productRemark").children().val();
			$(this).parent().parent().remove();
			var changeGiftToProduct='<tr class="text-center addproductInfo">'+changeGiftHtml+'</tr>'+
			'<tr class="text-center addGifts">'+
			'<td>'+'</td>'+
			'<td>'+'</td>'+
			'<td></td>'+
			'<td>'+'</td>'+
			'<td style="color:#1878c7;cursor:pointer">'+'<span class="glyphicon glyphicon-plus-sign addGiftsButton">'+'&nbsp;&nbsp;'+'添加赠品'+'</span>'+'</td>'+
			'<td>'+'</td>'+
			'<td>'+'</td>'+
			'<td>'+'</td>'+
			'<td>'+'</td>'+
			'<td>'+'</td>'+
			'<td>'+'</td>'+
			'<td>'+'</td>'+
			'<td>'+'</td>'+
			'<td>'+'</td>'+
			'<td>'+'</td>'+
			'<td>'+'</td>'+
			'<td>'+'</td>'+
			'</tr>'
			$("#productInfoTable tbody").append(changeGiftToProduct)
			var productLength=$("#productInfoTable tbody").find(".addproductInfo").length;
			$("#productInfoTable tbody").find(".addproductInfo").last().attr("id","addproductInfo_"+productLength);
			$("#productInfoTable tbody").find(".addGifts").last().attr("id","addGifts_"+productLength);
			$("#productInfoTable tbody #addproductInfo_"+productLength).find(".changeGift").removeAttr("checked");
			$("#productInfoTable tbody #addproductInfo_"+productLength).find(".productRowNumber").text(productLength);
			$("#productInfoTable tbody #addproductInfo_"+productLength).find(".productInfo").find(".productInfoName").val(inputModel.productName);
			$("#productInfoTable tbody #addproductInfo_"+productLength).find(".productNumber").children().val(inputModel.productCounter);
			$("#productInfoTable tbody #addproductInfo_"+productLength).find(".inputReturnProductPrice").removeAttr("disabled");
			$("#productInfoTable tbody #addproductInfo_"+productLength).find(".inputReturnProductPrice").val(inputModel.productReturnAmount);
			$("#productInfoTable tbody #addproductInfo_"+productLength).find(".inputImeiInfo").val(inputModel.productImei);
			$("#productInfoTable tbody #addproductInfo_"+productLength).find(".inputAuxImeiInfo").val(inputModel.productAuxiImei);
			$("#productInfoTable tbody #addproductInfo_"+productLength).find(".businessMac").children().val(inputModel.productContractMac);
			$("#productInfoTable tbody #addproductInfo_"+productLength).find(".saleInput1").val(inputModel.productSaleMan1).data("employeeId",inputModel.productSaleMan1Id);
			$("#productInfoTable tbody #addproductInfo_"+productLength).find(".saleInput2").val(inputModel.productSaleMan2).data("employeeId",inputModel.productSaleMan2Id);
			$("#productInfoTable tbody #addproductInfo_"+productLength).find(".staging").children().attr("checked",inputModel.productStaging);
			$("#productInfoTable tbody #addproductInfo_"+productLength).find(".productRemark").children().val(inputModel.productRemark);
			
			$("#productInfoTable tbody").find(".addproductInfo").each(function(index,value){
				if($("#addproductInfo_"+(index+1)).nextUntil("#addGifts_"+(index+1)).length==0){
					$("#addproductInfo_"+(index+1)).find(".changeGift").attr("disabled",false);
				}
				if($("#productInfoTable tbody").find(".addproductInfo").length>1){
					if((index+1)<$("#productInfoTable tbody").find(".addproductInfo").length){
					$("#addproductInfo_"+(index+1)).nextUntil("#addproductInfo_"+(index+2)).last().attr("id","addGifts_"+(index+1))
					if($("#addproductInfo_"+(index+1)).nextUntil("#addGifts_"+(index+1)).length>0){
					$("#addproductInfo_"+(index+1)).nextUntil("#addGifts_"+(index+1)).each(function(i,value){
						$(this).attr("id","addGifts_"+(index+1)+"_"+(i+1))
						$(this).find(".productRowNumber").text((index+1)+"."+(i+1))
					})
					}
					}else if((index+1)==$("#productInfoTable tbody").find(".addproductInfo").length){
						$("#addproductInfo_"+(index+1)).nextAll().last().attr("id","addGifts_"+(index+1))
						if($("#addproductInfo_"+(index+1)).nextUntil("#addGifts_"+(index+1)).length>0){
							$("#addproductInfo_"+(index+1)).nextUntil("#addGifts_"+(index+1)).each(function(j,value){
								$(this).attr("id","addGifts_"+(index+1)+"_"+(j+1))
								$(this).find(".productRowNumber").text((index+1)+"."+(i+1))
							})
						}
					}
				}else if($("#productInfoTable tbody").find(".addproductInfo").length==1){
					$("#addproductInfo_1").nextAll().last().attr("id","addGifts_1")
					if($("#addproductInfo_1").nextUntil("#addGifts_1").length>0){
						$("#addproductInfo_1").nextUntil("#addGifts_1").each(function(index,value){
							$(this).attr("id","addGifts_1"+"_"+(index+1))
							$(this).find(".productRowNumber").text("1"+"."+(i+1))
						})
					}
				}
				
			})
		}
		countProductTotal()
		countProductReturnAmount()
		getProductNumber()// 获取商品和赠品序号
	})
	$(document).on('click','#notRelatedProduct',function(){
		var productIds=$("#notRelatedProduct").attr("productIds");
		$(this).removeAttr("productIds")
	})
	$(document).on('click','#relatedProSure',function(){
		$("#productInfoTable tbody #addproductInfo_"+changeGiftIdNum).remove();
		$("#productInfoTable tbody #addGifts_"+changeGiftIdNum).remove();
		var selectValue=$("#relateedProductSelect").val()
		var insertHtml='<tr class="text-center addGifts">'+changeGiftHtml+'</tr>'
		$("#productInfoTable tbody").find("#addGifts_"+selectValue).before(insertHtml)
		var RowNum=$("#addproductInfo_"+selectValue).nextUntil("#addGifts_"+selectValue).length;
		$("#addproductInfo_"+selectValue).nextUntil("#addGifts_"+selectValue).last().attr("id","addGifts_"+selectValue+"_"+RowNum);
		$("#addproductInfo_"+selectValue).nextUntil("#addGifts_"+selectValue).last().find(".productRowNumber").text(selectValue+'.'+RowNum);
		$("#addproductInfo_"+selectValue).find(".changeGift").attr("disabled",true);
		$("#addGifts_"+selectValue+"_"+RowNum).find(".changeGift").attr("checked","checked")
		$("#addGifts_"+selectValue+"_"+RowNum).find(".productInfo").find(".productInfoName").val(inputModel.productName);
		$("#addGifts_"+selectValue+"_"+RowNum).find(".productNumber").children().val(inputModel.productCounter);
		$("#addGifts_"+selectValue+"_"+RowNum).find(".inputReturnProductPrice").val(0);
		$("#addGifts_"+selectValue+"_"+RowNum).find(".inputReturnProductPrice").attr("disabled","disabled");
		$("#addGifts_"+selectValue+"_"+RowNum).find(".inputImeiInfo").val(inputModel.productImei);
		$("#addGifts_"+selectValue+"_"+RowNum).find(".inputAuxImeiInfo").val(inputModel.productAuxiImei);
		$("#addGifts_"+selectValue+"_"+RowNum).find(".businessMac").children().val(inputModel.productContractMac);
		$("#addGifts_"+selectValue+"_"+RowNum).find(".saleInput1").val(inputModel.productSaleMan1).data("employeeId",inputModel.productSaleMan1Id);
		$("#addGifts_"+selectValue+"_"+RowNum).find(".saleInput2").val(inputModel.productSaleMan2).data("employeeId",inputModel.productSaleMan2Id);
		$("#addGifts_"+selectValue+"_"+RowNum).find(".staging").children().attr("checked",inputModel.productStaging);
		$("#addGifts_"+selectValue+"_"+RowNum).find(".productRemark").children().val(inputModel.productRemark);
		$("#productInfoTable tbody").find(".addproductInfo").each(function(index,value){
			$(this).attr("id","addproductInfo_"+(index+1));
			$(this).find(".productRowNumber").text(index+1);
			})
			$("#productInfoTable tbody").find(".addproductInfo").each(function(index,value){
				if($("#productInfoTable tbody").find(".addproductInfo").length>1){
					if((index+1)<$("#productInfoTable tbody").find(".addproductInfo").length){
					$("#addproductInfo_"+(index+1)).nextUntil("#addproductInfo_"+(index+2)).last().attr("id","addGifts_"+(index+1))
					if($("#addproductInfo_"+(index+1)).nextUntil("#addGifts_"+(index+1)).length>0){
					$("#addproductInfo_"+(index+1)).nextUntil("#addGifts_"+(index+1)).each(function(i,value){
						$(this).attr("id","addGifts_"+(index+1)+"_"+(i+1))
						$(this).find(".productRowNumber").text((index+1)+"."+(i+1))
						})
						}
					}else if((index+1)==$("#productInfoTable tbody").find(".addproductInfo").length){
						$("#addproductInfo_"+(index+1)).nextAll().last().attr("id","addGifts_"+(index+1))
						if($("#addproductInfo_"+(index+1)).nextUntil("#addGifts_"+(index+1)).length>0){
							$("#addproductInfo_"+(index+1)).nextUntil("#addGifts_"+(index+1)).each(function(j,value){
								$(this).attr("id","addGifts_"+(index+1)+"_"+(j+1))
								$(this).find(".productRowNumber").text((index+1)+"."+(j+1))
							})
						}
					}
				}else if($("#productInfoTable tbody").find(".addproductInfo").length==1){
					$("#addproductInfo_1").nextAll().last().attr("id","addGifts_1")
					if($("#addproductInfo_1").nextUntil("#addGifts_1").length>0){
						$("#addproductInfo_1").nextUntil("#addGifts_1").each(function(index,value){
							$(this).attr("id","addGifts_1"+"_"+(index+1))
							$(this).find(".productRowNumber").text("1"+"."+(index+1))
						})
					}
				}
			})
			
		$("#RelatedProduct").modal('hide')
		countProductTotal()
		countProductReturnAmount()
		getProductNumber()// 获取商品和赠品序号
	})
	
	var isEntryArr = [];
	// 点击修改商品弹出框的确定按钮，重置弹出框的宽度以及隐藏仓库信息表格
	$(document).on('click', '.sureButton',function(){
		$("#myModal").modal('hide');
		var ids = $('#retailgridProduct').jqGrid('getGridParam','selarrrow');
		var obj = $("#retailgridProduct").getRowData(ids);
		if(ids.length > 0){
		
			if($(".sureButton").attr("id")=="productSure"){
				if(($("#productInfoTable tbody tr:first td:eq(2) input").attr("checked")!="checked"&&
						$("#productInfoTable tbody tr:first td:eq(2) input").attr("checked")!=true)&&
						$("#productInfoTable tbody tr:first td:eq(4) div span:first input").val()==""
						){
					addProductInfo(productModel,"#addproductInfo_1");
					if(obj.ifManageImei == "true"){
						$('#addproductInfo_1').find('.inputProductNum').attr('disabled',true);
					}else{
						$('#addproductInfo_1').find('.inputProductNum').attr('disabled',false);
					}
				}else{
					addProductRow(productModel);  // 新增商品行
				}
			}else if($(".sureButton").attr("id")=="giftSure"){
				addGiftRow(productModel,storageModel);    // 新增赠品行
			}else if($(".sureButton").attr("id")=="editproductSure"){
				var editProductIds=$(".sureButton").attr("editRowIds")
				var sel = $(".sureButton").attr('sel');
				clearProductInfo("#"+editProductIds);
				if($("#productInfoTable tbody "+"#"+editProductIds+" td:eq(4) div span:first input").val()==""){
					addProductInfo(productModel,"#"+editProductIds);
					$("#productInfoTable tbody #"+editProductIds).find('option[value='+sel+']').attr("selected",true);
					$("#productInfoTable tbody #"+editProductIds).find('.inputReturnProductPrice').val(0);
				}
			}else if($(".sureButton").attr("id")=="editGiftSure"){
				var editGiftIds=$(".sureButton").attr("editgiftRowIds")
				clearProductInfo("#"+editGiftIds);
				if($("#productInfoTable tbody "+"#"+editGiftIds+" td:eq(4) div span:first input").val()==""){
					addProductInfo(productModel,"#"+editGiftIds);
				}
			}
			
			$('.inputdiscountRate').blur();
		}
	})
// 新增商品行
	var productInfoHtml='<tr class="text-center addproductInfo">'+
 	'<td class="delProduct">'+'<span class="glyphicon glyphicon-trash">'+'</span>'+'</td>'+
    '<td class="productRowNumber">'+'</td>'+
    '<td>'+'<input type="checkbox" class="changeGift"/>'+'<span class="proOrderId" style="display:none">'+'</span>'+'</td>'+
    '<td>'+'<select class="form-control stroageSelect">'+'</select>'+'</td>'+
    '<td class="productInfo" style="width:280px">'+
    	'<div>'+'<span style="display:inline-block;width:220px">'+'<input type=text class="form-control productInfoName" placeholder="商品名称、编码、助记码" disabled/>'+'</span>&nbsp;&nbsp;'+
    	'<span class="goodsId" style="display:none">'+'</span>'+
    	'<span class="imeiManage" style="display:none">'+'</span>'+
    	'<span class="glyphicon glyphicon-edit editProduct" style="color:#5184f0;font-size:20px;cursor:pointer">'+'</span>'+
    	'</div>'+
    '</td>'+
    '<td class="imeiInfo">'+'<input type="text" class="form-control inputImeiInfo"  placeholder="请输入主串号"  readonly/>'+'<span class="imeiMange" style="display:none">'+'</span>'+'</td>'+
    '<td class="auxImeiInfo">'+'<input type="text" class="form-control inputAuxImeiInfo"  placeholder="请输入辅串号" readonly/>'+'</td>'+
    '<td class="productNumber" style="width:100px">'+'<input type="text" class="form-control inputProductNum" onkeyup="checkInput.clearNoNum(this,10)" readonly/>'+'</td>'+
    '<td class="returnProductprice" style="width:100px">'+'<input type="text" class="form-control inputReturnProductPrice" onkeyup="checkInput.checkNum(this,12)" readonly/>'+'</td>'+
    '<td class="salesperson1">'+
    	  '<div class="form-group" style="margin:0;">'+
			    '<div class="input-group">'+
			      '<input type="text" class="form-control saleInput1"  placeholder="请选择营业员" readonly/>'+
			    '</div>'+	
		    '</div>'+
    '</td>'+
    '<td class="salesperson2"> <div class="form-group" style="margin:0;">'+
			    '<div class="input-group">'+
			      '<input type="text" class="form-control saleInput2"  placeholder="请选择营业员" readonly/>'+
			    '</div>'+	
		    '</div>'+
	'</td>'+
    '<td class="businessMac">'+
    	'<select class="form-control selectpicker">'+'</select>'+
    '</td>'+
    '<td class="staging">'+'<input type="checkbox" class="stagingCheck" disabled/>'+'</td>'+
    '<td class="productPrice">'+'</td>'+
     '<td class="originalUnitPrice" style="width:100px">'+'</td>'+
    '<td class="originalAmount" style="width:100px">'+'</td>'+
    '<td class="productRemark">'+'<input type="text" class="form-control" readonly/>'+'</td>'+
   '</tr>'+
   '<tr class="text-center addGifts addGiftslastRow">'+
    '<td>'+'</td>'+
    '<td>'+'</td>'+
    '<td>'+'<input type="checkbox" disabled/>'+'</td>'+
    '<td>'+'</td>'+
    '<td style="color:#1878c7;cursor:pointer">'+'<span class="glyphicon glyphicon-plus-sign addGiftsButton">&nbsp;&nbsp;添加赠品</span>'+'</td>'+
    '<td>'+'</td>'+
    '<td>'+'</td>'+
    '<td>'+'</td>'+
    '<td>'+'</td>'+
    '<td>'+'</td>'+
    '<td>'+'</td>'+
    '<td>'+'</td>'+
    '<td>'+'</td>'+
    '<td>'+'</td>'+
    '<td>'+'</td>'+
    '<td>'+'</td>'+
    '<td>'+'</td>'+
'</tr>'
function addProductRow(productModel){
	$("#productInfoTable tbody").append(productInfoHtml)
	$('#productInfoTable tbody').find(".addproductInfo").last().find(".saleInput1").val($("#saleInput").val());
	$('#productInfoTable tbody').find(".addproductInfo").last().find(".saleInput1").attr("productSalesId",$("#saleInput").data("employeeId"))
	$("#productInfoTable tbody").find('.addproductInfo').each(function(index,value){
		$(this).find('.productRowNumber').text(index+1)
		$(this).attr("id","addproductInfo_"+(index+1));
		if($("#productInfoTable tbody").find('.addproductInfo').length>1){
			if($(this).attr("id")!="addproductInfo_"+$("#productInfoTable tbody").find('.addproductInfo').length){
				$(this).nextUntil("#addproductInfo_"+(index+2)).find(".addGiftsButton").parent().parent().attr("id","addGifts_"+(index+1))
			}else if($(this).attr("id")=="addproductInfo_"+$("#productInfoTable tbody").find('.addproductInfo').length){
				$(this).nextAll().find(".addGiftsButton").parent().parent().attr("id","addGifts_"+(index+1))
			}
		}
		if($("#addproductInfo_"+(index+1)).find('.changeGift').attr("checked")!="checked"&&
				$("#addproductInfo_"+(index+1)).find('.changeGift').attr("checked")!=true&&
				$("#addproductInfo_"+(index+1)).find('.productInfo').children().children().find('.productInfoName').val()==""){
			addProductInfo(productModel,"#addproductInfo_"+(index+1));
			return;
		
	}
	})

}
// 新增赠品行
   var giftHtml='<tr class="text-center addGifts">'+
 	'<td class="delProduct">'+'<span class="glyphicon glyphicon-trash">'+'</span>'+'</td>'+
    '<td class="productRowNumber">'+'</td>'+
    '<td>'+'<input type="checkbox" class="changeGift"/>'+'<span class="proOrderId" style="display:none">'+'</span>'+'</td>'+
    '<td>'+'<select class="form-control stroageSelect">'+'</select>'+'</td>'+
    '<td class="productInfo" style="width:280px">'+
    	'<div>'+'<span style="display:inline-block;width:220px">'+'<input type=text class="form-control productInfoName" placeholder="商品名称、编码、助记码" disabled/>'+'</span>&nbsp;&nbsp;'+
    	'<span class="goodsId" style="display:none">'+'</span>'+
    	'<span class="imeiManage" style="display:none">'+'</span>'+
    	'<span class="glyphicon glyphicon-edit editProduct" style="color:#5184f0;font-size:20px;cursor:pointer">'+'</span>'+
    	'</div>'+
    '</td>'+
    '<td class="imeiInfo">'+'<input type="text" class="form-control inputImeiInfo"  placeholder="请输入主串号"/>'+'<span class="imeiMange" style="display:none">'+'</span>'+'</td>'+
    '<td class="auxImeiInfo">'+'<input type="text" class="form-control inputAuxImeiInfo"  placeholder="请输入辅串号"/>'+'</td>'+
    '<td class="productNumber" style="width:100px">'+'<input type="text" class="form-control inputProductNum" onkeyup="checkInput.clearNoNum(this,10)" readonly/>'+'</td>'+
    '<td class="returnProductprice" style="width:100px">'+'<input type="text" class="form-control inputReturnProductPrice" onkeyup="checkInput.checkNum(this,12)" readonly/>'+'</td>'+
    '<td class="salesperson1">'+
    	  '<div class="form-group" style="margin:0;">'+
			    '<div class="input-group">'+
			      '<input type="text" class="form-control saleInput1"  placeholder="请选择营业员" readonly/>'+
			    '</div>'+	
		    '</div>'+
    '</td>'+
    '<td class="salesperson2"> <div class="form-group" style="margin:0;">'+
			    '<div class="input-group">'+
			      '<input type="text" class="form-control saleInput2"  placeholder="请选择营业员" readonly/>'+
			    '</div>'+	
		    '</div>'+
	'</td>'+
    '<td class="businessMac">'+
    	'<select class="form-control selectpicker">'+'</select>'+
    '</td>'+
    '<td class="staging">'+'<input type="checkbox" class="stagingCheck" disabled/>'+'</td>'+
    '<td class="productPrice">'+'</td>'+
     '<td class="originalUnitPrice" style="width:100px">'+'</td>'+
    '<td class="originalAmount" style="width:100px">'+'</td>'+
    '<td class="productRemark">'+'<input type="text" class="form-control" readonly/>'+'</td>'+
   '</tr>'
function addGiftRow(productModel){
	var giftRowId=$(".sureButton").attr("giftIds");
    var giftArry=giftRowId.split("")
    var giftNumArry=[]
    var idsNumber
    if(giftArry.length>0){
    	for(var i=0;i<giftArry.length;i++){
    		if(i>8){
    		 giftNumArry.push(giftArry[i])
    		}
    	}
    }
    if(giftNumArry.length>0){
    	idsNumber=giftNumArry.join("")
    }
    $("#"+giftRowId).before(giftHtml)
	$('#productInfoTable tbody').find("#"+giftRowId).prev().find(".saleInput1").val($("#saleInput").val());
    $('#productInfoTable tbody').find("#"+giftRowId).prev().find(".saleInput1").attr("productSalesId",$("#saleInput").data("employeeId"))
    $('#productInfoTable tbody').find("#"+giftRowId).prev().find(".changeGift").attr("checked","checked")
    $('#productInfoTable tbody').find("#"+giftRowId).prev().find(".inputReturnProductPrice").val(0);
    $('#productInfoTable tbody').find("#"+giftRowId).prev().find(".inputReturnProductPrice").attr("disabled","disabled");
    $("#addproductInfo_"+idsNumber).find(".changeGift").attr("disabled",true)
    $(".sureButton").removeAttr("giftIds");
    if(idsNumber){
	$("#addproductInfo_"+idsNumber).nextUntil("#"+giftRowId).each(function(index,value){
		$(this).attr("id",giftRowId+'_'+(index+1))
		$(this).find('.productRowNumber').text(idsNumber+'.'+(index+1))
		if($("#"+giftRowId+'_'+(index+1)).find('.productInfo').children().children().find('.productInfoName').val()==""){
				addProductInfo(productModel,"#"+giftRowId+'_'+(index+1));
			
		}
		})
    }
   
}
// 新增商品或赠品信息
function addProductInfo(productModel,trId){
	if(productModel.name!=""){
		var saleManName=$("#saleInput").val();
		var saleManIds=$("#saleInput").data("employeeId")
		$("#productInfoTable tbody "+trId).find(".stagingCheck").removeAttr("disabled");
		$("#productInfoTable tbody "+trId).find(".productRemark").children().removeAttr("readonly");
		$("#productInfoTable tbody "+trId).find(".productNumber").children().val(1);
		$("#productInfoTable tbody "+trId).find('.saleInput1').val(saleManName).data('employeeId',saleManIds)
		$("#productInfoTable tbody "+trId).find(".inputReturnProductPrice").removeAttr("readonly");
		$("#productInfoTable tbody "+trId).find('.saleInput1').storeSales({
			sectionId:'storeInput',
			search:false,
			})
			$("#productInfoTable tbody "+trId).find('.saleInput2').storeSales({
			sectionId:'storeInput',
			search:false
		})
		var title = "";
		if(productModel.code !== ""&& productModel.code !== undefined){
			title+= '编码 :'+productModel.code;
		}
		if(productModel.models !== ""&& productModel.models !== undefined){
			title+= '、型号 :'+productModel.models;
		}
		if(productModel.color !== ""&& productModel.color !== undefined){
			title+= '、颜色 :'+productModel.color;
		}
		if(productModel.categoryName !== ""&& productModel.categoryName !== undefined){
			title+= '、类别 :'+productModel.categoryName;
		}
		if(productModel.configure !== ""&& productModel.configure !== undefined){
			title+= '、配置 :'+productModel.configure;
		}
		$("#productInfoTable tbody "+trId).find(".productInfo").find(".productInfoName").val(productModel.name).attr('title',title);
		$("#productInfoTable tbody "+trId).find(".productInfo").find(".goodsId").text(productModel.goodsId);
		$('#productInfoTable tbody '+trId).find(".imeiMange").text(productModel.ifManageImei);
		$("#productInfoTable tbody "+trId).find(".selectpicker").html(contractMacOpt);
		$('#productInfoTable tbody '+trId).find(".stroageSelect").html(inStorageOption)
		$("#productInfoTable tbody "+trId).find(".productPrice").html(productModel.retailPrice)
		if(productModel.ifManageImei=="" || productModel.ifManageImei=="false"){
			$("#productInfoTable tbody "+trId).find(".inputProductNum").val(1).attr("readonly",false);
			$("#productInfoTable tbody "+trId).find(".inputImeiInfo").attr("readonly",true);
		}else{
			$("#productInfoTable tbody "+trId).find(".inputImeiInfo").attr("readonly",false);
		}
		if(productModel.ifEnableAuxliaryImei=="true"){
			$("#productInfoTable tbody "+trId).find(".inputAuxImeiInfo").attr("readonly",false);
		}else{
			$("#productInfoTable tbody "+trId).find(".inputAuxImeiInfo").attr("readonly",true);
		}
		if(productModel.retailPrice==null||productModel.retailPrice==""){
			$("#productInfoTable tbody "+trId).find(".productPrice").text(0)
		}else{
			$("#productInfoTable tbody "+trId).find(".productPrice").text(productModel.retailPrice)
		}
	}
	countProductTotal()// 计算商品数量总额
	 getProductNumber()// 获取商品和赠品序号
}

// 当商品数量变化时，计算数量总额
$(document).on('blur','.inputProductNum',function(){
	var max = $(this).data('max');
	var val = $(this).val()*1;
	if(max!== undefined){
		if(val > max*1){
			$(this).val(max);
		}
	}
	countProductTotal()
})
function countProductTotal(){
	var productNumSum=0
	$("#productInfoTable tbody tr").each(function(index,value){
		if($(this).find(".inputProductNum").val()!=""&&$(this).find(".inputProductNum").val()!=undefined){
			productNumSum=accAdd(productNumSum,Number($(this).find(".inputProductNum").val()))
		}
	})
	$("#productInfoTable tfoot tr td:eq(5)").text(productNumSum)
}
// 当商品退款金额变化时计算退款总金额
$(document).on('blur','.inputReturnProductPrice',function(){
	countProductReturnAmount()
})
function countProductReturnAmount(){
	var productReturnSum=0
	$("#productInfoTable tbody tr").each(function(index,value){
		if($(this).find(".inputReturnProductPrice").val()!=""&&$(this).find(".inputReturnProductPrice").val()!=undefined){
			productReturnSum=accAdd(productReturnSum,Number($(this).find(".inputReturnProductPrice").val()))
		}
	})
	$("#productInfoTable tfoot tr td:eq(6)").text(productReturnSum)
	countAmount()
}
// 获取商品序号
var addValueproductNum
function getProductNumber(proNumCallBack,resetSymbol){
	var productAndGiftNumber=[];
	var productNumOption='<option>'+'</optiotn>'
	$("#productInfoTable tbody tr").each(function(){
		if($(this).find(".goodsId").text()!=undefined&&$(this).find(".goodsId").text()!=""){
		var productNum=$(this).find(".productRowNumber").text()
		if(productNum!=""){
			productAndGiftNumber.push(productNum)
		}
		}
	})
	if(productAndGiftNumber.length>0){
		productAndGiftNumber.map(function (productNumOpt,index){
			productNumOption=productNumOption+'<option value="'+productNumOpt+'">'+productNumOpt+'</option>'
		})
		$("#Value-addedTable tbody tr").each(function(index,value){
			$(this).find(".valueProductNumber").children().html(productNumOption)
		})
		addValueproductNum=productNumOption
	}
	if(resetSymbol==true){
		proNumCallBack()
	}
}
// 清空商品或赠品信息
function clearProductInfo(trId){
	$("#productInfoTable tbody "+trId).find(".productInfo").find(".productInfoName").val("").removeAttr('title');
	$("#productInfoTable tbody "+trId).find(".productInfo").find(".proOrderId").text("")
	$("#productInfoTable tbody "+trId).find(".productInfo").find(".stroageSelect").val("")
	$("#productInfoTable tbody "+trId).find(".productInfo").find(".stroageSelect").children().html("")
	$("#productInfoTable tbody "+trId).find(".productInfo").find(".goodsId").text("");
	$("#productInfoTable tbody "+trId).find(".productInfo").find(".imeiManage").text("");
//	$("#productInfoTable tbody "+trId).find(".productInfo").find(".productCode").html("");
//	$("#productInfoTable tbody "+trId).find(".productInfo").find(".productModel").html("");
//	$("#productInfoTable tbody "+trId).find(".productInfo").find(".productColor").html("");
//	$("#productInfoTable tbody "+trId).find(".productInfo").find(".productCatory").html("");
//	$("#productInfoTable tbody "+trId).find(".productInfo").find(".productconfig").html("");
	$("#productInfoTable tbody "+trId).find(".productInfo").find(".saleInput1").val("").data("employeeId","");
	$("#productInfoTable tbody "+trId).find(".productInfo").find(".saleInput1").attr("disabled","disabled");
	$("#productInfoTable tbody "+trId).find(".productInfo").find(".saleInput2").val("").data("employeeId","");
	$("#productInfoTable tbody "+trId).find(".productInfo").find(".saleInput2").attr("disabled","disabled");
	$("#productInfoTable tbody "+trId).find(".inputImeiInfo").val("");
	$("#productInfoTable tbody "+trId).find(".inputImeiInfo").attr("readonly","readonly")
	$("#productInfoTable tbody "+trId).find(".imeiMange").text("");
	$("#productInfoTable tbody "+trId).find(".inputAuxImeiInfo").val("");
	$("#productInfoTable tbody "+trId).find(".inputAuxImeiInfo").attr("readonly","readonly")
	$("#productInfoTable tbody "+trId).find(".inputReturnProductPrice").val("");
	$("#productInfoTable tbody "+trId).find(".inputReturnProductPrice").attr("readonly","readonly")
	$("#productInfoTable tbody "+trId).find(".productNumber").children().attr("readonly","readonly");
	$("#productInfoTable tbody "+trId).find(".productNumber").children().val("");
	$("#productInfoTable tbody "+trId).find(".productPrice").text("");
	$("#productInfoTable tbody "+trId).find(".originalUnitPrice").text("");
	$("#productInfoTable tbody "+trId).find(".originalAmount").text("");
	$("#productInfoTable tbody "+trId).find(".productRemark").children().val("");
	$("#productInfoTable tbody "+trId).find(".productRemark").children().attr("readonly","readonly");
	$("#productInfoTable tbody "+trId).find(".businessMac").find(".selectpicker").val("")
	$("#productInfoTable tbody "+trId).find(".businessMac").find(".selectpicker").children().html(" ")
	$("#productInfoTable tbody "+trId).find(".storageName").children().text("")
	$("#productInfoTable tbody "+trId).find(".staging").children().prop("checked",false)
	$("#productInfoTable tbody "+trId).find(".staging").children().attr("disabled","disabled")
	
}
	// 面板收缩展开
	function panelShow(idName,className){
		$(idName).click(function(){
			$(className).toggle()
			$(this).children().toggle()
		})
        $(idName).next("span").click(function(){
            $(className).toggle()
            $(this).siblings(".hideImg").children().toggle()
        })
	}
	// 商品类别树
	function getGoodsClass(){
    		$.request({
	    		type:'POST',
	        	url:'/manager/component/goods/getGoodsClassTreeNodeVoList',
	        	dataType:'json',
	        	data:{},
	        	success:function(data){
					if(data.result==1){
						var res=data.data.dataList;
						if(res == undefined){
							return
						}
						if(!res.length){
							$.zxsaas_plus.showalert('warning','条目为空！');
						}else{
							$.fn.zTree.init($("#goodsTree"),{
                                data: {
                                	simpleData: {
                        				enable: true,
                        				idKey: "id",
                        				pIdKey: "parentId",
                        				rootPId: ''
                        			}
                                },
                                view: {
                                    showLine: true
                                },
                                callback: {
                                	onClick: function (event, treeId, treeNode) {
                                	var productId=treeNode.id
                                	if(productId==-1){
                                		$("#retailgridProduct").jqGrid('setGridParam', {
                                			url:'/manager/inventory/retail/returnGoods/page',
                                			datatype:'json',
                                			page:1,
                            				rows:10,
                                			postData:{
                                				keyWord:$("#retailSearchProduct").val(),
                                				selectTreeClassId:""
                                			}
                                		}).trigger("reloadGrid");
                                	}else{
	                                	$("#retailgridProduct").jqGrid('setGridParam', {
	                                		url:'/manager/inventory/retail/returnGoods/page',
	                            			datatype:'json',
	                            			page:1,
                            				rows:10,
	                            			postData:{
	                                			keyWord:$("#retailSearchProduct").val(),
	                                			selectTreeClassId:productId
	                            			}
	                            		}).trigger("reloadGrid");
                                	}
                                }
                                }
                            },res);
                           // $.fn.zTree.getZTreeObj("spmcDataTree").expandAll(true);
                            var treeObj = $.fn.zTree.getZTreeObj("goodsTree");
                            var nodes = treeObj.getNodes();
                            for (var i = 0; i < nodes.length; i++) { //设置节点展开
                                treeObj.expandNode(nodes[i], true, false, false);
                            }
						}
					}else{
						$.zxsaas_plus.showalert('error',data.desc);
					}
	    		},
	    		error:function(){
	    			alert('请求失败！')
	    		}
	    	})
	}
	// 商品信息
	var productModel={
			name:"",
			goodsId:"",
			code:"",
			color:"",
			retailPrice:"",
			models:"",
			categoryName:"",
			ifManageImei:"",
			ifEnableAuxliaryImei:"",
			configure:""
	}
	// 仓库信息
	var storageModel={
		storageName:"",
		stockCounter:"",
		storageId:"",
		imei:"",
		auximei:"",
		remark:"",
		imeiId:"",
	}
	$.jgrid.defaults.width =730;
    $.jgrid.defaults.responsive = true;
    $.jgrid.defaults.styleUI = 'Bootstrap';
    var lastrow = null,lastcell = null;
	$('#retailgridProduct').jqGrid({
		 	mtype: "POST",
		    datatype: "local",
		    jsonReader: {
		        root: "data.rows", 
		        total: "data.total",
		        records: "data.records",
		        repeatitems: false
		    },
	    colNames:['商品编码','商品名称','商品id','商品类别','商品品牌','型号','颜色','是否串号','辅助串号','标价','计价方式','是否主串','是否辅串'],
	    colModel:[
	        {name: 'code', index: 'code', width: 100, align: 'center', sortable: false},
	        {name: 'name', index: 'name', width: 150, align: 'center', sorttype: 'string', sortable: false,},
	        {name: 'id', index: 'id', width: 80, align: 'center', sorttype: 'string', sortable: false,hidden:true},
	        {name: 'goodsCategoryName', index: 'goodsCategoryName', width: 100, align: 'center', sortable: false},
	        {name: 'goodsBrandName', index: 'goodsBrandName', width: 100, align: 'center', sortable: false},
	        {name: 'goodsModel', index: 'goodsModel', width: 100, align: 'center', sortable: false},
	        {name: 'goodsColorName', index: 'goodsColorName', width: 150, align: 'center', sorttype: 'string', sortable: false,},
	        {name: 'ifManageImei', index: 'ifManageImei', width: 150, align: 'center', sortable: false,formatter:
            	function(cellvalue, options, rowObject){
    	   		if(cellvalue==true){
    	   			return "√";
    	   		}else{
    	   			return "";
    	   		}
            }
	   },
	        {name: 'ifEnableAuxliaryImei', index: 'ifEnableAuxliaryImei', width: 100, align: 'center', sortable: false,formatter:
            	function(cellvalue, options, rowObject){
	   		if(cellvalue==true){
	   			return "√";
	   		}else{
	   			return "";
	   		}
       }},
       		{name: 'price', index: 'price', width: 100, align: 'center', sortable: false,hidden:true},
	        {name: 'valuationMethodsName', index: 'valuationMethodsName', width: 100, align: 'center', sortable: false},
	        {name: 'ifManageImei', index: 'ifManageImei', width: 100, align: 'center', sortable: false,hidden:true},
	        {name: 'ifEnableAuxliaryImei', index: 'ifEnableAuxliaryImei', width: 100, align: 'center', sortable: false,hidden:true}
	        
	    ],
	    sortable:false,
	    rownumbers:true,
	    cellsubmit:'clientArray', // 单元格保存内容的位置
	    editurl:'clientArray',
	    rowNum:10,
	    rowList:[10, 15, 20, 25, 40],
	    pager:'#retailgridPager',
	    viewrecords:true,
	    multiboxonly:true,
	    multiselect:true,
	    width:"auto",
	    height:350,
	    autowidth:true,
	    onselectrow:true,
	    rownumWidth:35,
	    shrinkToFit:false,
	    footerrow:false,
	    userDataOnFooter:true,
	    ondblClickRow: function(rowid,iCol,cellcontent,e){
		    	var rowDtata= $("#retailgridProduct").jqGrid('getRowData',rowid)
		    	productModel.name=rowDtata.name;
		    	productModel.goodsId=rowDtata.id;
		    	productModel.code=rowDtata.code;
		    	productModel.color=rowDtata.color;
		    	productModel.models=rowDtata.goodsModel;
		    	productModel.categoryName=rowDtata.goodsCategoryName;
		    	productModel.retailPrice=rowDtata.price;
		    	productModel.ifManageImei=rowDtata.ifManageImei;
		    	productModel.ifEnableAuxliaryImei=rowDtata.ifEnableAuxliaryImei;
		    	productModel.configure=rowDtata.configure;
		    	$("#myModal").modal("hide");
		    	$('.sureButton').click();
			},
	    beforeEditCell: function(rowid, cellname, v, iRow, iCol){
	        lastrow = iRow;
	        lastcell = iCol;
	    },
	    afterSaveCell: function(rowid, cellname, value, iRow, iCol){},
	    onCellSelect: function(rowid, index, e){},
	    onSelectRow: function(id){
	    	var rowDtata=$("#retailgridProduct").jqGrid('getRowData',id)
	    	productModel.name=rowDtata.name;
	    	productModel.goodsId=rowDtata.id;
	    	productModel.code=rowDtata.code;
	    	productModel.color=rowDtata.color;
	    	productModel.models=rowDtata.goodsModel;
	    	productModel.categoryName=rowDtata.goodsCategoryName;
	    	productModel.retailPrice=rowDtata.price;
	    	productModel.ifManageImei=rowDtata.ifManageImei;
	    	productModel.ifEnableAuxliaryImei=rowDtata.ifEnableAuxliaryImei;
	    	productModel.configure=rowDtata.configure;
	    	storageModel={};
	    },
	    beforeSelectRow: function(rowid,e){
	    	$('#retailgridProduct').jqGrid('resetSelection') 
			return(true);
	    }
	})
	
	// 修改表头仓库
	$(document).on("change",'#productInfoTable thead tr .stroageSelect',function(){
		var slectId=$(this).val()
		$("#productInfoTable tbody tr").each(function(index,value){
			if($(this).find(".stroageSelect")!=undefined){
				$(this).find(".stroageSelect").find('option[value='+slectId+']').attr("selected",true)
			}
		})
	})
	// 合约机
	var contractMacOpt='<option></option>';
	function contractMac(){
		$.request({
    		type:'POST',
        	url:'/manager/inventory/retail/delivery/getBusList',
        	dataType:'json',
        	data:{},
        	success:function(data){
			 if(data.result==1){
				var busList=data.data.busList;
				contractMacOpt='<option></option>';
				busList.map(function(busListOpt,i){
					contractMacOpt+='<option value="'+busListOpt.code+'">'+busListOpt.content+'</option>'
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
	$(document).on('change', '.selectpicker', function() {
		if($(this).val()!=""){
			$(".carrBusin").css("display","block");
			$("#carrierImg").children().toggle();
		}
		var stagingChecked=[]
		var stagingSelectUnit=[]
		$("#productInfoTable tbody tr").find(".businessMac").each(function(index,value){
		    if($(this).children().val()!=""&&$(this).children().val()!=undefined){
		        stagingChecked.push(index)
		       }
		      })
		      $("#carrBusinTable").find(".carrBusinRow").each(function(index,value){
		          if($(this).find(".carrSelectUnit").children().val()!=""&&$(this).find(".stagSelectUnit").children().val()!="null"
		        	  &&$(this).find(".carrSelectUnit").children().val()!=null
		        ){
		              stagingSelectUnit.push(index)
		            }
		         })
		         if(stagingChecked.length==0&&stagingSelectUnit.length==0){
		        	 $(".carrBusin").css("display","none");
		 			$("#carrierImg").children().toggle();
		            }
		
		disabledCol("#carrBusinTable tbody tr",".carrSelectUnit",".carrBusinSelectUnit")
		$("#carrBusinTable tbody tr").each(function(index,value){
		 if($(this).find(".carrSaleInput1").val()==""){
			 $(this).find(".carrSaleInput1").val($("#saleInput").val()).data("employeeId",$("#saleInput").data("employeeId"))
		 }
		})
		
	})
	// 运营商新增行
	var carrHtml='<tr class="text-center carrBusinRow">'+
 	'<td>'+'<span class="glyphicon glyphicon-trash carrDelete">'+'</span>'+'<span class="carrId" style="display:none">'+'</span>'+'</td>'+
    '<td class="carrRowNumber">'+'</td>'+
    '<td class="carrSelectUnit" >'+
    	'<select class="form-control carrBusinSelectUnit">'+'</select>'+
    '</td>'+
	'<td class="carrSelectName">'+'<div class="form-group" style="margin:0;">'+'<div class="input-group">'+
		'<input type="text" class="form-control carrSlectNameInput"  placeholder="请选择业务名称">'+'</div>'+'</div>'
	+'</td>'+
    '<td class="originalSingleAmount">'+'<input type="text" class="form-control inputOriginalAmount"  onkeyup="checkInput.checkNum(this,12)" disabled/>'+'</td>'+
    '<td class="refundsAmount">'+'<input type="text" class="form-control inputrefundsAmount"  onkeyup="checkInput.checkNum(this,12)"/>'+'</td>'+
	'<td class="qty">'+'<input type="text" class="form-control inputqty"  onkeyup="checkInput.clearNoNum(this,12)"/>'+'</td>'+
	'<td class="commission">'+'<input type="text" readonly="readonly"  class="form-control inputcommission"  onkeyup="checkInput.checkNumFu(this,12)"/>'+'</td>'+
	'<td class="comissionEsit " >'+'<input type="text"  class="form-control inputcomissionEsit" onkeyup="checkInput.checkNumFu(this,12)" />'+'</td>'+
    '<td class="businessNum">'+'<input type="text" class="form-control"/>'+'</td>'+
   	'<td class="carrBusinSale1">'+
    	'<div class="form-group" style="margin:0;">'+
			    '<div class="input-group">'+
			      '<input type="text" class="form-control carrSaleInput1"  placeholder="请选择营业员">'+
			    '</div>'+	
		    '</div>'+
    '</td>'+
    '<td class="carrBusinSale2">'+
    	'<div class="form-group" style="margin:0;">'+
			    '<div class="input-group">'+
			      '<input type="text" class="form-control carrSaleInput2"  placeholder="请选择营业员">'+
			    '</div>'+	
		    '</div>'+
    '</td>'+
     '<td class="carrTelephone">'+'<input type="text" class="form-control"/>'+'</td>'+
    '<td class="telephoneImei">'+'<input type="text" class="form-control"/>'+'</td>'+
    '<td class="discountMargin">'+'<input type="text" class="form-control inputdiscountMargin"  onkeyup="checkInput.checkNum(this,12)"/>'+'</td>'+

    '<td class="carrRemark">'+'<input type="text" class="form-control"/>'+'</td>'+
'</tr>'
	$("#addcarrRow").click(function(){
		if($("#carrBusinTable").parent().css("display")=="none"){
			$("#carrBusinTable").parent().css({display:"block"})
		}else if($("#carrBusinTable").parent().css("display")=="block"){
			var rowNumber=0;
			$("#carrBusinTable tbody").append(carrHtml);
			$("#carrBusinTable tbody tr").each(function(index,value){
				 $(this).find(".carrRowNumber").text(index+1);
				 $(this).attr("id","carrBusinRowNum_"+(index+1))
				 disabledCol("#carrBusinTable tbody tr",".carrSelectUnit",".carrBusinSelectUnit")
			})
			var carrBusinTrId=$("#carrBusinTable tbody tr:last").attr("id")
			$("#carrBusinTable tbody "+"#"+carrBusinTrId).find(".carrSelectUnit").children().html(carrBusinUnit)
			var saleManName=$("#saleInput").val();
			var saleManIds=$("#saleInput").data("employeeId")
			$("#carrBusinTable tbody tr:last").find(".carrSaleInput1").val(saleManName).data('employeeId',saleManIds)
			$("#carrBusinTable tbody tr").each(function(index,value){
		 if($(this).find(".carrSaleInput1").val()==""){
			 $(this).find(".carrSaleInput1").val($("#saleInput").val()).data("employeeId",$("#saleInput").data("employeeId"))
		 }
			})
		}
		$("#carrBusinTable tbody tr").each(function(index,value){
		$(this).find(".inputOriginalAmount").attr("disabled","disabled")
		if($(this).find(".carrId").text()!=""){
			$(this).find("input").attr("disabled","disabled")
			$(this).find("select").attr("disabled","disabled")
		}
		$(this).find(".inputrefundsAmount").removeAttr("disabled")
		$(this).find(".carrRemark").children().removeAttr("disabled")
		})
	})
	// 运营商删除行
	$(document).on('click', '.carrDelete', function() {
		if($("#carrBusinTable tbody").children().length>1){
			$(this).parent().parent().remove();
			countCarrBusin()
		}else if($("#carrBusinTable tbody").children().length==1){
			clearCarrData("#carrBusinRowNum_1");
			countCarrBusin();
		}
		$("#carrBusinTable tbody tr").each(function(index,value){
			 $(this).find(".carrRowNumber").text(index+1);
			 $(this).attr("id","carrBusinRowNum_"+(index+1))
		})
		disabledCol("#carrBusinTable tbody tr",".carrSelectUnit",".carrBusinSelectUnit")
		$("#carrBusinTable tbody tr").each(function(index,value){
		$(this).find(".inputOriginalAmount").attr("disabled","disabled")
		if($(this).find(".carrId").text()!=""){
			$(this).find("input").attr("disabled","disabled")
			$(this).find("select").attr("disabled","disabled")
		}
		$(this).find(".inputrefundsAmount").removeAttr("disabled")
		$(this).find(".carrRemark").children().removeAttr("disabled")
		})
	})
	// 查询运营商往来单位
	var carrBusinUnit
	function searchCarrBusinUnit(){
		$.request({
    		type:'GET',
        	url:'/manager/inventory/common/getOperatorList',
        	dataType:'json',
        	success:function(data){
			 if(data.result==1){
				var  operatorList=data.data.operatorList;
				operatorList.map(function(operatorListOpt,index){
					carrBusinUnit=carrBusinUnit+'<option value="'+operatorListOpt.id+'">'+operatorListOpt.name+'</option>'
				})
				$("#carrBusinTable tbody #carrBusinRowNum_1").find(".carrSelectUnit").children().html(carrBusinUnit)
			 }else{
				$.zxsaas_plus.showalert('error',data.desc); 
			 }
    		},
    		error:function(){
    			alert('请求失败！')
    		}
    	})
	}
	// 根据运营商往来单位查询业务名称
	$(document).on('change', '.carrBusinSelectUnit',function(){
		var trId=$(this).parent().parent().attr("id")
		if($(this).val()!="null"&&$(this).val()!=undefined){

	    	$("#carrBusinTable tbody #"+trId).find(".carrSaleInput1").val($("#saleInput").val())

            createBusin(trId)
            $("#carrBusinTable tbody #"+trId).find(".originalSingleAmount").children().val(0);
			$("#carrBusinTable tbody #"+trId).find(".refundsAmount").children().val(0);
			$("#carrBusinTable tbody #"+trId).find(".discountMargin").children().val(0);
			$("#carrBusinTable tbody #"+trId).find(".comissionEsit").children().val(0);
			$("#carrBusinTable tbody #"+trId).find(".qty").children().val(1);
			$("#carrBusinTable tbody #"+trId).find(".commission").children().val(0);
		}else{
			$("#"+trId).find(".carrSelectName").find(".carrSlectNameOption").val("");
			$("#"+trId).find(".carrSelectName").find(".carrSlectNameOption").html("");
		}
		disabledCol("#carrBusinTable tbody tr",".carrSelectUnit",".carrBusinSelectUnit")
		$("#carrBusinTable tbody tr").each(function(index,value){
		 if($(this).find(".carrSaleInput1").val()==""){
			 $(this).find(".carrSaleInput1").val($("#saleInput").val()).data("employeeId",$("#saleInput").data("employeeId"))
		 }
		 $(this).find(".inputOriginalAmount").attr("disabled","disabled")
		 if($(this).find(".carrId").text()!=""){
			$(this).find("input").attr("disabled","disabled")
			$(this).find("select").attr("disabled","disabled")
		}
		$(this).find(".inputrefundsAmount").removeAttr("disabled")
		$(this).find(".carrRemark").children().removeAttr("disabled")
		
			})
		countCarrBusin();
})	

	function createBusin(trId) {
        $("#carrBusinTable tbody #"+trId).find('.carrSaleInput1').storeSales({
            sectionId:'storeInput',
            search:false,
        })
        $("#carrBusinTable tbody #"+trId).find('.carrSaleInput2').storeSales({
            sectionId:'storeInput',
            search:false
        })
        $("#carrBusinTable tbody #"+trId).find('.carrSlectNameInput').val('').removeData().comModalsBusinessArchives({
            multiselect:false,
            clickBefore:function(){
                $("#carrBusinTable tbody #"+trId).find('.carrSlectNameInput').comModalsBusinessArchives('setOption',{
                    girdParam:{
                        contactUnitId:$("#carrBusinTable tbody #"+trId).find('.carrBusinSelectUnit').val()
                    },
                })
            },
            clickback:function(arrList){
                var tr=$("#carrBusinTable tbody #"+trId)
                for(var i=0;i<arrList.length;i++){
                    tr.find('.inputcommission').val(Number(arrList[i].commission))
                }
                var amount =accMul(Number(tr.find('.inputcommission').val()),Number(tr.find('.inputqty').val()) )
                tr.find('.inputcomissionEsit').val(amount)
                countCarrBusin()
            }
        })
    }

// 当原单收款收款变化时
 $(document).on('blur','.inputOriginalAmount',function(){
	 countCarrBusin()
 })
 // 当退款金额变化时
 $(document).on('blur','.inputrefundsAmount',function(){
	 countCarrBusin()
 })

$(document).on('blur','.inputqty',function(){
	var _this=$(this)
	var tr=_this.closest('tr');
	var amount=accMul(Number(tr.find('.inputcommission ').val()),Number(_this.val()))
	tr.find('.inputcomissionEsit').val(amount)
    countCarrBusin()
})
 // 当退保证金发生变化时
 $(document).on('blur','.inputdiscountMargin',function(){
	 countCarrBusin()
 })
 // 当佣金预估发生变化时，佣金预估总额的变化
 $(document).on('blur','.inputcomissionEsit',function(){
	var reg = /^[\-\+]?\d+(\.\d{2})?$/;
	 if(!reg.test($(this).val())||$(this).val()==0){
	 	$(this).val(0)
	 	}
	 countCarrBusin()
 })
 // 计算原单收款、退款金额、退保证金、佣金预估
 function countCarrBusin(){
	 var originalCollectAmount=0
	 var carrReturnAmount=0
	 var carrReturnMarginAmount=0
	 var commissionEstAmount=0

     var carrinputqty=0;

	 $("#carrBusinTable tbody tr").each(function(index,value){
		 if($(this).find(".inputOriginalAmount").val()!=""&&$(this).find(".inputOriginalAmount").val()!=undefined){
			 originalCollectAmount=accAdd(originalCollectAmount,Number($(this).find(".inputOriginalAmount").val()))
		 }
		 if($(this).find(".inputrefundsAmount").val()!=""&&$(this).find(".inputrefundsAmount").val()!=undefined){
			 carrReturnAmount=accAdd(carrReturnAmount,Number($(this).find(".inputrefundsAmount").val()))
		 }
		 if($(this).find(".inputdiscountMargin").val()!=""&&$(this).find(".inputdiscountMargin").val()!=undefined){
			 carrReturnMarginAmount=accAdd(carrReturnMarginAmount,Number($(this).find(".inputdiscountMargin").val()))
		 }
		 if($(this).find(".inputcomissionEsit").val()!=""&&$(this).find(".inputcomissionEsit").val()!=undefined){
			 commissionEstAmount=accAdd(commissionEstAmount,Number($(this).find(".inputcomissionEsit").val()))
		 }
         if($(this).find(".inputqty").val()!=undefined){
             var carrinputqtyPrice=$(this).find(".inputqty").val()
             carrinputqty=accAdd(carrinputqty,Number(carrinputqtyPrice))
         }
	 })
	 $("#carrTotal_1").text(originalCollectAmount)
	 $("#carrTotal_2").text(carrReturnAmount)
     $("#carrTotal_3").text(carrinputqty)
     $("#carrTotal_4").text(commissionEstAmount)
	 $("#carrTotal_5").text(carrReturnMarginAmount)

	 countAmount()
 }

    // 清空运营商业务
   function clearCarrData(carrTrId){
	 $("#carrBusinTable tbody "+carrTrId).find(".carrBusinSelectUnit").val("");
	 $("#carrBusinTable tbody "+carrTrId).find(".carrSlectNameOption").val("");
	 $("#carrBusinTable tbody "+carrTrId).find(".carrSlectNameOption").attr("disabled","disabled");
	 $("#carrBusinTable tbody "+carrTrId).find(".inputOriginalAmount").val(0);
	 $("#carrBusinTable tbody "+carrTrId).find(".inputOriginalAmount").attr("disabled","disabled");
	 $("#carrBusinTable tbody "+carrTrId).find(".inputrefundsAmount").val(0);
	 $("#carrBusinTable tbody "+carrTrId).find(".inputrefundsAmount").attr("disabled","disabled");
	 $("#carrBusinTable tbody "+carrTrId).find(".businessNum").children().val("");
	 $("#carrBusinTable tbody "+carrTrId).find(".businessNum").children().attr("disabled","disabled");
	 $("#carrBusinTable tbody "+carrTrId).find(".carrTelephone").children().val("");
	 $("#carrBusinTable tbody "+carrTrId).find(".carrTelephone").children().attr("disabled","disabled");
	 $("#carrBusinTable tbody "+carrTrId).find(".telephoneImei").children().val("");
	 $("#carrBusinTable tbody "+carrTrId).find(".telephoneImei").children().attr("disabled","disabled");
	 $("#carrBusinTable tbody "+carrTrId).find(".discountMargin").children().val("");
	 $("#carrBusinTable tbody "+carrTrId).find(".discountMargin").children().attr("disabled","disabled");
	 $("#carrBusinTable tbody "+carrTrId).find(".carrSaleInput1").val("").data("employeeId","");
	 $("#carrBusinTable tbody "+carrTrId).find(".carrSaleInput1").attr("disabled","disabled");
	 $("#carrBusinTable tbody "+carrTrId).find(".carrSaleInput2").val("").data("employeeId","");
	 $("#carrBusinTable tbody "+carrTrId).find(".carrSaleInput2").attr("disabled","disabled");
	 $("#carrBusinTable tbody "+carrTrId).find(".inputcomissionEsit").val(0);
	 $("#carrBusinTable tbody "+carrTrId).find(".inputcomissionEsit").attr("disabled","disabled");
	 $("#carrBusinTable tbody "+carrTrId).find(".carrRemark").children().val("");
	 $("#carrBusinTable tbody "+carrTrId).find(".carrRemark").children().attr("disabled","disabled");
	 $("#carrBusinTable tbody "+carrTrId).find(".carrId").text("");
	}
	// 当运用商服务名称为空时禁用列
	disabledCol("#carrBusinTable tbody tr",".carrSelectUnit",".carrBusinSelectUnit")
	// 增值服务新增行
	var valueHtml='<tr class="text-center addValueService">'+
 	'<td>'+'<span class="glyphicon glyphicon-trash valueDelete">'+'</span>'+'<span class="addValueId" style="display:none">'+'</span>'+'</td>'+
    '<td class="valueRowNumber">'+'</td>'+
    '<td class="valueSelectName">'+'<span class="addValueSelectName">'+'</span>'+'<span class="addValueSelectId" style="display:none">'+'</span>'+'</td>'+
    '<td class="addValuesalesPeople1">'+'<span class="addValueSaleInput1">'+'</span>'+'<span class="addValueSaleInputId" style="display:none">'+'</span>'+'</td>'+
    '<td class="realPayment">'+'<input type="text" class="form-control realPaymentInput" onkeyup="checkInput.checkNum(this,12)"/>'+'</td>'+
    '<td class="bissDate">'+'</td>'+
    '<td class="originalCollection">'+'</td>'+
    '<td class="limitDate">'+'</td>'+
    '<td class="usageCount">'+'</td>'+
     '<td class="addValueProductName">'+'<span>'+'</span>'+'<span style="display:none">'+'</span>'+'</td>'+
     '<td class="phoneImei">'+'<span>'+'</span>'+'<span style="display:none">'+'</span>'+'</td>'+
    '<td class="esitPrice">'+'</td>'+
    '<td class="valuePrice">'+'</td>'+
   	'<td class="addValuesalesPeople2">'+'<span class="addValueSaleInput2">'+'</span>'+'<span class="addValueSaleInput2Id" style="display:none">'+'</span>'+'</td>'+
    '<td class="valueRemark">'+'<input type="text" class="form-control"/>'+'</td>'+
    '<td class="serviceNumber">'+'</td>'+
'</tr>'
	$("#Value-added").click(function(){
		if($("#Value-addedTable").parent().css("display")=="none"){
			$("#Value-addedTable").parent().css({display:"block"})
		}else if($("#Value-addedTable").parent().css("display")=="block"){
			var rowNumber=0;
			$("#Value-addedTable tbody").append(valueHtml);
			$("#Value-addedTable tbody tr").each(function(index,value){
				 $(this).find(".valueRowNumber").text(index+1);
				 $(this).attr("id","addValueService_"+(index+1));
			})
			var addValueTrId=$("#Value-addedTable tbody tr:last").attr("id")
			$("#Value-addedTable tbody "+"#"+addValueTrId).find(".valueSelectName").children().html(addValueServiceNameOpt)
			$("#Value-addedTable tbody "+"#"+addValueTrId).find(".valueProductNumber").children().html(addValueproductNum)
			var saleManName=$("#saleInput").val();
			var saleManIds=$("#saleInput").data("employeeId");
			$("#Value-addedTable tbody tr:last").find(".addValueSaleInput1").val(saleManName).data('employeeId',saleManIds)
			$("#Value-addedTable tbody tr").each(function(index,value){
		if($(this).find(".addValueSaleInput1").val()==""){
		$(this).find(".addValueSaleInput1").val($("#saleInput").val()).data("employeeId",$("#saleInput").data("employeeId"))
		}
		
	})
		}
	})
	// 增值服务删除行
	$(document).on('click', '.valueDelete', function() {
		if($("#Value-addedTable tbody").children().length>1){
			$(this).parent().parent().remove();
			countAddValueAmount()
		}else if($("#Value-addedTable tbody tr").length==1){
			clearAddValueData("#addValueService_1");
			$('#addValueService_1').find('.realPaymentInput').attr('disabled',true);
			$('#addValueService_1').find('.valueRemark').find('input').attr('disabled',true);
			countAddValueAmount()
		}
		$("#Value-addedTable tbody tr").each(function(index,value){
			 $(this).find(".valueRowNumber").text(index+1);
			 $(this).attr("id","addValueService_"+(index+1))
		})
	})
	// 退款金额变化计算退款总金额
	$(document).on('blur','.realPaymentInput',function(){
		countAddValueAmount()
	})
	// 计算增值服务中退款总金额和原单收款总金额
	function countAddValueAmount(){
		var addValueReturnAmount=0
		var addValueoriginalAmount=0
		$("#Value-addedTable tbody tr").each(function(){
			addValueReturnAmount=accAdd(addValueReturnAmount,Number($(this).find(".realPaymentInput").val()))
		 if($(this).find(".originalCollection").text()!="null"&&$(this).find(".originalCollection").text()!=""&&$(this).find(".originalCollection").text()!=undefined){
			addValueoriginalAmount=accAdd(addValueoriginalAmount,Number($(this).find(".originalCollection").text()))
			}
		})
		$("#Value-addedTable tfoot tr td:eq(3)").text(addValueReturnAmount)
		$("#Value-addedTable tfoot tr td:eq(5)").text(addValueoriginalAmount)	
		countAmount()
		}
	// 清空增值服务数据
	function clearAddValueData(addValueId){
		$("#Value-addedTable tbody "+addValueId).find(".addValueId").text("");
		$("#Value-addedTable tbody "+addValueId).find(".addValueSelectName").text("");
		$("#Value-addedTable tbody "+addValueId).find(".addValueSelectId").text("");
		$("#Value-addedTable tbody "+addValueId).find(".addValueSaleInput1").text("");
		$("#Value-addedTable tbody "+addValueId).find(".addValueSaleInputId").text("");
		$("#Value-addedTable tbody "+addValueId).find(".realPaymentInput").val("");
		$("#Value-addedTable tbody "+addValueId).find(".bissDate").text("");
		$("#Value-addedTable tbody "+addValueId).find(".originalCollection").text("");
		$("#Value-addedTable tbody "+addValueId).find(".limitDate").text("");
		$("#Value-addedTable tbody "+addValueId).find(".usageCount").text("");
		$("#Value-addedTable tbody "+addValueId).find(".addValueProductName").children().first().text("");
		$("#Value-addedTable tbody "+addValueId).find(".addValueProductName").children().last().text("");
		$("#Value-addedTable tbody "+addValueId).find(".phoneImei").children().first().text("");
		$("#Value-addedTable tbody "+addValueId).find(".phoneImei").children().last().text("");
		$("#Value-addedTable tbody "+addValueId).find(".esitPrice").text("");
		$("#Value-addedTable tbody "+addValueId).find(".valuePrice").text("");
		$("#Value-addedTable tbody "+addValueId).find(".addValueSaleInput2").text("");
		$("#Value-addedTable tbody "+addValueId).find(".addValueSaleInput2Id").text("");
		$("#Value-addedTable tbody "+addValueId).find(".valueRemark").children().val("");
		$("#Value-addedTable tbody "+addValueId).find(".serviceNumber").text("");
	}
/*
 * //当增值服务为空时禁用列 disabledCol("#Value-addedTable tbody
 * tr",".valueSelectName",".addValueSelectName")
 */
	// 第三方抵扣新增行
	var discountHtml='<tr class="text-center thirdDiscount">'+
 	'<td>'+'<span class="glyphicon glyphicon-trash dissountDelete">'+'</span>'+'<span class="thirdDiscountId" style="display:none">'+'</span>'+'</td>'+
    '<td class="discountRowNumber">'+'</td>'+
    '<td class="discountSelectUnit">'+
    	'<select class="form-control discountSelectUnitOption">'+'</select>'+
    '</td>'+
    '<td class="discountActiveName">'+
    	'<select class="form-control discountActiveNameOption">'+'</select>'+
    '</td>'+
    '<td class="thirdDiscountAmount">'+'<input type="text" class="form-control thirdDiscountAmountInput" onkeyup="checkInput.checkNum(this,12)"/>'+'</td>'+
    '<td class="thirdReturnAmount">'+'<input type="text" class="form-control inputthirdReturnAmount" onkeyup="checkInput.checkNum(this,12)"/>'+'</td>'+
	'<td class="settleAmount"><input type="text" class="form-control settleAmountInput" onkeyup="checkInput.checkNum(this,12)"/></td>'+
    '<td class="thirdBusinNum">'+'<input type="text" class="form-control"/>'+'</td>'+
    '<td class="thirdSales1">'+
    	'<div class="form-group" style="margin:0;">'+
			    '<div class="input-group">'+
			      '<input type="text" class="form-control thirdSaleInput1"  placeholder="请选择营业员">'+
			    '</div>'+	
		    '</div>'+
    '</td>'+
    '<td class="thirdSales2">'+
    	'<div class="form-group" style="margin:0;">'+
			    '<div class="input-group">'+
			      '<input type="text" class="form-control thirdSaleInput2"  placeholder="请选择营业员">'+
			    '</div>'+	
		    '</div>'+
    '</td>'+
    '<td class="discountRemark">'+'<input type="text" class="form-control"/>'+'</td>'+
'</tr>'
	$("#discount").click(function(){
		if($("#DiscountTable").parent().css("display")=="none"){
			$("#DiscountTable").parent().css({display:"block"})
		}else if($("#DiscountTable").parent().css("display")=="block"){
			var rowNumber=0;
			$("#DiscountTable tbody").append(discountHtml);
			$("#DiscountTable tbody tr").each(function(index,value){
				 $(this).find(".discountRowNumber").text(index+1);
				 $(this).attr("id","thirdDisount_"+(index+1));
				 disabledCol("#DiscountTable tbody tr",".discountSelectUnit",".discountSelectUnitOption")
			})
			var thirdDiscountTrId=$("#DiscountTable tbody tr:last").attr("id")
			$("#DiscountTable tbody "+"#"+thirdDiscountTrId).find(".discountSelectUnit").children().html(thirdDisountUntilOpt)
			var saleManName=$("#saleInput").val();
			var saleManIds=$("#saleInput").data("employeeId");
			$("#DiscountTable tbody tr:last").find(".thirdSaleInput1").val(saleManName).data('employeeId',saleManIds)
			$("#DiscountTable tbody tr").each(function(index,value){
		if($(this).find(".thirdSaleInput1").val()==""){
		$(this).find(".thirdSaleInput1").val($("#saleInput").val()).data("employeeId",$("#saleInput").data("employeeId"))
		}
	})
		}
		$("#DiscountTable tbody tr").each(function(index,value){
			$(this).find(".thirdDiscountAmountInput").attr("disabled","disabled")
			if($(this).find(".thirdDiscountId").text()!=""){
				$(this).find("input").attr("disabled","disabled")
				$(this).find("select").attr("disabled","disabled")
			}
			$(this).find(".inputthirdReturnAmount").removeAttr("disabled")
			$(this).find(".discountRemark").children().removeAttr("disabled")
		})
	})
	// 第三方抵扣删除行
	$(document).on('click', '.dissountDelete', function() {
		if($("#DiscountTable tbody").children().length>1){
			$(this).parent().parent().remove();
			countDiscountAmount();
		}else if($("#DiscountTable tbody").children().length==1){
			clearDiscountData("#thirdDisount_1");
			countDiscountAmount();
		}
		$("#DiscountTable tbody tr").each(function(index,value){
			 $(this).find(".discountRowNumber").text(index+1);
			 $(this).attr("id","thirdDisount_"+(index+1))
			 })
		//disabledCol("#DiscountTable tbody tr",".discountSelectUnit",".discountSelectUnitOption")
		$("#DiscountTable tbody tr").each(function(index,value){
			if($(this).find(".thirdDiscountId").text()!=""){
				$(this).find("input").attr("disabled","disabled")
				$(this).find("select").attr("disabled","disabled")
			}
			$(this).find(".inputthirdReturnAmount").removeAttr("disabled")
			$(this).find(".discountRemark").children().removeAttr("disabled")
		})
	})
	// 查询第三方抵扣的往来单位
	var thirdDisountUntilOpt
	function thirdDiscountUnit(){
		$.request({
    		type:'GET',
        	url:'/manager/inventory/common/getContactUnitList',
        	dataType:'json',
        	success:function(data){
			 if(data.result==1){
				var  contactUntilListOpt=data.data.contactUnitList;
				contactUntilListOpt.map(function(contactUntilListOption,index){
					thirdDisountUntilOpt=thirdDisountUntilOpt+'<option value="'+contactUntilListOption.id+'">'+contactUntilListOption.name+'</option>'
				})
				$("#DiscountTable tbody #thirdDisount_1").find(".discountSelectUnit").children().html(thirdDisountUntilOpt)
			 }else{
				$.zxsaas_plus.showalert('error',data.desc); 
			 }
    		},
    		error:function(){
    			alert('请求失败！')
    		}
    	})	
	}
	// 查询第三方抵扣活动名称
	$(document).on('change', '.discountSelectUnitOption',function(){
		var trId=$(this).parent().parent().attr("id")
		if($(this).val()!="null"&&$(this).val()!=undefined){
			searchThirdDiscount($(this).val(),trId)
	    	$(this).parent().parent().find('.thirdSaleInput1').storeSales({
				sectionId:'storeInput',
				search:false
			}),
			$(this).parent().parent().find('.thirdSaleInput2').storeSales({
				sectionId:'storeInput',
				search:false
			})
			$(this).parent().parent().find(".thirdDiscountAmountInput").val(0)
			countDiscountAmount()
		}else{
			$("#"+trId).find(".discountActiveName").find(".discountActiveNameOption").val("");
			$("#"+trId).find(".discountActiveName").find(".discountActiveNameOption").html("");
		}
		disabledCol("#DiscountTable tbody tr",".discountSelectUnit",".discountSelectUnitOption")
			$("#DiscountTable tbody tr").each(function(index,value){
		if($(this).find(".thirdSaleInput1").val()==""){
		$(this).find(".thirdSaleInput1").val($("#saleInput").val()).data("employeeId",$("#saleInput").data("employeeId"))
		}
	})
	$("#DiscountTable tbody tr").each(function(index,value){
			$(this).find(".thirdDiscountAmountInput").attr("disabled","disabled")
			if($(this).find(".thirdDiscountId").text()!=""){
				$(this).find("input").attr("disabled","disabled")
				$(this).find("select").attr("disabled","disabled")
			}
			$(this).find(".inputthirdReturnAmount").removeAttr("disabled")
			$(this).find(".discountRemark").children().removeAttr("disabled")
		})
		countDiscountAmount();
})	
   function searchThirdDiscount(discountId,trId){
		$.request({
    		type:'GET',
    		async: false,
        	url:'/manager/inventory/common/getThirdTicketList',
        	dataType:'json',
        	data:{
				contactsunitId:discountId
			},
        	success:function(data){
			 if(data.result==1){
				var thridTicketList=data.data.thridTicketList;
				var thirdDiscountActive
				thridTicketList.map(function(thridTicketListOpt,index){
					thirdDiscountActive=thirdDiscountActive+'<option value="'+thridTicketListOpt.id+'">'+thridTicketListOpt.name+'</option>'
				})
				$("#"+trId).find(".discountActiveName").find(".discountActiveNameOption").html(thirdDiscountActive)
			 }else{
				$.zxsaas_plus.showalert('error',data.desc); 
			 }
    		},
    		error:function(){
    			alert('请求失败！')
    		}
    	})
	}
	// 当原单抵现金额变化时，计算抵扣现金总额
   $(document).on("blur",'.thirdDiscountAmountInput,.inputthirdReturnAmount,.settleAmountInput',function(){
	   countDiscountAmount();
   })

    // 计算原单抵现总金额、退回总金额
    function countDiscountAmount(){
		var thirdDiscountSum=0
		var returnThirdAmount=0
		var settleAmount=0
		$("#DiscountTable tbody tr").each(function(){
			if($(this).find(".thirdDiscountAmount").children().val()!=""){
			thirdDiscountSum=accAdd(thirdDiscountSum,Number($(this).find(".thirdDiscountAmount").children().val()))
			}
			if($(this).find(".inputthirdReturnAmount").val()!=""){
				returnThirdAmount=accAdd(returnThirdAmount,Number($(this).find(".inputthirdReturnAmount").val()))
			}
            if($(this).find(".settleAmountInput").val()!=""){
                settleAmount=accAdd(settleAmount,Number($(this).find(".settleAmountInput").val()))
            }
			})
		$("#DiscountTable tfoot tr td:eq(3)").text(thirdDiscountSum)
		$("#DiscountTable tfoot tr td:eq(4)").text(returnThirdAmount)
		$("#DiscountTable tfoot tr td:eq(5)").text(settleAmount)
		countReturnAmountDue()
	}
	// 清空第三方抵扣的值
	function clearDiscountData(thirdDiscountTrId){
		$("#DiscountTable tbody "+thirdDiscountTrId).find(".thirdDiscountId").text("");
		$("#DiscountTable tbody "+thirdDiscountTrId).find(".discountSelectUnitOption").val("");
		$("#DiscountTable tbody "+thirdDiscountTrId).find(".discountActiveNameOption").val("");
		$("#DiscountTable tbody "+thirdDiscountTrId).find(".discountActiveNameOption").attr("disabled","disabled");
		$("#DiscountTable tbody "+thirdDiscountTrId).find(".thirdDiscountAmountInput").val(0);
		$("#DiscountTable tbody "+thirdDiscountTrId).find(".thirdDiscountAmountInput").attr("disabled","disabled");
		$("#DiscountTable tbody "+thirdDiscountTrId).find(".inputthirdReturnAmount").val(0);
		$("#DiscountTable tbody "+thirdDiscountTrId).find(".inputthirdReturnAmount").attr("disabled","disabled");
		$("#DiscountTable tbody "+thirdDiscountTrId).find(".thirdBusinNum").children().val("");
		$("#DiscountTable tbody "+thirdDiscountTrId).find(".thirdBusinNum").children().attr("disabled","disabled");
		$("#DiscountTable tbody "+thirdDiscountTrId).find(".thirdSaleInput1").val("").data("employeeId","");
		$("#DiscountTable tbody "+thirdDiscountTrId).find(".thirdSaleInput1").attr("disabled","disabled");
		$("#DiscountTable tbody "+thirdDiscountTrId).find(".thirdSaleInput2").val("").data("employeeId","");
		$("#DiscountTable tbody "+thirdDiscountTrId).find(".thirdSaleInput2").attr("disabled","disabled");
		$("#DiscountTable tbody "+thirdDiscountTrId).find(".discountRemark").children().val("");
		$("#DiscountTable tbody "+thirdDiscountTrId).find(".discountRemark").children().attr("disabled","disabled");
	}
	// 当第三方抵扣的往来单位为空时禁用列
	disabledCol("#DiscountTable tbody tr",".discountSelectUnit",".discountSelectUnitOption")
	// 分期业务新增行
	var stagingHtml='<tr class="text-center stagingRow">'+
 	'<td>'+'<span class="glyphicon glyphicon-trash stagDelete">'+'</span>'+'<span class="stagingId" style="display:none">'+'</span>'+'</td>'+
    '<td class="stagRowNumber">'+'</td>'+
    '<td class="refundMethod">'+
    	'<select class="form-control inputRefundMethod">'+'<option value="1">'+'现金退款'+'</option>'+
		'<option value="2">'+'注销分期'+'</option>'+'</select>'+
    '</td>'+
    '<td class="stagSelectUnit">'+
    	'<select class="form-control stagSelectOption">'+'</select>'+
    '</td>'+
    '<td class="stagBusinessName">'+
    	'<select class="form-control stagBusinessNameOption">'+'</select>'+
    '</td>'+
    '<td>'+'<input type="text" class="form-control stagingAmount" onkeyup="checkInput.checkNum(this,12)"/>'+'</td>'+
    '<td>'+'<input type="text" class="form-control firstPayAmount" onkeyup="checkInput.checkNum(this,12)"/>'+'</td>'+
    '<td>'+'<input type="text" class="form-control stagingNumber" onkeyup="checkInput.checkPositiveInteger(this)"/>'+'</td>'+
    '<td class="stagingLoadAmount">'+'</td>'+
    '<td>'+'<input type="text" class="form-control stagingRefundAmount" onkeyup="checkInput.checkNum(this,12)"/>'+'</td>'+
    '<td>'+'<input type="text" class="form-control commission" onkeyup="checkInput.checkNum(this,12)"/>'+'</td>'+
    '<td class="stagingSales1">'+
    	'<div class="form-group" style="margin:0;">'+
			    '<div class="input-group">'+
			      '<input type="text" class="form-control stagingSaleInput1"  placeholder="请选择营业员">'+
			    '</div>'+	
		    '</div>'+
    '</td>'+
    '<td class="stagingSales2">'+
    	'<div class="form-group" style="margin:0;">'+
			    '<div class="input-group">'+
			      '<input type="text" class="form-control stagingSaleInput2"  placeholder="请选择营业员">'+
			    '</div>'+	
		    '</div>'+
    '</td>'+
    '<td>'+'<input type="text" class="form-control contractNo" />'+'</td>'+
    '<td>'+'<input type="text" class="form-control imeiNo" />'+'</td>'+
    '<td class="stagRemark">'+'<input type="text"  class="form-control">'+'</td>'+
    '<td class="monthSupply">'+'</td>'+
'</tr>'
	$("#stagingBusin").click(function(){
		if($("#StaBuTable").parent().css("display")=="none"){
			$("#StaBuTable").parent().css({display:"block"})
		}else if($("#StaBuTable").parent().css("display")=="block"){
			var rowNumber=0;
			$("#StaBuTable tbody").append(stagingHtml);
			$("#StaBuTable tbody tr").each(function(index,value){
				 $(this).find(".stagRowNumber").text(index+1);
				 $(this).attr("id","stagingRow_"+(index+1));
			})
			var stagingTrId=$("#StaBuTable tbody tr:last").attr("id")
			disabledCol('#'+stagingTrId,".stagSelectUnit",".stagSelectOption");
			$("#StaBuTable tbody "+"#"+stagingTrId).find(".stagSelectOption").html(stagingSelectOption);
			var saleManName=$("#saleInput").val();
			var saleManIds=$("#saleInput").data("employeeId");
			$("#StaBuTable tbody tr:last").find(".stagingSaleInput1").val(saleManName).data('employeeId',saleManIds)
//			$("#StaBuTable tbody tr").each(function(index,value){
//			if($(this).find(".stagingSaleInput1").val()==""){
//				$(this).find(".stagingSaleInput1").val($("#saleInput").val()).data("employeeId",$("#saleInput").data("employeeId"))
//				}
//				if($(this).find(".stagingId").text()!=""){
//					$(this).find("input").attr("disabled","disabled")
//					$(this).find("select").attr("disabled","disabled")
//				}
//				$(this).find(".stagingRefundAmount").removeAttr("disabled")
//				$(this).find(".stagRemark").children().removeAttr("disabled")
//				$(this).find(".inputRefundMethod").removeAttr("disabled")
//			})
		}
	})
	// 分期业务删除行
	$(document).on('click', '.stagDelete', function() {
		if($("#StaBuTable tbody").children().length>1){
			$(this).parent().parent().remove();
			stagingSum()
		}else if($("#StaBuTable tbody").children().length==1){
			clearStagingData("#stagingRow_1");
			stagingSum()
		}
		$("#StaBuTable tbody tr").each(function(index,value){
			 $(this).find(".stagRowNumber").text(index+1);
			 $(this).attr("id","stagingRow_"+(index+1));
		})
//		disabledCol("#StaBuTable tbody tr",".stagSelectUnit",".stagSelectOption")
//		$("#StaBuTable tbody tr").each(function(index,value){
//			if($(this).find(".stagingId").text()!=""){
//				$(this).find("input").attr("disabled","disabled")
//				$(this).find("select").attr("disabled","disabled")
//			}
//			$(this).find(".stagingRefundAmount").removeAttr("disabled")
//			$(this).find(".stagRemark").children().removeAttr("disabled")
//			$(this).find(".inputRefundMethod").removeAttr("disabled")
//		})
	})
	// 商品分期
$(document).on('change', '.stagingCheck',function(){
	if($(this).attr("checked")=="checked"||$(this).attr("checked")==true){
		$(".StaBu").css("display","block");
		$("#StaBusinessImg").children().toggle();
		}
	var stagingChecked=[]
	var stagingSelectUnit=[]
	$("#productInfoTable tbody").find(".staging").find(".stagingCheck").each(function(index,value){
		if($(this).attr("checked")=="checked"||$(this).attr("checked")==true){
			stagingChecked.push(index)
		}
	})
	$("#StaBuTable").find(".stagingRow").each(function(index,value){
		if($(this).find(".stagSelectUnit").children().val()!=""&&$(this).find(".stagSelectUnit").children().val()!="null"
			&&$(this).find(".stagSelectUnit").children().val()!=null
			){
			stagingSelectUnit.push(index)
		}
	})
	if(stagingChecked.length==0&&stagingSelectUnit.length==0){
		$(".StaBu").css("display","none");
		$("#StaBusinessImg").children().toggle();
	}
//	disabledCol("#StaBuTable tbody tr",".stagSelectUnit",".stagSelectOption")
	$("#StaBuTable tbody tr").each(function(index,value){
		if($(this).find(".stagingSaleInput1").val()==""){
		$(this).find(".stagingSaleInput1").val($("#saleInput").val()).data("employeeId",$("#saleInput").data("employeeId"))
		}
	})
})
  // 查询分期商名称
 var stagingSelectOption
	function searchStagingUnit(){
		$.request({
    		type:'GET',
        	url:'/manager/inventory/common/getInstallmentList',
        	dataType:'json',
        	success:function(data){
			 if(data.result==1){
				var  unitOption=data.data.InstallmentList;
				unitOption.map(function(stagingOption,index){
					 stagingSelectOption=stagingSelectOption+'<option value="'+stagingOption.id+'">'+stagingOption.name+'</option>'
				})
				$("#StaBuTable tbody #stagingRow_1").find(".stagSelectUnit").children().html(stagingSelectOption)
			 }else{
				$.zxsaas_plus.showalert('error',data.desc); 
			 }
    		},
    		error:function(){
    			alert('请求失败！')
    		}
    	})
}
	// 查询分期业务名称
	$(document).on('change', '.stagSelectOption',function(){
		var trId=$(this).parent().parent().attr("id")
		if($(this).val()!="null"&&$(this).val()!=undefined){
			searchStagingBussiness($(this).val(),trId)
	    	$(this).parent().parent().find(".stagingAmount").val(0);
			$(this).parent().parent().find(".firstPayAmount").val(0);
			$(this).parent().parent().find(".stagingLoadAmount").text(0);
			$(this).parent().parent().find(".commission").val(0);
			$(this).parent().parent().find(".stagingNumber").val(1);
			$(this).parent().parent().find(".monthSupply").text(0);
			$(this).parent().parent().find(".stagingRefundAmount").val(0);
	    	stagingSum()
	    	$(this).parent().parent().find('.stagingSaleInput1').storeSales({
				sectionId:'storeInput',
				search:false
			}),
			$(this).parent().parent().find('.stagingSaleInput2').storeSales({
				sectionId:'storeInput',
				search:false
			})
		}else{
			$("#"+trId).find("input").val('').attr('disabled',true);
			$("#"+trId).find(".stagingSaleInput1").data("employeeId",'');
			$("#"+trId).find(".stagingSaleInput2").data("employeeId",'');
			$("#"+trId).find(".stagingLoadAmount").text(0);
			$("#"+trId).find(".monthSupply").text(0);
			$("#"+trId).find(".stagBusinessNameOption").html("");
			
//			disabledCol("#StaBuTable tbody tr",".stagSelectUnit",".stagSelectOption")
		}
		$("#StaBuTable tbody tr").each(function(index,value){
			if($(this).find(".stagingSaleInput1").val()==""){
				$(this).find(".stagingSaleInput1").val($("#saleInput").val()).data("employeeId",$("#saleInput").data("employeeId"))
			}
			if($(this).find(".stagSelectOption").val()!="null"&&$(this).find(".stagSelectOption").val()!=''){
				$(this).find("input").attr("disabled",false);
				$('.stagBusinessNameOption').attr('disabled',false);
			}
			if($(this).find(".stagingId").text()!=""){
				$(this).find("input").attr("disabled","disabled")
				$(this).find("select").attr("disabled","disabled")
			}
			if($('#stagingBusin').css('disabled') == "disabled"){
				$(this).find(".stagingRefundAmount").removeAttr("disabled")
				$(this).find(".stagRemark").children().removeAttr("disabled")
			}
//			$(this).find(".inputRefundMethod").removeAttr("disabled")
		})
		$(this).parent().parent().find(".inputRefundMethod").attr('disabled',true).find('option[value="1"]').attr("selected",true)
		stagingSum();
	})
 function searchStagingBussiness(stagingNameId,trId){
		$.request({
    		type:'GET',
    		async: false,
        	url:'/manager/inventory/common/getByStagesList',
        	dataType:'json',
        	data:{
				contactsunitId:stagingNameId
			},
        	success:function(data){
			 if(data.result==1){
				var stagBusinName=data.data.byStagesList;
				var stagName='';
				stagBusinName.map(function(stagBusinNameOpt,index){
					stagName+='<option value="'+stagBusinNameOpt.id+'">'+stagBusinNameOpt.name+'</option>'
				})
				$("#"+trId).find(".stagBusinessName").find(".stagBusinessNameOption").html(stagName)
			 }else{
				$.zxsaas_plus.showalert('error',data.desc); 
			 }
    		},
    		error:function(){
    			alert('请求失败！')
    		}
    	})
	}
// 计算分期总金额、首付总金额、分期贷款总金额、退款总金额、月供
function stagingSum(){
		var stagingAmount=0
		var stagingloeadAmount=0
		var stagingReturnAmount=0
		var stagingMonthSupply=0
		var firstPayAmount=0
	$("#StaBuTable tbody tr").each(function(){
		stagingAmount=accAdd(stagingAmount,Number($(this).find(".stagingAmount").val()))
		firstPayAmount=accAdd(firstPayAmount,Number($(this).find(".firstPayAmount").val()))
		if($(this).find(".stagingLoadAmount").text()!=undefined&&$(this).find(".stagingLoadAmount").text()!=""){
			stagingloeadAmount=accAdd(stagingloeadAmount,Number($(this).find(".stagingLoadAmount").text()))
		}
		stagingReturnAmount=accAdd(stagingReturnAmount,Number($(this).find(".stagingRefundAmount").val()))
		stagingMonthSupply=accAdd(stagingMonthSupply,Number($(this).find(".monthSupply").text()))
	})
	$("#StaBuTable tfoot tr td:eq(4)").text(stagingAmount);
	$("#StaBuTable tfoot tr td:eq(5)").text(firstPayAmount);
	$("#StaBuTable tfoot tr td:eq(7)").text(stagingloeadAmount);
	$("#StaBuTable tfoot tr td:eq(8)").text(stagingReturnAmount);
	$("#StaBuTable tfoot tr td:eq(15)").text(stagingMonthSupply);
	countReturnAmountDue()
}
// 当退款方式发生变化时，计算应退金额
$(document).on("change",".inputRefundMethod",function(){
	countReturnAmountDue()
})
// 当分期金额变化时，计算分期贷款金额
$(document).on("blur",".stagingAmount",function(){
	var countstagingAmount=$(this).val();
	var $
	var countfirstAmount=$(this).parent().parent().find(".firstPayAmount").val();
	if(Number(countstagingAmount)<=Number(countfirstAmount)){
		$.zxsaas_plus.showalert('error',"首付金额必须小于当前的分期金额");
        $(this).parent().parent().find(".firstPayAmount").val(0)
        $(this).trigger('blur')
        return;
	}else{
		var stagingLoanAmount=accSubtr(Number(countstagingAmount),Number(countfirstAmount))
		$(this).parent().parent().find(".stagingLoadAmount").text(stagingLoanAmount)
		var monthSupplyAmount=stagingLoanAmount/Number($(this).parent().parent().find(".stagingNumber").val())
		$(this).parent().parent().find(".monthSupply").text(monthSupplyAmount.toFixed(2))
	}
	stagingSum()
	counterAbledStagingAmount()
	})
	
	//判断可供分期金额
	function counterAbledStagingAmount(){
		var abledStagPayAmount1=accSubtr(Number($(".shouldRdfunded").text()),Number($("#DiscountTable tfoot tr td:eq(5)").text()))
		var abledStagPayAmount2=accSubtr(abledStagPayAmount1,Number($(".retailDeposit").text()))
		var abledStagPayAmount3=accSubtr(abledStagPayAmount2,Number($("#wipingAmount").val()))
		var abledStagPayAmount4=accSubtr(abledStagPayAmount3,Number($("#retailAmount").val()))
		var abledStagPayAmount5=accSubtr(abledStagPayAmount4,Number($("#posAmount").val()))
		var abledStagPayAmount6=accSubtr(abledStagPayAmount5,Number($("#microLetterAmount").val()))
		var abledStagPayAmount7=accSubtr(abledStagPayAmount6,Number($("#alipayAmount").val()))
		var abledStagPayAmount8=accSubtr(abledStagPayAmount7,Number($("#otherAccount").val()))
		var abledStagPayAmount9=accSubtr(abledStagPayAmount8,Number($("#promotionalCoupons").val()))
		var abledStagPayAmount10=accSubtr(abledStagPayAmount9,Number($("#memberStoredValue").val()))
		var abledStagPayAmount11=accSubtr(abledStagPayAmount10,Number($("#pointArrived").val()))
		var abledStagPayAmount=accAdd(abledStagPayAmount11,Number($("#StaBuTable tfoot tr td:eq(5)").text()))
		if(Number($(".stagingTotalAmount").text())>Number(abledStagPayAmount)){
			$.zxsaas_plus.showalert('error',"分期总金额必须小于可供分期金额");
		}
	}

// 当首付金额变化时，计算分期贷款金额
$(document).on("blur",".firstPayAmount",function(){
	var countstagingAmount=$(this).parent().parent().find(".stagingAmount").val();
	var countfirstAmount=$(this).val();
		var stagingLoanAmount=accSubtr(Number(countstagingAmount),Number(countfirstAmount))
		$(this).parent().parent().find(".stagingLoadAmount").text(stagingLoanAmount)
		var monthSupplyAmount=stagingLoanAmount/Number($(this).parent().parent().find(".stagingNumber").val())
		$(this).parent().parent().find(".monthSupply").text(monthSupplyAmount.toFixed(2))
	stagingSum()
})
// 当分期数发生变化时，计算月供
$(document).on('blur','.stagingNumber',function(){
	var monthSupplyAmount=Number($(this).parent().parent().find(".stagingLoadAmount").text())/$(this).val()
	$(this).parent().parent().find(".monthSupply").text(monthSupplyAmount.toFixed(2))
	stagingSum()
})
// 当首付金额变化时，计算分期贷款金额
$(document).on("blur",".firstPayAmount",function(){
	var countstagingAmount=$(this).parent().parent().find(".stagingAmount").val();
	var countfirstAmount=$(this).val();
	if(Number(countstagingAmount)<=Number(countfirstAmount)){
		$.zxsaas_plus.showalert('error',"首付金额必须小于当前的分期金额");
        $(this).val(0)
        $(this).trigger('blur')
        return;
	}else{
		var stagingLoanAmount=accSubtr(Number(countstagingAmount),Number(countfirstAmount))
		$(this).parent().parent().find(".stagingLoadAmount").text(stagingLoanAmount)
		var monthSupplyAmount=stagingLoanAmount/Number($(this).parent().parent().find(".stagingNumber").val())
		$(this).parent().parent().find(".monthSupply").text(monthSupplyAmount.toFixed(2))
	}
	stagingSum()
})

// 当退款金额发生变化时，计算退款总额
$(document).on("blur",".stagingRefundAmount",function(){
	stagingSum()
})

// 清空分期业务的值
function clearStagingData(stagingTrId){
	$("#StaBuTable tbody "+stagingTrId).find(".stagingId").text("");
	$("#StaBuTable tbody "+stagingTrId).find(".inputRefundMethod").val("");
	$("#StaBuTable tbody "+stagingTrId).find(".stagSelectOption").val("");
	$("#StaBuTable tbody "+stagingTrId).find(".stagBusinessNameOption").val("");
	$("#StaBuTable tbody "+stagingTrId).find(".stagBusinessNameOption").children().html("");
	$("#StaBuTable tbody "+stagingTrId).find(".stagBusinessNameOption").attr("disabled","disabled");
	$("#StaBuTable tbody "+stagingTrId).find(".stagingAmount").val("");
	$("#StaBuTable tbody "+stagingTrId).find(".stagingAmount").attr("disabled","disabled");
	$("#StaBuTable tbody "+stagingTrId).find(".firstPayAmount").val("");
	$("#StaBuTable tbody "+stagingTrId).find(".firstPayAmount").attr("disabled","disabled");
	$("#StaBuTable tbody "+stagingTrId).find(".stagingLoadAmount").text("");
	$("#StaBuTable tbody "+stagingTrId).find(".stagingNumber").val("");
	$("#StaBuTable tbody "+stagingTrId).find(".stagingNumber").attr("disabled","disabled");
	$("#StaBuTable tbody "+stagingTrId).find(".stagingRefundAmount").val("");
	$("#StaBuTable tbody "+stagingTrId).find(".stagingRefundAmount").attr("disabled","disabled");
	$("#StaBuTable tbody "+stagingTrId).find(".commission").val("");
	$("#StaBuTable tbody "+stagingTrId).find(".commission").attr("disabled","disabled");
	$("#StaBuTable tbody "+stagingTrId).find(".contractNo").val("");
	$("#StaBuTable tbody "+stagingTrId).find(".contractNo").attr("disabled","disabled");
	$("#StaBuTable tbody "+stagingTrId).find(".stagRemark").children().val("");
	$("#StaBuTable tbody "+stagingTrId).find(".stagRemark").children().attr("disabled","disabled");
	$("#StaBuTable tbody "+stagingTrId).find(".imeiNo").val("");
	$("#StaBuTable tbody "+stagingTrId).find(".imeiNo").attr("disabled","disabled");
	$("#StaBuTable tbody "+stagingTrId).find(".stagingSaleInput1").val("").data("employeeId","");
	$("#StaBuTable tbody "+stagingTrId).find(".stagingSaleInput1").attr("disabled","disabled");
	$("#StaBuTable tbody "+stagingTrId).find(".stagingSaleInput2").val("").data("employeeId","");
	$("#StaBuTable tbody "+stagingTrId).find(".stagingSaleInput2").attr("disabled","disabled");
	$("#StaBuTable tbody "+stagingTrId).find(".monthSupply").text(0);
}
// 当分期业务的分期商名称为空时禁用列
disabledCol("#StaBuTable tbody tr",".stagSelectUnit",".stagSelectOption")
 // 列禁用
function disabledCol(tableTrName,trName,selectName){
  		$(tableTrName).each(function(index,value){
  			if($(this).find(trName).find(selectName).val()=="null"||
  					$(this).find(trName).find(selectName).val()==undefined||
  					$(this).find(trName).find(selectName).val()==""){
  					$(this).find("input").val("");
  				$(this).find("select").val("");
  				$(this).find("input").attr("disabled",true);
  				$(this).find("select").attr("disabled",true);
  				$(this).find(trName).find(selectName).attr("disabled",false)
  			}else{
  				$(this).find("input").attr("disabled",false);
  				$(this).find("select").attr("disabled",false);
  			}
  		})
	}

  // 当抹零金额发生变化时，计算应收金额
   $(document).on('change','#wipingAmount',function(){
	   countReturnAmountDue()
 })
 // 当现金发生变化时，计算实收金额
  $(document).on('change','#retailAmount',function(){
	  countPayAmount()
	  
 })
 // 当pos机金额发生变化时，计算实收金额
 $(document).on('change','#posAmount',function(){
	 countPayAmount()
	  
 })
 $(document).on("blur","#posTable .paymentAmount input",function(){
	 if($(this).val()==""){
		 $(this).val(0) 
	 }
 })
 // 当支付宝金额发生变化时，计算实收金额
  $(document).on('change','#alipayAmount',function(){
	  countPayAmount()
	  
 })

 // 当微信金额发生变化时，计算实收金额
 $(document).on('change','#microLetterAmount',function(){
	 countPayAmount()
	  
 })
 // 当其他账户金额发生变化时，计算实收金额
 $(document).on('change','#otherAccount',function(){
	 countPayAmount()
	  
 })
  $(document).on("blur","#otherCounterTable .paymentAmount input",function(){
	 if($(this).val()==""){
		 $(this).val(0) 
	 }
 })
 // 当促销券金额发生变化时，计算实收金额
  $(document).on('change','#promotionalCoupons',function(){
	  countPayAmount()
	  
 })
 // 当会员储值发生变化时，计算实收金额
 $(document).on('change','#memberStoredValue',function(){
	 countPayAmount()
	  
 })
 // 当积分抵现金额发生变化时，计算实收金额
 $(document).on('change','#pointArrived',function(){
	 countPayAmount()
	  
 })
	// 计算应退款总计
   function countAmount(callBack,arrearsCallBack,useCallBack){
	   var productDisountAmount=$("#productInfoTable tfoot tr td:eq(6)").text()
	   var businessPayAmount=$("#carrBusinTable #carrTotal_2").text()
	   var addValuePayAmount=$("#Value-addedTable tfoot tr td:eq(3)").text()
	   var retailAmount1=accAdd(productDisountAmount,Number(businessPayAmount))
	   var retailAmount=accAdd(retailAmount1,Number(addValuePayAmount))
	   $(".shouldRdfunded").text(retailAmount);
	   countReturnAmountDue()
   }
 // 计算应退款
   
   function countAmountDue(){
	 var retailBillsAmount=$(".billsAmount").text();
	 var retailDisountAmountSum=$("#DiscountTable tfoot tr td:eq(4)").text();
	 var retailStagingAmountSum=$("#StaBuTable tfoot tr td:eq(5)").text();
	 var retailDepositAmountSum=$(".retailDeposit").text();
	 var retailWipingAmount=$("#wipingAmount").val();
	 var retailArrialAmount=$('.arrialAmount').text();
	 var retailAmountDue1=accSubtr(Number(retailBillsAmount),Number(retailDisountAmountSum))
	 var retailAmountDue2=accSubtr(retailAmountDue1,Number(retailStagingAmountSum))
	 var retailAmountDue3=accSubtr(retailAmountDue2,Number(retailDepositAmountSum))
	 var retailAmountDue=accSubtr(retailAmountDue3,Number(retailWipingAmount))
	 retailAmountDue=accSubtr(retailAmountDue,Number(retailArrialAmount))
	 $(".amountDue").text(retailAmountDue)
   }
   
 //计算应退款
   function countReturnAmountDue(){
	   var returnProAmount=$(".shouldRdfunded").text(); // 应退款总计
	   var returndiscountSum=$("#DiscountTable tfoot tr td:eq(4)").text();	// 第三方抵扣退回金额
	   var returnAddValueAmount=$("#Value-addedTable tfoot tr td:eq(3)").text();	// 增值服务退款金额
	   var statabsum = $(".statotalsum").text()*1;	// 分期业务贷款金额
	   $("#StaBuTable tbody tr").each(function(index,item){
		   if($(item).find(".inputRefundMethod").val()=="1"){
			   statabsum = accSubtr(statabsum,Number($(item).find(".stagingRefundAmount").val()))
		   }
	   })
	 var retailAmountDue1=accSubtr(Number(returnProAmount),Number(returndiscountSum))
	 var retailAmountDue2=accSubtr(Number(retailAmountDue1),Number(statabsum))
	 var retailreturnAmountDue=accSubtr(retailAmountDue2,Number($("#wipingAmount").val()))
	 $(".amountDue").text(retailreturnAmountDue);	// 应退
	 countAmountOfArrears()
   }
   // 计算退款
   function countPayAmount(countArrearsCallBack,symbol){
	   var cashAmount=$("#retailAmount").val();
	   var posAmountSum=$("#posAmount").val();
	   var alipayAmountSum=$("#alipayAmount").val();
	   var microletterAmountSum=$("#microLetterAmount").val();
	   var otherAmountSum=$("#otherAccount").val();
	   var PromotionalCouponsAmount=$("#promotionalCoupons").val();
	   var MembersStoredValueAmount=$("#memberStoredValue").val();
	   var pointArrivedAmount=$("#pointArrived").val();
	   var retailPayAmount1=accAdd(Number(cashAmount),Number(posAmountSum))
	   var retailPayAmount2=accAdd(retailPayAmount1,Number(alipayAmountSum))
	   var retailPayAmount3=accAdd(retailPayAmount2,Number(microletterAmountSum))
	   var retailPayAmount4=accAdd(retailPayAmount3,Number(otherAmountSum))
	   var retailPayAmount5=accAdd(retailPayAmount4,Number(PromotionalCouponsAmount))
	   var retailPayAmount6=accAdd(retailPayAmount5,Number(MembersStoredValueAmount))
	   var retailPayAmount=accAdd(retailPayAmount6,Number(pointArrivedAmount))          
	   $(".paidAmount").text(retailPayAmount)
	   countAmountOfArrears()
   }
   // 计算未退
   function countAmountOfArrears(){
	  var  totalAmountDocuments=$(".amountDue").text()
	  var  actualAmountDocuments=$(".paidAmount").text()
	  var  arrearsDocuments=accSubtr(Number(totalAmountDocuments),Number(actualAmountDocuments))
	  $(".arrears").text(arrearsDocuments)
   }
	// 查询可使用资金账户
  function abledUseAccount(data){
	  if(data!=""&&data!=null&&data!=undefined){
		$.request({
    		type:'POST',
    		async: false,
        	url:'/manager/inventory/retail/delivery/getAccountList',
        	dataType:'json',
        	data:{
				sectionId:data
			},
        	success:function(data){
			 if(data.result==1){
				var abledAccountList=data.data.accountList;
				 var accountBankHtml
				 var otherAccountHtml
				var accountoption=[];
				 var posAmountListArry=[]
				 var otherAmountListArry=[]
				for(var i=0;i<abledAccountList.length;i++){
					var accountModel={
							accounTypeCode:"",
							accounTypeName:"",
							id:"",
							name:""
								}
					accountModel.accounTypeCode=abledAccountList[i].accounTypeCode;
					accountModel.accounTypeName=abledAccountList[i].accounTypeName;
					accountModel.id=abledAccountList[i].id;
					accountModel.name=abledAccountList[i].name;
					accountoption.push(accountModel)
				}
				var accountListOption=[]
				for(var i=0;i<accountoption.length;i++){
					accountListOption.push(accountoption[i].accounTypeName)
				}
				var accountCashId
				var accountAppliedId
				var accountMicrId
				for(var j=0;j<accountoption.length;j++){
					if(accountoption[j].accounTypeName=="现金"){
						accountCashId=accountoption[j].id
					} 
					if(accountoption[j].accounTypeName=="支付宝"){
						accountAppliedId=accountoption[j].id
					} 
					if(accountoption[j].accounTypeName=="微信"){
						accountMicrId=accountoption[j].id
					}
				}
				if(accountListOption.indexOf("现金")>=0){
					$("#retailAmount").removeAttr("disabled");
					$("#retailAmount").attr("cashId",accountCashId)
				}else{
					$("#retailAmount").attr("disabled","disabled");
					$("#retailAmount").removeAttr("cashId")
				}
				if(accountListOption.indexOf("支付宝")>=0){
					$("#alipayAmount").removeAttr("disabled");
					$("#alipayAmount").attr("applyId",accountAppliedId)
				}else{
					$("#alipayAmount").attr("disabled","disabled");
					$("#alipayAmount").removeAttr("applyId")
				}
				if(accountListOption.indexOf("微信")>=0){
					$("#microLetterAmount").removeAttr("disabled");
					$("#microLetterAmount").attr("micrId",accountMicrId)
				}else{
					$("#microLetterAmount").attr("disabled","disabled");
					$("#microLetterAmount").removeAttr("micrId")
				}
				
				accountoption.map(function(accOpt,index){
					var posTotalAmountModal={
							 accountName:"",
							 payreceiptAmout:"",
							 id:"",
					 }
					 var otherTotalAmountModal={
							 accountName:"",
							 payreceiptAmout:"",
							 id:"", 
					 }
					if(accOpt.accounTypeName=="银行"){
						  posTotalAmountModal.accountName=accOpt.name,
						  posTotalAmountModal.id=accOpt.id
						  posAmountListArry.push(posTotalAmountModal)
					  }
					 if(accOpt.accounTypeName=="其它"){
						 otherTotalAmountModal.accountName=accOpt.name,
						 otherTotalAmountModal.id=accOpt.id
						 otherAmountListArry.push(otherTotalAmountModal)
					 }
				})
				if(posAmountListArry.length>0){
					  $("#posAmount").removeAttr("disabled")
					  $("#posAmount").attr("readonly","readonly")
					  $("#posTable tbody tr").each(function(index,value){
						  $(this).remove()
					  })
					  posAmountListArry.map(function(posTotalOpt,index){
						  var accountTotalHtml='<tr class="text-center">'+'<td class="order">'+(index+1)+'<span class="orderNumber">'+'</span>'+'<span class="accountId" style="display:none">'+posTotalOpt.id+'</span>'+'</td>'+'<td>'+'<span>'+posTotalOpt.accountName+'</span>'+'</td>'+'<td class="paymentAmount">'+'<input type="text" class="form-control" value="0" onkeyup="checkInput.checkNum(this,12)"/>'+'</td>'+'</tr>'
						 $("#posTable tbody").append(accountTotalHtml)
					  })
				  }else{
					  $("#posAmount").attr("disabled","disabled") 
				  }
				  if(otherAmountListArry.length>0){
					  $("#otherAccount").removeAttr("disabled")
					  $("#otherAccount").attr("readonly","readonly")
					  $("#otherCounterTable tbody tr").each(function(index,value){
						  $(this).remove()
					  })
					   otherAmountListArry.map(function(otherTotalOpt,index){
						  var otherAccountTotalHtml='<tr class="text-center">'+'<td class="order">'+(index+1)+'<span class="orderNumber">'+'</span>'+'<span class="accountId" style="display:none">'+otherTotalOpt.id+'</span>'+'</td>'+'<td>'+'<span>'+otherTotalOpt.accountName+'</span>'+'</td>'+'<td class="paymentAmount">'+'<input type="text" class="form-control" value="0" onkeyup="checkInput.checkNum(this,12)"/>'+'</td>'+'</tr>'
						  $("#otherCounterTable tbody").append(otherAccountTotalHtml)
					  })
				  }else{
					  $("#otherAccount").attr("disabled","disabled") 
				  }
				
				var htmlHeight=$(".posContentTable").height()
				$(".posContentTable").css("top","-"+(htmlHeight+65)+"px")
					
				
				var otherHtmlHeight=$(".otherContentTable").height()
				$(".otherContentTable").css("top","-"+(otherHtmlHeight+65)+"px")
				}else{
				$.zxsaas_plus.showalert('error',data.desc); 
			 }
    		},
    		error:function(){
    			alert('请求失败！')
    		}
    	})
	  }
	}
	$("#otherAccount").click(function(){
		if($("#otherCounterTable tbody tr").length>0){
			$(".otherContentTable").css("display","block")
		}
	})
	$("#otherAmountNone").click(function(){
    	$(".otherContentTable").css("display","none")
    })
	$("#posAmount").click(function(){
	if($("#posTable tbody tr").length>0){
		$(".posContentTable").css("display","block")
		}
		})
	$("#postAmountNone").click(function(){
	    	$(".posContentTable").css("display","none")
	    })
	    
	    getRetailAmountFun();
	$(document).on('blur','#retailAmount',function(){
		getRetailAmountFun()
	})
    var getRetailAmountModel
	function getRetailAmountFun(){
		if($("#retailAmount").attr("cashId")!=undefined&&$("#retailAmount").attr("cashId")!=null){
		var retailAmount={
				accountId:Number($("#retailAmount").attr("cashId")),
				payreceiptAmout:Number($("#retailAmount").val()),
			}
			  return getRetailAmountModel=retailAmount
			  }
	     }
	getAppliedFun()
	$(document).on('blur','#alipayAmount',function(){
		getAppliedFun()
	})
	var getAppliedModel
	function getAppliedFun(){
		if($("#alipayAmount").attr("applyId")!=undefined&&$("#alipayAmount").attr("applyId")!=null){
		var appliedAmount={
				accountId:Number($("#alipayAmount").attr("applyId")),
				payreceiptAmout:Number($("#alipayAmount").val()),
			}
				  return getAppliedModel=appliedAmount
			  }
	}
	getMicrAmount();
	$(document).on('blur','#microLetterAmount',function(){
		getMicrAmount();
	})
	var getMicrModel
	function getMicrAmount(){
		 if($("#microLetterAmount").attr("micrId")!=undefined&&$("#microLetterAmount").attr("micrId")!=null){
		var micrAmount={
				accountId:Number($("#microLetterAmount").attr("micrId")),
				payreceiptAmout:Number($("#microLetterAmount").val()),
			}
			  return getMicrModel=micrAmount
			  }
	}
	var payListArry=[]
	    $(document).on('click','#postAmountSure',function(){
	     payListArry=[];
	     var bankAmount=0;
	    if($("#posTable tbody tr").length>0){
	        $("#posTable tbody tr").each(function(index,value){
	            	bankAmount=accAdd(bankAmount,$(this).find(".paymentAmount").children().val()*1)
	            })
	       }
	     $("#posTable tbody tr").each(function(index,value){
	           var payListModel={
	            	accountId:"",
	            	payreceiptAmout:""
	           }
	          payListModel.accountId=Number($(this).find(".accountId").text())
	          payListModel.payreceiptAmout=Number($(this).find(".paymentAmount").children().val())
	          payListArry.push(payListModel)
	           })
	          if(bankAmount!=null){
	            	$("#posAmount").val(bankAmount)
	            	$(".posContentTable").css("display","none")
	          }
	            	countPayAmount(countAmountOfArrears,true)	
	           })
	    
	
	var otherAccountArry=[]
    $(document).on('click','#otherAmountSure',function(){
    	var otherAccountMoneyAmount=0;
    	otherAccountArry=[];
    	if($("#otherCounterTable tbody tr").length>0){
    		$("#otherCounterTable tbody tr").each(function(index,value){
    			otherAccountMoneyAmount=accAdd(otherAccountMoneyAmount,$(this).find(".paymentAmount").children().val()*1)
			})
    	}
    	
    		var otherAccountListArry=[]
    		$("#otherCounterTable tbody tr").each(function(index,value){
    			var payListModel={
    	    			accountId:"",
    	    			payreceiptAmout:""
    	    		}
    			payListModel.accountId=Number($(this).find(".accountId").text())
    			payListModel.payreceiptAmout=Number($(this).find(".paymentAmount").children().val())
    			otherAccountArry.push(payListModel)
    			})
    			
    	if(otherAccountMoneyAmount!=null){
    		$("#otherAccount").val(otherAccountMoneyAmount)
    		$(".otherContentTable").css("display","none")
    	}
    		countPayAmount(countAmountOfArrears,true)
    })
   
    
    // 获取零售页面的值
  var  getRetailDetailModel
    function getRetailValue(){
		// 商品明细
		var detailListArry=[];
		$("#productInfoTable tbody tr").each(function(){
			var productInfoModel={
					oldRetailDetailId:null,
					orderno:"",
					isGift:0,
					goodsId:null,
					imeiName:"",
					ifManageImei:0,
				    auxliaryImei:"",
					goodsNumber:"",
					amount:0,
					salesman1:null,
					salesman2:null,
					busId:null,
					isInstall:0,
					remark:"",
					storageId:null,
					price:0
			}
			if($(this).attr("class").toString().indexOf("addGiftslastRow")<0){
				productInfoModel.oldRetailDetailId=$(this).find(".proOrderId").text()==""?null:Number($(this).find(".proOrderId").text())
				productInfoModel.orderno=$(this).find(".productRowNumber").text();
				productInfoModel.isGift=($(this).find(".changeGift").attr("checked")==true||$(this).find(".changeGift").attr("checked")=="checked")?1:0;
				productInfoModel.goodsId=$(this).find(".goodsId").text()==""?null:Number($(this).find(".goodsId").text());
				productInfoModel.imeiName=$(this).find(".inputImeiInfo").val()==""?"":$(this).find(".inputImeiInfo").val();
				productInfoModel.ifManageImei=$(this).find(".imeiMange").text() == "√" ? 1 : 0;
				productInfoModel.auxliaryImei=$(this).find(".inputAuxImeiInfo").val()==""?"":$(this).find(".inputAuxImeiInfo").val();
				productInfoModel.goodsNumber=0-Number($(this).find(".inputProductNum").val());
				productInfoModel.amount=0-Number($(this).find(".inputReturnProductPrice").val());
				productInfoModel.salesman1=Number($(this).find(".saleInput1").data("employeeId"));
				productInfoModel.salesman2=Number($(this).find(".saleInput2").data("employeeId"));
				productInfoModel.busId=$(this).find(".businessMac").find(".selectpicker").val()==undefined?null:Number($(this).find(".businessMac").find(".selectpicker").val());
				productInfoModel.isInstall=($(this).find(".stagingCheck").attr("checked")==true||$(this).find(".stagingCheck").attr("checked")=="checked")?1:0
				productInfoModel.remark=$(this).find(".productRemark").children().val();
				productInfoModel.storageId=$(this).find(".stroageSelect").val()*1;
				productInfoModel.price=Number($(this).find(".productPrice").text());
				detailListArry.push(productInfoModel)
				
			}
		})
		// 运营商业务明细
		var busListArry=[]
		 $("#carrBusinTable tbody tr").each(function(index,value){
			 var busListModel={
					 oldRetailBusId:null,
						busId:null,
						busAmount:"",
						busNo:"",
						tel:"",
						telImei:"",
						debuBond:"",
						salesman1:"",
						salesman2:"",
						commissionWill:"",
                 qty:"",
						remark:""
					}
			 busListModel.oldRetailBusId=$(this).find(".carrId").text()==""?null:Number($(this).find(".carrId").text())
			 busListModel.busId= $(this).find(".carrSlectNameInput").data('id')
			 busListModel.busAmount=0-Number($(this).find(".inputrefundsAmount").val());
			 busListModel.busNo=$(this).find(".businessNum").children().val();
			 busListModel.tel=$(this).find(".carrTelephone").children().val();
			 busListModel.telImei=$(this).find(".telephoneImei").children().val();
			 busListModel.debuBond=0-Number($(this).find(".discountMargin").children().val());
			 busListModel.salesman1=Number($(this).find(".carrSaleInput1").data("employeeId"));
			 busListModel.salesman2=Number($(this).find(".carrSaleInput2").data("employeeId"));
             busListModel.qty=Number($(this).find(".qty").children().val());
			 busListModel.commissionWill=0-Number($(this).find(".inputcomissionEsit").val());

	         busListModel.remark=$(this).find(".carrRemark").children().val();
	         busListArry.push(busListModel)
		 })
		 // 增值业务明细
		var serviceListArry=[];
		$("#Value-addedTable tbody tr").each(function(index,value){
			 var addValueModel={
					 oldRetailServiceId:null,
						serviceId:null,
						salesman1:"",
						serviceAmount:"",
						stratDate:"",
						salesman2:"",
						remark:"",
						userNum:"",
						serviceDue:""
					};
			 addValueModel.oldRetailServiceId=$(this).find(".addValueId").text()==""?null:Number($(this).find(".addValueId").text())
			addValueModel.serviceId=$(this).find(".addValueSelectId").text()==""?null:Number($(this).find(".addValueSelectId").text())
			addValueModel.salesman1=Number($(this).find(".addValueSaleInputId").text());
			addValueModel.serviceAmount=0-Number($(this).find(".realPayment").children().val());
			addValueModel.stratDate=$(this).find(".effectiveDate").val()==""?null:$(this).find(".effectiveDate").val();
			addValueModel.salesman2=$(this).find(".addValueSaleInput2Id").text()==""?null:Number($(this).find(".addValueSaleInput2Id").text());
			addValueModel.remark=$(this).find(".valueRemark").children().val()
			addValueModel.userNum=$(this).find(".usageCount").text()==""?-1:Number($(this).find(".usageCount").text());
			addValueModel.serviceDue=$(this).find(".limitDate").text()==""?-1:Number($(this).find(".limitDate").text());
			serviceListArry.push(addValueModel)
		})
		// 第三方抵扣明细
		var couponListArry=[]
		 $("#DiscountTable tbody tr").each(function(index,value){
			 var couponListModel={
					 oldRetailCouponId:null,
						couponId:null,
						amount:"",
                 settleAmount:"",
						busNo:"",
						salesman1:"",
						salesman2:"",
						remark:""
					}
			 couponListModel.oldRetailCouponId=$(this).find(".thirdDiscountId").text()==""?null:Number($(this).find(".thirdDiscountId").text())
			 couponListModel.couponId=$(this).find(".discountActiveNameOption").val()==undefined?0:Number($(this).find(".discountActiveNameOption").val());
			 couponListModel.amount=0-Number($(this).find(".inputthirdReturnAmount").val());
			 couponListModel.settleAmount=0-Number($(this).find(".settleAmountInput").val());
			 couponListModel.busNo=$(this).find(".thirdBusinNum").children().val();
			 couponListModel.salesman1=Number($(this).find(".thirdSaleInput1").data("employeeId"));
			 couponListModel.salesman2=Number($(this).find(".thirdSaleInput2").data("employeeId"));
			 couponListModel.remark=$(this).find(".discountRemark").children().val();
			 couponListArry.push(couponListModel)
		 })
		 // 分期业务明细
		var installListArry=[]
		$("#StaBuTable tbody tr").each(function(index,value){
			var installListModel={
					oldRetailInstallId:null,
					installId:null,
					amount:"",
					installAmount:"",
					installmentBalance:"",
					installmentCount:"",
					commissionWill:"",
					busNo:"",
					imei:"",
					salesman1:"",
					salesman2:"",
					remark:"",
					monthsPay:"",
					retType:1
				}
			installListModel.oldRetailInstallId=$(this).find(".stagingId").text()==""?null:Number($(this).find(".stagingId").text())
			installListModel.installId=$(this).find(".stagBusinessNameOption").val()=="null"?0:Number($(this).find(".stagBusinessNameOption").val());
			installListModel.amount=0-Number($(this).find(".stagingAmount").val());                             
			installListModel.installAmount=0-Number($(this).find(".firstPayAmount").val());
			installListModel.installmentBalance=0-Number($(this).find(".stagingRefundAmount").val());
			installListModel.installmentCount=Number($(this).find(".stagingNumber").val());
			installListModel.commissionWill=0-Number($(this).find(".commission").val());
			installListModel.busNo=$(this).find(".contractNo").val()
			installListModel.imei=$(this).find(".imeiNo").val()
			installListModel.salesman1=Number($(this).find(".stagingSaleInput1").data("employeeId"));
			installListModel.salesman2=Number($(this).find(".stagingSaleInput2").data("employeeId"));
			installListModel.remark=$(this).find(".stagRemark").children().val();
			installListModel.monthsPay=0-Number($(this).find(".monthSupply").text());
			installListModel.retType=Number($(this).find(".inputRefundMethod").val());
			installListArry.push(installListModel)
		})
		// 资金账户明细
		var payAccountArry=[]
	    getRetailAmountFun();
		if(getRetailAmountModel!=undefined){
		 payAccountArry.push(getRetailAmountModel)
		}
		getAppliedFun();
		if(getAppliedModel!=undefined){
			payAccountArry.push(getAppliedModel)
		}
		
		getMicrAmount();
		if(getMicrModel!=undefined){
			payAccountArry.push(getMicrModel)
		}
		$('#postAmountSure').click();
		$('#otherAmountSure').click();
		if(otherAccountArry.length>0){
			for(var i=0;i<otherAccountArry.length;i++){
				payAccountArry.push(otherAccountArry[i])
			}
			
		}
		if(payListArry.length>0){
			for(var j=0;j<payListArry.length;j++){
				payAccountArry.push(payListArry[j])
			}
			
		}
		
		var getRetailValModel={
				id:$("#retailBillsId").val()==""||$("#retailBillsId").val()==undefined?null:Number($("#retailBillsId").val()),
				retailId: $("#retailId").val()==""?null:Number($("#retailId").val()),
				sectionId:Number($("#storeInput").data("sectionId")),
				salesmanId:Number($("#saleInput").data("employeeId")),
            	contactsunitId: $('#contactsunitId').data('contactUnitId')*1,
				customerId:$("#retailCardNum").data("vipId")==undefined?null:$("#retailCardNum").data("vipId"),
				customerName:$("#vipName").val(),
				totDepositAmount:0,
				customerTel:$("#retailCardNum").val(),
				billsDate:$("#dateInput").val(),
				totAmount:Number($(".shouldRdfunded").text()),
				reduceAmout:0-Number($("#wipingAmount").val()),
				vipAmount:0-Number($("#memberStoredValue").val()),
				integralAmount:0-Number($("#pointArrived").val()),
				voucherAmount:0-Number($("#promotionalCoupons").val()),
				totPayAmount:0-Number($(".paidAmount").text()),
				totDebtAmount:Number($(".arrears").text()),
				totRecAmount:Number($(".amountDue").text()),
				remark:$("#retailRemark").val(),
				detailList:detailListArry,
				busList:busListArry,
				serviceList:serviceListArry,
				couponList:couponListArry,
				installList:installListArry,
				payList:payAccountArry
		}
		return getRetailDetailModel=getRetailValModel
	}
 
   
// 引入原单
 $(document).on("click",'#importOrBills',function(){
	 if($("#storeInput").data("sectionId")==""||$("#storeInput").data("sectionId")==undefined){
		 $.zxsaas_plus.showalert('error','请先选择门店'); 
		 return
	 }else{
		 var sinp = $('#storeInput').val();
		 var sid = $('#storeInput').data('sectionId');
		 $('.origstore').text(sinp).data('id',sid);
		 $("#importOriginalBills").modal("show")
		 $("#importOriginalTab").jqGrid('setGridParam', {
			datatype:'json',
			page:1,
			rows:10,
		 	postData:{
				startTime: $('#startTime').val(),
				endTime: $('#endTime').val(),
				accessSectionIds: $('.origstore').data('id')
			}
		}).trigger("reloadGrid");
		 $("#importOriginalBills").resize();
	 }
 })
 
// 原单查询
 $('#origbtn').click(function(){
	 $("#importOriginalTab").jqGrid('setGridParam', {
			datatype:'json',
			page:1,
			rows:10,
			postData:{
				startTime: $('#startTime').val(),
				endTime: $('#endTime').val(),
				accessSectionIds: $('.origstore').data('id'),
				keyWord: $('#origSearch').val()
			}
		}).trigger("reloadGrid");
 })
 
  // 加载选择原零售单表格
    $.jgrid.defaults.width = 1280;
    $.jgrid.defaults.responsive = true;
    $.jgrid.defaults.styleUI = 'Bootstrap';
    var lastrow = null,lastcell = null;
    var selectData={
    		selectReturnBillsRowId:"",
    		selectReturnBillNum:""
    }
	$('#importOriginalTab').jqGrid({
		 	url:'/manager/inventory/retail/returnGoods/loadRetailOrder',
		    mtype: "POST",
		    datatype: "local",
		    jsonReader: {
		        root: "data.rows", 
		        total: "data.total",
		        records: "data.records",
		        repeatitems: false
		    },
	    colNames:['单据id','零售单号','业务日期','会员卡号','客户姓名','客户电话','门店','营业员','制单人','制单时间'],
	    colModel:[
	        {name: 'orderId', index: 'orderId', width:80, align: 'center',sortable: false,hidden:true},
	        {name: 'billsCode', index: 'billsCode', width:200, align: 'center',sortable: false,},
	        {name: 'billsDate', index: 'billsDate', width:120, align: 'center', sortable: false},
	        {name: 'memberCardNo', index: 'memberCardNo', width:100, align: 'center', sortable: false,hidden:false},
	        {name: 'memberName', index: 'memberName', width:120, align: 'center', sorttype: 'string', sortable: false},
	        {name: 'memberTelephone', index: 'memberTelephone', width:120, align: 'center', sortable: false},
	        {name: 'sectionName', index: 'sectionName', width:100, align: 'center', sortable: false},
	        {name: 'saleManName1', index: 'saleManName1', width:100, align: 'center', sortable: false},
	        {name: 'createName', index: 'createName', width:100, align: 'center', sortable: false},
	        {name: 'createTime', index: 'createTime', width:200, align: 'center', sortable: false}
	    ],
	    cellsubmit:'clientArray', // 单元格保存内容的位置
	    editurl:'clientArray',
	    rowNum:10,
	    rownumbers:true,
	    pager:'#importOrigridpager',
	    rowList:[10, 15, 20, 25, 40],
	    viewrecords:true,
	    multiselect:true,
	    width:	"auto",
	    height:	350,
	    autowidth:true,
	    rownumWidth:35,
	    shrinkToFit:false,
	    beforeEditCell: function(rowid, cellname, v, iRow, iCol){
	        lastrow = iRow;
	        lastcell = iCol;
	    },
	    onSelectRow: function(id){
	    	var rowBillsData=$("#importOriginalTab").jqGrid('getRowData',id)
	    	selectData.selectReturnBillsRowId=rowBillsData.orderId
	        selectData.selectReturnBillNum=rowBillsData.billsCode
	        return selectData
	    },
	    beforeSelectRow: function(rowid,e){
	    	$('#importOriginalTab').jqGrid('resetSelection') 
			return(true);
	    },
	    gridComplete:function(){
	    	$("#importOriginalTab").setLabel(0,'序号')
	    	$("#importOriginalTab").setLabel(1,'操作')
	    }
	})
	
	// 点击弹出框的确定时请求的引入原单的数据
	$(document).on("click",'#sureImportBills',function(){
		var ids = $("#importOriginalTab").jqGrid('getGridParam','selarrrow');
		if(ids.length != 1){
			$.zxsaas_plus.showalert("提示","请选择一条数据");
			return
		}
		resetRetailBills();
		$('#productInfoTable tbody').html(productInfoHtml);
		$('#productInfoTable tbody tr').attr('id','addproductInfo_1');
		$('#addproductInfo_1').find('.productRowNumber').text(1);
		$.request({
    		type:'POST',
        	url:'/manager/inventory/retail/delivery/loadDraftOrder',
        	dataType:'json',
        	data:{"id":selectData.selectReturnBillsRowId},
        	success:function(data){
				if(data.result==1){
					 var transDraftData=data.data.obj;
					 var list = transDraftData.detailList;
					 fillData(transDraftData);
					 $('.ContactUnitBox').hide();
					 codeDate(transDraftData.billsCode,'#dateInput');
					 $.each(list,function(i,item){
						 $('.productRemark:eq(i) input').val(item.remark);
						 $('.inputProductNum').eq(i).val(item.goodsCount).data('max',item.goodsCount);
					 })
					 $('#Value-addedTable tbody tr').each(function(){
						 if($(this).find('.addValueSelectName').text() ==""){
							 $(this).find('.realPaymentInput').attr('disabled',true);
							 $(this).find('.valueRemark').children().attr('disabled',true);
						 }else{
							 $(this).find('.realPaymentInput').prop({readonly:false,disabled:false});
							 $(this).find('.valueRemark').children().attr('disabled',false);
						 }
					 })
                    defaultRefundMethod()
					 $('.inputImeiInfo').each(function(){
						 $(this).attr('disabled',true);
					 })
					 $('.inputAuxImeiInfo').each(function(){
						 $(this).attr('disabled',true);
					 })
					 $('.inputRefundMethod').each(function(){
						 if($(this).val() == null){
							 $(this).attr('disabled',true);
						 }
					 })
					 
					 $('#carrierImg,#Value-addedImg,#discountImg,#StaBusinessImg').unbind("click");
					 $('#saleInput,#storeInput,#addProduct,#addcarrRow,#discount,#stagingBusin').prop('disabled',true);
					 $('.showSaleManBox button,.showBox button,.showVipBox,.editProduct,.addGiftslastRow').hide();
					 $('#posAmount,#otherAccount').prop('disabled',false);
					 
					 $("#importOriginalBills").modal("hide");
					 $(".Value-added").css("display","block");
				}else{
					$.zxsaas_plus.showalert('error',data.desc); 
				}
    		},
    		error:function(){
    			alert('请求失败！')
    		}
    	})
	})

//若引入原单，则分期业务：“退款方式”默认为：“注销分期”
function defaultRefundMethod() {
	$('#StaBuTable tbody tr').each(function(){
		$(this).find(".inputRefundMethod").find('option[value="2"]').attr("selected",true)
	})
	stagingSum()
}

	
// 调入草稿单页面填充数据
function fillData(dataModel){
    	// 去掉营业员为空的提示
		$(".saleManerrorBox").html("");
		
// 根据部门加载仓库
    	instorage(dataModel.sectionId);
    	
		// 填充表头数据
    	$("#dateInput").datePlu({
    		 endDate:false
    	}).attr('disabled',false);
    	
	 $("#storeInput").val(dataModel.sectionName).data("sectionId",dataModel.sectionId) // 门店
	 $("#saleInput").val(dataModel.managerName).data("employeeId",dataModel.managerId)// 营业员
	 $("#contactsunitId").val(dataModel.unitName).data("contactUnitId",dataModel.unitId)	//往来单位
	 $("#dateInput").val(dataModel.billsDate)// 单据日期
	 $("#retailId").val(dataModel.id)// 单据id
	 $("#retailCardNum").val(dataModel.memberTelephone)// 手机号
	 $("#vipName").val(dataModel.memberName)// 客户姓名
	 $(".billsAmount").text(dataModel.totAmount)// 总金额
	 $("#retailRemark").val(dataModel.remark)// 备注
	 $("#depositBillsId").val(dataModel.depId);
	 $('#promotionalCoupons').val(dataModel.promotionAccount);	//促销券
	 $('.originalSingleNum').text(dataModel.billsCode); // 原单编号
	 $(".originalSingleNumId").text(selectData.selectReturnBillsRowId)
	 if(dataModel.isVip=="1"){
		$("#vipInfoBox").css("display","block")
		$("#retailCardNum").data("vipId",dataModel.memberId)
		$("#vipType").text(dataModel.memberType).attr("disabled",true);
		$("#vipCode").text(dataModel.memberCardNo).attr("disabled",true);
		$("#vipScore").text(dataModel.mScore).attr("disabled",true);
		$("#vipAmount").text(dataModel.mAmount).attr("disabled",true);
	 }else{
		 $("#vipInfoBox").css("display","none")
	 }
	 
	 // 禁用表头数据输入
	 $("#retailCardNum").attr("disabled",true);
	 
	 
	 var symbol=true
	 contractMac(fillProductInfo(dataModel),symbol)
	 function fillProductInfo(dataModel){
		 if(dataModel.detailList.length>0){
			 dataModel.detailList.map(function (detailListOpt,index){
			 var productModel={
						name:detailListOpt.goodsName,
						goodsId:detailListOpt.goodsId,
						code:detailListOpt.goodsCode,
						color:detailListOpt.color,
						models:detailListOpt.goodsModels,
						categoryName:detailListOpt.categoryName,
						retailPrice:detailListOpt.retailPrice,
						ifManageImei:detailListOpt.ifManageImei,
						ifEnableAuxliaryImei:detailListOpt.ifEnableAuxliaryImei,
						imei:detailListOpt.imei==null?"":detailListOpt.imei,
						auxiliaryImei:detailListOpt.auxiliaryImei==null?"":detailListOpt.auxiliaryImei,
						configure:detailListOpt.configure==null?"":detailListOpt.configure
				}
			 
			 if(detailListOpt.isGift==0){
				 if(index!=0){
					 $("#productInfoTable tbody").append(productInfoHtml)
					 $("#productInfoTable tbody").find(".addproductInfo").last().attr("id","addproductInfo_"+detailListOpt.orderno)
				 }
				 if(detailListOpt.isInstall==1){
					  $("#productInfoTable tbody #addproductInfo_"+detailListOpt.orderno).find(".stagingCheck").attr("checked","checked")  
				  }
				 addProductInfo(productModel,"#addproductInfo_"+detailListOpt.orderno)
				 $("#productInfoTable tbody #addproductInfo_"+detailListOpt.orderno).find(".proOrderId").text(detailListOpt.id)
				 $("#productInfoTable tbody #addproductInfo_"+detailListOpt.orderno).next().attr("id","addGifts_"+detailListOpt.orderno)
				 $("#productInfoTable tbody #addproductInfo_"+detailListOpt.orderno).find(".productRowNumber").text(detailListOpt.orderno)
				 $("#productInfoTable tbody #addproductInfo_"+detailListOpt.orderno).find(".inputImeiInfo").val(detailListOpt.imei)
				 $("#productInfoTable tbody #addproductInfo_"+detailListOpt.orderno).find(".inputAuxImeiInfo").val(detailListOpt.auxiliaryImei)
				 $("#productInfoTable tbody #addproductInfo_"+detailListOpt.orderno).find(".inputProductNum").text(detailListOpt.goodsCount)
				 $("#productInfoTable tbody #addproductInfo_"+detailListOpt.orderno).find(".originalUnitPrice").text(detailListOpt.disPrice.toFixed(2))
				 $("#productInfoTable tbody #addproductInfo_"+detailListOpt.orderno).find(".originalAmount").text(detailListOpt.amount)
				 $("#productInfoTable tbody #addproductInfo_"+detailListOpt.orderno).find(".saleInput1").val(detailListOpt.saleManName1).data("employeeId",detailListOpt.saleManId1)
				 $("#productInfoTable tbody #addproductInfo_"+detailListOpt.orderno).find(".saleInput1").attr("disabled","disabled")
				 $("#productInfoTable tbody #addproductInfo_"+detailListOpt.orderno).find(".saleInput2").attr("disabled","disabled")
				 $("#productInfoTable tbody #addproductInfo_"+detailListOpt.orderno).find(".saleInput2").val(detailListOpt.saleManName2).data("employeeId",detailListOpt.saleManId2)
				 $("#productInfoTable tbody #addproductInfo_"+detailListOpt.orderno).find(".stroageSelect").find('option[value='+detailListOpt.storageId+']').attr("selected",true)
				 $("#productInfoTable tbody #addproductInfo_"+detailListOpt.orderno).find(".selectpicker").find('option[value='+detailListOpt.busId+']').attr("selected",true)
				 $("#productInfoTable tbody #addproductInfo_"+detailListOpt.orderno).find(".selectpicker").attr("disabled","disabled")
				  
				 if(detailListOpt.ifEnableAuxliaryImei == 0){
					 $("#productInfoTable tbody #addproductInfo_"+detailListOpt.orderno).find(".inputAuxImeiInfo").attr("disabled",true);
					 $("#productInfoTable tbody #addproductInfo_"+detailListOpt.orderno).find(".inputProductNum").attr("readOnly",false);
				 }else{
					 $("#productInfoTable tbody #addproductInfo_"+detailListOpt.orderno).find(".inputAuxImeiInfo").attr("disabled",false);
					 $("#productInfoTable tbody #addproductInfo_"+detailListOpt.orderno).find(".inputProductNum").val("1").attr("readOnly",true);
				 }
				 if(detailListOpt.ifManageImei == 0){
					 $("#productInfoTable tbody #addproductInfo_"+detailListOpt.orderno).find(".inputImeiInfo").attr("disabled",true);
					 $("#productInfoTable tbody #addproductInfo_"+detailListOpt.orderno).find(".inputProductNum").attr("readOnly",false);
				 }else{
					 $("#productInfoTable tbody #addproductInfo_"+detailListOpt.orderno).find(".inputImeiInfo").attr("disabled",false);
					 $("#productInfoTable tbody #addproductInfo_"+detailListOpt.orderno).find(".inputProductNum").val("1").attr("readOnly",true);
				 }
				 
				 
				 $("#productInfoTable tbody #addproductInfo_"+detailListOpt.orderno).find(".stagingCheck").attr("disabled","disabled")
				   $("#productInfoTable tbody #addproductInfo_"+detailListOpt.orderno).find(".changeGift").attr("disabled","disabled")
				   $("#productInfoTable tbody #addproductInfo_"+detailListOpt.orderno).find(".inputReturnProductPrice").val(detailListOpt.amount)
				 
			 }
			 else if(detailListOpt.isGift==1){
				 var retailRowNum=detailListOpt.orderno;
				 var retailRowNumArry=retailRowNum.split(".");
				 
				 if(retailRowNumArry.length > 1){
					 var rowNumArryFirst = retailRowNumArry[0];
					 var rowNumArryLast = retailRowNumArry[1];
					 if(rowNumArryFirst!=undefined&&rowNumArryLast!=undefined){
						 $("#productInfoTable tbody #addGifts_"+rowNumArryFirst).before(giftHtml)
						 $("#productInfoTable tbody #addGifts_"+rowNumArryFirst).prev().attr("id","addGifts_"+rowNumArryFirst+"_"+rowNumArryLast)
					 }
					 addProductInfo(productModel,"#addGifts_"+rowNumArryFirst+"_"+rowNumArryLast)
					 $("#productInfoTable tbody #addGifts_"+rowNumArryFirst+"_"+rowNumArryLast).find(".changeGift").attr("checked","checked")
					 $("#productInfoTable tbody #addGifts_"+rowNumArryFirst+"_"+rowNumArryLast).find(".proOrderId").text(detailListOpt.id)
					 $("#productInfoTable tbody #addGifts_"+rowNumArryFirst+"_"+rowNumArryLast).find(".productRowNumber").text(detailListOpt.orderno)
					 $("#productInfoTable tbody #addGifts_"+rowNumArryFirst+"_"+rowNumArryLast).find(".inputImeiInfo").val(detailListOpt.imei)
					 $("#productInfoTable tbody #addGifts_"+rowNumArryFirst+"_"+rowNumArryLast).find(".inputAuxImeiInfo").val(detailListOpt.auxiliaryImei)
					 $("#productInfoTable tbody #addGifts_"+rowNumArryFirst+"_"+rowNumArryLast).find(".inputProductNum").text(detailListOpt.goodsCount)
					 $("#productInfoTable tbody #addGifts_"+rowNumArryFirst+"_"+rowNumArryLast).find(".originalUnitPrice").text(detailListOpt.disPrice.toFixed(2))
					 $("#productInfoTable tbody #addGifts_"+rowNumArryFirst+"_"+rowNumArryLast).find(".originalAmount").text(detailListOpt.amount)
					 $("#productInfoTable tbody #addGifts_"+rowNumArryFirst+"_"+rowNumArryLast).find(".inputReturnProductPrice").text(0)
					 $("#productInfoTable tbody #addGifts_"+rowNumArryFirst+"_"+rowNumArryLast).find(".saleInput1").val(detailListOpt.saleManName1).data("employeeId",detailListOpt.saleManId1)
					 $("#productInfoTable tbody #addGifts_"+rowNumArryFirst+"_"+rowNumArryLast).find(".saleInput2").val(detailListOpt.saleManName2).data("employeeId",detailListOpt.saleManId2)
					 $("#productInfoTable tbody #addGifts_"+rowNumArryFirst+"_"+rowNumArryLast).find(".stroageSelect").find('option[value='+detailListOpt.storageId+']').attr("selected",true)
					 $("#productInfoTable tbody #addGifts_"+rowNumArryFirst+"_"+rowNumArryLast).find(".selectpicker").find('option[value='+detailListOpt.busId+']').attr("selected",true)
					 if(detailListOpt.isInstall==1){
						 $("#productInfoTable tbody #addGifts_"+rowNumArryFirst+"_"+rowNumArryLast).find(".stagingCheck").attr("checked","checked")  
					  }
					   
					 if(detailListOpt.ifEnableAuxliaryImei == 0){
						 $("#productInfoTable tbody #addGifts_"+rowNumArryFirst+"_"+rowNumArryLast).find(".inputAuxImeiInfo").attr("disabled",true);
						 $("#productInfoTable tbody #addGifts_"+rowNumArryFirst+"_"+rowNumArryLast).find(".inputProductNum").attr("readOnly",false);
					 }else{
						 $("#productInfoTable tbody #addGifts_"+rowNumArryFirst+"_"+rowNumArryLast).find(".inputAuxImeiInfo").attr("disabled",false);
						 $("#product  InfoTable tbody #addGifts_"+rowNumArryFirst+"_"+rowNumArryLast).find(".inputProductNum").val("1").attr("readOnly",true);
					 }
					 if(detailListOpt.ifManageImei == 0){
						 $("#productInfoTable tbody #addGifts_"+rowNumArryFirst+"_"+rowNumArryLast).find(".inputImeiInfo").attr("disabled",true);
						 $("#productInfoTable tbody #addGifts_"+rowNumArryFirst+"_"+rowNumArryLast).find(".inputProductNum").attr("readOnly",false);
					 }else{
						 $("#productInfoTable tbody #addGifts_"+rowNumArryFirst+"_"+rowNumArryLast).find(".inputImeiInfo").attr("disabled",false);
						 $("#productInfoTable tbody #addGifts_"+rowNumArryFirst+"_"+rowNumArryLast).find(".inputProductNum").val("1").attr("readOnly",true);
					 }
					 $("#productInfoTable tbody #addGifts_"+rowNumArryFirst+"_"+rowNumArryLast).find(".inputReturnProductPrice").val(0)
					    $("#productInfoTable tbody #addGifts_"+rowNumArryFirst+"_"+rowNumArryLast).find(".changeGift").attr("disabled","disabled")
				        $("#productInfoTable tbody #addGifts_"+rowNumArryFirst+"_"+rowNumArryLast).find(".inputReturnProductPrice").attr("disabled","disabled")
				        $("#productInfoTable tbody #addGifts_"+rowNumArryFirst+"_"+rowNumArryLast).find(".saleInput1").attr("disabled","disabled")
				        $("#productInfoTable tbody #addGifts_"+rowNumArryFirst+"_"+rowNumArryLast).find(".saleInput2").attr("disabled","disabled")
				        $("#productInfoTable tbody #addGifts_"+rowNumArryFirst+"_"+rowNumArryLast).find(".selectpicker").attr("disabled","disabled")
				        
				 }else if(retailRowNumArry.length == 1){
					 if($("#productInfoTable tbody #addproductInfo_1").find('.saleInput1').val() !== "" &&$("#productInfoTable tbody addproductInfo_1").find('.saleInput1').val() !== undefined){
						 $("#productInfoTable tbody .addGiftslastRow").before(giftHtml);
						 $("#productInfoTable tbody .addGiftslastRow").prev().attr("id","addGifts_"+detailListOpt.orderno).addClass('addproductInfo');
					 }else{
						 if($("#productInfoTable tbody tr").size() <= 2 && $('#addproductInfo_1').find('.productInfoName').val() == ""){
							 $("#productInfoTable tbody #addproductInfo_1").attr("id","addGifts_"+detailListOpt.orderno);
						 }else{
							 if($("#productInfoTable tbody tr:first").attr('id') == 'addGifts_1' && $("#productInfoTable tbody tr:first").find('.changeGift').attr('checked') == false){
								 $("#productInfoTable tbody #addGifts_1").attr("id","addGifts_"+detailListOpt.orderno);
							 }else{
								 $("#productInfoTable tbody tr").last().before(giftHtml);
								 $("#productInfoTable tbody tr").last().prev().attr("id","addGifts_"+detailListOpt.orderno).addClass('addproductInfo');
							 }
						 }
					 }
					 addProductInfo(productModel,"#addGifts_"+detailListOpt.orderno);
					 $("#addGifts_"+detailListOpt.orderno).find(".inputImeiInfo").val(detailListOpt.imei)
					 $("#addGifts_"+detailListOpt.orderno).find(".inputAuxImeiInfo").val(detailListOpt.auxiliaryImei)
					 $("#addGifts_"+detailListOpt.orderno).find(".inputProductNum").val(detailListOpt.goodsCount)
					 $("#productInfoTable tbody #addGifts_"+detailListOpt.orderno).find(".productRowNumber").text(detailListOpt.orderno)
					 $("#productInfoTable tbody #addGifts_"+detailListOpt.orderno).find(".selectpicker").attr("disabled","disabled");
					 $("#productInfoTable tbody #addGifts_"+detailListOpt.orderno).find(".changeGift").attr("checked","checked")  
					 $("#productInfoTable tbody #addGifts_"+detailListOpt.orderno).find(".stagingCheck").attr("disabled","disabled")
					 $("#productInfoTable tbody #addGifts_"+detailListOpt.orderno).find(".changeGift").attr("disabled","disabled")
					 $("#productInfoTable tbody #addGifts_"+detailListOpt.orderno).find(".inputReturnProductPrice").val(detailListOpt.amount).attr("disabled","disabled")
				 }
				 
				 
			 }
			 countProductTotal()
			 countProductReturnAmount()
		 	})
		 }
	 }
	 if(dataModel.operatorList.length>0){
		 $("#carrBusinTable").parent().css({display:"block"})
		 dataModel.operatorList.map(function(operatOpt,index){
			 if(index!=0){
				 $("#carrBusinTable tbody").append(carrHtml); 
				 $("#carrBusinTable tbody tr:last").attr("id","carrBusinRowNum_"+(index+1))
				 $("#carrBusinTable tbody tr:last").find(".carrRowNumber").text((index+1))
			 }
			$("#carrBusinTable tbody "+"#carrBusinRowNum_"+(index+1)).find(".carrSelectUnit").children().html(carrBusinUnit)

			 $("#carrBusinTable tbody #carrBusinRowNum_"+(index+1)).find(".carrId").text(operatOpt.id)
			 $("#carrBusinTable tbody #carrBusinRowNum_"+(index+1)).find(".carrBusinSelectUnit").find('option[value='+operatOpt.unitId+']').attr("selected",true)
			 $("#carrBusinTable tbody #carrBusinRowNum_"+(index+1)).find(".carrSlectNameInput").val(operatOpt.busName).data("id",operatOpt.busId);
			 $("#carrBusinTable tbody #carrBusinRowNum_"+(index+1)).find(".inputOriginalAmount").val(operatOpt.busAmount);
			 $("#carrBusinTable tbody #carrBusinRowNum_"+(index+1)).find(".inputrefundsAmount").val(operatOpt.busAmount);
             $("#carrBusinTable tbody #carrBusinRowNum_"+(index+1)).find(".inputqty").val(operatOpt.qty);
             $("#carrBusinTable tbody #carrBusinRowNum_"+(index+1)).find(".inputcommission").val(operatOpt.commission);
			 $("#carrBusinTable tbody #carrBusinRowNum_"+(index+1)).find(".businessNum").children().val(operatOpt.busNo);
			 $("#carrBusinTable tbody #carrBusinRowNum_"+(index+1)).find(".carrTelephone").children().val(operatOpt.tel);
			 $("#carrBusinTable tbody #carrBusinRowNum_"+(index+1)).find(".telephoneImei").children().val(operatOpt.telImei);
			 $("#carrBusinTable tbody #carrBusinRowNum_"+(index+1)).find(".inputdiscountMargin").val(operatOpt.debuBond);
			 $("#carrBusinTable tbody #carrBusinRowNum_"+(index+1)).find(".carrSaleInput1").val(operatOpt.saleManName1).data("employeeId",operatOpt.saleManId1);
			 $("#carrBusinTable tbody #carrBusinRowNum_"+(index+1)).find(".carrSaleInput2").val(operatOpt.saleManName2).data("employeeId",operatOpt.saleManId2);
			 $("#carrBusinTable tbody #carrBusinRowNum_"+(index+1)).find(".inputcomissionEsit").val(operatOpt.commissionWill);
			 $("#carrBusinTable tbody #carrBusinRowNum_"+(index+1)).find(".carrId").text(operatOpt.id)
			})
			$("#carrBusinTable tbody").find("input").attr("disabled","disabled")
			$("#carrBusinTable tbody").find("select").attr("disabled","disabled")
		$("#carrBusinTable tbody tr").each(function(index,value){
			$(this).find(".inputrefundsAmount").removeAttr("disabled")
			$(this).find(".carrRemark").children().removeAttr("disabled")
		})
		countCarrBusin()
	 }
	 if(dataModel.serviceList.length>0){
		 $("#Value-addedTable").parent().css({display:"block"})
		 dataModel.serviceList.map(function(serviceOpt,index){
			 if(index!=0){
				 $("#Value-addedTable tbody").append(valueHtml); 
				 $("#Value-addedTable tbody tr:last").attr("id","addValueService_"+(index+1))
				 $("#Value-addedTable tbody tr:last").find(".valueRowNumber").text((index+1))
			 }
			 serviceOpt.goodsName = serviceOpt.goodsName==null?"":serviceOpt.goodsName;
			 serviceOpt.imei = serviceOpt.imei==null?"":serviceOpt.imei;
			 serviceOpt.saleManName2 = serviceOpt.saleManName2==null?"":serviceOpt.saleManName2;
			 serviceOpt.flowNo = serviceOpt.flowNo==null?"":serviceOpt.flowNo;
			 serviceOpt.memberPrice = serviceOpt.memberPrice==null?"":serviceOpt.memberPrice;
			 $("#Value-addedTable tbody #addValueService_"+(index+1)).find(".addValueId").text(serviceOpt.id)
			 $("#Value-addedTable tbody #addValueService_"+(index+1)).find(".addValueSelectName").attr('orderno',serviceOpt.orderno);
			 $("#Value-addedTable tbody #addValueService_"+(index+1)).find(".addValueSelectName").text(serviceOpt.serviceName)
			 $("#Value-addedTable tbody #addValueService_"+(index+1)).find(".addValueSelectId").text(serviceOpt.serviceId)
			 $("#Value-addedTable tbody #addValueService_"+(index+1)).find(".addValueSaleInput1").text(serviceOpt.saleManName1)
			 $("#Value-addedTable tbody #addValueService_"+(index+1)).find(".addValueSaleInputId").text(serviceOpt.saleManId1)
			 $("#Value-addedTable tbody #addValueService_"+(index+1)).find(".realPaymentInput").val(serviceOpt.serviceAmount);
			 $("#Value-addedTable tbody #addValueService_"+(index+1)).find(".bissDate").text(serviceOpt.stratDate);
			 $("#Value-addedTable tbody #addValueService_"+(index+1)).find(".originalCollection").text(serviceOpt.serviceAmount)
			 $("#Value-addedTable tbody #addValueService_"+(index+1)).find(".addValueProductName").children().first().text(serviceOpt.goodsName)
			 $("#Value-addedTable tbody #addValueService_"+(index+1)).find(".phoneImei").children().first().text(serviceOpt.imei)
			 $("#Value-addedTable tbody #addValueService_"+(index+1)).find(".esitPrice").text(serviceOpt.setPrice)
			 $("#Value-addedTable tbody #addValueService_"+(index+1)).find(".valuePrice").text(serviceOpt.memberPrice)
			 $("#Value-addedTable tbody #addValueService_"+(index+1)).find(".addValueSaleInput2").text(serviceOpt.saleManName2)
			 $("#Value-addedTable tbody #addValueService_"+(index+1)).find(".addValueSaleInput2Id").text(serviceOpt.saleManId2)
			 $("#Value-addedTable tbody #addValueService_"+(index+1)).find(".serviceNumber").text(serviceOpt.flowNo)
			 var userNum = serviceOpt.userNum;
			 var serviceDue = serviceOpt.serviceDue;
			 if(userNum=="-1"){userNum=""}
			 if(serviceDue=="-1"){ serviceDue=""}
			
			 if(dataModel.isVip=="1"){
				 if(serviceOpt.mUserNum!=null){
					 userNum = serviceOpt.mUserNum;
				 }
			 }
			 $("#Value-addedTable tbody #addValueService_"+(index+1)).find(".usageCount").text(userNum)
			 $("#Value-addedTable tbody #addValueService_"+(index+1)).find(".limitDate").text(serviceDue)
			 
			 countAddValueAmount()
		 })
	 }
 if(dataModel.couponList.length>0){
		 $("#DiscountTable").parent().css({display:"block"})
		  dataModel.couponList.map(function(couponListOpt,index){
			 if(index!=0){
				 $("#DiscountTable tbody").append(discountHtml); 
				 $("#DiscountTable tbody tr:last").attr("id","thirdDisount_"+(index+1))
				 $("#DiscountTable tbody tr:last").find(".discountRowNumber").text((index+1))
			 }
			 $("#DiscountTable tbody "+"#thirdDisount_"+(index+1)).find(".thirdDiscountId").text(couponListOpt.id)
			$("#DiscountTable tbody "+"#thirdDisount_"+(index+1)).find(".discountSelectUnit").children().html(thirdDisountUntilOpt)
			 searchThirdDiscount(couponListOpt.unitId,"thirdDisount_"+(index+1))
			 $("#DiscountTable tbody #thirdDisount_"+(index+1)).find(".discountSelectUnitOption").find('option[value='+couponListOpt.unitId+']').attr("selected",true)
			 $("#DiscountTable tbody #thirdDisount_"+(index+1)).find(".discountActiveNameOption").find('option[value='+couponListOpt.couponId+']').attr("selected",true)
			 $("#DiscountTable tbody #thirdDisount_"+(index+1)).find(".thirdDiscountAmountInput").val(couponListOpt.amount)
			 $("#DiscountTable tbody #thirdDisount_"+(index+1)).find(".inputthirdReturnAmount").val(couponListOpt.amount)
			 $("#DiscountTable tbody #thirdDisount_"+(index+1)).find(".settleAmountInput").val(couponListOpt.settleAmount||0)
			 $("#DiscountTable tbody #thirdDisount_"+(index+1)).find(".thirdBusinNum").children().val(couponListOpt.busNo)
			 $("#DiscountTable tbody #thirdDisount_"+(index+1)).find(".thirdSaleInput1").val(couponListOpt.saleManName1).data("employeeId",couponListOpt.saleManId1);
			 $("#DiscountTable tbody #thirdDisount_"+(index+1)).find(".thirdSaleInput2").val(couponListOpt.saleManName2).data("employeeId",couponListOpt.saleManId2);
		 })
		 countDiscountAmount()
		  $("#DiscountTable tbody").find("input").attr("disabled","disabled")
		  $("#DiscountTable tbody").find("select").attr("disabled","disabled")
		  $("#DiscountTable tbody tr").each(function(index,value){
			  $(this).find(".inputthirdReturnAmount").removeAttr("disabled")
			  $(this).find(".settleAmountInput").removeAttr("disabled")
			  $(this).find(".discountRemark").children().removeAttr("disabled")
		  })
	}
	 if(dataModel.installList.length>0){
		 $("#StaBuTable").parent().css({display:"block"})
		 dataModel.installList.map(function(installListOpt,index){
			 if(index!=0){
				 $("#StaBuTable tbody").append(stagingHtml);
				 $("#StaBuTable tbody tr:last").attr("id","stagingRow_"+(index+1))
				 $("#StaBuTable tbody tr:last").find(".stagRowNumber").text((index+1))
			 }
			 $("#StaBuTable tbody "+"#stagingRow_"+(index+1)).find(".stagingId").text(installListOpt.id)
			$("#StaBuTable tbody "+"#stagingRow_"+(index+1)).find(".stagSelectUnit").children().html(stagingSelectOption)
			 searchStagingBussiness(installListOpt.unitId,"stagingRow_"+(index+1))
			 $("#StaBuTable tbody #stagingRow_"+(index+1)).find(".stagSelectOption").find('option[value='+installListOpt.unitId+']').attr("selected",true)
//			 $("#StaBuTable tbody #stagingRow_"+(index+1)).find(".stagBusinessNameOption").find('option[value='+installListOpt.installId+']').attr("selected",true)
			 $("#StaBuTable tbody #stagingRow_"+(index+1)).find(".stagBusinessNameOption").val(installListOpt.installId);
			 $("#StaBuTable tbody #stagingRow_"+(index+1)).find(".stagingAmount").val(installListOpt.amount)
			 $("#StaBuTable tbody #stagingRow_"+(index+1)).find(".firstPayAmount").val(installListOpt.installAmount)
			 $("#StaBuTable tbody #stagingRow_"+(index+1)).find(".stagingLoadAmount").text(installListOpt.installmentBalance)
			 $("#StaBuTable tbody #stagingRow_"+(index+1)).find(".stagingRefundAmount").val(0-installListOpt.refundAmount)
			 $("#StaBuTable tbody #stagingRow_"+(index+1)).find(".stagingNumber").val(installListOpt.installmentCount)
			 $("#StaBuTable tbody #stagingRow_"+(index+1)).find(".commission").val(installListOpt.commissionWill)
			 $("#StaBuTable tbody #stagingRow_"+(index+1)).find(".contractNo").val(installListOpt.busNo)
			 $("#StaBuTable tbody #stagingRow_"+(index+1)).find(".imeiNo").val(installListOpt.imei)
			 $("#StaBuTable tbody #stagingRow_"+(index+1)).find(".stagingSaleInput1").val(installListOpt.saleManName1).data("employeeId",installListOpt.saleManId1)
			 $("#StaBuTable tbody #stagingRow_"+(index+1)).find(".stagingSaleInput2").val(installListOpt.saleManName2).data("employeeId",installListOpt.saleManId2)
			 $("#StaBuTable tbody #stagingRow_"+(index+1)).find(".monthSupply").text(installListOpt.monthsPay)
			 $("#StaBuTable tbody #stagingRow_"+(index+1)).find(".inputRefundMethod").find('option[value="1"]').attr("selected",true)
		 })
		 disabledCol("#StaBuTable tbody tr",".stagSelectUnit",".stagSelectOption")
		 $("#StaBuTable tbody").find("input").attr("disabled","disabled")
		 $("#StaBuTable tbody").find("select").attr("disabled","disabled")
		 $("#StaBuTable tbody tr").each(function(index,value){
			 $(this).find(".stagingRefundAmount").removeAttr("disabled")
			 $(this).find(".stagRemark").children().removeAttr("disabled")
			 $(this).find(".inputRefundMethod").removeAttr("disabled")
		 })
		 stagingSum()
	 }
	 
	 if(dataModel.payreceiptList !== null){
		 if(dataModel.payreceiptList.length>0){
			 var posAmount=0
			 var otherAmount=0
			 var posTotalAmountArry=[]
			 var otherTotalAmountArry=[]
			 dataModel.payreceiptList.map(function(payListOpt,index){
				 var posTotalAmountModal={};
				 var otherTotalAmountModal={};
				if(payListOpt.accountTypeName=="现金"){
				   $("#retailAmount").removeAttr("disabled");
				   $("#retailAmount").val(payListOpt.payreceiptAmout).attr("cashId",payListOpt.accountId)
				}
				if(payListOpt.accountTypeName=="支付宝"){
					$("#alipayAmount").removeAttr("disabled");
					$("#alipayAmount").val(payListOpt.payreceiptAmout).attr("applyId",payListOpt.accountId)
				}
				if(payListOpt.accountTypeName=="微信"){
					$("#microLetterAmount").removeAttr("disabled");
					$("#microLetterAmount").val(payListOpt.payreceiptAmout).attr("micrId",payListOpt.accountId)
				}
				if(payListOpt.accountTypeName=="银行"){
					  posTotalAmountModal.accountName=payListOpt.accountName;
					  posTotalAmountModal.payreceiptAmout=payListOpt.payreceiptAmout;
					  posTotalAmountModal.accountId=payListOpt.accountId;
					  posTotalAmountArry.push(posTotalAmountModal);
					  
					$("#posTable tbody tr").each(function(i,item){
						  if($(item).find('.accountId').text() == payListOpt.accountId){
							  $(item).find('input').val(payListOpt.payreceiptAmout)
							  posAmount+=payListOpt.payreceiptAmout
						  }
					  })
				  }
				 if(payListOpt.accountTypeName=="其它"){
					 otherTotalAmountModal.accountName=payListOpt.accountName,
					 otherTotalAmountModal.payreceiptAmout=payListOpt.payreceiptAmout,
					 otherTotalAmountModal.accountId=payListOpt.accountId
					 otherTotalAmountArry.push(otherTotalAmountModal)
					 
					 $("#otherCounterTable tbody tr").each(function(i,item){
						  if($(item).find('.accountId').text() == payListOpt.accountId){
							  $(item).find('input').val(payListOpt.payreceiptAmout)
							  otherAmount+=payListOpt.payreceiptAmout;
						  }
					  })
				 }
			 })
			  if(posTotalAmountArry.length>0){
				  $("#posAmount").removeAttr("disabled")
				  $("#posAmount").attr("readonly","readonly")
				  $("#posAmount").val(posAmount.toFixed(2))
			  }else{
				  $("#posAmount").attr("disabled","disabled") 
			  }
			  if(otherTotalAmountArry.length>0){
				  $("#otherAccount").removeAttr("disabled")
				  $("#otherAccount").attr("readonly","readonly")
				  $("#otherAccount").val(otherAmount.toFixed(2))
			  }else{
				  $("#otherAccount").attr("disabled","disabled") 
			  }
		 }
	 }
	
	 countPayAmount();

	}

 // 收银台本退退货
	locationhref();
	
	function locationhref(){
		var id = $('#retailId').val();
		var cope = $('#operateType').val();
		if(id == "" || id == null ){
			return
		}
		if(cope == "cope" || cope == "copes"){
			$.request({
	    		type:'POST',
	        	url:'/manager/inventory/retail/delivery/loadDraftOrder',
	        	dataType:'json',
	        	data:{"id": id},
	        	success:function(data){
					 if(data.result==1){
						 var dataModel=data.data.obj
						 var list = dataModel.detailList;

					    	// 去掉营业员为空的提示
							$(".saleManerrorBox").html("");
							
					// 根据部门加载仓库
					    	instorage(dataModel.sectionId);
					    	
							// 填充表头数据
					    	$("#dateInput").datePlu({
					    		endDate:false,
								ifPermissions:false,
								defaultTime: dataModel.billsDateStr
					    	});
					    	
						 $("#storeInput").val(dataModel.sectionName).data("sectionId",dataModel.sectionId) // 门店
						 $("#saleInput").val(dataModel.managerName).data("employeeId",dataModel.managerId)// 营业员
						 $("#dateInput").val(dataModel.billsDate)// 单据日期
						 $("#retailId").val(dataModel.id)// 单据id
						 $("#retailCardNum").val(dataModel.memberTelephone)// 手机号
						 $("#vipName").val(dataModel.memberName)// 客户姓名
						 $("#retailRemark").val(dataModel.remark)// 备注
						 $("#depositBillsId").val(dataModel.depId);
						 if(dataModel.isVip=="1"){
							$("#vipInfoBox").css("display","block")
							$("#retailCardNum").data("vipId",dataModel.memberId)
							$("#vipType").text(dataModel.memberType).attr("disabled",true);
							$("#vipCode").text(dataModel.memberCardNo).attr("disabled",true);
							$("#vipScore").text(dataModel.mScore).attr("disabled",true);
							$("#vipAmount").text(dataModel.mAmount).attr("disabled",true);
						 }else{
							 $("#vipInfoBox").css("display","none")
						 }
						 
						 // 禁用表头数据输入
						 $("#retailCardNum").attr("disabled",true);
						 
						 
						 var symbol=true
						 contractMac(fillProductInfo(dataModel),symbol)
						 function fillProductInfo(dataModel){
							 if(dataModel.detailList.length>0){
								 dataModel.detailList.map(function (detailListOpt,index){
								 var productModel={
											name:detailListOpt.goodsName,
											goodsId:detailListOpt.goodsId,
											code:detailListOpt.goodsCode,
											color:detailListOpt.color,
											models:detailListOpt.goodsModels,
											categoryName:detailListOpt.categoryName,
											retailPrice:detailListOpt.retailPrice,
											ifManageImei:detailListOpt.ifManageImei,
											ifEnableAuxliaryImei:detailListOpt.ifEnableAuxliaryImei,
											imei:detailListOpt.imei==null?"":detailListOpt.imei,
											auxiliaryImei:detailListOpt.auxiliaryImei==null?"":detailListOpt.auxiliaryImei,
											configure:detailListOpt.configure==null?"":detailListOpt.configure
									}
								 
								 if(detailListOpt.isGift==0){
									 if(index!=0){
										 $("#productInfoTable tbody").append(productInfoHtml)
										 $("#productInfoTable tbody").find(".addproductInfo").last().attr("id","addproductInfo_"+detailListOpt.orderno)
									 }
									 if(detailListOpt.isInstall==1){
										  $("#productInfoTable tbody #addproductInfo_"+detailListOpt.orderno).find(".stagingCheck").attr("checked","checked")  
									  }
									 addProductInfo(productModel,"#addproductInfo_"+detailListOpt.orderno)
									// $("#productInfoTable tbody #addproductInfo_"+detailListOpt.orderno).find(".proOrderId").text(detailListOpt.id)
									 $("#productInfoTable tbody #addproductInfo_"+detailListOpt.orderno).next().attr("id","addGifts_"+detailListOpt.orderno)
									 $("#productInfoTable tbody #addproductInfo_"+detailListOpt.orderno).find(".productRowNumber").text(detailListOpt.orderno)
									 $("#productInfoTable tbody #addproductInfo_"+detailListOpt.orderno).find(".inputImeiInfo").val(detailListOpt.imei)
									 $("#productInfoTable tbody #addproductInfo_"+detailListOpt.orderno).find(".inputAuxImeiInfo").val(detailListOpt.auxiliaryImei)
									 $("#productInfoTable tbody #addproductInfo_"+detailListOpt.orderno).find(".inputProductNum").text(detailListOpt.goodsCount)
									 $("#productInfoTable tbody #addproductInfo_"+detailListOpt.orderno).find(".originalUnitPrice").text(detailListOpt.disPrice.toFixed(2))
									 $("#productInfoTable tbody #addproductInfo_"+detailListOpt.orderno).find(".originalAmount").text(detailListOpt.amount)
									 $("#productInfoTable tbody #addproductInfo_"+detailListOpt.orderno).find(".saleInput1").val(detailListOpt.saleManName1).data("employeeId",detailListOpt.saleManId1)
									 $("#productInfoTable tbody #addproductInfo_"+detailListOpt.orderno).find(".saleInput1").attr("disabled","disabled")
									 $("#productInfoTable tbody #addproductInfo_"+detailListOpt.orderno).find(".saleInput2").attr("disabled","disabled")
									 $("#productInfoTable tbody #addproductInfo_"+detailListOpt.orderno).find(".saleInput2").val(detailListOpt.saleManName2).data("employeeId",detailListOpt.saleManId2)
									 $("#productInfoTable tbody #addproductInfo_"+detailListOpt.orderno).find(".stroageSelect").find('option[value='+detailListOpt.storageId+']').attr("selected",true)
									 $("#productInfoTable tbody #addproductInfo_"+detailListOpt.orderno).find(".selectpicker").find('option[value='+detailListOpt.busId+']').attr("selected",true)
									  
									 if(detailListOpt.ifEnableAuxliaryImei == 0){
										 $("#productInfoTable tbody #addproductInfo_"+detailListOpt.orderno).find(".inputAuxImeiInfo").attr("disabled",true);
										 $("#productInfoTable tbody #addproductInfo_"+detailListOpt.orderno).find(".inputProductNum").attr("readOnly",false);
									 }else{
										 $("#productInfoTable tbody #addproductInfo_"+detailListOpt.orderno).find(".inputAuxImeiInfo").attr({disabled:false,readonly:false});
										 $("#productInfoTable tbody #addproductInfo_"+detailListOpt.orderno).find(".inputProductNum").val("1").attr("readOnly",true);
									 }
									 if(detailListOpt.ifManageImei == 0){
										 $("#productInfoTable tbody #addproductInfo_"+detailListOpt.orderno).find(".inputImeiInfo").attr("disabled",true);
										 $("#productInfoTable tbody #addproductInfo_"+detailListOpt.orderno).find(".inputProductNum").attr("readOnly",false);
									 }else{
										 $("#productInfoTable tbody #addproductInfo_"+detailListOpt.orderno).find(".inputImeiInfo").attr({disabled:false,readonly:false});
										 $("#productInfoTable tbody #addproductInfo_"+detailListOpt.orderno).find(".inputProductNum").val("1").attr("readOnly",true);
									 }
								   $("#productInfoTable tbody #addproductInfo_"+detailListOpt.orderno).find(".changeGift").attr("disabled","disabled")
								   $("#productInfoTable tbody #addproductInfo_"+detailListOpt.orderno).find(".inputReturnProductPrice").val(detailListOpt.amount)
									 
								 }else if(detailListOpt.isGift==1){
									 var retailRowNum=detailListOpt.orderno;
									 var retailRowNumArry=retailRowNum.split(".");
									 
									 if(retailRowNumArry.length > 1){
										 var rowNumArryFirst = retailRowNumArry[0];
										 var rowNumArryLast = retailRowNumArry[1];
										 if(rowNumArryFirst!=undefined&&rowNumArryLast!=undefined){
											 $("#productInfoTable tbody #addGifts_"+rowNumArryFirst).before(giftHtml)
											 $("#productInfoTable tbody #addGifts_"+rowNumArryFirst).prev().attr("id","addGifts_"+rowNumArryFirst+"_"+rowNumArryLast)
										 }
										 addProductInfo(productModel,"#addGifts_"+rowNumArryFirst+"_"+rowNumArryLast)
										 $("#productInfoTable tbody #addGifts_"+rowNumArryFirst+"_"+rowNumArryLast).find(".changeGift").attr("checked","checked")
										// $("#productInfoTable tbody #addGifts_"+rowNumArryFirst+"_"+rowNumArryLast).find(".proOrderId").text(detailListOpt.id)
										 $("#productInfoTable tbody #addGifts_"+rowNumArryFirst+"_"+rowNumArryLast).find(".productRowNumber").text(detailListOpt.orderno)
										 $("#productInfoTable tbody #addGifts_"+rowNumArryFirst+"_"+rowNumArryLast).find(".inputImeiInfo").val(detailListOpt.imei)
										 $("#productInfoTable tbody #addGifts_"+rowNumArryFirst+"_"+rowNumArryLast).find(".inputAuxImeiInfo").val(detailListOpt.auxiliaryImei)
										 $("#productInfoTable tbody #addGifts_"+rowNumArryFirst+"_"+rowNumArryLast).find(".inputProductNum").text(detailListOpt.goodsCount)
										 $("#productInfoTable tbody #addGifts_"+rowNumArryFirst+"_"+rowNumArryLast).find(".originalUnitPrice").text(detailListOpt.disPrice.toFixed(2))
										 $("#productInfoTable tbody #addGifts_"+rowNumArryFirst+"_"+rowNumArryLast).find(".originalAmount").text(detailListOpt.amount)
										 $("#productInfoTable tbody #addGifts_"+rowNumArryFirst+"_"+rowNumArryLast).find(".inputReturnProductPrice").text(0)
										 $("#productInfoTable tbody #addGifts_"+rowNumArryFirst+"_"+rowNumArryLast).find(".saleInput1").val(detailListOpt.saleManName1).data("employeeId",detailListOpt.saleManId1)
										 $("#productInfoTable tbody #addGifts_"+rowNumArryFirst+"_"+rowNumArryLast).find(".saleInput2").val(detailListOpt.saleManName2).data("employeeId",detailListOpt.saleManId2)
										 $("#productInfoTable tbody #addGifts_"+rowNumArryFirst+"_"+rowNumArryLast).find(".stroageSelect").find('option[value='+detailListOpt.storageId+']').attr("selected",true)
										 $("#productInfoTable tbody #addGifts_"+rowNumArryFirst+"_"+rowNumArryLast).find(".selectpicker").find('option[value='+detailListOpt.busId+']').attr("selected",true)
										 if(detailListOpt.isInstall==1){
											 $("#productInfoTable tbody #addGifts_"+rowNumArryFirst+"_"+rowNumArryLast).find(".stagingCheck").attr("checked","checked")  
										  }
										   
										 if(detailListOpt.ifEnableAuxliaryImei == 0){
											 $("#productInfoTable tbody #addGifts_"+rowNumArryFirst+"_"+rowNumArryLast).find(".inputAuxImeiInfo").attr("disabled",true);
											 $("#productInfoTable tbody #addGifts_"+rowNumArryFirst+"_"+rowNumArryLast).find(".inputProductNum").attr("readOnly",false);
										 }else{
											 $("#productInfoTable tbody #addGifts_"+rowNumArryFirst+"_"+rowNumArryLast).find(".inputAuxImeiInfo")({disabled:false,readOnly:false});
											 $("#productInfoTable tbody #addGifts_"+rowNumArryFirst+"_"+rowNumArryLast).find(".inputProductNum").val("1").attr("readOnly",true);
										 }
										 if(detailListOpt.ifManageImei == 0){
											 $("#productInfoTable tbody #addproductInfo_"+detailListOpt.orderno).find(".inputImeiInfo").attr("disabled",true);
											 $("#productInfoTable tbody #addproductInfo_"+detailListOpt.orderno).find(".inputProductNum").attr("readOnly",false);
										 }else{
											 $("#productInfoTable tbody #addproductInfo_"+detailListOpt.orderno).find(".inputImeiInfo").attr({disabled:false,readOnly:false});
											 $("#productInfoTable tbody #addproductInfo_"+detailListOpt.orderno).find(".inputProductNum").val("1").attr("readOnly",true);
										 }
										 $("#productInfoTable tbody #addGifts_"+rowNumArryFirst+"_"+rowNumArryLast).find(".inputReturnProductPrice").val(0)
										    $("#productInfoTable tbody #addGifts_"+rowNumArryFirst+"_"+rowNumArryLast).find(".changeGift").attr("disabled","disabled")
									        $("#productInfoTable tbody #addGifts_"+rowNumArryFirst+"_"+rowNumArryLast).find(".inputReturnProductPrice").attr("disabled","disabled")
									        $("#productInfoTable tbody #addGifts_"+rowNumArryFirst+"_"+rowNumArryLast).find(".saleInput1").attr("disabled","disabled")
									        $("#productInfoTable tbody #addGifts_"+rowNumArryFirst+"_"+rowNumArryLast).find(".saleInput2").attr("disabled","disabled")
									        $("#productInfoTable tbody #addGifts_"+rowNumArryFirst+"_"+rowNumArryLast).find(".selectpicker").attr("disabled","disabled")
									        
									 }else if(retailRowNumArry.length == 1){
										 if(dataModel.detailList.length == 1){
											 $("#productInfoTable tbody #addproductInfo_"+detailListOpt.orderno).attr("id","addGifts_"+detailListOpt.orderno);
										 }else{
											 if($('#addproductInfo_'+detailListOpt.orderno).find('.productInfoName').val() == "" &&$('#addproductInfo_'+detailListOpt.orderno).find('.saleInput1').val() == "" ){
												 $("#productInfoTable tbody #addproductInfo_"+detailListOpt.orderno).attr("id","addGifts_"+detailListOpt.orderno);
											 }else{
												 $("#productInfoTable tbody tr").last().after(giftHtml)
												 $("#productInfoTable tbody tr").last().attr("id","addGifts_"+detailListOpt.orderno).addClass('addproductInfo')
											 }
										 }
										 addProductInfo(productModel,"#addGifts_"+detailListOpt.orderno);
										 if(detailListOpt.isInstall==1){
											 $("#addGifts_"+detailListOpt.orderno).find(".stagingCheck").attr("checked","checked")  
										 }
										 if(detailListOpt.ifEnableAuxliaryImei == 0){
											 $("#addGifts_"+detailListOpt.orderno).find(".inputAuxImeiInfo").attr("disabled",true);
											 $("#addGifts_"+detailListOpt.orderno).find(".inputProductNum").attr("readOnly",false);
										 }else{
											 $("#addGifts_"+detailListOpt.orderno).find(".inputAuxImeiInfo").attr({disabled:false,readOnly:false});
											 $("#addGifts_"+detailListOpt.orderno).find(".inputProductNum").val("1").attr("readOnly",true);
										 }
										 if(detailListOpt.ifManageImei == 0){
											 $("#addGifts_"+detailListOpt.orderno).find(".inputImeiInfo").attr("disabled",true);
											 $("#addGifts_"+detailListOpt.orderno).find(".inputProductNum").attr("readOnly",false);
										 }else{
											 $("#addGifts_"+detailListOpt.orderno).find(".inputImeiInfo").attr({disabled:false,readOnly:false});
											 $("#addGifts_"+detailListOpt.orderno).find(".inputProductNum").val("1").attr("readOnly",true);
										 }
										 $("#addGifts_"+detailListOpt.orderno).find(".inputImeiInfo").val(detailListOpt.imei)
										 $("#addGifts_"+detailListOpt.orderno).find(".inputAuxImeiInfo").val(detailListOpt.auxiliaryImei)
										 $("#addGifts_"+detailListOpt.orderno).find(".inputProductNum").val(detailListOpt.goodsCount)
										 $("#addGifts_"+detailListOpt.orderno).find(".stroageSelect").find('option[value='+detailListOpt.storageId+']').attr("selected",true)
										 $("#addGifts_"+detailListOpt.orderno).find(".selectpicker").find('option[value='+detailListOpt.busId+']').attr("selected",true)
										 $("#addGifts_"+detailListOpt.orderno).find(".productRowNumber").text(detailListOpt.orderno)
										 // if($("#addGifts_"+detailListOpt.orderno).find(".productRowNumber").text() ==""){
											//  var addnum = $("#addGifts_"+detailListOpt.orderno).prev().find(".productRowNumber").text();
											//  $("#addGifts_"+detailListOpt.orderno).find(".productRowNumber").text(addnum+".1");
										 // }
										 $("#productInfoTable tbody #addGifts_"+detailListOpt.orderno).find(".changeGift").attr("checked","checked")  
										 $("#productInfoTable tbody #addGifts_"+detailListOpt.orderno).find(".stagingCheck").attr("disabled","disabled")
										 $("#productInfoTable tbody #addGifts_"+detailListOpt.orderno).find(".changeGift").attr("disabled","disabled")
										 $("#productInfoTable tbody #addGifts_"+detailListOpt.orderno).find(".inputReturnProductPrice").val(detailListOpt.amount).attr("disabled","disabled")
									 }
									 
									 
								 }
								 if(cope == 'copes'){
									 $('#productInfoTable tbody tr').each(function(i,item){
										 $(item).find('.changeGift').attr('disabled',false);
										 $(item).find('.inputReturnProductPrice').attr('disabled',false);
										 $(item).find('.stagingCheck').attr('disabled',false);
									 })
								 }
								 countProductTotal()
								 countProductReturnAmount()
							 	})
							 }
						 }
						 if(dataModel.operatorList.length>0){
							 $("#carrBusinTable").parent().css({display:"block"})
							 dataModel.operatorList.map(function(operatOpt,index){
								 if(index!=0){
									 $("#carrBusinTable tbody").append(carrHtml); 
									 $("#carrBusinTable tbody tr:last").attr("id","carrBusinRowNum_"+(index+1))
									 $("#carrBusinTable tbody tr:last").find(".carrRowNumber").text((index+1))
								 }
								$("#carrBusinTable tbody "+"#carrBusinRowNum_"+(index+1)).find(".carrSelectUnit").children().html(carrBusinUnit)

								 $("#carrBusinTable tbody #carrBusinRowNum_"+(index+1)).find(".carrBusinSelectUnit").find('option[value='+operatOpt.unitId+']').attr("selected",true)
								 $("#carrBusinTable tbody #carrBusinRowNum_"+(index+1)).find(".carrSlectNameInput").val(operatOpt.busName).data("id",operatOpt.busId)
								 $("#carrBusinTable tbody #carrBusinRowNum_"+(index+1)).find(".inputrefundsAmount").val(operatOpt.busAmount);
                                 $("#carrBusinTable tbody #carrBusinRowNum_"+(index+1)).find(".inputqty").val(operatOpt.qty);
                                 $("#carrBusinTable tbody #carrBusinRowNum_"+(index+1)).find(".inputcommission").val(operatOpt.commission);
								 $("#carrBusinTable tbody #carrBusinRowNum_"+(index+1)).find(".businessNum").children().val(operatOpt.busNo).removeAttr("disabled");
								 $("#carrBusinTable tbody #carrBusinRowNum_"+(index+1)).find(".carrTelephone").children().val(operatOpt.tel).removeAttr("disabled");
								 $("#carrBusinTable tbody #carrBusinRowNum_"+(index+1)).find(".telephoneImei").children().val(operatOpt.telImei).removeAttr("disabled");
								 $("#carrBusinTable tbody #carrBusinRowNum_"+(index+1)).find(".inputdiscountMargin").val(operatOpt.debuBond).removeAttr("disabled");

                                 createBusin("carrBusinRowNum_"+(index+1))
								 $("#carrBusinTable tbody #carrBusinRowNum_"+(index+1)).find(".carrSaleInput1").val(operatOpt.saleManName1).data("employeeId",operatOpt.saleManId1);
								 $("#carrBusinTable tbody #carrBusinRowNum_"+(index+1)).find(".carrSaleInput2").val(operatOpt.saleManName2).data("employeeId",operatOpt.saleManId2);
								 $("#carrBusinTable tbody #carrBusinRowNum_"+(index+1)).find(".inputcomissionEsit").val(operatOpt.commissionWill).removeAttr("disabled");
								})
							$("#carrBusinTable tbody tr").each(function(index,value){
								$(this).find(".inputrefundsAmount").removeAttr("disabled")
								$(this).find(".carrRemark").children().removeAttr("disabled")
								$(this).find(".carrSlectNameOption").removeAttr("disabled")
							})
							countCarrBusin()
						 }
						 if(dataModel.couponList.length>0){
							 $("#DiscountTable").parent().css({display:"block"})
							  dataModel.couponList.map(function(couponListOpt,index){
								 if(index!=0){
									 $("#DiscountTable tbody").append(discountHtml); 
									 $("#DiscountTable tbody tr:last").attr("id","thirdDisount_"+(index+1))
									 $("#DiscountTable tbody tr:last").find(".discountRowNumber").text((index+1))
								 }
								// $("#DiscountTable tbody "+"#thirdDisount_"+(index+1)).find(".thirdDiscountId").text(couponListOpt.id)
								$("#DiscountTable tbody "+"#thirdDisount_"+(index+1)).find(".discountSelectUnit").children().html(thirdDisountUntilOpt)
								 searchThirdDiscount(couponListOpt.unitId,"thirdDisount_"+(index+1))
								 $("#DiscountTable tbody #thirdDisount_"+(index+1)).find(".discountSelectUnitOption").find('option[value='+couponListOpt.unitId+']').attr("selected",true)
								 $("#DiscountTable tbody #thirdDisount_"+(index+1)).find(".discountActiveNameOption").find('option[value='+couponListOpt.couponId+']').attr("selected",true).prop('disabled',false);
								 $("#DiscountTable tbody #thirdDisount_"+(index+1)).find(".inputthirdReturnAmount").val(couponListOpt.amount)
                                  $("#DiscountTable tbody #thirdDisount_"+(index+1)).find(".settleAmountInput").removeAttr("disabled")

								 $("#DiscountTable tbody #thirdDisount_"+(index+1)).find(".settleAmountInput").val(couponListOpt.settleAmount||0)

								 $("#DiscountTable tbody #thirdDisount_"+(index+1)).find(".thirdBusinNum").children().val(couponListOpt.busNo).removeAttr("disabled")
								 $("#DiscountTable tbody #thirdDisount_"+(index+1)).find(".thirdSaleInput1").storeSales({
										sectionId:'storeInput',
										search:false,
									})
								$("#DiscountTable tbody #thirdDisount_"+(index+1)).find(".thirdSaleInput2").storeSales({
									sectionId:'storeInput',
									search:false,
								})
								 $("#DiscountTable tbody #thirdDisount_"+(index+1)).find(".thirdSaleInput1").val(couponListOpt.saleManName1).data("employeeId",couponListOpt.saleManId1);
								 $("#DiscountTable tbody #thirdDisount_"+(index+1)).find(".thirdSaleInput2").val(couponListOpt.saleManName2).data("employeeId",couponListOpt.saleManId2);
							 })
							 countDiscountAmount()
							  $("#DiscountTable tbody tr").each(function(index,value){
								  $(this).find(".thirdDiscountAmountInput").attr("disabled",true);
								  $(this).find(".inputthirdReturnAmount").removeAttr("disabled")
								  $(this).find(".discountRemark").children().removeAttr("disabled")
								  $(this).find(".discountActiveNameOption").removeAttr("disabled")
							  })
						}
						 countPayAmount();
						 $.each(list,function(i,item){
							 $('.inputProductNum').eq(i).val(item.goodsCount).data('max',item.goodsCount);
						 })
						 countProductTotal();
					}else{
						$.zxsaas_plus.showalert('error',data.desc); 
					}
				 
	    		},
	    		error:function(){
	    			alert('请求失败！')
	    		}
	    	})
		}else{
			$.request({
	    		type:'POST',
	        	url:'/manager/inventory/retail/delivery/loadDraftOrder',
	        	dataType:'json',
	        	data:{"id": id},
	        	success:function(data){
					 if(data.result==1){
						 var transDraftData=data.data.obj;
						 var list = transDraftData.detailList;
						 fillData(transDraftData);
						 $.each(list,function(i,item){
							 $('.inputProductNum').eq(i).val(item.goodsCount).data('max',item.goodsCount);
						 })
						 countProductTotal();
                         defaultRefundMethod()
						 $('.inputImeiInfo').each(function(){
							 $(this).attr('disabled',true);
						 })
						 $('.inputAuxImeiInfo').each(function(){
							 $(this).attr('disabled',true);
						 })
						 codeDate(transDraftData.billsCode,'#dateInput');
						 $('.ContactUnitBox').hide();
						 $('#carrierImg,#Value-addedImg,#discountImg,#StaBusinessImg').unbind("click");
						 $('#saleInput,#storeInput,#addProduct,#addcarrRow,#discount,#stagingBusin').prop('disabled',true);
						 $('.showSaleManBox button,.showBox button,.showVipBox,.editProduct,.addGiftslastRow').hide();
						 $('.realPaymentInput').prop({readonly:false,disabled:false});
						 $('#posAmount,#otherAccount').prop('disabled',false);
					}else{
						$.zxsaas_plus.showalert('error',data.desc); 
					}
				 
	    		},
	    		error:function(){
	    			alert('请求失败！')
	    		}
	    	})
		}
		
	}

	function CompareDate(d1,d2)
	{
		return ((new Date(d1.replace(/-/g,"\/"))) > (new Date(d2.replace(/-/g,"\/"))));
	}
	
	function codeDate(obj,name){
		var menuCode=$('#AUTH').attr('data-code');
		var t = obj.split('-')[0];
		var reg = /[A-Z]/g;
		t = t.replace(reg,"");
		t = t.replace(t.substr(0,4),t.substr(0,4)+'-');
		t = t.replace(t.substr(0,7),t.substr(0,7)+'-');
		if(menuCode){
			$.ajax({
				url: '/manager/inventory/common/getInventoryBillsDate',
				type: 'POST',
				dataType:'json',
				data:{
					'menuCode':menuCode
				},
				success: function(data){
					if(data.result==1||data.result=='1'){
						var cur_data =data.data;
						current_date=cur_data.minDate;
						var min = CompareDate(current_date,t)?current_date:t;
						$(name).datePlu({
							endDate:false,
							minTime: min
						})
					}
				},
				error: function(msg){
				}
			});
		}else{
			$(name).datePlu({
				endDate:false,
				minTime: t
			})
		}
	}
	
//判断成本金额(保存按钮)
 $(document).on('click','.saveButton',function(){
		if(Number($(".arrears").text())!=0){
            $.zxsaas_plus.showalert("提示","未退金额必须等于0！");
            return
		}

    	getRetailValue();
     var flag=false;
     for (var int = 0; int < getRetailDetailModel.detailList.length; int++) {
         if (getRetailDetailModel.detailList[int].isGift==0&&$.parseFloat(getRetailDetailModel.detailList[int].amount) == 0) {
             flag = true
         }
     }
     if(flag==true){
         $.zxsaas_plus.showconfirm('提示','单据中存在不是赠品,退款金额为0的商品，是否确认保存',function () {
             saveRetail()
         },function () {
             return;
         })
     }else{
         saveRetail()
     }
     function saveRetail() {
         $.request({
             type: 'POST',
             url: '/manager/inventory/retail/returnGoods/getCostPrice',
             dataType: 'json',
             contentType: "application/json",
             data: JSON.stringify(getRetailDetailModel.detailList),
             success: function (data) {
                 getRetailDetailModel.detailList = data.data.detailList;
                 if (data.result == 1) {
                     save();
                 } else if (data.result == -1) {
                     $("#saveTipModal").modal("show");
                     $(".stip").text(data.data.message);
                 } else {
                     $.zxsaas_plus.showalert('error', data.desc);
                 }
             },
             error: function () {
                 alert('请求失败！')
             }
         })
     }
    })
    
 //继续
 $(document).on('click','#jixu',function(){
	   $.zxsaas_plus.showconfirm("", " 继续将会以0成本入库商品，确定继续吗？", function () {
		   save();
       }, function () {

       });
 })
 
 //    历史单据
    $('.hisbill').click(function(){
		 window.parent.openWorkBoxByMenutext('零售收银台',basePath + '/inventory/retail/cashier/main?tabType=2',true);
    })
 
 
 //录入成本
 $(document).on('click','#lrCost',function(){
	 $('#saveTipModal').modal('hide');
	 $('#saveTabModal').modal('show');
	 $('#costTab tbody').html('');
	 $.each(getRetailDetailModel.detailList,function(i,item){
		 if(item.amtcost==0){
			 item.imei = item.imei==null?"":item.imei;
			 var tr = '<tr><td class="costNum">'+ item.orderno +'</td><td>'+ item.goodsName +'</td><td>'+ item.imeiName +
			 '</td><td><input type="text" class="form-control costinp" onkeyup="checkInput.checkNum(this,10)" /></td></tr>';
			 $('#costTab tbody').append(tr);
		 }
	 })
    
 })
 
 $('.costSave').click(function(){
	 $('.costinp').each(function(i,item){
		 var val = $(item).val();
		 if(val == ""){
			 val = 0;
		 }
		 var num = $(item).parent().parent().find('.costNum').text();
		 $.each(getRetailDetailModel.detailList,function(j,obj){
			 if(obj.orderno==num){
				 obj.amtcost = 0-val;
			 }
		 })
	 })
	 save();
 })
 
 // 保存过账
 function save(){
 	$.request({
   		type:'POST',
        	url:'/manager/inventory/retail/returnGoods/saveAndExecuteOrder',
        	dataType:'json',
        	contentType: "application/json",
        	data:JSON.stringify(getRetailDetailModel),
        	success:function(data){
    		 $("#retailBillsId").val(data.data.billsId)// 单据id
			 if(data.result==1||data.result==-2||data.result==2){
				 $.zxsaas_plus.showalert('success',data.desc);
				 location.href='/manager/inventory/retail/returnGoods/toPrint?bId='+data.data.billsId;
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