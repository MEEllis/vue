<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>执信ERP</title>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/base.css"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/bootstrap.css"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/font-awesome.min.css"/>
	    <link rel="stylesheet" type="text/css" href="${basePath}/css/iconfont.css"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/pagecss/main.css"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/pagecss/mainskin.css"/>
		<script src="${basePath}/js/jquery-1.12.4.min.js" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/bootstrap.min.js" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/pagejs/main.js" type="text/javascript" charset="utf-8"></script>
	</head>
	<body>
		<div class="headerbox">
			<div class="logo"><img src="${basePath}/images/logo2.png" /></div>
			<div class="menuAndSkin">
				<a class="menu"><i class="iconfont">&#xe612;</i></a>
				<a class="skin"><i class="iconfont">&#xe613;</i></a>
			</div>
			<div class="headerboxright">
				<a> <i class="iconfont">&#xe603;</i>
					<font>在线咨询</font>
				</a>
				<a class="noread"> <i class="iconfont">&#xe614;</i>
					<font>未读消息</font>
				</a>
				<a> <i class="iconfont">&#xe610;</i>
					<font>切换门店</font>
				</a>
				<a class="changepwd"> <i class="iconfont">&#xe611;</i>
					<font>修改密码</font>
				</a>
				<a class="luckscreen"> <i class="iconfont">&#xe615;</i>
					<font>锁屏</font>
				</a>
				<a class="exitbtn"> <i class="iconfont">&#xe609;</i>
					<font>用户退出</font>
				</a>
			</div>
		</div>
		<div class="bodybox">
			<div class="body_left">
				<div class="body_leftbg"></div>
				<div class="body_leftctn menulist">
					<div class="clearfix">
						<span class="usericon"><img src="${basePath}/images/nouser.jpg" /></span>
						<span class="userinfo">
						<span class="userrole">超级管理员</span>
						<span class="username">周杰伦</span>
						</span>
					</div>
					<ul>
					<!--<li>
						<a><i class="iconfont">&#xe615;</i>基础资料</a>
							<div>
								<a>系统设置</a>
							</div>
					</li>-->
					
					</ul>
				</div>
			</div>
			<div class="body_right">
				<div class="tabBox">
					<div class="indexShadow"></div>
			
				</div>
				<div class="workBox"></div>
			</div>
		</div>
	</body>
</html>
