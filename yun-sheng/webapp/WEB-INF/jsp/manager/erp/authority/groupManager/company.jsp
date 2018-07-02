<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML>
<html>
  <head>
    <title>公司管理</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<jsp:include page="../../../Include/import.jsp"></jsp:include>
	<link rel="stylesheet" type="text/css" href="${basePath}/js/jquery-easyui/themes/bootstrap/easyui.css?v=${version}">
	<link rel="stylesheet" type="text/css" href="${basePath}/js/jquery-easyui/themes/icon.css?v=${version}">
	<script type="text/javascript" src="${basePath}/js/jquery-easyui/jquery.easyui.min.js?v=${version}"></script>
	
	<link rel="stylesheet" type="text/css" href="${basePath}/css/erp/authority/groupManager/managerCompanyPage.css?v=${version}" />
	<!-- 菜单权限验证 -->
	<script type="text/javascript" src="${basePath}/js/erp/authority/menuValidation.js?v=${version}"></script>
	<script type="text/javascript">
		//全局变量
		var gl_groupId = ${groupId};//集团ID
		var gl_groupCode = '${groupCode}';
		var basePath = "${basePath}";
	</script>
  </head>
  <body>
	<!-- 模态框（人员公司角色授权） -->
	<div class="modal fade" id="empCompanyRoleToPowerModalDialog" tabindex="-1" role="dialog" aria-hidden="true">
		<div class="modal-dialog" style="width:850px;">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					<h4 class="modal-title">公司角色授权</h4>
				</div>
				<div class="modal-body" style="padding-bottom: 0px;">
					<div style="float: left;height: 450px;width: 350px;overflow-y: scroll;border:1px solid #ccc;">
					  <ul id="empTree2" class="ztree" style="overflow: auto;">
					  	
					  </ul>	
					</div>
					<div style="float: left;height: 300px;width: 461px;overflow-Y: auto;border:1px solid #ccc;" class="rightDIIII">
					  <ul id="empDataPowerTree2" class="ztree" style="overflow-y: scroll;">
					  	
					  </ul>
					</div>
					<div style="float: left;height: 150px;width: 461px;overflow-y: scroll;border:1px solid #ccc ;padding: 10px;" class="rightDIIII" id="roseBox">
					    
					</div>
					
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-w btn-info" onclick="saveEmpCompanyRoleToPower()">保存</button>
					<button type="button" class="btn btn-warning" data-dismiss="modal">关闭</button>
				</div>
			</div><!-- /.modal-content -->
		</div><!-- /.modal -->
	</div>

    <!-- S 主要区域 -->
	<div id="mainDIV" class="container-fluid">
		<div class="row">
			<div class="col-md-12">
				<!-- /S 工具栏开始  -->
				<div class="well" style="padding: 0px;margin-top: 20px;">
				<div id="AUTH" data-code="GSGL" class="btn-group btnHundred" role="group" style="margin-bottom: 0px;margin-top: 0px;">
			    	<button type="button" class="btn btn-default navbar-btn" id="addBtn">新增</button>
			        <button type="button" class="btn btn-default navbar-btn" id="eiditBtn">修改</button>
			        <button type="button" class="btn btn-default navbar-btn" id="delBtn" onclick="delBtn()">删除</button>
			        <button type="button" class="btn btn-default navbar-btn" id="enabledBtn" onclick="enabledBtn()">启用</button>
			        <button type="button" class="btn btn-default navbar-btn" id="disEnabledBtn" onclick="disEnabledBtn()">禁用</button>
			         <button type="button" class="btn btn-default" onclick="window.location.reload()" style="display: inline-block;">刷新 </button>
			        <button type="button" class="btn btn-default navbar-btn">导出</button>
			        <button type="button" class="btn btn-default navbar-btn">打印</button>
			        <button type="button" class="btn btn-default navbar-btn" onclick="javascript:$('#dataPowerModalDialog').modal('show');">数据授权</button>
			        <button type="button" class="btn btn-default navbar-btn" onclick="javascript:$('#empCompanyRoleToPowerModalDialog').modal('show');">公司角色授权</button>
				</div>
				</div>
			    <!-- S 工具栏 -->
			</div>
		</div>
		<div class="row" style="display: none;">
			<div class="col-md-12">
			  <h2 class="text-center" style='font-family:"Microsoft YaHei",微软雅黑,"MicrosoftJhengHei"'>公司管理</h2>
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
					    <label class="col-sm-4 control-label">公司查询:</label>
					    <div class="col-sm-8">
					      <input type="text" class="form-control" id="companyKeyWord"  maxLength=100  placeholder="请输入公司编码、名称查询"/>
					    </div>
					  </div>
				  </div>
				  <div  class="meunBtn">
					  <div class="form-group">
					    <label class="col-sm-4 control-label">显示禁用:</label>
					    <div class="col-sm-8">
					      <div class="checkbox">
					        <label>
					          <input type="checkbox" value="" id="companyStatusCheckbox"/>
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
  <script src="${basePath}/model/erp/model-company.js?v=${version}" type="text/javascript" charset="utf-8"></script>
  <script src="${basePath}/js/erp/authority/groupManager/company.js?v=${version}" type="text/javascript" charset="utf-8"></script>
  <script src="${basePath}/js/cw/bootstrap/js/validator-company.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<link rel="stylesheet" type="text/css" href="${basePath}/css/erp/check.css?v=${version}" />
	<script type="text/javascript">
		$(function(){
			checkRole('#inquire_option');
			//checkRole('#filterSearchForm');
		})
	</script>
