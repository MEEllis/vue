<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<jsp:include page="../../inventoryInclude/head.jsp"/>
<link rel="stylesheet" type="text/css" href="${basePath}/css/market/public.css?v=${version}" />
<script src="${basePath}/js/jquery-form.js?v=${version}" type="text/javascript" charset="utf-8"></script>
<title>短信签名配置</title>
<script src="${basePath}/js/inventory/sms/signature.js?v=${version}"></script>
<script src="${basePath}/js/inventory/sms/systemCom.js?v=${version}"></script>
</head>
<style>
    #saveOrUpdateModal input, #saveOrUpdateModal select {
        height: 34px;
        border: 1px solid #cfcfcf;
        vertical-align: middle;
    }
    .left {
        width: 14%;
        float: left;
    }
    .left_tree {
        height: 687px;
        overflow: auto;
    }
    .details {
        width: 86%;
        float: left;
    }
</style>

<body style="padding:0 10px">
<!-------------------------------------主页面开始----------------------------------------->
<div class="well" style="padding:5px ">
    <!-------------------------------------搜索条件开始----------------------------------------->
    <form id="inquire_option">
        <div class="inputbox container-fluid clearfix">
            <div class="row">
                <div class="form-group col-sm-6" >
                    <span class="box_text2">查询信息:</span>
                    <div class="col-sm-8">
                    <div class="input-group" style="width:80%">
                        <input type="text" id="queryText" name="queryText" class="form-control2"  placeholder="部门编辑、部门名称、备注"  />
                    </div>
                    </div>
                </div>
                <div class=" form-group  col-sm-6">
                    <button type="button" class="erp-btn-bg" onclick="querySms()">查询</button>
                    <button type="button" class="erp-btn-lab" onclick="resetFun()">重置</button>
                </div>
            </div>
            <div class="row">
            <div class="form-group col-sm-6">
                <span class="box_text2">默认签名:</span>
                <div class="col-sm-8" >
                    <div class="input-group" style="width:80%">
                    <select id="touchTypes" class="form-control">
                        <option value="">请选择</option>
                    </select>
                    </div>
                </div>
            </div>
            <div class=" form-group  col-sm-6">
                <button type="button" class="erp-btn-bg" onclick="sigSave()">保存</button>
            </div>
            </div>
        </div>
    </form>

</div>
<!-------------------------------------表格开始----------------------------------------->

<div class="mainSub">
    <div class="left">
        <div class="left_tree">
            <ul id="TreeDom" class="ztree"></ul>
        </div>
    </div>
    <div class="details">
        <div class="right">
            <div class="tablebox retailDetailTable">
                <div class="grid-wrap" style="margin-top:10px">
                    <table id="jqGrid_blocMessage" class="zxsaastable">
                    </table>
                    <div id="jqGridPager"></div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-------------------------------------表格结束----------------------------------------->

<!-------------------------------------主页面结束----------------------------------------->
<jsp:include page="../../inventoryInclude/foot.jsp"/>

