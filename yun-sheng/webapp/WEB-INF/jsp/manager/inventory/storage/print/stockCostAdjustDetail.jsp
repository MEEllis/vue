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
	<title>库存成本调整单-串号明细</title>

	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">

	<!-- 引入文件 -->
	<jsp:include page="../../../Include/print.jsp"></jsp:include>
	<script type="text/javascript">
        function print(){
            $("#orderDIV").jqprint({
                debug: false, //如果是true则可以显示iframe查看效果（iframe默认高和宽都很小，可以再源码中调大），默认是false
                importCSS: true, //true表示引进原来的页面的css，默认是true。（如果是true，先会找$("link[media=print]")，若没有会去找$("link")中的css文件）
                printContainer: true, //表示如果原来选择的对象必须被纳入打印（注意：设置为false可能会打破你的CSS规则）。
                operaSupport: true//表示如果插件也必须支持歌opera浏览器，在这种情况下，它提供了建立一个临时的打印选项卡。默认是true
            });
        }
	</script>
</head>

<body style="padding: 10px;">

<nav class="navbar navbar-default" role="navigation" style="width: 190mm;">
	<div class="container-fluid">
		<div class="nav navbar-nav navbar-right" style="margin: 0px;">
			<button type="button" class="btn btn-default navbar-btn" onclick="print()" style="margin-left: 10px;">打印测试</button>
		</div>
	</div>
</nav><!-- /E 工具栏结束  -->

