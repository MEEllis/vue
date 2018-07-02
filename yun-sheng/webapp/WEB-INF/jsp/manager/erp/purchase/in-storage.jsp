<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML>
<html>
  <head>
    <title>采购入库</title>
    <meta name="renderer" content="webkit" />
	<meta http-equiv="X-UA-Compatible" content="IE=9; IE=8; IE=7; IE=EDGE ; chrome=1" />
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!-- 引入文件 -->
	<jsp:include page="../../Include/import.jsp"></jsp:include>
	<link rel="stylesheet" type="text/css" href="${basePath}/css/erp/purchase/purchase-base.css?v=${version}" />
	<script type="text/javascript">
	
		//**********全局变量
		//基本目录
		var basePath = "${basePath}";
		var gl_companyId = "${companyId}";
		var billsCode = "${billsCode}";
		var billId = "${billId}"
	</script>
  </head>
 
  <body>

  <input type="hidden"  name="" id="dataGridRowId" >
	    <div class=" gridTools">
	        <div class="col-md-12">
				<div style="padding: 0px;margin-top: 10px;">
 				<div id='AUTH' data-code='CGRKD' class="btn-group btnHundred">
			    	<button type="button" class="btn btn-default navbar-btn" onclick="firstPage()">首单</button>
			        <button type="button" class="btn btn-default navbar-btn" onclick="backPage()">上一单</button>
			        <button type="button" class="btn btn-default navbar-btn" onclick="nextPage()">下一单</button>
			        <button type="button" class="btn btn-default navbar-btn" onclick="lastPage()">末单</button>
			        <button type="button" class="btn btn-default navbar-btn" onclick="addBtClick()">新增</button>
			        <button type="button" class="btn btn-default navbar-btn unAllEdit" onclick="saveBtClick()">保存</button>
			        <button type="button" class="btn btn-default navbar-btn delBt" onclick="delBtClick()">删除</button>
			        <button type="button" class="btn btn-default navbar-btn checkBt" onclick="checkBtClick()">过账</button>
			        <button type="button" class="btn btn-default navbar-btn forceFinish" onclick="forceFinishBtClick()">红冲</button>
			        <button type="button" class="btn btn-default navbar-btn print" onclick="print()">打印</button>
			        <button type="button" class="btn btn-default navbar-btn hide" onclick="forceFinishBtClick()">导入</button>
			        <button type="button" class="btn btn-default navbar-btn orderImport" onclick="orderReferenceBtClick()">订单引入</button>
			        <!-- 
			        <button type="button" class="btn btn-default navbar-btn billsImport" onclick="billsReferenceBtClick()">单据引入</button>
			         -->
			        <!--<button type="button" class="btn btn-default navbar-btn" 
			          onclick="javascript:parent.openWorkBoxByMenutext('借入转采购','${basePath}/jxc/storage/borrowSaleDetail/borrowSale');">借入转采购</button>
			        -->
					<button type="button" class="btn btn-default navbar-btn" onclick="filterBtClick()">过滤</button>
			        <button type="button" class="btn btn-default navbar-btn" onclick="refreshBtClick()">刷新</button>
			        <button type="button" class="btn btn-default navbar-btn copyBills" onclick="copyBtClick()">复制</button>
					<div class="btn-group" role="group">
						<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							打印串号标签
							<span class="caret"></span>
						</button>
						<ul class="dropdown-menu actionBox" style="text-align: center">
							<li class="e-caozuo" id="printAllImei">打印本单串号</li>
							<li class="e-caozuo" id="printSelImei">打印所选商品串号</li>
						</ul>
					</div>

				    <div class="slideThree none">
						<input type="checkbox" value="1" id="slideThree" name="check"  checked="checked"/>
						<label for="slideThree"></label>
				    </div>

					<button type="button" class="btn btn-default btn-yindao-btn" style="float:right;"
							onclick="window.parent.openWorkBoxByMenutext('采购入库单单据列表',  '/manager/inventory/purchase/historyMain?billsType=2', true)">历史单据</button>

				</div>
				</div>
	        </div>
			<div class="btn-toolbar " id="MenuTool" role="toolbar" data-code="CGRKD"></div>
	    </div>

	    <div class=" gridTop">
	        <div class="col-md-12">
				<!-- /S 表头  -->
				<form class="well form-horizontal unAllEdit" role="form" id="topForm"> 
				  <!-- /S 表单控件  -->
				  <div class="formBtn">
					<div class="form-group">
					  <label class="col-sm-3 control-label">单据编号:</label>
					  <div class="col-sm-8">
						<div class="input-group">
					    <input type="text" class="form-control" name="billsCode">
					    <input type="text" class="form-control" name="id" style="display: none;">
					  </div></div>
					</div>
				  </div>			  
				  <div class="formBtn">
					<div class="form-group">
					    <label class="col-sm-3 control-label">单据日期:</label>
					    <div class="col-sm-8">
								<div class="input-group">
							<input type="text" class="form-control" name="billsDate">
					    </div></div>
					</div>
				  </div>
				  <div class="formBtn">
					<div class="form-group">
					  <label class="col-sm-3 control-label">部门名称:</label>
					  <div class="col-sm-8">
		                <div class="input-group">
		                    <input type="text" class="form-control" name="sectionId" value="" style="display: none;" >
		                    <input type="text" class="form-control" name="sectionName">
		                </div>
					  </div>
					</div>
				  </div>
				  <div class="formBtn" style="margin-right:10px">
					<div class="form-group">
					  <label class="col-sm-3 control-label">往来单位:</label>
					  <div class="col-sm-8">
		                <div class="input-group">
		                    <input type="text" class="form-control" name="contactsunitName">
		                    <input type="text" class="form-control" name="contactsunitId" style="display: none;">
		                </div><!-- /input-group -->
					  </div>
					</div>
				  </div>
				  <div class="formBtn">
					<div class="form-group">
					  <label class="col-sm-3 control-label">应付余额:</label>
					  <div class="col-sm-8">
								<div class="input-group">
					    <input type="text" class="form-control" id="yingFu" value="0" disabled="disabled">
					  </div></div>
					</div>
				  </div>
				  <div class="formBtn">
					<div class="form-group">
					  <label class="col-sm-3 control-label">预付余额:</label>
					  <div class="col-sm-8">
								<div class="input-group">
					    <input type="text" class="form-control" id="yuFu" value="0" disabled="disabled">
					  </div></div>
					</div>
				  </div>
				  <div class="formBtn">
					<div class="form-group">
					  <label class="col-sm-3 control-label">经办人:</label>
					  <div class="col-sm-8">
		                <div class="input-group">
		                    <input type="text" class="form-control" name="managersUid" style="display: none;">
		                    <input type="text" class="form-control" name="managersName">
		                </div><!-- /input-group -->
					  </div>
					</div>
				  </div>
				  <div class="formBtn">
					<div class="form-group">
					  <label class="col-sm-3 control-label">单备注:</label>
					  <div class="col-sm-8">
								<div class="input-group">
					    <input type="text" class="form-control" name="remark">
					  </div></div>
					</div>
				  </div><!-- /E 表单控件  -->
				  <div style="clear: left;"></div>
				  <img  id="billsStautsImg" src="" width="80" height="80" style="position:absolute;top: 30px;right: 30px;display: none;">
				</form><!-- /E 表头  -->
	        </div>
	    </div>
	    <div class="row gridBody unAllEdit">
			<div class="none">
				<input type="hidden" id="dataGridGood" data-desc="商品名称模态框">
				<input type="hidden" id="dataGridStorageName" data-desc="仓库名称模态框">
			</div>
	        <div class="col-md-12">
				<!-- /S 表体 -->
				<div class="jqGrid_wrapper" style="margin-left:15px">
					<table id="dataGrid"></table> 
				</div><!-- /E 表体 -->
	        </div>
	    </div>
	    <div class="row">
		    <div class="col-md-12">
		        <form class="form-horizontal unAllEdit" role="form" style="margin-top: 5px;" id="middleForm"> 
				  <div class="formBtn">
					<div class="form-group">
					  <label class="col-sm-4 control-label">付款金额:</label>
					  <div class="col-sm-8">
					    <input type="text" class="form-control" id="payrecetiptAmount" onclick="openPayrecetiptDetailModal()" readonly="readonly">
					  </div>
					</div>
				  </div>
				  <div class="formBtn">
					<div class="form-group">
					  <label class="col-sm-4 control-label">整单折扣:</label>
					  <div class="col-sm-8">
					    <input type="text" class="form-control discount billsDiscount" name="billsDiscount" value="0.00" onkeyup='checkInput.checkNum(this,12);' />
					  </div>
					</div>
				  </div>
				  <div class="formBtn">
					<div class="form-group">
					  <label class="col-sm-4 control-label">应付金额:</label>
					  <div class="col-sm-8">
					    <input type="text" class="form-control" name="yingFuAmount" disabled="disabled" value="0.00">
					  </div>
					</div>
				  </div>
				  <div class="formBtn">
					<div class="form-group">
					  <label class="col-sm-4 control-label">未付金额:</label>
					  <div class="col-sm-8">
					    <input type="text" class="form-control echMoney" name="weiFuAmount" disabled="disabled" value="0.00">
					  </div>
					</div>
				  </div>
				</form>
		    </div>
	    </div>
	    <div class="row gridBottom" style="">
	        <div class="col-sm-12">
				<!-- /S 表头  -->
				<form class="form-horizontal unAllEdit" role="form" id="bottomForm"> 
				  <!-- /S 表单控件  -->
				  <div class="formBtnSM" style="width:260px">
					<div class="form-group">
					  <label class="col-sm-7 control-label">公司名称:</label>
					  <div class="col-sm-5">
					    <input type="text" class="form-control" name="companyId" style="display: none;">
					    <input type="text" class="form-control" name="companyName" disabled="disabled" style="width:150px;">
					  </div>
					</div>
				  </div>
				  <div class="formBtnSM" style="width:260px">
					<div class="form-group">
					  <label class="col-sm-7 control-label">制单人:</label>
					  <div class="col-sm-5">
					    <input type="text" class="form-control" name="createBy" style="display: none;">
					    <input type="text" class="form-control" name="createByName" disabled="disabled" style="width:150px;">
					  </div>
					</div>
				  </div>
				  <div class="formBtnSM" style="width:260px">
					<div class="form-group">
					  <label class="col-sm-7 control-label">修改人:</label>
					  <div class="col-sm-5">
					    <input type="text" class="form-control" name="lastupdateBy" style="display: none;">
					    <input type="text" class="form-control" name="lastupdateByName" disabled="disabled" style="width:150px;">
					  </div>
					</div>
				  </div>
				  <div class="formBtnSM" style="width:260px">
					<div class="form-group">
					  <label class="col-sm-7 control-label">过账人:</label>
					  <div class="col-sm-5">
					    <input type="text" class="form-control" name="postBy" disabled="disabled" style="display: none;">
					    <input type="text" class="form-control" name="postByName" disabled="disabled" style="width:150px;">
					  </div>
					</div>
				  </div>
				  <div class="formBtnSM" style="width:260px">
					<div class="form-group">
					  <label class="col-sm-7 control-label">红冲人:</label>
					  <div class="col-sm-5">
					  	<input type="text" class="form-control" name="invalidBy" disabled="disabled" style="display: none;">
					    <input type="text" class="form-control" name="invalidByName" disabled="disabled" style="width:150px;">
					  </div>
					</div>
				  </div>
				</form><!-- /E 表头  -->
	        </div>
	    </div>
	<!-- 引用自定义JS文件 -->
	<script type="text/javascript" src="${basePath}/js/base.js?v=${version}"></script>
	<script type="text/javascript" src="${basePath}/js/component.js?v=${version}"></script>
	<script type="text/javascript" src="${basePath}/model/erp/model-bills.js?v=${version}"></script>
	<script type="text/javascript" src="${basePath}/js/erp/purchase/in-storage.js?v=${version}"></script>
	<script type="text/javascript" src="${basePath}/js/erp/purchase/validator.js?v=${version}"></script>
	<!-- 菜单权限验证 -->
	<script type="text/javascript" src="${basePath}/js/erp/authority/menuValidation.js?v=${version}"></script>
  </body>
  
