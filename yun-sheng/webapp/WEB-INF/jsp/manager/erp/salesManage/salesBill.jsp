<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8"/>
		<meta name="renderer" content="webkit"/>
		<meta http-equiv="X-UA-Compatible" content="IE=9; IE=8; IE=7; IE=EDGE ; chrome=1"/>
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
		<link rel="stylesheet" href="${basePath}/css/market/marketBarter.css?v=${version}"/>
		<style type="text/css">
			.formBtn{float: left;width: 360px;}
			.formBtn .input-group{padding-right: 30px;}
	        .formBtnSM{float: left;	width: 200px;}
	        .bv-form .help-block{
				margin-left:100px;
			}
			.form-control-feedback {
			    left: 260px;
			}
			.imeiImport{
				padding: 6px 25px;
			    background: #fff;
			    border: 1px solid #ccc;
			}
			.imeiImport:hover{
				border: 1px solid #0099FF;
			}
			#imeiDr-modal .row{
				padding-bottom: 0;
			}
			.input-group-btn{
				width: 0;
			}
		</style>
		<script type="text/javascript">
		
		//**********全局变量
		//基本目录
		var gl_companyId = "${companyId}";
		var billsCode = "${billsCode}";
	</script>
		<title>批发单</title>
	</head>

	<body  class="e-body-bg pageBill">
		<div>
			<div class="btn-toolbar" id="MenuTool" role="toolbar" data-code="XSD"></div>
			<div id="AUTH" data-code="XSD" class="none btn-group btnHundred" role="group" >
				<button type="button" class="btn btn-default" onclick="firstPage()">首单</button>
			    <button type="button" class="btn btn-default" onclick="backPage()">上一单</button>
			    <button type="button" class="btn btn-default" onclick="nextPage()">下一单</button>
			    <button type="button" class="btn btn-default" onclick="lastPage()">末单</button>
				<button type="button" class="btn btn-default" onclick="addBills()">新增</button>
			    <button type="button" class="btn btn-default" onclick="saveBtnClick()">保存</button>	
			    <button type="button" class="btn btn-default delete" onclick="delBtClick()">删除</button>	
			    <button type="button" class="btn btn-default post" id="1" onclick="postBtnClick(this.id);">过账</button>
			    <button type="button" class="btn btn-default invalid" id="2" onclick="invalidBtnClick(this.id);">红冲</button>
			    <button type="button" class="btn btn-default print" onclick="print()" >打印</button>
			    <button type="button" class="btn btn-default orderImport" onclick="orderImportBtClick()">订单引入</button>
			    <!-- 
			    <button type="button" class="btn btn-default billImport" onclick="billsImportBtClick()">单据引入</button>
			     --><!--
			    <button type="button" class="btn btn-default" onclick="javascript:parent.openWorkBoxByMenutext('借出转销售','../manager/jxc/storage/lendSaleDetail/lendSale');">借出转销售</button>
			    --><button type="button" class="btn btn-default" onclick="refreshBtClick()">刷新</button>	  			  			  			  
			    <button type="button" class="btn btn-default" onclick="filterBtnClick();">过滤</button>
			    <button type="button" class="btn btn-default copy" onclick="copyBtnClick();">复制</button>
				 <div class="slideThree none">
					<input type="checkbox" value="0" id="slideThree" name="check" />
					<label for="slideThree"></label>
				</div>
				<button type="button" class="btn btn-default btn-yindao-btn" style="float:right;"
						onclick="window.parent.openWorkBoxByMenutext('批发单单据列表',  '/manager/inventory/sales/historyMain?billsType=19', true)">历史单据</button>

			</div>
			<div class="pageBillForm gridTop">
			<form id="billsHeaderForm" class="clearfix form-inline">
				<div class="clearfix" >
					<inut type='hidden' name='' class='orderId' />
					<inut type='hidden' name='' class='orderSectionId' />
					<inut type='hidden' name='' class='unitIdOly' />
					<inut type='hidden' name='' class='goodsIdOly' />
					<input type="hidden" name="billsStatus">
					<input type="hidden" name="auditStatus">

					<div id="billsCodeWrap" class="col-sm-3">
						<label class="width-25">单据编号:</label>
						<div class="input-group col-sm-8">
							<input type="hidden" name="id"/>
							<input type="text" class="form-control" name="billsCode" id="billsCode" readonly="readonly"/>
						</div>
					</div>
					<div class="form-group col-sm-3">
						<label class="width-25"><i class="bitianX">*</i>部门名称:</label>
						<div class="input-group col-sm-8">
							<input type="text" class="form-control" name="sectionName" id="sectionName" readonly="readonly">
							<input type="hidden" name="sectionId" id="sectionId">
						</div>
					</div>

					<div class="form-group col-sm-3">
						<label class="width-25"><i class="bitianX">*</i>往来单位:</label>
						<div class="input-group col-sm-8">
							<input type="text" class="form-control" name="contactUnitName" id="contactUnitName"
								   readonly="readonly">
							<input type="hidden" name="contactsunitId" id="contactsunitId">
						</div>
					</div>

					<div class="form-group col-sm-3">
						<label class="width-25"><i class="bitianX">*</i>单据日期:</label>
						<div class="input-group col-sm-8">
							<input type="text" class="form-control" name="billsDate" id="billsDate"
								   placeholder="年-月-日" onchange="refreshValidatorField('billsDate','#billsHeaderForm');"/>
						</div>
					</div>

					<div class="form-group col-sm-3">
						<label class="width-25">应收余额:</label>
						<div class="input-group col-sm-8">
							<input type="text" class="form-control" name="yingshouAmount"
								   readonly="readonly"/>
						</div>
					</div>

					<div class="form-group col-sm-3">
						<label class="width-25">预收余额:</label>
						<div class="input-group col-sm-8">
							<input type="text" class="form-control" name="yushouAmount"
								   readonly="readonly"/>
						</div>
					</div>
					<div class="form-group col-sm-3">
						<label class="width-25"><i class="bitianX">*</i>经手人:</label>
						<div class="input-group col-sm-8">
							<input type="text" class="form-control" name="managerUname" id="managerUname"
								   placeholder="部门名称先选" readonly="readonly">
							<input type="hidden" name="managerUid" id="managerUid">
						</div>
					</div>

					<div class="form-group col-sm-3">
						<label class="width-25">单备注:</label>
						<div class="input-group col-sm-8">
							<input type="text" name="remark" id="remark" value="" class="form-control"/>
						</div>
					</div>

					<div class="rightMap">
						<img class="mr10">
						<img>
					</div>
				</div>
			 </form>
			</div>
		</div>
		<div class="tablebox retailDetailTable">
				<div class="none">
					<input type="hidden" id="dataGridStoreGood" data-desc="在库商品名称模态框">
				</div>
				<form action="" class="form-inline clearfix" >
					<div class="form-horizontal" role="form" style="margin-top: 5px;">
						<div class="form-group col-sm-4" style="margin-bottom: 0px;">
							<label class="col-sm-3 control-label">串号/条码:</label>
							<div class="col-sm-9 wiRes">
								  <input type="text" class="form-control searchImei" value="" >
								  <font class="red searchImeiTip" style="display: none;">请选择部门</font>
								  <div class="none-cx" style="display: none;">
							     	 	<ul id="imeiUl" style="max-height: 300px;"></ul>
							     </div>
							</div>
						</div>
						
						<div class="form-group col-sm-3" style="margin-bottom: 0px;">
							<button type="button" class="btn imeiImport">串号导入</button>
						</div>
					</div>
				</form>
				
				<div class="grid-wrap" style="margin-top:10px">

					<table id="dataGrid" class="zxsaastable">
					</table>
					<div id="jqGridPager"></div>
				</div>
			</div>
		<!-------------------------------------底部开始----------------------------------------->

		<form id="gridFooter">
			<div class="pageBillBottom pt10 clearfix form-inline" id="collapseExample">
				<div class="form-group ">
					<label>收款金额：</label>
					<input type="text" id="prepaymentAmount" name="prepaymentAmount" class="form-control" readonly/>
				</div>
				<div class="form-group ">
					<label>整单折扣：</label>
					<input type="text" id="billsDiscount" name="billsDiscount" class="form-control " value="0.00"/>
				</div>
				<div class="form-group ">
					<label>应收金额：</label>
					<input type="text" id="yingshouAmount" name="yingshouAmount" class="form-control " value="0.00"/>
				</div>
				<div class="form-group ">
					<label>未收金额：</label>
					<input type="text" id="weishouAmount" name="weishouAmount" class="form-control " value="0.00"/>
				</div>


			</div>
		<div class="pageBillBottom gridBottom">
			<div class="clearfix form-inline">
				<div class="form-group">
					<label>公司名称：</label>
					<input type="text" name="companyName" disabled  class="form-control"/>
				</div>
				<div class="form-group">
					<label>制单人：</label>
					<input type="text" name="createByName" disabled  class="form-control"/>
				</div>

				<div class="form-group">
					<label>修改人：</label>
					<input type="text" name="lastupdateByName" disabled  class="form-control"/>
				</div>
				<div class="form-group">
					<label>过账人：</label>
					<input type="text" name="postByName" disabled class="form-control"/>
				</div>
				<div class="form-group">
					<label>红冲人：</label>
					<input type="text" name="invalidByName" disabled class="form-control"/>
				</div>
			</div>
		</div>
	</form>
		<!-------------------------------------底部结束----------------------------------------->
	</body>
	
	<script src="../js/jquery-1.12.4.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="../js/bootstrap.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="../js/jquery.jqGrid.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="../js/jquery.datetimepicker.full.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="../js/grid.locale-cn.js?v=${version}" type="text/javascript" charset="utf-8"></script>		
	<script src="../js/commonjs/xr.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="../js/zxsaas_plus.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="../js/component.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="../js/cw/jquery.ztree.all-3.5.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="../html/muti_select/MultiSelectDropList.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="../js/commonjs/xr.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="../js/cw/bootstrap/js/bootstrap-dialog.min.js?v=${version}"></script>
	<script type="text/javascript" charset="utf-8" src="../js/commonjs/eidit-grid-test.js?v=${version}" ></script>
	<script src="../js/erp/sales/sales.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="../js/erp/sales/imei.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="../js/erp/sales/common.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="../js/erp/sales/post-invalid.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="../js/erp/sales/order-import.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="../js/erp/sales/bills-import.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="../js/erp/sales/print.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	
	<script type="text/javascript" src="${basePath}/js/base.js?v=${version}"></script>
	<!-- 验证 -->
	<script src="${basePath}/js/bootstrapValidator.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/cw/bootstrap/js/validator-company.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<!-- 打印 -->
	<script type="text/javascript" charset="utf-8" src="../js/jquery-migrate-1.2.1.min.js?v=${version}"></script>
	<script type="text/javascript" charset="utf-8" src="../js/jquery.jqprint-0.3.js?v=${version}"></script>
	<!-- 出库串号匹配 -->
	<script type="text/javascript" charset="utf-8" src="../js/erp/sales/outstorage-imei.js?v=${version}"></script>
	<script type="text/javascript" charset="utf-8" src="../js/cw/underscore-min.js?v=${version}"></script>
	<!-- 菜单权限验证 -->
	<script type="text/javascript" src="${basePath}/js/erp/authority/menuValidation.js?v=${version}"></script>
	<script>
	$(function(){
		billsHeaderForm('#billsHeaderForm');
	})
	</script>
