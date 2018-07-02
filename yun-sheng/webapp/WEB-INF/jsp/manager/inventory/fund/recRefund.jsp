<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<jsp:include  page="../../inventoryInclude/head.jsp"/>
	<script src="${basePath}/js/cw/bootstrap/js/validator-lynnjer.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/erp/funds/invalid.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/erp/funds/tree.js?v=${version}"></script>
	<script src="${basePath}/js/inventory/fund/fundCommonInterface.js?v=${version}"></script>
	<script type="text/javascript" charset="utf-8" src="${basePath}/js/commonjs/eidit-grid-test.js?v=${version}" ></script>
	<script src="${basePath}/js/inventory/fund/recRefund.js?v=${version}"></script>
    <title>预收退款单</title>
    	<script type="text/javascript">
		$(function(){
			checkRole('#billsHeaderForm');
		})
	</script>
    
    </head>
<body class='e-body-bg pageBill'>
	<input type="hidden" value="80" name='billsType' id="billsType"/>
			<div class="btn-toolbar " id="AUTH" role="toolbar"  data-code="YSTKD"  >
			</div>
			
			<!-------------------------------------搜索条件开始----------------------------------------->
		<div class="pageBillForm gridTop" id="collapseExample">
			<form id="billsHeaderForm" novalidate="novalidate" class="form-inline clearfix" >
			    <input type="hidden" name="id"/>
				<input type="hidden" name="billsStatus"/>
				<input type="hidden" name="auditStatus"/>
			  	 <div id="billsCodeWrap"  class="form-group col-sm-3">
			            <label  class="width-25">单据编号:</label>
			            <div class="input-group col-sm-8">
			               <input type="text" class="form-control" name="billsCode" id="billsCode" readonly="readonly" style="padding:0" />
			            </div>
	       		 </div>
			  	
			  	 <div class="form-group col-sm-3">
		            <label  class="width-25">单据日期:</label>
		            <div class="input-group col-sm-8">
		                <input type="text" class="form-control" name="billsDateStr" id="billsBeginDateStr" data-bv-field="billsDate"  readonly="readonly" >
		            </div>
	       		 </div>
	       		 
	       		 <div class="form-group col-sm-3">
	       		 	<input type="hidden" name="sectionId"/>
		            <label  class="width-25">部门名称:</label>
		            <div class="input-group col-sm-8">
					
		                <input type="text" class="form-control" name="sectionName" id="sectionName"  data-bv-field="sectionName">

		            </div>
	       		 </div>
	       		 
	       		  <div class="form-group col-sm-3">
	       		  <input type="hidden" name="managerId"/>
		            <label  class="width-25">经手人:</label>
		            <div class="input-group col-sm-8">
						
		                <input type="text"  class="form-control" name="managerName" id="managerName" placeholder="部门名称先选"  readonly="readonly" data-bv-field="managerUname">

		            </div>
	       		 </div>
	       		 
	       		 <div class="form-group col-sm-3">
		       		    <input type="hidden" name="contactsunitId"/>
			            <label  class="width-25">往来单位:</label>
			            <div class="input-group col-sm-8">
			                <input type="text"  class="form-control" name="contactsunitName" id="contactsunitName" placeholder="部门名称先选"  readonly="readonly" data-bv-field="managerUname">
			            </div>
	       		 </div>


				 <div class="form-group col-sm-3">
					 <label  class="width-25">应收余额:</label>
					 <div class="input-group col-sm-8">
						 <input type="text"  class="form-control" name="yingsAmount" id="yingsAmount"   readonly="readonly" >
					 </div>
				 </div>

				 <div class="form-group col-sm-3">
					 <label  class="width-25">预收余额:</label>
					 <div class="input-group col-sm-8">
						 <input type="text"  class="form-control" name="yusAmount" id="yusAmount"   readonly="readonly" >
					 </div>
				 </div>
				 <div class="form-group col-sm-3">
					 <label  class="width-25">开户行:</label>
					 <div class="input-group col-sm-8">
						 <input type="text"  class="form-control" name="brankName" id="brankName"   readonly="readonly" >
					 </div>
				 </div>
				 <div class="form-group col-sm-3">
					 <label  class="width-25">银行账户:</label>
					 <div class="input-group col-sm-8">
						 <input type="text"  class="form-control" name="accountName" id="accountName" readonly="readonly" >
					 </div>
				 </div>
			<div class="form-group col-sm-3">
		            <label  class="width-25">备注:</label>
		            <div class="input-group col-sm-8">
		                <input type="text" name="remark" id="remark" value=""  class="form-control" />
		            </div>
	       		 </div>
					<div class="rightMap" style="top: 0px;">
						<img src="" />
						<img id="auditImg" class="ml10" src="" />
					</div>

			 </form>
		</div>
			<!-------------------------------------搜索条件结束----------------------------------------->			
			<!-------------------------------------表格开始----------------------------------------->
			<div class="tablebox retailDetailTable">
				<div class="none">
					<input type="hidden" id="dataGridAccountName" data-desc="账户名称模态框">
				</div>
				<div class="grid-wrap" style="margin-top:10px">
					<table id="dataGrid" class="zxsaastable">
					</table>
					<div id="jqGridPager"></div>
				</div>
				
			</div>
	<div class="pageBillBottom gridBottom">
		<form role="form" id="boxmainForm">
			<div class="clearfix form-inline">
				<div class="form-group">
					<label>单据总金额：</label>
					<input type="text" name="amount" id="amount"  class="form-control "  readonly="readonly"/>
				</div>
				<div class="form-group">
					<label >核销金额：</label>
					<input type="text" name="nowAmount" id="nowAmount" class="form-control "  readonly="readonly"/>
				</div>
				<div class="form-group">
					<label>未核销金额：</label>
					<input type="text" name="hasnotAmount"  id="hasnotAmount" class="form-control "  readonly="readonly"/>
				</div>
			</div>
		</form>
	</div>

