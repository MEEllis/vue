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
	<title>零售单打印</title>

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

<body style="padding: 10px;font-family: 微软雅黑,宋体;color: #000000;">

<nav class="navbar navbar-default" role="navigation" style="width: 270mm;">
	<div class="container-fluid">
		<div class="nav navbar-nav navbar-right" style="margin: 0px;">
			<button type="button" class="btn btn-default navbar-btn" onclick="print()" style="margin-left: 10px;">打印测试</button>
		</div>
	</div>
</nav><!-- /E 工具栏结束  -->
<!-- 打印区  - 不显示串号 -->

	<!-- 打印区 -->
	<div id="billsDIV" style="width: 268mm;position: relative;font-size: 4.5mm;">

		<!-- 单据状态图标 -->
		<c:if test="${status != ''}">
			<img src="${basePath}/images/status/${status}" width="120mm" height="120mm" style="position:absolute;top: 1mm;right: 20px;">
		</c:if>

		<!-- 单据名称 -->
		<div style="text-align: center;font-size: 6mm;margin-bottom: 2mm;">
				零售单
		</div>

		<!-- 单据表头 -->
		<div style="overflow: hidden;">

			<div  style="width: 89mm;float: left;margin-bottom: 1mm;">
				<label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 22mm;text-align: right;position: relative;float: left;margin-bottom: 0;">
					单据编号:
				</label>
				<span style="padding-left: 3px;padding-right: 0px;">
					${bills.billsCode}
				</span>
			</div>
			<div  style="width: 89mm;float: left;margin-bottom: 1mm;">
				<label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 22mm;text-align: right;position: relative;float: left;margin-bottom: 0;">
					单据日期:
				</label>
				<span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
					${bills.billsDateStr}
				</span>
			</div>
			<div  style="width: 89mm;float: left;margin-bottom: 1mm;">
				<label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 22mm;text-align: right;position: relative;float: left;margin-bottom: 0;">
					门店:
				</label>
				<span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
					${sectionName}
				</span>
			</div>

			<div style="clear: left;"></div>
			<div  style="width: 89mm;float: left;margin-bottom: 1mm;">
				<label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 22mm;text-align: right;position: relative;float: left;margin-bottom: 0;">
					营业员:
				</label>
				<span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
						${bills.managerName}
				</span>
			</div>
			<div  style="width: 178mm;float: left;margin-bottom: 1mm;">
				<label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 22mm;text-align: right;position: relative;float: left;margin-bottom: 0;">
					单据备注:</label>
				<span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
						${bills.remark }
				</span>
			</div>
		</div>

		<!-- 单据明细 -->
		<table class="table table-bordered" style="width:210mm;margin-bottom: 3px;font-size: 4mm; word-break: break-all;word-wrap:break-word;border-collapse: collapse;  border-spacing: 0;" bordercolor="black">
			<thead>
			<tr style="padding: 0;">
				<th style="padding: 0;font-weight: bold;width: 13mm;text-align: center;border: 1px solid #000;">序号</th>
				<th style="padding: 0;font-weight: bold;text-align: center;border: 1px solid #000;">商品名称</th>
				<th style="padding: 0;font-weight: bold;text-align: center;border: 1px solid #000;">串号</th>
				<th style="padding: 0;font-weight: bold;text-align: center;border: 1px solid #000;">数量</th>
				<th style="padding: 0;font-weight: bold;text-align: center;border: 1px solid #000;">单价</th>
				<th style="padding: 0;font-weight: bold;text-align: center;border: 1px solid #000;">金额</th>
				<th style="padding: 0;font-weight: bold;text-align: center;border: 1px solid #000;">备注</th>
			</tr>
			</thead>
			<tbody>
			<c:forEach items="${bills.detailList}" var="billsDetail" varStatus="status">
				<tr style="padding: 0;">
					<td style="padding: 0;text-align:center;border: 1px solid #000;">${status.count}</td>
					<td style="padding: 0;text-align:center;border: 1px solid #000;">${billsDetail.goodsName}</td>
					<td style="padding: 0;text-align:center;border: 1px solid #000;">${billsDetail.imei}</td>
					<td style="padding: 0;text-align:center;border: 1px solid #000;">${billsDetail.goodsCount}</td>
					<td style="padding: 0;text-align:center;border: 1px solid #000;"><fmt:formatNumber value="${billsDetail.disPrice}" pattern="#,##0.00"/></td>
					<td style="padding: 0;text-align:center;border: 1px solid #000;"><fmt:formatNumber value="${billsDetail.amount}" pattern="#,##0.00"/></td>
					<td style="padding: 0;text-align:center;border: 1px solid #000;">${billsDetail.remark}</td>
				</tr>
			</c:forEach>
			<tr style="padding: 0;">
				<td align="center" style="padding: 0;font-weight: bold;border: 1px solid #000;" colspan="3">合计</td>
				<td style="padding: 0;font-weight: bold;text-align: center;border: 1px solid #000;">${goodsCountSum}</td>
				<td style="padding: 0;font-weight: bold;text-align: center;border: 1px solid #000;"></td>
				<td style="padding: 0;font-weight: bold;text-align: center;border: 1px solid #000;">${statistics:sumByField(bills.detailList, 'amount')}</td>
				<td style="padding: 0;font-weight: bold;text-align: center;border: 1px solid #000;"></td>
			</tr>

			</tbody>
		</table>

		<div style="overflow: hidden;">
			<div style="width: 53.5mm;float: left;">
				<label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 22mm;">
					增值服务:
				</label>
				<span style="padding-left: 3px;padding-right: 0px;width: 20mm;">
						${statistics:sumByField(bills.serviceList, 'serviceAmount')}
				</span>
			</div>
			<div  style="width: 53.5mm;float: left;">
				<label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 22mm;">
					业务办理:
				</label>
				<span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;width: 20mm;">
						${statistics:sumByField(bills.operatorList, 'busAmount')}
				</span>
			</div>
			<div  style="width: 53.5mm;float: left;">
				<label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 22mm;">
					总金额:
				</label>
				<span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;width: 20mm;">
			  <fmt:formatNumber value="${bills.totAmount}" pattern="#,##0.00"/>
			  </span>
			</div>
			<div  style="width: 53.5mm;float: left;">
				<label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 22mm;">
					抵扣金额:
				</label>
				<span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;width: 20mm;">
						${statistics:sumByField(bills.couponList, 'amount')}
				</span>
			</div>
			<div  style="width: 53.5mm;float: left;">
				<label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 22mm;">
					分期贷款:
				</label>
				<span style="padding-left: 3px;padding-right: 0px;width: 20mm;">
			  	<fmt:formatNumber value="${bills.totInstallAmount}" pattern="#,##0.00"/>
			  </span>
			</div>

			<div  style="width: 53.5mm;float: left;">
				<label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 22mm;">
					抹零金额:
				</label>
				<span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;width: 20mm;">
			  	<fmt:formatNumber value="${bills.reduceAmout}" pattern="#,##0.00"/>
			  </span>
			</div>
			<div  style="width: 53.5mm;float: left;">
				<label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 22mm;">
					折扣定金:
				</label>
				<span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;width: 20mm;">
			  	<fmt:formatNumber value="${bills.totDepostitAmount}" pattern="#,##0.00"/>
			  </span>
			</div>
			<div  style="width: 53.5mm;float: left;">
				<label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 22mm;">
					应收金额:
				</label>
				<span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;width: 20mm;">
			  	<fmt:formatNumber value="${bills.totGoodsAmount}" pattern="#,##0.00"/>
			  </span>
			</div>
			<div  style="width: 53.5mm;float: left;">
				<label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 22mm;">
					实收金额:
				</label>
				<span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;width: 20mm;">
			  	<fmt:formatNumber value="${bills.totPayAmount}" pattern="#,##0.00"/>
			  </span>
			</div>
			<div  style="width: 53.5mm;float: left;">
				<label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 22mm;">
					欠款金额:
				</label>
				<span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;width: 20mm;">
			  	<fmt:formatNumber value="${bills.totDebtAmount}" pattern="#,##0.00"/>
			  </span>
			</div>

			<c:if test="${!bills.payreceiptList.isEmpty() && bills.payreceiptList!=null}">
				<div style="float: left;">
				<label class=" control-label" style="padding-left: 1px;width: 23mm;margin-bottom: 0;">
					&ensp;支付方式:
				</label>
					<c:forEach items="${bills.payreceiptList}" var="payreceiptDetail" varStatus="status">
						<c:if test="${payreceiptDetail.payreceiptAmout !=null}">

								<span class="col-sm-8" >
									${payreceiptDetail.accountName}:${payreceiptDetail.payreceiptAmout};
							   </span>

						</c:if>
					</c:forEach>
				</div>
			</c:if>
		</div>


		<div style="overflow: hidden;padding: 3px 7px;margin-bottom: 5px;">
				${paramValue}
		</div>

		<!-- 单据表尾 -->
		<div id="formBottom" style="overflow: hidden;">
			<div  style="width: 65mm;float: left;">
				<label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 22mm;">
					制单人:
				</label>
				<span style="padding-left: 3px;padding-right: 0px;width: 20mm;">
					${bills.addMan}
				</span>
			</div>
			<div  style="width: 65mm;float: left;">
				<label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 22mm;">
					门店电话:
				</label>
				<span style="padding-left: 3px;padding-right: 0px;width: 20mm;">
					${bills.tel}
				</span>
			</div>
			<div  style="width: 135mm;float: left;">
				<label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 22mm;">
					门店地址:
				</label>
				<span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;width: 113mm;">
					${bills.address}
				</span>
			</div>
			<div  style="width: 65mm;float: left;">
				<label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 22mm;">
					客户姓名:
				</label>
				<span style="padding-left: 3px;padding-right: 0px;width: 20mm;">
						${bills.memberName}
				</span>
			</div>
			<div  style="width: 65mm;float: left;">
				<label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 22mm;">
					联系电话:
				</label>
				<span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;width: 20mm;">
						${bills.memberTelephone}
				</span>
			</div>
			<div  style="width: 65mm;float: left;">
				<label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 22mm;">
					当前积分:
				</label>
				<span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;width: 20mm;">
						${bills.mScore}
				</span>
			</div>
			<div  style="width: 64mm;float: left;">
				<label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 30mm;text-align: left;">客户签字：</label>
			</div>
		</div>

	</div>


</body>
</html>
