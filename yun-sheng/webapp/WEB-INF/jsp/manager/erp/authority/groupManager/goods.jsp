<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>商品档案   管理</title>

	<jsp:include page="../../../Include/import.jsp"></jsp:include>
	<%--<link rel="stylesheet" type="text/css" href="${basePath}/js/jquery-easyui/themes/bootstrap/easyui.css?v=${version}">--%>
	<%--<link rel="stylesheet" type="text/css" href="${basePath}/js/jquery-easyui/themes/icon.css?v=${version}">--%>
	<link rel="stylesheet" type="text/css" href="${basePath}/css/erp/authority/groupManager/managerGoodsPage.css?v=${version}" />
	<script type="text/javascript" src="${basePath}/js/jquery-ui.js?v=${version}"></script>


	 
	<script type="text/javascript">
		//全局变量
		var gl_groupId = "${groupId}";//集团ID
		var basePath = "${basePath}";
		var projectId;
		var companyId = "${companyId}";//公司Id

	</script>
	<style>
		/*.checkCss{display: inline-block; width:100% !important;}*/
		#addAndEiditGoodsClassModalDialog span.combo{ width:76%!important;}
		.bootstrap-select:not([class*=col-]):not([class*=form-control]):not(.input-group-btn) {
		    width: 171px;
		    padding-left: 0px;
		}
		.ui-jqgrid-bdiv{overflow-x:auto!important}
		th{font-weight:bold}
		/*#addAndEiditModalDialog input[type='text'],#addAndEiditModalDialog select{ width:160px;}*/
		.showModalBtn{
			position: absolute;
			top: 1px;
			right: -2px;
		}
		.showModalBtn .btn{
			height:34px;
			margin-top:-2px ;
		}
		#addAndEiditModalDialog .btn,#addAndEiditGoodsClassModalDialog .btn{
			height:34px;
		}
		#jqGridPager{
			height:44px;
		}
		.priceLen{
			width: 20px;
			height: 20px;
			line-height: 20px;
			text-align: center;
			font-size: 12px;
			background: #e4393c;
			color: #fff;
			display: inline-block;
			position: relative;
			top: -3px;
			border-radius: 50%;
		}
	</style>
  </head>
  <body>

    <!-- S 主要区域 -->
	<div id="mainDIV" class="container-fluid">
		<div class="row">                                       
			<div class="col-md-12">
				<!-- /S 工具栏开始  -->
				<div class="well" style="padding: 0px;margin-top: 20px;">
				<div id="AUTH" data-code="SPDA" class="btn-group btnHundred" role="group" style="margin-bottom: 0px;margin-top: 0px;">
			    	<button type="button" class="btn btn-default navbar-btn" onclick="addGoodsNameBtnClick()">新增</button>
			        <button type="button" class="btn btn-default navbar-btn" onclick="eiditGoodsNameBtnClick()">修改</button>
			        <button type="button" class="btn btn-default navbar-btn" onclick="delBtnClick()">删除</button>
			        <button type="button" class="btn btn-default navbar-btn" onclick="enabledBtnClick()">启用</button>
			        <button type="button" class="btn btn-default navbar-btn" onclick="disEnabledBtnClick()">禁用</button>
			         <button type="button" class="btn btn-default" onclick="window.location.reload()" style="display: inline-block;">刷新 </button>
			        <button type="button" class="btn btn-default navbar-btn goodsBrandgl" >品牌管理</button>
			        <button type="button" class="btn btn-default navbar-btn goodsColorgl" >颜色管理</button>
			        <button type="button" class="btn btn-default navbar-btn">打印</button>
			        <button type="button" class="btn btn-default navbar-btn" onclick="window.parent.openWorkBoxByMenutext('品牌导入','${basePath}/beginning/goodsbrand/toBrandPage ');">品牌导入</button>
			        <button type="button" class="btn btn-default navbar-btn" onclick="window.parent.openWorkBoxByMenutext('商品导入','${basePath}/beginning/goodsname/toPage');">商品导入</button>
			        <button type="button" class="btn btn-default navbar-btn" onclick="window.parent.openWorkBoxByMenutext('颜色导入','${basePath}/beginning/goodsbrand/toColorPage');">颜色导入</button>
			        <button type="button" class="btn btn-default navbar-btn" onclick="window.parent.openWorkBoxByMenutext('商品类别导入','${basePath}/beginning/goodsbrand/toTypePage');">商品类别导入</button>

				</div>
				</div>
			    <!-- S 工具栏 -->
			</div>
		</div>
		<div class="row" style="display: none;">
			<div class="col-md-12">
			  <h2 class="text-center" style='font-family:"Microsoft YaHei",微软雅黑,"MicrosoftJhengHei"'>商品档案</h2>
			</div>
		</div>
		<div class="row">
			<div class="col-md-12">   
			  <div class="col-sm-2">
				<nav class="navbar navbar-default" role="navigation"> 
				    <div class="container-fluid"> 
				        <ul class="nav navbar-nav"> 
				            <li><a onclick="addGoodsClassBtnClick()" style="cursor: pointer;padding: 5px 10px;"><span class="glyphicon glyphicon-user"></span> 添加</a></li> 
				            <li><a onclick="eiditGoodsClassBtnClick()" style="cursor: pointer;padding: 5px 10px;"><span class="glyphicon glyphicon-log-in"></span> 修改</a></li> 
				            <li><a onclick="delGoodsClass()" style="cursor: pointer;padding: 5px 10px;"><span class="glyphicon glyphicon-log-in"></span> 删除</a></li> 
				        </ul> 
				    </div> 
				</nav>
			  	<ul id="dataTree" class="ztree">
			    </ul>
			  </div>
			  <div class="menuTools col-sm-10" style="float: left;padding-top: 10px;">
				<form class="form-inline clearfix" role="form" style="line-height: 33px;">
					<div class="form-group col-sm-2">
						<label  >
							<button type="button" class="btn btn-primary mr15 actionBtn lineSet" id="line-set">列设置</button>
						</label>
						<label >
							<button type="button" class="btn btn-primary mr15 actionBtn" onclick="exportInfo()">导出</button>
						</label>

					</div>
				  <div class="form-group col-sm-4">
					<label class="width-25 control-label">商品查询:</label>
					<div class="col-sm-8 input-group">
					  <input type="text" class="form-control" id="goodsNameKeyWord"  placeholder="名称或编码"  />
					</div>
				  </div>
				  <div class="form-group col-sm-4">
					  <label class="mr15">
						  <input type="checkbox" id="goodsNameStatusCheckbox" class="isShowVoid" style="float: left;margin: 11px 5px;"> 显示禁用
					  </label>
				  </div>
				</form>
				  <div class="jqGrid_wrapper" >
					  <table id="dataGrid"></table>
					  <div id=jqGridPager></div>
				  </div>
			  </div>

			</div>
		</div>
	    
	</div><!-- /E 主要区域 -->

  </body>
  
  <!--加载自定义JS -->
  <script type="text/javascript" charset="utf-8" src="${basePath}/model/erp/model-goodsbrand.js?v=${version}"></script>
  <script type="text/javascript" charset="utf-8" src="${basePath}/model/erp/model-goodsclass.js?v=${version}"></script>
  <script type="text/javascript" charset="utf-8" src="${basePath}/model/erp/model-goodscolor.js?v=${version}"></script>
  <script type="text/javascript" charset="utf-8" src="${basePath}/model/erp/model-goodsname.js?v=${version}"></script>
  <script type="text/javascript" charset="utf-8" src="${basePath}/js/erp/authority/groupManager/goods.js?v=${version}"></script>
  <script src="${basePath}/js/cw/bootstrap/js/validator-company.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<!-- 菜单权限验证 -->
	<script type="text/javascript" src="${basePath}/js/erp/authority/menuValidation.js?v=${version}"></script>
	<script type="text/javascript">
		$(function(){
			checkRole('#inquire_option');
			//checkRole('#filterSearchForm');
		})
		
	</script>
  
