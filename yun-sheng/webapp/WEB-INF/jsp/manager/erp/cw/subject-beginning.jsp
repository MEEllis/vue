<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<meta name="renderer" content="webkit" />
		<meta http-equiv="X-UA-Compatible" content="IE=9; IE=8; IE=7; IE=EDGE ; chrome=1" />
		<link rel="stylesheet" type="text/css" href="../../css/base.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="../../css/bootstrap.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="../../css/jquery-ui.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="../../js/skins/all.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="../../css/animate.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="../../css/bootstrap-select.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="../../css/font-awesome.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="../../css/iconfont.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="../../css/pagecss/treepage.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="../../css/ui.jqgrid-bootstrap.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="../../css/jquery.datetimepicker.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="../../css/cw/zTreeStyle/zTreeStylePublicModel.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="../../html/muti_select/multi.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="../../css/ui.jqgrid-bootstrap.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="../../css/market/public.css?v=${version}" />
		<title>期初余额</title>
		<style type="text/css">
			.ui-jqgrid .ui-jqgrid-htable .ui-th-div {text-align: center;}
			.model-dialog3 {width: 600px;}
			.model-dialog4 {width: 800px;}
			.model-dialog5 {width: 1100px;}
			.qcMain {margin: 30px 0px 30px 200px;}
			.qcMain p {height: 30px;}
			.left {width: 15%;float: left;margin-top: 32px;}
			.left_tree {height: 450px;overflow: auto;}
			.details .right {height: 40px;}
			.details {width: 85%;float: left;}
			#gbox_jqGrid_trialBalance {width: 537px;float: left;}
			#gbox_jqGrid_trialBalanceRight {width: 518px;float: left;}
			#gview_jqGrid_trialBalance .ui-jqgrid-bdiv{overflow-x: hidden;}
			/*表格表头（th）*/
			th { font-weight:bold;}
		</style>
		<script type="text/javascript">
		var basePath = "${basePath}";
	</script>
	</head>

	<body>
		<div class="well">
			<div id="AUTH" data-code="KMQC" class="btn-group btnHundred" role="group">
				<button type="button" class="btn btn-default saveData" onclick="saveData();">保存</button>
				<button type="button" class="btn btn-default trialBalance" data-eventname="inquire" data-toggle="modal" data-target="">试算平衡</button>
				<button type="button" class="btn btn-default checkingModal">期初对账</button>
				<button type="button" class="btn btn-default refresh" data-eventname="refresh">刷新</button>
				<button type="button" class="btn btn-default subjectInto" data-eventname="refresh" onclick="window.parent.openWorkBoxByMenutext('科目期初导入','/manager/beginning/cw/toSubjectPage');">科目期初导入</button>
			   	<button type="button" class="btn btn-default auInto" data-eventname="refresh" onclick="window.parent.openWorkBoxByMenutext('辅助期初导入','/manager/beginning/cw/toAuxiliaryPage');">辅助期初导入</button>
			</div>
			<form id="inquire_option">
				<div class="inputbox container-fluid clearfix">
					<div class="row">
					   <div class="Zpercent form-group">
							<span class="box_text2">部门名称：</span>
							<div class="input-group">
						      <input type="text"  class="form-control" name="sectionName" id="sectionName"  readonly="readonly" >
					          <input type="hidden" name="sectionId" id="sectionId" >
					      <span class="input-group-btn">
					        <button class="btn btn-default" type="button" data-toggle="modal" onclick="showSectionModal();" id="sectionBtn">
					        	<span class="glyphicon glyphicon-plus"></span>
					        </button>
					      </span>
					     </div>
					  </div>
						<div class="Zpercent form-group">
							<span for="" class="box_text2">会计年度：</span>
							<div class="col-sm-8">
								<div class="input-group">
									<select class="form-control" id="accountYearSelect" onchange="changeAccountYear()"></select>
								</div>
							</div>
						</div>
						<div class="Zpercent form-group">
							<span for="" class="box_text2">快速定位：</span>
							<div class="col-sm-8">
								<div class="input-group">
									<input type="text" class="form-control" id="searchText" placeholder="科目编码+科目名称">
								</div>
							</div>
						</div>
						<div class="Zpercent form-group">
							<span class="box_text2" style="float: right;font-size:24px;font-weight:bold;color: red;display: none;" id="isPost">只&nbsp;读</span>   
							<span for="" class="box_text2" style="float: right;">单位：元  </span> 
						</div>
					</div>
				</div>
			</form>
		</div>

		<!-------------------------------------表格开始----------------------------------------->
		<div class="tablebox retailDetailTable">
			<div class="grid-wrap table-main" style="margin-top:10px">
				<table id="jqGrid_balance" class="zxsaastable"></table>
			</div>
		</div>
		<!-------------------------------------表格结束----------------------------------------->
	</body>
	<script src="../../js/jquery-1.12.4.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="../../js/bootstrap.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="../../js/jquery.jqGrid.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="../../js/jquery.datetimepicker.full.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="../../js/grid.locale-cn.js?v=${version}" type="text/javascript" charset="utf-8"></script>
    <script src="../../js/commonjs/xr.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="../../js/zxsaas_plus.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="../../js/cw/jquery.ztree.all-3.5.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="../../html/muti_select/MultiSelectDropList.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="../../js/commonjs/xr.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="../../js/cw/bootstrap/js/bootstrap-dialog.min.js?v=${version}"></script>
	<script type="text/javascript" charset="utf-8" src="../../js/commonjs/eidit-grid-test.js?v=${version}" ></script>
	<!-- 菜单权限验证 -->
	<script type="text/javascript" src="${basePath}/js/erp/authority/menuValidation.js?v=${version}"></script>
	<script type="text/javascript">
        document.write("<scr"+"ipt src=\"../../js/erp/cw/subjectBeginning/subject-beginning.js\"></sc"+"ript>");
        document.write("<scr"+"ipt src=\"../../js/erp/cw/subjectBeginning/common.js\"></sc"+"ript>");
   </script>
	<%--<script src="../../js/erp/cw/subjectBeginning/subject-beginning.js?v=1.2.1" type="text/javascript" charset="utf-8"></script>
	<script src="../../js/erp/cw/subjectBeginning/common.js?v=1.2.1" type="text/javascript" charset="utf-8"></script>--%>
