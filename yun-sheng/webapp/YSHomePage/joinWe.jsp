<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = path+"/YSHomePage";
%>
<jsp:include  page="include/head.jsp"/>
    <link rel="stylesheet" href="<%=basePath%>/css/proandser.css"/>
    <title>加入我们</title>
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
    	.joinbg1{
    		background:url(newImage/jx1.png)no-repeat;
    		background-size:100% 100%;height:130px;
    		line-height:130px;
    	}
    	.joinbg2{
    		background:url(newImage/jx2.png)no-repeat;
    		background-size:100% 100%;height:130px;
    		line-height:130px;
    	}
    	.joinclass{
    		font-size:18px;color:#333333;background:#EFF4F7;height:70px;line-height:70px;
    		text-align:center;
    	}
    	.joinclassp{
    		font-size:16px;color:#666666;background:#EFF4F7;margin-top:10px;padding:20px;
    	}
    	.lay{
    		padding-left:10px;padding-right:10px;display:none;
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
<img id="psBanner" src="<%=basePath%>/newImage/joinbg.png" alt=""/>

<div class="lg-container" id="wheader" style="margin-top:-60px;">
	<div class="row">
		<div class=" col-md-4" style="padding:0">
			<a href="<%=basePath%>/we.jsp">
				<div class="weclass" style="border-right:1px solid #555758">关于我们</div>
			</a>
		</div>
		<div class=" col-md-4" style="padding:0">
			<a href="<%=basePath%>/newsCenter.jsp">
				<div class="weclass">新闻中心</div>
			</a>
		</div>
		<div class=" col-md-4" style="padding:0">
			<a href="<%=basePath%>/joinWe.jsp">
			<div class="weclass" style="background:#23C0F7">加入我们</div>
			</a>
		</div>
	</div>
</div>	
<div class="lg-container" style="margin-top:60px;margin-bottom:70px;max-width:1058px;">
	<p style="font-size:18px;color:#333333;text-align:left;">
	我们相信人才的力量，一如我们相信有一个全方位的ERP系统。在云盛联达，才华的顶端绝不是领导的审美，创意的实现不会被阉割和分裂，技术的薪水对得起每行的代码。每一个小伙伴的操作都在改变着通讯行业的未来。风景在对面，船，就在岸边。
	</p>
	<p style="font-size:18px;color:#333333;margin-top:30px;text-align:left;">公司福利：完善的福利，每日水果零食、弹性式工作</p>
	<div class="row" style="margin:60px 0 50px;">
		<div class=" col-md-6" >
		<div class="joinbg1">
			<img src="newImage/jx11.png" alt="..." style="margin-left:40px;">
			<span style="font-size:16px;color:#ffffff;margin-left:20px;">湖北省武汉市东湖高新区武大科技园武大园一路9-2</span>
		</div>
		</div>
		<div class=" col-md-6" >
			<div  class="joinbg2">
				<img src="newImage/jx22.png" alt="..." style="margin-left:40px;">
				<span style="font-size:16px;color:#ffffff;margin-left:20px;">简历发至：hr@phoneerp.com</span>
			</div>
		</div>
	</div>
	<div class="row" style="padding-left:10px;padding-right:10px;" onclick="showLayer(1)">
		<div class=" col-md-3" style="padding:0 5px 0 5px">
			<div class="joinclass" >高级java</div>
		</div>
		<div class=" col-md-3" style="padding:0 5px 0 5px">
			<div class="joinclass">技术类</div>
		</div>	
		<div class=" col-md-3" style="padding:0 5px 0 5px">
			<div class="joinclass">薪资8K-15K</div>
		</div>	
		<div class=" col-md-3" style="padding:0 5px 0 5px">
			<div class="joinclass">2017/4/25</div>
		</div>		
	</div>
	<div class="row lay" id="layer1">
		<div class=" col-md-12" style="padding:0 5px 0 5px">
			<div class="joinclassp">				
				岗位职责：<br/>
				1、参与产品调研，系统设计，编写软件设计说明书等文档；<br/>
				2、根据开发规范可独立完成编码和测试；<br/>
				职位要求：<br/>
				1、精通java，有3年以上JAVA应用开发经验；有财务软件开发经验者优先考虑；<br/>
				2、熟悉Oracle或SQL SERVER等关系数据库；<br/>
				3、具有良好的编程习惯和文档撰写能力，较强的学习能力和独立解决问题的能力<br/>													
			</div>
		</div>		
	</div>		
	
	
	
	<div class="row" style="padding-left:10px;padding-right:10px;margin-top:10px;" onclick="showLayer(2)">
		<div class=" col-md-3" style="padding:0 5px 0 5px">
			<div class="joinclass" >前端开发</div>
		</div>
		<div class=" col-md-3" style="padding:0 5px 0 5px">
			<div class="joinclass">技术类</div>
		</div>	
		<div class=" col-md-3" style="padding:0 5px 0 5px">
			<div class="joinclass">薪资6K-10K</div>
		</div>	
		<div class=" col-md-3" style="padding:0 5px 0 5px">
			<div class="joinclass">2017/4/25</div>
		</div>		
	</div>
	<div class="row lay" id="layer2">
		<div class=" col-md-12" style="padding:0 5px 0 5px">
			<div class="joinclassp">
				岗位职责：<br/>
				1、负责前端架构，主导前端框架开发，制定前端开发规范；<br/>
				2、负责前端性能优化；<br/>
				3、指导前端研发人员实际的开发工作；<br/>
				4、负责梳理和优化前端开发流程，搭建高效集成的前端开发环境；<br/>
				岗位要求：<br/>
				1、3年以上互联网前端开发经验<br/>
				2、精通CSS、HTML5、JQ、兼容处理<br/>
				3、有web全栈开发经验或开发意向优先<br/>
			</div>
		</div>		
	</div>
	
	
	
	<div class="row" style="padding-left:10px;padding-right:10px;margin-top:10px;" onclick="showLayer(3)">
		<div class=" col-md-3" style="padding:0 5px 0 5px">
			<div class="joinclass" >数据库开发</div>
		</div>
		<div class=" col-md-3" style="padding:0 5px 0 5px">
			<div class="joinclass">技术类</div>
		</div>	
		<div class=" col-md-3" style="padding:0 5px 0 5px">
			<div class="joinclass">薪资10K-20K</div>
		</div>	
		<div class=" col-md-3" style="padding:0 5px 0 5px">
			<div class="joinclass">2017/4/25</div>
		</div>		
	</div>
	<div class="row lay" id="layer3">
		<div class=" col-md-12" style="padding:0 5px 0 5px">
			<div class="joinclassp">
				岗位职责：<br/>
				1、根据产品设计和项目开发方案，参与数据库建模，数据结构设计，保证数据库开发的规范性；<br/>
				2、与开发工程师配合，进行后台数据库存储过程、SQL、脚本的开发；<br/>
				3、对相关的SQL进行review和性能调优；<br/>
				4、熟悉shell,主机存储,数据库调优最佳。<br/>
				岗位要求：<br/>
				1、2年以上相关工作经验；<br/>
				2、精通Oracle数据库，能熟练使用PLSQL进行存储过程开发<br/>
			</div>
		</div>		
	</div>
	
	
	<div class="row" style="padding-left:10px;padding-right:10px;margin-top:10px;" onclick="showLayer(4)">
		<div class=" col-md-3" style="padding:0 5px 0 5px">
			<div class="joinclass" >项目助理</div>
		</div>
		<div class=" col-md-3" style="padding:0 5px 0 5px">
			<div class="joinclass">产品类</div>
		</div>	
		<div class=" col-md-3" style="padding:0 5px 0 5px">
			<div class="joinclass">薪资8K-15K</div>
		</div>	
		<div class=" col-md-3" style="padding:0 5px 0 5px">
			<div class="joinclass">2017/4/25</div>
		</div>		
	</div>
	<div class="row lay" id="layer4">
		<div class=" col-md-12" style="padding:0 5px 0 5px">
			<div class="joinclassp">
				岗位职责：<br/>
				1、以产品规划为基础，协助项目经理或产品经理制定项目计划，协调任务和配置资源；<br/>
				2、负责项目进度推进，跟踪功能的开发情况，与开发人员及测试人员就项目需求及问题保持良好沟通；<br/>
				3、项目计划编写，需求文档整理，数据模型设计，任务分解；<br/>
				4、具备一定的互联网项目经验，可以协助产品经理，并会使用xmind,axure,project等<br/>
				任职要求：<br/>
				1、1-3年全职互联网项目管理经验；具备较强协调和组织能力<br/>
				2、良好的沟通能力和学习能力，能够从用户和产品功能的角度来进行成本及周期分析；<br/>
			</div>
		</div>		
	</div>
	
</div>


<jsp:include  page="include/foot.jsp"/> 
	<script>
		function showLayer(num){
			
			$(".lay").hide();
				if(num==1){
					$("#layer1").show();
				}
				if(num==2){
					$("#layer2").show();
				}
				if(num==3){
					$("#layer3").show();
				}
				if(num==4){
					$("#layer4").show();
				}
			}	
	
	</script>



