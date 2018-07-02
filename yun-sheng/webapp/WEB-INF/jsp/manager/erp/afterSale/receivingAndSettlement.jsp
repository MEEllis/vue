<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<jsp:include  page="../../inventoryInclude/head.jsp"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/pagecss/treepage.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/afterSale/receivingAndSettlement.css?v=${version}" />
		<title>收货结算</title>
	</head>

	<body >

			<!-------------------------------------表格开始----------------------------------------->
			<div class="bodyModel">
				<div id="AUTH" data-code="SHJS" class="btn-group btnHundred" role="group">
			</div>
				<!-------------------------------------主页面开始----------------------------------------->
			<div class="topYF" >
			    <form id="obtainAcctount1">
				<div class="inputbox container-fluid clearfix">
					<div class="row">
						<div class="Zpercent form-group">
							<span class="box_text">发货单据编码：</span>
							<span class="box_input">
							<input type="text" class="form-control billsNo" name="billsNo"/>
							</span>
						</div>
						<div class="Zpercent form-group">
							<span class="box_text">发货日期：</span>
							<span class="box_input input-group">
							<input type="text" class="form-control deliveryDateBegin deliveryDateEnd" id="datetimepickerStart1" placeholder="年-月-日"  />
							</span>
						</div>
						<div class="Zpercent form-group">
								<span class="box_text">快递公司：</span>
								<span class="box_input yfRelative">
							      <input type="text" class="form-control input-none express" data-type="3" name="expressVer"/>
									<div class="none-cx kd" style="display: none;">
							     	 </div>  
							    </span>
							</div>
							
						<div class="Zpercent form-group">
							<span class="box_text"><button class="buttonYY goulv">过滤</button></span>
							
						</div>
					</div>
					<div class="row">
						<div class="Zpercent form-group">
							<span class="box_text">维修往来单位：</span>
							<span class="box_input">
								<div class="input-group box_input">
								 <input type="text" class="form-control2 form-control" id="maintain" disabled/>
								      <span class="input-group-addon showUnit" data-toggle="modal">
								      <span class="glyphicon glyphicon-plus"></span>
								 </span>
								 </div>
							</span>
						</div>
						<div class="Zpercent form-group">
							<span class="box_text">客户往来单位：</span>
							<span class="box_input">
								<div class="input-group box_input">
				 					  <input type="text" id="customer" class="form-control2 form-control" disabled/>
								      <span class="input-group-addon showUnit">
								      <span class="glyphicon glyphicon-plus"></span>
								 </span>
								 </div>
							</span>
						</div>
						<div class="Zpercent form-group">
							<span class="box_text">发货运单号：</span>
							<span class="box_input">
								<input type="text" class="form-control trackNo" name="trackNo"/>
							</span>
						</div>
						<div class="Zpercent">
							<span class="box_text"><button class="buttonYY cleryf">清空</button></span>
							
						</div>
					</div>
				</div>
				</form>
			</div>
			<div class="bgIMG"></div>
			<!-------------------------------------搜索条件开始----------------------------------------->
			<!-------------------------------------搜索条件结束----------------------------------------->	
							<!---------------查询条件开始---------------------------->
					<!----------------主表开始---------------------->
				<!-- 	<form id="kuanVida"> -->
				<div class="tablebox retailDetailTable" style="margin-top:10px;">
					<span style="margin-left: 60px;">待选区</span>
					
					<span class="kuan">快速选择<input type="text" class="fasttips" name="kuanVer"/></span>
					<span class="radioYF">
						<input type="radio" name="radyf" checked="checked" class="radquery" value="1"/>业务流水号
						<input type="radio" name="radyf" class="radquery" value="2"/>串号
						<input type="radio" name="radyf" class="radquery" value="3"/>电话
						<input type="radio" name="radyf" class="radquery" value="4"/>客户姓名
					</span>
					<div class="inputbox container-fluid clearfix">
						<div class="row">
							<div class="Zpercent">
								<span class="box_text">维修部门：</span>
								<div class="input-group form-group">
								    <input name="repairSectionId" type="hidden"/>
						             <input type="text" class="form-control unitSearch repairName"  readonly="readonly" >
								      <span class="input-group-btn">
								        <button class="btn btn-default btn2 " type="button" data-toggle="modal"  onclick="showSectionModal(this)">
								        	<span class="glyphicon glyphicon-plus"></span>
								        </button>
								      </span>
						         </div>
							</div>
						</div>
					</div>
					
					<div class="grid-wrap widthYF2" style="margin-top:10px">
						<table id="jqGrid_RAS" class="zxsaastable">
						</table>
						<div id="jqGridPager_RAS"></div>
					</div>
				</div>
				<!-- </form> -->
				<form id="obtainAcctount2">
			<div class="inputbox container-fluid clearfix">
				 
				<div class="row">
					<div class="Zpercent form-group">
						<span class="box_text">新主串号：</span>
						<span class="box_input">
							<input type="text" class="form-control getData" id="newImei" name="newImei"/>
						</span>
					</div>
					<div class="Zpercent form-group">
						<span class="box_text">新辅串号：</span>
						<span class="box_input">
							<input type="text" class="form-control getData" id="newAuxiliaryImei" name="newAuxiliaryImei"/>
						</span>
					</div>
					
					<!--<div class="Zpercent form-group">
						<span class="box_text">新颜色：</span>
						<span class="box_input">
					
						<select class="form-control getData" id="newColor"></select>
						</span>
					</div>-->
				</div>
				<div class="row">
					<div class="Zpercent form-group">
						<span class="box_text">维修成本：</span>
						<span class="box_input">
							<input type="text" class="form-control getData" id="repairCost" name="repairCost"/>
						</span>
					</div>
					<div class="Zpercent form-group">
						<span class="box_text">服务费用：</span>
						<span class="box_input">
							<input type="text" class="form-control getData" id="serviceAmount" name="serviceAmount"/>
						</span>
						
					</div>
					<div class="Zpercent form-group">
						<span class="box_text"><button class="buttonYY saveData">确认收货</button></span>
					
					</div>
				</div>
				
			</div>
			</form>
			
			<!-------------------------------------表格结束----------------------------------------->
		<!-------------------------------------主页面结束----------------------------------------->
		
		
		<!-------------------------------------底部开始----------------------------------------->
		<!-------------------------------------底部结束----------------------------------------->
		<!--往来单位选择弹出窗-->
		<div class="modal fade" id="unitChoose" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog modalYQ">
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
				  
					<div class="tranLeft">
						<div class="left-tree" style="overflow:auto;">
							<input type="hidden"  class="unitIdOly"/>
							<ul id="unitDataTree" class="ztree"></ul>
						</div>							
					</div>
					<div class="right-body">
						<div class="jqGrid_wrap">
							<input type="text" />
							<table id="jqGrid_roleMsgAdd" class="zxsaastable"></table> 
	    					<div id="jqGridpager_roleMsgAdd"></div>
    					</div>
	    			</div>
					
				   </div>
						<div class="modal-footer">
							<button type="button" class="btn btn-warning" data-dismiss="modal">仅关闭</button>
						</div>
					</div>
					
				</div>
			</div>
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
	</body>
	<script src="${basePath}/js/commonjs/xm.js" type="text/javascript?v=${version}" charset="utf-8"></script>
	<script src="${basePath}/js/afterSale/afterVerify.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/afterSale/receivingAndSettlement.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script type="text/javascript">
		$(function(){
			loadmodal();
		});
	</script>
</html>



