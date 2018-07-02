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
		.input-group-btn{
			width: 0;
		}
		</style>
		<script type="text/javascript">
			var billsCode = "${billsCode}";
		</script>
		<title>批发退货单</title>
	</head>

	<body  class="e-body-bg pageBill">

		<!-------------------------------------主页面开始----------------------------------------->
		<div>
			<div class="btn-toolbar" id="MenuTool" role="toolbar" data-code="XSTHD"></div>
			<div id="AUTH" data-code="XSTHD" class="none btn-group btnHundred" role="group" style="min-width:1150px">
				<button type="button" class="btn btn-default" onclick="firstPage()">首单</button>
			    <button type="button" class="btn btn-default" onclick="backPage()">上一单</button>
			    <button type="button" class="btn btn-default" onclick="nextPage()">下一单</button>
			    <button type="button" class="btn btn-default" onclick="lastPage()">末单</button>
				<button type="button" class="btn btn-default" onclick="addBills()">新增</button>
			    <button type="button" class="btn btn-default" onclick="saveBtnClick()">保存</button>	
			    <button type="button" class="btn btn-default delete" onclick="delBtClick()">删除</button>	
			    <button type="button" class="btn btn-default post" id="1" onclick="postBtnClick(this.id);">过账</button>
			    <button type="button" class="btn btn-default invalid" id="2" onclick="invalidBtnClick(this.id);">红冲</button>
			    <button type="button" class="btn btn-default print" onclick="print()">打印</button>
			    <!-- 
			    <button type="button" class="btn btn-default billsImport" onclick="billsImportBtClick()">单据引入</button>
			     -->
			    <button type="button" class="btn btn-default" onclick="refreshBtClick()">刷新</button>	  			  			  			  
			    <button type="button" class="btn btn-default" onclick="filterBtnClick();">过滤</button>
			    <button type="button" class="btn btn-default copy" onclick="copyBtnClick();">复制</button>
				 <div class="slideThree none">
					<input type="checkbox" value="0" id="slideThree" name="check"/>
					<label for="slideThree"></label>
				</div>
				<button type="button" class="btn btn-default btn-yindao-btn" style="float:right;"
						onclick="window.parent.openWorkBoxByMenutext('批发退货单单据列表',  '/manager/inventory/sales/historyMain?billsType=21', true)">历史单据</button>

			</div>
			<div class="pageBillForm gridTop">
			<!-------------------------------------搜索条件开始----------------------------------------->
				<form id="billsHeaderForm" class="clearfix form-inline">
				<div class="clearfix">
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

		<div id="outImeiWrap"></div>
			<!-------------------------------------搜索条件结束----------------------------------------->			
			<!-------------------------------------表格开始----------------------------------------->
			<div class="tablebox retailDetailTable">
				<div class="none">
					<input type="hidden" id="dataGridAllGood" data-desc="全部商品名称模态框">
				</div>
				<div class="grid-wrap" style="margin-top:10px">
					<table id="dataGrid" class="zxsaastable">
					</table>
					<div id="jqGridPager"></div>
				</div>
			</div>
			<!-------------------------------------表格结束----------------------------------------->
		<!-------------------------------------主页面结束----------------------------------------->

		<!-------------------------------------底部开始----------------------------------------->
		<form id="gridFooter">
			<div class="pageBillBottom pt10 clearfix form-inline" id="collapseExample">
				<div class="form-group ">
					<label>付款金额：</label>
					<input type="text" id="prepaymentAmount" name="prepaymentAmount" class="form-control" readonly/>
				</div>
				<div class="form-group ">
					<label>整单折扣：</label>
					<input type="text" id="billsDiscount" name="billsDiscount" class="form-control " value="0.00"/>
				</div>
				<div class="form-group ">
					<label>应付金额：</label>
					<input type="text" id="yingshouAmount" name="yingshouAmount" class="form-control " value="0.00"/>
				</div>
				<div class="form-group ">
					<label>未付金额：</label>
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
	
	<script src="${basePath}/js/jquery-1.12.4.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/cw/underscore-min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/bootstrap.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/jquery.jqGrid.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/jquery.datetimepicker.full.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/grid.locale-cn.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/commonjs/xr.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/component.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/zxsaas_plus.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/component.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/cw/jquery.ztree.all-3.5.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/html/muti_select/MultiSelectDropList.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/commonjs/xr.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script type="text/javascript" charset="utf-8" src="${basePath}/js/commonjs/eidit-grid-test.js?v=${version}" ></script>
	<script src="${basePath}/js/erp/sales/sales-return.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/cw/bootstrap/js/bootstrap-dialog.min.js?v=${version}"></script>
	<script src="${basePath}/js/erp/sales/imei.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/erp/sales/common.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/erp/sales/post-invalid.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/erp/sales/bills-import.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/erp/sales/print.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	
	<script type="text/javascript" src="${basePath}/js/base.js?v=${version}"></script>
	<!-- 验证 -->
	<script src="${basePath}/js/bootstrapValidator.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/bootstrapValidator.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<!-- 打印 -->
	<script type="text/javascript" charset="utf-8" src="${basePath}/js/jquery-migrate-1.2.1.min.js?v=${version}"></script>
	<script type="text/javascript" charset="utf-8" src="${basePath}/js/jquery.jqprint-0.3.js?v=${version}"></script>
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
				<h4 class="modal-title" id="myModalLabel">付款方式</h4>
			</div>
			<div class="modal-body">
				<div class="container" style="width:100%">
					<div class="details" style="width:100%">
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
				  <label class="col-sm-5 control-label" style="text-align: left;">商品信息:<span id="goodsnameTitle"></span></label>
				  <!-- 是否串号管理 -->
				  <div class="col-sm-5" style="line-height: 30px;">
				      <input type="checkbox" id="ifEnableAuxliaryImei" disabled="disabled"/>启用辅助串号
				  </div>
				  <div class="col-sm-2 hide">
				      <button type="button" class="btn btn-default"  onclick="">串号导入</button>
				  </div>
				</div>
			</div>
        	<div class="form-horizontal" role="form"> 
			    <!-- /S 表单控件  -->
				<div class="form-group">
				  <label class="col-sm-3 control-label" style="font-weight: normal;">主串号录入：</label>
				  <div class="col-sm-4">
				      <input type="text" class="form-control" name="" id="imeiInput1" />
				      <input type="hidden" class="form-control" name="" id="dataGridRowIdForImeiInput" >
				  </div>
				</div>
				<div class="form-group auxliaryImeiGroup" style="margin-top: 10px;margin-bottom: 10px;">
				  <label class="col-sm-3 control-label" style="font-weight: normal;">辅助串号录入：</label>
				  <div class="col-sm-4">
				      <input type="text" class="form-control" name="imeiInput2" id="imeiInput2" />
				  </div>
				</div>
			</div> 
			<div style="height: 30px;line-height: 30px;padding-left: 10px;padding-right: 10px;margin-top: -30px;">
			<span class="pull-right">已输入：<span id="currInputNum" >0</span></span>
			</div>
			<!-- /S 表体 -->
			<div class="jqGrid_wrapper">
				<table id="dataGrid3"></table> 
			</div><!-- /E 表体 -->
         </div>
         <!-- 模态框底部部分 -->
         <div class="modal-footer">
            <button type="button" class="btn btn-primary"  onclick="saveImeiInput()">保存</button>
            <button type="button" class="btn btn-default"  data-dismiss="modal">取消</button>
         </div>
	  </div>
	</div>
</div>


<!-------------------------------------模态框结束----------------------------------------->
