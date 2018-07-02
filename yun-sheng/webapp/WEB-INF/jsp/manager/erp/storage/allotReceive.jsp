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
		<link rel="stylesheet" type="text/css" href="${basePath}/js/skins/all.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="${basePath}/css/animate.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/bootstrap-select.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/font-awesome.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/iconfont.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/pagecss/treepage.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/jquery.datetimepicker.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/ui.jqgrid-bootstrap.css?v=${version}"/>
		
		<link rel="stylesheet" type="text/css" href="${basePath}/css/cw/zTreeStyle/zTreeStylePublicModel.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/Storage/allotReceive.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/erp/storage/managers.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/html/muti_select/multi.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="${basePath}/js/cw/bootstrap/css/bootstrapValidator.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="${basePath}/css/Storage/css.css?v=${version}"/>
		<title>调拨接收</title>
		 <script type="text/javascript">
			var billsCode = "${billsCode}";
			//是否有显示调拨总额 的权限
			var checkCost = ${checkCost};
		</script>
		<style>
			.col-sm-8{
				height: auto;
			}
			.yfKong {
				margin-bottom: 5px !important;
			}
		</style>
	</head>
	<body>
		<input type="hidden" id="inDepartmentIdStr">
		<input type="hidden" id="outDepartmentIdStr">
 		<div class="well">
 		<div id="AUTH" data-code="DBJSQR" class="btn-group btnHundred" role="group" >
			<button type="button" class="reception btn"  id="rcev" >接收</button>	
			<!--<button type="button" class="btn rejection"  id="refus">拒收</button>	
			--><%--<button type="button" class="btn btn-default" data-eventname="printbtn">导出</button>--%>
			<button type="button" class="btn btn-default" onclick="showPrintAllot()">打印</button>
			<%--<button type="button" class="btn btn-default" onclick="onclickRefresh()">刷新</button>--%>
			<!--button type="button" class="verify btn btn-default" id="numerValidate">串号校验</button-->		  			  			  			  
			</div>
			<form id="filterForm">
				<input type="hidden" name="selOutDepartmentIdStr" id="selOutDepartmentIdStr">
				<input type="hidden" name="selInDepartmentIdStr" id="selInDepartmentIdStr">
				<div class="inputbox container-fluid clearfix">
					<!--<div class="tip"><p class="tip_p">已发货</p></div>-->
					<div class="row yfKong">
						<div class="">
							<span class="box_text">开始日期：</span>
							<div class="col-sm-8">
								<div class="input-group"><input style="width:80%;" type="text" class="form-control2 allotStartTime" id="startTimeStr" name="startTimeStr" placeholder="年-月-日"  onblur='checkInput.checkTime(this,"#startTimeStr","#endTimeStr");'  readonly/></div></div>
						</div>
						<div class="">
							<span class="box_text">单据状态：</span>
							<div class="col-sm-8">
								<div class="input-group">
								<div class='multi_select multi_select_audit selctRight'></div>
							</div></div>
						</div>
						<div class="">
						
					         	<span class="box_text">调出部门：</span>
							<div class="col-sm-8">
								<div class="input-group">
					             <input type="text" value="" class="form-control2 depSearch" id="filterInName" disabled="disabled" style="text-overflow: ellipsis;" title="">
					         </div></div>
						</div>
						<div class="">
							<span class="box_text">经手人：</span>
							<div class="col-sm-8">
								<div class="input-group">
									<input id="managersName"  style="text-overflow: ellipsis;" class="form-control2" name="managersName" type="text" >
					       		 </div></div>
						</div>
					</div>
					
					<div class="row yfKong">
						<div class="">
							<span class="box_text">结束日期：</span>
							<div class="col-sm-8">
								<div class="input-group"><input style="width:80%;" type="text" class="form-control2 allotStartTime" name="endTimeStr" id="endTimeStr" placeholder="年-月-日"  onblur='checkInput.checkTime(this,"#startTimeStr","#endTimeStr");'  readonly/></div></div>
						</div>
						<div class="">
							<span class="box_text">调拨类型：</span>
							<div class="col-sm-8">
								<div class="input-group">
								<div class='multi_select multi_select_alloType selctRight'></div>
							</div></div>
						</div>
						<div class="">
						 	<span class="box_text">调入部门：</span>
							<div class="col-sm-8">
								<div class="input-group">
					             <input type="text" value="" class="form-control2 depSearch" id="filterOutName"  disabled="disabled"   style="text-overflow: ellipsis;" title="">
					         </div>
							</div>
						</div>
						<div class="">
							<span class="box_text">单备注：</span>
							<div class="col-sm-8">
								<div class="input-group"><input type="text" placeholder="" style="width:80%;" name="selRemark" id="selRemark" class="form-control2" maxLength=100 /></div></div>
						</div>
						<div class=" ">
							<button type="button" class="btn btn-w btn-info" onclick="official()">查询</button>
						</div>
					</div>
				</div>
			 </form>
		</div>
		<!--</div>-->
		
			<!-- 接收模态框（Modal） -->
		<div class="modal fade" id="receiveChoose" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog modalNine" style="min-width:1000px;">
			
				<div class="modal-content ">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							接收
						</h4>
					</div>
				  <div class="modal-body" >	
				  <!-- 容器开始 -->			 
				  <div class="container-fluid" style="min-width:970px">	
				  	<div class="inputModal clearfix" >
				  		<div class="inputTab">
				  			<span>接收日期:</span>
							<input type="text" class="filterData" placeholder="年-月-日" id="receiveDateString" name="receiveDateString" readonly="readonly" />
				  		</div>
				  		<!--<div class="inputTab">
				  		
				  			<span>接收人:</span>
				  			<input type="text" id="receiveName" name="receiveName" readonly="readonly"/>
				  		</div>
				  		--><div class="inputTab">
				  			<span>存放仓库:</span>
				  			<select class="slectDome" id="receiveStorage" name="receiveStorage"></select>
				  		</div>
				  		
				  		<div class="inputTab">
				  			<span>接收备注:</span>
				  			<input type="text" class="filterData" id="receiveRemark" name="receiveRemark" />
				  		</div>
				  	</div>
				  	<div class="next-modal" style="overflow:inherit;min-height:340px;">
				  		<div class="row">
							<div class="gridTitle"></br>已</br>选</br>中</br>单</br>据</br>列</br>表</div>
							<div class="col-md-11 chosen"  style="min-width:930px">
								<div class="jqGrid_wrap jqGrid300">
									<table id="jqGrid_tranReceive" class="zxsaastable"></table> 
				    				<!--div id="tran_pager"></div-->
			    			    </div>
							</div>
						</div>
					</div>
					
					<!-- 修改开始 -->
					 <!--<div class="tablebox retailDetailTable tableNone ">
						<div class="row">
							<div class="gridTitle danju3" style="margin-left:15px;display:none;"></br>单</br>据</br>明</br>细</div>
						      <div style="margin:10px 0 0 15px;display:inline-block;min-width:930px" class="bottom_container">
								<table id="jqGrid_detail2" class="zxsaastable"></table>
								<div id="jqGrid_detail2_detail"></div>
							  </div>
							</div>
						</div>	
					</div> 
					--><!-- 容器结束 -->
				  </div>
				  <!-- 
				   <div class="tablebox retailDetailTable tableNone ">
						<div class="row">
							<div class="gridTitle danju3" style="display:none;"></br>单</br>据</br>明</br>细</div>
							<div class="col-md-11">
							
									<table id="jqGrid_detail2" class="zxsaastable">
									</table>
									<div id="jqGrid_detail2_detail"></div>
								
							</div>
						</div>
					</div>	
					 -->			  	
				  	<div class="modal-footer">
						<button type="button" class="btn btn-w btn-info" onclick="receiveBills()">保存</button>
						<button type="button" class="btn btn-warning" data-dismiss="modal">取消</button>
				   </div>		
				  </div>					
				</div>
			</div><!-- /.modal -->
		</div><!-- 接收模态框（Modal）结束 -->
		
		<!-- 拒收模态框（Modal） -->
		<div class="modal fade" id="rejectionChoose" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog modalNine" style="min-width:1000px;">
				<div class="modal-content ">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							拒收
						</h4>
					</div>
				  <div class="modal-body" >				  	
				  	<div class="inputModal clearfix">
				  		<div class="inputTab">
				  			<span for="">拒收原因:</span>
							<input type="text" class="" id="rejectionCause" name="rejectionCause"/>
				  		</div>
				  	</div>
				  	<div class="next-overflow">
				  		<!--<span>已选中单据列表</span><span class="box_text red">(双击查看单据明细)</span>-->
	    			    <div class="row">
							<div class="gridTitle"></br>待</br>接</br>收</br>单</br>据</br>列</br>表</div>
							<div class="col-md-11 refuChoose"  style="min-width:930px">
								<div class="jqGrid_wrap jqGrid300" style="height:300px;">
									<table id="jqGrid_tranRejection" class="zxsaastable"></table> 
				    				<!--div id="gridpager_tranRejection"></div-->
			    			    </div>
							</div>
						</div>
	    			    
					</div>
				  	
				  </div>
				    <div class="tablebox retailDetailTable tableNone">
						<!-- <span class="box_text danju2" style="display: none;">单据明细：</span>-->
						
						<div class="row">
							<div class="gridTitle danju2" style="display:none;"></br>单</br>据</br>明</br>细</div>
							<div class="col-md-11">
								<div class="grid-wrap overfo" style="margin:10px">
									<table id="jqGrid_rejection2" class="zxsaastable">
									</table>
									<div id="jqGrid_rejection2_detail"></div>
								</div>
							</div>
						</div>
					</div>
				  	<div class="modal-footer">
						<button type="button" class="btn btn-w btn-info" onclick="RejectBills()">保存</button>
						<button type="button" class="btn btn-warning" data-dismiss="modal">取消</button>
				   </div>		
				  </div>					
				</div>
			</div><!-- /.modal -->
		</div><!-- 拒收模态框（Modal）结束 -->
		
		
		<!-- 刷新模态框（Modal） -->
		<div class="modal fade" id="refreshChoose" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog modalSmall">
				<div class="modal-content ">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						
					</div>
				  <div class="modal-body" style="text-align: center;font-size: 16px;">				  	
				  	 是否刷新当前页面
				  </div>				  	
				  	<div class="modal-footer">
						<button type="button" class="btn btn-w btn-info" onclick="onclickRefresh()">确定</button>
						<button type="button" class="btn btn-warning" data-dismiss="modal">取消</button>
				   </div>		
				  </div>					
				</div>
			</div><!-- /.modal -->
		</div><!-- 刷新模态框（Modal）结束 -->
		
		<!-- 串号校验模态框（Modal） -->
		<div class="modal fade" id="verifyChoose" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog modal800">
				<div class="modal-content ">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							串号校验
						</h4>
					</div>
					
					<!-- body开始 -->
				  <div class="modal-body" >
				    
				    <div class="row" style="padding:0 10px;">
				  	<!-- 第一 -->  	
				  	<div class="inputAcross clearfix">
				  		<div class="inputTab">
				  			<span for="">单据编号:</span>
							<input type="text" id="verifyBillsCode" disabled/>
				  		</div>
				  		<div class="inputTab">
				  			<span>串号录入:</span>
				  			<input type="text" id="imeiPut" onkeydown="EnterPressOtherImei()"/>
				  		</div>
				  	</div>
				  	<!-- 第一结束 -->
				  	<!-- 第二 -->
				  	<div class="inputAcrossR clearfix">
				  		<p>需校验数：<label id="verifytotal">0</label></p>
				  		<p>校验成功数：<label id="verifySucceedNum">0</label></p>
				  		<p>未校验数：<label id="notVerifyNum">0</label></p>
				  		<p>不在校验内数：<label id="notInVerifyNum">0</label></p>
				  	</div>
				  	<!-- 第二结束 -->
				  	</div>
				  	<div class="row" style="padding:0 10px;width:100%;min-width:698px;height:576px;min-height:576px">
				  	<!-- 第三 -->
								  	<div class="next-modal" style="float:left;width:66.74%;">
								  		<span>校验信息</span>
										<div class="jqGrid_wrap" style="height:98%">
											<table id="jqGrid_tranVerify" class="zxsaastable"></table> 
						    				<div id="gridpager_tranVerify"></div>
					    			    </div>
									</div>
								    <!-- 第三结束 -->
									<!-- 第四 -->
									<div class="next-modal2" style="float:right;width:28.65%; margin-top: 4.5%; margin-right: 2%;">
										<textarea id="hintStr" cols="22" rows="14" style="height: 100%;">
										
										</textarea>
									</div>
									<!-- 第四结束 -->
					</div>
				  
				  	
				  </div>				  	
				 
				 <!-- body结束 -->
				  	<div class="modal-footer">
						<button type="button" class="btn btn-w btn-info" onclick="openVerify()">关闭校验</button>
						<button type="button" class="btn btn-warning" data-dismiss="modal">取消</button>
				   </div>		
				  </div>					
				</div>
			</div><!-- /.modal -->
		</div><!-- 串号校验模态框（Modal）结束 -->
		
		<!-- 调出部门名称模态框（Modal） -->
		<div class="modal fade" id="OutSectionModal" tabindex="-1" role="dialog" aria-labelledby="mySection" aria-hidden="true">
			<div class="modal-dialog tree-dialog modalSmall">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							调出部门
						</h4>
					</div>
					<div class="modal-body tree-body">
						<ul id="outSectionTree" class="ztree"></ul>
					</div>
					
					<div class="modal-footer">
					    <button type="button" class="btn outSectionConfirm">确定</button>
						<button type="button" class="btn btn-warning" data-dismiss="modal">取消</button>
					</div>
					
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div><!-- 调入部门名称模态框（Modal）结束 -->
		
		<!-- 调入部门名称模态框（Modal） -->
		<div class="modal fade" id="inSectionModal" tabindex="-1" role="dialog" aria-labelledby="mySection" aria-hidden="true">
			<div class="modal-dialog tree-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							调入部门
						</h4>
					</div>
					<div class="modal-body tree-body">
						<ul id="inSectionTree" class="ztree"></ul>
					</div>
					
					<div class="modal-footer">
					    <button type="button" class="btn inSectionConfirm">确定</button>
						<button type="button" class="btn btn-warning" data-dismiss="modal">取消</button>
					</div>
					
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div><!-- 调出部门名称模态框（Modal）结束 -->
		
		
		<!-- 打印模态框（Modal） -->
		<div class="modal fade" id="printModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							单据打印
						</h4>
					</div>
					<div class="modal-body">
						打印模板类型<br>
						<div id="printTypeOne">
							<label class="radio-inline"><input type="radio" name="printRadioOne" value="imeiDetail-one" checked>同价调拨接收-商品明细</label>
							<label class="radio-inline"><input type="radio" name="printRadioOne" value="numberDetail-one">同价调拨接收-商品汇总</label><br>
						</div>
						<div id="printTypeTwo">
							<label class="radio-inline"><input type="radio" name="printRadioTwo" value="imeiDetail-tow" checked>变价调拨接收-商品明细</label>
							<label class="radio-inline"><input type="radio" name="printRadioTwo" value="numberDetail-two">变价调拨接收-商品汇总</label>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">关闭
						</button>
						<button type="button" class="btn btn-primary" onclick="print()">
							确定
						</button>
					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>
		
			<!-------------------------------------搜索条件结束----------------------------------------->			
			<!-------------------------------------表格开始----------------------------------------->
			
		<div class="tablebox retailDetailTable clearfix" style="margin-top:-10px;">
				 <!-- <span class="box_text">待接收单据列表：</span>
				     <span class="box_text red">(双击查看单据明细)</span> -->
				<div class="row" style="padding-right:16px; box-sizing:content-box;">
					<div class="gridTitle showJqGrid" style="margin-right:0;"></br>单</br>据</br>列</br>表</div>
					<div style="overflow:hidden;">
						<div class="grid-wrap overfo" style="margin-top:10px;">
							<table id="jqGrid_SubjectBalance" class="zxsaastable ">
							</table>
							<div id="jqGridPager"></div>
						</div>
					</div>
				</div>
			</div>
		<div class="Zmargin none">
			<ul id="myTab" class="nav nav-tabs">
				<li class="active">
					<a href="#Tab1" data-toggle="tab" class="retail" aria-expanded="true">明细模式</a>
				</li>
				<li class="">
					<a href="#Tab2" data-toggle="tab" data-flag="false" class="recede" aria-expanded="false">汇总模式</a>
				</li>
			</ul>
			<div id="myTabContent" class="tab-content mt5" >

				<div class="tab-pane active" id="Tab1">
					<div class="tablebox retailDetailTable ">
						<div class="row">
							<div class="gridTitle" style="margin-right:0;"></br>单</br>据</br>明</br>细</div>
							<div style="overflow:hidden;">
								<div class="grid-wrap ZminHeight" >
									<table id="jqGrid_detail" class="zxsaastable">
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="tab-pane " id="Tab2">
					<div class="tablebox retailDetailTable ">
						<div class="row">
							<div class="gridTitle" style="margin-right:0;"></br>单</br>据</br>汇</br>总</div>
							<div style="overflow:hidden;">
								<div class="grid-wrap ZminHeight" >
									<table id="jqGrid_gather" class="zxsaastable">
									</table>

								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>


		<!-------------------------------------表格结束----------------------------------------->
		<!-------------------------------------主页面结束----------------------------------------->
		<!-------------------------------------底部开始----------------------------------------->
		
		<!--<div class="collapse in" id="collapseExample">
				<div class="inputbox container-fluid clearfix">
					<div class="row">
						<div class="col-xs-2 ">
							<span class="box_text">公司名称：</span><span class="box_input"><input type="text" class="form-control" disabled  /></span>
						</div>
						<div class="col-xs-2 ">
							<span class="box_text">制单人：</span><span class="box_input"><input type="text" class="form-control" disabled  /></span>
						</div>
						<div class="col-xs-2 ">
							<span class="box_text">修改人：</span><span class="box_input"><input type="text" class="form-control" disabled  /></span>
						</div>
						<div class="col-xs-2 ">
							<span class="box_text">发货人：</span><span class="box_input"><input type="text" class="form-control" disabled  /></span>
						</div>
						<div class="col-xs-2 ">
							<span class="box_text">撤回人：</span><span class="box_input"><input type="text" class="form-control" disabled  /></span>
						</div>
						
					</div>
				</div>
		</div>-->
		
		<!-- 串号明细模态框（Modal） -->
		<div class="modal fade" id="imeiModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog modalQian">
				<div class="modal-content ">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							串号明细
						</h4>
					</div>
				  <div class="modal-body">
					<div class="left-body clearfix">
							<span>串号明细信息</span>
						  <div class="jqGrid_wrap">
							<table id="jqGrid_imeiModal" class="zxsaastable"></table> 
		    				<div id="gridpager_imeiModal"></div>
	    				  </div>
					 </div>
				   </div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div><!--引入在库串号模态框（Modal）结束 -->
		<!-------------------------------------底部结束----------------------------------------->
	</body>
	<script src="${basePath}/js/jquery-1.12.4.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/base.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script type="text/javascript" charset="utf-8" src="${basePath}/js/jquery-migrate-1.2.1.min.js?v=${version}"></script>
	<script type="text/javascript" charset="utf-8" src="${basePath}/js/jquery.jqprint-0.3.js?v=${version}"></script>
	<script src="${basePath}/js/jquery-form.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/bootstrap.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/jquery.jqGrid.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/jquery.datetimepicker.full.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/grid.locale-cn.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/commonjs/xm.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/zxsaas_plus.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/component.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/cw/jquery.ztree.all-3.5.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/erp/storage/MultiSelectDropList.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/erp/storage/allotReceive.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/erp/storage/allotReceiveCC.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/erp/storage/model-storage.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/erp/storage/department_modify.js?v=${version}" type="text/javascript" charset="utf-8"></script>

	<script src="${basePath}/js/bootstrapValidator.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/cw/bootstrap/js/validator-lynnjer.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<!-- <script src="${basePath}/js/erp/storage/storageCheck.js?v=${version}" type="text/javascript" charset="utf-8"></script> -->
	<!-- 菜单权限验证 -->
	<script type="text/javascript" src="${basePath}/js/erp/authority/menuValidation.js?v=${version}"></script>
	<script type="text/javascript">
		checkRole('#ibillsHead');
		var basePath = "${basePath}";
		var storageObj = null;
		var groupId = 8888888;
		var companyId = 12;
		var sectionId = 9;
	</script>
</html>