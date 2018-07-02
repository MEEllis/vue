<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>公司科目</title>
		<meta name="renderer" content="webkit" />
		<meta http-equiv="X-UA-Compatible" content="IE=9; IE=8; IE=7; IE=EDGE ; chrome=1" />
		<link rel="stylesheet" type="text/css" href="${basePath}/css/base.css"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/bootstrap.css" />
		<link rel="stylesheet" type="text/css" href="${basePath}/css/jquery-ui.css" />
		<link rel="stylesheet" type="text/css" href="${basePath}/js/skins/all.css" />
		<link rel="stylesheet" type="text/css" href="${basePath}/css/animate.css"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/bootstrap-select.css"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/pagecss/treepage.css"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/jquery.datetimepicker.css"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/ui.jqgrid-bootstrap.css"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/table.css"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/subjectBal.css"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/pagecss/auxiliary-ledger.css"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/cw/zTreeStyle/zTreeStyle.css">
		<link rel="stylesheet" type="text/css" href="${basePath}/css/cw/subject-reference.css" />
		
		<script type="text/javascript">
			var basePath = "${basePath}";
			var initCompanyId = 12;
			var initYear = 2015;
			var initGroupId	= 8888888;
			var gl_CurrCompanyId = 12;
			var gl_CurrYear = 2015;
		</script> 
		<script src="${basePath}/js/jquery-1.12.4.min.js" type="text/javascript" charset="utf-8"></script>
		<script src="${basePath}/js/bootstrap.min.js" type="text/javascript" charset="utf-8"></script>
		<script src="${basePath}/js/jquery.jqGrid.min.js" type="text/javascript" charset="utf-8"></script>
		<script src="${basePath}/js/jquery.datetimepicker.full.js" type="text/javascript" charset="utf-8"></script>
		<script src="${basePath}/js/grid.locale-cn.js" type="text/javascript" charset="utf-8"></script>		
		<script src="${basePath}/js/commonjs/xm.js" type="text/javascript" charset="utf-8"></script>
		<script src="${basePath}/js/zxsaas_plus.js" type="text/javascript" charset="utf-8"></script>
		<script src="${basePath}/js/jquery.jqGrid.groupHeader-0.2.1.js" type="text/javascript" charset="utf-8"></script>
		<script type="text/javascript" src="${basePath}/js/cw/jquery.ztree.core-3.5.min.js"></script>
		<script type="text/javascript" src="${basePath}/js/cw/jquery.ztree.excheck-3.5.min.js"></script>
		<script type="text/javascript" src="${basePath}/js/cw/jquery.ztree.exedit-3.5.min.js"></script>
		<script type="text/javascript" src="${basePath}/js/cw/subject/model-subject-page.js"></script>
		<script type="text/javascript" src="${basePath}/js/cw/subject/model-subject-compare.js"></script>
		<script type="text/javascript" src="${basePath}/js/cw/subject/model-group-subject.js"></script>
		<script type="text/javascript" src="${basePath}/js/cw/subject/model-company-subject.js"></script>
	    <script type="text/javascript" src="${basePath}/js/cw/subject/subject-reference.js"></script>
	    <script type="text/javascript" src="${basePath}/js/cw/subject/company-subject.js"></script>
	</head>
	
	
	<body>
	
<!------------------------------功能菜单----------------------------------------->
<div class="container" role="main" style="background-color: ">
		<div class="btn-group" role="group" >
			<ul>
				<li data-toggle="modal" data-target="#saveOrUpdateSubject">新增</li>
				<li>修改</li>
				<li onclick="deleteFcompanyInit()">删除</li>
				<li>集团引入</li>
				<li>取消引用</li>
				<li>查找</li>
				<li>栏目</li>
				<li>导出</li>
				<li>科目对照</li>
				<li>科目复制</li>
				<li class="close-li">退出</li>
			</ul>	
		</div>
		
		<!-- 树 -->
		<div class="left_tree">
			<ul id="companySubjectTree" class="ztree"></ul>
		</div>
		
		<!-- 右边表格 -->
		<div class="details">
			<!--页数-->
			<div class="jqGrid_wrapper">
				<table id="companySubjectTable"></table> 
   				<div id="pager"></div>
			</div>
	    </div>
			
</div>
	</body>
</html>