<div class='boxmainDiv'  >

</div>




			<!-------------------------------------表格结束----------------------------------------->
		<!-------------------------------------主页面结束----------------------------------------->

<!-------------------------------------底部开始----------------------------------------->
	<div class="class="pageBillBottom gridBottom">
	<form id="bottomForm">
		<div class="clearfix form-inline"  >
			<div class="form-group" style="display: none;">
				<label>制单人：</label>
				<<input type="text" name="createByName" class="form-control "  readonly="readonly"/>
			</div>
			<div class="form-group" style="display: none;">
				<label>修改人：</label>
				<<input type="text" name="updateByName" class="form-control "  readonly="readonly"/>
			</div>
			<div class="form-group" style="display: none;">
				<label>红冲人：</label>
				<<input type="text" name="redByName" class="form-control "  readonly="readonly"/>
			</div>
			<div class="form-group col-sm-3" style="text-align: center; float: right;">
				<div class="billslog  none" id="billslog">单据日志</div>
			</div>
		</div>
	</form>
	</div>
		<!-------------------------------------模态框开始----------------------------------------->
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

<!--往来单位模态框-->
<div class="modal fade" id="contactunitModal" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog model-dialog1">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"
					aria-hidden="true">
					&times;
				</button>
				<h4 class="modal-title" id="myModalLabel">
					往来单位选择
				</h4>
			</div>
			<div class="modal-body">
				<div class="container">
					<div class="left">
						<div class="left_tree">
							<ul id="contactunitTreeData" class="ztree"></ul>
						</div>
					</div>
					<!--展示列表开始-->
					<div class="details">
					   <div class="right">
							<input type="text" placeholder="编码、名称、助记码模糊搜索" id="contactunitRemCode" style="width:200px;"/>
						</div>
						<!--表格-->
						<div class="jqGrid_wrap">
							<table id="contactunitModalGrid" class="zxsaastable"></table>
							<div id="contactunitGridpager"></div>
						</div>
					</div>
					<!--展示列表结束-->
				</div>

			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-warning" data-dismiss="modal">关闭</button>
			</div>
		</div>
		<!-- /.modal-content -->
	</div>
</div>

<!--经手人模态框-->
<div class="modal fade" id="managerModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog model-dialog4">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true" >&times;</button>
				<h4 class="modal-title" id="myModalLabel">经办人选择</h4>
			</div>
			<div class="modal-body" id="model-body">
				<div class="showTab">
					<div class="current change">
						<div>
							<input type="text" placeholder="编码、名称、助记码模糊搜索"  style="width:200px;"  id="managerRemCode" value=""/>
							<span style="margin-left: 50px;">职位名称</span>
							<select id="positionSelect" style="width:150px;" ><option value=''>请选择</option></select>
						</div>
						<div class="tablebox retailDetailTable">
							<div class="grid-wrap" style="margin-top: 10px">
								<table id="managerModalGrid" class="zxsaastable"></table>
								<div id="managerGridpager"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-warning" data-dismiss="modal" >关闭</button>
			</div>
		</div>
		<!-- /.modal-content -->
	</div>
	<!-- /.modal -->
</div>

<!-------------------------------------模态框结束----------------------------------------->


<!-- 红冲Modal -->
<div class="modal fade" id="redModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">红冲</h4>
      </div>
      <div class="modal-body">
     	<div class="col-sm-3">
            	时间：
      	</div>
       	<div class="input-group col-sm-8">
               <input type="text" class="form-control redTime" >
      	</div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary redSave">确定</button>
        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
      </div>
    </div>
  </div>
</div>

<jsp:include  page="../../inventoryInclude/foot.jsp"/>