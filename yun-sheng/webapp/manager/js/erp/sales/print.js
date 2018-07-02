//打印单据
function print(ptype){
	var id = $("#billsHeaderForm input[name='id']").val();
	var imgSrc=$(".rightMap img").attr("src")
	if(id==""){
		$.zxsaas_plus.showalert("提示","打印单据不存在!");
		return;
	}
	if(type=="18"){//销售定单
		 if(imgSrc!="../images/status/statusNotAudit.png"){
			 // var tempKindDIV = $(
				// 		'<fieldset class="fieLeft" id="form3">'+
				// 		'<legend>打印模板类型</legend>'+
				// 		'<div class="">'+
				// 			'<label class="radio-inline"><input type="radio" id="default" name="printTempKind" value="default" checked>默认</label>'+
				// 			'<label class="radio-inline"><input type="radio" id="noChecked" name="printTempKind" value="nocheck" disabled>未审核</label>'+
				// 			'<label class="radio-inline"><input type="radio" id="forceFinished" name="printTempKind" value="check" >已审核及强制完成</label>'+
				// 		'</div>'+
				// 		'</fieldset>'
			 // )
			 ptype = 'check';
		 }else{
			 // var tempKindDIV = $(
				// 		'<fieldset class="fieLeft" id="form3">'+
				// 		'<legend>打印模板类型</legend>'+
				// 		'<div class="">'+
				// 			'<label class="radio-inline"><input type="radio" id="default" name="printTempKind" value="default" checked>默认</label>'+
				// 			'<label class="radio-inline"><input type="radio" id="noChecked" name="printTempKind" value="nocheck" >未审核</label>'+
				// 			'<label class="radio-inline"><input type="radio" id="forceFinished" name="printTempKind" value="check" disabled>已审核及强制完成</label>'+
				// 		'</div>'+
				// 		'</fieldset>'
			 // )
			 ptype = 'nocheck';
		 }
		   
		 // BootstrapDialog.show({
	    //     title: '单据打印',
	    //     message: tempKindDIV,
	    //     buttons: [{label: '确定', cssClass: 'btn-primary',action: function(dialogItself) {dialogItself.close();todo();}},
	    //               {label: '取消',action: function(dialogItself){dialogItself.close();}
	    //     }]
	    // });
	}

	todo(ptype);
	
	//if(type!="18"){//除销售定单的其它所有销售单据
		// var tempKindDIV = $(
		// 		'<fieldset class="fieLeft" id="form3">'+
		// 		'<legend>打印模板类型</legend>'+
		// 		'<div class="">'+
		// 			'<label class="radio-inline"><input type="radio" name="printTempKind" value="showimei" checked>商品明细</label>'+
		// 			'<label class="radio-inline"><input type="radio" name="printTempKind" value="noimei">商品汇总</label>'+
		// 		'</div>'+
		// 		'</fieldset>'
		// )
	  //
	  // BootstrapDialog.show({
	  //     title: '单据打印',
	  //     message: tempKindDIV,
	  //     buttons: [{label: '确定', cssClass: 'btn-primary',action: function(dialogItself) {dialogItself.close();todo();}},
	  //               {label: '取消',action: function(dialogItself){dialogItself.close();}
	  //     }]
	  // });
	//}
	//XSD_PRINT("xsd_print"),XSCK_PRINT("xsck_print"),XSHH_PRINT("xshh_print"),XSTH_PRINT("xsth_print"),WTCK_PRINT("wtck_print"),WTTH_PRINT("wtth_print"),
	function todo(ptype){
		var actionCode="";
		if(type=="18"){
			actionCode="xsd_print";
		}else if(type=="19"){
			actionCode="xsck_print";
		}else if(type=="20"){
			actionCode="xshh_print";
		}else if(type=="21"){
			actionCode="xsth_print";
		}else if(type=="22"){
			actionCode="wtck_print";
		}else if(type=="23"){
			actionCode="wtth_print";
		}
		
		$.printBills('../print/salesBills/'+actionCode, 
			{
		      id: id,//单据id
		      isDraft: isDraft,//是否草稿
		      tempKind: ptype,
		      type: type//单据类型
		    }
		);
	}
}
