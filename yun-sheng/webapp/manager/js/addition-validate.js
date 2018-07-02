;(function(){

	//该项至少需要输入XX位(位数判断)
	$.validator.addMethod("minlengthx",function(value,element,params){
	    var wrongMessage='';
	    var result;
	    if(value.length<params[0]){
	    	wrongMessage='该项至少需要输入'+params[0]+'位';
	    	 result=false;
	    	
	    }else{
	    	 result=true;
	    }
	    
	    $.validator.messages.minlengthx =wrongMessage;
	    return result;
	
	});

		
		//符合由数字和26个英文字母组成的字符串 中文 小数点	
	$.validator.addMethod("lcnd_format",function(value,element,params){
	    var reg=/^[\u4E00-\u9FA5A-Za-z0-9\.]+$/;
	    if(reg.test(value)){
	         return true;
	    }else{
	         return false;
	    }
	
	},"该项只能输入 中文、英文、数字和小数点");
	 
	//符合由数字和26个英文字母组成的字符串 
	$.validator.addMethod("l_format",function(value,element,params){
	    var reg=/^[A-Za-z0-9]+$/;
	    if(reg.test(value)){
	         return true;
	    }else{
	         return false;
	    }
	
	},"该项只能输入英文或者数字");	
	
	//符合由整数或者小数
	$.validator.addMethod("count_format",function(value,element,params){
	    var reg=/^[0-9]+([.]{1}[0-9]+){0,1}$/;
	    if(reg.test(value)){
	         return true;
	    }else{
	         return false;
	    }
	
	},"该项只能输入整数或者小数");			
				
	
	//符合整数 或者小数（小数点后面保留三位）
	$.validator.addMethod("ild3_format",function(value,element,params){
	    var reg=/^\d+$|^\d{1,8}(\.\d{1,3})?$/;
	    if(reg.test(value)){
	         return true;
	    }else{
	         return false;
	    }
	
	},"该项小数点后只能保留三位");
	
	
	//符合整数 或者小数（小数点后面保留两位）
	$.validator.addMethod("ild2_format",function(value,element,params){
    var reg=/^\d+$|^\d{1,10}(\.\d{1,2})?$/;
    if(reg.test(value)){
         return true;
    }else{
         return false;
    }

},"该项小数点后只能保留两位");
	//精确到小数点后两位
//	$.validator.addMethod("lc_format",function(value,element,params){
//	    var reg= /\d+(\.\d{1,2})?/g	;
//	    if(reg.test(value)){
//	         return true;
//	    }else{
//	         return false;
//	    }
//	
//	},"请精确到小数点后两位")	;		
		
	//00000.1这样的也提示   该项只能输入XXX（整数或者小数）
	$.validator.addMethod("flt_format",function(value,element,params){
	    var n,f;
	    n=$.trim(value);
	    f=parseFloat(n);
	    if(f.toString()==n){
	         return true;
	    }else{
	    	 $(element).val(f);
	         return false;
	    }
	
	},"该项只能输入整数或者小数")	;	
	
	//该项最多允许输入 XXX(数值判断)
	$.validator.addMethod("upLimit_format",function(value,element,params){
		var wrongMessage='';
	    var n,f,result;
	    n=$.trim(value);
	    f=parseFloat(n);//正确格式的浮点数
	    if(f<=params[0]){
	    	  result=true;
	    }else{
	    	wrongMessage="该项最多允许输入"+params[0];
	         
	         result=false;
	    }
	    $.validator.messages.upLimit_format=wrongMessage;
	    return result;
	
	})	;	
	
	
	
})(jQuery);