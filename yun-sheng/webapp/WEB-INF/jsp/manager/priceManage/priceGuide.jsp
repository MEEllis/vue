<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%> 
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<title>指导价格</title>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/base.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/bootstrap.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="${basePath}/css/jquery-ui.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="${basePath}/js/skins/all.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="${basePath}/css/animate.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/bootstrap-select.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/font-awesome.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/iconfont.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/pagecss/treepage.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/jquery.datetimepicker.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/ui.jqgrid-bootstrap.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/cw/zTreeStyle/zTreeStylePublicModel.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/priceManage/guidePrice.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/market/public.css?v=${version}" />
		
		<link rel="stylesheet" type="text/css" href="${basePath}/js/cw/bootstrap/css/bootstrapValidator.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="${basePath}/css/market/public.css?v=${version}" />
		<script type="text/javascript">
			//全局变量
			var gl_groupId = ${groupId};//集团ID
			var basePath = "${basePath}";
		</script>
	</head>
	<body>
	
	
	    	<div id="AUTH" data-code="JTZDJGD" class="btn-group btnHundred" role="group" >
				<div class="btn-group">
					<button type="button" class="btn cutVal" data-flag="-2">首单</button>
					<button type="button" class="btn cutVal" data-flag="-1">上一单</button>
					<button type="button" class="btn cutVal" data-flag="1">下一单</button>
					<button type="button" class="btn cutVal" data-flag="2">末单</button>
				</div>
				<button type="button" class="btn add" data-eventname="add">新增</button>
			  <button type="button" class="btn save" data-eventname="save">保存</button>	
			  <button type="button" class="btn actPrice" data-eventname="delete">执行价格</button>	
			  <div class="btn-group">
			  <button type="button" class="btn dropdown-toggle" data-eventname="delete" data-toggle="dropdown">
			 			 作废<span class="caret"></span>
			  </button>
			  		<ul class="dropdown-menu" role="menu">
				      <li id="Dele"><a href="javascript:void(0);">作废</a></li>
				      <li id="restore"><a href="javascript:void(0);">恢复</a></li>
				    </ul>
			  </div>
			  <button type="button" class="btn bill" data-eventname="delete" data-target="#changeTime" data-toggle="modal">查询</button>
			 
			   <button type="button" class="btn" data-eventname="delete" id="fastChange">快速改价</button>		  			  			  			  
			  <button type="button" class="btn" data-eventname="delete">退出</button>
			
			</div>
			
			
			<!-- 修改部位开始 -->
			<div class="well">
				<form id="inquire_option">
					<div class="inputbox container-fluid clearfix">
						<!--<div class="tip"><p class="tip_p">强制完成</p></div>-->
						<div class="row">
							<div class="Zpercent form-group">
								<span class="box_text2">单据编号：</span>
								<div class="col-sm-8">
									<div class="input-group">
									<input type="text" disabled class="form-control2 form-control delval getID" value="${tpriceMain.billsCode }" data-pricemainid="${tpriceMain.id }"/>
								</div></div>
							</div>
							<div class="Zpercent form-group">
								<span class="box_text2">单据日期：</span>
								<div class="col-sm-8">
									<div class="input-group">
									<input type="text" class="form-control2 form-control delval billDate" name='billsDate' value="${tpriceMain.billsDateString }"/>
								</div></div>
						    </div>
							
							<div class="Zpercent form-group">
								<span class="box_text2">备注：</span>
								<div class="col-sm-8">
									<div class="input-group">
									<input type="text" class="form-control2 form-control delval remark" name='remark' value="${tpriceMain.remark }"/>
								</div></div>
						    </div>
						</div>
						<div class="rightMap">
							<img class="showState" src="${basePath }/images/status/statusNotExecute.png" />
					  		<img class="obsolete" src="${basePath }/images/status/statusCancellation.png" />
						</div>
					</div>
				</form>
			</div>
		<!--表格及树-->
		<div class="contentWrap">
		
								<div class="contentLeft">
										<p>商品分类</p>
										<ul id="goodsClassify" class="ztree"></ul>
									</div>
											
											
											
											
											
											<div class="contentRight">
											<!-- 修改
												<div class="Zpercent">
													<span class="box_text2">快速过滤：</span>
													<span class="box_input input-group">
														<input type="text" class="form-control delval filterVal"/>
													</span>
											    </div>
											 -->
											
											<form class="form-inline" style="margin-bottom:15px;">
											   <div class="form-group">
											       <label class="control-label">快速过滤：</label>
											       <input type="text" class="form-control delval filterVal" />
											   </div>
											</form>
												
												
											<!-- 修改结束 -->
											<div>
										   <table id="mainGrid" class="zxsaastable"></table>
										  	</div>
											</div>
       
       </div>
       
       <div class="guideBottom">
       <div class="row">
<div class="Zpercent">
			<span class="box_text2">新增人：</span>
			<span class="box_input input-group">
			<input type="text" disabled class="form-control2 form-control delval addPer" value="${tpriceMain.createName }"/>
			</span>
