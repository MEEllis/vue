<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>集团科目和科目对照</title>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/cw/demo.css">
		<link rel="stylesheet" type="text/css" href="${basePath}/css/cw/zTreeStyle/zTreeStyle_.css">
		<link href="${basePath}/css/cw/bootstrap/bootstrap.min.css" rel="stylesheet">
		<link href="${basePath}/css/cw/groupAndSubjectCompare.css" rel="stylesheet">
		<script src="${basePath}/js/jquery-1.12.4.min.js" type="text/javascript" charset="utf-8"></script>
		<script src="${basePath}/js/bootstrap.min.js" type="text/javascript" charset="utf-8"></script>
		<script src="${basePath}/js/cw/bootstrap/jquery.min.js"></script>
		<script src="${basePath}/js/cw/bootstrap/bootstrap.min.js"></script>
		<script src="${basePath}/js/cw/bootstrap/jquery.bootstrap.teninedialog.v3.js"></script>
		<script src="${basePath}/js/cw/bootstrap/ie10-viewport-bug-workaround.js"></script>
		<script type="text/javascript" src="${basePath}/js/cw/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="${basePath}/js/cw/jquery.ztree.core-3.5.min.js"></script>
		<script type="text/javascript" src="${basePath}/js/cw/jquery.ztree.excheck-3.5.min.js"></script>
		<script type="text/javascript" src="${basePath}/js/cw/jquery.ztree.exedit-3.5.min.js"></script>
		<script type="text/javascript">
		var groupSubject = null;
		var companySubject = null;
		var subjectCompare = null;
		var currYearSubjectList = null;
		var basePath = "${basePath}";
		</script>
	</head>
	<body>
		<!-- 接口树 -->
		<div id="menuDIV">
			<ul id="treeDemo" class="ztree"></ul>
		</div>
		<!-- 接口文档 -->
		<div id="mainDIV">
			<!-- 接口 -->
			<div id="api1" class="apiDIV">
				<button class="btn btn-primary btn-lg" data-toggle="modal"  data-target="#view1">
				   集团科目引用 DEMO
				</button>
			</div>
			<div id="api2" class="apiDIV" >
				<button class="btn btn-primary btn-lg" data-toggle="modal"  data-target="#view2">
				   子公司取消科目引用 DEMO
				</button>
			</div>
			<div id="api3" class="apiDIV">
				<button class="btn btn-primary btn-lg" data-toggle="modal"  data-target="#view3">
				   科目对照 DEMO
				</button>
			</div>
			<div id="api4" class="apiDIV">
				<button class="btn btn-primary btn-lg" data-toggle="modal"  data-target="#view4">
				   科目批量复制 DEMO
				</button>
			</div>
		</div>
		
		<form role="form" id="mulCopyForm" style="background-color: white;">
		   <div class="form-group">
		      <label for="name">源科目</label>
		      <input type="text" class="form-control"  id="copySouce"  placeholder="">
		      <button type="button" class="btn btn-default" onclick="javascript:setCopySource()">选择</button>
		   </div>
		   <div class="form-group">
		      <label for="inputfile">目标科目</label>
		      <input type="text" class="form-control"   id="copyMul"
		         placeholder="">
		      <button type="button" class="btn btn-default" onclick="javascript:setCopyMub()">选择</button>
		   </div>
		   <button type="button" class="btn btn-default" onclick="saveMulCopy()">提交</button>
		   <button type="button" class="btn btn-default" onclick="javascript:$('#mulCopyForm').hide()">取消</button>
		</form>	
	</body>
	<!-- 加载js -->
	<script type="text/javascript" src="${basePath}/js/cw/subject/group-and-subject-compare.js"></script>
	<script type="text/javascript" src="${basePath}/model/cw/model-group-subject.js"></script>
	<script type="text/javascript" src="${basePath}/model/cw/model-company-subject.js"></script>
	<script type="text/javascript" src="${basePath}/model/cw/model-subject-compare.js"></script>
</html>

<!-- 模态框:集团科目引用 -->
<div class="modal fade" id="view1" tabindex="-1" role="dialog"   aria-labelledby="myModalLabel" aria-hidden="true">
   <div class="modal-dialog">
      <div class="modal-content">
         <div class="modal-header">
            <button type="button" class="close" 
               data-dismiss="modal" aria-hidden="true">
                  &times;
            </button>
            <h4 class="modal-title" id="myModalLabel">
               	集团科目引用
            </h4>
         </div>
         <div class="modal-body">
          	 
			<div class="row">
				<div class="col-md-4">
					<input type="text"  id="keyWord" />
					<ul id="groupSubjectTree" class="ztree" style="width: 330px;height: 500px;"></ul>
				</div>
				<div class="col-md-8">
					<table class="table table-hover">
						<thead>
							<tr>
								<th></th>
								<th>科目编码</th>
								<th>科目名称</th>
								<th>级次</th>
								<th>科目类型</th>
								<th>余额方向</th>
								<th>辅助项</th>
								<th>使用状态</th>
								<th>是否停用</th>
							</tr>
						</thead>
						<tbody id="groupSubjectTable" ></tbody>
					</table>
				</div>
			</div>
          	 
         </div>
         <div class="modal-footer">
            <button type="button" class="btn btn-default" 
               data-dismiss="modal">关闭
            </button>
            <button type="button" class="btn btn-primary" onclick="saveChange()">
               	保存
            </button>
         </div>
      </div><!-- /.modal-content -->
    </div>
</div><!-- /.modal -->

