<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>

	<head>
		<meta charset="utf-8" />
		<meta name="renderer" content="webkit" />
		<meta http-equiv="X-UA-Compatible" content="IE=9; IE=8; IE=7; IE=EDGE ; chrome=1" />
		<link rel="stylesheet" type="text/css" href="${basePath}/css/base.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="../../css/bootstrap.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="../../css/jquery-ui.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="../../js/skins/all.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="../../css/animate.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="../../css/bootstrap-select.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="../../css/font-awesome.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="../../css/iconfont.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="../../css/pagecss/treepage.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="../../css/jquery.datetimepicker.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="../../css/ui.jqgrid-bootstrap.css?v=${version}"/>
		
		<link rel="stylesheet" type="text/css" href="../../css/admin/blocMessage.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="../../css/cw/zTreeStyle/zTreeStyle_.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="../../css/admin/roleMsg.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="../../css/market/public.css?v=${version}" />
		<title>内置角色信息</title>
		
	</head>

	<body >

		<!-------------------------------------主页面开始----------------------------------------->
		   <div class="btn-group btnHundred" role="group" >
			  <button type="button" class="btn btn-default" onclick="addRole()">新增</button>
			  <button type="button" class="btn btn-default" onclick="updateRole()">修改</button>
			  <button type="button" class="btn btn-default" data-eventname="printbtn">导出</button>
			  <button type="button" class="btn btn-default" data-eventname="printbtn">打印</button>
			</div>
			
			<div class="grid-title">内置角色信息</div>
			<!-------------------------------------搜索条件开始----------------------------------------->
			<!--main开始-->
			<div class="container" style="width:100%;">
				<div class="left">
					<div class="left-s">授权菜单</div>
					<div class="left_tree">
						<ul id="metaDataTree" class="ztree"></ul>
					</div>
				</div>
				<!--展示列表开始-->
				<div class="details">
					<div class="right">
						<span>授权明细</span>
						<span>选择角色：<select id="roleSelect" style="width:200px;"></select></span>
						<span>数据操作授权<input type="checkbox" class="shou-checkbox" /></span>
					</div>
					<!--表格-->
					<div class="jqGrid_wrap">
						<table id="jqGrid_metaData" class="zxsaastable ui-jqgrid-btable ui-common-table table table-bordered" style="text-align:center;">
						</table> 
	    				<div id="gridpager"></div>
					</div>
				</div>
				<!--展示列表结束-->
			</div>
		<!--main结束-->
		
		<!--内置角色新增弹出窗-->
		<!-- 模态框（Modal） -->
		<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true" onclick="closeOnly();">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							内置角色新增
						</h4>
					</div>
					<div class="modal-body">
						
						<div class="container">
							<div class="left">
								<div class="left-s">授权菜单</div>
								<div class="left_tree">
									<ul id="roleDataTree" class="ztree"></ul>
								</div>
							</div>
							<!--展示列表开始-->
							<div class="details">
								<div class="right">
									<span>新建角色名称：<input type="text" id="addRoleName" onblur='checkInput.checkNotChars(this,32);'/>
										</span><span class="msg" style='margin-left:0px;color:red;'></span>
									<span>数据操作授权<input type="checkbox" class="shou-checkbox-add" /></span>
								</div>
								<!--表格-->
								<div class="jqGrid_wrap">
									<table id="jqGrid_roleMsgAdd" class="zxsaastable ui-jqgrid-btable ui-common-table table table-bordered" style="text-align:center;"></table> 
				    				<div id="gridpager"></div>
								</div>
							</div>
							<!--展示列表结束-->
						</div>
						
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-info" onclick="saveAndClose();">保存后关闭</button>
						<button type="button" class="btn btn-warning" data-dismiss="modal" onclick="closeOnly();">仅关闭</button>
					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>
		
		<!--内置角色修改弹出窗-->
		<!-- 模态框（Modal） -->
		<div class="modal fade" id="modalUpdate" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" >
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true" onclick="closeOnly();">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							内置角色修改 
						</h4>
					</div>
					<div class="modal-body">
						
						<div class="container">
							<div class="left">
								<div class="left-s">授权菜单</div>
								<div class="left_tree">
									<ul id="roleUpdateTree" class="ztree"></ul>
								</div>
							</div>
							<!--展示列表开始-->
							<div class="details">
								<div class="right">
									<span>角色名称：<input type="text" id="updateRoleName" onblur='checkInput.checkNotChars(this,32);'/><input type="hidden" id="updateRoleId" value=""/>
										</span><span class="msg" style='margin-left:0px;color:red;'></span>
									<span>数据操作授权<input type="checkbox" class="shou-checkbox-update" /></span>
								</div>
								<!--表格-->
								<div class="jqGrid_wrap">
									<table id="jqGrid_roleMsgUpdate" class="zxsaastable ui-jqgrid-btable ui-common-table table table-bordered" style="text-align:center;"></table> 
				    				<div id="gridpager"></div>
								</div>
							</div>
							<!--展示列表结束-->
						</div>
						
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-info" onclick="updateAndClose();">保存后关闭</button>
						<button type="button" class="btn btn-warning" data-dismiss="modal" onclick="closeOnly();">仅关闭</button>
					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>
		
		
		<!-------------------------------------主页面结束----------------------------------------->
		
	</body>
	<script src="${basePath}/js/jquery-1.12.4.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script type="text/javascript" src="${basePath}/js/base.js?v=${version}"></script>
	<script src="../../js/bootstrap.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="../../js/jquery.jqGrid.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="../../js/jquery.datetimepicker.full.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="../../js/grid.locale-cn.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="../../js/commonjs/xm.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="../../js/zxsaas_plus.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="../../js/erp/authority/role-accredit.js?v=2.4.1" type="text/javascript" charset="utf-8"></script>
	<script src="../../js/cw/jquery.ztree.all-3.5.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<link rel="stylesheet" type="text/css" href="../../js/cw/bootstrap/css/bootstrapValidator.css?v=${version}" />
	<link rel="stylesheet" type="text/css" href="../../css/market/public.css?v=${version}" />
	<script src="../../js/bootstrapValidator.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="../../js/cw/bootstrap/js/validator-company.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	
	<script type="text/javascript">
		$(function(){
			//checkRole('#inquire_option');
			//checkRole('#filterSearchForm');
		})
	</script>
	<%--<script src="../../js/erp/authority/common.js?v=1.231.5" type="text/javascript" charset="utf-8"></script>
--%></html>


