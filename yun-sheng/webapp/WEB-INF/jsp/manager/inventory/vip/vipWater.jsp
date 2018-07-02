<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" %>
<jsp:include page="../../inventoryInclude/head.jsp"/>
<link rel="stylesheet" href="${basePath}/css/inventory/finance/businessProcess/voucherManagement.css?v=${version}">
<link rel="stylesheet" href="${basePath}/css/inventory/vip/vipCard.css?v=${version}">
<script src="${basePath}/js/inventory/vip/vipWater.js?v=${version}"></script>

<title>积分流水</title>
<style>
	.form-inline>.form-group{
		height: 34px;
	}
	.info{
		height: 20px;
	}
</style>
</head>
<body>
<header>
	<div class="none" id="MENU_CODE">JFTZ</div>
	<div id="AUTH" class="none" data-code="JFTZ"></div>
	<div class="form-inline clearfix">
		<div class="form-group col-sm-3">
			<label class="width-25 info"></label>
			<div class="input-group col-sm-8 wbox">
				<input type="text" class="form-control" id="vipInfo" placeholder="客户姓名、电话、卡号"/>
			</div>
		</div>
		<div class="form-group col-sm-1 vipnone"></div>
		<div class="form-group col-sm-9"></div>
		<div class="form-group col-sm-3" style="padding-left: 4%">
			<button type="button" class="btn B_JFTZ_0005 none" id="search">查询</button>
		</div>
	</div>
</header>

<div id="promptBox">
	<div class="checkImgBox">
		<img src="${basePath}/images/inventory/common/checkImg.png"/>
		<h2>输入条件后,点击查询吧!</h2>
	</div>
	<%--<div class="explainImgBox" style="background:url('${basePath}/images/inventory/common/explain.png') no-repeat center center;background-size:contain;">--%>
	<%--1、对零售业务涉及到的“运营商业务”数据进行汇总，并提供多种系统预置方案</br>--%>
	<%--</div>--%>

</div>

<div class="loadingImgBox none"
	 style="background:url('${basePath}/images/inventory/common/loading.gif') no-repeat center center;background-size:contain;"></div>
<div class="notFounImgBox none">
	<img src="${basePath}/images/inventory/common/notFoun.png" alt="">
</div>

<div id="rpContainer">
	<div class="navBtn">
		<button type="button" class="btn btn-default B_JFTZ_0004 none" id="export">导出</button>
		<%--<button type="button" class="btn" id="">列设置</button>--%>
	</div>

	<div class="gridwarp">
		<table id="rpGrid"></table>
		<div id="rpGridPager"></div>
	</div>
</div>

</body>
</html>