</html>

<!-------------------------------------模态框开始----------------------------------------->
<!-- 辅助核算期初弹出窗-->
		<div class="modal fade" id="assistModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog model-dialog4" >
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							辅助核算期初
						</h4>
					</div>
					<div class="modal-body" id="model-body">
							<div class="tip">
								<span class="show" style="margin: 5px 0;"></span>
							</div>
								<div class="tablebox retailDetailTable">
									<div class="grid-wrap" style="margin-top:10px">
										<table id="dataGrid2" class="zxsaastable">
										</table>
									</div>
								</div>
					</div>
					<div class="modal-footer">
					    <button type="button" class="btn btn-info sumAddQuit" onclick="sumAddQuit();">汇总并退出</button>
						<button type="button" class="btn btn-warning" data-dismiss="modal">关闭</button>
					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
	</div>
	
<!-- 部门名称模态框 -->
<div class="modal fade" id="sectionModal" tabindex="-1" role="dialog" aria-labelledby="mySection" aria-hidden="true">
	<div class="modal-dialog tree-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"
					aria-hidden="true">
					&times;
				</button>
				<h4 class="modal-title" id="myModalLabel">
					部门选择
				</h4>
			</div>
			<div class="modal-body tree-body">
				<ul id="sectionTreeData" class="ztree"></ul>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-warning" data-dismiss="modal">关闭</button>
			</div>
		</div>
	</div>
