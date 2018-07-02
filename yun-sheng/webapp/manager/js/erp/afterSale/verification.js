
//验证手机号码(检验13,15,18开头的手机号！)   
function check_telephone(obj){   
    var reg= /^[1][358]\d{9}$/;   
    if(obj.value!=""&&!reg.test(obj.value)){   
        $.zxsaas_plus.showalert("错误","手机号码格式输入错误！");
        obj.value = "";   
        obj.focus();   
        return false;   
    }   
} 

//验证只能为数字   
function checkNumber(obj){   
    var reg = /^([1-9]\d*|0)(\.\d{1,2})?$/;   
    if(obj.value!=""&&!reg.test(obj.value)){   
        $.zxsaas_plus.showalert("错误","只能输入数字以及保留2位小数！");
        obj.value = "";   
        obj.focus();   
        return false;   
    }   
}

//验证不能输入特殊字符
function checkSpecial(obj){   
	var reg = /^([\u4e00-\u9fa5]+|[a-zA-Z0-9]+)$/;   
	if(obj.value!=""&&!reg.test(obj.value)){   
		$.zxsaas_plus.showalert("错误","不能输入特殊字符！");
		obj.value = "";   
		obj.focus();   
		return false;   
	}   
}


//验证是否为中文 
function isChinese(obj,obj_name){   
    var reg=/^[\u0391-\uFFE5]+$/;    
    if(obj.value!=""&&!reg.test(obj.value)){   
        alert(obj_name+'必须输入中文！');   
        obj.value = "";   
        obj.focus();   
        return false;   
    }   
}   

/*bootstrapValidator验证*/

function refreshValidator(formId){
	$(formId).data('bootstrapValidator').resetForm();
	$(formId).data('bootstrapValidator').validate();  
}
/*billsHeaderForm   */
function refreshValidatorField(fieldName,formId){
	$(formId).data('bootstrapValidator').updateStatus(fieldName, 'NOT_VALIDATED').validateField(fieldName); 
}

