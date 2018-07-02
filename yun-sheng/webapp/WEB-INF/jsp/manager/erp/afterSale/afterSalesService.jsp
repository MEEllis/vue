<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<jsp:include  page="../../inventoryInclude/head.jsp"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/pagecss/treepage.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/afterSale/afterSalesService.css?v=${version}" />
		<title>售后处理</title>
		
		<script>
			var groupId = ${groupId};
		</script>
		
	</head>

	<body >
			<!-------------------------------------表格开始----------------------------------------->
			<div class="bodyModel">
				<!-------------------------------------主页面开始----------------------------------------->
			<div id="AUTH" data-code="SHCLD" class="btn-group btnHundred" role="group" >
				<button type="button" class="btn hidde1 upDown toAfterSale" data-eventname="printbtn" onclick="firstBill()">首单</button>
			  	<button type="button" class="btn hidde1 upDownYF1 upDown toAfterSale" data-eventname="printbtn" onclick="prevBill()">上一单</button>
			   	<button type="button" class="btn hidde2 upDownYF2 upDown toAfterSale" data-eventname="printbtn" onclick="nextBill()">下一单</button>
			  	<button type="button" class="btn hidde2 upDownYF3 upDown toAfterSale" data-eventname="printbtn" onclick="lastBill()">末单</button>
			  	<button type="button" class="btn demandYF toAfterSale" data-eventname="printbtn" data-toggle="modal" data-target="#queryChoose">查询</button>
			  	<button type="button" class="btn hiddeXIN toAfterSale "   data-eventname="printbtn">新增</button> 
			  	<button type="button" class="btn afterSaleReturn"   data-eventname="printbtn">确认返回</button> 
			</div>
			<!-------------------------------------搜索条件开始----------------------------------------->
			<!-------------------------------------搜索条件结束----------------------------------------->	
							
					<!----------------主表开始---------------------->
				<!----------------切换表格---------------------->
				<div class="footYF">
					<ul id="myTab" class="nav nav-tabs">
						<li class="active">
							<a href="#YFtab1" data-toggle="tab" class="changeYF1">转至售后</a>
						</li>
						<li>
							<a href="#YFtab2" data-toggle="tab" class="changeYF2">售后返回</a>
						</li>
					</ul>
					<div id="myTabContent" class="tab-content">
						<div class="tab-pane fade in active" id="YFtab1">
							
							<div class="well">
								<form id="inquire_option">
									<div class="inputbox container-fluid clearfix">
										<div class="row">
											<div class="Zpercent">
												<span class="box_text">业务单据号：</span>
												<span class="box_input">
													<input type="text" class="form-control billsNo" disabled/>
												</span>
											</div>
											<div class="Zpercent">
												<span class="box_text">售后部门：</span>
												<span class="box_input">
													<input type="text" class="form-control aftersaleSectionName" disabled/>
												</span>
											</div>
											<div class="Zpercent">
												<span class="box_text">经手人：</span>
												<span class="box_input">
													<input type="text" class="form-control managerName" disabled/>
												</span>
											</div>
											<div class="Zpercent">
												<span class="box_text">出库部门：</span>
												<span class="box_input">
													<input type="text" class="form-control outstorSectionName" disabled/>
												</span>
											</div>
										</div>
										
									</div>
								 </form>
							 </div>
							<div class="jqGrid_wrap overflAuto widthYF1">
								<table id="dataGrid" class="zxsaastable"></table> 
			    				<div id="jqGridPager_YFtab1"></div>
							</div>
						</div>
						<div class="tab-pane fade" id="YFtab2">
							
							<!---------------查询条件开始---------------------------->
							<form id="inquire_option">
				 			 	<div class="well">
								
									<div class="inputbox container-fluid clearfix">
										<div class="row">
											<div class="Zpercent">
												<span class="box_text">快速接收：</span>
												<span class="box_input">
													<input type="text" class="form-control fasttips quickSHOU2" onblur="fasttips(value)"  placeholder="录入新或者旧串号"/>
												</span>
											</div>
											<div class="Zpercent">
												<span class="box_text"><em>*</em>送修部门：</span>
												<div class="input-group">
										          <input type="text"  class="form-control" name=sxSectionName" id="sxSectionName"  readonly="readonly" >
										          <input type="hidden"  name="contactsunitId" id="contactsunitId" >
											      <span class="input-group-btn">
											        <button class="btn btn-default depChoose" type="button" data-toggle="modal" onclick="showSectionModal(this)" id="sxSection">
											        	<span class="glyphicon glyphicon-plus"></span>
											        </button>
											      </span>
										    	</div>
											</div>
											<div class="Zpercent">
												<span class="box_text"><em>*</em>入库仓库：</span>
												<div class="input-group">
										          <select class="form-control" name="rkSectionName" id="rkSectionName" style="width:100px;"></select>
										         	
										    	</div>
											</div>
										</div>
									</div>
								
							 	</div>
							  </form> 
							<div class="jqGrid_wrap overflAuto widthYF2">
								<table id="searchDataGrid" class="zxsaastable"></table> 
			    				<div id="jqGridPager_YFtab2"></div>
							</div>
						</div>
					</div>
				</div>
					<!--选项卡-->
			</div>
			<!-------------------------------------表格结束----------------------------------------->
			<!-- 商品名称模态框（Modal） -->
		<div class="modal fade" id="spmcChoose" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog modalNine">
				<div class="modal-content ">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							商品名称
						</h4>
					</div>
				  <div class="modal-body">
				  
					<div class="tranLeft" style="overflow: auto;">
						<div class="left-tree">
							<input type="hidden" class="" />
							<ul id="spmcDataTree" class="ztree"></ul>
						</div>							
					</div>
					<div class="right-body">
						<div class="jqGrid_wrap">
							<input type="text" class="quickGoods"/>
							<input type="hidden" class="goodsIdY"/>
							<table id="jqGrid_tranSpmc" class="zxsaastable"></table> 
	    					<div id="gridpager_tran"></div>
    					</div>
	    			</div>
					
				   </div>
					<div class="modal-footer">
						<!-- <a href="" class="btn btn-w btn-info" title="跳转到新增商品名称与权限挂钩" >新增</a> -->
						<button type="button" class="btn btn-warning" data-dismiss="modal">取消</button>
					</div>
					
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div><!-- 商品名称模态框（Modal）结束 -->
		<!-------------------------------------主页面结束----------------------------------------->
		<!-- 查询模态框（Modal） -->
		<div class="modal fade" id="queryChoose" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog modal990">
				<div class="modal-content ">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							查询条件
						</h4>
					</div>
				  <div class="modal-body">
					  	 <div class="form-group">
								<span class="span1">查询日期：</span>
								<input type="text" class="input1" id="createDateBegin" style="text-align:center;">
								<span class="glyphicon glyphicon-minus lineYF"></span>
								<input type="text" class="input1" id="createDateEnd" style="text-align:center;">
								
							</div>
					  	 <div class="form-group">
								<span class="span1">单据号：</span>
								<input type="text" class="input1 billsNoBegin">
								<span class="glyphicon glyphicon-minus lineYF"></span>
								<input type="text" class="input1 billsNoEnd" >
							</div>
				   </div>
					<div class="modal-footer">
						<button class="btn btn-w btn-info cxQueryYF"  data-dismiss="modal">确定</button>
						<button type="button" class="btn btn-warning" data-dismiss="modal">取消</button>
					</div>
					
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div><!-- 查询售后模态框（Modal）结束 -->
		
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
	<script src="${basePath}/js/erp/afterSale/searchAfterSaleCard.js?v=${version}" type="text/javascript" charset="utf-8"></script>
</html>


