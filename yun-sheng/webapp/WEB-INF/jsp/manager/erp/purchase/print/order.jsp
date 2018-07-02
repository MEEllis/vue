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
     
    
    <title>采购订单打印-DEMO</title>
    
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
	
	<!-- 打印区  - 默认 -->
	<c:if test="${tempKind == 'default'}">
		<!-- 打印区 -->
		<div id="billsDIV" style="width: 188mm;position: relative;">
	
		<!-- 单据状态图标 -->
		<c:if test="${isDraftOp == false}">
		<img src="${basePath }/images/status/${bills.billsStatus}" width="80" height="80" style="position:absolute;top: 1mm;right: 15px;">	
		</c:if>
		<c:if test="${isDraftOp == true}">
		<img src="${basePath }/images/status/statusNotAudit.png" width="80" height="80" style="position:absolute;top: 1mm;right: 15px;">	
		</c:if>	
		
		<!-- 单据名称 -->
		<div style="text-align: center;font-size: 5mm;margin-bottom: 2mm;">
		  ${bills.companyName }采购订单
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
			      预付金额:
			  </label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
			  <fmt:formatNumber value="${wlye.yuFu }" pattern="#,##0.00"/>
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
			     单据备注:</label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
			  ${bills.remark }
			  </span>
			</div>	
	    </div>
		  
		<!-- 单据明细 -->
		<table class="table table-bordered" border-color="black">
			<thead >
				<tr style="padding: 0;">
					<th style="font-size: 3mm;font-weight: bold;width: 13mm;text-align: center; padding:0;">序号</th>
					<th style="font-size: 3mm;font-weight: bold;text-align: center;padding:0;">商品名称</th>
					<th style="font-size: 3mm;font-weight: bold;text-align: center;padding:0;">数量</th>
					<th style="font-size: 3mm;font-weight: bold;text-align: center;padding:0;">审批量</th>
					<th style="font-size: 3mm;font-weight: bold;text-align: center;padding:0;">单价</th>
					<th style="font-size: 3mm;font-weight: bold;text-align: center;padding:0;">总金额</th>
					<th style="font-size: 3mm;font-weight: bold;text-align: center;padding:0;">审批金额</th>
					<th style="font-size: 3mm;font-weight: bold;text-align: center;padding:0;">单台固返</th>
					<th style="font-size: 3mm;font-weight: bold;text-align: center;padding:0;">商品备注</th>
				</tr>
			</thead>
			<tbody>
				<c:forEach items="${bills.orderDetailList}" var="orderDetail" varStatus="status">
					<tr style="padding: 0;">
						<td style="font-size: 3mm;text-align:center;padding:0;">${status.count}</td>
						<td style="font-size: 3mm;text-align:left;padding:0;">${orderDetail.goodsName}</td>
						<td style="font-size: 3mm;text-align:center;padding:0;">${orderDetail.goodsNumber}</td>
						<td style="font-size: 3mm;text-align:center;padding:0;">${orderDetail.reviewsNum}</td>
						<td style="font-size: 3mm;text-align:right;padding:0;"><fmt:formatNumber value="${orderDetail.price}" pattern="#,##0.00"/></td>
						<td style="font-size: 3mm;text-align:right;padding:0;"><fmt:formatNumber value="${orderDetail.amount}" pattern="#,##0.00"/></td>
						<td style="font-size: 3mm;text-align:right;padding:0;"><fmt:formatNumber value="${orderDetail.reviewsAmount}" pattern="#,##0.00"/></td>
						<td style="font-size: 3mm;text-align:right;padding:0;"><fmt:formatNumber value="${orderDetail.singleRebate}" pattern="#,##0.00"/></td>
						<td style="font-size: 3mm;text-align:left;padding:0;">${orderDetail.remark}</td>
					</tr>
				</c:forEach>		
				<tr style="padding: 0;">
					<td colspan="2" align="center" style="font-size: 4mm;padding:0;">合计</td>
					<td style="font-size: 3mm;text-align: center;padding:0;">${bills.orderNum }</td>
					<td style="font-size: 3mm;padding:0;">${bills.reviewsNum }</td>
					<td style="font-size: 3mm;padding:0;"></td>
					<td style="font-size: 3mm;padding:0;"><fmt:formatNumber value="${bills.billsAmount}" pattern="#,##0.00"/></td>
					<td colspan="4" style="font-size: 3mm;text-align:center;padding:0;"><fmt:formatNumber value="${bills.reviewsAmount}" pattern="#,##0.00"/></td>
				</tr>
			</tbody>
		</table>
		
		<!-- 收付款明细 -->
			<c:if test="${!bills.payreceiptDetailList.isEmpty()&&bills.payreceiptDetailList!=null}">
			<table class="table table-bordered" border-color="black">
				<thead>
					<tr style="padding: 0;">
					<th style="font-size: 3mm;font-weight: bold;width: 13mm;text-align: center;padding:0;">序号</th>
					<th style="font-size: 3mm;font-weight: bold;text-align: center;padding:0;">付款类别</th>
					<th style="font-size: 3mm;font-weight: bold;text-align: center;padding:0;">账户名称</th>
					<th style="font-size: 3mm;font-weight: bold;text-align: center;padding:0;">付款金额</th>
					</tr>
				</thead>
				<tbody>
					<% int indexx = 1; %>
					<c:forEach items="${bills.payreceiptDetailList}" var="payreceiptDetail" varStatus="status">
						<c:if test="${payreceiptDetail.payreceiptAmout != 0}">
						<tr style="padding: 0;">
						<td style="font-size: 3mm;text-align:center;padding:0;"><%=indexx++ %></td>
						<td style="font-size: 3mm;text-align:left;padding:0;">${payreceiptDetail.accountTypeName}</td>
						<td style="font-size: 3mm;text-align:left;padding:0;">${payreceiptDetail.accountName}</td>
						<td style="font-size: 3mm;text-align:right;padding:0;"><fmt:formatNumber value="${payreceiptDetail.payreceiptAmout}" pattern="#,##0.00"/></td>
						</tr>
						</c:if>
					</c:forEach>
					<tr style="padding: 0;">
						<td colspan="3" align="center" style="font-size: 4mm;padding:0;">合计</td>
						<td style="font-size: 4mm;text-align:right;padding:0;">
						${statistics:sumByField(bills.payreceiptDetailList, 'payreceiptAmout')}
						</td>
					</tr>
				</tbody>
			</table>
		</c:if>
		
		<!-- 单据表尾 -->
	    <div id="formBottom" style="font-size: 3mm;">
			<div class="form-group" style="width: 40mm;float: left;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 12mm;position: relative;float: left;">
			     制单人:
			  </label>
			  <span style="padding-left: 3px;padding-right: 0px;width: 20mm;">
			  ${bills.createByName }
			  </span>
			</div>
			<div class="form-group" style="width: 40mm;float: left;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 12mm;position: relative;float: left;">
			     修改人:
			  </label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;width: 20mm;">
			  ${bills.lastupdateByName }
			  </span>
			</div>
			<div class="form-group" style="width: 40mm;float: left;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 12mm;position: relative;float: left;">
			     审核人:
			  </label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;width: 20mm;">
			  ${bills.auditorName }
			  </span>
			</div>
			<div class="form-group" style="width: 40mm;float: left;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 19mm;position: relative;float: left;">
			      强制完成人:
			  </label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;width: 20mm;position: relative;float: left;">
			  ${bills.forceFinishName }
			  </span>
			</div>
			<div class="form-group" style="width: 93mm;float: left;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;">打印时间:</label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;"><fmt:formatDate value="${currDate }" pattern="yyyy-MM-dd HH:mm:ss"/></span>
			</div>
	    </div>
		
		</div>
	</c:if>


	<!-- 打印区  - 审核及完成 -->
	<c:if test="${tempKind == 'check'}">
		<!-- 打印区 -->
		<div id="billsDIV" style="width: 188mm;position: relative;">
	
		<!-- 单据状态图标 -->
		<c:if test="${isDraftOp == false}">
		<img src="${basePath }/images/status/${bills.billsStatus}" width="80" height="80" style="position:absolute;top: 1mm;right: 15px;">	
		</c:if>
		
		<!-- 单据名称 -->
		<div style="text-align: center;font-size: 5mm;margin-bottom: 2mm;">
		  ${bills.companyName }采购订单
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
			      预付金额:
			  </label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
			  <fmt:formatNumber value="${wlye.yuFu }" pattern="#,##0.00"/>
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
			     单据备注:</label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
			  ${bills.remark }
			  </span>
			</div>	
	    </div>
		  
		<!-- 单据明细 -->
		<table class="table table-bordered" border-color="black">
			<thead >
				<tr style="padding: 0;">
					<th style="font-size: 3mm;font-weight: bold;width: 13mm;text-align: center; padding:0;">序号</th>
					<th style="font-size: 3mm;font-weight: bold;text-align: center; padding:0;">商品名称</th>
					<th style="font-size: 3mm;font-weight: bold;text-align: center; padding:0;">审批数量</th>
					<th style="font-size: 3mm;font-weight: bold;text-align: center; padding:0;">单价</th>
					<th style="font-size: 3mm;font-weight: bold;text-align: center;  padding:0;">审批金额</th>
					<th style="font-size: 3mm;font-weight: bold;text-align: center;  padding:0;">单台固返</th>
					<th style="font-size: 3mm;font-weight: bold;text-align: center;  padding:0;">商品备注</th>
				</tr>
			</thead>
			<tbody>
				<c:forEach items="${bills.orderDetailList}" var="orderDetail" varStatus="status">
					<tr style="padding: 0;">
						<td style="font-size: 3mm;text-align:center;  padding:0;">${status.count}</td>
						<td style="font-size: 3mm;text-align:left;  padding:0;">${orderDetail.goodsName}</td>
						<td style="font-size: 3mm;text-align:center;  padding:0;">${orderDetail.reviewsNum}</td>
						<td style="font-size: 3mm;text-align:right;  padding:0;"><fmt:formatNumber value="${orderDetail.price}" pattern="#,##0.00"/></td>
						<td style="font-size: 3mm;text-align:right;  padding:0;"><fmt:formatNumber value="${orderDetail.reviewsAmount}" pattern="#,##0.00"/></td>
						<td style="font-size: 3mm;text-align:right;  padding:0;"><fmt:formatNumber value="${orderDetail.singleRebate}" pattern="#,##0.00"/></td>
						<td style="font-size: 3mm;text-align:left;  padding:0;">${orderDetail.remark}</td>
					</tr>
				</c:forEach>		
				<tr style="padding: 0;">
					<td colspan="2" align="center" style="font-size: 4mm;   padding:0;">合计</td>
					<td colspan="2" style="font-size: 3mm;text-align:center;  padding:0;">${bills.reviewsNum }</td>
					<td colspan="3" style="font-size: 3mm;text-align:center;  padding:0;"><fmt:formatNumber value="${bills.reviewsAmount}" pattern="#,##0.00"/></td>
				</tr>
			</tbody>
		</table>					
		
		<!-- 收付款明细 -->

		<c:if test="${!bills.payreceiptDetailList.isEmpty()&&bills.payreceiptDetailList!=null}">
		<table class="table table-bordered" border-color="black">

			<thead>
				<tr  style="padding: 0;">
				<th style="font-size: 3mm;font-weight: bold;width: 13mm;text-align: center; padding: 0;">序号</th>
				<th style="font-size: 3mm;font-weight: bold;text-align: center;  padding: 0;">付款类别</th>
				<th style="font-size: 3mm;font-weight: bold;text-align: center; padding: 0;">账户名称</th>
				<th style="font-size: 3mm;font-weight: bold;text-align: center; padding: 0;">付款金额</th>
				</tr>
			</thead>
			<tbody>
			    <% int indexx = 1; %>
				<c:forEach items="${bills.payreceiptDetailList}" var="payreceiptDetail" varStatus="status">
					<c:if test="${payreceiptDetail.payreceiptAmout != 0}">
					<tr  style="padding: 0;">
					<td style="font-size: 3mm;text-align:center;  padding: 0;"><%=indexx++ %></td>
					<td style="font-size: 3mm;text-align:left;  padding: 0;">${payreceiptDetail.accountTypeName}</td>
					<td style="font-size: 3mm;text-align:left; padding: 0;">${payreceiptDetail.accountName}</td>
					<td style="font-size: 3mm;text-align:right; padding: 0;"><fmt:formatNumber value="${payreceiptDetail.payreceiptAmout}" pattern="#,##0.00"/></td>
					</tr>
					</c:if>
				</c:forEach>		
				<tr style="padding: 0;">
					<td colspan="3" align="center" style="font-size: 4mm;  padding: 0;">合计</td>
				    <td style="font-size: 4mm;text-align:right;  padding: 0;">
				    ${statistics:sumByField(bills.payreceiptDetailList, 'payreceiptAmout')}
				    </td>
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
			  ${bills.lastupdateByName }
			  </span>
			</div>
			<div class="form-group" style="width: 40mm;float: left;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 12mm;">
			     审核人:
			  </label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;width: 20mm;">
			  ${bills.auditorName }
			  </span>
			</div>
			<div class="form-group" style="width: 40mm;float: left;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 19mm;">
			      强制完成人:
			  </label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;width: 20mm;">
			  ${bills.forceFinishName }
			  </span>
			</div>
			<div class="form-group" style="width: 93mm;float: left;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;">打印时间:</label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;"><fmt:formatDate value="${currDate }" pattern="yyyy-MM-dd HH:mm:ss"/></span>
			</div>
	    </div>
		
		</div>
	</c:if>
	
	<!-- 打印区  - 未审核 -->
	<c:if test="${tempKind == 'nocheck'}">
		<!-- 打印区 -->
		<div id="billsDIV" style="width: 188mm;position: relative;">
	
		<!-- 单据状态图标 -->
		<c:if test="${isDraftOp == false}">
		<img src="${basePath }/images/status/${bills.billsStatus}" width="80" height="80" style="position:absolute;top: 1mm;right: 15px;">	
		</c:if>
		<c:if test="${isDraftOp == true}">
			<img src="${basePath }/images/status/statusNotAudit.png" width="80" height="80" style="position:absolute;top: 1mm;right: 15px;">
		</c:if>

			<!-- 单据名称 -->
		<div style="text-align: center;font-size: 5mm;margin-bottom: 2mm;">
		  ${bills.companyName }采购订单
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
			      预付金额:
			  </label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
			  <fmt:formatNumber value="${wlye.yuFu }" pattern="#,##0.00"/>
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
			     单据备注:</label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
			  ${bills.remark }
			  </span>
			</div>	
	    </div>
		  
		<!-- 单据明细 -->
		<table class="table table-bordered" bordercolor="black">
			<thead >
				<tr style="padding:0;">
					<th style="font-size: 3mm;font-weight: bold;width: 13mm;text-align: center; padding:0;">序号</th>
					<th style="font-size: 3mm;font-weight: bold;text-align: center; padding:0;">商品名称</th>
					<th style="font-size: 3mm;font-weight: bold;text-align: center; padding:0;">数量</th>
					<th style="font-size: 3mm;font-weight: bold;text-align: center; padding:0;">单价</th>
					<th style="font-size: 3mm;font-weight: bold;text-align: center; padding:0;">总金额</th>
					<th style="font-size: 3mm;font-weight: bold;text-align: center; padding:0;">单台固返</th>
					<th style="font-size: 3mm;font-weight: bold;text-align: center; padding:0;">商品备注</th>
				</tr>
			</thead>
			<tbody>
				<c:forEach items="${bills.orderDetailList}" var="orderDetail" varStatus="status">
					<tr style="padding:0;">
						<td style="font-size: 3mm;text-align:center; padding:0;">${status.count}</td>
						<td style="font-size: 3mm;text-align:left; padding:0;">${orderDetail.goodsName}</td>
						<td style="font-size: 3mm;text-align:center; padding:0;">${orderDetail.goodsNumber}</td>
						<td style="font-size: 3mm;text-align:right; padding:0;"><fmt:formatNumber value="${orderDetail.price}" pattern="#,##0.00"/></td>
						<td style="font-size: 3mm;text-align:right; padding:0;"><fmt:formatNumber value="${orderDetail.amount}" pattern="#,##0.00"/></td>
						<td style="font-size: 3mm;text-align:right; padding:0;"><fmt:formatNumber value="${orderDetail.singleRebate}" pattern="#,##0.00"/></td>
						<td style="font-size: 3mm;text-align:left; padding:0;">${orderDetail.remark}</td>
					</tr>
				</c:forEach>		
				<tr style="padding:0;">
					<td colspan="2" align="center" style="font-size: 4mm; padding:0;">合计</td>
					<td colspan="2" style="font-size: 3mm;text-align: center; padding:0;">${bills.orderNum }</td>
					<td colspan="3" style="font-size: 3mm;text-align: center; padding:0;"><fmt:formatNumber value="${bills.billsAmount}" pattern="#,##0.00"/></td>
				</tr>
			</tbody>
		</table>
		
		<!-- 收付款明细 -->
			<c:if test="${!bills.payreceiptDetailList.isEmpty()&&bills.payreceiptDetailList!=null}">
		<table class="table table-bordered" border-color="black">
			<thead>
				<tr style="padding:0;">
				<th style="font-size: 3mm;font-weight: bold;width: 13mm;text-align: center; padding:0;">序号</th>
				<th style="font-size: 3mm;font-weight: bold;text-align: center; padding:0;">付款类别</th>
				<th style="font-size: 3mm;font-weight: bold;text-align: center; padding:0;">账户名称</th>
				<th style="font-size: 3mm;font-weight: bold;text-align: center; padding:0;">付款金额</th>
				</tr>
			</thead>
			<tbody>
			    <% int indexx = 1; %>
				<c:forEach items="${bills.payreceiptDetailList}" var="payreceiptDetail" varStatus="status">
					<c:if test="${payreceiptDetail.payreceiptAmout != 0}">
					<tr style="padding:0;">
					<td style="font-size: 3mm;text-align:center; padding:0;"><%=indexx++ %></td>
					<td style="font-size: 3mm;text-align:left; padding:0;">${payreceiptDetail.accountTypeName}</td>
					<td style="font-size: 3mm;text-align:left; padding:0;">${payreceiptDetail.accountName}</td>
					<td style="font-size: 3mm;text-align:right; padding:0;"><fmt:formatNumber value="${payreceiptDetail.payreceiptAmout}" pattern="#,##0.00"/></td>
					</tr>
					</c:if>
				</c:forEach>		
				<tr style="padding:0;">
					<td colspan="3" align="center" style="font-size: 4mm; padding:0;">合计</td>
				    <td style="font-size: 4mm;text-align:right; padding:0;">
				    ${statistics:sumByField(bills.payreceiptDetailList, 'payreceiptAmout')}
				    </td>
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
			  ${bills.lastupdateByName }
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
