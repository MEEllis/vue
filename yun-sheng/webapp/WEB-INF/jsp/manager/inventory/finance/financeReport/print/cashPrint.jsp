<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="statistics" uri="/WEB-INF/ListStatistics.tld" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
	<title>现金流量表打印</title>

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
<div id="billsDIV" style="font-size:5mm;text-align:center;">
	<!-- 单据名称 -->
	<div style="text-align:center;font-size:7mm;font-weight:bold;">
		现金流量表
	</div>
	<!-- 单据表头-->
	<div style="width: 230mm;height:16mm;float:left;position: relative;">
		<div style="position:absolute;bottom:1mm;width:90mm">
			<div style="height:6mm;width:85mm;text-align:left;">
				<span style="width:30mm;">单位名称：</span>
				<span style="width:50mm;">${query.companyNames}</span>
			</div>
		</div>
		<div style="position: absolute;bottom:1mm; left:115mm">
			${query.year}年
		</div>
		<div style="position: absolute;bottom:1mm;left:200mm;">
			单位：元
		</div>
	</div>

	<!-- 单据主体 -->
	<table class="table-bordered" style="width:230mm;text-align: center;margin-bottom: 2mm !important;font-size: 5mm;">
		<thead>
		<tr style="padding:2mm 0">
			<th style="height:10mm;font-weight:bold;text-align: center;">项目</th>
			<th style="height:10mm;font-weight:bold;text-align: center;">行次</th>
			<th style="height:10mm;font-weight:bold;text-align: center;">本年金额</th>
			<th style="height:10mm;font-weight:bold;text-align: center;">上年金额</th>
		</tr>
		</thead>
		<tbody>
		<c:forEach items="${rows}" var="detail" varStatus="status" >
			<tr style="padding:2mm 0">
				<td style="height:8mm;text-align:left;">${detail.projectName}</td>
				<td style="height:8mm;text-align:center;">${detail.num}</td>
				<td style="height:8mm;text-align:right;">${detail.byAmount}</td>
				<td style="height:8mm;text-align:right;">${detail.ljAmount}</td>
			</tr>
		</c:forEach>

		</tbody>
	</table>

	<div style="width: 230mm;float:left;position: relative;">
		<div style="position: absolute;">
			<div>
				<div style="width: 33mm;float: left;">单位负债人：</div>
				<div style="float: left;"></div>
			</div>
		</div>
		<div style="position: absolute;left:90mm">
			<div>
				<div style="width: 28mm;float: left;">会计主管：</div>
				<div style="float: left;"></div>
			</div>
		</div>
		<div style="position: absolute;left:170mm;">
			<div>
				<div style="width: 27mm;float: left;">制表人：</div>
				<div style="float: left;">${SESSION_KEY_USER.name}</div>
			</div>
		</div>
	</div>

</div>
</body>
</html>
