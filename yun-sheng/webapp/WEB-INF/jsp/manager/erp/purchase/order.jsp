<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML>
<html>
  <head>
    <title>采购订单</title>
	  <meta charset="UTF-8">
	  <meta http-equiv="X-UA-Compatible" content="IE=edge">
	  <meta name="renderer" content="webkit">
	  <meta name="viewport" content="width=device-width, initial-scale=1">
	  <strong><meta name="renderer" content="webkit|ie-comp|ie-stand"></strong>
	  <!-- 引入文件 -->
	<jsp:include page="../../Include/import.jsp"></jsp:include>
	<link rel="stylesheet" type="text/css" href="${basePath}/css/iconfont/iconfont.css?v=${version}" />
	<script type="text/javascript">
		//**********全局变量
		//基本目录
		var basePath = "${basePath}";
		var billsCode = "${billsCode}";
		var billId = "${billId}"
	</script>
	  <style>
		  .showBox button{
			  height: 34px;
		  }
		  .ui-jqgrid-pager{
			  height: 39px;
		  }
	  </style>
  </head>
 
  <body class="e-body-bg pageBill">
  	<div class="">
		<div class="btn-toolbar" id="MenuTool" role="toolbar" data-code="CGDD"></div>
	    <div class="none gridTools">
	        <div class="col-md-12">
				<div class="" style="padding: 0px;margin-top: 10px;">
 				<div id='AUTH' data-code='CGDD' class="none btn-group btnHundred">
			    	<button type="button" class="btn btn-default navbar-btn" onclick="firstPage()">首单</button>
			        <button type="button" class="btn btn-default navbar-btn" onclick="backPage()">上一单</button>
			        <button type="button" class="btn btn-default navbar-btn" onclick="nextPage()">下一单</button>
			        <button type="button" class="btn btn-default navbar-btn" onclick="lastPage()">末单</button>
			        <button type="button" class="btn btn-default navbar-btn" onclick="addBtClick()">新增</button>
			        <button type="button" class="btn btn-default navbar-btn" onclick="saveBtClick()">保存</button>
			        <button type="button" class="btn btn-default navbar-btn delBt" onclick="delBtClick()">删除</button>
			        <button type="button" class="btn btn-default navbar-btn checkBt" onclick="openCheckDetailModal()">审核</button>
			        <button type="button" class="btn btn-default navbar-btn forceFinish" onclick="forceFinishBtClick()">强制完成</button>
			        <button type="button" class="btn btn-default navbar-btn" onclick="print()">打印</button>
			        <button type="button" class="btn btn-default navbar-btn" onclick="filterBtClick()">过滤</button>
			        <button type="button" class="btn btn-default navbar-btn" onclick="refreshBtClick()">刷新</button>
			        <button type="button" class="btn btn-default navbar-btn copyBills" onclick="copyBtClick()">复制</button>
				   <div class="slideThree none">
						<input type="checkbox" value="1" id="slideThree" name="check" />
						<label for="slideThree"></label>
				    </div>
					<button type="button" class="btn btn-default btn-yindao-btn" style="float:right;"
							onclick="window.parent.openWorkBoxByMenutext('采购订单单据列表',  '/manager/inventory/purchase/historyMain?billsType=1', true)">历史单据</button>
				</div>

				</div>
	        </div>
	    </div>
	    <div class="pageBillForm gridTop">
				<form class="clearfix form-inline" role="form" id="topForm">
					<div id="billsCodeWrap" class="col-sm-3">
						<label class="width-25">单据编号:</label>
						<div class="input-group col-sm-8">
							<input type="text" class="form-control" name="billsCode" readonly="readonly">
							<input type="text" class="form-control" name="id" style="display: none;">
							<input type="hidden" name="billsStatus">
							<input type="hidden" name="auditStatus">
						</div>
					</div>
					<div class="form-group col-sm-3">
						<label class="width-25"><i class="bitianX">*</i>单据日期:</label>
						<div class="input-group col-sm-8">
							<input type="text" class="form-control" name="billsDate" readonly>
						</div>
					</div>

					<div class="form-group col-sm-3">
						<label class="width-25"><i class="bitianX">*</i>部门名称:</label>
						<div class="input-group col-sm-8">
							<input type="text" class="form-control" name="sectionId" value="" style="display: none;">
							<input type="text" class="form-control" name="sectionName">
						</div>
					</div>

					<div class="form-group col-sm-3">
						<label class="width-25"><i class="bitianX">*</i>往来单位:</label>
						<div class="input-group col-sm-8">
							<input type="text" class="form-control" name="contactsunitName">
							<input type="text" class="form-control" name="contactsunitId" style="display: none;">
						</div>
					</div>
					<div class="form-group col-sm-3">
						<label class="width-25">应付余额:</label>
						<div class="input-group col-sm-8">
							<input type="text" id="yingFu" value="" class="form-control" readonly="readonly"/>
						</div>
					</div>

					<div class="form-group col-sm-3">
						<label class="width-25">预付余额:</label>
						<div class="input-group col-sm-8">
							<input type="text"  id="yuFu" value="" class="form-control" readonly="readonly"/>
						</div>
					</div>

					<div class="form-group col-sm-3">
						<label class="width-25"><i class="bitianX">*</i>经手人:</label>
						<div class="input-group col-sm-8">
							<input type="text" class="form-control" name="managersUid" style="display: none;">
							<input type="text" class="form-control" name="managersName">
						</div>
					</div>
					<div class="form-group col-sm-3">
						<label class="width-25">备注:</label>
						<div class="input-group col-sm-8">
							<input type="text" class="form-control" name="remark">
						</div>
					</div>
					<div class="rightMap">
						<img  id="billsStautsImg" class="mr10" >
						<img>
					</div>

				</form>
	    </div>
	    <div class="gridBody">
			<div class="none">
			<input type="hidden" id="dataGridGood" data-desc="商品名称模态框">
		</div>
	        <div class="col-md-12">
				<div class="jqGrid_wrapper">
					<table id="dataGrid"></table> 
				</div>
	        </div>
	    </div>

		<form class="pageBillBottom pt10 clearfix form-inline" role="form" id="middleForm">
			<div class="form-group ">
				<label>预付款金额：</label>
				<input type="text" class="form-control" name="amount" id="payrecetiptAmount" onclick="openPayrecetiptDetailModal()" readonly="readonly">
			</div>
		</form>
		<div class="pageBillBottom gridBottom">
			<form role="form" id="bottomForm">
				<div class="clearfix form-inline">
					<div class="form-group">
						<label>公司名称：</label>
						<input type="text" class="form-control" name="companyId" style="display: none;" >
						<input type="text" class="form-control" name="companyName" disabled="disabled">
					</div>
					<div class="form-group">
						<label>制单人：</label>
						<input type="text" class="form-control" name="createBy" style="display: none;" >
						<input type="text" class="form-control" name="createByName" disabled="disabled">
					</div>
					<div class="form-group">
						<label>修改人：</label>
						<input type="text" class="form-control" name="lastupdateBy" style="display: none;" >
						<input type="text" class="form-control" name="lastupdateByName" disabled="disabled">
					</div>
					<div class="form-group">
						<label>审核人：</label>
						<input type="text" class="form-control" name="auditor" disabled="disabled" style="display: none;">
						<input type="text" class="form-control" name="auditorName" disabled="disabled">
					</div>
					<div class="form-group">
						<label>强制完成人：</label>
						<input type="text" class="form-control" name="forceFinishId" disabled="disabled" style="display: none;">
						<input type="text" class="form-control" name="forceFinishName" disabled="disabled">
					</div>
				</div>
			</form>
		</div>
	</div>
  
	<!-- 引用自定义JS文件 -->
	<script type="text/javascript" src="${basePath}/js/base.js?v=${version}"></script>
	<script type="text/javascript" src="${basePath}/model/erp/model-order.js?v=${version}"></script>
	<script type="text/javascript" src="${basePath}/js/erp/purchase/order.js?v=${version}"></script>
	<script type="text/javascript" src="${basePath}/js/erp/purchase/validator.js?v=${version}"></script>
	
	<!-- 菜单权限验证 -->
	<script type="text/javascript" src="${basePath}/js/erp/authority/menuValidation.js?v=${version}"></script>
  </body>
  
