<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = path+"/YSHomePage";
%>
<jsp:include  page="include/head.jsp"/>
    <link rel="stylesheet" href="<%=basePath%>/css/Del-CRM.css"/>
    <title>CRM</title>
</head>
<body>
<jsp:include  page="include/navbar.jsp"/> 
<div class="delBanner">
    <img src="<%=basePath%>/img/xw1.jpg" alt=""/>
</div>
<div id="crm">
    <div class="lg-container">
        <div class="row">
            <div id="crmtl" class="col-md-7">
                <p>CRM</p>
                <p>市场动态早知道，客户关系更和谐</p>
                <span>CRM客户关系管理，更全面的记录客户信息，提供多维度的客户信息视图，全面了解客户，有的放矢地跟进商机，开展销售与客户更好地进行CRM客户关系管理，更全面的记录客户信息，提供多维度的客户信息视图，全面了解客户，有的放矢地跟进商机，开展销售与客户更好地进行CRM客户关系管理，更全面的记录客户信息，提供多维度的客户信息视图，全面了解客户，有的放矢地跟进商机，开展销售与客户更好地进行</span>
            </div>
            <div id="crmtr" class="col-md-5">
                <img src="<%=basePath%>/img/crm1.jpg" alt=""/>
            </div>
        </div>
        <hr style="background: #C4C4C4;height: 2px;"/>
        <div class="row">
            <div class="col-md-6">
                <div class="row">
                    <div class="crmdownimg col-md-6">
                        <img src="<%=basePath%>/img/crm11.jpg" alt=""/>
                    </div>
                    <div class="crmdownimg col-md-6">
                        <p>客户管理</p>
                        <span>主要功能有：客户查询、联系人查询、公共客户池、无效客户池</span>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="row">
                    <div class="crmdownimg col-md-6">
                        <img src="<%=basePath%>/img/crm12.jpg" alt=""/>
                    </div>
                    <div class="crmdownimg col-md-6">
                        <p>客户服务</p>
                        <span>主要功能有：成交客户审核、成交客户、客服查询、客服管理、回访查询、回访管理</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6">
                <div class="row">
                    <div class="crmdownimg col-md-6">
                        <img src="<%=basePath%>/img/crm13.jpg" alt=""/>
                    </div>
                    <div class="crmdownimg col-md-6">
                        <p>渠道管理</p>
                        <span>主要功能有：在谈代理、终端客户、签约代理、过期代理</span>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="row">
                    <div class="crmdownimg col-md-6">
                        <img src="<%=basePath%>/img/crm14.jpg" alt=""/>
                    </div>
                    <div class="crmdownimg col-md-6">
                        <p>销售管理</p>
                        <span>主要功能：销售机会、销售报价、销售单、执行单、销售合同、工作分析、销售计划</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<jsp:include  page="include/foot.jsp"/> 



