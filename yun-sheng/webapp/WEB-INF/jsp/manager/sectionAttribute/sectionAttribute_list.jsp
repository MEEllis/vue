<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<head>
	<title>列表页</title>
	<style>
body,h1,h2,h3,h4,h5,h6,hr,p,blockquote, /* structural elements 结构元素 */
	dl,dt,dd,ul,ol,li, /* list elements 列表元素 */ pre,
	/* text formatting elements 文本格式元素 */ form,fieldset,legend,button,input,textarea,
	/* form elements 表单元素 */ th,td, /* table elements 表格元素 */ img
	/* img elements 图片元素 */ {
	border: 0;
	margin: 0;
	padding: 0;
}

html {
	overflow: hidden;
}

.logintab {
	position: relative;
	top: 45%
}

.logintab td {
	line-height: 50px;
	white-space: nowrap
}

.loginuser{
	width:30px; 
	height:10px; 
	background:url(${basePath}/images/login/loginuser.png) no-repeat; 
	border:none; 
	line-height:48px; 
	padding-left:44px; 
	font-size:14px; 
	font-family:verdana; 
	font-weight:700;
}

.loginpwd{
	width:30px; 
	height:10px; 
	background:url(${basePath}/images/login/loginpassword.png) no-repeat; 
	border:none;
	line-height:48px; 
	padding-left:44px; 
	font-size:14px; 
	color:#90a2bc;
}


/* 按钮 */
.button {
	-moz-border-radius: 4px;
	-webkit-border-radius: 4px;
	-khtml-border-radius: 4px;
	border-radius: 4px;
	-moz-box-shadow: inset 1px 1px 0 rgba(255, 255, 255, 0.3);
	-webkit-box-shadow: inset 1px 1px 0 rgba(255, 255, 255, 0.3);
	box-shadow: inset 1px 1px 0 rgba(255, 255, 255, 0.3);
	cursor: pointer;
	display: inline-block;
	font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
	font-size: 14px;
	font-weight: bold;
	padding: 5px 10px;
	outline: none !important;
	text-align: center;
	text-decoration: none;
	position: relative;
	-moz-box-sizing: border-box !important;
	line-height: 10px;
}

.button-blue {
	background: #0095cd;
	background: -webkit-gradient(linear, left top, left bottom, from(#00adee),to(#0078a5) );
	background: -moz-linear-gradient(top, #00adee, #0078a5);
	-pie-background: linear-gradient(top, #00adee, #0078a5);
	border: 1px solid #034462;
	color: #fff;
	text-shadow: 0 1px 1px #00adee;
}

.button-blue:hover,.button-blue:focus {
	background: #007ead;
	background: -webkit-gradient(linear, left top, left bottom, from(#0095cc),to(#00678e) );
	background: -moz-linear-gradient(top, #0095cc, #00678e);
	-pie-background: linear-gradient(top, #0095cc, #00678e);
	border: 1px solid #234;
	color: #fff;
}
table{
	border:solid black 2px;
}
td{
	border:solid black 2px;
	margin:0px;
}
</style>
</head>

<body>
	<div>
		<li><a href="viewSectionAttribute.do" target="_blank">添加</a></li>
	</div>	
	
	<table border="1">
		<thead>
			<tr>
				<th>集团名称</th>
				<th>公司名称</th>
				<th>部门属性编码</th>
				<th>部门属性名称</th>
				<th>启用标志</th>
				<th>备注</th>
				<th>新增人</th>
				<th>新增时间</th>
				<th>修改人</th>
				<th>修改时间</th>
				<th>删除</th>
				<th>修改</th>
			</tr>
		</thead>
		<tbody>
			<c:forEach items="${sectionAttributeList}" var="tsectionattribute" varStatus="status">
				<tr>
					<td>${tsectionattribute.groupName}</td>
					<td><input type="text" value="${tsectionattribute.companyName}"></td>
					<td><input type="text" value="${tsectionattribute.code}"></td>
					<td><input type="text" value="${tsectionattribute.name}"></td>
					<td><input type="text" value="${tsectionattribute.enable}"></td>
					<td><input type="text" value="${tsectionattribute.remark}"></td>
					<td><input type="text" value="${tsectionattribute.createUName}"></td>
					<td><input type="text" value="${tsectionattribute.createTime}"></td>
					<td><input type="text" value="${tsectionattribute.updateUName}"></td>
					<td><input type="text" value="${tsectionattribute.updateTime}"></td>
					<td><a href="viewSectionAttribute?id=${tsectionattribute.id}" target="_blank">编辑</a></td>
					<td><a href="deleteSectionAttribute?id=${tsectionattribute.id}">删除</a></td>
				</tr>
			</c:forEach>
		</tbody>
	</table>
	
	当前第【${page}】页 &nbsp;&nbsp;<a href="list?page=${page-1}&pageCount=${pageCount}">上一页</a>&nbsp;&nbsp;<a href="list?page=${page+1}&pageCount=${pageCount}">下一页</a>&nbsp;&nbsp; 共【${pageCount}】页 &nbsp;&nbsp; 总计【${totalCount}】记录
	
</body>
</html>