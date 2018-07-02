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
		
		<!--<link rel="stylesheet" type="text/css" href="${basePath}/../css/admin/blocMessage.CSS?v=${version}"/>-->
		<link rel="stylesheet" type="text/css" href="${basePath}/css/cw/zTreeStyle/zTreeStylePublicModel.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/html/muti_select/multi.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="${basePath}/css/admin/company/companyInfo.css?v=${version}" />
		
		
		<link rel="stylesheet" type="text/css" href="${basePath}/css/market/public.css?v=${version}" />
		
		<title>公司信息列表</title>
		<style>
			.change form div.demoText {
			   margin: 1em;
			}
			.change form div.demoText input.demo{
			   height:30px;
			}
		</style>
		
	</head>

	<body >
		<!-------------------------------------主页面开始----------------------------------------->
			<div id="AUTH" data-code="GSXX" class="btn-group btnHundred" role="group" >
			  <button type="button" class="btn btn-default updateBloc" data-eventname="update" data-toggle="modal">修改</button>	
			  <button type="button" class="btn btn-default qiyon" id="qiyong" data-eventname='qiyon'>启用</button>
			  <button type="button" class="btn btn-default jinyon" id="jinyong" data-eventname="jinyon">禁用</button>
			  <button class="bn" onclick="setReload()">刷新 </button>
			</div>
			
			<div class="grid-title">公司信息列表</div>
			
			<!--main开始-->
			<div class="main">
				<!--展示列表开始-->
				<div class="details">
					<div class="right">
						<!--表格-->
						<div class="jqGrid_wrap">
							<table id="jqGrid_metaData" class="zxsaastable"></table> 
						</div>
					</div>
				</div>
				</div>
				<!--展示列表结束-->
			</div>
		<!--main结束-->
		
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
							公司修改
						</h4>
					</div>
					<div class="modal-body" id="model-body">
						<div class="showTab" style="height:200px;min-height:200px;">
							<div class="current change">
								<form class="">
									<div class="demoText">
										<label for="">集团名称:</label>
										<input type="text" class="demo groupName" disabled="disabled"  />
										<span class="msg"></span>
									</div>
									<div class="demoText">
										<label for="">公司编码:</label>
										<input type="text" class="demo" disabled="disabled" name="code" id="code"/>
										<span class="msg"></span>
									</div>
									<div class="demoText" style='width:345px;'>
										<label for="">公司名称:</label>
										<input type="text" class="demo nameCheck" name="name" id="name" placeholder="" onblur='checkInput.checkNotChars(this,32);' />
										<span class="msg" style="color: red;"></span>
									</div>
									<div class="demoText">
										<label for="">备注:</label>
										<input type="text" class="demo" name="remark" id="remark" class="comInfo" maxLength=100 />
										<span class="msg"></span>
									</div>
									<div class="demoText">
										<label for="status">是否禁用:</label>
											<input type="checkbox" value="1" class="sfjy" name="status" id="status" value="" />
									</div>
								</form>
								<span class="checkMsg"></span>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-info">保存后关闭</button>
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
	<script src="${basePath}/js/erp/authority/companyManager/companyInfo.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/cw/jquery.ztree.all-3.5.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/commonjs/xr.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/html/muti_select/MultiSelectDropList.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/cw/bootstrap/js/validator-company.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<!-- 菜单权限验证 -->
	<script type="text/javascript" src="${basePath}/js/erp/authority/menuValidation.js?v=${version}"></script>
	<script type="text/javascript">
		$(function(){
			loadmodal();
		});
		
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
