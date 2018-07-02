<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%> 
<!DOCTYPE html>
		<head>
		<meta charset="utf-8" />
		<title>零售退定</title>
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
		<link rel="stylesheet" type="text/css" href="${basePath}/css/retailOrder/retailUndo.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/bootstrapValidator.min.css?v=${version}"/>
		<script>
		   var basePath = "${basePath}";
		</script>
		<style>
			.modal-header{
				background: #4E78A1;color: #fff;
			}
			.none{
				display: none;
			}
		</style>
		</head>
		<body>
		<div class="none" id="MENU_CODE">LSTDD</div>
			<div class="container-fluid">
			<input type="hidden" id="bId" value="${depositMainId}" />
				<!--头部的信息-->
				<div class="row">
	 			 <div class="well">
	 			 <div id="AUTH" data-code="LSTDD" class="btn-group btnHundred" role="group" >
					<button id='fBill' type="button" class="btn B_LSTDD_0002 none">首单</button>
					<button id='PrevBill' type="button" class="btn B_LSTDD_0003 none">上一单</button>
					<button id='NextBill' type="button" class="btn  none B_LSTDD_0004">下一单</button>
					<button id='LBill' type="button" class="btn none B_LSTDD_0005">末单</button>
					<button id='newBill' type="button" class="btn none B_LSTDD_0006">新开单</button>
					<button id="takeDown" type="button" class="btn none B_LSTDD_0007" data-toggle="modal" data-target="">引入定金单</button>
					<button id="red" type="button" class="btn  none B_LSTDD_0008" disabled>红冲</button>
					 <button id="" type="button" data-auditstatus="1" class="btn listAudit  none B_LSTDD_0023" >稽核</button>
					 <button id="" type="button" data-auditstatus="0" class="btn listAudit none B_LSTDD_0024" >取消稽核</button>
					<button type="button" class="btn none B_LSTDD_0001" onclick="print()">打印</button>
					<button type="button" class="btn none B_LSTDD_0009" data-toggle="modal" data-target="#search">查询</button>
	 			 	<!-- 
					<div class="btn-group">
					    <button type="button" class="btn dropdown-toggle" data-toggle="dropdown">
					     	 打印
					      <span class="caret"></span>
					    </button>
					    <ul class="dropdown-menu" role="menu">
					      <li><a href="javascript:void(0);">打印预览</a></li>
					      <li><a href="javascript:void(0);">打印设置</a></li>
					      <li><a href="javascript:void(0);">导出</a></li>
					    </ul>
					</div>
					<button type="button" class="btn">零售定单情况表</button>
	 			  	-->
				</div>
			 			 	<!--零售退定导航的底部-->
								<form id="inquire_option">
									<div class="inputbox container-fluid clearfix">
										<div class="row">
											<div class="col-md-3 ">
												<span class="box_text">单据编号：</span><span class="box_input"><input id="billsNum" value="" type="text" class="form-control"   disabled />
												<input type="hidden" id="refbillsId">
												<input type="hidden" id="billstatu"></span>
												<input type="hidden" id="auditStatus"></span>
											</div>
											<div class="col-md-3">
												<span class="box_text">门店：</span>
												<span class="box_input">
													<input id="section" type="text" class="form-control" disabled/>
													<input id="sectionId" type="hidden" />
													<!-- 
													<select id="sectionId" class="form-control" data-id=""  id="store" disabled></select>
													 -->
												</span>
												
											</div>
											<div class="col-md-3">
												<span class="box_text">营业员：</span>
												<span class="box_input">
													<select class="form-control" id="employees"  data-id=""></select>
												</span>
											</div>
											<div class="col-md-3">
												
												<span class="box_text">业务日期：</span><span class="box_input">
													<input type="text" class="form-control" value="${currentDate}" id="businessDate" placeholder="年-月-日"  readonly/>
												</span>
											</div>
										</div>
										<!--第二行-->
										<div class="row">
											<div class="col-md-3 ">
												<span class="box_text">会员卡号：</span><span class="box_input"><input id="cardNum" value="" type="text" class="form-control"   disabled  /><input id="cardId" type="hidden" /></span>
											</div>
											<div class="col-md-3">
												
												<span class="box_text">客户姓名：</span><span class="box_input"><input id="customerName" type="text" value="" class="form-control"   disabled /></span>
												
											</div>
											<div class="col-md-3">
												<span class="box_text">联系电话：</span><span class="box_input"><input id="customerTel" value="" type="text" class="form-control"  disabled /></span>
											</div>
											<div class="col-md-3" style="height: 35px;text-align: center;">
												<input type="hidden" id="billsStatus" value="6" disabled="">
												<img id="redSign" style="display:none;" src="../../images/status/statusRed.png">
												<img id="imgAudit">
											</div>
											
										</div>
										<!--第三行-->
										<div class="row">
											<div class="col-md-3 ">
												<span class="box_text">会员类型：</span><span class="box_input"><input id="customerType" value="" type="text" class="form-control"  disabled  /></span>
											</div>
											<div class="col-md-3">
												
												<span class="box_text">储值余额：</span><span class="box_input"><input id="customerAmount" value=""  type="text" class="form-control"  disabled  /></span>
												
											</div>
											<div class="col-md-3">
												<span class="box_text">当前积分：</span><span class="box_input"><input id="customerScore" value="" type="text" class="form-control" disabled  /></span>
											</div>
											
										</div>
									</div>
								
								 </form>
						 </div>
					</div>
				
					<!--表格开始-->
					<div class="row">
						 <table id="mainGrid" class="zxsaastable"></table>
						 <div id="mainPager"></div>
					</div>
				
				
				  <div class="row">
			 			 
								<form>
									<div class="inputbox container-fluid clearfix">
										<div class="row">
											<div class="col-md-3 ">
												<span class="box_text">应退合计：</span><span class="box_input"><input id="totalYfAmount" type="text" class="form-control"  disabled/></span>
											</div>
													<div class="col-md-3">
														<span class="box_text">退款结算：</span>
														<div class="input-group">
														      <input id="receipt" type="text" class="form-control" value=""  placeholder="" disabled>
														      <span class="input-group-btn" id="settleBtn">
														        <button class="btn btn-default" type="button">
														        	<span class="glyphicon glyphicon-plus" data-toggle="modal" data-target="#myModal"></span>
														        </button>
														      </span>
												    	</div>
														
													</div>
										</div>
										
										
										<div class="row">
											<div class="col-md-6">
												<span class="box_text">备注：</span><span class="box_input"><input id='remark' type="text" class="form-control" maxlength="100"/></span>
											</div>
										</div>
									</div>
								</form>
						
					</div>
			</div>
		<!--结算弹窗-->
		<div class="modal fade bs-example-modal-lg" id="myModal_rb_settle" tabindex="-1" role="dialog" aria-hidden="true">
		    <div class="modal-dialog modal-lg">
		        <div class="modal-content">
		            <div class="modal-header">
		                <h4 class="modal-title">结算</h4>
		            </div>
		            <div class="modal-body">
		            <p class="settleTitle2">应退金额： <span id="spanDepositTotal"></span>; 	本次结算：<span id="settle_thisTime"></span>;	 应退余额：<span id="settle_balance"></span></p>
		            
	               <table id="table_settle" class="table table-bordered">
					<thead>
						<tr>
							<td>结算方式</td>
							<td>结算余额</td>
							<td>备注</td>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>现金</td>
							<td><input id="cash" class="width300 inputVal" type="text" disabled/></td>
							<td><input id="cashRemark" class="width300 inputRemark" type="text" disabled maxlength="100"/></td>
						</tr>
						<tr>
							<td>POS</td>
							<td><input id="pos" class="width300 inputVal" type="text" readonly/></td>
							<td><input id="posRemark" class="width300 inputRemark" type="text" disabled maxlength="100"/></td>
						</tr>
						<tr>
							<td>支付宝</td>
							<td><input id="alipay" class="width300 inputVal" type="text" disabled/></td>
							<td><input id="alipayRemark" class="width300 inputRemark" type="text" disabled maxlength="100"/></td>
						</tr>
						<tr>
							<td>微信</td>
							<td><input id="weixin" class="width300 inputVal" type="text" disabled/></td>
							<td><input id="weixinRemark" class="width300 inputRemark" type="text" disabled maxlength="100"/></td>
						</tr>
						<!-- 
						<tr>
							<td>促销券</td>
							<td><input id="coupons" class="width300" type="text" /></td>
							<td><input class="width300" type="text" /></td>
						</tr>
						 -->
						<tr>
							<td>会员储值</td>
							<td><input id="memberAmount" class="width300 inputVal" type="text" disabled/></td>
							<td><input id="memberAmountRemark" class="width300 inputRemark" type="text" disabled maxlength="100"/></td>
						</tr>
						<tr>
							<td>积分抵现</td>
							<td>抵扣金额 <input id="deductionMoney" class="width100 inputVal" type="text" disabled/> 扣减积分 <input id="deductionScore" class="width100" type="text" disabled/></td>
							<td><input id="deductionRemark" class="width300 inputRemark" type="text" disabled maxlength="100"/></td>
						</tr>
					</tbody>
				</table>
				<p class="settleTitle3">可用积分: <span id="spanCustomerScore">0</span> 抵现标准：<span id="dScore"></span>:<span id="dAmount"></span>（积分：金额） 储值余额：<span id="spanCustomerAmount"></span></p>

		            </div>
		            <div class="modal-footer">
		                <button id="settle_cancel" type="button" class="btn btn-default" data-dismiss="modal">取消</button>
		                <button id="settle_sure" type="button" class="btn btn-primary none B_LSTDD_0012" data-dismiss="modal">确定</button>
		            </div>
		        </div>
		    </div>
		</div>
		<!-- pos -->
		<div class="modal fade" id="myModal_table_pos_con" tabindex="-1" role="dialog" aria-hidden="true">
		    <div class="modal-dialog">
		        <div class="modal-content">
		            <div class="modal-header">
		                <h4 class="modal-title">pos</h4>
		            </div>
		            <div class="modal-body"  style="height: 300px;">
		               <table id="table_pos" class="table table-bordered" style="max-height: 300px;">
							<thead>
								<tr>
									<td>POS机编号</td>
									<td>结算金额</td>
								</tr>
							</thead>
							<tbody>
							</tbody>
						</table>
		            </div>
		            <div class="modal-footer">
		                <button id="table_pos_con_cancel" type="button" class="btn btn-default" data-dismiss="modal">取消</button>
		                <button id="table_pos_con_sure" type="button" class="btn btn-primary" data-dismiss="modal">确定</button>
		            </div>
		        </div>
		    </div>
		</div>
    <!--退定的模态窗-->
    			<div class="modal fade" id="sureReturn" tabindex="-1" role="dialog" >
					  <div class="model-dialog1">
					    <div class="modal-content returnPops">
						    <div class="modal-header">
				                <h4 class="modal-title">退定</h4>
				            </div>
					      <div class="container-fluid">
					      	  <div class="row changeMargin">
					      	  		<div class="formWrap">
						      	  		<span>快速检索</span>
						      	  		<div class="inputWrap">
						      	  			<input id='modelSerchTxt' type="text" placeholder='会员卡号 、姓名 、电话' />
						      	  		</div>
					      	  		</div>
					      	  		<div class="formWrap">
						      	  		<span>部门</span>
						      	  		<div class="inputWrap">
						      	  			<select  id="modalSection" class="select"></select>
						      	  		</div>
						      	  	</div>
				      	  			<div class="formWrap">
				      	  				<button id='modalSearch' type="button" class="btn btn-info">搜索定单</button>
				      	  				<button id='modalBackBill' type="button" class="btn btn-info" data-dismiss="modal">退定已选单据</button>
				      	  				<button id='modalCancel' type="button" class="btn btn-info" data-dismiss="modal">取消</button>
				      	  			</div>
					      	  	
					      	  </div>
					      	  <div class="row">
					      	  	<div class="col-md-12">
					      	  	<div style='overflow:auto;height: 351px'>
					      	  	<table id="modal_table_back" class="table table-bordered tableHeight">
					      	  		<thead>
					      	  		<tr>
					      	  			<th>序号</th>
					      	  			<th>零售单编码</th>
					      	  			<th>客户姓名</th>
					      	  			<th>联系电话</th>
					      	  			<th>商品名称</th>
					      	  			<th>型号</th>
					      	  			<th>颜色</th>
					      	  			<th>剩余定金</th>
					      	  		</tr>
					      	  		</thead>
					      	  		<tbody>
					      	  		<tr>
					      	  			<td><input class='modal_Index' type="checkbox" /></td>
					      	  	         <td class='modal_code'></td>
					      	  	         <td class='modal_name'></td>
					      	  	         <td class='modal_tel'></td>
					      	  	         <td class='modal_proName'></td>
					      	  	         <td class='modal_model'></td>
					      	  	         <td class='modal_color'></td>
					      	  	         <td class='modal_surplus'></td>
					      	  		</tr>
					      	  		</tbody>
					      	  	</table>
					      	  	</div>	
					      	  	</div>
					      	  </div>
					      </div>
					    </div>
					  </div>
				</div>
				
				
				
				<!--查询的模态窗-->
				<div class="modal fade " tabindex="-1" role="dialog" id="search">
					  <div class="model-dialog1">
					    <div class="modal-content">
					    <div class="modal-header">
		                    <h4 class="modal-title">过滤</h4>
		                </div>
		                <div class="modal-body">
			                <div class="container-fluid">
					    		<div class="row changeMargin">
					    			<div class="formWrap">
						      	  		<span>
						      	  			开始日期：
						      	  		</span>
						      	  		<div class="inputWrap">
						      	  			<input type="text" class="beginDate"/>
						      	  		</div>
					      	  		</div>
					      	  		<div class="formWrap">
						      	  		<span>
						      	  			截至日期：
						      	  		</span>
						      	  		<div class="inputWrap">
						      	  			<input type="text" class="endDate"/>
						      	  		</div>
					      	  		</div>
					      	  		<div class="formWrap">
						      	  		<span>
						      	  			单据号：
						      	  		</span>
						      	  		<div class="inputWrap">
						      	  			<input id='modalFilterbillscode' type="text" />
						      	  		</div>
					      	  		</div>
					    			<button type="button" id='modalFilter' class="btnMargin btn" data-dismiss="modal">过滤</button>
					    		</div>
					    		<!--第二行-->
					    		<div class="row changeMargin">
					    			<div class="formWrap">
						      	  		<span>
						      	  			会员卡号：
						      	  		</span>
						      	  		<div class="inputWrap">
						      	  			<input id="modalCardNum" type="text" />
						      	  		</div>
					      	  		</div>
					      	  		<div class="formWrap">
						      	  		<span>
						      	  			客户姓名：
						      	  		</span>
						      	  		<div class="inputWrap">
						      	  			<input id='modalCustomers' type="text" />
						      	  		</div>
					      	  		</div>
					      	  		<div class="formWrap">
						      	  		<span>
						      	  		  联系电话：
						      	  		</span>
						      	  		<div class="inputWrap">
						      	  			<input id='modalPhone' type="text" />
						      	  		</div>
					      	  		</div>
					    			<button id="resetSearchOptions" type="button" class="btnMargin btn" >重置</button>
					    		</div>
					    	</div>
		                </div>
					    <div class="modal-footer">
		                    <button id="rb_MQR_cancel" type="button" class="btn btn-default" data-dismiss="modal">取消</button>
		                </div>
					    </div>
					  </div>
			   </div>
	   <div class="modal fade" id="myModal_red" tabindex="-1" role="dialog" aria-hidden="true">
		    <div class="modal-dialog">
		        <div class="modal-content">
		            <div class="modal-header">
		                <h4 class="modal-title">红冲</h4>
		            </div>
		            <div class="modal-body">
		               <input type="text" class="form-control" id="redDate" value="2016-12-30" placeholder="年-月-日" readonly>
		            </div>
		            <div class="modal-footer">
		                <button id="red_cancel" type="button" class="btn btn-default" data-dismiss="modal">取消</button>
		                <button id="red_sure" type="button" class="btn btn-primary" data-dismiss="modal">确定</button>
		            </div>
		        </div>
		    </div>
		</div>
		</body>
		<script src="${basePath}/js/jquery-1.12.4.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
		<script src="${basePath}/js/bootstrap.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
		<script src="${basePath}/js/jquery.jqGrid.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
		<script src="${basePath}/js/jquery.datetimepicker.full.js?v=${version}" type="text/javascript" charset="utf-8"></script>
		<script src="${basePath}/js/grid.locale-cn.js?v=${version}" type="text/javascript" charset="utf-8"></script>		
		<script src="${basePath}/js/commonjs/xm.js?v=${version}" type="text/javascript" charset="utf-8"></script>
		<script src="${basePath}/js/zxsaas_plus.js?v=${version}" type="text/javascript" charset="utf-8"></script>
		<script src="${basePath}/js/component.js?v=${version}" type="text/javascript" charset="utf-8"></script>
		<script src="${basePath}/js/erp/retail/deposit/depositMainBack.js?v=${version}"></script>
		<script src="${basePath}/js/bootstrapValidator.js?v=${version}" type="text/javascript" charset="utf-8"></script>
		<script src="${basePath}/js/base.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script type="text/javascript" charset="utf-8" src="${basePath}/js/jquery-migrate-1.2.1.min.js?v=${version}"></script>
	<script type="text/javascript" charset="utf-8" src="${basePath}/js/jquery.jqGrid.min.js?v=${version}"></script>
	<script type="text/javascript" charset="utf-8" src="${basePath}/js/icheck.min.js?v=${version}"></script>
	<script type="text/javascript" charset="utf-8" src="${basePath}/js/commonjs/xr.js?v=${version}" ></script>
	<script type="text/javascript" charset="utf-8" src="${basePath}/js/cw/bootstrap/js/bootstrap-datepicker.js?v=${version}"></script>
	<script type="text/javascript" charset="utf-8" src="${basePath}/js/cw/bootstrap/js/bootstrap-select.min.js?v=${version}"></script>
	<script type="text/javascript" charset="utf-8" src="${basePath}/js/cw/bootstrap/js/i18n/defaults-zh_CN.js?v=${version}"></script>
	<script type="text/javascript" charset="utf-8" src="${basePath}/js/cw/bootstrap/js/bootstrap-switch.js?v=${version}"></script>
	<script type="text/javascript" charset="utf-8" src="${basePath}/js/cw/bootstrap/js/bootstrap-dialog.min.js?v=${version}"></script>
	<script type="text/javascript" charset="utf-8" src="${basePath}/js/cw/bootstrap/locales/bootstrap-datepicker.zh-CN.min.js?v=${version}"></script>
	<script type="text/javascript" charset="utf-8" src="${basePath}/js/commonjs/eidit-grid-test.js?v=${version}" ></script>
	<script type="text/javascript" charset="utf-8" src="${basePath}/js/cw/underscore-min.js?v=${version}"></script>
	<script type="text/javascript" charset="utf-8" src="${basePath}/js/jquery.jqprint-0.3.js?v=${version}"></script>	
		<!-- 验证 -->
	<script src="${basePath}/js/cw/bootstrap/js/validator-company.js?v=${version}" type="text/javascript" charset="utf-8"></script>
		<!-- 菜单权限验证 -->
		<script type="text/javascript" src="${basePath}/js/erp/authority/menuValidation.js?v=${version}"></script>
</html>