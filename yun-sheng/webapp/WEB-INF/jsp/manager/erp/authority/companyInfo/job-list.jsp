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
		
		<!--<link rel="stylesheet" type="text/css" href="${basePath}/css/admin/blocMessage.css?v=${version}"/>-->
		<link rel="stylesheet" type="text/css" href="${basePath}/css/cw/zTreeStyle/zTreeStylePublicModel.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/admin/company/positionInfo.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="${basePath}/css/market/public.css?v=${version}" />
		<title>职位信息列表</title>
		
	</head>
	<style>
		.well{
			margin-bottom:10px;
		}
	</style>

	<body > 
		<!-------------------------------------主页面开始----------------------------------------->
			<div class="well">
			<div id="AUTH" data-code="ZWXX" class="btn-group btnHundred" role="group" >
			<button type="button" class="btn btn-default add" data-eventname="add" data-toggle="modal">新增</button>
			  <button type="button" class="btn btn-default updateBloc" data-eventname="update" data-toggle="modal">修改</button>	
			  <button type="button" class="btn btn-default btnDeleteRow" data-eventname="delete" data-toggle="modal" data-target="#modalDelete">删除</button>	
			  <button type="button" class="btn btn-default enableOrDisable" data-eventname='qiyon' id="0" >启用</button>
			  <button type="button" class="btn btn-default enableOrDisable" data-eventname="jinyon" id="1">禁用</button>
			  <button type="button" class="btn btn-default" onclick="window.parent.openWorkBoxByMenutext('职位导入','${basePath}/beginning/goodsbrand/toJobPage');">导入</button>
			  <button class="bn" onclick="setReload()">刷新 </button>
			</div>
			
			<!--main开始-->
			<form id="inquire_option">
				<div class="inputbox container-fluid clearfix">
		 			 <div class="row">
						<div class="Zpercent form-group">
							<span for="" class="box_text2">查询信息：</span><div class="col-sm-8">
								<div class="input-group"><input type="text" class="form-control2" id="jobSelect"  placeholder="输入职位名称、编码" /></div></div>
						</div>
						<div class="Zpercent form-group">
							<label>显示禁用：
						      <input type="checkbox" id="xsjy">
						  </label>
						   <button type="button" class="btn btn-success ">查询</button>
						</div>
					</div>
				</div>
			</form>
			</div>
				<!--展示列表开始-->
				<div class="details">
					<div class="right">
						<!--表格-->
						<div class="jqGrid_wrap">
							<table id="jqGrid_metaData" class="zxsaastable"></table> 
		    			<div id="jqGridPager"></div>
						</div>
					</div>
				</div>
		<!--main结束-->
		
		<!--通用模版新增弹出窗-->
		<!-- 模态框（Modal） -->
		<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							职位新增
						</h4>
					</div>
					<div class="modal-body" id="model-body">
						<div class="showTab" style="min-height:200px;height:200px">
							<div class="current change">
								<form class="">
									<div class="">
										<label for="">集团名称:</label>
										<input type="text" class="groupName" disabled="disabled"/>
										<span class="msg"></span>
									</div>
									<div class="">
										<label for="">公司名称:</label>
										<input type="text"  class="companyName" disabled="disabled"  />
										<span class="msg"></span>
									</div>
									<div class="">
										<label for="">编码:</label>
										<input type="text" class="storageCode jobData" name="code"  placeholder="留空时系统自动编码" onblur='checkInput.checkStrNum(this,32);' />
										<span style='color:red;'></span>
									</div>
									<div class="">
										<label for="">职位名称:</label>
										<input type="text" class="storageName jobData" name="name"   placeholder="" onblur='checkInput.checkNotChars(this,32);' />
										<span style='color:red;'></span>
									</div>
									<div class="">
										<label for="">备注:</label>
										<input type="text" class="comInfo jobData" name="remark"  maxLength=100 />
										<span class="msg"></span>
									</div>
								</form>
								<span class="checkMsg"></span>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<!-- <button type="button" class="btn btn-success saveJobAdd">保存并新增</button> -->
						<button type="button" class="btn btn-info  saveJob">保存后关闭</button>
						<button type="button" class="btn btn-warning" data-dismiss="modal">仅关闭</button>
					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>
		
		<!--通用模版修改弹出窗-->
		<!-- 模态框（Modal） -->
		<div class="modal fade" id="modalUpdate" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							职位修改
						</h4>
					</div>
					<div class="modal-body" id="model-body"> 
						<div class="showTab"  style="min-height:200px;height:200px">
							<div class="current change">
								<form class="">
								<input type="hidden" id="id" name="id">
									<div class="">
										<label for="">集团名称:</label>
										<input type="text" class="groupName"    disabled="disabled" />
										<span class="msg"></span>
									</div>
									<div class="">
										<label for="">公司名称:</label>
										<input type="text" class="companyName"  disabled="disabled" />
										<span class="msg"></span>
									</div>
									<div class="">
										<label for="">编码:</label>
										<input type="text" class="storageCodeUpdate jobData" id="code" name="code" onblur='checkInput.checkStrNum(this,32);'/>
										<span style='color:red;'></span>
									</div>
									<div class="">
										<label for="">职位名称:</label>
										<input type="text" class="storageNameUpdate jobData" id="name" name="name" onblur='checkInput.checkNotChars(this,32);'/>
										<span style='color:red;'></span>
									</div>
									<div class="">
										<label for="">备注:</label>
										<input type="text" class="comMarkUpdate jobData" id="remark" name="remark" maxLength=100 />
										<span class="msg"></span>
									</div>
								</form>
								<span class="checkMsg"></span>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn updateJob">保存后关闭</button>
						<button type="button" class="btn btn-warning" data-dismiss="modal">仅关闭</button>
					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>
		
		<!--通用模版删除弹出窗-->
		<!-- 模态框（Modal） -->
		
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
	<script src="${basePath}/js/commonjs/xr.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/erp/authority/companyManager/positionInfo.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/cw/jquery.ztree.all-3.5.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/cw/bootstrap/js/validator-company.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<!-- 菜单权限验证 -->
	<script type="text/javascript" src="${basePath}/js/erp/authority/menuValidation.js?v=${version}"></script>
	<script type="text/javascript">
		$(function(){
			loadmodal();
		})
		
		$('.tab .toggle').click(function() {
			console.log($(this).index('.toggle'));
			$(this).addClass('active').siblings().removeClass('active');
			$('.showTab .change').eq($(this).index('.toggle')).show().siblings().hide();
		});
		
		function setReload(){
    		window.location.reload();
	    }	
	</script>
</html>
