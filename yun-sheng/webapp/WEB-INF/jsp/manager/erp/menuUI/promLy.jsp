<%@page contentType="text/html"%>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!-- 
      promLy.jsp
      <促销>
      
      Created by LyNnJeR on 2017-01-20.
      Copyright 2017 LyNnJeR. All rights reserved.
 -->
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=9; IE=8; IE=7; IE=EDGE ; chrome=1" />
        <title>促销</title>
       
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
						<a  onclick="javascript:parent.openWorkBoxByMenutext('零售促销单','/manager/promotion/retailPromotion');" class="aTubiao">
							<img src="../images/chuxiao/lscxd.png" alt="" />
							<p class="name">
								零售促销单
							</p>
						</a>
					</div>
					<div class="jiantou">
					</div>
					<div class="tubiao">
						<a  onclick="javascript:parent.openWorkBoxByMenutext('零售促销券管理','/manager/promotion/promotionTicket');" class="aTubiao">
							<img src="../images/chuxiao/lscxj.png" alt="" />
							<p class="name">
								零售促销券管理
							</p>
						</a>
					</div>
					<div class="jiantou">
					</div>
					<div class="tubiao">
						<a  onclick="javascript:parent.openWorkBoxByMenutext('批发特价商品','/manager/promotion/wholesaleGoods');" class="aTubiao">
							<img src="../images/chuxiao/pftj.png" alt="" />
							<p class="name">
								批发特价商品
							</p>
						</a>
					</div>
				</div>
			</div-->
			<table class="picLeft">
			  <tbody>
			  	
			  	  <tr>
			  	  	<td class="tubiao">
			  	  		<a  onclick="javascript:parent.openWorkBoxByMenutext('零售促销单','/manager/promotion/retailPromotion');" class="aTubiao">
							<img src="../images/chuxiao/lscxd.png" alt="" />
							<p class="name">
								零售促销单
							</p>
						</a>
			  	  	</td>
			  	  	<td class="jiantou"></td>
			  	  	<td class="tubiao">
			  	  	    <a  onclick="javascript:parent.openWorkBoxByMenutext('零售促销券管理','/manager/promotion/promotionTicket');" class="aTubiao">
							<img src="../images/chuxiao/lscxj.png" alt="" />
							<p class="name">
								零售促销券管理
							</p>
						</a></td>
			  	  	<td class="jiantou"></td>
			  	  	<td class="tubiao pdTB">
			  	  		<a  onclick="javascript:parent.openWorkBoxByMenutext('批发特价商品','/manager/promotion/wholesaleGoods');" class="aTubiao">
							<img src="../images/chuxiao/pftj.png" alt="" />
							<p class="name">
								批发特价商品
							</p>
						</a>
			  	  	</td>
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
			getData('${basePath}/json/erp/menuUI/chuxiao.json');
		});
	</script>
</html>