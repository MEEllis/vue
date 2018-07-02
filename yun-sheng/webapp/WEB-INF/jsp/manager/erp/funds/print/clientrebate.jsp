<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %> 
<%@ taglib prefix="statistics" uri="/WEB-INF/ListStatistics.tld" %> 
<%
request.setAttribute("currDate",new Date());
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>客户返利单打印-DEMO</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	
	<!-- 引入文件 -->
	<jsp:include page="../../../Include/print.jsp"></jsp:include>
	<style type="text/css" media="print">
	th{
		font-size: 4mm;
	}
	td{
	    font-size: 3mm;
	}
	tr{
		font-size: 3mm;
	}
	</style>
	<script type="text/javascript">
	function print(){
		$("#billsDIV").jqprint({
		     debug: false, //如果是true则可以显示iframe查看效果（iframe默认高和宽都很小，可以再源码中调大），默认是false
		     importCSS: true, //true表示引进原来的页面的css，默认是true。（如果是true，先会找$("link[media=print]")，若没有会去找$("link")中的css文件）
		     printContainer: true, //表示如果原来选择的对象必须被纳入打印（注意：设置为false可能会打破你的CSS规则）。
		     operaSupport: true//表示如果插件也必须支持歌opera浏览器，在这种情况下，它提供了建立一个临时的打印选项卡。默认是true
		});
	}
	</script>
  </head>
  
  <body style="padding: 10px;">
	
	<nav class="navbar navbar-default" role="navigation" style="width: 188mm;">
	    <div class="container-fluid">
		    <div class="nav navbar-nav navbar-right" style="margin: 0px;">
		    	<button type="button" class="btn btn-default navbar-btn" onclick="print()" style="margin-left: 10px;">打印测试</button>
		    </div>
	    </div>
	</nav><!-- /E 工具栏结束  -->
	
	<!-- 打印区 -->
	<div id="billsDIV" style="width: 188mm;position: relative;">

	<!-- 单据状态图标 -->
	<c:if test="${isDraftOp == false}">
	<img src="${basePath }/images/status/${bills.billsStatus}" width="80" height="80" style="position:absolute;top: 1mm;right: 15px;">	
	</c:if>
	
	<!-- 单据名称 -->
	<div style="text-align: center;font-size: 5mm;margin-bottom: 2mm;">
	  ${bills.companyName }客户返利单
	</div>
	
	<!-- 单据表头 -->
    <div style="font-size: 3mm;">
		<div class="form-group" style="width: 62mm;float: left;margin-bottom: 1mm;">
		  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;position: relative;float: left;">
		     单据编号:
		  </label>
		  <span style="padding-left: 3px;padding-right: 0px;">
		  ${bills.billsCode }
		  </span>
		</div>
		<div class="form-group" style="width: 62mm;float: left;margin-bottom: 1mm;">
		  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;position: relative;float: left;">
		     单据日期:
		  </label>
		  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
		  <fmt:formatDate value="${bills.billsDate }" pattern="yyyy-MM-dd"/>
		  </span>
		</div>
		<div class="form-group" style="width: 62mm;float: left;margin-bottom: 1mm;">
		  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;position: relative;float: left;">
		     部门名称:
		  </label>
		  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
		  ${bills.sectionName }
		  </span>
		</div>
		    <div style="clear: left;"></div>
		<div class="form-group" style="width: 62mm;float: left;margin-bottom: 1mm;">
		  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;position: relative;float: left;">
		     应收余额:
		  </label>
		  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
		  <fmt:formatNumber value="${wlye.yingShou }" pattern="#,##0.00"/>
		  </span>
		</div>
		<div class="form-group" style="width: 62mm;float: left;margin-bottom: 1mm;">
		  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;position: relative;float: left;">
		     预收余额:
		  </label>
		  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
		  <fmt:formatNumber value="${wlye.yuShou }" pattern="#,##0.00"/>
		  </span>
		</div>
		<div class="form-group" style="width: 62mm;float: left;margin-bottom: 1mm;">
		  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;position: relative;float: left;">
		      经办人:
		  </label>
		  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
		  ${bills.managersName }
		  </span>
		</div>
		<div class="form-group" style="width: 62mm;float: left;margin-bottom: 1mm;">
		  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;position: relative;float: left;">
		    往来单位:
		  </label>
		  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
		  ${bills.contactsunitName }
		  </span>
		</div>
		<div class="form-group" style="width: 62mm;float: left;margin-bottom: 1mm;">
		  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;position: relative;float: left;">
		    返利类型:
		  </label>
		  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
		  <c:if test="${bills.rebateType!= null && bills.rebateType == 1}">保修卡返利</c:if>
		  <c:if test="${bills.rebateType!= null && bills.rebateType == 2}">达量返利</c:if>
		  <c:if test="${bills.rebateType!= null && bills.rebateType == 3}">提货返利</c:if>
		  <c:if test="${bills.rebateType!= null && bills.rebateType == 4}">固返</c:if>
		  </span>
		</div>
		<div class="form-group" style="width: 62mm;float: left;margin-bottom: 1mm;">
		  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;position: relative;float: left;">
		     单据备注:</label>
		  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
		  ${bills.remark }
		  </span>
		</div>	
    </div>
	  
	<!-- 单据明细 -->
	<c:if test="${bills.rebateType!= null && (bills.rebateType eq '1' || bills.rebateType eq '4')}">
	<table class="table table-bordered">
		<thead >
			<tr>
				<th style="font-size: 3mm;font-weight: bold;width: 13mm;text-align: center;">序号</th>
				<th style="font-size: 3mm;font-weight: bold;text-align: center;">仓库名称</th>
				<th style="font-size: 3mm;font-weight: bold;text-align: center;">商品名称</th>
				<th style="font-size: 3mm;font-weight: bold;text-align: center;">数量</th>
				<th style="font-size: 3mm;font-weight: bold;text-align: center;">单台返利</th>
				<th style="font-size: 3mm;font-weight: bold;text-align: center;">返利总额</th>
				<th style="font-size: 3mm;font-weight: bold;text-align: center;">备注</th>
			</tr>
		</thead>
		<tbody>
			<c:forEach items="${bills.cashRebateNumList}" var="billsDetail" varStatus="status">
				<tr>
					<td style="font-size: 3mm;text-align:center;">${status.count}</td>
					<td style="font-size: 3mm;text-align:left;">${billsDetail.storageName}</td>
					<td style="font-size: 3mm;text-align:left;">${billsDetail.goodsName}</td>
					<td style="font-size: 3mm;text-align:center;">${billsDetail.rebateNum}</td>
					<td style="font-size: 3mm;text-align:right;"><fmt:formatNumber value="${billsDetail.rebateAmount/billsDetail.rebateNum}" pattern="#,##0.00"/></td>
					<td style="font-size: 3mm;text-align:right;"><fmt:formatNumber value="${billsDetail.rebateAmount}" pattern="#,##0.00"/></td>
					<td style="font-size: 3mm;text-align:left;">${billsDetail.remark}</td>
				</tr>
			</c:forEach>		
			<tr>
				<td colspan="3" align="center" style="font-size: 4mm;">合计</td>
				<td style="font-size: 3mm;height: auto;text-align: center;">
					${statistics:sumByField(bills.cashRebateNumList, 'rebateNum')}
				</td>
				<td align="center" style="font-size: 4mm;"></td>
				<td colspan="2" style="font-size: 3mm;text-align: center;"><fmt:formatNumber value="${statistics:sumByField(bills.cashRebateNumList, 'rebateAmount')}" pattern="#,##0.00"/></td>
			</tr>
		</tbody>
	</table>
	</c:if>
	
	<c:if test="${bills.rebateType!= null && (bills.rebateType eq '2' || bills.rebateType eq '3')}">
	<table class="table table-bordered">
		<thead >
			<tr>
				<th style="font-size: 3mm;font-weight: bold;width: 13mm;text-align: center;">序号</th>
				<th style="font-size: 3mm;font-weight: bold;text-align: center;">仓库名称</th>
				<th style="font-size: 3mm;font-weight: bold;text-align: center;">商品名称</th>
				<th style="font-size: 3mm;font-weight: bold;text-align: center;">返利总额</th>
				<th style="font-size: 3mm;font-weight: bold;text-align: center;">备注</th>
			</tr>
		</thead>
		<tbody>
			<c:forEach items="${bills.cashRebateNumList}" var="billsDetail" varStatus="status">
				<tr>
					<td style="font-size: 3mm;text-align:center;">${status.count}</td>
					<td style="font-size: 3mm;text-align:left;">${billsDetail.storageName}</td>
					<td style="font-size: 3mm;text-align:left;">${billsDetail.goodsName}</td>
					<td style="font-size: 3mm;text-align:right;"><fmt:formatNumber value="${billsDetail.rebateAmount}" pattern="#,##0.00"/></td>
					<td style="font-size: 3mm;text-align:left;">${billsDetail.remark}</td>
				</tr>
			</c:forEach>		
			<tr>
				<td colspan="3" align="center" style="font-size: 4mm;">合计</td>
				<td colspan="2" style="font-size: 3mm;text-align: center;"><fmt:formatNumber value="${statistics:sumByField(bills.cashRebateNumList, 'rebateAmount')}" pattern="#,##0.00"/></td>
			</tr>
		</tbody>
	</table>
	</c:if>
	
	<!-- 单据表尾 -->
    <div id="formBottom" style="font-size: 3mm;">
		<div class="form-group" style="width: 40mm;float: left;">
		  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 12mm;">
		     制单人:
		  </label>
		  <span style="padding-left: 3px;padding-right: 0px;width: 20mm;">
		  ${bills.createByName }
		  </span>
		</div>
		<div class="form-group" style="width: 40mm;float: left;">
		  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 12mm;">
		     修改人:
		  </label>
		  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;width: 20mm;">
		  ${bills.updateByName }
		  </span>
		</div>
		<div class="form-group" style="width: 40mm;float: left;">
		  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 12mm;">
		    过账人:
		  </label>
		  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;width: 20mm;">
		  ${bills.postByName }
		  </span>
		</div>
		<div class="form-group" style="width: 40mm;float: left;">
		  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 19mm;">
		     红冲人:
		  </label>
		  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;width: 20mm;">
		  ${bills.invalidByName }
		  </span>
		</div>
		<div class="form-group" style="width: 93mm;float: left;">
		  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;">打印时间:</label>
		  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;"><fmt:formatDate value="${currDate }" pattern="yyyy-MM-dd HH:mm:ss"/></span>
		</div>
    </div>
	
	</div>

  </body>
</html>
