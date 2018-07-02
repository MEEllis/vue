<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = path + "/YSHomePage";
%>
<jsp:include page="include/head.jsp" />
<%--<script src="<%=basePath%>/js/addBanner.js"></script>
--%><link rel="stylesheet" href="<%=basePath%>/css/index.css" />
<title>云盛软件</title>
<script>
	var _hmt = _hmt || [];
	(function() {
		var hm = document.createElement("script");
		hm.src = "https://hm.baidu.com/hm.js?91471a0372bbb1cae7dc43f903e2105e";
		var s = document.getElementsByTagName("script")[0];
		s.parentNode.insertBefore(hm, s);
	})();
</script>
<style>
    .classLayer {
        margin: 9px;
        border: 1px solid #eeeeee
    }


    .titImg {
        width: 100%;
    }

    .tit {
        height: 54px;
        line-height: 54px;
        text-align: center;
        background: white;
        font-size: 16px;
        color: 666666;
        border-bottom: 1px solid #eeeeee
    }

    .titB {
        padding: 5px 15px 5px 15px;
        
        text-align:left;
        height: 104px;
        font-size: 16px;
        color: #849ba8
    }



    .newsBtn {height：110px;
        line-height: 110px;
    }

    .newsLayer {
        background: white;        
        margin-bottom: 20px;
        overflow:hidden;
    }

    .newsl {
        width: 240px;
        float: left;
    }

    .newsr {
        margin-left: 240px;
        padding-left: 30px;
        font-size: 16px;
        padding-top:30px;
        color: #666666;
    }

    .newSp {
        height: 59px;
        line-height: 59px;
        text-align: center;
        background: white;
        font-size: 16px;
        color: #666666;
    }

    .newF {
        background: white;
        height: 50px;
        line-height: 50px;
        text-align: center;
        margin-top: 50px;
    }
    .nbtn{
    	height: 50px;background: #23C0F7;font-size: 22px;color: #ffffff;width: 238px;border-radius: 5px;    
    }
    .carousel-control.left{
    	background-image:white !important;
    }
    .ne{
    background:white;line-height:54px;text-align: center;font-size: 16px;color: #666666;
    }
    .img_box{
    	width:15%;
    	padding:40px;
    	box-sizing:border-box;
    	float:left;
    	margin-right:2%;
    	
    }
    .psd {
        text-align: left !important;
        font-weight: normal;
        color:red;
        font-size: 14px;
        padding-top:0px !important;
    }
</style>
</head>
<body>
<jsp:include page="include/navbar.jsp" />
<div id="carousel-example-generic" class="carousel slide"
     data-ride="carousel">
    <ol class="carousel-indicators">
        <li data-target="#carousel-example-generic" data-slide-to="0"
            class="active"></li>
        <li data-target="#carousel-example-generic" data-slide-to="1"></li>
        <li data-target="#carousel-example-generic" data-slide-to="2"></li>
         <li data-target="#carousel-example-generic" data-slide-to="3"></li>
    </ol>
    <div class="carousel-inner" role="listbox">
        <div class="item active">
            <img src="<%=basePath%>/newImage/price.png" alt="...">
            <div class="carousel-caption">
            </div>
        </div>
        <div class="item">
            <img src="<%=basePath%>/newImage/banner580.png" alt="...">
            <div class="carousel-caption">
            </div>
        </div>
        <div class="item">
            <img src="<%=basePath%>/newImage/joinbg.png" alt="...">
            <div class="carousel-caption">
            </div>
        </div>
         <div class="item">
         	<a href="/YSHomePage/pdDetail.jsp" >
            	<img src="<%=basePath%>/img/pdBanner.png" alt="...">
            </a>
            <div class="carousel-caption">
            </div>
        </div>
    </div>
    <a class="left carousel-control" href="#carousel-example-generic"
       role="button" data-slide="prev"> <span
            class="glyphicon glyphicon-chevron-left"></span> <span
            class="sr-only">Previous</span> </a>
    <a class="right carousel-control" href="#carousel-example-generic"
       role="button" data-slide="next"> <span
            class="glyphicon glyphicon-chevron-right"></span> <span
            class="sr-only">Next</span> </a>