</html>

<!-- 模态框（过滤条件） -->
<div class="modal fade" id="filterParamModalDialog" tabindex="-1" role="dialog" aria-hidden="true">
	<div class="modal-dialog dialogHeight">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				<h4 class="modal-title">过滤条件窗口</h4>
			</div>
			<div class="modal-body">
				<!-- 新增商品档案   表单 -->			
				<form class="form-horizontal filterParamForm" role="form">
				  <div class="col-sm-4">
					  <div class="form-group">
					    <label for="firstname" class="col-sm-5 control-label">开始日期：</label>
					    <div class="col-sm-6">
							<input type="text" class="form-control" name="billsDateBegin" id="billsDateBegin" onblur='checkInput.checkTime(this,"#billsDateBegin","#billsDateEnd");' >
					    </div>
					  </div>
					  <div class="form-group">
					    <label for="" class="col-sm-5 control-label">结束日期：</label>
					    <div class="col-sm-6">
							<input type="text" class="form-control" name="billsDateEnd" id="billsDateEnd" onblur='checkInput.checkTime(this,"#billsDateBegin","#billsDateEnd");' >
					    </div>
					  </div>
					  <div class="form-group">
					    <label for="" class="col-sm-5 control-label">往来单位：</label>
					    <div class="col-sm-6">
			                <div class="input-group">
			                    <input type="text" class="form-control" name="contactsunitIdListStr" style="display: none;">
			                    <input type="text" class="form-control" id="contactsunitIdListStr">
			                </div><!-- /input-group -->
					    </div>
					  </div>
				  </div>
				  <div class="col-sm-4">
					  <div class="form-group">
					    <label for="firstname" class="col-sm-5 control-label">部门名称：</label>
					    <div class="col-sm-6">
			                <div class="input-group">
			                    <input type="text" class="form-control" name="sectionIdListStr" style="display: none;">
			                    <input type="text" class="form-control" id="sectionIdListStr">
			                </div><!-- /input-group -->
					    </div>
					  </div>
					  <div class="form-group">
					    <label for="" class="col-sm-5 control-label">商品名称：</label>
					    <div class="col-sm-6">
			                <div class="input-group">
			                    <input type="text" class="form-control" name="goodsNameIdListStr" style="display: none;">
			                    <input type="text" class="form-control" id="goodsNameIdListStr">
			                </div><!-- /input-group -->
					    </div>
					  </div>
					  <div class="form-group">
					    <label for="" class="col-sm-5 control-label">单据编码：</label>
					    <div class="col-sm-6">
					      <input type="text" class="form-control" name="billsCode">
					    </div>
					  </div>
				  </div>
				  <div class="col-sm-4">
					  <div class="form-group">
					    <label for="" class="col-sm-5 control-label">单备注：</label>
					    <div class="col-sm-6">
					      <input type="text" class="form-control" name="remark">
					    </div>
					  </div>
					  <div class="form-group">
					    <label for="" class="col-sm-5 control-label">单据状态：</label>
					    <div class="col-sm-6">
							<select id="billsStatusCodeListStr" class="js-example-basic-multiple" name="billsStatusCodeListStr" multiple="multiple" style="width: 160px;">
								<option value="1">草稿</option>
								<option value="2">已审核</option>
								<option value="3">入库中</option>
								<option value="4">已完成</option>
								<option value="5">强制完成</option>
								<option value="6">已过账</option>
								<option value="7">已红冲</option>
								<option value="8">已发货</option>
								<option value="9">作废</option>
								<option value="10">已接收</option>
								<option value="11">拒收</option>
							</select>
					    </div>
					  </div>
					  <div class="form-group">
					    <label for="" class="col-sm-5 control-label">串号：</label>
					    <div class="col-sm-6">
					    	<input type="text" class="form-control" name="imei">
					    </div>
					  </div>
				  </div>
				  <div class="col-sm-2"></div>
				  <div class="col-sm-8">
				    <label>
				      <input type="checkbox" class="flag" name="onlyShowHaveGift"> 是否只显示赠品单
				    </label>
				    <label>
				      <input type="checkbox" class="flag" name="haveInvalid" checked="checked"> 是否包含红冲单据
				    </label>
				  </div>
				</form>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-w btn-danger" onclick="javascript:lastPage();$('#filterParamModalDialog').modal('hide');">查询</button>
				<button type="button" class="btn btn-warning" data-dismiss="modal">取消</button>
				<button  type="button" class="btn btn-w btn-info" onclick="resetQueryForm()">重置</button>
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal -->
</div>

