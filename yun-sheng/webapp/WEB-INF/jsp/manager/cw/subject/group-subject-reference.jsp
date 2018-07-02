<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>集团科目引用</title>
		<jsp:include page="../../Include/import.jsp"></jsp:include>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/cw/group-subject-reference.css" />
		<script type="text/javascript">
			//**********全局变量
			//基本目录
			var basePath = "${basePath}";
			//当前集团ID
			var gl_CurrGroupId = ${groupId};
			//当前集团ID
			var gl_CurrCompanyId = ${companyId};
			//当前年度
			var gl_CurrYear = ${year};
			//集团科目数据访问工具
			var groupSubjectDAO = null;
		</script>
	</head>
	<body>
		<div class="container">
			<nav class="navbar navbar-default" role="navigation">
			    <div class="container-fluid"> 
				    <div>
				        <form class="navbar-form navbar-left" role="search">
				            <div class="form-group">
				                <input type="text" class="form-control" placeholder="筛选" id="keyWord">
				            </div>
				            
				        </form>
				        <button type="submit" class="btn btn-primary pull-right" style="margin-top: 6px;" onclick="retrunSelectSubjects()">提交</button>
				    </div>
			    </div>
			</nav><!-- E 工具栏 -->
			<!-- 左边树 -->
			<div class="left_tree">
				<ul id="groupSubjectTree" class="ztree"></ul>
			</div>
			<!-- 右边表格 -->
			<div class="details">
			<!-- S 工具栏 -->
				<!--页数-->
				<div class="jqGrid_wrapper">
					<table id="groupSubjectTable"></table> 
    				<div id="pager"></div>
				</div>
		    </div>
		</div>
		<!-- 引用js文件 -->
		<script type="text/javascript" src="${basePath}/model/cw/model-group-subject.js"></script>
	    <script type="text/javascript" src="${basePath}/js/cw/subject/group-subject-reference.js"></script>
	</body>
</html>
