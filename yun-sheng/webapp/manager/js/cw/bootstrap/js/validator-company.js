
/*bootstrapValidator验证*/

function refreshValidator(formId){
	$(formId).data('bootstrapValidator').resetForm();
	$(formId).data('bootstrapValidator').validate();  
}
/*billsHeaderForm   */
function refreshValidatorField(fieldName,formId){
	$(formId).data('bootstrapValidator')  
    .updateStatus(fieldName, 'NOT_VALIDATED',null)  
     .validateField(fieldName); 
}

var checkRole = function(formId) {
	$(formId).bootstrapValidator( {
		// container: 'tooltip',//气泡形式提示
		// excluded: [':disabled'],//tab切换 控制
		// live: 'disabled',
		message : 'This value is not valid',
		feedbackIcons : {
			valid : 'glyphicon glyphicon-ok',
			invalid : 'glyphicon glyphicon-remove',
			validating : 'glyphicon glyphicon-refresh'
		},
		fields : {
			billsDate: {
	            validators: {
	                notEmpty: {
	                    message: '字段必填'
	                }
	            }
	        },
			billsCode : {
				validators : {
//					notEmpty : {
//						message : '必填项'
//					},
					stringLength : {
						min : 0,
						max : 128,
						message : '请输入0-128个字符'
					},
					regexp : {
						regexp : /^[a-zA-Z0-9]*$/,
						message : '请输入字母、数字组成的字符串'
					}
				}
			},
			imei : {
				validators : {
//				notEmpty : {
//					message : '必填项'
//				},
				stringLength : {
					min : 0,
					max : 80,
					message : '请输入0-80个字符'
				},
				regexp : {
					regexp : /^[a-zA-Z0-9]*$/,
					message : '请输入字母、数字组成的字符串'
				}
			}
			},
			adjustAmount : {
				validators : {
					notEmpty : {
						message : '必填项'
					},
					stringLength : {
						min : 0,
						max : 15,
						message : '请输入0-15个字符'
					},
					regexp : {
						regexp : /^[0-9]*\.{0,1}[0-9]{0,2}$/,
						message : '请输入至多15位数字,2位小数'
					}
				}
			},
			adjustCuase : {
				validators : {
					notEmpty : {
						message : '必填项'
					},
					stringLength : {
						min : 0,
						max : 256,
						message : '请输入0-256个字符'
					}
				}
			},
			remark : {
				validators : {
//					notEmpty : {
//						message : '必填项'
//					},
					stringLength : {
						min : 0,
						max : 256,
						message : '请输入0-256个字符'
					}
				}
			},
			
            groupCode: {
                validators: {
					regexp : {
						regexp : /^[^\u4e00-\u9fa5]*$/,
						message : '禁止输入中文'
					},
                    stringLength : {
						min : 0,
						max : 32,
						message : '请输入0-32个字符'
					}
                }
            },
            groupName: {
                validators: {
                    stringLength : {
						min : 0,
						max : 64,
						message : '请输入0-64个字符'
					}
                }
            },
            groupRemark: {
                validators: {
                    stringLength : {
						min : 0,
						max : 256,
						message : '请输入0-256个字符'
					}
                }
            },
            content1 : {
            	validators: {
	                stringLength : {
						min : 0,
						max : 64,
						message : '请输入0-64个字符'
					}
	            }
            },
            code: {
                validators: {
					regexp : {
						regexp : /^[^\u4e00-\u9fa5]*$/,
						message : '禁止输入中文'
					},
                    stringLength : {
						min : 0,
						max : 32,
						message : '请输入0-32个字符'
					}
                }
            },
		}
	});
};


