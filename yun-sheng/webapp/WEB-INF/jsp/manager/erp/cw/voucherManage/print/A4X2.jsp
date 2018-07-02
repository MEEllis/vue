<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %> 
<%@ taglib prefix="statistics" uri="/WEB-INF/ListStatistics.tld" %> 
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
     
    
    <title>采购订单打印-DEMO</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	
	<!-- 引入文件 -->
	<jsp:include page="../../../../Include/print.jsp"></jsp:include>
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
	<style type="text/css">

	*{
	font-family: sans-serif;
	}
	
	</style>
  </head>
  
  <body style="padding: 10px;width: 200mm;">
  
	<!-- 打印区 -->
	<div id="billsDIV">
	<c:forEach items="${voucherList}"  var="voucher" varStatus="status">
	
		  <div style="position: relative;width: 200mm;height: 130mm;">
			<div style="position: absolute;width: 20mm;height: 12mm;top:3mm;">${voucher.firstDet.invalidateState }</div>
			<div style="position: absolute;;width:100%;height: 12mm;vertical-align:middle;text-align: center;font-size: 6mm;font-weight: bold;">记账凭证</div>
			<div style="position: absolute;;width:100%;height: 12mm;vertical-align:middle;text-align: center;font-size: 3mm;top:10mm;"><fmt:formatDate value="${voucher.firstDet.voucherDate }" pattern="yyyy年MM月dd"/></div>
			
			<div style="position: absolute;right:0mm;top:10mm;">附单据数 ${voucher.firstDet.attachedVoucherNum } 张</div>
	
			<div style="position: absolute;right:0mm;top:15mm;">第1张凭证 编号 ${voucher.num}/${fn:length(voucherList)}</div>
			
			<div style="position: absolute;left:0mm;top:15mm;">核算单位：${voucher.firstDet.companyName }</div>
			
			<table class="table table-bordered" style="margin-top: 5mm;border: none;position: absolute;top:17mm;">
				<tbody>
					<tr><td style="padding: 0mm;width: 20mm;"></td>
					    <td style="padding: 0mm;width: 20mm;"></td>
					    <td style="padding: 0mm;width: 20mm;"></td>
					    <td style="padding: 0mm;width: 20mm;"></td>
					    <td style="padding: 0mm;width: 20mm;"></td>
					    <td style="padding: 0mm;width: 20mm;"></td>
					    <td style="padding: 0mm;width: 20mm;"></td>
					    <td style="padding: 0mm;width: 20mm;"></td>
					    <td style="padding: 0mm;width: 20mm;"></td>
					    <td style="padding: 0mm;width: 20mm;"></td>
					</tr>
					<!-- 表头行 -->
					<tr>
						<td colspan="3" style="height: 12mm;text-align: center;font-size: 4mm;font-weight: bold;">摘&nbsp;&nbsp;要</td>
						<td colspan="3" style="height: 12mm;text-align: center;font-size: 4mm;font-weight: bold;">会计科目</td>
						<td colspan="2" style="height: 12mm;text-align: center;font-size: 4mm;font-weight: bold;">借&nbsp;&nbsp;方</td>
						<td colspan="2" style="height: 12mm;text-align: center;font-size: 4mm;font-weight: bold;">贷&nbsp;&nbsp;方</td>
					</tr>
					<!-- 明细行 -->
					<c:forEach items="${voucher.flist}"  var="detail" varStatus="status">
					<tr>
						<td colspan="3" style="height: 12mm;text-align: left;font-size: 3mm;">${detail.summary }</td>
						<td colspan="3" style="height: 12mm;text-align: left;font-size: 3mm;">${detail.subjectName }</td>
						<td colspan="2" style="height: 12mm;text-align: right;font-size: 3mm;">${detail.borrowCurrency }</td>
						<td colspan="2" style="height: 12mm;text-align: right;font-size: 3mm;">${detail.loanCurrency }</td>
					</tr>			
					</c:forEach>
					<c:forEach begin="1" end="${5 - fn:length(voucher.flist)}" var="detail" varStatus="status">
					<tr>
						<td colspan="3" style="height: 12mm;text-align: center;font-size: 3mm;"></td>
						<td colspan="3" style="height: 12mm;text-align: center;font-size: 3mm;"></td>
						<td colspan="2" style="height: 12mm;text-align: center;font-size: 3mm;"></td>
						<td colspan="2" style="height: 12mm;text-align: center;font-size: 3mm;"></td>
					</tr>
					</c:forEach>
					<!-- 合计行 -->
					<tr>
						<td colspan="1" style="height: 12mm;width: 19mm;text-align: center;font-size: 4mm;font-weight: bold;">合&nbsp;&nbsp;计</td>
						<td colspan="5" style="height: 12mm;text-align: left;font-size: 4mm;font-weight: bold;">
						${statistics:sumDoubleToChinaCN(voucher.flist, 'borrowCurrency')}
						</td>
						<td colspan="2" style="height: 12mm;text-align: right;font-size: 4mm;font-weight: bold;">
						${statistics:sumByField2(voucher.flist, 'borrowCurrency', 'Double')}
						</td>
						<td colspan="2" style="height: 12mm;text-align: right;font-size: 4mm;font-weight: bold;">
						${statistics:sumByField2(voucher.flist, 'loanCurrency', 'Double')}
						</td>
					</tr>
	
				</tbody>
			</table>
			<div style="width: 40mm;height: 10mm;position: absolute;top:107mm;left:0mm;">记账：${voucher.firstDet.bookKeeperName }</div>
			<div style="width: 40mm;height: 10mm;position: absolute;top:107mm;left:60mm;">审核：${voucher.firstDet.auditorName }</div>
			<div style="width: 40mm;height: 10mm;position: absolute;top:107mm;left:110mm;">出纳：${voucher.firstDet.cashierName }</div>
			<div style="width: 40mm;height: 10mm;position: absolute;top:107mm;left:160mm;">制单：${voucher.firstDet.createName }</div>
		  </div>
		  <div style="page-break-after:always;"></div> 
	  </c:forEach>
		
	</div>
	
  </body>
</html>
