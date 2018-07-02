<%@page contentType="text/html"%>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!-- 
      storageLy.jsp
      <仓储>
      
      Created by LyNnJeR on 2017-01-20.
      Copyright 2017 LyNnJeR. All rights reserved.
 -->
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=9; IE=8; IE=7; IE=EDGE ; chrome=1" />
        <title>仓储</title>
         
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
							<img src="../images/cangchu/tjdbfh.png" alt="" />
							<p class="name">
								同价调拨发货单
							</p>
						</a>
					</div>
					<div class="jiantou">
					</div>
					<div class="tubiao">
						<a href="#" target="_blank" class="aTubiao">
							<img src="../images/cangchu/bjdtfh.png" alt="" />
							<p class="name">
								变价调拨发货单
							</p>
						</a>
					</div>
					<div class="jiantou">
					</div>
					<div class="tubiao">
						<a href="#" target="_blank" class="aTubiao">
							<img src="../images/cangchu/dbjsqr.png" alt="" />
							<p class="name">
								调拨接收确认
							</p>
						</a>
					</div>
					<div class="jiantou">
					</div>
					<div class="tubiao" style="">
						<a href="#" target="_blank" class="aTubiao">
							<img src="../images/cangchu/ykd.png" alt="" />
							<p class="name">
								移库单
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
							<img src="../images/cangchu/qtrk.png" alt="" />
							<p class="name">
								其它入库单
							</p>
						</a>
					</div>
					<div class="jiantou">
					</div>
					<div class="tubiao">
						<a href="#" target="_blank" class="aTubiao">
							<img src="../images/cangchu/qtck.png" alt="" />
							<p class="name">
								其它出库单
							</p>
						</a>
					</div>
					<div class="jiantou"></div>
					<div class="tubiao">
						<a href="#" target="_blank" class="aTubiao">
							<img src="../images/cangchu/jrgl.png" alt="" />
							<p class="name">
								借入管理
							</p>
						</a>
					</div>
					<div class="jiantou">
					</div>
					<div class="tubiao" style="">
						<a href="#" target="_blank" class="aTubiao">
							<img src="../images/cangchu/jcgl.png" alt="" />
							<p class="name">
								借出管理
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
							<img src="../images/cangchu/cbtz.png" alt="" />
							<p class="name">
								成本调整单
							</p>
						</a>
					</div>
					<div class="jiantou">
					</div>
					<div class="tubiao">
						<a href="#" target="_blank" class="aTubiao">
							<img src="../images/cangchu/chbg.png" alt="" />
							<p class="name">
								串号变更单
							</p>
						</a>
					</div>
					<div class="jiantou">
					</div>
					<div class="tubiao">
						<a href="#" target="_blank" class="aTubiao">
							<img src="../images/cangchu/pdgl.png" alt="" />
							<p class="name">
								盘点管理
							</p>
						</a>
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
			getData('${basePath}/json/menuUI/cangchu.json');
		});
	</script>
</html>