</html>

<!-- 预付款明细录入 -->
<div class="modal fade" id="payrecetiptDetailModal" tabindex="-1" role="dialog"  aria-hidden="true">
   <div class="modal-dialog" style="">
      <div class="modal-content">
	     <div class="modal-header">
            <button type="button" class="close"  data-dismiss="modal" aria-hidden="true"> &times;</button>
            <h4 class="modal-title">
                                 付款方式
            </h4>
         </div>
         <div class="modal-body">
			<!-- /S 表体 -->
			<div class="jqGrid_wrapper">
				<table id="dataGrid2"></table> 
			</div><!-- /E 表体 -->
         </div>
         <!-- 模态框底部部分 -->
         <div class="modal-footer">
            <button type="button" class="btn btn-default"  onclick="savePayreceiptAmout()">保存</button>
            <button type="button" class="btn btn-default"  data-dismiss="modal">关闭</button>
         </div>
	  </div>
	</div>
</div>

<!-- 审核明细  -->
<div class="modal fade" id="checkDetailModal" tabindex="-1" role="dialog"  aria-hidden="true">
   <div class="modal-dialog" style="width: 80%;">
      <div class="modal-content">
	     <div class="modal-header">
            <button type="button" class="close"  data-dismiss="modal" aria-hidden="true"> &times;</button>
            <h4 class="modal-title">
                                              审核明细编辑&nbsp;                 
            </h4>
         </div>
         <div class="modal-body">
			<!-- /S 表体 -->
			<div class="jqGrid_wrapper">
				<table id="dataGrid55"></table> 
			</div><!-- /E 表体 -->
         </div>
         <!-- 模态框底部部分 -->
         <div class="modal-footer">
            <button type="button" class="btn btn-default"  onclick="saveCheckDetail()">保存</button>
            <button type="button" class="btn btn-default"  data-dismiss="modal">取消</button>
         </div>
	  </div>
	</div>
</div>
