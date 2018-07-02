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
		<link rel="stylesheet" type="text/css" href="${basePath}/css/cw/zTreeStyle/zTreeStyle_.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/admin/company/storageInfo.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="${basePath}/css/market/public.css?v=${version}" />
		<title>仓库信息列表</title>
		
	</head>
	<style>
		.well{
			margin-bottom:10px;
		}
	</style>

	<body >
		<!-------------------------------------主页面开始----------------------------------------->
			<div class="well">
			<div id="AUTH" data-code="CKXX" class="btn-group btnHundred" role="group" >
			<button type="button" class="btn btn-default add" data-eventname="add" data-toggle="modal">新增</button>
			  <button type="button" class="btn btn-default updateBloc" data-eventname="update" data-toggle="modal" data-target="#modalUpdate">修改</button>	
			  <button type="button" class="btn btn-default btnDeleteRow" data-eventname="delete" data-toggle="modal" data-target="#modalDelete">删除</button>	
			  <button type="button" class="btn btn-default enableOrDisable" data-eventname='qiyon' id="0" >启用</button>
			  <button type="button" class="btn btn-default enableOrDisable" data-eventname="jinyon" id="1">禁用</button>
			  <button type="button" class="btn btn-default" onclick="setReload()">刷新 </button>
			  <button type="button" class="btn btn-default" onclick="window.parent.openWorkBoxByMenutext('仓库导入','${basePath}/beginning/storage/toPage');">导入</button>
			  <button type="button" class="btn btn-default" id="export">导出 </button> 
			  <!--
			  <button type="button"   class="btn btn-default " onclick="javascript:$('#dataPowerModalDialog').modal('show');">数据授权</button>
			--></div>
			<!--main开始-->
			<form id="inquire_option">
				<div class="inputbox container-fluid clearfix">
		 			 <div class="row">
						<div class="Zpercent form-group">
							<span for="" class="box_text2">查询信息：</span><div class="col-sm-8">
								<div class="input-group"><input type="text" class="form-control2" id="keyword" placeholder="请输入部门名称、仓库名称、备注查询"  /></div></div>
						</div>
						<div class="Zpercent form-group">
							<label>显示禁用：
						      <input type="checkbox" class="double" id="xsjy">
						  </label>
						  <button type="button" class="btn btn-success">查询</button>
						</div>
					</div>
				</div>
			</form>
			</div>
				<div class="left">
					<!--<div class="left-s">授权菜单</div>-->
					<div class="left_tree">
						<ul id="publicModelTree" class="ztree"></ul>
					</div>
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
					
				</div>
				<!--展示列表结束-->
			</div>
		<!--main结束-->
		
		<!--仓库新增弹出窗-->
		<!-- 模态框（Modal） -->
		<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							仓库新增
						</h4>
					</div>
					<div class="modal-body" id="model-body">
						<div class="showTab">
							<div class="current change">
								<form class="">
									<div class="">
										<label for="">公司名称:</label>
										<input type="text" disabled="disabled" class="companyName" />
										<span class="msg"></span>
									</div>
									<div class="">
										<label for="">仓库编码:</label>
										<input type="text" class="ckData" onblur='checkInput.checkStrNum(this,32);' name="code"  placeholder="留空时系统自动编码"/>
										<span style='color:red;'></span>
									</div>
									<div class="">
										<label for="">仓库名称:</label>
										<input type="text" class="ckData nameCheck" name="name" onblur='checkInput.checkNotChars(this,32);'/>
										<span style='color:red;'></span>
									</div>
									<div class="">
										<label for="">仓库类型:</label>
											<select class="addStorage" name="typeCode">
												<option value="3" selected>总仓</option>
												<option value="1">门店仓</option>
												<option value="4">售后仓</option>
												<option value="2">业务仓</option>
												<option value="5">其他</option>
											</select>
										<span class="msg"></span>
									</div>
									<div class="">
										<label for="">门店名称:</label>
										<!--<input type="hidden" class="mendianInput" />-->
										<select class="mendian"    name="sectionId">
											</select>
										<span class="msg"></span>
									</div>
									<div class="">
										<label for="">业务员名称:</label>
										<!--<input type="hidden" class="yewuyuanInput" />-->
										<select class="yewuyuan ckData addYwy"   name="salesmanId">
										</select>
										<span class="msg"></span>
									</div>
									<div class="">
										<label for="">开账日期:</label>
										<input type="text" class="ckData"  name="openDate"  id="openDate"/>
										<span class="msg"></span>
									</div>
									<div class="">
										<label for="">备注:</label>
										<input type="text" class="comInfo ckData"  name="remark"  maxLength=100 />
										<span class="msg"></span>
									</div>
									<div class="">
										<label for="isDefault_add">是否为门店默认仓:</label>
											<input type="checkbox" class="textLeft" value="1" name="isDefault" id="isDefault_add"/>
									</div>
								</form>
								<span class="checkMsg"></span>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						 <button type="button" class="btn saveCKaddNew btn-primary">保存并新增</button>
						<button type="button" class="btn saveCK" >保存后关闭</button>
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
							仓库修改
						</h4>
					</div>
					<div class="modal-body" id="model-body">
						<div class="showTab">
							<div class="current change">
								<form class="">
									<input type="hidden" id="id" name="id">
									<div class="">
										<label for="">公司名称:</label>
										<input type="text" class="companyName" disabled="disabled" value="" />
										<span class="msg"></span>
									</div>
									<div class="">
										<label for="">仓库编码:</label>
										<input type="text" class="ckData" id="code" onblur='checkInput.checkStrNum(this,32);' name="code"/>
										<span style='color:red;'></span>
									</div>
									<div class="">
										<label for="">仓库名称:</label>
										<input type="text" class="nameCheckUp" name="name" id="name" onblur='checkInput.checkNotChars(this,32);' />
										<span style='color:red;'></span>
									</div>
									<div class="">
										<label for="">仓库类型:</label>
											<select class="updateStorage" name="typeCode" id="typeCode">
												<option value="3" selected>总仓</option>
												<option value="1">门店仓</option>
												<option value="4">售后仓</option>
												<option value="2">业务仓</option>
												<option value="5">其他</option>
											</select>
										<span class="msg"></span>
									</div>
									<div class="">
										<label for="">门店名称:</label>
										<!--<input type="hidden" class="mendianInput" />-->
										<select class="mendian"    name="sectionId" id="sectionId">
											</select>
										<span class="msg"></span>
									</div>
									<div class="">
										<label for="">业务员名称:</label>
										<!--<input type="hidden" class="yewuyuanInput" />-->
										<select class="yewuyuan ckData updateYwy"   name="salesmanId" id="salesmanId">
										</select>
										<span class="msg"></span>
									</div>
									<div class="">
										<label for="">备注:</label>
										<input type="text" class="ckData" id="remark" name="remark" maxLength=100 />
										<span class="msg"></span>
									</div>
									<div class="">
										<label for="isDefault">是否为门店默认仓:</label>
											<input type="checkbox" class="textLeft" value="1" name="isDefault" id="isDefault"/>
									</div>
									<!--<div id="">
										<button type="button" class="btn btn-success">保存并新增</button>
										<button type="button" class="btn btn-info">保存后关闭</button>
										<button type="button" class="btn btn-warning">仅关闭</button>
									</div>-->
								</form>
								<span class="checkMsg"></span>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-info updateCK" >保存后关闭</button>
						<button type="button" class="btn btn-warning" data-dismiss="modal">仅关闭</button>
					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>
		
		<!--通用模版删除弹出窗-->
		<!-- 模态框（Modal） -->
		
		<!--授权弹出窗-->
		<!-- 模态框（Modal） --><!--
		<div class="modal fade" id="accredit" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							可使用部门仓库人员授权
						</h4>
					</div>
					<div class="modal-body model-body" id="model-body">
						<div class="showTab">
							<div class="left2">
								<div class="left-s">人数列表</div>
								<div class="left_tree2">
									<ul id="personDataTree" class="ztree"></ul>
								</div>
							</div>
							
							<div class="right2">
								<div class="left-s">部门仓库列表</div>
								<div class="right_tree2">
									<ul id="depStorageDataTree" class="ztree"></ul>
								</div>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-info" onclick="saveAndClose();" data-dismiss="modal">保存后关闭</button>
						<button type="button" class="btn btn-warning" data-dismiss="modal">仅关闭</button>
					</div>
				</div> /.modal-content 
			</div> /.modal 
		</div>
		
		
		--><!-- 模态框（数据授权） -->
