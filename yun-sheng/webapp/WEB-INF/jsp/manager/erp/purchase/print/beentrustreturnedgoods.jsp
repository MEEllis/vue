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
     
    
    <title>受托退货单打印-DEMO</title>
    
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
	
	<!-- 打印区  - 不显示串号 -->
	<c:if test="${tempKind == 'noimei'}">
		<!-- 打印区 -->
		<div id="billsDIV" style="width: 188mm;position: relative;">
	
		<!-- 单据状态图标 -->
		<c:if test="${isDraftOp == false}">
		<img src="${basePath }/images/status/${bills.billsStatus}" width="80" height="80" style="position:absolute;top: 1mm;right: 15px;">	
		</c:if>	
		
		<!-- 单据名称 -->
		<div style="text-align: center;font-size: 5mm;margin-bottom: 2mm;">
		  ${bills.companyName }受托退货单
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
		<table class="table table-bordered" border-color="black">
			<thead >
				<tr style="padding: 0;">
					<th style="font-size: 3mm;font-weight: bold;width: 13mm;text-align: center; padding: 0;">序号</th>
					<th style="font-size: 3mm;font-weight: bold;text-align: center; padding: 0;">仓库名称</th>
					<th style="font-size: 3mm;font-weight: bold;text-align: center; padding: 0;">商品名称</th>
					<th style="font-size: 3mm;font-weight: bold;text-align: center; padding: 0;">数量</th>
					<th style="font-size: 3mm;font-weight: bold;text-align: center; padding: 0;">单价</th>
					<th style="font-size: 3mm;font-weight: bold;text-align: center; padding: 0;">金额</th>
					<th style="font-size: 3mm;font-weight: bold;text-align: center; padding: 0;">商品备注</th>
				</tr>
			</thead>
			<tbody>
				<c:forEach items="${bills.outstrorageNumOthersList}" var="billsDetail" varStatus="status">
					<tr style="padding: 0;">
						<td style="font-size: 3mm;text-align:center; padding: 0;">${status.count}</td>
						<td style="font-size: 3mm;text-align:left; padding: 0;">${billsDetail.storageName}</td>
						<td style="font-size: 3mm;text-align:left; padding: 0;">${billsDetail.goodsName}</td>
						<td style="font-size: 3mm;text-align:center; padding: 0;">${billsDetail.goodsNumber}</td>
						<td style="font-size: 3mm;text-align:right; padding: 0;"><fmt:formatNumber value="${billsDetail.price}" pattern="#,##0.00"/></td>
						<td style="font-size: 3mm;text-align:right; padding: 0;"><fmt:formatNumber value="${billsDetail.amount}" pattern="#,##0.00"/></td>
						<td style="font-size: 3mm;text-align:left; padding: 0;">${billsDetail.remark}</td>
					</tr>
				</c:forEach>		
				<tr style="padding: 0;">
					<td colspan="3" align="center" style="font-size: 4mm; padding: 0;">合计</td>
					<td style="font-size: 3mm;text-align: center; padding: 0;">${statistics:sumByField(bills.outstrorageNumOthersList, 'goodsNumber')}</td>
					<td style="font-size: 3mm; padding: 0;"></td>
					<td colspan="2" style="font-size: 3mm;text-align: center; padding: 0;">${statistics:sumByField(bills.outstrorageNumOthersList, 'amount')}</td>
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
		  ${bills.companyName }受托退货单
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
		<table class="table table-bordered" style="word-break: break-all; word-wrap:break-word;" border-color="black">
			<thead >
				<tr style="padding: 0;">
					<th style="font-size: 3mm;font-weight: bold;width: 13mm;text-align: center; padding: 0;">序号</th>
					<th style="font-size: 3mm;font-weight: bold;text-align: center; padding: 0;">仓库名称</th>
					<th style="font-size: 3mm;font-weight: bold;text-align: center; padding: 0;">商品名称</th>
					<th style="font-size: 3mm;font-weight: bold;text-align: center; padding: 0;">数量</th>
					<th style="font-size: 3mm;font-weight: bold;text-align: center; padding: 0;">单价</th>
					<th style="font-size: 3mm;font-weight: bold;text-align: center; padding: 0;">金额</th>
					<th style="font-size: 3mm;font-weight: bold;text-align: center; padding: 0;">商品备注</th>
				</tr>
			</thead>
			<tbody>
				<c:forEach items="${bills.outstrorageNumOthersList}" var="billsDetail" varStatus="status">
					<tr style="padding: 0;">
						<td style="font-size: 3mm;text-align:center; padding: 0;">${status.count}</td>
						<td style="font-size: 3mm;text-align:left;padding: 0;">${billsDetail.storageName}</td>
						<td style="font-size: 3mm;text-align:left;padding: 0;">${billsDetail.goodsName}</td>
						<td style="font-size: 3mm;text-align:center;padding: 0;">${billsDetail.goodsNumber}</td>
						<td style="font-size: 3mm;text-align:right;padding: 0;"><fmt:formatNumber value="${billsDetail.price}" pattern="#,##0.00"/></td>
						<td style="font-size: 3mm;text-align:right;padding: 0;"><fmt:formatNumber value="${billsDetail.amount}" pattern="#,##0.00"/></td>
						<td style="font-size: 3mm;text-align:left;padding: 0;">${billsDetail.remark}</td>
					</tr>
					<!-- 串号列表不为空，则输出 -->
					<c:if test="${(billsDetail.outstrorageImList)!= null && fn:length(billsDetail.outstrorageImList) > 0}">
					<tr style="padding: 0;">
						<td colspan="8" style="font-size: 3mm;text-align:left;height: auto; padding: 0;">
							<c:forEach items="${billsDetail.outstrorageImList}" var="detailImei">
							${detailImei.imei },
							</c:forEach>
						</td>
					</tr>
					</c:if>
				</c:forEach>		
				<tr style="padding: 0;">
					<td colspan="3" align="center" style="font-size: 4mm; padding: 0;">合计</td>
					<td style="font-size: 3mm;text-align: center; padding: 0;">${statistics:sumByField(bills.outstrorageNumOthersList, 'goodsNumber')}</td>
					<td style="font-size: 3mm; padding: 0;"></td>
					<td colspan="2" style="font-size: 3mm;text-align: center; padding: 0;">${statistics:sumByField(bills.outstrorageNumOthersList, 'amount')}</td>
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
