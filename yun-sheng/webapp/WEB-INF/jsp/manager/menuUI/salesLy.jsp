<%@page contentType="text/html"%>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!-- 
      salesLy.jsp
      <销售>
      
      Created by LyNnJeR on 2017-01-20.
      Copyright 2017 LyNnJeR. All rights reserved.
 -->
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=9; IE=8; IE=7; IE=EDGE ; chrome=1" />
        <title>销售</title>
         
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
							<img src="../images/xiaoshou/xsdd.png" alt="" />
							<p class="name">
								销售订单
							</p>
						</a>
					</div>
					<div class="jiantou">
						<img src="../images/caigou/dhr.png" alt="" />
					</div>
					<div class="tubiao">
						<a href="#" target="_blank" class="aTubiao">
							<img src="../images/xiaoshou/xsd.png" alt="" />
							<p class="name">
								销售单
							</p>
						</a>
					</div>
					<div class="jiantou">
						<img src="../images/caigou/dhr.png" alt="" />
					</div>
					<div class="tubiao">
						<a href="#" target="_blank" class="aTubiao">
							<img src="../images/xiaoshou/xsth .png" alt="" />
							<p class="name">
								销售退货单
							</p>
						</a>
					</div>
					<div class="jiantou">
					</div>
					<div class="tubiao" style="">
						<a href="#" target="_blank" class="aTubiao">
							<img src="../images/xiaoshou/skd.png" alt="" />
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
					<div class="tubiao">
						<a href="#" target="_blank" class="aTubiao">
							<img src="../images/xiaoshou/spjggl.png" alt="" />
							<p class="name">
								商品价格管理
							</p>
						</a>
					</div>
					<div class="jiantou">
					</div>
					<div class="tubiao">
						<a href="#" target="_blank" class="aTubiao">
							<img src="../images/xiaoshou/cxgl.png" alt="" />
							<p class="name">
								促销管理
							</p>
						</a>
					</div>
					<div class="jiantou"></div>
					<div class="tubiao">
						<a href="#" target="_blank" class="aTubiao">
							<img src="../images/xiaoshou/xshh.png" alt="" />
							<p class="name">
								销售换货单
							</p>
						</a>
					</div>
					<div class="jiantou">
					</div>
					<div class="tubiao" style="">
						<a href="#" target="_blank" class="aTubiao">
							<img src="../images/xiaoshou/fkd.png" alt="" />
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
							<img src="../images/xiaoshou/wtck.png" alt="" />
							<p class="name">
								委托出库单
							</p>
						</a>
					</div>
					<div class="jiantou">
						<img src="../images/caigou/dhr.png" alt="" />
					</div>
					<div class="tubiao">
						<a href="#" target="_blank" class="aTubiao">
							<img src="../images/xiaoshou/wtth.png" alt="" />
							<p class="name">
								委托退货单
							</p>
						</a>
					</div>
					<div class="jiantou">
						<img src="../images/caigou/dhr.png" alt="" />
					</div>
					<div class="tubiao">
						<a href="#" target="_blank" class="aTubiao">
							<img src="../images/xiaoshou/wtjs.png" alt="" />
							<p class="name">
								委托结算单
							</p>
						</a>
					</div>
					<div class="jiantou">
					</div>
					<div class="tubiao" style="">
						<a href="#" target="_blank" class="aTubiao">
							<img src="../images/xiaoshou/stsptj.png" alt="" />
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
			getData('${basePath}/json/menuUI/xiaoshou.json');
		});
	</script>
</html>