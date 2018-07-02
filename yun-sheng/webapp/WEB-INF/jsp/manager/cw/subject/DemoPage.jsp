<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>测试页面</title>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/cw/demo.css">
		<link rel="stylesheet" type="text/css" href="${basePath}/css/cw/zTreeStyle/zTreeStyle.css">
		<link href="${basePath}/css/cw/bootstrap/bootstrap.min.css" rel="stylesheet">
		<link href="${basePath}/css/cw/bootstrap/bootstrap-theme.min.css" rel="stylesheet">
		<script src="${basePath}/js/jquery-1.12.4.min.js" type="text/javascript" charset="utf-8"></script>
		<script src="${basePath}/js/bootstrap.min.js" type="text/javascript" charset="utf-8"></script>
		<!--<script type="text/javascript" src="${basePath}/js/cw/jquery.min.js"></script>-->
		<script src="${basePath}/js/cw/bootstrap/jquery.min.js"></script>
		<script src="${basePath}/js/cw/bootstrap/bootstrap.min.js"></script>
		<script src="${basePath}/js/cw/bootstrap/ie10-viewport-bug-workaround.js"></script>
		<script type="text/javascript" src="${basePath}/js/cw/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="${basePath}/js/cw/jquery.ztree.core-3.5.min.js"></script>
		<script type="text/javascript" src="${basePath}/js/cw/jquery.ztree.excheck-3.5.min.js"></script>
		<script type="text/javascript" src="${basePath}/js/cw/jquery.ztree.exedit-3.5.min.js"></script>
		<script type="text/javascript" src="${basePath}/js/cw/subject/demo-page.js"></script>
		
	</head>
	<body>
		<div class="container" role="main">
			<div class="row">
				<div class="col-md-12">
					<a class="btn btn-default" href="#" role="button" data-toggle="modal" data-target=".bs-example-modal-lg">新增</a>
					<a class="btn btn-default" href="#" role="button">修改</a>
					<a class="btn btn-default" href="#" role="button">删除</a>
					<a class="btn btn-default" href="#" role="button">集团引入</a>
					<a class="btn btn-default" href="#" role="button">取消引用</a>
					<a class="btn btn-default" href="#" role="button">查找</a>
					<a class="btn btn-default" href="#" role="button">栏目</a>
					<a class="btn btn-default" href="#" role="button">导出</a>
					<a class="btn btn-default" href="#" role="button">科目对照</a>
					<a class="btn btn-default" href="#" role="button">科目复制</a>
					<a class="btn btn-default" href="#" role="button">退出</a>
				</div>
			</div>
			
			

		</div>
		
	</body>
</html>

<!-- 新增科目窗口 -->
<div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<div class="row">
					<div class="col-md-12">
						<a class="btn btn-default" href="#" role="button">上张</a>
						<a class="btn btn-default" href="#" role="button">下张</a>
						
						<a class="btn btn-default" href="#" role="button">保存并新增</a>
						<a class="btn btn-default" href="#" role="button">退出</a>
					</div>
				</div>
			</div>
			<div class="modal-body">
				<div class="container-fluid">
					<div class="row">
						<div class="col-md-6">
							<form class="form-horizontal">
								<div class="form-group">
									<label for="inputEmail3" class="col-sm-4 control-label">
										姓名
									</label>
									<div class="col-sm-8">
										<input type="email" class="form-control" id="nameinput"
											placeholder="name">
									</div>
									<label for="inputEmail3" class="col-sm-4 control-label">
										年龄
									</label>
									<div class="col-sm-8">
										<select id="agesel" class="form-control">
											<option value="11">11</option>
											<option value="22">22</option>
											<option value="33">33</option>
										</select>
									</div>
									<div class="col-sm-4 col-md-offset-4">
										<a class="btn btn-default" href="#" role="button" onclick="saveone()">保存</a>
									</div>
								</div>
							</form>
						</div>
					</div>
					
					<div class="row">
						<div class="col-md-6">
							<form class="form-horizontal">
								<div class="col-md-8 col-md-offset-4">
									<div class="checkbox">
										<label>
											<input id="sex1" type="checkbox" value="男">
											男
										</label>
										<label>
											<input id="sex2" type="checkbox" value="女">
											女
										</label>
										<label>
											<input id="sex3" type="checkbox" value="不男不女">
											不男不女
										</label>
									</div>
								</div>
								<div class="col-sm-4 col-md-offset-4">
									<a class="btn btn-default" href="#" role="button" onclick="savetwo()">保存</a>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>