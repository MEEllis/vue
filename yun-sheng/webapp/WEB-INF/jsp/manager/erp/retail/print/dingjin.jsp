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
    <title>零售定金单打印-DEMO</title>
    
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
		  ${companyName}零售定金单
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
		<table class="table table-bordered" bordercolor="black">
			<thead >
				<tr style="padding: 0;">
					<th style="font-size: 3mm;font-weight: bold;width: 13mm;text-align: center; padding:0;">序号</th>
					<th style="font-size: 3mm;font-weight: bold;text-align: center; padding:0;">商品名称</th>
					<th style="font-size: 3mm;font-weight: bold;text-align: center; padding:0;">数量</th>
					<th style="font-size: 3mm;font-weight: bold;text-align: center; padding:0;">预售价</th>
					<th style="font-size: 3mm;font-weight: bold;text-align: center; padding:0;">预售金额</th>
					<th style="font-size: 3mm;font-weight: bold;text-align: center; padding:0;">定金</th>
					<th style="font-size: 3mm;font-weight: bold;text-align: center; padding:0;">备注</th>
				</tr>
			</thead>
			<tbody>
				<c:forEach items="${bills.retailGoodsVoList}" var="billsDetail" varStatus="status">
					<tr style="padding: 0;">
						<td style="font-size: 3mm;text-align:center; padding:0;">${status.count}</td>
						<td style="font-size: 3mm;text-align:left; padding:0;">${billsDetail.name}</td>
						<td style="font-size: 3mm;text-align:center; padding:0;">${billsDetail.goodsNum}</td>
						<td style="font-size: 3mm;text-align:right; padding:0;"><fmt:formatNumber value="${billsDetail.presetPrice}" pattern="#,##0.00"/></td>
						<td style="font-size: 3mm;text-align:right; padding:0;"><fmt:formatNumber value="${billsDetail.priceSum}" pattern="#,##0.00"/></td>
						<td style="font-size: 3mm;text-align:right; padding:0;"><fmt:formatNumber value="${billsDetail.deposit}" pattern="#,##0.00"/></td>
						<td style="font-size: 3mm;text-align:left; padding:0;">${billsDetail.remark}</td>
					</tr>
				</c:forEach>		
				<tr style="padding: 0;">
					<td align="center" style="font-size: 4mm;font-weight: bold; padding:0;">合计</td>
					<td style="font-size: 3mm;font-weight: bold;text-align: center; padding:0;"></td>
					<td style="font-size: 3mm;font-weight: bold;text-align: center; padding:0;">${statistics:sumByField(bills.retailGoodsVoList, 'goodsNum')}</td>
					<td style="font-size: 3mm;font-weight: bold;text-align: center; padding:0;">${statistics:sumByField(bills.retailGoodsVoList, 'presetPrice')}</td>
					<td style="font-size: 3mm;font-weight: bold;text-align: center; padding:0;">${statistics:sumByField(bills.retailGoodsVoList, 'priceSum')}</td>
					<td  style="font-size: 3mm;font-weight: bold;text-align: center; padding:0;">${statistics:sumByField(bills.retailGoodsVoList, 'deposit')}</td>
					<td style="font-size: 3mm;font-weight: bold;text-align: center; padding:0;"></td>
				</tr>
				<tr style="padding: 0;">
					<td align="center" style="font-size: 4mm;font-weight: bold; padding:0;">应收金额</td>
					<td colspan="2" style="font-size: 3mm;font-weight: bold;text-align: left; padding:0;"><fmt:formatNumber value="${bills.totalYsAmount}" pattern="#,##0.00"/></td>
					<td align="center" style="font-size: 4mm;font-weight: bold; padding:0;">实收金额</td>
					<td colspan="3" style="font-size: 3mm;font-weight: bold;text-align: left; padding:0;"><fmt:formatNumber value="${bills.ssAmount}" pattern="#,##0.00"/></td>
				</tr>
				<tr style="padding: 0;">
					<td align="center" style="font-size: 4mm;font-weight: bold; padding:0;">定金合计</td>
					<td colspan="6" style="font-size: 3mm;font-weight: bold;text-align: left; padding:0;">${statistics:numberToCN(statistics:sumByField(bills.retailGoodsVoList, 'deposit'))}</td>
				</tr>
				<tr style="padding: 0;">
					<td colspan="5"  rowspan=2 align="center" style="font-size: 4mm;font-weight: bold;  padding:0;">${instructions}</td>
				    <td colspan="2"  rowspan=2 style="font-size: 3mm;font-weight: bold;text-align: center;vertical-align:middle; padding:0;">客户签字：__________</td>
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
	
	<!-- 打印区  - 显示串号 -->
	<c:if test="${tempKind == 'showimei'}">
		<!-- 打印区 -->
		<div id="billsDIV" style="width: 188mm;position: relative;">
	
		<!-- 单据状态图标 -->
		<c:if test="${isDraftOp == false}">
		<img src="${basePath }/images/status/${bills.billsStatus}" width="80" height="80" style="position:absolute;top: 1mm;right: 15px;">	
		</c:if>
		
		<!-- 单据名称 -->
		<div style="text-align: center;font-size: 5mm;margin-bottom: 2mm;">
		  ${bills.companyName }受托入库单
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
			     应付余额:
			  </label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
			  <fmt:formatNumber value="${wlye.yingFu }" pattern="#,##0.00"/>
			  </span>
			</div>
			<div class="form-group" style="width: 62mm;float: left;margin-bottom: 1mm;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;position: relative;float: left;">
			     预付余额:
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
		<table class="table table-bordered" style="word-break: break-all; word-wrap:break-word;" bordercolor="black">
			<thead >
				<tr style="padding: 0;">
					<th style="font-size: 3mm;font-weight: bold;width: 13mm;text-align: center; padding:0;">序号</th>
					<th style="font-size: 3mm;font-weight: bold;text-align: center; padding:0;">仓库名称</th>
					<th style="font-size: 3mm;font-weight: bold;text-align: center; padding:0;">商品名称</th>
					<th style="font-size: 3mm;font-weight: bold;text-align: center; padding:0;">数量</th>
					<th style="font-size: 3mm;font-weight: bold;text-align: center; padding:0;">单价</th>
					<th style="font-size: 3mm;font-weight: bold;text-align: center; padding:0;">金额</th>
					<th style="font-size: 3mm;font-weight: bold;text-align: center; padding:0;">商品备注</th>
				</tr>
			</thead>
			<tbody>
				<c:forEach items="${bills.instrorageOthersNumList}" var="billsDetail" varStatus="status">
					<tr style="padding: 0;">
						<td style="font-size: 3mm;text-align:center; padding:0;">${status.count}</td>
						<td style="font-size: 3mm;text-align:left; padding:0;">${billsDetail.storageName}</td>
						<td style="font-size: 3mm;text-align:left; padding:0;">${billsDetail.goodsName}</td>
						<td style="font-size: 3mm;text-align:center; padding:0;">${billsDetail.goodsNumber}</td>
						<td style="font-size: 3mm;text-align:right; padding:0;"><fmt:formatNumber value="${billsDetail.price}" pattern="#,##0.00"/></td>
						<td style="font-size: 3mm;text-align:right; padding:0;"><fmt:formatNumber value="${billsDetail.amount}" pattern="#,##0.00"/></td>
						<td style="font-size: 3mm;text-align:left; padding:0;">${billsDetail.remark}</td>
					</tr>
					<!-- 串号列表不为空，则输出 -->
					<c:if test="${(billsDetail.instrorageImList)!= null && fn:length(billsDetail.instrorageImList) > 0}">
					<tr style="padding: 0;">
						<td colspan="9" style="font-size: 3mm;text-align:left;height: auto;  padding:0;">
							<c:forEach items="${billsDetail.instrorageImList}" var="detailImei">
							${detailImei.imei },
							</c:forEach>
						</td>
					</tr>
					</c:if>
				</c:forEach>		
				<tr style="padding: 0;">
					<td colspan="3" align="center" style="font-size: 4mm; padding:0;">合计</td>
					<td style="font-size: 3mm;text-align: center; padding:0;">${statistics:sumByField(bills.instrorageOthersNumList, 'goodsNumber')}</td>
					<td style="font-size: 3mm; padding:0;"></td>
					<td colspan="2" style="font-size: 3mm;text-align: center; padding:0;">${statistics:sumByField(bills.instrorageOthersNumList, 'amount')}</td>
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
