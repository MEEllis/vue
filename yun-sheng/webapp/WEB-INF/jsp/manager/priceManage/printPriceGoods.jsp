<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="statistics" uri="/WEB-INF/ListStatistics.tld" %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<title>价格管理打印</title>
		
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">    
		<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
		<meta http-equiv="description" content="This is my page">
		
		<!-- 引入文件 -->
		<jsp:include page="../Include/print.jsp"></jsp:include>
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
		
		<!-- 打印区 -->
		<div id="billsDIV" style="width: 190mm;position: relative;">
		
			<table class="table table-bordered">
				<thead>
					<tr>
						<th style="font-size: 3mm;font-weight: bold;width: 13mm;text-align: center;">序号</th>
						<th style="font-size: 3mm;font-weight: bold;text-align: center;">商品类别</th>
						<th style="font-size: 3mm;font-weight: bold;text-align: center;">商品品牌</th>
						<th style="font-size: 3mm;font-weight: bold;text-align: center;">商品型号</th>
						<th style="font-size: 3mm;font-weight: bold;text-align: center;">商品颜色</th>
						<th style="font-size: 3mm;font-weight: bold;text-align: center;">商品编码</th>
						<th style="font-size: 3mm;font-weight: bold;text-align: center;">商品名称</th>
						<th style="font-size: 3mm;font-weight: bold;text-align: center;">零售价</th>
						<th style="font-size: 3mm;font-weight: bold;text-align: center;">最低零售价</th>
						<th style="font-size: 3mm;font-weight: bold;text-align: center;">最低批发价</th>
						<th style="font-size: 3mm;font-weight: bold;text-align: center;">门店可见价</th>
						<th style="font-size: 3mm;font-weight: bold;text-align: center;">售价一</th>
						<th style="font-size: 3mm;font-weight: bold;text-align: center;">售价二</th>
						<th style="font-size: 3mm;font-weight: bold;text-align: center;">售价三</th>
						<th style="font-size: 3mm;font-weight: bold;text-align: center;">售价四</th>
						<th style="font-size: 3mm;font-weight: bold;text-align: center;">售价五</th>
						<th style="font-size: 3mm;font-weight: bold;text-align: center;">预设进价</th>
						<th style="font-size: 3mm;font-weight: bold;text-align: center;">集团指导价一</th>
						<th style="font-size: 3mm;font-weight: bold;text-align: center;">集团指导价二</th>
					</tr>
				</thead>
				<tbody>
					<c:forEach items="${priceVoList}" var="PriceManageVo" varStatus="status">
						<tr>
							<td style="font-size: 3mm;text-align:center;">${status.count}</td>
							<td style="font-size: 3mm;text-align:left;">${PriceManageVo.goodsCategoryName}</td>
							<td style="font-size: 3mm;text-align:left;">${PriceManageVo.goodsBrandName}</td>
							<td style="font-size: 3mm;text-align:left;">${PriceManageVo.goodsModel}</td>
							<td style="font-size: 3mm;text-align:left;">${PriceManageVo.goodsColorName}</td>
							<td style="font-size: 3mm;text-align:left;">${PriceManageVo.code}</td>
							<td style="font-size: 3mm;text-align:left;">${PriceManageVo.name}</td>
							<td style="font-size: 3mm;text-align:right;"><fmt:formatNumber value="${PriceManageVo.retailPrice}" pattern="#,##0.00"/></td>
							<td style="font-size: 3mm;text-align:right;"><fmt:formatNumber value="${PriceManageVo.minRetailPrice}" pattern="#,##0.00"/></td>
							<td style="font-size: 3mm;text-align:right;"><fmt:formatNumber value="${PriceManageVo.minWholesalePrice}" pattern="#,##0.00"/></td>
							<td style="font-size: 3mm;text-align:right;"><fmt:formatNumber value="${PriceManageVo.storeVisiblePrice}" pattern="#,##0.00"/></td>
							<td style="font-size: 3mm;text-align:right;"><fmt:formatNumber value="${PriceManageVo.salesPrice1}" pattern="#,##0.00"/></td>
							<td style="font-size: 3mm;text-align:right;"><fmt:formatNumber value="${PriceManageVo.salesPrice2}" pattern="#,##0.00"/></td>
							<td style="font-size: 3mm;text-align:right;"><fmt:formatNumber value="${PriceManageVo.salesPrice3}" pattern="#,##0.00"/></td>
							<td style="font-size: 3mm;text-align:right;"><fmt:formatNumber value="${PriceManageVo.salesPrice4}" pattern="#,##0.00"/></td>
							<td style="font-size: 3mm;text-align:right;"><fmt:formatNumber value="${PriceManageVo.salesPrice5}" pattern="#,##0.00"/></td>
							<td style="font-size: 3mm;text-align:right;"><fmt:formatNumber value="${PriceManageVo.presetPrice}" pattern="#,##0.00"/></td>
							<td style="font-size: 3mm;text-align:right;"><fmt:formatNumber value="${PriceManageVo.groupGuidePrice1}" pattern="#,##0.00"/></td>
							<td style="font-size: 3mm;text-align:right;"><fmt:formatNumber value="${PriceManageVo.groupGuidePrice2}" pattern="#,##0.00"/></td>
						</tr>
					</c:forEach>	
				</tbody>
			</table>
		</div>
		
	</body>
</html>