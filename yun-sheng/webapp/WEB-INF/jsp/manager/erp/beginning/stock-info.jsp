<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
  <head>
  	<meta charset="UTF-8" />
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<link rel="stylesheet" type="text/css" href="${basePath}/css/base.css?v=${version}"/>
	<link rel="stylesheet" type="text/css" href="${basePath}/css/bootstrap.css?v=${version}"/>
    <link rel="stylesheet" type="text/css" href="${basePath}/css/jquery-ui.css?v=${version}"/>
	<link rel="stylesheet" type="text/css" href="${basePath}/css/ui.jqgrid-bootstrap.css?v=${version}"/>
    <link rel="stylesheet" type="text/css" href="${basePath}/css/iconfont.css?v=${version}"/>
	<link rel="stylesheet" type="text/css" href="${basePath}/css/font-awesome.css?v=${version}"/>
    <link rel="stylesheet" type="text/css" href="${basePath}/css/font-awesome-ie7.css?v=${version}"/>
    <link rel="stylesheet" type="text/css" href="${basePath}/css/jquery.datetimepicker.css?v=${version}"/>
    <link rel="stylesheet" type="text/css" href="${basePath}/css/begin_period/modal_set.css?v=${version}"/>
    <link rel="stylesheet" type="text/css" href="${basePath}/css/begin_period/common_beginPeriod.css?v=${version}"/>
    <link rel="stylesheet" type="text/css" href="${basePath}/css/erp/purchase/purchase-base.css?v=${version}"/>
	<title>采购库存</title>
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css?v=${version}">
	-->
    <style>
    .modal_span{
        min-width: 90px;
        height: auto;
        display: inline-block;
        text-align: right;
       }

     .ui-jqgrid .ui-jqgrid-htable .ui-th-div {
       height: auto;
    }
    .btn-group button {
		background-image: url(${basePath}/images/btnboxbg.png);
		text-align: left;
		border: 0;
	}
	.btnHundred {
	    border-top: none; 
	}
    </style>
  </head>
  <body>
		<div class="content">
		<!--库存主页开始   -->
		    <div class="content1">
		  	    <div class="gridTop">
			<!--top -->
			<div id="AUTH" data-code="KCDR" class="btn-group btnHundred" role="group" >
				<button type="button" class="lead_into btn btn-default" data-eventname="lead_into" data-toggle="modal">导入</button>
				<button type="button" class="clear btn btn-default">清空</button>
				<button type="button" class="execute btn btn-default" data-eventname="execute">执行</button>
				<button type="button" class="op-execute btn btn-default" data-eventname="op-execute"  data-toggle="modal" data-target="#storageReferenceModal">反执行</button>
				<button type="button" class=" btn btn-default"><a href="${basePath}/qichu/库存导入模板.xls"" data-eventname="execute">模板下载</a></button>
				<button type="button" class=" btn btn-default"><a href="${basePath}/beginning/stock/export" data-eventname="execute">导出</a></button>
				<button type="button" class="fresh btn btn-default" onclick="setReload()">刷新</button>
				<button type="button" class=" btn btn-default" onclick="printImei()">打印期初串号标签</button>
			<!-- 
			<a  class="bn lead_into change"  data-eventname="lead_into" data-toggle="modal" data-target="">导入</a>
