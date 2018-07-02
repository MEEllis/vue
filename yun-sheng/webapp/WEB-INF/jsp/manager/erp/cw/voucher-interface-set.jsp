<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    
    <title>凭证接口设置</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!-- 引入文件 -->
	<jsp:include page="../../Include/import_cw.jsp"></jsp:include>
	<link rel="stylesheet" type="text/css" href="${basePath}/css/erp/cw/voucher-interface-set.css?v=${version}" />
	<script type="text/javascript">
	
		//**********全局变量
		//基本目录
		var basePath = "${basePath}";

	</script>
  </head>
 <style>
 .mainbody{
     padding:20px;
 }
 .bodyModel {
     border: 1px solid #cfcfcf;
     width:100%;
     height: auto;
}
.leftDIV>div{
     float:left;
}
.leftDIV .btn {
     width: 142px;
     margin-right: 8px;
     border-radius: 3px;
}
.leftDIV .navbar-btn{
    color: #ffffff;
    background-color: #BEBEBE;
}
.leftDIV .active{
     background-color: #696969;
}
.ui-jqgrid .ui-jqgrid-htable .ui-th-div {
    margin-top:0px;
    height:auto;
}

	</style>
  <body class="mainbody">
    <div class="bodyModel">
  	<div id="AUTH" data-code="PZJKSZ" class="btn-group btnHundred" role="group" >
		  <button type="button" class="btn btn-default saveUpdate" data-eventname="saveUpdate" onclick="saveEdit()">保存更改</button>	
		  <button type="button" class="btn btn-default giveUpsave" data-eventname="giveUpsave" onclick="noSaveEdit()">放弃更改</button>	
	</div>
  	<!-- 左边目录 -->
	<div class="leftDIV" style="width: 100%;height:auto;overflow-y:auto;padding:15px 15px;background-color:#f5f5f5">
		
		<div><button type="button" class="btn  navbar-btn" onclick="linkBtClick(1)">资金账户对应科目</button></div>
		<div><button type="button" class="btn  navbar-btn" onclick="linkBtClick(2)">存货科目</button></div>
		<div><button type="button" class="btn  navbar-btn" onclick="linkBtClick(3)">委托库存科目</button></div>
		<div><button type="button" class="btn  navbar-btn" onclick="linkBtClick(4)">受托库存科目</button></div>
		<div><button type="button" class="btn  navbar-btn" onclick="linkBtClick(5)">销售收入、成本科目</button></div>
		<div><button type="button" class="btn  navbar-btn" onclick="linkBtClick(6)">成本差异科目</button></div>
		<div><button type="button" class="btn  navbar-btn" onclick="linkBtClick(7)">成本调整科目</button></div>
		<div><button type="button" class="btn  navbar-btn" onclick="linkBtClick(8)">其它收入科目</button></div>
		<div><button type="button" class="btn  navbar-btn" onclick="linkBtClick(9)">其它支出科目</button></div>
		<div><button type="button" class="btn  navbar-btn" onclick="linkBtClick(10)">往来账务科目</button></div>
		<div><button type="button" class="btn  navbar-btn" onclick="linkBtClick(11)">其它出库对方科目</button></div>
		<div><button type="button" class="btn  navbar-btn" onclick="linkBtClick(12)">其它入库对方科目</button></div>
		<div><button type="button" class="btn  navbar-btn" onclick="linkBtClick(13)">调拨差价科目</button></div>
		<div><button type="button" class="btn  navbar-btn" onclick="linkBtClick(14)">税金科目</button></div>
		<div><button type="button" class="btn  navbar-btn none" onclick="linkBtClick(15)">整单折扣科目</button></div>
		<div><button type="button" class="btn  navbar-btn" onclick="linkBtClick(16)">内部往来类型科目</button></div>
	</div>
	
	<!-- 右边表格 -->
	<div class="rightDIV" style="width:100%;padding-top:0px;border-top:8px solid #ffffff">
		<div style="height: 40px;padding-left: 20px;display: none;">
			<h3 id="gridTitle"></h3>
		</div>
		<!-- 表格 -->
	    <div class="row gridBody" style="padding-left: 10px;">
	        <div class="col-md-12">
				<div class="jqGrid_wrapper">
					<table id="dataGrid"></table> 
				</div>
	        </div>
	    </div>
	</div>
    </div>
	<!-- 引用自定义JS文件-->
	<script type="text/javascript" src="${basePath}/js/erp/cw/voucher-interface-set.js?v=${version}"></script>
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

<!-- 商品类别引用 -->
<div class="modal fade" id="goodsClassReferenceModal" tabindex="-1" role="dialog"  aria-hidden="true">
   <div class="modal-dialog" style="width:630px;">
      <div class="modal-content">
	     <div class="modal-header">
            <button type="button" class="close"  data-dismiss="modal" aria-hidden="true"> &times;</button>
            <h4 class="modal-title">
                                 商品类别引用
            </h4>
         </div>
         <div class="modal-body" style="padding: 0px;">
			<iframe name="goodsClassReferenceFrame" class="referenceFrame" frameborder="0" style="width: 100%;height:500px;" src="${basePath}/Tgoodsclass/reference"></iframe>
         </div>
	  </div>
	</div>
</div>