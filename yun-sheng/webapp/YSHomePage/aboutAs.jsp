<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
//String basePath = path+"/YSHomePage";
String basePath = path+"/YSHomePage";
%>
<jsp:include  page="include/head.jsp"/>
    <link rel="stylesheet" href="<%=basePath%>/css/aboutAs.css"/>
    <title>关于我们</title>
</head>
<body>
<jsp:include  page="include/navbar.jsp"/> 
<img id="asBanner" src="<%=basePath%>/img/banner2.jpg" alt=""/>
<div class="lg-container">
    <div id="asTopTxt">
	        高效&nbsp;&nbsp;协作&nbsp;&nbsp;严谨&nbsp;&nbsp;创新<br/>
	        打造全国最高效通讯行业企业管理平台
    </div>
</div>
<div class="content">
    <div id="fisrtbg" class="activebg fisrtbg lazy" data-stellar-background-ratio="0.03" data-original="<%=basePath%>/img/bg1.jpg"></div>
    <div class="figure call">
        <div class="w1170">
            <div class="row">
                <div class="asLeft col-md-4 ">
                    <img src="<%=basePath%>/img/as11.png" alt=""/><br/>
                    <b>公司简介</b>
                </div>
                <div class="asRight col-md-8">
                    <p>武汉云盛联达信息技术有限公司（ www.phoneerp.com），是一家专业从事通讯行业管理系统软件设计、研发、应用及销售于一体的高新技术企业，公司自成立以来一直专注于管理软件产品研发和技术创新，是全国首家拥有专业级财务软件的SAAS服务提供商。</p>
                    <p>云盛联达在为大中型手机及数码品连锁企业提供软件服务的同时，致力于通过综合信息一体化的建设，提高通讯行业各方面管理的效率，制定最优质的信息聚合标准。</p>
                    <p>云盛联达拥有行业内最强大的研发团队和客户服务团队，目前业务遍布全国，为业内的连锁企业及行业从业者提供专业、高效、安全、便捷的SAAS服务。</p>
                </div>
            </div>
        </div>
    </div>
    <div id="secondbg" class="activebg secondbg lazy" data-stellar-background-ratio="0.05" data-original="<%=basePath%>/img/bg2.jpg"></div>
    <div class="figure file">
        <div class="w1170">
            <div class="row">
                <div class="asLeft col-md-4">
                    <img src="<%=basePath%>/img/as12.png" alt=""/><br/>
                    <b>企业文化</b>
                    <table id="aaa" class="table">
                        <tbody>
                        <tr>
                            <td style="word-spacing:29px;">愿 景：</td>
                            <td>打造全国最高效通讯行业企业管理平台</td>
                        </tr>
                        <tr>
                            <td>经营理念：</td>
                            <td>以客户体验为最高标准</td>
                        </tr>
                        <tr>
                            <td>价&nbsp;&nbsp;值&nbsp;&nbsp;观：</td>
                            <td>高效、协作、严谨、创新</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div class="asmid col-md-4">
                    <p>创新&nbsp;&nbsp;——拥抱变化，不断创新</p>
                    <span>企业不断有新的变化，我们要以正确的态度对待变化。 从不停止对产品与技术创新的渴望。 </span>
                    <p>严谨&nbsp;&nbsp;——让专业如血液流淌</p>
                    <span>不断提升个人专业能力，以严谨的态度对待每一个字符。我们每个行为都是客户对我们的百般信任，每一分辜负，都在慢性自杀的路上前进一步</span>
                </div>
                <div class="asmid col-md-4">
                    <p>协作&nbsp;&nbsp;——共享共担，小人物大舞台</p>
                    <span>积极融入团队，乐于接受同事的帮助，配合团队完成工作。 决策前积极发表建设性意见，充分参与团队讨论;决策后，无论个人是否有异议，必须从言行上完全予以。</span>
                    <p>高效&nbsp;&nbsp;——让高效工作成为一种习惯</p>
                    <span>以培养习惯的方式设计软件，让客户体验成为一种培养高效工作习惯的方式 高效率处理客户需求，客户的满意是对我们最大的肯定 </span>
                </div>
            </div>
        </div>
    </div>
    <div id="thirdbg" class="activebg thirdbg lazy" data-stellar-background-ratio="0.05" data-original="<%=basePath%>/img/bg3.jpg"></div>
    <div class="figure mall">
        <div class="w1170">
            <div class="row">
                <div class="asLeft col-md-4">
                    <img src="<%=basePath%>/img/as13.png" alt=""/><br/>
                    <b>人才中心</b>
                <span>
                    用人原则：重选拔、重潜质、重品德 <br/>
                    简历投递：hr@phoneerp.com
                </span>
                </div>
                <div class="asmid col-md-4">
                    <b>JAVA开发工程师</b>
                <span>
                    1、本科以上学历，计算机相关专业 <br/>
                    2、精通java，有3年以上JAVA应用开发经验； <br/>
                    3、熟悉Html、Javascript、 <br/>
                </span>
                </div>
                <div class="asmid col-md-4">
                    <b>实施工程师</b>
                <span>
                    1、大专以上学历，有无经验均可，有软件背景优先 <br/>
                    2、忠于职守，诚实守信，适应出差 <br/>
                    3、有销售意识，有团队协作能力 <br/>
                    4、性格要求
                </span>
                </div>
            </div>
        </div>
    </div>
    <div id="fourthbg" class="activebg fourthbg lazy" data-stellar-background-ratio="0.05" data-original="<%=basePath%>/img/bg4.jpg"></div>
    <div class="figure file">
        <div class="w1170">
            <div class="row">
                <div class="asLeft col-md-4">
                    <img src="<%=basePath%>/img/as14.png" alt=""/><br/>
                    <b>联系方式</b>
                <span>
                    <s></s> 商务电话：027-89902227 <br/>
                    <s></s> 客服电话：4008263315 <br/>
                    <s></s> 公司地址：湖北省武汉市东湖高新区武大科技园武大园一路9-2
                </span>
                </div>
                <div class="asRight col-md-8  ">
                    <img src="<%=basePath%>/img/as15643.png" alt=""/>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="<%=basePath%>/js/stellar.js"></script>
<script src="<%=basePath%>/js/plus2015.js"></script>
<script src="<%=basePath%>/js/jquery.lazyload.js"></script>
<jsp:include  page="include/foot.jsp"/> 




