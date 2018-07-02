<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>采购换货</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!-- 引入文件 -->
	<jsp:include page="../../Include/import.jsp"></jsp:include>
	<link rel="stylesheet" type="text/css" href="${basePath}/css/base.css?v=${version}"/>
	<link rel="stylesheet" type="text/css" href="${basePath}/css/erp/purchase/purchase-base.css?v=${version}" />
	<script type="text/javascript">
		//**********全局变量
		//基本目录
		var basePath = "${basePath}";
		var billsCode = "${billsCode}";
		var billId = '${billId}'
	</script>
	<style type="text/css">
    	#imeiDr-modal .modal-header{
    		background-color: #4e78a1;
		    padding: 10px;
		    color: #fff;
    	}
		.imeiImport{
			padding: 6px 25px;
		    background: #fff;
		    border: 1px solid #ccc;
		}
		.imeiImport:hover{
			border: 1px solid #0099FF;
		}
		#imeiDr-modal .row{
			padding-bottom: 0;
		}
		.ui-pager-control{
			height: 38px;
		}
		.showBox>button{
			height: 34px;
		}
	</style>
  </head>
  <body>
  <input type="hidden"  name="" id="dataGridRowId" >
	    <div class=" gridTools">
	        <div class="col-md-12">
				<div class="" style="padding: 0px;margin-top: 10px;">
 				<div id='AUTH' data-code='CGHHD' class="btn-group btnHundred">
			    	<button type="button" class="btn btn-default navbar-btn" onclick="firstPage()">首单</button>
			        <button type="button" class="btn btn-default navbar-btn" onclick="backPage()">上一单</button>
			        <button type="button" class="btn btn-default navbar-btn" onclick="nextPage()">下一单</button>
			        <button type="button" class="btn btn-default navbar-btn" onclick="lastPage()">末单</button>
			        <button type="button" class="btn btn-default navbar-btn" onclick="addBtClick()">新增</button>
			        <button type="button" class="btn btn-default navbar-btn" onclick="saveBtClick()">保存</button>
			        <button type="button" class="btn btn-default navbar-btn delBt" onclick="delBtClick()">删除</button>
			        <button type="button" class="btn btn-default navbar-btn checkBt" onclick="checkBtClick()">过账</button>
			        <button type="button" class="btn btn-default navbar-btn forceFinish" onclick="forceFinishBtClick()">红冲</button>
			        <button type="button" class="btn btn-default navbar-btn print" onclick="print()">打印</button>
			        <button type="button" class="btn btn-default navbar-btn" onclick="filterBtClick()">过滤</button>
			        <button type="button" class="btn btn-default navbar-btn" onclick="refreshBtClick()">刷新</button>
			        <button type="button" class="btn btn-default navbar-btn copyBills" onclick="copyBtClick()">复制</button>
	  			  			  			  
				    <div class="slideThree none">
						<input type="checkbox" value="1" id="slideThree" name="check" checked="checked"/>
						<label for="slideThree"></label>
				    </div>

					<button type="button" class="btn btn-default btn-yindao-btn" style="float:right;"
							onclick="window.parent.openWorkBoxByMenutext('采购换货单单据列表',  '/manager/inventory/purchase/historyMain?billsType=3', true)">历史单据</button>

				</div>
				</div> 
	        </div>
			<div class="btn-toolbar " id="MenuTool" role="toolbar" data-code="CGHHD"></div>
	    </div>
	    <div class="gridTop">
	        <div class="col-md-12">
				<!-- /S 表头  -->
				<form class="well form-horizontal" role="form" id="topForm"> 
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
					    <label for="" class="col-sm-3 control-label">单据日期:</label>
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
		                    <input type="text" class="form-control sectionId" name="sectionId" style="display: none;">
		                    <input type="text" class="form-control" name="sectionName">
		                </div><!-- /input-group -->
					  </div>
					</div>
				  </div>
				  <div class="formBtn"  style="margin-right:10px">
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
					    <input type="text" class="form-control" name="remark" />
					  </div></div>
					</div>
				  </div><!-- /E 表单控件  -->
				  <div style="clear: left;"></div>
				  <img  id="billsStautsImg" src="" width="80" height="80" style="position:absolute;top: 30px;right: 30px;display: none;">
				</form><!-- /E 表头  -->
	        </div>
	    </div>
	    <div class="row gridBody" style="padding-top: 5px;padding-bottom: 5px;">
			<div class="none">
				<input type="hidden" id="dataGridGood" data-desc="商品名称模态框">
				<input type="hidden" id="dataGridStorageName" data-desc="仓库名称模态框">
			</div>
	        <div class="col-md-12">
	        	<div class="gridType"><div>换</div><div>入</div><div>信</div><div>息</div></div>
				<!-- /S 表体 -->
	        	<div style="overflow: hidden;">
					<!-- /S 表体 -->
					<div class="jqGrid_wrapper">
						<table id="dataGrid"></table> 
					</div><!-- /E 表体 -->
	        	</div>
	        </div>
	    </div>
	    <div class="row gridBody" style="padding-top: 3px;padding-bottom: 5px;">
			<div class="none">
				<input type="hidden" id="dataGrid2Good" data-desc="商品名称模态框">
				<input type="hidden" id="dataGrid2StorageName" data-desc="仓库名称模态框">
			</div>
	        <div class="col-md-12">
	        	<div class="gridType"><div style="margin-top: 60px;">换</div><div>出</div><div>信</div><div>息</div></div>
	        	<div style="overflow: hidden;">
	        		<div class="row">
	        			<div class="col-md-12">
			        		<div class="form-horizontal" role="form" style="margin-top: 5px;"> 
								<div class="form-group col-sm-4">
								  <label class="col-sm-4 control-label" style="font-weight: normal;">出库串号:</label>
								  <div class="col-sm-8 wiRes">
								    <input type="text" class="form-control searchImei" value="">
								  </div>
								</div>
								
								<div class="form-group col-sm-3" style="margin-bottom: 0px;">
									<button type="button" class="btn imeiImport">串号导入</button>
								</div>
								
							</div>
						</div>
	        			<div class="col-md-3" style="display: none;">
			        		<button type="button" class="btn btn-default" onclick="">引入原单</button>
						</div>
					</div>
					<!-- /S 表体 -->
					<div class="row" style="margin-left: 0px;margin-right: 0px;">
						<div class="jqGrid_wrapper">
							<table id="dataGrid2"></table> 
						</div><!-- /E 表体 -->
					</div>
	        	</div>
	        </div>
	    </div>
	    <div class="row">
		    <div class="col-md-12">
		        <form class="form-horizontal" role="form" style="margin-top: 5px;" id="middleForm"> 
				  <div class="formBtn" style="width:260px">
					<div class="form-group">
					  <label class="col-sm-5 control-label" id="payrecetiptDetailInputTitle" style="padding-right:5px">补差款:</label>
					  <div class="col-sm-7" style="padding-left: 0px;">
					    <input type="text" class="form-control" id="payrecetiptAmount" onclick="openPayrecetiptDetailModal()" readonly="readonly">
					  </div>
					</div>
				  </div>
				  <div class="formBtn" style="display: none;width:260px" >
					<div class="form-group">
					  <label class="col-sm-5 control-label" style="padding-right:5px">整单折扣:</label>
					  <div class="col-sm-7" style="padding-left: 0px;">
					    <input type="text" class="form-control" name="billsDiscount" value="0" onkeyup='checkInput.checkNum(this,12);' />
					  </div>
					</div>
				  </div>
				  <div class="formBtn" style="width:260px">
					<div class="form-group">
					  <label class="col-sm-5 control-label" id="yingFuShouLable" style="padding-right:5px">应付金额:</label>
					  <div class="col-sm-7" style="padding-left: 0px;">
					    <input type="text" class="form-control" name="yingFuAmount" disabled="disabled" value="0">
					  </div>
					</div>
				  </div>
				  <div class="formBtn" style="width:260px">
					<div class="form-group">
					  <label class="col-sm-5 control-label" id="weiFuShouLable" style="padding-right:5px">未付金额:</label>
					  <div class="col-sm-7" style="padding-left: 0px;">
					    <input type="text" class="form-control" name="weiFuAmount" disabled="disabled" value="0">
					  </div>
					</div>
				  </div>
				</form>
		    </div>
	    </div>
	    <div class="row gridBottom">
	        <div class="col-sm-12">
				<!-- /S 表头  -->
				<form class="form-horizontal" role="form" id="bottomForm" style="    padding-bottom: 80px;"> 
				  <!-- /S 表单控件  -->
				  <div class="formBtnSM" style="width:260px">
					<div class="form-group">
					  <label class="col-sm-7 control-label">公司名称:</label>
					  <div class="col-sm-5">
					    <input type="text" class="form-control" name="companyName" disabled="disabled" style="width:150px">
					    <input type="text" class="form-control" name="companyId" style="display: none;" >
					  </div>
					</div>
				  </div>
				  <div class="formBtnSM" style="width:260px">
					<div class="form-group">
					  <label class="col-sm-7 control-label">制单人:</label>
					  <div class="col-sm-5">
					    <input type="text" class="form-control" name="createByName" disabled="disabled" style="width:150px">
					    <input type="text" class="form-control" name="createBy" style="display: none;" >
					  </div>
					</div>
				  </div>
				  <div class="formBtnSM" style="width:260px">
					<div class="form-group">
					  <label class="col-sm-7 control-label">修改人:</label>
					  <div class="col-sm-5">
					    <input type="text" class="form-control" name="lastupdateByName" disabled="disabled" style="width:150px">
					    <input type="text" class="form-control" name="lastupdateBy" style="display: none;" >
					  </div>
					</div>
				  </div>
				  <div class="formBtnSM" style="width:260px">
					<div class="form-group">
					  <label class="col-sm-7 control-label">过账人:</label>
					  <div class="col-sm-5">
					    <input type="text" class="form-control" name="postBy" disabled="disabled" style="display: none;">
					    <input type="text" class="form-control" name="postByName" disabled="disabled" style="width:150px">
					  </div>
					</div>
				  </div>
				  <div class="formBtnSM" style="width:260px">
					<div class="form-group">
					  <label class="col-sm-7 control-label">红冲人:</label>
					  <div class="col-sm-5">
					  	<input type="text" class="form-control" name="invalidBy" disabled="disabled" style="display: none;">
					    <input type="text" class="form-control" name="invalidByName" disabled="disabled" style="width:150px">
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
	<script type="text/javascript" src="${basePath}/js/erp/purchase/exchange-goods.js?v=${version}"></script>
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
					    <label  class="col-sm-5 control-label">开始日期：</label>
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
					    <label  class="col-sm-5 control-label">往来单位：</label>
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
					    <label  class="col-sm-5 control-label">部门名称：</label>
					    <div class="col-sm-6">
			                <div class="input-group">
			                    <input type="text" class="form-control" name="sectionIdListStr" style="display: none;">
			                    <input type="text" class="form-control" id="sectionIdListStr">
			                </div><!-- /input-group -->
					    </div>
					  </div>
					  <div class="form-group">
					    <label  class="col-sm-5 control-label">商品名称：</label>
					    <div class="col-sm-6">
			                <div class="input-group">
			                    <input type="text" class="form-control" name="goodsNameIdListStr" style="display: none;">
			                    <input type="text" class="form-control" id="goodsNameIdListStr">
			                </div><!-- /input-group -->
					    </div>
					  </div>
					  <div class="form-group">
					    <label  class="col-sm-5 control-label">单据编码：</label>
					    <div class="col-sm-6">
					      <input type="text" class="form-control" name="billsCode">
					    </div>
					  </div>
				  </div>
				  <div class="col-sm-4">
					  <div class="form-group">
					    <label  class="col-sm-5 control-label">单备注：</label>
					    <div class="col-sm-6">
					      <input type="text" class="form-control" name="remark">
					    </div>
					  </div>
					  <div class="form-group">
					    <label  class="col-sm-5 control-label">单据状态：</label>
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
					    <label  class="col-sm-5 control-label">串号：</label>
					    <div class="col-sm-6">
					    	<input type="text" class="form-control" name="imei">
					    </div>
					  </div>
				  </div>
				  <div class="col-sm-2"></div>
				  <div class="col-sm-8">
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


