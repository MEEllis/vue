<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = path+"/YSHomePage";
%>

<div class="lg-footer">
		<div class="lg-container">
			<div class="row">
            <div class="col-md-6">
            	<div class="col-md-12" style="font-size: 22px;color: white;margin-top:50px;">现在开始</div>
            	<div class="col-md-12" style="font-size: 22px;color: white;margin-top:20px;">全新的工作方式，你还在等什么</div>
            	<div class="col-md-12" style="margin-top:40px">
            	<div >
					<a href="<%=basePath%>/askFor.jsp" class="btn btn-info" style="height: 50px;background: #23C0F7;font-size: 22px;color: #ffffff;width: 238px;border-radius: 5px;">
							立即申请试用
						</a>
					</div>
            	</div>
            </div>
            </div>
		</div>
	</div>


<div class="foot" style="padding-top:50px;padding-bottom:50px;">
	<div class="lg-container">
	 	<div class="row" >	
	 		<div class="col-md-4 col-sm-12" style="overflow:hidden">
	 			<h2>关于</h2>
	 			
	 			<div class="footerB" style="margin-top:30px;float:left">
	 			<span>武汉云盛联达信息技术有限公司   版权所有</span><br/>
	 			<span>2016 鄂ICP备16020839号</span><br/>
	 			
	 			</div>
	 			<div style="float:right;width:1px;height:70px;background:#eeeeee;margin-right:30px;margin-top:30px"></div>
	 				 			
	 		</div>
	 		<div class="col-md-4 col-sm-12" style="overflow:hidden">
	 			<h2>联系</h2>
	 			<div  style="float:left;margin-top:30px;">
	 			<span>客服热线:4008263315</span><br/>
	 			</div>
	 		</div>
	 		<div class="col-md-4 col-sm-12"  style="padding-top:0;overflow:hidden">
	 			<h2>关注</h2>
				<span>官方微信：</span><span style="margin-left:60px;">官方微博：</span><br/>
				<img src="<%=basePath%>/img/erweima.jpg" style="width:120px;height:120px;margin:15px 15px 0 0;" alt=""/>
				<img src="<%=basePath%>/img/erweima.jpg" style="width:120px;height:120px;margin:15px 0 0 0;" alt=""/>
			</div>
 		</div>
	</div>
</div>
	<!--提示 模态窗-->
	<div class="modal fade" id="warnModal" tabindex="-1" role="dialog">	
		<div class="modal-dialog  model-dialog1">
		    <div class="modal-content">
		      <div class="modal-header" >
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				<h4 class="modal-title ">信息提示</h4>
				<input type="hidden" id="hideUrl">
			  </div>
		      <div class="modal-body">
		          <div class="tp-info addCash-info" >
		          	<p class="warnMsg" style="color: red">
		          	</p>
		          </div>
		      </div>
		      <div class="modal-footer">
		      		<button type="button" class="btn btn-primary warnMsgClick">确定</button>
					<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
              </div>
		    </div>
		</div>
	</div> <!--modify end--><!--充值莫态框 end-->
	<!--充值 模态窗-->
	<div class="modal fade" id="addCashModal" tabindex="-1" role="dialog">	
		<div class="modal-dialog  model-dialog1">
		    <div class="modal-content">
		      <div class="modal-header" >
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				<h4 class="modal-title ">公司选择</h4>
			  </div>
		      <div class="modal-body">
		          <div class="tp-info addCash-info" >
		          	<p>
		          	    <input type="hidden" id="eid">
		          		<span>公司名称</span>
		          		<select name="companyId" id="companyId"></select>
		          	</p>
		          	<p class="warnMsg" style="color: red">
		          	
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
<!--修改密码 模态窗-->
<div class="modal fade" id="changePwdModal" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title">修改密码</h4>
			</div>
			<div class="modal-body">
				<form class="form-horizontal" role="form">
					<div class="form-group" style="margin-bottom: 0px;">
						<label class="col-sm-12 control-label psd">温馨提示：&nbsp;您当前的密码过于简单，<br/>&emsp;&emsp;&emsp;&emsp;&emsp;为了安全考虑，请按照密码规则，重新设置一下密码</label>
					</div>
					<div class="form-group">
						<label class="col-sm-12 control-label psd">密码规则：&nbsp;至少6位，不能全是数字，可由数字和字母组成。</label>
					</div>
					<div class="form-group">
						<label for="newPsd" class="col-sm-2 control-label">新密码</label>
						<div class="col-sm-10">
							<input type="password" class="form-control" id="newPsd" placeholder="Password">
						</div>
					</div>
					<div class="form-group">
						<label for="surePsd" class="col-sm-2 control-label">确认密码</label>
						<div class="col-sm-10">
							<input type="password" class="form-control" id="surePsd" placeholder="Password">
						</div>
					</div>
				</form>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-primary updatePwdClick">确定</button>
			</div>
		</div>
	</div>
</div><!--修改密码模态框 end-->
  </body>
</html>