</div>
<div class="Zpercent">
			<span class="box_text2">修改人：</span>
			<span class="box_input input-group">
			<input type="text" disabled class="form-control2 form-control delval revisePer" value="${tpriceMain.updateName }" />
			</span>
</div>
<div class="Zpercent">
			<span class="box_text2">执行人：</span>
			<span class="box_input input-group">
			<input type="text" disabled class="form-control2 form-control delval carryPer" value="${tpriceMain.executeName }"/>
			</span>
</div>
</div>
</div>


		<!--模态窗-->

		<div class="modal fade" id="changeTime" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog model-dialog2">
			    <div class="modal-content">
			      
			      <div class="modal-body">
			     	<div class="container-fluid">
			     		<div class="row">
			     			<div class="form-inline">
			     				<div class="form-group">
			     					<label class="control-label col-md-2 changeTop">查询日期</label>
			     					<div class="col-md-4">
			     						<input class="form-control" type="text" id="datetimepickerStart" />
			     					</div>
			     					<label class="control-label col-md-1 col-md-offset-1 changeTop">~</label>
			     					<div class="col-md-4">
			     						<input class="form-control" type="text" id="endTime" />
			     					</div>
			     				</div>
			     			</div>
			     			
			     		</div>
			     	
			     		<div class="row changeTop">
			     			<div class="col-md-7">
			     					<form class="form-horizontal" role="form">
										  <div class="form-group">
										    <label class="col-md-3 control-label">备注</label>
										    <div class="col-md-9">
										      <input type="text" class="form-control timeRemark">
										    </div>
										  </div>
									</form>
			     			</div>
			     			<div class="col-md-2 col-md-offset-1" >
			     				<button type="button" class="btn btn-warning filterBtn">单据过滤</button>
			     			</div>
			     		</div>
			     	</div>
			        	
			      </div>
			      
			    </div>
  			</div>
		</div>
		
       <!-- 改价模态窗 -->
       <div class="modal fade" tabindex="-1" id="changePriceModal">
			<div class="dialog model-dialog1">
				<div class="modal-content">
				<div class="modal-body">
					<div class="container-fluid">
					     <div class="row">
								<div class="col-md-2">
									<h3>价格修改</h3>
								</div>
								<div class="col-md-10 changeMargin">
									<form class="form-inline" role="form">
										<div class="form-group">
											<select class="form-control cacl-1">
												<option data-flag="8">指导价一</option>
												<option data-flag="9">指导价二</option>
												
											</select>
										</div>
										<div class="form-group">
											<label class="control-label">=</label>
											<select class="form-control cacl-2">
												<option data-flag="8">指导价一</option>
												<option selected data-flag="9">指导价二</option>
											</select>
										</div>
										<div class="form-group">
											<select class="form-control caclOp">
												<option>+</option>
												<option>-</option>
												<option>*</option>
												<option>/</option>
											</select>
										</div>
										<div class="form-group">
											<input type="text" class="form-control getNum" onkeyup='checkInput.checkNum(this,12);' />
										</div>
										
									</form>
								</div>
								
							</div>
						
						<div class="row">
						    <div class="col-md-2 col-md-offset-2">
									<button type="button" class="btn btn-primary" id="changeSure">确定</button>
								</div>
								<div class="col-md-2 col-md-offset-1">
									<button type="button" class="btn btn-primary" data-dismiss="modal">取消</button>
								</div>
						</div>
					</div>
				</div>
			   </div>
			</div>
		</div>


		<script src="${basePath}/js/jquery-1.12.4.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
		<script type="text/javascript" src="${basePath}/js/base.js?v=${version}"></script>
		<script src="${basePath}/js/bootstrap.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
		<script src="${basePath}/js/jquery.jqGrid.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
		<script src="${basePath}/js/jquery.datetimepicker.full.js?v=${version}" type="text/javascript" charset="utf-8"></script>
		<script src="${basePath}/js/grid.locale-cn.js?v=${version}" type="text/javascript" charset="utf-8"></script>
		<script src="${basePath}/js/commonjs/xm.js?v=${version}" type="text/javascript" charset="utf-8"></script>
		<script src="${basePath}/js/zxsaas_plus.js?v=${version}" type="text/javascript" charset="utf-8"></script>
		<script type="text/javascript" src="${basePath}/js/cw/jquery.ztree.all-3.5.min.js?v=${version}"></script>
		<script src="${basePath}/js/priceManage/guidePrice.js?v=${version}" type="text/javascript" charset="utf-8"></script>
		
		<script src="${basePath}/js/bootstrapValidator.js?v=${version}" type="text/javascript" charset="utf-8"></script>
		<script src="${basePath}/js/cw/bootstrap/js/validator-lynnjer.js?v=${version}" type="text/javascript" charset="utf-8"></script>
		<!-- 菜单权限验证 -->
		<script type="text/javascript" src="${basePath}/js/erp/authority/menuValidation.js?v=${version}"></script>
		<script type="text/javascript">
			$(function(){
				checkRole('#inquire_option');
			})
		</script>
	</body>
</html>