<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%> 
<!DOCTYPE html>
<head>
	<title>内容页</title>
	<script type="text/javascript" src="${path}/manager/js/lib/jquery-1.7.1.js"></script>
<script type="text/javascript">
		$(document).ready(function() {
			//保存
			$('.nav').click(function(){
				var the_url = "toAccountUpdate.do";
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
							window.location.href = "account.do"
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
	<form name="form2" id="form2" method="post">
		
		
		<table class="formTable">
		<tr>
		<td colspan="2" align="center"><a href="#" class="nav">保存</a></td>
		</tr>
		<%@ include file="form_include.jsp" %>
		</table>
	</form>
</body>
