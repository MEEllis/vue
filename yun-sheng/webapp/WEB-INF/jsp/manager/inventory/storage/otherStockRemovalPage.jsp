<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" %>
<jsp:include page="../../inventoryInclude/head.jsp"/>
<link rel="stylesheet" type="text/css" href="${basePath}/js/jquery-easyui/themes/bootstrap/easyui.css?v=${version}">
<script type="text/javascript" src="${basePath}/js/jquery-easyui/jquery.easyui.min.js?v=${version}"></script>
<script src="${basePath}/js/inventory/storage/otherStockRemovalPage.js?v=${version}"></script>
<title>其他出库单-单据列表</title>
</head>
<body class='e-body-bg'>
<div class="pageList">
    <!-- 菜单栏按钮组 -->
    <div class="none" id="AUTH" role="toolbar" data-code='QTCKD'></div>
    <%--<div class="btn-toolbar" id="MenuTool" role="toolbar" data-code="CBTZD"></div>--%>
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
                <label class="width-25">商品类别:</label>
                <div class="input-group col-sm-8">
                    <input type="text" class="form-control easyui-combotree"
                           data-options="url:'${basePath}/Tgoodsclass/findTreeForEasyUI2',method:'post',multiple:'true'," name="goodsTypeName" id="goodsTypeName" style="height: 34px;">
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
                <label class="width-25">商品品牌:</label>
                <div class="input-group col-sm-8">
                    <input type="text" class="form-control"  name="goodsBranchName"  id="goodsBranchName">
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
            <div class="col-md-3 form-group">
                <label class="width-25">出库方式:</label>
                <div class="input-group col-sm-8">
                    <input type="text" id="otherStorageId" name="otherStorageId" class="form-control easyui-combotree" data-options="multiple:'true'" style="height: 34px;">

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
                    1）可查询“草稿单、已过账、已红冲”的其他出库单单据<br/>
                    2）可对“草稿单”的其他出库单单据进行“过账、删除”操作<br/>
                    3）可对“已过账”的其他出库单进行“红冲”<br/>
                    4）“已过账”的其他出库单“稽核”后不能做“红冲”，需“取消稽核”<br/>
                    5）点击“单据编号”，可查看“单据详情”<br/>
                </div>
            </div>


        </form>
    </div>
    <div id="ysContainer">
        <div class="btn-toolbar" id="GridTool" role="toolbar" data-code="QTCKD"></div>
        <div>
            <table id="rpGrid"></table>
            <div id="rpGridPager"></div>
        </div>
    </div>
<jsp:include page="../../inventoryInclude/foot.jsp"/>