</html>


<!-- 模态框（新增） -->
<div class="modal fade" id="addModalDialog" tabindex="-1" role="dialog" aria-hidden="true">
	<div class="modal-dialog" style="width:850px;">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				<h4 class="modal-title">新增窗口</h4>
			</div>
			<div class="modal-body">
			    <div class="col-md-2"></div>  
				<div class="col-md-7">
					<form class="form-horizontal" role="form" style="width: 100%;height: 100%;">
					  <div style="display: none;"><input type="text" class="form-control" name="groupId" value="${groupId }"></div>
					  <div class="form-group">
					    <label for="lastname" class="col-sm-4 control-label">公司编码：</label>
					    <div class="col-sm-6">
					      <input type="text" class="form-control checkCss codeAdd" name="code" placeholder=""  onblur='checkInput.checkStrNum(this,32);' />
					      <span style='color:red;'></span>
					    </div>
					  </div>
					  <div class="form-group">
					    <label for="lastname" class="col-sm-4 control-label">公司名称：</label>
					    <div class="col-sm-6">
					      <input type="text" class="form-control checkCss nameAdd" name="name" placeholder=""  onblur='checkInput.checkNotChars(this,32);' />
					      <span style='color:red;'></span>
					    </div>
					  </div>			  
					  <div class="form-group">
					    <label for="firstname" class="col-sm-4 control-label">所属上级：</label>
					    <div class="col-sm-6">
					      <input class="easyui-combotree" id="addParentIdTree" name="parentId" data-options="url:'${basePath}/Tcompany/findTreeForEasyUI?groupId=${groupId }',method:'post'" style="width:171px;height:32px;">
					    </div>
					  </div>
					  <div class="form-group">
					    <label for="lastname" class="col-sm-4 control-label">区域：</label>
					    <div class="col-sm-6">
					      <input class="easyui-combotree checkCss" id="addParentAreaIdTree" name="areaId" data-options="url:'${basePath}/Tarea/findTreeForEasyUI?groupId=${groupId}',method:'post'" style="width:171px;height:32px;">
					    </div>
					  </div>
					  <div class="form-group" style="display: none;">
					    <label for="lastname" class="col-sm-4 control-label">分期商：</label>
					    <div class="col-sm-6">
							<select class="selectpicker checkCss" data-style="btn" multiple id="fqsIdsSelect" name="fqsIds">
							</select>
					    </div>
					  </div>
					  <div class="form-group">
					    <label for="lastname" class="col-sm-4 control-label">备注：</label>
					    <div class="col-sm-6">
					      <input type="text" class="form-control checkCss" name="remark" placeholder="" maxLength=100 />
					    </div>
					  </div>
					  <div class="form-group">
					    <label for="lastname" class="col-sm-4 control-label">管理员工号：</label>
					    <div class="col-sm-6">
					      <input type="text" class="form-control checkCss" name="adminLogin" placeholder="" readonly="readonly">
					    </div>
					  </div>
					  <div class="form-group">
					    <label for="lastname" class="col-sm-4 control-label">管理员密码：</label>
					    <div class="col-sm-6">
					      <input type="text" class="form-control checkCss" name="adminPwd" placeholder="" value="123456" readonly="readonly">
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
				<div class="col-md-3" id="dataPowerDIV">
				  <h4 style='font-family:"Microsoft YaHei",微软雅黑,"MicrosoftJhengHei"'>功能启用：</h4>
				  <ul id="dataPowerTree" class="ztree">
				  	
				  </ul>
				</div>

			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-w btn-danger" onclick="addSave(1);">保存后新增</button>
				<button type="button" class="btn btn-w btn-info" onclick="addSave(2);">保存后关闭</button>
				<button type="button" class="btn btn-warning" data-dismiss="modal">仅关闭</button>
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal -->
</div>


