<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML>
<html>
  <head>
    <title>公司会计科目</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
    <jsp:include page="../../Include/import_cw.jsp"></jsp:include>
    <link rel="stylesheet" type="text/css" href="${basePath}/css/erp/cw/subject-manager.css?v=${version}"/>
	
	<script type="text/javascript">
		//全局变量
		var gl_groupId = ${groupId};//集团ID
		var gl_groupCode = '${groupCode}';
		var basePath = "${basePath}";
		
	</script>
  </head>
  <body>

    <!-- S 主要区域 -->
	<div id="mainDIV" class="container-fluid">
		<div class="row">
			<div class="col-md-12">
				<!-- /S 工具栏开始  -->
				<div class="well" style="padding: 0px;margin-top: 20px;">
				<div id="AUTH" data-code="GSGL" class="btn-group btnHundred" role="group" style="margin-bottom: 0px;margin-top: 0px;">
			    	<button type="button" class="btn btn-default navbar-btn" id="addBtn">新增</button>
			        <button type="button" class="btn btn-default navbar-btn" id="eiditBtn">修改</button>
			        <button type="button" class="btn btn-default navbar-btn" id="eiditBtn">停用</button>
			        <button type="button" class="btn btn-default navbar-btn" id="delBtn" onclick="delBtn()">删除</button>
			        <button type="button" class="btn btn-default navbar-btn" id="enabledBtn" onclick="enabledBtn()">集团引入</button>
			        <button type="button" class="btn btn-default navbar-btn" id="disEnabledBtn" onclick="disEnabledBtn()">科目对照</button>
			        <button type="button" class="btn btn-default" onclick="window.location.reload()" style="display: inline-block;">科目复制 </button>
			        <select class="btn btn-default" id="qiJianListSelect">
			          <option value="2017">2017</option>
			        </select>
				</div>
				</div>
			    <!-- S 工具栏 -->
			</div>
		</div>
		
		<div class="row">
			<div class="col-md-12">
			  <ul id="dataTree" class="ztree" style="float: left;">
			  </ul>
			  <div class="jqGrid_wrapper" style="float: left;">
				<table id="dataGrid"></table> 
   				<div id=jqGridPager></div>
			  </div>
			</div>
		</div>
	    
	</div><!-- /E 主要区域 -->

  </body>
  
  <script type="text/javascript" src="${basePath}/js/erp/authority/menuValidation.js?v=${version}"></script><!-- 菜单权限验证 -->
  <script type="text/javascript" src="${basePath}/js/erp/cw/company-subject-manager.js?v=${version}" charset="utf-8"></script><!--加载自定义JS -->
</html>





