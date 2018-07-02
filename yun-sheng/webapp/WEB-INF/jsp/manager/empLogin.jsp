<%@ page language="java" pageEncoding="utf-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head> 
	<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
	<title>执信软件手机登录页面</title>
	<link rel="stylesheet" type="text/css" href="${basePath}/css/pagecss/login.css">
	<link rel="stylesheet" type="text/css" href="${basePath}/css/base.css"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/bootstrap.css" />
		<link rel="stylesheet" type="text/css" href="${basePath}/css/jquery-ui.css" />
		<link rel="stylesheet" type="text/css" href="${basePath}/js/skins/all.css" />
		<link rel="stylesheet" type="text/css" href="${basePath}/css/animate.css"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/bootstrap-select.css"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/font-awesome.css"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/iconfont.css"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/pagecss/treepage.css"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/jquery.datetimepicker.css"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/ui.jqgrid-bootstrap.css"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/admin/blocMessage.css"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/cw/zTreeStyle/zTreeStyle.css"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/html/muti_select/multi.css" />
	<script type="text/javascript" src="${basePath}/js/jquery-1.12.4.min.js" ></script>
	<script type="text/javascript" src="${basePath}/js/lib/jquery.cycle.all.js" ></script>
	<script type="text/javascript" src="${basePath}/js/lib/main.js" ></script>
	<script src="${basePath}/js/bootstrap.min.js" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/jquery.datetimepicker.full.js" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/grid.locale-cn.js" type="text/javascript" charset="utf-8"></script>		
	<script src="${basePath}/js/commonjs/xm.js" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/zxsaas_plus.js" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/cw/jquery.ztree.all-3.5.min.js" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/erp/authority/common.js?v=1.221.5" type="text/javascript" charset="utf-8"></script>
	<script type="text/javascript" src="${basePath}/js/emplogin/emplogin.js" ></script>

</head>
	<body>
		<div id="container" >
		
		    <div id="content">
		        <div id="subcontent">
			    	<div id="lengend">
			    		<img src="${basePath}/images/logo.png" id="logo" alt="执信软件">
			    		<span id="sys-name">执信软件手机销售管理系统</span>
			    	</div>
		    	    <form name="form1" id="form1" method="post">
		    	    <div id="input-area"> 
		    		   <div id="user">
		    		   <img src="${basePath}/images/user.png" alt="工号">
                       <input type="text" id="username" name="login" value="CZY08" /><br/>
		    		   </div>
		    		   <div id="secret">
		    		   <img src="${basePath}/images/pwd.png" alt="密码">
                       <input type="password" id="password" name="passwd" value="123456"/> 
		    		   </div>
		    		</div>
		    			<input type="button" value="登录" id="sbm-login" />
		    	   </form>
		    	</div>
		    </div>
		</div>
	</body>
	
			<!--充值 模态窗-->
		<div class="modal fade" id="addCashModal" tabindex="-1" role="dialog">	
			<div class="modal-dialog  model-dialog1">
			    <div class="modal-content">
			      <div class="modal-header" >
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					<h4 class="modal-title " >公司选择</h4>
				  </div>
			      <div class="modal-body">
			          <div class="tp-info addCash-info" style="height: 189px;">
			          	<p>
			          	    <input type="hidden" id="eid">
			          		<span>公司名称</span>
			          		<select name="companyId" id="companyId">
			          		
			          		</select>
			          	</p>
			          </div>
			         
			      </div>
			      <div class="modal-footer">
			      		<button type="button" class="btn btn-primary companySave">确定</button>
						<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
					
                  </div>
			      
			    </div>
  			</div>
		</div> <!--modify end--><!--充值莫态框 end-->
		<script>
		$(function(){
		     if($("#usename").val==""){
		    	 $("#usename").focus();
		     }else{
			     var v = $("#password").val();
		    	 $("#password").focus();
		    	 $("#password").val("");
		    	 $("#password").val(v);
		     }

	    });

		</script>
</html>