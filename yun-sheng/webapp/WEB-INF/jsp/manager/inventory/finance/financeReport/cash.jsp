<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" %>
	<!-- 引入参数 -->
	  <jsp:include page="../../../inventoryInclude/head.jsp"/>
	  <link rel="stylesheet" type="text/css" href="${basePath}/js/jquery-easyui/themes/bootstrap/easyui.css?v=${version}">
	  <script type="text/javascript" src="${basePath}/js/jquery-easyui/jquery.easyui.min.js?v=${version}"></script>
	  <script type="text/javascript" charset="utf-8" src="${basePath}/js/commonjs/CwGrid.js?v=${version}" ></script>
      <link rel="stylesheet" type="text/css" href="${basePath}/css/market/public.css?v=${version}" />
	  <script src="${basePath}/js/inventory/finance/financeReport/cash.js?v=${version}"></script>
	  <title>现金流量表</title>
  </head>

  <body style="padding: 20px">

    <!-- 工具栏 -->
    <div class="toolsMenu">
	  	<div class="btn-group btnHundred" role="group" >
			  <button type="button" class="btn btn-default print" data-eventname="saveUpdate">打印</button>
			  <button type="button" class="btn btn-default export" data-eventname="giveUpsave" >导出</button>
			  <button type="button" class="btn btn-default" data-eventname="giveUpsave" data-toggle="modal" data-target="#sumModal">查询</button>
		</div>
	</div>

    <!-- 条件区 -->

	<h3 style="text-align:center;margin-top:10px">现金流量表</h3>
    <!-- 表格头部信息 -->
	<div class='row' style="margin:15px 10px;">
		<p>业务部门: <span id="sectionIdsBox"></span></p>
		<p>单位名称: <span id="companyIdsBox"></span></p>
		<p>查询日期: <span id="accountingPeriodBox"></span></p>
	</div>

	<!-- 表格 -->
	<div >
		<table id="rpGrid"></table>
		<div id="rpGridPager"></div>
	</div>
<!-- 查询对话框 -->
	<div class="modal fade" id="sumModal" tabindex="-1" role="dialog" aria-labelledby="mySection" aria-hidden="true">
		<div class="modal-dialog modal-lg">
			<div class="modal-content">
				<div class="modal-header" style="cursor: default;">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						×
					</button>
					<h3 class="modal-title" id="myModalLabel" style="font-size:24px;">
						查询
					</h3>
				</div>
				<div class="modal-body" style="padding:15px;overflow-x: visible">

					<form class="form-inline" >
						<div >
							<label for="queryDate" >查询日期:</label>
							<div class="input-group ">
								<input type="text" class="form-control" name="queryDate" id="queryDate" placeholder="请选择查询日期">
							</div>
						</div>
						<div class="mt15">
							<label for="" >公司名称:</label>
							<div class="input-group ">
								<input type="text" class="form-control easyui-combotree" data-options="multiple:'true'"  style="height: 34px;width: 200px;"  id="companyIds"  placeholder="请选择公司名称">
							</div>

						</div>
						<%--<div class="mt15">--%>
							<%--<label for="sectionIds" >业务部门:</label>--%>
							<%--<div class="input-group ">--%>
								<%--<input type="text" class="form-control easyui-combotree" data-options="multiple:'true'"  style="height: 34px;width: 200px;"   id="sectionIds" placeholder="请选择业务部门">--%>
							<%--</div>--%>
						<%--</div>--%>

					</form>

				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary searchBtn" data-dismiss="modal">查询</button>
					<button type="button" class="btn btn-warning  ml15" data-dismiss="modal">关闭</button>
				</div>
			</div>
		</div>
	</div>

	<script>
        // 是否可以 点击业务部门 ,  0 是不能点击 ，1 是可以点击
        var STATUS='${status}'
        var CURCOMPANYID = '${curCompanyId}'
        var CURCOMPANYNAME = "${curCompanyName}"
	</script>
<jsp:include page="../../../inventoryInclude/foot.jsp"/>