<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%> 
<!DOCTYPE html>
<html>
		<meta charset="utf-8" />
		<meta name="renderer" content="webkit" />
		<meta http-equiv="X-UA-Compatible" content="IE=9; IE=8; IE=7; IE=EDGE ; chrome=1" />
		<link rel="stylesheet" type="text/css" href="${basePath}/css/base.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="${basePath}/css/bootstrap.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="${basePath}/css/jquery-ui.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="${basePath}/js/skins/all.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="${basePath}/css/animate.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="${basePath}/css/bootstrap-select.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="${basePath}/css/font-awesome.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="${basePath}/css/iconfont.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="${basePath}/css/pagecss/treepage.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="${basePath}/css/jquery.datetimepicker.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="${basePath}/css/ui.jqgrid-bootstrap.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="${basePath}/css/businessManage/reconciliationBill.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="${basePath}/css/market/public.css?v=${version}" />

		<title>对账交款单</title>
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
		<!-------------------------------------主页面开始----------------------------------------->
		<div class="well">
			<div class="none" id="MENU_CODE">YYJK</div>
			<div id="AUTH" data-code="YYJK" class="btn-group btnHundred" role="group">
				
			</div>

			<!-------------------------------------搜索条件开始----------------------------------------->
			<form id="inquire_option">
				<div class="inputbox container-fluid clearfix">
					<div class="row">
						<!-- 
						<div class="Zpercent ">
							<span class="box_text2">交款流水：</span><span class="box_input input-group"><input type="text" class="form-control2 jkls" name="flowNo" id="disabledInput" readonly  /></span>
						</div>
						 -->
						<div class="Zpercent ">
							<span class="box_text2">交款日期：</span><span class="box_input input-group"><input type="text" class="form-control2 jkrq" name="startDate" id="datetimepickerStart" placeholder="年-月-日" readonly="readonly"/></span>
						</div>
						<div class="Zpercent">
							<span class="box_text2">交款门店：</span>
							<span class="box_input input-group">
								<select class="sel md form-control2" name="sectionId">
								</select>
							</span>
						</div>
						<div class="Zpercent">
							<span class="box_text2">收款部门：</span>
							<span class="box_input input-group">
								<select class="sel skbm form-control2" name="accountSection">
								</select>
							</span>
						</div>
					</div>
					<div class="row">
						<div class="Zpercent">
							<span class="box_text2">收款账户：</span>
							<span class="box_input input-group">
								<select class="sel skzh form-control2" name="accountId">
									
								</select>
							</span>
						</div>
						<div class="Zpercent">
							<span class="box_text2">交款人：</span>
							<span class="box_input input-group">
								<select class="sel jkr form-control2" name="paymentId">
									
								</select>
							</span>
						</div>
						
					</div>
				</div>
			</form>
		</div>
			
		<!-------------------------------------搜索条件结束----------------------------------------->
		<!-------------------------------------表格开始----------------------------------------->
		<h3>交款信息</h3>
		<div class="main" id="Cashinfo">
			<table border="" cellspacing="" cellpadding="" >
				<tr>
					<td>交款账户</td>
					<td>昨日结余</td>
					<td>今日收入</td>
					<td>今日支出</td>
					<td>交款未确认</td>
					<td>应交金额</td>
					<%--<td style="display: none;">当前余额</td>--%>
				</tr>
				<tr>
					<td><input type="hidden" name="paymentAccountAd" readonly="" /><input type="text" name="paymentAccountName" readonly=""/></td>
					<td><input type="text" name="totalAmount" readonly="" /></td>
					<td><input type="text" name="inAmount" readonly="" /></td>
					<td><input type="text" name="outAmount" readonly="" /></td>
					<td><input type="text" name="accountMount" readonly="" /></td>
					<td><input type="text" name="yinAmount" readonly=""  class="yjje" /></td>
					<%--<td  style="display: none;"><input type="text" name="currentAmount" readonly=""  class="dqye" /></td>--%>
				</tr>
			</table>
			
			<div style="margin-top:20px;">
		 <form action="" class="form-inline">
				<div class="form-group col-sm-2">
				    <label for="retailCardNum">交款金额:</label>
				    <div class="input-group col-sm-8">
				      <input type="text" class="form-control jkje"  name="accountAmount"  placeholder="请输入交款金额">
				    </div>	
			    </div>
			    <div class="form-group col-sm-2">
				    <label for="retailCardNum">交款结余:</label>
				    <div class="input-group col-sm-8">
				      <input type="text" class="form-control jkjy" id="retailCardNum"  disabled="disabled">
				    </div>	
			    </div>
			    <div class="form-group col-sm-2">
				    <label for="retailCardNum">备注:</label>
				    <div class="input-group col-sm-8">
				      <input type="text" class="form-control" id="retailRemark">
				    </div>	
			    </div>
			    
			    <button type="button" class="btn btn-primary mr50 fr saveData B_YYJK_0001 none" style="width:100px;" id="search">保存</button>
			    <div style='clear:both;'></div>
		    </form>
		<!-------------------------------------表格结束----------------------------------------->
		</div>
			
		</div>
		
	</body>

	<script src="${basePath}/js/jquery-1.12.4.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/bootstrap.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/jquery.jqGrid.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/jquery.datetimepicker.full.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/grid.locale-cn.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/commonjs/xm.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/zxsaas_plus.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/cw/jquery.ztree.all-3.5.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
    <script src="${basePath}/js/commonjs/xr.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/businessManage/reconciliationBill.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<!-- 菜单权限验证 -->
	<script type="text/javascript" src="${basePath}/js/erp/authority/menuValidation.js?v=${version}"></script>
	<script type="text/javascript">
	var now=new Date().toLocaleDateString().replaceAll("/","-");
	$(function(){
    //交款日期（初始化默认当前日期）
	//   $("input[name=startDate]").val(now);
	//统计时间（初始化默认当天时间）
	  $("input[name=statisticsDate]").val(now+" "+new Date().getHours()+":"+new Date().getMinutes()+":"+new Date().getSeconds());    
    //交款金额(必填项)
	   if(!$("input[name=accountAmount]").val()){
		   $("input[name=accountAmount]").val("0");
	   }

	});
		
	</script>
</html>