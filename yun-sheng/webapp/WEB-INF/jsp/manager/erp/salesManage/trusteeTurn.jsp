<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<meta name="renderer" content="webkit" />
		<meta http-equiv="X-UA-Compatible" content="IE=9; IE=8; IE=7; IE=EDGE ; chrome=1" />
		<link rel="stylesheet" type="text/css" href="${basePath}/css/base.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="../css/bootstrap.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="../css/jquery-ui.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="../js/skins/all.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="../css/animate.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="../css/bootstrap-select.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="../css/font-awesome.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="../css/iconfont.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="../css/pagecss/treepage.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="../css/jquery.datetimepicker.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="../css/ui.jqgrid-bootstrap.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="../css/cw/zTreeStyle/zTreeStylePublicModel.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="../css/funds/payment.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="../html/muti_select/multi.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="../css/market/public.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="../css/market/marketBarter.css?v=${version}" />
		
		<link rel="stylesheet" type="text/css" href="${basePath}/js/cw/bootstrap/css/bootstrapValidator.css?v=${version}" />
		<title>委托退货单</title>
		<style type="text/css">
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
		
		//**********全局变量
		//基本目录
		
		var billsCode = "${billsCode}";
	</script>
	</head>

	<body >
		<!-------------------------------------主页面开始----------------------------------------->
		<div class="well" style="min-width:1250px!important">
			<div id="AUTH" data-code="WTTHD" class="btn-group btnHundred" role="group" >
				<button type="button" class="btn btn-default" onclick="firstPage()">首单</button>
			    <button type="button" class="btn btn-default" onclick="backPage()">上一单</button>
			    <button type="button" class="btn btn-default" onclick="nextPage()">下一单</button>
			    <button type="button" class="btn btn-default" onclick="lastPage()">末单</button>
				<button type="button" class="btn btn-default" onclick="addBills()">新增</button>
			    <button type="button" class="btn btn-default" onclick="saveBtnClick()">保存</button>	
			    <button type="button" class="btn btn-default delete" onclick="delBtClick()">删除</button>	
			    <button type="button" class="btn btn-default post" id="1" onclick="postBtnClick(this.id);">过账</button>
			    <button type="button" class="btn btn-default invalid" id="2" onclick="invalidBtnClick(this.id);">红冲</button>
			    <button type="button" class="btn btn-default" onclick="print()">打印</button>
			    <button type="button" class="btn btn-default" onclick="refreshBtClick()">刷新</button>	  			  			  			  
			    <button type="button" class="btn btn-default" onclick="filterBtnClick();">过滤</button>
			    <button type="button" class="btn btn-default copy" onclick="copyBtnClick();">复制</button>
				 <div class="slideThree">
					<input type="checkbox" value="0" id="slideThree" name="check" checked onchange="changeStatus()"/>
					<label for="slideThree"></label>
				</div>
			</div>
				
			<!-------------------------------------搜索条件开始----------------------------------------->
		<form id="billsHeaderForm">
			<span style='display:none;color:yellow;'>fuck ie!</span>
				<div class="inputbox container-fluid clearfix">
					<inut type='hidden' name='' class='orderId' />
					<inut type='hidden' name='' class='orderSectionId' />
					<inut type='hidden' name='' class='unitIdOly' />
					<inut type='hidden' name='' class='goodsIdOly' />
					
					<div class="row">
						<div class="Zpercent ">
							<span class="box_text2">单据编号：</span>
							<input type="hidden" name="id" id="id"/>
							<span class="box_input input-group"><input type="text" class="form-control" name="billsCode" id="billsCode" readonly="readonly" /></span>
						</div>
						
						<div class="Zpercent form-group">
							<span class="box_text2">部门名称：</span>
							<div class="input-group">
						      <input type="text"  class="form-control" name="sectionName" id="sectionName"  readonly="readonly" >
					          <input type="hidden" name="sectionId" id="sectionId" >

					     </div>
					  </div>
						
						<div class="Zpercent form-group">
							<span class="box_text2">往来单位：</span>
							<div class="input-group">
					          <input type="text"  class="form-control" name="contactUnitName" id="contactUnitName"  readonly="readonly" >
					          <input type="hidden"  name="contactsunitId" id="contactsunitId" >

					    </div>
						</div>
						
						<div class="Zpercent form-group">
							<span for="datetimepickerStart"  class="box_text2">单据日期：</span>
							<span class="box_input input-group">
							<input type="text" class="form-control2" name="billsDate" id="billsDate"  placeholder="年-月-日" onchange="refreshValidatorField('billsDate','#billsHeaderForm');" />
							</span>
						</div>
						
					</div>
					<br/>
					<div class="row">
						<div class="Zpercent ">
							<span class="box_text2">应收余额：</span><span class="box_input input-group"><input type="text" class="form-control" name="yingshouAmount" id="yingshouAmount" readonly="readonly" /></span>
						</div>
						<div class="Zpercent ">
							<span class="box_text2">预收余额：</span><span class="box_input input-group"><input type="text" class="form-control" name="yushouAmount" id="yushouAmount" readonly="readonly" /></span>
						</div>
						<div class="Zpercent form-group">
							<span class="box_text2">经手人：</span>
							<div class="input-group">
					         <input type="text"  class="form-control" name="managerUname" id="managerUname" placeholder="部门名称先选"  readonly="readonly" >
					         <input type="hidden"  name="managerUid" id="managerUid" >

					    </div>
						</div>
					
						<div class="Zpercent form-group">
							<span class="box_text2">单备注：</span><span class="box_input input-group"><input type="text" name="remark" id="remark" value=""  class="form-control2" /></span>
						</div>
					</div>
					<br/><%--
					<div class="row">
						<div class="Zpercent ">
							<span class="box_text2">仓库名称：</span><span class="box_input"><select style="width:170px;height: 30px;" id="storageId" ><option value="">请选择</option></select></span>
						</div>
					</div>
					<br/>
				--%><div class="rightMap">
						<img src="" />
					</div>
				</div>
			 </form>
		</div>
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
		<!--过滤弹出窗-->
		<div class="modal fade" id="filterModel" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog model-dialog2">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							过滤条件
						</h4>
					</div>
					<div class="modal-body" id="model-body">
						<div class="showTab">
							<div class="current change">
								<form id="filterSearchForm" >
									<div class="demoText form-group">
										<label for="" class='box_text2'>开始日期:</label>
										<div class="col-sm-8">
											<input type="text" name="beginTime" class="filterData form-control2" placeholder="年-月-日" value="" id="datetimepickerStart1" onblur='checkInput.checkTime(this,"#datetimepickerStart1","#datetimepickerEnd1");'  />
										</div>
									</div>
									<div class="demoText form-group">
										<label for="" class='box_text2'>结束日期:</label>
										<div class="col-sm-8">
											<input type="text" name="endTime" class="filterData form-control2" placeholder="年-月-日" value="" id="datetimepickerEnd1" onblur='checkInput.checkTime(this,"#datetimepickerStart1","#datetimepickerEnd1");'  />
										</div>
									</div>
									<div class="demoText form-group">
										<label for="" class='box_text2'>单据状态:</label>
										<div class="col-sm-8">
										  <select name="isDraft" class="filterData form-control2" >
										      <option  value="0">正式</option>
										      <option value="1">草稿</option>
										   </select>
										</div>
									</div>
									<div class="demoText form-group">
										<label for="" class='box_text2'>单 备 注:</label>
										<div class="col-sm-8">
											<input type="text" name="remark" class="filterData form-control2" />
										</div>
									</div>
									<div class="demoText form-group">
										<label for="" class='box_text2' style="margin-right: 15px;">部门名称:</label>
										<div class="col-sm-8 input-group">
											<input type="text" id="sectionNameFilter" class="depFilter form-control"   placeholder="" name="sectionName"/>
										</div>
									</div>
									<div class="demoText form-group">
										<label for="" class='box_text2' style="margin-right: 15px;">往来单位:</label>
										<div class="col-sm-8 input-group">
											<input type="text" id="contactUnitNameFilter" class="filterData form-control"  name="contactUnitName"/>
										</div>
									</div>
							         <div class="demoText form-group">
								        <label for="" class='box_text2'>单据编号:</label>
								        <div class="col-sm-8">
								        	 <input type="text" class="filterData form-control2"  data-toggle="modal" name="billsCode"/>
								        </div>
							        </div>
								</form>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-success" onclick="filterSearch();">查询</button>
						<button type="button" class="btn btn-info" data-dismiss="modal">取消</button>
						<button type="button" class="btn btn-warning reset" onclick="reset();">重置</button>
					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>
		<!-------------------------------------底部开始----------------------------------------->
		<form id="gridFooter">
		   <div class="footer" style="min-width:inherit">
		   <br>
			<div class="Zpercent2 " style="width:260px;margin-top:10px;margin-bottom:5px;margin-left:0px">
				<span class="box_text2">公司名称  ：</span>
				<span class="box_input">
					<input type="text" name="companyName"  class="input150 form-control" disabled/>
				</span>
			</div>
			<div class="Zpercent2 " style="width:260px;margin-top:10px;margin-bottom:5px;margin-left:0px">
				<span class="box_text2">制单人  ：</span>
				<span class="box_input">
					<input type="text" name="createByName" class="input150 form-control"  disabled/>
				</span>
			</div>
			<div class="Zpercent2 " style="width:260px;margin-top:10px;margin-bottom:5px;margin-left:0px">
				<span class="box_text2">修改人 ：</span>
				<span class="box_input">
					<input type="text" name="lastupdateByName" class="input150 form-control" disabled/>
				</span>
			</div>
			<div class="Zpercent2 " style="width:260px;margin-top:10px;margin-bottom:5px;margin-left:0px">
				<span class="box_text2">过账人 ：</span>
				<span class="box_input">
					<input type="text" name="postByName" class="input150 form-control" disabled/>
				</span>
			</div>
			<div class="Zpercent2 " style="width:260px;margin-top:10px;margin-bottom:5px;margin-left:0px">
				<span class="box_text2">红冲人 ：</span>
				<span class="box_input">
					<input type="text" name="invalidByName" class="input150 form-control" disabled/>
				</span>
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
	<script src="../js/component.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="../js/zxsaas_plus.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="../js/cw/jquery.ztree.all-3.5.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="../html/muti_select/MultiSelectDropList.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="../js/commonjs/xr.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script type="text/javascript" charset="utf-8" src="../js/commonjs/eidit-grid-test.js?v=${version}" ></script>
	<script src="../js/cw/bootstrap/js/bootstrap-dialog.min.js?v=${version}"></script>
	<script src="../js/erp/sales/entrust-return.js?v=1.2.1" type="text/javascript" charset="utf-8"></script>
	<script src="../js/erp/sales/common.js?v=1.5.1" type="text/javascript" charset="utf-8"></script>
	<script src="../js/erp/sales/imei.js?v=1.5.1" type="text/javascript" charset="utf-8"></script>
	
	<script type="text/javascript" src="${basePath}/js/base.js?v=${version}"></script>
	<!-- 验证 -->
	<script src="${basePath}/js/bootstrapValidator.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="../js/cw/bootstrap/js/validator-company.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<!-- 菜单权限验证 -->
	<script type="text/javascript" src="${basePath}/js/erp/authority/menuValidation.js?v=${version}"></script>
	<!-- 打印 -->
	<script type="text/javascript" charset="utf-8" src="../js/bootstrap.min.js?v=${version}"></script>
	<script type="text/javascript" charset="utf-8" src="../js/jquery-migrate-1.2.1.min.js?v=${version}"></script>
	<script type="text/javascript" charset="utf-8" src="../js/jquery.jqprint-0.3.js?v=${version}"></script>

	<script src="../js/erp/sales/post-invalid.js?v=1.5.1" type="text/javascript" charset="utf-8"></script>
	<script src="../js/erp/sales/print.js?v=1.5.1" type="text/javascript" charset="utf-8"></script>
	<script type="text/javascript">
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
				<div class="container">
					<div class="details">
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

