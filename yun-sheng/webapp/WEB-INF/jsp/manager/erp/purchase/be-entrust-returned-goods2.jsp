<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>受托退货</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!-- 引入文件 -->
	<jsp:include page="../../Include/import.jsp"></jsp:include>
	<link rel="stylesheet" type="text/css" href="${basePath}/css/base.css?v=${version}"/>
	<link rel="stylesheet" type="text/css" href="${basePath}/css/erp/funds/funds-base.css?v=${version}" />
	<style>
	#dataGrid_addRowId{
		display:none;
	}
	</style>
	<script type="text/javascript">
	
		//**********全局变量
		//基本目录
		var basePath = "${basePath}";

	</script>
  </head>
 
  <body>
	<div class="container-fiuled">
	    <div class=" gridTools">
	        <div class="col-md-12">
				<div class="" style="padding: 0px;margin-top: 10px;">
 				<div id="AUTH" data-code="STTHD" class="btn-group btnHundred">
			    	<button type="button" class="btn btn-default navbar-btn" onclick="firstPage()">首单</button>
			        <button type="button" class="btn btn-default navbar-btn" onclick="backPage()">上一单</button>
			        <button type="button" class="btn btn-default navbar-btn" onclick="nextPage()">下一单</button>
			        <button type="button" class="btn btn-default navbar-btn" onclick="lastPage()">末单</button>
			        <button type="button" class="btn btn-default navbar-btn" onclick="addBtClick()">新增</button>
			        <button type="button" class="btn btn-default navbar-btn" onclick="saveBtClick()">保存</button>
			        <button type="button" class="btn btn-default navbar-btn delBt" onclick="delBtClick()">删除</button>
			        <button type="button" class="btn btn-default navbar-btn checkBt" onclick="checkBtClick()">过账</button>
			        <button type="button" class="btn btn-default navbar-btn forceFinish" onclick="forceFinishBtClick()">红冲</button>
			        <button type="button" class="btn btn-default navbar-btn" onclick="print()">打印</button>
			        <button type="button" class="btn btn-default navbar-btn" onclick="filterBtClick()">过滤</button>
			        <button type="button" class="btn btn-default navbar-btn" onclick="refreshBtClick()">刷新</button>
			        <button type="button" class="btn btn-default navbar-btn" onclick="copyBtClick()">复制</button>
	  			  			  			  
				    <div class="slideThree">
						<input type="checkbox" value="1" id="slideThree" name="check" checked="checked"/>
						<label for="slideThree"></label>
				    </div>
				</div>
				</div>
	        </div>
	    </div>
	    <div class=" gridTop">
	        <div class="col-md-12">
				<!-- /S 表头  -->
				<form class="well form-horizontal" role="form" id="topForm"> 
				  <!-- /S 表单控件  -->
				  <div class="formBtn">
					<div class="form-group">
					  <label class="col-sm-3 control-label">单据编号:</label>
					  <div class="col-sm-8">
		                <div class="input-group">
					    <input type="text" class="form-control" name="billsCode" readonly="readonly">
					    <input type="text" class="form-control" name="id" style="display: none;">
					  </div></div>
					</div>
				  </div>			  
				  <div class="formBtn">
					<div class="form-group">
					    <label for="firstname" class="col-sm-3 control-label">单据日期:</label>
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
		                    <input type="text" class="form-control" name="sectionId" style="display: none;">
		                    <input type="text" class="form-control" name="sectionName">
		                    <span class="input-group-addon">
		                    	<span class="glyphicon glyphicon-plus" style="cursor: pointer;" onclick="selectSectionReferenceOpen()"></span>
		                    </span>
		                </div><!-- /input-group -->
					  </div>
					</div>
				  </div>
				  <div class="formBtn">
					<div class="form-group">
					  <label class="col-sm-3 control-label">往来单位:</label>
					  <div class="col-sm-8">
		                <div class="input-group">
		                    <input type="text" class="form-control" name="contactsunitName">
		                    <input type="text" class="form-control" name="contactsunitId" style="display: none;">
		                    <span class="input-group-addon">
		                    	<span class="glyphicon glyphicon-plus" style="cursor: pointer;" onclick="selectContactUnitReferenceOpen()"></span>
		                    </span>
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
					  <label class="col-sm-3 control-label">经手人:</label>
					  <div class="col-sm-8">
		                <div class="input-group">
		                    <input type="text" class="form-control" name="managersUid" style="display: none;">
		                    <input type="text" class="form-control" name="managersName">
		                    <span class="input-group-addon">
		                    	<span class="glyphicon glyphicon-plus" style="cursor: pointer;" onclick="selectEmployeeReferenceOpen()"></span>
		                    </span>
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
	    <div class="row gridBody" style="padding-top: 0px;">
	        <div class="col-md-12">
	        		<div class="row">
	        			<div class="col-md-3">
			        		<div class="form-horizontal" role="form" style="margin-top: 5px;"> 
								<div class="form-group">
								  <label class="col-sm-4 control-label">出库串号:</label>
								  <div class="col-sm-8 wiRes">
								    <input type="text" class="form-control searchImei" value="" onkeyup='checkInput.clearNoNum(this,20);' >
								    <div class="none-cx" style="display: none;">
							     	 	<ul id="imeiUl" style="max-height: 300px;">
                  
							     	 	</ul>
							     	 </div>
								  </div>
								</div>
							</div>
						</div>
	        			<div class="col-md-3">
			        		<button type="button" class="btn btn-default" onclick="selectBeentrustStockReferenceOpen()">引用受托未结算数据</button>
						</div>
					</div>
					<!-- /S 表体 -->
					<div class="row" style="margin-left: 0px;margin-right: 0px;">
						<div class="jqGrid_wrapper">
							<table id="dataGrid"></table> 
						</div><!-- /E 表体 -->
					</div>
	        </div>
	    </div>
	    <div class="row gridBottom">
	        <div class="col-sm-12">
				<!-- /S 表头  -->
				<form class="form-horizontal" role="form" id="bottomForm"> 
				  <!-- /S 表单控件  -->
				  <div class="formBtnSM" style="width:260px">
					<div class="form-group">
					  <label class="col-sm-7 control-label">公司名称:</label>
					  <div class="col-sm-5">
					    <input type="text" class="form-control" name="companyId" style="display: none;">
					    <input type="text" class="form-control" name="companyName" disabled="disabled" style="width:150px">
					  </div>
					</div>
				  </div>
				  <div class="formBtnSM" style="width:260px">
					<div class="form-group">
					  <label class="col-sm-7 control-label">制单人:</label>
					  <div class="col-sm-5">
					    <input type="text" class="form-control" name="createBy" style="display: none;">
					    <input type="text" class="form-control" name="createByName" disabled="disabled" style="width:150px">
					  </div>
					</div>
				  </div>
				  <div class="formBtnSM" style="width:260px">
					<div class="form-group">
					  <label class="col-sm-7 control-label">修改人:</label>
					  <div class="col-sm-5">
					    <input type="text" class="form-control" name="lastupdateBy" style="display: none;">
					    <input type="text" class="form-control" name="lastupdateByName" disabled="disabled" style="width:150px">
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
	</div>
  
	<!-- 引用自定义JS文件 -->
	<script type="text/javascript" src="${basePath}/model/erp/model-bills.js?v=${version}"></script>
	<script type="text/javascript" src="${basePath}/js/erp/purchase/be-entrust-returned-goods2.js?v=${version}"></script>
	<script type="text/javascript" src="${basePath}/js/erp/funds/validator.js?v=${version}"></script>
	<script type="text/javascript" src="${basePath}/js/base.js?v=${version}"></script>
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
					    <label for="lastname" class="col-sm-5 control-label">结束日期：</label>
					    <div class="col-sm-6">
							<input type="text" class="form-control" name="billsDateEnd" id="billsDateEnd" onblur='checkInput.checkTime(this,"#billsDateBegin","#billsDateEnd");' >
					    </div>
					  </div>
					  <div class="form-group">
					    <label for="lastname" class="col-sm-5 control-label">往来单位：</label>
					    <div class="col-sm-6">
			                <div class="input-group">
			                    <input type="text" class="form-control" name="contactsunitIdListStr" style="display: none;">
			                    <input type="text" class="form-control" id="contactsunitIdListStr">
			                    <span class="input-group-addon">
			                    	<span class="glyphicon glyphicon-plus" style="cursor: pointer;" onclick="selectContactUnitReferenceForFiterOpen()"></span>
			                    </span>
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
			                    <span class="input-group-addon">
			                    	<span class="glyphicon glyphicon-plus" style="cursor: pointer;" onclick="selectSectionReferenceForFiterOpen('sectionIdListStr')"></span>
			                    </span>
			                </div><!-- /input-group -->
					    </div>
					  </div>
					  <div class="form-group">
					    <label for="lastname" class="col-sm-5 control-label">商品名称：</label>
					    <div class="col-sm-6">
			                <div class="input-group">
			                    <input type="text" class="form-control" name="goodsNameIdListStr" style="display: none;">
			                    <input type="text" class="form-control" id="goodsNameIdListStr">
			                    <span class="input-group-addon">
			                    	<span class="glyphicon glyphicon-plus" style="cursor: pointer;" onclick="selectGoodsNameReferenceForFiterOpen()"></span>
			                    </span>
			                </div><!-- /input-group -->
					    </div>
					  </div>
					  <div class="form-group">
					    <label for="lastname" class="col-sm-5 control-label">单据编码：</label>
					    <div class="col-sm-6">
					      <input type="text" class="form-control" name="billsCode">
					    </div>
					  </div>
				  </div>
				  <div class="col-sm-4">
					  <div class="form-group">
					    <label for="lastname" class="col-sm-5 control-label">单备注：</label>
					    <div class="col-sm-6">
					      <input type="text" class="form-control" name="remark">
					    </div>
					  </div>
					  <div class="form-group">
					    <label for="lastname" class="col-sm-5 control-label">单据状态：</label>
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
					    <label for="lastname" class="col-sm-5 control-label">串号：</label>
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