</html>

<!-------------------------------------模态框开始----------------------------------------->
<!--付款方式选择选择弹出窗-->
<div class="modal fade" id="paymentWay" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog model-dialog2">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				<h4 class="modal-title" id="myModalLabel">收款方式</h4>
			</div>
			<div class="modal-body">
				<div class="container" style="width:100%">
					<div class="details"  style="width:100%">
						<table class="zxsaastable" id='paymentWayModalGrid'></table>
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-info" data-dismiss="modal" onblur="savePaymentWay()">保存</button>
				<button type="button" class="btn btn-warning" data-dismiss="modal">关闭</button>
			</div>
		</div>
	</div>
	<!-- /.modal -->
</div>

<!-- 订单引入模态框（Modal） -->
<div class="modal" id="orderImportModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog model-dialog4">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				<h4 class="modal-title" id="">订单引入</h4>
			</div>
			
			 <div class="modal-body">
			    <div class="container-fluid">
			   <div class="form-group" style="width: 300px;">
			  <label class="col-sm-5 control-label" style="padding-right: 0px;line-height: 30px;">往来单位:</label>
			  <div class="col-sm-6" style="padding-left: 0px;padding-right: 0px;">
			    <input type="text" class="form-control" name="contactUnitName" readonly="readonly">
			    <input type="text" class="form-control" name="contactsunitId" style="display: none;">
			  </div>
			</div>
	     </div>
			  
				<div class="">
					<div class="jqGrid_wrap">
						<table class="zxsaastable" id="orderImportDataGrid"></table>
						<div id="orderImportDataGridPager"></div>
					</div>
				</div>
				<br/><br/>
				
				<div class="ss" style="overflow:auto;">
					<div class="jqGrid_wrap">
					    <B>单据明细</B><br/><br/><input id="orderImportDataGridDetailRowid" type="hidden">
					    <input id="detailSectionId" type="hidden">
					    <input id="detailGoodsId" type="hidden">
						<table class="zxsaastable" id="orderImportDataGrid2"></table>
					</div>
				</div>
			</div>
			
			<div class="modal-footer">
				<button type="button" class="btn btn-info"  onclick="saveOrderImportData();">保存</button>
				<button type="button" class="btn btn-warning" data-dismiss="modal">关闭</button>
			</div>
		</div>
	</div>
	<!-- /.modal -->
