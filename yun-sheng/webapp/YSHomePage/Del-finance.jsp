<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = path+"/YSHomePage";
%>
<jsp:include  page="include/head.jsp"/>
    <link rel="stylesheet" href="<%=basePath%>/css/Del-finance.css"/>
    <title>财务</title>
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
                <p>财务一体化</p>
                <p>专业级财务管理，一体化设计更省心</p>
                <span>云盛软件财务管理拥有着强大的专业级财务功能，直接与供应链关联，每一笔订单都将直接生成单据，从源头控制财务数据，直接减轻财务压力客户，有的放矢地跟进商机，开展销售与客户更好地进行</span>
            </div>
            <div id="crmtr" class="col-md-5">
                <img src="<%=basePath%>/img/cw1.jpg" alt=""/>
            </div>
        </div>
        <hr style="background: #C4C4C4;height: 2px;"/>
        <div class="row">
            <div class="col-md-6">
                <div class="row">
                    <div class="crmdownimg col-md-6">
                        <img src="<%=basePath%>/img/cw2.jpg" alt=""/>
                    </div>
                    <div class="crmdownimg col-md-6">
                        <p>总账</p>
                        <span>主要功能：凭证填制、凭证管理、凭证生成、收入、费用分摊、期间损益结转、记账、预记账、期末转账、月末结账</span>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="row">
                    <div class="crmdownimg col-md-6">
                        <img src="<%=basePath%>/img/cw3.jpg" alt=""/>
                    </div>
                    <div class="crmdownimg col-md-6">
                        <p>固定资产管理</p>
                        <span>主要功能：新增资产、卡片管理、卡片打印、资产变动单、资产处置、折旧与摊销、资产盘点</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6">
                <div class="row">
                    <div class="crmdownimg col-md-6">
                        <img src="<%=basePath%>/img/cw4.jpg" alt=""/>
                    </div>
                    <div class="crmdownimg col-md-6">
                        <p>费用预算</p>
                        <span>主要功能：费用预算录入、费用预算执行、费用预算查询、费用预算导入和调整、费用预算分析</span>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <!--<div class="row">-->
                    <!--<div class="crmdownimg col-md-6">-->
                        <!--<img src="img/sc5.jpg" alt=""/>-->
                    <!--</div>-->
                    <!--<div class="crmdownimg col-md-6">-->
                        <!--<p>促销管理</p>-->
                        <!--<span>除去常规供应链业务功能：采购、分销、零售、促销、仓储，我们针对手机连锁行业特性定制了如价保、售后服务、运营商业务、分期业务、串</span>-->
                    <!--</div>-->
                <!--</div>-->
            </div>
        </div>
    </div>
</div>
<jsp:include  page="include/foot.jsp"/> 