<!-- 新增、修改科目窗口 -->       <!-- Large modal大弹出层 -->
<div class="modal fade bs-example-modal-lg" id="saveOrUpdateSubject" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
		
			<div class="modal-header">
				<div class="row">
					<div class="col-md-12">
						<a class="btn btn-default" href="#" onclick="upPage()" role="button">上张</a>
						<a class="btn btn-default" href="#" onclick="downPage()" role="button">下张</a>
						<a class="btn btn-default" href="javascript:void(0);" onclick="saveFcompanySubjectTemplate()" role="button">保存</a>
						<a class="btn btn-default" href="javascript:void(0);" onclick="saveAndNew()" href="#" role="button">保存并新增</a>
						<a class="btn btn-default" data-dismiss="modal"  role="button">退出</a>
					</div>
				</div>
			</div>
			
			<div class="modal-body">
				<div class="container-fluid">
					<div class="row">
					
						<div class="col-md-6">
							<form class="form-horizontal">
								<div class="form-group">
									<input type="hidden" id="id" name="id"/>
									<input type="hidden" id="groupId" name="groupId"/>
									<input type="hidden" id="companyId" name="companyId"/>
									<input type="hidden" id="currentAccountingYear" name="currentAccountingYear"/>
									<input type="hidden" id="subjectLevel" name="subjectLevel"/>
									<input type="hidden" id="useStatus" name="useStatus"/>
									<input type="hidden" id="ifEndSubject" name="ifEndSubject"/>
									<input type="hidden" id="remark" name="remark"/>
									<input type="hidden" id="source" name="source"/>
									<input type="hidden" id="createUid" name="createUid"/>
									<input type="hidden" id="createTime" name="createTime"/>
									<input type="hidden" id="updateUid" name="updateUid"/>
									<input type="hidden" id="updateTime" name="updateTime"/>
									<input type="hidden" id="fatherId" name="fatherId"/>
									<input type="hidden" id="commonId" name="commonId"/>
									<label for="inputEmail3" class="col-sm-4 control-label">科目编码</label>
									<div class="col-sm-8">
										<input type="text" class="form-control" id="subjectCode" name="subjectCode" placeholder="Email">
									</div>
									
									<label for="inputEmail3" class="col-sm-4 control-label">科目名称</label>
									<div class="col-sm-8">
										<input type="text" class="form-control" id="subjectName" name="subjectName" placeholder="Email">
									</div>
									
									<label for="inputEmail3" class="col-sm-4 control-label">助记码</label>
									<div class="col-sm-8">
										<input type="text" class="form-control" id="mnemonicCode" placeholder="Email">
									</div>
									
									<label for="inputEmail3" class="col-sm-4 control-label">科目类型</label>
									<div class="col-sm-8">
										<select class="form-control" id="subjectClssify">
											<option value="1">资产</option>
											<option value="2">负债</option>
											<option value="3">共同</option>
											<option value="4">所有者权益</option>
											<option value="5">成本</option>
											<option value="6">损益</option>
										</select>
									</div>
									
									<label for="inputEmail3" class="col-sm-4 control-label">方向</label>
									<div class="col-sm-8">
										<select class="form-control" id="creditDirection">
											<option value="0">借方</option>
											<option value="1">贷方</option>
										</select>
									</div>
									
								</div>
							</form>
						</div>
						
						<div class="col-md-6">
							<form class="form-horizontal">
								<label class="col-sm-12 control-label pull-left">
									编码规则 4-2-2-2-2-2
								</label>
								<div class="col-sm-12">
									<div class="checkbox">
										<label><input type="checkbox" id="enable" name="enable">停用</label>
									</div>
								</div>
								
								<div class="col-sm-12">
									<div class="checkbox">
										<label>
											<input type="checkbox" id="ifControl" name="ifControl">
											是否受控科目
										</label>
									</div>
								</div>
								<%--<div class="col-sm-12">
									<div class="checkbox">
										<label>
											<input type="checkbox">
											受控科目是否允许输入主管密码修改，填制凭证
										</label>
									</div>
								</div>--%>
							</form>
						</div>
						
					</div>
					
					<div class="row">
					
						<div class="col-md-6">
							<form class="form-horizontal">
								<div class="col-md-8 col-md-offset-4">
									<div class="checkbox">
										<label>
											<input type="checkbox" id="ifNumAccounting" name="ifNumAccounting">数量核算
										</label>
									</div>
								</div>
								
								<label for="inputEmail3" class="col-sm-4 control-label">计量单位</label>
								<div class="col-sm-8">
									<select class="form-control" id="unit" name="unit">
										<option></option>
										<option value="大华股份">大华股份</option>
										<option value="套">套</option>
									</select>
								</div>
								
								<div class="col-md-8 col-md-offset-4">
									<div class="checkbox">
										<label>
											<input type="checkbox" id="cashFlow" name="cashFlow">是否现金流量科目
										</label>
									</div>
								</div>
							</form>
						</div>
						
						<div class="col-md-6">
						
							<form class="form-horizontal">
							
								<label class="col-sm-12 control-label pull-left">辅助核算项：</label>
								<div class="col-sm-12">
									<div class="checkbox">
										<label>
											<input type="checkbox" id="partnerAccounting" name="partnerAccounting">往来单位
										</label>
									</div>
								</div>
								
								<div class="col-sm-12">
									<div class="checkbox">
										<label>
											<input type="checkbox" id="departmentAccounting" name="departmentAccounting">部门
										</label>
									</div>
								</div>
								
								<div class="col-sm-12">
									<div class="checkbox">
										<label>
											<input type="checkbox" id="employeeAccounting" name="employeeAccounting">职员(个人往来)
										</label>
									</div>
								</div>
							</form>
							
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

	<!-- 科目新增 弹出窗-->
	<div class="modal fade" id="subjectModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog model-dialog4">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						&times;
					</button>
					<h4 class="modal-title title" id="myModalLabel">
						科目
					</h4>
				</div>
				<div class="modal-body" id="model-body">
						<div class="btn-group btnHundred" style="min-width: 670px;" role="group">
							<!--<button type="button" class="btn btn-default" data-eventname="">上一张</button>
							<button type="button" class="btn btn-default" data-eventname="">下一张</button>-->
							<button type="button" class="btn btn-default save" data-eventname="">保存</button>
							<button type="button" class="btn btn-default saveAndAdd" data-eventname="">保存并新增</button>
							<button type="button" class="btn btn-default" data-eventname="" data-dismiss="modal">退出</button>
						</div>
						<div class="subjectMian">
							<div class="mainLeft">
								<div class=" form-group">
									<span for="" class="box_text2"><span style="color: red;">* &nbsp;</span>科目编码：</span>
									<div class="col-sm-8">
										<div class="input-group">
											<input type="text" class="form-control subjectCode clear" id="" placeholder="">
										</div>
									</div>
								</div>
								<div class=" form-group">
									<span for="" class="box_text2"><span style="color: red;">* &nbsp;</span>科目名称：</span>
									<div class="col-sm-8">
										<div class="input-group">
											<input type="text" class="form-control subjectName clear" id="" placeholder="">
										</div>
									</div>
								</div>
								<div class=" form-group">
									<span for="" class="box_text2">助记码：</span>
									<div class="col-sm-8">
										<div class="input-group">
											<input type="text" class="form-control subjectNo clear" id="" placeholder="">
										</div>
									</div>
								</div>
								<div class=" form-group">
									<span for="" class="box_text2"><span style="color: red;">* &nbsp;</span>科目类型：</span>
									<div class="col-sm-8">
										<div class="input-group">
											<select class="form-control clazzSel clear">
											  <option value='1'>资产</option>
											  <option value='2'>负债</option>
											  <option value='3'>权益</option>
											  <option value='4'>成本</option>
											  <option value='5'>损益</option>
											</select>
										</div>
									</div>
								</div>
								<div class=" form-group">
									<span for="" class="box_text2"><span style="color: red;">* &nbsp;</span>余额方向：</span>
									<div class="col-sm-8">
										<div class="input-group">
											<select class="form-control dirSel clear">
											  <option value='01'>借方</option>
											  <option value='02'>贷方</option>
											</select>
										</div>
									</div>
								</div>
								<label class="monSub clear"><input type="checkbox" class="xjll clear"> 是否现金流量科目</label>
								<fieldset class="fieLeft" id="">
									<legend><label class="numSub clear" style="font-weight: 500;"><input type="checkbox" class="sjhs clear"> 数量核算</label></legend>
									<div class=" form-group">
										<span for="" class="box_text2">计量单位：</span>
										<div class="col-sm-8">
											<div class="input-group" style="width: 150px;">
												<input type="text" class="form-control jldw clear" disabled id="" placeholder="">
											</div>
										</div>
									</div>
								</fieldset>
							</div>
							<div class="mainRight">
								<p class="roles">编码规则&nbsp;&nbsp;4-2-2-2-2</p>
								<p class="parentSub">上级科目<span class="parentSubInfo clear"></span></p>
								<label for=""><input type="checkbox" class="stop clear" /> 停用</label><br />
								<label for=""><input type="checkbox" class="sfsk clear" disabled>是否受控科目</label>
								<fieldset class="fieLeft hsx" id="">
									<legend>辅助核算项</legend>
									<label class=""><input type="checkbox" class="hesuan unit clear"> 往来单位</label>
									<label class=""><input type="checkbox" class="hesuan dep clear"> 部门</label>
									<label class=""><input type="checkbox" class="hesuan per clear"> 职员</label>
								</fieldset>
							</div>
						</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-warning" data-dismiss="modal">关闭</button>
				</div>
			</div><!-- /.modal-content -->
		</div><!-- /.modal -->
	</div>
