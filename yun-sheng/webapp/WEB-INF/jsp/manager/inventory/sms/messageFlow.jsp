<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<jsp:include page="../../inventoryInclude/head.jsp"/>
<link rel="stylesheet" type="text/css" href="${basePath}/css/market/public.css?v=${version}" />
<script src="${basePath}/js/jquery-form.js?v=${version}" type="text/javascript" charset="utf-8"></script>
<title>短信流水</title>
<script src="${basePath}/js/inventory/sms/messageFlow.js?v=${version}"></script>
</head>
<style>

</style>

<body>
<!-------------------------------------主页面开始----------------------------------------->
<div class="well" style="padding:5px ">
    <div id="AUTH" data-code="DXLS" class="btn-group btnHundred" role="group" >
    </div>
    <!-------------------------------------搜索条件开始----------------------------------------->
    <form id="inquire_option" class="form-inline">
        <div class="inputbox container-fluid clearfix">
            <div class="row">
                <div class="form-group col-sm-6">
                    <label for="startDate" class="width-25">
                        发生日期:
                    </label>
                    <div class="input-group col-sm-4">
                        <input type="text" class="form-control" name="billsBeginDateStr" id="startDate" >
                    </div>
                    --
                    <div class="input-group col-sm-4">
                        <input type="text" class="form-control" name="billsEndDateStr" id="endDate" >
                    </div>
                </div>
                <div class="form-group  col-sm-6">
                    <button type="button" class="erp-btn-bg" onclick="querySms()">查询</button>
                    <button type="button" class="erp-btn-lab" onclick="resetFun()">重置</button>
                </div>
            </div>
        </div>
    </form>
</div>
<!-------------------------------------表格开始----------------------------------------->
<div class="tablebox retailDetailTable" style="padding:10px">
    <div class="grid-wrap" style="margin-top:10px">
        <table id="jqGrid_blocMessage" class="zxsaastable">
        </table>
        <div id="jqGridPager"></div>
    </div>
</div>
<!-------------------------------------表格结束----------------------------------------->

<!-------------------------------------主页面结束----------------------------------------->
<jsp:include page="../../inventoryInclude/foot.jsp"/>