<!-- 订单引用 -->
<div class="modal fade" id="orderReferenceModal" tabindex="-1" role="dialog"  aria-hidden="true">
   <div class="modal-dialog" style="width:90%;">
      <div class="modal-content">
	     <div class="modal-header">
            <button type="button" class="close"  data-dismiss="modal" aria-hidden="true"> &times;</button>
            <h4 class="modal-title">
                                 订单引用
            </h4>
         </div>
         <div class="modal-body" style="padding: 0px;">
			<iframe name="orderReferenceFrame" class="referenceFrame" frameborder="0" style="width: 100%;height:100%;padding: 0px;margin: 0px;;" src=""></iframe>
         </div>
	  </div>
	</div>
</div>

<!-- 单据引用 -->
<div class="modal fade" id="billsReferenceModal" tabindex="-1" role="dialog"  aria-hidden="true">
   <div class="modal-dialog" style="width:90%;">
      <div class="modal-content">
	     <div class="modal-header">
            <button type="button" class="close"  data-dismiss="modal" aria-hidden="true"> &times;</button>
            <h4 class="modal-title">
                                 单据引用
            </h4>
         </div>
         <div class="modal-body" style="padding: 0px;">
			<iframe name="billsReferenceFrame" class="referenceFrame" frameborder="0" style="width: 100%;height:100%;padding: 0px;margin: 0px;;" src=""></iframe>
         </div>
	  </div>
	</div>
