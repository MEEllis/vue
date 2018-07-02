<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%
String path = request.getContextPath();
String basePath = path+"/YSHomePage";
%>

<div class="navbar navbar-default navbar-fixed-top" style='border:0;'>
	<div class="lg-container">
        <div class="navbar-header col-md-6">
            <a href="index.jsp" class="">
                <span id="logo">
                    <img src="<%=basePath%>/img/logo.png" alt=""/>
                </span>
            </a>
            <a href="#mynav" class="navbar-toggle collapsed" data-toggle="collapse" aria-expanded="false">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </a>
        </div>
        <div class=" col-md-6">
        	<div id="mynav" class="navbar-collapse collapse ntg" aria-expanded="false" >
        	 <ul class="nav navbar-nav mainBtn" >
                <li><a href="<%=basePath%>/index.jsp">首页</a></li>
                <li><a href="<%=basePath%>/proandserNew.jsp">产品</a></li>
                <li><a href="<%=basePath%>/price.jsp">价格</a></li>
                <li><a href="<%=basePath%>/service.jsp">服务</a></li>
                <li><a href="<%=basePath%>/we.jsp">我们</a></li>
            </ul>
        	<ul class="nav navbar-nav" >               
                <li class="dropdown">
                	<c:choose>
                		<c:when test="${SESSION_KEY_USER != null}">
                			<a href="/manager/empHome"><span style="color:red">欢迎您：${SESSION_KEY_USER.name }</span></a>
                		</c:when>
                		<c:otherwise>
                			<a href="javascript:void(0)" data-toggle="dropdown" id="dp" style="margin-left:15px;;color:#00CAE7;border:1px solid #00CAE7;border-radius:5px;margin-top:10px;padding:5px;width:100px;text-align:center;background:#23C0F7;color:white;">登录</a>
		                    <div class="dropdown-menu" style="height:280px;width:310px;background:white;margin-top:8px;">
		                        <form style="height:100%;overflow: hidden;padding: 10px;" autocomplete='off'>
		                            <h2 style='color:#31B0D5;text-align:center;'>登 录</h2>
		                            <div class="form-group">
		                                <label for="user" class="sr-only">用户名：</label>
		                                <input type="text" class="form-control" id="username" name="login" placeholder="用户名" value=""/>
		                            </div>
		                            <div class="form-group">
		                                 <input type="password" class="form-control" id="password" name="passwd"  placeholder="密码" value=""/> 
		                            </div>
		                            <div class="form-group">
		                                 <span style="float:left;width:77%"><input type="text" class="form-control" id="authCode" name="authCode" value="" placeholder="验证码"  maxLength="4"></span>
		                                 <span style="float:left;"><img src="/YSHomePage/imgCertPic.jsp" id="codeImg" style="height:34px;"/></span>
		                                 <!-- <span style="float:left;"><img src="/manager/emp/imgCertPic" id="codeImg" style="height:34px;"/></span> -->
		                            </div>
		                            <button type="button" class="btn btn-info btn-sm" id="sbm-login" style="width:100%; font-size:15px; margin-top:12px;">提 交</button>
		                        </form>
		                    </div>
                		</c:otherwise>
                	</c:choose>
                </li>
            </ul>
            
        </div>
        </div>
    </div>
</div>

<%--<div class="navbar navbar-default navbar-fixed-top" style='border:0;'>
    <div class="lg-container">
        <div class="navbar-header">
            <a href="index.jsp" class="">
                <span id="logo">
                    <img src="<%=basePath%>/img/logo.png" alt=""/>
                </span>
            </a>
            <a href="#mynav" class="navbar-toggle collapsed" data-toggle="collapse" aria-expanded="false">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </a>
        </div>
        
        <div class="navbar-left"></div>
    </div>
</div>
<div style="height: 50px;"></div>
--%>