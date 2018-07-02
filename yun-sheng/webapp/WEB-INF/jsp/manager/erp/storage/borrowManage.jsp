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
		<link rel="stylesheet" type="text/css" href="${basePath}/css/Storage/borrowManage.css?v=${version}" />
		
		<link rel="stylesheet" type="text/css" href="${basePath}/html/muti_select/multi.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="${basePath}/css/erp/storage/managers.css?v=${version}"/>
		<title>借入管理</title>
		
	</head>

	<body >
		<div class="bodyModel">
			<div id="AUTH" data-code="JRGL" class="btn-group btnHundred">
				    <button type="button" class="btn" onclick="lastForm()">首单</button>
			 	    <button type="button" class="btn" onclick="upForm()">上一单</button>
			        <button type="button" class="btn" onclick="downForm()">下一单</button>
			        <button type="button" class="btn" onclick="firstForm()">末单</button>
					<button type="button" class="btn btn-default addAudit" onclick="onclickNewBills()">新增</button>
			    	<button type="button" class="btn btn-default saveData" onclick="onClickExecute()">保存</button>	
			   		<button type="button" class="btn btn-default deleteReceipts" onclick="onClickDelete()">删除</button>	
			   		<button type="button" class="btn btn-default" onclick="borrowGoodsGzHc(1)">过账</button>	
				   	<button type="button" class="btn btn-default" onclick="hcClick()">红冲</button>	
				   	<button type="button" class="btn btn-default" data-eventname="printbtn">打印</button>
				   	<%--<button type="button" class="btn btn-default" data-eventname="printbtn">导入</button>
				    <button type="button" class="btn" onclick="billsImport()">单据引入</button>--%>
				    <button type="button" class="btn btn-default" data-eventname="printbtn" data-toggle="modal" data-target="#filtrationChoose">过滤</button>
				    <%--<button type="button" class="btn btn-default" onclick="onclickRefresh()">刷新</button>
				    <button type="button" class="btn btn-default" data-eventname="printbtn">复制</button>
				    --%><div class="slideThree">
						<input type="checkbox" value="0" id="slideThree" name="check" checked />
						<label for="slideThree"></label>
					</div>
				</div>
			<!-------------------------------------表格开始----------------------------------------->
			<div class="tablebox retailDetailTable">
				<ul id="myTab" class="nav nav-tabs">
					<li class="active">
						<a href="#commodityJC" data-toggle="tab">商品借入单</a>
					</li>
					<li>
						<a href="#loanBack" data-toggle="tab">借入归还</a>
					</li>
					<li>
						<a href="#borrowSale">借入转采购</a>
					</li>
				</ul>
				<div id="myTabContent" class="tab-content">
					<div class="tab-pane fade in active" id="commodityJC">
									<!---------------查询条件开始---------------------------->
									<div class="collapse in" id="collapseExample">
			 			 <div class="well">
						<form id="ibillsHeadBorrow">
							<input type="hidden" id="id" name="id" value="">
							<input type="hidden" id="sectionId" name="sectionId" value="">
							<input type="hidden" id="contactsunitId" name="contactsunitId" value="">
							<div class="inputbox container-fluid clearfix">
								<div class="row">
									<div class="form-group Zpercent ">
										<span class="box_text2">单据编号：</span><div class="col-sm-8">
								<div class="input-group"><input type="text" class="form-control" id="billsCode" name="billsCode" disabled  /></div></div>
									</div>
									<div class="form-group Zpercent">
										<span class="box_text2">部门名称：</span>
										<div class="col-sm-8">
								<div class="input-group">
								      <input type="text" id="sectionName" name="sectionName" class="form-control depSearch" onkeydown="departmentDel('sectionNameOtherOut')">
								      <span class="input-group-btn">
								        <button class="btn btn-default" type="button" onclick="yesAuthority('sectionNameOtherOut')">
								        	<span class="glyphicon glyphicon-plus section"></span>
								        </button>
								      </span>
								    </div></div>
									</div>
									<div class="form-group Zpercent">
										<span class="box_text2">往来单位：</span>
										<div class="col-sm-8">
								<div class="input-group">
								      <input type="text" class="form-control" id="contactName" name="contactName" disabled="disabled" value="请选择部门">
								      <span class="input-group-btn">
								        <button class="btn btn-default" type="button" onclick="selectContactUnitReferenceOpen('contactName')">
								        	<span class="glyphicon glyphicon-plus"></span>
								        </button>
								      </span>
								    </div></div>
									</div>
									<div class="form-group Zpercent">
										<span for="datetimepickerStart" class="box_text2">单据日期：</span><div class="col-sm-8">
								<div class="input-group"><input type="text" id="billsDateString" name="billsDateString" class="form-control" placeholder="年-月-日"  readonly/></div></div>
									</div>
								</div>
								<div class="row">
									<div class="form-group Zpercent">
										<span class="box_text2">未还数量：</span><div class="col-sm-8">
								<div class="input-group"><input type="text" name="phone" id="" value="" placeholder="" class="form-control" disabled /></div></div>
									</div>
									<div class="form-group Zpercent">
										<span class="box_text2">仓库名称：</span>
										<div class="col-sm-8">
								<div class="input-group">
											<select class="sel form-control" disabled="disabled" id="storageId" name="storageId" > 
												<option value="" selected>请选择仓库</option>
											</select>
											</div></div>
									</div>
									<div class="form-group Zpercent">
										<span class="box_text2">经手人：</span>
										<div class="col-sm-8">
								<div class="input-group">
										<select class="managers" id="managersUid" name="managersUid" disabled="disabled">
											<option value="" selected>请选择经手人</option>
					        			</select></div></div>
									</div>
									<div class="form-group Zpercent">
										<span class="box_text2">单备注：</span><div class="col-sm-8">
								<div class="input-group"><input type="text" name="remark" id="remark" value="" placeholder="" class="form-control" /></div></div>
									</div>
								</div>
							</div>
							<div class="rightMap" style='z-index:999;' >
							    <img id="billsStautsImg" />
						    </div>
						 </form>
						 </div>
					</div>
					<!----------------查询条件结束---------------------->
						<div class="container">
							<!--展示列表开始-->
							<div class="details">
								<!--表格-->
								<!--<div class="font-table">
									<span>出库串号：</span>
									<span><input type="text"/></span>
								</div>-->
								<div class="jqGrid_wrap">
									<table id="jqGrid_SubjectBalance" class="zxsaastable"></table> 
				    				<!-- <div id="jqGridPager_commodityLoan"></div> -->
								</div>
							</div>
							<!--展示列表结束-->
						</div>
					</div>
					<!--选项卡-->
					<div class="tab-pane fade" id="loanBack">
										<!--------------查询条件开始------------->
							<div class="collapse in" id="collapseExample">
			 			 <div class="well">
						<form id="ibillsHeadBorrowBack">
							<input type="hidden" id="id2" name="id" value="">
							<input type="hidden" id="sectionId2" name="sectionId" value="">
							<input type="hidden" id="contactsunitId2" name="contactsunitId" value="">
							<div class="inputbox container-fluid clearfix">
								<!-- <div class="raidMo">
									<div class="tip">
									    <p class="tip_p">已过账</p>
								  </div>
									<div class="rightMo">
										<span class="ggRAD">
									  		<input type="radio" checked="checked" name="radioBillsTwo" value="0"/><span>正式单据</span>
							        		<input type="radio" name="radioBillsTwo" value="1"/><span>草稿单据</span>
							      		</span>
									</div>
								</div> -->
								<div class="row">
									<div class="form-group Zpercent ">
										<span class="box_text2">单据编号：</span><div class="col-sm-8">
								<div class="input-group"><input type="text" class="form-control" id="billsCode2" name="billsCode" disabled  /></div></div>
									</div>
									<div class="form-group Zpercent">
										<span class="box_text2">部门名称：</span>
										<div class="col-sm-8">
								<div class="input-group">
								      <input type="text" name="sectionName" id="sectionName2" class="form-control depSearch" onkeydown="departmentDel('sectionName2')">
								      <span class="input-group-btn">
								        <button class="btn btn-default" type="button"  onclick="yesAuthority('sectionName2')">
								        	<span class="glyphicon glyphicon-plus section"></span>
								        </button>
								      </span>
								    </div></div>
									</div>
									<div class="form-group Zpercent">
										<span class="box_text2">往来单位：</span>
										<div class="col-sm-8">
								<div class="input-group">
								      <input type="text" class="form-control unitSearch" id="contactName2" name="contactName" disabled="disabled" value="请选择部门">
								      <span class="input-group-btn">
								        <button class="btn btn-default" type="button" onclick="selectContactUnitReferenceOpen('contactName2')">
								        	<span class="glyphicon glyphicon-plus" ></span>
								        </button>
								      </span>
								    </div></div>
									</div>
									
								</div>
								<div class="row">
									<div class="form-group Zpercent">
										<span for="datetimepickerStart" class="box_text2">单据日期：</span>
										<div class="col-sm-8">
								<div class="input-group"><input type="text" class="form-control" id="billsDateString2" name="billsDateString" placeholder="年-月-日"  readonly/></div></div>
									</div>
									<div class="form-group Zpercent">
										<span class="box_text2">经手人：</span>
										<div class="col-sm-8">
								<div class="input-group">
										<select class="managers" id="managersUid2" name="managersUid" disabled="disabled">
											<option value="" selected>请选择部门</option>
					        			</select></div></div>
									</div>
									<div class="form-group Zpercent">
										<span class="box_text2">单备注：</span><div class="col-sm-8">
								<div class="input-group"><input type="text" id="remark2" name="remark" value="" placeholder="" class="form-control" /></div></div>
									</div>
								</div>
							</div>
							<div class="rightMap">
							    <img id="billsStautsImg2"/>
						    </div>
						    
						 </form>
						 </div>
					</div>
					<!--------------查询条件结束---------------->
						<div class="tablebox retailDetailTable">
							<button class="font-table import" onclick="importBorrowLend()">引入借入未归回单据</button>
							<div class="grid-wrap" style="margin-top:10px;overflow:auto;">
								<table id="jqGrid_borrow" class="zxsaastable"></table>
								<!-- <div id="jqGridPager_loan"></div> -->
							</div>
						</div>
					</div>
				</div>
		</div>
		</div>
			<!-------------------------------------表格结束----------------------------------------->
		<!-------------------------------------主页面结束----------------------------------------->
		<!--过滤弹出窗-->
		<!-- 模态框（Modal） -->
		<div class="modal fade" id="filtrationChoose" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<form id="filterForm">
			<div class="modal-dialog modalNine">
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
						<div class="showTab">
							<div class="inputModal">
									<input type="hidden" name="pageNumber" id="pageNumber"/>
									<input type="hidden" name="pageSize" id="pageSize" value="1"/>
									<input type="hidden" name="statusBills" id="statusBills">
									<input type="hidden" name="selSectionIdStr" id="selSectionIdStr">
									<input type="hidden" name="selGoodsIdStr" id="selGoodsIdStr">
									<input type="hidden" name="selBillsTypeStr" id="selBillsTypeStr">
									<input type="hidden" name="selContactsunitIdStr" id="selContactsunitIdStr">
									<div class="inputTab">
										<span>开始日期：</span>
										<input type="text" name="startTimeStr" class="filterData" placeholder="年-月-日" value="" id="startTimeStr" onblur='checkInput.checkTime(this,"#startTimeStr","#endTimeStr");' readonly/>
									</div>
									<div class="inputTab">
										<span>部门名称：</span>
										<span><input type="text" id="filterSectionName" class="depFilter filterData" onkeydown="departmentDel('filterSectionName')"/></span>
				  			            <span class="colspan depFilter glyphicon glyphicon-plus" onclick="yesAuthority('filterSectionName')"></span>
									</div>
									<div class="inputTab">
										<span>单据编号：</span>
										<input type="text" name="selBillsCode" id="selBillsCode" class="filterData" />
									</div>
									<div class="inputTab">
										<span>结束日期：</span>
										<input type="text" name="endTimeStr" class="filterData" placeholder="年-月-日" value="" id="endTimeStr" onblur='checkInput.checkTime(this,"#startTimeStr","#endTimeStr");' readonly/>
									</div>
									<div class="inputTab">
										<span>仓库名称：</span>
										<span><select id="selStorageIdStr" name="selStorageIdStr">
												<option value="" selected>请选择部门</option>
												</select>
										</span>
									</div>
									<div class="inputTab">
										<span style="margin-left:-8px;">往来单位：</span>
										<span><input type="text" id="contactsunitName"/></span>
				  			          	<span class="colspan glyphicon glyphicon-plus" onclick="selectContactUnitReferenceOpen('select')"></span>
									</div>
									<div class="inputTab">
										<span>单&nbsp;&nbsp;备&nbsp;注：</span>
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
		
		
		<!-- 引入在库串号模态框（Modal） -->
		<div class="modal fade" id="inStorageModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
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
					  	<div class="inputModal clearfix" style="margin-bottom:10px;">
					  		<div class="inputTab">
					  			<span for="">商品名称：</span>
								<span><input type="text" class="goodsMsg" disabled/></span>
					  		</div>
					  		<div class="inputTab">
					  			<label disabled><input type="checkbox" style="vertical-align:middle;" checked class='fuSwitch' disabled> 启用辅助串号</label>
					  			<!-- <button type="button" class="btn btn-w btn-info addBill" data-dismiss="modal">串号引入</button> -->
					  		</div><br />
					  		<div class="inputTab">
					  			<label><span style="visibility:hidden;">哈</span>&nbsp;主串号录入:&nbsp;</label><input type="text" id="mainImei" class='mainBill'/> <br />
					  			<label class='fuHi'>辅助串号录入:&nbsp;</label><input type="text" id="nextImei" class='fuHi secondBill' />
					  		</div>
					  		
					  	</div>
						<div class="clearfix">
								<span>入库数</span><span class='seletImNumber'></span>
							  <div class="jqGrid_wrap">
								<table id="jqGrid_tranNumber" class="zxsaastable"></table> 
		    				  </div>
						 </div>
						
						<div class="modal-footer">
							<button type="button" class="btn btn-info numSave" data-dismiss="modal">保存后关闭</button>
							<button type="button" class="btn btn-warning" data-dismiss="modal">仅关闭</button>
						</div>
					</div><!-- /.modal-content -->
				</div><!-- /.modal -->
			</div><!--引入在库串号模态框（Modal）结束 -->
		</div>
		
		
		
		<!--借出还回      引入借出未还回单据-->
		<!-- 模态框（Modal） -->
		<div class="modal fade" id="importChoose" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog modalYQ">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							引入借入未归还单据
						</h4>
					</div>
					<div class="modal-body" id="model-body">
						<div class="showTab">
							<div class="current change">
								<div class="font-table font-table-xia">
									<div class="font-table-val">
										<span>往来单位：</span>
									    <span id="showContactUnit"></span>
									</div>
									<div class="tip-1">
									    <p class="tip_p-1">已过账</p>
								  </div>
								</div>
								<div class="jqGrid_wrap">
									<table id="jqGrid_import" class="zxsaastable"></table> 
			    					<div id="gridpager_import"></div>
		    					</div>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button class="btn btn-info"  onclick="onclickImport()">保存</button>
						<button type="button" class="btn btn-warning" data-dismiss="modal">取消</button>
					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>
		
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
						<div class="jqGrid_wrap Detail" style="max-height:280px;overflow-x:auto;">
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
		
		<!-- 仓库名称模态框（Modal） -->
		<div class="modal fade" id="ckmcChoose" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog modalSmall">
				<div class="modal-content ">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							仓库名称
						</h4>
					</div>
				    <div class="modal-body  tree-body">										
						<ul id="ckmcDataTree" class="ztree"></ul>																
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-warning" data-dismiss="modal">取消</button>
					</div>
			     </div>
			</div><!-- /.modal-content -->
		</div><!-- 仓库名称模态框（Modal）结束 -->
		
		<!--过滤条件     部门选择弹出窗-->
		<!-- 模态框（Modal） -->
		<div class="modal fade" id="depFilter" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog modalSmall">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							部门选择
						</h4>
					</div>
					<div class="modal-body" id="model-body">
						<div class="showTab">
							<div class="current change">
								<form class="">
									<div class="tree_area">
											<input type="hidden" class="add_tree_ids" />
											<ul id="filterModelTree" class="ztree"></ul>
									</div>
								</form>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-info" onclick="saveAndClose();" data-dismiss="modal">保存后关闭</button>
						<button type="button" class="btn btn-warning" data-dismiss="modal">仅关闭</button>
					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>
		
		<!--过滤条件      仓库选择弹出窗-->
		<!-- 模态框（Modal） -->
		<div class="modal fade" id="storageFilter" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog modalYQ">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							仓库名称选择
						</h4>
					</div>
					 <div class="modal-body">
						<div class="tranLeft" style="overflow: auto;">
							<div class="left-s">部门过滤</div>
							<div class="left-tree">
								<input type="hidden"  />
								<ul id="storageDataTree" class="ztree"></ul>
							</div>							
						</div>
						<div class="right-body">
							<div class="">仓库列表</div>
							<div class="jqGrid_wrap">
								<input type="text" />
								<table id="jqGrid_storage" class="zxsaastable"></table> 
			    				<div id="gridpager_storage"></div>
		    				</div>
		    			</div>
				   </div>
					<div class="modal-footer">
						<button type="button" class="btn btn-info storageSave" data-dismiss="modal">保存后关闭</button>
						<button type="button" class="btn btn-warning" data-dismiss="modal">仅关闭</button>
					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>
		
		<!--过滤条件      往来单位选择弹出窗-->
		<!-- 模态框（Modal） -->
		<div class="modal fade" id="unitFilter" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog modalNine">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							往来单位选择
						</h4>
					</div>
					<div class="modal-body">
						<div class="tranLeft" style="overflow: auto;">
							<div class="left-tree">
								<input type="hidden"  />
								<ul id="unitDataTree" class="ztree"></ul>
							</div>							
						</div>
						<div class="right-body">
							<div class="jqGrid_wrap">
								<input type="text" />
								<table id="jqGrid_unit" class="zxsaastable"></table> 
			    				<div id="gridpager_unit"></div>
		    				</div>
		    			</div>
				   </div>
					<div class="modal-footer">
						<button type="button" class="btn btn-info unitSave" data-dismiss="modal">保存后关闭</button>
						<button type="button" class="btn btn-warning" data-dismiss="modal">仅关闭</button>
					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>
		
		<!--过滤条件      商品名称选择弹出窗-->
		<!-- 模态框（Modal） -->
		<div class="modal fade" id="goodsFilter" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog modalNine">
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
						<div class="tranLeft" style="overflow: auto;">
							<div class="left-tree">
								<input type="hidden"  />
								<ul id="spmcDataTree2" class="ztree"></ul>
							</div>							
						</div>
						<div class="right-body">
							<div class="jqGrid_wrap">
								<input type="text" />
								<table id="jqGrid_tranSpmcCheck" class="zxsaastable"></table> 
			    				<div id="gridpager_tranSpmcCheck"></div>
		    				</div>
		    			</div>
				   </div>
					<div class="modal-footer">
						<button type="button" class="btn btn-info goodsSave" data-dismiss="modal">保存后关闭</button>
						<button type="button" class="btn btn-warning" data-dismiss="modal">仅关闭</button>
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
						<input type="text" id="hcTime" name="hcTime" placeholder="年-月-日"  onblur='checkInput.checkTime(this,"#startTimeStr","#endTimeStr");'  readonly/>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">关闭
						</button>
						<button type="button" class="btn btn-primary" onclick="borrowGoodsGzHc(2)">
							确定
						</button>
					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>
		
		<!-- 往来单位引用 -->
		<div class="modal fade" id="contactUnitReferenceModal" tabindex="-1" role="dialog"  aria-hidden="true">
		   <div class="modal-dialog" style="width:930px;">
		      <div class="modal-content">
			     <div class="modal-header">
		            <button type="button" class="close"  data-dismiss="modal" aria-hidden="true"> &times;</button>
		            <h4 class="modal-title">
		                                  往来单位引用
		            </h4>
		         </div>
		         <div class="modal-body">
					<iframe name="contactUnitReferenceFrame" class="referenceFrame" frameborder="0" style="width: 100%;height:400px;" src="${basePath}/TcontactUnit/reference"></iframe>
		         </div>
			  </div>
			</div>
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
		
		<!-------------------------------------底部开始----------------------------------------->
		<div class="footer">
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
				<span class="box_text2">过账人：</span><span class="box_input"><input type="text" id="footerPost" class="input150" disabled  /></span>
			</div>
			<div class="Zpercent2 ">
				<span class="box_text2">红冲人：</span><span class="box_input"><input type="text" id="footerBack" class="input150" disabled  /></span>
			</div> 
		</div>
		<!-------------------------------------底部结束----------------------------------------->
	</body>
	<script src="${basePath}/js/jquery-1.12.4.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/base.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/jquery-form.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/bootstrap.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/jquery.jqGrid.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/jquery.datetimepicker.full.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/grid.locale-cn.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/commonjs/xm.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/zxsaas_plus.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/cw/jquery.ztree.all-3.5.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/erp/storage/MultiSelectDropList.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/erp/storage/borrowManage.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/erp/storage/borrowManageCC.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/erp/storage/model-storage.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/erp/storage/publicModal.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/erp/storage/billsImport.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/erp/storage/department.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<link rel="stylesheet" type="text/css" href="${basePath}/js/cw/bootstrap/css/bootstrapValidator.css?v=${version}" />
	<link rel="stylesheet" type="text/css" href="${basePath}/css/Storage/css.css?v=${version}"/>
	<script src="${basePath}/js/bootstrapValidator.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/cw/bootstrap/js/validator-lynnjer.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<!-- 菜单权限验证 -->
	<script type="text/javascript" src="${basePath}/js/erp/authority/menuValidation.js?v=${version}"></script>
	<script type="text/javascript">
		checkRole('#ibillsHeadBorrow');
		checkRole('#ibillsHeadBorrowBack');
		$('.btnHundred button.btn,.slideThree').click(function(){
			if($(this).html() != '保存'){
				//console.log('hahhahah');
				$("#ibillsHeadBorrow").data('bootstrapValidator').resetForm();
				$("#ibillsHeadBorrowBack").data('bootstrapValidator').resetForm();
			}
		});
		var basePath = "${basePath}";
		var storageObj = null;
	</script>
</html>


