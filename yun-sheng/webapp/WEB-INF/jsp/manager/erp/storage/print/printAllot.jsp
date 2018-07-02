<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %> 
<%
request.setAttribute("currDate",new Date());
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>调拨接收打印-DEMO</title>
    
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
	
	<!-- 打印区  - 同价调拨接收-商品明细 -->
	<c:if test="${printType == 'imeiDetail-one'}">
		<!-- 打印区 -->
		<div id="billsDIV" style="width: 190mm;position: relative;">
	
		<!-- 单据状态图标 -->
		<img src="${basePath }/images/status/${bills.billsStatus}" width="80" height="80" style="position:absolute;top: 1mm;right: 15px;">	
		
		<!-- 单据名称 -->	
		<div style="text-align: center;font-size: 5mm;margin-bottom: 2mm;">
		  ${bills.companyName }调拨接收
		</div>
		
		<!-- 单据表头 -->
	    <div style="font-size: 3mm;">
			<div class="form-group" style="width: 63mm;float: left;margin-bottom: 1mm;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;">
			     单据编号:
			  </label>
			  <span style="padding-left: 3px;padding-right: 0px;">
			  	${bills.billsCode }
			  </span>
			</div>
			<div class="form-group" style="width: 63mm;float: left;margin-bottom: 1mm;">
				<c:choose>
				   <c:when test="${bills.tzName == '10'}"> 
				   		  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;">
						     接收日期:
						  </label>
						  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
						  <fmt:formatDate value="${bills.receiveDate }" pattern="yyyy-MM-dd"/>
						  </span>          
				   </c:when>
				   <c:when test="${bills.tzName == '11'}"> 
				   		  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;">
						     拒收日期:
						  </label>
						  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
						  <fmt:formatDate value="${bills.rejectionDate }" pattern="yyyy-MM-dd"/>
						  </span>          
				   </c:when>
				   <c:otherwise>
				     	  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;">
						     
						  </label>
						  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
						  
						  </span>   
				   </c:otherwise>
				</c:choose>
			</div>
			<div class="form-group" style="width: 63mm;float: left;margin-bottom: 1mm;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;">
			     调出部门:
			  </label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
			  ${bills.outDepartmentName }
			  </span>
			</div>
			<div class="form-group" style="width: 63mm;float: left;margin-bottom: 1mm;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;">
			      发货人:
			  </label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
			  ${bills.postName }
			  </span>
			</div>
			<div class="form-group" style="width: 63mm;float: left;margin-bottom: 1mm;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;">
			     调出日期：
			  </label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
			  <fmt:formatDate value="${bills.billsDate }" pattern="yyyy-MM-dd"/>
			  </span>
			</div>
			<div class="form-group" style="width: 63mm;float: left;margin-bottom: 1mm;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;">
			    调入部门:
			  </label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
			  ${bills.inDepartmentName }
			  </span>
			</div>
			<div class="form-group" style="width: 63mm;float: left;margin-bottom: 1mm;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;">
			     单据备注:</label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
			  ${bills.remark }
			  </span>
			</div>	
	    </div>
		  
		<!-- 单据明细 -->
		<table class="table table-bordered" border-color="black">
			<thead >
				<tr style="padding: 0;border-color: black !important;">
					<th style="border-color: #000 !important;font-size: 3mm;font-weight: bold;width: 13mm;text-align: center; padding: 0;">序号</th>
					<th style="border-color: #000 !important;font-size: 3mm;font-weight: bold;text-align: center; padding: 0;">仓库名称</th>
					<th style="border-color: #000 !important;font-size: 3mm;font-weight: bold;text-align: center; padding: 0;">商品名称</th>
					<th style="border-color: #000 !important;font-size: 3mm;font-weight: bold;text-align: center; padding: 0;">数量</th>
					<c:if test="${(checkCost)== true}">
						<th style="border-color: #000 !important;font-size: 3mm;font-weight: bold;text-align: center; padding: 0;">调拨单价</th>
						<th style="border-color: #000 !important;font-size: 3mm;font-weight: bold;text-align: center; padding: 0;">调拨总价</th>
					</c:if>
					<th style="border-color: #000 !important;font-size: 3mm;font-weight: bold;text-align: center; padding: 0;">商品备注</th>
				</tr>
			</thead>
			<tbody>
				<c:set var="sum" value="0"></c:set>
				<c:set var="sumPri" value="0"></c:set>
				<c:forEach items="${bills.detaiList}" var="detail" varStatus="status">
					<c:set var="sum" value="${sum+detail.goodsNumber}"></c:set>
					<c:set var="sumPri" value="${sumPri+detail.amount}"></c:set>
					<tr style="border-color: #000 !important;padding: 0;">
						<td style="border-color: #000 !important;font-size: 3mm;text-align:center;  padding: 0;">${status.count}</td>
						<td style="border-color: #000 !important;font-size: 3mm;text-align:left; padding: 0;">${detail.storageName}</td>
						<td style="border-color: #000 !important;font-size: 3mm;text-align:center; padding: 0;">${detail.goodsName}</td>
						<td style="border-color: #000 !important;font-size: 3mm;text-align:center; padding: 0;">${detail.goodsNumber}</td>
						<c:if test="${(checkCost)== true}">
							<td style="border-color: #000 !important;font-size: 3mm;text-align:center; padding: 0;">${detail.price}</td>
							<td style="border-color: #000 !important;font-size: 3mm;text-align:center; padding: 0;">${detail.amount}</td>
						</c:if>
						<td style="border-color: #000 !important;font-size: 3mm;text-align:left; padding: 0;">${detail.remark}</td>
					</tr>
					<!-- 串号列表不为空，则输出 -->
					<c:if test="${(detail.imDetaiList)!= null && fn:length(detail.imDetaiList) > 0}">
					<tr style="border-color: #000 !important;padding: 0;">
						<td colspan="5" style="border-color: #000 !important;font-size: 3mm;text-align:left;height: auto; padding: 0;">
							<c:forEach items="${detail.imDetaiList}" var="detailImei">
							${detailImei.imei },
							</c:forEach>
						</td>
					</tr>
					</c:if>
				</c:forEach>		
				<tr style="border-color: #000 !important;padding: 0;">
					<td colspan="3" align="center" style="border-color: #000 !important;font-size: 4mm; padding: 0;">合计</td>
					<td style="font-size: 3mm;text-align:center; padding: 0;border-color: #000 !important;" >${sum }</td>
					<td style="border-color: #000 !important;padding: 0;"></td>
					<c:if test="${(checkCost)== true}">
						<td colspan="1" align="center" style="border-color: #000 !important;font-size: 3mm; padding: 0;">${sumPri}</td>
					</c:if>
					<td style="border-color: #000 !important;padding: 0;"></td>
				</tr>
			</tbody>
		</table>
		
		<!-- 单据表尾 -->
	    <div id="formBottom" style="font-size: 3mm;">
			<div class="form-group" style="width: 46mm;float: left;">
				<c:choose>
				   <c:when test="${bills.tzName == '10'}"> 
				   		  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 25mm;">
						    接收人:
						  </label>
						  <span style="padding-left: 3px;padding-right: 0px;width: 20mm;">
						  ${bills.rejectionName }
						  </span>    
				   </c:when>
				   <c:when test="${bills.tzName == '11'}"> 
				   		  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 25mm;">
						     拒收人:
						  </label>
						  <span style="padding-left: 3px;padding-right: 0px;width: 20mm;">
						  ${bills.receiveName }
						  </span>        
				   </c:when>
				   <c:otherwise>
				     	  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 25mm;">
						     
						  </label>
						  <span style="padding-left: 3px;padding-right: 0px;width: 20mm;">
						  
						  </span> 
				   </c:otherwise>
				</c:choose>
			</div>
			<div class="form-group" style="width: 46mm;float: left;">
			<label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 25mm;"></label>
			<span style="padding-left: 3px;padding-right: 0px;width: 20mm;"></span>
			</div>
			<div class="form-group" style="width: 46mm;float: left;">
			<label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 25mm;"></label>
			<span style="padding-left: 3px;padding-right: 0px;width: 20mm;"></span>
			</div>
			<div class="form-group" style="width: 46mm;float: left;">
			  <label class="col-sm-12 control-label" style="padding-left: 1px;padding-right: 0px;width: 45mm;">
			     经办人:____________
			  </label>
			</div>
			<div class="form-group" style="width: 93mm;float: left;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;">打印时间:</label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;"><fmt:formatDate value="${currDate }" pattern="yyyy-MM-dd HH:mm:ss"/></span>
			</div>
	    </div>
		
		</div>
	</c:if>
	
	<!-- 打印区  - 同价调拨接收-商品汇总 -->
	<c:if test="${printType == 'numberDetail-one'}">
		<!-- 打印区 -->
		<div id="billsDIV" style="width: 190mm;position: relative;">
	
		<!-- 单据状态图标 -->
		<img src="${basePath }/images/status/${bills.billsStatus}" width="80" height="80" style="position:absolute;top: 1mm;right: 15px;">	
		
		<!-- 单据名称 -->	
		<div style="text-align: center;font-size: 5mm;margin-bottom: 2mm;">
		  ${bills.companyName }调拨接收
		</div>
		
		<!-- 单据表头 -->
	    <div style="font-size: 3mm;">
			<div class="form-group" style="width: 63mm;float: left;margin-bottom: 1mm;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;">
			     单据编号:
			  </label>
			  <span style="padding-left: 3px;padding-right: 0px;">
			  	${bills.billsCode }
			  </span>
			</div>
			<div class="form-group" style="width: 63mm;float: left;margin-bottom: 1mm;">
				<c:choose>
				   <c:when test="${bills.tzName == '10'}"> 
				   		  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;">
						     接收日期:
						  </label>
						  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
						  <fmt:formatDate value="${bills.receiveDate }" pattern="yyyy-MM-dd"/>
						  </span>          
				   </c:when>
				   <c:when test="${bills.tzName == '11'}"> 
				   		  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;">
						     拒收日期:
						  </label>
						  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
						  <fmt:formatDate value="${bills.rejectionDate }" pattern="yyyy-MM-dd"/>
						  </span>          
				   </c:when>
				   <c:otherwise>
				     	  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;">
						     
						  </label>
						  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
						  
						  </span>   
				   </c:otherwise>
				</c:choose>
			</div>
			<div class="form-group" style="width: 63mm;float: left;margin-bottom: 1mm;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;">
			     调出部门:
			  </label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
			  ${bills.outDepartmentName }
			  </span>
			</div>
			<div class="form-group" style="width: 63mm;float: left;margin-bottom: 1mm;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;">
			      发货人:
			  </label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
			  ${bills.postName }
			  </span>
			</div>
			<div class="form-group" style="width: 63mm;float: left;margin-bottom: 1mm;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;">
			     调出日期：
			  </label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
			  <fmt:formatDate value="${bills.billsDate }" pattern="yyyy-MM-dd"/>
			  </span>
			</div>
			<div class="form-group" style="width: 63mm;float: left;margin-bottom: 1mm;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;">
			    调入部门:
			  </label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
			  ${bills.inDepartmentName }
			  </span>
			</div>
			<div class="form-group" style="width: 63mm;float: left;margin-bottom: 1mm;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;">
			     单据备注:</label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
			  ${bills.remark }
			  </span>
			</div>	
	    </div>
		  
		<!-- 单据明细 -->
		<table class="table table-bordered" border-color="black">
			<thead >
				<tr style="border-color: #000 !important;padding: 0;">
					<th style="border-color: #000 !important;font-size: 3mm;font-weight: bold;width: 13mm;text-align: center; padding: 0;">序号</th>
					<th style="border-color: #000 !important;font-size: 3mm;font-weight: bold;text-align: center; padding: 0;">仓库名称</th>
					<th style="border-color: #000 !important;font-size: 3mm;font-weight: bold;text-align: center; padding: 0;">商品名称</th>
					<th style="border-color: #000 !important;font-size: 3mm;font-weight: bold;text-align: center; padding: 0;">数量</th>
					<c:if test="${(checkCost)== true}">
						<th style="border-color: #000 !important;font-size: 3mm;font-weight: bold;text-align: center; padding: 0;">调拨单价</th>
						<th style="border-color: #000 !important;font-size: 3mm;font-weight: bold;text-align: center; padding: 0;">调拨总价</th>
					</c:if>
					<th style="border-color: #000 !important;font-size: 3mm;font-weight: bold;text-align: center; padding: 0;">商品备注</th>
				</tr>
			</thead>
			<tbody>
				<c:set var="sum2" value="0"></c:set>
				<c:set var="sumPri2" value="0"></c:set>
				<c:forEach items="${bills.detaiList}" var="detail" varStatus="status">
					<c:set var="sum2" value="${sum2+detail.goodsNumber}"></c:set>
					<c:set var="sumPri2" value="${sumPri2+detail.amount}"></c:set>
					<tr style="border-color: #000 !important;padding: 0;">
						<td style="border-color: #000 !important;font-size: 3mm;text-align:center;  padding: 0;">${status.count}</td>
						<td style="border-color: #000 !important;font-size: 3mm;text-align:left; padding: 0;">${detail.storageName}</td>
						<td style="border-color: #000 !important;font-size: 3mm;text-align:center; padding: 0;">${detail.goodsName}</td>
						<td style="border-color: #000 !important;font-size: 3mm;text-align:center; padding: 0;">${detail.goodsNumber}</td>
						<c:if test="${(checkCost)== true}">
							<td style="border-color: #000 !important;font-size: 3mm;text-align:center; padding: 0;">${detail.price}</td>
							<td style="border-color: #000 !important;font-size: 3mm;text-align:center; padding: 0;">${detail.amount}</td>
						</c:if>
						<td style="border-color: #000 !important;font-size: 3mm;text-align:left; padding: 0;">${detail.remark}</td>
					</tr>
				</c:forEach>		
				<tr style="border-color: #000 !important;padding: 0;">
					<td colspan="3" align="center" style="border-color: #000 !important;font-size: 4mm; padding: 0;">合计</td>
					<td style="font-size: 3mm;padding: 0;border-color: #000 !important;" align="center;" >${sum2 }</td>
					<td style="border-color: #000 !important;padding: 0"></td>
					<c:if test="${(checkCost)== true}">
						<td colspan="1" align="center" style="border-color: #000 !important;font-size: 3mm; padding: 0;">${sumPri2 }</td>
					</c:if>
					<td style="border-color: #000 !important;padding: 0;"></td>
				</tr>
			</tbody>
		</table>
		
		<!-- 单据表尾 -->
	    <div id="formBottom" style="font-size: 3mm;">
			<div class="form-group" style="width: 46mm;float: left;">
				<c:choose>
				   <c:when test="${bills.tzName == '10'}"> 
				   		  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 25mm;">
						    接收人:
						  </label>
						  <span style="padding-left: 3px;padding-right: 0px;width: 20mm;">
						  ${bills.rejectionName }
						  </span>    
				   </c:when>
				   <c:when test="${bills.tzName == '11'}"> 
				   		  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 25mm;">
						     拒收人:
						  </label>
						  <span style="padding-left: 3px;padding-right: 0px;width: 20mm;">
						  ${bills.receiveName }
						  </span>        
				   </c:when>
				   <c:otherwise>
				     	  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 25mm;">
						     
						  </label>
						  <span style="padding-left: 3px;padding-right: 0px;width: 20mm;">
						  
						  </span> 
				   </c:otherwise>
				</c:choose>
			</div>
			<div class="form-group" style="width: 46mm;float: left;">
			<label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 25mm;"></label>
			<span style="padding-left: 3px;padding-right: 0px;width: 20mm;"></span>
			</div>
			<div class="form-group" style="width: 46mm;float: left;">
			<label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 25mm;"></label>
			<span style="padding-left: 3px;padding-right: 0px;width: 20mm;"></span>
			</div>
			<div class="form-group" style="width: 46mm;float: left;">
			  <label class="col-sm-12 control-label" style="padding-left: 1px;padding-right: 0px;width: 45mm;">
			     经办人:____________
			  </label>
			</div>
			<div class="form-group" style="width: 93mm;float: left;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;">打印时间:</label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;"><fmt:formatDate value="${currDate }" pattern="yyyy-MM-dd HH:mm:ss"/></span>
			</div>
	    </div>
		
		</div>
	</c:if>
	
	<!-- 打印区  - 变价调拨接收-商品明细 -->
	<c:if test="${printType == 'imeiDetail-tow'}">
		<!-- 打印区 -->
		<div id="billsDIV" style="width: 190mm;position: relative;">
	
		<!-- 单据状态图标 -->
		<img src="${basePath }/images/status/${bills.billsStatus}" width="80" height="80" style="position:absolute;top: 1mm;right: 15px;">	
		
		<!-- 单据名称 -->	
		<div style="text-align: center;font-size: 5mm;margin-bottom: 2mm;">
		  ${bills.companyName }调拨接收
		</div>
		
		<!-- 单据表头 -->
	    <div style="font-size: 3mm;">
			<div class="form-group" style="width: 63mm;float: left;margin-bottom: 1mm;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;">
			     单据编号:
			  </label>
			  <span style="padding-left: 3px;padding-right: 0px;">
			  	${bills.billsCode }
			  </span>
			</div>
			<div class="form-group" style="width: 63mm;float: left;margin-bottom: 1mm;">
				<c:choose>
				   <c:when test="${bills.tzName == '10'}"> 
				   		  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;">
						     接收日期:
						  </label>
						  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
						  <fmt:formatDate value="${bills.receiveDate }" pattern="yyyy-MM-dd"/>
						  </span>          
				   </c:when>
				   <c:when test="${bills.tzName == '11'}"> 
				   		  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;">
						     拒收日期:
						  </label>
						  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
						  <fmt:formatDate value="${bills.rejectionDate }" pattern="yyyy-MM-dd"/>
						  </span>          
				   </c:when>
				   <c:otherwise>
				     	  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;">
						     
						  </label>
						  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
						  
						  </span>   
				   </c:otherwise>
				</c:choose>
			</div>
			<div class="form-group" style="width: 63mm;float: left;margin-bottom: 1mm;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;">
			     调出部门:
			  </label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
			  ${bills.outDepartmentName }
			  </span>
			</div>
			<div class="form-group" style="width: 63mm;float: left;margin-bottom: 1mm;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;">
			      发货人:
			  </label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
			  ${bills.postName }
			  </span>
			</div>
			<div class="form-group" style="width: 63mm;float: left;margin-bottom: 1mm;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;">
			     调出日期：
			  </label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
			  <fmt:formatDate value="${bills.billsDate }" pattern="yyyy-MM-dd"/>
			  </span>
			</div>
			<div class="form-group" style="width: 63mm;float: left;margin-bottom: 1mm;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;">
			    调入部门:
			  </label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
			  ${bills.inDepartmentName }
			  </span>
			</div>
			<div class="form-group" style="width: 63mm;float: left;margin-bottom: 1mm;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;">
			     单据备注:</label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
			  ${bills.remark }
			  </span>
			</div>	
	    </div>

		<!-- 单据明细 -->
		<table class="table table-bordered" border-color="black">
			<thead >
				<tr style="border-color: #000 !important;padding: 0;">
					<th style="border-color: #000 !important;font-size: 3mm;font-weight: bold;width: 13mm;text-align: center; padding: 0;">序号</th>
					<th style="border-color: #000 !important;font-size: 3mm;font-weight: bold;text-align: center; padding: 0;">仓库名称</th>
					<th style="border-color: #000 !important;font-size: 3mm;font-weight: bold;text-align: center; padding: 0;">商品名称</th>
					<th style="border-color: #000 !important;font-size: 3mm;font-weight: bold;text-align: center; padding: 0;">数量</th>
					<c:if test="${(checkCost)== true}">
						<th style="border-color: #000 !important;font-size: 3mm;font-weight: bold;text-align: center; padding: 0;">调拨单价</th>
						<th style="border-color: #000 !important;font-size: 3mm;font-weight: bold;text-align: center; padding: 0;">调拨总价</th>
					</c:if>
					<th style="border-color: #000 !important;font-size: 3mm;font-weight: bold;text-align: center; padding: 0;">商品备注</th>
				</tr>
			</thead>
			<tbody>
				<c:set var="sumNum3" value="0"></c:set>
				<c:set var="sumPri3" value="0"></c:set>
				<c:forEach items="${bills.detaiList}" var="detail" varStatus="status">
					<c:set var="sumNum3" value="${sumNum3+detail.goodsNumber}"></c:set>
					<c:set var="sumPri3" value="${sumPri3+detail.amount}"></c:set>
					<tr style="border-color: #000 !important;padding: 0;">
						<td style="border-color: #000 !important;font-size: 3mm;text-align:center; padding: 0;">${status.count}</td>
						<td style="border-color: #000 !important;font-size: 3mm;text-align:left; padding: 0;">${detail.storageName}</td>
						<td style="border-color: #000 !important;font-size: 3mm;text-align:center; padding: 0;">${detail.goodsName}</td>
						<td style="border-color: #000 !important;font-size: 3mm;text-align:center; padding: 0;">${detail.goodsNumber}</td>
						<c:if test="${(checkCost)== true}">
							<td style="border-color: #000 !important;font-size: 3mm;text-align:center; padding: 0;">${detail.price}</td>
							<td style="border-color: #000 !important;font-size: 3mm;text-align:center; padding: 0;">${detail.amount}</td>
						</c:if>
						<td style="border-color: #000 !important;font-size: 3mm;text-align:left; padding: 0;">${detail.remark}</td>
					</tr>
					<!-- 串号列表不为空，则输出 -->
					<c:if test="${(detail.imDetaiList)!= null && fn:length(detail.imDetaiList) > 0}">
					<tr>
						<td colspan="6" style="border-color: #000 !important;font-size: 3mm;text-align:left;height: auto;padding: 0;">
							<c:forEach items="${detail.imDetaiList}" var="detailImei">
							${detailImei.imei },
							</c:forEach>
						</td>
					</tr>
					</c:if>
				</c:forEach>		
				<tr>
					<td colspan="3" align="center" style="border-color: #000 !important;font-size: 4mm;padding: 0;">合计</td>
					<td style="border-color: #000 !important;font-size: 3mm;padding: 0;" align="center">${sumNum3 }</td>
					<td style="border-color: #000 !important;padding: 0;"></td>
					<c:if test="${(checkCost)== true}">
						<td colspan="1" align="center" style="border-color: #000 !important;font-size: 3mm;padding: 0;">${sumPri3 }</td>
					</c:if>
					<td style="border-color: #000 !important;padding: 0;"></td>
				</tr>
			</tbody>
		</table>
		
		<!-- 单据表尾 -->
	    <div id="formBottom" style="font-size: 3mm;">
			<div class="form-group" style="width: 46mm;float: left;">
				<c:choose>
				   <c:when test="${bills.tzName == '10'}"> 
				   		  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 25mm;">
						    接收人:
						  </label>
						  <span style="padding-left: 3px;padding-right: 0px;width: 20mm;">
						  ${bills.rejectionName }
						  </span>    
				   </c:when>
				   <c:when test="${bills.tzName == '11'}"> 
				   		  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 25mm;">
						     拒收人:
						  </label>
						  <span style="padding-left: 3px;padding-right: 0px;width: 20mm;">
						  ${bills.receiveName }
						  </span>        
				   </c:when>
				   <c:otherwise>
				     	  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 25mm;">
						     
						  </label>
						  <span style="padding-left: 3px;padding-right: 0px;width: 20mm;">
						  
						  </span> 
				   </c:otherwise>
				</c:choose>
			</div>
			<div class="form-group" style="width: 46mm;float: left;">
			<label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 25mm;"></label>
			<span style="padding-left: 3px;padding-right: 0px;width: 20mm;"></span>
			</div>
			<div class="form-group" style="width: 46mm;float: left;">
			<label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 25mm;"></label>
			<span style="padding-left: 3px;padding-right: 0px;width: 20mm;"></span>
			</div>
			<div class="form-group" style="width: 46mm;float: left;">
			  <label class="col-sm-12 control-label" style="padding-left: 1px;padding-right: 0px;width: 45mm;">
			     经办人:____________
			  </label>
			</div>
			<div class="form-group" style="width: 93mm;float: left;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;">打印时间:</label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;"><fmt:formatDate value="${currDate }" pattern="yyyy-MM-dd HH:mm:ss"/></span>
			</div>
	    </div>
		
		</div>
	</c:if>
 
 	<!-- 打印区  - 变价调拨接收-商品汇总 -->
	<c:if test="${printType == 'numberDetail-two'}">
		<!-- 打印区 -->
		<div id="billsDIV" style="width: 190mm;position: relative;">
	
		<!-- 单据状态图标 -->
		<img src="${basePath }/images/status/${bills.billsStatus}" width="80" height="80" style="position:absolute;top: 1mm;right: 15px;">	
		
		<!-- 单据名称 -->	
		<div style="text-align: center;font-size: 5mm;margin-bottom: 2mm;">
		  ${bills.companyName }调拨接收
		</div>
		
		<!-- 单据表头 -->
	    <div style="font-size: 3mm;">
			<div class="form-group" style="width: 63mm;float: left;margin-bottom: 1mm;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;">
			     单据编号:
			  </label>
			  <span style="padding-left: 3px;padding-right: 0px;">
			  	${bills.billsCode }
			  </span>
			</div>
			<div class="form-group" style="width: 63mm;float: left;margin-bottom: 1mm;">
				<c:choose>
				   <c:when test="${bills.tzName == '10'}"> 
				   		  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;">
						     接收日期:
						  </label>
						  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
						  <fmt:formatDate value="${bills.receiveDate }" pattern="yyyy-MM-dd"/>
						  </span>          
				   </c:when>
				   <c:when test="${bills.tzName == '11'}"> 
				   		  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;">
						     拒收日期:
						  </label>
						  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
						  <fmt:formatDate value="${bills.rejectionDate }" pattern="yyyy-MM-dd"/>
						  </span>          
				   </c:when>
				   <c:otherwise>
				     	  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;">
						     
						  </label>
						  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
						  
						  </span>   
				   </c:otherwise>
				</c:choose>
			</div>
			<div class="form-group" style="width: 63mm;float: left;margin-bottom: 1mm;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;">
			     调出部门:
			  </label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
			  ${bills.outDepartmentName }
			  </span>
			</div>
			<div class="form-group" style="width: 63mm;float: left;margin-bottom: 1mm;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;">
			      发货人:
			  </label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
			  ${bills.postName }
			  </span>
			</div>
			<div class="form-group" style="width: 63mm;float: left;margin-bottom: 1mm;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;">
			     调出日期：
			  </label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
			  <fmt:formatDate value="${bills.billsDate }" pattern="yyyy-MM-dd"/>
			  </span>
			</div>
			<div class="form-group" style="width: 63mm;float: left;margin-bottom: 1mm;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;">
			    调入部门:
			  </label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
			  ${bills.inDepartmentName }
			  </span>
			</div>
			<div class="form-group" style="width: 63mm;float: left;margin-bottom: 1mm;">
			  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 17mm;text-align: right;">
			     单据备注:</label>
			  <span class="col-sm-8" style="padding-left: 3px;padding-right: 0px;">
			  ${bills.remark }
			  </span>
			</div>	
	    </div>
		  
		<!-- 单据明细 -->
		<table class="table table-bordered" border-color="black">
			<thead >
				<tr style="padding: 0;border-color: #000 !important;">
					<th style="border-color: #000 !important;font-size: 3mm;font-weight: bold;width: 13mm;text-align: center; padding: 0;">序号</th>
					<th style="border-color: #000 !important;font-size: 3mm;font-weight: bold;text-align: center;padding: 0;">仓库名称</th>
					<th style="border-color: #000 !important;font-size: 3mm;font-weight: bold;text-align: center; padding: 0;">商品名称</th>
					<th style="border-color: #000 !important;font-size: 3mm;font-weight: bold;text-align: center;padding: 0;">数量</th>
					<c:if test="${(checkCost)== true}">
						<th style="border-color: #000 !important;font-size: 3mm;font-weight: bold;text-align: center;padding: 0;">调拨单价</th>
						<th style="border-color: #000 !important;font-size: 3mm;font-weight: bold;text-align: center;padding: 0;">调拨总价</th>
					</c:if>
					<th style="border-color: #000 !important;font-size: 3mm;font-weight: bold;text-align: center;padding: 0;">商品备注</th>
				</tr>
			</thead>
			<tbody>
				<c:set var="sumNum4" value="0"></c:set>
				<c:set var="sumPri4" value="0"></c:set>
				<c:forEach items="${bills.detaiList}" var="detail" varStatus="status">
					<c:set var="sumNum4" value="${sumNum4+detail.goodsNumber}"></c:set>
					<c:set var="sumPri4" value="${sumPri4+detail.amount}"></c:set>
					<tr style="border-color: #000 !important;padding: 0;">
						<td style="border-color: #000 !important;font-size: 3mm;text-align:center;padding: 0;">${status.count}</td>
						<td style="border-color: #000 !important;font-size: 3mm;text-align:left;padding: 0;">${detail.storageName}</td>
						<td style="border-color: #000 !important;font-size: 3mm;text-align:center;padding: 0;">${detail.goodsName}</td>
						<td style="border-color: #000 !important;font-size: 3mm;text-align:center;padding: 0;">${detail.goodsNumber}</td>
						<c:if test="${(checkCost)== true}">
							<td style="border-color: #000 !important;font-size: 3mm;text-align:center;padding: 0;">${detail.price}</td>
							<td style="border-color: #000 !important;font-size: 3mm;text-align:center;padding: 0;">${detail.amount}</td>
						</c:if>
						<td style="border-color: #000 !important;font-size: 3mm;text-align:left;padding: 0;">${detail.remark}</td>
					</tr>
				</c:forEach>		
				<tr style="border-color: #000 !important;padding: 0;">
					<td colspan="3" align="center" style="border-color: #000 !important;font-size: 4mm;padding: 0;">合计</td>
					<td style="border-color: #000 !important;font-size: 3mm; padding: 0;" align="center">${sumNum4 }</td>
					<td style="padding: 0;"></td>
					<c:if test="${(checkCost)== true}">
						<td colspan="1" align="center" style="border-color: #000 !important;font-size: 3mm; padding: 0;">${sumPri4 }</td>
					</c:if>
					<td style="border-color: #000 !important;padding: 0"></td>
				</tr>
			</tbody>
		</table>
		
		<!-- 单据表尾 -->
	    <div id="formBottom" style="font-size: 3mm;">
			<div class="form-group" style="width: 46mm;float: left;">
				<c:choose>
				   <c:when test="${bills.tzName == '10'}"> 
				   		  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 25mm;">
						    接收人:
						  </label>
						  <span style="padding-left: 3px;padding-right: 0px;width: 20mm;">
						  ${bills.rejectionName }
						  </span>    
				   </c:when>
				   <c:when test="${bills.tzName == '11'}"> 
				   		  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 25mm;">
						     拒收人:
						  </label>
						  <span style="padding-left: 3px;padding-right: 0px;width: 20mm;">
						  ${bills.receiveName }
						  </span>        
				   </c:when>
				   <c:otherwise>
				     	  <label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 25mm;">
						     
						  </label>
						  <span style="padding-left: 3px;padding-right: 0px;width: 20mm;">
						  
						  </span> 
				   </c:otherwise>
				</c:choose>
			</div>
			<div class="form-group" style="width: 46mm;float: left;">
			<label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 25mm;"></label>
			<span style="padding-left: 3px;padding-right: 0px;width: 20mm;"></span>
			</div>
			<div class="form-group" style="width: 46mm;float: left;">
			<label class="col-sm-4 control-label" style="padding-left: 1px;padding-right: 0px;width: 25mm;"></label>
			<span style="padding-left: 3px;padding-right: 0px;width: 20mm;"></span>
			</div>
			<div class="form-group" style="width: 46mm;float: left;">
			  <label class="col-sm-12 control-label" style="padding-left: 1px;padding-right: 0px;width: 45mm;">
			     经办人:____________
			  </label>
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
