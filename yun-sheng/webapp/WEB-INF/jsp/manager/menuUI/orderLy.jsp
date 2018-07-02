<%@page contentType="text/html"%>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!-- 
      orderLy.jsp
      <采购>
      
      Created by LyNnJeR on 2017-01-20.
      Copyright 2017 LyNnJeR. All rights reserved.
 -->
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=9; IE=8; IE=7; IE=EDGE ; chrome=1" />
        <title>采购</title>
         
    </head>
    <link rel="stylesheet" href="${basePath}/css/menuUI/picLy.css" media="screen" type="text/css" />
    <script type="text/javascript">
		var basePath = "${basePath}";
	</script>
    <body>
		<div class="wrap">
			<div class="picLeft">
				<div class="first">
					<div class="tubiao">
						<a href="#" target="_blank" class="aTubiao">
							<img src="../images/caigou/cgdd.png" alt="" />
							<p class="name">
								采购订单
							</p>
						</a>
					</div>
					<div class="jiantou">
						<img src="../images/caigou/dhr.png" alt="" />
					</div>
					<div class="tubiao">
						<a href="#" target="_blank" class="aTubiao">
							<img src="../images/caigou/cgrk.png" alt="" />
							<p class="name">
								采购入库单
							</p>
						</a>
					</div>
					<div class="jiantou">
						<img src="../images/caigou/dhr.png" alt="" />
					</div>
					<div class="tubiao">
						<a href="#" target="_blank" class="aTubiao">
							<img src="../images/caigou/cgth.png" alt="" />
							<p class="name">
								采购退货单
							</p>
						</a>
					</div>
					<div class="jiantou">
					</div>
					<div class="tubiao" style="">
						<a href="#" target="_blank" class="aTubiao">
							<img src="../images/caigou/skd.png" alt="" />
							<p class="name">
								收款单
							</p>
						</a>
					</div>
				</div>
				<div class="second">
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
				<div class="third">
					<div class="tubiao"></div>
					<div class="jiantou"></div>
					<div class="tubiao"></div>
					<div class="jiantou"></div>
					<div class="tubiao">
						<a href="#" target="_blank" class="aTubiao">
							<img src="../images/caigou/cghh.png" alt="" />
							<p class="name">
								采购换货单
							</p>
						</a>
					</div>
					<div class="jiantou">
					</div>
					<div class="tubiao" style="">
						<a href="#" target="_blank" class="aTubiao">
							<img src="../images/caigou/fkd.png" alt="" />
							<p class="name">
								付款单
							</p>
						</a>
					</div>
				</div>
				<div class="four">
					<div class="tubiao"></div>
					<div class="jiantou"></div>
				</div>
				<div class="five">
					<div class="tubiao">
						<a href="#" target="_blank" class="aTubiao">
							<img src="../images/caigou/strk.png" alt="" />
							<p class="name">
								受托入库单
							</p>
						</a>
					</div>
					<div class="jiantou">
						<img src="../images/caigou/dhr.png" alt="" />
					</div>
					<div class="tubiao">
						<a href="#" target="_blank" class="aTubiao">
							<img src="../images/caigou/stth.png" alt="" />
							<p class="name">
								受托退货单
							</p>
						</a>
					</div>
					<div class="jiantou">
						<img src="../images/caigou/dhr.png" alt="" />
					</div>
					<div class="tubiao">
						<a href="#" target="_blank" class="aTubiao">
							<img src="../images/caigou/stjs.png" alt="" />
							<p class="name">
								受托结算单
							</p>
						</a>
					</div>
					<div class="jiantou">
					</div>
					<div class="tubiao" style="">
						<a href="#" target="_blank" class="aTubiao">
							<img src="../images/caigou/stsptj.png" alt="" />
							<p class="name">
								受托商品调价
							</p>
						</a>
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
	<script src="${basePath}/js/menuUI/jquery-1.12.4.min.js" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/menuUI/picLy.js" type="text/javascript" charset="utf-8"></script>
	<script>
		$(function(){
			getData('${basePath}/json/menuUI/caigou.json');
		});
	</script>
</html>