var checkInput = {

    //检查数字  n位长度 2位小数
    checkNumFu : function(t,n){
			var str = t.value;
			var rex = new RegExp('^(-)?(\\d{0,' + (n-2) + '})(\\.)?(\\d{0,2})$');
			if(!rex.test(str)){
				$(t).val('');
			}
		},
		//检查数字  n位长度
		checkNumPure : function(t,n){
			var str = t.value;
			var rex = new RegExp('^[0-9]{0,' + (n-2) +'}$');
			if(!rex.test(str)){
				$(t).val('');
				$.zxsaas_plus.showalert('提示','只能包含数字,且至多' + n + '位');
			}	
		},
		//检查数字  n位长度 2位小数
		checkNum : function(t,n){
			var str = t.value;
			var rex = new RegExp('^[0-9]{1,' + (n-2) + '}\.{0,1}[0-9]{0,2}$');
			//var rex = /^[1-9]\d{12}\.?\d{2}$/;
			if(!rex.test(str)){
				$(t).val('');
//				$.zxsaas_plus.showalert('提示','只能包含数字,且至多' + n + '位,2位小数');
			}
//			$(t).val(Math.round(Number($(t).val())*100)/100);
			if(isNaN($(t).val())){
				$(t).val('')
			}
		},
		//检查数字  n位长度 2位小数
		ckNum : function(t,n){
			var str = t.value;
			var rex = new RegExp('^[0-9]{1,' + (n-2) + '}\.{0,1}[0-9]{0,2}$');
			//var rex = /^[1-9]\d{12}\.?\d{2}$/;
			if(!rex.test(str)){
				$(t).val('');
				$.zxsaas_plus.showalert('提示','只能包含数字,且至多' + n + '位,2位小数');
			}
		//	$(t).val(Math.round(Number($(t).val())*100)/100);
			if(isNaN($(t).val())){
				$(t).val('')
			}
		},
		//检查数字  n位长度 3位小数
		checkNum3 : function(t,n){
			var str = t.value;
			var rex = new RegExp('^[0-9]{1,' + (n-3) + '}\.{0,1}[0-9]{0,3}$');
			if(!rex.test(str)){
				$(t).val('');
				$.zxsaas_plus.showalert('提示','只能包含数字,且至多' + n + '位,3位小数');
			}	
			//(t.value.length > n) && (t.value = t.value.substring(0,n))
		},
		//长度
		checkStr : function(t,n){
			if(t.value.length > n){
				$(t).val('');
				$.zxsaas_plus.showalert('提示','至多' + n + '位');
			}
		},
		//字母、数字
		checkStrNum : function(t,n){
			var reg = new RegExp('^[a-zA-Z0-9]{0,' + n + '}$');
			if(!reg.test(t.value)){
				$(t).val('');
				$.zxsaas_plus.showalert('提示','只能包含字母、数字,且至多' + n + '位');
			}
		},
		//字母、数字、中文
		checkStrNumCn : function(t,n){
			var reg = new RegExp('^[\u4E00-\u9FA5a-zA-Z0-9]{0,' + n + '}$');
			if(!reg.test(t.value)){
				$(t).val('');
				$.zxsaas_plus.showalert('提示','只能包含字母、数字或者中文,且至多' + n + '位');
			}
		},
		//字母、数字
		checkStrNumPlus : function(t,s,e){
			var reg = new RegExp('^[a-zA-Z0-9]{' + s + ',' + e + '}$');
			if(!reg.test(t.value)){
				$(t).val('');
				$.zxsaas_plus.showalert('提示','只能包含字母、数字,且在' + s + '-' + e + '位');
			}
		},
		//验证备注
		clearNoText : function(t,n){
			if(t.value.length > n){
				t.value = t.value.substring(0,n);
//				$(t).val('');
			}
		},
		//禁止输入非数字
		clearNoNum: function(t,n){
			var reg = new RegExp('^[0-9]{0,' + n + '}$');
			if(!reg.test(t.value)){
				$(t).val('');
				$.zxsaas_plus.showalert('提示','只能包含数字,且至多' + n + '位');
			}
		},
		//禁止中文输入
		checkChinese : function(t,n){
			var reg = new RegExp('^[^\u4e00-\u9fa5]{0,' + n + '}$');
			if(!reg.test(t.value)){
				$(t).val('');
				$.zxsaas_plus.showalert('提示','不能包含中文,且至多' + n + '位');
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
		//禁止特殊字符,允许中间一个空格存在，多个空格要转换成一个
		checkNotCharsNull : function(t,n){
			var reg = new RegExp('^([\u4e00-\u9fa5]+|[a-zA-Z0-9\-_+()*\/]+|[\\s]+){0,' + n + '}$');
			if(!reg.test(t.value) || t.value.length > n){
				$(t).val('');
				$.zxsaas_plus.showalert('提示','不能包含特殊字符,且至多' + n + '位');
			}else{
				var r = /\s+/g;
				t.value=$.trim(t.value).replace(r, ' ');
			}
		},
		//卡号
		checkIdCard : function(t,str){
			var bankCard = /^\d{16}|\d{19}$/,
				qq = /^[1-9][0-9]{4,10}$/,
				weex = /^[a-zA-Z\d_]{5,20}$/,
				idCard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
				phone = /^1(3|4|5|7|8)\d{9}$/,
				telPhone = /(^(\d{3}-)?\d{8})$|(^(\d{4}-)?\d{7})$|(^1(3|4|5|7|8)\d{9}$)/;
			var msg = '',reg = '';
			
			switch (str){
				case 'bank':
					reg = bankCard;
					msg = '银行卡号格式不正确'; 
					break;
				case 'qq':
					reg = qq;
					msg = 'QQ格式不正确'
					break;
				case 'weex':
					reg = weex;
					msg = '微信格式不正确';
					break;
				case 'idCard':
					reg = idCard;
					msg = '身份证号格式不正确';
					break;
				case 'phone':
					reg = phone;
					msg = '手机号格式不正确';
					break;
				case 'telPhone':
					reg = telPhone;
					msg = '联系方式格式不正确';
					break;
				default:
					break;
			}
			if(!reg.test(t.value)){
				$(t).val('');
//				$.zxsaas_plus.showalert('提示','非法的格式 <br />' + msg);
			}
		},
		//判断一个对象是否为空
		isEmptyObject : function(e){
			var t;  
		    for (t in e)  
		        return !1;  
		    return !0
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
		}
	};



















