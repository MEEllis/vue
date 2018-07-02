<%@ page language="java" import="java.util.*" pageEncoding="utf-8" %>
<%
    String path = request.getContextPath();
    String basePath = path + "/YSHomePage";
%>
<jsp:include page="include/head.jsp"/>
<%--<link rel="stylesheet" href="<%=basePath%>/css/proandser.css"/>
--%><title>价格</title>
<script>
	var _hmt = _hmt || [];
	(function () {
		var hm = document.createElement("script");
		hm.src = "https://hm.baidu.com/hm.js?91471a0372bbb1cae7dc43f903e2105e";
		var s = document.getElementsByTagName("script")[0];
		s.parentNode.insertBefore(hm, s);
	})();
</script>
<style>
    .pclass {
        height: 256px;
        border-radius: 5px;
        border: 1px solid #eeeeee;
        margin-top: 60px;
        background: #EFF4F7;
    }
    .cbox{
        text-align:center;
    }
    .cbox:hover{
        box-shadow: 0px 11px 10px -6px #b5b5b5;
    }
    .ctxt{
        height: 80px;
        line-height: 95px;
        background: #4E81F3;
        color: #fff;
        font-size: 22px;
    }
    .cltit {
        font-size: 14px;
        color: #333333;
        margin: 30px 0 26px;
    }
    .cltit span{
        font-size: 22px;
    }
    .clcon {
        font-size: 16px;
        color: #666666;
    }
    .nbtn {
        height: 50px;
        background: #23C0F7;
        font-size: 22px;
        color: #ffffff;
        width: 250px;
        border-radius: 5px;
    }
    .ybox{
        height: 60px;
        line-height: 60px;
        color: #fff;
        background: #fe9f45;
        text-align: initial;
        padding-left: 20px;
        font-size: 20px;
        letter-spacing: 5px;
    }
    .fd1{
        font-size: 24px;
        color: #1a1a1a;
        letter-spacing: 3px;
        height: 40px;
    }
    .fd2{
        font-size: 20px;
        color: #333;
        letter-spacing: 2px;
    }
    @media screen and (max-width: 500px) {
        #psBanner {
            margin-top: 52px
        }
    }
</style>
</head>
<body>
<jsp:include page="include/navbar.jsp"/>
<img id="psBanner" src="<%=basePath%>/newImage/price.png" alt="" style="width:100%;"/>
<div class="lg-container">
    <div class="text-center" style="margin-bottom: 50px">
        <h2>
            价格体系
        </h2>
        <h3 style="color: #D6D6D6;">
            ERP Price system
        </h3>
    </div>
    <div class="row">
        <div class="col-md-4 cbox">
            <div class="pclass">
                <img src="newImage/price/S1.png" alt="..." class="img-rounded"
                     style="position: absolute;left: 0;right: 0;margin: 0 auto;top: -20px;">
                <div class="ctxt">
                    进销存基础版
                </div>
                <div class="cltit">
                    <b>¥<span>80元</span></b>/月/站点
                </div>
                <div class="clcon">
                    <span>进销存</span>
                </div>
            </div>
        </div>
        <div class="col-md-4 cbox">
            <div class="pclass">
                <img src="newImage/price/S2.png" alt="..." class="img-rounded"
                     style="position: absolute;left: 0;right: 0;margin: 0 auto;top: -20px;">
                <div class="ctxt">
                    进销存进阶版
                </div>
                <div class="cltit">
                    <b>¥<span>108元</span></b>/月/站点
                </div>
                <div class="clcon">
                    <span>进销存 + 会员 + 售后</span><br/>
                </div>
            </div>
        </div>
        <div class="col-md-4 cbox">
            <div class="pclass">
                <img src="newImage/price/S4.png" alt="..." class="img-rounded"
                     style="position: absolute;left: 0;right: 0;margin: 0 auto;top: -20px;">
                <div class="ctxt">
                    进销存尊享版
                </div>
                <div class="cltit">
                    <b>¥<span>128元</span></b>/月/站点
                </div>
                <div class="clcon">
                    <span>进销存 + 会员 + 售后 + 专业财务</span><br/>
                </div>
            </div>

        </div>
    </div>
</div>
<div class="lg-container" style="margin-top:50px;margin-bottom:50px">
    <div class="row">
        <div class="col-md-6 col-xs-12 " style="text-align: center;">
            <a href="<%=basePath%>/askFor.jsp" class="btn btn-info nbtn">
                申请试用
            </a>
        </div>
        <div class="col-md-6 col-xs-12" style="text-align: center;">
            <a href="<%=basePath%>/askFor.jsp" class="btn btn-info nbtn">
                申请购买
            </a>
        </div>
    </div>
</div>

<div class="priceContainer" style="background: #EFF4F7;padding: 17px 0 50px 0;">
    <div class="text-center" style="margin-bottom: 50px">
        <h2>
            设备使用规则
        </h2>
        <h3 style="color: #D6D6D6;">
            Equipment usage rules
        </h3>
    </div>

    <div class="lg-container" style="margin-top:50px;margin-bottom:50px">
        <div class="row">
            <div class="col-md-6 col-xs-12 " style="text-align: center;padding: 0 40px;">
                <img src="newImage/price/bqdyj.png" style="width: 100%;">
                <div class="ybox">标签打印机: 一个公司限一台</div>
            </div>
            <div class="col-md-6 col-xs-12" style="text-align: center;padding: 0 40px;">
                <img src="newImage/price/dyxp.png" style="width: 100%;">
                <div class="ybox">小票打印机: 一个门店限一台</div>
            </div>
        </div>
    </div>

    <div style="padding-top:50px;margin-bottom:50px;background: #fff;">
        <div class="text-center" style="margin-bottom: 50px">
            <h2>
                设备保证金退还机制
            </h2>
            <h3 style="color: #D6D6D6;">
                Equipment margin refund mechanism
            </h3>
        </div>

        <div class="lg-container">
            <div class="row" style="text-align: center;padding-bottom: 50px;">
                <div class="col-md-6">
                    <div style="padding-bottom: 50px;">
                        <img src="newImage/price/bzj.png">
                    </div>
                    <div class="fd1">软件租用合同一年一签</div>
                    <div class="fd2">次年退还30%保证金，分三次退还全部保证金</div>
                </div>
                <div class="col-md-6">
                    <div style="padding-bottom: 50px;">
                        <img src="newImage/price/mfzs.png">
                    </div>
                    <div class="fd1">软件租用合同三年一签</div>
                    <div class="fd2">不收取保证金，全套设备免费赠送</div>
                </div>
            </div>
        </div>
    </div>

    <div class="lg-container">
        <div class="row">
            <div class="col-md-6" style="padding: 0;">
                <img src="newImage/price/hand.png" style="width: 100%;height: 385px;">
            </div>
            <div class="col-md-6" style="padding: 0;height: 385px;background: #fff;padding: 50px 30px;">
                <h2>
                    客户转介绍机制
                </h2>
                <h3 style="color: #D6D6D6;text-align: initial;background: #fff;">
                    Customer referral mechanism
                </h3>
                <div style="font-size: 18px;letter-spacing: 8px;margin: 40px 0 0 0;">
                    转介绍客户使用云盛软件，合作成功后将给予介绍方惊喜大礼。
                </div>
            </div>
        </div>
    </div>

</div>
<jsp:include page="include/foot.jsp"/>
