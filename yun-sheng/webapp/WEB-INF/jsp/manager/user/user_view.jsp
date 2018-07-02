<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%> 
<!DOCTYPE html>
<head>
	<title>内容页</title>
	<script type="text/javascript" src="../js/lib/jquery-1.7.1.js"></script>
	<script type="text/javascript">
		$(document).ready(function() {
			//保存
			$('.nav').click(function(){
				var the_url = "saveUser.do";
				$.ajax({
					type : "post",
					url : the_url,
					dataType : "html",
					data : $('#form2').serialize(),
					cache: false,
					async : false,
					success : function(data){
						var obj = eval('(' + data + ')');
						if(obj.result == 1){
							alert("保存成功");
							window.location.href = "listUser.do"
						}else{
							alert("保存失败");
						}
					},
					error: function(XMLHttpRequest, textStatus, errorThrown) {   
						alert("XMLHttpRequest.status="+XMLHttpRequest.status+"\nXMLHttpRequest.readyState="+XMLHttpRequest.readyState+"\ntextStatus="+textStatus);
			    	}
				});
			});
		});

		function sub(){
			document.form2.action = "saveUser.do";
			$("#form2").submit();
		}
	</script>
</head>

<body>
<div>
	<c:if test="${user.id == null}">
		添加用户信息
	</c:if>
	<c:if test="${user.id != null}">
		编辑用户信息
	</c:if>
</div>

<form name="form2" id="form2" method="post" enctype="multipart/form-data">
	<table border="1">
		<tr>
			<th>用户名</th>
			<td>
				<input type="hidden" name="id" value="${user.id }"/>
				<input type="text" name="userName" id="userName" value="${user.userName }">
			</td>
		</tr>
		<tr>
			<th>密码</th>
			<td><input type="password" name="password" id="password" value="${user.password }" <c:if test="${user.id != null}">readonly="readonly"</c:if>></td>
		</tr>
		<tr>
			<th>姓名</th>
			<td><input type="text" name="name" id="name" value="${user.name }" ></td>
		</tr>
		<tr>
			<th>手机</th>
			<td><input type="text" name="mobile" value="${user.mobile }" id="mobile"/></td>
		</tr>
		<tr>
			<th>性别</th>
			<td>
				<select name="sex" id="sex">
					<option value="0" <c:if test="${!user.sex}">selected="selected"</c:if>>女</option>
					<option value="1" <c:if test="${user.sex}">selected="selected"</c:if>>男</option>
				</select>
			</td>
		</tr>
		<tr>
			<th>部门</th>
			<td>
				<select name="departmentId" id="departmentId">
				    <option value="0">--请选择部门--</option>
				    <option value="1" <c:if test="${user.departmentId == 1}">selected="selected"</c:if>>设计部</option>
				    <option value="2" <c:if test="${user.departmentId == 2}">selected="selected"</c:if>>销售部</option>
				    <option value="3" <c:if test="${user.departmentId == 3}">selected="selected"</c:if>>人事部</option>
				</select>
			</td>
		</tr>
		<tr>
			<th>职务</th>
			<td>
				<select name="postId" id="postId">
				    <option value="0">--请选择职务--</option>
				    <option value="1" <c:if test="${user.postId == 1}">selected="selected"</c:if>>总经理</option>
				    <option value="2" <c:if test="${user.postId == 2}">selected="selected"</c:if>>销售经理</option>
				    <option value="3" <c:if test="${user.postId == 3}">selected="selected"</c:if>>人事经理</option>
				</select>
			</td>
		</tr>
		<tr>
			<th>状态（在职/离职）</th>
			<td><input type="checkbox" name="status" id="status" <c:if test="${user.status}"> checked="checked"</c:if>/></td>
		</tr>
		
		<tr>
			<th>图片_1</th>
			<td>
				 <input name="imgFile_1" id="imgFile_1" type="file" /> 
			</td>
		</tr>
		
		<tr>
			<th>图片_2</th>
			<td>
				 <input name="imgFile_2" id="imgFile_2" type="file" /> 
			</td>
		</tr>
		
		<tr>
			<td colspan="2" align="center">
				<a href="#" class="nav">保存</a>
				<a href="#" onclick="sub()">保存image</a>
			</td>
		</tr>
	</table>
</form>

</body>
</html>