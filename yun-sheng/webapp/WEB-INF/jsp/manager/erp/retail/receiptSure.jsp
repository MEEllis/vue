<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%> 
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<meta name="renderer" content="webkit" />
		<meta http-equiv="X-UA-Compatible" content="IE=9; IE=8; IE=7; IE=EDGE ; chrome=1" />
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
		<link rel="stylesheet" type="text/css" href="${basePath}/css/businessManage/receiptSure.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="${basePath}/css/market/public.css?v=${version}" />
		<title>收款确认</title>
		<style>
			.none{
				display: none;
			}
		</style>
	</head>
	<body>
		<div class="well">
			<div class="none" id="MENU_CODE">SKQR</div>
			<div id="AUTH" data-code="SKQR" class="btn-group btnHundred" role="group" >
				<button type="button" class="btn btn-default save B_SKQR_0001 none">确认接收</button>
			</div>
			
			<!--搜索的输入框-->
						<!-------------------------------------搜索条件开始----------------------------------------->
			<form id="inquire_option" class="form-inline" style="padding:1% 0;">
				<!--第一行-->
				 <div class="form-group col-sm-3">
				    <label for="retailCardNum" class="width-25">交款日期:</label>
				    <div class="input-group col-sm-4">
				      <input type="text" class="form-control" name="startDate" id="startDate" >
				    </div>	
				    --
				    <div class="input-group col-sm-4">
				      <input type="text" class="form-control" id="endDate" >
				    </div>	
			    </div>
			    
			     <div class="form-group col-sm-3">
				    <label for="retailCardNum" class="width-25">交款门店:</label>
				    <div class="input-group col-sm-8">
				      <input type="text" class="form-control" id="storeInput">
				    </div>	
			    </div>
			    
				 <div class="form-group col-sm-3">
				    <label for="retailCardNum" class="width-25">交款人:</label>
				    <div class="input-group col-sm-8">
				      <input type="text" class="form-control" id="saleManInput">
				    </div>	
			    </div>
			    
			     <div class="form-group col-sm-3">
				   
				    <div class="input-group col-sm-5">
				      <input type="checkbox"  id="ifSure">
				      	已确认数据
				    </div>	
				    <button type="button" class="btn btn-primary mr15 B_SKQR_0002 none" id="search">查询</button>
				    <button type="button" class="btn btn-primary reset">重置</button>
					
			    </div>
				<div style="clear:both;"></div>
				
				<div class='row' style="text-align:center;">
					
				</div>
			</form>
		</div>
		
		
		<div class="tableWrap">
			<table id="mainGrid" class="zxsaastable"></table>
		</div>
	</body>
	<script src="${basePath}/js/jquery-1.12.4.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/bootstrap.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/jquery.jqGrid.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/jquery.datetimepicker.full.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/grid.locale-cn.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/commonjs/xm.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/zxsaas_plus.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/cw/jquery.ztree.all-3.5.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/html/muti_select/MultiSelectDropList.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/select2.full.js?v=${version}" type="text/javascript" charset="utf-8"></script>
    <script src="${basePath}/js/commonjs/xr.js?v=${version}" type="text/javascript" charset="utf-8"></script>
    <script src="${basePath}/js/base.js?v=${version}"></script>
	<script type="text/javascript" src="${basePath}/js/businessManage/receiptSure.js?v=${version}"></script>
	<!-- 验证 -->
	<script src="${basePath}/js/cw/bootstrap/js/validator-company.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<!-- 菜单权限验证 -->
	<script type="text/javascript" src="${basePath}/js/erp/authority/menuValidation.js?v=${version}"></script>
</html>