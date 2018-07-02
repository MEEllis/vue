<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" %>
<jsp:include page="../../inventoryInclude/head.jsp"/>
<script src="${basePath}/js/inventory/fund/expenseVouchers.js?v=${version}"></script>
<title>已摊销费用凭证</title>
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
                <label class="width-25">已摊销月份:</label>
                <div class="input-group col-sm-8">
                    <input type="text" class="form-control date-time-icon" name="billsBeginDateStr" id="startDate" readonly>
                </div>
            </div>

            <div class="form-group col-sm-3">
                <input type="hidden" name="sectionId"/>
                <label  class="width-25">费用归集部门:</label>
                <div class="input-group col-sm-8">
                    <input type="text" class="form-control" name="sectionName" id="sectionName"  data-bv-field="sectionName">
                </div>
            </div>

            <div class="form-group col-sm-3">
                <input type="hidden" name="sectionId"/>
                <label  class="width-25">支出类别:</label>
                <div class="input-group col-sm-8">
                    <select type="text" class="form-control" name="inpayClass" id="inpayClass">
                        <option value="">请选择支出类别</option>
                    </select>
                </div>
            </div>

            <div class="form-group col-sm-3">
                <button type="button" class="erp-btn-bg search" style="margin-right: 25px">查询</button>
                <button type="button" class="erp-btn-lab reset">重置</button>
            </div>



        </form>
        <!-------------------------------------表格开始----------------------------------------->
        <div class="row" style="margin-left:50px;">
            <label class="width-25"></label>
            <div class="input-group col-sm-8">
                <button type="button" class="erp-btn-bg creatAvgDate">生成会计凭证</button>
            </div>
        </div>
        <div class="tablebox retailDetailTable">
            <div class="grid-wrap" style="margin-top:10px">
                <table id="dataGrid" class="zxsaastable">
                </table>
                <div id="dataGridPager"></div>
            </div>
        </div>
    </div>
</div>


<!-------------------------------------表格结束----------------------------------------->

<!-------------------------------------主页面结束----------------------------------------->

<!-------------------------------------模态框结束----------------------------------------->
<jsp:include page="../../inventoryInclude/foot.jsp"/>