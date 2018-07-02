<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML>
<html>
    <title>往来单位引用</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<jsp:include page="../Include/import.jsp"></jsp:include>
	<link rel="stylesheet" type="text/css" href="${basePath}/js/jquery-easyui/themes/bootstrap/easyui.css">
	<link rel="stylesheet" type="text/css" href="${basePath}/js/jquery-easyui/themes/icon.css">

	<script type="text/javascript" src="${basePath}/js/jquery-easyui/jquery.easyui.min.js"></script>
	<script type="text/javascript">
		//全局变量
		var gl_groupId = ${groupId};//集团ID
		var basePath = "${basePath}";

	</script>
  </head>
  <body>

    <!-- S 主要区域 -->
	<div id="mainDIV" class="container-fluid">
		<div class="row">
			<div class="col-md-12" style="padding-left: 0px;padding-right: 0px;">
				<nav class="navbar navbar-default" role="navigation" style="padding-right: 5px;margin-bottom: 0px;">
				    <div class="container-fluid">
					    <div class="nav navbar-nav navbar-right">
					    	<button type="button" class="btn btn-default navbar-btn" id="saveBt" style="display: none;" onclick="saveBtClick()">保存</button>
					        <button type="button" class="btn btn-default navbar-btn" onclick="cancleSelect()">取消</button>
					    </div>
				    </div>
				</nav><!-- /E 工具栏结束  -->
			</div>
		</div>
		<div class="row">
			<div class="col-md-12" style="padding-left: 0px;padding-right: 0px;">
			  <div  style="float: left;padding: 10px;padding-bottom: 0px;">
			  	<ul id="dataTree" class="ztree">
			    </ul>
			  </div>
			  <div class="menuTools" style="float: left;padding-top: 10px;margin-left:80px;">
				<div class="form-horizontal" role="form">
				  <div class="form-group">
				    <div class="col-sm-12">
				      <input type="text" class="form-control" id="keyWord" placeholder="请输入名称或编码">
				    </div>
				  </div>
				</div>
			  </div>
			  <div class="jqGrid_wrapper" style="float: right;">
				<table id="dataGrid"></table> 
   				<div id=jqGridPager></div>
			  </div>
			</div>
		</div>
	    
	</div><!-- /E 主要区域 -->

  </body>
  
  <!--加载自定义JS -->
  <script type="text/javascript" charset="utf-8" src="${basePath}/js/TcontactUnit/reference.js"></script>
  
</html>
