<%@page contentType="text/html"%>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!-- 
      basisLy.jsp
      <基础设施>
      
      Created by LyNnJeR on 2017-01-20.
      Copyright 2017 LyNnJeR. All rights reserved.
 -->
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=9; IE=8; IE=7; IE=EDGE ; chrome=1" />
        <title>基础设施</title>
  ath%>">
    </head>
    <link rel="stylesheet" href="${basePath}/css/menuUI/picLy.css" media="screen" type="text/css" />
	<link rel="stylesheet" type="text/css" href="${basePath}/css/bootstrap.css"/>
	<style type="text/css">
		.leftClazz {width: 160px;float: left;margin-top: 80px;font-weight: 800;font-size: 16px;}
		.leftClazz div {height: 80px;line-height: 80px;text-align: right;}
		.picLeft {margin-left: 0px;}
	</style>
    <script type="text/javascript">
		var basePath = "${basePath}";
	</script>
    <body>
		<div class="wrap">
			<div class="leftClazz">
				<div class="cw">财务类：</div>
				<div class="cw"></div>
				<div class="zz">组织架构类：</div>
				<div class="cw"></div>
				<div class="da">档案类：</div>
				<div class="cw"></div>
				<div class="qx">权限类：</div>
			</div>
			<div class="picLeft">
				<div class="first">
					<div class="tubiao">
						<a href="#" target="_blank" class="aTubiao">
							<img src="../images/jichu/jtkjkm.png" alt="" />
							<p class="name">
								集团会计科目
							</p>
						</a>
					</div>
					<div class="jiantou">
					</div>
					<div class="tubiao">
						<a href="#" target="_blank" class="aTubiao">
							<img src="../images/jichu/gskjkmpng.png" alt="" />
							<p class="name">
								公司会计科目
							</p>
						</a>
					</div>
					<div class="jiantou">
					</div>
					<div class="tubiao">
						<a href="#" target="_blank" class="aTubiao">
							<img src="../images/jichu/xjllkm.png" alt="" />
							<p class="name">
								现金流量科目
							</p>
						</a>
					</div>
					<div class="jiantou">
					</div>
					<div class="tubiao" style="">
						<a href="#" target="_blank" class="aTubiao">
							<img src="../images/jichu/pzjkszpng.png" alt="" />
							<p class="name">
								凭证接口设置
							</p>
						</a>
					</div>
					<div class="jiantou">
					</div>
					<div class="tubiao" style="">
						<a href="#" target="_blank" class="aTubiao">
							<img src="../images/jichu/rjcz.png" alt="" />
							<p class="name">
								日结操作
							</p>
						</a>
					</div>
				</div>
				<div class="second">
					<div class="tubiao"></div>
				</div>
				<div class="third">
					<div class="tubiao">
						<a href="#" target="_blank" class="aTubiao">
							<img src="../images/jichu/gsxx.png" alt="" />
							<p class="name">
								公司信息
							</p>
						</a>
					</div>
					<div class="jiantou">
					</div>
					<div class="tubiao">
						<a href="#" target="_blank" class="aTubiao">
							<img src="../images/jichu/bmxx.png" alt="" />
							<p class="name">
								部门信息
							</p>
						</a>
					</div>
					<div class="jiantou"></div>
					<div class="tubiao">
						<a href="#" target="_blank" class="aTubiao">
							<img src="../images/jichu/ckxx.png" alt="" />
							<p class="name">
								仓库信息
							</p>
						</a>
					</div>
					<div class="jiantou">
					</div>
					<div class="tubiao" style="">
						<a href="#" target="_blank" class="aTubiao">
							<img src="../images/jichu/zwxx.png" alt="" />
							<p class="name">
								职位信息
							</p>
						</a>
					</div>
					<div class="jiantou">
					</div>
					<div class="tubiao" style="">
						<a href="#" target="_blank" class="aTubiao">
							<img src="../images/jichu/gscssz.png" alt="" />
							<p class="name">
								公司参数设置
							</p>
						</a>
					</div>
				</div>
				<div class="four">
					<div class="tubiao"></div>
				</div>
				<div class="five">
					<div class="tubiao">
						<a href="#" target="_blank" class="aTubiao">
							<img src="../images/jichu/spda.png" alt="" />
							<p class="name">
								商品档案
							</p>
						</a>
					</div>
					<div class="jiantou">
					</div>
					<div class="tubiao">
						<a href="#" target="_blank" class="aTubiao">
							<img src="../images/jichu/ygda.png" alt="" />
							<p class="name">
								员工档案
							</p>
						</a>
					</div>
					<div class="jiantou">
					</div>
					<div class="tubiao">
						<a href="#" target="_blank" class="aTubiao">
							<img src="../images/jichu/wldw.png" alt="" />
							<p class="name">
								往来单位
							</p>
						</a>
					</div>
					<div class="jiantou">
					</div>
					<div class="tubiao">
						<a href="#" target="_blank" class="aTubiao">
							<img src="../images/jichu/zjzh.png" alt="" />
							<p class="name">
								资金账户
							</p>
						</a>
					</div>
					<div class="jiantou">
					</div>
					<div class="tubiao">
						<a href="#" target="_blank" class="aTubiao">
							<img src="../images/money/bjfl.png" alt="" />
							<p class="name">
								其它
							</p>
						</a>
						<div class="btn-group">
					    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
					     		<!-- 标题 -->
					      <span class="caret"></span>
					    </button>
					    <ul class="dropdown-menu" role="menu">
					      <li><a href="#">分期商酬金</a></li>
					      <li><a href="#">运营商业务档案</a></li>
					      <li><a href="#">第三方券管理</a></li>
					      <li><a href="#">收支类别管理</a></li>
					      <li><a href="#">售后维修项目</a></li>
					      <li><a href="#">出入库方式</a></li>
					      <li><a href="#">成本调整原因</a></li>
					    </ul>
						</div>
					</div>
				</div>
				<div class="six">
					<div class="tubiao"></div>
				</div>
				<div class="seven">
					<div class="tubiao">
						<a href="#" target="_blank" class="aTubiao">
							<img src="../images/jichu/jsgl.png" alt="" />
							<p class="name">
								角色管理
							</p>
						</a>
					</div>
					<div class="jiantou">
					</div>
					<div class="tubiao">
						<a href="#" target="_blank" class="aTubiao">
							<img src="../images/jichu/bmsq.png" alt="" />
							<p class="name">
								部门授权
							</p>
						</a>
					</div>
					<div class="jiantou">
					</div>
					<div class="tubiao">
						<a href="#" target="_blank" class="aTubiao">
							<img src="../images/jichu/ckxx.png" alt="" />
							<p class="name">
								仓库授权
							</p>
						</a>
					</div>
					<div class="jiantou">
					</div>
					<div class="tubiao">
						<a href="#" target="_blank" class="aTubiao">
							<img src="../images/jichu/wldwsq.png" alt="" />
							<p class="name">
								往来单位授权
							</p>
						</a>
					</div>
					<div class="jiantou">
					</div>
					<div class="tubiao">
						<a href="#" target="_blank" class="aTubiao">
							<img src="../images/jichu/ygsq.png" alt="" />
							<p class="name">
								员工授权
							</p>
						</a>
					</div>
				</div>
			</div>
		</div>
	</body>
	<script src="${basePath}/js/menuUI/jquery-1.12.4.min.js" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/menuUI/picLy.js" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/menuUI/bootstrap.min.js" type="text/javascript" charset="utf-8"></script>
</html>