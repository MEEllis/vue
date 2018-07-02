<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>供应商返利单</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!-- 引入文件 -->
	<jsp:include page="../../Include/import.jsp"></jsp:include>
	  <link rel="stylesheet" type="text/css" href="${basePath}/css/erp/funds/funds-base.css?v=${version}" />
	  <link rel="stylesheet" type="text/css" href="${basePath}/css/iconfont/iconfont.css?v=${version}"/>
	<style>
	.formBtnSM{
    	width: 19%;
	}
	</style>
	<script type="text/javascript">
	
		//**********全局变量
		//基本目录
		var basePath = "${basePath}";
		var billsCode = GetQueryString("billsCode") || '';
		var billId = GetQueryString("billsId") || ''
		var billDate = GetQueryString("billsDate") || ''
	</script>
  </head>

  <body class="e-body-bg pageBill">
  <div class="btn-toolbar " id="MenuTool"  data-code="GYSFLD"  >
  </div>
	<div>
 		<div id="AUTH" data-code="GYSFLD" class="none btn-group btnHundred">
			    	<button type="button" class="btn btn-default navbar-btn" onclick="firstPage()">首单</button>
			        <button type="button" class="btn btn-default navbar-btn" onclick="backPage()">上一单</button>
			        <button type="button" class="btn btn-default navbar-btn" onclick="nextPage()">下一单</button>
			        <button type="button" class="btn btn-default navbar-btn" onclick="lastPage()">末单</button>
			        <button type="button" class="btn btn-default navbar-btn" onclick="addBtClick()">新增</button>
			        <%--<button type="button" class="btn btn-default navbar-btn" onclick="saveAndPostBtClick()" id="saveAndPostBt">保存并过账</button>--%>
					<button type="button" class="btn btn-default save" onclick="save()">保存</button>
					<button type="button" class="btn btn-default post" onclick="post()">过账</button>
					<button type="button" class="btn btn-default delete" onclick="sDelete()">删除</button>
			        <button type="button" class="btn btn-default navbar-btn forceFinish" onclick="redDashedBtClick()" id="redDashedBt">红冲</button>
			        <button type="button" class="btn btn-default navbar-btn" onclick="print()">打印</button>
			        <button type="button" class="btn btn-default navbar-btn" onclick="filterBtClick()">过滤</button>
			        <button type="button" class="btn btn-default navbar-btn" onclick="refreshBtClick()">刷新</button>
			        <button type="button" class="btn btn-default navbar-btn" onclick="copyBtClick()">复制</button>
					<button type="button" class="btn btn-default btn-yindao-btn" style="float:right;"
							onclick="window.parent.openWorkBoxByMenutext('供应商返利单-单据列表',  '/manager/inventory/fund/historyMain?billsType=32', true)">历史单据</button>

				</div>
		<div class="pageBillForm gridTop" >
			<form id="topForm"   role="form" class="form-inline clearfix">
				<input type="hidden" name="billsStatus"/>
				<input type="hidden" name="auditStatus"/>
				<div id="billsCodeWrap"  class="form-group col-sm-3">
					<label  class="width-25">单据编号:</label>
					<div class="input-group col-sm-8">
						<input type="text" class="form-control" name="billsCode" readonly="readonly">
						<input type="text" class="form-control" name="id" style="display: none;">
					</div>
				</div>
				<div class="form-group col-sm-3">
					<label  class="width-25">单据日期:</label>
					<div class="input-group col-sm-8">
						<input type="text" class="form-control" readonly="readonly" placeholder="年-月-日" name="billsDate">
					</div>
				</div>
				<div class="form-group col-sm-3">
					<label  class="width-25">部门名称:</label>
					<div class="input-group col-sm-8">
						<input type="text" class="form-control" name="sectionId" value="" style="display: none;" >
						<input type="text" class="form-control" name="sectionName" id="sectionName">
					</div>
				</div>
				<div class="form-group col-sm-3">
					<label  class="width-25">往来单位:</label>
					<div class="input-group col-sm-8">
						<input type="text" class="form-control" name="contactsunitName">
						<input type="text" class="form-control" name="contactsunitId" id="contactsunitId" style="display: none;">
					</div>
				</div>

				<div class="form-group col-sm-3">
					<label  class="width-25">应付余额:</label>
					<div class="input-group col-sm-8">
							<input type="text" class="form-control" id="yingFu" value="0" disabled="disabled">
					</div>
				</div>

				<div class="form-group col-sm-3">
					<label  class="width-25">预付余额:</label>
					<div class="input-group col-sm-8">
						<input type="text" class="form-control" id="yuFu" value="0" disabled="disabled">
					</div>
				</div>

				<div class="form-group col-sm-3">
					<label  class="width-25">经手人:</label>
					<div class="input-group col-sm-8">
						<input type="text" class="form-control" name="managersUid" style="display: none;">
						<input type="text" class="form-control" name="managersName">
					</div>
				</div>

				<div class="form-group col-sm-3">
					<label  class="width-25">返利类型:</label>
					<div class="input-group col-sm-8">
						<select class="form-control" id="rebateTypeSelect" name="rebateType">
							<option value="1" selected="selected">保修卡返利</option>
							<option value="2">达量返利</option>
							<option value="3">提货返利</option>
							<option value="4">固返</option>
						</select>
					</div>
				</div>

				<div class="form-group col-sm-3">
					<label  class="width-25">单备注:</label>
					<div class="input-group col-sm-8">
							<input type="text" class="form-control" name="remark">
					</div>
				</div>

				<div class="rightMap">
					<img  id="billsStautsImg" src="" >
					<img id="auditImg" class="ml10" src="" />
				</div>
			</form>
	    </div>
		<div id="outImeiWrap"></div>
	    <div class="row gridBody" style="padding-top: 0px;">
	        <div class="col-md-12">
					<ul class="nav nav-tabs" style="display: none;" id="rebateTypeTabs">
					   <li class="active">
					   		<a href="#tab1-1" data-toggle="tab">返利明细1</a>
					   </li>
					   <li>
					   		<a href="#tab1-2" data-toggle="tab">返利明细2</a>
					   </li>
					</ul>
					<div id="myTabContent" class="tab-content">
					   <div class="tab-pane fade in active" id="tab1-1">
							<!-- /S 表体 -->
							<div class="row" style="margin-left: 0px;margin-right: 0px;">
								<div class="jqGrid_wrapper">
									<table id="dataGrid6"></table> 
								</div><!-- /E 表体 -->
							</div>
					   </div>
					   <div class="tab-pane fade" id="tab1-2">
							<!-- /S 表体 数量保价-->
							<div class="jqGrid_wrapper">
								<table id="dataGrid"></table> 
							</div><!-- /E 表体 -->
					   </div>
					</div>
					<!-- 标签页结束 -->
	        </div>
	    </div>

		<div class="pageBillBottom gridBottom pt10">
			<form role="form" id="bottomForm">
				<div class="clearfix form-inline">
					<div class="form-group">
						<label>公司名称：</label>
						<input type="text" class="form-control" name="companyId" style="display: none;">
						<input type="text" class="form-control" name="companyName" disabled="disabled">
					</div>
					<div class="form-group">
						<label >制单人：</label>
						<input type="text" class="form-control" name="createBy" style="display: none;">
						<input type="text" class="form-control" name="createByName" disabled="disabled">
					</div>
					<div class="form-group">
						<label>修改人：</label>
						<input type="text" class="form-control" name="updateBy" style="display: none;">
						<input type="text" class="form-control" name="updateByName" disabled="disabled">
					</div>
					<div class="form-group">
						<label>过账人：</label>
						<input type="text" class="form-control" name="postBy" disabled="disabled" style="display: none;">
						<input type="text" class="form-control" name="postByName" disabled="disabled">
					</div>
					<div class="form-group">
						<label>红冲人：</label>
						<input type="text" class="form-control" name="invalidBy" disabled="disabled" style="display: none;">
						<input type="text" class="form-control" name="invalidByName" disabled="disabled">
					</div>
				</div>
			</form>
		</div>
	</div>
  
	<!-- 引用自定义JS文件 -->
	<script type="text/javascript" src="${basePath}/model/erp/model-stock-num.js?v=${version}"></script>
	<script type="text/javascript" src="${basePath}/model/erp/model-stock-im.js?v=${version}"></script>
	<script type="text/javascript" src="${basePath}/model/erp/model-cash-bills.js?v=${version}"></script>
	<script type="text/javascript" src="${basePath}/js/erp/funds/th3common.js?v=${version}"></script>
	<script type="text/javascript" src="${basePath}/js/erp/funds/supplier-rebate.js?v=${version}"></script>

 	<script src="${basePath}/js/cw/bootstrap/js/validator-lynnjer.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<!-- 菜单权限验证 -->
	<script type="text/javascript" src="${basePath}/js/erp/authority/menuValidation.js?v=${version}"></script>
	
	<script type="text/javascript">
		$(function(){
			checkRole('#topForm');
			//checkRole('#filterSearchForm');
		})
	</script>
  </body>
  
