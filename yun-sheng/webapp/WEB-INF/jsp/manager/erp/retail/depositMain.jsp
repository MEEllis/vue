<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%> 
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<title>零售定金</title>
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
		<link rel="stylesheet" type="text/css" href="${basePath}/css/retailOrder/retailDeposit.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/bootstrapValidator.min.css?v=${version}"/>
		<script type="text/javascript">
			//全局变量
			var gl_groupId = "${groupId}";//集团ID
			var basePath = "${basePath}";
		</script>
		<style>
			.modal-header{
				background: #4E78A1;color: #fff;
			}
			.vip ul{
			    margin: 0;
			    padding: 0;
			}
			.vip ul li{
			    display: inline-block;
			    width: 33%;
			    margin: 5px 0;
			}
			.vipLabel{
			    height: 34px;
			    line-height: 34px;
			    min-width: 70px;
			    margin-left: 10%;
			}
			#customerNameChe{
				display: inline-block!important;
			    width: 60%;
			    vertical-align: top;
			}
			#customerName{
				width:100%;
			}
			#customerTelChe{
				display: inline-block!important;
			    width: 60%;
			    vertical-align: top;
			}
			#customerTel{
				width:100%;
			}
			.customerNameChe{
				display: inline-block!important;
			    width: 60%!important;
			    vertical-align: top;
			}
			#AUTH .none,#myModal_rb_settle .none{
				display: none;
			}
		</style>
	</head>
	<body>
		<div class="container-fluid">
			<div class="none" id="MENU_CODE">LSDJD</div>
			<!--头部导航开始-->
			<div class="row">
				<div class="well">
					<div>
						<div id="AUTH" data-code="LSDJD" class="btn-group btnHundred" role="group" >
						 	<button id="firstSingle" type="button" class="btn handover B_LSDJD_0002 none" code="F">首单</button>
							<button id="prevSingle" type="button" class="btn handover B_LSDJD_0003 none" code="P">上一单</button>
							<button id="nextSingle" type="button" class="btn handover B_LSDJD_0004 none" code="N">下一单</button>
							<button id="finalSingle" type="button" class="btn handover B_LSDJD_0005 none" code="L">末单</button>
							<button id="newBill" type="button" class="btn B_LSDJD_0006 none">新开单</button>
							<button id="" type="button" data-auditstatus="1" class="btn listAudit  none B_LSDJD_0019" >稽核</button>
							<button id="" type="button" data-auditstatus="0" class="btn listAudit none B_LSDJD_0020" >取消稽核</button>
							<button type="button" class="btn B_LSDJD_0001 none" onclick="print()">打印</button>
							<button type="button" class="btn B_LSDJD_0007 none" data-toggle="modal" data-target="#search">查询</button>
						</div>
					</div>
					<!--头部的信息-->
					<div class="row">
						
							<form id="inquire_option">
								<div class="inputbox container-fluid clearfix">
									<div class="row" style='height:50px;'>
										<div class="col-md-3 ">
											<span class="box_text">单据编号：</span>
											<span class="box_input">
												<input type="text" class="form-control" id='billsNum' value="${orderNum}" disabled/>
												<input type="hidden"  id='billsId' />
													<input type="hidden" id="billsStatus"></span>
													<input type="hidden" id="auditStatus"></span>
											</span>
										</div>
										<div class="col-md-3">
											<span class="box_text">门店：</span>
											<span class="box_input">
												<select id="sectionId" class="form-control">
												</select>
											</span>
										</div>
										<div class="col-md-3">
											<span class="box_text">营业员：</span>
											<span class="box_input">
												<select id="employeeId" class="form-control">
												</select>
											</span>
										</div>
										<div class="col-md-3">
											<span class="box_text">业务日期：</span>
											<span class="box_input">
												<input type="text" class="form-control" id="businessDate" value="${currentDate}" placeholder="年-月-日"  readonly/>
											</span>
										</div>

										<div class="col-md-3" style="height: 35px;text-align: center;float: right;">
											<img id="redSign" style="display:none;" src="../../images/status/statusRed.png">
											<img id="imgAudit">
										</div>
									</div>
								</div>
							</form>
					</div>
				</div>
			</div>
			<label class="shuru" for="rb_superInput">输入框：</label><input id="rb_superInput" style='border:1px solid #7BBDF5;outline: none;width:400px;display: inline-block;margin-bottom: 15px;' type="text" placeholder="输入要查找的内容,按ctrl+alt键切换,回车搜索" class="form-control"/> <span class='tip' style='color:red;'>请录入条码</span>
			<!--表格开始-->
			<div class="row">
				<table id="mainGrid" class="zxsaastable"></table>
				<div id="mainPager"></div>
			</div>
