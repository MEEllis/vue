<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<jsp:include  page="../../inventoryInclude/head.jsp"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/pagecss/treepage.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/afterSale/benefitPeople.css?v=${version}" />
		<title>外修及返厂</title>
			<script>
			var groupId = ${groupId};
		</script>
	</head>

	<body >

			<!-------------------------------------表格开始----------------------------------------->
			<div class="bodyModel">
				<!-------------------------------------主页面开始----------------------------------------->
			<div id="AUTH" data-code="WXJFC" class="btn-group btnHundred" role="group" >
				<button type="button" class="btn upDown" data-eventname="printbtn" onclick="firstBill()">首单</button>
			  <button type="button" class="btn upDown" data-eventname="printbtn" onclick="prevBill()">上一单</button>
			  <button type="button" class="btn upDown" data-eventname="printbtn" onclick="nextBill()">下一单</button>
			  <button type="button" class="btn upDown" data-eventname="printbtn" onclick="lastBill()">末单</button>
			  <button class="btn newButton" data-eventname="printbtn">新增</button>
			  <button type="button" class="btn " data-eventname="printbtn" data-toggle="modal" data-target="#changeChoose">查询</button>
			</div>
			<!-------------------------------------搜索条件开始----------------------------------------->
			<!-------------------------------------搜索条件结束----------------------------------------->	
							<!---------------查询条件开始---------------------------->
 			 <div class="well">
				<form id="inquire_option">
					<div class="inputbox container-fluid clearfix">
						<div class="row" style="margin-bottom:15px;">
							<input type="hidden" class="idYF"/>
							<div class="Zpercent">
								<span class="box_text">单据编码：</span>
								<span class="box_input"><input type="text" class="form-control billsNo" disabled/></span>
							</div>
							<div class="Zpercent">
							<span class="box_text">发货日期：</span>
							<span class="box_input input-group">
								<input type="text" class="form-control deliveryDate" disabled id="datetimepickerStart" placeholder="年-月-日" name="deliveryDate"/>
							</span>
						</div>
							<div class="Zpercent">
								<span class="box_text">快递公司：</span>
								<span class="box_input">
									<input type="text" class="form-control expressName" disabled name="expressName"/>
								</span>
							</div>
							<div class="Zpercent">
								<span class="box_text">运单号：</span>
								<span class="box_input">
									<input type="text" class="form-control trackNo" disabled name="trackNo"/>
								</span>
							</div>
						</div>
						
						<div class="row" style="margin-bottom:15px;">
							<div class="Zpercent">
								<span class="box_text">往来单位：</span>
								<div class="input-group box_input">
							      <input type="text" class="form-control unitYF"  disabled>
							    <!--  <span class="input-group-btn">
							        <button class="btn btn-default btn2 unitChoose" type="button" data-toggle="modal" data-target="#unitChoose">
							        	<span class="glyphicon glyphicon-plus"></span>
							        </button>
							      </span> --> 
							    </div>
							</div>
							<div class="Zpercent">
								<span class="box_text">收货地址：</span>
								<span class="box_input">
									<input type="text" class="form-control address" disabled name="address"/>
								</span>
							</div>
							<div class="Zpercent">
								<span class="box_text">联系人：</span>
								<span class="box_input">
									<input type="text" class="form-control linkman" disabled name="linkman"/>
								</span>
							</div>
							<div class="Zpercent">
								<span class="box_text">联系电话：</span>
								<span class="box_input">
									<input type="text" class="form-control telephone" disabled name="telephone"/>
								</span>
							</div>
						</div>
						
						<div class="row">
							<div class="Zpercent">
								<span class="box_text">维修部门：</span>
								<span class="box_input">
									<input type="text" class="form-control repairSectionName" disabled name="telephone"/>
								</span>
							</div>
						</div>
					</div>
				 </form>
			 </div>
					<!----------------主表开始---------------------->
				<div class="tablebox retailDetailTable">
					<span style="margin-left: 60px;">待选区</span>
					<span class="kuan">快速选择
						<input type="text" class="fasttips zonghe"/>
					</span>
					<span>
						<input type="radio" name="haha" class="radquery" checked="checked" value="1"/>业务流水号
						<input type="radio" name="haha" class="radquery" value="2"/>手机串号
						<input type="radio" name="haha" class="radquery" value="3"/>联系电话
					</span>
					<div class="grid-wrap overflAuto" style="margin-top:10px">
						<table id="dataGrid" class="zxsaastable">
						</table>
						<div id="jqGridPager_benefitPeople"></div>
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
							<select class="handleMode">
								<option value="2">返厂</option>
								<%--<option value="1">自修</option>
								--%><option value="3">外修</option>
								<option value="4">换机</option>
								<option value="5">退货</option>
							</select>
						</span>
						<p style="color: red;padding-top: 10px;">请警慎处理!</p>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-info handleModeSave" data-dismiss="modal">确定</button>
						<button type="button" class="btn btn-warning" data-dismiss="modal">取消</button>
					</div>
				</div>
			</div>
		</div><!--处理变更方式弹出窗结束-->
		
		
		<!--查询弹出窗开始-->
		<div class="modal fade" id="changeChoose" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog ">
				<div class="modal-content model310">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							查询条件
						</h4>
					</div>
					<div class="modal-body">
					
						<div class="divYFdiv">
								<span class="spanYF">发货日期：</span>
								<input type="text" class="inputYF" id="datetimepickerStart1" placeholder="年-月-日"/>
						</div>
						<div class="divYFdiv">
							<span class="spanYF">运单号：</span>
							<input type="text" class="inputYF kdDAN" />
						</div>
						<div class="divYFdiv">
							<span class="spanYF">维修部门：</span>
							<div class="input-group">
					             <input type="text" class="form-control unitSearch repairName" wanglai2" name="repairSectionName" readonly="readonly" value="${repairSectionName}">
							      <span class="input-group-btn">
							        <button class="btn btn-default btn2 " type="button" data-toggle="modal"  onclick="showSectionModal(this)">
							        	<span class="glyphicon glyphicon-plus"></span>
							        </button>
							      </span>
					         </div>
						</div>
						<div class="divYFdiv">
								<span class="spanYF">往来单位：</span>
								<div class="input-group" id="batchModel">
									<input type="hidden" class="unitSearchYF1"  name="contactsunitId"/>
						             <input type="text" value="" class="form-control unitSearch wanglai1" readonly="readonly" name="contactUnitName">
								      <span class="input-group-btn">
								        <button class="btn btn-default depChoose" type="button" data-toggle="modal" onclick="showContactunitModal(null);" id="contactunitBtn">
				        	              <span class="glyphicon glyphicon-plus"></span>
				                        </button>
								      </span>
						         </div>
						    </div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-info cxFangC" data-dismiss="modal">确定</button>
						<button type="button" class="btn btn-warning" data-dismiss="modal">取消</button>
					</div>
				</div>
			</div>
		</div><!--查询弹出窗结束-->
		
		
		
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
		
		<!--往来单位选择弹出窗-->
		<div class="modal fade" id="contactunitModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog modalYQ1">
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
				  
					<div class="tranLeft" style="overflow:auto;width:15%">
						<div class="left-tree">
							<ul id="contactunitTreeData" class="ztree"></ul>
						</div>							
					</div>
					<div class="right-body">
						<div class="jqGrid_wrap" >
							<input type="text" placeholder="编码、名称、助记码模糊搜索" id="contactunitRemCode" style="width:200px;"/>
							<table id="contactunitModalGrid" class="zxsaastable"></table> 
	    					<div id="contactunitGridpager"></div>
    					</div>
	    			</div>
					
				   </div>
						<div class="modal-footer">
							<button type="button" class="btn btn-warning" data-dismiss="modal">仅关闭</button>
						</div>
					</div>
					
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>
		
		<!-------------------------------------底部开始----------------------------------------->
		<!-------------------------------------底部结束----------------------------------------->
	</body>
	<script src="${basePath}/js/commonjs/xr.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/erp/afterSale/common.js?v=1.1.1?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/commonjs/eidit-grid-test.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/afterSale/benefitPeople.js?v=${version}" type="text/javascript" charset="utf-8"></script>

</html>