</div>

<!-- 单据引入模态框（Modal） -->
<div class="modal fade" id="billsImportModal" tabindex="-1" role="dialog"  aria-hidden="true">
   <div class="modal-dialog" style="width:80%;">
      <div class="modal-content">
	     <div class="modal-header">
            <button type="button" class="close"  data-dismiss="modal" aria-hidden="true"> &times;</button>
            <h4 class="modal-title">单据引入</h4>
         </div>
     <div class="modal-body">
	    <div class="row gridTop" >
	        <div class="col-md-12">
				<!-- /S 表头  -->
				<form class="well form-horizontal" role="form" id="topForm"> 
				  <!-- /S 表单控件  -->
				  <div class="formBtn">
					<div class="form-group">
					  <label class="col-sm-3 control-label">单据编号:</label>
					  <div class="col-sm-8">
					    <input type="text" class="form-control" name="billsCode">
					  </div>
					</div>
				  </div>		
				  <div class="formBtn">
					<div class="form-group">
					    <label  class="col-sm-3 control-label">单据类型:</label>
					    <div class="col-sm-8">
				  			<select id="billsTypeSelect" name="billsTypeSelect" class="form-control" >
								<optgroup label="采购">
									<option name="CGRK" value="CG-CGRK">采购入库单</option>
									<option name="CGTH" value="CG-CGTH">采购退货单</option>
									<option name="STRK" value="CG-STRK">受托入库单</option>
									<option name="STTH" value="CG-STTH">受托退货单</option>
								</optgroup>
								<optgroup label="仓储">
									<option value="" >调拨出库单</option>
									<option value="" >调拨入库单</option>
								</optgroup>
								<optgroup label="其它出库">
									<option value="QTRK" ">其它入库单</option>
									<option value="QTCK" >其它出库单</option>
								</optgroup>
								<optgroup label="借出">
									<option value="SPJR" >商品借入单</option>
									<option value="SPJC" >商品借出单</option>
								</optgroup>
								<optgroup label="销售">
									<option value="XSD" disabled="disabled">销售单</option>
									<option value="XSTH" >销售退货单</option>
								</optgroup>
								<optgroup label="零售">
									<option value="" >零售单</option>
									<option value="LSTHD" >零售退货单</option>
								</optgroup>
							</select>
					    </div>
					</div>
				  </div>
	  
				  <div class="formBtn">
					<div class="form-group">
					    <label  class="col-sm-3 control-label">开始日期:</label>
					    <div class="col-sm-8">
							<input type="text" class="form-control" name="billsDateBegin" id="billsDateBegin" placeholder="年-月-日">
					    </div>
					</div>
				  </div>
				  <div class="formBtn">
					<div class="form-group">
					    <label  class="col-sm-3 control-label">结束日期:</label>
					    <div class="col-sm-8">
							<input type="text" class="form-control" name="billsDateEnd" id="billsDateEnd" placeholder="年-月-日">
					    </div>
					</div>
				  </div>
				  <div class="formBtn">
					<div class="form-group">
					  <label class="col-sm-3 control-label">部门名称:</label>
					  <div class="col-sm-8">
		                 <input type="text" class="form-control" name="sectionId" value="" style="display: none;" >
		                 <input type="text" class="form-control" name="sectionName" readonly="readonly">
					  </div>
					</div>
				  </div>
				  <div style="clear: left;"></div>
				</form><!-- /E 表头  -->
	        </div>
	    </div>
	    <div class="row gridBody">
	        <div class="col-md-12">
			  <div class="jqGrid_wrapper">
				<table id="billsImportDataGrid"></table> 
   				<div id="jqGridPager"></div>
			  </div>
			  <br/>
			  <div class="jqGrid_wrapper">
			     <B>单据明细</B><br/>
				<table id="billsImportDataGrid2"></table> 
			  </div>
	        </div>
	    </div>
      </div>
       <div class="modal-footer">
				<button type="button" class="btn btn-info"  onclick="saveBillsImportData();">保存</button>
				<button type="button" class="btn btn-warning" data-dismiss="modal">关闭</button>
		</div>
	  </div>
	</div>
