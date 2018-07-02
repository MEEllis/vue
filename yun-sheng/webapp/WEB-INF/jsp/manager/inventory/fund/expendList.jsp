<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" %>
<jsp:include page="../../inventoryInclude/head.jsp"/>
<script src="${basePath}/js/inventory/fund/expendList.js?v=${version}"></script>
<title>费用单据列表</title>
</head>
<body class='e-body-bg'>
<div>
    <!-- 菜单栏按钮组 -->
    <div class="none" id="AUTH" role="toolbar" data-code='FYD'></div>
    <div class="btn-toolbar" id="MenuTool" role="toolbar" data-code="FYD"></div>
    <div style="padding: 19px">
        <form action="" class="form-inline clearfix" id="searchQuery">
            <!--单据类型-->
            <div class="form-group col-sm-3">
                <label class="width-25">日期:</label>
                <div class="input-group col-sm-4">
                    <input type="text" class="form-control" name="billsDateBegin" id="startDate">
                </div>
                --
                <div class="input-group col-sm-4">
                    <input type="text" class="form-control" name="billsDateEnd" id="endDate">
                </div>
            </div>

            <div class="col-md-3 form-group ">
                <label class="width-25">部门:</label>
                <div class="input-group col-sm-8">
                    <input type="text" class="form-control"  id="sectionIds">
                </div>
            </div>

            <div class="col-md-3 form-group ">
                <label class="width-25">支出类别:</label>
                <div class="input-group col-sm-8">
                    <input type="text" class="form-control" name="inpayClassIds" id="inpayClassIds" >
                </div>
            </div>

            <div class="col-md-3 form-group ">
                <label class="width-25">往来单位:</label>
                <div class="input-group col-sm-8">
                    <input type="text" class="form-control"  name="unitIds"  id="unitIds">
                </div>
            </div>

            <div class="col-md-3 form-group ">
                <label class="width-25">搜索:</label>
                <div class="input-group col-sm-8">
                    <input type="text" class="form-control" name="keyWord"  id="keyWord" placeholder="单据编号、备注">
                </div>
            </div>

            <div class="col-md-3 form-group ">
                <label class="width-25">职员:</label>
                <div class="input-group col-sm-8">
                    <input type="text" class="form-control"  name="employeeIds"  id="employeeIds">
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

            <div class="form-group col-sm-3">
                <label  class="width-25">金额:</label>
                <div class="input-group col-sm-4">
                    <input type="text" class="form-control" name="amountBegin" id="amountBegin" onkeyup="checkInput.checkNum(this,12)">
                </div>
                --
                <div class="input-group col-sm-4">
                    <input type="text" class="form-control" name="amountEnd" id="amountEnd" onkeyup="checkInput.checkNum(this,12)">
                </div>
            </div>

            <div class="col-md-3 form-group">
                <label class="width-25">制单人:</label>
                <div class="input-group col-sm-8">
                    <input type="text" class="form-control" name="addManIds"  id="addManIds" />
                </div>
            </div>

            <div class="col-md-3 form-group">
                <label class="width-25">稽核状态:</label>
                <div class="input-group col-sm-8">
                    <select id="ifShowNotAudit" class="form-control" >
                        <option value="0">所有</option>
                        <option value="1">未稽核</option>
                        <option value="2">已稽核</option>
                    </select>
                </div>
            </div>

            <div class="form-group col-sm-3" >
                <label class="width-25"></label>
                <label class="mr15">
                    <input type="checkbox" class="ifContainRedBill" style="float: left;margin: 11px 5px;"> 包含已红冲单据
                </label>
            </div>

            <div class="form-group col-sm-3 fr">
                <button type="button" class="erp-btn-bg search">查询</button>
                <button type="button" class="erp-btn-lab reset">重置</button>
                <%--<span class="explain">说明</span>--%>
                <%--<div class="explainBox">--%>
                    <%--1、可查询供应商保价草稿单、已过账单、红冲单、未稽核单单据信息</br>--%>
                    <%--2、点击非草稿单“单据编号”，可进入详情页</br>--%>
                    <%--3、点击“草稿单-点我编辑”，可进入“供应商保价”填制页对草稿内容修改、删除、过账</br>--%>
                    <%--4、可进入单据详情页，打印单据明细内容</br>--%>
                <%--</div>--%>
            </div>


        </form>

    </div>
    <div id="ysContainer">
        <div class="btn-toolbar" id="GridTool"  data-code="FYD" style="margin: 0 0 5px 0;"></div>
        <div>
            <table id="rpGrid"></table>
            <div id="rpGridPager"></div>
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

    <div id="lineSet-modal" class="modal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title">列设置</h4>
                </div>
                <div class="modal-body" style="width:600px;">
                    <table id='lineSetGrid'></table>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default sureLineSet" data-dismiss="modal" onclick="sureLineSet()">确认</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                </div>
            </div>
        </div>
    </div>
<jsp:include page="../../inventoryInclude/foot.jsp"/>