<!-- 模态框:集团科目取消引用 -->
<div class="modal fade" id="view2" tabindex="0" role="dialog" 
     aria-labelledby="myModalLabel2" aria-hidden="true">
   <div class="modal-dialog">
      <div class="modal-content">
         <div class="modal-header">
            <button type="button" class="close" 
               data-dismiss="modal" aria-hidden="true">
                  &times;
            </button>
            <h4 class="modal-title" id="myModalLabel2">
               	取消集团科目引用
            </h4>
         </div>
         <div class="modal-body">
          	 
			<div class="row">
				<div class="col-md-4">
					<ul id="groupSubjectTree2" class="ztree"></ul>
				</div>
				<div class="col-md-8">
					<table class="table table-hover">
						<thead>
							<tr>
								<th>科目编码</th>
								<th>科目名称</th>
								<th>级次</th>
								<th>科目类型</th>
								<th>余额方向</th>
								<th>辅助项</th>
								<th>使用状态</th>
								<th>是否停用</th>
								<th>操作</th>
							</tr>
						</thead>
						<tbody id="groupSubjectTable2" ></tbody>
					</table>
				</div>
			</div> 
         </div>
         <div class="modal-footer">
            <button type="button" class="btn btn-default" 
               data-dismiss="modal">关闭
            </button>
         </div>
      </div><!-- /.modal-content -->
	</div><!-- /.modal -->
</div>

<!-- 模态框:科目对照差异 -->
<div class="modal fade" id="view3" tabindex="0" role="dialog" 
     aria-labelledby="myModalLabel3" aria-hidden="true">
   <div class="modal-dialog">
      <div class="modal-content">
         <div class="modal-header">
            <button type="button" class="close" 
               data-dismiss="modal" aria-hidden="true">
                  &times;
            </button>
            <h4 class="modal-title" id="myModalLabel2">
               	科目对照差异
            </h4>
         </div>
         <div class="modal-body">
				<table class="table table-bordered">	
					<thead>
						<tr>
							<td  colspan="5">
								<a class="btn btn-default" href="#" role="button" onclick="saveSubjectCompare()">保存</a>
								<a class="btn btn-default" href="#" role="button" data-toggle="modal"  data-target="#view3_1">科目差异</a>
					            <button type="button" class="btn btn-default"   data-dismiss="modal">关闭</button>
							</td>
						</tr>
					</thead>
					<tbody id="subjectCompareTable" >
					<tr>
					<td rowspan="2" align="center" valign="middle">序号</td>
					<td colspan="2" align="center">2015</td>
					<td colspan="2" align="center">2016</td>
					</tr>
					<tr>
					<td align="center">科目编码</td>
					<td align="center">科目名称</td>
					<td align="center">科目编码</td>
					<td align="center">科目名称</td>
					</tr>
					</tbody>
				</table>
         </div>
         <div class="modal-footer">
            <button type="button" class="btn btn-default" 
               data-dismiss="modal">关闭
            </button>
         </div>
      </div><!-- /.modal-content -->
	</div><!-- /.modal -->
</div>
<!-- 模态框:科目差异 -->
<div class="modal fade" id="view3_1" tabindex="0" role="dialog" 
     aria-labelledby="myModalLabel3_1" aria-hidden="true">
   <div class="modal-dialog">
      <div class="modal-content">
         <div class="modal-header">
            <button type="button" class="close" 
               data-dismiss="modal" aria-hidden="true">
                  &times;
            </button>
            <h4 class="modal-title" id="myModalLabel3_1">
               	科目差异
            </h4>
         </div>
         <div class="modal-body">
				<table class="table table-bordered">	
					<tbody id="subjectDifferenceTable" >
					<tr>
					<td rowspan="2" align="center" valign="middle">序号</td>
					<td colspan="2" align="center">2015</td>
					<td colspan="2" align="center">2016</td>
					</tr>
					<tr>
					<td align="center">科目编码</td>
					<td align="center">科目名称</td>
					<td align="center">科目编码</td>
					<td align="center">科目名称</td>
					</tr>
					</tbody>
				</table>
         </div>
         <div class="modal-footer">
            <button type="button" class="btn btn-default" 
               data-dismiss="modal">关闭
            </button>
         </div>
      </div><!-- /.modal-content -->
	</div><!-- /.modal -->
</div>
<!-- 模态框:科目批量复制 -->
<div class="modal fade" id="view4" tabindex="0" role="dialog" 
     aria-labelledby="myModalLabel4" aria-hidden="true">
   <div class="modal-dialog">
      <div class="modal-content">
         <div class="modal-header">
            <button type="button" class="close" 
               data-dismiss="modal" aria-hidden="true">
                  &times;
            </button>
            <h4 class="modal-title" id="myModalLabel4">
               	科目批量复制
            </h4>
         </div>
         <div class="modal-body">
			<div class="row">
				<div class="col-md-4">
					<ul id="groupSubjectTree4" class="ztree"></ul>
				</div>
				<div class="col-md-8">
					<table class="table table-hover">
						<thead>
							<tr>
								<td  colspan="9">
									<a class="btn btn-default" href="#" role="button" onclick="openMulCopy()">批量复制</a>
								</td>
							</tr>
							<tr>
								<th>科目编码</th>
								<th>科目名称</th>
								<th>级次</th>
								<th>科目类型</th>
								<th>余额方向</th>
								<th>辅助项</th>
								<th>使用状态</th>
								<th>是否停用</th>
								<th>操作</th>
							</tr>
						</thead>
						<tbody id="groupSubjectTable4" ></tbody>
					</table>
				</div>
			</div> 
         </div>
         <div class="modal-footer">
            <button type="button" class="btn btn-default" 
               data-dismiss="modal">关闭
            </button>
         </div>
      </div><!-- /.modal-content -->
	</div><!-- /.modal -->
</div>