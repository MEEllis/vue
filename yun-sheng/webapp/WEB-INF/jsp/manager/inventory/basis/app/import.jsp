<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<jsp:include  page="../../../inventoryInclude/head.jsp"/>
	
    <title>仓库助手备案数据导入</title>
    <link rel="stylesheet" type="text/css" href="${basePath}/css/inventory/basis/app/device.css?v=${version}"/>
    <script type="text/javascript" charset="utf-8" src="${basePath}/js/commonjs/xr.js?v=${version}" ></script>
    <script type="text/javascript" charset="utf-8" src="${basePath}/js/jquery.form.js"></script>
	<script type="text/javascript" charset="utf-8" src="${basePath}/js/inventory/basis/app/import.js?v=${version}"></script>
    </head>
 <body>
    <!-------------------------------------主页面开始----------------------------------------->
	<div class="btn-group btnNav" id='AUTH' data-code='CKZSBA'>
        <button type="button" class="btn tolead" data-toggle="modal" data-target="#leadModal">导入</button>
        <button type="button" class="btn empty">清空</button>
        <button type="button" class="btn execute">执行</button>
        <button type="button" class="btn derive">导出</button>
        <button type="button" class="btn down">模板下载</button>
    </div>
    <div class="well header">
	<!--第一行-->
        <div class="row">
            <div class="col-sm-4">
                <div class="row">
                    <div class="col-md-4"><label for="">快速过滤：</label></div>
                    <div class="col-md-8">
                    	<input type="text" placeholder="设备类型、设备号" class="form-control keyWord" />
                    </div>
                </div>
            </div>
            <div class="col-sm-4">
                <div class="row">
                    <div class="col-md-4"><label for="sectionId">系统判定结果：</label></div>
                    <div class="col-md-8">
                    	<span class="checkspan"><input name="true" type="checkbox" checked />正确</span>
                    	<span class="checkspan"><input name="false" type="checkbox" checked />错误</span>
                   	</div>
                </div>
            </div>
            <div class="col-sm-4">
                <div class="row">
                    <div class="col-md-12"><button class="btn search">查询</button></div>
                </div>
            </div>
        </div>
    </div>
    
<!--表格开始-->
    <div class="jqGrid_wrap">
		<table id="dataGrid"></table> 
 			<div id="jqGridPager"></div>
	</div>
	
<!--新增模态框-->
	<div class="modal fade" id="leadModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title" id="myModalLabel">设备新增</h4>
	      </div>
	      <div class="modal-body pad30">
	      	<form id="file">上传文件<input type="file" name="filedata" class="file" /></form>
	      </div>
	      <div class="modal-footer">
	      	<button type="button" class="btn btn-primary sure">确定</button>
	        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
	      </div>
	    </div>
	  </div>
	</div>	
	
 </body>
</html>
