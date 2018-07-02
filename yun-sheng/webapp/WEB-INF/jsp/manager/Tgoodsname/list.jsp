<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%> 
<!DOCTYPE html>
<head>
	<title>列表页</title>
	
	<style>
	.tb td {background:#CCE6FA; border:1px solid #126EB5; color:#212121; padding:5px; }
	.hd td {background:#61B2EF; color:#0B416B; font-weight:bold; }
	</style>
	
</head>

<body>
	<div>
		<li><a href="show.do" target="_blank">添加</a></li>
	</div>	


	<table class="tb" border="1" cellspacing="0" cellpadding="0">
				<tr class="hd">
					<td>id</td>
					<td>groupName</td>
					<td>goodsCategoryName</td>
					<td>goodsBrandName</td>
					<td>goodsModelName</td>
					<td>goodsColorName</td>
					<td>code</td>
					<td>name</td>
					<td>ifManageImei</td>
					<td>imeiLength</td>
					<td>ifEnableAuxliaryImei</td>
					<td>auxliaryImeiLength</td>
					<td>valuationMethodsName</td>
					<td>rate</td>
					<td>status</td>
					<td>remark</td>
					<td>createUname</td>
					<td>createTime</td>
					<td>updateUname</td>
					<td>updateTime</td>
					<td>启用 ｜ 禁用</td>
					<td>编辑 ｜ 删除</td>
				</tr>
			<c:forEach items="${objList}" var="obj" varStatus="status">
				<tr class="b-tr">
					<td>${obj.id }</td>
					<td>${obj.groupName }</td>
					<td>${obj.goodsCategoryName }</td>
					<td>${obj.goodsBrandName }</td>
					<td>${obj.goodsModelName }</td>
					<td>${obj.goodsColorName }</td>
					<td>${obj.code }</td>
					<td>${obj.name }</td>
					<td>${obj.ifManageImei }</td>
					<td>${obj.imeiLength }</td>
					<td>${obj.ifEnableAuxliaryImei }</td>
					<td>${obj.auxliaryImeiLength }</td>
					<td>${obj.valuationMethodsName }</td>
					<td>${obj.rate }</td>
					<td>${obj.status }</td>
					<td>${obj.remark }</td>
					<td>${obj.createUname }</td>
					<td><fmt:formatDate value="${obj.createTime }" pattern="yyyy-MM-dd HH:mm"/>  </td>
					<td>${obj.updateUname }</td>
					<td><fmt:formatDate value="${obj.updateTime }" pattern="yyyy-MM-dd HH:mm"/>  </td>
					<td><a href="updateStatus?ids=${obj.id}&status=1" target="_blank">启用</a> ｜ <a href="updateStatus?ids=${obj.id}&status=0" target="_blank">禁用</a></td>
					<td><a href="show?id=${obj.id }" target="_blank">编辑</a> ｜ <a href="delete?id=${obj.id }" target="_blank">删除</a></td>
				</tr>
			</c:forEach>
	</table>
	
	当前第【${page}】页 &nbsp;&nbsp; 共【${pageCount}】页 &nbsp;&nbsp; 总计【${totalCount}】记录
	
</body>
</html>