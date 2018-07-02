<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="statistics" uri="/WEB-INF/ListStatistics.tld" %>
<%
    request.setAttribute("currDate", new Date());
%>
<div class="billsDIVWrap " style="visibility: hidden;position: fixed;top: -1000px;" > <%----%>
    <!-- 开始小票 -->
    <div id="billsDIV" style="width: 180pt;">

        <!-- 单据名称 -->
        <div style="text-align: center;font-size: 12pt;margin-bottom: 6pt;width: 180pt;">
            销售清单
        </div>

        <!--开始 单据主信息        -->
        <table style="border: 0;font-size: 9pt;width: 180pt;border-collapse:collapse;" >
            <thead>
            <tr>
                <td colspan="2">单号：${obj.billsCode}</td>
            </tr>
            <tr>
                <td colspan="2">门店：${obj.sectionName}</td>
            </tr>
            <tr>
                <td width="50%">电话：${obj.tel}</td>
            </tr>
            <tr>
                <td colspan="2">地址：${obj.address}</td>
            </tr>
            <tr>
                <td width="50%">日期：${obj.billsDateStr}</td>
                <td width="50%">营业员：${obj.managerName}</td>
            </tr>
            <tr>
                <td colspan="2">制单人：${obj.addMan}</td>
            </tr>
            <tr>
                <td colspan="2">备注：${obj.remark}</td>
            </tr>
            </thead>
        </table>
        <!-- 结束 单据主信息  -->

        <!-- 开始 商品信息 -->
        <c:if test="${!obj.detailList.isEmpty()}">
        <div style="margin:0 auto;font-size: 9pt;">
            -----------------------商品信息------------------------
        </div>
        <table style="border: 0;font-size: 9pt;width: 180pt;border-collapse:collapse;">
            <thead>
            <tr style="padding: 0;">
                <td style="width: 65%;text-align: left;padding: 0;">品名</td>
                <td style="width: 15%;text-align: center;padding: 0;">数量</td>
                <td style="width: 20%;text-align: right;padding: 0;">金额</td>
            </tr>
            </thead>
            <tbody>
            <c:forEach items="${obj.detailList}" var="billsDetail" varStatus="status">
                <tr style="padding: 0;">
                    <td style="padding: 0;">${billsDetail.goodsName}</td>
                    <td style="text-align: center;padding: 0;">${billsDetail.goodsCount}</td>
                    <td style="text-align: right;padding: 0;">${billsDetail.amountStr}</td>
                </tr>
                <c:if test="${billsDetail.imei!=null}">
                    <tr  style="padding: 0;">
                        <td colspan="3"  style="padding: 0;">　${billsDetail.imei}</td>
                    </tr>
                </c:if>
                <c:if test="${billsDetail.remark!=null}">
                <tr  style="padding: 0;">
                    <td colspan="3" style="padding: 0;">　备注：${billsDetail.remark}</td>
                </tr>
                </c:if>
            </c:forEach>
            </tbody>
            <tfoot>
            <tr  style="padding: 0;">
                <td style="padding: 0;">合计</td>
                <td style="text-align: center;padding: 0;">${statistics:sumByField(obj.detailList, 'goodsCount')}</td>
                <td style="text-align: right;padding: 0;">${statistics:sumByField(obj.detailList, 'amount')}</td>
            </tr>
            </tfoot>
        </table>
        </c:if>
        <!-- 结束 商品信息        -->

        <!-- 开始 运营商业务        -->
        <c:if test="${!obj.operatorList.isEmpty()}">
            <div style="margin:0 auto;font-size: 9pt;">
                ----------------------运营商业务----------------------
            </div>
            <table style="border: 0;font-size: 9pt;width: 180pt;border-collapse:collapse;" bordercolor="black">
                <thead>
                <tr style="padding: 0">
                    <td style="width: 75%;text-align: left; padding:0;">业务名称</td>
                    <td style="width: 25%;text-align: right; padding:0;">实际收款</td>
                </tr>
                </thead>
                <tbody>
                <c:forEach items="${obj.operatorList}" var="billsDetail" varStatus="status">
                    <tr style="padding: 0;">
                        <td style="text-align: left; padding:0;">${billsDetail.busName}</td>
                        <td style="text-align: right; padding:0;">${billsDetail.amountStr}</td>
                    </tr>
                     <c:if test="${billsDetail.remark!=null}">
                    <tr style="padding: 0;">
                        <td colspan="2" style="text-align: left; padding:0;">　备注：${billsDetail.remark}</td>
                    </tr>
                    </c:if>
                </c:forEach>
                </tbody>
                <tfoot>
                <tr style="padding: 0">
                    <td style="text-align: left; padding:0;">合计</td>
                    <td style="text-align: right; padding:0;">${statistics:sumByField(obj.operatorList, 'busAmount')}</td>
                </tr>
                </tfoot>
            </table>
        </c:if>
        <!-- 结束 运营商业务        -->


        <!-- 开始 增值服务        -->
        <c:if test="${!obj.serviceList.isEmpty()}">
            <div style="margin:0 auto;font-size: 9pt;">
                ------------------------增值服务-----------------------
            </div>
            <table style="border: 0;font-size: 9pt;width: 180pt;border-collapse:collapse;" bordercolor="black">
                <thead>
                <tr style="padding: 0">
                    <td style="width: 75%;text-align: left; padding:0;">增值服务名称</td>
                    <td style="width: 25%;text-align: right; padding:0;">实际收款</td>
                </tr>
                </thead>
                <tbody>
                <c:forEach items="${obj.serviceList}" var="billsDetail" varStatus="status">
                    <tr style="padding: 0">
                        <td style="padding: 0">${billsDetail.serviceName}</td>
                        <td style="text-align: right; padding: 0;">${billsDetail.amountStr}</td>
                    </tr>
                    <c:if test="${billsDetail.remark!=null}">
                    <tr style="padding: 0;">
                        <td colspan="2" style="text-align: left;padding: 0">　备注：${billsDetail.remark}</td>
                    </tr>
                    </c:if>
                </c:forEach>
                </tbody>
                <tfoot>
                <tr style="padding: 0;">
                    <td style="padding: 0;">合计</td>
                    <td style="text-align: right; padding: 0;">${statistics:sumByField(obj.serviceList, 'serviceAmount')}</td>
                </tr>
                </tfoot>
            </table>
        </c:if>
        <!-- 结束 增值服务        -->


        <!-- 开始 第三方抵扣        -->
        <c:if test="${!obj.couponList.isEmpty()}">
            <div style="margin:0 auto;font-size: 9pt;">
                ----------------------第三方抵扣----------------------
            </div>
            <table style="border: 0;font-size: 9pt;width: 180pt;border-collapse:collapse;" bordercolor="black">
                <thead>
                <tr style="padding: 0">
                    <td style="width: 75%;text-align: left; padding: 0;">活动名称</td>
                    <td style="width: 25%;text-align: right; padding: 0;">抵现金额</td>
                </tr>
                </thead>
                <tbody>
                <c:forEach items="${obj.couponList}" var="billsDetail" varStatus="status">
                    <tr style="padding: 0;">
                        <td style="text-align: left; padding: 0;">${billsDetail.couponName}</td>
                        <td style="text-align: right; padding: 0;">${billsDetail.amountStr}</td>
                    </tr>
                     <c:if test="${billsDetail.remark!=null}">
                    <tr style="padding: 0;">
                        <td colspan="2" style="text-align: left; padding: 0;">　备注：${billsDetail.remark}</td>
                    </tr>
                    </c:if>
                </c:forEach>
                </tbody>
                <tfoot>
                <tr style="padding: 0;">
                    <td style="padding: 0;">合计</td>
                    <td style="text-align: right;padding: 0;">${statistics:sumByField(obj.couponList, 'amount')}</td>
                </tr>
                </tfoot>
            </table>
        </c:if>
        <!-- 结束 第三方抵扣        -->


        <!-- 开始 分期业务        -->
        <c:if test="${!obj.installList.isEmpty()}">
            <div style="margin:0 auto;font-size: 9pt;">
                ------------------------分期业务-----------------------
            </div>
            <table style="border: 0;font-size: 9pt;width: 180pt;border-collapse:collapse;" bordercolor="black">
                <thead>
                <tr style="padding: 0;">
                    <td style="width: 40%;text-align: left; padding:0;">业务名称</td>
                    <td style="width: 25%;text-align: right; padding:0;">分期金额</td>
                </tr>
                </thead>
                <tbody>
                <c:forEach items="${obj.installList}" var="billsDetail" varStatus="status">
                    <tr style="padding: 0;">
                        <td style="text-align: left; padding:0;">${billsDetail.instalName}</td>
                        <td style="text-align: right; padding:0;">${billsDetail.amountStr}</td>
                    </tr>
                    <c:if test="${billsDetail.remark!=null}">
                    <tr style="padding: 0;">
                        <td colspan="2" style="text-align: left; padding:0;">　备注：${billsDetail.remark}</td>
                    </tr>
                    </c:if>
                </c:forEach>
                </tbody>
                <tfoot>
                <tr style="padding:0;">
                    <td style="padding:0;">合计</td>
                    <td style="text-align: right; padding:0;">${statistics:sumByField(obj.installList, 'amount')}</td>
                </tr>
                </tfoot>
            </table>
            <table style="border: 0;width: 180pt;border-collapse:collapse;font-size: 9pt;" bordercolor="black">
                <thead>
                <tr style="padding: 0;">
                    <td style="width:50%;text-align: left;padding:0;">
                        其中首付合计:
                    </td>
                    <td style="width:50%;text-align: right;padding:0;">
                            ${statistics:sumByField(obj.installList, 'installAmount')}
                    </td>
                </tr>
                </thead>
            </table>
        </c:if>
        <!-- 结束 分期业务        -->


        <!-- 开始 收款信息        -->
        <div style="margin:0 auto;font-size: 9pt;">
            ------------------------收款信息-----------------------
        </div>


        <!-- 开始 应收信息        -->

        <table style="border: 0;width: 180pt;font-size: 9pt;border-collapse:collapse;" bordercolor="black">
            <thead>
            <tr style="padding: 0">
                <td style="width:50%;text-align: left;padding:0;">
                    应收
                </td>
                <td style="width:50%;text-align: right;padding:0;">
                    ${obj.totGoodsAmount}
                </td>
            </tr>
            <tr style="padding: 0;">
                <td style="width:50%;text-align: left;padding:0;">
                    　　总金额:
                </td>
                <td style="width:50%;text-align: right;padding:0;">
                    ${obj.totAmount}
                </td>
            </tr>
            <tr style="padding: 0;">
                <td style="width:50%;text-align: left;padding:0;">
                    　　零售定金:
                </td>
                <td style="width:50%;text-align: right;padding:0;">
                    ${obj.totDepostitAmount}
                </td>
            </tr>
            <tr style="padding: 0;">
                <td style="width:50%;text-align: left;padding:0;">
                    　　分期贷款金额:
                </td>
                <td style="width:50%;text-align: right;padding:0;">
                   ${obj.totInstallAmount}
                </td>
            </tr>
            <tr style="padding: 0;">
                <td style="width:50%;text-align: left;padding:0;">
                    　　抵现金额:
                </td>
                <td style="width:50%;text-align: right;padding:0;">
                    <c:choose>
                        <c:when test="${statistics:sumByField(obj.couponList, 'amount')==''}">
                            0.00
                        </c:when>
                        <c:otherwise>
                            ${statistics:sumByField(obj.couponList, 'amount')}
                        </c:otherwise>
                    </c:choose>
                </td>
            </tr>
            <tr style="padding: 0;">
                <td style="width:50%;text-align: left;padding:0;">
                    　　抹零金额:
                </td>
                <td style="width:50%;text-align: right;padding:0;">
                    ${obj.reduceAmout}
                </td>
            </tr>
            </thead>
        </table>
        <!-- 结束 应收信息        -->


        <!-- 开始 实收信息        -->

        <table style="border: 0;width: 180pt;font-size: 9pt;border-collapse:collapse;" bordercolor="black">
            <thead>
            <tr style="padding: 0;">
                <td style="width:50%;text-align: left;padding:0;">
                    实收
                </td>
                <td style="width:50%;text-align: right;padding:0;">
                    ${obj.totPayAmount}
                </td>
            </tr>
            <c:forEach items="${obj.payreceiptList}" var="billsDetail" varStatus="status">
                <tr style="padding: 0;">
                    <td style="width:70%;text-align: left;padding:0;">
                        　　${billsDetail.accountTypeName}:
                    </td>
                    <td style="width:30%;text-align: right;padding:0;">
                            ${billsDetail.amountStr}
                    </td>
                </tr>
            </c:forEach>
            <c:if test="${obj.promotionAccount != '0.00'}">
                 <tr style="padding: 0;">
                    <td style="width:70%;text-align: left;padding:0;">
                        　               &nbsp;&nbsp;&nbsp;促销券:
                    </td>
                    <td style="width:30%;text-align: right;padding:0;">
                            ${obj.promotionAccount}
                    </td>
                 </tr>
            </c:if>
            <tr style="padding: 0;">
                <td style="width:70%;text-align: left;padding:0;">
                    欠款
                </td>
                <td style="width:30%;text-align: right;padding:0;">
                    ${obj.totDebtAmount}
                </td>
            </tr>
            </thead>
        </table>
        <!-- 结束 实收信息        -->

        <!-- 结束 收款信息        -->


        <!-- 开始 扫码支付信息        -->
        <c:if test="${null!=obj.payResultVo}">
        <div style="margin:0 auto;font-size: 9pt;">
            ---------------------扫码支付信息--------------------
        </div>

        <table style="border: 0;width: 180pt;font-size: 9pt;border-collapse:collapse;" bordercolor="black">
            <thead>
            <tr style="padding: 0;">
                <td style="width:100%;text-align: left;padding:0;">
                    优惠后交易金额：${obj.payResultVo.transactionAmount}
                </td>
            </tr>
            <tr style="padding: 0;">
                <td style="width:100%;text-align: left;padding:0;">
                    银商订单号：${obj.payResultVo.orderId}
                </td>
            </tr>
            <tr style="padding: 0;">
                <td style="width:100%;text-align: left;padding:0;">
                    第三方名称：${obj.payResultVo.thirdPartyName}
                </td>
            </tr>
            </thead>
        </table>
        </c:if>
        <!-- 结束 扫码支付信息        -->


        <!-- 开始 零售小票说明      -->
        <c:if test="${obj.retailExplain!=null}">
        <div style="margin:0 auto;font-size: 9pt;">
            --------------------------说明---------------------------
        </div>

        <div style="margin:0;width: 180pt;text-align: left;font-size: 9pt;">
            ${obj.retailExplain}
        </div>
        </c:if>
        <!-- 结束 零售小票说明        -->


        <!-- 开始 客户信息        -->
        <div style="margin:0 auto;font-size: 9pt;">
            ------------------------客户信息-----------------------
        </div>

        <table style="border: 0;width: 180pt;font-size: 9pt;border-collapse:collapse;" bordercolor="black">
            <thead>
            <tr style="padding: 0;">
                <td style="text-align: left;padding:0;">
                    客户姓名：${obj.memberName}
                </td>
            </tr>
            <tr style="padding: 0;">
                <td style="text-align: left;padding:0;">
                    客户电话：${obj.memberTelephone}
                </td>
            </tr>
            <tr style="padding: 0;">
                <td style="text-align: left;padding:0;">
                    会员类型：${obj.memberType}
                </td>
            </tr>
            <tr style="padding: 0;">
                <td style="text-align: left;padding:0;">
                    会员积分：${obj.mScore}
                </td>
            </tr>
            <tr style="padding: 0;">
                <td style="text-align: right;padding:0;">
                    客户签名:_________________
                </td>
            </tr>
            </thead>
        </table>
        <!-- 结束 客户信息        -->

        <!-- 开始 打印时间        -->
        <div style="margin:0 auto;font-size: 9pt;">
            打印时间：${obj.printingTime}
        </div>
        <!-- 结束 打印时间        -->

    </div>

    <!-- 结束小票 -->


    <!-- 开始 聚合收款 商户存根联 -->
    <div id="unionPayPrintDIV" style="width: 180pt;">

        <!-- 单据名称 -->
        <div style="text-align: center;font-size: 12pt;margin-bottom: 2mm;">
            聚合收款（商户存根联）
        </div>

        <!-- 开始 聚合收款信息        -->
        <table style="border: 0;width: 180pt;font-size: 9pt;border-collapse:collapse;text-align: left;" bordercolor="black">
            <thead>
            <tr style="padding: 0;">
                <td style="padding: 0;">
                    门店：${obj.sectionName}
                </td>
            </tr>
            <tr style="padding: 0;">
                <td style="padding: 0;">
                    交易金额：${obj.payResultVo.transactionAmount}
                </td>
            </tr>
            <tr style="padding: 0;">
                <td style="padding: 0;">
                    资金账户：${obj.payResultVo.accountName}
                </td>
            </tr>
            <tr style="padding: 0;">
                <td style="padding: 0;">
                    商户编号：${obj.payResultVo.merchantCode}
                </td>
            </tr>
            <tr style="padding: 0;">
                <td style="padding: 0;">
                    终端号：${obj.payResultVo.terminalCode}
                </td>
            </tr>
            <tr style="padding: 0;">
                <td style="padding: 0;">
                    商户订单号：${obj.billsCode}
                </td>
            </tr>
            <tr style="padding: 0;">
                <td style="padding: 0;">
                    收款单号：${obj.payResultVo.payBillsCode}
                </td>
            </tr>
            <tr style="padding: 0;">
                <td style="padding: 0;">
                    单据日期：${obj.payResultVo.billsDate}
                </td>
            </tr>
            <tr style="padding: 0;">
                <td style="padding: 0;">
                    收款操作人：${obj.payResultVo.payMan}
                </td>
            </tr>
            <tr style="padding: 0;">
                <td style="padding: 0;">
                    收款操作时间：${obj.payResultVo.payTime}
                </td>
            </tr>
            <tr style="padding: 0;">
                <td style="padding: 0;">
                    银商订单号：${obj.payResultVo.orderId}
                </td>
            </tr>
            <tr style="padding: 0;">
                <td style="padding: 0;">
                    检查参考号：${obj.payResultVo.retrievalRefNum}
                </td>
            </tr>
            <tr style="padding: 0;">
                <td style="padding: 0;">
                    第三方名称：${obj.payResultVo.thirdPartyName}
                </td>
            </tr>
            <tr style="padding: 0;">
                <td style="padding: 0;">
                    第三方优惠说明：${obj.payResultVo.thirdPartyDiscountInstruction}
                </td>
            </tr>
            <tr style="padding: 0;">
                <td style="padding: 0;">
                    营销联盟优惠后交易金额：${obj.payResultVo.actualTransactionAmount}
                </td>
            </tr>
            <tr style="padding: 0;">
                <td style="padding: 0;">
                    实际支付金额：${obj.payResultVo.amount}
                </td>
            </tr>
            <tr style="padding: 0;">
                <td style="padding: 0;">
                    交易时间：${obj.payResultVo.transactionTime}
                </td>
            </tr>
            </thead>
        </table>
        <!-- 结束 聚合收款信息        -->


        <!-- 开始 客户信息        -->
        <div style="margin:0 auto;font-size: 9pt;text-align: center;">
            ------------------------客户信息-----------------------
        </div>

        <table style="border: 0;width: 180pt;font-size: 9pt;border-collapse:collapse;" bordercolor="black">
            <thead>
            <tr style="padding: 0;">
                <td style="text-align: left;padding: 0;">
                    客户姓名：${obj.memberName}
                </td>
            </tr>
            <tr style="padding: 0;">
                <td style="text-align: left;padding: 0;">
                    客户电话：${obj.memberTelephone}
                </td>
            </tr>
            <tr style="padding: 0;">
                <td style="text-align: right;padding: 0;">
                    客户签名:_________________
                </td>
            </tr>
            </thead>
        </table>
        <!-- 结束 客户信息        -->

        <!-- 开始 打印时间        -->
        <div style="margin:0 auto;font-size: 9pt;">
            打印时间：${obj.printingTime}
        </div>
        <!-- 结束 打印时间        -->

    </div>

</div>