<!-- 往来单位引用 -->
<div class="modal fade" id="contactUnitReferenceModal" tabindex="-1" role="dialog"  aria-hidden="true">
   <div class="modal-dialog" style="width:930px;">
      <div class="modal-content">
	     <div class="modal-header">
            <button type="button" class="close"  data-dismiss="modal" aria-hidden="true"> &times;</button>
            <h4 class="modal-title">
                                  往来单位引用
            </h4>
         </div>
         <div class="modal-body">
			<iframe name="contactUnitReferenceFrame" class="referenceFrame" frameborder="0" style="width: 100%;height:400px;" src="${basePath}/TcontactUnit/reference"></iframe>
         </div>
	  </div>
	</div>
</div>

<!-- 部门引用 -->
<div class="modal fade" id="sectionReferenceModal" tabindex="-1" role="dialog"  aria-hidden="true">
   <div class="modal-dialog" style="width:930px;">
      <div class="modal-content">
	     <div class="modal-header">
            <button type="button" class="close"  data-dismiss="modal" aria-hidden="true"> &times;</button>
            <h4 class="modal-title">
                                  部门引用
            </h4>
         </div>
         <div class="modal-body">
			<iframe name="sectionReferenceFrame" class="referenceFrame" frameborder="0" style="width: 100%;height:400px;" src="${basePath}/section/reference?opEmpId=${SESSION_KEY_USER.id}"></iframe>
         </div>
	  </div>
	</div>
