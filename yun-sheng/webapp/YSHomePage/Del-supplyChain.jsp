<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = path+"/YSHomePage";
%>
<jsp:include  page="include/head.jsp"/>
    <link rel="stylesheet" href="<%=basePath%>/css/Del-supplyChain.css"/>
    <title>供应链</title>
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
                <p>业务功能</p>
                <p>针对性业务功能设计，更符合行业特性</p>
                <span>除去常规供应链业务功能：采购、分销、零售、促销、仓储，我们针对手机连锁行业特性定制了如价保、售后服务、运营商业务、分期业务、串号管理等功能，并对提成做了详细化功能设计，对库存做了智能化报警和分析，全方位的功能设计，让供应链业务更简单！</span>
            </div>
            <div id="crmtr" class="col-md-5">
                <img src="<%=basePath%>/img/sc1.jpg" alt=""/>
            </div>
        </div>
        <hr style="background: #C4C4C4;height: 2px;"/>
        <div class="row">
            <div class="col-md-6">
                <div class="row">
                    <div class="crmdownimg col-md-6">
                        <img src="<%=basePath%>/img/sc2.jpg" alt=""/>
                    </div>
                    <div class="crmdownimg col-md-6">
                        <p>采购管理</p>
                        <span>主要功能：采购订单、采购入库单、采购退货单、采购换货单、受托入库单、受托退货单、采购计划申请、补退货需求分析、采购计划申请流程管理</span>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="row">
                    <div class="crmdownimg col-md-6">
                        <img src="<%=basePath%>/img/sc3.jpg" alt=""/>
                    </div>
                    <div class="crmdownimg col-md-6">
                        <p>销售管理</p>
                        <span>主要功能：销售订单、销售单、销售退货单、销售换货单、委托出库单、委托退货单</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6">
                <div class="row">
                    <div class="crmdownimg col-md-6">
                        <img src="<%=basePath%>/img/sc4.jpg" alt=""/>
                    </div>
                    <div class="crmdownimg col-md-6">
                        <p>零售管理</p>
                        <span>主要功能：零售开单、零售退货、零售换货、零售定金单、零售退定单、对账交款单新增、对账交款单查询、收款确认、长短款记录、零售退货单、零售换货单、门店退补货申请、门店库存销量上报</span>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="row">
                    <div class="crmdownimg col-md-6">
                        <img src="<%=basePath%>/img/sc5.jpg" alt=""/>
                    </div>
                    <div class="crmdownimg col-md-6">
                        <p>会员管理</p>
                        <span>主要功能：会员卡信息、会员类型管理、多倍积分、积分调整、充值赠送、会员特殊日期提醒、会员短信群发、会员促销</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<jsp:include  page="include/foot.jsp"/> 


