<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = path+"/YSHomePage";
%>
<jsp:include  page="include/head.jsp"/>
    <link rel="stylesheet" href="<%=basePath%>/css/proandser.css"/>
    <title>行业动态</title>
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
    	
    	.news{
    		margin-top:50px;
    		padding-bottom:50px;border-bottom:1px solid #eeeeee
    	}
    	
    	.newsImage{
    		width:100%;height:210px;
    	}
    	.newsInfo{
    		position:relative;height:210px;
    	}
    	.newsInfo span{
    		font-size:20px;color:#333333
    	}
    	.newsInfo p{
    		text-align:left;font-size:16px;color:#666666;margin-top:30px;
    	}
    	.newsTime{
    		position:absolute;bottom:0;font-size:16px;color:#666666;
    	}
    	.paging{
    		text-align:center;
    	}
    	
    	@media screen and (max-width: 500px) {
	#psBanner{
		margin-top:52px
	}
	#wheader{
		margin-top:0 !important
	}
	}
    </style>
</head>
<body>
<jsp:include  page="include/navbar.jsp"/> 
<img id="psBanner" src="<%=basePath%>/newImage/newscenter.png" alt=""/>

<div class="lg-container" id="wheader" style="margin-top:-60px;">
	<div class="row">
		<div class=" col-md-6" style="padding:0">
			<a href="<%=basePath%>/companyNews.jsp">
				<div class="weclass" >公司新闻</div>
			</a>
		</div>		
		<div class=" col-md-6" style="padding:0">			
			<div class="weclass" style="background:#23C0F7">行业动态</div>			
		</div>
	</div>
</div>	
<div class="lg-container" style="margin:0 auto 70px;">
	<div class="row news" onclick="javascript:window.location.href='http://help.3g.163.com/0413/17/0224/10/CE1K1PJD04130DKD.html'">
		<div class=" col-md-5" >
			<img src="news/news4.jpg" alt="..." class="newsImage">
		</div>
		<div class=" col-md-7" >
			<div class="newsInfo">
				<span >2017年中国通讯连锁行业转型发展 敢问路在何方？</span>
				<p>
					实体零售业已经在不知不觉中慢慢复苏，我们有理由相信，2017年将是实体零售渠道的整合之年、转折之年!
					<span class="glyphicon glyphicon-chevron-right" style="font-size:12px;"></span>
				</p>
				<div class="newsTime">2017-2-24</div>			
			</div>			
		</div>
	</div>
	
	<div class="row news" onclick="javascript:window.location.href='http://soft.chinabyte.com/102/12328102.shtml'">
		<div class=" col-md-5" >
			<img src="news/news5.jpg" alt="..." class="newsImage">
		</div>
		<div class=" col-md-7" >
			<div class="newsInfo">
				<span >租赁型OA办公软件成企业新宠</span>
				<p>
					近年来，随着互联网技术的发展，应用管理软件不断成熟，在SaaS服务的催化剂下，SaaS租赁市场开始大行其道。
					<span class="glyphicon glyphicon-chevron-right" style="font-size:12px;"></span>
				</p>
				<div class="newsTime">2016-5-9</div>			
			</div>			
		</div>
	</div>	
	
	<div class="row news" onclick="javascript:window.location.href='http://a.mini.eastday.com/html/2017/caijing_0409/3696947.html'" >
		<div class=" col-md-5" >
			<img src="news/news6.jpg" alt="..." class="newsImage">
		</div>
		<div class=" col-md-7" >
			<div class="newsInfo">
				<span >通信行业全年趋势：仰望5G的星空 脚踏光纤的实地</span>
				<p>
									年报季不仅是上市公司IR最忙碌的时刻，也是诸多研究员“痛并快乐着的”日子，太多的公司年报同一时期披露，是超出预期还是低于预期？来年规划是啥，战略部署如何？诸如此类的问题，挑逗着每一个二级狗的神经。
									<span class="glyphicon glyphicon-chevron-right" style="font-size:12px;"></span>
				</p>
				<div class="newsTime">2017-4-9</div>			
			</div>			
		</div>
	</div>
		
	<div class="row">
		<div class=" col-md-12" >
			<div class="paging">
				<nav aria-label="Page navigation">
  <ul class="pagination">
    <li class="disabled ">
      <a style="margin-right:20px;" href="#" aria-label="Previous" >
        上一页
      </a>
    </li>
    <li><a style="margin-right:20px;background:#23C0F7;color:white;" href="#">1</a></li>    
    <li class="disabled ">
      <a style="margin-right:20px;" href="#" aria-label="Next" class="disabled ">
        下一页
      </a>
    </li>
  </ul>
</nav>
			
			</div>
		</div>
	</div>		
</div>	
<jsp:include  page="include/foot.jsp"/> 



