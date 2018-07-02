<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<meta name="renderer" content="webkit" />
		<meta http-equiv="X-UA-Compatible" content="IE=9; IE=8; IE=7; IE=EDGE ; chrome=1" />
		<link rel="stylesheet" type="text/css" href="../../css/base.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="../../css/bootstrap.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="../../css/jquery-ui.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="../../js/skins/all.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="../../css/animate.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="../../css/bootstrap-select.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="../../css/font-awesome.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="../../css/iconfont.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="../../css/pagecss/treepage.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="../../css/jquery.datetimepicker.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="../../css/ui.jqgrid-bootstrap.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="../../css/cw/zTreeStyle/zTreeStylePublicModel.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="../../css/form/bills.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="../../css/market/public.css?v=${version}" />
		<title>单据中心</title>
	</head>

	<body>

		<!-------------------------------------主页面开始----------------------------------------->
			<div class="btn-group" role="group" >
			<button type="button" class="btn btn-default change" data-eventname="check" id="check">联查</button>
			  <button type="button" class="btn btn-default derive" data-eventname="derive" data-toggle="modal" data-target="#myDerive">导出</button>	
			  <button type="button" class="btn btn-default print" data-eventname="print" >打印</button>
			  <button type="button" class="btn btn-default post" data-eventname="post" >红冲</button>
			  <button type="button" class="btn btn-default change" data-eventname="copy" id="copy">复制</button>
			  <button type="button" class="btn btn-default change" data-eventname="amend" id="update">修改</button>
			</div>
			<!-------------------------------------搜索条件开始----------------------------------------->
			<!--main开始-->
			<div >
				<div class="left">
					<div class="left_tree">
						<ul id="metaDataTree" class="ztree"></ul>
					</div>
				</div>
				<!--展示列表开始-->
				<div class="details">
					<div class="right">
					   <form id="searchForm">
						<div class="row">
						    <input id="billsTreeId" value="" type="hidden" name="billsType"/>
							<div class="col-md-3"><span>日期范围<select><option></option><option>今天</option><option>昨天</option><option>本周</option><option>上周</option><option>本月</option><option>上月</option><option>本年</option><option>上年</option></select></span></div>
							<div class="col-md-3"><span>开始日期<input id="beginTime"  name="beginTime" type="date" onClick="WdatePicker()" /></span></div>
							<div class="col-md-3"><span>结束日期<input id="endTime" name="endTime" type="date" onClick="WdatePicker()"/></span></div>
						<div class="col-xs-3 ">
							部门名称：<select name="sectionName" id="sectionName" onchange="changeDepartment();"><option value=''>请选择</option></select>
						</div>
						</div>
						<div class="row">
						  <div class="col-xs-3">
							  经手人:<select id="managersName"><option value=''>请选择</option></select>
						  </div>
						  <div class="col-xs-3 ">
							    往来单位： <select  name="contactUnitName" id="contactUnitName"><option value=''>请选择</option></select>
						  </div>
							<div class="col-md-3"><span>单据编号<input type="text" name="beginBillsCode"/></span></div>
							<div class="col-md-3"><span>到<input type="text" name="endBillsCode"/></span>&nbsp;&nbsp;&nbsp;&nbsp;<button type="button" class="btn btn-info" id="search">查询</button></div>
						</div>
					  </form>
					</div>
					
					<div class="grid-title">单据列表</div>
					
					<!--表格-->
					<div class="jqGrid_wrap">
						<table id="jqGrid_metaData" class="zxsaastable"></table> 
	    				<div id="jqGridPager"></div>
					</div>
				</div>
				<!--展示列表结束-->
			</div>
		<!--main结束-->
		
		<!-------------------------------------主页面结束----------------------------------------->
		
	</body>
	<script src="../../js/jquery-1.12.4.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="../../js/bootstrap.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="../../js/jquery.jqGrid.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="../../js/jquery.datetimepicker.full.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="../../js/grid.locale-cn.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="../../js/commonjs/xr.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="../../js/zxsaas_plus.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="../../js/cw/jquery.ztree.all-3.5.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="../../js/erp/report/bill/bill-search.js?v=1.632.3" type="text/javascript" charset="utf-8"></script>
	<script src="../../js/erp/report/bill/bill-hideColumn.js?v=${version}" type="text/javascript" charset="utf-8"></script>
</html>


