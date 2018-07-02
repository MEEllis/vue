<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<meta name="renderer" content="webkit" />
		<meta http-equiv="X-UA-Compatible" content="IE=9; IE=8; IE=7; IE=EDGE ; chrome=1" />
		<link rel="stylesheet" type="text/css" href="${basePath}/css/base.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/bootstrap.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="${basePath}/css/jquery-ui.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="${basePath}/js/skins/all.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="${basePath}/css/animate.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/bootstrap-select.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/font-awesome.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/iconfont.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/pagecss/treepage.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/jquery.datetimepicker.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/ui.jqgrid-bootstrap.css?v=${version}"/>
		  
		<link rel="stylesheet" type="text/css" href="${basePath}/css/admin/blocMessage.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/cw/zTreeStyle/zTreeStyle.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/html/muti_select/multi.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="${basePath}/css/admin/roleMsg.css?v=${version}" />
		
		<link rel="stylesheet" type="text/css"
	href="${basePath}/css/market/public.css?v=${version}" />
		<title>角色管理</title>
		
	</head>
    <style>
    .grid-title {
       margin-top: 0;
       margin-bottom: 1rem;
       padding-top: 3.5rem;
       padding-bottom: 0.5rem;
       background-color: #f5f5f5;
    }
    .left {
	    border-right: 1px solid #cfcfcf;
    }
    .details{
        width:85%;
        
	    
    }
    .details div.right{
        height: 54px;
        padding-top: 15px;
        padding-left:6px;
        margin-bottom: 0px; 
    }
    .left_tree{
        padding-left: 13%;
    }
    .left div.left-s
    {    
        height: 54px;
        padding-top: 15px;
        padding-left:6px;
        border-bottom: 1px solid #cfcfcf;
        margin-bottom: 0px; 
    }
    </style>
	<body >

		<!-------------------------------------主页面开始----------------------------------------->
		   <div class="btn-group btnHundred" role="group" >
			  <button type="button" class="btn btn-default addNew" >新增</button>
			  <button type="button" class="btn btn-default modify" >修改</button>
			  <button type="button" class="btn btn-default" data-eventname="printbtn">导出</button>
			  <button type="button" class="btn btn-default" data-eventname="printbtn">打印</button>
			  <button class="bn" onclick="setReload()">刷新 </button>
			  <button type="button" class="btn btn-default rel" data-eventname="printbtn" data-toggle="modal" data-target="#myModalRel">角色关联人员</button>
			</div>
			
			<div class="grid-title">角色信息</div>
			<!-------------------------------------搜索条件开始----------------------------------------->
			<!--main开始-->
			<div class="" style="width=100%;height:auto;overflow:hidden;border: 1px solid #cfcfcf;border-radius: 3px;">
				<div class="left">
					<div class="left-s">授权菜单</div>
					<div class="left_tree">
						<ul id="metaDataTree" class="ztree"></ul>
					</div>
				</div>
				<!--展示列表开始-->
				<div class="details">
					<div class="right" style="border-bottom: 1px solid #cfcfcf;">
						<span>授权明细</span>
						<span>选择角色：<select id="roleSelect"  style="width:148px;height:28px;border:1px solid #cfcfcf;"></select></span>
						<span>数据操作授权<input type="checkbox" class="shou-checkbox" /></span>
					</div>
					<!--表格-->
					<div class="jqGrid_wrap" id="jqwrap">
						<table id="jqGrid_metaData" class="zxsaastable table table-bordered" style="text-align:center;">
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
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true" onclick="">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							角色新增
						</h4>
					</div>
					<div class="modal-body">
						
						<div class="" style="height:auto;overflow: hidden; border: 1px solid #cfcfcf;border-radius:3px">
							<div class="left">
								<div class="left-s">授权菜单</div>
								<div class="left_tree">
									<ul id="roleDataTree" class="ztree"></ul>
								</div>
							</div>
							<!--展示列表开始-->
							<div class="details">
								<div class="right">
									<span>新建角色名称：<input type="text" id="addRoleName" maxLength=32 style="width:148px;height:28px;border:1px solid #cfcfcf"/>
										</span>
									<span>数据操作授权<input type="checkbox" class="shou-checkbox-add" /></span>
								</div>
								<!--表格-->
								<div class="jqGrid_wrap" style="width:100%" id="add_jqwrap">
									<table id="jqGrid_roleMsgAdd" class="zxsaastable ui-jqgrid-btable ui-common-table table table-bordered" style="text-align:center;"></table> 
				    				<div id="gridpager"></div>
								</div>
							</div>
							<!--展示列表结束-->
						</div>
						
					</div>
					<div class="modal-footer">
					   	<button type="button" class="btn btn-success save_add" >保存并新增</button>
						<button type="button" class="btn btn-info save_add" data-dismiss="modal">保存后关闭</button>
						<button type="button" class="btn btn-warning" data-dismiss="modal" >仅关闭</button>
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
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true" data-dismiss="modal">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							内置角色修改 
						</h4>
					</div>
					<div class="modal-body">
						
						<div class="" style="height:auto;overflow: hidden; border: 1px solid #cfcfcf;border-radius:3px">
							<div class="left">
								<div class="left-s">授权菜单</div>
								<div class="left_tree">
									<ul id="roleUpdateTree" class="ztree"></ul>
								</div>
							</div>
							<!--展示列表开始-->
							<div class="details">
								<div class="right">
									<span>角色名称：<input type="text" id="updateRoleName" maxLength=32 style="width:148px;height:28px;border:1px solid #cfcfcf"/><input type="hidden" id="updateRoleId" value="" />
										</span>
									<span>数据操作授权<input type="checkbox" class="shou-checkbox-update" /></span>
								</div>
								<!--表格-->
								<div class="jqGrid_wrap" style="width:100%" id="update_jqwrap">
									<table id="jqGrid_roleMsgUpdate" class="zxsaastable  table table-bordered" style="text-align:center;"></table> 
				    				<div id="gridpager"></div>
								</div>
							</div>
							<!--展示列表结束-->
						</div>
						
					</div>
					<div class="modal-footer">

                        <button type="button" class="btn btn-success update_close">保存</button>
						<button type="button" class="btn btn-info update_close"  data-dismiss="modal">保存后关闭</button>
						<button type="button" class="btn btn-warning" data-dismiss="modal" >仅关闭</button>

					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>
		
		<!--角色关联人员弹出窗-->
		<!-- 模态框（Modal） -->
		<div class="modal fade" id="myModalRel" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog model-dialog2">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							角色关联人员
						</h4>
					</div>
					<div class="modal-body" id="model-body">
						<div class="showTab">
							<div class="current change">
								<div class="collapse in" id="collapseExample">
						 			 <div class="">
											<form id="inquire_option">
													<div class="search">
														<div class="search-sp up">
															<span for="" class="">选择关联角色：</span>
															<select name="" class="roleS" id="roleS">
															</select>
														</div>
														<!--<div class="search-sp up">
															<span class="">职位名称：</span>
															<select name="" class="zwmc">
																<option value="0">老司机</option>
																<option value="1">达达</option>
															</select>
														</div>
														<div class="search-sp up">
															<span class="">部门名称：</span>
															<select name="" class="bmmc">
																<option value="0">老司机</option>
																<option value="1">达达</option>
															</select>
														</div>
														<div class="search-sp up">
															<span for="" class="">员工名称：</span><input type="text" class="ygmc" />
														</div>
														--><!--<div class="search-sp up">
															 <button type="button" class="btn btn-success">查询</button>
														</div>
													--></div>
											</form>
									 </div>
								</div>
								<div class="tablebox retailDetailTable">
									<div class="grid-wrap" style="margin-top:10px">
										<table id="jqGrid_empMa" class="zxsaastable">
										</table>
										<div id="jqGridPager_empMa"></div>
									</div>
								</div>
								
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-success saveAdd" >保存并新增</button>
						<button type="button" class="btn btn-info saveRoles" data-dismiss="modal">保存后关闭</button>
						<button type="button" class="btn btn-warning" data-dismiss="modal">仅关闭</button>
					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>
		
		<!-------------------------------------主页面结束----------------------------------------->
		
	</body>
	<script src="${basePath}/js/jquery-1.12.4.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script type="text/javascript" src="${basePath}/js/base.js?v=${version}"></script>
	<script src="${basePath}/js/bootstrap.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/jquery.jqGrid.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/jquery.datetimepicker.full.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/grid.locale-cn.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/commonjs/xm.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/zxsaas_plus.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/cw/jquery.ztree.all-3.5.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/erp/authority/role.js?v=2.19.1" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/erp/authority/common.js?v=1.221.5" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/html/muti_select/MultiSelectDropList.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/cw/bootstrap/js/validator-company.js?v=${version}" type="text/javascript" charset="utf-8"></script>
    <script type="text/javascript">
    	function setReload(){
    	window.location.reload();
	}
    </script>
</html>


