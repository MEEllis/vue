<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>科目参照</title>
		<jsp:include page="../Include/import.jsp"></jsp:include>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/cw/subject-reference.css" />
		<script type="text/javascript">
		
			//**********全局变量
			//基本目录
			var basePath = "${basePath}";
			//当前公司ID
			var gl_CurrCompanyId = ${companyId};
		
		</script>
	</head>
	<body>
		<div class="container">
			<nav class="navbar navbar-default" role="navigation" style="margin-bottom: 0px;">
			    <div class="container-fluid"> 
			    <div>
			        <form class="navbar-form navbar-left" role="search">
			            <div class="form-group">
			                <input type="text" class="form-control" placeholder="筛选" id="keyWord">
			            </div>
			        </form>
			        <button type="submit" class="btn btn-primary pull-right" id="saveBt" style="margin-top: 6px;" onclick="retrunSelectSubjects()">保存</button>
			    </div>
			    </div>
			</nav><!-- E 工具栏 -->
			<!-- 左边树 -->
			<div class="left_tree">
				<ul id="companySubjectTree" class="ztree"></ul>
			</div>
			<!-- 右边表格 -->
			<div class="details">
				<!--页数-->
				<div class="jqGrid_wrapper">
					<table id="dataGrid"></table> 
    				<div id="pager"></div>
				</div>
		    </div>
		</div>
		<!-- 引用js文件 -->
		<script type="text/javascript" src="${basePath}/model/cw/model-company-subject.js"></script>
	    <script type="text/javascript" src="${basePath}/js/FcompanySubjectTemplate/reference.js"></script>
	</body>
</html>
