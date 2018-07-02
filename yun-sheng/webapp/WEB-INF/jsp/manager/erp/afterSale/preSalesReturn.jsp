<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<jsp:include  page="../../inventoryInclude/head.jsp"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/pagecss/treepage.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/afterSale/preSalesReturn.css?v=${version}" />
		
		<title>售前机返回</title>
		
	</head>

	<body >

			<!-------------------------------------表格开始----------------------------------------->
			<div class="bodyModel">
				<!-------------------------------------主页面开始----------------------------------------->
				<div id="AUTH" data-code="SQJFH" class="btn-group btnHundred" role="group" >
				  <button type="button" class="btn returnSave" data-eventname="printbtn">售前机返回</button>
				  <button type="button" class="btn clearYF" data-eventname="printbtn">清空</button>
				</div>
			<!-------------------------------------搜索条件开始----------------------------------------->
			<!-------------------------------------搜索条件结束----------------------------------------->	
							<!---------------查询条件开始---------------------------->
 			 <div class="well">
			<form id="inquire_option"> 
					<div class="inputbox container-fluid clearfix">
						<div class="row">
							<div class="Zpercent">
								<span class="box_text">快速定位：</span>
								<span class="box_input">
									<input type="text" class="form-control fasttips" placeholder="串号+业务流水号" id="searchText"/>
								</span>
							</div>
							<div class="Zpercent">
									<span class="box_text">维修部门：</span>
									<div class="input-group">
										<input type="hidden" class="unitSearchYF2" name="repairSectionId" value="${repairSectionId}"/>
							             <input type="text" class="form-control unitSearch contactsunitId wanglai2" name="repairSectionName" readonly="readonly" value="${repairSectionName}">
									      <span class="input-group-btn">
									        <button class="btn btn-default btn2 " type="button" data-toggle="modal"  onclick="showSectionModal('repairSectionName')">
									        	<span class="glyphicon glyphicon-plus"></span>
									        </button>
									      </span>
							         </div>
							</div>
							<div class="Zpercent">
									<span class="box_text">业务部门：</span>
									<div class="input-group">
										<input type="hidden" class="unitSearchYF2" name="outstorSectionId" value="${outstorSectionId}"/>
							             <input type="text" class="form-control unitSearch contactsunitId wanglai2" name="outstorSectionName" readonly="readonly" >
									      <span class="input-group-btn">
									        <button class="btn btn-default btn2 " type="button" data-toggle="modal"  onclick="showSectionModal('outstorSectionName')">
									        	<span class="glyphicon glyphicon-plus"></span>
									        </button>
									      </span>
							         </div>
							</div>
						</div>
					</div>
				</form> 
			 </div>
					<!----------------主表开始---------------------->
				<div class="tablebox retailDetailTable">
					<div class="grid-wrap overflAuto widthYF2" style="margin-top:10px">
						<table id="dataGrid" class="zxsaastable">
						</table>
					</div>
				</div>
				
				<div class="tablebox retailDetailTable" style="margin-top: 10px;">
					<span style="margin-left: 60px;">已选区</span>
					<span class="kuan"><button class="addTable">添加&darr;</button></span>
					<div class="grid-wrap overflAuto widthYF2" style="margin-top:10px">
						<table id="returnDataGrid" class="zxsaastable">
						</table>
						<div id="returnDataGrid_selectedYF"></div>
					</div>
				</div>
				<!----------------切换表格---------------------->
					<!--选项卡-->
			</div>
			
			<!-- 部门名称模态框 -->
			<div class="modal fade" id="sectionModal" tabindex="-1" role="dialog" aria-labelledby="mySection" aria-hidden="true">
				<div class="modal-dialog tree-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal"
								aria-hidden="true">
								&times;
							</button>
							<h4 class="modal-title" id="myModalLabel">
								部门选择
							</h4>
						</div>
						<div class="modal-body tree-body">
							<ul id="sectionTreeData" class="ztree"></ul>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-warning" data-dismiss="modal">关闭</button>
						</div>
					</div>
				</div>
			</div>
			
			<!-------------------------------------表格结束----------------------------------------->
		<!-------------------------------------主页面结束----------------------------------------->

		
		
		<!-------------------------------------底部开始----------------------------------------->
		<!-------------------------------------底部结束----------------------------------------->
	</body>
	<script src="${basePath}/js/cw/bootstrap/js/bootstrap-dialog.min.js?v=${version}"  type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/commonjs/xr.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/commonjs/eidit-grid-test.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/erp/afterSale/preSale-return.js?v=${version}" type="text/javascript" charset="utf-8"></script>
</html>



