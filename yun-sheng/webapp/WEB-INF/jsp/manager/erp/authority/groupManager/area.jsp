<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML>
<html>
  <head>
    <title>区域档案管理</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<jsp:include page="../../../Include/import.jsp"></jsp:include>
	<link rel="stylesheet" type="text/css" href="${basePath}/js/jquery-easyui/themes/bootstrap/easyui.css?v=${version}">
	<link rel="stylesheet" type="text/css" href="${basePath}/js/jquery-easyui/themes/icon.css?v=${version}">
	<script type="text/javascript" src="${basePath}/js/jquery-easyui/jquery.easyui.min.js?v=${version}"></script>
	<link rel="stylesheet" type="text/css" href="${basePath}/css/erp/authority/groupManager/managerAreaPage.css?v=${version}" />
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
			<div class="col-md-12">
				<!-- /S 工具栏开始  -->
				<div class="well" style="padding: 0px;margin-top: 20px;">
					<div id="AUTH" data-code="QYDA" class="btn-group btnHundred" role="group" style="margin-bottom: 0px;margin-top: 0px;">
				    	<button type="button" class="btn btn-default navbar-btn" id="addBtn">新增</button>
				        <button type="button" class="btn btn-default navbar-btn" id="eiditBtn">修改</button>
				        <button type="button" class="btn btn-default navbar-btn" id="delBtn">删除</button>
				        <button type="button" class="btn btn-default navbar-btn" id="enabledBtn">启用</button>
				        <button type="button" class="btn btn-default navbar-btn" id="disEnabledBtn">禁用</button>
				        <button type="button" class="btn btn-default" onclick="window.location.reload()" style="display: inline-block;">刷新 </button>
				        <button type="button" class="btn btn-default navbar-btn">导出</button>
				        <button type="button" class="btn btn-default navbar-btn">打印</button>
					</div>
				</div>
			    <!-- S 工具栏 -->
			</div>
		</div>
		<div class="row" style="display: none;">
			<div class="col-md-12">
			  <h2 class="text-center" style='font-family:"Microsoft YaHei",微软雅黑,"MicrosoftJhengHei"'>区域档案</h2>
			</div>
		</div>
		<div class="row">
			<div class="col-md-12">
			  <ul id="dataTree" class="ztree" style="float: left;">
			  </ul>
			  <div class="menuTools" style="float: left;">
				<form class="form-horizontal" role="form">
				  <div  class="meunBtn">
					  <div class="form-group">
					    <label class="col-sm-4 control-label">区域查询:</label>
					    <div class="col-sm-8">
					      <input type="text" class="form-control" id="areaKeyWord" maxLength=256 placeholder="请输入区域编码、名称查询"/>
					    </div>
					  </div>
				  </div>
				  <div  class="meunBtn" style="width: 260px;">
					  <div class="form-group">
					    <label class="col-sm-4 control-label">显示禁用:</label>
					    <div class="col-sm-8">
					      <div class="checkbox">
					        <label>
					          <input type="checkbox" value="" id="areaStatusCheckbox"/>
					        </label>
					      </div>
					    </div>
					  </div>
				  </div>  
				</form>
			  </div>
			  <div class="jqGrid_wrapper" style="float: left;">
				<table id="dataGrid"></table> 
   				<div id=jqGridPager></div>
			  </div>
			</div>
		</div>
	    
	</div><!-- /E 主要区域 -->

  </body>
  
  <!--加载自定义JS -->
  <script src="${basePath}/model/erp/model-area.js?v=${version}" type="text/javascript" charset="utf-8"></script>
  <script src="${basePath}/js/erp/authority/groupManager/area.js?v=${version}" type="text/javascript" charset="utf-8"></script>
  <script src="${basePath}/js/cw/bootstrap/js/validator-company.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<link rel="stylesheet" type="text/css" href="${basePath}/css/erp/check.css?v=${version}" />
	<!-- 菜单权限验证 -->
	<script type="text/javascript" src="${basePath}/js/erp/authority/menuValidation.js?v=${version}"></script>
	<script type="text/javascript">
		$(function(){
			checkRole('#inquire_option');
			//checkRole('#filterSearchForm');
		})
	</script>
</html>

