<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<meta name="renderer" content="webkit" />
		<meta http-equiv="X-UA-Compatible" content="IE=9; IE=8; IE=7; IE=EDGE ; chrome=1" />
        <link rel="stylesheet" type="text/css" href="${basePath}/css/base.css?v=${version}"/> 	
		<link rel="stylesheet" type="text/css" href="${basePath}/css/bootstrap.css?v=${version}" />
	    <link rel="stylesheet" type="text/css" href="${basePath}/css/jquery-ui.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="${basePath}/css/ui.jqgrid-bootstrap.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/select2.min.css?v=${version}"/>
	    <link rel="stylesheet" type="text/css" href="${basePath}/css/iconfont.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/font-awesome.css?v=${version}"/>
        <link rel="stylesheet" type="text/css" href="${basePath}/css/font-awesome-ie7.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/cw/zTreeStyle/zTreeStylePublicModel.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/associator/associator.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/associator/cardinfo.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/jquery.datetimepicker.css?v=${version}"/>
		<title>消费记录</title>
		<style> 
		     html,body { width:100%;height:100%; }
		     span.select2{width:auto!important;min-width:148px!important;min-height: 28px;}
		     span.select2-selection--multiple{
		        border: 1px solid #e3e3e3!important;
		        border-radius: 2px!important;
		     }
		     .select2-selection__rendered .select2-selection__choice{
		        border: 1px solid transparent!important;
		      }
		    .quickselect .r{
		        margin-bottom:0.6%;
		        margin-right: 0.6%;
		        float:left;
		    }
		    .quickselect .qick-ipt{
		        min-height:31px;
		    }
		    .quickselect .row{margin-left:0;margin-right:0;}
		    .btn-group a{color:#333}
		</style>
		<script type="text/javascript">
		var sectionId = ${SESSION_KEY_USER.sectionId};
		</script>
	</head>
	<body>
		<div class="content">
		<!--消费记录主页开始   -->
		<!--btns -->
		<div class="gridTools">
			  <div class="gridTop">
					 <div id="AUTH" data-code="KHXFJL" class="btn-group btnHundred" role="group" ><!--
					   <button type="button" class="btn btn-default" >导出</button>
					   <button type="button" class="btn btn-default" >打印</button>
					   --><a class="btn" onclick="window.location.reload();">刷新</a>
					</div>
			<input type="hidden" id='id' value="${id}"/>
					<div class="content1" style="height:100%">
						<!--快速检索 -->
						<div class="quickselect">
						    <div class="row">
						    <div class="r">
							<span id="">客户姓名：</span>
							<input type="text" name="" id="customName" value="${name}"  class="qick-ipt" placeholder="输入客户姓名"/></div>
							<div class="r">
							<span id="">联系电话：</span>
							<input type="text" name="" id="contact" value="${phone}"  class="qick-ipt" placeholder="输入联系电话"/></div>
							<div class="r">
							<span id="">单据类型：</span>
							<select class="js-example-basic-multiple orderSort" multiple="multiple"></select></div><!-- 单据类型多选 -->
							<div class="r"><a class="find-out">查询</a></div>
							</div>
						</div>
						<!--快速检索   end-->
					</div>
			  </div>
		</div>
		
		<div class="content2">
			<div class="table">
				<div class="grid-wrap" >
					<table id="jqGrid_cusRecord" class="zxsaastable"></table>
				    <div id="jqGridCusRecord"></div>
				</div>
			</div>
			<!--表格   end-->
		</div>
		
		
		</div>
		<!--消费记录主页结束   -->
		

	</body>
	<script src="${basePath}/js/jquery-1.12.4.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/bootstrap.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/jquery.jqGrid.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/base.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/zxsaas_plus.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/grid.locale-cn.js?v=${version}" type="text/javascript" charset="utf-8"></script>	
	<script src="${basePath}/js/cw/jquery.ztree.all-3.5.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/jquery.datetimepicker.full.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/commonjs/xr.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/select2.full.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/commonjs/eidit-grid-test.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/associator/customRecord.js?v=${version}" type="text/javascript" charset="utf-8"></script>
    <script type="text/javascript">
    $(function(){
    	initial();
      
    });
	</script>
	<!-- 菜单权限验证 -->
	<script type="text/javascript" src="${basePath}/js/erp/authority/menuValidation.js?v=${version}"></script>
</html>

