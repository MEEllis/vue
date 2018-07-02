<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>促销重叠优先级</title>
    <meta charset="utf-8" />
    <meta name="renderer" content="webkit" />
    <meta http-equiv="X-UA-Compatible" content="IE=9; IE=8; IE=7; IE=EDGE ; chrome=1" />
	<jsp:include page="../../Include/import.jsp"></jsp:include>
	<link rel="stylesheet" type="text/css" href="${basePath}/css/pagecss/treepage.css?v=${version}"/>
	<link rel="stylesheet" type="text/css" href="${basePath}/css/erp/promotion/promotion-base.css?v=${version}" />
	<style type="text/css">
	body {
		padding: 20px;
	}
	.cxTypeTable{
	    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
	    font-size: 14px;
	    color: #333;
	    cursor: pointer;
	}
	.cxTypeTable td{
		
	}
	</style>
	<script type="text/javascript">
	var basePath = "${basePath}";
	</script>
  </head>
  
  <body>
	<!--头部-->
	<div class="well">
		<div class="btn-group btnHundred" role="group" >
			<button type="button" class="addAudit btn" onclick="saveBtClick()">保存</button>
		    <button type="button" class="btn saveData" onclick="queryData2()">取消</button>	
		    <button type="button" class="btn" data-eventname="printbtn">联查促销单</button>
		</div>
	</div>
	
	<ul class="nav nav-tabs" id="gridTabs" style="margin-top: 20px;">
	   <li class="active"><a href="#tab1-1" data-toggle="tab">同类别促销单据优先级</a></li>
	   <li><a href="#tab1-2" data-toggle="tab">促销类型优先级</a></li>
	</ul>
	<div class="tab-content">
	   <div class="tab-pane fade in active" id="tab1-1">

			<table class="table table-bordered table-hover" style="margin-top: 15px;width: 120px;float: left;margin-right:10px;" id="cxTypeSelectTable">
			  <caption>促销类型</caption>
			  <tbody class="cxTypeTable" id="cxTypeTableMenu">

			  </tbody>
			</table>
			<div style="float: left;width:400px;margin-top: 8px;margin-left:10px;"> 
				<button type="button" class="btn btn-primary" style="background: #4e78a1;" onclick="orderBtClick(true)">上移</button>
				<button type="button" class="btn btn-primary" style="background: #4e78a1;" onclick="orderBtClick(false)">下移</button>
			</div>
	   		<div class="jqGrid_wrapper" style="float: left;margin-top: 9px;">
				<table id="dataGrid1"></table> 
			</div><!-- /E 表体 -->
	   </div>
	   <div class="tab-pane fade" id="tab1-2">
			<table class="table table-bordered table-hover" style="margin-top: 15px;width: 120px;">
			  <tbody class="cxTypeTable" id="typeOrderTable">
			  </tbody>
			</table>
			<button type="button" class="btn btn-primary" style="background: #4e78a1;" onclick="orderBtClick2(true)">上移</button>
			<button type="button" class="btn btn-primary" style="background: #4e78a1;" onclick="orderBtClick2(false)">下移</button>
	   </div>
	</div>
	<!-- 引用自定义JS文件 -->
	<script src="${basePath}/model/erp/model-promotion-priority.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/erp/promotion/promotion-priority.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<!-- 菜单权限验证 -->
	<script type="text/javascript" src="${basePath}/js/erp/authority/menuValidation.js?v=${version}"></script>
  </body>
  
  
</html>