<!-- 引用在库串号录入 -->
<div class="modal fade" id="inputStorageImeiModal" tabindex="-1" role="dialog"  aria-hidden="false">
   <div class="modal-dialog" style="width:80%;" id="inputStorageImeiModal_body">
      <div class="modal-content">
	     <div class="modal-header">
	           <button type="button" class="close"  data-dismiss="modal" aria-hidden="true"> &times;</button>
	           <h4 class="modal-title">
	                                      引入在库串号
	           </h4>
	     </div>
         <div class="modal-body" style="margin-bottom: 20px;">
        	<div class="form-horizontal" role="form"> 
			    <!-- /S 表单控件  -->
				<div class="form-group">
				  <!-- 商品名称 -->
				  <label class="control-label" style="text-align: left;font-size: 16px;position: relative;left: 30px;"><span style="font-weight: normal;">商品信息：</span><span  id="goodsnameTitle2">dfd适当的anp</span></label>
				  <label class="control-label"  style="text-align: left;font-size:16px;position: relative;left: 150px;"><span style="font-weight: normal;">仓库名称：</span><span  id="storagenameTitle2">dfd适当的anp</span></label>
			      <input type="text" class="form-control" name="" id="dataGridRowId2" style="display: none;">
			      <input type="text" class="form-control" name="" id="dataGridIRow2" style="display: none;">
			      <button type="button" class="btn btn-w btn-info pull-right"  onclick="saveInputImei()" style="display: block;margin-left: 5px;margin-right: 18px;">保存</button>
			      <button type="button" class="btn btn-warning pull-right" data-dismiss="modal" style="display: block;margin-right: 10px;">取消</button>
				</div>
			</div>
			<div style="height: 30px;line-height: 30px;padding-left: 10px;padding-right: 10px;">
				<span class="pull-left">在库串号信息</span>
			</div>
			
			<div style="padding-left: 0px;padding-right: 0px;float: left;" id="inputStorageImeiModal_grid4">
				<!-- /S 表体 -->
				<div class="jqGrid_wrapper">
					<table id="dataGrid4"></table> 
				</div><!-- /E 表体 -->
			</div>
			<div style="padding-left: 0px;padding-right: 0px;float: left;width: 60px;" id="inputStorageImeiModal_tools">
				<div class="glyphicon glyphicon-fast-forward" onclick="inAllBtClick()" style="margin-left: 22px;margin-bottom: 20px;margin-top: 20px;cursor: pointer;"></div>
				<div class="glyphicon glyphicon-chevron-right" onclick="inBtClick()" style="margin-left: 22px;margin-bottom: 20px;margin-top: 20px;cursor: pointer;"></div>
				<div class="glyphicon glyphicon-fast-backward" onclick="outAllBtClick()" style="margin-left: 22px;margin-bottom: 20px;margin-top: 20px;cursor: pointer;"></div>
				<div class="glyphicon glyphicon-chevron-left" onclick="outBtClick()" style="margin-left: 22px;margin-bottom: 20px;margin-top: 20px;cursor: pointer;"></div>
			</div>			
			<div style="padding-left: 0px;padding-right: 0px;float: left;" id="inputStorageImeiModal_grid5">
				<span style="position: absolute;margin-left: 20px;margin-top: -26px;">已选择数：<span id="havedInputNum" >0</span></span>
				<!-- /S 表体 -->
				<div class="jqGrid_wrapper">
					<table id="dataGrid5"></table> 
				</div><!-- /E 表体 -->
			</div>
			<div style="padding-left: 0px;padding-right: 0px;float: left;min-height: 180px;width: 170px;margin-left: 13px;" id="inputStorageImeiModal_info">
				<textarea id="inputStorageImeiModal_info_text"  style="background-color: rgb(235, 235, 228);width: 170px;"></textarea>
			</div>
         </div>
	  </div>
	</div>
