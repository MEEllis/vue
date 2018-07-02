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
		<link rel="stylesheet" type="text/css" href="${basePath}/css/cw/zTreeStyle/zTreeStylePublicModel.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/businessManage/reconciliationSearch.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="${basePath}/css/market/public.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="${basePath}/css/businessManage/reconciliationBill.css?v=${version}" />
		<title>对账交款单查询</title>
	</head>
	<style>
	.inputbox .row {
     	margin-bottom: 20px;
     }
	.none{
		display: none;
	}
	</style>
	<body>
		<div class="well">
			<div class="none" id="MENU_CODE">JKCX</div>
			<div id="AUTH" data-code="JKCX" class="btn-group btnHundred" role="group" >
			
			</div>
			
			<!-------------------------------------搜索条件开始----------------------------------------->
		<form id="inquire_option" class="form-inline" style="padding:1% 0;">
			 <div class="form-group col-sm-3">
			    <label for="retailCardNum" class="width-25">交款日期:</label>
			    <div class="input-group col-sm-4">
			      <input type="text" class="form-control" name="startDate" id="startDate" >
			    </div>	
			    --
			    <div class="input-group col-sm-4">
			      <input type="text" class="form-control" id="endDate" >
			    </div>	
		    </div>
		    
		     <div class="form-group col-sm-3">
			    <label for="retailCardNum" class="width-25">交款门店:</label>
			    <div class="input-group col-sm-8">
			      <input type="text" class="form-control" id="storeInput">
			    </div>	
		    </div>
		    
			 <div class="form-group col-sm-3">
			    <label for="retailCardNum" class="width-25">交款人:</label>
			    <div class="input-group col-sm-8">
			      <input type="text" class="form-control" id="saleManInput">
			    </div>	
		    </div>

			<div class="form-group col-sm-3" style="text-align:center;">
				<button type="button" class="btn btn-primary B_JKCX_0002 none" id="search">查询</button>
				<button type="button" class="btn btn-primary reset">重置</button>
			</div>
			<div style="clear:both;"></div>

			 </form>
		</div>

		    <div class="input-group ifSureBox" style="margin:20px 0;">
		    		<label for="retailCardNum" class="">收款状态:</label>
			      <select id="ifSure" class="" >
			      		<option value="2" selected="selected">所有</option>
			      		<option value="1">已确认</option>
			      		<option value="0">未确认</option>
			      		<option value="-1">已红冲</option>
			      </select>
		    </div>	
	
		
		<!--表格开始-->
		<div class="tableWrap">
			<table id="orderGrid" class="zxsaastable"></table>
		</div>
		

		
		<!--底部的开始-->
			<!-------------------------------------主页面开始----------------------------------------->
	<div class="popsWrap" style="margin-top:20px;" id="infoSearch">
	  <input type="hidden" value="" name="id"/>
		<!-------------------------------------表格开始----------------------------------------->
		<div class="main" id="Cashinfo">
			<div class="col-sm-6">
				<table border="" cellspacing="" cellpadding="">
					<input type="hidden" name="id"/>
					<tr>
						<td>交款账户</td>
						<td>昨日结余</td>
						<td>今日收入</td>
						<td>今日支出</td>
						<td>交款未确认</td>
						<td>应交金额</td>
						
					</tr>
					<tr>
						<td><input type="hidden" name="paymentAccountAd" readonly=""/><input type="text" name="paymentAccountName" readonly=""/></td>
						<td><input type="text" name="totalAmount" readonly=""/></td>
						<td><input type="text" name="inAmount" readonly=""/></td>
						<td><input type="text" name="outAmount" readonly=""/></td>
						<td><input type="text" name="accountMount" readonly=""/></td>
						<td><input type="text" name="yinAmount" readonly="" class="yjje"/></td>
						
					</tr>
				</table>
			</div>
			<div class="col-sm-4" style="line-height:36px;">
				 <div class="form-group form-inline">
				    <label for="retailCardNum" >交款金额:</label>
				    <div class="input-group col-sm-5">
				        <input type="text"  name="accountAmount" class="form-control jkje" id="storeInput">
				    </div>
				    <label for="retailCardNum">交款结余:</label>
				    <div class="input-group col-sm-4 ">
				      	<input type="text" name="jkjy" readonly=""  class="form-control jkjy"/>
				    </div>	
				    
			    </div>
			    <div class="form-group form-inline">
				    <label for="retailCardNum" >备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注:</label>
				    <div class="input-group col-sm-5">
				        <input type="text" class="form-control" id="remark">
				    </div>
			    </div>
			</div>
			<div class="col-sm-2">
				<button type="button" class="btn btn-primary Search_save B_JKCX_0001 none" style="height:85px;width:85px;">保存修改</button>
				<button type="button" class="btn btn-primary Search_Cancel B_JKCX_0004 none" style="height:85px;width:85px;">红冲</button>
			</div>
			<div class="clear:both"></div>
		</div>
		</div>

		<div class="modal fade in" id="myModal_red" tabindex="-1" role="dialog" aria-hidden="true" >
			<div class="modal-dialog">
				<div class="modal-content" style="height: auto;">
					<div class="modal-header" style="cursor: default;">
						<h4 class="modal-title">红冲</h4>
					</div>
					<div class="modal-body">
						<input type="text" class="form-control date-time-icon" id="redDate"  placeholder="年-月-日" readonly="">
					</div>
					<div class="modal-footer">
						<button id="red_cancel" type="button" class="btn btn-default" data-dismiss="modal">取消</button>
						<button id="red_sure" type="button" class="btn btn-primary" data-dismiss="modal">确定</button>
					</div>
				</div>
			</div>
		</div>

		<!-------------------------------------表格结束----------------------------------------->
	</body>
	<script src="${basePath}/js/jquery-1.12.4.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/bootstrap.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/jquery.jqGrid.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/jquery.datetimepicker.full.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/grid.locale-cn.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/commonjs/xm.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/zxsaas_plus.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/cw/jquery.ztree.all-3.5.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/html/muti_select/MultiSelectDropList.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/select2.full.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/commonjs/xr.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script type="text/javascript" src="${basePath}/js/businessManage/reconciliationSearch.js?v=${version}"></script>
	
	<!-- 验证 -->
	<script src="${basePath}/js/cw/bootstrap/js/validator-company.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<!-- 菜单权限验证 -->
	<script type="text/javascript" src="${basePath}/js/erp/authority/menuValidation.js?v=${version}"></script>
</html>