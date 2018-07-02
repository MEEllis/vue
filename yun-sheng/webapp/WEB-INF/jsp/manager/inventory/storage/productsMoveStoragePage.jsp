<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" %>
<jsp:include page="../../inventoryInclude/head.jsp"/>
<link rel="stylesheet" type="text/css" href="${basePath}/js/jquery-easyui/themes/bootstrap/easyui.css?v=${version}">
<script type="text/javascript" src="${basePath}/js/jquery-easyui/jquery.easyui.min.js?v=${version}"></script>
<script src="${basePath}/js/inventory/storage/productsMoveStoragePage.js?v=${version}"></script>
<title>商品移库单-单据列表</title>
</head>
<body class='e-body-bg'>
<div class="pageList">
    <!-- 菜单栏按钮组 -->
    <div class="none" id="AUTH" role="toolbar" data-code='SPYKD'></div>
    <%--<div class="btn-toolbar" id="MenuTool" role="toolbar" data-code="SPYKD"></div>--%>
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

            <div class="col-md-3 form-group">
                <label class="width-25">移出仓库:</label>
                <div class="col-sm-8 input-group">
                        <input type="text" id="outStorage" name="outStorage" class="form-control" >
                </div>
            </div>
            <div class="col-md-3 form-group">
                <label class="width-25">移入仓库:</label>
                <div class="col-sm-8 input-group">
                        <input type="text" id="inStorage" name="inStorage" class="form-control" >
                </div>
            </div>

            <div class="col-md-3 form-group ">
                <label class="width-25">搜索:</label>
                <div class="input-group col-sm-8">
                    <input type="text" class="form-control" name="queryKey"  id="queryKey" placeholder="单据编号、备注">
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
                <label class="width-25">商品品牌:</label>
                <div class="input-group col-sm-8">
                    <input type="text" class="form-control"  name="goodsBranchName"  id="goodsBranchName">
                </div>
            </div>

            <div class="col-md-3 form-group ">
                <label class="width-25">商品名称:</label>
                <div class="input-group col-sm-8">
                    <input type="text" class="form-control"  name="goodsName"  id="goodsName">
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

            <%--<div class="form-group col-sm-offset-7 col-sm-2">--%>
                <%--<label for="isContainsRedbills">--%>
                    <%--<input type="checkbox" name='isContainsRedbills' id="isContainsRedbills" class="isRed"/>包含已红冲单据--%>
                <%--</label>--%>

            <%--</div>--%>

            <div class="form-group col-sm-offset-9 col-sm-3 fr">
                <button type="button" class="erp-btn-bg search">查询</button>
                <button type="button" class="erp-btn-lab reset">重置</button>
                <span class="explain">说明</span>
                <div class="explainBox">
                    1）可查询“草稿单、已过账”的商品移库单单据<br/>
                    2）可对“草稿单”的商品移库单单据进行“过账、删除”操作<br/>
                    3）点击“单据编号”，可查看“单据详情”<br/>
                </div>
            </div>


        </form>

    </div>
    <div id="ysContainer">
        <div class="btn-toolbar" id="GridTool" role="toolbar" data-code="SPYKD"></div>
        <div>
            <table id="rpGrid"></table>
            <div id="rpGridPager"></div>
        </div>
    </div>

    <!-- --------------------------------------------       Modal开始                   -------------------------------------- -->
    <!-- 红冲Modal -->
    <%--<div class="modal fade" id="redModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">--%>
        <%--<div class="modal-dialog" role="document">--%>
            <%--<div class="modal-content">--%>
                <%--<div class="modal-header">--%>
                    <%--<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span--%>
                            <%--aria-hidden="true">&times;</span></button>--%>
                    <%--<h4 class="modal-title" id="myModalLabel">红冲</h4>--%>
                <%--</div>--%>
                <%--<div class="modal-body">--%>
                    <%--<div class="col-sm-3">--%>
                        <%--时间：--%>
                    <%--</div>--%>
                    <%--<div class="input-group col-sm-8">--%>
                        <%--<input type="text" class="form-control redTime">--%>
                    <%--</div>--%>
                <%--</div>--%>
                <%--<div class="modal-footer">--%>
                    <%--<button type="button" class="btn btn-primary redSave">确定</button>--%>
                    <%--<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>--%>
                <%--</div>--%>
            <%--</div>--%>
        <%--</div>--%>
    <%--</div>--%>
<jsp:include page="../../inventoryInclude/foot.jsp"/>