var inputYF=function(formId){
	$("#verifYF").bootstrapValidator({  
		feedbackIcons : {
			valid : 'glyphicon glyphicon-ok',
			invalid : 'glyphicon glyphicon-remove',
			validating : 'glyphicon glyphicon-refresh'
		},
	    fields: {  /*验证：规则*/
	        dealDate: {  
		        validators: {  
					trigger:"blur",
		            notEmpty: {  
						message: '必填项'  
		            }  
		        }  
	        },
	        repairSectionName: {  
		        validators: {  
					trigger:"blur",
		            notEmpty: {  
						message: '必填项'  
		            }  
		        }  
	        },
	       
			cardNo: {  /*会员卡号*/
		        validators: {  
					trigger:"blur",
					 regexp: {/* 只需加此键值对，包含正则表达式，和提示 */
                        regexp: /^\d{0,20}$/,
                        message: '只能输入数字且长度最大为20'
                    },
		        }  
	        },
	        customerName: {  
		        validators: {  
					trigger:"blur",
					 regexp: {/* 只需加此键值对，包含正则表达式，和提示 */
                        regexp:/^[\u4E00-\u9FA5A-Za-z0-9_]+$/,
                      //  regexp:/^[a-zA-Z0-9_\u2E80-\u9FFF]+$/,
                        message: '名字格式不正确'
                    },
                    stringLength:{
		            	min:2,
		            	max:32,
		            	message:'长度最少2位,最多32位'
		            },
		            notEmpty: {  
						message: '必填项'  
		            }  
		        }  
	        },
	        telephone: {  
		        validators: {  
					trigger:"blur",
		            notEmpty: {  
						message: '必填项'  
		            },
//		            stringLength:{
//		            	min:11,
//		            	max:11,
//		            	message:'请输入11位手机号码'
//		            },
		            regexp: {
                       // regexp: /^1[3|4|5|7|8]{1}[0-9]{9}$/,
                        regexp: /^[0-9]{0,20}$/,
                      //  message: '请输入正确的手机号码'
                    	message: '只能输入数字格式'
                    }
		        }  
	        },
	        nameModle: {  
	           validators: {  
				trigger:"blur",
		            notEmpty: {  
						message: '必填项'  
		            },  
			        stringLength:{
		            	min:0,
		            	max:32,
		            	message:'最多输入32个字符'
	        		},
			        regexp: {
	                    regexp:/^[\u4E00-\u9FA5A-Za-z0-9_]+$/,
	                    message: '格式错误'
	                }
	        	}
	        },
	        weixiuYFT: {  
	        	validators: {  
		        	trigger:"blur",
		        	notEmpty: {  
		        		message: '必填项'  
	        		}  
	        	}
	        },
	        memberAddress: {  
	            validators: {  
		        	trigger:"blur",
		        	stringLength:{
		            	min:0,
		            	max:100,
		            	message:'最多输入100个字符'
	        		},
	        	}  
	        },
	        imei: {  
	            validators: {  
		        	trigger:"blur",
	        		 regexp: {
                        regexp: /^\d{0,20}$/,
                        message: '只能输入小于20位的数字'
                    }
	        	}  
	        },
	        auxiliaryImei: {  
	        	validators: {  
		        	trigger:"blur",
		        	regexp: {
			        	regexp: /^\d{0,20}$/,
			        	message: '只能输入小于20位的数字'
			        }
		        }  
	        },
	        editionNo: {   
	            validators: {  
		        	trigger:"blur",
		        	stringLength:{
		            	min:0,
		            	max:100,
		            	message:'最多输入100个字符'
	        		},
	        		regexp: {
			        	regexp: /^[\u4E00-\u9FA5A-Za-z0-9_]+$/,
			        	message: '请输入正确的版本号'
			        }
	        	}  
	        },
	        salesNo: {   
	            validators: {  
		        	trigger:"blur",
	        		regexp: {
			        	regexp: /^[a-zA-Z0-9]{0,32}$/,
			        	message: '请输入正确的版本号'
			        }
	        	}  
	        },
	        locationAddress: {   
	            validators: {  
		        	trigger:"blur",
		        	stringLength:{
		            	min:0,
		            	max:100,
		            	message:'最多输入100个字符'
	        		}
	        	}  
	        },
	        invoiceNo: {   
	            validators: {  
		        	trigger:"blur",
	        		regexp: {
			        	regexp: /^[a-zA-Z0-9]{0,32}$/,
			        	message: '请输入正确的版本号'
			        }
	        	}  
	        },
	        goodsPhone: {   
	            validators: {  
		        	trigger:"blur",
	        		regexp: {
			        	//regexp: /^1[3|4|5|7|8]{1}[0-9]{9}$/,
			        	regexp: /^[0-9]{0,20}$/,
			        //	message: '请输入正确号码格式'
		        		message: '只能输入数字格式'
			        }
	        	}  
	        },
	        randomAttachment: {   
	            validators: {  
		        	trigger:"blur",
		        	regexp: {
			        	regexp:  /^([\u4e00-\u9fa5]+|[a-zA-Z0-9]+){0,32}$/,
			        	message: '不能输入特殊字符且最多只能输入32位'
			        },
	        	}  
	        },
	        looksDesc: {   
	            validators: {  
		        	trigger:"blur",
		        	stringLength:{
		            	min:0,
		            	max:100,
		            	message:'最多输入100个字符'
	        		}
	        	}  
	        },
	        faultExplain: {   
	            validators: {  
		        	trigger:"blur",
		        	stringLength:{
		            	min:0,
		            	max:100,
		            	message:'最多输入100个字符'
	        		}
	        	}  
	        },
	       
	        
	    }
	});
}
var inputYF2=function(){
	$("#fourTier").bootstrapValidator({  
		feedbackIcons : {
			valid : 'glyphicon glyphicon-ok',
			invalid : 'glyphicon glyphicon-remove',
			validating : 'glyphicon glyphicon-refresh'
		},
	    fields: {  /*验证：规则*/
			 moneyCh: {  
		        validators: {  
					trigger:"blur",
					regexp: {
			        	regexp: /^[0-9]{0,12}\.{0,1}[0-9]{0,2}$/,
			        	message: '只能输入数字且最多只能保留2位小数'
			        }
		        }  
	        },
	        quotePrice: {  
		        validators: {  
					trigger:"blur",
					regexp: {
			        	regexp: /^[0-9]{0,12}\.{0,1}[0-9]{0,2}$/,
			        	message: '只能输入数字且最多只能保留2位小数'
			        }
		        }  
	        },
	        remark: {   
	            validators: {  
		        	trigger:"blur",
		        	stringLength:{
		            	min:0,
		            	max:100,
		            	message:'最多输入100个字符'
	        		}
	        	}  
	        },
		}
	});

}
var chooseYF=function(formId){
	$("#beiYF").bootstrapValidator({  
		feedbackIcons : {
			valid : 'glyphicon glyphicon-ok',
			invalid : 'glyphicon glyphicon-remove',
			validating : 'glyphicon glyphicon-refresh'
		},
	    fields: {  /*验证：规则*/
			YFhideIn4: {  
		        validators: {  
					trigger:"blur",
					regexp: {
			        	regexp: /^[0-9]{0,12}\.{0,1}[0-9]{0,2}$/,
			        	message: '只能输入数字且最多只能保留2位小数'
			        }
		        }  
	        },
	        YFhideIn1: {  
		        validators: {  
					//trigger:"blur",
			        notEmpty: {  
						message: '必填项'  
		            } 
		        }  
	        },
	        YFhideIn2: {  
		        validators: {  
					//trigger:"blur",
			        notEmpty: {  
						message: '必填项'  
		            } 
		        }  
	        },
	        YFhideIn3: {  
		        validators: {  
				//	trigger:"blur",
			        notEmpty: {  
						message: '必填项'  
		            } 
		        }  
	        },
		}
	});
}


