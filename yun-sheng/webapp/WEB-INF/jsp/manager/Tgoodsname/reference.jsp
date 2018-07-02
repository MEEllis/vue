<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML>
<html>
  <head>
    <title>商品引用</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<jsp:include page="../Include/import.jsp"></jsp:include>
	<link rel="stylesheet" type="text/css" href="${basePath}/js/jquery-easyui/themes/bootstrap/easyui.css">
	<link rel="stylesheet" type="text/css" href="${basePath}/js/jquery-easyui/themes/icon.css">

	<script type="text/javascript" src="${basePath}/js/jquery-easyui/jquery.easyui.min.js"></script>
	<script type="text/javascript">
		//全局变量
		var gl_groupId = ${groupId};//集团ID
		var basePath = "${basePath}";

	</script>
  </head>
  <body>
	<nav class="navbar navbar-default" role="navigation" style="padding-right: 5px;margin-bottom: 0px;">
	    <div class="container-fluid">
		    <div class="nav navbar-nav navbar-right">
		        <button type="button" class="btn btn-default navbar-btn" id="saveBt" style="display: none;" onclick="saveBtClick()">确定</button>
		    	<button type="button" class="btn btn-default navbar-btn hide" onclick="addGoodsNameBtnClick()">新增</button>
		        <button type="button" class="btn btn-default navbar-btn" onclick="cancleSelect()">取消</button>
		    </div>
	    </div>
	</nav><!-- /E 工具栏结束  -->
	
    <!-- S 主要区域 -->
	<div id="mainDIV" class="container-fluid">
		<div class="row">
			<div class="col-md-12">
			  <div  style="float: left;padding: 10px;padding-bottom: 0px;width:23%">
			  	<ul id="dataTree" class="ztree" style="min-height: 450px">
			    </ul>
			  </div>
			  <div style="width:75%;float:left;padding-left:10px">
			  <div class="menuTools" style="padding-top: 10px;">
				<div class="form-horizontal" role="form">
				  <div class="form-group">
				    <div class="col-sm-12">
				      <input type="text" class="form-control" id="goodsNameKeyWord" style="width:200px">
				    </div>
				  </div>
				</div>
			  </div>
			  <div class="jqGrid_wrapper" style="padding-top: 10px;">
				<table id="dataGrid" ></table> 
   				<div id=jqGridPager></div>
			  </div>
			</div>
			<div>
		</div>
	    
	</div><!-- /E 主要区域 -->

  </body>
  
  <!--加载自定义JS -->
  <script type="text/javascript" charset="utf-8" src="${basePath}/model/erp/model-goodsbrand.js"></script>
  <script type="text/javascript" charset="utf-8" src="${basePath}/model/erp/model-goodsclass.js"></script>
  <script type="text/javascript" charset="utf-8" src="${basePath}/model/erp/model-goodscolor.js"></script>
  <script type="text/javascript" charset="utf-8" src="${basePath}/model/erp/model-goodsname.js"></script>
  <script type="text/javascript" charset="utf-8" src="${basePath}/js/Tgoodsname/reference.js"></script>
  
</html>