<div class="modal fade" id="dataPowerModalDialog" tabindex="-1" role="dialog" aria-hidden="true">
	<div class="modal-dialog" style="width:850px;">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				<h4 class="modal-title">数据授权窗口</h4>
			</div>
			<div class="modal-body">
				<div class="col-sm-6">
				  <ul id="empTree" class="ztree" style="border: 1px gray solid;max-height: 400px;overflow: auto;">
				  	
				  </ul>	
				</div>
				<div class="col-sm-6" id="rightTree"><!--
				  <form class="form-horizontal" role="form">
					  <div class="form-group">
					    <label class="col-sm-3 control-label">查询公司:</label>
					    <div class="col-sm-8">
					      <input type="text" class="form-control">
					    </div>
					  </div>
				  </form>
				  --><ul id="empDataPowerTree" class="ztree" style="border: 1px gray solid;max-height: 300px;overflow: auto;">
				  	
				  </ul>
				</div>

			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-w btn-danger" onclick="saveEmpDataPower()">保存后新增</button>
				<button type="button" class="btn btn-w btn-info" onclick="saveEmpDataPower()"  data-dismiss="modal">保存后关闭</button>
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
	<script src="${basePath}/js/commonjs/xr.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/erp/authority/companyManager/storageInfo.js?v=${version}" type="text/javascript" charset="utf-8"></script>
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
