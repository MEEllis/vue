<%@ page language="java" pageEncoding="utf-8"%>
<!DOCTYPE>
<html>
  <head>
    <meta charset="UTF-8">
	<title>500</title>
	<style>
		body,p,img,button{margin:0; padding:0;}
		a{text-decoration:none;}
		body{
			font-family:"microsoft yahei";
		}
		#warp{
			width: 100%;
			height: 100%;
			margin: 100px auto 20px;
			text-align: center;
			color: #4e6d8f;
		}
		#warp img{
			padding-left: 20px;
			vertical-align: middle;
		}
		#warp p{
			font-size: 18px;
			margin: 24px 0 18px;
		}
		#warp p strong{
			font-size: 24px;
			font-weight: 500;
		}
		#warp .warp_p{
			font-size:14px ;
		}
		#warp button{
			border-top-style: none;
			border-right-style: none;
			border-bottom-style: none;
			border-left-style: none;
			outline:none;
			margin-top: 16px;
			width: 250px;
			height: 34px;
			color: #f5f7fa;
			border-radius: 5px;
			background-color:#4e6d8f ;
			font-size: 16px;
			font-family: "microsoft yahei";
		}
	</style>
  </head>  
	<body>
		<div id="warp">
			<img src="/manager/images/500.png"/>
			<p><strong>抱歉！ </strong>内部服务器错误！</p>
			<p class="warp_p" id="piv">建议您重新返回进行浏览，谢谢！</p>
			<br/>
			<div id="btn"><button onclick="javascript:history.back(-1);">返回</button></div>
		</div>
	</body>
	<script type="text/javascript">
		if(window.top != window.self){
			document.getElementById("btn").style.display = "none";
			document.getElementById("piv").style.display = "none";
		}
	</script>
</html>
