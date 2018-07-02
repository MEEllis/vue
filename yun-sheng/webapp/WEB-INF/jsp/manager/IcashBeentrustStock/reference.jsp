<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML>
<html>
  <head>
    <title>受托结算库存</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<jsp:include page="../Include/import.jsp"></jsp:include>
	<style type="text/css">
	.formBtn{
		float: left;
		width: 260px;
	}
	</style>
	<script type="text/javascript">
		//全局变量
		var basePath = "${basePath}";
		function setWldwName(name){
			$("#wldwName").html(name);
		}
	</script>
  </head>
  <body>
	
    <!-- S 主要区域 -->
	<div id="mainDIV" class="container-fluid">
		<div class="row">
			<div class="col-md-12" style="padding-bottom: 0px;padding-top: 10px;">
				<!-- S 工具栏开始  -->
		    	<button type="button" class="btn btn-default" onclick="saveBtClick()">保存</button>
		        <button type="button" class="btn btn-default" onclick="canelBtClick()">取消</button>
			</div>
			<div class="col-md-12">
				<h4><span>往来单位</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span id="wldwName">______</span></h4>
			</div>
		</div>
	    <div class="row">
	        <div class="col-md-12">
				<!-- S 表头  -->
				<form class="well form-horizontal" role="form" id="topForm" style="padding-bottom: 0px;"> 
				  <!-- S 表单控件  -->
				  <div class="formBtn">
					<div class="form-group">
					  <label class="col-sm-4 control-label">开始日期:</label>
					  <div class="col-sm-8">
					        <input type="text" class="form-control" name="instroDateBegin" id="instroDateBegin">
					  </div>
					</div>
				  </div>
				  <div class="formBtn">
					<div class="form-group">
					  <label class="col-sm-4 control-label">结束日期:</label>
					  <div class="col-sm-8">
					        <input type="text" class="form-control" name="instroDateEnd" id="instroDateEnd">
					  </div>
					</div>
				  </div>
				  <div class="formBtn">
					<div class="form-group">
					  <label class="col-sm-4 control-label">商品名称:</label>
					  <div class="col-sm-8">
					    <input type="text" class="form-control" name="goodsName">
					  </div>
					</div>
				  </div>
				  <div class="formBtn">
					<div class="form-group">
					  <div class="col-sm-1"></div>
					  <div class="col-sm-4">
					    <button type="button" class="btn btn-default" onclick="reLoadGrid()">查询</button>
					  </div>
					</div>
				  </div>
				  <!-- E 表单控件  -->
				  <div style="clear: left;"></div>
				</form><!-- E 表头  -->
	        </div>
	    </div>
	    <div class="row gridBody">
	        <div class="col-md-12">
				<!-- /S 表体 -->
				<div class="jqGrid_wrapper">
					<table id="dataGrid"></table> 
					<div id=jqGridPager></div>
				</div><!-- /E 表体 -->
	        </div>
	    </div>
	
	
	</div><!-- E 主要区域 -->

  </body>
  
  <!--加载自定义JS -->
  <script type="text/javascript" charset="utf-8" src="${basePath}/model/erp/model-beentrust-stock.js"></script>
  <script type="text/javascript" charset="utf-8" src="${basePath}/js/IcashBeentrustStock/reference.js"></script>
  
</html>
