<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML>
<html>
  <head>
    <title>借入转采购</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<jsp:include page="../Include/import.jsp"></jsp:include>
	<link rel="stylesheet" type="text/css" href="${basePath}/css/BillsImport/base.css" />
	<style type="text/css">
	.form-group {
	    margin-bottom: 0px;
	}
	.gridBody {
	    padding: 15px;
	    padding-top: 5px;
	}
	</style>
	<script type="text/javascript">
		//全局变量
		var basePath = "${basePath}";
	</script>
  </head>
  <body>
    <div style="position: absolute;top:0px;left:0px;width: 100%;height: 100%;z-index: 9999999;" id="loadingDiv">
      <div style="position: absolute;top:50%;left:50%;margin-left: -64px;margin-top: -64px;width:128px;height:128px;background-image: url(${basePath}/images/loading.gif);"></div>
    </div>
	<div class="container-fiuled" style="padding-top: 60px;">

	    <div class="row gridTop" >
	        <div class="col-md-12">
				<!-- /S 表头  -->
				<form class="well form-horizontal" role="form" id="topForm"> 
				  <!-- /S 表单控件  -->
				  <div class="formBtn">
					<div class="form-group">
					  <label class="col-sm-3 control-label">往来单位:</label>
					  <div class="col-sm-8">
					    <input type="text" class="form-control" name="contactId" style="display: none;">
					    <input type="text" class="form-control" name="contactIdName">
					  </div>
					</div>
				  </div>	
				  <div class="formBtn">
					<div class="form-group">
					  <label class="col-sm-3 control-label">串号:</label>
					  <div class="col-sm-8">
					    <input type="text" class="form-control" name="imei">
					  </div>
					</div>
				  </div>		
				  <div class="formBtn">
					<div class="form-group">
					  <label class="col-sm-3 control-label">商品名称:</label>
					  <div class="col-sm-8">
		                 <input type="text" class="form-control" name="goodsId" value="" style="display: none;" >
		                 <input type="text" class="form-control" name="goodsName" readonly="readonly">
					  </div>
					</div>
				  </div>
				  <div style="clear: left;"></div>
				</form><!-- /E 表头  -->
	        </div>
	    </div>
	    <div class="row gridBody">
	        <div class="col-md-12">
			  <!-- /S 表体 -->
			  <div class="jqGrid_wrapper">
				<table id="dataGrid"></table> 
   				<div id="jqGridPager"></div>
			  </div>
	        </div>
	    </div>
	</div>
	<div style=""></div>
	<nav class="navbar navbar-default" role="navigation" style="padding-right:5px;position: fixed;top:0px;width: 100%;" >
	    <div class="container-fluid">
		    <div class="nav navbar-nav navbar-right">
		    	<button type="button" class="btn btn-primary navbar-btn" onclick="sendDataToParentPage()">保存</button>
		        <button type="button" class="btn btn-default navbar-btn" onclick="cancleSelect()">取消</button>
		    </div>
	    </div>
	</nav><!-- /E 工具栏结束  -->

  </body>
  
  <!--加载自定义JS -->
  <script type="text/javascript" charset="utf-8" src="${basePath}/js/IborrowLendStockCC/reference.js"></script>
  
</html>
