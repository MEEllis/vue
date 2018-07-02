<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%> 
<!DOCTYPE html>
	<head>
		<meta charset="utf-8" />
		<meta name="renderer" content="webkit" />
		<meta http-equiv="X-UA-Compatible" content="IE=9; IE=8; IE=7; IE=EDGE ; chrome=1" />
		<link rel="stylesheet" type="text/css" href="${basePath}/css/base.css"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/bootstrap.css" />
		<link rel="stylesheet" type="text/css" href="${basePath}/css/jquery-ui.css" />
		<link rel="stylesheet" type="text/css" href="${basePath}/js/skins/all.css" />
		<link rel="stylesheet" type="text/css" href="${basePath}/css/animate.css"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/bootstrap-select.css"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/font-awesome.min.css"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/iconfont.css"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/pagecss/treepage.css"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/jquery.datetimepicker.css"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/ui.jqgrid-bootstrap.css"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/table.css"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/zxsaas_plus.css"/>
		<script src="${basePath}/js/jquery-1.12.4.min.js" type="text/javascript" charset="utf-8"></script>
		<script src="${basePath}/js/bootstrap.min.js" type="text/javascript" charset="utf-8"></script>
		<script src="${basePath}/js/jquery.jqGrid.min.js" type="text/javascript" charset="utf-8"></script>
		<script src="${basePath}/js/jquery.datetimepicker.full.js" type="text/javascript" charset="utf-8"></script>
		<script src="${basePath}/js/grid.locale-cn.js" type="text/javascript" charset="utf-8"></script>		
		<script src="${basePath}/js/commonjs/xm.js" type="text/javascript" charset="utf-8"></script>
		<script src="${basePath}/js/zxsaas_plus.js" type="text/javascript" charset="utf-8"></script>
		<script src="${basePath}/js/strk/strkSearch.js" type="text/javascript" charset="utf-8"></script>
		<title></title>
		<script type="text/javascript">
			$(function(){
				loadmodal();
			})
		</script>
		<style type="text/css">
			.ui-th-ltr{text-align:center;}
		</style>
	</head>

	<body >

		<!-------------------------------------主页面开始----------------------------------------->
		<form class="form">
			<div class="btnbox  clearfix" >
				</div>
			<div class="searchbox ">
				
				<!-------------------------------------搜索条件开始----------------------------------------->
			<form id="inquire_option">
				<div class="inputbox container-fluid clearfix">
					<div class="row">
						<div class="col-xs-3 ">
							<span class="box_text">开始日期：</span><span class="box_input"><input type="text" name="beginDate" id="" value="" placeholder="请选择开始日期" class="form-control" /></span>
						</div>
						<div class="col-xs-3">
							<span class="box_text">供应商：</span><span class="box_input"><input type="text" name="contactsunitId" id="" value="" placeholder="请选择供应商" class="form-control" /></span>
						</div>
						<div class="col-xs-3">
							<span class="box_text">单据状态：</span><span class="box_input"><input type="text" name="billsStatus" id="" value="" placeholder="请选择单据状态" class="form-control" /></span>
						</div>
						<div class="col-xs-3">
							<span class="box_text">部门名称：</span><span class="box_input"><input type="text" name="sectionId" id="" value="" placeholder="请选择部门" class="form-control" /></span>
						</div>
					</div>
					<div class="row">
						<div class="col-xs-3">
							<span class="box_text">结束日期：</span><span class="box_input"><input type="text" name="endDate" id="" value="" placeholder="请选择结束日期" class="form-control" /></span>
						</div>
						<div class="col-xs-3">
							<span class="box_text">入库员：</span><span class="box_input"><input type="text" name="managersUid" id="" value="" placeholder="请选择采购员" class="form-control" /></span>
						</div>
						<div class="col-xs-3">
							<span class="box_text">单据编号：</span><span class="box_input"><input type="text" name="billsCode" id="" value="" placeholder="请输入单据编号" class="form-control" /></span>
						</div>
						<div class="col-xs-3">
							<span class="box_text">单备注：</span><span class="box_input"><input type="text" name="remark" id="" value="" placeholder="请输入单备注" class="form-control" /></span>
						</div>
					</div>
				</div>
			</div>
			 </form>
			<!-------------------------------------搜索条件结束----------------------------------------->
			<!-------------------------------------表格开始----------------------------------------->
			<div class="tablebox retailDetailTable">
				<div class="grid-wrap" style="margin-top:10px">
					<table id="jqGrid_strk" class="zxsaastable">
					</table>
					<div id="jqGridPager"></div>
				</div>
			</div>

			<div class="contextMenu row" id="contextMenu" style="display:none;">
				<ul>
					<li id="rightClickFrozenCol">
						<span class="glyphicon glyphicon-pencil" style="float:left"></span>
						<span style="font-size:100%; font-family:Verdana;margin-left:10px;">冻结到此列</span><br />
					</li>
					<li id="hidenthiscol">
						<span style="font-size:100%;font-family: verdana;margin-left:10px;">隐藏此列</span>
					</li>
				</ul>
			</div>
			<!-------------------------------------表格结束----------------------------------------->
		</form>
		<!-------------------------------------主页面结束----------------------------------------->
		
	</body>
</html>