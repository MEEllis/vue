<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<meta charset="UTF-8">
		<meta name="renderer" content="webkit" />
		<meta http-equiv="X-UA-Compatible" content="IE=9; IE=8; IE=7; IE=EDGE ; chrome=1" />
		<link rel="stylesheet" type="text/css" href="${basePath}/css/base.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="${basePath}/css/bootstrap.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="${basePath}/css/jquery-ui.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="${basePath}/js/skins/all.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="${basePath}/css/animate.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="${basePath}/css/bootstrap-select.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="${basePath}/css/font-awesome.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="${basePath}/css/iconfont.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="${basePath}/css/pagecss/treepage.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="${basePath}/css/jquery.datetimepicker.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="${basePath}/css/ui.jqgrid-bootstrap.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="${basePath}/css/cw/zTreeStyle/zTreeStyle_.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/market/public.css?v=${version}" />
		<title>集团会计科目</title>
		<style type="text/css">
			.ui-jqgrid .ui-jqgrid-htable .ui-th-div {text-align: center;}
			.mainSub {min-width: 1175px !important;}
			.left {width: 14%;float: left;}
			.details {width: 86%;float: left;}
			.left_tree {height: 687px;overflow: auto;}
			.model-dialog4 {width: 700px;}
			/*科目弹窗*/
			.subjectMian {padding: 10px 0;}
			.col-sm-8 { height: 40px;width: 145px;}
			.mainLeft {width: 300px;float: left;}
			fieldset {padding: .35em .625em .75em;margin: 0 2px;border: 1px solid silver;width: 265px;min-width: 265px !important;}
			legend {margin-bottom: 0px;font-size: 18px;padding: .5em;border: 0;width: auto;}
			.monSub {margin: 10px 0 10px 80px;}
			.mainRight {float: right;width: 300px;}
			.hsx label {display: block;margin-left: 20px;}
			.parentSubInfo {margin-left: 5px;}
			.ui-jqgrid .ui-jqgrid-pager .ui-pager-table,
			.ui-jqgrid .ui-jqgrid-toppager .ui-pager-table
			{
				width:100%;
				table-layout:fixed;
				height:38px;
			}
			.ui-th-div{
	            height:20px !important;
	            vertical-align: middle!important;
	            line-height:20px;
	        }
			
		</style>
	</head>
	<body>
		<div class="well">
			<div id="AUTH" data-code="JTKJKM" class="btn-group btnHundred" role="group">
				<button type="button" class="btn btn-default" onclick="saveBefore('save')">新增</button>
				<button type="button" class="btn btn-default" onclick="saveBefore('update')">修改</button>
				<button type="button" class="btn btn-default" onclick="enable()">停用</button>
				<button type="button" class="btn btn-default" onclick="deleteSubject()">删除</button>
				<!--<button type="button" class="btn btn-default groupIntroduce" data-eventname="inquire" data-toggle="modal" data-target="">集团引入</button>
				<button type="button" class="btn btn-default ">查找</button>
				<button type="button" class="btn btn-default ">栏目</button>
				<button type="button" class="btn btn-default ">导出</button>
				<button type="button" class="btn btn-default subjectContrast">科目对照</button>
				<button type="button" class="btn btn-default subjectCopy">科目复制</button>-->
				<a class="bn"><select class="btn btn-default quit" id="currentAccountingYear" style="height: 100%;background-image: url(../../images/btnboxbg.png);border: transparent;"></select></a>
			</div>
		</div>

		<!-------------------------------------表格开始----------------------------------------->
		<div class="mainSub">
			<div class="left">
				<div class="left_tree">
					<ul id="companySubjectTree" class="ztree"></ul>
				</div>
			</div>
			<div class="details">
				<div class="right">
					<div class="tablebox retailDetailTable">
						<div class="grid-wrap" style="margin-top:10px">
							<table id="companySubjectTable" class="zxsaastable">
							</table>
							<div id="pager"></div>
						</div>
					</div>
				</div> 
			</div> 
		</div>
		<!-------------------------------------表格结束----------------------------------------->
		<div class="modal fade" id="subjectModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog model-dialog4">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title title" id="subjectLabel">
							科目
						</h4>
					</div>
					<form id="subjectForm">
						<input type="hidden" id="id" name="id">
					<div class="modal-body" id="model-body">
							<div class="btn-group btnHundred" style="min-width: 670px;" role="group">
								<!--<button type="button" class="btn btn-default" data-eventname="">上一张</button>
								<button type="button" class="btn btn-default" data-eventname="">下一张</button>-->
								<button type="button" class="btn btn-default" onclick="save(1)">保存</button>
								<button type="button" class="btn btn-default" onclick="save(2)">保存并新增</button>
								<button type="button" class="btn btn-default" data-eventname="" data-dismiss="modal">退出</button>
							</div>
							<div class="subjectMian">
								<div class="mainLeft">
									<div class=" form-group">
										<span for="" class="box_text2"><span style="color: red;">* &nbsp;</span>科目编码：</span>
										<div class="col-sm-8">
											<div class="input-group">
													<input type="text" class="form-control subjectCode clear" id="subjectCode" name="subjectCode">
											</div>
										</div>
									</div>
									<div class=" form-group">
										<span for="" class="box_text2"><span style="color: red;">* &nbsp;</span>科目名称：</span>
										<div class="col-sm-8">
											<div class="input-group">
												<input type="text" class="form-control subjectName clear" id="subjectName" name="subjectName">
											</div>
										</div>
									</div>
									<div class=" form-group">
										<span for="" class="box_text2">助记码：</span>
										<div class="col-sm-8">
											<div class="input-group">
												<input type="text" class="form-control subjectNo clear" id="mnemonicCode" name="mnemonicCode">
											</div>
										</div>
									</div>
									<div class=" form-group">
										<span for="" class="box_text2"><span style="color: red;">* &nbsp;</span>科目类型：</span>
										<div class="col-sm-8">
											<div class="input-group">
												<select class="form-control clazzSel clear" id="subjectClssify">
												</select>
											</div>
										</div>
									</div>
									<div class=" form-group">
										<span for="" class="box_text2"><span style="color: red;">* &nbsp;</span>余额方向：</span>
										<div class="col-sm-8">
											<div class="input-group">
												<select class="form-control dirSel clear" id="creditDirection" name="creditDirection">
												  <option value=''></option>
												  <option value='1'>借方</option>
												  <option value='0'>贷方</option>
												</select>
											</div>
										</div>
									</div>
									<label class="monSub clear"><input type="checkbox" class="xjll clear" value="0" id="cashFlow" name="cashFlow"> 是否现金流量科目</label>
									<fieldset class="fieLeft" id="">
										<legend><label class="numSub clear" style="font-weight: 500;"><input type="checkbox" class="sjhs clear" value="0" id="ifNumAccounting" name="ifNumAccounting"> 数量核算</label></legend>
										<div class=" form-group">
											<span for="" class="box_text2">计量单位：</span>
											<div class="col-sm-8">
												<div class="input-group" style="width: 150px;">
													<input type="text" class="form-control jldw clear" id="unit" name="unit">
												</div>
											</div>
										</div>
									</fieldset>
								</div>
								<div class="mainRight">
									<p class="roles">编码规则&nbsp;&nbsp;4-2-2-2-2</p>
									<p class="parentSub">上级科目:<span class="parentSubInfo clear" id="fatherSubjectName"></span></p>
									<label for="enable"><input type="checkbox" class="stop clear" value="0" id="enable" name="enable"/> 停用</label><br />
									<label for="ifControl"><input type="checkbox" class="sfsk clear" id="ifControl" name="ifControl"> 是否受控科目</label>
									<fieldset class="fieLeft hsx" id="">
										<legend>辅助核算项</legend>
										<label class=""><input type="checkbox" class="hesuan unit clear" id="partnerAccounting" name="partnerAccounting"> 往来单位</label>
										<label class=""><input type="checkbox" class="hesuan dep clear" id="departmentAccounting" name="departmentAccounting"> 部门</label>
										<label class=""><input type="checkbox" class="hesuan per clear" id="employeeAccounting" name="employeeAccounting"> 职员</label>
									</fieldset>
								</div>
							</div>
					</div>
					</form>
					<div class="modal-footer">
						<button type="button" class="btn btn-warning" data-dismiss="modal">关闭</button>
					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>
		
	</body>
	<script src="${basePath}/js/jquery-1.12.4.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/jquery-form.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/bootstrap.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/jquery.jqGrid.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/jquery.datetimepicker.full.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/grid.locale-cn.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/zxsaas_plus.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/commonjs/xr.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/cw/jquery.ztree.all-3.5.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script type="text/javascript" src="${basePath}/js/erp/cw/voucherManage/gSubject.js?v=${version}"></script>
	<script type="text/javascript" src="${basePath}/js/erp/cw/voucherManage/ajax-company-group.js?v=${version}"></script>
	<script type="text/javascript" src="${basePath}/js/cw/jquery.ztree.core-3.5.min.js?v=${version}"></script>
	<script type="text/javascript" src="${basePath}/js/cw/jquery.ztree.excheck-3.5.min.js?v=${version}"></script>
	<script type="text/javascript" src="${basePath}/js/cw/jquery.ztree.exedit-3.5.min.js?v=${version}"></script>
	<script type="text/javascript" src="${basePath}/js/cw/subject/subject-reference-group.js?v=${version}"></script>
	<script type="text/javascript" src="${basePath}/js/cw/subject/model-group-subject.js?v=${version}"></script>
	<script type="text/javascript" src="${basePath}/js/cw/subject/model-company-subject.js?v=${version}"></script>
	<script type="text/javascript" src="${basePath}/js/erp/cw/voucherManage/kmPublic.js?v=${version}"></script>
	<!-- 菜单权限验证 -->
	<script type="text/javascript" src="${basePath}/js/erp/authority/menuValidation.js?v=${version}"></script>
	<script type="text/javascript">
		var basePath = "${basePath}";
		var subjectAjax = null;
	</script> 
</html>