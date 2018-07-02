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
		<link rel="stylesheet" type="text/css" href="${basePath}/css/afterSale/toGetTreatment.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="${basePath}/js/cw/bootstrap/css/bootstrapValidator.css?v=${version}" />
		
		<title>自修处理</title>
		<script>
			var groupId = ${groupId};
		</script>
	</head>

	<body >

			<!-------------------------------------表格开始----------------------------------------->
			<div class="bodyModel">
				<!-------------------------------------主页面开始----------------------------------------->
			<div class="btn-group btnHundred" role="group" >
			  <button type="button" class="btn saveData" data-eventname="printbtn">保存</button>
			  <button type="button" class="btn giveUp" data-eventname="printbtn">放弃修改</button>
			  <button type="button" class="btn changeChoose" data-eventname="printbtn" data-toggle="modal" data-target="#changeChoose">查询历史维修记录</button>
			</div>
			<!-------------------------------------搜索条件开始----------------------------------------->
			<!-------------------------------------搜索条件结束----------------------------------------->	
							<!---------------查询条件开始---------------------------->
 			 <div class="well">
			<!-- <form id="inquire_option"> -->	
					<div class="inputbox container-fluid clearfix lineBottom">
						<div class="row">
							<div class="Zpercent">
								<span class="box_text">快速过滤：</span>
								<span class="box_input"><input type="text" class="form-control fasttips" /></span>
							</div>
							<div class="Zpercent radJU">
								<span class="radioYF ">
									<input type="radio" name="radyf" checked="checked" class="radquery" value="1"/>业务流水号
									<input type="radio" name="radyf" class="radquery" value="2"/>串号
									<input type="radio" name="radyf" class="radquery" value="3"/>客户姓名
									<input type="radio" name="radyf" class="radquery" value="4"/>联系电话
									<input type="radio" name="radyf" class="radquery" value="5"/>往来单位
								</span>
							</div>
							<div class="Zpercent">
								<span class="box_text">维修部门：</span>
								<span class="box_input">
									<select class="form-control sectionYF">
									</select>
								</span>
							</div>
						</div>
					</div>
				<!-- </form> --> 
			 </div>
					<!----------------主表开始---------------------->
				<div class="tablebox retailDetailTable">
					<div class="grid-wrap overflAuto" style="margin-top:10px">
						<table id="jqGrid_toGetTreatment" class="zxsaastable">
						</table>
						<div id="jqGridPager_toGetTreatment"></div>
					</div>
				</div>
				<!----------------切换表格---------------------->
				<div class="footYF">
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
						<li class="YFbutton">
							<button data-toggle="modal" data-target="#alterChoose">处理方式变更</button>
						</li>
					</ul>
					<div id="myTabContent" class="tab-content">
					
						<div class="tab-pane fade in active" id="YFtab1">
							<div class="jqGrid_wrap widthyf1">
								<table id="jqGrid_YFtab1" class="zxsaastable"></table> 
			    				<div id="jqGridPager_YFtab1"></div>
							</div>
						</div>
						<div class="tab-pane fade" id="YFtab2">
							<div class="jqGrid_wrap overflAuto widthYF2">
								<table id="jqGrid_YFtab2" class="zxsaastable"></table> 
			    				<div id="jqGridPager_YFtab2"></div>
							</div>
						</div>
						<div class="tab-pane fade" id="YFtab3">
							<form id="toGet1">
							<div class="inputbox container-fluid clearfix">
								<div class="row">
									<div class="Zpercent form-group">
										<span class="box_text">新主串号：</span>
										<span class="box_input">
											<input type="text" class="form-control newImei" name="newImei"/>
										</span>
									</div>
									<div class="Zpercent form-group">
										<span class="box_text">新辅串号：</span>
										<span class="box_input">
											<input type="text" class="form-control newAuxiliaryImei" name="newAuxiliaryImei"/>
										</span>
									</div>
									<div class="Zpercent form-group">
										<span class="box_text">新颜色：</span>
										<span class="box_input">
											<select class="form-control newColor">
											</select>
										</span>
									</div>
								</div>
								<p style="margin-left: 64px;margin-bottom: 20px;">注：只有更换主板或外壳才填此项!</p>
							</div>
							</form>
						</div>
						<div class="tab-pane fade" id="YFtab4">
							<form id="toGet2">
							<div class="inputbox container-fluid clearfix">
									<div class="divYF1">
										<p>故障说明</p>
										<textarea class="textYF1 falutDesc" disabled></textarea>
									</div>
									<div class="divYF1 form-group">
										<p>检测结果</p>
										<textarea class="textYF1 testResult" name="testResult"></textarea>
									</div>
									<div class="divYF1 form-group">
										<p>维修方案</p>
										<textarea class="textYF1 repairProject" name="repairProject"></textarea>
									</div>
									<div class="lineF clearfix">
										
										<div class="Zpercent form-group vatayf1">
											<span class="box_textY">其他费用：</span>
											<span class="box_inputY">
												<input type="text" class="form-control qitaY1" value="0.00" name="qitaY1"/>
											</span>
									    </div>
										<div class="Zpercent form-group vatayf1">
											<span class="box_textY">其他成本：</span>
											<span class="box_inputY">
												<input type="text" class="form-control otherCost" value="0.00" name="otherCost"/>
											</span>
										</div>
										<div class="Zpercent form-group vatayf1">
											<span class="box_textY">备注：</span>
											<span class="box_inputY">
												<input type="text" class="form-control remark" name="remark" />
											</span>
										</div>
									</div>
							</div>
							</form>
						</div>
						<div style="border-top: 1px solid #cfcfcf;width: 100%;">
							<form id="toGet3">
							<div class="inputbox container-fluid lineBottom">
							<div class="row">
								<div class="ZpercentYY">
									<span class="box_textY">材料费：</span>
									<span class="box_inputY">
										<input type="text" class="form-control clf" disabled/>
									</span>
							    </div>
							    <div class="ZpercentYY">
									<span class="box_textY">维修费：</span>
									<span class="box_inputY">
										<input type="text" class="form-control wxf" disabled/>
									</span>
							    </div>
							    <div class="ZpercentYY">
									<span class="box_textY">其他费用：</span>
									<span class="box_inputY">
										<input type="text" class="form-control qitaY2" value="0" disabled/>
									</span>
							    </div>
							    <div class="ZpercentYY">
									<span class="box_textY">费用合计：</span>
									<span class="box_inputY">
										<input type="text" class="form-control fyhj" disabled/>
									</span>
							    </div>
							    
							</div>
							<div class="row">
								<div class="ZpercentYY">
									<span class="box_textY">预报价：</span>
									<span class="box_inputY">
										<input type="text" class="form-control quotePrice" value="0" disabled/>
									</span>
							    </div>
								<div class="ZpercentYY">
									<span class="box_textY">技术员：</span>
									<span class="box_inputY">
										<select class="form-control technicianId">
										</select>
									</span>
							    </div>
							    <div class="ZpercentYY">
									<span class="box_textY">
									   <input type="checkbox" class="repairFlag"/>已修复
									</span>
							    </div>
							</div>
						</div>
						</form>
						</div>
						
					</div>
				</div>
					<!--选项卡-->
			</div>
			<!-------------------------------------表格结束----------------------------------------->
		<!-------------------------------------主页面结束----------------------------------------->
		
		<!--查询历史维修记录弹出窗开始-->
		<div class="modal fade" id="changeChoose" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog modalNine">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							历史维修记录
						</h4>
					</div>
					<div class="btn-group btnHundred" role="group" >
					  <button type="button" class="btn quxiaoFlag" data-eventname="printbtn">取消已修复标志</button>
					  <button type="button" class="btn" data-eventname="printbtn" data-dismiss="modal">退出</button>
					</div>
					 <div class="modal-body">
					 		<div class="row">
								<div class="ZpercentNO">
									<span class="box_textY">开始日期：</span>
									<span class="box_inputY">
										<input type="text" class="form-controlY" id="datetimepickerStart1" placeholder="年-月-日"  />
									</span>
							    </div>
							    <div class="ZpercentNO">
									<span class="box_textY">截止日期：</span>
									<span class="box_inputY">
										<input type="text" class="form-controlY" id="datetimepickerStart2" placeholder="年-月-日"  />
									</span>
							    </div>
							    <div class="ZpercentNO">
									<span class="box_textY">串号：</span>
									<span class="box_inputY">
										<input type="text" class="form-controlY imei"/>
									</span>
							    </div>
							     <div class="ZpercentNO">
									<span class="box_textY">手机号码：</span>
									<span class="box_inputY">
										<input type="text" class="form-controlY phone" />
									</span>
							    </div>
							     <div class="ZpercentNO">
									<button class="guolv">过滤</button>
							    </div>
							</div>
						<!--<div class="right-body">-->
							<div class="jqGrid_wrap overflAuto" style="margin-top:10px;width:1068px;">
								<table id="jqGrid_changeYF" class="zxsaastable"></table> 
			    				<div id="gridpager_changeYF"></div>
		    				</div>
		    				<div class="footYF">
					<ul id="myTab1" class="nav nav-tabs">
						<li class="active">
							<a href="#YFtabModel1" data-toggle="tab" class="changeYF1">维修项目</a>
						</li>
						<li>
							<a href="#YFtabModel2" data-toggle="tab" class="changeModel2">更换备件</a>
						</li>
						<li>
							<a href="#YFtabModel3" data-toggle="tab">外观、串号变更</a>
						</li>
						<li>
							<a href="#YFtabModel4" data-toggle="tab">检修结果</a>
						</li>
					</ul>
					<div id="myTabContent" class="tab-content">
						<div class="tab-pane fade in active" id="YFtabModel1">
							<div class="jqGrid_wrap overflAuto" style="width:1068px;">
								<table id="jqGrid_YFtabModel1" class="zxsaastable"></table> 
			    				<div id="jqGridPager_YF1"></div>
							</div>
						</div>
						<div class="tab-pane fade" id="YFtabModel2">
							<div class="jqGrid_wrap overflAuto" style="width:1068px;">
								<table id="jqGrid_YFtabModel2" class="zxsaastable"></table> 
			    				<div id="jqGridPager_YF2"></div>
							</div>
						</div>
						<div class="tab-pane fade" id="YFtabModel3">
						
							<div class="inputbox container-fluid clearfix">
								<div class="row">
									<div class="Zpercent form-group">
										<span class="box_textY">新主串号：</span>
										<span class="box_inputY">
											<input type="text" class="form-control newimei1" disabled/>
										</span>
									</div>
									<div class="Zpercent form-group">
										<span class="box_textY">新辅串号：</span>
										<span class="box_inputY">
											<input type="text" class="form-control newimeiFU" disabled />
										</span>
									</div>
									<div class="Zpercent form-group">
										<span class="box_textY">新颜色：</span>
										<span class="box_inputY">
											<input type="text" class="form-control newColorYF" disabled/>
										</span>
									</div>
								</div>
								<p style="margin-bottom: 20px;">注：只有更换主板或外壳才填此项!</p>
							</div>
						</div>
						<div class="tab-pane fade" id="YFtabModel4">
							<div class="inputbox container-fluid clearfix">
									<div class="divYF1">
										<p>故障说明</p>
										<textarea class="textYF1 guzhang" disabled></textarea>
									</div>
									<div class="divYF1">
										<p>检测结果</p>
										<textarea class="textYF1 jiance" disabled></textarea>
									</div>
									<div class="divYF1">
										<p>维修方案</p>
										<textarea class="textYF1 weixiufang" disabled></textarea>
									</div>
									<div class="lineF clearfix">
										
										<div class="Zpercent">
											<span class="box_textY">其他费用：</span>
											<span class="box_inputY">
												<input type="text" class="form-control qitafeiYF" disabled/>
											</span>
									    </div>
									<div class="Zpercent">
										<span class="box_textY">其他成本：</span>
										<span class="box_inputY">
											<input type="text" class="form-control qitachenYF" disabled/>
										</span>
									</div>
									<div class="Zpercent">
										<span class="box_textY">备注：</span>
										<span class="box_inputY">
											<input type="text" class="form-control beizhuYF" disabled/>
										</span>
									</div>
									</div>
							</div>
						</div>
					</div>
				</div>
		    			<!--</div>-->
				   </div>
					<div class="modal-footer">
						<button type="button" class="btn btn-info" data-dismiss="modal">保存后关闭</button>
						<button type="button" class="btn btn-warning" data-dismiss="modal">仅关闭</button>
					</div>
				</div>
			</div>
		</div><!--查询历史维修记录弹出窗结束-->
		
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
							<select class="handleMode">
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
						<button type="button" class="btn btn-info handleModeXIA" data-dismiss="modal">确定</button>
						<button type="button" class="btn btn-warning" data-dismiss="modal">取消</button>
					</div>
				</div>
			</div>
		</div><!--处理变更方式弹出窗结束-->
		
		
		<!-- 串号模态框（Modal） -->
		<div class="modal fade" id="numberChoose" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog modal990">
				<div class="modal-content ">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							串号选择
						</h4>
					</div>
				  <div class="modal-body">
						<!-- <span class="TCkuai">快速过滤<input type="text"/></span>  -->
					  <div class="jqGrid_wrap">
						<table id="jqGrid_tranNumber" class="zxsaastable"></table> 
	    				<div id="gridpager_tranNumber"></div>
    				  </div>
				   </div>
					<div class="modal-footer">
						<button type="button" class="btn btn-warning" data-dismiss="modal">仅关闭</button>
					</div>
					
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div><!--串号模态框（Modal）结束 -->
		
		<!--备件名称选择弹出窗开始-->
		<div class="modal fade" id="goodsFilter" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog modal1130">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							备件名称选择
						</h4>
					</div>
					 <div class="modal-body">
						<div class="tranLeft" style="overflow: auto;">
							<div class="left-tree">
								<input type="hidden"  />
								<ul id="spmcDataTree" class="ztree"></ul>
							</div>							
						</div>
						<div class="right-body">
							<div class="jqGrid_wrap" style="min-width:873px;">
								<input type="text" class="quickGoods"/>
								<input type="hidden" class="goodsIDYF"/>
								<table id="jqGrid_tranSpmc" class="zxsaastable"></table> 
			    				<div id="gridpager_tranSpmc"></div>
		    				</div>
		    			</div>
				   </div>
					<div class="modal-footer">
						<button type="button" class="btn btn-warning" data-dismiss="modal">仅关闭</button>
					</div>
				</div>
			</div>
		</div><!--备件选择弹出窗结束-->
		
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
	<script src="${basePath}/js/afterSale/toGetTreatment.js?v=${version}" type="text/javascript" charset="utf-8"></script>
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



