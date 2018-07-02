<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%> 
<!DOCTYPE html>
<head>
	<title>列表页</title>
</head>

<body>
	<div>
		<li><a href="viewUser.do" target="_blank">添加</a></li>
		<li><a href="exportUser.do" target="_blank">导出</a></li>
	</div>	


	<table border="1">
		<thead>
			<tr>
				<th>ID</th>
				<th>用户名</th>
				<th>密码</th>
				<th>姓名</th>
				<th>头像</th>
				<th>性别</th>
				<th>手机</th>
				<th>部门</th>
				<th>职务</th>
				<th>注册时间</th>
				<th>在职/离职</th>
				<td>操作</td>
			</tr>
		</thead>
		<tbody>
			<c:forEach items="${userList }" var="user" varStatus="status">
				<tr>
					<td>${user.id }</td>
					<td>${user.userName }</td>
					<td>${user.password }</td>
					<td>${user.name }</td>
					<td>${user.headImage }</td>
					<td><c:choose><c:when test="${user.sex}">男</c:when><c:otherwise>女</c:otherwise></c:choose></td>
					<td>${user.mobile }</td>
					<td>${user.departmentId }</td>
					<td>${user.postId }</td>
					<td><fmt:formatDate value="${user.registTime }" pattern="yyyy-MM-dd HH:mm"/>  </td>
					<td><input type="checkbox" <c:if test="${user.status}"> checked="checked"</c:if>></td>
					<td><a href="viewUser?id=${user.id }" target="_blank">编辑</a> ｜ <a href="deleteUser?id=${user.id }">删除</a></td>
				</tr>
			</c:forEach>
		</tbody>
	</table>
	
	当前第【${page}】页 &nbsp;&nbsp; 共【${pageCount}】页 &nbsp;&nbsp; 总计【${totalCount}】记录
	
</body>
</html>