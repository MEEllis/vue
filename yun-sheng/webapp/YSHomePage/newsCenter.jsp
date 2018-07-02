<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = path+"/YSHomePage";
%>
<jsp:include  page="include/head.jsp"/>
    <link rel="stylesheet" href="<%=basePath%>/css/proandser.css"/>
    <title>新闻中心</title>
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
	.newsInfo{
		height:280px;
	}
    </style>
</head>
<body>
<jsp:include  page="include/navbar.jsp"/> 
<img id="psBanner" src="<%=basePath%>/newImage/newscenter.png" alt=""/>

<div class="lg-container" id="wheader" style="margin-top:-60px;">
	<div class="row">
		<div class=" col-md-4" style="padding:0">
			<a href="<%=basePath%>/we.jsp">
				<div class="weclass" >关于我们</div>
			</a>
		</div>
		<div class=" col-md-4" style="padding:0">			
			<div class="weclass" style="background:#23C0F7">新闻中心</div>			
		</div>
		<div class=" col-md-4" style="padding:0">
			<a href="<%=basePath%>/joinWe.jsp">
				<div class="weclass" >加入我们</div>
			</a>
		</div>
	</div>
</div>	
<div class="lg-container" style="margin:0 auto 70px;" id="news1">
	<div class="row news" onclick="javascript:window.location.href='news/news1.jsp'">
		<div class=" col-md-5" >
			<img src="news/news2.jpg" alt="..." class="newsImage">
		</div>
		<div class=" col-md-7" >
			<div class="newsInfo">
				<span >锐意变革 创新不止：云盛联达ERP系统正式上线</span>
				<p>
					云盛联达作为北京联众信邦科技有限公司的ERP服务供应商，系统上线当日即在联邦湖南会员服务站开启首次培训活动并率先在湖南七星分公司进行上线内测，联邦会员单位祁阳乐米通讯、山西七星分公司、湖南七星分公司相关人员均参与培训。
					<span class="glyphicon glyphicon-chevron-right" style="font-size:12px;"></span>
				</p>
				<div class="newsTime">2017-2-24</div>			
			</div>			
		</div>
	</div>
	
	<div class="row news" onclick="javascript:window.location.href='http://www.cankaoxiaoxi.com/science/20170313/1763167.shtml'">
		<div class=" col-md-5" >
			<img src="newImage/center2.png" alt="..." class="newsImage">
		</div>
		<div class=" col-md-7" >
			<div class="newsInfo">
				<span >中国通讯连锁发展战略大会在京召开</span>
				<p>
					3月10日，由北京联邦集团主办，七星手机连锁协办的《中国通讯连锁发展战略大会》在京召开。据悉，本次大会邀请了手机连锁企业400余家、通讯产业链的优质厂商70余家、以及部分教育、金融、信息化技术等领域业内精英到场，可谓是一场通讯连锁企业颇具规模的产业链交流盛宴。
					<span class="glyphicon glyphicon-chevron-right" style="font-size:12px;"></span>
				</p>
				<div class="newsTime">2017-3-13</div>			
			</div>			
		</div>
	</div>	
	
	<div class="row news" onclick="javascript:window.location.href='news/news3.jsp'">
		<div class=" col-md-5" >
			<img src="newImage/center3.png" alt="..." class="newsImage">
		</div>
		<div class=" col-md-7" >
			<div class="newsInfo">
				<span >中国通讯连锁发展战略大会：联邦集团与云盛联大达成战略合作</span>
				<p>
					2017年3月10日，北京联众信邦科技有限公司（简称“联邦集团”）与武汉云盛联达信息技术有限公司（简称“云盛联达”）在北京九华山庄顺利完成战略合作签约仪式，至此，联邦集团与云盛联达的合作关系正式达成。
					<span class="glyphicon glyphicon-chevron-right" style="font-size:12px;"></span>
				</p>
				<div class="newsTime">2017-3-14</div>			
			</div>			
		</div>
	</div>
		
	<div class="row news" onclick="javascript:window.location.href='http://help.3g.163.com/0413/17/0224/10/CE1K1PJD04130DKD.html'">
		<div class=" col-md-5" >
			<img src="news/news4.jpg" alt="..." class="newsImage">
		</div>
		<div class=" col-md-7" >
			<div class="newsInfo">
				<span >2017年中国通讯连锁行业转型发展 敢问路在何方？</span>
				<p>
					实体零售业已经在不知不觉中慢慢复苏，我们有理由相信，2017年将是实体零售渠道的整合之年、转折之年！
					<span class="glyphicon glyphicon-chevron-right" style="font-size:12px;"></span>
				</p>
				<div class="newsTime">2017-2-24</div>			
			</div>			
		</div>
	</div>
			
</div>	



<div class="lg-container" style="margin:0 auto 70px;display:none" id="news2">
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
	
	<div class="row news" onclick="javascript:window.location.href='http://a.mini.eastday.com/html/2017/caijing_0409/3696947.html'">
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
	
</div>

<div class="lg-container" style="margin:0 auto 70px;" >
<div class="row">
		<div class=" col-md-12" >
			<div class="paging">
				<nav aria-label="Page navigation">
					  <ul class="pagination">
					    <li>
					      <a style="margin-right:20px;" onclick="changeNews(1)" aria-label="Previous" >
					        上一页
					      </a>
					    </li>
					    <li><a style="margin-right:20px;background:#23C0F7;color:white;" id="pag1" onclick="changeNews(1)">1</a></li>
					    <li><a style="margin-right:20px;" id="pag2"  onclick="changeNews(2)">2</a></li>    
					    <li>
					      <a style="margin-right:20px;" onclick="changeNews(2)" aria-label="Next" >
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
<script>
	function changeNews(num){		
			if(num==1){
				$("#news1").show();
				$("#news2").hide();
				$("#pag1").css("background","#23C0F7")
				$("#pag1").css("color","white");
				$("#pag2").css("background","white")
				$("#pag2").css("color","#337ab7");
				}else{
					$("#news1").hide();
					$("#news2").show();

					$("#pag2").css("background","#23C0F7")
					$("#pag2").css("color","white");
					$("#pag1").css("background","white")
					$("#pag1").css("color","#337ab7");
					}
		}
</script>



