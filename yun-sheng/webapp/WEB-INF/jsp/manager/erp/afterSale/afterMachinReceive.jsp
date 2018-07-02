<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<jsp:include  page="../../inventoryInclude/head.jsp"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/pagecss/treepage.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/afterSale/afterMachinReceive.css?v=${version}" />
		<title>售后机接收</title>
	</head>

	<body >

			<!-------------------------------------表格开始----------------------------------------->
			<div class="bodyModel">
				<!-------------------------------------主页面开始----------------------------------------->
				<div id="AUTH" data-code="SHJJS" class="btn-group btnHundred" role="group" >
				  <button type="button" class="btn saveData" data-eventname="printbtn" onclick="sureReceive()">确认接收</button>
				  <button type="button" class="btn emptyYF" data-eventname="printbtn" onclick="emptyAll()">清空</button>
				  <button type="button" class="btn importYF" data-eventname="printbtn" data-toggle="modal" onclick="importDataList()">引入售后处理单</button>
				</div>
			<!-------------------------------------搜索条件开始----------------------------------------->
			<!-------------------------------------搜索条件结束----------------------------------------->	
				<div id="myTabContent" class="tab-content">
					<div class="tab-pane fade in active" id="scatteredModel">
									<!---------------查询条件开始---------------------------->
			 			 <div class="well">
							<form id="reciveAfterSale">
								<div class="inputbox container-fluid clearfix" style="min-width:1130px;">
									<div class="row">
										
										<div class="Zpercent">
											<span class="box_text">快速接收：</span>
											<span class="box_input"><input type="text" class="form-control fasttips" onblur="fasttips(value)"/></span>
										</div>
										<div class="Zpercent form-group">
											<span class="box_text">维修部门：</span>
											<div class="input-group">
									          <input type="text"  class="form-control" name="ckSectionName" id="ckSectionName"  readonly="readonly" >
									          <input type="hidden"  name="contactsunitId" id="contactsunitId" >
										      <span class="input-group-btn">
										        <button class="btn btn-default depChoose" type="button" data-toggle="modal" onclick="showSectionModal(this)" id="ckSection">
										        	<span class="glyphicon glyphicon-plus"></span>
										        </button>
										      </span>
									    	</div>
										</div>
										<div class="Zpercent form-group">
											<span class="box_text">入库仓库：</span>
											<div class="input-group">
									          <select class="form-control" name="afterSaleSectionName" id="rkSectionName" ></select>
										     
									    	</div>
										</div>
									</div>
								</div>
							</form> 
						 </div>
					<!----------------查询条件结束---------------------->
					<div class="tablebox retailDetailTable">
							<div class="grid-wrap overflAuto" style="margin-top:10px">
								<table id="dataGrid" class="zxsaastable"></table>
								<div id="jqGridPager_afterMachinReceive"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-------------------------------------表格结束----------------------------------------->
		<!-------------------------------------主页面结束----------------------------------------->
		
		<!-- 引入售后模态框（Modal） -->
		<div class="modal fade" id="importChoose" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog modal990">
				<div class="modal-content ">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							引入售后
						</h4>
					</div>
				  <div class="modal-body">
						<!-- <span class="TCkuai">快速过滤<input type="text"/></span>  -->
					  <div class="jqGrid_wrap overflAuto">
						<table id="importDataGrid" class="zxsaastable"></table> 
	    				<div id="jqGridpager_import"></div>
    				  </div>
				   </div>
					<div class="modal-footer">
						<button type="button" class="btn btn-warning" onclick="importList()">保存</button>
						<button type="button" class="btn btn-warning" data-dismiss="modal">仅关闭</button>
					</div>
					
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div><!-- 引入售后模态框（Modal）结束 -->
		
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
		
		<!-------------------------------------底部开始----------------------------------------->
		<!-------------------------------------底部结束----------------------------------------->
	</body>
	<script src="${basePath}/js/cw/bootstrap/js/bootstrap-dialog.min.js?v=${version}"  type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/commonjs/xr.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/commonjs/eidit-grid-test.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/erp/afterSale/receiveAfterSaleMachine.js?v=${version}" type="text/javascript" charset="utf-8"></script>
</html>



