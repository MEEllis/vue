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
        <p><img src="<%=basePath%>/img/xw6.jpg" alt=""/> 当前位置 > 首页 > 新闻 <img src="<%=basePath%>/img/xw5.jpg" alt=""/></p>
    </div>
    <div id="newsTopImgs" class="row">
        <div class="newsTopImg col-md-6">
            <img src="<%=basePath%>/img/xw7.jpg" alt=""/><a href="">公司新闻</a>
        </div>
        <div class="newsTopImg col-md-6">
            <img src="<%=basePath%>/img/xw7.jpg" alt=""/><a href="news_hy.jsp">行业资讯</a>
        </div>
    </div>
    <div class="xuhr row">
        <div class="newsDetailImg col-md-4">
            <img src="<%=basePath%>/img/xw3.jpg" alt=""/>
        </div>
        <div class="newsDetailTxt col-md-8">
            <a href="http://news.ifeng.com/a/20170223/50724817_0.shtml" target="_blank">
                <p>2017年中国通讯连锁行业转型发展 敢问路在何方？</p>
                <span>
                在过去的2016年，实体零售门店受经营成本不断加速上涨、随着更多业态不断创新发展，消费需求结构调整、网络零售快速发展、品牌厂商渠道布局等诸多因素影响，导致通讯零售业发展面临了前所未有的挑战。终端销量、利润同时明显下滑。部分较小规模连锁企业开始举步维艰甚至已经关门闭店。但是挑战与机遇并存，2016年国务院出台指导意见，“引导实体渠道发展自愿连锁，支持龙头企业建立集中采购分销平台，整合采购、配送和服务资源，带动中小企业降本增效;倡导大力振兴实体经济，
                鼓励线上线下优势企业通过战略合作、交叉持股、并购重组等多种形式整合市场资源。
                
                </span>
            </a>
        </div>
    </div>
    <div class="xuhr row">
        <div class="newsDetailImg col-md-4">
            <img src="<%=basePath%>/img/new1.jpg" alt=""/>
        </div>
        <div class="newsDetailTxt col-md-8">
            <a href="news_details.jsp" target="_blank">
                <p>锐意变革 创新不止：云盛联达ERP系统正式上线</p>
                <span>
                云盛联达作为北京联众信邦科技有限公司的ERP服务供应商，系统上线当日即在联邦湖南会员服务站开启首次培训活动并率先在湖南七星分公司进行上线内测，联邦会员单位祁阳乐米通讯、山西七星分公司、湖南七星分公司相关人员均参与培训。
                </span>
            </a>
        </div>
    </div>
</div>
<jsp:include  page="include/foot.jsp"/> 

