<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" %>
<jsp:include page="../../inventoryInclude/head.jsp"/>
<script src="${basePath}/js/inventory/fund/expendAvgList.js?v=${version}"></script>
<title>费用摊销</title>
<style type="text/css">
    #imeiDr-modal .row {
        padding-bottom: 0;
    }

    .ui-jqgrid .ui-jqgrid-btable tbody tr.addRow td, .ui-jqgrid .ui-jqgrid-btable tbody tr.jqgrow td {
        overflow: hidden;
        white-space: unset;
        padding-right: 2px;
        line-height: 20px;
        padding: 5px;
    }
</style>
</head>
<body class='e-body-bg'>
<!-------------------------------------主页面开始----------------------------------------->
<div id="AUTH" class="none" data-code="GYSBJD"></div>
<div class="btn-toolbar " id="MenuTool" role="toolbar" data-code="GYSBJD"></div>
<div class="collapse in" id="collapseExample">
    <div class="well clearfix">
        <form id="billsHeaderForm" novalidate="novalidate" class="form-inline">
            <div class="form-group col-sm-3">
                <label class="width-25">摊销月份:</label>
                <div class="input-group col-sm-8">
                    <select type="text" class="form-control" name="avgMonth" id="avgMonth"></select>
                </div>
            </div>

            <div class="form-group col-sm-3">
                <label class="width-25"></label>
                <div class="input-group col-sm-8">
                    <button type="button" class="erp-btn-bg creatAvgDate">生成摊销数据</button>
                </div>
            </div>

        </form>
    </div>
</div>

<!-------------------------------------表格开始----------------------------------------->
<div class="tablebox retailDetailTable">
    <div class="grid-wrap" style="margin-top:10px">
        <table id="dataGrid" class="zxsaastable">
        </table>
        <div id="dataGridPager"></div>
    </div>
</div>
<!-------------------------------------表格结束----------------------------------------->

<!-------------------------------------主页面结束----------------------------------------->

<!-------------------------------------模态框结束----------------------------------------->
<jsp:include page="../../inventoryInclude/foot.jsp"/>