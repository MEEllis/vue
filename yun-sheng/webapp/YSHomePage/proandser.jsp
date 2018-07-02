<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = path+"/YSHomePage";
%>
<jsp:include  page="include/head.jsp"/>
    <link rel="stylesheet" href="<%=basePath%>/css/proandser.css"/>
    <title>产品及服务</title>
</head>
<body>
<jsp:include  page="include/navbar.jsp"/> 
<img id="psBanner" src="<%=basePath%>/img/banner1.jpg" alt=""/>
<div class="lg-container">
    <div class="psTxt">
        <p>云盛软件是全国首家拥有专业级财务软件的SAAS服务系统，适用于大中型手机及数码品连锁企业，业务涵盖供应链、门店零售、OA协同、CRM、人力资源、资产管理、资金管理、预算管理与财务核算等，并融合手机零售和批发行业中的常见业务,如:价保、售后服务、运营商业务、分期业务、串号管理等，同时还兼具集团、区域的管理，是一套专注于服务通讯行业的一站式综合信息管理系统。</p>
    </div>
    <img id="ps1" src="<%=basePath%>/img/ps1.png" alt=""/>
</div>
<div id="sf">
    <div class="lg-container">
        <div class="title">
            <b>| </b><p>服务特点 </p><span> service features</span>
        </div>
    </div>
    <hr style="width: 100%;background: #DBDBDB;height:2px;margin: 0;"/>
    <div class="lg-container">
        <div class="row">
            <div class="psLeft col-md-3 col-sm-12 col-xs-12">
                <img src="<%=basePath%>/img/ps2.jpg" alt=""/>
            </div>
            <div class="col-md-9 col-sm-12 col-xs-12">
                <img id="Rleft" class="hidden-xs hidden-sm" src="<%=basePath%>/img/ps3.png" alt=""/>
                <ul id="Rright">
                    <li><a href="Del-serviceFeatures.jsp">高效决策&nbsp;&nbsp;&nbsp;&nbsp;借助网络，让管理者及时获取关键业务数据，快速反应，精准决策</a></li>
                    <li><a href="Del-serviceFeatures.jsp">异地协同&nbsp;&nbsp;&nbsp;&nbsp;多人应用、多点协同，多语言支持，全面支持互联网时代的分子公司协同运作管理模式</a></li>
                    <li><a href="Del-serviceFeatures.jsp">降低成本&nbsp;&nbsp;&nbsp;&nbsp;免维护、免升级、简单配置，减少对专业人才的依赖，总投入成本低</a></li>
                    <li><a href="Del-serviceFeatures.jsp">随需服务&nbsp;&nbsp;&nbsp;&nbsp;无需购买软件，按需租用在线服务，免安装、免升级、免维护</a></li>
                    <li><a href="Del-serviceFeatures.jsp">安全保障&nbsp;&nbsp;&nbsp;&nbsp;由阿里云提供专业的客户数据存储及安全管理，为厂商提供及时高效的应用服务</a></li>
                    <li><a href="Del-serviceFeatures.jsp">简单易用&nbsp;&nbsp;&nbsp;&nbsp;借助语言、多媒体、社区、博客、搜索等网络互动手段，更贴近用户业务应用习惯</a></li>
                </ul>
            </div>
        </div>
    </div>
</div>
<div id="gyl">
    <div class="lg-container">
        <div class="row">
            <div class="col-md-7">
                <div class="psTxts">
                    <a href="<%=basePath%>/Del-supplyChain.jsp">
                        <p>业务功能</p>针对性业务功能设计，更符合行业特性
                        <span>除去常规供应链业务功能：采购、分销、零售、促销、仓储，我们针对手机连锁行业特性定制了如价保、售后服务、运营商业务、分期业务、串号管理等功能，并对提成做了详细化功能设计，对库存做了智能化报警和分析，全方位的功能设计，让供应链业务更简单！</span>
                    </a>
                </div>
            </div>
            <div class="col-md-5">
                <img class="psTxtsImg" src="<%=basePath%>/img/ps4.png" alt=""/>
            </div>
        </div>
    </div>