//批量模式
var batchValidator=function(formId){
	$("#batchValidator").bootstrapValidator({  
		feedbackIcons : {
			valid : 'glyphicon glyphicon-ok',
			invalid : 'glyphicon glyphicon-remove',
			validating : 'glyphicon glyphicon-refresh'
		},
	    fields: {  /*验证：规则*/
			jxType: {  
		        validators: {  
					trigger:"blur",
			        notEmpty: {  
						message: '必填项'  
		            } 
		        }  
	        },
	        datetimepickerStart2: {  
		        validators: {  
					trigger:"blur",
			        notEmpty: {  
						message: '必填项'  
		            } 
		        }  
	        },
	        batchWEI: {  
		        validators: {  
					trigger:"blur",
			        notEmpty: {  
						message: '必填项'  
		            } 
		        }  
	        },
	        wanglai2: {  
		        validators: {  
					trigger:"blur",
			        notEmpty: {  
						message: '必填项'  
		            } 
		        }  
	        },
	        contactBy: {  
		        validators: {  
					trigger:"blur",
					regexp: {
			        	regexp:/^[\u4E00-\u9FA5A-Za-z0-9_]+$/,
			        	message: '格式错误'
			        }
		        }  
	        },
	        contactPhone: {  
		        validators: {  
					trigger:"blur",
					regexp: {
			        	//regexp: /^1[3|4|5|7|8]{1}[0-9]{9}$/,
			        	regexp: /^[0-9]{0,20}$/,
			        	message: '只能输入数字格式'
			        }
		        }  
	        },
	        address: {  
		        validators: {  
					trigger:"blur",
					stringLength:{
		            	min:0,
		            	max:100,
		            	message:'最多输入100个字符'
	        		}
		        }  
	        },
		}
	})
}

