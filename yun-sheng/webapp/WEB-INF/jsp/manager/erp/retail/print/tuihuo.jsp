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
    <title>零售退货单打印-DEMO</title>
    
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
  </head>
  
  <body style="padding: 10px;">
	
	<nav class="navbar navbar-default" role="navigation" style="width: 190mm;">
	    <div class="container-fluid">
		    <div class="nav navbar-nav navbar-right" style="margin: 0px;">
		    	<button type="button" class="btn btn-default navbar-btn" onclick="print()" style="margin-left: 10px;">打印测试</button>
		    </div>
	    </div>
	</nav><!-- /E 工具栏结束  -->
	<!-- 打印区  - 不显示串号 -->
	<c:if test="${tempKind == 'default'}">
		<!-- 打印区 -->
		<div id="billsDIV" style="width: 188mm;position: relative;">
	
		<!-- 单据状态图标 -->
		<c:if test="${status != ''}">
		<img src="${basePath}/images/status/${status}" width="80" height="80" style="position:absolute;top: 1mm;right: 15px;">	
		</c:if>
		
		<!-- 单据名称 -->
		<div style="text-align: center;font-size: 5mm;margin-bottom: 2mm;">
		  ${companyName}零售退货单
		</div>
		
		<!-- 单据表头 -->
	    <div style="font-size: 3mm;">
			<div class="form-group" style="width: 62mm;float: left;margin-bottom: 1mm;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;position: relative;float: left;">
			     单据号:
			  </label>
			  <span style="padding-left: 3px;padding-right: 0px;">
			  ${bills.billsCode}
			  </span>
			</div>
			<div class="form-group" style="width: 62mm;float: left;margin-bottom: 1mm;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;position: relative;float: left;">
			     日期:
			  </label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
			 ${bills.billsDate}
			  </span>
			</div>
			<div class="form-group" style="width: 62mm;float: left;margin-bottom: 1mm;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;position: relative;float: left;">
			     部门名称:
			  </label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
			  ${sectionName}
			  </span>
			</div>
			<div style="clear: left;"></div>
			<div class="form-group" style="width: 62mm;float: left;margin-bottom: 1mm;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;position: relative;float: left;">
			   营业员:
			  </label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
			  ${bills.salesmanName}
			  </span>
			</div>
			<div class="form-group" style="width: 62mm;float: left;margin-bottom: 1mm;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;position: relative;float: left;">
			   客户:
			  </label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
			  ${bills.customerTel} ${bills.customerName}
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
		<table class="table table-bordered">
			<thead >
				<tr>
					<th style="font-size: 3mm;font-weight: bold;width: 13mm;text-align: center;">序号</th>
					<th style="font-size: 3mm;font-weight: bold;text-align: center;">收费项目</th>
					<th style="font-size: 3mm;font-weight: bold;text-align: center;">串号</th>
					<th style="font-size: 3mm;font-weight: bold;text-align: center;">数量</th>
					<th style="font-size: 3mm;font-weight: bold;text-align: center;">退货单价</th>
					<th style="font-size: 3mm;font-weight: bold;text-align: center;">退货金额</th>
					<th style="font-size: 3mm;font-weight: bold;text-align: center;">备注</th>
				</tr>
			</thead>
			<tbody>
				<c:forEach items="${bills.goodsList}" var="billsDetail" varStatus="status">
					<tr>
						<td style="font-size: 3mm;text-align:center;">${status.count}</td>
						<td style="font-size: 3mm;text-align:left;">${billsDetail.name}</td>
						<td style="font-size: 3mm;text-align:left;">${billsDetail.imeiStr}</td>
						<td style="font-size: 3mm;text-align:center;">${billsDetail.goodsNum}</td>
						<td style="font-size: 3mm;text-align:right;"><fmt:formatNumber value="${billsDetail.price}" pattern="#,##0.00"/></td>
						<td style="font-size: 3mm;text-align:right;"><fmt:formatNumber value="${billsDetail.amount}" pattern="#,##0.00"/></td>
						<td style="font-size: 3mm;text-align:center;"></td>
					</tr>
				</c:forEach>	
				<c:forEach items="${bills.addServiceList}" var="billsDetail" varStatus="status">
					<tr>
						<td style="font-size: 3mm;text-align:center;"></td>
						<td style="font-size: 3mm;text-align:left;">${billsDetail.serviceName}</td>
						<td style="font-size: 3mm;text-align:left;"></td>
						<td style="font-size: 3mm;text-align:center;"></td>
						<td style="font-size: 3mm;text-align:right;"><fmt:formatNumber value="${billsDetail.actualAmount}" pattern="#,##0.00"/></td>
						<td style="font-size: 3mm;text-align:right;"><fmt:formatNumber value="${billsDetail.yfAmount}" pattern="#,##0.00"/></td>
						<td style="font-size: 3mm;text-align:center;">服务</td>
					</tr>
				</c:forEach>
				<tr>
					<td align="center" style="font-size: 4mm;font-weight: bold;">合计</td>
					<td colspan="2" style="font-size: 3mm;font-weight: bold;text-align: center;">${statistics:numberToCN(statistics:sumByField(bills.goodsList, 'amount')+statistics:sumByField(bills.addServiceList, 'actualAmount'))}</td>
					<td style="font-size: 3mm;font-weight: bold;text-align: center;">${statistics:sumByField(bills.goodsList, 'goodsNum')}</td>
					<td style="font-size: 3mm;font-weight: bold;text-align: center;">${statistics:sumByField(bills.goodsList, 'price')+statistics:sumByField(bills.addServiceList, 'actualAmount')}</td>
					<td  colspan="2" style="font-size: 3mm;font-weight: bold;text-align: center;">${statistics:sumByField(bills.goodsList, 'amount')+statistics:sumByField(bills.addServiceList, 'yfAmount')}</td>
				</tr>
				<tr>
				<td colspan="7" style="width:100%">
					  <span style="display:inline-block;width: 18%;text-align:left;">应付金额： ${bills.totalYfAmount}</span>
					  <span style="display:inline-block;width: 18%;text-align:left;">实付金额：${bills.sfAmount}</span>
					  <span style="display:inline-block;width: 18%;text-align:left;"></span>
					  <span style="display:inline-block;width: 18%;text-align:left;"></span>
					  <span style="display:inline-block;width: 18%;text-align:left;"></span>
					  <br/>
					  <span style="display:inline-block;width: 36%;text-align:left;">会员卡号： ${bills.cardNum}</span>
					  <span style="display:inline-block;width: 18%;text-align:left;">扣除积分：${score}</span>
					  <span style="display:inline-block;width: 18%;text-align:left;">积分余额：${bills.memberScore}</span>
					  <span style="display:inline-block;width: 18%;text-align:left;">储值余额： ${bills.memberAmount}</span>
				</td>
				</tr>
				<tr>
					<td colspan="5"  rowspan=2 align="center" style="font-size: 4mm;font-weight: bold;">${instructions}</td>
				    <td colspan="2"  rowspan=2 style="font-size: 3mm;font-weight: bold;text-align: center;vertical-align:middle;">客户签字：__________</td>
				</tr>
			</tbody>
		</table>
		
		<!-- 单据表尾 -->
	    <div id="formBottom" style="font-size: 3mm;">
			<div class="form-group" style="width: 40mm;float: left;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 12mm;">
			     制单人:
			  </label>
			  <span style="padding-left: 3px;padding-right: 0px;width: 20mm;">
			  ${bills.createName}
			  </span>
			</div>
			<div class="form-group" style="width: 40mm;float: left;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 12mm;">
			     修改人:
			  </label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;width: 20mm;">
			  ${bills.updateName}
			  </span>
			</div>
			<div class="form-group" style="width: 40mm;float: left;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 12mm;">
			    过账人:
			  </label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;width: 20mm;">
			  ${bills.postName}
			  </span>
			</div>
			<div class="form-group" style="width: 40mm;float: left;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 19mm;">
			     红冲人:
			  </label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;width: 20mm;">
			  ${bills.invalidName}
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
