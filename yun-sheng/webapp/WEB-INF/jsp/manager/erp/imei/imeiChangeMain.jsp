<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%> 
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8" />
	<meta name="renderer" content="webkit" />
	<meta http-equiv="X-UA-Compatible" content="IE=9; IE=8; IE=7; IE=EDGE ; chrome=1" />
	<link rel="stylesheet" type="text/css" href="${basePath}/css/base.css?v=${version}"/>
	<link rel="stylesheet" type="text/css" href="${basePath}/css/bootstrap.css?v=${version}" />
	<link rel="stylesheet" type="text/css" href="${basePath}/css/jquery-ui.css?v=${version}" />
	<link rel="stylesheet" type="text/css" href="${basePath}/js/skins/all.css?v=${version}" />
	<link rel="stylesheet" type="text/css" href="${basePath}/css/animate.css?v=${version}"/>
	<link rel="stylesheet" type="text/css" href="${basePath}/css/bootstrap-select.css?v=${version}"/>
	<link rel="stylesheet" type="text/css" href="${basePath}/css/font-awesome.css?v=${version}"/>
	<link rel="stylesheet" type="text/css" href="${basePath}/css/iconfont.css?v=${version}"/>
	<link rel="stylesheet" type="text/css" href="${basePath}/css/pagecss/treepage.css?v=${version}"/>
	<link rel="stylesheet" type="text/css" href="${basePath}/css/jquery.datetimepicker.css?v=${version}"/>
	<link rel="stylesheet" type="text/css" href="${basePath}/css/ui.jqgrid-bootstrap.css?v=${version}"/>
	<link rel="stylesheet" type="text/css" href="${basePath}/css/cw/zTreeStyle/zTreeStyle_.css?v=${version}"/>
	<link rel="stylesheet" type="text/css" href="${basePath}/css/retailOrder/imeiChange.css?v=${version}" />
	<title>串号变更</title>
	<script type="text/javascript">
		//全局变量
		var gl_groupId = "${groupId}";//集团ID
		var basePath = "${basePath}";
	</script>
	<link rel="stylesheet" type="text/css" href="${basePath}/css/jquery.datetimepicker.css?v=${version}"/>
	<style>
		.input-group-btn.showBox{
			border: 0;
			display: inline-block;
			position: absolute;
			top: 0px;
			right: 0px;
		}
	</style>