//批量表格验证
var tableInput={
		//只能输入数字
		inputNum : function(t,n){
			var str = t.value;
			var rex = new RegExp('^[0-9]{0,'+n+'}$');
			//var rex = /^[1-9]\d{12}\.?\d{2}$/;
			if(!rex.test(str)){
				$(t).val('');
				$.zxsaas_plus.showalert('提示','只能包含数字,且至多'+n+'位');
			}	
		},
		//检查数字  n位长度 2位小数
		checkNum : function(t,n){
			var str = t.value;
			var rex = new RegExp('^[0-9]{0,' + (n-2) + '}\.{0,1}[0-9]{0,2}$');
			//var rex = /^[1-9]\d{12}\.?\d{2}$/;
			if(!rex.test(str)){
				$(t).val('');
				$.zxsaas_plus.showalert('提示','只能包含数字,且至多' + n + '位,2位小数');
			}	
		},
		//只限制字数，不限制格式
		checkStr : function(t,n){
			if(t.value.length > n){
				$(t).val('');
				$.zxsaas_plus.showalert('提示','至多' + n + '位');
			}
		},
		//禁止特殊字符
		checkNotChars : function(t,n){
			var reg = new RegExp('^([\u4e00-\u9fa5]+|[a-zA-Z0-9\-_+\/]+){0,' + n + '}$');
			if(!reg.test(t.value) || t.value.length > n){
				$(t).val('');
				$.zxsaas_plus.showalert('提示','不能包含特殊字符,且至多' + n + '位');
			}
//			if(t.value.length > n){
//				t.value = t.value.substring(0,n);
//			}
		},
		//时间验证
		checkTime : function(t,s,e){
			var startTime = new Date($(s).val().replace(/\-/g,'/'));
			var endTime = new Date($(e).val().replace(/\-/g,'/'));
			var flag = (endTime < startTime) ? false : true;
			if(!flag){  
			    $.zxsaas_plus.showalert("提示","前后日期不合法!");
				$(t).val('');
			    return;  
			}  
		},
		//当前时间验证
		thisTime : function(t,s,e){
			var thisTime = new Date($(s).val().replace(/\-/g,'/'));
			//var endTime = new Date($(e).val().replace(/\-/g,'/'));
			endTime=dateTime();
			var flag = (endTime < thisTime) ? false : true;
			if(!flag){  
			    $.zxsaas_plus.showalert("提示","选择的日期不合法!");
				$(t).val('');
			    return;  
			}  
		}
		
}

var dateTime = function(){
	var today=new Date();
	var year=today.getFullYear();
	var month=today.getMonth()+1;
	var day=today.getDate();
	return today;
}

//售后处理
var afterSales = function(formId){
	$("#afterSales").bootstrapValidator({  
		feedbackIcons : {
			valid : 'glyphicon glyphicon-ok',
			invalid : 'glyphicon glyphicon-remove',
			validating : 'glyphicon glyphicon-refresh'
		},
	    fields: {  /*验证：规则*/
			billsNo: {  
		        validators: {  
					trigger:"blur",
					regexp: {
			        	regexp: /^[a-zA-Z0-9]{0,32}$/,
			        	message: '只能输入数字和字母且最多只能保留32位小数'
			        },
//			        stringLength:{
//		            	min:0,
//		            	max:100,
//		            	message:'最多输入100个字符'
//	        		}
		        }  
	        },
		}
	});

}

//自修处理
var toGet1 = function(formId){
	$("#toGet1").bootstrapValidator({  
		feedbackIcons : {
			valid : 'glyphicon glyphicon-ok',
			invalid : 'glyphicon glyphicon-remove',
			validating : 'glyphicon glyphicon-refresh'
		},
	    fields: {  /*验证：规则*/
			newImei: {  
		        validators: {  
					trigger:"blur",
					regexp: {
			        	regexp: /^[0-9]{0,20}$/,
			        	message: '只能输入数字且最多只能输入20位'
			        },
		        }  
	        },
	        newAuxiliaryImei: {  
		        validators: {  
					trigger:"blur",
					regexp: {
			        	regexp: /^[0-9]{0,20}$/,
			        	message: '只能输入数字且最多只能输入20位'
			        },
		        }  
	        },
		}
	});
}

