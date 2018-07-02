<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
  <head>
	<meta charset="UTF-8">
	<link rel="stylesheet" type="text/css" href="${basePath}/css/base.css?v=${version}"/>
	<link rel="stylesheet" type="text/css" href="${basePath}/css/bootstrap.css?v=${version}" />
    <link rel="stylesheet" type="text/css" href="${basePath}/css/jquery-ui.css?v=${version}" />
	<link rel="stylesheet" type="text/css" href="${basePath}/css/ui.jqgrid-bootstrap.css?v=${version}"/>
    <link rel="stylesheet" type="text/css" href="${basePath}/css/iconfont.css?v=${version}"/>
	<link rel="stylesheet" type="text/css" href="${basePath}/css/font-awesome.css?v=${version}"/>
    <link rel="stylesheet" type="text/css" href="${basePath}/css/font-awesome-ie7.css?v=${version}"/>
     <link rel="stylesheet" type="text/css" href="${basePath}/css/jquery.datetimepicker.css?v=${version}"/>
    <link rel="stylesheet" type="text/css" href="${basePath}/css/begin_period/modal_set.css?v=${version}"/>
    <link rel="stylesheet" type="text/css" href="${basePath}/css/begin_period/common_beginPeriod.css?v=${version}"/>
    <link rel="stylesheet" type="text/css" href="${basePath}/css/erp/purchase/purchase-base.css?v=${version}">
	<title>资金余额导入</title>
	<style>
	.ui-jqgrid .ui-jqgrid-htable .ui-th-div{
        height: auto;
    }
      .btnHundred {
       border-top: none;
    }
    .btn-group button {
	    background-image: url(/manager/images/btnboxbg.png);
	    text-align: left;
	    border: 0;
	}
    </style>
  </head>
  <body>
		<div class="content">
		<!--资金余额导入主页开始   -->
		    <div class="content1">
		    <div class="gridTop">
			<!--top -->
			<div id="AUTH" data-code="ZJYEDR" class="btn-group btnHundred btn-grp" role="group" >
				<button type="button" class="lead_into btn btn-default" data-eventname="lead_into" data-toggle="modal">导入</button>
				<button type="button" class="clear btn btn-default">清空</button>
				<button type="button" class="execute btn btn-default" data-eventname="execute">执行</button>
				<button type="button" class="op-execute btn btn-default" data-eventname="op-execute">反执行</button>
				<button type="button" class=" btn btn-default"><a href="${basePath}/qichu/资金账户余额导入模板.xls"" data-eventname="execute">模板下载</a></button>
				<button type="button" class=" btn btn-default"><a href="${basePath}/beginning/cashDetail/export" data-eventname="execute">导出</a></button>
				<button type="button" class="fresh btn btn-default" onclick="setReload()">刷新</button>
				<!-- 
				  <a href="${basePath}/beginning/cashDetail/export" class="bn" title="" >模板下载</a>
				  <a class="bn lead_into"  data-eventname="lead_into" data-toggle="modal"   data-target="#into">导入</a>
				  <a href="${basePath}/beginning/cashDetail/export" class="bn" title="" >导出</a>
				  <a  class="bn clear" data-eventname="clear">清空</a>
				  <a  class="bn execute" data-eventname="execute" data-toggle="modal"   data-target="#execute">执行</a>
				  <a  class="bn op-execute" data-eventname="op-execute">反执行</a>
				  <a  class="bn fresh" data-eventname="fresh" onclick="setReload()">刷新</a>
				 -->
			  </div></div></div>
			<!--top end-->
			<!--表格 -->
			<div class="tble">
			<div class="tablebox retailDetailTable">
				<div class="grid-wrap">
					<table id="jqGrid_cash" class="zxsaastable"></table>
				    <div id="jqGridPagerCashInfo" style="height:42px"></div>
				</div>
			</div></div>
			<!--表格   end-->
		
			</div>
		<!--资金余额导入主页结束   -->
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
				     <p><span>上传文件:</span>
				     <input type="text" name="" id="" value="" class="des_file" />
				     <span id="" class="file_container">上传<input type="file" id="file" name="file" class="file_ipt"/></span></p>
					
				   </div>
					<div class="modal-footer">
						<a href="#" class="btn btn-w btn-info lead_model" title="" data-dismiss="modal" >导入</a>
						<button type="button" class="btn btn-warning" data-dismiss="modal">取消</button>
					</div>
					
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div><!-- 导入模态框（Modal）结束 -->
		
	</body>
	
	 <jsp:include page="import_beginning.jsp"></jsp:include>
	<script src="${basePath}/js/begin_period/cash-detail.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	
	<!-- 验证 -->
	<script src="${basePath}/js/cw/bootstrap/js/validator-company.js?v=${version}" type="text/javascript" charset="utf-8"></script>
    <script type="text/javascript">
    $(function(){
    	initial();
    });
    
    function setReload(){
    	window.location.reload();
	}
	</script>
	<!-- 菜单权限验证 -->
	<script type="text/javascript" src="${basePath}/js/erp/authority/menuValidation.js?v=${version}"></script>
</html>
