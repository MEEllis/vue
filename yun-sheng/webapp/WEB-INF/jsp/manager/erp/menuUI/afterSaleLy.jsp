<%@page contentType="text/html"%>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!-- 
      afterSaleLy.jsp
      <售后>
      
      Created by LyNnJeR on 2017-01-21.
      Copyright 2017 LyNnJeR. All rights reserved.
 -->
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=9; IE=8; IE=7; IE=EDGE ; chrome=1" />
        <title>售后</title>
      
    </head>
    <link rel="stylesheet" href="${basePath}/css/erp/menuUI/pic2Ly.css?v=${version}" media="screen" type="text/css" />
    <script type="text/javascript">
		var basePath = "${basePath}";
	</script>
    <body>
		<div class="wrap">
			<div class="picLeft">
				<div class="first">
					<div class="tubiao">
						<a  onclick="javascript:parent.openWorkBoxByMenutext('接机登记卡','/manager/afterSalesService/receiveRecord/page');" class="aTubiao">
							<img src="../images/shouhou/sale1.png" alt="" />
							<p class="name">
								接机登记卡
							</p>
						</a>
					</div>
					<div class="jiantou">
					</div>
					<div class="tubiao">
						<a onclick="javascript:parent.openWorkBoxByMenutext('售后机接收','/manager/afterSalesService/receiveMachine/page');" class="aTubiao">
							<img src="../images/shouhou/sale2.png" alt="" />
							<p class="name">
								售后机接收
							</p>
						</a>
					</div>
					<div class="jiantou">
					</div>
					<div class="tubiao">
						<a  onclick="javascript:parent.openWorkBoxByMenutext('售后处理单','/manager/afterSalesService/serviceHandle/page');" class="aTubiao">
							<img src="../images/shouhou/sale3.png" alt="" />
							<p class="name">
								售后处理单
							</p>
						</a>
					</div>
					<div class="jiantou">
					</div>
					<div class="tubiao">
						<a onclick="javascript:parent.openWorkBoxByMenutext('增值服务设置','/manager/addValue/page');" class="aTubiao">
							<img src="../images/shouhou/sale4.png" alt="" />
							<p class="name">
								增值服务设置
							</p>
						</a>
					</div>
					<div class="lineRs">
						<img src="../images/shouhou/line1.png"/>
					</div>
				</div>
				<div class="second">
					<div class="jiantou"></div>
					<div class="jiantou"></div>
					<div class="jiantou">
						<img src="../images/caigou/dhr.png" alt="" />
					</div>
					<div class="jiantou"></div>
					<div class="jiantou"></div>
					<div class="jiantou"></div>
					<div class="jiantou"></div>
				</div>
				<div class="third">
					<div class="tubiao">
						<a onclick="javascript:parent.openWorkBoxByMenutext('自修处理','/manager/afterSalesService/selfRepair/page');" class="aTubiao">
							<img src="../images/shouhou/sale5.png" alt="" />
							<p class="name">
								自修处理
							</p>
						</a>
					</div>
					<div class="jiantou">
					</div>
					<div class="tubiao">
						<a onclick="javascript:parent.openWorkBoxByMenutext('外修及返厂','/manager/afterSalesService/wxfc/page');" class="aTubiao">
							<img src="../images/shouhou/sale6.png" alt="" />
							<p class="name">
								外修及返厂
							</p>
						</a>
					</div>
					<div class="jiantou">
					</div>
					<div class="tubiao">
						<a onclick="javascript:parent.openWorkBoxByMenutext('零售退货','/manager/retail/refund/retailRefundMain');" class="aTubiao">
							<img src="../images/shouhou/sale7.png" alt="" />
							<p class="name">
								零售退货
							</p>
						</a>
					</div>
					<div class="jiantou">
					</div>
					<div class="tubiao">
						<a onclick="javascript:parent.openWorkBoxByMenutext('零售换货','/manager/retail/exchange/retailExchangeMain');" class="aTubiao">
							<img src="../images/shouhou/sale8.png" alt="" />
							<p class="name">
								零售换货
							</p>
						</a>
					</div>
					<div class="lineLs">
						<img src="../images/shouhou/lineR.png"/>
					</div>
					<div class="lineW">
						<img src="../images/shouhou/line2.png"/>
					</div>
				</div>
				<div class="four">
					<div class="jiantou"></div>
					<div class="jiantou"></div>
					<div class="jiantou">
						<img src="../images/caigou/dhr.png" alt="" />
					</div>
					<div class="jiantou"></div>
					<div class="jiantou"></div>
					<div class="jiantou"></div>
					<div class="jiantou"></div>
				</div>
				<div class="five">
					<div class="tubiao"></div>
					<div class="jiantou"></div>
					<div class="tubiao">
						<a onclick="javascript:parent.openWorkBoxByMenutext('收货结算','/manager/afterSalesService/receiptSettle/page');" class="aTubiao">
							<img src="../images/shouhou/sale9.png" alt="" />
							<p class="name">
								收货结算
							</p>
						</a>
					</div>
					<div class="jiantou">
					</div>
					<div class="tubiao">
					</div>
					<div class="jiantou">
					</div>
					<div class="tubiao">
					</div>
				</div>
				<div class="six">
					<div class="jiantou"></div>
					<div class="jiantou"></div>
					<div class="jiantou">
						<img src="../images/caigou/dhr.png" alt="" />
					</div>
					<div class="jiantou"></div>
					<div class="jiantou">
					</div>
					<div class="jiantou"></div>
					<div class="jiantou"></div>
				</div>
				<div class="seven">
					<div class="tubiao">
						<a onclick="javascript:parent.openWorkBoxByMenutext('取机结算','/manager/afterSalesService/takeMachine/page');" class="aTubiao">
							<img src="../images/shouhou/sale10.png" alt="" />
							<p class="name">
								取机结算
							</p>
						</a>
					</div>
					<div class="jiantou">
					</div>
					<div class="tubiao">
						<a onclick="javascript:parent.openWorkBoxByMenutext('售前返还','/manager/afterSalesService/returnMachine/page');" class="aTubiao">
							<img src="../images/shouhou/sale11.png" alt="" />
							<p class="name">
								售前返还
							</p>
						</a>
					</div>
					<div class="jiantou">
					</div>
					<div class="tubiao">
					</div>
					<div class="jiantou">
					</div>
					<div class="tubiao">
					</div>
					<div class="lineLs3">
						<img src="../images/shouhou/line3.png"/>
					</div>
				</div>
			</div>
			<div class="main">
				<div class="jichu">
					<div class="jTop">基础资料</div>
					<div class="jLeft"></div>
					<div class="jRight"></div>
				</div>
				<div class="baobiao">
					<div class="bTop">报表查询</div>
					<div class="bLeft"></div>
					<div class="bRight"></div>
				</div>
			</div>
		</div>
	</body>
	<script src="${basePath}/js/erp/menuUI/jquery-1.12.4.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/erp/menuUI/picLy.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script>
		$(function(){
			$('.lineW').width((($('.picLeft').width()-640-135)/3)+155);
			getData('${basePath}/json/erp/menuUI/shouhou.json');
		});
	</script>
	
</html>