var toGet2 = function(formId){
	$("#toGet2").bootstrapValidator({  
		feedbackIcons : {
			valid : 'glyphicon glyphicon-ok',
			invalid : 'glyphicon glyphicon-remove',
			validating : 'glyphicon glyphicon-refresh'
		},
	    fields: {  /*验证：规则*/
			testResult: {  
		        validators: {  
					trigger:"blur",
					regexp: {
			        	regexp:  /^([\u4e00-\u9fa5]+|[a-zA-Z0-9]+){0,10}$/,
			        	message: '不能输入特殊字符且最多只能输入32位'
			        },
		        }  
	        },
	        repairProject: {  
		        validators: {  
					trigger:"blur",
					regexp: {
			        	regexp:  /^([\u4e00-\u9fa5]+|[a-zA-Z0-9]+){0,32}$/,
			        	message: '不能输入特殊字符且最多只能输入32位'
			        },
		        }  
	        },
	        qitaY1: {  
		        validators: {  
					trigger:"blur",
					regexp: {
			        	regexp: /^[0-9]{0,12}\.{0,1}[0-9]{0,2}$/,
			        	message: '只能输入数字且最多只能保留2位小数'
			        },
		        }  
	        },
	        otherCost: {  
		        validators: {  
					trigger:"blur",
					regexp: {
			        	regexp: /^[0-9]{0,12}\.{0,1}[0-9]{0,2}$/,
			        	message: '只能输入数字且最多只能保留2位小数'
			        },
		        }  
	        },
	        remark: {  
		        validators: {  
					trigger:"blur",
					stringLength:{
		            	min:0,
		            	max:100,
		            	message:'最多输入100个字符'
	        		}
		        }  
	        },
		}
	});
}

//外修返厂
var outer = function(formId){
	$("#outer").bootstrapValidator({  
		feedbackIcons : {
			valid : 'glyphicon glyphicon-ok',
			invalid : 'glyphicon glyphicon-remove',
			validating : 'glyphicon glyphicon-refresh'
		},
	    fields: {  /*验证：规则*/
			trackNo: {  
		        validators: {  
					trigger:"blur",
					regexp: {
			        	regexp:  /^[a-zA-Z0-9]{0,15}$/,
			        	message: '只能输入字母和数字且最多只能输入15位'
			        },
		        }  
	        },
	        unitYF: {  
		        validators: {  
					trigger:"blur",
					stringLength:{
		            	min:0,
		            	max:100,
		            	message:'最多输入100个字符'
	        		}
		        }  
	        },
	        address: {  
		        validators: {  
					trigger:"blur",
					stringLength:{
		            	min:0,
		            	max:100,
		            	message:'最多输入100个字符'
	        		}
		        }  
	        },
	        linkman: {  
		        validators: {  
					trigger:"blur",
					regexp: {
			        	regexp:  /^([\u4e00-\u9fa5]+|[a-zA-Z0-9]+){0,32}$/,
			        	message: '不能输入特殊字符且最多只能输入32位'
			        },
		        }  
	        },
	        telephone: {  
		        validators: {  
					trigger:"blur",
					regexp: {
			        	regexp:  /^[0-9]{0,20}$/,
			        	message: '只能输入数字格式'
			        },
		        }  
	        },
		}
	});
}

