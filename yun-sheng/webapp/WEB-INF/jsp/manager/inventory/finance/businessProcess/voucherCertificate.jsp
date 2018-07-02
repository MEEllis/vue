<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" %>
<jsp:include page="../../../inventoryInclude/head.jsp"/>
<script src="${basePath}/js/inventory/finance/businessProcess/voucherCertificate.js?v=${version}"></script>
<title>凭证管理对照表</title>
</head>
<body class='e-body-bg'>
<div>
    <!-- 菜单栏按钮组 -->
    <form  class="form-inline clearfix" id="searchQuery">
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

            <div class="col-md-3 form-group">
                <label class="width-25">制单人:</label>
                <div class="input-group col-sm-8">
                    <input type="text" class="form-control" name="addManIds"  id="addManIds" />
                </div>
            </div>

            <div class="col-sm-3 form-group ">
                <label class="width-25">单据类型:</label>
                <div class="input-group col-sm-8">
                    <input type="text" class="form-control"  id="billsType">
                </div>
            </div>

            <div class="form-group col-sm-3">
                <label for="voucherSource" class='width-25'>凭证来源:</label>
                <div class="input-group col-sm-8">
                    <select type="text" class="form-control" id="voucherSource" placeholder="请选择凭证来源">
                        <option value="0">所有来源</option>
                        <option value="1">自动生成</option>
                        <option value="2">手动生成</option>
                    </select>
                </div>
            </div>

            <div class="col-md-3 form-group ">
                <label class="width-25">搜索:</label>
                <div class="input-group col-sm-8">
                    <input type="text" class="form-control" name="keyWord"  id="keyWord" placeholder="凭证字号，单据编号">
                </div>
            </div>

            <div class="form-group col-sm-3" >
                <label class="width-25"></label>
                <label class="mr15">
                    <input type="checkbox" class="isShowVoid" style="float: left;margin: 11px 5px;"> 只显示已作废凭证
                </label>
                <label class="mr15">
                    <input type="checkbox" class="ifContainRedBill" style="float: left;margin: 11px 5px;"> 包含红冲单据
                </label>
            </div>

            <div class="form-group col-sm-3" >

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

    <div id="ysContainer">
        <div id="AUTH" role="toolbar" data-code='PZDJDZB' style="margin-bottom: 5px">
            <button type="button" class="btn btn-primary saveData"  onclick="lineSet()">列设置</button>
            <button type="button" class="btn emptyYF btn-primary"  onclick="">导出</button>
            <button type="button" class="btn importYF btn-primary"  data-toggle="modal" onclick="invalidVoucher()">作废凭证</button>
            <button type="button" class="btn importYF btn-primary"  data-toggle="modal" onclick="cancelInvalid()">取消作废</button>
            <button type="button" class="btn importYF btn-primary"  data-toggle="modal" onclick="deleteVoucher()">删除凭证</button>
        </div>
        <div>
            <table id="rpGrid"></table>
            <div id="rpGridPager"></div>
        </div>
    </div>

    <!-- --------------------------------------------       Modal开始                   -------------------------------------- -->
    <div class="modal" id="delModal" data-keyboard="true" data-backdrop="true">
        <div class="modal-dialog"  >
            <div class="modal-content" >
                <div class="modal-header">
                    <h4 class="modal-title">
                        提示
                    </h4>
                </div>
                <div class="modal-body" style="width: 600px;">
                    <div class="delBox none">
                        删除后凭证无法恢复，确定继续？
                        <div><label><input type="checkbox" checked class="ifSortDocNo" > 删除后自动整理凭证断号</label></div>
                    </div>

                    <div class="form-group sortBox none">
                        <label style="margin-top: 7px;float: left;">整理月份:</label>
                        <div class="input-group col-sm-8">
                            <input type="text" class="form-control" id="sortMonthInput" placeholder="请选择整理月份">
                            <input type="text" class="form-control none" id="reverseMonthInput" placeholder="请选择冲销时间">
                        </div>
                    </div>


                    <div class="descBox"></div>
                    <br/>
                    <div class="gridBox none">
                        <table id="subGrid"></table>
                        <div id="subGridPager"></div>
                    </div>
                </div>
                <div class="modal-footer" style="text-align: center;">
                    <button type="button" class="btn btn-warning" id="delBtn">确定</button>
                    <button type="button" class="btn btn-primary" data-dismiss="modal" id="noBtn">取消</button>
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
<jsp:include page="../../../inventoryInclude/foot.jsp"/>