</html>

<!-- 模态框（过滤条件） -->
<div class="modal fade" id="filterParamModalDialog" tabindex="-1" role="dialog" aria-hidden="true">
	<div class="modal-dialog dialogHeight">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				<h4 class="modal-title">过滤条件窗口</h4>
			</div>
			<div class="modal-body">
				<!-- 新增商品档案   表单 -->			
				<form class="form-horizontal filterParamForm" role="form">
				  <div class="col-sm-4">
					  <div class="form-group">
					    <label  class="col-sm-5 control-label">开始日期：</label>
					    <div class="col-sm-6">
							<input type="text" class="form-control" name="billsDateBegin" id="billsDateBegin" onblur='checkInput.checkTime(this,"#billsDateBegin","#billsDateEnd");' >
					    </div>
					  </div>
					  <div class="form-group">
					    <label for="lastname" class="col-sm-5 control-label">结束日期：</label>
					    <div class="col-sm-6">
							<input type="text" class="form-control" name="billsDateEnd" id="billsDateEnd" onblur='checkInput.checkTime(this,"#billsDateBegin","#billsDateEnd");' >
					    </div>
					  </div>
					  <div class="form-group">
					    <label for="lastname" class="col-sm-5 control-label">往来单位：</label>
					    <div class="col-sm-6">
			                <div class="input-group">
			                    <input type="text" class="form-control" name="contactsunitIdListStr" style="display: none;">
			                    <input type="text" class="form-control" id="contactsunitIdListStr">
			                </div><!-- /input-group -->
					    </div>
					  </div>
				  </div>
				  <div class="col-sm-4">
					  <div class="form-group">
					    <label  class="col-sm-5 control-label">部门名称：</label>
					    <div class="col-sm-6">
			                <div class="input-group">
			                    <input type="text" class="form-control" name="sectionIdListStr" style="display: none;">
			                    <input type="text" class="form-control" id="sectionIdListStr">
			                </div><!-- /input-group -->
					    </div>
					  </div>
					  <div class="form-group">
					    <label for="lastname" class="col-sm-5 control-label">商品名称：</label>
					    <div class="col-sm-6">
			                <div class="input-group">
			                    <input type="text" class="form-control" name="goodsNameIdListStr" style="display: none;">
			                    <input type="text" class="form-control" id="goodsNameIdListStr">
			                    <span class="input-group-addon">
			                    	<span class="glyphicon glyphicon-plus" style="cursor: pointer;" onclick="selectGoodsNameReferenceForFiterOpen()"></span>
			                    </span>
			                </div><!-- /input-group -->
					    </div>
					  </div>
					  <div class="form-group">
					    <label for="lastname" class="col-sm-5 control-label">单据编码：</label>
					    <div class="col-sm-6">
					      <input type="text" class="form-control" name="billsCode">
					    </div>
					  </div>
				  </div>
				  <div class="col-sm-4">
					  <div class="form-group">
					    <label for="lastname" class="col-sm-5 control-label">单备注：</label>
					    <div class="col-sm-6">
					      <input type="text" class="form-control" name="remark">
					    </div>
					  </div>
					  <div class="form-group">
					    <label for="lastname" class="col-sm-5 control-label">单据状态：</label>
					    <div class="col-sm-6">
							<select id="billsStatusCodeListStr" class="js-example-basic-multiple" name="billsStatusCodeListStr" multiple="multiple" style="width: 160px;">
								<option value="1">草稿</option>
								<option value="2">已审核</option>
								<option value="3">入库中</option>
								<option value="4">已完成</option>
								<option value="5">强制完成</option>
								<option value="6">已过账</option>
								<option value="7">已红冲</option>
								<option value="8">已发货</option>
								<option value="9">作废</option>
								<option value="10">已接收</option>
								<option value="11">拒收</option>
							</select>
					    </div>
					  </div>
					  <div class="form-group">
					    <label for="lastname" class="col-sm-5 control-label">串号：</label>
					    <div class="col-sm-6">
					    	<input type="text" class="form-control" name="imei">
					    </div>
					  </div>
				  </div>
				  <div class="col-sm-2"></div>
				  <div class="col-sm-8">
				    <label>
				      <input type="checkbox" class="flag" name="haveInvalid" checked="checked"> 是否包含红冲单据
				    </label>
				  </div>
				</form>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-w btn-danger" onclick="javascript:lastPage();$('#filterParamModalDialog').modal('hide');">查询</button>
				<button type="button" class="btn btn-warning" data-dismiss="modal">取消</button>
				<button  type="button" class="btn btn-w btn-info" onclick="resetQueryForm()">重置</button>
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal -->
</div>

