<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = path+"/YSHomePage";
%>
<jsp:include  page="include/head.jsp"/>
    <link rel="stylesheet" href="<%=basePath%>/css/Del-mobileTerminal.css"/>
    <title>终端</title>
</head>
<body>
<jsp:include  page="include/navbar.jsp"/> 
<div class="delBanner">
    <img src="<%=basePath%>/img/xw1.jpg" alt=""/>
</div>
<div id="ydzd">
    <h3>移动智能终端</h3>
    <h3>引领店面管理新趋势</h3>
    <hr/>
    <div class="lg-container">
        <div class="row">
            <div class="col-md-1"></div>
            <div id="ydzdl" class="col-md-4">
                <h5>功能</h5>
                <table class="table2">
                    <tbody>
                    <tr>
                        <td>盘点</td>
                        <td>盘点单</td>
                    </tr>
                    <tr>
                        <td>调拨</td>
                        <td>调拨发货、调拨接收</td>
                    </tr>
                    <tr>
                        <td>移库</td>
                        <td>移库单</td>
                    </tr>
                    <tr>
                        <td>零售</td>
                        <td>会员、零售单、零售换货、零售退货</td>
                    </tr>
                    <tr>
                        <td>报表</td>
                        <td>实时库存、串号跟踪、库存分布、销售统计 销售排行、营业清单、出入库统计</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="col-md-2">
                <ul id="ydzdUl">
                    <li>高安全</li>
                    <li>全能支付</li>
                    <li>身份证识别</li>
                    <li>耐用品质</li>
                    <li>超强功能</li>
                </ul>
            </div>
            <div id="ydzdr" class="col-md-4">
                <p>通过银联卡受理终端安全认证和银联卡受理终端产品入网认证，从用户信息安全 角度出发，全面保证硬件内部和通讯路中交易信息的安全。</p>
                <p>集磁条卡、IC卡、NFC、扫码等多种支付方式于一体，全面支持微信、支付宝、 百度钱包、Apple Pay、Samsung、Pa</p>
                <p>支持二代身份证读取，使其能广泛用于票务、交通、政府公共事业等各个行业。</p>
                <p>产品全部器件均选用工业级原料，满足工业等级1.2米抗跌落，保障设备稳定性， 为用户带来长期、可靠的品质保证。</p>
                <p>一体化集成条码扫描、热敏打印机，能独立完成整个支付流程，更有身份证识别、 摄像头等功能模块，搭配专门设计的扩展坞，可扩展多种应</p>
            </div>
            <div class="col-md-1"></div>
        </div>
        <div class="row">
            <div class="col-md-1"></div>
            <div class="ydzddown col-md-5">
                <img src="<%=basePath%>/img/ydzd1.jpg" alt=""/>
            </div>
            <div class="ydzddown col-md-5">
                <img src="<%=basePath%>/img/ydzd2.jpg" alt=""/>
            </div>
            <div class="col-md-1"></div>
        </div>
    </div>
</div>
<jsp:include  page="include/foot.jsp"/> 


