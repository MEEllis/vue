<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = path+"/YSHomePage";
%>
<jsp:include  page="include/head.jsp"/>
    <link rel="stylesheet" href="<%=basePath%>/css/proandser.css"/>
    <title>服务</title>
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
		.scont{
		background:white;height:96px;padding:15px;text-align:left;font-size:16px;color:#666666
		}
		.ssp{
		font-size:28px;color:#333333;text-align:center;margin-bottom:30px;
		}
			@media screen and (max-width: 500px) {
	#psBanner{
		margin-top:52px
	}
    </style>
</head>
<body>
<jsp:include  page="include/navbar.jsp"/> 
<img id="psBanner" src="<%=basePath%>/newImage/service1.png" alt=""/>
<div class="lg-container" style="padding-top:50px;padding-bottom:50px;max-width:980px;">
		<div class="row">
			<div class=" col-md-6 " >
				<img src="newImage/bgservice.png" alt="..." >	
			</div>
			<div class=" col-md-6" >
				<div style="font-size:28px;margin:0 0 40px;color:#333333">安全保障</div>
				<div style="font-size:16px;color:#666666">
				由阿里云提供专业的客户数据存储及安全管理，为厂商提供及时高效的应用服务。
				</div>
				<div style="margin-top:30px;font-size:16px;color:#666666">				
				阿里云服务器稳定、弹性、安全、成本、易用性、可拓展性，云盘数据可靠性不低于 99.999% ，随时升级，0成本运维
				</div>				
			</div>	
		</div>
</div>


<div class="newLayer" >
	<div class="lg-container" style="padding-top:50px;max-width:980px;">
	<div class="row" >
			<div class=" col-md-6" >
				<div class="ssp">异地协同</div>
				<img src="newImage/ser1.png" alt="..."  style="width:100%;">
				<div class="scont">
				多人应用、多点协同，多语言支持，全面支持互联网时代的分子公司协同运作管理模式
				</div>
			</div>
			<div class=" col-md-6" style="text-align:right;">
			<div class="ssp">简单易用</div>
				<img src="newImage/ser2.png" alt="..." style="width:100%;">
				<div class="scont">
				借助语音、多媒体、社区、博客、搜索等网络互动手段，更贴近用户业务应用习惯
				</div>
			</div>	
		</div>	
	</div>
</div>	


<div class="lg-container" style="padding-top:50px;padding-bottom:50px;max-width:980px;">
		<div class="row">
			
			<div class=" col-md-6" >
				<div style="font-size:28px;margin:0 0 10px;color:#333333">高效决策</div>
				<div style="margin:0 0 10px;font-size:16px;color:#666666">
				借助网络，让管理者及时获取关键业务数据，快速反应，精准决策。
				</div>
				<div style="margin:0 0 10px;font-size:16px;color:#666666">				
				软件使用oracle数据库企业版，可移植性好、使用方便、功能强，适用于各类大、中、小、微机环境，高效率、可靠性好的、适应高吞吐量的数据库解决方案
				</div>				
			</div>
			<div class=" col-md-6 " style="text-align:right;">
				<img src="newImage/bz1.png" alt="..." >	
			</div>	
		</div>
</div>
<jsp:include  page="include/foot.jsp"/> 



