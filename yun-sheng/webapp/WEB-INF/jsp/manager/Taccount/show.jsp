<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%> 

<!DOCTYPE html>
<head>
	<title>资金账户列表（demo）</title>
	
	<script type="text/javascript">
		function del(id) {
			var msg = "您真的确定要删除吗？\n\n请确认！";
			if (confirm(msg)){
				window.location.href="deleteAccount?id="+id;
			}
		}
		
	</script>
</head>


<body>	
		
		<form action="account" method="post">
		账户编号 <input id="code" name="code" type="text" value="" />
		<input id="submitButton" name="submitButton" type="submit" value="查询" />
		<table border="1">
		<thead>
			<tr>
				<th>账户ID</th>
				<th>集团ID</th>
				<th>公司ID</th>
				<th>账户编码</th>
				<th>账户类型ID</th>
				<th>银行名称ID</th>
				<th>开户名称</th>
				<th>账户名称</th>
				<th>银行卡号</th>
				<th>刷卡手续费</th>
				<th>刷卡最高额</th>
				<th>刷卡手续费顶额</th>
				<th>刷卡最低额</th>
				<th>最低手续费</th>
				<th>启用标志</th>
				<th>备注</th>
				<th>新增人ID</th>
				<th>新增时间</th>
				<th>修改人ID</th>
				<th>修改时间</th>	
				<th>操作..</th>
			</tr>
		</thead>
		<tbody>
			<c:forEach items="${accountList }" var="account" varStatus="status">
				<tr>
					<td>${account.id }</td>
					<td>${account.groupName }</td>
					<td>${account.companyName }</td>
					<td>${account.code }</td>
					<td>${account.accountype }</td>
					<td>${account.bankname }</td>
					<td>${account.accountHolder }</td>
					<td>${account.name }</td>
					<td>${account.bankCard }</td>
					<td>${account.swipeFees }</td>
					<td>${account.swipeHighLines }</td>
					<td>${account.swipeFeesHigh }</td>
					<td>${account.swipeLowLines }</td>
					<td>${account.swipeFeesLow }</td>
					<td>
					<c:if test="${!account.status}">禁用</c:if>
					 <c:if test="${account.status }">启用</c:if>
					 </td>
					<td>${account.remark }</td>
					<td>${account.createU }</td>
					<td><fmt:formatDate value="${account.createTime }" pattern="yyyy-MM-dd HH:mm:ss:SSS"/>  </td>
					<td>${account.updateU }</td>
					<td><fmt:formatDate value="${account.updateTime }" pattern="yyyy-MM-dd HH:mm:ss:SSS"/>  </td>
					<td><a href="${path}/manager/account/toEditAccount?id=${account.id }">修改</a>
						<!-- <a href="${path}/account/deleteAccount?id=${account.id }">删除</a></td> -->
						<a href="javascript:void(0);" onclick="del(${account.id });" >删除</a></td>
				</tr>
			</c:forEach>
		</tbody>
	</table>
	</form>
		当前第【${page}】页 &nbsp;&nbsp; 共【${pageCount}】页 &nbsp;&nbsp; 总计【${totalCount}】记录
		<a href="${path}/manager/account/account?page=1&&pageSize=${pageSize}">首页</a>
		<a href="${path}/manager/account/account?page=${page-1}&&pageSize=${pageSize}">上一页</a>
		<a href="${path}/manager/account/account?page=${page+1}&&pageSize=${pageSize}">下一页</a>
		<a href="${path}/manager/account/account?page=${pageCount}&&pageSize=${pageSize}">尾页</a>
		
		<li><a href="${path}/manager/account/toAddAccount">新增资金账户数据</a></li>
		<li><a href="${path}/manager/account/listAccountJson">返回资金账户json数据</a></li>
</body>