</div>

<!-- 仓库选择 -->
<div class="modal fade" id="storageChoseModal" tabindex="-1" role="dialog"  aria-hidden="true">
   <div class="modal-dialog" style="width: 760px;">
      <div class="modal-content">
	     <div class="modal-header">
            <button type="button" class="close"  data-dismiss="modal" aria-hidden="true"> &times;</button>
            <h4 class="modal-title">本次出库量</h4>
         </div>
         <div class="modal-body">
			  <!-- /S 表体 -->
			  <div class="jqGrid_wrapper">
			   <input id="storageReferenceModal2_goodsInfo" type="hidden" />  
				<table id="dataGrid33"></table> 
			  </div>
         </div>
         <div class="modal-footer">
            <button type="button" class="btn btn-info"  onclick="saveDataGrid33()">保存</button>
            <button type="button" class="btn btn-warning"  class="close"  data-dismiss="modal" aria-hidden="true">取消</button>
         </div>
	  </div>
	</div>
</div> 


<!-- 引用在库串号录入 -->
<div class="modal fade" id="inputStorageImeiModal" tabindex="-1" role="dialog"  aria-hidden="false">
   <div class="modal-dialog" style="width:80%;">
      <div class="modal-content">
         <div class="modal-body">
        	<div class="form-horizontal" role="form"> 
			    <!-- /S 表单控件  -->
				<div class="form-group">
				  <!-- 商品名称 -->
				  <label class="col-sm-4 control-label" style="text-align: left;font-size: 16px;"><span style="font-weight: normal;">商品名称：</span><span  id="goodsnameTitle2"></span></label>
				  <label class="col-sm-4 control-label"  style="text-align: left;font-size:16px;"><span style="font-weight: normal;">仓库名称：</span><span  id="storagenameTitle2"></span></label>
				  <div class="col-sm-4">
				      <input   id="dataGridRowId2" type="hidden" >
				       <input  id="dataGridIRow2" type="hidden">
				      <button type="button" class="btn btn-info pull-right"  onclick="saveInputImei()" style="display: block;margin-left: 5px;">保存</button>
				      <button type="button" class="btn btn-warning pull-right" data-dismiss="modal">取消</button>
				  </div>
				</div>
			</div>
			<div style="height: 30px;line-height: 30px;padding-left: 10px;padding-right: 10px;">
				<span class="pull-left">在库串号信息</span>
				<span class="pull-right">已选择数：<span id="havedInputNum" >0</span></span>
			</div>
			
			<div style="width:1300px;">
				<div style="float: left;width:495px">
					<table id="dataGrid4" ></table>
					<div id="dataGrid4GridPager"></div>
				</div>
				<div style="float: left" style="width:60px;">
				   <button type="button" class="btn btn-default"  onclick="inBtClick()" id="moveImeiButtonLeft">>></button><br/><br/>
				   <button type="button" class="btn btn-default"  onclick="outBtClick()" id="moveImeiButtonRight">&lt;&lt;</button>
				</div>
				<div style="float: left;width:495px">
					<table id="dataGrid5" ></table>
					<div id="dataGrid5GridPager"></div>
				</div>
			</div>
          </div>
	  </div>
	</div>
</div>

<!-------------------------------------模态框结束----------------------------------------->