<!-- 模态框（修改） -->
<div class="modal fade" id="eiditModalDialog" tabindex="-1" role="dialog" aria-hidden="true">
	<div class="modal-dialog" style="width:850px;">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				<h4 class="modal-title">修改窗口</h4>
			</div>
			<div class="modal-body">
			    <div class="col-md-2"></div>  
				<div class="col-md-7">
					<form class="form-horizontal" role="form" style="width: 100%;height: 100%;">
					  <div style="display: none;">
						<input type="text" class="form-control" name="id" >
						<input type="text" class="form-control" name="groupId" >
					  </div>
					  <div class="form-group">
					    <label for="lastname" class="col-sm-4 control-label">公司编码：</label>
					    <div class="col-sm-6">
					      <input type="text" class="form-control checkCss codeUp" name="code" placeholder="" disabled="disabled">
					      <span style='color:red;'></span>
					    </div>
					  </div>
					  <div class="form-group">
					    <label for="lastname" class="col-sm-4 control-label">公司名称：</label>
					    <div class="col-sm-6">
					      <input type="text" class="form-control checkCss nameUp" name="name" placeholder=""  onblur='checkInput.checkNotChars(this,32);' />
					      <span style='color:red;'></span>
					    </div>
					  </div>			  
					  <div class="form-group">
					    <label for="firstname" class="col-sm-4 control-label">所属上级：</label>
					    <div class="col-sm-6">
					      <input class="easyui-combotree" id="eiditParentIdTree" name="parentId" data-options="url:'${basePath}/Tcompany/findTreeForEasyUI?groupId=${groupId}',method:'post'" style="width:171px;height:32px;">
					    </div>
					  </div>
					  <div class="form-group">
					    <label for="lastname" class="col-sm-4 control-label">区域：</label>
					    <div class="col-sm-6">
					      <input class="easyui-combotree checkCss" id="eiditParentAreaIdTree" name="areaId" data-options="url:'${basePath}/Tarea/findTreeForEasyUI?groupId=${groupId}',method:'post'" style="width:171px;height:32px;">
					    </div>
					  </div>
					  <div class="form-group" style="display: none;">
					    <label for="lastname" class="col-sm-4 control-label">分期商：</label>
					    <div class="col-sm-6">
							<select class="selectpicker checkCss" data-style="btn" multiple id="fqsIdsSelect2" name="fqsIds">
							</select>
					    </div>
					  </div>
					  <div class="form-group">
					    <label for="lastname" class="col-sm-4 control-label">备注：</label>
					    <div class="col-sm-6">
					      <input type="text" class="form-control checkCss" name="remark" placeholder="" maxLength=100 />
					    </div>
					  </div>
					  <div class="form-group">
					    <label for="lastname" class="col-sm-4 control-label">管理员工号：</label>
					    <div class="col-sm-6">
					      <input type="text" class="form-control checkCss" name="adminLogin" placeholder="" readonly="readonly">
					    </div>
					  </div>
					  <div class="form-group">
					    <label for="lastname" class="col-sm-4 control-label">管理员密码：</label>
					    <div class="col-sm-6">
					      <input type="password" class="form-control checkCss" name="adminPwd" placeholder="" value="123456" readonly="readonly">
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
				<div class="col-md-3" id="dataPowerDIV2">
				  <h4 style='font-family:"Microsoft YaHei",微软雅黑,"MicrosoftJhengHei"'>功能启用：</h4>
				  <ul id="dataPowerTree2" class="ztree">
				  	
				  </ul>
				</div>

			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-w btn-info" onclick="eiditSave();">保存后关闭</button>
				<button type="button" class="btn btn-warning" data-dismiss="modal">仅关闭</button>
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal -->
</div>

<!-- 模态框（数据授权） -->
<div class="modal fade" id="dataPowerModalDialog" tabindex="-1" role="dialog" aria-hidden="true">
	<div class="modal-dialog" style="width:850px;">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				<h4 class="modal-title">数据授权窗口</h4>
			</div>
			<div class="modal-body">
				<div class="col-sm-6">
				  <ul id="empTree" class="ztree" style="border: 1px #ccc solid;max-height: 400px;overflow: auto;">
				  	
				  </ul>	
				</div>
				<div class="col-sm-6" id="rightTreeInfo" style="display: none;">
				请选择授权职员!
				</div>
				<div class="col-sm-6" id="rightTree">
				  <form class="form-horizontal" role="form">
					  <div class="form-group">
					    <label class="col-sm-3 control-label">查询公司:</label>
					    <div class="col-sm-8">
					      <input type="text" class="form-control" id="searchCompanyKeyWord">
					    </div>
					  </div>
				  </form>
				  <ul id="empDataPowerTree" class="ztree" style="border: 1px #ccc solid;max-height: 300px;overflow: auto;">
				  	
				  </ul>
				</div>

			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-w btn-info" onclick="saveEmpDataPower()">保存</button>
				<button type="button" class="btn btn-warning" data-dismiss="modal">关闭</button>
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal -->
</div>