<!-- 商品引用 -->
<div class="modal fade" id="goodsnameReferenceModal" tabindex="-1" role="dialog"  aria-hidden="true">
   <div class="modal-dialog" style="width:930px;">
      <div class="modal-content">
	     <div class="modal-header">
            <button type="button" class="close"  data-dismiss="modal" aria-hidden="true"> &times;</button>
            <h4 class="modal-title">
                                  商品引用
            </h4>
         </div>
         <div class="modal-body" style="padding: 0px;">
			<iframe name="goodsnameReferenceFrame" class="referenceFrame" frameborder="0" style="width: 100%;height:400px;" src="${basePath}/Tgoodsname/reference"></iframe>
         </div>
	  </div>
	</div>
</div>

<!-- 预付款明细录入 -->
<div class="modal fade" id="payrecetiptDetailModal" tabindex="-1" role="dialog"  aria-hidden="true">
   <div class="modal-dialog" style="width:680px;min-height: 500px;">
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

<!-- 仓库引用 -->
<div class="modal fade" id="storageReferenceModal" tabindex="-1" role="dialog"  aria-hidden="true">
   <div class="modal-dialog" style="width:930px;">
      <div class="modal-content">
	     <div class="modal-header">
            <button type="button" class="close"  data-dismiss="modal" aria-hidden="true"> &times;</button>
            <h4 class="modal-title">
                                 仓库引用
            </h4>
         </div>
         <div class="modal-body" style="padding: 0px;">
			<iframe name="storageReferenceFrame" class="referenceFrame" frameborder="0" style="width: 100%;height:400px;" src="${basePath}/Istorage/reference"></iframe>
         </div>
	  </div>
	</div>