<!-- 模态框（新增） -->
<div class="modal fade" id="addModalDialog" tabindex="-1" role="dialog" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				<h4 class="modal-title">新增区域</h4>
			</div>
			<div class="modal-body">
				<form class="form-horizontal" role="form" style="width: 100%;height: 100%;">
				  <div class="form-group">
				    <label for="firstname" class="col-sm-4 control-label">集团：</label>
				    <div class="col-sm-6">
				      <select class="form-control input-sm checkCss" name="groupId">
				         <option value="${groupId}">${SESSION_KEY_USER.groupName }</option>
				      </select>
				    </div>
				  </div>
				  <div class="form-group">
				    <label for="lastname" class="col-sm-4 control-label">上级区域：</label>
				    <div class="col-sm-6">
				       <input class="easyui-combotree" id="addParentIdTree" name="parentId" data-options="url:'${basePath}/Tarea/findTreeForEasyUI?groupId=${groupId}',method:'post'" style="width:221px;height:32px;">
				    	<span style='color:red;'></span>
				    </div>
				  </div>
				  <div class="form-group">
				    <label for="lastname" class="col-sm-4 control-label">区域编码：</label>
				    <div class="col-sm-6">
				      <input type="text" class="form-control checkCss codeAdd" name="code" placeholder="" onblur='checkInput.checkStrNum(this,32);' />
				   		<span style='color:red;'></span>
				    </div>
				  </div>
				  <div class="form-group">
				    <label for="lastname" class="col-sm-4 control-label">区域名称：</label>
				    <div class="col-sm-6">
				      <input type="text" class="form-control checkCss nameAdd" name="name" placeholder="" onblur='checkInput.checkStr(this,32);' />
				    	<span style='color:red;'></span>
				    </div>
				  </div>
				  <div class="form-group">
				    <label for="lastname" class="col-sm-4 control-label">备注：</label>
				    <div class="col-sm-6">
				      <input type="text" class="form-control checkCss" name="remark" placeholder="" onblur='checkInput.checkStr(this,100);' />
				    	<span style='color:red;'></span>
				    </div>
				  </div>
				  <div class="form-group">
				    <div class="col-sm-offset-4 col-sm-6">
				      <div class="checkbox">
				        <label>
				          <input type="checkbox" name="status">是否禁用：
				        </label>
				      </div>
				    </div>
				  </div>
				</form>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-danger" id="addBtnAndAdd">保存后新增</button>
				<button type="button" class="btn btn-info" id="addBtnAndClose">保存后关闭</button>
				<button type="button" class="btn btn-warning" data-dismiss="modal">仅关闭</button>
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal -->
</div>

<!-- 模态框（编辑） -->
<div class="modal fade" id="eiditModalDialog" tabindex="-1" role="dialog" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				<h4 class="modal-title">编辑区域</h4>
			</div>
			<div class="modal-body">
				<form class="form-horizontal" role="form" style="width: 100%;height: 100%;">
				  <div style="display: none;">
					<input type="text" class="form-control" name="id" >
				  </div>
				  <div class="form-group">
				    <label for="firstname" class="col-sm-4 control-label">集团：</label>
				    <div class="col-sm-6">
				      <select class="form-control input-sm checkCss" name="groupId">
				         <option value="${groupId}">${SESSION_KEY_USER.groupName }</option>
				      </select>
				    </div>
				  </div>
				  <div class="form-group">
				    <label for="lastname" class="col-sm-4 control-label">上级区域：</label>
				    <div class="col-sm-6">
				       <input class="easyui-combotree" id="eiditParentIdTree" name="parentId" data-options="url:'${basePath}/Tarea/findTreeForEasyUI?groupId=${groupId}',method:'post'" style="width:221px;height:32px;">
				    	<span style='color:red;'></span>
				    </div>
				  </div>
				  <div class="form-group">
				    <label for="lastname" class="col-sm-4 control-label">区域编码：</label>
				    <div class="col-sm-6">
				      <input type="text" class="form-control checkCss codeUp" name="code" placeholder="" onblur='checkInput.checkStrNum(this,32);' />
				    	<span style='color:red;'></span>
				    </div>
				  </div>
				  <div class="form-group">
				    <label for="lastname" class="col-sm-4 control-label">区域名称：</label>
				    <div class="col-sm-6">
				      <input type="text" class="form-control checkCss nameUp" name="name" placeholder="" onblur='checkInput.checkStr(this,32);' />
				    	<span style='color:red;'></span>
				    </div>
				  </div>
				  <div class="form-group">
				    <label for="lastname" class="col-sm-4 control-label">备注：</label>
				    <div class="col-sm-6">
				      <input type="text" class="form-control checkCss" name="remark" placeholder="" onblur='checkInput.checkStr(this,100);' />
				    </div>
				  </div>
				  <div class="form-group">
				    <div class="col-sm-offset-4 col-sm-6">
				      <div class="checkbox">
				        <label>
				          <input type="checkbox" name="status">是否禁用：
				        </label>
				      </div>
				    </div>
				  </div>
				</form>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-danger" id="saveDataBtn">保存</button>
				<button type="button" class="btn btn-warning" data-dismiss="modal">关闭</button>
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal -->
</div>