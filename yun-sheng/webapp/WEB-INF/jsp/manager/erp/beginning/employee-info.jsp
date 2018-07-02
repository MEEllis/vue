<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
  <head>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
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
	<title>员工档案</title>
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css?v=${version}">
	-->

  </head>
  
  <body>
		<div class="content">
		<!--员工档案主页开始   -->
		    <div class="content1">
			<!--top -->
			<div class="btn-grp" role="group" >
			  <a href="${basePath}/qichu/员工导入模板.xls" class="bn">模板下载</a>
		  	  <a class="bn lead_into"  data-eventname="lead_into" data-toggle="modal" data-target="#into" >导入</a>
			  <a href="${basePath}/beginning/employee/export" class="bn save">导出</a>	
			  <a  class="bn clear" data-eventname="clear">清空</a>
			  <a  class="bn execute" data-eventname="execute">执行</a>
			  <a  class="bn fresh" data-eventname="fresh" onclick="setReload()">刷新</a>
			  <a  class="bn stuff_search" data-eventname="stuff_search">员工查询</a><!--
			  <a  class="bn" href="${basePath}/authority/employeeInfo/toEmployee?resourceId=30">返回</a>
			--></div>
			<!--top end-->
			<!--快速搜索-->
			<div class="search_info">
				<p ><span style="margin-right: 10px;">快速搜索:</span><input type="text" placeholder="编码、名称模糊匹配" class="ipt_text srch"/><a class="search_maybe">查询</a></p>
			</div>
			<!--编辑描述 -->
			<!--编辑描述   end-->
			<!--表格 -->
			<div class="tble">
			<div class="tablebox retailDetailTable">
				<div class="grid-wrap" >
					<table id="jqGrid_stuffInfo" class="zxsaastable"></table>
				    <div id="jqGridPagerStuffInfo" style="height:42px"></div>
				</div>
			</div></div>
			<!--表格   end-->
			</div>
			</div>
		<!--员工档案主页结束   -->
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
				     <input type="text" name="" id="" value="" class="des_file"/>
				     <span id="" class="file_container">上传<input type="file" id="file" name="file" class="file_ipt"/></span></p>
					
					
				   </div>
					<div class="modal-footer">
						<a href="#" class="btn btn-w btn-info lead_model" title="" data-dismiss="modal" >导入</a>
						<button type="button" class="btn btn-warning" data-dismiss="modal">取消</button>
					</div>
					
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div><!-- 导入模态框（Modal）结束 -->
			<!-- 借调部门模态框（Modal） -->
		<!--<div class="modal fade" id="into" tabindex="-1" role="dialog" aria-labelledby="intoModalLabel" aria-hidden="true">
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
				     <input type="text" name="" id="" value="" class="des_file"/>
				     <span id="" class="file_container">上传<input type="file" id="file" name="file" class="file_ipt"/></span></p>
					
					
				   </div>
					<div class="modal-footer">
						<a   class="btn btn-w btn-info model_load" title="" >模板下载</a>
						<a href="#" class="btn btn-w btn-info lead_model" title="" data-dismiss="modal" >导入</a>
						<button type="button" class="btn btn-warning" data-dismiss="modal">取消</button>
					</div>
					
				</div> /.modal-content 
			</div> /.modal 
		</div>借调部门模态框（Modal）结束 -->
		
	</body>
	   <jsp:include page="import_beginning.jsp"></jsp:include>
	<script src="${basePath}/js/begin_period/employee_info.js?v=${version}" type="text/javascript" charset="utf-8"></script>
    <script type="text/javascript">
    $(function(){
    	initial();
    });
    
    function setReload(){
    	window.location.reload();
	}
	</script>
</html>
