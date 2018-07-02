<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<meta name="renderer" content="webkit" />
		<meta http-equiv="X-UA-Compatible" content="IE=9; IE=8; IE=7; IE=EDGE ; chrome=1" />
		<link rel="stylesheet" href="${basePath}/css/bootstrap.css?v=${version}"/>
		<link rel="stylesheet" href="${basePath}/css/bootstrapValidator.css?v=${version}"/><!-- 验证 -->
		<link rel="stylesheet" href="${basePath}/css/cw/zTreeStyle/zTreeStyle_.css?v=${version}"/><!-- 树 -->
		<link rel="stylesheet" href="${basePath}/css/jquery-ui.css?v=${version}"/><!-- 表格 -->
		<link rel="stylesheet" href="${basePath}/css/ui.jqgrid-bootstrap.css?v=${version}"/><!-- 表格 -->
		<link rel="stylesheet" href="${basePath}/css/jquery.datetimepicker.css?v=${version}"/><!-- 日期 -->
		<link rel="stylesheet" href="${basePath}/css/base.css?v=${version}"/>
		<link rel="stylesheet" href="${basePath}/css/iconfont/iconfont.css?v=${version}"/>
		<link rel="stylesheet" href="${basePath}/css/bootstrap-datetimepicker.css?v=${version}"/>
		<%--新版公共样式表--%>
		<link rel="stylesheet" href="${basePath}/css/inventory/common.css?v=${version}"/>
		<title>预付款</title>
		<script type="text/javascript">
			//**********全局变量wxm 2017-05-09
			var basePath = "${basePath}";
			var billsCode = "${billsCode}";
	   </script>
	   <style>
	   	.modal-content-dialog{
	   			width:600px;
	   		}
		   .input-group-btn{
			   width:0;
		   }

	   </style>
	</head>

	<body class="e-body-bg pageBill">
	<div class="btn-toolbar " id="MenuTool"  data-code="YFKD"  >
	</div>
		<!-------------------------------------主页面开始----------------------------------------->
			<div id="AUTH" data-code="YFKD" class="none btn-group btnHundred" role="group" >
			  <button type="button" class="btn btn-default" onclick="firstPage()">首单</button>
			  <button type="button" class="btn btn-default" onclick="backPage()">上一单</button>
			  <button type="button" class="btn btn-default" onclick="nextPage()">下一单</button>
			  <button type="button" class="btn btn-default" onclick="lastPage()">末单</button>
			  <button type="button" class="btn btn-default addAudit" onclick="add();">新增</button>
			  <%--<button type="button" class="btn btn-default saveAndPost" onclick="saveAndPost()">保存并过账</button>	--%>
				<button type="button" class="btn btn-default save" onclick="save()">保存</button>
				<button type="button" class="btn btn-default post" onclick="post()">过账</button>
			  <button type="button" class="btn btn-default invalid" onclick="invalid();">红冲</button>
			  <button type="button" class="btn btn-default" id="20" onclick="print(this.id)">打印</button>   
			  <button type="button" class="btn btn-default" onclick="filterModalBtnClick();">过滤</button>
			  <button type="button" class="btn btn-default" id="copy" onclick="copy();" disabled="disabled">复制</button>
			  <button type="button" class="btn btn-default" onclick="javascript:parent.openWorkBoxByMenutext('往来结算','../manager/funds/settlement/initSettlement');">预付冲应付</button>
				<button type="button" class="btn btn-default btn-yindao-btn" style="float:right;"
						onclick="window.parent.openWorkBoxByMenutext('预付款单-单据列表',  '/manager/inventory/fund/historyMain?billsType=20', true)">历史单据</button>

				<input type="hidden" value="20" id="payreceiptType"/>
			</div>
			
			<!-------------------------------------搜索条件开始----------------------------------------->
	<div class="pageBillForm gridTop" id="collapseExample">
		<form id="billsHeaderForm" class="form-inline clearfix">
			<input type="hidden" name="id"/>
			<input type="hidden" name="billsStatus"/>
			<input type="hidden" name="auditStatus"/>
			<div id="billsCodeWrap"  class="form-group col-sm-3">
				<label  class="width-25">单据编号:</label>
				<div class="input-group col-sm-8">
					<input type="text" class="form-control" name="billsCode" id="billsCode" readonly="readonly" style="padding:0" />
				</div>
			</div>

			<div class="form-group col-sm-3">
				<label  class="width-25">部门名称:</label>
				<div class="input-group col-sm-8">
					<input type="text"  class="form-control" name="sectionName" id="sectionName"  readonly="readonly" >
					<input type="hidden" name="sectionId" id="sectionId" >
				</div>
			</div>
			<div class="form-group col-sm-3">
				<label  class="width-25">往来单位:</label>
				<div class="input-group col-sm-8">
					<input type="text"  class="form-control" name="contactUnitName" id="contactUnitName"  readonly="readonly" >
					<input type="hidden"  name="contactsunitId" id="contactsunitId" >
				</div>
			</div>
			<div class="form-group col-sm-3">
				<label  class="width-25">单据日期:</label>
				<div class="input-group col-sm-8">
					<input type="text" class="form-control" name="billsDate" readonly="readonly" id="billsDate"  placeholder="年-月-日" />
				</div>
			</div>
			<div class="form-group col-sm-3">
				<label  class="width-25">应付余额:</label>
				<div class="input-group col-sm-8">
					<input type="text" class="form-control" name="receivableAmount" id="receivableAmount" readonly="readonly" />
				</div>
			</div>
			<div class="form-group col-sm-3">
				<label  class="width-25">预付余额:</label>
				<div class="input-group col-sm-8">
					<input type="text" class="form-control" name="planReceAmount" id="planReceAmount" readonly="readonly" />
				</div>
			</div>
			<div class="form-group col-sm-3">
				<label  class="width-25">经手人:</label>
				<div class="input-group col-sm-8">
					<input type="text"  class="form-control" name="managerUname" id="managerUname" placeholder="部门名称先选"  readonly="readonly" >
					<input type="hidden"  name="managersUid" id="managersUid" >
				</div>
			</div>
			<div class="form-group col-sm-3">
				<label  class="width-25">单备注:</label>
				<div class="input-group col-sm-8">
					<input type="text" name="remark" id="remark" value=""  class="form-control" />
				</div>
			</div>
			<div class="form-group col-sm-3">
				<label  class="width-25">开户行:</label>
				<div class="input-group col-sm-8">
					<input type="text" name="brankName" id="brankName" value=""  class="form-control" readonly="readonly" />
				</div>
			</div>
			<div class="form-group col-sm-3">
				<label  class="width-25">银行户名:</label>
				<div class="input-group col-sm-8">
					<input type="text" name="customer" id="customer" value=""  class="form-control" readonly="readonly"/>
				</div>
			</div>
			<div class="form-group col-sm-3">
				<label  class="width-25">银行账号:</label>
				<div class="input-group col-sm-8">
					<input type="text" name="brankAmount" id="brankAmount" value=""  class="form-control" readonly="readonly"/>
				</div>
			</div>

			<div class="rightMap">
				<img src="" />
				<img id="auditImg" class="ml10" src="" />
			</div>
		</form>
	</div>
			<!-------------------------------------搜索条件结束----------------------------------------->			
			<!-------------------------------------表格开始----------------------------------------->
			<div class="tablebox retailDetailTable">
				<div class="none">
					<input type="hidden" id="dataGridAccountName" data-desc="账户名称模态框">
				</div>
				<div class="grid-wrap" style="margin-top:10px">
					<table id="jqGrid_SubjectBalance" class="zxsaastable">
					</table>
					<div id="jqGridPager"></div>
				</div>
				
			</div>
			<!-------------------------------------表格结束----------------------------------------->
		<!-------------------------------------主页面结束----------------------------------------->