</div>

<!-- 串号录入 -->
<div class="modal fade" id="imeiInputModal" tabindex="-1" role="dialog"  aria-hidden="false">
   <div class="modal-dialog" style="width:600px;">
      <div class="modal-content">
	     <div class="modal-header">
            <button type="button" class="close"  data-dismiss="modal" aria-hidden="true"> &times;</button>
            <h4 class="modal-title">
                                       串号录入
            </h4>
         </div>
         <div class="modal-body" style="padding-bottom: 0px;">
        	<div class="form-horizontal" role="form"> 
			    <!-- /S 表单控件  -->
				<div class="form-group">
				  <!-- 商品名称 -->
				  <label class="col-sm-5 control-label"  id="goodsnameTitle" style="text-align: left;"></label>
				  
				  <!-- 是否串号管理 -->
				  <div class="col-sm-5" style="line-height: 40px;display: none;">
				      <input type="checkbox" id="ifEnableAuxliaryImei" disabled="disabled"/>启用辅助串号
				  </div>
				  <div class="col-sm-2">
				      <button type="button" class="btn btn-default hide"  onclick="">串号导入</button>
				  </div>
				</div>
			</div>
        	<div class="form-horizontal" role="form"> 
			    <!-- /S 表单控件  -->

		        <input type="text" class="form-control" name="" id="dataGridRowId" style="display: none;">
		        <input type="text" class="form-control" name="" id="dataGridGoodsId" style="display: none;">
				<div class="form-group col-sm-10">
				  <label class="col-sm-4 control-label">串号录入:</label>
				  <div class="col-sm-8 wiRes">
				    <input type="text" class="form-control searchImei" value="">
				    <div class="none-cx" style="display: none;">
			     	 	<ul id="imeiUl" style="max-height: 300px;">

			     	 	</ul>
			     	 </div>
				  </div>
				</div>

			</div> 
			<div style="height: 30px;line-height: 30px;padding-left: 10px;padding-right: 10px;margin-top: 10px;">
			<span class="pull-right">已输入：<span id="currInputNum" >0</span></span>
			</div>
			<!-- /S 表体 -->
			<div class="jqGrid_wrapper" style="margin-top: 20px;">
				<table id="dataGrid3"></table> 
			</div><!-- /E 表体 -->
         </div>
         <!-- 模态框底部部分 -->
         <div class="modal-footer">
            <button type="button" class="btn btn-default"  onclick="saveImeiInput()">保存</button>
            <button type="button" class="btn btn-default"  onclick="canelSaveImeiInput()">取消</button>
         </div>
	  </div>
	</div>
</div>

