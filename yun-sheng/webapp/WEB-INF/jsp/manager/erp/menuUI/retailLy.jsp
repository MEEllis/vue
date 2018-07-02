<%@page contentType="text/html"%>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!-- 
      retailLy.jsp
      <零售>
      
      Created by LyNnJeR on 2017-01-20.
      Copyright 2017 LyNnJeR. All rights reserved.
 -->
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=9; IE=8; IE=7; IE=EDGE ; chrome=1" />
        <title>零售</title>
       
    </head>
    <link rel="stylesheet" href="${basePath}/css/erp/menuUI/picLy.css?v=${version}" media="screen" type="text/css" />
    <script type="text/javascript">
		var basePath = "${basePath}";
	</script>
    <body>
		<div class="wrap">
			<!--div class="picLeft">
				<div class="first">
					<div class="tubiao">
						<a  onclick="javascript:parent.openWorkBoxByMenutext('商品价格管理','/manager/priceManage/showPriceManager');" class="aTubiao">
							<img src="../images/lingshou/spjggl.png" alt="" />
							<p class="name">
								商品价格管理
							</p>
						</a>
					</div>
					<div class="jiantou">
					</div>
					<div class="tubiao">
						<a  onclick="javascript:parent.openWorkBoxByMenutext('调拨发货','/manager/jxc/storage/transferPrice/TransferPrice');" class="aTubiao">
							<img src="../images/lingshou/dbfh.png" alt="" />
							<p class="name">
								调拨发货
							</p>
						</a>
					</div>
					<div class="jiantou">
					</div>
					<div class="tubiao">
						<a  onclick="javascript:parent.openWorkBoxByMenutext('确认收货','/manager/jxc/storage/allotReceptionAffim/AllotReception');" class="aTubiao">
							<img src="../images/lingshou/qrsh.png" alt="" />
							<p class="name">
								确认收货
							</p>
						</a>
					</div>
					<div class="jiantou">
					</div>
					<div class="tubiao" style="">
						<a target="_blank" class="aTubiao">
							<img src="../images/lingshou/hygl.png" alt="" />
							<p class="name">
								会员管理
							</p>
						</a>
					</div>
				</div>
				<div class="second">
					<div class="tubiao"></div>
				</div>
				<div class="third">
					<div class="tubiao">
						<a  onclick="javascript:parent.openWorkBoxByMenutext('促销管理','/manager/promotion/retailPromotion');" class="aTubiao">
							<img src="../images/lingshou/cxgl.png" alt="" />
							<p class="name">
								促销管理
							</p>
						</a>
					</div>
					<div class="jiantou">
					</div>
					<div class="tubiao">
						<a  onclick="javascript:parent.openWorkBoxByMenutext('移库单','/manager/jxc/storage/commodity/Commodity');" class="aTubiao">
							<img src="../images/lingshou/ykd.png" alt="" />
							<p class="name">
								移库单
							</p>
						</a>
					</div>
					<div class="jiantou">
					</div>
					<div class="tubiao">
						<a  onclick="javascript:parent.openWorkBoxByMenutext('售前机返回','/manager/afterSalesService/returnMachine/page');" class="aTubiao">
							<img src="../images/lingshou/sqjfh.png" alt="" />
							<p class="name">
								售前机返回
							</p>
						</a>
					</div>
					<div class="jiantou">
					</div>
					<div class="tubiao" style="">
						<a  onclick="javascript:parent.openWorkBoxByMenutext('营业日结','/manager/jxc/authority/tdaily/daily');" class="aTubiao">
							<img src="../images/lingshou/yyrj.png" alt="" />
							<p class="name">
								营业日结
							</p>
						</a>
					</div>
				</div>
				<div class="four">
					<div class="tubiao"></div>
				</div>
				<div class="five">
					<div class="tubiao">
						<a  onclick="javascript:parent.openWorkBoxByMenutext('零售定金','/manager/retail/deposit/retailDepositMain');" class="aTubiao">
							<img src="../images/lingshou/lsdj.png" alt="" />
							<p class="name">
								零售定金
							</p>
						</a>
					</div>
					<div class="jiantou">
						<img src="../images/caigou/dhr.png" alt="" />
					</div>
					<div class="tubiao">
						<a  onclick="javascript:parent.openWorkBoxByMenutext('零售开单','/manager/retail/billing/retailBillingMain');" class="aTubiao">
							<img src="../images/lingshou/lskd.png" alt="" />
							<p class="name">
								零售开单
							</p>
						</a>
					</div>
					<div class="jiantou">
						<img src="../images/caigou/dhr.png" alt="" />
					</div>
					<div class="tubiao">
						<a  onclick="javascript:parent.openWorkBoxByMenutext('零售退货','/manager/retail/refund/retailRefundMain');" class="aTubiao">
							<img src="../images/lingshou/lsth.png" alt="" />
							<p class="name">
								零售退货
							</p>
						</a>
					</div>
					<div class="jiantou">
					</div>
					<div class="tubiao" style="">
						<a  onclick="javascript:parent.openWorkBoxByMenutext('收款结算','/manager/retail/checkPay/payMoneyAuditJSP');" class="aTubiao">
							<img src="../images/lingshou/skjs.png" alt="" />
							<p class="name">
								收款结算
							</p>
						</a>
					</div>
				</div>
				<div class="six">
					<div class="tubiao"></div>
					<div class="jiantou"></div>
					<div class="tubiao"></div>
					<div class="jiantou"></div>
					<div class="jiantouV">
						<img src="../images/caigou/dhv.png" alt="" />
					</div>
					<div class="jiantou">
					</div>
					<div class="tubiao" style=""></div>
				</div>
				<div class="seven">
					<div class="tubiao">
						<a href="#" target="_blank" class="aTubiao">
							<img src="../images/lingshou/mdjk.png" alt="" />
							<p class="name">
								门店缴款
							</p>
						</a>
					</div>
					<div class="jiantou">
					</div>
					<div class="tubiao">
						<a href="#" target="_blank" class="aTubiao">
							<img src="../images/lingshou/sytj.png" alt="" />
							<p class="name">
								收银统计
							</p>
						</a>
					</div>
					<div class="jiantou">
					</div>
					<div class="tubiao">
						<a  onclick="javascript:parent.openWorkBoxByMenutext('零售换货','/manager/retail/exchange/retailExchangeMain');" class="aTubiao">
							<img src="../images/lingshou/lshh.png" alt="" />
							<p class="name">
								零售换货
							</p>
						</a>
					</div>
					<div class="jiantou">
					</div>
					<div class="tubiao" style="">
					</div>
				</div>
			</div-->
			
			<table class="picLeft">
			  <tbody>
			  	  <tr>
			  	  	<td class="tubiao pdTB">
			  	  	<a  onclick="javascript:parent.openWorkBoxByMenutext('商品价格管理','/manager/priceManage/showPriceManager');" class="aTubiao">
							<img src="../images/lingshou/spjggl.png" alt="" />
							<p class="name">
								商品价格管理
							</p>
						</a></td>
			  	  	<td class="jiantou"></td>
			  	  	<td class="tubiao">
			  	  	     <a  onclick="javascript:parent.openWorkBoxByMenutext('调拨发货','/manager/jxc/storage/transferPrice/TransferPrice');" class="aTubiao">
							<img src="../images/lingshou/dbfh.png" alt="" />
							<p class="name">
								调拨发货
							</p>
						</a></td>
			  	  	<td class="jiantou"></td>
			  	  	<td class="tubiao">
			  	  	    <a  onclick="javascript:parent.openWorkBoxByMenutext('确认收货','/manager/jxc/storage/allotReceptionAffim/AllotReception');" class="aTubiao">
							<img src="../images/lingshou/qrsh.png" alt="" />
							<p class="name">
								确认收货
							</p>
						</a></td>
			  	  	<td class="vaccume"></td>
			  	  	<td class="tubiao">
			  	  	    <a target="_blank" class="aTubiao">
							<img src="../images/lingshou/hygl.png" alt="" />
							<p class="name">
								会员管理
							</p>
						</a></td>
			  	  </tr>
			  	  <tr>
			  	  	<td class="tubiao pdTB"></td>
			  	  	<td class="jiantou"></td>
			  	  	<td class="tubiao"></td>
			  	  	<td class="jiantou"></td>
			  	  	<td class="tubiao"></td>
			  	  	<td class="vaccume"></td>
			  	  	<td class="tubiao"></td>
			  	  </tr>
			  	  <tr>
			  	  	<td class="tubiao pdTB">
			  	  	  <a  onclick="javascript:parent.openWorkBoxByMenutext('促销管理','/manager/promotion/retailPromotion');" class="aTubiao">
							<img src="../images/lingshou/cxgl.png" alt="" />
							<p class="name">
								促销管理
							</p>
						</a></td>
			  	  	<td class="jiantou"></td>
			  	  	<td class="tubiao">
			  	  	    <a  onclick="javascript:parent.openWorkBoxByMenutext('移库单','/manager/jxc/storage/commodity/Commodity');" class="aTubiao">
							<img src="../images/lingshou/ykd.png" alt="" />
							<p class="name">
								移库单
							</p>
						</a></td>
			  	  	<td class="jiantou"></td>
			  	  	<td class="tubiao">
			  	  	    <a  onclick="javascript:parent.openWorkBoxByMenutext('售前机返回','/manager/afterSalesService/returnMachine/page');" class="aTubiao">
							<img src="../images/lingshou/sqjfh.png" alt="" />
							<p class="name">
								售前机返回
							</p>
						</a></td>
			  	  	<td class="vaccume"></td>
			  	  	<td class="tubiao">
			  	  	  <a  onclick="javascript:parent.openWorkBoxByMenutext('营业日结','/manager/jxc/authority/tdaily/daily');" class="aTubiao">
							<img src="../images/lingshou/yyrj.png" alt="" />
							<p class="name">
								营业日结
							</p>
						</a></td>
			  	  </tr>
			  	  <tr>
			  	  	<td class="tubiao pdTB"></td>
			  	  	<td class="jiantou"></td>
			  	  	<td class="tubiao"></td>
			  	  	<td class="jiantou"></td>
			  	  	<td class="tubiao"></td>
			  	  	<td class="vaccume"></td>
			  	  	<td class="tubiao"></td>
			  	  	
			  	  </tr>
			  	  <tr>
			  	  	<td class="tubiao pdTB">
			  	  	  <a  onclick="javascript:parent.openWorkBoxByMenutext('零售定金','/manager/retail/deposit/retailDepositMain');" class="aTubiao">
							<img src="../images/lingshou/lsdj.png" alt="" />
							<p class="name">
								零售定金
							</p>
						</a></td>
			  	  	<td class="jiantou">
			  	  	    <img src="../images/caigou/dhr.png" alt="" /></td>
			  	  	<td class="tubiao">
			  	  	    <a  onclick="javascript:parent.openWorkBoxByMenutext('零售开单','/manager/retail/billing/retailBillingMain');" class="aTubiao">
							<img src="../images/lingshou/lskd.png" alt="" />
							<p class="name">
								零售开单
							</p>
						</a></td>
			  	  	<td class="jiantou">
			  	  	   	<img src="../images/caigou/dhr.png" alt="" /></td>
			  	  	<td class="tubiao">
			  	  	    <a  onclick="javascript:parent.openWorkBoxByMenutext('零售退货','/manager/retail/refund/retailRefundMain');" class="aTubiao">
							<img src="../images/lingshou/lsth.png" alt="" />
							<p class="name">
								零售退货
							</p>
						</a></td>
			  	  	<td class="vaccume"></td>
			  	  	<td class="tubiao">
			  	  	    <a  onclick="javascript:parent.openWorkBoxByMenutext('收款结算','/manager/retail/checkPay/payMoneyAuditJSP');" class="aTubiao">
							<img src="../images/lingshou/skjs.png" alt="" />
							<p class="name">
								收款结算
							</p>
						</a></td>
			  	  </tr>
			  	  
			  	   <tr>
			  	  	<td class="tubiao"></td>
			  	  	<td class="jiantou"></td>
			  	  	<td class="tubiao"></td>
			  	  	<td class="jiantou"></td>
			  	  	<td class="tubiao pdTB">
			  	  	   <img src="../images/caigou/dhv.png" alt="" /></td>
			  	  	<td class="vaccume"></td>
			  	  	<td class="tubiao"></td>
			  	  </tr>
			  	  
			  	   <tr>
			  	  	<td class="tubiao pdTB">
			  	  	   <a href="#" target="_blank" class="aTubiao">
							<img src="../images/lingshou/mdjk.png" alt="" />
							<p class="name">
								门店缴款
							</p>
						</a></td>
			  	  	<td class="jiantou"></td>
			  	  	<td class="tubiao">
			  	  	    <a href="#" target="_blank" class="aTubiao">
							<img src="../images/lingshou/sytj.png" alt="" />
							<p class="name">
								收银统计
							</p>
						</a></td>
			  	  	<td class="jiantou"></td>
			  	  	<td class="tubiao">
			  	  	   <a  onclick="javascript:parent.openWorkBoxByMenutext('零售换货','/manager/retail/exchange/retailExchangeMain');" class="aTubiao">
							<img src="../images/lingshou/lshh.png" alt="" />
							<p class="name">
								零售换货
							</p>
						</a></td>
			  	  	<td class="vaccume"></td>
			  	  	<td class="tubiao"></td>
			  	  </tr>
			  	  
			  	  
			     
			  </tbody>
			</table>
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
			getData('${basePath}/json/erp/menuUI/lingshou.json');
		});
	</script>
</html>