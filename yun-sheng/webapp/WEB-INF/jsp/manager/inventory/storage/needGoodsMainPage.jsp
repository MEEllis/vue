<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" %>
<jsp:include page="../../inventoryInclude/head.jsp"/>
<link rel="stylesheet" type="text/css" href="${basePath}/js/jquery-easyui/themes/bootstrap/easyui.css?v=${version}">
<script type="text/javascript" src="${basePath}/js/jquery-easyui/jquery.easyui.min.js?v=${version}"></script>
<script src="${basePath}/js/inventory/storage/needGoodsPage.js?v=${version}"></script>
<title>要货单-单据列表</title>
</head>
<body class='e-body-bg'>
<div class="pageList">
    <!-- 菜单栏按钮组 -->
    <div class="none" id="AUTH" role="toolbar" data-code='YHD'></div>
    <div class="well clearfix">
        <form action="" class="form-inline" id="searchQuery">
            <!--单据类型-->
            <div class="form-group col-sm-3">
                <label class="width-25">单据日期:</label>
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
                <label class="width-25">经手人:</label>
                <div class="input-group col-sm-8">
                    <input type="text" class="form-control"  name="managerUname" id="managerUname" placeholder=""
                           readonly="readonly"/>
                </div>
            </div>

            <div class="col-md-3 form-group">
                <label class="width-25">单据状态:</label>
                <div class="input-group col-sm-8">
                    <select id="billsStatus" class="form-control" >
                        <option value="">所有</option>
                        <option value="15">未提交</option>
                        <option value="14">已撤回</option>
                        <option value="13">已提交</option>
                        <option value="2">已审核</option>
                    </select>
                </div>
            </div>

            <div class="col-md-3 form-group ">
                <label class="width-25">搜索:</label>
                <div class="input-group col-sm-8">
                    <input type="text" class="form-control" name="queryKey"  id="queryKey" placeholder="单据编号、备注">
                </div>
            </div>

            <div class="col-md-3 form-group">
                <label class="width-25">商品名称:</label>
                <div class="input-group col-sm-8">
                    <input type="text" class="form-control"  name="goodsName"  id="goodsName">
                </div>
            </div>
            <div class="form-group col-sm-offset-9 col-sm-3 fr">
                <button type="button" class="erp-btn-bg search">查询</button>
                <button type="button" class="erp-btn-lab reset">重置</button>
            </div>

        </form>
    </div>
    <div class="ystnav">
        <ul id="myTab" class="nav nav-tabs">
            <li class="active">
                <a href="#Tab1" data-toggle="tab" class="bill">按单据查询</a>
            </li>
            <li>
                <a href="#Tab2" data-toggle="tab" class="detail">按明细查询</a>
            </li>
        </ul>
    </div>
    <div id="ysContainer">
        <div class="btn-toolbar" id="GridTool" role="toolbar" data-code="YHD"></div>
        <div>
            <table id="rpGrid"></table>
            <div id="rpGridPager"></div>
        </div>
    </div>
<jsp:include page="../../inventoryInclude/foot.jsp"/>