</html>

<!-- 模态框（商品新增、修改） -->
<div class="modal" id="addAndEiditModalDialog" tabindex="-1" role="dialog" aria-hidden="true">
	<div class="modal-dialog" style="width:1030px;">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				<h4 class="modal-title">新增窗口</h4>
			</div>
			<div class="modal-body clearfix">
				<!-- 新增商品档案   表单 -->
				<div class="col-sm-8">
				<form class="form-inline clearfix" id="oldData" role="form" style="width: 100%;">

				  	  <div style="display:none;"><input type="text" class="form-control" name="id"></div> 
					  <div class="form-group col-sm-6">
					    <label for="goodsNameSelectClassTree" class="control-label">商品分类：</label>
					    <div class="input-group col-sm-8">
					      <input class="form-control cla checkCss" id="goodsNameSelectClassTree" name="goodsCategoryId" >
					    	<span style='color:red;'></span>
					    </div>
					  </div>
					<div class="form-group col-sm-6">
						<label  class="control-label">商品编码：</label>
						<div class="input-group col-sm-8">
							<input type="text" class="form-control checkCss codeAdd" name="code" placeholder="留空时系统自动编码" onblur='checkInput.checkStrNumCn(this,32);' />

						</div>
					</div>
					<div class="form-group col-sm-6">
						<label  class="control-label">商品品牌：</label>
						<div class="input-group col-sm-8">
							<input type="text" class="form-control checkCss " name="goodsBrandId" id="goodsBrandSelectC" />

						</div>
					</div>
					<div class="form-group col-sm-6">
						<label  class="control-label">商品型号：</label>
						<div class="input-group col-sm-8">
							<input type="text" class="form-control checkCss" name="goodsModel" id="goodsModelInput" maxlength="50" />
						</div>
					</div>
					<div class="form-group col-sm-6">
						<label  class="control-label">商品颜色：</label>
						<div class="input-group col-sm-8">
							<input type="text" class="form-control checkCss" name="goodsColorId" id="goodsColorSelectC"  />
							<%--   <select class="form-control input-sm checkCss " name="goodsColorId" id="goodsColorSelect">
                               </select>--%>
						</div>
					</div>
					<div class="form-group col-sm-6">
						<label  class="control-label">商品配置：</label>
						<div class="input-group col-sm-8">
							<input type="text" class="form-control checkCss" name="configure" id="goodsConfigureInput" maxlength="50" />
						</div>
					</div>
					  <div class="form-group col-sm-12">
					    <label  class="control-label">商品名称：</label>
					    <div class="input-group col-sm-9">
					    	 <input type="text" id="goodsNameField_" style="display: none;"/>
					        <input type="text" class="form-control nameAdd checkCss" name="name" id="goodsNameField" placeholder="" />
					   		<span style='color:red;'></span>
					    </div>
					  </div>
					<div class="form-group col-sm-12">
						<label  class="control-label">商品备注：</label>
						<div class="input-group col-sm-9">
							<input type="text" class="form-control checkCss " name="remark" id="goodsRemarkInput" maxlength="512" />
						</div>
					</div>

					  <div class="form-group col-sm-6">
					    <label  class="control-label">网络制式：</label>
					    <div class="input-group col-sm-6">
					      <select class="form-control input-sm checkCss " name="networkStandard" >
	
					      </select>
					    </div>
					  </div>
					<div class="form-group col-sm-6">
						<c:if test="${companyId != -1}">
							<label  class="control-label">商品条码：</label>
							<div class="input-group col-sm-6">
								<input type="text" class="form-control checkCss " name="barCode" placeholder=""  />
							</div>
						</c:if>
					</div>
					  <div class="form-group col-sm-5">
					    <label  class="control-label">运&ensp;营&ensp;商：</label>
					    <div class="input-group col-sm-8">
					      <select class="form-control input-sm checkCss " name="carrieroperator">
					      </select>
					    </div>
					  </div>
					<div class="form-group col-sm-7">
						<label  class="control-label">入库方式：</label>
						<div class="input-group col-sm-6">
							<div class="checkbox">
								<input name="storageMode" type="radio" value="1" checked="checked" id="storageMode_cg"/><label for="storageMode_cg" style="padding-left: 0;">采购入库</label>
								&emsp;<input name="storageMode" type="radio" value="2" id="storageMode_st"/><label for="storageMode_st" style="padding-left: 0;">受托入库</label>
							</div>
						</div>
					</div>
					<div class="form-group col-sm-5" style="display: none">
						<label  class="control-label">税率&ensp;(%)：</label>
						<div class="input-group col-sm-8">
							<input type="text" class="form-control checkCss DataFormat" name="taxRate" placeholder="" onblur='checkInput.checkNum(this,5);' />
						</div>
					</div>
					<div class="form-group col-sm-7">
					    <label  class="control-label">计价方式：</label>
					    <div class="input-group col-sm-6">
					      <div class="checkbox">
					          <input name="valuationMethods" id="gbValuationMethods" type="radio" value="1" disabled="disabled"/><label for="gbValuationMethods" style="padding-left: 0;">个别计价</label>&emsp;
					          <input name="valuationMethods" id="gbValuationMethods2" type="radio" value="2"  checked="checked" /><label for="gbValuationMethods2" style="padding-left: 0;">加权平均</label>
					      </div>
					    </div>
					  </div>
					<hr/>
					<div class="col-sm-6">
					  <div class="form-group " style="margin-top: 7px">
						  <div class="checkbox">
							  <input type="checkbox" name="ifManageImei" id="ifManageImeiCheckbox"/>
						  </div>
					      <label for="ifManageImeiCheckbox" class="control-label">串号管理</label>
						  <span class="imeibox">
							  <label  class=" control-label">串号长度：</label>
							  <div class="input-group col-sm-5">
								  <input type="text" class="form-control checkCss " name="imeiLength" placeholder="" >
							  </div>
						  </span>
					  </div>
					 <%--<div class="form-group ifManageImei col-sm-7">--%>
						<%----%>
					 <%--</div>--%>
					</div>
					<div class="col-sm-6">
					  <div class="form-group ifManageImei" style="margin-top: 7px">
						  <div class="checkbox">
							  <input type="checkbox" name="ifEnableAuxliaryImei" id="ifEnableAuxliaryImeiCheckbox"/>
						  </div>
					      <label for="ifEnableAuxliaryImeiCheckbox" class="control-label">辅助串号管理</label>
						  <span class=" ifEnableAuxliaryImei" >
							  <label  class="control-label">串号长度：</label>
							  <div class="input-group col-sm-3">
								  <input type="text" class="form-control checkCss " name="auxliaryImeiLength" placeholder="">
							  </div>
						  </span>
					  </div>




					</div>


				</form>
				</div>
				<div class="col-sm-4">
					<form id="priceGoods">
						<table class="table table-bordered table-condensed">
						<%--<thead>--%>
						<%--<tr>--%>
							<%--<th style="width: 100%">价格设置</th>--%>
						<%--</tr>--%>
						<%--</thead>--%>
							<div style="height: 34px;width: 100%;text-align: center;font-size: 16px; border: 1px solid #e6e6e6;line-height: 34px;">价格设置</div>
						<tbody>

							<tr>
								<td>集团指导价1</td>
								<td >
									<c:if test="${companyId != -1}">
										<input type="text" style="width:100px" name="groupGuidePrice1" readonly disabled>
									</c:if>
									<c:if test="${companyId == -1}">
										<input type="text" style="width:100px" name="groupGuidePrice1" >
									</c:if>
								</td>
							</tr>
							<tr>
								<td>集团指导价2</td>
								<td>
									<c:if test="${companyId != -1}">
										<input type="text" style="width:100px" name="groupGuidePrice2"  readonly disabled>
									</c:if>
									<c:if test="${companyId == -1}">
										<input type="text" style="width:100px" name="groupGuidePrice2" >
									</c:if>

								</td>
							</tr>
							<c:if test="${companyId != -1}">
							<tr>
								<td>零售价</td>
								<td >
									<input type="text" name="retailPrice" style="width:100px">
								</td>
							</tr>
							<tr>
								<td>最低零售价</td>
								<td>
									<input type="text" name="minRetailPrice" style="width:100px">
								</td>
							</tr>
							<tr>
								<td>最低批发价</td>
								<td >
									<input type="text" name="minWholesalePrice" style="width:100px">
								</td>
							</tr>
							<tr>
								<td>预设进价</td>
								<td>
									<input type="text" name="presetPrice" style="width:100px">
								</td>
							</tr>
							<tr>
								<td style="color: #0066FF;cursor: pointer;" class="kaoheModel">部门考核价 <span class="priceLen" style="display: none"></span></td>
								<td >
									<input type="text" name="storeVisiblePrice" style="width:100px">
								</td>
							</tr>
								<tr>
									<td>调拨价</td>
									<td>
										<input type="text" name="transferPrice" style="width:100px">
									</td>
								</tr>
							<tr>
								<td>售价1</td>
								<td>
									<input type="text" name="salesPrice1" style="width:100px">
								</td>
							</tr>
							<tr>
								<td>售价2</td>
								<td >
									<input type="text" name="salesPrice2" style="width:100px">
								</td>
							</tr>
							<tr>
								<td>售价3</td>
								<td>
									<input type="text" name="salesPrice3" style="width:100px">
								</td>
							</tr>
							<tr>
								<td>售价4</td>
								<td >
									<input type="text" name="salesPrice4" style="width:100px">
								</td>
							</tr>
							<tr>
								<td>售价5</td>
								<td>
									<input type="text" name="salesPrice5" style="width:100px">
								</td>
							</tr>
							</c:if>

						</tbody>

					</table>
					</form>
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-w btn-danger" onclick="addOrEiditGoodsNameBtnClick(1);" id="saveAndAddBtn">保存后新增</button>
				<button type="button" class="btn btn-w btn-info" onclick="addOrEiditGoodsNameBtnClick(0);" id="saveAndCloseBtn">保存后关闭</button>
				<button type="button" class="btn btn-warning" data-dismiss="modal">仅关闭</button>
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal -->
</div>

