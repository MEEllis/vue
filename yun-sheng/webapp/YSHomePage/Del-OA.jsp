<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = path+"/YSHomePage";
%>
<jsp:include  page="include/head.jsp"/>
    <link rel="stylesheet" href="<%=basePath%>/css/Del-OA.css"/>
    <title>OA</title>
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
                <p>OA协同 &人力资源</p>
                <p>流程化管理，无纸办公省时省心</p>
                <span>云盛OA协同板块界面友好、操作方便、性能稳定，能适应企业不断变化，功能覆盖面广，如：会议室管理、公文管理，通知公告，办公用品，面了解客户，有的放矢地跟进商机，开展销售与客户更好地进行CRM客户关系管理，更全面的记录客户信息，提供多维度的客户信息视图，全面了解客户，有的放矢地跟进商机，开展销售与客户更好地进行</span>
            </div>
            <div id="crmtr" class="col-md-5">
                <img src="<%=basePath%>/img/oa1.jpg" alt=""/>
            </div>
        </div>
        <hr style="background: #C4C4C4;height: 2px;"/>
        <div class="row">
            <div class="col-md-6">
                <div class="row">
                    <div class="crmdownimg col-md-6">
                        <img src="<%=basePath%>/img/oa2.jpg" alt=""/>
                    </div>
                    <div class="crmdownimg col-md-6">
                        <p>人事档案</p>
                        <span>主要功能：在职管理、离职管理、异动管理、档案维护、档案统计、档案设置、定岗定编</span>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="row">
                    <div class="crmdownimg col-md-6">
                        <img src="<%=basePath%>/img/oa3.jpg" alt=""/>
                    </div>
                    <div class="crmdownimg col-md-6">
                        <p>绩效管理</p>
                        <span>主要功能：员工表现录入、员工表现管理、考核查询、考核管理、考核汇总、考核设置</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6">
                <div class="row">
                    <div class="crmdownimg col-md-6">
                        <img src="<%=basePath%>/img/oa4.jpg" alt=""/>
                    </div>
                    <div class="crmdownimg col-md-6">
                        <p>行政管理</p>
                        <span>主要功能：会议管理、车辆管理、资产管理、图书管理、制度管理、工作督导、责任状、印章管理</span>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="row">
                    <div class="crmdownimg col-md-6">
                        <img src="<%=basePath%>/img/oa5.jpg" alt=""/>
                    </div>
                    <div class="crmdownimg col-md-6">
                        <p>流程管理</p>
                        <span>主要功能：发起流程、流程查询、流程监控、流程管理、流程分析、表单应用、内部协同</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<jsp:include  page="include/foot.jsp"/> 




