function refreshValidator(){
	$("#topForm").data('bootstrapValidator').resetForm();
	$("#topForm").data('bootstrapValidator').validate();  
}
function refreshValidatorField(fieldName){
	try {MyEiditGrid.currEditDataGrid.unAllEdit();} catch (e) {}
	$('#topForm').data('bootstrapValidator')  
    .updateStatus(fieldName, 'NOT_VALIDATED',null)  
     .validateField(fieldName); 
}
$(function(){
	//topForm
	/* billsDate sectionName contactsunitName managersName */
   $('#topForm').bootstrapValidator({
        //live: 'disabled',
        message: '这个值是无效的',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
        	billsDate: {
                validators: {
                    notEmpty: {
                        message: '字段必填'
                    }
                }
            },
            billsDateStr: {
                validators: {
                    notEmpty: {
                        message: '字段必填'
                    }
                }
            },
        	sectionName: {
                validators: {
                    notEmpty: {
                        message: '字段必填'
                    }
                }
            },
            contactsunitName: {
                validators: {
                    notEmpty: {
                        message: '字段必填'
                    }
                }
            },
            contactUnitName: {
                validators: {
                    notEmpty: {
                        message: '字段必填'
                    }
                }
            },
            managersName: {
                validators: {
                    notEmpty: {
                        message: '字段必填'
                    }
                }
            },
            managerName: {
                validators: {
                    notEmpty: {
                        message: '字段必填'
                    }
                }
            },
			remark : {
				validators : {
					stringLength : {
						min : 0,
						max : 100,
						message : '请输入0-100个字符'
					}
				}
			}
        }
    });
	//middleForm
	
	//bottomForm
	
});


var checkInput = {
		//检查数字  n位长度 2位小数
		checkNumFu : function(t,n){
			var str = t.value;
			var rex = new RegExp('^(-)?(\\d{0,' + (n-2) + '})(\\.)?(\\d{0,2})$');
			if(!rex.test(str)){
				$(t).val('');
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
		//只能输入大于0的正整数
		checkPositiveInteger:function(t){
			var strNumber=t.value;
			var reg=/^\+?[1-9]\d*$/;
			if(!reg.test(strNumber)){
				$(t).val(1);
				$.zxsaas_plus.showalert('提示','只能输入大于0的正整数');
			}
		},
		//只能输入正数负数最多两位小数
		checkPositiveNativeNum:function(t){
			var str = t.value;
			var reg = /^[+-]?\d*\.?\d{0,2}$/;
			if(!reg.test(str)){
				$(t).val(0);
				$.zxsaas_plus.showalert('提示','只能输入至多两位小数');
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
			t.value = t.value.replace(/[^\d]/g,"");
			if(t.value.length > n){
				t.value = t.value.substring(0,n);
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
				$.zxsaas_plus.showalert('提示','非法的格式 <br />' + msg);
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
