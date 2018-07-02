<%@page contentType="text/html"%>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!-- 
      vipLy.jsp
      <会员>
      
      Created by LyNnJeR on 2017-01-20.
      Copyright 2017 LyNnJeR. All rights reserved.
 -->
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=9; IE=8; IE=7; IE=EDGE ; chrome=1" />
        <title>会员</title>
    </head>
    <link rel="stylesheet" href="${basePath}/css/erp/menuUI/picLy.css?v=${version}" media="screen" type="text/css" />
    <style type="text/css">
		/*每行3个图标时  样式改变*/
		.picLeft {width: 43%;}
		@media screen and (max-width: 1920px) {
		    .picLeft {
		        margin-left:20%;
		    }
		}
		@media screen and (max-width: 1366px) {
		    .picLeft {
		        margin-left:16%;
		    }
		}
		@media screen and (max-width: 1280px) {
		    .picLeft {
		        margin-left:14%;
		    }
		}
	</style>
    <script type="text/javascript">
		var basePath = "${basePath}";
	</script>
    <body>
		<div class="wrap">
			<!--div class="picLeft">
				<div class="first">
					<div class="tubiao">
						<a  onclick="javascript:parent.openWorkBoxByMenutext('会员卡管理','/manager/member/cardInfo/toPage');" class="aTubiao">
							<img src="../images/huiyuan/hykgl.png" alt="" />
							<p class="name">
								会员卡管理
							</p>
						</a>
					</div>
					<div class="jiantou">
					</div>
					<div class="tubiao">
						<a  onclick="javascript:parent.openWorkBoxByMenutext('会员类型管理','/manager/member/cardType/toPage');" class="aTubiao">
							<img src="../images/huiyuan/hylxgl.png" alt="" />
							<p class="name">
								会员类型管理
							</p>
						</a>
					</div>
					<div class="jiantou">
					</div>
					<div class="tubiao">
						<a  onclick="javascript:parent.openWorkBoxByMenutext('会员升级管理','/manager/member/cardTypeUp/toPage');" class="aTubiao">
							<img src="../images/huiyuan/hysjgl.png" alt="" />
							<p class="name">
								会员升级管理
							</p>
						</a>
					</div>
				</div>
				<div class="second">
					<div class="tubiao"></div>
				</div>
				<div class="third">
					<div class="tubiao">
						<a  onclick="javascript:parent.openWorkBoxByMenutext('充值赠送设置','/manager/member/rechargeGift/toPage');" class="aTubiao">
							<img src="../images/huiyuan/czzs.png" alt="" />
							<p class="name">
								充值赠送设置
							</p>
						</a>
					</div>
					<div class="jiantou">
					</div>
					<div class="tubiao">
						<a  onclick="javascript:parent.openWorkBoxByMenutext('增值服务设置','/manager/addValue/page');" class="aTubiao">
							<img src="../images/huiyuan/zzfw.png" alt="" />
							<p class="name">
								增值服务设置
							</p>
						</a>
					</div>
					<div class="jiantou"></div>
					<div class="tubiao">
						<a  onclick="javascript:parent.openWorkBoxByMenutext('收款单','/manager/funds/payment/initPayee');" class="aTubiao">
							<img src="../images/huiyuan/skd.png" alt="" />
							<p class="name">
								收款单
							</p>
						</a>
					</div>
				</div>
				<div class="four">
					<div class="tubiao"></div>
				</div>
				<div class="five">
					<div class="tubiao">
						<a  onclick="javascript:parent.openWorkBoxByMenutext('多倍积分设置','/manager/member/multiScore/toPage');" class="aTubiao">
							<img src="../images/huiyuan/dbjfsz.png" alt="" />
							<p class="name">
								多倍积分设置
							</p>
						</a>
					</div>
					<div class="jiantou">
					</div>
					<div class="tubiao">
						<a  onclick="javascript:parent.openWorkBoxByMenutext('积分调整','/manager/member/scoreUpdate/toPage');" class="aTubiao">
							<img src="../images/huiyuan/jftz.png" alt="" />
							<p class="name">
								积分调整
							</p>
						</a>
					</div>
					<div class="jiantou">
					</div>
					<div class="tubiao">
						<a  onclick="javascript:parent.openWorkBoxByMenutext('其它收款单','/manager/funds/payment/otherPayee');" class="aTubiao">
							<img src="../images/huiyuan/qtsk.png" alt="" />
							<p class="name">
								其它收款单
							</p>
						</a>
					</div>
				</div>
			</div-->
			<table class="picLeft">
			  <tbody>
			  	  <tr>
			  	  	<td class="tubiao pdTB">
			  	  		<a  onclick="javascript:parent.openWorkBoxByMenutext('会员卡管理','/manager/member/cardInfo/toPage');" class="aTubiao">
							<img src="../images/huiyuan/hykgl.png" alt="" />
							<p class="name">
								会员卡管理
							</p>
						</a>
			  	  	</td>
			  	  	<td class="jiantou"></td>
			  	  	<td class="tubiao">
			  	  		<a  onclick="javascript:parent.openWorkBoxByMenutext('会员类型管理','/manager/member/cardType/toPage');" class="aTubiao">
							<img src="../images/huiyuan/hylxgl.png" alt="" />
							<p class="name">
								会员类型管理
							</p>
						</a>
			  	  	</td>
			  	  	<td class="jiantou"></td>
			  	  	<td class="tubiao">
			  	  		<a  onclick="javascript:parent.openWorkBoxByMenutext('会员升级管理','/manager/member/cardTypeUp/toPage');" class="aTubiao">
							<img src="../images/huiyuan/hysjgl.png" alt="" />
							<p class="name">
								会员升级管理
							</p>
						</a>
			  	  	</td>
			  	  	
			  	  </tr>
			  	  <tr>
			  	  	<td class="tubiao"></td>
			  	  	<td class="jiantou"></td>
			  	  	<td class="tubiao"></td>
			  	  	<td class="jiantou"></td>
			  	  	<td class="tubiao pdTB"></td>
			  	  	
			  	  </tr>
			  	  <tr>
			  	  	<td class="tubiao pdTB">
			  	  		<a  onclick="javascript:parent.openWorkBoxByMenutext('充值赠送设置','/manager/member/rechargeGift/toPage');" class="aTubiao">
							<img src="../images/huiyuan/czzs.png" alt="" />
							<p class="name">
								充值赠送设置
							</p>
						</a>
			  	  	</td>
			  	  	<td class="jiantou"></td>
			  	  	<td class="tubiao">
			  	  		<a  onclick="javascript:parent.openWorkBoxByMenutext('增值服务设置','/manager/addValue/page');" class="aTubiao">
							<img src="../images/huiyuan/zzfw.png" alt="" />
							<p class="name">
								增值服务设置
							</p>
						</a>
			  	  	</td>
			  	  	<td class="jiantou"></td>
			  	  	<td class="tubiao">
			  	  		<a  onclick="javascript:parent.openWorkBoxByMenutext('收款单','/manager/funds/payment/initPayee');" class="aTubiao">
							<img src="../images/huiyuan/skd.png" alt="" />
							<p class="name">
								收款单
							</p>
						</a>
			  	  	</td>
			  	  	
			  	  </tr>
			  	   <tr>
			  	  	<td class="tubiao pdTB">
			  	  		
			  	  	</td>
			  	  	<td class="jiantou"></td>
			  	  	<td class="tubiao">
			  	  		
			  	  	</td>
			  	  	<td class="jiantou"></td>
			  	  	<td class="tubiao">
			  	  		
			  	  	</td>
			  	  	
			  	  </tr>
			  	   <tr>
			  	  	<td class="tubiao pdTB">
			  	  		<a  onclick="javascript:parent.openWorkBoxByMenutext('多倍积分设置','/manager/member/multiScore/toPage');" class="aTubiao">
							<img src="../images/huiyuan/dbjfsz.png" alt="" />
							<p class="name">
								多倍积分设置
							</p>
						</a>
			  	  	</td>
			  	  	<td class="jiantou"></td>
			  	  	<td class="tubiao">
			  	  		<a  onclick="javascript:parent.openWorkBoxByMenutext('积分调整','/manager/member/scoreUpdate/toPage');" class="aTubiao">
							<img src="../images/huiyuan/jftz.png" alt="" />
							<p class="name">
								积分调整
							</p>
						</a>
			  	  	</td>
			  	  	<td class="jiantou"></td>
			  	  	<td class="tubiao">
			  	  		<a  onclick="javascript:parent.openWorkBoxByMenutext('其它收款单','/manager/funds/payment/otherPayee');" class="aTubiao">
							<img src="../images/huiyuan/qtsk.png" alt="" />
							<p class="name">
								其它收款单
							</p>
						</a>
			  	  	</td>
			  	  
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
			getData('${basePath}/json/erp/menuUI/huiyuan.json');
		});
	</script>
</html>