>>>>>>> .r22495
			  <a  class="bn clear change" data-eventname="clear">清空</a>
			  <a  class="bn execute change" data-eventname="execute">执行</a>
			  <a  class="bn op-execute op-change" data-eventname="op-execute">反执行</a>
			  <a  class="bn" href="${basePath}/beginning/stock/export" data-eventname="execute">导出</a>
			  <a  class="bn fresh" onclick="setReload()">刷新</a>
			  -->
			</div>
			<!--top end-->
			<!--编辑相关信息 -->
			<div class="description search_info" style="height: 64px;">
				 <p><span style="margin-right: 10px;">快速过滤:</span><input type="text" id="queryInput" placeholder="编码、名称模糊匹配" class="ipt_text"/><a class="search_maybe">查询</a></p>
			</div></div></div>
			<!--编辑相关信息   end-->
			<!--表格 -->
			<div class="tble">
			<div class="tablebox retailDetailTable">
				<div class="grid-wrap" >
					<table id="jqGrid_stocks" class="zxsaastable"></table>
				    <div id="jqGridPagerStocks" style="height:42px"></div>
				</div>
			</div>
			<!--表格   end-->
			</div>
			</div>
		<!--采购/受托库存主页结束   -->
		<!-- 导入模态框（Modal） -->
		<div class="modal fade" id="into" tabindex="-1" role="dialog" aria-labelledby="intoModalLabel" aria-hidden="true">
			<div class="modal-dialog modalNine">
				<div class="modal-content " style=" width: 883px;">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="intoModalLabel">
							导入
						</h4>
					</div>
				  <div class="modal-body">
				     <p><span style="display: inline-block;min-width: 88px;text-align: right;">上传文件:</span>
				      <input type="text" name="" id="" value="" class="des_file"/>
				     <span id="" class="file_container">上传<input type="file" id="file" name="file" class="file_ipt"/></span></p>
				   </div>
					<div class="modal-footer">
						<a href="javascript:void(0);" class="btn btn-w btn-info  lead_model" title="" data-dismiss="modal" >导入</a>
						<button type="button" class="btn btn-warning" data-dismiss="modal">取消</button>
					</div>
					
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div><!-- 导入模态框（Modal）结束 -->
		
			<!-- 反执行模态框（Modal） -->
		<!--<div class="modal fade" id="op_execute" tabindex="-1" role="dialog" aria-labelledby="intoModalLabel" aria-hidden="true">
			<div class="modal-dialog modalNine">
				<div class="modal-content " style=" width: 455px;">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="intoModalLabel">
							反执行
						</h4>
					</div>
				  <div class="modal-body">
				     <p><span>请选择反执行仓库:</span>
				      <input type="hidden"  id="" value="" class="dis_name ipt_text" name="sectionId" style="width:218px" />
				      <input type="text" id="" value="" class="dis_name ipt_text" name="sectionName" style="width:218px" /> </p>
					
				   </div>
					<div class="modal-footer">
					    
						<a href="#" class="btn btn-w btn-info exe_sure" title="" data-dismiss="modal" >确定</a>
						<button type="button" class="btn btn-warning" data-dismiss="modal">取消</button>
					</div>
					
				</div> /.modal-content 
			</div> /.modal 
		</div> 反执行模态框（Modal）结束 

		
--><!-- 反执行仓库 -->
<div class="modal fade" id="storageReferenceModal" tabindex="-1" role="dialog"  aria-hidden="true">
   <div class="modal-dialog" style="width:44%;">
      
      <div class="modal-content">
	     <div class="modal-header">
            <button type="button" class="close"  data-dismiss="modal" aria-hidden="true"> &times;</button>
            <h4 class="modal-title">
                       反执行
            </h4>
         </div>
         <div class="modal-body" style="padding: 10px;">
            <p style="margin-top:8px;margin-left:4px;font-size: 1rem;font-weight: bold;">请选择反执行仓库：</p>
			<div class="grid-wrap" style="margin-top:10px">
				<table id="jqGrid_storage" class="zxsaastable">
				</table>
			<!--<div id="jqGridPager"></div>-->
			</div>
         </div>
         <div class="modal-footer">
	        <a href="#" class="btn btn-w btn-info chose-storage" title="" data-dismiss="modal" >确定</a>
			<button type="button" class="btn btn-warning" data-dismiss="modal">取消</button>
         </div>
	  </div>
	  
	</div>
</div>
		
	</body>
	
	 <jsp:include page="import_beginning.jsp"></jsp:include>
	<script src="${basePath}/js/begin_period/stock-info.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<!-- 验证 -->
	<script src="${basePath}/js/cw/bootstrap/js/validator-company.js?v=${version}" type="text/javascript" charset="utf-8"></script>
    <script type="text/javascript">
    $(function(){
    	initPage();
    });
    
    function setReload(){
    	window.location.reload();
	}
	
	</script>
	<!-- 菜单权限验证 -->
	<script type="text/javascript" src="${basePath}/js/erp/authority/menuValidation.js?v=${version}"></script>
</html>