</div>

<!-- 预付款明细录入 -->
<div class="modal fade" id="payrecetiptDetailModal" tabindex="-1" role="dialog"  aria-hidden="false">
   <div class="modal-dialog" style="width: 600px;">
      <div class="modal-content">
	     <div class="modal-header">
            <button type="button" class="close"  data-dismiss="modal" aria-hidden="true"> &times;</button>
            <h4 class="modal-title">
                                 付款方式
            </h4>
         </div>
         <div class="modal-body">
			<!-- /S 表体 -->
			<div class="jqGrid_wrapper">
				<table id="dataGrid2"></table> 
			</div><!-- /E 表体 -->
         </div>
         <!-- 模态框底部部分 -->
         <div class="modal-footer">
            <button type="button" class="btn btn-default"  onclick="savePayreceiptAmout()">保存</button>
            <button type="button" class="btn btn-default"  data-dismiss="modal">关闭</button>
         </div>
	  </div>
	</div>
</div>

<!-- 仓库选择 -->
<div class="modal fade" id="storageReferenceModal2" tabindex="-1" role="dialog"  aria-hidden="true">
   <div class="modal-dialog" style="width: 870px;">
      <div class="modal-content">
	     <div class="modal-header">
            <button type="button" class="close"  data-dismiss="modal" aria-hidden="true"> &times;</button>
            <h4 class="modal-title">
                                 仓库选择 
            </h4>
            <input type="text" id="storageReferenceModal2_goodsInfo" style="display: none;"/>  
         </div>
         <div class="modal-body">
         	<!-- 树 -->
			<div style="width: 300px;float: left;">
			  	<ul id="dataTree" class="ztree">
			    </ul>
			</div>
			<!-- 表格 -->
			<div id="storageReferenceGrid2" style="float: left;">
			  <!-- /S 表体 -->
			  <div class="jqGrid_wrapper">
				<table id="dataGrid33"></table> 
   				<div id="jqGridPager33"></div>
			  </div>
			</div>
			<div style="clear: left;"></div>
         </div>
         <div class="modal-footer">
            <button type="button" class="btn btn-default"  onclick="saveDataGrid33()">保存</button>
            <button type="button" class="btn btn-default"  class="close"  data-dismiss="modal" aria-hidden="true">取消</button>
         </div>
	  </div>
	</div>
</div>



