<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%> 
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<title>条码管理</title>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/base.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/bootstrap.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="${basePath}/css/jquery-ui.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="${basePath}/js/skins/all.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="${basePath}/css/animate.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/bootstrap-select.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/font-awesome.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/iconfont.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/pagecss/treepage.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/jquery.datetimepicker.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/ui.jqgrid-bootstrap.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/cw/zTreeStyle/zTreeStylePublicModel.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/priceManage/priceManage.css?v=${version}"/>
	</head>
	<body>
	<div class="content">
		<div id="AUTH" data-code="TMGL" class="btn-group btnHundred" role="btn-group">
			  <button type="button" class="btn modify" data-eventname="delete" >修改</button>	
			   <button type="button" class="btn save" data-eventname="delete" >保存</button>			
			   <button type="button" class="btn "  onclick="exportCode()" >导出选中项</button>			
			   <button type="button" class="btn " onclick="exportAllCode()" >导出全部</button>	
			   <button type="button" class="btn btn-default" onclick="window.parent.openWorkBoxByMenutext('条码导入','${basePath}/beginning/goodsalias/toPage');">导入</button>	  			  			  			  
		</div>
		<div class="top">
			
			<input type="hidden" id="groupId" value="${groupId}"/>
			<!-- 修改的头部 -->
			<div class="Zpercent">
					快速过滤：<input type="text" id="selectQuery" placeholder="请输入商品编码、名称、条码"  style="width:200px;min-width:200px;font-size:0.5em;height:30px;"/> 
					<button type="button" class="btn btn-success selectBtn" >查询</button>
				
			</div>
		</div>
		<!--底部的树和表格-->
		<div class="center">
				<div class="centerL">
				<p>商品分类</p>
				<ul id="goodsClassify" class="ztree"></ul>
			    </div>
			   <div class="centerR">
							<div class="GridWrap" style="overflow:auto;">
							<table id="mainGrid" class="zxsaastable" style="overflow:hidden;"></table>
							<div id="mainPager"></div>
							</div>
			    </div>
         </div>
         
         	
	</div>
		
	</body>
		<script src="${basePath}/js/jquery-1.12.4.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
		<script type="text/javascript" src="${basePath}/js/base.js?v=${version}"></script>
		<script src="${basePath}/js/bootstrap.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
		<script src="${basePath}/js/jquery.jqGrid.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
		<script src="${basePath}/js/jquery.datetimepicker.full.js?v=${version}" type="text/javascript" charset="utf-8"></script>
		<script src="${basePath}/js/grid.locale-cn.js?v=${version}" type="text/javascript" charset="utf-8"></script>
		<script src="${basePath}/js/commonjs/xm.js?v=${version}" type="text/javascript" charset="utf-8"></script>
		<script src="${basePath}/js/zxsaas_plus.js?v=${version}" type="text/javascript" charset="utf-8"></script>
		<script type="text/javascript" src="${basePath}/js/cw/jquery.ztree.all-3.5.min.js?v=${version}"></script>
		<script src="${basePath}/js/cw/bootstrap/js/validator-lynnjer.js?v=${version}" type="text/javascript" charset="utf-8"></script>
		<script src="${basePath}/js/erp/authority/initial/barcode.js?v=${version}" type="text/javascript" charset="utf-8"></script>
		<!-- 菜单权限验证 -->
		<script type="text/javascript" src="${basePath}/js/erp/authority/menuValidation.js?v=${version}"></script>
</html>