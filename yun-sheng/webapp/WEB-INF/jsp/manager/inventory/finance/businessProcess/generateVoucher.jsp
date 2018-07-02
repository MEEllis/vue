<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" %>
<jsp:include page="../../../inventoryInclude/head.jsp"/>
<script src="${basePath}/js/inventory/finance/businessProcess/generateVoucher.js?v=${version}"></script>
<title>生成凭证</title>
</head>
<body class='e-body-bg pageList'>
<div class="">
    <form action="" class="form-inline clearfix" id="searchQuery">
        <!--单据类型-->
        <div class="form-group col-sm-3">
            <label class="width-25">单据日期:</label>
            <div class="input-group col-sm-4">
                <input type="text" class="form-control" name="billsDateBegin" id="startDate">
            </div>
            --
            <div class="input-group col-sm-4">
                <input type="text" class="form-control" name="billsDateEnd" id="endDate">
            </div>
        </div>

        <div class="col-md-3 form-group ">
            <label class="width-25">部门名称:</label>
            <div class="input-group col-sm-8">
                <input type="text" class="form-control" id="sectionName"  id="sectionName">
            </div>
        </div>



        <div class="col-md-3 form-group">
            <label class="width-25">制单人:</label>
            <div class="input-group col-sm-8">
                <input type="text" class="form-control" name="createByName"  id="createByName" readonly="readonly"/>
            </div>
        </div>



        <div class="col-md-3 form-group ">
            <label class="width-25">稽核人:</label>
            <div class="input-group col-sm-8">
                <input type="text" class="form-control"  name="auditByName" id="auditByName" placeholder=""
                       readonly="readonly"/>
            </div>
        </div>

        <div class="form-group col-sm-3 fr">
            <button type="button" class="erp-btn-bg search">查询</button>
            <button type="button" class="erp-btn-lab reset">重置</button>
            <span class="explain">说明</span>
            <div class="explainBox">
                1）要选择查询条件后击击“查询”按钮，注意“日期”区间必须是在同一个月内<br/>
                2）左则单据类型树可快速过滤数据；<br/>
                3）选中要生成凭证的单据（可全选）后点击”生成凭证“按钮即可生成会计凭证；<br/>
                4）凭证生成完成后系统会列出生成结果，请注意阅读生成结果；<br/>
                5）在并闭”生成凭证“功能或是下一次生成凭证前，可点击”查看结果“按钮查看当前生成结果；<br/>
                6）未勾选“每日合并生成一张凭证”时，所选单据将按单据类型生成，即同一单据类型不同日期生成一张凭证。<br/>
            </div>
        </div>
        <div class="form-group col-sm-2 fr">
            <label for="containsRedLabel">
                <input type="checkbox" name='containsRed' id="containsRedLabel" class="isRed"/>包含已红冲单据
            </label>
        </div>

        <div class="form-group col-sm-2 fr">
            <label for="containsNotAuditLabel">
                <input type="checkbox" name='containsNotAudit' id="containsNotAuditLabel"  class="isRed"/>包含未稽核单据
            </label>
        </div>
    </form>
    <div id="ysContainer">
        <div id="AUTH" role="toolbar" data-code='PZDJDZB' >
        <div class="pb15">
            <button type="button" class="erp-btn-bg mr15" id="voucherGo">生成凭证</button>
            <button type="button" class="erp-btn-bg mr15" id="voucherResult">查看结果</button>
            <button type="button" class="erp-btn-bg mr15" onclick="window.parent.openWorkBoxByMenutext('凭证单据对照表',  '/manager/finance/voucherCertificate/toPage', false);" >凭证单据对照表</button>
            <label for="isMerge">
                <input type="checkbox" name='isMerge' id="isMerge"  />每日合并生成一张凭证
            </label>
        </div>
        <div class="clearfix">
            <div style="width:20%;padding-right: 15px; " class="fl">
                <ul id="dataTree" class="ztree" >
                </ul>
            </div>
            <div style="width:80%; " class="fr">
                <div class="checkBoxInfo none">
                    <div class="checkinfoBox">
                        已勾选<span class="checkLen"> </span> 行
                        <span class="checkAllBox ">,
                            <span class="checkAllInfo">勾选本条件下 <span class="checkAllLen"></span> 行</span></span>
                    </div>
                    <span class="hasCheckedBox none">已勾选全部 <span class="checkAllLen"></span> 行 ，
                        <span class="qxCheckBox"><span class="qxCheck">取消勾选</span></span></span>
                </div>
                <table id="rpGrid"></table>
                <div id="rpGridPager"></div>
            </div>
        </div>

    </div>
        <div id="voucherGo-modal" class="modal" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">生成凭证结果</h4>
                    </div>
                    <div class="modal-body" style="width:600px;">
                        <p class="" id="voucherInfo"></p>
                        <div>
                            失败原因列表：
                        </div>
                        <textarea class="form-control" id="voucherDescList" style="height: 300px;max-height: 300px;"></textarea>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                    </div>
                </div>
            </div>
        </div>
<jsp:include page="../../../inventoryInclude/foot.jsp"/>