</div>
<div style="text-align: center;position: fixed;bottom: 0;left: 0;width: 400px;height: 400px;z-index: 5;" id="videoBox">
    <div id="closeVideo">x</div>
    <embed src="https://imgcache.qq.com/tencentvideo_v1/playerv3/TPout.swf?max_age=86400&v=20161117&vid=v0546ydg932&auto=0" loop="true" allowFullScreen="true" quality="high" width="100%" height="100%" align="center" allowScriptAccess="always" type="application/x-shockwave-flash"></embed>
</div>
<div class="lg-container">
    <div class="text-center layer">
        <h2>
            综合解决方案
        </h2>
        <h3>
            Solution
        </h3>
    </div>
    <div class="row" style="margin-top:50px;">
        <div class="col-md-3 col-xs-12">
            <div class="classLayer">
                <div>
                    <img class="titImg" src="<%=basePath%>/newImage/lsls.png" alt="" />
                </div>
                <div class="tit">
                    连锁零售管理解决方案
                </div>
                <div>
                    <p class="titB">
                        运营商业务处理；合作商收款抵扣；增值服务业务；分期业务处理；会员积分及促销
                    </p>
                </div>
            </div>
        </div>
        <div class="col-md-3 col-xs-12">
            <div class="classLayer">
                <div>
                    <img class="titImg" src="<%=basePath%>/newImage/fxgl.png" alt="" />
                </div>
                <div class="tit">
                    分销管理解决方案
                </div>
                <div>
                    <p class="titB">
                    <br/>
                        灵活价格控制；各种分析查询
                    </p>
                </div>
            </div>
        </div>
        <div class="col-md-3 col-xs-12">
            <div class="classLayer">
                <div>
                    <img class="titImg" src="<%=basePath%>/newImage/cwyth.png" alt="" />
                </div>
                <div class="tit">
                    财务一体化管理解决方案
                </div>
                <div>
                    <p class="titB">
                        标准化财务核算体系；部门独立核算体系；其他模块与财务无缝连接
                    </p>
                </div>
            </div>
        </div>
        <div class="col-md-3 col-xs-12">
            <div class="classLayer">
                <div>
                    <img class="titImg" src="<%=basePath%>/newImage/shwx.png" alt="" />
                </div>
                <div class="tit">
                    售后维修管理解决方案
                </div>
                <div>
                    <p class="titB">
                        售前机返厂处理；返厂机库存、颜色、串号变动的记录；售后机两种维修方式；有效结合增值服务业务
                    </p>
                </div>
            </div>
        </div>
        <div class="col-md-3 col-xs-12">
            <div class="classLayer">
                <div>
                    <img class="titImg" src="<%=basePath%>/newImage/hygl.png" alt="" />
                </div>
                <div class="tit">
                    会员管理管理解决方案
                </div>
                <div>
                    <p class="titB">
                        支付即会员；客户分级管理；消费记录查询与分析
                    </p>
                </div>
            </div>
        </div>
        <div class="col-md-3 col-xs-12">
            <div class="classLayer">
                <div>
                    <img class="titImg" src="<%=basePath%>/newImage/jth.png" alt="" />
                </div>
                <div class="tit">
                    集团化管理解决方案
                </div>
                <div>
                    <p class="titB">
                        唯一会计制度及核算方式；准确的数据汇总及报表合并 ; 统一商品信息；集团区域化管理

                    </p>
                </div>
            </div>
        </div>
        <div class="col-md-3 col-xs-12">
            <div class="classLayer">
                <div>
                    <img class="titImg" src="<%=basePath%>/newImage/ccgl.png" alt="" />
                </div>
                <div class="tit">
                    仓储管理解决方案
                </div>
                <div>
                    <p class="titB">
                        成本管理与调整；补货需求分析；库存分析查询

                    </p>
                </div>
            </div>
        </div>
        <div class="col-md-3 col-xs-12">
            <div class="classLayer">
                <div>
                    <img class="titImg" src="<%=basePath%>/newImage/jggl.png" alt="" />
                </div>
                <div class="tit">
                    价格管理解决方案
                </div>
                <div>
                    <p class="titB">
                        完整价格策略；随时调整价格取值
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="newLayer">
    <div class="lg-container">
        <div class="text-center layer" style="padding-top: 50px;">
            <h2>
                新闻中心
            </h2>
            <h3>
                News Center
            </h3>
        </div>
        <div class="newsBtn">
            <div class="row">
                <div class="col-md-6 col-xs-12 " style="text-align: center;">
                    <a href="<%=basePath%>/companyNews.jsp" class="btn btn-info nbtn">
                        公司新闻
                    </a>
                </div>
                <div class="col-md-6 col-xs-12" style="text-align: center;">
                    <a  href="<%=basePath%>/dynamicNews.jsp" class="btn btn-info nbtn">
                        行业动态
                    </a>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6 col-xs-12">
            	<div class="row">
            		<div class="col-md-5 col-xs-12" style="background:white;text-align:left;padding-left:0">
            			<a href="/YSHomePage/news/news1.jsp" style="cursor:pointer;text-decoration:none" target="_blank"><img class="titImg" src="<%=basePath%>/news/news2.jpg" alt="" /></a>
            		</div>
            		<div class="col-md-7 col-xs-12" style="padding-left: 30px;font-size: 16px;padding-top: 30px;color: #666666;height:132px;background:white;">
            			<a href="/YSHomePage/news/news1.jsp" style="cursor:pointer;text-decoration:none;color:#666666" target="_blank">锐意变革 创新不止：云盛联达ERP系统正式上线。    
            			<span class="glyphicon glyphicon-chevron-right"></span></a>
            		</div>
            	</div>
           	</div>
            <div class="col-md-6 col-xs-12">
            	<div class="row">
            		<div class="col-md-12">
	            		<div class=" ne">
	            			<a href="/YSHomePage/news/news3.jsp" style="cursor:pointer;text-decoration:none;color:#666666" target="_blank">中国通讯连锁发展战略大会：联邦集团与云盛联达达成战略合作</a>
	            		</div>
            		</div>
            		<div class="col-md-12" style="margin-top:24px;">
	            		<div class=" ne">
	            		<a href="http://www.cankaoxiaoxi.com/science/20170313/1763167.shtml" style="cursor:pointer;text-decoration:none;color:#666666" target="_blank">中国通讯连锁发展战略大会在京开展</a>
	            		</div>	
            		</div>	
            	</div>
            </div>
        </div>
        
        <div class="row" style="margin-top:24px;">
            <div class="col-md-6 col-xs-12">
            	<div class="row">
            		<div class="col-md-5 col-xs-12" style="background:white;text-align:left;padding-left:0">
            			<a href="http://help.3g.163.com/0413/17/0224/10/CE1K1PJD04130DKD.html" style="cursor:pointer;text-decoration:none" target="_blank">
            				<img class="titImg" src="<%=basePath%>/news/news4.jpg" alt="" style="height:132px;cursor:pointer"/>
            			</a>
            		</div>
            		<div class="col-md-7 col-xs-12" style="padding-left: 30px;font-size: 16px;padding-top: 30px;color: #666666;height:132px;background:white;">
            			<a href="http://help.3g.163.com/0413/17/0224/10/CE1K1PJD04130DKD.html" style="cursor:pointer;text-decoration:none;color:#666666" target="_blank">2017年中国通讯连锁行业转型发展 敢问路在何方？</a>
            			<span class="glyphicon glyphicon-chevron-right"></span>
            			
            		</div>
            	</div>
           	</div>
            <div class="col-md-6 col-xs-12">
            	<div class="row">
            		<div class="col-md-12">
	            		<div class=" ne">
	            		<a href="http://soft.chinabyte.com/102/12328102.shtml" style="cursor:pointer;text-decoration:none;color:#666666" target="_blank">
	            			租赁型OA办公软件成企业新宠
	            		</a>
	            		</div>
            		</div>
            		<div class="col-md-12" style="margin-top:24px;">
	            		<div class=" ne">
	            			<a href="http://a.mini.eastday.com/html/2017/caijing_0409/3696947.html" style="cursor:pointer;text-decoration:none;color:#666666" target="_blank">
	            				通信行业全年趋势：仰望5G的星空 脚踏光纤的实地
	            			</a>
	            		</div>	
            		</div>	
            	</div>
            </div>
        </div>
        
        
        
        <%--<div class="row">
            <div class="col-md-6 col-xs-12">
                <div class="newsLayer">
                    <div class="newsl">
                        <img class="titImg" src="<%=basePath%>/news/news4.jpg" alt="" />
                    </div>
                    <div class="newsr">

                        2017年中国通讯连锁行业转型发展 敢问路在何方？
                    </div>
                </div>
            </div>
            <div class="col-md-6 col-xs-12">
                <div class="newsayer">
                    <div class="newSp" style="margin-bottom: 20px;">
                        租赁型OA办公软件成企业新宠
                    </div>
                    <div class="newSp">
                        通信行业全年趋势：仰望5G的星空 脚踏光纤的实地
                    </div>
                </div>
            </div>
        </div>
        --%><div class="row newF">
            <div class="col-md-12 col-xs-12">
                <a href="<%=basePath%>/newsCenter.jsp">查看更多>></a>
            </div>
        </div>
    </div>
