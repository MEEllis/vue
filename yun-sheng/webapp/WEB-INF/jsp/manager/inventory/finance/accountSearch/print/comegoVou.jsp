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
        <div id="billsDIV" style="width: 297mm;font-size: 3mm;margin-left: ${printParam.leftMargin}mm;">
            <c:if test="${!empty orderPage}">
                <%--仅打印封面--%>
                <c:if test="${!empty printParam.printType?printParam.printType != '2':true}">
                    <c:set var="fpagesum" value="0"></c:set>
                    <c:set var="lpagesum" value="0"></c:set>
                    <c:forEach items="${orderPage}" step="90" varStatus="tstatus">
                        <div class="title" style="margin-left:34mm; margin-right: 66mm;height:13mm;font-size:6mm;text-align: center;margin-top: ${printParam.rightMargin}mm;">
                            账簿目录表
                        </div>
                        <table class="table-bordered" style="width:270mm;table-layout:fixed;white-space:nowrap;text-align: center;margin-bottom: 2mm !important;font-size: 10px !important;">
                            <thead>
                                <tr style="padding: 0;">
                                    <c:forEach begin="0" end="2">
                                        <th style="width:60mm;height:6mm !important;text-align: center;">科目名称</th>
                                        <th style="width:30mm;height:6mm !important;text-align: center;">页次</th>
                                    </c:forEach>
                                </tr>
                            </thead>
                            <tbody>
                                <c:forEach items="${orderPage}" var="item"  varStatus="dstatus" begin="${tstatus.index}" end="${tstatus.index+29}">
                                    <tr style="padding: 0;">
                                        <%--<c:set var="fpagesum" value="${lpagesum + 1}"></c:set>--%>
                                        <%--<c:set var="lpagesum" value="${fn:length(orderPage[dstatus.index].detailList) % 30 == '0' ? (fn:length(orderPage[dstatus.index].detailList) / 30 + lpagesum) : (fn:length(orderPage[dstatus.index].detailList) + 30 - fn:length(orderPage[dstatus.index].detailList) % 30 ) / 30 + lpagesum}"></c:set>--%>

                                        <td style="height:6mm;text-align:left;padding-left: 5px;">${orderPage[dstatus.index].subjectCode} ${orderPage[dstatus.index].subjectName}</td>
                                        <td style="height:6mm;text-align:center;">
                                            <%--<c:if test="${!empty orderPage[dstatus.index].subjectName}">--%>
                                                <%--<fmt:formatNumber value="${fpagesum}" pattern="#0"></fmt:formatNumber> - <fmt:formatNumber value="${lpagesum}" pattern="#0"></fmt:formatNumber>--%>
                                            <%--</c:if>--%>
                                        </td>
                                        <td style="height:6mm;text-align:left;padding-left: 5px;">${orderPage[dstatus.index + 30].subjectCode} ${orderPage[dstatus.index + 30].subjectName}</td>
                                        <td style="height:6mm;text-align:center;">
                                            <%--<c:if test="${!empty orderPage[dstatus.index + 30].subjectName}">--%>
                                                <%--${tstatus.index + dstatus.count + 30} - ${tstatus.index + dstatus.count + 30}--%>
                                            <%--</c:if>--%>
                                        </td>
                                        <td style="height:6mm;text-align:left;padding-left: 5px;">${orderPage[dstatus.index + 60].subjectCode} ${orderPage[dstatus.index + 60].subjectName}</td>
                                        <td style="height:6mm;text-align:center;">
                                            <%--<c:if test="${!empty orderPage[dstatus.index + 60].subjectName}">--%>
                                                <%--${tstatus.index + dstatus.count + 60} - ${tstatus.index + dstatus.count + 60}--%>
                                            <%--</c:if>--%>
                                        </td>
                                    </tr>
                                </c:forEach>
                                <c:if test="${tstatus.index + 29 - fn:length(orderPage) > 0 }">
                                    <c:forEach begin="1" end="${tstatus.index + 29 - fn:length(orderPage) }">
                                        <tr style="padding: 0;">
                                            <td style="height:6mm;text-align:left;padding-left: 5px;"></td>
                                            <td style="height:6mm;text-align:center;"></td>
                                            <td style="height:6mm;text-align:left;padding-left: 5px;"></td>
                                            <td style="height:6mm;text-align:center;"></td>
                                            <td style="height:6mm;text-align:left;padding-left: 5px;"></td>
                                            <td style="height:6mm;text-align:center;"></td>
                                        </tr>
                                    </c:forEach>
                                </c:if>
                            </tbody>
                        </table>
                        <div style="page-break-after:always"></div>
                    </c:forEach>
                </c:if>
                <c:if test="${!empty printParam.printType?printParam.printType != '1':true}">
                    <c:set var="tablesum" value="0"></c:set>
                    <c:forEach var="page" items ="${orderPage}" varStatus="status">
                        <c:set var="pagenum" value="${fn:split(printParam.printNum, ',')}" />
                        <c:forEach items ="${page.detailList}" varStatus="zstatus" step="30">
                            <c:set var="contains" value="${empty printParam.printNum}" />
                            <c:forEach var="exist" items="${pagenum}">
                                <c:choose>
                                    <c:when test="${fn:indexOf(exist, '-') != '-1'}">
                                        <c:set var="range" value="${fn:split(exist, '-')}"></c:set>
                                        <c:if test="${range[0] <= tablesum+1 && tablesum+1 <= range[1]}">
                                            <c:set var="contains" value="true" />
                                        </c:if>
                                    </c:when>
                                    <c:otherwise>
                                        <c:if test="${exist == tablesum+1}">
                                            <c:set var="contains" value="true" />
                                        </c:if>
                                    </c:otherwise>
                                </c:choose>
                            </c:forEach>
                            <c:set var="tablesum" value="${tablesum + 1}"></c:set>
                            <c:if test="${contains}">
                                <!-- 单据表头 -->
                                <div class="title" style="margin-left:34mm; margin-right: 66mm;height:13mm;font-size:6mm;text-align: center;margin-top: 5mm;">
                                    ${page.subjectCode} ${page.subjectName}
                                    <c:choose>
                                        <c:when test="${page.subjectType== '1'}">总账</c:when>
                                        <c:when test="${page.subjectType== '2'}">明细账</c:when>
                                        <c:when test="${page.subjectType== '3'}">辅助账</c:when>
                                        <c:when test="${page.subjectType== '4'}">部门辅助账</c:when>
                                        <c:otherwise>个人明细账</c:otherwise>
                                    </c:choose>
                                </div>
                                <div style="width: 214mm;height:16mm;float:left;position: relative;">
                                    <div style="position: absolute;bottom:0;">
                                        <div style="height: 6mm;">
                                            <div style="width: 34mm;float: left;">科目：</div>
                                            <div style="float: left;">${page.subjectCode} ${page.subjectName}</div>
                                        </div>
                                        <div style="height: 6mm;">
                                            <c:if test="${page.subjectType == '3'}">
                                                <div style="width: 34mm;float: left;">往来单位：</div>
                                                <div style="float: left;">${page.partnerCode} ${page.partnerName} </div>
                                            </c:if>
                                            <c:if test="${page.subjectType == '4'}">
                                                <div style="width: 34mm;float: left;">部门：</div>
                                                <div style="float: left;">${page.deptCode} ${page.deptName} </div>
                                            </c:if>
                                            <c:if test="${page.subjectType == '5'}">
                                                <div style="width: 34mm;float: left;">职员：</div>
                                                <div style="float: left;">${page.employeeCode} ${page.employeeName} </div>
                                            </c:if>
                                        </div>
                                    </div>
                                </div>
                                <div style="float:left;width: 60mm;">
                                    <div style="height: 5mm;">
                                         <div style="width: 10mm;float: left">页号:</div>
                                        <div style="width:50mm;float: left;">第${zstatus.count}页共<fmt:parseNumber integerOnly="true" value="${fn:length(page.detailList) % 30 == '0' ? (fn:length(page.detailList) / 30) : (fn:length(page.detailList) + 30 - fn:length(page.detailList) % 30 ) / 30}" />页</div>
                                    </div>
                                    <div style="height: 5mm;">
                                        <div style="width: 10mm;float: left">期间:</div>
                                        <div style="width:50mm;float: left"> ${page.startAccountingPeriod} - ${page.endAccountingPeriod}</div>
                                    </div>
                                    <div style="height: 6mm;">
                                        <div style="width: 10mm;float: left">币种:</div>
                                        <div style="width:50mm;float: left">人民币</div>
                                    </div>
                                </div>
                                <!-- 单据主体 -->
                                <table class="table-bordered" style="width:278mm;table-layout:fixed;white-space:nowrap;text-align: center;margin-bottom: 2mm !important;font-size: 10px !important;">
                                    <thead>
                                        <tr style="padding: 0;">
                                            <th style="width: 7mm;height:6mm !important;text-align: center;">月</th>
                                            <th style="width: 7mm;height:6mm !important;text-align: center;">日</th>
                                            <th style="width:20mm;height:6mm !important;text-align: center;">凭证号</th>
                                            <th style="width:90mm;height:6mm !important;text-align: center;">摘要</th>
                                            <th style="width:45mm;height:6mm !important;text-align: center;">借方</th>
                                            <th style="width:45mm;height:6mm !important;text-align: center;">贷方</th>
                                            <th style="width:10mm;height:6mm !important;text-align: center;">方向</th>
                                            <th style="width:50mm;height:6mm !important;text-align: center;">余额</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <c:forEach items="${page.detailList}" var="detail" varStatus="bstatus" begin="${zstatus.index}" end="${zstatus.index + 29}">
                                            <tr style="padding: 0;">
                                                <td style="width: 7mm;height:5mm;text-align:center;"><fmt:formatNumber value="${detail.currentAccountingMonth}" pattern="#00" /></td>
                                                <td style="width: 7mm;height:5mm;text-align:center;">${detail.currentAccountingDay}</td>
                                                <td style="width:20mm;height:5mm;text-align:center;">${detail.inno}</td>
                                                <td style="width:90mm;height:5mm;text-align:left;padding-left: 5px;overflow: hidden;">${detail.summary}</td>
                                                <td style="width:45mm;height:5mm;text-align:right;padding-right: 5px;">${detail.currentPeriodBorrowAmuont}</td>
                                                <td style="width:45mm;height:5mm;text-align:right;padding-right: 5px;">${detail.currentPeriodLoanAmuont}</td>
                                                <td style="width:10mm;height:5mm;text-align:center;">${detail.direction}</td>
                                                <td style="width:50mm;height:5mm;text-align:right;padding-right: 5px;">${detail.periodEndAmuont}</td>
                                            </tr>
                                        </c:forEach>

                                        <c:if test="${zstatus.index + 29 - fn:length(page.detailList) > 0 }">
                                            <c:forEach begin="0" end="${zstatus.index + 29 - fn:length(page.detailList) }">
                                                <tr style="padding: 0;">
                                                    <td style="height:5mm;text-align:center;"></td>
                                                    <td style="height:5mm;text-align:center;"></td>
                                                    <td style="height:5mm;text-align:center;"></td>
                                                    <td style="height:5mm;text-align:left;padding-left: 5px;"></td>
                                                    <td style="height:5mm;text-align:right;padding-right: 5px;"></td>
                                                    <td style="height:5mm;text-align:right;padding-right: 5px;"></td>
                                                    <td style="height:5mm;text-align:center;"></td>
                                                    <td style="height:5mm;text-align:right;padding-right: 5px;"></td>
                                                </tr>
                                            </c:forEach>
                                        </c:if>
                                    </tbody>
                                </table>
                                <!-- 单据表尾 -->
                                <div style="">
                                    <div style="height: 7mm;">
                                        <div style="width:34mm;display: inline-block">核算单位：</div>
                                        <div style="width: 90mm;display: inline-block">${page.companyName}</div>
                                        <div style="display: inline-block">业务部门：</div>
                                        <div style="width: 90mm;display: inline-block">${page.sectionName}</div>
                                    </div>
                                    <div style="height: 7mm;">
                                        <div style="width: 34mm;display: inline-block">制表：</div>
                                        <div style="width: 90mm;display: inline-block">${page.createName}</div>
                                        <div style="display: inline-block;margin-left: 90mm;width:60mm;text-align: right">本次打印累计第${tablesum}页</div>
                                    </div>
                                </div>
                                <div style="page-break-after:always"></div>
                            </c:if>
                        </c:forEach>
                    </c:forEach>
                </c:if>
            </c:if>
        </div>
    </body>
</html>
