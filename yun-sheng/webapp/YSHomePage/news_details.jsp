<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = path+"/YSHomePage";
%>
<jsp:include  page="include/head.jsp"/>
    <link rel="stylesheet" href="<%=basePath%>/css/news_details.css"/>
    <title>新闻详情</title>
</head>
<body>
<jsp:include  page="include/navbar.jsp"/> 
<div id="xwx" class="lg-container">
    <h4>锐意变革 创新不止：云盛联达ERP系统正式上线</h4>
    <div><span>信息来源：云盛软件</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>时间：2017-03-02</span></div>
    <img src="<%=basePath%>/img/news-online-20170302-0.jpg" alt=""/>
    <span class="xwxTxt">2017年3月1日，由武汉云盛联达信息技术有限公司（简称“云盛联达”）研发的ERP系统“云盛软件”正式上线。据悉，“云盛软件”是专注于服务通讯行业的一站式综合信息管理系统。</span>
    <span class="xwxTxt">云盛联达作为北京联众信邦科技有限公司的ERP服务供应商，系统上线当日即在联邦湖南会员服务站开启首次培训活动并率先在湖南七星分公司进行上线内测，联邦会员单位祁阳乐米通讯、山西七星分公司、湖南七星分公司相关人员均参与培训。</span>
    <img src="<%=basePath%>/img/news-online-20170302-1.jpg" alt=""/>
    <img src="<%=basePath%>/img/news-online-20170302-2.jpg" alt=""/>
    <span class="xwxTxt">据了解，此次培训内容涉及系统的业务功能、财务功能、OA&人力资源、CRM，其重点培训业务功能及财务功能。</span>
    <span class="xwxTxt">ERP功能展示</span>
    <img src="<%=basePath%>/img/news-online-20170302-3.jpg" alt=""/>
    <img src="<%=basePath%>/img/news-online-20170302-4.jpg" alt=""/>
    <img src="<%=basePath%>/img/news-online-20170302-5.jpg" alt=""/>
    <img src="<%=basePath%>/img/news-online-20170302-6.jpg" alt=""/>
    <img src="<%=basePath%>/img/news-online-20170302-7.jpg" alt=""/>
    <span class="xwxTxt">云盛联达总经理程学波表示：ERP系统上线不是通讯行业信息管理变革的终点，而是一个创新的新起点，要适应高速信息化发展的通讯行业，还需不断更新优化系统各方面的功能，真正做到综合信息一体化的建设，提高通讯行业各方面管理的效率，制定最优质的信息聚合标准。</span>
    <div class="row" style="margin-top: 80px">
        <div class="col-md-2 col-sm-2 col-xs-6">
            <button class="xwxBtn" type="button">上一篇</button>
        </div>
        <div class="col-md-8 col-sm-8 col-xs-0"></div>
        <div class="col-md-2 col-sm-2 col-xs-6">
            <button class="xwxBtn" type="button">下一篇</button>
        </div>
    </div>
</div>
<jsp:include  page="include/foot.jsp"/> 



