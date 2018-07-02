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
    <title>供应商保价单-串号明细</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	
	<!-- 引入文件 -->
	<jsp:include page="../../../Include/print.jsp"></jsp:include>
	<script type="text/javascript">
	function print(){
		$("#mainVoDIV").jqprint({
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

		<!-- 打印区  - 默认 -->
		<!-- 打印区 -->
		<div id="billsDIV" style="width: 188mm;position: relative;">
		
		
	<c:if test="${mainVo.billsStatus == 6}">
		<img src="${basePath }/images/status/statusPass.png" width="80" height="80" style="position:absolute;top: 1mm;right: 15px;">	
		</c:if>
		<c:if test="${mainVo.billsStatus == 7}">
		<img src="${basePath }/images/status/statusRed.png" width="80" height="80" style="position:absolute;top: 1mm;right: 15px;">	
	    </c:if>

		<c:if test="${mainVo.isAudit == 1}">
			<img src="${basePath }/images/audit.png" width="80" height="80" style="position:absolute;top: 1mm;right: 100px;">
		</c:if>
		<c:if test="${mainVo.isAudit == 0}">
			<img src="${basePath }/images/auditNo.png" width="80" height="80" style="position:absolute;top: 1mm;right: 100px;">
		</c:if>
		
		<!-- 单据名称 -->
		<div style="text-align: center;font-size: 5mm;margin-bottom: 2mm;">
		  ${companyName}供应商保价单
		</div>
		
		<!-- 单据表头 -->
	    <div style="font-size: 3mm;">
			<div class="form-group" style="width: 62mm;float: left;margin-bottom: 1mm;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;position: relative;float: left;">
			     单据编号:
			  </label>
			  <span style="padding-left: 3px;padding-right: 0px;">
			  ${mainVo.billsCode}
			  </span>
			</div>
			<div class="form-group" style="width: 62mm;float: left;margin-bottom: 1mm;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;position: relative;float: left;">
			    单据日期:
			  </label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
			 ${mainVo.billsDate}
			  </span>
			</div>
			<div class="form-group" style="width: 62mm;float: left;margin-bottom: 1mm;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;position: relative;float: left;">
			     部门名称:
			  </label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
			  ${mainVo.sectionName}
			  </span>
			</div>
			<div class="form-group" style="width: 62mm;float: left;margin-bottom: 1mm;">
				<label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;position: relative;float: left;">
					经手人:
				</label>
				<span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
					${mainVo.managerName}
				</span>
			</div>

			<div class="form-group" style="width: 62mm;float: left;margin-bottom: 1mm;">
				<label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;position: relative;float: left;">
					往来单位:
				</label>
				<span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
					${mainVo.contactsunitName}
				</span>
			</div>
			<div class="form-group" style="width: 62mm;float: left;margin-bottom: 1mm;">
				<label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;position: relative;float: left;">
					应付余额:
				</label>
				<span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
					 <fmt:formatNumber value="${mainVo.yingfAmount}" pattern="#,##0.00"/>
				</span>
			</div>

			<div class="form-group" style="width: 62mm;float: left;margin-bottom: 1mm;">
				<label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;position: relative;float: left;">
					预付余额:
				</label>
				<span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
					<fmt:formatNumber value="${mainVo.yufAmount}" pattern="#,##0.00"/>
				</span>
			</div>

			<div class="form-group" style="width: 62mm;float: left;margin-bottom: 1mm;">
				  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;position: relative;float: left;">
					 单据备注:
				  </label>
				  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
					${mainVo.remark}
				  </span>
			</div>	
	    </div>
		<!-- 打印区  - 串号明细 -->
		<c:if test="${tempKind == 'default'}">
			<!-- 单据明细 -->
			<table class="table table-bordered" style="word-break: break-all; word-wrap:break-word;border-color:black !important;">
				<thead>
					<tr style="padding: 0;">
						<th style="padding: 0;font-size: 3mm;font-weight: bold;width: 13mm;text-align: center;border-color:black !important;">序号</th>
						<th style="padding: 0;font-size: 3mm;font-weight: bold;width: 13mm;text-align: center;border-color:black !important;">商品名称</th>
						<th style="padding: 0;font-size: 3mm;font-weight: bold;text-align: center;border-color:black !important;">串号/数量</th>
						<th style="padding: 0;font-size: 3mm;font-weight: bold;text-align: center;border-color:black !important;">原财务成本</th>
						<th style="padding: 0;font-size: 3mm;font-weight: bold;text-align: center;border-color:black !important;">保价差额</th>
						<th style="padding: 0;font-size: 3mm;font-weight: bold;text-align: center;border-color:black !important;">原后财务成本</th>
						<th style="padding: 0;font-size: 3mm;font-weight: bold;text-align: center;border-color:black !important;">备注</th>
					</tr>
				</thead>
				<tbody>
					<c:set var="count" value="0"></c:set>
					<c:set var="allCount" value="0"></c:set>
					<c:forEach items="${mainVo.detailList}" var="mainVoDetail" >
						<c:if test="${mainVoDetail.valuationMethods == 1}">
							<c:forEach items="${mainVoDetail.imeiList}" var="imeiItem" >
								<c:set var="count" value="${count + 1}"></c:set>
								<c:set var="allCount" value="${allCount + 1}"></c:set>
								<tr style="padding: 0;">
									<td style="padding: 0;font-size: 3mm;text-align:center;border-color:black !important;">${count}</td>
									<td style="padding: 0;font-size: 3mm;text-align:center;border-color:black !important;">${mainVoDetail.goodsName}</td>
									<td style="padding: 0;font-size: 3mm;text-align:center;border-color:black !important;">${imeiItem.imei}</td>
									<td style="padding: 0;font-size: 3mm;text-align:center;border-color:black !important;"><fmt:formatNumber type="number" maxFractionDigits="2" value="${imeiItem.costPrice}"/></td>
									<td style="padding: 0;font-size: 3mm;text-align:center;border-color:black !important;"><fmt:formatNumber type="number" maxFractionDigits="2" value="${imeiItem.rePriceBalance}"/></td>
									<td style="padding: 0;font-size: 3mm;text-align:center;border-color:black !important;"><fmt:formatNumber type="number" maxFractionDigits="2" value="${imeiItem.rePriceCost}"/></td>
									<td style="padding: 0;font-size: 3mm;text-align:center;border-color:black !important;">${imeiItem.remark}</td>
								</tr>
							</c:forEach>
						</c:if>

						<c:if test="${mainVoDetail.valuationMethods == 2}">
								<c:set var="count" value="${count + 1}"></c:set>
								<c:set var="allCount" value="${allCount + mainVoDetail.goodsNumber}"></c:set>
								<tr style="padding: 0">
									<td style="padding: 0;font-size: 3mm;text-align:center;border-color:black !important;">${count}</td>
									<td style="padding: 0;font-size: 3mm;text-align:center;border-color:black !important;">${mainVoDetail.goodsName}</td>
									<td style="padding: 0;font-size: 3mm;text-align:center;border-color:black !important;">${mainVoDetail.goodsNumber}(个数)</td>
									<td style="padding: 0;font-size: 3mm;text-align:center;border-color:black !important;">-</td>
									<td style="padding: 0;font-size: 3mm;text-align:center;border-color:black !important;"><fmt:formatNumber type="number" maxFractionDigits="2" value="${mainVoDetail.rePriceBalance}"/></td>
									<td style="padding: 0;font-size: 3mm;text-align:center;border-color:black !important;">-</td>
									<td style="padding: 0;font-size: 3mm;text-align:center;border-color:black !important;">${imeiItem.remark}</td>
								</tr>

						</c:if>


					</c:forEach>
					<tr style="padding: 0;">
						<td align="center" style="padding: 0;font-size: 4mm;font-weight: bold;border-color:black !important;"  colspan="2">合计</td>
						<td style="padding: 0;font-size: 3mm;font-weight: bold;text-align: center;border-color:black !important;">${allCount}</td>
						<td style="padding: 0;font-size: 3mm;font-weight: bold;text-align: center;border-color:black !important;">${statistics:sumByField(mainVo.detailList, 'costPrice')}</td>
						<td style="padding: 0;font-size: 3mm;font-weight: bold;text-align: center;border-color:black !important;">${statistics:sumByField(mainVo.detailList, 'rePriceBalance')}</td>
						<td style="padding: 0;font-size: 3mm;font-weight: bold;text-align: center;border-color:black !important;">${statistics:sumByField(mainVo.detailList, 'rePriceCost')}</td>
						<td style="padding: 0;font-size: 3mm;font-weight: bold;text-align: right;border-color:black !important;"></td>
					</tr>

				</tbody>
			</table>
		</c:if>
			<!-- 打印区  - 商品汇总 -->
		<c:if test="${tempKind != 'default'}">
				<!-- 单据明细 -->
				<table class="table table-bordered" style="word-break: break-all; word-wrap:break-word;border-color:black !important;">
					<thead>
					<tr style="padding: 0;">
						<th style="padding: 0;font-size: 3mm;font-weight: bold;width: 13mm;text-align: center;border-color:black !important;">序号</th>
						<th style="padding: 0;font-size: 3mm;font-weight: bold;width: 13mm;text-align: center;border-color:black !important;">商品名称</th>
						<th style="padding: 0;font-size: 3mm;font-weight: bold;text-align: center;border-color:black !important;">数量</th>
						<th style="padding: 0;font-size: 3mm;font-weight: bold;text-align: center;border-color:black !important;">保价均差</th>
						<th style="padding: 0;font-size: 3mm;font-weight: bold;text-align: center;border-color:black !important;">保价总差额</th>

						<th style="padding: 0;font-size: 3mm;font-weight: bold;text-align: center;border-color:black !important;">备注</th>
					</tr>
					</thead>
					<tbody>
					<c:set var="count" value="0"></c:set>
					<c:set var="goodsNumberAmount" value="0"></c:set>
					<c:forEach items="${mainVo.detailList}" var="mainVoDetail" >
						<c:set var="count" value="${count + 1}"></c:set>
						<c:set var="goodsNumberAmount" value="${goodsNumberAmount + mainVoDetail.goodsNumber}"></c:set>
						<tr style="padding: 0;">
							<td style="padding: 0;font-size: 3mm;text-align:center;border-color:black !important;">${count}</td>
							<td style="padding: 0;font-size: 3mm;text-align:center;border-color:black !important;">${mainVoDetail.goodsName}</td>
							<td style="padding: 0;font-size: 3mm;text-align:center;border-color:black !important;">${mainVoDetail.goodsNumber}</td>
							<td style="padding: 0;font-size: 3mm;text-align:center;border-color:black !important;">
								<fmt:formatNumber type="number" maxFractionDigits="2" value="${mainVoDetail.rePriceBalance/mainVoDetail.goodsNumber}"/>
							</td>
							<td style="padding: 0;font-size: 3mm;text-align:center;border-color:black !important;">
								<fmt:formatNumber type="number" maxFractionDigits="2" value="${mainVoDetail.rePriceBalance}"/>
							</td>
							<td style="padding: 0;font-size: 3mm;text-align:center;border-color:black !important;">${mainVoDetail.remark}</td>
						</tr>
						<%--（带串号）--%>
						<c:if test="${tempKind == 'sumImei'}">
							<c:if test="${mainVoDetail.valuationMethods == 1}">
								<c:set var="imei" value=""></c:set>
								<c:forEach items="${mainVoDetail.imeiList}" var="imeiItem" >
									<c:set var="imei" value="${imei}${imeiItem.imei},"></c:set>
								</c:forEach>
								<c:set var="imeiLen" value="${fn:length(imei)}"></c:set>
								<tr style="padding: 0;">
									<td style="padding: 0;font-size: 3mm;text-align:left;height: auto;border-color:black !important;"  colspan="6">
										${fn:substring(imei, 0, imeiLen-1)}
									</td>
								</tr>
							</c:if>
						</c:if>
					</c:forEach>
					<tr style="padding: 0;">
						<td align="center" style="padding: 0;font-size: 4mm;font-weight: bold;border-color:black !important;"  colspan="2">合计</td>
						<td style="padding: 0;font-size: 3mm;font-weight: bold;text-align: center;border-color:black !important;">${goodsNumberAmount}</td>
						<td style="padding: 0;font-size: 3mm;font-weight: bold;text-align: center;border-color:black !important;"></td>
						<td style="padding: 0;font-size: 3mm;font-weight: bold;text-align: center;border-color:black !important;">${statistics:sumByField(mainVo.detailList, 'rePriceBalance')}</td>
						<td style="padding: 0;font-size: 3mm;font-weight: bold;text-align: right;border-color:black !important;"></td>
					</tr>

					</tbody>
				</table>
			</c:if>

		<!-- 单据表尾 -->
	    <div id="formBottom" style="font-size: 3mm;">
			<div class="form-group" style="width: 46mm;float: left;">
				<label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 25mm;">
					制单人:
				</label>
				<span style="padding-left: 3px;padding-right: 0px;width: 20mm;">
						${mainVo.createByName}
				</span>
			</div>
			<div class="form-group" style="width: 46mm;float: left;">
				<label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 25mm;">
					修改人:
				</label>
				<span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;width: 20mm;">
						${mainVo.updateByName}
				</span>
			</div>
			<div class="form-group" style="width: 46mm;float: left;">
				<label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 25mm;">
					过账人:
				</label>
				<span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;width: 20mm;">
						${mainVo.postByName}
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
