<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%> 
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<meta name="renderer" content="webkit" />
		<meta http-equiv="X-UA-Compatible" content="IE=9; IE=8; IE=7; IE=EDGE ; chrome=1" />
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
		<link rel="stylesheet" type="text/css" href="${basePath}/css/retailOrder/retailChange.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="${basePath}/css/market/public.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="${basePath}/css/select2.min.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="${basePath}/html/muti_select/multi.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="${basePath}/css/bootstrapValidator.min.css?v=${version}"/>
		<title>零售换货单</title>
		<script type="text/javascript">
			//全局变量
			var gl_groupId = "${groupId}";//集团ID
			var basePath = "${basePath}";
			
			var billsCode = "${billsCode}";
		</script>
	</head>
<style>
.main input {
    width: 130px;
    height: 30px;
    margin: 5px 0;
}
.form-control{
    display: inline-block;
}
.Zpercent2{
	width:33%;
    float: left;
}
.box_input2{
    display: block;
    margin-left: 100px;
    line-height: 30px;
	width:60%;
}
.container-fluid{
    min-width: 100%;
}
</style>
	<body >
		<!-------------------------------------主页面开始----------------------------------------->
			<div class="well" style="position:relative;">
			<div id="AUTH" data-code="LSHHD" class="btn-group btnHundred" role="group" >
				<button type="button" class="btn btn-default" data-eventname="printbtn">打印</button>
				<button type="button" class="btn btn-default searchOtherBill" data-flag="F" >首单</button>
				<button type="button" class="btn btn-default searchOtherBill" data-flag="P" >上一单</button>
				<button type="button" class="btn btn-default searchOtherBill" data-flag="N" >下一单</button>
				<button type="button" class="btn btn-default searchOtherBill" data-flag="L" >末单</button>
				<button type="button" class="btn btn-default addAudit" data-eventname="add">新开单</button>
			  <button type="button" class="btn btn-default saveData" data-eventname="save">零售订单</button>	
			  <div class="btn-group">
				    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
				     	操作
				      <span class="caret"></span>
				    </button>
				    <ul class="dropdown-menu" role="menu">
				      <li><a href="#">退货</a></li>
				      <li><a href="#">换货</a></li>
				      <li id="revoke"><a href="#">红冲</a></li>
				    </ul>
				</div>
			  <button type="button" class="btn btn-default" data-eventname="printbtn" data-toggle="modal" data-target="#filterModel">服务购买</button>
			  <button type="button" class="btn btn-default" data-eventname="printbtn">会员管理</button>
			</div>
			<!-------------------------------------搜索条件开始----------------------------------------->

		<form id="inquire_option">
				<div class="inputbox container-fluid clearfix">

					<div class="row" style="margin-bottom:20px;">

						<div class="Zpercent ">

							<span class="box_text2">单据号：</span>
							<span class="box_input input-group">
							<input type="text" class="form-control searchBillsData" custom="billsCode" id="disabledInput" readonly  />
							<input type="hidden" class="searchBillsData" id="refId" custom="id"  readonly  />
							<input type="hidden" id="billsStatus" class="searchBillsData" custom="billsStatus"  readonly  />
							</span>

						</div>
						<div class="Zpercent">
							<span class="box_text2">门店：</span>
							<span class="box_input input-group">
								<select class="sel form-control" id="sectionId">
									<option value="0" selected>0</option>
									<option value="1">1</option>
									<option value="2">2</option>
								</select>
								</span>
						</div>
						<div class="Zpercent">
							<span class="box_text2">营业员：</span>
							<span class="box_input input-group">
								<select class="sel form-control" id="employees">
									<option value="0" selected>0</option>
									<option value="1">1</option>
									<option value="2">2</option>
								</select>
								</span>
						</div>
						<div class="Zpercent">
							<span for="datetimepickerStart" class="box_text2">业务日期：</span><span class="box_input input-group">
							<input value="${currentDate }" type="text" class="form-control searchBillsData" custom="billsDate" id="datetimepickerStart" placeholder="年-月-日"  />
							</span>
						</div>

					</div>

				</div>

			 </form>
			<img src="${basePath}/images/status/statusRed.png" id="statusRed" style="position:absolute;top:28px;right:10px;display:none;"/>
		</div>

			<!-------------------------------------搜索条件结束----------------------------------------->			

			<!-------------------------------------表格开始----------------------------------------->

			<div class="tablebox retailDetailTable">
				<div class="row" style="padding-right:12px;">
					<div class="gridTitle" style="margin-right:0;"></br>换</br>入</br>信</br>息</div>
					<div style='overflow:hidden;'>
						<div class="grid-wrap" style="margin-top:10px">
							<table id="jqGrid_SubjectBalance" class="zxsaastable">
							</table>
						</div>
					</div>
				</div>
				<div class="row" style="padding-right:12px;">
					<div class="gridTitle" style="margin-right:0;"></br>换</br>出</br>信</br>息</div>
					<div style='overflow:hidden;'>
						<div class="grid-wrap" style="margin-top:10px;">
							<table id="jqGrid_swapOut" class="zxsaastable">
							</table>
						</div>
					</div>
				</div>
		</div>

			<!-------------------------------------表格结束----------------------------------------->
			<!-- 客户信息开始 -->
			<div class="well" style="margin-top:10px;">
					<form id="addAdminForm">
						<div class="inputbox container-fluid clearfix">
							<div class="row" style="margin-bottom:15px;">
								<div class="Zpercent2 ">
									<span class="box_text2">会员卡号：</span>
									<span class="box_input2 input-group">
									<input type="text" class="form-control getMessage clearData searchBillsData" custom="cardNum" disabled id="cardNum"/>
									<input type="hidden" class="form-control getMessage clearData searchBillsData" custom="memberId" disabled id="cardId"/>
									</span>
								</div>
								<div class="Zpercent2">
									<span class="box_text2">客户姓名：</span>
									<span class="box_input2 input-group">
										<div id="customerNameChe" class="form-group">
											<input type="text" class="form-control getMessage clearData searchBillsData" custom="customerName" id="customerName" name="customerName"/>
										</div>
									</span>
								</div>
								<div class="Zpercent2">
									<span class="box_text2">联系电话：</span>
									<span class="box_input2 input-group">
										<div id="customerTelChe" class="form-group">
											<input type="text" class="form-control getMessage clearData searchBillsData" custom="customerTel" id="customerTel" name="customerTel"/>
										</div>
									</span>
								</div>
							</div>
							<!-- 第二行 -->
							<div class="row" style="margin-bottom:20px;">
								<div class="Zpercent2 ">
									<span class="box_text2">会员类型：</span>
									<span class="box_input2 input-group">
									<input type="text" class="form-control getMessage clearData searchBillsData" custom="memberType"  disabled id="customerType"/>
									</span>
								</div>
								<div class="Zpercent2">
									<span class="box_text2">当前余额：</span>
									<span class="box_input2 input-group">
										<input type="text" class="form-control getMessage clearData searchBillsData" custom="memberAmount" disabled id="customerAmount"/>
									</span>
								</div>
								<div class="Zpercent2">
									<span class="box_text2">当前积分：</span>
									<span class="box_input2 input-group">
										<input type="text" class="form-control getMessage clearData searchBillsData" custom="memberScore" disabled id="customerScore"/>
									</span>
								</div>
							</div>
							<input type="hidden" id="memberMessage" class='clearData' />
						</div>
					 </form>
			</div>
			<!-- 客户信息结束 -->
			<div class="yuandan">
				<div class="main">
					<div class="imei">
						<div id="">
							<label for="">输入框</label>
							<input type="text" class='form-control clearData' style="border:1px solid #7BBDF5;outline:none;min-width:383px;" placeholder="输入要查找的内容,按ctrl+alt键切换,回车搜索" id="searchInput" />
						</div>
						<div style="width:340px;">
						    <span class="tip" data-searchflag='1'>请录入会员卡号或手机号、微信号、支付宝账号</span>
						</div>
						<div id="">
							<label type="button" id='billBtn' class="btn btn-primary btn-sm" style="width:80px;margin:5px">原单引入</label>		
						</div>
					</div>
					<div class="main2">
						<div class="main21">
							<label for="">商品应付</label>
							<input type="text" class='form-control clearData' readonly  id="goodsPayTotal" />
						</div>
						<div class="main21">
							<label for="">增值服务应付</label>
							<input type="text" readonly id="addServiceTotal" class="form-control moneyTotal clearData" />
						</div>
						<div class="main21">
							<label for="">抹零</label>
							<input type="text" id="billsTozero" custom="billsTozero" class="form-control clearData searchBillsData" />
						</div>
					</div>
					<div class="main3">
						
						<div class="main32">
							<label for="">应付合计</label>
							<input type="text" readonly  id="payTotal" class="form-control moneyTotal clearData" />
						</div>
						<div class="calc" style="position:relative;">
							<label for="">付款结算</label>
							<input type="text" id="paySettlement" readonly class="form-control moneyTotal clearData" style='padding-right:33px;'/>
							<span style="position:absolute;display:inline-block;top:9px;right:5px;">
								<button id="settleBtn" class="ck btn-primary"><span class='glyphicon glyphicon-plus'></span></button>
							</span>
						</div>
						<div class="main42">
							<label for="">未付金额</label>
							<input type="text" readonly id="mainUnpaid" class="form-control moneyTotal clearData" />
						</div>
					</div>
					<div class="main4">
						<div class="main41">
							<label for="">备注</label>
							<input type="text" id="mainRemark" custom="remark" class='form-control clearData searchBillsData' />
						</div>
						
					</div>
				</div>
			</div>
			
			
					<!--结算开始-->
    <div class="modal fade bs-example-modal-lg" id="myModal_settle" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">结算</h4>
                </div>
                <div class="modal-body">
                    <p class="settleTitle2"><span id="settle_title1">应付金额：</span><span id="settle_receivable"></span>； 本次结算：<span id="settle_thisTime"></span><span id="settle_title2">； 应付余额：</span><span id="settle_balance"></span>；</p>
                    <table id="table_settle" class="table table-bordered poptable">
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
                            <td><input id="cash" class="width300 payMethods" type="text" disabled/></td>
                            <td rowspan="7"><input id="deductionRemark" class="width300" type="text"/></td>
                        </tr>
                        <tr>
                            <td>POS</td>
                            <td><input id="pos" class="width300" type="text" readonly/></td>
                        </tr>
                        <tr>
                            <td>支付宝</td>
                            <td><input id="alipay" class="width300 payMethods" type="text" disabled/></td>
                        </tr>
                        <tr>
                            <td>微信</td>
                            <td><input id="weixin" class="width300 payMethods" type="text" disabled/></td>
                        </tr>
                        <tr>
                            <td>促销券</td>
                            <td><input id="coupons" class="width300 payMethods" type="text" disabled/></td>
                        </tr>
                        <tr>
                            <td>消费 会员储值</td>
                            <td><input id="memberAmount" class="width300 payMethods" type="text" disabled/></td>
                        </tr>
                        <tr>
                            <td>积分抵现</td>
                            <td>抵扣金额 <input id="deductionMoney" class="width100 payMethods" type="text" disabled/> 扣减积分 <input id="deductionScore" class="width100" type="text" disabled/></td>
                        </tr>
                        </tbody>
                    </table>
                    <p class="settleTitle3">可用积分：<span id="settle_availableIntegral"></span>； 抵现标准：<span id="arrivalStandard"><span></span>:<span></span></span>（积分：金额）；  储值余额：<span id="settle_storedValue"></span>；</p>
                </div>
                <div class="modal-footer">
                    <button id="settle_cancel" type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                    <button id="settle_sure" type="button" class="btn btn-primary" data-dismiss="modal">保存</button>
                </div>
            </div>
        </div>
    </div>
    <!--pos弹框-->
    <div class="modal fade" id="myModal_pos" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">pos</h4>
                </div>
                <div class="modal-body"  style="height: 300px;">
                    <table id="table_pos" class="table table-bordered poptable"  style="max-height: 300px;">
                        <thead>
                        <tr>
                            <td>POS机编号</td>
                            <td>结算金额</td>
                        </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
                <div class="modal-footer">
                    <button id="" type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                    <button id="" type="button" class="btn btn-primary posSure" data-dismiss="modal">保存</button>
                </div>
            </div>
        </div>
    </div>
    
    <!-- 结算结束 -->
    <!--增值服务-->
    <div class="serve">
    	<fieldset class="fieLeft" id="">
				<legend class="changeTitle">增值服务</legend>
				<div class="tablebox retailDetailTable">
					<button class="seeDetail">查看详情</button>
					<div class="grid-wrap" style="margin-top:10px">
						<table id="jqGrid_serve" class="zxsaastable">
						</table>
					</div>
				</div>
			</fieldset>
    </div>
    
		<!-------------------------------------主页面结束----------------------------------------->
		
		<!--增值服务弹出窗-->
		<!-- 模态框（Modal） -->
		<div class="modal fade" id="serveDetail" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog model-dialog1">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							增值服务
						</h4>
					</div>
					<div class="modal-body" id="model-body">
						<div class="">
							<div class="tablebox retailDetailTable serveModal">
								<div class="grid-wrap" style="margin-top:10px">
									<table id="jqGrid_serveDetail" class="zxsaastable">
									</table>
								</div>
							</div>
				    </div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-info saveMoney" data-dismiss="modal">保存后关闭</button>
						<button type="button" class="btn btn-warning" data-dismiss="modal">仅关闭</button>
					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>

		
		<!--入库成本弹出窗-->
		<!-- 模态框（Modal） -->
		<div class="modal fade" id="moneyChoose" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog model-dialog3">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							入库成本
						</h4>
					</div>
					<div class="modal-body" id="model-body">
						<div class=" ">
							<span class="box_text2">入库成本：</span><span class="box_input input-group"><input type="text" class="form-control moneyRk" id="disabledInput" /></span>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-info saveMoney" data-dismiss="modal">保存后关闭</button>
						<button type="button" class="btn btn-warning" data-dismiss="modal">仅关闭</button>
					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>
		
		<!--第三方券弹出窗-->
		<!-- 模态框（Modal） -->
		<div class="modal fade" id="thirdChoose" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog model-dialog2">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							第三方券
						</h4>
					</div>
					<div class="modal-body" id="model-body">
						<div class=" ">
							<table id="jqGrid_Third" class="zxsaastable">
							</table>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-info saveMoney" data-dismiss="modal">保存后关闭</button>
						<button type="button" class="btn btn-warning" data-dismiss="modal">仅关闭</button>
					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>

		
		<!--仓库选择弹出窗-->

		<!-- 模态框（Modal） -->

		<div class="modal fade" id="storChoose" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">

			<div class="modal-dialog model-dialog5">

				<div class="modal-content">

					<div class="modal-header">

						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">

							&times;

						</button>

						<h4 class="modal-title" id="myModalLabel">

							仓库选择

						</h4>

					</div>

					<div class="modal-body" id="model-body">

						<div class="showTab">

							<div class="current change">

								<form class="">
									<input type="text" placeholder="快速搜索" name="searchStorage" class="searchStorage" />

									<div class="tree_area">

											<input type="hidden" class="stor_tree_ids" />

											<ul id="storModelTree" class="ztree"></ul>

									</div>

								</form>

							</div>

						</div>

					</div>

				</div><!-- /.modal-content -->

			</div><!-- /.modal -->

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

									<input type="text" id='goodsNameFilter'/>

								

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

				</div><!-- /.modal-content -->

			</div><!-- /.modal -->

		</div>
		

		<!-------------------------------------底部开始----------------------------------------->
		
		<div class="footer">


		</div>
		<!-------------------------------------底部结束----------------------------------------->
			<!-- 会员查询的模态窗 -->
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
                    <button id="rb_MQR_sure" type="button" class="btn btn-primary" data-dismiss="modal">确定</button>
                </div>
            </div>
        </div>
    </div>
    <!--会员查询结束  -->
    <!-- 串号查询 -->
    <div class="modal fade bs-example-modal-lg" id="myModal_rb_MQI" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">串号查询结果</h4>
                </div>
                <div class="modal-body">
                    <table id="rb_MQI" class="table table-bordered">
                        <thead>
                        <tr>
                            <td></td>
                            <td>商品编码</td>
                            <td>商品名称</td>
                            <td>型号</td>
                            <td>颜色</td>
                            <td>类别</td>
                            <td>串号</td>
                            <td>仓库</td>
                        </tr>
                        </thead>
                        <tbody>
                        <!-- 
                        <tr>
                            <td><a class="rb_MQI_choose" href="javascript:void(0)">选择</a><input class="rb_MQI_proId" type="hidden"/></td>
                            <td class="rb_MQI_proCode"></td>
                            <td class="rb_MQI_proName"></td>
                            <td class="rb_MQI_model"></td>
                            <td class="rb_MQI_color"></td>
                            <td class="rb_MQI_type"></td>
                            <td class="rb_MQI_SerialNum"></td>
                            <td class="rb_MQI_Warehouse"></td>
                        </tr>
                         -->
                        
                        </tbody>
                    </table>
                </div>
                <div class="modal-footer">
                    <button id="rb_MQI_cancel" type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                    <button id="rb_MQI_sure" type="button" class="btn btn-primary" data-dismiss="modal">确定</button>
                </div>
            </div>
        </div>
    </div>
        <!-- 原单引入开始 -->
    <div class="modal fade" tabindex="-1" role="dialog" aria-hidden="true" id="billImport">
        <div class="modal-dialog modal-lg" style="min-width:1200px;">
            <div class="modal-content">
            	 <div class="modal-header">
                    <h4 class="modal-title">原单引入</h4>
                </div>
                <div class="modal-body">
                	<div class="container-fluid" style="width:100%;">
                	<!-- 过滤框 -->
                	<div class="row">
                	     <div class="form-inline">
                	         <div class="form-group">
                	         	<label class="control-label">快速过滤</label>
                	         	<input type="text" class="form-control" id="fastFilter"/>
                	         </div>
                	     </div>
                	</div>
                	<!-- 过滤框结束 -->
                	<!-- 表格 -->
                	<dir class="row">
                		<table id="billGrid" class="zxsaastable">
						</table>
                	
                	</dir>
                	</div>
                </div>
                <div class="modal-footer">
                	 <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary" id="billSure">确定</button>
                </div>
            </div>
        </div>
     </div>
    <!-- 原单引入结束 -->
    
    
    	<!--商品名称选择弹出窗-->

		<!-- 模态框（Modal） -->

		<div class="modal fade" id="goodsRef" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">

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

									<ul id="goodsRefTree" class="ztree"></ul>

								</div>

							</div>

							<!--展示列表开始-->

							<div class="details">

								<div class="right">

									<input type="text" id='goodsRefFilter' />

								

								</div>

								<!--表格-->

								<div class="jqGrid_wrap">

									<table id="jqGrid_goodsRef" class="zxsaastable"></table> 

				    				

								</div>

							</div>

							<!--展示列表结束-->

						</div>

						

					</div>

				</div><!-- /.modal-content -->

			</div><!-- /.modal -->

		</div>
	</body>

	<script src="${basePath}/js/jquery-1.12.4.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>

	<script src="${basePath}/js/bootstrap.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>

	<script src="${basePath}/js/jquery.jqGrid.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>

	<script src="${basePath}/js/jquery.datetimepicker.full.js?v=${version}" type="text/javascript" charset="utf-8"></script>

	<script src="${basePath}/js/grid.locale-cn.js?v=${version}" type="text/javascript" charset="utf-8"></script>

	<script src="${basePath}/js/commonjs/xm.js?v=${version}" type="text/javascript" charset="utf-8"></script>

	<script src="${basePath}/js/zxsaas_plus.js?v=${version}" type="text/javascript" charset="utf-8"></script>

	<script src="${basePath}/js/cw/jquery.ztree.all-3.5.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>

	<script src="${basePath}/html/muti_select/MultiSelectDropList.js?v=${version}" type="text/javascript" charset="utf-8"></script>

	<script src="${basePath}/js/select2.full.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	
	<script src="${basePath}/js/bootstrapValidator.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	
	<script src="${basePath}/js/erp/retail/exchange/retailExchange.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	
	<script src="${basePath}/js/base.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	
	<script type="text/javascript">
		$(function(){
			loadSectionAndEmployee();
			loadmodal();//换出表格
			treeInit()//换入的初始化
			modalRightGrid();//换入商品名称模态窗的商品表格
			loadmodalOut();//换出的初始化
			billGridInit();//引入原单的初始化
			serviceInit();//增值服务初始化
			loadmodalServe('',"#jqGrid_serveDetail",false);//增值服务查看详情
			treeRefInit()//换出的初始化
			goodsRefInit()//换出的表格初始化
		})

		//重置
		$(document).on('click','.reset',function(e){
			$('.filterData').val('');
			$('.select_rel_audit').val('');
			$('.hide_text_audit').val('');
			
		});
	</script>
	<!-- 菜单权限验证 -->
	<script type="text/javascript" src="${basePath}/js/erp/authority/menuValidation.js?v=${version}"></script>
</html>















