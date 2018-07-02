<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<jsp:include  page="../../inventoryInclude/head.jsp"/>
	
    <title>待过账单据</title>
    <link rel="stylesheet" type="text/css" href="${basePath}/css/inventory/home/homeBase.css?v=${version}"/>
	<script type="text/javascript" charset="utf-8" src="${basePath}/js/inventory/home/postOrderMain.js?v=${version}"></script>
    </head>
 <body>
    <!-------------------------------------主页面开始----------------------------------------->
	<input type="hidden" id='AUTH' data-code='LSKD'>
    <div class="head">
        <div class="form-inline headbox">
            <div class="form-group col-sm-4">
                <label class="width-25">单据日期：</label>
                <div class="input-group col-sm-8">
                   	<input type="text" class="dateInp startTime" >一
		      		<input type="text" class="dateInp endTime" >
		      	</div>
		    </div>

			<div class="form-group col-sm-4">
				<label class="width-25">部门:</label>
				<div class="input-group col-sm-8">
					<input type="text" class="form-control" name="sectionId" value="" style="display: none;">
					<input type="text" class="form-control" name="sectionName" id="sectionName" placeholder="请选择部门">
				</div>
			</div>
            <div class="form-group col-sm-4">
                <label class="width-25">单据类型：</label>
                   	<div class="input-group col-sm-8">
                   	<select class="form-control billType" id="billType">

                   	</select>
                </div>
            </div>
            <div class="form-group col-sm-4">
                <label class="width-25">关键字：</label>
                   	<div class="input-group col-sm-8">
                   	<input type="text" class="form-control keyWord" placeholder="请输入往来单位名称，经办人，单据备注"  />
                </div>
            </div>
            <div class="form-group col-sm-4">
            </div>
            <div class="form-group col-sm-4 p5">
            	<button type="button" class="btn search">查询</button>
                <button type="button" class="btn post">过账</button>
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
