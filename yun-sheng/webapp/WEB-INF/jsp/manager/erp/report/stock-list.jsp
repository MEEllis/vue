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
		<link rel="stylesheet" type="text/css" href="../../css/form/store.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="../../css/market/public.css?v=${version}" />
		<title>现存量查询</title>
	</head>

	<body>

		<!-------------------------------------主页面开始----------------------------------------->
			<div class="btn-group" role="group" >
			  <button type="button" class="btn btn-default derive" data-eventname="derive">导出</button>	
			  <button type="button" class="btn btn-default print" data-eventname="print" >打印</button>
			</div>
			<!-------------------------------------搜索条件开始----------------------------------------->
			<!--main开始-->
			<div >
				<div class="left" >
					<div class="left_tree">
						<ul id="metaDataTree" class="ztree"></ul>
						<input value=""  id="metaDataTreeId" type="hidden"/>
					</div>
				</div>
				<!--展示列表开始-->
				<div class="details">
					<div class="right">
						<div class="row rows">
							<div class="col-md-3"><span>商品名称<input type="text" id="goodsName"/></span><span class="colspan myTrade glyphicon glyphicon-plus" data-toggle="modal" data-target="#myTrade"></span></div>
							
						  <div class="col-xs-3 ">
							公司名称：<select name="companyName" id="companyName" ><option value=''>请选择</option></select>
						  </div>
						  
						  <div class="col-xs-3 ">
							部门名称：<select name="sectionName" id="sectionName" ><option value=''>请选择</option></select>
						  </div>
						<div class="col-md-3"><button type="button" class="btn btn-info" id="search">查询</button></div>
						</div>
						<div class="row">
							<div class="col-md-3">
								<span>查询类型<input class="radiol" type="radio" checked="checked" name="num" />串号 <input  class="radior" type="radio" name="num" id="ifNumTypeSearch"/>数量</span>
							</div>
						</div>
					</div>
					
					<div class="grid-title">现存量查询</div>
					
					<!--表格-->
					<div class="jqGrid_wrap radiol-warp">
						<table id="jqGrid_metaData" class="zxsaastable"></table> 
	    				<div id="jqGridPager"></div>
					</div>
					
					<div class="jqGrid_wrap radior-warp">
						<table id="jqGrid_metaDatas" class="zxsaastable"></table> 
	    				<div id="jqGridPagers"></div>
					</div>
				</div>
				<!--展示列表结束-->
			</div>
		<!--main结束-->

		<!-- 商品名称模态框（Modal） -->
		<div class="modal fade" id="myTrade" tabindex="-1" role="dialog" aria-labelledby="myTrade" aria-hidden="true" >
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							商品名称
						</h4>
					</div>
					
					<div class="modal-body" style="overflow: auto;">
						<div class="left-body">
							<ul id="myTradeTree" class="ztree"></ul>
						</div>
						
						<div class="right-body">
							<div class="jqGrid_wrap">
								<input type="text" id="goodsNameKeyWord"/>
								<table id="jqGrid_myTrade" class="zxsaastable"></table> 
		    					<div id="jqGridmyTrade"></div>
	    					</div>
	    				</div>
					</div>
					
					<div class="modal-footer">
						<button type="button" class="btn btn-w btn-info myTradeSave" >保存</button>
						<button type="button" class="btn btn-warning" data-dismiss="modal">取消</button>
					</div>
					
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>

		<!-- 表格模态框（Modal） -->
		<div class="modal fade" id="myModal" aria-labelledby="myModal" tabindex="-1" role="dialog" aria-hidden="true" >
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							数量明细
						</h4>
					</div>
					<div class="modal-body" >
						<div class="jqGrid_wrap" style="overflow: auto;">
						<table id="jqGrid_modal" class="zxsaastable"></table> 
	    				<div id="jqGridmodals"></div>
					</div>
					</div>
					
					<div class="modal-footer">
						<button type="button" class="btn btn-warning" data-dismiss="modal">关闭</button>
					</div>
					
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>
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
	
	<script src="../../js/erp/report/stock/stock-add.js?v=1.9231.2" type="text/javascript" charset="utf-8"></script>
	<script src="../../js/erp/report/stock/stock-search.js?v=1.53.2" type="text/javascript" charset="utf-8"></script>
</html>
