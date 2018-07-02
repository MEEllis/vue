$(function(){
//	$("#input-area").find("input[name=login]").flagTip();
//    $("#input-area").find("input[name=passwd]").flagTip();
	if(myBrowser()=='IE55'||myBrowser()=='IE6'||myBrowser()=='IE7'||myBrowser()=='IE8'){
		alert('浏览器版本过低，请升级或更换浏览器！');
		$('#form1 input').prop('disabled',true);
		$("#sbm-login").prop('disabled',true);
	}else{
		$('#form1 input').prop('disabled',false);
		$("#sbm-login").prop('disabled',false);
	}
	function myBrowser(){
	    var userAgent = navigator.userAgent;
	    var isOpera = userAgent.indexOf("Opera") > -1;
	    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera;
	    var isFF = userAgent.indexOf("Firefox") > -1;
	    var isSafari = userAgent.indexOf("Safari") > -1;
	    if (isIE) {
	        var IE5 = IE55 = IE6 = IE7 = IE8 = false;
	        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
	        reIE.test(userAgent);
	        var fIEVersion = parseFloat(RegExp["$1"]);
	        IE55 = fIEVersion == 5.5;
	        IE6 = fIEVersion == 6.0;
	        IE7 = fIEVersion == 7.0;
	        IE8 = fIEVersion == 8.0;
	        if (IE55) {
	            return "IE55";
	        }
	        if (IE6) {
	            return "IE6";
	        }
	        if (IE7) {
	            return "IE7";
	        }
	        if (IE8) {
	            return "IE8";
	        }
	    }//isIE end
	    if (isFF) {
	        return "FF";
	    }
	    if (isOpera) {
	        return "Opera";
	    }
	}
    //登录按钮点击事件
	$("#sbm-login").click(function(){
		login.ajax.empLoginAjax();
	});
	
	//密码框绑定回车事件
	$("#input-area").find("input[name=passwd]").on("keypress",function(event){
		if(event.keyCode == "13"){
			login.ajax.empLoginAjax();
		}
	});
	
	$("#input-area").find("input[name=login]").on("keypress",function(event){
		if(event.keyCode == "13"){
		 $("#password").focus();
		}
	});
	
});

var login = {
	ajax:{
		/**
		 * 登录按钮Ajax后台交互
		 */
			empLoginAjax : function(){
			if(!login.check.checkSubmit()){ //验证不通过
				return false;
			}
			var the_url = "/manager/emp/empLoginAjax.do";
			var data = {
					login : $("#username").val(),
					passwd : $("#password").val(),
					cid: -1
			};
			$.ajax({
				type : "post",
				url : the_url,
				dataType : "json",
				data : data,
				success : function(data){
				   console.log(data);
					if(data.result == 1){
                        
                        if (data.data.isOpr > 0) {
                            $("#addCashModal").modal('show');
                            $("#companyId").html("");
                            if (data.data.companyList) {
                                for (var i = 0; i < data.data.companyList.length; i++) {
                                    $("#companyId").append("<option value='" + data.data.companyList[i].id + "'>" + data.data.companyList[i].name + "</option>");
                                }
                            }
                        } else {
                            //解决框架框框架的问题
                            if (window.top == window.self) {
                                window.self.location.href = data.data.url;
                            } else {
                                window.top.location.href = data.data.url;
                            }
                        }
						 $("#eid").val(data.data.eid);
						/*window.location.href = data.data.url;*/
					}else{
						 $.zxsaas_plus.showalert("错误",data.desc);
					}
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {   
					alert("XMLHttpRequest.status="+XMLHttpRequest.status+"\nXMLHttpRequest.readyState="+XMLHttpRequest.readyState+"\ntextStatus="+textStatus);
		    	}
			});
		}
	},
	
	check:{
		/**
		 * 登录表单提交验证
		 * @return{boolean} true 验证通过; false 验证不通过
		 */
		checkSubmit : function(){
			var b = this.checklogin();
			b = b && this.checkpasswd();
			return b;
		},
		/**
		 * 用户名验证
		 * @return{boolean} true 验证通过; false 验证不通过
		 */
		checklogin : function(){
			var $this = $("#username");
			if($($this).val() == "" || $($this).val() == null){
				$this.validTip({title:"工号不能为空！"});
				return false;
			}
			return true;
		},
		/**
		 * 密码验证
		 * @return{boolean} true 验证通过; false 验证不通过
		 */
		checkpasswd : function(){
			var $this = $("#password");
			if($($this).val() == "" || $($this).val() == null){
				$this.validTip({title:"密码不能为空！"});
				return false;
			}
			return true;
		}
	}
		
}


$(document).on("click",".companySave",function(e){
	var the_url = "/manager/emp/empLoginAjax.do";
	var data = {
			login : $("#username").val(),
			passwd : $("#password").val(),
			cid:$("#companyId").val()
	};
	 $.ajax({
			type : "post",
			url : the_url,
			dataType : "json",
			data : data,
			success : function(data){
			   console.log(data);
				if(data.result == 1){
					//解决框架框框架的问题
					if(window.top==window.self){
						window.self.location.href = data.data.url;
					}else{
						window.top.location.href = data.data.url;;
					}
				}else{
					 $.zxsaas_plus.showalert("错误",data.desc);
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {   
				alert("XMLHttpRequest.status="+XMLHttpRequest.status+"\nXMLHttpRequest.readyState="+XMLHttpRequest.readyState+"\ntextStatus="+textStatus);
	    	}
		});
	
});