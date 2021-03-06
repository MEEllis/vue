<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" %>
<jsp:include page="../../inventoryInclude/head.jsp"/>
<script src="${basePath}/js/erp/funds/invalid.js?v=${version}" type="text/javascript" charset="utf-8"></script>
<script src="${basePath}/js/erp/funds/tree.js?v=${version}"></script>
<script src="${basePath}/js/inventory/fund/fundCommonInterface.js?v=${version}"></script>
<script type="text/javascript" charset="utf-8" src="${basePath}/js/commonjs/eidit-grid-test.js?v=${version}"></script>
<script src="${basePath}/js/inventory/fund/recRefundPage.js?v=${version}"></script>
<title>预收退款单-单据列表</title>
</head>
<body class='e-body-bg'>
<div class="pageList">
    <!-- 菜单栏按钮组 -->
    <div class="none" id="AUTH" role="toolbar" data-code='YSTKD'></div>
    <input type="hidden" value="80" name='billsType' id="billsType"/>
    <!-- 打印类型 -->
    <input type="hidden" value="80" name="printType" id="printType"/>
    <form action="" class="form-inline clearfix" id="searchQuery">
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
            <label class="width-25">搜索:</label>
            <div class="input-group col-sm-8">
                <input type="text" class="form-control" name="queryKey"  id="queryKey" placeholder="单据编号、备注">
            </div>
        </div>

        <div class="col-md-3 form-group ">
            <label class="width-25">往来单位:</label>
            <div class="input-group col-sm-8">
                <input type="text" class="form-control"  name="contactsunitName"  id="contactsunitName">
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
            <label class="width-25">制单人:</label>
            <div class="input-group col-sm-8">
                <input type="text" class="form-control" name="createByName"  id="createByName" readonly="readonly"/>
            </div>
        </div>

        <div class="col-md-3 form-group">
            <label class="width-25">单据状态:</label>
            <div class="input-group col-sm-8">
                <select id="billsStatus" class="form-control" >
                    <option value="">所有</option>
                    <option value="1">草稿单</option>
                    <option value="2">正式单</option>
                </select>
            </div>
        </div>

        <div class="col-md-3 form-group">
            <label class="width-25">稽核状态:</label>
            <div class="input-group col-sm-8">
                <select id="isAudit" class="form-control" >
                    <option value="">所有</option>
                    <option value="0">未稽核</option>
                    <option value="1">已稽核</option>
                </select>
            </div>
        </div>

        <div class="form-group col-sm-offset-7 col-sm-2">
            <label for="isContainsRedbills">
                <input type="checkbox" name='isContainsRedbills' id="isContainsRedbills" class="isRed"/>包含已红冲单据
            </label>

        </div>

        <div class="form-group col-sm-3 fr">
            <button type="button" class="erp-btn-bg search">查询</button>
            <button type="button" class="erp-btn-lab reset">重置</button>
            <span class="explain">说明</span>
            <div class="explainBox">

            </div>
        </div>


    </form>
    <div id="ysContainer">
        <div class="btn-toolbar" id="GridTool" role="toolbar" data-code="YSTKD"></div>
        <div>
            <table id="rpGrid"></table>
            <div id="rpGridPager"></div>
        </div>
    </div>
<jsp:include page="../../inventoryInclude/foot.jsp"/>