</div>





<div class="lg-container">
    <div class="text-center layer" >
        <h2>
            合作伙伴
        </h2>
        <h3>
            Cooperative Partner
        </h3>
    </div>
    
    <div id="myCarousel" class="carousel slide" style="margin:50px 0 50px;">		
	<div class="carousel-inner">
		<div class="item active">
			<div style="text-align:center">
				<div class="img_box" style="background: url(<%=basePath%>/newImage/dx.png) no-repeat center center;background-size:contain;"></div>
				<div class="img_box" style="background: url(<%=basePath%>/newImage/yd.png) no-repeat center center;background-size:contain;"></div>
				<div class="img_box" style="background: url(<%=basePath%>/newImage/lt.png) no-repeat center center;background-size:contain;"></div>
				<div class="img_box" style="background: url(<%=basePath%>/newImage/xyyh.png) no-repeat center center;background-size:contain;"></div>
				<div class="img_box" style="background: url(<%=basePath%>/newImage/345346.png) no-repeat center center;background-size:contain;"></div>
				<div class="img_box" style="margin:0;background: url(<%=basePath%>/newImage/wxzf.png) no-repeat center center;background-size:contain;"></div>
				<div style="clear:both"></div>
			</div>
			<div style="text-align:center;margin-top:80px;">
				<div class="img_box" style="margin-left:10%;background: url(<%=basePath%>/newImage/zfb.png) no-repeat center center;background-size:70%;"></div>
				<div class="img_box" style="background: url(<%=basePath%>/newImage/12121.png) no-repeat center center;background-size:70%;"></div>
				<div class="img_box" style="background: url(<%=basePath%>/newImage/java.png) no-repeat center center;background-size:contain;"></div>
				<div class="img_box" style="background: url(<%=basePath%>/newImage/rq.png) no-repeat center center;background-size:70%;"></div>
				<div class="img_box" style="background: url(<%=basePath%>/newImage/ora.png) no-repeat center center;background-size:70%;"></div>
			</div>			
		</div>
	</div>
</div>		
</div>
        
</div>


<script>
	$('#closeVideo').click(function(){
		$('#videoBox').remove()

	})
</script>
<jsp:include page="include/foot.jsp" />