</head>
	<body>
		<div class="well">
			<div id="AUTH" data-code="CHBGD" class="btn-group btnHundred" role="group" >
				<button type="button" class="btn btn-default searchOtherBill">首单</button>
			    <button type="button" class="btn btn-default searchOtherBill">上一单</button>
			    <button type="button" class="btn btn-default searchOtherBill">下一单</button>
			    <button type="button" class="btn btn-default searchOtherBill">末单</button>
				<button type="button" class="btn btn-default addAudit" data-eventname="add">新增</button>
			  	<button type="button" class="btn btn-default saveData" data-eventname="save">保存</button>	
			  	<button type="button" class="btn btn-default deleteReceipts" data-eventname="delete">删除</button>	
			    <button type="button" class="btn btn-default execute">执行</button>
			    <button type="button" class="btn btn-default filter">过滤</button>
			    <button type="button" class="btn btn-default print">打印</button>
			    <button type="button" class="btn btn-default imeiSearch">串号变更记录查询</button>
			</div>
			<!-------------------------------------搜索条件开始----------------------------------------->
			<form id="billsHeaderForm">
				<div class="inputbox container-fluid clearfix" style='margin-bottom: 20px;'>
					<inut type='hidden' name='' class='orderId' />
					<inut type='hidden' name='' class='orderSectionId' />
					<inut type='hidden' name='' class='unitIdOly' />
					<inut type='hidden' name='' class='goodsIdOly' />
					
					<div class="row">
						<div class="demoText form-group Zpercent ">
							<span class="box_text2">单据编号：</span>
							<span class="box_input input-group"><input type="text" class="form-control" name="billsCode" id="billsCode" readonly="readonly" /><input type="hidden" id='billsId' /><input type="hidden" id='billsStatus' /></span>
						</div>
						<div class="demoText form-group Zpercent ">
							<span class="box_text2">单据日期：</span>
							<span class="box_input input-group"><input type="text" class="form-control" name="billsTime" id="billsTime" readonly/></span>
						</div>
						<div class="demoText form-group Zpercent">
							<span class="box_text2">部门名称：</span>
							<div class="input-group">
						      <input type="text"  class="form-control depSearch" name="sectionName" id="sectionName"  readonly="readonly" >
					          <input type="hidden" name="sectionId" class="add_tree_ids" id="sectionId" >
						     </div>
					  	</div>
						<div class="demoText form-group Zpercent">
							<span class="box_text2">单备注：</span><span class="box_input input-group"><input type="text" name="remark" id="remark" value=""  class="form-control" /></span>
						</div>
					</div>
					<div class="rightMap" >
						<img class='rightMapImg' style="display:none;" src="${basePath}/images/status/statusExecute.png" />
					</div>
				</div>
			</form>
		</div>
		<!-------------------------------------表格开始----------------------------------------->
			<div class="row" style='margin-top: 10px;'>
       			<div class="col-md-3">
	        		<div class="form-horizontal" role="form" style="margin-top: 5px;"> 
						<div class="form-group">
						  <label style='width:auto;float: left;line-height:34px;'>串号搜索:</label>
						  <div class="col-sm-7 wiRes">
						    <input type="text" class="form-control searchInputImei" value="">
						  </div>
							<div class="form-group col-sm-3" style="margin-bottom: 0px;">
								<button type="button" class="erp-btn-bg imeiImport">导入</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="tablebox retailDetailTable">
			<div class="grid-wrap" style="margin-top:10px;overflow-x: auto;">
				<table id="dataGrid" class="zxsaastable">
				</table>
				<div id="jqGridPager"></div>
			</div>
		</div>
		<div class="footer" style="margin-top: 10px;">
			<span for="" class='box_text2'>执行时间:</span>
			<span for="" class='box_text2 zxTime'>
				<input type="text" class="form-control" name="executeTime" id="executeTime" readonly="readonly" />
			</span>
			<span for="" class='box_text2'>执行人:</span>
			<span for="" class='box_text2 zxPerson'>
				<input type="text" class="form-control" name="executeByName" id="executeByName" readonly="readonly" />
			</span>
			<span for="" class='box_text2'>制单时间:</span>
			<span for="" class='box_text2 zdTime'>
				<input type="text" class="form-control" name="createTime" id="createTime" readonly="readonly" />
			</span>
			<span for="" class='box_text2'>制单人:</span>
			<span for="" class='box_text2 zdPerson'>
				<input type="text" class="form-control" name="createByName" id="createByName" readonly="readonly" />
			</span>
			</div>
		</div>
		
		<!-------------------------------------表格结束----------------------------------------->
		<!-------------------------------------主页面结束----------------------------------------->
	<div class="modal fade" id="imeiImportModel" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog model-dialog7">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" >
							过滤条件
						</h4>
					</div>
					<div class="modal-body" >
						<div class="showTab">
							<div class="current change">
								<form id="imeiImportForm">
									<div class="demoText form-group clearfix">
										<span for="" class='box_text2'>选择格式:</span>
										<div class="col-sm-9">
											<div>
												<label for="imeiXLS">
													<input type="radio" id="imeiXLS"  checked="checked">XLS</label>
											</div>
											<p>
												Excel 导入是批量数据创建的手段。每一种表单都有对应的Excel格式，必须使用系统提供的Excel模板文件来填充数据 (点击下载 <a  href="${basePath}/qichu/串号变更导入模板.xls">模板</a>).
												注意 :在上传文件中，不要放置宏或图表，不要更改列的顺序，数据中不要使用公式。
											</p>
										</div>
									</div>
									<div class="demoText form-group clearfix">
										<span for="" class='box_text2'>选择文件:</span>
										<div class="col-sm-9">
											<input type="file" id="file" name="file"/>
										</div>
									</div>
									<div class="demoText form-group clearfix">
										<span for="" class='box_text2'>最大:</span>
										<div class="col-sm-9">
											<label class="mt5">20M</label>
										</div>
									</div>

									<div class="demoText form-group clearfix">
										<button type="button" class="erp-btn-bg mr15 imeiImportOK">开始上传并导入</button>
										<a href="/manager/imei/change/excelFileExport" class="none erp-btn-lab  imeiImportError">导出错误信息</a>
									</div>
									<div class="demoText form-group clearfix">
										<p id="imeiImportErrInfo"></p>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

	<!--过滤弹出窗-->
	<div class="modal fade" id="filterModel" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog model-dialog7">
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
								<form id="filterSearchForm">
									<div class="demoText form-group">
										<span for="" class='box_text2'>开始日期:</span>
										<div class="col-sm-8">
											<input type="text" name="beginTime1" class="filterData form-control2" placeholder="年-月-日" value="" id="datetimepickerStart1" readonly/>
										</div>
									</div>
									<div class="demoText form-group">
										<span for="" class='box_text2'>结束日期:</span>
										<div class="col-sm-8">
											<input type="text" name="endTime1" class="filterData form-control2" placeholder="年-月-日" value="" id="datetimepickerEnd1" readonly/>
										</div>
									</div>
									<div class="demoText form-group">
								        <span for="" class='box_text2'>部门名称:</span>
								        <div class="col-sm-8">
								        	<input type="hidden" name="" class="filter_tree_ids filterData" id="sectionId1" >
								        	<input type="text" value="" class="depFilter form-control2 filterData" placeholder="" data-toggle="modal"  name="sectionName1" readonly />
								        </div>
							        </div>
							        <div class="demoText form-group">
										<span for="" class='box_text2'>单据编号:</span>
										<div class="col-sm-8">
											<input type="text" name="docNum1" class="filterData form-control2 noFilter" />
										</div>
									</div>
							        <div class="demoText form-group">
										<span for="" class='box_text2'>串号:</span>
										<div class="col-sm-8">
											<input type="text" name="imei1" class="filterData form-control2 imeiFilter" />
										</div>
									</div>
									<%--<div class="demoText form-group">--%>
										<%--<span for="" class='box_text2'>商品名称:</span>--%>
										<%--<div class="col-sm-8">--%>
											<%--<input type="text" name="proname1" class="filterData form-control2 goodsNameFilter" />--%>
										<%--</div>--%>
									<%--</div>--%>
							        <div class="demoText form-group">
										<span for="" class='box_text2'>备 注:</span>
										<div class="col-sm-8">
											<input type="text" name="remark1" class="filterData remarkFilter form-control2" />
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-success searchFilter">查询</button>
						<button type="button" class="btn btn-info" data-dismiss="modal">取消</button>
						<button type="button" class="btn btn-warning reset">重置</button>
					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>
		
	<!-- 串号变更记录查询模态框 -->
	<div class="modal fade" id="imeiChangeModal" tabindex="-1" role="dialog" aria-labelledby="mySection" aria-hidden="true">
		<div class="modal-dialog model-dialog11">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">
						&times;
					</button>
					<h4 class="modal-title" id="myModalLabel">
						串号变更记录查询
					</h4>
				</div>
				<div class="modal-body tree-body">
					<div class="tiaojian">
						<form id="filterSearchForm">
							<div class="demoText form-group">
								<span for="" class='box_text2'>开始日期:</span>
								<div class="col-sm-8">
									<input type="text" name="beginTime" class="filterData form-control2" placeholder="年-月-日" value="" id="datetimepickerStart11"  readonly/>
								</div>
							</div>
							<div class="demoText form-group">
								<span for="" class='box_text2'>结束日期:</span>
								<div class="col-sm-8">
									<input type="text" name="endTime" class="filterData form-control2" placeholder="年-月-日" value="" id="datetimepickerEnd11"  readonly/>
								</div>
							</div>
							<div class="demoText form-group">
								<span for="" class='box_text2'>串号:</span>
								<div class="col-sm-8">
									<input type="text" name="" class="filterData form-control2 imeiSearchInput" />
								</div>
							</div>
							<div class="demoText form-group">
								<span for="" class='box_text2'>商品名称:</span>
								<div class="col-sm-8">
									<input type="text" name="" class="filterData form-control2 goodsNameSearch" />
								</div>
							</div>
							<div class="demoText form-group">
				        <span for="" class='box_text2'>部门名称:</span>
				        <div class="col-sm-8">
				        	<input type="hidden" name="" class="search_tree_ids filterData" id="" >
				        	<input type="text" value="" class="unitSearch form-control2 filterData" placeholder="" data-toggle="modal" readonly />
				        </div>
			        </div>
			        <!-- 
			        <div class="demoText form-group">
								<label for="" class='box_text2'>经手人:</label>
								<div class="col-sm-8">
									<input type="hidden" name="" class="search_peo_ids filterData" id="" >
				        	<input type="text" value="" class="peoSearch form-control2 filterData" placeholder="" data-toggle="modal" readonly />
								</div>
							</div>
			         -->
			        
			        <div class="demoText form-group">
								<span for="" class='box_text2'>备 注:</span>
								<div class="col-sm-8">
									<input type="text" name="remark" class="filterData remarkSearch form-control2" />
								</div>
							</div>
						</form>
						<button type="button" class="btn btn-success searchImei">查询</button>
					</div>
					<div class="grid-wrap" style="margin-top:10px">
						<table id="jqGrid_imei" class="zxsaastable"></table>
						<div id="jqGridPager_imei"></div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-warning" data-dismiss="modal">关闭</button>
				</div>
			</div>
		</div>
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
					<ul id="depModelTree" class="ztree"></ul>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-warning" data-dismiss="modal">关闭</button>
				</div>
			</div>
		</div>
	</div>
	
	</body>
	<script src="${basePath}/js/jquery-1.12.4.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/bootstrap.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script type="text/javascript" charset="utf-8" src="${basePath}/js/grid.locale-cn.js?v=${version}"></script>
	<script src="${basePath}/js/jquery.jqGrid.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/jquery.datetimepicker.full.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/zxsaas_plus.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/cw/jquery.ztree.all-3.5.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/cw/bootstrap/js/validator-lynnjer.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/ajaxfileupload.js?v=${version}"></script>
	<script type="text/javascript" charset="utf-8" src="${basePath}/js/jquery-migrate-1.2.1.min.js?v=${version}"></script>
	<script type="text/javascript" charset="utf-8" src="${basePath}/js/cw/bootstrap/js/bootstrap-switch.js?v=${version}"></script>
	<script type="text/javascript" charset="utf-8" src="${basePath}/js/cw/bootstrap/js/bootstrap-dialog.min.js?v=${version}"></script>
	<script type="text/javascript" charset="utf-8" src="${basePath}/js/commonjs/xr.js?v=${version}" ></script>
	<script type="text/javascript" charset="utf-8" src="${basePath}/js/commonjs/eidit-grid-test.js?v=${version}" ></script>
	<script type="text/javascript" charset="utf-8" src="${basePath}/js/cw/underscore-min.js?v=${version}"></script>
	<script type="text/javascript" charset="utf-8" src="${basePath}/js/jquery.jqprint-0.3.js?v=${version}"></script>
	<script src="${basePath}/js/base.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/retailOrder/imeiChange.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<!-- 菜单权限验证 -->
	<script type="text/javascript" src="${basePath}/js/erp/authority/menuValidation.js?v=${version}"></script>
	
</html>