<!-- 打印区  - 默认 -->
<!-- 打印区 -->
<div id="billsDIV" style="width: 188mm;position: relative;">


	<c:if test="${order.billsStatus == 6}">
		<img src="${basePath }/images/status/statusPass.png" width="80" height="80" style="position:absolute;top: 1mm;right: 15px;">
	</c:if>
	<c:if test="${order.billsStatus == 7}">
		<img src="${basePath }/images/status/statusRed.png" width="80" height="80" style="position:absolute;top: 1mm;right: 15px;">
	</c:if>

	<c:if test="${order.auditStatus == 1}">
		<img src="${basePath }/images/audit.png" width="80" height="80" style="position:absolute;top: 1mm;right: 100px;">
	</c:if>
	<c:if test="${order.auditStatus == 0}">
		<img src="${basePath }/images/auditNo.png" width="80" height="80" style="position:absolute;top: 1mm;right: 100px;">
	</c:if>

	<!-- 单据名称 -->
	<div style="text-align: center;font-size: 5mm;margin-bottom: 2mm;">
		${companyName}库存成本调整单
	</div>

	<!-- 单据表头 -->
	<div style="font-size: 3mm;">
		<div class="form-group" style="width: 62mm;float: left;margin-bottom: 1mm;">
			<label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;position: relative;float: left;">
				单据编号:
			</label>
			<span style="padding-left: 3px;padding-right: 0px;">
				${order.billsCode}
			</span>
		</div>
		<div class="form-group" style="width: 62mm;float: left;margin-bottom: 1mm;">
			<label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;position: relative;float: left;">
				单据日期:
			</label>
			<span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
				${order.billsDateStr}
			</span>
		</div>
		<div class="form-group" style="width: 62mm;float: left;margin-bottom: 1mm;">
			<label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 25mm;text-align: right;position: relative;float: left;">
				部门名称:
			</label>
			<span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
				${order.sectionName}
			</span>
		</div>
		<div class="form-group" style="width: 62mm;float: left;margin-bottom: 1mm;">
			<label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;position: relative;float: left;">
				经手人:
			</label>
			<span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
				${order.managerName}
			</span>
		</div>

		<div class="form-group" style="width: 62mm;float: left;margin-bottom: 1mm;">
			<label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;position: relative;float: left;">
				调整原因:
			</label>
			<span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
				${order.reasonName}
			</span>
		</div>
		<div class="form-group" style="width: 62mm;float: left;margin-bottom: 1mm;">
			<label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 25mm;text-align: right;position: relative;float: left;">
				调整成本种类:
			</label>
			<span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
				${order.adjustmentTypeName}
			</span>
		</div>

		<div class="form-group" style="width: 62mm;float: left;margin-bottom: 1mm;">
			<label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;position: relative;float: left;">
				单据备注:
			</label>
			<span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
				${order.remark}
			</span>
		</div>
	</div>



		<!-- 单据明细 -->
		<table class="table table-bordered" style="word-break: break-all; word-wrap:break-word;border-color:black !important;">
			<thead>
			<tr>
				<th style="font-size: 3mm;font-weight: bold;width: 13mm;text-align: center;border-color:black !important;">序号</th>
				<th style="font-size: 3mm;font-weight: bold;text-align: center;border-color:black !important;">商品名称</th>
				<th style="font-size: 3mm;font-weight: bold;text-align: center;border-color:black !important;">数量</th>
				<!-- 打印区  - 财务成本，公司成本，部门成本 -->
				<c:if test="${printType != 'allCost'}">
					<th style="font-size: 3mm;font-weight: bold;text-align: center;border-color:black !important;">原总额</th>
					<th style="font-size: 3mm;font-weight: bold;text-align: center;border-color:black !important;">调后总额</th>
					<th style="font-size: 3mm;font-weight: bold;text-align: center;border-color:black !important;">调整差额</th>
				</c:if>
				<!-- 打印区  - 财务成本+公司成本+部门成本 -->
				<c:if test="${printType == 'allCost'}">
					<th style="font-size: 3mm;font-weight: bold;text-align: center;border-color:black !important;">调后财务成本总额</th>
					<th style="font-size: 3mm;font-weight: bold;text-align: center;border-color:black !important;">调后公司成本总额</th>
					<th style="font-size: 3mm;font-weight: bold;text-align: center;border-color:black !important;">调后部门成本总额</th>
				</c:if>
				<th style="font-size: 3mm;font-weight: bold;text-align: center;border-color:black !important;">备注</th>

			</tr>
			</thead>
			<tbody>
			<c:set var="count" value="0"></c:set>
			<c:set var="goodsNumberAmount" value="0"></c:set>
			<c:set var="costAmount" value="0"></c:set>
			<c:set var="costAmountAfter" value="0"></c:set>
			<c:set var="costAmountBalance" value="0"></c:set>
			<c:forEach items="${order.detailList}" var="orderDetail" >
				<c:set var="count" value="${count + 1}"></c:set>
				<c:set var="goodsNumberAmount" value="${goodsNumberAmount + orderDetail.goodsNumber}"></c:set>
				<tr>
					<td style="font-size: 3mm;text-align:center;border-color:black !important;">${count}</td>
					<td style="font-size: 3mm;text-align:center;border-color:black !important;">${orderDetail.goodsName}</td>
					<td style="font-size: 3mm;text-align:center;border-color:black !important;">${orderDetail.goodsNumber}</td>
					<!-- 打印区  - 财务成本 -->
					<c:if test="${printType == 'cost'}">
						<c:set var="costAmount" value="${costAmount + orderDetail.costAmount}"></c:set>
						<c:set var="costAmountAfter" value="${costAmountAfter + orderDetail.costAmountAfter}"></c:set>
						<c:set var="costAmountBalance" value="${costAmountBalance + orderDetail.costAmountBalance}"></c:set>
						<td style="font-size: 3mm;text-align:center;border-color:black !important;">
							<fmt:formatNumber type="number" maxFractionDigits="2" value="${orderDetail.costAmount}"/>
						</td>
						<td style="font-size: 3mm;text-align:center;border-color:black !important;">
							<fmt:formatNumber type="number" maxFractionDigits="2" value="${orderDetail.costAmountAfter}"/>
						</td>
						<td style="font-size: 3mm;text-align:center;border-color:black !important;">
							<fmt:formatNumber type="number" maxFractionDigits="2" value="${orderDetail.costAmountBalance}"/>
						</td>
					</c:if>
					<!-- 打印区  - 公司成本 -->
					<c:if test="${printType == 'companyCost'}">
						<c:set var="costAmount" value="${costAmount + orderDetail.companyCostAmount}"></c:set>
						<c:set var="costAmountAfter" value="${costAmountAfter + orderDetail.companyCostAmountAfter}"></c:set>
						<c:set var="costAmountBalance" value="${costAmountBalance + orderDetail.companyCostAmountBalance}"></c:set>
						<td style="font-size: 3mm;text-align:center;border-color:black !important;">
							<fmt:formatNumber type="number" maxFractionDigits="2" value="${orderDetail.companyCostAmount}"/>
						</td>
						<td style="font-size: 3mm;text-align:center;border-color:black !important;">
							<fmt:formatNumber type="number" maxFractionDigits="2" value="${orderDetail.companyCostAmountAfter}"/>
						</td>
						<td style="font-size: 3mm;text-align:center;border-color:black !important;">
							<fmt:formatNumber type="number" maxFractionDigits="2" value="${orderDetail.companyCostAmountBalance}"/>
						</td>
					</c:if>
					<!-- 打印区  - 部门成本 -->
					<c:if test="${printType == 'sectionCost'}">
						<c:set var="costAmount" value="${costAmount + orderDetail.sectionCostAmount}"></c:set>
						<c:set var="costAmountAfter" value="${costAmountAfter + orderDetail.sectionCostAmountAfter}"></c:set>
						<c:set var="costAmountBalance" value="${costAmountBalance + orderDetail.sectionCostAmountBalance}"></c:set>
						<td style="font-size: 3mm;text-align:center;border-color:black !important;">
							<fmt:formatNumber type="number" maxFractionDigits="2" value="${orderDetail.sectionCostAmount}"/>
						</td>
						<td style="font-size: 3mm;text-align:center;border-color:black !important;">
							<fmt:formatNumber type="number" maxFractionDigits="2" value="${orderDetail.sectionCostAmountAfter}"/>
						</td>
						<td style="font-size: 3mm;text-align:center;border-color:black !important;">
							<fmt:formatNumber type="number" maxFractionDigits="2" value="${orderDetail.sectionCostAmountBalance}"/>
						</td>
					</c:if>
					<!-- 打印区  - 财务成本+ 公司成本 + 部门成本 -->
					<c:if test="${printType == 'allCost'}">
						<c:set var="costAmount" value="${costAmount + orderDetail.costAmountAfter}"></c:set>
						<c:set var="costAmountAfter" value="${costAmountAfter + orderDetail.companyCostAmountAfter}"></c:set>
						<c:set var="costAmountBalance" value="${costAmountBalance + orderDetail.sectionCostAmountAfter}"></c:set>
						<td style="font-size: 3mm;text-align:center;border-color:black !important;">
							<fmt:formatNumber type="number" maxFractionDigits="2" value="${orderDetail.costAmountAfter}"/>
						</td>
						<td style="font-size: 3mm;text-align:center;border-color:black !important;">
							<fmt:formatNumber type="number" maxFractionDigits="2" value="${orderDetail.companyCostAmountAfter}"/>
						</td>
						<td style="font-size: 3mm;text-align:center;border-color:black !important;">
							<fmt:formatNumber type="number" maxFractionDigits="2" value="${orderDetail.sectionCostAmountAfter}"/>
						</td>
					</c:if>
					<td style="font-size: 3mm;text-align:center;border-color:black !important;">${orderDetail.remark}</td>

				</tr>


			</c:forEach>
			<tr>
				<td align="center" style="font-size: 4mm;font-weight: bold;border-color:black !important;" colspan="2" >合计</td>
				<td style="font-size: 3mm;font-weight: bold;text-align: center;border-color:black !important;">${goodsNumberAmount}</td>
				<td style="font-size: 3mm;font-weight: bold;text-align: center;border-color:black !important;">
					<fmt:formatNumber type="number" maxFractionDigits="2" value="${costAmount}"/>
				</td>
				<td style="font-size: 3mm;font-weight: bold;text-align: center;border-color:black !important;">
					<fmt:formatNumber type="number" maxFractionDigits="2" value="${costAmountAfter}"/>
				</td>
				<td style="font-size: 3mm;font-weight: bold;text-align: center;border-color:black !important;">
					<fmt:formatNumber type="number" maxFractionDigits="2" value="${costAmountBalance}"/>
				</td>
				<td style="font-size: 3mm;font-weight: bold;text-align: right;border-color:black !important;"></td>
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
				过账人:
			</label>
			<span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;width: 20mm;">
				${order.postByName}
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
