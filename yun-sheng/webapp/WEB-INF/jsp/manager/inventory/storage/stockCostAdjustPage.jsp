<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" %>
<jsp:include page="../../inventoryInclude/head.jsp"/>
<link rel="stylesheet" type="text/css" href="${basePath}/js/jquery-easyui/themes/bootstrap/easyui.css?v=${version}">
<script type="text/javascript" src="${basePath}/js/jquery-easyui/jquery.easyui.min.js?v=${version}"></script>
<script src="${basePath}/js/inventory/storage/stockCostAdjustPage.js?v=${version}"></script>
<title>库存成本调整单据列表</title>
</head>
<body class='e-body-bg'>
<div>
    <!-- 菜单栏按钮组 -->
    <div class="none" id="AUTH" role="toolbar" data-code='CBTZD'></div>
    <%--<div class="btn-toolbar" id="MenuTool" role="toolbar" data-code="CBTZD"></div>--%>
    <div class="well clearfix">
        <form action="" class="form-inline" id="searchQuery">
            <!--单据类型-->
            <div class="form-group col-sm-3">
                <label class="width-25">日期:</label>
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
                <label class="width-25">商品类别:</label>
                <div class="input-group col-sm-8">
                    <input type="text" class="form-control easyui-combotree"
                           data-options="url:'${basePath}/Tgoodsclass/findTreeForEasyUI2',method:'post',multiple:'true'," name="goodsTypeName" id="goodsTypeName"
                           style="height: 34px;">
                </div>
            </div>

            <div class="col-md-3 form-group ">
                <label class="width-25">商品名称:</label>
                <div class="input-group col-sm-8">
                    <input type="text" class="form-control"  name="goodsName"  id="goodsName">
                </div>
            </div>

            <div class="col-md-3 form-group ">
                <label class="width-25">搜索:</label>
                <div class="input-group col-sm-8">
                    <input type="text" class="form-control" name="queryKey"  id="queryKey" placeholder="串号、单据编号、备注">
                </div>
            </div>

            <div class="col-md-3 form-group ">
                <label class="width-25">调整原因:</label>
                <div class="input-group col-sm-8">
                    <input type="text" class="form-control easyui-combotree"  name="reasonId"  id="reasonId" data-options="multiple:'true'"  style="height: 34px;">
                </div>
            </div>

            <div class="col-md-3 form-group ">
                <label class="width-25">成本种类:</label>
                <div class="input-group col-sm-8">
                    <input type="text" class="form-control easyui-combotree"  name="adjustmentType"  id="adjustmentType" data-options="multiple:'true'"  style="height: 34px;">
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
                        <option value="1">草稿</option>
                        <option value="2">正式</option>
                    </select>
                </div>
            </div>

            <div class="col-md-3 form-group">
                <label class="width-25">稽核状态:</label>
                <div class="input-group col-sm-8">
                    <select id="auditStatus" class="form-control" >
                        <option value="">所有</option>
                        <option value="0">未稽核</option>
                        <option value="1">已稽核</option>
                    </select>
                </div>
            </div>

            <div class="form-group col-sm-2">
                <label for="isContainsRedbills">
                    <input type="checkbox" name='isContainsRedbills' id="isContainsRedbills" class="isRed"/>包含已红冲单据
                </label>

            </div>

            <div class="form-group col-sm-3 fr">
                <button type="button" class="erp-btn-bg search">查询</button>
                <button type="button" class="erp-btn-lab reset">重置</button>
                <span class="explain">说明</span>
                <div class="explainBox">
                    1、可查询库存成本调整草稿单、已过账单、红冲单、未稽核单单据信息</br>
                    2、点击非草稿单“单据编号”，可进入详情页</br>
                    3、点击“草稿单-点我编辑”，可进入“库存成本调整”填制页对草稿内容修改、删除、过账</br>
                    4、可进入单据详情页，打印单据明细内容</br>
                </div>
            </div>


        </form>

    </div>
    <div id="ysContainer">
        <div class="btn-toolbar" id="GridTool" role="toolbar" data-code="CBTZD"></div>
        <div>
            <table id="accountGrid"></table>
            <div id="accountGridPager"></div>
        </div>
    </div>

    <!-- --------------------------------------------       Modal开始                   -------------------------------------- -->
    <!-- 红冲Modal -->
    <div class="modal fade" id="redModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="myModalLabel">红冲</h4>
                </div>
                <div class="modal-body">
                    <div class="col-sm-3">
                        时间：
                    </div>
                    <div class="input-group col-sm-8">
                        <input type="text" class="form-control redTime">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary redSave">确定</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                </div>
            </div>
        </div>
    </div>
<jsp:include page="../../inventoryInclude/foot.jsp"/>