<!-- 模态框（品牌管理） -->
<div class="modal" id="goodsBrandModalDialog" tabindex="-1" role="dialog" aria-hidden="true">
	<div class="modal-dialog" style="width:631px;">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				<h4 class="modal-title">品牌管理</h4>
			</div>
			<div class="modal-body" style="width: 600px">
			  <span class="btn btn-default" onclick="addGoodsBrandBtnClick()">新增</span>
			  <span class="btn btn-default" onclick="enabledGrandBtnClick()">启用</span>
			  <span class="btn btn-default" onclick="disEnabledGrandBtnClick()">禁用</span>
			  <span class="btn btn-default" onclick="" style="display: none;">导出</span>
			  <div style="height: 5px;"></div>
			  <div class="jqGrid_wrapper">
				<table id="goodsBrandDataGrid"></table> 
   				<div id=goodsBrandGridPager></div>
			  </div>	
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-warning" data-dismiss="modal">关闭</button>
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal -->
</div>

<!-- 模态框（新增品牌） -->
<div class="modal" id="addGoodsBrandModalDialog" tabindex="-1" role="dialog" aria-hidden="true">
	<div class="modal-dialog" style="width:531px;">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				<h4 class="modal-title">新增品牌</h4>
			</div>
			<div class="modal-body">
				<!-- 表单 -->			
				<form class="form-horizontal" role="form" style="width: 100%;padding: 5px;padding-top: 20px;">
				  <div class="col-sm-12">
					  <!-- 字段开始-->
					  <div class="form-group">
					    <label for="firstname" class="col-sm-4 control-label">编码：</label>
					    <div class="col-sm-5">
					      <input type="text" class="form-control" name="code" placeholder=""  onblur='checkInput.clearNoText(this,32);' />
					    </div>
					  </div>
					  <div class="form-group">
					    <label for="firstname" class="col-sm-4 control-label">名称：</label>
					    <div class="col-sm-5">
					      <input type="text" class="form-control" name="name" placeholder=""  onblur='checkInput.clearNoText(this,32);' />
					    </div>
					  </div>
					  <div class="form-group">
					    <label for="ifCreateGoodsClass" class="col-sm-4 control-label"></label>
					    <div class="col-sm-5">
					      <div class="checkbox">
					        <label>
					          <input type="checkbox"  id="ifCreateGoodsClass"  name="ifCreateGoodsClass"/>是否建立商品分类
					        </label>
					      </div>
					    </div>
					  </div>
					  <div class="form-group extAttr">
					    <label  class="col-sm-4 control-label">上级类别：</label>
					    <div class="col-sm-5">
					      <input class="easyui-combotree" id="addBrandForClassParentId" name="parentId" data-options="url:'${basePath}/Tgoodsclass/findTreeForEasyUI',method:'post'" style="width:174px;height:32px;">
					    </div>
					  </div>
					  <div class="form-group extAttr">
					    <label  class="col-sm-4 control-label">类别编码：</label>
					    <div class="col-sm-5">
					      <input type="text" class="form-control" name="code2" placeholder="" onblur='checkInput.checkStrNum(this,32);' />
					    </div>
					  </div>
					  <div class="form-group extAttr">
					    <label for="managerOrNot" class="col-sm-4 control-label">是否串号管理：</label>
					    <div class="col-sm-1">
					      <div class="checkbox">
					        <label>
					          <input type="checkbox" value="" checked="checked" name="ifManageImei" id="managerOrNot"/>
					        </label>
					      </div>
					    </div>
					    <label for="ifChooseColor_color" class="col-sm-3 control-label">是否必选颜色：</label>
					    <div class="col-sm-1">
					      <div class="checkbox">
					        <label>
					          <input type="checkbox" value="" checked="checked"  name="ifChooseColor" id="ifChooseColor_color"/>
					        </label>
					      </div>
					    </div>
					  </div>
		              <!-- 字段结束-->
				  </div>
				</form>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-info" onclick="addGoodsGrandSave()">保存</button>
				<button type="button" class="btn btn-warning" data-dismiss="modal">关闭</button>
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal -->
</div>

