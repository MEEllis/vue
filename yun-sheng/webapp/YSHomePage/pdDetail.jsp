<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = path+"/YSHomePage";
%>
<jsp:include  page="include/head.jsp"/>
    <%--<link rel="stylesheet" href="<%=basePath%>/css/proandser.css"/>
    --%><title>盘点详情</title>
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
		.pclass{
			height:256px;border-radius:5px;border:1px solid #eeeeee;margin-top:60px;
			background:#EFF4F7;
		}
		.cltit{
		font-size:22px;color:#333333;margin:30px 0 26px;
		}
		.clcon{
			font-size:16px;color:#666666;
		}
		
		.nbtn {
			height: 50px;
			background: #23C0F7;
			font-size: 22px;
			color: #ffffff;
			width: 250px;
			border-radius: 5px;
		}
			@media screen and (max-width: 500px) {
	#psBanner{
		margin-top:52px
	}
    </style>
</head>
<body>
<jsp:include  page="include/navbar.jsp"/> 
<img id="psBanner" src="<%=basePath%>/img/pdDetailBg.png" alt="" style="width:100%;"/>
<div id="pdContainer">
	<div class="pdDetailBox">
		<img alt="" src="<%=basePath%>/img/pdDetail1.png">
	</div>
	<div class="pdDetailBox">
		<img alt="" src="<%=basePath%>/img/pdDetail2.png">
	</div>
	<div class="pdDetailBox">
		<img alt="" src="<%=basePath%>/img/pdDetail3.png">
	</div>
	<div class="pdDetailBox">
		<img alt="" src="<%=basePath%>/img/pdDetail4.png">
	</div>
</div>

<jsp:include  page="include/foot.jsp"/> 



