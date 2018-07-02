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
    <title>零售退货单打印</title>
    
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
  
  <body style="padding: 10px;color: #000;font-family: 微软雅黑,宋体;">
	
	<nav class="navbar navbar-default" role="navigation" style="width: 190mm;">
	    <div class="container-fluid">
		    <div class="nav navbar-nav navbar-right" style="margin: 0px;">
		    	<button type="button" class="btn btn-default navbar-btn" onclick="print()" style="margin-left: 10px;">打印测试</button>
		    </div>
	    </div>
	</nav><!-- /E 工具栏结束  -->
	<!-- 打印区  - 不显示串号 -->
	<c:if test="${printType == 'default'}">
		<!-- 打印区 -->
		<div id="billsDIV" style="width: 188mm;position: relative;">
	
		<!-- 单据状态图标 -->
		<c:if test="${status != ''}">
		<img src="${basePath}/images/status/${status}" width="80" height="80" style="position:absolute;top: 1mm;right: 15px;">	
		</c:if>
		
		<!-- 单据名称 -->
		<div style="text-align: center;font-size: 5mm;margin-bottom: 2mm;">
		  <%--${companyName}--%>
			  零售退货单
		</div>
		
		<!-- 单据表头 -->
	    <div style="font-size: 3mm;">
			<div  style="width: 62mm;float: left;margin-bottom: 1mm;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;position: relative;float: left;margin-bottom: 0;">
			     单据编号:
			  </label>
			  <span style="padding-left: 3px;padding-right: 0px;">
			  ${bills.billsCode}
			  </span>
			</div>
			<div  style="width: 62mm;float: left;margin-bottom: 1mm;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;position: relative;float: left;margin-bottom: 0;">
			    单据日期:
			  </label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
			 ${bills.billsDateStr}
			  </span>
			</div>
			<div  style="width: 62mm;float: left;margin-bottom: 1mm;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;position: relative;float: left;margin-bottom: 0;">
			     门店:
			  </label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
			  ${sectionName}
			  </span>
			</div>
			<div style="clear: left;"></div>
			<div  style="width: 62mm;float: left;margin-bottom: 1mm;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;position: relative;float: left;margin-bottom: 0;">
			   营业员:
			  </label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
			  ${bills.managerName}
			  </span>
			</div>
			<div  style="width: 124mm;float: left;margin-bottom: 1mm;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;position: relative;float: left;margin-bottom: 0;">
			     单据备注:</label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
			  ${bills.remark }
			  </span>
			</div>	
	    </div>

		<!-- 单据明细 -->
		<table class="table table-bordered" style="margin-bottom: 3px;" bordercolor="black">
			<thead>
				<tr style="padding: 0">
					<th style="padding: 0;font-size: 3mm;font-weight: bold;width: 13mm;text-align: center;border: 1px solid #000;">序号</th>
					<th style="padding: 0;font-size: 3mm;font-weight: bold;text-align: center;border: 1px solid #000;">商品名称</th>
					<th style="padding: 0;font-size: 3mm;font-weight: bold;text-align: center;border: 1px solid #000;">串号</th>
					<th style="padding: 0;font-size: 3mm;font-weight: bold;text-align: center;border: 1px solid #000;">数量</th>
					<th style="padding: 0;font-size: 3mm;font-weight: bold;text-align: center;border: 1px solid #000;">退货单价</th>
					<th style="padding: 0;font-size: 3mm;font-weight: bold;text-align: center;border: 1px solid #000;">退款金额</th>
					<th style="padding: 0;font-size: 3mm;font-weight: bold;text-align: center;border: 1px solid #000;">备注</th>
				</tr>
			</thead>
			<tbody>
				<c:forEach items="${bills.detailList}" var="billsDetail" varStatus="status">
					<tr style="padding: 0">
						<td style="padding: 0;font-size: 3mm;text-align:center;border: 1px solid #000;">${status.count}</td>
						<td style="padding: 0;font-size: 3mm;text-align:center;border: 1px solid #000;">${billsDetail.goodsName}</td>
						<td style="padding: 0;font-size: 3mm;text-align:center;border: 1px solid #000;">${billsDetail.imei}</td>
						<td style="padding: 0;font-size: 3mm;text-align:center;border: 1px solid #000;">${billsDetail.goodsCount}</td>
						<td style="padding: 0;font-size: 3mm;text-align:center;border: 1px solid #000;"><fmt:formatNumber value="${billsDetail.disPrice}" pattern="#,##0.00"/></td>
						<td style="padding: 0;font-size: 3mm;text-align:center;border: 1px solid #000;"><fmt:formatNumber value="${billsDetail.amount}" pattern="#,##0.00"/></td>
						<td style="padding: 0;font-size: 3mm;text-align:center;border: 1px solid #000;">${billsDetail.remark}</td>
						
					</tr>
				</c:forEach>	
				<tr style="padding: 0;">
					<td align="center" style="font-size: 4mm;font-weight: bold;border: 1px solid #000;padding: 0;" colspan="3">合计</td>
					<td style="padding: 0;font-size: 3mm;font-weight: bold;text-align: center;border: 1px solid #000;">${goodsCountSum}</td>
					<td style="padding: 0;font-size: 3mm;font-weight: bold;text-align: center;border: 1px solid #000;"></td>
					<td style="padding: 0;font-size: 3mm;font-weight: bold;text-align: center;border: 1px solid #000;">${statistics:sumByField(bills.detailList, 'amount')}</td>
					<td style="padding: 0;font-size: 3mm;font-weight: bold;text-align: center;border: 1px solid #000;"></td>
				</tr>
			
			</tbody>
		</table>
		
		<div style="font-size: 3mm;overflow: hidden;">
			<div  style="width: 37.5mm;float: left;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 15mm;">
			    增值服务:
			  </label>
			  <span style="padding-left: 3px;padding-right: 0px;width: 20mm;">
			  ${statistics:sumByField(bills.serviceList, 'serviceAmount')}
			  </span>
			</div>
			<div  style="width: 37.5mm;float: left;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 15mm;">
			     业务办理:
			  </label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;width: 20mm;">
			  ${statistics:sumByField(bills.operatorList, 'busAmount')}
			  </span>
			</div>
			<div  style="width: 37.5mm;float: left;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 15mm;">
			    总金额:
			  </label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;width: 20mm;">
			   <fmt:formatNumber value="${bills.totAmount}" pattern="#,##0.00"/>
			  </span>
			</div>
			<div  style="width: 37.5mm;float: left;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 15mm;">
			     抵扣金额:
			  </label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;width: 20mm;">
			  	${statistics:sumByField(bills.couponList, 'amount')}
			  </span>
			</div>
			<div  style="width: 37.5mm;float: left;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 15mm;">
			    分期贷款:
			  </label>
			  <span style="padding-left: 3px;padding-right: 0px;width: 20mm;">
			  	<fmt:formatNumber value="${bills.totInstallAmount}" pattern="#,##0.00"/>
			  </span>
			</div>
			<div  style="width: 37.5mm;float: left;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 15mm;">
			    分期退款:
			  </label>
			  <span style="padding-left: 3px;padding-right: 0px;width: 20mm;">
			  	<fmt:formatNumber value="${refundAmountSum}" pattern="#,##0.00"/>
			  </span>
			</div>
			<div  style="width: 37.5mm;float: left;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 15mm;">
			    抹零金额:
			  </label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;width: 20mm;">
			  	<fmt:formatNumber value="${bills.reduceAmout}" pattern="#,##0.00"/>
			  </span>
			</div>
			<div  style="width: 37.5mm;float: left;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 15mm;">
			    应退金额:
			  </label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;width: 20mm;">
			  	<fmt:formatNumber value="${bills.totGoodsAmount}" pattern="#,##0.00"/>       
			  </span>
			</div>
			<div  style="width: 37.5mm;float: left;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 15mm;">
			      实际退款:
			  </label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;width: 20mm;">
			  	<fmt:formatNumber value="${bills.totPayAmount}" pattern="#,##0.00"/>
			  </span>
			</div>
			<div  style="width: 37.5mm;float: left;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 15mm;">
			      未退金额:
			  </label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;width: 20mm;">
			  	<fmt:formatNumber value="${bills.totDebtAmount}" pattern="#,##0.00"/>
			  </span>
			</div>

			<c:forEach items="${bills.payDetail}" var="payreceiptDetail" varStatus="status">
				<c:if test="${payreceiptDetail.amountStr !=null}">
					<div style="float: left;">
						<label class=" control-label" style="padding-left: 1px;width: 23mm;margin-bottom: 0;">
							&ensp;支付方式:
						</label>
						<span class="col-sm-8" >
							${payreceiptDetail.accountTypeName}:${payreceiptDetail.amountStr};
					</span>
					</div>
				</c:if>
			</c:forEach>
	    </div>
		
		<div style="font-size: 3mm;overflow: hidden;padding: 3px 0;margin-bottom: 5px;">
			${paramValue}
		</div>
		
		<!-- 单据表尾 -->
	    <div id="formBottom" style="font-size: 3mm;">
			<div  style="width: 47mm;float: left;">
				<label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 15mm;">
					制单人:
				</label>
				<span style="padding-left: 3px;padding-right: 0px;width: 20mm;">
						${bills.addMan}
				</span>
			</div>
			<div  style="width: 47mm;float: left;">
				<label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 15mm;">
					门店电话:
				</label>
				<span style="padding-left: 3px;padding-right: 0px;width: 20mm;">
						${bills.tel}
				</span>
			</div>
			<div  style="width: 93mm;float: left;">
				<label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 15mm;">
					门店地址:
				</label>
				<span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;width: 78mm;">
						${bills.address}
				</span>
			</div>

			<div  style="width: 47mm;float: left;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 15mm;">
			    客户姓名:
			  </label>
			  <span style="padding-left: 3px;padding-right: 0px;width: 20mm;">
			  	${bills.memberName}
			  </span>
			</div>
			<div  style="width: 47mm;float: left;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 15mm;">
			     联系电话:
			  </label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;width: 20mm;">
			  	${bills.memberTelephone}
			  </span>
			</div>
			<div  style="width: 47mm;float: left;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 15mm;">
			     当前积分:
			  </label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;width: 20mm;">
			  	${bills.mScore}
			  </span>
			</div>
			<div  style="width: 47mm;float: left;">
		 		<label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 20mm;text-align: left;">客户签字：</label>__________
			</div>
	    </div>
		
		</div>
	</c:if>
	
	
	<c:if test="${printType == 'xiaopiao'}">
		<!-- 打印区 -->
		<div id="billsDIV" style="width: 75mm;position: relative;">
		
		<!-- 单据名称 -->
		<div style="text-align: center;font-size: 5mm;margin-bottom: 2mm;">
		  商品销售退货清单
		</div>
		
		<!-- 单据表头 -->
	    	<div  style="width: 60mm;float: left;margin-bottom: 1mm;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;position: relative;float: left;">
			     门店:
			  </label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
			  ${sectionName}
			  </span>
			</div>
			<div  style="width: 60mm;float: left;margin-bottom: 1mm;">
				<label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;position: relative;float: left;">
					经手人:
				</label>
				<span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
						${bills.managerName}
				</span>
			</div>
			<div  style="width: 60mm;float: left;margin-bottom: 1mm;">
				<label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;position: relative;float: left;">
					制单人:
				</label>
				<span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
						${bills.addMan}
				</span>
			</div>
			<div  style="width: 60mm;float: left;margin-bottom: 1mm;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;position: relative;float: left;">
			   日期:
			  </label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
			 ${bills.billsDateStr}
			  </span>
			</div>
			<div  style="width: 60mm;float: left;margin-bottom: 1mm;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;position: relative;float: left;">
			     单据号:
			  </label>
			  <span style="padding-left: 3px;padding-right: 0px;">
			  ${bills.billsCode}
			  </span>
			</div>
		<!-- 单据明细 -->
		<div style="padding: 10px 0;border-width: 1px 0;border-style: dashed;border-color: #999;clear: both;">
			<table class="table" style="margin-bottom: 0;" border-color="black">
				<thead>
					<tr style="padding: 0">
						<th style="font-size: 3mm;font-weight: bold;text-align: center;border: 0;padding: 0;">货品名称</th>
						<th style="font-size: 3mm;font-weight: bold;text-align: center;border: 0;padding: 0;">数量</th>
						<th style="font-size: 3mm;font-weight: bold;text-align: center;border: 0;padding: 0;">单价</th>
						
					</tr>
				</thead>
				<tbody>
					<c:forEach items="${bills.detailList}" var="billsDetail" varStatus="status">
						<tr style="padding: 0;">
							<td style="font-size: 3mm;text-align:left;border: 0;padding: 1px 8px;">${billsDetail.goodsName}</td>
							<td style="font-size: 3mm;text-align:center;border: 0;padding: 1px 8px;">${billsDetail.goodsCount}</td>
							<td style="font-size: 3mm;text-align:center;border: 0;padding: 1px 8px;"><fmt:formatNumber value="${billsDetail.disPrice}" pattern="#,##0.00"/></td>
						</tr>
					</c:forEach>	
				</tbody>
			</table>
		</div>
		
		<div style="font-size: 3mm;overflow: hidden;width: 100%;padding: 10px 0 10px 15px;border-top: 1px dashed #999;">
			<div  style="width: 100%;margin-bottom: 0;float: left;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 15mm;">
			    商品合计:
			  </label>
			  <span style="padding-left: 3px;padding-right: 0px;width: 20mm;">
			  ${statistics:sumByField(bills.detailList, 'amount')}
			  </span>
			</div>
			<div  style="float: left;width: 100%;margin-bottom: 0;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 15mm;">
			     业务合计:
			  </label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;width: 20mm;">
			  ${statistics:sumByField(bills.operatorList, 'busAmount')}
			  </span>
			</div>
			<div  style="float: left;width: 100%;margin-bottom: 0;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 15mm;">
			    服务合计:
			  </label>
			  <span style="padding-left: 3px;padding-right: 0px;width: 20mm;">
			  ${statistics:sumByField(bills.serviceList, 'serviceAmount')}
			  </span>
			</div>
			
			<div  style="float: left;width: 100%;margin-bottom: 0;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 15mm;">
			    总金额:
			  </label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;width: 20mm;">
			   <fmt:formatNumber value="${bills.totAmount}" pattern="#,##0.00"/>
			  </span>
			</div>
			<div  style="float: left;width: 100%;margin-bottom: 0;">			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 15mm;">
			     抵扣合计:
			  </label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;width: 20mm;">
			  	${statistics:sumByField(bills.couponList, 'amount')}
			  </span>
			</div>
			<div  style="float: left;width: 100%;margin-bottom: 0;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 15mm;">
			    分期贷款:
			  </label>
			  <span style="padding-left: 3px;padding-right: 0px;width: 20mm;">
			  	<fmt:formatNumber value="${bills.totInstallAmount}" pattern="#,##0.00"/>
			  </span>
			</div>
			
			<div  style="float: left;width: 100%;margin-bottom: 0;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 15mm;">
			    分期退款:
			  </label>
			  <span style="padding-left: 3px;padding-right: 0px;width: 20mm;">
			  	<fmt:formatNumber value="${refundAmountSum}" pattern="#,##0.00"/>
			  </span>
			</div>
			
			<div  style="float: left;width: 100%;margin-bottom: 0;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 15mm;">
			    抹零金额:
			  </label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;width: 20mm;">
			  	<fmt:formatNumber value="${bills.reduceAmout}" pattern="#,##0.00"/>
			  </span>
			</div>
			
			<div  style="float: left;width: 100%;margin-bottom: 0;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 15mm;">
			    应退金额:
			  </label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;width: 20mm;">
			  	<fmt:formatNumber value="${bills.totGoodsAmount}" pattern="#,##0.00"/>
			  </span>
			</div>
			<div  style="float: left;width: 100%;margin-bottom: 0;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 15mm;">
			      实退金额:
			  </label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;width: 20mm;">
			  	<fmt:formatNumber value="${bills.totPayAmount}" pattern="#,##0.00"/>
			  </span>
			</div>
			<div  style="float: left;width: 100%;margin-bottom: 0;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 15mm;">
			      未退欠款:
			  </label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;width: 20mm;">
			  	<fmt:formatNumber value="${bills.totDebtAmount}" pattern="#,##0.00"/>
			  </span>
			</div>

			<div  style="float: left;width: 100%;margin-bottom: 0;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 15mm;">
			     积分余额:
			  </label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;width: 20mm;">
			  ${bills.mScore}
			  </span>
			</div>
			<div  style="float: left;width: 100%;margin-bottom: 0;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 15mm;">
			    储值余额:
			  </label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;width: 20mm;">
			  ${bills.memberAmount}
			  </span>
			</div>
		</div>	
			
		<!-- 单据表尾 -->
	    <div id="formBottom" style="font-size: 3mm;overflow: hidden;border-top: 1px dashed #999;padding-top: 15px;">
			<div  style="float: left;width: 100%;margin-bottom: 0;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 15mm;">
			     客户电话:
			  </label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;width: 20mm;">
			  ${bills.memberTelephone}
			  </span>
			</div>
			<div  style="float: left;padding: 5px 0;width: 100%;margin-bottom: 0;">
		 		<label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;font-size: 16px;;text-align: left;">客户签字：</label>_____________
			</div>
			<div  style="float: left;width: 100%;margin-bottom: 0;">
		 		<label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 20mm;text-align: left;">地 &nbsp; &nbsp; &nbsp; &nbsp;址：</label>
				<span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;width: 20mm;">
				  ${bills.address}
				</span>
			</div>
			<div  style="float: left;width: 100%;margin-bottom: 0;">
		 		<label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 20mm;text-align: left;">服务电话：</label>
		 		<span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
				  ${bills.tel}
				</span>
			</div>
			<div  style="float: left;width: 100%;margin-bottom: 0;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 20mm;text-align: left;">打印时间：</label>
			  <span class="col-sm-8"><fmt:formatDate value="${currDate }" pattern="yyyy-MM-dd HH:mm:ss"/></span>
			</div>
	    </div>
		
		</div>
	</c:if>
	

  </body>
</html>
