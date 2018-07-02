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
		<title>公司会计科目</title>
		<style type="text/css"><!--
			.ui-jqgrid .ui-jqgrid-htable .ui-th-div {text-align: center;}
			.mainSub {min-width: 1175px !important;}
			.left {width: 14%;float: left;}
			.details {width: 86%;float: left;}
			.left_tree {height: 600px;overflow: auto;}
			.model-dialog4 {width: 700px;}
			.details .right {height: 40px;}
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
			#gbox_jqGrid_subComparison,#gbox_jqGrid_subDiff {width: 437px;float: left;}
			#gbox_jqGrid_subComparisonRight,#gbox_jqGrid_subDiffRight {width: 418px;float: left;}
			#gview_jqGrid_subComparison .ui-jqgrid-bdiv,#gbox_jqGrid_subDiff .ui-jqgrid-bdiv,#gbox_jqGrid_subDiffRight .ui-jqgrid-bdiv{overflow-x: hidden;}
			.btnHundred {min-width: 860px;}
			#jqgh_jqGrid_subDiff_rn {height: 54px; line-height: 54px;}
			.ui-jqgrid .ui-jqgrid-pager .ui-pager-table,
			.ui-jqgrid .ui-jqgrid-toppager .ui-pager-table
			{
				width:100%;
				table-layout:fixed;
				height:38px; 
			}
			td#groupGridpager_left { display: none;}
			td#input_groupGridpager {width:112px;}
			.ui-th-div{
	            height: 22px !important;
	            vertical-align: middle!important;
	            line-height: 20px;
	        }
	        #currentAccountingYear{
	            background-image: url("${basePath}/images/btnboxbg.png");
			    text-align: left;
			    border: 0;
			    padding-bottom:2px;
	        }

		#subjectControlModal span.input-group-btn,
		#subjectControlModal span.input-group-btn > button
		{
			height: 34px;
		}
		</style>
	</head>
	<body>
		<div class="well">
			<div id="AUTH" data-code="GSKJKM" class="btn-group btnHundred" role="group">
				<button type="button" class="btn btn-default" onclick="saveBefore('save')">新增</button>
				<button type="button" class="btn btn-default" onclick="saveBefore('update')">修改</button>
				<button type="button" class="btn btn-default" onclick="enable()">停用</button>
				<button type="button" class="btn btn-default" onclick="deleteSubject()">删除</button>
				<button type="button" class="btn btn-default SubjectControl" onclick="SubjectControl()">科目对照</button>
				<!--
				<button type="button" class="btn btn-default groupIntroduce" data-eventname="inquire" data-toggle="modal" data-target="" style="display: none;">集团引入</button>
				<button type="button" class="btn btn-default ">查找</button>
				<button type="button" class="btn btn-default ">栏目</button>
				<button type="button" class="btn btn-default ">导出</button>
				<button type="button" class="btn btn-default subjectContrast" style="display: none;">科目对照</button>
				<button type="button" class="btn btn-default subjectCopy" style="display: none;">科目复制</button>-->
				
				<select class="btn btn-default" id="currentAccountingYear"></select>
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
	
		<!-- 集团引入 弹窗 -->
		<div class="modal fade" id="groupModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog" style="width: 800px;">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal"
							aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							集团引入参照
						</h4>
					</div>
					<div class="modal-body">
						<div class="container">
							<div class="left">
								<div class="left_tree">
									<ul id="groupTreeData" class="ztree"></ul>
								</div>
							</div>
							<!--展示列表开始-->
							<div class="details">
							   <div class="right">
									<input type="text" placeholder="编码、名称模糊搜索" id="groupRemCode" class="form-control" style="width:200px;"/>
								</div>
								<!--表格-->
								<div class="jqGrid_wrap">
									<table id="groupModalGrid" class="zxsaastable"></table>
									<div id="groupGridpager"></div>
								</div>
							</div>
							<!--展示列表结束-->
						</div>
		
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-success saveSub">确定</button>
						<button type="button" class="btn btn-warning" data-dismiss="modal">关闭</button>
					</div>
				</div>
				<!-- /.modal-content -->
			</div>
		</div>
		
		<!-- 科目对照 弹出窗-->
		<div class="modal fade" id="subComparisonModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog " style="width: 900px;">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							科目对照
						</h4>
					</div>
					<div class="modal-body" id="model-body">
							<div class="btn-group btnHundred" role="group">
								<button type="button" class="btn btn-default save" data-eventname="">保存</button>
								<button type="button" class="btn btn-default subDiff" data-eventname="">差异科目</button>
								<button type="button" class="btn btn-default subInfo" data-eventname="">科目信息</button>
								<div class="btn-group">
								    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
								     	打印
								      <span class="caret"></span>
								    </button>
								    <ul class="dropdown-menu" role="menu">
								      <li><a href="#">打印设置</a></li>
								      <li><a href="#">打印预览</a></li>
								      <li><a href="#">打印</a></li>
								    </ul>
								</div>
								<button type="button" class="btn btn-default" data-eventname="" data-dismiss="modal">退出</button>
							</div>
							<div class="tablebox retailDetailTable">
								<div class="grid-wrap" style="margin-top:10px;height:auto;overflow:hidden;width:50%;float: left;">
									<table id="jqGrid_subComparison" class="zxsaastable" ></table>
									<div id="jqGridPager_subComparison"></div>
									<!--<table id="jqGrid_subComparisonRight" class="zxsaastable" style="width:50%;float: left;"></table>
									<div id="jqGridPager_subComparisonRight"></div>
								--></div>
								
								<div class="grid-wrap" style="margin-top:10px;height:auto;overflow:hidden;width:50%;float: left;">
									<!--<table id="jqGrid_subComparison" class="zxsaastable"></table>
									<div id="jqGridPager_subComparison"></div>
									--><table id="jqGrid_subComparisonRight" class="zxsaastable"></table>
									<div id="jqGridPager_subComparisonRight"></div>
								</div>
							</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-warning" data-dismiss="modal">关闭</button>
					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>


		<!-- 科目对照 弹出窗-->
		<div class="modal fade" id="subjectControlModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog" style="width: 800px;">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title title" >
							科目对应关系
						</h4>
					</div>
					<div class="modal-body">
						<div class="">
								<div class="tr">
									<button type="button" class="erp-link-lab subjectControlImport " title="" style="margin-right: 25px;">导出</button>
									<button type="button" class="erp-btn-lab subjectControlDifferences" style="margin-right: 25px;">查看差异</button>
									<button type="button" class="erp-btn-lab none subjectControlExit" style="margin-right: 25px;">退出</button>
									<button type="button" class="erp-btn-bg subjectControlSave" style="margin-right: 20px;">保存</button>
								</div>
								<!--表格-->
								<div class="jqGrid_wrap mt20">
									<table id="subjectControlGrid" class="zxsaastable"></table>
								</div>
							<!--展示列表结束-->
						</div>
					</div>

				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>

		<!-- 科目参照 弹出窗-->
		<div class="modal fade" id="subjectDirModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog" style="width: 800px;">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title title" id="myModalLabel">
							科目参照
						</h4>
					</div>
					<div class="modal-body" id="model-body">
						<div class="container">
							<div class="left">
								<div class="left_tree">
									<ul id="groupTreeData2" class="ztree"></ul>
								</div>
							</div>
							<!--展示列表开始-->
							<div class="details">
							   <div class="right">
									<input type="text" placeholder="编码、名称模糊搜索" id="groupRemCode2" class="form-control" style="width:200px;"/>
								</div>
								<!--表格-->
								<div class="jqGrid_wrap">
									<table id="unitModalGrid" class="zxsaastable"></table>
									<div id="unitGridpager"></div>
								</div>
							</div>
							<!--展示列表结束-->
						</div>
							
					</div>
					<div class="modal-footer">
						<!--<button type="button" class="btn btn-success saveSubject">确定</button>-->
						<button type="button" class="btn btn-warning" data-dismiss="modal">关闭</button>
					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>
		
		<!-- 差异科目 弹出窗-->
		<div class="modal fade" id="subDiffModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog " style="width: 900px;">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							差异科目
						</h4>
					</div>
					<div class="modal-body" id="model-body">
							<div class="btn-group btnHundred" role="group">
								<div class="btn-group">
								    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
								     	打印
								      <span class="caret"></span>
								    </button>
								    <ul class="dropdown-menu" role="menu">
								      <li><a href="#">打印设置</a></li>
								      <li><a href="#">打印预览</a></li>
								      <li><a href="#">打印</a></li>
								    </ul>
								</div>
								<button type="button" class="btn btn-default" data-eventname="" data-dismiss="modal">退出</button>
							</div>
							<div class="tablebox retailDetailTable">
								<div class="grid-wrap" style="margin-top:10px">
									<table id="jqGrid_subDiff" class="zxsaastable" style="width: 537px;float: left;"></table>
									<div id="jqGridPager_subDiff"></div>
									<table id="jqGrid_subDiffRight" class="zxsaastable" style="width: 518px;float: left;"></table>
									<div id="jqGridPager_subDiffRight"></div>
								</div>
							</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-warning" data-dismiss="modal">关闭</button>
					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>
		
			<!-- 科目新增 弹出窗-->
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
									<label class="monSub clear" for="cashFlow"><input type="checkbox" class="xjll clear" value="0" id="cashFlow" name="cashFlow"> 是否现金流量科目</label>
									<fieldset class="fieLeft" id="">
										<legend><label class="numSub clear" style="font-weight: 500;" for="ifNumAccounting"><input type="checkbox" class="sjhs clear" value="0" id="ifNumAccounting" name="ifNumAccounting"> 数量核算</label></legend>
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
										<label for="partnerAccounting"><input type="checkbox" class="hesuan unit clear" id="partnerAccounting" name="partnerAccounting"> 往来单位</label>
										<label for="departmentAccounting"><input type="checkbox" class="hesuan dep clear" id="departmentAccounting" name="departmentAccounting"> 部门</label>
										<label for="employeeAccounting"><input type="checkbox" class="hesuan per clear" id="employeeAccounting" name="employeeAccounting"> 职员</label>
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
	<script src="${basePath}/js/component.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/zxsaas_plus.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/commonjs/xr.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/cw/jquery.ztree.all-3.5.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script type="text/javascript" src="${basePath}/js/erp/cw/voucherManage/cSubject.js?v=${version}"></script>
	<script type="text/javascript" src="${basePath}/js/erp/cw/voucherManage/ajax-company-group.js?v=${version}"></script>
	<script type="text/javascript" src="${basePath}/js/cw/jquery.ztree.core-3.5.min.js?v=${version}"></script>
	<script type="text/javascript" src="${basePath}/js/cw/jquery.ztree.excheck-3.5.min.js?v=${version}"></script>
	<script type="text/javascript" src="${basePath}/js/cw/jquery.ztree.exedit-3.5.min.js?v=${version}"></script>
	<script type="text/javascript" src="${basePath}/js/cw/subject/subject-reference.js?v=${version}"></script>
	<script type="text/javascript" src="${basePath}/js/cw/subject/model-group-subject.js?v=${version}"></script>
	<script type="text/javascript" src="${basePath}/js/cw/subject/model-company-subject.js?v=${version}"></script>
	<script type="text/javascript" src="${basePath}/js/erp/cw/voucherManage/kmPublic.js?v=${version}"></script>
	<!-- 菜单权限验证 -->
	<script type="text/javascript" src="${basePath}/js/erp/authority/menuValidation.js?v=${version}"></script>
	<script type="text/javascript"><!--
		var basePath = "${basePath}";
		var subjectAjax = null;
	</script> 
</html>