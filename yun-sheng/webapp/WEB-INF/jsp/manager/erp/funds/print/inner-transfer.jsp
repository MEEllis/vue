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
    <title>内部转账单打印-DEMO</title>
    
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
	
	<nav class="navbar navbar-default" role="navigation" style="width: 188mm;">
	    <div class="container-fluid">
		    <div class="nav navbar-nav navbar-right" style="margin: 0px;">
		    	<button type="button" class="btn btn-default navbar-btn" onclick="print()" style="margin-left: 10px;">打印测试</button>
		    </div>
	    </div>
	</nav><!-- /E 工具栏结束  -->
	
	<!-- 打印区  - 默认 -->
		<!-- 打印区 -->
		<div id="billsDIV" style="width: 188mm;position: relative;">
		
		<!-- 单据状态图标  -->
		<c:if test="${bills.billsStatus == 6}">
		<img src="${basePath }/images/status/statusPass.png" width="80" height="80" style="position:absolute;top: 1mm;right: 15px;">	
		</c:if>
		<c:if test="${bills.billsStatus == 7}">
		<img src="${basePath }/images/status/statusRed.png" width="80" height="80" style="position:absolute;top: 1mm;right: 15px;">	
	    </c:if>
		
		<!-- 单据名称 -->
		<div style="text-align: center;font-size: 5mm;margin-bottom: 2mm;">
		  ${bills.companyName }内部转账单
		</div>
		
		<!-- 单据表头 -->
	    <div style="font-size: 3mm;">
			<div class="form-group" style="width: 62mm;float: left;margin-bottom: 1mm;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;">
			     单据编号:
			  </label>
			  <span style="padding-left: 3px;padding-right: 0px;">
			  ${bills.billsCode }
			  </span>
			</div>
			<div class="form-group" style="width: 62mm;float: left;margin-bottom: 1mm;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;">
			     单据日期:
			  </label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
			  <fmt:formatDate value="${bills.billsDate }" pattern="yyyy-MM-dd"/>
			  </span>
			</div>
			<div class="form-group" style="width: 62mm;float: left;margin-bottom: 1mm;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;">
			    转出部门:
			  </label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
			  ${bills.outSectionName}
			  </span>
			</div>
			<div class="form-group" style="width: 62mm;float: left;margin-bottom: 1mm;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;">
			    转入部门:
			  </label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
			  ${bills.inSectionName}
			  </span>
			</div>
			<div class="form-group" style="width: 62mm;float: left;margin-bottom: 1mm;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;">
			      经办人:
			  </label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
			  ${bills.managersUname}
			  </span>
			</div>
			<div class="form-group" style="width: 62mm;float: left;margin-bottom: 1mm;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;">
			     单据备注:</label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
			  ${bills.remark }
			  </span>
			</div>	
	    </div>
		
		<table class="table table-bordered">
			<tr>
				<td style="font-size: 3mm;text-align:center;">转出账户</td>	
				<td style="font-size: 3mm;text-align:center;">${bills.outAccountName}</td>	
				<td style="font-size: 3mm;text-align:center;">转入账户</td>	
				<td style="font-size: 3mm;text-align:center;">${bills.inAccountName}</td>
			</tr>
			<tr>
				<td style="font-size: 3mm;text-align:center;">扣除手续费账户</td>	
				<td style="font-size: 3mm;text-align:center;">${bills.feeAccountName}</td>	
				<td style="font-size: 3mm;text-align:center;">手续费金额</td>	
				<td style="font-size: 3mm;text-align:center;">${bills.feeAmount}</td>
			</tr>
			<tr>
				<td style="font-size: 3mm;text-align:center;">转账金额</td>	
				<td style="font-size: 3mm;text-align:center;">${bills.amount}</td>	
				<td style="font-size: 3mm;text-align:center;" colspan="2">大写：${bills.bigAmount}</td>	
			</tr>
			<tr>
				<td style="font-size: 3mm;text-align:center;">转账说明</td>	
				<td style="font-size: 3mm;text-align:center;">${bills.caption}</td>	
				<td style="font-size: 3mm;text-align:center;" rowspan="2">审批人签字盖章</td>
				<td style="font-size: 3mm;text-align:center;" rowspan="2"></td>
			</tr>
			<tr>
				<td style="font-size: 3mm;text-align:center;">附件单据号</td>	
				<td style="font-size: 3mm;text-align:center;">${bills.attachBills}</td>	
			</tr>
		</table>
		
		<!-- 单据表尾 -->
	    <div id="formBottom" style="font-size: 3mm;">
			<div class="form-group" style="width: 40mm;float: left;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 12mm;">
			    过账人:
			  </label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;width: 20mm;">
			  ${bills.postByName}
			  </span>
			</div>
			<div class="form-group" style="width: 40mm;float: left;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 12mm;">
			     红冲人:
			  </label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;width: 20mm;">
			  ${bills.invalidByName}
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
