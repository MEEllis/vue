<%@page contentType="text/html"%>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!-- 
      moneyLy.jsp
      <资金往来>
      
      Created by LyNnJeR on 2017-01-20.
      Copyright 2017 LyNnJeR. All rights reserved.
 -->
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=9; IE=8; IE=7; IE=EDGE ; chrome=1" />
        <title>资金往来</title>
         
    </head>
    <link rel="stylesheet" href="${basePath}/css/menuUI/picLy.css" media="screen" type="text/css" />
	<link rel="stylesheet" type="text/css" href="${basePath}/css/bootstrap.css"/>
    <script type="text/javascript">
		var basePath = "${basePath}";
	</script>
    <body>
		<div class="wrap">
			<div class="picLeft">
				<div class="first">
					<div class="tubiao">
						<a href="#" target="_blank" class="aTubiao">
							<img src="../images/money/nbzz.png" alt="" />
							<p class="name">
								内部转账
							</p>
						</a>
					</div>
					<div class="jiantou">
					</div>
					<div class="tubiao">
						<a href="#" target="_blank" class="aTubiao">
							<img src="../images/money/fkgl.png" alt="" />
							<p class="name">
								付款管理
							</p>
						</a>
						<div class="btn-group">
					    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
					     		<!-- 标题 -->
					      <span class="caret"></span>
					    </button>
					    <ul class="dropdown-menu" role="menu">
					      <li><a href="#">付款单</a></li>
					      <li><a href="#">预付款单</a></li>
					      <li><a href="#">其他付款单</a></li>
					    </ul>
						</div>
					</div>
					<div class="jiantou">
					</div>
					<div class="tubiao">
						<a href="#" target="_blank" class="aTubiao">
							<img src="../images/money/skgl.png" alt="" />
							<p class="name">
								收款管理
							</p>
						</a>
						<div class="btn-group">
					    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
					     		<!-- 标题 -->
					      <span class="caret"></span>
					    </button>
					    <ul class="dropdown-menu" role="menu">
					      <li><a href="#">收款单</a></li>
					      <li><a href="#">预收款单</a></li>
					      <li><a href="#">其他收款单</a></li>
					    </ul>
						</div>
					</div>
					<div class="jiantou">
					</div>
					<div class="tubiao" style="">
						<a href="#" target="_blank" class="aTubiao">
							<img src="../images/money/rj.png" alt="" />
							<p class="name">
								日结
							</p>
						</a>
						<div class="btn-group">
					    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
					     		<!-- 标题 -->
					      <span class="caret"></span>
					    </button>
					    <ul class="dropdown-menu" role="menu">
					      <li><a href="#">日结</a></li>
					      <li><a href="#">反日结</a></li>
					      <li><a href="#">其他操作记录</a></li>
					    </ul>
						</div>
					</div>
				</div>
				<div class="second">
					<div class="tubiao"></div>
				</div>
				<div class="third">
					<div class="tubiao">
						<a href="#" target="_blank" class="aTubiao">
							<img src="../images/money/cwcl.png" alt="" />
							<p class="name">
								账务处理
							</p>
						</a>
						<div class="btn-group">
					    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
					     		<!-- 标题 -->
					      <span class="caret"></span>
					    </button>
					    <ul class="dropdown-menu" role="menu">
					      <li><a href="#">应付应收调整</a></li>
					      <li><a href="#">预付冲应付</a></li>
					      <li><a href="#">应付冲应付</a></li>
					      <li><a href="#">预收冲应收</a></li>
					      <li><a href="#">应收冲应收</a></li>
					      <li><a href="#">应收冲应付</a></li>
					    </ul>
						</div>
					</div>
					<div class="jiantou">
					</div>
					<div class="tubiao">
						<a href="#" target="_blank" class="aTubiao">
							<img src="../images/money/bjfl.png" alt="" />
							<p class="name">
								保价返利
							</p>
						</a>
						<div class="btn-group">
					    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
					     		<!-- 标题 -->
					      <span class="caret"></span>
					    </button>
					    <ul class="dropdown-menu" role="menu">
					      <li><a href="#">供应商保价单</a></li>
					      <li><a href="#">供应商返利单</a></li>
					      <li><a href="#">客户价保单</a></li>
					      <li><a href="#">客户返利单</a></li>
					    </ul>
						</div>
					</div>
					<div class="jiantou"></div>
					<div class="tubiao">
						<a href="#" target="_blank" class="aTubiao">
							<img src="../images/money/stcw.png" alt="" />
							<p class="name">
								受托账务
							</p>
						</a>
						<div class="btn-group">
					    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
					     		<!-- 标题 -->
					      <span class="caret"></span>
					    </button>
					    <ul class="dropdown-menu" role="menu">
					      <li><a href="#">受托商品调价单</a></li>
					      <li><a href="#">受托结算</a></li>
					      <li><a href="#">受托撤结</a></li>
					    </ul>
						</div>
					</div>
					<div class="jiantou">
					</div>
					<div class="tubiao" style="">
						<a href="#" target="_blank" class="aTubiao">
							<img src="../images/money/wtzw.png" alt="" />
							<p class="name">
								委托账务
							</p>
						</a>
						<div class="btn-group">
					    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
					     		<!-- 标题 -->
					      <span class="caret"></span>
					    </button>
					    <ul class="dropdown-menu" role="menu">
					      <li><a href="#">委托商品调价单</a></li>
					      <li><a href="#">委托结算</a></li>
					      <li><a href="#">委托撤结</a></li>
					    </ul>
						</div>
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
	<script src="${basePath}/js/menuUI/bootstrap.min.js" type="text/javascript" charset="utf-8"></script>
	<script>
		$(function(){
			getData('${basePath}/json/menuUI/money.json');
		});
	</script>
</html>