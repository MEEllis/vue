<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%> 
<!DOCTYPE html>
<head>
	<title>部门属性</title>
	<script type="text/javascript" src="../js/lib/jquery-1.7.1.js"></script>
	<script type="text/javascript">
		$(document).ready(function() {
			//保存
			$('.nav').click(function(){
				var the_url = "saveSectionAttribute.do";
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
							window.location.href = "list.do"
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
	</script>
</head>

<body>
<div>
	<c:if test="${tsectionattribute.id == null}">
		添加用户信息
	</c:if>
	<c:if test="${tsectionattribute.id != null}">
		编辑用户信息
	</c:if>
</div>

<form name="form2" id="form2" method="post">
	<table border="1">
		<tr>
			<th>部门属性编码</th>
			<td>
				<input type="hidden" name="id" value="${tsectionattribute.id }"/>
				<input type="text" name="tsectionattributeName" id="tsectionattributeName" value="${tsectionattribute.tsectionattributeName }">
			</td>
		</tr>
		<tr>
			<th>部门属性名称</th>
			<td><input type="text" name="name" id="name" value="${tsectionattribute.name}" <c:if test="${tsectionattribute.id != null}">readonly="readonly"</c:if>></td>
		</tr>
		<tr>
			<th>启用标志（启用/禁用）</th>
			<td><input type="checkbox" name="enable" id="enable" <c:if test="${tsectionattribute.enable}"> checked="1"</c:if>/></td>
		</tr>
		<tr>
			<th>备注</th>
			<td><input type="text" name="remark" value="${tsectionattribute.remark}" id="remark"/></td>
		</tr>
		
		
		<tr>
			<td colspan="2" align="center"><a href="#" class="nav">保存</a></td>
		</tr>
	</table>
</form>

</body>
</html>