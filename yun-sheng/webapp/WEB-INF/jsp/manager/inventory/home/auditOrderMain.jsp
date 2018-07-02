<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<jsp:include  page="../../inventoryInclude/head.jsp"/>
	
    <title>待审订单</title>
    <link rel="stylesheet" type="text/css" href="${basePath}/css/inventory/home/homeBase.css?v=${version}"/>
	<script type="text/javascript" charset="utf-8" src="${basePath}/js/inventory/home/auditOrderMain.js?v=${version}"></script>
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
            <div class="form-group col-sm-3">
                <label class="width-25">往来单位：</label>
                   	<div class="input-group col-sm-8">
                   	<input type="text" class="form-control" id="company" readonly placeholder="请选择往来单位" />
                </div>
            </div>
            <div class="form-group col-sm-3">
                <label class="width-25">关键字：</label>
                   	<div class="input-group col-sm-8">
                   	<input type="text" class="form-control keyWord" placeholder="请输入部门名称，经办人，单据备注" />
                </div>
            </div>
            <div class="form-group col-sm-2">
            	<button type="button" class="btn search">查询</button>
                <button type="button" class="btn check">审核</button>
            </div>
        </div>
    </div>
    
<!--表格开始-->
    <div class="jqGrid_wrap">
		<table id="dataGrid"></table> 
 		<div id="jqGridPager"></div>
	</div>
	
<!-- 审核明细  -->
<div class="modal" id="checkModal" tabindex="-1" role="dialog"  aria-hidden="true">
   <div class="modal-dialog" style="width: 80%;">
      <div class="modal-content">
	     <div class="modal-header">
            <button type="button" class="close"  data-dismiss="modal" aria-hidden="true"> &times;</button>
            <h4 class="modal-title htitle" style="text-align: center;">
            </h4>
         </div>
         <div class="modal-body">
         	<div class="">
         		<table class="table table-bordered maintab" >
         			<thead>
         				<tr>
         					<th>单据日期</th>
         					<th>往来单位</th>
         					<th>部门名称</th>
         					<th>经办人</th>
         					<th>备注</th>
         					<th>制单人</th>
         					<th>制单时间</th>
         				</tr>
         			</thead>
         			<tbody></tbody>
         		</table>
         	</div>
         	<div>商品明细</div>
			<!-- /S 表体 -->
			<div class="jqGrid_wrapper" style="">
				<table id="mainGrid"></table> 
				<div id="jqGridPager_main"></div>
			</div><!-- /E 表体 -->
         </div>
         <!-- 模态框底部部分 -->
         <div class="modal-footer">
            <button type="button" class="btn btn-info savecheck">确定</button>
            <button type="button" class="btn btn-default"  data-dismiss="modal">取消</button>
         </div>
	  </div>
	</div>
</div>
	
 </body>
</html>
