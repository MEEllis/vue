//汇总统计
function summary(){
	//汇总每一行
	var ids=$("#dataGrid").getDataIDs();
	 $.each(ids,function(i,value){
	    	var currRow = dataGrid.$grid.jqGrid('getRowData', value);
	    	
	    	var goodsNumber = $.parseInt(currRow.goodsNumber);//数量
	    	var amount = $.parseFloat(currRow.price)*goodsNumber; //金额
	    	var discountRate = $.parseFloat(currRow.discountRate)/100; //折扣率
	    	var discountPrice = $.parseFloat(currRow.price)*($.parseFloat(currRow.discountRate)/100); //折扣单价
	    	//var discountAmount = discountRate * amount;//折扣金额 
	    	var discountedAmount = discountPrice * goodsNumber; //折后金额
	    	
	    	//税率录入
	    	var taxRate =  $.parseFloat(currRow.taxRate)/100;//税率
	    	var taxPrice = discountPrice * taxRate + discountPrice;//含税单价
	    	var taxAmount = taxPrice * goodsNumber;
	    	var taxLimit = (taxPrice - discountPrice)*goodsNumber;
	    	
	    	dataGrid.$grid.jqGrid('setCell', value ,"amount" ,amount);
	    	dataGrid.$grid.jqGrid('setCell', value ,"discountedAmount" ,discountedAmount);
	    	dataGrid.$grid.jqGrid('setCell', value ,"taxPrice" ,taxPrice);
	    	dataGrid.$grid.jqGrid('setCell', value ,"taxAmount" ,taxAmount);
	    	dataGrid.$grid.jqGrid('setCell', value ,"taxLimit" ,taxLimit);
			 //添加串号图标
			 if(currRow.ifManageIMei==1){
				 //添加串号这个图标
				 dataGrid.$grid.jqGrid('setCell', value, "goodsNumber", '', 'ifManageImeiIcon');
			 }else{
				 $("#dataGrid#" +  value + "  td[aria-describedby='dataGrid_goodsNumber']").removeClass('ifManageImeiIcon')
			 }
	  });
    
	//汇总
	var sumGoodsNumber = dataGrid.$grid.getCol('goodsNumber', false, 'sum');  
	var sumAmount = dataGrid.$grid.getCol('taxAmount', false, 'sum');
    var amount = dataGrid.$grid.getCol('amount', false, 'sum').toFixed(2);
    var costPrice = dataGrid.$grid.getCol('costPrice', false, 'sum').toFixed(2);
	dataGrid.$grid.footerData("set",{index:"合计",goodsNumber:sumGoodsNumber,taxAmount:sumAmount,amount:amount,costPrice:costPrice});
	
	summaryBiaoJiao();
}

function summary2(){
	//汇总每一行
	var ids=$("#dataGrid2").getDataIDs();
	 $.each(ids,function(i,value){
	    	var currRow = dataGrid2.$grid.jqGrid('getRowData', value);
	    	
	    	var goodsNumber = $.parseInt(currRow.goodsNumber);//数量
	    	var amount = $.parseFloat(currRow.price)*goodsNumber; //金额
	    	var discountRate = $.parseFloat(currRow.discountRate)/100; //折扣率
	    	var discountPrice = $.parseFloat(currRow.price)*($.parseFloat(currRow.discountRate)/100); //折扣单价
	    	//var discountAmount = discountRate * amount;//折扣金额 
	    	var discountedAmount = discountPrice * goodsNumber; //折后金额
	    	
	    	//税率录入
	    	var taxRate =  $.parseFloat(currRow.taxRate)/100;//税率
	    	var taxPrice = discountPrice * taxRate + discountPrice;//含税单价
	    	var taxAmount = taxPrice * goodsNumber;
	    	var taxLimit = (taxPrice - discountPrice)*goodsNumber;
	    	
	    	dataGrid2.$grid.jqGrid('setCell', value ,"amount" ,amount);
	    	dataGrid2.$grid.jqGrid('setCell', value ,"discountedAmount" ,discountedAmount);
	    	dataGrid2.$grid.jqGrid('setCell', value ,"taxPrice" ,taxPrice);
	    	dataGrid2.$grid.jqGrid('setCell', value ,"taxAmount" ,taxAmount);
	    	dataGrid2.$grid.jqGrid('setCell', value ,"taxLimit" ,taxLimit);

			 //添加串号图标
			 if(currRow.ifManageIMei==1){
				 //添加串号这个图标
                 dataGrid2.$grid.jqGrid('setCell', value, "goodsNumber", '', 'ifManageImeiIcon');
			 }else{
				 $("#dataGrid2#" +  value + "  td[aria-describedby='dataGrid2_goodsNumber']").removeClass('ifManageImeiIcon')
			 }

	    });
    
	//汇总
	var sumGoodsNumber = dataGrid2.$grid.getCol('goodsNumber', false, 'sum');  
	var sumAmount = dataGrid2.$grid.getCol('taxAmount', false, 'sum');
    var amount = dataGrid2.$grid.getCol('amount', false, 'sum').toFixed(2);
	dataGrid2.$grid.footerData("set",{index:"合计",goodsNumber:sumGoodsNumber,taxAmount:sumAmount,amount:amount});
	
	summaryBiaoJiao();
}