<!--过滤弹出窗-->
<div class="modal fade" id="filterModel" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog model-dialog2">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"
					aria-hidden="true">
					&times;
				</button>
				<h4 class="modal-title" id="myModalLabel">过滤条件</h4>
			</div>
			<div class="modal-body" id="model-body">
				<div class="showTab">
					<div class="current change">
						<form id="filterSearchForm">
							<div class="demoText form-group">
								<label for="" class='box_text2'>开始日期:</label>
								<div class="col-sm-8">
									<input type="text" name="startTime" class="filterData form-control2" placeholder="年-月-日" value="" id="datetimepickerStart1" onblur='checkInput.checkTime(this,"#datetimepickerStart1","#datetimepickerEnd1");'  />
								</div>
							</div>
							<div class="demoText form-group">
								<label for="" class='box_text2'>结束日期:</label>
								<div class="col-sm-8">
									<input type="text" name="endTime" class="filterData form-control2" placeholder="年-月-日" value="" id="datetimepickerEnd1" onblur='checkInput.checkTime(this,"#datetimepickerStart1","#datetimepickerEnd1");'  />
								</div>
							</div>
							<div class="demoText form-group">
								<label for="" class='box_text2'>单据编号:</label>
								<div class="col-sm-8">
									<input type="text" name="billsCode" value="" class="filterData form-control2" />
								</div>
							</div>
							<div class="demoText form-group">
								<label for="" class='box_text2'>单 备 注:</label>
								<div class="col-sm-8">
									<input type="text" name="remark" class="filterData form-control2" />
								</div>
							</div>
							<div class="demoText form-group">
								<label for="" class='box_text2' style="margin-right: 15px;">往来单位:</label>
								<div class="col-sm-8  input-group">
									<input type="text" class="filterData form-control"  data-toggle="modal" name="contactUnitName2" id="contactUnitNameTo"/>
								</div>
							</div>
							<div class="demoText form-group">
								<label for="" class='box_text2' style="margin-right: 15px;">部门名称:</label>
								<div class="col-sm-8  input-group">
									<input type="text" value="" class="depFilter form-control"  placeholder="" data-toggle="modal" id="sectionNameFilter"  name="sectionName"/>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-success" onclick="searchPayment();">查询</button>
				<button type="button" class="btn btn-info" data-dismiss="modal">取消</button>
				<button type="button" class="btn btn-warning reset" onclick="reset();">重置</button>
			</div>
		</div>
		<!-- /.modal-content -->
	</div>
	<!-- /.modal -->