<!-- 模态框（编辑品牌） -->
<div class="modal" id="eidtGoodsBrandModalDialog" tabindex="-1" role="dialog" aria-hidden="true">
	<div class="modal-dialog" style="width:531px;">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				<h4 class="modal-title">编辑品牌</h4>
			</div>
			<div class="modal-body">
				<!-- 表单 -->			
				<form class="form-horizontal" role="form" style="width: 100%;padding: 5px;padding-top: 20px;">
				  <div class="col-sm-10">
					  <div style="display: none;"><input type="text" class="form-control" name="id" placeholder=""></div>
					  <div class="form-group">
					    <label for="firstname" class="col-sm-4 control-label">编码：</label>
					    <div class="col-sm-5">
					      <input type="text" class="form-control" name="code" placeholder=""  onblur='checkInput.clearNoText(this,32);' />
					    </div>
					  </div>
					  <div class="form-group">
					    <label for="firstname" class="col-sm-4 control-label">名称：</label>
					    <div class="col-sm-5">
					      <input type="text" name="rowId" style="display: none;"/>
					      <input type="text" class="form-control" name="name" placeholder=""  onblur='checkInput.clearNoText(this,32);' />
					    </div>
					  </div>
				  </div>
				</form>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-info" onclick="eiditGoodsGrandSave()">保存</button>
				<button type="button" class="btn btn-warning" data-dismiss="modal">关闭</button>
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal -->
</div>

