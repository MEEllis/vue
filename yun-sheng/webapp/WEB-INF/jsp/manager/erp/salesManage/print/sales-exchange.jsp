<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %> 
<%@ taglib prefix="statistics" uri="/WEB-INF/ListStatistics.tld" %> 
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
request.setAttribute("currDate",new Date());
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
     
    
    <title>销售换货单打印-DEMO</title>
    
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
	
	<nav class="navbar navbar-default" role="navigation" style="width: 188mm;">
	    <div class="container-fluid">
		    <div class="nav navbar-nav navbar-right" style="margin: 0px;">
		    	<button type="button" class="btn btn-default navbar-btn" onclick="print()" style="margin-left: 10px;">打印测试</button>
		    </div>
	    </div>
	</nav><!-- /E 工具栏结束  -->
	
	<!-- 打印区  - 显示串号 -->
	<c:if test="${tempKind == 'showimei'}">
		<!-- 打印区 -->
		<div id="billsDIV" style="width: 188mm;position: relative;">
	
			<!-- 单据状态图标 1.未审核 2.已审核  5.强制完成  6.已过账,7已红冲 -->
		<c:if test="${bills.billsStatus == 1}">
		<img src="<%=basePath%>manager/images/status/statusNotAudit.png" width="80" height="80" style="position:absolute;top: 1mm;right: 15px;">	
		</c:if>
		<c:if test="${bills.billsStatus == 2}">
		<img src="<%=basePath%>manager/images/status/statusAudit.png" width="80" height="80" style="position:absolute;top: 1mm;right: 15px;">	
		</c:if>
		<c:if test="${bills.billsStatus == 5}">
		<img src="<%=basePath%>manager/images/status/statusForce.png" width="80" height="80" style="position:absolute;top: 1mm;right: 15px;">	
		</c:if>
		<c:if test="${bills.billsStatus == 6}">
		<img src="<%=basePath%>manager/images/status/statusPass.png" width="80" height="80" style="position:absolute;top: 1mm;right: 15px;">	
		</c:if>
		<c:if test="${bills.billsStatus == 7}">
		<img src="<%=basePath%>manager/images/status/statusRed.png" width="80" height="80" style="position:absolute;top: 1mm;right: 15px;">	
	    </c:if>
		
		<!-- 单据名称 -->
		<div style="text-align: center;font-size: 5mm;margin-bottom: 2mm;">
		  ${bills.companyName }批发换货单
		</div>
		
		<!-- 单据表头 -->
	   <!-- 单据表头 -->
	    <div style="font-size: 3mm;">
			<div class="form-group" style="width: 62mm;float: left;margin-bottom: 1mm;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;">
			     单据编号:
			  </label>
			  <span style="padding-left: 3px;padding-right: 0px;">
			  ${bills.billsCode }
			  </span>
			</div>
			<div class="form-group" style="width: 62mm;float: left;margin-bottom: 1mm;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;">
			     单据日期:
			  </label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
			  <fmt:formatDate value="${bills.billsDate }" pattern="yyyy-MM-dd"/>
			  </span>
			</div>
			<div class="form-group" style="width: 62mm;float: left;margin-bottom: 1mm;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;">
			     部门名称:
			  </label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
			  ${bills.sectionName }
			  </span>
			</div>
			<div style="clear: left;"></div>
			<div class="form-group" style="width: 62mm;float: left;margin-bottom: 1mm; ">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;">
			      应收余额:
			  </label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
			  <fmt:formatNumber value="${contactUnitAmountVo.shouldReceiptBalance }" pattern="#,##0.00"/>
			  </span>
			</div>
			<div class="form-group" style="width: 62mm;float: left;margin-bottom: 1mm;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;">
			      预收余额:
			  </label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
			   <fmt:formatNumber value="${contactUnitAmountVo.preReceiptBalance}" pattern="#,##0.00"/>
			  </span>
			</div>
			<div class="form-group" style="width: 62mm;float: left;margin-bottom: 1mm;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;">
			      经办人:
			  </label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
			  ${bills.managerUname}
			  </span>
			</div>
			<div class="form-group" style="width: 62mm;float: left;margin-bottom: 1mm;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;">
			    往来单位:
			  </label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
			  ${bills.contactUnitName }
			  </span>
			</div>
			<div class="form-group" style="width: 62mm;float: left;margin-bottom: 1mm;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;">
			     单据备注:</label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
			  ${bills.remark }
			  </span>
			</div>	
	    </div>
		 <div style="clear: left"></div>
		<!-- 单据明细 -->
		<div style="text-align: center;width: 100%;font-size:4mm;margin-bottom: 2mm;">换入信息</div>
		<!-- 单据明细 -->
		<table class="table-bordered" style="font-size: 4mm;width: 188mm;text-align: center;margin-bottom: 5px;" border-color="black">
			<thead >
				<tr style="padding: 0;">
					<th style="text-align: center; padding:0;">序号</th>
					<th style="text-align: center; padding:0;">仓库名称</th>
					<th style="text-align: center; padding:0;">商品名称</th>
					<th style="text-align: center; padding:0;">数量</th>
					<th style="text-align: center; padding:0;">单价</th>
					<th style="text-align: center; padding:0;">金额</th>
					<th style="display: none; padding:0;">折后金额</th>
					<th style="text-align: center; padding:0;">商品备注</th>
				</tr>
			</thead>
			<tbody style="font-size: 3mm;">
				<c:forEach items="${bills.salesInstrorageNumList}" var="billsDetail" varStatus="status">
					<tr style="padding: 0;">
						<td style="padding: 0;">${status.count}</td>
						<td style="padding: 0;">${bills.sectionName}-${billsDetail.storageName}</td>
						<td style="padding: 0;">${billsDetail.goodsName}</td>
						<td style="padding: 0;">${billsDetail.goodsNumber}</td>
						<td style="padding: 0;"><fmt:formatNumber value="${billsDetail.price}" pattern="#,##0.00#"/></td>
						<td style="padding: 0;"><fmt:formatNumber value="${billsDetail.amount}" pattern="#,##0.00#"/></td>
						<td style="display: none; padding: 0;"><fmt:formatNumber value="${billsDetail.discountedAmount}" pattern="#,##0.00#"/></td>
						<td style="padding: 0;">${billsDetail.remark}</td>
					</tr>
					
					<!-- 串号列表不为空，则输出 -->
					<c:if test="${(billsDetail.salesInstrorageImDraftList)!= null && fn:length(billsDetail.salesInstrorageImDraftList) > 0}">
					<tr style="padding: 0;">
						<td colspan="8" style="font-size: 3mm;text-align:left;height: auto;padding: 0;">
							<c:forEach items="${billsDetail.salesInstrorageImDraftList}" var="detailImei" varStatus="index">
								<c:choose>
									<c:when test="${index.count==1}">
										${detailImei.imei}
									</c:when>
									<c:otherwise>
										,${detailImei.imei}
									</c:otherwise>
								</c:choose>
							</c:forEach>
						</td>
					</tr>
					</c:if>
				</c:forEach>	
				
				 <tr style="font-size: 4mm;padding: 0;">
					<td colspan="3" align="center" style="padding: 0;">合计</td>
					<td style="padding: 0;">${statistics:sumByField(bills.salesInstrorageNumList, 'goodsNumber')}</td>
					<td style="padding: 0;"></td>
					<td style="padding: 0;"><fmt:formatNumber value="${statistics:sumByField(bills.salesInstrorageNumList, 'amount')}" pattern="#,##0.00#"/></td>
					 <td colspan="2" style="display: none;padding: 0;text-align: right;"><fmt:formatNumber value="${statistics:sumByField(bills.salesInstrorageNumList, 'discountedAmount')}" pattern="#,##0.00#"/></td>
					 <%--<td style="padding: 0;"></td>--%>
				</tr>		
			</tbody>
		</table>
		
		<!-- 单据明细 -->
		<div style="text-align: center;width: 100%;font-size:4mm;margin-bottom: 2mm;">换出信息</div>
		<table class="table-bordered" style="width: 188mm;font-size: 4mm;text-align: center;margin-bottom: 5px;" border-color="black">
			<thead >
				<tr style="padding: 0;">
					<th style="text-align: center; padding: 0;">序号</th>
					<th style="text-align: center; padding: 0;">仓库名称</th>
					<th style="text-align: center; padding: 0;">商品名称</th>
					<th style="text-align: center; padding: 0;">数量</th>
					<th style="text-align: center; padding: 0;">单价</th>
					<th style="text-align: center; padding: 0;">金额</th>
					<th  style="display: none; padding: 0;">折后金额</th>
					<th style="text-align: center; padding: 0;">商品备注</th>
				</tr>
			</thead>
			<tbody style="font-size: 3mm;">
				<c:forEach items="${bills.outStorageNumList}" var="billsDetail" varStatus="status">
					<tr style="padding: 0;">
						<td style="padding: 0;">${status.count}</td>
						<td style="padding: 0;">${bills.sectionName}-${billsDetail.storageName}</td>
						<td style="padding: 0;">${billsDetail.goodsName}</td>
						<td style="padding: 0;">${billsDetail.goodsNumber}</td>
						<td style="padding: 0;"><fmt:formatNumber value="${billsDetail.price}" pattern="#,##0.00#"/></td>
						<td style="padding: 0;"><fmt:formatNumber value="${billsDetail.amount}" pattern="#,##0.00#"/></td>
						<td  style="display: none; padding: 0;"><fmt:formatNumber value="${billsDetail.discountedAmount}" pattern="#,##0.00#"/></td>
						<td style="padding: 0;">${billsDetail.remark}</td>
					</tr>
					
					<!-- 串号列表不为空，则输出 -->
					<c:if test="${(billsDetail.salesOutstrorageImDraftList)!= null && fn:length(billsDetail.salesOutstrorageImDraftList) > 0}">
					<tr style="padding: 0;">
						<td colspan="8" style="font-size: 3mm;text-align:left;height: auto;padding: 0;">
							<c:forEach items="${billsDetail.salesOutstrorageImDraftList}" var="detailImei" varStatus="index">
								<c:choose>
									<c:when test="${index.count==1}">
										${detailImei.imei}
									</c:when>
									<c:otherwise>
										,${detailImei.imei}
									</c:otherwise>
								</c:choose>
							</c:forEach>
						</td>
					</tr>
					</c:if>
				</c:forEach>	
				
				 <tr style="font-size: 4mm; padding:0;">
					<td colspan="3" align="center" style="font-size: 4mm;">合计</td>
					<td style="font-size: 3mm;text-align: center; padding:0;">${statistics:sumByField(bills.outStorageNumList, 'goodsNumber')}</td>
					<td style="font-size: 3mm; padding:0;"></td>
					<td style="font-size: 3mm;text-align: right; padding:0;"><fmt:formatNumber value="${statistics:sumByField(bills.outStorageNumList, 'amount')}" pattern="#,##0.00#"/></td>
					<td colspan="2" style="display: none; padding:0; text-align: right;"><fmt:formatNumber value="${statistics:sumByField(bills.outStorageNumList, 'discountedAmount')}" pattern="#,##0.00#"/></td>
					<%--<td style="padding: 0;"></td>--%>
				</tr>		
			</tbody>
		</table>
		
		<!-- 收付款明细 -->
		<c:if test="${!bills.salesBillsAccount.isEmpty()&& bills.prepaymentAmount!=null}">
		<table class="table-bordered" style="width: 188mm;" border-color="black">
			<thead>
				<tr style="padding: 0;">
				<th style="font-size: 3mm;font-weight: bold;width: 13mm;text-align: center; padding: 0;">序号</th>
					<c:choose>
						<c:when test="${statistics:sumByField(bills.outStorageNumList, 'discountedAmount')>statistics:sumByField(bills.salesInstrorageNumList, 'discountedAmount')}">
							<th style="font-size: 3mm;font-weight: bold;text-align: center; padding: 0;">收款类别</th>
							<th style="font-size: 3mm;font-weight: bold;text-align: center; padding: 0;">账户名称</th>
							<th style="font-size: 3mm;font-weight: bold;text-align: center; padding: 0;">收款金额</th>
						</c:when>
						<c:otherwise>
							<th style="font-size: 3mm;font-weight: bold;text-align: center; padding: 0;">付款类别</th>
							<th style="font-size: 3mm;font-weight: bold;text-align: center; padding: 0;">账户名称</th>
							<th style="font-size: 3mm;font-weight: bold;text-align: center; padding: 0;">付款金额</th>
						</c:otherwise>
					</c:choose>
				</tr>
			</thead>
			<tbody>
			    <% int indexx = 1; %>
				<c:forEach items="${bills.salesBillsAccount}" var="payreceiptDetail" varStatus="status">
					<c:if test="${payreceiptDetail.payreceiptAmout != 0 && payreceiptDetail.payreceiptAmout != null}">
					<tr style="padding: 0;">
					<td style="font-size: 3mm;text-align:center; padding: 0;"><%=indexx++ %></td>
					<td style="font-size: 3mm;text-align:left; padding: 0;">${payreceiptDetail.accountTypeName}</td>
					<td style="font-size: 3mm;text-align:left; padding: 0;">${payreceiptDetail.accountName}</td>
					<td style="font-size: 3mm;text-align:right; padding: 0;"><fmt:formatNumber value="${payreceiptDetail.payreceiptAmout}" pattern="#,##0.00"/></td>
					</tr>
					</c:if>
				</c:forEach>		
				<tr style="padding: 0;">
					<td colspan="3" align="center" style="font-size: 4mm; padding: 0;">合计</td>
				    <td style="font-size: 4mm;text-align:right; padding: 0;">
				      <fmt:formatNumber value="${statistics:sumByField(bills.salesBillsAccount, 'payreceiptAmout')}" pattern="#,##0.00"/>
				    </td>
				</tr>
			</tbody>
		</table>
		</c:if>
		<!-- 单据金额 -->
	    <div id="formBottom" style="font-size: 3mm;">
			<div class="form-group" style="width: 40mm;float: left;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 15mm;">
			  <c:if test="${amountTotalFlag==true}"> 
			   <c:if test="${statistics:sumByField2(bills.salesInstrorageNumList, 'taxAmount','Double')-statistics:sumByField2(bills.outStorageNumList, 'taxAmount','Double')>=0}">
			           应付金额:
			  </c:if>
			  <c:if test="${statistics:sumByField2(bills.salesInstrorageNumList, 'taxAmount','Double')-statistics:sumByField2(bills.outStorageNumList, 'taxAmount','Double')<0}">
			           应收金额:
			  </c:if>
			 </c:if>     
			     
			  <c:if test="${amountTotalFlag==false}"> 
			   <c:if test="${statistics:sumByField2(bills.salesInstrorageNumList, 'taxAmount','Double')-statistics:sumByField2(bills.outStorageNumList, 'taxAmount','Double')>=0}">
			          应收金额:
			  </c:if>
			  <c:if test="${statistics:sumByField2(bills.salesInstrorageNumList, 'taxAmount','Double')-statistics:sumByField2(bills.outStorageNumList, 'taxAmount','Double')<0}">
			          应付金额:
			  </c:if>
			 </c:if>        
			  </label>
			  
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;width: 20mm;">
			 <c:if test="${amountTotalFlag==true}"> 
			  <fmt:formatNumber 
			  value="${statistics:sumByField2(bills.salesInstrorageNumList, 'taxAmount','Double')-statistics:sumByField2(bills.outStorageNumList, 'taxAmount','Double')>0 ? statistics:sumByField2(bills.salesInstrorageNumList, 'taxAmount','Double')-statistics:sumByField2(bills.outStorageNumList, 'taxAmount','Double'):-(statistics:sumByField2(bills.salesInstrorageNumList, 'taxAmount','Double')-statistics:sumByField2(bills.outStorageNumList, 'taxAmount','Double'))}" pattern="#,##0.00"/>
			  </c:if>
			   <c:if test="${amountTotalFlag==false}"> 
			 <fmt:formatNumber 
			  value="${statistics:sumByField2(bills.salesInstrorageNumList, 'taxAmount','Double')-statistics:sumByField2(bills.outStorageNumList, 'taxAmount','Double')>0 ? 
			  statistics:sumByField2(bills.salesInstrorageNumList, 'taxAmount','Double')*(-1)+statistics:sumByField2(bills.outStorageNumList, 'taxAmount','Double'):
			  statistics:sumByField2(bills.salesInstrorageNumList, 'taxAmount','Double')-statistics:sumByField2(bills.outStorageNumList, 'taxAmount','Double')}" pattern="#,##0.00"/>
			  </c:if>
			  </span>
			  
			</div>
			<div class="form-group" style="width: 40mm;float: left;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 15mm;">
			  <c:if test="${amountTotalFlag==true}"> 
			   <c:if test="${statistics:sumByField2(bills.salesInstrorageNumList, 'taxAmount','Double')-statistics:sumByField2(bills.outStorageNumList, 'taxAmount','Double')>=0}">
			           未付金额:
			  </c:if>
			  <c:if test="${statistics:sumByField2(bills.salesInstrorageNumList, 'taxAmount','Double')-statistics:sumByField2(bills.outStorageNumList, 'taxAmount','Double')<0}">
			           未收金额:
			  </c:if>
			  </c:if>
			  
			     <c:if test="${amountTotalFlag==false}"> 
			  <c:if test="${statistics:sumByField2(bills.salesInstrorageNumList, 'taxAmount','Double')-statistics:sumByField2(bills.outStorageNumList, 'taxAmount','Double')>=0}">
			             未收金额:
			  </c:if>
			  <c:if test="${statistics:sumByField2(bills.salesInstrorageNumList, 'taxAmount','Double')-statistics:sumByField2(bills.outStorageNumList, 'taxAmount','Double')<0}">
			              未付金额:
			  </c:if>
			  </c:if>
			  </label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;width: 20mm;">
			  
			    <c:if test="${amountTotalFlag==true}"> 
			  <fmt:formatNumber 
			  value="${statistics:sumByField2(bills.salesInstrorageNumList, 'taxAmount','Double')-statistics:sumByField2(bills.outStorageNumList, 'taxAmount','Double')>0 ? 
			  statistics:sumByField2(bills.salesInstrorageNumList, 'taxAmount','Double')-statistics:sumByField2(bills.outStorageNumList, 'taxAmount','Double')-statistics:sumByField2(bills.salesBillsAccount, 'payreceiptAmout','Double'):
			  -(statistics:sumByField2(bills.salesInstrorageNumList, 'taxAmount','Double')-statistics:sumByField2(bills.outStorageNumList, 'taxAmount','Double'))-statistics:sumByField2(bills.salesBillsAccount, 'payreceiptAmout','Double')}" pattern="#,##0.00"/>
			  </c:if>
			    <c:if test="${amountTotalFlag==false}"> 
			  <fmt:formatNumber 
			  value="${statistics:sumByField2(bills.salesInstrorageNumList, 'taxAmount','Double')-statistics:sumByField2(bills.outStorageNumList, 'taxAmount','Double')>0 ? 
			  statistics:sumByField2(bills.salesInstrorageNumList, 'taxAmount','Double')*(-1)+statistics:sumByField2(bills.outStorageNumList, 'taxAmount','Double')-statistics:sumByField2(bills.salesBillsAccount, 'payreceiptAmout','Double'):
			  statistics:sumByField2(bills.salesInstrorageNumList, 'taxAmount','Double')-statistics:sumByField2(bills.outStorageNumList, 'taxAmount','Double')-statistics:sumByField2(bills.salesBillsAccount, 'payreceiptAmout','Double')}" pattern="#,##0.00"/>
			  </c:if>
			 
			  </span>
			</div>
			<div class="form-group" style="width: 40mm;float: left;">
				<label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 15mm;">
					客户签字:
				</label>
				<span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;width: 20mm;">
					__________
			  </span>
			</div>
	    </div><div style="clear: left;"></div>
			<!-- 打印说明 -->
			<div style="font-size: 3mm;overflow: hidden;padding: 3px 0;margin-bottom: 5px;">
					${reminder}
			</div>
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
			  ${bills.lastupdateByName }
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
	</c:if>
	
	<!-- 打印区  - 不显示串号 -->
	<c:if test="${tempKind == 'noimei'}">
		<!-- 打印区 -->
		<div id="billsDIV" style="width: 188mm;position: relative;">
	
			<!-- 单据状态图标 1.未审核 2.已审核  5.强制完成  6.已过账,7已红冲 -->
		<c:if test="${bills.billsStatus == 1}">
		<img src="<%=basePath%>manager/images/status/statusNotAudit.png" width="80" height="80" style="position:absolute;top: 1mm;right: 15px;">	
		</c:if>
		<c:if test="${bills.billsStatus == 2}">
		<img src="<%=basePath%>manager/images/status/statusAudit.png" width="80" height="80" style="position:absolute;top: 1mm;right: 15px;">	
		</c:if>
		<c:if test="${bills.billsStatus == 5}">
		<img src="<%=basePath%>manager/images/status/statusForce.png" width="80" height="80" style="position:absolute;top: 1mm;right: 15px;">	
		</c:if>
		<c:if test="${bills.billsStatus == 6}">
		<img src="<%=basePath%>manager/images/status/statusPass.png" width="80" height="80" style="position:absolute;top: 1mm;right: 15px;">	
		</c:if>
		<c:if test="${bills.billsStatus == 7}">
		<img src="<%=basePath%>manager/images/status/statusRed.png" width="80" height="80" style="position:absolute;top: 1mm;right: 15px;">	
	    </c:if>
		
		<!-- 单据名称 -->
		<div style="text-align: center;font-size: 5mm;margin-bottom: 2mm;">
		  ${bills.companyName }批发换货单
		</div>
		
		<!-- 单据表头 -->
	   <!-- 单据表头 -->
	    <div style="font-size: 3mm;">
			<div class="form-group" style="width: 62mm;float: left;margin-bottom: 1mm;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;">
			     单据编号:
			  </label>
			  <span style="padding-left: 3px;padding-right: 0px;">
			  ${bills.billsCode }
			  </span>
			</div>
			<div class="form-group" style="width: 62mm;float: left;margin-bottom: 1mm;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;">
			     单据日期:
			  </label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
			  <fmt:formatDate value="${bills.billsDate }" pattern="yyyy-MM-dd"/>
			  </span>
			</div>
			<div class="form-group" style="width: 62mm;float: left;margin-bottom: 1mm;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;">
			     部门名称:
			  </label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
			  ${bills.sectionName }
			  </span>
			</div>
			<div style="clear: left;"></div>
			<div class="form-group" style="width: 62mm;float: left;margin-bottom: 1mm; ">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;">
			      应收余额:
			  </label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
			  <fmt:formatNumber value="${contactUnitAmountVo.shouldReceiptBalance}" pattern="#,##0.00"/>
			  </span>
			</div>
			<div class="form-group" style="width: 62mm;float: left;margin-bottom: 1mm;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;">
			      预收余额:
			  </label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
			  <fmt:formatNumber value="${contactUnitAmountVo.preReceiptBalance}" pattern="#,##0.00"/>
			  </span>
			</div>
			<div class="form-group" style="width: 62mm;float: left;margin-bottom: 1mm;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;">
			      经办人:
			  </label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
			  ${bills.managerUname}
			  </span>
			</div>
			<div class="form-group" style="width: 62mm;float: left;margin-bottom: 1mm;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;">
			    往来单位:
			  </label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
			  ${bills.contactUnitName }
			  </span>
			</div>
			<div class="form-group" style="width: 62mm;float: left;margin-bottom: 1mm;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;">
			     单据备注:</label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
			  ${bills.remark }
			  </span>
			</div>	
	    </div>
		 <div style="clear: left"></div>
		<!-- 单据明细 -->
		<div style="text-align: center;width: 100%;font-size:4mm;margin-bottom: 2mm;">换入信息</div>
		<!-- 单据明细 -->
		<table class="table-bordered" style="width: 188mm;font-size: 4mm;text-align: center;margin-bottom: 5px;" border-color="black">
			<thead >
				<tr style="padding: 0;">
					<th style="text-align: center; padding: 0;">序号</th>
					<th style="text-align: center; padding: 0;">仓库名称</th>
					<th style="text-align: center; padding: 0;">商品名称</th>
					<th style="text-align: center; padding: 0;">数量</th>
					<th style="text-align: center; padding: 0;">单价</th>
					<th style="text-align: center; padding: 0;">金额</th>
					<th style="text-align: center; padding: 0;">商品备注</th>
				</tr>
			</thead>
			<tbody style="font-size: 3mm;">
				<c:forEach items="${bills.salesInstrorageNumList}" var="billsDetail" varStatus="status">
					<tr style="padding: 0;">
						<td  style="padding: 0;">${status.count}</td>
						<td  style="padding: 0;">${bills.sectionName}-${billsDetail.storageName}</td>
						<td  style="padding: 0;">${billsDetail.goodsName}</td>
						<td  style="padding: 0;">${billsDetail.goodsNumber}</td>
						<td  style="padding: 0;"><fmt:formatNumber value="${billsDetail.price}" pattern="#,##0.00"/></td>
						<td  style="padding: 0;"><fmt:formatNumber value="${billsDetail.amount}" pattern="#,##0.00"/></td>
						<td  style="padding: 0;">${billsDetail.remark}</td>
					</tr>
				</c:forEach>	
				
				 <tr style="font-size: 4mm; padding: 0;">
					<td colspan="3" align="center" style="padding: 0;">合计</td>
					<td style="padding: 0;">${statistics:sumByField(bills.salesInstrorageNumList, 'goodsNumber')}</td>
					<%--<td style="padding: 0;"></td>--%>
					<td colspan="3" style="padding: 0; text-align: right;"><fmt:formatNumber value="${statistics:sumByField(bills.salesInstrorageNumList, 'amount')}" pattern="#,##0.00"/></td>
					<%--<td style="padding: 0;"></td>--%>
				</tr>		
			</tbody>
		</table>
		
		<!-- 单据明细 -->
		<div style="text-align: center;width: 100%;font-size:4mm;margin-bottom: 2mm;">换出信息</div>
		<table class="table-bordered" style="width: 188mm;font-size: 4mm;text-align: center;margin-bottom: 5px;" border-color="black">
			<thead >
				<tr style="padding: 0;">
					<th style="text-align: center; padding: 0;">序号</th>
					<th style="text-align: center; padding: 0;">仓库名称</th>
					<th style="text-align: center; padding: 0;">商品名称</th>
					<th style="text-align: center; padding: 0;">数量</th>
					<th style="text-align: center; padding: 0;">单价</th>
					<th style="text-align: center; padding: 0;">金额</th>
					<th style="text-align: center; padding: 0;">商品备注</th>
				</tr>
			</thead>
			<tbody style="font-size: 3mm;">
				<c:forEach items="${bills.outStorageNumList}" var="billsDetail" varStatus="status">
					<tr style="padding: 0;">
						<td style="padding: 0;">${status.count}</td>
						<td style="padding: 0;">${bills.sectionName}-${billsDetail.storageName}</td>
						<td style="padding: 0;">${billsDetail.goodsName}</td>
						<td style="padding: 0;">${billsDetail.goodsNumber}</td>
						<td style="padding: 0;"><fmt:formatNumber value="${billsDetail.price}" pattern="#,##0.00#"/></td>
						<td style="padding: 0;"><fmt:formatNumber value="${billsDetail.amount}" pattern="#,##0.00#"/></td>
						<td style="padding: 0;">${billsDetail.remark}</td>
					</tr>
				</c:forEach>	
				
				 <tr style="font-size: 4mm; padding:0;">
					<td colspan="3" align="center" style="padding: 0;">合计</td>
					<td style="padding: 0;">${statistics:sumByField(bills.outStorageNumList, 'goodsNumber')}</td>
					<%--<td style="padding: 0;"></td>--%>
					<td colspan="3" style="padding: 0; text-align:right;"><fmt:formatNumber value="${statistics:sumByField(bills.outStorageNumList, 'amount')}" pattern="#,##0.00"/></td>
					<%--<td style="padding: 0;"></td>--%>
				</tr>		
			</tbody>
		</table>
		
		<!-- 收付款明细 -->
		<c:if test="${!bills.salesBillsAccount.isEmpty()&& bills.prepaymentAmount!=null}">
		<table class="table-bordered" style="width: 188mm;" border-color="black">
			<thead>
				<tr style="padding: 0;">
				<th style="font-size: 3mm;font-weight: bold;width: 13mm;text-align: center; padding: 0;">序号</th>
				<c:choose>
					<c:when test="${statistics:sumByField(bills.outStorageNumList, 'discountedAmount')>statistics:sumByField(bills.salesInstrorageNumList, 'discountedAmount')}">
						<th style="font-size: 3mm;font-weight: bold;text-align: center; padding: 0;">收款类别</th>
						<th style="font-size: 3mm;font-weight: bold;text-align: center; padding: 0;">账户名称</th>
						<th style="font-size: 3mm;font-weight: bold;text-align: center; padding: 0;">收款金额</th>
					</c:when>
					<c:otherwise>
						<th style="font-size: 3mm;font-weight: bold;text-align: center; padding: 0;">付款类别</th>
						<th style="font-size: 3mm;font-weight: bold;text-align: center; padding: 0;">账户名称</th>
						<th style="font-size: 3mm;font-weight: bold;text-align: center; padding: 0;">付款金额</th>
					</c:otherwise>
				</c:choose>
				</tr>
			</thead>
			<tbody>
			    <% int indexx = 1; %>
				<c:forEach items="${bills.salesBillsAccount}" var="payreceiptDetail" varStatus="status">
					<c:if test="${payreceiptDetail.payreceiptAmout !=0 && payreceiptDetail.payreceiptAmout != null}">
					<tr style="padding: 0;">
					<td style="font-size: 3mm;text-align:center; padding: 0;"><%=indexx++ %></td>
					<td style="font-size: 3mm;text-align:left; padding: 0;">${payreceiptDetail.accountTypeName}</td>
					<td style="font-size: 3mm;text-align:left; padding: 0;">${payreceiptDetail.accountName}</td>
					<td style="font-size: 3mm;text-align:right; padding: 0;"><fmt:formatNumber value="${payreceiptDetail.payreceiptAmout}" pattern="#,##0.00"/></td>
					</tr>
					</c:if>
				</c:forEach>		
				<tr style="padding: 0;">
					<td colspan="3" align="center" style="font-size: 4mm; padding: 0;">合计</td>
				    <td style="font-size: 4mm;text-align:right; padding: 0;">
				      <fmt:formatNumber value="${statistics:sumByField(bills.salesBillsAccount, 'payreceiptAmout')}" pattern="#,##0.00"/>
				    </td>
				</tr>
			</tbody>
		</table>
		</c:if>
	<!-- 单据金额 -->
	    <div id="formBottom" style="font-size: 3mm;">
			<div class="form-group" style="width: 40mm;float: left;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 15mm;">
			  <c:if test="${amountTotalFlag==true}"> 
			   <c:if test="${statistics:sumByField2(bills.salesInstrorageNumList, 'taxAmount','Double')-statistics:sumByField2(bills.outStorageNumList, 'taxAmount','Double')>=0}">
			           应付金额:
			  </c:if>
			  <c:if test="${statistics:sumByField2(bills.salesInstrorageNumList, 'taxAmount','Double')-statistics:sumByField2(bills.outStorageNumList, 'taxAmount','Double')<0}">
			           应收金额:
			  </c:if>
			 </c:if>     
			     
			  <c:if test="${amountTotalFlag==false}"> 
			   <c:if test="${statistics:sumByField2(bills.salesInstrorageNumList, 'taxAmount','Double')-statistics:sumByField2(bills.outStorageNumList, 'taxAmount','Double')>=0}">
			          应收金额:
			  </c:if>
			  <c:if test="${statistics:sumByField2(bills.salesInstrorageNumList, 'taxAmount','Double')-statistics:sumByField2(bills.outStorageNumList, 'taxAmount','Double')<0}">
			          应付金额:
			  </c:if>
			 </c:if>        
			  </label>
			  
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;width: 20mm;">
			 <c:if test="${amountTotalFlag==true}"> 
			  <fmt:formatNumber 
			  value="${statistics:sumByField2(bills.salesInstrorageNumList, 'taxAmount','Double')-statistics:sumByField2(bills.outStorageNumList, 'taxAmount','Double')>0 ? statistics:sumByField2(bills.salesInstrorageNumList, 'taxAmount','Double')-statistics:sumByField2(bills.outStorageNumList, 'taxAmount','Double'):-(statistics:sumByField2(bills.salesInstrorageNumList, 'taxAmount','Double')-statistics:sumByField2(bills.outStorageNumList, 'taxAmount','Double'))}" pattern="#,##0.00"/>
			  </c:if>
			   <c:if test="${amountTotalFlag==false}"> 
			 <fmt:formatNumber 
			  value="${statistics:sumByField2(bills.salesInstrorageNumList, 'taxAmount','Double')-statistics:sumByField2(bills.outStorageNumList, 'taxAmount','Double')>0 ? 
			  statistics:sumByField2(bills.salesInstrorageNumList, 'taxAmount','Double')*(-1)+statistics:sumByField2(bills.outStorageNumList, 'taxAmount','Double'):
			  statistics:sumByField2(bills.salesInstrorageNumList, 'taxAmount','Double')-statistics:sumByField2(bills.outStorageNumList, 'taxAmount','Double')}" pattern="#,##0.00"/>
			  </c:if>
			  </span>
			  
			</div>
			<div class="form-group" style="width: 40mm;float: left;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 15mm;">
			  <c:if test="${amountTotalFlag==true}"> 
			   <c:if test="${statistics:sumByField2(bills.salesInstrorageNumList, 'taxAmount','Double')-statistics:sumByField2(bills.outStorageNumList, 'taxAmount','Double')>=0}">
			           未付金额:
			  </c:if>
			  <c:if test="${statistics:sumByField2(bills.salesInstrorageNumList, 'taxAmount','Double')-statistics:sumByField2(bills.outStorageNumList, 'taxAmount','Double')<0}">
			           未收金额:
			  </c:if>
			  </c:if>
			  
			     <c:if test="${amountTotalFlag==false}"> 
			  <c:if test="${statistics:sumByField2(bills.salesInstrorageNumList, 'taxAmount','Double')-statistics:sumByField2(bills.outStorageNumList, 'taxAmount','Double')>=0}">
			             未收金额:
			  </c:if>
			  <c:if test="${statistics:sumByField2(bills.salesInstrorageNumList, 'taxAmount','Double')-statistics:sumByField2(bills.outStorageNumList, 'taxAmount','Double')<0}">
			              未付金额:
			  </c:if>
			  </c:if>
			  </label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;width: 20mm;">
			  
			    <c:if test="${amountTotalFlag==true}"> 
			  <fmt:formatNumber 
			  value="${statistics:sumByField2(bills.salesInstrorageNumList, 'taxAmount','Double')-statistics:sumByField2(bills.outStorageNumList, 'taxAmount','Double')>0 ? 
			  statistics:sumByField2(bills.salesInstrorageNumList, 'taxAmount','Double')-statistics:sumByField2(bills.outStorageNumList, 'taxAmount','Double')-statistics:sumByField2(bills.salesBillsAccount, 'payreceiptAmout','Double'):
			  -(statistics:sumByField2(bills.salesInstrorageNumList, 'taxAmount','Double')-statistics:sumByField2(bills.outStorageNumList, 'taxAmount','Double'))-statistics:sumByField2(bills.salesBillsAccount, 'payreceiptAmout','Double')}" pattern="#,##0.00"/>
			  </c:if>
			    <c:if test="${amountTotalFlag==false}"> 
			  <fmt:formatNumber 
			  value="${statistics:sumByField2(bills.salesInstrorageNumList, 'taxAmount','Double')-statistics:sumByField2(bills.outStorageNumList, 'taxAmount','Double')>0 ? 
			  statistics:sumByField2(bills.salesInstrorageNumList, 'taxAmount','Double')*(-1)+statistics:sumByField2(bills.outStorageNumList, 'taxAmount','Double')-statistics:sumByField2(bills.salesBillsAccount, 'payreceiptAmout','Double'):
			  statistics:sumByField2(bills.salesInstrorageNumList, 'taxAmount','Double')-statistics:sumByField2(bills.outStorageNumList, 'taxAmount','Double')-statistics:sumByField2(bills.salesBillsAccount, 'payreceiptAmout','Double')}" pattern="#,##0.00"/>
			  </c:if>
			 
			  </span>
			</div>
			<div class="form-group" style="width: 40mm;float: left;">
				<label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 15mm;">
					客户签字:
				</label>
				<span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;width: 20mm;">
					__________
			  </span>
			</div>
	    </div><div style="clear: left;"></div>
			<!-- 打印说明 -->
			<div style="font-size: 3mm;overflow: hidden;padding: 3px 0;margin-bottom: 5px;">
					${reminder}
			</div>
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
			  ${bills.lastupdateByName }
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
	</c:if>

  </body>
</html>
