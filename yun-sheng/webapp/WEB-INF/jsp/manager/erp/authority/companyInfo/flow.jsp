<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<meta name="renderer" content="webkit" />
		<meta http-equiv="X-UA-Compatible" content="IE=9; IE=8; IE=7; IE=EDGE ; chrome=1" />
		<link rel="stylesheet" type="text/css" href="${basePath}/css/bootstrap.css?v=${version}?v=${version}" />
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
		<link rel="stylesheet" type="text/css" href="${basePath}/css/admin/company/flow.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="${basePath}/css/market/public.css?v=${version}" />
		<title>流程操作导向图</title>
		<style>
		  .addCurrent{
		     position:relative;
		  }
		</style>
	</head>

	<body>
		<!-------------------------------------主页面开始----------------------------------------->
		<div class="flow">
			<input id="AUTH" type="hidden" data-code="LCXD">
			<h4 class="fname">流程操作导向图</h4>
			<!--div class="addCurrent"></div-->
			<div class="fimg-1 fimg">
				<a href="${basePath}/authority/companyInfo/toCompany">
				<img src="${basePath}/images/admin/hh.png" /><br />
				</a>
				<span>公司新增</span>
			</div>
			<div class="fimg-2 fimg">
				<a href="${basePath}/authority/sectionInfo/toSection">
				<img src="${basePath}/images/admin/hh.png" /><br />
				</a>
				<span>部门新增</span>
			</div>
			<div class="fimg-3 fimg">
				<a href="${basePath}/authority/storageInfo/toStorage">
				<img src="${basePath}/images/admin/hh.png" /><br />
				</a>
				<span>仓库新增</span>
			</div>
			<div class="fimg-4 fimg">
			<a href="${basePath}/authority/jobInfo/toJob">
				<img src="${basePath}/images/admin/hh.png" /><br />
			</a>
				<span>职位新增</span>
			</div>
			<div class="fimg-5 fimg">
			<a href="${basePath}/authority/roleInfo/toRole">
				<img src="${basePath}/images/admin/hh.png" /><br />
			</a>
				<span>角色管理</span>
			</div>
			<div class="fimg-6 fimg">
			<a href="${basePath}/authority/employeeInfo/toEmployee">
				<img src="${basePath}/images/admin/hh.png" /><br />
			</a>
				<span>员工档案</span>
			</div>
			<div class="fimg-7 fimg">
				<a href="${basePath}/authority/contactInfo/toContact">
				<img src="${basePath}/images/admin/hh.png" /><br />
				</a>
				<span>往来单位</span>
			</div>
			<div class="fimg-8 fimg">
				<img src="${basePath}/images/admin/hh.png" /><br />
				<span>角色关联人员授权</span>
			</div>
			<div class="fimg-9 fimg">
				<img src="${basePath}/images/admin/hh.png" /><br />
				<span>特殊用户授权</span>
			</div>
			
			<div class="rimg-1 fimg"><img src="${basePath}/images/admin/you.png" /></div>
			<div class="rimg-2 fimg"><img src="${basePath}/images/admin/you.png" /></div>
			<div class="rimg-3 fimg"><img src="${basePath}/images/admin/you.png" /></div>
			
			<div class="rimg-4 fimg"><img src="${basePath}/images/admin/xia.png" /></div>
			<div class="rimg-5 fimg"><img src="${basePath}/images/admin/xia.png" /></div>
			<div class="rimg-6 fimg"><img src="${basePath}/images/admin/xia.png" /></div>
			
			<div class="rimg-7 fimg"><img src="${basePath}/images/admin/zuo.png" /></div>
			<div class="rimg-8 fimg"><img src="${basePath}/images/admin/zuo.png" /></div>
		
		<!--已有页面	-->
		
		
	</div>
	
	<!-------------------------------------主页面结束----------------------------------------->
	</body>
	<script src="${basePath}/js/jquery-1.12.4.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/bootstrap.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/jquery.jqGrid.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/jquery.datetimepicker.full.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/grid.locale-cn.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/commonjs/xm.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/zxsaas_plus.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/cw/jquery.ztree.all-3.5.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/admin/company/flow.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script type="text/javascript">
		
	</script>