<!-- 模态框（颜色管理） -->
<div class="modal" id="goodsColorModalDialog" tabindex="-1" role="dialog" aria-hidden="true">
	<div class="modal-dialog" style="width:631px;">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				<h4 class="modal-title">颜色管理</h4>
			</div>
			<div class="modal-body">
			  <span class="btn btn-default" onclick="addGoodsColorBtnClick()">新增</span>
			  <span class="btn btn-default" onclick="enabledColorBtnClick()">启用</span>
			  <span class="btn btn-default" onclick="disEnabledColorBtnClick()">禁用</span>
				  <span class="btn btn-default" onclick="()" style="display: none;">导出</span>
			  <div style="height: 5px;"></div>
			  <div class="jqGrid_wrapper">
				<table id="goodsColorDataGrid"></table> 
   				<div id=goodsColorGridPager></div>
			  </div>	
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-warning" data-dismiss="modal">关闭</button>
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal -->
</div>


<!-- 模态框（新增颜色） -->
<div class="modal" id="addGoodsColorModalDialog" tabindex="-1" role="dialog" aria-hidden="true">
	<div class="modal-dialog" style="width:531px;">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				<h4 class="modal-title">新增颜色</h4>
			</div>
			<div class="modal-body">
				<!-- 表单 -->			
				<form class="form-horizontal" role="form" style="width: 100%;padding: 5px;padding-top: 20px;">
				  <div class="col-sm-12">
					  <!-- 字段开始-->
					  <div class="form-group">
					    <label for="firstname" class="col-sm-4 control-label">编码：</label>
					    <div class="col-sm-5">
					      <input type="text" class="form-control" name="code" placeholder=""  onblur='checkInput.checkNotChars(this,32);' />
					    </div>
					  </div>
					  <div class="form-group">
					    <label for="firstname" class="col-sm-4 control-label">名称：</label>
					    <div class="col-sm-5">
					      <input type="text" class="form-control" name="name" placeholder=""  onblur='checkInput.checkNotChars(this,32);' />
					    </div>
					  </div>
		              <!-- 字段结束-->
				  </div>
				</form>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-info" onclick="addGoodsColorSave()">保存</button>
				<button type="button" class="btn btn-warning" data-dismiss="modal">关闭</button>
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal -->
</div>