//收货结算
var obtainAcctount1 = function(formId){
	$("#obtainAcctount1").bootstrapValidator({  
		feedbackIcons : {
			valid : 'glyphicon glyphicon-ok',
			invalid : 'glyphicon glyphicon-remove',
			validating : 'glyphicon glyphicon-refresh'
		},
	    fields: {  /*验证：规则*/
			billsNo: {  
		        validators: {  
					trigger:"blur",
					regexp: {
			        	regexp:  /^[a-zA-Z0-9]{0,32}$/,
			        	message: '只能输入字母和数字且最多只能输入32位'
			        },
		        }  
	        },
	        trackNo: {  
		        validators: {  
					trigger:"blur",
					regexp: {
			        	regexp:  /^[a-zA-Z0-9]{0,32}$/,
			        	message: '只能输入字母和数字且最多只能输入32位'
			        },
		        }  
	        },
	        expressVer: {  
		        validators: {  
					trigger:"blur",
					regexp: {
			        	regexp:  /^([\u4e00-\u9fa5]+|[a-zA-Z0-9]+){0,32}$/,
			        	message: '不能输入特殊字符且最多只能输入32位'
			        },
		        }  
	        },
		}
	});
}
var obtainAcctount2 = function(formId){
	$("#obtainAcctount2").bootstrapValidator({  
		feedbackIcons : {
			valid : 'glyphicon glyphicon-ok',
			invalid : 'glyphicon glyphicon-remove',
			validating : 'glyphicon glyphicon-refresh'
		},
	    fields: {  /*验证：规则*/
			newImei: {  
		        validators: {  
					trigger:"blur",
					regexp: {
			        	regexp:  /^[0-9]{0,20}$/,
			        	message: '只能输入数字且最多只能输入20位'
			        },
		        }  
	        },
	        newAuxiliaryImei: {  
		        validators: {  
					trigger:"blur",
					regexp: {
			        	regexp:  /^[0-9]{0,20}$/,
			        	message: '只能输入数字且最多只能输入20位'
			        },
		        }  
	        },
	        repairCost: {  
		        validators: {  
					trigger:"blur",
					regexp: {
			        	regexp: /^[0-9]{0,12}\.{0,1}[0-9]{0,2}$/,
			        	message: '只能输入数字且最多只能保留2位小数'
			        },
		        }  
	        },
	        serviceAmount: {  
		        validators: {  
					trigger:"blur",
					regexp: {
			        	regexp: /^[0-9]{0,12}\.{0,1}[0-9]{0,2}$/,
			        	message: '只能输入数字且最多只能保留2位小数'
			        },
		        }  
	        },
		}
	});
}
var obtainAcctount3 = function(formId){
	$("#kuanVida").bootstrapValidator({  
		feedbackIcons : {
		valid : 'glyphicon glyphicon-ok',
		invalid : 'glyphicon glyphicon-remove',
		validating : 'glyphicon glyphicon-refresh'
	},
	fields: {  /*验证：规则*/
		kuanVer: {  
			validators: {  
				trigger:"blur",
				regexp: {
					regexp:  /^[0-9]{0,20}$/,
					message: '只能输入数字且最多只能输入20位'
				},
			}  
		},
	}
	});
}


//取机结算
var settleVer = function(formId){
	$("#settleVer").bootstrapValidator({  
		feedbackIcons : {
		valid : 'glyphicon glyphicon-ok',
		invalid : 'glyphicon glyphicon-remove',
		validating : 'glyphicon glyphicon-refresh'
	},
	fields: {  /*验证：规则*/
		custom: {  
			validators: {  
				trigger:"blur",
				regexp: {
		        	regexp:  /^([\u4e00-\u9fa5]+|[a-zA-Z0-9]+){0,32}$/,
		        	message: '不能输入特殊字符且最多只能输入32位'
		        },
			}  
		},
		telephone: {  
			validators: {  
				trigger:"blur",
				regexp: {
		        	regexp:  /^[0-9]{0,20}$/,
		        	message: '只能输入数字且最多输入20位'
		        },
			}  
		},
		address: {  
			validators: {  
				trigger:"blur",
				stringLength:{
	            	min:0,
	            	max:100,
	            	message:'最多输入100个字符'
        		}
			}  
		},
		express: {  
			validators: {  
				trigger:"blur",
				regexp: {
		        	regexp:  /^([\u4e00-\u9fa5]+|[a-zA-Z0-9]+){0,32}$/,
		        	message: '不能输入特殊字符且最多只能输入32位'
		        },
			}  
		},
		trackNo: {  
			validators: {  
				trigger:"blur",
				regexp: {
		        	regexp:  /^[a-zA-Z0-9]{0,32}$/,
		        	message: '不能输入特殊字符且最多只能输入32位'
		        },
			}  
		},
		shishou: {  
			validators: {  
				trigger:"blur",
				regexp: {
		        	regexp: /^[0-9]{0,12}\.{0,1}[0-9]{0,2}$/,
		        	message: '只能输入数字且最多只能保留2位小数'
		        },
			}  
		},
		YFhideIn4: {  
			validators: {  
				trigger:"blur",
				regexp: {
		        	regexp: /^[0-9]{0,12}\.{0,1}[0-9]{0,2}$/,
		        	message: '只能输入数字且最多只能保留2位小数'
		        },
			}  
		},
		haihui1: {  
			validators: {  
				trigger:"blur",
				regexp: {
		        	regexp: /^[0-9]{0,12}\.{0,1}[0-9]{0,2}$/,
		        	message: '只能输入数字且最多只能保留2位小数'
		        },
			}  
		},
	}
	});
}


