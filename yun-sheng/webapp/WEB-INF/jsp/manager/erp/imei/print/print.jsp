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
    <title>串号变更打印-DEMO</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	
	<!-- 引入文件 -->
	<jsp:include page="../../../Include/print.jsp"></jsp:include>
	<style>.no-border{border: 1px solid transparent !important;}</style>
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
		
		<!-- 单据名称 -->
		<div style="text-align: center;font-size: 5mm;margin-bottom: 2mm;">
		  ${companyName}串号变更单
		</div>
		
		<!-- 单据表头 -->
	    <div style="font-size: 3mm;">
			<div class="form-group" style="width: 62mm;float: left;margin-bottom: 1mm;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;position: relative;float: left;">
			     单据编号:
			  </label>
			  <span style="padding-left: 3px;padding-right: 0px;">
			  ${bills.billsCode}
			  </span>
			</div>
			<div class="form-group" style="width: 62mm;float: left;margin-bottom: 1mm;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;position: relative;float: left;">
			     单据日期:
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
			  ${bills.sectionName}
			  </span>
			</div>
			<div style="clear: left;"></div>
			<div class="form-group" style="width: 62mm;float: left;margin-bottom: 1mm;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;position: relative;float: left;">
			     单据备注:</label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
			  ${bills.remark}
			  </span>
			</div>	
	    </div>
		  
		<!-- 单据明细 -->
		<table class="table table-bordered">
			<thead>
				<tr>
					<th style="font-size: 3mm;font-weight: bold;width: 13mm;text-align: center;">序号</th>
					<th style="font-size: 3mm;font-weight: bold;text-align: center;">串号</th>
					<th style="font-size: 3mm;font-weight: bold;text-align: center;">辅助串号</th>
					<th style="font-size: 3mm;font-weight: bold;text-align: center;">新串号</th>
					<th style="font-size: 3mm;font-weight: bold;text-align: center;">新辅助串号</th>
					<th style="font-size: 3mm;font-weight: bold;text-align: center;">备注</th>
				</tr>
			</thead>
			<tbody>
				<c:forEach items="${bills.detailVoList}" var="billsDetail" varStatus="status">
					<tr>
						<td style="font-size: 3mm;text-align:center;">${status.count}</td>
						<td style="font-size: 3mm;text-align:left;">${billsDetail.imei}</td>
						<td style="font-size: 3mm;text-align:left;">${billsDetail.auxiliaryImei}</td>
						<td style="font-size: 3mm;text-align:left;">${billsDetail.newImei}</td>
						<td style="font-size: 3mm;text-align:left;">${billsDetail.newAuxiliaryImei}</td>
						<td style="font-size: 3mm;text-align:left;">${billsDetail.remark}</td>
					</tr>
				</c:forEach>		
				<tr>
				    <td colspan="6" style="font-size: 3mm;font-weight:bold;text-align: left">数量合计:&nbsp;&nbsp;&nbsp;&nbsp;${num}</td>
				</tr>
			</tbody>
		</table>
		
		<!-- 单据表尾 -->
		<table class="table">
			<tbody>
				<tr class="no-border">
			      	<td style="font-size: 3mm;text-align:center;border:0!important">执行时间： ${bills.executeTime}</td>
					<td style="font-size: 3mm;text-align:left;border:0!important">执行人： ${bills.executeByName}</td>
					<td style="font-size: 3mm;text-align:left;border:0!important">制单时间： ${bills.createTime}</td>
					<td style="font-size: 3mm;text-align:left;border:0!important">制单人： ${bills.createByName}</td>
				</tr>
				<tr class="no-border">
				    <td colspan="6" style="font-size: 3mm;font-weight: bold;text-align: left;border:0!important">打印时间:&nbsp;&nbsp;&nbsp;&nbsp;<fmt:formatDate value="${currDate}" pattern="yyyy-MM-dd HH:mm:ss"/></td>
				</tr>
			</tbody>
		</table>
		
		</div>
	</c:if>
  </body>
</html>
