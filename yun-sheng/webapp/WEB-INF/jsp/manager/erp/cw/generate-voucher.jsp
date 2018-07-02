<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE>
<html>
  <head>
    <title>生成凭证</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!-- 引入文件 -->
	<link rel="stylesheet" type="text/css" href="${basePath}/css/bootstrap.css?v=${version}" />
	<link rel="stylesheet" type="text/css" href="${basePath}/css/jquery-ui.css?v=${version}" />
	<link rel="stylesheet" type="text/css" href="${basePath}/css/ui.jqgrid-bootstrap.css?v=${version}"/>
	<link rel="stylesheet" type="text/css" href="${basePath}/css/iconfont.css?v=${version}"/>
	<link rel="stylesheet" type="text/css" href="${basePath}/css/pagecss/treepage.css?v=${version}"/>
	<link rel="stylesheet" type="text/css" href="${basePath}/css/jquery.datetimepicker.css?v=${version}"/>
	<link rel="stylesheet" type="text/css" href="${basePath}/css/cw/zTreeStyle/zTreeStylePublicModel.css?v=${version}"/>
	<link rel="stylesheet" type="text/css" href="${basePath}/css/market/public.css?v=${version}" />
	<link rel="stylesheet" type="text/css" href="${basePath}/css/erp/cw/generate-voucher.css?v=${version}" />
	<script type="text/javascript">
	
		//**********全局变量
		//基本目录
		var basePath = "${basePath}";
		var companyId = "${companyId}";
		var opEmpId = "${SESSION_KEY_USER.id}";
	</script>
	<style>
		#topForm .col-sm-8{ width: 200px;}
	</style>
  </head>
 
  <body>
  		<div class="mainbody" >
			<div id="AUTH" data-code="SCPZ" class="btn-group btnHundred" role="group" >
			</div>
			<ul class="stepList">
				<li class="nowStep">1.查询条件</li>
				<li >2.生成规则设置</li>
				<li>3.查询结果</li>
			</ul>
			<div class="stepBox">
				<div class="btn-group-vertical lastStep" >
					  <button type="button" class="btn btn-xs" onclick="lastStep($('.nowStep').index())">上一步</button>
				</div>
				<div class="btn-group-vertical nextStep">
					  <button type="button" class="btn btn-xs" onclick="nextStep($('.nowStep').index())">下一步</button>
				</div>
			</div>
			
			<div class="queryContainer">
				<!-- /S 表头  -->
				<form class="well form-horizontal unAllEdit" role="form" id="topForm" style="padding:20px 0;"> 
				  <!-- /S 表单控件  -->
				   	<div class="formBtn">
						<div class="form-group">
					  		<label class="col-sm-1 control-label">开始日期:</label>
					  		<div class="col-sm-8">
								<div class="input-group">
					    			<input  type="text" class="form-control startTimeStr" id="startTimeStr" name="startTimeStr" placeholder="年-月-日"  onblur='checkInput.checkTime(this,"#startTimeStr","#endTimeStr");'  />
					  			</div>
					  		</div>
					  		<label class="col-sm-1 control-label">结束日期:</label>
					  		<div class="col-sm-8">
								<div class="input-group">
					    			<input  type="text" class="form-control endTimeStr" name="endTimeStr" id="endTimeStr" placeholder="年-月-日"  onblur='checkInput.checkTime(this,"#startTimeStr","#endTimeStr");'  />
					  			</div>
					  		</div>
					  		 <label class="col-sm-1 control-label">部门:</label>
						  		<div class="col-sm-8">
									 <div class="input-group">
			                    		<input type="text" class="form-control" name="sectionId" value="" style="display: none;" >
			                    		<input type="text" class="form-control branch" name="branch" disabled="disabled">
			                    		<span class="input-group-addon">
			                    			<span class="glyphicon glyphicon-plus" style="cursor: pointer;" onclick="branchTree()"></span>
			                    		</span>
			                		</div>
						  		</div>
						  		<label class="col-sm-1 control-label">制单人:</label>
						  		<div class="col-sm-8">
									 <div class="input-group">
			                    		<input type="text" class="form-control" name="sectionId" value="" style="display: none;" >
			                    		<input type="text" class="form-control maker" name="sectionName" disabled="disabled">
			                    		<span class="input-group-addon">
			                    			<span class="glyphicon glyphicon-plus" style="cursor: pointer;" onclick="makerTree()"></span>
			                    		</span>
			                		</div>
						  		</div>
						  		<%--<label class="col-sm-1 control-label">往来单位:</label>--%>
						  		<%--<div class="col-sm-8">--%>
									 <%--<div class="input-group">--%>
			                    		<%--<input type="text" class="form-control" name="sectionId" value="" style="display: none;" >--%>
			                    		<%--<input type="text" class="form-control btype" name="sectionName" disabled="disabled">--%>
			                    		<%--<span class="input-group-addon">--%>
			                    			<%--<span class="glyphicon glyphicon-plus" style="cursor: pointer;" onclick="btypeTree()"></span>--%>
			                    		<%--</span>--%>
			                		<%--</div>--%>
						  		<%--</div>--%>
					  		
						</div>
						
					</div>
						  
					<div class="formBtn">
						<div class="form-group">
					  		<label class="col-sm-1 control-label">过滤模块:</label>
					  		<div class="col-sm-8">
								<div class="input-group">
					    			<select  class="form-control2 modelName" onchange="changeModule($('.modelName option:selected').val())">
											<option value="" selected>所有</option>
											<option value="供应链" >供应链</option>
											<option value="资产" >资产</option>
											<option value="人力资源" >人力资源</option>
											<option value="OA" >OA</option>
											<option value="CRM" >CRM</option>
									</select>
					  			</div>
					  		</div>
					  		<label class="col-sm-1 control-label">过滤分组:</label>
					  		<div class="col-sm-8">
								<div class="input-group">
					    			<select  class="form-control2 groupName"  onchange="changeGroup($('.groupName option:selected').val())" >
										<option value="" selected>所有</option>
										<option value="采购业务" >采购业务</option>
										<option value="销售业务" >销售业务</option>
										<option value="零售业务" >零售业务</option>
										<option value="仓储业务" >仓储业务</option>
										<option value="资金往来" >资金往来</option>
										<option value="业务管理" >业务管理</option>
										<option value="委托业务" >委托业务</option>
										<option value="受托业务" >受托业务</option>
										<option value="售后业务" >售后业务</option>
									</select>
					  			</div>
					  		</div>
					  		
						</div>
						
					</div>
				</form><!-- /E 表头  -->
	    	</div>
			<div class="module_group_tableBox">
				<table id="jqGrid_module_group" ></table>
			</div>
			
			<div class="receipts_list_tableBox">
				<table id="jqGrid_receipts_list" ></table>
			</div>
			
			
			
			<!-- 调出部门名称模态框（Modal） -->
			<div class="modal fade" id="branchModal" tabindex="-1" role="dialog" aria-labelledby="mySection" aria-hidden="true">
				<div class="modal-dialog tree-dialog modalSmall">
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
								&times;
							</button>
							<h4 class="modal-title" id="branchModalLabel">
								调出部门
							</h4>
						</div>
						<div class="modal-body tree-body">
							<ul id="branchTree" class="ztree"></ul>
						</div>
						
						<div class="modal-footer">
							<button type="button" class="btn btn-warning" data-dismiss="modal">取消</button>
						</div>
						
					</div><!-- /.modal-content -->
				</div><!-- /.modal -->
			</div>
			<!-- 调出部门名称模态框（Modal）结束 -->
			
			<!-- 调出制单人模态框（Modal） -->
			<div class="modal fade" id="makerModal" tabindex="-1" role="dialog" aria-labelledby="mySection" aria-hidden="true">
				<div class="modal-dialog tree-dialog modalSmall">
					<div class="modal-content" style="width:888px;overflow-x:hidden; ">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
								&times;
							</button>
							<h4 class="modal-title" id="makerModalLabel">
								选择制单人
							</h4>
						</div>
						<div class="modal-body" >
							<table id="jqGrid_maker_list" ></table>
							<div id="jqGrid_maker_list_footer" style="height:40px;"></div>
						</div>
						
						<div class="modal-footer">
							<button type="button" class="btn btn-warning" data-dismiss="modal">取消</button>
						</div>
						
					</div><!-- /.modal-content -->
				</div><!-- /.modal -->
			</div>
			<!-- 调出制单人模态框（Modal）结束 -->
			
			<!-- 调出往来单位模态框（Modal） -->
			<div class="modal fade" id="btypeTreeModal" tabindex="-1" role="dialog" aria-labelledby="mySection" aria-hidden="true">
				<div class="modal-dialog tree-dialog modalSmall">
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
								&times;
							</button>
							<h4 class="modal-title" id="btypeTreeModalLabel">
								往来单位
							</h4>
						</div>
						<div class="modal-body tree-body">
							<ul id="btypeTreeTree" class="ztree"></ul>
						</div>
						
						<div class="modal-footer">
							<button type="button" class="btn btn-warning" data-dismiss="modal">取消</button>
						</div>
						
					</div><!-- /.modal-content -->
				</div><!-- /.modal -->
			</div>
			<!-- 调出往来单位模态框（Modal）结束 -->
			
			<div id="jqGrid_maker_footer" style="height:80px;"></div>
		</div>
		
		<div class="resultBox" style="display:none;width:60%;margin: 0 auto;text-align: center;font-size: 22px;">
			<div class="resultDesc"></div>
			<div>
				<button id="queryFine" style="background:#6098CF;color:#fff" type="button" class="btn" data-eventname="printbtn">查询细明</button>
			</div>
		</div>
		
		
	<script src="${basePath}/js/jquery-1.12.4.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/base.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/jquery-form.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/bootstrap.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/jquery.jqGrid.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/jquery.datetimepicker.full.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/grid.locale-cn.js?v=${version}" type="text/javascript" charset="utf-8"></script>		
	<script src="${basePath}/js/zxsaas_plus.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/cw/jquery.ztree.all-3.5.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/cw/bootstrap/js/validator-lynnjer.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	
	<link rel="stylesheet" type="text/css" href="${basePath}/js/cw/bootstrap/css/bootstrapValidator.css?v=${version}" />
	<script src="${basePath}/js/bootstrapValidator.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<!-- 引用自定义JS文件-->
	<script src="${basePath}/js/erp/cw/generate-voucher.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<!-- 菜单权限验证 -->
	<script type="text/javascript" src="${basePath}/js/erp/authority/menuValidation.js?v=${version}"></script>
  </body>
  
</html>
