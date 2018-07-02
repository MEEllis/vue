<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = path+"/YSHomePage";
%>
<jsp:include  page="include/head.jsp"/>    
    <title>产品</title>
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
    	.layerImg{
    		text-align:center;
    	}
    	.layerImg img{width:180px;height:180px}
    	.imgsP{
    	font-size:16px;color:#333333;margin:20px 0 50px;text-align:center;
    	}    	
    	.gn{
    	height:340px;background:white;overflow:hidden;padding:20px 30px;text-align:left;
    	}
    
    	.fot{
    		margin-top:30px;
    	}
    	.fot li{
    		list-style-type:disc;font-size:16px;color:#666666;line-height:46px;padding-left:10px
    	}
    		@media screen and (max-width: 500px) {
	#psBanner{
		margin-top:52px
	}
    </style>
</head>
<body>
<jsp:include  page="include/navbar.jsp"/> 
<img id="psBanner" src="<%=basePath%>/newImage/banner580.png" alt="" style="width:100%;"/>
<div class="lg-container" style="max-width:1058px;">
<div class="text-center layer">
			<h2>
				产品功能
			</h2>
			<h3>
				Sulution
			</h3>
		</div>
    <div class="row" style="padding-top:50px;">
    	<div class="col-md-3" >
    		<div class="layerImg">
    			<img src="newImage/YWGN.png" alt="..." class="img-rounded">
    		</div>    		
   			<div class="imgsP">业务功能</div>    		
    	</div>
    	<div class="col-md-3" s>
    		<div class="layerImg">
    			<img src="newImage/CWGN.png" alt="..." class="img-rounded">
    		</div>    		
   			<div class="imgsP">财务功能</div>    		
    	</div>
    	<div class="col-md-3" >
    		<div class="layerImg">
    			<img src="newImage/CRM.png" alt="..." class="img-rounded">
    		</div>    		
   			<div class="imgsP">CRM</div>    		
    	</div>
    	<div class="col-md-3">
    		<div class="layerImg">
    			<img src="newImage/OA.png" alt="..." class="img-rounded">
    		</div>    		
   			<div class="imgsP">OA&人力资源</div>    		
    	</div>
    </div>
</div>


<div class="newLayer">
	<div class="lg-container" style="padding-top:50px;max-width:1058px;">
		<div class="row">
			<div class=" col-md-6" style="padding:0">
				<img src="newImage/gn1.png" alt="..."  style="width:100%;">
			</div>
			<div class=" col-md-6 gn" >
				<h3>业务功能</h3>
				<p style="padding:30px;text-align:left;">
				除去常规供应链业务功能，我们针对手机连锁行业特性定制了如价保、售后服务、运营商业务、分期业务、串号管理等功能，并对提成做了详细化功能设计，对库存做了智能化报警和分析，全方位的功能设计，让供应链业务更简单！
				</p>
			</div>	
		</div>	
		<div class="row">
			<div class=" col-md-6 gn">
			<h3>财务功能</h3>
				<p style="padding:30px;text-align:left;">
				强大的专业级财务功能，直接与供应链关联，每一笔业务单据均可直接生成会计凭证，从源头控制财务数据，直接减轻财务压力。另添固定资产管理和费用预算管理，专业，更值得期待！
				</p>				
			</div>
			<div class=" col-md-6 "  style="padding:0">
				<img src="newImage/gn2.png" alt="..."  style="width:100%;">
			</div>	
		</div>
		
		
			<div class="row">
			<div class="col-md-6" style="padding:0">
				<img src="newImage/gn3.png" alt="..."  style="width:100%;">
			</div>
			<div class=" col-md-6 gn" >
				<h3>CRM</h3>
				<p style="padding:30px;text-align:left;">
				更全面的记录客户信息，提供多维度的客户信息视图，全面了解客户，有的放矢地跟进商机，开展销售与客户更好地进行互动与沟通。让企业更加全面地了解客户及市场动态，让客户关系更和谐！
				</p>
			</div>	
		</div>	
		<div class="row">
			<div class="col-md-6 gn" >
			<h3>OA&人力资源</h3>
				<p style="padding:30px;text-align:left;">
				界面友好、操作方便、性能稳定，能适应企业不断变化，功能覆盖面广。全信息化处理，无纸办公更轻松！
				</p>				
			</div>
			<div class=" col-md-6"  style="padding:0">
				<img src="newImage/gn4.png" alt="..." style="width:100%;">
			</div>	
		</div>		
	</div>
</div>

<div class="lg-container">
	<div class="text-center layer">
			<h2>
				云盛仓库助手
			</h2>
			<h3>
				i6200A企业级安全智能终端
			</h3>
	</div>
	<div class="row" style="margin-top:50px;padding-bottom:50px">
		<div class="col-sm-4" style="text-align:right;">
			<div class="row">
	    		<div class="col-sm-8">
	    			<h3 class="textR">智能体验</h3>
	    			<h4 class="textR" style="margin-top:20px;line-height: 30px;">语音实时提醒,导航般的盘点体验,工作更轻松</h4>
	    		</div>
	    		<div class="col-sm-4 pdIcon">
		    		<img src="img/pd1.png" alt="..." class="img-rounded" style="margin-right:20px;width:100%;">
	    		</div>	
    		</div>
    		<div class="row" style="margin-top:50px;">
	    		<div class="col-sm-8">
	    			<h3 class="textR">简单易用</h3>
	    			<h4 class="textR" style="margin-top:20px;line-height: 30px;">流程清晰,操作简便,盘点报告随手查询</h4>
	    		</div>
	    		<div class="col-sm-4 pdIcon">
		    		<img src="img/pd2.png" alt="..." class="img-rounded" style="margin-right:20px;width:90%;">
	    		</div>	
    		</div>
		</div>
	
    	<div class="col-sm-4" style="text-align:center;">
    		<div style="width:50%;margin:0 auto 30px;">
    			<img src="newImage/pdj.png" alt="..." class="img-rounded" style="margin-right:20px;width:90%;">
    		</div>
    		<div style="margin-right:20px;">
	    		<span>Safedroid  OS／整机充电底座／
	    		</span><br/>
	    		<span>背部腕带／1.5米抗跌落／极速四核／
	    		</span><br/>
	    		<span>条码扫描</span>
    		</div>	
    		<a class="toDetail btn btn-info" href="/YSHomePage/pdDetail.jsp">了解详情</a>
		</div>
		<div class="col-sm-4" style="text-align:right;">
			<div class="row">
	    		<div class="col-sm-4 pdIcon">
		    		<img src="img/pd3.png" alt="..." class="img-rounded" style="margin-right:20px;width:90%;">
	    		</div>	
	    		<div class="col-sm-8">
	    			<h3 class="textL">数据共享</h3>
	    			<h4 class="textL" style="margin-top:20px;line-height: 30px;">数据阿里云云端共享,安全无忧</h4>
	    		</div>
    		</div>
    		<div class="row" style="margin-top:50px;">
	    		<div class="col-sm-4 pdIcon">
		    		<img src="img/pd4.png" alt="..." class="img-rounded" style="margin-right:20px;width:90%;">
	    		</div>	
	    		<div class="col-sm-8">
	    			<h3 class="textL">量身定制</h3>
	    			<h4 class="textL" style="margin-top:20px;line-height: 30px;">贴合手机零售行业,支持串号管理、双串号管理、条码管理</h4>
	    		</div>
    		</div>
		</div>	
	</div>
</div>

<jsp:include  page="include/foot.jsp"/> 