</div>
<!-------------------------------------底部开始----------------------------------------->
		<div class="pageBillBottom gridBottom">
			<form role="form" id="bottomForm">
				<div class="clearfix form-inline">
					<div class="form-group">
						<label>公司名称：</label>
						<input type="text" class="form-control" name="companyName" disabled="disabled">
					</div>
					<div class="form-group">
						<label >过账人：</label>
						<input type="text" class="form-control" name="postByName" disabled="disabled">
					</div>
					<div class="form-group">
						<label>红冲人：</label>
						<input type="text" class="form-control" name="invalidByName" disabled="disabled">
					</div>
				</div>
			</form>
		</div>
	<!-------------------------------------底部结束----------------------------------------->
	
	</body>
	<script src="${basePath}/js/jquery-1.12.4.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script type="text/javascript" src="${basePath}/js/base.js?v=${version}"></script>
	<script src="${basePath}/js/bootstrap.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/jquery.jqGrid.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>

	<script src="${basePath}/js/commonjs/eidit-grid-test.js?v=${version}" type="text/javascript" charset="utf-8"></script>

	<script src="${basePath}/js/jquery.datetimepicker.full.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/grid.locale-cn.js?v=${version}" type="text/javascript" charset="utf-8"></script>		
	<script src="${basePath}/js/commonjs/xr.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/zxsaas_plus.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/component.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/cw/jquery.ztree.all-3.5.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/html/muti_select/MultiSelectDropList.js?v=${version}" type="text/javascript" charset="utf-8"></script>

	<script src="${basePath}/js/erp/funds/common.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/erp/funds/tree.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	
	<script src="${basePath}/js/bootstrapValidator.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/cw/bootstrap/js/validator-lynnjer.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<!-- 打印 -->
	<script type="text/javascript" charset="utf-8" src="${basePath}/js/bootstrap.min.js?v=${version}"></script>
	<script type="text/javascript" charset="utf-8" src="${basePath}/js/jquery-migrate-1.2.1.min.js?v=${version}"></script>
	<script type="text/javascript" charset="utf-8" src="${basePath}/js/jquery.jqprint-0.3.js?v=${version}"></script>
	<!-- 菜单权限验证 -->
	<script type="text/javascript" src="${basePath}/js/erp/authority/menuValidation.js?v=${version}"></script>
	<script src="${basePath}/js/cw/bootstrap/js/bootstrap-dialog.min.js?v=${version}"></script>
	<script src="${basePath}/js/erp/funds/invalid.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/erp/funds/planPayment-search.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script type="text/javascript">
		$(function(){
			checkRole('#billsHeaderForm');
			//checkRole('#filterSearchForm');
			$('.btnHundred button.btn,.slideThree').click(function(){
				if($(this).html() != '保存并过账'){
					$("#billsHeaderForm").data('bootstrapValidator').resetForm();
				}
			});
		})
	</script>
</html>

<!-------------------------------------模态框开始----------------------------------------->

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
<div class="modal fade" id="contactunitModal" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog model-dialog1">
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

<!--经手人模态框-->
<div class="modal fade" id="managerModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog model-dialog4">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true" >&times;</button>
				<h4 class="modal-title" id="myModalLabel">经办人选择</h4>
			</div>
			<div class="modal-body" id="model-body">
				<div class="showTab">
					<div class="current change">
						<div>
							<input type="text" placeholder="编码、名称、助记码模糊搜索"  style="width:200px;"  id="managerRemCode" value=""/>
							<span style="margin-left: 50px;">职位名称</span>
							<select id="positionSelect" style="width:150px;" ><option value=''>请选择</option></select>
						</div>
						<div class="tablebox retailDetailTable">
							<div class="grid-wrap" style="margin-top: 10px">
								<table id="managerModalGrid" class="zxsaastable"></table>
								<div id="managerGridpager"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-warning" data-dismiss="modal" >关闭</button>
			</div>
		</div>
		<!-- /.modal-content -->
	</div>
	<!-- /.modal -->
</div>

<!-------------------------------------模态框结束----------------------------------------->