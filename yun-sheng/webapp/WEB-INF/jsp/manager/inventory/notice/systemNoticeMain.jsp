<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<jsp:include  page="../../inventoryInclude/head.jsp"/>
	
    <title>系统通知</title>
    <link rel="stylesheet" type="text/css" href="${basePath}/css/inventory/home/homeBase.css?v=${version}"/>
        <link rel="stylesheet" type="text/css" href="${basePath}/js/umeditor/themes/default/css/umeditor.css">
    <script type="text/javascript" charset="utf-8" src="${basePath}/js/umeditor/third-party/template.min.js"></script>
    <script type="text/javascript" charset="utf-8" src="${basePath}/js/umeditor/umeditor.config.js"></script>
    <script type="text/javascript" charset="utf-8" src="${basePath}/js/umeditor/umeditor.min.js"></script>
    <script type="text/javascript" charset="utf-8" src="${basePath}/js/umeditor/lang/zh-cn/zh-cn.js"></script>
	<script type="text/javascript" charset="utf-8" src="${basePath}/js/inventory/home/noticeMain.js?v=${version}"></script>
	<style type="text/css">
		#dataGrid tr td[aria-describedby='dataGrid_title']{
		    color: blue;
		    cursor: pointer;
		    white-space: nowrap;
		    text-overflow: ellipsis;
		    padding: 8px 20px;
	    }
	</style>
    </head>
 <body>
    <!-------------------------------------主页面开始----------------------------------------->
    <div class="head">
    	<div id="AUTH" data-code="GSGG" class="btn-group btnHundred">
            <button type="button" class="btn" id="add">新增</button>
            <button type="button" class="btn" id="amend">修改</button>
            <button type="button" class="btn" id="delete">删除</button>
        </div>
        <div class="form-inline headbox">
            <div class="form-group col-sm-3">
                <label class="width-25">关键字：</label>
                   	<div class="input-group col-sm-8">
                   	<input type="text" class="form-control keyWord" placeholder="可标题、正文搜索" />
                </div>
            </div>
            <div class="form-group col-sm-3"></div>
            <div class="form-group col-sm-3"></div>
            <div class="form-group col-sm-3">
            	<button type="button" class="btn search">查询</button>
            </div>
        </div>
    </div>
    
<!--表格开始-->
    <div class="jqGrid_wrap">
		<table id="dataGrid"></table> 
 		<div id="jqGridPager"></div>
	</div>
	
<!--通知弹窗-->
	<div class="modal fade" id="newModal" tabindex="-1" role="dialog" aria-hidden="true">
	    <div class="modal-dialog">
	        <div class="modal-content">
	            <div class="modal-header">
	                <h4 class="modal-title"></h4>
	            </div>
	            <div class="modal-body">
	            	<h4 class="newTitle"></h4>
	            	<p class="newmp">来源: <span class="newMan"></span><i class="newTime"></i></p>
	            	<div class="newBox">
	            	</div>
	              </div>
	            <div class="modal-footer">
	                <button type="button" class="btn btn-warning" data-dismiss="modal">确定</button>
	            </div>
	        </div>
	    </div>
	</div>
	
	<!--新增弹窗-->
	<div class="modal" id="ueModal" tabindex="-1" role="dialog" aria-hidden="true">
	    <div class="modal-dialog" style="width: 700px;">
	        <div class="modal-content">
	            <div class="modal-header">
	            	<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	                <h4 class="modal-title">新增通知</h4>
	            </div>
	            <div class="modal-body">
	            	<div class="uetitle"><i>标题：</i><input type="text" class="form-control ueInp" /></div>
	            	<div class="uemain"><i>正文：</i><script id="editor" type="text/plain" style="width:620px;height:400px;"></script></div>
	            </div>
	            <div class="modal-footer">
	            	<div class="ueman"></div>
	                <button type="button" class="btn btn-warning ueSave">提交</button>
	                <button type="button" class="btn btn-default uedel">关闭</button>
	            </div>
	        </div>
	    </div>
	</div>
	
 </body>
</html>