</div>

<!-- 收付款明细录入 -->
<div class="modal fade" id="payrecetiptDetailModal" tabindex="-1" role="dialog"  aria-hidden="true">
   <div class="modal-dialog" style="width:600px;min-height: 500px;">
      <div class="modal-content">
	     <div class="modal-header">
            <button type="button" class="close"  data-dismiss="modal" aria-hidden="true"> &times;</button>
            <h4 class="modal-title" id="payrecetiptDetailModalTitle">
                                 付款方式
            </h4>
         </div>
         <div class="modal-body">
			<!-- /S 表体 -->
			<div class="jqGrid_wrapper">
				<table id="dataGrid6"></table> 
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

<!-- 回车事件，数据大于2弹出框 -->
<div class="modal fade" id="keyData" tabindex="-1" role="dialog"  aria-hidden="true">
   <div class="modal-dialog" style="width:600px;min-height: 500px;">
      <div class="modal-content">
	     <div class="modal-header">
            <button type="button" class="close"  data-dismiss="modal" aria-hidden="true"> &times;</button>
            <h4 class="modal-title" id="payrecetiptDetailModalTitle">
             	出库串号选择
            </h4>
         </div>
         <div class="modal-body">
			<ul class="imeiKey" id="imeiUl">
			</ul>
         </div>
         <!-- 模态框底部部分 -->
         <div class="modal-footer">
            <button type="button" class="btn btn-default"  data-dismiss="modal">关闭</button>
         </div>
	  </div>
	</div>
</div>

