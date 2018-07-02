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
		<link rel="stylesheet" type="text/css" href="../../css/market/public.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="${basePath}/js/cw/bootstrap/css/bootstrapValidator.css?v=${version}" />
		
		<title>元数据维护</title>
		
		<style type="text/css">
			.ui-th-ltr{text-align:center;}
			.grid-title {
			    clear: both;
			    font-size: 24px;
			    text-align: center;
			    width: 100%;
			}
			.grid-head{
			width: 100%;
			font-size:16px;
			height:30px;
			}
			.grid-head .grid-date{
			display:inline-block;
			float:left;
			padding-left:20px;
			}
			.grid-head .grid-yuan{
			display:inline-block;
			float:right;
			padding-right:30px;
			}
			.grid-status{
			position:absolute;
			top:60px;
			right:50px;
			width:500px;
			height:30px;
			color:red;
			font-size:18px;
			text-align: right;
			}
			.parent{
				background-color:#f5f5f5;
			}
			.searchDate div{
				float: left;
				width: 250px;
			}
			.searchDate div input{
				float: left;
			}
			.searchDate div span{
				display:inline-block;
				float: left;
			}
			.searchDate{
				height: 30px;
				
			}
			#collapseExample{
				height: 90px;
			}
			#collapseExample .well{
				padding: 0px;
			}
			
			.change form div{
				margin: 1rem 11rem 0 11rem;
			}
			.showTab{
				height: 258px;
			}
			
			.change form label{
				width:10rem;
				text-align: right;
				margin-right: 3rem;
			}
			.change form input{
				width:14.5rem;
			}
			.change form div input.textLeft{
				width: 1rem;
			}
			.change form select{
				width:14.5rem;
			}
			#model-body{
				padding: 2rem 2rem 2rem 6rem;
			}
			
			
			.left{
				width: 15%;
				float: left;
			}
			.details{
				width: 73%;
				float: left;
			}
			
			.grid-title{
				margin-top: 3.5rem;
				margin-bottom: 1.5rem;
				font-size: 30px;
				font-weight: 700;
			}
			
			.left div.left-s,.details div.right{
				margin-bottom: 1.5rem;
				font-size: 20px;
				font-weight: 700;
			}
			
			.details > div span:nth-child(2){
				font-size: 16px;
				font-weight: normal;
				margin-left: 28rem;
			}
			
			.details > div span:nth-child(2) input{
				margin-left: .8rem;
			}
			
			.ztree li{
				line-height: 25px;
			}
			.ztree li a.curSelectedNode{
				height: 25px;
			}
			.ztree li a {
				height: 25px;
			}
			#metaDataTree span{
				font-size: 14px;
				font-weight: normal;
			}
			
			.showTab .change {
				/*width: 400px;
				height: 300px;*/
				display: none;
			}
			
			.showTab .current {
				display: block;
			}
			
			.div-center{
				text-align: center;
				font-size: 20px;
			}
			
			.modelUpdate,.operUpdate,.fnUpdate{
				float: left;
			}
			
			.operUpdate{
				margin-left:2rem ;
				margin-right: 2rem;
			}
			
			@media (min-width: 768px){
				.modal-dialog {
				    width: 800px;
				    margin: 30px auto;
				}
			}
			
			.modelUpdate-title{
				padding: 2rem 0;
				text-align: center;
			}
			
			.modelUpdate-table{
				border: 1px solid #9D9D9D;
				width: 193px;
				//height: 200px;
			}
			.modelUpdate-table tr td{
				border: 1px solid #9D9D9D;
				text-align: center;
			}
			
			.modelUpdate-table tr td a:nth-child(1){
				margin-right: .5rem;
			}
			.modelUpdate-table tr td:nth-child(1){
				display: none;
			}
			.modelUpdate-table tr{
				height: 26px;
			}
			.table-show{
				height: 200px;
				width: 210px;
				overflow-y: auto;
			}
			.modelUpdate-table tr td a{
				cursor: pointer;
			}
			
			.left_tree{
				height: 450px;
				overflow: auto;
			}
			
			
	</style>
	</head>

	<body >

		<!-------------------------------------主页面开始----------------------------------------->
			<div class="well">
			<div class="btn-group btnHundred" role="group" >
			  <button type="button" class="btn btn-default" onclick="add();">新增</button>
			  <button type="button" class="btn btn-default" onclick="updateOrDelete();">修改/删除</button>	
			  <button type="button" class="btn btn-default" data-eventname="printbtn">导出</button>
			  <button type="button" class="btn btn-default" data-eventname="printbtn">打印</button>
			</div>
			</div>
			</div>
			<div class="grid-title">元数据维护</div>
			<!-------------------------------------搜索条件开始----------------------------------------->
			<!--main开始-->
			<div class="container" style="width:100%;" >
				<div class="left">
					<div class="left-s">授权菜单</div>
					<div class="left_tree">
						<ul id="metaDataTree" class="ztree"></ul>
					</div>
				</div>
				<!--展示列表开始-->
				<div class="details">
					<div class="right"><span>授权明细</span><span>数据操作授权<input type="checkbox" class="shou-checkbox" /></span></div>
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

		
			<!--元数据新增弹出窗-->
		<!-- 模态框（Modal） -->
		<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true" onclick="closeModal();">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							新增设置 
						</h4>
					</div>
					<div class="modal-body">
						<ul class="nav nav-tabs tab">
							<li role="presentation" class="active toggle">
								<a href="javascript:void(0)">模块新增</a>
							</li>
							<li role="presentation" class="toggle">
								<a href="javascript:void(0)">操作新增</a>
							</li>
							<li role="presentation" class="toggle">
								<a href="javascript:void(0)">功能新增</a>
							</li>
						</ul>
						<div class="showTab">
							<div class="current change">
								<div class="div-center">模块新增</div>
								<form id="moduleAddForm" >
									<div class="">
										<label for="">模块类别:</label>
										<select  name="moduleType"></select>
									</div>
									<div class="">
										<label for="">模块名:</label>
										<select name="resourceId"></select>
									</div>
									<div class="">
										<label for="">备注:</label>
										<input type="text" name="remark" maxLength=100 />
										<span class="msg"></span>
									</div>
									<div class="">
										<label for="">是否在前端显示:</label>
											<input type="checkbox" class="textLeft" name="isShow" checked="checked"/>
									</div>
								</form>
							</div>
							<div class="change">
								<div class="div-center">操作新增</div>
								<form id="opAddForm">
									<div class="">
										<label for="">绑定模块类别:</label>
										<select name="modeuleId" ></select>
									</div>
									<div class="">
										<label for="">操作类别:</label>
										<select name="opType" ></select>
									</div>
									<div class="">
										<label for="">操作名:</label>
										<select name="resourceId"></select>
									</div>
									<div class="">
										<label for="">备注:</label>
										<input type="text"  name="remark" maxLength=100 />
									</div>
									<div class="">
										<label for="">是否在前端显示:</label>
											<input type="checkbox" class="textLeft" name="isShow" checked="checked"/>
									</div>
								</form>
							</div>
							<div class="change">
								<div class="div-center">功能新增</div>
								<form id="funAddForm">
									<div class="">
										<label for="">功能类别:</label>
										<select name="funType">
											<option value="1">操作类</option>
											<option value="2">数据类</option>
										</select>
									</div>
									<div class="">
										<label for="">绑定操作:</label>
										<select name="opId">
										</select>
									</div>
									<div class="">
										<label for="">功能名:</label>
										<input type="text" name="name"  onblur='checkInput.checkNotChars(this,16);'/>
										<span class="msg"></span>
									</div>
									<div class="">
										<label for="">备注:</label>
										<input type="text" name="remark" maxLength=100 />
										<span class="msg"></span>
									</div>
									<div class="">
										<label for="">是否在前端显示:</label>
											<input type="checkbox" class="textLeft" name="isShow" checked="checked"/>
									</div>
								</form>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-success" id="saveAndAdd" onclick="saveMetadata(this.id);">保存并新增</button>
						<button type="button" class="btn btn-info" id="saveAndClose" onclick="saveMetadata(this.id);">保存后关闭</button>
						<button type="button" class="btn btn-warning" data-dismiss="modal">仅关闭</button>
					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>
		
		<!--元数据修改删除弹出窗-->
		<!-- 模态框（Modal） -->
		<div class="modal fade" id="modalUpdate" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" >
			<div class="modal-dialog" >
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true" onclick="closeModal();">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							元数据修改/删除
						</h4>
					</div>
					<div class="modal-body" id="model-body" >
						<div class="showTab">
								<div class="">
									查询名称：<input type="text"  id="searchName" value="" />
								</div>
								<div class="modelUpdate">
									<div class="modelUpdate-title">模块修改</div>
									<div class="table-show">
									  <table class="modelUpdate-table" id="moduleTable">
									  </table>
									</div>
								</div>	
								<div class="operUpdate">
									<div class="modelUpdate-title">操作修改</div>
									<div class="table-show">
										<table class="modelUpdate-table" id="opTable">
										</table>
									</div>
								</div>
								<div class="fnUpdate" >
									<div class="modelUpdate-title">功能修改</div>
									<div class="table-show">
											<table class="modelUpdate-table" id="funTable">
											</table>
									</div>
						</div>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-warning" data-dismiss="modal" onclick="close();">关闭</button>
					</div>
					</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>
		
		
		<!--元数据模块修改弹出窗-->
		<!-- 模态框（Modal） -->
		<div class="modal fade" id="model-update-dialog" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							模块修改
						</h4>
					</div>
					<div class="modal-body" id="model-body">
						<div class="showTab">
							<div class="current change">
								<form id="updateModuleForm">
									<div class="" style="display: none" >
										<label for="">模块ID:</label>
										<input type="text" class="blocId" name="id"/>
									</div>
									<div class="">
										<label for="">模块类别:</label>
										<select type="text" name="moduleType">
										</select>
									</div>
									<div class="">
										<label for="">模块名:</label>
										<select name="resourceId" /></select>
									</div>
									<div class="">
										<label for="">备注:</label>
										<input type="text" name="remark" maxLength=100 />
									</div>
									<div class="">
										<label for="">是否禁用:</label>
											<input type="checkbox" class="textLeft" name="status"/>
									</div>
									<div class="">
										<label for="">是否在前端显示:</label>
											<input type="checkbox" class="textLeft"  name="isShow" />
									</div>
								</form>
									
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-info" id="0" onclick="saveAndClose(this.id);">保存后关闭</button>
						<button type="button" class="btn btn-warning" data-dismiss="modal" onclick="updateModalCloseOnly()">仅关闭</button>
					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>
		
		<!--元数据操作修改弹出窗-->
		<!-- 模态框（Modal） -->
		<div class="modal fade" id="oper-update-dialog" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							操作修改
						</h4>
					</div>
					<div class="modal-body" id="model-body">
						<div class="showTab">
							<div class="current change">
								<form id="updateOpForm">
									<div class="" style="display: none" >
										<label for="">操作ID:</label>
										<input type="text" class="blocId" name="id"/>
									</div>
									<div class="">
										<label for="">绑定模块类别:</label>
										<select name="modeuleId"></select>
									</div>
									<div class="">
										<label for="">操作类别:</label>
										<select name="opType"></select>
									</div>
									<div class="">
										<label for="">操作名:</label>
										<select name="resourceId"></select>
									</div>
									<div class="">
										<label for="">备注:</label>
										<input type="text" name="remark" maxLength=100 />
									</div>
									<div class="">
										<label for="">是否禁用:</label>
											<input type="checkbox" class="textLeft"  name="status"  />
									</div>
									<div class="">
										<label for="">是否在前端显示:</label>
											<input type="checkbox" class="textLeft"  name="isShow" />
									</div>
								</form>
									
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-info" id="1" onclick="saveAndClose(this.id);">保存后关闭</button>
						<button type="button" class="btn btn-warning" data-dismiss="modal" onclick="updateModalCloseOnly()">仅关闭</button>
					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>
		
		
		<!--元数据功能修改弹出窗-->
		<!-- 模态框（Modal） -->
		<div class="modal fade" id="fn-update-dialog" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							功能修改
						</h4>
					</div>
					<div class="modal-body" id="model-body">
						<div class="showTab">
							<div class="current change">
								<form id="updateFunForm" >
									<div class="" style="display: none" >
										<label for="">功能ID:</label>
										<input type="text" class="blocId" name="id"/>
									</div>
									<div class="">
										<label for="">功能类别:</label>
										<select name="funType">
											<option value="1">操作类</option>
											<option value="2">数据类</option>
										</select>
									</div>
									<div class="">
										<label for="">绑定操作:</label>
										<select name="opId"></select>
									</div>
									<div class="">
										<label for="">功能名:</label>
										<input type="text" name="name" onblur='checkInput.checkNotChars(this,16);' />
										<span class="msg"></span>
									</div>
									<div class="">
										<label for="">备注:</label>
										<input type="text" name="remark" maxLength=100 />
									</div>
									<div class="">
										<label for="">是否禁用:</label>
											<input type="checkbox" class="textLeft" name="status"/>
									</div>
									<div class="">
										<label for="">是否在前端显示:</label>
											<input type="checkbox" class="textLeft" name="isShow"/>
									</div>
								</form>
									
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-info" id="2" onclick="saveAndClose(this.id);">保存后关闭</button>
						<button type="button" class="btn btn-warning" data-dismiss="modal" onclick="updateModalCloseOnly()">仅关闭</button>
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
	<script src="../../js/commonjs/xr.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="../../js/zxsaas_plus.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="../../js/erp/authority/metadata.js?v=1.3.5" type="text/javascript" charset="utf-8"></script>
	<script src="../../js/cw/jquery.ztree.all-3.5.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	
	<script src="../../js/bootstrapValidator.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="../../js/cw/bootstrap/js/validator-company.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	
	<script type="text/javascript">
		$(function(){
			//checkRole('#inquire_option');
			//checkRole('#filterSearchForm');
		})
	</script>
	</html>
