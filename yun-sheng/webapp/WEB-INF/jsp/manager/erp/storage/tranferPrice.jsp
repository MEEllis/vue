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
		<link rel="stylesheet" type="text/css" href="${basePath}/css/Storage/transferPrice.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/erp/storage/managers.css?v=${version}"/>
		
		<title>同价调拨发货单</title>
		 
	</head>
	<body>
 		<div class="well">
 		<div id="AUTH" data-code="TJDBFHD" class="btn-group btnHundred" role="group" >
 			  <button type="button" class="btn" onclick="lastForm()">首单</button>
			  <button type="button" class="btn" onclick="upForm()">上一单</button>
			  <button type="button" class="btn" onclick="downForm()">下一单</button>
			  <button type="button" class="btn" onclick="firstForm()">末单</button>
			  <button type="button" class="btn" onclick="onclickNewBills()">新增</button>
			  <button type="button" class="btn" onclick="onClickExecute()">保存</button>	
			  <button type="button" class="btn" onclick="onClickDelete()">删除</button>	
			  <button type="button" class="btn" onclick="transferPriceGzHc(1)">发货</button>
			  <button type="button" class="btn toVoid" onclick="hcClick()">作废</button>		  			  			  			  
			  <button type="button" class="btn" data-toggle="modal" data-target="#printModal">打印</button>
			  <!-- 
			  <button type="button" class="btn" onclick="billsImport()">单据引入</button>
			   -->
			  <button type="button" class="btn" data-toggle="modal" data-target="#filtrationChoose" data-eventname="printbtn">过滤</button>
			  <%--<button type="button" class="btn" onclick="onclickRefresh()">刷新</button>
			  <button type="button" class="btn" onclick="copyBills()">复制</button>
			  --%><div class="slideThree">
				   <input type="checkbox" value="0" id="slideThree" name="check" checked/>
				   <label for="slideThree"></label>
			  </div>		  			  			  			  
		</div>
			<form id="ibillsHead">
				<input type="hidden" id="id" name="id" value="">
				<input type="hidden" id="inDepartmentId" name="inDepartmentId" value="">
				<input type="hidden" id="outDepartmentId" name="outDepartmentId" value="">
				<div class="inputbox container-fluid clearfix">
					<div class="row">
						<div class="form-group Zpercent ">
							<span class="box_text2">单据编号：</span><div class="col-sm-8">
								<div class="input-group"><input type="text" class="form-control2" id="billsCode" name="billsCode" disabled  /></div></div>
						</div>
						<div class="form-group Zpercent">
							<span class="box_text2">调出部门：</span>
							<div class="col-sm-8">
								<div class="input-group">
					             <input type="text" value="" class="form-control2" id="outDepartmentName" name="outDepartmentName"  onkeydown="departmentDel('outDepartmentName')">
							      <span class="input-group-btn">
							        <button class="btn btn-default" type="button" onclick="yesAuthority('outDepartmentName')">
							        	<span class="glyphicon glyphicon-plus"></span>
							        </button>
							      </span>
					         </div></div>
						</div>

						<div class="form-group Zpercent">
							<span for="datetimepickerStart" class="box_text2">单据日期：</span><div class="col-sm-8">
								<div class="input-group"><input type="text" class="form-control2" id="billsDateString" name="billsDateString" placeholder="年-月-日"  /></div></div>
						</div>
						
					</div>
					<div class="row">
						<div class="form-group Zpercent">
							<span class="box_text2">经手人：</span>
							<div class="col-sm-8">
								<div class="input-group">
							        <select class="managers" id="managersUid" name="managersUid" disabled="disabled">
							        	<option value="" selected>请选择部门</option>
							        </select>
							    </div>
							</div>
						</div>

						<div class="form-group Zpercent">
							<span class="box_text2">调入部门：</span>
							<div class="col-sm-8">
								<div class="input-group">
					             <input type="text" value="" class="form-control2" id="inDepartmentName" name="inDepartmentName" onkeydown="departmentDel('inDepartmentName')">
							      <span class="input-group-btn">
							        <button class="btn btn-default" type="button" onclick="noAuthority('inDepartmentName')">
							        	<span class="glyphicon glyphicon-plus"></span>
							        </button>
							      </span>
					         </div></div>
						</div>
						<div class="form-group Zpercent">
							<span class="box_text2">单备注：</span><div class="col-sm-8">
								<div class="input-group"><input type="text" name="remark" id="remark" value="" placeholder="" class="form-control2" /></div></div>
						</div>
					</div>
				</div>
				<div class="rightMap">
					<img id="billsStautsImg" src="${basePath}/images/guozhang.png" />
				</div>
			 </form>
		</div>
		<!--</div>-->
		
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
			<div class="modal-dialog modalNine">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							过滤条件
						</h4>
					</div>
					<div class="modal-body" id="model-body">
						<div class="showTab">
							<div class="inputModal">
								<form id="filterForm">
									<input type="hidden" name="pageNumber" id="pageNumber" value="1"/>
									<input type="hidden" name="pageSize" id="pageSize" value="1"/>
									<input type="hidden" name="selGoodsIdStr" id="selGoodsIdStr">
									<input type="hidden" name="selOutDepartmentIdStr" id="selOutDepartmentIdStr">
									<input type="hidden" name="selInDepartmentIdStr" id="selInDepartmentIdStr">
									<input type="hidden" name="statusBills" id="statusBills">
									<input type="hidden" name="selBillsStatuStr" id="selBillsStatuStr">
									<input type="hidden" name="selBillsTypeStr" id="selBillsTypeStr">
									<div class="inputTab">
										<span>开始日期：</span>
										<input type="text" name="startTimeStr" class="filterData" placeholder="年-月-日" value="" id="startTimeStr" onblur='checkInput.checkTime(this,"#startTimeStr","#endTimeStr");'  />
									</div>
									<div class="inputTab">
										<span>调出部门：</span>
										<span><input type="text" id="filterOutName" onkeydown="departmentDel('filterOutName')"/><span class="colspan loadspan glyphicon glyphicon-plus depFilter" onclick="yesAuthority('filterOutName')"></span></span>
				  			     		
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
										<span>调入部门：</span>
										<span><input type="text" id="filterInName" onkeydown="departmentDel('filterInName')"/><span class="colspan loadspan glyphicon glyphicon-plus depFilter" onclick="noAuthority('filterInName')"></span></span>
				  						
									</div>
									<div class="inputTab">
										<span style="width:70px;display:inline-block;padding-left:2px;letter-spacing:3px;">单备注：</span>
											<input type="text" name="selRemark" id="selRemark" class="filterData" />
									</div>
									<div class="inputTab">
										<span>商品名称：</span>
										<span><input type="text" id="selGoodsName"/><span class="goodsName glyphicon glyphicon-plus colspan" onclick="showGoodsImport()"></span></span>
				  						
									</div>
									<div class="inputTab">
										<span>串<span style="visibility:hidden;">串号</span>号：</span>
										<input type="text" name="selImei" class="filterData" id="selImei" disabled="disabled"/>
									</div>
									<div class="inputTab">
										<span style="margin-left: 6px;">单据状态：</span>
										<div class='multi_select multi_select_audit selctRight tuoli'></div>
									</div>
								</form>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-success" onclick="filterSelect()">查询</button>
						<button type="button" class="btn btn-info" data-dismiss="modal">取消</button>
						<button type="button" class="btn btn-warning reset" onclick="resetFilter()">重置</button>
					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>
		
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
		
		<!-- 经手人模态框（Modal） -->
		<div class="modal fade" id="myPer" tabindex="-1" role="dialog" aria-labelledby="myPer" aria-hidden="true">
			<div class="modal-dialog modalYQ">
				<div class="modal-content ">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							经手人
						</h4>
					</div>
					
					<div class="modal-body" style="overflow: auto;">
						<div class="navper">
							<input type="text" placeholder="支持按编码、名称、助记码模糊查询"/> 
							<span>职位名称:<select><option>营业员</option><option>业务员</option><option>仓管</option><option>会计</option></select></span>
						</div>
						
						<div class="jqGrid_wrap">
							<table id="jqGrid_myPer" class="zxsaastable"></table> 
	    				<div id="jqGridmyPer"></div>
					</div>
					</div>
					
					<div class="modal-footer">
						<a href="" class="btn btn-w btn-info" title="跳转到员工新增窗口" >新增</a>
						<button type="button" class="btn btn-warning" data-dismiss="modal">取消</button>
					</div>
					
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div><!-- 经手人模态框（Modal）结束 -->
		
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
						<button type="button" class="btn btn-warning" data-dismiss="modal">取消</button>
					</div>
					
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div><!-- 调入部门名称模态框（Modal）结束 -->
		
		<!--输入模态窗开始-->
		<div class="modal fade" id="inputModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog model-dialog3 modalSmall">
			    <div class="modal-content">
			      
			      <div class="modal-body">
			      <div class="input-group col-xs-12">
			      	<input type="text" class="form-control" placeholder="快速搜索">
			      </div>
			        <ul id="treeLeft" class="ztree"></ul>
			      </div>
			      
			    </div>
  			</div>
		</div><!--输入模态窗结束-->
		
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
				    <div class="modal-body  tree-body" align="right">		
						<button type="button" class="btn btn-warning" data-dismiss="modal">取消</button>		
						<ul id="ckmcDataTree" class="ztree"></ul>						
					</div>
			     </div>
			</div><!-- /.modal-content -->
		</div><!-- 仓库名称模态框（Modal）结束 -->
		
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
		
		<!-- 红冲模态框（Modal） -->
		<div class="modal fade" id="hcModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							单据作废
						</h4>
					</div>
					<div class="modal-body">
						红冲时间：
						<input type="text" id="hcTime" name="hcTime" placeholder="年-月-日"  onblur='checkInput.checkTime(this,"#startTimeStr","#endTimeStr");'  />
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">关闭
						</button>
						<button type="button" class="btn btn-primary" onclick="transferPriceGzHc(2)">
							确定
						</button>
					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
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
							<button type="button" class="btn" onclick="rightAll()"><span class="leftJU glyphicon glyphicon-fast-forward"></span></button>
							<button type="button" class="btn" onclick="rightSome()"><span class="leftJU glyphicon glyphicon-chevron-right"></span></button>
							<button type="button" class="btn" onclick="leftAll()"><span class="leftJU glyphicon glyphicon-fast-backward"></span></button>
							<button type="button" class="btn" onclick="leftSome()"><span class="leftJU glyphicon glyphicon-chevron-left"></span></button>
							
							<!--<div class="leftJU glyphicon glyphicon-fast-forward" onclick="rightAll()"></div>
							<div class="leftJU glyphicon glyphicon-chevron-right" onclick="rightSome()"></div>
							<div class="leftJU glyphicon glyphicon-fast-backward" onclick="leftAll()"></div>
							<div class="leftJU glyphicon glyphicon-chevron-left" onclick="leftSome()"></div>
					     --></div>
					</div>
					
					<div class="cent2-body clearfix">
						<span>已选择</span><span class="seletImNumber">0</span>
							<div class="jqGrid_wrap">
								<table id="jqGrid_tranNumber2" class="zxsaastable"></table> 
		    					<div id="gridpager_tranNumber2"></div>
	    					</div>
	    					<div class="modal-footer">
						<button type="button" class="btn btn-w btn-info" onclick="delLeftImei()">删除串号</button>
						<!-- <button type="button" class="btn btn-warning">文本导入</button> -->
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
				     <span class="box_text2">出库串号：</span>
				     <span class="box_input input-group">
				     	<input type="text" id="otherOutstroNumIdStr" value="" name="otherOutstroNumIdStr" onpropertychange="imeiMate();" oninput="imeiMate();" onkeydown="EnterPressOtherImei()"  placeholder="串号录入,可右匹配" class="form-control2 input-none font100" />
				     	 <div id="ss" class="none-cx" style="display: none;">
				     	 	<ul id="otherOutUl">
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
	<script src="${basePath}/js/zxsaas_plus.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/cw/jquery.ztree.all-3.5.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/erp/storage/transferPrice.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/erp/storage/transferPriceCC.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/erp/storage/model-storage.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/erp/storage/publicModal.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/erp/storage/outImei.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/erp/storage/onlyImeiManage.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/erp/storage/MultiSelectDropList.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/erp/storage/billsImport.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/erp/storage/pageBills.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/erp/storage/department.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	
	<script src="${basePath}/js/erp/storage/storageCheck.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<link rel="stylesheet" type="text/css" href="${basePath}/js/cw/bootstrap/css/bootstrapValidator.css?v=${version}" />
	<link rel="stylesheet" type="text/css" href="${basePath}/css/Storage/css.css?v=${version}"/>
	<script src="${basePath}/js/bootstrapValidator.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/cw/bootstrap/js/validator-lynnjer.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<!-- 菜单权限验证 -->
	<script type="text/javascript" src="${basePath}/js/erp/authority/menuValidation.js?v=${version}"></script>
	<script type="text/javascript">
		$(function(){
			checkRole('#ibillsHead');
			//checkRole('#filterSearchForm');过滤查询 暂时不做
		})
		var basePath = "${basePath}";
		var storageObj = null;
	</script>
</html>