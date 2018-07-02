<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
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
		<link rel="stylesheet" type="text/css" href="${basePath}/css/cw/zTreeStyle/zTreeStylePublicModel.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/funds/payment.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="${basePath}/html/muti_select/multi.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="${basePath}/js/cw/bootstrap/css/bootstrapValidator.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="${basePath}/css/market/public.css?v=${version}" />
		<title>往来结算</title>
		<script>
			var billsCode = "${billsCode}";
			var billsId = "${billsId}";
		</script>
	</head>
	<style>
	   	.modal-content-dialog{
	   			width:600px;
	   		}
		.input-group-btn{
			width:0;
		}
    </style>
	<body>
		<!-------------------------------------主页面开始----------------------------------------->
			<div id="AUTH" data-code="WLJS" class="btn-group btnHundred" role="group" >
			  <button type="button" class="btn btn-default" onclick="firstPage()" >首单</button>
			  <button type="button" class="btn btn-default" onclick="backPage()">上一单</button>
			  <button type="button" class="btn btn-default" onclick="nextPage()">下一单</button>
			  <button type="button" class="btn btn-default" onclick="lastPage()">末单</button>
			  <button type="button" class="btn btn-default" onclick="addSettlement()">新增</button>
			  <button type="button" class="btn btn-default saveAndPost" onclick="saveAndPost()">保存并过账</button>	
			  <button type="button" class="btn btn-default invalid" onclick="invalid();">红冲</button>   
			  <button type="button" class="btn btn-default" onclick="filterModalBtnClick();">过滤</button>
			</div>
			
		    <div class="tab_div">
			 <ul class="nav nav-tabs" role="tablist">
			  <li role="presentation" class="active tab_1"><a href="" role="tab" data-toggle="tab">预付冲应付</a></li>
			  <li role="presentation" class="tab_2"><a href="" role="tab" data-toggle="tab">应付冲应付</a></li>
			  <li role="presentation" class="tab_3"><a href="" role="tab" data-toggle="tab">预收冲应收</a></li>
			  <li role="presentation" class="tab_4"><a href="" role="tab" data-toggle="tab">应收冲应收</a></li>
			  <li role="presentation" class="tab_5"><a href="" role="tab" data-toggle="tab">应收冲应付</a></li>
			 </ul>
			</div>
		<div class="tab-content">
			<div role="tabpanel" class="tab-pane active" id="tab_1">
				<!-------------------------------------预付冲应付----------------------------------------->
				<div class="collapse in" id="collapseExample">
	 			 <div class="well">
				<form id="billsHeaderForm">
					<div class="inputbox container-fluid clearfix">
					  <input type="hidden" name="id"/>
						<div class="row">
						  <div class="Zpercent form-group ">
							<span class="box_text2">单据编号：</span>
							<div class="col-sm-8">
								<div class="input-group"><input type="text" class="form-control" name="billsCode" id="billsCode" readonly="readonly" style="padding:0" /></div></div>
						   </div>
							
							<div class="Zpercent form-group">
							<span class="box_text2">部门名称：</span>
							<div class="col-sm-8">
							<div class="input-group">
						      <input type="text"  class="form-control" name="sectionName" id="sectionName"  readonly="readonly" >
					          <input type="hidden" name="sectionId" id="sectionId" >

					     </div></div>
					   </div>
							
						<div class="Zpercent form-group">
							<span class="box_text2">经手人：</span>
							<div class="col-sm-8">
							<div class="input-group">
					         <input type="text"  class="form-control" name="managerUname" id="managerUname" placeholder="部门名称先选"  readonly="readonly" >
					         <input type="hidden"  name="managersUid" id="managersUid" >

					    </div></div>
						</div>
							
						<div class="Zpercent form-group ">
							<span for="datetimepickerStart"  class="box_text2">单据日期：</span><div class="col-sm-8">
								<div class="input-group"><input type="text" class="form-control2" name="billsDate" id="billsDate" readonly="readonly" placeholder="年-月-日" /></div></div>
						</div>
							
						</div>
						
						<div class="row">
							<div class="Zpercent form-group">
								<span class="box_text2" id='unitSpan1'>预付单位 ：</span>
								<div class="input-group">
					          <input type="text"  class="form-control" name="outUnitName" id="outUnitName"  readonly="readonly" >
					          <input type="hidden"  name="outUnit" id="outUnit" >
					           <span class="input-group-btn">
					        <button class="btn btn-default depChoose" type="button" data-toggle="modal" onclick="showInOrOutModal(this.id);" id="outUnitModal">
					        	<span class="glyphicon glyphicon-plus"></span>
					        </button>
					      </span>
					        </div>
							 </span>
							</div>
							
							<div class="Zpercent form-group">
								<span class="box_text2" id='unitSpan2'>应付单位 ：</span>
								<div class="input-group">
					          <input type="text"  class="form-control" name="inUnitName" id="inUnitName"  readonly="readonly" >
					          <input type="hidden"  name="inUnit" id="inUnit" >
					           <span class="input-group-btn">
					        <button class="btn btn-default depChoose" type="button" data-toggle="modal" onclick="showInOrOutModal(this.id);" id="inUnitModal">
					        	<span class="glyphicon glyphicon-plus"></span>
					        </button>
					      </span>
					        </div>
							 </span>
							</div>
							
							<div class="Zpercent form-group">
								<span class="box_text2">冲销金额：</span><div class="col-sm-8">
								<div class="input-group"><input type="text" name="adjustAmount"  class="form-control" id="adjustAmount" value="0.00"/></div></div>
							</div>
							
						  <div class="Zpercent form-group">
							<span class="box_text2">单备注：</span><div class="col-sm-8">
								<div class="input-group"><input type="text" name="remark" id="remark" value=""  class="form-control2" /></div></div>
						   </div>
						</div>
						<div class="rightMap">
						<img src="" />
					</div>
					</div>
				 </form>
				 </div>
			</div>
			<div class="tablebox retailDetailTable" >
				<div class="boxmain" id="upGridDiv1">
					<button class="btn btn-default tab_6" data-toggle="modal" id="3" onclick="yingruUpBtnClick(this.id)" payType="2" >引入预付明细</button>
				</div>
				<div class="grid-wrap" style="margin-top:10px" id="upGridDiv2"> 
					<table id="jqGrid_tab_up" class="zxsaastable">
					</table>
				</div>
				
				<div class="boxmain" id="downGridDiv1">
					<button class="btn btn-default tab_6s" data-toggle="modal" id="1" onclick="yingruDownBtnClick(this.id)" payType="3">引入应付明细</button>
				</div>
				<div class="grid-wrap" id="downGridDiv2" style="margin-top:10px">
					<table id="jqGrid_tab_down" class="zxsaastable">
					</table>
				</div>
			</div>
		 </div>
			
		<!-------------------------------------主页面结束----------------------------------------->
		<!--引入明细弹出窗-->
		<!-- 模态框（Modal） -->
		<div class="modal fade" id="bills_modal_id" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog model-dialog4">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">引入明细</h4>
					</div>
					<div class="modal-body" id="model-body">
						<div class="showTab">
							<div class="current change">
								<div>
									往来单位：<span id="unitNameSpan" style="margin-right:140px;"></span>
									需要冲销金额：<span id="adjustAmountSpan" style="margin-right:150px;"></span>
									已选未核销金额：<span id="checkedHasnotAmount" >0.00</span>
								</div>
								<div>
									开始日期：<input type="text" id="beginTime" placeholder="年-月-日" style="width:140px;margin-right:40px;" name="beginTime" onblur='checkInput.checkTime(this,"#beginTime","#endTime");' />
									结束日期：<input type="text" id="endTime" placeholder="年-月-日"  style="width:140px;margin-right:40px;" name="endTime" onblur='checkInput.checkTime(this,"#beginTime","#endTime");' />
									<span class="goodNameSpan">商品名称：<input type="text"   style="width:140px;margin-right:40px;" name="goodsName"/></span>
									单据编号：<input type="text" id="billsCodeCondition" style="width:110px;margin-right:30px;" name="billsCode" />
									<button class="btn btn-success" style="float:right;" onclick="searchDetail();">查询</button>
								</div>
								<div class="tablebox retailDetailTable" style="overflow: auto;">
									<div class="grid-wrap" style="margin-top:10px">
										<table id="jqGrid_tab_Bills_modal" class="zxsaastable" style="overflow: hidden;">
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="modal-footer">
					    <button type="button" class="btn btn-success" onclick="saveModalData();">保存</button>
						<button type="button" class="btn btn-warning" data-dismiss="modal">关闭</button>
					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>
		
		
		<!--过滤弹出窗-->
		<!-- 模态框（Modal） -->
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
						<button type="button" class="btn btn-success" onclick="filterSearch();">查询</button>
						<button type="button" class="btn btn-info" data-dismiss="modal">取消</button>
						<button type="button" class="btn btn-warning reset" onclick="reset();">重置</button>
					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>
	
		<!-------------------------------------底部结束----------------------------------------->
	</body>
	<script src="${basePath}/js/jquery-1.12.4.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script type="text/javascript" src="${basePath}/js/base.js?v=${version}"></script>
	<script src="${basePath}/js/bootstrap.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/jquery.jqGrid.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/jquery.datetimepicker.full.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/grid.locale-cn.js?v=${version}" type="text/javascript" charset="utf-8"></script>		
	<script src="${basePath}/js/commonjs/xr.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/zxsaas_plus.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/component.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/cw/jquery.ztree.all-3.5.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/html/muti_select/MultiSelectDropList.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/erp/funds/settlement-account.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="../../js/erp/funds/tree.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="../../js/erp/funds/common.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	
	<script src="${basePath}/js/bootstrapValidator.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/cw/bootstrap/js/validator-lynnjer.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script type="text/javascript" src="${basePath}/js/base.js?v=${version}"></script>
	<!-- 菜单权限验证 -->
	<script type="text/javascript" src="${basePath}/js/erp/authority/menuValidation.js?v=${version}"></script>
	<script src="${basePath}/js/cw/bootstrap/js/bootstrap-dialog.min.js?v=${version}"></script>
	<script src="${basePath}/js/erp/funds/invalid.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	
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