//增值服务管理
var appreciationVer = function(formId){
	$("#appreciationVer").bootstrapValidator({  
		feedbackIcons : {
		valid : 'glyphicon glyphicon-ok',
		invalid : 'glyphicon glyphicon-remove',
		validating : 'glyphicon glyphicon-refresh'
	},
	fields: {  /*验证：规则*/
		imei1: {  
			validators: {  
				trigger:"blur",
				regexp: {
		        	regexp:  /^[0-9]{0,20}$/,
		        	message: '只能输入数字且最多只能输入20位'
		        },
			}  
		},
		cardNo1: {  
			validators: {  
				trigger:"blur",
				regexp: {
		        	regexp:  /^[0-9]{0,20}$/,
		        	message: '只能输入数字且最多输入20位'
		        },
			}  
		},
		memberName1: {  
			validators: {  
				trigger:"blur",
				regexp: {
		        	regexp:  /^([\u4e00-\u9fa5]+|[a-zA-Z0-9]+){0,32}$/,
		        	message: '不能输入特殊字符且最多只能输入32位'
		        },
			}  
		},
		telephone1: {  
			validators: {  
				trigger:"blur",
				regexp: {
		        	regexp:  /^[0-9]{0,20}$/,
		        	message: '只能输入数字且最多只能输入20位'
		        },
			}  
		},
	}
	});
}

var appreciationVer2 = function(formId){
	$("#appreciationVer2").bootstrapValidator({  
		feedbackIcons : {
		valid : 'glyphicon glyphicon-ok',
		invalid : 'glyphicon glyphicon-remove',
		validating : 'glyphicon glyphicon-refresh'
	},
	fields: {  /*验证：规则*/
		imei2: {  
			validators: {  
				trigger:"blur",
				regexp: {
		        	regexp:  /^[0-9]{0,20}$/,
		        	message: '只能输入数字且最多只能输入20位'
		        },
			}  
		},
		cardNo2: {  
			validators: {  
				trigger:"blur",
				regexp: {
		        	regexp:  /^[0-9]{0,20}$/,
		        	message: '只能输入数字且最多输入20位'
		        },
			}  
		},
		memberName2: {  
			validators: {  
				trigger:"blur",
				regexp: {
		        	regexp:  /^([\u4e00-\u9fa5]+|[a-zA-Z0-9]+){0,32}$/,
		        	message: '不能输入特殊字符且最多只能输入32位'
		        },
			}  
		},
		telephone2: {  
			validators: {  
				trigger:"blur",
				regexp: {
		        	regexp:  /^[0-9]{0,20}$/,
		        	message: '只能输入数字且最多只能输入20位'
		        },
			}  
		},
		moneyCh: {  
			validators: {  
				trigger:"blur",
				regexp: {
		        	regexp: /^[0-9]{0,12}\.{0,1}[0-9]{0,2}$/,
		        	message: '只能输入数字且最多只能保留2位小数'
		        },
			}  
		},
	}
	});
}










