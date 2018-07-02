<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<jsp:include  page="../../inventoryInclude/head.jsp"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/pagecss/treepage.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/afterSale/settleAccounts.css?v=${version}" />
		<title>取机结算</title>
		
	</head>

	<body >

			<!-------------------------------------表格开始----------------------------------------->
			<div class="bodyModel">
				<div id="AUTH" data-code="QJJS" class="btn-group btnHundred" role="group" >
				
				</div>
				<!-------------------------------------主页面开始----------------------------------------->
			<!-------------------------------------搜索条件开始----------------------------------------->
			<!-------------------------------------搜索条件结束----------------------------------------->	
							<!---------------查询条件开始---------------------------->
 			 <div class="well">
				<form id="inquire_option">
					<div class="inputbox container-fluid clearfix">
						<div class="row" style="margin-bottom:20px !important;">
							<div class="Zpercent">
								<span class="box_text"><input type="checkbox" class="yfbao"/></span>
								<span class="box_input">
									是否包含已结算
								</span>
							</div>
							<div class="Zpercent">
								<span class="box_text">查询开始日期：</span>
								<span class="box_input"><input type="text" class="form-control yfbao1" id="datetimepickerStart1" placeholder="年-月-日"  /></span>
							</div>
							<div class="Zpercent">
								<span class="box_text">查询截止日期：</span>
								<span class="box_input"><input type="text" class="form-control yfbao2" id="datetimepickerStart2" placeholder="年-月-日"  /></span>
							</div>
							<div class="Zpercent">
								<span class="box_text"><button type="button" class="btn btn-info queryDate" >查询</button></span>
							</div>
							<div class="inputbox container-fluid clearfix">
								<div class="row" id="verifYF">
									<div class="Zpercent">
										<span class="box_text">维修部门：</span>
										<div class="input-group form-group">
										    <input name="repairSectionId" type="hidden"  id="repairSectionId" />
								             <input type="text" class="form-control unitSearch repairName" name='repairName' readonly="readonly" >
										      <span class="input-group-btn">
										        <button class="btn btn-default btn2 " type="button" data-toggle="modal"  onclick="showSectionModal(this)">
										        	<span class="glyphicon glyphicon-plus"></span>
										        </button>
										      </span>
								         </div>
									</div>
								</div>
							</div>
						</div>
					</div>
				 </form>
			 </div>
					<!----------------主表开始---------------------->
				<div class="tablebox retailDetailTable">
					<div class="grid-wrap zhubiao" style="margin-top:10px">
						<table id="jqGrid_settleAccounts" class="zxsaastable">
						</table>
						<div id="jqGridPager_settleAccounts"></div>
					</div>
				</div>
				<!----------------切换表格---------------------->
				<div class="footYF">
				    <div class="diaplayYF1">
					    <ul id="myTab" class="nav nav-tabs">
							<li class="active">
								<a href="#YFtab1" data-toggle="tab" class="changeYF1">维修项目</a>
							</li>
							<li>
								<a href="#YFtab2" data-toggle="tab" class="changeYF2">更换备件</a>
							</li>
							<li>
								<a href="#YFtab3" data-toggle="tab" class="changeYF3">外观、串号变更</a>
							</li>
							<li>
								<a href="#YFtab4" data-toggle="tab" class="changeYF4">检修结果</a>
							</li>
						</ul>
						<div id="myTabContent" class="tab-content">
							<div class="tab-pane fade in active" id="YFtab1">
								<div class="jqGrid_wrap widthYFS1" style="width:1100px;">
									<table id="jqGrid_YFtab1" class="zxsaastable"></table> 
				    				<div id="jqGridPager_YFtab1"></div>
								</div>
							</div>
							<div class="tab-pane fade " id="YFtab2">
								<div class="jqGrid_wrap widthYF2">
									<table id="jqGrid_YFtab2" class="zxsaastable"></table> 
				    				<div id="jqGridPager_YFtab2"></div>
								</div>
							</div>
							<div class="tab-pane fade" id="YFtab3">
								<div class="inputbox container-fluid clearfix">
									<div class="row">
										<div class="Zpercent">
											<span class="box_text">新主串号：</span>
											<span class="box_input">
												<input type="text" class="form-control newImei" />
											</span>
										</div>
										<div class="Zpercent">
											<span class="box_text">新辅串号：</span>
											<span class="box_input">
												<input type="text" class="form-control newAuxiliaryImei" />
											</span>
										</div>
										<div class="Zpercent">
											<span class="box_text">新颜色：</span>
											<span class="box_input">
												<input type="text" class="form-control newColor"/>
											</span>
										</div>
									</div>
									<p style="margin-left: 64px;margin-bottom: 20px;">注：只有更换主板或外壳才填此项!</p>
								</div>
							</div>
							<div class="tab-pane fade" id="YFtab4">
								<div class="inputbox container-fluid clearfix">
								        <input type="hidden" class="hideYF4"/>
										<div class="divYF1">
											<p>故障说明</p>
											<textarea class="textYF1 falutDesc" disabled></textarea>
										</div>
										<div class="divYF1">
											<p>检测结果</p>
											<textarea class="textYF1 testResult"></textarea>
										</div>
										<div class="divYF1">
											<p>维修方案</p>
											<textarea class="textYF1 repairProject"></textarea>
										</div>
										<div class="lineF clearfix">
											<div class="Zpercent">
												<span class="box_text">其他费用：</span>
												<span class="box_input">
													<input type="text" class="form-control qitafeiyong" placeholder="0.00"/>
												</span>
										    </div>
											<div class="Zpercent">
												<span class="box_text">其他成本：</span>
												<span class="box_input">
													<input type="text" class="form-control otherCost" placeholder="0.00"/>
												</span>
											</div>
											<div class="Zpercent">
												<span class="box_text">增值服务：</span>
												<span class="box_input">
													<select class="form-control zengzhi"></select>
												</span>
											</div>
										</div>
										<div class="lineF clearfix">
											<div class="Zpercent">
												<span class="box_text">增值服务抵减：</span>
												<span class="box_input">
													<input type="text" class="form-control zengzhi1 YFtab4jian" />
												</span>
										    </div>
											<div class="Zpercent">
												<span class="box_text">备注：</span>
												<span class="box_input">
													<input type="text" class="form-control remark" />
												</span>
											</div>
										</div>
								</div>
							</div>
						
						
					</div>
				    </div><!-- diaplayYF2隐藏部分 -->
				    <div class="diaplayYF2" style="margin-bottom: 30px;">
					    <ul id="myTab1" class="nav nav-tabs">
							<li>
								<a class="changeYF5">外修及返厂费用</a>
							</li>
						</ul>
						<div id="YFtab5" style="display:block">
							<div class="inputbox container-fluid clearfix">
								<input type="hidden" class="hideYF5"/>
								<div class="row">
								<div class="Zpercent">
									<span class="box_text">服务费用：</span>
									<span class="box_input">
										<input type="text" class="form-control fuwufeiyong" disabled="disabled" placeholder="0.00"/>
									</span>
							    </div>
							    <div class="Zpercent">
									<span class="box_text">增值服务：</span>
									<span class="box_input">
										<select class="form-control zengYF5" id="serviceId" disabled></select>
									</span>
							    </div>
							    <div class="Zpercent">
									<span class="box_text">抵扣费用：</span>
									<span class="box_input">
										<input type="text" class="form-control zengzhi2" id="amount" disabled/>
									</span>
							    </div>
							</div>
							</div>
						</div>
				    </div><!-- diaplayYF2隐藏部分 -->
					
					
				</div><!--选项卡-->
				
				<div style="border-top: 1px solid #cfcfcf;width: 100%;min-width: 1175px;">
					<form id="settleVer">
							<div class="inputbox container-fluid lineBottom">
							<div class="row">
								<div class="Zpercent form-group">
									<span class="box_text">客户姓名：</span>
									<span class="box_input">
										<input type="text" class="form-control custom" name="custom"/>
									</span>
							    </div>
							    <div class="Zpercent form-group">
									<span class="box_text">联系电话：</span>
									<span class="box_input">
										<input type="text" class="form-control telephone" name="telephone"/>
									</span>
							    </div>
							    <div class="Zpercent form-group">
									<span class="box_text">收货地址：</span>
									<span class="box_input">
										<input type="text" class="form-control address" name="address"/>
									</span>
							    </div>
							</div>
							
							<div class="row">
								<div class="Zpercent">
									<span class="box_text"><input type="checkbox" checked="checked" class="ziqu"/>自取</span>
									<span class="box_text"><input type="checkbox" disabled="disabled" class="haihui"/>还回备用机</span>
							    </div>
							</div>
							
							<div class="row">
								<div class="Zpercent form-group">
									<span class="box_text">发运方式：</span>
									<span class="box_text">
										<input type="radio" name="rad" class="fayun1" disabled/>快递
										<input type="radio" name="rad" class="fayun2" style="margin-left: 20px;" disabled/>其他
									</span>
							    </div>
							     <div class="Zpercent ziqu1 form-group">
									<span class="box_text">快递公司：</span>
									<span class="box_input">
										<input type="text" class="form-control express" name="express"/>
									</span>
							    </div>
							     <div class="Zpercent ziqu2 form-group">
									<span class="box_text">运单号：</span>
									<span class="box_input">
										<input type="text" class="form-control trackNo" name="trackNo"/>
									</span>
							    </div>
							    <div class="Zpercent qita1 form-group">
									<span class="box_text">其他：</span>
									<span class="box_input">
										<input type="text" class="form-control qitainp"/>
									</span>
							    </div>
							</div>
							
							<div class="row">
								<div class="Zpercent form-group">
									<span class="box_text">费用合计：</span>
									<span class="box_input">
										<input type="text" class="form-control feitotal" readonly="readonly" name="totalAmount"/>
									</span>
							    </div>
							    <div class="Zpercent form-group">
									<span class="box_text">增值服务抵减：</span>
									<span class="box_input">
										<input type="text" class="form-control zengzhiO" readonly="readonly" name="serviceDeductAmount"/>
									</span>
							    </div>
							    <div class="Zpercent form-group">
									<span class="box_text">应收费用：</span>
									<span class="box_input">
										<input type="text" class="form-control shishou" name="receivableAmount"/>
									</span>
							    </div>
							   <!--<div class="Zpercent">
									<span class="box_text"><button class="jiesuan btn-info cancelsaveData">重新结算</button></span>
							    </div>
							--></div>
							
							<div class="row">
								<div class="Zpercent form-group">
									<span class="box_text">预收款：</span>
									<span class="box_input">
										<input type="text" class="form-control yushou" readonly="readonly" name="amount"/>
									</span>
							    </div>
							    <div class="Zpercent form-group">
									<span class="box_text">收款金额：</span>
									<div class="input-group">
							             <input type="text" value="" class="form-control YFhideIn4" readonly="readonly" id="depositTotal">
									      <span class="input-group-btn">
									         <button class="btn btn-default btn2 YFbtnHied3" type="button" onclick="showPaymentModal()">
										        	<span class="glyphicon glyphicon-plus"></span>
										        </button>
									      </span>
							         </div>
								</div>
								<div class="Zpercent form-group">
									<span class="box_text">押金：</span>
									<span class="box_input">
										<input type="text" class="form-control yajin" readonly="readonly" name="deposit"/>
									</span>
							    </div>
							     <div class="Zpercent form-group">
									<span class="box_text"><button class="jiesuan btn-info saveData">结算</button></span>
							    </div>
							</div>
							
							<div class="row">
							    <div class="Zpercent form-group">
									<span class="box_text">退押金：</span>
									<span class="box_input">
										<input type="text" class="form-control haihui1" disabled name="returnDeposit"/>
									</span>
							    </div>
							    <div class="Zpercent form-group">
							    	<span class="box_input"><input type="checkbox" class="haihui2" disabled/>押金抵减费用</span>
							    </div>
							    <div class="Zpercent form-group">
									<span class="box_text">优惠金额：</span>
									<span class="box_input">
										<input type="text" class="form-control youhui" placeholder="0.00" disabled/>
									</span>
							    </div>
							    <div class="Zpercent" style="margin-left:-37px">
									<span class="box_text">欠款金额：</span>
									<span class="box_input">
										<input type="text" class="form-control qiankuanYY" name="debtAmount"/>
									</span>
							    </div>
							</div>
							
						</div>
						</form>
						</div>	
			</div>
			<!-------------------------------------表格结束----------------------------------------->
		<!-------------------------------------主页面结束----------------------------------------->
		
		
		
		<!--处理变更方式弹出窗开始-->
		<div class="modal fade" id="alterChoose" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog modalFour">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							处理变更方式
						</h4>
					</div>
					<div class="modal-body">
						<span class="temporary1">处理方式变更为</span>
						<span class="temporary2">
							<select>
								<option value="1">自修</option>
								<option value="2">返厂</option>
								<option value="3">外修</option>
								<option value="4">换机</option>
								<option value="5">退货</option>
							</select>
						</span>
						<p style="color: red;padding-top: 10px;">请警慎处理!</p>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-info" data-dismiss="modal">确定</button>
						<button type="button" class="btn btn-warning" data-dismiss="modal">取消</button>
					</div>
				</div>
			</div>
		</div><!--处理变更方式弹出窗结束-->
		
		<div class="modal fade" id="sectionModal" tabindex="-1" role="dialog" aria-labelledby="mySection" aria-hidden="true" style="display: none;">
			<div class="modal-dialog tree-dialog">
				<div class="modal-content">
					<div class="modal-header" style="cursor: default;">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							×
						</button>
						<h4 class="modal-title" id="myModalLabel">
							部门选择
						</h4>
					</div>
					<div class="modal-body tree-body">
						<ul id="sectionTreeData" class="ztree"><li id="sectionTreeData_1" class="level0" tabindex="0" hidefocus="true" treenode=""><span id="sectionTreeData_1_switch" title="" class="button level0 switch roots_docu" treenode_switch=""></span><a id="sectionTreeData_1_a" class="level0" treenode_a="" onclick="" target="_blank" style="" title="总部"><span id="sectionTreeData_1_ico" title="" treenode_ico="" class="button ico_docu" style="width:0px;height:0px;"></span><span id="sectionTreeData_1_span">总部</span></a></li><li id="sectionTreeData_2" class="level0" tabindex="0" hidefocus="true" treenode=""><span id="sectionTreeData_2_switch" title="" class="button level0 switch bottom_docu" treenode_switch=""></span><a id="sectionTreeData_2_a" class="level0" treenode_a="" onclick="" target="_blank" style="" title="总经办"><span id="sectionTreeData_2_ico" title="" treenode_ico="" class="button ico_docu" style="width:0px;height:0px;"></span><span id="sectionTreeData_2_span">总经办</span></a></li></ul>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-warning" data-dismiss="modal">关闭</button>
					</div>
				</div>
			</div>
		</div>
		
		<!--押金弹出窗 开始-->
		<div class="modal fade" id="depositModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog" style="width:34%">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							收款方式选择
						</h4>
					</div>
					<div class="modal-body">
						<div class="container overflAuto" style="width:100%">
							<!--展示列表开始-->
							<div class="details ">
								<!--表格-->
								<table  id='depositModalGrid'>
								</table>
							</div>
							<!--展示列表结束-->
						</div>
						
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-info" data-dismiss="modal" onblur="saveDeposit()">保存</button>
				<button type="button" class="btn btn-warning" data-dismiss="modal">关闭</button>
					</div>
				</div><!-- /.modal-content -->
			</div>
		</div><!--预收款选择弹出窗 结束-->

		
		
		
		<!-------------------------------------底部开始----------------------------------------->
		<!-------------------------------------底部结束----------------------------------------->
	</body>
	<script src="${basePath}/js/commonjs/xr.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/afterSale/settleAccounts.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/afterSale/afterVerify.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/erp/afterSale/deposit.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script type="text/javascript">
		$(function(){
			loadmodal();
		});
	</script>
</html>

