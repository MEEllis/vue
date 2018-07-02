<%@page contentType="text/html"%>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!-- 
      priceLy.jsp
      <价格>
      
      Created by LyNnJeR on 2017-01-20.
      Copyright 2017 LyNnJeR. All rights reserved.
 -->
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=9; IE=8; IE=7; IE=EDGE ; chrome=1" />
        <title>价格</title>
         
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
							<img src="../images/jiage/jtzd.png" alt="" />
							<p class="name">
								集团指导价格单
							</p>
						</a>
					</div>
					<div class="jiantou">
					</div>
					<div class="tubiao">
						<a href="#" target="_blank" class="aTubiao">
							<img src="../images/jiage/spjggl.png" alt="" />
							<p class="name">
								商品价格管理
							</p>
						</a>
					</div>
					<div class="jiantou">
					</div>
					<div class="tubiao">
						<a href="#" target="_blank" class="aTubiao">
							<img src="../images/jiage/wldwls.png" alt="" />
							<p class="name">
								往来单位售价设置
							</p>
						</a>
					</div>
					<div class="jiantou">
					</div>
					<div class="tubiao" style="">
						<a href="#" target="_blank" class="aTubiao">
							<img src="../images/jiage/jgcl.png" alt="" />
							<p class="name">
								价格策略设置
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
							<img src="../images/jiage/spjgdr.png" alt="" />
							<p class="name">
								商品价格导入
							</p>
						</a>
					</div>
					<div class="jiantou">
					</div>
					<div class="tubiao">
					</div>
					<div class="jiantou"></div>
					<div class="tubiao">
					</div>
					<div class="jiantou">
					</div>
					<div class="tubiao" style="">
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
			getData('${basePath}/json/menuUI/jiage.json');
		});
	</script>
</html>