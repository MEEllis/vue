<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = path+"/YSHomePage";
%>
<jsp:include  page="include/head.jsp"/>
    <link rel="stylesheet" href="<%=basePath%>/css/Del-serviceFeatures.css"/>
    <title>服务特点</title>
</head>
<body>
<jsp:include  page="include/navbar.jsp"/> 
<div class="delBanner">
    <img src="<%=basePath%>/img/xw1.jpg" alt=""/>
</div>
<div id="delsf" class="lg-container">
    <h3>服务特点</h3>
    <hr/>
    <p>Service features</p>
    <div class="row">
        <div class="col-md-3"></div>
        <div class="col-md-6">
            <!--<img id="Rleft" class="hidden-xs hidden-sm" src="img/ps3.png" alt=""/>-->
            <ul id="Rright">
                <li><a href="">&nbsp;高效决策&nbsp;&nbsp;&nbsp;&nbsp;借助网络，让管理者及时获取关键业务数据，快速反应，精准决策</a></li>
                <li><a href="">&nbsp;异地协同&nbsp;&nbsp;&nbsp;&nbsp;多人应用、多点协同，多语言支持，全面支持互联网时代的分子公司协同运作管理模式</a></li>
                <li><a href="">&nbsp;降低成本&nbsp;&nbsp;&nbsp;&nbsp;免维护、免升级、简单配置，减少对专业人才的依赖，总投入成本低</a></li>
                <li><a href="">&nbsp;随需服务&nbsp;&nbsp;&nbsp;&nbsp;无需购买软件，按需租用在线服务，免安装、免升级、免维护</a></li>
                <li><a href="">&nbsp;安全保障&nbsp;&nbsp;&nbsp;&nbsp;由阿里云提供专业的客户数据存储及安全管理，为厂商提供及时高效的应用服务</a></li>
                <li><a href="">&nbsp;简单易用&nbsp;&nbsp;&nbsp;&nbsp;借助语言、多媒体、社区、博客、搜索等网络互动手段，更贴近用户业务应用习惯</a></li>
            </ul>
        </div>
        <div class="col-md-3"></div>
    </div>
    <div class="row">
        <div class="col-md-2"></div>
        <div class="col-md-8">
            <img id="delsfImg" src="<%=basePath%>/img/delsf1.jpg" alt=""/>
        </div>
        <div class="col-md-2"></div>
    </div>
</div>
<jsp:include  page="include/foot.jsp"/> 