</div>

<!-- 职员引用 -->
<div class="modal fade" id="employeeReferenceModal" tabindex="-1" role="dialog"  aria-hidden="true">
   <div class="modal-dialog" style="width:930px;">
      <div class="modal-content">
	     <div class="modal-header">
            <button type="button" class="close"  data-dismiss="modal" aria-hidden="true"> &times;</button>
            <h4 class="modal-title">
                                  职员引用
            </h4>
         </div>
         <div class="modal-body">
			<iframe name="employeeReferenceFrame" class="referenceFrame" frameborder="0" style="width: 100%;height:400px;" src="${basePath}/Temployee/reference"></iframe>
         </div>
	  </div>
	</div>
</div>

<!-- 受托库存引用 -->
<div class="modal fade" id="beentrustStockReferenceModal" tabindex="-1" role="dialog"  aria-hidden="true">
   <div class="modal-dialog" style="width:930px;">
      <div class="modal-content">
         <div class="modal-body">
			<iframe name="beentrustStockReferenceFrame" class="referenceFrame" id="beentrustStockReferenceFrame" frameborder="0" style="width: 100%;" src="${basePath}/IcashBeentrustStock/referenceForReturnGoods"></iframe>
         </div>
	  </div>
	</div>
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
         <div class="modal-body" style="padding: 0px;">
			<iframe name="goodsnameReferenceFrame" class="referenceFrame" frameborder="0" style="width: 100%;height:400px;" src="${basePath}/Tgoodsname/reference"></iframe>
         </div>
	  </div>
	</div>
</div>