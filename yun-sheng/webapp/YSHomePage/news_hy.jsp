<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = path+"/YSHomePage";
%>
<jsp:include  page="include/head.jsp"/>
    <link rel="stylesheet" href="<%=basePath%>/css/news.css"/>
    <title>新闻</title>
</head>
<body>
<jsp:include  page="include/navbar.jsp"/> 
<div id="newsBanner">
    <img src="<%=basePath%>/img/xw1.jpg" alt=""/>
</div>
<div class="lg-container">
    <div id="newsNowPos">
        <p><img src="img/xw6.jpg" alt=""/> 当前位置 > 首页 > 新闻 <img src="<%=basePath%>/img/xw5.jpg" alt=""/></p>
    </div>
    <div id="newsTopImgs" class="row">
        <div class="newsTopImg col-md-6">
            <img src="<%=basePath%>/img/xw7.jpg" alt=""/><a href="news.jsp">公司新闻</a>
        </div>
        <div class="newsTopImg col-md-6">
            <img src="<%=basePath%>/img/xw7.jpg" alt=""/><a href="">行业资讯</a>
        </div>
    </div>
    <div class="xuhr row">
        <div class="newsDetailImg col-md-4">
            <img src="<%=basePath%>/img/new3.jpg" alt=""/>
        </div>
        <div class="newsDetailTxt col-md-8">
            <a href="http://news.cnfol.com/it/20170216/24300907.shtml" target="_blank">
                <p>传统ERP沦为明日黄花 2017七大ERP发展新趋势</p>
                <span>
                随着 2016 年的结束，我们发现传统ERP系统仿佛成为明日黄花，整个ERP市场正在经历一场新的变革，几乎每天都会发生巨大的变动，
                要想掌握所有的趋势似乎不太可能，因此，本文将列举2017年及以后需要重点关注的七大ERP发展趋势。
                
                </span>
            </a>
        </div>
    </div>
    <div class="xuhr row">
        <div class="newsDetailImg col-md-4">
            <img src="<%=basePath%>/img/new4.jpg" alt=""/>
        </div>
        <div class="newsDetailTxt col-md-8">
            <a href="http://www.ccidcom.com/company/20120428/wRDCNj4E5EWZXHJK.html" target="_blank">
                <p>租赁型OA办公软件成企业新宠</p>
                <span>
                近年来，随着互联网技术的发展，应用管理软件不断成熟，在SaaS服务的催化剂下，SaaS租赁市场开始大行其道。对于企业来说，SaaS租赁的最大优势是“按需所用”，这种全新的商业模式更符合企业运营中对信息化平台的应用需求，一方面实现企业资源的统一管理和监控，消除信息孤岛，加强企业内部管理效率;另一方面，
                SaaS租赁方式缓解了企业的资金压力，低成本的投入让企业轻松跨入信息化门槛，同时降低了实施风险。
                </span>
            </a>
        </div>
    </div>
</div>
<jsp:include  page="include/foot.jsp"/> 