<!-- 模态框（编辑颜色） -->
<div class="modal" id="eidtGoodsColorModalDialog" tabindex="-1" role="dialog" aria-hidden="true">
	<div class="modal-dialog" style="width:531px;">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				<h4 class="modal-title">编辑颜色</h4>
			</div>
			<div class="modal-body">
				<!-- 表单 -->			
				<form class="form-horizontal" role="form" style="width: 100%;padding: 5px;padding-top: 20px;">
				  <div class="col-sm-10">
					  <div style="display: none;"><input type="text" class="form-control" name="id" placeholder=""></div>
					  <div class="form-group">
					    <label for="firstname" class="col-sm-4 control-label">编码：</label>
					    <div class="col-sm-5">
					      <input type="text" class="form-control" name="code" placeholder=""  onblur='checkInput.checkNotChars(this,32);' />
					    </div>
					  </div>
					  <div class="form-group">
					    <label for="firstname" class="col-sm-4 control-label">名称：</label>
					    <div class="col-sm-5">
					      <input type="text" name="rowId" style="display: none;"/>
					      <input type="text" class="form-control" name="name" placeholder=""  onblur='checkInput.checkNotChars(this,32);' />
					    </div>
					  </div>
				  </div>
				</form>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-info" onclick="eiditGoodsColorSave()">保存</button>
				<button type="button" class="btn btn-warning" data-dismiss="modal">关闭</button>
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal -->
</div>

