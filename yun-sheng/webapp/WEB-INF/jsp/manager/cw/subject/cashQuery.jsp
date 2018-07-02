<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<html>
<head>
<meta charset="UTF-8">
		<title>现金流量明细</title>
		<meta charset="utf-8" />
		<meta name="renderer" content="webkit" />
		<meta http-equiv="X-UA-Compatible" content="IE=9; IE=8; IE=7; IE=EDGE ; chrome=1" />
		<link rel="stylesheet" type="text/css" href="../../css/base.css"/>
		<link rel="stylesheet" type="text/css" href="../../css/bootstrap.css" />
		<link rel="stylesheet" type="text/css" href="../../css/jquery-ui.css" />
		<link rel="stylesheet" type="text/css" href="../../js/skins/all.css" />
		<link rel="stylesheet" type="text/css" href="../../css/animate.css"/>
		<link rel="stylesheet" type="text/css" href="../../css/bootstrap-select.css"/>
		<link rel="stylesheet" type="text/css" href="../../css/pagecss/treepage.css"/>
		<link rel="stylesheet" type="text/css" href="../../css/jquery.datetimepicker.css"/>
		<link rel="stylesheet" type="text/css" href="../../css/ui.jqgrid-bootstrap.css"/>
		<link rel="stylesheet" type="text/css" href="../../css/table.css"/>
		<link rel="stylesheet" type="text/css" href="../../css/subjectBal.css"/>
		<link rel="stylesheet" type="text/css" href="../../css/pagecss/auxiliary-ledger.css"/>
</head>
	<body>
	<div id="shade">
			<div id="shade-box">
				<div class="shade-title">
					<b class="shade-b">查询</b>
					<label class="shade-close">×</label>
				</div>
				<div class="shade-main">
					<div class="shade-mainleft">固定页</div>
					<!--选项卡-->
					<div class="shade-mainright">
						<div class="shade-mainright-nav">
							<ul>
								<li class="pageA bgcolor">过滤条件</li>
							</ul>
						</div>
						<!--过滤条件页面-->
						<div class="shade-mainright-pageA">
							<p class="bloc">集团：<input class="wnum" disabled="disabled" type="text" value="执信集团" /></p>
							<p class="company">公司：<select class="wnum" name="companyId">
								<option value="9">执信软件</option>
								<option value="999">测试</option>
							</select></p>
							<hr />
							<p class="period">期间：<select class="snum" id="beginTime" name="beginTime" onchange="onSelectYear(this)">
												</select> - 
													<select class="snum" id="endTime" name="endTime">
													</select></p>
							<p class="subsort">科目类别：
							<select class="snum" name="type" id="flowType">
								<option></option>
							</select></p>
							<p class="subsort1">现金流量项目：<select class="snum"  id="beginCode" name="beginCode"></select> -
							 <select class="snum"  id="endCode" name="endCode"></select></p>
							<hr />
							<p class="nocharge"><input class="mr" type="checkbox" id="ifContainNotAccount"/>包含未记账</p>					
							<p class="nooccur"><input class="mr" type="checkbox" checked="checked" id="checkFlow"/>包含不影响现金流量分配的项目</p>
					</div>
					
				</div>
				<div class="shade-footer">
					<button class="sure" >确定</button>
					<button class="cancel">取消</button>
				</div>
			</div>
			
			</div>	
		</div>
		
	<div class="btn-group" role="group" >
			<ul>
				<li>打印</li>
				<li>导出</li>
				<li>发送邮件</li>
				<li class="search-li">查询</li>
				<li>显示图表</li>
				<li>设置</li>
				<li>刷新</li>
				<li>小计隐藏</li>
				<li>合计隐藏</li>
				<li>联查隐藏</li>
				<li class="close-li">退出</li>
			</ul>	
		</div>
	 <div id="subject-top">
			<div id="subject-top-na">现金流量明细</div>
		<div id="subject-top-search">
				<p><label>集团:</label><label class="sub-comp bloc1">执信集团</label></p>
				<label>公司:</label>
				<select class="sub-comp com danwei2">
						<option value='1001阿里巴巴'>阿里巴巴</option>
						<option value='1002腾讯'>腾讯</option>
						<option value='1003百度'>百度</option>
						<option value='1004搜狐'>搜狐</option>
					</select>
			</div>
		</div>
	
	<div class="tablebox retailDetailTable">
			<div class="grid-wrap" style="margin-top:10px">
				<table id="cashTable" class="table table-condensed table-hover table-striped" >
				</table>
				<div id="gridpager" style="height: 30px"></div>
			</div>
	</div>
	</body>
		
		<script src="../../js/jquery-1.12.4.min.js" type="text/javascript" charset="utf-8"></script>
		<script src="../../js/bootstrap.min.js" type="text/javascript" charset="utf-8"></script>
		<script src="../../js/jquery.jqGrid.min.js" type="text/javascript" charset="utf-8"></script>
		<script src="../../js/jquery.datetimepicker.full.js" type="text/javascript" charset="utf-8"></script>
		<script src="../../js/grid.locale-cn.js" type="text/javascript" charset="utf-8"></script>		
		<script src="../../js/commonjs/xm.js" type="text/javascript" charset="utf-8"></script>
		<script src="../../js/zxsaas_plus.js" type="text/javascript" charset="utf-8"></script>
		<script src="../../js/jquery.jqGrid.groupHeader-0.2.1.js" type="text/javascript" charset="utf-8"></script>
		<script src="../../js/commonjs/cw.js" type="text/javascript" charset="utf-8"></script>
		<script type="text/javascript" src="../../js/cw/subject/cashflowQuery.js"></script>
</html>

