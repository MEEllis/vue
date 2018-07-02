<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML>
<html>
  <head>
    <title>商品类别引用</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<jsp:include page="../Include/import.jsp"></jsp:include>
	<link rel="stylesheet" type="text/css" href="${basePath}/js/jquery-easyui/themes/bootstrap/easyui.css">
	<link rel="stylesheet" type="text/css" href="${basePath}/js/jquery-easyui/themes/icon.css">

	<script type="text/javascript" src="${basePath}/js/jquery-easyui/jquery.easyui.min.js"></script>
	<style type="text/css">
	html,body{
		overflow-x: hidden;
	}
	</style>
	<script type="text/javascript">
		//全局变量
		var gl_companyId = ${companyId};//所在公司ID
		var basePath = "${basePath}";

	</script>
  </head>
  <body>

    <!-- S 主要区域 -->
	<div id="mainDIV" class="container-fluid">
		<div class="row" style="margin-left: -30px;margin-right: -30px;">
			<div class="col-md-12" >
				<nav class="navbar navbar-default" role="navigation" style="padding-right: 5px;">
				    <div class="container-fluid">
					    <div class="nav navbar-nav navbar-right">
					        <button type="button" class="btn btn-default navbar-btn" onclick="cancleSelect()" style="right: 10px;position: absolute;top: 0px;">取消</button>
					    </div>
				    </div>
				</nav><!-- /E 工具栏结束  -->
			</div>
		</div>
		<div class="row">
			<div class="col-md-12">
			  <div  style="float: left;padding: 10px;padding-bottom: 0px;">
			  	<ul id="dataTree" class="ztree">
			    </ul>
			  </div>
			</div>
		</div>
	    
	</div><!-- /E 主要区域 -->

  </body>
  
  <!--加载自定义JS -->
  <script type="text/javascript" charset="utf-8" src="${basePath}/js/Tgoodsclass/reference.js"></script>
  
</html>
