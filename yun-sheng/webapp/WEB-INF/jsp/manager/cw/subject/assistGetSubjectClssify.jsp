<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>科目类别</title>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/base.css"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/bootstrap.css" />
		<link rel="stylesheet" type="text/css" href="${basePath}/css/jquery-ui.css" />
		<link rel="stylesheet" type="text/css" href="${basePath}/js/skins/all.css" />
		<link rel="stylesheet" type="text/css" href="${basePath}/css/animate.css"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/bootstrap-select.css"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/pagecss/treepage.css"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/jquery.datetimepicker.css"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/ui.jqgrid-bootstrap.css"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/table.css"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/subjectBal.css"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/pagecss/auxiliary-ledger.css"/>
		<script src="${basePath}/js/jquery-1.12.4.min.js" type="text/javascript" charset="utf-8"></script>
		<script src="${basePath}/js/bootstrap.min.js" type="text/javascript" charset="utf-8"></script>
		<script src="${basePath}/js/jquery.jqGrid.min.js" type="text/javascript" charset="utf-8"></script>
		<script src="${basePath}/js/jquery.datetimepicker.full.js" type="text/javascript" charset="utf-8"></script>
		<script src="${basePath}/js/grid.locale-cn.js" type="text/javascript" charset="utf-8"></script>		
		<script src="${basePath}/js/commonjs/xm.js" type="text/javascript" charset="utf-8"></script>
		<script src="${basePath}/js/zxsaas_plus.js" type="text/javascript" charset="utf-8"></script>
		<script src="${basePath}/js/auxiliary-bal.js" type="text/javascript" charset="utf-8"></script>
		<script src="${basePath}/js/jquery.jqGrid.groupHeader-0.2.1.js" type="text/javascript" charset="utf-8"></script>
		<script type="text/javascript">
		
			//**********全局变量
			//基本目录
			var basePath = "${basePath}";
			//当前公司ID
			var gl_CurrCompanyId = 12;
			//当前年度
			var gl_CurrYear = 2016;

			var assistBalanaceTableQuery = null;
			
		</script>
	</head>
	<body>
		<div class="container">
			<table id="jqGrid_subjectClssify" class="zxsaastable">
			</table>
		</div>
		<button onclick="selectClssify()">确定</button>
		<!-- 引用js文件 -->
		<script type="text/javascript" src="${basePath}/js/cw/subject/assist-get-subject-clssify.js"></script>
		<script type="text/javascript" src="${basePath}/js/cw/subject/model-assist-balance-table.js"></script>
	</body>
</html>
