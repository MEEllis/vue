<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %> 
<%
request.setAttribute("currDate",new Date());
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>同价调拨发货单打印</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	
	<!-- 引入文件 -->
	<jsp:include page="../../../Include/print.jsp"></jsp:include>
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
	  <style>
		  .table-bordered td, .table-bordered th{border-color:#000 !important;}
	  </style>
  </head>
  
  <body style="padding: 10px;">
	
	<nav class="navbar navbar-default" role="navigation" style="width: 190mm;">
	    <div class="container-fluid">
		    <div class="nav navbar-nav navbar-right" style="margin: 0px;">
		    	<button type="button" class="btn btn-default navbar-btn" onclick="print()" style="margin-left: 10px;">打印测试</button>
		    </div>
	    </div>
	</nav><!-- /E 工具栏结束  -->
	
	<!-- 打印区 -->
	<div id="billsDIV" style="width: 190mm;position: relative;">
	
		<!-- 单据状态图标 -->
		<c:if test="${order.billsStatus != 1}">
		<img src="${basePath}/images/status/${order.billsStatusImg}" width="80" height="80" style="position:absolute;top: 1mm;right: 15px;">	
		</c:if>
		
		<!-- 单据名称 -->
		<div style="text-align: center;font-size: 5mm;margin-bottom: 2mm;">
		  ${order.companyName}同价调拨发货单
		</div>
		
		<!-- 单据表头 -->
	    <div style="font-size: 3mm;">
			<div class="form-group" style="width: 63mm;float: left;margin-bottom: 1mm;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;">
			     单据编号:
			  </label>
			  <span style="padding-left: 3px;padding-right: 0px;">
			  	${order.billsCode}
			  </span>
			</div>
			<div class="form-group" style="width: 63mm;float: left;margin-bottom: 1mm;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;">
			     单据日期:
			  </label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
			  <fmt:formatDate value="${order.billsDate}" pattern="yyyy-MM-dd"/>
			  </span>
			</div>
			<div class="form-group" style="width: 63mm;float: left;margin-bottom: 1mm;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;">
			     调出部门:
			  </label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
			  ${order.moveOutSectionName}
			  </span>
			</div>
			<div class="form-group" style="width: 63mm;float: left;margin-bottom: 1mm;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;">
			      经办人:
			  </label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
			  ${order.managerName}
			  </span>
			</div>
			<div class="form-group" style="width: 63mm;float: left;margin-bottom: 1mm;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;">
			     
			  </label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
			  
			  </span>
			</div>
			<div class="form-group" style="width: 63mm;float: left;margin-bottom: 1mm;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;">
			    调入部门:
			  </label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
			  ${order.moveInSectionName}
			  </span>
			</div>
			<div class="form-group" style="width: 63mm;float: left;margin-bottom: 1mm;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;">
			     单据备注:</label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
			  ${order.remark}
			  </span>
			</div>	
	    </div>
		  
		<!-- 单据明细 -->
		<table class="table table-bordered"  style="word-break: break-all; word-wrap:break-word;" border-color="black">
			<thead >
				<tr style="padding: 0;">
					<th style="font-size: 3mm;font-weight: bold;width: 13mm;text-align: center; padding:0;">序号</th>
					<th style="font-size: 3mm;font-weight: bold;text-align: center; padding:0;">仓库名称</th>
					<th style="font-size: 3mm;font-weight: bold;text-align: center; padding:0;">商品名称</th>
					<th style="font-size: 3mm;font-weight: bold;text-align: center; padding:0;">数量</th>
					<c:if test="${checkCost == true}">
						<th style="font-size: 3mm;font-weight: bold;text-align: center; padding:0;">单价</th>
						<th style="font-size: 3mm;font-weight: bold;text-align: center; padding:0;">总价</th>
					</c:if>
					<th style="font-size: 3mm;font-weight: bold;text-align: center; padding:0;">商品备注</th>
				</tr>
			</thead>
			<tbody>
				<c:set var="sum" value="0"></c:set>
				<c:set var="amountSum" value="0"></c:set>
				<c:forEach items="${order.detailList}" var="detail" varStatus="status">
					<c:set var="sum" value="${sum + detail.goodsNumber}"></c:set>
					<c:set var="amountSum" value="${amountSum + detail.amount}"></c:set>
					<tr style="padding: 0;">
						<td style="font-size: 3mm;text-align:center; padding:0;">${status.count}</td>
						<td style="font-size: 3mm;text-align:left; padding:0;">${order.moveOutSectionName}-${detail.storageName}</td>
						<td style="font-size: 3mm;text-align:center; padding:0;">${detail.goodsName}</td>
						<td style="font-size: 3mm;text-align:center; padding:0;">${detail.goodsNumber}</td>
						<c:if test="${checkCost == true}">
							<td style="font-size: 3mm;text-align:center; padding:0;"><fmt:formatNumber type="number" maxFractionDigits="2" value="${detail.price}"/></td>
							<td style="font-size: 3mm;text-align:center; padding:0;"><fmt:formatNumber type="number" maxFractionDigits="2" value="${detail.amount}"/></td>
						</c:if>
						<td style="font-size: 3mm;text-align:left; padding:0;">${detail.remark}</td>
					</tr>
					<c:if test="${printType == 'imeiDetail'}">
					<!-- 串号列表不为空，则输出 -->
					<c:if test="${detail.imeis != null && detail.imeis != ''}">
					<tr style="padding: 0;">
						<c:if test="${checkCost == true}">
						<td colspan="7" style="font-size: 3mm;text-align:left;height: auto; padding:0;">
							</c:if>
							<c:if test="${checkCost == false}">
						<td colspan="5" style="font-size: 3mm;text-align:left;height: auto; padding:0;">
							</c:if>
							${detail.imeis}
						</td>
					</tr>
					</c:if>
					</c:if>
				</c:forEach>		
				<tr style="padding: 0;">
					<td colspan="3" align="center" style="font-size: 4mm; padding:0;">合计</td>
					<td style="font-size: 3mm; padding:0;" align="center">${sum}</td>
					<c:if test="${checkCost == true}">
						<td style="padding: 0;"></td>
						<td style="padding: 0;"><fmt:formatNumber type="number" maxFractionDigits="2" value="${amountSum}"/></td>
					</c:if>
					<td style="padding: 0;"></td>
				</tr>
			</tbody>
		</table>
		
		<!-- 单据表尾 -->
	    <div id="formBottom" style="font-size: 3mm;">
			<div class="form-group" style="width: 46mm;float: left;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 25mm;">
			     制单人:
			  </label>
			  <span style="padding-left: 3px;padding-right: 0px;width: 20mm;">
			  ${order.createByName}
			  </span>
			</div>
			<div class="form-group" style="width: 46mm;float: left;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 25mm;">
			     修改人:
			  </label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;width: 20mm;">
			  ${order.updateByName}
			  </span>
			</div>
			<div class="form-group" style="width: 46mm;float: left;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 25mm;">
			     发货人:
			  </label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;width: 20mm;">
			  ${order.postByName}
			  </span>
			</div>
			<div class="form-group" style="width: 46mm;float: left;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 25mm;">
			     作废人:
			  </label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;width: 20mm;">
			  ${order.cancelByName}
			  </span>
			</div>
			<div class="form-group" style="width: 46mm;float: left;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 25mm;">
			     发货人(签字)：
			  </label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;width: 20mm;">
			  __________
			  </span>
			</div>
			<div class="form-group" style="width: 46mm;float: left;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 25mm;">
			     物流(签字）:
			  </label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;width: 20mm;">
			  __________
			  </span>
			</div>
			<div class="form-group" style="width: 46mm;float: left;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 25mm;">
			     收货人(签字)：
			  </label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;width: 20mm;">
			  __________
			  </span>
			</div>
			<div class="form-group" style="width: 93mm;float: left;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;">打印时间:</label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;"><fmt:formatDate value="${currDate}" pattern="yyyy-MM-dd HH:mm:ss"/></span>
			</div>
	    </div>
		
	</div>
	
  </body>
</html>
