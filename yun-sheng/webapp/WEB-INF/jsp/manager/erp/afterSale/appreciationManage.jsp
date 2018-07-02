<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>

	<head>
		<meta charset="utf-8" />
		<meta name="renderer" content="webkit" />
		<meta http-equiv="X-UA-Compatible" content="IE=9; IE=8; IE=7; IE=EDGE ; chrome=1" />
		<link rel="stylesheet" type="text/css" href="${basePath}/css/base.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/bootstrap.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="${basePath}/css/jquery-ui.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="${basePath}/css/bootstrap-select.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/font-awesome.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/iconfont.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/pagecss/treepage.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/jquery.datetimepicker.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/ui.jqgrid-bootstrap.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/cw/zTreeStyle/zTreeStylePublicModel.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/afterSale/appreciationManage.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="${basePath}/js/cw/bootstrap/css/bootstrapValidator.css?v=${version}" />
		<script type="text/javascript">
			//全局变量
			var gl_groupId = ${groupId};//集团ID
			var basePath = "${basePath}";
		</script>
		<title>增值服务管理</title>
		
	</head>

	<body >
			<!-------------------------------------表格开始----------------------------------------->
			<div class="bodyModel">
				<!-------------------------------------主页面开始----------------------------------------->
			   <div id="AUTH" data-code="ZZFWSZ" class="btn-group btnHundred" role="group" >
				  <button type="button" class="btn" data-eventname="printbtn" data-toggle="modal" data-target="#newChoose">新购服务</button>
				  <button type="button" class="btn" data-eventname="printbtn">增值服务使用明细</button>
				  <button type="button" class="btn blockUp" data-eventname="printbtn">停用/启用</button>
				  <button type="button" class="btn" data-eventname="printbtn" >取消</button>
				</div>
			<!-------------------------------------搜索条件开始----------------------------------------->
			<div class="well">
				<form id="appreciationVer">
					<div class="inputbox container-fluid clearfix">
						<div class="row">
							<div class="Zpercent form-group">
								<span class="box_text">手机串号：</span>
								<span class="box_input">
									<input id="imei" type="text" class="form-control" name="imei1"/>
								</span>
							</div>
							<div class="Zpercent form-group">
								<span class="box_text">会员卡号：</span>
								<span class="box_input">
									<input id="cardNo" type="text" class="form-control" name="cardNo1"/>
								</span>
							</div>
							<div class="Zpercent form-group">
								<span class="box_text">会员姓名：</span>
								<span class="box_input">
									<input id="memberName" type="text" class="form-control" name="memberName1"/>
								</span>
							</div>
							<div class="Zpercent form-group">
								<span class="box_text">联系电话：</span>
								<span class="box_input">
									<input id="telephone" type="text" class="form-control" name="telephone1"/>
								</span>
							</div>
						</div>
						<div class="row">
							<div class="Zpercent form-group">
								<span class="box_text">部门：</span>
								<span class="box_input">
									<select class="form-control section" />
									</select>
								</span>
							</div>
							<div class="Zpercent form-group">
								<span class="box_text">
									<button type="button" class="btn btn-w btn-info kuaiButton">查询</button>
								</span>
							</div>
						</div>
						
						
					</div>
					<!-- <div class="rightMap">
						<button type="button" class="btn btn-w btn-info kuaiButton">查询</button>
					</div> -->
				 </form>
			 </div>
			<!-------------------------------------搜索条件结束----------------------------------------->	
							
					<!----------------主表开始---------------------->
					<div class="jqGrid_wrap widthYF2 overflAuto">
						<table id="jqGrid_appreciationManage" class="zxsaastable"></table> 
	    				<div id="jqGridPager_appreciationManage"></div>
					</div>
				<!----------------切换表格---------------------->
				<div class="footYF">
				</div>
					<!--选项卡-->
			</div>
			<!-------------------------------------表格结束----------------------------------------->
		<!-------------------------------------主页面结束----------------------------------------->
		
		<!-- 新购服务模态框（Modal） -->
		<div class="modal fade" id="newChoose" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog modal990">
				<div class="modal-content ">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							新购服务
						</h4>
					</div>
				  <div class="modal-body">
				  <form id="appreciationVer2">
					<div class="inputModal">
				  		<div class="inputTab form-group">
				  			<span class="boxSpan">流水号：</span>
							<span>
								<input type="text" name="startTime" class="serviceInstanceNo" disabled/>
							</span>
				  		</div>
				  		<div class="inputTab form-group">
				  			<span class="boxSpan">购买日期：</span>
							<span>
								<input type="text" name="startTime" class="filterData buyDate" placeholder="年-月-日"  id="datetimepickerStart1" />
							</span>
				  		</div>
				  		<div class="inputTab form-group">
				  			<span class="boxSpan">手机串号：</span>
				  			<span><input type="text" class="imei" name="imei2"/></span>
				  		</div>
				  	</div>
				  	
				  	<div class="inputModal">
				  		<div class="inputTab form-group">
				  			<span class="boxSpan">商品名称：</span>
				  			<span><input type="text" class="smpcYF" disabled/></span>
				  			<input type="hidden" class="goodsId"/>
				  			<span class="colspan glyphicon glyphicon-plus spmcChoose" data-toggle="modal" data-target="#spmcChoose"></span>
				  		</div>
				  		<div class="inputTab form-group" style="margin-left: -4px;">
				  			<span class="boxSpan">型号：</span>
				  			<span style="margin-left: 2px;"><input type="text" class="model" disabled/></span>
				  		</div>
				  		<div class="inputTab form-group">
				  			<span class="boxSpan">颜色：</span>
				  			<span style="margin-left: 2px;"><input type="text" class="color" disabled/></span>
				  		</div>
				  	</div>
				  	
				  	<div class="inputModal">
				  		<div class="inputTab form-group">
				  			<span class="boxSpan">会员卡号：</span>
				  			<span><input type="text" class="cardNo" name="cardNo2"/></span>
				  		</div>
				  		<div class="inputTab form-group">
				  			<span class="boxSpan">会员姓名：</span>
				  			<span><input type="text" class="memberName" name="memberName2"/></span>
				  		</div>
				  		<div class="inputTab form-group">
				  			<span class="boxSpan">所属类别：</span>
				  			<span><input type="text" class="goodsCategoryName" disabled/></span>
				  		</div>
				  	</div>
				  	
				  	<div class="inputModal">
				  		<div class="inputTab form-group">
				  			<span class="boxSpan">服务名称：</span>
				  			<span><input type="text" class="fuwuName" disabled/></span>
				  			<input type="hidden" class="maddServiceId"/>
				  			<span class="colspan glyphicon glyphicon-plus serverName" data-toggle="modal" data-target="#serverName"></span>
				  		</div>
				  		<div class="inputTab form-group" style="margin-left: -4px;">
				  			<span class="boxSpan">联系电话：</span>
				  			<span class="" style="margin-left: 2px;"><input type="text" class="XGtelephone" name="telephone2"/></span>
				  		</div>
				  		<div class="inputTab form-group">
				  			<span class="boxSpan">预设定价：</span>
				  			<span style="margin-left: 2px;"><input type="text" class="setPrice" disabled/></span>
				  		</div>
				  	</div>
					
					<div class="inputModal">
						<div class="inputTab form-group">
				  			<span class="boxSpan">服务期限：</span>
				  			<span><input type="text" class="serviceDue" disabled/></span>
				  		</div>
						<div class="inputTab form-group">
				  			<span class="boxSpan">生效日期：</span>
							<span>
								<input type="text" name="startTime" class="filterData effectDate" placeholder="年-月-日" value="" id="datetimepickerStart2" />
							</span>
				  		</div>
				  		<div class="inputTab form-group">
				  			<span class="boxSpan">实收金额：</span>
				  			<span><input type="text" class="moneyCh" name="moneyCh"/></span>
				  			<span class="colspan glyphicon glyphicon-plus moneyCHU" data-toggle="modal"></span>
				  		</div>
				  	</div>
				  	</form>
				   </div>
					<div class="modal-footer">
						<button class="btn btn-w btn-info newFuwu" data-dismiss="modal">确定</button>
						<button type="button" class="btn btn-warning" data-dismiss="modal">取消</button>
					</div>
					
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div><!-- 新购服务模态框（Modal）结束 -->
		
		<!-- 服务名称模态框（Modal） -->
		<div class="modal fade" id="serverName" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog modalYQ">
				<div class="modal-content ">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							服务名称
						</h4>
					</div>
				  <div class="modal-body">
				  		<div class="jqGrid_wrap">
				  			<input type="hidden" class="fuwuIDYY" />
							<table id="jqGrid_serverName" class="zxsaastable"></table> 
	    					<div id="jqGridPager_serverName"></div>
    					</div>
				   </div>
					<div class="modal-footer">
						<button class="btn btn-w btn-info" data-dismiss="modal">确定</button>
						<button type="button" class="btn btn-warning" data-dismiss="modal">取消</button>
					</div>
					
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div><!-- 服务名称模态框（Modal）结束 -->
		
		<!-- 商品名称模态框（Modal） -->
		<div class="modal fade" id="spmcChoose" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog modalNine">
				<div class="modal-content ">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							商品名称
						</h4>
					</div>
				  <div class="modal-body">
				  
					<div class="tranLeft" style="overflow: auto;">
						<div class="left-tree">
							<input type="hidden" class="" />
							<ul id="spmcDataTree" class="ztree"></ul>
						</div>							
					</div>
					<div class="right-body">
						<div class="jqGrid_wrap">
							<input type="text" class="fasttips"/>
							<input type="hidden" class="goodsIdY"/>
							<table id="jqGrid_tranSpmc" class="zxsaastable"></table> 
	    					<div id="gridpager_tran"></div>
    					</div>
	    			</div>
					
				   </div>
					<div class="modal-footer">
						<!-- <a href="" class="btn btn-w btn-info" title="跳转到新增商品名称与权限挂钩" >新增</a> -->
						<button type="button" class="btn btn-warning" data-dismiss="modal">取消</button>
					</div>
					
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div><!-- 商品名称模态框（Modal）结束 -->
		
		<!--押金选择选择弹出窗 开始-->
		<div class="modal fade" id="moneyChoose" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog modalFour">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							付款方式选择
						</h4>
					</div>
					<div class="modal-body">
						<div class="container">
							
							<!--展示列表开始-->
							<div class="details">
								<!--表格-->
								<table class="moneyTab">
									<!-- <tr>
										<th>付款类别</th>
										<th>账户名称</th>
										<th>付款金额</th>
									</tr>
									<tr>
										<td>现金</td>
										<td>门店现金</td>
										<td><input type="text" class="money cash" onkeyup="this.value=this.value.replace(/[^\d\.]$/g,'') " onafterpaste="this.value=this.value.replace(/[^\d\.]$/g,'') "></td>
									</tr>
									<tr>
										<td>POS</td>
										<td>中国银行33216</td>
										<td><input type="text" class="money pos" onkeyup="this.value=this.value.replace(/[^\d\.]$/g,'') " onafterpaste="this.value=this.value.replace(/[^\d\.]$/g,'') "></td>
									</tr>
									<tr>
										<td>网付</td>
										<td>支付宝8888</td>
										<td><input type="text" class="money aliPay" onkeyup="this.value=this.value.replace(/[^\d\.]$/g,'') " onafterpaste="this.value=this.value.replace(/[^\d\.]$/g,'') "></td>
									</tr>
									<tr>
										<td>合计</td>
										<td colspan="2" style="text-align: right;" class="totalMoney"></td>
									</tr> -->
								</table>
							</div>
							<!--展示列表结束-->
						</div>
						
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-info saveMoney" data-dismiss="modal">保存后关闭</button>
						<button type="button" class="btn btn-warning" data-dismiss="modal">仅关闭</button>
					</div>
				</div><!-- /.modal-content -->
			</div>
		</div><!--押金选择选择弹出窗 结束-->
		
		
		<!-------------------------------------底部开始----------------------------------------->
		<!-------------------------------------底部结束----------------------------------------->
	</body>
	<script src="${basePath}/js/jquery-1.12.4.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script type="text/javascript" src="${basePath}/js/base.js?v=${version}"></script>
	<script src="${basePath}/js/bootstrap.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/jquery.jqGrid.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/jquery.datetimepicker.full.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/grid.locale-cn.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/commonjs/xm.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/zxsaas_plus.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/cw/jquery.ztree.all-3.5.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/afterSale/appreciationManage.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/afterSale/afterVerify.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/bootstrapValidator.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script type="text/javascript">
		$(function(){
			loadmodal();
		});
	</script>
	<!-- 菜单权限验证 -->
	<script type="text/javascript" src="${basePath}/js/erp/authority/menuValidation.js?v=${version}"></script>
</html>