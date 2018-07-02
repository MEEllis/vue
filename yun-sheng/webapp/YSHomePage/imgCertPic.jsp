<%@ page language="java" contentType="image/JPEG; charset=utf-8"
	pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="image/JPEG; charset=utf-8">
		<title>Insert title here</title>
	</head>
	<body>
		<jsp:useBean id="image" scope="page"
			class="com.zx.soft.util.ImageCertCode" />
		<%
			out.clear();
			response.setHeader("Pragma", "No-cache");
			response.setHeader("Cache-Control", "no-cache");
			response.setDateHeader("Expires", 0);
			String str = image.getCertPic(68, 36, response.getOutputStream());
			// 将认证码存入SESSION
			session.setAttribute("certCode", str);
			//out.clear();
			out = pageContext.pushBody();
		%>
	</body>
</html>