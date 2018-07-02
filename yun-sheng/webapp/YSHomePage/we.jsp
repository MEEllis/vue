<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = path+"/YSHomePage";
%>
<jsp:include  page="include/head.jsp"/>
    <link rel="stylesheet" href="<%=basePath%>/css/proandser.css"/>
    <title>关于我们</title>
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
    	.weclass{
    		height:60px;line-height:60px;background:white;text-align:center;color:white;
    		background:#5D6065
    	}
    		@media screen and (max-width: 500px) {
	#psBanner{
		margin-top:52px
	}
	#wheader{
		margin-top:0 !important
	}
    </style>
</head>
<body>
<jsp:include  page="include/navbar.jsp"/> 
<img id="psBanner" src="<%=basePath%>/newImage/we.png" alt=""/>

<div class="lg-container" id="wheader" style="margin-top:-60px;">
	<div class="row">
		<div class=" col-md-4" style="padding:0">
			<div class="weclass" style="background:#23C0F7">关于我们</div>
		</div>
		<div class=" col-md-4" style="padding:0">
			<a href="<%=basePath%>/newsCenter.jsp">
				<div class="weclass" style="border-right:1px solid #555758">新闻中心</div>
			</a>
		</div>
		<div class=" col-md-4" style="padding:0">
			<a href="<%=basePath%>/joinWe.jsp">
			<div class="weclass" >加入我们</div>
			</a>
		</div>
	</div>
</div>	
<div class="lg-container" style="margin-top:50px;margin-bottom:50px;">
		<div class="row">
			<div class=" col-md-6 " >
				<img src="newImage/slzny.png" alt="..." style="width:100%;">	
			</div>
			<div class=" col-md-6" >
				<div style="font-size:28px;margin:0 0 10px;color:#333333">我是云盛联达</div>
				<div style="margin:0 0 10px;">
				武汉云盛联达信息技术有限公司（www.phoneerp.com），是一家专业从事通讯行业管理系统软件设计、研发、应用及销售于一体的高新技术企业，公司自成立以来一直专注于管理软件产品研发和技术创新，是全国首家拥有专业级财务软件的SAAS服务提供商。
				</div>
				<div style="margin:0 0 10px;">				
云盛联达在为大中型手机及数码品连锁企业提供软件服务的同时，致力于通过综合信息一体化的建设，提高通讯行业各方面管理的效率，制定最优质的信息聚合标准。

				</div>
					<div style="margin:0 0 10px;">			
云盛联达拥有行业内最强大的研发团队和客户服务团队，目前业务遍布全国，为业内的连锁企业及行业从业者提供专业、高效、安全、便捷的SAAS服务。
				</div>
			</div>	
		</div>
</div>


<div class="newLayer">
	<div class="lg-container">
		<div class="text-center layer" style="padding-top: 50px;">
			<span style="font-size:28px;color:#333333">
				企业文化
			</span>	
		</div>
		<div class="row" style="max-width:1200px;margin:40px auto 40px;">
			<div class=" col-md-4 " >
				<div><img src="news/me1.jpg" alt="..." style="width:100%;height:260px;"></div>
				<div style="font-size:16px;color:#666666;text-align:center;margin-top:20px;">愿景：打造出通讯行业内最高效的企业管理平台</div>
			</div>
			<div class=" col-md-4 " >
				<div><img src="news/me2.jpg" alt="..." style="width:100%;height:260px;"></div>
				<div style="font-size:16px;color:#666666;text-align:center;margin-top:20px;">经营理念：以客户体验为最高标准</div>
			</div>
			<div class=" col-md-4 " >
				<div><img src="news/me3.jpg" alt="..." style="width:100%;height:260px;"></div>
				<div style="font-size:16px;color:#666666;text-align:center;margin-top:20px;">价值观：高效、协作、严谨、创新</div>
			</div>
		</div>
		
		<div class="row" style="max-width:1200px;margin:0 auto ;">
			<div class=" col-md-6 " >
				<div style="background:white;padding:30px 20px;height:210px;">
					<span style="font-size:16px;color:#59829a">高效  ——让高效工作成为一种习惯</span>
					<p style="margin-top:20px;font-size:16px;color:#849ba8;text-align:left;">以培养习惯的方式设计软件，让客户体验成为一种培养高效工作习惯的方式 高效率处理客户需求，客户的满意是对我们最大的肯定
					</p>
				</div>
			</div>
			<div class=" col-md-6 " >
			<div style="background:white;padding:30px 20px;height:210px;">
				<span style="font-size:16px;color:#59829a">严谨  ——让专业如血液流淌</span>
				<p style="margin-top:20px;font-size:16px;color:#849ba8;text-align:left;">不断提升个人专业能力，以严谨的态度对待每一个字符。我们每个行为都是客户对我们的百般信任，每一分辜负，都在慢性自杀的路上前进一步
						</p>
			</div>
			</div>
		</div>		
		
		<div class="row" style="max-width:1200px;margin:30px auto ;">
			<div class=" col-md-6 " >
				<div style="background:white;padding:30px 20px;height:210px;">
					<span style="font-size:16px;color:#59829a">协作  ——共享共担，小人物大舞台</span>
					<p style="margin-top:20px;font-size:16px;color:#849ba8;text-align:left;">积极融入团队，乐于接受同事的帮助，配合团队完成工作。 决策前积极发表建设性意见，充分参与团队讨论;决策后，无论个人是否有异议，必须从言行上完全予以。
					</p>
				</div>
			</div>
			<div class=" col-md-6 " >
			<div style="background:white;padding:30px 20px;height:210px;">
				<span style="font-size:16px;color:#59829a">创新  ——拥抱变化，不断创新</span>
				<p style="margin-top:20px;font-size:16px;color:#849ba8;text-align:left;">企业不断有新的变化，我们要以正确的态度对待变化。 从不停止对产品与技术创新的渴望。
									</p>
			</div>
			</div>
		</div>					
	</div>
</div>


<jsp:include  page="include/foot.jsp"/> 