<!-- 模态框（新增商品类别） -->
<div class="modal" id="addAndEiditGoodsClassModalDialog" tabindex="-1" role="dialog" aria-hidden="true">
	<div class="modal-dialog" style="width:830px;">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				<h4 class="modal-title">新增窗口</h4>
			</div>
			<div class="modal-body">
				<!-- 新增商品类别   表单 -->			
				<form class="form-horizontal" role="form" style="width: 100%;padding: 5px;padding-top: 20px;">
				  <div style="display:none;">
				  	<input type="text" class="form-control" name="id" placeholder="">
				  	<input type="text" class="form-control" name="status" placeholder="">
				  </div>
				  <div class="col-sm-1"></div>
				  <div class="col-sm-11">
					  <div class="form-group">
					    <label for="firstname" class="col-sm-4 control-label">集团：</label>
					    <div class="col-sm-4">
					      <select class="form-control input-sm checkCss" name="groupId">
					         <option value="${groupId}" selected="selected">${SESSION_KEY_USER.groupName }</option>
					      </select>
					    </div>
					  </div>
					  <div class="form-group">
					    <label  class="col-sm-4 control-label">上级类别：</label>
					    <div class="col-sm-4 input-group">
					      <input class="form-control checkCss" id="addGoodsClassParentIdTree" name="parentId" style="width:200px;height:34px;">
					    </div>
					  </div>
					  <div class="form-group">
					    <label  class="col-sm-4 control-label">编码：</label>
					    <div class="col-sm-4">
					      <input type="text" class="form-control checkCss codeCla" name="code" placeholder="" onblur='checkInput.clearNoText(this,32);' />
					    	<span style='color:red;'></span>
					    </div>
					  </div>
					  <div class="form-group">
					    <label  class="col-sm-4 control-label">名称：</label>
					    <div class="col-sm-4">
					      <input type="text" class="form-control checkCss nameCla" name="name" placeholder="类别名称(反斜杠\将转为斜杠/)" onblur='checkInput.clearNoText(this,32);' />
					    	<span style='color:red;'></span>
					    </div>
					  </div>
					  <div class="form-group">
					    <label  class="col-sm-4 control-label">备注：</label>
					    <div class="col-sm-4">
					      <input type="text" class="form-control checkCss" name="remark" placeholder="" maxLength=100 />
					    </div>
					  </div>
					  <div class="form-group">
					    <label for="ifManageImei_OrNot" class="col-sm-4 control-label">是否串号管理：</label>
					    <div class="col-sm-1">
					      <div class="checkbox">
					        <label>
					          <input type="checkbox" value="" checked="checked" name="ifManageImei" id="ifManageImei_OrNot"/>
					        </label>
					      </div>
					    </div>
					    <label for="ifChooseColor_OrNot" class="col-sm-4 control-label">是否必选颜色：</label>
					    <div class="col-sm-1">
					      <div class="checkbox">
					        <label>
					          <input type="checkbox" value="" checked="checked"  name="ifChooseColor" id="ifChooseColor_OrNot"/>
					        </label>
					      </div>
					    </div>
					  </div>
				  </div>  
				</form>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-w btn-danger" id="classSaveAndAdd" onclick="addOrEiditGoodsClassSave(1);">保存后新增</button>
				<button type="button" class="btn btn-w btn-info" id="classSave" onclick="addOrEiditGoodsClassSave(2);">保存后关闭</button>
				<button type="button" class="btn btn-warning" data-dismiss="modal">仅关闭</button>
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal -->
</div>
<%--列设置模态框--%>
<div id="lineSet-modal" class="modal" tabindex="-1" role="dialog" aria-hidden="true">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title">列设置</h4>
			</div>
			<div class="modal-body" style="width:600px;">
				<table id='lineSetGrid'></table>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default sureLineSet" data-dismiss="modal" onclick="sureLineSet()">确认</button>
				<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
			</div>
		</div>
	</div>
</div>
<%--部门考核成本设置模态框--%>
<div id="bmkhcbModal" class="modal" tabindex="-1" role="dialog" aria-hidden="true">
	<div class="modal-dialog" role="document" style="width:850px;">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title">特殊部门成本设置</h4>
			</div>
			<div class="modal-body" >
				<div class="col-xs-4"><ul id="TreeDom" class="ztree"></ul></div>
				<div class="col-xs-8">
					<div class="row" style="padding-left:16px;padding-bottom:3px">
						<input type="text" class="form-control" id="searchStore" placeholder="请输入部门编码和部门名称" style="width:96%"></div>
					<table id='bmkhcbGrid'></table>
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal" id="surebmcbSet">保存修改</button>
				<button type="button" class="btn btn-default" data-dismiss="modal" id="giveSet">放弃修改</button>
			</div>
		</div>
	</div>
</div>