<!-- 模态框（商品新增、修改） -->
<div class="modal fade" id="addAndEiditModalDialog" tabindex="-1" role="dialog" aria-hidden="true">
	<div class="modal-dialog" style="width:930px;">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				<h4 class="modal-title">新增窗口</h4>
			</div>
			<div class="modal-body">
				<!-- 新增商品档案   表单 -->			
				<form class="form-horizontal" role="form" style="width: 100%;height: 100%;padding: 5px;padding-top: 20px;">
				  <div class="col-sm-1"></div>
				  <div class="col-sm-5">
				  	  <div style="display:none;"><input type="text" class="form-control" name="id"></div> 
					  <div class="form-group">
					    <label for="firstname" class="col-sm-5 control-label">商品分类：</label>
					    <div class="col-sm-6">
					      <input class="easyui-combotree" id="goodsNameSelectClassTree" name="goodsCategoryId" data-options="url:'${basePath}/Tgoodsclass/findTreeForEasyUI?groupId=${groupId}',method:'post'" style="width:200px;height:32px;">
					    </div>
					  </div>
					  <div class="form-group">
					    <label for="lastname" class="col-sm-5 control-label">商品名称：</label>
					    <div class="col-sm-6">
					      <input type="text" class="form-control" name="name" placeholder="">
					    </div>
					  </div>
					  <div class="form-group">
					    <label for="lastname" class="col-sm-5 control-label">商品品牌：</label>
					    <div class="col-sm-6">
					      <select class="form-control input-sm" name="goodsBrandId" id="goodsBrandSelect">
					      </select>
					    </div>
					  </div>
					  <div class="form-group">
					    <label for="lastname" class="col-sm-5 control-label">网络制式：</label>
					    <div class="col-sm-6">
					      <select class="form-control input-sm" name="networkStandard">
					         <option value="1">GSM</option>
					         <option value="2">TD-SCDMA</option>
					         <option value="3">WCDMA</option>
					         <option value="4">TD-LTE</option>
					         <option value="5">FDD-LTE</option>
					         <option value="6">CDMA1X</option>
					         <option value="7">EVDO</option>
					      </select>
					    </div>
					  </div>
					  <div class="form-group">
					    <label for="lastname" class="col-sm-5 control-label">运营商：</label>
					    <div class="col-sm-6">
					      <select class="form-control input-sm" name="carrieroperator">
					         <option value="1">中国移动</option>
					         <option value="2">中国联通</option>
					         <option value="3">中国电信</option>
					      </select>
					    </div>
					  </div>
					  <div class="form-group">
					    <label for="lastname" class="col-sm-5 control-label">计价方式：</label>
					    <div class="col-sm-7">
					      <div class="checkbox">
					          <input name="valuationMethods" type="radio" value="1" checked="checked" />个别计价法&nbsp;&nbsp;
					          <input name="valuationMethods" type="radio" value="2" />移动加权平均价
					      </div>
					    </div>
					  </div> 
					  <div class="form-group">
					    <label for="lastname" class="col-sm-5 control-label">是否串号管理：</label>
					    <div class="col-sm-6">
					      <div class="checkbox">
					          <input type="checkbox" name="ifManageImei" id="ifManageImeiCheckbox"/>
					      </div>
					    </div>
					  </div>  
					  <div class="form-group ifManageImei">
					    <label for="lastname" class="col-sm-5 control-label">辅助串号管理：</label>
					    <div class="col-sm-6">
					      <div class="checkbox">
					          <input type="checkbox" name="ifEnableAuxliaryImei" id="ifEnableAuxliaryImeiCheckbox"/>
					      </div>
					    </div>
					  </div> 
				  </div>
				  <div class="col-sm-5">
					  <div class="form-group">
					    <label for="lastname" class="col-sm-5 control-label">商品编码：</label>
					    <div class="col-sm-6">
					      <input type="text" class="form-control" name="code" placeholder="">
					    </div>
					  </div>
					  <div class="form-group">
					    <label for="lastname" class="col-sm-5 control-label">商品型号：</label>
					    <div class="col-sm-6">
					      <input type="text" class="form-control" name="goodsModel" placeholder="">
					    </div>
					  </div>
					  <div class="form-group">
					    <label for="lastname" class="col-sm-5 control-label">商品颜色：</label>
					    <div class="col-sm-6">
					      <select class="form-control input-sm" name="goodsColorId" id="goodsColorSelect">
					      </select>
					    </div>
					  </div>
					  <div class="form-group">
					    <label for="lastname" class="col-sm-5 control-label">操作系统：</label>
					    <div class="col-sm-6">
					      <input type="text" class="form-control" name="opSystem" placeholder="">
					    </div>
					  </div>
					  <div class="form-group">
					    <label for="lastname" class="col-sm-5 control-label"></label>
					    <div class="col-sm-6">
					   	  <div style="height: 20px;"></div>
					    </div>
					  </div>
					  <div class="form-group">
					    <label for="lastname" class="col-sm-5 control-label">税率：</label>
					    <div class="col-sm-6">
					      <input type="text" class="form-control" name="taxRate" placeholder="">
					    </div>
					  </div> 				  
					  <div class="form-group ifManageImei">
					    <label for="lastname" class="col-sm-5 control-label">串号长度：</label>
					    <div class="col-sm-6">
					      <input type="text" class="form-control" name="imeiLength" placeholder="">
					    </div>
					  </div>
					  <div class="form-group ifEnableAuxliaryImei">
					    <label for="lastname" class="col-sm-5 control-label">辅助串号长度：</label>
					    <div class="col-sm-6">
					      <input type="text" class="form-control" name="auxliaryImeiLength" placeholder="">
					    </div>
					  </div>
				  </div>
				  <div class="col-sm-1"></div>
				</form>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-w btn-danger" onclick="addOrEiditGoodsNameBtnClick();">保存后新增</button>
				<button type="button" class="btn btn-w btn-info" onclick="addOrEiditGoodsNameBtnClick();">保存后关闭</button>
				<button type="button" class="btn btn-warning" data-dismiss="modal">仅关闭</button>
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal -->
</div>
