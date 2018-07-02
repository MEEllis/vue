<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
	String path = request.getContextPath();
	String basePath = path + "/YSHomePage";
%>
<jsp:include page="include/head.jsp" />
<script src="<%=basePath%>/js/expandbuy.js"></script>
<title>申请</title>
<script>
	var _hmt = _hmt || [];
	(function() {
		var hm = document.createElement("script");
		hm.src = "https://hm.baidu.com/hm.js?91471a0372bbb1cae7dc43f903e2105e";
		var s = document.getElementsByTagName("script")[0];
		s.parentNode.insertBefore(hm, s);
	})();
</script>
<style>
.askfor {
	background: url(newImage/askfor.png) no-repeat;
	background-size: 100% 100%;
	margin-top: 50px;
	position: absolute;
	height: 720px;
	width: 100%;
	text-align: center;
}

.askforinput {
	background: url(newImage/ask1.png) no-repeat;
	background-size: 100% 100%;
	height: 560px;
	width: 586px;
	margin: 70px auto;
	padding: 70px 82px;
}
.form-group{
margin-top:30px;
}
.control-label{
	font-size:18px;color:#333333
}
</style>
</head>
<body>
	<jsp:include page="include/navbar.jsp" />
	<div class="askfor">
		<div class="askforinput">
			<form class="form-horizontal" id="form1">
				<div class="form-group">
					<label for="inputEmail3" class="col-sm-4 control-label">
						企业名称：
					</label>
					<div class="col-sm-8">
						<input type="text" class="form-control" id="business1" name="business" style="border-radius:5px;"
							placeholder="">
					</div>
				</div>
				
				<div class="form-group">
					<label for="inputEmail3" class="col-sm-4 control-label">
						店面数量：
					</label>
					<div class="col-sm-8">
						<input type="number" class="form-control" id="shopNum1" name="shopNum" style="border-radius:5px;"
							placeholder="">
					</div>
				</div>
				
				<div class="form-group">
					<label for="inputEmail3" class="col-sm-4 control-label">
						所在地区：
					</label>
					<div class="col-sm-8">
						<input type="text" class="form-control" id="regionName1" name="regionName" style="border-radius:5px;"
							placeholder="">
					</div>
				</div>
				
				<div class="form-group">
					<label for="inputEmail3" class="col-sm-4 control-label">
						联系人：
					</label>
					<div class="col-sm-8">
						<input type="text" class="form-control" id="contacts1" name="contacts" style="border-radius:5px;"
							placeholder="">
					</div>
				</div>
				<div class="form-group">
					<label for="inputEmail3" class="col-sm-4 control-label">
						联系电话：
					</label>
					<div class="col-sm-8">
						<input type="tel" class="form-control" id="telnum1" name="telnum" style="border-radius:5px;"
							placeholder="">
					</div>
				</div>
				<div class="form-group">
					<div class="col-md-12 " style="text-align: center;">
		<a  class="btn btn-info nbtn col-md-12" style="border-radius:5px;" onclick="save(0)">
			立即申请
		</a>
	</div>
				</div>
			</form>
		</div>
	</div>