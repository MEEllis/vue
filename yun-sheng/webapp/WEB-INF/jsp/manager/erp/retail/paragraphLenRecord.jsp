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
		<title>长短款记录</title>
	</head>
	<body>
		<div class="well">
			<div id="AUTH" data-code="YYJK" class="btn-group btnHundred" role="group" >
				<!-- <button type="button" class="btn btn-default">新增</button>
				<button type="button" class="btn btn-default ">查询</button> -->
				
				<div class="btn-group">
				    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
				     	收款确认
				      <span class="caret"></span>
				    </button>
				    <ul class="dropdown-menu" role="menu">
				      <li><a href="#">收款确认</a></li>
				      <li><a href="#">长、短款记录</a></li>
				    </ul>
				</div>
			  <button type="button" class="btn btn-default " >营业数据查询</button>	
				
			  <button type="button" class="btn btn-default " >账户收款查询</button>	
			   <button type="button" class="btn btn-default save">确定</button>	
			   <button type="button" class="btn btn-default ">打印</button>	
				
			  <button type="button" class="btn btn-default">导出</button>	
			
			</div>
			
			
			
			
			
			
			<!--搜索的输入框-->
						<!-------------------------------------搜索条件开始----------------------------------------->
			<form id="inquire_option" class="form-inline"  id="inquire_option">
				<!--第一行-->
				<div class="row changeMargin">
				<div class="form-group">
				    <label class="control-label" >交款日期：</label>
				    <input type="text" class="form-control dateInput" name="startDate">
				  </div>
				  <div class="form-group">
				    <label class="control-label" >—</label>
				    <input type="text" class="form-control dateInput" name="endDate">
				  </div>
				  
				  <div class="form-group">
						  <select class="form-control dateCtrl" style="width:196px;">
							 	    <option data-flag="today" selected>今天</option>
									<option data-flag="yesterday">昨天</option>
									<option data-flag="week">本周</option>
									<option data-flag="month">本月</option>
									<option data-flag="lastmonth">上月</option>
									<option data-flag="year">本年</option>
							</select>
				  </div>
				  <div class="form-group" style="padding-left:100px;">
				   				 <label class="control-label" style="letter-spacing: 4px;">门店：</label>
						   		    <select class="form-control md" style="width:196px;" name="sectionId">
									</select>
				  </div>
				  <div class="checkbox">
						  	<label class="checkbox-inline">
							  <input type="checkbox" id="inlineCheckbox1"  name="auditStatus" value="1"> 是否包含已确认数据
							</label>
				  </div>
				</div>
				<!--第一行结束-->
				<!--第二行开始-->
				<div class="row changeMargin">
				<div class="form-group">
				    <label class="control-label" >统计日期：</label>
				    <input type="text" class="form-control dateInput" name="tongJiDateStar">
				  </div>
				  <div class="form-group">
				    <label class="control-label" >—</label>
				    <input type="text" class="form-control dateInput"  name="tongJiDateEnd">
				  </div>
				  
				  <div class="form-group">
						  <select class="form-control dateCtrl" style="width:196px;">
							  <option data-flag="today" selected>今天</option>
									<option data-flag="yesterday">昨天</option>
									<option data-flag="week">本周</option>
									<option data-flag="month">本月</option>
									<option data-flag="lastmonth">上月</option>
									<option data-flag="year">本年</option>
							</select>
				  </div>
				  <div class="form-group" style="padding-left:100px;">
				   				 <label class="control-label" >交款人：</label>
						    		<select class="form-control jkr" style="width:196px;" name="paymentId">
									</select>
				  </div>
				  
				  <div class="btn-group-vertical">
				  	<button type="button" class="btn btn-primary btn-xs" id="search">查询</button>
				  </div>
				</div>
				<!--第二行结束-->
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
	<script type="text/javascript" src="${basePath}/js/businessManage/receiptRecord.js?v=${version}"></script>
	<!-- 菜单权限验证 -->
	<script type="text/javascript" src="${basePath}/js/erp/authority/menuValidation.js?v=${version}"></script>
</html>