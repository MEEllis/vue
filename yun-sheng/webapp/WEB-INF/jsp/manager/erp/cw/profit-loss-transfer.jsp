<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>损益结转</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!-- 引入文件 -->
	<jsp:include page="../../Include/import_cw.jsp"></jsp:include>
	<link rel="stylesheet" type="text/css" href="${basePath}/css/erp/cw/profit-loss-transfer.css?v=${version}" />
	<script type="text/javascript">
	
		//**********全局变量
		//基本目录
		var basePath = "${basePath}";

	</script>
  </head>
 
  <body>
	<div class="well">
		<div id="AUTH" data-code="SYJZ" class="btn-group btnHundred" role="group" >
			<button type="button" class="btn btn-default " onclick="generateVoucher()">生成凭证</button>
		    <%--<button type="button" class="btn btn-default ">退出</button>	--%>
		</div>
		<form id="inquire_option" class="form-inline">
			<div class="top_info">
				<div class="row changeMargin">
				  <div class="form-group">
				    <label class="control-label" for="date_during">结转期间</label>
				    <select id="jzDate" class="form-control" ></select>
				  </div>
				  <div class="form-group">
				    <label class="control-label" >凭证类别</label>
				    <select id="voucherClassSelect"></select>
				  </div>
				  <div class="form-group">
				    <label class="control-label" for="not_remark">包含未记账凭证</label>
				    <input type="checkbox" name="haveNoPostVoucher" id="haveNoPostVoucher" value="" />
				  </div>
				</div>
				<div class="row changeMargin">
				  <div class="form-group">
				    <label class="control-label" for="subject">本年利润科目</label>
				    <input type="text" name="bnlrSubjectId" style="display: none;"/>
				    <input type="text" name="bnlrSubjectCode" style="display: none;"/>
				    <input type="text" name="bnlrSubjectName" style="padding-left:10px;" onclick="selectSubjectReferenceOpen2()"/>
				  </div>
				  <div class="form-group" style="display: none;">
				    <label class="control-label" for="merge_distribute">合并生成利润分录</label>
				    <input type="checkbox" name="" id="hbsclrfl" checked="checked" />
				  </div>
				  <div class="form-group" style="margin-left: 135px;display: none;">
				    <label class="control-label" for="pay">收入支出分别结转</label>
				    <input type="checkbox" name=""id="srzcfbjz"/>
				  </div>
				</div>
			</div>
		 </form>
    </div>
    
	<!-- 记账表格 -->
    <div class="row gridBody">
        <div class="col-md-12">
			<div class="jqGrid_wrapper">
				<table id="dataGrid"></table> 
			</div>
        </div>
    </div>
    
    
	<!-- 引用自定义JS文件-->
	<script type="text/javascript" src="${basePath}/js/erp/cw/profit-loss-transfer.js?v=${version}"></script> 
	<!-- 菜单权限验证 -->
	<script type="text/javascript" src="${basePath}/js/erp/authority/menuValidation.js?v=${version}"></script>
  </body>
  
</html>

<!-- 科目引用 -->
<div class="modal fade" id="subjectReferenceModal" tabindex="-1" role="dialog"  aria-hidden="true">
   <div class="modal-dialog" style="width:930px;">
      <div class="modal-content">
	     <div class="modal-header">
            <button type="button" class="close"  data-dismiss="modal" aria-hidden="true"> &times;</button>
            <h4 class="modal-title">
                                 科目参照
            </h4>
         </div>
         <div class="modal-body" style="padding: 0px;">
			<iframe name="subjectReferenceFrame" class="referenceFrame" frameborder="0" style="width: 100%;height:500px;" src="${basePath}/cw/company/reference"></iframe>
         </div>
	  </div>
	</div>
</div>