</div>
<div id="cw">
    <div class="lg-container">
        <div class="row">
            <div class="col-md-5">
                <img class="psTxtsImg" src="<%=basePath%>/img/ps5.png" alt=""/>
            </div>
            <div class="col-md-7">
                <div class="psTxts">
                    <a href="<%=basePath%>/Del-finance.jsp">
                        <p>财务一体化</p>专业级财务管理，一体化设计更省心
                        <span>云盛软件财务管理拥有着强大的专业级财务功能，直接与供应链关联，每一笔订单都将直接生成单据，从源头控制财务数据，直接减轻财务压力。更添加固定资产管理和费用预算管理，专业，更值得期待！</span>
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>
<div id="oa">
    <div class="lg-container">
        <div class="row">
            <div class="col-md-7">
                <div class="psTxts">
                    <a href="<%=basePath%>/Del-OA.jsp">
                        <p>OA协同 &人力资源</p>流程化管理，无纸办公省时省心
                        <span>云盛OA协同板块界面友好、操作方便、性能稳定，能适应企业不断变化，功能覆盖面广，如：会议室管理、公文管理，通知公告，办公用品，流程管理，目标绩效，人力资源管理等，直接加强制度执行力、团队目标达成率，以及减少流程等待时间等。全信息化处理，无纸办公更轻松！</span>
                    </a>
                </div>
            </div>
            <div class="col-md-5">
                <img class="psTxtsImg" src="<%=basePath%>/img/ps6.png" alt=""/>
            </div>
        </div>
    </div>
</div>
<div id="crm">
    <div class="lg-container">
        <div class="row">
            <div class="col-md-5">
                <img class="psTxtsImg" src="<%=basePath%>/img/ps7.png" alt=""/>
            </div>
            <div class="col-md-7">
                <div class="psTxts">
                    <a href="<%=basePath%>/Del-CRM.jsp">
                        <p>CRM</p>市场动态早知道，客户关系更和谐
                        <span>CRM客户关系管理，更全面的记录客户信息，提供多维度的客户信息视图，全面了解客户，有的放矢地跟进商机，开展销售与客户更好地进行互动与沟通。更快速地查到所需的客户信息，准确有效地进行数据分析，让企业更加全面地了解客户及市场动态，能更好地跟进和维护客户关系，让客户关系更和谐！</span>
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>
<div id="zd">
    <div class="lg-container">
        <div class="row">
            <div class="col-md-5">
                <img class="psTxtsImg" src="<%=basePath%>/img/ps9.png" alt=""/>
            </div>
            <div class="col-md-7">
                <div class="psTxtss">
                    <a href="<%=basePath%>/Del-mobileTerminal.jsp">
                        <p>移动智能终端，引领店面管理新趋势</p>
                        <table id="table1">
                            <tr>
                                <td>功能</td>
                                <td>支付&nbsp;&nbsp;&nbsp;分销&nbsp;&nbsp;&nbsp;调拨&nbsp;&nbsp;&nbsp;零售&nbsp;&nbsp;&nbsp;打印&nbsp;&nbsp;&nbsp;入库&nbsp;&nbsp;&nbsp;报表&nbsp;&nbsp;&nbsp;盘点&nbsp;&nbsp;&nbsp;考勤</td>
                            </tr>
                            <tr>
                                <td>&nbsp;</td>
                            </tr>
                            <tr>
                                <td>高安全</td>
                                <td>通过银联卡受理终端安全认证和银联卡受理终端产品入网认证，从用户信息安全 角度出发，全面保证硬件内部和通讯路中交易信息的安全。</td>
                            </tr>
                            <tr>
                                <td>全能支付</td>
                                <td>集磁条卡、IC卡、NFC、扫码等多种支付方式于一体，全面支持微信、支付宝、 百度钱包、Apple Pay、Samsung、Pa</td>
                            </tr>
                            <tr>
                                <td>身份证识别</td>
                                <td>支持二代身份证读取，使其能广泛用于票务、交通、政府公共事业等各个行业。</td>
                            </tr>
                            <tr>
                                <td>耐用品质</td>
                                <td>产品全部器件均选用工业级原料，满足工业等级1.2米抗跌落，保障设备稳定性， 为用户带来长期、可靠的品质保证。</td>
                            </tr>
                            <tr>
                                <td>超强功能</td>
                                <td>一体化集成条码扫描、热敏打印机，能独立完成整个支付流程，更有身份证识别、 摄像头等功能模块，搭配专门设计的扩展坞，可扩展多种应</td>
                            </tr>
                        </table>
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>
<jsp:include  page="include/foot.jsp"/> 



