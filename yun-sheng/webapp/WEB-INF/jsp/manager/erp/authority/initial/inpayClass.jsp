<!-- 
      Class.html
      <收支类别表>
      
      Created by LyNnJeR on 2016-09-22 Thursday.
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
		<link rel="stylesheet" type="text/css" href="${basePath}/css/admin/company/Class.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/market/public.css?v=${version}" />
		
		<title>收支类别表</title>
		
	</head>
	<style>
		.label.radio-inline {
		    height: 30px;
		    line-height: 30px;
	    }
	    .label.radio-inline input{
	    	height:20px;
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
		#classifyId{
			max-height:180px !important;
			width:300px;
			margin-left:20px;
		}
		.ComboBox{
			position: absolute;
			top:36px !important;
		}
		#InpayClassParentIdTree{
			width:300px;
			margin-left:20px
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
			<div id="AUTH" data-code="SZLBGL" class="btn-group btnHundred" role="group" >
			<button type="button" class="btn btn-default" onclick="modalsaveOrUpdate(1)">新增</button>
			  <button type="button" class="btn btn-default updateBloc" onclick="modalsaveOrUpdate(2)">修改</button>	
			  <button type="button" class="btn btn-default btnDeleteRow" onclick="disOrEnInpayClass(2)">删除</button>	
			  <button type="button" class="btn btn-default qiyon" onclick="disOrEnInpayClass(0)">启用</button>
			  <button type="button" class="btn btn-default jinyon" onclick="disOrEnInpayClass(1)">禁用</button>
			   <button type="button" class="btn btn-default" onclick="window.location.reload()" style="display: inline-block;">刷新 </button>
			  <%--<button type="button" class="btn btn-default" data-eventname="printbtn">导出</button>
			  --%><button type="button" class="btn btn-default" data-eventname="printbtn">打印</button>
			</div>
			
			<!-------------------------------------搜索条件开始----------------------------------------->
			<form id="inquire_option">
				<div class="inputbox container-fluid clearfix">
					<div class="row">
						<div class="form-group col-sm-6" >
							<span class="box_text2">信息查询：</span><div class="col-sm-8">
								<div class="input-group"><input type="text" id="queryText" name="queryText" class="form-control2"  placeholder="输入类别名称、备注"  /></div></div>
						</div>
						<%--<div class="Zpercent form-group">--%>
							<%--<span class="box_text2">收支类别：</span>--%>
							<%--<label class="radio-inline">--%>
							  <%--<input type="radio" name="selFlag" class="radio_Class" id="inlineRadio1" value="0" checked="checked"> 收入--%>
							<%--</label>--%>
							<%--<label class="radio-inline">--%>
							  <%--<input type="radio" name="selFlag" class="radio_Class" id="inlineRadio2" value="1"> 支出--%>
							<%--</label>--%>
						<%--</div>--%>
						<div class=" form-group col-sm-2">
							<label>显示禁用：
						      <input type="checkbox" id="selStatus" name="selStatus" class="double">
						  </label>
						</div>
						<div class=" form-group  col-sm-4">
							 <button type="button" class="erp-btn-bg" onclick="queryInpayClass()">查询</button>
							<button type="button" class="erp-btn-lab" onclick="resetfun()">重置</button>
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
					<li><a onclick="addInpayClassBtnClick()" style="cursor: pointer;padding: 5px 10px;"><span class="glyphicon glyphicon-user"></span> 添加</a></li>
					<li><a onclick="eiditInpayClassBtnClick()" style="cursor: pointer;padding: 5px 10px;"><span class="glyphicon glyphicon-log-in"></span> 修改</a></li>
					<li><a onclick="delInpayClass()" style="cursor: pointer;padding: 5px 10px;"><span class="glyphicon glyphicon-log-in"></span> 删除</a></li>
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

		
		<!--收支类别新增弹出窗-->
		<!-- 模态框（Modal） -->
		<div class="modal fade" id="saveOrUpdateModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							收支类别新增
						</h4>
					</div>
					<div class="modal-body" id="model-body">
						<div class="showTab">
							<div class="current">
								<form id="saveOrUpdateForm" class="form-horizontal clearfix">
									<input type="hidden" id="id" name="id"/>
									<input type="hidden" id="groupId" name="groupId"/>
									<input type="hidden" id="companyId" name="companyId"/>
									<input type="hidden" id="createUid" name="createUid"/>
									<input type="hidden" id="createTimeString" name="createTimeString"/>
									<div class="none">
										<label for="">公司名称:</label>
										<input type="text" id="companyName" name="companyName" readonly value="自动生成" />
										<span class="msg"></span>
									</div>
									<%--<div class="">--%>
										<%--<label for="">收支类型:</label>--%>
										<%--<input type="radio" name="flag" id="flag0" value="0" style="width:2.5rem"> --%>
										<%--<label class="radio-inline" for="flag0" style="width:4rem;margin-right:0px">收入</label>--%>
										<%----%>
									    <%--<input type="radio" name="flag" id="flag1" value="1"  style="width:2.5rem"> --%>
										<%--<label class="radio-inline" for="flag1" style="width:4rem;margin-right:0px;margin-left: -1.7em;">支出</label>--%>
										<%--<span class="msg"></span>--%>
									<%--</div>--%>
									<div class="form-group">
										<label for="classifyName" class="control-label col-sm-3"><i style="color: red">*</i>&nbsp;收支分类:</label>
										<div class="col-sm-8 input-group" >
										  <input class="xInput cla checkCss" id="classifyName" name="classifyName" >
										  <span style='color:red;'></span>
										</div>
									</div>
									<div class="form-group">
										<label for="code" class="control-label col-sm-3" >类别编码:</label>
										<div class="col-sm-8" >
										  <input type="text" id="code" name="code" onblur='checkInput.checkStrNum(this,32);'  class="form-control"/>
										  <span style='color:red;'></span>
										</div>
									</div>
									<div class="form-group">
										<label for="name" class="control-label col-sm-3"><i style="color: red">*</i>&nbsp;类别名称:</label>
										<div class="col-sm-8" >
										   <input type="text" id="name" name="name" onblur='checkInput.checkNotChars(this,32);'  class="form-control"/>
										   <span style='color:red;'></span>
									    </div>
									</div>
									<%--<div class="form-group hide">--%>
										<%--<label for="">收支对象:</label>--%>
										<%--<select id="inpayTar" name="inpayTar"  autocomplete="off" style='height:24px;'>--%>
											<%--<option value="-1">无</option>--%>
											<%--<option value="1" >员工</option>--%>
											<%--<option value="2">部门</option>--%>
											<%--<option value="3">外部单位</option>--%>
										<%--</select>--%>
										<%--<span style='color:red;'></span>--%>
									<%--</div>--%>
									<div class="form-group">
										<label for="remark" class="control-label col-sm-3">备注:</label>
										<div class="col-sm-8" >
										   <input type="text" id="remark" name="remark" maxLength=100  class="form-control"/>
										   <span class="msg"></span>
									    </div>
									</div>
									<%--<div class="form-group">--%>
										<%--<label for="status"  class="control-label col-sm-3">是否禁用:</label>--%>
										<%--<div class="col-sm-8" >--%>
											<%--<input type="checkbox" id="status" name="status" class="textLeft" value="" checked />--%>
										<%--</div>--%>
									<%--</div>--%>
								</form>
								<span class="checkMsg"></span>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-success butHide" onclick="saveAndAddInpayClass();">保存并新增</button>
						<button type="button" class="btn btn-info" onclick="saveAndCloseInpayClass();">保存后关闭</button>
						<button type="button" class="btn btn-warning" data-dismiss="modal">仅关闭</button>
					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>

		<!--树形新增弹出窗-->
		<div class="modal" id="addAndEiditInpayClassModalDialog" tabindex="-1" role="dialog" aria-hidden="true">
			<div class="modal-dialog" style="width:830px;">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						<h4 class="modal-title">收支分类新增</h4>
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
									<label  class="col-sm-3 control-label"><i style="color: red">*</i> 上级分类：</label>
									<div class="col-sm-6 input-group">
										<input class="checkCss xInput" readonly id="addInpayClassParentIdTree" name="parentId" style="width:307px;height:34px; margin-top: 0px">
									</div>
								</div>
								<div class="form-group">
									<label  class="col-sm-3 control-label"> 编码：</label>
									<div class="col-sm-6">
										<input type="text" class="form-control checkCss codeCla" name="code" placeholder="" onblur='checkInput.clearNoText(this,32);' />
										<span style='color:red;'></span>
									</div>
								</div>
								<div class="form-group">
									<label  class="col-sm-3 control-label"><i style="color: red">*</i> 名称：</label>
									<div class="col-sm-6">
										<input type="text" class="form-control checkCss nameCla" name="name" placeholder="" onblur='checkInput.clearNoText(this,32);' />
										<span style='color:red;'></span>
									</div>
								</div>
								<div class="form-group">
									<label  class="col-sm-3 control-label">备注：</label>
									<div class="col-sm-6">
										<input type="text" class="form-control checkCss" name="remark" placeholder="" maxLength=100 />
									</div>
								</div>
								<%--<div class="form-group">--%>
									<%--<label  class="control-label col-sm-3">是否禁用:</label>--%>
									<%--<div class="col-sm-6" >--%>
										<%--<input type="checkbox" id="statu" name="status" class="checkCss" value="" checked style="margin-top: 10px"/>--%>
									<%--</div>--%>
								<%--</div>--%>
							</div>
						</form>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-w btn-danger" id="classSaveAndAdd" onclick="addOrEiditInpayClassSave(1);">保存后新增</button>
						<button type="button" class="btn btn-w btn-info" id="classSave" onclick="addOrEiditInpayClassSave(2);">保存后关闭</button>
						<button type="button" class="btn btn-warning" data-dismiss="modal">仅关闭</button>
					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
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
	<script src="${basePath}/js/commonjs/xr.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/zxsaas_plus.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/erp/authority/initial/inpayClass.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/erp/authority/initial/model-initial.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/cw/jquery.ztree.all-3.5.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/html/muti_select/MultiSelectDropList.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/cw/bootstrap/js/validator-company.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<!-- 菜单权限验证 -->
	<script type="text/javascript" src="${basePath}/js/erp/authority/menuValidation.js?v=${version}"></script>
	<script type="text/javascript">
		var basePath = "${basePath}";
		var initialObj = null;
	</script>
</html>


