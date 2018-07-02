<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<jsp:include page="../../inventoryInclude/head.jsp"/>
<link rel="stylesheet" type="text/css" href="${basePath}/css/market/public.css?v=${version}" />
<link rel="stylesheet" type="text/css" href="${basePath}/js/jquery-easyui/themes/bootstrap/easyui.css?v=${version}">
<script type="text/javascript" src="${basePath}/js/jquery-easyui/jquery.easyui.min.js?v=${version}"></script>
<script src="${basePath}/js/jquery-form.js?v=${version}" type="text/javascript" charset="utf-8"></script>
<title>短信发送统计</title>
<script src="${basePath}/js/inventory/sms/sendingStatistics.js?v=${version}"></script>
</head>
<style>
    #saveOrUpdateModal input, #saveOrUpdateModal select {
        height: 34px;
        border: 1px solid #cfcfcf;
        vertical-align: middle;
    }

</style>

<body class="e-body-bg">
<!-------------------------------------主页面开始----------------------------------------->
<!-------------------------------------搜索条件开始----------------------------------------->
<div class="none" id="AUTH" role="toolbar" data-code='CXDXFSTJ'></div>

<form action="" class="form-inline clearfix" id="searchQuery">
    <!--单据类型-->
    <div class="form-group col-sm-3">
        <label class="width-25">提交日期:</label>
        <div class="input-group col-sm-4">
            <input type="text" class="form-control" name="billsBeginDateStr" id="startDate">
        </div>
        --
        <div class="input-group col-sm-4">
            <input type="text" class="form-control" name="billsEndDateStr" id="endDate">
        </div>
    </div>

    <div class="col-md-3 form-group ">
        <label class="width-25">部门名称:</label>
        <div class="input-group col-sm-8">
            <input type="text" class="form-control" id="sectionName"  id="sectionName">
        </div>
    </div>

    <div class="col-md-3 form-group ">
        <label class="width-25">提交人:</label>
        <div class="input-group col-sm-8">
            <input type="text" class="form-control"  name="managerUname" id="managerUname" placeholder=""
                   readonly="readonly"/>
        </div>
    </div>

    <div class="col-md-3 form-group ">
        <label class="width-25">提交状态:</label>
        <div class="input-group col-sm-8">
            <select id="sendStatus" class="form-control easyui-combotree" style="height: 34px;">
            </select>
        </div>
    </div>

    <div class="col-md-3 form-group ">
        <label class="width-25">发送状态:</label>
        <div class="input-group col-sm-8">
            <select id="sendNode" class="form-control">
                <option value="">请选择状态</option>
                <option value="DELIVRD">状态成功</option>
                <option value="UNDELIV">状态失败</option>
                <option value="EXPIRED">用户长时间关机或者不在服务区</option>
            </select>
        </div>
    </div>

    <div class="col-md-3 form-group ">
        <label class="width-25">关键字:</label>
        <div class="input-group col-sm-8">
            <input type="text" class="form-control" name="queryKey"  id="queryKey" placeholder="按标题、内容、失败原因模糊查询">
        </div>
    </div>

    <div class="form-group col-sm-3">
        <button type="button" class="col-sm-offset-3 erp-btn-bg" id="search">查询</button>
        <button type="button" class="erp-btn-lab" onclick="resetFun()">重置</button>
    </div>

</form>

<!-------------------------------------表格开始----------------------------------------->
<div class="tablebox retailDetailTable" style="margin-top:20px">
    <div class="btn-toolbar" id="GridTool" role="toolbar" data-code="CXDXFSTJ"></div>
    <div class="grid-wrap" style="margin-top:10px">
        <table id="rpGrid" class="zxsaastable">
        </table>
        <div id="rpGridPager"></div>
    </div>
</div>
<!-------------------------------------表格结束----------------------------------------->

<%--列设置--%>
<div id="lineSet-modal" class="modal" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>
                </button>
                <h4 class="modal-title">列设置</h4>
            </div>
            <div class="modal-body" style="width:600px;">
                <table id='lineSetGrid'></table>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default sureLineSet" data-dismiss="modal" onclick="sureLineSet()">
                    确认
                </button>
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
            </div>
        </div>
    </div>
</div>

<!-------------------------------------主页面结束----------------------------------------->
<jsp:include page="../../inventoryInclude/foot.jsp"/>