<!-- 会员 -->
    <form id='addAdminForm' method="post" action="">
	    <div class="well vip" style='padding:20px;margin:20px 0;'>
	        <ul>
	            <li>
	            	<span class="vipLabel">会员卡号：</span>
	            	<div class="customerNameChe" class="form-group">
		            	<input id="cardNum" type="text" class="form-control" disabled/>
		            	<input id="cardTypeId" type="hidden"/>
	            	</div>
	           	</li>
	            <li>
	            	<span class="vipLabel">客户姓名：</span>
	           	    <div id="customerNameChe" class="form-group">
						<input id="customerName" name="customerName" class="customInfo form-control" type="text"/>
						<input id="memberId" type="hidden" />
					</div>
	           	</li>
	            <li>
	            	<span class="vipLabel">联系电话：</span>
	            	<div id="customerTelChe" class="form-group">
	            		<input id="customerTel" name="customerTel" maxlength='11' class="customInfo form-control" type="text"/>
	            	</div>
	            </li>
	            <li>
	            	<span class="vipLabel">会员类型：</span>
	            	<div class="customerNameChe" class="form-group">
		            	<input id="customerType" type="text" class="form-control" disabled/>
	            	</div>
	           	</li>
	            <li>
	            	<span class="vipLabel">当前余额：</span>
	            	<div class="customerNameChe" class="form-group">
		            	<input id="customerAmount" type="text" class="form-control" disabled/>
	            		<input id="dAmount_" type="hidden" />
	            	</div>
	           	</li>
	            <li>
	            	<span class="vipLabel">当前积分：</span>
	            	<div class="customerNameChe" class="form-group">
		            	<input id="customerScore" type="text" class="form-control" disabled/>
	            		<input id="dScore_" type="hidden" />
	            	</div>
	           	</li>
	        </ul>
	    </div>
    </form>
    
			<div class="row">
				<form>
					<div class="inputbox container-fluid clearfix">
						<div class="row">
							<div class="col-md-3 ">
								<span class="box_text">应收合计：</span>
								<span class="box_input">
									<input id="depositTotal" type="text" class="form-control" disabled />
								</span>
							</div>
							<div class="col-md-3">
								<span class="box_text">收款结算：</span>
								<div class="input-group">
									<input type="text" class="form-control" id="receipt" placeholder="" disabled>
									<span class="input-group-btn" id="settleBtn">
										<button id="toAccount" class="btn btn-default" type="button">
											<span class="glyphicon glyphicon-plus" data-toggle="modal" data-target="#myModal"></span>
										</button>
									</span>
								</div>
							</div>
							<div class="col-md-3 ">
								<span class="box_text">备注：</span>
								<span class="box_input">
									<input id="remark" type="text" class="form-control" maxlength='100'/>
								</span>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
		<!--商品名称选择弹出窗-->
		<!-- 模态框（Modal） -->
		<div class="modal fade" id="goodsChoose" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog model-dialog4">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							商品名称选择
						</h4>
					</div>
					<div class="modal-body">
						<div class="container">
							<div class="left">
								<div class="left_tree">
									<input type="hidden" class="goods_tree_ids" />
									<ul id="goodsDataTree" class="ztree"></ul>
								</div>
							</div>
							<!--展示列表开始-->
							<div class="details">
								<div class="right">
								<span>快速过滤：</span>
									<input id="goodsNameKeyWord" type="text" />
									<button id="goodsSearchBtn" class="btn btn-info">搜索</button>
								</div>
								<!--表格-->
								<div class="jqGrid_wrap">
									<table id="jqGrid_goodsMsgAdd" class="zxsaastable"></table>
									<div id="gridpager_goods"></div>
								</div>
							</div>
							<!--展示列表结束-->
						</div>
					</div>
				</div>
				<!-- /.modal-content -->
			</div>
			<!-- /.modal -->
		</div>

		<!--结算弹窗-->
		<div class="modal fade bs-example-modal-lg" id="myModal_rb_settle" tabindex="-1" role="dialog" aria-hidden="true">
		    <div class="modal-dialog modal-lg">
		        <div class="modal-content">
		            <div class="modal-header">
		                <h4 class="modal-title">结算</h4>
		            </div>
		            <div class="modal-body">
		            <p class="settleTitle2">应收金额： <span id="spanDepositTotal"></span>; 	本次结算：<span id="settle_thisTime"></span>;	 应收余额：<span id="settle_balance"></span></p>
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
							<td><input id="cashRemark" class="width300 inputRemark" type="text" disabled/></td>
						</tr>
						<tr>
							<td>POS</td>
							<td><input id="pos" class="width300 inputVal" type="text" readonly/></td>
							<td><input id="posRemark" class="width300 inputRemark" type="text" disabled/></td>
						</tr>
						<tr>
							<td>支付宝</td>
							<td><input id="alipay" class="width300 inputVal" type="text" disabled/></td>
							<td><input id="alipayRemark" class="width300 inputRemark" type="text" disabled/></td>
						</tr>
						<tr>
							<td>微信</td>
							<td><input id="weixin" class="width300 inputVal" type="text" disabled/></td>
							<td><input id="weixinRemark" class="width300 inputRemark" type="text" disabled/></td>
						</tr>
						<tr>
							<td>其它账户</td>
							<td><input id="other" class="width300 inputVal" type="text" disabled/></td>
							<td><input id="otherRemark" class="width300 inputRemark" type="text" disabled/></td>
						</tr>
						<tr>
							<td>会员储值</td>
							<td><input id="memberAmount" class="width300 inputVal" type="text" disabled/></td>
							<td><input id="memberAmountRemark" class="width300 inputRemark" type="text" disabled/></td>
						</tr>
						<tr>
							<td>积分抵现</td>
							<td>抵扣金额 <input id="deductionMoney" class="width100 inputVal" type="text" disabled/> 扣减积分 <input id="deductionScore" class="width100" type="text" disabled/></td>
							<td><input id="deductionRemark" class="width300 inputRemark" type="text" disabled/></td>
						</tr>
					</tbody>
				</table>
				<p class="settleTitle3">可用积分: <span id="spanCustomerScore"></span> 抵现标准：<span id="dScore"></span>:<span id="dAmount"></span>（积分：金额） 储值余额：<span id="spanCustomerAmount"></span></p>

		            </div>
		            <div class="modal-footer">
		                <button id="settle_cancel" type="button" class="btn btn-default" data-dismiss="modal">取消</button>
		                <button id="settle_sure" type="button" class="btn btn-primary B_LSDJD_0017 none" data-dismiss="modal">确定</button>
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
		            <div class="modal-body" style="height: 300px;">
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
		<!-- other -->
		<div class="modal fade" id="myModal_table_other_con" tabindex="-1" role="dialog" aria-hidden="true">
		    <div class="modal-dialog">
		        <div class="modal-content">
		            <div class="modal-header">
		                <h4 class="modal-title">pos</h4>
		            </div>
						<div class="modal-body" style="height: 300px;">
		               <table id="table_other" class="table table-bordered" style="max-height: 300px;">
							<thead>
								<tr>
									<td>其它账户</td>
									<td>结算金额</td>
								</tr>
							</thead>
							<tbody>
							</tbody>
						</table>
		            </div>
		            <div class="modal-footer">
		                <button id="table_other_con_cancel" type="button" class="btn btn-default" data-dismiss="modal">取消</button>
		                <button id="table_other_con_sure" type="button" class="btn btn-primary" data-dismiss="modal">确定</button>
		            </div>
		        </div>
		    </div>
		</div>
		<!--退定的模态窗-->
		<div class="modal fade " tabindex="-1" role="dialog" id="sureReturn">
			<div class="model-dialog1">
				<div class="modal-content returnPops">
					<div class="container-fluid">
						<div class="row changeMargin">
							<div class="formWrap">
								<span>快速检索</span>
				      	  		<div class="inputWrap">
				      	  			<input type="text" id="fastSearch"/>
				      	  		</div>
					      	</div>
					      	<div class="formWrap">
						      	<span>部门</span>
				      	  		<div class="inputWrap">
				      	  			<select class="select" id="department"></select>
				      	  		</div>
						    </div>
		      	  			<div class="formWrap">
		      	  				<button type="button" data-dismiss="modal">退定当前单据</button>
		      	  				<button type="button" class="deleChecked" data-dismiss="modal">退定已选单据</button>
		      	  				<button type="button" data-dismiss="modal">取消</button>
		      	  			</div>
						</div>
						<div class="row">
							<div class="col-md-12">
					      	  	<table class="table table-bordered tableHeight" id="modalDeposit">
					      	  		<thead>
						      	  		<tr>
						      	  			<th>序号</th>
						      	  			<th>零售定单编码</th>
						      	  			<th>单据日期</th>
						      	  			<th>客户姓名</th>
						      	  			<th>联系电话</th>
						      	  			<th>剩余定金</th>
						      	  		</tr>
					      	  		</thead>
					      	  		<tbody>
						      	  		<tr>
						      	  			<td><input type="checkbox" /></td>
						      	  	         <td></td>
						      	  	         <td></td>
						      	  	         <td></td>
						      	  	         <td></td>
						      	  	         <td></td>
						      	  	         
						      	  		</tr>
					      	  		</tbody>
					      	  	</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!--会员查询-->
    <div class="modal fade bs-example-modal-lg" id="myModal_rb_MQR" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">会员查询结果</h4>
                </div>
                <div class="modal-body">
                    <table id="rb_MQR" class="table table-bordered">
                        <thead>
                        <tr>
                            <td></td>
                            <td>会员卡号</td>
                            <td>持卡人</td>
                            <td>手机号</td>
                            <td>会员类型</td>
                            <td>往来单位</td>
                            <td>备注</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td><a class="rb_MQR_choose href="javascript:void(0)">选择</a></td>
                            <td class="rb_MQR_cardNum"></td>
                            <td class="rb_MQR_customerName"></td>
                            <td class="rb_MQR_customerTel"></td>
                            <td class="rb_MQR_customerType"></td>
                            <td class="rb_MQR_contactUnitName"></td>
                            <td class="rb_MQR_remark"></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div class="modal-footer">
                    <button id="rb_MQR_cancel" type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                </div>
            </div>
        </div>
    </div>
    <!-- 条码商品 -->
     <div class="modal fade bs-example-modal-lg" id="myModal_barcodepro" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-lg" style='width:1000px;'>
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">商品查询结果</h4>
                </div>
                <div class="modal-body">
                	<div class='gridWrap'>
                		<table id="barcodepro" ></table>
                	</div>
                </div>
                <div class="modal-footer">
                    <button id="rb_MQR_cancel" type="button" class="btn btn-default" data-dismiss="modal">取消</button>
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
					      	  			<input type="text" id='modalBillsCode' />
					      	  		</div>
				      	  		</div>
				    			<button type="button" class="btnMargin btn" id='modalFilter' data-dismiss="modal">过滤</button>
						    </div>
							<!--第二行-->
							<div class="row changeMargin">
				    			<div class="formWrap">
					      	  		<span>
					      	  			会员卡号：
					      	  		</span>
					      	  		<div class="inputWrap">
					      	  			<input type="text" id='modalCardNum' />
					      	  		</div>
				      	  		</div>
				      	  		<div class="formWrap">
					      	  		<span>
					      	  			客户姓名：
					      	  		</span>
					      	  		<div class="inputWrap">
					      	  			<input type="text" id='modalCustomers' />
					      	  		</div>
				      	  		</div>
				      	  		<div class="formWrap">
					      	  		<span>
					      	  		  联系电话：
					      	  		</span>
					      	  		<div class="inputWrap">
					      	  			<input type="text" id='modalPhone'/>
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
		               <input type="text" class="form-control" id="redDate" value="2016-12-30" placeholder="年-月-日" >
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
		<script src="${basePath}/js/cw/jquery.ztree.all-3.5.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
		<script src="${basePath}/html/muti_select/MultiSelectDropList.js?v=${version}" type="text/javascript" charset="utf-8"></script>
		<script src="${basePath}/js/select2.full.js?v=${version}" type="text/javascript" charset="utf-8"></script>
		<script src="${basePath}/js/erp/retail/deposit/depositMain.js?v=${version}" type="text/javascript" charset="utf-8"></script>
		<script src="${basePath}/js/bootstrapValidator.js?v=${version}" type="text/javascript" charset="utf-8"></script>
		<script src="${basePath}/js/zxsaas_plus.js?v=${version}" type="text/javascript" charset="utf-8"></script>
		<script src="${basePath}/js/component.js?v=${version}" type="text/javascript" charset="utf-8"></script>
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