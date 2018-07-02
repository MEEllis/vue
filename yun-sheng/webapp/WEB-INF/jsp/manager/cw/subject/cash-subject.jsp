<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<meta charset="UTF-8">
		<meta name="renderer" content="webkit" />
		<meta http-equiv="X-UA-Compatible" content="IE=9; IE=8; IE=7; IE=EDGE ; chrome=1" />
		<link rel="stylesheet" type="text/css" href="../../css/base.css" />
		<link rel="stylesheet" type="text/css" href="../../css/bootstrap.css" />
		<link rel="stylesheet" type="text/css" href="../../css/jquery-ui.css" />
		<link rel="stylesheet" type="text/css" href="../../js/skins/all.css" />
		<link rel="stylesheet" type="text/css" href="../../css/animate.css" />
		<link rel="stylesheet" type="text/css" href="../../css/bootstrap-select.css" />
		<link rel="stylesheet" type="text/css" href="../../css/font-awesome.css" />
		<link rel="stylesheet" type="text/css" href="../../css/iconfont.css" />
		<link rel="stylesheet" type="text/css" href="../../css/pagecss/treepage.css" />
		<link rel="stylesheet" type="text/css" href="../../css/jquery.datetimepicker.css" />
		<link rel="stylesheet" type="text/css" href="../../css/ui.jqgrid-bootstrap.css" />
		<link rel="stylesheet" type="text/css" href="../../css/cw/zTreeStyle/zTreeStyle_.css"/>
		<link rel="stylesheet" type="text/css" href="../../css/market/public.css" />
		<title>现金流量科目</title>
		<style type="text/css">
			.ui-jqgrid .ui-jqgrid-htable .ui-th-div {text-align: center;}
			.mainSub {min-width: 1175px !important;}
			.left {width: 14%;float: left;}
			.details {width: 86%;float: left;}
			.left_tree {height: 687px;overflow: auto;}
			.model-dialog4 {width: 700px;}
		</style>
	</head>
	<body>
		<div class="well">
			<div class="btn-group btnHundred" role="group">
				<button type="button" class="btn btn-default save" data-eventname="">保存</button>
				<button type="button" class="btn btn-default noSave" data-eventname="">放弃</button>
				<button type="button" class="btn btn-default quit" data-eventname="">退出</button>
			</div>
		</div>

		<!-------------------------------------表格开始----------------------------------------->
		<div class="mainSub">
			<div class="details">
					<div class="tablebox retailDetailTable">
						<div class="grid-wrap" style="margin-top:10px">
							<table id="jqGrid_subject" class="zxsaastable">
							</table>
							<div id="jqGridPager_subject"></div>
						</div>
					</div>
			</div> 
		</div>
		<!-------------------------------------表格结束----------------------------------------->
		<!-- 科目参照 弹出窗-->
		<div class="modal fade" id="subjectModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog model-dialog4">
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
							<div class="right">
								<input type="text" placeholder="编码、名称、类别、方向" id="subSearch" class="form-control" style="width:200px;margin-bottom: 10px;"/>
							</div>
							<div class="jqGrid_wrap">
								<table id="unitModalGrid" class="zxsaastable"></table>
								<div id="unitGridpager"></div>
							</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-success saveSub">确定</button>
						<button type="button" class="btn btn-warning" data-dismiss="modal">关闭</button>
					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>
		
	</body>
	<script src="../../js/jquery-1.12.4.min.js" type="text/javascript" charset="utf-8"></script>
	<script src="../../js/jquery-form.js" type="text/javascript" charset="utf-8"></script>
	<script src="../../js/bootstrap.min.js" type="text/javascript" charset="utf-8"></script>
	<script src="../../js/jquery.jqGrid.min.js" type="text/javascript" charset="utf-8"></script>
	<script src="../../js/jquery.datetimepicker.full.js" type="text/javascript" charset="utf-8"></script>
	<script src="../../js/grid.locale-cn.js" type="text/javascript" charset="utf-8"></script>
	<script src="../../js/zxsaas_plus.js" type="text/javascript" charset="utf-8"></script>
	<script src="../../js/commonjs/xr.js" type="text/javascript" charset="utf-8"></script>
	<script src="../../js/cw/jquery.ztree.all-3.5.min.js" type="text/javascript" charset="utf-8"></script>
	<script src="../../js/cw/moneySub.js" type="text/javascript" charset="utf-8"></script>
</html>
