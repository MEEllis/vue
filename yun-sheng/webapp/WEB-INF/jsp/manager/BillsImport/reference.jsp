<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML>
<html>
  <head>
    <title>单据引入</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<jsp:include page="../Include/import.jsp"></jsp:include>
	<link rel="stylesheet" type="text/css" href="${basePath}/css/BillsImport/base.css" />
	<style type="text/css">
	.form-group {
	    margin-bottom: 0px;
	}
	.gridBody {
	    padding: 15px;
	    padding-top: 5px;
	}
	</style>
	<script type="text/javascript">
		//全局变量
		var basePath = "${basePath}";
		var billsQZ = "${billsQZ}";
		var defaultSelectBillsQZ = "${defaultSelectBillsQZ}";
	</script>
  </head>
  <body>
    <div style="position: absolute;top:0px;left:0px;width: 100%;height: 100%;z-index: 9999999;" id="loadingDiv">
      <div style="position: absolute;top:50%;left:50%;margin-left: -64px;margin-top: -64px;width:128px;height:128px;background-image: url(${basePath}/images/loading.gif);"></div>
    </div>
	<div class="container-fiuled" style="padding-top: 60px;">
	    <div class="row gridTop" style="padding-top: 0px;">
	        <div class="col-md-12">
				<!-- /S 表头  -->
				<form class="well form-horizontal" role="form" id="topForm"> 
				  <div class="formBtn">
					<div class="form-group">
					  <label class="col-sm-3 control-label">部门名称:</label>
					  <div class="col-sm-8">
		                 <input type="text" class="form-control" name="sectionId" value="" style="display: none;" >
		                 <input type="text" class="form-control" name="sectionName" readonly="readonly">
					  </div>
					</div>
				  </div>
				  <!-- /S 表单控件  -->
				  <div class="formBtn">
					<div class="form-group">
					  <label class="col-sm-3 control-label">单据编号:</label>
					  <div class="col-sm-8">
					    <input type="text" class="form-control" name="billsCode">
					  </div>
					</div>
				  </div>		
				  <div class="formBtn">
					<div class="form-group">
					    <label for="firstname" class="col-sm-3 control-label">单据类型:</label>
					    <div class="col-sm-8">
				  			<select id="billsTypeSelect" name="billsTypeSelect" class="form-control"  style="width: 160px;">
								<optgroup label="采购">
									<option name="CGRK" value="CG-CGRK">采购入库单</option>
									<option name="CGTH" value="CG-CGTH">采购退货单</option>
									<option name="STRK" value="CG-STRK">受托入库单</option>
									<option name="STTH" value="CG-STTH">受托退货单</option>
								</optgroup>
								<optgroup label="仓储">
									<option value="" disabled="disabled">调拨出库单</option>
									<option value="" disabled="disabled">调拨入库单</option>
								</optgroup>
								<optgroup label="其它出库">
									<option value="QTRK" disabled="disabled">其它入库单</option>
									<option value="QTCK" disabled="disabled">其它出库单</option>
								</optgroup>
								<optgroup label="借出">
									<option value="SPJR" disabled="disabled">商品借入单</option>
									<option value="SPJC" disabled="disabled">商品借出单</option>
								</optgroup>
								<optgroup label="销售">
									<option value="XSD" disabled="disabled">销售单</option>
									<option value="XSTH" disabled="disabled">销售退货单</option>
								</optgroup>
								<optgroup label="零售">
									<option value="" disabled="disabled">零售单</option>
									<option value="LSTHD" disabled="disabled">零售退货单</option>
								</optgroup>
							</select>
					    </div>
					</div>
				  </div>
	  
				  <div class="formBtn">
					<div class="form-group">
					    <label for="firstname" class="col-sm-3 control-label">开始日期:</label>
					    <div class="col-sm-8">
							<input type="text" class="form-control" name="billsDateBegin" id="billsDateBegin">
					    </div>
					</div>
				  </div>
				  <div class="formBtn">
					<div class="form-group">
					    <label for="firstname" class="col-sm-3 control-label">结束日期:</label>
					    <div class="col-sm-8">
							<input type="text" class="form-control" name="billsDateEnd" id="billsDateEnd">
					    </div>
					</div>
				  </div>
				  <div class="formBtn">
					<div class="form-group">
					  <label class="col-sm-3 control-label"></label>
					  <div class="col-sm-8">
		                <button type="button" class="btn btn-primary navbar-btn" onclick="reLoadGrid()">查询</button>
					  </div>
					</div>
				  </div>
				  <div style="clear: left;"></div>
				</form><!-- /E 表头  -->
	        </div>
	    </div>
	    <div class="row gridBody">
	        <div class="col-md-12">
			  <!-- /S 表体 -->
			  <div class="jqGrid_wrapper">
				<table id="dataGrid"></table> 
   				<div id="jqGridPager"></div>
			  </div>
	        </div>
	    </div>
	    <div class="row gridDetail">
	        <div class="col-md-12">
			  <!-- /S 表体 -->
			  <label>单据明细</label>
			  <div class="jqGrid_wrapper">
				<table id="dataGrid2"></table> 
			  </div>
	        </div>
	    </div>
	</div>
	<div style=""></div>
	<nav class="navbar navbar-default" role="navigation" style="padding-right:5px;position: fixed;top:0px;width: 100%;" >
	    <div class="container-fluid">
		    <div class="nav navbar-nav navbar-right">
		    	<button type="button" class="btn btn-primary navbar-btn" onclick="sendDataToParentPage()">保存</button>
		        <button type="button" class="btn btn-default navbar-btn" onclick="cancleSelect()">取消</button>
		    </div>
	    </div>
	</nav><!-- /E 工具栏结束  -->

  </body>
  
  <!--加载自定义JS -->
  <script type="text/javascript" charset="utf-8" src="${basePath}/js/BillsImport/reference.js"></script>
  
</html>
