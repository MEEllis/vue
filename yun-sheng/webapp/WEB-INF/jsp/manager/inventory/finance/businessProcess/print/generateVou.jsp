<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="statistics" uri="/WEB-INF/ListStatistics.tld" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
	<title></title>

	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">

	<!-- 引入文件 -->
	<jsp:include page="../../../../Include/print.jsp"></jsp:include>
</head>

<body>
	<!-- 打印区 -->
	<div id="billsDIV" style="width: 170mm;font-size: 3mm;text-align: center;margin-left: ${VoucherPrintQueryVo.marginLeft}mm;margin-top: ${VoucherPrintQueryVo.marginRight}mm;">
		<c:set var="tablesum" value="0"></c:set>
		<c:forEach var="page" items ="${pageList}" varStatus="status">
			<!-- A4纸 -->
			<c:if test="${VoucherPrintQueryVo.printFormat == '0'}">
				<c:forEach items ="${page.voucherPrintVoList}" varStatus="zstatus" step="5">
					<div style="margin-top: 9mm;">
						<!-- 单据表头 -->
						<div style="width: 18mm;height: 9mm;text-align: center;float:left;font-size: 5mm;line-height: 9mm;">
							<c:if test="${page.makeErrorStae == '1'}">标错</c:if>
							<c:if test="${page.invalidateState == '1'}">作废</c:if>
						</div>
						<div style="text-align: center;width:99mm;margin-left: 18mm;float:left;">
							<div style="height: 9mm;font-size: 6mm;">记账凭证</div>
							<div style="height: 4mm;">${page.voucherDate}</div>
						</div>
						<div style="height: 4mm;width: 35mm;margin-top: 9mm;float:left;display: flex;justify-content: space-between;text-align: center;">
							<span style="float: left">附单据数</span>
							<span>${page.attachedVoucherNum}</span>
							<span style="float: right">张</span>
						</div>
						<div style="clear: both"></div>
						<div style="height: 6mm;text-align: center;">
							<div style="width:18mm;float:left">核算单位：</div>
							<div style="width:117mm;text-align: left;float:left;">${page.companyName}</div>
							<div style="width:35mm;float:right;display: flex;justify-content: space-between;text-align: center">
								<span>第</span><fmt:formatNumber value="${page.inno}" minIntegerDigits	="4" pattern="#,###0" />
								<span>号-</span>
								<span>${zstatus.count}/<fmt:parseNumber integerOnly="true" value="${ fn:length(page.voucherPrintVoList) % 5 == '0' ? (fn:length(page.voucherPrintVoList) / 5) : (fn:length(page.voucherPrintVoList) + 5 - fn:length(page.voucherPrintVoList) % 5 ) / 5}" /></span>
							</div>
						</div>

						<!-- 单据主体 -->
						<table class="table-bordered" style="table-layout:fixed;word-break:break-all;border-color:black !important;margin-bottom: 2mm !important;font-size: 8px;">
							<thead>
								<tr style="padding: 0;">
									<th style="width:53mm;height:10mm;text-align: center;">摘&nbsp;&nbsp;要</th>
									<th style="width:47mm;height:10mm;text-align: center;">会计科目</th>
									<th style="width:35mm;height:10mm;text-align: center;">借&nbsp;&nbsp;方</th>
									<th style="width:35mm;height:10mm;text-align: center;">贷&nbsp;&nbsp;方</th>
								</tr>
							</thead>
							<tbody>
								<c:set var="brosum" value="0"></c:set>
								<c:set var="loansum" value="0"></c:set>
								<c:forEach var="detail" items ="${page.voucherPrintVoList}" varStatus="bstatus" begin="${zstatus.index}" end="${zstatus.index + 4}">
									<tr style="padding: 0;">
										<td style="width:53mm;height:11mm;text-align:left;padding-left: 5px;">${detail.summaryName} ${detail.depYeName}</td>
										<td style="width:47mm;height:11mm;text-align:left;padding-left: 5px;">${detail.subjectCode} ${detail.subjectName}
											<c:if test="${!empty detail.contactUnitName}">--${detail.contactUnitName}</c:if>
											<c:if test="${!empty detail.departmentName}">--${detail.departmentName}</c:if>
											<c:if test="${!empty detail.employeeName}">--${detail.employeeName}</c:if>
										</td>
										<td style="width:35mm;height:11mm;text-align:right;padding-right: 5px;"><fmt:formatNumber value="${detail.borrowCurrency}" pattern="#,##0.00"/></td>
										<td style="width:35mm;height:11mm;text-align:right;padding-right: 5px;"><fmt:formatNumber value="${detail.loanCurrency}" pattern="#,##0.00"/></td>
									</tr>
									<c:set var="brosum" value="${brosum+detail.borrowCurrency}"></c:set>
									<c:set var="loansum" value="${loansum+detail.loanCurrency}"></c:set>
								</c:forEach>
								<c:if test="${zstatus.index + 5 - fn:length(page.voucherPrintVoList) > 0 }">
									<c:forEach begin="1" end="${zstatus.index + 5 - fn:length(page.voucherPrintVoList) }">
										<tr style="padding: 0;">
											<td style="height:11mm;"></td>
											<td style="height:11mm;"></td>
											<td style="height:11mm;"></td>
											<td style="height:11mm;"></td>
										</tr>
									</c:forEach>
								</c:if>

								<tr style="padding: 0;">
									<td width="18mm" style="text-align: center;height:11mm;">合&nbsp;&nbsp;计</td>
									<td width="82mm" style="text-align: left;height:11mm;padding-left: 5px;">
										<c:if test="${zstatus.last}" >${page.lastMoneyCN}</c:if>
									</td>
									<td width="35mm" style="font-weight:bold;text-align: right;height:11mm;padding-right: 5px;">
										<c:if test="${zstatus.last}"><fmt:formatNumber value="${page.borrowCurrencySum}" pattern="#,##0.00"/></c:if>
										<c:if test="${!zstatus.last}"><fmt:formatNumber value="${brosum}" pattern="#,##0.00"/></c:if>
									</td>
									<td width="35mm" style="font-weight:bold;text-align: right;height:11mm;padding-right: 5px;">
										<c:if test="${zstatus.last}"><fmt:formatNumber value="${page.loanCurrencySum}" pattern="#,##0.00"/></c:if>
										<c:if test="${!zstatus.last}" ><fmt:formatNumber value="${loansum}" pattern="#,##0.00"/></c:if>
									</td>
								</tr>
							</tbody>
						</table>

						<!-- 单据表尾 -->
						<div style="height:6mm;margin-bottom: ${VoucherPrintQueryVo.proofInterval - 9}mm;line-height: 6mm;">
							<div style="width:18mm;text-align: right;display: inline-block;">记账：</div>
							<div style="width:35mm;display:inline-block;">${page.bookKeeperName}</div>
							<div style="width:12mm;display:inline-block;">审核：</div>
							<div style="width:35mm;display:inline-block;text-align: left;">${page.auditorName}</div>
							<div style="width:12mm;display:inline-block;">出纳：</div>
							<div style="width:23mm;display:inline-block;text-align: left;">${page.cashierName}</div>
							<div style="width:12mm;display:inline-block;">制单：</div>
							<div style="width:15mm;display:inline-block;text-align: left;">${page.createName}</div>
						</div>

						<!-- 分隔线 -->
						<c:set var="tablesum" value="${tablesum + 1}"></c:set>
						<c:if test="${tablesum%2 != '0' && VoucherPrintQueryVo.printSep == '1'}"><div style="border: 0.5mm dashed #ddd"></div></c:if>
						<c:if test="${tablesum%2 == '0'}"><div style="page-break-after:always"></div></c:if>
					</div>
				</c:forEach>
			</c:if>
			<!-- 21*12金额式 -->
			<c:if test="${VoucherPrintQueryVo.printFormat == '1'}">
				<c:forEach items ="${page.voucherPrintVoList}" varStatus="zstatus" step="5">
					<div style="margin-top: 6mm;page-break-after:always">
						<!-- 单据表头 -->
						<div style="width: 18mm;height: 9mm;text-align: center;float:left;font-size: 5mm;line-height: 9mm;">
							<c:if test="${page.makeErrorStae == '1'}">标错</c:if>
							<c:if test="${page.invalidateState == '1'}">作废</c:if>
						</div>
						<div style="text-align: center;width:99mm;margin-left: 18mm;float:left;">
							<div style="height: 9mm;font-size: 6mm;">记账凭证</div>
							<div style="height: 4mm;">${page.voucherDate}</div>
						</div>
						<div style="height: 4mm;width: 35mm;margin-top: 9mm;float:left;display: flex;justify-content: space-between;text-align: center;">
							<span style="float: left">附单据数</span>
							<span>${page.attachedVoucherNum}</span>
							<span style="float: right">张</span>
						</div>
						<div style="clear: both"></div>
						<div style="height: 6mm;text-align: center;">
							<div style="width:18mm;float:left">核算单位：</div>
							<div style="width:117mm;text-align: left;float:left;">${page.companyName}</div>
							<div style="width:35mm;float:right;display: flex;justify-content: space-between;text-align: center">
								<span>第</span> <fmt:formatNumber value="${page.inno}" minIntegerDigits	="4" pattern="#,###0" />
								<span>号-</span>
								<span>${zstatus.count}/<fmt:parseNumber integerOnly="true" value="${ fn:length(page.voucherPrintVoList) % 5 == '0' ? (fn:length(page.voucherPrintVoList) / 5) : (fn:length(page.voucherPrintVoList) + 5 - fn:length(page.voucherPrintVoList) % 5 ) / 5}" /></span>
							</div>
						</div>

						<!-- 单据主体 -->
						<table class="table-bordered" style="table-layout:fixed;word-break:break-all;border-color:black !important;margin-bottom: 2mm !important;font-size: 8px;">
							<thead>
							<tr style="padding: 0;">
								<th style="width:53mm;height:10mm;text-align: center;">摘&nbsp;&nbsp;要</th>
								<th style="width:47mm;height:10mm;text-align: center;">会计科目</th>
								<th style="width:35mm;height:10mm;text-align: center;">借&nbsp;&nbsp;方</th>
								<th style="width:35mm;height:10mm;text-align: center;">贷&nbsp;&nbsp;方</th>
							</tr>
							</thead>
							<tbody>
							<c:set var="brosum" value="0"></c:set>
							<c:set var="loansum" value="0"></c:set>
							<c:forEach var="detail" items ="${page.voucherPrintVoList}" varStatus="bstatus" begin="${zstatus.index}" end="${zstatus.index + 4}">
								<tr style="padding: 0;">
									<td style="width:53mm;height:11mm;text-align:left;padding-left: 5px;">${detail.summaryName} ${detail.depYeName}</td>
									<td style="width:47mm;height:11mm;text-align:left;padding-left: 5px;">${detail.subjectCode} ${detail.subjectName}
										<c:if test="${!empty detail.contactUnitName}">--${detail.contactUnitName}</c:if>
										<c:if test="${!empty detail.departmentName}">--${detail.departmentName}</c:if>
										<c:if test="${!empty detail.employeeName}">--${detail.employeeName}</c:if>
									</td>
									<td style="width:35mm;height:11mm;text-align:right;padding-right: 5px;"><fmt:formatNumber value="${detail.borrowCurrency}" pattern="#,##0.00"/></td>
									<td style="width:35mm;height:11mm;text-align:right;padding-right: 5px;"><fmt:formatNumber value="${detail.loanCurrency}" pattern="#,##0.00"/></td>
								</tr>
								<c:set var="brosum" value="${brosum + detail.borrowCurrency}"></c:set>
								<c:set var="loansum" value="${loansum + detail.loanCurrency}"></c:set>
							</c:forEach>
							<c:if test="${zstatus.index + 5 - fn:length(page.voucherPrintVoList) > 0 }">
								<c:forEach begin="1" end="${zstatus.index + 5 - fn:length(page.voucherPrintVoList) }">
									<tr style="padding: 0;">
										<td style="height:11mm;"></td>
										<td style="height:11mm;"></td>
										<td style="height:11mm;"></td>
										<td style="height:11mm;"></td>
									</tr>
								</c:forEach>
							</c:if>

							<tr style="padding: 0;">
								<td width="18mm" style="text-align: center;height:11mm;">合&nbsp;&nbsp;计</td>
								<td width="82mm" style="text-align: left;height:11mm;padding-left: 5px;"><c:if test="${zstatus.last}" >${page.lastMoneyCN}</c:if></td>
								<td width="35mm" style="font-weight:bold;text-align: right;height:11mm;padding-right: 5px;">
									<c:if test="${zstatus.last}"><fmt:formatNumber value="${page.borrowCurrencySum}" pattern="#,##0.00"/></c:if>
									<c:if test="${!zstatus.last}"><fmt:formatNumber value="${brosum}" pattern="#,##0.00"/></c:if>
								</td>
								<td width="35mm" style="font-weight:bold;text-align: right;height:11mm;padding-right: 5px;">
									<c:if test="${zstatus.last}"><fmt:formatNumber value="${page.loanCurrencySum}" pattern="#,##0.00"/></c:if>
									<c:if test="${!zstatus.last}"><fmt:formatNumber value="${loansum}" pattern="#,##0.00"/></c:if>
								</td>
							</tr>
							</tbody>
						</table>

						<!-- 单据表尾 -->
						<div style="height:6mm;margin-bottom: ${VoucherPrintQueryVo.proofInterval - 9}mm;line-height: 6mm;">
							<div style="width:18mm;text-align: right;display: inline-block;">记账：</div>
							<div style="width:35mm;display:inline-block;">${page.bookKeeperName}</div>
							<div style="width:12mm;display:inline-block;">审核：</div>
							<div style="width:35mm;display:inline-block;text-align: left;">${page.auditorName}</div>
							<div style="width:12mm;display:inline-block;">出纳：</div>
							<div style="width:23mm;display:inline-block;text-align: left;">${page.cashierName}</div>
							<div style="width:12mm;display:inline-block;">制单：</div>
							<div style="width:15mm;display:inline-block;text-align: left;">${page.createName}</div>
						</div>
					</div>
				</c:forEach>
			</c:if>
		</c:forEach>
	</div>
</body>
</html>
