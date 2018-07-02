/*自定义验证规则——BootstrapValidator*/
(function($){
	//只能输入数字
	$.fn.bootstrapValidator.validators.Dig = {
            validate: function(validator, $field, options) {
                var value = $field.val();
                var reg=/^[0-9]*$/;
                if(reg.test(value))
                return true;
                else
                return false;
            }
        }
	//只能输入整数
	$.fn.bootstrapValidator.validators.Dig_Complete = {
            validate: function(validator, $field, options) {
                var value = $field.val();
                var reg=/^\-{0,1}[0-9]+$/;
                if(reg.test(value)||value=="")
                return true;
                else
                return false;
            }
        }
	
	//只能输入数字(去空)
	$.fn.bootstrapValidator.validators.Dig_Vacume = {
            validate: function(validator, $field, options) {
                var value = $field.val();
                var reg=/^[0-9]*[1-9][0-9]*$/;
                if(reg.test(value)||value=="")
                return true;
                else
                return false;
            }
        }
	
	//最小长度11为(去空,正数字)
	$.fn.bootstrapValidator.validators.minLength11_dig_vacume = {
            validate: function(validator, $field, options) {
                var value = $field.val();
                var reg=/^[0-9]*[1-9][0-9]*$/;
                if(value.length==11&&reg.test(value)||value=="")
                  return true;
                else{
                	if(!reg.test(value)){
                		return true;
                	}else{
                		if(value.length!=11){
                			return false;
                		}
                	}
                  return true;
                }
            }
        }
	//最小长度5为(去空,正数字)
	$.fn.bootstrapValidator.validators.minLength5_dig_vacume = {
            validate: function(validator, $field, options) {
                var value = $field.val();
                var reg=/^[0-9]*[1-9][0-9]*$/;
                if(value.length>4&&reg.test(value)||value=="")
                  return true;
                else{
                	return false;
                }
            }
        }
	//只能输入正整数
	$.fn.bootstrapValidator.validators.Dig_Positive = {
            validate: function(validator, $field, options) {
                var value = $field.val();
                var reg=/^[0-9]*[1-9][0-9]*$/;
                if(reg.test(value))
                return true;
                else
                return false;
            }
        }
	//只能输入正整数（去空）
	$.fn.bootstrapValidator.validators.Dig_Positive_vacume = {
            validate: function(validator, $field, options) {
                var value = $field.val();
                var reg=/^[0-9]*[1-9][0-9]*$/;
                if(reg.test(value)||value=="")
                return true;
                else
                return false;
            }
        }
	//数值大于5(去除空的情况)	
	$.fn.bootstrapValidator.validators.valueMin = {
            validate: function(validator, $field, options) {
                var value = $field.val();
                if(parseInt(value)>5||value=="")
                return true;
                else
                return false;
            }
        }
	//只能输入中文、英文（字母）
	$.fn.bootstrapValidator.validators.Cn_Aph = {
            validate: function(validator, $field, options) {
                var value = $field.val();
                var reg=/^[\u4e00-\u9fa5a-zA-Z]+$/;
                if(reg.test(value))
                return true;
                else
                return false;
            }
        }
	//只能输入中文、英文（字母）去空
	$.fn.bootstrapValidator.validators.Cn_Aph_vacume = {
            validate: function(validator, $field, options) {
                var value = $field.val();
                var reg=/^[\u4e00-\u9fa5a-zA-Z]+$/;
                if(reg.test(value)||value==""){
                 return true;
                }
                else
                 return false;
            }
        }
	//只能输入整数或者小数（数字、小数点出去空）
	$.fn.bootstrapValidator.validators.Dig_Point = {
            validate: function(validator, $field, options) {
                var value = $field.val();
                var reg=/^[0-9]+([.]{1}[0-9]+){0,1}$/;
                if(reg.test(value)||value=="")
                return true;
                else
                return false;
            }
        }
	//只能输入除去零的整数或者小数（数字、小数点出去空）
	$.fn.bootstrapValidator.validators.DigNotZero_Point = {
            validate: function(validator, $field, options) {
                var value = $field.val();
                var reg=/^[0-9]+([.]{1}[0-9]+){0,1}$/;
                if(reg.test(value)||value==""){
                	if(value=="0"){
                		return false;
                	}
                	return true;
                } else{
                	return false;
                }
            }
     }
	//只能输入整数或者小数（数字、小数点后最多保留两位  去空）
	$.fn.bootstrapValidator.validators.Dig_Point2 = {
            validate: function(validator, $field, options) {
                var value = $field.val();
                var reg=/^\d+(\.\d{1,2})?$/;//小数点后最多保留两位（允许输入小数整数）
                var reg1=/^[0-9]+([.]{1}[0-9]+){0,1}$/;
                if(reg.test(value)||value=="")
                   return true;
                else{
                	if(reg1.test(value)){
                		 return false;
                	}
                   return true;
                }
            }
        }
	//只能输入数字、字母
	$.fn.bootstrapValidator.validators.Dig_Aph = {
            validate: function(validator, $field, options) {
                var value = $field.val();
                var reg=/^[0-9a-zA-Z]*$/g; 
                if(reg.test(value))
                return true;
                else
                return false;
            }
     }
	//只能输入中文、英文、数字、小数点(去空)
	$.fn.bootstrapValidator.validators.Cn_lt_Dig_Point = {
            validate: function(validator, $field, options) {
                var value = $field.val();
                var reg=/^[\u4E00-\u9FA5A-Za-z0-9\.]+$/;
                if(reg.test(value)||value==""||value.length<2){
                  return true;
                }
                else
                  return false;
            }
     }
	//最小长度2为(去空,中文、英文、数字、小数点)
	$.fn.bootstrapValidator.validators.minLength2_dig_vacume = {
            validate: function(validator, $field, options) {
                var value = $field.val();
                var reg=/^[\u4E00-\u9FA5A-Za-z0-9\.]+$/;
                if(value.length>2||value.length==2&&reg.test(value))
                return true;
                else{
                	 if(!reg.test(value)){
                         return true;
                     }else{
                    	 if(value.length<2){
                    		  return false;
                    	 }
                	 
                     }
                   return true;
                }
            }
        }
	
	//最小长度15为(只能输入数字、字母)
	$.fn.bootstrapValidator.validators.Dig_Aph_15 = {
            validate: function(validator, $field, options) {
                var value = $field.val();
                var reg=/^[0-9a-zA-Z]*$/g; 
                if(reg.test(value)){
                   if(value.length>15||value.length==15)
                   return true;
                   else
                   return false;   
                }
                else
                return false;
            }
     }
	//(不可输入中文)
	$.fn.bootstrapValidator.validators.Not_Cn = {
            validate: function(validator, $field, options) {
			  var value = $field.val();
	          //var reg=/^A-Za-z0-9\.\!\#\@\$\%\^\&\*\(\)\-\_\+\=\{\[\}\]\:\;\"\'\>\.\<\,\?\/\~\`]+$/;
	          var reg= /[\u4e00-\u9fa5]+/;
	          if(reg.test(value)){
	           
	                return false;
	          }
	          else{
	             
	          	  return true;   
	            
	          }
            }
     }
	//最小长度5为(不可输入中文)
	$.fn.bootstrapValidator.validators.Not_Cn_5 = {
            validate: function(validator, $field, options) {
                var value = $field.val();
                //var reg=/^A-Za-z0-9\.\!\#\@\$\%\^\&\*\(\)\-\_\+\=\{\[\}\]\:\;\"\'\>\.\<\,\?\/\~\`]+$/;
                var reg= /[\u4e00-\u9fa5]+/;
                if(reg.test(value)){
                 
                      return false;
                }
                else{
                   if(value.length>4){
                	  return true;   
                   }else{
                	  return false;   
                   }
	            }
            }
     }
	//11位手机号码（^[1][358][0-9]{9}$）
	$.fn.bootstrapValidator.validators.cellPhone = {
            validate: function(validator, $field, options) {
                var value = $field.val();
                var reg= /^[1][3578][0-9]{9}$/;
                if(value==""){
                	return true;
                }else{
                	 if(reg.test(value)){
                           
                           return true;
                     }
                     else{
                     	  return false;   
                        
     	            }
                	
                	
                }
             
            }
     }
	//身份证号验证规则
	$.fn.bootstrapValidator.validators.certification = {
            validate: function(validator, $field, options) {
                var value = $field.val();
                var reg=/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
                if(value==""){
                	return true;
                }else{
                	 if(reg.test(value)){
                           
                           return true;
                     }
                     else{
                     	  return false;   
                        
     	            }
                	
                	
                }
             
            }
     }
	//[1-9][0-9]{0,3}1-9999
	$.fn.bootstrapValidator.validators.four = {
            validate: function(validator, $field, options) {
                var value = $field.val();
                var reg=/^[1-9][0-9]{0,3}$/;
                if(value==""){
                	return true;
                }else{
                	 if(reg.test(value)){
                           return true;
                     }
                     else{
                     	  return false;   
                        
     	            }
                	
                	
                }
             
            }
     }
})(window.jQuery);