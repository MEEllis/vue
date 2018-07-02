<%@page contentType="text/html"%>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!-- 
      caiwuLy.jsp
      <财务管理>
      
      Created by LyNnJeR on 2017-01-20.
      Copyright 2017 LyNnJeR. All rights reserved.
 -->
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=9; IE=8; IE=7; IE=EDGE ; chrome=1" />
        <title>财务管理</title>
         
    </head>
    <link rel="stylesheet" href="${basePath}/css/menuUI/pic2Ly.css" media="screen" type="text/css" />
    <script type="text/javascript">
		var basePath = "${basePath}";
	</script>
    <body>
		<div class="wrap">
			<div class="picLeft">
				<div class="first">
					<div class="tubiao">
						<a href="#" target="_blank" class="aTubiao">
							<img src="../images/caiwu/tzpz.png" alt="" />
							<p class="name">
								填制凭证
							</p>
						</a>
					</div>
					<div class="jiantou">
					</div>
					<div class="tubiao">
						<a href="#" target="_blank" class="aTubiao">
							<img src="../images/caiwu/scpz.png" alt="" />
							<p class="name">
								生成凭证
							</p>
						</a>
					</div>
					<div class="jiantou">
					</div>
					<div class="tubiao">
					</div>
					<div class="lineL">
						<img src="../images/caiwu/lineL.png"/>
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
				</div>
				<div class="third">
					<div class="lineRB">
						<img src="../images/caiwu/lineRB.png"/>
					</div>
					<div class="tubiao">
						<a href="#" target="_blank" class="aTubiao">
							<img src="../images/caiwu/zgqz.png" alt="" />
							<p class="name">
								主管签字
							</p>
						</a>
					</div>
					<div class="jiantou"></div>
					<div class="tubiao">
						<a href="#" target="_blank" class="aTubiao">
							<img src="../images/caiwu/shpz.png" alt="" />
							<p class="name">
								审核凭证
							</p>
						</a>
					</div>
					<div class="jiantou"></div>
					<div class="tubiao">
						<a href="#" target="_blank" class="aTubiao">
							<img src="../images/caiwu/cnqz.png" alt="" />
							<p class="name">
								出纳签字
							</p>
						</a>
					</div>
					<div class="lineLB">
						<img src="../images/caiwu/lineLB.png"/>
					</div>
				</div>
				<div class="four">
					<div class="jiantou">
						<img src="../images/caigou/dhrl.png" alt="" />
					</div>
					<div class="jiantou"></div>
					<div class="jiantou">
						<img src="../images/caigou/dhr.png" alt="" />
					</div>
					<div class="jiantou"></div>
					<div class="jiantou"></div>
				</div>
				<div class="five">
					<div class="tubiao">
						<a href="#" target="_blank" class="aTubiao">
							<img src="../images/caiwu/syjz.png" alt="" />
							<p class="name">
								损益结转
							</p>
						</a>
					</div>
					<div class="jiantou">
					</div>
					<div class="tubiao">
						<a href="#" target="_blank" class="aTubiao">
							<img src="../images/caiwu/jz.png" alt="" />
							<p class="name">
								记账
							</p>
						</a>
					</div>
					<div class="jiantou">
					</div>
					<div class="tubiao">
					</div>
				</div>
				<div class="six">
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
						<a href="#" target="_blank" class="aTubiao">
							<img src="../images/caiwu/ymjs.png" alt="" />
							<p class="name">
								月末结算
							</p>
						</a>
					</div>
					<div class="jiantouV">
						<img src="../images/caigou/dhv.png" alt="" />
					</div>
					<div class="tubiao">
						<a href="#" target="_blank" class="aTubiao">
							<img src="../images/caiwu/cwbb.png" alt="" />
							<p class="name">
								财务报表
							</p>
						</a>
					</div>
					<div class="jiantou">
					</div>
					<div class="tubiao">
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
			getData('${basePath}/json/menuUI/caiwu.json');
		});
	</script>
</html>