//表角金额统计  应收金额==换入含税金额合计-换出含税金额     未收金额=应收金额-收款金额
function summaryBiaoJiao(){
	//换入含税金额合计
	var inTaxAmount = Number($("#dataGrid").footerData("get").taxAmount.replace(/\,/g, ""));
	//换出含税金额合计
	var outTaxAmount = Number($("#dataGrid2").footerData("get").taxAmount.replace(/\,/g, ""));
	//付款金额
	var prepaymentAmount = Number($("#prepaymentAmount").val().replace(/\,/g, ""));
	
	var yingshouAmount=parseFloat(Math.round((inTaxAmount-outTaxAmount)*100))/100;
	var weishouAmount=Number(Math.abs(yingshouAmount)-prepaymentAmount);
	$("#gridFooter input[name='yingshouAmount']").val(Math.abs(yingshouAmount.toFixed(2)));
	if(weishouAmount<0){
//		$.zxsaas_plus.showalert("提示","收款金额不能大于应收金额!");
		$("#gridFooter input[name='prepaymentAmount']").val('0.00');
	}else{
		$("#gridFooter input[name='weishouAmount']").val(weishouAmount.toFixed(2));
		changeAmountDirection();
	}
	
}

//改变金额方向
function changeAmountDirection(){
	//换入含税金额合计
	var inTaxAmount=Number($("#dataGrid").footerData("get").taxAmount.replace(/\,/g, ""));
	//换出含税金额合计
	var outTaxAmount=Number($("#dataGrid2").footerData("get").taxAmount.replace(/\,/g, ""));
	
	var calResult=inTaxAmount-outTaxAmount;
	var prepaymentAmount = Number($("#prepaymentAmount").val().replace(/\,/g, ""));
	if(prepaymentAmount>=0){
		if(calResult>=0){
			$("#prepaymentAmountSpan").html("付款金额  ：");
			$("#yingshouAmountSpan").html("应付金额  ：");
			$("#weishouAmountSpan").html("未付金额  ：");
			var yingfu=Number($("#gridFooter input[name='yingshouAmount']").val().replace(/\,/g, ""));
			if(yingfu<0){
				$.zxsaas_plus.showalert("提示","未付金额不能小于0!");
			}
		}else{
			$("#prepaymentAmountSpan").html("收款金额  ：");
			$("#yingshouAmountSpan").html("应收金额  ：");
			$("#weishouAmountSpan").html("未收金额  ：");
			var weishou=Number($("#gridFooter input[name='weishouAmount']").val().replace(/\,/g, ""));
			if(yingfu<0){
				$.zxsaas_plus.showalert("提示","未收金额不能小于0!");
			}
			
		}
	}else{
		if(calResult>=0){
			$("#prepaymentAmountSpan").html("收款金额  ：");
			$("#yingshouAmountSpan").html("应收金额  ：");
			$("#weishouAmountSpan").html("未收金额  ：");
			var yingshouAmount=(Math.abs(inTaxAmount)-Math.abs(outTaxAmount)).toFixed(2);
			$("#gridFooter input[name='yingshouAmount']").val(yingshouAmount);
			$("#gridFooter input[name='weishouAmount']").val((yingshouAmount-prepaymentAmount).toFixed(2));
		}else{
			$("#prepaymentAmountSpan").html("付款金额  ：");
			$("#yingshouAmountSpan").html("应付金额  ：");
			$("#weishouAmountSpan").html("未付金额  ：");
			var yingshouAmount=(inTaxAmount-outTaxAmount).toFixed(2);
			$("#gridFooter input[name='yingshouAmount']").val(yingshouAmount);
			$("#gridFooter input[name='weishouAmount']").val((yingshouAmount-prepaymentAmount).toFixed(2));
		}
		
	}
	
}