</div>

		<!--往来单位模态框-->
		<div class="modal fade" id="contactUnitModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog" style="width: 900px;">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal"
							aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							往来单位选择
						</h4>
					</div>
					<div class="modal-body">
						<div class="container">
							<div class="left">
								<div class="left_tree">
									<ul id="contactunitTreeData" class="ztree"></ul>
								</div>
							</div>
							<!--展示列表开始-->
							<div class="details">
							   <div class="right">
									<input type="text" placeholder="编码、名称、助记码模糊搜索" id="contactunitRemCode" style="width:200px;"/>
								</div>
								<!--表格-->
								<div class="jqGrid_wrap">
									<table id="contactunitModalGrid" class="zxsaastable"></table>
									<div id="contactunitGridpager"></div>
								</div>
							</div>
							<!--展示列表结束-->
						</div>
		
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-warning" data-dismiss="modal">关闭</button>
					</div>
				</div>
				<!-- /.modal-content -->
			</div>
		</div>
		
		<!-- 职员选择 -->
		<div class="modal fade" id="employeeModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog" style="width: 900px;">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal"
							aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							职员选择
						</h4>
					</div>
					<div class="modal-body">
						<div class="container">
							<div class="left">
								<div class="left_tree">
									<ul id="employeeTreeData" class="ztree"></ul>
								</div>
							</div>
							<!--展示列表开始-->
							<div class="details">
							   <div class="right">
									<input type="text" placeholder="编码、名称、助记码模糊搜索"  style="width:200px;"  id="managerRemCode" value=""/>
								</div>
								<!--表格-->
								<div class="jqGrid_wrap">
									<table id="employeeModalGrid" class="zxsaastable"></table>
									<div id="employeeGridpager"></div>
								</div>
							</div>
							<!--展示列表结束-->
						</div>
		
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-warning" data-dismiss="modal">关闭</button>
					</div>
				</div>
				<!-- /.modal-content -->
			</div>
		</div>
		
<!-- 期初对账弹出窗-->
		<div class="modal fade" id="checkingModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog model-dialog3">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">期初对账</h4>
					</div>
					<div class="modal-body" id="model-body">
							<div class="tip">
								<span class="qcTime" style="margin: 5px 0;"></span>
							</div>
							<div class="qcMain">
								<p class="p2"><span></span><span>年初+累计＝期初</span></p>
								<p class="p3"><span></span><span>科目期初与辅助期初</span></p>
							</div>	
					</div>
					<div class="modal-footer">
					    <button type="button" class="btn btn-info" data-toggle="modal" data-target="#errorInfoModal">查看错误列表</button>
						<button type="button" class="btn btn-primary checking">对账</button>
						<button type="button" class="btn btn-warning" data-dismiss="modal">关闭</button>
					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>
		
	<!-- 试算平衡弹出窗-->
		<div class="modal fade" id="trialBalanceModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog model-dialog5">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						<h4 class="modal-title" id="myModalLabel">试算平衡</h4>
					</div>
					<div class="modal-body" id="model-body">
							<div class="tip">
								<span class="show" style="margin: 5px 0;"></span>
							</div>
								<div class="tablebox retailDetailTable">
									<div class="grid-wrap" style="margin-top:10px">
										<table id="jqGrid_trialBalance" class="zxsaastable" style="width: 537px;float: left;"></table>
										<div id="jqGridPager_trialBalance"></div>
										<table id="jqGrid_trialBalanceRight" class="zxsaastable" style="width: 518px;float: left;"></table>
										<div id="jqGridPager_trialBalanceRight"></div>
									</div>
								</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-warning" data-dismiss="modal">关闭</button>
					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>
		
		<!-- 错误列表模态框-->
		<div class="modal fade" id="errorInfoModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog tree-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						<h4 class="modal-title" id="myModalLabel">错误列表</h4>
					</div>
					<div class="modal-body" id="model-body">
						<span style="font-weight:bold;">年初+累计=期初对账不平衡科目</span><br/>
						<span id="periodAndYearRecon" ></span>
						<br/><br/>
						<span  style="font-weight:bold;">科目期初与辅助期初对账不平衡科目</span><br/>
						<span id="periodAssistRecon" ></span>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-warning" data-dismiss="modal">退出</button>
					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>