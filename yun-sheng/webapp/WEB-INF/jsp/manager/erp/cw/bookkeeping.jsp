<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>记账</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!-- 引入文件 -->
	<jsp:include page="../../Include/import_cw.jsp"></jsp:include>
	<link rel="stylesheet" type="text/css" href="${basePath}/css/erp/cw/bookkeeping.css?v=${version}" />
	<script type="text/javascript">
		//**********全局变量
        //基本目录
        var basePath = "${basePath}";

	</script>
  </head>
 
  <body>
  
    <!-- 页面容器 -->
	<div class="well">
		<!-- 头部菜单 -->
		<div id="AUTH" data-code="JZ" class="btn-group btnHundred" role="group" >
			<button type="button" class="btn btn-default" onclick='record()'>记账</button>
			<button type="button" class="btn btn-default" onclick='javascript:CwGrid.$("dataGrid").queryGridData()'>刷新</button>
			<button type="button" class="btn btn-default" onclick="assistRecord()">预计账</button>
		    <button type="button" class="btn btn-default">退出</button>	
		</div>
		
		<!-- 查询表单 -->
		<form id="searchForm" class="form-inline">
			  <div class="form-group">
			    <label class="control-label">会计期间：</label>
			    <input type="text" class="form-control date" id="dateBegin" name="dateBegin" readonly>
			  </div>
			  <div class="form-group">
			    <label class="control-label" >—</label>
			    <input type="text" class="form-control date" id="dateEnd" name="dateEnd" readonly>
			  </div>
			  <div class="btn-group-vertical">
			  	<button type="button" class="btn btn-xs" style="width: 58px;" onclick='javascript:CwGrid.$("dataGrid").queryGridData()'>查询</button>
			 </div>
		 </form>
	    
	</div>
	
	<!-- 记账表格 -->
    <div class="row gridBody">
        <div class="col-md-12">
			<div class="jqGrid_wrapper">
				<table id="dataGrid"></table> 
			</div>
        </div>
    </div>
    
	<!-- 引用自定义JS文件
	<script type="text/javascript" src="${basePath}/model/erp/model-order.js?v=${version}"></script>
	<script type="text/javascript" src="${basePath}/js/erp/purchase/order.js?v=${version}"></script>-->
	<script type="text/javascript" src="${basePath}/js/erp/cw/bookkeeping.js?v=${version}"></script>
	<!-- 菜单权限验证 -->
	<script type="text/javascript" src="${basePath}/js/erp/authority/menuValidation.js?v=${version}"></script>
  </body>
  
</html>
