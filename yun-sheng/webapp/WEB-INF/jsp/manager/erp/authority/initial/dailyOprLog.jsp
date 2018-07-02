<!-- 
      record.html
      <日结操作记录表>
      
      Created by LyNnJeR on 2016-09-26 Monday.
      Copyright 2016 LyNnJeR. All rights reserved.
 -->
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
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
		<link rel="stylesheet" type="text/css" href="${basePath}/html/muti_select/multi.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="${basePath}/css/admin/company/total.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/market/public.css?v=${version}" />
		
		<title>日结操作记录表</title>
		
	</head>

	<body >

		<!-------------------------------------主页面开始----------------------------------------->
			<div class="well">
			<div class="btn-group btnHundred" role="group" >
			<!--<button type="button" class="btn btn-default" data-eventname="add" data-toggle="modal" data-target="#myModal">日结/反日结</button>-->
			  <!--<button type="button" class="btn btn-default" data-eventname="update"><a href='stock.html'>历史库存</a></button>-->	
			  <!--<button type="button" class="btn btn-default btnDeleteRow" data-eventname="delete">删除</button>	
			  <button type="button" class="btn btn-default qiyon" data-eventname='qiyon'>启用</button>
			  <button type="button" class="btn btn-default jinyon" data-eventname="jinyon">禁用</button>-->
			  <%--<button type="button" class="btn btn-default" data-eventname="printbtn">导出</button>
			  --%><button type="button" class="btn btn-default" data-eventname="printbtn">打印</button>
			  <!-- <button type="button" class="btn btn-default" onclick="toDaily()">返回</button> -->
			  <!--<button type="button" class="btn btn-default" data-eventname="printbtn"><a href='record.html'>日结操作记录表</a></button>-->
			</div>
			
			<!-------------------------------------搜索条件开始----------------------------------------->
			<form id="inquire_option">
				<div class="inputbox container-fluid clearfix">
					<div class="row">
						<div class="Zpercent form-group">
							<span for="" class="box_text2">开始日期：</span><div class="col-sm-8">
								<div class="input-group"><input type="text" class="form-control2" id="startTimeString" name="startTimeString" placeholder="年-月-日"  /></div></div>
						</div>
						<div class="Zpercent form-group">
							<span for="" class="box_text2">结束日期：</span><div class="col-sm-8">
								<div class="input-group"><input type="text" class="form-control2" id="endTimeString" name="endTimeString" placeholder="年-月-日"  /></div></div>
						</div>
						<div class="Zpercent form-group">
							<span for="" class="box_text2">部门名称：</span><div class="col-sm-8">
								<div class="input-group"><input type="text" id="selDepName" class="form-control2 areaSearch"  placeholder="" onblur='checkInput.checkNotChars(this,32);' /></div></div>
						</div>
						<div class="Zpercent form-group">
							 <button type="button" class="btn btn-success " onclick="queryTdailyOprLog()">查询</button>
						</div>
					</div>
				 </div>
			</form>
		</div>
			<!-------------------------------------表格开始----------------------------------------->
			<div class="tablebox retailDetailTable">
				
				<div class="grid-wrap" style="margin-top:10px">
					<table id="jqGrid_blocMessage" class="zxsaastable">
					</table>
					<div id="jqGridPager"></div>
				</div>
			</div>
			<!-------------------------------------表格结束----------------------------------------->
		</form>
		
		<!-------------------------------------主页面结束----------------------------------------->
		
	</body>
	<script src="${basePath}/js/jquery-1.12.4.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script type="text/javascript" src="${basePath}/js/base.js?v=${version}"></script>
	<script src="${basePath}/js/jquery-form.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/bootstrap.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/jquery.jqGrid.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<!--<script src="${basePath}/js/grid.treegrid.js?v=${version}" type="text/javascript" charset="UTF-8"></script>-->
	<script src="${basePath}/js/jquery.datetimepicker.full.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/grid.locale-cn.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/commonjs/xm.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/zxsaas_plus.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/erp/authority/initial/dailyOprLog.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/erp/authority/initial/model-initial.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/commonjs/xr.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/commonjs/xm.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/cw/jquery.ztree.all-3.5.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/html/muti_select/MultiSelectDropList.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/cw/bootstrap/js/validator-company.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script type="text/javascript">
	var basePath = "${basePath}";
	var initialObj = null;
	</script>
</html>


