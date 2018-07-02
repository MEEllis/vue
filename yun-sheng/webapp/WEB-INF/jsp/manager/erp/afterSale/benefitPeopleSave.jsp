<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<jsp:include  page="../../inventoryInclude/head.jsp"/>

		<link rel="stylesheet" type="text/css" href="${basePath}/css/pagecss/treepage.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/afterSale/benefitPeople.css?v=${version}" />
		<title>外修及返厂</title>
		
	</head>

	<body >

			<!-------------------------------------表格开始----------------------------------------->
			<div class="bodyModel">
				<!-------------------------------------主页面开始----------------------------------------->
			<div id="AUTH" data-code="WXJFC" class="btn-group btnHundred" role="group" >
			  <button class="btn upDown referYF" data-eventname="printbtn">查看单据</button>
			  <button type="button" class="btn saveData" data-eventname="printbtn">确定</button>
			  <!--<button type="button" class="btn" data-eventname="printbtn">取消</button>-->
			</div>
			<!-------------------------------------搜索条件开始----------------------------------------->
			<!-------------------------------------搜索条件结束----------------------------------------->	
							<!---------------查询条件开始---------------------------->
 			 <div class="well">
				<form id="outer">
					<div class="inputbox container-fluid clearfix">
						<div class="row" style="margin-bottom:0px;">
							<input type="hidden" class="idYF"/>
							<div class="Zpercent">
								<span class="box_text">单据编码：</span>
								<span class="box_input"><input type="text" class="form-control" disabled="disabled" readonly="readonly"/></span>
							</div>
							<div class="Zpercent">
							<span class="box_text">发货日期：</span>
							<span class="box_input input-group">
								<input type="text" class="form-control deliveryDate" id="datetimepickerStart" name="deliveryDate" />
							</span>
						</div>
							<div class="Zpercent">
								<span class="box_text">快递公司：</span>
								<span class="box_input yfRelative">
							      <input type="text" class="form-control input-none expressName" name="expressName" data-type="3"/>
									<div class="none-cx kd" style="display: none;">
							     	 </div>  
							    </span>
							</div>
							<div class="Zpercent form-group">
								<span class="box_text">运单号：</span>
								<span class="box_input">
									<input type="text" class="form-control trackNo" name="trackNo"/>
								</span>
							</div>
						</div>
						
						<div class="row" style="margin-bottom:0px;">
							<div class="Zpercent form-group">
								<span class="box_text">往来单位：</span>
								<div class="input-group">
									<input type="hidden" class="unitHIDE" name="contactsunitId"/>
							      <input type="text" class="form-control unitYF" name="contactsunitName" disabled="disabled" >
							      <span class="input-group-btn">
							        <button class="btn btn-default btn2 unitChoose" type="button" data-toggle="modal" data-target="#unitChoose">
							        	<span class="glyphicon glyphicon-plus"></span>
							        </button>
							      </span>
							    </div>
							</div>
							<div class="Zpercent form-group">
								<span class="box_text">收货地址：</span>
								<span class="box_input">
									<input type="text" class="form-control address" name="address"/>
								</span>
							</div>
							<div class="Zpercent form-group">
								<span class="box_text">联系人：</span>
								<span class="box_input">
									<input type="text" class="form-control linkman" name="linkman"/>
								</span>
							</div>
							<div class="Zpercent form-group">
								<span class="box_text">联系电话：</span>
								<span class="box_input">
									<input type="text" class="form-control telephone" name="telephone"/>
								</span>
							</div>
						</div>
						
						<div class="row">
							<div class="Zpercent">
								<span class="box_text">维修部门：</span>
								<div class="input-group form-group">
								    <input name="repairSectionId" type="hidden"/>
						             <input type="text" class="form-control unitSearch repairSectionName"  readonly="readonly" value="${repairSectionName}">
								      <span class="input-group-btn">
								        <button class="btn btn-default btn2 " type="button" data-toggle="modal"  onclick="showSectionModal(this)">
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
					<span style="margin-left: 60px;">待选区</span>
					<span class="kuan">快速选择<input type="text" class="fasttips zonghe"/></span>
					<span>
						<input type="radio" name="haha" class="radquery" checked="checked" value="1"/>业务流水号
						<input type="radio" name="haha" class="radquery" value="2"/>手机串号
						<input type="radio" name="haha" class="radquery" value="3"/>联系电话
					</span>
					<div class="grid-wrap overflAuto widthyf1" style="margin-top:10px;">
						<table id="jqGrid_benefitPeople" class="zxsaastable">
						</table>
						<div id="jqGridPager_benefitPeople"></div>
					</div>
				</div>
				<!----------------切换表格---------------------->
				<div class="tablebox retailDetailTable" style="margin-top: 10px;">
					<span style="margin-left: 60px;">已选区</span>
					<span class="kuan"><button class="addTable">添加&darr;</button></span>
					<span class="kuan"><button data-toggle="modal" class="alterChoose" >处理变更方式</button></span>
					<div class="grid-wrap overflAuto widthYF2" style="margin-top:10px">
						<table id="jqGrid_selectedYF" class="zxsaastable">
						</table>
						<div id="jqGridPager_selectedYF"></div>
					</div>
				</div>
					<!--选项卡-->
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
								<option value="3">外修</option>
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
		
		<!--往来单位选择弹出窗-->
		<div class="modal fade" id="unitChoose" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog modalYQ">
				<div class="modal-content" style="width:850px">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							往来单位选择
						</h4>
					</div>
					<div class="modal-body">
					
					 	<div class="tranLeft" style="overflow:auto;width:25%">
							<div class="left-tree">
								<input type="hidden" class="unitIdOly" />
									<ul id="unitDataTree" class="ztree"></ul>
							</div>							
						</div>
						<div class="right-body tckWidth">
							<div class="jqGrid_wrap tckWidth1" style="width:655px">
								<input type="text" class="wangL fasttips"/>
								<table id="jqGrid_roleMsgAdd" class="zxsaastable"></table> 
				    				<div id="jqGridPager_roleMsgAdd"></div>
	    					</div>
		    			</div>
					</div>
					<div class="modal-footer">
							<button type="button" class="btn btn-warning" data-dismiss="modal">取消</button>
						</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>
		
		
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
	<script src="${basePath}/js/commonjs/xr.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/afterSale/benefitPeopleSave.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/afterSale/afterVerify.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script type="text/javascript">
		$(function(){
			loadmodal();
		});
	</script>
</html>



