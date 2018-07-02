$(function(){
    //登录按钮点击事件
	$("#sbm-login").click(function(){
		login.empLoginAjax();
	});
	//密码框绑定回车事件
	$("#username").bind("keypress",function(event){
		if(event.keyCode == "13"){
			$("#password").focus();
		}
	});
	$("#password").bind("keypress",function(event){
		if(event.keyCode == "13"){
			$("#authCode").focus();
		}
	});
	$("#authCode").bind("keypress",function(event){
		if(event.keyCode == "13"){
			$("#authCode").blur();
			login.empLoginAjax();
		}
	});
});
var url = "";
var login = {
	empLoginAjax : function(){
		if($('#username').val().trim()==''||$('#password').val()==''){ //验证不通过
			$.zxsaas_plus.showalert("错误",'用户名或密码为空！');
			return false;
		}
		if($('#authCode').val().trim()==''){ //验证码不通过
			$.zxsaas_plus.showalert("错误",'验证码为空！');
			return false;
		}
		var the_url = "/manager/emp/empLoginAjax.do";
		var data = {
			login : $("#username").val().trim(),
			passwd : $("#password").val(),
			authCode : $("#authCode").val().trim(),
			cid: -1
		};
		$.ajax({
			type : "post",
			url : the_url,
			dataType : "json",
			data : data,
			success : function(data){
				if(data.result == 1){
					if(data.data.isOpr>0){
						if(data.data.warnMsg){
							$(".warnMsg").html(data.data.warnMsg);
						}
						$("#addCashModal").modal('show');
						$("#companyId").html("");
						if (data.data.companyList) {
							for (var i = 0; i < data.data.companyList.length; i++) {
								$("#companyId").append("<option value='" + data.data.companyList[i].id + "'>" + data.data.companyList[i].name + "</option>");
							}
						}
						$(document).keypress(function(e){
							if(e.keyCode==13)$('.companySave').click();
						})
					}
					else{
						if(data.data.warnMsg){
							$(".warnMsg").html(data.data.warnMsg);
							$("#warnModal").modal('show');
							$("#hideUrl").val(data.data.url);
							$(document).keypress(function(e){
								if(e.keyCode==13)$('.warnMsgClick').click();
							});
						} else {
							url = data.data.url;
							if (data.data.nopass == 1) {
								$.ajax({
									type: 'Post',
									url: '/manager/emp/ajaxLogout',
									success: function (data) {
										if(data.result==1) {
											$("#changePwdModal").modal('show');
											$(document).keypress(function(e){
												if(e.keyCode==13)$('.updatePwdClick').click();
											})
										}
									},
									error: function (msg) {}
								});
							} else {
								//解决框架框框架的问题
								if(window.top==window.self){
									window.self.location.href = url;
								}else{
									window.top.location.href = url;
								}
							}
						}
					}
					$("#eid").val(data.data.eid);
					/*window.location.href = data.data.url;*/
				}else{
					$.zxsaas_plus.showalert("错误",data.desc);
					$("#codeImg").click();
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {   
				alert("XMLHttpRequest.status="+XMLHttpRequest.status+"\nXMLHttpRequest.readyState="+XMLHttpRequest.readyState+"\ntextStatus="+textStatus);
	    	}
		});
	}
}
$(document).on("click", ".updatePwdClick", function () {
	var reg = new RegExp(/^(?=.*[^\d]).{6,}$/);
	if($("#newPsd").val().trim()==""){
		$.zxsaas_plus.showalert("提示","密码不能为空");
	} else{
		if(!reg.test($("#newPsd").val().trim())){
			$.zxsaas_plus.showalert("提示","请按照密码规则设置您的新密码");
		} else {
			if($("#newPsd").val().trim()==$("#surePsd").val().trim()){
				var the_url = "/manager/emp/ajaxLogin";
				$.ajax({
					type: "post",
					url: the_url,
					dataType: "json",
					data:{login: $("#username").val().trim(),passwd:$("#password").val(),companyId: $("#companyId").val()?$("#companyId").val():'-1'},
					success: function (data) {
						if (data.result == 1) {
							$.ajax({
								type: 'Post',
								url: '/manager/authority/employeeInfo/updatePwd',
								data:{rePwd:$("#newPsd").val().trim(),"isCheckPwd":"1"},
								success: function (data) {
									$('#changePwdModal').modal('hide');
									//解决框架框框架的问题
									if(window.top==window.self){
										window.self.location.href = url;
									}else{
										window.top.location.href = url;
									}

								},
								error: function (msg) {

								}
							});
						}
					}
				})
			}
			else{
				$.zxsaas_plus.showalert("错误","两次密码输入不一致");
			}
		}
	}
});

$(document).on("click",".warnMsgClick",function(){
	//解决框架框框架的问题
	if(window.top==window.self){
		window.self.location.href = $("#hideUrl").val();
	}else{
		window.top.location.href = $("#hideUrl").val();
	}
});
$(document).on("click",".companySave",function(e){
	var the_url = "/manager/emp/empLoginAjax.do";
	var data = {
		login : $("#username").val().trim(),
		passwd : $("#password").val(),
		authCode : $("#authCode").val().trim(),
		cid:$("#companyId").val()
	};
	$.ajax({
		type : "post",
		url : the_url,
		dataType : "json",
		data : data,
		success : function(data){
			if(data.result == 1){
				url = data.data.url;
				if (data.data.nopass == 1) {
					$.ajax({
						type: 'Post',
						url: '/manager/emp/ajaxLogout',
						success: function (data) {
							if(data.result==1) {
								$("#addCashModal").modal('hide');
								$("#changePwdModal").modal('show');
								$(document).keypress(function(e){
									if(e.keyCode==13)$('.updatePwdClick').click();
								})
							}
						},
						error: function (msg) {}
					});
				} else {
					//解决框架框框架的问题
					if(window.top==window.self){
						window.self.location.href = url;
					}else{
						window.top.location.href = url;
					}
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

// 刷新验证码
$(document).on("click","#codeImg",function(e){
	var url = $('#codeImg').prop("src") + "?tm=" + Math.random();
	$('#codeImg').prop("src", url);
});