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
		<link rel="stylesheet" type="text/css" href="${basePath}/css/Storage/commodity.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/erp/storage/managers.css?v=${version}"/>
		
		<title>商品移库</title>
		 
	</head>
	<body>
		<!-------------------------------------主页面开始----------------------------------------->
		
			
			<!-- <div class="grid-title">
				<span>商品移库</span>
			    <input type="radio" checked="checked" name="radioBills" value="0"/><span>正式单据</span>
				<input type="radio" name="radioBills" value="1"/><span>草稿单据</span>
			</div> -->
			<!-------------------------------------搜索条件开始----------------------------------------->
		<!--<div class="collapse in" id="collapseExample">-->
 		<div class="well">
 			<div id="AUTH" data-code="SPYKD" class="btn-group btnHundred" role="group" >
				<button type="button" class="btn" onclick="lastForm()">首单</button>
			    <button type="button" class="btn" onclick="upForm()">上一单</button>
			    <button type="button" class="btn" onclick="downForm()">下一单</button>
			    <button type="button" class="btn" onclick="firstForm()">末单</button>
				<button type="button" class="btn btn-default addAudit" onclick="onclickNewBills()">新增</button>
		    	<button type="button" class="btn btn-default saveData" onclick="onClickExecute()">保存</button>	
		   		<button type="button" class="btn btn-default deleteReceipts" onclick="onClickDelete()">删除</button>	
		   		<button type="button" class="btn btn-default" onclick="commodityGzHc('1')">过账</button>	
			   	<!-- <button type="button" class="btn btn-default" onclick="hcClick()">红冲</button> -->	
			   	<button type="button" class="btn btn-default" data-toggle="modal" data-target="#printModal">打印</button>
			   	<%--<button type="button" class="btn btn-default" data-eventname="printbtn">导入</button>
			    <button type="button" class="btn" onclick="billsImport()">单据引入</button>--%>
			    <button type="button" class="btn btn-default" data-eventname="printbtn" data-toggle="modal" data-target="#filtrationChoose">过滤</button>
			    <%--<button type="button" class="btn btn-default" onclick="onclickRefresh()">刷新</button>
			    <button type="button" class="btn btn-default" data-eventname="printbtn">复制</button>	  			  			  			  
			    --%><div class="slideThree">
					<input type="checkbox" value="1" id="slideThree" name="check"/>
					<label for="slideThree"></label>
				</div>
			</div>
			<form id="ibillsHead">
				<input type="hidden" id="id" name="id" value="">
				<input type="hidden" id="sectionId" name="sectionId" value="">
				<div class="inputbox container-fluid clearfix">
					<div class="row">
						<div class="form-group Zpercent">
							<span class="box_text2">单据编号：</span><div class="col-sm-8">
								<div class="input-group"><input type="text" class="form-control2" id="billsCode" name="billsCode" disabled  /></div></div>
						</div>
						<div class="form-group Zpercent">
							<span class="box_text2">部门名称：</span>
							<div class="col-sm-8">
								<div class="input-group">
					             <input type="text" id="sectionName" name="sectionName" class="form-control depSearch" onkeydown="departmentDel('sectionName')">
							      <span class="input-group-btn">
							        <button class="btn btn-default btn2" type="button" onclick="yesAuthority('sectionName')">
							        	<span class="glyphicon glyphicon-plus"></span>
							        </button>
							      </span>
					         </div></div>
						</div>

						<div class="form-group Zpercent">
							<span class="box_text2">单据日期：</span>
							<div class="col-sm-8">
								<div class="input-group"><input type="text" class="form-control2 commodityTime" id="billsDateString" name="billsDateString" placeholder="年-月-日"  /></div></div>
						</div>
						<div class="form-group Zpercent">
							<span class="box_text2">单备注：</span>
							<div class="col-sm-8">
								<div class="input-group"><input type="text" name="remark" id="remark" class="form-control2"/></div></div>
						</div>
					</div>
					<div class="row">
						<div class="form-group Zpercent">
							<span class="box_text2">经手人：</span>
							<div class="col-sm-8">
								<div class="input-group">
							<select class="managers" id="managersUid" name="managersUid" disabled="disabled">
								<option value="" selected>请选择部门</option>
					        </select></div></div>
						</div>

						<div class="form-group Zpercent">
							<span class="box_text2">移出仓库：</span>
							<div class="col-sm-8">
								<div class="input-group"><select  class="form-control2" id="outStorageId" name="outStorageId" onchange="clickStorage('outStorageId')" disabled="disabled">
													<option value="" selected>请选择部门</option>
												</select></div></div>
						</div>
						<div class="form-group Zpercent">
							<span class="box_text2">移入仓库：</span>
							<div class="col-sm-8">
								<div class="input-group"><select  class="form-control2 commodityTime" id="inStorageId" name="inStorageId" onchange="clickStorage('inStorageId')" disabled="disabled">
													<option value="" selected>请选择部门</option>
													</select></div></div>
						</div>
					
					</div>
				</div>
				<div class="rightMap">
					<img id="billsStautsImg" src="${basePath}/images/guozhang.png" />
				</div>
			 </form>
		</div>
		<!--</div>-->
		
		<!-- 删除模态框（Modal） -->
		<div class="modal fade" id="delectChoose" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog modalSmall">
				<div class="modal-content ">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							删除此单据
						</h4>
					</div>
				  <div class="modal-body" style="text-align: center;font-size: 16px;">				  	
				  	    <button type="button" class="btn btn-w btn-info" data-dismiss="modal">草稿单</button>
						<button type="button" class="btn btn-warning" data-dismiss="modal">非草稿单</button>
				  </div>				  	
				  	<div class="modal-footer">
						<button type="button" class="btn btn-warning" data-dismiss="modal">关闭</button>
				   </div>		
				  </div>					
				</div>
			</div><!-- /.modal -->
		</div><!-- 删除模态框（Modal）结束 -->
		
		<!-- 过账模态框（Modal） -->
		<div class="modal fade" id="shipmentsChoose" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog modalSmall">
				<div class="modal-content ">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							 是否过账
						</h4>
					</div>
				  <div class="modal-body" style="text-align: center;font-size: 16px;">				  	
				  	 
				  	  <button type="button" class="btn btn-w btn-info" data-dismiss="modal">草稿单</button>
						<button type="button" class="btn btn-warning" data-dismiss="modal">非草稿单</button>
				  </div>				  	
				  	<div class="modal-footer">
						<button type="button" class="btn btn-warning" data-dismiss="modal">关闭</button>
				   </div>		
				  </div>					
				</div>
			</div><!-- /.modal -->
		</div><!-- 过账模态框（Modal）结束 -->
		
		<!-- 红冲模态框（Modal） -->
		<div class="modal fade" id="delectChoose" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog modalSmall">
				<div class="modal-content ">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							红冲
						</h4>
					</div>
				  <div class="modal-body" style="text-align: center;font-size: 16px;">				  	
				  	    <button type="button" class="btn btn-w btn-info" data-dismiss="modal">草稿单</button>
						<button type="button" class="btn btn-warning" data-dismiss="modal">非草稿单</button>
				  </div>				  	
				  	<div class="modal-footer">
						<button type="button" class="btn btn-warning" data-dismiss="modal">关闭</button>
				   </div>		
				  </div>					
				</div>
			</div><!-- /.modal -->
		</div><!-- 红冲模态框（Modal）结束 -->
		
		<!-- 导入模态框（Modal） -->
		<div class="modal fade" id="toLeadChoose" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog ">
				<div class="modal-content ">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							单据明细导入
						</h4>
					</div>
				  <div class="modal-body" style="text-align: center;font-size: 16px;">				  	
				  	  <input type="text"  /> 
				  	  <input type="file" />
				  	  <button>确定导入</button>
				  </div>				  	
				  	<div class="modal-footer">
						<button type="button" class="btn btn-w btn-info" data-dismiss="modal">确定</button>
						<button type="button" class="btn btn-warning" data-dismiss="modal">取消</button>
				   </div>		
				  </div>					
				</div>
			</div><!-- /.modal -->
		</div><!-- 导入模态框（Modal）结束 -->
		
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
						<button type="button" class="btn btn-w btn-info" data-dismiss="modal">确定</button>
						<button type="button" class="btn btn-warning" data-dismiss="modal">取消</button>
				   </div>		
				  </div>					
				</div>
			</div><!-- /.modal -->
		</div><!-- 刷新模态框（Modal）结束 -->
		
		<!-- 单据引入模态框（Modal） -->
		<div class="modal fade" id="billsChoose" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog modalNine" style="min-width:1380px;">
				<div class="modal-content ">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							单据引入
						</h4>
					</div>
				  <div class="modal-body">
				  	<div class="inputModal clearfix">
				  		<div class="inputTab">
				  			<span>单据编号：</span><span><input type="text" id="selBillsCodeImport" name="selBillsCode"/></span>
				  		</div>
				  		<div class="inputTab">
				  			<span for="datetimepickerStart">开始日期：</span>
							<span class="box_input"><input type="text" id="startTimeStrImport" name="startTimeStr" class="filterData" placeholder="年-月-日" onblur='checkInput.checkTime(this,"#startTimeStrImport","#endTimeStrImport");'  />
				  		</div>
				  		<div class="inputTab">
				  			<span style="float:left;">部门名称：</span>
							<div class="input-group" style="width:200px;float:left;">
								 <input type="hidden" id="sectionIdImport" name="sectionIdImport" />
					             <input type="text" value="" class="form-control2" id="sectionNameImport" name="sectionNameImport"  onkeydown="departmentDel('sectionNameImport')">
							      <span class="input-group-btn">
							        <button class="btn btn-default" type="button" onclick="yesAuthority('sectionNameImport')">
							        	<span class="glyphicon glyphicon-plus"></span>
							        </button>
							      </span>
					         </div>
				  		</div>
				  	</div>
				  	<div class="inputModal clearfix">
				  	   <div class="inputTab">
				  			<span>单据类型：</span><span>
								<select id="selBillsTypeStrImport" name="selBillsTypeStr">
								<option></option>
								<optgroup label="调拨发货">
									<option value="7" >同价调拨发货单</option>
									<option value="8" >变价调拨发货单</option>
								</optgroup>
								<optgroup label="出库、入库">
									<option value="9"  >其它入库单</option>
									<option value="10" >其它出库单</option>
									<option value="11" >商品移库单</option>
								</optgroup>
								<optgroup label="借出、借入">
									<option value="12" >商品借入单</option>
									<option value="14" >商品借出单</option>
								</optgroup>
							</select>
							</span>
				  		</div>
				  		<div class="inputTab">
				  			<span for="">结束日期：</span>
							<input type="text" id="endTimeStrImport" name="endTimeStr" class="filterData" placeholder="年-月-日" onblur='checkInput.checkTime(this,"#startTimeStrImport","#endTimeStrImport");'  />
				  		</div>
				  		
				  		
				  	</div>
				 
					<div class="next-modal">
						<div class="jqGrid_wrap">
							<table id="jqGrid_tranBills" class="zxsaastable"></table> 
		    				<div id="gridpager_tran"></div>
	    			    </div>
					</div>
					<div></div>
					<div class="next-modal2">
						<h5>单据明细</h5>
						<div class="jqGrid_wrap Detail">
							<table id="jqGrid_detailBills" class="zxsaastable"></table> 
		    				<div id="gridpager_tran"></div>
	    			    </div>
					</div>
					
				   </div>
					<div class="modal-footer">
						<button type="button" class="btn btn-w btn-info" onclick="onclickSureImport()">确定引入</button>
						<button type="button" class="btn btn-warning" data-dismiss="modal">关闭窗口</button>
					</div>
					
				</div>
			</div><!-- /.modal -->
		</div><!-- 单据引入模态框（Modal）结束 -->
		
		<!--过滤弹出窗-->
		<!-- 模态框（Modal） -->
		<div class="modal fade" id="filtrationChoose" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<form id="filterForm">
			<div class="modal-dialog modal990">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							过滤条件
							<span> <input name="selBillsStatuStr" id="selBillsStatuStr" value="7" type="checkbox"/>是否包含红冲单据</span>
						</h4>
					</div>
					<div class="modal-body" id="model-body">
							<div class="inputModal">
									<input type="hidden" name="pageNumber" id="pageNumber"/>
									<input type="hidden" name="pageSize" id="pageSize" value="1"/>
									<input type="hidden" name="statusBills" id="statusBills">
									<input type="hidden" name="selSectionIdStr" id="selSectionIdStr">
									<input type="hidden" name="selStorageIdStr" id="selStorageIdStr">
									<input type="hidden" name="selGoodsIdStr" id="selGoodsIdStr">
									<input type="hidden" name="selBillsTypeStr" id="selBillsTypeStr">
									<%--<input type="hidden" name="selOutStorageStr" id="selOutStorageStr">
									<input type="hidden" name="selInstorageStr" id="selInstorageStr">
									--%><div class="inputTab">
										<span>开始日期：</span>
										<input type="text" name="startTimeStr" class="filterData" placeholder="年-月-日" value="" id="startTimeStr" onblur='checkInput.checkTime(this,"#startTimeStr","#endTimeStr");'  />
									</div>
									<div class="inputTab">
										<span>部门名称：</span>
										<span><input type="text" id="filterSectionName" onkeydown="departmentDel('filterSectionName')"/></span>
				  			            <span class="colspan loadspan glyphicon glyphicon-plus depFilter" onclick="yesAuthority('filterSectionName')"></span>
									</div>
									<div class="inputTab">
										<span>单据编号：</span>
										<input type="text" name="selBillsCode" id="selBillsCode" class="filterData" />
									</div>
									<div class="inputTab">
										<span>结束日期：</span>
										<input type="text" name="endTimeStr" class="filterData" placeholder="年-月-日" value="" id="endTimeStr" onblur='checkInput.checkTime(this,"#startTimeStr","#endTimeStr");'  />
									</div>
									<div class="inputTab">
										<span>移出仓库：</span>
										<span><select id="selOutStorageStr" name="selOutStorageStr">
												<option value="" selected>请选择部门</option>
												</select>
										</span>
				  			            <%--<span class="colspan loadspan glyphicon glyphicon-plus storageName" data-toggle="modal" data-target="#storageFilter"></span>
									--%></div>
									<div class="inputTab">
										<span>移入仓库：</span>
										<span><select id="selInstorageStr" name="selInstorageStr">
												<option value="" selected>请选择部门</option>
												</select>
										</span>
									</div>
									<div class="inputTab">
										<span>单&nbsp;&nbsp;备&nbsp;&nbsp;注：</span>
											<input type="text" name="selRemark" id="selRemark" class="filterData" />
									</div>
									<div class="inputTab">
										<span>商品名称：</span>
										<span><input type="text" id="selGoodsName"/></span>
				  			            <span class="colspan loadspan glyphicon glyphicon-plus goodsName" onclick="showGoodsImport()"></span>
									</div>
									<div class="inputTab">
										<span>串&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：</span>
										<input type="text" name="selImei" class="filterData" id="selImei" disabled/>
									</div>
							</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-success" onclick="filterSelect(null)">查询</button>
						<button type="button" class="btn btn-info" data-dismiss="modal">取消</button>
						<button type="button" class="btn btn-warning reset" onclick="resetFilter()">重置</button>
					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
			</form>
		</div>
		
		<!--过滤  移出仓库模态框（Modal） -->
		<div class="modal fade" id="entrepotChooseCheck" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog modal880">
				<div class="modal-content ">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							移出仓库
						</h4>
					</div>
				  <div class="modal-body">
					<div class="tranLeft" style="overflow: auto;">
						<h4>部门过滤</h4>
						<div class="left-tree">
							<ul id="shiftOutDataTree" class="ztree"></ul>
						</div>							
					</div>
					<div class="right-body">
							<div class="jqGrid_wrap">
								<h4>仓库列表</h4>
								<table id="jqGrid_tranEntrepot" class="zxsaastable"></table> 
		    					<div id="gridpager_tranEntrepot"></div>
	    					</div>
	    			</div>
					
				   </div>
					<div class="modal-footer">
						<button class="btn btn-w btn-info" data-dismiss="modal">确定</button>
						<button type="button" class="btn btn-warning" data-dismiss="modal">取消</button>
					</div>
					
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div><!--过滤   移出仓库模态框（Modal）结束 -->
		
		<!--过滤  移入仓库模态框（Modal） -->
		<div class="modal fade" id="shiftInChooseCheck" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog modal880">
				<div class="modal-content ">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							移入仓库
						</h4>
					</div>
				  <div class="modal-body">
					<div class="tranLeft" style="overflow: auto;">
						<h4>部门过滤</h4>
						<div class="left-tree">
							<ul id="shiftInDataTree" class="ztree"></ul>
						</div>							
					</div>
					<div class="right-body">
							<div class="jqGrid_wrap">
								<h4>仓库列表</h4>
								<table id="jqGrid_tranShiftIn" class="zxsaastable"></table> 
		    					<div id="gridpager_tranShiftIn"></div>
	    					</div>
	    			</div>
					
				   </div>
					<div class="modal-footer">
						<button class="btn btn-w btn-info" data-dismiss="modal">确定</button>
						<button type="button" class="btn btn-warning" data-dismiss="modal">取消</button>
					</div>
					
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div><!--过滤   移入仓库模态框（Modal）结束 -->
		
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
						<button type="button" class="btn btn-warning" data-dismiss="modal">取消</button>
					</div>
					
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div><!-- 调出部门名称模态框（Modal）结束 -->
		
		<!-- 调入部门名称模态框（Modal） -->
		<div class="modal fade" id="mySection" tabindex="-1" role="dialog" aria-labelledby="mySection" aria-hidden="true">
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
						<ul id="mySectionTree" class="ztree"></ul>
					</div>
					
					<div class="modal-footer">
						<button type="button" class="btn btn-warning" data-dismiss="modal">取消</button>
					</div>
					
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div><!-- 调入部门名称模态框（Modal）结束 -->
		
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
						打印模板类型
						<label class="radio-inline"><input type="radio" name="printRadio" value="imeiDetail" checked>商品明细</label>
						<label class="radio-inline"><input type="radio" name="printRadio" value="numberDetail">商品汇总</label>
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
		
		<!-- 红冲模态框（Modal） -->
		<div class="modal fade" id="hcModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							单据红冲
						</h4>
					</div>
					<div class="modal-body">
						红冲时间：
						<input type="text" id="hcTime" name="hcTime" placeholder="年-月-日"  onblur='checkInput.checkTime(this,"#startTimeStr","#endTimeStr");'  />
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">关闭
						</button>
						<button type="button" class="btn btn-primary" onclick="commodityGzHc(2)">
							确定
						</button>
					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>
		
		<!-- 商品引用 -->
		<div class="modal fade" id="goodsnameReferenceModal" tabindex="-1" role="dialog"  aria-hidden="true">
		   <div class="modal-dialog" style="width:930px;">
		      <div class="modal-content">
			     <div class="modal-header">
		            <button type="button" class="close"  data-dismiss="modal" aria-hidden="true"> &times;</button>
		            <h4 class="modal-title">
		                                  商品引用
		            </h4>
		         </div>
		         <div class="modal-body">
					<iframe name="goodsnameReferenceFrame" class="referenceFrame" frameborder="0" style="width: 100%;height:400px;" src="${basePath}/Tgoodsname/reference"></iframe>
		         </div>
			  </div>
			</div>
		</div>
		
		<!-- 引入在库串号模态框（Modal） -->
		<div class="modal fade" id="numberChoose" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog modalQian">
				<div class="modal-content ">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							引入在库串号
						</h4>
					</div>
				  <div class="modal-body">
				  	<!--<div class="wenzi">
				  		<span>在库串号信息</span>
				  	</div>-->
				  	<div class="inputModal clearfix">
				  		<div class="inputTab">
				  			<span for="">商品信息：</span>
							<span><input type="text" id="imeiGoodsName" disabled/></span>
				  		</div>
				  		<div class="inputTab">
				  			<span>仓库名称：</span><span><input type="text" id="imeiStorageName" disabled/></span>
				  		</div>
				  		<div class="buttonModal">
				  			<button type="button" class="btn btn-w btn-info" onclick="saveImei()">确定</button>
						<button type="button" class="btn btn-warning" data-dismiss="modal">取消</button>
				  		</div>
				  		
				  	</div>
					<div class="left-body clearfix">
						<span class="leftRefresh_info">在库串号信息</span>
						  <div class="jqGrid_wrap">
							<table id="jqGrid_tranNumber" class="zxsaastable"></table> 
		    				<div id="gridpager_tranNumber"></div>
	    				  </div>
					 </div>
					
					<div class="coverDemo">
						<span></span>
						<div class="cent-body clearfix">
							<div class="leftJU glyphicon glyphicon-fast-forward" onclick="rightAll()"></div>
							<div class="leftJU glyphicon glyphicon-chevron-right" onclick="rightSome()"></div>
							<div class="leftJU glyphicon glyphicon-fast-backward" onclick="leftAll()"></div>
							<div class="leftJU glyphicon glyphicon-chevron-left" onclick="leftSome()"></div>
					     </div>
					</div>
					
					<div class="cent2-body clearfix">
						<span>已选择</span><span class="seletImNumber">3</span>
							<div class="jqGrid_wrap">
								<table id="jqGrid_tranNumber2" class="zxsaastable"></table> 
		    					<div id="gridpager_tranNumber2"></div>
	    					</div>
	    					<div class="modal-footer">
						<button type="button" class="btn btn-w btn-info" onclick="delLeftImei()">删除串号</button>
						<!-- <button type="button" class="btn btn-warning" data-dismiss="modal">文本导入</button> -->
					</div>
					
	    			</div>
	    			<div class="coverDemo1">
						<span>序列号提示</span>
						<div class="rightModal clearfix">
							<textarea id="hintStr" cols="15" rows="14" disabled>
							</textarea>
						</div>
					</div>
				   </div>
					
					
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div><!--引入在库串号模态框（Modal）结束 -->
			<!-------------------------------------搜索条件结束----------------------------------------->			
			<!-------------------------------------表格开始----------------------------------------->
			
			
			
				  <div class="">
				     <span class="box_text2">移库串号：</span>
				     <span class="box_input input-group">
				     	<input type="text" id="otherOutstroNumIdStr" name="otherOutstroNumIdStr" onpropertychange="imeiMate();" oninput="imeiMate();" onkeydown="EnterPressOtherImei()"  placeholder="串号录入,可右匹配" class="form-control2 input-none font100" />
				     	 <div class="none-cx" style="display: none;">
				     	 	<ul  id="otherOutUl">
				     	 	</ul>
				     	 </div>
				     </span>
			      </div>
			<div class="tablebox retailDetailTable">
				
				<div class="grid-wrap overflAuto" style="margin-top:10px">
					<table id="jqGrid_SubjectBalance" class="zxsaastable">
					</table>
					<div id="jqGridPager"></div>
				</div>
			</div>
		
			<!-------------------------------------表格结束----------------------------------------->
		<!-------------------------------------主页面结束----------------------------------------->
		<!-------------------------------------底部开始----------------------------------------->
		
		<div class="collapse in" id="collapseExample">
			<div class="inputbox clearfix foot1175">
					<div class="Zpercent2 ">
						<span class="box_text2">公司名称：</span><span class="box_input"><input type="text" id="footerCompany" class="input150" disabled  /></span>
					</div>
					<div class="Zpercent2 ">
						<span class="box_text2">制单人：</span><span class="box_input"><input type="text" id="footerCreate" class="input150" disabled  /></span>
					</div>
					<div class="Zpercent2 ">
						<span class="box_text2">修改人：</span><span class="box_input"><input type="text" id="footerUpdate" class="input150" disabled  /></span>
					</div>
					<div class="Zpercent2 ">
						<span class="box_text2">发货人：</span><span class="box_input"><input type="text" id="footerPost" class="input150" disabled  /></span>
					</div>
					<div class="Zpercent2 ">
						<span class="box_text2">红冲人：</span><span class="box_input"><input type="text" id="footerBack" class="input150" disabled  /></span>
					</div>
			</div>
		</div>
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
	<script src="${basePath}/js/cw/jquery.ztree.all-3.5.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/erp/storage/MultiSelectDropList.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/erp/storage/commodity.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/erp/storage/commodityCC.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/erp/storage/model-storage.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/erp/storage/publicModal.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/erp/storage/onlyImeiManage.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/erp/storage/billsImport.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/erp/storage/pageBills.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/erp/storage/department.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<link rel="stylesheet" type="text/css" href="${basePath}/js/cw/bootstrap/css/bootstrapValidator.css?v=${version}" />
	<link rel="stylesheet" type="text/css" href="${basePath}/css/Storage/css.css?v=${version}"/>
	<script src="${basePath}/js/bootstrapValidator.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/cw/bootstrap/js/validator-lynnjer.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/erp/storage/storageCheck.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<!-- 菜单权限验证 -->
	<script type="text/javascript" src="${basePath}/js/erp/authority/menuValidation.js?v=${version}"></script>
	<script type="text/javascript">
		checkRole('#ibillsHead');
		var basePath = "${basePath}";
		var storageObj = null;
	</script>
</html>