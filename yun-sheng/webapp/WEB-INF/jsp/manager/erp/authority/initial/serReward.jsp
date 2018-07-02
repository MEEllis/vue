<!-- 
      time.html
      <业务档案>
      
      Created by LyNnJeR on 2016-09-21 Wednesday.
      Copyright 2016 LyNnJeR. All rights reserved.
 -->
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
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

		<link rel="stylesheet" type="text/css" href="${basePath}/css/cw/zTreeStyle/zTreeStylePublicModel.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/cw/zTreeStyle/zTreeStyle_.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/html/muti_select/multi.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="${basePath}/css/admin/company/business.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/market/public.css?v=${version}" />
		
		<title>业务档案</title>
		
	</head>
	<style>
		#saveOrUpdateModal .input-group-btn{
		  display:inline-block;
		   width: auto;
           height: auto;
		}
		#saveOrUpdateModal input,#saveOrUpdateModal select{
		  height:28px;
		  border:1px solid #cfcfcf;
		  vertical-align: middle;
		}
		#saveOrUpdateModal .inner{
		   display: inline-block;
           margin: 0px;
		}
		.mainSub {
			min-width: 1175px !important;
		}
		.left {
			width: 14%;
			float: left;
		}
		.left_tree {
			height: 687px;
			overflow: auto;
		}
		.details {
			width: 86%;
			float: left;
		}

		#newOrUpdateModal .xWidth {
			height: 31px;
			width:60%;
			border: 1px solid #cfcfcf;
			vertical-align: middle;
		}
		.xInput {
			/*display: block;*/
			margin-left: 15px;
			margin-top: 1px;
			width: 80%;
			height: 34px !important;
			padding: 6px 12px;
			font-size: 14px;
			line-height: 1.42857143;
			color: #555;
			background-color: #fff;
			background-image: none;
			border: 1px solid #ccc;
			border-radius: 0px;
			-webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
			box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
			-webkit-transition: border-color ease-in-out .15s, -webkit-box-shadow ease-in-out .15s;
			-o-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
			transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
		}
	</style>

	<body >
		<!-------------------------------------主页面开始----------------------------------------->
			<div class="well">
			<div id="AUTH" data-code="YYSYWDA" class="btn-group btnHundred" role="group" >
			<button type="button" class="btn btn-default" onclick="modalsaveOrUpdate(1)">新增</button>
			  <button type="button" class="btn btn-default updateBloc" onclick="modalsaveOrUpdate(2)">修改</button>	
			  <button type="button" class="btn btn-default btnDeleteRow" onclick="disOrEnSerReward(2)">删除</button>	
			  <button type="button" class="btn btn-default qiyon" onclick="disOrEnSerReward(0)">启用</button>
			  <button type="button" class="btn btn-default jinyon" onclick="disOrEnSerReward(1)">禁用</button>
			  <button type="button" class="btn btn-default" onclick="window.location.reload()" style="display: inline-block;">刷新 </button>
			  <%--<button type="button" class="btn btn-default" data-eventname="printbtn">导出</button>
			  --%><button type="button" class="btn btn-default" data-eventname="printbtn">打印</button>
			</div>
			
			<!-------------------------------------搜索条件开始----------------------------------------->
		<form id="inquire_option">
				<div class="inputbox container-fluid clearfix">
					<div class="row">
						<div class="Zpercent form-group">
							<span for="" class="box_text2">信息查询：</span><div class="col-sm-8">
								<div class="input-group"><input type="text" id="queryText" name="queryText" class="form-control2"  placeholder="输入公司名称、运营商名称、备注"  style="font-size:0.5em"/></div></div>
						</div>
						<div class="Zpercent form-group">
							<label>显示禁用：
						      <input type="checkbox" id="selStatus" class="double">
						  </label>
						   <button type="button" class="btn btn-success" onclick="querySerReward()">查询</button>
						</div>
					</div>
					 </div>
					</form>
		</div>
			<!-------------------------------------表格开始----------------------------------------->
		<div class="mainSub">
			<div class="left">
				<%--<nav class="navbar navbar-default" role="navigation">--%>
					<div class="container-fluid">
						<ul class="nav navbar-nav">
							<li><a onclick="addGoodsClassBtnClick()" style="cursor: pointer;padding: 5px 10px;"><span class="glyphicon glyphicon-user"></span> 添加</a></li>
							<li><a onclick="eiditGoodsClassBtnClick()" style="cursor: pointer;padding: 5px 10px;"><span class="glyphicon glyphicon-log-in"></span> 修改</a></li>
							<li><a onclick="delGoodsClass()" style="cursor: pointer;padding: 5px 10px;"><span class="glyphicon glyphicon-log-in"></span> 删除</a></li>
						</ul>
					</div>
				<%--</nav>--%>
				<div class="left_tree">
					<ul id="TreeDom" class="ztree"></ul>
				</div>
			</div>
			<div class="details">
				<div class="right">
			      <div class="tablebox retailDetailTable">
				    <div class="grid-wrap" style="margin-top:10px">
					  <table id="jqGrid_blocMessage" class="zxsaastable">
					  </table>
					    <div id="jqGridPager"></div>
				   </div>
			     </div>
				</div>
			</div>
		</div>
			<!-------------------------------------表格结束----------------------------------------->
		
		<!--业务酬金新增弹出窗-->
		<!-- 模态框（Modal） -->
		<div class="modal fade" id="saveOrUpdateModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							业务档案新增
						</h4>
					</div>
					<div class="modal-body" id="model-body">

								<form id="saveOrUpdateForm"  class="form-horizontal clearfix">
									<input type="hidden" id="id" name="id"/>
									<input type="hidden" id="groupId" name="groupId">
									<input type="hidden" id="companyId" name="companyId">
									<input type="hidden" id="createUid" name="createUid">
									<input type="hidden" id="createTimeString" name="createTimeString">
									<input type="hidden" id="contactsunitId" name="contactsunitId">

									<div class="form-group">
										<label for="companyName"  class="control-label col-sm-2">公司名称:</label>
										<div class="col-sm-10">
										<input type="text" id="companyName" name="companyName" class="form-control" readonly value="自动生成" />
										<span class="msg"></span>
									</div>
									</div>
									<div class="form-group">
										<label for="operatorCode"  class="control-label col-sm-3"><i style="color: red">*</i> 运营商名称:</label>
										<div class="col-sm-8" >
										<select id="operatorCode" name="operatorCode"  class="form-control" style="height:32px">
										</select>
										<span style='color:red;'></span>
										</div>
									</div>
									<div class="form-group">
										<label for="businessClassName"  class="control-label col-sm-3"><i style="color: red">*</i> 所属类别:</label>
										<div class="col-sm-8 input-group" >

										 <input class="xInput cla checkCss" id="businessClassName" name="businessClassName" >
										 <span style='color:red;'></span>
									     </div>
									</div>
									<div class="form-group">
										<label for="contactName" class="control-label col-sm-3"><i style="color: red">*</i> 往来单位:</label>
								      	<div class="inner col-sm-8" style="position: relative;display:inline-block;">
						                   <input type="text" id="contactName" name="contactName" readonly="" class="form-control"style="height:32px">
						                   <span style="position: absolute;right:20px;top:6px;vertical-align: middle;cursor:pointer;z-index:2;" class="inputAssPlus glyphicon glyphicon-plus unitSearch" onclick="selectContactUnitReferenceOpen('insert')"></span>
						                </div>
									</div>
									<div class="form-group">
										<label for="bizCode" class="control-label col-sm-3"><i style="color: red">*</i> 业务编码:</label>
										<div class="col-sm-8" >
										<input type="text" id="bizCode" name="bizCode" onblur='checkInput.checkStrNum(this,32);' class="form-control" />
										<span style='color:red;'></span>
									</div>
									</div>
									<div class="form-group">
										<label for="bizName" class="control-label col-sm-3"><i style="color: red">*</i> 业务名称:</label>
										<div class="col-sm-8" >
										<input type="text" id="bizName" name="bizName" onblur='checkInput.checkNotChars(this,32);' class="form-control" />
										<span style='color:red;'></span>
									</div>
									</div>

									<div class="form-group">
										<label for="remark"  class="control-label col-sm-3">预估佣金:</label>
										<div class="col-sm-8" >
											<input type="text" id="commission" name="commission" maxLength=15  onkeyup="checkInput.checkNumFu(this,12)" class="form-control"/>
											<span class="msg"></span>
										</div>
									</div>

									<div class="form-group">
										<label for="remark"  class="control-label col-sm-3">备注:</label>
										<div class="col-sm-8" >
											<input type="text" id="remark" name="remark" maxLength=100 class="form-control"/>
											<span class="msg"></span>
										</div>
									</div>
									<div class="form-group">
										<label for="status" class="control-label col-sm-3">是否禁用:</label>
										<div class="col-sm-8" >
											<input type="checkbox" id="status" name="status" class="textLeft" value=""/>
									</div>
									</div>
								</form>
								<span class="checkMsg"></span>

					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-success butHide" onclick="saveAndAddSerReward();">保存并新增</button>
						<button type="button" class="btn btn-info" onclick="saveAndCloseSerReward();">保存后关闭</button>
						<button type="button" class="btn btn-warning" data-dismiss="modal">仅关闭</button>
					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>
		<!--树形新增弹出窗-->
		<div class="modal" id="addAndEiditGoodsClassModalDialog" tabindex="-1" role="dialog" aria-hidden="true">
			<div class="modal-dialog" style="width:830px;">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						<h4 class="modal-title">新增所属类别窗口</h4>
					</div>
					<div class="modal-body">
						<!-- 新增所属类别   表单 -->
						<form class="form-horizontal" role="form" style="width: 100%;padding: 5px;padding-top: 20px;">
							<div style="display:none;">
								<input type="text" class="form-control" name="id" placeholder="">
								<input type="text" class="form-control" name="status" placeholder="">
							</div>
							<div class="col-sm-1"></div>
							<div class="col-sm-11">
								<div class="form-group">
									<label for="firstname" class="col-sm-4 control-label"><i style="color: red">*</i> 集团：</label>
									<div class="col-sm-4">
										<select class="form-control input-sm checkCss" name="groupId">
											<option value="${groupId}" selected="selected">${SESSION_KEY_USER.groupName }</option>
										</select>
									</div>
								</div>
								<div class="form-group">
									<label  class="col-sm-4 control-label"><i style="color: red">*</i> 上级类别：</label>
									<div class="col-sm-4 input-group">
										<input class="checkCss xInput" readonly id="addGoodsClassParentIdTree" name="parentId" style="width:200px;height:34px; margin-top: 0px">
									</div>
								</div>
								<div class="form-group">
									<label  class="col-sm-4 control-label"><i style="color: red">*</i> 编码：</label>
									<div class="col-sm-4">
										<input type="text" class="form-control checkCss codeCla" name="code" placeholder="" onblur='checkInput.clearNoText(this,32);' />
										<span style='color:red;'></span>
									</div>
								</div>
								<div class="form-group">
									<label  class="col-sm-4 control-label"><i style="color: red">*</i> 名称：</label>
									<div class="col-sm-4">
										<input type="text" class="form-control checkCss nameCla" name="name" placeholder="" onblur='checkInput.clearNoText(this,32);' />
										<span style='color:red;'></span>
									</div>
								</div>
								<div class="form-group">
									<label  class="col-sm-4 control-label">备注：</label>
									<div class="col-sm-4">
										<input type="text" class="form-control checkCss" name="remark" placeholder="" maxLength=100 />
									</div>
								</div>

							</div>
						</form>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-w btn-danger" id="classSaveAndAdd" onclick="addOrEiditGoodsClassSave(1);">保存后新增</button>
						<button type="button" class="btn btn-w btn-info" id="classSave" onclick="addOrEiditGoodsClassSave(2);">保存后关闭</button>
						<button type="button" class="btn btn-warning" data-dismiss="modal">仅关闭</button>
					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>
		<!-- 往来单位引用 -->
		<div class="modal fade" id="contactUnitReferenceModal" tabindex="-1" role="dialog"  aria-hidden="true">
		   <div class="modal-dialog" style="width:930px;">
		      <div class="modal-content">
			     <div class="modal-header">
		            <button type="button" class="close"  data-dismiss="modal" aria-hidden="true"> &times;</button>
		            <h4 class="modal-title">
		                                  往来单位引用
		            </h4>
		         </div>
		         <div class="modal-body">
					<iframe name="contactUnitReferenceFrame" class="referenceFrame" frameborder="0" style="width: 100%;height:400px;" src="${basePath}/TcontactUnit/reference"></iframe>
		         </div>
			  </div>
			</div>
		</div>
		
		<!-------------------------------------主页面结束----------------------------------------->
		
	</body>
	<script src="${basePath}/js/jquery-1.12.4.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script type="text/javascript" src="${basePath}/js/base.js?v=${version}"></script>
	<script src="${basePath}/js/jquery-form.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/bootstrap.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/jquery.jqGrid.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/jquery.datetimepicker.full.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/grid.locale-cn.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/commonjs/xm.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/zxsaas_plus.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/cw/jquery.ztree.all-3.5.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/erp/authority/initial/serReward.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/erp/authority/initial/model-initial.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/commonjs/xr.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/commonjs/xm.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/html/muti_select/MultiSelectDropList.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/cw/bootstrap/js/validator-company.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<!-- 菜单权限验证 -->
	<script type="text/javascript" src="${basePath}/js/erp/authority/menuValidation.js?v=${version}"></script>
	<script type="text/javascript">
	var basePath = "${basePath}";
	var initialObj = null;
	</script>
</html>


